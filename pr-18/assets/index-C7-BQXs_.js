(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();function fi(i){let e=i>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function Xe(i,e,t){let n=Math.imul(i|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967296}function Ts(i,e,t){const n=Math.floor(i),r=Math.floor(e),s=i-n,a=e-r,o=s*s*(3-2*s),c=a*a*(3-2*a),l=Xe(n,r,t),u=Xe(n+1,r,t),d=Xe(n,r+1,t),h=Xe(n+1,r+1,t);return l+(u-l)*o+(d-l)*c+(l-u-d+h)*o*c}const Tn=(i,e,t)=>i+(e-i)*t,pi=(i,e,t)=>Math.min(t,Math.max(e,i)),rn=i=>{const e=pi(i,0,1);return e*e*(3-2*e)};function Su(i,e,t,n){const r=Math.max(1,i.camera.zoomSteps),s=pi(Math.round(i.camera.startZoom),0,r-1),a=r>1?s/(r-1):0;return{zoomStep:s,zoom:a,tx:e,ty:t,tz:n,vx:0,vy:0,vz:0,ax:0,az:0,lift:0}}function fa(i,e,t,n,r){const s=n*r,a=Math.exp(-s),o=i-t,c=e+n*o;return[t+(o+c*r)*a,(e-n*c*r)*a]}function yu(i,e,t,n,r,s,a){const o=a.camera,c=Math.max(1,o.zoomSteps),l=pi(i.zoomStep+Math.sign(e),0,c-1),u=c>1?l/(c-1):0;let d=n.x*o.lookAhead,h=n.z*o.lookAhead;const f=Math.hypot(d,h);f>o.lookAheadMax&&(d*=o.lookAheadMax/f,h*=o.lookAheadMax/f);const g=1-Math.exp(-o.lookAheadEase*s),x=i.ax+(d-i.ax)*g,m=i.az+(h-i.az)*g,[p,_]=fa(i.tx,i.vx,t.x+x,o.follow,s),[S,y]=fa(i.ty,i.vy,t.y,o.follow,s),[w,E]=fa(i.tz,i.vz,t.z+m,o.follow,s),R=i.zoom+(u-i.zoom)*(1-Math.exp(-o.zoomEase*s)),M=i.lift+(r-i.lift)*(1-Math.exp(-o.liftEase*s));return{zoomStep:l,zoom:R,tx:p,ty:S,tz:w,vx:_,vy:y,vz:E,ax:x,az:m,lift:pi(M,0,1)}}function ih(i,e,t){const n=t.camera.ground,r=t.camera.treetop,s=rn(e),a=Tn(Tn(n.angleIn,n.angleOut,i.zoom),Tn(r.angleIn,r.angleOut,i.zoom),s),o=Tn(Tn(n.distanceIn,n.distanceOut,i.zoom),Tn(r.distanceIn,r.distanceOut,i.zoom),s),c=a*Math.PI/180;return{angle:a,distance:o,x:i.tx,y:i.ty+Math.sin(c)*o,z:i.tz+Math.cos(c)*o,tx:i.tx,ty:i.ty,tz:i.tz}}const bu=.1,wu=()=>({time:0,paused:!0});function Eu(i,e){if(i.paused||!(e>0))return 0;const t=Math.min(bu,e);return i.time+=t,t}const Tu={moor:{treeDensity:.65},"fern-forest":{treeDensity:1},"muddy-forest":{treeDensity:1},"stone-shrine":{treeDensity:.6},"tangly-forest":{treeDensity:1},"wispy-forest":{treeDensity:1},"hazel-forest":{treeDensity:1},garden:{treeDensity:.75},"twiggy-forest":{treeDensity:1},ancient:{treeDensity:.9},norway:{treeDensity:1},"alder-forest":{treeDensity:.9},meadow:{treeDensity:.55},"old-oaks":{treeDensity:.9},"berry-thicket":{treeDensity:1},wetland:{treeDensity:.75},stream:{treeDensity:.8},"rocky-slope":{treeDensity:.75},bog:{treeDensity:.7},deadwood:{treeDensity:.8},"cave-mouth":{treeDensity:.75},grassland:{treeDensity:.55},"beaver-pond":{treeDensity:.8},"log-pile":{treeDensity:.7},heath:{treeDensity:.65},"old-pinewood":{treeDensity:1},ravine:{treeDensity:.75},"bluebell-glade":{treeDensity:.8},"holly-thicket":{treeDensity:1},"honeysuckle-tangle":{treeDensity:1}},Au={types:Tu};function $o(i,e){if(typeof document<"u"){const t=document.createElement("canvas");return t.width=i,t.height=e,t}return new OffscreenCanvas(i,e)}function Qs(i){let e=i>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}const ye=(i,e,t)=>e+(t-e)*i(),rh=(i,e)=>e[Math.floor(i()*e.length)];function Tt(i,e,t){let n=Math.imul(i|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967296}function hi(i,e,t){const n=Math.floor(i),r=Math.floor(e),s=i-n,a=e-r,o=s*s*(3-2*s),c=a*a*(3-2*a),l=Tt(n,r,t),u=Tt(n+1,r,t),d=Tt(n,r+1,t),h=Tt(n+1,r+1,t);return l+(u-l)*o+(d-l)*c+(l-u-d+h)*o*c}function we(i,e,t){i=(i%1+1)%1,e=Math.max(0,Math.min(1,e)),t=Math.max(0,Math.min(1,t));const n=Math.floor(i*6),r=i*6-n,s=t*(1-e),a=t*(1-r*e),o=t*(1-(1-r)*e),[c,l,u]=[[t,o,s],[a,t,s],[s,t,o],[s,a,t],[o,s,t],[t,s,a]][n%6];return[Math.round(c*255),Math.round(l*255),Math.round(u*255)]}const v={BODY:1,BELLY:2,ACCENT:3,EYE:4,GLINT:5,TRUNK:6,LEAF:7,LEAF2:8,SKIN:10,HAIR:11,BROOM:12,STRAW:13,BODY2:14,BARK2:15,FLOWER:16,PUPIL:17,MAGIC:18,BARKD:19,LINE:20,IRIS:21,MAGIC2:22,NOSE:23,EAR:24,BODY3:25,LEAF3:26,BARKL:27,HAT:28,PHONES:29,TOP:30,JACKET:31,JEANS:32,SHOES:33,WATER:34,STONE:35,STONED:36,MOSS:37,CRYSTAL:38,RUNE:39,GLOW:40,WOOD:41,COLLAR:42,HAT1:43,HAT2:44,POM:45,SHADES:46,FRAME:47,SHOE:48,SOLE:49,WOKEN:50,WEB:51},pa=4;function sh(i,e,t,n=.12){const r=(s,a,o,c)=>{const l=o-s,u=c-a,d=Math.max(0,Math.min(1,((i-s)*l+(e-a)*u)/(l*l+u*u)));return Math.hypot(i-s-l*d,e-a-u*d)<n};switch((t%pa+pa)%pa){case 0:return r(.5,.08,.5,.92)||r(.5,.1,.18,.4)||r(.5,.1,.82,.4);case 1:return r(.5,.08,.5,.92)||r(.5,.5,.18,.18)||r(.5,.5,.82,.18);case 2:return r(.2,.1,.8,.9)||r(.8,.1,.2,.9)||r(.5,.08,.5,.92);default:return r(.3,.08,.3,.92)||r(.3,.12,.75,.35)||r(.75,.35,.3,.55)||r(.3,.55,.78,.92)}}const Cu=new Set([v.GLINT,v.MAGIC,v.MAGIC2,v.RUNE,v.GLOW,v.COLLAR,v.WOKEN]);function Ol(i,e=!0,t=8){const n=i.length,r=[];if(n<3)return i.slice();const s=o=>e?i[(o+n)%n]:i[Math.max(0,Math.min(n-1,o))],a=e?n:n-1;for(let o=0;o<a;o++){const c=s(o-1),l=s(o),u=s(o+1),d=s(o+2),h=Math.max(2,Math.ceil(Math.hypot(u[0]-l[0],u[1]-l[1])/1.5),t);for(let f=0;f<h;f++){const g=f/h,x=g*g,m=x*g;r.push([0,1].map(p=>.5*(2*l[p]+(-c[p]+u[p])*g+(2*c[p]-5*l[p]+4*u[p]-d[p])*x+(-c[p]+3*l[p]-3*u[p]+d[p])*m)))}}return e||r.push(i[n-1]),r}function Ru(i,{cap:e=1,capEnd:t=e}={}){const n=[],r=[],s=i.length;for(let c=0;c<s;c++){const l=i[Math.max(0,c-1)],u=i[Math.min(s-1,c+1)];let d=u[0]-l[0],h=u[1]-l[1];const f=Math.hypot(d,h)||1;d/=f,h/=f;const g=i[c][2]/2;n.push([i[c][0]-h*g,i[c][1]+d*g]),r.push([i[c][0]+h*g,i[c][1]-d*g])}const a=(c,l,u,d)=>{let h=c[0]-l[0],f=c[1]-l[1];const g=Math.hypot(h,f)||1;return[c[0]+h/g*u/2*d,c[1]+f/g*u/2*d]};return[...n,a(i[s-1],i[s-2],i[s-1][2],t),...r.reverse(),a(i[0],i[1],i[0][2],e)]}const bt=(i,e)=>[i[0]+e[0],i[1]+e[1]],Zn=(i,e,t)=>[i[0]+(e[0]-i[0])*t,i[1]+(e[1]-i[1])*t];function js(i,e,t,n,r,s=1){const a=[];for(let o=0;o<i.length;o++){if(a.push(i[o]),o<e||o>=t)continue;const c=i[o],l=i[(o+1)%i.length];let u=l[0]-c[0],d=l[1]-c[1];const h=Math.hypot(u,d)||1,f=d/h*s,g=-u/h*s;for(let x=1;x<=n;x++){const m=(x-.5)/n,p=Zn(c,l,m),_=[p[0]+f*r-u/h*r*.5,p[1]+g*r-d/h*r*.5];a.push(Zn(c,l,m-.45/n),_,Zn(c,l,m+.35/n))}}return a}function Bl(i,e,t){const n=new Uint8Array(i*e);let r=1/0,s=-1/0;for(const a of t)r=Math.min(r,a[1]),s=Math.max(s,a[1]);for(let a=Math.max(0,Math.floor(r));a<=Math.min(e-1,Math.ceil(s));a++){const o=a+.5,c=[];for(let l=0,u=t.length-1;l<t.length;u=l++){const[d,h]=t[l],[f,g]=t[u];h>o!=g>o&&c.push(d+(o-h)/(g-h)*(f-d))}c.sort((l,u)=>l-u);for(let l=0;l+1<c.length;l+=2)for(let u=Math.max(0,Math.ceil(c[l]-.5));u<=Math.min(i-1,Math.floor(c[l+1]-.5));u++)n[a*i+u]=1}return n}function Lu(i,e,t){const r=new Float32Array(i*e),s=new Float32Array(i*e);for(let c=0;c<i*e;c++)t[c]&&(r[c]=1e4,s[c]=1e4);const a=c=>r[c]*r[c]+s[c]*s[c],o=(c,l,u,d,h)=>{const f=l+d,g=u+h;let x,m;if(f<0||g<0||f>=i||g>=e)x=d,m=h;else{const p=g*i+f;x=r[p]+d,m=s[p]+h}x*x+m*m<a(c)&&(r[c]=x,s[c]=m)};for(let c=0;c<e;c++){for(let l=0;l<i;l++){const u=c*i+l;t[u]&&(o(u,l,c,-1,0),o(u,l,c,0,-1),o(u,l,c,-1,-1),o(u,l,c,1,-1))}for(let l=i-1;l>=0;l--){const u=c*i+l;t[u]&&o(u,l,c,1,0)}}for(let c=e-1;c>=0;c--){for(let l=i-1;l>=0;l--){const u=c*i+l;t[u]&&(o(u,l,c,1,0),o(u,l,c,0,1),o(u,l,c,1,1),o(u,l,c,-1,1))}for(let l=0;l<i;l++){const u=c*i+l;t[u]&&o(u,l,c,-1,0)}}return{vx:r,vy:s}}class sn{constructor(e,t,n=1){this.sx=n,this.w=Math.round(e*n),this.h=t|0,this.m=new Uint8Array(this.w*this.h),this.n=new Float32Array(this.w*this.h*3),this.g=new Uint8Array(this.w*this.h)}inb(e,t){return e>=0&&t>=0&&e<this.w&&t<this.h}get(e,t){return e|=0,t|=0,this.inb(e,t)?this.m[t*this.w+e]:0}put(e,t,n,r=0,s=0,a=1){this.px(e*this.sx,t,n,r,s,a)}px(e,t,n,r=0,s=0,a=1){if(e=Math.floor(e),t=Math.floor(t),!this.inb(e,t))return;const o=t*this.w+e;this.m[o]=n,this.n[o*3]=r,this.n[o*3+1]=s,this.n[o*3+2]=a}recolour(e,t,n){e=Math.floor(e),t=Math.floor(t),this.inb(e,t)&&this.m[t*this.w+e]&&(this.m[t*this.w+e]=n)}ellipse(e,t,n,r,s,a={}){const{onlyOn:o,density:c=1,noise:l=0,seed:u=0,round:d=1}=a;e*=this.sx,n*=this.sx;for(let h=Math.max(0,Math.floor(t-r-1));h<Math.min(this.h,t+r+1);h++)for(let f=Math.max(0,Math.floor(e-n-1));f<Math.min(this.w,e+n+1);f++){const g=(f+.5-e)/n,x=(h+.5-t)/r,m=g*g+x*x;if(m>1)continue;const p=h*this.w+f;if(o&&!o.has(this.m[p]))continue;if(c<1){const w=l?hi(f/3.2,h/3.2,u)*l+(1-l)*.5:.5;if(Tt(f,h,u+77)>c*(.4+w*1.2)*(1.15-m*.5))continue}const _=g*d,S=x*d,y=Math.hypot(_,S,Math.sqrt(Math.max(0,1-m))+.15);this.px(f,h,s,_/y,S/y,(Math.sqrt(Math.max(0,1-m))+.15)/y)}}line(e,t,n,r,s,a,o,c=1){e*=this.sx,n*=this.sx;const l=Math.max(1,Math.ceil(Math.hypot(n-e,r-t)));for(let u=0;u<=l;u++){const d=u/l,h=e+(n-e)*d,f=t+(r-t)*d,g=Math.max(.5,(s+(a-s)*d)/2);for(let x=Math.floor(f-g);x<=f+g;x++)for(let m=Math.floor(h-g);m<=h+g;m++){const p=(m+.5-h)/g,_=(x+.5-f)/g;if(p*p+_*_>1)continue;const S=p*c,y=Math.hypot(S,_*.3,1);this.px(m,x,o,S/y,_*.3/y,1/y)}}}tri(e,t){let[[n,r],[s,a],[o,c]]=e;n*=this.sx,s*=this.sx,o*=this.sx;const l=(g,x,m,p,_,S)=>(g-_)*(p-S)-(m-_)*(x-S),u=Math.max(0,Math.floor(Math.min(n,s,o))),d=Math.min(this.w,Math.ceil(Math.max(n,s,o))),h=Math.max(0,Math.floor(Math.min(r,a,c))),f=Math.min(this.h,Math.ceil(Math.max(r,a,c)));for(let g=h;g<f;g++)for(let x=u;x<d;x++){const m=x+.5,p=g+.5,_=l(m,p,n,r,s,a),S=l(m,p,s,a,o,c),y=l(m,p,o,c,n,r);(_<0||S<0||y<0)&&(_>0||S>0||y>0)||this.px(x,g,t,0,-.2,.98)}}shape(e,t,n={}){return this.fillMask(Bl(this.w,this.h,Ol(e,!0,n.per||6)),t,n)}limb(e,t,n={}){return this.shape(Ru(e,n),t,n)}fillMask(e,t,{group:n=1,line:r=!1,depth:s=0,round:a=1,onlyOn:o=null,keepNormals:c=!1,tilt:l=[0,0],lineMat:u=v.LINE}={}){const{w:d,h}=this;if(o)for(let m=0;m<d*h;m++)e[m]&&!o.has(this.m[m])&&(e[m]=0);const{vx:f,vy:g}=Lu(d,h,e);let x=s;if(!x){for(let m=0;m<d*h;m++)e[m]&&(x=Math.max(x,Math.hypot(f[m],g[m])));x=Math.max(1.5,Math.min(x*.9,2.5+x*.35))}for(let m=0;m<h;m++)for(let p=0;p<d;p++){const _=m*d+p;if(!e[_])continue;if(c){this.m[_]=t;continue}const S=Math.hypot(f[_],g[_]),y=Math.min(1,Math.max(0,(S-.5)/x)),w=Math.min(2.6,(1-y)/Math.sqrt(Math.max(.02,1-(1-y)*(1-y))))*a;let E=f[_]/(S||1)*w+l[0],R=g[_]/(S||1)*w+l[1];const M=Math.hypot(E,R,1);this.m[_]=t,this.n[_*3]=E/M,this.n[_*3+1]=R/M,this.n[_*3+2]=1/M}if(r&&!c){const m=[];for(let p=0;p<h;p++)for(let _=0;_<d;_++){const S=p*d+_;if(e[S])for(const[y,w]of[[1,0],[-1,0],[0,1],[0,-1]]){const E=_+y,R=p+w;if(E<0||R<0||E>=d||R>=h)continue;const M=R*d+E;if(!e[M]&&this.m[M]&&this.g[M]!==n&&this.m[M]!==u){m.push(S);break}}}for(const p of m)this.m[p]=u}if(!c)for(let m=0;m<d*h;m++)e[m]&&(this.g[m]=n);return e}mark(e,t,n,r={}){return this.fillMask(Bl(this.w,this.h,Ol(e,!0,6)),t,{...r,onlyOn:new Set(n),keepNormals:!0})}grid(e,t,n=0,r=0,{round:s=1,flipX:a=!1}={}){const o=Math.max(...e.map(u=>u.length)),c=new Uint8Array(this.w*this.h),l=new Map;e.forEach((u,d)=>[...u].forEach((h,f)=>{const g=t[h];if(!g)return;const x=n+(a?o-1-f:f),m=r+d;this.inb(x,m)&&(c[m*this.w+x]=1,l.set(m*this.w+x,g))})),this.fillMask(c,v.BODY,{round:s,depth:2.5});for(const[u,d]of l)this.m[u]=d}}function ui(i,e,t,n=t.outline,r=$o){const{w:s,h:a}=i,o=()=>r(s,a),c=o(),l=o(),u=o(),d=c.getContext("2d").createImageData(s,a),h=l.getContext("2d").createImageData(s,a),f=u.getContext("2d").createImageData(s,a),g=n==="none"?null:n==="dark"?[22,18,30]:"tint";for(let x=0;x<a;x++)for(let m=0;m<s;m++){const p=x*s+m,_=i.m[p],S=p*4;if(!_){if(!g)continue;const M=[i.get(m+1,x),i.get(m-1,x),i.get(m,x+1),i.get(m,x-1)].find(P=>P);if(!M)continue;const A=g==="tint"?(e[M]||[0,0,0]).map(P=>P*.35|0):g;d.data.set([...A,255],S),h.data.set([128,128,255,255],S),f.data.set([128,128,255,255],S);continue}let y=e[_];_===v.LINE&&!y&&(y=g==="tint"||!g?(e[v.BODY2]||[0,0,0]).map(M=>M*.55|0):g),y=y||[255,0,255],d.data.set([...y,Cu.has(_)?254:255],S);const w=i.n[p*3],E=i.n[p*3+1],R=i.n[p*3+2];h.data.set([w*127+128,E*127+128,R*255,255],S),f.data.set([-w*127+128,E*127+128,R*255,255],S)}return c.getContext("2d").putImageData(d,0,0),l.getContext("2d").putImageData(h,0,0),u.getContext("2d").putImageData(f,0,0),{A:c,N:l,NF:u,w:s,h:a}}const di=i=>{const e=Math.hypot(i[0],i[1],i[2])||1;return[i[0]/e,i[1]/e,i[2]/e]},Br=(i,e)=>[i[1]*e[2]-i[2]*e[1],i[2]*e[0]-i[0]*e[2],i[0]*e[1]-i[1]*e[0]],Pt=(i,e)=>i[0]*e[0]+i[1]*e[1]+i[2]*e[2],_n=(i,e)=>[i[0]-e[0],i[1]-e[1],i[2]-e[2]],k={add:(i,e)=>[i[0]+e[0],i[1]+e[1],i[2]+e[2]],sub:_n,mul:(i,e)=>[i[0]*e,i[1]*e,i[2]*e],lerp:(i,e,t)=>[i[0]+(e[0]-i[0])*t,i[1]+(e[1]-i[1])*t,i[2]+(e[2]-i[2])*t],norm:di,cross:Br,dot:Pt};function zl(i,e=[0,1,0]){const t=di(i);let n=Br(e,t);Math.hypot(...n)<1e-4&&(n=Br([0,0,1],t)),n=di(n);const r=Br(t,n);return[t,r,n]}function ah(i,e){const t=Pt(i,e.axes[0]),n=Pt(i,e.axes[1]),r=Pt(i,e.axes[2]),[s,a,o]=e.r,c=Math.hypot(t/s,n/a,r/o),l=Math.hypot(t/(s*s),n/(a*a),r/(o*o));return l>1e-9?c*(c-1)/l:-Math.min(s,a,o)}function oh(i,e){const{ba:t,l2:n,rr:r,a2:s,il2:a,r1:o,r2:c}=e,l=Pt(i,t),u=l-n,d=[i[0]*n-t[0]*l,i[1]*n-t[1]*l,i[2]*n-t[2]*l],h=Pt(d,d),f=l*l*n,g=u*u*n,x=Math.sign(r)*r*r*h;return Math.sign(u)*s*g>x?Math.sqrt(h+g)*a-c:Math.sign(l)*s*f<x?Math.sqrt(h+f)*a-o:(Math.sqrt(h*s*a)+l*r)*a-o}function lh(i,e){const t=Math.abs(Pt(i,e.axes[0]))-e.h[0]+e.round,n=Math.abs(Pt(i,e.axes[1]))-e.h[1]+e.round,r=Math.abs(Pt(i,e.axes[2]))-e.h[2]+e.round;return Math.hypot(Math.max(t,0),Math.max(n,0),Math.max(r,0))+Math.min(Math.max(t,n,r),0)-e.round}const Pu=(i,e)=>e*(Math.sin(i[0]*23+i[1]*7)*Math.sin(i[1]*19-i[2]*11)+.5*Math.sin(i[2]*41+i[0]*29)),kl=(i,e)=>i.type==="ell"?ah(_n(e,i.cw),i):i.type==="box"?lh(_n(e,i.cw),i):oh(_n(e,i.aw),i),br=(i,e)=>i.rough?kl(i,e)+Pu(e,i.rough):kl(i,e);class et{constructor({blend:e=.07}={}){this.parts=[],this.flats=[],this.blend=e,this.anchors={feet:[]}}ell(e,t,n,r={}){const s=r.axes||(r.dir?zl(r.dir,r.up):[[1,0,0],[0,1,0],[0,0,1]]);return this.parts.push({type:"ell",c:e,r:t,axes:s,mat:n,group:r.group??1,extra:!!r.extra,paint:r.paint,rough:r.rough,cut:!!r.cut}),this}box(e,t,n,r={}){const s=r.axes||(r.dir?zl(r.dir,r.up):[[1,0,0],[0,1,0],[0,0,1]]);return this.parts.push({type:"box",c:e,h:t,round:Math.min(r.round??.02,...t),axes:s,mat:n,group:r.group??1,extra:!!r.extra,paint:r.paint,rough:r.rough,cut:!!r.cut}),this}seg(e,t,n,r,s,a={}){return this.parts.push({type:"cone",a:e,b:t,r1:n,r2:r,mat:s,group:a.group??1,extra:!!a.extra,paint:a.paint,rough:a.rough,cut:!!a.cut}),this}chain(e,t,n={}){for(let r=0;r+1<e.length;r++)this.seg(e[r].slice(0,3),e[r+1].slice(0,3),e[r][3],e[r+1][3],t,n);return this}flat(e,t,n,r,s,a,o={}){return this.flats.push({c:e,u:di(t),v:di(n),su:r,sv:s,mask:a,group:o.group??30,extra:!!o.extra,bend:o.bend??.35}),this}field(e){let t=1/0;for(const n of this.parts){if(n.extra||n.cut)continue;let r;if(n.type==="ell")r=ah(_n(e,n.c),n);else if(n.type==="box")r=lh(_n(e,n.c),n);else{const s=_n(n.b,n.a),a=Math.max(1e-9,Pt(s,s)),o=n.r1-n.r2;r=oh(_n(e,n.a),{ba:s,l2:a,rr:o,a2:a-o*o,il2:1/a,r1:n.r1,r2:n.r2})}r<t&&(t=r)}return t}static surface(e,t,n){const r=1/Math.hypot(n[0]/t[0],n[1]/t[1],n[2]/t[2]);return[e[0]+n[0]*r,e[1]+n[1]*r,e[2]+n[2]*r]}}const Gl={towards:.6,away:-.6},Du=.52;function On(i,{height:e,scale:t,facing:n="towards",yaw:r=Gl[n]??Gl.towards,pitch:s=Du,lineGap:a=.12}={}){const o=Math.cos(r),c=Math.sin(r),l=Math.cos(s),u=Math.sin(s),d=I=>[I[0]*o-I[2]*c,I[1],I[0]*c+I[2]*o],h=I=>[I[0]*o+I[2]*c,I[1],-I[0]*c+I[2]*o],f=[0,-u,-l],g=[0,l,-u],x=[1,0,0],m=[0,u,l],p=i.blend,_=i.parts.map(I=>{if(I.type==="ell"){const ze=d(I.c),Ne=I.axes.map(d),Je=Math.max(...I.r);return{...I,cw:ze,axes:Ne,bc:ze,br:Je+(I.rough||0)*1.5}}if(I.type==="box"){const ze=d(I.c),Ne=I.axes.map(d);return{...I,cw:ze,axes:Ne,bc:ze,br:Math.hypot(...I.h)+(I.rough||0)*1.5}}const K=d(I.a),se=d(I.b),ve=_n(se,K),ce=Math.max(1e-9,Pt(ve,ve)),Te=I.r1-I.r2;return{...I,aw:K,ba:ve,l2:ce,rr:Te,a2:ce-Te*Te,il2:1/ce,bc:k.lerp(K,se,.5),br:Math.sqrt(ce)/2+Math.max(I.r1,I.r2)}}),S=i.flats.map(I=>{const K=d(I.c),se=d(I.u),ve=d(I.v);return{...I,cw:K,uw:se,vw:ve,nw:di(Br(se,ve)),bc:K,br:Math.hypot(I.su,I.sv)}}),y=[..._,...S],w=I=>{const K=Pt(I.bc,x),se=Pt(I.bc,g),ve=I.br+(I.uw?0:p);return[K-ve,K+ve,se-ve,se+ve]};for(const I of y)[I.x0,I.x1,I.u0,I.u1]=w(I);const E=y.filter(I=>!I.extra&&!I.cut),R=Math.min(...E.map(I=>I.u0+(I.uw?0:p))),M=Math.max(...E.map(I=>I.u1-(I.uw?0:p))),A=t??e/Math.max(1e-6,M-R),P=Math.min(...y.map(I=>I.x0)),D=Math.max(...y.map(I=>I.x1)),B=Math.min(...y.map(I=>I.u0)),U=Math.max(...y.map(I=>I.u1)),L=Math.ceil((D-P)*A)+4,O=Math.ceil((U-B)*A)+2,F=new sn(L,O),Y=new Float32Array(L*O).fill(1/0),j=new Int16Array(L*O).fill(-1),X=8,te=Math.ceil(L/X),N=Math.ceil(O/X),ne=Array.from({length:te*N},()=>[]);y.forEach((I,K)=>{const se=Math.max(0,Math.floor((I.x0-P)*A/X)),ve=Math.min(te-1,Math.floor(((I.x1-P)*A+2)/X)),ce=Math.max(0,Math.floor((U-I.u1)*A/X)),Te=Math.min(N-1,Math.floor(((U-I.u0)*A+1)/X));for(let ze=ce;ze<=Te;ze++)for(let Ne=se;Ne<=ve;Ne++)ne[ze*te+Ne].push(K)});const oe=.25/A,Se=(I,K)=>{const se=Math.max(p-Math.abs(I-K),0)/p;return Math.min(I,K)-se*se*p*.25};for(let I=0;I<O;I++)for(let K=0;K<L;K++){const se=ne[Math.floor(I/X)*te+Math.floor(K/X)];if(!se.length)continue;const ve=P+(K+.5-1)/A,ce=U-(I+.5)/A,Te=k.add(k.add(k.mul(x,ve),k.mul(g,ce)),k.mul(m,50));let ze=1/0,Ne=-1/0;const Je=[],ft=[];for(const Ve of se){const z=y[Ve],pt=_n(Te,z.bc),ke=Pt(pt,f),C=z.br+(z.uw?0:p),b=Pt(pt,pt)-C*C,V=ke*ke-b;if(V<0)continue;if(z.uw){ft.push(z);continue}if(z.cut){Je.push(z);continue}const q=Math.sqrt(V);ze=Math.min(ze,-ke-q),Ne=Math.max(Ne,-ke+q),Je.push(z)}let Ke=1/0,gt=-1,Rt=0,It=null;if(Je.length){const Ve=new Map;for(const ke of Je){let C=Ve.get(ke.group);C||Ve.set(ke.group,C=[]),C.push(ke)}const z=(ke,C)=>{let b=1/0;for(const V of ke)V.cut||(b=b===1/0?br(V,C):Se(b,br(V,C)));for(const V of ke)V.cut&&(b=Math.max(b,-br(V,C)));return b};let pt=Math.max(0,ze);for(let ke=0;ke<96&&pt<Ne;ke++){const C=k.add(Te,k.mul(f,pt));let b=1/0,V=null;for(const[q,Q]of Ve){const le=z(Q,C);le<b&&(b=le,V=q)}if(b<oe){const q=Ve.get(V),Q=.5/A;It=di([z(q,[C[0]+Q,C[1],C[2]])-z(q,[C[0]-Q,C[1],C[2]]),z(q,[C[0],C[1]+Q,C[2]])-z(q,[C[0],C[1]-Q,C[2]]),z(q,[C[0],C[1],C[2]+Q])-z(q,[C[0],C[1],C[2]-Q])]);let le=q[0],he=1/0;for(const ee of q){if(ee.cut)continue;const ie=br(ee,C);ie<he&&(he=ie,le=ee)}for(const ee of q)if(ee.cut&&-br(ee,C)>he-oe*2){le=ee;break}Ke=pt,gt=V,Rt=le.paint?le.paint(h(C),le)??le.mat:le.mat;break}pt+=Math.max(b*.9,oe*.5)}}for(const Ve of ft){const z=Pt(f,Ve.nw);if(Math.abs(z)<1e-4)continue;const pt=Pt(_n(Ve.cw,Te),Ve.nw)/z;if(pt>=Ke)continue;const ke=k.add(Te,k.mul(f,pt)),C=_n(ke,Ve.cw),b=Pt(C,Ve.uw)/Ve.su,V=Pt(C,Ve.vw)/Ve.sv;if(Math.abs(b)>1||Math.abs(V)>1)continue;const q=Ve.mask(b,V);if(!q)continue;let Q=z>0?k.mul(Ve.nw,-1):Ve.nw;Q=di(k.add(Q,k.add(k.mul(Ve.uw,b*Ve.bend),k.mul(Ve.vw,V*Ve.bend*.5)))),Ke=pt,gt=Ve.group,Rt=q,It=Q}if(!It||!Rt)continue;const Mt=I*L+K;Y[Mt]=Ke,j[Mt]=gt,F.px(K,I,Rt,Pt(It,x),-Pt(It,g),Pt(It,m))}const Ue=[];for(let I=0;I<O;I++)for(let K=0;K<L;K++){const se=I*L+K;if(F.m[se])for(const[ve,ce]of[[1,0],[-1,0],[0,1],[0,-1]]){const Te=K+ve,ze=I+ce;if(Te<0||ze<0||Te>=L||ze>=O)continue;const Ne=ze*L+Te;if(F.m[Ne]&&j[Ne]!==j[se]&&Y[Ne]-Y[se]>a){Ue.push(se);break}}}for(const I of Ue)[v.EYE,v.GLINT,v.MAGIC,v.MAGIC2,v.NOSE,v.COLLAR,v.WOKEN,v.RUNE,v.GLOW].includes(F.m[I])||(F.m[I]=v.LINE);for(let I=0;I<O;I++)for(let K=0;K<L;K++){const se=I*L+K;if(F.m[se]!==v.EYE)continue;const ve=I>0&&F.m[se-L]===v.EYE,ce=K>0&&F.m[se-1]===v.EYE,Te=K+1<L&&F.m[se+1]===v.EYE&&I+1<O&&F.m[se+L]===v.EYE;!ve&&!ce&&Te&&(F.m[se]=v.GLINT)}let He=-1;for(let I=O-1;I>=0&&He<0;I--)for(let K=0;K<L;K++)if(F.m[I*L+K]){He=I;break}if(He>=0&&He<O-1){const I=O-1-He;for(let K=O-1;K>=0;K--)for(let se=0;se<L;se++){const ve=K*L+se,ce=(K-I)*L+se,Te=K-I>=0;F.m[ve]=Te?F.m[ce]:0,F.g[ve]=Te?F.g[ce]:0;for(let ze=0;ze<3;ze++)F.n[ve*3+ze]=Te?F.n[ce*3+ze]:0}}return F.bodyH=Math.round((M-R)*A),{sp:F,s:A}}const Rn=(i,e=9,t=.3)=>Tt(Math.floor(i[0]*e),Math.floor(i[1]*e)+Math.floor(i[2]*e)*97,7)<t,Li={wing:(i,e)=>(t,n)=>{const r=(t+1)/2,s=1-.35*r*r,a=-1+.55*r+.18*Math.abs(Math.sin(r*Math.PI*6));return n>s||n<a?null:n>s-.35*(1-r*.5)?e:Math.floor(r*9)%2?i:e},ear:(i,e=v.EAR,t=v.BODY3)=>(n,r)=>{const s=(r+1)/2,a=.95*Math.sin(Math.PI*Math.min(1,.15+s*.85))*(1-s*.35);return Math.abs(n)>a?null:s>.82?t:Math.abs(n)<a*.5&&s<.7&&s>.12?e:i},flame:(i,e)=>(t,n)=>{const r=(n+1)/2,s=Math.sin(Math.PI*Math.min(1,r*1.1))*(1-r)*1.4;return Math.abs(t)>s?null:Math.abs(t)<s*.45&&r<.6?e:i},membrane:i=>(e,t)=>{const n=(e+1)/2,r=-1+.35*Math.abs(Math.sin(n*Math.PI*3));return t<r||t>1-.2*n?null:i},spotted:(i,e,t)=>(n,r)=>{if(Math.hypot(n,r*1.2)>1)return null;const a=Math.hypot(n-.35,r-.1);return a<.18?t:a<.3?e:i}},Iu=1.3,Uu=i=>[1,Math.sqrt(i.growth),Math.sqrt(i.growth)*Iu,i.growth],wr=(i,e,t=1)=>Math.round(e.size*Uu(e)[Math.max(0,Math.min(3,i))]*(2/(e.pixel||2))*1.9*t),Zo=(i,e)=>{const t=Qs(e);for(let n=0;n<9;n++){const r=Math.floor(ye(t,2,i.w-2)),s=Math.floor(ye(t,2,i.h*.6));if(!(i.get(r,s)||i.get(r+1,s)||i.get(r-1,s)||i.get(r,s+1)||i.get(r,s-1))&&(i.px(r,s,v.MAGIC2),n%3===0))for(const[a,o]of[[1,0],[-1,0],[0,1],[0,-1]])i.px(r+a,s+o,v.MAGIC)}};function ea(i,e,t,n,r,s,a,o){const c=k.add(e,[-n*.7,n*(.75+r),t*n*.35]),l=k.norm(k.sub(c,e)),u=k.norm(k.sub([1,0,0],k.mul(l,k.dot([1,0,0],l)))),d=Math.hypot(...k.sub(c,e));i.flat(k.add(k.lerp(e,c,.5),k.mul(u,-n*.14)),l,u,d*.55,n*.34,Li.wing(s,a),{group:o,extra:!0})}const Jo=(i,e,t=1)=>i===0?Math.round(Math.max(12,Math.min(30*Math.max(.75,Math.min(1.1,t)),wr(1,e)*t*.72))):i===2?Math.round(Math.max(wr(1,e)*t*1.08,Math.min(wr(2,e,t),wr(1,e)*1.4))):wr(i,e)*t;let As=null;function Nu(i,e){const t=As;As=i;try{return e()}finally{As=t}}const Fu=(i,e)=>{const t=Math.atan2(e,i);return Math.hypot(i,e)<.55+.4*Math.pow(Math.abs(Math.cos(t*2.5+Math.PI/2)),3)},Ou=(i,e)=>{const t=i*1.2,n=-e*1.2+.25;return Math.pow(t*t+n*n-.6,3)-t*t*n*n*n<0};function Qo(i){const e=As,t=i.anchors;if(!e)return;const n=t.head,r=n?Math.max(...n.r):.2;if(e.collar&&(t.neck||n)){const s=t.neck||{c:k.add(n.c,[-n.r[0]*.8,-n.r[1]*.4,0]),r:n.r[1]*.75,dir:k.norm([1,.4,0])},a=k.norm(s.dir),o=k.norm(k.cross(a,Math.abs(a[2])<.9?[0,0,1]:[1,0,0])),c=k.cross(a,o),l=[],u=Math.max(.03,s.r*.2);for(let x=0;x<=16;x++){const m=x/16*Math.PI*2,p=k.add(k.mul(o,Math.cos(m)),k.mul(c,Math.sin(m)));let _=0;for(;_<.8&&i.field(k.add(s.c,k.mul(p,_)))<0;)_+=.01;_>=.8&&(_=s.r),l.push([...k.add(s.c,k.mul(p,_+u*.7)),u])}i.chain(l,v.COLLAR,{group:60,extra:!0});const d=l.reduce((x,m)=>m[0]-m[1]*.6+m[2]*.5>x[0]-x[1]*.6+x[2]*.5?m:x),h=u*1.3*(s.tag||1),f=k.norm(k.add(k.norm(k.sub(d.slice(0,3),s.c)),[.3,-.5,.3]));let g=d.slice(0,3);for(let x=0;x<60&&i.field(g)<h*.4;x++)g=k.add(g,k.mul(f,.01));i.ell(g,[h,h,h*.6],v.COLLAR,{group:60,extra:!0})}if(e.hat!=null&&n){const s=Math.max(r,.13),a=n.top||k.add(et.surface(n.c,n.r,k.norm([-.15,1,.1])),[0,r*.1,0]),o=k.norm([.3,1,.35]),c=s*1.5,l=k.add(a,k.mul(o,c));i.seg(k.add(a,k.mul(o,-s*.1)),l,s*.48,s*.04,v.HAT1,{group:61,extra:!0,paint:u=>Math.floor(k.dot(k.sub(u,a),o)/(c/5)+10)%2?v.HAT2:void 0}),i.ell(l,[s*.17,s*.17,s*.17],v.POM,{group:61,extra:!0})}if(e.glasses&&t.eyes&&n){const[s,a]=t.eyes.pts,o=l=>k.add(l,k.mul(k.norm(k.sub(l,n.c)),t.eyes.size*.45)),c=Math.max(t.eyes.size*1.05,r*.1);if(e.glasses==="bar")i.seg(o(s),o(a),c,c,v.SHADES,{group:62,extra:!0}),i.ell(k.add(o(a),[c*.3,c*.5,c*.2]),[c*.25,c*.25,c*.25],v.GLINT,{group:62,extra:!0});else for(const l of[s,a]){const u=k.norm(k.sub(l,n.c)),d=k.norm(k.cross([0,1,0],u)),h=k.cross(u,d),f=e.glasses==="heart"?Ou:Fu,g=c*1.5;i.flat(o(l),d,h,g,g,(x,m)=>f(x,m)?f(x*1.3,m*1.3)?v.SHADES:v.FRAME:null,{group:62,bend:.1,extra:!0}),i.seg(o(s),o(a),c*.18,c*.18,v.FRAME,{group:62,extra:!0})}}if(e.shoes)for(const s of t.feet){const a=e.shoes==="platform",o=s.r,c=k.add(s.c,[o*.25,o*(a?.35:.15),0]);i.ell(c,[o*1.45,o*(a?1.2:.85),o*1.15],v.SHOE,{group:s.group,extra:!0,paint:l=>l[1]<c[1]-o*(a?.45:.4)?v.SOLE:e.shoes==="glitter"&&Rn(l,60,.28)?v.GLINT:void 0})}}function Bu(i,e,t,n,r="towards"){const s={legW:1,earS:1,hgt:1,bw:.3,...i.q},a=e===3,o=e===1,c=e===0,l=N=>a&&i.legend.includes(N),u=new et,d=s.hr*(c?1.75:o?1.25:1)*(n.head/.44)**.5,h=s.len*(c?.8:o?.9:1.02)*n.long,f=c?.55:o?.9:1.04,g=t?-.04:0,x=1+g,m=s.chest*(a?1.06:1)/f+g,p=s.tuck/f+g,_=s.bw*(c?1.15:e>=2?1.06:1)*(s.legW>1.2?1.15:1),S=.06*s.legW*(a?1.1:c?1.7:1),y=s.back==="hump"?.1:0,w=s.back==="arch"?.1:0,E=m+.12,R=N=>{if(s.belly&&N[1]<E&&N[0]>-h*.5)return v.BELLY;if(s.saddle&&N[1]>x-.18&&N[0]<h*.55)return v.BODY2;if(s.spots&&N[1]>m+.1&&Rn(N,10,.22))return s.spotMat==="belly"||s.spots==="young"&&o?v.BELLY:s.spots==="young"?void 0:v.BODY3;if(s.ridge&&N[1]>x-.08+y*.5)return v.BODY3};if(u.ell([h*.48,(x+m)/2+y*.5,0],[h*.62,(x-m)/2+y*.5,_],v.BODY,{paint:R}),u.ell([-h*.5,(x+p)/2+w*.6,0],[h*.58,(x-p)/2+w*.6,_*.93],v.BODY,{paint:R}),u.ell([0,(x+(m+p)/2)/2+.02,0],[h*.6,(x-(m+p)/2)/2,_*.9],v.BODY,{paint:R}),s.ridge)for(let N=0;N<(a?16:10);N++){const ne=-h*.8+N*h*1.75/(a?15:9),oe=(.07+(a?.04:0))*(1+.5*Math.max(0,ne/h));u.ell([ne,x+.02+y*Math.max(0,1-Math.abs(ne/h-.5)*2)+oe*.5,0],[oe,.03,_*.25],v.BODY3,{dir:[-.3,1,0],up:[1,0,0]})}if(s.wool)for(let N=0;N<14;N++){const ne=N/14*Math.PI*2;u.ell([h*Math.cos(ne)*.7,(x+m)/2+Math.sin(ne)*.2,_*(N%2?.5:-.5)],[.16,.14,.14],v.BODY)}const M=[.32,-.32][t],A=(N,ne)=>{const oe=ne*_*.62,Se=N?h*.62:-h*.62,Ue=(N?1:-1)*ne*M,He=N?m+.1:p+.15,I=(N?ne:-ne)*(t?1:-1)>0?.06:0,K=[Se+Math.sin(Ue)*.2+(N?.02:.1),Math.max(.3,He*.55),oe],se=[Se+Math.sin(Ue)*.42,.05+I,oe],ve=[Se,He+.12,oe*.8],ce=ne>0?s.legMat||v.BODY:s.legMat?v.BODY3:v.BODY2,Te=N?[[...ve,S*1.5],[...K,S*1.05],[...se,S*.9]]:[[...ve,S*2*(s.haunch||1)],[...k.add(K,[-.12,.06,0]),S*1.2],[...k.add(se,[-.06*(s.hindFoot||1),.12,0]),S*.9],[...se,S*.9]];u.chain(Te,ce,{group:ne>0?6+(N?1:0):2,paint:s.socks?Ne=>Ne[1]<s.socks?v.BODY3:void 0:void 0});const ze=(s.paw==="hoof"?.07:.09)*s.legW**.5*(N?1:s.hindFoot||1);u.ell(k.add(se,[ze*.5,-.01,0]),[ze,S*.9,S*1.1],s.paw==="hoof"?v.NOSE:ce,{group:ne>0?6+(N?1:0):2}),u.anchors.feet.push({c:k.add(se,[ze*.5,-.01,0]),r:Math.max(ze,S*1.1),group:ne>0?6+(N?1:0):2})};for(const N of[-1,1])A(!0,N),A(!1,N);const P=[h*.82,x-.12,0],D=[P[0]+Math.cos(s.neckAng)*s.neck*.9,P[1]+Math.sin(s.neckAng)*s.neck*.9+(c?.1:0),0];u.seg(P,D,s.neckW*.55,s.neckW*.42,v.BODY,{paint:N=>s.belly&&N[1]<(P[1]+D[1])/2-.05?v.BELLY:s.face==="dark"?v.BODY2:void 0});const B=N=>{if(s.face==="badger")return Math.abs(N[2])<d*.22+(N[0]-D[0])*.1||N[1]<D[1]-d*.1?v.BELLY:v.BODY3;if(s.face==="dark")return v.BODY2;if((s.belly||s.muzzle)&&N[1]<D[1]-d*.35)return v.BELLY};u.ell(D,[d*1.05,d*.92,d*.88],v.BODY,{paint:B});const U=d*s.snout*(c?.55:o?.78:1),L=d*s.snoutD*.55,O=[D[0]+d*.65+U*.5,D[1]-d*.28,0];u.ell(O,[U*.62+d*.2,L,L*.95],v.BODY,{dir:[1,-.25,0],paint:N=>(s.muzzle||s.belly)&&N[1]<O[1]-L*.1?v.BELLY:B(N)});const F=[O[0]+U*.62+d*.1,O[1]-.02,0];u.ell(F,[d*(s.disc?.1:.12),d*(s.disc?.2:.12),d*(s.disc?.2:.15)],v.NOSE,{group:1});for(const N of[-1,1]){const ne=et.surface(D,[d*1.05,d*.92,d*.88],k.norm([.75,.32,N*.62]));u.ell(ne,[d*.13,d*.16,d*.13].map(oe=>oe*(s.eyeK||1)*(c?1.5:o?1.2:1)),a&&!s.tusks?v.MAGIC2:v.EYE,{group:1})}u.anchors.head={c:D,r:[d*1.05,d*.92,d*.88],top:[D[0]-d*.1,D[1]+d*.82,0]},u.anchors.eyes={pts:[-1,1].map(N=>et.surface(D,[d*1.05,d*.92,d*.88],k.norm([.75,.32,N*.62]))),size:d*.16*(s.eyeK||1)*(c?1.5:o?1.2:1)},u.anchors.neck={c:k.lerp(P,D,c?.05:o?.25:.42),r:s.neckW*.5*(c?1.3:o?1.12:1),dir:k.norm(k.sub(D,P)),tag:c?1.8:o?1.3:1};for(const N of[-1,1]){const ne=s.ear,oe=[D[0]-d*.15,D[1]+d*.7,N*d*.5],Se=s.earS*(c?1.2:1)*(s.ear==="long"?.62:1);if(ne==="none")continue;if(ne==="round"){u.ell(oe,[d*.22,d*.25*Se,d*.1],v.BODY,{group:1,paint:Te=>Te[0]>oe[0]+d*.02?v.EAR:void 0});continue}const Ue=ne==="long",He=ne==="small"?-.6:0,I=d*.55*Se*(ne==="big"?1.35:Ue?2.2:1),K=d*.3*(ne==="big"?1.2:Ue?1.35:1),se=k.norm([He*.6-(Ue?.3:.12),1,N*.3]),ve=k.norm([.55,.2,N]),ce=k.norm(k.cross(ve,se));u.flat(k.add(oe,k.mul(se,I)),ce,se,K,I,Li.ear(v.BODY,v.EAR,v.BODY3),{group:5+(N>0?0:20),extra:Ue}),ne==="tuft"&&u.seg(k.add(oe,[0,I*1.4,N*.02]),k.add(oe,[0,I*1.85,N*.04]),d*.05,d*.02,v.BODY3,{group:1})}const Y=[-h*1.05,x-.1+w*.5,0],j=t?.04:-.02;if(l("tails")||zu(u,l("starTail")?"star":s.tail,Y,h,x,j),s.horns)for(const N of[-1,1]){const ne=o?.6:c?.35:l("hornsGlow")?1.4:1,oe=[];for(let Se=0;Se<=8;Se++){const Ue=.3-Se/8*Math.PI*1.6,He=d*.65*ne*(1-.45*Se/8);oe.push([D[0]-d*.1+Math.cos(Ue)*He,D[1]+d*.45+Math.sin(Ue)*He,N*(d*.6+Se*.015)]),oe[Se].push(d*.2*ne*(1-.6*Se/8))}u.chain(oe,l("hornsGlow")?v.MAGIC:v.ACCENT,{group:13})}if(s.antlers||l("jackalope"))for(const N of[-1,1])ku(u,s,[D[0]-d*.05,D[1]+d*.75,N*d*.4],N,e,l);if(s.tusks)for(const N of[-1,1]){const ne=o?.4:c?0:l("tusksBig")?1.3:.75;if(!ne)continue;const oe=[O[0]+U*.25,O[1]-L*.4,N*L*.8];u.chain([[...oe,.045*ne],[...k.add(oe,[.1*ne,.1*ne,N*.03]),.04*ne],[...k.add(oe,[.06*ne,.24*ne,N*.05]),.02*ne]],v.ACCENT,{group:8})}s.teeth&&!c&&u.ell([F[0]-d*.1,F[1]-d*.25,0],[d*.08,d*.14,d*.12],v.ACCENT,{group:1});const X=N=>[-h*.9+N*h*1.65,x+y*Math.max(0,1-Math.abs(N-.8)*3)+w*(1-Math.abs(N-.4)*2),0];if(l("wings"))for(const N of[-1,1])ea(u,[h*.2,x,N*_*.5],N,1.15,t?.1:0,N>0?v.MAGIC2:v.MAGIC,v.MAGIC,40+(N>0?10:0));if(l("mane")||l("flames"))for(let N=0;N<7;N++){const ne=N/6,oe=k.lerp(k.add(D,[-d*.5,d*.3,0]),X(.55),ne),Se=[.4,.3,.45,.28,.38,.25,.3][N],Ue=k.norm([-.35-(t?.1:0),1,0]);u.flat(k.add(oe,k.mul(Ue,Se*.5)),[1,0,0],Ue,Se*.32,Se*.55,Li.flame(N%2?v.MAGIC:v.MAGIC2,v.MAGIC2),{group:60+N%2,extra:!0})}if(l("tails"))for(let N=0;N<7;N++){const ne=Math.PI*(.55+N*.08),oe=(N-3)*.1,Se=k.add(Y,[Math.cos(ne)*.9,Math.sin(ne)*.85,oe]);u.chain([[...Y,.1],[...k.lerp(Y,Se,.5),.17],[...Se,.08]],N%2?v.BODY2:v.BODY,{group:70,extra:!0}),u.ell(Se,[.09,.09,.09],v.MAGIC2,{group:71,extra:!0})}if(l("crystals")&&[.15,.3,.45,.6,.75].forEach((N,ne)=>{const oe=X(N),Se=[.3,.5,.4,.6,.35][ne];u.ell(k.add(oe,[0,Se*.45,(ne%2-.5)*.1]),[Se*.55,.08,.08],v.MAGIC,{dir:[(ne-2)*.12,1,0],group:80+ne%2,extra:!0,paint:Ue=>Ue[2]>0?v.MAGIC2:void 0})}),l("moss")){for(let N=0;N<6;N++)u.ell(X(.08+N*.15),[h*.22,.07,_*.85],v.LEAF,{group:85,extra:!0});for(const[N,ne]of[[.25,.55],[.5,.8],[.75,.45]]){const oe=X(N);u.seg(oe,k.add(oe,[0,ne*.7,0]),.04,.025,v.TRUNK,{group:86,extra:!0}),u.ell(k.add(oe,[0,ne*.8,0]),[ne*.28,ne*.26,ne*.28],v.LEAF2,{group:87,extra:!0,paint:Se=>Se[1]<oe[1]+ne*.72?v.LEAF3:void 0})}for(const N of[.12,.4,.65,.9]){const ne=X(N);u.ell(k.add(ne,[0,.12,_*.3]),[.07,.035,.07],v.MAGIC,{group:89,extra:!0})}}if(l("ribbons"))for(let N=0;N<3;N++){const ne=[];for(let oe=0;oe<9;oe++){const Se=oe/8;ne.push([h*(.5-Se*2.2),x+.05+N*.1+Se*(.25+N*.12)+Math.sin(Se*6+t+N)*.07,(N-1)*.18,.04*(1-Se*.6)])}u.chain(ne,N%2?v.MAGIC2:v.MAGIC,{group:90+N,extra:!0})}Qo(u);const{sp:te}=On(u,{height:Jo(e,n,s.hgt),facing:r});return a&&Zo(te,i.id.length*7919),te}function zu(i,e,t,n,r,s){const a={group:3},o=c=>-n*c;e==="brush"?i.chain([[...t,.1],[o(1.3),r-.25+s,0,.15],[o(1.4),r-.55,0,.14],[o(1.35),.38+s,0,.09]],v.BODY,{...a,paint:c=>c[1]<.32?v.BODY3:void 0}):e==="bushy"?i.chain([[...t,.1],[o(1.05)-.35,r-.05+s,0,.17],[o(1.05)-.75,r-.2+s,0,.18],[o(1.05)-1,r-.35+s,0,.1]],v.BODY,{...a,paint:c=>c[0]<o(1.05)-.82?v.BELLY:void 0}):e==="stub"||e==="deer"||e==="bob"?i.ell(k.add(t,[-.06,.02+s,0]),[.1,.08,.07],e==="deer"?v.BELLY:v.BODY,{...a,paint:e==="bob"?c=>c[0]<t[0]-.08?v.BODY3:void 0:void 0}):e==="puff"?i.ell(k.add(t,[-.04,.02,0]),[.11,.11,.1],v.BELLY,a):e==="squirrel"||e==="star"?i.chain([[...t,.12],[o(1.3),r+.05+s,0,.25],[o(1.3),r+.6+s,0,.3],[o(1),r+.95+s,0,.27],[o(.65),r+.9+s,0,.16]],e==="star"?v.MAGIC:v.BODY,{...a,extra:!0,paint:e==="star"?c=>Rn(c,14,.12)?v.GLINT:void 0:void 0}):e==="otter"?i.chain([[...t,.17],[o(1.3),r-.45+s,0,.12],[o(1.6),.1,0,.07],[o(1.85),.06+s,0,.03]],v.BODY,a):e==="stoat"?i.chain([[...t,.08],[o(1.3),r-.12+s,0,.07],[o(1.6),r-.05+s,0,.06]],v.BODY,{...a,paint:c=>c[0]<o(1.45)?v.BODY3:void 0}):e==="flat"?(i.seg(t,[o(1.15),.3,0],.08,.07,v.BODY2,a),i.ell([o(1.4),.1+s*.5,0],[.28,.03,.14],v.BODY3,a)):e==="thin"&&(i.chain([[...t,.04],[o(1.1),r-.3,0,.03],[o(1.12)+s,r-.55,0,.025]],v.BODY,a),i.ell([o(1.12)+s,r-.62,0],[.04,.07,.04],v.BODY3,a))}function ku(i,e,t,n,r,s){const a=!e.antlers,o=a?.45:[0,.5,.95,.95][r]*(s("antlersGlow")?1.15:1),c=s("antlersGlow")?n>0?v.MAGIC2:v.MAGIC:v.ACCENT,l={group:11+(n>0?1:0),extra:!0};if(!o)return;const u=.045*Math.max(.8,o),d=n*.35*o;if(e.antlers==="palm"){const m=k.add(t,[-.06*o,.12*o,d*.3]);i.seg(t,m,u*1.3,u*1.2,c,l);for(let p=0;p<5;p++){const _=.35+p*.3,S=k.norm([-Math.cos(_),Math.sin(_)*.9,n*.55]),y=(.24+.05*(p%2))*o;i.ell(k.add(m,k.mul(S,y*.55)),[y*.6,u*1.5,u*.6],c,{...l,dir:S,up:[0,0,1]})}return}const h=k.add(t,[-.18*o,.3*o,d*.4]),f=k.add(t,[-.25*o,.62*o,d*.8]),g=k.add(t,[-.1*o,.95*o,d]);i.chain([[...t,u*1.2],[...h,u],[...f,u*.85],[...g,u*.4]],c,l);const x=(m,p,_,S)=>i.seg(m,k.add(m,k.mul(k.norm(p),_)),S,S*.35,c,l);x(k.add(t,[-.04*o,.1*o,d*.1]),[1,.6,0],.28*o,u*.8),(o>.4||a)&&x(h,[1,.9,0],.3*o,u*.7),o>.7&&(x(f,[.8,1,0],.28*o,u*.6),x(g,[.3,1,n*.2],.18*o,u*.5))}function Gu(i,e,t,n,r="towards"){const s=e===3,a=e===1,o=e===0,c=g=>s&&i.legend.includes(g),l=new et,u=t?.03:0,d=o?.48:a?.42:.36,h=(o?.95:1.08)+u;for(const g of[-1,1]){const x=t&&g>0?.04:0;l.seg([.05,.2,g*.14],[.08,.05+x,g*.15],.07,.06,v.BODY2,{group:2});for(const m of[-.04,0,.04])l.ell([.16,.03+x,g*.15+m],[.06,.025,.02],v.ACCENT,{group:2});l.anchors.feet.push({c:[.13,.04+x,g*.15],r:.08,group:g>0?6:2})}if(l.ell([-.32,.32,0],[.22,.06,.14],v.BODY2,{dir:[-1,-.6,0],group:3}),l.ell([0,.55+u,0],[.36,.52,.36],v.BODY,{paint:g=>g[0]>.12&&g[1]<h-d*.5?Math.floor(g[1]*18)%3===0&&Rn(g,16,.5)?v.BODY2:v.BELLY:void 0}),!c("wings"))for(const g of[-1,1])l.ell([-.06,.58+u,g*.3],[.4,.3,.08],v.BODY2,{dir:[-.3,-1,0],up:[1,0,0],group:g>0?4:2,paint:x=>Rn(x,12,.15)?v.BODY3:void 0});l.ell([0,h,0],[d,d*.9,d],v.BODY);for(const g of[-1,1]){const x=k.norm([.75,-.05,g*.4+.35]),m=k.add(et.surface([0,h,0],[d,d*.9,d],x),k.mul(x,-d*.05));l.ell(m,[d*.22,d*.46,d*.4],v.BELLY,{group:1,dir:x});const p=k.add(m,k.mul(x,d*.14));l.ell(p,[d*.1,d*.26,d*.24].map(_=>_*(o?1.15:1)),s?v.MAGIC:v.IRIS,{group:1,dir:x}),l.ell(k.add(p,k.mul(x,d*.07)),[d*.08,d*.14,d*.13].map(_=>_*(o?1.15:1)),s?v.MAGIC2:v.EYE,{group:1,dir:x}),(l.anchors.eyes||={pts:[],size:d*.22}).pts.push(k.add(p,k.mul(x,d*.07))),o||l.ell([d*.05,h+d*.8,g*d*.6],[d*.32,d*.12,d*.08],v.BODY2,{dir:[-.1,1,g*.7],up:[1,0,0],group:1})}if(l.ell(et.surface([0,h,0],[d,d*.9,d],k.norm([.75,-.35,.35])),[d*.2,d*.12,d*.1],v.ACCENT,{dir:[.6,-1,.3],group:1}),c("wings"))for(const g of[-1,1])ea(l,[-.05,.8+u,g*.3],g,1.3,t?.12:0,g>0?v.MAGIC2:v.MAGIC,v.MAGIC,40+(g>0?10:0));if(c("eyesRing"))for(let g=0;g<7;g++){const x=Math.PI*(.15+g/6*.7);l.ell([Math.cos(x)*.2-.1,h+.1+Math.sin(x)*.6,(g-3)*.15],[.07,.07,.07],v.MAGIC2,{group:95+g,extra:!0}),l.ell([Math.cos(x)*.2-.05,h+.1+Math.sin(x)*.6,(g-3)*.15],[.035,.035,.035],v.EYE,{group:95+g,extra:!0})}l.anchors.head={c:[0,h,0],r:[d,d*.9,d]},l.anchors.neck={c:[0,h-d*.75,0],r:d*.85,dir:[0,1,0]},Qo(l);const{sp:f}=On(l,{height:Jo(e,n,.95),facing:r});return s&&Zo(f,31),f}const gi=(i,e,t,n,r,s,a=1)=>{for(const o of n)i.ell(et.surface(e,t,k.norm(o)),[r,r*1.2,r],s,{group:a});i.anchors.head||={c:e,r:t},i.anchors.eyes||={pts:n.map(o=>et.surface(e,t,k.norm(o))),size:r}},ch=(i,e,t)=>i.ell([e,.005,0],[t,.005,t*.6],v.NOSE,{group:0});function Sn(i,e,t,n,r,s){Qo(i);const{sp:a}=On(i,{height:Jo(t,n,r),facing:s});return t===3&&Zo(a,e.id.length*131),a}const hh=(i,e,t)=>{i.ell(e,[t,t*.35,t],v.MAGIC,{group:95,extra:!0,paint:n=>n[1]>e[1]?v.MAGIC2:void 0});for(let n=0;n<5;n++){const r=n/5*Math.PI*2;i.ell(k.add(e,[Math.cos(r)*t*.8,t*.55,Math.sin(r)*t*.8]),[t*.38,t*.12,t*.12],v.MAGIC,{dir:[0,1,0],up:[1,0,0],group:96,extra:!0})}},jo=(i,e)=>e.forEach(([t,n],r)=>i.ell(k.add(t,[0,n*.45,0]),[n*.55,.07,.07],v.MAGIC,{dir:[(r%3-1)*.25,1,(r%2-.5)*.3],group:80+r%2,extra:!0,paint:s=>s[2]>t[2]?v.MAGIC2:void 0}));function Hu(i,e,t,n,r="towards"){const s=e===3,a=new et,o=t?.03:0;for(const[d,h]of[[.28,.2],[.28,-.2],[-.28,.2],[-.28,-.2]])a.seg([d,.15,h],[d+(h>0?o:-o),.03,h],.06,.05,v.BODY3,{group:h>0?6:2}),a.anchors.feet.push({c:[d+.03+(h>0?o:-o),.03,h],r:.065,group:h>0?6:2});const c=[0,.32,0],l=[.5,.32,.38];a.ell(c,l,v.BODY2,{paint:d=>Rn(d,22,.3)?v.BODY3:Rn(d,19,.12)?v.BELLY:void 0});for(let d=0;d<46;d++){const h=d*2.399%(Math.PI*2),f=d/46*.9+.05,g=k.norm([Math.cos(h)*Math.sin(f*Math.PI*.5)-.25,Math.cos(f*Math.PI*.5)*.9+.1,Math.sin(h)*Math.sin(f*Math.PI*.5)]);g[0]>.55||a.ell(k.add(et.surface(c,l,g),k.mul(g,.02)),[.1,.025,.025],d%4?v.BODY2:v.BODY3,{dir:k.add(g,[-.4,0,0]),group:1})}const u=[.48,.22,0];return a.ell(u,[.22,.14,.15],v.BELLY,{dir:[1,-.3,0],group:1}),a.ell([.69,.16,0],[.04,.04,.04],v.NOSE,{group:1}),gi(a,u,[.22,.14,.15],[[.3,.6,.55],[.3,.6,-.55]],.035,s?v.MAGIC2:v.EYE),s&&jo(a,[[[-.3,.55,.1],.35],[[-.05,.62,-.1],.5],[[.2,.55,.12],.4],[[-.15,.58,.2],.3]]),Sn(a,i,e,n,.6,r)}function Vu(i,e,t,n,r="towards"){const s=e===3,a=new et,o=t?.05:0;for(const u of[-1,1])a.ell([-.22,.16,u*.36],[.24,.13,.12],u>0?v.BODY:v.BODY2,{dir:[1,.3,0],group:u>0?6:2,paint:d=>Rn(d,14,.15)?v.BODY3:void 0}),a.ell([.05,.04,u*.4],[.16,.04,.08],u>0?v.BODY:v.BODY2,{group:u>0?6:2}),a.seg([.35,.2+o,u*.24],[.42,.03,u*.3],.05,.04,u>0?v.BODY:v.BODY2,{group:u>0?7:2}),a.anchors.feet.push({c:[.45,.03,u*.3],r:.06,group:u>0?7:2},{c:[.12,.04,u*.4],r:.08,group:u>0?6:2});const c=[0,.3+o,0],l=[.5,.28,.4];a.ell(c,l,v.BODY,{paint:u=>u[1]<c[1]-.12?v.BELLY:u[0]>.38&&Math.abs(u[1]-(c[1]-.02))<.018?v.LINE:Rn(u,14,.22)?v.BODY3:void 0});for(const u of[-1,1]){const d=[.3,.55+o,u*.17];a.ell(d,[.1,.09,.1],v.BODY,{group:1}),a.ell(et.surface(d,[.1,.09,.1],k.norm([.6,.5,u*.5])),[.05,.05,.05],s?v.MAGIC2:v.IRIS,{group:1}),a.ell(et.surface(d,[.11,.1,.11],k.norm([.65,.45,u*.5])),[.03,.015,.03],v.EYE,{group:1})}return a.anchors.head={c:[.22,.45+o,0],r:[.3,.2,.3],top:[.18,.62+o,0]},a.anchors.eyes={pts:[-1,1].map(u=>et.surface([.3,.55+o,u*.17],[.1,.09,.1],k.norm([.6,.5,u*.5]))),size:.05},a.anchors.neck={c:[.32,.3+o,0],r:.25,dir:[1,.3,0]},s&&hh(a,[.15,.66+o,0],.16),Sn(a,i,e,n,.55,r)}function Wu(i,e,t,n,r="towards"){const s=e===3,a=e===1,o=h=>s&&i.legend.includes(h),c=new et,l=t?.02:0;for(const h of[-1,1]){const f=t&&h>0?.04:0;c.seg([0,.3,h*.08],[.03,.03+f,h*.08],.03,.025,v.NOSE,{group:h>0?7:2}),c.ell([.08,.02+f,h*.08],[.08,.015,.04],v.NOSE,{group:2}),c.anchors.feet.push({c:[.07,.03+f,h*.08],r:.06,group:h>0?7:2})}if(c.ell([-.55,.42,0],[.32,.035,.12],v.BODY2,{dir:[-1,-.25,0],group:3}),c.ell([0,.52+l,0],[.42,.26,.24],v.BODY,{dir:[1,.45,0]}),!o("wings"))for(const h of[-1,1])c.ell([-.1,.55+l,h*.2],[.45,.17,.05],v.BODY2,{dir:[-1,-.25,0],group:h>0?4:2});const u=[.36,.84+l,0],d=a?.19:.16;if(c.ell(u,[d*1.1,d,d*.95],v.BODY,{paint:h=>h[1]>u[1]+d*.55?v.BELLY:void 0}),c.ell(k.add(u,[d*1.5,-d*.25,0]),[d*1,d*.38,d*.3],v.NOSE,{dir:[1,-.2,0],group:1}),gi(c,u,[d*1.1,d,d*.95],[[.55,.35,.65],[.55,.35,-.65]],d*.16,s?v.MAGIC2:v.EYE),o("wings"))for(const h of[-1,1])ea(c,[-.05,.65+l,h*.18],h,1.1,t?.1:0,h>0?v.MAGIC2:v.MAGIC,v.MAGIC,40+(h>0?10:0));if(o("eyesRing"))for(let h=0;h<6;h++){const f=Math.PI*(.2+h/5*.6);c.ell([Math.cos(f)*.25-.1,.95+Math.sin(f)*.45,(h-2.5)*.12],[.06,.06,.06],v.MAGIC2,{group:95+h,extra:!0})}return Sn(c,i,e,n,.75,r)}function Xu(i,e,t,n,r="towards"){const s=e===3,a=h=>s&&i.legend.includes(h),o=new et,c=t===0,l=.55,u=a("wingsBig")?1.5:1;ch(o,0,.3*u);for(const h of[-1,1]){const f=[0,l+.05,h*.1],g=[.05,l+(c?.35:-.05),h*.45*u],x=[[-.05,l+(c?.45:-.15),h*.85*u],[-.25,l+(c?.2:-.25),h*.75*u],[-.3,l+(c?0:-.25),h*.4*u]],m=a("wingsBig")?v.MAGIC:v.BODY2,p=a("wingsBig")?v.MAGIC2:v.BODY3;o.seg(f,g,.03,.025,p,{group:11});for(const E of x)o.seg(g,E,.02,.012,p,{group:11});const _=k.sub(x[0],f),S=k.norm(_),y=k.norm(k.sub(x[2],g)),w=k.norm(k.sub(y,k.mul(S,k.dot(y,S))));o.flat(k.add(k.lerp(f,x[0],.5),k.mul(w,.12*u)),S,w,Math.hypot(..._)*.55,.3*u,Li.membrane(m),{group:10+(h>0?1:0),bend:.2})}o.ell([0,l,0],[.13,.16,.12],v.BODY,{group:1});const d=[.08,l+.2,0];o.ell(d,[.12,.11,.11],v.BODY,{group:1});for(const h of[-1,1])o.ell(k.add(d,[-.02,.15,h*.07]),[.12,.045,.02],v.BODY,{dir:[.1,1,h*.3],up:[1,0,0],group:1,paint:f=>f[0]>d[0]-.01?v.EAR:void 0});return gi(o,d,[.12,.11,.11],[[.7,.2,.5],[.7,.2,-.5]],.025,s?v.MAGIC2:v.EYE),o.ell(et.surface(d,[.12,.11,.11],[1,-.2,0]),[.025,.02,.03],v.NOSE,{group:1}),Sn(o,i,e,n,.55,r)}function Yu(i,e,t,n,r="towards"){const s=e===3,a=new et,o=t?.03:0;a.seg([-.5,.18,0],[-.62,.12,0],.04,.02,v.SKIN,{group:3});for(const c of[-1,1])a.ell([-.3,.05,c*.2],[.07,.04,.05],v.SKIN,{group:c>0?6:2}),a.anchors.feet.push({c:[-.3,.05,c*.2],r:.07,group:c>0?6:2});a.ell([0,.3,0],[.52,.29,.33],v.BODY,{paint:c=>c[1]>.45?v.BODY2:void 0}),a.ell([.55,.24,0],[.2,.07,.07],v.SKIN,{dir:[1,-.15,0],group:1}),a.ell([.74,.21,0],[.04,.05,.06],v.NOSE,{group:1});for(const c of[-1,1]){const l=[.32,.1-(c>0?o:0),c*.34];a.ell(l,[.13,.035,.12],v.SKIN,{group:c>0?7:2,axes:[[1,0,0],[0,1,0],[0,0,1]]});for(let u=0;u<4;u++)a.ell(k.add(l,[.14,-.01,c*(u-1.5)*.05]),[.05,.015,.015],v.ACCENT,{group:c>0?7:2})}for(const c of[-1,1])a.ell(et.surface([0,.3,0],[.52,.29,.33],k.norm([.85,.3,c*.35])),[.015,.015,.015],s?v.MAGIC2:v.EYE,{group:1});return a.anchors.head={c:[.32,.34,0],r:[.25,.22,.25],top:[.3,.58,0]},a.anchors.eyes={pts:[-1,1].map(c=>et.surface([0,.3,0],[.52,.29,.33],k.norm([.85,.3,c*.35]))),size:.03},a.anchors.neck={c:[.36,.3,0],r:.27,dir:[1,.1,0]},s&&hh(a,[.15,.62,0],.15),Sn(a,i,e,n,.55,r)}function qu(i,e,t,n,r="towards"){const s=e===3,a=d=>s&&i.legend.includes(d),o=new et;for(const d of[-1,1])for(let h=0;h<3;h++){const f=.25-h*.25,g=(h+(d>0?1:0)+t)%2?.06:-.06,x=[f,.22,d*.2];o.chain([[...x,.03],[f+g+(1-h)*.06,.32,d*.42,.025],[f+g*1.5+(1-h)*.15,.02,d*.55,.015]],d>0?v.BODY2:v.BODY3,{group:d>0?7:2})}o.ell([-.12,.34,0],[.46,.24,.32],v.BODY,{paint:d=>Math.abs(d[2])<.018&&d[1]>.4?v.LINE:d[1]>.5&&d[2]>.05&&d[2]<.17?v.BELLY:void 0}),o.ell([.38,.33,0],[.16,.16,.26],v.BODY,{group:1});const c=[.56,.3,0];o.ell(c,[.1,.1,.17],v.BODY2,{group:1});const l=[.3,.5,.7,.75][e]*(a("horn")?1.3:1),u=a("horn")?v.MAGIC:v.BODY3;for(const d of[-1,1]){const h=k.add(c,[.08,.02,d*.1]),f=k.add(h,[l*.7,l*.45,d*l*.15]),g=k.add(f,[l*.25,-l*.12,-d*l*.12]);o.chain([[...h,.045],[...f,.035],[...g,.015]],u,{group:8+(d>0?1:0)}),o.seg(k.lerp(h,f,.55),k.add(k.lerp(h,f,.55),[0,l*.22,0]),.02,.008,u,{group:8})}for(const d of[-1,1])o.chain([[...k.add(c,[.05,.06,d*.1]),.012],[c[0]+.1,.5,d*.22,.012],[c[0]+.2,.5,d*.26,.012]],v.BODY3,{group:9,extra:!0});return gi(o,c,[.1,.1,.17],[[.4,.3,.85],[.4,.3,-.85]],.032,s?v.MAGIC2:v.EYE,9),a("crystals")&&jo(o,[[[-.35,.5,.1],.3],[[-.1,.55,-.08],.45],[[.1,.5,.1],.35]]),Sn(o,i,e,n,.5,r)}function Ku(i,e,t,n,r="towards"){const s=e===3,a=new et,o=t?.04:0;a.ell([0,.07,0],[.6+o,.07,.17],v.SKIN,{group:1}),a.chain([[.45+o,.08,0,.1],[.6+o,.25,0,.09],[.68+o,.28,0,.08]],v.SKIN,{group:1});for(const u of[-1,1])a.seg([.7+o,.32,u*.04],[.78+o,.55,u*.1],.018,.014,v.SKIN,{group:5}),a.ell([.78+o,.57,u*.1],[.03,.03,.03],s?v.MAGIC2:v.EYE,{group:5});a.anchors.head={c:[.68+o,.3,0],r:[.09,.08,.09],top:[.66+o,.38,0]},a.anchors.eyes={pts:[-1,1].map(u=>[.78+o,.57,u*.1]),size:.03},a.anchors.neck={c:[.55+o,.17,0],r:.1,dir:[1,1.2,0]};const c=[-.12,.4,0],l=s?v.MAGIC:v.BODY;return a.ell(c,[.32,.32,.22],l,{group:3,paint:u=>{const d=Math.atan2(u[1]-c[1],u[0]-c[0]);return((Math.hypot(u[0]-c[0],u[1]-c[1])/.32-d/(Math.PI*2)*.3)%.3+.3)%.3<.06?s?v.MAGIC2:v.BODY3:void 0}}),Sn(a,i,e,n,.45,r)}function $u(i,e,t,n,r="towards"){const s=e===3,a=new et;for(const o of[-1,1])for(let c=0;c<7;c++){const l=-.45+c*.15,u=(c+t)%2?.03:-.03;a.seg([l,.1,o*.22],[l+u,.01,o*.33],.025,.015,v.BODY3,{group:o>0?7:2})}for(const o of[-1,1])a.chain([[.5,.15,o*.08,.02],[.7,.3,o*.2,.015],[.82,.22,o*.26,.012]],v.BODY3,{group:9,extra:!0});return a.ell([0,.18,0],[.58,.2,.3],v.BODY,{paint:o=>(Math.floor((o[0]+.6)*9)%2&&o[1]>.2?v.BODY2:void 0)||(Math.abs((o[0]+.6)*9%1)<.12?v.LINE:void 0)}),gi(a,[0,.18,0],[.58,.2,.3],[[.92,.3,.25],[.92,.3,-.25]],.02,s?v.MAGIC2:v.EYE),s&&jo(a,[[[-.3,.32,.05],.3],[[0,.37,-.05],.45],[[.25,.32,.05],.32]]),Sn(a,i,e,n,.4,r)}function Zu(i,e,t,n,r="towards"){const s=e===3,a=e===1,o=f=>s&&i.legend.includes(f),c=new et,l=t?.7:0,u=[];for(let f=0;f<=12;f++){const g=f/12;u.push([-.9+g*1.2,.07,Math.sin(g*Math.PI*2+l)*.25*(1-g*.5),.03+.045*Math.sin(Math.min(1,g*1.4)*Math.PI/2)])}u.push([.38,.25,u[12][2],.07],[.42,.45,u[12][2]*.8,.065]),c.chain(u,v.BODY,{paint:f=>f[1]<.05&&f[0]<.35?v.BELLY:Rn([f[0]*1.5,f[1],f[2]],14,.3)?v.BODY3:void 0});const d=[.5,.5,u[13][2]*.8],h=a?.11:.09;if(c.ell(d,[h*1.5,h*.75,h],v.BODY,{dir:[1,-.15,0],group:1}),gi(c,d,[h*1.5,h*.75,h],[[.5,.5,.7],[.5,.5,-.7]],h*.22,s?v.MAGIC2:v.EYE),t||c.seg(k.add(d,[h*1.4,-h*.2,0]),k.add(d,[h*2.3,-h*.3,0]),.01,.008,v.SKIN,{group:1}),c.anchors.feet.push({c:k.add(u[0].slice(0,3),[-.02,-.01,0]),r:.06,group:3,tail:!0}),c.anchors.neck={c:[.42,.36,u[12][2]*.9],r:.075,dir:[.2,1,0]},o("wings"))for(const f of[-1,1])ea(c,[0,.2,f*.05],f,.9,t?.1:0,f>0?v.MAGIC2:v.MAGIC,v.MAGIC,40+(f>0?10:0));return Sn(c,i,e,n,.45,r)}function Ju(i,e,t,n,r="towards"){const s=e===3,a=h=>s&&i.legend.includes(h),o=new et,c=t===0,l=.55,u=a("wingsBig")?1.45:1,d=a("wingsBig")?v.MAGIC:v.BODY;ch(o,0,.3*u);for(const h of[-1,1]){const f=c?.5:-.1,g=k.norm([.35,f,h]),x=k.norm([-.3,f*.6,h]);o.flat(k.add([0,l,h*.05],k.mul(g,.38*u)),g,k.norm(k.cross(g,[0,1,0])),.4*u,.24*u,Li.spotted(d,v.BELLY,v.BODY3),{group:10+(h>0?1:0)}),o.flat(k.add([-.05,l,h*.05],k.mul(x,.26*u)),x,k.norm(k.cross(x,[0,1,0])),.27*u,.17*u,Li.spotted(a("wingsBig")?v.MAGIC2:v.BODY2,v.BODY2,v.BODY2),{group:12+(h>0?1:0)}),o.chain([[.12,l+.08,h*.03,.015],[.2,l+.25,h*.1,.025],[.24,l+.32,h*.14,.012]],v.BODY2,{group:11})}return o.ell([0,l,0],[.22,.09,.09],v.BELLY,{group:1,paint:h=>Rn(h,30,.25)?v.BODY2:void 0}),o.ell([.17,l+.03,0],[.07,.07,.07],v.BELLY,{group:1}),gi(o,[.17,l+.03,0],[.07,.07,.07],[[.7,.3,.6],[.7,.3,-.6]],.02,s?v.MAGIC2:v.EYE),Sn(o,i,e,n,.5,r)}function Qu(i,e,t,n,r="towards"){const s=e===3,a=l=>s&&i.legend.includes(l),o=new et,c=t?.05:0;for(let l=0;l<9;l++){const u=l/8,d=-.6+u*1.15;o.ell([d,.12+Math.sin(u*Math.PI)*(.06+c),0],[.08,.1-u*.02,.12-u*.03],l<2?v.MAGIC2:l%2?v.BODY2:v.BODY,{group:1})}a("lantern")&&o.ell([-.75,.3,0],[.22,.22,.22],v.MAGIC2,{group:3,paint:l=>l[1]<.2?v.MAGIC:void 0});for(let l=0;l<6;l++)o.seg([-.2+l*.12,.05,.08],[-.2+l*.12+(l%2?.02:-.02)*(t?-1:1),0,.12],.015,.01,v.BODY3,{group:7});return o.ell([.6,.14,0],[.06,.06,.08],v.BODY3,{group:1}),gi(o,[.6,.14,0],[.06,.06,.08],[[.6,.3,.7],[.6,.3,-.7]],.015,s?v.MAGIC2:v.EYE),Sn(o,i,e,n,.4,r)}function ju(i,e,t,n,r="towards"){const s=e===3,a=u=>s&&i.legend.includes(u),o=new et,c=[.15,.28,0];for(const u of[-1,1])for(let d=0;d<4;d++){const h=-.6+d*.4,f=(d+(u>0?0:1)+t)%2?.05:-.05,g=k.add(c,[.05-d*.04,0,u*.1]),x=k.add(g,[Math.cos(h)*.3*(d<2?1:-.6)+f,.3,u*.3]),m=k.add(g,[Math.cos(h)*.55*(d<2?1:-.8)+f*1.5,-.28,u*.55]);o.chain([[...g,.03],[...x,.028],[...m,.015]],u>0?v.BODY2:v.BODY3,{group:u>0?7:2})}o.ell([-.28,.38,0],[.34,.28,.3],v.BODY,{paint:u=>(Math.abs(u[2])<.03||Math.abs(u[0]+.28)<.03)&&u[1]>.45?v.BELLY:void 0}),o.ell(c,[.18,.13,.17],v.BODY2,{group:1}),o.anchors.head={c,r:[.18,.13,.17]},o.anchors.eyes={pts:[[.05,.05],[.05,-.05]].map(([u,d])=>et.surface(c,[.18,.13,.17],k.norm([.9,u*6,d*4]))),size:.03},o.anchors.neck={c:[-.02,.32,0],r:.15,dir:[1,0,0]};const l=a("eyesRing");for(const[u,d]of[[.05,.05],[.05,-.05],[.02,.1],[.02,-.1]])o.ell(et.surface(c,[.18,.13,.17],k.norm([.9,u*6,d*4])),[.025,.025,.025],l?v.MAGIC2:v.EYE,{group:1});if(l)for(let u=0;u<5;u++){const d=Math.PI*(.2+u/4*.6);o.ell([-.3+Math.cos(d)*.2,.75+Math.sin(d)*.35,(u-2)*.12],[.06,.06,.06],v.MAGIC2,{group:95+u,extra:!0})}return Sn(o,i,e,n,.5,r)}const ed=new Map(Object.entries({owl:Gu,hedgehog:Hu,toad:Vu,raven:Wu,bat:Xu,mole:Yu,beetle:qu,snail:Ku,woodlouse:$u,snake:Zu,moth:Ju,glowworm:Qu,spider:ju})),el=[{id:"wolf",name:"Wolf",plan:"quad",hue:.08,sat:.24,val:.56,legend:["wings","mane"],q:{len:.64,chest:.42,tuck:.6,neck:.32,neckAng:.7,neckW:.42,hr:.26,snout:.82,snoutD:.7,ear:"point",earS:.82,tail:"brush",paw:"paw",legW:1.25,saddle:!0,belly:!0},tail:"up"},{id:"fox",name:"Fox",plan:"quad",q:{hgt:.8,len:.62,chest:.4,tuck:.5,neck:.3,neckAng:.7,neckW:.32,hr:.24,snout:1.05,snoutD:.5,snoutTaper:.6,ear:"point",earS:1.35,tail:"bushy",paw:"paw",legW:.9,belly:!0,socks:.3},hue:.06,sat:.8,val:.9,belly:"white",legend:["tails"]},{id:"badger",name:"Badger",plan:"quad",q:{hgt:.62,len:.78,chest:.2,tuck:.22,neck:.18,neckAng:.1,neckW:.5,hr:.26,snout:1,snoutD:.55,snoutTaper:.55,ear:"round",earS:.7,tail:"stub",paw:"paw",legW:1.35,legMat:v.BODY3,face:"badger",shaggy:!0},hue:.65,sat:.08,val:.45,legend:["crystals"]},{id:"boar",name:"Boar",plan:"quad",hue:.07,sat:.62,val:.5,legend:["tusksBig"],q:{len:.72,chest:.34,tuck:.42,neck:.2,neckAng:-.15,neckW:.55,hr:.27,snout:1.25,snoutD:.62,snoutTaper:.55,ear:"small",earS:.8,tail:"thin",paw:"hoof",legW:1.15,ridge:!0,tusks:!0,back:"hump",disc:!0},ridge:!0},{id:"stag",name:"Stag",plan:"quad",q:{hgt:1.3,len:.6,chest:.6,tuck:.7,neck:.55,neckAng:.95,neckW:.32,hr:.2,snout:1.15,snoutD:.6,snoutTaper:.65,ear:"point",earS:1.1,tail:"deer",paw:"hoof",legW:.75,antlers:"branch",rump:!0,spots:"young",belly:!0},hue:.08,sat:.5,val:.7,legend:["antlersGlow"]},{id:"hare",name:"Hare",plan:"quad",q:{hgt:.72,len:.5,chest:.4,tuck:.45,neck:.2,neckAng:.9,neckW:.35,hr:.27,snout:.65,snoutD:.7,ear:"long",earS:2.4,tail:"puff",paw:"paw",legW:.85,haunch:1.35,hindFoot:1.6,back:"arch",belly:!0,whiskers:!0},hue:.08,sat:.4,val:.72,legend:["jackalope"]},{id:"owl",name:"Owl",plan:"owl",hue:.08,sat:.5,val:.55,legend:["eyesRing","wings"]},{id:"bear",name:"Bear",plan:"quad",q:{hgt:1.15,len:.72,chest:.38,tuck:.4,neck:.25,neckAng:.3,neckW:.55,hr:.28,snout:.7,snoutD:.62,snoutTaper:.7,ear:"round",earS:.8,tail:"stub",paw:"paw",legW:1.55,back:"hump",muzzle:!0,shaggy:!0},hue:.07,sat:.55,val:.42,legend:["moss"]},{id:"hedgehog",name:"Hedgehog",plan:"hedgehog",hue:.08,sat:.4,val:.5,legend:["crystals"]},{id:"squirrel",name:"Squirrel",plan:"quad",q:{hgt:.55,len:.45,chest:.35,tuck:.4,neck:.2,neckAng:.9,neckW:.35,hr:.3,snout:.55,snoutD:.65,ear:"tuft",earS:1.1,tail:"squirrel",paw:"paw",legW:.8,haunch:1.3,back:"arch",belly:!0,whiskers:!0},hue:.03,sat:.75,val:.75,belly:"white",legend:["starTail"]},{id:"toad",name:"Toad",plan:"toad",hue:.2,sat:.5,val:.55,legend:["crown"]},{id:"otter",name:"Otter",plan:"quad",q:{hgt:.55,len:1,chest:.25,tuck:.25,neck:.3,neckAng:.35,neckW:.5,hr:.27,snout:.6,snoutD:.7,ear:"round",earS:.5,tail:"otter",paw:"paw",legW:1.1,muzzle:!0,belly:!0,whiskers:!0},hue:.07,sat:.55,val:.45,belly:"white",legend:["ribbons"]},{id:"lynx",name:"Lynx",plan:"quad",q:{hgt:.9,len:.55,chest:.5,tuck:.55,neck:.25,neckAng:.8,neckW:.4,hr:.27,snout:.5,snoutD:.75,snoutTaper:.8,ear:"tuft",earS:1,tail:"bob",paw:"paw",legW:1.2,cheeks:!0,spots:!0,belly:!0,whiskers:!0},hue:.09,sat:.45,val:.75,legend:["mane"]},{id:"elk",name:"Elk",plan:"quad",q:{hgt:1.4,len:.68,chest:.6,tuck:.66,neck:.45,neckAng:.75,neckW:.42,hr:.24,snout:1.6,snoutD:.9,snoutTaper:.85,ear:"point",earS:.9,tail:"stub",paw:"hoof",legW:.9,back:"hump",antlers:"palm",shaggy:!0},hue:.07,sat:.55,val:.38,legend:["antlersGlow","moss"]},{id:"raven",name:"Raven",plan:"raven",hue:.68,sat:.35,val:.3,legend:["wings","eyesRing"]},{id:"bat",name:"Bat",plan:"bat",hue:.78,sat:.25,val:.45,legend:["wingsBig"]},{id:"mole",name:"Mole",plan:"mole",hue:.7,sat:.15,val:.32,legend:["crown"]},{id:"beaver",name:"Beaver",plan:"quad",q:{hgt:.6,len:.65,chest:.2,tuck:.22,neck:.2,neckAng:.4,neckW:.55,hr:.28,snout:.6,snoutD:.75,ear:"round",earS:.45,tail:"flat",paw:"paw",legW:1.2,back:"arch",teeth:!0,whiskers:!0},hue:.06,sat:.6,val:.45,legend:["moss"]},{id:"stoat",name:"Stoat",plan:"quad",q:{hgt:.5,len:1,chest:.3,tuck:.33,neck:.35,neckAng:.6,neckW:.32,hr:.25,snout:.6,snoutD:.6,ear:"round",earS:.6,tail:"stoat",paw:"paw",legW:.8,belly:!0,back:"arch",whiskers:!0},hue:.1,sat:.25,val:.92,legend:["ribbons","mane"]},{id:"snail",name:"Snail",plan:"snail",hue:.08,sat:.45,val:.55,legend:["glowShell"]},{id:"ram",name:"Ram",plan:"quad",q:{hgt:.95,len:.6,chest:.48,tuck:.52,neck:.22,neckAng:.45,neckW:.48,hr:.25,snout:.85,snoutD:.75,snoutTaper:.8,ear:"small",earS:.7,tail:"stub",paw:"hoof",legW:.9,wool:!0,horns:"curl",face:"dark"},hue:.1,sat:.12,val:.88,legend:["hornsGlow"]},{id:"woodlouse",name:"Woodlouse",plan:"woodlouse",hue:.65,sat:.12,val:.45,legend:["crystals"]},{id:"snake",name:"Snake",plan:"snake",hue:.25,sat:.45,val:.45,legend:["wings"]},{id:"moth",name:"Moth",plan:"moth",hue:.1,sat:.3,val:.7,legend:["wingsBig"]},{id:"marten",name:"Pine marten",plan:"quad",q:{hgt:.55,len:.78,chest:.35,tuck:.38,neck:.3,neckAng:.55,neckW:.35,hr:.25,snout:.65,snoutD:.6,ear:"round",earS:.9,tail:"bushy",paw:"paw",legW:.85,belly:!0,back:"arch"},hue:.07,sat:.6,val:.45,legend:["mane"]},{id:"salamander",name:"Salamander",plan:"quad",q:{hgt:.42,len:.9,chest:.14,tuck:.14,neck:.12,neckAng:.05,neckW:.5,hr:.27,snout:.55,snoutD:.55,ear:"none",tail:"otter",paw:"paw",legW:1,spots:!0,spotMat:"belly"},hue:.1,sat:.1,val:.22,belly:"yellow",legend:["flames"]},{id:"glowworm",name:"Glow-worm",plan:"glowworm",hue:.12,sat:.4,val:.35,legend:["lantern"]},{id:"spider",name:"Spider",plan:"spider",hue:.07,sat:.45,val:.4,legend:["eyesRing"]},{id:"dormouse",name:"Dormouse",plan:"quad",q:{hgt:.38,len:.45,chest:.35,tuck:.38,neck:.15,neckAng:.6,neckW:.4,hr:.34,snout:.45,snoutD:.7,ear:"round",earS:.85,tail:"squirrel",paw:"paw",legW:.8,back:"arch",belly:!0,whiskers:!0,eyeK:1.6},hue:.09,sat:.6,val:.75,belly:"white",legend:["starTail"]},{id:"beetle",name:"Stag beetle",plan:"beetle",hue:.78,sat:.5,val:.35,legend:["horn","crystals"]}],uh=Object.fromEntries(el.map(i=>[i.id,i])),eo=[[[255,70,170],[255,245,250],[255,230,70]],[[40,220,255],[255,236,60],[255,80,180]],[[150,80,255],[175,255,60],[255,255,255]]],to={sneakers:[[255,70,90],[250,250,245]],glitter:[[215,215,235],[190,190,210]],platform:[[160,60,230],[40,30,52]]},td=["bar","star","heart"];function nd(i,e=!0){const t=Qs((i|0)*7919+17),n=t()<.12;return{collar:e,hat:n||t()<.45?Math.floor(t()*eo.length):null,glasses:n||t()<.4?td[t()<.6?0:t()<.5?1:2]:null,shoes:n||t()<.4?Object.keys(to)[Math.floor(t()*3)]:null}}function id(i,e,t=null){const n=rd(i,e);if(!t)return n;if(t.collar&&(n[v.COLLAR]=Array.isArray(t.collar)?t.collar:n[v.MAGIC]),t.hat!=null){const[r,s,a]=eo[t.hat%eo.length];n[v.HAT1]=r,n[v.HAT2]=s,n[v.POM]=a}if(t.glasses&&(n[v.SHADES]=[22,18,32],n[v.FRAME]=t.glasses==="heart"?[255,60,110]:[255,90,210]),t.shoes){const[r,s]=to[t.shoes]||to.sneakers;n[v.SHOE]=r,n[v.SOLE]=s}if(t.woken){n[v.WOKEN]=[255,40,36];for(const r of[v.BODY,v.BODY2,v.BODY3,v.BELLY,v.ACCENT,v.EAR])n[r]&&(n[r]=n[r].map((s,a)=>Math.round(s*.72+[30,8,12][a]*.1)))}return n}function rd(i,e){const t=uh[i],n=e.cVal/.85,r=e.cSat/.6,s=we(t.hue,t.sat*r*e.sat,t.val*n),a=t.belly==="yellow"?[240,196,40]:t.belly==="white"||t.q?.face==="badger"?[236,232,222]:we(t.hue+.03,t.sat*.5*r,Math.min(1,t.val*n*1.3+.08)),o=we(e.magicHue+t.hue*.3,.6,1),c=we(e.magicHue+t.hue*.3,.18,1),l=["boar","stag","elk","ram"].includes(t.id);return{[v.BODY]:s,[v.BODY2]:we(t.hue+.02,Math.min(1,t.sat*r*1.2+.05),t.val*n*.66),[v.BODY3]:we(t.hue+.03,Math.min(1,t.sat*r*1.3+.1),t.val*n*.4),[v.BELLY]:a,[v.ACCENT]:l?[236,226,200]:we(t.hue+.05,t.sat*.6,Math.min(1,t.val*n*.5+.25)),[v.MAGIC]:o,[v.MAGIC2]:c,[v.LEAF]:we(.3,.55,.55),[v.LEAF2]:we(.25,.5,.75),[v.LEAF3]:we(.33,.6,.35),[v.TRUNK]:we(.07,.45,.32),[v.EYE]:[24,18,30],[v.PUPIL]:[70,40,90],[v.GLINT]:[255,255,245],[v.NOSE]:[38,28,36],[v.EAR]:we(t.hue+.97,Math.min(1,t.sat*.6+.2),Math.min(1,t.val*n*.55+.2)),[v.IRIS]:t.plan==="owl"?[255,176,40]:we(.12,.7,.85),[v.SKIN]:[238,158,192]}}const sd=["size","growth","pixel","head","eye","legs","long","fur"],Er=new Map;function ad(i,e,t,n,r="towards",s=null){const a=uh[i]||el[0],o=s&&(s.collar||s.hat!=null||s.glasses||s.shoes||s.woken)?s:null,c=[a.id,e,t,r,...sd.map(u=>n[u]),o?[!!o.collar,o.hat??"",o.glasses||"",o.shoes||"",!!o.woken].join(","):""].join("|");let l=Er.get(c);if(!l){if(l=Nu(o,()=>a.q?Bu(a,e,t,n,r):ed.get(a.plan)(a,e,t,n,r)),o?.woken)for(let u=0;u<l.m.length;u++)(l.m[u]===v.EYE||l.m[u]===v.IRIS||l.m[u]===v.PUPIL)&&(l.m[u]=v.WOKEN);Er.size>600&&Er.delete(Er.keys().next().value),Er.set(c,l)}return l}const ta=.07,tl=.048,qe=(...i)=>({l:i}),vt=(i,e,t,n,r)=>({a:[i,e,t,n,r]}),Wt=(i,e)=>({d:[i,e]}),ht=(i,e=.86)=>qe([.5,e],[.5,i]),ut=vt(.5,.76,.13,25,155),od=i=>i.l?{l:i.l.map(([e,t])=>[1-e,t])}:i.a?{a:[1-i.a[0],i.a[1],i.a[2],180-i.a[3],180-i.a[4]]}:{d:[1-i.d[0],i.d[1]]},dt=(...i)=>i.flatMap(e=>[e,od(e)]);function Hn(i,e,t){const n=e[0]-i[0],r=e[1]-i[1],s=Math.hypot(n,r),a=t*s,o=(s*s/4+a*a)/(2*Math.abs(a)),c=(i[0]+e[0])/2,l=(i[1]+e[1])/2,u=r/s,d=-n/s,h=(o-Math.abs(a))*Math.sign(a),f=c-u*h,g=l-d*h,x=Math.atan2(i[1]-g,i[0]-f)*180/Math.PI;let p=Math.atan2(e[1]-g,e[0]-f)*180/Math.PI-x;for(;p>180;)p-=360;for(;p<-180;)p+=360;return vt(f,g,o,x,x+p)}const ld=(i,e,t,n,r,s=24)=>qe(...Array.from({length:s+1},(a,o)=>[i+n*Math.sin(o/s*r*2*Math.PI),e+(t-e)*o/s])),cd=(i,e,t,n,r,s=0,a=40)=>qe(...Array.from({length:a+1},(o,c)=>{const l=c/a,u=(s+l*r*360)*Math.PI/180,d=t+(n-t)*l;return[i+d*Math.cos(u),e+d*Math.sin(u)]})),Zr=(i,e,t,n,r)=>r.map(s=>{const a=Math.cos(s*Math.PI/180),o=Math.sin(s*Math.PI/180);return qe([i+t*a,e+t*o],[i+n*a,e+n*o])}),hd={wolf:[ht(.3),qe([.28,.08],[.5,.3],[.72,.08]),vt(.5,.55,.2,-55,55),ut,Wt(.5+.2*Math.cos(-55*Math.PI/180),.55+.2*Math.sin(-55*Math.PI/180))],fox:[ht(.34),qe([.36,.06],[.5,.34],[.64,.06]),vt(.67,.66,.17,180,-80),Wt(.67+.17*Math.cos(-80*Math.PI/180),.66+.17*Math.sin(-80*Math.PI/180)),ut],badger:[ht(.1),qe([.24,.3],[.76,.3]),...dt(qe([.33,.14],[.33,.56])),ut,...dt(Wt(.24,.3))],boar:[ht(.16),...dt(vt(.36,.24,.15,45,180)),...Zr(.5,.16,0,.1,[-130,-90,-50]),ut],stag:[ht(.42),...dt(qe([.5,.42],[.34,.26],[.3,.06]),qe([.335,.25],[.16,.2]),qe([.32,.15],[.18,.07])),ut],hare:[ht(.44),...dt(qe([.5,.44],[.4,.34],[.38,.06])),vt(.62,.66,.09,180,540),ut,...dt(Wt(.38,.06))],owl:[ht(.44),...dt(vt(.33,.3,.13,0,360),qe([.24,.18],[.18,.05])),ut,...dt(Wt(.33,.3))],bear:[ht(.24),qe([.24,.3],[.76,.3]),...dt(vt(.3,.3,.09,180,360)),...dt(qe([.36,.5],[.32,.62])),ut],hedgehog:[ht(.52),vt(.5,.52,.2,180,360),...Zr(.5,.52,.22,.34,[-160,-125,-90,-55,-20]),ut],squirrel:[ht(.2),qe([.5,.2],[.4,.08]),vt(.66,.4,.16,100,-200),Wt(.66+.16*Math.cos(-200*Math.PI/180),.4+.16*Math.sin(-200*Math.PI/180)),ut],toad:[ht(.42),qe([.16,.54],[.24,.42],[.76,.42],[.84,.54]),...dt(vt(.34,.3,.1,0,360)),ut,...dt(Wt(.16,.54))],otter:[ht(.24),vt(.5,.5,.28,-100,100),Wt(.5+.28*Math.cos(-100*Math.PI/180),.5+.28*Math.sin(-100*Math.PI/180)),Hn([.18,.64],[.36,.64],.3),ut],lynx:[ht(.32),qe([.26,.2],[.5,.32],[.74,.2]),...dt(qe([.26,.2],[.26,.06])),qe([.5,.68],[.66,.62]),ut,...dt(Wt(.26,.06))],elk:[ht(.3),...dt(qe([.5,.3],[.42,.2]),vt(.3,.16,.12,0,180),qe([.18,.16],[.14,.06])),qe([.5,.44],[.6,.52]),ut],raven:[ht(.14),qe([.5,.14],[.3,.22]),qe([.18,.56],[.5,.38],[.82,.56]),ut,Wt(.58,.17),...dt(Wt(.18,.56))],bat:[ht(.3),vt(.5,.16,.14,20,160),...dt(qe([.5,.38],[.12,.26]),Hn([.12,.26],[.24,.46],-.25),Hn([.24,.46],[.38,.5],-.3),Hn([.38,.5],[.5,.52],-.3)),ut],mole:[ht(.44),vt(.5,.3,.16,0,180),...Zr(.5,.3,.19,.3,[-160,-125,-55,-20]),qe([.5,.14],[.5,.04]),ut],beaver:[ht(.36),qe([.32,.2],[.68,.2]),...dt(qe([.44,.2],[.44,.34])),qe([.5,.56],[.68,.66],[.5,.76],[.32,.66],[.5,.56]),ut],stoat:[ht(.18),vt(.5,.44,.24,180,360),qe([.5,.18],[.6,.08]),ut,...dt(Wt(.26,.44))],snail:[ht(.52),cd(.5,.33,.03,.2,1.6,90),qe([.66,.2],[.76,.06]),ut,Wt(.76,.06)],ram:[ht(.24),...dt(vt(.36,.24,.14,0,-250)),ut,...dt(Wt(.36+.14*Math.cos(-250*Math.PI/180),.24+.14*Math.sin(-250*Math.PI/180)))],woodlouse:[ht(.24),vt(.5,.52,.22,205,335),vt(.5,.66,.24,205,335),vt(.5,.38,.2,205,335),...dt(qe([.5,.24],[.32,.06])),ut],snake:[ht(.16),ld(.5,.82,.2,.2,1.25),qe([.5,.2],[.5,.11]),...dt(qe([.5,.11],[.42,.045])),ut],moth:[ht(.2),...dt(qe([.5,.3],[.16,.18],[.24,.5],[.5,.4]),qe([.5,.5],[.3,.64],[.5,.66]),vt(.38,.16,.12,0,-110)),ut],marten:[ht(.32),qe([.3,.2],[.5,.32],[.7,.2]),...dt(vt(.3,.14,.07,90,-180)),vt(.28,.56,.22,0,150),Wt(.28+.22*Math.cos(150*Math.PI/180),.56+.22*Math.sin(150*Math.PI/180)),ut],salamander:[ht(.3),Hn([.5,.3],[.5,.06],.35),Hn([.5,.3],[.5,.06],-.35),...dt(qe([.5,.42],[.32,.38],[.26,.48]),qe([.5,.64],[.32,.6],[.26,.7])),ut,...dt(Wt(.38,.52))],glowworm:[ht(.4),vt(.5,.27,.1,90,450),...Zr(.5,.27,.15,.25,[0,60,120,180,240,300]),ut],spider:[qe([.5,.05],[.5,.3]),ht(.5),vt(.5,.4,.11,-90,270),...dt(...[-150,-170,170,150].map(i=>qe([.5+.12*Math.cos(i*Math.PI/180),.4+.12*Math.sin(i*Math.PI/180)],[.5+.28*Math.cos(i*Math.PI/180),.4+.28*Math.sin(i*Math.PI/180)],[.5+.32*Math.cos(i*Math.PI/180),.4+.28*Math.sin(i*Math.PI/180)+.1]))),ut,Wt(.5,.05)],dormouse:[ht(.12),vt(.5,.46,.24,-60,250),...dt(vt(.34,.16,.08,90,-180)),Hn([.56,.38],[.7,.38],-.4),ut],beetle:[ht(.36),...dt(vt(.66,.26,.2,160,250)),Hn([.5,.38],[.5,.82],.25),Hn([.5,.38],[.5,.82],-.25),ut]},Hl={pink:[255,64,200],cyan:[50,235,255],acid:[175,255,45],violet:[165,95,255],orange:[255,135,35],lemon:[255,238,70],red:[255,55,95],mint:[70,255,175],blue:[70,145,255],magenta:[235,70,255]},ud={badger:"pink",boar:"cyan",snail:"acid",fox:"violet",ram:"orange",woodlouse:"lemon",hedgehog:"red",squirrel:"mint",wolf:"blue",stag:"magenta",stoat:"pink",snake:"cyan",hare:"acid",owl:"violet",bear:"orange",toad:"lemon",otter:"red",lynx:"mint",elk:"blue",raven:"magenta",bat:"pink",mole:"cyan",beaver:"acid",beetle:"violet",moth:"orange",marten:"lemon",salamander:"red",glowworm:"mint",spider:"blue",dormouse:"magenta"},na=i=>Hl[ud[i]]||Hl.cyan,dd=[255,255,250],fd=(i,e,t)=>i.map((n,r)=>Math.round(n+(e[r]-n)*t)),Vl=i=>`rgb(${i.join(",")})`;function pd(i=0){const e=Math.max(0,i);return{level:e,metres:2+e+Math.max(0,e-2)*.5,core:1+.2*e,halo:Math.min(1,.45+.19*e),rings:Math.min(e>=4?3:2,Math.floor(e)),band:e>=3,rays:e>=4?8:e>=3?4:0,shimmer:e>=3}}function Cs(i){if(i.d)return{dot:!0,pts:[i.d],len:tl*2};let e=i.l;if(i.a){const[n,r,s,a,o]=i.a,c=Math.max(6,Math.ceil(Math.abs(o-a)/8));e=Array.from({length:c+1},(l,u)=>{const d=(a+(o-a)*u/c)*Math.PI/180;return[n+s*Math.cos(d),r+s*Math.sin(d)]})}let t=0;for(let n=1;n<e.length;n++)t+=Math.hypot(e[n][0]-e[n-1][0],e[n][1]-e[n-1][1]);return{dot:!1,pts:e,len:t}}const no=(i,e=0,t=1)=>{const n=i.reduce((s,a)=>s+a.len,0)||1;let r=0;for(const s of i)s.start=e+(t-e)*r/n,r+=s.len,s.end=e+(t-e)*r/n;return i},ma=new Map;function dh(i){return ma.has(i)||ma.set(i,no((hd[i]||[]).map(e=>({...Cs(e),w:ta,part:"sigil"})))),ma.get(i)}const ga=new Map;function md(i,e=0){const t=i+":"+e;if(ga.has(t))return ga.get(t);const n=e===null?null:pd(e),r=n?n.rings>=2?.6:n.rings?.66:.8:1,s=(1-r)/2,a=n?n.core:1,o=ta*.55*Math.min(1.6,.8+.25*(n?.level??0)),c=[];if(n){const f=g=>Cs({a:[.5,.5,g,90,450]});for(let g=0;g<n.rings;g++)c.push({...f(.44-g*.06),w:o,part:"ring"});if(n.band&&n.rings>=2)for(let g=0;g<16;g++){const x=(90+g*22.5)*Math.PI/180,m=.44-.06+.014,p=.44-.014;c.push({...Cs({l:[[.5+m*Math.cos(x),.5+m*Math.sin(x)],[.5+p*Math.cos(x),.5+p*Math.sin(x)]]}),w:o*.8,part:"band"})}for(let g=0;g<n.rays;g++){const x=(90+g*360/n.rays)*Math.PI/180,m=.44+.02,p=.5-o/2;c.push({...Cs({l:[[.5+m*Math.cos(x),.5+m*Math.sin(x)],[.5+p*Math.cos(x),.5+p*Math.sin(x)]]}),w:o*1.3,part:"ray"})}}const l=Math.min(1.25,a),u=dh(i).map(h=>({dot:h.dot,len:h.len*r,pts:h.pts.map(([f,g])=>[s+f*r,s+g*r]),w:h.w*r*l,r:tl*r*l,part:"sigil"})),d={level:e,frame:n,k:r,strokes:[...no(c,0,c.length?.15:0),...no(u,c.length?.15:0,1)]};return ga.set(t,d),d}function gd(i,e){if(e>=i.end)return i.pts;if(e<=i.start)return null;if(i.dot)return i.pts;let t=(e-i.start)/(i.end-i.start)*i.len;const n=[i.pts[0]];for(let r=1;r<i.pts.length;r++){const s=i.pts[r-1],a=i.pts[r],o=Math.hypot(a[0]-s[0],a[1]-s[1]);if(t<=o){n.push([s[0]+(a[0]-s[0])*t/o,s[1]+(a[1]-s[1])*t/o]);break}n.push(a),t-=o}return n}function xd(i,e,{x:t=0,y:n=0,size:r=64,level:s=null,colour:a=na(e),progress:o=1,glow:c=!0}={}){const l=md(e,s),u=l.frame?l.frame.halo:.7;i.save(),i.translate(t,n),i.scale(r,r),i.lineCap="round",i.lineJoin="round";const d=(h,f,g,x)=>{i.globalAlpha=g,i.strokeStyle=i.fillStyle=Vl(h),i.shadowColor=Vl(a),i.shadowBlur=x;for(const m of l.strokes){const p=gd(m,o);if(p){if(i.beginPath(),m.dot){i.arc(p[0][0],p[0][1],m.r*(f>1?1.5:1),0,Math.PI*2),i.fill();continue}i.lineWidth=m.w*f,p.forEach((_,S)=>S?i.lineTo(_[0],_[1]):i.moveTo(_[0],_[1])),i.stroke()}}};c?(d(a,2.4,Math.min(u,.7)*.55,r/12),d(fd(a,dd,.72),.62,1,r/30)):d(a,1,1,0),i.restore()}function vd(i,e,t,n){let r=1/0;for(const s of i){if(s.start>=r)break;if(s.dot){Math.hypot(e-s.pts[0][0],t-s.pts[0][1])<tl+n-ta/2&&(r=s.start);continue}let a=0;for(let o=1;o<s.pts.length;o++){const c=s.pts[o-1],l=s.pts[o],u=l[0]-c[0],d=l[1]-c[1],h=u*u+d*d,f=Math.sqrt(h),g=h?Math.max(0,Math.min(1,((e-c[0])*u+(t-c[1])*d)/h)):0;if(Math.hypot(e-c[0]-u*g,t-c[1]-d*g)<n){const x=s.start+(a+g*f)/s.len*(s.end-s.start);x<r&&(r=x)}a+=f}}return r}function _d(i,e,t,n=ta/2){return vd(dh(i),e,t,n)<1/0}el.map(i=>i.id);const Md=new Set([v.TRUNK,v.BARK2,v.BARKD,v.BARKL]);function Pi(i,e,t,n,r,s,{mat:a=v.LEAF,group:o=30,ragged:c=1}={}){const u=[];for(let p=0;p<9;p++){const _=p/9*Math.PI*2,S=1+(s()-.5)*.35*(r.clump+.3);u.push([e[0]+Math.cos(_)*t*S,e[1]+Math.sin(_)*n*S*(Math.sin(_)>0?.8:1)])}const d=Math.max(1,Math.round(Math.min(t,n)/3.5));i.shape(js(u,0,9,d,Math.max(1.2,Math.min(t,n)*.14)*c,1),a,{group:o,line:!1,round:r.round}),i.mark([bt(e,[-t*1.1,n*.15]),bt(e,[t*1.1,n*.1]),bt(e,[t*1.1,n*1.2]),bt(e,[-t*1.1,n*1.2])],v.LEAF3,[a]),i.mark([bt(e,[-t*.75,-n*.55]),bt(e,[t*.25,-n*.95]),bt(e,[t*.55,-n*.35]),bt(e,[-t*.2,-n*.05])],v.LEAF2,[a]);const h=Math.floor(e[0]-t*1.2),f=Math.ceil(e[0]+t*1.2),g=Math.floor(e[1]-n*1.2),x=Math.ceil(e[1]+n*1.2),m=s()*1e4|0;for(let p=g;p<=x;p++)for(let _=h;_<=f;_++){const S=i.get(_,p);if(S!==a&&S!==v.LEAF2&&S!==v.LEAF3)continue;const y=Tt(_,p,m),w=hi(_/2,p/2,m)*.5+y*.5;w<.16*r.density?i.recolour(_,p,S===v.LEAF2?a:v.LEAF2):w>1-.16*r.density&&i.recolour(_,p,S===v.LEAF3?a:v.LEAF3)}}function mi(i,e,t,n,r,s,a,o,{mat:c=v.TRUNK,bend:l=1,group:u=10,line:d=!1}={}){const h=[e],f=4;let g=t,x=e;for(let m=1;m<=f;m++)g+=(o()-.5)*.7*a.gnarl*l,x=bt(x,[Math.cos(g)*n/f,Math.sin(g)*n/f]),h.push(x);return i.limb(h.map((m,p)=>[...m,r+(s-r)*p/f]),c,{group:u,line:d,round:a.round,cap:.6,capEnd:1}),{end:x,ang:g,pts:h}}function ia(i,e,t,n,r,s,a){if(i.shape([[e-n*1.05,t],[e-n*.62,t-n*.5],[e-n*.45,t-n*1.4],[e+n*.45,t-n*1.4],[e+n*.62,t-n*.5],[e+n*1.05,t]],v.TRUNK,{group:10,round:r.round}),r.roots<=0)return;const o=Math.round(2+r.roots*4);for(let c=0;c<o;c++){const l=c%2?1:-1,u=(8+s()*16)*a*(.4+r.roots),d=(2+s()*3)*a,h=[e+l*n*.2,t-n*.5],f=[e+l*(n*.55+u*.4),t-d],g=[e+l*(n*.5+u),t-.5];i.limb([[...h,n*.55],[...f,n*.28],[...g,1.2]],v.TRUNK,{group:11,round:r.round,cap:.5,capEnd:.6})}}function ra(i,e,t=!0){if(!(e.bark<=0))for(let n=0;n<i.h;n++)for(let r=0;r<i.w;r++){const s=n*i.w+r;if(i.m[s]!==v.TRUNK)continue;const a=t?hi(r/1.3,n/6,21):hi(r/6,n/1.3,21);a>1-e.bark*.42||Tt(r,n,4)<e.bark*.05?i.m[s]=v.BARKD:a>1-e.bark*.62&&i.n[s*3]<-.1&&(i.m[s]=v.BARKL)}}function dr(i,e,t){let n=i.w,r=-1,s=i.h;for(let h=0;h<i.h;h++)for(let f=0;f<i.w;f++)i.m[h*i.w+f]&&(n=Math.min(n,f),r=Math.max(r,f),s=Math.min(s,h));if(r<0)return{sp:i,crownY:t};const a=Math.max(e-n,r-e)+2,o=Math.max(0,Math.floor(e-a)),c=Math.min(i.w-o,Math.ceil(a*2)+1),l=Math.max(0,s-1),u=i.h-l,d=new sn(c,u);for(let h=0;h<u;h++)for(let f=0;f<c;f++){const g=(h+l)*i.w+f+o,x=h*c+f;d.m[x]=i.m[g],d.g[x]=i.g[g],d.n[x*3]=i.n[g*3],d.n[x*3+1]=i.n[g*3+1],d.n[x*3+2]=i.n[g*3+2]}return{sp:d,crownY:t-l}}const Wr=i=>(i.crownWidth||3)/3;function fh(i,e,t){const n=Wr(e),r=Math.round(220*t*n+60*t),s=Math.round(140*t),a=new sn(r,s),o=r/2,c=s,l=e.treeTrunks||1,u=12*t*(e.treeThick||1)*(e.treeThin?.55:1)/Math.sqrt(l),d=(i()-.5)*.5*e.gnarl+(e.treeLean||0),h=[];let f=s;const g=(x,m,p,_,S)=>{const y=mi(a,x,m,p,_,_*.65,e,i,{group:12});if(S===0){h.push(y.end);return}const w=i()<.35?3:2;for(let E=0;E<w;E++){const R=(E-(w-1)/2)*ye(i,.5,.85)*(S===3?1.4:1);g(y.end,y.ang+R+(i()-.5)*.25,p*ye(i,.6,.78),_*.62,S-1)}S<=2&&h.push(Zn(x,y.end,.7))};for(let x=0;x<l;x++){const m=d+(l>1?(x/(l-1)-.5)*.8:0),p=[o+(x-(l-1)/2)*u*.6,c],_=mi(a,p,-Math.PI/2+m,s*.36*(l>1?ye(i,.75,1.15):1),u,u*.72,e,i,{bend:1.4});f=Math.min(f,_.end[1]);for(const S of[-1,1])g(_.end,-Math.PI/2+m*.5+S*ye(i,.55,.95)*(.7+.3*n)*(l>1?.6:1),s*.22*(.75+.25*n)*(l>1?.7:1),u*.7,l>2?2:3);if(l===1&&i()<.7&&g(_.end,-Math.PI/2+(i()-.5)*.3,s*.18,u*.55,2),x===0&&e.treeHollow){const S=Zn(p,_.end,.38);a.ellipse(S[0],S[1],u*.28,u*.5,v.NOSE,{round:.3})}}if(ia(a,o,c,u*Math.sqrt(l),e,i,t),ra(a,e),e.treeWebs)for(let x=0;x+1<h.length;x+=2){const m=h[x],p=h[x+1],_=Math.hypot(p[0]-m[0],p[1]-m[1]);if(_<40*t)for(let S=0;S<=_;S++){const y=Zn(m,p,S/_);a.px(y[0],y[1]+Math.sin(S/_*Math.PI)*_*.15,v.WEB,0,0,1)}}if(e.treeBare)return dr(a,o,f+4*t);h.sort((x,m)=>x[1]-m[1]);for(const x of h)Pi(a,bt(x,[0,-3*t]),ye(i,14,21)*t,ye(i,10,14)*t,e,i,{mat:i()<.35?v.LEAF3:v.LEAF});for(const x of h)i()<.75&&Pi(a,bt(x,[ye(i,-9,9)*t,ye(i,-12,-3)*t]),ye(i,10,15)*t,ye(i,7,10)*t,e,i);return dr(a,o,f+4*t)}function nl(i,e,t){const n=.8+.2*Wr(e),r=Math.round(90*t*n),s=Math.round(160*t),a=new sn(r,s),o=r/2,c=s;a.limb([[o,c,6*t],[o,c-s*.5,4*t],[o,6*t,1.5]],v.TRUNK,{group:10,round:e.round}),ia(a,o,c,6*t,e,i,t*.6),ra(a,e);const l=Math.round(ye(i,9,12));for(let u=l-1;u>=0;u--){const d=u/(l-1),h=6*t+d*s*.7,f=(5+d*36)*t*n*ye(i,.9,1.1),g=(5+d*13)*t,x=[[o,h-4*t],[o+f*.5,h+g*.3],[o+f,h+g],[o+f*.7,h+g*1.15],[o,h+g*.7],[o-f*.7,h+g*1.15],[o-f,h+g],[o-f*.5,h+g*.3]];a.shape(js(x,1,7,Math.max(2,Math.round(f/(3*t))),2*t,1),v.LEAF,{group:30+u,line:!1,round:e.round}),a.mark([[o-f,h+g*.55],[o+f,h+g*.55],[o+f,h+g*1.4],[o-f,h+g*1.4]],v.LEAF3,[v.LEAF]),a.mark([[o-f*.55,h-2*t],[o+f*.1,h-3*t],[o+f*.1,h+g*.45],[o-f*.7,h+g*.7]],v.LEAF2,[v.LEAF])}return dr(a,o,s*.82)}function ph(i,e,t){const n=Wr(e),r=Math.round(200*t*n+50*t),s=Math.round(130*t),a=new sn(r,s),o=r/2,c=s,l=13*t,u=mi(a,[o,c],-Math.PI/2+(i()-.5)*.3,s*.3,l,l*.8,e,i,{bend:1.6}),d=[];for(let g=0;g<5;g++){const x=g%2?1:-1,m=-Math.PI/2+x*ye(i,.55,1.25)*(.7+.3*n),p=mi(a,u.end,m,s*ye(i,.3,.42)*(.8+.2*n),l*.55,l*.3,e,i,{group:12});d.push(p.end)}ia(a,o,c,l,e,i,t),ra(a,e);for(const g of d)Pi(a,bt(g,[0,-2*t]),ye(i,20,28)*t,ye(i,9,12)*t,e,i);Pi(a,bt(u.end,[0,-8*t]),24*t,11*t,e,i);let h=r,f=0;for(const g of d)h=Math.min(h,g[0]-22*t),f=Math.max(f,g[0]+22*t);for(let g=h;g<f;g+=ye(i,1,1.7)){let x=s;for(let S=0;S<s;S++)if(a.get(g,S)===v.LEAF||a.get(g,S)===v.LEAF2||a.get(g,S)===v.LEAF3){x=S;break}if(x>=s)continue;const m=Math.abs(g-o)/(r/2),p=(c-x)*ye(i,.5,.9)*(1-m*.3),_=Tt(g|0,1,9)<.4?v.LEAF2:v.LEAF;for(let S=x+2;S<Math.min(c-2,x+p);S++){const y=Math.round(Math.sin(S*.12+g)*.7);Tt(g|0,S,5)<.2+e.density*.8&&a.px(g+y,S,(S-x)/p>.8?v.LEAF3:_,y*.3,.2,.95)}}return dr(a,o,u.end[1]+6*t)}function mh(i,e,t){const n=.7+.3*Wr(e),r=Math.round(110*t*n),s=Math.round(155*t),a=new sn(r,s),o=r/2,c=s,l=(i()-.5)*.25+(e.treeLean||0),u=mi(a,[o,c],-Math.PI/2+l,s*.85,5*t,2*t,e,i,{mat:v.BARK2,bend:.4});for(let h=0;h<u.pts.length-1;h++)for(let f=0;f<1;f+=1/8){const g=Zn(u.pts[h],u.pts[h+1],f+i()*.1);if(i()<.55)for(let x=-3;x<=3;x++)a.get(g[0]+x,g[1])===v.BARK2&&i()<.8&&a.recolour(g[0]+x,g[1],v.BARKD)}const d=[u.end];for(let h=0;h<7;h++){const f=ye(i,.35,.9),g=Zn(u.pts[0],u.end,f),x=h%2?1:-1,m=mi(a,g,-Math.PI/2+x*ye(i,.5,1),s*ye(i,.12,.2)*n,2*t,1,e,i,{mat:v.BARKD,group:12});d.push(m.end)}for(const h of d)Pi(a,h,ye(i,9,13)*t*n,ye(i,7,10)*t,e,i,{mat:v.LEAF2,ragged:1.3});return dr(a,o,s*.55)}function gh(i,e,t){const n=Wr(e),r=Math.round(220*t*n+50*t),s=Math.round(120*t),a=new sn(r,s),o=r/2,c=s,l=10*t,u=mi(a,[o,c],-Math.PI/2+(i()-.5)*.4*(e.gnarl+.3),s*.4,l,l*.75,e,i,{bend:1.2}),d=[];for(const g of[-1,1,-1,1]){const x=mi(a,u.end,-Math.PI/2+g*ye(i,.7,1.15)*(.7+.3*n),s*ye(i,.3,.42)*(.7+.3*n),l*.55,l*.25,e,i,{group:12});d.push(x.end,Zn(u.end,x.end,.55))}ia(a,o,c,l,e,i,t),ra(a,e);const h=Math.round(ye(i,2,3)),f=Math.min(...d.map(g=>g[1]));for(let g=0;g<h;g++){const x=f-6*t+g*9*t,m=(95-g*12)*t*(.65+.35*n);for(let p=0;p<5;p++)Pi(a,[o+(p-2)*m*.36+ye(i,-5,5)*t,x+ye(i,-3,3)*t],m*ye(i,.2,.26),7*t,e,i,{mat:g===h-1?v.LEAF:v.LEAF3})}return dr(a,o,u.end[1]+4*t)}function il(i,e,t){const n=e.leafHue+(i()-.5)*e.leafVariety*.7+(t===nl?.06:0);return{[v.TRUNK]:we(e.trunkHue,.45*e.sat,.34),[v.BARKD]:we(e.trunkHue+.03,.5*e.sat,.17),[v.BARKL]:we(e.trunkHue-.01,.38*e.sat,.5),[v.BARK2]:[222,220,212],[v.LEAF]:we(n,.62*e.sat,.58),[v.LEAF2]:we(n-.05,.55*e.sat,.8),[v.LEAF3]:we(n+.03,.66*e.sat,.38),[v.WEB]:[225,225,232]}}function Sd(i){const{sp:e,crownY:t}=i,n=new sn(e.w,e.h),r=new sn(e.w,e.h);for(let s=0;s<e.h;s++)for(let a=0;a<e.w;a++){const o=s*e.w+a,c=e.m[o];if(!c)continue;(Md.has(c)&&s>=t?r:n).put(a,s,c,e.n[o*3],e.n[o*3+1],e.n[o*3+2])}return{top:n,bot:r}}function yd(i,e){const t=e.bushSize,n=rh(i,["round","round","fern","grass","shrub"]),r=Math.round(40*t),s=Math.round(28*t),a=new sn(r,s);if(n==="round"||n==="shrub"){const c=n==="shrub"?5:3;for(let l=0;l<c;l++)Pi(a,[r/2+ye(i,-9,9)*t,s-8*t+ye(i,-4,2)*t],ye(i,7,10)*t,ye(i,5,8)*t,e,i);if(n==="shrub"||i()<e.flowers)for(let l=0;l<18*e.flowers+3;l++){const u=r/2+ye(i,-12,12)*t,d=s-ye(i,5,17)*t;a.get(u,d)&&a.recolour(u,d,v.FLOWER)}}else if(n==="fern")for(let c=0;c<7;c++){const l=-Math.PI/2+(c/6-.5)*2.4;let u=r/2,d=s-1;for(let h=0;h<15*t;h++)u+=Math.cos(l)*.9,d+=Math.sin(l)*.9+h*.06,a.put(u,d,c%2?v.LEAF3:v.LEAF,Math.cos(l)*.4,-.2,.9),h%2&&(a.put(u,d-1,v.LEAF2,0,-.5,.85),a.put(u+Math.sign(Math.cos(l)),d+1,v.LEAF,0,.3,.9))}else for(let c=0;c<18*t;c++){const l=r/2+ye(i,-13,13)*t,u=ye(i,5,15)*t,d=ye(i,-3,3);for(let h=0;h<u;h++)a.put(l+d*h/u*(h/u),s-1-h,h>u*.65?v.LEAF2:h<u*.3?v.LEAF3:v.LEAF,d*.1,-.3,.9)}const o=il(i,e,null);return o[v.FLOWER]=we(i(),.55,.95),{sp:a,colours:o}}const at=(i,e={})=>["tree",{type:i,...e}],Fe=(i,e={})=>[i,e],rl=[{id:"moor",name:"Moor",creature:"badger",by:"Ed",leaf:.24,floor:["moss",.26,.45,.42],text:{floor:"moss",wall:"puddles, a lake",small:"long grass",big:"moss mounds"},wall:[Fe("water",{w:1.6})],small:[Fe("grass",{h:1.4})],big:[Fe("mound",{moss:!0})]},{id:"fern-forest",name:"Fern forest",creature:"boar",by:"Ed",leaf:.3,floor:["needles",.08,.45,.32],text:{floor:"pine needles",small:"ferns",big:"pine trees"},small:[Fe("fern")],big:[at("fir")]},{id:"muddy-forest",name:"Muddy forest",creature:"snail",by:"Ed",leaf:.22,floor:["mud",.07,.5,.28],text:{floor:"mud and leaves",small:"short trunks with broken branches",big:"trees with many trunks and branches"},small:[Fe("stump",{snag:!0})],big:[at("broad",{trunks:3,gnarl:.9})]},{id:"stone-shrine",name:"Stone shrine",creature:"fox",by:"Ed",leaf:.28,floor:["stony",.25,.3,.45],text:{floor:"grassy, stony",wall:"mossy henges",small:"little stones",big:"big stones",set:"a shrine"},wall:[Fe("henge")],small:[Fe("stones")],big:[Fe("boulder")],set:Fe("shrine")},{id:"tangly-forest",name:"Tangly forest",creature:"ram",by:"Ed",leaf:.27,floor:["nettles",.28,.5,.3],text:{floor:"nettles and earth",small:"tangled branches",big:"fairly short tangly trees"},small:[Fe("bramble",{bare:!0})],big:[at("broad",{scale:.7,gnarl:1})]},{id:"wispy-forest",name:"Wispy forest",creature:"woodlouse",by:"Ed",leaf:.2,floor:["leaves",.09,.55,.45],text:{floor:"dry leaves",small:"tall thin wispy trees",big:"thick trees with several trunks"},small:[at("birch",{scale:.75})],big:[at("broad",{trunks:3,thick:1.4})]},{id:"hazel-forest",name:"Hazel forest",creature:"hedgehog",by:"Ed",leaf:.26,floor:["grass",.24,.45,.45],text:{floor:"short grass",small:"brown lumps",big:"crooked trees with many branches"},small:[Fe("mound",{brown:!0})],big:[at("broad",{gnarl:1,scale:.85})]},{id:"garden",name:"Garden",creature:"squirrel",by:"Ed",leaf:.3,floor:["lawn",.27,.5,.5],text:{floor:"uniform grass",wall:"ornate stone wall",small:"manicured flower beds",big:"willows",set:"a stone pavilion"},wall:[Fe("wall")],small:[Fe("flowerbed")],big:[at("willow")],set:Fe("pavilion")},{id:"twiggy-forest",name:"Twiggy forest",creature:"wolf",by:"Ed",leaf:.29,floor:["plants",.3,.5,.38],text:{floor:"small leafy plants",small:"small trees with many thin trunks",big:"straight but slanted trees with many trunks"},small:[at("broad",{trunks:4,scale:.5,thin:!0})],big:[at("broad",{trunks:3,lean:.3,gnarl:.1})]},{id:"ancient",name:"Ancient",creature:"stag",by:"Ed",leaf:.31,floor:["roots",.1,.25,.35],text:{floor:"mossy roots over rocks",small:"sorrel",big:"giant gnarly slanted trees"},small:[Fe("flowers",{hue:.98,leafy:!0})],big:[at("broad",{scale:1.4,gnarl:1,lean:.35})]},{id:"norway",name:"Norway",creature:"stoat",by:"Ed",leaf:.36,floor:["slate",.6,.15,.35],text:{floor:"pine needles and slate",small:"rocks",big:"straight pines"},small:[Fe("stones",{big:!0})],big:[at("fir",{scale:1.2})]},{id:"alder-forest",name:"Alder forest",creature:"snake",by:"Ed",leaf:.23,floor:["tallgrass",.22,.45,.42],text:{floor:"tall and short grass",small:"tree stumps with tall grass around",big:"tall slanted trees with thin leaves at different heights"},small:[Fe("stump",{grass:!0})],big:[at("birch",{lean:.3,scale:1.2,dark:!0})]},{id:"meadow",name:"Meadow",creature:"hare",by:"draft",leaf:.25,floor:["flowers",.25,.5,.5],text:{floor:"grass and wildflowers",small:"scattered hawthorn",big:"lone oaks"},small:[Fe("shrub",{flower:[250,245,235]})],big:[at("broad",{scale:1.1})]},{id:"old-oaks",name:"Old oaks",creature:"owl",by:"draft",leaf:.22,floor:["leaves",.07,.5,.35],text:{floor:"leaf litter",small:"acorns, fallen branches",big:"ancient gnarled oaks with hollow trunks",set:"a great hollow oak"},small:[Fe("cones",{acorn:!0}),Fe("log",{branch:!0})],big:[at("broad",{gnarl:.9,hollow:!0})],set:at("broad",{scale:1.6,gnarl:1,hollow:!0})},{id:"berry-thicket",name:"Berry thicket",creature:"bear",by:"draft",leaf:.32,floor:["needles",.08,.45,.3],text:{floor:"pine needles",wall:"bramble thickets",small:"berry bushes",big:"tall pines"},wall:[Fe("bramble")],small:[Fe("shrub",{flower:[200,30,60]})],big:[at("fir",{scale:1.3})]},{id:"wetland",name:"Wetland",creature:"toad",by:"draft",leaf:.2,floor:["mud",.15,.45,.3],text:{floor:"wet mud",wall:"puddles, reeds",small:"reeds and rushes",big:"willows"},wall:[Fe("water"),Fe("reeds",{tall:!0})],small:[Fe("reeds")],big:[at("willow")]},{id:"stream",name:"Stream",creature:"otter",by:"draft",leaf:.27,floor:["pebbles",.25,.3,.45],text:{floor:"pebbles and grass",wall:"a stream or pond",small:"alder saplings",big:"alders",set:"a fallen-log bridge"},wall:[Fe("water",{w:2})],small:[at("broad",{scale:.45})],big:[at("broad",{scale:.95,gnarl:.3})],set:Fe("bridge")},{id:"rocky-slope",name:"Rocky slope",creature:"lynx",by:"draft",leaf:.34,floor:["scree",.2,.2,.42],text:{floor:"scree and moss",wall:"boulders",small:"rocks",big:"pines",set:"a rocky outcrop"},wall:[Fe("boulder",{big:!0})],small:[Fe("stones",{big:!0})],big:[at("fir")],set:Fe("outcrop")},{id:"bog",name:"Bog",creature:"elk",by:"draft",leaf:.38,floor:["moss",.18,.55,.4],text:{floor:"sphagnum moss",wall:"bog pools",small:"cotton grass",big:"spruce"},wall:[Fe("water",{bog:!0})],small:[Fe("reeds",{cotton:!0})],big:[at("fir",{dark:!0})]},{id:"deadwood",name:"Deadwood",creature:"raven",by:"draft",leaf:.15,floor:["earth",.07,.35,.3],text:{floor:"bare earth",small:"broken branches",big:"blasted dead trees"},small:[Fe("log",{branch:!0})],big:[at("broad",{bare:!0,gnarl:1})]},{id:"cave-mouth",name:"Cave mouth",creature:"bat",by:"draft",leaf:.2,floor:["stone",.08,.15,.35],text:{floor:"stone and roots",wall:"rock walls",small:"stalagmite stubs",big:"dead trees",set:"a cave mouth"},wall:[Fe("rockwall")],small:[Fe("stalagmite")],big:[at("broad",{bare:!0})],set:Fe("cave")},{id:"grassland",name:"Grassland",creature:"mole",by:"draft",leaf:.25,floor:["grass",.26,.5,.48],text:{floor:"short turf",small:"molehills",big:"lone birches"},small:[Fe("mound",{brown:!0,small:!0})],big:[at("birch")]},{id:"beaver-pond",name:"Beaver pond",creature:"beaver",by:"draft",leaf:.17,floor:["leaves",.13,.6,.5],text:{floor:"birch leaves",wall:"a pond",small:"stumps",big:"birch and aspen",set:"a beaver dam"},wall:[Fe("water",{w:2})],small:[Fe("stump",{gnawed:!0})],big:[at("birch")],set:Fe("dam")},{id:"log-pile",name:"Log pile",creature:"beetle",by:"draft",leaf:.22,floor:["leaves",.06,.5,.3],text:{floor:"rotting leaves",small:"fungi",big:"rotting logs",set:"a fallen giant"},small:[Fe("fungi")],big:[Fe("log",{rot:!0})],set:Fe("log",{rot:!0,giant:!0})},{id:"heath",name:"Heath",creature:"moth",by:"draft",leaf:.27,floor:["heather",.85,.35,.4],text:{floor:"heather",small:"gorse",big:"wind-bent birches"},small:[Fe("shrub",{flower:[250,205,40],spiky:!0})],big:[at("birch",{lean:.45,scale:.75})]},{id:"old-pinewood",name:"Old pinewood",creature:"marten",by:"draft",leaf:.35,floor:["needles",.07,.4,.3],text:{floor:"pine needles",small:"pine cones",big:"tall old pines with knotholes"},small:[Fe("cones")],big:[at("fir",{scale:1.35})]},{id:"ravine",name:"Ravine",creature:"salamander",by:"draft",leaf:.3,floor:["stone",.3,.3,.32],text:{floor:"wet moss and rock",wall:"rock walls",small:"ferns",big:"mossy boulders",set:"a waterfall"},wall:[Fe("rockwall",{moss:!0})],small:[Fe("fern")],big:[Fe("boulder",{moss:!0,big:!0})],set:Fe("waterfall")},{id:"bluebell-glade",name:"Bluebell glade",creature:"glowworm",by:"draft",leaf:.26,floor:["bluebells",.27,.45,.4],text:{floor:"bluebells",small:"ferns",big:"beeches"},small:[Fe("fern")],big:[at("broad",{gnarl:.2,scale:1.1})]},{id:"holly-thicket",name:"Holly thicket",creature:"spider",by:"draft",leaf:.36,floor:["leaves",.08,.35,.28],text:{floor:"dead leaves",wall:"holly hedges",small:"cobwebs",big:"hollies",set:"a web-hung dead tree"},wall:[Fe("hedge",{berries:!0})],small:[Fe("web")],big:[at("broad",{scale:.7,dark:!0})],set:at("broad",{bare:!0,webs:!0})},{id:"honeysuckle-tangle",name:"Honeysuckle tangle",creature:"dormouse",by:"draft",leaf:.25,floor:["clover",.27,.45,.45],text:{floor:"grass and clover",wall:"bramble",small:"honeysuckle",big:"hazel coppice"},wall:[Fe("bramble")],small:[Fe("shrub",{flower:[250,230,170]})],big:[at("broad",{trunks:5,scale:.7,thin:!0})]}],bd=Object.fromEntries(rl.map(i=>[i.id,i]));function wd(i,e,t=64,n=48){const[r,s,a,o]=i.floor,c=new sn(t,n),l=i.id.length*131;for(let x=0;x<n;x++)for(let m=0;m<t;m++){const p=(hi(m/7,x/5,l)*(t-m)*(n-x)+hi((m-t)/7,x/5,l)*m*(n-x)+hi(m/7,(x-n)/5,l)*(t-m)*x+hi((m-t)/7,(x-n)/5,l)*m*x)/(t*n),_=p<.38?v.BODY2:p>.64?v.BELLY:v.BODY;c.px(m,x,_,0,-.42,.91)}const u=Qs(l),d=(x,m,p)=>c.px((x%t+t)%t,(m%n+n)%n,p,0,-.42,.91),h={moss:0,needles:70,mud:25,stony:30,nettles:60,leaves:80,grass:70,lawn:30,plants:60,roots:30,slate:40,tallgrass:90,flowers:70,pebbles:60,scree:70,earth:15,stone:40,heather:90,bluebells:90,clover:60}[r]??40;for(let x=0;x<h;x++){const m=Math.floor(u()*t),p=Math.floor(u()*n);if(r==="needles"){const _=u()<.5?1:-1;for(let S=0;S<3;S++)d(m+S*_,p+(S>>1),u()<.5?v.BODY2:v.ACCENT)}else if(["grass","lawn","tallgrass","plants","nettles","clover","flowers","bluebells","heather"].includes(r)){const _=r==="tallgrass"?4:r==="lawn"?1:2;for(let S=0;S<_;S++)d(m,p-S,S===_-1?v.LEAF2:v.LEAF);(r==="flowers"||r==="bluebells"||r==="heather"||r==="clover")&&u()<.5&&d(m+1,p-_,v.FLOWER)}else if(["stony","pebbles","scree","slate","stone","roots"].includes(r)){if(d(m,p,v.ACCENT),u()<.6&&d(m+1,p,v.ACCENT),u()<.4&&d(m,p+1,v.BODY2),r==="roots"&&u()<.5)for(let _=0;_<5;_++)d(m+_,p+(_>2?1:0),v.TRUNK)}else if(r==="leaves")d(m,p,v.FLOWER),d(m+1,p,v.FLOWER),u()<.5&&d(m,p+1,v.ACCENT);else if(r==="mud"||r==="earth")for(let _=0;_<3;_++)d(m+_,p,v.BODY2)}const f={flowers:we(.13,.6,.95),bluebells:[90,110,230],heather:[180,90,170],clover:[240,235,240],leaves:we(s+.02,.65,.6)}[r]||we(s,.3,.6),g={[v.BODY]:we(s,a*e.sat,o),[v.BODY2]:we(s+.02,a*e.sat*1.1,o*.78),[v.BELLY]:we(s-.02,a*e.sat*.9,Math.min(1,o*1.15)),[v.ACCENT]:r==="needles"?we(.07,.5,.5):we(.1,.08,.62),[v.FLOWER]:f,[v.LEAF]:we(i.leaf,.55*e.sat,.45),[v.LEAF2]:we(i.leaf-.03,.5*e.sat,.62),[v.TRUNK]:we(e.trunkHue,.4,.3)};return{sp:c,colours:g}}const wi=i=>({[v.ACCENT]:we(.1,.06,.6),[v.BODY2]:we(.62,.08,.4),[v.BELLY]:we(.1,.05,.78),[v.LEAF]:we(.27,.5,.45),[v.LEAF2]:we(.25,.45,.62),[v.NOSE]:[20,16,24]});function ar(i,e,t,n,r,s,a){const o=[];for(let c=0;c<8;c++){const l=c/8*Math.PI*2,u=1+(s()-.5)*.3;o.push([e[0]+Math.cos(l)*t*u,e[1]+Math.sin(l)*n*u*(Math.sin(l)>0?.5:1)])}i.shape(o,v.ACCENT,{group:5,line:!0,round:r.round}),i.mark([bt(e,[-t,n*.1]),bt(e,[t,n*.1]),bt(e,[t,n]),bt(e,[-t,n])],v.BODY2,[v.ACCENT]),i.mark([bt(e,[-t*.6,-n*.8]),bt(e,[t*.1,-n*1.1]),bt(e,[t*.3,-n*.5]),bt(e,[-t*.3,-n*.3])],v.BELLY,[v.ACCENT]),a&&i.mark(js([bt(e,[-t*1.1,-n*.55]),bt(e,[0,-n*1.3]),bt(e,[t*1.1,-n*.5]),bt(e,[t*.6,-n*.2]),bt(e,[-t*.6,-n*.2])],0,3,3,n*.15,1),v.LEAF,[v.ACCENT,v.BELLY,v.BODY2])}function Rs(i,e,t,n,r,s){const a={[v.LEAF]:we(t.leaf,.6*n.sat,.55),[v.LEAF2]:we(t.leaf-.05,.55*n.sat,.78),[v.LEAF3]:we(t.leaf+.03,.66*n.sat,.36)},o={[v.TRUNK]:we(n.trunkHue,.45*n.sat,.34),[v.BARKD]:we(n.trunkHue+.03,.5*n.sat,.17),[v.BARKL]:we(n.trunkHue-.01,.38*n.sat,.5),[v.BELLY]:we(n.trunkHue+.02,.3,.7)},c={[v.MAGIC]:[60,110,150],[v.MAGIC2]:[150,200,220],[v.BODY2]:[35,70,100]};if(i==="tree"){const x={broad:fh,fir:nl,willow:ph,birch:mh,flat:gh}[e.type],m={...n,leafHue:t.leaf+(e.dark?.05:0),gnarl:e.gnarl??n.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},p=x(r,m,n.treeSize*s*(e.scale||1)*ye(r,.9,1.1)),_=il(r,m,x);return e.dark&&(_[v.LEAF]=_[v.LEAF3],_[v.LEAF3]=we(t.leaf+.05,.7,.22)),_[v.NOSE]=[20,16,24],_[v.WEB]=[225,225,232],{sp:p.sp,colours:_}}if(i==="shrub"){const x=yd(r,{...n,leafHue:t.leaf,bushSize:n.bushSize*s,flowers:1});for(let m=0;m<x.sp.m.length;m++)x.sp.m[m]&&Tt(m,1,3)<(e.spiky?.18:.1)&&x.sp.m[m]!==v.TRUNK&&(x.sp.m[m]=v.FLOWER);return x.colours[v.FLOWER]=e.flower,x}const l=Math.round(48*s*(e.w||1)),u=Math.round(32*s),d=new sn(l,u),h=l/2,f=u;let g={};if(i==="grass"||i==="reeds"||i==="fern"||i==="flowers"||i==="flowerbed"){const x=i==="flowerbed"?40:24,m=(i==="reeds"?e.tall?26:20:i==="fern"?14:10*(e.h||1))*s;i==="flowerbed"&&d.shape([[h-20*s,f-2],[h-18*s,f-6*s],[h+18*s,f-6*s],[h+20*s,f-2],[h+20*s,f],[h-20*s,f]],v.ACCENT,{group:2,line:!0});for(let p=0;p<x;p++){const _=h+ye(r,-16,16)*s,S=m*ye(r,.5,1),y=i==="fern"?ye(r,-6,6)*s:ye(r,-2,2)*s,w=f-1-(i==="flowerbed"?5*s:0);for(let E=0;E<S;E++){const R=E/S;d.px(_+y*R*R,w-E,R>.7?v.LEAF2:R<.3?v.LEAF3:v.LEAF,y*.05,-.3,.9),i==="fern"&&E%2&&d.px(_+y*R*R+(y>0?1:-1),w-E+1,v.LEAF2,0,-.3,.9)}if(i==="reeds"&&(e.cotton||r()<.5))for(let E=0;E<(e.cotton?2:3);E++)d.px(_+y,w-S-E,e.cotton?v.WEB:v.TRUNK,0,-.5,.85);(i==="flowers"||i==="flowerbed")&&r()<.7&&(d.px(_+y,w-S,v.FLOWER,0,-.5,.85),d.px(_+y+1,w-S,v.FLOWER,0,-.5,.85))}if(g={...a,[v.FLOWER]:i==="flowerbed"?rh(r,[[230,80,120],[250,210,60],[150,110,230]]):we(e.hue??.95,.6,.85),[v.TRUNK]:we(.07,.5,.35),[v.WEB]:[240,240,235],[v.ACCENT]:we(.08,.1,.55)},i==="flowerbed"){for(let p=0;p<d.m.length;p++)d.m[p]===v.FLOWER&&Tt(p,2,7)<.5&&(d.m[p]=v.BELLY);g[v.BELLY]=[250,245,240]}}else if(i==="stones"){for(let x=0;x<(e.big?3:6);x++)ar(d,[h+ye(r,-14,14)*s,f-(e.big?5:2.5)*s],(e.big?6:3)*s*ye(r,.7,1.2),(e.big?5:2.5)*s,n,r);g=wi()}else if(i==="boulder")ar(d,[h,f-(e.big?11:8)*s],(e.big?18:13)*s,(e.big?12:9)*s,n,r,e.moss),g={...wi(),...a,[v.ACCENT]:we(.1,.06,.6)};else if(i==="henge")d.shape([[h-7*s,f],[h-8*s,f-18*s],[h-4*s,f-28*s],[h+5*s,f-27*s],[h+8*s,f-14*s],[h+7*s,f]],v.ACCENT,{group:5,line:!0,round:n.round}),d.mark([[h-9*s,f-30*s],[h+9*s,f-30*s],[h+9*s,f-22*s],[h-9*s,f-18*s]],v.LEAF,[v.ACCENT]),g={...wi(),...a};else if(i==="mound"){const x=(e.small?8:14)*s,m=(e.small?5:8)*s;d.shape(js([[h-x,f],[h-x*.6,f-m*.8],[h,f-m],[h+x*.6,f-m*.8],[h+x,f]],0,4,e.moss?3:1,(e.moss?1.5:.8)*s,1),e.moss?v.LEAF:v.TRUNK,{group:5,round:n.round}),d.mark([[h-x,f-m*.45],[h+x,f-m*.45],[h+x,f],[h-x,f]],e.moss?v.LEAF3:v.BARKD,[e.moss?v.LEAF:v.TRUNK]),g={...a,...o,[v.TRUNK]:we(.07,.45,e.brown?.35:.3)}}else if(i==="stump"){const x=6*s;if(d.limb([[h,f,x*2.2],[h,f-8*s,x*1.6]],v.TRUNK,{group:5,round:n.round,cap:0,capEnd:0}),d.shape([[h-x*.8,f-8*s],[h,f-10*s-(e.gnawed?4*s:0)],[h+x*.8,f-8*s],[h,f-7*s]],v.BELLY,{group:6,round:n.round}),e.snag&&d.limb([[h+x*.4,f-8*s,2.5*s],[h+x*1.6,f-15*s,1.5*s]],v.TRUNK,{group:7,round:n.round}),e.grass)for(let m=0;m<20;m++){const p=h+ye(r,-14,14)*s,_=ye(r,6,13)*s;for(let S=0;S<_;S++)d.px(p,f-1-S,S>_*.6?v.LEAF2:v.LEAF,0,-.3,.9)}g={...a,...o}}else if(i==="log"){const x=(e.giant?46:e.branch?18:30)*s,m=(e.giant?14:e.branch?3:8)*s;if(d.limb([[h-x/2,f-m/2,m],[h+x/2,f-m/2-(e.branch?2*s:0),m*.9]],v.TRUNK,{group:5,round:n.round,cap:.3,capEnd:.3}),e.branch||d.shape([[h+x/2-m*.1,f-m],[h+x/2+m*.2,f-m/2],[h+x/2-m*.1,f],[h+x/2-m*.3,f-m/2]],v.BELLY,{group:6,round:n.round}),e.rot)for(let p=0;p<(e.giant?6:3);p++){const _=h+ye(r,-x/2,x/3);d.shape([[_-3*s,f-m*.9],[_,f-m-3*s],[_+3*s,f-m*.9]],v.FLOWER,{group:7,line:!0,round:n.round})}e.branch&&d.limb([[h,f-m,m*.7],[h+5*s,f-m-6*s,m*.4]],v.TRUNK,{group:6,round:n.round}),g={...o,[v.FLOWER]:[230,190,120]}}else if(i==="fungi"){for(let x=0;x<5;x++){const m=h+ye(r,-12,12)*s,p=ye(r,3,7)*s,_=ye(r,3,5)*s;d.limb([[m,f,1.6*s],[m,f-p,1.4*s]],v.BELLY,{group:5}),d.shape([[m-_,f-p],[m,f-p-_*.8],[m+_,f-p]],x%2?v.FLOWER:v.MAGIC,{group:6+x%2,line:!0,round:n.round})}g={[v.BELLY]:[225,215,195],[v.FLOWER]:[190,80,50],[v.MAGIC]:[120,230,200]}}else if(i==="cones"){for(let x=0;x<6;x++){const m=h+ye(r,-14,14)*s,p=f-2*s;d.ellipse(m,p,(e.acorn?1.6:2)*s,(e.acorn?2:2.8)*s,v.TRUNK,{round:n.round}),e.acorn?d.ellipse(m,p-1.6*s,1.8*s,1*s,v.BARKD,{round:n.round}):d.px(m,p-1,v.BARKL)}g=o}else if(i==="water"){const x=22*s*(e.w||1),m=6*s;d.shape([[h-x,f-m],[h-x*.3,f-m*1.5],[h+x*.6,f-m*1.2],[h+x,f-m*.5],[h+x*.4,f],[h-x*.7,f-m*.2]],v.MAGIC,{group:5,round:.2});for(let p=0;p<6;p++){const _=h+ye(r,-x*.6,x*.6),S=f-m*ye(r,.4,1.1);for(let y=0;y<3*s;y++)d.recolour(_+y,S,v.MAGIC2)}g=e.bog?{[v.MAGIC]:[60,70,50],[v.MAGIC2]:[120,130,90]}:c;for(let p=0;p<d.m.length;p++)d.m[p]===v.MAGIC?d.m[p]=v.BODY:d.m[p]===v.MAGIC2&&(d.m[p]=v.BELLY);g={[v.BODY]:g[v.MAGIC],[v.BELLY]:g[v.MAGIC2]}}else if(i==="bramble"||i==="hedge"){const x=22*s,m=(i==="hedge"?18:12)*s;for(let p=0;p<(i==="hedge"?6:4);p++){const _=h+ye(r,-x*.8,x*.8),S=f-m*ye(r,.4,.7);d.ellipse(_,S,ye(r,6,9)*s,m*.45,i==="hedge"?v.LEAF3:v.LEAF,{round:n.round,density:e.bare?.5:.95,noise:.5,seed:p})}for(let p=0;p<8;p++){let S=h+ye(r,-x,x),y=f;for(let w=0;w<m*1.2;w++)S+=Math.sin(w*.3+p)*.8,y-=.8,d.px(S,y,v.TRUNK,0,-.3,.9)}if(i==="hedge"||e.berries||i==="bramble")for(let p=0;p<d.m.length;p++)d.m[p]&&d.m[p]!==v.TRUNK&&Tt(p,5,9)<.05&&(d.m[p]=v.FLOWER);g={...a,...o,[v.FLOWER]:i==="hedge"?[210,30,40]:[70,30,70]}}else if(i==="wall"){const x=22*s,m=12*s;d.shape([[h-x,f],[h-x,f-m],[h+x,f-m],[h+x,f]],v.ACCENT,{group:5,line:!0,depth:2}),d.shape([[h-x-1,f-m],[h-x-1,f-m-2*s],[h+x+1,f-m-2*s],[h+x+1,f-m]],v.BELLY,{group:6,line:!0,depth:2}),d.shape([[h+x-6*s,f-m-2*s],[h+x-6*s,f-m-7*s],[h+x,f-m-7*s],[h+x,f-m-2*s]],v.ACCENT,{group:7,line:!0,depth:2}),d.ellipse(h+x-3*s,f-m-9*s,3*s,2.5*s,v.BELLY,{round:n.round});for(let p=f-m+3*s;p<f;p+=4*s)for(let _=h-x;_<h+x;_++)d.recolour(_,p,v.BODY2);g=wi()}else if(i==="rockwall"){for(let x=0;x<5;x++)ar(d,[h+(x-2)*9*s,f-ye(r,8,14)*s],8*s,10*s,n,r,e.moss);g={...wi(),...a}}else if(i==="stalagmite"){for(let x=0;x<4;x++){const m=h+ye(r,-14,14)*s,p=ye(r,5,11)*s;d.shape([[m-3*s,f],[m-1*s,f-p],[m+1*s,f-p],[m+3*s,f]],v.ACCENT,{group:5,line:!0,round:n.round})}g=wi()}else if(i==="web"){const x=[h,f-14*s],m=11*s;for(let p=0;p<8;p++){const _=p/8*Math.PI*2;for(let S=0;S<m;S++)d.px(x[0]+Math.cos(_)*S,x[1]+Math.sin(_)*S,v.WEB,0,0,1)}for(let p=3*s;p<m;p+=3*s)for(let _=0;_<Math.PI*2;_+=.05)d.px(x[0]+Math.cos(_)*p,x[1]+Math.sin(_)*p,v.WEB,0,0,1);g={[v.WEB]:[225,230,240]}}return{sp:d,colours:g}}function Ed(i,e,t,n,r,s){if(i==="tree"||i==="log")return Rs(i,e,t,n,r,s);const a=Math.round(90*s),o=Math.round(70*s),c=new sn(a,o),l=a/2,u=o;let d={...wi(),[v.LEAF]:we(t.leaf,.55,.5),[v.LEAF2]:we(t.leaf-.04,.5,.7),[v.TRUNK]:we(n.trunkHue,.45,.34),[v.BARKD]:we(n.trunkHue+.03,.5,.17),[v.MAGIC]:we(n.magicHue,.6,1),[v.MAGIC2]:we(n.magicHue,.2,1)};if(i==="shrine")c.shape([[l-16*s,u],[l-14*s,u-6*s],[l+14*s,u-6*s],[l+16*s,u]],v.ACCENT,{group:5,line:!0,depth:2}),c.shape([[l-9*s,u-6*s],[l-9*s,u-26*s],[l+9*s,u-26*s],[l+9*s,u-6*s]],v.ACCENT,{group:6,line:!0,depth:2}),c.shape([[l-5*s,u-10*s],[l-5*s,u-20*s],[l,u-23*s],[l+5*s,u-20*s],[l+5*s,u-10*s]],v.NOSE,{group:7}),c.shape([[l-13*s,u-26*s],[l,u-34*s],[l+13*s,u-26*s]],v.BODY2,{group:8,line:!0,depth:2}),c.ellipse(l,u-13*s,2.5*s,2.5*s,v.MAGIC2,{round:.5}),c.mark([[l-14*s,u-36*s],[l+2*s,u-36*s],[l-4*s,u-24*s],[l-14*s,u-24*s]],v.LEAF,[v.BODY2,v.ACCENT]);else if(i==="pavilion"){c.shape([[l-26*s,u],[l-26*s,u-4*s],[l+26*s,u-4*s],[l+26*s,u]],v.ACCENT,{group:5,line:!0,depth:2});for(const h of[-20,-7,7,20])c.limb([[l+h*s,u-4*s,4*s],[l+h*s,u-34*s,4*s]],h===-7||h===7?v.BODY2:v.BELLY,{group:6+(h>0?1:0),line:!0,cap:0,capEnd:0});c.shape([[l-28*s,u-34*s],[l-28*s,u-38*s],[l+28*s,u-38*s],[l+28*s,u-34*s]],v.ACCENT,{group:8,line:!0,depth:2}),c.shape([[l-24*s,u-38*s],[l-16*s,u-54*s],[l,u-60*s],[l+16*s,u-54*s],[l+24*s,u-38*s]],v.BELLY,{group:9,line:!0})}else if(i==="bridge"){const h=Rs("water",{w:1.8},t,n,r,s);for(let f=0;f<h.sp.m.length;f++){const g=f%h.sp.w,x=f/h.sp.w|0,m=Math.round(l-h.sp.w/2+g),p=u-h.sp.h+x;h.sp.m[f]&&c.inb(m,p)&&c.px(m,p,h.sp.m[f]===v.BODY?v.IRIS:v.PUPIL,0,-.42,.91)}c.limb([[l-34*s,u-6*s,9*s],[l+34*s,u-10*s,8*s]],v.TRUNK,{group:6,line:!0,cap:.3,capEnd:.3}),d[v.IRIS]=[60,110,150],d[v.PUPIL]=[150,200,220]}else if(i==="outcrop")for(const[h,f,g,x]of[[-18,14,16,13],[12,12,18,12],[-2,28,15,13],[16,34,9,9]])ar(c,[l+h*s,u-f*s],g*s,x*s,n,r,!0);else if(i==="cave"){for(const[h,f,g,x]of[[-26,16,16,15],[26,16,16,15],[0,40,30,18],[-12,30,14,12],[12,30,14,12]])ar(c,[l+h*s,u-f*s],g*s,x*s,n,r,f>30);c.shape([[l-15*s,u],[l-14*s,u-18*s],[l-4*s,u-28*s],[l+6*s,u-27*s],[l+14*s,u-16*s],[l+15*s,u]],v.NOSE,{group:9,line:!0})}else if(i==="dam"){const h=Rs("water",{w:1.9},t,n,r,s);for(let f=0;f<h.sp.m.length;f++){const g=f%h.sp.w,x=f/h.sp.w|0,m=Math.round(l-h.sp.w/2+g),p=u-h.sp.h+x-10*s;h.sp.m[f]&&c.inb(m,p)&&c.px(m,p,h.sp.m[f]===v.BODY?v.IRIS:v.PUPIL,0,-.42,.91)}for(let f=0;f<26;f++){const g=l+ye(r,-32,32)*s,x=u-ye(r,2,14)*s,m=ye(r,-.5,.5),p=ye(r,8,16)*s;c.limb([[g-Math.cos(m)*p/2,x-Math.sin(m)*p/2,2.6*s],[g+Math.cos(m)*p/2,x+Math.sin(m)*p/2,2*s]],f%3?v.TRUNK:v.BARKD,{group:6+f%2,line:!0})}d[v.IRIS]=[60,110,150],d[v.PUPIL]=[150,200,220]}else if(i==="waterfall"){for(const[h,f,g,x]of[[-22,30,18,30],[22,30,18,30],[0,56,20,12]])ar(c,[l+h*s,u-f*s],g*s,x*s,n,r,!0);for(let h=l-6*s;h<l+6*s;h++)for(let f=u-50*s;f<u-4*s;f++)c.px(h,f,Tt(h|0,f/3|0,4)<.3?v.PUPIL:v.IRIS,0,-.2,.98);c.shape([[l-18*s,u],[l-14*s,u-6*s],[l+14*s,u-6*s],[l+18*s,u]],v.IRIS,{group:10,round:.2}),d[v.IRIS]=[90,150,190],d[v.PUPIL]=[210,235,245]}return{sp:c,colours:d}}function Td(i,e,{K:t=2/(e.pixel||2),makeCanvas:n=$o}={}){const r=bd[i];if(!r)throw new Error(`no area type "${i}"`);const s=Qs(i.split("").reduce((u,d)=>u*31+d.charCodeAt(0),7)>>>0),a=(u,d,h)=>({sp:ui(u.sp,u.colours,e,"none",n),kind:d,text:h}),o=wd(r,e),c=u=>(u||[]).map(([d,h])=>a(Rs(d,h,r,e,s,t),d,"")),l={def:r,floor:{sp:ui(o.sp,o.colours,e,"none",n),kind:r.floor[0],text:r.text.floor},walls:c(r.wall),small:c(r.small),big:c(r.big),setPiece:null};return l.walls.forEach(u=>u.text=r.text.wall),l.small.forEach(u=>u.text=r.text.small),l.big.forEach(u=>u.text=r.text.big),r.set&&(l.setPiece=a(Ed(r.set[0],r.set[1],r,e,s,t),r.set[0],r.text.set)),l}const Ad={[v.ACCENT]:[150,145,140],[v.BODY2]:[95,92,100],[v.TRUNK]:[110,70,40],[v.BARKD]:[60,38,24],[v.MAGIC]:[255,130,40],[v.MAGIC2]:[255,228,120],[v.NOSE]:[30,24,26]};function Cd(i){const e=new et({blend:.02});for(let r=0;r<9;r++){const s=r/9*Math.PI*2;e.ell([Math.cos(s)*.32,.05,Math.sin(s)*.32],[.09,.06,.08],r%3?v.ACCENT:v.BODY2,{dir:[-Math.sin(s),0,Math.cos(s)],group:1+r})}e.seg([-.22,.06,-.12],[.22,.1,.12],.05,.045,v.TRUNK,{group:20,paint:r=>r[0]>.12?v.BARKD:void 0}),e.seg([-.2,.1,.14],[.2,.06,-.14],.05,.045,v.TRUNK,{group:21,paint:r=>r[0]<-.12?v.BARKD:void 0});const t=[[.42,.3,.34],[.36,.4,.28],[.46,.32,.38]][i%3];[[-.05,0,t[0]],[.08,.06,t[1]],[-.02,-.08,t[2]]].forEach(([r,s,a],o)=>e.flat([r,.1+a*.5,s],[1,0,.3],[((i+o)%3-1)*.1,1,0],a*.38,a*.5,Li.flame(v.MAGIC,v.MAGIC2),{group:30+o,bend:.1}));const n=On(e,{height:34}).sp;for(let r=0;r<4;r++){const s=Math.floor(n.w/2+Math.sin(r*2.3+i)*n.w*.25),a=Math.floor(n.h*(.12+r*.08));n.get(s,a)||n.px(s,a,v.MAGIC2)}return n}const Ls={cyan:[[70,230,255],[200,250,255]],violet:[[190,100,255],[235,210,255]],green:[[90,255,140],[215,255,220]]};function Rd(i,e){const t=new et({blend:.04}),n=Object.keys(Ls).indexOf(i),r=.08,s=.4,a=[Math.cos(s),0,-Math.sin(s)],o=k.norm([Math.sin(s),.22,Math.cos(s)]),c=k.norm(k.cross(o,a)),l=[0,.46,0],u=[[[.2-n*.05,.92],[.14,.8],[.19,.7],[.12,.58]],[[-.22+n*.03,.05],[-.17,.16],[-.21,.25]]],d=(m,p)=>u.some(_=>_.some((S,y)=>{const w=_[y+1];if(!w)return!1;const E=w[0]-S[0],R=w[1]-S[1],M=Math.max(0,Math.min(1,((m-S[0])*E+(p-S[1])*R)/(E*E+R*R)));return Math.hypot(m-S[0]-E*M,p-S[1]-R*M)<.014})),h=m=>{const p=k.sub(m,l),_=[k.dot(p,a),k.dot(p,c)+.46,k.dot(p,o)];if(_[2]>r-.02){const S=(_[0]+.17)/.34,y=(.8-_[1])/.5;if(S>=0&&S<=1&&y>=0&&y<=1&&sh(S,y,n+1,.1))return v.RUNE}if(d(_[0],_[1]))return v.STONED;if(_[1]>.86&&Tt(Math.floor(_[0]*30),Math.floor(_[2]*30),3)<.3||_[1]<.12&&Tt(Math.floor(_[0]*35),Math.floor(_[1]*35)+Math.floor(_[2]*35)*7,5)<.55)return v.MOSS};t.box(l,[.28,.46,r],v.STONE,{group:1,axes:[a,c,o],round:.06,paint:h}),t.box(k.add(k.add(l,k.mul(c,.53)),k.mul(a,.2)),[.3,.12,.2],v.STONE,{group:1,dir:k.add(a,k.mul(c,.35)),up:c,cut:!0,paint:h});for(const[m,p,_]of[[-.24,.14,.08],[.2,.02,.07],[0,.12,.07]])t.ell([m,.015,p],[_,_*.4,_],v.MOSS,{group:2});for(let m=0;m<9;m++){const p=-.3+m*.07,_=.12+m%3*.025-m*.02,S=.07+m*37%5/60;t.seg([p,0,_],[p+(m%3-1)*.02,S,_+.01],.012,.004,m%3?v.LEAF:v.LEAF2,{group:10+m})}const f={[v.STONE]:[132,134,142],[v.STONED]:[70,70,80],[v.MOSS]:[86,120,62],[v.LEAF]:[80,125,60],[v.LEAF2]:[130,160,80],[v.RUNE]:Ls[i][0],[v.MAGIC2]:Ls[i][1],[v.LINE]:[40,40,50]},g=On(t,{height:44}).sp;let x=0;for(let m=0;m<600&&x<5;m++){const p=Math.floor(Tt(m,n,9)*g.w),_=Math.floor(Tt(m,n,10)*g.h*.8);g.get(p,_)||g.get(p+1,_)||g.get(p-1,_)||g.get(p,_+1)||g.get(p,_-1)||(g.px(p,_,x%2?v.RUNE:v.MAGIC2),x++)}return{sp:g,colours:f}}function Ld(){const i=new et({blend:.03});i.ell([0,0,0],[.62,.025,.38],v.WATER,{group:1,paint:t=>Math.hypot(t[0]/.62,t[2]/.38)>.88?v.BODY2:void 0});for(let t=0;t<16;t++){const n=Math.PI*(.85+t/15*.9),r=Math.cos(n)*.6,s=Math.sin(n)*.36,a=.18+t*37%10/40;i.seg([r,0,s],[r+(t%3-1)*.02,a,s],.012,.006,t%4?v.LEAF:v.LEAF2,{group:10+t})}for(const[t,n,r]of[[.5,.2,.07],[.45,-.25,.05],[-.2,.35,.06]])i.ell([t,.02,n],[r,r*.5,r],v.ACCENT,{group:30});return{sp:On(i,{height:22}).sp,colours:{[v.WATER]:[40,70,95],[v.BODY2]:[70,60,45],[v.LEAF]:[80,125,60],[v.LEAF2]:[130,160,80],[v.ACCENT]:[130,128,125]}}}function Pd(i,{makeCanvas:e=$o}={}){const t=(l,u)=>ui(l,u,i,"none",e),n={campfire:[0,1,2].map(l=>t(Cd(l),Ad)),stones:{},pond:null};for(const l of Object.keys(Ls)){const u=Rd(l);n.stones[l]=t(u.sp,u.colours)}const r=Ld(),s=t(r.sp,r.colours),a=e(r.sp.w,r.sp.h),o=a.getContext("2d"),c=o.createImageData(r.sp.w,r.sp.h);for(let l=0;l<r.sp.m.length;l++)r.sp.m[l]===v.WATER&&c.data.set([255,255,255,255],l*4);return o.putImageData(c,0,0),s.mask=a,n.pond=s,n}function Dd(i,e){const t=new Map,n=new Map,r=(c,l,u)=>(c*2097152+(l+1048576))*2097152+(u+1048576),s=(c,l,u)=>{const d=r(c,l,u);let h=t.get(d);if(!h){const f=Math.pow(2,-c);h=[f*(l+Xe(l*7+c,u,i)),f*(u+Xe(l,u*13+c,i+1))],t.set(d,h)}return h},a=(c,l,u)=>{const d=Math.pow(2,-c),h=Math.floor(l/d),f=Math.floor(u/d);let g=h,x=f,m=1/0;for(let p=-2;p<=2;p++)for(let _=-2;_<=2;_++){const S=s(c,h+p,f+_),y=(S[0]-l)**2+(S[1]-u)**2;y<m&&(m=y,g=h+p,x=f+_)}return[g,x]},o=(c,l,u)=>{const d=r(c,l,u);let h=n.get(d);if(h)return h;if(c===0)h=[l,u];else{const f=s(c,l,u),g=a(c-1,f[0],f[1]);h=o(c-1,g[0],g[1])}return n.set(d,h),h};return{seed:i,depth:e,site:(c,l)=>s(0,c,l),partition(c,l){const u=a(e,c,l);return o(e,u[0],u[1])},centreness(c,l,u){const d=s(0,u[0],u[1]),h=Math.hypot(c-d[0],l-d[1]);let f=1/0;const g=Math.floor(c),x=Math.floor(l);for(let m=-2;m<=2;m++)for(let p=-2;p<=2;p++){const _=g+m,S=x+p;if(_===u[0]&&S===u[1])continue;const y=s(0,_,S);f=Math.min(f,Math.hypot(c-y[0],l-y[1]))}return Math.min(1,2*h/(h+f))},openness(c,l){let u=1/0,d=1/0;const h=Math.floor(c),f=Math.floor(l);for(let g=-2;g<=2;g++)for(let x=-2;x<=2;x++){const m=s(0,h+g,f+x),p=Math.hypot(c-m[0],l-m[1]);p<u?(d=u,u=p):p<d&&(d=p)}return Math.min(1,2*u/(u+d))}}}const Id=Au.types,fn=rl.map(i=>({id:i.id,name:i.name,creature:i.creature,text:i.text,setPiece:i.set?i.text.set??"a set piece":"",hasWalls:!!i.wall?.length,floor:[i.floor[1],i.floor[2],i.floor[3]],treeDensity:Id[i.id]?.treeDensity??1})),ir=(i,e)=>i+","+e;function Ud(i){if(i==null||i.trim()==="")return null;const e=i.trim();if(/^\d{1,9}$/.test(e))return Number(e);let t=2166136261;for(let n=0;n<e.length;n++)t=Math.imul(t^e.charCodeAt(n),16777619);return(t>>>0)%1e9}function Nd(i,e,t,n){const r=new Map,s=(c,l)=>{if(c[0]===l[0]&&c[1]===l[1])return;const u=ir(c[0],c[1]),d=ir(l[0],l[1]);r.has(u)||r.set(u,new Set),r.has(d)||r.set(d,new Set),r.get(u).add(d),r.get(d).add(u)},a=(t-e)*n;let o=[];for(let c=0;c<=a;c++){const l=[];for(let u=0;u<=a;u++){const d=i.partition(e+u/n,e+c/n);l.push(d),u>0&&s(d,l[u-1]),c>0&&s(d,o[u])}o=l}return r}function Fd(i,e){const t=e.mapAreas,n=2,r=e.areaSize*e.areaScale,s=fn.length,a=3,o=Math.max(0,Math.min(1,e.areaSizeVariance))*a*.3,c=(U,L)=>{const O=U/r,F=L/r;return[O+o*(Ts(O/a,F/a,i+91)-.5)*2,F+o*(Ts(O/a,F/a,i+92)-.5)*2]},l=(U,L)=>{let O=U*r,F=L*r;for(let Y=0;Y<30;Y++){const[j,X]=c(O,F);O+=(U-j)*r,F+=(L-X)*r}return[O,F]},u=Dd(i,e.borderLayers),d=-n,h=t+n,f=Nd(u,d,h,6),g=new Map,x=fi(i*5+1);for(let U=d;U<h;U++)for(let L=d;L<h;L++){const O=new Set;for(let j=-2;j<=2;j++)for(let X=-2;X<=2;X++){const te=g.get(ir(L+X,U+j));te!==void 0&&O.add(te)}for(const j of f.get(ir(L,U))??[]){const X=g.get(j);X!==void 0&&O.add(X)}const F=[...Array(s).keys()].filter(j=>!O.has(j)),Y=F.length?F:[...Array(s).keys()];g.set(ir(L,U),Y[Math.floor(x()*Y.length)])}const m=(U,L)=>g.get(ir(U,L))??Math.floor(Xe(U,L,i+17)*s),p=Math.floor(t/2),_=(U,L)=>{const O=u.site(U,L),F=u.partition(O[0],O[1]);return F[0]===U&&F[1]===L};let S=[p,p];for(const[U,L]of[[0,0],[1,0],[0,1],[-1,0],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]])if(_(p+U,p+L)){S=[p+U,p+L];break}const y=(U,L)=>{const O=u.site(U,L),F=l(O[0],O[1]);return{x:F[0],z:F[1]}},w=y(S[0],S[1]),E=(U,L)=>{const[O,F]=c(U,L),Y=u.partition(O,F);return{cell:Y,type:m(Y[0],Y[1]),openness:u.openness(O,F)}},R=e.dancefloor.radius,M=R+e.dancefloor.clearing,A=(U,L)=>{if(Math.hypot(U-w.x,L-w.z)<M)return 0;const[O,F]=c(U,L),Y=1-rn((Ts(U/e.gladeScale,L/e.gladeScale,i+61)-(1-e.gladeAmount))/.03);return rn((u.openness(O,F)-e.clearingSize)/Math.max(.01,e.clearingFalloff))*e.treeDensity*Y},P=(U,L)=>{const O=fn[m(U,L)];return O.setPiece&&Xe(U,L,i+61)<e.setPieceChance?O.setPiece:null},D=(U,L)=>Math.min(1,Math.hypot(U-S[0],L-S[1])/(t/2)),B=r*.5;return{seed:i,tuning:e,n:t,margin:n,areaSize:r,partition:u,centreCell:S,dancefloor:{x:w.x,z:w.z,radius:R},start:{x:w.x,z:w.z+2},bounds:{minX:B,maxX:t*r-B,minZ:B,maxZ:t*r-B},extent:{minX:d*r,maxX:h*r,minZ:d*r,maxZ:h*r},typeOf:m,areaAt:E,siteOf:y,treeWeight:A,neighbours:f,setPieceOf:P,remoteness:D}}function sl(i,e,t,n,r){return Math.hypot(i,e)<n||e>=0?!1:Math.atan2(Math.abs(i),-e)*180/Math.PI<(t?r.facing.awayLeave:r.facing.awayEnter)}function Od(i,e){return{x:i,z:e,vx:0,vz:0,lift:0,mode:"ground",facing:1,away:!1,lean:!1}}const fr=(i,e)=>Tn(e.groundHeight,e.treetopHeight,rn(i.lift)),Wl=i=>rn(i.lift);function Bd(i,e,t,n,r){let{mode:s,lift:a}=i;e.toggleMode&&(s=s==="ground"||s==="descending"?"rising":"descending"),s==="rising"?(a+=t/Math.max(.001,n.riseTime),a>=1&&(a=1,s="treetop")):s==="descending"&&(a-=t/Math.max(.001,n.descendTime),a<=0&&(a=0,s="ground"));let o=e.moveX,c=e.moveZ;const l=Math.hypot(o,c);l>1&&(o/=l,c/=l);const u=Tn(n.groundSpeed,n.treetopSpeed,rn(a)),d=1-Math.exp(-Tn(n.groundAcceleration,n.acceleration,rn(a))*t);let h=i.vx+(o*u-i.vx)*d,f=i.vz+(c*u-i.vz)*d,g=i.x+h*t,x=i.z+f*t;(g<r.minX||g>r.maxX)&&(g=pi(g,r.minX,r.maxX),h=0),(x<r.minZ||x>r.maxZ)&&(x=pi(x,r.minZ,r.maxZ),f=0);const m=h>.3?1:h<-.3?-1:i.facing,p=Math.hypot(h,f),_=sl(h,f,i.away,Math.max(1,u*.15),n);return{x:g,z:x,vx:h,vz:f,lift:a,mode:s,facing:m,away:_,lean:p>u*n.leanAt}}const sa=3;function zd(i,e,t=.5,n=1){const r=i.tuning,s=pi(e,0,1),a=Math.max(0,Math.round(Tn(r.creaturesNear,r.creaturesFar,Math.pow(s,r.creatureCurve))+(t-.5)*2)),o=a>0&&n<kd(i,s)?1:0,c=Math.max(0,a-o),l=Math.round(c*r.adultShareFar*rn((s-r.adultsFrom)/Math.max(.01,1-r.adultsFrom))),u=Math.round((c-l)*r.youngShareFar*s);return{babies:Math.max(0,c-l-u),young:u,adults:l,legends:o}}const kd=(i,e)=>i.tuning.legendChanceFar*rn((e-i.tuning.legendsFrom)/Math.max(.01,1-i.tuning.legendsFrom)),xh=i=>i.areaSize*.75,zs=(i,e,t,n)=>{const r=i.areaAt(e,t).cell;return r[0]===n[0]&&r[1]===n[1]};function vh(i,e,t,n,r){if(zs(i,t,n,e))return[t,n];for(let s=2;s<r*1.5;s+=2)for(let a=0;a<16;a++){const o=a/16*Math.PI*2,c=t+Math.cos(o)*s,l=n+Math.sin(o)*s;if(zs(i,c,l,e))return[c,l]}return[t,n]}function ks(i,e,t){for(let n=0;n<12;n++){const r=t()*Math.PI*2,s=Math.sqrt(t())*e.range,a=e.homeX+Math.cos(r)*s,o=e.homeZ+Math.sin(r)*s;if(zs(i,a,o,e.cell))return[a,o]}return[e.anchorX,e.anchorZ]}function Gd(i){const e=[],t=i.tuning;let n=0;const[r,s]=i.centreCell;for(let a=0;a<i.n;a++)for(let o=0;o<i.n;o++){if(o===r&&a===s)continue;const c=fi(i.seed*7919+o*131+a*977+3),l=fn[i.typeOf(o,a)],u=i.siteOf(o,a),d=i.remoteness(o,a),h=zd(i,d,Xe(o,a,i.seed+43),Xe(o,a,i.seed+47)),f=x=>{const m=[o,a],p=xh(i),[_,S]=vh(i,m,u.x,u.z,p),y={cell:m,homeX:u.x,homeZ:u.z,range:p,anchorX:_,anchorZ:S},[w,E]=ks(i,y,c);return{id:n++,species:l.creature,level:x,...y,x:w,z:E,tx:w,tz:E,rest:c()*3,speed:(x===sa?t.legendSpeed:t.creatureSpeed)*(.7+c()*.6),facing:c()<.5?1:-1,away:!1,moving:!1,walk:c(),seen:0,leashed:!1,rand:fi(i.seed*31+n*7+11)}};for(let x=0;x<h.babies;x++)e.push(f(0));for(let x=0;x<h.young;x++)e.push(f(1));for(let x=0;x<h.adults;x++)e.push(f(2));const g=t.legendNextToHome&&o===r+1&&a===s;(h.legends||g)&&e.push(f(3))}return e}function Hd(i,e,t){if(i.rest>0){i.rest-=e,i.moving=!1,i.away=!1;return}const n=i.tx-i.x,r=i.tz-i.z,s=Math.hypot(n,r);if(s<.05){[i.tx,i.tz]=ks(t,i,i.rand),i.rest=.8+i.rand()*3.5,i.moving=!1;return}const a=Math.min(s,i.speed*e),o=i.x+n/s*a,c=i.z+r/s*a;if(!zs(t,o,c,i.cell)){i.tx=i.x,i.tz=i.z,i.moving=!1;return}i.x=o,i.z=c,Math.abs(n)>.02&&(i.facing=n>0?1:-1),i.away=sl(n,r,i.away,0,t.tuning),i.moving=!0,i.walk+=e*(i.level===sa?1.5:4)}function Vd(i,e,t,n,r,s,a){for(const o of i)if(!o.leashed&&!(Math.abs(o.homeX-e)>n||Math.abs(o.homeZ-t)>n)){if(s-o.seen>3){const c=fi(o.id*7919+Math.floor(s/20)*131+5);[o.x,o.z]=ks(a,o,c),[o.tx,o.tz]=ks(a,o,c),o.rest=c()*2}o.seen=s,Hd(o,r,a)}}const _h=6,Wd=4,Bt=32;function Xd(i){const e=i.tuning.camera.treetop.angleIn*Math.PI/180;return i.tuning.crownHeight/Math.sin(e)}function Yd(i,e,t){const{treeSpacingX:n,treeSpacingZ:r}=i.tuning,s=i.seed,a=[],o=Xd(i),c=i.tuning.crownHalfWidth,l=Math.ceil(t*Bt/r),u=Math.ceil((t+1)*Bt/r);for(let d=l;d<u;d++){const h=d&1?.5:0,f=Math.ceil(e*Bt/n-h),g=Math.ceil((e+1)*Bt/n-h);for(let x=f;x<g;x++){const m=(x+h+(Xe(x,d,s+101)-.5)*.7)*n,p=(d+(Xe(x,d,s+102)-.5)*.7)*r,_=i.areaAt(m,p);Xe(x,d,s+103)>=i.treeWeight(m,p)*fn[_.type].treeDensity||i.treeWeight(m,p-o)===0||i.treeWeight(m-c,p-o)===0||i.treeWeight(m+c,p-o)===0||a.push({x:m,z:p,type:_.type,variant:Math.floor(Xe(x,d,s+104)*_h),flip:Xe(x,d,s+105)<.5})}}return a}function qd(i,e,t){const n=i.tuning.bushSpacing,r=i.seed,s=[],a=Math.ceil(t*Bt/n),o=Math.ceil((t+1)*Bt/n),c=Math.ceil(e*Bt/n),l=Math.ceil((e+1)*Bt/n);for(let u=a;u<o;u++)for(let d=c;d<l;d++){const h=(d+Xe(d,u,r+201)-.5)*n,f=(u+Xe(d,u,r+202)-.5)*n,g=1+i.tuning.bushClump*(2*rn((Ts(h/13,f/13,r+207)-.35)/.3)-1);Xe(d,u,r+203)>(.12+Math.min(1,i.treeWeight(h,f))*.3)*i.tuning.bushDensity*g||Math.hypot(h-i.dancefloor.x,f-i.dancefloor.z)<i.dancefloor.radius+2||s.push({x:h,z:f,type:i.areaAt(h,f).type,variant:Math.floor(Xe(d,u,r+204)*Wd),flip:Xe(d,u,r+205)<.5})}return s}function Kd(i,e,t){const n=i.tuning.wallSpacing,r=i.seed,s=[],a=Math.ceil(t*Bt/n),o=Math.ceil((t+1)*Bt/n),c=Math.ceil(e*Bt/n),l=Math.ceil((e+1)*Bt/n);for(let u=a;u<o;u++)for(let d=c;d<l;d++){if(Xe(d,u,r+303)>i.tuning.wallDensity)continue;const h=(d+(Xe(d,u,r+301)-.5)*.6)*n,f=(u+(Xe(d,u,r+302)-.5)*.6)*n,g=i.areaAt(h,f);g.openness<.82||!fn[g.type].hasWalls||Math.hypot(h-i.dancefloor.x,f-i.dancefloor.z)<i.dancefloor.radius+4||s.push({x:h,z:f,type:g.type,variant:Math.floor(Xe(d,u,r+304)*4),flip:Xe(d,u,r+305)<.5})}return s}const $d=new Set(["wetland","stream","bog","beaver-pond","moor"]);function Zd(i,e,t){const n=i.tuning.lightSources,r=n.spacing,s=i.seed,a=[],o=Math.ceil(t*Bt/r),c=Math.ceil((t+1)*Bt/r),l=Math.ceil(e*Bt/r),u=Math.ceil((e+1)*Bt/r);for(let d=o;d<c;d++)for(let h=l;h<u;h++){const f=(h+(Xe(h,d,s+401)-.5)*.7)*r,g=(d+(Xe(h,d,s+402)-.5)*.7)*r;if(Math.hypot(f-i.dancefloor.x,g-i.dancefloor.z)<i.dancefloor.radius+i.tuning.dancefloor.clearing+4)continue;const x=i.areaAt(f,g),m=x.openness<.35||x.openness>.8?1:.25,p=Xe(h,d,s+403),S=($d.has(fn[x.type].id)?n.wetPond:n.pond)*m,y=n.campfire*m,w=n.magicStone*m,E=p<S?"pond":p<S+y?"campfire":p<S+y+w?"stone":null;E&&a.push({x:f,z:g,kind:E,size:.75+Xe(h,d,s+404)*.5})}return a}class Jd{constructor(e){this.map=e}map;trees=new Map;bushes=new Map;walls=new Map;lights=new Map;chunks(e,t,n){const r=[];for(let s=Math.floor((t-n)/Bt);s<=Math.floor((t+n)/Bt);s++)for(let a=Math.floor((e-n)/Bt);a<=Math.floor((e+n)/Bt);a++)r.push([a,s]);return r}gather(e,t,n,r,s){e.size>600&&e.clear();const a=[];for(const[o,c]of this.chunks(n,r,s)){const l=o+","+c;let u=e.get(l);u||(u=t(o,c),e.set(l,u));for(const d of u)Math.abs(d.x-n)<=s&&Math.abs(d.z-r)<=s&&a.push(d)}return a}treesNear(e,t,n){return this.gather(this.trees,(r,s)=>Yd(this.map,r,s),e,t,n)}bushesNear(e,t,n){return this.gather(this.bushes,(r,s)=>qd(this.map,r,s),e,t,n)}lightsNear(e,t,n){return this.gather(this.lights,(r,s)=>Zd(this.map,r,s),e,t,n)}wallsNear(e,t,n){return this.gather(this.walls,(r,s)=>Kd(this.map,r,s),e,t,n)}setPiecesNear(e,t,n){const r=this.map,s=r.areaSize,a=[];for(let o=Math.floor((t-n)/s)-1;o<=Math.floor((t+n)/s)+1;o++)for(let c=Math.floor((e-n)/s)-1;c<=Math.floor((e+n)/s)+1;c++){if(c===r.centreCell[0]&&o===r.centreCell[1]||!r.setPieceOf(c,o))continue;const l=r.siteOf(c,o);Math.abs(l.x-e)<=n&&Math.abs(l.z-4-t)<=n&&a.push({x:l.x,z:l.z-4,type:r.typeOf(c,o),variant:0,flip:Xe(c,o,r.seed+71)<.5})}return a}}const Qd=()=>({stack:[],placed:[],talk:null,events:[],held:!1,heldInAir:!1}),jd=(i,e)=>e.invite.talkTime[Math.min(i.level,e.invite.talkTime.length-1)],ef=(i,e)=>e.invite.turn[Math.min(i.level,e.invite.turn.length-1)],io=i=>!i.leashed&&i.level!==sa;function tf(i,e,t,n){if(i.stack.includes(e))return{x:t,z:n};const r=i.placed.find(s=>s.id===e);return r?{x:r.x,z:r.z}:null}function nf(i,e,t,n){return zr(i,e,t,n.invite.talkRange)??zr(i,e,t,n.invite.talkRange,!0)}function zr(i,e,t,n,r=!1){let s=null,a=n;for(const o of i){if(o.leashed||!r&&!io(o))continue;const c=Math.hypot(o.x-e,o.z-t);c<=a&&(a=c,s=o)}return s}function Xl(i,e,t,n,r){e.leashed=!0,e.rest=0,i.stack.push(e.id),i.events.push({kind:"invited",id:e.id,x:t,z:n,at:r})}function rf(i,e,t,n,r,s,a,o){i.events=[],i.held=t.talk,i.heldInAir=t.talk&&!r;const c=o.invite,l=o.leash,u=d=>e[d];if(t.talk&&r){const d=i.talk?u(i.talk.id):null;if(d&&!d.leashed&&Math.hypot(d.x-n.x,d.z-n.z)<=c.cancelDistance)i.talk.t+=a,d.rest=Math.max(d.rest,.2),d.moving=!1,d.facing=n.x>=d.x?1:-1,d.away=n.z<d.z-1,!i.talk.refused&&i.talk.t>=i.talk.total&&(Xl(i,d,d.x,d.z,s),i.talk=null);else{i.talk&&i.events.push({kind:"cancelled",id:i.talk.id,x:n.x,z:n.z,at:s});const h=zr(e,n.x,n.z,c.talkRange)??zr(e,n.x,n.z,c.talkRange,!0);i.talk=h?{id:h.id,refused:!io(h),t:0,total:io(h)?jd(h,o):1/0}:null}}else i.talk&&(i.events.push({kind:"cancelled",id:i.talk.id,x:n.x,z:n.z,at:s}),i.talk=null);if(t.inviteNearest){const d=zr(e,n.x,n.z,1/0);d&&Xl(i,d,d.x,d.z,s)}if(t.sigil&&r){let d=-1,h=l.pickRadius;if(i.placed.forEach((f,g)=>{const x=Math.hypot(f.x-n.x,f.z-n.z);x<=h&&(h=x,d=g)}),d>=0){const[f]=i.placed.splice(d,1);i.stack.push(f.id),i.events.push({kind:"picked",id:f.id,x:f.x,z:f.z,at:s})}else if(i.stack.length){const f=i.stack[i.stack.length-1];Mh(i,n.x,n.z,o)?i.events.push({kind:"fizzled",id:f,x:n.x,z:n.z,at:s}):(i.stack.pop(),i.placed.push({id:f,x:n.x,z:n.z,at:s}),i.events.push({kind:"placed",id:f,x:n.x,z:n.z,at:s}))}}for(const d of i.stack)Yl(u(d),n.x,n.z,a,o);for(const d of i.placed)Yl(u(d.id),d.x,d.z,a,o)}const Mh=(i,e,t,n)=>i.placed.some(r=>Math.hypot(r.x-e,r.z-t)<n.leash.spacing);function Yl(i,e,t,n,r){const s=r.leash,a=s.length,o=Math.hypot(i.x-e,i.z-t)>a;if(o){const f=Math.hypot(i.x-e,i.z-t),g=a*.5/f;i.tx=e+(i.x-e)*g,i.tz=t+(i.z-t)*g,i.rest=0}else if(i.rest>0){i.rest-=n,i.moving=!1,i.away=!1;return}else if(Math.hypot(i.tx-e,i.tz-t)>a*.85||Math.hypot(i.tx-i.x,i.tz-i.z)<.05){Math.hypot(i.tx-i.x,i.tz-i.z)<.05&&(i.rest=.5+i.rand()*2);const f=i.rand()*Math.PI*2,g=Math.sqrt(i.rand())*a*.8;if(i.tx=e+Math.cos(f)*g,i.tz=t+Math.sin(f)*g,i.rest>0){i.moving=!1,i.away=!1;return}}const c=i.tx-i.x,l=i.tz-i.z,u=Math.hypot(c,l);if(u<1e-4){i.moving=!1;return}const d=o?Math.max(i.speed,s.runSpeed*(i.level===sa?.6:1)):i.speed*1.5,h=Math.min(u,d*n);i.x+=c/u*h,i.z+=l/u*h,Math.abs(c)>.02&&(i.facing=c>0?1:-1),i.away=sl(c,l,i.away,0,r),i.moving=!0,i.walk+=n*(o?7:4)}const sf=i=>`${i[0]},${i[1]}`;function af(i){const e={cell:i.centreCell,wave:0,at:0,from:null,soundsystem:null};return{areas:new Map([[sf(i.centreCell),e]]),wave:0,nextAt:i.tuning.party.startDelay+i.tuning.party.interval,paused:!1}}function of(i,e){const t=i.siteOf(e[0],e[1]),n=fi(i.seed*17+e[0]*53+e[1]*911),[r,s]=vh(i,[e[0],e[1]],t.x,t.z,i.areaSize*.75),a=Math.floor(Xe(e[0],e[1],i.seed+77)*3)%3;for(let o=0;o<24;o++){const c=n()*Math.PI*2,l=3+n()*4,u=r+Math.cos(c)*l,d=s+Math.sin(c)*l+3,h=i.areaAt(u,d).cell;if(h[0]===e[0]&&h[1]===e[1])return{x:u,z:d,variant:a}}return{x:r,z:s,variant:a}}const lf=(i,e)=>e[0]>=0&&e[1]>=0&&e[0]<i.n&&e[1]<i.n;function Sh(i,e,t){const n=i.wave+1,r=[],s=new Map,a=new Map;for(const[l,u]of i.areas)for(const d of e.neighbours.get(l)??[]){if(i.areas.has(d)||s.has(d))continue;const h=d.split(",").map(Number);lf(e,h)&&(s.set(d,h),a.set(d,u.cell))}const o=[...s.entries()].sort((l,u)=>Xe(l[1][0],l[1][1],e.seed+n)-Xe(u[1][0],u[1][1],e.seed+n)),c=e.tuning.party.maxPerWave>0?e.tuning.party.maxPerWave:1/0;for(const[l,u]of o.slice(0,c)){const d={cell:u,wave:n,at:t,from:a.get(l)??null,soundsystem:of(e,u)};i.areas.set(l,d),r.push(d)}return i.wave=n,r}function cf(i,e,t,n){return i.paused?(i.nextAt+=n,[]):t<i.nextAt?[]:(i.nextAt+=e.tuning.party.interval,Sh(i,e,t))}function hf(i,e,t){const n=Math.max(0,i.nextAt-t),r=e.tuning.party.interval;return{left:n,gone:1-Math.min(1,n/r)}}function uf(i,e){const t=Fd(i,e),n=Od(t.start.x,t.start.z);return{seed:i,tuning:e,map:t,forest:new Jd(t),creatures:Gd(t),clock:wu(),witch:n,camera:Su(e,n.x,fr(n,e),n.z),party:af(t),leash:Qd()}}function df(i,e,t){const n=Eu(i.clock,t);n!==0&&(i.witch=Bd(i.witch,e,n,i.tuning,i.map.bounds),i.camera=yu(i.camera,e.zoom,{x:i.witch.x,y:fr(i.witch,i.tuning),z:i.witch.z},{x:i.witch.vx,z:i.witch.vz},i.witch.lift,n,i.tuning),e.pauseWaves&&(i.party.paused=!i.party.paused),e.nextWave&&(Sh(i.party,i.map,i.clock.time),i.party.nextAt=i.clock.time+i.tuning.party.interval),cf(i.party,i.map,i.clock.time,n),Vd(i.creatures,i.witch.x,i.witch.z,ff(i),n,i.clock.time,i.map),rf(i.leash,i.creatures,{talk:!!e.talk,sigil:!!e.sigil,inviteNearest:e.inviteNearest},i.witch,i.witch.mode==="ground",i.clock.time,n,i.tuning))}const ff=i=>Math.max(i.tuning.creatureSimRadius,i.tuning.haze.far+20+xh(i.map)*2.5),ql=i=>ih(i.camera,i.camera.lift,i.tuning);function yh(i){const e=i.map.areaAt(i.witch.x,i.witch.z),t=i.map.setPieceOf(e.cell[0],e.cell[1]);return fn[e.type].name+(t?` (set piece: ${t})`:"")}const pf="Witch tuning. Edit the numbers, push, and the playable link rebuilds. Distances are metres, times seconds, angles degrees. Keys starting with _ are notes.",mf="The forest: mapAreas x mapAreas areas cut by the fractal partition. An area is areaSize x areaScale metres across on average (areaScale 4 makes them four times as wide as the first 28 m areas; push it for bigger). areaSizeVariance (0-1) makes areas vary in size, some small, some large. borderLayers sets how wiggly borders are.",gf=20,xf=28,vf=4,_f=.7,Mf=4,Sf="treeHeight and crownWidth scale the art's trees (1 is the Art Lab's size; crowns widen with treeHeight too, crownWidth is the total). treeDensity (0-1): the chance of a tree on each spot outside the clearings; clearingSize (0-1): how far out from an area's centre the ground stays fully open; clearingFalloff (0-1): over how much of the way to the border trees thicken to full density (small: crisp clearing edges); gladeAmount (0-1) of the woods is open in random glades about gladeScale metres across; trees sit on a staggered grid treeSpacingX by treeSpacingZ metres, so no two crowns pile up. A tree is left out where its crown (crownHalfWidth either side, crownHeight up) would hang over a clearing seen from the treetops.",yf=.8,bf=.2,wf=.12,Ef=.25,Tf=38,Af=.45,Cf=.8,Rf=2.25,Lf=1.7,Pf=4.6,Df=2.8,If=10.5,Uf=11.25,Nf=3.4,Ff=4,Of=.6,Bf="Speeds per mode, and how long rising and descending take. acceleration: how quickly she reaches her speed or stops in the treetops (per second; higher is snappier); groundAcceleration: the same on the ground. leanAt: the share of the top speed above which she leans into her flight. facing: she (and every creature) faces the viewer unless clearly heading up the screen, within awayEnter degrees of straight up (and stays turned away until past awayLeave); sideways, down or stopped faces the viewer.",zf=17.5,kf=32,Gf=10,Hf=28,Vf=.7,Wf={awayEnter:55,awayLeave:65},Xf=.7,Yf=.55,qf=1.4,Kf=24,$f="Near-isometric on the ground, after Transistor; lower over the treetops, looking toward the horizon to feel the speed. The camera follows the witch on a soft spring (follow: its stiffness; higher keeps her closer to the middle) and looks a little ahead of her: lookAhead seconds of flight, at most lookAheadMax metres, eased in at lookAheadEase. zoomEase and liftEase: how softly zoom and rising change the angle and distance. a narrow field of view (fov, degrees) seen from far off, so there is little perspective. Each mode has its own angle (degrees below horizontal) and distance from the witch, at zoomed-in and zoomed-out. Zoom moves between them in zoomSteps steps, starting at startZoom: with 4 steps and startZoom 1 the start is a third of the way out, so the defaults are ground 32 degrees at 100 m and treetop 36 degrees at 170 m, with one step in and two out from each.",Zf={fov:20,ground:{angleIn:30,angleOut:36,distanceIn:80,distanceOut:140},treetop:{angleIn:34,angleOut:40,distanceIn:150,distanceOut:210},lookAhead:.1,lookAheadMax:3,lookAheadEase:1.5,zoomEase:5,liftEase:8,zoomSteps:4,startZoom:1,follow:8},Jf="Everything the camera can see is drawn, plus viewMargin metres round the view, so nothing appears or vanishes on screen. haze: the twilight haze fades the forest from near to far metres from the witch; nothing is drawn beyond far. lightBudget: how many of the nearest point lights (campfires, magic stones, the dancefloor) light the scene at once. pixelSize: screen pixels per art pixel. glowReach: metres the witch's light reaches. spriteTilt: 1 = sprites face the camera fully, 0 = stand upright.",Qf=3,jf=12,ep=1,tp=1,np=16,ip=12,rp=20,sp="Light sources placed by seed, on a grid of spacing metres, mostly in clearings and at area edges: the chance per spot of a campfire, a magic stone, or a pond mirroring the moon (wetPond in wet areas: wetland, stream, bog, beaver pond, moor).",ap="How far (reach, metres) and how strongly each kind of light lights its surroundings. glowPower: the witch's own glow (glowReach is its reach). Light falls off smoothly to nothing at its reach: no rings or bands.",op={campfire:{reach:22,strength:2.6},stone:{reach:16,strength:1.8}},lp=2.2,cp="The music's clock (beats per minute): the lasers sweep to it and party animals dance to it. Later the music itself drives it.",hp={bpm:120},up="The sigil stack above the witch's hat: scale (of the sigils' size), offset (the gap between her hat tip and the bottom sigil, in sigil heights), gap (between sigils, in sigil heights). It sways as a chain of springs: stiffness and damping, trail (how far it leans back per m/s of her speed), idleSway (metres of gentle sway when she's still).",dp={offset:.5,scale:.65,gap:.15,stiffness:60,damping:9,trail:.03,idleSway:.1},fp="Each playing soundsystem's laser show: bursts of blockBars bars, on about duty of the time (seeded per soundsystem), up to maxCount beams stepping on the bars, fanned over spread degrees, swinging sweep degrees once every sweepBeats beats (slow, like searchlights), opening and closing the fan every openBars bars, length metres tall, opacity 0-1, fading in over fadeIn and out over fadeOut seconds, and fading with distance from fadeNear to fadeFar metres. Glow only: no light, nothing from the light budget.",pp={on:!0,maxCount:9,length:420,spread:120,sweep:22,sweepBeats:12,openBars:6,opacity:.6,duty:.35,blockBars:4,fadeIn:.12,fadeOut:.4,fadeNear:140,fadeFar:480},mp="A sparkling line round the partified region's outside edge, in each area's sigil colour: width (px), brightness, sparkle (0-1, how much it twinkles and runs), step (metres between its sparks).",gp={on:!0,width:2,brightness:1.2,sparkle:.6,step:1.6},xp={spacing:10,campfire:.035,magicStone:.025,pond:.02,wetPond:.12},vp={near:150,far:360},_p="The scenery budget (Ed, 2026-10-03: gameplay always drawn, scenery as much as we can). Creatures, sigils, soundsystems, the dancefloor, the party border, campfires and stones are always drawn. Scenery (trees, bushes, wall objects, set pieces, string lights) is drawn out to a radius round the witch, at most the haze's far edge, fading out over its last fade metres so nothing pops. With adaptive on, the radius follows the frame rate: if it stays under fps minus hysteresis for sustain seconds the radius shrinks by shrink metres a second, never below minRadius; if it stays at fps or more, it grows back by grow metres a second. ?scenery=<metres> fixes the radius (for testing).",Mp={adaptive:!0,fps:55,hysteresis:8,sustain:1.5,minRadius:110,shrink:40,grow:15,fade:40},Sp="bloom: a gentle glow round bright things (strength 0 or on false turns it off; threshold: how bright a pixel must be to glow). tiltShift: blurs the top and bottom of the screen so the forest looks like a miniature. strength: the blur at the screen's edges, in pixels; band: the height of the sharp band (0-1 of the screen); centre: where it sits (0 top, 0.5 middle, 1 bottom); where: 'before' blurs at the low resolution, before the pixels are scaled up, 'after' blurs the scaled-up image. Add ?tilt=before, ?tilt=after or ?tilt=off to the link to compare.",yp="shadows: a small contact shadow under the witch, each bush, creature and prop; trees: a crown-sized shadow under every tree too, cast away from the moon (off: Ed, 2026-10-03). canopyShadow: a dappled shadow from the canopy overhead (height in metres), thinner in clearings, drifting with the wind. mist: a low drifting mist (height in metres above the ground). Each has on and strength.",bp={on:!0,strength:.7,trees:!1},wp={on:!0,strength:.45,height:18,cover:.55,wind:.6},Ep={on:!0,strength:.12,height:3,wind:.8},Tp="fx: how the mist, the far haze and the canopy dapple are drawn. smooth: soft gradients (the mist in its own buffer, blurred a little and scaled up smoothly); pixel: dithered steps on the art's pixel grid. In smooth, the moonlight's bands, moonbeams and the soft contact shadows under the witch, creatures, bushes and props are smooth too (no dither anywhere); pixel brings all the dithers back. ?fx=pixel or ?fx=smooth in the URL.",Ap="smooth",Cp="Inviting (DESIGN.md, the leash): on the ground, hold Talk within talkRange metres of a creature; you chat in emoji for talkTime seconds (babies, young, adults), taking turns every turn seconds (babies, young, adults), then it is invited and leashed to you. Letting go, rising or moving further than cancelDistance cancels it. Legends can't be invited: they give one unimpressed look. leash.length: how far a leashed creature roams from its leash point (you, or its sigil on the ground); runSpeed: how fast it hurries back when out of range (m/s); pickRadius: how near a placed sigil you must be to pick it up; spacing: how close two sigils may be put down (keep it above pickRadius, or a blocked spot picks up instead of fizzling). bond: how a creature shows its tie to its sigil (rim: a glow at its feet in the sigil's colour; sparks: one spark every sparkEvery seconds from sigil to creature, staggered; thread: a dotted line only under strain).",Rp={talkRange:12,cancelDistance:18,talkTime:[3,6,12],turn:[.7,.9,1.3]},Lp={length:8,runSpeed:4,pickRadius:2,spacing:4},Pp={rim:!0,sparks:!0,thread:!0,sparkEvery:4},Dp="The party spreads: a wave every interval seconds (the first after startDelay more), partifying every area touching a partified one; maxPerWave caps a wave (0: no cap). transition: seconds an area takes to partify, 0 to skip the show. partyLight: the coloured light at each soundsystem (reach in metres, strength).",Ip={interval:30,startDelay:0,maxPerWave:0,transition:2.5,lightReach:30,lightStrength:1.6},Up="Colourful string lights between trees in every partified area: up to perArea spans, in chains of up to chainMax spans from tree to tree, each span spanMin to spanMax metres long, chains starting at least spread metres apart so they cover the whole area; at height metres, sagging sag metres per 8 m of span, a bulb every bulbSpacing metres in the palette's colours, twinkling (twinkle 0-1), a chase running along now and then at chaseSpeed bulbs per second. The bulbs only glow (bloom); they cast no light, so they cost nothing from the light budget.",Np={on:!0,perArea:40,spanMin:6,spanMax:22,chainMax:4,spread:14,height:6.5,sag:.9,bulbSpacing:.8,palette:["#fff1d6","#ff6fcf","#5fe8ff","#ffe25c","#b48cff","#7dff8a"],twinkle:.35,chaseSpeed:8},Fp="The dancefloor: motes: magic particles drifting up off the circle (count, how high they rise in metres, speed in m/s, column: the share of the circle they rise from); a ring of standing stones (radius in metres, how many stones), a clear space of clearing metres round it, a glowing magic circle (two hues 0-1, pulse per second, runeSpeed in turns per minute) lighting the ground round it (lightReach metres, lightStrength), and a magic disco ball floating discoHeight metres up (discoSize metres across, spin turns per minute) throwing specks of light: specks is the share of the sphere that throws one, speckBrightness how bright, speckReach how far.",Op={motes:{count:220,rise:110,speed:3.2,column:.8},radius:13.5,stones:27,clearing:9,circleHue:.86,circleHue2:.52,pulse:.35,runeSpeed:1,lightReach:36,lightStrength:2,discoHeight:7.5,discoSize:1.8,spin:4,specks:.22,speckBrightness:.9,speckReach:32},Bp="In ground mode the canopy stays drawn at the screen's edges, so she flies under the forest roof; a dithered hole round her is cut out, screenFraction of the screen's width across, with a soft edge (a fraction of the width). Rising closes the hole.",zp={screenFraction:.8,edge:.1},kp="Contrast: ambient scales the twilight fill (lower is darker shade under the canopy); black is the black point and gamma the curve applied to the whole picture, so dark goes near-black and lit stays bright.",Gp={black:.03,gamma:1.35,ambient:.35},Hp={on:!0,strength:.7,threshold:.55},Vp={on:!0,where:"before",strength:3,band:.4,centre:.55},Wp="Creatures grow more numerous and older with an area's distance from home (0 at the dancefloor, 1 at the map's edge): creaturesNear in the areas round home, creaturesFar at the edge (creatureCurve shapes the rise), youngShareFar of them young at the edge; adults from adultsFrom outward, adultShareFar of them at the edge. Legends are rare: at most one in any area, by a chance rising from 0 at legendsFrom to legendChanceFar at the edge; legendNextToHome puts one next to home, to look at early. Idle creatures roam their whole area. Only creatures whose home is within creatureSimRadius metres of the witch move (never less than the haze far edge plus 2.5 areas, so a creature resuming its roam always does so out of sight).",Xp=2,Yp=20,qp=1.3,Kp=.5,$p=.35,Zp=.35,Jp=.25,Qp=!0,jp=.55,em=600,tm=.6,nm="setPieceChance: the share of areas, among the types that have a set piece, that show theirs. Wall objects (an area type's edges: puddles, henges, hedges) stand where areas meet, one per wallSpacing metres with chance wallDensity; they do not block movement.",im=.25,rm=.35,sm={_readme:pf,_map:mf,mapAreas:gf,areaSize:xf,areaScale:vf,areaSizeVariance:_f,borderLayers:Mf,_trees:Sf,treeDensity:yf,clearingSize:bf,clearingFalloff:wf,gladeAmount:Ef,gladeScale:Tf,bushDensity:Af,bushClump:Cf,treeHeight:Rf,crownWidth:Lf,treeSpacingX:Pf,treeSpacingZ:Df,crownHalfWidth:If,crownHeight:Uf,bushSpacing:Nf,wallSpacing:Ff,wallDensity:Of,_witch:Bf,groundSpeed:zf,treetopSpeed:kf,acceleration:Gf,groundAcceleration:Hf,leanAt:Vf,facing:Wf,riseTime:Xf,descendTime:Yf,groundHeight:qf,treetopHeight:Kf,_camera:$f,camera:Zf,_look:Jf,pixelSize:Qf,glowReach:jf,glowHeight:ep,spriteTilt:tp,artPixelsPerMetre:np,viewMargin:ip,lightBudget:rp,_lightSources:sp,_lights:ap,lights:op,glowPower:lp,_beat:cp,beat:hp,_stack:up,stack:dp,_lasers:fp,lasers:pp,_borders:mp,borders:gp,lightSources:xp,haze:vp,_scenery:_p,scenery:Mp,_post:Sp,_shadows:yp,shadows:bp,canopyShadow:wp,mist:Ep,_fx:Tp,fx:Ap,_invite:Cp,invite:Rp,leash:Lp,bond:Pp,_party:Dp,party:Ip,_stringLights:Up,stringLights:Np,_dancefloor:Fp,dancefloor:Op,_canopyCutout:Bp,canopyCutout:zp,_tone:kp,tone:Gp,bloom:Hp,tiltShift:Vp,_creatures:Wp,creaturesNear:Xp,creaturesFar:Yp,creatureCurve:qp,youngShareFar:Kp,adultsFrom:$p,adultShareFar:Zp,legendChanceFar:Jp,legendNextToHome:Qp,legendsFrom:jp,creatureSimRadius:em,creatureSpeed:tm,_setPieces:nm,setPieceChance:im,legendSpeed:rm},ki=sm;class am{keys=new Set;pressed=new Set;padPrev=[];touch={x:0,y:0,toggle:!1,zoom:0,debug:!1};onAny=null;constructor(e=window){e.addEventListener("keydown",t=>{if(t.repeat){this.isGameKey(t.code)&&t.preventDefault();return}this.keys.add(t.code),this.isGameKey(t.code)&&t.preventDefault(),this.onAny?.()||this.pressed.add(t.code)}),e.addEventListener("keyup",t=>this.keys.delete(t.code)),e.addEventListener("blur",()=>this.keys.clear())}isGameKey(e){return/^(Arrow|Space$|Key[WASDZXENPTIFR]$|Shift|Minus$|Equal$|NumpadAdd$|NumpadSubtract$|Backquote$)/.test(e)}clearPresses(){this.pressed.clear();const e=this.touch;e.toggle=!1,e.zoom=0,e.debug=!1}read(){const e=this.pressed.has("KeyN")||this.touch.nextWave,t=this.pressed.has("KeyP")||this.touch.pauseWaves;this.touch.nextWave=!1,this.touch.pauseWaves=!1;const n=m=>this.keys.has(m)?1:0,r=m=>this.pressed.has(m);let s=n("KeyD")+n("ArrowRight")-n("KeyA")-n("ArrowLeft"),a=n("KeyS")+n("ArrowDown")-n("KeyW")-n("ArrowUp"),o=r("Space"),c=(r("KeyX")||r("Minus")||r("NumpadSubtract")?1:0)-(r("KeyZ")||r("Equal")||r("NumpadAdd")?1:0),l=r("Backquote"),u=n("KeyT")+n("KeyF")+n("ShiftLeft")+n("ShiftRight")>0,d=r("KeyE")||r("KeyR");const h=r("KeyI");this.pressed.clear();const f=typeof navigator<"u"&&navigator.getGamepads?navigator.getGamepads():[];for(const m of f){if(!m)continue;const p=A=>!!m.buttons[A]?.pressed,S=m.buttons.some((A,P)=>A.pressed&&!this.padPrev[P])&&!!this.onAny?.(),y=A=>!S&&p(A)&&!this.padPrev[A];let w=m.axes[0]??0,E=m.axes[1]??0;const R=Math.hypot(w,E),M=.18;if(R<M)w=0,E=0;else{const A=(Math.min(1,R)-M)/(1-M)/R;w*=A,E*=A}w+=(p(15)?1:0)-(p(14)?1:0),E+=(p(13)?1:0)-(p(12)?1:0),s+=w,a+=E,y(3)&&(o=!0),(y(4)||y(6))&&(c+=1),(y(5)||y(7))&&(c-=1),y(8)&&(l=!0),p(0)&&(u=!0),y(2)&&(d=!0),this.padPrev=m.buttons.map(A=>A.pressed);break}const g=this.touch;s+=g.x,a+=g.y,g.toggle&&(o=!0),c+=g.zoom,g.debug&&(l=!0),g.talk&&(u=!0),g.sigil&&(d=!0),g.toggle=!1,g.zoom=0,g.debug=!1,g.sigil=!1;const x=Math.hypot(s,a);return x>1&&(s/=x,a/=x),{moveX:s,moveZ:a,toggleMode:o,zoom:Math.sign(c),debug:l,nextWave:e,pauseWaves:t,talk:u,sigil:d,inviteNearest:h}}}const al="186",om=0,Kl=1,lm=2,Ps=1,cm=2,Nr=3,Di=0,nn=1,Kn=2,Bn=0,or=1,pr=2,$l=3,Zl=4,aa=5,nr=100,hm=101,um=102,dm=103,fm=104,ol=200,pm=201,ll=202,mm=203,cl=204,hl=205,gm=206,xm=207,vm=208,_m=209,Mm=210,Sm=211,ym=212,bm=213,wm=214,ro=0,so=1,ao=2,kr=3,oo=4,lo=5,co=6,ho=7,bh=0,Em=1,Tm=2,zn=0,wh=1,Eh=2,Th=3,Ah=4,Ch=5,Rh=6,Lh=7,Ph=300,Ii=301,mr=302,xa=303,va=304,oa=306,uo=1e3,$n=1001,fo=1002,Dt=1003,Am=1004,Jr=1005,Lt=1006,_a=1007,Ai=1008,cn=1009,Dh=1010,Ih=1011,Gr=1012,ul=1013,kn=1014,Nn=1015,Gn=1016,dl=1017,fl=1018,Hr=1020,Uh=35902,Nh=35899,Fh=1021,Oh=1022,hn=1023,Qn=1026,Ci=1027,Bh=1028,pl=1029,Ui=1030,ml=1031,gl=1033,Ds=33776,Is=33777,Us=33778,Ns=33779,po=35840,mo=35841,go=35842,xo=35843,vo=36196,_o=37492,Mo=37496,So=37488,yo=37489,Gs=37490,bo=37491,wo=37808,Eo=37809,To=37810,Ao=37811,Co=37812,Ro=37813,Lo=37814,Po=37815,Do=37816,Io=37817,Uo=37818,No=37819,Fo=37820,Oo=37821,Bo=36492,zo=36494,ko=36495,Go=36283,Ho=36284,Hs=36285,Vo=36286,Cm=3200,Jl=0,Rm=1,An="",vn="srgb",Vr="srgb-linear",Vs="linear",mt="srgb",Ma=7680,Lm=519,Pm=512,Dm=513,Im=514,xl=515,Um=516,Nm=517,vl=518,Fm=519,Om=35044,lr=35048,Ql="300 es",Fn=2e3,Ws=2001;function Bm(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Xs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function zm(){const i=Xs("canvas");return i.style.display="block",i}const jl={};function ec(...i){const e="THREE."+i.shift();console.log(e,...i)}function zh(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Be(...i){i=zh(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function rt(...i){i=zh(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function cr(...i){const e=i.join(" ");e in jl||(jl[e]=!0,Be(...i))}function km(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const Gm={[ro]:so,[ao]:co,[oo]:ho,[kr]:lo,[so]:ro,[co]:ao,[ho]:oo,[lo]:kr};class Oi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const r=n[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const qt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Sa=Math.PI/180,Wo=180/Math.PI;function Xr(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(qt[i&255]+qt[i>>8&255]+qt[i>>16&255]+qt[i>>24&255]+"-"+qt[e&255]+qt[e>>8&255]+"-"+qt[e>>16&15|64]+qt[e>>24&255]+"-"+qt[t&63|128]+qt[t>>8&255]+"-"+qt[t>>16&255]+qt[t>>24&255]+qt[n&255]+qt[n>>8&255]+qt[n>>16&255]+qt[n>>24&255]).toLowerCase()}function nt(i,e,t){return Math.max(e,Math.min(t,i))}function Hm(i,e){return(i%e+e)%e}function ya(i,e,t){return(1-t)*i+t*e}function Tr(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function en(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class Ge{static{Ge.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(nt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(nt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class vr{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let c=n[r+0],l=n[r+1],u=n[r+2],d=n[r+3],h=s[a+0],f=s[a+1],g=s[a+2],x=s[a+3];if(d!==x||c!==h||l!==f||u!==g){let m=c*h+l*f+u*g+d*x;m<0&&(h=-h,f=-f,g=-g,x=-x,m=-m);let p=1-o;if(m<.9995){const _=Math.acos(m),S=Math.sin(_);p=Math.sin(p*_)/S,o=Math.sin(o*_)/S,c=c*p+h*o,l=l*p+f*o,u=u*p+g*o,d=d*p+x*o}else{c=c*p+h*o,l=l*p+f*o,u=u*p+g*o,d=d*p+x*o;const _=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=_,l*=_,u*=_,d*=_}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,r,s,a){const o=n[r],c=n[r+1],l=n[r+2],u=n[r+3],d=s[a],h=s[a+1],f=s[a+2],g=s[a+3];return e[t]=o*g+u*d+c*f-l*h,e[t+1]=c*g+u*h+l*d-o*f,e[t+2]=l*g+u*f+o*h-c*d,e[t+3]=u*g-o*d-c*h-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(r/2),d=o(s/2),h=c(n/2),f=c(r/2),g=c(s/2);switch(a){case"XYZ":this._x=h*u*d+l*f*g,this._y=l*f*d-h*u*g,this._z=l*u*g+h*f*d,this._w=l*u*d-h*f*g;break;case"YXZ":this._x=h*u*d+l*f*g,this._y=l*f*d-h*u*g,this._z=l*u*g-h*f*d,this._w=l*u*d+h*f*g;break;case"ZXY":this._x=h*u*d-l*f*g,this._y=l*f*d+h*u*g,this._z=l*u*g+h*f*d,this._w=l*u*d-h*f*g;break;case"ZYX":this._x=h*u*d-l*f*g,this._y=l*f*d+h*u*g,this._z=l*u*g-h*f*d,this._w=l*u*d+h*f*g;break;case"YZX":this._x=h*u*d+l*f*g,this._y=l*f*d+h*u*g,this._z=l*u*g-h*f*d,this._w=l*u*d-h*f*g;break;case"XZY":this._x=h*u*d-l*f*g,this._y=l*f*d-h*u*g,this._z=l*u*g+h*f*d,this._w=l*u*d+h*f*g;break;default:Be("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],d=t[10],h=n+o+d;if(h>0){const f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-c)*f,this._y=(s-l)*f,this._z=(a-r)*f}else if(n>o&&n>d){const f=2*Math.sqrt(1+n-o-d);this._w=(u-c)/f,this._x=.25*f,this._y=(r+a)/f,this._z=(s+l)/f}else if(o>d){const f=2*Math.sqrt(1+o-n-d);this._w=(s-l)/f,this._x=(r+a)/f,this._y=.25*f,this._z=(c+u)/f}else{const f=2*Math.sqrt(1+d-n-o);this._w=(a-r)/f,this._x=(s+l)/f,this._y=(c+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(nt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+a*o+r*l-s*c,this._y=r*u+a*c+s*o-n*l,this._z=s*u+a*l+n*c-r*o,this._w=a*u-n*o-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,s=-s,a=-a,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+n*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class W{static{W.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(tc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(tc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*r-o*n),u=2*(o*t-s*r),d=2*(s*n-a*t);return this.x=t+c*l+a*d-o*u,this.y=n+c*u+o*l-s*d,this.z=r+c*d+s*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this.z=nt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this.z=nt(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(nt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=r*c-s*o,this.y=s*a-n*c,this.z=n*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ba.copy(this).projectOnVector(e),this.sub(ba)}reflect(e){return this.sub(ba.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(nt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ba=new W,tc=new vr;class We{static{We.prototype.isMatrix3=!0}constructor(e,t,n,r,s,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,c,l)}set(e,t,n,r,s,a,o,c,l){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],d=n[7],h=n[2],f=n[5],g=n[8],x=r[0],m=r[3],p=r[6],_=r[1],S=r[4],y=r[7],w=r[2],E=r[5],R=r[8];return s[0]=a*x+o*_+c*w,s[3]=a*m+o*S+c*E,s[6]=a*p+o*y+c*R,s[1]=l*x+u*_+d*w,s[4]=l*m+u*S+d*E,s[7]=l*p+u*y+d*R,s[2]=h*x+f*_+g*w,s[5]=h*m+f*S+g*E,s[8]=h*p+f*y+g*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-n*s*u+n*o*c+r*s*l-r*a*c}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],d=u*a-o*l,h=o*c-u*s,f=l*s-a*c,g=t*d+n*h+r*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return e[0]=d*x,e[1]=(r*l-u*n)*x,e[2]=(o*n-r*a)*x,e[3]=h*x,e[4]=(u*t-r*c)*x,e[5]=(r*s-o*t)*x,e[6]=f*x,e[7]=(n*c-l*t)*x,e[8]=(a*t-n*s)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-r*l,r*c,-r*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return cr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(wa.makeScale(e,t)),this}rotate(e){return cr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(wa.makeRotation(-e)),this}translate(e,t){return cr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(wa.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const wa=new We,nc=new We().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ic=new We().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Vm(){const i={enabled:!0,workingColorSpace:Vr,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===mt&&(r.r=Jn(r.r),r.g=Jn(r.g),r.b=Jn(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===mt&&(r.r=hr(r.r),r.g=hr(r.g),r.b=hr(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===An?Vs:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return cr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return cr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Vr]:{primaries:e,whitePoint:n,transfer:Vs,toXYZ:nc,fromXYZ:ic,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:vn},outputColorSpaceConfig:{drawingBufferColorSpace:vn}},[vn]:{primaries:e,whitePoint:n,transfer:mt,toXYZ:nc,fromXYZ:ic,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:vn}}}),i}const tt=Vm();function Jn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function hr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Gi;class Wm{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Gi===void 0&&(Gi=Xs("canvas")),Gi.width=e.width,Gi.height=e.height;const r=Gi.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=Gi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Xs("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Jn(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Jn(t[n]/255)*255):t[n]=Jn(t[n]);return{data:t,width:e.width,height:e.height}}else return Be("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Xm=0;class _l{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Xm++}),this.uuid=Xr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Ea(r[a].image)):s.push(Ea(r[a]))}else s=Ea(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function Ea(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Wm.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Be("Texture: Unable to serialize Texture."),{})}let Ym=0;const Ta=new W;class Zt extends Oi{constructor(e=Zt.DEFAULT_IMAGE,t=Zt.DEFAULT_MAPPING,n=$n,r=$n,s=Lt,a=Ai,o=hn,c=cn,l=Zt.DEFAULT_ANISOTROPY,u=An){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ym++}),this.uuid=Xr(),this.name="",this.source=new _l(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Ge(0,0),this.repeat=new Ge(1,1),this.center=new Ge(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new We,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ta).x}get height(){return this.source.getSize(Ta).y}get depth(){return this.source.getSize(Ta).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Be(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Be(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ph)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case uo:e.x=e.x-Math.floor(e.x);break;case $n:e.x=e.x<0?0:1;break;case fo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case uo:e.y=e.y-Math.floor(e.y);break;case $n:e.y=e.y<0?0:1;break;case fo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Zt.DEFAULT_IMAGE=null;Zt.DEFAULT_MAPPING=Ph;Zt.DEFAULT_ANISOTROPY=1;class ot{static{ot.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const c=e.elements,l=c[0],u=c[4],d=c[8],h=c[1],f=c[5],g=c[9],x=c[2],m=c[6],p=c[10];if(Math.abs(u-h)<.01&&Math.abs(d-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+x)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(l+1)/2,y=(f+1)/2,w=(p+1)/2,E=(u+h)/4,R=(d+x)/4,M=(g+m)/4;return S>y&&S>w?S<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(S),r=E/n,s=R/n):y>w?y<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),n=E/r,s=M/r):w<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),n=R/s,r=M/s),this.set(n,r,s,t),this}let _=Math.sqrt((m-g)*(m-g)+(d-x)*(d-x)+(h-u)*(h-u));return Math.abs(_)<.001&&(_=1),this.x=(m-g)/_,this.y=(d-x)/_,this.z=(h-u)/_,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this.z=nt(this.z,e.z,t.z),this.w=nt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this.z=nt(this.z,e,t),this.w=nt(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(nt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class qm extends Oi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Lt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new ot(0,0,e,t),this.scissorTest=!1,this.viewport=new ot(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:n.depth},s=new Zt(r),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Lt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new _l(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Mn extends qm{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class kh extends Zt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=$n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Km extends Zt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=$n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class Ct{static{Ct.prototype.isMatrix4=!0}constructor(e,t,n,r,s,a,o,c,l,u,d,h,f,g,x,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,c,l,u,d,h,f,g,x,m)}set(e,t,n,r,s,a,o,c,l,u,d,h,f,g,x,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=r,p[1]=s,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=u,p[10]=d,p[14]=h,p[3]=f,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ct().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,r=1/Hi.setFromMatrixColumn(e,0).length(),s=1/Hi.setFromMatrixColumn(e,1).length(),a=1/Hi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const h=a*u,f=a*d,g=o*u,x=o*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=f+g*l,t[5]=h-x*l,t[9]=-o*c,t[2]=x-h*l,t[6]=g+f*l,t[10]=a*c}else if(e.order==="YXZ"){const h=c*u,f=c*d,g=l*u,x=l*d;t[0]=h+x*o,t[4]=g*o-f,t[8]=a*l,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=f*o-g,t[6]=x+h*o,t[10]=a*c}else if(e.order==="ZXY"){const h=c*u,f=c*d,g=l*u,x=l*d;t[0]=h-x*o,t[4]=-a*d,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*u,t[9]=x-h*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const h=a*u,f=a*d,g=o*u,x=o*d;t[0]=c*u,t[4]=g*l-f,t[8]=h*l+x,t[1]=c*d,t[5]=x*l+h,t[9]=f*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const h=a*c,f=a*l,g=o*c,x=o*l;t[0]=c*u,t[4]=x-h*d,t[8]=g*d+f,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=f*d+g,t[10]=h-x*d}else if(e.order==="XZY"){const h=a*c,f=a*l,g=o*c,x=o*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=h*d+x,t[5]=a*u,t[9]=f*d-g,t[2]=g*d-f,t[6]=o*u,t[10]=x*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose($m,e,Zm)}lookAt(e,t,n){const r=this.elements;return an.subVectors(e,t),an.lengthSq()===0&&(an.z=1),an.normalize(),ii.crossVectors(n,an),ii.lengthSq()===0&&(Math.abs(n.z)===1?an.x+=1e-4:an.z+=1e-4,an.normalize(),ii.crossVectors(n,an)),ii.normalize(),Qr.crossVectors(an,ii),r[0]=ii.x,r[4]=Qr.x,r[8]=an.x,r[1]=ii.y,r[5]=Qr.y,r[9]=an.y,r[2]=ii.z,r[6]=Qr.z,r[10]=an.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],d=n[5],h=n[9],f=n[13],g=n[2],x=n[6],m=n[10],p=n[14],_=n[3],S=n[7],y=n[11],w=n[15],E=r[0],R=r[4],M=r[8],A=r[12],P=r[1],D=r[5],B=r[9],U=r[13],L=r[2],O=r[6],F=r[10],Y=r[14],j=r[3],X=r[7],te=r[11],N=r[15];return s[0]=a*E+o*P+c*L+l*j,s[4]=a*R+o*D+c*O+l*X,s[8]=a*M+o*B+c*F+l*te,s[12]=a*A+o*U+c*Y+l*N,s[1]=u*E+d*P+h*L+f*j,s[5]=u*R+d*D+h*O+f*X,s[9]=u*M+d*B+h*F+f*te,s[13]=u*A+d*U+h*Y+f*N,s[2]=g*E+x*P+m*L+p*j,s[6]=g*R+x*D+m*O+p*X,s[10]=g*M+x*B+m*F+p*te,s[14]=g*A+x*U+m*Y+p*N,s[3]=_*E+S*P+y*L+w*j,s[7]=_*R+S*D+y*O+w*X,s[11]=_*M+S*B+y*F+w*te,s[15]=_*A+S*U+y*Y+w*N,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],d=e[6],h=e[10],f=e[14],g=e[3],x=e[7],m=e[11],p=e[15],_=c*f-l*h,S=o*f-l*d,y=o*h-c*d,w=a*f-l*u,E=a*h-c*u,R=a*d-o*u;return t*(x*_-m*S+p*y)-n*(g*_-m*w+p*E)+r*(g*S-x*w+p*R)-s*(g*y-x*E+m*R)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[1],a=e[5],o=e[9],c=e[2],l=e[6],u=e[10];return t*(a*u-o*l)-n*(s*u-o*c)+r*(s*l-a*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],d=e[9],h=e[10],f=e[11],g=e[12],x=e[13],m=e[14],p=e[15],_=t*o-n*a,S=t*c-r*a,y=t*l-s*a,w=n*c-r*o,E=n*l-s*o,R=r*l-s*c,M=u*x-d*g,A=u*m-h*g,P=u*p-f*g,D=d*m-h*x,B=d*p-f*x,U=h*p-f*m,L=_*U-S*B+y*D+w*P-E*A+R*M;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const O=1/L;return e[0]=(o*U-c*B+l*D)*O,e[1]=(r*B-n*U-s*D)*O,e[2]=(x*R-m*E+p*w)*O,e[3]=(h*E-d*R-f*w)*O,e[4]=(c*P-a*U-l*A)*O,e[5]=(t*U-r*P+s*A)*O,e[6]=(m*y-g*R-p*S)*O,e[7]=(u*R-h*y+f*S)*O,e[8]=(a*B-o*P+l*M)*O,e[9]=(n*P-t*B-s*M)*O,e[10]=(g*E-x*y+p*_)*O,e[11]=(d*y-u*E-f*_)*O,e[12]=(o*A-a*D-c*M)*O,e[13]=(t*D-n*A+r*M)*O,e[14]=(x*S-g*w-m*_)*O,e[15]=(u*w-d*S+h*_)*O,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,c=e.z,l=s*a,u=s*o;return this.set(l*a+n,l*o-r*c,l*c+r*o,0,l*o+r*c,u*o+n,u*c-r*a,0,l*c-r*o,u*c+r*a,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,u=a+a,d=o+o,h=s*l,f=s*u,g=s*d,x=a*u,m=a*d,p=o*d,_=c*l,S=c*u,y=c*d,w=n.x,E=n.y,R=n.z;return r[0]=(1-(x+p))*w,r[1]=(f+y)*w,r[2]=(g-S)*w,r[3]=0,r[4]=(f-y)*E,r[5]=(1-(h+p))*E,r[6]=(m+_)*E,r[7]=0,r[8]=(g+S)*R,r[9]=(m-_)*R,r[10]=(1-(h+x))*R,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return n.set(1,1,1),t.identity(),this;let a=Hi.set(r[0],r[1],r[2]).length();const o=Hi.set(r[4],r[5],r[6]).length(),c=Hi.set(r[8],r[9],r[10]).length();s<0&&(a=-a),bn.copy(this);const l=1/a,u=1/o,d=1/c;return bn.elements[0]*=l,bn.elements[1]*=l,bn.elements[2]*=l,bn.elements[4]*=u,bn.elements[5]*=u,bn.elements[6]*=u,bn.elements[8]*=d,bn.elements[9]*=d,bn.elements[10]*=d,t.setFromRotationMatrix(bn),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,r,s,a,o=Fn,c=!1){const l=this.elements,u=2*s/(t-e),d=2*s/(n-r),h=(t+e)/(t-e),f=(n+r)/(n-r);let g,x;if(c)g=s/(a-s),x=a*s/(a-s);else if(o===Fn)g=-(a+s)/(a-s),x=-2*a*s/(a-s);else if(o===Ws)g=-a/(a-s),x=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=d,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=Fn,c=!1){const l=this.elements,u=2/(t-e),d=2/(n-r),h=-(t+e)/(t-e),f=-(n+r)/(n-r);let g,x;if(c)g=1/(a-s),x=a/(a-s);else if(o===Fn)g=-2/(a-s),x=-(a+s)/(a-s);else if(o===Ws)g=-1/(a-s),x=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=d,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Hi=new W,bn=new Ct,$m=new W(0,0,0),Zm=new W(1,1,1),ii=new W,Qr=new W,an=new W,rc=new Ct,sc=new vr;class Ni{constructor(e=0,t=0,n=0,r=Ni.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],u=r[9],d=r[2],h=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin(nt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-nt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(nt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-nt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(nt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-nt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,f),this._y=0);break;default:Be("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return rc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(rc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return sc.setFromEuler(this),this.setFromQuaternion(sc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ni.DEFAULT_ORDER="XYZ";class Gh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Jm=0;const ac=new W,Vi=new vr,Vn=new Ct,jr=new W,Ar=new W,Qm=new W,jm=new vr,oc=new W(1,0,0),lc=new W(0,1,0),cc=new W(0,0,1),hc={type:"added"},e0={type:"removed"},Wi={type:"childadded",child:null},Aa={type:"childremoved",child:null};class jt extends Oi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Jm++}),this.uuid=Xr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=jt.DEFAULT_UP.clone();const e=new W,t=new Ni,n=new vr,r=new W(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Ct},normalMatrix:{value:new We}}),this.matrix=new Ct,this.matrixWorld=new Ct,this.matrixAutoUpdate=jt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=jt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Gh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Vi.setFromAxisAngle(e,t),this.quaternion.multiply(Vi),this}rotateOnWorldAxis(e,t){return Vi.setFromAxisAngle(e,t),this.quaternion.premultiply(Vi),this}rotateX(e){return this.rotateOnAxis(oc,e)}rotateY(e){return this.rotateOnAxis(lc,e)}rotateZ(e){return this.rotateOnAxis(cc,e)}translateOnAxis(e,t){return ac.copy(e).applyQuaternion(this.quaternion),this.position.add(ac.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(oc,e)}translateY(e){return this.translateOnAxis(lc,e)}translateZ(e){return this.translateOnAxis(cc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Vn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?jr.copy(e):jr.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Ar.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Vn.lookAt(Ar,jr,this.up):Vn.lookAt(jr,Ar,this.up),this.quaternion.setFromRotationMatrix(Vn),r&&(Vn.extractRotation(r.matrixWorld),Vi.setFromRotationMatrix(Vn),this.quaternion.premultiply(Vi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(rt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(hc),Wi.child=e,this.dispatchEvent(Wi),Wi.child=null):rt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(e0),Aa.child=e,this.dispatchEvent(Aa),Aa.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Vn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Vn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Vn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(hc),Wi.child=e,this.dispatchEvent(Wi),Wi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ar,e,Qm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ar,jm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*r,s[13]+=n-s[1]*t-s[5]*n-s[9]*r,s[14]+=r-s[2]*t-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const d=c[l];s(e.shapes,d)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),d=a(e.shapes),h=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=r,n;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}jt.DEFAULT_UP=new W(0,1,0);jt.DEFAULT_MATRIX_AUTO_UPDATE=!0;jt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Fr extends jt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const t0={type:"move"};class Ca{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Fr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Fr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new W,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new W),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Fr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new W,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new W,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const x of e.hand.values()){const m=t.getJointPose(x,n),p=this._getHandJoint(l,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,g=.005;l.inputState.pinching&&h>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(t0)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Fr;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Hh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ri={h:0,s:0,l:0},es={h:0,s:0,l:0};function Ra(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Qe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=vn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,tt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=tt.workingColorSpace){return this.r=e,this.g=t,this.b=n,tt.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=tt.workingColorSpace){if(e=Hm(e,1),t=nt(t,0,1),n=nt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Ra(a,s,e+1/3),this.g=Ra(a,s,e),this.b=Ra(a,s,e-1/3)}return tt.colorSpaceToWorking(this,r),this}setStyle(e,t=vn){function n(s){s!==void 0&&parseFloat(s)<1&&Be("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Be("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Be("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=vn){const n=Hh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Be("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Jn(e.r),this.g=Jn(e.g),this.b=Jn(e.b),this}copyLinearToSRGB(e){return this.r=hr(e.r),this.g=hr(e.g),this.b=hr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=vn){return tt.workingToColorSpace(Kt.copy(this),e),Math.round(nt(Kt.r*255,0,255))*65536+Math.round(nt(Kt.g*255,0,255))*256+Math.round(nt(Kt.b*255,0,255))}getHexString(e=vn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=tt.workingColorSpace){tt.workingToColorSpace(Kt.copy(this),t);const n=Kt.r,r=Kt.g,s=Kt.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const d=a-o;switch(l=u<=.5?d/(a+o):d/(2-a-o),a){case n:c=(r-s)/d+(r<s?6:0);break;case r:c=(s-n)/d+2;break;case s:c=(n-r)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=tt.workingColorSpace){return tt.workingToColorSpace(Kt.copy(this),t),e.r=Kt.r,e.g=Kt.g,e.b=Kt.b,e}getStyle(e=vn){tt.workingToColorSpace(Kt.copy(this),e);const t=Kt.r,n=Kt.g,r=Kt.b;return e!==vn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(ri),this.setHSL(ri.h+e,ri.s+t,ri.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ri),e.getHSL(es);const n=ya(ri.h,es.h,t),r=ya(ri.s,es.s,t),s=ya(ri.l,es.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Kt=new Qe;Qe.NAMES=Hh;class uc extends jt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ni,this.environmentIntensity=1,this.environmentRotation=new Ni,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const wn=new W,Wn=new W,La=new W,Xn=new W,Xi=new W,Yi=new W,dc=new W,Pa=new W,Da=new W,Ia=new W,Ua=new ot,Na=new ot,Fa=new ot;class Cn{constructor(e=new W,t=new W,n=new W){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),wn.subVectors(e,t),r.cross(wn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){wn.subVectors(r,t),Wn.subVectors(n,t),La.subVectors(e,t);const a=wn.dot(wn),o=wn.dot(Wn),c=wn.dot(La),l=Wn.dot(Wn),u=Wn.dot(La),d=a*l-o*o;if(d===0)return s.set(0,0,0),null;const h=1/d,f=(l*c-o*u)*h,g=(a*u-o*c)*h;return s.set(1-f-g,g,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Xn)===null?!1:Xn.x>=0&&Xn.y>=0&&Xn.x+Xn.y<=1}static getInterpolation(e,t,n,r,s,a,o,c){return this.getBarycoord(e,t,n,r,Xn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Xn.x),c.addScaledVector(a,Xn.y),c.addScaledVector(o,Xn.z),c)}static getInterpolatedAttribute(e,t,n,r,s,a){return Ua.setScalar(0),Na.setScalar(0),Fa.setScalar(0),Ua.fromBufferAttribute(e,t),Na.fromBufferAttribute(e,n),Fa.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Ua,s.x),a.addScaledVector(Na,s.y),a.addScaledVector(Fa,s.z),a}static isFrontFacing(e,t,n,r){return wn.subVectors(n,t),Wn.subVectors(e,t),wn.cross(Wn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return wn.subVectors(this.c,this.b),Wn.subVectors(this.a,this.b),wn.cross(Wn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Cn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Cn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return Cn.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return Cn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Cn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let a,o;Xi.subVectors(r,n),Yi.subVectors(s,n),Pa.subVectors(e,n);const c=Xi.dot(Pa),l=Yi.dot(Pa);if(c<=0&&l<=0)return t.copy(n);Da.subVectors(e,r);const u=Xi.dot(Da),d=Yi.dot(Da);if(u>=0&&d<=u)return t.copy(r);const h=c*d-u*l;if(h<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(n).addScaledVector(Xi,a);Ia.subVectors(e,s);const f=Xi.dot(Ia),g=Yi.dot(Ia);if(g>=0&&f<=g)return t.copy(s);const x=f*l-c*g;if(x<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(n).addScaledVector(Yi,o);const m=u*g-f*d;if(m<=0&&d-u>=0&&f-g>=0)return dc.subVectors(s,r),o=(d-u)/(d-u+(f-g)),t.copy(r).addScaledVector(dc,o);const p=1/(m+x+h);return a=x*p,o=h*p,t.copy(n).addScaledVector(Xi,a).addScaledVector(Yi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class _r{constructor(e=new W(1/0,1/0,1/0),t=new W(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(En.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(En.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=En.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,En):En.fromBufferAttribute(s,a),En.applyMatrix4(e.matrixWorld),this.expandByPoint(En);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ts.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ts.copy(n.boundingBox)),ts.applyMatrix4(e.matrixWorld),this.union(ts)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,En),En.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Cr),ns.subVectors(this.max,Cr),qi.subVectors(e.a,Cr),Ki.subVectors(e.b,Cr),$i.subVectors(e.c,Cr),si.subVectors(Ki,qi),ai.subVectors($i,Ki),vi.subVectors(qi,$i);let t=[0,-si.z,si.y,0,-ai.z,ai.y,0,-vi.z,vi.y,si.z,0,-si.x,ai.z,0,-ai.x,vi.z,0,-vi.x,-si.y,si.x,0,-ai.y,ai.x,0,-vi.y,vi.x,0];return!Oa(t,qi,Ki,$i,ns)||(t=[1,0,0,0,1,0,0,0,1],!Oa(t,qi,Ki,$i,ns))?!1:(is.crossVectors(si,ai),t=[is.x,is.y,is.z],Oa(t,qi,Ki,$i,ns))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,En).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(En).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Yn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Yn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Yn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Yn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Yn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Yn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Yn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Yn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Yn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Yn=[new W,new W,new W,new W,new W,new W,new W,new W],En=new W,ts=new _r,qi=new W,Ki=new W,$i=new W,si=new W,ai=new W,vi=new W,Cr=new W,ns=new W,is=new W,_i=new W;function Oa(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){_i.fromArray(i,s);const o=r.x*Math.abs(_i.x)+r.y*Math.abs(_i.y)+r.z*Math.abs(_i.z),c=e.dot(_i),l=t.dot(_i),u=n.dot(_i);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const Ft=new W,rs=new Ge;let n0=0;class dn extends Oi{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:n0++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Om,this.updateRanges=[],this.gpuType=Nn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)rs.fromBufferAttribute(this,t),rs.applyMatrix3(e),this.setXY(t,rs.x,rs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix3(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix4(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyNormalMatrix(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.transformDirection(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Tr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=en(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Tr(t,this.array)),t}setX(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Tr(t,this.array)),t}setY(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Tr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Tr(t,this.array)),t}setW(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=en(t,this.array),n=en(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=en(t,this.array),n=en(n,this.array),r=en(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=en(t,this.array),n=en(n,this.array),r=en(r,this.array),s=en(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class Vh extends dn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Wh extends dn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class At extends dn{constructor(e,t,n){super(new Float32Array(e),t,n)}}const i0=new _r,Rr=new W,Ba=new W;class Yr{constructor(e=new W,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):i0.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Rr.subVectors(e,this.center);const t=Rr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Rr,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ba.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Rr.copy(e.center).add(Ba)),this.expandByPoint(Rr.copy(e.center).sub(Ba))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let r0=0;const xn=new Ct,za=new jt,Zi=new W,on=new _r,Lr=new _r,Ht=new W;class zt extends Oi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:r0++}),this.uuid=Xr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Bm(e)?Wh:Vh)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new We().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return xn.makeRotationFromQuaternion(e),this.applyMatrix4(xn),this}rotateX(e){return xn.makeRotationX(e),this.applyMatrix4(xn),this}rotateY(e){return xn.makeRotationY(e),this.applyMatrix4(xn),this}rotateZ(e){return xn.makeRotationZ(e),this.applyMatrix4(xn),this}translate(e,t,n){return xn.makeTranslation(e,t,n),this.applyMatrix4(xn),this}scale(e,t,n){return xn.makeScale(e,t,n),this.applyMatrix4(xn),this}lookAt(e){return za.lookAt(e),za.updateMatrix(),this.applyMatrix4(za.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Zi).negate(),this.translate(Zi.x,Zi.y,Zi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new At(n,3))}else{const n=Math.min(e.length,t.count);for(let r=0;r<n;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Be("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new _r);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){rt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new W(-1/0,-1/0,-1/0),new W(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];on.setFromBufferAttribute(s),this.morphTargetsRelative?(Ht.addVectors(this.boundingBox.min,on.min),this.boundingBox.expandByPoint(Ht),Ht.addVectors(this.boundingBox.max,on.max),this.boundingBox.expandByPoint(Ht)):(this.boundingBox.expandByPoint(on.min),this.boundingBox.expandByPoint(on.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&rt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Yr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){rt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new W,1/0);return}if(e){const n=this.boundingSphere.center;if(on.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Lr.setFromBufferAttribute(o),this.morphTargetsRelative?(Ht.addVectors(on.min,Lr.min),on.expandByPoint(Ht),Ht.addVectors(on.max,Lr.max),on.expandByPoint(Ht)):(on.expandByPoint(Lr.min),on.expandByPoint(Lr.max))}on.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)Ht.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Ht));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)Ht.fromBufferAttribute(o,l),c&&(Zi.fromBufferAttribute(e,l),Ht.add(Zi)),r=Math.max(r,n.distanceToSquared(Ht))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&rt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){rt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new dn(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],c=[];for(let M=0;M<n.count;M++)o[M]=new W,c[M]=new W;const l=new W,u=new W,d=new W,h=new Ge,f=new Ge,g=new Ge,x=new W,m=new W;function p(M,A,P){l.fromBufferAttribute(n,M),u.fromBufferAttribute(n,A),d.fromBufferAttribute(n,P),h.fromBufferAttribute(s,M),f.fromBufferAttribute(s,A),g.fromBufferAttribute(s,P),u.sub(l),d.sub(l),f.sub(h),g.sub(h);const D=1/(f.x*g.y-g.x*f.y);isFinite(D)&&(x.copy(u).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(D),m.copy(d).multiplyScalar(f.x).addScaledVector(u,-g.x).multiplyScalar(D),o[M].add(x),o[A].add(x),o[P].add(x),c[M].add(m),c[A].add(m),c[P].add(m))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let M=0,A=_.length;M<A;++M){const P=_[M],D=P.start,B=P.count;for(let U=D,L=D+B;U<L;U+=3)p(e.getX(U+0),e.getX(U+1),e.getX(U+2))}const S=new W,y=new W,w=new W,E=new W;function R(M){w.fromBufferAttribute(r,M),E.copy(w);const A=o[M];S.copy(A),S.sub(w.multiplyScalar(w.dot(A))).normalize(),y.crossVectors(E,A);const D=y.dot(c[M])<0?-1:1;a.setXYZW(M,S.x,S.y,S.z,D)}for(let M=0,A=_.length;M<A;++M){const P=_[M],D=P.start,B=P.count;for(let U=D,L=D+B;U<L;U+=3)R(e.getX(U+0)),R(e.getX(U+1)),R(e.getX(U+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new dn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,f=n.count;h<f;h++)n.setXYZ(h,0,0,0);const r=new W,s=new W,a=new W,o=new W,c=new W,l=new W,u=new W,d=new W;if(e)for(let h=0,f=e.count;h<f;h+=3){const g=e.getX(h+0),x=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,x),a.fromBufferAttribute(t,m),u.subVectors(a,s),d.subVectors(r,s),u.cross(d),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,m),o.add(u),c.add(u),l.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let h=0,f=t.count;h<f;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,s),d.subVectors(r,s),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ht.fromBufferAttribute(e,t),Ht.normalize(),e.setXYZ(t,Ht.x,Ht.y,Ht.z)}toNonIndexed(){function e(o,c){const l=o.array,u=o.itemSize,d=o.normalized,h=new l.constructor(c.length*u);let f=0,g=0;for(let x=0,m=c.length;x<m;x++){o.isInterleavedBufferAttribute?f=c[x]*o.data.stride+o.offset:f=c[x]*u;for(let p=0;p<u;p++)h[g++]=l[f++]}return new dn(h,u,d)}if(this.index===null)return Be("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new zt,n=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=e(c,n);t.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let u=0,d=l.length;u<d;u++){const h=l[u],f=e(h,n);c.push(f)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let d=0,h=l.length;d<h;d++){const f=l[d];u.push(f.toJSON(e.data))}u.length>0&&(r[c]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const r=e.attributes;for(const l in r){const u=r[l];this.setAttribute(l,u.clone(t))}const s=e.morphAttributes;for(const l in s){const u=[],d=s[l];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,u=a.length;l<u;l++){const d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ka=new W,s0=new W,a0=new We;class ci{constructor(e=new W(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=ka.subVectors(n,t).cross(s0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const r=e.delta(ka),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||a0.getNormalMatrix(e),r=this.coplanarPoint(ka).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let o0=0;class Mr extends Oi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:o0++}),this.uuid=Xr(),this.name="",this.type="Material",this.blending=or,this.side=Di,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=cl,this.blendDst=hl,this.blendEquation=nr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Qe(0,0,0),this.blendAlpha=0,this.depthFunc=kr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Lm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ma,this.stencilZFail=Ma,this.stencilZPass=Ma,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Be(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Be(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Qe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new ci().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Ge().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ge().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const qn=new W,Ga=new W,ss=new W,as=new W;class Ml{constructor(e=new W,t=new W(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,qn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=qn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(qn.copy(this.origin).addScaledVector(this.direction,t),qn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Ga.copy(e).add(t).multiplyScalar(.5),ss.copy(t).sub(e).normalize(),as.copy(this.origin).sub(Ga);const s=e.distanceTo(t)*.5,a=-this.direction.dot(ss),o=as.dot(this.direction),c=-as.dot(ss),l=as.lengthSq(),u=Math.abs(1-a*a);let d,h,f,g;if(u>0)if(d=a*c-o,h=a*o-c,g=s*u,d>=0)if(h>=-g)if(h<=g){const x=1/u;d*=x,h*=x,f=d*(d+a*h+2*o)+h*(a*d+h+2*c)+l}else h=s,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*c)+l;else h=-s,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*c)+l;else h<=-g?(d=Math.max(0,-(-a*s+o)),h=d>0?-s:Math.min(Math.max(-s,-c),s),f=-d*d+h*(h+2*c)+l):h<=g?(d=0,h=Math.min(Math.max(-s,-c),s),f=h*(h+2*c)+l):(d=Math.max(0,-(a*s+o)),h=d>0?s:Math.min(Math.max(-s,-c),s),f=-d*d+h*(h+2*c)+l);else h=a>0?-s:s,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Ga).addScaledVector(ss,h),f}intersectSphere(e,t){if(e.radius<0)return null;qn.subVectors(e.center,this.origin);const n=qn.dot(this.direction),r=qn.dot(qn)-n*n,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return l>=0?(n=(e.min.x-h.x)*l,r=(e.max.x-h.x)*l):(n=(e.max.x-h.x)*l,r=(e.min.x-h.x)*l),u>=0?(s=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),d>=0?(o=(e.min.z-h.z)*d,c=(e.max.z-h.z)*d):(o=(e.max.z-h.z)*d,c=(e.min.z-h.z)*d),n>c||o>r)||((o>n||n!==n)&&(n=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,qn)!==null}intersectTriangle(e,t,n,r,s){const a=this.origin,o=this.direction,c=o.x,l=o.y,u=o.z,d=e.x-a.x,h=e.y-a.y,f=e.z-a.z,g=t.x-a.x,x=t.y-a.y,m=t.z-a.z,p=n.x-a.x,_=n.y-a.y,S=n.z-a.z,y=Math.abs(c),w=Math.abs(l),E=Math.abs(u);let R,M,A,P,D,B,U,L,O,F,Y,j;if(y>=w&&y>=E?(A=c,B=d,O=g,j=p,c>=0?(R=l,M=u,P=h,D=f,U=x,L=m,F=_,Y=S):(R=u,M=l,P=f,D=h,U=m,L=x,F=S,Y=_)):w>=E?(A=l,B=h,O=x,j=_,l>=0?(R=u,M=c,P=f,D=d,U=m,L=g,F=S,Y=p):(R=c,M=u,P=d,D=f,U=g,L=m,F=p,Y=S)):(A=u,B=f,O=m,j=S,u>=0?(R=c,M=l,P=d,D=h,U=g,L=x,F=p,Y=_):(R=l,M=c,P=h,D=d,U=x,L=g,F=_,Y=p)),A===0)return null;const X=R/A,te=M/A,N=1/A,ne=P-X*B,oe=D-te*B,Se=U-X*O,Ue=L-te*O,He=F-X*j,I=Y-te*j,K=He*Ue-I*Se,se=ne*I-oe*He,ve=Se*oe-Ue*ne;if(r){if(K<0||se<0||ve<0)return null}else if((K<0||se<0||ve<0)&&(K>0||se>0||ve>0))return null;const ce=K+se+ve;if(ce===0)return null;const Te=N*(K*B+se*O+ve*j);return(ce>0?Te<0:Te>0)?null:this.at(Te/ce,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Xh extends Mr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ni,this.combine=bh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const fc=new Ct,Mi=new Ml,os=new Yr,pc=new W,ls=new W,cs=new W,hs=new W,Ha=new W,us=new W,mc=new W,ds=new W;class Vt extends jt{constructor(e=new zt,t=new Xh){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){us.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const u=o[c],d=s[c];u!==0&&(Ha.fromBufferAttribute(d,e),a?us.addScaledVector(Ha,u):us.addScaledVector(Ha.sub(t),u))}t.add(us)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),os.copy(n.boundingSphere),os.applyMatrix4(s),Mi.copy(e.ray).recast(e.near),!(os.containsPoint(Mi.origin)===!1&&(Mi.intersectSphere(os,pc)===null||Mi.origin.distanceToSquared(pc)>(e.far-e.near)**2))&&(fc.copy(s).invert(),Mi.copy(e.ray).applyMatrix4(fc),!(n.boundingBox!==null&&Mi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Mi)))}_computeIntersections(e,t,n){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,h=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=h.length;g<x;g++){const m=h[g],p=a[m.materialIndex],_=Math.max(m.start,f.start),S=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let y=_,w=S;y<w;y+=3){const E=o.getX(y),R=o.getX(y+1),M=o.getX(y+2);r=fs(this,p,e,n,l,u,d,E,R,M),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,f.start),x=Math.min(o.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){const _=o.getX(m),S=o.getX(m+1),y=o.getX(m+2);r=fs(this,a,e,n,l,u,d,_,S,y),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,x=h.length;g<x;g++){const m=h[g],p=a[m.materialIndex],_=Math.max(m.start,f.start),S=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let y=_,w=S;y<w;y+=3){const E=y,R=y+1,M=y+2;r=fs(this,p,e,n,l,u,d,E,R,M),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,f.start),x=Math.min(c.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){const _=m,S=m+1,y=m+2;r=fs(this,a,e,n,l,u,d,_,S,y),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function l0(i,e,t,n,r,s,a,o){let c;if(e.side===nn?c=n.intersectTriangle(a,s,r,!0,o):c=n.intersectTriangle(r,s,a,e.side===Di,o),c===null)return null;ds.copy(o),ds.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(ds);return l<t.near||l>t.far?null:{distance:l,point:ds.clone(),object:i}}function fs(i,e,t,n,r,s,a,o,c,l){i.getVertexPosition(o,ls),i.getVertexPosition(c,cs),i.getVertexPosition(l,hs);const u=l0(i,e,t,n,ls,cs,hs,mc);if(u){const d=new W;Cn.getBarycoord(mc,ls,cs,hs,d),r&&(u.uv=Cn.getInterpolatedAttribute(r,o,c,l,d,new Ge)),s&&(u.uv1=Cn.getInterpolatedAttribute(s,o,c,l,d,new Ge)),a&&(u.normal=Cn.getInterpolatedAttribute(a,o,c,l,d,new W),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:c,c:l,normal:new W,materialIndex:0};Cn.getNormal(ls,cs,hs,h.normal),u.face=h,u.barycoord=d}return u}class rr extends Zt{constructor(e=null,t=1,n=1,r,s,a,o,c,l=Dt,u=Dt,d,h){super(null,a,o,c,l,u,r,s,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Sl extends dn{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Si=new Yr,c0=new Ge(.5,.5),ps=new W;class Ys{constructor(e=new ci,t=new ci,n=new ci,r=new ci,s=new ci,a=new ci){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Fn,n=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],u=s[4],d=s[5],h=s[6],f=s[7],g=s[8],x=s[9],m=s[10],p=s[11],_=s[12],S=s[13],y=s[14],w=s[15];if(r[0].setComponents(l-a,f-u,p-g,w-_).normalize(),r[1].setComponents(l+a,f+u,p+g,w+_).normalize(),r[2].setComponents(l+o,f+d,p+x,w+S).normalize(),r[3].setComponents(l-o,f-d,p-x,w-S).normalize(),n)r[4].setComponents(c,h,m,y).normalize(),r[5].setComponents(l-c,f-h,p-m,w-y).normalize();else if(r[4].setComponents(l-c,f-h,p-m,w-y).normalize(),t===Fn)r[5].setComponents(l+c,f+h,p+m,w+y).normalize();else if(t===Ws)r[5].setComponents(c,h,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Si.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Si.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Si)}intersectsSprite(e){Si.center.set(0,0,0);const t=c0.distanceTo(e.center);return Si.radius=.7071067811865476+t,Si.applyMatrix4(e.matrixWorld),this.intersectsSphere(Si)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(ps.x=r.normal.x>0?e.max.x:e.min.x,ps.y=r.normal.y>0?e.max.y:e.min.y,ps.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ps)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Yh extends Mr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Qe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const qs=new W,Ks=new W,gc=new Ct,Pr=new Ml,ms=new Yr,Va=new W,xc=new W;class h0 extends jt{constructor(e=new zt,t=new Yh){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)qs.fromBufferAttribute(t,r-1),Ks.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=qs.distanceTo(Ks);e.setAttribute("lineDistance",new At(n,1))}else Be("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ms.copy(n.boundingSphere),ms.applyMatrix4(r),ms.radius+=s,e.ray.intersectsSphere(ms)===!1)return;gc.copy(r).invert(),Pr.copy(e.ray).applyMatrix4(gc);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=n.index,h=n.attributes.position;if(u!==null){const f=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let x=f,m=g-1;x<m;x+=l){const p=u.getX(x),_=u.getX(x+1),S=gs(this,e,Pr,c,p,_,x);S&&t.push(S)}if(this.isLineLoop){const x=u.getX(g-1),m=u.getX(f),p=gs(this,e,Pr,c,x,m,g-1);p&&t.push(p)}}else{const f=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let x=f,m=g-1;x<m;x+=l){const p=gs(this,e,Pr,c,x,x+1,x);p&&t.push(p)}if(this.isLineLoop){const x=gs(this,e,Pr,c,g-1,f,g-1);x&&t.push(x)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function gs(i,e,t,n,r,s,a){const o=i.geometry.attributes.position;if(qs.fromBufferAttribute(o,r),Ks.fromBufferAttribute(o,s),t.distanceSqToSegment(qs,Ks,Va,xc)>n)return;Va.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Va);if(!(l<e.near||l>e.far))return{distance:l,point:xc.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const vc=new W,_c=new W;class yl extends h0{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)vc.fromBufferAttribute(t,r),_c.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+vc.distanceTo(_c);e.setAttribute("lineDistance",new At(n,1))}else Be("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class u0 extends Mr{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Qe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Mc=new Ct,Xo=new Ml,xs=new Yr,vs=new W;class $s extends jt{constructor(e=new zt,t=new u0){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),xs.copy(n.boundingSphere),xs.applyMatrix4(r),xs.radius+=s,e.ray.intersectsSphere(xs)===!1)return;Mc.copy(r).invert(),Xo.copy(e.ray).applyMatrix4(Mc);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,d=n.attributes.position;if(l!==null){const h=Math.max(0,a.start),f=Math.min(l.count,a.start+a.count);for(let g=h,x=f;g<x;g++){const m=l.getX(g);vs.fromBufferAttribute(d,m),Sc(vs,m,c,r,e,t,this)}}else{const h=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let g=h,x=f;g<x;g++)vs.fromBufferAttribute(d,g),Sc(vs,g,c,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Sc(i,e,t,n,r,s,a){const o=Xo.distanceSqToPoint(i);if(o<t){const c=new W;Xo.closestPointToPoint(i,c),c.applyMatrix4(n);const l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class qh extends Zt{constructor(e=[],t=Ii,n,r,s,a,o,c,l,u){super(e,t,n,r,s,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class d0 extends Zt{constructor(e,t,n,r,s,a,o,c,l){super(e,t,n,r,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class gr extends Zt{constructor(e,t,n=kn,r,s,a,o=Dt,c=Dt,l,u=Qn,d=1){if(u!==Qn&&u!==Ci)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:d};super(h,r,s,a,o,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new _l(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class f0 extends gr{constructor(e,t=kn,n=Ii,r,s,a=Dt,o=Dt,c,l=Qn){const u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,r,s,a,o,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Kh extends Zt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class qr extends zt{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],u=[],d=[];let h=0,f=0;g("z","y","x",-1,-1,n,t,e,a,s,0),g("z","y","x",1,-1,n,t,-e,a,s,1),g("x","z","y",1,1,e,n,t,r,a,2),g("x","z","y",1,-1,e,n,-t,r,a,3),g("x","y","z",1,-1,e,t,n,r,s,4),g("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(c),this.setAttribute("position",new At(l,3)),this.setAttribute("normal",new At(u,3)),this.setAttribute("uv",new At(d,2));function g(x,m,p,_,S,y,w,E,R,M,A){const P=y/R,D=w/M,B=y/2,U=w/2,L=E/2,O=R+1,F=M+1;let Y=0,j=0;const X=new W;for(let te=0;te<F;te++){const N=te*D-U;for(let ne=0;ne<O;ne++){const oe=ne*P-B;X[x]=oe*_,X[m]=N*S,X[p]=L,l.push(X.x,X.y,X.z),X[x]=0,X[m]=0,X[p]=E>0?1:-1,u.push(X.x,X.y,X.z),d.push(ne/R),d.push(1-te/M),Y+=1}}for(let te=0;te<M;te++)for(let N=0;N<R;N++){const ne=h+N+O*te,oe=h+N+O*(te+1),Se=h+(N+1)+O*(te+1),Ue=h+(N+1)+O*te;c.push(ne,oe,Ue),c.push(oe,Se,Ue),j+=6}o.addGroup(f,j,A),f+=j,h+=Y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class pn extends zt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(n),c=Math.floor(r),l=o+1,u=c+1,d=e/o,h=t/c,f=[],g=[],x=[],m=[];for(let p=0;p<u;p++){const _=p*h-a;for(let S=0;S<l;S++){const y=S*d-s;g.push(y,-_,0),x.push(0,0,1),m.push(S/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let _=0;_<o;_++){const S=_+l*p,y=_+l*(p+1),w=_+1+l*(p+1),E=_+1+l*p;f.push(S,y,E),f.push(y,w,E)}this.setIndex(f),this.setAttribute("position",new At(g,3)),this.setAttribute("normal",new At(x,3)),this.setAttribute("uv",new At(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new pn(e.width,e.height,e.widthSegments,e.heightSegments)}}function xr(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];if(yc(r))r.isRenderTargetTexture?(Be("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone();else if(Array.isArray(r))if(yc(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][n]=s}else e[t][n]=r.slice();else e[t][n]=r}}return e}function Qt(i){const e={};for(let t=0;t<i.length;t++){const n=xr(i[t]);for(const r in n)e[r]=n[r]}return e}function yc(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function p0(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function $h(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:tt.workingColorSpace}const m0={clone:xr,merge:Qt};var g0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,x0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class wt extends Mr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=g0,this.fragmentShader=x0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=xr(e.uniforms),this.uniformsGroups=p0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case"t":this.uniforms[n].value=t[r.value]||null;break;case"c":this.uniforms[n].value=new Qe().setHex(r.value);break;case"v2":this.uniforms[n].value=new Ge().fromArray(r.value);break;case"v3":this.uniforms[n].value=new W().fromArray(r.value);break;case"v4":this.uniforms[n].value=new ot().fromArray(r.value);break;case"m3":this.uniforms[n].value=new We().fromArray(r.value);break;case"m4":this.uniforms[n].value=new Ct().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class v0 extends wt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class _0 extends Mr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Cm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class M0 extends Mr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const _s=new W,Ms=new vr,Dn=new W;class Zh extends jt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ct,this.projectionMatrix=new Ct,this.projectionMatrixInverse=new Ct,this.coordinateSystem=Fn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(_s,Ms,Dn),Dn.x===1&&Dn.y===1&&Dn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(_s,Ms,Dn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(_s,Ms,Dn),Dn.x===1&&Dn.y===1&&Dn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(_s,Ms,Dn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const oi=new W,bc=new Ge,wc=new Ge;class ln extends Zh{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Wo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Sa*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Wo*2*Math.atan(Math.tan(Sa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){oi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(oi.x,oi.y).multiplyScalar(-e/oi.z),oi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(oi.x,oi.y).multiplyScalar(-e/oi.z)}getViewSize(e,t){return this.getViewBounds(e,bc,wc),t.subVectors(wc,bc)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Sa*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,t-=a.offsetY*n/l,r*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class bl extends Zh{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class wl extends zt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}const Ji=-90,Qi=1;class S0 extends jt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new ln(Ji,Qi,e,t);r.layers=this.layers,this.add(r);const s=new ln(Ji,Qi,e,t);s.layers=this.layers,this.add(s);const a=new ln(Ji,Qi,e,t);a.layers=this.layers,this.add(a);const o=new ln(Ji,Qi,e,t);o.layers=this.layers,this.add(o);const c=new ln(Ji,Qi,e,t);c.layers=this.layers,this.add(c);const l=new ln(Ji,Qi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,c]=t;for(const l of t)this.remove(l);if(e===Fn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ws)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,h,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class y0 extends ln{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Jh{static{Jh.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=r,this}}function Ec(i,e,t,n){const r=b0(n);switch(t){case Fh:return i*e;case Bh:return i*e/r.components*r.byteLength;case pl:return i*e/r.components*r.byteLength;case Ui:return i*e*2/r.components*r.byteLength;case ml:return i*e*2/r.components*r.byteLength;case Oh:return i*e*3/r.components*r.byteLength;case hn:return i*e*4/r.components*r.byteLength;case gl:return i*e*4/r.components*r.byteLength;case Ds:case Is:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Us:case Ns:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case mo:case xo:return Math.max(i,16)*Math.max(e,8)/4;case po:case go:return Math.max(i,8)*Math.max(e,8)/2;case vo:case _o:case So:case yo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Mo:case Gs:case bo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case wo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Eo:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case To:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Ao:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Co:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Ro:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Lo:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Po:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Do:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Io:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Uo:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case No:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Fo:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Oo:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Bo:case zo:case ko:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Go:case Ho:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Hs:case Vo:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function b0(i){switch(i){case cn:case Dh:return{byteLength:1,components:1};case Gr:case Ih:case Gn:return{byteLength:2,components:1};case dl:case fl:return{byteLength:2,components:4};case kn:case ul:case Nn:return{byteLength:4,components:1};case Uh:case Nh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:al}}));typeof window<"u"&&(window.__THREE__?Be("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=al);function Qh(){let i=null,e=!1,t=null,n=null;function r(s,a){n=i.requestAnimationFrame(r),t(s,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function w0(i){const e=new WeakMap;function t(o,c){const l=o.array,u=o.usage,d=l.byteLength,h=i.createBuffer();i.bindBuffer(c,h),i.bufferData(c,l,u),o.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,c,l){const u=c.array,d=c.updateRanges;if(i.bindBuffer(l,o),d.length===0)i.bufferSubData(l,0,u);else{d.sort((f,g)=>f.start-g.start);let h=0;for(let f=1;f<d.length;f++){const g=d[h],x=d[f];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++h,d[h]=x)}d.length=h+1;for(let f=0,g=d.length;f<g;f++){const x=d[f];i.bufferSubData(l,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:r,remove:s,update:a}}var E0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,T0=`#ifdef USE_ALPHAHASH
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
#endif`,A0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,C0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,R0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,L0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,P0=`#ifdef USE_AOMAP
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
#endif`,D0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,I0=`#ifdef USE_BATCHING
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
#endif`,U0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,N0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,F0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,O0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,B0=`#ifdef USE_IRIDESCENCE
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
#endif`,z0=`#ifdef USE_BUMPMAP
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
#endif`,k0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,G0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,H0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,V0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,W0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,X0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Y0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,q0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,K0=`#define PI 3.141592653589793
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
} // validated`,$0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Z0=`vec3 transformedNormal = objectNormal;
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
#endif`,J0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Q0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,j0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,eg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,tg="gl_FragColor = linearToOutputTexel( gl_FragColor );",ng=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ig=`#ifdef USE_ENVMAP
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
#endif`,rg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,sg=`#ifdef USE_ENVMAP
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
#endif`,ag=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,og=`#ifdef USE_ENVMAP
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
#endif`,lg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,cg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,hg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ug=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,dg=`#ifdef USE_GRADIENTMAP
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
}`,fg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,pg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,mg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,gg=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,xg=`#ifdef USE_ENVMAP
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
#endif`,vg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,_g=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Mg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Sg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,yg=`PhysicalMaterial material;
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
#endif`,bg=`uniform sampler2D dfgLUT;
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
}`,wg=`
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
#endif`,Eg=`#if defined( RE_IndirectDiffuse )
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
#endif`,Tg=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ag=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Cg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Rg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Lg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Pg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Dg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ig=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ug=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ng=`#if defined( USE_POINTS_UV )
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
#endif`,Fg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Og=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Bg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,zg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,kg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Gg=`#ifdef USE_MORPHTARGETS
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
#endif`,Hg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Vg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Wg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Xg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Yg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,qg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Kg=`#ifdef USE_NORMALMAP
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
#endif`,$g=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Zg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Jg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Qg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,jg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ex=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,tx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,nx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ix=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,rx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,sx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ax=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ox=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,lx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,cx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,hx=`float getShadowMask() {
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
}`,ux=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,dx=`#ifdef USE_SKINNING
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
#endif`,fx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,px=`#ifdef USE_SKINNING
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
#endif`,mx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,gx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,xx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,vx=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,_x=`#ifdef USE_TRANSMISSION
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
#endif`,Mx=`#ifdef USE_TRANSMISSION
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
#endif`,Sx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,yx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,bx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,wx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ex=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Tx=`uniform sampler2D t2D;
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
}`,Ax=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Cx=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Rx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Lx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Px=`#include <common>
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
}`,Dx=`#if DEPTH_PACKING == 3200
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
}`,Ix=`#define DISTANCE
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
}`,Ux=`#define DISTANCE
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
}`,Nx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Fx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ox=`uniform float scale;
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
}`,Bx=`uniform vec3 diffuse;
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
}`,zx=`#include <common>
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
}`,kx=`uniform vec3 diffuse;
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
}`,Gx=`#define LAMBERT
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
}`,Hx=`#define LAMBERT
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
}`,Vx=`#define MATCAP
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
}`,Wx=`#define MATCAP
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
}`,Xx=`#define NORMAL
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
}`,Yx=`#define NORMAL
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
}`,qx=`#define PHONG
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
}`,Kx=`#define PHONG
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
}`,$x=`#define STANDARD
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
}`,Zx=`#define STANDARD
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
}`,Jx=`#define TOON
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
}`,Qx=`#define TOON
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
}`,jx=`uniform float size;
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
}`,ev=`uniform vec3 diffuse;
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
}`,tv=`#include <common>
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
}`,nv=`uniform vec3 color;
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
}`,iv=`uniform float rotation;
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
}`,rv=`uniform vec3 diffuse;
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
}`,Ze={alphahash_fragment:E0,alphahash_pars_fragment:T0,alphamap_fragment:A0,alphamap_pars_fragment:C0,alphatest_fragment:R0,alphatest_pars_fragment:L0,aomap_fragment:P0,aomap_pars_fragment:D0,batching_pars_vertex:I0,batching_vertex:U0,begin_vertex:N0,beginnormal_vertex:F0,bsdfs:O0,iridescence_fragment:B0,bumpmap_pars_fragment:z0,clipping_planes_fragment:k0,clipping_planes_pars_fragment:G0,clipping_planes_pars_vertex:H0,clipping_planes_vertex:V0,color_fragment:W0,color_pars_fragment:X0,color_pars_vertex:Y0,color_vertex:q0,common:K0,cube_uv_reflection_fragment:$0,defaultnormal_vertex:Z0,displacementmap_pars_vertex:J0,displacementmap_vertex:Q0,emissivemap_fragment:j0,emissivemap_pars_fragment:eg,colorspace_fragment:tg,colorspace_pars_fragment:ng,envmap_fragment:ig,envmap_common_pars_fragment:rg,envmap_pars_fragment:sg,envmap_pars_vertex:ag,envmap_physical_pars_fragment:xg,envmap_vertex:og,fog_vertex:lg,fog_pars_vertex:cg,fog_fragment:hg,fog_pars_fragment:ug,gradientmap_pars_fragment:dg,lightmap_pars_fragment:fg,lights_lambert_fragment:pg,lights_lambert_pars_fragment:mg,lights_pars_begin:gg,lights_toon_fragment:vg,lights_toon_pars_fragment:_g,lights_phong_fragment:Mg,lights_phong_pars_fragment:Sg,lights_physical_fragment:yg,lights_physical_pars_fragment:bg,lights_fragment_begin:wg,lights_fragment_maps:Eg,lights_fragment_end:Tg,lightprobes_pars_fragment:Ag,logdepthbuf_fragment:Cg,logdepthbuf_pars_fragment:Rg,logdepthbuf_pars_vertex:Lg,logdepthbuf_vertex:Pg,map_fragment:Dg,map_pars_fragment:Ig,map_particle_fragment:Ug,map_particle_pars_fragment:Ng,metalnessmap_fragment:Fg,metalnessmap_pars_fragment:Og,morphinstance_vertex:Bg,morphcolor_vertex:zg,morphnormal_vertex:kg,morphtarget_pars_vertex:Gg,morphtarget_vertex:Hg,normal_fragment_begin:Vg,normal_fragment_maps:Wg,normal_pars_fragment:Xg,normal_pars_vertex:Yg,normal_vertex:qg,normalmap_pars_fragment:Kg,clearcoat_normal_fragment_begin:$g,clearcoat_normal_fragment_maps:Zg,clearcoat_pars_fragment:Jg,iridescence_pars_fragment:Qg,opaque_fragment:jg,packing:ex,premultiplied_alpha_fragment:tx,project_vertex:nx,dithering_fragment:ix,dithering_pars_fragment:rx,roughnessmap_fragment:sx,roughnessmap_pars_fragment:ax,shadowmap_pars_fragment:ox,shadowmap_pars_vertex:lx,shadowmap_vertex:cx,shadowmask_pars_fragment:hx,skinbase_vertex:ux,skinning_pars_vertex:dx,skinning_vertex:fx,skinnormal_vertex:px,specularmap_fragment:mx,specularmap_pars_fragment:gx,tonemapping_fragment:xx,tonemapping_pars_fragment:vx,transmission_fragment:_x,transmission_pars_fragment:Mx,uv_pars_fragment:Sx,uv_pars_vertex:yx,uv_vertex:bx,worldpos_vertex:wx,background_vert:Ex,background_frag:Tx,backgroundCube_vert:Ax,backgroundCube_frag:Cx,cube_vert:Rx,cube_frag:Lx,depth_vert:Px,depth_frag:Dx,distance_vert:Ix,distance_frag:Ux,equirect_vert:Nx,equirect_frag:Fx,linedashed_vert:Ox,linedashed_frag:Bx,meshbasic_vert:zx,meshbasic_frag:kx,meshlambert_vert:Gx,meshlambert_frag:Hx,meshmatcap_vert:Vx,meshmatcap_frag:Wx,meshnormal_vert:Xx,meshnormal_frag:Yx,meshphong_vert:qx,meshphong_frag:Kx,meshphysical_vert:$x,meshphysical_frag:Zx,meshtoon_vert:Jx,meshtoon_frag:Qx,points_vert:jx,points_frag:ev,shadow_vert:tv,shadow_frag:nv,sprite_vert:iv,sprite_frag:rv},ge={common:{diffuse:{value:new Qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new We}},envmap:{envMap:{value:null},envMapRotation:{value:new We},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new We}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new We}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new We},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new We},normalScale:{value:new Ge(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new We},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new We}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new We}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new We}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new W},probesMax:{value:new W},probesResolution:{value:new W}},points:{diffuse:{value:new Qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0},uvTransform:{value:new We}},sprite:{diffuse:{value:new Qe(16777215)},opacity:{value:1},center:{value:new Ge(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}}},Un={basic:{uniforms:Qt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.fog]),vertexShader:Ze.meshbasic_vert,fragmentShader:Ze.meshbasic_frag},lambert:{uniforms:Qt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new Qe(0)},envMapIntensity:{value:1}}]),vertexShader:Ze.meshlambert_vert,fragmentShader:Ze.meshlambert_frag},phong:{uniforms:Qt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new Qe(0)},specular:{value:new Qe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphong_vert,fragmentShader:Ze.meshphong_frag},standard:{uniforms:Qt([ge.common,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.roughnessmap,ge.metalnessmap,ge.fog,ge.lights,{emissive:{value:new Qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag},toon:{uniforms:Qt([ge.common,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.gradientmap,ge.fog,ge.lights,{emissive:{value:new Qe(0)}}]),vertexShader:Ze.meshtoon_vert,fragmentShader:Ze.meshtoon_frag},matcap:{uniforms:Qt([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,{matcap:{value:null}}]),vertexShader:Ze.meshmatcap_vert,fragmentShader:Ze.meshmatcap_frag},points:{uniforms:Qt([ge.points,ge.fog]),vertexShader:Ze.points_vert,fragmentShader:Ze.points_frag},dashed:{uniforms:Qt([ge.common,ge.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ze.linedashed_vert,fragmentShader:Ze.linedashed_frag},depth:{uniforms:Qt([ge.common,ge.displacementmap]),vertexShader:Ze.depth_vert,fragmentShader:Ze.depth_frag},normal:{uniforms:Qt([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,{opacity:{value:1}}]),vertexShader:Ze.meshnormal_vert,fragmentShader:Ze.meshnormal_frag},sprite:{uniforms:Qt([ge.sprite,ge.fog]),vertexShader:Ze.sprite_vert,fragmentShader:Ze.sprite_frag},background:{uniforms:{uvTransform:{value:new We},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ze.background_vert,fragmentShader:Ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new We}},vertexShader:Ze.backgroundCube_vert,fragmentShader:Ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ze.cube_vert,fragmentShader:Ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ze.equirect_vert,fragmentShader:Ze.equirect_frag},distance:{uniforms:Qt([ge.common,ge.displacementmap,{referencePosition:{value:new W},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ze.distance_vert,fragmentShader:Ze.distance_frag},shadow:{uniforms:Qt([ge.lights,ge.fog,{color:{value:new Qe(0)},opacity:{value:1}}]),vertexShader:Ze.shadow_vert,fragmentShader:Ze.shadow_frag}};Un.physical={uniforms:Qt([Un.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new We},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new We},clearcoatNormalScale:{value:new Ge(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new We},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new We},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new We},sheen:{value:0},sheenColor:{value:new Qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new We},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new We},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new We},transmissionSamplerSize:{value:new Ge},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new We},attenuationDistance:{value:0},attenuationColor:{value:new Qe(0)},specularColor:{value:new Qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new We},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new We},anisotropyVector:{value:new Ge},anisotropyMap:{value:null},anisotropyMapTransform:{value:new We}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag};const Ss={r:0,b:0,g:0},sv=new Ct,jh=new We;jh.set(-1,0,0,0,1,0,0,0,1);function av(i,e,t,n,r,s){const a=new Qe(0);let o=r===!0?0:1,c,l,u=null,d=0,h=null;function f(_){let S=_.isScene===!0?_.background:null;if(S&&S.isTexture){const y=_.backgroundBlurriness>0;S=e.get(S,y)}return S}function g(_){let S=!1;const y=f(_);y===null?m(a,o):y&&y.isColor&&(m(y,1),S=!0);const w=i.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,s):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(i.autoClear||S)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function x(_,S){const y=f(S);y&&(y.isCubeTexture||y.mapping===oa)?(l===void 0&&(l=new Vt(new qr(1,1,1),new wt({name:"BackgroundCubeMaterial",uniforms:xr(Un.backgroundCube.uniforms),vertexShader:Un.backgroundCube.vertexShader,fragmentShader:Un.backgroundCube.fragmentShader,side:nn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(w,E,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=y,l.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(sv.makeRotationFromEuler(S.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(jh),l.material.toneMapped=tt.getTransfer(y.colorSpace)!==mt,(u!==y||d!==y.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,u=y,d=y.version,h=i.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new Vt(new pn(2,2),new wt({name:"BackgroundMaterial",uniforms:xr(Un.background.uniforms),vertexShader:Un.background.vertexShader,fragmentShader:Un.background.fragmentShader,side:Di,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=tt.getTransfer(y.colorSpace)!==mt,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||d!==y.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,u=y,d=y.version,h=i.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null))}function m(_,S){_.getRGB(Ss,$h(i)),t.buffers.color.setClear(Ss.r,Ss.g,Ss.b,S,s)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(_,S=1){a.set(_),o=S,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(_){o=_,m(a,o)},render:g,addToRenderList:x,dispose:p}}function ov(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=h(null);let s=r,a=!1;function o(D,B,U,L,O){let F=!1;const Y=d(D,L,U,B);s!==Y&&(s=Y,l(s.object)),F=f(D,L,U,O),F&&g(D,L,U,O),O!==null&&e.update(O,i.ELEMENT_ARRAY_BUFFER),(F||a)&&(a=!1,y(D,B,U,L),O!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function c(){return i.createVertexArray()}function l(D){return i.bindVertexArray(D)}function u(D){return i.deleteVertexArray(D)}function d(D,B,U,L){const O=L.wireframe===!0;let F=n[B.id];F===void 0&&(F={},n[B.id]=F);const Y=D.isInstancedMesh===!0?D.id:0;let j=F[Y];j===void 0&&(j={},F[Y]=j);let X=j[U.id];X===void 0&&(X={},j[U.id]=X);let te=X[O];return te===void 0&&(te=h(c()),X[O]=te),te}function h(D){const B=[],U=[],L=[];for(let O=0;O<t;O++)B[O]=0,U[O]=0,L[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:U,attributeDivisors:L,object:D,attributes:{},index:null}}function f(D,B,U,L){const O=s.attributes,F=B.attributes;let Y=0;const j=U.getAttributes();for(const X in j)if(j[X].location>=0){const N=O[X];let ne=F[X];if(ne===void 0&&(X==="instanceMatrix"&&D.instanceMatrix&&(ne=D.instanceMatrix),X==="instanceColor"&&D.instanceColor&&(ne=D.instanceColor)),N===void 0||N.attribute!==ne||ne&&N.data!==ne.data)return!0;Y++}return s.attributesNum!==Y||s.index!==L}function g(D,B,U,L){const O={},F=B.attributes;let Y=0;const j=U.getAttributes();for(const X in j)if(j[X].location>=0){let N=F[X];N===void 0&&(X==="instanceMatrix"&&D.instanceMatrix&&(N=D.instanceMatrix),X==="instanceColor"&&D.instanceColor&&(N=D.instanceColor));const ne={};ne.attribute=N,N&&N.data&&(ne.data=N.data),O[X]=ne,Y++}s.attributes=O,s.attributesNum=Y,s.index=L}function x(){const D=s.newAttributes;for(let B=0,U=D.length;B<U;B++)D[B]=0}function m(D){p(D,0)}function p(D,B){const U=s.newAttributes,L=s.enabledAttributes,O=s.attributeDivisors;U[D]=1,L[D]===0&&(i.enableVertexAttribArray(D),L[D]=1),O[D]!==B&&(i.vertexAttribDivisor(D,B),O[D]=B)}function _(){const D=s.newAttributes,B=s.enabledAttributes;for(let U=0,L=B.length;U<L;U++)B[U]!==D[U]&&(i.disableVertexAttribArray(U),B[U]=0)}function S(D,B,U,L,O,F,Y){Y===!0?i.vertexAttribIPointer(D,B,U,O,F):i.vertexAttribPointer(D,B,U,L,O,F)}function y(D,B,U,L){x();const O=L.attributes,F=U.getAttributes(),Y=B.defaultAttributeValues;for(const j in F){const X=F[j];if(X.location>=0){let te=O[j];if(te===void 0&&(j==="instanceMatrix"&&D.instanceMatrix&&(te=D.instanceMatrix),j==="instanceColor"&&D.instanceColor&&(te=D.instanceColor)),te!==void 0){const N=te.normalized,ne=te.itemSize,oe=e.get(te);if(oe===void 0)continue;const Se=oe.buffer,Ue=oe.type,He=oe.bytesPerElement,I=Ue===i.INT||Ue===i.UNSIGNED_INT||te.gpuType===ul;if(te.isInterleavedBufferAttribute){const K=te.data,se=K.stride,ve=te.offset;if(K.isInstancedInterleavedBuffer){for(let ce=0;ce<X.locationSize;ce++)p(X.location+ce,K.meshPerAttribute);D.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let ce=0;ce<X.locationSize;ce++)m(X.location+ce);i.bindBuffer(i.ARRAY_BUFFER,Se);for(let ce=0;ce<X.locationSize;ce++)S(X.location+ce,ne/X.locationSize,Ue,N,se*He,(ve+ne/X.locationSize*ce)*He,I)}else{if(te.isInstancedBufferAttribute){for(let K=0;K<X.locationSize;K++)p(X.location+K,te.meshPerAttribute);D.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let K=0;K<X.locationSize;K++)m(X.location+K);i.bindBuffer(i.ARRAY_BUFFER,Se);for(let K=0;K<X.locationSize;K++)S(X.location+K,ne/X.locationSize,Ue,N,ne*He,ne/X.locationSize*K*He,I)}}else if(Y!==void 0){const N=Y[j];if(N!==void 0)switch(N.length){case 2:i.vertexAttrib2fv(X.location,N);break;case 3:i.vertexAttrib3fv(X.location,N);break;case 4:i.vertexAttrib4fv(X.location,N);break;default:i.vertexAttrib1fv(X.location,N)}}}}_()}function w(){A();for(const D in n){const B=n[D];for(const U in B){const L=B[U];for(const O in L){const F=L[O];for(const Y in F)u(F[Y].object),delete F[Y];delete L[O]}}delete n[D]}}function E(D){if(n[D.id]===void 0)return;const B=n[D.id];for(const U in B){const L=B[U];for(const O in L){const F=L[O];for(const Y in F)u(F[Y].object),delete F[Y];delete L[O]}}delete n[D.id]}function R(D){for(const B in n){const U=n[B];for(const L in U){const O=U[L];if(O[D.id]===void 0)continue;const F=O[D.id];for(const Y in F)u(F[Y].object),delete F[Y];delete O[D.id]}}}function M(D){for(const B in n){const U=n[B],L=D.isInstancedMesh===!0?D.id:0,O=U[L];if(O!==void 0){for(const F in O){const Y=O[F];for(const j in Y)u(Y[j].object),delete Y[j];delete O[F]}delete U[L],Object.keys(U).length===0&&delete n[B]}}}function A(){P(),a=!0,s!==r&&(s=r,l(s.object))}function P(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:A,resetDefaultState:P,dispose:w,releaseStatesOfGeometry:E,releaseStatesOfObject:M,releaseStatesOfProgram:R,initAttributes:x,enableAttribute:m,disableUnusedAttributes:_}}function lv(i,e,t){let n;function r(c){n=c}function s(c,l){i.drawArrays(n,c,l),t.update(l,n,1)}function a(c,l,u){u!==0&&(i.drawArraysInstanced(n,c,l,u),t.update(l,n,u))}function o(c,l,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,u);let h=0;for(let f=0;f<u;f++)h+=l[f];t.update(h,n,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function cv(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(R){return!(R!==hn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const M=R===Gn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==cn&&R!==Nn&&!M&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(Be("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const d=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&Be("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),_=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=i.getParameter(i.MAX_SAMPLES),E=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:f,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:_,maxVaryings:S,maxFragmentUniforms:y,maxSamples:w,samples:E}}function hv(i){const e=this;let t=null,n=0,r=!1,s=!1;const a=new ci,o=new We,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const f=d.length!==0||h||n!==0||r;return r=h,n=d.length,f},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,f){const g=d.clippingPlanes,x=d.clipIntersection,m=d.clipShadows,p=i.get(d);if(!r||g===null||g.length===0||s&&!m)s?u(null):l();else{const _=s?0:n,S=_*4;let y=p.clippingState||null;c.value=y,y=u(g,h,S,f);for(let w=0;w!==S;++w)y[w]=t[w];p.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=_}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,h,f,g){const x=d!==null?d.length:0;let m=null;if(x!==0){if(m=c.value,g!==!0||m===null){const p=f+x*4,_=h.matrixWorldInverse;o.getNormalMatrix(_),(m===null||m.length<p)&&(m=new Float32Array(p));for(let S=0,y=f;S!==x;++S,y+=4)a.copy(d[S]).applyMatrix4(_,o),a.normal.toArray(m,y),m[y+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}const sr=4,uv=6,dv=20,fv=256,Dr=new bl,Tc=new Qe;let Wa=null,Xa=0,Ya=0,qa=!1;const pv=new W,yi=new W;class Ac{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){const{size:a=256,position:o=pv}=s;Wa=this._renderer.getRenderTarget(),Xa=this._renderer.getActiveCubeFace(),Ya=this._renderer.getActiveMipmapLevel(),qa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,r,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Lc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Rc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Wa,Xa,Ya),this._renderer.xr.enabled=qa,e.scissorTest=!1,ji(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ii||e.mapping===mr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Wa=this._renderer.getRenderTarget(),Xa=this._renderer.getActiveCubeFace(),Ya=this._renderer.getActiveMipmapLevel(),qa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Lt,minFilter:Lt,generateMipmaps:!1,type:Gn,format:hn,colorSpace:Vr,depthBuffer:!1},r=Cc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Cc(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=mv(s)),this._blurMaterial=xv(s,e,t),this._ggxMaterial=gv(s,e,t)}return r}_compileMaterial(e){const t=new Vt(new zt,e);this._renderer.compile(t,Dr)}_sceneToCubeUV(e,t,n,r,s){const c=new ln(90,1,t,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,f=d.toneMapping;d.getClearColor(Tc),d.toneMapping=zn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Vt(new qr,new Xh({name:"PMREM.Background",side:nn,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,m=x.material;let p=!1;const _=e.background;_?_.isColor&&(m.color.copy(_),e.background=null,p=!0):(m.color.copy(Tc),p=!0);for(let S=0;S<6;S++){const y=S%3;y===0?(c.up.set(0,l[S],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+u[S],s.y,s.z)):y===1?(c.up.set(0,0,l[S]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+u[S],s.z)):(c.up.set(0,l[S],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+u[S]));const w=this._cubeSize;ji(r,y*w,S>2?w:0,w,w),d.setRenderTarget(r),p&&d.render(x,c),d.render(e,c)}d.toneMapping=f,d.autoClear=h,e.background=_}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===Ii||e.mapping===mr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Lc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Rc());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const c=this._cubeSize;ji(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,Dr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const c=a.uniforms,l=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(l*l-u*u),h=l*1.25,f=d*h,{_lodMax:g}=this,x=this._sizeLods[n],m=3*x*(n>g-sr?n-g+sr:0),p=4*(this._cubeSize-x);c.envMap.value=e.texture,c.roughness.value=f,c.mipInt.value=g-t,ji(s,m,p,3*x,2*x),r.setRenderTarget(s),r.render(o,Dr),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=g-n,ji(e,m,p,3*x,2*x),r.setRenderTarget(e),r.render(o,Dr)}_blur(e,t,n,r){const s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,n,a),this._blurPass(s,e,n,n,a)}_blurPass(e,t,n,r,s){const a=this._renderer,o=this._blurMaterial,c=this._lodMeshes[r];c.material=o;const l=o.uniforms;l.envMap.value=e.texture,l.sigma.value=s,l.mipInt.value=this._lodMax-n;const u=this._sizeLods[r],d=3*u*(r>this._lodMax-sr?r-this._lodMax+sr:0),h=4*(this._cubeSize-u);ji(t,d,h,3*u,2*u),a.setRenderTarget(t),a.render(c,Dr)}}function mv(i){const e=[],t=[];let n=i;const r=i-sr+1+uv;for(let s=0;s<r;s++){const a=Math.pow(2,n);e.push(a);const o=1/(a-2),c=-o,l=1+o,u=[c,c,l,c,l,l,c,c,l,l,c,l],d=6,h=6,f=3,g=new Float32Array(f*h*d),x=new Float32Array(f*h*d);for(let p=0;p<d;p++){const _=p%3*2/3-1,S=p>2?0:-1,y=[_,S,0,_+2/3,S,0,_+2/3,S+1,0,_,S,0,_+2/3,S+1,0,_,S+1,0];g.set(y,f*h*p);for(let w=0;w<h;w++){const E=u[w*2]*2-1,R=u[w*2+1]*2-1;p===0?yi.set(1,R,E):p===1?yi.set(-E,1,-R):p===2?yi.set(-E,R,1):p===3?yi.set(-1,R,-E):p===4?yi.set(-E,-1,R):yi.set(E,R,-1),yi.toArray(x,(p*h+w)*f)}}const m=new zt;m.setAttribute("position",new dn(g,f)),m.setAttribute("outputDirection",new dn(x,f)),t.push(new Vt(m,null)),n>sr&&n--}return{lodMeshes:t,sizeLods:e}}function Cc(i,e,t){const n=new Mn(i,e,t);return n.texture.mapping=oa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ji(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function gv(i,e,t){return new wt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:fv,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:la(),fragmentShader:`

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
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function xv(i,e,t){return new wt({name:"SphericalGaussianBlur",defines:{SAMPLES:dv,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:la(),fragmentShader:`

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
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function Rc(){return new wt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:la(),fragmentShader:`

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
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function Lc(){return new wt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:la(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function la(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class eu extends Mn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new qh(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new qr(5,5,5),s=new wt({name:"CubemapFromEquirect",uniforms:xr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:nn,blending:Bn});s.uniforms.tEquirect.value=t;const a=new Vt(r,s),o=t.minFilter;return t.minFilter===Ai&&(t.minFilter=Lt),new S0(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}}function vv(i){let e=new WeakMap,t=new WeakMap,n=null;function r(h,f=!1){return h==null?null:f?a(h):s(h)}function s(h){if(h&&h.isTexture){const f=h.mapping;if(f===xa||f===va)if(e.has(h)){const g=e.get(h).texture;return o(g,h.mapping)}else{const g=h.image;if(g&&g.height>0){const x=new eu(g.height);return x.fromEquirectangularTexture(i,h),e.set(h,x),h.addEventListener("dispose",l),o(x.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){const f=h.mapping,g=f===xa||f===va,x=f===Ii||f===mr;if(g||x){let m=t.get(h);const p=m!==void 0?m.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==p)return n===null&&(n=new Ac(i)),m=g?n.fromEquirectangular(h,m):n.fromCubemap(h,m),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),m.texture;if(m!==void 0)return m.texture;{const _=h.image;return g&&_&&_.height>0||x&&_&&c(_)?(n===null&&(n=new Ac(i)),m=g?n.fromEquirectangular(h):n.fromCubemap(h),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),h.addEventListener("dispose",u),m.texture):null}}}return h}function o(h,f){return f===xa?h.mapping=Ii:f===va&&(h.mapping=mr),h}function c(h){let f=0;const g=6;for(let x=0;x<g;x++)h[x]!==void 0&&f++;return f===g}function l(h){const f=h.target;f.removeEventListener("dispose",l);const g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function u(h){const f=h.target;f.removeEventListener("dispose",u);const g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:d}}function _v(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&cr("WebGLRenderer: "+n+" extension not supported."),r}}}function Mv(i,e,t,n){const r={},s=new WeakMap;function a(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",a),delete r[h.id];const f=s.get(h);f&&(e.remove(f),s.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(d,h){return r[h.id]===!0||(h.addEventListener("dispose",a),r[h.id]=!0,t.memory.geometries++),h}function c(d){const h=d.attributes;for(const f in h)e.update(h[f],i.ARRAY_BUFFER)}function l(d){const h=[],f=d.index,g=d.attributes.position;let x=0;if(g===void 0)return;if(f!==null){const _=f.array;x=f.version;for(let S=0,y=_.length;S<y;S+=3){const w=_[S+0],E=_[S+1],R=_[S+2];h.push(w,E,E,R,R,w)}}else{const _=g.array;x=g.version;for(let S=0,y=_.length/3-1;S<y;S+=3){const w=S+0,E=S+1,R=S+2;h.push(w,E,E,R,R,w)}}const m=new(g.count>=65535?Wh:Vh)(h,1);m.version=x;const p=s.get(d);p&&e.remove(p),s.set(d,m)}function u(d){const h=s.get(d);if(h){const f=d.index;f!==null&&h.version<f.version&&l(d)}else l(d);return s.get(d)}return{get:o,update:c,getWireframeAttribute:u}}function Sv(i,e,t){let n;function r(d){n=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function c(d,h){i.drawElements(n,h,s,d*a),t.update(h,n,1)}function l(d,h,f){f!==0&&(i.drawElementsInstanced(n,h,s,d*a,f),t.update(h,n,f))}function u(d,h,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,s,d,0,f);let x=0;for(let m=0;m<f;m++)x+=h[m];t.update(x,n,1)}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function yv(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:rt("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function bv(i,e,t){const n=new WeakMap,r=new ot;function s(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let h=n.get(o);if(h===void 0||h.count!==d){let A=function(){R.dispose(),n.delete(o),o.removeEventListener("dispose",A)};h!==void 0&&h.texture.dispose();const f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],_=o.morphAttributes.color||[];let S=0;f===!0&&(S=1),g===!0&&(S=2),x===!0&&(S=3);let y=o.attributes.position.count*S,w=1;y>e.maxTextureSize&&(w=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const E=new Float32Array(y*w*4*d),R=new kh(E,y,w,d);R.type=Nn,R.needsUpdate=!0;const M=S*4;for(let P=0;P<d;P++){const D=m[P],B=p[P],U=_[P],L=y*w*4*P;for(let O=0;O<D.count;O++){const F=O*M;f===!0&&(r.fromBufferAttribute(D,O),E[L+F+0]=r.x,E[L+F+1]=r.y,E[L+F+2]=r.z,E[L+F+3]=0),g===!0&&(r.fromBufferAttribute(B,O),E[L+F+4]=r.x,E[L+F+5]=r.y,E[L+F+6]=r.z,E[L+F+7]=0),x===!0&&(r.fromBufferAttribute(U,O),E[L+F+8]=r.x,E[L+F+9]=r.y,E[L+F+10]=r.z,E[L+F+11]=U.itemSize===4?r.w:1)}}h={count:d,texture:R,size:new Ge(y,w)},n.set(o,h),o.addEventListener("dispose",A)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let f=0;for(let x=0;x<l.length;x++)f+=l[x];const g=o.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:s}}function wv(i,e,t,n,r){let s=new WeakMap;function a(l){const u=r.render.frame,d=l.geometry,h=e.get(l,d);if(s.get(h)!==u&&(e.update(h),s.set(h,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),s.get(l)!==u&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,u))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==u&&(f.update(),s.set(f,u))}return h}function o(){s=new WeakMap}function c(l){const u=l.target;u.removeEventListener("dispose",c),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const Ev={[wh]:"LINEAR_TONE_MAPPING",[Eh]:"REINHARD_TONE_MAPPING",[Th]:"CINEON_TONE_MAPPING",[Ah]:"ACES_FILMIC_TONE_MAPPING",[Rh]:"AGX_TONE_MAPPING",[Lh]:"NEUTRAL_TONE_MAPPING",[Ch]:"CUSTOM_TONE_MAPPING"};function Tv(i,e,t,n,r,s){const a=new Mn(e,t,{type:i,depthBuffer:r,stencilBuffer:s,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,c=null;const l=new zt;l.setAttribute("position",new At([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new At([0,2,0,0,2,0],2));const u=new v0({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new Vt(l,u),h=new bl(-1,1,1,-1,0,1);let f=null,g=null,x=!1,m,p=null,_=[],S=!1;this.setSize=function(y,w){a.setSize(y,w),o!==null&&o.setSize(y,w),c!==null&&c.setSize(y,w);for(let E=0;E<_.length;E++){const R=_[E];R.setSize&&R.setSize(y,w)}},this.setEffects=function(y){_=y,S=_.length>0&&_[0].isRenderPass===!0;const w=a.width,E=a.height;_.length>0&&o===null&&(o=new Mn(w,E,{type:Gn,depthBuffer:!1,stencilBuffer:!1}),c=new Mn(w,E,{type:Gn,depthBuffer:!1,stencilBuffer:!1}));for(let R=0;R<_.length;R++){const M=_[R];M.setSize&&M.setSize(w,E)}},this.begin=function(y,w){if(x||y.toneMapping===zn&&_.length===0)return!1;if(p=w,w!==null){const E=w.width,R=w.height;(a.width!==E||a.height!==R)&&this.setSize(E,R)}return S===!1&&y.setRenderTarget(a),m=y.toneMapping,y.toneMapping=zn,!0},this.hasRenderPass=function(){return S},this.end=function(y,w){y.toneMapping=m,x=!0;let E=a,R=o;for(let M=0;M<_.length;M++){const A=_[M];A.enabled!==!1&&(A.render(y,R,E,w),A.needsSwap!==!1&&(E=R,R=R===o?c:o))}if(f!==y.outputColorSpace||g!==y.toneMapping){f=y.outputColorSpace,g=y.toneMapping,u.defines={},tt.getTransfer(f)===mt&&(u.defines.SRGB_TRANSFER="");const M=Ev[g];M&&(u.defines[M]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=E.texture,y.setRenderTarget(p),y.render(d,h),p=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}const tu=new Zt,Yo=new gr(1,1),nu=new kh,iu=new Km,ru=new qh,Pc=[],Dc=[],Ic=new Float32Array(16),Uc=new Float32Array(9),Nc=new Float32Array(4);function Sr(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=Pc[r];if(s===void 0&&(s=new Float32Array(r),Pc[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function kt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Gt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function ca(i,e){let t=Dc[e];t===void 0&&(t=new Int32Array(e),Dc[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Av(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Cv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2fv(this.addr,e),Gt(t,e)}}function Rv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(kt(t,e))return;i.uniform3fv(this.addr,e),Gt(t,e)}}function Lv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4fv(this.addr,e),Gt(t,e)}}function Pv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Gt(t,e)}else{if(kt(t,n))return;Nc.set(n),i.uniformMatrix2fv(this.addr,!1,Nc),Gt(t,n)}}function Dv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Gt(t,e)}else{if(kt(t,n))return;Uc.set(n),i.uniformMatrix3fv(this.addr,!1,Uc),Gt(t,n)}}function Iv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Gt(t,e)}else{if(kt(t,n))return;Ic.set(n),i.uniformMatrix4fv(this.addr,!1,Ic),Gt(t,n)}}function Uv(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Nv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2iv(this.addr,e),Gt(t,e)}}function Fv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;i.uniform3iv(this.addr,e),Gt(t,e)}}function Ov(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4iv(this.addr,e),Gt(t,e)}}function Bv(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function zv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2uiv(this.addr,e),Gt(t,e)}}function kv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;i.uniform3uiv(this.addr,e),Gt(t,e)}}function Gv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4uiv(this.addr,e),Gt(t,e)}}function Hv(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(Yo.compareFunction=t.isReversedDepthBuffer()?vl:xl,s=Yo):s=tu,t.setTexture2D(e||s,r)}function Vv(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||iu,r)}function Wv(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||ru,r)}function Xv(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||nu,r)}function Yv(i){switch(i){case 5126:return Av;case 35664:return Cv;case 35665:return Rv;case 35666:return Lv;case 35674:return Pv;case 35675:return Dv;case 35676:return Iv;case 5124:case 35670:return Uv;case 35667:case 35671:return Nv;case 35668:case 35672:return Fv;case 35669:case 35673:return Ov;case 5125:return Bv;case 36294:return zv;case 36295:return kv;case 36296:return Gv;case 35678:case 36198:case 36298:case 36306:case 35682:return Hv;case 35679:case 36299:case 36307:return Vv;case 35680:case 36300:case 36308:case 36293:return Wv;case 36289:case 36303:case 36311:case 36292:return Xv}}function qv(i,e){i.uniform1fv(this.addr,e)}function Kv(i,e){const t=Sr(e,this.size,2);i.uniform2fv(this.addr,t)}function $v(i,e){const t=Sr(e,this.size,3);i.uniform3fv(this.addr,t)}function Zv(i,e){const t=Sr(e,this.size,4);i.uniform4fv(this.addr,t)}function Jv(i,e){const t=Sr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Qv(i,e){const t=Sr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function jv(i,e){const t=Sr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function e1(i,e){i.uniform1iv(this.addr,e)}function t1(i,e){i.uniform2iv(this.addr,e)}function n1(i,e){i.uniform3iv(this.addr,e)}function i1(i,e){i.uniform4iv(this.addr,e)}function r1(i,e){i.uniform1uiv(this.addr,e)}function s1(i,e){i.uniform2uiv(this.addr,e)}function a1(i,e){i.uniform3uiv(this.addr,e)}function o1(i,e){i.uniform4uiv(this.addr,e)}function l1(i,e,t){const n=this.cache,r=e.length,s=ca(t,r);kt(n,s)||(i.uniform1iv(this.addr,s),Gt(n,s));let a;this.type===i.SAMPLER_2D_SHADOW?a=Yo:a=tu;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function c1(i,e,t){const n=this.cache,r=e.length,s=ca(t,r);kt(n,s)||(i.uniform1iv(this.addr,s),Gt(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||iu,s[a])}function h1(i,e,t){const n=this.cache,r=e.length,s=ca(t,r);kt(n,s)||(i.uniform1iv(this.addr,s),Gt(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||ru,s[a])}function u1(i,e,t){const n=this.cache,r=e.length,s=ca(t,r);kt(n,s)||(i.uniform1iv(this.addr,s),Gt(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||nu,s[a])}function d1(i){switch(i){case 5126:return qv;case 35664:return Kv;case 35665:return $v;case 35666:return Zv;case 35674:return Jv;case 35675:return Qv;case 35676:return jv;case 5124:case 35670:return e1;case 35667:case 35671:return t1;case 35668:case 35672:return n1;case 35669:case 35673:return i1;case 5125:return r1;case 36294:return s1;case 36295:return a1;case 36296:return o1;case 35678:case 36198:case 36298:case 36306:case 35682:return l1;case 35679:case 36299:case 36307:return c1;case 35680:case 36300:case 36308:case 36293:return h1;case 36289:case 36303:case 36311:case 36292:return u1}}class f1{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Yv(t.type)}}class p1{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=d1(t.type)}}class m1{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],n)}}}const Ka=/(\w+)(\])?(\[|\.)?/g;function Fc(i,e){i.seq.push(e),i.map[e.id]=e}function g1(i,e,t){const n=i.name,r=n.length;for(Ka.lastIndex=0;;){const s=Ka.exec(n),a=Ka.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===r){Fc(t,l===void 0?new f1(o,i,e):new p1(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new m1(o),Fc(t,d)),t=d}}}class Fs{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);g1(o,c,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&n.push(a)}return n}}function Oc(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const x1=37297;let v1=0;function _1(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Bc=new We;function M1(i){tt._getMatrix(Bc,tt.workingColorSpace,i);const e=`mat3( ${Bc.elements.map(t=>t.toFixed(4))} )`;switch(tt.getTransfer(i)){case Vs:return[e,"LinearTransferOETF"];case mt:return[e,"sRGBTransferOETF"];default:return Be("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function zc(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+_1(i.getShaderSource(e),o)}else return s}function S1(i,e){const t=M1(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const y1={[wh]:"Linear",[Eh]:"Reinhard",[Th]:"Cineon",[Ah]:"ACESFilmic",[Rh]:"AgX",[Lh]:"Neutral",[Ch]:"Custom"};function b1(i,e){const t=y1[e];return t===void 0?(Be("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ys=new W;function w1(){tt.getLuminanceCoefficients(ys);const i=ys.x.toFixed(4),e=ys.y.toFixed(4),t=ys.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function E1(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Or).join(`
`)}function T1(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function A1(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),a=s.name;let o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Or(i){return i!==""}function kc(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Gc(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const C1=/^[ \t]*#include +<([\w\d./]+)>/gm;function qo(i){return i.replace(C1,L1)}const R1=new Map;function L1(i,e){let t=Ze[e];if(t===void 0){const n=R1.get(e);if(n!==void 0)t=Ze[n],Be('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return qo(t)}const P1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Hc(i){return i.replace(P1,D1)}function D1(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Vc(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}const I1={[Ps]:"SHADOWMAP_TYPE_PCF",[Nr]:"SHADOWMAP_TYPE_VSM"};function U1(i){return I1[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const N1={[Ii]:"ENVMAP_TYPE_CUBE",[mr]:"ENVMAP_TYPE_CUBE",[oa]:"ENVMAP_TYPE_CUBE_UV"};function F1(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":N1[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const O1={[mr]:"ENVMAP_MODE_REFRACTION"};function B1(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":O1[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const z1={[bh]:"ENVMAP_BLENDING_MULTIPLY",[Em]:"ENVMAP_BLENDING_MIX",[Tm]:"ENVMAP_BLENDING_ADD"};function k1(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":z1[i.combine]||"ENVMAP_BLENDING_NONE"}function G1(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function H1(i,e,t,n){const r=i.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=U1(t),l=F1(t),u=B1(t),d=k1(t),h=G1(t),f=E1(t),g=T1(s),x=r.createProgram();let m,p,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Or).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Or).join(`
`),p.length>0&&(p+=`
`)):(m=[Vc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Or).join(`
`),p=[Vc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==zn?"#define TONE_MAPPING":"",t.toneMapping!==zn?Ze.tonemapping_pars_fragment:"",t.toneMapping!==zn?b1("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ze.colorspace_pars_fragment,S1("linearToOutputTexel",t.outputColorSpace),w1(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Or).join(`
`)),a=qo(a),a=kc(a,t),a=Gc(a,t),o=qo(o),o=kc(o,t),o=Gc(o,t),a=Hc(a),o=Hc(o),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Ql?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ql?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const S=_+m+a,y=_+p+o,w=Oc(r,r.VERTEX_SHADER,S),E=Oc(r,r.FRAGMENT_SHADER,y);r.attachShader(x,w),r.attachShader(x,E),t.index0AttributeName!==void 0?r.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function R(D){if(i.debug.checkShaderErrors){const B=r.getProgramInfoLog(x)||"",U=r.getShaderInfoLog(w)||"",L=r.getShaderInfoLog(E)||"",O=B.trim(),F=U.trim(),Y=L.trim();let j=!0,X=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(j=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,x,w,E);else{const te=zc(r,w,"vertex"),N=zc(r,E,"fragment");rt("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+O+`
`+te+`
`+N)}else O!==""?Be("WebGLProgram: Program Info Log:",O):(F===""||Y==="")&&(X=!1);X&&(D.diagnostics={runnable:j,programLog:O,vertexShader:{log:F,prefix:m},fragmentShader:{log:Y,prefix:p}})}r.deleteShader(w),r.deleteShader(E),M=new Fs(r,x),A=A1(r,x)}let M;this.getUniforms=function(){return M===void 0&&R(this),M};let A;this.getAttributes=function(){return A===void 0&&R(this),A};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=r.getProgramParameter(x,x1)),P},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=v1++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=w,this.fragmentShader=E,this}let V1=0;class W1{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new X1(e),t.set(e,n)),n}}class X1{constructor(e){this.id=V1++,this.code=e,this.usedTimes=0}}function Y1(i){return i===Ui||i===Gs||i===Hs}function q1(i,e,t,n,r,s){const a=new Gh,o=new W1,c=new Set,l=[],u=new Map,d=n.logarithmicDepthBuffer;let h=n.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(M){return c.add(M),M===0?"uv":`uv${M}`}function x(M,A,P,D,B,U){const L=D.fog,O=B.geometry,F=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?D.environment:null,Y=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap,j=e.get(M.envMap||F,Y),X=j&&j.mapping===oa?j.image.height:null,te=f[M.type];M.precision!==null&&(h=n.getMaxPrecision(M.precision),h!==M.precision&&Be("WebGLProgram.getParameters:",M.precision,"not supported, using",h,"instead."));const N=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,ne=N!==void 0?N.length:0;let oe=0;O.morphAttributes.position!==void 0&&(oe=1),O.morphAttributes.normal!==void 0&&(oe=2),O.morphAttributes.color!==void 0&&(oe=3);let Se,Ue,He,I;if(te){const St=Un[te];Se=St.vertexShader,Ue=St.fragmentShader}else{Se=M.vertexShader,Ue=M.fragmentShader;const St=o.getVertexShaderStage(M),lt=o.getFragmentShaderStage(M);o.update(M,St,lt),He=St.id,I=lt.id}const K=i.getRenderTarget(),se=i.state.buffers.depth.getReversed(),ve=B.isInstancedMesh===!0,ce=B.isBatchedMesh===!0,Te=!!M.map,ze=!!M.matcap,Ne=!!j,Je=!!M.aoMap,ft=!!M.lightMap,Ke=!!M.bumpMap&&M.wireframe===!1,gt=!!M.normalMap,Rt=!!M.displacementMap,It=!!M.emissiveMap,Mt=!!M.metalnessMap,Ve=!!M.roughnessMap,z=M.anisotropy>0,pt=M.clearcoat>0,ke=M.dispersion>0,C=M.retroreflectivity>0,b=M.iridescence>0,V=M.sheen>0,q=M.transmission>0,Q=z&&!!M.anisotropyMap,le=pt&&!!M.clearcoatMap,he=pt&&!!M.clearcoatNormalMap,ee=pt&&!!M.clearcoatRoughnessMap,ie=b&&!!M.iridescenceMap,ue=b&&!!M.iridescenceThicknessMap,Pe=V&&!!M.sheenColorMap,me=V&&!!M.sheenRoughnessMap,de=!!M.specularMap,De=!!M.specularColorMap,Oe=!!M.specularIntensityMap,Ye=q&&!!M.transmissionMap,H=q&&!!M.thicknessMap,fe=!!M.gradientMap,re=!!M.alphaMap,pe=M.alphaTest>0,Me=!!M.alphaHash,ae=!!M.extensions;let Ie=zn;M.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(Ie=i.toneMapping);const Re={shaderID:te,shaderType:M.type,shaderName:M.name,vertexShader:Se,fragmentShader:Ue,defines:M.defines,customVertexShaderID:He,customFragmentShaderID:I,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:h,batching:ce,batchingColor:ce&&B._colorsTexture!==null,instancing:ve,instancingColor:ve&&B.instanceColor!==null,instancingMorph:ve&&B.morphTexture!==null,outputColorSpace:K===null?i.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:tt.workingColorSpace,alphaToCoverage:!!M.alphaToCoverage,map:Te,matcap:ze,envMap:Ne,envMapMode:Ne&&j.mapping,envMapCubeUVHeight:X,aoMap:Je,lightMap:ft,bumpMap:Ke,normalMap:gt,displacementMap:Rt,emissiveMap:It,normalMapObjectSpace:gt&&M.normalMapType===Rm,normalMapTangentSpace:gt&&M.normalMapType===Jl,packedNormalMap:gt&&M.normalMapType===Jl&&Y1(M.normalMap.format),metalnessMap:Mt,roughnessMap:Ve,anisotropy:z,anisotropyMap:Q,clearcoat:pt,clearcoatMap:le,clearcoatNormalMap:he,clearcoatRoughnessMap:ee,dispersion:ke,retroreflection:C,iridescence:b,iridescenceMap:ie,iridescenceThicknessMap:ue,sheen:V,sheenColorMap:Pe,sheenRoughnessMap:me,specularMap:de,specularColorMap:De,specularIntensityMap:Oe,transmission:q,transmissionMap:Ye,thicknessMap:H,gradientMap:fe,opaque:M.transparent===!1&&M.blending===or&&M.alphaToCoverage===!1,alphaMap:re,alphaTest:pe,alphaHash:Me,combine:M.combine,mapUv:Te&&g(M.map.channel),aoMapUv:Je&&g(M.aoMap.channel),lightMapUv:ft&&g(M.lightMap.channel),bumpMapUv:Ke&&g(M.bumpMap.channel),normalMapUv:gt&&g(M.normalMap.channel),displacementMapUv:Rt&&g(M.displacementMap.channel),emissiveMapUv:It&&g(M.emissiveMap.channel),metalnessMapUv:Mt&&g(M.metalnessMap.channel),roughnessMapUv:Ve&&g(M.roughnessMap.channel),anisotropyMapUv:Q&&g(M.anisotropyMap.channel),clearcoatMapUv:le&&g(M.clearcoatMap.channel),clearcoatNormalMapUv:he&&g(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ee&&g(M.clearcoatRoughnessMap.channel),iridescenceMapUv:ie&&g(M.iridescenceMap.channel),iridescenceThicknessMapUv:ue&&g(M.iridescenceThicknessMap.channel),sheenColorMapUv:Pe&&g(M.sheenColorMap.channel),sheenRoughnessMapUv:me&&g(M.sheenRoughnessMap.channel),specularMapUv:de&&g(M.specularMap.channel),specularColorMapUv:De&&g(M.specularColorMap.channel),specularIntensityMapUv:Oe&&g(M.specularIntensityMap.channel),transmissionMapUv:Ye&&g(M.transmissionMap.channel),thicknessMapUv:H&&g(M.thicknessMap.channel),alphaMapUv:re&&g(M.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(gt||z),vertexNormals:!!O.attributes.normal,vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!O.attributes.uv&&(Te||re),fog:!!L,useFog:M.fog===!0,fogExp2:!!L&&L.isFogExp2,flatShading:M.wireframe===!1&&(M.flatShading===!0||O.attributes.normal===void 0&&gt===!1&&(M.isMeshLambertMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isMeshPhysicalMaterial)),sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:se,skinning:B.isSkinnedMesh===!0,hasPositionAttribute:O.attributes.position!==void 0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:ne,morphTextureStride:oe,numSunLights:A.sun.length,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numSunLightShadows:A.sunShadowMap.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:U.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ie,decodeVideoTexture:Te&&M.map.isVideoTexture===!0&&tt.getTransfer(M.map.colorSpace)===mt,decodeVideoTextureEmissive:It&&M.emissiveMap.isVideoTexture===!0&&tt.getTransfer(M.emissiveMap.colorSpace)===mt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Kn,flipSided:M.side===nn,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:ae&&M.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ae&&M.extensions.multiDraw===!0||ce)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return Re.vertexUv1s=c.has(1),Re.vertexUv2s=c.has(2),Re.vertexUv3s=c.has(3),c.clear(),Re}function m(M){const A=[];if(M.shaderID?A.push(M.shaderID):(A.push(M.customVertexShaderID),A.push(M.customFragmentShaderID)),M.defines!==void 0)for(const P in M.defines)A.push(P),A.push(M.defines[P]);return M.isRawShaderMaterial===!1&&(p(A,M),_(A,M),A.push(i.outputColorSpace)),A.push(M.customProgramCacheKey),A.join()}function p(M,A){M.push(A.precision),M.push(A.outputColorSpace),M.push(A.envMapMode),M.push(A.envMapCubeUVHeight),M.push(A.mapUv),M.push(A.alphaMapUv),M.push(A.lightMapUv),M.push(A.aoMapUv),M.push(A.bumpMapUv),M.push(A.normalMapUv),M.push(A.displacementMapUv),M.push(A.emissiveMapUv),M.push(A.metalnessMapUv),M.push(A.roughnessMapUv),M.push(A.anisotropyMapUv),M.push(A.clearcoatMapUv),M.push(A.clearcoatNormalMapUv),M.push(A.clearcoatRoughnessMapUv),M.push(A.iridescenceMapUv),M.push(A.iridescenceThicknessMapUv),M.push(A.sheenColorMapUv),M.push(A.sheenRoughnessMapUv),M.push(A.specularMapUv),M.push(A.specularColorMapUv),M.push(A.specularIntensityMapUv),M.push(A.transmissionMapUv),M.push(A.thicknessMapUv),M.push(A.combine),M.push(A.fogExp2),M.push(A.sizeAttenuation),M.push(A.morphTargetsCount),M.push(A.morphAttributeCount),M.push(A.numSunLights),M.push(A.numDirLights),M.push(A.numPointLights),M.push(A.numSpotLights),M.push(A.numSpotLightMaps),M.push(A.numHemiLights),M.push(A.numRectAreaLights),M.push(A.numSunLightShadows),M.push(A.numDirLightShadows),M.push(A.numPointLightShadows),M.push(A.numSpotLightShadows),M.push(A.numSpotLightShadowsWithMaps),M.push(A.numLightProbes),M.push(A.shadowMapType),M.push(A.toneMapping),M.push(A.numClippingPlanes),M.push(A.numClipIntersection),M.push(A.depthPacking)}function _(M,A){a.disableAll(),A.instancing&&a.enable(0),A.instancingColor&&a.enable(1),A.instancingMorph&&a.enable(2),A.matcap&&a.enable(3),A.envMap&&a.enable(4),A.normalMapObjectSpace&&a.enable(5),A.normalMapTangentSpace&&a.enable(6),A.clearcoat&&a.enable(7),A.iridescence&&a.enable(8),A.alphaTest&&a.enable(9),A.vertexColors&&a.enable(10),A.vertexAlphas&&a.enable(11),A.vertexUv1s&&a.enable(12),A.vertexUv2s&&a.enable(13),A.vertexUv3s&&a.enable(14),A.vertexTangents&&a.enable(15),A.anisotropy&&a.enable(16),A.alphaHash&&a.enable(17),A.batching&&a.enable(18),A.dispersion&&a.enable(19),A.retroreflection&&a.enable(24),A.batchingColor&&a.enable(20),A.gradientMap&&a.enable(21),A.packedNormalMap&&a.enable(22),A.vertexNormals&&a.enable(23),M.push(a.mask),a.disableAll(),A.fog&&a.enable(0),A.useFog&&a.enable(1),A.flatShading&&a.enable(2),A.logarithmicDepthBuffer&&a.enable(3),A.reversedDepthBuffer&&a.enable(4),A.skinning&&a.enable(5),A.morphTargets&&a.enable(6),A.morphNormals&&a.enable(7),A.morphColors&&a.enable(8),A.premultipliedAlpha&&a.enable(9),A.shadowMapEnabled&&a.enable(10),A.doubleSided&&a.enable(11),A.flipSided&&a.enable(12),A.useDepthPacking&&a.enable(13),A.dithering&&a.enable(14),A.transmission&&a.enable(15),A.sheen&&a.enable(16),A.opaque&&a.enable(17),A.pointsUvs&&a.enable(18),A.decodeVideoTexture&&a.enable(19),A.decodeVideoTextureEmissive&&a.enable(20),A.alphaToCoverage&&a.enable(21),A.numLightProbeGrids>0&&a.enable(22),A.hasPositionAttribute&&a.enable(23),M.push(a.mask)}function S(M){const A=f[M.type];let P;if(A){const D=Un[A];P=m0.clone(D.uniforms)}else P=M.uniforms;return P}function y(M,A){let P=u.get(A);return P!==void 0?++P.usedTimes:(P=new H1(i,A,M,r),l.push(P),u.set(A,P)),P}function w(M){if(--M.usedTimes===0){const A=l.indexOf(M);l[A]=l[l.length-1],l.pop(),u.delete(M.cacheKey),M.destroy()}}function E(M){o.remove(M)}function R(){o.dispose()}return{getParameters:x,getProgramCacheKey:m,getUniforms:S,acquireProgram:y,releaseProgram:w,releaseShaderCache:E,programs:l,dispose:R}}function K1(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function r(a,o,c){i.get(a)[o]=c}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function $1(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Wc(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Xc(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(h){let f=0;return h.isInstancedMesh&&(f+=2),h.isSkinnedMesh&&(f+=1),f}function o(h,f,g,x,m,p){let _=i[e];return _===void 0?(_={id:h.id,object:h,geometry:f,material:g,materialVariant:a(h),groupOrder:x,renderOrder:h.renderOrder,z:m,group:p},i[e]=_):(_.id=h.id,_.object=h,_.geometry=f,_.material=g,_.materialVariant=a(h),_.groupOrder=x,_.renderOrder=h.renderOrder,_.z=m,_.group=p),e++,_}function c(h,f,g,x,m,p,_){_.reversedDepth===!0&&(m=-m);const S=o(h,f,g,x,m,p);g.transmission>0?n.push(S):g.transparent===!0?r.push(S):t.push(S)}function l(h,f,g,x,m,p){const _=o(h,f,g,x,m,p);g.transmission>0?n.unshift(_):g.transparent===!0?r.unshift(_):t.unshift(_)}function u(h,f){t.length>1&&t.sort(h||$1),n.length>1&&n.sort(f||Wc),r.length>1&&r.sort(f||Wc)}function d(){for(let h=e,f=i.length;h<f;h++){const g=i[h];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:c,unshift:l,finish:d,sort:u}}function Z1(){let i=new WeakMap;function e(n,r){const s=i.get(n);let a;return s===void 0?(a=new Xc,i.set(n,[a])):r>=s.length?(a=new Xc,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function J1(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new W,color:new Qe};break;case"SpotLight":t={position:new W,direction:new W,color:new Qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new W,color:new Qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new W,skyColor:new Qe,groundColor:new Qe};break;case"RectAreaLight":t={color:new Qe,position:new W,halfWidth:new W,halfHeight:new W};break}return i[e.id]=t,t}}}function Q1(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let j1=0;function e_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function t_(i){const e=new J1,t=Q1(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new W);const r=new W,s=new Ct,a=new Ct;function o(l){let u=0,d=0,h=0;for(let B=0;B<9;B++)n.probe[B].set(0,0,0);let f=0,g=0,x=0,m=0,p=0,_=0,S=0,y=0,w=0,E=0,R=0,M=0,A=0,P=0;l.sort(e_);for(let B=0,U=l.length;B<U;B++){const L=l[B],O=L.color,F=L.intensity,Y=L.distance;let j=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===Ui?j=L.shadow.map.texture:j=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)u+=O.r*F,d+=O.g*F,h+=O.b*F;else if(L.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(L.sh.coefficients[X],F);P++}else if(L.isSunLight){const X=e.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const te=L.shadow,N=t.get(L);N.shadowIntensity=te.intensity,N.shadowBias=te.bias,N.shadowNormalBias=te.normalBias,N.shadowRadius=te.radius,N.shadowMapSize.copy(te.mapSize).multiply(te.getFrameExtents()),n.sunShadow[g]=N,n.sunShadowMap[g]=j;const ne=te.getViewportCount();for(let oe=0;oe<ne;oe++)n.sunShadowMatrix[x+oe]=te.getMatrix(oe),n.sunShadowCascade[x+oe]=te._cascadeData[oe];x+=ne,g++}n.sun[f]=X,f++}else if(L.isDirectionalLight){const X=e.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const te=L.shadow,N=t.get(L);N.shadowIntensity=te.intensity,N.shadowBias=te.bias,N.shadowNormalBias=te.normalBias,N.shadowRadius=te.radius,N.shadowMapSize=te.mapSize,n.directionalShadow[m]=N,n.directionalShadowMap[m]=j,n.directionalShadowMatrix[m]=L.shadow.matrix,w++}n.directional[m]=X,m++}else if(L.isSpotLight){const X=e.get(L);X.position.setFromMatrixPosition(L.matrixWorld),X.color.copy(O).multiplyScalar(F),X.distance=Y,X.coneCos=Math.cos(L.angle),X.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),X.decay=L.decay,n.spot[_]=X;const te=L.shadow;if(L.map&&(n.spotLightMap[M]=L.map,M++,te.updateMatrices(L),L.castShadow&&A++),n.spotLightMatrix[_]=te.matrix,L.castShadow){const N=t.get(L);N.shadowIntensity=te.intensity,N.shadowBias=te.bias,N.shadowNormalBias=te.normalBias,N.shadowRadius=te.radius,N.shadowMapSize=te.mapSize,n.spotShadow[_]=N,n.spotShadowMap[_]=j,R++}_++}else if(L.isRectAreaLight){const X=e.get(L);X.color.copy(O).multiplyScalar(F),X.halfWidth.set(L.width*.5,0,0),X.halfHeight.set(0,L.height*.5,0),n.rectArea[S]=X,S++}else if(L.isPointLight){const X=e.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity),X.distance=L.distance,X.decay=L.decay,L.castShadow){const te=L.shadow,N=t.get(L);N.shadowIntensity=te.intensity,N.shadowBias=te.bias,N.shadowNormalBias=te.normalBias,N.shadowRadius=te.radius,N.shadowMapSize=te.mapSize,N.shadowCameraNear=te.camera.near,N.shadowCameraFar=te.camera.far,n.pointShadow[p]=N,n.pointShadowMap[p]=j,n.pointShadowMatrix[p]=L.shadow.matrix,E++}n.point[p]=X,p++}else if(L.isHemisphereLight){const X=e.get(L);X.skyColor.copy(L.color).multiplyScalar(F),X.groundColor.copy(L.groundColor).multiplyScalar(F),n.hemi[y]=X,y++}}S>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ge.LTC_FLOAT_1,n.rectAreaLTC2=ge.LTC_FLOAT_2):(n.rectAreaLTC1=ge.LTC_HALF_1,n.rectAreaLTC2=ge.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=h;const D=n.hash;(D.sunLength!==f||D.directionalLength!==m||D.pointLength!==p||D.spotLength!==_||D.rectAreaLength!==S||D.hemiLength!==y||D.numSunShadows!==g||D.numDirectionalShadows!==w||D.numPointShadows!==E||D.numSpotShadows!==R||D.numSpotMaps!==M||D.numLightProbes!==P)&&(n.sun.length=f,n.directional.length=m,n.spot.length=_,n.rectArea.length=S,n.point.length=p,n.hemi.length=y,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=x,n.sunShadowCascade.length=x,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.directionalShadowMatrix.length=w,n.pointShadow.length=E,n.pointShadowMap.length=E,n.pointShadowMatrix.length=E,n.spotShadow.length=R,n.spotShadowMap.length=R,n.spotLightMatrix.length=R+M-A,n.spotLightMap.length=M,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=P,D.sunLength=f,D.directionalLength=m,D.pointLength=p,D.spotLength=_,D.rectAreaLength=S,D.hemiLength=y,D.numSunShadows=g,D.numDirectionalShadows=w,D.numPointShadows=E,D.numSpotShadows=R,D.numSpotMaps=M,D.numLightProbes=P,n.version=j1++)}function c(l,u){let d=0,h=0,f=0,g=0,x=0,m=0;const p=u.matrixWorldInverse;for(let _=0,S=l.length;_<S;_++){const y=l[_];if(y.isSunLight){const w=n.sun[d];w.direction.setFromMatrixPosition(y.matrixWorld),w.direction.transformDirection(p),d++}else if(y.isDirectionalLight){const w=n.directional[h];w.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(p),h++}else if(y.isSpotLight){const w=n.spot[g];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(p),w.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(p),g++}else if(y.isRectAreaLight){const w=n.rectArea[x];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(p),a.identity(),s.copy(y.matrixWorld),s.premultiply(p),a.extractRotation(s),w.halfWidth.set(y.width*.5,0,0),w.halfHeight.set(0,y.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),x++}else if(y.isPointLight){const w=n.point[f];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(p),f++}else if(y.isHemisphereLight){const w=n.hemi[m];w.direction.setFromMatrixPosition(y.matrixWorld),w.direction.transformDirection(p),m++}}}return{setup:o,setupView:c,state:n}}function Yc(i){const e=new t_(i),t=[],n=[],r=[];function s(h){d.camera=h,t.length=0,n.length=0,r.length=0}function a(h){t.push(h)}function o(h){n.push(h)}function c(h){r.push(h)}function l(){e.setup(t)}function u(h){e.setupView(t,h)}const d={lightsArray:t,shadowsArray:n,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:d,setupLights:l,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function n_(i){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new Yc(i),e.set(r,[o])):s>=a.length?(o=new Yc(i),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const i_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,r_=`uniform sampler2D shadow_pass;
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
}`,s_=[new W(1,0,0),new W(-1,0,0),new W(0,1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1)],a_=[new W(0,-1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1),new W(0,-1,0),new W(0,-1,0)],qc=new Ct,Ir=new W,$a=new W;function o_(i,e,t){let n=new Ys;const r=new Ge,s=new Ge,a=new ot,o=new _0,c=new M0,l={},u=t.maxTextureSize,d={[Di]:nn,[nn]:Di,[Kn]:Kn},h=new wt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ge},radius:{value:4}},vertexShader:i_,fragmentShader:r_}),f=h.clone();f.defines.HORIZONTAL_PASS=1;const g=new zt;g.setAttribute("position",new dn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Vt(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ps;let p=this.type;this.render=function(E,R,M){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;this.type===cm&&(Be("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ps);const A=i.getRenderTarget(),P=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),B=i.state;B.setBlending(Bn),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const U=p!==this.type;U&&R.traverse(function(L){L.material&&(Array.isArray(L.material)?L.material.forEach(O=>O.needsUpdate=!0):L.material.needsUpdate=!0)});for(let L=0,O=E.length;L<O;L++){const F=E[L],Y=F.shadow;if(Y===void 0){Be("WebGLShadowMap:",F,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;r.copy(Y.mapSize);const j=Y.getFrameExtents();r.multiply(j),s.copy(Y.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/j.x),r.x=s.x*j.x,Y.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/j.y),r.y=s.y*j.y,Y.mapSize.y=s.y));const X=i.state.buffers.depth.getReversed();if(Y.camera._reversedDepth=X,Y.map===null||U===!0){if(Y.map!==null&&(Y.map.depthTexture!==null&&(Y.map.depthTexture.dispose(),Y.map.depthTexture=null),Y.map.dispose()),this.type===Nr){if(F.isPointLight){Be("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Y.map=new Mn(r.x,r.y,{format:Ui,type:Gn,minFilter:Lt,magFilter:Lt,generateMipmaps:!1}),Y.map.texture.name=F.name+".shadowMap",Y.map.depthTexture=new gr(r.x,r.y,Nn),Y.map.depthTexture.name=F.name+".shadowMapDepth",Y.map.depthTexture.format=Qn,Y.map.depthTexture.compareFunction=null,Y.map.depthTexture.minFilter=Dt,Y.map.depthTexture.magFilter=Dt}else F.isPointLight?(Y.map=new eu(r.x),Y.map.depthTexture=new f0(r.x,kn)):(Y.map=new Mn(r.x,r.y),Y.map.depthTexture=new gr(r.x,r.y,kn)),Y.map.depthTexture.name=F.name+".shadowMap",Y.map.depthTexture.format=Qn,this.type===Ps?(Y.map.depthTexture.compareFunction=X?vl:xl,Y.map.depthTexture.minFilter=Lt,Y.map.depthTexture.magFilter=Lt):(Y.map.depthTexture.compareFunction=null,Y.map.depthTexture.minFilter=Dt,Y.map.depthTexture.magFilter=Dt);Y.camera.updateProjectionMatrix()}Y.map.isWebGLCubeRenderTarget!==!0&&(Y.map.width!==r.x||Y.map.height!==r.y)&&Y.map.setSize(r.x,r.y);const te=Y.map.isWebGLCubeRenderTarget?6:Y.getViewportCount();F.isPointLight!==!0&&Y.updateMatrices(F,M);for(let N=0;N<te;N++){const ne=Y.getCamera(N);if(F.isPointLight){const oe=Y.camera,Se=Y.matrix,Ue=F.distance||oe.far;Ue!==oe.far&&(oe.far=Ue,oe.updateProjectionMatrix()),Ir.setFromMatrixPosition(F.matrixWorld),oe.position.copy(Ir),$a.copy(oe.position),$a.add(s_[N]),oe.up.copy(a_[N]),oe.lookAt($a),oe.updateMatrixWorld(),Se.makeTranslation(-Ir.x,-Ir.y,-Ir.z),qc.multiplyMatrices(oe.projectionMatrix,oe.matrixWorldInverse),Y._frustum.setFromProjectionMatrix(qc,oe.coordinateSystem,oe.reversedDepth)}if(Y.map.isWebGLCubeRenderTarget)i.setRenderTarget(Y.map,N),i.clear();else{N===0&&(i.setRenderTarget(Y.map),i.clear());const oe=Y.getViewport(N);a.set(s.x*oe.x,s.y*oe.y,s.x*oe.z,s.y*oe.w),B.viewport(a)}n=Y.getFrustum(N),y(R,M,ne,F,this.type)}Y.isPointLightShadow!==!0&&this.type===Nr&&_(Y,M),Y.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(A,P,D)};function _(E,R){const M=e.update(x);h.defines.VSM_SAMPLES!==E.blurSamples&&(h.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null?E.mapPass=new Mn(r.x,r.y,{format:Ui,type:Gn}):(E.mapPass.width!==E.map.width||E.mapPass.height!==E.map.height)&&E.mapPass.setSize(E.map.width,E.map.height),h.uniforms.shadow_pass.value=E.map.depthTexture,h.uniforms.resolution.value.set(E.map.width,E.map.height),h.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(R,null,M,h,x,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value.set(E.map.width,E.map.height),f.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(R,null,M,f,x,null)}function S(E,R,M,A){let P=null;const D=M.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(D!==void 0)P=D;else if(P=M.isPointLight===!0?c:o,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const B=P.uuid,U=R.uuid;let L=l[B];L===void 0&&(L={},l[B]=L);let O=L[U];O===void 0&&(O=P.clone(),L[U]=O,R.addEventListener("dispose",w)),P=O}if(P.visible=R.visible,P.wireframe=R.wireframe,A===Nr?P.side=R.shadowSide!==null?R.shadowSide:R.side:P.side=R.shadowSide!==null?R.shadowSide:d[R.side],P.alphaMap=R.alphaMap,P.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,P.map=R.map,P.clipShadows=R.clipShadows,P.clippingPlanes=R.clippingPlanes,P.clipIntersection=R.clipIntersection,P.displacementMap=R.displacementMap,P.displacementScale=R.displacementScale,P.displacementBias=R.displacementBias,P.wireframeLinewidth=R.wireframeLinewidth,P.linewidth=R.linewidth,M.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const B=i.properties.get(P);B.light=M}return P}function y(E,R,M,A,P){if(E.visible===!1)return;if(E.layers.test(R.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&P===Nr)&&(!E.frustumCulled||E.intersectsFrustum(n))){E.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,E.matrixWorld);const U=e.update(E),L=E.material;if(Array.isArray(L)){const O=U.groups;for(let F=0,Y=O.length;F<Y;F++){const j=O[F],X=L[j.materialIndex];if(X&&X.visible){const te=S(E,X,A,P);E.onBeforeShadow(i,E,R,M,U,te,j),i.renderBufferDirect(M,null,U,te,E,j),E.onAfterShadow(i,E,R,M,U,te,j)}}}else if(L.visible){const O=S(E,L,A,P);E.onBeforeShadow(i,E,R,M,U,O,null),i.renderBufferDirect(M,null,U,O,E,null),E.onAfterShadow(i,E,R,M,U,O,null)}}const B=E.children;for(let U=0,L=B.length;U<L;U++)y(B[U],R,M,A,P)}function w(E){E.target.removeEventListener("dispose",w);for(const M in l){const A=l[M],P=E.target.uuid;P in A&&(A[P].dispose(),delete A[P])}}}function l_(i,e){function t(){let H=!1;const fe=new ot;let re=null;const pe=new ot(0,0,0,0);return{setMask:function(Me){re!==Me&&!H&&(i.colorMask(Me,Me,Me,Me),re=Me)},setLocked:function(Me){H=Me},setClear:function(Me,ae,Ie,Re,St){St===!0&&(Me*=Re,ae*=Re,Ie*=Re),fe.set(Me,ae,Ie,Re),pe.equals(fe)===!1&&(i.clearColor(Me,ae,Ie,Re),pe.copy(fe))},reset:function(){H=!1,re=null,pe.set(-1,0,0,0)}}}function n(){let H=!1,fe=!1,re=null,pe=null,Me=null;return{setReversed:function(ae){if(fe!==ae){const Ie=e.get("EXT_clip_control");ae?Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.ZERO_TO_ONE_EXT):Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.NEGATIVE_ONE_TO_ONE_EXT),fe=ae;const Re=Me;Me=null,this.setClear(Re)}},getReversed:function(){return fe},setTest:function(ae){ae?K(i.DEPTH_TEST):se(i.DEPTH_TEST)},setMask:function(ae){re!==ae&&!H&&(i.depthMask(ae),re=ae)},setFunc:function(ae){if(fe&&(ae=Gm[ae]),pe!==ae){switch(ae){case ro:i.depthFunc(i.NEVER);break;case so:i.depthFunc(i.ALWAYS);break;case ao:i.depthFunc(i.LESS);break;case kr:i.depthFunc(i.LEQUAL);break;case oo:i.depthFunc(i.EQUAL);break;case lo:i.depthFunc(i.GEQUAL);break;case co:i.depthFunc(i.GREATER);break;case ho:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}pe=ae}},setLocked:function(ae){H=ae},setClear:function(ae){Me!==ae&&(Me=ae,fe&&(ae=1-ae),i.clearDepth(ae))},reset:function(){H=!1,re=null,pe=null,Me=null,fe=!1}}}function r(){let H=!1,fe=null,re=null,pe=null,Me=null,ae=null,Ie=null,Re=null,St=null;return{setTest:function(lt){H||(lt?K(i.STENCIL_TEST):se(i.STENCIL_TEST))},setMask:function(lt){fe!==lt&&!H&&(i.stencilMask(lt),fe=lt)},setFunc:function(lt,yn,Ln){(re!==lt||pe!==yn||Me!==Ln)&&(i.stencilFunc(lt,yn,Ln),re=lt,pe=yn,Me=Ln)},setOp:function(lt,yn,Ln){(ae!==lt||Ie!==yn||Re!==Ln)&&(i.stencilOp(lt,yn,Ln),ae=lt,Ie=yn,Re=Ln)},setLocked:function(lt){H=lt},setClear:function(lt){St!==lt&&(i.clearStencil(lt),St=lt)},reset:function(){H=!1,fe=null,re=null,pe=null,Me=null,ae=null,Ie=null,Re=null,St=null}}}const s=new t,a=new n,o=new r,c=new WeakMap,l=new WeakMap;let u={},d={},h={},f=new WeakMap,g=[],x=null,m=!1,p=null,_=null,S=null,y=null,w=null,E=null,R=null,M=new Qe(0,0,0),A=0,P=!1,D=null,B=null,U=null,L=null,O=null;const F=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,j=0;const X=i.getParameter(i.VERSION);X.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(X)[1]),Y=j>=1):X.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),Y=j>=2);let te=null,N={};const ne=i.getParameter(i.SCISSOR_BOX),oe=i.getParameter(i.VIEWPORT),Se=new ot().fromArray(ne),Ue=new ot().fromArray(oe);function He(H,fe,re,pe){const Me=new Uint8Array(4),ae=i.createTexture();i.bindTexture(H,ae),i.texParameteri(H,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(H,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ie=0;Ie<re;Ie++)H===i.TEXTURE_3D||H===i.TEXTURE_2D_ARRAY?i.texImage3D(fe,0,i.RGBA,1,1,pe,0,i.RGBA,i.UNSIGNED_BYTE,Me):i.texImage2D(fe+Ie,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Me);return ae}const I={};I[i.TEXTURE_2D]=He(i.TEXTURE_2D,i.TEXTURE_2D,1),I[i.TEXTURE_CUBE_MAP]=He(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),I[i.TEXTURE_2D_ARRAY]=He(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),I[i.TEXTURE_3D]=He(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),K(i.DEPTH_TEST),a.setFunc(kr),Ke(!1),gt(Kl),K(i.CULL_FACE),Je(Bn);function K(H){u[H]!==!0&&(i.enable(H),u[H]=!0)}function se(H){u[H]!==!1&&(i.disable(H),u[H]=!1)}function ve(H,fe){return h[H]!==fe?(i.bindFramebuffer(H,fe),h[H]=fe,H===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=fe),H===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=fe),!0):!1}function ce(H,fe){let re=g,pe=!1;if(H){re=f.get(fe),re===void 0&&(re=[],f.set(fe,re));const Me=H.textures;if(re.length!==Me.length||re[0]!==i.COLOR_ATTACHMENT0){for(let ae=0,Ie=Me.length;ae<Ie;ae++)re[ae]=i.COLOR_ATTACHMENT0+ae;re.length=Me.length,pe=!0}}else re[0]!==i.BACK&&(re[0]=i.BACK,pe=!0);pe&&i.drawBuffers(re)}function Te(H){return x!==H?(i.useProgram(H),x=H,!0):!1}const ze={[nr]:i.FUNC_ADD,[hm]:i.FUNC_SUBTRACT,[um]:i.FUNC_REVERSE_SUBTRACT};ze[dm]=i.MIN,ze[fm]=i.MAX;const Ne={[ol]:i.ZERO,[pm]:i.ONE,[ll]:i.SRC_COLOR,[cl]:i.SRC_ALPHA,[Mm]:i.SRC_ALPHA_SATURATE,[vm]:i.DST_COLOR,[gm]:i.DST_ALPHA,[mm]:i.ONE_MINUS_SRC_COLOR,[hl]:i.ONE_MINUS_SRC_ALPHA,[_m]:i.ONE_MINUS_DST_COLOR,[xm]:i.ONE_MINUS_DST_ALPHA,[Sm]:i.CONSTANT_COLOR,[ym]:i.ONE_MINUS_CONSTANT_COLOR,[bm]:i.CONSTANT_ALPHA,[wm]:i.ONE_MINUS_CONSTANT_ALPHA};function Je(H,fe,re,pe,Me,ae,Ie,Re,St,lt){if(H===Bn){m===!0&&(se(i.BLEND),m=!1);return}if(m===!1&&(K(i.BLEND),m=!0),H!==aa){if(H!==p||lt!==P){if((_!==nr||w!==nr)&&(i.blendEquation(i.FUNC_ADD),_=nr,w=nr),lt)switch(H){case or:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case pr:i.blendFunc(i.ONE,i.ONE);break;case $l:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Zl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:rt("WebGLState: Invalid blending: ",H);break}else switch(H){case or:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case pr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case $l:rt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Zl:rt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:rt("WebGLState: Invalid blending: ",H);break}S=null,y=null,E=null,R=null,M.set(0,0,0),A=0,p=H,P=lt}return}Me=Me||fe,ae=ae||re,Ie=Ie||pe,(fe!==_||Me!==w)&&(i.blendEquationSeparate(ze[fe],ze[Me]),_=fe,w=Me),(re!==S||pe!==y||ae!==E||Ie!==R)&&(i.blendFuncSeparate(Ne[re],Ne[pe],Ne[ae],Ne[Ie]),S=re,y=pe,E=ae,R=Ie),(Re.equals(M)===!1||St!==A)&&(i.blendColor(Re.r,Re.g,Re.b,St),M.copy(Re),A=St),p=H,P=!1}function ft(H,fe){H.side===Kn?se(i.CULL_FACE):K(i.CULL_FACE);let re=H.side===nn;fe&&(re=!re),Ke(re),H.blending===or&&H.transparent===!1?Je(Bn):Je(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),a.setFunc(H.depthFunc),a.setTest(H.depthTest),a.setMask(H.depthWrite),s.setMask(H.colorWrite);const pe=H.stencilWrite;o.setTest(pe),pe&&(o.setMask(H.stencilWriteMask),o.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),o.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),It(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?K(i.SAMPLE_ALPHA_TO_COVERAGE):se(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ke(H){D!==H&&(H?i.frontFace(i.CW):i.frontFace(i.CCW),D=H)}function gt(H){H!==om?(K(i.CULL_FACE),H!==B&&(H===Kl?i.cullFace(i.BACK):H===lm?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):se(i.CULL_FACE),B=H}function Rt(H){H!==U&&(Y&&i.lineWidth(H),U=H)}function It(H,fe,re){H?(K(i.POLYGON_OFFSET_FILL),(L!==fe||O!==re)&&(L=fe,O=re,a.getReversed()&&(fe=-fe),i.polygonOffset(fe,re))):se(i.POLYGON_OFFSET_FILL)}function Mt(H){H?K(i.SCISSOR_TEST):se(i.SCISSOR_TEST)}function Ve(H){H===void 0&&(H=i.TEXTURE0+F-1),te!==H&&(i.activeTexture(H),te=H)}function z(H,fe,re){re===void 0&&(te===null?re=i.TEXTURE0+F-1:re=te);let pe=N[re];pe===void 0&&(pe={type:void 0,texture:void 0},N[re]=pe),(pe.type!==H||pe.texture!==fe)&&(te!==re&&(i.activeTexture(re),te=re),i.bindTexture(H,fe||I[H]),pe.type=H,pe.texture=fe)}function pt(){const H=N[te];H!==void 0&&H.type!==void 0&&(i.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function ke(){try{i.compressedTexImage2D(...arguments)}catch(H){rt("WebGLState:",H)}}function C(){try{i.compressedTexImage3D(...arguments)}catch(H){rt("WebGLState:",H)}}function b(){try{i.texSubImage2D(...arguments)}catch(H){rt("WebGLState:",H)}}function V(){try{i.texSubImage3D(...arguments)}catch(H){rt("WebGLState:",H)}}function q(){try{i.compressedTexSubImage2D(...arguments)}catch(H){rt("WebGLState:",H)}}function Q(){try{i.compressedTexSubImage3D(...arguments)}catch(H){rt("WebGLState:",H)}}function le(){try{i.texStorage2D(...arguments)}catch(H){rt("WebGLState:",H)}}function he(){try{i.texStorage3D(...arguments)}catch(H){rt("WebGLState:",H)}}function ee(){try{i.texImage2D(...arguments)}catch(H){rt("WebGLState:",H)}}function ie(){try{i.texImage3D(...arguments)}catch(H){rt("WebGLState:",H)}}function ue(H){return d[H]!==void 0?d[H]:i.getParameter(H)}function Pe(H,fe){d[H]!==fe&&(i.pixelStorei(H,fe),d[H]=fe)}function me(H){Se.equals(H)===!1&&(i.scissor(H.x,H.y,H.z,H.w),Se.copy(H))}function de(H){Ue.equals(H)===!1&&(i.viewport(H.x,H.y,H.z,H.w),Ue.copy(H))}function De(H,fe){let re=l.get(fe);re===void 0&&(re=new WeakMap,l.set(fe,re));let pe=re.get(H);pe===void 0&&(pe=i.getUniformBlockIndex(fe,H.name),re.set(H,pe))}function Oe(H,fe){const pe=l.get(fe).get(H);c.get(fe)!==pe&&(i.uniformBlockBinding(fe,pe,H.__bindingPointIndex),c.set(fe,pe))}function Ye(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},d={},te=null,N={},h={},f=new WeakMap,g=[],x=null,m=!1,p=null,_=null,S=null,y=null,w=null,E=null,R=null,M=new Qe(0,0,0),A=0,P=!1,D=null,B=null,U=null,L=null,O=null,Se.set(0,0,i.canvas.width,i.canvas.height),Ue.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:K,disable:se,bindFramebuffer:ve,drawBuffers:ce,useProgram:Te,setBlending:Je,setMaterial:ft,setFlipSided:Ke,setCullFace:gt,setLineWidth:Rt,setPolygonOffset:It,setScissorTest:Mt,activeTexture:Ve,bindTexture:z,unbindTexture:pt,compressedTexImage2D:ke,compressedTexImage3D:C,texImage2D:ee,texImage3D:ie,pixelStorei:Pe,getParameter:ue,updateUBOMapping:De,uniformBlockBinding:Oe,texStorage2D:le,texStorage3D:he,texSubImage2D:b,texSubImage3D:V,compressedTexSubImage2D:q,compressedTexSubImage3D:Q,scissor:me,viewport:de,reset:Ye}}function c_(i,e,t,n,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ge,u=new WeakMap,d=new Set;let h;const f=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(C,b){return g?new OffscreenCanvas(C,b):Xs("canvas")}function m(C,b,V){let q=1;const Q=ke(C);if((Q.width>V||Q.height>V)&&(q=V/Math.max(Q.width,Q.height)),q<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const le=Math.floor(q*Q.width),he=Math.floor(q*Q.height);h===void 0&&(h=x(le,he));const ee=b?x(le,he):h;return ee.width=le,ee.height=he,ee.getContext("2d").drawImage(C,0,0,le,he),Be("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+le+"x"+he+")."),ee}else return"data"in C&&Be("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),C;return C}function p(C){return C.generateMipmaps}function _(C){i.generateMipmap(C)}function S(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(C,b,V,q,Q,le=!1){if(C!==null){if(i[C]!==void 0)return i[C];Be("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let he;q&&(he=e.get("EXT_texture_norm16"),he||Be("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ee=b;if(b===i.RED&&(V===i.FLOAT&&(ee=i.R32F),V===i.HALF_FLOAT&&(ee=i.R16F),V===i.UNSIGNED_BYTE&&(ee=i.R8),V===i.UNSIGNED_SHORT&&he&&(ee=he.R16_EXT),V===i.SHORT&&he&&(ee=he.R16_SNORM_EXT)),b===i.RED_INTEGER&&(V===i.UNSIGNED_BYTE&&(ee=i.R8UI),V===i.UNSIGNED_SHORT&&(ee=i.R16UI),V===i.UNSIGNED_INT&&(ee=i.R32UI),V===i.BYTE&&(ee=i.R8I),V===i.SHORT&&(ee=i.R16I),V===i.INT&&(ee=i.R32I)),b===i.RG&&(V===i.FLOAT&&(ee=i.RG32F),V===i.HALF_FLOAT&&(ee=i.RG16F),V===i.UNSIGNED_BYTE&&(ee=i.RG8),V===i.UNSIGNED_SHORT&&he&&(ee=he.RG16_EXT),V===i.SHORT&&he&&(ee=he.RG16_SNORM_EXT)),b===i.RG_INTEGER&&(V===i.UNSIGNED_BYTE&&(ee=i.RG8UI),V===i.UNSIGNED_SHORT&&(ee=i.RG16UI),V===i.UNSIGNED_INT&&(ee=i.RG32UI),V===i.BYTE&&(ee=i.RG8I),V===i.SHORT&&(ee=i.RG16I),V===i.INT&&(ee=i.RG32I)),b===i.RGB_INTEGER&&(V===i.UNSIGNED_BYTE&&(ee=i.RGB8UI),V===i.UNSIGNED_SHORT&&(ee=i.RGB16UI),V===i.UNSIGNED_INT&&(ee=i.RGB32UI),V===i.BYTE&&(ee=i.RGB8I),V===i.SHORT&&(ee=i.RGB16I),V===i.INT&&(ee=i.RGB32I)),b===i.RGBA_INTEGER&&(V===i.UNSIGNED_BYTE&&(ee=i.RGBA8UI),V===i.UNSIGNED_SHORT&&(ee=i.RGBA16UI),V===i.UNSIGNED_INT&&(ee=i.RGBA32UI),V===i.BYTE&&(ee=i.RGBA8I),V===i.SHORT&&(ee=i.RGBA16I),V===i.INT&&(ee=i.RGBA32I)),b===i.RGB&&(V===i.UNSIGNED_SHORT&&he&&(ee=he.RGB16_EXT),V===i.SHORT&&he&&(ee=he.RGB16_SNORM_EXT),V===i.UNSIGNED_INT_5_9_9_9_REV&&(ee=i.RGB9_E5),V===i.UNSIGNED_INT_10F_11F_11F_REV&&(ee=i.R11F_G11F_B10F)),b===i.RGBA){const ie=le?Vs:tt.getTransfer(Q);V===i.FLOAT&&(ee=i.RGBA32F),V===i.HALF_FLOAT&&(ee=i.RGBA16F),V===i.UNSIGNED_BYTE&&(ee=ie===mt?i.SRGB8_ALPHA8:i.RGBA8),V===i.UNSIGNED_SHORT&&he&&(ee=he.RGBA16_EXT),V===i.SHORT&&he&&(ee=he.RGBA16_SNORM_EXT),V===i.UNSIGNED_SHORT_4_4_4_4&&(ee=i.RGBA4),V===i.UNSIGNED_SHORT_5_5_5_1&&(ee=i.RGB5_A1)}return(ee===i.R16F||ee===i.R32F||ee===i.RG16F||ee===i.RG32F||ee===i.RGBA16F||ee===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function w(C,b){let V;return C?b===null||b===kn||b===Hr?V=i.DEPTH24_STENCIL8:b===Nn?V=i.DEPTH32F_STENCIL8:b===Gr&&(V=i.DEPTH24_STENCIL8,Be("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===kn||b===Hr?V=i.DEPTH_COMPONENT24:b===Nn?V=i.DEPTH_COMPONENT32F:b===Gr&&(V=i.DEPTH_COMPONENT16),V}function E(C,b){return p(C)===!0||C.isFramebufferTexture&&C.minFilter!==Dt&&C.minFilter!==Lt?Math.log2(Math.max(b.width,b.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?b.mipmaps.length:1}function R(C){const b=C.target;b.removeEventListener("dispose",R),A(b),b.isVideoTexture&&u.delete(b),b.isHTMLTexture&&d.delete(b)}function M(C){const b=C.target;b.removeEventListener("dispose",M),D(b)}function A(C){const b=n.get(C);if(b.__webglInit===void 0)return;const V=C.source,q=f.get(V);if(q){const Q=q[b.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&P(C),Object.keys(q).length===0&&f.delete(V)}n.remove(C)}function P(C){const b=n.get(C);i.deleteTexture(b.__webglTexture);const V=C.source,q=f.get(V);delete q[b.__cacheKey],a.memory.textures--}function D(C){const b=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(b.__webglFramebuffer[q]))for(let Q=0;Q<b.__webglFramebuffer[q].length;Q++)i.deleteFramebuffer(b.__webglFramebuffer[q][Q]);else i.deleteFramebuffer(b.__webglFramebuffer[q]);b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer[q])}else{if(Array.isArray(b.__webglFramebuffer))for(let q=0;q<b.__webglFramebuffer.length;q++)i.deleteFramebuffer(b.__webglFramebuffer[q]);else i.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&i.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let q=0;q<b.__webglColorRenderbuffer.length;q++)b.__webglColorRenderbuffer[q]&&i.deleteRenderbuffer(b.__webglColorRenderbuffer[q]);b.__webglDepthRenderbuffer&&i.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const V=C.textures;for(let q=0,Q=V.length;q<Q;q++){const le=n.get(V[q]);le.__webglTexture&&(i.deleteTexture(le.__webglTexture),a.memory.textures--),n.remove(V[q])}n.remove(C)}let B=0;function U(){B=0}function L(){return B}function O(C){B=C}function F(){const C=B;return C>=r.maxTextures&&Be("WebGLTextures: Trying to use "+(C+1)+" texture units while this GPU supports only "+r.maxTextures),B+=1,C}function Y(C){const b=[];return b.push(C.wrapS),b.push(C.wrapT),b.push(C.wrapR||0),b.push(C.magFilter),b.push(C.minFilter),b.push(C.anisotropy),b.push(C.internalFormat),b.push(C.format),b.push(C.type),b.push(C.generateMipmaps),b.push(C.premultiplyAlpha),b.push(C.flipY),b.push(C.unpackAlignment),b.push(C.colorSpace),b.join()}function j(C,b){const V=n.get(C);if(C.isVideoTexture&&z(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&V.__version!==C.version){const q=C.image;if(q===null)Be("WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)Be("WebGLRenderer: Texture marked for update but image is incomplete");else{se(V,C,b);return}}else C.isExternalTexture&&(V.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,V.__webglTexture,i.TEXTURE0+b)}function X(C,b){const V=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&V.__version!==C.version){se(V,C,b);return}else C.isExternalTexture&&(V.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,V.__webglTexture,i.TEXTURE0+b)}function te(C,b){const V=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&V.__version!==C.version){se(V,C,b);return}t.bindTexture(i.TEXTURE_3D,V.__webglTexture,i.TEXTURE0+b)}function N(C,b){const V=n.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&V.__version!==C.version){ve(V,C,b);return}t.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture,i.TEXTURE0+b)}const ne={[uo]:i.REPEAT,[$n]:i.CLAMP_TO_EDGE,[fo]:i.MIRRORED_REPEAT},oe={[Dt]:i.NEAREST,[Am]:i.NEAREST_MIPMAP_NEAREST,[Jr]:i.NEAREST_MIPMAP_LINEAR,[Lt]:i.LINEAR,[_a]:i.LINEAR_MIPMAP_NEAREST,[Ai]:i.LINEAR_MIPMAP_LINEAR},Se={[Pm]:i.NEVER,[Fm]:i.ALWAYS,[Dm]:i.LESS,[xl]:i.LEQUAL,[Im]:i.EQUAL,[vl]:i.GEQUAL,[Um]:i.GREATER,[Nm]:i.NOTEQUAL};function Ue(C,b){if(b.type===Nn&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===Lt||b.magFilter===_a||b.magFilter===Jr||b.magFilter===Ai||b.minFilter===Lt||b.minFilter===_a||b.minFilter===Jr||b.minFilter===Ai)&&Be("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,ne[b.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,ne[b.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,ne[b.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,oe[b.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,oe[b.minFilter]),b.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,Se[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Dt||b.minFilter!==Jr&&b.minFilter!==Ai||b.type===Nn&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){const V=e.get("EXT_texture_filter_anisotropic");i.texParameterf(C,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,r.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function He(C,b){let V=!1;C.__webglInit===void 0&&(C.__webglInit=!0,b.addEventListener("dispose",R));const q=b.source;let Q=f.get(q);Q===void 0&&(Q={},f.set(q,Q));const le=Y(b);if(le!==C.__cacheKey){Q[le]===void 0&&(Q[le]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,V=!0),Q[le].usedTimes++;const he=Q[C.__cacheKey];he!==void 0&&(Q[C.__cacheKey].usedTimes--,he.usedTimes===0&&P(b)),C.__cacheKey=le,C.__webglTexture=Q[le].texture}return V}function I(C,b,V){return Math.floor(Math.floor(C/V)/b)}function K(C,b,V,q){const le=C.updateRanges;if(le.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,b.width,b.height,V,q,b.data);else{le.sort((Pe,me)=>Pe.start-me.start);let he=0;for(let Pe=1;Pe<le.length;Pe++){const me=le[he],de=le[Pe],De=me.start+me.count,Oe=I(de.start,b.width,4),Ye=I(me.start,b.width,4);de.start<=De+1&&Oe===Ye&&I(de.start+de.count-1,b.width,4)===Oe?me.count=Math.max(me.count,de.start+de.count-me.start):(++he,le[he]=de)}le.length=he+1;const ee=t.getParameter(i.UNPACK_ROW_LENGTH),ie=t.getParameter(i.UNPACK_SKIP_PIXELS),ue=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,b.width);for(let Pe=0,me=le.length;Pe<me;Pe++){const de=le[Pe],De=Math.floor(de.start/4),Oe=Math.ceil(de.count/4),Ye=De%b.width,H=Math.floor(De/b.width),fe=Oe,re=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Ye),t.pixelStorei(i.UNPACK_SKIP_ROWS,H),t.texSubImage2D(i.TEXTURE_2D,0,Ye,H,fe,re,V,q,b.data)}C.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,ee),t.pixelStorei(i.UNPACK_SKIP_PIXELS,ie),t.pixelStorei(i.UNPACK_SKIP_ROWS,ue)}}function se(C,b,V){let q=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(q=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&(q=i.TEXTURE_3D);const Q=He(C,b),le=b.source;t.bindTexture(q,C.__webglTexture,i.TEXTURE0+V);const he=n.get(le);if(le.version!==he.__version||Q===!0){if(t.activeTexture(i.TEXTURE0+V),(typeof ImageBitmap<"u"&&b.image instanceof ImageBitmap)===!1){const re=tt.getPrimaries(tt.workingColorSpace),pe=b.colorSpace===An?null:tt.getPrimaries(b.colorSpace),Me=b.colorSpace===An||re===pe?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me)}t.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment);let ie=m(b.image,!1,r.maxTextureSize);ie=pt(b,ie);const ue=s.convert(b.format,b.colorSpace),Pe=s.convert(b.type);let me=y(b.internalFormat,ue,Pe,b.normalized,b.colorSpace,b.isVideoTexture);Ue(q,b);let de;const De=b.mipmaps,Oe=b.isVideoTexture!==!0,Ye=he.__version===void 0||Q===!0,H=le.dataReady,fe=E(b,ie);if(b.isDepthTexture)me=w(b.format===Ci,b.type),Ye&&(Oe?t.texStorage2D(i.TEXTURE_2D,1,me,ie.width,ie.height):t.texImage2D(i.TEXTURE_2D,0,me,ie.width,ie.height,0,ue,Pe,null));else if(b.isDataTexture)if(De.length>0){Oe&&Ye&&t.texStorage2D(i.TEXTURE_2D,fe,me,De[0].width,De[0].height);for(let re=0,pe=De.length;re<pe;re++)de=De[re],Oe?H&&t.texSubImage2D(i.TEXTURE_2D,re,0,0,de.width,de.height,ue,Pe,de.data):t.texImage2D(i.TEXTURE_2D,re,me,de.width,de.height,0,ue,Pe,de.data);b.generateMipmaps=!1}else Oe?(Ye&&t.texStorage2D(i.TEXTURE_2D,fe,me,ie.width,ie.height),H&&K(b,ie,ue,Pe)):t.texImage2D(i.TEXTURE_2D,0,me,ie.width,ie.height,0,ue,Pe,ie.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Oe&&Ye&&t.texStorage3D(i.TEXTURE_2D_ARRAY,fe,me,De[0].width,De[0].height,ie.depth);for(let re=0,pe=De.length;re<pe;re++)if(de=De[re],b.format!==hn)if(ue!==null)if(Oe){if(H)if(b.layerUpdates.size>0){const Me=Ec(de.width,de.height,b.format,b.type);for(const ae of b.layerUpdates){const Ie=de.data.subarray(ae*Me/de.data.BYTES_PER_ELEMENT,(ae+1)*Me/de.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,re,0,0,ae,de.width,de.height,1,ue,Ie)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,re,0,0,0,de.width,de.height,ie.depth,ue,de.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,re,me,de.width,de.height,ie.depth,0,de.data,0,0);else Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Oe?H&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,re,0,0,0,de.width,de.height,ie.depth,ue,Pe,de.data):t.texImage3D(i.TEXTURE_2D_ARRAY,re,me,de.width,de.height,ie.depth,0,ue,Pe,de.data);b.layerUpdates.size>0&&b.clearLayerUpdates()}else{Oe&&Ye&&t.texStorage2D(i.TEXTURE_2D,fe,me,De[0].width,De[0].height);for(let re=0,pe=De.length;re<pe;re++)de=De[re],b.format!==hn?ue!==null?Oe?H&&t.compressedTexSubImage2D(i.TEXTURE_2D,re,0,0,de.width,de.height,ue,de.data):t.compressedTexImage2D(i.TEXTURE_2D,re,me,de.width,de.height,0,de.data):Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Oe?H&&t.texSubImage2D(i.TEXTURE_2D,re,0,0,de.width,de.height,ue,Pe,de.data):t.texImage2D(i.TEXTURE_2D,re,me,de.width,de.height,0,ue,Pe,de.data)}else if(b.isDataArrayTexture)if(Oe){if(Ye&&t.texStorage3D(i.TEXTURE_2D_ARRAY,fe,me,ie.width,ie.height,ie.depth),H)if(b.layerUpdates.size>0){const re=Ec(ie.width,ie.height,b.format,b.type);for(const pe of b.layerUpdates){const Me=ie.data.subarray(pe*re/ie.data.BYTES_PER_ELEMENT,(pe+1)*re/ie.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,pe,ie.width,ie.height,1,ue,Pe,Me)}b.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,ue,Pe,ie.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,me,ie.width,ie.height,ie.depth,0,ue,Pe,ie.data);else if(b.isData3DTexture)Oe?(Ye&&t.texStorage3D(i.TEXTURE_3D,fe,me,ie.width,ie.height,ie.depth),H&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,ue,Pe,ie.data)):t.texImage3D(i.TEXTURE_3D,0,me,ie.width,ie.height,ie.depth,0,ue,Pe,ie.data);else if(b.isFramebufferTexture){if(Ye)if(Oe)t.texStorage2D(i.TEXTURE_2D,fe,me,ie.width,ie.height);else{let re=ie.width,pe=ie.height;for(let Me=0;Me<fe;Me++)t.texImage2D(i.TEXTURE_2D,Me,me,re,pe,0,ue,Pe,null),re>>=1,pe>>=1}}else if(b.isHTMLTexture){if("texElementImage2D"in i){const re=i.canvas;if(re.hasAttribute("layoutsubtree")||re.setAttribute("layoutsubtree","true"),ie.parentNode!==re){re.appendChild(ie),d.add(b),re.onpaint=pe=>{const Me=pe.changedElements;for(const ae of d)Me.includes(ae.image)&&(ae.needsUpdate=!0)},re.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ie);else{const Me=i.RGBA,ae=i.RGBA,Ie=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Me,ae,Ie,ie)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(De.length>0){if(Oe&&Ye){const re=ke(De[0]);t.texStorage2D(i.TEXTURE_2D,fe,me,re.width,re.height)}for(let re=0,pe=De.length;re<pe;re++)de=De[re],Oe?H&&t.texSubImage2D(i.TEXTURE_2D,re,0,0,ue,Pe,de):t.texImage2D(i.TEXTURE_2D,re,me,ue,Pe,de);b.generateMipmaps=!1}else if(Oe){if(Ye){const re=ke(ie);t.texStorage2D(i.TEXTURE_2D,fe,me,re.width,re.height)}H&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ue,Pe,ie)}else t.texImage2D(i.TEXTURE_2D,0,me,ue,Pe,ie);p(b)&&_(q),he.__version=le.version,b.onUpdate&&b.onUpdate(b)}C.__version=b.version}function ve(C,b,V){if(b.image.length!==6)return;const q=He(C,b),Q=b.source;t.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+V);const le=n.get(Q);if(Q.version!==le.__version||q===!0){t.activeTexture(i.TEXTURE0+V);const he=tt.getPrimaries(tt.workingColorSpace),ee=b.colorSpace===An?null:tt.getPrimaries(b.colorSpace),ie=b.colorSpace===An||he===ee?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ie);const ue=b.isCompressedTexture||b.image[0].isCompressedTexture,Pe=b.image[0]&&b.image[0].isDataTexture,me=[];for(let ae=0;ae<6;ae++)!ue&&!Pe?me[ae]=m(b.image[ae],!0,r.maxCubemapSize):me[ae]=Pe?b.image[ae].image:b.image[ae],me[ae]=pt(b,me[ae]);const de=me[0],De=s.convert(b.format,b.colorSpace),Oe=s.convert(b.type),Ye=y(b.internalFormat,De,Oe,b.normalized,b.colorSpace),H=b.isVideoTexture!==!0,fe=le.__version===void 0||q===!0,re=Q.dataReady;let pe=E(b,de);Ue(i.TEXTURE_CUBE_MAP,b);let Me;if(ue){H&&fe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,pe,Ye,de.width,de.height);for(let ae=0;ae<6;ae++){Me=me[ae].mipmaps;for(let Ie=0;Ie<Me.length;Ie++){const Re=Me[Ie];b.format!==hn?De!==null?H?re&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ie,0,0,Re.width,Re.height,De,Re.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ie,Ye,Re.width,Re.height,0,Re.data):Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):H?re&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ie,0,0,Re.width,Re.height,De,Oe,Re.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ie,Ye,Re.width,Re.height,0,De,Oe,Re.data)}}}else{if(Me=b.mipmaps,H&&fe){Me.length>0&&pe++;const ae=ke(me[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,pe,Ye,ae.width,ae.height)}for(let ae=0;ae<6;ae++)if(Pe){H?re&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,me[ae].width,me[ae].height,De,Oe,me[ae].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Ye,me[ae].width,me[ae].height,0,De,Oe,me[ae].data);for(let Ie=0;Ie<Me.length;Ie++){const St=Me[Ie].image[ae].image;H?re&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ie+1,0,0,St.width,St.height,De,Oe,St.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ie+1,Ye,St.width,St.height,0,De,Oe,St.data)}}else{H?re&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,De,Oe,me[ae]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Ye,De,Oe,me[ae]);for(let Ie=0;Ie<Me.length;Ie++){const Re=Me[Ie];H?re&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ie+1,0,0,De,Oe,Re.image[ae]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ie+1,Ye,De,Oe,Re.image[ae])}}}p(b)&&_(i.TEXTURE_CUBE_MAP),le.__version=Q.version,b.onUpdate&&b.onUpdate(b)}C.__version=b.version}function ce(C,b,V,q,Q,le){const he=s.convert(V.format,V.colorSpace),ee=s.convert(V.type),ie=y(V.internalFormat,he,ee,V.normalized,V.colorSpace),ue=n.get(b),Pe=n.get(V);if(Pe.__renderTarget=b,!ue.__hasExternalTextures){const me=Math.max(1,b.width>>le),de=Math.max(1,b.height>>le);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?t.texImage3D(Q,le,ie,me,de,b.depth,0,he,ee,null):t.texImage2D(Q,le,ie,me,de,0,he,ee,null)}t.bindFramebuffer(i.FRAMEBUFFER,C),Ve(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,Q,Pe.__webglTexture,0,Mt(b)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,q,Q,Pe.__webglTexture,le),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Te(C,b,V){if(i.bindRenderbuffer(i.RENDERBUFFER,C),b.depthBuffer){const q=b.depthTexture,Q=q&&q.isDepthTexture?q.type:null,le=w(b.stencilBuffer,Q),he=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Ve(b)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Mt(b),le,b.width,b.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,Mt(b),le,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,le,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,he,i.RENDERBUFFER,C)}else{const q=b.textures;for(let Q=0;Q<q.length;Q++){const le=q[Q],he=s.convert(le.format,le.colorSpace),ee=s.convert(le.type),ie=y(le.internalFormat,he,ee,le.normalized,le.colorSpace);Ve(b)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Mt(b),ie,b.width,b.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,Mt(b),ie,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,ie,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ze(C,b,V){const q=b.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,C),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Q=n.get(b.depthTexture);if(Q.__renderTarget=b,(!Q.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),q){if(Q.__webglInit===void 0&&(Q.__webglInit=!0,b.depthTexture.addEventListener("dispose",R)),Q.__webglTexture===void 0){Q.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture),Ue(i.TEXTURE_CUBE_MAP,b.depthTexture);const ue=s.convert(b.depthTexture.format),Pe=s.convert(b.depthTexture.type);let me;b.depthTexture.format===Qn?me=i.DEPTH_COMPONENT24:b.depthTexture.format===Ci&&(me=i.DEPTH24_STENCIL8);for(let de=0;de<6;de++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,me,b.width,b.height,0,ue,Pe,null)}}else j(b.depthTexture,0);const le=Q.__webglTexture,he=Mt(b),ee=q?i.TEXTURE_CUBE_MAP_POSITIVE_X+V:i.TEXTURE_2D,ie=b.depthTexture.format===Ci?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(b.depthTexture.format===Qn)Ve(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ie,ee,le,0,he):i.framebufferTexture2D(i.FRAMEBUFFER,ie,ee,le,0);else if(b.depthTexture.format===Ci)Ve(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ie,ee,le,0,he):i.framebufferTexture2D(i.FRAMEBUFFER,ie,ee,le,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ne(C){const b=n.get(C),V=C.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==C.depthTexture){const q=C.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),q){const Q=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,q.removeEventListener("dispose",Q)};q.addEventListener("dispose",Q),b.__depthDisposeCallback=Q}b.__boundDepthTexture=q}if(C.depthTexture&&!b.__autoAllocateDepthBuffer)if(V)for(let q=0;q<6;q++)ze(b.__webglFramebuffer[q],C,q);else{const q=C.texture.mipmaps;q&&q.length>0?ze(b.__webglFramebuffer[0],C,0):ze(b.__webglFramebuffer,C,0)}else if(V){b.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[q]),b.__webglDepthbuffer[q]===void 0)b.__webglDepthbuffer[q]=i.createRenderbuffer(),Te(b.__webglDepthbuffer[q],C,!1);else{const Q=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,le=b.__webglDepthbuffer[q];i.bindRenderbuffer(i.RENDERBUFFER,le),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,le)}}else{const q=C.texture.mipmaps;if(q&&q.length>0?t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=i.createRenderbuffer(),Te(b.__webglDepthbuffer,C,!1);else{const Q=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,le=b.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,le),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,le)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Je(C,b,V){const q=n.get(C);b!==void 0&&ce(q.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),V!==void 0&&Ne(C)}function ft(C){const b=C.texture,V=n.get(C),q=n.get(b);C.addEventListener("dispose",M);const Q=C.textures,le=C.isWebGLCubeRenderTarget===!0,he=Q.length>1;if(he||(q.__webglTexture===void 0&&(q.__webglTexture=i.createTexture()),q.__version=b.version,a.memory.textures++),le){V.__webglFramebuffer=[];for(let ee=0;ee<6;ee++)if(b.mipmaps&&b.mipmaps.length>0){V.__webglFramebuffer[ee]=[];for(let ie=0;ie<b.mipmaps.length;ie++)V.__webglFramebuffer[ee][ie]=i.createFramebuffer()}else V.__webglFramebuffer[ee]=i.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){V.__webglFramebuffer=[];for(let ee=0;ee<b.mipmaps.length;ee++)V.__webglFramebuffer[ee]=i.createFramebuffer()}else V.__webglFramebuffer=i.createFramebuffer();if(he)for(let ee=0,ie=Q.length;ee<ie;ee++){const ue=n.get(Q[ee]);ue.__webglTexture===void 0&&(ue.__webglTexture=i.createTexture(),a.memory.textures++)}if(C.samples>0&&Ve(C)===!1){V.__webglMultisampledFramebuffer=i.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let ee=0;ee<Q.length;ee++){const ie=Q[ee];V.__webglColorRenderbuffer[ee]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,V.__webglColorRenderbuffer[ee]);const ue=s.convert(ie.format,ie.colorSpace),Pe=s.convert(ie.type),me=y(ie.internalFormat,ue,Pe,ie.normalized,ie.colorSpace,C.isXRRenderTarget===!0),de=Mt(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,de,me,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ee,i.RENDERBUFFER,V.__webglColorRenderbuffer[ee])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(V.__webglDepthRenderbuffer=i.createRenderbuffer(),Te(V.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(le){t.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),Ue(i.TEXTURE_CUBE_MAP,b);for(let ee=0;ee<6;ee++)if(b.mipmaps&&b.mipmaps.length>0)for(let ie=0;ie<b.mipmaps.length;ie++)ce(V.__webglFramebuffer[ee][ie],C,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ie);else ce(V.__webglFramebuffer[ee],C,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0);p(b)&&_(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(he){for(let ee=0,ie=Q.length;ee<ie;ee++){const ue=Q[ee],Pe=n.get(ue);let me=i.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(me=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(me,Pe.__webglTexture),Ue(me,ue),ce(V.__webglFramebuffer,C,ue,i.COLOR_ATTACHMENT0+ee,me,0),p(ue)&&_(me)}t.unbindTexture()}else{let ee=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ee=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ee,q.__webglTexture),Ue(ee,b),b.mipmaps&&b.mipmaps.length>0)for(let ie=0;ie<b.mipmaps.length;ie++)ce(V.__webglFramebuffer[ie],C,b,i.COLOR_ATTACHMENT0,ee,ie);else ce(V.__webglFramebuffer,C,b,i.COLOR_ATTACHMENT0,ee,0);p(b)&&_(ee),t.unbindTexture()}C.depthBuffer&&Ne(C)}function Ke(C){const b=C.textures;for(let V=0,q=b.length;V<q;V++){const Q=b[V];if(p(Q)){const le=S(C),he=n.get(Q).__webglTexture;t.bindTexture(le,he),_(le),t.unbindTexture()}}}const gt=[],Rt=[];function It(C){if(C.samples>0){if(Ve(C)===!1){const b=C.textures,V=C.width,q=C.height;let Q=i.COLOR_BUFFER_BIT;const le=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,he=n.get(C),ee=b.length>1;if(ee)for(let ue=0;ue<b.length;ue++)t.bindFramebuffer(i.FRAMEBUFFER,he.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,he.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,he.__webglMultisampledFramebuffer);const ie=C.texture.mipmaps;ie&&ie.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,he.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,he.__webglFramebuffer);for(let ue=0;ue<b.length;ue++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),ee){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,he.__webglColorRenderbuffer[ue]);const Pe=n.get(b[ue]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Pe,0)}i.blitFramebuffer(0,0,V,q,0,0,V,q,Q,i.NEAREST),c===!0&&(gt.length=0,Rt.length=0,gt.push(i.COLOR_ATTACHMENT0+ue),C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&(gt.push(le),Rt.push(le),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Rt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,gt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ee)for(let ue=0;ue<b.length;ue++){t.bindFramebuffer(i.FRAMEBUFFER,he.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.RENDERBUFFER,he.__webglColorRenderbuffer[ue]);const Pe=n.get(b[ue]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,he.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.TEXTURE_2D,Pe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,he.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&c){const b=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[b])}}}function Mt(C){return Math.min(r.maxSamples,C.samples)}function Ve(C){const b=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function z(C){const b=a.render.frame;u.get(C)!==b&&(u.set(C,b),C.update())}function pt(C,b){const V=C.colorSpace,q=C.format,Q=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||V!==Vr&&V!==An&&(tt.getTransfer(V)===mt?(q!==hn||Q!==cn)&&Be("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):rt("WebGLTextures: Unsupported texture color space:",V)),b}function ke(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=F,this.resetTextureUnits=U,this.getTextureUnits=L,this.setTextureUnits=O,this.setTexture2D=j,this.setTexture2DArray=X,this.setTexture3D=te,this.setTextureCube=N,this.rebindTextures=Je,this.setupRenderTarget=ft,this.updateRenderTargetMipmap=Ke,this.updateMultisampleRenderTarget=It,this.setupDepthRenderbuffer=Ne,this.setupFrameBufferTexture=ce,this.useMultisampledRTT=Ve,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function h_(i,e){function t(n,r=An){let s;const a=tt.getTransfer(r);if(n===cn)return i.UNSIGNED_BYTE;if(n===dl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===fl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Uh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Nh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Dh)return i.BYTE;if(n===Ih)return i.SHORT;if(n===Gr)return i.UNSIGNED_SHORT;if(n===ul)return i.INT;if(n===kn)return i.UNSIGNED_INT;if(n===Nn)return i.FLOAT;if(n===Gn)return i.HALF_FLOAT;if(n===Fh)return i.ALPHA;if(n===Oh)return i.RGB;if(n===hn)return i.RGBA;if(n===Qn)return i.DEPTH_COMPONENT;if(n===Ci)return i.DEPTH_STENCIL;if(n===Bh)return i.RED;if(n===pl)return i.RED_INTEGER;if(n===Ui)return i.RG;if(n===ml)return i.RG_INTEGER;if(n===gl)return i.RGBA_INTEGER;if(n===Ds||n===Is||n===Us||n===Ns)if(a===mt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Ds)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Is)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Us)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ns)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Ds)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Is)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Us)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ns)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===po||n===mo||n===go||n===xo)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===po)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===mo)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===go)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===xo)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===vo||n===_o||n===Mo||n===So||n===yo||n===Gs||n===bo)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===vo||n===_o)return a===mt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Mo)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===So)return s.COMPRESSED_R11_EAC;if(n===yo)return s.COMPRESSED_SIGNED_R11_EAC;if(n===Gs)return s.COMPRESSED_RG11_EAC;if(n===bo)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===wo||n===Eo||n===To||n===Ao||n===Co||n===Ro||n===Lo||n===Po||n===Do||n===Io||n===Uo||n===No||n===Fo||n===Oo)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===wo)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Eo)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===To)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ao)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Co)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ro)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Lo)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Po)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Do)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Io)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Uo)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===No)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Fo)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Oo)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Bo||n===zo||n===ko)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Bo)return a===mt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===zo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ko)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Go||n===Ho||n===Hs||n===Vo)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Go)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Ho)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Hs)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Vo)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Hr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const u_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,d_=`
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

}`;class f_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Kh(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new wt({vertexShader:u_,fragmentShader:d_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Vt(new pn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class p_ extends Oi{constructor(e,t){super();const n=this;let r=null,s=1,a=null,o="local-floor",c=1,l=null,u=null,d=null,h=null,f=null,g=null;const x=typeof XRWebGLBinding<"u",m=new f_,p={},_=t.getContextAttributes();let S=null,y=null;const w=[],E=[],R=new Ge;let M=null,A=null;const P=new ln;P.viewport=new ot;const D=new ln;D.viewport=new ot;const B=[P,D],U=new y0;let L=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(I){let K=w[I];return K===void 0&&(K=new Ca,w[I]=K),K.getTargetRaySpace()},this.getControllerGrip=function(I){let K=w[I];return K===void 0&&(K=new Ca,w[I]=K),K.getGripSpace()},this.getHand=function(I){let K=w[I];return K===void 0&&(K=new Ca,w[I]=K),K.getHandSpace()};function F(I){const K=E.indexOf(I.inputSource);if(K===-1)return;const se=w[K];se!==void 0&&(se.update(I.inputSource,I.frame,l||a),se.dispatchEvent({type:I.type,data:I.inputSource}))}function Y(){r.removeEventListener("select",F),r.removeEventListener("selectstart",F),r.removeEventListener("selectend",F),r.removeEventListener("squeeze",F),r.removeEventListener("squeezestart",F),r.removeEventListener("squeezeend",F),r.removeEventListener("end",Y),r.removeEventListener("inputsourceschange",j);for(let I=0;I<w.length;I++){const K=E[I];K!==null&&(E[I]=null,w[I].disconnect(K))}L=null,O=null,m.reset();for(const I in p)delete p[I];if(e.setRenderTarget(S),f=null,h=null,d=null,r=null,y=null,He.stop(),n.isPresenting=!1,e.setPixelRatio(M),e.setSize(R.width,R.height,!1),A!==null){const I=A.camera;I.fov=A.fov,I.zoom=A.zoom,I.updateProjectionMatrix(),A=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(I){s=I,n.isPresenting===!0&&Be("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(I){o=I,n.isPresenting===!0&&Be("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(I){l=I},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(I){if(r=I,r!==null){if(S=e.getRenderTarget(),r.addEventListener("select",F),r.addEventListener("selectstart",F),r.addEventListener("selectend",F),r.addEventListener("squeeze",F),r.addEventListener("squeezestart",F),r.addEventListener("squeezeend",F),r.addEventListener("end",Y),r.addEventListener("inputsourceschange",j),_.xrCompatible!==!0&&await t.makeXRCompatible(),M=e.getPixelRatio(),e.getSize(R),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let se=null,ve=null,ce=null;_.depth&&(ce=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,se=_.stencil?Ci:Qn,ve=_.stencil?Hr:kn);const Te={colorFormat:t.RGBA8,depthFormat:ce,scaleFactor:s};d=this.getBinding(),h=d.createProjectionLayer(Te),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),y=new Mn(h.textureWidth,h.textureHeight,{format:hn,type:cn,depthTexture:new gr(h.textureWidth,h.textureHeight,ve,void 0,void 0,void 0,void 0,void 0,void 0,se),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{const se={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,t,se),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Mn(f.framebufferWidth,f.framebufferHeight,{format:hn,type:cn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),He.setContext(r),He.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function j(I){for(let K=0;K<I.removed.length;K++){const se=I.removed[K],ve=E.indexOf(se);ve>=0&&(E[ve]=null,w[ve].disconnect(se))}for(let K=0;K<I.added.length;K++){const se=I.added[K];let ve=E.indexOf(se);if(ve===-1){for(let Te=0;Te<w.length;Te++)if(Te>=E.length){E.push(se),ve=Te;break}else if(E[Te]===null){E[Te]=se,ve=Te;break}if(ve===-1)break}const ce=w[ve];ce&&ce.connect(se)}}const X=new W,te=new W;function N(I,K,se){X.setFromMatrixPosition(K.matrixWorld),te.setFromMatrixPosition(se.matrixWorld);const ve=X.distanceTo(te),ce=K.projectionMatrix.elements,Te=se.projectionMatrix.elements,ze=ce[14]/(ce[10]-1),Ne=ce[14]/(ce[10]+1),Je=(ce[9]+1)/ce[5],ft=(ce[9]-1)/ce[5],Ke=(ce[8]-1)/ce[0],gt=(Te[8]+1)/Te[0],Rt=ze*Ke,It=ze*gt,Mt=ve/(-Ke+gt),Ve=Mt*-Ke;if(K.matrixWorld.decompose(I.position,I.quaternion,I.scale),I.translateX(Ve),I.translateZ(Mt),I.matrixWorld.compose(I.position,I.quaternion,I.scale),I.matrixWorldInverse.copy(I.matrixWorld).invert(),ce[10]===-1)I.projectionMatrix.copy(K.projectionMatrix),I.projectionMatrixInverse.copy(K.projectionMatrixInverse);else{const z=ze+Mt,pt=Ne+Mt,ke=Rt-Ve,C=It+(ve-Ve),b=Je*Ne/pt*z,V=ft*Ne/pt*z;I.projectionMatrix.makePerspective(ke,C,b,V,z,pt),I.projectionMatrixInverse.copy(I.projectionMatrix).invert()}}function ne(I,K){K===null?I.matrixWorld.copy(I.matrix):I.matrixWorld.multiplyMatrices(K.matrixWorld,I.matrix),I.matrixWorldInverse.copy(I.matrixWorld).invert()}this.updateCamera=function(I){if(r===null)return;let K=I.near,se=I.far;m.texture!==null&&(m.depthNear>0&&(K=m.depthNear),m.depthFar>0&&(se=m.depthFar)),U.near=D.near=P.near=K,U.far=D.far=P.far=se,(L!==U.near||O!==U.far)&&(r.updateRenderState({depthNear:U.near,depthFar:U.far}),L=U.near,O=U.far),U.layers.mask=I.layers.mask|6,P.layers.mask=U.layers.mask&-5,D.layers.mask=U.layers.mask&-3;const ve=I.parent,ce=U.cameras;ne(U,ve);for(let Te=0;Te<ce.length;Te++)ne(ce[Te],ve);ce.length===2?N(U,P,D):U.projectionMatrix.copy(P.projectionMatrix),A===null&&I.isPerspectiveCamera&&(A={camera:I,fov:I.fov,zoom:I.zoom}),oe(I,U,ve)};function oe(I,K,se){se===null?I.matrix.copy(K.matrixWorld):(I.matrix.copy(se.matrixWorld),I.matrix.invert(),I.matrix.multiply(K.matrixWorld)),I.matrix.decompose(I.position,I.quaternion,I.scale),I.updateMatrixWorld(!0),I.projectionMatrix.copy(K.projectionMatrix),I.projectionMatrixInverse.copy(K.projectionMatrixInverse),I.isPerspectiveCamera&&(I.fov=Wo*2*Math.atan(1/I.projectionMatrix.elements[5]),I.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(h===null&&f===null))return c},this.setFoveation=function(I){c=I,h!==null&&(h.fixedFoveation=I),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=I)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(U)},this.getCameraTexture=function(I){return p[I]};let Se=null;function Ue(I,K){if(u=K.getViewerPose(l||a),g=K,u!==null){const se=u.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let ve=!1;se.length!==U.cameras.length&&(U.cameras.length=0,ve=!0);for(let Ne=0;Ne<se.length;Ne++){const Je=se[Ne];let ft=null;if(f!==null)ft=f.getViewport(Je);else{const gt=d.getViewSubImage(h,Je);ft=gt.viewport,Ne===0&&(e.setRenderTargetTextures(y,gt.colorTexture,gt.depthStencilTexture),e.setRenderTarget(y))}let Ke=B[Ne];Ke===void 0&&(Ke=new ln,Ke.layers.enable(Ne),Ke.viewport=new ot,B[Ne]=Ke),Ke.matrix.fromArray(Je.transform.matrix),Ke.matrix.decompose(Ke.position,Ke.quaternion,Ke.scale),Ke.projectionMatrix.fromArray(Je.projectionMatrix),Ke.projectionMatrixInverse.copy(Ke.projectionMatrix).invert(),Ke.viewport.set(ft.x,ft.y,ft.width,ft.height),Ne===0&&(U.matrix.copy(Ke.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),ve===!0&&U.cameras.push(Ke)}const ce=r.enabledFeatures;if(ce&&ce.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&x){d=n.getBinding();const Ne=d.getDepthInformation(se[0]);Ne&&Ne.isValid&&Ne.texture&&m.init(Ne,r.renderState)}if(ce&&ce.includes("camera-access")&&x){e.state.unbindTexture(),d=n.getBinding();for(let Ne=0;Ne<se.length;Ne++){const Je=se[Ne].camera;if(Je){let ft=p[Je];ft||(ft=new Kh,p[Je]=ft);const Ke=d.getCameraImage(Je);ft.sourceTexture=Ke}}}}for(let se=0;se<w.length;se++){const ve=E[se],ce=w[se];ve!==null&&ce!==void 0&&ce.update(ve,K,l||a)}Se&&Se(I,K),K.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:K}),g=null}const He=new Qh;He.setAnimationLoop(Ue),this.setAnimationLoop=function(I){Se=I},this.dispose=function(){}}}const m_=new Ct,su=new We;su.set(-1,0,0,0,1,0,0,0,1);function g_(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,$h(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,_,S,y){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?s(m,p):p.isMeshLambertMaterial?(s(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(s(m,p),d(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(s(m,p),h(m,p),p.isMeshPhysicalMaterial&&f(m,p,y)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),x(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,_,S):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===nn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===nn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const _=e.get(p),S=_.envMap,y=_.envMapRotation;S&&(m.envMap.value=S,m.envMapRotation.value.setFromMatrix4(m_.makeRotationFromEuler(y)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(su),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,_,S){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*_,m.scale.value=S*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,_){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===nn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.retroreflectivity>0&&(m.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=_.texture,m.transmissionSamplerSize.value.set(_.width,_.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){const _=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(_.matrixWorld),m.nearDistance.value=_.shadow.camera.near,m.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function x_(i,e,t,n){let r={},s={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,w){const E=w.program;n.uniformBlockBinding(y,E)}function l(y,w){let E=r[y.id];E===void 0&&(m(y),E=u(y),r[y.id]=E,y.addEventListener("dispose",_));const R=w.program;n.updateUBOMapping(y,R);const M=e.render.frame;s[y.id]!==M&&(h(y),s[y.id]=M)}function u(y){const w=d();y.__bindingPointIndex=w;const E=i.createBuffer(),R=y.__size,M=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,R,M),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,w,E),E}function d(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return rt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(y){const w=r[y.id],E=y.uniforms,R=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let M=0,A=E.length;M<A;M++){const P=E[M];if(Array.isArray(P))for(let D=0,B=P.length;D<B;D++)f(P[D],M,D,R);else f(P,M,0,R)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(y,w,E,R){if(x(y,w,E,R)===!0){const M=y.__offset,A=y.value;if(Array.isArray(A)){let P=0;for(let D=0;D<A.length;D++){const B=A[D],U=p(B);g(B,y.__data,P),typeof B!="number"&&typeof B!="boolean"&&!B.isMatrix3&&!ArrayBuffer.isView(B)&&(P+=U.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(A,y.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,M,y.__data)}}function g(y,w,E){typeof y=="number"||typeof y=="boolean"?w[0]=y:y.isMatrix3?(w[0]=y.elements[0],w[1]=y.elements[1],w[2]=y.elements[2],w[3]=0,w[4]=y.elements[3],w[5]=y.elements[4],w[6]=y.elements[5],w[7]=0,w[8]=y.elements[6],w[9]=y.elements[7],w[10]=y.elements[8],w[11]=0):ArrayBuffer.isView(y)?w.set(new y.constructor(y.buffer,y.byteOffset,w.length)):y.toArray(w,E)}function x(y,w,E,R){const M=y.value,A=w+"_"+E;if(R[A]===void 0)return typeof M=="number"||typeof M=="boolean"?R[A]=M:ArrayBuffer.isView(M)?R[A]=M.slice():R[A]=M.clone(),!0;{const P=R[A];if(typeof M=="number"||typeof M=="boolean"){if(P!==M)return R[A]=M,!0}else{if(ArrayBuffer.isView(M))return!0;if(P.equals(M)===!1)return P.copy(M),!0}}return!1}function m(y){const w=y.uniforms;let E=0;const R=16;for(let A=0,P=w.length;A<P;A++){const D=Array.isArray(w[A])?w[A]:[w[A]];for(let B=0,U=D.length;B<U;B++){const L=D[B],O=Array.isArray(L.value)?L.value:[L.value];for(let F=0,Y=O.length;F<Y;F++){const j=O[F],X=p(j),te=E%R,N=te%X.boundary,ne=te+N;E+=N,ne!==0&&R-ne<X.storage&&(E+=R-ne),L.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=E,E+=X.storage}}}const M=E%R;return M>0&&(E+=R-M),y.__size=E,y.__cache={},this}function p(y){const w={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(w.boundary=4,w.storage=4):y.isVector2?(w.boundary=8,w.storage=8):y.isVector3||y.isColor?(w.boundary=16,w.storage=12):y.isVector4?(w.boundary=16,w.storage=16):y.isMatrix3?(w.boundary=48,w.storage=48):y.isMatrix4?(w.boundary=64,w.storage=64):y.isTexture?Be("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(w.boundary=16,w.storage=y.byteLength):Be("WebGLRenderer: Unsupported uniform value type.",y),w}function _(y){const w=y.target;w.removeEventListener("dispose",_);const E=a.indexOf(w.__bindingPointIndex);a.splice(E,1),i.deleteBuffer(r[w.id]),delete r[w.id],delete s[w.id]}function S(){for(const y in r)i.deleteBuffer(r[y]);a=[],r={},s={}}return{bind:c,update:l,dispose:S}}const v_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let In=null;function __(){return In===null&&(In=new rr(v_,16,16,Ui,Gn),In.name="DFG_LUT",In.minFilter=Lt,In.magFilter=Lt,In.wrapS=$n,In.wrapT=$n,In.generateMipmaps=!1,In.needsUpdate=!0),In}class M_{constructor(e={}){const{canvas:t=zm(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1,outputBufferType:f=cn}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const x=f,m=new Set([gl,ml,pl]),p=new Set([cn,kn,Gr,Hr,dl,fl]),_=new Uint32Array(4),S=new Int32Array(4),y=new W;let w=null,E=null;const R=[],M=[];let A=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=zn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let D=!1,B=null,U=null,L=null,O=null;this._outputColorSpace=vn;let F=0,Y=0,j=null,X=-1,te=null;const N=new ot,ne=new ot;let oe=null;const Se=new Qe(0);let Ue=0,He=t.width,I=t.height,K=1,se=null,ve=null;const ce=new ot(0,0,He,I),Te=new ot(0,0,He,I);let ze=!1;const Ne=new Ys;let Je=!1,ft=!1;const Ke=new Ct,gt=new W,Rt=new ot,It={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Mt=!1;function Ve(){return j===null?K:1}let z=n;function pt(T,G){return t.getContext(T,G)}let ke,C,b,V,q,Q,le,he,ee,ie,ue,Pe,me,de,De,Oe,Ye,H,fe,re,pe,Me,ae;try{const T={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${al}`),t.addEventListener("webglcontextlost",St,!1),t.addEventListener("webglcontextrestored",lt,!1),t.addEventListener("webglcontextcreationerror",yn,!1),z===null){const G="webgl2";if(z=pt(G,T),z===null)throw pt(G)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ie()}catch(T){throw t.removeEventListener("webglcontextlost",St,!1),t.removeEventListener("webglcontextrestored",lt,!1),t.removeEventListener("webglcontextcreationerror",yn,!1),rt("WebGLRenderer: "+T.message),T}function Ie(){ke=new _v(z),ke.init(),pe=new h_(z,ke),C=new cv(z,ke,e,pe),b=new l_(z,ke),C.reversedDepthBuffer&&h&&b.buffers.depth.setReversed(!0),U=z.createFramebuffer(),L=z.createFramebuffer(),O=z.createFramebuffer(),V=new yv(z),q=new K1,Q=new c_(z,ke,b,q,C,pe,V),le=new vv(P),he=new w0(z),Me=new ov(z,he),ee=new Mv(z,he,V,Me),ie=new wv(z,ee,he,Me,V),H=new bv(z,C,Q),De=new hv(q),ue=new q1(P,le,ke,C,Me,De),Pe=new g_(P,q),me=new Z1,de=new n_(ke),Ye=new av(P,le,b,ie,g,c),Oe=new o_(P,ie,C),ae=new x_(z,V,C,b),fe=new lv(z,ke,V),re=new Sv(z,ke,V),V.programs=ue.programs,P.capabilities=C,P.extensions=ke,P.properties=q,P.renderLists=me,P.shadowMap=Oe,P.state=b,P.info=V}x!==cn&&(A=new Tv(x,t.width,t.height,o,r,s));const Re=new p_(P,z);this.xr=Re,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){const T=ke.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=ke.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(T){T!==void 0&&(K=T,this.setSize(He,I,!1))},this.getSize=function(T){return T.set(He,I)},this.setSize=function(T,G,J=!0){if(Re.isPresenting){Be("WebGLRenderer: Can't change size while VR device is presenting.");return}He=T,I=G,t.width=Math.floor(T*K),t.height=Math.floor(G*K),J===!0&&(t.style.width=T+"px",t.style.height=G+"px"),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,T,G)},this.getDrawingBufferSize=function(T){return T.set(He*K,I*K).floor()},this.setDrawingBufferSize=function(T,G,J){He=T,I=G,K=J,t.width=Math.floor(T*J),t.height=Math.floor(G*J),this.setViewport(0,0,T,G)},this.setEffects=function(T){if(x===cn){rt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let G=0;G<T.length;G++)if(T[G].isOutputPass===!0){Be("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(N)},this.getViewport=function(T){return T.copy(ce)},this.setViewport=function(T,G,J,$){T.isVector4?ce.set(T.x,T.y,T.z,T.w):ce.set(T,G,J,$),b.viewport(N.copy(ce).multiplyScalar(K).round())},this.getScissor=function(T){return T.copy(Te)},this.setScissor=function(T,G,J,$){T.isVector4?Te.set(T.x,T.y,T.z,T.w):Te.set(T,G,J,$),b.scissor(ne.copy(Te).multiplyScalar(K).round())},this.getScissorTest=function(){return ze},this.setScissorTest=function(T){b.setScissorTest(ze=T)},this.setOpaqueSort=function(T){se=T},this.setTransparentSort=function(T){ve=T},this.getClearColor=function(T){return T.copy(Ye.getClearColor())},this.setClearColor=function(){Ye.setClearColor(...arguments)},this.getClearAlpha=function(){return Ye.getClearAlpha()},this.setClearAlpha=function(){Ye.setClearAlpha(...arguments)},this.clear=function(T=!0,G=!0,J=!0){let $=0;if(T){let Z=!1;if(j!==null){const _e=j.texture.format;Z=m.has(_e)}if(Z){const _e=j.texture.type,Ee=p.has(_e),xe=Ye.getClearColor(),Ae=Ye.getClearAlpha(),Le=xe.r,$e=xe.g,je=xe.b;Ee?(_[0]=Le,_[1]=$e,_[2]=je,_[3]=Ae,z.clearBufferuiv(z.COLOR,0,_)):(S[0]=Le,S[1]=$e,S[2]=je,S[3]=Ae,z.clearBufferiv(z.COLOR,0,S))}else $|=z.COLOR_BUFFER_BIT}G&&($|=z.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),J&&($|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),$!==0&&z.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),B=T},this.dispose=function(){t.removeEventListener("webglcontextlost",St,!1),t.removeEventListener("webglcontextrestored",lt,!1),t.removeEventListener("webglcontextcreationerror",yn,!1),Ye.dispose(),me.dispose(),de.dispose(),q.dispose(),le.dispose(),ie.dispose(),Me.dispose(),ae.dispose(),ue.dispose(),Re.dispose(),Re.removeEventListener("sessionstart",Cl),Re.removeEventListener("sessionend",Rl),xi.stop()};function St(T){T.preventDefault(),ec("WebGLRenderer: Context Lost."),D=!0}function lt(){ec("WebGLRenderer: Context Restored."),D=!1;const T=V.autoReset,G=Oe.enabled,J=Oe.autoUpdate,$=Oe.needsUpdate,Z=Oe.type;Ie(),V.autoReset=T,Oe.enabled=G,Oe.autoUpdate=J,Oe.needsUpdate=$,Oe.type=Z}function yn(T){rt("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Ln(T){const G=T.target;G.removeEventListener("dispose",Ln),pu(G)}function pu(T){mu(T),q.remove(T)}function mu(T){const G=q.get(T).programs;G!==void 0&&(G.forEach(function(J){ue.releaseProgram(J)}),T.isShaderMaterial&&ue.releaseShaderCache(T))}this.renderBufferDirect=function(T,G,J,$,Z,_e){G===null&&(G=It);const Ee=Z.isMesh&&Z.matrixWorld.determinantAffine()<0,xe=vu(T,G,J,$,Z);b.setMaterial($,Ee);let Ae=J.index,Le=1;if($.wireframe===!0){if(Ae=ee.getWireframeAttribute(J),Ae===void 0)return;Le=2}const $e=J.drawRange,je=J.attributes.position;let Ce=$e.start*Le,ct=($e.start+$e.count)*Le;_e!==null&&(Ce=Math.max(Ce,_e.start*Le),ct=Math.min(ct,(_e.start+_e.count)*Le)),Ae!==null?(Ce=Math.max(Ce,0),ct=Math.min(ct,Ae.count)):je!=null&&(Ce=Math.max(Ce,0),ct=Math.min(ct,je.count));const Nt=ct-Ce;if(Nt<0||Nt===1/0)return;Me.setup(Z,$,xe,J,Ae);let Et,_t=fe;if(Ae!==null&&(Et=he.get(Ae),_t=re,_t.setIndex(Et)),Z.isMesh)$.wireframe===!0?(b.setLineWidth($.wireframeLinewidth*Ve()),_t.setMode(z.LINES)):_t.setMode(z.TRIANGLES);else if(Z.isLine){let Yt=$.linewidth;Yt===void 0&&(Yt=1),b.setLineWidth(Yt*Ve()),Z.isLineSegments?_t.setMode(z.LINES):Z.isLineLoop?_t.setMode(z.LINE_LOOP):_t.setMode(z.LINE_STRIP)}else Z.isPoints?_t.setMode(z.POINTS):Z.isSprite&&_t.setMode(z.TRIANGLES);if(Z.isBatchedMesh)if(ke.get("WEBGL_multi_draw"))_t.renderMultiDraw(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount);else{const Yt=Z._multiDrawStarts,be=Z._multiDrawCounts,Jt=Z._multiDrawCount,it=Ae?he.get(Ae).bytesPerElement:1,gn=q.get($).currentProgram.getUniforms();for(let Pn=0;Pn<Jt;Pn++)gn.setValue(z,"_gl_DrawID",Pn),_t.render(Yt[Pn]/it,be[Pn])}else if(Z.isInstancedMesh)_t.renderInstances(Ce,Nt,Z.count);else if(J.isInstancedBufferGeometry){const Yt=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,be=Math.min(J.instanceCount,Yt);_t.renderInstances(Ce,Nt,be)}else _t.render(Ce,Nt)};function Al(T,G,J,$){B!==null&&T.isNodeMaterial&&B.setObject($,T),Je===!0&&De.setState(T,J,!1),T.transparent===!0&&T.side===Kn&&T.forceSinglePass===!1?(T.side=nn,T.needsUpdate=!0,$r(T,G,$),T.side=Di,T.needsUpdate=!0,$r(T,G,$),T.side=Kn):$r(T,G,$)}this.compile=function(T,G,J=null){J===null&&(J=T),B!==null&&B.renderStart(T,G,J),E=de.get(J),E.init(G),M.push(E),J.traverseVisible(function(Z){Z.isLight&&Z.layers.test(G.layers)&&(E.pushLight(Z),Z.castShadow&&E.pushShadow(Z))}),T!==J&&T.traverseVisible(function(Z){Z.isLight&&Z.layers.test(G.layers)&&(E.pushLight(Z),Z.castShadow&&E.pushShadow(Z))}),E.setupLights(),B!==null&&B.updateLights(E.state.lightsArray),ft=this.localClippingEnabled,Je=De.init(this.clippingPlanes,ft),Je===!0&&De.setGlobalState(this.clippingPlanes,G),B!==null&&Oe.render(E.state.shadowsArray,J,G);const $=new Set;return T.traverse(function(Z){if(!(Z.isMesh||Z.isPoints||Z.isLine||Z.isSprite))return;const _e=Z.material;if(_e)if(Array.isArray(_e))for(let Ee=0;Ee<_e.length;Ee++){const xe=_e[Ee];Al(xe,J,G,Z),$.add(xe)}else Al(_e,J,G,Z),$.add(_e)}),E=M.pop(),B!==null&&B.renderEnd(),$},this.compileAsync=function(T,G,J=null){const $=this.compile(T,G,J);return new Promise(Z=>{function _e(){if($.forEach(function(Ee){const Ae=q.get(Ee).currentProgram;(Ae===void 0||Ae.isReady())&&$.delete(Ee)}),$.size===0){Z(T);return}setTimeout(_e,10)}ke.get("KHR_parallel_shader_compile")!==null?_e():setTimeout(_e,10)})};let ua=null;function gu(T){ua&&ua(T)}function Cl(){xi.stop()}function Rl(){xi.start()}const xi=new Qh;xi.setAnimationLoop(gu),typeof self<"u"&&xi.setContext(self),this.setAnimationLoop=function(T){ua=T,Re.setAnimationLoop(T),T===null?xi.stop():xi.start()},Re.addEventListener("sessionstart",Cl),Re.addEventListener("sessionend",Rl),this.render=function(T,G){if(G!==void 0&&G.isCamera!==!0){rt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;B!==null&&B.renderStart(T,G);const J=Re.enabled===!0&&Re.isPresenting===!0,$=A!==null&&(j===null||J)&&A.begin(P,j);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),Re.enabled===!0&&Re.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(Re.cameraAutoUpdate===!0&&Re.updateCamera(G),G=Re.getCamera()),T.isScene===!0&&T.onBeforeRender(P,T,G,j),E=de.get(T,M.length),E.init(G),E.state.textureUnits=Q.getTextureUnits(),M.push(E),Ke.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),Ne.setFromProjectionMatrix(Ke,Fn,G.reversedDepth),ft=this.localClippingEnabled,Je=De.init(this.clippingPlanes,ft),w=me.get(T,R.length),w.init(),R.push(w),Re.enabled===!0&&Re.isPresenting===!0){const Ee=P.xr.getDepthSensingMesh();Ee!==null&&da(Ee,G,-1/0,P.sortObjects)}da(T,G,0,P.sortObjects),w.finish(),B!==null&&B.updateLights(E.state.lightsArray),P.sortObjects===!0&&w.sort(se,ve),Mt=Re.enabled===!1||Re.isPresenting===!1||Re.hasDepthSensing()===!1,Mt&&Ye.addToRenderList(w,T),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Je===!0&&De.beginShadows();const Z=E.state.shadowsArray;if(Oe.render(Z,T,G),Je===!0&&De.endShadows(),($&&A.hasRenderPass())===!1){const Ee=w.opaque,xe=w.transmissive;if(E.setupLights(),G.isArrayCamera){const Ae=G.cameras;if(xe.length>0)for(let Le=0,$e=Ae.length;Le<$e;Le++){const je=Ae[Le];Pl(Ee,xe,T,je)}Mt&&Ye.render(T);for(let Le=0,$e=Ae.length;Le<$e;Le++){const je=Ae[Le];Ll(w,T,je,je.viewport)}}else xe.length>0&&Pl(Ee,xe,T,G),Mt&&Ye.render(T),Ll(w,T,G)}j!==null&&Y===0&&(Q.updateMultisampleRenderTarget(j),Q.updateRenderTargetMipmap(j)),$&&A.end(P),T.isScene===!0&&T.onAfterRender(P,T,G),Me.resetDefaultState(),X=-1,te=null,M.pop(),M.length>0?(E=M[M.length-1],Q.setTextureUnits(E.state.textureUnits),Je===!0&&De.setGlobalState(P.clippingPlanes,E.state.camera)):E=null,R.pop(),R.length>0?w=R[R.length-1]:w=null,B!==null&&B.renderEnd()};function da(T,G,J,$){if(T.visible===!1)return;if(T.layers.test(G.layers)){if(T.isGroup)J=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(G);else if(T.isLightProbeGrid)E.pushLightProbeGrid(T);else if(T.isLight)E.pushLight(T),T.castShadow&&E.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||T.intersectsFrustum(Ne)){$&&Rt.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Ke);const Ee=ie.update(T),xe=T.material;xe.visible&&w.push(T,Ee,xe,J,Rt.z,null,G)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||T.intersectsFrustum(Ne))){const Ee=ie.update(T),xe=T.material;if($&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Rt.copy(T.boundingSphere.center)):(Ee.boundingSphere===null&&Ee.computeBoundingSphere(),Rt.copy(Ee.boundingSphere.center)),Rt.applyMatrix4(T.matrixWorld).applyMatrix4(Ke)),Array.isArray(xe)){const Ae=Ee.groups;for(let Le=0,$e=Ae.length;Le<$e;Le++){const je=Ae[Le],Ce=xe[je.materialIndex];Ce&&Ce.visible&&w.push(T,Ee,Ce,J,Rt.z,je,G)}}else xe.visible&&w.push(T,Ee,xe,J,Rt.z,null,G)}}const _e=T.children;for(let Ee=0,xe=_e.length;Ee<xe;Ee++)da(_e[Ee],G,J,$)}function Ll(T,G,J,$){const{opaque:Z,transmissive:_e,transparent:Ee}=T;E.setupLightsView(J),Je===!0&&De.setGlobalState(P.clippingPlanes,J),$&&b.viewport(N.copy($)),Z.length>0&&Kr(Z,G,J),_e.length>0&&Kr(_e,G,J),Ee.length>0&&Kr(Ee,G,J),b.buffers.depth.setTest(!0),b.buffers.depth.setMask(!0),b.buffers.color.setMask(!0),b.setPolygonOffset(!1)}function Pl(T,G,J,$){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[$.id]===void 0){const Ce=ke.has("EXT_color_buffer_half_float")||ke.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[$.id]=new Mn(1,1,{generateMipmaps:!0,type:Ce?Gn:cn,minFilter:Ai,samples:Math.max(4,C.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:tt.workingColorSpace})}const _e=E.state.transmissionRenderTarget[$.id],Ee=$.viewport||N;_e.setSize(Ee.z*P.transmissionResolutionScale,Ee.w*P.transmissionResolutionScale);const xe=P.getRenderTarget(),Ae=P.getActiveCubeFace(),Le=P.getActiveMipmapLevel();P.setRenderTarget(_e),P.getClearColor(Se),Ue=P.getClearAlpha(),Ue<1&&P.setClearColor(16777215,.5),P.clear(),Mt&&Ye.render(J);const $e=P.toneMapping;P.toneMapping=zn;const je=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),E.setupLightsView($),Je===!0&&De.setGlobalState(P.clippingPlanes,$),Kr(T,J,$),Q.updateMultisampleRenderTarget(_e),Q.updateRenderTargetMipmap(_e),ke.has("WEBGL_multisampled_render_to_texture")===!1){let Ce=!1;for(let ct=0,Nt=G.length;ct<Nt;ct++){const Et=G[ct],{object:_t,geometry:Yt,material:be,group:Jt}=Et;if(be.side===Kn&&_t.layers.test($.layers)){const it=be.side;be.side=nn,be.needsUpdate=!0,Dl(_t,J,$,Yt,be,Jt),be.side=it,be.needsUpdate=!0,Ce=!0}}Ce===!0&&(Q.updateMultisampleRenderTarget(_e),Q.updateRenderTargetMipmap(_e))}P.setRenderTarget(xe,Ae,Le),P.setClearColor(Se,Ue),je!==void 0&&($.viewport=je),P.toneMapping=$e}function Kr(T,G,J){const $=G.isScene===!0?G.overrideMaterial:null;for(let Z=0,_e=T.length;Z<_e;Z++){const Ee=T[Z],{object:xe,geometry:Ae,group:Le}=Ee;let $e=Ee.material;$e.allowOverride===!0&&$!==null&&($e=$),xe.layers.test(J.layers)&&Dl(xe,G,J,Ae,$e,Le)}}function Dl(T,G,J,$,Z,_e){B!==null&&Z.isNodeMaterial&&B.setObject(T,Z),T.onBeforeRender(P,G,J,$,Z,_e),T.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),Z.onBeforeRender(P,G,J,$,T,_e),Z.transparent===!0&&Z.side===Kn&&Z.forceSinglePass===!1?(Z.side=nn,Z.needsUpdate=!0,P.renderBufferDirect(J,G,$,Z,T,_e),Z.side=Di,Z.needsUpdate=!0,P.renderBufferDirect(J,G,$,Z,T,_e),Z.side=Kn):P.renderBufferDirect(J,G,$,Z,T,_e),T.onAfterRender(P,G,J,$,Z,_e)}function $r(T,G,J){G.isScene!==!0&&(G=It);const $=q.get(T),Z=E.state.lights,_e=E.state.shadowsArray,Ee=Z.state.version,xe=ue.getParameters(T,Z.state,_e,G,J,E.state.lightProbeGridArray),Ae=ue.getProgramCacheKey(xe);let Le=$.programs;$.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?G.environment:null,$.fog=G.fog;const $e=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;$.envMap=le.get(T.envMap||$.environment,$e),$.envMapRotation=$.environment!==null&&T.envMap===null?G.environmentRotation:T.envMapRotation,Le===void 0&&(T.addEventListener("dispose",Ln),Le=new Map,$.programs=Le);let je=Le.get(Ae);if(je!==void 0){if($.currentProgram===je&&$.lightsStateVersion===Ee)return Ul(T,xe),je}else xe.uniforms=ue.getUniforms(T),B!==null&&T.isNodeMaterial&&B.build(T,J,xe),T.onBeforeCompile(xe,P),je=ue.acquireProgram(xe,Ae),Le.set(Ae,je),$.uniforms=xe.uniforms;const Ce=$.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Ce.clippingPlanes=De.uniform),Ul(T,xe),$.needsLights=Mu(T),$.lightsStateVersion=Ee,$.needsLights&&(Ce.ambientLightColor.value=Z.state.ambient,Ce.lightProbe.value=Z.state.probe,Ce.sunLights.value=Z.state.sun,Ce.sunLightShadows.value=Z.state.sunShadow,Ce.directionalLights.value=Z.state.directional,Ce.directionalLightShadows.value=Z.state.directionalShadow,Ce.spotLights.value=Z.state.spot,Ce.spotLightShadows.value=Z.state.spotShadow,Ce.rectAreaLights.value=Z.state.rectArea,Ce.ltc_1.value=Z.state.rectAreaLTC1,Ce.ltc_2.value=Z.state.rectAreaLTC2,Ce.pointLights.value=Z.state.point,Ce.pointLightShadows.value=Z.state.pointShadow,Ce.hemisphereLights.value=Z.state.hemi,Ce.sunShadowMatrix.value=Z.state.sunShadowMatrix,Ce.sunShadowCascade.value=Z.state.sunShadowCascade,Ce.directionalShadowMatrix.value=Z.state.directionalShadowMatrix,Ce.spotLightMatrix.value=Z.state.spotLightMatrix,Ce.spotLightMap.value=Z.state.spotLightMap,Ce.pointShadowMatrix.value=Z.state.pointShadowMatrix),$.lightProbeGrid=E.state.lightProbeGridArray.length>0,$.currentProgram=je,$.uniformsList=null,je}function Il(T){if(T.uniformsList===null){const G=T.currentProgram.getUniforms();T.uniformsList=Fs.seqWithValue(G.seq,T.uniforms)}return T.uniformsList}function Ul(T,G){const J=q.get(T);J.outputColorSpace=G.outputColorSpace,J.batching=G.batching,J.batchingColor=G.batchingColor,J.instancing=G.instancing,J.instancingColor=G.instancingColor,J.instancingMorph=G.instancingMorph,J.skinning=G.skinning,J.morphTargets=G.morphTargets,J.morphNormals=G.morphNormals,J.morphColors=G.morphColors,J.morphTargetsCount=G.morphTargetsCount,J.numClippingPlanes=G.numClippingPlanes,J.numIntersection=G.numClipIntersection,J.vertexAlphas=G.vertexAlphas,J.vertexTangents=G.vertexTangents,J.toneMapping=G.toneMapping}function xu(T,G){if(T.length===0)return null;if(T.length===1)return T[0].texture!==null?T[0]:null;y.setFromMatrixPosition(G.matrixWorld);for(let J=0,$=T.length;J<$;J++){const Z=T[J];if(Z.texture!==null&&Z.boundingBox.containsPoint(y))return Z}return null}function vu(T,G,J,$,Z){G.isScene!==!0&&(G=It),Q.resetTextureUnits();const _e=G.fog,Ee=$.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial?G.environment:null,xe=j===null?P.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:tt.workingColorSpace,Ae=$.isMeshStandardMaterial||$.isMeshLambertMaterial&&!$.envMap||$.isMeshPhongMaterial&&!$.envMap,Le=le.get($.envMap||Ee,Ae),$e=$.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,je=!!J.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),Ce=!!J.morphAttributes.position,ct=!!J.morphAttributes.normal,Nt=!!J.morphAttributes.color;let Et=zn;$.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Et=P.toneMapping);const _t=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,Yt=_t!==void 0?_t.length:0,be=q.get($),Jt=E.state.lights;if(Je===!0&&(ft===!0||T!==te)){const yt=T===te&&$.id===X;De.setState($,T,yt)}let it=!1;$.version===be.__version?(be.needsLights&&be.lightsStateVersion!==Jt.state.version||be.outputColorSpace!==xe||Z.isBatchedMesh&&be.batching===!1||!Z.isBatchedMesh&&be.batching===!0||Z.isBatchedMesh&&be.batchingColor===!0&&Z._colorsTexture===null||Z.isBatchedMesh&&be.batchingColor===!1&&Z._colorsTexture!==null||Z.isInstancedMesh&&be.instancing===!1||!Z.isInstancedMesh&&be.instancing===!0||Z.isSkinnedMesh&&be.skinning===!1||!Z.isSkinnedMesh&&be.skinning===!0||Z.isInstancedMesh&&be.instancingColor===!0&&Z.instanceColor===null||Z.isInstancedMesh&&be.instancingColor===!1&&Z.instanceColor!==null||Z.isInstancedMesh&&be.instancingMorph===!0&&Z.morphTexture===null||Z.isInstancedMesh&&be.instancingMorph===!1&&Z.morphTexture!==null||be.envMap!==Le||$.fog===!0&&be.fog!==_e||be.numClippingPlanes!==void 0&&(be.numClippingPlanes!==De.numPlanes||be.numIntersection!==De.numIntersection)||be.vertexAlphas!==$e||be.vertexTangents!==je||be.morphTargets!==Ce||be.morphNormals!==ct||be.morphColors!==Nt||be.toneMapping!==Et||be.morphTargetsCount!==Yt||!!be.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(it=!0):(it=!0,be.__version=$.version);let gn=be.currentProgram;it===!0&&(gn=$r($,G,Z),B&&$.isNodeMaterial&&B.onUpdateProgram($,gn,be));let Pn=!1,ei=!1,Bi=!1;const xt=gn.getUniforms(),Ut=be.uniforms;if(b.useProgram(gn.program)&&(Pn=!0,ei=!0,Bi=!0),$.id!==X&&(X=$.id,ei=!0),be.needsLights){const yt=xu(E.state.lightProbeGridArray,Z);be.lightProbeGrid!==yt&&(be.lightProbeGrid=yt,ei=!0)}if(Pn||te!==T){b.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),xt.setValue(z,"projectionMatrix",T.projectionMatrix),xt.setValue(z,"viewMatrix",T.matrixWorldInverse);const ni=xt.map.cameraPosition;ni!==void 0&&ni.setValue(z,gt.setFromMatrixPosition(T.matrixWorld)),C.logarithmicDepthBuffer&&xt.setValue(z,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&xt.setValue(z,"isOrthographic",T.isOrthographicCamera===!0),te!==T&&(te=T,ei=!0,Bi=!0)}if(be.needsLights&&(Jt.state.sunShadowMap.length>0&&xt.setValue(z,"sunShadowMap",Jt.state.sunShadowMap,Q),Jt.state.directionalShadowMap.length>0&&xt.setValue(z,"directionalShadowMap",Jt.state.directionalShadowMap,Q),Jt.state.spotShadowMap.length>0&&xt.setValue(z,"spotShadowMap",Jt.state.spotShadowMap,Q),Jt.state.pointShadowMap.length>0&&xt.setValue(z,"pointShadowMap",Jt.state.pointShadowMap,Q)),Z.isSkinnedMesh){xt.setOptional(z,Z,"bindMatrix"),xt.setOptional(z,Z,"bindMatrixInverse");const yt=Z.skeleton;yt&&(yt.boneTexture===null&&yt.computeBoneTexture(),xt.setValue(z,"boneTexture",yt.boneTexture,Q))}Z.isBatchedMesh&&(xt.setOptional(z,Z,"batchingTexture"),xt.setValue(z,"batchingTexture",Z._matricesTexture,Q),xt.setOptional(z,Z,"batchingIdTexture"),xt.setValue(z,"batchingIdTexture",Z._indirectTexture,Q),xt.setOptional(z,Z,"batchingColorTexture"),Z._colorsTexture!==null&&xt.setValue(z,"batchingColorTexture",Z._colorsTexture,Q));const ti=J.morphAttributes;if((ti.position!==void 0||ti.normal!==void 0||ti.color!==void 0)&&H.update(Z,J,gn),(ei||be.receiveShadow!==Z.receiveShadow)&&(be.receiveShadow=Z.receiveShadow,xt.setValue(z,"receiveShadow",Z.receiveShadow)),($.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial)&&$.envMap===null&&G.environment!==null&&(Ut.envMapIntensity.value=G.environmentIntensity),Ut.dfgLUT!==void 0&&(Ut.dfgLUT.value=__()),ei){if(xt.setValue(z,"toneMappingExposure",P.toneMappingExposure),be.needsLights&&_u(Ut,Bi),_e&&$.fog===!0&&Pe.refreshFogUniforms(Ut,_e),Pe.refreshMaterialUniforms(Ut,$,K,I,E.state.transmissionRenderTarget[T.id]),be.needsLights&&be.lightProbeGrid){const yt=be.lightProbeGrid;Ut.probesSH.value=yt.texture,Ut.probesMin.value.copy(yt.boundingBox.min),Ut.probesMax.value.copy(yt.boundingBox.max),Ut.probesResolution.value.copy(yt.resolution)}Fs.upload(z,Il(be),Ut,Q)}if($.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(Fs.upload(z,Il(be),Ut,Q),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&xt.setValue(z,"center",Z.center),xt.setValue(z,"modelViewMatrix",Z.modelViewMatrix),xt.setValue(z,"normalMatrix",Z.normalMatrix),xt.setValue(z,"modelMatrix",Z.matrixWorld),$.uniformsGroups!==void 0){const yt=$.uniformsGroups;for(let ni=0,zi=yt.length;ni<zi;ni++){const Fl=yt[ni];ae.update(Fl,gn),ae.bind(Fl,gn)}}return gn}function _u(T,G){T.ambientLightColor.needsUpdate=G,T.lightProbe.needsUpdate=G,T.sunLights.needsUpdate=G,T.sunLightShadows.needsUpdate=G,T.directionalLights.needsUpdate=G,T.directionalLightShadows.needsUpdate=G,T.pointLights.needsUpdate=G,T.pointLightShadows.needsUpdate=G,T.spotLights.needsUpdate=G,T.spotLightShadows.needsUpdate=G,T.rectAreaLights.needsUpdate=G,T.hemisphereLights.needsUpdate=G}function Mu(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return F},this.getActiveMipmapLevel=function(){return Y},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(T,G,J){const $=q.get(T);$.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,$.__autoAllocateDepthBuffer===!1&&($.__useRenderToTexture=!1),q.get(T.texture).__webglTexture=G,q.get(T.depthTexture).__webglTexture=$.__autoAllocateDepthBuffer?void 0:J,$.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,G){const J=q.get(T);J.__webglFramebuffer=G,J.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(T,G=0,J=0){j=T,F=G,Y=J;let $=null,Z=!1,_e=!1;if(T){const xe=q.get(T);if(xe.__useDefaultFramebuffer!==void 0){b.bindFramebuffer(z.FRAMEBUFFER,xe.__webglFramebuffer),N.copy(T.viewport),ne.copy(T.scissor),oe=T.scissorTest,b.viewport(N),b.scissor(ne),b.setScissorTest(oe),X=-1;return}else if(xe.__webglFramebuffer===void 0)Q.setupRenderTarget(T);else if(xe.__hasExternalTextures)Q.rebindTextures(T,q.get(T.texture).__webglTexture,q.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const $e=T.depthTexture;if(xe.__boundDepthTexture!==$e){if($e!==null&&q.has($e)&&(T.width!==$e.image.width||T.height!==$e.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Q.setupDepthRenderbuffer(T)}}const Ae=T.texture;(Ae.isData3DTexture||Ae.isDataArrayTexture||Ae.isCompressedArrayTexture)&&(_e=!0);const Le=q.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Le[G])?$=Le[G][J]:$=Le[G],Z=!0):T.samples>0&&Q.useMultisampledRTT(T)===!1?$=q.get(T).__webglMultisampledFramebuffer:Array.isArray(Le)?$=Le[J]:$=Le,N.copy(T.viewport),ne.copy(T.scissor),oe=T.scissorTest}else N.copy(ce).multiplyScalar(K).floor(),ne.copy(Te).multiplyScalar(K).floor(),oe=ze;if(J!==0&&($=U),b.bindFramebuffer(z.FRAMEBUFFER,$)&&b.drawBuffers(T,$),b.viewport(N),b.scissor(ne),b.setScissorTest(oe),Z){const xe=q.get(T.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+G,xe.__webglTexture,J)}else if(_e){const xe=G;for(let Ae=0;Ae<T.textures.length;Ae++){const Le=q.get(T.textures[Ae]);z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0+Ae,Le.__webglTexture,J,xe)}}else if(T!==null&&J!==0){const xe=q.get(T.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,xe.__webglTexture,J)}X=-1};function Nl(T){const G=q.get(T);return(G.__readFormat!==T.format||G.__readType!==T.type)&&(G.__readFormat=T.format,G.__readType=T.type,G.__formatReadable=C.textureFormatReadable(T.format),G.__typeReadable=C.textureTypeReadable(T.type)),G}this.readRenderTargetPixels=function(T,G,J,$,Z,_e,Ee,xe=0){if(!(T&&T.isWebGLRenderTarget)){rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ae=q.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Ee!==void 0&&(Ae=Ae[Ee]),Ae){b.bindFramebuffer(z.FRAMEBUFFER,Ae);try{const Le=T.textures[xe],$e=Le.format,je=Le.type;T.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+xe);const Ce=Nl(Le);if(Ce.__formatReadable===!1){rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ce.__typeReadable===!1){rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=T.width-$&&J>=0&&J<=T.height-Z&&z.readPixels(G,J,$,Z,pe.convert($e),pe.convert(je),_e)}finally{const Le=j!==null?q.get(j).__webglFramebuffer:null;b.bindFramebuffer(z.FRAMEBUFFER,Le)}}},this.readRenderTargetPixelsAsync=async function(T,G,J,$,Z,_e,Ee,xe=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ae=q.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Ee!==void 0&&(Ae=Ae[Ee]),Ae)if(G>=0&&G<=T.width-$&&J>=0&&J<=T.height-Z){b.bindFramebuffer(z.FRAMEBUFFER,Ae);const Le=T.textures[xe],$e=Le.format,je=Le.type;T.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+xe);const Ce=Nl(Le);if(Ce.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ce.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ct=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,ct),z.bufferData(z.PIXEL_PACK_BUFFER,_e.byteLength,z.STREAM_READ),z.readPixels(G,J,$,Z,pe.convert($e),pe.convert(je),0),z.bindBuffer(z.PIXEL_PACK_BUFFER,null);const Nt=j!==null?q.get(j).__webglFramebuffer:null;b.bindFramebuffer(z.FRAMEBUFFER,Nt);const Et=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await km(z,Et,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,ct),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,_e),z.bindBuffer(z.PIXEL_PACK_BUFFER,null),z.deleteBuffer(ct),z.deleteSync(Et),_e}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,G=null,J=0){const $=Math.pow(2,-J),Z=Math.floor(T.image.width*$),_e=Math.floor(T.image.height*$),Ee=G!==null?G.x:0,xe=G!==null?G.y:0;Q.setTexture2D(T,0),z.copyTexSubImage2D(z.TEXTURE_2D,J,0,0,Ee,xe,Z,_e),b.unbindTexture()},this.copyTextureToTexture=function(T,G,J=null,$=null,Z=0,_e=0){let Ee,xe,Ae,Le,$e,je,Ce,ct,Nt;const Et=T.isCompressedTexture?T.mipmaps[_e]:T.image;if(J!==null)Ee=J.max.x-J.min.x,xe=J.max.y-J.min.y,Ae=J.isBox3?J.max.z-J.min.z:1,Le=J.min.x,$e=J.min.y,je=J.isBox3?J.min.z:0;else{const Ut=Math.pow(2,-Z);Ee=Math.floor(Et.width*Ut),xe=Math.floor(Et.height*Ut),T.isDataArrayTexture?Ae=Et.depth:T.isData3DTexture?Ae=Math.floor(Et.depth*Ut):Ae=1,Le=0,$e=0,je=0}$!==null?(Ce=$.x,ct=$.y,Nt=$.z):(Ce=0,ct=0,Nt=0);const _t=pe.convert(G.format),Yt=pe.convert(G.type);let be;G.isData3DTexture?(Q.setTexture3D(G,0),be=z.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(Q.setTexture2DArray(G,0),be=z.TEXTURE_2D_ARRAY):(Q.setTexture2D(G,0),be=z.TEXTURE_2D),b.activeTexture(z.TEXTURE0),b.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,G.flipY),b.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),b.pixelStorei(z.UNPACK_ALIGNMENT,G.unpackAlignment);const Jt=b.getParameter(z.UNPACK_ROW_LENGTH),it=b.getParameter(z.UNPACK_IMAGE_HEIGHT),gn=b.getParameter(z.UNPACK_SKIP_PIXELS),Pn=b.getParameter(z.UNPACK_SKIP_ROWS),ei=b.getParameter(z.UNPACK_SKIP_IMAGES);b.pixelStorei(z.UNPACK_ROW_LENGTH,Et.width),b.pixelStorei(z.UNPACK_IMAGE_HEIGHT,Et.height),b.pixelStorei(z.UNPACK_SKIP_PIXELS,Le),b.pixelStorei(z.UNPACK_SKIP_ROWS,$e),b.pixelStorei(z.UNPACK_SKIP_IMAGES,je);const Bi=T.isDataArrayTexture||T.isData3DTexture,xt=G.isDataArrayTexture||G.isData3DTexture;if(T.isDepthTexture){const Ut=q.get(T),ti=q.get(G),yt=q.get(Ut.__renderTarget),ni=q.get(ti.__renderTarget);b.bindFramebuffer(z.READ_FRAMEBUFFER,yt.__webglFramebuffer),b.bindFramebuffer(z.DRAW_FRAMEBUFFER,ni.__webglFramebuffer);for(let zi=0;zi<Ae;zi++)Bi&&(z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,q.get(T).__webglTexture,Z,je+zi),z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,q.get(G).__webglTexture,_e,Nt+zi)),z.blitFramebuffer(Le,$e,Ee,xe,Ce,ct,Ee,xe,z.DEPTH_BUFFER_BIT,z.NEAREST);b.bindFramebuffer(z.READ_FRAMEBUFFER,null),b.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else if(Z!==0||T.isRenderTargetTexture||q.has(T)){const Ut=q.get(T),ti=q.get(G);b.bindFramebuffer(z.READ_FRAMEBUFFER,L),b.bindFramebuffer(z.DRAW_FRAMEBUFFER,O);for(let yt=0;yt<Ae;yt++)Bi?z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Ut.__webglTexture,Z,je+yt):z.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Ut.__webglTexture,Z),xt?z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,ti.__webglTexture,_e,Nt+yt):z.framebufferTexture2D(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,ti.__webglTexture,_e),Z!==0?z.blitFramebuffer(Le,$e,Ee,xe,Ce,ct,Ee,xe,z.COLOR_BUFFER_BIT,z.NEAREST):xt?z.copyTexSubImage3D(be,_e,Ce,ct,Nt+yt,Le,$e,Ee,xe):z.copyTexSubImage2D(be,_e,Ce,ct,Le,$e,Ee,xe);b.bindFramebuffer(z.READ_FRAMEBUFFER,null),b.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else xt?T.isDataTexture||T.isData3DTexture?z.texSubImage3D(be,_e,Ce,ct,Nt,Ee,xe,Ae,_t,Yt,Et.data):G.isCompressedArrayTexture?z.compressedTexSubImage3D(be,_e,Ce,ct,Nt,Ee,xe,Ae,_t,Et.data):z.texSubImage3D(be,_e,Ce,ct,Nt,Ee,xe,Ae,_t,Yt,Et):T.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,_e,Ce,ct,Ee,xe,_t,Yt,Et.data):T.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,_e,Ce,ct,Et.width,Et.height,_t,Et.data):z.texSubImage2D(z.TEXTURE_2D,_e,Ce,ct,Ee,xe,_t,Yt,Et);b.pixelStorei(z.UNPACK_ROW_LENGTH,Jt),b.pixelStorei(z.UNPACK_IMAGE_HEIGHT,it),b.pixelStorei(z.UNPACK_SKIP_PIXELS,gn),b.pixelStorei(z.UNPACK_SKIP_ROWS,Pn),b.pixelStorei(z.UNPACK_SKIP_IMAGES,ei),_e===0&&G.generateMipmaps&&z.generateMipmap(be),b.unbindTexture()},this.initRenderTarget=function(T){q.get(T).__webglFramebuffer===void 0&&Q.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?Q.setTextureCube(T,0):T.isData3DTexture?Q.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?Q.setTexture2DArray(T,0):Q.setTexture2D(T,0),b.unbindTexture()},this.resetState=function(){F=0,Y=0,j=null,b.reset(),Me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Fn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=tt._getDrawingBufferColorSpace(e),t.unpackColorSpace=tt._getUnpackColorSpace()}}const S_={hair:v.HAIR,hat:v.HAT,headphones:v.PHONES,top:v.TOP,jacket:v.JACKET,jeans:v.JEANS,sneakers:v.SHOES,broom:v.BROOM,bristles:v.STRAW,skin:v.SKIN},Kc={hair:[.01,.7,.85],hat:[.74,.45,.45],headphones:[.92,.55,.9],top:[.13,.15,.95],jacket:[.72,.45,.7],jeans:[.6,.5,.7],sneakers:[0,0,.95],broom:[.08,.55,.55],bristles:[.12,.55,.9],skin:[.07,.3,.94]};function y_(i,e=Kc){const t={...Kc,...e},n={hair:i.hairHue,jacket:i.cloakHue,hat:i.hatHue,top:i.topHue,jeans:i.jeansHue,sneakers:i.shoeHue,headphones:i.phonesHue},r={};for(const[s,a]of Object.entries(S_)){const[o,c,l]=t[s];r[a]=we(n[s]??o,c,l)}return r[v.EYE]=[24,18,30],r[v.GLINT]=[255,255,245],r[v.NOSE]=[20,16,24],r[v.MAGIC]=we(i.glowHue??.13,.5,1),r[v.MAGIC2]=we(i.glowHue??.13,.15,1),r[v.BELLY]=[245,245,240],r}function b_({frame:i=0,lean:e=!1}={}){const t=new et({blend:.03}),n=[0,.025,.045][i%3],r=[0,.015,-.01][i%3]+(e?.08:0),s=.42+n,a=e?.1:0,o=[0,.03,.05][i%3];t.ell([.02,.005,0],[.2,.005,.12],v.NOSE,{group:0}),t.seg([-.5,s-r*2,0],[.62,s+r*3,0],.022,.018,v.BROOM,{group:2}),t.ell([-.62,s-r*2-.01,0],[.17,.07,.08],v.STRAW,{dir:[1,r,0],group:3,paint:d=>d[0]<-.72?v.MAGIC2:d[0]>-.5?v.BROOM:void 0});for(const d of[-1,1]){const h=[-.04,s+.06,d*.07],f=[.12+a*.5,s-.02,d*.14],g=[.08+a,s-.2,d*.13];t.seg(h,f,.055,.045,v.JEANS,{group:d>0?6:4}),t.seg(f,g,.045,.04,v.JEANS,{group:d>0?6:4}),t.ell(k.add(g,[.05,-.02,0]),[.08,.04,.045],v.SHOES,{group:d>0?6:4,paint:x=>x[1]<g[1]-.04?v.BELLY:void 0})}t.ell([-.04,s+.08,0],[.11,.07,.1],v.JEANS,{group:1});const c=[0+a*.8,s+.26-a*.3,0];t.ell(c,[.1,.16,.11],v.JACKET,{dir:[a*2.5,1,0],up:[-1,0,0],group:1,paint:d=>d[0]>c[0]+.04&&Math.abs(d[2])<.055?v.TOP:void 0});for(const d of[-1,1]){const h=k.add(c,[.01,.11,d*.11]),f=[.26+a,s+.03,d*.05];t.seg(h,k.lerp(h,f,.5),.04,.035,v.JACKET,{group:d>0?7:5}),t.seg(k.lerp(h,f,.5),f,.035,.03,v.JACKET,{group:d>0?7:5}),t.ell(f,[.035,.03,.035],v.SKIN,{group:d>0?7:5})}const l=k.add(c,[.03+a*.5,.26,0]);t.ell(l,[.11,.115,.1],v.SKIN,{group:8,paint:d=>d[0]<l[0]-.01||d[1]>l[1]+.075?v.HAIR:void 0});for(const d of[-1,1])t.ell(et.surface(l,[.11,.115,.1],k.norm([.85,.05,d*.45])),[.016,.026,.016],v.EYE,{group:8});t.chain([[...k.add(l,[-.06,.02,0]),.06],[...k.add(l,[-.18-a,-.05+o,.02]),.045],[...k.add(l,[-.3-a*1.5,-.08+o*1.6,.03]),.02]],v.HAIR,{group:9});for(const d of[-1,1])t.ell(k.add(l,[-.015,0,d*.105]),[.05,.055,.03],v.PHONES,{group:10});t.chain([[...k.add(l,[-.005,.03,-.095]),.015],[...k.add(l,[-.005,.11,-.05]),.015],[...k.add(l,[-.005,.125,0]),.015],[...k.add(l,[-.005,.11,.05]),.015],[...k.add(l,[-.005,.03,.095]),.015]],v.PHONES,{group:10});const u=k.add(l,[-.03,.1,0]);return t.ell(u,[.16,.014,.15],v.HAT,{dir:[1,.25,0],group:11}),t.chain([[...k.add(u,[0,.01,0]),.085],[...k.add(u,[-.05-a,.17,0]),.045],[...k.add(u,[-.16-a*1.5,.27+o*.5,0]),.012]],v.HAT,{group:11,paint:d=>d[1]<u[1]+.045?v.MAGIC:void 0}),t}const au=(i={})=>Math.round((i.size||8)*Math.sqrt(i.growth||20)*(2/(i.pixel||3))*1.9);function w_(i={},{frame:e=0,lean:t=!1,facing:n="towards"}={}){const r=au(i),{sp:s}=On(b_({frame:e,lean:t}),{height:r,facing:n});let a=0;for(let o=0;o<400&&a<6;o++){const c=o*37%s.w,l=o*53%Math.floor(s.h*.8);s.get(c,l)||s.get(c+1,l)||s.get(c-1,l)||s.get(c,l+1)||s.get(c,l-1)||(c*7+l*13+e*5)%11||(s.px(c,l,v.MAGIC2),a++)}return s}const Zs=[{id:"stack",crystal:"cyan",tiers:[["bass",4,[.24,.25,.28]],["mid",2,[.46,.15,.25]],["horn",4,[.21,.22,.23]],["tweet",2,[.21,.08,.17]]]},{id:"wall",crystal:"violet",tiers:[["bass",3,[.31,.3,.3]],["mid",2,[.44,.16,.26]],["horn",2,[.3,.25,.24]],["tweet",1,[.26,.09,.18]]]},{id:"tower",crystal:"amber",tiers:[["bass",2,[.28,.27,.29]],["bass",2,[.25,.24,.27]],["horn",2,[.25,.23,.23]],["tweet",3,[.15,.07,.15]]]}],E_={cyan:[[60,220,255],[210,250,255],[150,205,225]],violet:[[175,95,255],[240,215,255],[180,160,225]],amber:[[255,170,50],[255,238,200],[225,190,140]]};function T_(i=0){const[e,t,n]=E_[Zs[i%Zs.length].crystal];return{[v.STONE]:[78,80,94],[v.STONED]:[36,36,48],[v.MOSS]:[72,108,58],[v.CRYSTAL]:n,[v.RUNE]:e,[v.GLOW]:e,[v.MAGIC2]:t,[v.WOOD]:[150,96,52],[v.LINE]:[24,24,34]}}function $c(i,e,t,n){const r=Zs[i%Zs.length],s=new et({blend:.02}),a=t==="damaged",o=a?0:[0,.5,1][e%3],c=M=>a&&Tt(M,e,31)<.5;let l=0,u=1,d=.3,h=0,f=i*7;const g=(M,A,P,D)=>B=>{if(D&&Math.abs(Math.sin(B[0]*37+B[1]*23+Math.sin(B[2]*17)*2))<.07)return v.STONED;if(B[1]>M-.02&&(B[2]>A-.06||Tt(Math.floor(B[0]*30),Math.floor(B[2]*30),P)<.2)&&Tt(Math.floor(B[0]*40),Math.floor(B[2]*40),P+1)<.6)return v.MOSS},x=(M,A,P,D,B,U)=>{const L=c(U),O=1+o*.08;s.ell([M,A,P],[D*1.18,D*1.18,.06],v.STONED,{group:B,cut:!0}),s.ell([M,A,P-.02],[D*O,D*O,.035+o*.025],v.CRYSTAL,{group:900+U,paint:F=>{const Y=Math.hypot(F[0]-M,F[1]-A)/(D*O);return L?Y<.3?v.GLOW:v.CRYSTAL:Y<.2+o*.15?v.MAGIC2:Y<.5?v.GLOW:Y<.78?v.CRYSTAL:v.GLOW}})},m=(M,A,P,D,B,U,L,O)=>F=>{if(F[0]>M+D-.022){const Y=Math.min(P,B)*1.5,j=(U-B-F[2])/Y+.5,X=(A-F[1])/Y+.5;if(j>=0&&j<=1&&X>=0&&X<=1&&(n?_d(n,j,X,.065):sh(j,X,L,.12)))return a&&Tt(L,e,5)<.5?v.STONED:v.RUNE}return O(F)},p=r.tiers,_=p[0][1]*p[0][2][0]+.02,S=.08,y=p[0][2][2];s.box([0,S,d-y],[_,S,y],v.STONE,{group:u,round:.03,rough:.006,paint:g(S*2,d,3,a)}),s.box([0,S*.9,d],[_-.06,S*.45,.12],v.STONED,{group:u,cut:!0,paint:M=>M[2]<d-.07?v.GLOW:void 0});for(let M=1;M<p[0][1];M++)s.box([-_+M*_*2/p[0][1],S*.9,d-.06],[.015,S*.45,.06],v.STONE,{group:u});l=S*2,u++;const w=[];p.forEach(([M,A,[P,D,B]],U)=>{const L=M==="tweet"?.09:0,O=A*P*2+(A-1)*(M==="tweet"?.14:.01),F=d-U*.035,Y=l+L+D;for(let j=0;j<A;j++){const X=-O/2+P+j*(P*2+(M==="tweet"?.14:.01));if(a&&M==="horn"&&j===A-1){w.push([X,P,D,B]);continue}const te=a&&M==="tweet"?[1,.12*(j%2?1:-1),0]:void 0,N=a&&M==="tweet"?Y-.04:Y,ne=g(N+D,F-B+B,u,a),oe=j===A-1-(a&&M==="horn"?1:0)&&M!=="tweet";if(s.box([X,N,F-B],[P-.005,D,B],v.STONE,{group:u,round:.035,rough:.004,dir:te,paint:oe?m(X,N,D,P-.005,B,F,f++,ne):ne}),M==="bass"&&x(X,Y+.02,F,Math.min(P,D)*.72,u,h++),M==="mid"&&(s.ell([X,Y,F],[P*.8,D*.7,B*.9],v.STONED,{group:u,cut:!0,paint:Se=>Se[2]<F-B*.45?c(h)?v.STONED:v.GLOW:void 0}),s.box([X,Y,F-B*.5],[.018,D*.6,B*.45],v.STONE,{group:u}),h++),M==="horn"){const Se=Y+D*.25;s.seg([X,Se,F-B*1.5],[X,Se,F+.03],.03,Math.min(P,D)*.78,v.STONED,{group:u,cut:!0,paint:Ue=>Ue[2]<F-B*.55?c(h)?v.STONED:v.GLOW:void 0}),x(X,Y-D*.6,F,D*.22,u,h++)}if(M==="tweet")for(const Se of[-.5,0,.5])x(X+Se*P*1.15,N,F,D*.55,u,h++);u++}if(M!=="tweet"){const j=a&&M==="horn"?P:0;s.box([-j,l+D*2+.012,F-.015],[O/2+.01-j,.012,.015],v.WOOD,{group:u++,round:.008}),l+=.024}M==="tweet"&&!a&&s.flat([0,l+L/2,F-B],[1,0,0],[0,1,0],O/2,L/2,(j,X)=>Math.abs(X)<.45&&Math.sin(j*23)>-.4?v.GLOW:null,{group:u++,bend:0}),l+=D*2+L});const E=l;if([[-_-.04,.25,.34,-.3],[_+.02,.2,.3,.35],[-_+.15,.4,.22,-.1],[_-.2,.42,.18,.2],[.1,.45,.16,.15],[-_-.1,-.25,.26,-.4],[_+.08,-.2,.24,.45]].forEach(([M,A,P,D],B)=>{if(a&&B%2){s.seg([M,.03,A],[M+.12,.05,A+.04],.04,.02,v.CRYSTAL,{group:700+B});return}const U=[M+D*P,P,A+.05];s.seg([M,0,A],U,.045+P*.05,.006,v.CRYSTAL,{group:700+B,paint:L=>L[1]>P*(.65-o*.1)&&!a?v.GLOW:void 0}),s.seg([M+.04,0,A-.03],[M+.04+D*P*.5,P*.55,A],.03,.005,v.CRYSTAL,{group:720+B})}),!a)for(const[M,A,P,D]of[[-.55,.1,.1,.03],[.6,.16,0,.025],[.15,.24,-.1,.02]])s.ell([M,E+A-.1,P],[D,D*.8,D],v.STONE,{group:800+Math.round(M*100),extra:!0,rough:.004});for(const[M,A,P,D]of w)s.box([M+.45,A*.75,d+.25],[A,P,D],v.STONE,{group:u++,dir:[.6,.8,.2],round:.035,rough:.007,paint:g(1,0,9,!0)});return{m:s,top:E}}function A_(i){const e=new et({blend:.02}),t=(n,r)=>Tt(n,r,i*13+7);e.ell([.1,.1,.62],[.14,.12,.1],v.GLOW,{group:1,paint:n=>n[1]>.16?v.MAGIC2:void 0}),e.seg([.1,.1,.6],[.02,.5,.66],.07,.01,v.GLOW,{group:2,paint:n=>n[1]>.35?v.MAGIC2:v.CRYSTAL});for(let n=0;n<16;n++){const r=n*2.4,s=.15+t(n,1)*.75,a=Math.cos(r)*s,o=Math.sin(r)*s*.6,c=.09+t(n,2)*.1,l=Math.max(.05,(.8-s)*.45)+c*.5;e.box([a,l*.7,o],[c*1.3,c,c*1.1],v.STONE,{group:10+n,dir:[Math.cos(r*1.7),.4+t(n,3),Math.sin(r*2.3)],round:.03,rough:.008,paint:u=>Math.abs(Math.sin(u[0]*41+u[1]*29))<.08?v.STONED:u[1]>l*.7+c*.6&&t(n,4)<.25?v.MOSS:void 0})}for(let n=0;n<4;n++){const r=n*1.7+1,s=Math.cos(r)*.4,a=Math.sin(r)*.25;e.ell([s,.05,a],[.09,.08,.03],v.CRYSTAL,{group:50+n,dir:[Math.cos(r),.5,Math.sin(r)],paint:o=>t(n,5)<.3?v.GLOW:void 0})}for(let n=0;n<4;n++){const r=-.7+n*.45;e.seg([r,0,.4-n*.1],[r+.1,.08+t(n,6)*.1,.42-n*.1],.03,.01,v.CRYSTAL,{group:60+n})}return e}function Zc(i,e,t){let n=0;for(let r=0;r<2e3&&n<e;r++){const s=Math.floor(Tt(r,t,1)*i.w),a=Math.floor(Tt(r,t,2)*i.h*.7);i.get(s,a)||i.get(s+1,a)||i.get(s-1,a)||i.get(s,a+1)||i.get(s,a-1)||i.get(s,a+2)||(i.px(s,a,n%3?v.GLOW:v.MAGIC2),n++)}return i}const C_=i=>au(i)*3,Za=new Map;function R_(i={},{variant:e=0,frame:t=0,state:n="playing",sigil:r}={}){const s=C_(i),a=e+":"+s;Za.has(a)||Za.set(a,On($c(e,0,"playing").m,{height:s}).s);const o=Za.get(a);if(n==="destroyed")return Zc(On(A_(e),{scale:o}).sp,3,e*5+1);const{sp:c}=On($c(e,t,n,r).m,{scale:o});return Zc(c,n==="damaged"?4:10+t*2,e*5+t)}const L_=[{k:"ambientHue",g:"Night light",label:"Twilight hue",min:0,max:1,step:.01,v:.68,hue:!0},{k:"ambient",g:"Night light",label:"Twilight brightness",min:.05,max:.6,step:.01,v:.22},{k:"moon",g:"Night light",label:"Moonlight",min:0,max:1,step:.01,v:.3},{k:"moonHue",g:"Night light",label:"Moon hue",min:0,max:1,step:.01,v:.58,hue:!0},{k:"glowHue",g:"Night light",label:"Witch glow hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"glowSat",g:"Night light",label:"Witch glow colour",min:0,max:1,step:.01,v:.35},{k:"glowRadius",g:"Night light",label:"Witch glow reach",min:30,max:200,step:5,v:110},{k:"glowPower",g:"Night light",label:"Witch glow strength",min:.3,max:2.5,step:.05,v:1.4},{k:"bands",g:"Shading",label:"Light steps",min:2,max:7,step:1,v:3},{k:"dither",g:"Shading",label:"Dithering",min:0,max:1,step:.05,v:.35},{k:"round",g:"Shading",label:"Roundness",min:.2,max:1.5,step:.05,v:.9},{k:"outline",g:"Shading",label:"Plant outline",options:["none","dark","tinted"],v:"none"},{k:"cOutline",g:"Shading",label:"Creature outline",options:["dark","tinted","none"],v:"dark"},{k:"shafts",g:"Night light",label:"Moonbeams",min:0,max:1,step:.05,v:.3},{k:"areaContrast",g:"Colour",label:"Difference between areas",min:0,max:1,step:.05,v:.6},{k:"sat",g:"Colour",label:"Saturation",min:.2,max:1.3,step:.01,v:.9},{k:"leafHue",g:"Colour",label:"Leaf hue",min:0,max:1,step:.01,v:.3,hue:!0},{k:"leafVariety",g:"Colour",label:"Leaf colour variety",min:0,max:1,step:.05,v:.3},{k:"trunkHue",g:"Colour",label:"Bark hue",min:0,max:1,step:.01,v:.07,hue:!0},{k:"groundHue",g:"Colour",label:"Ground hue",min:0,max:1,step:.01,v:.27,hue:!0},{k:"groundVal",g:"Colour",label:"Ground brightness",min:.15,max:.7,step:.01,v:.4},{k:"pixel",g:"Shading",label:"Pixel size",min:1,max:5,step:1,v:3},{k:"treeSize",g:"Trees",label:"Tree height",min:.5,max:1.5,step:.05,v:.85},{k:"crownWidth",g:"Trees",label:"Crown width",min:1,max:4,step:.1,v:3},{k:"clearing",g:"Trees",label:"Clearing size",min:0,max:1,step:.05,v:.55},{k:"depth",g:"Map",label:"Border detail (fractal layers)",min:0,max:6,step:1,v:4},{k:"areaScale",g:"Map",label:"Area size (screens)",min:.6,max:2,step:.05,v:1},{k:"areaTypes",g:"Map",label:"Area types",min:4,max:30,step:1,v:30},{k:"density",g:"Trees",label:"Foliage density",min:.2,max:1,step:.05,v:.55},{k:"clump",g:"Trees",label:"Clumpiness",min:0,max:1,step:.05,v:.6},{k:"gnarl",g:"Trees",label:"Gnarliness",min:0,max:1,step:.05,v:.5},{k:"roots",g:"Trees",label:"Roots",min:0,max:1,step:.05,v:.6},{k:"bark",g:"Trees",label:"Bark texture",min:0,max:1,step:.05,v:.6},{k:"trees",g:"Trees",label:"Tree density",min:.2,max:2,step:.05,v:1},{k:"wBroad",g:"Tree mix",label:"Gnarled broadleaf",min:0,max:1,step:.05,v:.8},{k:"wFir",g:"Tree mix",label:"Fir",min:0,max:1,step:.05,v:.6},{k:"wWillow",g:"Tree mix",label:"Willow",min:0,max:1,step:.05,v:.5},{k:"wBirch",g:"Tree mix",label:"Birch",min:0,max:1,step:.05,v:.5},{k:"wPalm",g:"Tree mix",label:"Tree fern",min:0,max:1,step:.05,v:.3},{k:"wFlat",g:"Tree mix",label:"Flat-crowned",min:0,max:1,step:.05,v:.5},{k:"bushes",g:"Undergrowth",label:"Bushes and shrubs",min:0,max:120,step:1,v:55},{k:"bushSize",g:"Undergrowth",label:"Bush size",min:.5,max:1.8,step:.05,v:1},{k:"flowers",g:"Undergrowth",label:"Flowers",min:0,max:1,step:.05,v:.3},{k:"cSat",g:"Creatures",label:"Creature saturation",min:.1,max:1,step:.01,v:.6},{k:"cVal",g:"Creatures",label:"Creature brightness",min:.4,max:1,step:.01,v:.85},{k:"head",g:"Creatures",label:"Baby head size",min:.3,max:.6,step:.01,v:.44},{k:"eye",g:"Creatures",label:"Eye size",min:.5,max:2,step:.05,v:1},{k:"legs",g:"Creatures",label:"Leg length",min:.5,max:1.8,step:.05,v:1},{k:"long",g:"Creatures",label:"Body length",min:.7,max:1.5,step:.05,v:1},{k:"size",g:"Creatures",label:"Baby size (px)",min:5,max:14,step:1,v:8},{k:"growth",g:"Creatures",label:"Legend vs baby height",min:5,max:25,step:1,v:20},{k:"magicHue",g:"Creatures",label:"Magic glow hue",min:0,max:1,step:.01,v:.5,hue:!0},{k:"fur",g:"Creatures",label:"Stripes and spots",min:0,max:1,step:.05,v:.5},{k:"cloakHue",g:"Witch",label:"Jacket hue",min:0,max:1,step:.01,v:.72,hue:!0},{k:"hairHue",g:"Witch",label:"Hair hue",min:0,max:1,step:.01,v:.01,hue:!0},{k:"hatHue",g:"Witch",label:"Hat hue",min:0,max:1,step:.01,v:.74,hue:!0},{k:"topHue",g:"Witch",label:"Top hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"jeansHue",g:"Witch",label:"Jeans hue",min:0,max:1,step:.01,v:.6,hue:!0},{k:"shoeHue",g:"Witch",label:"Sneakers hue",min:0,max:1,step:.01,v:0,hue:!0},{k:"phonesHue",g:"Witch",label:"Headphones hue",min:0,max:1,step:.01,v:.92,hue:!0}];function P_(){const i={};return L_.forEach(e=>i[e.k]=e.v),i}const D_={broad:fh,fir:nl,willow:ph,birch:mh,flat:gh};function I_(i,e,t,n,r){const s=D_[e.type],a={...t,leafHue:i.leaf+(e.dark?.05:0),gnarl:e.gnarl??t.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},o=s(n,a,t.treeSize*r*(e.scale||1)*ye(n,.9,1.1)),c=il(n,a,s);return e.dark&&(c[v.LEAF]=c[v.LEAF3],c[v.LEAF3]=we(i.leaf+.05,.7,.22)),c[v.NOSE]=[20,16,24],c[v.GLINT]=[235,235,240],{parts:Sd(o),colours:c}}function U_(i,e,t,n,r){const s=fn[t].id,a=rl.find(f=>f.id===s),o=Td(s,i,{K:n,makeCanvas:r}),c=[],l=f=>c.push(f)-1,u={big:[],small:[],walls:[],set:null},d=(f,g)=>ui(f,g,i,"none",r),h=(f,g)=>{const{parts:x,colours:m}=I_(a,f,i,fi(e*13+t*101+g*7+1),n);return{bot:l(d(x.bot,m)),top:l(d(x.top,m))}};a.big.forEach(([f,g],x)=>{if(f!=="tree"){u.big.push({bot:l(o.big[x].sp),top:null});return}const m=Math.max(1,Math.round(_h/a.big.length));for(let p=0;p<m;p++)u.big.push(h(g,x*17+p))}),a.small.forEach(([f,g],x)=>u.small.push(f==="tree"?h(g,500+x):{bot:l(o.small[x].sp),top:null}));for(const f of o.walls)u.walls.push(l(f.sp));return o.setPiece&&(u.set=a.set?.[0]==="tree"?h(a.set[1],900):{bot:l(o.setPiece.sp),top:null}),{sprites:c,layout:u,floor:o.floor.sp}}function Jc(i,e,t,n=null){const r=[];for(const s of["towards","away"])for(let a=0;a<4;a++)for(let o=0;o<2;o++)r.push(ui(ad(e,a,o,i,s,n),id(e,i,n),i,i.cOutline,t));return r}const N_=(i,e,t=!1)=>(t?8:0)+i*2+e;function Js(i,e,t){return i.getContext("2d").getImageData(0,0,e,t).data}function Os(i,e=2048){const n=[];let r=0,s=0,a=0,o=1;for(const h of i)r+h.w+1>e&&(r=0,s+=a+1,a=0),n.push({x:r,y:s}),r+=h.w+1,a=Math.max(a,h.h),o=Math.max(o,r);const c=Math.max(1,s+a),l=new Uint8Array(o*c*4),u=new Uint8Array(o*c*4),d=i.map((h,f)=>{const g=n[f],x=Js(h.A,h.w,h.h),m=Js(h.N,h.w,h.h);for(let p=0;p<h.h;p++){const _=p*h.w*4,S=((g.y+p)*o+g.x)*4;l.set(x.subarray(_,_+h.w*4),S),u.set(m.subarray(_,_+h.w*4),S)}return{uv:[g.x/o,g.y/c,(g.x+h.w)/o,(g.y+h.h)/c],w:h.w,h:h.h}});return{albedo:l,normal:u,width:o,height:c,frames:d}}function F_(i,e){if(i.kind==="creature")return{px:Os(Jc(i.style,i.id,e),2048)};if(i.kind==="party")return{px:Os(Jc(i.style,i.species,e,{...nd(i.seed),collar:i.colour}),2048)};const{sprites:t,layout:n,floor:r}=U_(i.style,i.seed,i.id,i.K,e);return{px:Os(t),layout:n,floor:{albedo:new Uint8Array(Js(r.A,r.w,r.h)),normal:new Uint8Array(Js(r.N,r.w,r.h)),w:r.w,h:r.h}}}function Qc(i,e,t){const n=new rr(i,e,t,hn,cn);return n.magFilter=Dt,n.minFilter=Dt,n.generateMipmaps=!1,n.flipY=!1,n.colorSpace=An,n.needsUpdate=!0,n}function ou(i){return{albedo:Qc(i.albedo,i.width,i.height),normal:Qc(i.normal,i.width,i.height),frames:i.frames}}const bs=(i,e=2048)=>ou(Os(i,e));class O_{constructor(e,t,n){this.style=e,this.seed=t,this.K=2/n;const r=y_(e),s=c=>ui(w_(e,c),r,e,e.cOutline);this.witch=bs([0,1,2].map(c=>s({frame:c})).concat([0,1,2].map(c=>s({frame:c,facing:"away"})),[s({lean:!0}),s({lean:!0,facing:"away"})]),1024),this.stones=bs([0,1,2,3].map(c=>this.stone(c)));const a=Pd(e);this.props=bs([...a.campfire,a.stones.cyan,a.stones.violet,a.stones.green],1024);const o=[];for(let c=0;c<3;c++)for(let l=0;l<3;l++)o.push(ui(R_(e,{variant:c,frame:l,state:"playing"}),T_(c),e,e.cOutline));if(this.soundsystems=bs(o,2048),this.useWorkers=typeof Worker<"u"&&typeof OffscreenCanvas<"u",this.useWorkers){const c=Math.max(1,Math.min(3,(navigator.hardwareConcurrency||2)-1));try{for(let l=0;l<c;l++){const u=new Worker(new URL(""+new URL("artWorker-0-2S_dtN.js",import.meta.url).href,import.meta.url),{type:"module"}),d={w:u,busy:!1};u.onmessage=h=>{d.busy=!1,d.job=void 0,this.receive(h.data),this.dispatch()},u.onerror=()=>{this.useWorkers=!1,d.job&&this.queue.unshift(d.job),d.busy=!1,d.job=void 0},this.workers.push(d)}}catch{this.useWorkers=!1}}}style;seed;types=new Map;creatures=new Map;queue=[];inFlight=new Set;workers=[];useWorkers;witch;stones;props;soundsystems;K;version=0;onFloor=()=>{};stone(e){const t=fi(this.seed*3+e),n=5+Math.floor(t()*3),r=7+Math.floor(t()*5),s=new sn(n+2,r+1);return s.ellipse((n+2)/2,r/2+1,n/2,r/2+.5,v.BODY,{round:this.style.round}),s.ellipse((n+2)/2-1,r/2,n/3,r/3,v.BODY2,{round:this.style.round,onlyOn:new Set([v.BODY]),density:.5,seed:e}),ui(s,{[v.BODY]:[178,174,162],[v.BODY2]:[140,138,130]},this.style,"dark")}key=e=>e.kind+":"+e.id;ask(e){const t=this.key(e);this.inFlight.has(t)||(this.inFlight.add(t),this.queue.push(e),this.dispatch())}dispatch(){if(this.useWorkers)for(const e of this.workers)e.busy||!this.queue.length||(e.busy=!0,e.job=this.queue.shift(),e.w.postMessage(e.job))}receive(e){if(!e.result){console.warn("art worker failed, drawing on the page:",e.error),this.useWorkers=!1,this.queue.unshift(e.job);return}const t=ou(e.result.px);e.job.kind==="type"?(this.types.set(e.job.id,{atlas:t,layout:e.result.layout}),e.result.floor&&this.onFloor(e.job.id,e.result.floor)):this.creatures.set(e.job.id,{atlas:t,frame:N_}),this.inFlight.delete(this.key(e.job)),this.version++}typeArt(e){const t=this.types.get(e);return t||this.ask({kind:"type",id:e,style:this.style,seed:this.seed,K:this.K}),t}creatureArt(e){const t=this.creatures.get(e);return t||this.ask({kind:"creature",id:e,style:this.style}),t}partyArt(e,t,n){const r=`party-${t}`,s=this.creatures.get(r);return s||this.ask({kind:"party",id:r,species:e,seed:t,colour:n,style:this.style}),s}prefetchType(e){this.types.has(e)||this.typeArt(e)}get pending(){return this.inFlight.size}work(e){if(this.useWorkers)return;const t=performance.now();let n=0;for(;this.queue.length&&(n===0||performance.now()-t<e);){const r=this.queue.shift();this.receive({job:r,result:F_(r,(s,a)=>{const o=document.createElement("canvas");return o.width=s,o.height=a,o})}),n++}}whenIdle(){return new Promise(e=>{const t=()=>{this.work(50),this.pending?setTimeout(t,30):e()};t()})}}const ur=24,st={uAmb:{value:new W},uMoon:{value:new W},uMoonDir:{value:new W(-.45,.75,.5).normalize()},uMoonBeam:{value:new W},uBands:{value:4},uDither:{value:.35},uShafts:{value:.3},uShaftScale:{value:1},uGlowPos:{value:new W},uGlowRgb:{value:new W},uGlowR:{value:8},uGlowPower:{value:1.4},uHazeCentre:{value:new Ge},uHazeRange:{value:new Ge(70,200)},uHazeColour:{value:new W},uTime:{value:0},uSmooth:{value:1},uLightPos:{value:Array.from({length:ur},()=>new ot)},uLightCol:{value:Array.from({length:ur},()=>new ot)},uLightCount:{value:0},uDisco:{value:new ot},uDiscoParams:{value:new ot},uDiscoColour:{value:new W(1,1,1)},uScenery:{value:new Ge(1e6,1)}};function B_(i,e,t,n=1){const r=(s,a)=>new W(s[0]/255*a,s[1]/255*a,s[2]/255*a);st.uAmb.value.copy(r(we(i.ambientHue,.55,1),i.ambient*n)),st.uMoon.value.copy(r(we(i.moonHue,.35,1),i.moon)),st.uMoonBeam.value.copy(r(we(i.moonHue,.35,1),i.shafts*.25)),st.uBands.value=i.bands,st.uDither.value=i.dither*.5,st.uShafts.value=i.shafts,st.uShaftScale.value=t*2,st.uGlowRgb.value.copy(r(we(i.glowHue,i.glowSat,1),1)),st.uGlowR.value=e,st.uGlowPower.value=i.glowPower,st.uHazeColour.value.copy(r(we(i.ambientHue-.08,.55,1),.16*Math.sqrt(n)))}const jn=`
uniform vec3 uAmb, uMoon, uMoonDir, uMoonBeam, uGlowPos, uGlowRgb;
uniform float uBands, uDither, uShafts, uShaftScale, uGlowR, uGlowPower, uTime, uSmooth;
uniform vec2 uHazeCentre, uHazeRange;
uniform vec3 uHazeColour;
uniform vec4 uLightPos[${ur}], uLightCol[${ur}];
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
  for (int i = 0; i < ${ur}; i++) {
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
`,li=2,Xt=32,Ei=8,z_=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`,k_=`
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
${jn}
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
    vec2 cell = vec2(mod(float(t), ${Ei}.0), floor(float(t) / ${Ei}.0));
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
`;class G_{constructor(e,t,n,r){this.map=e,this.forest=t;const s=e.extent,a=s.maxX-s.minX,o=s.maxZ-s.minZ,c=Math.ceil(a*li/Xt)*Xt,l=Math.ceil(o*li/Xt)*Xt;this.tilesX=c/Xt,this.tilesZ=l/Xt,this.filled=new Uint8Array(this.tilesX*this.tilesZ);const u=g=>(g.magFilter=g.minFilter=Dt,g.generateMipmaps=!1,g.colorSpace=An,g.needsUpdate=!0,g);this.texture=u(new rr(new Uint8Array(c*l*4),c,l)),u(this.tile),this.floors=u(new rr(new Uint8Array(64*Ei*48*4*4),64*Ei,192));const d=Array.from({length:32},(g,x)=>new W(...fn[x]?.floor??[.25,.45,.4])),h=new wt({vertexShader:z_,fragmentShader:k_,uniforms:{...st,uAreas:{value:this.texture},uExtent:{value:new ot(s.minX,s.minZ,c/li,l/li)},uPixel:{value:r},uTypeFloor:{value:d},uFloorReady:{value:this.floorReady},uFloors:{value:this.floors},uTile:{value:new Ge(64,48)},uFloorsSize:{value:new Ge(64*Ei,192)},uSat:{value:n.sat},uFloor:{value:new W(e.dancefloor.x,e.dancefloor.z,e.dancefloor.radius)},uCanopy:{value:new ot},uCircle:{value:new ot},uSweeps:{value:Array.from({length:4},()=>new ot)},uSweepCount:{value:0},uClearing:{value:new Ge(e.tuning.clearingSize,e.tuning.clearingFalloff)}}}),f=new pn(a+400,o+400);f.rotateX(-Math.PI/2),this.mesh=new Vt(f,h),this.mesh.position.set((s.minX+s.maxX)/2,0,(s.minZ+s.maxZ)/2)}map;forest;mesh;texture;tile=new rr(new Uint8Array(Xt*Xt*4),Xt,Xt);filled;tilesX;tilesZ;initialised=!1;floorReady=new Array(32).fill(0);floors;pendingFloors=[];setSweeps(e){const t=this.mesh.material.uniforms,n=t.uSweeps.value;e.slice(0,4).forEach((r,s)=>n[s].set(r.x,r.z,r.radius,r.strength)),t.uSweepCount.value=Math.min(4,e.length)}setCircle(e,t,n,r){this.mesh.material.uniforms.uCircle.value.set(e,t,n,r)}setCanopyShadow(e,t,n,r){this.mesh.material.uniforms.uCanopy.value.set(e,t,n,r)}setFloor(e,t){this.pendingFloors.push([e,t])}placeFloors(e){for(const[t,n]of this.pendingFloors){const r=this.mesh.material,s=r.uniforms.uTile.value;if(n.w!==s.x||n.h!==s.y)continue;const a=new rr(n.albedo,n.w,n.h);a.needsUpdate=!0,e.copyTextureToTexture(a,this.floors,null,new Ge(t%Ei*n.w,Math.floor(t/Ei)*n.h)),a.dispose(),this.floorReady[t]=1}this.pendingFloors=[]}fill(e,t,n,r,s){this.initialised||(e.initTexture(this.texture),e.initTexture(this.floors),this.initialised=!0),this.pendingFloors.length&&this.placeFloors(e);const a=this.map.extent,o=Xt/li,c=Math.max(0,Math.floor((t.minX-a.minX)/o)),l=Math.min(this.tilesX-1,Math.floor((t.maxX-a.minX)/o)),u=Math.max(0,Math.floor((t.minZ-a.minZ)/o)),d=Math.min(this.tilesZ-1,Math.floor((t.maxZ-a.minZ)/o)),h=(n-a.minX)/o,f=(r-a.minZ)/o,g=[];for(let p=u;p<=d;p++)for(let _=c;_<=l;_++)this.filled[p*this.tilesX+_]||g.push([_,p,(_+.5-h)**2+(p+.5-f)**2]);g.sort((p,_)=>p[2]-_[2]);const x=performance.now();let m=0;for(const[p,_]of g){if(m>0&&performance.now()-x>s)break;this.fillTile(e,p,_),m++}return g.length-m}fillTile(e,t,n){const r=this.map.extent,s=this.tile.image.data,a=Xt/li,o=r.minX+t*a,c=r.minZ+n*a,l=this.forest.lightsNear(o+a/2,c+a/2,a/2+6).filter(u=>u.kind==="pond");for(let u=0;u<Xt;u++)for(let d=0;d<Xt;d++){const h=o+(d+.5)/li,f=c+(u+.5)/li,g=this.map.areaAt(h,f),x=(u*Xt+d)*4;let m=0;for(const p of l)Math.hypot(h-p.x,f-p.z)<3*p.size&&(m=255);s[x]=g.type,s[x+1]=Math.round(g.openness*255),s[x+2]=m,s[x+3]=255}this.tile.needsUpdate=!0,e.copyTextureToTexture(this.tile,this.texture,null,new Ge(t*Xt,n*Xt)),this.filled[n*this.tilesX+t]=1}dispose(){this.texture.dispose(),this.tile.dispose(),this.mesh.geometry.dispose(),this.mesh.material.dispose()}}const H_="varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",V_=`
uniform sampler2D uScene; uniform float uThreshold; varying vec2 vUv;
void main() {
  vec3 c = texture2D(uScene, vUv).rgb;
  float l = max(c.r, max(c.g, c.b));
  gl_FragColor = vec4(c * smoothstep(uThreshold, uThreshold + 0.25, l), 1.0);
}`,W_=`
uniform sampler2D uSrc; uniform vec2 uStep; varying vec2 vUv;
void main() {
  vec4 c = texture2D(uSrc, vUv) * 0.227;
  c += (texture2D(uSrc, vUv + uStep * 1.38) + texture2D(uSrc, vUv - uStep * 1.38)) * 0.316;
  c += (texture2D(uSrc, vUv + uStep * 3.23) + texture2D(uSrc, vUv - uStep * 3.23)) * 0.070;
  gl_FragColor = c;
}`,X_=`
uniform sampler2D uScene, uBloom, uFx; uniform vec2 uLow; uniform float uBloomStrength, uBlack, uGamma, uFxOn; varying vec2 vUv;
void main() {
  vec2 p = (floor(vUv * uLow) + 0.5) / uLow;
  vec3 c = texture2D(uScene, p).rgb;
  if (uFxOn > 0.5) { vec4 f = texture2D(uFx, vUv); c = c * (1.0 - f.a) + f.rgb; }
  // Levels: a black point and a gamma, so the shade goes near-black and the lit stays bright.
  c = pow(clamp((c - uBlack) / (1.0 - uBlack), 0.0, 1.0), vec3(uGamma));
  c += texture2D(uBloom, vUv).rgb * uBloomStrength;
  gl_FragColor = vec4(min(c, vec3(1.0)), 1.0);
}`,Y_=`
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
}`;function bi(i,e,t,n=!1){const r=new Mn(Math.max(1,i),Math.max(1,e),{minFilter:t,magFilter:t,depthBuffer:n,generateMipmaps:!1});return r.texture.colorSpace=An,r}class q_{constructor(e,t){this.renderer=e,this.tuning=t,this.scene=bi(1,1,Lt,!0),this.scene.depthTexture=new gr(1,1),this.fx.texture.format=hn;const n=(r,s)=>new wt({vertexShader:H_,fragmentShader:r,uniforms:s,depthTest:!1,depthWrite:!1});this.mats={bright:n(V_,{uScene:{value:null},uThreshold:{value:.6}}),blur:n(W_,{uSrc:{value:null},uStep:{value:new Ge}}),composite:n(X_,{uScene:{value:null},uBloom:{value:null},uLow:{value:new Ge},uBloomStrength:{value:0},uBlack:{value:0},uGamma:{value:1},uFx:{value:null},uFxOn:{value:0}}),tilt:n(Y_,{uSrc:{value:null},uTexel:{value:new Ge},uDir:{value:new Ge},uStrength:{value:0},uBand:{value:.4},uCentre:{value:.5}})},this.quad=new Vt(new pn(2,2),this.mats.composite),this.quad.frustumCulled=!1}renderer;tuning;scene;bright=bi(1,1,Lt);bloomB=bi(1,1,Lt);a=bi(1,1,Lt);b=bi(1,1,Lt);fx=bi(1,1,Lt);fxB=bi(1,1,Lt);fxScene=null;quad;cam=new bl(-1,1,1,-1,0,1);mats;low=new Ge(1,1);out=new Ge(1,1);get fullResolution(){return this.tuning.tiltShift.on&&this.tuning.tiltShift.where==="after"}get lowSize(){return this.low}resize(e,t,n,r){this.low.set(e,t),this.fx.setSize(e,t),this.fxB.setSize(e,t),this.out.set(n,r),this.scene.setSize(e,t);const s=Math.max(1,Math.round(e/2)),a=Math.max(1,Math.round(t/2));this.bright.setSize(s,a),this.bloomB.setSize(s,a);const o=this.fullResolution?n:e,c=this.fullResolution?r:t;this.a.setSize(o,c),this.b.setSize(o,c)}pass(e,t,n){const r=this.mats[e];n(r.uniforms),this.quad.material=r,this.renderer.setRenderTarget(t),this.renderer.render(this.quad,this.cam)}render(e,t){const n=this.renderer,r=this.tuning;n.setRenderTarget(this.scene),n.render(e,t);const s=r.bloom.on&&r.bloom.strength>0;if(s){const h=this.bright.width,f=this.bright.height;this.pass("bright",this.bright,g=>{g.uScene.value=this.scene.texture,g.uThreshold.value=r.bloom.threshold});for(let g=0;g<2;g++)this.pass("blur",this.bloomB,x=>{x.uSrc.value=this.bright.texture,x.uStep.value.set(1/h,0)}),this.pass("blur",this.bright,x=>{x.uSrc.value=this.bloomB.texture,x.uStep.value.set(0,1/f)})}const a=!!this.fxScene;if(this.fxScene){const h=n.getClearColor(new Qe),f=n.getClearAlpha();n.setRenderTarget(this.fx),n.setClearColor(0,0),n.clear(),n.render(this.fxScene,t),n.setClearColor(h,f);const g=this.fx.width,x=this.fx.height;this.pass("blur",this.fxB,m=>{m.uSrc.value=this.fx.texture,m.uStep.value.set(.6/g,0)}),this.pass("blur",this.fx,m=>{m.uSrc.value=this.fxB.texture,m.uStep.value.set(0,.6/x)})}const o=r.tiltShift.on&&r.tiltShift.strength>0;if(this.pass("composite",o?this.a:null,h=>{h.uScene.value=this.scene.texture,h.uBloom.value=this.bright.texture,h.uLow.value.copy(this.low),h.uBloomStrength.value=s?r.bloom.strength:0,h.uBlack.value=r.tone.black,h.uGamma.value=r.tone.gamma,h.uFx.value=this.fx.texture,h.uFxOn.value=a?1:0}),!o)return;const c=this.a.width,l=this.a.height,u=this.fullResolution?this.out.y/this.low.y:1,d=h=>{h.uTexel.value.set(1/c,1/l),h.uStrength.value=r.tiltShift.strength*u,h.uBand.value=r.tiltShift.band,h.uCentre.value=1-r.tiltShift.centre};this.pass("tilt",this.b,h=>{d(h),h.uSrc.value=this.a.texture,h.uDir.value.set(1,0)}),this.pass("tilt",null,h=>{d(h),h.uSrc.value=this.b.texture,h.uDir.value.set(0,1)})}}const K_=`
uniform vec3 uRight, uUp;
uniform float uSize;
varying vec2 vUv;
void main() {
  vUv = uv * 2.0 - 1.0;
  vec3 w = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz + (uRight * position.x + uUp * position.y) * uSize;
  gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
}`,$_=`
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
}`,Z_=`
uniform vec3 uTint;
void main() {
  if (mod(floor(gl_FragCoord.y), 3.0) > 0.5) discard; // faint: a dotted thread of light
  gl_FragColor = vec4(uTint, 1.0);
}`,J_=`
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
}`,Q_=`
uniform vec3 uTint;
varying float vA;
void main() { if (vA < 0.15) discard; gl_FragColor = vec4(uTint * (0.5 + vA), 1.0); }`;class j_{constructor(e,t,n,r){this.tuning=t;const s=t.dancefloor,a=e.dancefloor;this.centre=new W(a.x,0,a.z);const o=new W(...we(s.circleHue2,.4,1).map(m=>m/255));this.ballMat=new wt({vertexShader:K_,fragmentShader:$_,uniforms:{...n,uSize:{value:s.discoSize/2},uTime:st.uTime,uSpin:{value:s.spin/60*Math.PI*2},uPixels:{value:Math.max(6,Math.round(s.discoSize/r))},uTint:{value:o}}}),this.ball=new Vt(new pn(2,2),this.ballMat),this.ball.frustumCulled=!1;const c=60;this.beam=new Vt(new pn(r,c).translate(0,c/2,0),new wt({fragmentShader:Z_,uniforms:{uTint:{value:o.clone().multiplyScalar(.5)}}})),this.beam.frustumCulled=!1;const l=s.motes,u=[],d=[];for(let m=0;m<l.count;m++){const p=y=>{const w=Math.sin(m*12.9898+y*78.233)*43758.5453;return w-Math.floor(w)},_=p(1)*Math.PI*2,S=Math.sqrt(p(2))*a.radius*l.column;u.push(a.x+Math.cos(_)*S,.3,a.z+Math.sin(_)*S),d.push(p(3),l.speed*(.6+p(4)*.8),.4+p(5)*1.2,0)}const h=new zt;h.setAttribute("position",new At(u,3)),h.setAttribute("aMote",new At(d,4));const f=we(s.circleHue,.55,1);this.motes=new $s(h,new wt({vertexShader:J_,fragmentShader:Q_,uniforms:{uTime:st.uTime,uRise:{value:l.rise},uTint:{value:new W(f[0]/255,f[1]/255,f[2]/255)}},transparent:!0,depthWrite:!1,blending:pr})),this.motes.frustumCulled=!1;const g=we(s.circleHue,.7,1);this.lightRgb=new W(g[0]/255,g[1]/255,g[2]/255);const x=st;x.uDiscoParams.value.set(s.spin/60*Math.PI*2,s.specks,s.speckBrightness,s.speckReach),x.uDiscoColour.value.copy(o)}tuning;ball;beam;motes;ballMat;lightRgb;centre;update(e,t){const n=this.tuning.dancefloor,r=.75+.25*Math.sin(e*n.pulse*Math.PI*2);t.setCircle(n.circleHue,n.circleHue2,.7+.3*r,e*n.runeSpeed/60*Math.PI*2);const s=n.discoHeight+Math.sin(e*.8)*.3;return this.ball.position.set(this.centre.x,s,this.centre.z),this.beam.position.set(this.centre.x,s+n.discoSize/2,this.centre.z),st.uDisco.value.set(this.centre.x,s,this.centre.z,1),{x:this.centre.x,y:2.5,z:this.centre.z,reach:n.lightReach,rgb:this.lightRgb,strength:n.lightStrength*r}}}const eM=[new W(.25,.85,1),new W(.7,.4,1),new W(1,.65,.2)];class tM{constructor(e,t){this.atlas=e,this.metresPerPixel=t}atlas;metresPerPixel;homeSoundsystem(e){const t=e.map.dancefloor;return{x:t.x+t.radius+5,z:t.z+3,variant:0,at:-1/0,from:null}}update(e,t,n,r){const s=e.tuning.party,a=[],o=[],c=[],l=[],u=[this.homeSoundsystem(e)];for(const[,d]of e.party.areas){if(!d.soundsystem)continue;const h=d.from?e.map.siteOf(d.from[0],d.from[1]):null;u.push({...d.soundsystem,at:d.at,from:h})}for(const d of u){const h=s.transition>0?Math.min(1,(t-d.at)/s.transition):1,f=this.atlas.frames[d.variant*3+Math.floor(t*6)%3],g=f.h*this.metresPerPixel,x=rn((h-.55)/.45);if(h<1&&d.from){const p=(d.from.x+d.x)/2,_=(d.from.z+d.z)/2,S=Math.hypot(d.x-p,d.z-_)*1.6;c.push({x:p,z:_,radius:h*S,strength:1-rn((h-.8)/.2)})}x>0&&n(d.x,d.z,f.w*this.metresPerPixel,g)&&a.push({x:d.x,y:-(1-x)*g,z:d.z,frame:f,flip:!1,fresh:r(d.x,d.z,g)}),h>=1&&l.push({x:d.x,y:g*.85,z:d.z,seed:Math.floor(Math.abs(d.x*7.3+d.z*13.1))%1e5,ready:d.at+s.transition});const m=.85+.15*Math.sin(t*8);x>0&&o.push({x:d.x,y:3,z:d.z,reach:s.lightReach,rgb:eM[d.variant%3],strength:s.lightStrength*m*x*(1+(1-h)*2)})}return{items:a,lights:o,sweeps:c,playing:l}}}function nM(i,e,t){const n=i.tuning.stringLights,r=i.siteOf(t[0],t[1]),s=fi(i.seed*53+t[0]*1031+t[1]*7+509),a=h=>{const f=i.areaAt(h.x,h.z).cell;return f[0]===t[0]&&f[1]===t[1]},o=h=>Xe(Math.round(h.x*10),Math.round(h.z*10),i.seed+501),c=e.treesNear(r.x,r.z,i.areaSize*1.3).filter(a).sort((h,f)=>o(h)-o(f)),l=new Set,u=[],d=[];for(const h of c){if(d.length>=n.perArea)break;if(l.has(h)||u.some(p=>Math.hypot(p.x-h.x,p.z-h.z)<n.spread))continue;u.push(h);let f=h,g=0,x=0;const m=1+Math.floor(s()*n.chainMax);l.add(h);for(let p=0;p<m&&d.length<n.perArea;p++){const _=[];for(const w of c){if(l.has(w))continue;const E=w.x-f.x,R=w.z-f.z,M=Math.hypot(E,R);if(!(M<n.spanMin||M>n.spanMax)&&!(p>0&&(E*g+R*x)/M<.5)&&(_.push(w),_.length>24))break}if(!_.length)break;const S=_[Math.floor(s()*_.length)],y=Math.hypot(S.x-f.x,S.z-f.z);d.push({ax:f.x,az:f.z,bx:S.x,bz:S.z,seed:Math.floor(Xe(Math.round(f.x*10),Math.round(S.z*10),i.seed+503)*1e6)}),l.add(S),g=(S.x-f.x)/y,x=(S.z-f.z)/y,f=S}}return d}const iM=`
attribute vec3 aColour;
attribute vec4 aBulb; // phase, index along the line, time it switches on, sway (0 at the ends)
uniform float uWind, uNear, uTime;
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
  gl_PointSize = vOn > 0.5 ? (-mv.z < uNear ? 2.0 : 1.0) : 0.0;
  vColour = aColour; vWorld = p; vB = aBulb.xy;
}`,rM=`
uniform float uTwinkle, uChase;
varying vec3 vColour;
varying vec3 vWorld;
varying float vOn;
varying vec2 vB;
${jn}
void main() {
  if (vOn < 0.5 || sceneryFade(vWorld) < 0.5) discard; // scenery: gone past the scenery budget's edge
  float b = 1.0 - uTwinkle * 0.5 * (1.0 + sin(uTime * (1.3 + vB.x) + vB.x * 40.0));
  if (fract((vB.y - uTime * uChase) / 60.0) < 0.06) b = 1.4;  // a chase running along now and then
  gl_FragColor = vec4(haze(vColour * b * 1.6, vWorld), 1.0); // bright enough to bloom
}`,sM=`
attribute float aSway;
uniform float uWind, uTime;
varying vec3 vWorld;
void main() {
  vec3 p = position;
  p.x += sin(uTime * uWind + aSway * 6.0) * 0.18 * fract(aSway * 7.0);
  vWorld = p;
  gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
}`,aM=`
varying vec3 vWorld;
${jn}
void main() {
  if (sceneryFade(vWorld) < 0.5) discard;
  gl_FragColor = vec4(haze(vec3(0.03, 0.025, 0.04), vWorld), 1.0);
}`,oM=`
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
}`,lM=`
uniform vec3 uMoteColour;
varying float vA;
varying vec3 vWorld;
${jn}
void main() {
  if (vA < 0.3) discard;
  gl_FragColor = vec4(haze(uMoteColour * (0.6 + 0.6 * vA), vWorld), 1.0);
}`;class cM{constructor(e,t){this.scene=e,this.game=t;const n=t.tuning.stringLights;this.palette=n.palette.map(s=>new Qe(s));const r={...st,uWind:{value:t.tuning.canopyShadow.wind*1.5}};this.bulbMat=new wt({vertexShader:iM,fragmentShader:rM,uniforms:{...r,uNear:{value:240},uTwinkle:{value:n.twinkle},uChase:{value:n.chaseSpeed}}}),this.wireMat=new wt({vertexShader:sM,fragmentShader:aM,uniforms:r}),this.moteMat=new wt({vertexShader:oM,fragmentShader:lM,uniforms:{...st,uMoteColour:{value:new Qe(1,.85,1)}}})}scene;game;built=new Map;palette;bulbMat;wireMat;moteMat;build(e,t,n,r){const s=this.game.tuning.stringLights,a=s.height,o=[],c=[],l=[],u=[],d=[];e.forEach((S,y)=>{const w=Math.hypot(S.bx-S.ax,S.bz-S.az),E=Math.max(2,Math.round(w/s.bulbSpacing)),R=M=>[S.ax+(S.bx-S.ax)*M,a-s.sag*4*M*(1-M)*(w/8),S.az+(S.bz-S.az)*M];for(let M=0;M<=16;M++){const A=R(M/16),P=R((M+1)/16);M<16&&(u.push(...A,...P),d.push(y+M/16,y+(M+1)/16))}for(let M=1;M<E;M++){const A=M/E,P=R(A),D=this.palette[(S.seed+M)%this.palette.length];o.push(...P),c.push(D.r,D.g,D.b),l.push((S.seed*13+M*7)%100/100,y*40+M,t(P[0],P[2])+M*.03,4*A*(1-A))}});const h=new Fr,f=new zt;f.setAttribute("position",new At(o,3)),f.setAttribute("aColour",new At(c,3)),f.setAttribute("aBulb",new At(l,4));const g=new zt;g.setAttribute("position",new At(u,3)),g.setAttribute("aSway",new At(d,1)),h.add(new yl(g,this.wireMat),new $s(f,this.bulbMat));const x=[],m=[];for(let S=0;S<48;S++){const y=A=>{const P=Math.sin(r*12.9898+S*78.233+A*37.719)*43758.5453;return P-Math.floor(P)},w=y(1)*Math.PI*2,E=2+y(2)*14,R=n.x+Math.cos(w)*E,M=n.z+Math.sin(w)*E;x.push(R,.3,M),m.push(y(3),.4+y(4)*.6,.3+y(5)*.8,t(R,M))}const p=new zt;p.setAttribute("position",new At(x,3)),p.setAttribute("aMote",new At(m,4));const _=new $s(p,this.moteMat);return _.frustumCulled=!1,h.add(_),h.traverse(S=>{S.frustumCulled=!1}),h}update(){const e=this.game;if(!e.tuning.stringLights.on)return;let n=0;for(const[r,s]of e.party.areas){let a=this.built.get(r);if(!a){if(n++>=2)break;const o=nM(e.map,e.forest,s.cell),c=e.map.siteOf(s.cell[0],s.cell[1]),l=s.from?e.map.siteOf(s.from[0],s.from[1]):null,u=l?(l.x+c.x)/2:c.x,d=l?(l.z+c.z)/2:c.z,h=l?Math.hypot(c.x-u,c.z-d)*1.6:1,f=e.tuning.party.transition,g=(m,p)=>s.wave===0?-1:s.at+Math.min(1,Math.hypot(m-u,p-d)/h)*f,x=s.soundsystem??(s.wave===0?e.map.dancefloor:c);a={lines:o,group:this.build(o,g,x,s.cell[0]*131+s.cell[1]*17+e.seed),on:s.wave===0?-1:s.at},this.scene.add(a.group),this.built.set(r,a)}}}clear(){for(const[,e]of this.built)this.scene.remove(e.group);this.built.clear()}}const tn={uRight:{value:new W(1,0,0)},uUp:{value:new W(0,1,0)},uFacing:{value:new W(0,0,1)},uTopFade:{value:0},uCutout:{value:new ot(0,0,0,1)},uDebugCull:{value:0},uRes:{value:new Ge(1,1)}},hM=`
uniform vec3 uRight, uUp;
uniform vec2 uRes;
attribute vec3 iPos;
attribute vec2 iSize;
attribute vec4 iUv;
attribute vec3 iFlags;
varying vec2 vUv;
varying vec3 vWorld;
varying vec3 vFlags;
void main() {
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
`,uM=`
uniform sampler2D uAlbedo, uNormal;
uniform vec3 uRight, uUp, uFacing;
uniform float uTopFade, uUnlit;
uniform vec4 uCutout;
uniform float uDebugCull, uIsScenery;
varying vec2 vUv;
varying vec3 vWorld;
varying vec3 vFlags;
${jn}
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
  if (vFlags.y > 0.5) {
    // Crowns: hidden in a dithered hole round the witch, which closes as she rises.
    float d = length(gl_FragCoord.xy - uCutout.xy);
    float shown = smoothstep(uCutout.z - uCutout.w, uCutout.z, d);
    if (bayer(gl_FragCoord.xy) >= max(shown, uTopFade)) discard;
  }
  // Eye glints, flowers and magic glow: the generator marks them with alpha 254.
  if (uDebugCull > 0.5 && vFlags.z > 0.5) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); return; }
  if (uUnlit > 0.5) { gl_FragColor = vec4(a.rgb, 1.0); return; }
  if (a.a < 0.999) { gl_FragColor = vec4(haze(a.rgb, vWorld), 1.0); return; }
  vec4 n = texture2D(uNormal, vUv);
  float nx = (n.r * 255.0 - 128.0) / 127.0, ny = (n.g * 255.0 - 128.0) / 127.0, nz = n.b;
  if (vFlags.x > 0.5) nx = -nx;
  vec3 N = normalize(uRight * nx - uUp * ny + uFacing * nz);
  gl_FragColor = vec4(haze(min(vec3(1.0), a.rgb * nightLight(N, vWorld) * 1.25), vWorld), 1.0);
}
void main() {
  shade();
  // Scenery past the budget's radius fades out smoothly (alpha), from the far edge inward.
  if (uIsScenery > 0.5) {
    float k = sceneryFade(vWorld);
    if (k < 0.004) discard;
    gl_FragColor.a = k;
  }
}
`;class er{constructor(e,t,n={}){this.atlas=e,this.metresPerPixel=t;const r=new pn(1,1);r.translate(0,.5,0),this.geo=new wl,this.geo.index=r.index,this.geo.setAttribute("position",r.getAttribute("position")),this.geo.setAttribute("uv",r.getAttribute("uv")),this.pos=this.size=this.uvs=this.flags=void 0,this.grow(64);const s=new wt({vertexShader:hM,fragmentShader:uM,uniforms:{...st,...tn,uAlbedo:{value:e.albedo},uNormal:{value:e.normal},uUnlit:{value:n.unlit?1:0},uIsScenery:{value:n.scenery?1:0}},...n.scenery?{blending:aa,blendSrc:cl,blendDst:hl}:{},depthTest:!n.onTop,depthWrite:!n.onTop});this.mesh=new Vt(this.geo,s),this.mesh.frustumCulled=!1,n.onTop&&(this.mesh.renderOrder=10),n.scenery&&(this.mesh.renderOrder=.5)}atlas;metresPerPixel;mesh;geo;pos;size;uvs;flags;capacity=0;count=0;grow(e){const t=Math.max(e,this.capacity*2);this.geo.dispose();const n=(r,s)=>{const a=new Sl(new Float32Array(t*r),r);return a.setUsage(lr),s&&a.array.set(s.array),a};this.pos=n(3,this.pos),this.size=n(2,this.size),this.uvs=n(4,this.uvs),this.flags=n(3,this.flags),this.geo.setAttribute("iPos",this.pos),this.geo.setAttribute("iSize",this.size),this.geo.setAttribute("iUv",this.uvs),this.geo.setAttribute("iFlags",this.flags),this.capacity=t}set(e){e.length>this.capacity&&this.grow(e.length);const t=this.pos.array,n=this.size.array,r=this.uvs.array,s=this.flags.array;e.forEach((a,o)=>{t[o*3]=a.x,t[o*3+1]=a.y,t[o*3+2]=a.z,n[o*2]=a.frame.w*this.metresPerPixel,n[o*2+1]=a.frame.h*this.metresPerPixel,r.set(a.frame.uv,o*4),s[o*3]=a.flip?1:0,s[o*3+1]=a.top?1:0,s[o*3+2]=a.fresh?1:0});for(const a of[this.pos,this.size,this.uvs,this.flags])a.needsUpdate=!0;this.count=e.length,this.geo.instanceCount=e.length,this.mesh.visible=e.length>0}get dropped(){const e=this.geo._maxInstanceCount;return e===void 0||!this.mesh.visible?0:Math.max(0,this.count-e)}dispose(){this.geo.dispose(),this.mesh.material.dispose(),this.atlas.albedo.dispose(),this.atlas.normal.dispose()}}const Ot=32,tr=16,dM=`
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
}`,fM=`
uniform sampler2D uGlyphs;
varying vec2 vUv, vP;
varying vec4 vCol;
varying float vDraw;
varying vec3 vWorld;
${jn}
void main() {
  float a = texture2D(uGlyphs, vUv).a * vCol.a;
  // Written on: revealed clockwise from the top as vDraw goes 0 to 1.
  float ang = fract(atan(vP.x, vP.y) / 6.2831853 + 1.0);
  if (ang > vDraw || a < 0.02) discard;
  gl_FragColor = vec4(haze(vCol.rgb * a, vWorld), 1.0);
}`;class jc{mesh;geo=new wl;cap=0;n=0;pos;size;uv;col;draw;constructor(e){const t=new pn(1,1);this.geo.index=t.index,this.geo.setAttribute("position",t.getAttribute("position")),this.geo.setAttribute("uv",t.getAttribute("uv")),this.grow(256),this.mesh=new Vt(this.geo,e),this.mesh.frustumCulled=!1,this.mesh.renderOrder=3}grow(e){const t=(r,s)=>{const a=new Float32Array(e*s);return r&&a.set(r),a};this.pos=t(this.pos,3),this.size=t(this.size,1),this.uv=t(this.uv,4),this.col=t(this.col,4),this.draw=t(this.draw,1),this.cap=e,this.geo.dispose();const n=(r,s,a)=>this.geo.setAttribute(r,new Sl(s,a).setUsage(lr));n("iPos",this.pos,3),n("iSize",this.size,1),n("iUv",this.uv,4),n("iCol",this.col,4),n("iDraw",this.draw,1)}begin(){this.n=0}add(e,t,n,r,s,a,o,c,l,u=1){this.n>=this.cap&&this.grow(this.cap*2);const d=this.n++;this.pos.set([e,t,n],d*3),this.size[d]=r,this.uv.set(s,d*4),this.col.set([a,o,c,l],d*4),this.draw[d]=u}end(){this.geo.instanceCount=this.n;for(const e of["iPos","iSize","iUv","iCol","iDraw"])this.geo.getAttribute(e).needsUpdate=!0}}const pM=["🎉","🎈","💃","🎊","🥳","😛","🍉","🍒","🍷","🍸","🍹","🥂","🍺","😁","😆"],mM=[["😴","🫩","🥱","💼"],["😐","😐","🥱"],["😮","🤭","🫢","😛"],["🙂","🍷","🍺","😁"],["🥳","🎉","🎈","😆","🥂","💃"]];class gM{constructor(e,t){this.game=t,this.canvas.width=this.canvas.height=Ot*tr;const n=this.canvas.getContext("2d"),r=n.createRadialGradient(Ot/2,Ot/2,0,Ot/2,Ot/2,Ot/2);r.addColorStop(0,"rgba(255,255,255,1)"),r.addColorStop(.35,"rgba(255,255,255,.55)"),r.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=r,n.fillRect(0,0,Ot,Ot),this.tex=new d0(this.canvas),this.tex.magFilter=Dt,this.tex.minFilter=Dt,this.tex.generateMipmaps=!1;const s=a=>new wt({vertexShader:dM,fragmentShader:fM,uniforms:{...st,uRight:tn.uRight,uUp:tn.uUp,uFlat:{value:a},uGlyphs:{value:this.tex}},transparent:!0,depthWrite:!1,blending:pr});this.standing=new jc(s(0)),this.flat=new jc(s(1)),e.add(this.standing.mesh,this.flat.mesh)}game;canvas=document.createElement("canvas");tex;slots=new Map;colours=new Map;standing;flat;fizzles=[];bursts=[];chain=[];lastTime=0;bubbleWitch=document.getElementById("bubble-witch");bubbleCreature=document.getElementById("bubble-creature");v=new W;slotOf(e,t=0){const n=`${e}:${t}`;let r=this.slots.get(n);if(r!==void 0)return r;r=this.slots.size+1,this.slots.set(n,r);const s=this.canvas.getContext("2d"),a=r%tr*Ot,o=Math.floor(r/tr)*Ot;s.clearRect(a,o,Ot,Ot),xd(s,e,{x:a+1,y:o+1,size:Ot-2,level:t,colour:[255,255,255],glow:!1});const c=s.getImageData(a,o,Ot,Ot);for(let u=3;u<c.data.length;u+=4)c.data[u]=c.data[u]>90?255:0;s.putImageData(c,a,o);const l=na(e);return this.colours.set(e,new Qe(l[0]/255,l[1]/255,l[2]/255)),this.tex.needsUpdate=!0,r}uv(e){const t=Ot*tr,n=e%tr*Ot,r=Math.floor(e/tr)*Ot;return[n/t,1-r/t,(n+Ot)/t,1-(r+Ot)/t]}update(e,t,n,r,s){const a=this.game,o=a.leash,c=a.tuning,l=a.witch,u=c.bond,d=c.leash,h=this.uv(0);this.standing.begin(),this.flat.begin();for(const S of o.events)S.kind==="fizzled"&&this.fizzles.push({x:S.x,z:S.z,at:e}),S.kind==="invited"&&this.bursts.push({x:S.x,z:S.z,at:e,seed:S.id});this.fizzles=this.fizzles.filter(S=>e-S.at<.7),this.bursts=this.bursts.filter(S=>e-S.at<.9);for(const S of this.bursts){const y=(e-S.at)/.9;for(let w=0;w<28;w++){const E=Xe(S.seed,w,3)*Math.PI*2,R=2+Xe(S.seed,w,5)*3,M=2+Xe(S.seed,w,7)*3,A=[[1,.4,.8],[.3,.95,1],[1,.9,.3],[.6,1,.4],[1,1,1]][w%5];this.standing.add(S.x+Math.cos(E)*R*y,.6+M*y-4*y*y,S.z+Math.sin(E)*R*y,.3,h,A[0],A[1],A[2],1-y)}}if(o.talk){const S=a.creatures[o.talk.id],y=o.talk.refused?0:Math.min(1,o.talk.t/o.talk.total),w=28;for(let E=0;E<w;E++){const R=Math.PI/2-E/w*Math.PI*2,M=E/w<y;this.flat.add(S.x+Math.cos(R)*1.5,0,S.z+Math.sin(R)*1.1,.35,h,1,M?.6:.9,M?.9:1,M?.9:.18)}}const f=c.stack,g=Math.min(.1,Math.max(0,e-this.lastTime)),x=new Map;for(this.lastTime=e;this.chain.length<o.stack.length;)this.chain.push({x:0,z:0,vx:0,vz:0});let m={x:0,z:0},p=s;for(let S=o.stack.length-1;S>=0;S--){const y=o.stack[S],w=a.creatures[y],E=o.stack.length-1-S,R=this.chain[E],M=(2+w.level*.4)*f.scale,A=Math.sin(e*1.7+E*.9)*f.idleSway*(1+E*.5),P=m.x-l.vx*f.trail+A,D=m.z-l.vz*f.trail;R.vx+=((P-R.x)*f.stiffness-R.vx*f.damping)*g,R.vz+=((D-R.z)*f.stiffness-R.vz*f.damping)*g,R.x+=R.vx*g,R.z+=R.vz*g,m=R,p+=(E===0?f.offset*M:f.gap*M)+M/2;const B=new W(l.x+R.x,p,l.z+R.z);p+=M/2,x.set(y,B);const U=(this.slotOf(w.species,w.level),this.colours.get(w.species));this.standing.add(B.x,B.y,B.z,M,this.uv(this.slotOf(w.species,w.level)),U.r,U.g,U.b,1)}for(const S of o.placed){const y=a.creatures[S.id],w=this.slotOf(y.species,y.level),E=this.colours.get(y.species),R=.8+.2*Math.sin(e*2+S.id);this.flat.add(S.x,0,S.z,3+y.level*.8,this.uv(w),E.r*R,E.g*R,E.b*R,1,Math.min(1,(e-S.at)/.8)),this.flat.add(S.x,0,S.z,5,h,E.r,E.g,E.b,.25)}if(l.mode==="ground"&&o.stack.length&&!o.placed.some(S=>Math.hypot(S.x-l.x,S.z-l.z)<=d.pickRadius)){const S=a.creatures[o.stack[o.stack.length-1]],y=this.colours.get(S.species),w=Mh(o,l.x,l.z,c);this.flat.add(l.x,0,l.z,3+S.level*.8,this.uv(this.slotOf(S.species,S.level)),w?1:y.r,w?.1:y.g,w?.1:y.b,.22)}for(const S of this.fizzles){const y=1-(e-S.at)/.7;this.flat.add(S.x,0,S.z,3*(1+(1-y)*.6),h,1,.15,.1,y)}const _=[...o.stack,...o.placed.map(S=>S.id)];for(const S of _){const y=a.creatures[S],w=this.colours.get(y.species);if(!w)continue;const E=tf(o,S,l.x,l.z);u.rim&&this.flat.add(y.x,0,y.z,1.8,h,w.r,w.g,w.b,.35);const R=x.get(S)??new W(E.x,.2,E.z);if(u.sparks){const A=Math.max(.5,u.sparkEvery),P=(e+S*.618%1*A)%A;if(P<.7){const D=P/.7;this.standing.add(R.x+(y.x-R.x)*D,R.y+(.6-R.y)*D+Math.sin(D*Math.PI)*1.2,R.z+(y.z-R.z)*D,.35,h,w.r,w.g,w.b,1)}}const M=Math.hypot(y.x-E.x,y.z-E.z);if(u.thread&&M>d.length*.85){const A=Math.min(1,(M-d.length*.85)/d.length),P=Math.min(60,Math.floor(M/1.2));for(let D=1;D<P;D++){const B=(D+e*2%1)/P;this.standing.add(R.x+(y.x-R.x)*B,R.y+(.5-R.y)*B,R.z+(y.z-R.z)*B,.22,h,w.r,w.g,w.b,.25+.75*A)}}}this.standing.end(),this.flat.end(),this.bubbles(e,t,n,r)}bubbles(e,t,n,r){const s=this.game,a=s.leash.talk,o=this.bubbleWitch,c=this.bubbleCreature;if(!o||!c)return;const l=s.witch,u=(S,y,w,E)=>{this.v.set(y,w,E).project(t),S.style.left=`${(this.v.x+1)/2*n}px`,S.style.top=`${(1-this.v.y)/2*r}px`},d=c.querySelector("span"),h=c.querySelector(".bar");if(!a){c.style.opacity="0.85",h.style.display="none",o.classList.toggle("on",s.leash.held),s.leash.held&&(o.textContent=s.leash.heldInAir?"land to talk":"…",u(o,l.x-1.2,fr(l,s.tuning)+2.2,l.z));const S=l.mode==="ground"?nf(s.creatures,l.x,l.z,s.tuning):null;c.classList.toggle("on",!!S),S&&(d.textContent=S.level===3?"😒":"💬 T",u(c,S.x,1.2+S.level*.8,S.z));return}const f=s.creatures[a.id];if(u(o,l.x-1.2,fr(l,s.tuning)+2.2,l.z),u(c,f.x,1.2+f.level*.8,f.z),a.refused){o.classList.remove("on"),d.textContent=Xe(a.id,1,9)<.5?"😒":"🙄",h.style.display="none",c.classList.toggle("on",a.t<1.6),c.style.opacity="1";return}h.style.display="";const g=Math.floor(a.t/ef(f,s.tuning)),x=Math.min(1,a.t/a.total),m=(S,y)=>S[Math.floor(Xe(a.id,y,5)*S.length)%S.length],p=[4,2,0][Math.min(2,f.level)],_=Math.round(p+(4-p)*x);o.textContent=m(pM,g-g%2),o.classList.toggle("on",g%2===0),d.textContent=g>=1?m(mM[_],g-(g+1)%2):"…",h.querySelector("i").style.width=`${x*100}%`,c.classList.add("on"),c.style.opacity=g%2===1?"1":"0.6"}}const xM=[1,3,5,7,9],lu=i=>{const e=60/Math.max(1,i.beat.bpm);return{beat:e,bar:e*4}};function vM(i,e,t,n){const r=n.lasers,{beat:s,bar:a}=lu(n),o=a*Math.max(1,r.blockBars),c=Math.floor(i/o),l=i-c*o,u=pi(r.duty*t,0,1),h=Xe(e,c,311)<u?rn(l/Math.max(.001,r.fadeIn))*rn((o-l)/Math.max(.001,r.fadeOut)):0,f=Math.floor(l/a),g=xM.filter(y=>y<=r.maxCount),x=g[Math.floor(Xe(e,c*64+f,313)*g.length)%g.length]??1,m=e%97*.37,p=Math.sin(2*Math.PI*i/(s*r.sweepBeats)+m)*(r.sweep*Math.PI)/180,_=.55+.45*Math.sin(2*Math.PI*i/(a*r.openBars)+m*2),S=((e%1e3*.0137+i/(a*8))%1+1)%1;return{on:h,count:x,sweep:p,open:_,hue:S}}const _M=`
attribute vec4 aCol; // rgb, alpha
attribute float aU;  // 0 at the source, 1 at the far end
varying vec4 vCol;
varying float vU;
void main() { vCol = aCol; vU = aU; gl_Position = projectionMatrix * viewMatrix * vec4(position, 1.0); }`,MM=`
varying vec4 vCol;
varying float vU;
void main() { float a = vCol.a * pow(1.0 - vU, 0.6); gl_FragColor = vec4(vCol.rgb * a, 1.0); }`,Ur=[[.3,.95,1],[.35,.55,1],[.7,.4,1],[1,.3,.85],[.45,1,.55]],SM=i=>{const e=(i%1+1)%1*Ur.length,t=Math.floor(e),n=e-t,r=Ur[t%Ur.length],s=Ur[(t+1)%Ur.length];return[r[0]+(s[0]-r[0])*n,r[1]+(s[1]-r[1])*n,r[2]+(s[2]-r[2])*n]};class yM{constructor(e,t){this.game=t,this.mesh=new yl(this.geo,new wt({vertexShader:_M,fragmentShader:MM,transparent:!0,depthWrite:!1,blending:pr})),this.mesh.frustumCulled=!1,e.add(this.mesh)}game;geo=new zt;pos=new Float32Array(0);col=new Float32Array(0);u=new Float32Array(0);mesh;update(e,t,n,r){const s=this.game.tuning,a=s.lasers,{bar:o}=lu(s),c=o*a.blockBars,l=[],u=[],d=[];if(a.on)for(const h of t){const f=1-Math.min(1,Math.max(0,(Math.hypot(h.x-n,h.z-r)-a.fadeNear)/Math.max(1,a.fadeFar-a.fadeNear)));if(f<=0)continue;const g=vM(e,h.seed,1,s),x=e-h.ready,m=x>=0&&x<c?Math.min(1,x/a.fadeIn)*Math.min(1,(c-x)/a.fadeOut):0,p=Math.max(g.on,m),_=m>g.on?a.maxCount:g.count;if(p<=.01)continue;const S=a.spread*Math.PI/180*g.open;for(let y=0;y<_;y++){const w=_===1?0:y/(_-1)-.5,E=w*S+g.sweep,R=Math.sin(E),M=Math.cos(E),A=-.15*Math.cos(E*3+h.seed),P=SM(g.hue+y*.07),D=a.opacity*p*f;l.push(h.x,h.y,h.z,h.x+R*a.length,h.y+M*a.length,h.z+A*a.length),u.push(...P,D,...P,D),d.push(0,1)}}if(l.length>this.pos.length&&(this.pos=new Float32Array(l.length*2),this.col=new Float32Array(u.length*2),this.u=new Float32Array(d.length*2),this.geo.setAttribute("position",new dn(this.pos,3).setUsage(lr)),this.geo.setAttribute("aCol",new dn(this.col,4).setUsage(lr)),this.geo.setAttribute("aU",new dn(this.u,1).setUsage(lr))),!!this.geo.getAttribute("position")){this.pos.set(l),this.col.set(u),this.u.set(d);for(const h of["position","aCol","aU"])this.geo.getAttribute(h).needsUpdate=!0;this.geo.setDrawRange(0,l.length/3)}}}function*bM(i,e,t,n){const r=i.siteOf(e[0],e[1]),s=i.areaSize*1.5,a=Math.max(t*2,8),o=i.bounds,c=(p,_)=>{if(p<o.minX||p>o.maxX||_<o.minZ||_>o.maxZ)return"edge";const S=i.areaAt(p,_).cell;return`${S[0]},${S[1]}`},l=`${e[0]},${e[1]}`,u=Math.ceil(2*s/a),d=r.x-s,h=r.z-s,f=[];for(let p=0;p<=u;p++){for(let _=0;_<=u;_++)f.push(c(d+_*a,h+p*a));yield}const g=new Set,x=Math.max(1,Math.round(a/t)),m=a/x;for(let p=0;p<u;p++,yield)for(let _=0;_<u;_++){const S=[f[p*(u+1)+_],f[p*(u+1)+_+1],f[(p+1)*(u+1)+_],f[(p+1)*(u+1)+_+1]];if(!S.includes(l)||S.every(w=>w===l))continue;const y=[];for(let w=0;w<=x;w++)for(let E=0;E<=x;E++)y.push(c(d+_*a+E*m,h+p*a+w*m));for(let w=0;w<=x;w++)for(let E=0;E<=x;E++){const R=y[w*(x+1)+E],M=d+_*a+E*m,A=h+p*a+w*m;for(const[P,D]of[[1,0],[0,1]]){if(E+P>x||w+D>x)continue;const B=y[(w+D)*(x+1)+E+P];if(R===B||R!==l&&B!==l)continue;const U=M+P*m*.5,L=A+D*m*.5,O=`${Math.round(U*4)},${Math.round(L*4)}`;g.has(O)||(g.add(O),n.push({x:U,z:L,other:R===l?B:R}))}}}}const wM=`
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
}`,EM=`
uniform float uBright;
varying vec3 vColour;
varying vec3 vWorld;
varying float vB;
${jn}
void main() { gl_FragColor = vec4(haze(vColour * vB * uBright, vWorld), 1.0); }`;class TM{constructor(e,t){this.game=t;const n=t.tuning.borders;this.mesh=new $s(this.geo,new wt({vertexShader:wM,fragmentShader:EM,uniforms:{...st,uWidth:{value:n.width},uSparkle:{value:n.sparkle},uBright:{value:n.brightness}},transparent:!0,depthWrite:!1,blending:pr})),this.mesh.frustumCulled=!1,e.add(this.mesh)}game;areas=new Map;jobs=[];geo=new zt;stamp="";mesh;update(){const e=this.game,t=e.tuning.borders;if(!t.on){this.mesh.visible=!1;return}for(const[c,l]of e.party.areas){if(this.areas.has(c))continue;const u=e.map.siteOf(l.cell[0],l.cell[1]),d=l.from?e.map.siteOf(l.from[0],l.from[1]):null,h=d?(d.x+u.x)/2:u.x,f=d?(d.z+u.z)/2:u.z,g=e.map.areaSize*1.6,x=e.tuning.party.transition,m=na(fn[e.map.typeOf(l.cell[0],l.cell[1])].creature),p={points:[],colour:new Qe(m[0]/255,m[1]/255,m[2]/255),on:(_,S)=>l.wave===0?-1:l.at+Math.min(1,Math.hypot(_-h,S-f)/g)*x,done:!1};this.areas.set(c,p),this.jobs.push({key:c,gen:bM(e.map,l.cell,t.step,p.points)})}const n=performance.now()+3;for(;this.jobs.length&&performance.now()<n;){const c=this.jobs[0];c.gen.next().done&&(this.areas.get(c.key).done=!0,this.jobs.shift())}const r=`${e.party.areas.size}|${[...this.areas.values()].filter(c=>c.done).length}`;if(r===this.stamp)return;this.stamp=r;const s=[],a=[],o=[];for(const[,c]of this.areas)if(c.done)for(const l of c.points)l.other!=="edge"&&e.party.areas.has(l.other)||(s.push(l.x,.15,l.z),a.push(c.colour.r,c.colour.g,c.colour.b),o.push(((l.x*12.9898+l.z*78.233)%1+1)%1,c.on(l.x,l.z)));this.geo.setAttribute("position",new At(s,3)),this.geo.setAttribute("aColour",new At(a,3)),this.geo.setAttribute("aSpark",new At(o,2))}}const AM=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,CM=`
uniform float uStrength, uWind, uPixel;
uniform sampler2D uDepth; uniform vec2 uLow;
varying vec3 vWorld;
${jn}
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
}`;class RM{constructor(e,t,n,r,s,a,o){this.height=t,this.mat=new wt({vertexShader:AM,fragmentShader:CM,uniforms:{...st,uStrength:{value:e},uWind:{value:n},uPixel:{value:r},uDepth:{value:a},uLow:{value:o}},depthWrite:!1,depthTest:!s,blending:s?Bn:or}),this.mesh=new Vt(new pn(700,700).rotateX(-Math.PI/2),this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=2}height;mesh;mat;follow(e,t){this.mesh.position.set(e,this.height,t-150)}}const LM=`
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
}`,PM=`
uniform float uStrength;
varying vec2 vLocal;
varying vec3 vWorld;
varying float vScenery;
${jn}
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
}`;class DM{mesh;geo=new wl;attr;capacity=0;constructor(e,t=!0){const n=new pn(1,1).rotateX(-Math.PI/2);this.geo.index=n.index,this.geo.setAttribute("position",n.getAttribute("position")),this.attr=this.grow(1024);const r=new wt({vertexShader:LM,fragmentShader:PM,uniforms:{...st,uStrength:{value:e}},depthWrite:!1,...t?{transparent:!0,blending:aa,blendSrc:ol,blendDst:ll}:{}});this.mesh=new Vt(this.geo,r),this.mesh.frustumCulled=!1,this.mesh.renderOrder=1}grow(e){return this.capacity=Math.max(e,this.capacity*2),this.geo.dispose(),this.attr=new Sl(new Float32Array(this.capacity*4),4),this.attr.setUsage(lr),this.geo.setAttribute("iShadow",this.attr),this.attr}set(e){e.length>this.capacity&&this.grow(e.length);const t=this.attr.array;e.forEach((n,r)=>{t[r*4]=n.x,t[r*4+1]=n.z,t[r*4+2]=n.scenery?-n.w:n.w,t[r*4+3]=n.d}),this.attr.needsUpdate=!0,this.geo.instanceCount=e.length,this.mesh.visible=e.length>0}}const IM=i=>({radius:i.haze.far,fps:i.scenery.fps,slowFor:0,fastFor:0});function UM(i,e,t){const n=t.scenery;if(!n.adaptive||!(e>0)||e>.25)return i;const r=i.fps+(1/e-i.fps)*Math.min(1,e*4),s=r<n.fps-n.hysteresis?i.slowFor+e:0,a=r>=n.fps?i.fastFor+e:0;let o=i.radius;return s>n.sustain?o-=n.shrink*e:a>n.sustain&&(o+=n.grow*e),o=Math.min(t.haze.far,Math.max(Math.min(n.minRadius,t.haze.far),o)),{radius:o,fps:r,slowFor:s,fastFor:a}}class NM{constructor(e,t,n){this.canvas=e,this.game=t,this.style=n;const r=t.tuning;this.budget=IM(r),this.renderer=new M_({canvas:e,antialias:!1,powerPreference:"high-performance",preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.info.autoReset=!1,this.renderer.outputColorSpace=Vr,this.mpp=1/(r.artPixelsPerMetre*(2/r.pixelSize)),this.camera=new ln(r.camera.fov,1,1,900),this.post=new q_(this.renderer,r),this.scene.background=new Qe(723478),B_(n,r.glowReach,this.mpp,r.tone.ambient),st.uGlowPower.value=r.glowPower,this.assets=new O_(n,t.seed,r.pixelSize),this.ground=new G_(t.map,t.forest,n,this.mpp),this.assets.onFloor=(d,h)=>this.ground.setFloor(d,h);const s=r.canopyShadow;this.ground.setCanopyShadow(s.on?s.strength:0,s.height,s.cover,s.wind),this.shadows=new DM(r.shadows.strength,r.fx==="smooth"),this.shadows.mesh.visible=r.shadows.on,this.scene.add(this.shadows.mesh);const a=r.fx==="smooth";st.uSmooth.value=a?1:0,r.mist.on&&r.mist.strength>0&&(this.mist=new RM(r.mist.strength,r.mist.height,r.mist.wind,this.mpp,a,this.post.scene.depthTexture,this.post.lowSize),a?(this.post.fxScene=new uc,this.post.fxScene.add(this.mist.mesh)):this.scene.add(this.mist.mesh)),st.uHazeRange.value.set(r.haze.near,r.haze.far),this.scene.add(this.ground.mesh),this.witchBatch=new er(this.assets.witch,this.mpp,{unlit:!0,onTop:!0}),this.scene.add(this.witchBatch.mesh),this.stoneBatch=new er(this.assets.stones,this.mpp),this.scene.add(this.stoneBatch.mesh);const o=t.map.dancefloor,c=[],l=t.tuning.dancefloor.stones;for(let d=0;d<l;d++){const h=d/l*Math.PI*2+.3;c.push({x:o.x+Math.cos(h)*o.radius,y:0,z:o.z+Math.sin(h)*o.radius,frame:this.assets.stones.frames[d%4],flip:d%2===0})}this.stoneBatch.set(c),this.propBatch=new er(this.assets.props,this.mpp),this.scene.add(this.propBatch.mesh),this.partyView=new tM(this.assets.soundsystems,this.mpp),this.strings=new cM(this.scene,t),this.leashView=new gM(this.scene,t),this.lasers=new yM(this.scene,t),this.borders=new TM(this.scene,t),this.soundBatch=new er(this.assets.soundsystems,this.mpp),this.scene.add(this.soundBatch.mesh),this.dancefloor=new j_(t.map,r,tn,this.mpp),this.scene.add(this.dancefloor.ball,this.dancefloor.beam,this.dancefloor.motes);const u=r.fx==="smooth"?new wt({transparent:!0,depthWrite:!1,blending:aa,blendSrc:ol,blendDst:ll,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"varying vec2 vUv; void main(){ vec2 p = vUv * 2.0 - 1.0; float r = dot(p, p); if (r > 1.0) discard; gl_FragColor = vec4(vec3(1.0 - 0.75 * (1.0 - r) * (1.0 - r)), 1.0); }"}):new wt({transparent:!1,depthWrite:!1,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"varying vec2 vUv; void main(){ vec2 p = vUv * 2.0 - 1.0; if (dot(p, p) > 1.0 || mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0) > 0.5) discard; gl_FragColor = vec4(0.02, 0.02, 0.05, 1.0); }"});this.shadow=new Vt(new pn(1.4,.7).rotateX(-Math.PI/2),u),this.shadow.renderOrder=1,this.scene.add(this.shadow)}canvas;game;style;renderer;scene=new uc;camera;ground;assets;typeBatches=new Map;creatureBatches=new Map;witchBatch;stoneBatch;shadow;mpp;lastBuild={x:1/0,y:1/0,z:1/0,version:-1,radius:-1};budget;sceneryFixed=null;lastReal=0;post;dancefloor;propBatch;partyView;strings;leashView;lasers;borders;soundBatch;sources=[];forestLights=[];shadows;shadowList=[];mist=null;width=1;height=1;debugCull=!1;ghosts=[];ghostLines=null;now=0;stats={sceneryRadius:0,fps:0,gameplay:0,scenery:0,dropped:0,trees:0,bushes:0,creatures:0,batches:0,drawCalls:0,pendingArt:0,pendingGround:0,lights:0};resize(e,t){const n=this.game.tuning.pixelSize;this.width=Math.max(1,Math.ceil(e/n)),this.height=Math.max(1,Math.ceil(t/n));const r=this.post.fullResolution?n:1;this.renderer.setSize(this.width*r,this.height*r,!1),this.post.resize(this.width,this.height,this.width*r,this.height*r),this.canvas.style.width=this.width*n+"px",this.canvas.style.height=this.height*n+"px",this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix(),tn.uRes.value.set(this.width,this.height)}async prepare(){this.render(0,!1),this.drawCreatures(),this.ground.fill(this.renderer,this.viewRect(this.game.tuning.haze.near,20),this.game.witch.x,this.game.witch.z,1/0),await this.assets.whenIdle(),this.render(0,!1),this.refresh(!0);for(let e=0;e<fn.length;e++)this.assets.prefetchType(e);for(const e of fn)this.assets.creatureArt(e.creature)}batchFor(e,t,n){let r=e.get(t);return r||(r=n(),r&&(e.set(t,r),this.scene.add(r.mesh))),r}frustum=new Ys;frustumTo=new Ys;cullCam=new ln;box=new _r;m4=new Ct;v3=new W;at=new Map;tracks={placed:{now:new Set,before:new Set},moving:{now:new Set,before:new Set}};pops=[];poseCamera(e,t){const n=t.angle*Math.PI/180;e.position.set(t.tx,t.ty+Math.sin(n)*t.distance,t.tz+Math.cos(n)*t.distance),e.up.set(0,1,0),e.lookAt(t.tx,t.ty,t.tz),e.updateMatrixWorld()}updateFrustum(){const e=this.game,t=e.tuning,n=this.camera;n.updateMatrixWorld(),this.m4.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this.frustum.setFromProjectionMatrix(this.m4);const r=Math.max(1,t.camera.zoomSteps),s=e.witch.mode==="rising"||e.witch.mode==="treetop"?1:0,a=ih({...e.camera,zoom:r>1?e.camera.zoomStep/(r-1):0},s,t),o=this.cullCam;o.fov=n.fov,o.aspect=n.aspect,o.near=n.near,o.far=n.far,o.updateProjectionMatrix(),this.poseCamera(o,{...a,ty:Tn(t.groundHeight,t.treetopHeight,s)}),this.m4.multiplyMatrices(o.projectionMatrix,o.matrixWorldInverse),this.frustumTo.setFromProjectionMatrix(this.m4)}viewRect(e,t){const n=this.game.witch,r=[];for(const o of[this.camera,this.cullCam]){const c=o.position,l=e+Math.hypot(c.x-n.x,c.z-n.z)+t;for(const u of[-1,1])for(const d of[-1,1]){const h=this.v3.set(u,d,1).unproject(o).sub(c).normalize();for(const f of[0,25]){let g=h.y<-.001?(f-c.y)/h.y:1/0;g>0||(g=1/0),g=Math.min(g,l),r.push([c.x+h.x*g,c.z+h.z*g])}}r.push([c.x,c.z])}const s=r.map(o=>o[0]),a=r.map(o=>o[1]);return{minX:Math.min(...s)-t,maxX:Math.max(...s)+t,minZ:Math.min(...a)-t,maxZ:Math.max(...a)+t}}inView(e,t,n,r,s,a=this.game.tuning.haze.far){const o=this.game.witch.x,c=this.game.witch.z,l=a+s;return(e-o)**2+(t-c)**2>l*l?!1:(this.box.min.set(e-n/2-s,-s,t-r-s),this.box.max.set(e+n/2+s,r+s,t+s),this.frustum.intersectsBox(this.box)||this.frustumTo.intersectsBox(this.box))}inInnerView(e,t,n){const r=this.game.witch,s=this.game.tuning.haze;if(Math.hypot(e-r.x,t-r.z)>s.near+(s.far-s.near)*.6)return!1;for(const a of[0,n*.5,n]){const o=this.v3.set(e,a,t).project(this.camera);if(Math.abs(o.x)<1&&Math.abs(o.y)<1&&o.z<1)return!0}return!1}mark(e,t,n,r,s=""){const a=e==="creature"||e==="prop"?this.tracks.moving:this.tracks.placed,o=e==="creature"?`${e}|${s}`:`${e}|${t.toFixed(1)}|${n.toFixed(1)}|${r.toFixed(1)}|${s}`;return e==="creature"&&this.at.set(o,[t,n,r]),a.now.add(o),!a.before.has(o)}checkPops(e,t=!0){const n=this.tracks[e],r=t&&this.assets.pending===0&&n.before.size>0;if(this.debugCull){for(const s of n.before)if(!n.now.has(s)){const a=this.at.get(s),[,...o]=s.split("|"),[c,l,u]=a??o.map(Number);this.ghosts.push({x:+c,z:+l,h:Math.max(1,+u),until:this.now+1})}}if(r){const s=(a,o)=>{const c=this.at.get(a),[l,...u]=a.split("|"),[d,h,f]=c??u.map(Number),g=this.game.witch;!(e==="placed"&&Math.hypot(+d-g.x,+h-g.z)>this.budget.radius-this.game.tuning.scenery.fade)&&this.inInnerView(+d,+h,+f)&&this.pops.push(`${o} ${l} ${(+d).toFixed(0)},${(+h).toFixed(0)}`)};for(const a of n.now)n.before.has(a)||s(a,"appeared");for(const a of n.before)n.now.has(a)||s(a,"vanished")}n.before=n.now,n.now=new Set}lastPose={distance:0,angle:0,zoomStep:-1,lift:-1};refresh(e=!1){const t=this.game,n=t.tuning,r=this.camera,s=n.viewMargin,a=ql(t),o={x:r.position.x,y:r.position.y,z:r.position.z},c=this.lastPose,l=t.witch.mode==="rising"||t.witch.mode==="treetop"?1:0,u=Math.hypot(o.x-this.lastBuild.x,o.y-this.lastBuild.y,o.z-this.lastBuild.z)>=s/3,d=this.budget.radius,h=Math.min(n.haze.far,d+s/2),f=Math.abs(d-this.lastBuild.radius)>=s/3,g=Math.abs(a.distance-c.distance)>2||Math.abs(a.angle-c.angle)>.5||t.camera.zoomStep!==c.zoomStep||l!==c.lift;if(!e&&!u&&!g&&!f&&this.assets.version===this.lastBuild.version)return;this.lastBuild={...o,version:this.assets.version,radius:d},this.lastPose={distance:a.distance,angle:a.angle,zoomStep:t.camera.zoomStep,lift:l};const x=this.viewRect(h,s),m=(x.minX+x.maxX)/2,p=(x.minZ+x.maxZ)/2,_=Math.max(x.maxX-x.minX,x.maxZ-x.minZ)/2,S=[],y=st.uMoonDir.value,w=-y.x/Math.max(.2,y.y),E=-y.z/Math.max(.2,y.y),R=new Map,M=(U,L)=>{let O=R.get(U);O||R.set(U,O=[]),O.push(L)},A=this.mpp;let P=0,D=0;for(const U of t.forest.treesNear(m,p,_)){const L=this.assets.typeArt(U.type);if(!L||!L.layout.big.length)continue;const O=L.atlas.frames,F=L.layout.big[U.variant%L.layout.big.length],Y=O[F.top??F.bot];if(!this.inView(U.x,U.z,Y.w*A,Y.h*A,s,h))continue;const j=this.mark("tree",U.x,U.z,Y.h*A);M(U.type,{x:U.x,y:0,z:U.z,frame:O[F.bot],flip:U.flip,fresh:j}),F.top!==null&&M(U.type,{x:U.x,y:0,z:U.z,frame:O[F.top],flip:U.flip,top:!0,fresh:j});const X=Y.w*A,te=Y.h*A*(F.top===null?.2:.6);n.shadows.trees&&S.push({x:U.x+w*te,z:U.z+E*te,w:X*.8,d:X*.45,scenery:!0}),P++}const B=(U,L,O)=>{for(const F of L){const Y=this.assets.typeArt(F.type);if(!Y)continue;const j=O(Y.layout);if(!j.length)continue;const X=j[F.variant%j.length],te=Y.atlas.frames,N=te[X.bot],ne=te[X.top??X.bot];if(!this.inView(F.x,F.z,ne.w*A,ne.h*A,s,h))continue;const oe=this.mark(U,F.x,F.z,ne.h*A);M(F.type,{x:F.x,y:0,z:F.z,frame:N,flip:F.flip,fresh:oe}),X.top!==null&&M(F.type,{x:F.x,y:0,z:F.z,frame:te[X.top],flip:F.flip,top:!0,fresh:oe}),S.push({x:F.x,z:F.z,w:N.w*A*.8,d:N.w*A*.3,scenery:!0}),D++}};B("small",t.forest.bushesNear(m,p,_),U=>U.small),B("wall",t.forest.wallsNear(m,p,_),U=>U.walls.map(L=>({bot:L,top:null}))),B("setpiece",t.forest.setPiecesNear(m,p,_),U=>U.set===null?[]:[U.set]);for(const[U,L]of this.typeBatches)R.has(U)||L.set([]);for(const[U,L]of R)this.batchFor(this.typeBatches,U,()=>{const F=this.assets.typeArt(U);return F&&new er(F.atlas,A,{scenery:!0})})?.set(L);this.checkPops("placed",!e),this.sources=t.forest.lightsNear(t.witch.x,t.witch.z,n.haze.far+s),this.stats.trees=P,this.stats.bushes=D,this.shadowList=S}drawCreatures(e=0){const t=this.game,n=t.tuning.haze.far+20,r=new Map,s=new Map,a=[],o=60/t.tuning.beat.bpm;let c=0;for(const l of t.creatures){if(Math.abs(l.x-t.witch.x)>n||Math.abs(l.z-t.witch.z)>n)continue;const u=l.leashed?this.assets.partyArt(l.species,l.id,na(l.species)):void 0,d=u??this.assets.creatureArt(l.species),h=u?`party-${l.id}`:l.species;if(!d)continue;s.set(h,d);const f=d.atlas.frames[d.frame(l.level,l.moving?Math.floor(l.walk)%2:0,l.away)];if(!this.inView(l.x,l.z,f.w*this.mpp,f.h*this.mpp,4))continue;const g=this.mark("creature",l.x,l.z,f.h*this.mpp,l.id);let x=r.get(h);x||r.set(h,x=[]);const m=(e/o+l.id%4*.25)*Math.PI,p=l.leashed?Math.abs(Math.sin(m))*(l.moving?.15:.4):0,_=l.leashed&&!l.moving?Math.sin(m*.5)*.12:0;x.push({x:l.x+_,y:p,z:l.z,frame:f,flip:l.facing<0,fresh:g}),a.push({x:l.x,z:l.z,w:f.w*this.mpp*.7,d:f.w*this.mpp*.25}),c++}for(const[l,u]of this.creatureBatches)r.has(l)||u.set([]);for(const[l,u]of r)this.batchFor(this.creatureBatches,l,()=>{const h=s.get(l);return h&&new er(h.atlas,this.mpp)})?.set(u);this.stats.creatures=c,this.game.tuning.shadows.on&&this.shadows.set(this.shadowList.concat(a))}fire=new W(1,.5,.16);runeCyan=new W(.3,.9,1);runeViolet=new W(.75,.45,1);runeGreen=new W(.45,1,.5);updateSources(e){const t=this.assets.props.frames,n=[],r=[];for(const s of this.sources){if(s.kind==="pond")continue;const a=Xe(Math.round(s.x*10),Math.round(s.z*10),7);if(s.kind==="campfire"){const o=.8+.12*Math.sin(e*11+a*40)+.08*Math.sin(e*23.7+a*13);r.push({x:s.x+Math.sin(e*9+a)*.08,y:1.2,z:s.z,reach:this.game.tuning.lights.campfire.reach*s.size,rgb:this.fire,strength:this.game.tuning.lights.campfire.strength*o});const c=t[Math.floor(e*8+a*10)%3];this.inView(s.x,s.z,c.w*this.mpp,c.h*this.mpp,4)&&n.push({x:s.x,y:0,z:s.z,frame:c,flip:a<.5,fresh:this.mark("prop",s.x,s.z,2)})}else{const o=a<.33?1:a<.66?0:2,c=.7+.3*Math.sin(e*.9+a*20),l=t[3+o];r.push({x:s.x,y:2,z:s.z,reach:this.game.tuning.lights.stone.reach*s.size,rgb:[this.runeCyan,this.runeViolet,this.runeGreen][o],strength:this.game.tuning.lights.stone.strength*c}),this.inView(s.x,s.z,l.w*this.mpp,l.h*this.mpp,4)&&n.push({x:s.x,y:0,z:s.z,frame:l,flip:a<.5,fresh:this.mark("prop",s.x,s.z,2.6)})}}this.propBatch.set(n),this.forestLights=r}setLights(e,t,n){const r=Math.min(ur,this.game.tuning.lightBudget),s=e.map(l=>({l,d:Math.hypot(l.x-t,l.z-n)-l.reach})).sort((l,u)=>l.d-u.d).slice(0,r+1),a=s.length>r?s[r].d:1/0,o=st;let c=0;for(const{l,d:u}of s.slice(0,r)){const d=Math.min(1,Math.max(0,(a-u)/15));o.uLightPos.value[c].set(l.x,l.y,l.z,l.reach),o.uLightCol.value[c].set(l.rgb.x,l.rgb.y,l.rgb.z,l.strength*d),c++}o.uLightCount.value=c,this.stats.lights=c}drawGhosts(e){this.now=e,this.ghosts=this.ghosts.filter(a=>a.until>e),this.ghostLines||(this.ghostLines=new yl(new zt,new Yh({color:16719904,depthTest:!1})),this.ghostLines.frustumCulled=!1,this.ghostLines.renderOrder=20,this.scene.add(this.ghostLines));const t=tn.uRight.value,n=tn.uUp.value,r=[];for(const a of this.ghosts){const o=a.h*.4,c=(f,g)=>[a.x+t.x*f*o+n.x*g*a.h,t.y*f*o+n.y*g*a.h,a.z+t.z*f*o+n.z*g*a.h],l=c(-1,0),u=c(1,0),d=c(1,1),h=c(-1,1);r.push(...l,...u,...u,...d,...d,...h,...h,...l,...l,...d)}const s=this.ghostLines.geometry;s.dispose(),s.setAttribute("position",new At(r,3)),s.setDrawRange(0,r.length/3),this.ghostLines.visible=r.length>0}render(e,t=!0){const n=this.game,r=n.tuning,s=ql(n);if(t){const A=performance.now();this.lastReal&&(this.budget=UM(this.budget,(A-this.lastReal)/1e3,r)),this.lastReal=A}this.sceneryFixed!==null&&(this.budget.radius=Math.min(r.haze.far,Math.max(1,this.sceneryFixed))),st.uScenery.value.set(this.budget.radius,Math.max(1,r.scenery.fade));const a=s.angle*Math.PI/180,o=2*s.distance*Math.tan(r.camera.fov*Math.PI/360)/this.height,c=new W(0,Math.cos(a),-Math.sin(a)),l=new W(s.tx,s.ty,s.tz),u=l.dot(c),d=l.x;l.addScaledVector(c,Math.round(u/o)*o-u),l.x+=Math.round(d/o)*o-d;const h=new W(0,Math.sin(a),Math.cos(a)).multiplyScalar(s.distance);this.camera.position.copy(l).add(h),this.camera.up.set(0,1,0),this.camera.lookAt(l),this.updateFrustum();const f=r.spriteTilt;tn.uUp.value.set(0,1,0).lerp(c,f).normalize(),tn.uFacing.value.crossVectors(tn.uRight.value,tn.uUp.value).normalize();const g=Wl(n.witch),x=r.canopyCutout;this.camera.updateMatrixWorld();const m=this.v3.set(n.witch.x,fr(n.witch,r)*.5,n.witch.z).project(this.camera);tn.uCutout.value.set((m.x*.5+.5)*this.width,(m.y*.5+.5)*this.height,.5*x.screenFraction*this.width*(1-g),Math.max(1,x.edge*this.width*(1-g))),tn.uTopFade.value=g,tn.uDebugCull.value=this.debugCull?1:0;const p=n.witch,_=fr(p,r);st.uGlowPos.value.set(p.x,_+r.glowHeight,p.z),st.uHazeCentre.value.set(p.x,p.z),this.updateSources(e);const S=this.partyView.update(n,e,(A,P,D,B)=>this.inView(A,P,D,B,4),()=>!1);this.soundBatch.set(S.items),this.ground.setSweeps(S.sweeps),this.lasers.update(e,S.playing,p.x,p.z),this.strings.update(),this.borders.update(),this.setLights([this.dancefloor.update(e,this.ground),...S.lights,...this.forestLights],p.x,p.z),st.uTime.value=e,this.mist?.follow(s.tx,s.tz);const y=Math.sin(e*2.4)*.12,w=p.lean?6+(p.away?1:0):(p.away?3:0)+Math.floor(e*4)%3,E=this.assets.witch.frames[w],R=_+y-.4+E.h*this.mpp;if(this.witchBatch.set([{x:p.x,y:_+y-.4,z:p.z,frame:E,flip:p.facing<0}]),this.shadow.position.set(p.x,.03,p.z),this.shadow.scale.setScalar(1-.5*Wl(p)),this.refresh(),this.drawCreatures(e),this.checkPops("moving"),this.leashView.update(e,this.camera,this.canvas.clientWidth||window.innerWidth,this.canvas.clientHeight||window.innerHeight,R),this.assets.work(6),this.stats.pendingGround=this.ground.fill(this.renderer,this.viewRect(r.haze.far,40),p.x,p.z,4),this.stats.pendingArt=this.assets.pending,this.debugCull&&this.drawGhosts(e),!t)return;this.renderer.info.reset(),this.post.render(this.scene,this.camera);let M=0;for(const A of[...this.typeBatches.values(),...this.creatureBatches.values(),this.propBatch,this.soundBatch])M+=A.dropped;M&&!this.stats.dropped&&console.warn(`view: ${M} sprite instances set but not drawn`),this.stats.dropped=M,this.stats.drawCalls=this.renderer.info.render.calls,this.stats.batches=this.typeBatches.size+this.creatureBatches.size,this.stats.sceneryRadius=this.budget.radius,this.stats.fps=this.budget.fps,this.stats.scenery=this.stats.trees+this.stats.bushes,this.stats.gameplay=this.stats.creatures+this.propBatch.count+this.soundBatch.count}}const FM="The art style: knobs from the Witch Art Lab. Paste a style saved in the Lab here (its whole saved JSON, or just its style object). Any knob left out follows the Lab's current default, so an empty style means the Lab's default look, and stays up to date as the art changes.",OM="Lab default",BM={},zM={_readme:FM,name:OM,style:BM};function kM(i=zM){const e=i??{},t=e.style&&typeof e.style=="object"?e.style:e,n=P_();for(const[r,s]of Object.entries(t))r in n&&(n[r]=s);return n}function GM(i,e){const t=i.querySelector("#stick"),n=t.querySelector(".knob"),r=56;let s=null,a=0,o=0;const c=()=>i.classList.add("touch"),l=i.querySelector("#stick-zone");l.addEventListener("pointerdown",f=>{if(!(f.pointerType==="mouse"||s!==null)){c(),s=f.pointerId,a=f.clientX,o=f.clientY,t.style.left=a+"px",t.style.top=o+"px",t.classList.add("on");try{l.setPointerCapture(f.pointerId)}catch{}f.preventDefault()}}),l.addEventListener("pointermove",f=>{if(f.pointerId!==s)return;let g=f.clientX-a,x=f.clientY-o;const m=Math.hypot(g,x);m>r&&(g*=r/m,x*=r/m),n.style.transform=`translate(${g}px, ${x}px)`;const p=Math.min(1,m/r),_=.15,S=p<_?0:(p-_)/(1-_)/Math.max(1e-6,p);e.x=g/r*S,e.y=x/r*S});const u=f=>{f.pointerId===s&&(s=null,e.x=0,e.y=0,n.style.transform="",t.classList.remove("on"))};l.addEventListener("pointerup",u),l.addEventListener("pointercancel",u);const d=(f,g)=>{const x=i.querySelector(f);x.addEventListener("pointerdown",m=>{m.preventDefault(),m.stopPropagation(),g(),x.classList.add("down")}),x.addEventListener("pointerup",()=>x.classList.remove("down")),x.addEventListener("pointerleave",()=>x.classList.remove("down"))};d("#rise",()=>e.toggle=!0),d("#zoom-in",()=>e.zoom-=1),d("#zoom-out",()=>e.zoom+=1),d("#sigil",()=>e.sigil=!0);const h=i.querySelector("#talk");h.addEventListener("pointerdown",f=>{f.preventDefault(),f.stopPropagation(),e.talk=!0,h.classList.add("down")});for(const f of["pointerup","pointerleave","pointercancel"])h.addEventListener(f,()=>{e.talk=!1,h.classList.remove("down")});window.addEventListener("touchstart",f=>{c(),f.touches.length===3&&(e.debug=!0)},{passive:!0})}const mn=new URLSearchParams(location.search);let Ri=Ud(mn.get("seed"));Ri===null&&(Ri=Math.floor(Math.random()*1e6),mn.set("seed",String(Ri)),history.replaceState(null,"","?"+mn.toString()+location.hash));const un={...ki,bloom:{...ki.bloom},tiltShift:{...ki.tiltShift},shadows:{...ki.shadows},canopyShadow:{...ki.canopyShadow},mist:{...ki.mist}};mn.get("shadows")==="off"&&(un.shadows.on=!1);mn.get("canopy")==="off"&&(un.canopyShadow.on=!1);mn.get("mist")==="off"&&(un.mist.on=!1);const ws=mn.get("tilt");ws==="off"?un.tiltShift.on=!1:(ws==="before"||ws==="after")&&(un.tiltShift.on=!0,un.tiltShift.where=ws);mn.get("bloom")==="off"&&(un.bloom.on=!1);const Ja=mn.get("fx");(Ja==="pixel"||Ja==="smooth")&&(un.fx=Ja);const $t=uf(Ri,un),HM=document.getElementById("game"),Qa=kM(),Fi=new NM(HM,$t,{...Qa,pixel:un.pixelSize,treeSize:Qa.treeSize*un.treeHeight,crownWidth:Qa.crownWidth*un.crownWidth/un.treeHeight});Fi.debugCull=mn.get("debug")==="cull";const eh=Number(mn.get("scenery"));mn.has("scenery")&&eh>0&&(Fi.sceneryFixed=eh);const yr=new am;document.getElementById("next-wave").addEventListener("pointerdown",i=>{i.preventDefault(),yr.touch.nextWave=!0});document.getElementById("pause-waves").addEventListener("pointerdown",i=>{i.preventDefault(),yr.touch.pauseWaves=!0});GM(document.body,yr.touch);const cu=document.getElementById("help");try{localStorage.getItem("witch.help")==="off"&&cu.classList.add("off")}catch{}window.addEventListener("keydown",i=>{if(i.code!=="KeyH"||i.repeat)return;const e=cu.classList.toggle("off");try{localStorage.setItem("witch.help",e?"off":"on")}catch{}});document.getElementById("version").textContent="v92 · ac91e92";const VM=document.getElementById("seed");VM.innerHTML=`seed <a href="?seed=${Ri}">${Ri}</a>`;const Ko=document.getElementById("debug"),El=document.getElementById("start"),hu=document.getElementById("debug-buttons"),Tl=document.getElementById("wave"),WM=Tl.querySelector(".fill"),XM=Tl.querySelector(".label");let Ti=mn.has("debug");Ko.classList.toggle("on",Ti);hu.classList.toggle("on",Ti);const uu=()=>Fi.resize(window.innerWidth,window.innerHeight);window.addEventListener("resize",uu);uu();let ha=!1;requestAnimationFrame(()=>setTimeout(async()=>{await Fi.prepare(),ha=!0,El.classList.remove("loading")},0));let th=null;function du(){if(!ha||!$t.clock.paused)return!1;try{th??=new AudioContext,th.resume()}catch{}return $t.clock.paused=!1,El.style.display="none",yr.clearPresses(),!0}yr.onAny=du;El.addEventListener("pointerdown",i=>{i.preventDefault(),du()});document.addEventListener("visibilitychange",()=>{document.hidden&&(Bs=0)});let Bs=0,nh=60,ja=0,Es=0;function fu(i){requestAnimationFrame(fu);const e=Bs?(i-Bs)/1e3:0;Bs=i,ja++,Es+=e,Es>=.5&&(nh=ja/Es,ja=0,Es=0);const t=yr.read();if(t.debug&&(Ti=!Ti,Ko.classList.toggle("on",Ti),hu.classList.toggle("on",Ti)),df($t,t,e),!ha)return;const n=hf($t.party,$t.map,$t.clock.time);if(WM.style.height=`${(1-n.gone)*100}%`,XM.textContent=`wave ${$t.party.wave} · ${$t.party.areas.size} areas · ${Math.ceil(n.left)} s`,Tl.classList.toggle("paused",$t.party.paused),Fi.render($t.clock.time),Ti){const r=$t.witch,s=Fi.stats;Ko.textContent=[`fps    ${nh.toFixed(0)}`,`seed   ${Ri}`,`area   ${yh($t)}`,`mode   ${r.mode}`,`at     ${r.x.toFixed(0)}, ${r.z.toFixed(0)} m   zoom ${$t.camera.zoomStep}`,`trees  ${s.trees}  bushes ${s.bushes}  creatures ${s.creatures}`,`budget scenery to ${s.sceneryRadius.toFixed(0)} m (${s.scenery})  gameplay ${s.gameplay}  dropped ${s.dropped}`,`draws  ${s.drawCalls}  art queued ${s.pendingArt}  ground tiles ${s.pendingGround}`].join(`
`)}}requestAnimationFrame(fu);window.witch={game:$t,view:Fi,areaUnderWitch:()=>yh($t),areaTypeId:i=>fn[i].id,get ready(){return ha}};
