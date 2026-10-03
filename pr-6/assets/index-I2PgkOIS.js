(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();function vi(i){let e=i>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function Ye(i,e,t){let n=Math.imul(i|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967296}function Fs(i,e,t){const n=Math.floor(i),r=Math.floor(e),s=i-n,a=e-r,o=s*s*(3-2*s),c=a*a*(3-2*a),l=Ye(n,r,t),u=Ye(n+1,r,t),d=Ye(n,r+1,t),h=Ye(n+1,r+1,t);return l+(u-l)*o+(d-l)*c+(l-u-d+h)*o*c}const Ln=(i,e,t)=>i+(e-i)*t,_i=(i,e,t)=>Math.min(t,Math.max(e,i)),ln=i=>{const e=_i(i,0,1);return e*e*(3-2*e)};function Uu(i,e,t,n){const r=Math.max(1,i.camera.zoomSteps),s=_i(Math.round(i.camera.startZoom),0,r-1),a=r>1?s/(r-1):0;return{zoomStep:s,zoom:a,tx:e,ty:t,tz:n,vx:0,vy:0,vz:0,ax:0,az:0,lift:0}}function ba(i,e,t,n,r){const s=n*r,a=Math.exp(-s),o=i-t,c=e+n*o;return[t+(o+c*r)*a,(e-n*c*r)*a]}function Fu(i,e,t,n,r,s,a){const o=a.camera,c=Math.max(1,o.zoomSteps),l=_i(i.zoomStep+Math.sign(e),0,c-1),u=c>1?l/(c-1):0;let d=n.x*o.lookAhead,h=n.z*o.lookAhead;const p=Math.hypot(d,h);p>o.lookAheadMax&&(d*=o.lookAheadMax/p,h*=o.lookAheadMax/p);const g=1-Math.exp(-o.lookAheadEase*s),v=i.ax+(d-i.ax)*g,x=i.az+(h-i.az)*g,[m,_]=ba(i.tx,i.vx,t.x+v,o.follow,s),[M,b]=ba(i.ty,i.vy,t.y,o.follow,s),[w,E]=ba(i.tz,i.vz,t.z+x,o.follow,s),P=i.zoom+(u-i.zoom)*(1-Math.exp(-o.zoomEase*s)),S=i.lift+(r-i.lift)*(1-Math.exp(-o.liftEase*s));return{zoomStep:l,zoom:P,tx:m,ty:M,tz:w,vx:_,vy:b,vz:E,ax:v,az:x,lift:_i(S,0,1)}}function dh(i,e,t){const n=t.camera.ground,r=t.camera.treetop,s=ln(e),a=Ln(Ln(n.angleIn,n.angleOut,i.zoom),Ln(r.angleIn,r.angleOut,i.zoom),s),o=Ln(Ln(n.distanceIn,n.distanceOut,i.zoom),Ln(r.distanceIn,r.distanceOut,i.zoom),s),c=a*Math.PI/180;return{angle:a,distance:o,x:i.tx,y:i.ty+Math.sin(c)*o,z:i.tz+Math.cos(c)*o,tx:i.tx,ty:i.ty,tz:i.tz}}const Ou=.1,Bu=()=>({time:0,paused:!0});function zu(i,e){if(i.paused||!(e>0))return 0;const t=Math.min(Ou,e);return i.time+=t,t}const ku={moor:{treeDensity:.65},"fern-forest":{treeDensity:1},"muddy-forest":{treeDensity:1},"stone-shrine":{treeDensity:.6},"tangly-forest":{treeDensity:1},"wispy-forest":{treeDensity:1},"hazel-forest":{treeDensity:1},garden:{treeDensity:.75},"twiggy-forest":{treeDensity:1},ancient:{treeDensity:.9},norway:{treeDensity:1},"alder-forest":{treeDensity:.9},meadow:{treeDensity:.55},"old-oaks":{treeDensity:.9},"berry-thicket":{treeDensity:1},wetland:{treeDensity:.75},stream:{treeDensity:.8},"rocky-slope":{treeDensity:.75},bog:{treeDensity:.7},deadwood:{treeDensity:.8},"cave-mouth":{treeDensity:.75},grassland:{treeDensity:.55},"beaver-pond":{treeDensity:.8},"log-pile":{treeDensity:.7},heath:{treeDensity:.65},"old-pinewood":{treeDensity:1},ravine:{treeDensity:.75},"bluebell-glade":{treeDensity:.8},"holly-thicket":{treeDensity:1},"honeysuckle-tangle":{treeDensity:1}},Gu={types:ku};function al(i,e){if(typeof document<"u"){const t=document.createElement("canvas");return t.width=i,t.height=e,t}return new OffscreenCanvas(i,e)}function la(i){let e=i>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}const ye=(i,e,t)=>e+(t-e)*i(),fh=(i,e)=>e[Math.floor(i()*e.length)];function Rt(i,e,t){let n=Math.imul(i|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967296}function mi(i,e,t){const n=Math.floor(i),r=Math.floor(e),s=i-n,a=e-r,o=s*s*(3-2*s),c=a*a*(3-2*a),l=Rt(n,r,t),u=Rt(n+1,r,t),d=Rt(n,r+1,t),h=Rt(n+1,r+1,t);return l+(u-l)*o+(d-l)*c+(l-u-d+h)*o*c}function ge(i,e,t){i=(i%1+1)%1,e=Math.max(0,Math.min(1,e)),t=Math.max(0,Math.min(1,t));const n=Math.floor(i*6),r=i*6-n,s=t*(1-e),a=t*(1-r*e),o=t*(1-(1-r)*e),[c,l,u]=[[t,o,s],[a,t,s],[s,t,o],[s,a,t],[o,s,t],[t,s,a]][n%6];return[Math.round(c*255),Math.round(l*255),Math.round(u*255)]}const f={BODY:1,BELLY:2,ACCENT:3,EYE:4,GLINT:5,TRUNK:6,LEAF:7,LEAF2:8,CLOTH:9,SKIN:10,HAIR:11,BROOM:12,STRAW:13,BODY2:14,BARK2:15,FLOWER:16,PUPIL:17,MAGIC:18,BARKD:19,LINE:20,IRIS:21,MAGIC2:22,NOSE:23,EAR:24,BODY3:25,LEAF3:26,BARKL:27,HAT:28,PHONES:29,TOP:30,JACKET:31,JEANS:32,SHOES:33,WATER:34,STONE:35,STONED:36,MOSS:37,CRYSTAL:38,RUNE:39,GLOW:40,WOOD:41,COLLAR:42,HAT1:43,HAT2:44,POM:45,SHADES:46,FRAME:47,SHOE:48,SOLE:49,WOKEN:50,WEB:51},ya=4;function ph(i,e,t,n=.12){const r=(s,a,o,c)=>{const l=o-s,u=c-a,d=Math.max(0,Math.min(1,((i-s)*l+(e-a)*u)/(l*l+u*u)));return Math.hypot(i-s-l*d,e-a-u*d)<n};switch((t%ya+ya)%ya){case 0:return r(.5,.08,.5,.92)||r(.5,.1,.18,.4)||r(.5,.1,.82,.4);case 1:return r(.5,.08,.5,.92)||r(.5,.5,.18,.18)||r(.5,.5,.82,.18);case 2:return r(.2,.1,.8,.9)||r(.8,.1,.2,.9)||r(.5,.08,.5,.92);default:return r(.3,.08,.3,.92)||r(.3,.12,.75,.35)||r(.75,.35,.3,.55)||r(.3,.55,.78,.92)}}const Hu=new Set([f.GLINT,f.MAGIC,f.MAGIC2,f.RUNE,f.GLOW,f.COLLAR,f.WOKEN]);function ql(i,e=!0,t=8){const n=i.length,r=[];if(n<3)return i.slice();const s=o=>e?i[(o+n)%n]:i[Math.max(0,Math.min(n-1,o))],a=e?n:n-1;for(let o=0;o<a;o++){const c=s(o-1),l=s(o),u=s(o+1),d=s(o+2),h=Math.max(2,Math.ceil(Math.hypot(u[0]-l[0],u[1]-l[1])/1.5),t);for(let p=0;p<h;p++){const g=p/h,v=g*g,x=v*g;r.push([0,1].map(m=>.5*(2*l[m]+(-c[m]+u[m])*g+(2*c[m]-5*l[m]+4*u[m]-d[m])*v+(-c[m]+3*l[m]-3*u[m]+d[m])*x)))}}return e||r.push(i[n-1]),r}function Vu(i,{cap:e=1,capEnd:t=e}={}){const n=[],r=[],s=i.length;for(let c=0;c<s;c++){const l=i[Math.max(0,c-1)],u=i[Math.min(s-1,c+1)];let d=u[0]-l[0],h=u[1]-l[1];const p=Math.hypot(d,h)||1;d/=p,h/=p;const g=i[c][2]/2;n.push([i[c][0]-h*g,i[c][1]+d*g]),r.push([i[c][0]+h*g,i[c][1]-d*g])}const a=(c,l,u,d)=>{let h=c[0]-l[0],p=c[1]-l[1];const g=Math.hypot(h,p)||1;return[c[0]+h/g*u/2*d,c[1]+p/g*u/2*d]};return[...n,a(i[s-1],i[s-2],i[s-1][2],t),...r.reverse(),a(i[0],i[1],i[0][2],e)]}const Et=(i,e)=>[i[0]+e[0],i[1]+e[1]],ti=(i,e,t)=>[i[0]+(e[0]-i[0])*t,i[1]+(e[1]-i[1])*t];function ca(i,e,t,n,r,s=1){const a=[];for(let o=0;o<i.length;o++){if(a.push(i[o]),o<e||o>=t)continue;const c=i[o],l=i[(o+1)%i.length];let u=l[0]-c[0],d=l[1]-c[1];const h=Math.hypot(u,d)||1,p=d/h*s,g=-u/h*s;for(let v=1;v<=n;v++){const x=(v-.5)/n,m=ti(c,l,x),_=[m[0]+p*r-u/h*r*.5,m[1]+g*r-d/h*r*.5];a.push(ti(c,l,x-.45/n),_,ti(c,l,x+.35/n))}}return a}function Kl(i,e,t){const n=new Uint8Array(i*e);let r=1/0,s=-1/0;for(const a of t)r=Math.min(r,a[1]),s=Math.max(s,a[1]);for(let a=Math.max(0,Math.floor(r));a<=Math.min(e-1,Math.ceil(s));a++){const o=a+.5,c=[];for(let l=0,u=t.length-1;l<t.length;u=l++){const[d,h]=t[l],[p,g]=t[u];h>o!=g>o&&c.push(d+(o-h)/(g-h)*(p-d))}c.sort((l,u)=>l-u);for(let l=0;l+1<c.length;l+=2)for(let u=Math.max(0,Math.ceil(c[l]-.5));u<=Math.min(i-1,Math.floor(c[l+1]-.5));u++)n[a*i+u]=1}return n}function Wu(i,e,t){const r=new Float32Array(i*e),s=new Float32Array(i*e);for(let c=0;c<i*e;c++)t[c]&&(r[c]=1e4,s[c]=1e4);const a=c=>r[c]*r[c]+s[c]*s[c],o=(c,l,u,d,h)=>{const p=l+d,g=u+h;let v,x;if(p<0||g<0||p>=i||g>=e)v=d,x=h;else{const m=g*i+p;v=r[m]+d,x=s[m]+h}v*v+x*x<a(c)&&(r[c]=v,s[c]=x)};for(let c=0;c<e;c++){for(let l=0;l<i;l++){const u=c*i+l;t[u]&&(o(u,l,c,-1,0),o(u,l,c,0,-1),o(u,l,c,-1,-1),o(u,l,c,1,-1))}for(let l=i-1;l>=0;l--){const u=c*i+l;t[u]&&o(u,l,c,1,0)}}for(let c=e-1;c>=0;c--){for(let l=i-1;l>=0;l--){const u=c*i+l;t[u]&&(o(u,l,c,1,0),o(u,l,c,0,1),o(u,l,c,1,1),o(u,l,c,-1,1))}for(let l=0;l<i;l++){const u=c*i+l;t[u]&&o(u,l,c,-1,0)}}return{vx:r,vy:s}}class cn{constructor(e,t,n=1){this.sx=n,this.w=Math.round(e*n),this.h=t|0,this.m=new Uint8Array(this.w*this.h),this.n=new Float32Array(this.w*this.h*3),this.g=new Uint8Array(this.w*this.h)}inb(e,t){return e>=0&&t>=0&&e<this.w&&t<this.h}get(e,t){return e|=0,t|=0,this.inb(e,t)?this.m[t*this.w+e]:0}put(e,t,n,r=0,s=0,a=1){this.px(e*this.sx,t,n,r,s,a)}px(e,t,n,r=0,s=0,a=1){if(e=Math.floor(e),t=Math.floor(t),!this.inb(e,t))return;const o=t*this.w+e;this.m[o]=n,this.n[o*3]=r,this.n[o*3+1]=s,this.n[o*3+2]=a}recolour(e,t,n){e=Math.floor(e),t=Math.floor(t),this.inb(e,t)&&this.m[t*this.w+e]&&(this.m[t*this.w+e]=n)}ellipse(e,t,n,r,s,a={}){const{onlyOn:o,density:c=1,noise:l=0,seed:u=0,round:d=1}=a;e*=this.sx,n*=this.sx;for(let h=Math.max(0,Math.floor(t-r-1));h<Math.min(this.h,t+r+1);h++)for(let p=Math.max(0,Math.floor(e-n-1));p<Math.min(this.w,e+n+1);p++){const g=(p+.5-e)/n,v=(h+.5-t)/r,x=g*g+v*v;if(x>1)continue;const m=h*this.w+p;if(o&&!o.has(this.m[m]))continue;if(c<1){const w=l?mi(p/3.2,h/3.2,u)*l+(1-l)*.5:.5;if(Rt(p,h,u+77)>c*(.4+w*1.2)*(1.15-x*.5))continue}const _=g*d,M=v*d,b=Math.hypot(_,M,Math.sqrt(Math.max(0,1-x))+.15);this.px(p,h,s,_/b,M/b,(Math.sqrt(Math.max(0,1-x))+.15)/b)}}line(e,t,n,r,s,a,o,c=1){e*=this.sx,n*=this.sx;const l=Math.max(1,Math.ceil(Math.hypot(n-e,r-t)));for(let u=0;u<=l;u++){const d=u/l,h=e+(n-e)*d,p=t+(r-t)*d,g=Math.max(.5,(s+(a-s)*d)/2);for(let v=Math.floor(p-g);v<=p+g;v++)for(let x=Math.floor(h-g);x<=h+g;x++){const m=(x+.5-h)/g,_=(v+.5-p)/g;if(m*m+_*_>1)continue;const M=m*c,b=Math.hypot(M,_*.3,1);this.px(x,v,o,M/b,_*.3/b,1/b)}}}tri(e,t){let[[n,r],[s,a],[o,c]]=e;n*=this.sx,s*=this.sx,o*=this.sx;const l=(g,v,x,m,_,M)=>(g-_)*(m-M)-(x-_)*(v-M),u=Math.max(0,Math.floor(Math.min(n,s,o))),d=Math.min(this.w,Math.ceil(Math.max(n,s,o))),h=Math.max(0,Math.floor(Math.min(r,a,c))),p=Math.min(this.h,Math.ceil(Math.max(r,a,c)));for(let g=h;g<p;g++)for(let v=u;v<d;v++){const x=v+.5,m=g+.5,_=l(x,m,n,r,s,a),M=l(x,m,s,a,o,c),b=l(x,m,o,c,n,r);(_<0||M<0||b<0)&&(_>0||M>0||b>0)||this.px(v,g,t,0,-.2,.98)}}shape(e,t,n={}){return this.fillMask(Kl(this.w,this.h,ql(e,!0,n.per||6)),t,n)}limb(e,t,n={}){return this.shape(Vu(e,n),t,n)}fillMask(e,t,{group:n=1,line:r=!1,depth:s=0,round:a=1,onlyOn:o=null,keepNormals:c=!1,tilt:l=[0,0],lineMat:u=f.LINE}={}){const{w:d,h}=this;if(o)for(let x=0;x<d*h;x++)e[x]&&!o.has(this.m[x])&&(e[x]=0);const{vx:p,vy:g}=Wu(d,h,e);let v=s;if(!v){for(let x=0;x<d*h;x++)e[x]&&(v=Math.max(v,Math.hypot(p[x],g[x])));v=Math.max(1.5,Math.min(v*.9,2.5+v*.35))}for(let x=0;x<h;x++)for(let m=0;m<d;m++){const _=x*d+m;if(!e[_])continue;if(c){this.m[_]=t;continue}const M=Math.hypot(p[_],g[_]),b=Math.min(1,Math.max(0,(M-.5)/v)),w=Math.min(2.6,(1-b)/Math.sqrt(Math.max(.02,1-(1-b)*(1-b))))*a;let E=p[_]/(M||1)*w+l[0],P=g[_]/(M||1)*w+l[1];const S=Math.hypot(E,P,1);this.m[_]=t,this.n[_*3]=E/S,this.n[_*3+1]=P/S,this.n[_*3+2]=1/S}if(r&&!c){const x=[];for(let m=0;m<h;m++)for(let _=0;_<d;_++){const M=m*d+_;if(e[M])for(const[b,w]of[[1,0],[-1,0],[0,1],[0,-1]]){const E=_+b,P=m+w;if(E<0||P<0||E>=d||P>=h)continue;const S=P*d+E;if(!e[S]&&this.m[S]&&this.g[S]!==n&&this.m[S]!==u){x.push(M);break}}}for(const m of x)this.m[m]=u}if(!c)for(let x=0;x<d*h;x++)e[x]&&(this.g[x]=n);return e}mark(e,t,n,r={}){return this.fillMask(Kl(this.w,this.h,ql(e,!0,6)),t,{...r,onlyOn:new Set(n),keepNormals:!0})}grid(e,t,n=0,r=0,{round:s=1,flipX:a=!1}={}){const o=Math.max(...e.map(u=>u.length)),c=new Uint8Array(this.w*this.h),l=new Map;e.forEach((u,d)=>[...u].forEach((h,p)=>{const g=t[h];if(!g)return;const v=n+(a?o-1-p:p),x=r+d;this.inb(v,x)&&(c[x*this.w+v]=1,l.set(x*this.w+v,g))})),this.fillMask(c,f.BODY,{round:s,depth:2.5});for(const[u,d]of l)this.m[u]=d}}function gi(i,e,t,n=t.outline,r=al){const{w:s,h:a}=i,o=()=>r(s,a),c=o(),l=o(),u=o(),d=c.getContext("2d").createImageData(s,a),h=l.getContext("2d").createImageData(s,a),p=u.getContext("2d").createImageData(s,a),g=n==="none"?null:n==="dark"?[22,18,30]:"tint";for(let v=0;v<a;v++)for(let x=0;x<s;x++){const m=v*s+x,_=i.m[m],M=m*4;if(!_){if(!g)continue;const S=[i.get(x+1,v),i.get(x-1,v),i.get(x,v+1),i.get(x,v-1)].find(L=>L);if(!S)continue;const A=g==="tint"?(e[S]||[0,0,0]).map(L=>L*.35|0):g;d.data.set([...A,255],M),h.data.set([128,128,255,255],M),p.data.set([128,128,255,255],M);continue}let b=e[_];_===f.LINE&&!b&&(b=g==="tint"||!g?(e[f.BODY2]||[0,0,0]).map(S=>S*.55|0):g),b=b||[255,0,255],d.data.set([...b,Hu.has(_)?254:255],M);const w=i.n[m*3],E=i.n[m*3+1],P=i.n[m*3+2];h.data.set([w*127+128,E*127+128,P*255,255],M),p.data.set([-w*127+128,E*127+128,P*255,255],M)}return c.getContext("2d").putImageData(d,0,0),l.getContext("2d").putImageData(h,0,0),u.getContext("2d").putImageData(p,0,0),{A:c,N:l,NF:u,w:s,h:a}}const xi=i=>{const e=Math.hypot(i[0],i[1],i[2])||1;return[i[0]/e,i[1]/e,i[2]/e]},Wr=(i,e)=>[i[1]*e[2]-i[2]*e[1],i[2]*e[0]-i[0]*e[2],i[0]*e[1]-i[1]*e[0]],It=(i,e)=>i[0]*e[0]+i[1]*e[1]+i[2]*e[2],yn=(i,e)=>[i[0]-e[0],i[1]-e[1],i[2]-e[2]],C={add:(i,e)=>[i[0]+e[0],i[1]+e[1],i[2]+e[2]],sub:yn,mul:(i,e)=>[i[0]*e,i[1]*e,i[2]*e],lerp:(i,e,t)=>[i[0]+(e[0]-i[0])*t,i[1]+(e[1]-i[1])*t,i[2]+(e[2]-i[2])*t],norm:xi,cross:Wr,dot:It};function $l(i,e=[0,1,0]){const t=xi(i);let n=Wr(e,t);Math.hypot(...n)<1e-4&&(n=Wr([0,0,1],t)),n=xi(n);const r=Wr(t,n);return[t,r,n]}function mh(i,e){const t=It(i,e.axes[0]),n=It(i,e.axes[1]),r=It(i,e.axes[2]),[s,a,o]=e.r,c=Math.hypot(t/s,n/a,r/o),l=Math.hypot(t/(s*s),n/(a*a),r/(o*o));return l>1e-9?c*(c-1)/l:-Math.min(s,a,o)}function gh(i,e){const{ba:t,l2:n,rr:r,a2:s,il2:a,r1:o,r2:c}=e,l=It(i,t),u=l-n,d=[i[0]*n-t[0]*l,i[1]*n-t[1]*l,i[2]*n-t[2]*l],h=It(d,d),p=l*l*n,g=u*u*n,v=Math.sign(r)*r*r*h;return Math.sign(u)*s*g>v?Math.sqrt(h+g)*a-c:Math.sign(l)*s*p<v?Math.sqrt(h+p)*a-o:(Math.sqrt(h*s*a)+l*r)*a-o}function xh(i,e){const t=Math.abs(It(i,e.axes[0]))-e.h[0]+e.round,n=Math.abs(It(i,e.axes[1]))-e.h[1]+e.round,r=Math.abs(It(i,e.axes[2]))-e.h[2]+e.round;return Math.hypot(Math.max(t,0),Math.max(n,0),Math.max(r,0))+Math.min(Math.max(t,n,r),0)-e.round}const Xu=(i,e)=>e*(Math.sin(i[0]*23+i[1]*7)*Math.sin(i[1]*19-i[2]*11)+.5*Math.sin(i[2]*41+i[0]*29)),Zl=(i,e)=>i.type==="ell"?mh(yn(e,i.cw),i):i.type==="box"?xh(yn(e,i.cw),i):gh(yn(e,i.aw),i),Cr=(i,e)=>i.rough?Zl(i,e)+Xu(e,i.rough):Zl(i,e);class We{constructor({blend:e=.07}={}){this.parts=[],this.flats=[],this.blend=e,this.anchors={feet:[]}}ell(e,t,n,r={}){const s=r.axes||(r.dir?$l(r.dir,r.up):[[1,0,0],[0,1,0],[0,0,1]]);return this.parts.push({type:"ell",c:e,r:t,axes:s,mat:n,group:r.group??1,extra:!!r.extra,paint:r.paint,rough:r.rough,cut:!!r.cut}),this}box(e,t,n,r={}){const s=r.axes||(r.dir?$l(r.dir,r.up):[[1,0,0],[0,1,0],[0,0,1]]);return this.parts.push({type:"box",c:e,h:t,round:Math.min(r.round??.02,...t),axes:s,mat:n,group:r.group??1,extra:!!r.extra,paint:r.paint,rough:r.rough,cut:!!r.cut}),this}seg(e,t,n,r,s,a={}){return this.parts.push({type:"cone",a:e,b:t,r1:n,r2:r,mat:s,group:a.group??1,extra:!!a.extra,paint:a.paint,rough:a.rough,cut:!!a.cut}),this}chain(e,t,n={}){for(let r=0;r+1<e.length;r++)this.seg(e[r].slice(0,3),e[r+1].slice(0,3),e[r][3],e[r+1][3],t,n);return this}flat(e,t,n,r,s,a,o={}){return this.flats.push({c:e,u:xi(t),v:xi(n),su:r,sv:s,mask:a,group:o.group??30,extra:!!o.extra,bend:o.bend??.35}),this}field(e){let t=1/0;for(const n of this.parts){if(n.extra||n.cut)continue;let r;if(n.type==="ell")r=mh(yn(e,n.c),n);else if(n.type==="box")r=xh(yn(e,n.c),n);else{const s=yn(n.b,n.a),a=Math.max(1e-9,It(s,s)),o=n.r1-n.r2;r=gh(yn(e,n.a),{ba:s,l2:a,rr:o,a2:a-o*o,il2:1/a,r1:n.r1,r2:n.r2})}r<t&&(t=r)}return t}static surface(e,t,n){const r=1/Math.hypot(n[0]/t[0],n[1]/t[1],n[2]/t[2]);return[e[0]+n[0]*r,e[1]+n[1]*r,e[2]+n[2]*r]}}const Jl={towards:.6,away:-.6},Yu=.52;function gn(i,{height:e,scale:t,facing:n="towards",yaw:r=Jl[n]??Jl.towards,pitch:s=Yu,lineGap:a=.12}={}){const o=Math.cos(r),c=Math.sin(r),l=Math.cos(s),u=Math.sin(s),d=W=>[W[0]*o-W[2]*c,W[1],W[0]*c+W[2]*o],h=W=>[W[0]*o+W[2]*c,W[1],-W[0]*c+W[2]*o],p=[0,-u,-l],g=[0,l,-u],v=[1,0,0],x=[0,u,l],m=i.blend,_=i.parts.map(W=>{if(W.type==="ell"){const Fe=d(W.c),qe=W.axes.map(d),Xe=Math.max(...W.r);return{...W,cw:Fe,axes:qe,bc:Fe,br:Xe+(W.rough||0)*1.5}}if(W.type==="box"){const Fe=d(W.c),qe=W.axes.map(d);return{...W,cw:Fe,axes:qe,bc:Fe,br:Math.hypot(...W.h)+(W.rough||0)*1.5}}const he=d(W.a),ae=d(W.b),Ee=yn(ae,he),Ze=Math.max(1e-9,It(Ee,Ee)),Ce=W.r1-W.r2;return{...W,aw:he,ba:Ee,l2:Ze,rr:Ce,a2:Ze-Ce*Ce,il2:1/Ze,bc:C.lerp(he,ae,.5),br:Math.sqrt(Ze)/2+Math.max(W.r1,W.r2)}}),M=i.flats.map(W=>{const he=d(W.c),ae=d(W.u),Ee=d(W.v);return{...W,cw:he,uw:ae,vw:Ee,nw:xi(Wr(ae,Ee)),bc:he,br:Math.hypot(W.su,W.sv)}}),b=[..._,...M],w=W=>{const he=It(W.bc,v),ae=It(W.bc,g),Ee=W.br+(W.uw?0:m);return[he-Ee,he+Ee,ae-Ee,ae+Ee]};for(const W of b)[W.x0,W.x1,W.u0,W.u1]=w(W);const E=b.filter(W=>!W.extra&&!W.cut),P=Math.min(...E.map(W=>W.u0+(W.uw?0:m))),S=Math.max(...E.map(W=>W.u1-(W.uw?0:m))),A=t??e/Math.max(1e-6,S-P),L=Math.min(...b.map(W=>W.x0)),R=Math.max(...b.map(W=>W.x1)),N=Math.min(...b.map(W=>W.u0)),U=Math.max(...b.map(W=>W.u1)),D=Math.ceil((R-L)*A)+4,F=Math.ceil((U-N)*A)+2,z=new cn(D,F),Y=new Float32Array(D*F).fill(1/0),j=new Int16Array(D*F).fill(-1),X=8,te=Math.ceil(D/X),O=Math.ceil(F/X),re=Array.from({length:te*O},()=>[]);b.forEach((W,he)=>{const ae=Math.max(0,Math.floor((W.x0-L)*A/X)),Ee=Math.min(te-1,Math.floor(((W.x1-L)*A+2)/X)),Ze=Math.max(0,Math.floor((U-W.u1)*A/X)),Ce=Math.min(O-1,Math.floor(((U-W.u0)*A+1)/X));for(let Fe=Ze;Fe<=Ce;Fe++)for(let qe=ae;qe<=Ee;qe++)re[Fe*te+qe].push(he)});const ce=.25/A,be=(W,he)=>{const ae=Math.max(m-Math.abs(W-he),0)/m;return Math.min(W,he)-ae*ae*m*.25};for(let W=0;W<F;W++)for(let he=0;he<D;he++){const ae=re[Math.floor(W/X)*te+Math.floor(he/X)];if(!ae.length)continue;const Ee=L+(he+.5-1)/A,Ze=U-(W+.5)/A,Ce=C.add(C.add(C.mul(v,Ee),C.mul(g,Ze)),C.mul(x,50));let Fe=1/0,qe=-1/0;const Xe=[],Mt=[];for(const Je of ae){const ze=b[Je],I=yn(Ce,ze.bc),y=It(I,p),B=ze.br+(ze.uw?0:m),q=It(I,I)-B*B,Z=y*y-q;if(Z<0)continue;if(ze.uw){Mt.push(ze);continue}if(ze.cut){Xe.push(ze);continue}const le=Math.sqrt(Z);Fe=Math.min(Fe,-y-le),qe=Math.max(qe,-y+le),Xe.push(ze)}let Dt=1/0,Wt=-1,xt=0,St=null;if(Xe.length){const Je=new Map;for(const y of Xe){let B=Je.get(y.group);B||Je.set(y.group,B=[]),B.push(y)}const ze=(y,B)=>{let q=1/0;for(const Z of y)Z.cut||(q=q===1/0?Cr(Z,B):be(q,Cr(Z,B)));for(const Z of y)Z.cut&&(q=Math.max(q,-Cr(Z,B)));return q};let I=Math.max(0,Fe);for(let y=0;y<96&&I<qe;y++){const B=C.add(Ce,C.mul(p,I));let q=1/0,Z=null;for(const[le,ue]of Je){const Q=ze(ue,B);Q<q&&(q=Q,Z=le)}if(q<ce){const le=Je.get(Z),ue=.5/A;St=xi([ze(le,[B[0]+ue,B[1],B[2]])-ze(le,[B[0]-ue,B[1],B[2]]),ze(le,[B[0],B[1]+ue,B[2]])-ze(le,[B[0],B[1]-ue,B[2]]),ze(le,[B[0],B[1],B[2]+ue])-ze(le,[B[0],B[1],B[2]-ue])]);let Q=le[0],ne=1/0;for(const de of le){if(de.cut)continue;const Le=Cr(de,B);Le<ne&&(ne=Le,Q=de)}for(const de of le)if(de.cut&&-Cr(de,B)>ne-ce*2){Q=de;break}Dt=I,Wt=Z,xt=Q.paint?Q.paint(h(B),Q)??Q.mat:Q.mat;break}I+=Math.max(q*.9,ce*.5)}}for(const Je of Mt){const ze=It(p,Je.nw);if(Math.abs(ze)<1e-4)continue;const I=It(yn(Je.cw,Ce),Je.nw)/ze;if(I>=Dt)continue;const y=C.add(Ce,C.mul(p,I)),B=yn(y,Je.cw),q=It(B,Je.uw)/Je.su,Z=It(B,Je.vw)/Je.sv;if(Math.abs(q)>1||Math.abs(Z)>1)continue;const le=Je.mask(q,Z);if(!le)continue;let ue=ze>0?C.mul(Je.nw,-1):Je.nw;ue=xi(C.add(ue,C.add(C.mul(Je.uw,q*Je.bend),C.mul(Je.vw,Z*Je.bend*.5)))),Dt=I,Wt=Je.group,xt=le,St=ue}if(!St||!xt)continue;const G=W*D+he;Y[G]=Dt,j[G]=Wt,z.px(he,W,xt,It(St,v),-It(St,g),It(St,x))}const Ue=[];for(let W=0;W<F;W++)for(let he=0;he<D;he++){const ae=W*D+he;if(z.m[ae])for(const[Ee,Ze]of[[1,0],[-1,0],[0,1],[0,-1]]){const Ce=he+Ee,Fe=W+Ze;if(Ce<0||Fe<0||Ce>=D||Fe>=F)continue;const qe=Fe*D+Ce;if(z.m[qe]&&j[qe]!==j[ae]&&Y[qe]-Y[ae]>a){Ue.push(ae);break}}}for(const W of Ue)[f.EYE,f.GLINT,f.MAGIC,f.MAGIC2,f.NOSE,f.COLLAR,f.WOKEN,f.RUNE,f.GLOW].includes(z.m[W])||(z.m[W]=f.LINE);for(let W=0;W<F;W++)for(let he=0;he<D;he++){const ae=W*D+he;if(z.m[ae]!==f.EYE)continue;const Ee=W>0&&z.m[ae-D]===f.EYE,Ze=he>0&&z.m[ae-1]===f.EYE,Ce=he+1<D&&z.m[ae+1]===f.EYE&&W+1<F&&z.m[ae+D]===f.EYE;!Ee&&!Ze&&Ce&&(z.m[ae]=f.GLINT)}let ke=-1;for(let W=F-1;W>=0&&ke<0;W--)for(let he=0;he<D;he++)if(z.m[W*D+he]){ke=W;break}const ee=ke>=0&&ke<F-1?F-1-ke:0;if(ke>=0&&ke<F-1){const W=F-1-ke;for(let he=F-1;he>=0;he--)for(let ae=0;ae<D;ae++){const Ee=he*D+ae,Ze=(he-W)*D+ae,Ce=he-W>=0;z.m[Ee]=Ce?z.m[Ze]:0,z.g[Ee]=Ce?z.g[Ze]:0;for(let Fe=0;Fe<3;Fe++)z.n[Ee*3+Fe]=Ce?z.n[Ze*3+Fe]:0}}return z.bodyH=Math.round((S-P)*A),{sp:z,s:A,project:W=>{const he=d(W);return[+((he[0]-L)*A+1).toFixed(1),+((U-It(he,g))*A+ee).toFixed(1)]}}}const In=(i,e=9,t=.3)=>Rt(Math.floor(i[0]*e),Math.floor(i[1]*e)+Math.floor(i[2]*e)*97,7)<t,Ui={wing:(i,e)=>(t,n)=>{const r=(t+1)/2,s=1-.35*r*r,a=-1+.55*r+.18*Math.abs(Math.sin(r*Math.PI*6));return n>s||n<a?null:n>s-.35*(1-r*.5)?e:Math.floor(r*9)%2?i:e},ear:(i,e=f.EAR,t=f.BODY3)=>(n,r)=>{const s=(r+1)/2,a=.95*Math.sin(Math.PI*Math.min(1,.15+s*.85))*(1-s*.35);return Math.abs(n)>a?null:s>.82?t:Math.abs(n)<a*.5&&s<.7&&s>.12?e:i},flame:(i,e)=>(t,n)=>{const r=(n+1)/2,s=Math.sin(Math.PI*Math.min(1,r*1.1))*(1-r)*1.4;return Math.abs(t)>s?null:Math.abs(t)<s*.45&&r<.6?e:i},membrane:i=>(e,t)=>{const n=(e+1)/2,r=-1+.35*Math.abs(Math.sin(n*Math.PI*3));return t<r||t>1-.2*n?null:i},spotted:(i,e,t)=>(n,r)=>{if(Math.hypot(n,r*1.2)>1)return null;const a=Math.hypot(n-.35,r-.1);return a<.18?t:a<.3?e:i}},qu={hair:f.HAIR,hat:f.HAT,headphones:f.PHONES,top:f.TOP,jacket:f.JACKET,jeans:f.JEANS,sneakers:f.SHOES,broom:f.BROOM,bristles:f.STRAW,skin:f.SKIN},Ql={hair:[.01,.7,.85],hat:[.74,.45,.45],headphones:[.92,.55,.9],top:[.13,.15,.95],jacket:[.72,.45,.7],jeans:[.6,.5,.7],sneakers:[0,0,.95],broom:[.08,.55,.55],bristles:[.12,.55,.9],skin:[.07,.3,.94]};function Ku(i,e=Ql){const t={...Ql,...e},n={hair:i.hairHue,jacket:i.cloakHue,hat:i.hatHue,top:i.topHue,jeans:i.jeansHue,sneakers:i.shoeHue,headphones:i.phonesHue},r={};for(const[s,a]of Object.entries(qu)){const[o,c,l]=t[s];r[a]=ge(n[s]??o,c,l)}return r[f.EYE]=[24,18,30],r[f.GLINT]=[255,255,245],r[f.NOSE]=[20,16,24],r[f.MAGIC]=ge(i.glowHue??.13,.5,1),r[f.MAGIC2]=ge(i.glowHue??.13,.15,1),r[f.BELLY]=[245,245,240],r}const $u={rise:.78,descend:-.66,brake:.44};function Zu(i){const e=new We({blend:.03}),t=i%3,n=.5,r=.05,s=[[0,.02,-.01],[.02,-.01,.02],[-.01,.015,.01]][t],a=g=>n-r*(g/.62);e.seg([-.5,a(-.5),0],[.62,a(.62),0],.022,.018,f.BROOM,{group:2}),e.ell([-.64,a(-.64)+.005,0],[.2,.1,.11],f.STRAW,{dir:[1,r*1.6,0],group:3,paint:g=>g[0]<-.76?f.MAGIC2:g[0]>-.5?f.BROOM:void 0});const o=[-1,1].map(g=>[.5,a(.5)+.03,g*.045]),c=[-1,1].map(g=>[.2,n+.24+s[1],g*.1]);for(const g of[0,1]){const v=g?1:-1,x=v>0?7:5;e.seg(c[g],o[g],.04,.03,f.JACKET,{group:x}),e.ell(o[g],[.035,.03,.035],f.SKIN,{group:x})}const l=[.3+s[0],n+.27+s[1],0],u=[.07,n+.28+s[1]*.5,0],d=[-.15,n+.35+s[2],0];e.ell(u,[.17,.1,.11],f.JACKET,{dir:[1,-.25,0],group:1,paint:g=>g[1]<u[1]-.04&&Math.abs(g[2])<.055?f.TOP:void 0}),e.ell(d,[.11,.08,.1],f.JEANS,{dir:[1,-.3,0],group:1}),e.chain([[...C.add(d,[-.02,.06,0]),.07],[...C.add(d,[-.18,.08+s[0]*2,0]),.05],[...C.add(d,[-.34,.05+s[1]*3,.02]),.025]],f.JACKET,{group:12}),[[[-.32,n+.5+s[1]*2,-.07],[-.46,n+.38+s[0]*2,-.08]],[[-.34,n+.33+s[2]*2,.08],[-.55,n+.44-s[1]*3,.1]]].forEach(([g,v],x)=>{const m=x?6:4,_=C.add(d,[-.04,0,x?.06:-.06]);e.seg(_,g,.055,.045,f.JEANS,{group:m}),e.seg(g,v,.045,.04,f.JEANS,{group:m}),e.ell(C.add(v,[-.05,0,0]),[.08,.04,.045],f.SHOES,{dir:[-1,.3,0],group:m,paint:M=>M[1]<v[1]-.03?f.BELLY:void 0})}),e.ell(l,[.11,.115,.1],f.SKIN,{group:8,paint:g=>g[0]<l[0]-.01||g[1]>l[1]+.075?f.HAIR:void 0});for(const g of[-1,1]){const v=We.surface(l,[.11,.115,.1],C.norm([.85,.1,g*.45]));e.ell(v,[.026,.036,.026],f.BELLY,{group:8}),e.ell(C.add(v,[.012,0,g*.004]),[.014,.018,.014],f.EYE,{group:8})}e.ell(We.surface(l,[.11,.115,.1],C.norm([1,-.45,0])),[.012,.016,.04],f.BELLY,{group:8}),e.chain([[...C.add(l,[-.06,.03,0]),.065],[...C.add(l,[-.22,.05+s[1]*2,.01]),.05],[...C.add(l,[-.4,.06+s[2]*3,.02]),.03],[...C.add(l,[-.55,.07+s[0]*3,.02]),.012]],f.HAIR,{group:9});for(const g of[-1,1])e.ell(C.add(l,[-.015,0,g*.105]),[.05,.055,.03],f.PHONES,{group:10});e.chain([[...C.add(l,[-.005,.03,-.095]),.015],[...C.add(l,[-.02,.12,0]),.015],[...C.add(l,[-.005,.03,.095]),.015]],f.PHONES,{group:10});const p=C.add(l,[-.1+s[0],.2+s[1]*2,0]);e.ell(p,[.16,.014,.15],f.HAT,{dir:[1,.9,0],group:11}),e.chain([[...C.add(p,[-.02,.02,0]),.08],[...C.add(p,[-.14,.13,0]),.04],[...C.add(p,[-.3,.14+s[2]*2,0]),.012]],f.HAT,{group:11,paint:g=>Math.hypot(g[0]-p[0],g[1]-p[1])<.06?f.MAGIC:void 0}),e.seg(C.add(p,[.08,-.02,.08]),C.add(l,[.04,-.09,.08]),.008,.008,f.HAT,{group:11});for(const[g,v,x,m]of[[-.86,a(-.8)+.05,.03,.22],[-.88,a(-.8)-.04,-.04,.16],[-.7,n+.45,.05,.14],[-.2,n+.5,-.04,.12]]){const _=t*.05%.1;e.seg([g-_,v,x],[g-_-m,v,x],.01,.004,f.MAGIC2,{group:30,extra:!0})}return e.ell([.02,.005,0],[.2,.005,.12],f.NOSE,{group:0}),e}const Ju={stand:{frames:3,fps:3},land:{frames:3,fps:10},takeoff:{frames:3,fps:10},talk:{frames:4,fps:2.5},placeSigil:{frames:3,fps:6},liftSigil:{frames:3,fps:6},sit:{frames:2,fps:1.5}},ho=.34,vh={binding:[-.02,.31,-.2],dir:[.02,1,-.04]},Qu={stand:[0,1,2].map(i=>({breathe:[0,.006,.012][i],sway:[0,.02,.035][i],free:[.04,.5+[0,.006,.012][i],.18],hand:"rest",broom:vh})),land:[{crouch:.2,hop:.01,broom:{astride:!0},sway:.05},{crouch:.1,bend:.1,broom:{binding:[-.28,.26,-.08],dir:[.6,.5,-.06]},legUp:[.18,.24,.12],sway:.03,free:[.2,.58,.2],hand:"rest"},{breathe:.004,broom:{binding:[.06,.31,-.2],dir:[.18,1,-.03]},sway:.015,free:[.06,.52,.19],hand:"rest"}],takeoff:[{crouch:.1,broom:{binding:[-.1,.3,-.17],dir:[.35,.7,-.04]},free:[.16,.58,.2],hand:"rest",sway:.02},{crouch:.15,bend:.1,broom:{binding:[-.3,.28,-.06],dir:[.7,.4,-.04]},legUp:[.1,.26,.13],sway:.04,free:[.24,.55,.17],hand:"rest"},{hop:.1,broom:{astride:!0},toes:!0,sway:.06}],talk:[{free:[.47,.84,.13],hand:"palm",tilt:.35,mouth:!0,sway:.01},{free:[.32,1.18,.12],hand:"point",tilt:-.25,look:.12,sway:.02},{free:[.24,1.16,.3],elbow:[.26,.88,.26],hand:"wave",tilt:.45,mouth:!0,sway:.03},{free:[.15,.76,.1],hand:"chest",tilt:-.35,breathe:.01,sway:.015}],placeSigil:[{free:[.16,1.62,.1],hand:"palm",look:.22,breathe:.01,sway:.02},{free:[.42,1,.12],hand:"palm",look:.08,sway:.03},{crouch:.7,bend:.55,free:[.38,.1,.13],hand:"down",look:-.08,sway:.04}],liftSigil:[{crouch:.7,bend:.55,free:[.36,.08,.13],hand:"down",look:-.08,sway:.02},{crouch:.25,bend:.18,free:[.44,.82,.12],hand:"palm",look:.05,sway:.04},{breathe:.012,free:[.2,1.64,.1],hand:"palm",look:.25,sway:.05,toes:!0}],sit:[0,1].map(i=>({sit:!0,swing:[.06,-.06][i],bend:-.08,look:[.02,.1][i],tilt:[.15,-.2][i],sway:[.01,.03][i],breathe:[0,.008][i],broom:{binding:[-.24,.31,-.3],dir:[.32,1,-.06]},free:[.2,ho+.14,.15],far:[.18,ho+.14,-.13],hand:"rest"}))};function ju(i,e,t){const n=Math.hypot(e[0]-i[0],e[1]-i[1]),r=C.lerp(i,e,.5);if(n>=2*t)return r;const s=Math.sqrt(t*t-n*n/4),a=(e[0]-i[0])/n,o=(e[1]-i[1])/n;return[r[0]-o*s,r[1]+a*s,r[2]]}function ed(i,e){const t=Qu[i],n={crouch:0,bend:0,hop:0,breathe:0,sway:0,tilt:0,look:0,broom:vh,...t[e%t.length]},r=new We({blend:.03}),s=n.hop,a=n.sway,o=n.sit?ho+.06:.45-n.crouch*.21+s,c=-n.crouch*.12,l=!!n.broom.astride,u=o-.04,d=l?[1,0,0]:C.norm(n.broom.dir),h=l?[-.36,u,0]:n.broom.binding,p=A=>C.add(h,C.mul(d,A));r.seg(p(0),p(l?.98:1.1),.022,.018,f.BROOM,{group:2}),r.ell(p(-.13),[.17,.07,.08],f.STRAW,{dir:d,group:3,paint:A=>{const L=C.dot(C.sub(A,h),d);return L<-.22?f.MAGIC2:L>-.01?f.BROOM:void 0}});for(const A of[-1,1]){const L=A>0?6:4,R=[c,o,A*.07],N=n.sit?n.swing*A:0,U=n.sit?[.24+N,.09+Math.max(0,N)*.6,A*.1]:A>0&&n.legUp?n.legUp:[(A>0?.05:-.01)+(n.toes?-.03:0),.07+(n.toes?s*.4:s),A*.1],D=n.sit?[.21,o+.01,A*.09]:ju(R,U,.21);r.seg(R,D,.055,.045,f.JEANS,{group:L}),r.seg(D,U,.045,.04,f.JEANS,{group:L});const F=n.toes?[.03,-.045,0]:[.05,-.03,0];r.ell(C.add(U,F),[.08,.04,.045],f.SHOES,{dir:n.toes?[1,-.6,0]:[1,0,0],group:L,paint:z=>z[1]<U[1]+F[1]-.015?f.BELLY:void 0})}const g=[Math.sin(n.bend),Math.cos(n.bend),0],v=[Math.cos(n.bend),-Math.sin(n.bend),0],x=[c,o+.03,0];r.ell(x,[.1,.08,.105],f.JEANS,{group:1});const m=C.add(x,C.add(C.mul(g,.19),[0,n.breathe,0]));r.ell(m,[.1,.15+n.breathe*.5,.115],f.JACKET,{dir:v,group:1,paint:A=>C.dot(C.sub(A,m),v)>.045&&Math.abs(A[2])<.05?f.TOP:void 0}),r.chain([[...C.add(m,C.add(C.mul(v,-.07),C.mul(g,-.08))),.07],[...C.add(m,C.add(C.mul(v,-.11-a),C.mul(g,-.2))),.05],[...C.add(m,C.add(C.mul(v,-.13-a*1.6),C.mul(g,-.29))),.025]],f.JACKET,{group:12});const _=C.add(m,C.add(C.mul(g,.27),[n.look*.03,0,n.tilt*.04])),M=A=>C.add(m,C.add(C.mul(g,.1),[0,0,A*.12])),b=l?[.28,u+.03,-.05]:p(Math.max(.12,(Math.min(.62,o+.2)-h[1])/Math.max(.3,d[1]))),w=l?[.28,u+.03,.05]:n.free;for(const A of[-1,1]){const L=A>0?7:5,R=M(A),N=A>0?w:n.far||b,U=A>0&&n.elbow?n.elbow:C.add(C.lerp(R,N,.5),[-.03,-.02,A*.05]);r.seg(R,U,.04,.035,f.JACKET,{group:L}),r.seg(U,N,.035,.03,f.JACKET,{group:L});const D=A>0&&!l?n.hand:"grip";if(D==="palm")r.ell(N,[.045,.02,.04],f.SKIN,{group:L});else if(D==="down")r.ell(N,[.045,.02,.04],f.SKIN,{dir:[1,.15,0],group:L});else if(D==="wave"){r.ell(N,[.03,.045,.04],f.SKIN,{group:L});for(const F of[-1,0,1])r.seg(C.add(N,[0,.03,F*.02]),C.add(N,[F*.01,.065,F*.03]),.01,.008,f.SKIN,{group:L})}else D==="point"?(r.ell(N,[.035,.03,.035],f.SKIN,{group:L}),r.seg(C.add(N,[0,.02,0]),C.add(N,[.01,.08,0]),.012,.01,f.SKIN,{group:L})):r.ell(N,[.035,.03,.035],f.SKIN,{group:L})}r.ell(_,[.11,.115,.1],f.SKIN,{group:8,paint:A=>A[0]<_[0]-.01||A[1]>_[1]+.075?f.HAIR:void 0});for(const A of[-1,1])r.ell(We.surface(_,[.11,.115,.1],C.norm([.85,.05+n.look,A*.45+n.tilt*.1])),[.016,.026,.016],f.EYE,{group:8});n.mouth&&r.ell(We.surface(_,[.11,.115,.1],C.norm([1,-.5+n.look,n.tilt*.1])),[.012,.016,.025],f.NOSE,{group:8}),r.chain([[...C.add(_,[-.06,.02,0]),.06],[...C.add(_,[-.12-a,-.12,.02+n.tilt*.03]),.05],[...C.add(_,[-.13-a*1.5,-.25,.03+n.tilt*.04]),.03]],f.HAIR,{group:9});for(const A of[-1,1])r.ell(C.add(_,[-.015,0,A*.105]),[.05,.055,.03],f.PHONES,{group:10});r.chain([[...C.add(_,[-.005,.03,-.095]),.015],[...C.add(_,[-.005,.11,-.05]),.015],[...C.add(_,[-.005,.125,0]),.015],[...C.add(_,[-.005,.11,.05]),.015],[...C.add(_,[-.005,.03,.095]),.015]],f.PHONES,{group:10});const E=C.add(_,[-.03,.1,n.tilt*.02]),P=n.tilt*.05,S=C.add(E,[-.16-a*.5,.27,P*2]);return r.ell(E,[.16,.014,.15],f.HAT,{dir:[1,.25-n.look*.8,n.tilt*.3],group:11}),r.chain([[...C.add(E,[0,.01,0]),.085],[...C.add(E,[-.05,.17,P]),.045],[...S,.012]],f.HAT,{group:11,paint:A=>A[1]<E[1]+.045?f.MAGIC:void 0}),r.ell([.02,.005,0],[.2,.005,.12],f.NOSE,{group:0}),r.anchors.hand=w,r.anchors.hatTip=S,r}function _h({frame:i=0,lean:e=!1,pose:t}={}){if(t==="fast")return Zu(i);if(Ju[t])return ed(t,i);const n=t==="rise",r=t==="descend",s=t==="brake",a=n||r||s,o=new We({blend:.03}),c=a?0:[0,.025,.045][i%3],l=a?0:[0,.015,-.01][i%3]+(e?.08:0),u=.42+c,d=n?.3:r?-.27:s?-.12:e?.1:0,h=Math.min(.1,Math.max(0,d)),p=a?[.02,.06][i%2]:[0,.03,.05][i%3],g=r?1:n?-.6:0;o.seg([-.5,u-l*2,0],[.62,u+l*3,0],.022,.018,f.BROOM,{group:2}),s?o.ell([-.56,u-.08,0],[.17,.07,.09],f.STRAW,{dir:[.55,1,0],group:3,paint:M=>M[1]<u-.18?f.MAGIC2:M[1]>u-.01?f.BROOM:void 0}):o.ell([-.62,u-l*2-.01,0],[.17,.07,.08],f.STRAW,{dir:[1,l,0],group:3,paint:M=>M[0]<-.72?f.MAGIC2:M[0]>-.5?f.BROOM:void 0});for(const M of[-1,1]){const b=[-.04,u+.06,M*.07],w=s?[.18,u-.01,M*.14]:r?[.16,u-.05,M*.14]:n?[.06,u-.07,M*.14]:[.12+d*.5,u-.02,M*.14],E=s?M>0?[.44,u-.02+p,M*.13]:[.3,u-.16,M*.13]:r?[.2,u-.26,M*.13]:n?[-.1,u-.23,M*.13]:[.08+d,u-.2,M*.13];o.seg(b,w,.055,.045,f.JEANS,{group:M>0?6:4}),o.seg(w,E,.045,.04,f.JEANS,{group:M>0?6:4}),o.ell(C.add(E,[.05,-.02,0]),[.08,.04,.045],f.SHOES,{group:M>0?6:4,paint:P=>P[1]<E[1]-.04?f.BELLY:void 0})}o.ell([-.04,u+.08,0],[.11,.07,.1],f.JEANS,{group:1});const v=[0+d*.8,u+.26-Math.abs(d)*.3,0];o.ell(v,[.1,.16,.11],f.JACKET,{dir:[d*2.5,1,0],up:[-1,0,0],group:1,paint:M=>M[0]>v[0]+.04&&Math.abs(M[2])<.055?f.TOP:void 0}),s?o.chain([[...C.add(v,[-.08,-.06,0]),.07],[...C.add(v,[-.02,.12+p,.02]),.05],[...C.add(v,[.14,.18+p,.03]),.025]],f.JACKET,{group:12}):a&&o.chain([[...C.add(v,[-.08,-.1,0]),.07],[...C.add(v,[-.2,-.12+g*(.08+p),0]),.05],[...C.add(v,[-.3,-.12+g*(.16+p*1.5),.02]),.025]],f.JACKET,{group:12});const x=C.add(v,[.03+d*.5,.26,0]),m=C.add(x,[s?.05:r?-.01:-.03,s?.06:.1,0]);for(const M of[-1,1]){const b=C.add(v,[.01,.11,M*.11]),w=r&&M>0?C.add(m,[.1,.01,.1]):s?[.3,u+.03,M*.05]:[.26+d,u+.03,M*.05],E=r&&M>0?C.add(b,[.1,.02,.1]):C.lerp(b,w,.5);o.seg(b,E,.04,.035,f.JACKET,{group:M>0?7:5}),o.seg(E,w,.035,.03,f.JACKET,{group:M>0?7:5}),o.ell(w,[.035,.03,.035],f.SKIN,{group:M>0?7:5})}o.ell(x,[.11,.115,.1],f.SKIN,{group:8,paint:M=>M[0]<x[0]-.01||M[1]>x[1]+.075?f.HAIR:void 0});for(const M of[-1,1])o.ell(We.surface(x,[.11,.115,.1],C.norm([.85,.05,M*.45])),[.016,.026,.016],f.EYE,{group:8});s?o.chain([[...C.add(x,[-.06,.06,0]),.06],[...C.add(x,[.04,.13+p,.03]),.045],[...C.add(x,[.2,.08+p,.04]),.02]],f.HAIR,{group:9}):o.chain([[...C.add(x,[-.06,.02,0]),.06],[...C.add(x,[-.18-h,-.05+p+g*.1,.02]),.045],[...C.add(x,[-.3-h*1.5,-.08+p*1.6+g*.22,.03]),.02]],f.HAIR,{group:9});for(const M of[-1,1])o.ell(C.add(x,[-.015,0,M*.105]),[.05,.055,.03],f.PHONES,{group:10});o.chain([[...C.add(x,[-.005,.03,-.095]),.015],[...C.add(x,[-.005,.11,-.05]),.015],[...C.add(x,[-.005,.125,0]),.015],[...C.add(x,[-.005,.11,.05]),.015],[...C.add(x,[-.005,.03,.095]),.015]],f.PHONES,{group:10});const _=n?.1:0;if(o.ell(m,[.16,.014,.15],f.HAT,{dir:s?[1,-.55,0]:[1,.25+_*3,0],group:11}),o.chain(s?[[...C.add(m,[0,.01,0]),.085],[...C.add(m,[.06,.16,0]),.045],[...C.add(m,[.2,.22+p*.5,0]),.012]]:[[...C.add(m,[0,.01,0]),.085],[...C.add(m,[-.05-h-_*.5,.17-_*.3,0]),.045],[...C.add(m,[-.16-h*1.5-_,.27+p*.5-_*.5,0]),.012]],f.HAT,{group:11,paint:M=>M[1]<m[1]+.045?f.MAGIC:void 0}),a){const M=$u[t]+(s?[0,.06][i%2]:0),b=Math.cos(M),w=Math.sin(M),E=[0,u,0],P=R=>[E[0]+(R[0]-E[0])*b-(R[1]-E[1])*w,E[1]+(R[0]-E[0])*w+(R[1]-E[1])*b,R[2]],S=R=>[E[0]+(R[0]-E[0])*b+(R[1]-E[1])*w,E[1]-(R[0]-E[0])*w+(R[1]-E[1])*b,R[2]],A=R=>[R[0]*b-R[1]*w,R[0]*w+R[1]*b,R[2]];for(const R of o.parts)if(R.type==="ell"?(R.c=P(R.c),R.axes=R.axes.map(A)):(R.a=P(R.a),R.b=P(R.b)),R.paint){const N=R.paint;R.paint=(U,D)=>N(S(U),D)}for(const R of o.flats)R.c=P(R.c),R.u=A(R.u),R.v=A(R.v);const L=Math.min(...o.parts.map(R=>R.type==="ell"?R.c[1]-Math.max(...R.r):Math.min(R.a[1]-R.r1,R.b[1]-R.r2)));if(L<.08)for(const R of o.parts){const N=.08-L;R.type==="ell"?R.c=[R.c[0],R.c[1]+N,R.c[2]]:(R.a=[R.a[0],R.a[1]+N,R.a[2]],R.b=[R.b[0],R.b[1]+N,R.b[2]])}if(s){const R=P([-.45,u-.24,0]);for(let N=0;N<5;N++){const U=N+i*.5,D=.055-N*.008;o.ell([R[0]+.1+U*.08,Math.max(.04,R[1]-.02+Math.sin(U*1.9)*.04),Math.cos(U*1.3)*.06],[D,D*.8,D],N<2?f.BELLY:N%2?f.MAGIC:f.MAGIC2,{group:25+N,extra:!0})}}if(n){const R=P([-.8,u,0]);for(let N=0;N<5;N++){const U=N+i*.5,D=.05-N*.007;o.ell([R[0]-.02+Math.sin(U*2.1)*.06,Math.max(.04,R[1]-.08-U*.09),Math.cos(U*1.7)*.05],[D,D,D],N%2?f.MAGIC:f.MAGIC2,{group:20+N,extra:!0})}}}return o.ell([.02,.005,0],[.2,.005,.12],f.NOSE,{group:0}),o}const ol=(i={})=>Math.round((i.size||8)*Math.sqrt(i.growth||20)*(2/(i.pixel||3))*1.9),wa=new Map,Mh=i=>(wa.has(i)||wa.set(i,gn(_h({frame:0}),{height:i}).s),wa.get(i)),td=(i={})=>Mh(ol(i));function nd(i={},{frame:e=0,lean:t=!1,facing:n="towards",pose:r}={}){const s=ol(i),a=_h({frame:e,lean:t,pose:r}),{sp:o,project:c}=r?gn(a,{scale:Mh(s),facing:n}):gn(a,{height:s,facing:n});a.anchors.hand&&(o.anchors={hand:c(a.anchors.hand),hatTip:c(a.anchors.hatTip)});let l=0;for(let u=0;u<400&&l<6;u++){const d=u*37%o.w,h=u*53%Math.floor(o.h*.8);o.get(d,h)||o.get(d+1,h)||o.get(d-1,h)||o.get(d,h+1)||o.get(d,h-1)||(d*7+h*13+e*5)%11||(o.px(d,h,f.MAGIC2),l++)}return o}const rt=(i,e=0)=>{const t=Math.sin(i*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},ar=i=>{const e=rt(Math.floor(i[0]*14)+Math.floor(i[2]*14)*13,Math.floor(i[1]*6));return e<.14?f.BARKD:e>.88?f.BARKL:void 0},id=i=>e=>{const t=rt(Math.floor(e[0]*10),Math.floor(e[1]*10)+Math.floor(e[2]*10)*7);return e[1]<i[1]-.2||t<.2?f.LEAF3:t>.8?f.LEAF2:void 0},Yn=(i,e,t,n,r=!0)=>i.ell(e,t,f.STONE,{group:n,rough:.025,paint:s=>s[1]>e[1]+t[1]*.45&&r?f.MOSS:Math.abs(Math.sin(s[0]*13+s[2]*7))<.06?f.STONED:void 0}),is=(i,e,t,n)=>i.ell(e,t,f.LEAF,{group:n,rough:.04,paint:id(e)}),qt=(i,e,t)=>i.chain(e,f.TRUNK,{group:t,rough:.012,paint:ar}),rs=(i,e,t,n,r,s=.3,a=f.LEAF2)=>{for(let o=0;o<e;o++){const c=rt(r,o)*6.283,l=t*Math.sqrt(rt(o,r)),u=Math.cos(c)*l,d=Math.sin(c)*l*.7;i.ell([u,s*.3,d],[.07,s*(.35+rt(o,4)*.3),.07],a,{group:n+o%3,paint:h=>h[1]>s*.45?f.LEAF:void 0})}},ss=(i,e,t,n)=>i.ell(e,[t[0],.015,t[1]],f.WATER,{group:n}),rd={"sleeping-giant"(i){const e=t=>n=>{const r=rt(Math.floor(n[0]*8),Math.floor(n[2]*8)+Math.floor(n[1]*8)*5);return r<.15?f.LEAF3:r>.86?f.LEAF2:void 0};for(const[t,n]of[[[.85,.42,0],[.7,.5,.66]],[[0,.3,0],[.62,.36,.6]],[[-.8,.3,0],[.56,.36,.62]],[[1.85,.5,.02],[.5,.5,.48]],[[-1.55,.72,.3],[.38,.5,.3]],[[-1.55,.72,-.3],[.38,.5,.3]],[[-2.2,.3,.32],[.42,.3,.26]],[[-2.2,.3,-.32],[.42,.3,.26]],[[.6,.2,.78],[.75,.2,.2]],[[.6,.2,-.78],[.75,.2,.2]]])i.ell(t,n,f.MOSS,{group:1,rough:.03,paint:e()});Yn(i,[2.25,.75,.12],[.13,.15,.11],2,!1);for(const t of[-.12,.22])i.ell([2.12,.88,t],[.08,.04,.07],f.STONED,{group:3});Yn(i,[-.2,.16,.95],[.2,.15,.18],4),Yn(i,[-.2,.16,-.95],[.18,.14,.16],5),i.ell([2,.95,.02],[.42,.14,.4],f.LEAF3,{group:6,rough:.03}),rs(i,26,2.8,10,3,.3)},"fern-grotto"(i){i.ell([0,.16,0],[.78,.2,.72],f.STONE,{group:1,rough:.015,paint:e=>e[1]>.3?f.MOSS:void 0}),ss(i,[0,.345,0],[.55,.5],2);for(let e=0;e<6;e++){const t=e/6*Math.PI*2+.4,n=1.5+rt(e)*.3,r=[Math.cos(t)*n,0,Math.sin(t)*n*.8],s=1.1+rt(e,2)*.7,a=C.add(r,[0,s,0]);i.seg(r,a,.12,.09,f.TRUNK,{group:3+e,rough:.02,paint:ar});for(let o=0;o<7;o++){const c=o/7*Math.PI*2+e,l=[Math.cos(c),0,Math.sin(c)];i.chain([[...a,.05],[...C.add(a,C.add(C.mul(l,.45),[0,.18,0])),.04],[...C.add(a,C.add(C.mul(l,.9),[0,-.15,0])),.015]],o%2?f.LEAF:f.LEAF2,{group:10+e})}}for(let e=0;e<5;e++){const t=e*1.3;Yn(i,[Math.cos(t)*.95,.08,Math.sin(t)*.95],[.16,.12,.14],20+e)}},"sunken-boat"(i){ss(i,[.3,.01,.15],[1.9,1.15],1);const e=[0,.12,0],t=C.norm([1,.28,.12]);i.ell(e,[1.3,.45,.55],f.WOOD,{dir:t,group:2,paint:n=>(C.dot(C.sub(n,e),[0,1,0])*9+9)%1<.14?f.BARKD:n[1]>.35&&rt(Math.floor(n[0]*9))<.4?f.MOSS:void 0}),i.ell(C.add(e,[0,.14,0]),[1.2,.4,.47],f.BARKD,{dir:t,group:2,cut:!0});for(let n=-2;n<=2;n++)i.seg(C.add(e,C.add(C.mul(t,n*.4),[0,.1,-.42])),C.add(e,C.add(C.mul(t,n*.4),[0,.1,.42])),.04,.04,f.WOOD,{group:3});i.seg([-.9,.05,.7],[.3,1,.55],.03,.03,f.WOOD,{group:4}),i.box([-.98,.06,.72],[.2,.02,.07],f.WOOD,{dir:[1.2,-.8,-.15],group:4}),rs(i,18,2.2,10,5,.45)},"bramble-wagon"(i){const e=C.norm([1,-.12,0]);i.box([0,.62,0],[1.1,.22,.52],f.WOOD,{dir:e,round:.04,group:1,paint:t=>(t[0]+3)*4%1<.08?f.BARKD:void 0}),i.box([0,.72,0],[1,.2,.43],f.BARKD,{dir:e,group:1,cut:!0});for(const[t,n,r,s]of[[-.72,.55,.4,.4],[-.72,-.55,.4,.4],[.72,-.55,.32,.37]])i.ell([t,r,n],[s,s,.06],f.WOOD,{group:2+(t>0?1:0)+(n>0?2:0),paint:a=>{const o=a[0]-t,c=a[1]-r,l=Math.hypot(o,c),u=Math.atan2(c,o);return l>s*.82||l<s*.18?f.BARKD:Math.abs(Math.sin(u*4))<.2?f.WOOD:f.NOSE}});i.ell([.95,.1,.75],[.37,.06,.37],f.WOOD,{group:7,paint:t=>Math.hypot(t[0]-.95,t[2]-.75)>.3?f.BARKD:void 0});for(const t of[-.3,.3])i.seg([1.05,.55,t],[1.9,.05,t*1.4],.04,.035,f.WOOD,{group:8});for(let t=0;t<14;t++){const n=rt(t,1)*6.283,r=Math.cos(n)*1.5,s=Math.sin(n)*.9,a=[[r,0,s,.03]];for(let o=1;o<4;o++)a.push([r*(1-o*.28)+(rt(t,o)-.5)*.5,.25+o*.25+rt(o,t)*.2,s*(1-o*.3)+(rt(o,t*3)-.5)*.4,.025-o*.004]);if(i.chain(a,f.BARKD,{group:10+t%3}),t%2===0){const o=a[3];i.ell([o[0],o[1],o[2]],[.18,.13,.16],f.LEAF,{group:14,rough:.03,paint:c=>rt(Math.floor(c[0]*30),Math.floor(c[1]*30))<.1?f.ACCENT:void 0})}}},"beehive-tree"(i){for(const[t,n,r]of[[-.2,0,-.25],[.15,-.1,.2],[0,.15,.05]])qt(i,[[t,0,n,.22],[t+r*.8,1.4,n,.16],[t+r*2,2.8,n-.1,.08]],1);for(const[t,n]of[[[-.6,2.9,-.2],[.9,.6,.7]],[[.6,3,-.2],[.85,.6,.7]],[[0,3.4,-.3],[.9,.55,.7]]])is(i,t,n,3);qt(i,[[.2,1.9,-.05,.08],[.75,2.05,.15,.05]],2);const e=[.72,1.6,.2];i.ell(e,[.24,.42,.22],f.STRAW,{group:4,paint:t=>{const n=Math.floor((t[1]-e[1])*14),r=Math.floor(Math.atan2(t[2]-e[2],t[0]-e[0])*3+n%2*.5);return rt(n,r)<.3?f.BARK2:void 0}}),i.seg([.75,2.02,.15],[.72,1.9,.2],.05,.1,f.STRAW,{group:4});for(let t=0;t<6;t++){const n=t*1.9;i.ell([e[0]+Math.cos(n)*.45,e[1]+Math.sin(t*2.3)*.35,e[2]+Math.sin(n)*.35],[.03,.025,.03],f.MAGIC,{group:20+t,extra:!0})}},"fairy-ring"(i){i.ell([0,.005,0],[1.9,.005,1.5],f.LEAF3,{group:0});for(let e=0;e<9;e++){const t=e/9*Math.PI*2,n=[Math.cos(t)*1.6,0,Math.sin(t)*1.25],r=.35+rt(e)*.35;i.box(C.add(n,[0,r/2,0]),[.13,r/2,.1],f.STONE,{dir:[-Math.sin(t),0,Math.cos(t)],round:.05,rough:.015,group:1+e,paint:a=>e===2&&Math.abs(a[1]-r*.55)<r*.22&&Math.abs(a[0]-n[0]-0)<.05?f.RUNE:a[1]>r*.85?f.MOSS:void 0});const s=C.add(n,[Math.cos(t+.35)*.25,0,Math.sin(t+.35)*.2]);i.seg(s,C.add(s,[0,.16,0]),.035,.03,f.CLOTH,{group:12}),i.ell(C.add(s,[0,.18,0]),[.1,.06,.1],f.ACCENT,{group:13,paint:a=>rt(Math.floor(a[0]*60),Math.floor(a[2]*60))<.15?f.BELLY:void 0})}},"charcoal-hut"(i){const e=[0,2,0];for(let n=0;n<20;n++){const r=n/20*Math.PI*2;Math.abs(r-1.2)<.35||i.seg([Math.cos(r)*.95,0,Math.sin(r)*.8],C.add(e,[Math.cos(r)*.08,.1+rt(n)*.25,Math.sin(r)*.08]),.05,.03,n%3?f.TRUNK:f.BARKD,{group:1+n%2})}i.ell([0,.6,0],[.85,.6,.7],f.BARKD,{group:3});const t=[1.7,0,.3];i.ell(t,[.85,.42,.7],f.BARKD,{group:4,rough:.03,paint:n=>rt(Math.floor(n[0]*14),Math.floor(n[2]*14)+Math.floor(n[1]*14))<.07?f.GLOW:n[1]>.3?f.SHADES:void 0});for(let n=0;n<4;n++)i.seg([-1.4,.1+n*.14,-.5+n%2*.05],[-1.4,.1+n*.14,.5],.07,.07,f.TRUNK,{group:5+n%2,paint:r=>Math.abs(r[2])>.46?f.BARKL:void 0})},"root-arch"(i){qt(i,[[-1.8,0,.1,.4],[-1.4,1.2,0,.34],[-.4,2.3,-.1,.3],[.6,2.4,0,.28],[1.5,1.4,.1,.32],[1.9,0,.15,.38]],1),qt(i,[[-1.4,0,-.6,.28],[-.6,1.6,-.5,.22],[.5,1.9,-.45,.2],[1.3,.9,-.4,.22],[1.5,0,-.35,.26]],2),qt(i,[[-1.8,.2,.1,.3],[-2.4,.05,.5,.12]],1),qt(i,[[1.9,.2,.15,.3],[2.5,.05,.55,.12]],1);for(const[e,t]of[[[-.2,2.6,-.2],[.7,.35,.5]],[[.8,2.5,-.25],[.55,.3,.45]]])is(i,e,t,4);for(let e=0;e<4;e++)Yn(i,[-.7+e*.45,.12,(rt(e)-.5)*.5],[.22,.18,.2],6+e);i.box([0,.35,-.2],[.16,.35,.08],f.STONE,{round:.05,rough:.01,group:11,paint:e=>Math.abs(e[1]-.4)<.14&&Math.abs(e[0])<.05?f.MAGIC:e[1]>.62?f.MOSS:void 0})},"turf-hut"(i){i.box([0,.55,0],[1,.55,.7],f.WOOD,{round:.04,group:1,paint:e=>e[1]*7%1<.18?f.BARKD:e[2]>.66&&Math.abs(e[0]+.2)<.2&&e[1]<.85?f.NOSE:e[2]>.66&&Math.abs(e[0]-.5)<.14&&Math.abs(e[1]-.7)<.12?f.SHADES:void 0});for(const e of[-1,1])i.box([0,1.3,e*.4],[1.15,.05,.5],f.MOSS,{dir:[1,0,0],up:[0,1,-e*.75],round:.03,group:2,paint:t=>rt(Math.floor(t[0]*12),Math.floor(t[2]*12))<.25?f.LEAF2:void 0});i.seg([.65,1.2,-.3],[.65,1.9,-.3],.15,.13,f.STONE,{group:3,rough:.015});for(let e=0;e<5;e++)Yn(i,[-1.4+e*.7,.12,.9+rt(e)*.3],[.2,.15,.18],4+e);rs(i,16,1.8,10,9,.25)},"heron-rookery"(i){qt(i,[[0,0,0,.25],[.4,1.4,0,.18],[.9,2.8,-.1,.12],[1.3,3.8,-.2,.06]],1);const e=[[[.6,2,-.05],[-.3,2,-.1]],[[1,3,-.1],[1.8,2.9,0]],[[1.25,3.6,-.2],[.6,3.7,-.3]]];e.forEach(([r,s],a)=>{qt(i,[[...r,.07],[...s,.04]],2),i.ell(C.add(s,[0,.08,0]),[.34,.13,.3],f.BARK2,{group:3+a,rough:.025,paint:o=>Math.abs(Math.sin(o[0]*30+o[2]*20))<.25?f.STRAW:o[1]<s[1]+.02?f.BARKD:void 0})});for(const[r,s]of[[[1.2,4,-.4],[.6,.4,.45]],[[.3,3.1,-.5],[.45,.3,.35]],[[1.9,3.3,-.4],[.4,.3,.35]]])is(i,r,s,7);const t=C.add(e[1][1],[0,.42,.05]),n=1.6;i.ell(t,[.18*n,.1*n,.09*n],f.BELLY,{dir:[1,.3,0],group:10,paint:r=>r[1]>t[1]+.06?f.STONE:void 0}),i.chain([[...C.add(t,[.12*n,.06*n,0]),.035*n],[...C.add(t,[.2*n,.22*n,0]),.03*n],[...C.add(t,[.16*n,.32*n,0]),.04*n]],f.BELLY,{group:10}),i.seg(C.add(t,[.18*n,.33*n,0]),C.add(t,[.36*n,.3*n,0]),.015*n,.005*n,f.BODY2,{group:11});for(const r of[-.04,.04])i.seg(C.add(t,[0,-.06*n,r]),C.add(t,[.02,-.42,r]),.012,.012,f.BARKD,{group:12})},sundial(i){i.ell([0,.07,0],[1.05,.09,1],f.STONE,{group:1,rough:.01}),i.ell([0,.2,0],[.72,.09,.68],f.STONE,{group:2,rough:.01,paint:e=>e[1]>.26&&rt(Math.floor(e[0]*8),Math.floor(e[2]*8))<.3?f.MOSS:void 0}),i.seg([0,.28,0],[0,.95,0],.16,.13,f.STONE,{group:3,paint:e=>Math.abs(Math.sin(e[1]*30))<.15?f.STONED:void 0}),i.ell([0,1,0],[.38,.04,.38],f.FRAME,{group:4,paint:e=>{const t=Math.atan2(e[2],e[0]);return Math.abs(Math.sin(t*6))<.12&&Math.hypot(e[0],e[2])>.26?f.BARKD:void 0}}),i.box([0,1.12,0],[.2,.1,.01],f.FRAME,{dir:[1,-.5,0],round:.005,group:5});for(let e=0;e<22;e++){const t=e/22*Math.PI*2,n=1.25+rt(e)*.2,r=[Math.cos(t)*n,0,Math.sin(t)*n*.85];i.seg(r,C.add(r,[0,.18,0]),.015,.012,f.LEAF2,{group:6}),i.ell(C.add(r,[0,.2,0]),[.05,.04,.05],[f.FLOWER,f.BELLY,f.ACCENT][e%3],{group:7})}},"bear-den"(i){const e=[0,.3,-.2];i.ell(e,[1.7,1.15,1.25],f.LEAF,{group:1,rough:.05,paint:t=>{const n=rt(Math.floor(t[0]*16),Math.floor(t[1]*16)+Math.floor(t[2]*16)*3);return n<.06?f.ACCENT:n<.2?f.BARKD:t[1]<.4?f.LEAF3:n>.85?f.LEAF2:void 0}}),i.ell([.35,.35,.95],[.5,.55,.4],f.NOSE,{group:1,cut:!0}),i.seg([2,0,.5],[2,.65,.5],.3,.27,f.TRUNK,{group:3,paint:t=>t[1]>.6?f.BARKL:Math.abs(Math.sin(Math.atan2(t[2]-.5,t[0]-2)*3))<.12&&t[1]>.2?f.BARKD:void 0})},"stilt-hut"(i){ss(i,[0,.01,.1],[2.1,1.3],1);for(const[e,t]of[[-.75,-.55],[.75,-.55],[-.75,.55],[.75,.55]])i.seg([e,0,t],[e,1.05,t],.07,.06,f.WOOD,{group:2,paint:n=>n[1]<.15?f.MOSS:void 0});i.box([0,1.1,0],[1.05,.05,.8],f.WOOD,{round:.02,group:3,paint:e=>(e[0]+3)*6%1<.12?f.BARKD:void 0}),i.box([-.1,1.6,-.1],[.7,.45,.55],f.WOOD,{round:.03,group:4,paint:e=>e[2]>.4&&Math.abs(e[0]-.1)<.18&&e[1]<1.85?f.NOSE:void 0});for(const[e,t]of[[2.1,.92],[2.35,.72],[2.58,.48],[2.76,.24]])i.ell([-.1,e,-.1],[t,.16,t*.85],f.STRAW,{group:5,paint:n=>Math.abs(Math.sin(Math.atan2(n[2]+.1,n[0]+.1)*18))<.25?f.BARK2:void 0});for(const e of[.72,.95])i.seg([.9,1.1,e],[1.15,0,e],.02,.02,f.WOOD,{group:6});for(let e=0;e<4;e++)i.seg([.92+e*.06,1-e*.26,.72],[.92+e*.06,1-e*.26,.95],.02,.02,f.WOOD,{group:6});for(let e=0;e<26;e++){const t=rt(e,7)*6.283,n=1.5+rt(e,8)*.7,r=[Math.cos(t)*n,0,Math.sin(t)*n*.7],s=.5+rt(e,9)*.5;i.seg(r,C.add(r,[0,s,0]),.028,.02,f.LEAF2,{group:10+e%3}),e%3===0&&i.ell(C.add(r,[0,s-.05,0]),[.025,.07,.025],f.BARKD,{group:13})}},"bog-shrine"(i){ss(i,[.6,.01,.4],[1.4,.9],1),i.seg([0,0,0],[0,1.9,0],.2,.17,f.TRUNK,{group:2,rough:.01,paint:e=>{const t=e[1];return e[2]>.12&&(Math.abs(t-1.6)<.05&&Math.abs(Math.abs(e[0])-.08)<.05||Math.abs(t-1.38)<.04&&Math.abs(e[0])<.1)||t*5%1<.07?f.BARKD:e[1]>1.85?f.MOSS:void 0}}),i.ell([0,1.95,0],[.24,.1,.24],f.MOSS,{group:3});for(let e=0;e<6;e++){const t=e/6*Math.PI*2;i.seg([Math.cos(t)*1,0,Math.sin(t)*.8],[Math.cos(t)*1,.35+rt(e)*.25,Math.sin(t)*.8],.05,.04,f.TRUNK,{group:4})}i.ell([-.25,.06,.3],[.14,.07,.13],f.EAR,{group:5}),Yn(i,[.3,.07,.3],[.09,.07,.08],6,!1),Yn(i,[.15,.05,.42],[.06,.05,.06],7,!1);for(const[e,t,n]of[[.9,.9,.5],[1.4,1.2,.1],[.4,1.4,.8]])i.ell([e,t,n],[.06,.07,.06],f.MAGIC,{group:20+e*10,extra:!0,paint:r=>Math.hypot(r[0]-e,r[1]-t)<.03?f.MAGIC2:void 0});rs(i,20,2,10,11,.3,f.WEB)},"raven-tree"(i){qt(i,[[0,0,0,.3],[.1,1.3,0,.22],[-.1,2.5,-.1,.16],[.1,3.6,-.15,.07]],1),[[[.1,1.6,0],[1.3,2.3,.1],[1.8,2.2,.1]],[[-.05,2.1,-.05],[-1.2,2.8,-.1],[-1.6,3.2,-.1]],[[0,2.9,-.1],[.8,3.5,-.2]]].forEach((r,s)=>qt(i,r.map((a,o)=>[...a,.12-o*.04]),2+s)),qt(i,[[-.1,.5,0,.22],[-1.1,.1,.5,.08]],5),qt(i,[[.1,.4,0,.2],[.9,.05,-.4,.08]],5);const t=(r,s)=>{i.ell(r,[.12,.07,.06],f.SHADES,{dir:[1,.2,0],group:s}),i.ell(C.add(r,[.11,.07,0]),[.05,.05,.045],f.SHADES,{group:s}),i.seg(C.add(r,[.15,.07,0]),C.add(r,[.22,.05,0]),.015,.004,f.BODY2,{group:s}),i.seg(C.add(r,[-.1,0,0]),C.add(r,[-.22,-.04,0]),.04,.015,f.SHADES,{group:s})};t([1.3,2.42,.1],10),t([-1.2,2.92,-.1],11),t([.8,3.62,-.2],12),t([-.05,3.72,-.15],13);const n=[1.55,1.45,.1];i.seg([1.55,2.25,.1],C.add(n,[0,.3,0]),.01,.01,f.FRAME,{group:14});for(let r=0;r<6;r++){const s=r/6*Math.PI*2;i.seg(C.add(n,[Math.cos(s)*.2,-.25,Math.sin(s)*.2]),C.add(n,[Math.cos(s)*.12,.3,Math.sin(s)*.12]),.012,.012,f.FRAME,{group:14})}i.seg(C.add(n,[0,-.27,0]),C.add(n,[0,-.25,0]),.22,.22,f.FRAME,{group:14})},barrow(i){i.ell([0,0,-.2],[2.3,.95,1.3],f.LEAF2,{group:1,rough:.03,paint:e=>rt(Math.floor(e[0]*10),Math.floor(e[2]*10)+Math.floor(e[1]*10))<.25?f.LEAF:void 0});for(const e of[-.35,.35])i.box([e,.45,.95],[.12,.45,.12],f.STONE,{round:.03,rough:.01,group:2});i.box([0,.95,.95],[.55,.1,.14],f.STONE,{round:.03,rough:.01,group:3,paint:e=>e[1]>1.02?f.MOSS:void 0}),i.box([0,.4,.9],[.23,.4,.3],f.NOSE,{group:1,cut:!0});for(const[e,t,n]of[[-1.6,1,.7],[1.7,.9,.55]])i.box([e,n/2,t],[.12,n/2,.09],f.STONE,{round:.04,rough:.01,group:4})},cairn(i){let e=0;for(let n=0;n<6;n++){const r=.9-n*.14,s=Math.max(3,9-n);for(let a=0;a<s;a++){const o=a/s*Math.PI*2+n;Yn(i,[Math.cos(o)*r*.8,e+.14,Math.sin(o)*r*.7],[.24-n*.02,.15,.2-n*.02],1+(n+a)%4,n<2)}e+=.26}const t=[0,e+.1,0];for(let n=0;n<6;n++){const r=n/6*Math.PI*2;i.seg(C.add(t,[Math.cos(r)*.12,0,Math.sin(r)*.12]),C.add(t,[Math.cos(r)*.3,.35,Math.sin(r)*.3]),.02,.02,f.FRAME,{group:6})}i.seg(C.add(t,[0,-.3,0]),t,.05,.05,f.FRAME,{group:6}),i.ell(C.add(t,[0,.14,0]),[.2,.07,.2],f.SHADES,{group:7})},"stump-throne"(i){i.ell([0,.28,0],[.92,.34,.86],f.TRUNK,{group:1,rough:.015,paint:ar}),i.ell([0,.58,0],[.84,.06,.78],f.BARKL,{group:1,paint:e=>Math.abs(Math.sin(Math.hypot(e[0],e[2])*30))<.3?f.BARK2:void 0}),i.box([-.55,1.15,0],[.18,.62,.62],f.TRUNK,{round:.1,rough:.01,group:2,paint:ar});for(const e of[-.6,.6])i.box([-.1,.72,e],[.45,.14,.12],f.TRUNK,{round:.06,group:3,paint:ar});for(let e=0;e<6;e++){const t=e/6*Math.PI*2+.3;qt(i,[[Math.cos(t)*.8,.25,Math.sin(t)*.8,.18],[Math.cos(t)*1.4,.02,Math.sin(t)*1.3,.06]],4)}i.seg([1.5,.18,.8],[1.5,.18,.2],.18,.18,f.TRUNK,{group:5,paint:e=>e[2]>.78||e[2]<.22?f.BARKL:ar(e)}),i.seg([1.5,.3,.5],[1.6,.75,.5],.025,.025,f.WOOD,{group:6}),i.box([1.5,.36,.5],[.1,.06,.015],f.FRAME,{group:6});for(let e=0;e<6;e++){const t=e<3?0:1,n=e%3;i.seg([-1.7+n*.3+t*.15,.15+t*.26,-.7],[-1.7+n*.3+t*.15,.15+t*.26,.2],.14,.14,f.TRUNK,{group:7+e%2,paint:r=>r[2]>.16||r[2]<-.66?f.BARKL:void 0})}},"swing-beech"(i){qt(i,[[0,0,-.3,.45],[0,1.6,-.3,.36],[-.1,2.8,-.4,.26]],1),qt(i,[[0,2.2,-.3,.2],[1,2.6,-.2,.14],[1.9,2.75,-.1,.08]],2),qt(i,[[-.05,2.5,-.35,.18],[-1.2,3,-.4,.1]],3);for(let e=0;e<5;e++){const t=e/5*Math.PI*2;qt(i,[[Math.cos(t)*.35,.3,-.3+Math.sin(t)*.3,.2],[Math.cos(t)*.9,.02,-.3+Math.sin(t)*.8,.07]],4)}for(const[e,t]of[[[0,3.4,-.6],[1.4,.8,1]],[[1.4,3.1,-.4],[.9,.55,.7]],[[-1.3,3.2,-.6],[.9,.6,.7]]])is(i,e,t,5);for(const e of[-.12,.12])i.seg([1.3,2.65,e],[1.3,.55,e],.012,.012,f.STRAW,{group:6});i.box([1.3,.53,0],[.08,.025,.18],f.WOOD,{round:.01,group:6});for(let e=0;e<9;e++)i.ell([(rt(e,1)-.5)*3,.05+rt(e,2)*.5,(rt(e,3)-.3)*1.6],[.022,.022,.022],f.MAGIC,{group:20+e,extra:!0})},bower(i){for(const t of[-.9,0,.9])for(const n of[-.6,.6])i.seg([t,0,n],[t,1.2,n],.04,.04,f.WOOD,{group:1});for(const t of[-.9,0,.9])i.chain([[t,1.2,-.6,.04],[t,1.62,-.3,.04],[t,1.72,0,.04],[t,1.62,.3,.04],[t,1.2,.6,.04]],f.WOOD,{group:2});for(const t of[-.6,.6])for(const n of[.5,1])i.seg([-.9,n,t],[.9,n,t],.025,.025,f.WOOD,{group:3});const e=t=>{const n=rt(Math.floor(t[0]*26),Math.floor(t[1]*26)+Math.floor(t[2]*26)*3);return n<.12?f.BELLY:n<.2?f.STRAW:n>.85?f.LEAF2:void 0};for(const[t,n]of[[[-.6,1.6,0],[.6,.3,.75]],[[.5,1.65,0],[.65,.3,.75]],[[-.95,.9,-.55],[.25,.65,.25]],[[.95,.8,-.6],[.25,.55,.25]],[[-.9,.7,.62],[.22,.5,.2]],[[.2,1.3,-.65],[.5,.4,.2]]])i.ell(t,n,f.LEAF,{group:4,rough:.04,paint:e});i.box([0,.4,-.35],[.6,.04,.15],f.WOOD,{round:.02,group:5});for(const t of[-.5,.5])i.seg([t,0,-.35],[t,.38,-.35],.03,.03,f.WOOD,{group:5})}},Sh={moor:["sleeping-giant","the sleeping giant, a moss mound like a figure lying on its back",1],"fern-forest":["fern-grotto","a ring of giant tree ferns round a stone basin",1],"muddy-forest":["sunken-boat","an old rowing boat sunk in the mud",1.15],"tangly-forest":["bramble-wagon","an old wagon wrapped in brambles",1.1],"wispy-forest":["beehive-tree","a many-trunked tree with a great wild honeycomb",1],"hazel-forest":["fairy-ring","a ring of fairy stones and toadstools",1.1],"twiggy-forest":["charcoal-hut","a charcoal burner's hut of sticks, its mound smouldering",1],ancient:["root-arch","a great arch of roots over mossy stones",1.1],norway:["turf-hut","a log cabin with a turf roof",1.15],"alder-forest":["heron-rookery","an alder holding herons' stick nests",1],meadow:["sundial","a moonlit sundial on a stone dais in a ring of flowers",1.2],"berry-thicket":["bear-den","a bear's den in a bramble mound",1.1],wetland:["stilt-hut","a fisher's hut on stilts over a pool",1.1],bog:["bog-shrine","a carved post shrine to the bog, will-o'-wisps over the pool",1.1],deadwood:["raven-tree","a dead tree where the ravens gather",1],grassland:["barrow","a barrow with a stone doorway",1],heath:["cairn","a tall cairn with an old beacon basket",1.4],"old-pinewood":["stump-throne","a woodcutter's stump throne",1.1],"bluebell-glade":["swing-beech","a great beech with a rope swing, glowworms beneath",1],"honeysuckle-tangle":["bower","a honeysuckle bower with a bench",1.2]};function sd(i,e){const t=i.leaf,n=e.trunkHue??.07;return{[f.TRUNK]:ge(n,.45,.36),[f.BARKD]:ge(n+.03,.5,.17),[f.BARKL]:ge(n,.35,.55),[f.BARK2]:ge(n+.02,.45,.26),[f.LEAF]:ge(t,.55,.45),[f.LEAF2]:ge(t-.03,.5,.62),[f.LEAF3]:ge(t+.03,.6,.26),[f.STONE]:[122,120,128],[f.STONED]:[62,60,70],[f.MOSS]:ge(.26,.45,.45),[f.WOOD]:[128,92,58],[f.STRAW]:[190,162,104],[f.CLOTH]:[228,220,200],[f.EAR]:[168,96,66],[f.FRAME]:[150,128,84],[f.SHADES]:[30,28,36],[f.ACCENT]:[196,40,52],[f.BELLY]:[232,228,214],[f.BODY2]:[210,170,60],[f.FLOWER]:[180,140,230],[f.WEB]:[228,228,234],[f.WATER]:[52,78,104],[f.NOSE]:[16,14,20],[f.GLOW]:[255,120,40],[f.MAGIC]:ge(e.magicHue??.45,.6,1),[f.MAGIC2]:ge(e.magicHue??.45,.2,1),[f.RUNE]:[120,230,255],[f.LINE]:[24,22,30]}}function ad(i,e,t,n=16){const r=new We({blend:.05});rd[i](r),r.ell([0,.004,0],[.01,.004,.01],f.NOSE,{group:0});const s=(Object.values(Sh).find(([o])=>o===i)||[,,1])[2],{sp:a}=gn(r,{scale:td(t)*s});return{sp:a,colours:sd(e,t),metres:{width:+(a.w/n).toFixed(1),height:+(a.h/n).toFixed(1)}}}const od=1.3,ld=i=>[1,Math.sqrt(i.growth),Math.sqrt(i.growth)*od,i.growth],Lr=(i,e,t=1)=>Math.round(e.size*ld(e)[Math.max(0,Math.min(3,i))]*(2/(e.pixel||2))*1.9*t),ll=(i,e)=>{const t=la(e);for(let n=0;n<9;n++){const r=Math.floor(ye(t,2,i.w-2)),s=Math.floor(ye(t,2,i.h*.6));if(!(i.get(r,s)||i.get(r+1,s)||i.get(r-1,s)||i.get(r,s+1)||i.get(r,s-1))&&(i.px(r,s,f.MAGIC2),n%3===0))for(const[a,o]of[[1,0],[-1,0],[0,1],[0,-1]])i.px(r+a,s+o,f.MAGIC)}};function ha(i,e,t,n,r,s,a,o){const c=C.add(e,[-n*.7,n*(.75+r),t*n*.35]),l=C.norm(C.sub(c,e)),u=C.norm(C.sub([1,0,0],C.mul(l,C.dot([1,0,0],l)))),d=Math.hypot(...C.sub(c,e));i.flat(C.add(C.lerp(e,c,.5),C.mul(u,-n*.14)),l,u,d*.55,n*.34,Ui.wing(s,a),{group:o,extra:!0})}const cl=(i,e,t=1)=>i===0?Math.round(Math.max(12,Math.min(30*Math.max(.75,Math.min(1.1,t)),Lr(1,e)*t*.72))):i===2?Math.round(Math.max(Lr(1,e)*t*1.08,Math.min(Lr(2,e,t),Lr(1,e)*1.4))):Lr(i,e)*t;let Os=null;function cd(i,e){const t=Os;Os=i;try{return e()}finally{Os=t}}const hd=(i,e)=>{const t=Math.atan2(e,i);return Math.hypot(i,e)<.55+.4*Math.pow(Math.abs(Math.cos(t*2.5+Math.PI/2)),3)},ud=(i,e)=>{const t=i*1.2,n=-e*1.2+.25;return Math.pow(t*t+n*n-.6,3)-t*t*n*n*n<0};function hl(i){const e=Os,t=i.anchors;if(!e)return;const n=t.head,r=n?Math.max(...n.r):.2;if(e.collar&&(t.neck||n)){const s=t.neck||{c:C.add(n.c,[-n.r[0]*.8,-n.r[1]*.4,0]),r:n.r[1]*.75,dir:C.norm([1,.4,0])},a=C.norm(s.dir),o=C.norm(C.cross(a,Math.abs(a[2])<.9?[0,0,1]:[1,0,0])),c=C.cross(a,o),l=[],u=Math.max(.03,s.r*.2);for(let v=0;v<=16;v++){const x=v/16*Math.PI*2,m=C.add(C.mul(o,Math.cos(x)),C.mul(c,Math.sin(x)));let _=0;for(;_<.8&&i.field(C.add(s.c,C.mul(m,_)))<0;)_+=.01;_>=.8&&(_=s.r),l.push([...C.add(s.c,C.mul(m,_+u*.7)),u])}i.chain(l,f.COLLAR,{group:60,extra:!0});const d=l.reduce((v,x)=>x[0]-x[1]*.6+x[2]*.5>v[0]-v[1]*.6+v[2]*.5?x:v),h=u*1.3*(s.tag||1),p=C.norm(C.add(C.norm(C.sub(d.slice(0,3),s.c)),[.3,-.5,.3]));let g=d.slice(0,3);for(let v=0;v<60&&i.field(g)<h*.4;v++)g=C.add(g,C.mul(p,.01));i.ell(g,[h,h,h*.6],f.COLLAR,{group:60,extra:!0})}if(e.hat!=null&&n){const s=Math.max(r,.13),a=n.top||C.add(We.surface(n.c,n.r,C.norm([-.15,1,.1])),[0,r*.1,0]),o=C.norm([.3,1,.35]),c=s*1.5,l=C.add(a,C.mul(o,c));i.seg(C.add(a,C.mul(o,-s*.1)),l,s*.48,s*.04,f.HAT1,{group:61,extra:!0,paint:u=>Math.floor(C.dot(C.sub(u,a),o)/(c/5)+10)%2?f.HAT2:void 0}),i.ell(l,[s*.17,s*.17,s*.17],f.POM,{group:61,extra:!0})}if(e.glasses&&t.eyes&&n){const[s,a]=t.eyes.pts,o=l=>C.add(l,C.mul(C.norm(C.sub(l,n.c)),t.eyes.size*.45)),c=Math.max(t.eyes.size*1.05,r*.1);if(e.glasses==="bar")i.seg(o(s),o(a),c,c,f.SHADES,{group:62,extra:!0}),i.ell(C.add(o(a),[c*.3,c*.5,c*.2]),[c*.25,c*.25,c*.25],f.GLINT,{group:62,extra:!0});else for(const l of[s,a]){const u=C.norm(C.sub(l,n.c)),d=C.norm(C.cross([0,1,0],u)),h=C.cross(u,d),p=e.glasses==="heart"?ud:hd,g=c*1.5;i.flat(o(l),d,h,g,g,(v,x)=>p(v,x)?p(v*1.3,x*1.3)?f.SHADES:f.FRAME:null,{group:62,bend:.1,extra:!0}),i.seg(o(s),o(a),c*.18,c*.18,f.FRAME,{group:62,extra:!0})}}if(e.shoes)for(const s of t.feet){const a=e.shoes==="platform",o=s.r,c=C.add(s.c,[o*.25,o*(a?.35:.15),0]);i.ell(c,[o*1.45,o*(a?1.2:.85),o*1.15],f.SHOE,{group:s.group,extra:!0,paint:l=>l[1]<c[1]-o*(a?.45:.4)?f.SOLE:e.shoes==="glitter"&&In(l,60,.28)?f.GLINT:void 0})}}function dd(i,e,t,n,r="towards"){const s={legW:1,earS:1,hgt:1,bw:.3,...i.q},a=e===3,o=e===1,c=e===0,l=O=>a&&i.legend.includes(O),u=new We,d=s.hr*(c?1.75:o?1.25:1)*(n.head/.44)**.5,h=s.len*(c?.8:o?.9:1.02)*n.long,p=c?.55:o?.9:1.04,g=t?-.04:0,v=1+g,x=s.chest*(a?1.06:1)/p+g,m=s.tuck/p+g,_=s.bw*(c?1.15:e>=2?1.06:1)*(s.legW>1.2?1.15:1),M=.06*s.legW*(a?1.1:c?1.7:1),b=s.back==="hump"?.1:0,w=s.back==="arch"?.1:0,E=x+.12,P=O=>{if(s.belly&&O[1]<E&&O[0]>-h*.5)return f.BELLY;if(s.saddle&&O[1]>v-.18&&O[0]<h*.55)return f.BODY2;if(s.spots&&O[1]>x+.1&&In(O,10,.22))return s.spotMat==="belly"||s.spots==="young"&&o?f.BELLY:s.spots==="young"?void 0:f.BODY3;if(s.ridge&&O[1]>v-.08+b*.5)return f.BODY3};if(u.ell([h*.48,(v+x)/2+b*.5,0],[h*.62,(v-x)/2+b*.5,_],f.BODY,{paint:P}),u.ell([-h*.5,(v+m)/2+w*.6,0],[h*.58,(v-m)/2+w*.6,_*.93],f.BODY,{paint:P}),u.ell([0,(v+(x+m)/2)/2+.02,0],[h*.6,(v-(x+m)/2)/2,_*.9],f.BODY,{paint:P}),s.ridge)for(let O=0;O<(a?16:10);O++){const re=-h*.8+O*h*1.75/(a?15:9),ce=(.07+(a?.04:0))*(1+.5*Math.max(0,re/h));u.ell([re,v+.02+b*Math.max(0,1-Math.abs(re/h-.5)*2)+ce*.5,0],[ce,.03,_*.25],f.BODY3,{dir:[-.3,1,0],up:[1,0,0]})}if(s.wool)for(let O=0;O<14;O++){const re=O/14*Math.PI*2;u.ell([h*Math.cos(re)*.7,(v+x)/2+Math.sin(re)*.2,_*(O%2?.5:-.5)],[.16,.14,.14],f.BODY)}const S=[.32,-.32][t],A=(O,re)=>{const ce=re*_*.62,be=O?h*.62:-h*.62,Ue=(O?1:-1)*re*S,ke=O?x+.1:m+.15,ee=(O?re:-re)*(t?1:-1)>0?.06:0,se=[be+Math.sin(Ue)*.2+(O?.02:.1),Math.max(.3,ke*.55),ce],W=[be+Math.sin(Ue)*.42,.05+ee,ce],he=[be,ke+.12,ce*.8],ae=re>0?s.legMat||f.BODY:s.legMat?f.BODY3:f.BODY2,Ee=O?[[...he,M*1.5],[...se,M*1.05],[...W,M*.9]]:[[...he,M*2*(s.haunch||1)],[...C.add(se,[-.12,.06,0]),M*1.2],[...C.add(W,[-.06*(s.hindFoot||1),.12,0]),M*.9],[...W,M*.9]];u.chain(Ee,ae,{group:re>0?6+(O?1:0):2,paint:s.socks?Ce=>Ce[1]<s.socks?f.BODY3:void 0:void 0});const Ze=(s.paw==="hoof"?.07:.09)*s.legW**.5*(O?1:s.hindFoot||1);u.ell(C.add(W,[Ze*.5,-.01,0]),[Ze,M*.9,M*1.1],s.paw==="hoof"?f.NOSE:ae,{group:re>0?6+(O?1:0):2}),u.anchors.feet.push({c:C.add(W,[Ze*.5,-.01,0]),r:Math.max(Ze,M*1.1),group:re>0?6+(O?1:0):2})};for(const O of[-1,1])A(!0,O),A(!1,O);const L=[h*.82,v-.12,0],R=[L[0]+Math.cos(s.neckAng)*s.neck*.9,L[1]+Math.sin(s.neckAng)*s.neck*.9+(c?.1:0),0];u.seg(L,R,s.neckW*.55,s.neckW*.42,f.BODY,{paint:O=>s.belly&&O[1]<(L[1]+R[1])/2-.05?f.BELLY:s.face==="dark"?f.BODY2:void 0});const N=O=>{if(s.face==="badger")return Math.abs(O[2])<d*.22+(O[0]-R[0])*.1||O[1]<R[1]-d*.1?f.BELLY:f.BODY3;if(s.face==="dark")return f.BODY2;if((s.belly||s.muzzle)&&O[1]<R[1]-d*.35)return f.BELLY};u.ell(R,[d*1.05,d*.92,d*.88],f.BODY,{paint:N});const U=d*s.snout*(c?.55:o?.78:1),D=d*s.snoutD*.55,F=[R[0]+d*.65+U*.5,R[1]-d*.28,0];u.ell(F,[U*.62+d*.2,D,D*.95],f.BODY,{dir:[1,-.25,0],paint:O=>(s.muzzle||s.belly)&&O[1]<F[1]-D*.1?f.BELLY:N(O)});const z=[F[0]+U*.62+d*.1,F[1]-.02,0];u.ell(z,[d*(s.disc?.1:.12),d*(s.disc?.2:.12),d*(s.disc?.2:.15)],f.NOSE,{group:1});for(const O of[-1,1]){const re=We.surface(R,[d*1.05,d*.92,d*.88],C.norm([.75,.32,O*.62]));u.ell(re,[d*.13,d*.16,d*.13].map(ce=>ce*(s.eyeK||1)*(c?1.5:o?1.2:1)),a&&!s.tusks?f.MAGIC2:f.EYE,{group:1})}u.anchors.head={c:R,r:[d*1.05,d*.92,d*.88],top:[R[0]-d*.1,R[1]+d*.82,0]},u.anchors.eyes={pts:[-1,1].map(O=>We.surface(R,[d*1.05,d*.92,d*.88],C.norm([.75,.32,O*.62]))),size:d*.16*(s.eyeK||1)*(c?1.5:o?1.2:1)},u.anchors.neck={c:C.lerp(L,R,c?.05:o?.25:.42),r:s.neckW*.5*(c?1.3:o?1.12:1),dir:C.norm(C.sub(R,L)),tag:c?1.8:o?1.3:1};for(const O of[-1,1]){const re=s.ear,ce=[R[0]-d*.15,R[1]+d*.7,O*d*.5],be=s.earS*(c?1.2:1)*(s.ear==="long"?.62:1);if(re==="none")continue;if(re==="round"){u.ell(ce,[d*.22,d*.25*be,d*.1],f.BODY,{group:1,paint:Ee=>Ee[0]>ce[0]+d*.02?f.EAR:void 0});continue}const Ue=re==="long",ke=re==="small"?-.6:0,ee=d*.55*be*(re==="big"?1.35:Ue?2.2:1),se=d*.3*(re==="big"?1.2:Ue?1.35:1),W=C.norm([ke*.6-(Ue?.3:.12),1,O*.3]),he=C.norm([.55,.2,O]),ae=C.norm(C.cross(he,W));u.flat(C.add(ce,C.mul(W,ee)),ae,W,se,ee,Ui.ear(f.BODY,f.EAR,f.BODY3),{group:5+(O>0?0:20),extra:Ue}),re==="tuft"&&u.seg(C.add(ce,[0,ee*1.4,O*.02]),C.add(ce,[0,ee*1.85,O*.04]),d*.05,d*.02,f.BODY3,{group:1})}const Y=[-h*1.05,v-.1+w*.5,0],j=t?.04:-.02;if(l("tails")||fd(u,l("starTail")?"star":s.tail,Y,h,v,j),s.horns)for(const O of[-1,1]){const re=o?.6:c?.35:l("hornsGlow")?1.4:1,ce=[];for(let be=0;be<=8;be++){const Ue=.3-be/8*Math.PI*1.6,ke=d*.65*re*(1-.45*be/8);ce.push([R[0]-d*.1+Math.cos(Ue)*ke,R[1]+d*.45+Math.sin(Ue)*ke,O*(d*.6+be*.015)]),ce[be].push(d*.2*re*(1-.6*be/8))}u.chain(ce,l("hornsGlow")?f.MAGIC:f.ACCENT,{group:13})}if(s.antlers||l("jackalope"))for(const O of[-1,1])pd(u,s,[R[0]-d*.05,R[1]+d*.75,O*d*.4],O,e,l);if(s.tusks)for(const O of[-1,1]){const re=o?.4:c?0:l("tusksBig")?1.3:.75;if(!re)continue;const ce=[F[0]+U*.25,F[1]-D*.4,O*D*.8];u.chain([[...ce,.045*re],[...C.add(ce,[.1*re,.1*re,O*.03]),.04*re],[...C.add(ce,[.06*re,.24*re,O*.05]),.02*re]],f.ACCENT,{group:8})}s.teeth&&!c&&u.ell([z[0]-d*.1,z[1]-d*.25,0],[d*.08,d*.14,d*.12],f.ACCENT,{group:1});const X=O=>[-h*.9+O*h*1.65,v+b*Math.max(0,1-Math.abs(O-.8)*3)+w*(1-Math.abs(O-.4)*2),0];if(l("wings"))for(const O of[-1,1])ha(u,[h*.2,v,O*_*.5],O,1.15,t?.1:0,O>0?f.MAGIC2:f.MAGIC,f.MAGIC,40+(O>0?10:0));if(l("mane")||l("flames"))for(let O=0;O<7;O++){const re=O/6,ce=C.lerp(C.add(R,[-d*.5,d*.3,0]),X(.55),re),be=[.4,.3,.45,.28,.38,.25,.3][O],Ue=C.norm([-.35-(t?.1:0),1,0]);u.flat(C.add(ce,C.mul(Ue,be*.5)),[1,0,0],Ue,be*.32,be*.55,Ui.flame(O%2?f.MAGIC:f.MAGIC2,f.MAGIC2),{group:60+O%2,extra:!0})}if(l("tails"))for(let O=0;O<7;O++){const re=Math.PI*(.55+O*.08),ce=(O-3)*.1,be=C.add(Y,[Math.cos(re)*.9,Math.sin(re)*.85,ce]);u.chain([[...Y,.1],[...C.lerp(Y,be,.5),.17],[...be,.08]],O%2?f.BODY2:f.BODY,{group:70,extra:!0}),u.ell(be,[.09,.09,.09],f.MAGIC2,{group:71,extra:!0})}if(l("crystals")&&[.15,.3,.45,.6,.75].forEach((O,re)=>{const ce=X(O),be=[.3,.5,.4,.6,.35][re];u.ell(C.add(ce,[0,be*.45,(re%2-.5)*.1]),[be*.55,.08,.08],f.MAGIC,{dir:[(re-2)*.12,1,0],group:80+re%2,extra:!0,paint:Ue=>Ue[2]>0?f.MAGIC2:void 0})}),l("moss")){for(let O=0;O<6;O++)u.ell(X(.08+O*.15),[h*.22,.07,_*.85],f.LEAF,{group:85,extra:!0});for(const[O,re]of[[.25,.55],[.5,.8],[.75,.45]]){const ce=X(O);u.seg(ce,C.add(ce,[0,re*.7,0]),.04,.025,f.TRUNK,{group:86,extra:!0}),u.ell(C.add(ce,[0,re*.8,0]),[re*.28,re*.26,re*.28],f.LEAF2,{group:87,extra:!0,paint:be=>be[1]<ce[1]+re*.72?f.LEAF3:void 0})}for(const O of[.12,.4,.65,.9]){const re=X(O);u.ell(C.add(re,[0,.12,_*.3]),[.07,.035,.07],f.MAGIC,{group:89,extra:!0})}}if(l("ribbons"))for(let O=0;O<3;O++){const re=[];for(let ce=0;ce<9;ce++){const be=ce/8;re.push([h*(.5-be*2.2),v+.05+O*.1+be*(.25+O*.12)+Math.sin(be*6+t+O)*.07,(O-1)*.18,.04*(1-be*.6)])}u.chain(re,O%2?f.MAGIC2:f.MAGIC,{group:90+O,extra:!0})}hl(u);const{sp:te}=gn(u,{height:cl(e,n,s.hgt),facing:r});return a&&ll(te,i.id.length*7919),te}function fd(i,e,t,n,r,s){const a={group:3},o=c=>-n*c;e==="brush"?i.chain([[...t,.1],[o(1.3),r-.25+s,0,.15],[o(1.4),r-.55,0,.14],[o(1.35),.38+s,0,.09]],f.BODY,{...a,paint:c=>c[1]<.32?f.BODY3:void 0}):e==="bushy"?i.chain([[...t,.1],[o(1.05)-.35,r-.05+s,0,.17],[o(1.05)-.75,r-.2+s,0,.18],[o(1.05)-1,r-.35+s,0,.1]],f.BODY,{...a,paint:c=>c[0]<o(1.05)-.82?f.BELLY:void 0}):e==="stub"||e==="deer"||e==="bob"?i.ell(C.add(t,[-.06,.02+s,0]),[.1,.08,.07],e==="deer"?f.BELLY:f.BODY,{...a,paint:e==="bob"?c=>c[0]<t[0]-.08?f.BODY3:void 0:void 0}):e==="puff"?i.ell(C.add(t,[-.04,.02,0]),[.11,.11,.1],f.BELLY,a):e==="squirrel"||e==="star"?i.chain([[...t,.12],[o(1.3),r+.05+s,0,.25],[o(1.3),r+.6+s,0,.3],[o(1),r+.95+s,0,.27],[o(.65),r+.9+s,0,.16]],e==="star"?f.MAGIC:f.BODY,{...a,extra:!0,paint:e==="star"?c=>In(c,14,.12)?f.GLINT:void 0:void 0}):e==="otter"?i.chain([[...t,.17],[o(1.3),r-.45+s,0,.12],[o(1.6),.1,0,.07],[o(1.85),.06+s,0,.03]],f.BODY,a):e==="stoat"?i.chain([[...t,.08],[o(1.3),r-.12+s,0,.07],[o(1.6),r-.05+s,0,.06]],f.BODY,{...a,paint:c=>c[0]<o(1.45)?f.BODY3:void 0}):e==="flat"?(i.seg(t,[o(1.15),.3,0],.08,.07,f.BODY2,a),i.ell([o(1.4),.1+s*.5,0],[.28,.03,.14],f.BODY3,a)):e==="thin"&&(i.chain([[...t,.04],[o(1.1),r-.3,0,.03],[o(1.12)+s,r-.55,0,.025]],f.BODY,a),i.ell([o(1.12)+s,r-.62,0],[.04,.07,.04],f.BODY3,a))}function pd(i,e,t,n,r,s){const a=!e.antlers,o=a?.45:[0,.5,.95,.95][r]*(s("antlersGlow")?1.15:1),c=s("antlersGlow")?n>0?f.MAGIC2:f.MAGIC:f.ACCENT,l={group:11+(n>0?1:0),extra:!0};if(!o)return;const u=.045*Math.max(.8,o),d=n*.35*o;if(e.antlers==="palm"){const x=C.add(t,[-.06*o,.12*o,d*.3]);i.seg(t,x,u*1.3,u*1.2,c,l);for(let m=0;m<5;m++){const _=.35+m*.3,M=C.norm([-Math.cos(_),Math.sin(_)*.9,n*.55]),b=(.24+.05*(m%2))*o;i.ell(C.add(x,C.mul(M,b*.55)),[b*.6,u*1.5,u*.6],c,{...l,dir:M,up:[0,0,1]})}return}const h=C.add(t,[-.18*o,.3*o,d*.4]),p=C.add(t,[-.25*o,.62*o,d*.8]),g=C.add(t,[-.1*o,.95*o,d]);i.chain([[...t,u*1.2],[...h,u],[...p,u*.85],[...g,u*.4]],c,l);const v=(x,m,_,M)=>i.seg(x,C.add(x,C.mul(C.norm(m),_)),M,M*.35,c,l);v(C.add(t,[-.04*o,.1*o,d*.1]),[1,.6,0],.28*o,u*.8),(o>.4||a)&&v(h,[1,.9,0],.3*o,u*.7),o>.7&&(v(p,[.8,1,0],.28*o,u*.6),v(g,[.3,1,n*.2],.18*o,u*.5))}function md(i,e,t,n,r="towards"){const s=e===3,a=e===1,o=e===0,c=g=>s&&i.legend.includes(g),l=new We,u=t?.03:0,d=o?.48:a?.42:.36,h=(o?.95:1.08)+u;for(const g of[-1,1]){const v=t&&g>0?.04:0;l.seg([.05,.2,g*.14],[.08,.05+v,g*.15],.07,.06,f.BODY2,{group:2});for(const x of[-.04,0,.04])l.ell([.16,.03+v,g*.15+x],[.06,.025,.02],f.ACCENT,{group:2});l.anchors.feet.push({c:[.13,.04+v,g*.15],r:.08,group:g>0?6:2})}if(l.ell([-.32,.32,0],[.22,.06,.14],f.BODY2,{dir:[-1,-.6,0],group:3}),l.ell([0,.55+u,0],[.36,.52,.36],f.BODY,{paint:g=>g[0]>.12&&g[1]<h-d*.5?Math.floor(g[1]*18)%3===0&&In(g,16,.5)?f.BODY2:f.BELLY:void 0}),!c("wings"))for(const g of[-1,1])l.ell([-.06,.58+u,g*.3],[.4,.3,.08],f.BODY2,{dir:[-.3,-1,0],up:[1,0,0],group:g>0?4:2,paint:v=>In(v,12,.15)?f.BODY3:void 0});l.ell([0,h,0],[d,d*.9,d],f.BODY);for(const g of[-1,1]){const v=C.norm([.75,-.05,g*.4+.35]),x=C.add(We.surface([0,h,0],[d,d*.9,d],v),C.mul(v,-d*.05));l.ell(x,[d*.22,d*.46,d*.4],f.BELLY,{group:1,dir:v});const m=C.add(x,C.mul(v,d*.14));l.ell(m,[d*.1,d*.26,d*.24].map(_=>_*(o?1.15:1)),s?f.MAGIC:f.IRIS,{group:1,dir:v}),l.ell(C.add(m,C.mul(v,d*.07)),[d*.08,d*.14,d*.13].map(_=>_*(o?1.15:1)),s?f.MAGIC2:f.EYE,{group:1,dir:v}),(l.anchors.eyes||={pts:[],size:d*.22}).pts.push(C.add(m,C.mul(v,d*.07))),o||l.ell([d*.05,h+d*.8,g*d*.6],[d*.32,d*.12,d*.08],f.BODY2,{dir:[-.1,1,g*.7],up:[1,0,0],group:1})}if(l.ell(We.surface([0,h,0],[d,d*.9,d],C.norm([.75,-.35,.35])),[d*.2,d*.12,d*.1],f.ACCENT,{dir:[.6,-1,.3],group:1}),c("wings"))for(const g of[-1,1])ha(l,[-.05,.8+u,g*.3],g,1.3,t?.12:0,g>0?f.MAGIC2:f.MAGIC,f.MAGIC,40+(g>0?10:0));if(c("eyesRing"))for(let g=0;g<7;g++){const v=Math.PI*(.15+g/6*.7);l.ell([Math.cos(v)*.2-.1,h+.1+Math.sin(v)*.6,(g-3)*.15],[.07,.07,.07],f.MAGIC2,{group:95+g,extra:!0}),l.ell([Math.cos(v)*.2-.05,h+.1+Math.sin(v)*.6,(g-3)*.15],[.035,.035,.035],f.EYE,{group:95+g,extra:!0})}l.anchors.head={c:[0,h,0],r:[d,d*.9,d]},l.anchors.neck={c:[0,h-d*.75,0],r:d*.85,dir:[0,1,0]},hl(l);const{sp:p}=gn(l,{height:cl(e,n,.95),facing:r});return s&&ll(p,31),p}const Si=(i,e,t,n,r,s,a=1)=>{for(const o of n)i.ell(We.surface(e,t,C.norm(o)),[r,r*1.2,r],s,{group:a});i.anchors.head||={c:e,r:t},i.anchors.eyes||={pts:n.map(o=>We.surface(e,t,C.norm(o))),size:r}},bh=(i,e,t)=>i.ell([e,.005,0],[t,.005,t*.6],f.NOSE,{group:0});function En(i,e,t,n,r,s){hl(i);const{sp:a}=gn(i,{height:cl(t,n,r),facing:s});return t===3&&ll(a,e.id.length*131),a}const yh=(i,e,t)=>{i.ell(e,[t,t*.35,t],f.MAGIC,{group:95,extra:!0,paint:n=>n[1]>e[1]?f.MAGIC2:void 0});for(let n=0;n<5;n++){const r=n/5*Math.PI*2;i.ell(C.add(e,[Math.cos(r)*t*.8,t*.55,Math.sin(r)*t*.8]),[t*.38,t*.12,t*.12],f.MAGIC,{dir:[0,1,0],up:[1,0,0],group:96,extra:!0})}},ul=(i,e)=>e.forEach(([t,n],r)=>i.ell(C.add(t,[0,n*.45,0]),[n*.55,.07,.07],f.MAGIC,{dir:[(r%3-1)*.25,1,(r%2-.5)*.3],group:80+r%2,extra:!0,paint:s=>s[2]>t[2]?f.MAGIC2:void 0}));function gd(i,e,t,n,r="towards"){const s=e===3,a=new We,o=t?.03:0;for(const[d,h]of[[.28,.2],[.28,-.2],[-.28,.2],[-.28,-.2]])a.seg([d,.15,h],[d+(h>0?o:-o),.03,h],.06,.05,f.BODY3,{group:h>0?6:2}),a.anchors.feet.push({c:[d+.03+(h>0?o:-o),.03,h],r:.065,group:h>0?6:2});const c=[0,.32,0],l=[.5,.32,.38];a.ell(c,l,f.BODY2,{paint:d=>In(d,22,.3)?f.BODY3:In(d,19,.12)?f.BELLY:void 0});for(let d=0;d<46;d++){const h=d*2.399%(Math.PI*2),p=d/46*.9+.05,g=C.norm([Math.cos(h)*Math.sin(p*Math.PI*.5)-.25,Math.cos(p*Math.PI*.5)*.9+.1,Math.sin(h)*Math.sin(p*Math.PI*.5)]);g[0]>.55||a.ell(C.add(We.surface(c,l,g),C.mul(g,.02)),[.1,.025,.025],d%4?f.BODY2:f.BODY3,{dir:C.add(g,[-.4,0,0]),group:1})}const u=[.48,.22,0];return a.ell(u,[.22,.14,.15],f.BELLY,{dir:[1,-.3,0],group:1}),a.ell([.69,.16,0],[.04,.04,.04],f.NOSE,{group:1}),Si(a,u,[.22,.14,.15],[[.3,.6,.55],[.3,.6,-.55]],.035,s?f.MAGIC2:f.EYE),s&&ul(a,[[[-.3,.55,.1],.35],[[-.05,.62,-.1],.5],[[.2,.55,.12],.4],[[-.15,.58,.2],.3]]),En(a,i,e,n,.6,r)}function xd(i,e,t,n,r="towards"){const s=e===3,a=new We,o=t?.05:0;for(const u of[-1,1])a.ell([-.22,.16,u*.36],[.24,.13,.12],u>0?f.BODY:f.BODY2,{dir:[1,.3,0],group:u>0?6:2,paint:d=>In(d,14,.15)?f.BODY3:void 0}),a.ell([.05,.04,u*.4],[.16,.04,.08],u>0?f.BODY:f.BODY2,{group:u>0?6:2}),a.seg([.35,.2+o,u*.24],[.42,.03,u*.3],.05,.04,u>0?f.BODY:f.BODY2,{group:u>0?7:2}),a.anchors.feet.push({c:[.45,.03,u*.3],r:.06,group:u>0?7:2},{c:[.12,.04,u*.4],r:.08,group:u>0?6:2});const c=[0,.3+o,0],l=[.5,.28,.4];a.ell(c,l,f.BODY,{paint:u=>u[1]<c[1]-.12?f.BELLY:u[0]>.38&&Math.abs(u[1]-(c[1]-.02))<.018?f.LINE:In(u,14,.22)?f.BODY3:void 0});for(const u of[-1,1]){const d=[.3,.55+o,u*.17];a.ell(d,[.1,.09,.1],f.BODY,{group:1}),a.ell(We.surface(d,[.1,.09,.1],C.norm([.6,.5,u*.5])),[.05,.05,.05],s?f.MAGIC2:f.IRIS,{group:1}),a.ell(We.surface(d,[.11,.1,.11],C.norm([.65,.45,u*.5])),[.03,.015,.03],f.EYE,{group:1})}return a.anchors.head={c:[.22,.45+o,0],r:[.3,.2,.3],top:[.18,.62+o,0]},a.anchors.eyes={pts:[-1,1].map(u=>We.surface([.3,.55+o,u*.17],[.1,.09,.1],C.norm([.6,.5,u*.5]))),size:.05},a.anchors.neck={c:[.32,.3+o,0],r:.25,dir:[1,.3,0]},s&&yh(a,[.15,.66+o,0],.16),En(a,i,e,n,.55,r)}function vd(i,e,t,n,r="towards"){const s=e===3,a=e===1,o=h=>s&&i.legend.includes(h),c=new We,l=t?.02:0;for(const h of[-1,1]){const p=t&&h>0?.04:0;c.seg([0,.3,h*.08],[.03,.03+p,h*.08],.03,.025,f.NOSE,{group:h>0?7:2}),c.ell([.08,.02+p,h*.08],[.08,.015,.04],f.NOSE,{group:2}),c.anchors.feet.push({c:[.07,.03+p,h*.08],r:.06,group:h>0?7:2})}if(c.ell([-.55,.42,0],[.32,.035,.12],f.BODY2,{dir:[-1,-.25,0],group:3}),c.ell([0,.52+l,0],[.42,.26,.24],f.BODY,{dir:[1,.45,0]}),!o("wings"))for(const h of[-1,1])c.ell([-.1,.55+l,h*.2],[.45,.17,.05],f.BODY2,{dir:[-1,-.25,0],group:h>0?4:2});const u=[.36,.84+l,0],d=a?.19:.16;if(c.ell(u,[d*1.1,d,d*.95],f.BODY,{paint:h=>h[1]>u[1]+d*.55?f.BELLY:void 0}),c.ell(C.add(u,[d*1.5,-d*.25,0]),[d*1,d*.38,d*.3],f.NOSE,{dir:[1,-.2,0],group:1}),Si(c,u,[d*1.1,d,d*.95],[[.55,.35,.65],[.55,.35,-.65]],d*.16,s?f.MAGIC2:f.EYE),o("wings"))for(const h of[-1,1])ha(c,[-.05,.65+l,h*.18],h,1.1,t?.1:0,h>0?f.MAGIC2:f.MAGIC,f.MAGIC,40+(h>0?10:0));if(o("eyesRing"))for(let h=0;h<6;h++){const p=Math.PI*(.2+h/5*.6);c.ell([Math.cos(p)*.25-.1,.95+Math.sin(p)*.45,(h-2.5)*.12],[.06,.06,.06],f.MAGIC2,{group:95+h,extra:!0})}return En(c,i,e,n,.75,r)}function _d(i,e,t,n,r="towards"){const s=e===3,a=h=>s&&i.legend.includes(h),o=new We,c=t===0,l=.55,u=a("wingsBig")?1.5:1;bh(o,0,.3*u);for(const h of[-1,1]){const p=[0,l+.05,h*.1],g=[.05,l+(c?.35:-.05),h*.45*u],v=[[-.05,l+(c?.45:-.15),h*.85*u],[-.25,l+(c?.2:-.25),h*.75*u],[-.3,l+(c?0:-.25),h*.4*u]],x=a("wingsBig")?f.MAGIC:f.BODY2,m=a("wingsBig")?f.MAGIC2:f.BODY3;o.seg(p,g,.03,.025,m,{group:11});for(const E of v)o.seg(g,E,.02,.012,m,{group:11});const _=C.sub(v[0],p),M=C.norm(_),b=C.norm(C.sub(v[2],g)),w=C.norm(C.sub(b,C.mul(M,C.dot(b,M))));o.flat(C.add(C.lerp(p,v[0],.5),C.mul(w,.12*u)),M,w,Math.hypot(..._)*.55,.3*u,Ui.membrane(x),{group:10+(h>0?1:0),bend:.2})}o.ell([0,l,0],[.13,.16,.12],f.BODY,{group:1});const d=[.08,l+.2,0];o.ell(d,[.12,.11,.11],f.BODY,{group:1});for(const h of[-1,1])o.ell(C.add(d,[-.02,.15,h*.07]),[.12,.045,.02],f.BODY,{dir:[.1,1,h*.3],up:[1,0,0],group:1,paint:p=>p[0]>d[0]-.01?f.EAR:void 0});return Si(o,d,[.12,.11,.11],[[.7,.2,.5],[.7,.2,-.5]],.025,s?f.MAGIC2:f.EYE),o.ell(We.surface(d,[.12,.11,.11],[1,-.2,0]),[.025,.02,.03],f.NOSE,{group:1}),En(o,i,e,n,.55,r)}function Md(i,e,t,n,r="towards"){const s=e===3,a=new We,o=t?.03:0;a.seg([-.5,.18,0],[-.62,.12,0],.04,.02,f.SKIN,{group:3});for(const c of[-1,1])a.ell([-.3,.05,c*.2],[.07,.04,.05],f.SKIN,{group:c>0?6:2}),a.anchors.feet.push({c:[-.3,.05,c*.2],r:.07,group:c>0?6:2});a.ell([0,.3,0],[.52,.29,.33],f.BODY,{paint:c=>c[1]>.45?f.BODY2:void 0}),a.ell([.55,.24,0],[.2,.07,.07],f.SKIN,{dir:[1,-.15,0],group:1}),a.ell([.74,.21,0],[.04,.05,.06],f.NOSE,{group:1});for(const c of[-1,1]){const l=[.32,.1-(c>0?o:0),c*.34];a.ell(l,[.13,.035,.12],f.SKIN,{group:c>0?7:2,axes:[[1,0,0],[0,1,0],[0,0,1]]});for(let u=0;u<4;u++)a.ell(C.add(l,[.14,-.01,c*(u-1.5)*.05]),[.05,.015,.015],f.ACCENT,{group:c>0?7:2})}for(const c of[-1,1])a.ell(We.surface([0,.3,0],[.52,.29,.33],C.norm([.85,.3,c*.35])),[.015,.015,.015],s?f.MAGIC2:f.EYE,{group:1});return a.anchors.head={c:[.32,.34,0],r:[.25,.22,.25],top:[.3,.58,0]},a.anchors.eyes={pts:[-1,1].map(c=>We.surface([0,.3,0],[.52,.29,.33],C.norm([.85,.3,c*.35]))),size:.03},a.anchors.neck={c:[.36,.3,0],r:.27,dir:[1,.1,0]},s&&yh(a,[.15,.62,0],.15),En(a,i,e,n,.55,r)}function Sd(i,e,t,n,r="towards"){const s=e===3,a=d=>s&&i.legend.includes(d),o=new We;for(const d of[-1,1])for(let h=0;h<3;h++){const p=.25-h*.25,g=(h+(d>0?1:0)+t)%2?.06:-.06,v=[p,.22,d*.2];o.chain([[...v,.03],[p+g+(1-h)*.06,.32,d*.42,.025],[p+g*1.5+(1-h)*.15,.02,d*.55,.015]],d>0?f.BODY2:f.BODY3,{group:d>0?7:2})}o.ell([-.12,.34,0],[.46,.24,.32],f.BODY,{paint:d=>Math.abs(d[2])<.018&&d[1]>.4?f.LINE:d[1]>.5&&d[2]>.05&&d[2]<.17?f.BELLY:void 0}),o.ell([.38,.33,0],[.16,.16,.26],f.BODY,{group:1});const c=[.56,.3,0];o.ell(c,[.1,.1,.17],f.BODY2,{group:1});const l=[.3,.5,.7,.75][e]*(a("horn")?1.3:1),u=a("horn")?f.MAGIC:f.BODY3;for(const d of[-1,1]){const h=C.add(c,[.08,.02,d*.1]),p=C.add(h,[l*.7,l*.45,d*l*.15]),g=C.add(p,[l*.25,-l*.12,-d*l*.12]);o.chain([[...h,.045],[...p,.035],[...g,.015]],u,{group:8+(d>0?1:0)}),o.seg(C.lerp(h,p,.55),C.add(C.lerp(h,p,.55),[0,l*.22,0]),.02,.008,u,{group:8})}for(const d of[-1,1])o.chain([[...C.add(c,[.05,.06,d*.1]),.012],[c[0]+.1,.5,d*.22,.012],[c[0]+.2,.5,d*.26,.012]],f.BODY3,{group:9,extra:!0});return Si(o,c,[.1,.1,.17],[[.4,.3,.85],[.4,.3,-.85]],.032,s?f.MAGIC2:f.EYE,9),a("crystals")&&ul(o,[[[-.35,.5,.1],.3],[[-.1,.55,-.08],.45],[[.1,.5,.1],.35]]),En(o,i,e,n,.5,r)}function bd(i,e,t,n,r="towards"){const s=e===3,a=new We,o=t?.04:0;a.ell([0,.07,0],[.6+o,.07,.17],f.SKIN,{group:1}),a.chain([[.45+o,.08,0,.1],[.6+o,.25,0,.09],[.68+o,.28,0,.08]],f.SKIN,{group:1});for(const u of[-1,1])a.seg([.7+o,.32,u*.04],[.78+o,.55,u*.1],.018,.014,f.SKIN,{group:5}),a.ell([.78+o,.57,u*.1],[.03,.03,.03],s?f.MAGIC2:f.EYE,{group:5});a.anchors.head={c:[.68+o,.3,0],r:[.09,.08,.09],top:[.66+o,.38,0]},a.anchors.eyes={pts:[-1,1].map(u=>[.78+o,.57,u*.1]),size:.03},a.anchors.neck={c:[.55+o,.17,0],r:.1,dir:[1,1.2,0]};const c=[-.12,.4,0],l=s?f.MAGIC:f.BODY;return a.ell(c,[.32,.32,.22],l,{group:3,paint:u=>{const d=Math.atan2(u[1]-c[1],u[0]-c[0]);return((Math.hypot(u[0]-c[0],u[1]-c[1])/.32-d/(Math.PI*2)*.3)%.3+.3)%.3<.06?s?f.MAGIC2:f.BODY3:void 0}}),En(a,i,e,n,.45,r)}function yd(i,e,t,n,r="towards"){const s=e===3,a=new We;for(const o of[-1,1])for(let c=0;c<7;c++){const l=-.45+c*.15,u=(c+t)%2?.03:-.03;a.seg([l,.1,o*.22],[l+u,.01,o*.33],.025,.015,f.BODY3,{group:o>0?7:2})}for(const o of[-1,1])a.chain([[.5,.15,o*.08,.02],[.7,.3,o*.2,.015],[.82,.22,o*.26,.012]],f.BODY3,{group:9,extra:!0});return a.ell([0,.18,0],[.58,.2,.3],f.BODY,{paint:o=>(Math.floor((o[0]+.6)*9)%2&&o[1]>.2?f.BODY2:void 0)||(Math.abs((o[0]+.6)*9%1)<.12?f.LINE:void 0)}),Si(a,[0,.18,0],[.58,.2,.3],[[.92,.3,.25],[.92,.3,-.25]],.02,s?f.MAGIC2:f.EYE),s&&ul(a,[[[-.3,.32,.05],.3],[[0,.37,-.05],.45],[[.25,.32,.05],.32]]),En(a,i,e,n,.4,r)}function wd(i,e,t,n,r="towards"){const s=e===3,a=e===1,o=p=>s&&i.legend.includes(p),c=new We,l=t?.7:0,u=[];for(let p=0;p<=12;p++){const g=p/12;u.push([-.9+g*1.2,.07,Math.sin(g*Math.PI*2+l)*.25*(1-g*.5),.03+.045*Math.sin(Math.min(1,g*1.4)*Math.PI/2)])}u.push([.38,.25,u[12][2],.07],[.42,.45,u[12][2]*.8,.065]),c.chain(u,f.BODY,{paint:p=>p[1]<.05&&p[0]<.35?f.BELLY:In([p[0]*1.5,p[1],p[2]],14,.3)?f.BODY3:void 0});const d=[.5,.5,u[13][2]*.8],h=a?.11:.09;if(c.ell(d,[h*1.5,h*.75,h],f.BODY,{dir:[1,-.15,0],group:1}),Si(c,d,[h*1.5,h*.75,h],[[.5,.5,.7],[.5,.5,-.7]],h*.22,s?f.MAGIC2:f.EYE),t||c.seg(C.add(d,[h*1.4,-h*.2,0]),C.add(d,[h*2.3,-h*.3,0]),.01,.008,f.SKIN,{group:1}),c.anchors.feet.push({c:C.add(u[0].slice(0,3),[-.02,-.01,0]),r:.06,group:3,tail:!0}),c.anchors.neck={c:[.42,.36,u[12][2]*.9],r:.075,dir:[.2,1,0]},o("wings"))for(const p of[-1,1])ha(c,[0,.2,p*.05],p,.9,t?.1:0,p>0?f.MAGIC2:f.MAGIC,f.MAGIC,40+(p>0?10:0));return En(c,i,e,n,.45,r)}function Ed(i,e,t,n,r="towards"){const s=e===3,a=h=>s&&i.legend.includes(h),o=new We,c=t===0,l=.55,u=a("wingsBig")?1.45:1,d=a("wingsBig")?f.MAGIC:f.BODY;bh(o,0,.3*u);for(const h of[-1,1]){const p=c?.5:-.1,g=C.norm([.35,p,h]),v=C.norm([-.3,p*.6,h]);o.flat(C.add([0,l,h*.05],C.mul(g,.38*u)),g,C.norm(C.cross(g,[0,1,0])),.4*u,.24*u,Ui.spotted(d,f.BELLY,f.BODY3),{group:10+(h>0?1:0)}),o.flat(C.add([-.05,l,h*.05],C.mul(v,.26*u)),v,C.norm(C.cross(v,[0,1,0])),.27*u,.17*u,Ui.spotted(a("wingsBig")?f.MAGIC2:f.BODY2,f.BODY2,f.BODY2),{group:12+(h>0?1:0)}),o.chain([[.12,l+.08,h*.03,.015],[.2,l+.25,h*.1,.025],[.24,l+.32,h*.14,.012]],f.BODY2,{group:11})}return o.ell([0,l,0],[.22,.09,.09],f.BELLY,{group:1,paint:h=>In(h,30,.25)?f.BODY2:void 0}),o.ell([.17,l+.03,0],[.07,.07,.07],f.BELLY,{group:1}),Si(o,[.17,l+.03,0],[.07,.07,.07],[[.7,.3,.6],[.7,.3,-.6]],.02,s?f.MAGIC2:f.EYE),En(o,i,e,n,.5,r)}function Ad(i,e,t,n,r="towards"){const s=e===3,a=l=>s&&i.legend.includes(l),o=new We,c=t?.05:0;for(let l=0;l<9;l++){const u=l/8,d=-.6+u*1.15;o.ell([d,.12+Math.sin(u*Math.PI)*(.06+c),0],[.08,.1-u*.02,.12-u*.03],l<2?f.MAGIC2:l%2?f.BODY2:f.BODY,{group:1})}a("lantern")&&o.ell([-.75,.3,0],[.22,.22,.22],f.MAGIC2,{group:3,paint:l=>l[1]<.2?f.MAGIC:void 0});for(let l=0;l<6;l++)o.seg([-.2+l*.12,.05,.08],[-.2+l*.12+(l%2?.02:-.02)*(t?-1:1),0,.12],.015,.01,f.BODY3,{group:7});return o.ell([.6,.14,0],[.06,.06,.08],f.BODY3,{group:1}),Si(o,[.6,.14,0],[.06,.06,.08],[[.6,.3,.7],[.6,.3,-.7]],.015,s?f.MAGIC2:f.EYE),En(o,i,e,n,.4,r)}function Td(i,e,t,n,r="towards"){const s=e===3,a=u=>s&&i.legend.includes(u),o=new We,c=[.15,.28,0];for(const u of[-1,1])for(let d=0;d<4;d++){const h=-.6+d*.4,p=(d+(u>0?0:1)+t)%2?.05:-.05,g=C.add(c,[.05-d*.04,0,u*.1]),v=C.add(g,[Math.cos(h)*.3*(d<2?1:-.6)+p,.3,u*.3]),x=C.add(g,[Math.cos(h)*.55*(d<2?1:-.8)+p*1.5,-.28,u*.55]);o.chain([[...g,.03],[...v,.028],[...x,.015]],u>0?f.BODY2:f.BODY3,{group:u>0?7:2})}o.ell([-.28,.38,0],[.34,.28,.3],f.BODY,{paint:u=>(Math.abs(u[2])<.03||Math.abs(u[0]+.28)<.03)&&u[1]>.45?f.BELLY:void 0}),o.ell(c,[.18,.13,.17],f.BODY2,{group:1}),o.anchors.head={c,r:[.18,.13,.17]},o.anchors.eyes={pts:[[.05,.05],[.05,-.05]].map(([u,d])=>We.surface(c,[.18,.13,.17],C.norm([.9,u*6,d*4]))),size:.03},o.anchors.neck={c:[-.02,.32,0],r:.15,dir:[1,0,0]};const l=a("eyesRing");for(const[u,d]of[[.05,.05],[.05,-.05],[.02,.1],[.02,-.1]])o.ell(We.surface(c,[.18,.13,.17],C.norm([.9,u*6,d*4])),[.025,.025,.025],l?f.MAGIC2:f.EYE,{group:1});if(l)for(let u=0;u<5;u++){const d=Math.PI*(.2+u/4*.6);o.ell([-.3+Math.cos(d)*.2,.75+Math.sin(d)*.35,(u-2)*.12],[.06,.06,.06],f.MAGIC2,{group:95+u,extra:!0})}return En(o,i,e,n,.5,r)}const Rd=new Map(Object.entries({owl:md,hedgehog:gd,toad:xd,raven:vd,bat:_d,mole:Md,beetle:Sd,snail:bd,woodlouse:yd,snake:wd,moth:Ed,glowworm:Ad,spider:Td})),dl=[{id:"wolf",name:"Wolf",plan:"quad",hue:.08,sat:.24,val:.56,legend:["wings","mane"],q:{len:.64,chest:.42,tuck:.6,neck:.32,neckAng:.7,neckW:.42,hr:.26,snout:.82,snoutD:.7,ear:"point",earS:.82,tail:"brush",paw:"paw",legW:1.25,saddle:!0,belly:!0},tail:"up"},{id:"fox",name:"Fox",plan:"quad",q:{hgt:.8,len:.62,chest:.4,tuck:.5,neck:.3,neckAng:.7,neckW:.32,hr:.24,snout:1.05,snoutD:.5,snoutTaper:.6,ear:"point",earS:1.35,tail:"bushy",paw:"paw",legW:.9,belly:!0,socks:.3},hue:.06,sat:.8,val:.9,belly:"white",legend:["tails"]},{id:"badger",name:"Badger",plan:"quad",q:{hgt:.62,len:.78,chest:.2,tuck:.22,neck:.18,neckAng:.1,neckW:.5,hr:.26,snout:1,snoutD:.55,snoutTaper:.55,ear:"round",earS:.7,tail:"stub",paw:"paw",legW:1.35,legMat:f.BODY3,face:"badger",shaggy:!0},hue:.65,sat:.08,val:.45,legend:["crystals"]},{id:"boar",name:"Boar",plan:"quad",hue:.07,sat:.62,val:.5,legend:["tusksBig"],q:{len:.72,chest:.34,tuck:.42,neck:.2,neckAng:-.15,neckW:.55,hr:.27,snout:1.25,snoutD:.62,snoutTaper:.55,ear:"small",earS:.8,tail:"thin",paw:"hoof",legW:1.15,ridge:!0,tusks:!0,back:"hump",disc:!0},ridge:!0},{id:"stag",name:"Stag",plan:"quad",q:{hgt:1.3,len:.6,chest:.6,tuck:.7,neck:.55,neckAng:.95,neckW:.32,hr:.2,snout:1.15,snoutD:.6,snoutTaper:.65,ear:"point",earS:1.1,tail:"deer",paw:"hoof",legW:.75,antlers:"branch",rump:!0,spots:"young",belly:!0},hue:.08,sat:.5,val:.7,legend:["antlersGlow"]},{id:"hare",name:"Hare",plan:"quad",q:{hgt:.72,len:.5,chest:.4,tuck:.45,neck:.2,neckAng:.9,neckW:.35,hr:.27,snout:.65,snoutD:.7,ear:"long",earS:2.4,tail:"puff",paw:"paw",legW:.85,haunch:1.35,hindFoot:1.6,back:"arch",belly:!0,whiskers:!0},hue:.08,sat:.4,val:.72,legend:["jackalope"]},{id:"owl",name:"Owl",plan:"owl",hue:.08,sat:.5,val:.55,legend:["eyesRing","wings"]},{id:"bear",name:"Bear",plan:"quad",q:{hgt:1.15,len:.72,chest:.38,tuck:.4,neck:.25,neckAng:.3,neckW:.55,hr:.28,snout:.7,snoutD:.62,snoutTaper:.7,ear:"round",earS:.8,tail:"stub",paw:"paw",legW:1.55,back:"hump",muzzle:!0,shaggy:!0},hue:.07,sat:.55,val:.42,legend:["moss"]},{id:"hedgehog",name:"Hedgehog",plan:"hedgehog",hue:.08,sat:.4,val:.5,legend:["crystals"]},{id:"squirrel",name:"Squirrel",plan:"quad",q:{hgt:.55,len:.45,chest:.35,tuck:.4,neck:.2,neckAng:.9,neckW:.35,hr:.3,snout:.55,snoutD:.65,ear:"tuft",earS:1.1,tail:"squirrel",paw:"paw",legW:.8,haunch:1.3,back:"arch",belly:!0,whiskers:!0},hue:.03,sat:.75,val:.75,belly:"white",legend:["starTail"]},{id:"toad",name:"Toad",plan:"toad",hue:.2,sat:.5,val:.55,legend:["crown"]},{id:"otter",name:"Otter",plan:"quad",q:{hgt:.55,len:1,chest:.25,tuck:.25,neck:.3,neckAng:.35,neckW:.5,hr:.27,snout:.6,snoutD:.7,ear:"round",earS:.5,tail:"otter",paw:"paw",legW:1.1,muzzle:!0,belly:!0,whiskers:!0},hue:.07,sat:.55,val:.45,belly:"white",legend:["ribbons"]},{id:"lynx",name:"Lynx",plan:"quad",q:{hgt:.9,len:.55,chest:.5,tuck:.55,neck:.25,neckAng:.8,neckW:.4,hr:.27,snout:.5,snoutD:.75,snoutTaper:.8,ear:"tuft",earS:1,tail:"bob",paw:"paw",legW:1.2,cheeks:!0,spots:!0,belly:!0,whiskers:!0},hue:.09,sat:.45,val:.75,legend:["mane"]},{id:"elk",name:"Elk",plan:"quad",q:{hgt:1.4,len:.68,chest:.6,tuck:.66,neck:.45,neckAng:.75,neckW:.42,hr:.24,snout:1.6,snoutD:.9,snoutTaper:.85,ear:"point",earS:.9,tail:"stub",paw:"hoof",legW:.9,back:"hump",antlers:"palm",shaggy:!0},hue:.07,sat:.55,val:.38,legend:["antlersGlow","moss"]},{id:"raven",name:"Raven",plan:"raven",hue:.68,sat:.35,val:.3,legend:["wings","eyesRing"]},{id:"bat",name:"Bat",plan:"bat",hue:.78,sat:.25,val:.45,legend:["wingsBig"]},{id:"mole",name:"Mole",plan:"mole",hue:.7,sat:.15,val:.32,legend:["crown"]},{id:"beaver",name:"Beaver",plan:"quad",q:{hgt:.6,len:.65,chest:.2,tuck:.22,neck:.2,neckAng:.4,neckW:.55,hr:.28,snout:.6,snoutD:.75,ear:"round",earS:.45,tail:"flat",paw:"paw",legW:1.2,back:"arch",teeth:!0,whiskers:!0},hue:.06,sat:.6,val:.45,legend:["moss"]},{id:"stoat",name:"Stoat",plan:"quad",q:{hgt:.5,len:1,chest:.3,tuck:.33,neck:.35,neckAng:.6,neckW:.32,hr:.25,snout:.6,snoutD:.6,ear:"round",earS:.6,tail:"stoat",paw:"paw",legW:.8,belly:!0,back:"arch",whiskers:!0},hue:.1,sat:.25,val:.92,legend:["ribbons","mane"]},{id:"snail",name:"Snail",plan:"snail",hue:.08,sat:.45,val:.55,legend:["glowShell"]},{id:"ram",name:"Ram",plan:"quad",q:{hgt:.95,len:.6,chest:.48,tuck:.52,neck:.22,neckAng:.45,neckW:.48,hr:.25,snout:.85,snoutD:.75,snoutTaper:.8,ear:"small",earS:.7,tail:"stub",paw:"hoof",legW:.9,wool:!0,horns:"curl",face:"dark"},hue:.1,sat:.12,val:.88,legend:["hornsGlow"]},{id:"woodlouse",name:"Woodlouse",plan:"woodlouse",hue:.65,sat:.12,val:.45,legend:["crystals"]},{id:"snake",name:"Snake",plan:"snake",hue:.25,sat:.45,val:.45,legend:["wings"]},{id:"moth",name:"Moth",plan:"moth",hue:.1,sat:.3,val:.7,legend:["wingsBig"]},{id:"marten",name:"Pine marten",plan:"quad",q:{hgt:.55,len:.78,chest:.35,tuck:.38,neck:.3,neckAng:.55,neckW:.35,hr:.25,snout:.65,snoutD:.6,ear:"round",earS:.9,tail:"bushy",paw:"paw",legW:.85,belly:!0,back:"arch"},hue:.07,sat:.6,val:.45,legend:["mane"]},{id:"salamander",name:"Salamander",plan:"quad",q:{hgt:.42,len:.9,chest:.14,tuck:.14,neck:.12,neckAng:.05,neckW:.5,hr:.27,snout:.55,snoutD:.55,ear:"none",tail:"otter",paw:"paw",legW:1,spots:!0,spotMat:"belly"},hue:.1,sat:.1,val:.22,belly:"yellow",legend:["flames"]},{id:"glowworm",name:"Glow-worm",plan:"glowworm",hue:.12,sat:.4,val:.35,legend:["lantern"]},{id:"spider",name:"Spider",plan:"spider",hue:.07,sat:.45,val:.4,legend:["eyesRing"]},{id:"dormouse",name:"Dormouse",plan:"quad",q:{hgt:.38,len:.45,chest:.35,tuck:.38,neck:.15,neckAng:.6,neckW:.4,hr:.34,snout:.45,snoutD:.7,ear:"round",earS:.85,tail:"squirrel",paw:"paw",legW:.8,back:"arch",belly:!0,whiskers:!0,eyeK:1.6},hue:.09,sat:.6,val:.75,belly:"white",legend:["starTail"]},{id:"beetle",name:"Stag beetle",plan:"beetle",hue:.78,sat:.5,val:.35,legend:["horn","crystals"]}],wh=Object.fromEntries(dl.map(i=>[i.id,i])),uo=[[[255,70,170],[255,245,250],[255,230,70]],[[40,220,255],[255,236,60],[255,80,180]],[[150,80,255],[175,255,60],[255,255,255]]],fo={sneakers:[[255,70,90],[250,250,245]],glitter:[[215,215,235],[190,190,210]],platform:[[160,60,230],[40,30,52]]},Cd=["bar","star","heart"];function Ld(i,e=!0){const t=la((i|0)*7919+17),n=t()<.12;return{collar:e,hat:n||t()<.45?Math.floor(t()*uo.length):null,glasses:n||t()<.4?Cd[t()<.6?0:t()<.5?1:2]:null,shoes:n||t()<.4?Object.keys(fo)[Math.floor(t()*3)]:null}}function Pd(i,e,t=null){const n=Dd(i,e);if(!t)return n;if(t.collar&&(n[f.COLLAR]=Array.isArray(t.collar)?t.collar:n[f.MAGIC]),t.hat!=null){const[r,s,a]=uo[t.hat%uo.length];n[f.HAT1]=r,n[f.HAT2]=s,n[f.POM]=a}if(t.glasses&&(n[f.SHADES]=[22,18,32],n[f.FRAME]=t.glasses==="heart"?[255,60,110]:[255,90,210]),t.shoes){const[r,s]=fo[t.shoes]||fo.sneakers;n[f.SHOE]=r,n[f.SOLE]=s}if(t.woken){n[f.WOKEN]=[255,40,36];for(const r of[f.BODY,f.BODY2,f.BODY3,f.BELLY,f.ACCENT,f.EAR])n[r]&&(n[r]=n[r].map((s,a)=>Math.round(s*.72+[30,8,12][a]*.1)))}return n}function Dd(i,e){const t=wh[i],n=e.cVal/.85,r=e.cSat/.6,s=ge(t.hue,t.sat*r*e.sat,t.val*n),a=t.belly==="yellow"?[240,196,40]:t.belly==="white"||t.q?.face==="badger"?[236,232,222]:ge(t.hue+.03,t.sat*.5*r,Math.min(1,t.val*n*1.3+.08)),o=ge(e.magicHue+t.hue*.3,.6,1),c=ge(e.magicHue+t.hue*.3,.18,1),l=["boar","stag","elk","ram"].includes(t.id);return{[f.BODY]:s,[f.BODY2]:ge(t.hue+.02,Math.min(1,t.sat*r*1.2+.05),t.val*n*.66),[f.BODY3]:ge(t.hue+.03,Math.min(1,t.sat*r*1.3+.1),t.val*n*.4),[f.BELLY]:a,[f.ACCENT]:l?[236,226,200]:ge(t.hue+.05,t.sat*.6,Math.min(1,t.val*n*.5+.25)),[f.MAGIC]:o,[f.MAGIC2]:c,[f.LEAF]:ge(.3,.55,.55),[f.LEAF2]:ge(.25,.5,.75),[f.LEAF3]:ge(.33,.6,.35),[f.TRUNK]:ge(.07,.45,.32),[f.EYE]:[24,18,30],[f.PUPIL]:[70,40,90],[f.GLINT]:[255,255,245],[f.NOSE]:[38,28,36],[f.EAR]:ge(t.hue+.97,Math.min(1,t.sat*.6+.2),Math.min(1,t.val*n*.55+.2)),[f.IRIS]:t.plan==="owl"?[255,176,40]:ge(.12,.7,.85),[f.SKIN]:[238,158,192]}}const Id=["size","growth","pixel","head","eye","legs","long","fur"],Pr=new Map;function Nd(i,e,t,n,r="towards",s=null){const a=wh[i]||dl[0],o=s&&(s.collar||s.hat!=null||s.glasses||s.shoes||s.woken)?s:null,c=[a.id,e,t,r,...Id.map(u=>n[u]),o?[!!o.collar,o.hat??"",o.glasses||"",o.shoes||"",!!o.woken].join(","):""].join("|");let l=Pr.get(c);if(!l){if(l=cd(o,()=>a.q?dd(a,e,t,n,r):Rd.get(a.plan)(a,e,t,n,r)),o?.woken)for(let u=0;u<l.m.length;u++)(l.m[u]===f.EYE||l.m[u]===f.IRIS||l.m[u]===f.PUPIL)&&(l.m[u]=f.WOKEN);Pr.size>600&&Pr.delete(Pr.keys().next().value),Pr.set(c,l)}return l}const ua=.07,fl=.048,$e=(...i)=>({l:i}),_t=(i,e,t,n,r)=>({a:[i,e,t,n,r]}),Kt=(i,e)=>({d:[i,e]}),dt=(i,e=.86)=>$e([.5,e],[.5,i]),ft=_t(.5,.76,.13,25,155),Ud=i=>i.l?{l:i.l.map(([e,t])=>[1-e,t])}:i.a?{a:[1-i.a[0],i.a[1],i.a[2],180-i.a[3],180-i.a[4]]}:{d:[1-i.d[0],i.d[1]]},pt=(...i)=>i.flatMap(e=>[e,Ud(e)]);function qn(i,e,t){const n=e[0]-i[0],r=e[1]-i[1],s=Math.hypot(n,r),a=t*s,o=(s*s/4+a*a)/(2*Math.abs(a)),c=(i[0]+e[0])/2,l=(i[1]+e[1])/2,u=r/s,d=-n/s,h=(o-Math.abs(a))*Math.sign(a),p=c-u*h,g=l-d*h,v=Math.atan2(i[1]-g,i[0]-p)*180/Math.PI;let m=Math.atan2(e[1]-g,e[0]-p)*180/Math.PI-v;for(;m>180;)m-=360;for(;m<-180;)m+=360;return _t(p,g,o,v,v+m)}const Fd=(i,e,t,n,r,s=24)=>$e(...Array.from({length:s+1},(a,o)=>[i+n*Math.sin(o/s*r*2*Math.PI),e+(t-e)*o/s])),Od=(i,e,t,n,r,s=0,a=40)=>$e(...Array.from({length:a+1},(o,c)=>{const l=c/a,u=(s+l*r*360)*Math.PI/180,d=t+(n-t)*l;return[i+d*Math.cos(u),e+d*Math.sin(u)]})),as=(i,e,t,n,r)=>r.map(s=>{const a=Math.cos(s*Math.PI/180),o=Math.sin(s*Math.PI/180);return $e([i+t*a,e+t*o],[i+n*a,e+n*o])}),Bd={wolf:[dt(.3),$e([.28,.08],[.5,.3],[.72,.08]),_t(.5,.55,.2,-55,55),ft,Kt(.5+.2*Math.cos(-55*Math.PI/180),.55+.2*Math.sin(-55*Math.PI/180))],fox:[dt(.34),$e([.36,.06],[.5,.34],[.64,.06]),_t(.67,.66,.17,180,-80),Kt(.67+.17*Math.cos(-80*Math.PI/180),.66+.17*Math.sin(-80*Math.PI/180)),ft],badger:[dt(.1),$e([.24,.3],[.76,.3]),...pt($e([.33,.14],[.33,.56])),ft,...pt(Kt(.24,.3))],boar:[dt(.16),...pt(_t(.36,.24,.15,45,180)),...as(.5,.16,0,.1,[-130,-90,-50]),ft],stag:[dt(.42),...pt($e([.5,.42],[.34,.26],[.3,.06]),$e([.335,.25],[.16,.2]),$e([.32,.15],[.18,.07])),ft],hare:[dt(.44),...pt($e([.5,.44],[.4,.34],[.38,.06])),_t(.62,.66,.09,180,540),ft,...pt(Kt(.38,.06))],owl:[dt(.44),...pt(_t(.33,.3,.13,0,360),$e([.24,.18],[.18,.05])),ft,...pt(Kt(.33,.3))],bear:[dt(.24),$e([.24,.3],[.76,.3]),...pt(_t(.3,.3,.09,180,360)),...pt($e([.36,.5],[.32,.62])),ft],hedgehog:[dt(.52),_t(.5,.52,.2,180,360),...as(.5,.52,.22,.34,[-160,-125,-90,-55,-20]),ft],squirrel:[dt(.2),$e([.5,.2],[.4,.08]),_t(.66,.4,.16,100,-200),Kt(.66+.16*Math.cos(-200*Math.PI/180),.4+.16*Math.sin(-200*Math.PI/180)),ft],toad:[dt(.42),$e([.16,.54],[.24,.42],[.76,.42],[.84,.54]),...pt(_t(.34,.3,.1,0,360)),ft,...pt(Kt(.16,.54))],otter:[dt(.24),_t(.5,.5,.28,-100,100),Kt(.5+.28*Math.cos(-100*Math.PI/180),.5+.28*Math.sin(-100*Math.PI/180)),qn([.18,.64],[.36,.64],.3),ft],lynx:[dt(.32),$e([.26,.2],[.5,.32],[.74,.2]),...pt($e([.26,.2],[.26,.06])),$e([.5,.68],[.66,.62]),ft,...pt(Kt(.26,.06))],elk:[dt(.3),...pt($e([.5,.3],[.42,.2]),_t(.3,.16,.12,0,180),$e([.18,.16],[.14,.06])),$e([.5,.44],[.6,.52]),ft],raven:[dt(.14),$e([.5,.14],[.3,.22]),$e([.18,.56],[.5,.38],[.82,.56]),ft,Kt(.58,.17),...pt(Kt(.18,.56))],bat:[dt(.3),_t(.5,.16,.14,20,160),...pt($e([.5,.38],[.12,.26]),qn([.12,.26],[.24,.46],-.25),qn([.24,.46],[.38,.5],-.3),qn([.38,.5],[.5,.52],-.3)),ft],mole:[dt(.44),_t(.5,.3,.16,0,180),...as(.5,.3,.19,.3,[-160,-125,-55,-20]),$e([.5,.14],[.5,.04]),ft],beaver:[dt(.36),$e([.32,.2],[.68,.2]),...pt($e([.44,.2],[.44,.34])),$e([.5,.56],[.68,.66],[.5,.76],[.32,.66],[.5,.56]),ft],stoat:[dt(.18),_t(.5,.44,.24,180,360),$e([.5,.18],[.6,.08]),ft,...pt(Kt(.26,.44))],snail:[dt(.52),Od(.5,.33,.03,.2,1.6,90),$e([.66,.2],[.76,.06]),ft,Kt(.76,.06)],ram:[dt(.24),...pt(_t(.36,.24,.14,0,-250)),ft,...pt(Kt(.36+.14*Math.cos(-250*Math.PI/180),.24+.14*Math.sin(-250*Math.PI/180)))],woodlouse:[dt(.24),_t(.5,.52,.22,205,335),_t(.5,.66,.24,205,335),_t(.5,.38,.2,205,335),...pt($e([.5,.24],[.32,.06])),ft],snake:[dt(.16),Fd(.5,.82,.2,.2,1.25),$e([.5,.2],[.5,.11]),...pt($e([.5,.11],[.42,.045])),ft],moth:[dt(.2),...pt($e([.5,.3],[.16,.18],[.24,.5],[.5,.4]),$e([.5,.5],[.3,.64],[.5,.66]),_t(.38,.16,.12,0,-110)),ft],marten:[dt(.32),$e([.3,.2],[.5,.32],[.7,.2]),...pt(_t(.3,.14,.07,90,-180)),_t(.28,.56,.22,0,150),Kt(.28+.22*Math.cos(150*Math.PI/180),.56+.22*Math.sin(150*Math.PI/180)),ft],salamander:[dt(.3),qn([.5,.3],[.5,.06],.35),qn([.5,.3],[.5,.06],-.35),...pt($e([.5,.42],[.32,.38],[.26,.48]),$e([.5,.64],[.32,.6],[.26,.7])),ft,...pt(Kt(.38,.52))],glowworm:[dt(.4),_t(.5,.27,.1,90,450),...as(.5,.27,.15,.25,[0,60,120,180,240,300]),ft],spider:[$e([.5,.05],[.5,.3]),dt(.5),_t(.5,.4,.11,-90,270),...pt(...[-150,-170,170,150].map(i=>$e([.5+.12*Math.cos(i*Math.PI/180),.4+.12*Math.sin(i*Math.PI/180)],[.5+.28*Math.cos(i*Math.PI/180),.4+.28*Math.sin(i*Math.PI/180)],[.5+.32*Math.cos(i*Math.PI/180),.4+.28*Math.sin(i*Math.PI/180)+.1]))),ft,Kt(.5,.05)],dormouse:[dt(.12),_t(.5,.46,.24,-60,250),...pt(_t(.34,.16,.08,90,-180)),qn([.56,.38],[.7,.38],-.4),ft],beetle:[dt(.36),...pt(_t(.66,.26,.2,160,250)),qn([.5,.38],[.5,.82],.25),qn([.5,.38],[.5,.82],-.25),ft]},jl={pink:[255,64,200],cyan:[50,235,255],acid:[175,255,45],violet:[165,95,255],orange:[255,135,35],lemon:[255,238,70],red:[255,55,95],mint:[70,255,175],blue:[70,145,255],magenta:[235,70,255]},zd={badger:"pink",boar:"cyan",snail:"acid",fox:"violet",ram:"orange",woodlouse:"lemon",hedgehog:"red",squirrel:"mint",wolf:"blue",stag:"magenta",stoat:"pink",snake:"cyan",hare:"acid",owl:"violet",bear:"orange",toad:"lemon",otter:"red",lynx:"mint",elk:"blue",raven:"magenta",bat:"pink",mole:"cyan",beaver:"acid",beetle:"violet",moth:"orange",marten:"lemon",salamander:"red",glowworm:"mint",spider:"blue",dormouse:"magenta"},da=i=>jl[zd[i]]||jl.cyan,kd=[255,255,250],Gd=(i,e,t)=>i.map((n,r)=>Math.round(n+(e[r]-n)*t)),ec=i=>`rgb(${i.join(",")})`;function Hd(i=0){const e=Math.max(0,i);return{level:e,metres:2+e+Math.max(0,e-2)*.5,core:1+.2*e,halo:Math.min(1,.45+.19*e),rings:e>=4?3:e>=3?2:e>=2?1:0,dots:e>=1&&e<2?12:0,band:e>=3,rays:e>=4?8:e>=3?4:0,shimmer:e>=3}}function Bs(i){if(i.d)return{dot:!0,pts:[i.d],len:fl*2};let e=i.l;if(i.a){const[n,r,s,a,o]=i.a,c=Math.max(6,Math.ceil(Math.abs(o-a)/8));e=Array.from({length:c+1},(l,u)=>{const d=(a+(o-a)*u/c)*Math.PI/180;return[n+s*Math.cos(d),r+s*Math.sin(d)]})}let t=0;for(let n=1;n<e.length;n++)t+=Math.hypot(e[n][0]-e[n-1][0],e[n][1]-e[n-1][1]);return{dot:!1,pts:e,len:t}}const po=(i,e=0,t=1)=>{const n=i.reduce((s,a)=>s+a.len,0)||1;let r=0;for(const s of i)s.start=e+(t-e)*r/n,r+=s.len,s.end=e+(t-e)*r/n;return i},Ea=new Map;function Eh(i){return Ea.has(i)||Ea.set(i,po((Bd[i]||[]).map(e=>({...Bs(e),w:ua,part:"sigil"})))),Ea.get(i)}const Aa=new Map;function Vd(i,e=0){const t=i+":"+e;if(Aa.has(t))return Aa.get(t);const n=e===null?null:Hd(e),r=n?n.rings>=2?.6:n.rings||n.dots?.66:.8:1,s=(1-r)/2,a=n?n.core:1,o=ua*.55*((n?.level??0)<3?1:Math.min(1.6,.8+.25*n.level)),c=[];if(n){const p=g=>Bs({a:[.5,.5,g,90,450]});for(let g=0;g<n.rings;g++)c.push({...p(.44-g*.06),w:o,part:"ring"});for(let g=0;g<n.dots;g++){const v=(90+g*360/n.dots)*Math.PI/180;c.push({dot:!0,pts:[[.5+.44*Math.cos(v),.5+.44*Math.sin(v)]],len:.05,r:.042,w:o,part:"ring"})}if(n.band&&n.rings>=2)for(let g=0;g<16;g++){const v=(90+g*22.5)*Math.PI/180,x=.44-.06+.014,m=.44-.014;c.push({...Bs({l:[[.5+x*Math.cos(v),.5+x*Math.sin(v)],[.5+m*Math.cos(v),.5+m*Math.sin(v)]]}),w:o*.8,part:"band"})}for(let g=0;g<n.rays;g++){const v=(90+g*360/n.rays)*Math.PI/180,x=.44+.02,m=.5-o/2;c.push({...Bs({l:[[.5+x*Math.cos(v),.5+x*Math.sin(v)],[.5+m*Math.cos(v),.5+m*Math.sin(v)]]}),w:o*1.3,part:"ray"})}}const l=Math.min(1.25,a),u=Eh(i).map(h=>({dot:h.dot,len:h.len*r,pts:h.pts.map(([p,g])=>[s+p*r,s+g*r]),w:h.w*r*l,r:fl*r*l,part:"sigil"})),d={level:e,frame:n,k:r,strokes:[...po(c,0,c.length?.15:0),...po(u,c.length?.15:0,1)]};return Aa.set(t,d),d}function Wd(i,e){if(e>=i.end)return i.pts;if(e<=i.start)return null;if(i.dot)return i.pts;let t=(e-i.start)/(i.end-i.start)*i.len;const n=[i.pts[0]];for(let r=1;r<i.pts.length;r++){const s=i.pts[r-1],a=i.pts[r],o=Math.hypot(a[0]-s[0],a[1]-s[1]);if(t<=o){n.push([s[0]+(a[0]-s[0])*t/o,s[1]+(a[1]-s[1])*t/o]);break}n.push(a),t-=o}return n}function Xd(i,e,{x:t=0,y:n=0,size:r=64,level:s=null,colour:a=da(e),progress:o=1,glow:c=!0}={}){const l=Vd(e,s),u=l.frame?l.frame.halo:.7;i.save(),i.translate(t,n),i.scale(r,r),i.lineCap="round",i.lineJoin="round";const d=(h,p,g,v)=>{i.globalAlpha=g,i.strokeStyle=i.fillStyle=ec(h),i.shadowColor=ec(a),i.shadowBlur=v;for(const x of l.strokes){const m=Wd(x,o);if(m){if(i.beginPath(),x.dot){i.arc(m[0][0],m[0][1],x.r*(p>1?1.5:1),0,Math.PI*2),i.fill();continue}i.lineWidth=x.w*p,m.forEach((_,M)=>M?i.lineTo(_[0],_[1]):i.moveTo(_[0],_[1])),i.stroke()}}};c?(d(a,2.4,Math.min(u,.7)*.55,r/12),d(Gd(a,kd,.72),.62,1,r/30)):d(a,1,1,0),i.restore()}function Yd(i,e,t,n){let r=1/0;for(const s of i){if(s.start>=r)break;if(s.dot){Math.hypot(e-s.pts[0][0],t-s.pts[0][1])<fl+n-ua/2&&(r=s.start);continue}let a=0;for(let o=1;o<s.pts.length;o++){const c=s.pts[o-1],l=s.pts[o],u=l[0]-c[0],d=l[1]-c[1],h=u*u+d*d,p=Math.sqrt(h),g=h?Math.max(0,Math.min(1,((e-c[0])*u+(t-c[1])*d)/h)):0;if(Math.hypot(e-c[0]-u*g,t-c[1]-d*g)<n){const v=s.start+(a+g*p)/s.len*(s.end-s.start);v<r&&(r=v)}a+=p}}return r}function qd(i,e,t,n=ua/2){return Yd(Eh(i),e,t,n)<1/0}dl.map(i=>i.id);const Kd=new Set([f.TRUNK,f.BARK2,f.BARKD,f.BARKL]);function Fi(i,e,t,n,r,s,{mat:a=f.LEAF,group:o=30,ragged:c=1}={}){const u=[];for(let m=0;m<9;m++){const _=m/9*Math.PI*2,M=1+(s()-.5)*.35*(r.clump+.3);u.push([e[0]+Math.cos(_)*t*M,e[1]+Math.sin(_)*n*M*(Math.sin(_)>0?.8:1)])}const d=Math.max(1,Math.round(Math.min(t,n)/3.5));i.shape(ca(u,0,9,d,Math.max(1.2,Math.min(t,n)*.14)*c,1),a,{group:o,line:!1,round:r.round}),i.mark([Et(e,[-t*1.1,n*.15]),Et(e,[t*1.1,n*.1]),Et(e,[t*1.1,n*1.2]),Et(e,[-t*1.1,n*1.2])],f.LEAF3,[a]),i.mark([Et(e,[-t*.75,-n*.55]),Et(e,[t*.25,-n*.95]),Et(e,[t*.55,-n*.35]),Et(e,[-t*.2,-n*.05])],f.LEAF2,[a]);const h=Math.floor(e[0]-t*1.2),p=Math.ceil(e[0]+t*1.2),g=Math.floor(e[1]-n*1.2),v=Math.ceil(e[1]+n*1.2),x=s()*1e4|0;for(let m=g;m<=v;m++)for(let _=h;_<=p;_++){const M=i.get(_,m);if(M!==a&&M!==f.LEAF2&&M!==f.LEAF3)continue;const b=Rt(_,m,x),w=mi(_/2,m/2,x)*.5+b*.5;w<.16*r.density?i.recolour(_,m,M===f.LEAF2?a:f.LEAF2):w>1-.16*r.density&&i.recolour(_,m,M===f.LEAF3?a:f.LEAF3)}}function Mi(i,e,t,n,r,s,a,o,{mat:c=f.TRUNK,bend:l=1,group:u=10,line:d=!1}={}){const h=[e],p=4;let g=t,v=e;for(let x=1;x<=p;x++)g+=(o()-.5)*.7*a.gnarl*l,v=Et(v,[Math.cos(g)*n/p,Math.sin(g)*n/p]),h.push(v);return i.limb(h.map((x,m)=>[...x,r+(s-r)*m/p]),c,{group:u,line:d,round:a.round,cap:.6,capEnd:1}),{end:v,ang:g,pts:h}}function fa(i,e,t,n,r,s,a){if(i.shape([[e-n*1.05,t],[e-n*.62,t-n*.5],[e-n*.45,t-n*1.4],[e+n*.45,t-n*1.4],[e+n*.62,t-n*.5],[e+n*1.05,t]],f.TRUNK,{group:10,round:r.round}),r.roots<=0)return;const o=Math.round(2+r.roots*4);for(let c=0;c<o;c++){const l=c%2?1:-1,u=(8+s()*16)*a*(.4+r.roots),d=(2+s()*3)*a,h=[e+l*n*.2,t-n*.5],p=[e+l*(n*.55+u*.4),t-d],g=[e+l*(n*.5+u),t-.5];i.limb([[...h,n*.55],[...p,n*.28],[...g,1.2]],f.TRUNK,{group:11,round:r.round,cap:.5,capEnd:.6})}}function pa(i,e,t=!0){if(!(e.bark<=0))for(let n=0;n<i.h;n++)for(let r=0;r<i.w;r++){const s=n*i.w+r;if(i.m[s]!==f.TRUNK)continue;const a=t?mi(r/1.3,n/6,21):mi(r/6,n/1.3,21);a>1-e.bark*.42||Rt(r,n,4)<e.bark*.05?i.m[s]=f.BARKD:a>1-e.bark*.62&&i.n[s*3]<-.1&&(i.m[s]=f.BARKL)}}function xr(i,e,t){let n=i.w,r=-1,s=i.h;for(let h=0;h<i.h;h++)for(let p=0;p<i.w;p++)i.m[h*i.w+p]&&(n=Math.min(n,p),r=Math.max(r,p),s=Math.min(s,h));if(r<0)return{sp:i,crownY:t};const a=Math.max(e-n,r-e)+2,o=Math.max(0,Math.floor(e-a)),c=Math.min(i.w-o,Math.ceil(a*2)+1),l=Math.max(0,s-1),u=i.h-l,d=new cn(c,u);for(let h=0;h<u;h++)for(let p=0;p<c;p++){const g=(h+l)*i.w+p+o,v=h*c+p;d.m[v]=i.m[g],d.g[v]=i.g[g],d.n[v*3]=i.n[g*3],d.n[v*3+1]=i.n[g*3+1],d.n[v*3+2]=i.n[g*3+2]}return{sp:d,crownY:t-l}}const Zr=i=>(i.crownWidth||3)/3;function Ah(i,e,t){const n=Zr(e),r=Math.round(220*t*n+60*t),s=Math.round(140*t),a=new cn(r,s),o=r/2,c=s,l=e.treeTrunks||1,u=12*t*(e.treeThick||1)*(e.treeThin?.55:1)/Math.sqrt(l),d=(i()-.5)*.5*e.gnarl+(e.treeLean||0),h=[];let p=s;const g=(v,x,m,_,M)=>{const b=Mi(a,v,x,m,_,_*.65,e,i,{group:12});if(M===0){h.push(b.end);return}const w=i()<.35?3:2;for(let E=0;E<w;E++){const P=(E-(w-1)/2)*ye(i,.5,.85)*(M===3?1.4:1);g(b.end,b.ang+P+(i()-.5)*.25,m*ye(i,.6,.78),_*.62,M-1)}M<=2&&h.push(ti(v,b.end,.7))};for(let v=0;v<l;v++){const x=d+(l>1?(v/(l-1)-.5)*.8:0),m=[o+(v-(l-1)/2)*u*.6,c],_=Mi(a,m,-Math.PI/2+x,s*.36*(l>1?ye(i,.75,1.15):1),u,u*.72,e,i,{bend:1.4});p=Math.min(p,_.end[1]);for(const M of[-1,1])g(_.end,-Math.PI/2+x*.5+M*ye(i,.55,.95)*(.7+.3*n)*(l>1?.6:1),s*.22*(.75+.25*n)*(l>1?.7:1),u*.7,l>2?2:3);if(l===1&&i()<.7&&g(_.end,-Math.PI/2+(i()-.5)*.3,s*.18,u*.55,2),v===0&&e.treeHollow){const M=ti(m,_.end,.38);a.ellipse(M[0],M[1],u*.28,u*.5,f.NOSE,{round:.3})}}if(fa(a,o,c,u*Math.sqrt(l),e,i,t),pa(a,e),e.treeWebs)for(let v=0;v+1<h.length;v+=2){const x=h[v],m=h[v+1],_=Math.hypot(m[0]-x[0],m[1]-x[1]);if(_<40*t)for(let M=0;M<=_;M++){const b=ti(x,m,M/_);a.px(b[0],b[1]+Math.sin(M/_*Math.PI)*_*.15,f.WEB,0,0,1)}}if(e.treeBare)return xr(a,o,p+4*t);h.sort((v,x)=>v[1]-x[1]);for(const v of h)Fi(a,Et(v,[0,-3*t]),ye(i,14,21)*t,ye(i,10,14)*t,e,i,{mat:i()<.35?f.LEAF3:f.LEAF});for(const v of h)i()<.75&&Fi(a,Et(v,[ye(i,-9,9)*t,ye(i,-12,-3)*t]),ye(i,10,15)*t,ye(i,7,10)*t,e,i);return xr(a,o,p+4*t)}function pl(i,e,t){const n=.8+.2*Zr(e),r=Math.round(90*t*n),s=Math.round(160*t),a=new cn(r,s),o=r/2,c=s;a.limb([[o,c,6*t],[o,c-s*.5,4*t],[o,6*t,1.5]],f.TRUNK,{group:10,round:e.round}),fa(a,o,c,6*t,e,i,t*.6),pa(a,e);const l=Math.round(ye(i,9,12));for(let u=l-1;u>=0;u--){const d=u/(l-1),h=6*t+d*s*.7,p=(5+d*36)*t*n*ye(i,.9,1.1),g=(5+d*13)*t,v=[[o,h-4*t],[o+p*.5,h+g*.3],[o+p,h+g],[o+p*.7,h+g*1.15],[o,h+g*.7],[o-p*.7,h+g*1.15],[o-p,h+g],[o-p*.5,h+g*.3]];a.shape(ca(v,1,7,Math.max(2,Math.round(p/(3*t))),2*t,1),f.LEAF,{group:30+u,line:!1,round:e.round}),a.mark([[o-p,h+g*.55],[o+p,h+g*.55],[o+p,h+g*1.4],[o-p,h+g*1.4]],f.LEAF3,[f.LEAF]),a.mark([[o-p*.55,h-2*t],[o+p*.1,h-3*t],[o+p*.1,h+g*.45],[o-p*.7,h+g*.7]],f.LEAF2,[f.LEAF])}return xr(a,o,s*.82)}function Th(i,e,t){const n=Zr(e),r=Math.round(200*t*n+50*t),s=Math.round(130*t),a=new cn(r,s),o=r/2,c=s,l=13*t,u=Mi(a,[o,c],-Math.PI/2+(i()-.5)*.3,s*.3,l,l*.8,e,i,{bend:1.6}),d=[];for(let g=0;g<5;g++){const v=g%2?1:-1,x=-Math.PI/2+v*ye(i,.55,1.25)*(.7+.3*n),m=Mi(a,u.end,x,s*ye(i,.3,.42)*(.8+.2*n),l*.55,l*.3,e,i,{group:12});d.push(m.end)}fa(a,o,c,l,e,i,t),pa(a,e);for(const g of d)Fi(a,Et(g,[0,-2*t]),ye(i,20,28)*t,ye(i,9,12)*t,e,i);Fi(a,Et(u.end,[0,-8*t]),24*t,11*t,e,i);let h=r,p=0;for(const g of d)h=Math.min(h,g[0]-22*t),p=Math.max(p,g[0]+22*t);for(let g=h;g<p;g+=ye(i,1,1.7)){let v=s;for(let M=0;M<s;M++)if(a.get(g,M)===f.LEAF||a.get(g,M)===f.LEAF2||a.get(g,M)===f.LEAF3){v=M;break}if(v>=s)continue;const x=Math.abs(g-o)/(r/2),m=(c-v)*ye(i,.5,.9)*(1-x*.3),_=Rt(g|0,1,9)<.4?f.LEAF2:f.LEAF;for(let M=v+2;M<Math.min(c-2,v+m);M++){const b=Math.round(Math.sin(M*.12+g)*.7);Rt(g|0,M,5)<.2+e.density*.8&&a.px(g+b,M,(M-v)/m>.8?f.LEAF3:_,b*.3,.2,.95)}}return xr(a,o,u.end[1]+6*t)}function Rh(i,e,t){const n=.7+.3*Zr(e),r=Math.round(110*t*n),s=Math.round(155*t),a=new cn(r,s),o=r/2,c=s,l=(i()-.5)*.25+(e.treeLean||0),u=Mi(a,[o,c],-Math.PI/2+l,s*.85,5*t,2*t,e,i,{mat:f.BARK2,bend:.4});for(let h=0;h<u.pts.length-1;h++)for(let p=0;p<1;p+=1/8){const g=ti(u.pts[h],u.pts[h+1],p+i()*.1);if(i()<.55)for(let v=-3;v<=3;v++)a.get(g[0]+v,g[1])===f.BARK2&&i()<.8&&a.recolour(g[0]+v,g[1],f.BARKD)}const d=[u.end];for(let h=0;h<7;h++){const p=ye(i,.35,.9),g=ti(u.pts[0],u.end,p),v=h%2?1:-1,x=Mi(a,g,-Math.PI/2+v*ye(i,.5,1),s*ye(i,.12,.2)*n,2*t,1,e,i,{mat:f.BARKD,group:12});d.push(x.end)}for(const h of d)Fi(a,h,ye(i,9,13)*t*n,ye(i,7,10)*t,e,i,{mat:f.LEAF2,ragged:1.3});return xr(a,o,s*.55)}function Ch(i,e,t){const n=Zr(e),r=Math.round(220*t*n+50*t),s=Math.round(120*t),a=new cn(r,s),o=r/2,c=s,l=10*t,u=Mi(a,[o,c],-Math.PI/2+(i()-.5)*.4*(e.gnarl+.3),s*.4,l,l*.75,e,i,{bend:1.2}),d=[];for(const g of[-1,1,-1,1]){const v=Mi(a,u.end,-Math.PI/2+g*ye(i,.7,1.15)*(.7+.3*n),s*ye(i,.3,.42)*(.7+.3*n),l*.55,l*.25,e,i,{group:12});d.push(v.end,ti(u.end,v.end,.55))}fa(a,o,c,l,e,i,t),pa(a,e);const h=Math.round(ye(i,2,3)),p=Math.min(...d.map(g=>g[1]));for(let g=0;g<h;g++){const v=p-6*t+g*9*t,x=(95-g*12)*t*(.65+.35*n);for(let m=0;m<5;m++)Fi(a,[o+(m-2)*x*.36+ye(i,-5,5)*t,v+ye(i,-3,3)*t],x*ye(i,.2,.26),7*t,e,i,{mat:g===h-1?f.LEAF:f.LEAF3})}return xr(a,o,u.end[1]+4*t)}function ml(i,e,t){const n=e.leafHue+(i()-.5)*e.leafVariety*.7+(t===pl?.06:0);return{[f.TRUNK]:ge(e.trunkHue,.45*e.sat,.34),[f.BARKD]:ge(e.trunkHue+.03,.5*e.sat,.17),[f.BARKL]:ge(e.trunkHue-.01,.38*e.sat,.5),[f.BARK2]:[222,220,212],[f.LEAF]:ge(n,.62*e.sat,.58),[f.LEAF2]:ge(n-.05,.55*e.sat,.8),[f.LEAF3]:ge(n+.03,.66*e.sat,.38),[f.WEB]:[225,225,232]}}function $d(i){const{sp:e,crownY:t}=i,n=new cn(e.w,e.h),r=new cn(e.w,e.h);for(let s=0;s<e.h;s++)for(let a=0;a<e.w;a++){const o=s*e.w+a,c=e.m[o];if(!c)continue;(Kd.has(c)&&s>=t?r:n).put(a,s,c,e.n[o*3],e.n[o*3+1],e.n[o*3+2])}return{top:n,bot:r}}function Zd(i,e){const t=e.bushSize,n=fh(i,["round","round","fern","grass","shrub"]),r=Math.round(40*t),s=Math.round(28*t),a=new cn(r,s);if(n==="round"||n==="shrub"){const c=n==="shrub"?5:3;for(let l=0;l<c;l++)Fi(a,[r/2+ye(i,-9,9)*t,s-8*t+ye(i,-4,2)*t],ye(i,7,10)*t,ye(i,5,8)*t,e,i);if(n==="shrub"||i()<e.flowers)for(let l=0;l<18*e.flowers+3;l++){const u=r/2+ye(i,-12,12)*t,d=s-ye(i,5,17)*t;a.get(u,d)&&a.recolour(u,d,f.FLOWER)}}else if(n==="fern")for(let c=0;c<7;c++){const l=-Math.PI/2+(c/6-.5)*2.4;let u=r/2,d=s-1;for(let h=0;h<15*t;h++)u+=Math.cos(l)*.9,d+=Math.sin(l)*.9+h*.06,a.put(u,d,c%2?f.LEAF3:f.LEAF,Math.cos(l)*.4,-.2,.9),h%2&&(a.put(u,d-1,f.LEAF2,0,-.5,.85),a.put(u+Math.sign(Math.cos(l)),d+1,f.LEAF,0,.3,.9))}else for(let c=0;c<18*t;c++){const l=r/2+ye(i,-13,13)*t,u=ye(i,5,15)*t,d=ye(i,-3,3);for(let h=0;h<u;h++)a.put(l+d*h/u*(h/u),s-1-h,h>u*.65?f.LEAF2:h<u*.3?f.LEAF3:f.LEAF,d*.1,-.3,.9)}const o=ml(i,e,null);return o[f.FLOWER]=ge(i(),.55,.95),{sp:a,colours:o}}const ot=(i,e={})=>["tree",{type:i,...e}],Oe=(i,e={})=>[i,e],Jr=[{id:"moor",name:"Moor",creature:"badger",by:"Ed",leaf:.24,floor:["moss",.26,.45,.42],text:{floor:"moss",wall:"puddles, a lake",small:"long grass",big:"moss mounds"},wall:[Oe("water",{w:1.6})],small:[Oe("grass",{h:1.4})],big:[Oe("mound",{moss:!0})]},{id:"fern-forest",name:"Fern forest",creature:"boar",by:"Ed",leaf:.3,floor:["needles",.08,.45,.32],text:{floor:"pine needles",small:"ferns",big:"pine trees"},small:[Oe("fern")],big:[ot("fir")]},{id:"muddy-forest",name:"Muddy forest",creature:"snail",by:"Ed",leaf:.22,floor:["mud",.07,.5,.28],text:{floor:"mud and leaves",small:"short trunks with broken branches",big:"trees with many trunks and branches"},small:[Oe("stump",{snag:!0})],big:[ot("broad",{trunks:3,gnarl:.9})]},{id:"stone-shrine",name:"Stone shrine",creature:"fox",by:"Ed",leaf:.28,floor:["stony",.25,.3,.45],text:{floor:"grassy, stony",wall:"mossy henges",small:"little stones",big:"big stones",set:"a shrine"},wall:[Oe("henge")],small:[Oe("stones")],big:[Oe("boulder")],set:Oe("shrine")},{id:"tangly-forest",name:"Tangly forest",creature:"ram",by:"Ed",leaf:.27,floor:["nettles",.28,.5,.3],text:{floor:"nettles and earth",small:"tangled branches",big:"fairly short tangly trees"},small:[Oe("bramble",{bare:!0})],big:[ot("broad",{scale:.7,gnarl:1})]},{id:"wispy-forest",name:"Wispy forest",creature:"woodlouse",by:"Ed",leaf:.2,floor:["leaves",.09,.55,.45],text:{floor:"dry leaves",small:"tall thin wispy trees",big:"thick trees with several trunks"},small:[ot("birch",{scale:.75})],big:[ot("broad",{trunks:3,thick:1.4})]},{id:"hazel-forest",name:"Hazel forest",creature:"hedgehog",by:"Ed",leaf:.26,floor:["grass",.24,.45,.45],text:{floor:"short grass",small:"brown lumps",big:"crooked trees with many branches"},small:[Oe("mound",{brown:!0})],big:[ot("broad",{gnarl:1,scale:.85})]},{id:"garden",name:"Garden",creature:"squirrel",by:"Ed",leaf:.3,floor:["lawn",.27,.5,.5],text:{floor:"uniform grass",wall:"ornate stone wall",small:"manicured flower beds",big:"willows",set:"a stone pavilion"},wall:[Oe("wall")],small:[Oe("flowerbed")],big:[ot("willow")],set:Oe("pavilion")},{id:"twiggy-forest",name:"Twiggy forest",creature:"wolf",by:"Ed",leaf:.29,floor:["plants",.3,.5,.38],text:{floor:"small leafy plants",small:"small trees with many thin trunks",big:"straight but slanted trees with many trunks"},small:[ot("broad",{trunks:4,scale:.5,thin:!0})],big:[ot("broad",{trunks:3,lean:.3,gnarl:.1})]},{id:"ancient",name:"Ancient",creature:"stag",by:"Ed",leaf:.31,floor:["roots",.1,.25,.35],text:{floor:"mossy roots over rocks",small:"sorrel",big:"giant gnarly slanted trees"},small:[Oe("flowers",{hue:.98,leafy:!0})],big:[ot("broad",{scale:1.4,gnarl:1,lean:.35})]},{id:"norway",name:"Norway",creature:"stoat",by:"Ed",leaf:.36,floor:["slate",.6,.15,.35],text:{floor:"pine needles and slate",small:"rocks",big:"straight pines"},small:[Oe("stones",{big:!0})],big:[ot("fir",{scale:1.2})]},{id:"alder-forest",name:"Alder forest",creature:"snake",by:"Ed",leaf:.23,floor:["tallgrass",.22,.45,.42],text:{floor:"tall and short grass",small:"tree stumps with tall grass around",big:"tall slanted trees with thin leaves at different heights"},small:[Oe("stump",{grass:!0})],big:[ot("birch",{lean:.3,scale:1.2,dark:!0})]},{id:"meadow",name:"Meadow",creature:"hare",by:"draft",leaf:.25,floor:["flowers",.25,.5,.5],text:{floor:"grass and wildflowers",small:"scattered hawthorn",big:"lone oaks"},small:[Oe("shrub",{flower:[250,245,235]})],big:[ot("broad",{scale:1.1})]},{id:"old-oaks",name:"Old oaks",creature:"owl",by:"draft",leaf:.22,floor:["leaves",.07,.5,.35],text:{floor:"leaf litter",small:"acorns, fallen branches",big:"ancient gnarled oaks with hollow trunks",set:"a great hollow oak"},small:[Oe("cones",{acorn:!0}),Oe("log",{branch:!0})],big:[ot("broad",{gnarl:.9,hollow:!0})],set:ot("broad",{scale:1.6,gnarl:1,hollow:!0})},{id:"berry-thicket",name:"Berry thicket",creature:"bear",by:"draft",leaf:.32,floor:["needles",.08,.45,.3],text:{floor:"pine needles",wall:"bramble thickets",small:"berry bushes",big:"tall pines"},wall:[Oe("bramble")],small:[Oe("shrub",{flower:[200,30,60]})],big:[ot("fir",{scale:1.3})]},{id:"wetland",name:"Wetland",creature:"toad",by:"draft",leaf:.2,floor:["mud",.15,.45,.3],text:{floor:"wet mud",wall:"puddles, reeds",small:"reeds and rushes",big:"willows"},wall:[Oe("water"),Oe("reeds",{tall:!0})],small:[Oe("reeds")],big:[ot("willow")]},{id:"stream",name:"Stream",creature:"otter",by:"draft",leaf:.27,floor:["pebbles",.25,.3,.45],text:{floor:"pebbles and grass",wall:"a stream or pond",small:"alder saplings",big:"alders",set:"a fallen-log bridge"},wall:[Oe("water",{w:2})],small:[ot("broad",{scale:.45})],big:[ot("broad",{scale:.95,gnarl:.3})],set:Oe("bridge")},{id:"rocky-slope",name:"Rocky slope",creature:"lynx",by:"draft",leaf:.34,floor:["scree",.2,.2,.42],text:{floor:"scree and moss",wall:"boulders",small:"rocks",big:"pines",set:"a rocky outcrop"},wall:[Oe("boulder",{big:!0})],small:[Oe("stones",{big:!0})],big:[ot("fir")],set:Oe("outcrop")},{id:"bog",name:"Bog",creature:"elk",by:"draft",leaf:.38,floor:["moss",.18,.55,.4],text:{floor:"sphagnum moss",wall:"bog pools",small:"cotton grass",big:"spruce"},wall:[Oe("water",{bog:!0})],small:[Oe("reeds",{cotton:!0})],big:[ot("fir",{dark:!0})]},{id:"deadwood",name:"Deadwood",creature:"raven",by:"draft",leaf:.15,floor:["earth",.07,.35,.3],text:{floor:"bare earth",small:"broken branches",big:"blasted dead trees"},small:[Oe("log",{branch:!0})],big:[ot("broad",{bare:!0,gnarl:1})]},{id:"cave-mouth",name:"Cave mouth",creature:"bat",by:"draft",leaf:.2,floor:["stone",.08,.15,.35],text:{floor:"stone and roots",wall:"rock walls",small:"stalagmite stubs",big:"dead trees",set:"a cave mouth"},wall:[Oe("rockwall")],small:[Oe("stalagmite")],big:[ot("broad",{bare:!0})],set:Oe("cave")},{id:"grassland",name:"Grassland",creature:"mole",by:"draft",leaf:.25,floor:["grass",.26,.5,.48],text:{floor:"short turf",small:"molehills",big:"lone birches"},small:[Oe("mound",{brown:!0,small:!0})],big:[ot("birch")]},{id:"beaver-pond",name:"Beaver pond",creature:"beaver",by:"draft",leaf:.17,floor:["leaves",.13,.6,.5],text:{floor:"birch leaves",wall:"a pond",small:"stumps",big:"birch and aspen",set:"a beaver dam"},wall:[Oe("water",{w:2})],small:[Oe("stump",{gnawed:!0})],big:[ot("birch")],set:Oe("dam")},{id:"log-pile",name:"Log pile",creature:"beetle",by:"draft",leaf:.22,floor:["leaves",.06,.5,.3],text:{floor:"rotting leaves",small:"fungi",big:"rotting logs",set:"a fallen giant"},small:[Oe("fungi")],big:[Oe("log",{rot:!0})],set:Oe("log",{rot:!0,giant:!0})},{id:"heath",name:"Heath",creature:"moth",by:"draft",leaf:.27,floor:["heather",.85,.35,.4],text:{floor:"heather",small:"gorse",big:"wind-bent birches"},small:[Oe("shrub",{flower:[250,205,40],spiky:!0})],big:[ot("birch",{lean:.45,scale:.75})]},{id:"old-pinewood",name:"Old pinewood",creature:"marten",by:"draft",leaf:.35,floor:["needles",.07,.4,.3],text:{floor:"pine needles",small:"pine cones",big:"tall old pines with knotholes"},small:[Oe("cones")],big:[ot("fir",{scale:1.35})]},{id:"ravine",name:"Ravine",creature:"salamander",by:"draft",leaf:.3,floor:["stone",.3,.3,.32],text:{floor:"wet moss and rock",wall:"rock walls",small:"ferns",big:"mossy boulders",set:"a waterfall"},wall:[Oe("rockwall",{moss:!0})],small:[Oe("fern")],big:[Oe("boulder",{moss:!0,big:!0})],set:Oe("waterfall")},{id:"bluebell-glade",name:"Bluebell glade",creature:"glowworm",by:"draft",leaf:.26,floor:["bluebells",.27,.45,.4],text:{floor:"bluebells",small:"ferns",big:"beeches"},small:[Oe("fern")],big:[ot("broad",{gnarl:.2,scale:1.1})]},{id:"holly-thicket",name:"Holly thicket",creature:"spider",by:"draft",leaf:.36,floor:["leaves",.08,.35,.28],text:{floor:"dead leaves",wall:"holly hedges",small:"cobwebs",big:"hollies",set:"a web-hung dead tree"},wall:[Oe("hedge",{berries:!0})],small:[Oe("web")],big:[ot("broad",{scale:.7,dark:!0})],set:ot("broad",{bare:!0,webs:!0})},{id:"honeysuckle-tangle",name:"Honeysuckle tangle",creature:"dormouse",by:"draft",leaf:.25,floor:["clover",.27,.45,.45],text:{floor:"grass and clover",wall:"bramble",small:"honeysuckle",big:"hazel coppice"},wall:[Oe("bramble")],small:[Oe("shrub",{flower:[250,230,170]})],big:[ot("broad",{trunks:5,scale:.7,thin:!0})]}];for(const[i,[e,t]]of Object.entries(Sh)){const n=Jr.find(r=>r.id===i);n&&!n.set&&(n.set=Oe(e,{three:!0}),n.text={...n.text,set:t})}const Jd=Object.fromEntries(Jr.map(i=>[i.id,i])),Qd=["ruins","rocks","freak","lake","modern"],mt=(i,e,t,n,r,s,a,o,c,l,u={})=>({pattern:i,...u,density:e,clump:t,glades:{count:n[0],size:n[1]||[0,0]},heightMix:r&&{sapling:r[0],mature:r[1],tall:r[2],giant:r[3]},undergrowth:s,lean:{dir:a[0],amount:a[1]},terrain:o,decor:{rate:c[0],...Object.fromEntries(Qd.map((d,h)=>[d,c[1][h]]))},feel:l}),Ct=[0,0],jd={moor:mt("scatter",.2,.6,[2,[14,24]],null,.7,[30,.2],["pools","mounds","hollows"],[.5,[.3,.4,0,.3,0]],"Open rolling moss, low mounds and dark pools, long grass combed one way by the wind; you can see a long way."),"fern-forest":mt("groves",.65,.6,[2,[8,12]],[.2,.5,.25,.05],.9,Ct,["hollows","paths"],[.25,[.4,.3,.3,0,0]],"Pine groves standing waist-deep in ferns, with green sunken hollows between them."),"muddy-forest":mt("scatter",.7,.3,[1,[6,9]],[.25,.55,.17,.03],.4,Ct,["pools","paths"],[.3,[.3,.1,.2,.1,.3]],"Squelching mud between many-trunked trees, puddled ruts winding through, broken stumps everywhere."),"stone-shrine":mt("rings",.35,.8,[1,[10,14]],null,.3,Ct,["rocky","mounds"],[.5,[.6,.4,0,0,0]],"Big stones stand in rings round the shrine on stony grass; it feels deliberate and old."),"tangly-forest":mt("thicket",.9,.2,[1,[5,8]],[.35,.55,.1,0],.9,Ct,["hollows"],[.2,[.2,0,.6,0,.2]],"Short tangled trees packed close over nettles, low and claustrophobic, with one small clearing."),"wispy-forest":mt("stands",.55,.7,[2,[6,10]],[.15,.45,.3,.1],.5,Ct,["ridges"],[.3,[.4,.2,.3,0,.1]],"Stands of thick many-trunked trees, thin wispy saplings drifting between them over dry leaves."),"hazel-forest":mt("rings",.6,.6,[2,[6,9]],[.3,.55,.12,.03],.5,Ct,["mounds","paths"],[.3,[.4,.3,.3,0,0]],"Crooked hazels grown in loose fairy rings on short grass, lumpy little mounds in the middle of each."),garden:mt("rows",.45,0,[3,[6,10]],[.1,.7,.2,0],.6,Ct,["paths","pools"],[.4,[.7,0,0,.2,.1]],"A lost formal garden: willows in avenues along straight paths, lawns and flower beds, a pavilion at the heart.",{along:"paths"}),"twiggy-forest":mt("scatter",.75,.3,[1,[6,10]],[.25,.5,.2,.05],.6,[60,.5],["paths"],[.25,[.3,.2,.3,0,.2]],"Straight many-trunked trees all slanting the same way, like a wood frozen in a gale."),ancient:mt("lone",.4,.2,[1,[12,18]],[.05,.35,.4,.2],.4,[150,.25],["rocky","mounds","hollows"],[.45,[.5,.2,.3,0,0]],"Giant gnarled trees far apart, roots heaving over mossy rocks; every tree is a landmark."),norway:mt("stands",.8,.5,[1,[8,12]],[.15,.45,.35,.05],.2,Ct,["rocky","ridges"],[.3,[.2,.6,0,.2,0]],"Dense stands of straight pines on slate ridges, bare rock between; dark, vertical and cold."),"alder-forest":mt("scatter",.55,.4,[2,[6,10]],[.2,.4,.35,.05],.6,[120,.35],["stream","hollows"],[.3,[.3,.1,.2,.3,.1]],"Tall slanted alders at every height over long grass and stumps, a little stream wandering through."),meadow:mt("lone",.12,.1,[0],[.2,.5,.25,.05],.3,Ct,["mounds","paths"],[.35,[.3,.3,0,.2,.2]],"Wide-open wildflower grass with a lone oak here and there and scattered hawthorn; the sky does the work."),"old-oaks":mt("groves",.5,.5,[2,[10,16]],[.1,.35,.4,.15],.5,Ct,["mounds","hollows"],[.4,[.5,.1,.4,0,0]],"Groves of huge hollow oaks with broad clearings of leaf litter between; slow and grand."),"berry-thicket":mt("thicket",.85,.5,[2,[4,7]],[.2,.4,.35,.05],1,Ct,["paths"],[.15,[.3,0,.4,0,.3]],"Tall pines over solid berry bushes and brambles, only narrow animal paths and a couple of pockets of space."),wetland:mt("edgeOnly",.5,.5,[1,[16,24]],[.25,.55,.15,.05],.8,Ct,["pools","stream"],[.35,[.2,0,0,.6,.2]],"Open reedy water and mud in the middle, willows crowding the rim; wet and echoing."),stream:mt("rows",.5,.2,[1,[6,10]],[.3,.45,.2,.05],.5,Ct,["stream","pools"],[.3,[.3,.3,0,.3,.1]],"Alders lining both banks of a pebbly stream, saplings at the water's edge, open grass away from it.",{along:"stream"}),"rocky-slope":mt("scatter",.35,.6,[1,[8,12]],[.3,.5,.18,.02],.2,[90,.15],["rocky","ridges"],[.5,[.3,.7,0,0,0]],"Scree and boulders with pines clinging in clumps, everything leaning slightly uphill."),bog:mt("stands",.25,.85,[3,[10,20]],[.4,.5,.1,0],.6,Ct,["pools","mounds"],[.35,[.2,0,0,.5,.3]],"Sphagnum and bog pools, stunted spruce in tight dark stands, cotton grass pale between them."),deadwood:mt("scatter",.25,.2,[2,[8,14]],[.05,.3,.45,.2],.15,Ct,["ridges","hollows"],[.45,[.3,.1,.3,0,.3]],"Sparse tall blasted snags on bare ridges; bleak, quiet, with long sightlines."),"cave-mouth":mt("edgeOnly",.4,.5,[1,[10,14]],[.2,.5,.3,0],.2,Ct,["rocky","ridges"],[.4,[.3,.6,0,0,.1]],"Rock walls and dead trees ring an open stone floor that leads to the cave's dark mouth."),grassland:mt("lone",.1,.5,[0],[.3,.5,.2,0],.2,Ct,["mounds"],[.35,[.3,.2,0,.1,.4]],"Short turf to the horizon, molehills, birches alone or in twos and threes."),"beaver-pond":mt("edgeOnly",.55,.4,[1,[14,20]],[.4,.45,.15,0],.4,Ct,["pools","stream"],[.4,[.1,0,0,.7,.2]],"A pond in the middle, young birch and aspen round it, gnawed stumps where the big ones were felled."),"log-pile":mt("groves",.5,.7,[2,[6,10]],null,.7,Ct,["hollows","mounds"],[.3,[.3,0,.4,0,.3]],"Rotting logs heaped in piles, fungi everywhere, damp hollows between the heaps."),heath:mt("scatter",.2,.3,[1,[12,18]],[.5,.45,.05,0],.8,[30,.6],["ridges","paths"],[.4,[.4,.4,0,0,.2]],"Purple heather and gorse, small birches bent hard by the wind, all the same way."),"old-pinewood":mt("scatter",.5,.3,[2,[8,14]],[.1,.35,.4,.15],.15,Ct,["mounds","paths"],[.35,[.4,.3,.3,0,0]],"Cathedral-tall old pines on a clear floor of needles; you can see between the trunks a long way."),ravine:mt("edgeOnly",.55,.6,[1,[6,9]],null,.8,Ct,["stream","ridges","rocky"],[.4,[.3,.5,0,.2,0]],"A deep wet cleft: rock walls and mossy boulders either side, ferns, a stream down the middle."),"bluebell-glade":mt("groves",.45,.5,[3,[8,14]],[.1,.5,.35,.05],.3,Ct,["hollows"],[.35,[.4,0,.3,.3,0]],"Beech groves round open glades carpeted in bluebells; soft, bright and airy."),"holly-thicket":mt("thicket",.9,.3,[1,[6,9]],[.3,.6,.1,0],.7,Ct,["hollows"],[.25,[.3,0,.5,0,.2]],"Dark hollies packed close, cobwebs strung between, one clearing round the web-hung tree."),"honeysuckle-tangle":mt("stands",.6,.7,[2,[5,8]],[.45,.5,.05,0],.8,Ct,["paths","mounds"],[.3,[.3,0,.3,0,.4]],"Hazel coppice stools in clumps, honeysuckle and bramble between, clover paths winding through.")};for(const i of Jr)i.layout=jd[i.id];function ef(i,e,t=64,n=48){const[r,s,a,o]=i.floor,c=new cn(t,n),l=i.id.length*131;for(let v=0;v<n;v++)for(let x=0;x<t;x++){const m=(mi(x/7,v/5,l)*(t-x)*(n-v)+mi((x-t)/7,v/5,l)*x*(n-v)+mi(x/7,(v-n)/5,l)*(t-x)*v+mi((x-t)/7,(v-n)/5,l)*x*v)/(t*n),_=m<.38?f.BODY2:m>.64?f.BELLY:f.BODY;c.px(x,v,_,0,-.42,.91)}const u=la(l),d=(v,x,m)=>c.px((v%t+t)%t,(x%n+n)%n,m,0,-.42,.91),h={moss:0,needles:70,mud:25,stony:30,nettles:60,leaves:80,grass:70,lawn:30,plants:60,roots:30,slate:40,tallgrass:90,flowers:70,pebbles:60,scree:70,earth:15,stone:40,heather:90,bluebells:90,clover:60}[r]??40;for(let v=0;v<h;v++){const x=Math.floor(u()*t),m=Math.floor(u()*n);if(r==="needles"){const _=u()<.5?1:-1;for(let M=0;M<3;M++)d(x+M*_,m+(M>>1),u()<.5?f.BODY2:f.ACCENT)}else if(["grass","lawn","tallgrass","plants","nettles","clover","flowers","bluebells","heather"].includes(r)){const _=r==="tallgrass"?4:r==="lawn"?1:2;for(let M=0;M<_;M++)d(x,m-M,M===_-1?f.LEAF2:f.LEAF);(r==="flowers"||r==="bluebells"||r==="heather"||r==="clover")&&u()<.5&&d(x+1,m-_,f.FLOWER)}else if(["stony","pebbles","scree","slate","stone","roots"].includes(r)){if(d(x,m,f.ACCENT),u()<.6&&d(x+1,m,f.ACCENT),u()<.4&&d(x,m+1,f.BODY2),r==="roots"&&u()<.5)for(let _=0;_<5;_++)d(x+_,m+(_>2?1:0),f.TRUNK)}else if(r==="leaves")d(x,m,f.FLOWER),d(x+1,m,f.FLOWER),u()<.5&&d(x,m+1,f.ACCENT);else if(r==="mud"||r==="earth")for(let _=0;_<3;_++)d(x+_,m,f.BODY2)}const p={flowers:ge(.13,.6,.95),bluebells:[90,110,230],heather:[180,90,170],clover:[240,235,240],leaves:ge(s+.02,.65,.6)}[r]||ge(s,.3,.6),g={[f.BODY]:ge(s,a*e.sat,o),[f.BODY2]:ge(s+.02,a*e.sat*1.1,o*.78),[f.BELLY]:ge(s-.02,a*e.sat*.9,Math.min(1,o*1.15)),[f.ACCENT]:r==="needles"?ge(.07,.5,.5):ge(.1,.08,.62),[f.FLOWER]:p,[f.LEAF]:ge(i.leaf,.55*e.sat,.45),[f.LEAF2]:ge(i.leaf-.03,.5*e.sat,.62),[f.TRUNK]:ge(e.trunkHue,.4,.3)};return{sp:c,colours:g}}const Ci=i=>({[f.ACCENT]:ge(.1,.06,.6),[f.BODY2]:ge(.62,.08,.4),[f.BELLY]:ge(.1,.05,.78),[f.LEAF]:ge(.27,.5,.45),[f.LEAF2]:ge(.25,.45,.62),[f.NOSE]:[20,16,24]});function ur(i,e,t,n,r,s,a){const o=[];for(let c=0;c<8;c++){const l=c/8*Math.PI*2,u=1+(s()-.5)*.3;o.push([e[0]+Math.cos(l)*t*u,e[1]+Math.sin(l)*n*u*(Math.sin(l)>0?.5:1)])}i.shape(o,f.ACCENT,{group:5,line:!0,round:r.round}),i.mark([Et(e,[-t,n*.1]),Et(e,[t,n*.1]),Et(e,[t,n]),Et(e,[-t,n])],f.BODY2,[f.ACCENT]),i.mark([Et(e,[-t*.6,-n*.8]),Et(e,[t*.1,-n*1.1]),Et(e,[t*.3,-n*.5]),Et(e,[-t*.3,-n*.3])],f.BELLY,[f.ACCENT]),a&&i.mark(ca([Et(e,[-t*1.1,-n*.55]),Et(e,[0,-n*1.3]),Et(e,[t*1.1,-n*.5]),Et(e,[t*.6,-n*.2]),Et(e,[-t*.6,-n*.2])],0,3,3,n*.15,1),f.LEAF,[f.ACCENT,f.BELLY,f.BODY2])}function zs(i,e,t,n,r,s){const a={[f.LEAF]:ge(t.leaf,.6*n.sat,.55),[f.LEAF2]:ge(t.leaf-.05,.55*n.sat,.78),[f.LEAF3]:ge(t.leaf+.03,.66*n.sat,.36)},o={[f.TRUNK]:ge(n.trunkHue,.45*n.sat,.34),[f.BARKD]:ge(n.trunkHue+.03,.5*n.sat,.17),[f.BARKL]:ge(n.trunkHue-.01,.38*n.sat,.5),[f.BELLY]:ge(n.trunkHue+.02,.3,.7)},c={[f.MAGIC]:[60,110,150],[f.MAGIC2]:[150,200,220],[f.BODY2]:[35,70,100]};if(i==="tree"){const v={broad:Ah,fir:pl,willow:Th,birch:Rh,flat:Ch}[e.type],x={...n,leafHue:t.leaf+(e.dark?.05:0),gnarl:e.gnarl??n.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},m=v(r,x,n.treeSize*s*(e.scale||1)*ye(r,.9,1.1)),_=ml(r,x,v);return e.dark&&(_[f.LEAF]=_[f.LEAF3],_[f.LEAF3]=ge(t.leaf+.05,.7,.22)),_[f.NOSE]=[20,16,24],_[f.WEB]=[225,225,232],{sp:m.sp,colours:_}}if(i==="shrub"){const v=Zd(r,{...n,leafHue:t.leaf,bushSize:n.bushSize*s,flowers:1});for(let x=0;x<v.sp.m.length;x++)v.sp.m[x]&&Rt(x,1,3)<(e.spiky?.18:.1)&&v.sp.m[x]!==f.TRUNK&&(v.sp.m[x]=f.FLOWER);return v.colours[f.FLOWER]=e.flower,v}const l=Math.round(48*s*(e.w||1)),u=Math.round(32*s),d=new cn(l,u),h=l/2,p=u;let g={};if(i==="grass"||i==="reeds"||i==="fern"||i==="flowers"||i==="flowerbed"){const v=i==="flowerbed"?40:24,x=(i==="reeds"?e.tall?26:20:i==="fern"?14:10*(e.h||1))*s;i==="flowerbed"&&d.shape([[h-20*s,p-2],[h-18*s,p-6*s],[h+18*s,p-6*s],[h+20*s,p-2],[h+20*s,p],[h-20*s,p]],f.ACCENT,{group:2,line:!0});for(let m=0;m<v;m++){const _=h+ye(r,-16,16)*s,M=x*ye(r,.5,1),b=i==="fern"?ye(r,-6,6)*s:ye(r,-2,2)*s,w=p-1-(i==="flowerbed"?5*s:0);for(let E=0;E<M;E++){const P=E/M;d.px(_+b*P*P,w-E,P>.7?f.LEAF2:P<.3?f.LEAF3:f.LEAF,b*.05,-.3,.9),i==="fern"&&E%2&&d.px(_+b*P*P+(b>0?1:-1),w-E+1,f.LEAF2,0,-.3,.9)}if(i==="reeds"&&(e.cotton||r()<.5))for(let E=0;E<(e.cotton?2:3);E++)d.px(_+b,w-M-E,e.cotton?f.WEB:f.TRUNK,0,-.5,.85);(i==="flowers"||i==="flowerbed")&&r()<.7&&(d.px(_+b,w-M,f.FLOWER,0,-.5,.85),d.px(_+b+1,w-M,f.FLOWER,0,-.5,.85))}if(g={...a,[f.FLOWER]:i==="flowerbed"?fh(r,[[230,80,120],[250,210,60],[150,110,230]]):ge(e.hue??.95,.6,.85),[f.TRUNK]:ge(.07,.5,.35),[f.WEB]:[240,240,235],[f.ACCENT]:ge(.08,.1,.55)},i==="flowerbed"){for(let m=0;m<d.m.length;m++)d.m[m]===f.FLOWER&&Rt(m,2,7)<.5&&(d.m[m]=f.BELLY);g[f.BELLY]=[250,245,240]}}else if(i==="stones"){for(let v=0;v<(e.big?3:6);v++)ur(d,[h+ye(r,-14,14)*s,p-(e.big?5:2.5)*s],(e.big?6:3)*s*ye(r,.7,1.2),(e.big?5:2.5)*s,n,r);g=Ci()}else if(i==="boulder")ur(d,[h,p-(e.big?11:8)*s],(e.big?18:13)*s,(e.big?12:9)*s,n,r,e.moss),g={...Ci(),...a,[f.ACCENT]:ge(.1,.06,.6)};else if(i==="henge")d.shape([[h-7*s,p],[h-8*s,p-18*s],[h-4*s,p-28*s],[h+5*s,p-27*s],[h+8*s,p-14*s],[h+7*s,p]],f.ACCENT,{group:5,line:!0,round:n.round}),d.mark([[h-9*s,p-30*s],[h+9*s,p-30*s],[h+9*s,p-22*s],[h-9*s,p-18*s]],f.LEAF,[f.ACCENT]),g={...Ci(),...a};else if(i==="mound"){const v=(e.small?8:14)*s,x=(e.small?5:8)*s;d.shape(ca([[h-v,p],[h-v*.6,p-x*.8],[h,p-x],[h+v*.6,p-x*.8],[h+v,p]],0,4,e.moss?3:1,(e.moss?1.5:.8)*s,1),e.moss?f.LEAF:f.TRUNK,{group:5,round:n.round}),d.mark([[h-v,p-x*.45],[h+v,p-x*.45],[h+v,p],[h-v,p]],e.moss?f.LEAF3:f.BARKD,[e.moss?f.LEAF:f.TRUNK]),g={...a,...o,[f.TRUNK]:ge(.07,.45,e.brown?.35:.3)}}else if(i==="stump"){const v=6*s;if(d.limb([[h,p,v*2.2],[h,p-8*s,v*1.6]],f.TRUNK,{group:5,round:n.round,cap:0,capEnd:0}),d.shape([[h-v*.8,p-8*s],[h,p-10*s-(e.gnawed?4*s:0)],[h+v*.8,p-8*s],[h,p-7*s]],f.BELLY,{group:6,round:n.round}),e.snag&&d.limb([[h+v*.4,p-8*s,2.5*s],[h+v*1.6,p-15*s,1.5*s]],f.TRUNK,{group:7,round:n.round}),e.grass)for(let x=0;x<20;x++){const m=h+ye(r,-14,14)*s,_=ye(r,6,13)*s;for(let M=0;M<_;M++)d.px(m,p-1-M,M>_*.6?f.LEAF2:f.LEAF,0,-.3,.9)}g={...a,...o}}else if(i==="log"){const v=(e.giant?46:e.branch?18:30)*s,x=(e.giant?14:e.branch?3:8)*s;if(d.limb([[h-v/2,p-x/2,x],[h+v/2,p-x/2-(e.branch?2*s:0),x*.9]],f.TRUNK,{group:5,round:n.round,cap:.3,capEnd:.3}),e.branch||d.shape([[h+v/2-x*.1,p-x],[h+v/2+x*.2,p-x/2],[h+v/2-x*.1,p],[h+v/2-x*.3,p-x/2]],f.BELLY,{group:6,round:n.round}),e.rot)for(let m=0;m<(e.giant?6:3);m++){const _=h+ye(r,-v/2,v/3);d.shape([[_-3*s,p-x*.9],[_,p-x-3*s],[_+3*s,p-x*.9]],f.FLOWER,{group:7,line:!0,round:n.round})}e.branch&&d.limb([[h,p-x,x*.7],[h+5*s,p-x-6*s,x*.4]],f.TRUNK,{group:6,round:n.round}),g={...o,[f.FLOWER]:[230,190,120]}}else if(i==="fungi"){for(let v=0;v<5;v++){const x=h+ye(r,-12,12)*s,m=ye(r,3,7)*s,_=ye(r,3,5)*s;d.limb([[x,p,1.6*s],[x,p-m,1.4*s]],f.BELLY,{group:5}),d.shape([[x-_,p-m],[x,p-m-_*.8],[x+_,p-m]],v%2?f.FLOWER:f.MAGIC,{group:6+v%2,line:!0,round:n.round})}g={[f.BELLY]:[225,215,195],[f.FLOWER]:[190,80,50],[f.MAGIC]:[120,230,200]}}else if(i==="cones"){for(let v=0;v<6;v++){const x=h+ye(r,-14,14)*s,m=p-2*s;d.ellipse(x,m,(e.acorn?1.6:2)*s,(e.acorn?2:2.8)*s,f.TRUNK,{round:n.round}),e.acorn?d.ellipse(x,m-1.6*s,1.8*s,1*s,f.BARKD,{round:n.round}):d.px(x,m-1,f.BARKL)}g=o}else if(i==="water"){const v=22*s*(e.w||1),x=6*s;d.shape([[h-v,p-x],[h-v*.3,p-x*1.5],[h+v*.6,p-x*1.2],[h+v,p-x*.5],[h+v*.4,p],[h-v*.7,p-x*.2]],f.MAGIC,{group:5,round:.2});for(let m=0;m<6;m++){const _=h+ye(r,-v*.6,v*.6),M=p-x*ye(r,.4,1.1);for(let b=0;b<3*s;b++)d.recolour(_+b,M,f.MAGIC2)}g=e.bog?{[f.MAGIC]:[60,70,50],[f.MAGIC2]:[120,130,90]}:c;for(let m=0;m<d.m.length;m++)d.m[m]===f.MAGIC?d.m[m]=f.BODY:d.m[m]===f.MAGIC2&&(d.m[m]=f.BELLY);g={[f.BODY]:g[f.MAGIC],[f.BELLY]:g[f.MAGIC2]}}else if(i==="bramble"||i==="hedge"){const v=22*s,x=(i==="hedge"?18:12)*s;for(let m=0;m<(i==="hedge"?6:4);m++){const _=h+ye(r,-v*.8,v*.8),M=p-x*ye(r,.4,.7);d.ellipse(_,M,ye(r,6,9)*s,x*.45,i==="hedge"?f.LEAF3:f.LEAF,{round:n.round,density:e.bare?.5:.95,noise:.5,seed:m})}for(let m=0;m<8;m++){let M=h+ye(r,-v,v),b=p;for(let w=0;w<x*1.2;w++)M+=Math.sin(w*.3+m)*.8,b-=.8,d.px(M,b,f.TRUNK,0,-.3,.9)}if(i==="hedge"||e.berries||i==="bramble")for(let m=0;m<d.m.length;m++)d.m[m]&&d.m[m]!==f.TRUNK&&Rt(m,5,9)<.05&&(d.m[m]=f.FLOWER);g={...a,...o,[f.FLOWER]:i==="hedge"?[210,30,40]:[70,30,70]}}else if(i==="wall"){const v=22*s,x=12*s;d.shape([[h-v,p],[h-v,p-x],[h+v,p-x],[h+v,p]],f.ACCENT,{group:5,line:!0,depth:2}),d.shape([[h-v-1,p-x],[h-v-1,p-x-2*s],[h+v+1,p-x-2*s],[h+v+1,p-x]],f.BELLY,{group:6,line:!0,depth:2}),d.shape([[h+v-6*s,p-x-2*s],[h+v-6*s,p-x-7*s],[h+v,p-x-7*s],[h+v,p-x-2*s]],f.ACCENT,{group:7,line:!0,depth:2}),d.ellipse(h+v-3*s,p-x-9*s,3*s,2.5*s,f.BELLY,{round:n.round});for(let m=p-x+3*s;m<p;m+=4*s)for(let _=h-v;_<h+v;_++)d.recolour(_,m,f.BODY2);g=Ci()}else if(i==="rockwall"){for(let v=0;v<5;v++)ur(d,[h+(v-2)*9*s,p-ye(r,8,14)*s],8*s,10*s,n,r,e.moss);g={...Ci(),...a}}else if(i==="stalagmite"){for(let v=0;v<4;v++){const x=h+ye(r,-14,14)*s,m=ye(r,5,11)*s;d.shape([[x-3*s,p],[x-1*s,p-m],[x+1*s,p-m],[x+3*s,p]],f.ACCENT,{group:5,line:!0,round:n.round})}g=Ci()}else if(i==="web"){const v=[h,p-14*s],x=11*s;for(let m=0;m<8;m++){const _=m/8*Math.PI*2;for(let M=0;M<x;M++)d.px(v[0]+Math.cos(_)*M,v[1]+Math.sin(_)*M,f.WEB,0,0,1)}for(let m=3*s;m<x;m+=3*s)for(let _=0;_<Math.PI*2;_+=.05)d.px(v[0]+Math.cos(_)*m,v[1]+Math.sin(_)*m,f.WEB,0,0,1);g={[f.WEB]:[225,230,240]}}return{sp:d,colours:g}}function tf(i,e,t,n,r,s){if(e.three)return ad(i,t,n);if(i==="tree"||i==="log")return zs(i,e,t,n,r,s);const a=Math.round(90*s),o=Math.round(70*s),c=new cn(a,o),l=a/2,u=o;let d={...Ci(),[f.LEAF]:ge(t.leaf,.55,.5),[f.LEAF2]:ge(t.leaf-.04,.5,.7),[f.TRUNK]:ge(n.trunkHue,.45,.34),[f.BARKD]:ge(n.trunkHue+.03,.5,.17),[f.MAGIC]:ge(n.magicHue,.6,1),[f.MAGIC2]:ge(n.magicHue,.2,1)};if(i==="shrine")c.shape([[l-16*s,u],[l-14*s,u-6*s],[l+14*s,u-6*s],[l+16*s,u]],f.ACCENT,{group:5,line:!0,depth:2}),c.shape([[l-9*s,u-6*s],[l-9*s,u-26*s],[l+9*s,u-26*s],[l+9*s,u-6*s]],f.ACCENT,{group:6,line:!0,depth:2}),c.shape([[l-5*s,u-10*s],[l-5*s,u-20*s],[l,u-23*s],[l+5*s,u-20*s],[l+5*s,u-10*s]],f.NOSE,{group:7}),c.shape([[l-13*s,u-26*s],[l,u-34*s],[l+13*s,u-26*s]],f.BODY2,{group:8,line:!0,depth:2}),c.ellipse(l,u-13*s,2.5*s,2.5*s,f.MAGIC2,{round:.5}),c.mark([[l-14*s,u-36*s],[l+2*s,u-36*s],[l-4*s,u-24*s],[l-14*s,u-24*s]],f.LEAF,[f.BODY2,f.ACCENT]);else if(i==="pavilion"){c.shape([[l-26*s,u],[l-26*s,u-4*s],[l+26*s,u-4*s],[l+26*s,u]],f.ACCENT,{group:5,line:!0,depth:2});for(const h of[-20,-7,7,20])c.limb([[l+h*s,u-4*s,4*s],[l+h*s,u-34*s,4*s]],h===-7||h===7?f.BODY2:f.BELLY,{group:6+(h>0?1:0),line:!0,cap:0,capEnd:0});c.shape([[l-28*s,u-34*s],[l-28*s,u-38*s],[l+28*s,u-38*s],[l+28*s,u-34*s]],f.ACCENT,{group:8,line:!0,depth:2}),c.shape([[l-24*s,u-38*s],[l-16*s,u-54*s],[l,u-60*s],[l+16*s,u-54*s],[l+24*s,u-38*s]],f.BELLY,{group:9,line:!0})}else if(i==="bridge"){const h=zs("water",{w:1.8},t,n,r,s);for(let p=0;p<h.sp.m.length;p++){const g=p%h.sp.w,v=p/h.sp.w|0,x=Math.round(l-h.sp.w/2+g),m=u-h.sp.h+v;h.sp.m[p]&&c.inb(x,m)&&c.px(x,m,h.sp.m[p]===f.BODY?f.IRIS:f.PUPIL,0,-.42,.91)}c.limb([[l-34*s,u-6*s,9*s],[l+34*s,u-10*s,8*s]],f.TRUNK,{group:6,line:!0,cap:.3,capEnd:.3}),d[f.IRIS]=[60,110,150],d[f.PUPIL]=[150,200,220]}else if(i==="outcrop")for(const[h,p,g,v]of[[-18,14,16,13],[12,12,18,12],[-2,28,15,13],[16,34,9,9]])ur(c,[l+h*s,u-p*s],g*s,v*s,n,r,!0);else if(i==="cave"){for(const[h,p,g,v]of[[-26,16,16,15],[26,16,16,15],[0,40,30,18],[-12,30,14,12],[12,30,14,12]])ur(c,[l+h*s,u-p*s],g*s,v*s,n,r,p>30);c.shape([[l-15*s,u],[l-14*s,u-18*s],[l-4*s,u-28*s],[l+6*s,u-27*s],[l+14*s,u-16*s],[l+15*s,u]],f.NOSE,{group:9,line:!0})}else if(i==="dam"){const h=zs("water",{w:1.9},t,n,r,s);for(let p=0;p<h.sp.m.length;p++){const g=p%h.sp.w,v=p/h.sp.w|0,x=Math.round(l-h.sp.w/2+g),m=u-h.sp.h+v-10*s;h.sp.m[p]&&c.inb(x,m)&&c.px(x,m,h.sp.m[p]===f.BODY?f.IRIS:f.PUPIL,0,-.42,.91)}for(let p=0;p<26;p++){const g=l+ye(r,-32,32)*s,v=u-ye(r,2,14)*s,x=ye(r,-.5,.5),m=ye(r,8,16)*s;c.limb([[g-Math.cos(x)*m/2,v-Math.sin(x)*m/2,2.6*s],[g+Math.cos(x)*m/2,v+Math.sin(x)*m/2,2*s]],p%3?f.TRUNK:f.BARKD,{group:6+p%2,line:!0})}d[f.IRIS]=[60,110,150],d[f.PUPIL]=[150,200,220]}else if(i==="waterfall"){for(const[h,p,g,v]of[[-22,30,18,30],[22,30,18,30],[0,56,20,12]])ur(c,[l+h*s,u-p*s],g*s,v*s,n,r,!0);for(let h=l-6*s;h<l+6*s;h++)for(let p=u-50*s;p<u-4*s;p++)c.px(h,p,Rt(h|0,p/3|0,4)<.3?f.PUPIL:f.IRIS,0,-.2,.98);c.shape([[l-18*s,u],[l-14*s,u-6*s],[l+14*s,u-6*s],[l+18*s,u]],f.IRIS,{group:10,round:.2}),d[f.IRIS]=[90,150,190],d[f.PUPIL]=[210,235,245]}return{sp:c,colours:d}}function nf(i,e,{K:t=2/(e.pixel||2),makeCanvas:n=al}={}){const r=Jd[i];if(!r)throw new Error(`no area type "${i}"`);const s=la(i.split("").reduce((u,d)=>u*31+d.charCodeAt(0),7)>>>0),a=(u,d,h)=>({sp:gi(u.sp,u.colours,e,"none",n),kind:d,text:h}),o=ef(r,e),c=u=>(u||[]).map(([d,h])=>a(zs(d,h,r,e,s,t),d,"")),l={def:r,floor:{sp:gi(o.sp,o.colours,e,"none",n),kind:r.floor[0],text:r.text.floor},walls:c(r.wall),small:c(r.small),big:c(r.big),setPiece:null};if(l.walls.forEach(u=>u.text=r.text.wall),l.small.forEach(u=>u.text=r.text.small),l.big.forEach(u=>u.text=r.text.big),r.set){const u=tf(r.set[0],r.set[1],r,e,s,t);l.setPiece={...a(u,r.set[0],r.text.set),metres:u.metres}}return l}const rf={[f.ACCENT]:[150,145,140],[f.BODY2]:[95,92,100],[f.TRUNK]:[110,70,40],[f.BARKD]:[60,38,24],[f.MAGIC]:[255,130,40],[f.MAGIC2]:[255,228,120],[f.NOSE]:[30,24,26]};function sf(i){const e=new We({blend:.02});for(let r=0;r<9;r++){const s=r/9*Math.PI*2;e.ell([Math.cos(s)*.32,.05,Math.sin(s)*.32],[.09,.06,.08],r%3?f.ACCENT:f.BODY2,{dir:[-Math.sin(s),0,Math.cos(s)],group:1+r})}e.seg([-.22,.06,-.12],[.22,.1,.12],.05,.045,f.TRUNK,{group:20,paint:r=>r[0]>.12?f.BARKD:void 0}),e.seg([-.2,.1,.14],[.2,.06,-.14],.05,.045,f.TRUNK,{group:21,paint:r=>r[0]<-.12?f.BARKD:void 0});const t=[[.42,.3,.34],[.36,.4,.28],[.46,.32,.38]][i%3];[[-.05,0,t[0]],[.08,.06,t[1]],[-.02,-.08,t[2]]].forEach(([r,s,a],o)=>e.flat([r,.1+a*.5,s],[1,0,.3],[((i+o)%3-1)*.1,1,0],a*.38,a*.5,Ui.flame(f.MAGIC,f.MAGIC2),{group:30+o,bend:.1}));const n=gn(e,{height:34}).sp;for(let r=0;r<4;r++){const s=Math.floor(n.w/2+Math.sin(r*2.3+i)*n.w*.25),a=Math.floor(n.h*(.12+r*.08));n.get(s,a)||n.px(s,a,f.MAGIC2)}return n}const ks={cyan:[[70,230,255],[200,250,255]],violet:[[190,100,255],[235,210,255]],green:[[90,255,140],[215,255,220]]};function af(i,e){const t=new We({blend:.04}),n=Object.keys(ks).indexOf(i),r=.08,s=.4,a=[Math.cos(s),0,-Math.sin(s)],o=C.norm([Math.sin(s),.22,Math.cos(s)]),c=C.norm(C.cross(o,a)),l=[0,.46,0],u=[[[.2-n*.05,.92],[.14,.8],[.19,.7],[.12,.58]],[[-.22+n*.03,.05],[-.17,.16],[-.21,.25]]],d=(x,m)=>u.some(_=>_.some((M,b)=>{const w=_[b+1];if(!w)return!1;const E=w[0]-M[0],P=w[1]-M[1],S=Math.max(0,Math.min(1,((x-M[0])*E+(m-M[1])*P)/(E*E+P*P)));return Math.hypot(x-M[0]-E*S,m-M[1]-P*S)<.014})),h=x=>{const m=C.sub(x,l),_=[C.dot(m,a),C.dot(m,c)+.46,C.dot(m,o)];if(_[2]>r-.02){const M=(_[0]+.17)/.34,b=(.8-_[1])/.5;if(M>=0&&M<=1&&b>=0&&b<=1&&ph(M,b,n+1,.1))return f.RUNE}if(d(_[0],_[1]))return f.STONED;if(_[1]>.86&&Rt(Math.floor(_[0]*30),Math.floor(_[2]*30),3)<.3||_[1]<.12&&Rt(Math.floor(_[0]*35),Math.floor(_[1]*35)+Math.floor(_[2]*35)*7,5)<.55)return f.MOSS};t.box(l,[.28,.46,r],f.STONE,{group:1,axes:[a,c,o],round:.06,paint:h}),t.box(C.add(C.add(l,C.mul(c,.53)),C.mul(a,.2)),[.3,.12,.2],f.STONE,{group:1,dir:C.add(a,C.mul(c,.35)),up:c,cut:!0,paint:h});for(const[x,m,_]of[[-.24,.14,.08],[.2,.02,.07],[0,.12,.07]])t.ell([x,.015,m],[_,_*.4,_],f.MOSS,{group:2});for(let x=0;x<9;x++){const m=-.3+x*.07,_=.12+x%3*.025-x*.02,M=.07+x*37%5/60;t.seg([m,0,_],[m+(x%3-1)*.02,M,_+.01],.012,.004,x%3?f.LEAF:f.LEAF2,{group:10+x})}const p={[f.STONE]:[132,134,142],[f.STONED]:[70,70,80],[f.MOSS]:[86,120,62],[f.LEAF]:[80,125,60],[f.LEAF2]:[130,160,80],[f.RUNE]:ks[i][0],[f.MAGIC2]:ks[i][1],[f.LINE]:[40,40,50]},g=gn(t,{height:44}).sp;let v=0;for(let x=0;x<600&&v<5;x++){const m=Math.floor(Rt(x,n,9)*g.w),_=Math.floor(Rt(x,n,10)*g.h*.8);g.get(m,_)||g.get(m+1,_)||g.get(m-1,_)||g.get(m,_+1)||g.get(m,_-1)||(g.px(m,_,v%2?f.RUNE:f.MAGIC2),v++)}return{sp:g,colours:p}}function of(){const i=new We({blend:.03});i.ell([0,0,0],[.62,.025,.38],f.WATER,{group:1,paint:t=>Math.hypot(t[0]/.62,t[2]/.38)>.88?f.BODY2:void 0});for(let t=0;t<16;t++){const n=Math.PI*(.85+t/15*.9),r=Math.cos(n)*.6,s=Math.sin(n)*.36,a=.18+t*37%10/40;i.seg([r,0,s],[r+(t%3-1)*.02,a,s],.012,.006,t%4?f.LEAF:f.LEAF2,{group:10+t})}for(const[t,n,r]of[[.5,.2,.07],[.45,-.25,.05],[-.2,.35,.06]])i.ell([t,.02,n],[r,r*.5,r],f.ACCENT,{group:30});return{sp:gn(i,{height:22}).sp,colours:{[f.WATER]:[40,70,95],[f.BODY2]:[70,60,45],[f.LEAF]:[80,125,60],[f.LEAF2]:[130,160,80],[f.ACCENT]:[130,128,125]}}}function lf(i,{makeCanvas:e=al}={}){const t=(l,u)=>gi(l,u,i,"none",e),n={campfire:[0,1,2].map(l=>t(sf(l),rf)),stones:{},pond:null};for(const l of Object.keys(ks)){const u=af(l);n.stones[l]=t(u.sp,u.colours)}const r=of(),s=t(r.sp,r.colours),a=e(r.sp.w,r.sp.h),o=a.getContext("2d"),c=o.createImageData(r.sp.w,r.sp.h);for(let l=0;l<r.sp.m.length;l++)r.sp.m[l]===f.WATER&&c.data.set([255,255,255,255],l*4);return o.putImageData(c,0,0),s.mask=a,n.pond=s,n}function cf(i,e){const t=new Map,n=new Map,r=(c,l,u)=>(c*2097152+(l+1048576))*2097152+(u+1048576),s=(c,l,u)=>{const d=r(c,l,u);let h=t.get(d);if(!h){const p=Math.pow(2,-c);h=[p*(l+Ye(l*7+c,u,i)),p*(u+Ye(l,u*13+c,i+1))],t.set(d,h)}return h},a=(c,l,u)=>{const d=Math.pow(2,-c),h=Math.floor(l/d),p=Math.floor(u/d);let g=h,v=p,x=1/0;for(let m=-2;m<=2;m++)for(let _=-2;_<=2;_++){const M=s(c,h+m,p+_),b=(M[0]-l)**2+(M[1]-u)**2;b<x&&(x=b,g=h+m,v=p+_)}return[g,v]},o=(c,l,u)=>{const d=r(c,l,u);let h=n.get(d);if(h)return h;if(c===0)h=[l,u];else{const p=s(c,l,u),g=a(c-1,p[0],p[1]);h=o(c-1,g[0],g[1])}return n.set(d,h),h};return{seed:i,depth:e,site:(c,l)=>s(0,c,l),partition(c,l){const u=a(e,c,l);return o(e,u[0],u[1])},centreness(c,l,u){const d=s(0,u[0],u[1]),h=Math.hypot(c-d[0],l-d[1]);let p=1/0;const g=Math.floor(c),v=Math.floor(l);for(let x=-2;x<=2;x++)for(let m=-2;m<=2;m++){const _=g+x,M=v+m;if(_===u[0]&&M===u[1])continue;const b=s(0,_,M);p=Math.min(p,Math.hypot(c-b[0],l-b[1]))}return Math.min(1,2*h/(h+p))},openness(c,l){let u=1/0,d=1/0;const h=Math.floor(c),p=Math.floor(l);for(let g=-2;g<=2;g++)for(let v=-2;v<=2;v++){const x=s(0,h+g,p+v),m=Math.hypot(c-x[0],l-x[1]);m<u?(d=u,u=m):m<d&&(d=m)}return Math.min(1,2*u/(u+d))}}}const hf=Gu.types,vn=Jr.map(i=>({id:i.id,name:i.name,creature:i.creature,text:i.text,setPiece:i.set?i.text.set??"a set piece":"",hasWalls:!!i.wall?.length,floor:[i.floor[1],i.floor[2],i.floor[3]],treeDensity:hf[i.id]?.treeDensity??1})),lr=(i,e)=>i+","+e;function uf(i){if(i==null||i.trim()==="")return null;const e=i.trim();if(/^\d{1,9}$/.test(e))return Number(e);let t=2166136261;for(let n=0;n<e.length;n++)t=Math.imul(t^e.charCodeAt(n),16777619);return(t>>>0)%1e9}function df(i,e,t,n){const r=new Map,s=(c,l)=>{if(c[0]===l[0]&&c[1]===l[1])return;const u=lr(c[0],c[1]),d=lr(l[0],l[1]);r.has(u)||r.set(u,new Set),r.has(d)||r.set(d,new Set),r.get(u).add(d),r.get(d).add(u)},a=(t-e)*n;let o=[];for(let c=0;c<=a;c++){const l=[];for(let u=0;u<=a;u++){const d=i.partition(e+u/n,e+c/n);l.push(d),u>0&&s(d,l[u-1]),c>0&&s(d,o[u])}o=l}return r}function ff(i,e){const t=e.mapAreas,n=2,r=e.areaSize*e.areaScale,s=vn.length,a=3,o=Math.max(0,Math.min(1,e.areaSizeVariance))*a*.3,c=(U,D)=>{const F=U/r,z=D/r;return[F+o*(Fs(F/a,z/a,i+91)-.5)*2,z+o*(Fs(F/a,z/a,i+92)-.5)*2]},l=(U,D)=>{let F=U*r,z=D*r;for(let Y=0;Y<30;Y++){const[j,X]=c(F,z);F+=(U-j)*r,z+=(D-X)*r}return[F,z]},u=cf(i,e.borderLayers),d=-n,h=t+n,p=df(u,d,h,6),g=new Map,v=vi(i*5+1);for(let U=d;U<h;U++)for(let D=d;D<h;D++){const F=new Set;for(let j=-2;j<=2;j++)for(let X=-2;X<=2;X++){const te=g.get(lr(D+X,U+j));te!==void 0&&F.add(te)}for(const j of p.get(lr(D,U))??[]){const X=g.get(j);X!==void 0&&F.add(X)}const z=[...Array(s).keys()].filter(j=>!F.has(j)),Y=z.length?z:[...Array(s).keys()];g.set(lr(D,U),Y[Math.floor(v()*Y.length)])}const x=(U,D)=>g.get(lr(U,D))??Math.floor(Ye(U,D,i+17)*s),m=Math.floor(t/2),_=(U,D)=>{const F=u.site(U,D),z=u.partition(F[0],F[1]);return z[0]===U&&z[1]===D};let M=[m,m];for(const[U,D]of[[0,0],[1,0],[0,1],[-1,0],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]])if(_(m+U,m+D)){M=[m+U,m+D];break}const b=(U,D)=>{const F=u.site(U,D),z=l(F[0],F[1]);return{x:z[0],z:z[1]}},w=b(M[0],M[1]),E=(U,D)=>{const[F,z]=c(U,D),Y=u.partition(F,z);return{cell:Y,type:x(Y[0],Y[1]),openness:u.openness(F,z)}},P=e.dancefloor.radius,S=P+e.dancefloor.clearing,A=(U,D)=>{if(Math.hypot(U-w.x,D-w.z)<S)return 0;const[F,z]=c(U,D),Y=1-ln((Fs(U/e.gladeScale,D/e.gladeScale,i+61)-(1-e.gladeAmount))/.03);return ln((u.openness(F,z)-e.clearingSize)/Math.max(.01,e.clearingFalloff))*e.treeDensity*Y},L=(U,D)=>{const F=vn[x(U,D)];return F.setPiece&&Ye(U,D,i+61)<e.setPieceChance?F.setPiece:null},R=(U,D)=>Math.min(1,Math.hypot(U-M[0],D-M[1])/(t/2)),N=r*.5;return{seed:i,tuning:e,n:t,margin:n,areaSize:r,partition:u,centreCell:M,dancefloor:{x:w.x,z:w.z,radius:P},start:{x:w.x,z:w.z+2},bounds:{minX:N,maxX:t*r-N,minZ:N,maxZ:t*r-N},extent:{minX:d*r,maxX:h*r,minZ:d*r,maxZ:h*r},typeOf:x,areaAt:E,siteOf:b,treeWeight:A,neighbours:p,setPieceOf:L,remoteness:R}}function gl(i,e,t,n,r){return Math.hypot(i,e)<n||e>=0?!1:Math.atan2(Math.abs(i),-e)*180/Math.PI<(t?r.facing.awayLeave:r.facing.awayEnter)}function pf(i,e){return{x:i,z:e,vx:0,vz:0,lift:0,mode:"ground",facing:1,away:!1,lean:!1}}const vr=(i,e)=>Ln(e.groundHeight,e.treetopHeight,ln(i.lift)),tc=i=>ln(i.lift);function mf(i,e,t,n,r){let{mode:s,lift:a}=i;e.toggleMode&&(s=s==="ground"||s==="descending"?"rising":"descending"),s==="rising"?(a+=t/Math.max(.001,n.riseTime),a>=1&&(a=1,s="treetop")):s==="descending"&&(a-=t/Math.max(.001,n.descendTime),a<=0&&(a=0,s="ground"));let o=e.moveX,c=e.moveZ;const l=Math.hypot(o,c);l>1&&(o/=l,c/=l);const u=Ln(n.groundSpeed,n.treetopSpeed,ln(a)),d=1-Math.exp(-Ln(n.groundAcceleration,n.acceleration,ln(a))*t);let h=i.vx+(o*u-i.vx)*d,p=i.vz+(c*u-i.vz)*d,g=i.x+h*t,v=i.z+p*t;(g<r.minX||g>r.maxX)&&(g=_i(g,r.minX,r.maxX),h=0),(v<r.minZ||v>r.maxZ)&&(v=_i(v,r.minZ,r.maxZ),p=0);const x=h>.3?1:h<-.3?-1:i.facing,m=Math.hypot(h,p),_=gl(h,p,i.away,Math.max(1,u*.15),n);return{x:g,z:v,vx:h,vz:p,lift:a,mode:s,facing:x,away:_,lean:m>u*n.leanAt}}const ma=3;function gf(i,e,t=.5,n=1){const r=i.tuning,s=_i(e,0,1),a=Math.max(0,Math.round(Ln(r.creaturesNear,r.creaturesFar,Math.pow(s,r.creatureCurve))+(t-.5)*2)),o=a>0&&n<xf(i,s)?1:0,c=Math.max(0,a-o),l=Math.round(c*r.adultShareFar*ln((s-r.adultsFrom)/Math.max(.01,1-r.adultsFrom))),u=Math.round((c-l)*r.youngShareFar*s);return{babies:Math.max(0,c-l-u),young:u,adults:l,legends:o}}const xf=(i,e)=>i.tuning.legendChanceFar*ln((e-i.tuning.legendsFrom)/Math.max(.01,1-i.tuning.legendsFrom)),Lh=i=>i.areaSize*.75,$s=(i,e,t,n)=>{const r=i.areaAt(e,t).cell;return r[0]===n[0]&&r[1]===n[1]};function Ph(i,e,t,n,r){if($s(i,t,n,e))return[t,n];for(let s=2;s<r*1.5;s+=2)for(let a=0;a<16;a++){const o=a/16*Math.PI*2,c=t+Math.cos(o)*s,l=n+Math.sin(o)*s;if($s(i,c,l,e))return[c,l]}return[t,n]}function Zs(i,e,t){for(let n=0;n<12;n++){const r=t()*Math.PI*2,s=Math.sqrt(t())*e.range,a=e.homeX+Math.cos(r)*s,o=e.homeZ+Math.sin(r)*s;if($s(i,a,o,e.cell))return[a,o]}return[e.anchorX,e.anchorZ]}function vf(i){const e=[],t=i.tuning;let n=0;const[r,s]=i.centreCell;for(let a=0;a<i.n;a++)for(let o=0;o<i.n;o++){if(o===r&&a===s)continue;const c=vi(i.seed*7919+o*131+a*977+3),l=vn[i.typeOf(o,a)],u=i.siteOf(o,a),d=i.remoteness(o,a),h=gf(i,d,Ye(o,a,i.seed+43),Ye(o,a,i.seed+47)),p=v=>{const x=[o,a],m=Lh(i),[_,M]=Ph(i,x,u.x,u.z,m),b={cell:x,homeX:u.x,homeZ:u.z,range:m,anchorX:_,anchorZ:M},[w,E]=Zs(i,b,c);return{id:n++,species:l.creature,level:v,...b,x:w,z:E,tx:w,tz:E,rest:c()*3,speed:(v===ma?t.legendSpeed:t.creatureSpeed)*(.7+c()*.6),facing:c()<.5?1:-1,away:!1,moving:!1,walk:c(),seen:0,leashed:!1,rand:vi(i.seed*31+n*7+11)}};for(let v=0;v<h.babies;v++)e.push(p(0));for(let v=0;v<h.young;v++)e.push(p(1));for(let v=0;v<h.adults;v++)e.push(p(2));const g=t.legendNextToHome&&o===r+1&&a===s;(h.legends||g)&&e.push(p(3))}return e}function _f(i,e,t){if(i.rest>0){i.rest-=e,i.moving=!1,i.away=!1;return}const n=i.tx-i.x,r=i.tz-i.z,s=Math.hypot(n,r);if(s<.05){[i.tx,i.tz]=Zs(t,i,i.rand),i.rest=.8+i.rand()*3.5,i.moving=!1;return}const a=Math.min(s,i.speed*e),o=i.x+n/s*a,c=i.z+r/s*a;if(!$s(t,o,c,i.cell)){i.tx=i.x,i.tz=i.z,i.moving=!1;return}i.x=o,i.z=c,Math.abs(n)>.02&&(i.facing=n>0?1:-1),i.away=gl(n,r,i.away,0,t.tuning),i.moving=!0,i.walk+=e*(i.level===ma?1.5:4)}function Mf(i,e,t,n,r,s,a){for(const o of i)if(!o.leashed&&!(Math.abs(o.homeX-e)>n||Math.abs(o.homeZ-t)>n)){if(s-o.seen>3){const c=vi(o.id*7919+Math.floor(s/20)*131+5);[o.x,o.z]=Zs(a,o,c),[o.tx,o.tz]=Zs(a,o,c),o.rest=c()*2}o.seen=s,_f(o,r,a)}}const Dh=6,Sf=4,kt=32;function bf(i){const e=i.tuning.camera.treetop.angleIn*Math.PI/180;return i.tuning.crownHeight/Math.sin(e)}function yf(i,e,t){const{treeSpacingX:n,treeSpacingZ:r}=i.tuning,s=i.seed,a=[],o=bf(i),c=i.tuning.crownHalfWidth,l=Math.ceil(t*kt/r),u=Math.ceil((t+1)*kt/r);for(let d=l;d<u;d++){const h=d&1?.5:0,p=Math.ceil(e*kt/n-h),g=Math.ceil((e+1)*kt/n-h);for(let v=p;v<g;v++){const x=(v+h+(Ye(v,d,s+101)-.5)*.7)*n,m=(d+(Ye(v,d,s+102)-.5)*.7)*r,_=i.areaAt(x,m);Ye(v,d,s+103)>=i.treeWeight(x,m)*vn[_.type].treeDensity||i.treeWeight(x,m-o)===0||i.treeWeight(x-c,m-o)===0||i.treeWeight(x+c,m-o)===0||a.push({x,z:m,type:_.type,variant:Math.floor(Ye(v,d,s+104)*Dh),flip:Ye(v,d,s+105)<.5})}}return a}function wf(i,e,t){const n=i.tuning.bushSpacing,r=i.seed,s=[],a=Math.ceil(t*kt/n),o=Math.ceil((t+1)*kt/n),c=Math.ceil(e*kt/n),l=Math.ceil((e+1)*kt/n);for(let u=a;u<o;u++)for(let d=c;d<l;d++){const h=(d+Ye(d,u,r+201)-.5)*n,p=(u+Ye(d,u,r+202)-.5)*n,g=1+i.tuning.bushClump*(2*ln((Fs(h/13,p/13,r+207)-.35)/.3)-1);Ye(d,u,r+203)>(.12+Math.min(1,i.treeWeight(h,p))*.3)*i.tuning.bushDensity*g||Math.hypot(h-i.dancefloor.x,p-i.dancefloor.z)<i.dancefloor.radius+2||s.push({x:h,z:p,type:i.areaAt(h,p).type,variant:Math.floor(Ye(d,u,r+204)*Sf),flip:Ye(d,u,r+205)<.5})}return s}function Ef(i,e,t){const n=i.tuning.wallSpacing,r=i.seed,s=[],a=Math.ceil(t*kt/n),o=Math.ceil((t+1)*kt/n),c=Math.ceil(e*kt/n),l=Math.ceil((e+1)*kt/n);for(let u=a;u<o;u++)for(let d=c;d<l;d++){if(Ye(d,u,r+303)>i.tuning.wallDensity)continue;const h=(d+(Ye(d,u,r+301)-.5)*.6)*n,p=(u+(Ye(d,u,r+302)-.5)*.6)*n,g=i.areaAt(h,p);g.openness<.82||!vn[g.type].hasWalls||Math.hypot(h-i.dancefloor.x,p-i.dancefloor.z)<i.dancefloor.radius+4||s.push({x:h,z:p,type:g.type,variant:Math.floor(Ye(d,u,r+304)*4),flip:Ye(d,u,r+305)<.5})}return s}const Af=new Set(["wetland","stream","bog","beaver-pond","moor"]);function Tf(i,e,t){const n=i.tuning.lightSources,r=n.spacing,s=i.seed,a=[],o=Math.ceil(t*kt/r),c=Math.ceil((t+1)*kt/r),l=Math.ceil(e*kt/r),u=Math.ceil((e+1)*kt/r);for(let d=o;d<c;d++)for(let h=l;h<u;h++){const p=(h+(Ye(h,d,s+401)-.5)*.7)*r,g=(d+(Ye(h,d,s+402)-.5)*.7)*r;if(Math.hypot(p-i.dancefloor.x,g-i.dancefloor.z)<i.dancefloor.radius+i.tuning.dancefloor.clearing+4)continue;const v=i.areaAt(p,g),x=v.openness<.35||v.openness>.8?1:.25,m=Ye(h,d,s+403),M=(Af.has(vn[v.type].id)?n.wetPond:n.pond)*x,b=n.campfire*x,w=n.magicStone*x,E=m<M?"pond":m<M+b?"campfire":m<M+b+w?"stone":null;E&&a.push({x:p,z:g,kind:E,size:.75+Ye(h,d,s+404)*.5})}return a}class Rf{constructor(e){this.map=e}map;trees=new Map;bushes=new Map;walls=new Map;lights=new Map;chunks(e,t,n){const r=[];for(let s=Math.floor((t-n)/kt);s<=Math.floor((t+n)/kt);s++)for(let a=Math.floor((e-n)/kt);a<=Math.floor((e+n)/kt);a++)r.push([a,s]);return r}gather(e,t,n,r,s){e.size>600&&e.clear();const a=[];for(const[o,c]of this.chunks(n,r,s)){const l=o+","+c;let u=e.get(l);u||(u=t(o,c),e.set(l,u));for(const d of u)Math.abs(d.x-n)<=s&&Math.abs(d.z-r)<=s&&a.push(d)}return a}treesNear(e,t,n){return this.gather(this.trees,(r,s)=>yf(this.map,r,s),e,t,n)}bushesNear(e,t,n){return this.gather(this.bushes,(r,s)=>wf(this.map,r,s),e,t,n)}lightsNear(e,t,n){return this.gather(this.lights,(r,s)=>Tf(this.map,r,s),e,t,n)}wallsNear(e,t,n){return this.gather(this.walls,(r,s)=>Ef(this.map,r,s),e,t,n)}setPiecesNear(e,t,n){const r=this.map,s=r.areaSize,a=[];for(let o=Math.floor((t-n)/s)-1;o<=Math.floor((t+n)/s)+1;o++)for(let c=Math.floor((e-n)/s)-1;c<=Math.floor((e+n)/s)+1;c++){if(c===r.centreCell[0]&&o===r.centreCell[1]||!r.setPieceOf(c,o))continue;const l=r.siteOf(c,o);Math.abs(l.x-e)<=n&&Math.abs(l.z-4-t)<=n&&a.push({x:l.x,z:l.z-4,type:r.typeOf(c,o),variant:0,flip:Ye(c,o,r.seed+71)<.5})}return a}}const Cf=()=>({stack:[],placed:[],talk:null,events:[],held:!1,heldInAir:!1}),Lf=(i,e)=>e.invite.talkTime[Math.min(i.level,e.invite.talkTime.length-1)],Pf=(i,e)=>e.invite.turn[Math.min(i.level,e.invite.turn.length-1)],mo=i=>!i.leashed&&i.level!==ma;function Df(i,e,t,n){if(i.stack.includes(e))return{x:t,z:n};const r=i.placed.find(s=>s.id===e);return r?{x:r.x,z:r.z}:null}function If(i,e,t,n){return Xr(i,e,t,n.invite.talkRange)??Xr(i,e,t,n.invite.talkRange,!0)}function Xr(i,e,t,n,r=!1){let s=null,a=n;for(const o of i){if(o.leashed||!r&&!mo(o))continue;const c=Math.hypot(o.x-e,o.z-t);c<=a&&(a=c,s=o)}return s}function nc(i,e,t,n,r){e.leashed=!0,e.rest=0,i.stack.push(e.id),i.events.push({kind:"invited",id:e.id,x:t,z:n,at:r})}function Nf(i,e,t,n,r,s,a,o){i.events=[],i.held=t.talk,i.heldInAir=t.talk&&!r;const c=o.invite,l=o.leash,u=d=>e[d];if(t.talk&&r){const d=i.talk?u(i.talk.id):null;if(d&&!d.leashed&&Math.hypot(d.x-n.x,d.z-n.z)<=c.cancelDistance)i.talk.t+=a,d.rest=Math.max(d.rest,.2),d.moving=!1,d.facing=n.x>=d.x?1:-1,d.away=n.z<d.z-1,!i.talk.refused&&i.talk.t>=i.talk.total&&(nc(i,d,d.x,d.z,s),i.talk=null);else{i.talk&&i.events.push({kind:"cancelled",id:i.talk.id,x:n.x,z:n.z,at:s});const h=Xr(e,n.x,n.z,c.talkRange)??Xr(e,n.x,n.z,c.talkRange,!0);i.talk=h?{id:h.id,refused:!mo(h),t:0,total:mo(h)?Lf(h,o):1/0}:null}}else i.talk&&(i.events.push({kind:"cancelled",id:i.talk.id,x:n.x,z:n.z,at:s}),i.talk=null);if(t.inviteNearest){const d=Xr(e,n.x,n.z,1/0);d&&nc(i,d,d.x,d.z,s)}if(t.sigil&&r){let d=-1,h=l.pickRadius;if(i.placed.forEach((p,g)=>{const v=Math.hypot(p.x-n.x,p.z-n.z);v<=h&&(h=v,d=g)}),d>=0){const[p]=i.placed.splice(d,1);i.stack.push(p.id),i.events.push({kind:"picked",id:p.id,x:p.x,z:p.z,at:s})}else if(i.stack.length){const p=i.stack[i.stack.length-1];Ih(i,n.x,n.z,o)?i.events.push({kind:"fizzled",id:p,x:n.x,z:n.z,at:s}):(i.stack.pop(),i.placed.push({id:p,x:n.x,z:n.z,at:s}),i.events.push({kind:"placed",id:p,x:n.x,z:n.z,at:s}))}}for(const d of i.stack)ic(u(d),n.x,n.z,a,o);for(const d of i.placed)ic(u(d.id),d.x,d.z,a,o)}const Ih=(i,e,t,n)=>i.placed.some(r=>Math.hypot(r.x-e,r.z-t)<n.leash.spacing);function ic(i,e,t,n,r){const s=r.leash,a=s.length,o=Math.hypot(i.x-e,i.z-t)>a;if(o){const p=Math.hypot(i.x-e,i.z-t),g=a*.5/p;i.tx=e+(i.x-e)*g,i.tz=t+(i.z-t)*g,i.rest=0}else if(i.rest>0){i.rest-=n,i.moving=!1,i.away=!1;return}else if(Math.hypot(i.tx-e,i.tz-t)>a*.85||Math.hypot(i.tx-i.x,i.tz-i.z)<.05){Math.hypot(i.tx-i.x,i.tz-i.z)<.05&&(i.rest=.5+i.rand()*2);const p=i.rand()*Math.PI*2,g=Math.sqrt(i.rand())*a*.8;if(i.tx=e+Math.cos(p)*g,i.tz=t+Math.sin(p)*g,i.rest>0){i.moving=!1,i.away=!1;return}}const c=i.tx-i.x,l=i.tz-i.z,u=Math.hypot(c,l);if(u<1e-4){i.moving=!1;return}const d=o?Math.max(i.speed,s.runSpeed*(i.level===ma?.6:1)):i.speed*1.5,h=Math.min(u,d*n);i.x+=c/u*h,i.z+=l/u*h,Math.abs(c)>.02&&(i.facing=c>0?1:-1),i.away=gl(c,l,i.away,0,r),i.moving=!0,i.walk+=n*(o?7:4)}const Uf=i=>`${i[0]},${i[1]}`;function Ff(i){const e={cell:i.centreCell,wave:0,at:0,from:null,soundsystem:null};return{areas:new Map([[Uf(i.centreCell),e]]),wave:0,nextAt:i.tuning.party.startDelay+i.tuning.party.interval,paused:!1}}function Of(i,e){const t=i.siteOf(e[0],e[1]),n=vi(i.seed*17+e[0]*53+e[1]*911),[r,s]=Ph(i,[e[0],e[1]],t.x,t.z,i.areaSize*.75),a=Math.floor(Ye(e[0],e[1],i.seed+77)*3)%3;for(let o=0;o<24;o++){const c=n()*Math.PI*2,l=3+n()*4,u=r+Math.cos(c)*l,d=s+Math.sin(c)*l+3,h=i.areaAt(u,d).cell;if(h[0]===e[0]&&h[1]===e[1])return{x:u,z:d,variant:a}}return{x:r,z:s,variant:a}}const Bf=(i,e)=>e[0]>=0&&e[1]>=0&&e[0]<i.n&&e[1]<i.n;function Nh(i,e,t){const n=i.wave+1,r=[],s=new Map,a=new Map;for(const[l,u]of i.areas)for(const d of e.neighbours.get(l)??[]){if(i.areas.has(d)||s.has(d))continue;const h=d.split(",").map(Number);Bf(e,h)&&(s.set(d,h),a.set(d,u.cell))}const o=[...s.entries()].sort((l,u)=>Ye(l[1][0],l[1][1],e.seed+n)-Ye(u[1][0],u[1][1],e.seed+n)),c=e.tuning.party.maxPerWave>0?e.tuning.party.maxPerWave:1/0;for(const[l,u]of o.slice(0,c)){const d={cell:u,wave:n,at:t,from:a.get(l)??null,soundsystem:Of(e,u)};i.areas.set(l,d),r.push(d)}return i.wave=n,r}function zf(i,e,t,n){return i.paused?(i.nextAt+=n,[]):t<i.nextAt?[]:(i.nextAt+=e.tuning.party.interval,Nh(i,e,t))}function kf(i,e,t){const n=Math.max(0,i.nextAt-t),r=e.tuning.party.interval;return{left:n,gone:1-Math.min(1,n/r)}}function Gf(i,e){const t=ff(i,e),n=pf(t.start.x,t.start.z);return{seed:i,tuning:e,map:t,forest:new Rf(t),creatures:vf(t),clock:Bu(),witch:n,camera:Uu(e,n.x,vr(n,e),n.z),party:Ff(t),leash:Cf()}}function Hf(i,e,t){const n=zu(i.clock,t);n!==0&&(i.witch=mf(i.witch,e,n,i.tuning,i.map.bounds),i.camera=Fu(i.camera,e.zoom,{x:i.witch.x,y:vr(i.witch,i.tuning),z:i.witch.z},{x:i.witch.vx,z:i.witch.vz},i.witch.lift,n,i.tuning),e.pauseWaves&&(i.party.paused=!i.party.paused),e.nextWave&&(Nh(i.party,i.map,i.clock.time),i.party.nextAt=i.clock.time+i.tuning.party.interval),zf(i.party,i.map,i.clock.time,n),Mf(i.creatures,i.witch.x,i.witch.z,Vf(i),n,i.clock.time,i.map),Nf(i.leash,i.creatures,{talk:!!e.talk,sigil:!!e.sigil,inviteNearest:e.inviteNearest},i.witch,i.witch.mode==="ground",i.clock.time,n,i.tuning))}const Vf=i=>Math.max(i.tuning.creatureSimRadius,i.tuning.haze.far+20+Lh(i.map)*2.5),rc=i=>dh(i.camera,i.camera.lift,i.tuning);function Uh(i){const e=i.map.areaAt(i.witch.x,i.witch.z),t=i.map.setPieceOf(e.cell[0],e.cell[1]);return vn[e.type].name+(t?` (set piece: ${t})`:"")}const Wf="Witch tuning. Edit the numbers, push, and the playable link rebuilds. Distances are metres, times seconds, angles degrees. Keys starting with _ are notes.",Xf="The forest: mapAreas x mapAreas areas cut by the fractal partition. An area is areaSize x areaScale metres across on average (areaScale 4 makes them four times as wide as the first 28 m areas; push it for bigger). areaSizeVariance (0-1) makes areas vary in size, some small, some large. borderLayers sets how wiggly borders are.",Yf=20,qf=28,Kf=4,$f=.7,Zf=4,Jf="treeHeight and crownWidth scale the art's trees (1 is the Art Lab's size; crowns widen with treeHeight too, crownWidth is the total). treeDensity (0-1): the chance of a tree on each spot outside the clearings; clearingSize (0-1): how far out from an area's centre the ground stays fully open; clearingFalloff (0-1): over how much of the way to the border trees thicken to full density (small: crisp clearing edges); gladeAmount (0-1) of the woods is open in random glades about gladeScale metres across; trees sit on a staggered grid treeSpacingX by treeSpacingZ metres, so no two crowns pile up. A tree is left out where its crown (crownHalfWidth either side, crownHeight up) would hang over a clearing seen from the treetops.",Qf=.8,jf=.2,ep=.12,tp=.25,np=38,ip=.45,rp=.8,sp=2.25,ap=1.7,op=4.6,lp=2.8,cp=10.5,hp=11.25,up=3.4,dp=4,fp=.6,pp="Speeds per mode, and how long rising and descending take. acceleration: how quickly she reaches her speed or stops in the treetops (per second; higher is snappier); groundAcceleration: the same on the ground. leanAt: the share of the top speed above which she leans into her flight. facing: she (and every creature) faces the viewer unless clearly heading up the screen, within awayEnter degrees of straight up (and stays turned away until past awayLeave); sideways, down or stopped faces the viewer.",mp=17.5,gp=32,xp=10,vp=28,_p=.7,Mp={awayEnter:55,awayLeave:65},Sp=.7,bp=.55,yp=1.4,wp=24,Ep="Near-isometric on the ground, after Transistor; lower over the treetops, looking toward the horizon to feel the speed. The camera follows the witch on a soft spring (follow: its stiffness; higher keeps her closer to the middle) and looks a little ahead of her: lookAhead seconds of flight, at most lookAheadMax metres, eased in at lookAheadEase. zoomEase and liftEase: how softly zoom and rising change the angle and distance. a narrow field of view (fov, degrees) seen from far off, so there is little perspective. Each mode has its own angle (degrees below horizontal) and distance from the witch, at zoomed-in and zoomed-out. Zoom moves between them in zoomSteps steps, starting at startZoom: with 4 steps and startZoom 1 the start is a third of the way out, so the defaults are ground 32 degrees at 100 m and treetop 36 degrees at 170 m, with one step in and two out from each.",Ap={fov:20,ground:{angleIn:30,angleOut:36,distanceIn:80,distanceOut:140},treetop:{angleIn:34,angleOut:40,distanceIn:150,distanceOut:210},lookAhead:.1,lookAheadMax:3,lookAheadEase:1.5,zoomEase:5,liftEase:8,zoomSteps:4,startZoom:1,follow:8},Tp="Everything the camera can see is drawn, plus viewMargin metres round the view, so nothing appears or vanishes on screen. haze: the twilight haze fades the forest from near to far metres from the witch; nothing is drawn beyond far. lightBudget: how many of the nearest point lights (campfires, magic stones, the dancefloor) light the scene at once. pixelSize: screen pixels per art pixel. glowReach: metres the witch's light reaches. spriteTilt: 1 = sprites face the camera fully, 0 = stand upright.",Rp=3,Cp=12,Lp=1,Pp=1,Dp=16,Ip=12,Np=20,Up="Light sources placed by seed, on a grid of spacing metres, mostly in clearings and at area edges: the chance per spot of a campfire, a magic stone, or a pond mirroring the moon (wetPond in wet areas: wetland, stream, bog, beaver pond, moor).",Fp="How far (reach, metres) and how strongly each kind of light lights its surroundings. glowPower: the witch's own glow (glowReach is its reach). Light falls off smoothly to nothing at its reach: no rings or bands.",Op={campfire:{reach:22,strength:2.6},stone:{reach:16,strength:1.8}},Bp=2.2,zp="The music's clock (beats per minute): the lasers sweep to it and party animals dance to it. Later the music itself drives it.",kp={bpm:120},Gp="The sigil stack above the witch's hat: scale (of the sigils' size), offset (the gap between her hat tip and the bottom sigil, in sigil heights), gap (between sigils, in sigil heights). It sways as a chain of springs: stiffness and damping, trail (how far it leans back per m/s of her speed), idleSway (metres of gentle sway when she's still).",Hp={offset:.5,scale:.65,gap:.15,stiffness:60,damping:9,trail:.03,idleSway:.1},Vp="Each playing soundsystem's laser show: bursts of blockBars bars, on about duty of the time (seeded per soundsystem), up to maxCount beams stepping on the bars, fanned over spread degrees, swinging sweep degrees once every sweepBeats beats (slow, like searchlights), opening and closing the fan every openBars bars, length metres tall, opacity 0-1, fading in over fadeIn and out over fadeOut seconds, and fading with distance from fadeNear to fadeFar metres. Glow only: no light, nothing from the light budget.",Wp={on:!0,maxCount:9,length:420,spread:120,sweep:22,sweepBeats:12,openBars:6,opacity:.6,duty:.35,blockBars:4,fadeIn:.12,fadeOut:.4,fadeNear:140,fadeFar:480},Xp="A sparkling line round the partified region's outside edge, in each area's sigil colour: width (px), brightness, sparkle (0-1, how much it twinkles and runs), step (metres between its sparks).",Yp={on:!0,width:2,brightness:1.2,sparkle:.6,step:1.6},qp={spacing:10,campfire:.035,magicStone:.025,pond:.02,wetPond:.12},Kp={near:150,far:360},$p="bloom: a gentle glow round bright things (strength 0 or on false turns it off; threshold: how bright a pixel must be to glow). tiltShift: blurs the top and bottom of the screen so the forest looks like a miniature. strength: the blur at the screen's edges, in pixels; band: the height of the sharp band (0-1 of the screen); centre: where it sits (0 top, 0.5 middle, 1 bottom); where: 'before' blurs at the low resolution, before the pixels are scaled up, 'after' blurs the scaled-up image. Add ?tilt=before, ?tilt=after or ?tilt=off to the link to compare.",Zp="shadows: a small contact shadow under the witch, each bush, creature and prop; trees: a crown-sized shadow under every tree too, cast away from the moon (off: Ed, 2026-10-03). canopyShadow: a dappled shadow from the canopy overhead (height in metres), thinner in clearings, drifting with the wind. mist: a low drifting mist (height in metres above the ground). Each has on and strength.",Jp={on:!0,strength:.7,trees:!1},Qp={on:!0,strength:.45,height:18,cover:.55,wind:.6},jp={on:!0,strength:.12,height:3,wind:.8},e0="fx: how the mist, the far haze and the canopy dapple are drawn. smooth: soft gradients (the mist in its own buffer, blurred a little and scaled up smoothly); pixel: dithered steps on the art's pixel grid. In smooth, the moonlight's bands, moonbeams and the soft contact shadows under the witch, creatures, bushes and props are smooth too (no dither anywhere); pixel brings all the dithers back. ?fx=pixel or ?fx=smooth in the URL.",t0="smooth",n0="Inviting (DESIGN.md, the leash): on the ground, hold Talk within talkRange metres of a creature; you chat in emoji for talkTime seconds (babies, young, adults), taking turns every turn seconds (babies, young, adults), then it is invited and leashed to you. Letting go, rising or moving further than cancelDistance cancels it. Legends can't be invited: they give one unimpressed look. leash.length: how far a leashed creature roams from its leash point (you, or its sigil on the ground); runSpeed: how fast it hurries back when out of range (m/s); pickRadius: how near a placed sigil you must be to pick it up; spacing: how close two sigils may be put down (keep it above pickRadius, or a blocked spot picks up instead of fizzling). bond: how a creature shows its tie to its sigil (rim: a glow at its feet in the sigil's colour; sparks: one spark every sparkEvery seconds from sigil to creature, staggered; thread: a dotted line only under strain).",i0={talkRange:12,cancelDistance:18,talkTime:[3,6,12],turn:[.7,.9,1.3]},r0={length:8,runSpeed:4,pickRadius:2,spacing:4},s0={rim:!0,sparks:!0,thread:!0,sparkEvery:4},a0="The party spreads: a wave every interval seconds (the first after startDelay more), partifying every area touching a partified one; maxPerWave caps a wave (0: no cap). transition: seconds an area takes to partify, 0 to skip the show. partyLight: the coloured light at each soundsystem (reach in metres, strength).",o0={interval:30,startDelay:0,maxPerWave:0,transition:2.5,lightReach:30,lightStrength:1.6},l0="Colourful string lights between trees in every partified area: up to perArea spans, in chains of up to chainMax spans from tree to tree, each span spanMin to spanMax metres long, chains starting at least spread metres apart so they cover the whole area; at height metres, sagging sag metres per 8 m of span, a bulb every bulbSpacing metres in the palette's colours, twinkling (twinkle 0-1), a chase running along now and then at chaseSpeed bulbs per second. The bulbs only glow (bloom); they cast no light, so they cost nothing from the light budget.",c0={on:!0,perArea:40,spanMin:6,spanMax:22,chainMax:4,spread:14,height:6.5,sag:.9,bulbSpacing:.8,palette:["#fff1d6","#ff6fcf","#5fe8ff","#ffe25c","#b48cff","#7dff8a"],twinkle:.35,chaseSpeed:8},h0="The dancefloor: motes: magic particles drifting up off the circle (count, how high they rise in metres, speed in m/s, column: the share of the circle they rise from); a ring of standing stones (radius in metres, how many stones), a clear space of clearing metres round it, a glowing magic circle (two hues 0-1, pulse per second, runeSpeed in turns per minute) lighting the ground round it (lightReach metres, lightStrength), and a magic disco ball floating discoHeight metres up (discoSize metres across, spin turns per minute) throwing specks of light: specks is the share of the sphere that throws one, speckBrightness how bright, speckReach how far.",u0={motes:{count:220,rise:110,speed:3.2,column:.8},radius:13.5,stones:27,clearing:9,circleHue:.86,circleHue2:.52,pulse:.35,runeSpeed:1,lightReach:36,lightStrength:2,discoHeight:7.5,discoSize:1.8,spin:4,specks:.22,speckBrightness:.9,speckReach:32},d0="In ground mode the canopy stays drawn at the screen's edges, so she flies under the forest roof; a dithered hole round her is cut out, screenFraction of the screen's width across, with a soft edge (a fraction of the width). Rising closes the hole.",f0={screenFraction:.8,edge:.1},p0="Contrast: ambient scales the twilight fill (lower is darker shade under the canopy); black is the black point and gamma the curve applied to the whole picture, so dark goes near-black and lit stays bright.",m0={black:.03,gamma:1.35,ambient:.35},g0={on:!0,strength:.7,threshold:.55},x0={on:!0,where:"before",strength:3,band:.4,centre:.55},v0="Creatures grow more numerous and older with an area's distance from home (0 at the dancefloor, 1 at the map's edge): creaturesNear in the areas round home, creaturesFar at the edge (creatureCurve shapes the rise), youngShareFar of them young at the edge; adults from adultsFrom outward, adultShareFar of them at the edge. Legends are rare: at most one in any area, by a chance rising from 0 at legendsFrom to legendChanceFar at the edge; legendNextToHome puts one next to home, to look at early. Idle creatures roam their whole area. Only creatures whose home is within creatureSimRadius metres of the witch move (never less than the haze far edge plus 2.5 areas, so a creature resuming its roam always does so out of sight).",_0=2,M0=20,S0=1.3,b0=.5,y0=.35,w0=.35,E0=.25,A0=!0,T0=.55,R0=600,C0=.6,L0="setPieceChance: the share of areas, among the types that have a set piece, that show theirs. Wall objects (an area type's edges: puddles, henges, hedges) stand where areas meet, one per wallSpacing metres with chance wallDensity; they do not block movement.",P0=.25,D0=.35,I0={_readme:Wf,_map:Xf,mapAreas:Yf,areaSize:qf,areaScale:Kf,areaSizeVariance:$f,borderLayers:Zf,_trees:Jf,treeDensity:Qf,clearingSize:jf,clearingFalloff:ep,gladeAmount:tp,gladeScale:np,bushDensity:ip,bushClump:rp,treeHeight:sp,crownWidth:ap,treeSpacingX:op,treeSpacingZ:lp,crownHalfWidth:cp,crownHeight:hp,bushSpacing:up,wallSpacing:dp,wallDensity:fp,_witch:pp,groundSpeed:mp,treetopSpeed:gp,acceleration:xp,groundAcceleration:vp,leanAt:_p,facing:Mp,riseTime:Sp,descendTime:bp,groundHeight:yp,treetopHeight:wp,_camera:Ep,camera:Ap,_look:Tp,pixelSize:Rp,glowReach:Cp,glowHeight:Lp,spriteTilt:Pp,artPixelsPerMetre:Dp,viewMargin:Ip,lightBudget:Np,_lightSources:Up,_lights:Fp,lights:Op,glowPower:Bp,_beat:zp,beat:kp,_stack:Gp,stack:Hp,_lasers:Vp,lasers:Wp,_borders:Xp,borders:Yp,lightSources:qp,haze:Kp,_post:$p,_shadows:Zp,shadows:Jp,canopyShadow:Qp,mist:jp,_fx:e0,fx:t0,_invite:n0,invite:i0,leash:r0,bond:s0,_party:a0,party:o0,_stringLights:l0,stringLights:c0,_dancefloor:h0,dancefloor:u0,_canopyCutout:d0,canopyCutout:f0,_tone:p0,tone:m0,bloom:g0,tiltShift:x0,_creatures:v0,creaturesNear:_0,creaturesFar:M0,creatureCurve:S0,youngShareFar:b0,adultsFrom:y0,adultShareFar:w0,legendChanceFar:E0,legendNextToHome:A0,legendsFrom:T0,creatureSimRadius:R0,creatureSpeed:C0,_setPieces:L0,setPieceChance:P0,legendSpeed:D0},Wi=I0;class N0{keys=new Set;pressed=new Set;padPrev=[];touch={x:0,y:0,toggle:!1,zoom:0,debug:!1};onAny=null;constructor(e=window){e.addEventListener("keydown",t=>{if(t.repeat){this.isGameKey(t.code)&&t.preventDefault();return}this.keys.add(t.code),this.isGameKey(t.code)&&t.preventDefault(),this.onAny?.()||this.pressed.add(t.code)}),e.addEventListener("keyup",t=>this.keys.delete(t.code)),e.addEventListener("blur",()=>this.keys.clear())}isGameKey(e){return/^(Arrow|Space$|Key[WASDZXENPTIFR]$|Shift|Minus$|Equal$|NumpadAdd$|NumpadSubtract$|Backquote$)/.test(e)}clearPresses(){this.pressed.clear();const e=this.touch;e.toggle=!1,e.zoom=0,e.debug=!1}read(){const e=this.pressed.has("KeyN")||this.touch.nextWave,t=this.pressed.has("KeyP")||this.touch.pauseWaves;this.touch.nextWave=!1,this.touch.pauseWaves=!1;const n=x=>this.keys.has(x)?1:0,r=x=>this.pressed.has(x);let s=n("KeyD")+n("ArrowRight")-n("KeyA")-n("ArrowLeft"),a=n("KeyS")+n("ArrowDown")-n("KeyW")-n("ArrowUp"),o=r("Space"),c=(r("KeyX")||r("Minus")||r("NumpadSubtract")?1:0)-(r("KeyZ")||r("Equal")||r("NumpadAdd")?1:0),l=r("Backquote"),u=n("KeyT")+n("KeyF")+n("ShiftLeft")+n("ShiftRight")>0,d=r("KeyE")||r("KeyR");const h=r("KeyI");this.pressed.clear();const p=typeof navigator<"u"&&navigator.getGamepads?navigator.getGamepads():[];for(const x of p){if(!x)continue;const m=A=>!!x.buttons[A]?.pressed,M=x.buttons.some((A,L)=>A.pressed&&!this.padPrev[L])&&!!this.onAny?.(),b=A=>!M&&m(A)&&!this.padPrev[A];let w=x.axes[0]??0,E=x.axes[1]??0;const P=Math.hypot(w,E),S=.18;if(P<S)w=0,E=0;else{const A=(Math.min(1,P)-S)/(1-S)/P;w*=A,E*=A}w+=(m(15)?1:0)-(m(14)?1:0),E+=(m(13)?1:0)-(m(12)?1:0),s+=w,a+=E,b(3)&&(o=!0),(b(4)||b(6))&&(c+=1),(b(5)||b(7))&&(c-=1),b(8)&&(l=!0),m(0)&&(u=!0),b(2)&&(d=!0),this.padPrev=x.buttons.map(A=>A.pressed);break}const g=this.touch;s+=g.x,a+=g.y,g.toggle&&(o=!0),c+=g.zoom,g.debug&&(l=!0),g.talk&&(u=!0),g.sigil&&(d=!0),g.toggle=!1,g.zoom=0,g.debug=!1,g.sigil=!1;const v=Math.hypot(s,a);return v>1&&(s/=v,a/=v),{moveX:s,moveZ:a,toggleMode:o,zoom:Math.sign(c),debug:l,nextWave:e,pauseWaves:t,talk:u,sigil:d,inviteNearest:h}}}const xl="186",U0=0,sc=1,F0=2,Gs=1,O0=2,Gr=3,Oi=0,on=1,jn=2,Hn=0,dr=1,_r=2,ac=3,oc=4,vl=5,or=100,B0=101,z0=102,k0=103,G0=104,_l=200,H0=201,Ml=202,V0=203,Fh=204,Oh=205,W0=206,X0=207,Y0=208,q0=209,K0=210,$0=211,Z0=212,J0=213,Q0=214,go=0,xo=1,vo=2,Yr=3,_o=4,Mo=5,So=6,bo=7,Bh=0,j0=1,em=2,Vn=0,zh=1,kh=2,Gh=3,Hh=4,Vh=5,Wh=6,Xh=7,Yh=300,Bi=301,Mr=302,Ta=303,Ra=304,ga=306,yo=1e3,ei=1001,wo=1002,Ut=1003,tm=1004,os=1005,Nt=1006,Ca=1007,Di=1008,fn=1009,qh=1010,Kh=1011,qr=1012,Sl=1013,Wn=1014,kn=1015,Xn=1016,bl=1017,yl=1018,Kr=1020,$h=35902,Zh=35899,Jh=1021,Qh=1022,pn=1023,ii=1026,Ii=1027,jh=1028,wl=1029,zi=1030,El=1031,Al=1033,Hs=33776,Vs=33777,Ws=33778,Xs=33779,Eo=35840,Ao=35841,To=35842,Ro=35843,Co=36196,Lo=37492,Po=37496,Do=37488,Io=37489,Js=37490,No=37491,Uo=37808,Fo=37809,Oo=37810,Bo=37811,zo=37812,ko=37813,Go=37814,Ho=37815,Vo=37816,Wo=37817,Xo=37818,Yo=37819,qo=37820,Ko=37821,$o=36492,Zo=36494,Jo=36495,Qo=36283,jo=36284,Qs=36285,el=36286,nm=3200,lc=0,im=1,Pn="",bn="srgb",$r="srgb-linear",js="linear",gt="srgb",La=7680,rm=519,sm=512,am=513,om=514,Tl=515,lm=516,cm=517,Rl=518,hm=519,um=35044,fr=35048,cc="300 es",Gn=2e3,ea=2001;function dm(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function ta(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function fm(){const i=ta("canvas");return i.style.display="block",i}const hc={};function uc(...i){const e="THREE."+i.shift();console.log(e,...i)}function eu(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ge(...i){i=eu(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function at(...i){i=eu(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function pr(...i){const e=i.join(" ");e in hc||(hc[e]=!0,Ge(...i))}function pm(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const mm={[go]:xo,[vo]:So,[_o]:bo,[Yr]:Mo,[xo]:go,[So]:vo,[bo]:_o,[Mo]:Yr};class Gi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const r=n[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Jt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Pa=Math.PI/180,tl=180/Math.PI;function Qr(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Jt[i&255]+Jt[i>>8&255]+Jt[i>>16&255]+Jt[i>>24&255]+"-"+Jt[e&255]+Jt[e>>8&255]+"-"+Jt[e>>16&15|64]+Jt[e>>24&255]+"-"+Jt[t&63|128]+Jt[t>>8&255]+"-"+Jt[t>>16&255]+Jt[t>>24&255]+Jt[n&255]+Jt[n>>8&255]+Jt[n>>16&255]+Jt[n>>24&255]).toLowerCase()}function it(i,e,t){return Math.max(e,Math.min(t,i))}function gm(i,e){return(i%e+e)%e}function Da(i,e,t){return(1-t)*i+t*e}function Dr(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function sn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class He{static{He.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=it(this.x,e.x,t.x),this.y=it(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=it(this.x,e,t),this.y=it(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(it(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(it(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class wr{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let c=n[r+0],l=n[r+1],u=n[r+2],d=n[r+3],h=s[a+0],p=s[a+1],g=s[a+2],v=s[a+3];if(d!==v||c!==h||l!==p||u!==g){let x=c*h+l*p+u*g+d*v;x<0&&(h=-h,p=-p,g=-g,v=-v,x=-x);let m=1-o;if(x<.9995){const _=Math.acos(x),M=Math.sin(_);m=Math.sin(m*_)/M,o=Math.sin(o*_)/M,c=c*m+h*o,l=l*m+p*o,u=u*m+g*o,d=d*m+v*o}else{c=c*m+h*o,l=l*m+p*o,u=u*m+g*o,d=d*m+v*o;const _=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=_,l*=_,u*=_,d*=_}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,r,s,a){const o=n[r],c=n[r+1],l=n[r+2],u=n[r+3],d=s[a],h=s[a+1],p=s[a+2],g=s[a+3];return e[t]=o*g+u*d+c*p-l*h,e[t+1]=c*g+u*h+l*d-o*p,e[t+2]=l*g+u*p+o*h-c*d,e[t+3]=u*g-o*d-c*h-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(r/2),d=o(s/2),h=c(n/2),p=c(r/2),g=c(s/2);switch(a){case"XYZ":this._x=h*u*d+l*p*g,this._y=l*p*d-h*u*g,this._z=l*u*g+h*p*d,this._w=l*u*d-h*p*g;break;case"YXZ":this._x=h*u*d+l*p*g,this._y=l*p*d-h*u*g,this._z=l*u*g-h*p*d,this._w=l*u*d+h*p*g;break;case"ZXY":this._x=h*u*d-l*p*g,this._y=l*p*d+h*u*g,this._z=l*u*g+h*p*d,this._w=l*u*d-h*p*g;break;case"ZYX":this._x=h*u*d-l*p*g,this._y=l*p*d+h*u*g,this._z=l*u*g-h*p*d,this._w=l*u*d+h*p*g;break;case"YZX":this._x=h*u*d+l*p*g,this._y=l*p*d+h*u*g,this._z=l*u*g-h*p*d,this._w=l*u*d-h*p*g;break;case"XZY":this._x=h*u*d-l*p*g,this._y=l*p*d-h*u*g,this._z=l*u*g+h*p*d,this._w=l*u*d+h*p*g;break;default:Ge("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],d=t[10],h=n+o+d;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-c)*p,this._y=(s-l)*p,this._z=(a-r)*p}else if(n>o&&n>d){const p=2*Math.sqrt(1+n-o-d);this._w=(u-c)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+l)/p}else if(o>d){const p=2*Math.sqrt(1+o-n-d);this._w=(s-l)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(c+u)/p}else{const p=2*Math.sqrt(1+d-n-o);this._w=(a-r)/p,this._x=(s+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(it(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+a*o+r*l-s*c,this._y=r*u+a*c+s*o-n*l,this._z=s*u+a*l+n*c-r*o,this._w=a*u-n*o-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,s=-s,a=-a,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+n*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class V{static{V.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(dc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(dc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*r-o*n),u=2*(o*t-s*r),d=2*(s*n-a*t);return this.x=t+c*l+a*d-o*u,this.y=n+c*u+o*l-s*d,this.z=r+c*d+s*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=it(this.x,e.x,t.x),this.y=it(this.y,e.y,t.y),this.z=it(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=it(this.x,e,t),this.y=it(this.y,e,t),this.z=it(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(it(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=r*c-s*o,this.y=s*a-n*c,this.z=n*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ia.copy(this).projectOnVector(e),this.sub(Ia)}reflect(e){return this.sub(Ia.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(it(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ia=new V,dc=new wr;class Ve{static{Ve.prototype.isMatrix3=!0}constructor(e,t,n,r,s,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,c,l)}set(e,t,n,r,s,a,o,c,l){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],d=n[7],h=n[2],p=n[5],g=n[8],v=r[0],x=r[3],m=r[6],_=r[1],M=r[4],b=r[7],w=r[2],E=r[5],P=r[8];return s[0]=a*v+o*_+c*w,s[3]=a*x+o*M+c*E,s[6]=a*m+o*b+c*P,s[1]=l*v+u*_+d*w,s[4]=l*x+u*M+d*E,s[7]=l*m+u*b+d*P,s[2]=h*v+p*_+g*w,s[5]=h*x+p*M+g*E,s[8]=h*m+p*b+g*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-n*s*u+n*o*c+r*s*l-r*a*c}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],d=u*a-o*l,h=o*c-u*s,p=l*s-a*c,g=t*d+n*h+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=d*v,e[1]=(r*l-u*n)*v,e[2]=(o*n-r*a)*v,e[3]=h*v,e[4]=(u*t-r*c)*v,e[5]=(r*s-o*t)*v,e[6]=p*v,e[7]=(n*c-l*t)*v,e[8]=(a*t-n*s)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-r*l,r*c,-r*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return pr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Na.makeScale(e,t)),this}rotate(e){return pr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Na.makeRotation(-e)),this}translate(e,t){return pr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Na.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Na=new Ve,fc=new Ve().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),pc=new Ve().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function xm(){const i={enabled:!0,workingColorSpace:$r,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===gt&&(r.r=ni(r.r),r.g=ni(r.g),r.b=ni(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===gt&&(r.r=mr(r.r),r.g=mr(r.g),r.b=mr(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Pn?js:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return pr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return pr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[$r]:{primaries:e,whitePoint:n,transfer:js,toXYZ:fc,fromXYZ:pc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:bn},outputColorSpaceConfig:{drawingBufferColorSpace:bn}},[bn]:{primaries:e,whitePoint:n,transfer:gt,toXYZ:fc,fromXYZ:pc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:bn}}}),i}const nt=xm();function ni(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function mr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Xi;class vm{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Xi===void 0&&(Xi=ta("canvas")),Xi.width=e.width,Xi.height=e.height;const r=Xi.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=Xi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ta("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=ni(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ni(t[n]/255)*255):t[n]=ni(t[n]);return{data:t,width:e.width,height:e.height}}else return Ge("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let _m=0;class Cl{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:_m++}),this.uuid=Qr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Ua(r[a].image)):s.push(Ua(r[a]))}else s=Ua(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function Ua(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?vm.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ge("Texture: Unable to serialize Texture."),{})}let Mm=0;const Fa=new V;class en extends Gi{constructor(e=en.DEFAULT_IMAGE,t=en.DEFAULT_MAPPING,n=ei,r=ei,s=Nt,a=Di,o=pn,c=fn,l=en.DEFAULT_ANISOTROPY,u=Pn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Mm++}),this.uuid=Qr(),this.name="",this.source=new Cl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new He(0,0),this.repeat=new He(1,1),this.center=new He(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Fa).x}get height(){return this.source.getSize(Fa).y}get depth(){return this.source.getSize(Fa).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Ge(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ge(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Yh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case yo:e.x=e.x-Math.floor(e.x);break;case ei:e.x=e.x<0?0:1;break;case wo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case yo:e.y=e.y-Math.floor(e.y);break;case ei:e.y=e.y<0?0:1;break;case wo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}en.DEFAULT_IMAGE=null;en.DEFAULT_MAPPING=Yh;en.DEFAULT_ANISOTROPY=1;class ct{static{ct.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const c=e.elements,l=c[0],u=c[4],d=c[8],h=c[1],p=c[5],g=c[9],v=c[2],x=c[6],m=c[10];if(Math.abs(u-h)<.01&&Math.abs(d-v)<.01&&Math.abs(g-x)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+v)<.1&&Math.abs(g+x)<.1&&Math.abs(l+p+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(l+1)/2,b=(p+1)/2,w=(m+1)/2,E=(u+h)/4,P=(d+v)/4,S=(g+x)/4;return M>b&&M>w?M<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(M),r=E/n,s=P/n):b>w?b<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(b),n=E/r,s=S/r):w<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),n=P/s,r=S/s),this.set(n,r,s,t),this}let _=Math.sqrt((x-g)*(x-g)+(d-v)*(d-v)+(h-u)*(h-u));return Math.abs(_)<.001&&(_=1),this.x=(x-g)/_,this.y=(d-v)/_,this.z=(h-u)/_,this.w=Math.acos((l+p+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=it(this.x,e.x,t.x),this.y=it(this.y,e.y,t.y),this.z=it(this.z,e.z,t.z),this.w=it(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=it(this.x,e,t),this.y=it(this.y,e,t),this.z=it(this.z,e,t),this.w=it(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(it(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Sm extends Gi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Nt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new ct(0,0,e,t),this.scissorTest=!1,this.viewport=new ct(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:n.depth},s=new en(r),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Nt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Cl(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class wn extends Sm{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class tu extends en{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Ut,this.minFilter=Ut,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class bm extends en{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Ut,this.minFilter=Ut,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class Pt{static{Pt.prototype.isMatrix4=!0}constructor(e,t,n,r,s,a,o,c,l,u,d,h,p,g,v,x){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,c,l,u,d,h,p,g,v,x)}set(e,t,n,r,s,a,o,c,l,u,d,h,p,g,v,x){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=r,m[1]=s,m[5]=a,m[9]=o,m[13]=c,m[2]=l,m[6]=u,m[10]=d,m[14]=h,m[3]=p,m[7]=g,m[11]=v,m[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Pt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,r=1/Yi.setFromMatrixColumn(e,0).length(),s=1/Yi.setFromMatrixColumn(e,1).length(),a=1/Yi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const h=a*u,p=a*d,g=o*u,v=o*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=p+g*l,t[5]=h-v*l,t[9]=-o*c,t[2]=v-h*l,t[6]=g+p*l,t[10]=a*c}else if(e.order==="YXZ"){const h=c*u,p=c*d,g=l*u,v=l*d;t[0]=h+v*o,t[4]=g*o-p,t[8]=a*l,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=p*o-g,t[6]=v+h*o,t[10]=a*c}else if(e.order==="ZXY"){const h=c*u,p=c*d,g=l*u,v=l*d;t[0]=h-v*o,t[4]=-a*d,t[8]=g+p*o,t[1]=p+g*o,t[5]=a*u,t[9]=v-h*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const h=a*u,p=a*d,g=o*u,v=o*d;t[0]=c*u,t[4]=g*l-p,t[8]=h*l+v,t[1]=c*d,t[5]=v*l+h,t[9]=p*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const h=a*c,p=a*l,g=o*c,v=o*l;t[0]=c*u,t[4]=v-h*d,t[8]=g*d+p,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=p*d+g,t[10]=h-v*d}else if(e.order==="XZY"){const h=a*c,p=a*l,g=o*c,v=o*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=h*d+v,t[5]=a*u,t[9]=p*d-g,t[2]=g*d-p,t[6]=o*u,t[10]=v*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ym,e,wm)}lookAt(e,t,n){const r=this.elements;return hn.subVectors(e,t),hn.lengthSq()===0&&(hn.z=1),hn.normalize(),li.crossVectors(n,hn),li.lengthSq()===0&&(Math.abs(n.z)===1?hn.x+=1e-4:hn.z+=1e-4,hn.normalize(),li.crossVectors(n,hn)),li.normalize(),ls.crossVectors(hn,li),r[0]=li.x,r[4]=ls.x,r[8]=hn.x,r[1]=li.y,r[5]=ls.y,r[9]=hn.y,r[2]=li.z,r[6]=ls.z,r[10]=hn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],d=n[5],h=n[9],p=n[13],g=n[2],v=n[6],x=n[10],m=n[14],_=n[3],M=n[7],b=n[11],w=n[15],E=r[0],P=r[4],S=r[8],A=r[12],L=r[1],R=r[5],N=r[9],U=r[13],D=r[2],F=r[6],z=r[10],Y=r[14],j=r[3],X=r[7],te=r[11],O=r[15];return s[0]=a*E+o*L+c*D+l*j,s[4]=a*P+o*R+c*F+l*X,s[8]=a*S+o*N+c*z+l*te,s[12]=a*A+o*U+c*Y+l*O,s[1]=u*E+d*L+h*D+p*j,s[5]=u*P+d*R+h*F+p*X,s[9]=u*S+d*N+h*z+p*te,s[13]=u*A+d*U+h*Y+p*O,s[2]=g*E+v*L+x*D+m*j,s[6]=g*P+v*R+x*F+m*X,s[10]=g*S+v*N+x*z+m*te,s[14]=g*A+v*U+x*Y+m*O,s[3]=_*E+M*L+b*D+w*j,s[7]=_*P+M*R+b*F+w*X,s[11]=_*S+M*N+b*z+w*te,s[15]=_*A+M*U+b*Y+w*O,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],d=e[6],h=e[10],p=e[14],g=e[3],v=e[7],x=e[11],m=e[15],_=c*p-l*h,M=o*p-l*d,b=o*h-c*d,w=a*p-l*u,E=a*h-c*u,P=a*d-o*u;return t*(v*_-x*M+m*b)-n*(g*_-x*w+m*E)+r*(g*M-v*w+m*P)-s*(g*b-v*E+x*P)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[1],a=e[5],o=e[9],c=e[2],l=e[6],u=e[10];return t*(a*u-o*l)-n*(s*u-o*c)+r*(s*l-a*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],d=e[9],h=e[10],p=e[11],g=e[12],v=e[13],x=e[14],m=e[15],_=t*o-n*a,M=t*c-r*a,b=t*l-s*a,w=n*c-r*o,E=n*l-s*o,P=r*l-s*c,S=u*v-d*g,A=u*x-h*g,L=u*m-p*g,R=d*x-h*v,N=d*m-p*v,U=h*m-p*x,D=_*U-M*N+b*R+w*L-E*A+P*S;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const F=1/D;return e[0]=(o*U-c*N+l*R)*F,e[1]=(r*N-n*U-s*R)*F,e[2]=(v*P-x*E+m*w)*F,e[3]=(h*E-d*P-p*w)*F,e[4]=(c*L-a*U-l*A)*F,e[5]=(t*U-r*L+s*A)*F,e[6]=(x*b-g*P-m*M)*F,e[7]=(u*P-h*b+p*M)*F,e[8]=(a*N-o*L+l*S)*F,e[9]=(n*L-t*N-s*S)*F,e[10]=(g*E-v*b+m*_)*F,e[11]=(d*b-u*E-p*_)*F,e[12]=(o*A-a*R-c*S)*F,e[13]=(t*R-n*A+r*S)*F,e[14]=(v*M-g*w-x*_)*F,e[15]=(u*w-d*M+h*_)*F,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,c=e.z,l=s*a,u=s*o;return this.set(l*a+n,l*o-r*c,l*c+r*o,0,l*o+r*c,u*o+n,u*c-r*a,0,l*c-r*o,u*c+r*a,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,u=a+a,d=o+o,h=s*l,p=s*u,g=s*d,v=a*u,x=a*d,m=o*d,_=c*l,M=c*u,b=c*d,w=n.x,E=n.y,P=n.z;return r[0]=(1-(v+m))*w,r[1]=(p+b)*w,r[2]=(g-M)*w,r[3]=0,r[4]=(p-b)*E,r[5]=(1-(h+m))*E,r[6]=(x+_)*E,r[7]=0,r[8]=(g+M)*P,r[9]=(x-_)*P,r[10]=(1-(h+v))*P,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return n.set(1,1,1),t.identity(),this;let a=Yi.set(r[0],r[1],r[2]).length();const o=Yi.set(r[4],r[5],r[6]).length(),c=Yi.set(r[8],r[9],r[10]).length();s<0&&(a=-a),Tn.copy(this);const l=1/a,u=1/o,d=1/c;return Tn.elements[0]*=l,Tn.elements[1]*=l,Tn.elements[2]*=l,Tn.elements[4]*=u,Tn.elements[5]*=u,Tn.elements[6]*=u,Tn.elements[8]*=d,Tn.elements[9]*=d,Tn.elements[10]*=d,t.setFromRotationMatrix(Tn),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,r,s,a,o=Gn,c=!1){const l=this.elements,u=2*s/(t-e),d=2*s/(n-r),h=(t+e)/(t-e),p=(n+r)/(n-r);let g,v;if(c)g=s/(a-s),v=a*s/(a-s);else if(o===Gn)g=-(a+s)/(a-s),v=-2*a*s/(a-s);else if(o===ea)g=-a/(a-s),v=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=d,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=Gn,c=!1){const l=this.elements,u=2/(t-e),d=2/(n-r),h=-(t+e)/(t-e),p=-(n+r)/(n-r);let g,v;if(c)g=1/(a-s),v=a/(a-s);else if(o===Gn)g=-2/(a-s),v=-(a+s)/(a-s);else if(o===ea)g=-1/(a-s),v=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=d,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Yi=new V,Tn=new Pt,ym=new V(0,0,0),wm=new V(1,1,1),li=new V,ls=new V,hn=new V,mc=new Pt,gc=new wr;class ki{constructor(e=0,t=0,n=0,r=ki.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],u=r[9],d=r[2],h=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(it(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-it(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(it(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-it(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(it(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-it(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:Ge("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return mc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(mc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return gc.setFromEuler(this),this.setFromQuaternion(gc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ki.DEFAULT_ORDER="XYZ";class nu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Em=0;const xc=new V,qi=new wr,Kn=new Pt,cs=new V,Ir=new V,Am=new V,Tm=new wr,vc=new V(1,0,0),_c=new V(0,1,0),Mc=new V(0,0,1),Sc={type:"added"},Rm={type:"removed"},Ki={type:"childadded",child:null},Oa={type:"childremoved",child:null};class rn extends Gi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Em++}),this.uuid=Qr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=rn.DEFAULT_UP.clone();const e=new V,t=new ki,n=new wr,r=new V(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Pt},normalMatrix:{value:new Ve}}),this.matrix=new Pt,this.matrixWorld=new Pt,this.matrixAutoUpdate=rn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=rn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new nu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return qi.setFromAxisAngle(e,t),this.quaternion.multiply(qi),this}rotateOnWorldAxis(e,t){return qi.setFromAxisAngle(e,t),this.quaternion.premultiply(qi),this}rotateX(e){return this.rotateOnAxis(vc,e)}rotateY(e){return this.rotateOnAxis(_c,e)}rotateZ(e){return this.rotateOnAxis(Mc,e)}translateOnAxis(e,t){return xc.copy(e).applyQuaternion(this.quaternion),this.position.add(xc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(vc,e)}translateY(e){return this.translateOnAxis(_c,e)}translateZ(e){return this.translateOnAxis(Mc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Kn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?cs.copy(e):cs.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Ir.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Kn.lookAt(Ir,cs,this.up):Kn.lookAt(cs,Ir,this.up),this.quaternion.setFromRotationMatrix(Kn),r&&(Kn.extractRotation(r.matrixWorld),qi.setFromRotationMatrix(Kn),this.quaternion.premultiply(qi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(at("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Sc),Ki.child=e,this.dispatchEvent(Ki),Ki.child=null):at("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Rm),Oa.child=e,this.dispatchEvent(Oa),Oa.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Kn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Kn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Kn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Sc),Ki.child=e,this.dispatchEvent(Ki),Ki.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ir,e,Am),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ir,Tm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*r,s[13]+=n-s[1]*t-s[5]*n-s[9]*r,s[14]+=r-s[2]*t-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const d=c[l];s(e.shapes,d)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),d=a(e.shapes),h=a(e.skeletons),p=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=r,n;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}rn.DEFAULT_UP=new V(0,1,0);rn.DEFAULT_MATRIX_AUTO_UPDATE=!0;rn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Hr extends rn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Cm={type:"move"};class Ba{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Hr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Hr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Hr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const v of e.hand.values()){const x=t.getJointPose(v,n),m=this._getHandJoint(l,v);x!==null&&(m.matrix.fromArray(x.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=x.radius),m.visible=x!==null}const u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],h=u.position.distanceTo(d.position),p=.02,g=.005;l.inputState.pinching&&h>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Cm)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Hr;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const iu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ci={h:0,s:0,l:0},hs={h:0,s:0,l:0};function za(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class et{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=bn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,nt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=nt.workingColorSpace){return this.r=e,this.g=t,this.b=n,nt.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=nt.workingColorSpace){if(e=gm(e,1),t=it(t,0,1),n=it(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=za(a,s,e+1/3),this.g=za(a,s,e),this.b=za(a,s,e-1/3)}return nt.colorSpaceToWorking(this,r),this}setStyle(e,t=bn){function n(s){s!==void 0&&parseFloat(s)<1&&Ge("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ge("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Ge("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=bn){const n=iu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ge("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ni(e.r),this.g=ni(e.g),this.b=ni(e.b),this}copyLinearToSRGB(e){return this.r=mr(e.r),this.g=mr(e.g),this.b=mr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=bn){return nt.workingToColorSpace(Qt.copy(this),e),Math.round(it(Qt.r*255,0,255))*65536+Math.round(it(Qt.g*255,0,255))*256+Math.round(it(Qt.b*255,0,255))}getHexString(e=bn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=nt.workingColorSpace){nt.workingToColorSpace(Qt.copy(this),t);const n=Qt.r,r=Qt.g,s=Qt.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const d=a-o;switch(l=u<=.5?d/(a+o):d/(2-a-o),a){case n:c=(r-s)/d+(r<s?6:0);break;case r:c=(s-n)/d+2;break;case s:c=(n-r)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=nt.workingColorSpace){return nt.workingToColorSpace(Qt.copy(this),t),e.r=Qt.r,e.g=Qt.g,e.b=Qt.b,e}getStyle(e=bn){nt.workingToColorSpace(Qt.copy(this),e);const t=Qt.r,n=Qt.g,r=Qt.b;return e!==bn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(ci),this.setHSL(ci.h+e,ci.s+t,ci.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ci),e.getHSL(hs);const n=Da(ci.h,hs.h,t),r=Da(ci.s,hs.s,t),s=Da(ci.l,hs.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Qt=new et;et.NAMES=iu;class bc extends rn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ki,this.environmentIntensity=1,this.environmentRotation=new ki,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Rn=new V,$n=new V,ka=new V,Zn=new V,$i=new V,Zi=new V,yc=new V,Ga=new V,Ha=new V,Va=new V,Wa=new ct,Xa=new ct,Ya=new ct;class Dn{constructor(e=new V,t=new V,n=new V){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Rn.subVectors(e,t),r.cross(Rn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Rn.subVectors(r,t),$n.subVectors(n,t),ka.subVectors(e,t);const a=Rn.dot(Rn),o=Rn.dot($n),c=Rn.dot(ka),l=$n.dot($n),u=$n.dot(ka),d=a*l-o*o;if(d===0)return s.set(0,0,0),null;const h=1/d,p=(l*c-o*u)*h,g=(a*u-o*c)*h;return s.set(1-p-g,g,p)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Zn)===null?!1:Zn.x>=0&&Zn.y>=0&&Zn.x+Zn.y<=1}static getInterpolation(e,t,n,r,s,a,o,c){return this.getBarycoord(e,t,n,r,Zn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Zn.x),c.addScaledVector(a,Zn.y),c.addScaledVector(o,Zn.z),c)}static getInterpolatedAttribute(e,t,n,r,s,a){return Wa.setScalar(0),Xa.setScalar(0),Ya.setScalar(0),Wa.fromBufferAttribute(e,t),Xa.fromBufferAttribute(e,n),Ya.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Wa,s.x),a.addScaledVector(Xa,s.y),a.addScaledVector(Ya,s.z),a}static isFrontFacing(e,t,n,r){return Rn.subVectors(n,t),$n.subVectors(e,t),Rn.cross($n).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Rn.subVectors(this.c,this.b),$n.subVectors(this.a,this.b),Rn.cross($n).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Dn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Dn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return Dn.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return Dn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Dn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let a,o;$i.subVectors(r,n),Zi.subVectors(s,n),Ga.subVectors(e,n);const c=$i.dot(Ga),l=Zi.dot(Ga);if(c<=0&&l<=0)return t.copy(n);Ha.subVectors(e,r);const u=$i.dot(Ha),d=Zi.dot(Ha);if(u>=0&&d<=u)return t.copy(r);const h=c*d-u*l;if(h<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(n).addScaledVector($i,a);Va.subVectors(e,s);const p=$i.dot(Va),g=Zi.dot(Va);if(g>=0&&p<=g)return t.copy(s);const v=p*l-c*g;if(v<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(n).addScaledVector(Zi,o);const x=u*g-p*d;if(x<=0&&d-u>=0&&p-g>=0)return yc.subVectors(s,r),o=(d-u)/(d-u+(p-g)),t.copy(r).addScaledVector(yc,o);const m=1/(x+v+h);return a=v*m,o=h*m,t.copy(n).addScaledVector($i,a).addScaledVector(Zi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Er{constructor(e=new V(1/0,1/0,1/0),t=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Cn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Cn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Cn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Cn):Cn.fromBufferAttribute(s,a),Cn.applyMatrix4(e.matrixWorld),this.expandByPoint(Cn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),us.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),us.copy(n.boundingBox)),us.applyMatrix4(e.matrixWorld),this.union(us)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Cn),Cn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Nr),ds.subVectors(this.max,Nr),Ji.subVectors(e.a,Nr),Qi.subVectors(e.b,Nr),ji.subVectors(e.c,Nr),hi.subVectors(Qi,Ji),ui.subVectors(ji,Qi),yi.subVectors(Ji,ji);let t=[0,-hi.z,hi.y,0,-ui.z,ui.y,0,-yi.z,yi.y,hi.z,0,-hi.x,ui.z,0,-ui.x,yi.z,0,-yi.x,-hi.y,hi.x,0,-ui.y,ui.x,0,-yi.y,yi.x,0];return!qa(t,Ji,Qi,ji,ds)||(t=[1,0,0,0,1,0,0,0,1],!qa(t,Ji,Qi,ji,ds))?!1:(fs.crossVectors(hi,ui),t=[fs.x,fs.y,fs.z],qa(t,Ji,Qi,ji,ds))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Cn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Cn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Jn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Jn=[new V,new V,new V,new V,new V,new V,new V,new V],Cn=new V,us=new Er,Ji=new V,Qi=new V,ji=new V,hi=new V,ui=new V,yi=new V,Nr=new V,ds=new V,fs=new V,wi=new V;function qa(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){wi.fromArray(i,s);const o=r.x*Math.abs(wi.x)+r.y*Math.abs(wi.y)+r.z*Math.abs(wi.z),c=e.dot(wi),l=t.dot(wi),u=n.dot(wi);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const Bt=new V,ps=new He;let Lm=0;class xn extends Gi{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Lm++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=um,this.updateRanges=[],this.gpuType=kn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ps.fromBufferAttribute(this,t),ps.applyMatrix3(e),this.setXY(t,ps.x,ps.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix3(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix4(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyNormalMatrix(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.transformDirection(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Dr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=sn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Dr(t,this.array)),t}setX(e,t){return this.normalized&&(t=sn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Dr(t,this.array)),t}setY(e,t){return this.normalized&&(t=sn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Dr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=sn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Dr(t,this.array)),t}setW(e,t){return this.normalized&&(t=sn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=sn(t,this.array),n=sn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=sn(t,this.array),n=sn(n,this.array),r=sn(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=sn(t,this.array),n=sn(n,this.array),r=sn(r,this.array),s=sn(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class ru extends xn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class su extends xn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Lt extends xn{constructor(e,t,n){super(new Float32Array(e),t,n)}}const Pm=new Er,Ur=new V,Ka=new V;class jr{constructor(e=new V,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Pm.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ur.subVectors(e,this.center);const t=Ur.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Ur,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ka.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ur.copy(e.center).add(Ka)),this.expandByPoint(Ur.copy(e.center).sub(Ka))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Dm=0;const Sn=new Pt,$a=new rn,er=new V,un=new Er,Fr=new Er,Xt=new V;class Gt extends Gi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Dm++}),this.uuid=Qr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(dm(e)?su:ru)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ve().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Sn.makeRotationFromQuaternion(e),this.applyMatrix4(Sn),this}rotateX(e){return Sn.makeRotationX(e),this.applyMatrix4(Sn),this}rotateY(e){return Sn.makeRotationY(e),this.applyMatrix4(Sn),this}rotateZ(e){return Sn.makeRotationZ(e),this.applyMatrix4(Sn),this}translate(e,t,n){return Sn.makeTranslation(e,t,n),this.applyMatrix4(Sn),this}scale(e,t,n){return Sn.makeScale(e,t,n),this.applyMatrix4(Sn),this}lookAt(e){return $a.lookAt(e),$a.updateMatrix(),this.applyMatrix4($a.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(er).negate(),this.translate(er.x,er.y,er.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Lt(n,3))}else{const n=Math.min(e.length,t.count);for(let r=0;r<n;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Ge("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Er);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){at("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];un.setFromBufferAttribute(s),this.morphTargetsRelative?(Xt.addVectors(this.boundingBox.min,un.min),this.boundingBox.expandByPoint(Xt),Xt.addVectors(this.boundingBox.max,un.max),this.boundingBox.expandByPoint(Xt)):(this.boundingBox.expandByPoint(un.min),this.boundingBox.expandByPoint(un.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&at('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new jr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){at("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(e){const n=this.boundingSphere.center;if(un.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Fr.setFromBufferAttribute(o),this.morphTargetsRelative?(Xt.addVectors(un.min,Fr.min),un.expandByPoint(Xt),Xt.addVectors(un.max,Fr.max),un.expandByPoint(Xt)):(un.expandByPoint(Fr.min),un.expandByPoint(Fr.max))}un.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)Xt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Xt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)Xt.fromBufferAttribute(o,l),c&&(er.fromBufferAttribute(e,l),Xt.add(er)),r=Math.max(r,n.distanceToSquared(Xt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&at('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){at("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new xn(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],c=[];for(let S=0;S<n.count;S++)o[S]=new V,c[S]=new V;const l=new V,u=new V,d=new V,h=new He,p=new He,g=new He,v=new V,x=new V;function m(S,A,L){l.fromBufferAttribute(n,S),u.fromBufferAttribute(n,A),d.fromBufferAttribute(n,L),h.fromBufferAttribute(s,S),p.fromBufferAttribute(s,A),g.fromBufferAttribute(s,L),u.sub(l),d.sub(l),p.sub(h),g.sub(h);const R=1/(p.x*g.y-g.x*p.y);isFinite(R)&&(v.copy(u).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(R),x.copy(d).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(R),o[S].add(v),o[A].add(v),o[L].add(v),c[S].add(x),c[A].add(x),c[L].add(x))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let S=0,A=_.length;S<A;++S){const L=_[S],R=L.start,N=L.count;for(let U=R,D=R+N;U<D;U+=3)m(e.getX(U+0),e.getX(U+1),e.getX(U+2))}const M=new V,b=new V,w=new V,E=new V;function P(S){w.fromBufferAttribute(r,S),E.copy(w);const A=o[S];M.copy(A),M.sub(w.multiplyScalar(w.dot(A))).normalize(),b.crossVectors(E,A);const R=b.dot(c[S])<0?-1:1;a.setXYZW(S,M.x,M.y,M.z,R)}for(let S=0,A=_.length;S<A;++S){const L=_[S],R=L.start,N=L.count;for(let U=R,D=R+N;U<D;U+=3)P(e.getX(U+0)),P(e.getX(U+1)),P(e.getX(U+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new xn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,p=n.count;h<p;h++)n.setXYZ(h,0,0,0);const r=new V,s=new V,a=new V,o=new V,c=new V,l=new V,u=new V,d=new V;if(e)for(let h=0,p=e.count;h<p;h+=3){const g=e.getX(h+0),v=e.getX(h+1),x=e.getX(h+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,x),u.subVectors(a,s),d.subVectors(r,s),u.cross(d),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,x),o.add(u),c.add(u),l.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(x,l.x,l.y,l.z)}else for(let h=0,p=t.count;h<p;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,s),d.subVectors(r,s),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Xt.fromBufferAttribute(e,t),Xt.normalize(),e.setXYZ(t,Xt.x,Xt.y,Xt.z)}toNonIndexed(){function e(o,c){const l=o.array,u=o.itemSize,d=o.normalized,h=new l.constructor(c.length*u);let p=0,g=0;for(let v=0,x=c.length;v<x;v++){o.isInterleavedBufferAttribute?p=c[v]*o.data.stride+o.offset:p=c[v]*u;for(let m=0;m<u;m++)h[g++]=l[p++]}return new xn(h,u,d)}if(this.index===null)return Ge("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Gt,n=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=e(c,n);t.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let u=0,d=l.length;u<d;u++){const h=l[u],p=e(h,n);c.push(p)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let d=0,h=l.length;d<h;d++){const p=l[d];u.push(p.toJSON(e.data))}u.length>0&&(r[c]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const r=e.attributes;for(const l in r){const u=r[l];this.setAttribute(l,u.clone(t))}const s=e.morphAttributes;for(const l in s){const u=[],d=s[l];for(let h=0,p=d.length;h<p;h++)u.push(d[h].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,u=a.length;l<u;l++){const d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Za=new V,Im=new V,Nm=new Ve;class pi{constructor(e=new V(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=Za.subVectors(n,t).cross(Im.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const r=e.delta(Za),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Nm.getNormalMatrix(e),r=this.coplanarPoint(Za).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let Um=0;class Ar extends Gi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Um++}),this.uuid=Qr(),this.name="",this.type="Material",this.blending=dr,this.side=Oi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Fh,this.blendDst=Oh,this.blendEquation=or,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new et(0,0,0),this.blendAlpha=0,this.depthFunc=Yr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=rm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=La,this.stencilZFail=La,this.stencilZPass=La,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Ge(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ge(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new et().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new pi().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new He().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new He().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Qn=new V,Ja=new V,ms=new V,gs=new V;class Ll{constructor(e=new V,t=new V(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Qn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Qn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Qn.copy(this.origin).addScaledVector(this.direction,t),Qn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Ja.copy(e).add(t).multiplyScalar(.5),ms.copy(t).sub(e).normalize(),gs.copy(this.origin).sub(Ja);const s=e.distanceTo(t)*.5,a=-this.direction.dot(ms),o=gs.dot(this.direction),c=-gs.dot(ms),l=gs.lengthSq(),u=Math.abs(1-a*a);let d,h,p,g;if(u>0)if(d=a*c-o,h=a*o-c,g=s*u,d>=0)if(h>=-g)if(h<=g){const v=1/u;d*=v,h*=v,p=d*(d+a*h+2*o)+h*(a*d+h+2*c)+l}else h=s,d=Math.max(0,-(a*h+o)),p=-d*d+h*(h+2*c)+l;else h=-s,d=Math.max(0,-(a*h+o)),p=-d*d+h*(h+2*c)+l;else h<=-g?(d=Math.max(0,-(-a*s+o)),h=d>0?-s:Math.min(Math.max(-s,-c),s),p=-d*d+h*(h+2*c)+l):h<=g?(d=0,h=Math.min(Math.max(-s,-c),s),p=h*(h+2*c)+l):(d=Math.max(0,-(a*s+o)),h=d>0?s:Math.min(Math.max(-s,-c),s),p=-d*d+h*(h+2*c)+l);else h=a>0?-s:s,d=Math.max(0,-(a*h+o)),p=-d*d+h*(h+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Ja).addScaledVector(ms,h),p}intersectSphere(e,t){if(e.radius<0)return null;Qn.subVectors(e.center,this.origin);const n=Qn.dot(this.direction),r=Qn.dot(Qn)-n*n,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return l>=0?(n=(e.min.x-h.x)*l,r=(e.max.x-h.x)*l):(n=(e.max.x-h.x)*l,r=(e.min.x-h.x)*l),u>=0?(s=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),d>=0?(o=(e.min.z-h.z)*d,c=(e.max.z-h.z)*d):(o=(e.max.z-h.z)*d,c=(e.min.z-h.z)*d),n>c||o>r)||((o>n||n!==n)&&(n=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Qn)!==null}intersectTriangle(e,t,n,r,s){const a=this.origin,o=this.direction,c=o.x,l=o.y,u=o.z,d=e.x-a.x,h=e.y-a.y,p=e.z-a.z,g=t.x-a.x,v=t.y-a.y,x=t.z-a.z,m=n.x-a.x,_=n.y-a.y,M=n.z-a.z,b=Math.abs(c),w=Math.abs(l),E=Math.abs(u);let P,S,A,L,R,N,U,D,F,z,Y,j;if(b>=w&&b>=E?(A=c,N=d,F=g,j=m,c>=0?(P=l,S=u,L=h,R=p,U=v,D=x,z=_,Y=M):(P=u,S=l,L=p,R=h,U=x,D=v,z=M,Y=_)):w>=E?(A=l,N=h,F=v,j=_,l>=0?(P=u,S=c,L=p,R=d,U=x,D=g,z=M,Y=m):(P=c,S=u,L=d,R=p,U=g,D=x,z=m,Y=M)):(A=u,N=p,F=x,j=M,u>=0?(P=c,S=l,L=d,R=h,U=g,D=v,z=m,Y=_):(P=l,S=c,L=h,R=d,U=v,D=g,z=_,Y=m)),A===0)return null;const X=P/A,te=S/A,O=1/A,re=L-X*N,ce=R-te*N,be=U-X*F,Ue=D-te*F,ke=z-X*j,ee=Y-te*j,se=ke*Ue-ee*be,W=re*ee-ce*ke,he=be*ce-Ue*re;if(r){if(se<0||W<0||he<0)return null}else if((se<0||W<0||he<0)&&(se>0||W>0||he>0))return null;const ae=se+W+he;if(ae===0)return null;const Ee=O*(se*N+W*F+he*j);return(ae>0?Ee<0:Ee>0)?null:this.at(Ee/ae,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class au extends Ar{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new et(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ki,this.combine=Bh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const wc=new Pt,Ei=new Ll,xs=new jr,Ec=new V,vs=new V,_s=new V,Ms=new V,Qa=new V,Ss=new V,Ac=new V,bs=new V;class Yt extends rn{constructor(e=new Gt,t=new au){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Ss.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const u=o[c],d=s[c];u!==0&&(Qa.fromBufferAttribute(d,e),a?Ss.addScaledVector(Qa,u):Ss.addScaledVector(Qa.sub(t),u))}t.add(Ss)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),xs.copy(n.boundingSphere),xs.applyMatrix4(s),Ei.copy(e.ray).recast(e.near),!(xs.containsPoint(Ei.origin)===!1&&(Ei.intersectSphere(xs,Ec)===null||Ei.origin.distanceToSquared(Ec)>(e.far-e.near)**2))&&(wc.copy(s).invert(),Ei.copy(e.ray).applyMatrix4(wc),!(n.boundingBox!==null&&Ei.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ei)))}_computeIntersections(e,t,n){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,h=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=h.length;g<v;g++){const x=h[g],m=a[x.materialIndex],_=Math.max(x.start,p.start),M=Math.min(o.count,Math.min(x.start+x.count,p.start+p.count));for(let b=_,w=M;b<w;b+=3){const E=o.getX(b),P=o.getX(b+1),S=o.getX(b+2);r=ys(this,m,e,n,l,u,d,E,P,S),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=x.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),v=Math.min(o.count,p.start+p.count);for(let x=g,m=v;x<m;x+=3){const _=o.getX(x),M=o.getX(x+1),b=o.getX(x+2);r=ys(this,a,e,n,l,u,d,_,M,b),r&&(r.faceIndex=Math.floor(x/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,v=h.length;g<v;g++){const x=h[g],m=a[x.materialIndex],_=Math.max(x.start,p.start),M=Math.min(c.count,Math.min(x.start+x.count,p.start+p.count));for(let b=_,w=M;b<w;b+=3){const E=b,P=b+1,S=b+2;r=ys(this,m,e,n,l,u,d,E,P,S),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=x.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),v=Math.min(c.count,p.start+p.count);for(let x=g,m=v;x<m;x+=3){const _=x,M=x+1,b=x+2;r=ys(this,a,e,n,l,u,d,_,M,b),r&&(r.faceIndex=Math.floor(x/3),t.push(r))}}}}function Fm(i,e,t,n,r,s,a,o){let c;if(e.side===on?c=n.intersectTriangle(a,s,r,!0,o):c=n.intersectTriangle(r,s,a,e.side===Oi,o),c===null)return null;bs.copy(o),bs.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(bs);return l<t.near||l>t.far?null:{distance:l,point:bs.clone(),object:i}}function ys(i,e,t,n,r,s,a,o,c,l){i.getVertexPosition(o,vs),i.getVertexPosition(c,_s),i.getVertexPosition(l,Ms);const u=Fm(i,e,t,n,vs,_s,Ms,Ac);if(u){const d=new V;Dn.getBarycoord(Ac,vs,_s,Ms,d),r&&(u.uv=Dn.getInterpolatedAttribute(r,o,c,l,d,new He)),s&&(u.uv1=Dn.getInterpolatedAttribute(s,o,c,l,d,new He)),a&&(u.normal=Dn.getInterpolatedAttribute(a,o,c,l,d,new V),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:c,c:l,normal:new V,materialIndex:0};Dn.getNormal(vs,_s,Ms,h.normal),u.face=h,u.barycoord=d}return u}class cr extends en{constructor(e=null,t=1,n=1,r,s,a,o,c,l=Ut,u=Ut,d,h){super(null,a,o,c,l,u,r,s,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Pl extends xn{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ai=new jr,Om=new He(.5,.5),ws=new V;class na{constructor(e=new pi,t=new pi,n=new pi,r=new pi,s=new pi,a=new pi){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Gn,n=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],u=s[4],d=s[5],h=s[6],p=s[7],g=s[8],v=s[9],x=s[10],m=s[11],_=s[12],M=s[13],b=s[14],w=s[15];if(r[0].setComponents(l-a,p-u,m-g,w-_).normalize(),r[1].setComponents(l+a,p+u,m+g,w+_).normalize(),r[2].setComponents(l+o,p+d,m+v,w+M).normalize(),r[3].setComponents(l-o,p-d,m-v,w-M).normalize(),n)r[4].setComponents(c,h,x,b).normalize(),r[5].setComponents(l-c,p-h,m-x,w-b).normalize();else if(r[4].setComponents(l-c,p-h,m-x,w-b).normalize(),t===Gn)r[5].setComponents(l+c,p+h,m+x,w+b).normalize();else if(t===ea)r[5].setComponents(c,h,x,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ai.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ai.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ai)}intersectsSprite(e){Ai.center.set(0,0,0);const t=Om.distanceTo(e.center);return Ai.radius=.7071067811865476+t,Ai.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ai)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(ws.x=r.normal.x>0?e.max.x:e.min.x,ws.y=r.normal.y>0?e.max.y:e.min.y,ws.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ws)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ou extends Ar{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new et(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ia=new V,ra=new V,Tc=new Pt,Or=new Ll,Es=new jr,ja=new V,Rc=new V;class Bm extends rn{constructor(e=new Gt,t=new ou){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)ia.fromBufferAttribute(t,r-1),ra.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=ia.distanceTo(ra);e.setAttribute("lineDistance",new Lt(n,1))}else Ge("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Es.copy(n.boundingSphere),Es.applyMatrix4(r),Es.radius+=s,e.ray.intersectsSphere(Es)===!1)return;Tc.copy(r).invert(),Or.copy(e.ray).applyMatrix4(Tc);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=n.index,h=n.attributes.position;if(u!==null){const p=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let v=p,x=g-1;v<x;v+=l){const m=u.getX(v),_=u.getX(v+1),M=As(this,e,Or,c,m,_,v);M&&t.push(M)}if(this.isLineLoop){const v=u.getX(g-1),x=u.getX(p),m=As(this,e,Or,c,v,x,g-1);m&&t.push(m)}}else{const p=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let v=p,x=g-1;v<x;v+=l){const m=As(this,e,Or,c,v,v+1,v);m&&t.push(m)}if(this.isLineLoop){const v=As(this,e,Or,c,g-1,p,g-1);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function As(i,e,t,n,r,s,a){const o=i.geometry.attributes.position;if(ia.fromBufferAttribute(o,r),ra.fromBufferAttribute(o,s),t.distanceSqToSegment(ia,ra,ja,Rc)>n)return;ja.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(ja);if(!(l<e.near||l>e.far))return{distance:l,point:Rc.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const Cc=new V,Lc=new V;class Dl extends Bm{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)Cc.fromBufferAttribute(t,r),Lc.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+Cc.distanceTo(Lc);e.setAttribute("lineDistance",new Lt(n,1))}else Ge("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class zm extends Ar{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new et(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Pc=new Pt,nl=new Ll,Ts=new jr,Rs=new V;class sa extends rn{constructor(e=new Gt,t=new zm){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ts.copy(n.boundingSphere),Ts.applyMatrix4(r),Ts.radius+=s,e.ray.intersectsSphere(Ts)===!1)return;Pc.copy(r).invert(),nl.copy(e.ray).applyMatrix4(Pc);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,d=n.attributes.position;if(l!==null){const h=Math.max(0,a.start),p=Math.min(l.count,a.start+a.count);for(let g=h,v=p;g<v;g++){const x=l.getX(g);Rs.fromBufferAttribute(d,x),Dc(Rs,x,c,r,e,t,this)}}else{const h=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let g=h,v=p;g<v;g++)Rs.fromBufferAttribute(d,g),Dc(Rs,g,c,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Dc(i,e,t,n,r,s,a){const o=nl.distanceSqToPoint(i);if(o<t){const c=new V;nl.closestPointToPoint(i,c),c.applyMatrix4(n);const l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class lu extends en{constructor(e=[],t=Bi,n,r,s,a,o,c,l,u){super(e,t,n,r,s,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class km extends en{constructor(e,t,n,r,s,a,o,c,l){super(e,t,n,r,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Sr extends en{constructor(e,t,n=Wn,r,s,a,o=Ut,c=Ut,l,u=ii,d=1){if(u!==ii&&u!==Ii)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:d};super(h,r,s,a,o,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Cl(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class Gm extends Sr{constructor(e,t=Wn,n=Bi,r,s,a=Ut,o=Ut,c,l=ii){const u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,r,s,a,o,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class cu extends en{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class es extends Gt{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],u=[],d=[];let h=0,p=0;g("z","y","x",-1,-1,n,t,e,a,s,0),g("z","y","x",1,-1,n,t,-e,a,s,1),g("x","z","y",1,1,e,n,t,r,a,2),g("x","z","y",1,-1,e,n,-t,r,a,3),g("x","y","z",1,-1,e,t,n,r,s,4),g("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(c),this.setAttribute("position",new Lt(l,3)),this.setAttribute("normal",new Lt(u,3)),this.setAttribute("uv",new Lt(d,2));function g(v,x,m,_,M,b,w,E,P,S,A){const L=b/P,R=w/S,N=b/2,U=w/2,D=E/2,F=P+1,z=S+1;let Y=0,j=0;const X=new V;for(let te=0;te<z;te++){const O=te*R-U;for(let re=0;re<F;re++){const ce=re*L-N;X[v]=ce*_,X[x]=O*M,X[m]=D,l.push(X.x,X.y,X.z),X[v]=0,X[x]=0,X[m]=E>0?1:-1,u.push(X.x,X.y,X.z),d.push(re/P),d.push(1-te/S),Y+=1}}for(let te=0;te<S;te++)for(let O=0;O<P;O++){const re=h+O+F*te,ce=h+O+F*(te+1),be=h+(O+1)+F*(te+1),Ue=h+(O+1)+F*te;c.push(re,ce,Ue),c.push(ce,be,Ue),j+=6}o.addGroup(p,j,A),p+=j,h+=Y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new es(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class _n extends Gt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(n),c=Math.floor(r),l=o+1,u=c+1,d=e/o,h=t/c,p=[],g=[],v=[],x=[];for(let m=0;m<u;m++){const _=m*h-a;for(let M=0;M<l;M++){const b=M*d-s;g.push(b,-_,0),v.push(0,0,1),x.push(M/o),x.push(1-m/c)}}for(let m=0;m<c;m++)for(let _=0;_<o;_++){const M=_+l*m,b=_+l*(m+1),w=_+1+l*(m+1),E=_+1+l*m;p.push(M,b,E),p.push(b,w,E)}this.setIndex(p),this.setAttribute("position",new Lt(g,3)),this.setAttribute("normal",new Lt(v,3)),this.setAttribute("uv",new Lt(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _n(e.width,e.height,e.widthSegments,e.heightSegments)}}function br(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];if(Ic(r))r.isRenderTargetTexture?(Ge("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone();else if(Array.isArray(r))if(Ic(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][n]=s}else e[t][n]=r.slice();else e[t][n]=r}}return e}function nn(i){const e={};for(let t=0;t<i.length;t++){const n=br(i[t]);for(const r in n)e[r]=n[r]}return e}function Ic(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Hm(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function hu(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:nt.workingColorSpace}const Vm={clone:br,merge:nn};var Wm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Xm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class At extends Ar{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Wm,this.fragmentShader=Xm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=br(e.uniforms),this.uniformsGroups=Hm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case"t":this.uniforms[n].value=t[r.value]||null;break;case"c":this.uniforms[n].value=new et().setHex(r.value);break;case"v2":this.uniforms[n].value=new He().fromArray(r.value);break;case"v3":this.uniforms[n].value=new V().fromArray(r.value);break;case"v4":this.uniforms[n].value=new ct().fromArray(r.value);break;case"m3":this.uniforms[n].value=new Ve().fromArray(r.value);break;case"m4":this.uniforms[n].value=new Pt().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Ym extends At{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class qm extends Ar{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=nm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Km extends Ar{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Cs=new V,Ls=new wr,On=new V;class uu extends rn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Pt,this.projectionMatrix=new Pt,this.projectionMatrixInverse=new Pt,this.coordinateSystem=Gn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Cs,Ls,On),On.x===1&&On.y===1&&On.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Cs,Ls,On.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Cs,Ls,On),On.x===1&&On.y===1&&On.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Cs,Ls,On.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const di=new V,Nc=new He,Uc=new He;class dn extends uu{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=tl*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Pa*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return tl*2*Math.atan(Math.tan(Pa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){di.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(di.x,di.y).multiplyScalar(-e/di.z),di.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(di.x,di.y).multiplyScalar(-e/di.z)}getViewSize(e,t){return this.getViewBounds(e,Nc,Uc),t.subVectors(Uc,Nc)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Pa*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,t-=a.offsetY*n/l,r*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Il extends uu{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Nl extends Gt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}const tr=-90,nr=1;class $m extends rn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new dn(tr,nr,e,t);r.layers=this.layers,this.add(r);const s=new dn(tr,nr,e,t);s.layers=this.layers,this.add(s);const a=new dn(tr,nr,e,t);a.layers=this.layers,this.add(a);const o=new dn(tr,nr,e,t);o.layers=this.layers,this.add(o);const c=new dn(tr,nr,e,t);c.layers=this.layers,this.add(c);const l=new dn(tr,nr,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,c]=t;for(const l of t)this.remove(l);if(e===Gn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===ea)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let x=!1;e.isWebGLRenderer===!0?x=e.state.buffers.depth.getReversed():x=e.reversedDepthBuffer,e.setRenderTarget(n,0,r),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,r),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,r),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,r),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,h,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Zm extends dn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class du{static{du.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=r,this}}function Fc(i,e,t,n){const r=Jm(n);switch(t){case Jh:return i*e;case jh:return i*e/r.components*r.byteLength;case wl:return i*e/r.components*r.byteLength;case zi:return i*e*2/r.components*r.byteLength;case El:return i*e*2/r.components*r.byteLength;case Qh:return i*e*3/r.components*r.byteLength;case pn:return i*e*4/r.components*r.byteLength;case Al:return i*e*4/r.components*r.byteLength;case Hs:case Vs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ws:case Xs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ao:case Ro:return Math.max(i,16)*Math.max(e,8)/4;case Eo:case To:return Math.max(i,8)*Math.max(e,8)/2;case Co:case Lo:case Do:case Io:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Po:case Js:case No:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Uo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Fo:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Oo:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Bo:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case zo:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case ko:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Go:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Ho:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Vo:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Wo:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Xo:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Yo:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case qo:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Ko:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case $o:case Zo:case Jo:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Qo:case jo:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Qs:case el:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Jm(i){switch(i){case fn:case qh:return{byteLength:1,components:1};case qr:case Kh:case Xn:return{byteLength:2,components:1};case bl:case yl:return{byteLength:2,components:4};case Wn:case Sl:case kn:return{byteLength:4,components:1};case $h:case Zh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:xl}}));typeof window<"u"&&(window.__THREE__?Ge("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=xl);function fu(){let i=null,e=!1,t=null,n=null;function r(s,a){n=i.requestAnimationFrame(r),t(s,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function Qm(i){const e=new WeakMap;function t(o,c){const l=o.array,u=o.usage,d=l.byteLength,h=i.createBuffer();i.bindBuffer(c,h),i.bufferData(c,l,u),o.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,c,l){const u=c.array,d=c.updateRanges;if(i.bindBuffer(l,o),d.length===0)i.bufferSubData(l,0,u);else{d.sort((p,g)=>p.start-g.start);let h=0;for(let p=1;p<d.length;p++){const g=d[h],v=d[p];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++h,d[h]=v)}d.length=h+1;for(let p=0,g=d.length;p<g;p++){const v=d[p];i.bufferSubData(l,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:r,remove:s,update:a}}var jm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,eg=`#ifdef USE_ALPHAHASH
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
#endif`,tg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ng=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ig=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,rg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,sg=`#ifdef USE_AOMAP
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
#endif`,ag=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,og=`#ifdef USE_BATCHING
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
#endif`,lg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,cg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,hg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ug=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,dg=`#ifdef USE_IRIDESCENCE
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
#endif`,fg=`#ifdef USE_BUMPMAP
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
#endif`,pg=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,mg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,gg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,xg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,vg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,_g=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Mg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Sg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,bg=`#define PI 3.141592653589793
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
} // validated`,yg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,wg=`vec3 transformedNormal = objectNormal;
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
#endif`,Eg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ag=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Tg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Rg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Cg="gl_FragColor = linearToOutputTexel( gl_FragColor );",Lg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Pg=`#ifdef USE_ENVMAP
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
#endif`,Dg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Ig=`#ifdef USE_ENVMAP
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
#endif`,Ng=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ug=`#ifdef USE_ENVMAP
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
#endif`,Fg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Og=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Bg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,zg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,kg=`#ifdef USE_GRADIENTMAP
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
}`,Gg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Hg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Vg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Wg=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Xg=`#ifdef USE_ENVMAP
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
#endif`,Yg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,qg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Kg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,$g=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Zg=`PhysicalMaterial material;
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
#endif`,Jg=`uniform sampler2D dfgLUT;
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
}`,Qg=`
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
#endif`,jg=`#if defined( RE_IndirectDiffuse )
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
#endif`,e1=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,t1=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,n1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,i1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,r1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,s1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,a1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,o1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,l1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,c1=`#if defined( USE_POINTS_UV )
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
#endif`,h1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,u1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,d1=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,f1=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,p1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,m1=`#ifdef USE_MORPHTARGETS
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
#endif`,g1=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,x1=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,v1=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,_1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,M1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,S1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,b1=`#ifdef USE_NORMALMAP
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
#endif`,y1=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,w1=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,E1=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,A1=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,T1=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,R1=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,C1=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,L1=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,P1=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,D1=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,I1=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,N1=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,U1=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,F1=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,O1=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,B1=`float getShadowMask() {
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
}`,z1=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,k1=`#ifdef USE_SKINNING
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
#endif`,G1=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,H1=`#ifdef USE_SKINNING
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
#endif`,V1=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,W1=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,X1=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Y1=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,q1=`#ifdef USE_TRANSMISSION
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
#endif`,K1=`#ifdef USE_TRANSMISSION
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
#endif`,$1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Z1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,J1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Q1=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const j1=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ex=`uniform sampler2D t2D;
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
}`,tx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,nx=`#ifdef ENVMAP_TYPE_CUBE
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
}`,ix=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sx=`#include <common>
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
}`,ax=`#if DEPTH_PACKING == 3200
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
}`,ox=`#define DISTANCE
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
}`,lx=`#define DISTANCE
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
}`,cx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,hx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ux=`uniform float scale;
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
}`,dx=`uniform vec3 diffuse;
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
}`,fx=`#include <common>
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
}`,px=`uniform vec3 diffuse;
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
}`,mx=`#define LAMBERT
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
}`,gx=`#define LAMBERT
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
}`,xx=`#define MATCAP
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
}`,vx=`#define MATCAP
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
}`,_x=`#define NORMAL
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
}`,Mx=`#define NORMAL
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
}`,Sx=`#define PHONG
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
}`,bx=`#define PHONG
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
}`,yx=`#define STANDARD
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
}`,wx=`#define STANDARD
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
}`,Ex=`#define TOON
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
}`,Ax=`#define TOON
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
}`,Tx=`uniform float size;
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
}`,Rx=`uniform vec3 diffuse;
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
}`,Cx=`#include <common>
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
}`,Lx=`uniform vec3 color;
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
}`,Px=`uniform float rotation;
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
}`,Dx=`uniform vec3 diffuse;
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
}`,je={alphahash_fragment:jm,alphahash_pars_fragment:eg,alphamap_fragment:tg,alphamap_pars_fragment:ng,alphatest_fragment:ig,alphatest_pars_fragment:rg,aomap_fragment:sg,aomap_pars_fragment:ag,batching_pars_vertex:og,batching_vertex:lg,begin_vertex:cg,beginnormal_vertex:hg,bsdfs:ug,iridescence_fragment:dg,bumpmap_pars_fragment:fg,clipping_planes_fragment:pg,clipping_planes_pars_fragment:mg,clipping_planes_pars_vertex:gg,clipping_planes_vertex:xg,color_fragment:vg,color_pars_fragment:_g,color_pars_vertex:Mg,color_vertex:Sg,common:bg,cube_uv_reflection_fragment:yg,defaultnormal_vertex:wg,displacementmap_pars_vertex:Eg,displacementmap_vertex:Ag,emissivemap_fragment:Tg,emissivemap_pars_fragment:Rg,colorspace_fragment:Cg,colorspace_pars_fragment:Lg,envmap_fragment:Pg,envmap_common_pars_fragment:Dg,envmap_pars_fragment:Ig,envmap_pars_vertex:Ng,envmap_physical_pars_fragment:Xg,envmap_vertex:Ug,fog_vertex:Fg,fog_pars_vertex:Og,fog_fragment:Bg,fog_pars_fragment:zg,gradientmap_pars_fragment:kg,lightmap_pars_fragment:Gg,lights_lambert_fragment:Hg,lights_lambert_pars_fragment:Vg,lights_pars_begin:Wg,lights_toon_fragment:Yg,lights_toon_pars_fragment:qg,lights_phong_fragment:Kg,lights_phong_pars_fragment:$g,lights_physical_fragment:Zg,lights_physical_pars_fragment:Jg,lights_fragment_begin:Qg,lights_fragment_maps:jg,lights_fragment_end:e1,lightprobes_pars_fragment:t1,logdepthbuf_fragment:n1,logdepthbuf_pars_fragment:i1,logdepthbuf_pars_vertex:r1,logdepthbuf_vertex:s1,map_fragment:a1,map_pars_fragment:o1,map_particle_fragment:l1,map_particle_pars_fragment:c1,metalnessmap_fragment:h1,metalnessmap_pars_fragment:u1,morphinstance_vertex:d1,morphcolor_vertex:f1,morphnormal_vertex:p1,morphtarget_pars_vertex:m1,morphtarget_vertex:g1,normal_fragment_begin:x1,normal_fragment_maps:v1,normal_pars_fragment:_1,normal_pars_vertex:M1,normal_vertex:S1,normalmap_pars_fragment:b1,clearcoat_normal_fragment_begin:y1,clearcoat_normal_fragment_maps:w1,clearcoat_pars_fragment:E1,iridescence_pars_fragment:A1,opaque_fragment:T1,packing:R1,premultiplied_alpha_fragment:C1,project_vertex:L1,dithering_fragment:P1,dithering_pars_fragment:D1,roughnessmap_fragment:I1,roughnessmap_pars_fragment:N1,shadowmap_pars_fragment:U1,shadowmap_pars_vertex:F1,shadowmap_vertex:O1,shadowmask_pars_fragment:B1,skinbase_vertex:z1,skinning_pars_vertex:k1,skinning_vertex:G1,skinnormal_vertex:H1,specularmap_fragment:V1,specularmap_pars_fragment:W1,tonemapping_fragment:X1,tonemapping_pars_fragment:Y1,transmission_fragment:q1,transmission_pars_fragment:K1,uv_pars_fragment:$1,uv_pars_vertex:Z1,uv_vertex:J1,worldpos_vertex:Q1,background_vert:j1,background_frag:ex,backgroundCube_vert:tx,backgroundCube_frag:nx,cube_vert:ix,cube_frag:rx,depth_vert:sx,depth_frag:ax,distance_vert:ox,distance_frag:lx,equirect_vert:cx,equirect_frag:hx,linedashed_vert:ux,linedashed_frag:dx,meshbasic_vert:fx,meshbasic_frag:px,meshlambert_vert:mx,meshlambert_frag:gx,meshmatcap_vert:xx,meshmatcap_frag:vx,meshnormal_vert:_x,meshnormal_frag:Mx,meshphong_vert:Sx,meshphong_frag:bx,meshphysical_vert:yx,meshphysical_frag:wx,meshtoon_vert:Ex,meshtoon_frag:Ax,points_vert:Tx,points_frag:Rx,shadow_vert:Cx,shadow_frag:Lx,sprite_vert:Px,sprite_frag:Dx},ve={common:{diffuse:{value:new et(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},envMapRotation:{value:new Ve},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new He(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new et(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new V},probesMax:{value:new V},probesResolution:{value:new V}},points:{diffuse:{value:new et(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new et(16777215)},opacity:{value:1},center:{value:new He(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},zn={basic:{uniforms:nn([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.fog]),vertexShader:je.meshbasic_vert,fragmentShader:je.meshbasic_frag},lambert:{uniforms:nn([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new et(0)},envMapIntensity:{value:1}}]),vertexShader:je.meshlambert_vert,fragmentShader:je.meshlambert_frag},phong:{uniforms:nn([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new et(0)},specular:{value:new et(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:je.meshphong_vert,fragmentShader:je.meshphong_frag},standard:{uniforms:nn([ve.common,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.roughnessmap,ve.metalnessmap,ve.fog,ve.lights,{emissive:{value:new et(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag},toon:{uniforms:nn([ve.common,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.gradientmap,ve.fog,ve.lights,{emissive:{value:new et(0)}}]),vertexShader:je.meshtoon_vert,fragmentShader:je.meshtoon_frag},matcap:{uniforms:nn([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,{matcap:{value:null}}]),vertexShader:je.meshmatcap_vert,fragmentShader:je.meshmatcap_frag},points:{uniforms:nn([ve.points,ve.fog]),vertexShader:je.points_vert,fragmentShader:je.points_frag},dashed:{uniforms:nn([ve.common,ve.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:je.linedashed_vert,fragmentShader:je.linedashed_frag},depth:{uniforms:nn([ve.common,ve.displacementmap]),vertexShader:je.depth_vert,fragmentShader:je.depth_frag},normal:{uniforms:nn([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,{opacity:{value:1}}]),vertexShader:je.meshnormal_vert,fragmentShader:je.meshnormal_frag},sprite:{uniforms:nn([ve.sprite,ve.fog]),vertexShader:je.sprite_vert,fragmentShader:je.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:je.background_vert,fragmentShader:je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ve}},vertexShader:je.backgroundCube_vert,fragmentShader:je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:je.cube_vert,fragmentShader:je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:je.equirect_vert,fragmentShader:je.equirect_frag},distance:{uniforms:nn([ve.common,ve.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:je.distance_vert,fragmentShader:je.distance_frag},shadow:{uniforms:nn([ve.lights,ve.fog,{color:{value:new et(0)},opacity:{value:1}}]),vertexShader:je.shadow_vert,fragmentShader:je.shadow_frag}};zn.physical={uniforms:nn([zn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new He(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new et(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new He},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new et(0)},specularColor:{value:new et(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new He},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag};const Ps={r:0,b:0,g:0},Ix=new Pt,pu=new Ve;pu.set(-1,0,0,0,1,0,0,0,1);function Nx(i,e,t,n,r,s){const a=new et(0);let o=r===!0?0:1,c,l,u=null,d=0,h=null;function p(_){let M=_.isScene===!0?_.background:null;if(M&&M.isTexture){const b=_.backgroundBlurriness>0;M=e.get(M,b)}return M}function g(_){let M=!1;const b=p(_);b===null?x(a,o):b&&b.isColor&&(x(b,1),M=!0);const w=i.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,s):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(i.autoClear||M)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function v(_,M){const b=p(M);b&&(b.isCubeTexture||b.mapping===ga)?(l===void 0&&(l=new Yt(new es(1,1,1),new At({name:"BackgroundCubeMaterial",uniforms:br(zn.backgroundCube.uniforms),vertexShader:zn.backgroundCube.vertexShader,fragmentShader:zn.backgroundCube.fragmentShader,side:on,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(w,E,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=b,l.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Ix.makeRotationFromEuler(M.backgroundRotation)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(pu),l.material.toneMapped=nt.getTransfer(b.colorSpace)!==gt,(u!==b||d!==b.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,u=b,d=b.version,h=i.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null)):b&&b.isTexture&&(c===void 0&&(c=new Yt(new _n(2,2),new At({name:"BackgroundMaterial",uniforms:br(zn.background.uniforms),vertexShader:zn.background.vertexShader,fragmentShader:zn.background.fragmentShader,side:Oi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=b,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=nt.getTransfer(b.colorSpace)!==gt,b.matrixAutoUpdate===!0&&b.updateMatrix(),c.material.uniforms.uvTransform.value.copy(b.matrix),(u!==b||d!==b.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,u=b,d=b.version,h=i.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null))}function x(_,M){_.getRGB(Ps,hu(i)),t.buffers.color.setClear(Ps.r,Ps.g,Ps.b,M,s)}function m(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(_,M=1){a.set(_),o=M,x(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(_){o=_,x(a,o)},render:g,addToRenderList:v,dispose:m}}function Ux(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=h(null);let s=r,a=!1;function o(R,N,U,D,F){let z=!1;const Y=d(R,D,U,N);s!==Y&&(s=Y,l(s.object)),z=p(R,D,U,F),z&&g(R,D,U,F),F!==null&&e.update(F,i.ELEMENT_ARRAY_BUFFER),(z||a)&&(a=!1,b(R,N,U,D),F!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(F).buffer))}function c(){return i.createVertexArray()}function l(R){return i.bindVertexArray(R)}function u(R){return i.deleteVertexArray(R)}function d(R,N,U,D){const F=D.wireframe===!0;let z=n[N.id];z===void 0&&(z={},n[N.id]=z);const Y=R.isInstancedMesh===!0?R.id:0;let j=z[Y];j===void 0&&(j={},z[Y]=j);let X=j[U.id];X===void 0&&(X={},j[U.id]=X);let te=X[F];return te===void 0&&(te=h(c()),X[F]=te),te}function h(R){const N=[],U=[],D=[];for(let F=0;F<t;F++)N[F]=0,U[F]=0,D[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:U,attributeDivisors:D,object:R,attributes:{},index:null}}function p(R,N,U,D){const F=s.attributes,z=N.attributes;let Y=0;const j=U.getAttributes();for(const X in j)if(j[X].location>=0){const O=F[X];let re=z[X];if(re===void 0&&(X==="instanceMatrix"&&R.instanceMatrix&&(re=R.instanceMatrix),X==="instanceColor"&&R.instanceColor&&(re=R.instanceColor)),O===void 0||O.attribute!==re||re&&O.data!==re.data)return!0;Y++}return s.attributesNum!==Y||s.index!==D}function g(R,N,U,D){const F={},z=N.attributes;let Y=0;const j=U.getAttributes();for(const X in j)if(j[X].location>=0){let O=z[X];O===void 0&&(X==="instanceMatrix"&&R.instanceMatrix&&(O=R.instanceMatrix),X==="instanceColor"&&R.instanceColor&&(O=R.instanceColor));const re={};re.attribute=O,O&&O.data&&(re.data=O.data),F[X]=re,Y++}s.attributes=F,s.attributesNum=Y,s.index=D}function v(){const R=s.newAttributes;for(let N=0,U=R.length;N<U;N++)R[N]=0}function x(R){m(R,0)}function m(R,N){const U=s.newAttributes,D=s.enabledAttributes,F=s.attributeDivisors;U[R]=1,D[R]===0&&(i.enableVertexAttribArray(R),D[R]=1),F[R]!==N&&(i.vertexAttribDivisor(R,N),F[R]=N)}function _(){const R=s.newAttributes,N=s.enabledAttributes;for(let U=0,D=N.length;U<D;U++)N[U]!==R[U]&&(i.disableVertexAttribArray(U),N[U]=0)}function M(R,N,U,D,F,z,Y){Y===!0?i.vertexAttribIPointer(R,N,U,F,z):i.vertexAttribPointer(R,N,U,D,F,z)}function b(R,N,U,D){v();const F=D.attributes,z=U.getAttributes(),Y=N.defaultAttributeValues;for(const j in z){const X=z[j];if(X.location>=0){let te=F[j];if(te===void 0&&(j==="instanceMatrix"&&R.instanceMatrix&&(te=R.instanceMatrix),j==="instanceColor"&&R.instanceColor&&(te=R.instanceColor)),te!==void 0){const O=te.normalized,re=te.itemSize,ce=e.get(te);if(ce===void 0)continue;const be=ce.buffer,Ue=ce.type,ke=ce.bytesPerElement,ee=Ue===i.INT||Ue===i.UNSIGNED_INT||te.gpuType===Sl;if(te.isInterleavedBufferAttribute){const se=te.data,W=se.stride,he=te.offset;if(se.isInstancedInterleavedBuffer){for(let ae=0;ae<X.locationSize;ae++)m(X.location+ae,se.meshPerAttribute);R.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let ae=0;ae<X.locationSize;ae++)x(X.location+ae);i.bindBuffer(i.ARRAY_BUFFER,be);for(let ae=0;ae<X.locationSize;ae++)M(X.location+ae,re/X.locationSize,Ue,O,W*ke,(he+re/X.locationSize*ae)*ke,ee)}else{if(te.isInstancedBufferAttribute){for(let se=0;se<X.locationSize;se++)m(X.location+se,te.meshPerAttribute);R.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let se=0;se<X.locationSize;se++)x(X.location+se);i.bindBuffer(i.ARRAY_BUFFER,be);for(let se=0;se<X.locationSize;se++)M(X.location+se,re/X.locationSize,Ue,O,re*ke,re/X.locationSize*se*ke,ee)}}else if(Y!==void 0){const O=Y[j];if(O!==void 0)switch(O.length){case 2:i.vertexAttrib2fv(X.location,O);break;case 3:i.vertexAttrib3fv(X.location,O);break;case 4:i.vertexAttrib4fv(X.location,O);break;default:i.vertexAttrib1fv(X.location,O)}}}}_()}function w(){A();for(const R in n){const N=n[R];for(const U in N){const D=N[U];for(const F in D){const z=D[F];for(const Y in z)u(z[Y].object),delete z[Y];delete D[F]}}delete n[R]}}function E(R){if(n[R.id]===void 0)return;const N=n[R.id];for(const U in N){const D=N[U];for(const F in D){const z=D[F];for(const Y in z)u(z[Y].object),delete z[Y];delete D[F]}}delete n[R.id]}function P(R){for(const N in n){const U=n[N];for(const D in U){const F=U[D];if(F[R.id]===void 0)continue;const z=F[R.id];for(const Y in z)u(z[Y].object),delete z[Y];delete F[R.id]}}}function S(R){for(const N in n){const U=n[N],D=R.isInstancedMesh===!0?R.id:0,F=U[D];if(F!==void 0){for(const z in F){const Y=F[z];for(const j in Y)u(Y[j].object),delete Y[j];delete F[z]}delete U[D],Object.keys(U).length===0&&delete n[N]}}}function A(){L(),a=!0,s!==r&&(s=r,l(s.object))}function L(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:A,resetDefaultState:L,dispose:w,releaseStatesOfGeometry:E,releaseStatesOfObject:S,releaseStatesOfProgram:P,initAttributes:v,enableAttribute:x,disableUnusedAttributes:_}}function Fx(i,e,t){let n;function r(c){n=c}function s(c,l){i.drawArrays(n,c,l),t.update(l,n,1)}function a(c,l,u){u!==0&&(i.drawArraysInstanced(n,c,l,u),t.update(l,n,u))}function o(c,l,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,u);let h=0;for(let p=0;p<u;p++)h+=l[p];t.update(h,n,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function Ox(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(P){return!(P!==pn&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){const S=P===Xn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==fn&&P!==kn&&!S&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(P){if(P==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(Ge("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const d=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&Ge("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),x=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),_=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),b=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=i.getParameter(i.MAX_SAMPLES),E=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:p,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:x,maxAttributes:m,maxVertexUniforms:_,maxVaryings:M,maxFragmentUniforms:b,maxSamples:w,samples:E}}function Bx(i){const e=this;let t=null,n=0,r=!1,s=!1;const a=new pi,o=new Ve,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const p=d.length!==0||h||n!==0||r;return r=h,n=d.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,p){const g=d.clippingPlanes,v=d.clipIntersection,x=d.clipShadows,m=i.get(d);if(!r||g===null||g.length===0||s&&!x)s?u(null):l();else{const _=s?0:n,M=_*4;let b=m.clippingState||null;c.value=b,b=u(g,h,M,p);for(let w=0;w!==M;++w)b[w]=t[w];m.clippingState=b,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=_}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,h,p,g){const v=d!==null?d.length:0;let x=null;if(v!==0){if(x=c.value,g!==!0||x===null){const m=p+v*4,_=h.matrixWorldInverse;o.getNormalMatrix(_),(x===null||x.length<m)&&(x=new Float32Array(m));for(let M=0,b=p;M!==v;++M,b+=4)a.copy(d[M]).applyMatrix4(_,o),a.normal.toArray(x,b),x[b+3]=a.constant}c.value=x,c.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,x}}const hr=4,zx=6,kx=20,Gx=256,Br=new Il,Oc=new et;let eo=null,to=0,no=0,io=!1;const Hx=new V,Ti=new V;class Bc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){const{size:a=256,position:o=Hx}=s;eo=this._renderer.getRenderTarget(),to=this._renderer.getActiveCubeFace(),no=this._renderer.getActiveMipmapLevel(),io=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,r,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Gc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=kc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(eo,to,no),this._renderer.xr.enabled=io,e.scissorTest=!1,ir(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Bi||e.mapping===Mr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),eo=this._renderer.getRenderTarget(),to=this._renderer.getActiveCubeFace(),no=this._renderer.getActiveMipmapLevel(),io=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Nt,minFilter:Nt,generateMipmaps:!1,type:Xn,format:pn,colorSpace:$r,depthBuffer:!1},r=zc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=zc(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Vx(s)),this._blurMaterial=Xx(s,e,t),this._ggxMaterial=Wx(s,e,t)}return r}_compileMaterial(e){const t=new Yt(new Gt,e);this._renderer.compile(t,Br)}_sceneToCubeUV(e,t,n,r,s){const c=new dn(90,1,t,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,p=d.toneMapping;d.getClearColor(Oc),d.toneMapping=Vn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Yt(new es,new au({name:"PMREM.Background",side:on,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,x=v.material;let m=!1;const _=e.background;_?_.isColor&&(x.color.copy(_),e.background=null,m=!0):(x.color.copy(Oc),m=!0);for(let M=0;M<6;M++){const b=M%3;b===0?(c.up.set(0,l[M],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+u[M],s.y,s.z)):b===1?(c.up.set(0,0,l[M]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+u[M],s.z)):(c.up.set(0,l[M],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+u[M]));const w=this._cubeSize;ir(r,b*w,M>2?w:0,w,w),d.setRenderTarget(r),m&&d.render(v,c),d.render(e,c)}d.toneMapping=p,d.autoClear=h,e.background=_}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===Bi||e.mapping===Mr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Gc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=kc());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const c=this._cubeSize;ir(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,Br)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const c=a.uniforms,l=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(l*l-u*u),h=l*1.25,p=d*h,{_lodMax:g}=this,v=this._sizeLods[n],x=3*v*(n>g-hr?n-g+hr:0),m=4*(this._cubeSize-v);c.envMap.value=e.texture,c.roughness.value=p,c.mipInt.value=g-t,ir(s,x,m,3*v,2*v),r.setRenderTarget(s),r.render(o,Br),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=g-n,ir(e,x,m,3*v,2*v),r.setRenderTarget(e),r.render(o,Br)}_blur(e,t,n,r){const s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,n,a),this._blurPass(s,e,n,n,a)}_blurPass(e,t,n,r,s){const a=this._renderer,o=this._blurMaterial,c=this._lodMeshes[r];c.material=o;const l=o.uniforms;l.envMap.value=e.texture,l.sigma.value=s,l.mipInt.value=this._lodMax-n;const u=this._sizeLods[r],d=3*u*(r>this._lodMax-hr?r-this._lodMax+hr:0),h=4*(this._cubeSize-u);ir(t,d,h,3*u,2*u),a.setRenderTarget(t),a.render(c,Br)}}function Vx(i){const e=[],t=[];let n=i;const r=i-hr+1+zx;for(let s=0;s<r;s++){const a=Math.pow(2,n);e.push(a);const o=1/(a-2),c=-o,l=1+o,u=[c,c,l,c,l,l,c,c,l,l,c,l],d=6,h=6,p=3,g=new Float32Array(p*h*d),v=new Float32Array(p*h*d);for(let m=0;m<d;m++){const _=m%3*2/3-1,M=m>2?0:-1,b=[_,M,0,_+2/3,M,0,_+2/3,M+1,0,_,M,0,_+2/3,M+1,0,_,M+1,0];g.set(b,p*h*m);for(let w=0;w<h;w++){const E=u[w*2]*2-1,P=u[w*2+1]*2-1;m===0?Ti.set(1,P,E):m===1?Ti.set(-E,1,-P):m===2?Ti.set(-E,P,1):m===3?Ti.set(-1,P,-E):m===4?Ti.set(-E,-1,P):Ti.set(E,P,-1),Ti.toArray(v,(m*h+w)*p)}}const x=new Gt;x.setAttribute("position",new xn(g,p)),x.setAttribute("outputDirection",new xn(v,p)),t.push(new Yt(x,null)),n>hr&&n--}return{lodMeshes:t,sizeLods:e}}function zc(i,e,t){const n=new wn(i,e,t);return n.texture.mapping=ga,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ir(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function Wx(i,e,t){return new At({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Gx,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:xa(),fragmentShader:`

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
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function Xx(i,e,t){return new At({name:"SphericalGaussianBlur",defines:{SAMPLES:kx,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:xa(),fragmentShader:`

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
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function kc(){return new At({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:xa(),fragmentShader:`

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
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function Gc(){return new At({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:xa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function xa(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class mu extends wn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new lu(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new es(5,5,5),s=new At({name:"CubemapFromEquirect",uniforms:br(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:on,blending:Hn});s.uniforms.tEquirect.value=t;const a=new Yt(r,s),o=t.minFilter;return t.minFilter===Di&&(t.minFilter=Nt),new $m(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}}function Yx(i){let e=new WeakMap,t=new WeakMap,n=null;function r(h,p=!1){return h==null?null:p?a(h):s(h)}function s(h){if(h&&h.isTexture){const p=h.mapping;if(p===Ta||p===Ra)if(e.has(h)){const g=e.get(h).texture;return o(g,h.mapping)}else{const g=h.image;if(g&&g.height>0){const v=new mu(g.height);return v.fromEquirectangularTexture(i,h),e.set(h,v),h.addEventListener("dispose",l),o(v.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){const p=h.mapping,g=p===Ta||p===Ra,v=p===Bi||p===Mr;if(g||v){let x=t.get(h);const m=x!==void 0?x.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==m)return n===null&&(n=new Bc(i)),x=g?n.fromEquirectangular(h,x):n.fromCubemap(h,x),x.texture.pmremVersion=h.pmremVersion,t.set(h,x),x.texture;if(x!==void 0)return x.texture;{const _=h.image;return g&&_&&_.height>0||v&&_&&c(_)?(n===null&&(n=new Bc(i)),x=g?n.fromEquirectangular(h):n.fromCubemap(h),x.texture.pmremVersion=h.pmremVersion,t.set(h,x),h.addEventListener("dispose",u),x.texture):null}}}return h}function o(h,p){return p===Ta?h.mapping=Bi:p===Ra&&(h.mapping=Mr),h}function c(h){let p=0;const g=6;for(let v=0;v<g;v++)h[v]!==void 0&&p++;return p===g}function l(h){const p=h.target;p.removeEventListener("dispose",l);const g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function u(h){const p=h.target;p.removeEventListener("dispose",u);const g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:d}}function qx(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&pr("WebGLRenderer: "+n+" extension not supported."),r}}}function Kx(i,e,t,n){const r={},s=new WeakMap;function a(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",a),delete r[h.id];const p=s.get(h);p&&(e.remove(p),s.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(d,h){return r[h.id]===!0||(h.addEventListener("dispose",a),r[h.id]=!0,t.memory.geometries++),h}function c(d){const h=d.attributes;for(const p in h)e.update(h[p],i.ARRAY_BUFFER)}function l(d){const h=[],p=d.index,g=d.attributes.position;let v=0;if(g===void 0)return;if(p!==null){const _=p.array;v=p.version;for(let M=0,b=_.length;M<b;M+=3){const w=_[M+0],E=_[M+1],P=_[M+2];h.push(w,E,E,P,P,w)}}else{const _=g.array;v=g.version;for(let M=0,b=_.length/3-1;M<b;M+=3){const w=M+0,E=M+1,P=M+2;h.push(w,E,E,P,P,w)}}const x=new(g.count>=65535?su:ru)(h,1);x.version=v;const m=s.get(d);m&&e.remove(m),s.set(d,x)}function u(d){const h=s.get(d);if(h){const p=d.index;p!==null&&h.version<p.version&&l(d)}else l(d);return s.get(d)}return{get:o,update:c,getWireframeAttribute:u}}function $x(i,e,t){let n;function r(d){n=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function c(d,h){i.drawElements(n,h,s,d*a),t.update(h,n,1)}function l(d,h,p){p!==0&&(i.drawElementsInstanced(n,h,s,d*a,p),t.update(h,n,p))}function u(d,h,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,s,d,0,p);let v=0;for(let x=0;x<p;x++)v+=h[x];t.update(v,n,1)}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Zx(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:at("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function Jx(i,e,t){const n=new WeakMap,r=new ct;function s(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let h=n.get(o);if(h===void 0||h.count!==d){let A=function(){P.dispose(),n.delete(o),o.removeEventListener("dispose",A)};h!==void 0&&h.texture.dispose();const p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,x=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],_=o.morphAttributes.color||[];let M=0;p===!0&&(M=1),g===!0&&(M=2),v===!0&&(M=3);let b=o.attributes.position.count*M,w=1;b>e.maxTextureSize&&(w=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const E=new Float32Array(b*w*4*d),P=new tu(E,b,w,d);P.type=kn,P.needsUpdate=!0;const S=M*4;for(let L=0;L<d;L++){const R=x[L],N=m[L],U=_[L],D=b*w*4*L;for(let F=0;F<R.count;F++){const z=F*S;p===!0&&(r.fromBufferAttribute(R,F),E[D+z+0]=r.x,E[D+z+1]=r.y,E[D+z+2]=r.z,E[D+z+3]=0),g===!0&&(r.fromBufferAttribute(N,F),E[D+z+4]=r.x,E[D+z+5]=r.y,E[D+z+6]=r.z,E[D+z+7]=0),v===!0&&(r.fromBufferAttribute(U,F),E[D+z+8]=r.x,E[D+z+9]=r.y,E[D+z+10]=r.z,E[D+z+11]=U.itemSize===4?r.w:1)}}h={count:d,texture:P,size:new He(b,w)},n.set(o,h),o.addEventListener("dispose",A)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let p=0;for(let v=0;v<l.length;v++)p+=l[v];const g=o.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:s}}function Qx(i,e,t,n,r){let s=new WeakMap;function a(l){const u=r.render.frame,d=l.geometry,h=e.get(l,d);if(s.get(h)!==u&&(e.update(h),s.set(h,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),s.get(l)!==u&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,u))),l.isSkinnedMesh){const p=l.skeleton;s.get(p)!==u&&(p.update(),s.set(p,u))}return h}function o(){s=new WeakMap}function c(l){const u=l.target;u.removeEventListener("dispose",c),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const jx={[zh]:"LINEAR_TONE_MAPPING",[kh]:"REINHARD_TONE_MAPPING",[Gh]:"CINEON_TONE_MAPPING",[Hh]:"ACES_FILMIC_TONE_MAPPING",[Wh]:"AGX_TONE_MAPPING",[Xh]:"NEUTRAL_TONE_MAPPING",[Vh]:"CUSTOM_TONE_MAPPING"};function ev(i,e,t,n,r,s){const a=new wn(e,t,{type:i,depthBuffer:r,stencilBuffer:s,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,c=null;const l=new Gt;l.setAttribute("position",new Lt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Lt([0,2,0,0,2,0],2));const u=new Ym({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new Yt(l,u),h=new Il(-1,1,1,-1,0,1);let p=null,g=null,v=!1,x,m=null,_=[],M=!1;this.setSize=function(b,w){a.setSize(b,w),o!==null&&o.setSize(b,w),c!==null&&c.setSize(b,w);for(let E=0;E<_.length;E++){const P=_[E];P.setSize&&P.setSize(b,w)}},this.setEffects=function(b){_=b,M=_.length>0&&_[0].isRenderPass===!0;const w=a.width,E=a.height;_.length>0&&o===null&&(o=new wn(w,E,{type:Xn,depthBuffer:!1,stencilBuffer:!1}),c=new wn(w,E,{type:Xn,depthBuffer:!1,stencilBuffer:!1}));for(let P=0;P<_.length;P++){const S=_[P];S.setSize&&S.setSize(w,E)}},this.begin=function(b,w){if(v||b.toneMapping===Vn&&_.length===0)return!1;if(m=w,w!==null){const E=w.width,P=w.height;(a.width!==E||a.height!==P)&&this.setSize(E,P)}return M===!1&&b.setRenderTarget(a),x=b.toneMapping,b.toneMapping=Vn,!0},this.hasRenderPass=function(){return M},this.end=function(b,w){b.toneMapping=x,v=!0;let E=a,P=o;for(let S=0;S<_.length;S++){const A=_[S];A.enabled!==!1&&(A.render(b,P,E,w),A.needsSwap!==!1&&(E=P,P=P===o?c:o))}if(p!==b.outputColorSpace||g!==b.toneMapping){p=b.outputColorSpace,g=b.toneMapping,u.defines={},nt.getTransfer(p)===gt&&(u.defines.SRGB_TRANSFER="");const S=jx[g];S&&(u.defines[S]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=E.texture,b.setRenderTarget(m),b.render(d,h),m=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}const gu=new en,il=new Sr(1,1),xu=new tu,vu=new bm,_u=new lu,Hc=[],Vc=[],Wc=new Float32Array(16),Xc=new Float32Array(9),Yc=new Float32Array(4);function Tr(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=Hc[r];if(s===void 0&&(s=new Float32Array(r),Hc[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function Ht(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Vt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function va(i,e){let t=Vc[e];t===void 0&&(t=new Int32Array(e),Vc[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function tv(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function nv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;i.uniform2fv(this.addr,e),Vt(t,e)}}function iv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ht(t,e))return;i.uniform3fv(this.addr,e),Vt(t,e)}}function rv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;i.uniform4fv(this.addr,e),Vt(t,e)}}function sv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ht(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Vt(t,e)}else{if(Ht(t,n))return;Yc.set(n),i.uniformMatrix2fv(this.addr,!1,Yc),Vt(t,n)}}function av(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ht(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Vt(t,e)}else{if(Ht(t,n))return;Xc.set(n),i.uniformMatrix3fv(this.addr,!1,Xc),Vt(t,n)}}function ov(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ht(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Vt(t,e)}else{if(Ht(t,n))return;Wc.set(n),i.uniformMatrix4fv(this.addr,!1,Wc),Vt(t,n)}}function lv(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function cv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;i.uniform2iv(this.addr,e),Vt(t,e)}}function hv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ht(t,e))return;i.uniform3iv(this.addr,e),Vt(t,e)}}function uv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;i.uniform4iv(this.addr,e),Vt(t,e)}}function dv(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function fv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;i.uniform2uiv(this.addr,e),Vt(t,e)}}function pv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ht(t,e))return;i.uniform3uiv(this.addr,e),Vt(t,e)}}function mv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;i.uniform4uiv(this.addr,e),Vt(t,e)}}function gv(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(il.compareFunction=t.isReversedDepthBuffer()?Rl:Tl,s=il):s=gu,t.setTexture2D(e||s,r)}function xv(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||vu,r)}function vv(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||_u,r)}function _v(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||xu,r)}function Mv(i){switch(i){case 5126:return tv;case 35664:return nv;case 35665:return iv;case 35666:return rv;case 35674:return sv;case 35675:return av;case 35676:return ov;case 5124:case 35670:return lv;case 35667:case 35671:return cv;case 35668:case 35672:return hv;case 35669:case 35673:return uv;case 5125:return dv;case 36294:return fv;case 36295:return pv;case 36296:return mv;case 35678:case 36198:case 36298:case 36306:case 35682:return gv;case 35679:case 36299:case 36307:return xv;case 35680:case 36300:case 36308:case 36293:return vv;case 36289:case 36303:case 36311:case 36292:return _v}}function Sv(i,e){i.uniform1fv(this.addr,e)}function bv(i,e){const t=Tr(e,this.size,2);i.uniform2fv(this.addr,t)}function yv(i,e){const t=Tr(e,this.size,3);i.uniform3fv(this.addr,t)}function wv(i,e){const t=Tr(e,this.size,4);i.uniform4fv(this.addr,t)}function Ev(i,e){const t=Tr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Av(i,e){const t=Tr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Tv(i,e){const t=Tr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Rv(i,e){i.uniform1iv(this.addr,e)}function Cv(i,e){i.uniform2iv(this.addr,e)}function Lv(i,e){i.uniform3iv(this.addr,e)}function Pv(i,e){i.uniform4iv(this.addr,e)}function Dv(i,e){i.uniform1uiv(this.addr,e)}function Iv(i,e){i.uniform2uiv(this.addr,e)}function Nv(i,e){i.uniform3uiv(this.addr,e)}function Uv(i,e){i.uniform4uiv(this.addr,e)}function Fv(i,e,t){const n=this.cache,r=e.length,s=va(t,r);Ht(n,s)||(i.uniform1iv(this.addr,s),Vt(n,s));let a;this.type===i.SAMPLER_2D_SHADOW?a=il:a=gu;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function Ov(i,e,t){const n=this.cache,r=e.length,s=va(t,r);Ht(n,s)||(i.uniform1iv(this.addr,s),Vt(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||vu,s[a])}function Bv(i,e,t){const n=this.cache,r=e.length,s=va(t,r);Ht(n,s)||(i.uniform1iv(this.addr,s),Vt(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||_u,s[a])}function zv(i,e,t){const n=this.cache,r=e.length,s=va(t,r);Ht(n,s)||(i.uniform1iv(this.addr,s),Vt(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||xu,s[a])}function kv(i){switch(i){case 5126:return Sv;case 35664:return bv;case 35665:return yv;case 35666:return wv;case 35674:return Ev;case 35675:return Av;case 35676:return Tv;case 5124:case 35670:return Rv;case 35667:case 35671:return Cv;case 35668:case 35672:return Lv;case 35669:case 35673:return Pv;case 5125:return Dv;case 36294:return Iv;case 36295:return Nv;case 36296:return Uv;case 35678:case 36198:case 36298:case 36306:case 35682:return Fv;case 35679:case 36299:case 36307:return Ov;case 35680:case 36300:case 36308:case 36293:return Bv;case 36289:case 36303:case 36311:case 36292:return zv}}class Gv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Mv(t.type)}}class Hv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=kv(t.type)}}class Vv{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],n)}}}const ro=/(\w+)(\])?(\[|\.)?/g;function qc(i,e){i.seq.push(e),i.map[e.id]=e}function Wv(i,e,t){const n=i.name,r=n.length;for(ro.lastIndex=0;;){const s=ro.exec(n),a=ro.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===r){qc(t,l===void 0?new Gv(o,i,e):new Hv(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new Vv(o),qc(t,d)),t=d}}}class Ys{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);Wv(o,c,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&n.push(a)}return n}}function Kc(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Xv=37297;let Yv=0;function qv(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const $c=new Ve;function Kv(i){nt._getMatrix($c,nt.workingColorSpace,i);const e=`mat3( ${$c.elements.map(t=>t.toFixed(4))} )`;switch(nt.getTransfer(i)){case js:return[e,"LinearTransferOETF"];case gt:return[e,"sRGBTransferOETF"];default:return Ge("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Zc(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+qv(i.getShaderSource(e),o)}else return s}function $v(i,e){const t=Kv(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Zv={[zh]:"Linear",[kh]:"Reinhard",[Gh]:"Cineon",[Hh]:"ACESFilmic",[Wh]:"AgX",[Xh]:"Neutral",[Vh]:"Custom"};function Jv(i,e){const t=Zv[e];return t===void 0?(Ge("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ds=new V;function Qv(){nt.getLuminanceCoefficients(Ds);const i=Ds.x.toFixed(4),e=Ds.y.toFixed(4),t=Ds.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function jv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Vr).join(`
`)}function e_(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function t_(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),a=s.name;let o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Vr(i){return i!==""}function Jc(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Qc(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const n_=/^[ \t]*#include +<([\w\d./]+)>/gm;function rl(i){return i.replace(n_,r_)}const i_=new Map;function r_(i,e){let t=je[e];if(t===void 0){const n=i_.get(e);if(n!==void 0)t=je[n],Ge('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return rl(t)}const s_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function jc(i){return i.replace(s_,a_)}function a_(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function eh(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}const o_={[Gs]:"SHADOWMAP_TYPE_PCF",[Gr]:"SHADOWMAP_TYPE_VSM"};function l_(i){return o_[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const c_={[Bi]:"ENVMAP_TYPE_CUBE",[Mr]:"ENVMAP_TYPE_CUBE",[ga]:"ENVMAP_TYPE_CUBE_UV"};function h_(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":c_[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const u_={[Mr]:"ENVMAP_MODE_REFRACTION"};function d_(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":u_[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const f_={[Bh]:"ENVMAP_BLENDING_MULTIPLY",[j0]:"ENVMAP_BLENDING_MIX",[em]:"ENVMAP_BLENDING_ADD"};function p_(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":f_[i.combine]||"ENVMAP_BLENDING_NONE"}function m_(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function g_(i,e,t,n){const r=i.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=l_(t),l=h_(t),u=d_(t),d=p_(t),h=m_(t),p=jv(t),g=e_(s),v=r.createProgram();let x,m,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(x=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Vr).join(`
`),x.length>0&&(x+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Vr).join(`
`),m.length>0&&(m+=`
`)):(x=[eh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Vr).join(`
`),m=[eh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Vn?"#define TONE_MAPPING":"",t.toneMapping!==Vn?je.tonemapping_pars_fragment:"",t.toneMapping!==Vn?Jv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",je.colorspace_pars_fragment,$v("linearToOutputTexel",t.outputColorSpace),Qv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Vr).join(`
`)),a=rl(a),a=Jc(a,t),a=Qc(a,t),o=rl(o),o=Jc(o,t),o=Qc(o,t),a=jc(a),o=jc(o),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,x=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,m=["#define varying in",t.glslVersion===cc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===cc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const M=_+x+a,b=_+m+o,w=Kc(r,r.VERTEX_SHADER,M),E=Kc(r,r.FRAGMENT_SHADER,b);r.attachShader(v,w),r.attachShader(v,E),t.index0AttributeName!==void 0?r.bindAttribLocation(v,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function P(R){if(i.debug.checkShaderErrors){const N=r.getProgramInfoLog(v)||"",U=r.getShaderInfoLog(w)||"",D=r.getShaderInfoLog(E)||"",F=N.trim(),z=U.trim(),Y=D.trim();let j=!0,X=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(j=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,v,w,E);else{const te=Zc(r,w,"vertex"),O=Zc(r,E,"fragment");at("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+F+`
`+te+`
`+O)}else F!==""?Ge("WebGLProgram: Program Info Log:",F):(z===""||Y==="")&&(X=!1);X&&(R.diagnostics={runnable:j,programLog:F,vertexShader:{log:z,prefix:x},fragmentShader:{log:Y,prefix:m}})}r.deleteShader(w),r.deleteShader(E),S=new Ys(r,v),A=t_(r,v)}let S;this.getUniforms=function(){return S===void 0&&P(this),S};let A;this.getAttributes=function(){return A===void 0&&P(this),A};let L=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=r.getProgramParameter(v,Xv)),L},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Yv++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=w,this.fragmentShader=E,this}let x_=0;class v_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new __(e),t.set(e,n)),n}}class __{constructor(e){this.id=x_++,this.code=e,this.usedTimes=0}}function M_(i){return i===zi||i===Js||i===Qs}function S_(i,e,t,n,r,s){const a=new nu,o=new v_,c=new Set,l=[],u=new Map,d=n.logarithmicDepthBuffer;let h=n.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(S){return c.add(S),S===0?"uv":`uv${S}`}function v(S,A,L,R,N,U){const D=R.fog,F=N.geometry,z=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?R.environment:null,Y=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap,j=e.get(S.envMap||z,Y),X=j&&j.mapping===ga?j.image.height:null,te=p[S.type];S.precision!==null&&(h=n.getMaxPrecision(S.precision),h!==S.precision&&Ge("WebGLProgram.getParameters:",S.precision,"not supported, using",h,"instead."));const O=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,re=O!==void 0?O.length:0;let ce=0;F.morphAttributes.position!==void 0&&(ce=1),F.morphAttributes.normal!==void 0&&(ce=2),F.morphAttributes.color!==void 0&&(ce=3);let be,Ue,ke,ee;if(te){const yt=zn[te];be=yt.vertexShader,Ue=yt.fragmentShader}else{be=S.vertexShader,Ue=S.fragmentShader;const yt=o.getVertexShaderStage(S),ht=o.getFragmentShaderStage(S);o.update(S,yt,ht),ke=yt.id,ee=ht.id}const se=i.getRenderTarget(),W=i.state.buffers.depth.getReversed(),he=N.isInstancedMesh===!0,ae=N.isBatchedMesh===!0,Ee=!!S.map,Ze=!!S.matcap,Ce=!!j,Fe=!!S.aoMap,qe=!!S.lightMap,Xe=!!S.bumpMap&&S.wireframe===!1,Mt=!!S.normalMap,Dt=!!S.displacementMap,Wt=!!S.emissiveMap,xt=!!S.metalnessMap,St=!!S.roughnessMap,G=S.anisotropy>0,Je=S.clearcoat>0,ze=S.dispersion>0,I=S.retroreflectivity>0,y=S.iridescence>0,B=S.sheen>0,q=S.transmission>0,Z=G&&!!S.anisotropyMap,le=Je&&!!S.clearcoatMap,ue=Je&&!!S.clearcoatNormalMap,Q=Je&&!!S.clearcoatRoughnessMap,ne=y&&!!S.iridescenceMap,de=y&&!!S.iridescenceThicknessMap,Le=B&&!!S.sheenColorMap,xe=B&&!!S.sheenRoughnessMap,fe=!!S.specularMap,Ie=!!S.specularColorMap,Be=!!S.specularIntensityMap,Ke=q&&!!S.transmissionMap,H=q&&!!S.thicknessMap,pe=!!S.gradientMap,ie=!!S.alphaMap,me=S.alphaTest>0,Se=!!S.alphaHash,oe=!!S.extensions;let Ne=Vn;S.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(Ne=i.toneMapping);const Pe={shaderID:te,shaderType:S.type,shaderName:S.name,vertexShader:be,fragmentShader:Ue,defines:S.defines,customVertexShaderID:ke,customFragmentShaderID:ee,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:h,batching:ae,batchingColor:ae&&N._colorsTexture!==null,instancing:he,instancingColor:he&&N.instanceColor!==null,instancingMorph:he&&N.morphTexture!==null,outputColorSpace:se===null?i.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:nt.workingColorSpace,alphaToCoverage:!!S.alphaToCoverage,map:Ee,matcap:Ze,envMap:Ce,envMapMode:Ce&&j.mapping,envMapCubeUVHeight:X,aoMap:Fe,lightMap:qe,bumpMap:Xe,normalMap:Mt,displacementMap:Dt,emissiveMap:Wt,normalMapObjectSpace:Mt&&S.normalMapType===im,normalMapTangentSpace:Mt&&S.normalMapType===lc,packedNormalMap:Mt&&S.normalMapType===lc&&M_(S.normalMap.format),metalnessMap:xt,roughnessMap:St,anisotropy:G,anisotropyMap:Z,clearcoat:Je,clearcoatMap:le,clearcoatNormalMap:ue,clearcoatRoughnessMap:Q,dispersion:ze,retroreflection:I,iridescence:y,iridescenceMap:ne,iridescenceThicknessMap:de,sheen:B,sheenColorMap:Le,sheenRoughnessMap:xe,specularMap:fe,specularColorMap:Ie,specularIntensityMap:Be,transmission:q,transmissionMap:Ke,thicknessMap:H,gradientMap:pe,opaque:S.transparent===!1&&S.blending===dr&&S.alphaToCoverage===!1,alphaMap:ie,alphaTest:me,alphaHash:Se,combine:S.combine,mapUv:Ee&&g(S.map.channel),aoMapUv:Fe&&g(S.aoMap.channel),lightMapUv:qe&&g(S.lightMap.channel),bumpMapUv:Xe&&g(S.bumpMap.channel),normalMapUv:Mt&&g(S.normalMap.channel),displacementMapUv:Dt&&g(S.displacementMap.channel),emissiveMapUv:Wt&&g(S.emissiveMap.channel),metalnessMapUv:xt&&g(S.metalnessMap.channel),roughnessMapUv:St&&g(S.roughnessMap.channel),anisotropyMapUv:Z&&g(S.anisotropyMap.channel),clearcoatMapUv:le&&g(S.clearcoatMap.channel),clearcoatNormalMapUv:ue&&g(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&g(S.clearcoatRoughnessMap.channel),iridescenceMapUv:ne&&g(S.iridescenceMap.channel),iridescenceThicknessMapUv:de&&g(S.iridescenceThicknessMap.channel),sheenColorMapUv:Le&&g(S.sheenColorMap.channel),sheenRoughnessMapUv:xe&&g(S.sheenRoughnessMap.channel),specularMapUv:fe&&g(S.specularMap.channel),specularColorMapUv:Ie&&g(S.specularColorMap.channel),specularIntensityMapUv:Be&&g(S.specularIntensityMap.channel),transmissionMapUv:Ke&&g(S.transmissionMap.channel),thicknessMapUv:H&&g(S.thicknessMap.channel),alphaMapUv:ie&&g(S.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(Mt||G),vertexNormals:!!F.attributes.normal,vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!F.attributes.uv&&(Ee||ie),fog:!!D,useFog:S.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:S.wireframe===!1&&(S.flatShading===!0||F.attributes.normal===void 0&&Mt===!1&&(S.isMeshLambertMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isMeshPhysicalMaterial)),sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:W,skinning:N.isSkinnedMesh===!0,hasPositionAttribute:F.attributes.position!==void 0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:re,morphTextureStride:ce,numSunLights:A.sun.length,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numSunLightShadows:A.sunShadowMap.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:U.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ne,decodeVideoTexture:Ee&&S.map.isVideoTexture===!0&&nt.getTransfer(S.map.colorSpace)===gt,decodeVideoTextureEmissive:Wt&&S.emissiveMap.isVideoTexture===!0&&nt.getTransfer(S.emissiveMap.colorSpace)===gt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===jn,flipSided:S.side===on,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:oe&&S.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(oe&&S.extensions.multiDraw===!0||ae)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Pe.vertexUv1s=c.has(1),Pe.vertexUv2s=c.has(2),Pe.vertexUv3s=c.has(3),c.clear(),Pe}function x(S){const A=[];if(S.shaderID?A.push(S.shaderID):(A.push(S.customVertexShaderID),A.push(S.customFragmentShaderID)),S.defines!==void 0)for(const L in S.defines)A.push(L),A.push(S.defines[L]);return S.isRawShaderMaterial===!1&&(m(A,S),_(A,S),A.push(i.outputColorSpace)),A.push(S.customProgramCacheKey),A.join()}function m(S,A){S.push(A.precision),S.push(A.outputColorSpace),S.push(A.envMapMode),S.push(A.envMapCubeUVHeight),S.push(A.mapUv),S.push(A.alphaMapUv),S.push(A.lightMapUv),S.push(A.aoMapUv),S.push(A.bumpMapUv),S.push(A.normalMapUv),S.push(A.displacementMapUv),S.push(A.emissiveMapUv),S.push(A.metalnessMapUv),S.push(A.roughnessMapUv),S.push(A.anisotropyMapUv),S.push(A.clearcoatMapUv),S.push(A.clearcoatNormalMapUv),S.push(A.clearcoatRoughnessMapUv),S.push(A.iridescenceMapUv),S.push(A.iridescenceThicknessMapUv),S.push(A.sheenColorMapUv),S.push(A.sheenRoughnessMapUv),S.push(A.specularMapUv),S.push(A.specularColorMapUv),S.push(A.specularIntensityMapUv),S.push(A.transmissionMapUv),S.push(A.thicknessMapUv),S.push(A.combine),S.push(A.fogExp2),S.push(A.sizeAttenuation),S.push(A.morphTargetsCount),S.push(A.morphAttributeCount),S.push(A.numSunLights),S.push(A.numDirLights),S.push(A.numPointLights),S.push(A.numSpotLights),S.push(A.numSpotLightMaps),S.push(A.numHemiLights),S.push(A.numRectAreaLights),S.push(A.numSunLightShadows),S.push(A.numDirLightShadows),S.push(A.numPointLightShadows),S.push(A.numSpotLightShadows),S.push(A.numSpotLightShadowsWithMaps),S.push(A.numLightProbes),S.push(A.shadowMapType),S.push(A.toneMapping),S.push(A.numClippingPlanes),S.push(A.numClipIntersection),S.push(A.depthPacking)}function _(S,A){a.disableAll(),A.instancing&&a.enable(0),A.instancingColor&&a.enable(1),A.instancingMorph&&a.enable(2),A.matcap&&a.enable(3),A.envMap&&a.enable(4),A.normalMapObjectSpace&&a.enable(5),A.normalMapTangentSpace&&a.enable(6),A.clearcoat&&a.enable(7),A.iridescence&&a.enable(8),A.alphaTest&&a.enable(9),A.vertexColors&&a.enable(10),A.vertexAlphas&&a.enable(11),A.vertexUv1s&&a.enable(12),A.vertexUv2s&&a.enable(13),A.vertexUv3s&&a.enable(14),A.vertexTangents&&a.enable(15),A.anisotropy&&a.enable(16),A.alphaHash&&a.enable(17),A.batching&&a.enable(18),A.dispersion&&a.enable(19),A.retroreflection&&a.enable(24),A.batchingColor&&a.enable(20),A.gradientMap&&a.enable(21),A.packedNormalMap&&a.enable(22),A.vertexNormals&&a.enable(23),S.push(a.mask),a.disableAll(),A.fog&&a.enable(0),A.useFog&&a.enable(1),A.flatShading&&a.enable(2),A.logarithmicDepthBuffer&&a.enable(3),A.reversedDepthBuffer&&a.enable(4),A.skinning&&a.enable(5),A.morphTargets&&a.enable(6),A.morphNormals&&a.enable(7),A.morphColors&&a.enable(8),A.premultipliedAlpha&&a.enable(9),A.shadowMapEnabled&&a.enable(10),A.doubleSided&&a.enable(11),A.flipSided&&a.enable(12),A.useDepthPacking&&a.enable(13),A.dithering&&a.enable(14),A.transmission&&a.enable(15),A.sheen&&a.enable(16),A.opaque&&a.enable(17),A.pointsUvs&&a.enable(18),A.decodeVideoTexture&&a.enable(19),A.decodeVideoTextureEmissive&&a.enable(20),A.alphaToCoverage&&a.enable(21),A.numLightProbeGrids>0&&a.enable(22),A.hasPositionAttribute&&a.enable(23),S.push(a.mask)}function M(S){const A=p[S.type];let L;if(A){const R=zn[A];L=Vm.clone(R.uniforms)}else L=S.uniforms;return L}function b(S,A){let L=u.get(A);return L!==void 0?++L.usedTimes:(L=new g_(i,A,S,r),l.push(L),u.set(A,L)),L}function w(S){if(--S.usedTimes===0){const A=l.indexOf(S);l[A]=l[l.length-1],l.pop(),u.delete(S.cacheKey),S.destroy()}}function E(S){o.remove(S)}function P(){o.dispose()}return{getParameters:v,getProgramCacheKey:x,getUniforms:M,acquireProgram:b,releaseProgram:w,releaseShaderCache:E,programs:l,dispose:P}}function b_(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function r(a,o,c){i.get(a)[o]=c}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function y_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function th(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function nh(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(h){let p=0;return h.isInstancedMesh&&(p+=2),h.isSkinnedMesh&&(p+=1),p}function o(h,p,g,v,x,m){let _=i[e];return _===void 0?(_={id:h.id,object:h,geometry:p,material:g,materialVariant:a(h),groupOrder:v,renderOrder:h.renderOrder,z:x,group:m},i[e]=_):(_.id=h.id,_.object=h,_.geometry=p,_.material=g,_.materialVariant=a(h),_.groupOrder=v,_.renderOrder=h.renderOrder,_.z=x,_.group=m),e++,_}function c(h,p,g,v,x,m,_){_.reversedDepth===!0&&(x=-x);const M=o(h,p,g,v,x,m);g.transmission>0?n.push(M):g.transparent===!0?r.push(M):t.push(M)}function l(h,p,g,v,x,m){const _=o(h,p,g,v,x,m);g.transmission>0?n.unshift(_):g.transparent===!0?r.unshift(_):t.unshift(_)}function u(h,p){t.length>1&&t.sort(h||y_),n.length>1&&n.sort(p||th),r.length>1&&r.sort(p||th)}function d(){for(let h=e,p=i.length;h<p;h++){const g=i[h];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:c,unshift:l,finish:d,sort:u}}function w_(){let i=new WeakMap;function e(n,r){const s=i.get(n);let a;return s===void 0?(a=new nh,i.set(n,[a])):r>=s.length?(a=new nh,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function E_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new V,color:new et};break;case"SpotLight":t={position:new V,direction:new V,color:new et,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new V,color:new et,distance:0,decay:0};break;case"HemisphereLight":t={direction:new V,skyColor:new et,groundColor:new et};break;case"RectAreaLight":t={color:new et,position:new V,halfWidth:new V,halfHeight:new V};break}return i[e.id]=t,t}}}function A_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let T_=0;function R_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function C_(i){const e=new E_,t=A_(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new V);const r=new V,s=new Pt,a=new Pt;function o(l){let u=0,d=0,h=0;for(let N=0;N<9;N++)n.probe[N].set(0,0,0);let p=0,g=0,v=0,x=0,m=0,_=0,M=0,b=0,w=0,E=0,P=0,S=0,A=0,L=0;l.sort(R_);for(let N=0,U=l.length;N<U;N++){const D=l[N],F=D.color,z=D.intensity,Y=D.distance;let j=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===zi?j=D.shadow.map.texture:j=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)u+=F.r*z,d+=F.g*z,h+=F.b*z;else if(D.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(D.sh.coefficients[X],z);L++}else if(D.isSunLight){const X=e.get(D);if(X.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const te=D.shadow,O=t.get(D);O.shadowIntensity=te.intensity,O.shadowBias=te.bias,O.shadowNormalBias=te.normalBias,O.shadowRadius=te.radius,O.shadowMapSize.copy(te.mapSize).multiply(te.getFrameExtents()),n.sunShadow[g]=O,n.sunShadowMap[g]=j;const re=te.getViewportCount();for(let ce=0;ce<re;ce++)n.sunShadowMatrix[v+ce]=te.getMatrix(ce),n.sunShadowCascade[v+ce]=te._cascadeData[ce];v+=re,g++}n.sun[p]=X,p++}else if(D.isDirectionalLight){const X=e.get(D);if(X.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const te=D.shadow,O=t.get(D);O.shadowIntensity=te.intensity,O.shadowBias=te.bias,O.shadowNormalBias=te.normalBias,O.shadowRadius=te.radius,O.shadowMapSize=te.mapSize,n.directionalShadow[x]=O,n.directionalShadowMap[x]=j,n.directionalShadowMatrix[x]=D.shadow.matrix,w++}n.directional[x]=X,x++}else if(D.isSpotLight){const X=e.get(D);X.position.setFromMatrixPosition(D.matrixWorld),X.color.copy(F).multiplyScalar(z),X.distance=Y,X.coneCos=Math.cos(D.angle),X.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),X.decay=D.decay,n.spot[_]=X;const te=D.shadow;if(D.map&&(n.spotLightMap[S]=D.map,S++,te.updateMatrices(D),D.castShadow&&A++),n.spotLightMatrix[_]=te.matrix,D.castShadow){const O=t.get(D);O.shadowIntensity=te.intensity,O.shadowBias=te.bias,O.shadowNormalBias=te.normalBias,O.shadowRadius=te.radius,O.shadowMapSize=te.mapSize,n.spotShadow[_]=O,n.spotShadowMap[_]=j,P++}_++}else if(D.isRectAreaLight){const X=e.get(D);X.color.copy(F).multiplyScalar(z),X.halfWidth.set(D.width*.5,0,0),X.halfHeight.set(0,D.height*.5,0),n.rectArea[M]=X,M++}else if(D.isPointLight){const X=e.get(D);if(X.color.copy(D.color).multiplyScalar(D.intensity),X.distance=D.distance,X.decay=D.decay,D.castShadow){const te=D.shadow,O=t.get(D);O.shadowIntensity=te.intensity,O.shadowBias=te.bias,O.shadowNormalBias=te.normalBias,O.shadowRadius=te.radius,O.shadowMapSize=te.mapSize,O.shadowCameraNear=te.camera.near,O.shadowCameraFar=te.camera.far,n.pointShadow[m]=O,n.pointShadowMap[m]=j,n.pointShadowMatrix[m]=D.shadow.matrix,E++}n.point[m]=X,m++}else if(D.isHemisphereLight){const X=e.get(D);X.skyColor.copy(D.color).multiplyScalar(z),X.groundColor.copy(D.groundColor).multiplyScalar(z),n.hemi[b]=X,b++}}M>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ve.LTC_FLOAT_1,n.rectAreaLTC2=ve.LTC_FLOAT_2):(n.rectAreaLTC1=ve.LTC_HALF_1,n.rectAreaLTC2=ve.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=h;const R=n.hash;(R.sunLength!==p||R.directionalLength!==x||R.pointLength!==m||R.spotLength!==_||R.rectAreaLength!==M||R.hemiLength!==b||R.numSunShadows!==g||R.numDirectionalShadows!==w||R.numPointShadows!==E||R.numSpotShadows!==P||R.numSpotMaps!==S||R.numLightProbes!==L)&&(n.sun.length=p,n.directional.length=x,n.spot.length=_,n.rectArea.length=M,n.point.length=m,n.hemi.length=b,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=v,n.sunShadowCascade.length=v,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.directionalShadowMatrix.length=w,n.pointShadow.length=E,n.pointShadowMap.length=E,n.pointShadowMatrix.length=E,n.spotShadow.length=P,n.spotShadowMap.length=P,n.spotLightMatrix.length=P+S-A,n.spotLightMap.length=S,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=L,R.sunLength=p,R.directionalLength=x,R.pointLength=m,R.spotLength=_,R.rectAreaLength=M,R.hemiLength=b,R.numSunShadows=g,R.numDirectionalShadows=w,R.numPointShadows=E,R.numSpotShadows=P,R.numSpotMaps=S,R.numLightProbes=L,n.version=T_++)}function c(l,u){let d=0,h=0,p=0,g=0,v=0,x=0;const m=u.matrixWorldInverse;for(let _=0,M=l.length;_<M;_++){const b=l[_];if(b.isSunLight){const w=n.sun[d];w.direction.setFromMatrixPosition(b.matrixWorld),w.direction.transformDirection(m),d++}else if(b.isDirectionalLight){const w=n.directional[h];w.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(m),h++}else if(b.isSpotLight){const w=n.spot[g];w.position.setFromMatrixPosition(b.matrixWorld),w.position.applyMatrix4(m),w.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(m),g++}else if(b.isRectAreaLight){const w=n.rectArea[v];w.position.setFromMatrixPosition(b.matrixWorld),w.position.applyMatrix4(m),a.identity(),s.copy(b.matrixWorld),s.premultiply(m),a.extractRotation(s),w.halfWidth.set(b.width*.5,0,0),w.halfHeight.set(0,b.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),v++}else if(b.isPointLight){const w=n.point[p];w.position.setFromMatrixPosition(b.matrixWorld),w.position.applyMatrix4(m),p++}else if(b.isHemisphereLight){const w=n.hemi[x];w.direction.setFromMatrixPosition(b.matrixWorld),w.direction.transformDirection(m),x++}}}return{setup:o,setupView:c,state:n}}function ih(i){const e=new C_(i),t=[],n=[],r=[];function s(h){d.camera=h,t.length=0,n.length=0,r.length=0}function a(h){t.push(h)}function o(h){n.push(h)}function c(h){r.push(h)}function l(){e.setup(t)}function u(h){e.setupView(t,h)}const d={lightsArray:t,shadowsArray:n,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:d,setupLights:l,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function L_(i){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new ih(i),e.set(r,[o])):s>=a.length?(o=new ih(i),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const P_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,D_=`uniform sampler2D shadow_pass;
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
}`,I_=[new V(1,0,0),new V(-1,0,0),new V(0,1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1)],N_=[new V(0,-1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1),new V(0,-1,0),new V(0,-1,0)],rh=new Pt,zr=new V,so=new V;function U_(i,e,t){let n=new na;const r=new He,s=new He,a=new ct,o=new qm,c=new Km,l={},u=t.maxTextureSize,d={[Oi]:on,[on]:Oi,[jn]:jn},h=new At({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new He},radius:{value:4}},vertexShader:P_,fragmentShader:D_}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const g=new Gt;g.setAttribute("position",new xn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Yt(g,h),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Gs;let m=this.type;this.render=function(E,P,S){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||E.length===0)return;this.type===O0&&(Ge("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Gs);const A=i.getRenderTarget(),L=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),N=i.state;N.setBlending(Hn),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const U=m!==this.type;U&&P.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach(F=>F.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,F=E.length;D<F;D++){const z=E[D],Y=z.shadow;if(Y===void 0){Ge("WebGLShadowMap:",z,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;r.copy(Y.mapSize);const j=Y.getFrameExtents();r.multiply(j),s.copy(Y.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/j.x),r.x=s.x*j.x,Y.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/j.y),r.y=s.y*j.y,Y.mapSize.y=s.y));const X=i.state.buffers.depth.getReversed();if(Y.camera._reversedDepth=X,Y.map===null||U===!0){if(Y.map!==null&&(Y.map.depthTexture!==null&&(Y.map.depthTexture.dispose(),Y.map.depthTexture=null),Y.map.dispose()),this.type===Gr){if(z.isPointLight){Ge("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Y.map=new wn(r.x,r.y,{format:zi,type:Xn,minFilter:Nt,magFilter:Nt,generateMipmaps:!1}),Y.map.texture.name=z.name+".shadowMap",Y.map.depthTexture=new Sr(r.x,r.y,kn),Y.map.depthTexture.name=z.name+".shadowMapDepth",Y.map.depthTexture.format=ii,Y.map.depthTexture.compareFunction=null,Y.map.depthTexture.minFilter=Ut,Y.map.depthTexture.magFilter=Ut}else z.isPointLight?(Y.map=new mu(r.x),Y.map.depthTexture=new Gm(r.x,Wn)):(Y.map=new wn(r.x,r.y),Y.map.depthTexture=new Sr(r.x,r.y,Wn)),Y.map.depthTexture.name=z.name+".shadowMap",Y.map.depthTexture.format=ii,this.type===Gs?(Y.map.depthTexture.compareFunction=X?Rl:Tl,Y.map.depthTexture.minFilter=Nt,Y.map.depthTexture.magFilter=Nt):(Y.map.depthTexture.compareFunction=null,Y.map.depthTexture.minFilter=Ut,Y.map.depthTexture.magFilter=Ut);Y.camera.updateProjectionMatrix()}Y.map.isWebGLCubeRenderTarget!==!0&&(Y.map.width!==r.x||Y.map.height!==r.y)&&Y.map.setSize(r.x,r.y);const te=Y.map.isWebGLCubeRenderTarget?6:Y.getViewportCount();z.isPointLight!==!0&&Y.updateMatrices(z,S);for(let O=0;O<te;O++){const re=Y.getCamera(O);if(z.isPointLight){const ce=Y.camera,be=Y.matrix,Ue=z.distance||ce.far;Ue!==ce.far&&(ce.far=Ue,ce.updateProjectionMatrix()),zr.setFromMatrixPosition(z.matrixWorld),ce.position.copy(zr),so.copy(ce.position),so.add(I_[O]),ce.up.copy(N_[O]),ce.lookAt(so),ce.updateMatrixWorld(),be.makeTranslation(-zr.x,-zr.y,-zr.z),rh.multiplyMatrices(ce.projectionMatrix,ce.matrixWorldInverse),Y._frustum.setFromProjectionMatrix(rh,ce.coordinateSystem,ce.reversedDepth)}if(Y.map.isWebGLCubeRenderTarget)i.setRenderTarget(Y.map,O),i.clear();else{O===0&&(i.setRenderTarget(Y.map),i.clear());const ce=Y.getViewport(O);a.set(s.x*ce.x,s.y*ce.y,s.x*ce.z,s.y*ce.w),N.viewport(a)}n=Y.getFrustum(O),b(P,S,re,z,this.type)}Y.isPointLightShadow!==!0&&this.type===Gr&&_(Y,S),Y.needsUpdate=!1}m=this.type,x.needsUpdate=!1,i.setRenderTarget(A,L,R)};function _(E,P){const S=e.update(v);h.defines.VSM_SAMPLES!==E.blurSamples&&(h.defines.VSM_SAMPLES=E.blurSamples,p.defines.VSM_SAMPLES=E.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),E.mapPass===null?E.mapPass=new wn(r.x,r.y,{format:zi,type:Xn}):(E.mapPass.width!==E.map.width||E.mapPass.height!==E.map.height)&&E.mapPass.setSize(E.map.width,E.map.height),h.uniforms.shadow_pass.value=E.map.depthTexture,h.uniforms.resolution.value.set(E.map.width,E.map.height),h.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(P,null,S,h,v,null),p.uniforms.shadow_pass.value=E.mapPass.texture,p.uniforms.resolution.value.set(E.map.width,E.map.height),p.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(P,null,S,p,v,null)}function M(E,P,S,A){let L=null;const R=S.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(R!==void 0)L=R;else if(L=S.isPointLight===!0?c:o,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const N=L.uuid,U=P.uuid;let D=l[N];D===void 0&&(D={},l[N]=D);let F=D[U];F===void 0&&(F=L.clone(),D[U]=F,P.addEventListener("dispose",w)),L=F}if(L.visible=P.visible,L.wireframe=P.wireframe,A===Gr?L.side=P.shadowSide!==null?P.shadowSide:P.side:L.side=P.shadowSide!==null?P.shadowSide:d[P.side],L.alphaMap=P.alphaMap,L.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,L.map=P.map,L.clipShadows=P.clipShadows,L.clippingPlanes=P.clippingPlanes,L.clipIntersection=P.clipIntersection,L.displacementMap=P.displacementMap,L.displacementScale=P.displacementScale,L.displacementBias=P.displacementBias,L.wireframeLinewidth=P.wireframeLinewidth,L.linewidth=P.linewidth,S.isPointLight===!0&&L.isMeshDistanceMaterial===!0){const N=i.properties.get(L);N.light=S}return L}function b(E,P,S,A,L){if(E.visible===!1)return;if(E.layers.test(P.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&L===Gr)&&(!E.frustumCulled||E.intersectsFrustum(n))){E.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,E.matrixWorld);const U=e.update(E),D=E.material;if(Array.isArray(D)){const F=U.groups;for(let z=0,Y=F.length;z<Y;z++){const j=F[z],X=D[j.materialIndex];if(X&&X.visible){const te=M(E,X,A,L);E.onBeforeShadow(i,E,P,S,U,te,j),i.renderBufferDirect(S,null,U,te,E,j),E.onAfterShadow(i,E,P,S,U,te,j)}}}else if(D.visible){const F=M(E,D,A,L);E.onBeforeShadow(i,E,P,S,U,F,null),i.renderBufferDirect(S,null,U,F,E,null),E.onAfterShadow(i,E,P,S,U,F,null)}}const N=E.children;for(let U=0,D=N.length;U<D;U++)b(N[U],P,S,A,L)}function w(E){E.target.removeEventListener("dispose",w);for(const S in l){const A=l[S],L=E.target.uuid;L in A&&(A[L].dispose(),delete A[L])}}}function F_(i,e){function t(){let H=!1;const pe=new ct;let ie=null;const me=new ct(0,0,0,0);return{setMask:function(Se){ie!==Se&&!H&&(i.colorMask(Se,Se,Se,Se),ie=Se)},setLocked:function(Se){H=Se},setClear:function(Se,oe,Ne,Pe,yt){yt===!0&&(Se*=Pe,oe*=Pe,Ne*=Pe),pe.set(Se,oe,Ne,Pe),me.equals(pe)===!1&&(i.clearColor(Se,oe,Ne,Pe),me.copy(pe))},reset:function(){H=!1,ie=null,me.set(-1,0,0,0)}}}function n(){let H=!1,pe=!1,ie=null,me=null,Se=null;return{setReversed:function(oe){if(pe!==oe){const Ne=e.get("EXT_clip_control");oe?Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.ZERO_TO_ONE_EXT):Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.NEGATIVE_ONE_TO_ONE_EXT),pe=oe;const Pe=Se;Se=null,this.setClear(Pe)}},getReversed:function(){return pe},setTest:function(oe){oe?se(i.DEPTH_TEST):W(i.DEPTH_TEST)},setMask:function(oe){ie!==oe&&!H&&(i.depthMask(oe),ie=oe)},setFunc:function(oe){if(pe&&(oe=mm[oe]),me!==oe){switch(oe){case go:i.depthFunc(i.NEVER);break;case xo:i.depthFunc(i.ALWAYS);break;case vo:i.depthFunc(i.LESS);break;case Yr:i.depthFunc(i.LEQUAL);break;case _o:i.depthFunc(i.EQUAL);break;case Mo:i.depthFunc(i.GEQUAL);break;case So:i.depthFunc(i.GREATER);break;case bo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}me=oe}},setLocked:function(oe){H=oe},setClear:function(oe){Se!==oe&&(Se=oe,pe&&(oe=1-oe),i.clearDepth(oe))},reset:function(){H=!1,ie=null,me=null,Se=null,pe=!1}}}function r(){let H=!1,pe=null,ie=null,me=null,Se=null,oe=null,Ne=null,Pe=null,yt=null;return{setTest:function(ht){H||(ht?se(i.STENCIL_TEST):W(i.STENCIL_TEST))},setMask:function(ht){pe!==ht&&!H&&(i.stencilMask(ht),pe=ht)},setFunc:function(ht,An,Un){(ie!==ht||me!==An||Se!==Un)&&(i.stencilFunc(ht,An,Un),ie=ht,me=An,Se=Un)},setOp:function(ht,An,Un){(oe!==ht||Ne!==An||Pe!==Un)&&(i.stencilOp(ht,An,Un),oe=ht,Ne=An,Pe=Un)},setLocked:function(ht){H=ht},setClear:function(ht){yt!==ht&&(i.clearStencil(ht),yt=ht)},reset:function(){H=!1,pe=null,ie=null,me=null,Se=null,oe=null,Ne=null,Pe=null,yt=null}}}const s=new t,a=new n,o=new r,c=new WeakMap,l=new WeakMap;let u={},d={},h={},p=new WeakMap,g=[],v=null,x=!1,m=null,_=null,M=null,b=null,w=null,E=null,P=null,S=new et(0,0,0),A=0,L=!1,R=null,N=null,U=null,D=null,F=null;const z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,j=0;const X=i.getParameter(i.VERSION);X.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(X)[1]),Y=j>=1):X.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),Y=j>=2);let te=null,O={};const re=i.getParameter(i.SCISSOR_BOX),ce=i.getParameter(i.VIEWPORT),be=new ct().fromArray(re),Ue=new ct().fromArray(ce);function ke(H,pe,ie,me){const Se=new Uint8Array(4),oe=i.createTexture();i.bindTexture(H,oe),i.texParameteri(H,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(H,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ne=0;Ne<ie;Ne++)H===i.TEXTURE_3D||H===i.TEXTURE_2D_ARRAY?i.texImage3D(pe,0,i.RGBA,1,1,me,0,i.RGBA,i.UNSIGNED_BYTE,Se):i.texImage2D(pe+Ne,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Se);return oe}const ee={};ee[i.TEXTURE_2D]=ke(i.TEXTURE_2D,i.TEXTURE_2D,1),ee[i.TEXTURE_CUBE_MAP]=ke(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ee[i.TEXTURE_2D_ARRAY]=ke(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ee[i.TEXTURE_3D]=ke(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),se(i.DEPTH_TEST),a.setFunc(Yr),Xe(!1),Mt(sc),se(i.CULL_FACE),Fe(Hn);function se(H){u[H]!==!0&&(i.enable(H),u[H]=!0)}function W(H){u[H]!==!1&&(i.disable(H),u[H]=!1)}function he(H,pe){return h[H]!==pe?(i.bindFramebuffer(H,pe),h[H]=pe,H===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=pe),H===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=pe),!0):!1}function ae(H,pe){let ie=g,me=!1;if(H){ie=p.get(pe),ie===void 0&&(ie=[],p.set(pe,ie));const Se=H.textures;if(ie.length!==Se.length||ie[0]!==i.COLOR_ATTACHMENT0){for(let oe=0,Ne=Se.length;oe<Ne;oe++)ie[oe]=i.COLOR_ATTACHMENT0+oe;ie.length=Se.length,me=!0}}else ie[0]!==i.BACK&&(ie[0]=i.BACK,me=!0);me&&i.drawBuffers(ie)}function Ee(H){return v!==H?(i.useProgram(H),v=H,!0):!1}const Ze={[or]:i.FUNC_ADD,[B0]:i.FUNC_SUBTRACT,[z0]:i.FUNC_REVERSE_SUBTRACT};Ze[k0]=i.MIN,Ze[G0]=i.MAX;const Ce={[_l]:i.ZERO,[H0]:i.ONE,[Ml]:i.SRC_COLOR,[Fh]:i.SRC_ALPHA,[K0]:i.SRC_ALPHA_SATURATE,[Y0]:i.DST_COLOR,[W0]:i.DST_ALPHA,[V0]:i.ONE_MINUS_SRC_COLOR,[Oh]:i.ONE_MINUS_SRC_ALPHA,[q0]:i.ONE_MINUS_DST_COLOR,[X0]:i.ONE_MINUS_DST_ALPHA,[$0]:i.CONSTANT_COLOR,[Z0]:i.ONE_MINUS_CONSTANT_COLOR,[J0]:i.CONSTANT_ALPHA,[Q0]:i.ONE_MINUS_CONSTANT_ALPHA};function Fe(H,pe,ie,me,Se,oe,Ne,Pe,yt,ht){if(H===Hn){x===!0&&(W(i.BLEND),x=!1);return}if(x===!1&&(se(i.BLEND),x=!0),H!==vl){if(H!==m||ht!==L){if((_!==or||w!==or)&&(i.blendEquation(i.FUNC_ADD),_=or,w=or),ht)switch(H){case dr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case _r:i.blendFunc(i.ONE,i.ONE);break;case ac:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case oc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:at("WebGLState: Invalid blending: ",H);break}else switch(H){case dr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case _r:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case ac:at("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case oc:at("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:at("WebGLState: Invalid blending: ",H);break}M=null,b=null,E=null,P=null,S.set(0,0,0),A=0,m=H,L=ht}return}Se=Se||pe,oe=oe||ie,Ne=Ne||me,(pe!==_||Se!==w)&&(i.blendEquationSeparate(Ze[pe],Ze[Se]),_=pe,w=Se),(ie!==M||me!==b||oe!==E||Ne!==P)&&(i.blendFuncSeparate(Ce[ie],Ce[me],Ce[oe],Ce[Ne]),M=ie,b=me,E=oe,P=Ne),(Pe.equals(S)===!1||yt!==A)&&(i.blendColor(Pe.r,Pe.g,Pe.b,yt),S.copy(Pe),A=yt),m=H,L=!1}function qe(H,pe){H.side===jn?W(i.CULL_FACE):se(i.CULL_FACE);let ie=H.side===on;pe&&(ie=!ie),Xe(ie),H.blending===dr&&H.transparent===!1?Fe(Hn):Fe(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),a.setFunc(H.depthFunc),a.setTest(H.depthTest),a.setMask(H.depthWrite),s.setMask(H.colorWrite);const me=H.stencilWrite;o.setTest(me),me&&(o.setMask(H.stencilWriteMask),o.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),o.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),Wt(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?se(i.SAMPLE_ALPHA_TO_COVERAGE):W(i.SAMPLE_ALPHA_TO_COVERAGE)}function Xe(H){R!==H&&(H?i.frontFace(i.CW):i.frontFace(i.CCW),R=H)}function Mt(H){H!==U0?(se(i.CULL_FACE),H!==N&&(H===sc?i.cullFace(i.BACK):H===F0?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):W(i.CULL_FACE),N=H}function Dt(H){H!==U&&(Y&&i.lineWidth(H),U=H)}function Wt(H,pe,ie){H?(se(i.POLYGON_OFFSET_FILL),(D!==pe||F!==ie)&&(D=pe,F=ie,a.getReversed()&&(pe=-pe),i.polygonOffset(pe,ie))):W(i.POLYGON_OFFSET_FILL)}function xt(H){H?se(i.SCISSOR_TEST):W(i.SCISSOR_TEST)}function St(H){H===void 0&&(H=i.TEXTURE0+z-1),te!==H&&(i.activeTexture(H),te=H)}function G(H,pe,ie){ie===void 0&&(te===null?ie=i.TEXTURE0+z-1:ie=te);let me=O[ie];me===void 0&&(me={type:void 0,texture:void 0},O[ie]=me),(me.type!==H||me.texture!==pe)&&(te!==ie&&(i.activeTexture(ie),te=ie),i.bindTexture(H,pe||ee[H]),me.type=H,me.texture=pe)}function Je(){const H=O[te];H!==void 0&&H.type!==void 0&&(i.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function ze(){try{i.compressedTexImage2D(...arguments)}catch(H){at("WebGLState:",H)}}function I(){try{i.compressedTexImage3D(...arguments)}catch(H){at("WebGLState:",H)}}function y(){try{i.texSubImage2D(...arguments)}catch(H){at("WebGLState:",H)}}function B(){try{i.texSubImage3D(...arguments)}catch(H){at("WebGLState:",H)}}function q(){try{i.compressedTexSubImage2D(...arguments)}catch(H){at("WebGLState:",H)}}function Z(){try{i.compressedTexSubImage3D(...arguments)}catch(H){at("WebGLState:",H)}}function le(){try{i.texStorage2D(...arguments)}catch(H){at("WebGLState:",H)}}function ue(){try{i.texStorage3D(...arguments)}catch(H){at("WebGLState:",H)}}function Q(){try{i.texImage2D(...arguments)}catch(H){at("WebGLState:",H)}}function ne(){try{i.texImage3D(...arguments)}catch(H){at("WebGLState:",H)}}function de(H){return d[H]!==void 0?d[H]:i.getParameter(H)}function Le(H,pe){d[H]!==pe&&(i.pixelStorei(H,pe),d[H]=pe)}function xe(H){be.equals(H)===!1&&(i.scissor(H.x,H.y,H.z,H.w),be.copy(H))}function fe(H){Ue.equals(H)===!1&&(i.viewport(H.x,H.y,H.z,H.w),Ue.copy(H))}function Ie(H,pe){let ie=l.get(pe);ie===void 0&&(ie=new WeakMap,l.set(pe,ie));let me=ie.get(H);me===void 0&&(me=i.getUniformBlockIndex(pe,H.name),ie.set(H,me))}function Be(H,pe){const me=l.get(pe).get(H);c.get(pe)!==me&&(i.uniformBlockBinding(pe,me,H.__bindingPointIndex),c.set(pe,me))}function Ke(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},d={},te=null,O={},h={},p=new WeakMap,g=[],v=null,x=!1,m=null,_=null,M=null,b=null,w=null,E=null,P=null,S=new et(0,0,0),A=0,L=!1,R=null,N=null,U=null,D=null,F=null,be.set(0,0,i.canvas.width,i.canvas.height),Ue.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:se,disable:W,bindFramebuffer:he,drawBuffers:ae,useProgram:Ee,setBlending:Fe,setMaterial:qe,setFlipSided:Xe,setCullFace:Mt,setLineWidth:Dt,setPolygonOffset:Wt,setScissorTest:xt,activeTexture:St,bindTexture:G,unbindTexture:Je,compressedTexImage2D:ze,compressedTexImage3D:I,texImage2D:Q,texImage3D:ne,pixelStorei:Le,getParameter:de,updateUBOMapping:Ie,uniformBlockBinding:Be,texStorage2D:le,texStorage3D:ue,texSubImage2D:y,texSubImage3D:B,compressedTexSubImage2D:q,compressedTexSubImage3D:Z,scissor:xe,viewport:fe,reset:Ke}}function O_(i,e,t,n,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new He,u=new WeakMap,d=new Set;let h;const p=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(I,y){return g?new OffscreenCanvas(I,y):ta("canvas")}function x(I,y,B){let q=1;const Z=ze(I);if((Z.width>B||Z.height>B)&&(q=B/Math.max(Z.width,Z.height)),q<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const le=Math.floor(q*Z.width),ue=Math.floor(q*Z.height);h===void 0&&(h=v(le,ue));const Q=y?v(le,ue):h;return Q.width=le,Q.height=ue,Q.getContext("2d").drawImage(I,0,0,le,ue),Ge("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+le+"x"+ue+")."),Q}else return"data"in I&&Ge("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),I;return I}function m(I){return I.generateMipmaps}function _(I){i.generateMipmap(I)}function M(I){return I.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?i.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(I,y,B,q,Z,le=!1){if(I!==null){if(i[I]!==void 0)return i[I];Ge("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let ue;q&&(ue=e.get("EXT_texture_norm16"),ue||Ge("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=y;if(y===i.RED&&(B===i.FLOAT&&(Q=i.R32F),B===i.HALF_FLOAT&&(Q=i.R16F),B===i.UNSIGNED_BYTE&&(Q=i.R8),B===i.UNSIGNED_SHORT&&ue&&(Q=ue.R16_EXT),B===i.SHORT&&ue&&(Q=ue.R16_SNORM_EXT)),y===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(Q=i.R8UI),B===i.UNSIGNED_SHORT&&(Q=i.R16UI),B===i.UNSIGNED_INT&&(Q=i.R32UI),B===i.BYTE&&(Q=i.R8I),B===i.SHORT&&(Q=i.R16I),B===i.INT&&(Q=i.R32I)),y===i.RG&&(B===i.FLOAT&&(Q=i.RG32F),B===i.HALF_FLOAT&&(Q=i.RG16F),B===i.UNSIGNED_BYTE&&(Q=i.RG8),B===i.UNSIGNED_SHORT&&ue&&(Q=ue.RG16_EXT),B===i.SHORT&&ue&&(Q=ue.RG16_SNORM_EXT)),y===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(Q=i.RG8UI),B===i.UNSIGNED_SHORT&&(Q=i.RG16UI),B===i.UNSIGNED_INT&&(Q=i.RG32UI),B===i.BYTE&&(Q=i.RG8I),B===i.SHORT&&(Q=i.RG16I),B===i.INT&&(Q=i.RG32I)),y===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&(Q=i.RGB8UI),B===i.UNSIGNED_SHORT&&(Q=i.RGB16UI),B===i.UNSIGNED_INT&&(Q=i.RGB32UI),B===i.BYTE&&(Q=i.RGB8I),B===i.SHORT&&(Q=i.RGB16I),B===i.INT&&(Q=i.RGB32I)),y===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&(Q=i.RGBA8UI),B===i.UNSIGNED_SHORT&&(Q=i.RGBA16UI),B===i.UNSIGNED_INT&&(Q=i.RGBA32UI),B===i.BYTE&&(Q=i.RGBA8I),B===i.SHORT&&(Q=i.RGBA16I),B===i.INT&&(Q=i.RGBA32I)),y===i.RGB&&(B===i.UNSIGNED_SHORT&&ue&&(Q=ue.RGB16_EXT),B===i.SHORT&&ue&&(Q=ue.RGB16_SNORM_EXT),B===i.UNSIGNED_INT_5_9_9_9_REV&&(Q=i.RGB9_E5),B===i.UNSIGNED_INT_10F_11F_11F_REV&&(Q=i.R11F_G11F_B10F)),y===i.RGBA){const ne=le?js:nt.getTransfer(Z);B===i.FLOAT&&(Q=i.RGBA32F),B===i.HALF_FLOAT&&(Q=i.RGBA16F),B===i.UNSIGNED_BYTE&&(Q=ne===gt?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT&&ue&&(Q=ue.RGBA16_EXT),B===i.SHORT&&ue&&(Q=ue.RGBA16_SNORM_EXT),B===i.UNSIGNED_SHORT_4_4_4_4&&(Q=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(Q=i.RGB5_A1)}return(Q===i.R16F||Q===i.R32F||Q===i.RG16F||Q===i.RG32F||Q===i.RGBA16F||Q===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function w(I,y){let B;return I?y===null||y===Wn||y===Kr?B=i.DEPTH24_STENCIL8:y===kn?B=i.DEPTH32F_STENCIL8:y===qr&&(B=i.DEPTH24_STENCIL8,Ge("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===Wn||y===Kr?B=i.DEPTH_COMPONENT24:y===kn?B=i.DEPTH_COMPONENT32F:y===qr&&(B=i.DEPTH_COMPONENT16),B}function E(I,y){return m(I)===!0||I.isFramebufferTexture&&I.minFilter!==Ut&&I.minFilter!==Nt?Math.log2(Math.max(y.width,y.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?y.mipmaps.length:1}function P(I){const y=I.target;y.removeEventListener("dispose",P),A(y),y.isVideoTexture&&u.delete(y),y.isHTMLTexture&&d.delete(y)}function S(I){const y=I.target;y.removeEventListener("dispose",S),R(y)}function A(I){const y=n.get(I);if(y.__webglInit===void 0)return;const B=I.source,q=p.get(B);if(q){const Z=q[y.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&L(I),Object.keys(q).length===0&&p.delete(B)}n.remove(I)}function L(I){const y=n.get(I);i.deleteTexture(y.__webglTexture);const B=I.source,q=p.get(B);delete q[y.__cacheKey],a.memory.textures--}function R(I){const y=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(y.__webglFramebuffer[q]))for(let Z=0;Z<y.__webglFramebuffer[q].length;Z++)i.deleteFramebuffer(y.__webglFramebuffer[q][Z]);else i.deleteFramebuffer(y.__webglFramebuffer[q]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[q])}else{if(Array.isArray(y.__webglFramebuffer))for(let q=0;q<y.__webglFramebuffer.length;q++)i.deleteFramebuffer(y.__webglFramebuffer[q]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let q=0;q<y.__webglColorRenderbuffer.length;q++)y.__webglColorRenderbuffer[q]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[q]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const B=I.textures;for(let q=0,Z=B.length;q<Z;q++){const le=n.get(B[q]);le.__webglTexture&&(i.deleteTexture(le.__webglTexture),a.memory.textures--),n.remove(B[q])}n.remove(I)}let N=0;function U(){N=0}function D(){return N}function F(I){N=I}function z(){const I=N;return I>=r.maxTextures&&Ge("WebGLTextures: Trying to use "+(I+1)+" texture units while this GPU supports only "+r.maxTextures),N+=1,I}function Y(I){const y=[];return y.push(I.wrapS),y.push(I.wrapT),y.push(I.wrapR||0),y.push(I.magFilter),y.push(I.minFilter),y.push(I.anisotropy),y.push(I.internalFormat),y.push(I.format),y.push(I.type),y.push(I.generateMipmaps),y.push(I.premultiplyAlpha),y.push(I.flipY),y.push(I.unpackAlignment),y.push(I.colorSpace),y.join()}function j(I,y){const B=n.get(I);if(I.isVideoTexture&&G(I),I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&B.__version!==I.version){const q=I.image;if(q===null)Ge("WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)Ge("WebGLRenderer: Texture marked for update but image is incomplete");else{W(B,I,y);return}}else I.isExternalTexture&&(B.__webglTexture=I.sourceTexture?I.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+y)}function X(I,y){const B=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&B.__version!==I.version){W(B,I,y);return}else I.isExternalTexture&&(B.__webglTexture=I.sourceTexture?I.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+y)}function te(I,y){const B=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&B.__version!==I.version){W(B,I,y);return}t.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+y)}function O(I,y){const B=n.get(I);if(I.isCubeDepthTexture!==!0&&I.version>0&&B.__version!==I.version){he(B,I,y);return}t.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+y)}const re={[yo]:i.REPEAT,[ei]:i.CLAMP_TO_EDGE,[wo]:i.MIRRORED_REPEAT},ce={[Ut]:i.NEAREST,[tm]:i.NEAREST_MIPMAP_NEAREST,[os]:i.NEAREST_MIPMAP_LINEAR,[Nt]:i.LINEAR,[Ca]:i.LINEAR_MIPMAP_NEAREST,[Di]:i.LINEAR_MIPMAP_LINEAR},be={[sm]:i.NEVER,[hm]:i.ALWAYS,[am]:i.LESS,[Tl]:i.LEQUAL,[om]:i.EQUAL,[Rl]:i.GEQUAL,[lm]:i.GREATER,[cm]:i.NOTEQUAL};function Ue(I,y){if(y.type===kn&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===Nt||y.magFilter===Ca||y.magFilter===os||y.magFilter===Di||y.minFilter===Nt||y.minFilter===Ca||y.minFilter===os||y.minFilter===Di)&&Ge("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(I,i.TEXTURE_WRAP_S,re[y.wrapS]),i.texParameteri(I,i.TEXTURE_WRAP_T,re[y.wrapT]),(I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY)&&i.texParameteri(I,i.TEXTURE_WRAP_R,re[y.wrapR]),i.texParameteri(I,i.TEXTURE_MAG_FILTER,ce[y.magFilter]),i.texParameteri(I,i.TEXTURE_MIN_FILTER,ce[y.minFilter]),y.compareFunction&&(i.texParameteri(I,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(I,i.TEXTURE_COMPARE_FUNC,be[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Ut||y.minFilter!==os&&y.minFilter!==Di||y.type===kn&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){const B=e.get("EXT_texture_filter_anisotropic");i.texParameterf(I,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,r.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function ke(I,y){let B=!1;I.__webglInit===void 0&&(I.__webglInit=!0,y.addEventListener("dispose",P));const q=y.source;let Z=p.get(q);Z===void 0&&(Z={},p.set(q,Z));const le=Y(y);if(le!==I.__cacheKey){Z[le]===void 0&&(Z[le]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,B=!0),Z[le].usedTimes++;const ue=Z[I.__cacheKey];ue!==void 0&&(Z[I.__cacheKey].usedTimes--,ue.usedTimes===0&&L(y)),I.__cacheKey=le,I.__webglTexture=Z[le].texture}return B}function ee(I,y,B){return Math.floor(Math.floor(I/B)/y)}function se(I,y,B,q){const le=I.updateRanges;if(le.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,y.width,y.height,B,q,y.data);else{le.sort((Le,xe)=>Le.start-xe.start);let ue=0;for(let Le=1;Le<le.length;Le++){const xe=le[ue],fe=le[Le],Ie=xe.start+xe.count,Be=ee(fe.start,y.width,4),Ke=ee(xe.start,y.width,4);fe.start<=Ie+1&&Be===Ke&&ee(fe.start+fe.count-1,y.width,4)===Be?xe.count=Math.max(xe.count,fe.start+fe.count-xe.start):(++ue,le[ue]=fe)}le.length=ue+1;const Q=t.getParameter(i.UNPACK_ROW_LENGTH),ne=t.getParameter(i.UNPACK_SKIP_PIXELS),de=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,y.width);for(let Le=0,xe=le.length;Le<xe;Le++){const fe=le[Le],Ie=Math.floor(fe.start/4),Be=Math.ceil(fe.count/4),Ke=Ie%y.width,H=Math.floor(Ie/y.width),pe=Be,ie=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Ke),t.pixelStorei(i.UNPACK_SKIP_ROWS,H),t.texSubImage2D(i.TEXTURE_2D,0,Ke,H,pe,ie,B,q,y.data)}I.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,Q),t.pixelStorei(i.UNPACK_SKIP_PIXELS,ne),t.pixelStorei(i.UNPACK_SKIP_ROWS,de)}}function W(I,y,B){let q=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(q=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(q=i.TEXTURE_3D);const Z=ke(I,y),le=y.source;t.bindTexture(q,I.__webglTexture,i.TEXTURE0+B);const ue=n.get(le);if(le.version!==ue.__version||Z===!0){if(t.activeTexture(i.TEXTURE0+B),(typeof ImageBitmap<"u"&&y.image instanceof ImageBitmap)===!1){const ie=nt.getPrimaries(nt.workingColorSpace),me=y.colorSpace===Pn?null:nt.getPrimaries(y.colorSpace),Se=y.colorSpace===Pn||ie===me?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se)}t.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment);let ne=x(y.image,!1,r.maxTextureSize);ne=Je(y,ne);const de=s.convert(y.format,y.colorSpace),Le=s.convert(y.type);let xe=b(y.internalFormat,de,Le,y.normalized,y.colorSpace,y.isVideoTexture);Ue(q,y);let fe;const Ie=y.mipmaps,Be=y.isVideoTexture!==!0,Ke=ue.__version===void 0||Z===!0,H=le.dataReady,pe=E(y,ne);if(y.isDepthTexture)xe=w(y.format===Ii,y.type),Ke&&(Be?t.texStorage2D(i.TEXTURE_2D,1,xe,ne.width,ne.height):t.texImage2D(i.TEXTURE_2D,0,xe,ne.width,ne.height,0,de,Le,null));else if(y.isDataTexture)if(Ie.length>0){Be&&Ke&&t.texStorage2D(i.TEXTURE_2D,pe,xe,Ie[0].width,Ie[0].height);for(let ie=0,me=Ie.length;ie<me;ie++)fe=Ie[ie],Be?H&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,fe.width,fe.height,de,Le,fe.data):t.texImage2D(i.TEXTURE_2D,ie,xe,fe.width,fe.height,0,de,Le,fe.data);y.generateMipmaps=!1}else Be?(Ke&&t.texStorage2D(i.TEXTURE_2D,pe,xe,ne.width,ne.height),H&&se(y,ne,de,Le)):t.texImage2D(i.TEXTURE_2D,0,xe,ne.width,ne.height,0,de,Le,ne.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Be&&Ke&&t.texStorage3D(i.TEXTURE_2D_ARRAY,pe,xe,Ie[0].width,Ie[0].height,ne.depth);for(let ie=0,me=Ie.length;ie<me;ie++)if(fe=Ie[ie],y.format!==pn)if(de!==null)if(Be){if(H)if(y.layerUpdates.size>0){const Se=Fc(fe.width,fe.height,y.format,y.type);for(const oe of y.layerUpdates){const Ne=fe.data.subarray(oe*Se/fe.data.BYTES_PER_ELEMENT,(oe+1)*Se/fe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,oe,fe.width,fe.height,1,de,Ne)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,0,fe.width,fe.height,ne.depth,de,fe.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ie,xe,fe.width,fe.height,ne.depth,0,fe.data,0,0);else Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Be?H&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,0,fe.width,fe.height,ne.depth,de,Le,fe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ie,xe,fe.width,fe.height,ne.depth,0,de,Le,fe.data);y.layerUpdates.size>0&&y.clearLayerUpdates()}else{Be&&Ke&&t.texStorage2D(i.TEXTURE_2D,pe,xe,Ie[0].width,Ie[0].height);for(let ie=0,me=Ie.length;ie<me;ie++)fe=Ie[ie],y.format!==pn?de!==null?Be?H&&t.compressedTexSubImage2D(i.TEXTURE_2D,ie,0,0,fe.width,fe.height,de,fe.data):t.compressedTexImage2D(i.TEXTURE_2D,ie,xe,fe.width,fe.height,0,fe.data):Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Be?H&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,fe.width,fe.height,de,Le,fe.data):t.texImage2D(i.TEXTURE_2D,ie,xe,fe.width,fe.height,0,de,Le,fe.data)}else if(y.isDataArrayTexture)if(Be){if(Ke&&t.texStorage3D(i.TEXTURE_2D_ARRAY,pe,xe,ne.width,ne.height,ne.depth),H)if(y.layerUpdates.size>0){const ie=Fc(ne.width,ne.height,y.format,y.type);for(const me of y.layerUpdates){const Se=ne.data.subarray(me*ie/ne.data.BYTES_PER_ELEMENT,(me+1)*ie/ne.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,me,ne.width,ne.height,1,de,Le,Se)}y.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,de,Le,ne.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,xe,ne.width,ne.height,ne.depth,0,de,Le,ne.data);else if(y.isData3DTexture)Be?(Ke&&t.texStorage3D(i.TEXTURE_3D,pe,xe,ne.width,ne.height,ne.depth),H&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,de,Le,ne.data)):t.texImage3D(i.TEXTURE_3D,0,xe,ne.width,ne.height,ne.depth,0,de,Le,ne.data);else if(y.isFramebufferTexture){if(Ke)if(Be)t.texStorage2D(i.TEXTURE_2D,pe,xe,ne.width,ne.height);else{let ie=ne.width,me=ne.height;for(let Se=0;Se<pe;Se++)t.texImage2D(i.TEXTURE_2D,Se,xe,ie,me,0,de,Le,null),ie>>=1,me>>=1}}else if(y.isHTMLTexture){if("texElementImage2D"in i){const ie=i.canvas;if(ie.hasAttribute("layoutsubtree")||ie.setAttribute("layoutsubtree","true"),ne.parentNode!==ie){ie.appendChild(ne),d.add(y),ie.onpaint=me=>{const Se=me.changedElements;for(const oe of d)Se.includes(oe.image)&&(oe.needsUpdate=!0)},ie.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ne);else{const Se=i.RGBA,oe=i.RGBA,Ne=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Se,oe,Ne,ne)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Ie.length>0){if(Be&&Ke){const ie=ze(Ie[0]);t.texStorage2D(i.TEXTURE_2D,pe,xe,ie.width,ie.height)}for(let ie=0,me=Ie.length;ie<me;ie++)fe=Ie[ie],Be?H&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,de,Le,fe):t.texImage2D(i.TEXTURE_2D,ie,xe,de,Le,fe);y.generateMipmaps=!1}else if(Be){if(Ke){const ie=ze(ne);t.texStorage2D(i.TEXTURE_2D,pe,xe,ie.width,ie.height)}H&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,de,Le,ne)}else t.texImage2D(i.TEXTURE_2D,0,xe,de,Le,ne);m(y)&&_(q),ue.__version=le.version,y.onUpdate&&y.onUpdate(y)}I.__version=y.version}function he(I,y,B){if(y.image.length!==6)return;const q=ke(I,y),Z=y.source;t.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+B);const le=n.get(Z);if(Z.version!==le.__version||q===!0){t.activeTexture(i.TEXTURE0+B);const ue=nt.getPrimaries(nt.workingColorSpace),Q=y.colorSpace===Pn?null:nt.getPrimaries(y.colorSpace),ne=y.colorSpace===Pn||ue===Q?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ne);const de=y.isCompressedTexture||y.image[0].isCompressedTexture,Le=y.image[0]&&y.image[0].isDataTexture,xe=[];for(let oe=0;oe<6;oe++)!de&&!Le?xe[oe]=x(y.image[oe],!0,r.maxCubemapSize):xe[oe]=Le?y.image[oe].image:y.image[oe],xe[oe]=Je(y,xe[oe]);const fe=xe[0],Ie=s.convert(y.format,y.colorSpace),Be=s.convert(y.type),Ke=b(y.internalFormat,Ie,Be,y.normalized,y.colorSpace),H=y.isVideoTexture!==!0,pe=le.__version===void 0||q===!0,ie=Z.dataReady;let me=E(y,fe);Ue(i.TEXTURE_CUBE_MAP,y);let Se;if(de){H&&pe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,me,Ke,fe.width,fe.height);for(let oe=0;oe<6;oe++){Se=xe[oe].mipmaps;for(let Ne=0;Ne<Se.length;Ne++){const Pe=Se[Ne];y.format!==pn?Ie!==null?H?ie&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne,0,0,Pe.width,Pe.height,Ie,Pe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne,Ke,Pe.width,Pe.height,0,Pe.data):Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):H?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne,0,0,Pe.width,Pe.height,Ie,Be,Pe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne,Ke,Pe.width,Pe.height,0,Ie,Be,Pe.data)}}}else{if(Se=y.mipmaps,H&&pe){Se.length>0&&me++;const oe=ze(xe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,me,Ke,oe.width,oe.height)}for(let oe=0;oe<6;oe++)if(Le){H?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,xe[oe].width,xe[oe].height,Ie,Be,xe[oe].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,Ke,xe[oe].width,xe[oe].height,0,Ie,Be,xe[oe].data);for(let Ne=0;Ne<Se.length;Ne++){const yt=Se[Ne].image[oe].image;H?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne+1,0,0,yt.width,yt.height,Ie,Be,yt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne+1,Ke,yt.width,yt.height,0,Ie,Be,yt.data)}}else{H?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,Ie,Be,xe[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,Ke,Ie,Be,xe[oe]);for(let Ne=0;Ne<Se.length;Ne++){const Pe=Se[Ne];H?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne+1,0,0,Ie,Be,Pe.image[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne+1,Ke,Ie,Be,Pe.image[oe])}}}m(y)&&_(i.TEXTURE_CUBE_MAP),le.__version=Z.version,y.onUpdate&&y.onUpdate(y)}I.__version=y.version}function ae(I,y,B,q,Z,le){const ue=s.convert(B.format,B.colorSpace),Q=s.convert(B.type),ne=b(B.internalFormat,ue,Q,B.normalized,B.colorSpace),de=n.get(y),Le=n.get(B);if(Le.__renderTarget=y,!de.__hasExternalTextures){const xe=Math.max(1,y.width>>le),fe=Math.max(1,y.height>>le);Z===i.TEXTURE_3D||Z===i.TEXTURE_2D_ARRAY?t.texImage3D(Z,le,ne,xe,fe,y.depth,0,ue,Q,null):t.texImage2D(Z,le,ne,xe,fe,0,ue,Q,null)}t.bindFramebuffer(i.FRAMEBUFFER,I),St(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,Z,Le.__webglTexture,0,xt(y)):(Z===i.TEXTURE_2D||Z>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,q,Z,Le.__webglTexture,le),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ee(I,y,B){if(i.bindRenderbuffer(i.RENDERBUFFER,I),y.depthBuffer){const q=y.depthTexture,Z=q&&q.isDepthTexture?q.type:null,le=w(y.stencilBuffer,Z),ue=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;St(y)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,xt(y),le,y.width,y.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,xt(y),le,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,le,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ue,i.RENDERBUFFER,I)}else{const q=y.textures;for(let Z=0;Z<q.length;Z++){const le=q[Z],ue=s.convert(le.format,le.colorSpace),Q=s.convert(le.type),ne=b(le.internalFormat,ue,Q,le.normalized,le.colorSpace);St(y)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,xt(y),ne,y.width,y.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,xt(y),ne,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,ne,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ze(I,y,B){const q=y.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,I),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Z=n.get(y.depthTexture);if(Z.__renderTarget=y,(!Z.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),q){if(Z.__webglInit===void 0&&(Z.__webglInit=!0,y.depthTexture.addEventListener("dispose",P)),Z.__webglTexture===void 0){Z.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),Ue(i.TEXTURE_CUBE_MAP,y.depthTexture);const de=s.convert(y.depthTexture.format),Le=s.convert(y.depthTexture.type);let xe;y.depthTexture.format===ii?xe=i.DEPTH_COMPONENT24:y.depthTexture.format===Ii&&(xe=i.DEPTH24_STENCIL8);for(let fe=0;fe<6;fe++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,xe,y.width,y.height,0,de,Le,null)}}else j(y.depthTexture,0);const le=Z.__webglTexture,ue=xt(y),Q=q?i.TEXTURE_CUBE_MAP_POSITIVE_X+B:i.TEXTURE_2D,ne=y.depthTexture.format===Ii?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(y.depthTexture.format===ii)St(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ne,Q,le,0,ue):i.framebufferTexture2D(i.FRAMEBUFFER,ne,Q,le,0);else if(y.depthTexture.format===Ii)St(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ne,Q,le,0,ue):i.framebufferTexture2D(i.FRAMEBUFFER,ne,Q,le,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ce(I){const y=n.get(I),B=I.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==I.depthTexture){const q=I.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),q){const Z=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,q.removeEventListener("dispose",Z)};q.addEventListener("dispose",Z),y.__depthDisposeCallback=Z}y.__boundDepthTexture=q}if(I.depthTexture&&!y.__autoAllocateDepthBuffer)if(B)for(let q=0;q<6;q++)Ze(y.__webglFramebuffer[q],I,q);else{const q=I.texture.mipmaps;q&&q.length>0?Ze(y.__webglFramebuffer[0],I,0):Ze(y.__webglFramebuffer,I,0)}else if(B){y.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[q]),y.__webglDepthbuffer[q]===void 0)y.__webglDepthbuffer[q]=i.createRenderbuffer(),Ee(y.__webglDepthbuffer[q],I,!1);else{const Z=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,le=y.__webglDepthbuffer[q];i.bindRenderbuffer(i.RENDERBUFFER,le),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,le)}}else{const q=I.texture.mipmaps;if(q&&q.length>0?t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),Ee(y.__webglDepthbuffer,I,!1);else{const Z=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,le=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,le),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,le)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Fe(I,y,B){const q=n.get(I);y!==void 0&&ae(q.__webglFramebuffer,I,I.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&Ce(I)}function qe(I){const y=I.texture,B=n.get(I),q=n.get(y);I.addEventListener("dispose",S);const Z=I.textures,le=I.isWebGLCubeRenderTarget===!0,ue=Z.length>1;if(ue||(q.__webglTexture===void 0&&(q.__webglTexture=i.createTexture()),q.__version=y.version,a.memory.textures++),le){B.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(y.mipmaps&&y.mipmaps.length>0){B.__webglFramebuffer[Q]=[];for(let ne=0;ne<y.mipmaps.length;ne++)B.__webglFramebuffer[Q][ne]=i.createFramebuffer()}else B.__webglFramebuffer[Q]=i.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){B.__webglFramebuffer=[];for(let Q=0;Q<y.mipmaps.length;Q++)B.__webglFramebuffer[Q]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(ue)for(let Q=0,ne=Z.length;Q<ne;Q++){const de=n.get(Z[Q]);de.__webglTexture===void 0&&(de.__webglTexture=i.createTexture(),a.memory.textures++)}if(I.samples>0&&St(I)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let Q=0;Q<Z.length;Q++){const ne=Z[Q];B.__webglColorRenderbuffer[Q]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[Q]);const de=s.convert(ne.format,ne.colorSpace),Le=s.convert(ne.type),xe=b(ne.internalFormat,de,Le,ne.normalized,ne.colorSpace,I.isXRRenderTarget===!0),fe=xt(I);i.renderbufferStorageMultisample(i.RENDERBUFFER,fe,xe,I.width,I.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Q,i.RENDERBUFFER,B.__webglColorRenderbuffer[Q])}i.bindRenderbuffer(i.RENDERBUFFER,null),I.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),Ee(B.__webglDepthRenderbuffer,I,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(le){t.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),Ue(i.TEXTURE_CUBE_MAP,y);for(let Q=0;Q<6;Q++)if(y.mipmaps&&y.mipmaps.length>0)for(let ne=0;ne<y.mipmaps.length;ne++)ae(B.__webglFramebuffer[Q][ne],I,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ne);else ae(B.__webglFramebuffer[Q],I,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);m(y)&&_(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ue){for(let Q=0,ne=Z.length;Q<ne;Q++){const de=Z[Q],Le=n.get(de);let xe=i.TEXTURE_2D;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(xe=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(xe,Le.__webglTexture),Ue(xe,de),ae(B.__webglFramebuffer,I,de,i.COLOR_ATTACHMENT0+Q,xe,0),m(de)&&_(xe)}t.unbindTexture()}else{let Q=i.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(Q=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Q,q.__webglTexture),Ue(Q,y),y.mipmaps&&y.mipmaps.length>0)for(let ne=0;ne<y.mipmaps.length;ne++)ae(B.__webglFramebuffer[ne],I,y,i.COLOR_ATTACHMENT0,Q,ne);else ae(B.__webglFramebuffer,I,y,i.COLOR_ATTACHMENT0,Q,0);m(y)&&_(Q),t.unbindTexture()}I.depthBuffer&&Ce(I)}function Xe(I){const y=I.textures;for(let B=0,q=y.length;B<q;B++){const Z=y[B];if(m(Z)){const le=M(I),ue=n.get(Z).__webglTexture;t.bindTexture(le,ue),_(le),t.unbindTexture()}}}const Mt=[],Dt=[];function Wt(I){if(I.samples>0){if(St(I)===!1){const y=I.textures,B=I.width,q=I.height;let Z=i.COLOR_BUFFER_BIT;const le=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ue=n.get(I),Q=y.length>1;if(Q)for(let de=0;de<y.length;de++)t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ue.__webglMultisampledFramebuffer);const ne=I.texture.mipmaps;ne&&ne.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ue.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ue.__webglFramebuffer);for(let de=0;de<y.length;de++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(Z|=i.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(Z|=i.STENCIL_BUFFER_BIT)),Q){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ue.__webglColorRenderbuffer[de]);const Le=n.get(y[de]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Le,0)}i.blitFramebuffer(0,0,B,q,0,0,B,q,Z,i.NEAREST),c===!0&&(Mt.length=0,Dt.length=0,Mt.push(i.COLOR_ATTACHMENT0+de),I.depthBuffer&&I.storeMultisampledDepthBuffer===!1&&(Mt.push(le),Dt.push(le),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Dt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Mt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Q)for(let de=0;de<y.length;de++){t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.RENDERBUFFER,ue.__webglColorRenderbuffer[de]);const Le=n.get(y[de]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.TEXTURE_2D,Le,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ue.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.storeMultisampledDepthBuffer===!1&&c){const y=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function xt(I){return Math.min(r.maxSamples,I.samples)}function St(I){const y=n.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function G(I){const y=a.render.frame;u.get(I)!==y&&(u.set(I,y),I.update())}function Je(I,y){const B=I.colorSpace,q=I.format,Z=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||B!==$r&&B!==Pn&&(nt.getTransfer(B)===gt?(q!==pn||Z!==fn)&&Ge("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):at("WebGLTextures: Unsupported texture color space:",B)),y}function ze(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(l.width=I.naturalWidth||I.width,l.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(l.width=I.displayWidth,l.height=I.displayHeight):(l.width=I.width,l.height=I.height),l}this.allocateTextureUnit=z,this.resetTextureUnits=U,this.getTextureUnits=D,this.setTextureUnits=F,this.setTexture2D=j,this.setTexture2DArray=X,this.setTexture3D=te,this.setTextureCube=O,this.rebindTextures=Fe,this.setupRenderTarget=qe,this.updateRenderTargetMipmap=Xe,this.updateMultisampleRenderTarget=Wt,this.setupDepthRenderbuffer=Ce,this.setupFrameBufferTexture=ae,this.useMultisampledRTT=St,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function B_(i,e){function t(n,r=Pn){let s;const a=nt.getTransfer(r);if(n===fn)return i.UNSIGNED_BYTE;if(n===bl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===yl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===$h)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Zh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===qh)return i.BYTE;if(n===Kh)return i.SHORT;if(n===qr)return i.UNSIGNED_SHORT;if(n===Sl)return i.INT;if(n===Wn)return i.UNSIGNED_INT;if(n===kn)return i.FLOAT;if(n===Xn)return i.HALF_FLOAT;if(n===Jh)return i.ALPHA;if(n===Qh)return i.RGB;if(n===pn)return i.RGBA;if(n===ii)return i.DEPTH_COMPONENT;if(n===Ii)return i.DEPTH_STENCIL;if(n===jh)return i.RED;if(n===wl)return i.RED_INTEGER;if(n===zi)return i.RG;if(n===El)return i.RG_INTEGER;if(n===Al)return i.RGBA_INTEGER;if(n===Hs||n===Vs||n===Ws||n===Xs)if(a===gt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Hs)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Vs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ws)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Xs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Hs)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Vs)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ws)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Xs)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Eo||n===Ao||n===To||n===Ro)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Eo)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ao)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===To)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ro)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Co||n===Lo||n===Po||n===Do||n===Io||n===Js||n===No)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Co||n===Lo)return a===gt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Po)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===Do)return s.COMPRESSED_R11_EAC;if(n===Io)return s.COMPRESSED_SIGNED_R11_EAC;if(n===Js)return s.COMPRESSED_RG11_EAC;if(n===No)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Uo||n===Fo||n===Oo||n===Bo||n===zo||n===ko||n===Go||n===Ho||n===Vo||n===Wo||n===Xo||n===Yo||n===qo||n===Ko)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Uo)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Fo)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Oo)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Bo)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===zo)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ko)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Go)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ho)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Vo)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Wo)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Xo)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Yo)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===qo)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ko)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===$o||n===Zo||n===Jo)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===$o)return a===gt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Zo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Jo)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Qo||n===jo||n===Qs||n===el)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Qo)return s.COMPRESSED_RED_RGTC1_EXT;if(n===jo)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Qs)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===el)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Kr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const z_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,k_=`
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

}`;class G_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new cu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new At({vertexShader:z_,fragmentShader:k_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Yt(new _n(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class H_ extends Gi{constructor(e,t){super();const n=this;let r=null,s=1,a=null,o="local-floor",c=1,l=null,u=null,d=null,h=null,p=null,g=null;const v=typeof XRWebGLBinding<"u",x=new G_,m={},_=t.getContextAttributes();let M=null,b=null;const w=[],E=[],P=new He;let S=null,A=null;const L=new dn;L.viewport=new ct;const R=new dn;R.viewport=new ct;const N=[L,R],U=new Zm;let D=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ee){let se=w[ee];return se===void 0&&(se=new Ba,w[ee]=se),se.getTargetRaySpace()},this.getControllerGrip=function(ee){let se=w[ee];return se===void 0&&(se=new Ba,w[ee]=se),se.getGripSpace()},this.getHand=function(ee){let se=w[ee];return se===void 0&&(se=new Ba,w[ee]=se),se.getHandSpace()};function z(ee){const se=E.indexOf(ee.inputSource);if(se===-1)return;const W=w[se];W!==void 0&&(W.update(ee.inputSource,ee.frame,l||a),W.dispatchEvent({type:ee.type,data:ee.inputSource}))}function Y(){r.removeEventListener("select",z),r.removeEventListener("selectstart",z),r.removeEventListener("selectend",z),r.removeEventListener("squeeze",z),r.removeEventListener("squeezestart",z),r.removeEventListener("squeezeend",z),r.removeEventListener("end",Y),r.removeEventListener("inputsourceschange",j);for(let ee=0;ee<w.length;ee++){const se=E[ee];se!==null&&(E[ee]=null,w[ee].disconnect(se))}D=null,F=null,x.reset();for(const ee in m)delete m[ee];if(e.setRenderTarget(M),p=null,h=null,d=null,r=null,b=null,ke.stop(),n.isPresenting=!1,e.setPixelRatio(S),e.setSize(P.width,P.height,!1),A!==null){const ee=A.camera;ee.fov=A.fov,ee.zoom=A.zoom,ee.updateProjectionMatrix(),A=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ee){s=ee,n.isPresenting===!0&&Ge("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ee){o=ee,n.isPresenting===!0&&Ge("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(ee){l=ee},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return d===null&&v&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(ee){if(r=ee,r!==null){if(M=e.getRenderTarget(),r.addEventListener("select",z),r.addEventListener("selectstart",z),r.addEventListener("selectend",z),r.addEventListener("squeeze",z),r.addEventListener("squeezestart",z),r.addEventListener("squeezeend",z),r.addEventListener("end",Y),r.addEventListener("inputsourceschange",j),_.xrCompatible!==!0&&await t.makeXRCompatible(),S=e.getPixelRatio(),e.getSize(P),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let W=null,he=null,ae=null;_.depth&&(ae=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,W=_.stencil?Ii:ii,he=_.stencil?Kr:Wn);const Ee={colorFormat:t.RGBA8,depthFormat:ae,scaleFactor:s};d=this.getBinding(),h=d.createProjectionLayer(Ee),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),b=new wn(h.textureWidth,h.textureHeight,{format:pn,type:fn,depthTexture:new Sr(h.textureWidth,h.textureHeight,he,void 0,void 0,void 0,void 0,void 0,void 0,W),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{const W={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,W),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),b=new wn(p.framebufferWidth,p.framebufferHeight,{format:pn,type:fn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),ke.setContext(r),ke.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function j(ee){for(let se=0;se<ee.removed.length;se++){const W=ee.removed[se],he=E.indexOf(W);he>=0&&(E[he]=null,w[he].disconnect(W))}for(let se=0;se<ee.added.length;se++){const W=ee.added[se];let he=E.indexOf(W);if(he===-1){for(let Ee=0;Ee<w.length;Ee++)if(Ee>=E.length){E.push(W),he=Ee;break}else if(E[Ee]===null){E[Ee]=W,he=Ee;break}if(he===-1)break}const ae=w[he];ae&&ae.connect(W)}}const X=new V,te=new V;function O(ee,se,W){X.setFromMatrixPosition(se.matrixWorld),te.setFromMatrixPosition(W.matrixWorld);const he=X.distanceTo(te),ae=se.projectionMatrix.elements,Ee=W.projectionMatrix.elements,Ze=ae[14]/(ae[10]-1),Ce=ae[14]/(ae[10]+1),Fe=(ae[9]+1)/ae[5],qe=(ae[9]-1)/ae[5],Xe=(ae[8]-1)/ae[0],Mt=(Ee[8]+1)/Ee[0],Dt=Ze*Xe,Wt=Ze*Mt,xt=he/(-Xe+Mt),St=xt*-Xe;if(se.matrixWorld.decompose(ee.position,ee.quaternion,ee.scale),ee.translateX(St),ee.translateZ(xt),ee.matrixWorld.compose(ee.position,ee.quaternion,ee.scale),ee.matrixWorldInverse.copy(ee.matrixWorld).invert(),ae[10]===-1)ee.projectionMatrix.copy(se.projectionMatrix),ee.projectionMatrixInverse.copy(se.projectionMatrixInverse);else{const G=Ze+xt,Je=Ce+xt,ze=Dt-St,I=Wt+(he-St),y=Fe*Ce/Je*G,B=qe*Ce/Je*G;ee.projectionMatrix.makePerspective(ze,I,y,B,G,Je),ee.projectionMatrixInverse.copy(ee.projectionMatrix).invert()}}function re(ee,se){se===null?ee.matrixWorld.copy(ee.matrix):ee.matrixWorld.multiplyMatrices(se.matrixWorld,ee.matrix),ee.matrixWorldInverse.copy(ee.matrixWorld).invert()}this.updateCamera=function(ee){if(r===null)return;let se=ee.near,W=ee.far;x.texture!==null&&(x.depthNear>0&&(se=x.depthNear),x.depthFar>0&&(W=x.depthFar)),U.near=R.near=L.near=se,U.far=R.far=L.far=W,(D!==U.near||F!==U.far)&&(r.updateRenderState({depthNear:U.near,depthFar:U.far}),D=U.near,F=U.far),U.layers.mask=ee.layers.mask|6,L.layers.mask=U.layers.mask&-5,R.layers.mask=U.layers.mask&-3;const he=ee.parent,ae=U.cameras;re(U,he);for(let Ee=0;Ee<ae.length;Ee++)re(ae[Ee],he);ae.length===2?O(U,L,R):U.projectionMatrix.copy(L.projectionMatrix),A===null&&ee.isPerspectiveCamera&&(A={camera:ee,fov:ee.fov,zoom:ee.zoom}),ce(ee,U,he)};function ce(ee,se,W){W===null?ee.matrix.copy(se.matrixWorld):(ee.matrix.copy(W.matrixWorld),ee.matrix.invert(),ee.matrix.multiply(se.matrixWorld)),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.updateMatrixWorld(!0),ee.projectionMatrix.copy(se.projectionMatrix),ee.projectionMatrixInverse.copy(se.projectionMatrixInverse),ee.isPerspectiveCamera&&(ee.fov=tl*2*Math.atan(1/ee.projectionMatrix.elements[5]),ee.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(h===null&&p===null))return c},this.setFoveation=function(ee){c=ee,h!==null&&(h.fixedFoveation=ee),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=ee)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(U)},this.getCameraTexture=function(ee){return m[ee]};let be=null;function Ue(ee,se){if(u=se.getViewerPose(l||a),g=se,u!==null){const W=u.views;p!==null&&(e.setRenderTargetFramebuffer(b,p.framebuffer),e.setRenderTarget(b));let he=!1;W.length!==U.cameras.length&&(U.cameras.length=0,he=!0);for(let Ce=0;Ce<W.length;Ce++){const Fe=W[Ce];let qe=null;if(p!==null)qe=p.getViewport(Fe);else{const Mt=d.getViewSubImage(h,Fe);qe=Mt.viewport,Ce===0&&(e.setRenderTargetTextures(b,Mt.colorTexture,Mt.depthStencilTexture),e.setRenderTarget(b))}let Xe=N[Ce];Xe===void 0&&(Xe=new dn,Xe.layers.enable(Ce),Xe.viewport=new ct,N[Ce]=Xe),Xe.matrix.fromArray(Fe.transform.matrix),Xe.matrix.decompose(Xe.position,Xe.quaternion,Xe.scale),Xe.projectionMatrix.fromArray(Fe.projectionMatrix),Xe.projectionMatrixInverse.copy(Xe.projectionMatrix).invert(),Xe.viewport.set(qe.x,qe.y,qe.width,qe.height),Ce===0&&(U.matrix.copy(Xe.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),he===!0&&U.cameras.push(Xe)}const ae=r.enabledFeatures;if(ae&&ae.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&v){d=n.getBinding();const Ce=d.getDepthInformation(W[0]);Ce&&Ce.isValid&&Ce.texture&&x.init(Ce,r.renderState)}if(ae&&ae.includes("camera-access")&&v){e.state.unbindTexture(),d=n.getBinding();for(let Ce=0;Ce<W.length;Ce++){const Fe=W[Ce].camera;if(Fe){let qe=m[Fe];qe||(qe=new cu,m[Fe]=qe);const Xe=d.getCameraImage(Fe);qe.sourceTexture=Xe}}}}for(let W=0;W<w.length;W++){const he=E[W],ae=w[W];he!==null&&ae!==void 0&&ae.update(he,se,l||a)}be&&be(ee,se),se.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:se}),g=null}const ke=new fu;ke.setAnimationLoop(Ue),this.setAnimationLoop=function(ee){be=ee},this.dispose=function(){}}}const V_=new Pt,Mu=new Ve;Mu.set(-1,0,0,0,1,0,0,0,1);function W_(i,e){function t(x,m){x.matrixAutoUpdate===!0&&x.updateMatrix(),m.value.copy(x.matrix)}function n(x,m){m.color.getRGB(x.fogColor.value,hu(i)),m.isFog?(x.fogNear.value=m.near,x.fogFar.value=m.far):m.isFogExp2&&(x.fogDensity.value=m.density)}function r(x,m,_,M,b){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?s(x,m):m.isMeshLambertMaterial?(s(x,m),m.envMap&&(x.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(s(x,m),d(x,m)):m.isMeshPhongMaterial?(s(x,m),u(x,m),m.envMap&&(x.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(s(x,m),h(x,m),m.isMeshPhysicalMaterial&&p(x,m,b)):m.isMeshMatcapMaterial?(s(x,m),g(x,m)):m.isMeshDepthMaterial?s(x,m):m.isMeshDistanceMaterial?(s(x,m),v(x,m)):m.isMeshNormalMaterial?s(x,m):m.isLineBasicMaterial?(a(x,m),m.isLineDashedMaterial&&o(x,m)):m.isPointsMaterial?c(x,m,_,M):m.isSpriteMaterial?l(x,m):m.isShadowMaterial?(x.color.value.copy(m.color),x.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(x,m){x.opacity.value=m.opacity,m.color&&x.diffuse.value.copy(m.color),m.emissive&&x.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(x.map.value=m.map,t(m.map,x.mapTransform)),m.alphaMap&&(x.alphaMap.value=m.alphaMap,t(m.alphaMap,x.alphaMapTransform)),m.bumpMap&&(x.bumpMap.value=m.bumpMap,t(m.bumpMap,x.bumpMapTransform),x.bumpScale.value=m.bumpScale,m.side===on&&(x.bumpScale.value*=-1)),m.normalMap&&(x.normalMap.value=m.normalMap,t(m.normalMap,x.normalMapTransform),x.normalScale.value.copy(m.normalScale),m.side===on&&x.normalScale.value.negate()),m.displacementMap&&(x.displacementMap.value=m.displacementMap,t(m.displacementMap,x.displacementMapTransform),x.displacementScale.value=m.displacementScale,x.displacementBias.value=m.displacementBias),m.emissiveMap&&(x.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,x.emissiveMapTransform)),m.specularMap&&(x.specularMap.value=m.specularMap,t(m.specularMap,x.specularMapTransform)),m.alphaTest>0&&(x.alphaTest.value=m.alphaTest);const _=e.get(m),M=_.envMap,b=_.envMapRotation;M&&(x.envMap.value=M,x.envMapRotation.value.setFromMatrix4(V_.makeRotationFromEuler(b)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&x.envMapRotation.value.premultiply(Mu),x.reflectivity.value=m.reflectivity,x.ior.value=m.ior,x.refractionRatio.value=m.refractionRatio),m.lightMap&&(x.lightMap.value=m.lightMap,x.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,x.lightMapTransform)),m.aoMap&&(x.aoMap.value=m.aoMap,x.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,x.aoMapTransform))}function a(x,m){x.diffuse.value.copy(m.color),x.opacity.value=m.opacity,m.map&&(x.map.value=m.map,t(m.map,x.mapTransform))}function o(x,m){x.dashSize.value=m.dashSize,x.totalSize.value=m.dashSize+m.gapSize,x.scale.value=m.scale}function c(x,m,_,M){x.diffuse.value.copy(m.color),x.opacity.value=m.opacity,x.size.value=m.size*_,x.scale.value=M*.5,m.map&&(x.map.value=m.map,t(m.map,x.uvTransform)),m.alphaMap&&(x.alphaMap.value=m.alphaMap,t(m.alphaMap,x.alphaMapTransform)),m.alphaTest>0&&(x.alphaTest.value=m.alphaTest)}function l(x,m){x.diffuse.value.copy(m.color),x.opacity.value=m.opacity,x.rotation.value=m.rotation,m.map&&(x.map.value=m.map,t(m.map,x.mapTransform)),m.alphaMap&&(x.alphaMap.value=m.alphaMap,t(m.alphaMap,x.alphaMapTransform)),m.alphaTest>0&&(x.alphaTest.value=m.alphaTest)}function u(x,m){x.specular.value.copy(m.specular),x.shininess.value=Math.max(m.shininess,1e-4)}function d(x,m){m.gradientMap&&(x.gradientMap.value=m.gradientMap)}function h(x,m){x.metalness.value=m.metalness,m.metalnessMap&&(x.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,x.metalnessMapTransform)),x.roughness.value=m.roughness,m.roughnessMap&&(x.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,x.roughnessMapTransform)),m.envMap&&(x.envMapIntensity.value=m.envMapIntensity)}function p(x,m,_){x.ior.value=m.ior,m.sheen>0&&(x.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),x.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(x.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,x.sheenColorMapTransform)),m.sheenRoughnessMap&&(x.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,x.sheenRoughnessMapTransform))),m.clearcoat>0&&(x.clearcoat.value=m.clearcoat,x.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(x.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,x.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(x.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===on&&x.clearcoatNormalScale.value.negate())),m.dispersion>0&&(x.dispersion.value=m.dispersion),m.retroreflectivity>0&&(x.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(x.iridescence.value=m.iridescence,x.iridescenceIOR.value=m.iridescenceIOR,x.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(x.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,x.iridescenceMapTransform)),m.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),m.transmission>0&&(x.transmission.value=m.transmission,x.transmissionSamplerMap.value=_.texture,x.transmissionSamplerSize.value.set(_.width,_.height),m.transmissionMap&&(x.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,x.transmissionMapTransform)),x.thickness.value=m.thickness,m.thicknessMap&&(x.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=m.attenuationDistance,x.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(x.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(x.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=m.specularIntensity,x.specularColor.value.copy(m.specularColor),m.specularColorMap&&(x.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,x.specularColorMapTransform)),m.specularIntensityMap&&(x.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,x.specularIntensityMapTransform))}function g(x,m){m.matcap&&(x.matcap.value=m.matcap)}function v(x,m){const _=e.get(m).light;x.referencePosition.value.setFromMatrixPosition(_.matrixWorld),x.nearDistance.value=_.shadow.camera.near,x.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function X_(i,e,t,n){let r={},s={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(b,w){const E=w.program;n.uniformBlockBinding(b,E)}function l(b,w){let E=r[b.id];E===void 0&&(x(b),E=u(b),r[b.id]=E,b.addEventListener("dispose",_));const P=w.program;n.updateUBOMapping(b,P);const S=e.render.frame;s[b.id]!==S&&(h(b),s[b.id]=S)}function u(b){const w=d();b.__bindingPointIndex=w;const E=i.createBuffer(),P=b.__size,S=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,P,S),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,w,E),E}function d(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return at("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(b){const w=r[b.id],E=b.uniforms,P=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let S=0,A=E.length;S<A;S++){const L=E[S];if(Array.isArray(L))for(let R=0,N=L.length;R<N;R++)p(L[R],S,R,P);else p(L,S,0,P)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(b,w,E,P){if(v(b,w,E,P)===!0){const S=b.__offset,A=b.value;if(Array.isArray(A)){let L=0;for(let R=0;R<A.length;R++){const N=A[R],U=m(N);g(N,b.__data,L),typeof N!="number"&&typeof N!="boolean"&&!N.isMatrix3&&!ArrayBuffer.isView(N)&&(L+=U.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(A,b.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,S,b.__data)}}function g(b,w,E){typeof b=="number"||typeof b=="boolean"?w[0]=b:b.isMatrix3?(w[0]=b.elements[0],w[1]=b.elements[1],w[2]=b.elements[2],w[3]=0,w[4]=b.elements[3],w[5]=b.elements[4],w[6]=b.elements[5],w[7]=0,w[8]=b.elements[6],w[9]=b.elements[7],w[10]=b.elements[8],w[11]=0):ArrayBuffer.isView(b)?w.set(new b.constructor(b.buffer,b.byteOffset,w.length)):b.toArray(w,E)}function v(b,w,E,P){const S=b.value,A=w+"_"+E;if(P[A]===void 0)return typeof S=="number"||typeof S=="boolean"?P[A]=S:ArrayBuffer.isView(S)?P[A]=S.slice():P[A]=S.clone(),!0;{const L=P[A];if(typeof S=="number"||typeof S=="boolean"){if(L!==S)return P[A]=S,!0}else{if(ArrayBuffer.isView(S))return!0;if(L.equals(S)===!1)return L.copy(S),!0}}return!1}function x(b){const w=b.uniforms;let E=0;const P=16;for(let A=0,L=w.length;A<L;A++){const R=Array.isArray(w[A])?w[A]:[w[A]];for(let N=0,U=R.length;N<U;N++){const D=R[N],F=Array.isArray(D.value)?D.value:[D.value];for(let z=0,Y=F.length;z<Y;z++){const j=F[z],X=m(j),te=E%P,O=te%X.boundary,re=te+O;E+=O,re!==0&&P-re<X.storage&&(E+=P-re),D.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=E,E+=X.storage}}}const S=E%P;return S>0&&(E+=P-S),b.__size=E,b.__cache={},this}function m(b){const w={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(w.boundary=4,w.storage=4):b.isVector2?(w.boundary=8,w.storage=8):b.isVector3||b.isColor?(w.boundary=16,w.storage=12):b.isVector4?(w.boundary=16,w.storage=16):b.isMatrix3?(w.boundary=48,w.storage=48):b.isMatrix4?(w.boundary=64,w.storage=64):b.isTexture?Ge("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(b)?(w.boundary=16,w.storage=b.byteLength):Ge("WebGLRenderer: Unsupported uniform value type.",b),w}function _(b){const w=b.target;w.removeEventListener("dispose",_);const E=a.indexOf(w.__bindingPointIndex);a.splice(E,1),i.deleteBuffer(r[w.id]),delete r[w.id],delete s[w.id]}function M(){for(const b in r)i.deleteBuffer(r[b]);a=[],r={},s={}}return{bind:c,update:l,dispose:M}}const Y_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Bn=null;function q_(){return Bn===null&&(Bn=new cr(Y_,16,16,zi,Xn),Bn.name="DFG_LUT",Bn.minFilter=Nt,Bn.magFilter=Nt,Bn.wrapS=ei,Bn.wrapT=ei,Bn.generateMipmaps=!1,Bn.needsUpdate=!0),Bn}class K_{constructor(e={}){const{canvas:t=fm(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1,outputBufferType:p=fn}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const v=p,x=new Set([Al,El,wl]),m=new Set([fn,Wn,qr,Kr,bl,yl]),_=new Uint32Array(4),M=new Int32Array(4),b=new V;let w=null,E=null;const P=[],S=[];let A=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Vn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const L=this;let R=!1,N=null,U=null,D=null,F=null;this._outputColorSpace=bn;let z=0,Y=0,j=null,X=-1,te=null;const O=new ct,re=new ct;let ce=null;const be=new et(0);let Ue=0,ke=t.width,ee=t.height,se=1,W=null,he=null;const ae=new ct(0,0,ke,ee),Ee=new ct(0,0,ke,ee);let Ze=!1;const Ce=new na;let Fe=!1,qe=!1;const Xe=new Pt,Mt=new V,Dt=new ct,Wt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let xt=!1;function St(){return j===null?se:1}let G=n;function Je(T,k){return t.getContext(T,k)}let ze,I,y,B,q,Z,le,ue,Q,ne,de,Le,xe,fe,Ie,Be,Ke,H,pe,ie,me,Se,oe;try{const T={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${xl}`),t.addEventListener("webglcontextlost",yt,!1),t.addEventListener("webglcontextrestored",ht,!1),t.addEventListener("webglcontextcreationerror",An,!1),G===null){const k="webgl2";if(G=Je(k,T),G===null)throw Je(k)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ne()}catch(T){throw t.removeEventListener("webglcontextlost",yt,!1),t.removeEventListener("webglcontextrestored",ht,!1),t.removeEventListener("webglcontextcreationerror",An,!1),at("WebGLRenderer: "+T.message),T}function Ne(){ze=new qx(G),ze.init(),me=new B_(G,ze),I=new Ox(G,ze,e,me),y=new F_(G,ze),I.reversedDepthBuffer&&h&&y.buffers.depth.setReversed(!0),U=G.createFramebuffer(),D=G.createFramebuffer(),F=G.createFramebuffer(),B=new Zx(G),q=new b_,Z=new O_(G,ze,y,q,I,me,B),le=new Yx(L),ue=new Qm(G),Se=new Ux(G,ue),Q=new Kx(G,ue,B,Se),ne=new Qx(G,Q,ue,Se,B),H=new Jx(G,I,Z),Ie=new Bx(q),de=new S_(L,le,ze,I,Se,Ie),Le=new W_(L,q),xe=new w_,fe=new L_(ze),Ke=new Nx(L,le,y,ne,g,c),Be=new U_(L,ne,I),oe=new X_(G,B,I,y),pe=new Fx(G,ze,B),ie=new $x(G,ze,B),B.programs=de.programs,L.capabilities=I,L.extensions=ze,L.properties=q,L.renderLists=xe,L.shadowMap=Be,L.state=y,L.info=B}v!==fn&&(A=new ev(v,t.width,t.height,o,r,s));const Pe=new H_(L,G);this.xr=Pe,this.getContext=function(){return G},this.getContextAttributes=function(){return G.getContextAttributes()},this.forceContextLoss=function(){const T=ze.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=ze.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return se},this.setPixelRatio=function(T){T!==void 0&&(se=T,this.setSize(ke,ee,!1))},this.getSize=function(T){return T.set(ke,ee)},this.setSize=function(T,k,J=!0){if(Pe.isPresenting){Ge("WebGLRenderer: Can't change size while VR device is presenting.");return}ke=T,ee=k,t.width=Math.floor(T*se),t.height=Math.floor(k*se),J===!0&&(t.style.width=T+"px",t.style.height=k+"px"),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,T,k)},this.getDrawingBufferSize=function(T){return T.set(ke*se,ee*se).floor()},this.setDrawingBufferSize=function(T,k,J){ke=T,ee=k,se=J,t.width=Math.floor(T*J),t.height=Math.floor(k*J),this.setViewport(0,0,T,k)},this.setEffects=function(T){if(v===fn){at("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let k=0;k<T.length;k++)if(T[k].isOutputPass===!0){Ge("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(O)},this.getViewport=function(T){return T.copy(ae)},this.setViewport=function(T,k,J,K){T.isVector4?ae.set(T.x,T.y,T.z,T.w):ae.set(T,k,J,K),y.viewport(O.copy(ae).multiplyScalar(se).round())},this.getScissor=function(T){return T.copy(Ee)},this.setScissor=function(T,k,J,K){T.isVector4?Ee.set(T.x,T.y,T.z,T.w):Ee.set(T,k,J,K),y.scissor(re.copy(Ee).multiplyScalar(se).round())},this.getScissorTest=function(){return Ze},this.setScissorTest=function(T){y.setScissorTest(Ze=T)},this.setOpaqueSort=function(T){W=T},this.setTransparentSort=function(T){he=T},this.getClearColor=function(T){return T.copy(Ke.getClearColor())},this.setClearColor=function(){Ke.setClearColor(...arguments)},this.getClearAlpha=function(){return Ke.getClearAlpha()},this.setClearAlpha=function(){Ke.setClearAlpha(...arguments)},this.clear=function(T=!0,k=!0,J=!0){let K=0;if(T){let $=!1;if(j!==null){const Me=j.texture.format;$=x.has(Me)}if($){const Me=j.texture.type,Ae=m.has(Me),_e=Ke.getClearColor(),Te=Ke.getClearAlpha(),De=_e.r,Qe=_e.g,tt=_e.b;Ae?(_[0]=De,_[1]=Qe,_[2]=tt,_[3]=Te,G.clearBufferuiv(G.COLOR,0,_)):(M[0]=De,M[1]=Qe,M[2]=tt,M[3]=Te,G.clearBufferiv(G.COLOR,0,M))}else K|=G.COLOR_BUFFER_BIT}k&&(K|=G.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),J&&(K|=G.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),K!==0&&G.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),N=T},this.dispose=function(){t.removeEventListener("webglcontextlost",yt,!1),t.removeEventListener("webglcontextrestored",ht,!1),t.removeEventListener("webglcontextcreationerror",An,!1),Ke.dispose(),xe.dispose(),fe.dispose(),q.dispose(),le.dispose(),ne.dispose(),Se.dispose(),oe.dispose(),de.dispose(),Pe.dispose(),Pe.removeEventListener("sessionstart",Bl),Pe.removeEventListener("sessionend",zl),bi.stop()};function yt(T){T.preventDefault(),uc("WebGLRenderer: Context Lost."),R=!0}function ht(){uc("WebGLRenderer: Context Restored."),R=!1;const T=B.autoReset,k=Be.enabled,J=Be.autoUpdate,K=Be.needsUpdate,$=Be.type;Ne(),B.autoReset=T,Be.enabled=k,Be.autoUpdate=J,Be.needsUpdate=K,Be.type=$}function An(T){at("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Un(T){const k=T.target;k.removeEventListener("dispose",Un),Ru(k)}function Ru(T){Cu(T),q.remove(T)}function Cu(T){const k=q.get(T).programs;k!==void 0&&(k.forEach(function(J){de.releaseProgram(J)}),T.isShaderMaterial&&de.releaseShaderCache(T))}this.renderBufferDirect=function(T,k,J,K,$,Me){k===null&&(k=Wt);const Ae=$.isMesh&&$.matrixWorld.determinantAffine()<0,_e=Du(T,k,J,K,$);y.setMaterial(K,Ae);let Te=J.index,De=1;if(K.wireframe===!0){if(Te=Q.getWireframeAttribute(J),Te===void 0)return;De=2}const Qe=J.drawRange,tt=J.attributes.position;let Re=Qe.start*De,ut=(Qe.start+Qe.count)*De;Me!==null&&(Re=Math.max(Re,Me.start*De),ut=Math.min(ut,(Me.start+Me.count)*De)),Te!==null?(Re=Math.max(Re,0),ut=Math.min(ut,Te.count)):tt!=null&&(Re=Math.max(Re,0),ut=Math.min(ut,tt.count));const Ot=ut-Re;if(Ot<0||Ot===1/0)return;Se.setup($,K,_e,J,Te);let Tt,bt=pe;if(Te!==null&&(Tt=ue.get(Te),bt=ie,bt.setIndex(Tt)),$.isMesh)K.wireframe===!0?(y.setLineWidth(K.wireframeLinewidth*St()),bt.setMode(G.LINES)):bt.setMode(G.TRIANGLES);else if($.isLine){let Zt=K.linewidth;Zt===void 0&&(Zt=1),y.setLineWidth(Zt*St()),$.isLineSegments?bt.setMode(G.LINES):$.isLineLoop?bt.setMode(G.LINE_LOOP):bt.setMode(G.LINE_STRIP)}else $.isPoints?bt.setMode(G.POINTS):$.isSprite&&bt.setMode(G.TRIANGLES);if($.isBatchedMesh)if(ze.get("WEBGL_multi_draw"))bt.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{const Zt=$._multiDrawStarts,we=$._multiDrawCounts,tn=$._multiDrawCount,st=Te?ue.get(Te).bytesPerElement:1,Mn=q.get(K).currentProgram.getUniforms();for(let Fn=0;Fn<tn;Fn++)Mn.setValue(G,"_gl_DrawID",Fn),bt.render(Zt[Fn]/st,we[Fn])}else if($.isInstancedMesh)bt.renderInstances(Re,Ot,$.count);else if(J.isInstancedBufferGeometry){const Zt=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,we=Math.min(J.instanceCount,Zt);bt.renderInstances(Re,Ot,we)}else bt.render(Re,Ot)};function Ol(T,k,J,K){N!==null&&T.isNodeMaterial&&N.setObject(K,T),Fe===!0&&Ie.setState(T,J,!1),T.transparent===!0&&T.side===jn&&T.forceSinglePass===!1?(T.side=on,T.needsUpdate=!0,ns(T,k,K),T.side=Oi,T.needsUpdate=!0,ns(T,k,K),T.side=jn):ns(T,k,K)}this.compile=function(T,k,J=null){J===null&&(J=T),N!==null&&N.renderStart(T,k,J),E=fe.get(J),E.init(k),S.push(E),J.traverseVisible(function($){$.isLight&&$.layers.test(k.layers)&&(E.pushLight($),$.castShadow&&E.pushShadow($))}),T!==J&&T.traverseVisible(function($){$.isLight&&$.layers.test(k.layers)&&(E.pushLight($),$.castShadow&&E.pushShadow($))}),E.setupLights(),N!==null&&N.updateLights(E.state.lightsArray),qe=this.localClippingEnabled,Fe=Ie.init(this.clippingPlanes,qe),Fe===!0&&Ie.setGlobalState(this.clippingPlanes,k),N!==null&&Be.render(E.state.shadowsArray,J,k);const K=new Set;return T.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;const Me=$.material;if(Me)if(Array.isArray(Me))for(let Ae=0;Ae<Me.length;Ae++){const _e=Me[Ae];Ol(_e,J,k,$),K.add(_e)}else Ol(Me,J,k,$),K.add(Me)}),E=S.pop(),N!==null&&N.renderEnd(),K},this.compileAsync=function(T,k,J=null){const K=this.compile(T,k,J);return new Promise($=>{function Me(){if(K.forEach(function(Ae){const Te=q.get(Ae).currentProgram;(Te===void 0||Te.isReady())&&K.delete(Ae)}),K.size===0){$(T);return}setTimeout(Me,10)}ze.get("KHR_parallel_shader_compile")!==null?Me():setTimeout(Me,10)})};let Ma=null;function Lu(T){Ma&&Ma(T)}function Bl(){bi.stop()}function zl(){bi.start()}const bi=new fu;bi.setAnimationLoop(Lu),typeof self<"u"&&bi.setContext(self),this.setAnimationLoop=function(T){Ma=T,Pe.setAnimationLoop(T),T===null?bi.stop():bi.start()},Pe.addEventListener("sessionstart",Bl),Pe.addEventListener("sessionend",zl),this.render=function(T,k){if(k!==void 0&&k.isCamera!==!0){at("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;N!==null&&N.renderStart(T,k);const J=Pe.enabled===!0&&Pe.isPresenting===!0,K=A!==null&&(j===null||J)&&A.begin(L,j);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),Pe.enabled===!0&&Pe.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(Pe.cameraAutoUpdate===!0&&Pe.updateCamera(k),k=Pe.getCamera()),T.isScene===!0&&T.onBeforeRender(L,T,k,j),E=fe.get(T,S.length),E.init(k),E.state.textureUnits=Z.getTextureUnits(),S.push(E),Xe.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),Ce.setFromProjectionMatrix(Xe,Gn,k.reversedDepth),qe=this.localClippingEnabled,Fe=Ie.init(this.clippingPlanes,qe),w=xe.get(T,P.length),w.init(),P.push(w),Pe.enabled===!0&&Pe.isPresenting===!0){const Ae=L.xr.getDepthSensingMesh();Ae!==null&&Sa(Ae,k,-1/0,L.sortObjects)}Sa(T,k,0,L.sortObjects),w.finish(),N!==null&&N.updateLights(E.state.lightsArray),L.sortObjects===!0&&w.sort(W,he),xt=Pe.enabled===!1||Pe.isPresenting===!1||Pe.hasDepthSensing()===!1,xt&&Ke.addToRenderList(w,T),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Fe===!0&&Ie.beginShadows();const $=E.state.shadowsArray;if(Be.render($,T,k),Fe===!0&&Ie.endShadows(),(K&&A.hasRenderPass())===!1){const Ae=w.opaque,_e=w.transmissive;if(E.setupLights(),k.isArrayCamera){const Te=k.cameras;if(_e.length>0)for(let De=0,Qe=Te.length;De<Qe;De++){const tt=Te[De];Gl(Ae,_e,T,tt)}xt&&Ke.render(T);for(let De=0,Qe=Te.length;De<Qe;De++){const tt=Te[De];kl(w,T,tt,tt.viewport)}}else _e.length>0&&Gl(Ae,_e,T,k),xt&&Ke.render(T),kl(w,T,k)}j!==null&&Y===0&&(Z.updateMultisampleRenderTarget(j),Z.updateRenderTargetMipmap(j)),K&&A.end(L),T.isScene===!0&&T.onAfterRender(L,T,k),Se.resetDefaultState(),X=-1,te=null,S.pop(),S.length>0?(E=S[S.length-1],Z.setTextureUnits(E.state.textureUnits),Fe===!0&&Ie.setGlobalState(L.clippingPlanes,E.state.camera)):E=null,P.pop(),P.length>0?w=P[P.length-1]:w=null,N!==null&&N.renderEnd()};function Sa(T,k,J,K){if(T.visible===!1)return;if(T.layers.test(k.layers)){if(T.isGroup)J=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(k);else if(T.isLightProbeGrid)E.pushLightProbeGrid(T);else if(T.isLight)E.pushLight(T),T.castShadow&&E.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||T.intersectsFrustum(Ce)){K&&Dt.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Xe);const Ae=ne.update(T),_e=T.material;_e.visible&&w.push(T,Ae,_e,J,Dt.z,null,k)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||T.intersectsFrustum(Ce))){const Ae=ne.update(T),_e=T.material;if(K&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Dt.copy(T.boundingSphere.center)):(Ae.boundingSphere===null&&Ae.computeBoundingSphere(),Dt.copy(Ae.boundingSphere.center)),Dt.applyMatrix4(T.matrixWorld).applyMatrix4(Xe)),Array.isArray(_e)){const Te=Ae.groups;for(let De=0,Qe=Te.length;De<Qe;De++){const tt=Te[De],Re=_e[tt.materialIndex];Re&&Re.visible&&w.push(T,Ae,Re,J,Dt.z,tt,k)}}else _e.visible&&w.push(T,Ae,_e,J,Dt.z,null,k)}}const Me=T.children;for(let Ae=0,_e=Me.length;Ae<_e;Ae++)Sa(Me[Ae],k,J,K)}function kl(T,k,J,K){const{opaque:$,transmissive:Me,transparent:Ae}=T;E.setupLightsView(J),Fe===!0&&Ie.setGlobalState(L.clippingPlanes,J),K&&y.viewport(O.copy(K)),$.length>0&&ts($,k,J),Me.length>0&&ts(Me,k,J),Ae.length>0&&ts(Ae,k,J),y.buffers.depth.setTest(!0),y.buffers.depth.setMask(!0),y.buffers.color.setMask(!0),y.setPolygonOffset(!1)}function Gl(T,k,J,K){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[K.id]===void 0){const Re=ze.has("EXT_color_buffer_half_float")||ze.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[K.id]=new wn(1,1,{generateMipmaps:!0,type:Re?Xn:fn,minFilter:Di,samples:Math.max(4,I.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:nt.workingColorSpace})}const Me=E.state.transmissionRenderTarget[K.id],Ae=K.viewport||O;Me.setSize(Ae.z*L.transmissionResolutionScale,Ae.w*L.transmissionResolutionScale);const _e=L.getRenderTarget(),Te=L.getActiveCubeFace(),De=L.getActiveMipmapLevel();L.setRenderTarget(Me),L.getClearColor(be),Ue=L.getClearAlpha(),Ue<1&&L.setClearColor(16777215,.5),L.clear(),xt&&Ke.render(J);const Qe=L.toneMapping;L.toneMapping=Vn;const tt=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),E.setupLightsView(K),Fe===!0&&Ie.setGlobalState(L.clippingPlanes,K),ts(T,J,K),Z.updateMultisampleRenderTarget(Me),Z.updateRenderTargetMipmap(Me),ze.has("WEBGL_multisampled_render_to_texture")===!1){let Re=!1;for(let ut=0,Ot=k.length;ut<Ot;ut++){const Tt=k[ut],{object:bt,geometry:Zt,material:we,group:tn}=Tt;if(we.side===jn&&bt.layers.test(K.layers)){const st=we.side;we.side=on,we.needsUpdate=!0,Hl(bt,J,K,Zt,we,tn),we.side=st,we.needsUpdate=!0,Re=!0}}Re===!0&&(Z.updateMultisampleRenderTarget(Me),Z.updateRenderTargetMipmap(Me))}L.setRenderTarget(_e,Te,De),L.setClearColor(be,Ue),tt!==void 0&&(K.viewport=tt),L.toneMapping=Qe}function ts(T,k,J){const K=k.isScene===!0?k.overrideMaterial:null;for(let $=0,Me=T.length;$<Me;$++){const Ae=T[$],{object:_e,geometry:Te,group:De}=Ae;let Qe=Ae.material;Qe.allowOverride===!0&&K!==null&&(Qe=K),_e.layers.test(J.layers)&&Hl(_e,k,J,Te,Qe,De)}}function Hl(T,k,J,K,$,Me){N!==null&&$.isNodeMaterial&&N.setObject(T,$),T.onBeforeRender(L,k,J,K,$,Me),T.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),$.onBeforeRender(L,k,J,K,T,Me),$.transparent===!0&&$.side===jn&&$.forceSinglePass===!1?($.side=on,$.needsUpdate=!0,L.renderBufferDirect(J,k,K,$,T,Me),$.side=Oi,$.needsUpdate=!0,L.renderBufferDirect(J,k,K,$,T,Me),$.side=jn):L.renderBufferDirect(J,k,K,$,T,Me),T.onAfterRender(L,k,J,K,$,Me)}function ns(T,k,J){k.isScene!==!0&&(k=Wt);const K=q.get(T),$=E.state.lights,Me=E.state.shadowsArray,Ae=$.state.version,_e=de.getParameters(T,$.state,Me,k,J,E.state.lightProbeGridArray),Te=de.getProgramCacheKey(_e);let De=K.programs;K.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?k.environment:null,K.fog=k.fog;const Qe=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;K.envMap=le.get(T.envMap||K.environment,Qe),K.envMapRotation=K.environment!==null&&T.envMap===null?k.environmentRotation:T.envMapRotation,De===void 0&&(T.addEventListener("dispose",Un),De=new Map,K.programs=De);let tt=De.get(Te);if(tt!==void 0){if(K.currentProgram===tt&&K.lightsStateVersion===Ae)return Wl(T,_e),tt}else _e.uniforms=de.getUniforms(T),N!==null&&T.isNodeMaterial&&N.build(T,J,_e),T.onBeforeCompile(_e,L),tt=de.acquireProgram(_e,Te),De.set(Te,tt),K.uniforms=_e.uniforms;const Re=K.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Re.clippingPlanes=Ie.uniform),Wl(T,_e),K.needsLights=Nu(T),K.lightsStateVersion=Ae,K.needsLights&&(Re.ambientLightColor.value=$.state.ambient,Re.lightProbe.value=$.state.probe,Re.sunLights.value=$.state.sun,Re.sunLightShadows.value=$.state.sunShadow,Re.directionalLights.value=$.state.directional,Re.directionalLightShadows.value=$.state.directionalShadow,Re.spotLights.value=$.state.spot,Re.spotLightShadows.value=$.state.spotShadow,Re.rectAreaLights.value=$.state.rectArea,Re.ltc_1.value=$.state.rectAreaLTC1,Re.ltc_2.value=$.state.rectAreaLTC2,Re.pointLights.value=$.state.point,Re.pointLightShadows.value=$.state.pointShadow,Re.hemisphereLights.value=$.state.hemi,Re.sunShadowMatrix.value=$.state.sunShadowMatrix,Re.sunShadowCascade.value=$.state.sunShadowCascade,Re.directionalShadowMatrix.value=$.state.directionalShadowMatrix,Re.spotLightMatrix.value=$.state.spotLightMatrix,Re.spotLightMap.value=$.state.spotLightMap,Re.pointShadowMatrix.value=$.state.pointShadowMatrix),K.lightProbeGrid=E.state.lightProbeGridArray.length>0,K.currentProgram=tt,K.uniformsList=null,tt}function Vl(T){if(T.uniformsList===null){const k=T.currentProgram.getUniforms();T.uniformsList=Ys.seqWithValue(k.seq,T.uniforms)}return T.uniformsList}function Wl(T,k){const J=q.get(T);J.outputColorSpace=k.outputColorSpace,J.batching=k.batching,J.batchingColor=k.batchingColor,J.instancing=k.instancing,J.instancingColor=k.instancingColor,J.instancingMorph=k.instancingMorph,J.skinning=k.skinning,J.morphTargets=k.morphTargets,J.morphNormals=k.morphNormals,J.morphColors=k.morphColors,J.morphTargetsCount=k.morphTargetsCount,J.numClippingPlanes=k.numClippingPlanes,J.numIntersection=k.numClipIntersection,J.vertexAlphas=k.vertexAlphas,J.vertexTangents=k.vertexTangents,J.toneMapping=k.toneMapping}function Pu(T,k){if(T.length===0)return null;if(T.length===1)return T[0].texture!==null?T[0]:null;b.setFromMatrixPosition(k.matrixWorld);for(let J=0,K=T.length;J<K;J++){const $=T[J];if($.texture!==null&&$.boundingBox.containsPoint(b))return $}return null}function Du(T,k,J,K,$){k.isScene!==!0&&(k=Wt),Z.resetTextureUnits();const Me=k.fog,Ae=K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial?k.environment:null,_e=j===null?L.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:nt.workingColorSpace,Te=K.isMeshStandardMaterial||K.isMeshLambertMaterial&&!K.envMap||K.isMeshPhongMaterial&&!K.envMap,De=le.get(K.envMap||Ae,Te),Qe=K.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,tt=!!J.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),Re=!!J.morphAttributes.position,ut=!!J.morphAttributes.normal,Ot=!!J.morphAttributes.color;let Tt=Vn;K.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Tt=L.toneMapping);const bt=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,Zt=bt!==void 0?bt.length:0,we=q.get(K),tn=E.state.lights;if(Fe===!0&&(qe===!0||T!==te)){const wt=T===te&&K.id===X;Ie.setState(K,T,wt)}let st=!1;K.version===we.__version?(we.needsLights&&we.lightsStateVersion!==tn.state.version||we.outputColorSpace!==_e||$.isBatchedMesh&&we.batching===!1||!$.isBatchedMesh&&we.batching===!0||$.isBatchedMesh&&we.batchingColor===!0&&$._colorsTexture===null||$.isBatchedMesh&&we.batchingColor===!1&&$._colorsTexture!==null||$.isInstancedMesh&&we.instancing===!1||!$.isInstancedMesh&&we.instancing===!0||$.isSkinnedMesh&&we.skinning===!1||!$.isSkinnedMesh&&we.skinning===!0||$.isInstancedMesh&&we.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&we.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&we.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&we.instancingMorph===!1&&$.morphTexture!==null||we.envMap!==De||K.fog===!0&&we.fog!==Me||we.numClippingPlanes!==void 0&&(we.numClippingPlanes!==Ie.numPlanes||we.numIntersection!==Ie.numIntersection)||we.vertexAlphas!==Qe||we.vertexTangents!==tt||we.morphTargets!==Re||we.morphNormals!==ut||we.morphColors!==Ot||we.toneMapping!==Tt||we.morphTargetsCount!==Zt||!!we.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(st=!0):(st=!0,we.__version=K.version);let Mn=we.currentProgram;st===!0&&(Mn=ns(K,k,$),N&&K.isNodeMaterial&&N.onUpdateProgram(K,Mn,we));let Fn=!1,si=!1,Hi=!1;const vt=Mn.getUniforms(),Ft=we.uniforms;if(y.useProgram(Mn.program)&&(Fn=!0,si=!0,Hi=!0),K.id!==X&&(X=K.id,si=!0),we.needsLights){const wt=Pu(E.state.lightProbeGridArray,$);we.lightProbeGrid!==wt&&(we.lightProbeGrid=wt,si=!0)}if(Fn||te!==T){y.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),vt.setValue(G,"projectionMatrix",T.projectionMatrix),vt.setValue(G,"viewMatrix",T.matrixWorldInverse);const oi=vt.map.cameraPosition;oi!==void 0&&oi.setValue(G,Mt.setFromMatrixPosition(T.matrixWorld)),I.logarithmicDepthBuffer&&vt.setValue(G,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&vt.setValue(G,"isOrthographic",T.isOrthographicCamera===!0),te!==T&&(te=T,si=!0,Hi=!0)}if(we.needsLights&&(tn.state.sunShadowMap.length>0&&vt.setValue(G,"sunShadowMap",tn.state.sunShadowMap,Z),tn.state.directionalShadowMap.length>0&&vt.setValue(G,"directionalShadowMap",tn.state.directionalShadowMap,Z),tn.state.spotShadowMap.length>0&&vt.setValue(G,"spotShadowMap",tn.state.spotShadowMap,Z),tn.state.pointShadowMap.length>0&&vt.setValue(G,"pointShadowMap",tn.state.pointShadowMap,Z)),$.isSkinnedMesh){vt.setOptional(G,$,"bindMatrix"),vt.setOptional(G,$,"bindMatrixInverse");const wt=$.skeleton;wt&&(wt.boneTexture===null&&wt.computeBoneTexture(),vt.setValue(G,"boneTexture",wt.boneTexture,Z))}$.isBatchedMesh&&(vt.setOptional(G,$,"batchingTexture"),vt.setValue(G,"batchingTexture",$._matricesTexture,Z),vt.setOptional(G,$,"batchingIdTexture"),vt.setValue(G,"batchingIdTexture",$._indirectTexture,Z),vt.setOptional(G,$,"batchingColorTexture"),$._colorsTexture!==null&&vt.setValue(G,"batchingColorTexture",$._colorsTexture,Z));const ai=J.morphAttributes;if((ai.position!==void 0||ai.normal!==void 0||ai.color!==void 0)&&H.update($,J,Mn),(si||we.receiveShadow!==$.receiveShadow)&&(we.receiveShadow=$.receiveShadow,vt.setValue(G,"receiveShadow",$.receiveShadow)),(K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial)&&K.envMap===null&&k.environment!==null&&(Ft.envMapIntensity.value=k.environmentIntensity),Ft.dfgLUT!==void 0&&(Ft.dfgLUT.value=q_()),si){if(vt.setValue(G,"toneMappingExposure",L.toneMappingExposure),we.needsLights&&Iu(Ft,Hi),Me&&K.fog===!0&&Le.refreshFogUniforms(Ft,Me),Le.refreshMaterialUniforms(Ft,K,se,ee,E.state.transmissionRenderTarget[T.id]),we.needsLights&&we.lightProbeGrid){const wt=we.lightProbeGrid;Ft.probesSH.value=wt.texture,Ft.probesMin.value.copy(wt.boundingBox.min),Ft.probesMax.value.copy(wt.boundingBox.max),Ft.probesResolution.value.copy(wt.resolution)}Ys.upload(G,Vl(we),Ft,Z)}if(K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(Ys.upload(G,Vl(we),Ft,Z),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&vt.setValue(G,"center",$.center),vt.setValue(G,"modelViewMatrix",$.modelViewMatrix),vt.setValue(G,"normalMatrix",$.normalMatrix),vt.setValue(G,"modelMatrix",$.matrixWorld),K.uniformsGroups!==void 0){const wt=K.uniformsGroups;for(let oi=0,Vi=wt.length;oi<Vi;oi++){const Yl=wt[oi];oe.update(Yl,Mn),oe.bind(Yl,Mn)}}return Mn}function Iu(T,k){T.ambientLightColor.needsUpdate=k,T.lightProbe.needsUpdate=k,T.sunLights.needsUpdate=k,T.sunLightShadows.needsUpdate=k,T.directionalLights.needsUpdate=k,T.directionalLightShadows.needsUpdate=k,T.pointLights.needsUpdate=k,T.pointLightShadows.needsUpdate=k,T.spotLights.needsUpdate=k,T.spotLightShadows.needsUpdate=k,T.rectAreaLights.needsUpdate=k,T.hemisphereLights.needsUpdate=k}function Nu(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return Y},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(T,k,J){const K=q.get(T);K.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,K.__autoAllocateDepthBuffer===!1&&(K.__useRenderToTexture=!1),q.get(T.texture).__webglTexture=k,q.get(T.depthTexture).__webglTexture=K.__autoAllocateDepthBuffer?void 0:J,K.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,k){const J=q.get(T);J.__webglFramebuffer=k,J.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(T,k=0,J=0){j=T,z=k,Y=J;let K=null,$=!1,Me=!1;if(T){const _e=q.get(T);if(_e.__useDefaultFramebuffer!==void 0){y.bindFramebuffer(G.FRAMEBUFFER,_e.__webglFramebuffer),O.copy(T.viewport),re.copy(T.scissor),ce=T.scissorTest,y.viewport(O),y.scissor(re),y.setScissorTest(ce),X=-1;return}else if(_e.__webglFramebuffer===void 0)Z.setupRenderTarget(T);else if(_e.__hasExternalTextures)Z.rebindTextures(T,q.get(T.texture).__webglTexture,q.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Qe=T.depthTexture;if(_e.__boundDepthTexture!==Qe){if(Qe!==null&&q.has(Qe)&&(T.width!==Qe.image.width||T.height!==Qe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Z.setupDepthRenderbuffer(T)}}const Te=T.texture;(Te.isData3DTexture||Te.isDataArrayTexture||Te.isCompressedArrayTexture)&&(Me=!0);const De=q.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(De[k])?K=De[k][J]:K=De[k],$=!0):T.samples>0&&Z.useMultisampledRTT(T)===!1?K=q.get(T).__webglMultisampledFramebuffer:Array.isArray(De)?K=De[J]:K=De,O.copy(T.viewport),re.copy(T.scissor),ce=T.scissorTest}else O.copy(ae).multiplyScalar(se).floor(),re.copy(Ee).multiplyScalar(se).floor(),ce=Ze;if(J!==0&&(K=U),y.bindFramebuffer(G.FRAMEBUFFER,K)&&y.drawBuffers(T,K),y.viewport(O),y.scissor(re),y.setScissorTest(ce),$){const _e=q.get(T.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_CUBE_MAP_POSITIVE_X+k,_e.__webglTexture,J)}else if(Me){const _e=k;for(let Te=0;Te<T.textures.length;Te++){const De=q.get(T.textures[Te]);G.framebufferTextureLayer(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0+Te,De.__webglTexture,J,_e)}}else if(T!==null&&J!==0){const _e=q.get(T.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,_e.__webglTexture,J)}X=-1};function Xl(T){const k=q.get(T);return(k.__readFormat!==T.format||k.__readType!==T.type)&&(k.__readFormat=T.format,k.__readType=T.type,k.__formatReadable=I.textureFormatReadable(T.format),k.__typeReadable=I.textureTypeReadable(T.type)),k}this.readRenderTargetPixels=function(T,k,J,K,$,Me,Ae,_e=0){if(!(T&&T.isWebGLRenderTarget)){at("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=q.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Ae!==void 0&&(Te=Te[Ae]),Te){y.bindFramebuffer(G.FRAMEBUFFER,Te);try{const De=T.textures[_e],Qe=De.format,tt=De.type;T.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+_e);const Re=Xl(De);if(Re.__formatReadable===!1){at("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Re.__typeReadable===!1){at("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=T.width-K&&J>=0&&J<=T.height-$&&G.readPixels(k,J,K,$,me.convert(Qe),me.convert(tt),Me)}finally{const De=j!==null?q.get(j).__webglFramebuffer:null;y.bindFramebuffer(G.FRAMEBUFFER,De)}}},this.readRenderTargetPixelsAsync=async function(T,k,J,K,$,Me,Ae,_e=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=q.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Ae!==void 0&&(Te=Te[Ae]),Te)if(k>=0&&k<=T.width-K&&J>=0&&J<=T.height-$){y.bindFramebuffer(G.FRAMEBUFFER,Te);const De=T.textures[_e],Qe=De.format,tt=De.type;T.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+_e);const Re=Xl(De);if(Re.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Re.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ut=G.createBuffer();G.bindBuffer(G.PIXEL_PACK_BUFFER,ut),G.bufferData(G.PIXEL_PACK_BUFFER,Me.byteLength,G.STREAM_READ),G.readPixels(k,J,K,$,me.convert(Qe),me.convert(tt),0),G.bindBuffer(G.PIXEL_PACK_BUFFER,null);const Ot=j!==null?q.get(j).__webglFramebuffer:null;y.bindFramebuffer(G.FRAMEBUFFER,Ot);const Tt=G.fenceSync(G.SYNC_GPU_COMMANDS_COMPLETE,0);return G.flush(),await pm(G,Tt,4),G.bindBuffer(G.PIXEL_PACK_BUFFER,ut),G.getBufferSubData(G.PIXEL_PACK_BUFFER,0,Me),G.bindBuffer(G.PIXEL_PACK_BUFFER,null),G.deleteBuffer(ut),G.deleteSync(Tt),Me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,k=null,J=0){const K=Math.pow(2,-J),$=Math.floor(T.image.width*K),Me=Math.floor(T.image.height*K),Ae=k!==null?k.x:0,_e=k!==null?k.y:0;Z.setTexture2D(T,0),G.copyTexSubImage2D(G.TEXTURE_2D,J,0,0,Ae,_e,$,Me),y.unbindTexture()},this.copyTextureToTexture=function(T,k,J=null,K=null,$=0,Me=0){let Ae,_e,Te,De,Qe,tt,Re,ut,Ot;const Tt=T.isCompressedTexture?T.mipmaps[Me]:T.image;if(J!==null)Ae=J.max.x-J.min.x,_e=J.max.y-J.min.y,Te=J.isBox3?J.max.z-J.min.z:1,De=J.min.x,Qe=J.min.y,tt=J.isBox3?J.min.z:0;else{const Ft=Math.pow(2,-$);Ae=Math.floor(Tt.width*Ft),_e=Math.floor(Tt.height*Ft),T.isDataArrayTexture?Te=Tt.depth:T.isData3DTexture?Te=Math.floor(Tt.depth*Ft):Te=1,De=0,Qe=0,tt=0}K!==null?(Re=K.x,ut=K.y,Ot=K.z):(Re=0,ut=0,Ot=0);const bt=me.convert(k.format),Zt=me.convert(k.type);let we;k.isData3DTexture?(Z.setTexture3D(k,0),we=G.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(Z.setTexture2DArray(k,0),we=G.TEXTURE_2D_ARRAY):(Z.setTexture2D(k,0),we=G.TEXTURE_2D),y.activeTexture(G.TEXTURE0),y.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,k.flipY),y.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),y.pixelStorei(G.UNPACK_ALIGNMENT,k.unpackAlignment);const tn=y.getParameter(G.UNPACK_ROW_LENGTH),st=y.getParameter(G.UNPACK_IMAGE_HEIGHT),Mn=y.getParameter(G.UNPACK_SKIP_PIXELS),Fn=y.getParameter(G.UNPACK_SKIP_ROWS),si=y.getParameter(G.UNPACK_SKIP_IMAGES);y.pixelStorei(G.UNPACK_ROW_LENGTH,Tt.width),y.pixelStorei(G.UNPACK_IMAGE_HEIGHT,Tt.height),y.pixelStorei(G.UNPACK_SKIP_PIXELS,De),y.pixelStorei(G.UNPACK_SKIP_ROWS,Qe),y.pixelStorei(G.UNPACK_SKIP_IMAGES,tt);const Hi=T.isDataArrayTexture||T.isData3DTexture,vt=k.isDataArrayTexture||k.isData3DTexture;if(T.isDepthTexture){const Ft=q.get(T),ai=q.get(k),wt=q.get(Ft.__renderTarget),oi=q.get(ai.__renderTarget);y.bindFramebuffer(G.READ_FRAMEBUFFER,wt.__webglFramebuffer),y.bindFramebuffer(G.DRAW_FRAMEBUFFER,oi.__webglFramebuffer);for(let Vi=0;Vi<Te;Vi++)Hi&&(G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,q.get(T).__webglTexture,$,tt+Vi),G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,q.get(k).__webglTexture,Me,Ot+Vi)),G.blitFramebuffer(De,Qe,Ae,_e,Re,ut,Ae,_e,G.DEPTH_BUFFER_BIT,G.NEAREST);y.bindFramebuffer(G.READ_FRAMEBUFFER,null),y.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else if($!==0||T.isRenderTargetTexture||q.has(T)){const Ft=q.get(T),ai=q.get(k);y.bindFramebuffer(G.READ_FRAMEBUFFER,D),y.bindFramebuffer(G.DRAW_FRAMEBUFFER,F);for(let wt=0;wt<Te;wt++)Hi?G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,Ft.__webglTexture,$,tt+wt):G.framebufferTexture2D(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,Ft.__webglTexture,$),vt?G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,ai.__webglTexture,Me,Ot+wt):G.framebufferTexture2D(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,ai.__webglTexture,Me),$!==0?G.blitFramebuffer(De,Qe,Ae,_e,Re,ut,Ae,_e,G.COLOR_BUFFER_BIT,G.NEAREST):vt?G.copyTexSubImage3D(we,Me,Re,ut,Ot+wt,De,Qe,Ae,_e):G.copyTexSubImage2D(we,Me,Re,ut,De,Qe,Ae,_e);y.bindFramebuffer(G.READ_FRAMEBUFFER,null),y.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else vt?T.isDataTexture||T.isData3DTexture?G.texSubImage3D(we,Me,Re,ut,Ot,Ae,_e,Te,bt,Zt,Tt.data):k.isCompressedArrayTexture?G.compressedTexSubImage3D(we,Me,Re,ut,Ot,Ae,_e,Te,bt,Tt.data):G.texSubImage3D(we,Me,Re,ut,Ot,Ae,_e,Te,bt,Zt,Tt):T.isDataTexture?G.texSubImage2D(G.TEXTURE_2D,Me,Re,ut,Ae,_e,bt,Zt,Tt.data):T.isCompressedTexture?G.compressedTexSubImage2D(G.TEXTURE_2D,Me,Re,ut,Tt.width,Tt.height,bt,Tt.data):G.texSubImage2D(G.TEXTURE_2D,Me,Re,ut,Ae,_e,bt,Zt,Tt);y.pixelStorei(G.UNPACK_ROW_LENGTH,tn),y.pixelStorei(G.UNPACK_IMAGE_HEIGHT,st),y.pixelStorei(G.UNPACK_SKIP_PIXELS,Mn),y.pixelStorei(G.UNPACK_SKIP_ROWS,Fn),y.pixelStorei(G.UNPACK_SKIP_IMAGES,si),Me===0&&k.generateMipmaps&&G.generateMipmap(we),y.unbindTexture()},this.initRenderTarget=function(T){q.get(T).__webglFramebuffer===void 0&&Z.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?Z.setTextureCube(T,0):T.isData3DTexture?Z.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?Z.setTexture2DArray(T,0):Z.setTexture2D(T,0),y.unbindTexture()},this.resetState=function(){z=0,Y=0,j=null,y.reset(),Se.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Gn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=nt._getDrawingBufferColorSpace(e),t.unpackColorSpace=nt._getUnpackColorSpace()}}const aa=[{id:"stack",crystal:"cyan",tiers:[["bass",4,[.24,.25,.28]],["mid",2,[.46,.15,.25]],["horn",4,[.21,.22,.23]],["tweet",2,[.21,.08,.17]]]},{id:"wall",crystal:"violet",tiers:[["bass",3,[.31,.3,.3]],["mid",2,[.44,.16,.26]],["horn",2,[.3,.25,.24]],["tweet",1,[.26,.09,.18]]]},{id:"tower",crystal:"amber",tiers:[["bass",2,[.28,.27,.29]],["bass",2,[.25,.24,.27]],["horn",2,[.25,.23,.23]],["tweet",3,[.15,.07,.15]]]}],$_={cyan:[[60,220,255],[210,250,255],[150,205,225]],violet:[[175,95,255],[240,215,255],[180,160,225]],amber:[[255,170,50],[255,238,200],[225,190,140]]};function Z_(i=0){const[e,t,n]=$_[aa[i%aa.length].crystal];return{[f.STONE]:[78,80,94],[f.STONED]:[36,36,48],[f.MOSS]:[72,108,58],[f.CRYSTAL]:n,[f.RUNE]:e,[f.GLOW]:e,[f.MAGIC2]:t,[f.WOOD]:[150,96,52],[f.LINE]:[24,24,34]}}function sh(i,e,t,n){const r=aa[i%aa.length],s=new We({blend:.02}),a=t==="damaged",o=a?0:[0,.5,1][e%3],c=S=>a&&Rt(S,e,31)<.5;let l=0,u=1,d=.3,h=0,p=i*7;const g=(S,A,L,R)=>N=>{if(R&&Math.abs(Math.sin(N[0]*37+N[1]*23+Math.sin(N[2]*17)*2))<.07)return f.STONED;if(N[1]>S-.02&&(N[2]>A-.06||Rt(Math.floor(N[0]*30),Math.floor(N[2]*30),L)<.2)&&Rt(Math.floor(N[0]*40),Math.floor(N[2]*40),L+1)<.6)return f.MOSS},v=(S,A,L,R,N,U)=>{const D=c(U),F=1+o*.08;s.ell([S,A,L],[R*1.18,R*1.18,.06],f.STONED,{group:N,cut:!0}),s.ell([S,A,L-.02],[R*F,R*F,.035+o*.025],f.CRYSTAL,{group:900+U,paint:z=>{const Y=Math.hypot(z[0]-S,z[1]-A)/(R*F);return D?Y<.3?f.GLOW:f.CRYSTAL:Y<.2+o*.15?f.MAGIC2:Y<.5?f.GLOW:Y<.78?f.CRYSTAL:f.GLOW}})},x=(S,A,L,R,N,U,D,F)=>z=>{if(z[0]>S+R-.022){const Y=Math.min(L,N)*1.5,j=(U-N-z[2])/Y+.5,X=(A-z[1])/Y+.5;if(j>=0&&j<=1&&X>=0&&X<=1&&(n?qd(n,j,X,.065):ph(j,X,D,.12)))return a&&Rt(D,e,5)<.5?f.STONED:f.RUNE}return F(z)},m=r.tiers,_=m[0][1]*m[0][2][0]+.02,M=.08,b=m[0][2][2];s.box([0,M,d-b],[_,M,b],f.STONE,{group:u,round:.03,rough:.006,paint:g(M*2,d,3,a)}),s.box([0,M*.9,d],[_-.06,M*.45,.12],f.STONED,{group:u,cut:!0,paint:S=>S[2]<d-.07?f.GLOW:void 0});for(let S=1;S<m[0][1];S++)s.box([-_+S*_*2/m[0][1],M*.9,d-.06],[.015,M*.45,.06],f.STONE,{group:u});l=M*2,u++;const w=[];m.forEach(([S,A,[L,R,N]],U)=>{const D=S==="tweet"?.09:0,F=A*L*2+(A-1)*(S==="tweet"?.14:.01),z=d-U*.035,Y=l+D+R;for(let j=0;j<A;j++){const X=-F/2+L+j*(L*2+(S==="tweet"?.14:.01));if(a&&S==="horn"&&j===A-1){w.push([X,L,R,N]);continue}const te=a&&S==="tweet"?[1,.12*(j%2?1:-1),0]:void 0,O=a&&S==="tweet"?Y-.04:Y,re=g(O+R,z-N+N,u,a),ce=j===A-1-(a&&S==="horn"?1:0)&&S!=="tweet";if(s.box([X,O,z-N],[L-.005,R,N],f.STONE,{group:u,round:.035,rough:.004,dir:te,paint:ce?x(X,O,R,L-.005,N,z,p++,re):re}),S==="bass"&&v(X,Y+.02,z,Math.min(L,R)*.72,u,h++),S==="mid"&&(s.ell([X,Y,z],[L*.8,R*.7,N*.9],f.STONED,{group:u,cut:!0,paint:be=>be[2]<z-N*.45?c(h)?f.STONED:f.GLOW:void 0}),s.box([X,Y,z-N*.5],[.018,R*.6,N*.45],f.STONE,{group:u}),h++),S==="horn"){const be=Y+R*.25;s.seg([X,be,z-N*1.5],[X,be,z+.03],.03,Math.min(L,R)*.78,f.STONED,{group:u,cut:!0,paint:Ue=>Ue[2]<z-N*.55?c(h)?f.STONED:f.GLOW:void 0}),v(X,Y-R*.6,z,R*.22,u,h++)}if(S==="tweet")for(const be of[-.5,0,.5])v(X+be*L*1.15,O,z,R*.55,u,h++);u++}if(S!=="tweet"){const j=a&&S==="horn"?L:0;s.box([-j,l+R*2+.012,z-.015],[F/2+.01-j,.012,.015],f.WOOD,{group:u++,round:.008}),l+=.024}S==="tweet"&&!a&&s.flat([0,l+D/2,z-N],[1,0,0],[0,1,0],F/2,D/2,(j,X)=>Math.abs(X)<.45&&Math.sin(j*23)>-.4?f.GLOW:null,{group:u++,bend:0}),l+=R*2+D});const E=l;if([[-_-.04,.25,.34,-.3],[_+.02,.2,.3,.35],[-_+.15,.4,.22,-.1],[_-.2,.42,.18,.2],[.1,.45,.16,.15],[-_-.1,-.25,.26,-.4],[_+.08,-.2,.24,.45]].forEach(([S,A,L,R],N)=>{if(a&&N%2){s.seg([S,.03,A],[S+.12,.05,A+.04],.04,.02,f.CRYSTAL,{group:700+N});return}const U=[S+R*L,L,A+.05];s.seg([S,0,A],U,.045+L*.05,.006,f.CRYSTAL,{group:700+N,paint:D=>D[1]>L*(.65-o*.1)&&!a?f.GLOW:void 0}),s.seg([S+.04,0,A-.03],[S+.04+R*L*.5,L*.55,A],.03,.005,f.CRYSTAL,{group:720+N})}),!a)for(const[S,A,L,R]of[[-.55,.1,.1,.03],[.6,.16,0,.025],[.15,.24,-.1,.02]])s.ell([S,E+A-.1,L],[R,R*.8,R],f.STONE,{group:800+Math.round(S*100),extra:!0,rough:.004});for(const[S,A,L,R]of w)s.box([S+.45,A*.75,d+.25],[A,L,R],f.STONE,{group:u++,dir:[.6,.8,.2],round:.035,rough:.007,paint:g(1,0,9,!0)});return{m:s,top:E}}function J_(i){const e=new We({blend:.02}),t=(n,r)=>Rt(n,r,i*13+7);e.ell([.1,.1,.62],[.14,.12,.1],f.GLOW,{group:1,paint:n=>n[1]>.16?f.MAGIC2:void 0}),e.seg([.1,.1,.6],[.02,.5,.66],.07,.01,f.GLOW,{group:2,paint:n=>n[1]>.35?f.MAGIC2:f.CRYSTAL});for(let n=0;n<16;n++){const r=n*2.4,s=.15+t(n,1)*.75,a=Math.cos(r)*s,o=Math.sin(r)*s*.6,c=.09+t(n,2)*.1,l=Math.max(.05,(.8-s)*.45)+c*.5;e.box([a,l*.7,o],[c*1.3,c,c*1.1],f.STONE,{group:10+n,dir:[Math.cos(r*1.7),.4+t(n,3),Math.sin(r*2.3)],round:.03,rough:.008,paint:u=>Math.abs(Math.sin(u[0]*41+u[1]*29))<.08?f.STONED:u[1]>l*.7+c*.6&&t(n,4)<.25?f.MOSS:void 0})}for(let n=0;n<4;n++){const r=n*1.7+1,s=Math.cos(r)*.4,a=Math.sin(r)*.25;e.ell([s,.05,a],[.09,.08,.03],f.CRYSTAL,{group:50+n,dir:[Math.cos(r),.5,Math.sin(r)],paint:o=>t(n,5)<.3?f.GLOW:void 0})}for(let n=0;n<4;n++){const r=-.7+n*.45;e.seg([r,0,.4-n*.1],[r+.1,.08+t(n,6)*.1,.42-n*.1],.03,.01,f.CRYSTAL,{group:60+n})}return e}function ah(i,e,t){let n=0;for(let r=0;r<2e3&&n<e;r++){const s=Math.floor(Rt(r,t,1)*i.w),a=Math.floor(Rt(r,t,2)*i.h*.7);i.get(s,a)||i.get(s+1,a)||i.get(s-1,a)||i.get(s,a+1)||i.get(s,a-1)||i.get(s,a+2)||(i.px(s,a,n%3?f.GLOW:f.MAGIC2),n++)}return i}const Q_=i=>ol(i)*3,ao=new Map;function j_(i={},{variant:e=0,frame:t=0,state:n="playing",sigil:r}={}){const s=Q_(i),a=e+":"+s;ao.has(a)||ao.set(a,gn(sh(e,0,"playing").m,{height:s}).s);const o=ao.get(a);if(n==="destroyed")return ah(gn(J_(e),{scale:o}).sp,3,e*5+1);const{sp:c}=gn(sh(e,t,n,r).m,{scale:o});return ah(c,n==="damaged"?4:10+t*2,e*5+t)}const eM=[{k:"ambientHue",g:"Night light",label:"Twilight hue",min:0,max:1,step:.01,v:.68,hue:!0},{k:"ambient",g:"Night light",label:"Twilight brightness",min:.05,max:.6,step:.01,v:.22},{k:"moon",g:"Night light",label:"Moonlight",min:0,max:1,step:.01,v:.3},{k:"moonHue",g:"Night light",label:"Moon hue",min:0,max:1,step:.01,v:.58,hue:!0},{k:"glowHue",g:"Night light",label:"Witch glow hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"glowSat",g:"Night light",label:"Witch glow colour",min:0,max:1,step:.01,v:.35},{k:"glowRadius",g:"Night light",label:"Witch glow reach",min:30,max:200,step:5,v:110},{k:"glowPower",g:"Night light",label:"Witch glow strength",min:.3,max:2.5,step:.05,v:1.4},{k:"bands",g:"Shading",label:"Light steps",min:2,max:7,step:1,v:3},{k:"dither",g:"Shading",label:"Dithering",min:0,max:1,step:.05,v:.35},{k:"round",g:"Shading",label:"Roundness",min:.2,max:1.5,step:.05,v:.9},{k:"outline",g:"Shading",label:"Plant outline",options:["none","dark","tinted"],v:"none"},{k:"cOutline",g:"Shading",label:"Creature outline",options:["dark","tinted","none"],v:"dark"},{k:"shafts",g:"Night light",label:"Moonbeams",min:0,max:1,step:.05,v:.3},{k:"areaContrast",g:"Colour",label:"Difference between areas",min:0,max:1,step:.05,v:.6},{k:"sat",g:"Colour",label:"Saturation",min:.2,max:1.3,step:.01,v:.9},{k:"leafHue",g:"Colour",label:"Leaf hue",min:0,max:1,step:.01,v:.3,hue:!0},{k:"leafVariety",g:"Colour",label:"Leaf colour variety",min:0,max:1,step:.05,v:.3},{k:"trunkHue",g:"Colour",label:"Bark hue",min:0,max:1,step:.01,v:.07,hue:!0},{k:"groundHue",g:"Colour",label:"Ground hue",min:0,max:1,step:.01,v:.27,hue:!0},{k:"groundVal",g:"Colour",label:"Ground brightness",min:.15,max:.7,step:.01,v:.4},{k:"pixel",g:"Shading",label:"Pixel size",min:1,max:5,step:1,v:3},{k:"treeSize",g:"Trees",label:"Tree height",min:.5,max:1.5,step:.05,v:.85},{k:"crownWidth",g:"Trees",label:"Crown width",min:1,max:4,step:.1,v:3},{k:"clearing",g:"Trees",label:"Clearing size",min:0,max:1,step:.05,v:.55},{k:"depth",g:"Map",label:"Border detail (fractal layers)",min:0,max:6,step:1,v:4},{k:"areaScale",g:"Map",label:"Area size (screens)",min:.6,max:2,step:.05,v:1},{k:"areaTypes",g:"Map",label:"Area types",min:4,max:30,step:1,v:30},{k:"density",g:"Trees",label:"Foliage density",min:.2,max:1,step:.05,v:.55},{k:"clump",g:"Trees",label:"Clumpiness",min:0,max:1,step:.05,v:.6},{k:"gnarl",g:"Trees",label:"Gnarliness",min:0,max:1,step:.05,v:.5},{k:"roots",g:"Trees",label:"Roots",min:0,max:1,step:.05,v:.6},{k:"bark",g:"Trees",label:"Bark texture",min:0,max:1,step:.05,v:.6},{k:"trees",g:"Trees",label:"Tree density",min:.2,max:2,step:.05,v:1},{k:"wBroad",g:"Tree mix",label:"Gnarled broadleaf",min:0,max:1,step:.05,v:.8},{k:"wFir",g:"Tree mix",label:"Fir",min:0,max:1,step:.05,v:.6},{k:"wWillow",g:"Tree mix",label:"Willow",min:0,max:1,step:.05,v:.5},{k:"wBirch",g:"Tree mix",label:"Birch",min:0,max:1,step:.05,v:.5},{k:"wPalm",g:"Tree mix",label:"Tree fern",min:0,max:1,step:.05,v:.3},{k:"wFlat",g:"Tree mix",label:"Flat-crowned",min:0,max:1,step:.05,v:.5},{k:"bushes",g:"Undergrowth",label:"Bushes and shrubs",min:0,max:120,step:1,v:55},{k:"bushSize",g:"Undergrowth",label:"Bush size",min:.5,max:1.8,step:.05,v:1},{k:"flowers",g:"Undergrowth",label:"Flowers",min:0,max:1,step:.05,v:.3},{k:"cSat",g:"Creatures",label:"Creature saturation",min:.1,max:1,step:.01,v:.6},{k:"cVal",g:"Creatures",label:"Creature brightness",min:.4,max:1,step:.01,v:.85},{k:"head",g:"Creatures",label:"Baby head size",min:.3,max:.6,step:.01,v:.44},{k:"eye",g:"Creatures",label:"Eye size",min:.5,max:2,step:.05,v:1},{k:"legs",g:"Creatures",label:"Leg length",min:.5,max:1.8,step:.05,v:1},{k:"long",g:"Creatures",label:"Body length",min:.7,max:1.5,step:.05,v:1},{k:"size",g:"Creatures",label:"Baby size (px)",min:5,max:14,step:1,v:8},{k:"growth",g:"Creatures",label:"Legend vs baby height",min:5,max:25,step:1,v:20},{k:"magicHue",g:"Creatures",label:"Magic glow hue",min:0,max:1,step:.01,v:.5,hue:!0},{k:"fur",g:"Creatures",label:"Stripes and spots",min:0,max:1,step:.05,v:.5},{k:"cloakHue",g:"Witch",label:"Jacket hue",min:0,max:1,step:.01,v:.72,hue:!0},{k:"hairHue",g:"Witch",label:"Hair hue",min:0,max:1,step:.01,v:.01,hue:!0},{k:"hatHue",g:"Witch",label:"Hat hue",min:0,max:1,step:.01,v:.74,hue:!0},{k:"topHue",g:"Witch",label:"Top hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"jeansHue",g:"Witch",label:"Jeans hue",min:0,max:1,step:.01,v:.6,hue:!0},{k:"shoeHue",g:"Witch",label:"Sneakers hue",min:0,max:1,step:.01,v:0,hue:!0},{k:"phonesHue",g:"Witch",label:"Headphones hue",min:0,max:1,step:.01,v:.92,hue:!0}];function tM(){const i={};return eM.forEach(e=>i[e.k]=e.v),i}const nM={broad:Ah,fir:pl,willow:Th,birch:Rh,flat:Ch};function iM(i,e,t,n,r){const s=nM[e.type],a={...t,leafHue:i.leaf+(e.dark?.05:0),gnarl:e.gnarl??t.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},o=s(n,a,t.treeSize*r*(e.scale||1)*ye(n,.9,1.1)),c=ml(n,a,s);return e.dark&&(c[f.LEAF]=c[f.LEAF3],c[f.LEAF3]=ge(i.leaf+.05,.7,.22)),c[f.NOSE]=[20,16,24],c[f.GLINT]=[235,235,240],{parts:$d(o),colours:c}}function rM(i,e,t,n,r){const s=vn[t].id,a=Jr.find(p=>p.id===s),o=nf(s,i,{K:n,makeCanvas:r}),c=[],l=p=>c.push(p)-1,u={big:[],small:[],walls:[],set:null},d=(p,g)=>gi(p,g,i,"none",r),h=(p,g)=>{const{parts:v,colours:x}=iM(a,p,i,vi(e*13+t*101+g*7+1),n);return{bot:l(d(v.bot,x)),top:l(d(v.top,x))}};a.big.forEach(([p,g],v)=>{if(p!=="tree"){u.big.push({bot:l(o.big[v].sp),top:null});return}const x=Math.max(1,Math.round(Dh/a.big.length));for(let m=0;m<x;m++)u.big.push(h(g,v*17+m))}),a.small.forEach(([p,g],v)=>u.small.push(p==="tree"?h(g,500+v):{bot:l(o.small[v].sp),top:null}));for(const p of o.walls)u.walls.push(l(p.sp));return o.setPiece&&(u.set=a.set?.[0]==="tree"?h(a.set[1],900):{bot:l(o.setPiece.sp),top:null}),{sprites:c,layout:u,floor:o.floor.sp}}function oh(i,e,t,n=null){const r=[];for(const s of["towards","away"])for(let a=0;a<4;a++)for(let o=0;o<2;o++)r.push(gi(Nd(e,a,o,i,s,n),Pd(e,i,n),i,i.cOutline,t));return r}const sM=(i,e,t=!1)=>(t?8:0)+i*2+e;function oa(i,e,t){return i.getContext("2d").getImageData(0,0,e,t).data}function qs(i,e=2048){const n=[];let r=0,s=0,a=0,o=1;for(const h of i)r+h.w+1>e&&(r=0,s+=a+1,a=0),n.push({x:r,y:s}),r+=h.w+1,a=Math.max(a,h.h),o=Math.max(o,r);const c=Math.max(1,s+a),l=new Uint8Array(o*c*4),u=new Uint8Array(o*c*4),d=i.map((h,p)=>{const g=n[p],v=oa(h.A,h.w,h.h),x=oa(h.N,h.w,h.h);for(let m=0;m<h.h;m++){const _=m*h.w*4,M=((g.y+m)*o+g.x)*4;l.set(v.subarray(_,_+h.w*4),M),u.set(x.subarray(_,_+h.w*4),M)}return{uv:[g.x/o,g.y/c,(g.x+h.w)/o,(g.y+h.h)/c],w:h.w,h:h.h}});return{albedo:l,normal:u,width:o,height:c,frames:d}}function aM(i,e){if(i.kind==="creature")return{px:qs(oh(i.style,i.id,e),2048)};if(i.kind==="party")return{px:qs(oh(i.style,i.species,e,{...Ld(i.seed),collar:i.colour}),2048)};const{sprites:t,layout:n,floor:r}=rM(i.style,i.seed,i.id,i.K,e);return{px:qs(t),layout:n,floor:{albedo:new Uint8Array(oa(r.A,r.w,r.h)),normal:new Uint8Array(oa(r.N,r.w,r.h)),w:r.w,h:r.h}}}function lh(i,e,t){const n=new cr(i,e,t,pn,fn);return n.magFilter=Ut,n.minFilter=Ut,n.generateMipmaps=!1,n.flipY=!1,n.colorSpace=Pn,n.needsUpdate=!0,n}function Su(i){return{albedo:lh(i.albedo,i.width,i.height),normal:lh(i.normal,i.width,i.height),frames:i.frames}}const Is=(i,e=2048)=>Su(qs(i,e));class oM{constructor(e,t,n){this.style=e,this.seed=t,this.K=2/n;const r=Ku(e),s=c=>gi(nd(e,c),r,e,e.cOutline);this.witch=Is([0,1,2].map(c=>s({frame:c})).concat([0,1,2].map(c=>s({frame:c,facing:"away"})),[s({lean:!0}),s({lean:!0,facing:"away"})],...["rise","descend"].flatMap(c=>["towards","away"].flatMap(l=>[0,1].map(u=>s({pose:c,frame:u,facing:l}))))),1024),this.stones=Is([0,1,2,3].map(c=>this.stone(c)));const a=lf(e);this.props=Is([...a.campfire,a.stones.cyan,a.stones.violet,a.stones.green],1024);const o=[];for(let c=0;c<3;c++)for(let l=0;l<3;l++)o.push(gi(j_(e,{variant:c,frame:l,state:"playing"}),Z_(c),e,e.cOutline));if(this.soundsystems=Is(o,2048),this.useWorkers=typeof Worker<"u"&&typeof OffscreenCanvas<"u",this.useWorkers){const c=Math.max(1,Math.min(3,(navigator.hardwareConcurrency||2)-1));try{for(let l=0;l<c;l++){const u=new Worker(new URL(""+new URL("artWorker-CmeBstVf.js",import.meta.url).href,import.meta.url),{type:"module"}),d={w:u,busy:!1};u.onmessage=h=>{d.busy=!1,d.job=void 0,this.receive(h.data),this.dispatch()},u.onerror=()=>{this.useWorkers=!1,d.job&&this.queue.unshift(d.job),d.busy=!1,d.job=void 0},this.workers.push(d)}}catch{this.useWorkers=!1}}}style;seed;types=new Map;creatures=new Map;queue=[];inFlight=new Set;workers=[];useWorkers;witch;stones;props;soundsystems;K;version=0;onFloor=()=>{};stone(e){const t=vi(this.seed*3+e),n=5+Math.floor(t()*3),r=7+Math.floor(t()*5),s=new cn(n+2,r+1);return s.ellipse((n+2)/2,r/2+1,n/2,r/2+.5,f.BODY,{round:this.style.round}),s.ellipse((n+2)/2-1,r/2,n/3,r/3,f.BODY2,{round:this.style.round,onlyOn:new Set([f.BODY]),density:.5,seed:e}),gi(s,{[f.BODY]:[178,174,162],[f.BODY2]:[140,138,130]},this.style,"dark")}key=e=>e.kind+":"+e.id;ask(e){const t=this.key(e);this.inFlight.has(t)||(this.inFlight.add(t),this.queue.push(e),this.dispatch())}dispatch(){if(this.useWorkers)for(const e of this.workers)e.busy||!this.queue.length||(e.busy=!0,e.job=this.queue.shift(),e.w.postMessage(e.job))}receive(e){if(!e.result){console.warn("art worker failed, drawing on the page:",e.error),this.useWorkers=!1,this.queue.unshift(e.job);return}const t=Su(e.result.px);e.job.kind==="type"?(this.types.set(e.job.id,{atlas:t,layout:e.result.layout}),e.result.floor&&this.onFloor(e.job.id,e.result.floor)):this.creatures.set(e.job.id,{atlas:t,frame:sM}),this.inFlight.delete(this.key(e.job)),this.version++}typeArt(e){const t=this.types.get(e);return t||this.ask({kind:"type",id:e,style:this.style,seed:this.seed,K:this.K}),t}creatureArt(e){const t=this.creatures.get(e);return t||this.ask({kind:"creature",id:e,style:this.style}),t}partyArt(e,t,n){const r=`party-${t}`,s=this.creatures.get(r);return s||this.ask({kind:"party",id:r,species:e,seed:t,colour:n,style:this.style}),s}prefetchType(e){this.types.has(e)||this.typeArt(e)}get pending(){return this.inFlight.size}work(e){if(this.useWorkers)return;const t=performance.now();let n=0;for(;this.queue.length&&(n===0||performance.now()-t<e);){const r=this.queue.shift();this.receive({job:r,result:aM(r,(s,a)=>{const o=document.createElement("canvas");return o.width=s,o.height=a,o})}),n++}}whenIdle(){return new Promise(e=>{const t=()=>{this.work(50),this.pending?setTimeout(t,30):e()};t()})}}const gr=24,lt={uAmb:{value:new V},uMoon:{value:new V},uMoonDir:{value:new V(-.45,.75,.5).normalize()},uMoonBeam:{value:new V},uBands:{value:4},uDither:{value:.35},uShafts:{value:.3},uShaftScale:{value:1},uGlowPos:{value:new V},uGlowRgb:{value:new V},uGlowR:{value:8},uGlowPower:{value:1.4},uHazeCentre:{value:new He},uHazeRange:{value:new He(70,200)},uHazeColour:{value:new V},uTime:{value:0},uSmooth:{value:1},uLightPos:{value:Array.from({length:gr},()=>new ct)},uLightCol:{value:Array.from({length:gr},()=>new ct)},uLightCount:{value:0},uDisco:{value:new ct},uDiscoParams:{value:new ct},uDiscoColour:{value:new V(1,1,1)}};function lM(i,e,t,n=1){const r=(s,a)=>new V(s[0]/255*a,s[1]/255*a,s[2]/255*a);lt.uAmb.value.copy(r(ge(i.ambientHue,.55,1),i.ambient*n)),lt.uMoon.value.copy(r(ge(i.moonHue,.35,1),i.moon)),lt.uMoonBeam.value.copy(r(ge(i.moonHue,.35,1),i.shafts*.25)),lt.uBands.value=i.bands,lt.uDither.value=i.dither*.5,lt.uShafts.value=i.shafts,lt.uShaftScale.value=t*2,lt.uGlowRgb.value.copy(r(ge(i.glowHue,i.glowSat,1),1)),lt.uGlowR.value=e,lt.uGlowPower.value=i.glowPower,lt.uHazeColour.value.copy(r(ge(i.ambientHue-.08,.55,1),.16*Math.sqrt(n)))}const ri=`
uniform vec3 uAmb, uMoon, uMoonDir, uMoonBeam, uGlowPos, uGlowRgb;
uniform float uBands, uDither, uShafts, uShaftScale, uGlowR, uGlowPower, uTime, uSmooth;
uniform vec2 uHazeCentre, uHazeRange;
uniform vec3 uHazeColour;
uniform vec4 uLightPos[${gr}], uLightCol[${gr}];
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
  for (int i = 0; i < ${gr}; i++) {
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
`,fi=2,$t=32,Li=8,cM=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`,hM=`
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
`;class uM{constructor(e,t,n,r){this.map=e,this.forest=t;const s=e.extent,a=s.maxX-s.minX,o=s.maxZ-s.minZ,c=Math.ceil(a*fi/$t)*$t,l=Math.ceil(o*fi/$t)*$t;this.tilesX=c/$t,this.tilesZ=l/$t,this.filled=new Uint8Array(this.tilesX*this.tilesZ);const u=g=>(g.magFilter=g.minFilter=Ut,g.generateMipmaps=!1,g.colorSpace=Pn,g.needsUpdate=!0,g);this.texture=u(new cr(new Uint8Array(c*l*4),c,l)),u(this.tile),this.floors=u(new cr(new Uint8Array(64*Li*48*4*4),64*Li,192));const d=Array.from({length:32},(g,v)=>new V(...vn[v]?.floor??[.25,.45,.4])),h=new At({vertexShader:cM,fragmentShader:hM,uniforms:{...lt,uAreas:{value:this.texture},uExtent:{value:new ct(s.minX,s.minZ,c/fi,l/fi)},uPixel:{value:r},uTypeFloor:{value:d},uFloorReady:{value:this.floorReady},uFloors:{value:this.floors},uTile:{value:new He(64,48)},uFloorsSize:{value:new He(64*Li,192)},uSat:{value:n.sat},uFloor:{value:new V(e.dancefloor.x,e.dancefloor.z,e.dancefloor.radius)},uCanopy:{value:new ct},uCircle:{value:new ct},uSweeps:{value:Array.from({length:4},()=>new ct)},uSweepCount:{value:0},uClearing:{value:new He(e.tuning.clearingSize,e.tuning.clearingFalloff)}}}),p=new _n(a+400,o+400);p.rotateX(-Math.PI/2),this.mesh=new Yt(p,h),this.mesh.position.set((s.minX+s.maxX)/2,0,(s.minZ+s.maxZ)/2)}map;forest;mesh;texture;tile=new cr(new Uint8Array($t*$t*4),$t,$t);filled;tilesX;tilesZ;initialised=!1;floorReady=new Array(32).fill(0);floors;pendingFloors=[];setSweeps(e){const t=this.mesh.material.uniforms,n=t.uSweeps.value;e.slice(0,4).forEach((r,s)=>n[s].set(r.x,r.z,r.radius,r.strength)),t.uSweepCount.value=Math.min(4,e.length)}setCircle(e,t,n,r){this.mesh.material.uniforms.uCircle.value.set(e,t,n,r)}setCanopyShadow(e,t,n,r){this.mesh.material.uniforms.uCanopy.value.set(e,t,n,r)}setFloor(e,t){this.pendingFloors.push([e,t])}placeFloors(e){for(const[t,n]of this.pendingFloors){const r=this.mesh.material,s=r.uniforms.uTile.value;if(n.w!==s.x||n.h!==s.y)continue;const a=new cr(n.albedo,n.w,n.h);a.needsUpdate=!0,e.copyTextureToTexture(a,this.floors,null,new He(t%Li*n.w,Math.floor(t/Li)*n.h)),a.dispose(),this.floorReady[t]=1}this.pendingFloors=[]}fill(e,t,n,r,s){this.initialised||(e.initTexture(this.texture),e.initTexture(this.floors),this.initialised=!0),this.pendingFloors.length&&this.placeFloors(e);const a=this.map.extent,o=$t/fi,c=Math.max(0,Math.floor((t.minX-a.minX)/o)),l=Math.min(this.tilesX-1,Math.floor((t.maxX-a.minX)/o)),u=Math.max(0,Math.floor((t.minZ-a.minZ)/o)),d=Math.min(this.tilesZ-1,Math.floor((t.maxZ-a.minZ)/o)),h=(n-a.minX)/o,p=(r-a.minZ)/o,g=[];for(let m=u;m<=d;m++)for(let _=c;_<=l;_++)this.filled[m*this.tilesX+_]||g.push([_,m,(_+.5-h)**2+(m+.5-p)**2]);g.sort((m,_)=>m[2]-_[2]);const v=performance.now();let x=0;for(const[m,_]of g){if(x>0&&performance.now()-v>s)break;this.fillTile(e,m,_),x++}return g.length-x}fillTile(e,t,n){const r=this.map.extent,s=this.tile.image.data,a=$t/fi,o=r.minX+t*a,c=r.minZ+n*a,l=this.forest.lightsNear(o+a/2,c+a/2,a/2+6).filter(u=>u.kind==="pond");for(let u=0;u<$t;u++)for(let d=0;d<$t;d++){const h=o+(d+.5)/fi,p=c+(u+.5)/fi,g=this.map.areaAt(h,p),v=(u*$t+d)*4;let x=0;for(const m of l)Math.hypot(h-m.x,p-m.z)<3*m.size&&(x=255);s[v]=g.type,s[v+1]=Math.round(g.openness*255),s[v+2]=x,s[v+3]=255}this.tile.needsUpdate=!0,e.copyTextureToTexture(this.tile,this.texture,null,new He(t*$t,n*$t)),this.filled[n*this.tilesX+t]=1}dispose(){this.texture.dispose(),this.tile.dispose(),this.mesh.geometry.dispose(),this.mesh.material.dispose()}}const dM="varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",fM=`
uniform sampler2D uScene; uniform float uThreshold; varying vec2 vUv;
void main() {
  vec3 c = texture2D(uScene, vUv).rgb;
  float l = max(c.r, max(c.g, c.b));
  gl_FragColor = vec4(c * smoothstep(uThreshold, uThreshold + 0.25, l), 1.0);
}`,pM=`
uniform sampler2D uSrc; uniform vec2 uStep; varying vec2 vUv;
void main() {
  vec4 c = texture2D(uSrc, vUv) * 0.227;
  c += (texture2D(uSrc, vUv + uStep * 1.38) + texture2D(uSrc, vUv - uStep * 1.38)) * 0.316;
  c += (texture2D(uSrc, vUv + uStep * 3.23) + texture2D(uSrc, vUv - uStep * 3.23)) * 0.070;
  gl_FragColor = c;
}`,mM=`
uniform sampler2D uScene, uBloom, uFx; uniform vec2 uLow; uniform float uBloomStrength, uBlack, uGamma, uFxOn; varying vec2 vUv;
void main() {
  vec2 p = (floor(vUv * uLow) + 0.5) / uLow;
  vec3 c = texture2D(uScene, p).rgb;
  if (uFxOn > 0.5) { vec4 f = texture2D(uFx, vUv); c = c * (1.0 - f.a) + f.rgb; }
  // Levels: a black point and a gamma, so the shade goes near-black and the lit stays bright.
  c = pow(clamp((c - uBlack) / (1.0 - uBlack), 0.0, 1.0), vec3(uGamma));
  c += texture2D(uBloom, vUv).rgb * uBloomStrength;
  gl_FragColor = vec4(min(c, vec3(1.0)), 1.0);
}`,gM=`
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
}`;function Ri(i,e,t,n=!1){const r=new wn(Math.max(1,i),Math.max(1,e),{minFilter:t,magFilter:t,depthBuffer:n,generateMipmaps:!1});return r.texture.colorSpace=Pn,r}class xM{constructor(e,t){this.renderer=e,this.tuning=t,this.scene=Ri(1,1,Nt,!0),this.scene.depthTexture=new Sr(1,1),this.fx.texture.format=pn;const n=(r,s)=>new At({vertexShader:dM,fragmentShader:r,uniforms:s,depthTest:!1,depthWrite:!1});this.mats={bright:n(fM,{uScene:{value:null},uThreshold:{value:.6}}),blur:n(pM,{uSrc:{value:null},uStep:{value:new He}}),composite:n(mM,{uScene:{value:null},uBloom:{value:null},uLow:{value:new He},uBloomStrength:{value:0},uBlack:{value:0},uGamma:{value:1},uFx:{value:null},uFxOn:{value:0}}),tilt:n(gM,{uSrc:{value:null},uTexel:{value:new He},uDir:{value:new He},uStrength:{value:0},uBand:{value:.4},uCentre:{value:.5}})},this.quad=new Yt(new _n(2,2),this.mats.composite),this.quad.frustumCulled=!1}renderer;tuning;scene;bright=Ri(1,1,Nt);bloomB=Ri(1,1,Nt);a=Ri(1,1,Nt);b=Ri(1,1,Nt);fx=Ri(1,1,Nt);fxB=Ri(1,1,Nt);fxScene=null;quad;cam=new Il(-1,1,1,-1,0,1);mats;low=new He(1,1);out=new He(1,1);get fullResolution(){return this.tuning.tiltShift.on&&this.tuning.tiltShift.where==="after"}get lowSize(){return this.low}resize(e,t,n,r){this.low.set(e,t),this.fx.setSize(e,t),this.fxB.setSize(e,t),this.out.set(n,r),this.scene.setSize(e,t);const s=Math.max(1,Math.round(e/2)),a=Math.max(1,Math.round(t/2));this.bright.setSize(s,a),this.bloomB.setSize(s,a);const o=this.fullResolution?n:e,c=this.fullResolution?r:t;this.a.setSize(o,c),this.b.setSize(o,c)}pass(e,t,n){const r=this.mats[e];n(r.uniforms),this.quad.material=r,this.renderer.setRenderTarget(t),this.renderer.render(this.quad,this.cam)}render(e,t){const n=this.renderer,r=this.tuning;n.setRenderTarget(this.scene),n.render(e,t);const s=r.bloom.on&&r.bloom.strength>0;if(s){const h=this.bright.width,p=this.bright.height;this.pass("bright",this.bright,g=>{g.uScene.value=this.scene.texture,g.uThreshold.value=r.bloom.threshold});for(let g=0;g<2;g++)this.pass("blur",this.bloomB,v=>{v.uSrc.value=this.bright.texture,v.uStep.value.set(1/h,0)}),this.pass("blur",this.bright,v=>{v.uSrc.value=this.bloomB.texture,v.uStep.value.set(0,1/p)})}const a=!!this.fxScene;if(this.fxScene){const h=n.getClearColor(new et),p=n.getClearAlpha();n.setRenderTarget(this.fx),n.setClearColor(0,0),n.clear(),n.render(this.fxScene,t),n.setClearColor(h,p);const g=this.fx.width,v=this.fx.height;this.pass("blur",this.fxB,x=>{x.uSrc.value=this.fx.texture,x.uStep.value.set(.6/g,0)}),this.pass("blur",this.fx,x=>{x.uSrc.value=this.fxB.texture,x.uStep.value.set(0,.6/v)})}const o=r.tiltShift.on&&r.tiltShift.strength>0;if(this.pass("composite",o?this.a:null,h=>{h.uScene.value=this.scene.texture,h.uBloom.value=this.bright.texture,h.uLow.value.copy(this.low),h.uBloomStrength.value=s?r.bloom.strength:0,h.uBlack.value=r.tone.black,h.uGamma.value=r.tone.gamma,h.uFx.value=this.fx.texture,h.uFxOn.value=a?1:0}),!o)return;const c=this.a.width,l=this.a.height,u=this.fullResolution?this.out.y/this.low.y:1,d=h=>{h.uTexel.value.set(1/c,1/l),h.uStrength.value=r.tiltShift.strength*u,h.uBand.value=r.tiltShift.band,h.uCentre.value=1-r.tiltShift.centre};this.pass("tilt",this.b,h=>{d(h),h.uSrc.value=this.a.texture,h.uDir.value.set(1,0)}),this.pass("tilt",null,h=>{d(h),h.uSrc.value=this.b.texture,h.uDir.value.set(0,1)})}}const vM=`
uniform vec3 uRight, uUp;
uniform float uSize;
varying vec2 vUv;
void main() {
  vUv = uv * 2.0 - 1.0;
  vec3 w = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz + (uRight * position.x + uUp * position.y) * uSize;
  gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
}`,_M=`
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
}`,MM=`
uniform vec3 uTint;
void main() {
  if (mod(floor(gl_FragCoord.y), 3.0) > 0.5) discard; // faint: a dotted thread of light
  gl_FragColor = vec4(uTint, 1.0);
}`,SM=`
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
}`,bM=`
uniform vec3 uTint;
varying float vA;
void main() { if (vA < 0.15) discard; gl_FragColor = vec4(uTint * (0.5 + vA), 1.0); }`;class yM{constructor(e,t,n,r){this.tuning=t;const s=t.dancefloor,a=e.dancefloor;this.centre=new V(a.x,0,a.z);const o=new V(...ge(s.circleHue2,.4,1).map(x=>x/255));this.ballMat=new At({vertexShader:vM,fragmentShader:_M,uniforms:{...n,uSize:{value:s.discoSize/2},uTime:lt.uTime,uSpin:{value:s.spin/60*Math.PI*2},uPixels:{value:Math.max(6,Math.round(s.discoSize/r))},uTint:{value:o}}}),this.ball=new Yt(new _n(2,2),this.ballMat),this.ball.frustumCulled=!1;const c=60;this.beam=new Yt(new _n(r,c).translate(0,c/2,0),new At({fragmentShader:MM,uniforms:{uTint:{value:o.clone().multiplyScalar(.5)}}})),this.beam.frustumCulled=!1;const l=s.motes,u=[],d=[];for(let x=0;x<l.count;x++){const m=b=>{const w=Math.sin(x*12.9898+b*78.233)*43758.5453;return w-Math.floor(w)},_=m(1)*Math.PI*2,M=Math.sqrt(m(2))*a.radius*l.column;u.push(a.x+Math.cos(_)*M,.3,a.z+Math.sin(_)*M),d.push(m(3),l.speed*(.6+m(4)*.8),.4+m(5)*1.2,0)}const h=new Gt;h.setAttribute("position",new Lt(u,3)),h.setAttribute("aMote",new Lt(d,4));const p=ge(s.circleHue,.55,1);this.motes=new sa(h,new At({vertexShader:SM,fragmentShader:bM,uniforms:{uTime:lt.uTime,uRise:{value:l.rise},uTint:{value:new V(p[0]/255,p[1]/255,p[2]/255)}},transparent:!0,depthWrite:!1,blending:_r})),this.motes.frustumCulled=!1;const g=ge(s.circleHue,.7,1);this.lightRgb=new V(g[0]/255,g[1]/255,g[2]/255);const v=lt;v.uDiscoParams.value.set(s.spin/60*Math.PI*2,s.specks,s.speckBrightness,s.speckReach),v.uDiscoColour.value.copy(o)}tuning;ball;beam;motes;ballMat;lightRgb;centre;update(e,t){const n=this.tuning.dancefloor,r=.75+.25*Math.sin(e*n.pulse*Math.PI*2);t.setCircle(n.circleHue,n.circleHue2,.7+.3*r,e*n.runeSpeed/60*Math.PI*2);const s=n.discoHeight+Math.sin(e*.8)*.3;return this.ball.position.set(this.centre.x,s,this.centre.z),this.beam.position.set(this.centre.x,s+n.discoSize/2,this.centre.z),lt.uDisco.value.set(this.centre.x,s,this.centre.z,1),{x:this.centre.x,y:2.5,z:this.centre.z,reach:n.lightReach,rgb:this.lightRgb,strength:n.lightStrength*r}}}const wM=[new V(.25,.85,1),new V(.7,.4,1),new V(1,.65,.2)];class EM{constructor(e,t){this.atlas=e,this.metresPerPixel=t}atlas;metresPerPixel;homeSoundsystem(e){const t=e.map.dancefloor;return{x:t.x+t.radius+5,z:t.z+3,variant:0,at:-1/0,from:null}}update(e,t,n,r){const s=e.tuning.party,a=[],o=[],c=[],l=[],u=[this.homeSoundsystem(e)];for(const[,d]of e.party.areas){if(!d.soundsystem)continue;const h=d.from?e.map.siteOf(d.from[0],d.from[1]):null;u.push({...d.soundsystem,at:d.at,from:h})}for(const d of u){const h=s.transition>0?Math.min(1,(t-d.at)/s.transition):1,p=this.atlas.frames[d.variant*3+Math.floor(t*6)%3],g=p.h*this.metresPerPixel,v=ln((h-.55)/.45);if(h<1&&d.from){const m=(d.from.x+d.x)/2,_=(d.from.z+d.z)/2,M=Math.hypot(d.x-m,d.z-_)*1.6;c.push({x:m,z:_,radius:h*M,strength:1-ln((h-.8)/.2)})}v>0&&n(d.x,d.z,p.w*this.metresPerPixel,g)&&a.push({x:d.x,y:-(1-v)*g,z:d.z,frame:p,flip:!1,fresh:r(d.x,d.z,g)}),h>=1&&l.push({x:d.x,y:g*.85,z:d.z,seed:Math.floor(Math.abs(d.x*7.3+d.z*13.1))%1e5,ready:d.at+s.transition});const x=.85+.15*Math.sin(t*8);v>0&&o.push({x:d.x,y:3,z:d.z,reach:s.lightReach,rgb:wM[d.variant%3],strength:s.lightStrength*x*v*(1+(1-h)*2)})}return{items:a,lights:o,sweeps:c,playing:l}}}function AM(i,e,t){const n=i.tuning.stringLights,r=i.siteOf(t[0],t[1]),s=vi(i.seed*53+t[0]*1031+t[1]*7+509),a=h=>{const p=i.areaAt(h.x,h.z).cell;return p[0]===t[0]&&p[1]===t[1]},o=h=>Ye(Math.round(h.x*10),Math.round(h.z*10),i.seed+501),c=e.treesNear(r.x,r.z,i.areaSize*1.3).filter(a).sort((h,p)=>o(h)-o(p)),l=new Set,u=[],d=[];for(const h of c){if(d.length>=n.perArea)break;if(l.has(h)||u.some(m=>Math.hypot(m.x-h.x,m.z-h.z)<n.spread))continue;u.push(h);let p=h,g=0,v=0;const x=1+Math.floor(s()*n.chainMax);l.add(h);for(let m=0;m<x&&d.length<n.perArea;m++){const _=[];for(const w of c){if(l.has(w))continue;const E=w.x-p.x,P=w.z-p.z,S=Math.hypot(E,P);if(!(S<n.spanMin||S>n.spanMax)&&!(m>0&&(E*g+P*v)/S<.5)&&(_.push(w),_.length>24))break}if(!_.length)break;const M=_[Math.floor(s()*_.length)],b=Math.hypot(M.x-p.x,M.z-p.z);d.push({ax:p.x,az:p.z,bx:M.x,bz:M.z,seed:Math.floor(Ye(Math.round(p.x*10),Math.round(M.z*10),i.seed+503)*1e6)}),l.add(M),g=(M.x-p.x)/b,v=(M.z-p.z)/b,p=M}}return d}const TM=`
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
}`,RM=`
uniform float uTwinkle, uChase;
varying vec3 vColour;
varying vec3 vWorld;
varying float vOn;
varying vec2 vB;
${ri}
void main() {
  if (vOn < 0.5) discard;
  float b = 1.0 - uTwinkle * 0.5 * (1.0 + sin(uTime * (1.3 + vB.x) + vB.x * 40.0));
  if (fract((vB.y - uTime * uChase) / 60.0) < 0.06) b = 1.4;  // a chase running along now and then
  gl_FragColor = vec4(haze(vColour * b * 1.6, vWorld), 1.0); // bright enough to bloom
}`,CM=`
attribute float aSway;
uniform float uWind, uTime;
varying vec3 vWorld;
void main() {
  vec3 p = position;
  p.x += sin(uTime * uWind + aSway * 6.0) * 0.18 * fract(aSway * 7.0);
  vWorld = p;
  gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
}`,LM=`
varying vec3 vWorld;
${ri}
void main() { gl_FragColor = vec4(haze(vec3(0.03, 0.025, 0.04), vWorld), 1.0); }`,PM=`
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
}`,DM=`
uniform vec3 uMoteColour;
varying float vA;
varying vec3 vWorld;
${ri}
void main() {
  if (vA < 0.3) discard;
  gl_FragColor = vec4(haze(uMoteColour * (0.6 + 0.6 * vA), vWorld), 1.0);
}`;class IM{constructor(e,t){this.scene=e,this.game=t;const n=t.tuning.stringLights;this.palette=n.palette.map(s=>new et(s));const r={...lt,uWind:{value:t.tuning.canopyShadow.wind*1.5}};this.bulbMat=new At({vertexShader:TM,fragmentShader:RM,uniforms:{...r,uNear:{value:240},uTwinkle:{value:n.twinkle},uChase:{value:n.chaseSpeed}}}),this.wireMat=new At({vertexShader:CM,fragmentShader:LM,uniforms:r}),this.moteMat=new At({vertexShader:PM,fragmentShader:DM,uniforms:{...lt,uMoteColour:{value:new et(1,.85,1)}}})}scene;game;built=new Map;palette;bulbMat;wireMat;moteMat;build(e,t,n,r){const s=this.game.tuning.stringLights,a=s.height,o=[],c=[],l=[],u=[],d=[];e.forEach((M,b)=>{const w=Math.hypot(M.bx-M.ax,M.bz-M.az),E=Math.max(2,Math.round(w/s.bulbSpacing)),P=S=>[M.ax+(M.bx-M.ax)*S,a-s.sag*4*S*(1-S)*(w/8),M.az+(M.bz-M.az)*S];for(let S=0;S<=16;S++){const A=P(S/16),L=P((S+1)/16);S<16&&(u.push(...A,...L),d.push(b+S/16,b+(S+1)/16))}for(let S=1;S<E;S++){const A=S/E,L=P(A),R=this.palette[(M.seed+S)%this.palette.length];o.push(...L),c.push(R.r,R.g,R.b),l.push((M.seed*13+S*7)%100/100,b*40+S,t(L[0],L[2])+S*.03,4*A*(1-A))}});const h=new Hr,p=new Gt;p.setAttribute("position",new Lt(o,3)),p.setAttribute("aColour",new Lt(c,3)),p.setAttribute("aBulb",new Lt(l,4));const g=new Gt;g.setAttribute("position",new Lt(u,3)),g.setAttribute("aSway",new Lt(d,1)),h.add(new Dl(g,this.wireMat),new sa(p,this.bulbMat));const v=[],x=[];for(let M=0;M<48;M++){const b=A=>{const L=Math.sin(r*12.9898+M*78.233+A*37.719)*43758.5453;return L-Math.floor(L)},w=b(1)*Math.PI*2,E=2+b(2)*14,P=n.x+Math.cos(w)*E,S=n.z+Math.sin(w)*E;v.push(P,.3,S),x.push(b(3),.4+b(4)*.6,.3+b(5)*.8,t(P,S))}const m=new Gt;m.setAttribute("position",new Lt(v,3)),m.setAttribute("aMote",new Lt(x,4));const _=new sa(m,this.moteMat);return _.frustumCulled=!1,h.add(_),h.traverse(M=>{M.frustumCulled=!1}),h}update(){const e=this.game;if(!e.tuning.stringLights.on)return;let n=0;for(const[r,s]of e.party.areas){let a=this.built.get(r);if(!a){if(n++>=2)break;const o=AM(e.map,e.forest,s.cell),c=e.map.siteOf(s.cell[0],s.cell[1]),l=s.from?e.map.siteOf(s.from[0],s.from[1]):null,u=l?(l.x+c.x)/2:c.x,d=l?(l.z+c.z)/2:c.z,h=l?Math.hypot(c.x-u,c.z-d)*1.6:1,p=e.tuning.party.transition,g=(x,m)=>s.wave===0?-1:s.at+Math.min(1,Math.hypot(x-u,m-d)/h)*p,v=s.soundsystem??(s.wave===0?e.map.dancefloor:c);a={lines:o,group:this.build(o,g,v,s.cell[0]*131+s.cell[1]*17+e.seed),on:s.wave===0?-1:s.at},this.scene.add(a.group),this.built.set(r,a)}}}clear(){for(const[,e]of this.built)this.scene.remove(e.group);this.built.clear()}}const an={uRight:{value:new V(1,0,0)},uUp:{value:new V(0,1,0)},uFacing:{value:new V(0,0,1)},uTopFade:{value:0},uCutout:{value:new ct(0,0,0,1)},uDebugCull:{value:0},uRes:{value:new He(1,1)}},NM=`
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
`,UM=`
uniform sampler2D uAlbedo, uNormal;
uniform vec3 uRight, uUp, uFacing;
uniform float uTopFade, uUnlit;
uniform vec4 uCutout;
uniform float uDebugCull;
varying vec2 vUv;
varying vec3 vWorld;
varying vec3 vFlags;
${ri}
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
`;class rr{constructor(e,t,n={}){this.atlas=e,this.metresPerPixel=t;const r=new _n(1,1);r.translate(0,.5,0),this.geo=new Nl,this.geo.index=r.index,this.geo.setAttribute("position",r.getAttribute("position")),this.geo.setAttribute("uv",r.getAttribute("uv")),this.pos=this.size=this.uvs=this.flags=void 0,this.grow(64);const s=new At({vertexShader:NM,fragmentShader:UM,uniforms:{...lt,...an,uAlbedo:{value:e.albedo},uNormal:{value:e.normal},uUnlit:{value:n.unlit?1:0}},depthTest:!n.onTop,depthWrite:!n.onTop});this.mesh=new Yt(this.geo,s),this.mesh.frustumCulled=!1,n.onTop&&(this.mesh.renderOrder=10)}atlas;metresPerPixel;mesh;geo;pos;size;uvs;flags;capacity=0;count=0;grow(e){const t=Math.max(e,this.capacity*2);this.geo.dispose();const n=(r,s)=>{const a=new Pl(new Float32Array(t*r),r);return a.setUsage(fr),s&&a.array.set(s.array),a};this.pos=n(3,this.pos),this.size=n(2,this.size),this.uvs=n(4,this.uvs),this.flags=n(3,this.flags),this.geo.setAttribute("iPos",this.pos),this.geo.setAttribute("iSize",this.size),this.geo.setAttribute("iUv",this.uvs),this.geo.setAttribute("iFlags",this.flags),this.capacity=t}set(e){e.length>this.capacity&&this.grow(e.length);const t=this.pos.array,n=this.size.array,r=this.uvs.array,s=this.flags.array;e.forEach((a,o)=>{t[o*3]=a.x,t[o*3+1]=a.y,t[o*3+2]=a.z,n[o*2]=a.frame.w*this.metresPerPixel,n[o*2+1]=a.frame.h*this.metresPerPixel,r.set(a.frame.uv,o*4),s[o*3]=a.flip?1:0,s[o*3+1]=a.top?1:0,s[o*3+2]=a.fresh?1:0});for(const a of[this.pos,this.size,this.uvs,this.flags])a.needsUpdate=!0;this.count=e.length,this.geo.instanceCount=e.length,this.mesh.visible=e.length>0}get dropped(){const e=this.geo._maxInstanceCount;return e===void 0||!this.mesh.visible?0:Math.max(0,this.count-e)}dispose(){this.geo.dispose(),this.mesh.material.dispose(),this.atlas.albedo.dispose(),this.atlas.normal.dispose()}}const zt=32,sr=16,FM=`
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
}`,OM=`
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
}`;class ch{mesh;geo=new Nl;cap=0;n=0;pos;size;uv;col;draw;constructor(e){const t=new _n(1,1);this.geo.index=t.index,this.geo.setAttribute("position",t.getAttribute("position")),this.geo.setAttribute("uv",t.getAttribute("uv")),this.grow(256),this.mesh=new Yt(this.geo,e),this.mesh.frustumCulled=!1,this.mesh.renderOrder=3}grow(e){const t=(r,s)=>{const a=new Float32Array(e*s);return r&&a.set(r),a};this.pos=t(this.pos,3),this.size=t(this.size,1),this.uv=t(this.uv,4),this.col=t(this.col,4),this.draw=t(this.draw,1),this.cap=e,this.geo.dispose();const n=(r,s,a)=>this.geo.setAttribute(r,new Pl(s,a).setUsage(fr));n("iPos",this.pos,3),n("iSize",this.size,1),n("iUv",this.uv,4),n("iCol",this.col,4),n("iDraw",this.draw,1)}begin(){this.n=0}add(e,t,n,r,s,a,o,c,l,u=1){this.n>=this.cap&&this.grow(this.cap*2);const d=this.n++;this.pos.set([e,t,n],d*3),this.size[d]=r,this.uv.set(s,d*4),this.col.set([a,o,c,l],d*4),this.draw[d]=u}end(){this.geo.instanceCount=this.n;for(const e of["iPos","iSize","iUv","iCol","iDraw"])this.geo.getAttribute(e).needsUpdate=!0}}const BM=["🎉","🎈","💃","🎊","🥳","😛","🍉","🍒","🍷","🍸","🍹","🥂","🍺","😁","😆"],zM=[["😴","🫩","🥱","💼"],["😐","😐","🥱"],["😮","🤭","🫢","😛"],["🙂","🍷","🍺","😁"],["🥳","🎉","🎈","😆","🥂","💃"]];class kM{constructor(e,t){this.game=t,this.canvas.width=this.canvas.height=zt*sr;const n=this.canvas.getContext("2d"),r=n.createRadialGradient(zt/2,zt/2,0,zt/2,zt/2,zt/2);r.addColorStop(0,"rgba(255,255,255,1)"),r.addColorStop(.35,"rgba(255,255,255,.55)"),r.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=r,n.fillRect(0,0,zt,zt),this.tex=new km(this.canvas),this.tex.magFilter=Ut,this.tex.minFilter=Ut,this.tex.generateMipmaps=!1;const s=a=>new At({vertexShader:FM,fragmentShader:OM,uniforms:{...lt,uRight:an.uRight,uUp:an.uUp,uFlat:{value:a},uGlyphs:{value:this.tex}},transparent:!0,depthWrite:!1,blending:_r});this.standing=new ch(s(0)),this.flat=new ch(s(1)),e.add(this.standing.mesh,this.flat.mesh)}game;canvas=document.createElement("canvas");tex;slots=new Map;colours=new Map;standing;flat;fizzles=[];bursts=[];chain=[];lastTime=0;bubbleWitch=document.getElementById("bubble-witch");bubbleCreature=document.getElementById("bubble-creature");v=new V;slotOf(e,t=0){const n=`${e}:${t}`;let r=this.slots.get(n);if(r!==void 0)return r;r=this.slots.size+1,this.slots.set(n,r);const s=this.canvas.getContext("2d"),a=r%sr*zt,o=Math.floor(r/sr)*zt;s.clearRect(a,o,zt,zt),Xd(s,e,{x:a+1,y:o+1,size:zt-2,level:t,colour:[255,255,255],glow:!1});const c=s.getImageData(a,o,zt,zt);for(let u=3;u<c.data.length;u+=4)c.data[u]=c.data[u]>90?255:0;s.putImageData(c,a,o);const l=da(e);return this.colours.set(e,new et(l[0]/255,l[1]/255,l[2]/255)),this.tex.needsUpdate=!0,r}uv(e){const t=zt*sr,n=e%sr*zt,r=Math.floor(e/sr)*zt;return[n/t,1-r/t,(n+zt)/t,1-(r+zt)/t]}update(e,t,n,r,s){const a=this.game,o=a.leash,c=a.tuning,l=a.witch,u=c.bond,d=c.leash,h=this.uv(0);this.standing.begin(),this.flat.begin();for(const M of o.events)M.kind==="fizzled"&&this.fizzles.push({x:M.x,z:M.z,at:e}),M.kind==="invited"&&this.bursts.push({x:M.x,z:M.z,at:e,seed:M.id});this.fizzles=this.fizzles.filter(M=>e-M.at<.7),this.bursts=this.bursts.filter(M=>e-M.at<.9);for(const M of this.bursts){const b=(e-M.at)/.9;for(let w=0;w<28;w++){const E=Ye(M.seed,w,3)*Math.PI*2,P=2+Ye(M.seed,w,5)*3,S=2+Ye(M.seed,w,7)*3,A=[[1,.4,.8],[.3,.95,1],[1,.9,.3],[.6,1,.4],[1,1,1]][w%5];this.standing.add(M.x+Math.cos(E)*P*b,.6+S*b-4*b*b,M.z+Math.sin(E)*P*b,.3,h,A[0],A[1],A[2],1-b)}}if(o.talk){const M=a.creatures[o.talk.id],b=o.talk.refused?0:Math.min(1,o.talk.t/o.talk.total),w=28;for(let E=0;E<w;E++){const P=Math.PI/2-E/w*Math.PI*2,S=E/w<b;this.flat.add(M.x+Math.cos(P)*1.5,0,M.z+Math.sin(P)*1.1,.35,h,1,S?.6:.9,S?.9:1,S?.9:.18)}}const p=c.stack,g=Math.min(.1,Math.max(0,e-this.lastTime)),v=new Map;for(this.lastTime=e;this.chain.length<o.stack.length;)this.chain.push({x:0,z:0,vx:0,vz:0});let x={x:0,z:0},m=s;for(let M=o.stack.length-1;M>=0;M--){const b=o.stack[M],w=a.creatures[b],E=o.stack.length-1-M,P=this.chain[E],S=(2+w.level*.4)*p.scale,A=Math.sin(e*1.7+E*.9)*p.idleSway*(1+E*.5),L=x.x-l.vx*p.trail+A,R=x.z-l.vz*p.trail;P.vx+=((L-P.x)*p.stiffness-P.vx*p.damping)*g,P.vz+=((R-P.z)*p.stiffness-P.vz*p.damping)*g,P.x+=P.vx*g,P.z+=P.vz*g,x=P,m+=(E===0?p.offset*S:p.gap*S)+S/2;const N=new V(l.x+P.x,m,l.z+P.z);m+=S/2,v.set(b,N);const U=(this.slotOf(w.species,w.level),this.colours.get(w.species));this.standing.add(N.x,N.y,N.z,S,this.uv(this.slotOf(w.species,w.level)),U.r,U.g,U.b,1)}for(const M of o.placed){const b=a.creatures[M.id],w=this.slotOf(b.species,b.level),E=this.colours.get(b.species),P=.8+.2*Math.sin(e*2+M.id);this.flat.add(M.x,0,M.z,3+b.level*.8,this.uv(w),E.r*P,E.g*P,E.b*P,1,Math.min(1,(e-M.at)/.8)),this.flat.add(M.x,0,M.z,5,h,E.r,E.g,E.b,.25)}if(l.mode==="ground"&&o.stack.length&&!o.placed.some(M=>Math.hypot(M.x-l.x,M.z-l.z)<=d.pickRadius)){const M=a.creatures[o.stack[o.stack.length-1]],b=this.colours.get(M.species),w=Ih(o,l.x,l.z,c);this.flat.add(l.x,0,l.z,3+M.level*.8,this.uv(this.slotOf(M.species,M.level)),w?1:b.r,w?.1:b.g,w?.1:b.b,.22)}for(const M of this.fizzles){const b=1-(e-M.at)/.7;this.flat.add(M.x,0,M.z,3*(1+(1-b)*.6),h,1,.15,.1,b)}const _=[...o.stack,...o.placed.map(M=>M.id)];for(const M of _){const b=a.creatures[M],w=this.colours.get(b.species);if(!w)continue;const E=Df(o,M,l.x,l.z);u.rim&&this.flat.add(b.x,0,b.z,1.8,h,w.r,w.g,w.b,.35);const P=v.get(M)??new V(E.x,.2,E.z);if(u.sparks){const A=Math.max(.5,u.sparkEvery),L=(e+M*.618%1*A)%A;if(L<.7){const R=L/.7;this.standing.add(P.x+(b.x-P.x)*R,P.y+(.6-P.y)*R+Math.sin(R*Math.PI)*1.2,P.z+(b.z-P.z)*R,.35,h,w.r,w.g,w.b,1)}}const S=Math.hypot(b.x-E.x,b.z-E.z);if(u.thread&&S>d.length*.85){const A=Math.min(1,(S-d.length*.85)/d.length),L=Math.min(60,Math.floor(S/1.2));for(let R=1;R<L;R++){const N=(R+e*2%1)/L;this.standing.add(P.x+(b.x-P.x)*N,P.y+(.5-P.y)*N,P.z+(b.z-P.z)*N,.22,h,w.r,w.g,w.b,.25+.75*A)}}}this.standing.end(),this.flat.end(),this.bubbles(e,t,n,r)}bubbles(e,t,n,r){const s=this.game,a=s.leash.talk,o=this.bubbleWitch,c=this.bubbleCreature;if(!o||!c)return;const l=s.witch,u=(M,b,w,E)=>{this.v.set(b,w,E).project(t),M.style.left=`${(this.v.x+1)/2*n}px`,M.style.top=`${(1-this.v.y)/2*r}px`},d=c.querySelector("span"),h=c.querySelector(".bar");if(!a){c.style.opacity="0.85",h.style.display="none",o.classList.toggle("on",s.leash.held),s.leash.held&&(o.textContent=s.leash.heldInAir?"land to talk":"…",u(o,l.x-1.2,vr(l,s.tuning)+2.2,l.z));const M=l.mode==="ground"?If(s.creatures,l.x,l.z,s.tuning):null;c.classList.toggle("on",!!M),M&&(d.textContent=M.level===3?"😒":"💬 T",u(c,M.x,1.2+M.level*.8,M.z));return}const p=s.creatures[a.id];if(u(o,l.x-1.2,vr(l,s.tuning)+2.2,l.z),u(c,p.x,1.2+p.level*.8,p.z),a.refused){o.classList.remove("on"),d.textContent=Ye(a.id,1,9)<.5?"😒":"🙄",h.style.display="none",c.classList.toggle("on",a.t<1.6),c.style.opacity="1";return}h.style.display="";const g=Math.floor(a.t/Pf(p,s.tuning)),v=Math.min(1,a.t/a.total),x=(M,b)=>M[Math.floor(Ye(a.id,b,5)*M.length)%M.length],m=[4,2,0][Math.min(2,p.level)],_=Math.round(m+(4-m)*v);o.textContent=x(BM,g-g%2),o.classList.toggle("on",g%2===0),d.textContent=g>=1?x(zM[_],g-(g+1)%2):"…",h.querySelector("i").style.width=`${v*100}%`,c.classList.add("on"),c.style.opacity=g%2===1?"1":"0.6"}}const GM=[1,3,5,7,9],bu=i=>{const e=60/Math.max(1,i.beat.bpm);return{beat:e,bar:e*4}};function HM(i,e,t,n){const r=n.lasers,{beat:s,bar:a}=bu(n),o=a*Math.max(1,r.blockBars),c=Math.floor(i/o),l=i-c*o,u=_i(r.duty*t,0,1),h=Ye(e,c,311)<u?ln(l/Math.max(.001,r.fadeIn))*ln((o-l)/Math.max(.001,r.fadeOut)):0,p=Math.floor(l/a),g=GM.filter(b=>b<=r.maxCount),v=g[Math.floor(Ye(e,c*64+p,313)*g.length)%g.length]??1,x=e%97*.37,m=Math.sin(2*Math.PI*i/(s*r.sweepBeats)+x)*(r.sweep*Math.PI)/180,_=.55+.45*Math.sin(2*Math.PI*i/(a*r.openBars)+x*2),M=((e%1e3*.0137+i/(a*8))%1+1)%1;return{on:h,count:v,sweep:m,open:_,hue:M}}const VM=`
attribute vec4 aCol; // rgb, alpha
attribute float aU;  // 0 at the source, 1 at the far end
varying vec4 vCol;
varying float vU;
void main() { vCol = aCol; vU = aU; gl_Position = projectionMatrix * viewMatrix * vec4(position, 1.0); }`,WM=`
varying vec4 vCol;
varying float vU;
void main() { float a = vCol.a * pow(1.0 - vU, 0.6); gl_FragColor = vec4(vCol.rgb * a, 1.0); }`,kr=[[.3,.95,1],[.35,.55,1],[.7,.4,1],[1,.3,.85],[.45,1,.55]],XM=i=>{const e=(i%1+1)%1*kr.length,t=Math.floor(e),n=e-t,r=kr[t%kr.length],s=kr[(t+1)%kr.length];return[r[0]+(s[0]-r[0])*n,r[1]+(s[1]-r[1])*n,r[2]+(s[2]-r[2])*n]};class YM{constructor(e,t){this.game=t,this.mesh=new Dl(this.geo,new At({vertexShader:VM,fragmentShader:WM,transparent:!0,depthWrite:!1,blending:_r})),this.mesh.frustumCulled=!1,e.add(this.mesh)}game;geo=new Gt;pos=new Float32Array(0);col=new Float32Array(0);u=new Float32Array(0);mesh;update(e,t,n,r){const s=this.game.tuning,a=s.lasers,{bar:o}=bu(s),c=o*a.blockBars,l=[],u=[],d=[];if(a.on)for(const h of t){const p=1-Math.min(1,Math.max(0,(Math.hypot(h.x-n,h.z-r)-a.fadeNear)/Math.max(1,a.fadeFar-a.fadeNear)));if(p<=0)continue;const g=HM(e,h.seed,1,s),v=e-h.ready,x=v>=0&&v<c?Math.min(1,v/a.fadeIn)*Math.min(1,(c-v)/a.fadeOut):0,m=Math.max(g.on,x),_=x>g.on?a.maxCount:g.count;if(m<=.01)continue;const M=a.spread*Math.PI/180*g.open;for(let b=0;b<_;b++){const w=_===1?0:b/(_-1)-.5,E=w*M+g.sweep,P=Math.sin(E),S=Math.cos(E),A=-.15*Math.cos(E*3+h.seed),L=XM(g.hue+b*.07),R=a.opacity*m*p;l.push(h.x,h.y,h.z,h.x+P*a.length,h.y+S*a.length,h.z+A*a.length),u.push(...L,R,...L,R),d.push(0,1)}}if(l.length>this.pos.length&&(this.pos=new Float32Array(l.length*2),this.col=new Float32Array(u.length*2),this.u=new Float32Array(d.length*2),this.geo.setAttribute("position",new xn(this.pos,3).setUsage(fr)),this.geo.setAttribute("aCol",new xn(this.col,4).setUsage(fr)),this.geo.setAttribute("aU",new xn(this.u,1).setUsage(fr))),!!this.geo.getAttribute("position")){this.pos.set(l),this.col.set(u),this.u.set(d);for(const h of["position","aCol","aU"])this.geo.getAttribute(h).needsUpdate=!0;this.geo.setDrawRange(0,l.length/3)}}}function*qM(i,e,t,n){const r=i.siteOf(e[0],e[1]),s=i.areaSize*1.5,a=Math.max(t*2,8),o=i.bounds,c=(m,_)=>{if(m<o.minX||m>o.maxX||_<o.minZ||_>o.maxZ)return"edge";const M=i.areaAt(m,_).cell;return`${M[0]},${M[1]}`},l=`${e[0]},${e[1]}`,u=Math.ceil(2*s/a),d=r.x-s,h=r.z-s,p=[];for(let m=0;m<=u;m++){for(let _=0;_<=u;_++)p.push(c(d+_*a,h+m*a));yield}const g=new Set,v=Math.max(1,Math.round(a/t)),x=a/v;for(let m=0;m<u;m++,yield)for(let _=0;_<u;_++){const M=[p[m*(u+1)+_],p[m*(u+1)+_+1],p[(m+1)*(u+1)+_],p[(m+1)*(u+1)+_+1]];if(!M.includes(l)||M.every(w=>w===l))continue;const b=[];for(let w=0;w<=v;w++)for(let E=0;E<=v;E++)b.push(c(d+_*a+E*x,h+m*a+w*x));for(let w=0;w<=v;w++)for(let E=0;E<=v;E++){const P=b[w*(v+1)+E],S=d+_*a+E*x,A=h+m*a+w*x;for(const[L,R]of[[1,0],[0,1]]){if(E+L>v||w+R>v)continue;const N=b[(w+R)*(v+1)+E+L];if(P===N||P!==l&&N!==l)continue;const U=S+L*x*.5,D=A+R*x*.5,F=`${Math.round(U*4)},${Math.round(D*4)}`;g.has(F)||(g.add(F),n.push({x:U,z:D,other:P===l?N:P}))}}}}const KM=`
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
}`,$M=`
uniform float uBright;
varying vec3 vColour;
varying vec3 vWorld;
varying float vB;
${ri}
void main() { gl_FragColor = vec4(haze(vColour * vB * uBright, vWorld), 1.0); }`;class ZM{constructor(e,t){this.game=t;const n=t.tuning.borders;this.mesh=new sa(this.geo,new At({vertexShader:KM,fragmentShader:$M,uniforms:{...lt,uWidth:{value:n.width},uSparkle:{value:n.sparkle},uBright:{value:n.brightness}},transparent:!0,depthWrite:!1,blending:_r})),this.mesh.frustumCulled=!1,e.add(this.mesh)}game;areas=new Map;jobs=[];geo=new Gt;stamp="";mesh;update(){const e=this.game,t=e.tuning.borders;if(!t.on){this.mesh.visible=!1;return}for(const[c,l]of e.party.areas){if(this.areas.has(c))continue;const u=e.map.siteOf(l.cell[0],l.cell[1]),d=l.from?e.map.siteOf(l.from[0],l.from[1]):null,h=d?(d.x+u.x)/2:u.x,p=d?(d.z+u.z)/2:u.z,g=e.map.areaSize*1.6,v=e.tuning.party.transition,x=da(vn[e.map.typeOf(l.cell[0],l.cell[1])].creature),m={points:[],colour:new et(x[0]/255,x[1]/255,x[2]/255),on:(_,M)=>l.wave===0?-1:l.at+Math.min(1,Math.hypot(_-h,M-p)/g)*v,done:!1};this.areas.set(c,m),this.jobs.push({key:c,gen:qM(e.map,l.cell,t.step,m.points)})}const n=performance.now()+3;for(;this.jobs.length&&performance.now()<n;){const c=this.jobs[0];c.gen.next().done&&(this.areas.get(c.key).done=!0,this.jobs.shift())}const r=`${e.party.areas.size}|${[...this.areas.values()].filter(c=>c.done).length}`;if(r===this.stamp)return;this.stamp=r;const s=[],a=[],o=[];for(const[,c]of this.areas)if(c.done)for(const l of c.points)l.other!=="edge"&&e.party.areas.has(l.other)||(s.push(l.x,.15,l.z),a.push(c.colour.r,c.colour.g,c.colour.b),o.push(((l.x*12.9898+l.z*78.233)%1+1)%1,c.on(l.x,l.z)));this.geo.setAttribute("position",new Lt(s,3)),this.geo.setAttribute("aColour",new Lt(a,3)),this.geo.setAttribute("aSpark",new Lt(o,2))}}const JM=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,QM=`
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
}`;class jM{constructor(e,t,n,r,s,a,o){this.height=t,this.mat=new At({vertexShader:JM,fragmentShader:QM,uniforms:{...lt,uStrength:{value:e},uWind:{value:n},uPixel:{value:r},uDepth:{value:a},uLow:{value:o}},depthWrite:!1,depthTest:!s,blending:s?Hn:dr}),this.mesh=new Yt(new _n(700,700).rotateX(-Math.PI/2),this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=2}height;mesh;mat;follow(e,t){this.mesh.position.set(e,this.height,t-150)}}const e2=`
attribute vec4 iShadow; // x, z, width, depth (metres)
varying vec2 vLocal;
varying vec3 vWorld;
void main() {
  vLocal = position.xz * 2.0;
  vec3 w = vec3(iShadow.x + position.x * iShadow.z, 0.03, iShadow.y + position.z * iShadow.w);
  vWorld = w;
  gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
}`,t2=`
uniform float uStrength;
varying vec2 vLocal;
varying vec3 vWorld;
${ri}
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
}`;class n2{mesh;geo=new Nl;attr;capacity=0;constructor(e,t=!0){const n=new _n(1,1).rotateX(-Math.PI/2);this.geo.index=n.index,this.geo.setAttribute("position",n.getAttribute("position")),this.attr=this.grow(1024);const r=new At({vertexShader:e2,fragmentShader:t2,uniforms:{...lt,uStrength:{value:e}},depthWrite:!1,...t?{transparent:!0,blending:vl,blendSrc:_l,blendDst:Ml}:{}});this.mesh=new Yt(this.geo,r),this.mesh.frustumCulled=!1,this.mesh.renderOrder=1}grow(e){return this.capacity=Math.max(e,this.capacity*2),this.geo.dispose(),this.attr=new Pl(new Float32Array(this.capacity*4),4),this.attr.setUsage(fr),this.geo.setAttribute("iShadow",this.attr),this.attr}set(e){e.length>this.capacity&&this.grow(e.length);const t=this.attr.array;e.forEach((n,r)=>{t[r*4]=n.x,t[r*4+1]=n.z,t[r*4+2]=n.w,t[r*4+3]=n.d}),this.attr.needsUpdate=!0,this.geo.instanceCount=e.length,this.mesh.visible=e.length>0}}class i2{constructor(e,t,n){this.canvas=e,this.game=t,this.style=n;const r=t.tuning;this.renderer=new K_({canvas:e,antialias:!1,powerPreference:"high-performance",preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.info.autoReset=!1,this.renderer.outputColorSpace=$r,this.mpp=1/(r.artPixelsPerMetre*(2/r.pixelSize)),this.camera=new dn(r.camera.fov,1,1,900),this.post=new xM(this.renderer,r),this.scene.background=new et(723478),lM(n,r.glowReach,this.mpp,r.tone.ambient),lt.uGlowPower.value=r.glowPower,this.assets=new oM(n,t.seed,r.pixelSize),this.ground=new uM(t.map,t.forest,n,this.mpp),this.assets.onFloor=(d,h)=>this.ground.setFloor(d,h);const s=r.canopyShadow;this.ground.setCanopyShadow(s.on?s.strength:0,s.height,s.cover,s.wind),this.shadows=new n2(r.shadows.strength,r.fx==="smooth"),this.shadows.mesh.visible=r.shadows.on,this.scene.add(this.shadows.mesh);const a=r.fx==="smooth";lt.uSmooth.value=a?1:0,r.mist.on&&r.mist.strength>0&&(this.mist=new jM(r.mist.strength,r.mist.height,r.mist.wind,this.mpp,a,this.post.scene.depthTexture,this.post.lowSize),a?(this.post.fxScene=new bc,this.post.fxScene.add(this.mist.mesh)):this.scene.add(this.mist.mesh)),lt.uHazeRange.value.set(r.haze.near,r.haze.far),this.scene.add(this.ground.mesh),this.witchBatch=new rr(this.assets.witch,this.mpp,{unlit:!0,onTop:!0}),this.scene.add(this.witchBatch.mesh),this.stoneBatch=new rr(this.assets.stones,this.mpp),this.scene.add(this.stoneBatch.mesh);const o=t.map.dancefloor,c=[],l=t.tuning.dancefloor.stones;for(let d=0;d<l;d++){const h=d/l*Math.PI*2+.3;c.push({x:o.x+Math.cos(h)*o.radius,y:0,z:o.z+Math.sin(h)*o.radius,frame:this.assets.stones.frames[d%4],flip:d%2===0})}this.stoneBatch.set(c),this.propBatch=new rr(this.assets.props,this.mpp),this.scene.add(this.propBatch.mesh),this.partyView=new EM(this.assets.soundsystems,this.mpp),this.strings=new IM(this.scene,t),this.leashView=new kM(this.scene,t),this.lasers=new YM(this.scene,t),this.borders=new ZM(this.scene,t),this.soundBatch=new rr(this.assets.soundsystems,this.mpp),this.scene.add(this.soundBatch.mesh),this.dancefloor=new yM(t.map,r,an,this.mpp),this.scene.add(this.dancefloor.ball,this.dancefloor.beam,this.dancefloor.motes);const u=r.fx==="smooth"?new At({transparent:!0,depthWrite:!1,blending:vl,blendSrc:_l,blendDst:Ml,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"varying vec2 vUv; void main(){ vec2 p = vUv * 2.0 - 1.0; float r = dot(p, p); if (r > 1.0) discard; gl_FragColor = vec4(vec3(1.0 - 0.75 * (1.0 - r) * (1.0 - r)), 1.0); }"}):new At({transparent:!1,depthWrite:!1,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"varying vec2 vUv; void main(){ vec2 p = vUv * 2.0 - 1.0; if (dot(p, p) > 1.0 || mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0) > 0.5) discard; gl_FragColor = vec4(0.02, 0.02, 0.05, 1.0); }"});this.shadow=new Yt(new _n(1.4,.7).rotateX(-Math.PI/2),u),this.shadow.renderOrder=1,this.scene.add(this.shadow)}canvas;game;style;renderer;scene=new bc;camera;ground;assets;typeBatches=new Map;creatureBatches=new Map;witchBatch;stoneBatch;shadow;mpp;lastBuild={x:1/0,y:1/0,z:1/0,version:-1};post;dancefloor;propBatch;partyView;strings;leashView;lasers;borders;soundBatch;sources=[];forestLights=[];shadows;shadowList=[];mist=null;width=1;height=1;debugCull=!1;ghosts=[];ghostLines=null;now=0;stats={dropped:0,trees:0,bushes:0,creatures:0,batches:0,drawCalls:0,pendingArt:0,pendingGround:0,lights:0};resize(e,t){const n=this.game.tuning.pixelSize;this.width=Math.max(1,Math.ceil(e/n)),this.height=Math.max(1,Math.ceil(t/n));const r=this.post.fullResolution?n:1;this.renderer.setSize(this.width*r,this.height*r,!1),this.post.resize(this.width,this.height,this.width*r,this.height*r),this.canvas.style.width=this.width*n+"px",this.canvas.style.height=this.height*n+"px",this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix(),an.uRes.value.set(this.width,this.height)}async prepare(){this.render(0,!1),this.drawCreatures(),this.ground.fill(this.renderer,this.viewRect(this.game.tuning.haze.near,20),this.game.witch.x,this.game.witch.z,1/0),await this.assets.whenIdle(),this.render(0,!1),this.refresh(!0);for(let e=0;e<vn.length;e++)this.assets.prefetchType(e);for(const e of vn)this.assets.creatureArt(e.creature)}batchFor(e,t,n){let r=e.get(t);return r||(r=n(),r&&(e.set(t,r),this.scene.add(r.mesh))),r}frustum=new na;frustumTo=new na;cullCam=new dn;box=new Er;m4=new Pt;v3=new V;at=new Map;tracks={placed:{now:new Set,before:new Set},moving:{now:new Set,before:new Set}};pops=[];poseCamera(e,t){const n=t.angle*Math.PI/180;e.position.set(t.tx,t.ty+Math.sin(n)*t.distance,t.tz+Math.cos(n)*t.distance),e.up.set(0,1,0),e.lookAt(t.tx,t.ty,t.tz),e.updateMatrixWorld()}updateFrustum(){const e=this.game,t=e.tuning,n=this.camera;n.updateMatrixWorld(),this.m4.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this.frustum.setFromProjectionMatrix(this.m4);const r=Math.max(1,t.camera.zoomSteps),s=e.witch.mode==="rising"||e.witch.mode==="treetop"?1:0,a=dh({...e.camera,zoom:r>1?e.camera.zoomStep/(r-1):0},s,t),o=this.cullCam;o.fov=n.fov,o.aspect=n.aspect,o.near=n.near,o.far=n.far,o.updateProjectionMatrix(),this.poseCamera(o,{...a,ty:Ln(t.groundHeight,t.treetopHeight,s)}),this.m4.multiplyMatrices(o.projectionMatrix,o.matrixWorldInverse),this.frustumTo.setFromProjectionMatrix(this.m4)}viewRect(e,t){const n=this.game.witch,r=[];for(const o of[this.camera,this.cullCam]){const c=o.position,l=e+Math.hypot(c.x-n.x,c.z-n.z)+t;for(const u of[-1,1])for(const d of[-1,1]){const h=this.v3.set(u,d,1).unproject(o).sub(c).normalize();for(const p of[0,25]){let g=h.y<-.001?(p-c.y)/h.y:1/0;g>0||(g=1/0),g=Math.min(g,l),r.push([c.x+h.x*g,c.z+h.z*g])}}r.push([c.x,c.z])}const s=r.map(o=>o[0]),a=r.map(o=>o[1]);return{minX:Math.min(...s)-t,maxX:Math.max(...s)+t,minZ:Math.min(...a)-t,maxZ:Math.max(...a)+t}}inView(e,t,n,r,s){const a=this.game.witch.x,o=this.game.witch.z,c=this.game.tuning.haze.far+s;return(e-a)**2+(t-o)**2>c*c?!1:(this.box.min.set(e-n/2-s,-s,t-r-s),this.box.max.set(e+n/2+s,r+s,t+s),this.frustum.intersectsBox(this.box)||this.frustumTo.intersectsBox(this.box))}inInnerView(e,t,n){const r=this.game.witch,s=this.game.tuning.haze;if(Math.hypot(e-r.x,t-r.z)>s.near+(s.far-s.near)*.6)return!1;for(const a of[0,n*.5,n]){const o=this.v3.set(e,a,t).project(this.camera);if(Math.abs(o.x)<1&&Math.abs(o.y)<1&&o.z<1)return!0}return!1}mark(e,t,n,r,s=""){const a=e==="creature"||e==="prop"?this.tracks.moving:this.tracks.placed,o=e==="creature"?`${e}|${s}`:`${e}|${t.toFixed(1)}|${n.toFixed(1)}|${r.toFixed(1)}|${s}`;return e==="creature"&&this.at.set(o,[t,n,r]),a.now.add(o),!a.before.has(o)}checkPops(e,t=!0){const n=this.tracks[e],r=t&&this.assets.pending===0&&n.before.size>0;if(this.debugCull){for(const s of n.before)if(!n.now.has(s)){const a=this.at.get(s),[,...o]=s.split("|"),[c,l,u]=a??o.map(Number);this.ghosts.push({x:+c,z:+l,h:Math.max(1,+u),until:this.now+1})}}if(r){const s=(a,o)=>{const c=this.at.get(a),[l,...u]=a.split("|"),[d,h,p]=c??u.map(Number);this.inInnerView(+d,+h,+p)&&this.pops.push(`${o} ${l} ${(+d).toFixed(0)},${(+h).toFixed(0)}`)};for(const a of n.now)n.before.has(a)||s(a,"appeared");for(const a of n.before)n.now.has(a)||s(a,"vanished")}n.before=n.now,n.now=new Set}lastPose={distance:0,angle:0,zoomStep:-1,lift:-1};refresh(e=!1){const t=this.game,n=t.tuning,r=this.camera,s=n.viewMargin,a=rc(t),o={x:r.position.x,y:r.position.y,z:r.position.z},c=this.lastPose,l=t.witch.mode==="rising"||t.witch.mode==="treetop"?1:0,u=Math.hypot(o.x-this.lastBuild.x,o.y-this.lastBuild.y,o.z-this.lastBuild.z)>=s/3,d=Math.abs(a.distance-c.distance)>2||Math.abs(a.angle-c.angle)>.5||t.camera.zoomStep!==c.zoomStep||l!==c.lift;if(!e&&!u&&!d&&this.assets.version===this.lastBuild.version)return;this.lastBuild={...o,version:this.assets.version},this.lastPose={distance:a.distance,angle:a.angle,zoomStep:t.camera.zoomStep,lift:l};const h=this.viewRect(n.haze.far,s),p=(h.minX+h.maxX)/2,g=(h.minZ+h.maxZ)/2,v=Math.max(h.maxX-h.minX,h.maxZ-h.minZ)/2,x=[],m=lt.uMoonDir.value,_=-m.x/Math.max(.2,m.y),M=-m.z/Math.max(.2,m.y),b=new Map,w=(L,R)=>{let N=b.get(L);N||b.set(L,N=[]),N.push(R)},E=this.mpp;let P=0,S=0;for(const L of t.forest.treesNear(p,g,v)){const R=this.assets.typeArt(L.type);if(!R||!R.layout.big.length)continue;const N=R.atlas.frames,U=R.layout.big[L.variant%R.layout.big.length],D=N[U.top??U.bot];if(!this.inView(L.x,L.z,D.w*E,D.h*E,s))continue;const F=this.mark("tree",L.x,L.z,D.h*E);w(L.type,{x:L.x,y:0,z:L.z,frame:N[U.bot],flip:L.flip,fresh:F}),U.top!==null&&w(L.type,{x:L.x,y:0,z:L.z,frame:N[U.top],flip:L.flip,top:!0,fresh:F});const z=D.w*E,Y=D.h*E*(U.top===null?.2:.6);n.shadows.trees&&x.push({x:L.x+_*Y,z:L.z+M*Y,w:z*.8,d:z*.45}),P++}const A=(L,R,N)=>{for(const U of R){const D=this.assets.typeArt(U.type);if(!D)continue;const F=N(D.layout);if(!F.length)continue;const z=F[U.variant%F.length],Y=D.atlas.frames,j=Y[z.bot],X=Y[z.top??z.bot];if(!this.inView(U.x,U.z,X.w*E,X.h*E,s))continue;const te=this.mark(L,U.x,U.z,X.h*E);w(U.type,{x:U.x,y:0,z:U.z,frame:j,flip:U.flip,fresh:te}),z.top!==null&&w(U.type,{x:U.x,y:0,z:U.z,frame:Y[z.top],flip:U.flip,top:!0,fresh:te}),x.push({x:U.x,z:U.z,w:j.w*E*.8,d:j.w*E*.3}),S++}};A("small",t.forest.bushesNear(p,g,v),L=>L.small),A("wall",t.forest.wallsNear(p,g,v),L=>L.walls.map(R=>({bot:R,top:null}))),A("setpiece",t.forest.setPiecesNear(p,g,v),L=>L.set===null?[]:[L.set]);for(const[L,R]of this.typeBatches)b.has(L)||R.set([]);for(const[L,R]of b)this.batchFor(this.typeBatches,L,()=>{const U=this.assets.typeArt(L);return U&&new rr(U.atlas,E)})?.set(R);this.checkPops("placed",!e),this.sources=t.forest.lightsNear(t.witch.x,t.witch.z,n.haze.far+s),this.stats.trees=P,this.stats.bushes=S,this.shadowList=x}drawCreatures(e=0){const t=this.game,n=t.tuning.haze.far+20,r=new Map,s=new Map,a=[],o=60/t.tuning.beat.bpm;let c=0;for(const l of t.creatures){if(Math.abs(l.x-t.witch.x)>n||Math.abs(l.z-t.witch.z)>n)continue;const u=l.leashed?this.assets.partyArt(l.species,l.id,da(l.species)):void 0,d=u??this.assets.creatureArt(l.species),h=u?`party-${l.id}`:l.species;if(!d)continue;s.set(h,d);const p=d.atlas.frames[d.frame(l.level,l.moving?Math.floor(l.walk)%2:0,l.away)];if(!this.inView(l.x,l.z,p.w*this.mpp,p.h*this.mpp,4))continue;const g=this.mark("creature",l.x,l.z,p.h*this.mpp,l.id);let v=r.get(h);v||r.set(h,v=[]);const x=(e/o+l.id%4*.25)*Math.PI,m=l.leashed?Math.abs(Math.sin(x))*(l.moving?.15:.4):0,_=l.leashed&&!l.moving?Math.sin(x*.5)*.12:0;v.push({x:l.x+_,y:m,z:l.z,frame:p,flip:l.facing<0,fresh:g}),a.push({x:l.x,z:l.z,w:p.w*this.mpp*.7,d:p.w*this.mpp*.25}),c++}for(const[l,u]of this.creatureBatches)r.has(l)||u.set([]);for(const[l,u]of r)this.batchFor(this.creatureBatches,l,()=>{const h=s.get(l);return h&&new rr(h.atlas,this.mpp)})?.set(u);this.stats.creatures=c,this.game.tuning.shadows.on&&this.shadows.set(this.shadowList.concat(a))}fire=new V(1,.5,.16);runeCyan=new V(.3,.9,1);runeViolet=new V(.75,.45,1);runeGreen=new V(.45,1,.5);updateSources(e){const t=this.assets.props.frames,n=[],r=[];for(const s of this.sources){if(s.kind==="pond")continue;const a=Ye(Math.round(s.x*10),Math.round(s.z*10),7);if(s.kind==="campfire"){const o=.8+.12*Math.sin(e*11+a*40)+.08*Math.sin(e*23.7+a*13);r.push({x:s.x+Math.sin(e*9+a)*.08,y:1.2,z:s.z,reach:this.game.tuning.lights.campfire.reach*s.size,rgb:this.fire,strength:this.game.tuning.lights.campfire.strength*o});const c=t[Math.floor(e*8+a*10)%3];this.inView(s.x,s.z,c.w*this.mpp,c.h*this.mpp,4)&&n.push({x:s.x,y:0,z:s.z,frame:c,flip:a<.5,fresh:this.mark("prop",s.x,s.z,2)})}else{const o=a<.33?1:a<.66?0:2,c=.7+.3*Math.sin(e*.9+a*20),l=t[3+o];r.push({x:s.x,y:2,z:s.z,reach:this.game.tuning.lights.stone.reach*s.size,rgb:[this.runeCyan,this.runeViolet,this.runeGreen][o],strength:this.game.tuning.lights.stone.strength*c}),this.inView(s.x,s.z,l.w*this.mpp,l.h*this.mpp,4)&&n.push({x:s.x,y:0,z:s.z,frame:l,flip:a<.5,fresh:this.mark("prop",s.x,s.z,2.6)})}}this.propBatch.set(n),this.forestLights=r}setLights(e,t,n){const r=Math.min(gr,this.game.tuning.lightBudget),s=e.map(l=>({l,d:Math.hypot(l.x-t,l.z-n)-l.reach})).sort((l,u)=>l.d-u.d).slice(0,r+1),a=s.length>r?s[r].d:1/0,o=lt;let c=0;for(const{l,d:u}of s.slice(0,r)){const d=Math.min(1,Math.max(0,(a-u)/15));o.uLightPos.value[c].set(l.x,l.y,l.z,l.reach),o.uLightCol.value[c].set(l.rgb.x,l.rgb.y,l.rgb.z,l.strength*d),c++}o.uLightCount.value=c,this.stats.lights=c}drawGhosts(e){this.now=e,this.ghosts=this.ghosts.filter(a=>a.until>e),this.ghostLines||(this.ghostLines=new Dl(new Gt,new ou({color:16719904,depthTest:!1})),this.ghostLines.frustumCulled=!1,this.ghostLines.renderOrder=20,this.scene.add(this.ghostLines));const t=an.uRight.value,n=an.uUp.value,r=[];for(const a of this.ghosts){const o=a.h*.4,c=(p,g)=>[a.x+t.x*p*o+n.x*g*a.h,t.y*p*o+n.y*g*a.h,a.z+t.z*p*o+n.z*g*a.h],l=c(-1,0),u=c(1,0),d=c(1,1),h=c(-1,1);r.push(...l,...u,...u,...d,...d,...h,...h,...l,...l,...d)}const s=this.ghostLines.geometry;s.dispose(),s.setAttribute("position",new Lt(r,3)),s.setDrawRange(0,r.length/3),this.ghostLines.visible=r.length>0}render(e,t=!0){const n=this.game,r=n.tuning,s=rc(n),a=s.angle*Math.PI/180,o=2*s.distance*Math.tan(r.camera.fov*Math.PI/360)/this.height,c=new V(0,Math.cos(a),-Math.sin(a)),l=new V(s.tx,s.ty,s.tz),u=l.dot(c),d=l.x;l.addScaledVector(c,Math.round(u/o)*o-u),l.x+=Math.round(d/o)*o-d;const h=new V(0,Math.sin(a),Math.cos(a)).multiplyScalar(s.distance);this.camera.position.copy(l).add(h),this.camera.up.set(0,1,0),this.camera.lookAt(l),this.updateFrustum();const p=r.spriteTilt;an.uUp.value.set(0,1,0).lerp(c,p).normalize(),an.uFacing.value.crossVectors(an.uRight.value,an.uUp.value).normalize();const g=tc(n.witch),v=r.canopyCutout;this.camera.updateMatrixWorld();const x=this.v3.set(n.witch.x,vr(n.witch,r)*.5,n.witch.z).project(this.camera);an.uCutout.value.set((x.x*.5+.5)*this.width,(x.y*.5+.5)*this.height,.5*v.screenFraction*this.width*(1-g),Math.max(1,v.edge*this.width*(1-g))),an.uTopFade.value=g,an.uDebugCull.value=this.debugCull?1:0;const m=n.witch,_=vr(m,r);lt.uGlowPos.value.set(m.x,_+r.glowHeight,m.z),lt.uHazeCentre.value.set(m.x,m.z),this.updateSources(e);const M=this.partyView.update(n,e,(R,N,U,D)=>this.inView(R,N,U,D,4),()=>!1);this.soundBatch.set(M.items),this.ground.setSweeps(M.sweeps),this.lasers.update(e,M.playing,m.x,m.z),this.strings.update(),this.borders.update(),this.setLights([this.dancefloor.update(e,this.ground),...M.lights,...this.forestLights],m.x,m.z),lt.uTime.value=e,this.mist?.follow(s.tx,s.tz);const b=Math.sin(e*2.4)*.12,w=m.mode==="rising"&&m.lift<.9,E=m.mode==="descending"&&m.lift>.1,P=w||E?(w?8:12)+(m.away?2:0)+Math.floor(e*7)%2:m.lean?6+(m.away?1:0):(m.away?3:0)+Math.floor(e*4)%3,S=this.assets.witch.frames[P],A=_+b-.4+S.h*this.mpp;if(this.witchBatch.set([{x:m.x,y:_+b-.4,z:m.z,frame:S,flip:m.facing<0}]),this.shadow.position.set(m.x,.03,m.z),this.shadow.scale.setScalar(1-.5*tc(m)),this.refresh(),this.drawCreatures(e),this.checkPops("moving"),this.leashView.update(e,this.camera,this.canvas.clientWidth||window.innerWidth,this.canvas.clientHeight||window.innerHeight,A),this.assets.work(6),this.stats.pendingGround=this.ground.fill(this.renderer,this.viewRect(r.haze.far,40),m.x,m.z,4),this.stats.pendingArt=this.assets.pending,this.debugCull&&this.drawGhosts(e),!t)return;this.renderer.info.reset(),this.post.render(this.scene,this.camera);let L=0;for(const R of[...this.typeBatches.values(),...this.creatureBatches.values(),this.propBatch,this.soundBatch])L+=R.dropped;L&&!this.stats.dropped&&console.warn(`view: ${L} sprite instances set but not drawn`),this.stats.dropped=L,this.stats.drawCalls=this.renderer.info.render.calls,this.stats.batches=this.typeBatches.size+this.creatureBatches.size}}const r2="The art style: knobs from the Witch Art Lab. Paste a style saved in the Lab here (its whole saved JSON, or just its style object). Any knob left out follows the Lab's current default, so an empty style means the Lab's default look, and stays up to date as the art changes.",s2="Lab default",a2={},o2={_readme:r2,name:s2,style:a2};function l2(i=o2){const e=i??{},t=e.style&&typeof e.style=="object"?e.style:e,n=tM();for(const[r,s]of Object.entries(t))r in n&&(n[r]=s);return n}function c2(i,e){const t=i.querySelector("#stick"),n=t.querySelector(".knob"),r=56;let s=null,a=0,o=0;const c=()=>i.classList.add("touch"),l=i.querySelector("#stick-zone");l.addEventListener("pointerdown",p=>{if(!(p.pointerType==="mouse"||s!==null)){c(),s=p.pointerId,a=p.clientX,o=p.clientY,t.style.left=a+"px",t.style.top=o+"px",t.classList.add("on");try{l.setPointerCapture(p.pointerId)}catch{}p.preventDefault()}}),l.addEventListener("pointermove",p=>{if(p.pointerId!==s)return;let g=p.clientX-a,v=p.clientY-o;const x=Math.hypot(g,v);x>r&&(g*=r/x,v*=r/x),n.style.transform=`translate(${g}px, ${v}px)`;const m=Math.min(1,x/r),_=.15,M=m<_?0:(m-_)/(1-_)/Math.max(1e-6,m);e.x=g/r*M,e.y=v/r*M});const u=p=>{p.pointerId===s&&(s=null,e.x=0,e.y=0,n.style.transform="",t.classList.remove("on"))};l.addEventListener("pointerup",u),l.addEventListener("pointercancel",u);const d=(p,g)=>{const v=i.querySelector(p);v.addEventListener("pointerdown",x=>{x.preventDefault(),x.stopPropagation(),g(),v.classList.add("down")}),v.addEventListener("pointerup",()=>v.classList.remove("down")),v.addEventListener("pointerleave",()=>v.classList.remove("down"))};d("#rise",()=>e.toggle=!0),d("#zoom-in",()=>e.zoom-=1),d("#zoom-out",()=>e.zoom+=1),d("#sigil",()=>e.sigil=!0);const h=i.querySelector("#talk");h.addEventListener("pointerdown",p=>{p.preventDefault(),p.stopPropagation(),e.talk=!0,h.classList.add("down")});for(const p of["pointerup","pointerleave","pointercancel"])h.addEventListener(p,()=>{e.talk=!1,h.classList.remove("down")});window.addEventListener("touchstart",p=>{c(),p.touches.length===3&&(e.debug=!0)},{passive:!0})}const Nn=new URLSearchParams(location.search);let Ni=uf(Nn.get("seed"));Ni===null&&(Ni=Math.floor(Math.random()*1e6),Nn.set("seed",String(Ni)),history.replaceState(null,"","?"+Nn.toString()+location.hash));const mn={...Wi,bloom:{...Wi.bloom},tiltShift:{...Wi.tiltShift},shadows:{...Wi.shadows},canopyShadow:{...Wi.canopyShadow},mist:{...Wi.mist}};Nn.get("shadows")==="off"&&(mn.shadows.on=!1);Nn.get("canopy")==="off"&&(mn.canopyShadow.on=!1);Nn.get("mist")==="off"&&(mn.mist.on=!1);const Ns=Nn.get("tilt");Ns==="off"?mn.tiltShift.on=!1:(Ns==="before"||Ns==="after")&&(mn.tiltShift.on=!0,mn.tiltShift.where=Ns);Nn.get("bloom")==="off"&&(mn.bloom.on=!1);const oo=Nn.get("fx");(oo==="pixel"||oo==="smooth")&&(mn.fx=oo);const jt=Gf(Ni,mn),h2=document.getElementById("game"),lo=l2(),yr=new i2(h2,jt,{...lo,pixel:mn.pixelSize,treeSize:lo.treeSize*mn.treeHeight,crownWidth:lo.crownWidth*mn.crownWidth/mn.treeHeight});yr.debugCull=Nn.get("debug")==="cull";const Rr=new N0;document.getElementById("next-wave").addEventListener("pointerdown",i=>{i.preventDefault(),Rr.touch.nextWave=!0});document.getElementById("pause-waves").addEventListener("pointerdown",i=>{i.preventDefault(),Rr.touch.pauseWaves=!0});c2(document.body,Rr.touch);const yu=document.getElementById("help");try{localStorage.getItem("witch.help")==="off"&&yu.classList.add("off")}catch{}window.addEventListener("keydown",i=>{if(i.code!=="KeyH"||i.repeat)return;const e=yu.classList.toggle("off");try{localStorage.setItem("witch.help",e?"off":"on")}catch{}});document.getElementById("version").textContent="v93 · 76a2597";const u2=document.getElementById("seed");u2.innerHTML=`seed <a href="?seed=${Ni}">${Ni}</a>`;const sl=document.getElementById("debug"),Ul=document.getElementById("start"),wu=document.getElementById("debug-buttons"),Fl=document.getElementById("wave"),d2=Fl.querySelector(".fill"),f2=Fl.querySelector(".label");let Pi=Nn.has("debug");sl.classList.toggle("on",Pi);wu.classList.toggle("on",Pi);const Eu=()=>yr.resize(window.innerWidth,window.innerHeight);window.addEventListener("resize",Eu);Eu();let _a=!1;requestAnimationFrame(()=>setTimeout(async()=>{await yr.prepare(),_a=!0,Ul.classList.remove("loading")},0));let hh=null;function Au(){if(!_a||!jt.clock.paused)return!1;try{hh??=new AudioContext,hh.resume()}catch{}return jt.clock.paused=!1,Ul.style.display="none",Rr.clearPresses(),!0}Rr.onAny=Au;Ul.addEventListener("pointerdown",i=>{i.preventDefault(),Au()});document.addEventListener("visibilitychange",()=>{document.hidden&&(Ks=0)});let Ks=0,uh=60,co=0,Us=0;function Tu(i){requestAnimationFrame(Tu);const e=Ks?(i-Ks)/1e3:0;Ks=i,co++,Us+=e,Us>=.5&&(uh=co/Us,co=0,Us=0);const t=Rr.read();if(t.debug&&(Pi=!Pi,sl.classList.toggle("on",Pi),wu.classList.toggle("on",Pi)),Hf(jt,t,e),!_a)return;const n=kf(jt.party,jt.map,jt.clock.time);if(d2.style.height=`${(1-n.gone)*100}%`,f2.textContent=`wave ${jt.party.wave} · ${jt.party.areas.size} areas · ${Math.ceil(n.left)} s`,Fl.classList.toggle("paused",jt.party.paused),yr.render(jt.clock.time),Pi){const r=jt.witch,s=yr.stats;sl.textContent=[`fps    ${uh.toFixed(0)}`,`seed   ${Ni}`,`area   ${Uh(jt)}`,`mode   ${r.mode}`,`at     ${r.x.toFixed(0)}, ${r.z.toFixed(0)} m   zoom ${jt.camera.zoomStep}`,`trees  ${s.trees}  bushes ${s.bushes}  creatures ${s.creatures}`,`draws  ${s.drawCalls}  art queued ${s.pendingArt}  ground tiles ${s.pendingGround}`].join(`
`)}}requestAnimationFrame(Tu);window.witch={game:jt,view:yr,areaUnderWitch:()=>Uh(jt),areaTypeId:i=>vn[i].id,get ready(){return _a}};
