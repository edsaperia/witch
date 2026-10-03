(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();function di(i){let e=i>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function Xe(i,e,t){let n=Math.imul(i|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967296}function ua(i,e,t){const n=Math.floor(i),r=Math.floor(e),s=i-n,a=e-r,o=s*s*(3-2*s),c=a*a*(3-2*a),l=Xe(n,r,t),h=Xe(n+1,r,t),f=Xe(n,r+1,t),u=Xe(n+1,r+1,t);return l+(h-l)*o+(f-l)*c+(l-h-f+u)*o*c}const Tn=(i,e,t)=>i+(e-i)*t,pi=(i,e,t)=>Math.min(t,Math.max(e,i)),hn=i=>{const e=pi(i,0,1);return e*e*(3-2*e)};function gh(i,e,t,n){const r=Math.max(1,i.camera.zoomSteps),s=pi(Math.round(i.camera.startZoom),0,r-1),a=r>1?s/(r-1):0;return{zoomStep:s,zoom:a,tx:e,ty:t,tz:n,vx:0,vy:0,vz:0,ax:0,az:0,lift:0}}function ha(i,e,t,n,r){const s=n*r,a=Math.exp(-s),o=i-t,c=e+n*o;return[t+(o+c*r)*a,(e-n*c*r)*a]}function xh(i,e,t,n,r,s,a){const o=a.camera,c=Math.max(1,o.zoomSteps),l=pi(i.zoomStep+Math.sign(e),0,c-1),h=c>1?l/(c-1):0;let f=n.x*o.lookAhead,u=n.z*o.lookAhead;const d=Math.hypot(f,u);d>o.lookAheadMax&&(f*=o.lookAheadMax/d,u*=o.lookAheadMax/d);const x=1-Math.exp(-o.lookAheadEase*s),g=i.ax+(f-i.ax)*x,m=i.az+(u-i.az)*x,[p,_]=ha(i.tx,i.vx,t.x+g,o.follow,s),[S,b]=ha(i.ty,i.vy,t.y,o.follow,s),[w,E]=ha(i.tz,i.vz,t.z+m,o.follow,s),L=i.zoom+(h-i.zoom)*(1-Math.exp(-o.zoomEase*s)),M=i.lift+(r-i.lift)*(1-Math.exp(-o.liftEase*s));return{zoomStep:l,zoom:L,tx:p,ty:S,tz:w,vx:_,vy:b,vz:E,ax:g,az:m,lift:pi(M,0,1)}}function Jc(i,e,t){const n=t.camera.ground,r=t.camera.treetop,s=hn(e),a=Tn(Tn(n.angleIn,n.angleOut,i.zoom),Tn(r.angleIn,r.angleOut,i.zoom),s),o=Tn(Tn(n.distanceIn,n.distanceOut,i.zoom),Tn(r.distanceIn,r.distanceOut,i.zoom),s),c=a*Math.PI/180;return{angle:a,distance:o,x:i.tx,y:i.ty+Math.sin(c)*o,z:i.tz+Math.cos(c)*o,tx:i.tx,ty:i.ty,tz:i.tz}}const vh=.1,_h=()=>({time:0,paused:!0});function Mh(i,e){if(i.paused||!(e>0))return 0;const t=Math.min(vh,e);return i.time+=t,t}const Sh={moor:{treeDensity:.65},"fern-forest":{treeDensity:1},"muddy-forest":{treeDensity:1},"stone-shrine":{treeDensity:.6},"tangly-forest":{treeDensity:1},"wispy-forest":{treeDensity:1},"hazel-forest":{treeDensity:1},garden:{treeDensity:.75},"twiggy-forest":{treeDensity:1},ancient:{treeDensity:.9},norway:{treeDensity:1},"alder-forest":{treeDensity:.9},meadow:{treeDensity:.55},"old-oaks":{treeDensity:.9},"berry-thicket":{treeDensity:1},wetland:{treeDensity:.75},stream:{treeDensity:.8},"rocky-slope":{treeDensity:.75},bog:{treeDensity:.7},deadwood:{treeDensity:.8},"cave-mouth":{treeDensity:.75},grassland:{treeDensity:.55},"beaver-pond":{treeDensity:.8},"log-pile":{treeDensity:.7},heath:{treeDensity:.65},"old-pinewood":{treeDensity:1},ravine:{treeDensity:.75},"bluebell-glade":{treeDensity:.8},"holly-thicket":{treeDensity:1},"honeysuckle-tangle":{treeDensity:1}},yh={types:Sh};function Zo(i,e){if(typeof document<"u"){const t=document.createElement("canvas");return t.width=i,t.height=e,t}return new OffscreenCanvas(i,e)}function Zs(i){let e=i>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}const ye=(i,e,t)=>e+(t-e)*i(),Qc=(i,e)=>e[Math.floor(i()*e.length)];function Et(i,e,t){let n=Math.imul(i|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967296}function ui(i,e,t){const n=Math.floor(i),r=Math.floor(e),s=i-n,a=e-r,o=s*s*(3-2*s),c=a*a*(3-2*a),l=Et(n,r,t),h=Et(n+1,r,t),f=Et(n,r+1,t),u=Et(n+1,r+1,t);return l+(h-l)*o+(f-l)*c+(l-h-f+u)*o*c}function we(i,e,t){i=(i%1+1)%1,e=Math.max(0,Math.min(1,e)),t=Math.max(0,Math.min(1,t));const n=Math.floor(i*6),r=i*6-n,s=t*(1-e),a=t*(1-r*e),o=t*(1-(1-r)*e),[c,l,h]=[[t,o,s],[a,t,s],[s,t,o],[s,a,t],[o,s,t],[t,s,a]][n%6];return[Math.round(c*255),Math.round(l*255),Math.round(h*255)]}const v={BODY:1,BELLY:2,ACCENT:3,EYE:4,GLINT:5,TRUNK:6,LEAF:7,LEAF2:8,SKIN:10,HAIR:11,BROOM:12,STRAW:13,BODY2:14,BARK2:15,FLOWER:16,PUPIL:17,MAGIC:18,BARKD:19,LINE:20,IRIS:21,MAGIC2:22,NOSE:23,EAR:24,BODY3:25,LEAF3:26,BARKL:27,HAT:28,PHONES:29,TOP:30,JACKET:31,JEANS:32,SHOES:33,WATER:34,STONE:35,STONED:36,MOSS:37,CRYSTAL:38,RUNE:39,GLOW:40,WOOD:41,COLLAR:42,HAT1:43,HAT2:44,POM:45,SHADES:46,FRAME:47,SHOE:48,SOLE:49,WOKEN:50,WEB:51},fa=4;function jc(i,e,t,n=.12){const r=(s,a,o,c)=>{const l=o-s,h=c-a,f=Math.max(0,Math.min(1,((i-s)*l+(e-a)*h)/(l*l+h*h)));return Math.hypot(i-s-l*f,e-a-h*f)<n};switch((t%fa+fa)%fa){case 0:return r(.5,.08,.5,.92)||r(.5,.1,.18,.4)||r(.5,.1,.82,.4);case 1:return r(.5,.08,.5,.92)||r(.5,.5,.18,.18)||r(.5,.5,.82,.18);case 2:return r(.2,.1,.8,.9)||r(.8,.1,.2,.9)||r(.5,.08,.5,.92);default:return r(.3,.08,.3,.92)||r(.3,.12,.75,.35)||r(.75,.35,.3,.55)||r(.3,.55,.78,.92)}}const bh=new Set([v.GLINT,v.MAGIC,v.MAGIC2,v.RUNE,v.GLOW,v.COLLAR,v.WOKEN]);function Dl(i,e=!0,t=8){const n=i.length,r=[];if(n<3)return i.slice();const s=o=>e?i[(o+n)%n]:i[Math.max(0,Math.min(n-1,o))],a=e?n:n-1;for(let o=0;o<a;o++){const c=s(o-1),l=s(o),h=s(o+1),f=s(o+2),u=Math.max(2,Math.ceil(Math.hypot(h[0]-l[0],h[1]-l[1])/1.5),t);for(let d=0;d<u;d++){const x=d/u,g=x*x,m=g*x;r.push([0,1].map(p=>.5*(2*l[p]+(-c[p]+h[p])*x+(2*c[p]-5*l[p]+4*h[p]-f[p])*g+(-c[p]+3*l[p]-3*h[p]+f[p])*m)))}}return e||r.push(i[n-1]),r}function wh(i,{cap:e=1,capEnd:t=e}={}){const n=[],r=[],s=i.length;for(let c=0;c<s;c++){const l=i[Math.max(0,c-1)],h=i[Math.min(s-1,c+1)];let f=h[0]-l[0],u=h[1]-l[1];const d=Math.hypot(f,u)||1;f/=d,u/=d;const x=i[c][2]/2;n.push([i[c][0]-u*x,i[c][1]+f*x]),r.push([i[c][0]+u*x,i[c][1]-f*x])}const a=(c,l,h,f)=>{let u=c[0]-l[0],d=c[1]-l[1];const x=Math.hypot(u,d)||1;return[c[0]+u/x*h/2*f,c[1]+d/x*h/2*f]};return[...n,a(i[s-1],i[s-2],i[s-1][2],t),...r.reverse(),a(i[0],i[1],i[0][2],e)]}const bt=(i,e)=>[i[0]+e[0],i[1]+e[1]],Zn=(i,e,t)=>[i[0]+(e[0]-i[0])*t,i[1]+(e[1]-i[1])*t];function Js(i,e,t,n,r,s=1){const a=[];for(let o=0;o<i.length;o++){if(a.push(i[o]),o<e||o>=t)continue;const c=i[o],l=i[(o+1)%i.length];let h=l[0]-c[0],f=l[1]-c[1];const u=Math.hypot(h,f)||1,d=f/u*s,x=-h/u*s;for(let g=1;g<=n;g++){const m=(g-.5)/n,p=Zn(c,l,m),_=[p[0]+d*r-h/u*r*.5,p[1]+x*r-f/u*r*.5];a.push(Zn(c,l,m-.45/n),_,Zn(c,l,m+.35/n))}}return a}function Il(i,e,t){const n=new Uint8Array(i*e);let r=1/0,s=-1/0;for(const a of t)r=Math.min(r,a[1]),s=Math.max(s,a[1]);for(let a=Math.max(0,Math.floor(r));a<=Math.min(e-1,Math.ceil(s));a++){const o=a+.5,c=[];for(let l=0,h=t.length-1;l<t.length;h=l++){const[f,u]=t[l],[d,x]=t[h];u>o!=x>o&&c.push(f+(o-u)/(x-u)*(d-f))}c.sort((l,h)=>l-h);for(let l=0;l+1<c.length;l+=2)for(let h=Math.max(0,Math.ceil(c[l]-.5));h<=Math.min(i-1,Math.floor(c[l+1]-.5));h++)n[a*i+h]=1}return n}function Eh(i,e,t){const r=new Float32Array(i*e),s=new Float32Array(i*e);for(let c=0;c<i*e;c++)t[c]&&(r[c]=1e4,s[c]=1e4);const a=c=>r[c]*r[c]+s[c]*s[c],o=(c,l,h,f,u)=>{const d=l+f,x=h+u;let g,m;if(d<0||x<0||d>=i||x>=e)g=f,m=u;else{const p=x*i+d;g=r[p]+f,m=s[p]+u}g*g+m*m<a(c)&&(r[c]=g,s[c]=m)};for(let c=0;c<e;c++){for(let l=0;l<i;l++){const h=c*i+l;t[h]&&(o(h,l,c,-1,0),o(h,l,c,0,-1),o(h,l,c,-1,-1),o(h,l,c,1,-1))}for(let l=i-1;l>=0;l--){const h=c*i+l;t[h]&&o(h,l,c,1,0)}}for(let c=e-1;c>=0;c--){for(let l=i-1;l>=0;l--){const h=c*i+l;t[h]&&(o(h,l,c,1,0),o(h,l,c,0,1),o(h,l,c,1,1),o(h,l,c,-1,1))}for(let l=0;l<i;l++){const h=c*i+l;t[h]&&o(h,l,c,-1,0)}}return{vx:r,vy:s}}class nn{constructor(e,t,n=1){this.sx=n,this.w=Math.round(e*n),this.h=t|0,this.m=new Uint8Array(this.w*this.h),this.n=new Float32Array(this.w*this.h*3),this.g=new Uint8Array(this.w*this.h)}inb(e,t){return e>=0&&t>=0&&e<this.w&&t<this.h}get(e,t){return e|=0,t|=0,this.inb(e,t)?this.m[t*this.w+e]:0}put(e,t,n,r=0,s=0,a=1){this.px(e*this.sx,t,n,r,s,a)}px(e,t,n,r=0,s=0,a=1){if(e=Math.floor(e),t=Math.floor(t),!this.inb(e,t))return;const o=t*this.w+e;this.m[o]=n,this.n[o*3]=r,this.n[o*3+1]=s,this.n[o*3+2]=a}recolour(e,t,n){e=Math.floor(e),t=Math.floor(t),this.inb(e,t)&&this.m[t*this.w+e]&&(this.m[t*this.w+e]=n)}ellipse(e,t,n,r,s,a={}){const{onlyOn:o,density:c=1,noise:l=0,seed:h=0,round:f=1}=a;e*=this.sx,n*=this.sx;for(let u=Math.max(0,Math.floor(t-r-1));u<Math.min(this.h,t+r+1);u++)for(let d=Math.max(0,Math.floor(e-n-1));d<Math.min(this.w,e+n+1);d++){const x=(d+.5-e)/n,g=(u+.5-t)/r,m=x*x+g*g;if(m>1)continue;const p=u*this.w+d;if(o&&!o.has(this.m[p]))continue;if(c<1){const w=l?ui(d/3.2,u/3.2,h)*l+(1-l)*.5:.5;if(Et(d,u,h+77)>c*(.4+w*1.2)*(1.15-m*.5))continue}const _=x*f,S=g*f,b=Math.hypot(_,S,Math.sqrt(Math.max(0,1-m))+.15);this.px(d,u,s,_/b,S/b,(Math.sqrt(Math.max(0,1-m))+.15)/b)}}line(e,t,n,r,s,a,o,c=1){e*=this.sx,n*=this.sx;const l=Math.max(1,Math.ceil(Math.hypot(n-e,r-t)));for(let h=0;h<=l;h++){const f=h/l,u=e+(n-e)*f,d=t+(r-t)*f,x=Math.max(.5,(s+(a-s)*f)/2);for(let g=Math.floor(d-x);g<=d+x;g++)for(let m=Math.floor(u-x);m<=u+x;m++){const p=(m+.5-u)/x,_=(g+.5-d)/x;if(p*p+_*_>1)continue;const S=p*c,b=Math.hypot(S,_*.3,1);this.px(m,g,o,S/b,_*.3/b,1/b)}}}tri(e,t){let[[n,r],[s,a],[o,c]]=e;n*=this.sx,s*=this.sx,o*=this.sx;const l=(x,g,m,p,_,S)=>(x-_)*(p-S)-(m-_)*(g-S),h=Math.max(0,Math.floor(Math.min(n,s,o))),f=Math.min(this.w,Math.ceil(Math.max(n,s,o))),u=Math.max(0,Math.floor(Math.min(r,a,c))),d=Math.min(this.h,Math.ceil(Math.max(r,a,c)));for(let x=u;x<d;x++)for(let g=h;g<f;g++){const m=g+.5,p=x+.5,_=l(m,p,n,r,s,a),S=l(m,p,s,a,o,c),b=l(m,p,o,c,n,r);(_<0||S<0||b<0)&&(_>0||S>0||b>0)||this.px(g,x,t,0,-.2,.98)}}shape(e,t,n={}){return this.fillMask(Il(this.w,this.h,Dl(e,!0,n.per||6)),t,n)}limb(e,t,n={}){return this.shape(wh(e,n),t,n)}fillMask(e,t,{group:n=1,line:r=!1,depth:s=0,round:a=1,onlyOn:o=null,keepNormals:c=!1,tilt:l=[0,0],lineMat:h=v.LINE}={}){const{w:f,h:u}=this;if(o)for(let m=0;m<f*u;m++)e[m]&&!o.has(this.m[m])&&(e[m]=0);const{vx:d,vy:x}=Eh(f,u,e);let g=s;if(!g){for(let m=0;m<f*u;m++)e[m]&&(g=Math.max(g,Math.hypot(d[m],x[m])));g=Math.max(1.5,Math.min(g*.9,2.5+g*.35))}for(let m=0;m<u;m++)for(let p=0;p<f;p++){const _=m*f+p;if(!e[_])continue;if(c){this.m[_]=t;continue}const S=Math.hypot(d[_],x[_]),b=Math.min(1,Math.max(0,(S-.5)/g)),w=Math.min(2.6,(1-b)/Math.sqrt(Math.max(.02,1-(1-b)*(1-b))))*a;let E=d[_]/(S||1)*w+l[0],L=x[_]/(S||1)*w+l[1];const M=Math.hypot(E,L,1);this.m[_]=t,this.n[_*3]=E/M,this.n[_*3+1]=L/M,this.n[_*3+2]=1/M}if(r&&!c){const m=[];for(let p=0;p<u;p++)for(let _=0;_<f;_++){const S=p*f+_;if(e[S])for(const[b,w]of[[1,0],[-1,0],[0,1],[0,-1]]){const E=_+b,L=p+w;if(E<0||L<0||E>=f||L>=u)continue;const M=L*f+E;if(!e[M]&&this.m[M]&&this.g[M]!==n&&this.m[M]!==h){m.push(S);break}}}for(const p of m)this.m[p]=h}if(!c)for(let m=0;m<f*u;m++)e[m]&&(this.g[m]=n);return e}mark(e,t,n,r={}){return this.fillMask(Il(this.w,this.h,Dl(e,!0,6)),t,{...r,onlyOn:new Set(n),keepNormals:!0})}grid(e,t,n=0,r=0,{round:s=1,flipX:a=!1}={}){const o=Math.max(...e.map(h=>h.length)),c=new Uint8Array(this.w*this.h),l=new Map;e.forEach((h,f)=>[...h].forEach((u,d)=>{const x=t[u];if(!x)return;const g=n+(a?o-1-d:d),m=r+f;this.inb(g,m)&&(c[m*this.w+g]=1,l.set(m*this.w+g,x))})),this.fillMask(c,v.BODY,{round:s,depth:2.5});for(const[h,f]of l)this.m[h]=f}}function hi(i,e,t,n=t.outline,r=Zo){const{w:s,h:a}=i,o=()=>r(s,a),c=o(),l=o(),h=o(),f=c.getContext("2d").createImageData(s,a),u=l.getContext("2d").createImageData(s,a),d=h.getContext("2d").createImageData(s,a),x=n==="none"?null:n==="dark"?[22,18,30]:"tint";for(let g=0;g<a;g++)for(let m=0;m<s;m++){const p=g*s+m,_=i.m[p],S=p*4;if(!_){if(!x)continue;const M=[i.get(m+1,g),i.get(m-1,g),i.get(m,g+1),i.get(m,g-1)].find(A=>A);if(!M)continue;const C=x==="tint"?(e[M]||[0,0,0]).map(A=>A*.35|0):x;f.data.set([...C,255],S),u.data.set([128,128,255,255],S),d.data.set([128,128,255,255],S);continue}let b=e[_];_===v.LINE&&!b&&(b=x==="tint"||!x?(e[v.BODY2]||[0,0,0]).map(M=>M*.55|0):x),b=b||[255,0,255],f.data.set([...b,bh.has(_)?254:255],S);const w=i.n[p*3],E=i.n[p*3+1],L=i.n[p*3+2];u.data.set([w*127+128,E*127+128,L*255,255],S),d.data.set([-w*127+128,E*127+128,L*255,255],S)}return c.getContext("2d").putImageData(f,0,0),l.getContext("2d").putImageData(u,0,0),h.getContext("2d").putImageData(d,0,0),{A:c,N:l,NF:h,w:s,h:a}}const fi=i=>{const e=Math.hypot(i[0],i[1],i[2])||1;return[i[0]/e,i[1]/e,i[2]/e]},Br=(i,e)=>[i[1]*e[2]-i[2]*e[1],i[2]*e[0]-i[0]*e[2],i[0]*e[1]-i[1]*e[0]],Pt=(i,e)=>i[0]*e[0]+i[1]*e[1]+i[2]*e[2],vn=(i,e)=>[i[0]-e[0],i[1]-e[1],i[2]-e[2]],z={add:(i,e)=>[i[0]+e[0],i[1]+e[1],i[2]+e[2]],sub:vn,mul:(i,e)=>[i[0]*e,i[1]*e,i[2]*e],lerp:(i,e,t)=>[i[0]+(e[0]-i[0])*t,i[1]+(e[1]-i[1])*t,i[2]+(e[2]-i[2])*t],norm:fi,cross:Br,dot:Pt};function Ul(i,e=[0,1,0]){const t=fi(i);let n=Br(e,t);Math.hypot(...n)<1e-4&&(n=Br([0,0,1],t)),n=fi(n);const r=Br(t,n);return[t,r,n]}function eu(i,e){const t=Pt(i,e.axes[0]),n=Pt(i,e.axes[1]),r=Pt(i,e.axes[2]),[s,a,o]=e.r,c=Math.hypot(t/s,n/a,r/o),l=Math.hypot(t/(s*s),n/(a*a),r/(o*o));return l>1e-9?c*(c-1)/l:-Math.min(s,a,o)}function tu(i,e){const{ba:t,l2:n,rr:r,a2:s,il2:a,r1:o,r2:c}=e,l=Pt(i,t),h=l-n,f=[i[0]*n-t[0]*l,i[1]*n-t[1]*l,i[2]*n-t[2]*l],u=Pt(f,f),d=l*l*n,x=h*h*n,g=Math.sign(r)*r*r*u;return Math.sign(h)*s*x>g?Math.sqrt(u+x)*a-c:Math.sign(l)*s*d<g?Math.sqrt(u+d)*a-o:(Math.sqrt(u*s*a)+l*r)*a-o}function nu(i,e){const t=Math.abs(Pt(i,e.axes[0]))-e.h[0]+e.round,n=Math.abs(Pt(i,e.axes[1]))-e.h[1]+e.round,r=Math.abs(Pt(i,e.axes[2]))-e.h[2]+e.round;return Math.hypot(Math.max(t,0),Math.max(n,0),Math.max(r,0))+Math.min(Math.max(t,n,r),0)-e.round}const Th=(i,e)=>e*(Math.sin(i[0]*23+i[1]*7)*Math.sin(i[1]*19-i[2]*11)+.5*Math.sin(i[2]*41+i[0]*29)),Nl=(i,e)=>i.type==="ell"?eu(vn(e,i.cw),i):i.type==="box"?nu(vn(e,i.cw),i):tu(vn(e,i.aw),i),br=(i,e)=>i.rough?Nl(i,e)+Th(e,i.rough):Nl(i,e);class et{constructor({blend:e=.07}={}){this.parts=[],this.flats=[],this.blend=e,this.anchors={feet:[]}}ell(e,t,n,r={}){const s=r.axes||(r.dir?Ul(r.dir,r.up):[[1,0,0],[0,1,0],[0,0,1]]);return this.parts.push({type:"ell",c:e,r:t,axes:s,mat:n,group:r.group??1,extra:!!r.extra,paint:r.paint,rough:r.rough,cut:!!r.cut}),this}box(e,t,n,r={}){const s=r.axes||(r.dir?Ul(r.dir,r.up):[[1,0,0],[0,1,0],[0,0,1]]);return this.parts.push({type:"box",c:e,h:t,round:Math.min(r.round??.02,...t),axes:s,mat:n,group:r.group??1,extra:!!r.extra,paint:r.paint,rough:r.rough,cut:!!r.cut}),this}seg(e,t,n,r,s,a={}){return this.parts.push({type:"cone",a:e,b:t,r1:n,r2:r,mat:s,group:a.group??1,extra:!!a.extra,paint:a.paint,rough:a.rough,cut:!!a.cut}),this}chain(e,t,n={}){for(let r=0;r+1<e.length;r++)this.seg(e[r].slice(0,3),e[r+1].slice(0,3),e[r][3],e[r+1][3],t,n);return this}flat(e,t,n,r,s,a,o={}){return this.flats.push({c:e,u:fi(t),v:fi(n),su:r,sv:s,mask:a,group:o.group??30,extra:!!o.extra,bend:o.bend??.35}),this}field(e){let t=1/0;for(const n of this.parts){if(n.extra||n.cut)continue;let r;if(n.type==="ell")r=eu(vn(e,n.c),n);else if(n.type==="box")r=nu(vn(e,n.c),n);else{const s=vn(n.b,n.a),a=Math.max(1e-9,Pt(s,s)),o=n.r1-n.r2;r=tu(vn(e,n.a),{ba:s,l2:a,rr:o,a2:a-o*o,il2:1/a,r1:n.r1,r2:n.r2})}r<t&&(t=r)}return t}static surface(e,t,n){const r=1/Math.hypot(n[0]/t[0],n[1]/t[1],n[2]/t[2]);return[e[0]+n[0]*r,e[1]+n[1]*r,e[2]+n[2]*r]}}const Fl={towards:.6,away:-.6},Ah=.52;function _n(i,{height:e,scale:t,facing:n="towards",yaw:r=Fl[n]??Fl.towards,pitch:s=Ah,lineGap:a=.12}={}){const o=Math.cos(r),c=Math.sin(r),l=Math.cos(s),h=Math.sin(s),f=I=>[I[0]*o-I[2]*c,I[1],I[0]*c+I[2]*o],u=I=>[I[0]*o+I[2]*c,I[1],-I[0]*c+I[2]*o],d=[0,-h,-l],x=[0,l,-h],g=[1,0,0],m=[0,h,l],p=i.blend,_=i.parts.map(I=>{if(I.type==="ell"){const ze=f(I.c),Ne=I.axes.map(f),Je=Math.max(...I.r);return{...I,cw:ze,axes:Ne,bc:ze,br:Je+(I.rough||0)*1.5}}if(I.type==="box"){const ze=f(I.c),Ne=I.axes.map(f);return{...I,cw:ze,axes:Ne,bc:ze,br:Math.hypot(...I.h)+(I.rough||0)*1.5}}const K=f(I.a),se=f(I.b),ve=vn(se,K),ce=Math.max(1e-9,Pt(ve,ve)),Te=I.r1-I.r2;return{...I,aw:K,ba:ve,l2:ce,rr:Te,a2:ce-Te*Te,il2:1/ce,bc:z.lerp(K,se,.5),br:Math.sqrt(ce)/2+Math.max(I.r1,I.r2)}}),S=i.flats.map(I=>{const K=f(I.c),se=f(I.u),ve=f(I.v);return{...I,cw:K,uw:se,vw:ve,nw:fi(Br(se,ve)),bc:K,br:Math.hypot(I.su,I.sv)}}),b=[..._,...S],w=I=>{const K=Pt(I.bc,g),se=Pt(I.bc,x),ve=I.br+(I.uw?0:p);return[K-ve,K+ve,se-ve,se+ve]};for(const I of b)[I.x0,I.x1,I.u0,I.u1]=w(I);const E=b.filter(I=>!I.extra&&!I.cut),L=Math.min(...E.map(I=>I.u0+(I.uw?0:p))),M=Math.max(...E.map(I=>I.u1-(I.uw?0:p))),C=t??e/Math.max(1e-6,M-L),A=Math.min(...b.map(I=>I.x0)),P=Math.max(...b.map(I=>I.x1)),F=Math.min(...b.map(I=>I.u0)),U=Math.max(...b.map(I=>I.u1)),D=Math.ceil((P-A)*C)+4,O=Math.ceil((U-F)*C)+2,k=new nn(D,O),Y=new Float32Array(D*O).fill(1/0),j=new Int16Array(D*O).fill(-1),X=8,te=Math.ceil(D/X),N=Math.ceil(O/X),re=Array.from({length:te*N},()=>[]);b.forEach((I,K)=>{const se=Math.max(0,Math.floor((I.x0-A)*C/X)),ve=Math.min(te-1,Math.floor(((I.x1-A)*C+2)/X)),ce=Math.max(0,Math.floor((U-I.u1)*C/X)),Te=Math.min(N-1,Math.floor(((U-I.u0)*C+1)/X));for(let ze=ce;ze<=Te;ze++)for(let Ne=se;Ne<=ve;Ne++)re[ze*te+Ne].push(K)});const oe=.25/C,Se=(I,K)=>{const se=Math.max(p-Math.abs(I-K),0)/p;return Math.min(I,K)-se*se*p*.25};for(let I=0;I<O;I++)for(let K=0;K<D;K++){const se=re[Math.floor(I/X)*te+Math.floor(K/X)];if(!se.length)continue;const ve=A+(K+.5-1)/C,ce=U-(I+.5)/C,Te=z.add(z.add(z.mul(g,ve),z.mul(x,ce)),z.mul(m,50));let ze=1/0,Ne=-1/0;const Je=[],dt=[];for(const Ve of se){const B=b[Ve],pt=vn(Te,B.bc),ke=Pt(pt,d),R=B.br+(B.uw?0:p),y=Pt(pt,pt)-R*R,V=ke*ke-y;if(V<0)continue;if(B.uw){dt.push(B);continue}if(B.cut){Je.push(B);continue}const q=Math.sqrt(V);ze=Math.min(ze,-ke-q),Ne=Math.max(Ne,-ke+q),Je.push(B)}let Ke=1/0,gt=-1,Ct=0,It=null;if(Je.length){const Ve=new Map;for(const ke of Je){let R=Ve.get(ke.group);R||Ve.set(ke.group,R=[]),R.push(ke)}const B=(ke,R)=>{let y=1/0;for(const V of ke)V.cut||(y=y===1/0?br(V,R):Se(y,br(V,R)));for(const V of ke)V.cut&&(y=Math.max(y,-br(V,R)));return y};let pt=Math.max(0,ze);for(let ke=0;ke<96&&pt<Ne;ke++){const R=z.add(Te,z.mul(d,pt));let y=1/0,V=null;for(const[q,Q]of Ve){const le=B(Q,R);le<y&&(y=le,V=q)}if(y<oe){const q=Ve.get(V),Q=.5/C;It=fi([B(q,[R[0]+Q,R[1],R[2]])-B(q,[R[0]-Q,R[1],R[2]]),B(q,[R[0],R[1]+Q,R[2]])-B(q,[R[0],R[1]-Q,R[2]]),B(q,[R[0],R[1],R[2]+Q])-B(q,[R[0],R[1],R[2]-Q])]);let le=q[0],ue=1/0;for(const ee of q){if(ee.cut)continue;const ne=br(ee,R);ne<ue&&(ue=ne,le=ee)}for(const ee of q)if(ee.cut&&-br(ee,R)>ue-oe*2){le=ee;break}Ke=pt,gt=V,Ct=le.paint?le.paint(u(R),le)??le.mat:le.mat;break}pt+=Math.max(y*.9,oe*.5)}}for(const Ve of dt){const B=Pt(d,Ve.nw);if(Math.abs(B)<1e-4)continue;const pt=Pt(vn(Ve.cw,Te),Ve.nw)/B;if(pt>=Ke)continue;const ke=z.add(Te,z.mul(d,pt)),R=vn(ke,Ve.cw),y=Pt(R,Ve.uw)/Ve.su,V=Pt(R,Ve.vw)/Ve.sv;if(Math.abs(y)>1||Math.abs(V)>1)continue;const q=Ve.mask(y,V);if(!q)continue;let Q=B>0?z.mul(Ve.nw,-1):Ve.nw;Q=fi(z.add(Q,z.add(z.mul(Ve.uw,y*Ve.bend),z.mul(Ve.vw,V*Ve.bend*.5)))),Ke=pt,gt=Ve.group,Ct=q,It=Q}if(!It||!Ct)continue;const Mt=I*D+K;Y[Mt]=Ke,j[Mt]=gt,k.px(K,I,Ct,Pt(It,g),-Pt(It,x),Pt(It,m))}const Ue=[];for(let I=0;I<O;I++)for(let K=0;K<D;K++){const se=I*D+K;if(k.m[se])for(const[ve,ce]of[[1,0],[-1,0],[0,1],[0,-1]]){const Te=K+ve,ze=I+ce;if(Te<0||ze<0||Te>=D||ze>=O)continue;const Ne=ze*D+Te;if(k.m[Ne]&&j[Ne]!==j[se]&&Y[Ne]-Y[se]>a){Ue.push(se);break}}}for(const I of Ue)[v.EYE,v.GLINT,v.MAGIC,v.MAGIC2,v.NOSE,v.COLLAR,v.WOKEN,v.RUNE,v.GLOW].includes(k.m[I])||(k.m[I]=v.LINE);for(let I=0;I<O;I++)for(let K=0;K<D;K++){const se=I*D+K;if(k.m[se]!==v.EYE)continue;const ve=I>0&&k.m[se-D]===v.EYE,ce=K>0&&k.m[se-1]===v.EYE,Te=K+1<D&&k.m[se+1]===v.EYE&&I+1<O&&k.m[se+D]===v.EYE;!ve&&!ce&&Te&&(k.m[se]=v.GLINT)}let Ge=-1;for(let I=O-1;I>=0&&Ge<0;I--)for(let K=0;K<D;K++)if(k.m[I*D+K]){Ge=I;break}if(Ge>=0&&Ge<O-1){const I=O-1-Ge;for(let K=O-1;K>=0;K--)for(let se=0;se<D;se++){const ve=K*D+se,ce=(K-I)*D+se,Te=K-I>=0;k.m[ve]=Te?k.m[ce]:0,k.g[ve]=Te?k.g[ce]:0;for(let ze=0;ze<3;ze++)k.n[ve*3+ze]=Te?k.n[ce*3+ze]:0}}return k.bodyH=Math.round((M-L)*C),{sp:k,s:C}}const Rn=(i,e=9,t=.3)=>Et(Math.floor(i[0]*e),Math.floor(i[1]*e)+Math.floor(i[2]*e)*97,7)<t,Li={wing:(i,e)=>(t,n)=>{const r=(t+1)/2,s=1-.35*r*r,a=-1+.55*r+.18*Math.abs(Math.sin(r*Math.PI*6));return n>s||n<a?null:n>s-.35*(1-r*.5)?e:Math.floor(r*9)%2?i:e},ear:(i,e=v.EAR,t=v.BODY3)=>(n,r)=>{const s=(r+1)/2,a=.95*Math.sin(Math.PI*Math.min(1,.15+s*.85))*(1-s*.35);return Math.abs(n)>a?null:s>.82?t:Math.abs(n)<a*.5&&s<.7&&s>.12?e:i},flame:(i,e)=>(t,n)=>{const r=(n+1)/2,s=Math.sin(Math.PI*Math.min(1,r*1.1))*(1-r)*1.4;return Math.abs(t)>s?null:Math.abs(t)<s*.45&&r<.6?e:i},membrane:i=>(e,t)=>{const n=(e+1)/2,r=-1+.35*Math.abs(Math.sin(n*Math.PI*3));return t<r||t>1-.2*n?null:i},spotted:(i,e,t)=>(n,r)=>{if(Math.hypot(n,r*1.2)>1)return null;const a=Math.hypot(n-.35,r-.1);return a<.18?t:a<.3?e:i}},Ch=1.3,Rh=i=>[1,Math.sqrt(i.growth),Math.sqrt(i.growth)*Ch,i.growth],wr=(i,e,t=1)=>Math.round(e.size*Rh(e)[Math.max(0,Math.min(3,i))]*(2/(e.pixel||2))*1.9*t),Jo=(i,e)=>{const t=Zs(e);for(let n=0;n<9;n++){const r=Math.floor(ye(t,2,i.w-2)),s=Math.floor(ye(t,2,i.h*.6));if(!(i.get(r,s)||i.get(r+1,s)||i.get(r-1,s)||i.get(r,s+1)||i.get(r,s-1))&&(i.px(r,s,v.MAGIC2),n%3===0))for(const[a,o]of[[1,0],[-1,0],[0,1],[0,-1]])i.px(r+a,s+o,v.MAGIC)}};function Qs(i,e,t,n,r,s,a,o){const c=z.add(e,[-n*.7,n*(.75+r),t*n*.35]),l=z.norm(z.sub(c,e)),h=z.norm(z.sub([1,0,0],z.mul(l,z.dot([1,0,0],l)))),f=Math.hypot(...z.sub(c,e));i.flat(z.add(z.lerp(e,c,.5),z.mul(h,-n*.14)),l,h,f*.55,n*.34,Li.wing(s,a),{group:o,extra:!0})}const Qo=(i,e,t=1)=>i===0?Math.round(Math.max(12,Math.min(30*Math.max(.75,Math.min(1.1,t)),wr(1,e)*t*.72))):i===2?Math.round(Math.max(wr(1,e)*t*1.08,Math.min(wr(2,e,t),wr(1,e)*1.4))):wr(i,e)*t;let Es=null;function Lh(i,e){const t=Es;Es=i;try{return e()}finally{Es=t}}const Ph=(i,e)=>{const t=Math.atan2(e,i);return Math.hypot(i,e)<.55+.4*Math.pow(Math.abs(Math.cos(t*2.5+Math.PI/2)),3)},Dh=(i,e)=>{const t=i*1.2,n=-e*1.2+.25;return Math.pow(t*t+n*n-.6,3)-t*t*n*n*n<0};function jo(i){const e=Es,t=i.anchors;if(!e)return;const n=t.head,r=n?Math.max(...n.r):.2;if(e.collar&&(t.neck||n)){const s=t.neck||{c:z.add(n.c,[-n.r[0]*.8,-n.r[1]*.4,0]),r:n.r[1]*.75,dir:z.norm([1,.4,0])},a=z.norm(s.dir),o=z.norm(z.cross(a,Math.abs(a[2])<.9?[0,0,1]:[1,0,0])),c=z.cross(a,o),l=[],h=Math.max(.03,s.r*.2);for(let g=0;g<=16;g++){const m=g/16*Math.PI*2,p=z.add(z.mul(o,Math.cos(m)),z.mul(c,Math.sin(m)));let _=0;for(;_<.8&&i.field(z.add(s.c,z.mul(p,_)))<0;)_+=.01;_>=.8&&(_=s.r),l.push([...z.add(s.c,z.mul(p,_+h*.7)),h])}i.chain(l,v.COLLAR,{group:60,extra:!0});const f=l.reduce((g,m)=>m[0]-m[1]*.6+m[2]*.5>g[0]-g[1]*.6+g[2]*.5?m:g),u=h*1.3*(s.tag||1),d=z.norm(z.add(z.norm(z.sub(f.slice(0,3),s.c)),[.3,-.5,.3]));let x=f.slice(0,3);for(let g=0;g<60&&i.field(x)<u*.4;g++)x=z.add(x,z.mul(d,.01));i.ell(x,[u,u,u*.6],v.COLLAR,{group:60,extra:!0})}if(e.hat!=null&&n){const s=Math.max(r,.13),a=n.top||z.add(et.surface(n.c,n.r,z.norm([-.15,1,.1])),[0,r*.1,0]),o=z.norm([.3,1,.35]),c=s*1.5,l=z.add(a,z.mul(o,c));i.seg(z.add(a,z.mul(o,-s*.1)),l,s*.48,s*.04,v.HAT1,{group:61,extra:!0,paint:h=>Math.floor(z.dot(z.sub(h,a),o)/(c/5)+10)%2?v.HAT2:void 0}),i.ell(l,[s*.17,s*.17,s*.17],v.POM,{group:61,extra:!0})}if(e.glasses&&t.eyes&&n){const[s,a]=t.eyes.pts,o=l=>z.add(l,z.mul(z.norm(z.sub(l,n.c)),t.eyes.size*.45)),c=Math.max(t.eyes.size*1.05,r*.1);if(e.glasses==="bar")i.seg(o(s),o(a),c,c,v.SHADES,{group:62,extra:!0}),i.ell(z.add(o(a),[c*.3,c*.5,c*.2]),[c*.25,c*.25,c*.25],v.GLINT,{group:62,extra:!0});else for(const l of[s,a]){const h=z.norm(z.sub(l,n.c)),f=z.norm(z.cross([0,1,0],h)),u=z.cross(h,f),d=e.glasses==="heart"?Dh:Ph,x=c*1.5;i.flat(o(l),f,u,x,x,(g,m)=>d(g,m)?d(g*1.3,m*1.3)?v.SHADES:v.FRAME:null,{group:62,bend:.1,extra:!0}),i.seg(o(s),o(a),c*.18,c*.18,v.FRAME,{group:62,extra:!0})}}if(e.shoes)for(const s of t.feet){const a=e.shoes==="platform",o=s.r,c=z.add(s.c,[o*.25,o*(a?.35:.15),0]);i.ell(c,[o*1.45,o*(a?1.2:.85),o*1.15],v.SHOE,{group:s.group,extra:!0,paint:l=>l[1]<c[1]-o*(a?.45:.4)?v.SOLE:e.shoes==="glitter"&&Rn(l,60,.28)?v.GLINT:void 0})}}function Ih(i,e,t,n,r="towards"){const s={legW:1,earS:1,hgt:1,bw:.3,...i.q},a=e===3,o=e===1,c=e===0,l=N=>a&&i.legend.includes(N),h=new et,f=s.hr*(c?1.75:o?1.25:1)*(n.head/.44)**.5,u=s.len*(c?.8:o?.9:1.02)*n.long,d=c?.55:o?.9:1.04,x=t?-.04:0,g=1+x,m=s.chest*(a?1.06:1)/d+x,p=s.tuck/d+x,_=s.bw*(c?1.15:e>=2?1.06:1)*(s.legW>1.2?1.15:1),S=.06*s.legW*(a?1.1:c?1.7:1),b=s.back==="hump"?.1:0,w=s.back==="arch"?.1:0,E=m+.12,L=N=>{if(s.belly&&N[1]<E&&N[0]>-u*.5)return v.BELLY;if(s.saddle&&N[1]>g-.18&&N[0]<u*.55)return v.BODY2;if(s.spots&&N[1]>m+.1&&Rn(N,10,.22))return s.spotMat==="belly"||s.spots==="young"&&o?v.BELLY:s.spots==="young"?void 0:v.BODY3;if(s.ridge&&N[1]>g-.08+b*.5)return v.BODY3};if(h.ell([u*.48,(g+m)/2+b*.5,0],[u*.62,(g-m)/2+b*.5,_],v.BODY,{paint:L}),h.ell([-u*.5,(g+p)/2+w*.6,0],[u*.58,(g-p)/2+w*.6,_*.93],v.BODY,{paint:L}),h.ell([0,(g+(m+p)/2)/2+.02,0],[u*.6,(g-(m+p)/2)/2,_*.9],v.BODY,{paint:L}),s.ridge)for(let N=0;N<(a?16:10);N++){const re=-u*.8+N*u*1.75/(a?15:9),oe=(.07+(a?.04:0))*(1+.5*Math.max(0,re/u));h.ell([re,g+.02+b*Math.max(0,1-Math.abs(re/u-.5)*2)+oe*.5,0],[oe,.03,_*.25],v.BODY3,{dir:[-.3,1,0],up:[1,0,0]})}if(s.wool)for(let N=0;N<14;N++){const re=N/14*Math.PI*2;h.ell([u*Math.cos(re)*.7,(g+m)/2+Math.sin(re)*.2,_*(N%2?.5:-.5)],[.16,.14,.14],v.BODY)}const M=[.32,-.32][t],C=(N,re)=>{const oe=re*_*.62,Se=N?u*.62:-u*.62,Ue=(N?1:-1)*re*M,Ge=N?m+.1:p+.15,I=(N?re:-re)*(t?1:-1)>0?.06:0,K=[Se+Math.sin(Ue)*.2+(N?.02:.1),Math.max(.3,Ge*.55),oe],se=[Se+Math.sin(Ue)*.42,.05+I,oe],ve=[Se,Ge+.12,oe*.8],ce=re>0?s.legMat||v.BODY:s.legMat?v.BODY3:v.BODY2,Te=N?[[...ve,S*1.5],[...K,S*1.05],[...se,S*.9]]:[[...ve,S*2*(s.haunch||1)],[...z.add(K,[-.12,.06,0]),S*1.2],[...z.add(se,[-.06*(s.hindFoot||1),.12,0]),S*.9],[...se,S*.9]];h.chain(Te,ce,{group:re>0?6+(N?1:0):2,paint:s.socks?Ne=>Ne[1]<s.socks?v.BODY3:void 0:void 0});const ze=(s.paw==="hoof"?.07:.09)*s.legW**.5*(N?1:s.hindFoot||1);h.ell(z.add(se,[ze*.5,-.01,0]),[ze,S*.9,S*1.1],s.paw==="hoof"?v.NOSE:ce,{group:re>0?6+(N?1:0):2}),h.anchors.feet.push({c:z.add(se,[ze*.5,-.01,0]),r:Math.max(ze,S*1.1),group:re>0?6+(N?1:0):2})};for(const N of[-1,1])C(!0,N),C(!1,N);const A=[u*.82,g-.12,0],P=[A[0]+Math.cos(s.neckAng)*s.neck*.9,A[1]+Math.sin(s.neckAng)*s.neck*.9+(c?.1:0),0];h.seg(A,P,s.neckW*.55,s.neckW*.42,v.BODY,{paint:N=>s.belly&&N[1]<(A[1]+P[1])/2-.05?v.BELLY:s.face==="dark"?v.BODY2:void 0});const F=N=>{if(s.face==="badger")return Math.abs(N[2])<f*.22+(N[0]-P[0])*.1||N[1]<P[1]-f*.1?v.BELLY:v.BODY3;if(s.face==="dark")return v.BODY2;if((s.belly||s.muzzle)&&N[1]<P[1]-f*.35)return v.BELLY};h.ell(P,[f*1.05,f*.92,f*.88],v.BODY,{paint:F});const U=f*s.snout*(c?.55:o?.78:1),D=f*s.snoutD*.55,O=[P[0]+f*.65+U*.5,P[1]-f*.28,0];h.ell(O,[U*.62+f*.2,D,D*.95],v.BODY,{dir:[1,-.25,0],paint:N=>(s.muzzle||s.belly)&&N[1]<O[1]-D*.1?v.BELLY:F(N)});const k=[O[0]+U*.62+f*.1,O[1]-.02,0];h.ell(k,[f*(s.disc?.1:.12),f*(s.disc?.2:.12),f*(s.disc?.2:.15)],v.NOSE,{group:1});for(const N of[-1,1]){const re=et.surface(P,[f*1.05,f*.92,f*.88],z.norm([.75,.32,N*.62]));h.ell(re,[f*.13,f*.16,f*.13].map(oe=>oe*(s.eyeK||1)*(c?1.5:o?1.2:1)),a&&!s.tusks?v.MAGIC2:v.EYE,{group:1})}h.anchors.head={c:P,r:[f*1.05,f*.92,f*.88],top:[P[0]-f*.1,P[1]+f*.82,0]},h.anchors.eyes={pts:[-1,1].map(N=>et.surface(P,[f*1.05,f*.92,f*.88],z.norm([.75,.32,N*.62]))),size:f*.16*(s.eyeK||1)*(c?1.5:o?1.2:1)},h.anchors.neck={c:z.lerp(A,P,c?.05:o?.25:.42),r:s.neckW*.5*(c?1.3:o?1.12:1),dir:z.norm(z.sub(P,A)),tag:c?1.8:o?1.3:1};for(const N of[-1,1]){const re=s.ear,oe=[P[0]-f*.15,P[1]+f*.7,N*f*.5],Se=s.earS*(c?1.2:1)*(s.ear==="long"?.62:1);if(re==="none")continue;if(re==="round"){h.ell(oe,[f*.22,f*.25*Se,f*.1],v.BODY,{group:1,paint:Te=>Te[0]>oe[0]+f*.02?v.EAR:void 0});continue}const Ue=re==="long",Ge=re==="small"?-.6:0,I=f*.55*Se*(re==="big"?1.35:Ue?2.2:1),K=f*.3*(re==="big"?1.2:Ue?1.35:1),se=z.norm([Ge*.6-(Ue?.3:.12),1,N*.3]),ve=z.norm([.55,.2,N]),ce=z.norm(z.cross(ve,se));h.flat(z.add(oe,z.mul(se,I)),ce,se,K,I,Li.ear(v.BODY,v.EAR,v.BODY3),{group:5+(N>0?0:20),extra:Ue}),re==="tuft"&&h.seg(z.add(oe,[0,I*1.4,N*.02]),z.add(oe,[0,I*1.85,N*.04]),f*.05,f*.02,v.BODY3,{group:1})}const Y=[-u*1.05,g-.1+w*.5,0],j=t?.04:-.02;if(l("tails")||Uh(h,l("starTail")?"star":s.tail,Y,u,g,j),s.horns)for(const N of[-1,1]){const re=o?.6:c?.35:l("hornsGlow")?1.4:1,oe=[];for(let Se=0;Se<=8;Se++){const Ue=.3-Se/8*Math.PI*1.6,Ge=f*.65*re*(1-.45*Se/8);oe.push([P[0]-f*.1+Math.cos(Ue)*Ge,P[1]+f*.45+Math.sin(Ue)*Ge,N*(f*.6+Se*.015)]),oe[Se].push(f*.2*re*(1-.6*Se/8))}h.chain(oe,l("hornsGlow")?v.MAGIC:v.ACCENT,{group:13})}if(s.antlers||l("jackalope"))for(const N of[-1,1])Nh(h,s,[P[0]-f*.05,P[1]+f*.75,N*f*.4],N,e,l);if(s.tusks)for(const N of[-1,1]){const re=o?.4:c?0:l("tusksBig")?1.3:.75;if(!re)continue;const oe=[O[0]+U*.25,O[1]-D*.4,N*D*.8];h.chain([[...oe,.045*re],[...z.add(oe,[.1*re,.1*re,N*.03]),.04*re],[...z.add(oe,[.06*re,.24*re,N*.05]),.02*re]],v.ACCENT,{group:8})}s.teeth&&!c&&h.ell([k[0]-f*.1,k[1]-f*.25,0],[f*.08,f*.14,f*.12],v.ACCENT,{group:1});const X=N=>[-u*.9+N*u*1.65,g+b*Math.max(0,1-Math.abs(N-.8)*3)+w*(1-Math.abs(N-.4)*2),0];if(l("wings"))for(const N of[-1,1])Qs(h,[u*.2,g,N*_*.5],N,1.15,t?.1:0,N>0?v.MAGIC2:v.MAGIC,v.MAGIC,40+(N>0?10:0));if(l("mane")||l("flames"))for(let N=0;N<7;N++){const re=N/6,oe=z.lerp(z.add(P,[-f*.5,f*.3,0]),X(.55),re),Se=[.4,.3,.45,.28,.38,.25,.3][N],Ue=z.norm([-.35-(t?.1:0),1,0]);h.flat(z.add(oe,z.mul(Ue,Se*.5)),[1,0,0],Ue,Se*.32,Se*.55,Li.flame(N%2?v.MAGIC:v.MAGIC2,v.MAGIC2),{group:60+N%2,extra:!0})}if(l("tails"))for(let N=0;N<7;N++){const re=Math.PI*(.55+N*.08),oe=(N-3)*.1,Se=z.add(Y,[Math.cos(re)*.9,Math.sin(re)*.85,oe]);h.chain([[...Y,.1],[...z.lerp(Y,Se,.5),.17],[...Se,.08]],N%2?v.BODY2:v.BODY,{group:70,extra:!0}),h.ell(Se,[.09,.09,.09],v.MAGIC2,{group:71,extra:!0})}if(l("crystals")&&[.15,.3,.45,.6,.75].forEach((N,re)=>{const oe=X(N),Se=[.3,.5,.4,.6,.35][re];h.ell(z.add(oe,[0,Se*.45,(re%2-.5)*.1]),[Se*.55,.08,.08],v.MAGIC,{dir:[(re-2)*.12,1,0],group:80+re%2,extra:!0,paint:Ue=>Ue[2]>0?v.MAGIC2:void 0})}),l("moss")){for(let N=0;N<6;N++)h.ell(X(.08+N*.15),[u*.22,.07,_*.85],v.LEAF,{group:85,extra:!0});for(const[N,re]of[[.25,.55],[.5,.8],[.75,.45]]){const oe=X(N);h.seg(oe,z.add(oe,[0,re*.7,0]),.04,.025,v.TRUNK,{group:86,extra:!0}),h.ell(z.add(oe,[0,re*.8,0]),[re*.28,re*.26,re*.28],v.LEAF2,{group:87,extra:!0,paint:Se=>Se[1]<oe[1]+re*.72?v.LEAF3:void 0})}for(const N of[.12,.4,.65,.9]){const re=X(N);h.ell(z.add(re,[0,.12,_*.3]),[.07,.035,.07],v.MAGIC,{group:89,extra:!0})}}if(l("ribbons"))for(let N=0;N<3;N++){const re=[];for(let oe=0;oe<9;oe++){const Se=oe/8;re.push([u*(.5-Se*2.2),g+.05+N*.1+Se*(.25+N*.12)+Math.sin(Se*6+t+N)*.07,(N-1)*.18,.04*(1-Se*.6)])}h.chain(re,N%2?v.MAGIC2:v.MAGIC,{group:90+N,extra:!0})}jo(h);const{sp:te}=_n(h,{height:Qo(e,n,s.hgt),facing:r});return a&&Jo(te,i.id.length*7919),te}function Uh(i,e,t,n,r,s){const a={group:3},o=c=>-n*c;e==="brush"?i.chain([[...t,.1],[o(1.3),r-.25+s,0,.15],[o(1.4),r-.55,0,.14],[o(1.35),.38+s,0,.09]],v.BODY,{...a,paint:c=>c[1]<.32?v.BODY3:void 0}):e==="bushy"?i.chain([[...t,.1],[o(1.05)-.35,r-.05+s,0,.17],[o(1.05)-.75,r-.2+s,0,.18],[o(1.05)-1,r-.35+s,0,.1]],v.BODY,{...a,paint:c=>c[0]<o(1.05)-.82?v.BELLY:void 0}):e==="stub"||e==="deer"||e==="bob"?i.ell(z.add(t,[-.06,.02+s,0]),[.1,.08,.07],e==="deer"?v.BELLY:v.BODY,{...a,paint:e==="bob"?c=>c[0]<t[0]-.08?v.BODY3:void 0:void 0}):e==="puff"?i.ell(z.add(t,[-.04,.02,0]),[.11,.11,.1],v.BELLY,a):e==="squirrel"||e==="star"?i.chain([[...t,.12],[o(1.3),r+.05+s,0,.25],[o(1.3),r+.6+s,0,.3],[o(1),r+.95+s,0,.27],[o(.65),r+.9+s,0,.16]],e==="star"?v.MAGIC:v.BODY,{...a,extra:!0,paint:e==="star"?c=>Rn(c,14,.12)?v.GLINT:void 0:void 0}):e==="otter"?i.chain([[...t,.17],[o(1.3),r-.45+s,0,.12],[o(1.6),.1,0,.07],[o(1.85),.06+s,0,.03]],v.BODY,a):e==="stoat"?i.chain([[...t,.08],[o(1.3),r-.12+s,0,.07],[o(1.6),r-.05+s,0,.06]],v.BODY,{...a,paint:c=>c[0]<o(1.45)?v.BODY3:void 0}):e==="flat"?(i.seg(t,[o(1.15),.3,0],.08,.07,v.BODY2,a),i.ell([o(1.4),.1+s*.5,0],[.28,.03,.14],v.BODY3,a)):e==="thin"&&(i.chain([[...t,.04],[o(1.1),r-.3,0,.03],[o(1.12)+s,r-.55,0,.025]],v.BODY,a),i.ell([o(1.12)+s,r-.62,0],[.04,.07,.04],v.BODY3,a))}function Nh(i,e,t,n,r,s){const a=!e.antlers,o=a?.45:[0,.5,.95,.95][r]*(s("antlersGlow")?1.15:1),c=s("antlersGlow")?n>0?v.MAGIC2:v.MAGIC:v.ACCENT,l={group:11+(n>0?1:0),extra:!0};if(!o)return;const h=.045*Math.max(.8,o),f=n*.35*o;if(e.antlers==="palm"){const m=z.add(t,[-.06*o,.12*o,f*.3]);i.seg(t,m,h*1.3,h*1.2,c,l);for(let p=0;p<5;p++){const _=.35+p*.3,S=z.norm([-Math.cos(_),Math.sin(_)*.9,n*.55]),b=(.24+.05*(p%2))*o;i.ell(z.add(m,z.mul(S,b*.55)),[b*.6,h*1.5,h*.6],c,{...l,dir:S,up:[0,0,1]})}return}const u=z.add(t,[-.18*o,.3*o,f*.4]),d=z.add(t,[-.25*o,.62*o,f*.8]),x=z.add(t,[-.1*o,.95*o,f]);i.chain([[...t,h*1.2],[...u,h],[...d,h*.85],[...x,h*.4]],c,l);const g=(m,p,_,S)=>i.seg(m,z.add(m,z.mul(z.norm(p),_)),S,S*.35,c,l);g(z.add(t,[-.04*o,.1*o,f*.1]),[1,.6,0],.28*o,h*.8),(o>.4||a)&&g(u,[1,.9,0],.3*o,h*.7),o>.7&&(g(d,[.8,1,0],.28*o,h*.6),g(x,[.3,1,n*.2],.18*o,h*.5))}function Fh(i,e,t,n,r="towards"){const s=e===3,a=e===1,o=e===0,c=x=>s&&i.legend.includes(x),l=new et,h=t?.03:0,f=o?.48:a?.42:.36,u=(o?.95:1.08)+h;for(const x of[-1,1]){const g=t&&x>0?.04:0;l.seg([.05,.2,x*.14],[.08,.05+g,x*.15],.07,.06,v.BODY2,{group:2});for(const m of[-.04,0,.04])l.ell([.16,.03+g,x*.15+m],[.06,.025,.02],v.ACCENT,{group:2});l.anchors.feet.push({c:[.13,.04+g,x*.15],r:.08,group:x>0?6:2})}if(l.ell([-.32,.32,0],[.22,.06,.14],v.BODY2,{dir:[-1,-.6,0],group:3}),l.ell([0,.55+h,0],[.36,.52,.36],v.BODY,{paint:x=>x[0]>.12&&x[1]<u-f*.5?Math.floor(x[1]*18)%3===0&&Rn(x,16,.5)?v.BODY2:v.BELLY:void 0}),!c("wings"))for(const x of[-1,1])l.ell([-.06,.58+h,x*.3],[.4,.3,.08],v.BODY2,{dir:[-.3,-1,0],up:[1,0,0],group:x>0?4:2,paint:g=>Rn(g,12,.15)?v.BODY3:void 0});l.ell([0,u,0],[f,f*.9,f],v.BODY);for(const x of[-1,1]){const g=z.norm([.75,-.05,x*.4+.35]),m=z.add(et.surface([0,u,0],[f,f*.9,f],g),z.mul(g,-f*.05));l.ell(m,[f*.22,f*.46,f*.4],v.BELLY,{group:1,dir:g});const p=z.add(m,z.mul(g,f*.14));l.ell(p,[f*.1,f*.26,f*.24].map(_=>_*(o?1.15:1)),s?v.MAGIC:v.IRIS,{group:1,dir:g}),l.ell(z.add(p,z.mul(g,f*.07)),[f*.08,f*.14,f*.13].map(_=>_*(o?1.15:1)),s?v.MAGIC2:v.EYE,{group:1,dir:g}),(l.anchors.eyes||={pts:[],size:f*.22}).pts.push(z.add(p,z.mul(g,f*.07))),o||l.ell([f*.05,u+f*.8,x*f*.6],[f*.32,f*.12,f*.08],v.BODY2,{dir:[-.1,1,x*.7],up:[1,0,0],group:1})}if(l.ell(et.surface([0,u,0],[f,f*.9,f],z.norm([.75,-.35,.35])),[f*.2,f*.12,f*.1],v.ACCENT,{dir:[.6,-1,.3],group:1}),c("wings"))for(const x of[-1,1])Qs(l,[-.05,.8+h,x*.3],x,1.3,t?.12:0,x>0?v.MAGIC2:v.MAGIC,v.MAGIC,40+(x>0?10:0));if(c("eyesRing"))for(let x=0;x<7;x++){const g=Math.PI*(.15+x/6*.7);l.ell([Math.cos(g)*.2-.1,u+.1+Math.sin(g)*.6,(x-3)*.15],[.07,.07,.07],v.MAGIC2,{group:95+x,extra:!0}),l.ell([Math.cos(g)*.2-.05,u+.1+Math.sin(g)*.6,(x-3)*.15],[.035,.035,.035],v.EYE,{group:95+x,extra:!0})}l.anchors.head={c:[0,u,0],r:[f,f*.9,f]},l.anchors.neck={c:[0,u-f*.75,0],r:f*.85,dir:[0,1,0]},jo(l);const{sp:d}=_n(l,{height:Qo(e,n,.95),facing:r});return s&&Jo(d,31),d}const gi=(i,e,t,n,r,s,a=1)=>{for(const o of n)i.ell(et.surface(e,t,z.norm(o)),[r,r*1.2,r],s,{group:a});i.anchors.head||={c:e,r:t},i.anchors.eyes||={pts:n.map(o=>et.surface(e,t,z.norm(o))),size:r}},iu=(i,e,t)=>i.ell([e,.005,0],[t,.005,t*.6],v.NOSE,{group:0});function Sn(i,e,t,n,r,s){jo(i);const{sp:a}=_n(i,{height:Qo(t,n,r),facing:s});return t===3&&Jo(a,e.id.length*131),a}const ru=(i,e,t)=>{i.ell(e,[t,t*.35,t],v.MAGIC,{group:95,extra:!0,paint:n=>n[1]>e[1]?v.MAGIC2:void 0});for(let n=0;n<5;n++){const r=n/5*Math.PI*2;i.ell(z.add(e,[Math.cos(r)*t*.8,t*.55,Math.sin(r)*t*.8]),[t*.38,t*.12,t*.12],v.MAGIC,{dir:[0,1,0],up:[1,0,0],group:96,extra:!0})}},el=(i,e)=>e.forEach(([t,n],r)=>i.ell(z.add(t,[0,n*.45,0]),[n*.55,.07,.07],v.MAGIC,{dir:[(r%3-1)*.25,1,(r%2-.5)*.3],group:80+r%2,extra:!0,paint:s=>s[2]>t[2]?v.MAGIC2:void 0}));function Oh(i,e,t,n,r="towards"){const s=e===3,a=new et,o=t?.03:0;for(const[f,u]of[[.28,.2],[.28,-.2],[-.28,.2],[-.28,-.2]])a.seg([f,.15,u],[f+(u>0?o:-o),.03,u],.06,.05,v.BODY3,{group:u>0?6:2}),a.anchors.feet.push({c:[f+.03+(u>0?o:-o),.03,u],r:.065,group:u>0?6:2});const c=[0,.32,0],l=[.5,.32,.38];a.ell(c,l,v.BODY2,{paint:f=>Rn(f,22,.3)?v.BODY3:Rn(f,19,.12)?v.BELLY:void 0});for(let f=0;f<46;f++){const u=f*2.399%(Math.PI*2),d=f/46*.9+.05,x=z.norm([Math.cos(u)*Math.sin(d*Math.PI*.5)-.25,Math.cos(d*Math.PI*.5)*.9+.1,Math.sin(u)*Math.sin(d*Math.PI*.5)]);x[0]>.55||a.ell(z.add(et.surface(c,l,x),z.mul(x,.02)),[.1,.025,.025],f%4?v.BODY2:v.BODY3,{dir:z.add(x,[-.4,0,0]),group:1})}const h=[.48,.22,0];return a.ell(h,[.22,.14,.15],v.BELLY,{dir:[1,-.3,0],group:1}),a.ell([.69,.16,0],[.04,.04,.04],v.NOSE,{group:1}),gi(a,h,[.22,.14,.15],[[.3,.6,.55],[.3,.6,-.55]],.035,s?v.MAGIC2:v.EYE),s&&el(a,[[[-.3,.55,.1],.35],[[-.05,.62,-.1],.5],[[.2,.55,.12],.4],[[-.15,.58,.2],.3]]),Sn(a,i,e,n,.6,r)}function Bh(i,e,t,n,r="towards"){const s=e===3,a=new et,o=t?.05:0;for(const h of[-1,1])a.ell([-.22,.16,h*.36],[.24,.13,.12],h>0?v.BODY:v.BODY2,{dir:[1,.3,0],group:h>0?6:2,paint:f=>Rn(f,14,.15)?v.BODY3:void 0}),a.ell([.05,.04,h*.4],[.16,.04,.08],h>0?v.BODY:v.BODY2,{group:h>0?6:2}),a.seg([.35,.2+o,h*.24],[.42,.03,h*.3],.05,.04,h>0?v.BODY:v.BODY2,{group:h>0?7:2}),a.anchors.feet.push({c:[.45,.03,h*.3],r:.06,group:h>0?7:2},{c:[.12,.04,h*.4],r:.08,group:h>0?6:2});const c=[0,.3+o,0],l=[.5,.28,.4];a.ell(c,l,v.BODY,{paint:h=>h[1]<c[1]-.12?v.BELLY:h[0]>.38&&Math.abs(h[1]-(c[1]-.02))<.018?v.LINE:Rn(h,14,.22)?v.BODY3:void 0});for(const h of[-1,1]){const f=[.3,.55+o,h*.17];a.ell(f,[.1,.09,.1],v.BODY,{group:1}),a.ell(et.surface(f,[.1,.09,.1],z.norm([.6,.5,h*.5])),[.05,.05,.05],s?v.MAGIC2:v.IRIS,{group:1}),a.ell(et.surface(f,[.11,.1,.11],z.norm([.65,.45,h*.5])),[.03,.015,.03],v.EYE,{group:1})}return a.anchors.head={c:[.22,.45+o,0],r:[.3,.2,.3],top:[.18,.62+o,0]},a.anchors.eyes={pts:[-1,1].map(h=>et.surface([.3,.55+o,h*.17],[.1,.09,.1],z.norm([.6,.5,h*.5]))),size:.05},a.anchors.neck={c:[.32,.3+o,0],r:.25,dir:[1,.3,0]},s&&ru(a,[.15,.66+o,0],.16),Sn(a,i,e,n,.55,r)}function zh(i,e,t,n,r="towards"){const s=e===3,a=e===1,o=u=>s&&i.legend.includes(u),c=new et,l=t?.02:0;for(const u of[-1,1]){const d=t&&u>0?.04:0;c.seg([0,.3,u*.08],[.03,.03+d,u*.08],.03,.025,v.NOSE,{group:u>0?7:2}),c.ell([.08,.02+d,u*.08],[.08,.015,.04],v.NOSE,{group:2}),c.anchors.feet.push({c:[.07,.03+d,u*.08],r:.06,group:u>0?7:2})}if(c.ell([-.55,.42,0],[.32,.035,.12],v.BODY2,{dir:[-1,-.25,0],group:3}),c.ell([0,.52+l,0],[.42,.26,.24],v.BODY,{dir:[1,.45,0]}),!o("wings"))for(const u of[-1,1])c.ell([-.1,.55+l,u*.2],[.45,.17,.05],v.BODY2,{dir:[-1,-.25,0],group:u>0?4:2});const h=[.36,.84+l,0],f=a?.19:.16;if(c.ell(h,[f*1.1,f,f*.95],v.BODY,{paint:u=>u[1]>h[1]+f*.55?v.BELLY:void 0}),c.ell(z.add(h,[f*1.5,-f*.25,0]),[f*1,f*.38,f*.3],v.NOSE,{dir:[1,-.2,0],group:1}),gi(c,h,[f*1.1,f,f*.95],[[.55,.35,.65],[.55,.35,-.65]],f*.16,s?v.MAGIC2:v.EYE),o("wings"))for(const u of[-1,1])Qs(c,[-.05,.65+l,u*.18],u,1.1,t?.1:0,u>0?v.MAGIC2:v.MAGIC,v.MAGIC,40+(u>0?10:0));if(o("eyesRing"))for(let u=0;u<6;u++){const d=Math.PI*(.2+u/5*.6);c.ell([Math.cos(d)*.25-.1,.95+Math.sin(d)*.45,(u-2.5)*.12],[.06,.06,.06],v.MAGIC2,{group:95+u,extra:!0})}return Sn(c,i,e,n,.75,r)}function kh(i,e,t,n,r="towards"){const s=e===3,a=u=>s&&i.legend.includes(u),o=new et,c=t===0,l=.55,h=a("wingsBig")?1.5:1;iu(o,0,.3*h);for(const u of[-1,1]){const d=[0,l+.05,u*.1],x=[.05,l+(c?.35:-.05),u*.45*h],g=[[-.05,l+(c?.45:-.15),u*.85*h],[-.25,l+(c?.2:-.25),u*.75*h],[-.3,l+(c?0:-.25),u*.4*h]],m=a("wingsBig")?v.MAGIC:v.BODY2,p=a("wingsBig")?v.MAGIC2:v.BODY3;o.seg(d,x,.03,.025,p,{group:11});for(const E of g)o.seg(x,E,.02,.012,p,{group:11});const _=z.sub(g[0],d),S=z.norm(_),b=z.norm(z.sub(g[2],x)),w=z.norm(z.sub(b,z.mul(S,z.dot(b,S))));o.flat(z.add(z.lerp(d,g[0],.5),z.mul(w,.12*h)),S,w,Math.hypot(..._)*.55,.3*h,Li.membrane(m),{group:10+(u>0?1:0),bend:.2})}o.ell([0,l,0],[.13,.16,.12],v.BODY,{group:1});const f=[.08,l+.2,0];o.ell(f,[.12,.11,.11],v.BODY,{group:1});for(const u of[-1,1])o.ell(z.add(f,[-.02,.15,u*.07]),[.12,.045,.02],v.BODY,{dir:[.1,1,u*.3],up:[1,0,0],group:1,paint:d=>d[0]>f[0]-.01?v.EAR:void 0});return gi(o,f,[.12,.11,.11],[[.7,.2,.5],[.7,.2,-.5]],.025,s?v.MAGIC2:v.EYE),o.ell(et.surface(f,[.12,.11,.11],[1,-.2,0]),[.025,.02,.03],v.NOSE,{group:1}),Sn(o,i,e,n,.55,r)}function Gh(i,e,t,n,r="towards"){const s=e===3,a=new et,o=t?.03:0;a.seg([-.5,.18,0],[-.62,.12,0],.04,.02,v.SKIN,{group:3});for(const c of[-1,1])a.ell([-.3,.05,c*.2],[.07,.04,.05],v.SKIN,{group:c>0?6:2}),a.anchors.feet.push({c:[-.3,.05,c*.2],r:.07,group:c>0?6:2});a.ell([0,.3,0],[.52,.29,.33],v.BODY,{paint:c=>c[1]>.45?v.BODY2:void 0}),a.ell([.55,.24,0],[.2,.07,.07],v.SKIN,{dir:[1,-.15,0],group:1}),a.ell([.74,.21,0],[.04,.05,.06],v.NOSE,{group:1});for(const c of[-1,1]){const l=[.32,.1-(c>0?o:0),c*.34];a.ell(l,[.13,.035,.12],v.SKIN,{group:c>0?7:2,axes:[[1,0,0],[0,1,0],[0,0,1]]});for(let h=0;h<4;h++)a.ell(z.add(l,[.14,-.01,c*(h-1.5)*.05]),[.05,.015,.015],v.ACCENT,{group:c>0?7:2})}for(const c of[-1,1])a.ell(et.surface([0,.3,0],[.52,.29,.33],z.norm([.85,.3,c*.35])),[.015,.015,.015],s?v.MAGIC2:v.EYE,{group:1});return a.anchors.head={c:[.32,.34,0],r:[.25,.22,.25],top:[.3,.58,0]},a.anchors.eyes={pts:[-1,1].map(c=>et.surface([0,.3,0],[.52,.29,.33],z.norm([.85,.3,c*.35]))),size:.03},a.anchors.neck={c:[.36,.3,0],r:.27,dir:[1,.1,0]},s&&ru(a,[.15,.62,0],.15),Sn(a,i,e,n,.55,r)}function Hh(i,e,t,n,r="towards"){const s=e===3,a=f=>s&&i.legend.includes(f),o=new et;for(const f of[-1,1])for(let u=0;u<3;u++){const d=.25-u*.25,x=(u+(f>0?1:0)+t)%2?.06:-.06,g=[d,.22,f*.2];o.chain([[...g,.03],[d+x+(1-u)*.06,.32,f*.42,.025],[d+x*1.5+(1-u)*.15,.02,f*.55,.015]],f>0?v.BODY2:v.BODY3,{group:f>0?7:2})}o.ell([-.12,.34,0],[.46,.24,.32],v.BODY,{paint:f=>Math.abs(f[2])<.018&&f[1]>.4?v.LINE:f[1]>.5&&f[2]>.05&&f[2]<.17?v.BELLY:void 0}),o.ell([.38,.33,0],[.16,.16,.26],v.BODY,{group:1});const c=[.56,.3,0];o.ell(c,[.1,.1,.17],v.BODY2,{group:1});const l=[.3,.5,.7,.75][e]*(a("horn")?1.3:1),h=a("horn")?v.MAGIC:v.BODY3;for(const f of[-1,1]){const u=z.add(c,[.08,.02,f*.1]),d=z.add(u,[l*.7,l*.45,f*l*.15]),x=z.add(d,[l*.25,-l*.12,-f*l*.12]);o.chain([[...u,.045],[...d,.035],[...x,.015]],h,{group:8+(f>0?1:0)}),o.seg(z.lerp(u,d,.55),z.add(z.lerp(u,d,.55),[0,l*.22,0]),.02,.008,h,{group:8})}for(const f of[-1,1])o.chain([[...z.add(c,[.05,.06,f*.1]),.012],[c[0]+.1,.5,f*.22,.012],[c[0]+.2,.5,f*.26,.012]],v.BODY3,{group:9,extra:!0});return gi(o,c,[.1,.1,.17],[[.4,.3,.85],[.4,.3,-.85]],.032,s?v.MAGIC2:v.EYE,9),a("crystals")&&el(o,[[[-.35,.5,.1],.3],[[-.1,.55,-.08],.45],[[.1,.5,.1],.35]]),Sn(o,i,e,n,.5,r)}function Vh(i,e,t,n,r="towards"){const s=e===3,a=new et,o=t?.04:0;a.ell([0,.07,0],[.6+o,.07,.17],v.SKIN,{group:1}),a.chain([[.45+o,.08,0,.1],[.6+o,.25,0,.09],[.68+o,.28,0,.08]],v.SKIN,{group:1});for(const h of[-1,1])a.seg([.7+o,.32,h*.04],[.78+o,.55,h*.1],.018,.014,v.SKIN,{group:5}),a.ell([.78+o,.57,h*.1],[.03,.03,.03],s?v.MAGIC2:v.EYE,{group:5});a.anchors.head={c:[.68+o,.3,0],r:[.09,.08,.09],top:[.66+o,.38,0]},a.anchors.eyes={pts:[-1,1].map(h=>[.78+o,.57,h*.1]),size:.03},a.anchors.neck={c:[.55+o,.17,0],r:.1,dir:[1,1.2,0]};const c=[-.12,.4,0],l=s?v.MAGIC:v.BODY;return a.ell(c,[.32,.32,.22],l,{group:3,paint:h=>{const f=Math.atan2(h[1]-c[1],h[0]-c[0]);return((Math.hypot(h[0]-c[0],h[1]-c[1])/.32-f/(Math.PI*2)*.3)%.3+.3)%.3<.06?s?v.MAGIC2:v.BODY3:void 0}}),Sn(a,i,e,n,.45,r)}function Wh(i,e,t,n,r="towards"){const s=e===3,a=new et;for(const o of[-1,1])for(let c=0;c<7;c++){const l=-.45+c*.15,h=(c+t)%2?.03:-.03;a.seg([l,.1,o*.22],[l+h,.01,o*.33],.025,.015,v.BODY3,{group:o>0?7:2})}for(const o of[-1,1])a.chain([[.5,.15,o*.08,.02],[.7,.3,o*.2,.015],[.82,.22,o*.26,.012]],v.BODY3,{group:9,extra:!0});return a.ell([0,.18,0],[.58,.2,.3],v.BODY,{paint:o=>(Math.floor((o[0]+.6)*9)%2&&o[1]>.2?v.BODY2:void 0)||(Math.abs((o[0]+.6)*9%1)<.12?v.LINE:void 0)}),gi(a,[0,.18,0],[.58,.2,.3],[[.92,.3,.25],[.92,.3,-.25]],.02,s?v.MAGIC2:v.EYE),s&&el(a,[[[-.3,.32,.05],.3],[[0,.37,-.05],.45],[[.25,.32,.05],.32]]),Sn(a,i,e,n,.4,r)}function Xh(i,e,t,n,r="towards"){const s=e===3,a=e===1,o=d=>s&&i.legend.includes(d),c=new et,l=t?.7:0,h=[];for(let d=0;d<=12;d++){const x=d/12;h.push([-.9+x*1.2,.07,Math.sin(x*Math.PI*2+l)*.25*(1-x*.5),.03+.045*Math.sin(Math.min(1,x*1.4)*Math.PI/2)])}h.push([.38,.25,h[12][2],.07],[.42,.45,h[12][2]*.8,.065]),c.chain(h,v.BODY,{paint:d=>d[1]<.05&&d[0]<.35?v.BELLY:Rn([d[0]*1.5,d[1],d[2]],14,.3)?v.BODY3:void 0});const f=[.5,.5,h[13][2]*.8],u=a?.11:.09;if(c.ell(f,[u*1.5,u*.75,u],v.BODY,{dir:[1,-.15,0],group:1}),gi(c,f,[u*1.5,u*.75,u],[[.5,.5,.7],[.5,.5,-.7]],u*.22,s?v.MAGIC2:v.EYE),t||c.seg(z.add(f,[u*1.4,-u*.2,0]),z.add(f,[u*2.3,-u*.3,0]),.01,.008,v.SKIN,{group:1}),c.anchors.feet.push({c:z.add(h[0].slice(0,3),[-.02,-.01,0]),r:.06,group:3,tail:!0}),c.anchors.neck={c:[.42,.36,h[12][2]*.9],r:.075,dir:[.2,1,0]},o("wings"))for(const d of[-1,1])Qs(c,[0,.2,d*.05],d,.9,t?.1:0,d>0?v.MAGIC2:v.MAGIC,v.MAGIC,40+(d>0?10:0));return Sn(c,i,e,n,.45,r)}function Yh(i,e,t,n,r="towards"){const s=e===3,a=u=>s&&i.legend.includes(u),o=new et,c=t===0,l=.55,h=a("wingsBig")?1.45:1,f=a("wingsBig")?v.MAGIC:v.BODY;iu(o,0,.3*h);for(const u of[-1,1]){const d=c?.5:-.1,x=z.norm([.35,d,u]),g=z.norm([-.3,d*.6,u]);o.flat(z.add([0,l,u*.05],z.mul(x,.38*h)),x,z.norm(z.cross(x,[0,1,0])),.4*h,.24*h,Li.spotted(f,v.BELLY,v.BODY3),{group:10+(u>0?1:0)}),o.flat(z.add([-.05,l,u*.05],z.mul(g,.26*h)),g,z.norm(z.cross(g,[0,1,0])),.27*h,.17*h,Li.spotted(a("wingsBig")?v.MAGIC2:v.BODY2,v.BODY2,v.BODY2),{group:12+(u>0?1:0)}),o.chain([[.12,l+.08,u*.03,.015],[.2,l+.25,u*.1,.025],[.24,l+.32,u*.14,.012]],v.BODY2,{group:11})}return o.ell([0,l,0],[.22,.09,.09],v.BELLY,{group:1,paint:u=>Rn(u,30,.25)?v.BODY2:void 0}),o.ell([.17,l+.03,0],[.07,.07,.07],v.BELLY,{group:1}),gi(o,[.17,l+.03,0],[.07,.07,.07],[[.7,.3,.6],[.7,.3,-.6]],.02,s?v.MAGIC2:v.EYE),Sn(o,i,e,n,.5,r)}function qh(i,e,t,n,r="towards"){const s=e===3,a=l=>s&&i.legend.includes(l),o=new et,c=t?.05:0;for(let l=0;l<9;l++){const h=l/8,f=-.6+h*1.15;o.ell([f,.12+Math.sin(h*Math.PI)*(.06+c),0],[.08,.1-h*.02,.12-h*.03],l<2?v.MAGIC2:l%2?v.BODY2:v.BODY,{group:1})}a("lantern")&&o.ell([-.75,.3,0],[.22,.22,.22],v.MAGIC2,{group:3,paint:l=>l[1]<.2?v.MAGIC:void 0});for(let l=0;l<6;l++)o.seg([-.2+l*.12,.05,.08],[-.2+l*.12+(l%2?.02:-.02)*(t?-1:1),0,.12],.015,.01,v.BODY3,{group:7});return o.ell([.6,.14,0],[.06,.06,.08],v.BODY3,{group:1}),gi(o,[.6,.14,0],[.06,.06,.08],[[.6,.3,.7],[.6,.3,-.7]],.015,s?v.MAGIC2:v.EYE),Sn(o,i,e,n,.4,r)}function Kh(i,e,t,n,r="towards"){const s=e===3,a=h=>s&&i.legend.includes(h),o=new et,c=[.15,.28,0];for(const h of[-1,1])for(let f=0;f<4;f++){const u=-.6+f*.4,d=(f+(h>0?0:1)+t)%2?.05:-.05,x=z.add(c,[.05-f*.04,0,h*.1]),g=z.add(x,[Math.cos(u)*.3*(f<2?1:-.6)+d,.3,h*.3]),m=z.add(x,[Math.cos(u)*.55*(f<2?1:-.8)+d*1.5,-.28,h*.55]);o.chain([[...x,.03],[...g,.028],[...m,.015]],h>0?v.BODY2:v.BODY3,{group:h>0?7:2})}o.ell([-.28,.38,0],[.34,.28,.3],v.BODY,{paint:h=>(Math.abs(h[2])<.03||Math.abs(h[0]+.28)<.03)&&h[1]>.45?v.BELLY:void 0}),o.ell(c,[.18,.13,.17],v.BODY2,{group:1}),o.anchors.head={c,r:[.18,.13,.17]},o.anchors.eyes={pts:[[.05,.05],[.05,-.05]].map(([h,f])=>et.surface(c,[.18,.13,.17],z.norm([.9,h*6,f*4]))),size:.03},o.anchors.neck={c:[-.02,.32,0],r:.15,dir:[1,0,0]};const l=a("eyesRing");for(const[h,f]of[[.05,.05],[.05,-.05],[.02,.1],[.02,-.1]])o.ell(et.surface(c,[.18,.13,.17],z.norm([.9,h*6,f*4])),[.025,.025,.025],l?v.MAGIC2:v.EYE,{group:1});if(l)for(let h=0;h<5;h++){const f=Math.PI*(.2+h/4*.6);o.ell([-.3+Math.cos(f)*.2,.75+Math.sin(f)*.35,(h-2)*.12],[.06,.06,.06],v.MAGIC2,{group:95+h,extra:!0})}return Sn(o,i,e,n,.5,r)}const $h=new Map(Object.entries({owl:Fh,hedgehog:Oh,toad:Bh,raven:zh,bat:kh,mole:Gh,beetle:Hh,snail:Vh,woodlouse:Wh,snake:Xh,moth:Yh,glowworm:qh,spider:Kh})),tl=[{id:"wolf",name:"Wolf",plan:"quad",hue:.08,sat:.24,val:.56,legend:["wings","mane"],q:{len:.64,chest:.42,tuck:.6,neck:.32,neckAng:.7,neckW:.42,hr:.26,snout:.82,snoutD:.7,ear:"point",earS:.82,tail:"brush",paw:"paw",legW:1.25,saddle:!0,belly:!0},tail:"up"},{id:"fox",name:"Fox",plan:"quad",q:{hgt:.8,len:.62,chest:.4,tuck:.5,neck:.3,neckAng:.7,neckW:.32,hr:.24,snout:1.05,snoutD:.5,snoutTaper:.6,ear:"point",earS:1.35,tail:"bushy",paw:"paw",legW:.9,belly:!0,socks:.3},hue:.06,sat:.8,val:.9,belly:"white",legend:["tails"]},{id:"badger",name:"Badger",plan:"quad",q:{hgt:.62,len:.78,chest:.2,tuck:.22,neck:.18,neckAng:.1,neckW:.5,hr:.26,snout:1,snoutD:.55,snoutTaper:.55,ear:"round",earS:.7,tail:"stub",paw:"paw",legW:1.35,legMat:v.BODY3,face:"badger",shaggy:!0},hue:.65,sat:.08,val:.45,legend:["crystals"]},{id:"boar",name:"Boar",plan:"quad",hue:.07,sat:.62,val:.5,legend:["tusksBig"],q:{len:.72,chest:.34,tuck:.42,neck:.2,neckAng:-.15,neckW:.55,hr:.27,snout:1.25,snoutD:.62,snoutTaper:.55,ear:"small",earS:.8,tail:"thin",paw:"hoof",legW:1.15,ridge:!0,tusks:!0,back:"hump",disc:!0},ridge:!0},{id:"stag",name:"Stag",plan:"quad",q:{hgt:1.3,len:.6,chest:.6,tuck:.7,neck:.55,neckAng:.95,neckW:.32,hr:.2,snout:1.15,snoutD:.6,snoutTaper:.65,ear:"point",earS:1.1,tail:"deer",paw:"hoof",legW:.75,antlers:"branch",rump:!0,spots:"young",belly:!0},hue:.08,sat:.5,val:.7,legend:["antlersGlow"]},{id:"hare",name:"Hare",plan:"quad",q:{hgt:.72,len:.5,chest:.4,tuck:.45,neck:.2,neckAng:.9,neckW:.35,hr:.27,snout:.65,snoutD:.7,ear:"long",earS:2.4,tail:"puff",paw:"paw",legW:.85,haunch:1.35,hindFoot:1.6,back:"arch",belly:!0,whiskers:!0},hue:.08,sat:.4,val:.72,legend:["jackalope"]},{id:"owl",name:"Owl",plan:"owl",hue:.08,sat:.5,val:.55,legend:["eyesRing","wings"]},{id:"bear",name:"Bear",plan:"quad",q:{hgt:1.15,len:.72,chest:.38,tuck:.4,neck:.25,neckAng:.3,neckW:.55,hr:.28,snout:.7,snoutD:.62,snoutTaper:.7,ear:"round",earS:.8,tail:"stub",paw:"paw",legW:1.55,back:"hump",muzzle:!0,shaggy:!0},hue:.07,sat:.55,val:.42,legend:["moss"]},{id:"hedgehog",name:"Hedgehog",plan:"hedgehog",hue:.08,sat:.4,val:.5,legend:["crystals"]},{id:"squirrel",name:"Squirrel",plan:"quad",q:{hgt:.55,len:.45,chest:.35,tuck:.4,neck:.2,neckAng:.9,neckW:.35,hr:.3,snout:.55,snoutD:.65,ear:"tuft",earS:1.1,tail:"squirrel",paw:"paw",legW:.8,haunch:1.3,back:"arch",belly:!0,whiskers:!0},hue:.03,sat:.75,val:.75,belly:"white",legend:["starTail"]},{id:"toad",name:"Toad",plan:"toad",hue:.2,sat:.5,val:.55,legend:["crown"]},{id:"otter",name:"Otter",plan:"quad",q:{hgt:.55,len:1,chest:.25,tuck:.25,neck:.3,neckAng:.35,neckW:.5,hr:.27,snout:.6,snoutD:.7,ear:"round",earS:.5,tail:"otter",paw:"paw",legW:1.1,muzzle:!0,belly:!0,whiskers:!0},hue:.07,sat:.55,val:.45,belly:"white",legend:["ribbons"]},{id:"lynx",name:"Lynx",plan:"quad",q:{hgt:.9,len:.55,chest:.5,tuck:.55,neck:.25,neckAng:.8,neckW:.4,hr:.27,snout:.5,snoutD:.75,snoutTaper:.8,ear:"tuft",earS:1,tail:"bob",paw:"paw",legW:1.2,cheeks:!0,spots:!0,belly:!0,whiskers:!0},hue:.09,sat:.45,val:.75,legend:["mane"]},{id:"elk",name:"Elk",plan:"quad",q:{hgt:1.4,len:.68,chest:.6,tuck:.66,neck:.45,neckAng:.75,neckW:.42,hr:.24,snout:1.6,snoutD:.9,snoutTaper:.85,ear:"point",earS:.9,tail:"stub",paw:"hoof",legW:.9,back:"hump",antlers:"palm",shaggy:!0},hue:.07,sat:.55,val:.38,legend:["antlersGlow","moss"]},{id:"raven",name:"Raven",plan:"raven",hue:.68,sat:.35,val:.3,legend:["wings","eyesRing"]},{id:"bat",name:"Bat",plan:"bat",hue:.78,sat:.25,val:.45,legend:["wingsBig"]},{id:"mole",name:"Mole",plan:"mole",hue:.7,sat:.15,val:.32,legend:["crown"]},{id:"beaver",name:"Beaver",plan:"quad",q:{hgt:.6,len:.65,chest:.2,tuck:.22,neck:.2,neckAng:.4,neckW:.55,hr:.28,snout:.6,snoutD:.75,ear:"round",earS:.45,tail:"flat",paw:"paw",legW:1.2,back:"arch",teeth:!0,whiskers:!0},hue:.06,sat:.6,val:.45,legend:["moss"]},{id:"stoat",name:"Stoat",plan:"quad",q:{hgt:.5,len:1,chest:.3,tuck:.33,neck:.35,neckAng:.6,neckW:.32,hr:.25,snout:.6,snoutD:.6,ear:"round",earS:.6,tail:"stoat",paw:"paw",legW:.8,belly:!0,back:"arch",whiskers:!0},hue:.1,sat:.25,val:.92,legend:["ribbons","mane"]},{id:"snail",name:"Snail",plan:"snail",hue:.08,sat:.45,val:.55,legend:["glowShell"]},{id:"ram",name:"Ram",plan:"quad",q:{hgt:.95,len:.6,chest:.48,tuck:.52,neck:.22,neckAng:.45,neckW:.48,hr:.25,snout:.85,snoutD:.75,snoutTaper:.8,ear:"small",earS:.7,tail:"stub",paw:"hoof",legW:.9,wool:!0,horns:"curl",face:"dark"},hue:.1,sat:.12,val:.88,legend:["hornsGlow"]},{id:"woodlouse",name:"Woodlouse",plan:"woodlouse",hue:.65,sat:.12,val:.45,legend:["crystals"]},{id:"snake",name:"Snake",plan:"snake",hue:.25,sat:.45,val:.45,legend:["wings"]},{id:"moth",name:"Moth",plan:"moth",hue:.1,sat:.3,val:.7,legend:["wingsBig"]},{id:"marten",name:"Pine marten",plan:"quad",q:{hgt:.55,len:.78,chest:.35,tuck:.38,neck:.3,neckAng:.55,neckW:.35,hr:.25,snout:.65,snoutD:.6,ear:"round",earS:.9,tail:"bushy",paw:"paw",legW:.85,belly:!0,back:"arch"},hue:.07,sat:.6,val:.45,legend:["mane"]},{id:"salamander",name:"Salamander",plan:"quad",q:{hgt:.42,len:.9,chest:.14,tuck:.14,neck:.12,neckAng:.05,neckW:.5,hr:.27,snout:.55,snoutD:.55,ear:"none",tail:"otter",paw:"paw",legW:1,spots:!0,spotMat:"belly"},hue:.1,sat:.1,val:.22,belly:"yellow",legend:["flames"]},{id:"glowworm",name:"Glow-worm",plan:"glowworm",hue:.12,sat:.4,val:.35,legend:["lantern"]},{id:"spider",name:"Spider",plan:"spider",hue:.07,sat:.45,val:.4,legend:["eyesRing"]},{id:"dormouse",name:"Dormouse",plan:"quad",q:{hgt:.38,len:.45,chest:.35,tuck:.38,neck:.15,neckAng:.6,neckW:.4,hr:.34,snout:.45,snoutD:.7,ear:"round",earS:.85,tail:"squirrel",paw:"paw",legW:.8,back:"arch",belly:!0,whiskers:!0,eyeK:1.6},hue:.09,sat:.6,val:.75,belly:"white",legend:["starTail"]},{id:"beetle",name:"Stag beetle",plan:"beetle",hue:.78,sat:.5,val:.35,legend:["horn","crystals"]}],su=Object.fromEntries(tl.map(i=>[i.id,i])),eo=[[[255,70,170],[255,245,250],[255,230,70]],[[40,220,255],[255,236,60],[255,80,180]],[[150,80,255],[175,255,60],[255,255,255]]],to={sneakers:[[255,70,90],[250,250,245]],glitter:[[215,215,235],[190,190,210]],platform:[[160,60,230],[40,30,52]]},Zh=["bar","star","heart"];function Jh(i,e=!0){const t=Zs((i|0)*7919+17),n=t()<.12;return{collar:e,hat:n||t()<.45?Math.floor(t()*eo.length):null,glasses:n||t()<.4?Zh[t()<.6?0:t()<.5?1:2]:null,shoes:n||t()<.4?Object.keys(to)[Math.floor(t()*3)]:null}}function Qh(i,e,t=null){const n=jh(i,e);if(!t)return n;if(t.collar&&(n[v.COLLAR]=Array.isArray(t.collar)?t.collar:n[v.MAGIC]),t.hat!=null){const[r,s,a]=eo[t.hat%eo.length];n[v.HAT1]=r,n[v.HAT2]=s,n[v.POM]=a}if(t.glasses&&(n[v.SHADES]=[22,18,32],n[v.FRAME]=t.glasses==="heart"?[255,60,110]:[255,90,210]),t.shoes){const[r,s]=to[t.shoes]||to.sneakers;n[v.SHOE]=r,n[v.SOLE]=s}if(t.woken){n[v.WOKEN]=[255,40,36];for(const r of[v.BODY,v.BODY2,v.BODY3,v.BELLY,v.ACCENT,v.EAR])n[r]&&(n[r]=n[r].map((s,a)=>Math.round(s*.72+[30,8,12][a]*.1)))}return n}function jh(i,e){const t=su[i],n=e.cVal/.85,r=e.cSat/.6,s=we(t.hue,t.sat*r*e.sat,t.val*n),a=t.belly==="yellow"?[240,196,40]:t.belly==="white"||t.q?.face==="badger"?[236,232,222]:we(t.hue+.03,t.sat*.5*r,Math.min(1,t.val*n*1.3+.08)),o=we(e.magicHue+t.hue*.3,.6,1),c=we(e.magicHue+t.hue*.3,.18,1),l=["boar","stag","elk","ram"].includes(t.id);return{[v.BODY]:s,[v.BODY2]:we(t.hue+.02,Math.min(1,t.sat*r*1.2+.05),t.val*n*.66),[v.BODY3]:we(t.hue+.03,Math.min(1,t.sat*r*1.3+.1),t.val*n*.4),[v.BELLY]:a,[v.ACCENT]:l?[236,226,200]:we(t.hue+.05,t.sat*.6,Math.min(1,t.val*n*.5+.25)),[v.MAGIC]:o,[v.MAGIC2]:c,[v.LEAF]:we(.3,.55,.55),[v.LEAF2]:we(.25,.5,.75),[v.LEAF3]:we(.33,.6,.35),[v.TRUNK]:we(.07,.45,.32),[v.EYE]:[24,18,30],[v.PUPIL]:[70,40,90],[v.GLINT]:[255,255,245],[v.NOSE]:[38,28,36],[v.EAR]:we(t.hue+.97,Math.min(1,t.sat*.6+.2),Math.min(1,t.val*n*.55+.2)),[v.IRIS]:t.plan==="owl"?[255,176,40]:we(.12,.7,.85),[v.SKIN]:[238,158,192]}}const ef=["size","growth","pixel","head","eye","legs","long","fur"],Er=new Map;function tf(i,e,t,n,r="towards",s=null){const a=su[i]||tl[0],o=s&&(s.collar||s.hat!=null||s.glasses||s.shoes||s.woken)?s:null,c=[a.id,e,t,r,...ef.map(h=>n[h]),o?[!!o.collar,o.hat??"",o.glasses||"",o.shoes||"",!!o.woken].join(","):""].join("|");let l=Er.get(c);if(!l){if(l=Lh(o,()=>a.q?Ih(a,e,t,n,r):$h.get(a.plan)(a,e,t,n,r)),o?.woken)for(let h=0;h<l.m.length;h++)(l.m[h]===v.EYE||l.m[h]===v.IRIS||l.m[h]===v.PUPIL)&&(l.m[h]=v.WOKEN);Er.size>600&&Er.delete(Er.keys().next().value),Er.set(c,l)}return l}const js=.07,nl=.048,qe=(...i)=>({l:i}),vt=(i,e,t,n,r)=>({a:[i,e,t,n,r]}),Wt=(i,e)=>({d:[i,e]}),ut=(i,e=.86)=>qe([.5,e],[.5,i]),ht=vt(.5,.76,.13,25,155),nf=i=>i.l?{l:i.l.map(([e,t])=>[1-e,t])}:i.a?{a:[1-i.a[0],i.a[1],i.a[2],180-i.a[3],180-i.a[4]]}:{d:[1-i.d[0],i.d[1]]},ft=(...i)=>i.flatMap(e=>[e,nf(e)]);function Hn(i,e,t){const n=e[0]-i[0],r=e[1]-i[1],s=Math.hypot(n,r),a=t*s,o=(s*s/4+a*a)/(2*Math.abs(a)),c=(i[0]+e[0])/2,l=(i[1]+e[1])/2,h=r/s,f=-n/s,u=(o-Math.abs(a))*Math.sign(a),d=c-h*u,x=l-f*u,g=Math.atan2(i[1]-x,i[0]-d)*180/Math.PI;let p=Math.atan2(e[1]-x,e[0]-d)*180/Math.PI-g;for(;p>180;)p-=360;for(;p<-180;)p+=360;return vt(d,x,o,g,g+p)}const rf=(i,e,t,n,r,s=24)=>qe(...Array.from({length:s+1},(a,o)=>[i+n*Math.sin(o/s*r*2*Math.PI),e+(t-e)*o/s])),sf=(i,e,t,n,r,s=0,a=40)=>qe(...Array.from({length:a+1},(o,c)=>{const l=c/a,h=(s+l*r*360)*Math.PI/180,f=t+(n-t)*l;return[i+f*Math.cos(h),e+f*Math.sin(h)]})),$r=(i,e,t,n,r)=>r.map(s=>{const a=Math.cos(s*Math.PI/180),o=Math.sin(s*Math.PI/180);return qe([i+t*a,e+t*o],[i+n*a,e+n*o])}),af={wolf:[ut(.3),qe([.28,.08],[.5,.3],[.72,.08]),vt(.5,.55,.2,-55,55),ht,Wt(.5+.2*Math.cos(-55*Math.PI/180),.55+.2*Math.sin(-55*Math.PI/180))],fox:[ut(.34),qe([.36,.06],[.5,.34],[.64,.06]),vt(.67,.66,.17,180,-80),Wt(.67+.17*Math.cos(-80*Math.PI/180),.66+.17*Math.sin(-80*Math.PI/180)),ht],badger:[ut(.1),qe([.24,.3],[.76,.3]),...ft(qe([.33,.14],[.33,.56])),ht,...ft(Wt(.24,.3))],boar:[ut(.16),...ft(vt(.36,.24,.15,45,180)),...$r(.5,.16,0,.1,[-130,-90,-50]),ht],stag:[ut(.42),...ft(qe([.5,.42],[.34,.26],[.3,.06]),qe([.335,.25],[.16,.2]),qe([.32,.15],[.18,.07])),ht],hare:[ut(.44),...ft(qe([.5,.44],[.4,.34],[.38,.06])),vt(.62,.66,.09,180,540),ht,...ft(Wt(.38,.06))],owl:[ut(.44),...ft(vt(.33,.3,.13,0,360),qe([.24,.18],[.18,.05])),ht,...ft(Wt(.33,.3))],bear:[ut(.24),qe([.24,.3],[.76,.3]),...ft(vt(.3,.3,.09,180,360)),...ft(qe([.36,.5],[.32,.62])),ht],hedgehog:[ut(.52),vt(.5,.52,.2,180,360),...$r(.5,.52,.22,.34,[-160,-125,-90,-55,-20]),ht],squirrel:[ut(.2),qe([.5,.2],[.4,.08]),vt(.66,.4,.16,100,-200),Wt(.66+.16*Math.cos(-200*Math.PI/180),.4+.16*Math.sin(-200*Math.PI/180)),ht],toad:[ut(.42),qe([.16,.54],[.24,.42],[.76,.42],[.84,.54]),...ft(vt(.34,.3,.1,0,360)),ht,...ft(Wt(.16,.54))],otter:[ut(.24),vt(.5,.5,.28,-100,100),Wt(.5+.28*Math.cos(-100*Math.PI/180),.5+.28*Math.sin(-100*Math.PI/180)),Hn([.18,.64],[.36,.64],.3),ht],lynx:[ut(.32),qe([.26,.2],[.5,.32],[.74,.2]),...ft(qe([.26,.2],[.26,.06])),qe([.5,.68],[.66,.62]),ht,...ft(Wt(.26,.06))],elk:[ut(.3),...ft(qe([.5,.3],[.42,.2]),vt(.3,.16,.12,0,180),qe([.18,.16],[.14,.06])),qe([.5,.44],[.6,.52]),ht],raven:[ut(.14),qe([.5,.14],[.3,.22]),qe([.18,.56],[.5,.38],[.82,.56]),ht,Wt(.58,.17),...ft(Wt(.18,.56))],bat:[ut(.3),vt(.5,.16,.14,20,160),...ft(qe([.5,.38],[.12,.26]),Hn([.12,.26],[.24,.46],-.25),Hn([.24,.46],[.38,.5],-.3),Hn([.38,.5],[.5,.52],-.3)),ht],mole:[ut(.44),vt(.5,.3,.16,0,180),...$r(.5,.3,.19,.3,[-160,-125,-55,-20]),qe([.5,.14],[.5,.04]),ht],beaver:[ut(.36),qe([.32,.2],[.68,.2]),...ft(qe([.44,.2],[.44,.34])),qe([.5,.56],[.68,.66],[.5,.76],[.32,.66],[.5,.56]),ht],stoat:[ut(.18),vt(.5,.44,.24,180,360),qe([.5,.18],[.6,.08]),ht,...ft(Wt(.26,.44))],snail:[ut(.52),sf(.5,.33,.03,.2,1.6,90),qe([.66,.2],[.76,.06]),ht,Wt(.76,.06)],ram:[ut(.24),...ft(vt(.36,.24,.14,0,-250)),ht,...ft(Wt(.36+.14*Math.cos(-250*Math.PI/180),.24+.14*Math.sin(-250*Math.PI/180)))],woodlouse:[ut(.24),vt(.5,.52,.22,205,335),vt(.5,.66,.24,205,335),vt(.5,.38,.2,205,335),...ft(qe([.5,.24],[.32,.06])),ht],snake:[ut(.16),rf(.5,.82,.2,.2,1.25),qe([.5,.2],[.5,.11]),...ft(qe([.5,.11],[.42,.045])),ht],moth:[ut(.2),...ft(qe([.5,.3],[.16,.18],[.24,.5],[.5,.4]),qe([.5,.5],[.3,.64],[.5,.66]),vt(.38,.16,.12,0,-110)),ht],marten:[ut(.32),qe([.3,.2],[.5,.32],[.7,.2]),...ft(vt(.3,.14,.07,90,-180)),vt(.28,.56,.22,0,150),Wt(.28+.22*Math.cos(150*Math.PI/180),.56+.22*Math.sin(150*Math.PI/180)),ht],salamander:[ut(.3),Hn([.5,.3],[.5,.06],.35),Hn([.5,.3],[.5,.06],-.35),...ft(qe([.5,.42],[.32,.38],[.26,.48]),qe([.5,.64],[.32,.6],[.26,.7])),ht,...ft(Wt(.38,.52))],glowworm:[ut(.4),vt(.5,.27,.1,90,450),...$r(.5,.27,.15,.25,[0,60,120,180,240,300]),ht],spider:[qe([.5,.05],[.5,.3]),ut(.5),vt(.5,.4,.11,-90,270),...ft(...[-150,-170,170,150].map(i=>qe([.5+.12*Math.cos(i*Math.PI/180),.4+.12*Math.sin(i*Math.PI/180)],[.5+.28*Math.cos(i*Math.PI/180),.4+.28*Math.sin(i*Math.PI/180)],[.5+.32*Math.cos(i*Math.PI/180),.4+.28*Math.sin(i*Math.PI/180)+.1]))),ht,Wt(.5,.05)],dormouse:[ut(.12),vt(.5,.46,.24,-60,250),...ft(vt(.34,.16,.08,90,-180)),Hn([.56,.38],[.7,.38],-.4),ht],beetle:[ut(.36),...ft(vt(.66,.26,.2,160,250)),Hn([.5,.38],[.5,.82],.25),Hn([.5,.38],[.5,.82],-.25),ht]},Ol={pink:[255,64,200],cyan:[50,235,255],acid:[175,255,45],violet:[165,95,255],orange:[255,135,35],lemon:[255,238,70],red:[255,55,95],mint:[70,255,175],blue:[70,145,255],magenta:[235,70,255]},of={badger:"pink",boar:"cyan",snail:"acid",fox:"violet",ram:"orange",woodlouse:"lemon",hedgehog:"red",squirrel:"mint",wolf:"blue",stag:"magenta",stoat:"pink",snake:"cyan",hare:"acid",owl:"violet",bear:"orange",toad:"lemon",otter:"red",lynx:"mint",elk:"blue",raven:"magenta",bat:"pink",mole:"cyan",beaver:"acid",beetle:"violet",moth:"orange",marten:"lemon",salamander:"red",glowworm:"mint",spider:"blue",dormouse:"magenta"},ea=i=>Ol[of[i]]||Ol.cyan,lf=[255,255,250],cf=(i,e,t)=>i.map((n,r)=>Math.round(n+(e[r]-n)*t)),Bl=i=>`rgb(${i.join(",")})`;function uf(i=0){const e=Math.max(0,i);return{level:e,metres:2+e+Math.max(0,e-2)*.5,core:1+.2*e,halo:Math.min(1,.45+.19*e),rings:e>=4?3:e>=3?2:e>=2?1:0,dots:e>=1&&e<2?12:0,band:e>=3,rays:e>=4?8:e>=3?4:0,shimmer:e>=3}}function Ts(i){if(i.d)return{dot:!0,pts:[i.d],len:nl*2};let e=i.l;if(i.a){const[n,r,s,a,o]=i.a,c=Math.max(6,Math.ceil(Math.abs(o-a)/8));e=Array.from({length:c+1},(l,h)=>{const f=(a+(o-a)*h/c)*Math.PI/180;return[n+s*Math.cos(f),r+s*Math.sin(f)]})}let t=0;for(let n=1;n<e.length;n++)t+=Math.hypot(e[n][0]-e[n-1][0],e[n][1]-e[n-1][1]);return{dot:!1,pts:e,len:t}}const no=(i,e=0,t=1)=>{const n=i.reduce((s,a)=>s+a.len,0)||1;let r=0;for(const s of i)s.start=e+(t-e)*r/n,r+=s.len,s.end=e+(t-e)*r/n;return i},da=new Map;function au(i){return da.has(i)||da.set(i,no((af[i]||[]).map(e=>({...Ts(e),w:js,part:"sigil"})))),da.get(i)}const pa=new Map;function hf(i,e=0){const t=i+":"+e;if(pa.has(t))return pa.get(t);const n=e===null?null:uf(e),r=n?n.rings>=2?.6:n.rings||n.dots?.66:.8:1,s=(1-r)/2,a=n?n.core:1,o=js*.55*((n?.level??0)<3?1:Math.min(1.6,.8+.25*n.level)),c=[];if(n){const d=x=>Ts({a:[.5,.5,x,90,450]});for(let x=0;x<n.rings;x++)c.push({...d(.44-x*.06),w:o,part:"ring"});for(let x=0;x<n.dots;x++){const g=(90+x*360/n.dots)*Math.PI/180;c.push({dot:!0,pts:[[.5+.44*Math.cos(g),.5+.44*Math.sin(g)]],len:.05,r:.042,w:o,part:"ring"})}if(n.band&&n.rings>=2)for(let x=0;x<16;x++){const g=(90+x*22.5)*Math.PI/180,m=.44-.06+.014,p=.44-.014;c.push({...Ts({l:[[.5+m*Math.cos(g),.5+m*Math.sin(g)],[.5+p*Math.cos(g),.5+p*Math.sin(g)]]}),w:o*.8,part:"band"})}for(let x=0;x<n.rays;x++){const g=(90+x*360/n.rays)*Math.PI/180,m=.44+.02,p=.5-o/2;c.push({...Ts({l:[[.5+m*Math.cos(g),.5+m*Math.sin(g)],[.5+p*Math.cos(g),.5+p*Math.sin(g)]]}),w:o*1.3,part:"ray"})}}const l=Math.min(1.25,a),h=au(i).map(u=>({dot:u.dot,len:u.len*r,pts:u.pts.map(([d,x])=>[s+d*r,s+x*r]),w:u.w*r*l,r:nl*r*l,part:"sigil"})),f={level:e,frame:n,k:r,strokes:[...no(c,0,c.length?.15:0),...no(h,c.length?.15:0,1)]};return pa.set(t,f),f}function ff(i,e){if(e>=i.end)return i.pts;if(e<=i.start)return null;if(i.dot)return i.pts;let t=(e-i.start)/(i.end-i.start)*i.len;const n=[i.pts[0]];for(let r=1;r<i.pts.length;r++){const s=i.pts[r-1],a=i.pts[r],o=Math.hypot(a[0]-s[0],a[1]-s[1]);if(t<=o){n.push([s[0]+(a[0]-s[0])*t/o,s[1]+(a[1]-s[1])*t/o]);break}n.push(a),t-=o}return n}function df(i,e,{x:t=0,y:n=0,size:r=64,level:s=null,colour:a=ea(e),progress:o=1,glow:c=!0}={}){const l=hf(e,s),h=l.frame?l.frame.halo:.7;i.save(),i.translate(t,n),i.scale(r,r),i.lineCap="round",i.lineJoin="round";const f=(u,d,x,g)=>{i.globalAlpha=x,i.strokeStyle=i.fillStyle=Bl(u),i.shadowColor=Bl(a),i.shadowBlur=g;for(const m of l.strokes){const p=ff(m,o);if(p){if(i.beginPath(),m.dot){i.arc(p[0][0],p[0][1],m.r*(d>1?1.5:1),0,Math.PI*2),i.fill();continue}i.lineWidth=m.w*d,p.forEach((_,S)=>S?i.lineTo(_[0],_[1]):i.moveTo(_[0],_[1])),i.stroke()}}};c?(f(a,2.4,Math.min(h,.7)*.55,r/12),f(cf(a,lf,.72),.62,1,r/30)):f(a,1,1,0),i.restore()}function pf(i,e,t,n){let r=1/0;for(const s of i){if(s.start>=r)break;if(s.dot){Math.hypot(e-s.pts[0][0],t-s.pts[0][1])<nl+n-js/2&&(r=s.start);continue}let a=0;for(let o=1;o<s.pts.length;o++){const c=s.pts[o-1],l=s.pts[o],h=l[0]-c[0],f=l[1]-c[1],u=h*h+f*f,d=Math.sqrt(u),x=u?Math.max(0,Math.min(1,((e-c[0])*h+(t-c[1])*f)/u)):0;if(Math.hypot(e-c[0]-h*x,t-c[1]-f*x)<n){const g=s.start+(a+x*d)/s.len*(s.end-s.start);g<r&&(r=g)}a+=d}}return r}function mf(i,e,t,n=js/2){return pf(au(i),e,t,n)<1/0}tl.map(i=>i.id);const gf=new Set([v.TRUNK,v.BARK2,v.BARKD,v.BARKL]);function Pi(i,e,t,n,r,s,{mat:a=v.LEAF,group:o=30,ragged:c=1}={}){const h=[];for(let p=0;p<9;p++){const _=p/9*Math.PI*2,S=1+(s()-.5)*.35*(r.clump+.3);h.push([e[0]+Math.cos(_)*t*S,e[1]+Math.sin(_)*n*S*(Math.sin(_)>0?.8:1)])}const f=Math.max(1,Math.round(Math.min(t,n)/3.5));i.shape(Js(h,0,9,f,Math.max(1.2,Math.min(t,n)*.14)*c,1),a,{group:o,line:!1,round:r.round}),i.mark([bt(e,[-t*1.1,n*.15]),bt(e,[t*1.1,n*.1]),bt(e,[t*1.1,n*1.2]),bt(e,[-t*1.1,n*1.2])],v.LEAF3,[a]),i.mark([bt(e,[-t*.75,-n*.55]),bt(e,[t*.25,-n*.95]),bt(e,[t*.55,-n*.35]),bt(e,[-t*.2,-n*.05])],v.LEAF2,[a]);const u=Math.floor(e[0]-t*1.2),d=Math.ceil(e[0]+t*1.2),x=Math.floor(e[1]-n*1.2),g=Math.ceil(e[1]+n*1.2),m=s()*1e4|0;for(let p=x;p<=g;p++)for(let _=u;_<=d;_++){const S=i.get(_,p);if(S!==a&&S!==v.LEAF2&&S!==v.LEAF3)continue;const b=Et(_,p,m),w=ui(_/2,p/2,m)*.5+b*.5;w<.16*r.density?i.recolour(_,p,S===v.LEAF2?a:v.LEAF2):w>1-.16*r.density&&i.recolour(_,p,S===v.LEAF3?a:v.LEAF3)}}function mi(i,e,t,n,r,s,a,o,{mat:c=v.TRUNK,bend:l=1,group:h=10,line:f=!1}={}){const u=[e],d=4;let x=t,g=e;for(let m=1;m<=d;m++)x+=(o()-.5)*.7*a.gnarl*l,g=bt(g,[Math.cos(x)*n/d,Math.sin(x)*n/d]),u.push(g);return i.limb(u.map((m,p)=>[...m,r+(s-r)*p/d]),c,{group:h,line:f,round:a.round,cap:.6,capEnd:1}),{end:g,ang:x,pts:u}}function ta(i,e,t,n,r,s,a){if(i.shape([[e-n*1.05,t],[e-n*.62,t-n*.5],[e-n*.45,t-n*1.4],[e+n*.45,t-n*1.4],[e+n*.62,t-n*.5],[e+n*1.05,t]],v.TRUNK,{group:10,round:r.round}),r.roots<=0)return;const o=Math.round(2+r.roots*4);for(let c=0;c<o;c++){const l=c%2?1:-1,h=(8+s()*16)*a*(.4+r.roots),f=(2+s()*3)*a,u=[e+l*n*.2,t-n*.5],d=[e+l*(n*.55+h*.4),t-f],x=[e+l*(n*.5+h),t-.5];i.limb([[...u,n*.55],[...d,n*.28],[...x,1.2]],v.TRUNK,{group:11,round:r.round,cap:.5,capEnd:.6})}}function na(i,e,t=!0){if(!(e.bark<=0))for(let n=0;n<i.h;n++)for(let r=0;r<i.w;r++){const s=n*i.w+r;if(i.m[s]!==v.TRUNK)continue;const a=t?ui(r/1.3,n/6,21):ui(r/6,n/1.3,21);a>1-e.bark*.42||Et(r,n,4)<e.bark*.05?i.m[s]=v.BARKD:a>1-e.bark*.62&&i.n[s*3]<-.1&&(i.m[s]=v.BARKL)}}function hr(i,e,t){let n=i.w,r=-1,s=i.h;for(let u=0;u<i.h;u++)for(let d=0;d<i.w;d++)i.m[u*i.w+d]&&(n=Math.min(n,d),r=Math.max(r,d),s=Math.min(s,u));if(r<0)return{sp:i,crownY:t};const a=Math.max(e-n,r-e)+2,o=Math.max(0,Math.floor(e-a)),c=Math.min(i.w-o,Math.ceil(a*2)+1),l=Math.max(0,s-1),h=i.h-l,f=new nn(c,h);for(let u=0;u<h;u++)for(let d=0;d<c;d++){const x=(u+l)*i.w+d+o,g=u*c+d;f.m[g]=i.m[x],f.g[g]=i.g[x],f.n[g*3]=i.n[x*3],f.n[g*3+1]=i.n[x*3+1],f.n[g*3+2]=i.n[x*3+2]}return{sp:f,crownY:t-l}}const Vr=i=>(i.crownWidth||3)/3;function ou(i,e,t){const n=Vr(e),r=Math.round(220*t*n+60*t),s=Math.round(140*t),a=new nn(r,s),o=r/2,c=s,l=e.treeTrunks||1,h=12*t*(e.treeThick||1)*(e.treeThin?.55:1)/Math.sqrt(l),f=(i()-.5)*.5*e.gnarl+(e.treeLean||0),u=[];let d=s;const x=(g,m,p,_,S)=>{const b=mi(a,g,m,p,_,_*.65,e,i,{group:12});if(S===0){u.push(b.end);return}const w=i()<.35?3:2;for(let E=0;E<w;E++){const L=(E-(w-1)/2)*ye(i,.5,.85)*(S===3?1.4:1);x(b.end,b.ang+L+(i()-.5)*.25,p*ye(i,.6,.78),_*.62,S-1)}S<=2&&u.push(Zn(g,b.end,.7))};for(let g=0;g<l;g++){const m=f+(l>1?(g/(l-1)-.5)*.8:0),p=[o+(g-(l-1)/2)*h*.6,c],_=mi(a,p,-Math.PI/2+m,s*.36*(l>1?ye(i,.75,1.15):1),h,h*.72,e,i,{bend:1.4});d=Math.min(d,_.end[1]);for(const S of[-1,1])x(_.end,-Math.PI/2+m*.5+S*ye(i,.55,.95)*(.7+.3*n)*(l>1?.6:1),s*.22*(.75+.25*n)*(l>1?.7:1),h*.7,l>2?2:3);if(l===1&&i()<.7&&x(_.end,-Math.PI/2+(i()-.5)*.3,s*.18,h*.55,2),g===0&&e.treeHollow){const S=Zn(p,_.end,.38);a.ellipse(S[0],S[1],h*.28,h*.5,v.NOSE,{round:.3})}}if(ta(a,o,c,h*Math.sqrt(l),e,i,t),na(a,e),e.treeWebs)for(let g=0;g+1<u.length;g+=2){const m=u[g],p=u[g+1],_=Math.hypot(p[0]-m[0],p[1]-m[1]);if(_<40*t)for(let S=0;S<=_;S++){const b=Zn(m,p,S/_);a.px(b[0],b[1]+Math.sin(S/_*Math.PI)*_*.15,v.WEB,0,0,1)}}if(e.treeBare)return hr(a,o,d+4*t);u.sort((g,m)=>g[1]-m[1]);for(const g of u)Pi(a,bt(g,[0,-3*t]),ye(i,14,21)*t,ye(i,10,14)*t,e,i,{mat:i()<.35?v.LEAF3:v.LEAF});for(const g of u)i()<.75&&Pi(a,bt(g,[ye(i,-9,9)*t,ye(i,-12,-3)*t]),ye(i,10,15)*t,ye(i,7,10)*t,e,i);return hr(a,o,d+4*t)}function il(i,e,t){const n=.8+.2*Vr(e),r=Math.round(90*t*n),s=Math.round(160*t),a=new nn(r,s),o=r/2,c=s;a.limb([[o,c,6*t],[o,c-s*.5,4*t],[o,6*t,1.5]],v.TRUNK,{group:10,round:e.round}),ta(a,o,c,6*t,e,i,t*.6),na(a,e);const l=Math.round(ye(i,9,12));for(let h=l-1;h>=0;h--){const f=h/(l-1),u=6*t+f*s*.7,d=(5+f*36)*t*n*ye(i,.9,1.1),x=(5+f*13)*t,g=[[o,u-4*t],[o+d*.5,u+x*.3],[o+d,u+x],[o+d*.7,u+x*1.15],[o,u+x*.7],[o-d*.7,u+x*1.15],[o-d,u+x],[o-d*.5,u+x*.3]];a.shape(Js(g,1,7,Math.max(2,Math.round(d/(3*t))),2*t,1),v.LEAF,{group:30+h,line:!1,round:e.round}),a.mark([[o-d,u+x*.55],[o+d,u+x*.55],[o+d,u+x*1.4],[o-d,u+x*1.4]],v.LEAF3,[v.LEAF]),a.mark([[o-d*.55,u-2*t],[o+d*.1,u-3*t],[o+d*.1,u+x*.45],[o-d*.7,u+x*.7]],v.LEAF2,[v.LEAF])}return hr(a,o,s*.82)}function lu(i,e,t){const n=Vr(e),r=Math.round(200*t*n+50*t),s=Math.round(130*t),a=new nn(r,s),o=r/2,c=s,l=13*t,h=mi(a,[o,c],-Math.PI/2+(i()-.5)*.3,s*.3,l,l*.8,e,i,{bend:1.6}),f=[];for(let x=0;x<5;x++){const g=x%2?1:-1,m=-Math.PI/2+g*ye(i,.55,1.25)*(.7+.3*n),p=mi(a,h.end,m,s*ye(i,.3,.42)*(.8+.2*n),l*.55,l*.3,e,i,{group:12});f.push(p.end)}ta(a,o,c,l,e,i,t),na(a,e);for(const x of f)Pi(a,bt(x,[0,-2*t]),ye(i,20,28)*t,ye(i,9,12)*t,e,i);Pi(a,bt(h.end,[0,-8*t]),24*t,11*t,e,i);let u=r,d=0;for(const x of f)u=Math.min(u,x[0]-22*t),d=Math.max(d,x[0]+22*t);for(let x=u;x<d;x+=ye(i,1,1.7)){let g=s;for(let S=0;S<s;S++)if(a.get(x,S)===v.LEAF||a.get(x,S)===v.LEAF2||a.get(x,S)===v.LEAF3){g=S;break}if(g>=s)continue;const m=Math.abs(x-o)/(r/2),p=(c-g)*ye(i,.5,.9)*(1-m*.3),_=Et(x|0,1,9)<.4?v.LEAF2:v.LEAF;for(let S=g+2;S<Math.min(c-2,g+p);S++){const b=Math.round(Math.sin(S*.12+x)*.7);Et(x|0,S,5)<.2+e.density*.8&&a.px(x+b,S,(S-g)/p>.8?v.LEAF3:_,b*.3,.2,.95)}}return hr(a,o,h.end[1]+6*t)}function cu(i,e,t){const n=.7+.3*Vr(e),r=Math.round(110*t*n),s=Math.round(155*t),a=new nn(r,s),o=r/2,c=s,l=(i()-.5)*.25+(e.treeLean||0),h=mi(a,[o,c],-Math.PI/2+l,s*.85,5*t,2*t,e,i,{mat:v.BARK2,bend:.4});for(let u=0;u<h.pts.length-1;u++)for(let d=0;d<1;d+=1/8){const x=Zn(h.pts[u],h.pts[u+1],d+i()*.1);if(i()<.55)for(let g=-3;g<=3;g++)a.get(x[0]+g,x[1])===v.BARK2&&i()<.8&&a.recolour(x[0]+g,x[1],v.BARKD)}const f=[h.end];for(let u=0;u<7;u++){const d=ye(i,.35,.9),x=Zn(h.pts[0],h.end,d),g=u%2?1:-1,m=mi(a,x,-Math.PI/2+g*ye(i,.5,1),s*ye(i,.12,.2)*n,2*t,1,e,i,{mat:v.BARKD,group:12});f.push(m.end)}for(const u of f)Pi(a,u,ye(i,9,13)*t*n,ye(i,7,10)*t,e,i,{mat:v.LEAF2,ragged:1.3});return hr(a,o,s*.55)}function uu(i,e,t){const n=Vr(e),r=Math.round(220*t*n+50*t),s=Math.round(120*t),a=new nn(r,s),o=r/2,c=s,l=10*t,h=mi(a,[o,c],-Math.PI/2+(i()-.5)*.4*(e.gnarl+.3),s*.4,l,l*.75,e,i,{bend:1.2}),f=[];for(const x of[-1,1,-1,1]){const g=mi(a,h.end,-Math.PI/2+x*ye(i,.7,1.15)*(.7+.3*n),s*ye(i,.3,.42)*(.7+.3*n),l*.55,l*.25,e,i,{group:12});f.push(g.end,Zn(h.end,g.end,.55))}ta(a,o,c,l,e,i,t),na(a,e);const u=Math.round(ye(i,2,3)),d=Math.min(...f.map(x=>x[1]));for(let x=0;x<u;x++){const g=d-6*t+x*9*t,m=(95-x*12)*t*(.65+.35*n);for(let p=0;p<5;p++)Pi(a,[o+(p-2)*m*.36+ye(i,-5,5)*t,g+ye(i,-3,3)*t],m*ye(i,.2,.26),7*t,e,i,{mat:x===u-1?v.LEAF:v.LEAF3})}return hr(a,o,h.end[1]+4*t)}function rl(i,e,t){const n=e.leafHue+(i()-.5)*e.leafVariety*.7+(t===il?.06:0);return{[v.TRUNK]:we(e.trunkHue,.45*e.sat,.34),[v.BARKD]:we(e.trunkHue+.03,.5*e.sat,.17),[v.BARKL]:we(e.trunkHue-.01,.38*e.sat,.5),[v.BARK2]:[222,220,212],[v.LEAF]:we(n,.62*e.sat,.58),[v.LEAF2]:we(n-.05,.55*e.sat,.8),[v.LEAF3]:we(n+.03,.66*e.sat,.38),[v.WEB]:[225,225,232]}}function xf(i){const{sp:e,crownY:t}=i,n=new nn(e.w,e.h),r=new nn(e.w,e.h);for(let s=0;s<e.h;s++)for(let a=0;a<e.w;a++){const o=s*e.w+a,c=e.m[o];if(!c)continue;(gf.has(c)&&s>=t?r:n).put(a,s,c,e.n[o*3],e.n[o*3+1],e.n[o*3+2])}return{top:n,bot:r}}function vf(i,e){const t=e.bushSize,n=Qc(i,["round","round","fern","grass","shrub"]),r=Math.round(40*t),s=Math.round(28*t),a=new nn(r,s);if(n==="round"||n==="shrub"){const c=n==="shrub"?5:3;for(let l=0;l<c;l++)Pi(a,[r/2+ye(i,-9,9)*t,s-8*t+ye(i,-4,2)*t],ye(i,7,10)*t,ye(i,5,8)*t,e,i);if(n==="shrub"||i()<e.flowers)for(let l=0;l<18*e.flowers+3;l++){const h=r/2+ye(i,-12,12)*t,f=s-ye(i,5,17)*t;a.get(h,f)&&a.recolour(h,f,v.FLOWER)}}else if(n==="fern")for(let c=0;c<7;c++){const l=-Math.PI/2+(c/6-.5)*2.4;let h=r/2,f=s-1;for(let u=0;u<15*t;u++)h+=Math.cos(l)*.9,f+=Math.sin(l)*.9+u*.06,a.put(h,f,c%2?v.LEAF3:v.LEAF,Math.cos(l)*.4,-.2,.9),u%2&&(a.put(h,f-1,v.LEAF2,0,-.5,.85),a.put(h+Math.sign(Math.cos(l)),f+1,v.LEAF,0,.3,.9))}else for(let c=0;c<18*t;c++){const l=r/2+ye(i,-13,13)*t,h=ye(i,5,15)*t,f=ye(i,-3,3);for(let u=0;u<h;u++)a.put(l+f*u/h*(u/h),s-1-u,u>h*.65?v.LEAF2:u<h*.3?v.LEAF3:v.LEAF,f*.1,-.3,.9)}const o=rl(i,e,null);return o[v.FLOWER]=we(i(),.55,.95),{sp:a,colours:o}}const st=(i,e={})=>["tree",{type:i,...e}],Fe=(i,e={})=>[i,e],sl=[{id:"moor",name:"Moor",creature:"badger",by:"Ed",leaf:.24,floor:["moss",.26,.45,.42],text:{floor:"moss",wall:"puddles, a lake",small:"long grass",big:"moss mounds"},wall:[Fe("water",{w:1.6})],small:[Fe("grass",{h:1.4})],big:[Fe("mound",{moss:!0})]},{id:"fern-forest",name:"Fern forest",creature:"boar",by:"Ed",leaf:.3,floor:["needles",.08,.45,.32],text:{floor:"pine needles",small:"ferns",big:"pine trees"},small:[Fe("fern")],big:[st("fir")]},{id:"muddy-forest",name:"Muddy forest",creature:"snail",by:"Ed",leaf:.22,floor:["mud",.07,.5,.28],text:{floor:"mud and leaves",small:"short trunks with broken branches",big:"trees with many trunks and branches"},small:[Fe("stump",{snag:!0})],big:[st("broad",{trunks:3,gnarl:.9})]},{id:"stone-shrine",name:"Stone shrine",creature:"fox",by:"Ed",leaf:.28,floor:["stony",.25,.3,.45],text:{floor:"grassy, stony",wall:"mossy henges",small:"little stones",big:"big stones",set:"a shrine"},wall:[Fe("henge")],small:[Fe("stones")],big:[Fe("boulder")],set:Fe("shrine")},{id:"tangly-forest",name:"Tangly forest",creature:"ram",by:"Ed",leaf:.27,floor:["nettles",.28,.5,.3],text:{floor:"nettles and earth",small:"tangled branches",big:"fairly short tangly trees"},small:[Fe("bramble",{bare:!0})],big:[st("broad",{scale:.7,gnarl:1})]},{id:"wispy-forest",name:"Wispy forest",creature:"woodlouse",by:"Ed",leaf:.2,floor:["leaves",.09,.55,.45],text:{floor:"dry leaves",small:"tall thin wispy trees",big:"thick trees with several trunks"},small:[st("birch",{scale:.75})],big:[st("broad",{trunks:3,thick:1.4})]},{id:"hazel-forest",name:"Hazel forest",creature:"hedgehog",by:"Ed",leaf:.26,floor:["grass",.24,.45,.45],text:{floor:"short grass",small:"brown lumps",big:"crooked trees with many branches"},small:[Fe("mound",{brown:!0})],big:[st("broad",{gnarl:1,scale:.85})]},{id:"garden",name:"Garden",creature:"squirrel",by:"Ed",leaf:.3,floor:["lawn",.27,.5,.5],text:{floor:"uniform grass",wall:"ornate stone wall",small:"manicured flower beds",big:"willows",set:"a stone pavilion"},wall:[Fe("wall")],small:[Fe("flowerbed")],big:[st("willow")],set:Fe("pavilion")},{id:"twiggy-forest",name:"Twiggy forest",creature:"wolf",by:"Ed",leaf:.29,floor:["plants",.3,.5,.38],text:{floor:"small leafy plants",small:"small trees with many thin trunks",big:"straight but slanted trees with many trunks"},small:[st("broad",{trunks:4,scale:.5,thin:!0})],big:[st("broad",{trunks:3,lean:.3,gnarl:.1})]},{id:"ancient",name:"Ancient",creature:"stag",by:"Ed",leaf:.31,floor:["roots",.1,.25,.35],text:{floor:"mossy roots over rocks",small:"sorrel",big:"giant gnarly slanted trees"},small:[Fe("flowers",{hue:.98,leafy:!0})],big:[st("broad",{scale:1.4,gnarl:1,lean:.35})]},{id:"norway",name:"Norway",creature:"stoat",by:"Ed",leaf:.36,floor:["slate",.6,.15,.35],text:{floor:"pine needles and slate",small:"rocks",big:"straight pines"},small:[Fe("stones",{big:!0})],big:[st("fir",{scale:1.2})]},{id:"alder-forest",name:"Alder forest",creature:"snake",by:"Ed",leaf:.23,floor:["tallgrass",.22,.45,.42],text:{floor:"tall and short grass",small:"tree stumps with tall grass around",big:"tall slanted trees with thin leaves at different heights"},small:[Fe("stump",{grass:!0})],big:[st("birch",{lean:.3,scale:1.2,dark:!0})]},{id:"meadow",name:"Meadow",creature:"hare",by:"draft",leaf:.25,floor:["flowers",.25,.5,.5],text:{floor:"grass and wildflowers",small:"scattered hawthorn",big:"lone oaks"},small:[Fe("shrub",{flower:[250,245,235]})],big:[st("broad",{scale:1.1})]},{id:"old-oaks",name:"Old oaks",creature:"owl",by:"draft",leaf:.22,floor:["leaves",.07,.5,.35],text:{floor:"leaf litter",small:"acorns, fallen branches",big:"ancient gnarled oaks with hollow trunks",set:"a great hollow oak"},small:[Fe("cones",{acorn:!0}),Fe("log",{branch:!0})],big:[st("broad",{gnarl:.9,hollow:!0})],set:st("broad",{scale:1.6,gnarl:1,hollow:!0})},{id:"berry-thicket",name:"Berry thicket",creature:"bear",by:"draft",leaf:.32,floor:["needles",.08,.45,.3],text:{floor:"pine needles",wall:"bramble thickets",small:"berry bushes",big:"tall pines"},wall:[Fe("bramble")],small:[Fe("shrub",{flower:[200,30,60]})],big:[st("fir",{scale:1.3})]},{id:"wetland",name:"Wetland",creature:"toad",by:"draft",leaf:.2,floor:["mud",.15,.45,.3],text:{floor:"wet mud",wall:"puddles, reeds",small:"reeds and rushes",big:"willows"},wall:[Fe("water"),Fe("reeds",{tall:!0})],small:[Fe("reeds")],big:[st("willow")]},{id:"stream",name:"Stream",creature:"otter",by:"draft",leaf:.27,floor:["pebbles",.25,.3,.45],text:{floor:"pebbles and grass",wall:"a stream or pond",small:"alder saplings",big:"alders",set:"a fallen-log bridge"},wall:[Fe("water",{w:2})],small:[st("broad",{scale:.45})],big:[st("broad",{scale:.95,gnarl:.3})],set:Fe("bridge")},{id:"rocky-slope",name:"Rocky slope",creature:"lynx",by:"draft",leaf:.34,floor:["scree",.2,.2,.42],text:{floor:"scree and moss",wall:"boulders",small:"rocks",big:"pines",set:"a rocky outcrop"},wall:[Fe("boulder",{big:!0})],small:[Fe("stones",{big:!0})],big:[st("fir")],set:Fe("outcrop")},{id:"bog",name:"Bog",creature:"elk",by:"draft",leaf:.38,floor:["moss",.18,.55,.4],text:{floor:"sphagnum moss",wall:"bog pools",small:"cotton grass",big:"spruce"},wall:[Fe("water",{bog:!0})],small:[Fe("reeds",{cotton:!0})],big:[st("fir",{dark:!0})]},{id:"deadwood",name:"Deadwood",creature:"raven",by:"draft",leaf:.15,floor:["earth",.07,.35,.3],text:{floor:"bare earth",small:"broken branches",big:"blasted dead trees"},small:[Fe("log",{branch:!0})],big:[st("broad",{bare:!0,gnarl:1})]},{id:"cave-mouth",name:"Cave mouth",creature:"bat",by:"draft",leaf:.2,floor:["stone",.08,.15,.35],text:{floor:"stone and roots",wall:"rock walls",small:"stalagmite stubs",big:"dead trees",set:"a cave mouth"},wall:[Fe("rockwall")],small:[Fe("stalagmite")],big:[st("broad",{bare:!0})],set:Fe("cave")},{id:"grassland",name:"Grassland",creature:"mole",by:"draft",leaf:.25,floor:["grass",.26,.5,.48],text:{floor:"short turf",small:"molehills",big:"lone birches"},small:[Fe("mound",{brown:!0,small:!0})],big:[st("birch")]},{id:"beaver-pond",name:"Beaver pond",creature:"beaver",by:"draft",leaf:.17,floor:["leaves",.13,.6,.5],text:{floor:"birch leaves",wall:"a pond",small:"stumps",big:"birch and aspen",set:"a beaver dam"},wall:[Fe("water",{w:2})],small:[Fe("stump",{gnawed:!0})],big:[st("birch")],set:Fe("dam")},{id:"log-pile",name:"Log pile",creature:"beetle",by:"draft",leaf:.22,floor:["leaves",.06,.5,.3],text:{floor:"rotting leaves",small:"fungi",big:"rotting logs",set:"a fallen giant"},small:[Fe("fungi")],big:[Fe("log",{rot:!0})],set:Fe("log",{rot:!0,giant:!0})},{id:"heath",name:"Heath",creature:"moth",by:"draft",leaf:.27,floor:["heather",.85,.35,.4],text:{floor:"heather",small:"gorse",big:"wind-bent birches"},small:[Fe("shrub",{flower:[250,205,40],spiky:!0})],big:[st("birch",{lean:.45,scale:.75})]},{id:"old-pinewood",name:"Old pinewood",creature:"marten",by:"draft",leaf:.35,floor:["needles",.07,.4,.3],text:{floor:"pine needles",small:"pine cones",big:"tall old pines with knotholes"},small:[Fe("cones")],big:[st("fir",{scale:1.35})]},{id:"ravine",name:"Ravine",creature:"salamander",by:"draft",leaf:.3,floor:["stone",.3,.3,.32],text:{floor:"wet moss and rock",wall:"rock walls",small:"ferns",big:"mossy boulders",set:"a waterfall"},wall:[Fe("rockwall",{moss:!0})],small:[Fe("fern")],big:[Fe("boulder",{moss:!0,big:!0})],set:Fe("waterfall")},{id:"bluebell-glade",name:"Bluebell glade",creature:"glowworm",by:"draft",leaf:.26,floor:["bluebells",.27,.45,.4],text:{floor:"bluebells",small:"ferns",big:"beeches"},small:[Fe("fern")],big:[st("broad",{gnarl:.2,scale:1.1})]},{id:"holly-thicket",name:"Holly thicket",creature:"spider",by:"draft",leaf:.36,floor:["leaves",.08,.35,.28],text:{floor:"dead leaves",wall:"holly hedges",small:"cobwebs",big:"hollies",set:"a web-hung dead tree"},wall:[Fe("hedge",{berries:!0})],small:[Fe("web")],big:[st("broad",{scale:.7,dark:!0})],set:st("broad",{bare:!0,webs:!0})},{id:"honeysuckle-tangle",name:"Honeysuckle tangle",creature:"dormouse",by:"draft",leaf:.25,floor:["clover",.27,.45,.45],text:{floor:"grass and clover",wall:"bramble",small:"honeysuckle",big:"hazel coppice"},wall:[Fe("bramble")],small:[Fe("shrub",{flower:[250,230,170]})],big:[st("broad",{trunks:5,scale:.7,thin:!0})]}],_f=Object.fromEntries(sl.map(i=>[i.id,i]));function Mf(i,e,t=64,n=48){const[r,s,a,o]=i.floor,c=new nn(t,n),l=i.id.length*131;for(let g=0;g<n;g++)for(let m=0;m<t;m++){const p=(ui(m/7,g/5,l)*(t-m)*(n-g)+ui((m-t)/7,g/5,l)*m*(n-g)+ui(m/7,(g-n)/5,l)*(t-m)*g+ui((m-t)/7,(g-n)/5,l)*m*g)/(t*n),_=p<.38?v.BODY2:p>.64?v.BELLY:v.BODY;c.px(m,g,_,0,-.42,.91)}const h=Zs(l),f=(g,m,p)=>c.px((g%t+t)%t,(m%n+n)%n,p,0,-.42,.91),u={moss:0,needles:70,mud:25,stony:30,nettles:60,leaves:80,grass:70,lawn:30,plants:60,roots:30,slate:40,tallgrass:90,flowers:70,pebbles:60,scree:70,earth:15,stone:40,heather:90,bluebells:90,clover:60}[r]??40;for(let g=0;g<u;g++){const m=Math.floor(h()*t),p=Math.floor(h()*n);if(r==="needles"){const _=h()<.5?1:-1;for(let S=0;S<3;S++)f(m+S*_,p+(S>>1),h()<.5?v.BODY2:v.ACCENT)}else if(["grass","lawn","tallgrass","plants","nettles","clover","flowers","bluebells","heather"].includes(r)){const _=r==="tallgrass"?4:r==="lawn"?1:2;for(let S=0;S<_;S++)f(m,p-S,S===_-1?v.LEAF2:v.LEAF);(r==="flowers"||r==="bluebells"||r==="heather"||r==="clover")&&h()<.5&&f(m+1,p-_,v.FLOWER)}else if(["stony","pebbles","scree","slate","stone","roots"].includes(r)){if(f(m,p,v.ACCENT),h()<.6&&f(m+1,p,v.ACCENT),h()<.4&&f(m,p+1,v.BODY2),r==="roots"&&h()<.5)for(let _=0;_<5;_++)f(m+_,p+(_>2?1:0),v.TRUNK)}else if(r==="leaves")f(m,p,v.FLOWER),f(m+1,p,v.FLOWER),h()<.5&&f(m,p+1,v.ACCENT);else if(r==="mud"||r==="earth")for(let _=0;_<3;_++)f(m+_,p,v.BODY2)}const d={flowers:we(.13,.6,.95),bluebells:[90,110,230],heather:[180,90,170],clover:[240,235,240],leaves:we(s+.02,.65,.6)}[r]||we(s,.3,.6),x={[v.BODY]:we(s,a*e.sat,o),[v.BODY2]:we(s+.02,a*e.sat*1.1,o*.78),[v.BELLY]:we(s-.02,a*e.sat*.9,Math.min(1,o*1.15)),[v.ACCENT]:r==="needles"?we(.07,.5,.5):we(.1,.08,.62),[v.FLOWER]:d,[v.LEAF]:we(i.leaf,.55*e.sat,.45),[v.LEAF2]:we(i.leaf-.03,.5*e.sat,.62),[v.TRUNK]:we(e.trunkHue,.4,.3)};return{sp:c,colours:x}}const wi=i=>({[v.ACCENT]:we(.1,.06,.6),[v.BODY2]:we(.62,.08,.4),[v.BELLY]:we(.1,.05,.78),[v.LEAF]:we(.27,.5,.45),[v.LEAF2]:we(.25,.45,.62),[v.NOSE]:[20,16,24]});function sr(i,e,t,n,r,s,a){const o=[];for(let c=0;c<8;c++){const l=c/8*Math.PI*2,h=1+(s()-.5)*.3;o.push([e[0]+Math.cos(l)*t*h,e[1]+Math.sin(l)*n*h*(Math.sin(l)>0?.5:1)])}i.shape(o,v.ACCENT,{group:5,line:!0,round:r.round}),i.mark([bt(e,[-t,n*.1]),bt(e,[t,n*.1]),bt(e,[t,n]),bt(e,[-t,n])],v.BODY2,[v.ACCENT]),i.mark([bt(e,[-t*.6,-n*.8]),bt(e,[t*.1,-n*1.1]),bt(e,[t*.3,-n*.5]),bt(e,[-t*.3,-n*.3])],v.BELLY,[v.ACCENT]),a&&i.mark(Js([bt(e,[-t*1.1,-n*.55]),bt(e,[0,-n*1.3]),bt(e,[t*1.1,-n*.5]),bt(e,[t*.6,-n*.2]),bt(e,[-t*.6,-n*.2])],0,3,3,n*.15,1),v.LEAF,[v.ACCENT,v.BELLY,v.BODY2])}function As(i,e,t,n,r,s){const a={[v.LEAF]:we(t.leaf,.6*n.sat,.55),[v.LEAF2]:we(t.leaf-.05,.55*n.sat,.78),[v.LEAF3]:we(t.leaf+.03,.66*n.sat,.36)},o={[v.TRUNK]:we(n.trunkHue,.45*n.sat,.34),[v.BARKD]:we(n.trunkHue+.03,.5*n.sat,.17),[v.BARKL]:we(n.trunkHue-.01,.38*n.sat,.5),[v.BELLY]:we(n.trunkHue+.02,.3,.7)},c={[v.MAGIC]:[60,110,150],[v.MAGIC2]:[150,200,220],[v.BODY2]:[35,70,100]};if(i==="tree"){const g={broad:ou,fir:il,willow:lu,birch:cu,flat:uu}[e.type],m={...n,leafHue:t.leaf+(e.dark?.05:0),gnarl:e.gnarl??n.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},p=g(r,m,n.treeSize*s*(e.scale||1)*ye(r,.9,1.1)),_=rl(r,m,g);return e.dark&&(_[v.LEAF]=_[v.LEAF3],_[v.LEAF3]=we(t.leaf+.05,.7,.22)),_[v.NOSE]=[20,16,24],_[v.WEB]=[225,225,232],{sp:p.sp,colours:_}}if(i==="shrub"){const g=vf(r,{...n,leafHue:t.leaf,bushSize:n.bushSize*s,flowers:1});for(let m=0;m<g.sp.m.length;m++)g.sp.m[m]&&Et(m,1,3)<(e.spiky?.18:.1)&&g.sp.m[m]!==v.TRUNK&&(g.sp.m[m]=v.FLOWER);return g.colours[v.FLOWER]=e.flower,g}const l=Math.round(48*s*(e.w||1)),h=Math.round(32*s),f=new nn(l,h),u=l/2,d=h;let x={};if(i==="grass"||i==="reeds"||i==="fern"||i==="flowers"||i==="flowerbed"){const g=i==="flowerbed"?40:24,m=(i==="reeds"?e.tall?26:20:i==="fern"?14:10*(e.h||1))*s;i==="flowerbed"&&f.shape([[u-20*s,d-2],[u-18*s,d-6*s],[u+18*s,d-6*s],[u+20*s,d-2],[u+20*s,d],[u-20*s,d]],v.ACCENT,{group:2,line:!0});for(let p=0;p<g;p++){const _=u+ye(r,-16,16)*s,S=m*ye(r,.5,1),b=i==="fern"?ye(r,-6,6)*s:ye(r,-2,2)*s,w=d-1-(i==="flowerbed"?5*s:0);for(let E=0;E<S;E++){const L=E/S;f.px(_+b*L*L,w-E,L>.7?v.LEAF2:L<.3?v.LEAF3:v.LEAF,b*.05,-.3,.9),i==="fern"&&E%2&&f.px(_+b*L*L+(b>0?1:-1),w-E+1,v.LEAF2,0,-.3,.9)}if(i==="reeds"&&(e.cotton||r()<.5))for(let E=0;E<(e.cotton?2:3);E++)f.px(_+b,w-S-E,e.cotton?v.WEB:v.TRUNK,0,-.5,.85);(i==="flowers"||i==="flowerbed")&&r()<.7&&(f.px(_+b,w-S,v.FLOWER,0,-.5,.85),f.px(_+b+1,w-S,v.FLOWER,0,-.5,.85))}if(x={...a,[v.FLOWER]:i==="flowerbed"?Qc(r,[[230,80,120],[250,210,60],[150,110,230]]):we(e.hue??.95,.6,.85),[v.TRUNK]:we(.07,.5,.35),[v.WEB]:[240,240,235],[v.ACCENT]:we(.08,.1,.55)},i==="flowerbed"){for(let p=0;p<f.m.length;p++)f.m[p]===v.FLOWER&&Et(p,2,7)<.5&&(f.m[p]=v.BELLY);x[v.BELLY]=[250,245,240]}}else if(i==="stones"){for(let g=0;g<(e.big?3:6);g++)sr(f,[u+ye(r,-14,14)*s,d-(e.big?5:2.5)*s],(e.big?6:3)*s*ye(r,.7,1.2),(e.big?5:2.5)*s,n,r);x=wi()}else if(i==="boulder")sr(f,[u,d-(e.big?11:8)*s],(e.big?18:13)*s,(e.big?12:9)*s,n,r,e.moss),x={...wi(),...a,[v.ACCENT]:we(.1,.06,.6)};else if(i==="henge")f.shape([[u-7*s,d],[u-8*s,d-18*s],[u-4*s,d-28*s],[u+5*s,d-27*s],[u+8*s,d-14*s],[u+7*s,d]],v.ACCENT,{group:5,line:!0,round:n.round}),f.mark([[u-9*s,d-30*s],[u+9*s,d-30*s],[u+9*s,d-22*s],[u-9*s,d-18*s]],v.LEAF,[v.ACCENT]),x={...wi(),...a};else if(i==="mound"){const g=(e.small?8:14)*s,m=(e.small?5:8)*s;f.shape(Js([[u-g,d],[u-g*.6,d-m*.8],[u,d-m],[u+g*.6,d-m*.8],[u+g,d]],0,4,e.moss?3:1,(e.moss?1.5:.8)*s,1),e.moss?v.LEAF:v.TRUNK,{group:5,round:n.round}),f.mark([[u-g,d-m*.45],[u+g,d-m*.45],[u+g,d],[u-g,d]],e.moss?v.LEAF3:v.BARKD,[e.moss?v.LEAF:v.TRUNK]),x={...a,...o,[v.TRUNK]:we(.07,.45,e.brown?.35:.3)}}else if(i==="stump"){const g=6*s;if(f.limb([[u,d,g*2.2],[u,d-8*s,g*1.6]],v.TRUNK,{group:5,round:n.round,cap:0,capEnd:0}),f.shape([[u-g*.8,d-8*s],[u,d-10*s-(e.gnawed?4*s:0)],[u+g*.8,d-8*s],[u,d-7*s]],v.BELLY,{group:6,round:n.round}),e.snag&&f.limb([[u+g*.4,d-8*s,2.5*s],[u+g*1.6,d-15*s,1.5*s]],v.TRUNK,{group:7,round:n.round}),e.grass)for(let m=0;m<20;m++){const p=u+ye(r,-14,14)*s,_=ye(r,6,13)*s;for(let S=0;S<_;S++)f.px(p,d-1-S,S>_*.6?v.LEAF2:v.LEAF,0,-.3,.9)}x={...a,...o}}else if(i==="log"){const g=(e.giant?46:e.branch?18:30)*s,m=(e.giant?14:e.branch?3:8)*s;if(f.limb([[u-g/2,d-m/2,m],[u+g/2,d-m/2-(e.branch?2*s:0),m*.9]],v.TRUNK,{group:5,round:n.round,cap:.3,capEnd:.3}),e.branch||f.shape([[u+g/2-m*.1,d-m],[u+g/2+m*.2,d-m/2],[u+g/2-m*.1,d],[u+g/2-m*.3,d-m/2]],v.BELLY,{group:6,round:n.round}),e.rot)for(let p=0;p<(e.giant?6:3);p++){const _=u+ye(r,-g/2,g/3);f.shape([[_-3*s,d-m*.9],[_,d-m-3*s],[_+3*s,d-m*.9]],v.FLOWER,{group:7,line:!0,round:n.round})}e.branch&&f.limb([[u,d-m,m*.7],[u+5*s,d-m-6*s,m*.4]],v.TRUNK,{group:6,round:n.round}),x={...o,[v.FLOWER]:[230,190,120]}}else if(i==="fungi"){for(let g=0;g<5;g++){const m=u+ye(r,-12,12)*s,p=ye(r,3,7)*s,_=ye(r,3,5)*s;f.limb([[m,d,1.6*s],[m,d-p,1.4*s]],v.BELLY,{group:5}),f.shape([[m-_,d-p],[m,d-p-_*.8],[m+_,d-p]],g%2?v.FLOWER:v.MAGIC,{group:6+g%2,line:!0,round:n.round})}x={[v.BELLY]:[225,215,195],[v.FLOWER]:[190,80,50],[v.MAGIC]:[120,230,200]}}else if(i==="cones"){for(let g=0;g<6;g++){const m=u+ye(r,-14,14)*s,p=d-2*s;f.ellipse(m,p,(e.acorn?1.6:2)*s,(e.acorn?2:2.8)*s,v.TRUNK,{round:n.round}),e.acorn?f.ellipse(m,p-1.6*s,1.8*s,1*s,v.BARKD,{round:n.round}):f.px(m,p-1,v.BARKL)}x=o}else if(i==="water"){const g=22*s*(e.w||1),m=6*s;f.shape([[u-g,d-m],[u-g*.3,d-m*1.5],[u+g*.6,d-m*1.2],[u+g,d-m*.5],[u+g*.4,d],[u-g*.7,d-m*.2]],v.MAGIC,{group:5,round:.2});for(let p=0;p<6;p++){const _=u+ye(r,-g*.6,g*.6),S=d-m*ye(r,.4,1.1);for(let b=0;b<3*s;b++)f.recolour(_+b,S,v.MAGIC2)}x=e.bog?{[v.MAGIC]:[60,70,50],[v.MAGIC2]:[120,130,90]}:c;for(let p=0;p<f.m.length;p++)f.m[p]===v.MAGIC?f.m[p]=v.BODY:f.m[p]===v.MAGIC2&&(f.m[p]=v.BELLY);x={[v.BODY]:x[v.MAGIC],[v.BELLY]:x[v.MAGIC2]}}else if(i==="bramble"||i==="hedge"){const g=22*s,m=(i==="hedge"?18:12)*s;for(let p=0;p<(i==="hedge"?6:4);p++){const _=u+ye(r,-g*.8,g*.8),S=d-m*ye(r,.4,.7);f.ellipse(_,S,ye(r,6,9)*s,m*.45,i==="hedge"?v.LEAF3:v.LEAF,{round:n.round,density:e.bare?.5:.95,noise:.5,seed:p})}for(let p=0;p<8;p++){let S=u+ye(r,-g,g),b=d;for(let w=0;w<m*1.2;w++)S+=Math.sin(w*.3+p)*.8,b-=.8,f.px(S,b,v.TRUNK,0,-.3,.9)}if(i==="hedge"||e.berries||i==="bramble")for(let p=0;p<f.m.length;p++)f.m[p]&&f.m[p]!==v.TRUNK&&Et(p,5,9)<.05&&(f.m[p]=v.FLOWER);x={...a,...o,[v.FLOWER]:i==="hedge"?[210,30,40]:[70,30,70]}}else if(i==="wall"){const g=22*s,m=12*s;f.shape([[u-g,d],[u-g,d-m],[u+g,d-m],[u+g,d]],v.ACCENT,{group:5,line:!0,depth:2}),f.shape([[u-g-1,d-m],[u-g-1,d-m-2*s],[u+g+1,d-m-2*s],[u+g+1,d-m]],v.BELLY,{group:6,line:!0,depth:2}),f.shape([[u+g-6*s,d-m-2*s],[u+g-6*s,d-m-7*s],[u+g,d-m-7*s],[u+g,d-m-2*s]],v.ACCENT,{group:7,line:!0,depth:2}),f.ellipse(u+g-3*s,d-m-9*s,3*s,2.5*s,v.BELLY,{round:n.round});for(let p=d-m+3*s;p<d;p+=4*s)for(let _=u-g;_<u+g;_++)f.recolour(_,p,v.BODY2);x=wi()}else if(i==="rockwall"){for(let g=0;g<5;g++)sr(f,[u+(g-2)*9*s,d-ye(r,8,14)*s],8*s,10*s,n,r,e.moss);x={...wi(),...a}}else if(i==="stalagmite"){for(let g=0;g<4;g++){const m=u+ye(r,-14,14)*s,p=ye(r,5,11)*s;f.shape([[m-3*s,d],[m-1*s,d-p],[m+1*s,d-p],[m+3*s,d]],v.ACCENT,{group:5,line:!0,round:n.round})}x=wi()}else if(i==="web"){const g=[u,d-14*s],m=11*s;for(let p=0;p<8;p++){const _=p/8*Math.PI*2;for(let S=0;S<m;S++)f.px(g[0]+Math.cos(_)*S,g[1]+Math.sin(_)*S,v.WEB,0,0,1)}for(let p=3*s;p<m;p+=3*s)for(let _=0;_<Math.PI*2;_+=.05)f.px(g[0]+Math.cos(_)*p,g[1]+Math.sin(_)*p,v.WEB,0,0,1);x={[v.WEB]:[225,230,240]}}return{sp:f,colours:x}}function Sf(i,e,t,n,r,s){if(i==="tree"||i==="log")return As(i,e,t,n,r,s);const a=Math.round(90*s),o=Math.round(70*s),c=new nn(a,o),l=a/2,h=o;let f={...wi(),[v.LEAF]:we(t.leaf,.55,.5),[v.LEAF2]:we(t.leaf-.04,.5,.7),[v.TRUNK]:we(n.trunkHue,.45,.34),[v.BARKD]:we(n.trunkHue+.03,.5,.17),[v.MAGIC]:we(n.magicHue,.6,1),[v.MAGIC2]:we(n.magicHue,.2,1)};if(i==="shrine")c.shape([[l-16*s,h],[l-14*s,h-6*s],[l+14*s,h-6*s],[l+16*s,h]],v.ACCENT,{group:5,line:!0,depth:2}),c.shape([[l-9*s,h-6*s],[l-9*s,h-26*s],[l+9*s,h-26*s],[l+9*s,h-6*s]],v.ACCENT,{group:6,line:!0,depth:2}),c.shape([[l-5*s,h-10*s],[l-5*s,h-20*s],[l,h-23*s],[l+5*s,h-20*s],[l+5*s,h-10*s]],v.NOSE,{group:7}),c.shape([[l-13*s,h-26*s],[l,h-34*s],[l+13*s,h-26*s]],v.BODY2,{group:8,line:!0,depth:2}),c.ellipse(l,h-13*s,2.5*s,2.5*s,v.MAGIC2,{round:.5}),c.mark([[l-14*s,h-36*s],[l+2*s,h-36*s],[l-4*s,h-24*s],[l-14*s,h-24*s]],v.LEAF,[v.BODY2,v.ACCENT]);else if(i==="pavilion"){c.shape([[l-26*s,h],[l-26*s,h-4*s],[l+26*s,h-4*s],[l+26*s,h]],v.ACCENT,{group:5,line:!0,depth:2});for(const u of[-20,-7,7,20])c.limb([[l+u*s,h-4*s,4*s],[l+u*s,h-34*s,4*s]],u===-7||u===7?v.BODY2:v.BELLY,{group:6+(u>0?1:0),line:!0,cap:0,capEnd:0});c.shape([[l-28*s,h-34*s],[l-28*s,h-38*s],[l+28*s,h-38*s],[l+28*s,h-34*s]],v.ACCENT,{group:8,line:!0,depth:2}),c.shape([[l-24*s,h-38*s],[l-16*s,h-54*s],[l,h-60*s],[l+16*s,h-54*s],[l+24*s,h-38*s]],v.BELLY,{group:9,line:!0})}else if(i==="bridge"){const u=As("water",{w:1.8},t,n,r,s);for(let d=0;d<u.sp.m.length;d++){const x=d%u.sp.w,g=d/u.sp.w|0,m=Math.round(l-u.sp.w/2+x),p=h-u.sp.h+g;u.sp.m[d]&&c.inb(m,p)&&c.px(m,p,u.sp.m[d]===v.BODY?v.IRIS:v.PUPIL,0,-.42,.91)}c.limb([[l-34*s,h-6*s,9*s],[l+34*s,h-10*s,8*s]],v.TRUNK,{group:6,line:!0,cap:.3,capEnd:.3}),f[v.IRIS]=[60,110,150],f[v.PUPIL]=[150,200,220]}else if(i==="outcrop")for(const[u,d,x,g]of[[-18,14,16,13],[12,12,18,12],[-2,28,15,13],[16,34,9,9]])sr(c,[l+u*s,h-d*s],x*s,g*s,n,r,!0);else if(i==="cave"){for(const[u,d,x,g]of[[-26,16,16,15],[26,16,16,15],[0,40,30,18],[-12,30,14,12],[12,30,14,12]])sr(c,[l+u*s,h-d*s],x*s,g*s,n,r,d>30);c.shape([[l-15*s,h],[l-14*s,h-18*s],[l-4*s,h-28*s],[l+6*s,h-27*s],[l+14*s,h-16*s],[l+15*s,h]],v.NOSE,{group:9,line:!0})}else if(i==="dam"){const u=As("water",{w:1.9},t,n,r,s);for(let d=0;d<u.sp.m.length;d++){const x=d%u.sp.w,g=d/u.sp.w|0,m=Math.round(l-u.sp.w/2+x),p=h-u.sp.h+g-10*s;u.sp.m[d]&&c.inb(m,p)&&c.px(m,p,u.sp.m[d]===v.BODY?v.IRIS:v.PUPIL,0,-.42,.91)}for(let d=0;d<26;d++){const x=l+ye(r,-32,32)*s,g=h-ye(r,2,14)*s,m=ye(r,-.5,.5),p=ye(r,8,16)*s;c.limb([[x-Math.cos(m)*p/2,g-Math.sin(m)*p/2,2.6*s],[x+Math.cos(m)*p/2,g+Math.sin(m)*p/2,2*s]],d%3?v.TRUNK:v.BARKD,{group:6+d%2,line:!0})}f[v.IRIS]=[60,110,150],f[v.PUPIL]=[150,200,220]}else if(i==="waterfall"){for(const[u,d,x,g]of[[-22,30,18,30],[22,30,18,30],[0,56,20,12]])sr(c,[l+u*s,h-d*s],x*s,g*s,n,r,!0);for(let u=l-6*s;u<l+6*s;u++)for(let d=h-50*s;d<h-4*s;d++)c.px(u,d,Et(u|0,d/3|0,4)<.3?v.PUPIL:v.IRIS,0,-.2,.98);c.shape([[l-18*s,h],[l-14*s,h-6*s],[l+14*s,h-6*s],[l+18*s,h]],v.IRIS,{group:10,round:.2}),f[v.IRIS]=[90,150,190],f[v.PUPIL]=[210,235,245]}return{sp:c,colours:f}}function yf(i,e,{K:t=2/(e.pixel||2),makeCanvas:n=Zo}={}){const r=_f[i];if(!r)throw new Error(`no area type "${i}"`);const s=Zs(i.split("").reduce((h,f)=>h*31+f.charCodeAt(0),7)>>>0),a=(h,f,u)=>({sp:hi(h.sp,h.colours,e,"none",n),kind:f,text:u}),o=Mf(r,e),c=h=>(h||[]).map(([f,u])=>a(As(f,u,r,e,s,t),f,"")),l={def:r,floor:{sp:hi(o.sp,o.colours,e,"none",n),kind:r.floor[0],text:r.text.floor},walls:c(r.wall),small:c(r.small),big:c(r.big),setPiece:null};return l.walls.forEach(h=>h.text=r.text.wall),l.small.forEach(h=>h.text=r.text.small),l.big.forEach(h=>h.text=r.text.big),r.set&&(l.setPiece=a(Sf(r.set[0],r.set[1],r,e,s,t),r.set[0],r.text.set)),l}const bf={[v.ACCENT]:[150,145,140],[v.BODY2]:[95,92,100],[v.TRUNK]:[110,70,40],[v.BARKD]:[60,38,24],[v.MAGIC]:[255,130,40],[v.MAGIC2]:[255,228,120],[v.NOSE]:[30,24,26]};function wf(i){const e=new et({blend:.02});for(let r=0;r<9;r++){const s=r/9*Math.PI*2;e.ell([Math.cos(s)*.32,.05,Math.sin(s)*.32],[.09,.06,.08],r%3?v.ACCENT:v.BODY2,{dir:[-Math.sin(s),0,Math.cos(s)],group:1+r})}e.seg([-.22,.06,-.12],[.22,.1,.12],.05,.045,v.TRUNK,{group:20,paint:r=>r[0]>.12?v.BARKD:void 0}),e.seg([-.2,.1,.14],[.2,.06,-.14],.05,.045,v.TRUNK,{group:21,paint:r=>r[0]<-.12?v.BARKD:void 0});const t=[[.42,.3,.34],[.36,.4,.28],[.46,.32,.38]][i%3];[[-.05,0,t[0]],[.08,.06,t[1]],[-.02,-.08,t[2]]].forEach(([r,s,a],o)=>e.flat([r,.1+a*.5,s],[1,0,.3],[((i+o)%3-1)*.1,1,0],a*.38,a*.5,Li.flame(v.MAGIC,v.MAGIC2),{group:30+o,bend:.1}));const n=_n(e,{height:34}).sp;for(let r=0;r<4;r++){const s=Math.floor(n.w/2+Math.sin(r*2.3+i)*n.w*.25),a=Math.floor(n.h*(.12+r*.08));n.get(s,a)||n.px(s,a,v.MAGIC2)}return n}const Cs={cyan:[[70,230,255],[200,250,255]],violet:[[190,100,255],[235,210,255]],green:[[90,255,140],[215,255,220]]};function Ef(i,e){const t=new et({blend:.04}),n=Object.keys(Cs).indexOf(i),r=.08,s=.4,a=[Math.cos(s),0,-Math.sin(s)],o=z.norm([Math.sin(s),.22,Math.cos(s)]),c=z.norm(z.cross(o,a)),l=[0,.46,0],h=[[[.2-n*.05,.92],[.14,.8],[.19,.7],[.12,.58]],[[-.22+n*.03,.05],[-.17,.16],[-.21,.25]]],f=(m,p)=>h.some(_=>_.some((S,b)=>{const w=_[b+1];if(!w)return!1;const E=w[0]-S[0],L=w[1]-S[1],M=Math.max(0,Math.min(1,((m-S[0])*E+(p-S[1])*L)/(E*E+L*L)));return Math.hypot(m-S[0]-E*M,p-S[1]-L*M)<.014})),u=m=>{const p=z.sub(m,l),_=[z.dot(p,a),z.dot(p,c)+.46,z.dot(p,o)];if(_[2]>r-.02){const S=(_[0]+.17)/.34,b=(.8-_[1])/.5;if(S>=0&&S<=1&&b>=0&&b<=1&&jc(S,b,n+1,.1))return v.RUNE}if(f(_[0],_[1]))return v.STONED;if(_[1]>.86&&Et(Math.floor(_[0]*30),Math.floor(_[2]*30),3)<.3||_[1]<.12&&Et(Math.floor(_[0]*35),Math.floor(_[1]*35)+Math.floor(_[2]*35)*7,5)<.55)return v.MOSS};t.box(l,[.28,.46,r],v.STONE,{group:1,axes:[a,c,o],round:.06,paint:u}),t.box(z.add(z.add(l,z.mul(c,.53)),z.mul(a,.2)),[.3,.12,.2],v.STONE,{group:1,dir:z.add(a,z.mul(c,.35)),up:c,cut:!0,paint:u});for(const[m,p,_]of[[-.24,.14,.08],[.2,.02,.07],[0,.12,.07]])t.ell([m,.015,p],[_,_*.4,_],v.MOSS,{group:2});for(let m=0;m<9;m++){const p=-.3+m*.07,_=.12+m%3*.025-m*.02,S=.07+m*37%5/60;t.seg([p,0,_],[p+(m%3-1)*.02,S,_+.01],.012,.004,m%3?v.LEAF:v.LEAF2,{group:10+m})}const d={[v.STONE]:[132,134,142],[v.STONED]:[70,70,80],[v.MOSS]:[86,120,62],[v.LEAF]:[80,125,60],[v.LEAF2]:[130,160,80],[v.RUNE]:Cs[i][0],[v.MAGIC2]:Cs[i][1],[v.LINE]:[40,40,50]},x=_n(t,{height:44}).sp;let g=0;for(let m=0;m<600&&g<5;m++){const p=Math.floor(Et(m,n,9)*x.w),_=Math.floor(Et(m,n,10)*x.h*.8);x.get(p,_)||x.get(p+1,_)||x.get(p-1,_)||x.get(p,_+1)||x.get(p,_-1)||(x.px(p,_,g%2?v.RUNE:v.MAGIC2),g++)}return{sp:x,colours:d}}function Tf(){const i=new et({blend:.03});i.ell([0,0,0],[.62,.025,.38],v.WATER,{group:1,paint:t=>Math.hypot(t[0]/.62,t[2]/.38)>.88?v.BODY2:void 0});for(let t=0;t<16;t++){const n=Math.PI*(.85+t/15*.9),r=Math.cos(n)*.6,s=Math.sin(n)*.36,a=.18+t*37%10/40;i.seg([r,0,s],[r+(t%3-1)*.02,a,s],.012,.006,t%4?v.LEAF:v.LEAF2,{group:10+t})}for(const[t,n,r]of[[.5,.2,.07],[.45,-.25,.05],[-.2,.35,.06]])i.ell([t,.02,n],[r,r*.5,r],v.ACCENT,{group:30});return{sp:_n(i,{height:22}).sp,colours:{[v.WATER]:[40,70,95],[v.BODY2]:[70,60,45],[v.LEAF]:[80,125,60],[v.LEAF2]:[130,160,80],[v.ACCENT]:[130,128,125]}}}function Af(i,{makeCanvas:e=Zo}={}){const t=(l,h)=>hi(l,h,i,"none",e),n={campfire:[0,1,2].map(l=>t(wf(l),bf)),stones:{},pond:null};for(const l of Object.keys(Cs)){const h=Ef(l);n.stones[l]=t(h.sp,h.colours)}const r=Tf(),s=t(r.sp,r.colours),a=e(r.sp.w,r.sp.h),o=a.getContext("2d"),c=o.createImageData(r.sp.w,r.sp.h);for(let l=0;l<r.sp.m.length;l++)r.sp.m[l]===v.WATER&&c.data.set([255,255,255,255],l*4);return o.putImageData(c,0,0),s.mask=a,n.pond=s,n}function Cf(i,e){const t=new Map,n=new Map,r=(c,l,h)=>(c*2097152+(l+1048576))*2097152+(h+1048576),s=(c,l,h)=>{const f=r(c,l,h);let u=t.get(f);if(!u){const d=Math.pow(2,-c);u=[d*(l+Xe(l*7+c,h,i)),d*(h+Xe(l,h*13+c,i+1))],t.set(f,u)}return u},a=(c,l,h)=>{const f=Math.pow(2,-c),u=Math.floor(l/f),d=Math.floor(h/f);let x=u,g=d,m=1/0;for(let p=-2;p<=2;p++)for(let _=-2;_<=2;_++){const S=s(c,u+p,d+_),b=(S[0]-l)**2+(S[1]-h)**2;b<m&&(m=b,x=u+p,g=d+_)}return[x,g]},o=(c,l,h)=>{const f=r(c,l,h);let u=n.get(f);if(u)return u;if(c===0)u=[l,h];else{const d=s(c,l,h),x=a(c-1,d[0],d[1]);u=o(c-1,x[0],x[1])}return n.set(f,u),u};return{seed:i,depth:e,site:(c,l)=>s(0,c,l),partition(c,l){const h=a(e,c,l);return o(e,h[0],h[1])},centreness(c,l,h){const f=s(0,h[0],h[1]),u=Math.hypot(c-f[0],l-f[1]);let d=1/0;const x=Math.floor(c),g=Math.floor(l);for(let m=-2;m<=2;m++)for(let p=-2;p<=2;p++){const _=x+m,S=g+p;if(_===h[0]&&S===h[1])continue;const b=s(0,_,S);d=Math.min(d,Math.hypot(c-b[0],l-b[1]))}return Math.min(1,2*u/(u+d))},openness(c,l){let h=1/0,f=1/0;const u=Math.floor(c),d=Math.floor(l);for(let x=-2;x<=2;x++)for(let g=-2;g<=2;g++){const m=s(0,u+x,d+g),p=Math.hypot(c-m[0],l-m[1]);p<h?(f=h,h=p):p<f&&(f=p)}return Math.min(1,2*h/(h+f))}}}const Rf=yh.types,fn=sl.map(i=>({id:i.id,name:i.name,creature:i.creature,text:i.text,setPiece:i.set?i.text.set??"a set piece":"",hasWalls:!!i.wall?.length,floor:[i.floor[1],i.floor[2],i.floor[3]],treeDensity:Rf[i.id]?.treeDensity??1})),nr=(i,e)=>i+","+e;function Lf(i){if(i==null||i.trim()==="")return null;const e=i.trim();if(/^\d{1,9}$/.test(e))return Number(e);let t=2166136261;for(let n=0;n<e.length;n++)t=Math.imul(t^e.charCodeAt(n),16777619);return(t>>>0)%1e9}function Pf(i,e,t,n){const r=new Map,s=(c,l)=>{if(c[0]===l[0]&&c[1]===l[1])return;const h=nr(c[0],c[1]),f=nr(l[0],l[1]);r.has(h)||r.set(h,new Set),r.has(f)||r.set(f,new Set),r.get(h).add(f),r.get(f).add(h)},a=(t-e)*n;let o=[];for(let c=0;c<=a;c++){const l=[];for(let h=0;h<=a;h++){const f=i.partition(e+h/n,e+c/n);l.push(f),h>0&&s(f,l[h-1]),c>0&&s(f,o[h])}o=l}return r}function Df(i,e){const t=e.mapAreas,n=2,r=e.areaSize*e.areaScale,s=fn.length,a=3,o=Math.max(0,Math.min(1,e.areaSizeVariance))*a*.3,c=(U,D)=>{const O=U/r,k=D/r;return[O+o*(ua(O/a,k/a,i+91)-.5)*2,k+o*(ua(O/a,k/a,i+92)-.5)*2]},l=(U,D)=>{let O=U*r,k=D*r;for(let Y=0;Y<30;Y++){const[j,X]=c(O,k);O+=(U-j)*r,k+=(D-X)*r}return[O,k]},h=Cf(i,e.borderLayers),f=-n,u=t+n,d=Pf(h,f,u,6),x=new Map,g=di(i*5+1);for(let U=f;U<u;U++)for(let D=f;D<u;D++){const O=new Set;for(let j=-2;j<=2;j++)for(let X=-2;X<=2;X++){const te=x.get(nr(D+X,U+j));te!==void 0&&O.add(te)}for(const j of d.get(nr(D,U))??[]){const X=x.get(j);X!==void 0&&O.add(X)}const k=[...Array(s).keys()].filter(j=>!O.has(j)),Y=k.length?k:[...Array(s).keys()];x.set(nr(D,U),Y[Math.floor(g()*Y.length)])}const m=(U,D)=>x.get(nr(U,D))??Math.floor(Xe(U,D,i+17)*s),p=Math.floor(t/2),_=(U,D)=>{const O=h.site(U,D),k=h.partition(O[0],O[1]);return k[0]===U&&k[1]===D};let S=[p,p];for(const[U,D]of[[0,0],[1,0],[0,1],[-1,0],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]])if(_(p+U,p+D)){S=[p+U,p+D];break}const b=(U,D)=>{const O=h.site(U,D),k=l(O[0],O[1]);return{x:k[0],z:k[1]}},w=b(S[0],S[1]),E=(U,D)=>{const[O,k]=c(U,D),Y=h.partition(O,k);return{cell:Y,type:m(Y[0],Y[1]),openness:h.openness(O,k)}},L=e.dancefloor.radius,M=L+e.dancefloor.clearing,C=(U,D)=>{if(Math.hypot(U-w.x,D-w.z)<M)return 0;const[O,k]=c(U,D),Y=1-hn((ua(U/e.gladeScale,D/e.gladeScale,i+61)-(1-e.gladeAmount))/.03);return hn((h.openness(O,k)-e.clearingSize)/Math.max(.01,e.clearingFalloff))*e.treeDensity*Y},A=(U,D)=>{const O=fn[m(U,D)];return O.setPiece&&Xe(U,D,i+61)<e.setPieceChance?O.setPiece:null},P=(U,D)=>Math.min(1,Math.hypot(U-S[0],D-S[1])/(t/2)),F=r*.5;return{seed:i,tuning:e,n:t,margin:n,areaSize:r,partition:h,centreCell:S,dancefloor:{x:w.x,z:w.z,radius:L},start:{x:w.x,z:w.z+2},bounds:{minX:F,maxX:t*r-F,minZ:F,maxZ:t*r-F},extent:{minX:f*r,maxX:u*r,minZ:f*r,maxZ:u*r},typeOf:m,areaAt:E,siteOf:b,treeWeight:C,neighbours:d,setPieceOf:A,remoteness:P}}const ia=3;function If(i,e,t=.5,n=1){const r=i.tuning,s=pi(e,0,1),a=Math.max(0,Math.round(Tn(r.creaturesNear,r.creaturesFar,Math.pow(s,r.creatureCurve))+(t-.5)*2)),o=a>0&&n<Uf(i,s)?1:0,c=Math.max(0,a-o),l=Math.round(c*r.adultShareFar*hn((s-r.adultsFrom)/Math.max(.01,1-r.adultsFrom))),h=Math.round((c-l)*r.youngShareFar*s);return{babies:Math.max(0,c-l-h),young:h,adults:l,legends:o}}const Uf=(i,e)=>i.tuning.legendChanceFar*hn((e-i.tuning.legendsFrom)/Math.max(.01,1-i.tuning.legendsFrom)),hu=i=>i.areaSize*.75,Os=(i,e,t,n)=>{const r=i.areaAt(e,t).cell;return r[0]===n[0]&&r[1]===n[1]};function fu(i,e,t,n,r){if(Os(i,t,n,e))return[t,n];for(let s=2;s<r*1.5;s+=2)for(let a=0;a<16;a++){const o=a/16*Math.PI*2,c=t+Math.cos(o)*s,l=n+Math.sin(o)*s;if(Os(i,c,l,e))return[c,l]}return[t,n]}function Bs(i,e,t){for(let n=0;n<12;n++){const r=t()*Math.PI*2,s=Math.sqrt(t())*e.range,a=e.homeX+Math.cos(r)*s,o=e.homeZ+Math.sin(r)*s;if(Os(i,a,o,e.cell))return[a,o]}return[e.anchorX,e.anchorZ]}function Nf(i){const e=[],t=i.tuning;let n=0;const[r,s]=i.centreCell;for(let a=0;a<i.n;a++)for(let o=0;o<i.n;o++){if(o===r&&a===s)continue;const c=di(i.seed*7919+o*131+a*977+3),l=fn[i.typeOf(o,a)],h=i.siteOf(o,a),f=i.remoteness(o,a),u=If(i,f,Xe(o,a,i.seed+43),Xe(o,a,i.seed+47)),d=g=>{const m=[o,a],p=hu(i),[_,S]=fu(i,m,h.x,h.z,p),b={cell:m,homeX:h.x,homeZ:h.z,range:p,anchorX:_,anchorZ:S},[w,E]=Bs(i,b,c);return{id:n++,species:l.creature,level:g,...b,x:w,z:E,tx:w,tz:E,rest:c()*3,speed:(g===ia?t.legendSpeed:t.creatureSpeed)*(.7+c()*.6),facing:c()<.5?1:-1,away:!1,moving:!1,walk:c(),seen:0,leashed:!1,rand:di(i.seed*31+n*7+11)}};for(let g=0;g<u.babies;g++)e.push(d(0));for(let g=0;g<u.young;g++)e.push(d(1));for(let g=0;g<u.adults;g++)e.push(d(2));const x=t.legendNextToHome&&o===r+1&&a===s;(u.legends||x)&&e.push(d(3))}return e}function Ff(i,e,t){if(i.rest>0){i.rest-=e,i.moving=!1;return}const n=i.tx-i.x,r=i.tz-i.z,s=Math.hypot(n,r);if(s<.05){[i.tx,i.tz]=Bs(t,i,i.rand),i.rest=.8+i.rand()*3.5,i.moving=!1;return}const a=Math.min(s,i.speed*e),o=i.x+n/s*a,c=i.z+r/s*a;if(!Os(t,o,c,i.cell)){i.tx=i.x,i.tz=i.z,i.moving=!1;return}i.x=o,i.z=c,Math.abs(n)>.02&&(i.facing=n>0?1:-1),r<-.3*s?i.away=!0:r>.3*s&&(i.away=!1),i.moving=!0,i.walk+=e*(i.level===ia?1.5:4)}function Of(i,e,t,n,r,s,a){for(const o of i)if(!o.leashed&&!(Math.abs(o.homeX-e)>n||Math.abs(o.homeZ-t)>n)){if(s-o.seen>3){const c=di(o.id*7919+Math.floor(s/20)*131+5);[o.x,o.z]=Bs(a,o,c),[o.tx,o.tz]=Bs(a,o,c),o.rest=c()*2}o.seen=s,Ff(o,r,a)}}const du=6,Bf=4,Bt=32;function zf(i){const e=i.tuning.camera.treetop.angleIn*Math.PI/180;return i.tuning.crownHeight/Math.sin(e)}function kf(i,e,t){const{treeSpacingX:n,treeSpacingZ:r}=i.tuning,s=i.seed,a=[],o=zf(i),c=i.tuning.crownHalfWidth,l=Math.ceil(t*Bt/r),h=Math.ceil((t+1)*Bt/r);for(let f=l;f<h;f++){const u=f&1?.5:0,d=Math.ceil(e*Bt/n-u),x=Math.ceil((e+1)*Bt/n-u);for(let g=d;g<x;g++){const m=(g+u+(Xe(g,f,s+101)-.5)*.7)*n,p=(f+(Xe(g,f,s+102)-.5)*.7)*r,_=i.areaAt(m,p);Xe(g,f,s+103)>=i.treeWeight(m,p)*fn[_.type].treeDensity||i.treeWeight(m,p-o)===0||i.treeWeight(m-c,p-o)===0||i.treeWeight(m+c,p-o)===0||a.push({x:m,z:p,type:_.type,variant:Math.floor(Xe(g,f,s+104)*du),flip:Xe(g,f,s+105)<.5})}}return a}function Gf(i,e,t){const n=i.tuning.bushSpacing,r=i.seed,s=[],a=Math.ceil(t*Bt/n),o=Math.ceil((t+1)*Bt/n),c=Math.ceil(e*Bt/n),l=Math.ceil((e+1)*Bt/n);for(let h=a;h<o;h++)for(let f=c;f<l;f++){const u=(f+(Xe(f,h,r+201)-.5)*.9)*n,d=(h+(Xe(f,h,r+202)-.5)*.9)*n;Xe(f,h,r+203)>(.12+Math.min(1,i.treeWeight(u,d))*.3)*i.tuning.bushDensity||Math.hypot(u-i.dancefloor.x,d-i.dancefloor.z)<i.dancefloor.radius+2||s.push({x:u,z:d,type:i.areaAt(u,d).type,variant:Math.floor(Xe(f,h,r+204)*Bf),flip:Xe(f,h,r+205)<.5})}return s}function Hf(i,e,t){const n=i.tuning.wallSpacing,r=i.seed,s=[],a=Math.ceil(t*Bt/n),o=Math.ceil((t+1)*Bt/n),c=Math.ceil(e*Bt/n),l=Math.ceil((e+1)*Bt/n);for(let h=a;h<o;h++)for(let f=c;f<l;f++){if(Xe(f,h,r+303)>i.tuning.wallDensity)continue;const u=(f+(Xe(f,h,r+301)-.5)*.6)*n,d=(h+(Xe(f,h,r+302)-.5)*.6)*n,x=i.areaAt(u,d);x.openness<.82||!fn[x.type].hasWalls||Math.hypot(u-i.dancefloor.x,d-i.dancefloor.z)<i.dancefloor.radius+4||s.push({x:u,z:d,type:x.type,variant:Math.floor(Xe(f,h,r+304)*4),flip:Xe(f,h,r+305)<.5})}return s}const Vf=new Set(["wetland","stream","bog","beaver-pond","moor"]);function Wf(i,e,t){const n=i.tuning.lightSources,r=n.spacing,s=i.seed,a=[],o=Math.ceil(t*Bt/r),c=Math.ceil((t+1)*Bt/r),l=Math.ceil(e*Bt/r),h=Math.ceil((e+1)*Bt/r);for(let f=o;f<c;f++)for(let u=l;u<h;u++){const d=(u+(Xe(u,f,s+401)-.5)*.7)*r,x=(f+(Xe(u,f,s+402)-.5)*.7)*r;if(Math.hypot(d-i.dancefloor.x,x-i.dancefloor.z)<i.dancefloor.radius+i.tuning.dancefloor.clearing+4)continue;const g=i.areaAt(d,x),m=g.openness<.35||g.openness>.8?1:.25,p=Xe(u,f,s+403),S=(Vf.has(fn[g.type].id)?n.wetPond:n.pond)*m,b=n.campfire*m,w=n.magicStone*m,E=p<S?"pond":p<S+b?"campfire":p<S+b+w?"stone":null;E&&a.push({x:d,z:x,kind:E,size:.75+Xe(u,f,s+404)*.5})}return a}class Xf{constructor(e){this.map=e}map;trees=new Map;bushes=new Map;walls=new Map;lights=new Map;chunks(e,t,n){const r=[];for(let s=Math.floor((t-n)/Bt);s<=Math.floor((t+n)/Bt);s++)for(let a=Math.floor((e-n)/Bt);a<=Math.floor((e+n)/Bt);a++)r.push([a,s]);return r}gather(e,t,n,r,s){e.size>600&&e.clear();const a=[];for(const[o,c]of this.chunks(n,r,s)){const l=o+","+c;let h=e.get(l);h||(h=t(o,c),e.set(l,h));for(const f of h)Math.abs(f.x-n)<=s&&Math.abs(f.z-r)<=s&&a.push(f)}return a}treesNear(e,t,n){return this.gather(this.trees,(r,s)=>kf(this.map,r,s),e,t,n)}bushesNear(e,t,n){return this.gather(this.bushes,(r,s)=>Gf(this.map,r,s),e,t,n)}lightsNear(e,t,n){return this.gather(this.lights,(r,s)=>Wf(this.map,r,s),e,t,n)}wallsNear(e,t,n){return this.gather(this.walls,(r,s)=>Hf(this.map,r,s),e,t,n)}setPiecesNear(e,t,n){const r=this.map,s=r.areaSize,a=[];for(let o=Math.floor((t-n)/s)-1;o<=Math.floor((t+n)/s)+1;o++)for(let c=Math.floor((e-n)/s)-1;c<=Math.floor((e+n)/s)+1;c++){if(c===r.centreCell[0]&&o===r.centreCell[1]||!r.setPieceOf(c,o))continue;const l=r.siteOf(c,o);Math.abs(l.x-e)<=n&&Math.abs(l.z-4-t)<=n&&a.push({x:l.x,z:l.z-4,type:r.typeOf(c,o),variant:0,flip:Xe(c,o,r.seed+71)<.5})}return a}}const Yf=()=>({stack:[],placed:[],talk:null,events:[]}),qf=(i,e)=>e.invite.talkTime[Math.min(i.level,e.invite.talkTime.length-1)],Kf=(i,e)=>e.invite.turn[Math.min(i.level,e.invite.turn.length-1)],io=i=>!i.leashed&&i.level!==ia;function $f(i,e,t,n){if(i.stack.includes(e))return{x:t,z:n};const r=i.placed.find(s=>s.id===e);return r?{x:r.x,z:r.z}:null}function ma(i,e,t,n,r=!1){let s=null,a=n;for(const o of i){if(o.leashed||!r&&!io(o))continue;const c=Math.hypot(o.x-e,o.z-t);c<=a&&(a=c,s=o)}return s}function zl(i,e,t,n,r){e.leashed=!0,e.rest=0,i.stack.push(e.id),i.events.push({kind:"invited",id:e.id,x:t,z:n,at:r})}function Zf(i,e,t,n,r,s,a,o){i.events=[];const c=o.invite,l=o.leash,h=f=>e[f];if(t.talk&&r){const f=i.talk?h(i.talk.id):null;if(f&&!f.leashed&&Math.hypot(f.x-n.x,f.z-n.z)<=c.cancelDistance)i.talk.t+=a,f.rest=Math.max(f.rest,.2),f.moving=!1,f.facing=n.x>=f.x?1:-1,f.away=n.z<f.z-1,!i.talk.refused&&i.talk.t>=i.talk.total&&(zl(i,f,f.x,f.z,s),i.talk=null);else{i.talk&&i.events.push({kind:"cancelled",id:i.talk.id,x:n.x,z:n.z,at:s});const u=ma(e,n.x,n.z,c.talkRange)??ma(e,n.x,n.z,c.talkRange,!0);i.talk=u?{id:u.id,refused:!io(u),t:0,total:io(u)?qf(u,o):1/0}:null}}else i.talk&&(i.events.push({kind:"cancelled",id:i.talk.id,x:n.x,z:n.z,at:s}),i.talk=null);if(t.inviteNearest){const f=ma(e,n.x,n.z,1/0);f&&zl(i,f,f.x,f.z,s)}if(t.sigil&&r){let f=-1,u=l.pickRadius;if(i.placed.forEach((d,x)=>{const g=Math.hypot(d.x-n.x,d.z-n.z);g<=u&&(u=g,f=x)}),f>=0){const[d]=i.placed.splice(f,1);i.stack.push(d.id),i.events.push({kind:"picked",id:d.id,x:d.x,z:d.z,at:s})}else if(i.stack.length){const d=i.stack[i.stack.length-1];pu(i,n.x,n.z,o)?i.events.push({kind:"fizzled",id:d,x:n.x,z:n.z,at:s}):(i.stack.pop(),i.placed.push({id:d,x:n.x,z:n.z,at:s}),i.events.push({kind:"placed",id:d,x:n.x,z:n.z,at:s}))}}for(const f of i.stack)kl(h(f),n.x,n.z,a,o);for(const f of i.placed)kl(h(f.id),f.x,f.z,a,o)}const pu=(i,e,t,n)=>i.placed.some(r=>Math.hypot(r.x-e,r.z-t)<n.leash.spacing);function kl(i,e,t,n,r){const s=r.leash,a=s.length,o=Math.hypot(i.x-e,i.z-t)>a;if(o){const d=Math.hypot(i.x-e,i.z-t),x=a*.5/d;i.tx=e+(i.x-e)*x,i.tz=t+(i.z-t)*x,i.rest=0}else if(i.rest>0){i.rest-=n,i.moving=!1;return}else if(Math.hypot(i.tx-e,i.tz-t)>a*.85||Math.hypot(i.tx-i.x,i.tz-i.z)<.05){Math.hypot(i.tx-i.x,i.tz-i.z)<.05&&(i.rest=.5+i.rand()*2);const d=i.rand()*Math.PI*2,x=Math.sqrt(i.rand())*a*.8;if(i.tx=e+Math.cos(d)*x,i.tz=t+Math.sin(d)*x,i.rest>0){i.moving=!1;return}}const c=i.tx-i.x,l=i.tz-i.z,h=Math.hypot(c,l);if(h<1e-4){i.moving=!1;return}const f=o?Math.max(i.speed,s.runSpeed*(i.level===ia?.6:1)):i.speed*1.5,u=Math.min(h,f*n);i.x+=c/h*u,i.z+=l/h*u,Math.abs(c)>.02&&(i.facing=c>0?1:-1),l<-.3*h?i.away=!0:l>.3*h&&(i.away=!1),i.moving=!0,i.walk+=n*(o?7:4)}const Jf=i=>`${i[0]},${i[1]}`;function Qf(i){const e={cell:i.centreCell,wave:0,at:0,from:null,soundsystem:null};return{areas:new Map([[Jf(i.centreCell),e]]),wave:0,nextAt:i.tuning.party.startDelay+i.tuning.party.interval,paused:!1}}function jf(i,e){const t=i.siteOf(e[0],e[1]),n=di(i.seed*17+e[0]*53+e[1]*911),[r,s]=fu(i,[e[0],e[1]],t.x,t.z,i.areaSize*.75),a=Math.floor(Xe(e[0],e[1],i.seed+77)*3)%3;for(let o=0;o<24;o++){const c=n()*Math.PI*2,l=3+n()*4,h=r+Math.cos(c)*l,f=s+Math.sin(c)*l+3,u=i.areaAt(h,f).cell;if(u[0]===e[0]&&u[1]===e[1])return{x:h,z:f,variant:a}}return{x:r,z:s,variant:a}}const ed=(i,e)=>e[0]>=0&&e[1]>=0&&e[0]<i.n&&e[1]<i.n;function mu(i,e,t){const n=i.wave+1,r=[],s=new Map,a=new Map;for(const[l,h]of i.areas)for(const f of e.neighbours.get(l)??[]){if(i.areas.has(f)||s.has(f))continue;const u=f.split(",").map(Number);ed(e,u)&&(s.set(f,u),a.set(f,h.cell))}const o=[...s.entries()].sort((l,h)=>Xe(l[1][0],l[1][1],e.seed+n)-Xe(h[1][0],h[1][1],e.seed+n)),c=e.tuning.party.maxPerWave>0?e.tuning.party.maxPerWave:1/0;for(const[l,h]of o.slice(0,c)){const f={cell:h,wave:n,at:t,from:a.get(l)??null,soundsystem:jf(e,h)};i.areas.set(l,f),r.push(f)}return i.wave=n,r}function td(i,e,t,n){return i.paused?(i.nextAt+=n,[]):t<i.nextAt?[]:(i.nextAt+=e.tuning.party.interval,mu(i,e,t))}function nd(i,e,t){const n=Math.max(0,i.nextAt-t),r=e.tuning.party.interval;return{left:n,gone:1-Math.min(1,n/r)}}function id(i,e){return{x:i,z:e,vx:0,vz:0,lift:0,mode:"ground",facing:1,away:!1,lean:!1}}const fr=(i,e)=>Tn(e.groundHeight,e.treetopHeight,hn(i.lift)),Gl=i=>hn(i.lift);function rd(i,e,t,n,r){let{mode:s,lift:a}=i;e.toggleMode&&(s=s==="ground"||s==="descending"?"rising":"descending"),s==="rising"?(a+=t/Math.max(.001,n.riseTime),a>=1&&(a=1,s="treetop")):s==="descending"&&(a-=t/Math.max(.001,n.descendTime),a<=0&&(a=0,s="ground"));let o=e.moveX,c=e.moveZ;const l=Math.hypot(o,c);l>1&&(o/=l,c/=l);const h=Tn(n.groundSpeed,n.treetopSpeed,hn(a)),f=1-Math.exp(-Tn(n.groundAcceleration,n.acceleration,hn(a))*t);let u=i.vx+(o*h-i.vx)*f,d=i.vz+(c*h-i.vz)*f,x=i.x+u*t,g=i.z+d*t;(x<r.minX||x>r.maxX)&&(x=pi(x,r.minX,r.maxX),u=0),(g<r.minZ||g>r.maxZ)&&(g=pi(g,r.minZ,r.maxZ),d=0);const m=u>.3?1:u<-.3?-1:i.facing,p=Math.hypot(u,d),_=Math.max(1,h*.15),S=d<-_&&-d>Math.abs(u)*.5?!0:d>_&&d>Math.abs(u)*.5?!1:i.away;return{x,z:g,vx:u,vz:d,lift:a,mode:s,facing:m,away:S,lean:p>h*n.leanAt}}function sd(i,e){const t=Df(i,e),n=id(t.start.x,t.start.z);return{seed:i,tuning:e,map:t,forest:new Xf(t),creatures:Nf(t),clock:_h(),witch:n,camera:gh(e,n.x,fr(n,e),n.z),party:Qf(t),leash:Yf()}}function ad(i,e,t){const n=Mh(i.clock,t);n!==0&&(i.witch=rd(i.witch,e,n,i.tuning,i.map.bounds),i.camera=xh(i.camera,e.zoom,{x:i.witch.x,y:fr(i.witch,i.tuning),z:i.witch.z},{x:i.witch.vx,z:i.witch.vz},i.witch.lift,n,i.tuning),e.pauseWaves&&(i.party.paused=!i.party.paused),e.nextWave&&(mu(i.party,i.map,i.clock.time),i.party.nextAt=i.clock.time+i.tuning.party.interval),td(i.party,i.map,i.clock.time,n),Of(i.creatures,i.witch.x,i.witch.z,od(i),n,i.clock.time,i.map),Zf(i.leash,i.creatures,{talk:!!e.talk,sigil:!!e.sigil,inviteNearest:e.inviteNearest},i.witch,i.witch.mode==="ground",i.clock.time,n,i.tuning))}const od=i=>Math.max(i.tuning.creatureSimRadius,i.tuning.haze.far+20+hu(i.map)*2.5),Hl=i=>Jc(i.camera,i.camera.lift,i.tuning);function gu(i){const e=i.map.areaAt(i.witch.x,i.witch.z),t=i.map.setPieceOf(e.cell[0],e.cell[1]);return fn[e.type].name+(t?` (set piece: ${t})`:"")}const ld="Witch tuning. Edit the numbers, push, and the playable link rebuilds. Distances are metres, times seconds, angles degrees. Keys starting with _ are notes.",cd="The forest: mapAreas x mapAreas areas cut by the fractal partition. An area is areaSize x areaScale metres across on average (areaScale 4 makes them four times as wide as the first 28 m areas; push it for bigger). areaSizeVariance (0-1) makes areas vary in size, some small, some large. borderLayers sets how wiggly borders are.",ud=20,hd=28,fd=4,dd=.7,pd=4,md="treeHeight and crownWidth scale the art's trees (1 is the Art Lab's size; crowns widen with treeHeight too, crownWidth is the total). treeDensity (0-1): the chance of a tree on each spot outside the clearings; clearingSize (0-1): how far out from an area's centre the ground stays fully open; clearingFalloff (0-1): over how much of the way to the border trees thicken to full density (small: crisp clearing edges); gladeAmount (0-1) of the woods is open in random glades about gladeScale metres across; trees sit on a staggered grid treeSpacingX by treeSpacingZ metres, so no two crowns pile up. A tree is left out where its crown (crownHalfWidth either side, crownHeight up) would hang over a clearing seen from the treetops.",gd=1,xd=.2,vd=.12,_d=.25,Md=38,Sd=1,yd=2.25,bd=1.7,wd=4.6,Ed=2.8,Td=10.5,Ad=11.25,Cd=3.4,Rd=4,Ld=.6,Pd="Speeds per mode, and how long rising and descending take. acceleration: how quickly she reaches her speed or stops in the treetops (per second; higher is snappier); groundAcceleration: the same on the ground. leanAt: the share of the top speed above which she leans into her flight.",Dd=17.5,Id=32,Ud=10,Nd=28,Fd=.7,Od=.7,Bd=.55,zd=1.4,kd=24,Gd="Near-isometric on the ground, after Transistor; lower over the treetops, looking toward the horizon to feel the speed. The camera follows the witch on a soft spring (follow: its stiffness; higher keeps her closer to the middle) and looks a little ahead of her: lookAhead seconds of flight, at most lookAheadMax metres, eased in at lookAheadEase. zoomEase and liftEase: how softly zoom and rising change the angle and distance. a narrow field of view (fov, degrees) seen from far off, so there is little perspective. Each mode has its own angle (degrees below horizontal) and distance from the witch, at zoomed-in and zoomed-out. Zoom moves between them in zoomSteps steps, starting at startZoom: with 4 steps and startZoom 1 the start is a third of the way out, so the defaults are ground 32 degrees at 100 m and treetop 36 degrees at 170 m, with one step in and two out from each.",Hd={fov:20,ground:{angleIn:30,angleOut:36,distanceIn:80,distanceOut:140},treetop:{angleIn:34,angleOut:40,distanceIn:150,distanceOut:210},lookAhead:.1,lookAheadMax:3,lookAheadEase:1.5,zoomEase:5,liftEase:8,zoomSteps:4,startZoom:1,follow:8},Vd="Everything the camera can see is drawn, plus viewMargin metres round the view, so nothing appears or vanishes on screen. haze: the twilight haze fades the forest from near to far metres from the witch; nothing is drawn beyond far. lightBudget: how many of the nearest point lights (campfires, magic stones, the dancefloor) light the scene at once. pixelSize: screen pixels per art pixel. glowReach: metres the witch's light reaches. spriteTilt: 1 = sprites face the camera fully, 0 = stand upright.",Wd=3,Xd=12,Yd=1,qd=1,Kd=16,$d=12,Zd=20,Jd="Light sources placed by seed, on a grid of spacing metres, mostly in clearings and at area edges: the chance per spot of a campfire, a magic stone, or a pond mirroring the moon (wetPond in wet areas: wetland, stream, bog, beaver pond, moor).",Qd="How far (reach, metres) and how strongly each kind of light lights its surroundings. glowPower: the witch's own glow (glowReach is its reach). Light falls off smoothly to nothing at its reach: no rings or bands.",jd={campfire:{reach:22,strength:2.6},stone:{reach:16,strength:1.8}},ep=2.2,tp="The music's clock (beats per minute): the lasers sweep to it and party animals dance to it. Later the music itself drives it.",np={bpm:120},ip="Each playing soundsystem's laser show: bursts of blockBars bars, on about duty of the time (seeded per soundsystem), up to maxCount beams stepping on the bars, fanned over spread degrees, swinging sweep degrees every sweepBeats beats, length metres tall, opacity 0-1, fading in over fadeIn and out over fadeOut seconds, and fading with distance from fadeNear to fadeFar metres. Glow only: no light, nothing from the light budget.",rp={on:!0,maxCount:9,length:420,spread:120,sweep:22,sweepBeats:2,opacity:.6,duty:.35,blockBars:4,fadeIn:.12,fadeOut:.4,fadeNear:140,fadeFar:480},sp="A sparkling line round the partified region's outside edge, in each area's sigil colour: width (px), brightness, sparkle (0-1, how much it twinkles and runs), step (metres between its sparks).",ap={on:!0,width:2,brightness:1.2,sparkle:.6,step:1.6},op={spacing:10,campfire:.035,magicStone:.025,pond:.02,wetPond:.12},lp={near:150,far:360},cp="bloom: a gentle glow round bright things (strength 0 or on false turns it off; threshold: how bright a pixel must be to glow). tiltShift: blurs the top and bottom of the screen so the forest looks like a miniature. strength: the blur at the screen's edges, in pixels; band: the height of the sharp band (0-1 of the screen); centre: where it sits (0 top, 0.5 middle, 1 bottom); where: 'before' blurs at the low resolution, before the pixels are scaled up, 'after' blurs the scaled-up image. Add ?tilt=before, ?tilt=after or ?tilt=off to the link to compare.",up="shadows: a flat shadow under every tree (cast away from the moon), bush and creature. canopyShadow: a dappled shadow from the canopy overhead (height in metres), thinner in clearings, drifting with the wind. mist: a low drifting mist (height in metres above the ground). Each has on and strength.",hp={on:!0,strength:.7},fp={on:!0,strength:.45,height:18,cover:.55,wind:.6},dp={on:!0,strength:.12,height:3,wind:.8},pp="fx: how the mist, the far haze and the canopy dapple are drawn. smooth: soft gradients (the mist in its own buffer, blurred a little and scaled up smoothly); pixel: dithered steps on the art's pixel grid. Object shadows stay pixel either way. ?fx=pixel or ?fx=smooth in the URL.",mp="smooth",gp="Inviting (DESIGN.md, the leash): on the ground, hold Talk within talkRange metres of a creature; you chat in emoji for talkTime seconds (babies, young, adults), taking turns every turn seconds (babies, young, adults), then it is invited and leashed to you. Letting go, rising or moving further than cancelDistance cancels it. Legends can't be invited: they give one unimpressed look. leash.length: how far a leashed creature roams from its leash point (you, or its sigil on the ground); runSpeed: how fast it hurries back when out of range (m/s); pickRadius: how near a placed sigil you must be to pick it up; spacing: how close two sigils may be put down (keep it above pickRadius, or a blocked spot picks up instead of fizzling). bond: how a creature shows its tie to its sigil (rim: a glow at its feet in the sigil's colour; sparks: one spark every sparkEvery seconds from sigil to creature, staggered; thread: a dotted line only under strain).",xp={talkRange:6,cancelDistance:10,talkTime:[3,6,12],turn:[.7,.9,1.3]},vp={length:8,runSpeed:4,pickRadius:2,spacing:4},_p={rim:!0,sparks:!0,thread:!0,sparkEvery:4},Mp="The party spreads: a wave every interval seconds (the first after startDelay more), partifying every area touching a partified one; maxPerWave caps a wave (0: no cap). transition: seconds an area takes to partify, 0 to skip the show. partyLight: the coloured light at each soundsystem (reach in metres, strength).",Sp={interval:30,startDelay:0,maxPerWave:0,transition:2.5,lightReach:30,lightStrength:1.6},yp="Colourful string lights between trees in every partified area: up to perArea spans, in chains of up to chainMax spans from tree to tree, each span spanMin to spanMax metres long, chains starting at least spread metres apart so they cover the whole area; at height metres, sagging sag metres per 8 m of span, a bulb every bulbSpacing metres in the palette's colours, twinkling (twinkle 0-1), a chase running along now and then at chaseSpeed bulbs per second. The bulbs only glow (bloom); they cast no light, so they cost nothing from the light budget.",bp={on:!0,perArea:40,spanMin:6,spanMax:22,chainMax:4,spread:14,height:6.5,sag:.9,bulbSpacing:.8,palette:["#fff1d6","#ff6fcf","#5fe8ff","#ffe25c","#b48cff","#7dff8a"],twinkle:.35,chaseSpeed:8},wp="The dancefloor: motes: magic particles drifting up off the circle (count, how high they rise in metres, speed in m/s, column: the share of the circle they rise from); a ring of standing stones (radius in metres, how many stones), a clear space of clearing metres round it, a glowing magic circle (two hues 0-1, pulse per second, runeSpeed in turns per minute) lighting the ground round it (lightReach metres, lightStrength), and a magic disco ball floating discoHeight metres up (discoSize metres across, spin turns per minute) throwing specks of light: specks is the share of the sphere that throws one, speckBrightness how bright, speckReach how far.",Ep={motes:{count:220,rise:110,speed:3.2,column:.8},radius:13.5,stones:27,clearing:9,circleHue:.86,circleHue2:.52,pulse:.35,runeSpeed:1,lightReach:36,lightStrength:2,discoHeight:7.5,discoSize:1.8,spin:4,specks:.22,speckBrightness:.9,speckReach:32},Tp="In ground mode the canopy stays drawn at the screen's edges, so she flies under the forest roof; a dithered hole round her is cut out, screenFraction of the screen's width across, with a soft edge (a fraction of the width). Rising closes the hole.",Ap={screenFraction:.8,edge:.1},Cp="Contrast: ambient scales the twilight fill (lower is darker shade under the canopy); black is the black point and gamma the curve applied to the whole picture, so dark goes near-black and lit stays bright.",Rp={black:.03,gamma:1.35,ambient:.35},Lp={on:!0,strength:.7,threshold:.55},Pp={on:!0,where:"before",strength:3,band:.4,centre:.55},Dp="Creatures grow more numerous and older with an area's distance from home (0 at the dancefloor, 1 at the map's edge): creaturesNear in the areas round home, creaturesFar at the edge (creatureCurve shapes the rise), youngShareFar of them young at the edge; adults from adultsFrom outward, adultShareFar of them at the edge. Legends are rare: at most one in any area, by a chance rising from 0 at legendsFrom to legendChanceFar at the edge; legendNextToHome puts one next to home, to look at early. Idle creatures roam their whole area. Only creatures whose home is within creatureSimRadius metres of the witch move (never less than the haze far edge plus 2.5 areas, so a creature resuming its roam always does so out of sight).",Ip=2,Up=20,Np=1.3,Fp=.5,Op=.35,Bp=.35,zp=.25,kp=!0,Gp=.55,Hp=600,Vp=.6,Wp="setPieceChance: the share of areas, among the types that have a set piece, that show theirs. Wall objects (an area type's edges: puddles, henges, hedges) stand where areas meet, one per wallSpacing metres with chance wallDensity; they do not block movement.",Xp=.25,Yp=.35,qp={_readme:ld,_map:cd,mapAreas:ud,areaSize:hd,areaScale:fd,areaSizeVariance:dd,borderLayers:pd,_trees:md,treeDensity:gd,clearingSize:xd,clearingFalloff:vd,gladeAmount:_d,gladeScale:Md,bushDensity:Sd,treeHeight:yd,crownWidth:bd,treeSpacingX:wd,treeSpacingZ:Ed,crownHalfWidth:Td,crownHeight:Ad,bushSpacing:Cd,wallSpacing:Rd,wallDensity:Ld,_witch:Pd,groundSpeed:Dd,treetopSpeed:Id,acceleration:Ud,groundAcceleration:Nd,leanAt:Fd,riseTime:Od,descendTime:Bd,groundHeight:zd,treetopHeight:kd,_camera:Gd,camera:Hd,_look:Vd,pixelSize:Wd,glowReach:Xd,glowHeight:Yd,spriteTilt:qd,artPixelsPerMetre:Kd,viewMargin:$d,lightBudget:Zd,_lightSources:Jd,_lights:Qd,lights:jd,glowPower:ep,_beat:tp,beat:np,_lasers:ip,lasers:rp,_borders:sp,borders:ap,lightSources:op,haze:lp,_post:cp,_shadows:up,shadows:hp,canopyShadow:fp,mist:dp,_fx:pp,fx:mp,_invite:gp,invite:xp,leash:vp,bond:_p,_party:Mp,party:Sp,_stringLights:yp,stringLights:bp,_dancefloor:wp,dancefloor:Ep,_canopyCutout:Tp,canopyCutout:Ap,_tone:Cp,tone:Rp,bloom:Lp,tiltShift:Pp,_creatures:Dp,creaturesNear:Ip,creaturesFar:Up,creatureCurve:Np,youngShareFar:Fp,adultsFrom:Op,adultShareFar:Bp,legendChanceFar:zp,legendNextToHome:kp,legendsFrom:Gp,creatureSimRadius:Hp,creatureSpeed:Vp,_setPieces:Wp,setPieceChance:Xp,legendSpeed:Yp},zi=qp;class Kp{keys=new Set;pressed=new Set;padPrev=[];touch={x:0,y:0,toggle:!1,zoom:0,debug:!1};onAny=null;constructor(e=window){e.addEventListener("keydown",t=>{if(t.repeat){this.isGameKey(t.code)&&t.preventDefault();return}this.keys.add(t.code),this.isGameKey(t.code)&&t.preventDefault(),this.onAny?.()||this.pressed.add(t.code)}),e.addEventListener("keyup",t=>this.keys.delete(t.code)),e.addEventListener("blur",()=>this.keys.clear())}isGameKey(e){return/^(Arrow|Space$|Key[WASDZXENPTI]$|Shift|Minus$|Equal$|NumpadAdd$|NumpadSubtract$|Backquote$)/.test(e)}clearPresses(){this.pressed.clear();const e=this.touch;e.toggle=!1,e.zoom=0,e.debug=!1}read(){const e=this.pressed.has("KeyN")||this.touch.nextWave,t=this.pressed.has("KeyP")||this.touch.pauseWaves;this.touch.nextWave=!1,this.touch.pauseWaves=!1;const n=m=>this.keys.has(m)?1:0,r=m=>this.pressed.has(m);let s=n("KeyD")+n("ArrowRight")-n("KeyA")-n("ArrowLeft"),a=n("KeyS")+n("ArrowDown")-n("KeyW")-n("ArrowUp"),o=r("Space"),c=(r("KeyX")||r("Minus")||r("NumpadSubtract")?1:0)-(r("KeyZ")||r("Equal")||r("NumpadAdd")?1:0),l=r("Backquote"),h=n("KeyT")+n("ShiftLeft")+n("ShiftRight")>0,f=r("KeyE");const u=r("KeyI");this.pressed.clear();const d=typeof navigator<"u"&&navigator.getGamepads?navigator.getGamepads():[];for(const m of d){if(!m)continue;const p=C=>!!m.buttons[C]?.pressed,S=m.buttons.some((C,A)=>C.pressed&&!this.padPrev[A])&&!!this.onAny?.(),b=C=>!S&&p(C)&&!this.padPrev[C];let w=m.axes[0]??0,E=m.axes[1]??0;const L=Math.hypot(w,E),M=.18;if(L<M)w=0,E=0;else{const C=(Math.min(1,L)-M)/(1-M)/L;w*=C,E*=C}w+=(p(15)?1:0)-(p(14)?1:0),E+=(p(13)?1:0)-(p(12)?1:0),s+=w,a+=E,b(3)&&(o=!0),(b(4)||b(6))&&(c+=1),(b(5)||b(7))&&(c-=1),b(8)&&(l=!0),p(0)&&(h=!0),b(2)&&(f=!0),this.padPrev=m.buttons.map(C=>C.pressed);break}const x=this.touch;s+=x.x,a+=x.y,x.toggle&&(o=!0),c+=x.zoom,x.debug&&(l=!0),x.talk&&(h=!0),x.sigil&&(f=!0),x.toggle=!1,x.zoom=0,x.debug=!1,x.sigil=!1;const g=Math.hypot(s,a);return g>1&&(s/=g,a/=g),{moveX:s,moveZ:a,toggleMode:o,zoom:Math.sign(c),debug:l,nextWave:e,pauseWaves:t,talk:h,sigil:f,inviteNearest:u}}}const al="186",$p=0,Vl=1,Zp=2,Rs=1,Jp=2,Nr=3,Di=0,tn=1,Kn=2,Bn=0,ar=1,dr=2,Wl=3,Xl=4,Qp=5,tr=100,jp=101,em=102,tm=103,nm=104,im=200,rm=201,sm=202,am=203,xu=204,vu=205,om=206,lm=207,cm=208,um=209,hm=210,fm=211,dm=212,pm=213,mm=214,ro=0,so=1,ao=2,zr=3,oo=4,lo=5,co=6,uo=7,_u=0,gm=1,xm=2,zn=0,Mu=1,Su=2,yu=3,bu=4,wu=5,Eu=6,Tu=7,Au=300,Ii=301,pr=302,ga=303,xa=304,ra=306,ho=1e3,$n=1001,fo=1002,Dt=1003,vm=1004,Zr=1005,Rt=1006,va=1007,Ai=1008,on=1009,Cu=1010,Ru=1011,kr=1012,ol=1013,kn=1014,Fn=1015,Gn=1016,ll=1017,cl=1018,Gr=1020,Lu=35902,Pu=35899,Du=1021,Iu=1022,ln=1023,Qn=1026,Ci=1027,Uu=1028,ul=1029,Ui=1030,hl=1031,fl=1033,Ls=33776,Ps=33777,Ds=33778,Is=33779,po=35840,mo=35841,go=35842,xo=35843,vo=36196,_o=37492,Mo=37496,So=37488,yo=37489,zs=37490,bo=37491,wo=37808,Eo=37809,To=37810,Ao=37811,Co=37812,Ro=37813,Lo=37814,Po=37815,Do=37816,Io=37817,Uo=37818,No=37819,Fo=37820,Oo=37821,Bo=36492,zo=36494,ko=36495,Go=36283,Ho=36284,ks=36285,Vo=36286,_m=3200,Yl=0,Mm=1,An="",xn="srgb",Hr="srgb-linear",Gs="linear",mt="srgb",_a=7680,Sm=519,ym=512,bm=513,wm=514,dl=515,Em=516,Tm=517,pl=518,Am=519,Cm=35044,or=35048,ql="300 es",On=2e3,Hs=2001;function Rm(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Vs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Lm(){const i=Vs("canvas");return i.style.display="block",i}const Kl={};function $l(...i){const e="THREE."+i.shift();console.log(e,...i)}function Nu(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Be(...i){i=Nu(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function rt(...i){i=Nu(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function lr(...i){const e=i.join(" ");e in Kl||(Kl[e]=!0,Be(...i))}function Pm(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const Dm={[ro]:so,[ao]:co,[oo]:uo,[zr]:lo,[so]:ro,[co]:ao,[uo]:oo,[lo]:zr};class Fi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const r=n[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const qt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ma=Math.PI/180,Wo=180/Math.PI;function Wr(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(qt[i&255]+qt[i>>8&255]+qt[i>>16&255]+qt[i>>24&255]+"-"+qt[e&255]+qt[e>>8&255]+"-"+qt[e>>16&15|64]+qt[e>>24&255]+"-"+qt[t&63|128]+qt[t>>8&255]+"-"+qt[t>>16&255]+qt[t>>24&255]+qt[n&255]+qt[n>>8&255]+qt[n>>16&255]+qt[n>>24&255]).toLowerCase()}function nt(i,e,t){return Math.max(e,Math.min(t,i))}function Im(i,e){return(i%e+e)%e}function Sa(i,e,t){return(1-t)*i+t*e}function Tr(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function en(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class He{static{He.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(nt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(nt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class vr{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let c=n[r+0],l=n[r+1],h=n[r+2],f=n[r+3],u=s[a+0],d=s[a+1],x=s[a+2],g=s[a+3];if(f!==g||c!==u||l!==d||h!==x){let m=c*u+l*d+h*x+f*g;m<0&&(u=-u,d=-d,x=-x,g=-g,m=-m);let p=1-o;if(m<.9995){const _=Math.acos(m),S=Math.sin(_);p=Math.sin(p*_)/S,o=Math.sin(o*_)/S,c=c*p+u*o,l=l*p+d*o,h=h*p+x*o,f=f*p+g*o}else{c=c*p+u*o,l=l*p+d*o,h=h*p+x*o,f=f*p+g*o;const _=1/Math.sqrt(c*c+l*l+h*h+f*f);c*=_,l*=_,h*=_,f*=_}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,r,s,a){const o=n[r],c=n[r+1],l=n[r+2],h=n[r+3],f=s[a],u=s[a+1],d=s[a+2],x=s[a+3];return e[t]=o*x+h*f+c*d-l*u,e[t+1]=c*x+h*u+l*f-o*d,e[t+2]=l*x+h*d+o*u-c*f,e[t+3]=h*x-o*f-c*u-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(r/2),f=o(s/2),u=c(n/2),d=c(r/2),x=c(s/2);switch(a){case"XYZ":this._x=u*h*f+l*d*x,this._y=l*d*f-u*h*x,this._z=l*h*x+u*d*f,this._w=l*h*f-u*d*x;break;case"YXZ":this._x=u*h*f+l*d*x,this._y=l*d*f-u*h*x,this._z=l*h*x-u*d*f,this._w=l*h*f+u*d*x;break;case"ZXY":this._x=u*h*f-l*d*x,this._y=l*d*f+u*h*x,this._z=l*h*x+u*d*f,this._w=l*h*f-u*d*x;break;case"ZYX":this._x=u*h*f-l*d*x,this._y=l*d*f+u*h*x,this._z=l*h*x-u*d*f,this._w=l*h*f+u*d*x;break;case"YZX":this._x=u*h*f+l*d*x,this._y=l*d*f+u*h*x,this._z=l*h*x-u*d*f,this._w=l*h*f-u*d*x;break;case"XZY":this._x=u*h*f-l*d*x,this._y=l*d*f-u*h*x,this._z=l*h*x+u*d*f,this._w=l*h*f+u*d*x;break;default:Be("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],f=t[10],u=n+o+f;if(u>0){const d=.5/Math.sqrt(u+1);this._w=.25/d,this._x=(h-c)*d,this._y=(s-l)*d,this._z=(a-r)*d}else if(n>o&&n>f){const d=2*Math.sqrt(1+n-o-f);this._w=(h-c)/d,this._x=.25*d,this._y=(r+a)/d,this._z=(s+l)/d}else if(o>f){const d=2*Math.sqrt(1+o-n-f);this._w=(s-l)/d,this._x=(r+a)/d,this._y=.25*d,this._z=(c+h)/d}else{const d=2*Math.sqrt(1+f-n-o);this._w=(a-r)/d,this._x=(s+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(nt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+r*l-s*c,this._y=r*h+a*c+s*o-n*l,this._z=s*h+a*l+n*c-r*o,this._w=a*h-n*o-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,s=-s,a=-a,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+n*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class W{static{W.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Zl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Zl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*r-o*n),h=2*(o*t-s*r),f=2*(s*n-a*t);return this.x=t+c*l+a*f-o*h,this.y=n+c*h+o*l-s*f,this.z=r+c*f+s*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this.z=nt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this.z=nt(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(nt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=r*c-s*o,this.y=s*a-n*c,this.z=n*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ya.copy(this).projectOnVector(e),this.sub(ya)}reflect(e){return this.sub(ya.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(nt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ya=new W,Zl=new vr;class We{static{We.prototype.isMatrix3=!0}constructor(e,t,n,r,s,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,c,l)}set(e,t,n,r,s,a,o,c,l){const h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=t,h[4]=s,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],f=n[7],u=n[2],d=n[5],x=n[8],g=r[0],m=r[3],p=r[6],_=r[1],S=r[4],b=r[7],w=r[2],E=r[5],L=r[8];return s[0]=a*g+o*_+c*w,s[3]=a*m+o*S+c*E,s[6]=a*p+o*b+c*L,s[1]=l*g+h*_+f*w,s[4]=l*m+h*S+f*E,s[7]=l*p+h*b+f*L,s[2]=u*g+d*_+x*w,s[5]=u*m+d*S+x*E,s[8]=u*p+d*b+x*L,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*s*h+n*o*c+r*s*l-r*a*c}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],f=h*a-o*l,u=o*c-h*s,d=l*s-a*c,x=t*f+n*u+r*d;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/x;return e[0]=f*g,e[1]=(r*l-h*n)*g,e[2]=(o*n-r*a)*g,e[3]=u*g,e[4]=(h*t-r*c)*g,e[5]=(r*s-o*t)*g,e[6]=d*g,e[7]=(n*c-l*t)*g,e[8]=(a*t-n*s)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-r*l,r*c,-r*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return lr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(ba.makeScale(e,t)),this}rotate(e){return lr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(ba.makeRotation(-e)),this}translate(e,t){return lr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(ba.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ba=new We,Jl=new We().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ql=new We().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Um(){const i={enabled:!0,workingColorSpace:Hr,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===mt&&(r.r=Jn(r.r),r.g=Jn(r.g),r.b=Jn(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===mt&&(r.r=cr(r.r),r.g=cr(r.g),r.b=cr(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===An?Gs:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return lr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return lr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Hr]:{primaries:e,whitePoint:n,transfer:Gs,toXYZ:Jl,fromXYZ:Ql,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:xn},outputColorSpaceConfig:{drawingBufferColorSpace:xn}},[xn]:{primaries:e,whitePoint:n,transfer:mt,toXYZ:Jl,fromXYZ:Ql,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:xn}}}),i}const tt=Um();function Jn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function cr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let ki;class Nm{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ki===void 0&&(ki=Vs("canvas")),ki.width=e.width,ki.height=e.height;const r=ki.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=ki}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Vs("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Jn(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Jn(t[n]/255)*255):t[n]=Jn(t[n]);return{data:t,width:e.width,height:e.height}}else return Be("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Fm=0;class ml{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Fm++}),this.uuid=Wr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(wa(r[a].image)):s.push(wa(r[a]))}else s=wa(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function wa(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Nm.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Be("Texture: Unable to serialize Texture."),{})}let Om=0;const Ea=new W;class Zt extends Fi{constructor(e=Zt.DEFAULT_IMAGE,t=Zt.DEFAULT_MAPPING,n=$n,r=$n,s=Rt,a=Ai,o=ln,c=on,l=Zt.DEFAULT_ANISOTROPY,h=An){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Om++}),this.uuid=Wr(),this.name="",this.source=new ml(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new He(0,0),this.repeat=new He(1,1),this.center=new He(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new We,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ea).x}get height(){return this.source.getSize(Ea).y}get depth(){return this.source.getSize(Ea).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Be(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Be(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Au)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ho:e.x=e.x-Math.floor(e.x);break;case $n:e.x=e.x<0?0:1;break;case fo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ho:e.y=e.y-Math.floor(e.y);break;case $n:e.y=e.y<0?0:1;break;case fo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Zt.DEFAULT_IMAGE=null;Zt.DEFAULT_MAPPING=Au;Zt.DEFAULT_ANISOTROPY=1;class ot{static{ot.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const c=e.elements,l=c[0],h=c[4],f=c[8],u=c[1],d=c[5],x=c[9],g=c[2],m=c[6],p=c[10];if(Math.abs(h-u)<.01&&Math.abs(f-g)<.01&&Math.abs(x-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(f+g)<.1&&Math.abs(x+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(l+1)/2,b=(d+1)/2,w=(p+1)/2,E=(h+u)/4,L=(f+g)/4,M=(x+m)/4;return S>b&&S>w?S<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(S),r=E/n,s=L/n):b>w?b<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(b),n=E/r,s=M/r):w<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),n=L/s,r=M/s),this.set(n,r,s,t),this}let _=Math.sqrt((m-x)*(m-x)+(f-g)*(f-g)+(u-h)*(u-h));return Math.abs(_)<.001&&(_=1),this.x=(m-x)/_,this.y=(f-g)/_,this.z=(u-h)/_,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this.z=nt(this.z,e.z,t.z),this.w=nt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this.z=nt(this.z,e,t),this.w=nt(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(nt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Bm extends Fi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Rt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new ot(0,0,e,t),this.scissorTest=!1,this.viewport=new ot(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:n.depth},s=new Zt(r),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Rt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new ml(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Mn extends Bm{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Fu extends Zt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=$n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class zm extends Zt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=$n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class At{static{At.prototype.isMatrix4=!0}constructor(e,t,n,r,s,a,o,c,l,h,f,u,d,x,g,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,c,l,h,f,u,d,x,g,m)}set(e,t,n,r,s,a,o,c,l,h,f,u,d,x,g,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=r,p[1]=s,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=h,p[10]=f,p[14]=u,p[3]=d,p[7]=x,p[11]=g,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new At().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,r=1/Gi.setFromMatrixColumn(e,0).length(),s=1/Gi.setFromMatrixColumn(e,1).length(),a=1/Gi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(r),l=Math.sin(r),h=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const u=a*h,d=a*f,x=o*h,g=o*f;t[0]=c*h,t[4]=-c*f,t[8]=l,t[1]=d+x*l,t[5]=u-g*l,t[9]=-o*c,t[2]=g-u*l,t[6]=x+d*l,t[10]=a*c}else if(e.order==="YXZ"){const u=c*h,d=c*f,x=l*h,g=l*f;t[0]=u+g*o,t[4]=x*o-d,t[8]=a*l,t[1]=a*f,t[5]=a*h,t[9]=-o,t[2]=d*o-x,t[6]=g+u*o,t[10]=a*c}else if(e.order==="ZXY"){const u=c*h,d=c*f,x=l*h,g=l*f;t[0]=u-g*o,t[4]=-a*f,t[8]=x+d*o,t[1]=d+x*o,t[5]=a*h,t[9]=g-u*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const u=a*h,d=a*f,x=o*h,g=o*f;t[0]=c*h,t[4]=x*l-d,t[8]=u*l+g,t[1]=c*f,t[5]=g*l+u,t[9]=d*l-x,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const u=a*c,d=a*l,x=o*c,g=o*l;t[0]=c*h,t[4]=g-u*f,t[8]=x*f+d,t[1]=f,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=d*f+x,t[10]=u-g*f}else if(e.order==="XZY"){const u=a*c,d=a*l,x=o*c,g=o*l;t[0]=c*h,t[4]=-f,t[8]=l*h,t[1]=u*f+g,t[5]=a*h,t[9]=d*f-x,t[2]=x*f-d,t[6]=o*h,t[10]=g*f+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(km,e,Gm)}lookAt(e,t,n){const r=this.elements;return rn.subVectors(e,t),rn.lengthSq()===0&&(rn.z=1),rn.normalize(),ii.crossVectors(n,rn),ii.lengthSq()===0&&(Math.abs(n.z)===1?rn.x+=1e-4:rn.z+=1e-4,rn.normalize(),ii.crossVectors(n,rn)),ii.normalize(),Jr.crossVectors(rn,ii),r[0]=ii.x,r[4]=Jr.x,r[8]=rn.x,r[1]=ii.y,r[5]=Jr.y,r[9]=rn.y,r[2]=ii.z,r[6]=Jr.z,r[10]=rn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],f=n[5],u=n[9],d=n[13],x=n[2],g=n[6],m=n[10],p=n[14],_=n[3],S=n[7],b=n[11],w=n[15],E=r[0],L=r[4],M=r[8],C=r[12],A=r[1],P=r[5],F=r[9],U=r[13],D=r[2],O=r[6],k=r[10],Y=r[14],j=r[3],X=r[7],te=r[11],N=r[15];return s[0]=a*E+o*A+c*D+l*j,s[4]=a*L+o*P+c*O+l*X,s[8]=a*M+o*F+c*k+l*te,s[12]=a*C+o*U+c*Y+l*N,s[1]=h*E+f*A+u*D+d*j,s[5]=h*L+f*P+u*O+d*X,s[9]=h*M+f*F+u*k+d*te,s[13]=h*C+f*U+u*Y+d*N,s[2]=x*E+g*A+m*D+p*j,s[6]=x*L+g*P+m*O+p*X,s[10]=x*M+g*F+m*k+p*te,s[14]=x*C+g*U+m*Y+p*N,s[3]=_*E+S*A+b*D+w*j,s[7]=_*L+S*P+b*O+w*X,s[11]=_*M+S*F+b*k+w*te,s[15]=_*C+S*U+b*Y+w*N,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],f=e[6],u=e[10],d=e[14],x=e[3],g=e[7],m=e[11],p=e[15],_=c*d-l*u,S=o*d-l*f,b=o*u-c*f,w=a*d-l*h,E=a*u-c*h,L=a*f-o*h;return t*(g*_-m*S+p*b)-n*(x*_-m*w+p*E)+r*(x*S-g*w+p*L)-s*(x*b-g*E+m*L)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[1],a=e[5],o=e[9],c=e[2],l=e[6],h=e[10];return t*(a*h-o*l)-n*(s*h-o*c)+r*(s*l-a*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],f=e[9],u=e[10],d=e[11],x=e[12],g=e[13],m=e[14],p=e[15],_=t*o-n*a,S=t*c-r*a,b=t*l-s*a,w=n*c-r*o,E=n*l-s*o,L=r*l-s*c,M=h*g-f*x,C=h*m-u*x,A=h*p-d*x,P=f*m-u*g,F=f*p-d*g,U=u*p-d*m,D=_*U-S*F+b*P+w*A-E*C+L*M;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const O=1/D;return e[0]=(o*U-c*F+l*P)*O,e[1]=(r*F-n*U-s*P)*O,e[2]=(g*L-m*E+p*w)*O,e[3]=(u*E-f*L-d*w)*O,e[4]=(c*A-a*U-l*C)*O,e[5]=(t*U-r*A+s*C)*O,e[6]=(m*b-x*L-p*S)*O,e[7]=(h*L-u*b+d*S)*O,e[8]=(a*F-o*A+l*M)*O,e[9]=(n*A-t*F-s*M)*O,e[10]=(x*E-g*b+p*_)*O,e[11]=(f*b-h*E-d*_)*O,e[12]=(o*C-a*P-c*M)*O,e[13]=(t*P-n*C+r*M)*O,e[14]=(g*S-x*w-m*_)*O,e[15]=(h*w-f*S+u*_)*O,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,c=e.z,l=s*a,h=s*o;return this.set(l*a+n,l*o-r*c,l*c+r*o,0,l*o+r*c,h*o+n,h*c-r*a,0,l*c-r*o,h*c+r*a,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,h=a+a,f=o+o,u=s*l,d=s*h,x=s*f,g=a*h,m=a*f,p=o*f,_=c*l,S=c*h,b=c*f,w=n.x,E=n.y,L=n.z;return r[0]=(1-(g+p))*w,r[1]=(d+b)*w,r[2]=(x-S)*w,r[3]=0,r[4]=(d-b)*E,r[5]=(1-(u+p))*E,r[6]=(m+_)*E,r[7]=0,r[8]=(x+S)*L,r[9]=(m-_)*L,r[10]=(1-(u+g))*L,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return n.set(1,1,1),t.identity(),this;let a=Gi.set(r[0],r[1],r[2]).length();const o=Gi.set(r[4],r[5],r[6]).length(),c=Gi.set(r[8],r[9],r[10]).length();s<0&&(a=-a),bn.copy(this);const l=1/a,h=1/o,f=1/c;return bn.elements[0]*=l,bn.elements[1]*=l,bn.elements[2]*=l,bn.elements[4]*=h,bn.elements[5]*=h,bn.elements[6]*=h,bn.elements[8]*=f,bn.elements[9]*=f,bn.elements[10]*=f,t.setFromRotationMatrix(bn),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,r,s,a,o=On,c=!1){const l=this.elements,h=2*s/(t-e),f=2*s/(n-r),u=(t+e)/(t-e),d=(n+r)/(n-r);let x,g;if(c)x=s/(a-s),g=a*s/(a-s);else if(o===On)x=-(a+s)/(a-s),g=-2*a*s/(a-s);else if(o===Hs)x=-a/(a-s),g=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=f,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=x,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=On,c=!1){const l=this.elements,h=2/(t-e),f=2/(n-r),u=-(t+e)/(t-e),d=-(n+r)/(n-r);let x,g;if(c)x=1/(a-s),g=a/(a-s);else if(o===On)x=-2/(a-s),g=-(a+s)/(a-s);else if(o===Hs)x=-1/(a-s),g=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=f,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=x,l[14]=g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Gi=new W,bn=new At,km=new W(0,0,0),Gm=new W(1,1,1),ii=new W,Jr=new W,rn=new W,jl=new At,ec=new vr;class Ni{constructor(e=0,t=0,n=0,r=Ni.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],h=r[9],f=r[2],u=r[6],d=r[10];switch(t){case"XYZ":this._y=Math.asin(nt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-nt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(nt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-nt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,d),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(nt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-nt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,d),this._y=0);break;default:Be("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return jl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(jl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ec.setFromEuler(this),this.setFromQuaternion(ec,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ni.DEFAULT_ORDER="XYZ";class Ou{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Hm=0;const tc=new W,Hi=new vr,Vn=new At,Qr=new W,Ar=new W,Vm=new W,Wm=new vr,nc=new W(1,0,0),ic=new W(0,1,0),rc=new W(0,0,1),sc={type:"added"},Xm={type:"removed"},Vi={type:"childadded",child:null},Ta={type:"childremoved",child:null};class jt extends Fi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Hm++}),this.uuid=Wr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=jt.DEFAULT_UP.clone();const e=new W,t=new Ni,n=new vr,r=new W(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new At},normalMatrix:{value:new We}}),this.matrix=new At,this.matrixWorld=new At,this.matrixAutoUpdate=jt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=jt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ou,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Hi.setFromAxisAngle(e,t),this.quaternion.multiply(Hi),this}rotateOnWorldAxis(e,t){return Hi.setFromAxisAngle(e,t),this.quaternion.premultiply(Hi),this}rotateX(e){return this.rotateOnAxis(nc,e)}rotateY(e){return this.rotateOnAxis(ic,e)}rotateZ(e){return this.rotateOnAxis(rc,e)}translateOnAxis(e,t){return tc.copy(e).applyQuaternion(this.quaternion),this.position.add(tc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(nc,e)}translateY(e){return this.translateOnAxis(ic,e)}translateZ(e){return this.translateOnAxis(rc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Vn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Qr.copy(e):Qr.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Ar.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Vn.lookAt(Ar,Qr,this.up):Vn.lookAt(Qr,Ar,this.up),this.quaternion.setFromRotationMatrix(Vn),r&&(Vn.extractRotation(r.matrixWorld),Hi.setFromRotationMatrix(Vn),this.quaternion.premultiply(Hi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(rt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(sc),Vi.child=e,this.dispatchEvent(Vi),Vi.child=null):rt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Xm),Ta.child=e,this.dispatchEvent(Ta),Ta.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Vn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Vn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Vn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(sc),Vi.child=e,this.dispatchEvent(Vi),Vi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ar,e,Vm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ar,Wm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*r,s[13]+=n-s[1]*t-s[5]*n-s[9]*r,s[14]+=r-s[2]*t-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const f=c[l];s(e.shapes,f)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),f=a(e.shapes),u=a(e.skeletons),d=a(e.animations),x=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),u.length>0&&(n.skeletons=u),d.length>0&&(n.animations=d),x.length>0&&(n.nodes=x)}return n.object=r,n;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}jt.DEFAULT_UP=new W(0,1,0);jt.DEFAULT_MATRIX_AUTO_UPDATE=!0;jt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Fr extends jt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ym={type:"move"};class Aa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Fr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Fr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new W,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new W),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Fr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new W,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new W,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const g of e.hand.values()){const m=t.getJointPose(g,n),p=this._getHandJoint(l,g);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],u=h.position.distanceTo(f.position),d=.02,x=.005;l.inputState.pinching&&u>d+x?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=d-x&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Ym)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Fr;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Bu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ri={h:0,s:0,l:0},jr={h:0,s:0,l:0};function Ca(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Qe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=xn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,tt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=tt.workingColorSpace){return this.r=e,this.g=t,this.b=n,tt.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=tt.workingColorSpace){if(e=Im(e,1),t=nt(t,0,1),n=nt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Ca(a,s,e+1/3),this.g=Ca(a,s,e),this.b=Ca(a,s,e-1/3)}return tt.colorSpaceToWorking(this,r),this}setStyle(e,t=xn){function n(s){s!==void 0&&parseFloat(s)<1&&Be("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Be("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Be("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=xn){const n=Bu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Be("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Jn(e.r),this.g=Jn(e.g),this.b=Jn(e.b),this}copyLinearToSRGB(e){return this.r=cr(e.r),this.g=cr(e.g),this.b=cr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=xn){return tt.workingToColorSpace(Kt.copy(this),e),Math.round(nt(Kt.r*255,0,255))*65536+Math.round(nt(Kt.g*255,0,255))*256+Math.round(nt(Kt.b*255,0,255))}getHexString(e=xn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=tt.workingColorSpace){tt.workingToColorSpace(Kt.copy(this),t);const n=Kt.r,r=Kt.g,s=Kt.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const f=a-o;switch(l=h<=.5?f/(a+o):f/(2-a-o),a){case n:c=(r-s)/f+(r<s?6:0);break;case r:c=(s-n)/f+2;break;case s:c=(n-r)/f+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=tt.workingColorSpace){return tt.workingToColorSpace(Kt.copy(this),t),e.r=Kt.r,e.g=Kt.g,e.b=Kt.b,e}getStyle(e=xn){tt.workingToColorSpace(Kt.copy(this),e);const t=Kt.r,n=Kt.g,r=Kt.b;return e!==xn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(ri),this.setHSL(ri.h+e,ri.s+t,ri.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ri),e.getHSL(jr);const n=Sa(ri.h,jr.h,t),r=Sa(ri.s,jr.s,t),s=Sa(ri.l,jr.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Kt=new Qe;Qe.NAMES=Bu;class ac extends jt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ni,this.environmentIntensity=1,this.environmentRotation=new Ni,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const wn=new W,Wn=new W,Ra=new W,Xn=new W,Wi=new W,Xi=new W,oc=new W,La=new W,Pa=new W,Da=new W,Ia=new ot,Ua=new ot,Na=new ot;class Cn{constructor(e=new W,t=new W,n=new W){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),wn.subVectors(e,t),r.cross(wn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){wn.subVectors(r,t),Wn.subVectors(n,t),Ra.subVectors(e,t);const a=wn.dot(wn),o=wn.dot(Wn),c=wn.dot(Ra),l=Wn.dot(Wn),h=Wn.dot(Ra),f=a*l-o*o;if(f===0)return s.set(0,0,0),null;const u=1/f,d=(l*c-o*h)*u,x=(a*h-o*c)*u;return s.set(1-d-x,x,d)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Xn)===null?!1:Xn.x>=0&&Xn.y>=0&&Xn.x+Xn.y<=1}static getInterpolation(e,t,n,r,s,a,o,c){return this.getBarycoord(e,t,n,r,Xn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Xn.x),c.addScaledVector(a,Xn.y),c.addScaledVector(o,Xn.z),c)}static getInterpolatedAttribute(e,t,n,r,s,a){return Ia.setScalar(0),Ua.setScalar(0),Na.setScalar(0),Ia.fromBufferAttribute(e,t),Ua.fromBufferAttribute(e,n),Na.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Ia,s.x),a.addScaledVector(Ua,s.y),a.addScaledVector(Na,s.z),a}static isFrontFacing(e,t,n,r){return wn.subVectors(n,t),Wn.subVectors(e,t),wn.cross(Wn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return wn.subVectors(this.c,this.b),Wn.subVectors(this.a,this.b),wn.cross(Wn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Cn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Cn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return Cn.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return Cn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Cn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let a,o;Wi.subVectors(r,n),Xi.subVectors(s,n),La.subVectors(e,n);const c=Wi.dot(La),l=Xi.dot(La);if(c<=0&&l<=0)return t.copy(n);Pa.subVectors(e,r);const h=Wi.dot(Pa),f=Xi.dot(Pa);if(h>=0&&f<=h)return t.copy(r);const u=c*f-h*l;if(u<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(Wi,a);Da.subVectors(e,s);const d=Wi.dot(Da),x=Xi.dot(Da);if(x>=0&&d<=x)return t.copy(s);const g=d*l-c*x;if(g<=0&&l>=0&&x<=0)return o=l/(l-x),t.copy(n).addScaledVector(Xi,o);const m=h*x-d*f;if(m<=0&&f-h>=0&&d-x>=0)return oc.subVectors(s,r),o=(f-h)/(f-h+(d-x)),t.copy(r).addScaledVector(oc,o);const p=1/(m+g+u);return a=g*p,o=u*p,t.copy(n).addScaledVector(Wi,a).addScaledVector(Xi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class _r{constructor(e=new W(1/0,1/0,1/0),t=new W(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(En.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(En.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=En.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,En):En.fromBufferAttribute(s,a),En.applyMatrix4(e.matrixWorld),this.expandByPoint(En);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),es.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),es.copy(n.boundingBox)),es.applyMatrix4(e.matrixWorld),this.union(es)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,En),En.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Cr),ts.subVectors(this.max,Cr),Yi.subVectors(e.a,Cr),qi.subVectors(e.b,Cr),Ki.subVectors(e.c,Cr),si.subVectors(qi,Yi),ai.subVectors(Ki,qi),vi.subVectors(Yi,Ki);let t=[0,-si.z,si.y,0,-ai.z,ai.y,0,-vi.z,vi.y,si.z,0,-si.x,ai.z,0,-ai.x,vi.z,0,-vi.x,-si.y,si.x,0,-ai.y,ai.x,0,-vi.y,vi.x,0];return!Fa(t,Yi,qi,Ki,ts)||(t=[1,0,0,0,1,0,0,0,1],!Fa(t,Yi,qi,Ki,ts))?!1:(ns.crossVectors(si,ai),t=[ns.x,ns.y,ns.z],Fa(t,Yi,qi,Ki,ts))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,En).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(En).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Yn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Yn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Yn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Yn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Yn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Yn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Yn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Yn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Yn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Yn=[new W,new W,new W,new W,new W,new W,new W,new W],En=new W,es=new _r,Yi=new W,qi=new W,Ki=new W,si=new W,ai=new W,vi=new W,Cr=new W,ts=new W,ns=new W,_i=new W;function Fa(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){_i.fromArray(i,s);const o=r.x*Math.abs(_i.x)+r.y*Math.abs(_i.y)+r.z*Math.abs(_i.z),c=e.dot(_i),l=t.dot(_i),h=n.dot(_i);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const Ft=new W,is=new He;let qm=0;class un extends Fi{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:qm++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Cm,this.updateRanges=[],this.gpuType=Fn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)is.fromBufferAttribute(this,t),is.applyMatrix3(e),this.setXY(t,is.x,is.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix3(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix4(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyNormalMatrix(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.transformDirection(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Tr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=en(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Tr(t,this.array)),t}setX(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Tr(t,this.array)),t}setY(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Tr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Tr(t,this.array)),t}setW(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=en(t,this.array),n=en(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=en(t,this.array),n=en(n,this.array),r=en(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=en(t,this.array),n=en(n,this.array),r=en(r,this.array),s=en(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class zu extends un{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class ku extends un{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Lt extends un{constructor(e,t,n){super(new Float32Array(e),t,n)}}const Km=new _r,Rr=new W,Oa=new W;class Xr{constructor(e=new W,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Km.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Rr.subVectors(e,this.center);const t=Rr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Rr,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Oa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Rr.copy(e.center).add(Oa)),this.expandByPoint(Rr.copy(e.center).sub(Oa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let $m=0;const mn=new At,Ba=new jt,$i=new W,sn=new _r,Lr=new _r,Gt=new W;class Ht extends Fi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:$m++}),this.uuid=Wr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Rm(e)?ku:zu)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new We().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return mn.makeRotationFromQuaternion(e),this.applyMatrix4(mn),this}rotateX(e){return mn.makeRotationX(e),this.applyMatrix4(mn),this}rotateY(e){return mn.makeRotationY(e),this.applyMatrix4(mn),this}rotateZ(e){return mn.makeRotationZ(e),this.applyMatrix4(mn),this}translate(e,t,n){return mn.makeTranslation(e,t,n),this.applyMatrix4(mn),this}scale(e,t,n){return mn.makeScale(e,t,n),this.applyMatrix4(mn),this}lookAt(e){return Ba.lookAt(e),Ba.updateMatrix(),this.applyMatrix4(Ba.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter($i).negate(),this.translate($i.x,$i.y,$i.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Lt(n,3))}else{const n=Math.min(e.length,t.count);for(let r=0;r<n;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Be("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new _r);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){rt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new W(-1/0,-1/0,-1/0),new W(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];sn.setFromBufferAttribute(s),this.morphTargetsRelative?(Gt.addVectors(this.boundingBox.min,sn.min),this.boundingBox.expandByPoint(Gt),Gt.addVectors(this.boundingBox.max,sn.max),this.boundingBox.expandByPoint(Gt)):(this.boundingBox.expandByPoint(sn.min),this.boundingBox.expandByPoint(sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&rt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Xr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){rt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new W,1/0);return}if(e){const n=this.boundingSphere.center;if(sn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Lr.setFromBufferAttribute(o),this.morphTargetsRelative?(Gt.addVectors(sn.min,Lr.min),sn.expandByPoint(Gt),Gt.addVectors(sn.max,Lr.max),sn.expandByPoint(Gt)):(sn.expandByPoint(Lr.min),sn.expandByPoint(Lr.max))}sn.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)Gt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Gt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Gt.fromBufferAttribute(o,l),c&&($i.fromBufferAttribute(e,l),Gt.add($i)),r=Math.max(r,n.distanceToSquared(Gt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&rt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){rt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new un(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],c=[];for(let M=0;M<n.count;M++)o[M]=new W,c[M]=new W;const l=new W,h=new W,f=new W,u=new He,d=new He,x=new He,g=new W,m=new W;function p(M,C,A){l.fromBufferAttribute(n,M),h.fromBufferAttribute(n,C),f.fromBufferAttribute(n,A),u.fromBufferAttribute(s,M),d.fromBufferAttribute(s,C),x.fromBufferAttribute(s,A),h.sub(l),f.sub(l),d.sub(u),x.sub(u);const P=1/(d.x*x.y-x.x*d.y);isFinite(P)&&(g.copy(h).multiplyScalar(x.y).addScaledVector(f,-d.y).multiplyScalar(P),m.copy(f).multiplyScalar(d.x).addScaledVector(h,-x.x).multiplyScalar(P),o[M].add(g),o[C].add(g),o[A].add(g),c[M].add(m),c[C].add(m),c[A].add(m))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let M=0,C=_.length;M<C;++M){const A=_[M],P=A.start,F=A.count;for(let U=P,D=P+F;U<D;U+=3)p(e.getX(U+0),e.getX(U+1),e.getX(U+2))}const S=new W,b=new W,w=new W,E=new W;function L(M){w.fromBufferAttribute(r,M),E.copy(w);const C=o[M];S.copy(C),S.sub(w.multiplyScalar(w.dot(C))).normalize(),b.crossVectors(E,C);const P=b.dot(c[M])<0?-1:1;a.setXYZW(M,S.x,S.y,S.z,P)}for(let M=0,C=_.length;M<C;++M){const A=_[M],P=A.start,F=A.count;for(let U=P,D=P+F;U<D;U+=3)L(e.getX(U+0)),L(e.getX(U+1)),L(e.getX(U+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new un(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,d=n.count;u<d;u++)n.setXYZ(u,0,0,0);const r=new W,s=new W,a=new W,o=new W,c=new W,l=new W,h=new W,f=new W;if(e)for(let u=0,d=e.count;u<d;u+=3){const x=e.getX(u+0),g=e.getX(u+1),m=e.getX(u+2);r.fromBufferAttribute(t,x),s.fromBufferAttribute(t,g),a.fromBufferAttribute(t,m),h.subVectors(a,s),f.subVectors(r,s),h.cross(f),o.fromBufferAttribute(n,x),c.fromBufferAttribute(n,g),l.fromBufferAttribute(n,m),o.add(h),c.add(h),l.add(h),n.setXYZ(x,o.x,o.y,o.z),n.setXYZ(g,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let u=0,d=t.count;u<d;u+=3)r.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,s),f.subVectors(r,s),h.cross(f),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Gt.fromBufferAttribute(e,t),Gt.normalize(),e.setXYZ(t,Gt.x,Gt.y,Gt.z)}toNonIndexed(){function e(o,c){const l=o.array,h=o.itemSize,f=o.normalized,u=new l.constructor(c.length*h);let d=0,x=0;for(let g=0,m=c.length;g<m;g++){o.isInterleavedBufferAttribute?d=c[g]*o.data.stride+o.offset:d=c[g]*h;for(let p=0;p<h;p++)u[x++]=l[d++]}return new un(u,h,f)}if(this.index===null)return Be("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ht,n=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=e(c,n);t.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let h=0,f=l.length;h<f;h++){const u=l[h],d=e(u,n);c.push(d)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let f=0,u=l.length;f<u;f++){const d=l[f];h.push(d.toJSON(e.data))}h.length>0&&(r[c]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const r=e.attributes;for(const l in r){const h=r[l];this.setAttribute(l,h.clone(t))}const s=e.morphAttributes;for(const l in s){const h=[],f=s[l];for(let u=0,d=f.length;u<d;u++)h.push(f[u].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,h=a.length;l<h;l++){const f=a[l];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const za=new W,Zm=new W,Jm=new We;class ci{constructor(e=new W(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=za.subVectors(n,t).cross(Zm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const r=e.delta(za),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Jm.getNormalMatrix(e),r=this.coplanarPoint(za).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let Qm=0;class Mr extends Fi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Qm++}),this.uuid=Wr(),this.name="",this.type="Material",this.blending=ar,this.side=Di,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=xu,this.blendDst=vu,this.blendEquation=tr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Qe(0,0,0),this.blendAlpha=0,this.depthFunc=zr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Sm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=_a,this.stencilZFail=_a,this.stencilZPass=_a,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Be(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Be(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Qe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new ci().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new He().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new He().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const qn=new W,ka=new W,rs=new W,ss=new W;class gl{constructor(e=new W,t=new W(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,qn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=qn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(qn.copy(this.origin).addScaledVector(this.direction,t),qn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){ka.copy(e).add(t).multiplyScalar(.5),rs.copy(t).sub(e).normalize(),ss.copy(this.origin).sub(ka);const s=e.distanceTo(t)*.5,a=-this.direction.dot(rs),o=ss.dot(this.direction),c=-ss.dot(rs),l=ss.lengthSq(),h=Math.abs(1-a*a);let f,u,d,x;if(h>0)if(f=a*c-o,u=a*o-c,x=s*h,f>=0)if(u>=-x)if(u<=x){const g=1/h;f*=g,u*=g,d=f*(f+a*u+2*o)+u*(a*f+u+2*c)+l}else u=s,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*c)+l;else u=-s,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*c)+l;else u<=-x?(f=Math.max(0,-(-a*s+o)),u=f>0?-s:Math.min(Math.max(-s,-c),s),d=-f*f+u*(u+2*c)+l):u<=x?(f=0,u=Math.min(Math.max(-s,-c),s),d=u*(u+2*c)+l):(f=Math.max(0,-(a*s+o)),u=f>0?s:Math.min(Math.max(-s,-c),s),d=-f*f+u*(u+2*c)+l);else u=a>0?-s:s,f=Math.max(0,-(a*u+o)),d=-f*f+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(ka).addScaledVector(rs,u),d}intersectSphere(e,t){if(e.radius<0)return null;qn.subVectors(e.center,this.origin);const n=qn.dot(this.direction),r=qn.dot(qn)-n*n,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return l>=0?(n=(e.min.x-u.x)*l,r=(e.max.x-u.x)*l):(n=(e.max.x-u.x)*l,r=(e.min.x-u.x)*l),h>=0?(s=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(s=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(e.min.z-u.z)*f,c=(e.max.z-u.z)*f):(o=(e.max.z-u.z)*f,c=(e.min.z-u.z)*f),n>c||o>r)||((o>n||n!==n)&&(n=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,qn)!==null}intersectTriangle(e,t,n,r,s){const a=this.origin,o=this.direction,c=o.x,l=o.y,h=o.z,f=e.x-a.x,u=e.y-a.y,d=e.z-a.z,x=t.x-a.x,g=t.y-a.y,m=t.z-a.z,p=n.x-a.x,_=n.y-a.y,S=n.z-a.z,b=Math.abs(c),w=Math.abs(l),E=Math.abs(h);let L,M,C,A,P,F,U,D,O,k,Y,j;if(b>=w&&b>=E?(C=c,F=f,O=x,j=p,c>=0?(L=l,M=h,A=u,P=d,U=g,D=m,k=_,Y=S):(L=h,M=l,A=d,P=u,U=m,D=g,k=S,Y=_)):w>=E?(C=l,F=u,O=g,j=_,l>=0?(L=h,M=c,A=d,P=f,U=m,D=x,k=S,Y=p):(L=c,M=h,A=f,P=d,U=x,D=m,k=p,Y=S)):(C=h,F=d,O=m,j=S,h>=0?(L=c,M=l,A=f,P=u,U=x,D=g,k=p,Y=_):(L=l,M=c,A=u,P=f,U=g,D=x,k=_,Y=p)),C===0)return null;const X=L/C,te=M/C,N=1/C,re=A-X*F,oe=P-te*F,Se=U-X*O,Ue=D-te*O,Ge=k-X*j,I=Y-te*j,K=Ge*Ue-I*Se,se=re*I-oe*Ge,ve=Se*oe-Ue*re;if(r){if(K<0||se<0||ve<0)return null}else if((K<0||se<0||ve<0)&&(K>0||se>0||ve>0))return null;const ce=K+se+ve;if(ce===0)return null;const Te=N*(K*F+se*O+ve*j);return(ce>0?Te<0:Te>0)?null:this.at(Te/ce,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Gu extends Mr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ni,this.combine=_u,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const lc=new At,Mi=new gl,as=new Xr,cc=new W,os=new W,ls=new W,cs=new W,Ga=new W,us=new W,uc=new W,hs=new W;class Vt extends jt{constructor(e=new Ht,t=new Gu){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){us.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const h=o[c],f=s[c];h!==0&&(Ga.fromBufferAttribute(f,e),a?us.addScaledVector(Ga,h):us.addScaledVector(Ga.sub(t),h))}t.add(us)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),as.copy(n.boundingSphere),as.applyMatrix4(s),Mi.copy(e.ray).recast(e.near),!(as.containsPoint(Mi.origin)===!1&&(Mi.intersectSphere(as,cc)===null||Mi.origin.distanceToSquared(cc)>(e.far-e.near)**2))&&(lc.copy(s).invert(),Mi.copy(e.ray).applyMatrix4(lc),!(n.boundingBox!==null&&Mi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Mi)))}_computeIntersections(e,t,n){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,f=s.attributes.normal,u=s.groups,d=s.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,g=u.length;x<g;x++){const m=u[x],p=a[m.materialIndex],_=Math.max(m.start,d.start),S=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let b=_,w=S;b<w;b+=3){const E=o.getX(b),L=o.getX(b+1),M=o.getX(b+2);r=fs(this,p,e,n,l,h,f,E,L,M),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const x=Math.max(0,d.start),g=Math.min(o.count,d.start+d.count);for(let m=x,p=g;m<p;m+=3){const _=o.getX(m),S=o.getX(m+1),b=o.getX(m+2);r=fs(this,a,e,n,l,h,f,_,S,b),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let x=0,g=u.length;x<g;x++){const m=u[x],p=a[m.materialIndex],_=Math.max(m.start,d.start),S=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let b=_,w=S;b<w;b+=3){const E=b,L=b+1,M=b+2;r=fs(this,p,e,n,l,h,f,E,L,M),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const x=Math.max(0,d.start),g=Math.min(c.count,d.start+d.count);for(let m=x,p=g;m<p;m+=3){const _=m,S=m+1,b=m+2;r=fs(this,a,e,n,l,h,f,_,S,b),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function jm(i,e,t,n,r,s,a,o){let c;if(e.side===tn?c=n.intersectTriangle(a,s,r,!0,o):c=n.intersectTriangle(r,s,a,e.side===Di,o),c===null)return null;hs.copy(o),hs.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(hs);return l<t.near||l>t.far?null:{distance:l,point:hs.clone(),object:i}}function fs(i,e,t,n,r,s,a,o,c,l){i.getVertexPosition(o,os),i.getVertexPosition(c,ls),i.getVertexPosition(l,cs);const h=jm(i,e,t,n,os,ls,cs,uc);if(h){const f=new W;Cn.getBarycoord(uc,os,ls,cs,f),r&&(h.uv=Cn.getInterpolatedAttribute(r,o,c,l,f,new He)),s&&(h.uv1=Cn.getInterpolatedAttribute(s,o,c,l,f,new He)),a&&(h.normal=Cn.getInterpolatedAttribute(a,o,c,l,f,new W),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:c,c:l,normal:new W,materialIndex:0};Cn.getNormal(os,ls,cs,u.normal),h.face=u,h.barycoord=f}return h}class ir extends Zt{constructor(e=null,t=1,n=1,r,s,a,o,c,l=Dt,h=Dt,f,u){super(null,a,o,c,l,h,r,s,f,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class xl extends un{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Si=new Xr,e0=new He(.5,.5),ds=new W;class Ws{constructor(e=new ci,t=new ci,n=new ci,r=new ci,s=new ci,a=new ci){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=On,n=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],h=s[4],f=s[5],u=s[6],d=s[7],x=s[8],g=s[9],m=s[10],p=s[11],_=s[12],S=s[13],b=s[14],w=s[15];if(r[0].setComponents(l-a,d-h,p-x,w-_).normalize(),r[1].setComponents(l+a,d+h,p+x,w+_).normalize(),r[2].setComponents(l+o,d+f,p+g,w+S).normalize(),r[3].setComponents(l-o,d-f,p-g,w-S).normalize(),n)r[4].setComponents(c,u,m,b).normalize(),r[5].setComponents(l-c,d-u,p-m,w-b).normalize();else if(r[4].setComponents(l-c,d-u,p-m,w-b).normalize(),t===On)r[5].setComponents(l+c,d+u,p+m,w+b).normalize();else if(t===Hs)r[5].setComponents(c,u,m,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Si.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Si.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Si)}intersectsSprite(e){Si.center.set(0,0,0);const t=e0.distanceTo(e.center);return Si.radius=.7071067811865476+t,Si.applyMatrix4(e.matrixWorld),this.intersectsSphere(Si)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(ds.x=r.normal.x>0?e.max.x:e.min.x,ds.y=r.normal.y>0?e.max.y:e.min.y,ds.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ds)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class t0 extends Mr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Qe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Xs=new W,Ys=new W,hc=new At,Pr=new gl,ps=new Xr,Ha=new W,fc=new W;class n0 extends jt{constructor(e=new Ht,t=new t0){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)Xs.fromBufferAttribute(t,r-1),Ys.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=Xs.distanceTo(Ys);e.setAttribute("lineDistance",new Lt(n,1))}else Be("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ps.copy(n.boundingSphere),ps.applyMatrix4(r),ps.radius+=s,e.ray.intersectsSphere(ps)===!1)return;hc.copy(r).invert(),Pr.copy(e.ray).applyMatrix4(hc);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){const d=Math.max(0,a.start),x=Math.min(h.count,a.start+a.count);for(let g=d,m=x-1;g<m;g+=l){const p=h.getX(g),_=h.getX(g+1),S=ms(this,e,Pr,c,p,_,g);S&&t.push(S)}if(this.isLineLoop){const g=h.getX(x-1),m=h.getX(d),p=ms(this,e,Pr,c,g,m,x-1);p&&t.push(p)}}else{const d=Math.max(0,a.start),x=Math.min(u.count,a.start+a.count);for(let g=d,m=x-1;g<m;g+=l){const p=ms(this,e,Pr,c,g,g+1,g);p&&t.push(p)}if(this.isLineLoop){const g=ms(this,e,Pr,c,x-1,d,x-1);g&&t.push(g)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function ms(i,e,t,n,r,s,a){const o=i.geometry.attributes.position;if(Xs.fromBufferAttribute(o,r),Ys.fromBufferAttribute(o,s),t.distanceSqToSegment(Xs,Ys,Ha,fc)>n)return;Ha.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Ha);if(!(l<e.near||l>e.far))return{distance:l,point:fc.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const dc=new W,pc=new W;class Hu extends n0{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)dc.fromBufferAttribute(t,r),pc.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+dc.distanceTo(pc);e.setAttribute("lineDistance",new Lt(n,1))}else Be("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class i0 extends Mr{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Qe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const mc=new At,Xo=new gl,gs=new Xr,xs=new W;class qs extends jt{constructor(e=new Ht,t=new i0){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),gs.copy(n.boundingSphere),gs.applyMatrix4(r),gs.radius+=s,e.ray.intersectsSphere(gs)===!1)return;mc.copy(r).invert(),Xo.copy(e.ray).applyMatrix4(mc);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,f=n.attributes.position;if(l!==null){const u=Math.max(0,a.start),d=Math.min(l.count,a.start+a.count);for(let x=u,g=d;x<g;x++){const m=l.getX(x);xs.fromBufferAttribute(f,m),gc(xs,m,c,r,e,t,this)}}else{const u=Math.max(0,a.start),d=Math.min(f.count,a.start+a.count);for(let x=u,g=d;x<g;x++)xs.fromBufferAttribute(f,x),gc(xs,x,c,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function gc(i,e,t,n,r,s,a){const o=Xo.distanceSqToPoint(i);if(o<t){const c=new W;Xo.closestPointToPoint(i,c),c.applyMatrix4(n);const l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Vu extends Zt{constructor(e=[],t=Ii,n,r,s,a,o,c,l,h){super(e,t,n,r,s,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class r0 extends Zt{constructor(e,t,n,r,s,a,o,c,l){super(e,t,n,r,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class mr extends Zt{constructor(e,t,n=kn,r,s,a,o=Dt,c=Dt,l,h=Qn,f=1){if(h!==Qn&&h!==Ci)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:f};super(u,r,s,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ml(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class s0 extends mr{constructor(e,t=kn,n=Ii,r,s,a=Dt,o=Dt,c,l=Qn){const h={width:e,height:e,depth:1},f=[h,h,h,h,h,h];super(e,e,t,n,r,s,a,o,c,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Wu extends Zt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Yr extends Ht{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],h=[],f=[];let u=0,d=0;x("z","y","x",-1,-1,n,t,e,a,s,0),x("z","y","x",1,-1,n,t,-e,a,s,1),x("x","z","y",1,1,e,n,t,r,a,2),x("x","z","y",1,-1,e,n,-t,r,a,3),x("x","y","z",1,-1,e,t,n,r,s,4),x("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(c),this.setAttribute("position",new Lt(l,3)),this.setAttribute("normal",new Lt(h,3)),this.setAttribute("uv",new Lt(f,2));function x(g,m,p,_,S,b,w,E,L,M,C){const A=b/L,P=w/M,F=b/2,U=w/2,D=E/2,O=L+1,k=M+1;let Y=0,j=0;const X=new W;for(let te=0;te<k;te++){const N=te*P-U;for(let re=0;re<O;re++){const oe=re*A-F;X[g]=oe*_,X[m]=N*S,X[p]=D,l.push(X.x,X.y,X.z),X[g]=0,X[m]=0,X[p]=E>0?1:-1,h.push(X.x,X.y,X.z),f.push(re/L),f.push(1-te/M),Y+=1}}for(let te=0;te<M;te++)for(let N=0;N<L;N++){const re=u+N+O*te,oe=u+N+O*(te+1),Se=u+(N+1)+O*(te+1),Ue=u+(N+1)+O*te;c.push(re,oe,Ue),c.push(oe,Se,Ue),j+=6}o.addGroup(d,j,C),d+=j,u+=Y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class dn extends Ht{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(n),c=Math.floor(r),l=o+1,h=c+1,f=e/o,u=t/c,d=[],x=[],g=[],m=[];for(let p=0;p<h;p++){const _=p*u-a;for(let S=0;S<l;S++){const b=S*f-s;x.push(b,-_,0),g.push(0,0,1),m.push(S/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let _=0;_<o;_++){const S=_+l*p,b=_+l*(p+1),w=_+1+l*(p+1),E=_+1+l*p;d.push(S,b,E),d.push(b,w,E)}this.setIndex(d),this.setAttribute("position",new Lt(x,3)),this.setAttribute("normal",new Lt(g,3)),this.setAttribute("uv",new Lt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new dn(e.width,e.height,e.widthSegments,e.heightSegments)}}function gr(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];if(xc(r))r.isRenderTargetTexture?(Be("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone();else if(Array.isArray(r))if(xc(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][n]=s}else e[t][n]=r.slice();else e[t][n]=r}}return e}function Qt(i){const e={};for(let t=0;t<i.length;t++){const n=gr(i[t]);for(const r in n)e[r]=n[r]}return e}function xc(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function a0(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Xu(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:tt.workingColorSpace}const o0={clone:gr,merge:Qt};var l0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,c0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Tt extends Mr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=l0,this.fragmentShader=c0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=gr(e.uniforms),this.uniformsGroups=a0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case"t":this.uniforms[n].value=t[r.value]||null;break;case"c":this.uniforms[n].value=new Qe().setHex(r.value);break;case"v2":this.uniforms[n].value=new He().fromArray(r.value);break;case"v3":this.uniforms[n].value=new W().fromArray(r.value);break;case"v4":this.uniforms[n].value=new ot().fromArray(r.value);break;case"m3":this.uniforms[n].value=new We().fromArray(r.value);break;case"m4":this.uniforms[n].value=new At().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class u0 extends Tt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class h0 extends Mr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=_m,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class f0 extends Mr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const vs=new W,_s=new vr,In=new W;class Yu extends jt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new At,this.projectionMatrix=new At,this.projectionMatrixInverse=new At,this.coordinateSystem=On,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(vs,_s,In),In.x===1&&In.y===1&&In.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(vs,_s,In.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(vs,_s,In),In.x===1&&In.y===1&&In.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(vs,_s,In.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const oi=new W,vc=new He,_c=new He;class an extends Yu{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Wo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ma*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Wo*2*Math.atan(Math.tan(Ma*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){oi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(oi.x,oi.y).multiplyScalar(-e/oi.z),oi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(oi.x,oi.y).multiplyScalar(-e/oi.z)}getViewSize(e,t){return this.getViewBounds(e,vc,_c),t.subVectors(_c,vc)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ma*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,t-=a.offsetY*n/l,r*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class vl extends Yu{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class _l extends Ht{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}const Zi=-90,Ji=1;class d0 extends jt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new an(Zi,Ji,e,t);r.layers=this.layers,this.add(r);const s=new an(Zi,Ji,e,t);s.layers=this.layers,this.add(s);const a=new an(Zi,Ji,e,t);a.layers=this.layers,this.add(a);const o=new an(Zi,Ji,e,t);o.layers=this.layers,this.add(o);const c=new an(Zi,Ji,e,t);c.layers=this.layers,this.add(c);const l=new an(Zi,Ji,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,c]=t;for(const l of t)this.remove(l);if(e===On)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Hs)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,h]=this.children,f=e.getRenderTarget(),u=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=g,e.setRenderTarget(n,5,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(f,u,d),e.xr.enabled=x,n.texture.needsPMREMUpdate=!0}}class p0 extends an{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class qu{static{qu.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=r,this}}function Mc(i,e,t,n){const r=m0(n);switch(t){case Du:return i*e;case Uu:return i*e/r.components*r.byteLength;case ul:return i*e/r.components*r.byteLength;case Ui:return i*e*2/r.components*r.byteLength;case hl:return i*e*2/r.components*r.byteLength;case Iu:return i*e*3/r.components*r.byteLength;case ln:return i*e*4/r.components*r.byteLength;case fl:return i*e*4/r.components*r.byteLength;case Ls:case Ps:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ds:case Is:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case mo:case xo:return Math.max(i,16)*Math.max(e,8)/4;case po:case go:return Math.max(i,8)*Math.max(e,8)/2;case vo:case _o:case So:case yo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Mo:case zs:case bo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case wo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Eo:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case To:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Ao:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Co:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Ro:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Lo:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Po:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Do:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Io:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Uo:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case No:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Fo:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Oo:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Bo:case zo:case ko:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Go:case Ho:return Math.ceil(i/4)*Math.ceil(e/4)*8;case ks:case Vo:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function m0(i){switch(i){case on:case Cu:return{byteLength:1,components:1};case kr:case Ru:case Gn:return{byteLength:2,components:1};case ll:case cl:return{byteLength:2,components:4};case kn:case ol:case Fn:return{byteLength:4,components:1};case Lu:case Pu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:al}}));typeof window<"u"&&(window.__THREE__?Be("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=al);function Ku(){let i=null,e=!1,t=null,n=null;function r(s,a){n=i.requestAnimationFrame(r),t(s,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function g0(i){const e=new WeakMap;function t(o,c){const l=o.array,h=o.usage,f=l.byteLength,u=i.createBuffer();i.bindBuffer(c,u),i.bufferData(c,l,h),o.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,c,l){const h=c.array,f=c.updateRanges;if(i.bindBuffer(l,o),f.length===0)i.bufferSubData(l,0,h);else{f.sort((d,x)=>d.start-x.start);let u=0;for(let d=1;d<f.length;d++){const x=f[u],g=f[d];g.start<=x.start+x.count+1?x.count=Math.max(x.count,g.start+g.count-x.start):(++u,f[u]=g)}f.length=u+1;for(let d=0,x=f.length;d<x;d++){const g=f[d];i.bufferSubData(l,g.start*h.BYTES_PER_ELEMENT,h,g.start,g.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:r,remove:s,update:a}}var x0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,v0=`#ifdef USE_ALPHAHASH
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
#endif`,_0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,M0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,S0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,y0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,b0=`#ifdef USE_AOMAP
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
#endif`,w0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,E0=`#ifdef USE_BATCHING
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
#endif`,T0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,A0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,C0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,R0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,L0=`#ifdef USE_IRIDESCENCE
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
#endif`,P0=`#ifdef USE_BUMPMAP
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
#endif`,D0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,I0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,U0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,N0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,F0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,O0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,B0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,z0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,k0=`#define PI 3.141592653589793
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
} // validated`,G0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,H0=`vec3 transformedNormal = objectNormal;
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
#endif`,V0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,W0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,X0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Y0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,q0="gl_FragColor = linearToOutputTexel( gl_FragColor );",K0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,$0=`#ifdef USE_ENVMAP
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
#endif`,Z0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,J0=`#ifdef USE_ENVMAP
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
#endif`,Q0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,j0=`#ifdef USE_ENVMAP
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
#endif`,eg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,tg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ng=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ig=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,rg=`#ifdef USE_GRADIENTMAP
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
}`,sg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ag=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,og=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lg=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,cg=`#ifdef USE_ENVMAP
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
#endif`,ug=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,hg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,fg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,dg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,pg=`PhysicalMaterial material;
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
#endif`,mg=`uniform sampler2D dfgLUT;
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
}`,gg=`
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
#endif`,xg=`#if defined( RE_IndirectDiffuse )
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
#endif`,vg=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,_g=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Mg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Sg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,bg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,wg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Eg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Tg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ag=`#if defined( USE_POINTS_UV )
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
#endif`,Cg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Rg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Lg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Pg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Dg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ig=`#ifdef USE_MORPHTARGETS
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
#endif`,Ug=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ng=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Fg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Og=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,zg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,kg=`#ifdef USE_NORMALMAP
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
#endif`,Gg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Hg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Vg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Wg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Xg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Yg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,qg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Kg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,$g=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Zg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Jg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Qg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,jg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ex=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,tx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,nx=`float getShadowMask() {
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
}`,ix=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,rx=`#ifdef USE_SKINNING
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
#endif`,sx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ax=`#ifdef USE_SKINNING
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
#endif`,ox=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,lx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,cx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ux=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,hx=`#ifdef USE_TRANSMISSION
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
#endif`,fx=`#ifdef USE_TRANSMISSION
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
#endif`,dx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,px=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,mx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,gx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const xx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,vx=`uniform sampler2D t2D;
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
}`,_x=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Mx=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Sx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,yx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bx=`#include <common>
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
}`,wx=`#if DEPTH_PACKING == 3200
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
}`,Ex=`#define DISTANCE
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
}`,Tx=`#define DISTANCE
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
}`,Ax=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Cx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rx=`uniform float scale;
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
}`,Lx=`uniform vec3 diffuse;
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
}`,Px=`#include <common>
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
}`,Dx=`uniform vec3 diffuse;
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
}`,Ix=`#define LAMBERT
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
}`,Ux=`#define LAMBERT
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
}`,Nx=`#define MATCAP
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
}`,Fx=`#define MATCAP
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
}`,Ox=`#define NORMAL
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
}`,Bx=`#define NORMAL
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
}`,zx=`#define PHONG
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
}`,kx=`#define PHONG
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
}`,Gx=`#define STANDARD
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
}`,Hx=`#define STANDARD
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
}`,Vx=`#define TOON
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
}`,Wx=`#define TOON
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
}`,Xx=`uniform float size;
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
}`,Yx=`uniform vec3 diffuse;
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
}`,qx=`#include <common>
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
}`,Kx=`uniform vec3 color;
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
}`,$x=`uniform float rotation;
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
}`,Zx=`uniform vec3 diffuse;
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
}`,Ze={alphahash_fragment:x0,alphahash_pars_fragment:v0,alphamap_fragment:_0,alphamap_pars_fragment:M0,alphatest_fragment:S0,alphatest_pars_fragment:y0,aomap_fragment:b0,aomap_pars_fragment:w0,batching_pars_vertex:E0,batching_vertex:T0,begin_vertex:A0,beginnormal_vertex:C0,bsdfs:R0,iridescence_fragment:L0,bumpmap_pars_fragment:P0,clipping_planes_fragment:D0,clipping_planes_pars_fragment:I0,clipping_planes_pars_vertex:U0,clipping_planes_vertex:N0,color_fragment:F0,color_pars_fragment:O0,color_pars_vertex:B0,color_vertex:z0,common:k0,cube_uv_reflection_fragment:G0,defaultnormal_vertex:H0,displacementmap_pars_vertex:V0,displacementmap_vertex:W0,emissivemap_fragment:X0,emissivemap_pars_fragment:Y0,colorspace_fragment:q0,colorspace_pars_fragment:K0,envmap_fragment:$0,envmap_common_pars_fragment:Z0,envmap_pars_fragment:J0,envmap_pars_vertex:Q0,envmap_physical_pars_fragment:cg,envmap_vertex:j0,fog_vertex:eg,fog_pars_vertex:tg,fog_fragment:ng,fog_pars_fragment:ig,gradientmap_pars_fragment:rg,lightmap_pars_fragment:sg,lights_lambert_fragment:ag,lights_lambert_pars_fragment:og,lights_pars_begin:lg,lights_toon_fragment:ug,lights_toon_pars_fragment:hg,lights_phong_fragment:fg,lights_phong_pars_fragment:dg,lights_physical_fragment:pg,lights_physical_pars_fragment:mg,lights_fragment_begin:gg,lights_fragment_maps:xg,lights_fragment_end:vg,lightprobes_pars_fragment:_g,logdepthbuf_fragment:Mg,logdepthbuf_pars_fragment:Sg,logdepthbuf_pars_vertex:yg,logdepthbuf_vertex:bg,map_fragment:wg,map_pars_fragment:Eg,map_particle_fragment:Tg,map_particle_pars_fragment:Ag,metalnessmap_fragment:Cg,metalnessmap_pars_fragment:Rg,morphinstance_vertex:Lg,morphcolor_vertex:Pg,morphnormal_vertex:Dg,morphtarget_pars_vertex:Ig,morphtarget_vertex:Ug,normal_fragment_begin:Ng,normal_fragment_maps:Fg,normal_pars_fragment:Og,normal_pars_vertex:Bg,normal_vertex:zg,normalmap_pars_fragment:kg,clearcoat_normal_fragment_begin:Gg,clearcoat_normal_fragment_maps:Hg,clearcoat_pars_fragment:Vg,iridescence_pars_fragment:Wg,opaque_fragment:Xg,packing:Yg,premultiplied_alpha_fragment:qg,project_vertex:Kg,dithering_fragment:$g,dithering_pars_fragment:Zg,roughnessmap_fragment:Jg,roughnessmap_pars_fragment:Qg,shadowmap_pars_fragment:jg,shadowmap_pars_vertex:ex,shadowmap_vertex:tx,shadowmask_pars_fragment:nx,skinbase_vertex:ix,skinning_pars_vertex:rx,skinning_vertex:sx,skinnormal_vertex:ax,specularmap_fragment:ox,specularmap_pars_fragment:lx,tonemapping_fragment:cx,tonemapping_pars_fragment:ux,transmission_fragment:hx,transmission_pars_fragment:fx,uv_pars_fragment:dx,uv_pars_vertex:px,uv_vertex:mx,worldpos_vertex:gx,background_vert:xx,background_frag:vx,backgroundCube_vert:_x,backgroundCube_frag:Mx,cube_vert:Sx,cube_frag:yx,depth_vert:bx,depth_frag:wx,distance_vert:Ex,distance_frag:Tx,equirect_vert:Ax,equirect_frag:Cx,linedashed_vert:Rx,linedashed_frag:Lx,meshbasic_vert:Px,meshbasic_frag:Dx,meshlambert_vert:Ix,meshlambert_frag:Ux,meshmatcap_vert:Nx,meshmatcap_frag:Fx,meshnormal_vert:Ox,meshnormal_frag:Bx,meshphong_vert:zx,meshphong_frag:kx,meshphysical_vert:Gx,meshphysical_frag:Hx,meshtoon_vert:Vx,meshtoon_frag:Wx,points_vert:Xx,points_frag:Yx,shadow_vert:qx,shadow_frag:Kx,sprite_vert:$x,sprite_frag:Zx},ge={common:{diffuse:{value:new Qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new We}},envmap:{envMap:{value:null},envMapRotation:{value:new We},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new We}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new We}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new We},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new We},normalScale:{value:new He(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new We},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new We}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new We}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new We}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new W},probesMax:{value:new W},probesResolution:{value:new W}},points:{diffuse:{value:new Qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0},uvTransform:{value:new We}},sprite:{diffuse:{value:new Qe(16777215)},opacity:{value:1},center:{value:new He(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}}},Nn={basic:{uniforms:Qt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.fog]),vertexShader:Ze.meshbasic_vert,fragmentShader:Ze.meshbasic_frag},lambert:{uniforms:Qt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new Qe(0)},envMapIntensity:{value:1}}]),vertexShader:Ze.meshlambert_vert,fragmentShader:Ze.meshlambert_frag},phong:{uniforms:Qt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new Qe(0)},specular:{value:new Qe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphong_vert,fragmentShader:Ze.meshphong_frag},standard:{uniforms:Qt([ge.common,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.roughnessmap,ge.metalnessmap,ge.fog,ge.lights,{emissive:{value:new Qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag},toon:{uniforms:Qt([ge.common,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.gradientmap,ge.fog,ge.lights,{emissive:{value:new Qe(0)}}]),vertexShader:Ze.meshtoon_vert,fragmentShader:Ze.meshtoon_frag},matcap:{uniforms:Qt([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,{matcap:{value:null}}]),vertexShader:Ze.meshmatcap_vert,fragmentShader:Ze.meshmatcap_frag},points:{uniforms:Qt([ge.points,ge.fog]),vertexShader:Ze.points_vert,fragmentShader:Ze.points_frag},dashed:{uniforms:Qt([ge.common,ge.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ze.linedashed_vert,fragmentShader:Ze.linedashed_frag},depth:{uniforms:Qt([ge.common,ge.displacementmap]),vertexShader:Ze.depth_vert,fragmentShader:Ze.depth_frag},normal:{uniforms:Qt([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,{opacity:{value:1}}]),vertexShader:Ze.meshnormal_vert,fragmentShader:Ze.meshnormal_frag},sprite:{uniforms:Qt([ge.sprite,ge.fog]),vertexShader:Ze.sprite_vert,fragmentShader:Ze.sprite_frag},background:{uniforms:{uvTransform:{value:new We},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ze.background_vert,fragmentShader:Ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new We}},vertexShader:Ze.backgroundCube_vert,fragmentShader:Ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ze.cube_vert,fragmentShader:Ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ze.equirect_vert,fragmentShader:Ze.equirect_frag},distance:{uniforms:Qt([ge.common,ge.displacementmap,{referencePosition:{value:new W},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ze.distance_vert,fragmentShader:Ze.distance_frag},shadow:{uniforms:Qt([ge.lights,ge.fog,{color:{value:new Qe(0)},opacity:{value:1}}]),vertexShader:Ze.shadow_vert,fragmentShader:Ze.shadow_frag}};Nn.physical={uniforms:Qt([Nn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new We},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new We},clearcoatNormalScale:{value:new He(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new We},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new We},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new We},sheen:{value:0},sheenColor:{value:new Qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new We},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new We},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new We},transmissionSamplerSize:{value:new He},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new We},attenuationDistance:{value:0},attenuationColor:{value:new Qe(0)},specularColor:{value:new Qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new We},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new We},anisotropyVector:{value:new He},anisotropyMap:{value:null},anisotropyMapTransform:{value:new We}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag};const Ms={r:0,b:0,g:0},Jx=new At,$u=new We;$u.set(-1,0,0,0,1,0,0,0,1);function Qx(i,e,t,n,r,s){const a=new Qe(0);let o=r===!0?0:1,c,l,h=null,f=0,u=null;function d(_){let S=_.isScene===!0?_.background:null;if(S&&S.isTexture){const b=_.backgroundBlurriness>0;S=e.get(S,b)}return S}function x(_){let S=!1;const b=d(_);b===null?m(a,o):b&&b.isColor&&(m(b,1),S=!0);const w=i.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,s):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(i.autoClear||S)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(_,S){const b=d(S);b&&(b.isCubeTexture||b.mapping===ra)?(l===void 0&&(l=new Vt(new Yr(1,1,1),new Tt({name:"BackgroundCubeMaterial",uniforms:gr(Nn.backgroundCube.uniforms),vertexShader:Nn.backgroundCube.vertexShader,fragmentShader:Nn.backgroundCube.fragmentShader,side:tn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(w,E,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=b,l.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Jx.makeRotationFromEuler(S.backgroundRotation)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply($u),l.material.toneMapped=tt.getTransfer(b.colorSpace)!==mt,(h!==b||f!==b.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=b,f=b.version,u=i.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null)):b&&b.isTexture&&(c===void 0&&(c=new Vt(new dn(2,2),new Tt({name:"BackgroundMaterial",uniforms:gr(Nn.background.uniforms),vertexShader:Nn.background.vertexShader,fragmentShader:Nn.background.fragmentShader,side:Di,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=b,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=tt.getTransfer(b.colorSpace)!==mt,b.matrixAutoUpdate===!0&&b.updateMatrix(),c.material.uniforms.uvTransform.value.copy(b.matrix),(h!==b||f!==b.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=b,f=b.version,u=i.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null))}function m(_,S){_.getRGB(Ms,Xu(i)),t.buffers.color.setClear(Ms.r,Ms.g,Ms.b,S,s)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(_,S=1){a.set(_),o=S,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(_){o=_,m(a,o)},render:x,addToRenderList:g,dispose:p}}function jx(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=u(null);let s=r,a=!1;function o(P,F,U,D,O){let k=!1;const Y=f(P,D,U,F);s!==Y&&(s=Y,l(s.object)),k=d(P,D,U,O),k&&x(P,D,U,O),O!==null&&e.update(O,i.ELEMENT_ARRAY_BUFFER),(k||a)&&(a=!1,b(P,F,U,D),O!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function c(){return i.createVertexArray()}function l(P){return i.bindVertexArray(P)}function h(P){return i.deleteVertexArray(P)}function f(P,F,U,D){const O=D.wireframe===!0;let k=n[F.id];k===void 0&&(k={},n[F.id]=k);const Y=P.isInstancedMesh===!0?P.id:0;let j=k[Y];j===void 0&&(j={},k[Y]=j);let X=j[U.id];X===void 0&&(X={},j[U.id]=X);let te=X[O];return te===void 0&&(te=u(c()),X[O]=te),te}function u(P){const F=[],U=[],D=[];for(let O=0;O<t;O++)F[O]=0,U[O]=0,D[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:U,attributeDivisors:D,object:P,attributes:{},index:null}}function d(P,F,U,D){const O=s.attributes,k=F.attributes;let Y=0;const j=U.getAttributes();for(const X in j)if(j[X].location>=0){const N=O[X];let re=k[X];if(re===void 0&&(X==="instanceMatrix"&&P.instanceMatrix&&(re=P.instanceMatrix),X==="instanceColor"&&P.instanceColor&&(re=P.instanceColor)),N===void 0||N.attribute!==re||re&&N.data!==re.data)return!0;Y++}return s.attributesNum!==Y||s.index!==D}function x(P,F,U,D){const O={},k=F.attributes;let Y=0;const j=U.getAttributes();for(const X in j)if(j[X].location>=0){let N=k[X];N===void 0&&(X==="instanceMatrix"&&P.instanceMatrix&&(N=P.instanceMatrix),X==="instanceColor"&&P.instanceColor&&(N=P.instanceColor));const re={};re.attribute=N,N&&N.data&&(re.data=N.data),O[X]=re,Y++}s.attributes=O,s.attributesNum=Y,s.index=D}function g(){const P=s.newAttributes;for(let F=0,U=P.length;F<U;F++)P[F]=0}function m(P){p(P,0)}function p(P,F){const U=s.newAttributes,D=s.enabledAttributes,O=s.attributeDivisors;U[P]=1,D[P]===0&&(i.enableVertexAttribArray(P),D[P]=1),O[P]!==F&&(i.vertexAttribDivisor(P,F),O[P]=F)}function _(){const P=s.newAttributes,F=s.enabledAttributes;for(let U=0,D=F.length;U<D;U++)F[U]!==P[U]&&(i.disableVertexAttribArray(U),F[U]=0)}function S(P,F,U,D,O,k,Y){Y===!0?i.vertexAttribIPointer(P,F,U,O,k):i.vertexAttribPointer(P,F,U,D,O,k)}function b(P,F,U,D){g();const O=D.attributes,k=U.getAttributes(),Y=F.defaultAttributeValues;for(const j in k){const X=k[j];if(X.location>=0){let te=O[j];if(te===void 0&&(j==="instanceMatrix"&&P.instanceMatrix&&(te=P.instanceMatrix),j==="instanceColor"&&P.instanceColor&&(te=P.instanceColor)),te!==void 0){const N=te.normalized,re=te.itemSize,oe=e.get(te);if(oe===void 0)continue;const Se=oe.buffer,Ue=oe.type,Ge=oe.bytesPerElement,I=Ue===i.INT||Ue===i.UNSIGNED_INT||te.gpuType===ol;if(te.isInterleavedBufferAttribute){const K=te.data,se=K.stride,ve=te.offset;if(K.isInstancedInterleavedBuffer){for(let ce=0;ce<X.locationSize;ce++)p(X.location+ce,K.meshPerAttribute);P.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let ce=0;ce<X.locationSize;ce++)m(X.location+ce);i.bindBuffer(i.ARRAY_BUFFER,Se);for(let ce=0;ce<X.locationSize;ce++)S(X.location+ce,re/X.locationSize,Ue,N,se*Ge,(ve+re/X.locationSize*ce)*Ge,I)}else{if(te.isInstancedBufferAttribute){for(let K=0;K<X.locationSize;K++)p(X.location+K,te.meshPerAttribute);P.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let K=0;K<X.locationSize;K++)m(X.location+K);i.bindBuffer(i.ARRAY_BUFFER,Se);for(let K=0;K<X.locationSize;K++)S(X.location+K,re/X.locationSize,Ue,N,re*Ge,re/X.locationSize*K*Ge,I)}}else if(Y!==void 0){const N=Y[j];if(N!==void 0)switch(N.length){case 2:i.vertexAttrib2fv(X.location,N);break;case 3:i.vertexAttrib3fv(X.location,N);break;case 4:i.vertexAttrib4fv(X.location,N);break;default:i.vertexAttrib1fv(X.location,N)}}}}_()}function w(){C();for(const P in n){const F=n[P];for(const U in F){const D=F[U];for(const O in D){const k=D[O];for(const Y in k)h(k[Y].object),delete k[Y];delete D[O]}}delete n[P]}}function E(P){if(n[P.id]===void 0)return;const F=n[P.id];for(const U in F){const D=F[U];for(const O in D){const k=D[O];for(const Y in k)h(k[Y].object),delete k[Y];delete D[O]}}delete n[P.id]}function L(P){for(const F in n){const U=n[F];for(const D in U){const O=U[D];if(O[P.id]===void 0)continue;const k=O[P.id];for(const Y in k)h(k[Y].object),delete k[Y];delete O[P.id]}}}function M(P){for(const F in n){const U=n[F],D=P.isInstancedMesh===!0?P.id:0,O=U[D];if(O!==void 0){for(const k in O){const Y=O[k];for(const j in Y)h(Y[j].object),delete Y[j];delete O[k]}delete U[D],Object.keys(U).length===0&&delete n[F]}}}function C(){A(),a=!0,s!==r&&(s=r,l(s.object))}function A(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:C,resetDefaultState:A,dispose:w,releaseStatesOfGeometry:E,releaseStatesOfObject:M,releaseStatesOfProgram:L,initAttributes:g,enableAttribute:m,disableUnusedAttributes:_}}function ev(i,e,t){let n;function r(c){n=c}function s(c,l){i.drawArrays(n,c,l),t.update(l,n,1)}function a(c,l,h){h!==0&&(i.drawArraysInstanced(n,c,l,h),t.update(l,n,h))}function o(c,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,h);let u=0;for(let d=0;d<h;d++)u+=l[d];t.update(u,n,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function tv(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const L=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(L){return!(L!==ln&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(L){const M=L===Gn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(L!==on&&L!==Fn&&!M&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(L){if(L==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(Be("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const f=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Be("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),_=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),b=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=i.getParameter(i.MAX_SAMPLES),E=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:d,maxVertexTextures:x,maxTextureSize:g,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:_,maxVaryings:S,maxFragmentUniforms:b,maxSamples:w,samples:E}}function nv(i){const e=this;let t=null,n=0,r=!1,s=!1;const a=new ci,o=new We,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){const d=f.length!==0||u||n!==0||r;return r=u,n=f.length,d},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,u){t=h(f,u,0)},this.setState=function(f,u,d){const x=f.clippingPlanes,g=f.clipIntersection,m=f.clipShadows,p=i.get(f);if(!r||x===null||x.length===0||s&&!m)s?h(null):l();else{const _=s?0:n,S=_*4;let b=p.clippingState||null;c.value=b,b=h(x,u,S,d);for(let w=0;w!==S;++w)b[w]=t[w];p.clippingState=b,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=_}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(f,u,d,x){const g=f!==null?f.length:0;let m=null;if(g!==0){if(m=c.value,x!==!0||m===null){const p=d+g*4,_=u.matrixWorldInverse;o.getNormalMatrix(_),(m===null||m.length<p)&&(m=new Float32Array(p));for(let S=0,b=d;S!==g;++S,b+=4)a.copy(f[S]).applyMatrix4(_,o),a.normal.toArray(m,b),m[b+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,m}}const rr=4,iv=6,rv=20,sv=256,Dr=new vl,Sc=new Qe;let Va=null,Wa=0,Xa=0,Ya=!1;const av=new W,yi=new W;class yc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){const{size:a=256,position:o=av}=s;Va=this._renderer.getRenderTarget(),Wa=this._renderer.getActiveCubeFace(),Xa=this._renderer.getActiveMipmapLevel(),Ya=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,r,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ec(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=wc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Va,Wa,Xa),this._renderer.xr.enabled=Ya,e.scissorTest=!1,Qi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ii||e.mapping===pr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Va=this._renderer.getRenderTarget(),Wa=this._renderer.getActiveCubeFace(),Xa=this._renderer.getActiveMipmapLevel(),Ya=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Rt,minFilter:Rt,generateMipmaps:!1,type:Gn,format:ln,colorSpace:Hr,depthBuffer:!1},r=bc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=bc(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=ov(s)),this._blurMaterial=cv(s,e,t),this._ggxMaterial=lv(s,e,t)}return r}_compileMaterial(e){const t=new Vt(new Ht,e);this._renderer.compile(t,Dr)}_sceneToCubeUV(e,t,n,r,s){const c=new an(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],f=this._renderer,u=f.autoClear,d=f.toneMapping;f.getClearColor(Sc),f.toneMapping=zn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Vt(new Yr,new Gu({name:"PMREM.Background",side:tn,depthWrite:!1,depthTest:!1})));const g=this._backgroundBox,m=g.material;let p=!1;const _=e.background;_?_.isColor&&(m.color.copy(_),e.background=null,p=!0):(m.color.copy(Sc),p=!0);for(let S=0;S<6;S++){const b=S%3;b===0?(c.up.set(0,l[S],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+h[S],s.y,s.z)):b===1?(c.up.set(0,0,l[S]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+h[S],s.z)):(c.up.set(0,l[S],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+h[S]));const w=this._cubeSize;Qi(r,b*w,S>2?w:0,w,w),f.setRenderTarget(r),p&&f.render(g,c),f.render(e,c)}f.toneMapping=d,f.autoClear=u,e.background=_}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===Ii||e.mapping===pr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ec()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=wc());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const c=this._cubeSize;Qi(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,Dr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const c=a.uniforms,l=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),f=Math.sqrt(l*l-h*h),u=l*1.25,d=f*u,{_lodMax:x}=this,g=this._sizeLods[n],m=3*g*(n>x-rr?n-x+rr:0),p=4*(this._cubeSize-g);c.envMap.value=e.texture,c.roughness.value=d,c.mipInt.value=x-t,Qi(s,m,p,3*g,2*g),r.setRenderTarget(s),r.render(o,Dr),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=x-n,Qi(e,m,p,3*g,2*g),r.setRenderTarget(e),r.render(o,Dr)}_blur(e,t,n,r){const s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,n,a),this._blurPass(s,e,n,n,a)}_blurPass(e,t,n,r,s){const a=this._renderer,o=this._blurMaterial,c=this._lodMeshes[r];c.material=o;const l=o.uniforms;l.envMap.value=e.texture,l.sigma.value=s,l.mipInt.value=this._lodMax-n;const h=this._sizeLods[r],f=3*h*(r>this._lodMax-rr?r-this._lodMax+rr:0),u=4*(this._cubeSize-h);Qi(t,f,u,3*h,2*h),a.setRenderTarget(t),a.render(c,Dr)}}function ov(i){const e=[],t=[];let n=i;const r=i-rr+1+iv;for(let s=0;s<r;s++){const a=Math.pow(2,n);e.push(a);const o=1/(a-2),c=-o,l=1+o,h=[c,c,l,c,l,l,c,c,l,l,c,l],f=6,u=6,d=3,x=new Float32Array(d*u*f),g=new Float32Array(d*u*f);for(let p=0;p<f;p++){const _=p%3*2/3-1,S=p>2?0:-1,b=[_,S,0,_+2/3,S,0,_+2/3,S+1,0,_,S,0,_+2/3,S+1,0,_,S+1,0];x.set(b,d*u*p);for(let w=0;w<u;w++){const E=h[w*2]*2-1,L=h[w*2+1]*2-1;p===0?yi.set(1,L,E):p===1?yi.set(-E,1,-L):p===2?yi.set(-E,L,1):p===3?yi.set(-1,L,-E):p===4?yi.set(-E,-1,L):yi.set(E,L,-1),yi.toArray(g,(p*u+w)*d)}}const m=new Ht;m.setAttribute("position",new un(x,d)),m.setAttribute("outputDirection",new un(g,d)),t.push(new Vt(m,null)),n>rr&&n--}return{lodMeshes:t,sizeLods:e}}function bc(i,e,t){const n=new Mn(i,e,t);return n.texture.mapping=ra,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Qi(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function lv(i,e,t){return new Tt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:sv,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:sa(),fragmentShader:`

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
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function cv(i,e,t){return new Tt({name:"SphericalGaussianBlur",defines:{SAMPLES:rv,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:sa(),fragmentShader:`

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
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function wc(){return new Tt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:sa(),fragmentShader:`

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
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function Ec(){return new Tt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:sa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function sa(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class Zu extends Mn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Vu(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Yr(5,5,5),s=new Tt({name:"CubemapFromEquirect",uniforms:gr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:tn,blending:Bn});s.uniforms.tEquirect.value=t;const a=new Vt(r,s),o=t.minFilter;return t.minFilter===Ai&&(t.minFilter=Rt),new d0(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}}function uv(i){let e=new WeakMap,t=new WeakMap,n=null;function r(u,d=!1){return u==null?null:d?a(u):s(u)}function s(u){if(u&&u.isTexture){const d=u.mapping;if(d===ga||d===xa)if(e.has(u)){const x=e.get(u).texture;return o(x,u.mapping)}else{const x=u.image;if(x&&x.height>0){const g=new Zu(x.height);return g.fromEquirectangularTexture(i,u),e.set(u,g),u.addEventListener("dispose",l),o(g.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const d=u.mapping,x=d===ga||d===xa,g=d===Ii||d===pr;if(x||g){let m=t.get(u);const p=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return n===null&&(n=new yc(i)),m=x?n.fromEquirectangular(u,m):n.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),m.texture;if(m!==void 0)return m.texture;{const _=u.image;return x&&_&&_.height>0||g&&_&&c(_)?(n===null&&(n=new yc(i)),m=x?n.fromEquirectangular(u):n.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function o(u,d){return d===ga?u.mapping=Ii:d===xa&&(u.mapping=pr),u}function c(u){let d=0;const x=6;for(let g=0;g<x;g++)u[g]!==void 0&&d++;return d===x}function l(u){const d=u.target;d.removeEventListener("dispose",l);const x=e.get(d);x!==void 0&&(e.delete(d),x.dispose())}function h(u){const d=u.target;d.removeEventListener("dispose",h);const x=t.get(d);x!==void 0&&(t.delete(d),x.dispose())}function f(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:f}}function hv(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&lr("WebGLRenderer: "+n+" extension not supported."),r}}}function fv(i,e,t,n){const r={},s=new WeakMap;function a(f){const u=f.target;u.index!==null&&e.remove(u.index);for(const x in u.attributes)e.remove(u.attributes[x]);u.removeEventListener("dispose",a),delete r[u.id];const d=s.get(u);d&&(e.remove(d),s.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(f,u){return r[u.id]===!0||(u.addEventListener("dispose",a),r[u.id]=!0,t.memory.geometries++),u}function c(f){const u=f.attributes;for(const d in u)e.update(u[d],i.ARRAY_BUFFER)}function l(f){const u=[],d=f.index,x=f.attributes.position;let g=0;if(x===void 0)return;if(d!==null){const _=d.array;g=d.version;for(let S=0,b=_.length;S<b;S+=3){const w=_[S+0],E=_[S+1],L=_[S+2];u.push(w,E,E,L,L,w)}}else{const _=x.array;g=x.version;for(let S=0,b=_.length/3-1;S<b;S+=3){const w=S+0,E=S+1,L=S+2;u.push(w,E,E,L,L,w)}}const m=new(x.count>=65535?ku:zu)(u,1);m.version=g;const p=s.get(f);p&&e.remove(p),s.set(f,m)}function h(f){const u=s.get(f);if(u){const d=f.index;d!==null&&u.version<d.version&&l(f)}else l(f);return s.get(f)}return{get:o,update:c,getWireframeAttribute:h}}function dv(i,e,t){let n;function r(f){n=f}let s,a;function o(f){s=f.type,a=f.bytesPerElement}function c(f,u){i.drawElements(n,u,s,f*a),t.update(u,n,1)}function l(f,u,d){d!==0&&(i.drawElementsInstanced(n,u,s,f*a,d),t.update(u,n,d))}function h(f,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,s,f,0,d);let g=0;for(let m=0;m<d;m++)g+=u[m];t.update(g,n,1)}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function pv(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:rt("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function mv(i,e,t){const n=new WeakMap,r=new ot;function s(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=h!==void 0?h.length:0;let u=n.get(o);if(u===void 0||u.count!==f){let C=function(){L.dispose(),n.delete(o),o.removeEventListener("dispose",C)};u!==void 0&&u.texture.dispose();const d=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],_=o.morphAttributes.color||[];let S=0;d===!0&&(S=1),x===!0&&(S=2),g===!0&&(S=3);let b=o.attributes.position.count*S,w=1;b>e.maxTextureSize&&(w=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const E=new Float32Array(b*w*4*f),L=new Fu(E,b,w,f);L.type=Fn,L.needsUpdate=!0;const M=S*4;for(let A=0;A<f;A++){const P=m[A],F=p[A],U=_[A],D=b*w*4*A;for(let O=0;O<P.count;O++){const k=O*M;d===!0&&(r.fromBufferAttribute(P,O),E[D+k+0]=r.x,E[D+k+1]=r.y,E[D+k+2]=r.z,E[D+k+3]=0),x===!0&&(r.fromBufferAttribute(F,O),E[D+k+4]=r.x,E[D+k+5]=r.y,E[D+k+6]=r.z,E[D+k+7]=0),g===!0&&(r.fromBufferAttribute(U,O),E[D+k+8]=r.x,E[D+k+9]=r.y,E[D+k+10]=r.z,E[D+k+11]=U.itemSize===4?r.w:1)}}u={count:f,texture:L,size:new He(b,w)},n.set(o,u),o.addEventListener("dispose",C)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let d=0;for(let g=0;g<l.length;g++)d+=l[g];const x=o.morphTargetsRelative?1:1-d;c.getUniforms().setValue(i,"morphTargetBaseInfluence",x),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:s}}function gv(i,e,t,n,r){let s=new WeakMap;function a(l){const h=r.render.frame,f=l.geometry,u=e.get(l,f);if(s.get(u)!==h&&(e.update(u),s.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),s.get(l)!==h&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,h))),l.isSkinnedMesh){const d=l.skeleton;s.get(d)!==h&&(d.update(),s.set(d,h))}return u}function o(){s=new WeakMap}function c(l){const h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}const xv={[Mu]:"LINEAR_TONE_MAPPING",[Su]:"REINHARD_TONE_MAPPING",[yu]:"CINEON_TONE_MAPPING",[bu]:"ACES_FILMIC_TONE_MAPPING",[Eu]:"AGX_TONE_MAPPING",[Tu]:"NEUTRAL_TONE_MAPPING",[wu]:"CUSTOM_TONE_MAPPING"};function vv(i,e,t,n,r,s){const a=new Mn(e,t,{type:i,depthBuffer:r,stencilBuffer:s,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,c=null;const l=new Ht;l.setAttribute("position",new Lt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Lt([0,2,0,0,2,0],2));const h=new u0({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new Vt(l,h),u=new vl(-1,1,1,-1,0,1);let d=null,x=null,g=!1,m,p=null,_=[],S=!1;this.setSize=function(b,w){a.setSize(b,w),o!==null&&o.setSize(b,w),c!==null&&c.setSize(b,w);for(let E=0;E<_.length;E++){const L=_[E];L.setSize&&L.setSize(b,w)}},this.setEffects=function(b){_=b,S=_.length>0&&_[0].isRenderPass===!0;const w=a.width,E=a.height;_.length>0&&o===null&&(o=new Mn(w,E,{type:Gn,depthBuffer:!1,stencilBuffer:!1}),c=new Mn(w,E,{type:Gn,depthBuffer:!1,stencilBuffer:!1}));for(let L=0;L<_.length;L++){const M=_[L];M.setSize&&M.setSize(w,E)}},this.begin=function(b,w){if(g||b.toneMapping===zn&&_.length===0)return!1;if(p=w,w!==null){const E=w.width,L=w.height;(a.width!==E||a.height!==L)&&this.setSize(E,L)}return S===!1&&b.setRenderTarget(a),m=b.toneMapping,b.toneMapping=zn,!0},this.hasRenderPass=function(){return S},this.end=function(b,w){b.toneMapping=m,g=!0;let E=a,L=o;for(let M=0;M<_.length;M++){const C=_[M];C.enabled!==!1&&(C.render(b,L,E,w),C.needsSwap!==!1&&(E=L,L=L===o?c:o))}if(d!==b.outputColorSpace||x!==b.toneMapping){d=b.outputColorSpace,x=b.toneMapping,h.defines={},tt.getTransfer(d)===mt&&(h.defines.SRGB_TRANSFER="");const M=xv[x];M&&(h.defines[M]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=E.texture,b.setRenderTarget(p),b.render(f,u),p=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),h.dispose()}}const Ju=new Zt,Yo=new mr(1,1),Qu=new Fu,ju=new zm,eh=new Vu,Tc=[],Ac=[],Cc=new Float32Array(16),Rc=new Float32Array(9),Lc=new Float32Array(4);function Sr(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=Tc[r];if(s===void 0&&(s=new Float32Array(r),Tc[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function zt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function kt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function aa(i,e){let t=Ac[e];t===void 0&&(t=new Int32Array(e),Ac[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function _v(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Mv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(zt(t,e))return;i.uniform2fv(this.addr,e),kt(t,e)}}function Sv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(zt(t,e))return;i.uniform3fv(this.addr,e),kt(t,e)}}function yv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(zt(t,e))return;i.uniform4fv(this.addr,e),kt(t,e)}}function bv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(zt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),kt(t,e)}else{if(zt(t,n))return;Lc.set(n),i.uniformMatrix2fv(this.addr,!1,Lc),kt(t,n)}}function wv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(zt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),kt(t,e)}else{if(zt(t,n))return;Rc.set(n),i.uniformMatrix3fv(this.addr,!1,Rc),kt(t,n)}}function Ev(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(zt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),kt(t,e)}else{if(zt(t,n))return;Cc.set(n),i.uniformMatrix4fv(this.addr,!1,Cc),kt(t,n)}}function Tv(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Av(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(zt(t,e))return;i.uniform2iv(this.addr,e),kt(t,e)}}function Cv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(zt(t,e))return;i.uniform3iv(this.addr,e),kt(t,e)}}function Rv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(zt(t,e))return;i.uniform4iv(this.addr,e),kt(t,e)}}function Lv(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Pv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(zt(t,e))return;i.uniform2uiv(this.addr,e),kt(t,e)}}function Dv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(zt(t,e))return;i.uniform3uiv(this.addr,e),kt(t,e)}}function Iv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(zt(t,e))return;i.uniform4uiv(this.addr,e),kt(t,e)}}function Uv(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(Yo.compareFunction=t.isReversedDepthBuffer()?pl:dl,s=Yo):s=Ju,t.setTexture2D(e||s,r)}function Nv(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||ju,r)}function Fv(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||eh,r)}function Ov(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Qu,r)}function Bv(i){switch(i){case 5126:return _v;case 35664:return Mv;case 35665:return Sv;case 35666:return yv;case 35674:return bv;case 35675:return wv;case 35676:return Ev;case 5124:case 35670:return Tv;case 35667:case 35671:return Av;case 35668:case 35672:return Cv;case 35669:case 35673:return Rv;case 5125:return Lv;case 36294:return Pv;case 36295:return Dv;case 36296:return Iv;case 35678:case 36198:case 36298:case 36306:case 35682:return Uv;case 35679:case 36299:case 36307:return Nv;case 35680:case 36300:case 36308:case 36293:return Fv;case 36289:case 36303:case 36311:case 36292:return Ov}}function zv(i,e){i.uniform1fv(this.addr,e)}function kv(i,e){const t=Sr(e,this.size,2);i.uniform2fv(this.addr,t)}function Gv(i,e){const t=Sr(e,this.size,3);i.uniform3fv(this.addr,t)}function Hv(i,e){const t=Sr(e,this.size,4);i.uniform4fv(this.addr,t)}function Vv(i,e){const t=Sr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Wv(i,e){const t=Sr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Xv(i,e){const t=Sr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Yv(i,e){i.uniform1iv(this.addr,e)}function qv(i,e){i.uniform2iv(this.addr,e)}function Kv(i,e){i.uniform3iv(this.addr,e)}function $v(i,e){i.uniform4iv(this.addr,e)}function Zv(i,e){i.uniform1uiv(this.addr,e)}function Jv(i,e){i.uniform2uiv(this.addr,e)}function Qv(i,e){i.uniform3uiv(this.addr,e)}function jv(i,e){i.uniform4uiv(this.addr,e)}function e1(i,e,t){const n=this.cache,r=e.length,s=aa(t,r);zt(n,s)||(i.uniform1iv(this.addr,s),kt(n,s));let a;this.type===i.SAMPLER_2D_SHADOW?a=Yo:a=Ju;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function t1(i,e,t){const n=this.cache,r=e.length,s=aa(t,r);zt(n,s)||(i.uniform1iv(this.addr,s),kt(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||ju,s[a])}function n1(i,e,t){const n=this.cache,r=e.length,s=aa(t,r);zt(n,s)||(i.uniform1iv(this.addr,s),kt(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||eh,s[a])}function i1(i,e,t){const n=this.cache,r=e.length,s=aa(t,r);zt(n,s)||(i.uniform1iv(this.addr,s),kt(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Qu,s[a])}function r1(i){switch(i){case 5126:return zv;case 35664:return kv;case 35665:return Gv;case 35666:return Hv;case 35674:return Vv;case 35675:return Wv;case 35676:return Xv;case 5124:case 35670:return Yv;case 35667:case 35671:return qv;case 35668:case 35672:return Kv;case 35669:case 35673:return $v;case 5125:return Zv;case 36294:return Jv;case 36295:return Qv;case 36296:return jv;case 35678:case 36198:case 36298:case 36306:case 35682:return e1;case 35679:case 36299:case 36307:return t1;case 35680:case 36300:case 36308:case 36293:return n1;case 36289:case 36303:case 36311:case 36292:return i1}}class s1{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Bv(t.type)}}class a1{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=r1(t.type)}}class o1{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],n)}}}const qa=/(\w+)(\])?(\[|\.)?/g;function Pc(i,e){i.seq.push(e),i.map[e.id]=e}function l1(i,e,t){const n=i.name,r=n.length;for(qa.lastIndex=0;;){const s=qa.exec(n),a=qa.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===r){Pc(t,l===void 0?new s1(o,i,e):new a1(o,i,e));break}else{let f=t.map[o];f===void 0&&(f=new o1(o),Pc(t,f)),t=f}}}class Us{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);l1(o,c,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&n.push(a)}return n}}function Dc(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const c1=37297;let u1=0;function h1(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Ic=new We;function f1(i){tt._getMatrix(Ic,tt.workingColorSpace,i);const e=`mat3( ${Ic.elements.map(t=>t.toFixed(4))} )`;switch(tt.getTransfer(i)){case Gs:return[e,"LinearTransferOETF"];case mt:return[e,"sRGBTransferOETF"];default:return Be("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Uc(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+h1(i.getShaderSource(e),o)}else return s}function d1(i,e){const t=f1(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const p1={[Mu]:"Linear",[Su]:"Reinhard",[yu]:"Cineon",[bu]:"ACESFilmic",[Eu]:"AgX",[Tu]:"Neutral",[wu]:"Custom"};function m1(i,e){const t=p1[e];return t===void 0?(Be("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ss=new W;function g1(){tt.getLuminanceCoefficients(Ss);const i=Ss.x.toFixed(4),e=Ss.y.toFixed(4),t=Ss.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function x1(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Or).join(`
`)}function v1(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function _1(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),a=s.name;let o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Or(i){return i!==""}function Nc(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Fc(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const M1=/^[ \t]*#include +<([\w\d./]+)>/gm;function qo(i){return i.replace(M1,y1)}const S1=new Map;function y1(i,e){let t=Ze[e];if(t===void 0){const n=S1.get(e);if(n!==void 0)t=Ze[n],Be('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return qo(t)}const b1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Oc(i){return i.replace(b1,w1)}function w1(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Bc(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}const E1={[Rs]:"SHADOWMAP_TYPE_PCF",[Nr]:"SHADOWMAP_TYPE_VSM"};function T1(i){return E1[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const A1={[Ii]:"ENVMAP_TYPE_CUBE",[pr]:"ENVMAP_TYPE_CUBE",[ra]:"ENVMAP_TYPE_CUBE_UV"};function C1(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":A1[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const R1={[pr]:"ENVMAP_MODE_REFRACTION"};function L1(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":R1[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const P1={[_u]:"ENVMAP_BLENDING_MULTIPLY",[gm]:"ENVMAP_BLENDING_MIX",[xm]:"ENVMAP_BLENDING_ADD"};function D1(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":P1[i.combine]||"ENVMAP_BLENDING_NONE"}function I1(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function U1(i,e,t,n){const r=i.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=T1(t),l=C1(t),h=L1(t),f=D1(t),u=I1(t),d=x1(t),x=v1(s),g=r.createProgram();let m,p,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Or).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Or).join(`
`),p.length>0&&(p+=`
`)):(m=[Bc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Or).join(`
`),p=[Bc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==zn?"#define TONE_MAPPING":"",t.toneMapping!==zn?Ze.tonemapping_pars_fragment:"",t.toneMapping!==zn?m1("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ze.colorspace_pars_fragment,d1("linearToOutputTexel",t.outputColorSpace),g1(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Or).join(`
`)),a=qo(a),a=Nc(a,t),a=Fc(a,t),o=qo(o),o=Nc(o,t),o=Fc(o,t),a=Oc(a),o=Oc(o),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===ql?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ql?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const S=_+m+a,b=_+p+o,w=Dc(r,r.VERTEX_SHADER,S),E=Dc(r,r.FRAGMENT_SHADER,b);r.attachShader(g,w),r.attachShader(g,E),t.index0AttributeName!==void 0?r.bindAttribLocation(g,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(g,0,"position"),r.linkProgram(g);function L(P){if(i.debug.checkShaderErrors){const F=r.getProgramInfoLog(g)||"",U=r.getShaderInfoLog(w)||"",D=r.getShaderInfoLog(E)||"",O=F.trim(),k=U.trim(),Y=D.trim();let j=!0,X=!0;if(r.getProgramParameter(g,r.LINK_STATUS)===!1)if(j=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,g,w,E);else{const te=Uc(r,w,"vertex"),N=Uc(r,E,"fragment");rt("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(g,r.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+O+`
`+te+`
`+N)}else O!==""?Be("WebGLProgram: Program Info Log:",O):(k===""||Y==="")&&(X=!1);X&&(P.diagnostics={runnable:j,programLog:O,vertexShader:{log:k,prefix:m},fragmentShader:{log:Y,prefix:p}})}r.deleteShader(w),r.deleteShader(E),M=new Us(r,g),C=_1(r,g)}let M;this.getUniforms=function(){return M===void 0&&L(this),M};let C;this.getAttributes=function(){return C===void 0&&L(this),C};let A=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return A===!1&&(A=r.getProgramParameter(g,c1)),A},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=u1++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=w,this.fragmentShader=E,this}let N1=0;class F1{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new O1(e),t.set(e,n)),n}}class O1{constructor(e){this.id=N1++,this.code=e,this.usedTimes=0}}function B1(i){return i===Ui||i===zs||i===ks}function z1(i,e,t,n,r,s){const a=new Ou,o=new F1,c=new Set,l=[],h=new Map,f=n.logarithmicDepthBuffer;let u=n.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(M){return c.add(M),M===0?"uv":`uv${M}`}function g(M,C,A,P,F,U){const D=P.fog,O=F.geometry,k=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?P.environment:null,Y=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap,j=e.get(M.envMap||k,Y),X=j&&j.mapping===ra?j.image.height:null,te=d[M.type];M.precision!==null&&(u=n.getMaxPrecision(M.precision),u!==M.precision&&Be("WebGLProgram.getParameters:",M.precision,"not supported, using",u,"instead."));const N=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,re=N!==void 0?N.length:0;let oe=0;O.morphAttributes.position!==void 0&&(oe=1),O.morphAttributes.normal!==void 0&&(oe=2),O.morphAttributes.color!==void 0&&(oe=3);let Se,Ue,Ge,I;if(te){const St=Nn[te];Se=St.vertexShader,Ue=St.fragmentShader}else{Se=M.vertexShader,Ue=M.fragmentShader;const St=o.getVertexShaderStage(M),lt=o.getFragmentShaderStage(M);o.update(M,St,lt),Ge=St.id,I=lt.id}const K=i.getRenderTarget(),se=i.state.buffers.depth.getReversed(),ve=F.isInstancedMesh===!0,ce=F.isBatchedMesh===!0,Te=!!M.map,ze=!!M.matcap,Ne=!!j,Je=!!M.aoMap,dt=!!M.lightMap,Ke=!!M.bumpMap&&M.wireframe===!1,gt=!!M.normalMap,Ct=!!M.displacementMap,It=!!M.emissiveMap,Mt=!!M.metalnessMap,Ve=!!M.roughnessMap,B=M.anisotropy>0,pt=M.clearcoat>0,ke=M.dispersion>0,R=M.retroreflectivity>0,y=M.iridescence>0,V=M.sheen>0,q=M.transmission>0,Q=B&&!!M.anisotropyMap,le=pt&&!!M.clearcoatMap,ue=pt&&!!M.clearcoatNormalMap,ee=pt&&!!M.clearcoatRoughnessMap,ne=y&&!!M.iridescenceMap,he=y&&!!M.iridescenceThicknessMap,Pe=V&&!!M.sheenColorMap,me=V&&!!M.sheenRoughnessMap,fe=!!M.specularMap,De=!!M.specularColorMap,Oe=!!M.specularIntensityMap,Ye=q&&!!M.transmissionMap,H=q&&!!M.thicknessMap,de=!!M.gradientMap,ie=!!M.alphaMap,pe=M.alphaTest>0,Me=!!M.alphaHash,ae=!!M.extensions;let Ie=zn;M.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(Ie=i.toneMapping);const Re={shaderID:te,shaderType:M.type,shaderName:M.name,vertexShader:Se,fragmentShader:Ue,defines:M.defines,customVertexShaderID:Ge,customFragmentShaderID:I,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:u,batching:ce,batchingColor:ce&&F._colorsTexture!==null,instancing:ve,instancingColor:ve&&F.instanceColor!==null,instancingMorph:ve&&F.morphTexture!==null,outputColorSpace:K===null?i.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:tt.workingColorSpace,alphaToCoverage:!!M.alphaToCoverage,map:Te,matcap:ze,envMap:Ne,envMapMode:Ne&&j.mapping,envMapCubeUVHeight:X,aoMap:Je,lightMap:dt,bumpMap:Ke,normalMap:gt,displacementMap:Ct,emissiveMap:It,normalMapObjectSpace:gt&&M.normalMapType===Mm,normalMapTangentSpace:gt&&M.normalMapType===Yl,packedNormalMap:gt&&M.normalMapType===Yl&&B1(M.normalMap.format),metalnessMap:Mt,roughnessMap:Ve,anisotropy:B,anisotropyMap:Q,clearcoat:pt,clearcoatMap:le,clearcoatNormalMap:ue,clearcoatRoughnessMap:ee,dispersion:ke,retroreflection:R,iridescence:y,iridescenceMap:ne,iridescenceThicknessMap:he,sheen:V,sheenColorMap:Pe,sheenRoughnessMap:me,specularMap:fe,specularColorMap:De,specularIntensityMap:Oe,transmission:q,transmissionMap:Ye,thicknessMap:H,gradientMap:de,opaque:M.transparent===!1&&M.blending===ar&&M.alphaToCoverage===!1,alphaMap:ie,alphaTest:pe,alphaHash:Me,combine:M.combine,mapUv:Te&&x(M.map.channel),aoMapUv:Je&&x(M.aoMap.channel),lightMapUv:dt&&x(M.lightMap.channel),bumpMapUv:Ke&&x(M.bumpMap.channel),normalMapUv:gt&&x(M.normalMap.channel),displacementMapUv:Ct&&x(M.displacementMap.channel),emissiveMapUv:It&&x(M.emissiveMap.channel),metalnessMapUv:Mt&&x(M.metalnessMap.channel),roughnessMapUv:Ve&&x(M.roughnessMap.channel),anisotropyMapUv:Q&&x(M.anisotropyMap.channel),clearcoatMapUv:le&&x(M.clearcoatMap.channel),clearcoatNormalMapUv:ue&&x(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ee&&x(M.clearcoatRoughnessMap.channel),iridescenceMapUv:ne&&x(M.iridescenceMap.channel),iridescenceThicknessMapUv:he&&x(M.iridescenceThicknessMap.channel),sheenColorMapUv:Pe&&x(M.sheenColorMap.channel),sheenRoughnessMapUv:me&&x(M.sheenRoughnessMap.channel),specularMapUv:fe&&x(M.specularMap.channel),specularColorMapUv:De&&x(M.specularColorMap.channel),specularIntensityMapUv:Oe&&x(M.specularIntensityMap.channel),transmissionMapUv:Ye&&x(M.transmissionMap.channel),thicknessMapUv:H&&x(M.thicknessMap.channel),alphaMapUv:ie&&x(M.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(gt||B),vertexNormals:!!O.attributes.normal,vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!O.attributes.uv&&(Te||ie),fog:!!D,useFog:M.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:M.wireframe===!1&&(M.flatShading===!0||O.attributes.normal===void 0&&gt===!1&&(M.isMeshLambertMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isMeshPhysicalMaterial)),sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:se,skinning:F.isSkinnedMesh===!0,hasPositionAttribute:O.attributes.position!==void 0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:re,morphTextureStride:oe,numSunLights:C.sun.length,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numSunLightShadows:C.sunShadowMap.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numLightProbeGrids:U.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&A.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ie,decodeVideoTexture:Te&&M.map.isVideoTexture===!0&&tt.getTransfer(M.map.colorSpace)===mt,decodeVideoTextureEmissive:It&&M.emissiveMap.isVideoTexture===!0&&tt.getTransfer(M.emissiveMap.colorSpace)===mt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Kn,flipSided:M.side===tn,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:ae&&M.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ae&&M.extensions.multiDraw===!0||ce)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return Re.vertexUv1s=c.has(1),Re.vertexUv2s=c.has(2),Re.vertexUv3s=c.has(3),c.clear(),Re}function m(M){const C=[];if(M.shaderID?C.push(M.shaderID):(C.push(M.customVertexShaderID),C.push(M.customFragmentShaderID)),M.defines!==void 0)for(const A in M.defines)C.push(A),C.push(M.defines[A]);return M.isRawShaderMaterial===!1&&(p(C,M),_(C,M),C.push(i.outputColorSpace)),C.push(M.customProgramCacheKey),C.join()}function p(M,C){M.push(C.precision),M.push(C.outputColorSpace),M.push(C.envMapMode),M.push(C.envMapCubeUVHeight),M.push(C.mapUv),M.push(C.alphaMapUv),M.push(C.lightMapUv),M.push(C.aoMapUv),M.push(C.bumpMapUv),M.push(C.normalMapUv),M.push(C.displacementMapUv),M.push(C.emissiveMapUv),M.push(C.metalnessMapUv),M.push(C.roughnessMapUv),M.push(C.anisotropyMapUv),M.push(C.clearcoatMapUv),M.push(C.clearcoatNormalMapUv),M.push(C.clearcoatRoughnessMapUv),M.push(C.iridescenceMapUv),M.push(C.iridescenceThicknessMapUv),M.push(C.sheenColorMapUv),M.push(C.sheenRoughnessMapUv),M.push(C.specularMapUv),M.push(C.specularColorMapUv),M.push(C.specularIntensityMapUv),M.push(C.transmissionMapUv),M.push(C.thicknessMapUv),M.push(C.combine),M.push(C.fogExp2),M.push(C.sizeAttenuation),M.push(C.morphTargetsCount),M.push(C.morphAttributeCount),M.push(C.numSunLights),M.push(C.numDirLights),M.push(C.numPointLights),M.push(C.numSpotLights),M.push(C.numSpotLightMaps),M.push(C.numHemiLights),M.push(C.numRectAreaLights),M.push(C.numSunLightShadows),M.push(C.numDirLightShadows),M.push(C.numPointLightShadows),M.push(C.numSpotLightShadows),M.push(C.numSpotLightShadowsWithMaps),M.push(C.numLightProbes),M.push(C.shadowMapType),M.push(C.toneMapping),M.push(C.numClippingPlanes),M.push(C.numClipIntersection),M.push(C.depthPacking)}function _(M,C){a.disableAll(),C.instancing&&a.enable(0),C.instancingColor&&a.enable(1),C.instancingMorph&&a.enable(2),C.matcap&&a.enable(3),C.envMap&&a.enable(4),C.normalMapObjectSpace&&a.enable(5),C.normalMapTangentSpace&&a.enable(6),C.clearcoat&&a.enable(7),C.iridescence&&a.enable(8),C.alphaTest&&a.enable(9),C.vertexColors&&a.enable(10),C.vertexAlphas&&a.enable(11),C.vertexUv1s&&a.enable(12),C.vertexUv2s&&a.enable(13),C.vertexUv3s&&a.enable(14),C.vertexTangents&&a.enable(15),C.anisotropy&&a.enable(16),C.alphaHash&&a.enable(17),C.batching&&a.enable(18),C.dispersion&&a.enable(19),C.retroreflection&&a.enable(24),C.batchingColor&&a.enable(20),C.gradientMap&&a.enable(21),C.packedNormalMap&&a.enable(22),C.vertexNormals&&a.enable(23),M.push(a.mask),a.disableAll(),C.fog&&a.enable(0),C.useFog&&a.enable(1),C.flatShading&&a.enable(2),C.logarithmicDepthBuffer&&a.enable(3),C.reversedDepthBuffer&&a.enable(4),C.skinning&&a.enable(5),C.morphTargets&&a.enable(6),C.morphNormals&&a.enable(7),C.morphColors&&a.enable(8),C.premultipliedAlpha&&a.enable(9),C.shadowMapEnabled&&a.enable(10),C.doubleSided&&a.enable(11),C.flipSided&&a.enable(12),C.useDepthPacking&&a.enable(13),C.dithering&&a.enable(14),C.transmission&&a.enable(15),C.sheen&&a.enable(16),C.opaque&&a.enable(17),C.pointsUvs&&a.enable(18),C.decodeVideoTexture&&a.enable(19),C.decodeVideoTextureEmissive&&a.enable(20),C.alphaToCoverage&&a.enable(21),C.numLightProbeGrids>0&&a.enable(22),C.hasPositionAttribute&&a.enable(23),M.push(a.mask)}function S(M){const C=d[M.type];let A;if(C){const P=Nn[C];A=o0.clone(P.uniforms)}else A=M.uniforms;return A}function b(M,C){let A=h.get(C);return A!==void 0?++A.usedTimes:(A=new U1(i,C,M,r),l.push(A),h.set(C,A)),A}function w(M){if(--M.usedTimes===0){const C=l.indexOf(M);l[C]=l[l.length-1],l.pop(),h.delete(M.cacheKey),M.destroy()}}function E(M){o.remove(M)}function L(){o.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:S,acquireProgram:b,releaseProgram:w,releaseShaderCache:E,programs:l,dispose:L}}function k1(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function r(a,o,c){i.get(a)[o]=c}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function G1(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function zc(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function kc(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(u){let d=0;return u.isInstancedMesh&&(d+=2),u.isSkinnedMesh&&(d+=1),d}function o(u,d,x,g,m,p){let _=i[e];return _===void 0?(_={id:u.id,object:u,geometry:d,material:x,materialVariant:a(u),groupOrder:g,renderOrder:u.renderOrder,z:m,group:p},i[e]=_):(_.id=u.id,_.object=u,_.geometry=d,_.material=x,_.materialVariant=a(u),_.groupOrder=g,_.renderOrder=u.renderOrder,_.z=m,_.group=p),e++,_}function c(u,d,x,g,m,p,_){_.reversedDepth===!0&&(m=-m);const S=o(u,d,x,g,m,p);x.transmission>0?n.push(S):x.transparent===!0?r.push(S):t.push(S)}function l(u,d,x,g,m,p){const _=o(u,d,x,g,m,p);x.transmission>0?n.unshift(_):x.transparent===!0?r.unshift(_):t.unshift(_)}function h(u,d){t.length>1&&t.sort(u||G1),n.length>1&&n.sort(d||zc),r.length>1&&r.sort(d||zc)}function f(){for(let u=e,d=i.length;u<d;u++){const x=i[u];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:c,unshift:l,finish:f,sort:h}}function H1(){let i=new WeakMap;function e(n,r){const s=i.get(n);let a;return s===void 0?(a=new kc,i.set(n,[a])):r>=s.length?(a=new kc,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function V1(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new W,color:new Qe};break;case"SpotLight":t={position:new W,direction:new W,color:new Qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new W,color:new Qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new W,skyColor:new Qe,groundColor:new Qe};break;case"RectAreaLight":t={color:new Qe,position:new W,halfWidth:new W,halfHeight:new W};break}return i[e.id]=t,t}}}function W1(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let X1=0;function Y1(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function q1(i){const e=new V1,t=W1(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new W);const r=new W,s=new At,a=new At;function o(l){let h=0,f=0,u=0;for(let F=0;F<9;F++)n.probe[F].set(0,0,0);let d=0,x=0,g=0,m=0,p=0,_=0,S=0,b=0,w=0,E=0,L=0,M=0,C=0,A=0;l.sort(Y1);for(let F=0,U=l.length;F<U;F++){const D=l[F],O=D.color,k=D.intensity,Y=D.distance;let j=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===Ui?j=D.shadow.map.texture:j=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)h+=O.r*k,f+=O.g*k,u+=O.b*k;else if(D.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(D.sh.coefficients[X],k);A++}else if(D.isSunLight){const X=e.get(D);if(X.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const te=D.shadow,N=t.get(D);N.shadowIntensity=te.intensity,N.shadowBias=te.bias,N.shadowNormalBias=te.normalBias,N.shadowRadius=te.radius,N.shadowMapSize.copy(te.mapSize).multiply(te.getFrameExtents()),n.sunShadow[x]=N,n.sunShadowMap[x]=j;const re=te.getViewportCount();for(let oe=0;oe<re;oe++)n.sunShadowMatrix[g+oe]=te.getMatrix(oe),n.sunShadowCascade[g+oe]=te._cascadeData[oe];g+=re,x++}n.sun[d]=X,d++}else if(D.isDirectionalLight){const X=e.get(D);if(X.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const te=D.shadow,N=t.get(D);N.shadowIntensity=te.intensity,N.shadowBias=te.bias,N.shadowNormalBias=te.normalBias,N.shadowRadius=te.radius,N.shadowMapSize=te.mapSize,n.directionalShadow[m]=N,n.directionalShadowMap[m]=j,n.directionalShadowMatrix[m]=D.shadow.matrix,w++}n.directional[m]=X,m++}else if(D.isSpotLight){const X=e.get(D);X.position.setFromMatrixPosition(D.matrixWorld),X.color.copy(O).multiplyScalar(k),X.distance=Y,X.coneCos=Math.cos(D.angle),X.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),X.decay=D.decay,n.spot[_]=X;const te=D.shadow;if(D.map&&(n.spotLightMap[M]=D.map,M++,te.updateMatrices(D),D.castShadow&&C++),n.spotLightMatrix[_]=te.matrix,D.castShadow){const N=t.get(D);N.shadowIntensity=te.intensity,N.shadowBias=te.bias,N.shadowNormalBias=te.normalBias,N.shadowRadius=te.radius,N.shadowMapSize=te.mapSize,n.spotShadow[_]=N,n.spotShadowMap[_]=j,L++}_++}else if(D.isRectAreaLight){const X=e.get(D);X.color.copy(O).multiplyScalar(k),X.halfWidth.set(D.width*.5,0,0),X.halfHeight.set(0,D.height*.5,0),n.rectArea[S]=X,S++}else if(D.isPointLight){const X=e.get(D);if(X.color.copy(D.color).multiplyScalar(D.intensity),X.distance=D.distance,X.decay=D.decay,D.castShadow){const te=D.shadow,N=t.get(D);N.shadowIntensity=te.intensity,N.shadowBias=te.bias,N.shadowNormalBias=te.normalBias,N.shadowRadius=te.radius,N.shadowMapSize=te.mapSize,N.shadowCameraNear=te.camera.near,N.shadowCameraFar=te.camera.far,n.pointShadow[p]=N,n.pointShadowMap[p]=j,n.pointShadowMatrix[p]=D.shadow.matrix,E++}n.point[p]=X,p++}else if(D.isHemisphereLight){const X=e.get(D);X.skyColor.copy(D.color).multiplyScalar(k),X.groundColor.copy(D.groundColor).multiplyScalar(k),n.hemi[b]=X,b++}}S>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ge.LTC_FLOAT_1,n.rectAreaLTC2=ge.LTC_FLOAT_2):(n.rectAreaLTC1=ge.LTC_HALF_1,n.rectAreaLTC2=ge.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=f,n.ambient[2]=u;const P=n.hash;(P.sunLength!==d||P.directionalLength!==m||P.pointLength!==p||P.spotLength!==_||P.rectAreaLength!==S||P.hemiLength!==b||P.numSunShadows!==x||P.numDirectionalShadows!==w||P.numPointShadows!==E||P.numSpotShadows!==L||P.numSpotMaps!==M||P.numLightProbes!==A)&&(n.sun.length=d,n.directional.length=m,n.spot.length=_,n.rectArea.length=S,n.point.length=p,n.hemi.length=b,n.sunShadow.length=x,n.sunShadowMap.length=x,n.sunShadowMatrix.length=g,n.sunShadowCascade.length=g,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.directionalShadowMatrix.length=w,n.pointShadow.length=E,n.pointShadowMap.length=E,n.pointShadowMatrix.length=E,n.spotShadow.length=L,n.spotShadowMap.length=L,n.spotLightMatrix.length=L+M-C,n.spotLightMap.length=M,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=A,P.sunLength=d,P.directionalLength=m,P.pointLength=p,P.spotLength=_,P.rectAreaLength=S,P.hemiLength=b,P.numSunShadows=x,P.numDirectionalShadows=w,P.numPointShadows=E,P.numSpotShadows=L,P.numSpotMaps=M,P.numLightProbes=A,n.version=X1++)}function c(l,h){let f=0,u=0,d=0,x=0,g=0,m=0;const p=h.matrixWorldInverse;for(let _=0,S=l.length;_<S;_++){const b=l[_];if(b.isSunLight){const w=n.sun[f];w.direction.setFromMatrixPosition(b.matrixWorld),w.direction.transformDirection(p),f++}else if(b.isDirectionalLight){const w=n.directional[u];w.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(p),u++}else if(b.isSpotLight){const w=n.spot[x];w.position.setFromMatrixPosition(b.matrixWorld),w.position.applyMatrix4(p),w.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(p),x++}else if(b.isRectAreaLight){const w=n.rectArea[g];w.position.setFromMatrixPosition(b.matrixWorld),w.position.applyMatrix4(p),a.identity(),s.copy(b.matrixWorld),s.premultiply(p),a.extractRotation(s),w.halfWidth.set(b.width*.5,0,0),w.halfHeight.set(0,b.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),g++}else if(b.isPointLight){const w=n.point[d];w.position.setFromMatrixPosition(b.matrixWorld),w.position.applyMatrix4(p),d++}else if(b.isHemisphereLight){const w=n.hemi[m];w.direction.setFromMatrixPosition(b.matrixWorld),w.direction.transformDirection(p),m++}}}return{setup:o,setupView:c,state:n}}function Gc(i){const e=new q1(i),t=[],n=[],r=[];function s(u){f.camera=u,t.length=0,n.length=0,r.length=0}function a(u){t.push(u)}function o(u){n.push(u)}function c(u){r.push(u)}function l(){e.setup(t)}function h(u){e.setupView(t,u)}const f={lightsArray:t,shadowsArray:n,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:f,setupLights:l,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function K1(i){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new Gc(i),e.set(r,[o])):s>=a.length?(o=new Gc(i),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const $1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Z1=`uniform sampler2D shadow_pass;
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
}`,J1=[new W(1,0,0),new W(-1,0,0),new W(0,1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1)],Q1=[new W(0,-1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1),new W(0,-1,0),new W(0,-1,0)],Hc=new At,Ir=new W,Ka=new W;function j1(i,e,t){let n=new Ws;const r=new He,s=new He,a=new ot,o=new h0,c=new f0,l={},h=t.maxTextureSize,f={[Di]:tn,[tn]:Di,[Kn]:Kn},u=new Tt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new He},radius:{value:4}},vertexShader:$1,fragmentShader:Z1}),d=u.clone();d.defines.HORIZONTAL_PASS=1;const x=new Ht;x.setAttribute("position",new un(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new Vt(x,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Rs;let p=this.type;this.render=function(E,L,M){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;this.type===Jp&&(Be("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Rs);const C=i.getRenderTarget(),A=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),F=i.state;F.setBlending(Bn),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const U=p!==this.type;U&&L.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach(O=>O.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,O=E.length;D<O;D++){const k=E[D],Y=k.shadow;if(Y===void 0){Be("WebGLShadowMap:",k,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;r.copy(Y.mapSize);const j=Y.getFrameExtents();r.multiply(j),s.copy(Y.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/j.x),r.x=s.x*j.x,Y.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/j.y),r.y=s.y*j.y,Y.mapSize.y=s.y));const X=i.state.buffers.depth.getReversed();if(Y.camera._reversedDepth=X,Y.map===null||U===!0){if(Y.map!==null&&(Y.map.depthTexture!==null&&(Y.map.depthTexture.dispose(),Y.map.depthTexture=null),Y.map.dispose()),this.type===Nr){if(k.isPointLight){Be("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Y.map=new Mn(r.x,r.y,{format:Ui,type:Gn,minFilter:Rt,magFilter:Rt,generateMipmaps:!1}),Y.map.texture.name=k.name+".shadowMap",Y.map.depthTexture=new mr(r.x,r.y,Fn),Y.map.depthTexture.name=k.name+".shadowMapDepth",Y.map.depthTexture.format=Qn,Y.map.depthTexture.compareFunction=null,Y.map.depthTexture.minFilter=Dt,Y.map.depthTexture.magFilter=Dt}else k.isPointLight?(Y.map=new Zu(r.x),Y.map.depthTexture=new s0(r.x,kn)):(Y.map=new Mn(r.x,r.y),Y.map.depthTexture=new mr(r.x,r.y,kn)),Y.map.depthTexture.name=k.name+".shadowMap",Y.map.depthTexture.format=Qn,this.type===Rs?(Y.map.depthTexture.compareFunction=X?pl:dl,Y.map.depthTexture.minFilter=Rt,Y.map.depthTexture.magFilter=Rt):(Y.map.depthTexture.compareFunction=null,Y.map.depthTexture.minFilter=Dt,Y.map.depthTexture.magFilter=Dt);Y.camera.updateProjectionMatrix()}Y.map.isWebGLCubeRenderTarget!==!0&&(Y.map.width!==r.x||Y.map.height!==r.y)&&Y.map.setSize(r.x,r.y);const te=Y.map.isWebGLCubeRenderTarget?6:Y.getViewportCount();k.isPointLight!==!0&&Y.updateMatrices(k,M);for(let N=0;N<te;N++){const re=Y.getCamera(N);if(k.isPointLight){const oe=Y.camera,Se=Y.matrix,Ue=k.distance||oe.far;Ue!==oe.far&&(oe.far=Ue,oe.updateProjectionMatrix()),Ir.setFromMatrixPosition(k.matrixWorld),oe.position.copy(Ir),Ka.copy(oe.position),Ka.add(J1[N]),oe.up.copy(Q1[N]),oe.lookAt(Ka),oe.updateMatrixWorld(),Se.makeTranslation(-Ir.x,-Ir.y,-Ir.z),Hc.multiplyMatrices(oe.projectionMatrix,oe.matrixWorldInverse),Y._frustum.setFromProjectionMatrix(Hc,oe.coordinateSystem,oe.reversedDepth)}if(Y.map.isWebGLCubeRenderTarget)i.setRenderTarget(Y.map,N),i.clear();else{N===0&&(i.setRenderTarget(Y.map),i.clear());const oe=Y.getViewport(N);a.set(s.x*oe.x,s.y*oe.y,s.x*oe.z,s.y*oe.w),F.viewport(a)}n=Y.getFrustum(N),b(L,M,re,k,this.type)}Y.isPointLightShadow!==!0&&this.type===Nr&&_(Y,M),Y.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(C,A,P)};function _(E,L){const M=e.update(g);u.defines.VSM_SAMPLES!==E.blurSamples&&(u.defines.VSM_SAMPLES=E.blurSamples,d.defines.VSM_SAMPLES=E.blurSamples,u.needsUpdate=!0,d.needsUpdate=!0),E.mapPass===null?E.mapPass=new Mn(r.x,r.y,{format:Ui,type:Gn}):(E.mapPass.width!==E.map.width||E.mapPass.height!==E.map.height)&&E.mapPass.setSize(E.map.width,E.map.height),u.uniforms.shadow_pass.value=E.map.depthTexture,u.uniforms.resolution.value.set(E.map.width,E.map.height),u.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(L,null,M,u,g,null),d.uniforms.shadow_pass.value=E.mapPass.texture,d.uniforms.resolution.value.set(E.map.width,E.map.height),d.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(L,null,M,d,g,null)}function S(E,L,M,C){let A=null;const P=M.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(P!==void 0)A=P;else if(A=M.isPointLight===!0?c:o,i.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){const F=A.uuid,U=L.uuid;let D=l[F];D===void 0&&(D={},l[F]=D);let O=D[U];O===void 0&&(O=A.clone(),D[U]=O,L.addEventListener("dispose",w)),A=O}if(A.visible=L.visible,A.wireframe=L.wireframe,C===Nr?A.side=L.shadowSide!==null?L.shadowSide:L.side:A.side=L.shadowSide!==null?L.shadowSide:f[L.side],A.alphaMap=L.alphaMap,A.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,A.map=L.map,A.clipShadows=L.clipShadows,A.clippingPlanes=L.clippingPlanes,A.clipIntersection=L.clipIntersection,A.displacementMap=L.displacementMap,A.displacementScale=L.displacementScale,A.displacementBias=L.displacementBias,A.wireframeLinewidth=L.wireframeLinewidth,A.linewidth=L.linewidth,M.isPointLight===!0&&A.isMeshDistanceMaterial===!0){const F=i.properties.get(A);F.light=M}return A}function b(E,L,M,C,A){if(E.visible===!1)return;if(E.layers.test(L.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&A===Nr)&&(!E.frustumCulled||E.intersectsFrustum(n))){E.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,E.matrixWorld);const U=e.update(E),D=E.material;if(Array.isArray(D)){const O=U.groups;for(let k=0,Y=O.length;k<Y;k++){const j=O[k],X=D[j.materialIndex];if(X&&X.visible){const te=S(E,X,C,A);E.onBeforeShadow(i,E,L,M,U,te,j),i.renderBufferDirect(M,null,U,te,E,j),E.onAfterShadow(i,E,L,M,U,te,j)}}}else if(D.visible){const O=S(E,D,C,A);E.onBeforeShadow(i,E,L,M,U,O,null),i.renderBufferDirect(M,null,U,O,E,null),E.onAfterShadow(i,E,L,M,U,O,null)}}const F=E.children;for(let U=0,D=F.length;U<D;U++)b(F[U],L,M,C,A)}function w(E){E.target.removeEventListener("dispose",w);for(const M in l){const C=l[M],A=E.target.uuid;A in C&&(C[A].dispose(),delete C[A])}}}function e_(i,e){function t(){let H=!1;const de=new ot;let ie=null;const pe=new ot(0,0,0,0);return{setMask:function(Me){ie!==Me&&!H&&(i.colorMask(Me,Me,Me,Me),ie=Me)},setLocked:function(Me){H=Me},setClear:function(Me,ae,Ie,Re,St){St===!0&&(Me*=Re,ae*=Re,Ie*=Re),de.set(Me,ae,Ie,Re),pe.equals(de)===!1&&(i.clearColor(Me,ae,Ie,Re),pe.copy(de))},reset:function(){H=!1,ie=null,pe.set(-1,0,0,0)}}}function n(){let H=!1,de=!1,ie=null,pe=null,Me=null;return{setReversed:function(ae){if(de!==ae){const Ie=e.get("EXT_clip_control");ae?Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.ZERO_TO_ONE_EXT):Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.NEGATIVE_ONE_TO_ONE_EXT),de=ae;const Re=Me;Me=null,this.setClear(Re)}},getReversed:function(){return de},setTest:function(ae){ae?K(i.DEPTH_TEST):se(i.DEPTH_TEST)},setMask:function(ae){ie!==ae&&!H&&(i.depthMask(ae),ie=ae)},setFunc:function(ae){if(de&&(ae=Dm[ae]),pe!==ae){switch(ae){case ro:i.depthFunc(i.NEVER);break;case so:i.depthFunc(i.ALWAYS);break;case ao:i.depthFunc(i.LESS);break;case zr:i.depthFunc(i.LEQUAL);break;case oo:i.depthFunc(i.EQUAL);break;case lo:i.depthFunc(i.GEQUAL);break;case co:i.depthFunc(i.GREATER);break;case uo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}pe=ae}},setLocked:function(ae){H=ae},setClear:function(ae){Me!==ae&&(Me=ae,de&&(ae=1-ae),i.clearDepth(ae))},reset:function(){H=!1,ie=null,pe=null,Me=null,de=!1}}}function r(){let H=!1,de=null,ie=null,pe=null,Me=null,ae=null,Ie=null,Re=null,St=null;return{setTest:function(lt){H||(lt?K(i.STENCIL_TEST):se(i.STENCIL_TEST))},setMask:function(lt){de!==lt&&!H&&(i.stencilMask(lt),de=lt)},setFunc:function(lt,yn,Pn){(ie!==lt||pe!==yn||Me!==Pn)&&(i.stencilFunc(lt,yn,Pn),ie=lt,pe=yn,Me=Pn)},setOp:function(lt,yn,Pn){(ae!==lt||Ie!==yn||Re!==Pn)&&(i.stencilOp(lt,yn,Pn),ae=lt,Ie=yn,Re=Pn)},setLocked:function(lt){H=lt},setClear:function(lt){St!==lt&&(i.clearStencil(lt),St=lt)},reset:function(){H=!1,de=null,ie=null,pe=null,Me=null,ae=null,Ie=null,Re=null,St=null}}}const s=new t,a=new n,o=new r,c=new WeakMap,l=new WeakMap;let h={},f={},u={},d=new WeakMap,x=[],g=null,m=!1,p=null,_=null,S=null,b=null,w=null,E=null,L=null,M=new Qe(0,0,0),C=0,A=!1,P=null,F=null,U=null,D=null,O=null;const k=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,j=0;const X=i.getParameter(i.VERSION);X.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(X)[1]),Y=j>=1):X.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),Y=j>=2);let te=null,N={};const re=i.getParameter(i.SCISSOR_BOX),oe=i.getParameter(i.VIEWPORT),Se=new ot().fromArray(re),Ue=new ot().fromArray(oe);function Ge(H,de,ie,pe){const Me=new Uint8Array(4),ae=i.createTexture();i.bindTexture(H,ae),i.texParameteri(H,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(H,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ie=0;Ie<ie;Ie++)H===i.TEXTURE_3D||H===i.TEXTURE_2D_ARRAY?i.texImage3D(de,0,i.RGBA,1,1,pe,0,i.RGBA,i.UNSIGNED_BYTE,Me):i.texImage2D(de+Ie,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Me);return ae}const I={};I[i.TEXTURE_2D]=Ge(i.TEXTURE_2D,i.TEXTURE_2D,1),I[i.TEXTURE_CUBE_MAP]=Ge(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),I[i.TEXTURE_2D_ARRAY]=Ge(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),I[i.TEXTURE_3D]=Ge(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),K(i.DEPTH_TEST),a.setFunc(zr),Ke(!1),gt(Vl),K(i.CULL_FACE),Je(Bn);function K(H){h[H]!==!0&&(i.enable(H),h[H]=!0)}function se(H){h[H]!==!1&&(i.disable(H),h[H]=!1)}function ve(H,de){return u[H]!==de?(i.bindFramebuffer(H,de),u[H]=de,H===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=de),H===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=de),!0):!1}function ce(H,de){let ie=x,pe=!1;if(H){ie=d.get(de),ie===void 0&&(ie=[],d.set(de,ie));const Me=H.textures;if(ie.length!==Me.length||ie[0]!==i.COLOR_ATTACHMENT0){for(let ae=0,Ie=Me.length;ae<Ie;ae++)ie[ae]=i.COLOR_ATTACHMENT0+ae;ie.length=Me.length,pe=!0}}else ie[0]!==i.BACK&&(ie[0]=i.BACK,pe=!0);pe&&i.drawBuffers(ie)}function Te(H){return g!==H?(i.useProgram(H),g=H,!0):!1}const ze={[tr]:i.FUNC_ADD,[jp]:i.FUNC_SUBTRACT,[em]:i.FUNC_REVERSE_SUBTRACT};ze[tm]=i.MIN,ze[nm]=i.MAX;const Ne={[im]:i.ZERO,[rm]:i.ONE,[sm]:i.SRC_COLOR,[xu]:i.SRC_ALPHA,[hm]:i.SRC_ALPHA_SATURATE,[cm]:i.DST_COLOR,[om]:i.DST_ALPHA,[am]:i.ONE_MINUS_SRC_COLOR,[vu]:i.ONE_MINUS_SRC_ALPHA,[um]:i.ONE_MINUS_DST_COLOR,[lm]:i.ONE_MINUS_DST_ALPHA,[fm]:i.CONSTANT_COLOR,[dm]:i.ONE_MINUS_CONSTANT_COLOR,[pm]:i.CONSTANT_ALPHA,[mm]:i.ONE_MINUS_CONSTANT_ALPHA};function Je(H,de,ie,pe,Me,ae,Ie,Re,St,lt){if(H===Bn){m===!0&&(se(i.BLEND),m=!1);return}if(m===!1&&(K(i.BLEND),m=!0),H!==Qp){if(H!==p||lt!==A){if((_!==tr||w!==tr)&&(i.blendEquation(i.FUNC_ADD),_=tr,w=tr),lt)switch(H){case ar:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case dr:i.blendFunc(i.ONE,i.ONE);break;case Wl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Xl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:rt("WebGLState: Invalid blending: ",H);break}else switch(H){case ar:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case dr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Wl:rt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Xl:rt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:rt("WebGLState: Invalid blending: ",H);break}S=null,b=null,E=null,L=null,M.set(0,0,0),C=0,p=H,A=lt}return}Me=Me||de,ae=ae||ie,Ie=Ie||pe,(de!==_||Me!==w)&&(i.blendEquationSeparate(ze[de],ze[Me]),_=de,w=Me),(ie!==S||pe!==b||ae!==E||Ie!==L)&&(i.blendFuncSeparate(Ne[ie],Ne[pe],Ne[ae],Ne[Ie]),S=ie,b=pe,E=ae,L=Ie),(Re.equals(M)===!1||St!==C)&&(i.blendColor(Re.r,Re.g,Re.b,St),M.copy(Re),C=St),p=H,A=!1}function dt(H,de){H.side===Kn?se(i.CULL_FACE):K(i.CULL_FACE);let ie=H.side===tn;de&&(ie=!ie),Ke(ie),H.blending===ar&&H.transparent===!1?Je(Bn):Je(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),a.setFunc(H.depthFunc),a.setTest(H.depthTest),a.setMask(H.depthWrite),s.setMask(H.colorWrite);const pe=H.stencilWrite;o.setTest(pe),pe&&(o.setMask(H.stencilWriteMask),o.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),o.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),It(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?K(i.SAMPLE_ALPHA_TO_COVERAGE):se(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ke(H){P!==H&&(H?i.frontFace(i.CW):i.frontFace(i.CCW),P=H)}function gt(H){H!==$p?(K(i.CULL_FACE),H!==F&&(H===Vl?i.cullFace(i.BACK):H===Zp?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):se(i.CULL_FACE),F=H}function Ct(H){H!==U&&(Y&&i.lineWidth(H),U=H)}function It(H,de,ie){H?(K(i.POLYGON_OFFSET_FILL),(D!==de||O!==ie)&&(D=de,O=ie,a.getReversed()&&(de=-de),i.polygonOffset(de,ie))):se(i.POLYGON_OFFSET_FILL)}function Mt(H){H?K(i.SCISSOR_TEST):se(i.SCISSOR_TEST)}function Ve(H){H===void 0&&(H=i.TEXTURE0+k-1),te!==H&&(i.activeTexture(H),te=H)}function B(H,de,ie){ie===void 0&&(te===null?ie=i.TEXTURE0+k-1:ie=te);let pe=N[ie];pe===void 0&&(pe={type:void 0,texture:void 0},N[ie]=pe),(pe.type!==H||pe.texture!==de)&&(te!==ie&&(i.activeTexture(ie),te=ie),i.bindTexture(H,de||I[H]),pe.type=H,pe.texture=de)}function pt(){const H=N[te];H!==void 0&&H.type!==void 0&&(i.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function ke(){try{i.compressedTexImage2D(...arguments)}catch(H){rt("WebGLState:",H)}}function R(){try{i.compressedTexImage3D(...arguments)}catch(H){rt("WebGLState:",H)}}function y(){try{i.texSubImage2D(...arguments)}catch(H){rt("WebGLState:",H)}}function V(){try{i.texSubImage3D(...arguments)}catch(H){rt("WebGLState:",H)}}function q(){try{i.compressedTexSubImage2D(...arguments)}catch(H){rt("WebGLState:",H)}}function Q(){try{i.compressedTexSubImage3D(...arguments)}catch(H){rt("WebGLState:",H)}}function le(){try{i.texStorage2D(...arguments)}catch(H){rt("WebGLState:",H)}}function ue(){try{i.texStorage3D(...arguments)}catch(H){rt("WebGLState:",H)}}function ee(){try{i.texImage2D(...arguments)}catch(H){rt("WebGLState:",H)}}function ne(){try{i.texImage3D(...arguments)}catch(H){rt("WebGLState:",H)}}function he(H){return f[H]!==void 0?f[H]:i.getParameter(H)}function Pe(H,de){f[H]!==de&&(i.pixelStorei(H,de),f[H]=de)}function me(H){Se.equals(H)===!1&&(i.scissor(H.x,H.y,H.z,H.w),Se.copy(H))}function fe(H){Ue.equals(H)===!1&&(i.viewport(H.x,H.y,H.z,H.w),Ue.copy(H))}function De(H,de){let ie=l.get(de);ie===void 0&&(ie=new WeakMap,l.set(de,ie));let pe=ie.get(H);pe===void 0&&(pe=i.getUniformBlockIndex(de,H.name),ie.set(H,pe))}function Oe(H,de){const pe=l.get(de).get(H);c.get(de)!==pe&&(i.uniformBlockBinding(de,pe,H.__bindingPointIndex),c.set(de,pe))}function Ye(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},f={},te=null,N={},u={},d=new WeakMap,x=[],g=null,m=!1,p=null,_=null,S=null,b=null,w=null,E=null,L=null,M=new Qe(0,0,0),C=0,A=!1,P=null,F=null,U=null,D=null,O=null,Se.set(0,0,i.canvas.width,i.canvas.height),Ue.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:K,disable:se,bindFramebuffer:ve,drawBuffers:ce,useProgram:Te,setBlending:Je,setMaterial:dt,setFlipSided:Ke,setCullFace:gt,setLineWidth:Ct,setPolygonOffset:It,setScissorTest:Mt,activeTexture:Ve,bindTexture:B,unbindTexture:pt,compressedTexImage2D:ke,compressedTexImage3D:R,texImage2D:ee,texImage3D:ne,pixelStorei:Pe,getParameter:he,updateUBOMapping:De,uniformBlockBinding:Oe,texStorage2D:le,texStorage3D:ue,texSubImage2D:y,texSubImage3D:V,compressedTexSubImage2D:q,compressedTexSubImage3D:Q,scissor:me,viewport:fe,reset:Ye}}function t_(i,e,t,n,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new He,h=new WeakMap,f=new Set;let u;const d=new WeakMap;let x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,y){return x?new OffscreenCanvas(R,y):Vs("canvas")}function m(R,y,V){let q=1;const Q=ke(R);if((Q.width>V||Q.height>V)&&(q=V/Math.max(Q.width,Q.height)),q<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const le=Math.floor(q*Q.width),ue=Math.floor(q*Q.height);u===void 0&&(u=g(le,ue));const ee=y?g(le,ue):u;return ee.width=le,ee.height=ue,ee.getContext("2d").drawImage(R,0,0,le,ue),Be("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+le+"x"+ue+")."),ee}else return"data"in R&&Be("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),R;return R}function p(R){return R.generateMipmaps}function _(R){i.generateMipmap(R)}function S(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(R,y,V,q,Q,le=!1){if(R!==null){if(i[R]!==void 0)return i[R];Be("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let ue;q&&(ue=e.get("EXT_texture_norm16"),ue||Be("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ee=y;if(y===i.RED&&(V===i.FLOAT&&(ee=i.R32F),V===i.HALF_FLOAT&&(ee=i.R16F),V===i.UNSIGNED_BYTE&&(ee=i.R8),V===i.UNSIGNED_SHORT&&ue&&(ee=ue.R16_EXT),V===i.SHORT&&ue&&(ee=ue.R16_SNORM_EXT)),y===i.RED_INTEGER&&(V===i.UNSIGNED_BYTE&&(ee=i.R8UI),V===i.UNSIGNED_SHORT&&(ee=i.R16UI),V===i.UNSIGNED_INT&&(ee=i.R32UI),V===i.BYTE&&(ee=i.R8I),V===i.SHORT&&(ee=i.R16I),V===i.INT&&(ee=i.R32I)),y===i.RG&&(V===i.FLOAT&&(ee=i.RG32F),V===i.HALF_FLOAT&&(ee=i.RG16F),V===i.UNSIGNED_BYTE&&(ee=i.RG8),V===i.UNSIGNED_SHORT&&ue&&(ee=ue.RG16_EXT),V===i.SHORT&&ue&&(ee=ue.RG16_SNORM_EXT)),y===i.RG_INTEGER&&(V===i.UNSIGNED_BYTE&&(ee=i.RG8UI),V===i.UNSIGNED_SHORT&&(ee=i.RG16UI),V===i.UNSIGNED_INT&&(ee=i.RG32UI),V===i.BYTE&&(ee=i.RG8I),V===i.SHORT&&(ee=i.RG16I),V===i.INT&&(ee=i.RG32I)),y===i.RGB_INTEGER&&(V===i.UNSIGNED_BYTE&&(ee=i.RGB8UI),V===i.UNSIGNED_SHORT&&(ee=i.RGB16UI),V===i.UNSIGNED_INT&&(ee=i.RGB32UI),V===i.BYTE&&(ee=i.RGB8I),V===i.SHORT&&(ee=i.RGB16I),V===i.INT&&(ee=i.RGB32I)),y===i.RGBA_INTEGER&&(V===i.UNSIGNED_BYTE&&(ee=i.RGBA8UI),V===i.UNSIGNED_SHORT&&(ee=i.RGBA16UI),V===i.UNSIGNED_INT&&(ee=i.RGBA32UI),V===i.BYTE&&(ee=i.RGBA8I),V===i.SHORT&&(ee=i.RGBA16I),V===i.INT&&(ee=i.RGBA32I)),y===i.RGB&&(V===i.UNSIGNED_SHORT&&ue&&(ee=ue.RGB16_EXT),V===i.SHORT&&ue&&(ee=ue.RGB16_SNORM_EXT),V===i.UNSIGNED_INT_5_9_9_9_REV&&(ee=i.RGB9_E5),V===i.UNSIGNED_INT_10F_11F_11F_REV&&(ee=i.R11F_G11F_B10F)),y===i.RGBA){const ne=le?Gs:tt.getTransfer(Q);V===i.FLOAT&&(ee=i.RGBA32F),V===i.HALF_FLOAT&&(ee=i.RGBA16F),V===i.UNSIGNED_BYTE&&(ee=ne===mt?i.SRGB8_ALPHA8:i.RGBA8),V===i.UNSIGNED_SHORT&&ue&&(ee=ue.RGBA16_EXT),V===i.SHORT&&ue&&(ee=ue.RGBA16_SNORM_EXT),V===i.UNSIGNED_SHORT_4_4_4_4&&(ee=i.RGBA4),V===i.UNSIGNED_SHORT_5_5_5_1&&(ee=i.RGB5_A1)}return(ee===i.R16F||ee===i.R32F||ee===i.RG16F||ee===i.RG32F||ee===i.RGBA16F||ee===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function w(R,y){let V;return R?y===null||y===kn||y===Gr?V=i.DEPTH24_STENCIL8:y===Fn?V=i.DEPTH32F_STENCIL8:y===kr&&(V=i.DEPTH24_STENCIL8,Be("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===kn||y===Gr?V=i.DEPTH_COMPONENT24:y===Fn?V=i.DEPTH_COMPONENT32F:y===kr&&(V=i.DEPTH_COMPONENT16),V}function E(R,y){return p(R)===!0||R.isFramebufferTexture&&R.minFilter!==Dt&&R.minFilter!==Rt?Math.log2(Math.max(y.width,y.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?y.mipmaps.length:1}function L(R){const y=R.target;y.removeEventListener("dispose",L),C(y),y.isVideoTexture&&h.delete(y),y.isHTMLTexture&&f.delete(y)}function M(R){const y=R.target;y.removeEventListener("dispose",M),P(y)}function C(R){const y=n.get(R);if(y.__webglInit===void 0)return;const V=R.source,q=d.get(V);if(q){const Q=q[y.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&A(R),Object.keys(q).length===0&&d.delete(V)}n.remove(R)}function A(R){const y=n.get(R);i.deleteTexture(y.__webglTexture);const V=R.source,q=d.get(V);delete q[y.__cacheKey],a.memory.textures--}function P(R){const y=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(y.__webglFramebuffer[q]))for(let Q=0;Q<y.__webglFramebuffer[q].length;Q++)i.deleteFramebuffer(y.__webglFramebuffer[q][Q]);else i.deleteFramebuffer(y.__webglFramebuffer[q]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[q])}else{if(Array.isArray(y.__webglFramebuffer))for(let q=0;q<y.__webglFramebuffer.length;q++)i.deleteFramebuffer(y.__webglFramebuffer[q]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let q=0;q<y.__webglColorRenderbuffer.length;q++)y.__webglColorRenderbuffer[q]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[q]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const V=R.textures;for(let q=0,Q=V.length;q<Q;q++){const le=n.get(V[q]);le.__webglTexture&&(i.deleteTexture(le.__webglTexture),a.memory.textures--),n.remove(V[q])}n.remove(R)}let F=0;function U(){F=0}function D(){return F}function O(R){F=R}function k(){const R=F;return R>=r.maxTextures&&Be("WebGLTextures: Trying to use "+(R+1)+" texture units while this GPU supports only "+r.maxTextures),F+=1,R}function Y(R){const y=[];return y.push(R.wrapS),y.push(R.wrapT),y.push(R.wrapR||0),y.push(R.magFilter),y.push(R.minFilter),y.push(R.anisotropy),y.push(R.internalFormat),y.push(R.format),y.push(R.type),y.push(R.generateMipmaps),y.push(R.premultiplyAlpha),y.push(R.flipY),y.push(R.unpackAlignment),y.push(R.colorSpace),y.join()}function j(R,y){const V=n.get(R);if(R.isVideoTexture&&B(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&V.__version!==R.version){const q=R.image;if(q===null)Be("WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)Be("WebGLRenderer: Texture marked for update but image is incomplete");else{se(V,R,y);return}}else R.isExternalTexture&&(V.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,V.__webglTexture,i.TEXTURE0+y)}function X(R,y){const V=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&V.__version!==R.version){se(V,R,y);return}else R.isExternalTexture&&(V.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,V.__webglTexture,i.TEXTURE0+y)}function te(R,y){const V=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&V.__version!==R.version){se(V,R,y);return}t.bindTexture(i.TEXTURE_3D,V.__webglTexture,i.TEXTURE0+y)}function N(R,y){const V=n.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&V.__version!==R.version){ve(V,R,y);return}t.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture,i.TEXTURE0+y)}const re={[ho]:i.REPEAT,[$n]:i.CLAMP_TO_EDGE,[fo]:i.MIRRORED_REPEAT},oe={[Dt]:i.NEAREST,[vm]:i.NEAREST_MIPMAP_NEAREST,[Zr]:i.NEAREST_MIPMAP_LINEAR,[Rt]:i.LINEAR,[va]:i.LINEAR_MIPMAP_NEAREST,[Ai]:i.LINEAR_MIPMAP_LINEAR},Se={[ym]:i.NEVER,[Am]:i.ALWAYS,[bm]:i.LESS,[dl]:i.LEQUAL,[wm]:i.EQUAL,[pl]:i.GEQUAL,[Em]:i.GREATER,[Tm]:i.NOTEQUAL};function Ue(R,y){if(y.type===Fn&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===Rt||y.magFilter===va||y.magFilter===Zr||y.magFilter===Ai||y.minFilter===Rt||y.minFilter===va||y.minFilter===Zr||y.minFilter===Ai)&&Be("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,re[y.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,re[y.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,re[y.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,oe[y.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,oe[y.minFilter]),y.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,Se[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Dt||y.minFilter!==Zr&&y.minFilter!==Ai||y.type===Fn&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){const V=e.get("EXT_texture_filter_anisotropic");i.texParameterf(R,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,r.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function Ge(R,y){let V=!1;R.__webglInit===void 0&&(R.__webglInit=!0,y.addEventListener("dispose",L));const q=y.source;let Q=d.get(q);Q===void 0&&(Q={},d.set(q,Q));const le=Y(y);if(le!==R.__cacheKey){Q[le]===void 0&&(Q[le]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,V=!0),Q[le].usedTimes++;const ue=Q[R.__cacheKey];ue!==void 0&&(Q[R.__cacheKey].usedTimes--,ue.usedTimes===0&&A(y)),R.__cacheKey=le,R.__webglTexture=Q[le].texture}return V}function I(R,y,V){return Math.floor(Math.floor(R/V)/y)}function K(R,y,V,q){const le=R.updateRanges;if(le.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,y.width,y.height,V,q,y.data);else{le.sort((Pe,me)=>Pe.start-me.start);let ue=0;for(let Pe=1;Pe<le.length;Pe++){const me=le[ue],fe=le[Pe],De=me.start+me.count,Oe=I(fe.start,y.width,4),Ye=I(me.start,y.width,4);fe.start<=De+1&&Oe===Ye&&I(fe.start+fe.count-1,y.width,4)===Oe?me.count=Math.max(me.count,fe.start+fe.count-me.start):(++ue,le[ue]=fe)}le.length=ue+1;const ee=t.getParameter(i.UNPACK_ROW_LENGTH),ne=t.getParameter(i.UNPACK_SKIP_PIXELS),he=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,y.width);for(let Pe=0,me=le.length;Pe<me;Pe++){const fe=le[Pe],De=Math.floor(fe.start/4),Oe=Math.ceil(fe.count/4),Ye=De%y.width,H=Math.floor(De/y.width),de=Oe,ie=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Ye),t.pixelStorei(i.UNPACK_SKIP_ROWS,H),t.texSubImage2D(i.TEXTURE_2D,0,Ye,H,de,ie,V,q,y.data)}R.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,ee),t.pixelStorei(i.UNPACK_SKIP_PIXELS,ne),t.pixelStorei(i.UNPACK_SKIP_ROWS,he)}}function se(R,y,V){let q=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(q=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(q=i.TEXTURE_3D);const Q=Ge(R,y),le=y.source;t.bindTexture(q,R.__webglTexture,i.TEXTURE0+V);const ue=n.get(le);if(le.version!==ue.__version||Q===!0){if(t.activeTexture(i.TEXTURE0+V),(typeof ImageBitmap<"u"&&y.image instanceof ImageBitmap)===!1){const ie=tt.getPrimaries(tt.workingColorSpace),pe=y.colorSpace===An?null:tt.getPrimaries(y.colorSpace),Me=y.colorSpace===An||ie===pe?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me)}t.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment);let ne=m(y.image,!1,r.maxTextureSize);ne=pt(y,ne);const he=s.convert(y.format,y.colorSpace),Pe=s.convert(y.type);let me=b(y.internalFormat,he,Pe,y.normalized,y.colorSpace,y.isVideoTexture);Ue(q,y);let fe;const De=y.mipmaps,Oe=y.isVideoTexture!==!0,Ye=ue.__version===void 0||Q===!0,H=le.dataReady,de=E(y,ne);if(y.isDepthTexture)me=w(y.format===Ci,y.type),Ye&&(Oe?t.texStorage2D(i.TEXTURE_2D,1,me,ne.width,ne.height):t.texImage2D(i.TEXTURE_2D,0,me,ne.width,ne.height,0,he,Pe,null));else if(y.isDataTexture)if(De.length>0){Oe&&Ye&&t.texStorage2D(i.TEXTURE_2D,de,me,De[0].width,De[0].height);for(let ie=0,pe=De.length;ie<pe;ie++)fe=De[ie],Oe?H&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,fe.width,fe.height,he,Pe,fe.data):t.texImage2D(i.TEXTURE_2D,ie,me,fe.width,fe.height,0,he,Pe,fe.data);y.generateMipmaps=!1}else Oe?(Ye&&t.texStorage2D(i.TEXTURE_2D,de,me,ne.width,ne.height),H&&K(y,ne,he,Pe)):t.texImage2D(i.TEXTURE_2D,0,me,ne.width,ne.height,0,he,Pe,ne.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Oe&&Ye&&t.texStorage3D(i.TEXTURE_2D_ARRAY,de,me,De[0].width,De[0].height,ne.depth);for(let ie=0,pe=De.length;ie<pe;ie++)if(fe=De[ie],y.format!==ln)if(he!==null)if(Oe){if(H)if(y.layerUpdates.size>0){const Me=Mc(fe.width,fe.height,y.format,y.type);for(const ae of y.layerUpdates){const Ie=fe.data.subarray(ae*Me/fe.data.BYTES_PER_ELEMENT,(ae+1)*Me/fe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,ae,fe.width,fe.height,1,he,Ie)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,0,fe.width,fe.height,ne.depth,he,fe.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ie,me,fe.width,fe.height,ne.depth,0,fe.data,0,0);else Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Oe?H&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,0,fe.width,fe.height,ne.depth,he,Pe,fe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ie,me,fe.width,fe.height,ne.depth,0,he,Pe,fe.data);y.layerUpdates.size>0&&y.clearLayerUpdates()}else{Oe&&Ye&&t.texStorage2D(i.TEXTURE_2D,de,me,De[0].width,De[0].height);for(let ie=0,pe=De.length;ie<pe;ie++)fe=De[ie],y.format!==ln?he!==null?Oe?H&&t.compressedTexSubImage2D(i.TEXTURE_2D,ie,0,0,fe.width,fe.height,he,fe.data):t.compressedTexImage2D(i.TEXTURE_2D,ie,me,fe.width,fe.height,0,fe.data):Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Oe?H&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,fe.width,fe.height,he,Pe,fe.data):t.texImage2D(i.TEXTURE_2D,ie,me,fe.width,fe.height,0,he,Pe,fe.data)}else if(y.isDataArrayTexture)if(Oe){if(Ye&&t.texStorage3D(i.TEXTURE_2D_ARRAY,de,me,ne.width,ne.height,ne.depth),H)if(y.layerUpdates.size>0){const ie=Mc(ne.width,ne.height,y.format,y.type);for(const pe of y.layerUpdates){const Me=ne.data.subarray(pe*ie/ne.data.BYTES_PER_ELEMENT,(pe+1)*ie/ne.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,pe,ne.width,ne.height,1,he,Pe,Me)}y.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,he,Pe,ne.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,me,ne.width,ne.height,ne.depth,0,he,Pe,ne.data);else if(y.isData3DTexture)Oe?(Ye&&t.texStorage3D(i.TEXTURE_3D,de,me,ne.width,ne.height,ne.depth),H&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,he,Pe,ne.data)):t.texImage3D(i.TEXTURE_3D,0,me,ne.width,ne.height,ne.depth,0,he,Pe,ne.data);else if(y.isFramebufferTexture){if(Ye)if(Oe)t.texStorage2D(i.TEXTURE_2D,de,me,ne.width,ne.height);else{let ie=ne.width,pe=ne.height;for(let Me=0;Me<de;Me++)t.texImage2D(i.TEXTURE_2D,Me,me,ie,pe,0,he,Pe,null),ie>>=1,pe>>=1}}else if(y.isHTMLTexture){if("texElementImage2D"in i){const ie=i.canvas;if(ie.hasAttribute("layoutsubtree")||ie.setAttribute("layoutsubtree","true"),ne.parentNode!==ie){ie.appendChild(ne),f.add(y),ie.onpaint=pe=>{const Me=pe.changedElements;for(const ae of f)Me.includes(ae.image)&&(ae.needsUpdate=!0)},ie.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ne);else{const Me=i.RGBA,ae=i.RGBA,Ie=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Me,ae,Ie,ne)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(De.length>0){if(Oe&&Ye){const ie=ke(De[0]);t.texStorage2D(i.TEXTURE_2D,de,me,ie.width,ie.height)}for(let ie=0,pe=De.length;ie<pe;ie++)fe=De[ie],Oe?H&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,he,Pe,fe):t.texImage2D(i.TEXTURE_2D,ie,me,he,Pe,fe);y.generateMipmaps=!1}else if(Oe){if(Ye){const ie=ke(ne);t.texStorage2D(i.TEXTURE_2D,de,me,ie.width,ie.height)}H&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,he,Pe,ne)}else t.texImage2D(i.TEXTURE_2D,0,me,he,Pe,ne);p(y)&&_(q),ue.__version=le.version,y.onUpdate&&y.onUpdate(y)}R.__version=y.version}function ve(R,y,V){if(y.image.length!==6)return;const q=Ge(R,y),Q=y.source;t.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+V);const le=n.get(Q);if(Q.version!==le.__version||q===!0){t.activeTexture(i.TEXTURE0+V);const ue=tt.getPrimaries(tt.workingColorSpace),ee=y.colorSpace===An?null:tt.getPrimaries(y.colorSpace),ne=y.colorSpace===An||ue===ee?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ne);const he=y.isCompressedTexture||y.image[0].isCompressedTexture,Pe=y.image[0]&&y.image[0].isDataTexture,me=[];for(let ae=0;ae<6;ae++)!he&&!Pe?me[ae]=m(y.image[ae],!0,r.maxCubemapSize):me[ae]=Pe?y.image[ae].image:y.image[ae],me[ae]=pt(y,me[ae]);const fe=me[0],De=s.convert(y.format,y.colorSpace),Oe=s.convert(y.type),Ye=b(y.internalFormat,De,Oe,y.normalized,y.colorSpace),H=y.isVideoTexture!==!0,de=le.__version===void 0||q===!0,ie=Q.dataReady;let pe=E(y,fe);Ue(i.TEXTURE_CUBE_MAP,y);let Me;if(he){H&&de&&t.texStorage2D(i.TEXTURE_CUBE_MAP,pe,Ye,fe.width,fe.height);for(let ae=0;ae<6;ae++){Me=me[ae].mipmaps;for(let Ie=0;Ie<Me.length;Ie++){const Re=Me[Ie];y.format!==ln?De!==null?H?ie&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ie,0,0,Re.width,Re.height,De,Re.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ie,Ye,Re.width,Re.height,0,Re.data):Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):H?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ie,0,0,Re.width,Re.height,De,Oe,Re.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ie,Ye,Re.width,Re.height,0,De,Oe,Re.data)}}}else{if(Me=y.mipmaps,H&&de){Me.length>0&&pe++;const ae=ke(me[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,pe,Ye,ae.width,ae.height)}for(let ae=0;ae<6;ae++)if(Pe){H?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,me[ae].width,me[ae].height,De,Oe,me[ae].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Ye,me[ae].width,me[ae].height,0,De,Oe,me[ae].data);for(let Ie=0;Ie<Me.length;Ie++){const St=Me[Ie].image[ae].image;H?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ie+1,0,0,St.width,St.height,De,Oe,St.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ie+1,Ye,St.width,St.height,0,De,Oe,St.data)}}else{H?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,De,Oe,me[ae]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Ye,De,Oe,me[ae]);for(let Ie=0;Ie<Me.length;Ie++){const Re=Me[Ie];H?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ie+1,0,0,De,Oe,Re.image[ae]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ie+1,Ye,De,Oe,Re.image[ae])}}}p(y)&&_(i.TEXTURE_CUBE_MAP),le.__version=Q.version,y.onUpdate&&y.onUpdate(y)}R.__version=y.version}function ce(R,y,V,q,Q,le){const ue=s.convert(V.format,V.colorSpace),ee=s.convert(V.type),ne=b(V.internalFormat,ue,ee,V.normalized,V.colorSpace),he=n.get(y),Pe=n.get(V);if(Pe.__renderTarget=y,!he.__hasExternalTextures){const me=Math.max(1,y.width>>le),fe=Math.max(1,y.height>>le);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?t.texImage3D(Q,le,ne,me,fe,y.depth,0,ue,ee,null):t.texImage2D(Q,le,ne,me,fe,0,ue,ee,null)}t.bindFramebuffer(i.FRAMEBUFFER,R),Ve(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,Q,Pe.__webglTexture,0,Mt(y)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,q,Q,Pe.__webglTexture,le),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Te(R,y,V){if(i.bindRenderbuffer(i.RENDERBUFFER,R),y.depthBuffer){const q=y.depthTexture,Q=q&&q.isDepthTexture?q.type:null,le=w(y.stencilBuffer,Q),ue=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Ve(y)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Mt(y),le,y.width,y.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,Mt(y),le,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,le,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ue,i.RENDERBUFFER,R)}else{const q=y.textures;for(let Q=0;Q<q.length;Q++){const le=q[Q],ue=s.convert(le.format,le.colorSpace),ee=s.convert(le.type),ne=b(le.internalFormat,ue,ee,le.normalized,le.colorSpace);Ve(y)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Mt(y),ne,y.width,y.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,Mt(y),ne,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,ne,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ze(R,y,V){const q=y.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,R),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Q=n.get(y.depthTexture);if(Q.__renderTarget=y,(!Q.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),q){if(Q.__webglInit===void 0&&(Q.__webglInit=!0,y.depthTexture.addEventListener("dispose",L)),Q.__webglTexture===void 0){Q.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture),Ue(i.TEXTURE_CUBE_MAP,y.depthTexture);const he=s.convert(y.depthTexture.format),Pe=s.convert(y.depthTexture.type);let me;y.depthTexture.format===Qn?me=i.DEPTH_COMPONENT24:y.depthTexture.format===Ci&&(me=i.DEPTH24_STENCIL8);for(let fe=0;fe<6;fe++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,me,y.width,y.height,0,he,Pe,null)}}else j(y.depthTexture,0);const le=Q.__webglTexture,ue=Mt(y),ee=q?i.TEXTURE_CUBE_MAP_POSITIVE_X+V:i.TEXTURE_2D,ne=y.depthTexture.format===Ci?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(y.depthTexture.format===Qn)Ve(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ne,ee,le,0,ue):i.framebufferTexture2D(i.FRAMEBUFFER,ne,ee,le,0);else if(y.depthTexture.format===Ci)Ve(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ne,ee,le,0,ue):i.framebufferTexture2D(i.FRAMEBUFFER,ne,ee,le,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ne(R){const y=n.get(R),V=R.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==R.depthTexture){const q=R.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),q){const Q=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,q.removeEventListener("dispose",Q)};q.addEventListener("dispose",Q),y.__depthDisposeCallback=Q}y.__boundDepthTexture=q}if(R.depthTexture&&!y.__autoAllocateDepthBuffer)if(V)for(let q=0;q<6;q++)ze(y.__webglFramebuffer[q],R,q);else{const q=R.texture.mipmaps;q&&q.length>0?ze(y.__webglFramebuffer[0],R,0):ze(y.__webglFramebuffer,R,0)}else if(V){y.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[q]),y.__webglDepthbuffer[q]===void 0)y.__webglDepthbuffer[q]=i.createRenderbuffer(),Te(y.__webglDepthbuffer[q],R,!1);else{const Q=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,le=y.__webglDepthbuffer[q];i.bindRenderbuffer(i.RENDERBUFFER,le),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,le)}}else{const q=R.texture.mipmaps;if(q&&q.length>0?t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),Te(y.__webglDepthbuffer,R,!1);else{const Q=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,le=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,le),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,le)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Je(R,y,V){const q=n.get(R);y!==void 0&&ce(q.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),V!==void 0&&Ne(R)}function dt(R){const y=R.texture,V=n.get(R),q=n.get(y);R.addEventListener("dispose",M);const Q=R.textures,le=R.isWebGLCubeRenderTarget===!0,ue=Q.length>1;if(ue||(q.__webglTexture===void 0&&(q.__webglTexture=i.createTexture()),q.__version=y.version,a.memory.textures++),le){V.__webglFramebuffer=[];for(let ee=0;ee<6;ee++)if(y.mipmaps&&y.mipmaps.length>0){V.__webglFramebuffer[ee]=[];for(let ne=0;ne<y.mipmaps.length;ne++)V.__webglFramebuffer[ee][ne]=i.createFramebuffer()}else V.__webglFramebuffer[ee]=i.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){V.__webglFramebuffer=[];for(let ee=0;ee<y.mipmaps.length;ee++)V.__webglFramebuffer[ee]=i.createFramebuffer()}else V.__webglFramebuffer=i.createFramebuffer();if(ue)for(let ee=0,ne=Q.length;ee<ne;ee++){const he=n.get(Q[ee]);he.__webglTexture===void 0&&(he.__webglTexture=i.createTexture(),a.memory.textures++)}if(R.samples>0&&Ve(R)===!1){V.__webglMultisampledFramebuffer=i.createFramebuffer(),V.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let ee=0;ee<Q.length;ee++){const ne=Q[ee];V.__webglColorRenderbuffer[ee]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,V.__webglColorRenderbuffer[ee]);const he=s.convert(ne.format,ne.colorSpace),Pe=s.convert(ne.type),me=b(ne.internalFormat,he,Pe,ne.normalized,ne.colorSpace,R.isXRRenderTarget===!0),fe=Mt(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,fe,me,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ee,i.RENDERBUFFER,V.__webglColorRenderbuffer[ee])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(V.__webglDepthRenderbuffer=i.createRenderbuffer(),Te(V.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(le){t.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),Ue(i.TEXTURE_CUBE_MAP,y);for(let ee=0;ee<6;ee++)if(y.mipmaps&&y.mipmaps.length>0)for(let ne=0;ne<y.mipmaps.length;ne++)ce(V.__webglFramebuffer[ee][ne],R,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ne);else ce(V.__webglFramebuffer[ee],R,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0);p(y)&&_(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ue){for(let ee=0,ne=Q.length;ee<ne;ee++){const he=Q[ee],Pe=n.get(he);let me=i.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(me=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(me,Pe.__webglTexture),Ue(me,he),ce(V.__webglFramebuffer,R,he,i.COLOR_ATTACHMENT0+ee,me,0),p(he)&&_(me)}t.unbindTexture()}else{let ee=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ee=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ee,q.__webglTexture),Ue(ee,y),y.mipmaps&&y.mipmaps.length>0)for(let ne=0;ne<y.mipmaps.length;ne++)ce(V.__webglFramebuffer[ne],R,y,i.COLOR_ATTACHMENT0,ee,ne);else ce(V.__webglFramebuffer,R,y,i.COLOR_ATTACHMENT0,ee,0);p(y)&&_(ee),t.unbindTexture()}R.depthBuffer&&Ne(R)}function Ke(R){const y=R.textures;for(let V=0,q=y.length;V<q;V++){const Q=y[V];if(p(Q)){const le=S(R),ue=n.get(Q).__webglTexture;t.bindTexture(le,ue),_(le),t.unbindTexture()}}}const gt=[],Ct=[];function It(R){if(R.samples>0){if(Ve(R)===!1){const y=R.textures,V=R.width,q=R.height;let Q=i.COLOR_BUFFER_BIT;const le=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ue=n.get(R),ee=y.length>1;if(ee)for(let he=0;he<y.length;he++)t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ue.__webglMultisampledFramebuffer);const ne=R.texture.mipmaps;ne&&ne.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ue.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ue.__webglFramebuffer);for(let he=0;he<y.length;he++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),ee){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ue.__webglColorRenderbuffer[he]);const Pe=n.get(y[he]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Pe,0)}i.blitFramebuffer(0,0,V,q,0,0,V,q,Q,i.NEAREST),c===!0&&(gt.length=0,Ct.length=0,gt.push(i.COLOR_ATTACHMENT0+he),R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&(gt.push(le),Ct.push(le),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ct)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,gt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ee)for(let he=0;he<y.length;he++){t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.RENDERBUFFER,ue.__webglColorRenderbuffer[he]);const Pe=n.get(y[he]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.TEXTURE_2D,Pe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ue.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&c){const y=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function Mt(R){return Math.min(r.maxSamples,R.samples)}function Ve(R){const y=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function B(R){const y=a.render.frame;h.get(R)!==y&&(h.set(R,y),R.update())}function pt(R,y){const V=R.colorSpace,q=R.format,Q=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||V!==Hr&&V!==An&&(tt.getTransfer(V)===mt?(q!==ln||Q!==on)&&Be("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):rt("WebGLTextures: Unsupported texture color space:",V)),y}function ke(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(l.width=R.naturalWidth||R.width,l.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(l.width=R.displayWidth,l.height=R.displayHeight):(l.width=R.width,l.height=R.height),l}this.allocateTextureUnit=k,this.resetTextureUnits=U,this.getTextureUnits=D,this.setTextureUnits=O,this.setTexture2D=j,this.setTexture2DArray=X,this.setTexture3D=te,this.setTextureCube=N,this.rebindTextures=Je,this.setupRenderTarget=dt,this.updateRenderTargetMipmap=Ke,this.updateMultisampleRenderTarget=It,this.setupDepthRenderbuffer=Ne,this.setupFrameBufferTexture=ce,this.useMultisampledRTT=Ve,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function n_(i,e){function t(n,r=An){let s;const a=tt.getTransfer(r);if(n===on)return i.UNSIGNED_BYTE;if(n===ll)return i.UNSIGNED_SHORT_4_4_4_4;if(n===cl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Lu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Pu)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Cu)return i.BYTE;if(n===Ru)return i.SHORT;if(n===kr)return i.UNSIGNED_SHORT;if(n===ol)return i.INT;if(n===kn)return i.UNSIGNED_INT;if(n===Fn)return i.FLOAT;if(n===Gn)return i.HALF_FLOAT;if(n===Du)return i.ALPHA;if(n===Iu)return i.RGB;if(n===ln)return i.RGBA;if(n===Qn)return i.DEPTH_COMPONENT;if(n===Ci)return i.DEPTH_STENCIL;if(n===Uu)return i.RED;if(n===ul)return i.RED_INTEGER;if(n===Ui)return i.RG;if(n===hl)return i.RG_INTEGER;if(n===fl)return i.RGBA_INTEGER;if(n===Ls||n===Ps||n===Ds||n===Is)if(a===mt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Ls)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ps)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ds)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Is)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Ls)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ps)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ds)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Is)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===po||n===mo||n===go||n===xo)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===po)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===mo)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===go)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===xo)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===vo||n===_o||n===Mo||n===So||n===yo||n===zs||n===bo)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===vo||n===_o)return a===mt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Mo)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===So)return s.COMPRESSED_R11_EAC;if(n===yo)return s.COMPRESSED_SIGNED_R11_EAC;if(n===zs)return s.COMPRESSED_RG11_EAC;if(n===bo)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===wo||n===Eo||n===To||n===Ao||n===Co||n===Ro||n===Lo||n===Po||n===Do||n===Io||n===Uo||n===No||n===Fo||n===Oo)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===wo)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Eo)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===To)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ao)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Co)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ro)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Lo)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Po)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Do)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Io)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Uo)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===No)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Fo)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Oo)return a===mt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Bo||n===zo||n===ko)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Bo)return a===mt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===zo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ko)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Go||n===Ho||n===ks||n===Vo)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Go)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Ho)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ks)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Vo)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Gr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const i_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,r_=`
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

}`;class s_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Wu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Tt({vertexShader:i_,fragmentShader:r_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Vt(new dn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class a_ extends Fi{constructor(e,t){super();const n=this;let r=null,s=1,a=null,o="local-floor",c=1,l=null,h=null,f=null,u=null,d=null,x=null;const g=typeof XRWebGLBinding<"u",m=new s_,p={},_=t.getContextAttributes();let S=null,b=null;const w=[],E=[],L=new He;let M=null,C=null;const A=new an;A.viewport=new ot;const P=new an;P.viewport=new ot;const F=[A,P],U=new p0;let D=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(I){let K=w[I];return K===void 0&&(K=new Aa,w[I]=K),K.getTargetRaySpace()},this.getControllerGrip=function(I){let K=w[I];return K===void 0&&(K=new Aa,w[I]=K),K.getGripSpace()},this.getHand=function(I){let K=w[I];return K===void 0&&(K=new Aa,w[I]=K),K.getHandSpace()};function k(I){const K=E.indexOf(I.inputSource);if(K===-1)return;const se=w[K];se!==void 0&&(se.update(I.inputSource,I.frame,l||a),se.dispatchEvent({type:I.type,data:I.inputSource}))}function Y(){r.removeEventListener("select",k),r.removeEventListener("selectstart",k),r.removeEventListener("selectend",k),r.removeEventListener("squeeze",k),r.removeEventListener("squeezestart",k),r.removeEventListener("squeezeend",k),r.removeEventListener("end",Y),r.removeEventListener("inputsourceschange",j);for(let I=0;I<w.length;I++){const K=E[I];K!==null&&(E[I]=null,w[I].disconnect(K))}D=null,O=null,m.reset();for(const I in p)delete p[I];if(e.setRenderTarget(S),d=null,u=null,f=null,r=null,b=null,Ge.stop(),n.isPresenting=!1,e.setPixelRatio(M),e.setSize(L.width,L.height,!1),C!==null){const I=C.camera;I.fov=C.fov,I.zoom=C.zoom,I.updateProjectionMatrix(),C=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(I){s=I,n.isPresenting===!0&&Be("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(I){o=I,n.isPresenting===!0&&Be("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(I){l=I},this.getBaseLayer=function(){return u!==null?u:d},this.getBinding=function(){return f===null&&g&&(f=new XRWebGLBinding(r,t)),f},this.getFrame=function(){return x},this.getSession=function(){return r},this.setSession=async function(I){if(r=I,r!==null){if(S=e.getRenderTarget(),r.addEventListener("select",k),r.addEventListener("selectstart",k),r.addEventListener("selectend",k),r.addEventListener("squeeze",k),r.addEventListener("squeezestart",k),r.addEventListener("squeezeend",k),r.addEventListener("end",Y),r.addEventListener("inputsourceschange",j),_.xrCompatible!==!0&&await t.makeXRCompatible(),M=e.getPixelRatio(),e.getSize(L),g&&"createProjectionLayer"in XRWebGLBinding.prototype){let se=null,ve=null,ce=null;_.depth&&(ce=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,se=_.stencil?Ci:Qn,ve=_.stencil?Gr:kn);const Te={colorFormat:t.RGBA8,depthFormat:ce,scaleFactor:s};f=this.getBinding(),u=f.createProjectionLayer(Te),r.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),b=new Mn(u.textureWidth,u.textureHeight,{format:ln,type:on,depthTexture:new mr(u.textureWidth,u.textureHeight,ve,void 0,void 0,void 0,void 0,void 0,void 0,se),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{const se={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,t,se),r.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),b=new Mn(d.framebufferWidth,d.framebufferHeight,{format:ln,type:on,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),Ge.setContext(r),Ge.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function j(I){for(let K=0;K<I.removed.length;K++){const se=I.removed[K],ve=E.indexOf(se);ve>=0&&(E[ve]=null,w[ve].disconnect(se))}for(let K=0;K<I.added.length;K++){const se=I.added[K];let ve=E.indexOf(se);if(ve===-1){for(let Te=0;Te<w.length;Te++)if(Te>=E.length){E.push(se),ve=Te;break}else if(E[Te]===null){E[Te]=se,ve=Te;break}if(ve===-1)break}const ce=w[ve];ce&&ce.connect(se)}}const X=new W,te=new W;function N(I,K,se){X.setFromMatrixPosition(K.matrixWorld),te.setFromMatrixPosition(se.matrixWorld);const ve=X.distanceTo(te),ce=K.projectionMatrix.elements,Te=se.projectionMatrix.elements,ze=ce[14]/(ce[10]-1),Ne=ce[14]/(ce[10]+1),Je=(ce[9]+1)/ce[5],dt=(ce[9]-1)/ce[5],Ke=(ce[8]-1)/ce[0],gt=(Te[8]+1)/Te[0],Ct=ze*Ke,It=ze*gt,Mt=ve/(-Ke+gt),Ve=Mt*-Ke;if(K.matrixWorld.decompose(I.position,I.quaternion,I.scale),I.translateX(Ve),I.translateZ(Mt),I.matrixWorld.compose(I.position,I.quaternion,I.scale),I.matrixWorldInverse.copy(I.matrixWorld).invert(),ce[10]===-1)I.projectionMatrix.copy(K.projectionMatrix),I.projectionMatrixInverse.copy(K.projectionMatrixInverse);else{const B=ze+Mt,pt=Ne+Mt,ke=Ct-Ve,R=It+(ve-Ve),y=Je*Ne/pt*B,V=dt*Ne/pt*B;I.projectionMatrix.makePerspective(ke,R,y,V,B,pt),I.projectionMatrixInverse.copy(I.projectionMatrix).invert()}}function re(I,K){K===null?I.matrixWorld.copy(I.matrix):I.matrixWorld.multiplyMatrices(K.matrixWorld,I.matrix),I.matrixWorldInverse.copy(I.matrixWorld).invert()}this.updateCamera=function(I){if(r===null)return;let K=I.near,se=I.far;m.texture!==null&&(m.depthNear>0&&(K=m.depthNear),m.depthFar>0&&(se=m.depthFar)),U.near=P.near=A.near=K,U.far=P.far=A.far=se,(D!==U.near||O!==U.far)&&(r.updateRenderState({depthNear:U.near,depthFar:U.far}),D=U.near,O=U.far),U.layers.mask=I.layers.mask|6,A.layers.mask=U.layers.mask&-5,P.layers.mask=U.layers.mask&-3;const ve=I.parent,ce=U.cameras;re(U,ve);for(let Te=0;Te<ce.length;Te++)re(ce[Te],ve);ce.length===2?N(U,A,P):U.projectionMatrix.copy(A.projectionMatrix),C===null&&I.isPerspectiveCamera&&(C={camera:I,fov:I.fov,zoom:I.zoom}),oe(I,U,ve)};function oe(I,K,se){se===null?I.matrix.copy(K.matrixWorld):(I.matrix.copy(se.matrixWorld),I.matrix.invert(),I.matrix.multiply(K.matrixWorld)),I.matrix.decompose(I.position,I.quaternion,I.scale),I.updateMatrixWorld(!0),I.projectionMatrix.copy(K.projectionMatrix),I.projectionMatrixInverse.copy(K.projectionMatrixInverse),I.isPerspectiveCamera&&(I.fov=Wo*2*Math.atan(1/I.projectionMatrix.elements[5]),I.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(u===null&&d===null))return c},this.setFoveation=function(I){c=I,u!==null&&(u.fixedFoveation=I),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=I)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(U)},this.getCameraTexture=function(I){return p[I]};let Se=null;function Ue(I,K){if(h=K.getViewerPose(l||a),x=K,h!==null){const se=h.views;d!==null&&(e.setRenderTargetFramebuffer(b,d.framebuffer),e.setRenderTarget(b));let ve=!1;se.length!==U.cameras.length&&(U.cameras.length=0,ve=!0);for(let Ne=0;Ne<se.length;Ne++){const Je=se[Ne];let dt=null;if(d!==null)dt=d.getViewport(Je);else{const gt=f.getViewSubImage(u,Je);dt=gt.viewport,Ne===0&&(e.setRenderTargetTextures(b,gt.colorTexture,gt.depthStencilTexture),e.setRenderTarget(b))}let Ke=F[Ne];Ke===void 0&&(Ke=new an,Ke.layers.enable(Ne),Ke.viewport=new ot,F[Ne]=Ke),Ke.matrix.fromArray(Je.transform.matrix),Ke.matrix.decompose(Ke.position,Ke.quaternion,Ke.scale),Ke.projectionMatrix.fromArray(Je.projectionMatrix),Ke.projectionMatrixInverse.copy(Ke.projectionMatrix).invert(),Ke.viewport.set(dt.x,dt.y,dt.width,dt.height),Ne===0&&(U.matrix.copy(Ke.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),ve===!0&&U.cameras.push(Ke)}const ce=r.enabledFeatures;if(ce&&ce.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&g){f=n.getBinding();const Ne=f.getDepthInformation(se[0]);Ne&&Ne.isValid&&Ne.texture&&m.init(Ne,r.renderState)}if(ce&&ce.includes("camera-access")&&g){e.state.unbindTexture(),f=n.getBinding();for(let Ne=0;Ne<se.length;Ne++){const Je=se[Ne].camera;if(Je){let dt=p[Je];dt||(dt=new Wu,p[Je]=dt);const Ke=f.getCameraImage(Je);dt.sourceTexture=Ke}}}}for(let se=0;se<w.length;se++){const ve=E[se],ce=w[se];ve!==null&&ce!==void 0&&ce.update(ve,K,l||a)}Se&&Se(I,K),K.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:K}),x=null}const Ge=new Ku;Ge.setAnimationLoop(Ue),this.setAnimationLoop=function(I){Se=I},this.dispose=function(){}}}const o_=new At,th=new We;th.set(-1,0,0,0,1,0,0,0,1);function l_(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Xu(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,_,S,b){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?s(m,p):p.isMeshLambertMaterial?(s(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(s(m,p),f(m,p)):p.isMeshPhongMaterial?(s(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(s(m,p),u(m,p),p.isMeshPhysicalMaterial&&d(m,p,b)):p.isMeshMatcapMaterial?(s(m,p),x(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),g(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,_,S):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===tn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===tn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const _=e.get(p),S=_.envMap,b=_.envMapRotation;S&&(m.envMap.value=S,m.envMapRotation.value.setFromMatrix4(o_.makeRotationFromEuler(b)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(th),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,_,S){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*_,m.scale.value=S*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function f(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,_){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===tn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.retroreflectivity>0&&(m.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=_.texture,m.transmissionSamplerSize.value.set(_.width,_.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function x(m,p){p.matcap&&(m.matcap.value=p.matcap)}function g(m,p){const _=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(_.matrixWorld),m.nearDistance.value=_.shadow.camera.near,m.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function c_(i,e,t,n){let r={},s={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(b,w){const E=w.program;n.uniformBlockBinding(b,E)}function l(b,w){let E=r[b.id];E===void 0&&(m(b),E=h(b),r[b.id]=E,b.addEventListener("dispose",_));const L=w.program;n.updateUBOMapping(b,L);const M=e.render.frame;s[b.id]!==M&&(u(b),s[b.id]=M)}function h(b){const w=f();b.__bindingPointIndex=w;const E=i.createBuffer(),L=b.__size,M=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,L,M),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,w,E),E}function f(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return rt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(b){const w=r[b.id],E=b.uniforms,L=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let M=0,C=E.length;M<C;M++){const A=E[M];if(Array.isArray(A))for(let P=0,F=A.length;P<F;P++)d(A[P],M,P,L);else d(A,M,0,L)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(b,w,E,L){if(g(b,w,E,L)===!0){const M=b.__offset,C=b.value;if(Array.isArray(C)){let A=0;for(let P=0;P<C.length;P++){const F=C[P],U=p(F);x(F,b.__data,A),typeof F!="number"&&typeof F!="boolean"&&!F.isMatrix3&&!ArrayBuffer.isView(F)&&(A+=U.storage/Float32Array.BYTES_PER_ELEMENT)}}else x(C,b.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,M,b.__data)}}function x(b,w,E){typeof b=="number"||typeof b=="boolean"?w[0]=b:b.isMatrix3?(w[0]=b.elements[0],w[1]=b.elements[1],w[2]=b.elements[2],w[3]=0,w[4]=b.elements[3],w[5]=b.elements[4],w[6]=b.elements[5],w[7]=0,w[8]=b.elements[6],w[9]=b.elements[7],w[10]=b.elements[8],w[11]=0):ArrayBuffer.isView(b)?w.set(new b.constructor(b.buffer,b.byteOffset,w.length)):b.toArray(w,E)}function g(b,w,E,L){const M=b.value,C=w+"_"+E;if(L[C]===void 0)return typeof M=="number"||typeof M=="boolean"?L[C]=M:ArrayBuffer.isView(M)?L[C]=M.slice():L[C]=M.clone(),!0;{const A=L[C];if(typeof M=="number"||typeof M=="boolean"){if(A!==M)return L[C]=M,!0}else{if(ArrayBuffer.isView(M))return!0;if(A.equals(M)===!1)return A.copy(M),!0}}return!1}function m(b){const w=b.uniforms;let E=0;const L=16;for(let C=0,A=w.length;C<A;C++){const P=Array.isArray(w[C])?w[C]:[w[C]];for(let F=0,U=P.length;F<U;F++){const D=P[F],O=Array.isArray(D.value)?D.value:[D.value];for(let k=0,Y=O.length;k<Y;k++){const j=O[k],X=p(j),te=E%L,N=te%X.boundary,re=te+N;E+=N,re!==0&&L-re<X.storage&&(E+=L-re),D.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=E,E+=X.storage}}}const M=E%L;return M>0&&(E+=L-M),b.__size=E,b.__cache={},this}function p(b){const w={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(w.boundary=4,w.storage=4):b.isVector2?(w.boundary=8,w.storage=8):b.isVector3||b.isColor?(w.boundary=16,w.storage=12):b.isVector4?(w.boundary=16,w.storage=16):b.isMatrix3?(w.boundary=48,w.storage=48):b.isMatrix4?(w.boundary=64,w.storage=64):b.isTexture?Be("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(b)?(w.boundary=16,w.storage=b.byteLength):Be("WebGLRenderer: Unsupported uniform value type.",b),w}function _(b){const w=b.target;w.removeEventListener("dispose",_);const E=a.indexOf(w.__bindingPointIndex);a.splice(E,1),i.deleteBuffer(r[w.id]),delete r[w.id],delete s[w.id]}function S(){for(const b in r)i.deleteBuffer(r[b]);a=[],r={},s={}}return{bind:c,update:l,dispose:S}}const u_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Un=null;function h_(){return Un===null&&(Un=new ir(u_,16,16,Ui,Gn),Un.name="DFG_LUT",Un.minFilter=Rt,Un.magFilter=Rt,Un.wrapS=$n,Un.wrapT=$n,Un.generateMipmaps=!1,Un.needsUpdate=!0),Un}class f_{constructor(e={}){const{canvas:t=Lm(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:d=on}=e;this.isWebGLRenderer=!0;let x;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=n.getContextAttributes().alpha}else x=a;const g=d,m=new Set([fl,hl,ul]),p=new Set([on,kn,kr,Gr,ll,cl]),_=new Uint32Array(4),S=new Int32Array(4),b=new W;let w=null,E=null;const L=[],M=[];let C=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=zn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const A=this;let P=!1,F=null,U=null,D=null,O=null;this._outputColorSpace=xn;let k=0,Y=0,j=null,X=-1,te=null;const N=new ot,re=new ot;let oe=null;const Se=new Qe(0);let Ue=0,Ge=t.width,I=t.height,K=1,se=null,ve=null;const ce=new ot(0,0,Ge,I),Te=new ot(0,0,Ge,I);let ze=!1;const Ne=new Ws;let Je=!1,dt=!1;const Ke=new At,gt=new W,Ct=new ot,It={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Mt=!1;function Ve(){return j===null?K:1}let B=n;function pt(T,G){return t.getContext(T,G)}let ke,R,y,V,q,Q,le,ue,ee,ne,he,Pe,me,fe,De,Oe,Ye,H,de,ie,pe,Me,ae;try{const T={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${al}`),t.addEventListener("webglcontextlost",St,!1),t.addEventListener("webglcontextrestored",lt,!1),t.addEventListener("webglcontextcreationerror",yn,!1),B===null){const G="webgl2";if(B=pt(G,T),B===null)throw pt(G)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ie()}catch(T){throw t.removeEventListener("webglcontextlost",St,!1),t.removeEventListener("webglcontextrestored",lt,!1),t.removeEventListener("webglcontextcreationerror",yn,!1),rt("WebGLRenderer: "+T.message),T}function Ie(){ke=new hv(B),ke.init(),pe=new n_(B,ke),R=new tv(B,ke,e,pe),y=new e_(B,ke),R.reversedDepthBuffer&&u&&y.buffers.depth.setReversed(!0),U=B.createFramebuffer(),D=B.createFramebuffer(),O=B.createFramebuffer(),V=new pv(B),q=new k1,Q=new t_(B,ke,y,q,R,pe,V),le=new uv(A),ue=new g0(B),Me=new jx(B,ue),ee=new fv(B,ue,V,Me),ne=new gv(B,ee,ue,Me,V),H=new mv(B,R,Q),De=new nv(q),he=new z1(A,le,ke,R,Me,De),Pe=new l_(A,q),me=new H1,fe=new K1(ke),Ye=new Qx(A,le,y,ne,x,c),Oe=new j1(A,ne,R),ae=new c_(B,V,R,y),de=new ev(B,ke,V),ie=new dv(B,ke,V),V.programs=he.programs,A.capabilities=R,A.extensions=ke,A.properties=q,A.renderLists=me,A.shadowMap=Oe,A.state=y,A.info=V}g!==on&&(C=new vv(g,t.width,t.height,o,r,s));const Re=new a_(A,B);this.xr=Re,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const T=ke.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=ke.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(T){T!==void 0&&(K=T,this.setSize(Ge,I,!1))},this.getSize=function(T){return T.set(Ge,I)},this.setSize=function(T,G,J=!0){if(Re.isPresenting){Be("WebGLRenderer: Can't change size while VR device is presenting.");return}Ge=T,I=G,t.width=Math.floor(T*K),t.height=Math.floor(G*K),J===!0&&(t.style.width=T+"px",t.style.height=G+"px"),C!==null&&C.setSize(t.width,t.height),this.setViewport(0,0,T,G)},this.getDrawingBufferSize=function(T){return T.set(Ge*K,I*K).floor()},this.setDrawingBufferSize=function(T,G,J){Ge=T,I=G,K=J,t.width=Math.floor(T*J),t.height=Math.floor(G*J),this.setViewport(0,0,T,G)},this.setEffects=function(T){if(g===on){rt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let G=0;G<T.length;G++)if(T[G].isOutputPass===!0){Be("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}C.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(N)},this.getViewport=function(T){return T.copy(ce)},this.setViewport=function(T,G,J,$){T.isVector4?ce.set(T.x,T.y,T.z,T.w):ce.set(T,G,J,$),y.viewport(N.copy(ce).multiplyScalar(K).round())},this.getScissor=function(T){return T.copy(Te)},this.setScissor=function(T,G,J,$){T.isVector4?Te.set(T.x,T.y,T.z,T.w):Te.set(T,G,J,$),y.scissor(re.copy(Te).multiplyScalar(K).round())},this.getScissorTest=function(){return ze},this.setScissorTest=function(T){y.setScissorTest(ze=T)},this.setOpaqueSort=function(T){se=T},this.setTransparentSort=function(T){ve=T},this.getClearColor=function(T){return T.copy(Ye.getClearColor())},this.setClearColor=function(){Ye.setClearColor(...arguments)},this.getClearAlpha=function(){return Ye.getClearAlpha()},this.setClearAlpha=function(){Ye.setClearAlpha(...arguments)},this.clear=function(T=!0,G=!0,J=!0){let $=0;if(T){let Z=!1;if(j!==null){const _e=j.texture.format;Z=m.has(_e)}if(Z){const _e=j.texture.type,Ee=p.has(_e),xe=Ye.getClearColor(),Ae=Ye.getClearAlpha(),Le=xe.r,$e=xe.g,je=xe.b;Ee?(_[0]=Le,_[1]=$e,_[2]=je,_[3]=Ae,B.clearBufferuiv(B.COLOR,0,_)):(S[0]=Le,S[1]=$e,S[2]=je,S[3]=Ae,B.clearBufferiv(B.COLOR,0,S))}else $|=B.COLOR_BUFFER_BIT}G&&($|=B.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),J&&($|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),$!==0&&B.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),F=T},this.dispose=function(){t.removeEventListener("webglcontextlost",St,!1),t.removeEventListener("webglcontextrestored",lt,!1),t.removeEventListener("webglcontextcreationerror",yn,!1),Ye.dispose(),me.dispose(),fe.dispose(),q.dispose(),le.dispose(),ne.dispose(),Me.dispose(),ae.dispose(),he.dispose(),Re.dispose(),Re.removeEventListener("sessionstart",bl),Re.removeEventListener("sessionend",wl),xi.stop()};function St(T){T.preventDefault(),$l("WebGLRenderer: Context Lost."),P=!0}function lt(){$l("WebGLRenderer: Context Restored."),P=!1;const T=V.autoReset,G=Oe.enabled,J=Oe.autoUpdate,$=Oe.needsUpdate,Z=Oe.type;Ie(),V.autoReset=T,Oe.enabled=G,Oe.autoUpdate=J,Oe.needsUpdate=$,Oe.type=Z}function yn(T){rt("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Pn(T){const G=T.target;G.removeEventListener("dispose",Pn),ch(G)}function ch(T){uh(T),q.remove(T)}function uh(T){const G=q.get(T).programs;G!==void 0&&(G.forEach(function(J){he.releaseProgram(J)}),T.isShaderMaterial&&he.releaseShaderCache(T))}this.renderBufferDirect=function(T,G,J,$,Z,_e){G===null&&(G=It);const Ee=Z.isMesh&&Z.matrixWorld.determinantAffine()<0,xe=dh(T,G,J,$,Z);y.setMaterial($,Ee);let Ae=J.index,Le=1;if($.wireframe===!0){if(Ae=ee.getWireframeAttribute(J),Ae===void 0)return;Le=2}const $e=J.drawRange,je=J.attributes.position;let Ce=$e.start*Le,ct=($e.start+$e.count)*Le;_e!==null&&(Ce=Math.max(Ce,_e.start*Le),ct=Math.min(ct,(_e.start+_e.count)*Le)),Ae!==null?(Ce=Math.max(Ce,0),ct=Math.min(ct,Ae.count)):je!=null&&(Ce=Math.max(Ce,0),ct=Math.min(ct,je.count));const Nt=ct-Ce;if(Nt<0||Nt===1/0)return;Me.setup(Z,$,xe,J,Ae);let wt,_t=de;if(Ae!==null&&(wt=ue.get(Ae),_t=ie,_t.setIndex(wt)),Z.isMesh)$.wireframe===!0?(y.setLineWidth($.wireframeLinewidth*Ve()),_t.setMode(B.LINES)):_t.setMode(B.TRIANGLES);else if(Z.isLine){let Yt=$.linewidth;Yt===void 0&&(Yt=1),y.setLineWidth(Yt*Ve()),Z.isLineSegments?_t.setMode(B.LINES):Z.isLineLoop?_t.setMode(B.LINE_LOOP):_t.setMode(B.LINE_STRIP)}else Z.isPoints?_t.setMode(B.POINTS):Z.isSprite&&_t.setMode(B.TRIANGLES);if(Z.isBatchedMesh)if(ke.get("WEBGL_multi_draw"))_t.renderMultiDraw(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount);else{const Yt=Z._multiDrawStarts,be=Z._multiDrawCounts,Jt=Z._multiDrawCount,it=Ae?ue.get(Ae).bytesPerElement:1,pn=q.get($).currentProgram.getUniforms();for(let Dn=0;Dn<Jt;Dn++)pn.setValue(B,"_gl_DrawID",Dn),_t.render(Yt[Dn]/it,be[Dn])}else if(Z.isInstancedMesh)_t.renderInstances(Ce,Nt,Z.count);else if(J.isInstancedBufferGeometry){const Yt=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,be=Math.min(J.instanceCount,Yt);_t.renderInstances(Ce,Nt,be)}else _t.render(Ce,Nt)};function yl(T,G,J,$){F!==null&&T.isNodeMaterial&&F.setObject($,T),Je===!0&&De.setState(T,J,!1),T.transparent===!0&&T.side===Kn&&T.forceSinglePass===!1?(T.side=tn,T.needsUpdate=!0,Kr(T,G,$),T.side=Di,T.needsUpdate=!0,Kr(T,G,$),T.side=Kn):Kr(T,G,$)}this.compile=function(T,G,J=null){J===null&&(J=T),F!==null&&F.renderStart(T,G,J),E=fe.get(J),E.init(G),M.push(E),J.traverseVisible(function(Z){Z.isLight&&Z.layers.test(G.layers)&&(E.pushLight(Z),Z.castShadow&&E.pushShadow(Z))}),T!==J&&T.traverseVisible(function(Z){Z.isLight&&Z.layers.test(G.layers)&&(E.pushLight(Z),Z.castShadow&&E.pushShadow(Z))}),E.setupLights(),F!==null&&F.updateLights(E.state.lightsArray),dt=this.localClippingEnabled,Je=De.init(this.clippingPlanes,dt),Je===!0&&De.setGlobalState(this.clippingPlanes,G),F!==null&&Oe.render(E.state.shadowsArray,J,G);const $=new Set;return T.traverse(function(Z){if(!(Z.isMesh||Z.isPoints||Z.isLine||Z.isSprite))return;const _e=Z.material;if(_e)if(Array.isArray(_e))for(let Ee=0;Ee<_e.length;Ee++){const xe=_e[Ee];yl(xe,J,G,Z),$.add(xe)}else yl(_e,J,G,Z),$.add(_e)}),E=M.pop(),F!==null&&F.renderEnd(),$},this.compileAsync=function(T,G,J=null){const $=this.compile(T,G,J);return new Promise(Z=>{function _e(){if($.forEach(function(Ee){const Ae=q.get(Ee).currentProgram;(Ae===void 0||Ae.isReady())&&$.delete(Ee)}),$.size===0){Z(T);return}setTimeout(_e,10)}ke.get("KHR_parallel_shader_compile")!==null?_e():setTimeout(_e,10)})};let la=null;function hh(T){la&&la(T)}function bl(){xi.stop()}function wl(){xi.start()}const xi=new Ku;xi.setAnimationLoop(hh),typeof self<"u"&&xi.setContext(self),this.setAnimationLoop=function(T){la=T,Re.setAnimationLoop(T),T===null?xi.stop():xi.start()},Re.addEventListener("sessionstart",bl),Re.addEventListener("sessionend",wl),this.render=function(T,G){if(G!==void 0&&G.isCamera!==!0){rt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;F!==null&&F.renderStart(T,G);const J=Re.enabled===!0&&Re.isPresenting===!0,$=C!==null&&(j===null||J)&&C.begin(A,j);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),Re.enabled===!0&&Re.isPresenting===!0&&(C===null||C.isCompositing()===!1)&&(Re.cameraAutoUpdate===!0&&Re.updateCamera(G),G=Re.getCamera()),T.isScene===!0&&T.onBeforeRender(A,T,G,j),E=fe.get(T,M.length),E.init(G),E.state.textureUnits=Q.getTextureUnits(),M.push(E),Ke.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),Ne.setFromProjectionMatrix(Ke,On,G.reversedDepth),dt=this.localClippingEnabled,Je=De.init(this.clippingPlanes,dt),w=me.get(T,L.length),w.init(),L.push(w),Re.enabled===!0&&Re.isPresenting===!0){const Ee=A.xr.getDepthSensingMesh();Ee!==null&&ca(Ee,G,-1/0,A.sortObjects)}ca(T,G,0,A.sortObjects),w.finish(),F!==null&&F.updateLights(E.state.lightsArray),A.sortObjects===!0&&w.sort(se,ve),Mt=Re.enabled===!1||Re.isPresenting===!1||Re.hasDepthSensing()===!1,Mt&&Ye.addToRenderList(w,T),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Je===!0&&De.beginShadows();const Z=E.state.shadowsArray;if(Oe.render(Z,T,G),Je===!0&&De.endShadows(),($&&C.hasRenderPass())===!1){const Ee=w.opaque,xe=w.transmissive;if(E.setupLights(),G.isArrayCamera){const Ae=G.cameras;if(xe.length>0)for(let Le=0,$e=Ae.length;Le<$e;Le++){const je=Ae[Le];Tl(Ee,xe,T,je)}Mt&&Ye.render(T);for(let Le=0,$e=Ae.length;Le<$e;Le++){const je=Ae[Le];El(w,T,je,je.viewport)}}else xe.length>0&&Tl(Ee,xe,T,G),Mt&&Ye.render(T),El(w,T,G)}j!==null&&Y===0&&(Q.updateMultisampleRenderTarget(j),Q.updateRenderTargetMipmap(j)),$&&C.end(A),T.isScene===!0&&T.onAfterRender(A,T,G),Me.resetDefaultState(),X=-1,te=null,M.pop(),M.length>0?(E=M[M.length-1],Q.setTextureUnits(E.state.textureUnits),Je===!0&&De.setGlobalState(A.clippingPlanes,E.state.camera)):E=null,L.pop(),L.length>0?w=L[L.length-1]:w=null,F!==null&&F.renderEnd()};function ca(T,G,J,$){if(T.visible===!1)return;if(T.layers.test(G.layers)){if(T.isGroup)J=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(G);else if(T.isLightProbeGrid)E.pushLightProbeGrid(T);else if(T.isLight)E.pushLight(T),T.castShadow&&E.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||T.intersectsFrustum(Ne)){$&&Ct.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Ke);const Ee=ne.update(T),xe=T.material;xe.visible&&w.push(T,Ee,xe,J,Ct.z,null,G)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||T.intersectsFrustum(Ne))){const Ee=ne.update(T),xe=T.material;if($&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Ct.copy(T.boundingSphere.center)):(Ee.boundingSphere===null&&Ee.computeBoundingSphere(),Ct.copy(Ee.boundingSphere.center)),Ct.applyMatrix4(T.matrixWorld).applyMatrix4(Ke)),Array.isArray(xe)){const Ae=Ee.groups;for(let Le=0,$e=Ae.length;Le<$e;Le++){const je=Ae[Le],Ce=xe[je.materialIndex];Ce&&Ce.visible&&w.push(T,Ee,Ce,J,Ct.z,je,G)}}else xe.visible&&w.push(T,Ee,xe,J,Ct.z,null,G)}}const _e=T.children;for(let Ee=0,xe=_e.length;Ee<xe;Ee++)ca(_e[Ee],G,J,$)}function El(T,G,J,$){const{opaque:Z,transmissive:_e,transparent:Ee}=T;E.setupLightsView(J),Je===!0&&De.setGlobalState(A.clippingPlanes,J),$&&y.viewport(N.copy($)),Z.length>0&&qr(Z,G,J),_e.length>0&&qr(_e,G,J),Ee.length>0&&qr(Ee,G,J),y.buffers.depth.setTest(!0),y.buffers.depth.setMask(!0),y.buffers.color.setMask(!0),y.setPolygonOffset(!1)}function Tl(T,G,J,$){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[$.id]===void 0){const Ce=ke.has("EXT_color_buffer_half_float")||ke.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[$.id]=new Mn(1,1,{generateMipmaps:!0,type:Ce?Gn:on,minFilter:Ai,samples:Math.max(4,R.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:tt.workingColorSpace})}const _e=E.state.transmissionRenderTarget[$.id],Ee=$.viewport||N;_e.setSize(Ee.z*A.transmissionResolutionScale,Ee.w*A.transmissionResolutionScale);const xe=A.getRenderTarget(),Ae=A.getActiveCubeFace(),Le=A.getActiveMipmapLevel();A.setRenderTarget(_e),A.getClearColor(Se),Ue=A.getClearAlpha(),Ue<1&&A.setClearColor(16777215,.5),A.clear(),Mt&&Ye.render(J);const $e=A.toneMapping;A.toneMapping=zn;const je=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),E.setupLightsView($),Je===!0&&De.setGlobalState(A.clippingPlanes,$),qr(T,J,$),Q.updateMultisampleRenderTarget(_e),Q.updateRenderTargetMipmap(_e),ke.has("WEBGL_multisampled_render_to_texture")===!1){let Ce=!1;for(let ct=0,Nt=G.length;ct<Nt;ct++){const wt=G[ct],{object:_t,geometry:Yt,material:be,group:Jt}=wt;if(be.side===Kn&&_t.layers.test($.layers)){const it=be.side;be.side=tn,be.needsUpdate=!0,Al(_t,J,$,Yt,be,Jt),be.side=it,be.needsUpdate=!0,Ce=!0}}Ce===!0&&(Q.updateMultisampleRenderTarget(_e),Q.updateRenderTargetMipmap(_e))}A.setRenderTarget(xe,Ae,Le),A.setClearColor(Se,Ue),je!==void 0&&($.viewport=je),A.toneMapping=$e}function qr(T,G,J){const $=G.isScene===!0?G.overrideMaterial:null;for(let Z=0,_e=T.length;Z<_e;Z++){const Ee=T[Z],{object:xe,geometry:Ae,group:Le}=Ee;let $e=Ee.material;$e.allowOverride===!0&&$!==null&&($e=$),xe.layers.test(J.layers)&&Al(xe,G,J,Ae,$e,Le)}}function Al(T,G,J,$,Z,_e){F!==null&&Z.isNodeMaterial&&F.setObject(T,Z),T.onBeforeRender(A,G,J,$,Z,_e),T.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),Z.onBeforeRender(A,G,J,$,T,_e),Z.transparent===!0&&Z.side===Kn&&Z.forceSinglePass===!1?(Z.side=tn,Z.needsUpdate=!0,A.renderBufferDirect(J,G,$,Z,T,_e),Z.side=Di,Z.needsUpdate=!0,A.renderBufferDirect(J,G,$,Z,T,_e),Z.side=Kn):A.renderBufferDirect(J,G,$,Z,T,_e),T.onAfterRender(A,G,J,$,Z,_e)}function Kr(T,G,J){G.isScene!==!0&&(G=It);const $=q.get(T),Z=E.state.lights,_e=E.state.shadowsArray,Ee=Z.state.version,xe=he.getParameters(T,Z.state,_e,G,J,E.state.lightProbeGridArray),Ae=he.getProgramCacheKey(xe);let Le=$.programs;$.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?G.environment:null,$.fog=G.fog;const $e=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;$.envMap=le.get(T.envMap||$.environment,$e),$.envMapRotation=$.environment!==null&&T.envMap===null?G.environmentRotation:T.envMapRotation,Le===void 0&&(T.addEventListener("dispose",Pn),Le=new Map,$.programs=Le);let je=Le.get(Ae);if(je!==void 0){if($.currentProgram===je&&$.lightsStateVersion===Ee)return Rl(T,xe),je}else xe.uniforms=he.getUniforms(T),F!==null&&T.isNodeMaterial&&F.build(T,J,xe),T.onBeforeCompile(xe,A),je=he.acquireProgram(xe,Ae),Le.set(Ae,je),$.uniforms=xe.uniforms;const Ce=$.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Ce.clippingPlanes=De.uniform),Rl(T,xe),$.needsLights=mh(T),$.lightsStateVersion=Ee,$.needsLights&&(Ce.ambientLightColor.value=Z.state.ambient,Ce.lightProbe.value=Z.state.probe,Ce.sunLights.value=Z.state.sun,Ce.sunLightShadows.value=Z.state.sunShadow,Ce.directionalLights.value=Z.state.directional,Ce.directionalLightShadows.value=Z.state.directionalShadow,Ce.spotLights.value=Z.state.spot,Ce.spotLightShadows.value=Z.state.spotShadow,Ce.rectAreaLights.value=Z.state.rectArea,Ce.ltc_1.value=Z.state.rectAreaLTC1,Ce.ltc_2.value=Z.state.rectAreaLTC2,Ce.pointLights.value=Z.state.point,Ce.pointLightShadows.value=Z.state.pointShadow,Ce.hemisphereLights.value=Z.state.hemi,Ce.sunShadowMatrix.value=Z.state.sunShadowMatrix,Ce.sunShadowCascade.value=Z.state.sunShadowCascade,Ce.directionalShadowMatrix.value=Z.state.directionalShadowMatrix,Ce.spotLightMatrix.value=Z.state.spotLightMatrix,Ce.spotLightMap.value=Z.state.spotLightMap,Ce.pointShadowMatrix.value=Z.state.pointShadowMatrix),$.lightProbeGrid=E.state.lightProbeGridArray.length>0,$.currentProgram=je,$.uniformsList=null,je}function Cl(T){if(T.uniformsList===null){const G=T.currentProgram.getUniforms();T.uniformsList=Us.seqWithValue(G.seq,T.uniforms)}return T.uniformsList}function Rl(T,G){const J=q.get(T);J.outputColorSpace=G.outputColorSpace,J.batching=G.batching,J.batchingColor=G.batchingColor,J.instancing=G.instancing,J.instancingColor=G.instancingColor,J.instancingMorph=G.instancingMorph,J.skinning=G.skinning,J.morphTargets=G.morphTargets,J.morphNormals=G.morphNormals,J.morphColors=G.morphColors,J.morphTargetsCount=G.morphTargetsCount,J.numClippingPlanes=G.numClippingPlanes,J.numIntersection=G.numClipIntersection,J.vertexAlphas=G.vertexAlphas,J.vertexTangents=G.vertexTangents,J.toneMapping=G.toneMapping}function fh(T,G){if(T.length===0)return null;if(T.length===1)return T[0].texture!==null?T[0]:null;b.setFromMatrixPosition(G.matrixWorld);for(let J=0,$=T.length;J<$;J++){const Z=T[J];if(Z.texture!==null&&Z.boundingBox.containsPoint(b))return Z}return null}function dh(T,G,J,$,Z){G.isScene!==!0&&(G=It),Q.resetTextureUnits();const _e=G.fog,Ee=$.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial?G.environment:null,xe=j===null?A.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:tt.workingColorSpace,Ae=$.isMeshStandardMaterial||$.isMeshLambertMaterial&&!$.envMap||$.isMeshPhongMaterial&&!$.envMap,Le=le.get($.envMap||Ee,Ae),$e=$.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,je=!!J.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),Ce=!!J.morphAttributes.position,ct=!!J.morphAttributes.normal,Nt=!!J.morphAttributes.color;let wt=zn;$.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(wt=A.toneMapping);const _t=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,Yt=_t!==void 0?_t.length:0,be=q.get($),Jt=E.state.lights;if(Je===!0&&(dt===!0||T!==te)){const yt=T===te&&$.id===X;De.setState($,T,yt)}let it=!1;$.version===be.__version?(be.needsLights&&be.lightsStateVersion!==Jt.state.version||be.outputColorSpace!==xe||Z.isBatchedMesh&&be.batching===!1||!Z.isBatchedMesh&&be.batching===!0||Z.isBatchedMesh&&be.batchingColor===!0&&Z._colorsTexture===null||Z.isBatchedMesh&&be.batchingColor===!1&&Z._colorsTexture!==null||Z.isInstancedMesh&&be.instancing===!1||!Z.isInstancedMesh&&be.instancing===!0||Z.isSkinnedMesh&&be.skinning===!1||!Z.isSkinnedMesh&&be.skinning===!0||Z.isInstancedMesh&&be.instancingColor===!0&&Z.instanceColor===null||Z.isInstancedMesh&&be.instancingColor===!1&&Z.instanceColor!==null||Z.isInstancedMesh&&be.instancingMorph===!0&&Z.morphTexture===null||Z.isInstancedMesh&&be.instancingMorph===!1&&Z.morphTexture!==null||be.envMap!==Le||$.fog===!0&&be.fog!==_e||be.numClippingPlanes!==void 0&&(be.numClippingPlanes!==De.numPlanes||be.numIntersection!==De.numIntersection)||be.vertexAlphas!==$e||be.vertexTangents!==je||be.morphTargets!==Ce||be.morphNormals!==ct||be.morphColors!==Nt||be.toneMapping!==wt||be.morphTargetsCount!==Yt||!!be.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(it=!0):(it=!0,be.__version=$.version);let pn=be.currentProgram;it===!0&&(pn=Kr($,G,Z),F&&$.isNodeMaterial&&F.onUpdateProgram($,pn,be));let Dn=!1,ei=!1,Oi=!1;const xt=pn.getUniforms(),Ut=be.uniforms;if(y.useProgram(pn.program)&&(Dn=!0,ei=!0,Oi=!0),$.id!==X&&(X=$.id,ei=!0),be.needsLights){const yt=fh(E.state.lightProbeGridArray,Z);be.lightProbeGrid!==yt&&(be.lightProbeGrid=yt,ei=!0)}if(Dn||te!==T){y.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),xt.setValue(B,"projectionMatrix",T.projectionMatrix),xt.setValue(B,"viewMatrix",T.matrixWorldInverse);const ni=xt.map.cameraPosition;ni!==void 0&&ni.setValue(B,gt.setFromMatrixPosition(T.matrixWorld)),R.logarithmicDepthBuffer&&xt.setValue(B,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&xt.setValue(B,"isOrthographic",T.isOrthographicCamera===!0),te!==T&&(te=T,ei=!0,Oi=!0)}if(be.needsLights&&(Jt.state.sunShadowMap.length>0&&xt.setValue(B,"sunShadowMap",Jt.state.sunShadowMap,Q),Jt.state.directionalShadowMap.length>0&&xt.setValue(B,"directionalShadowMap",Jt.state.directionalShadowMap,Q),Jt.state.spotShadowMap.length>0&&xt.setValue(B,"spotShadowMap",Jt.state.spotShadowMap,Q),Jt.state.pointShadowMap.length>0&&xt.setValue(B,"pointShadowMap",Jt.state.pointShadowMap,Q)),Z.isSkinnedMesh){xt.setOptional(B,Z,"bindMatrix"),xt.setOptional(B,Z,"bindMatrixInverse");const yt=Z.skeleton;yt&&(yt.boneTexture===null&&yt.computeBoneTexture(),xt.setValue(B,"boneTexture",yt.boneTexture,Q))}Z.isBatchedMesh&&(xt.setOptional(B,Z,"batchingTexture"),xt.setValue(B,"batchingTexture",Z._matricesTexture,Q),xt.setOptional(B,Z,"batchingIdTexture"),xt.setValue(B,"batchingIdTexture",Z._indirectTexture,Q),xt.setOptional(B,Z,"batchingColorTexture"),Z._colorsTexture!==null&&xt.setValue(B,"batchingColorTexture",Z._colorsTexture,Q));const ti=J.morphAttributes;if((ti.position!==void 0||ti.normal!==void 0||ti.color!==void 0)&&H.update(Z,J,pn),(ei||be.receiveShadow!==Z.receiveShadow)&&(be.receiveShadow=Z.receiveShadow,xt.setValue(B,"receiveShadow",Z.receiveShadow)),($.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial)&&$.envMap===null&&G.environment!==null&&(Ut.envMapIntensity.value=G.environmentIntensity),Ut.dfgLUT!==void 0&&(Ut.dfgLUT.value=h_()),ei){if(xt.setValue(B,"toneMappingExposure",A.toneMappingExposure),be.needsLights&&ph(Ut,Oi),_e&&$.fog===!0&&Pe.refreshFogUniforms(Ut,_e),Pe.refreshMaterialUniforms(Ut,$,K,I,E.state.transmissionRenderTarget[T.id]),be.needsLights&&be.lightProbeGrid){const yt=be.lightProbeGrid;Ut.probesSH.value=yt.texture,Ut.probesMin.value.copy(yt.boundingBox.min),Ut.probesMax.value.copy(yt.boundingBox.max),Ut.probesResolution.value.copy(yt.resolution)}Us.upload(B,Cl(be),Ut,Q)}if($.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(Us.upload(B,Cl(be),Ut,Q),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&xt.setValue(B,"center",Z.center),xt.setValue(B,"modelViewMatrix",Z.modelViewMatrix),xt.setValue(B,"normalMatrix",Z.normalMatrix),xt.setValue(B,"modelMatrix",Z.matrixWorld),$.uniformsGroups!==void 0){const yt=$.uniformsGroups;for(let ni=0,Bi=yt.length;ni<Bi;ni++){const Pl=yt[ni];ae.update(Pl,pn),ae.bind(Pl,pn)}}return pn}function ph(T,G){T.ambientLightColor.needsUpdate=G,T.lightProbe.needsUpdate=G,T.sunLights.needsUpdate=G,T.sunLightShadows.needsUpdate=G,T.directionalLights.needsUpdate=G,T.directionalLightShadows.needsUpdate=G,T.pointLights.needsUpdate=G,T.pointLightShadows.needsUpdate=G,T.spotLights.needsUpdate=G,T.spotLightShadows.needsUpdate=G,T.rectAreaLights.needsUpdate=G,T.hemisphereLights.needsUpdate=G}function mh(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return k},this.getActiveMipmapLevel=function(){return Y},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(T,G,J){const $=q.get(T);$.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,$.__autoAllocateDepthBuffer===!1&&($.__useRenderToTexture=!1),q.get(T.texture).__webglTexture=G,q.get(T.depthTexture).__webglTexture=$.__autoAllocateDepthBuffer?void 0:J,$.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,G){const J=q.get(T);J.__webglFramebuffer=G,J.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(T,G=0,J=0){j=T,k=G,Y=J;let $=null,Z=!1,_e=!1;if(T){const xe=q.get(T);if(xe.__useDefaultFramebuffer!==void 0){y.bindFramebuffer(B.FRAMEBUFFER,xe.__webglFramebuffer),N.copy(T.viewport),re.copy(T.scissor),oe=T.scissorTest,y.viewport(N),y.scissor(re),y.setScissorTest(oe),X=-1;return}else if(xe.__webglFramebuffer===void 0)Q.setupRenderTarget(T);else if(xe.__hasExternalTextures)Q.rebindTextures(T,q.get(T.texture).__webglTexture,q.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const $e=T.depthTexture;if(xe.__boundDepthTexture!==$e){if($e!==null&&q.has($e)&&(T.width!==$e.image.width||T.height!==$e.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Q.setupDepthRenderbuffer(T)}}const Ae=T.texture;(Ae.isData3DTexture||Ae.isDataArrayTexture||Ae.isCompressedArrayTexture)&&(_e=!0);const Le=q.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Le[G])?$=Le[G][J]:$=Le[G],Z=!0):T.samples>0&&Q.useMultisampledRTT(T)===!1?$=q.get(T).__webglMultisampledFramebuffer:Array.isArray(Le)?$=Le[J]:$=Le,N.copy(T.viewport),re.copy(T.scissor),oe=T.scissorTest}else N.copy(ce).multiplyScalar(K).floor(),re.copy(Te).multiplyScalar(K).floor(),oe=ze;if(J!==0&&($=U),y.bindFramebuffer(B.FRAMEBUFFER,$)&&y.drawBuffers(T,$),y.viewport(N),y.scissor(re),y.setScissorTest(oe),Z){const xe=q.get(T.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+G,xe.__webglTexture,J)}else if(_e){const xe=G;for(let Ae=0;Ae<T.textures.length;Ae++){const Le=q.get(T.textures[Ae]);B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0+Ae,Le.__webglTexture,J,xe)}}else if(T!==null&&J!==0){const xe=q.get(T.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,xe.__webglTexture,J)}X=-1};function Ll(T){const G=q.get(T);return(G.__readFormat!==T.format||G.__readType!==T.type)&&(G.__readFormat=T.format,G.__readType=T.type,G.__formatReadable=R.textureFormatReadable(T.format),G.__typeReadable=R.textureTypeReadable(T.type)),G}this.readRenderTargetPixels=function(T,G,J,$,Z,_e,Ee,xe=0){if(!(T&&T.isWebGLRenderTarget)){rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ae=q.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Ee!==void 0&&(Ae=Ae[Ee]),Ae){y.bindFramebuffer(B.FRAMEBUFFER,Ae);try{const Le=T.textures[xe],$e=Le.format,je=Le.type;T.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+xe);const Ce=Ll(Le);if(Ce.__formatReadable===!1){rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ce.__typeReadable===!1){rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=T.width-$&&J>=0&&J<=T.height-Z&&B.readPixels(G,J,$,Z,pe.convert($e),pe.convert(je),_e)}finally{const Le=j!==null?q.get(j).__webglFramebuffer:null;y.bindFramebuffer(B.FRAMEBUFFER,Le)}}},this.readRenderTargetPixelsAsync=async function(T,G,J,$,Z,_e,Ee,xe=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ae=q.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Ee!==void 0&&(Ae=Ae[Ee]),Ae)if(G>=0&&G<=T.width-$&&J>=0&&J<=T.height-Z){y.bindFramebuffer(B.FRAMEBUFFER,Ae);const Le=T.textures[xe],$e=Le.format,je=Le.type;T.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+xe);const Ce=Ll(Le);if(Ce.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ce.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ct=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,ct),B.bufferData(B.PIXEL_PACK_BUFFER,_e.byteLength,B.STREAM_READ),B.readPixels(G,J,$,Z,pe.convert($e),pe.convert(je),0),B.bindBuffer(B.PIXEL_PACK_BUFFER,null);const Nt=j!==null?q.get(j).__webglFramebuffer:null;y.bindFramebuffer(B.FRAMEBUFFER,Nt);const wt=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await Pm(B,wt,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,ct),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,_e),B.bindBuffer(B.PIXEL_PACK_BUFFER,null),B.deleteBuffer(ct),B.deleteSync(wt),_e}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,G=null,J=0){const $=Math.pow(2,-J),Z=Math.floor(T.image.width*$),_e=Math.floor(T.image.height*$),Ee=G!==null?G.x:0,xe=G!==null?G.y:0;Q.setTexture2D(T,0),B.copyTexSubImage2D(B.TEXTURE_2D,J,0,0,Ee,xe,Z,_e),y.unbindTexture()},this.copyTextureToTexture=function(T,G,J=null,$=null,Z=0,_e=0){let Ee,xe,Ae,Le,$e,je,Ce,ct,Nt;const wt=T.isCompressedTexture?T.mipmaps[_e]:T.image;if(J!==null)Ee=J.max.x-J.min.x,xe=J.max.y-J.min.y,Ae=J.isBox3?J.max.z-J.min.z:1,Le=J.min.x,$e=J.min.y,je=J.isBox3?J.min.z:0;else{const Ut=Math.pow(2,-Z);Ee=Math.floor(wt.width*Ut),xe=Math.floor(wt.height*Ut),T.isDataArrayTexture?Ae=wt.depth:T.isData3DTexture?Ae=Math.floor(wt.depth*Ut):Ae=1,Le=0,$e=0,je=0}$!==null?(Ce=$.x,ct=$.y,Nt=$.z):(Ce=0,ct=0,Nt=0);const _t=pe.convert(G.format),Yt=pe.convert(G.type);let be;G.isData3DTexture?(Q.setTexture3D(G,0),be=B.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(Q.setTexture2DArray(G,0),be=B.TEXTURE_2D_ARRAY):(Q.setTexture2D(G,0),be=B.TEXTURE_2D),y.activeTexture(B.TEXTURE0),y.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,G.flipY),y.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),y.pixelStorei(B.UNPACK_ALIGNMENT,G.unpackAlignment);const Jt=y.getParameter(B.UNPACK_ROW_LENGTH),it=y.getParameter(B.UNPACK_IMAGE_HEIGHT),pn=y.getParameter(B.UNPACK_SKIP_PIXELS),Dn=y.getParameter(B.UNPACK_SKIP_ROWS),ei=y.getParameter(B.UNPACK_SKIP_IMAGES);y.pixelStorei(B.UNPACK_ROW_LENGTH,wt.width),y.pixelStorei(B.UNPACK_IMAGE_HEIGHT,wt.height),y.pixelStorei(B.UNPACK_SKIP_PIXELS,Le),y.pixelStorei(B.UNPACK_SKIP_ROWS,$e),y.pixelStorei(B.UNPACK_SKIP_IMAGES,je);const Oi=T.isDataArrayTexture||T.isData3DTexture,xt=G.isDataArrayTexture||G.isData3DTexture;if(T.isDepthTexture){const Ut=q.get(T),ti=q.get(G),yt=q.get(Ut.__renderTarget),ni=q.get(ti.__renderTarget);y.bindFramebuffer(B.READ_FRAMEBUFFER,yt.__webglFramebuffer),y.bindFramebuffer(B.DRAW_FRAMEBUFFER,ni.__webglFramebuffer);for(let Bi=0;Bi<Ae;Bi++)Oi&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,q.get(T).__webglTexture,Z,je+Bi),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,q.get(G).__webglTexture,_e,Nt+Bi)),B.blitFramebuffer(Le,$e,Ee,xe,Ce,ct,Ee,xe,B.DEPTH_BUFFER_BIT,B.NEAREST);y.bindFramebuffer(B.READ_FRAMEBUFFER,null),y.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if(Z!==0||T.isRenderTargetTexture||q.has(T)){const Ut=q.get(T),ti=q.get(G);y.bindFramebuffer(B.READ_FRAMEBUFFER,D),y.bindFramebuffer(B.DRAW_FRAMEBUFFER,O);for(let yt=0;yt<Ae;yt++)Oi?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Ut.__webglTexture,Z,je+yt):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Ut.__webglTexture,Z),xt?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,ti.__webglTexture,_e,Nt+yt):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,ti.__webglTexture,_e),Z!==0?B.blitFramebuffer(Le,$e,Ee,xe,Ce,ct,Ee,xe,B.COLOR_BUFFER_BIT,B.NEAREST):xt?B.copyTexSubImage3D(be,_e,Ce,ct,Nt+yt,Le,$e,Ee,xe):B.copyTexSubImage2D(be,_e,Ce,ct,Le,$e,Ee,xe);y.bindFramebuffer(B.READ_FRAMEBUFFER,null),y.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else xt?T.isDataTexture||T.isData3DTexture?B.texSubImage3D(be,_e,Ce,ct,Nt,Ee,xe,Ae,_t,Yt,wt.data):G.isCompressedArrayTexture?B.compressedTexSubImage3D(be,_e,Ce,ct,Nt,Ee,xe,Ae,_t,wt.data):B.texSubImage3D(be,_e,Ce,ct,Nt,Ee,xe,Ae,_t,Yt,wt):T.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,_e,Ce,ct,Ee,xe,_t,Yt,wt.data):T.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,_e,Ce,ct,wt.width,wt.height,_t,wt.data):B.texSubImage2D(B.TEXTURE_2D,_e,Ce,ct,Ee,xe,_t,Yt,wt);y.pixelStorei(B.UNPACK_ROW_LENGTH,Jt),y.pixelStorei(B.UNPACK_IMAGE_HEIGHT,it),y.pixelStorei(B.UNPACK_SKIP_PIXELS,pn),y.pixelStorei(B.UNPACK_SKIP_ROWS,Dn),y.pixelStorei(B.UNPACK_SKIP_IMAGES,ei),_e===0&&G.generateMipmaps&&B.generateMipmap(be),y.unbindTexture()},this.initRenderTarget=function(T){q.get(T).__webglFramebuffer===void 0&&Q.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?Q.setTextureCube(T,0):T.isData3DTexture?Q.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?Q.setTexture2DArray(T,0):Q.setTexture2D(T,0),y.unbindTexture()},this.resetState=function(){k=0,Y=0,j=null,y.reset(),Me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return On}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=tt._getDrawingBufferColorSpace(e),t.unpackColorSpace=tt._getUnpackColorSpace()}}const d_={hair:v.HAIR,hat:v.HAT,headphones:v.PHONES,top:v.TOP,jacket:v.JACKET,jeans:v.JEANS,sneakers:v.SHOES,broom:v.BROOM,bristles:v.STRAW,skin:v.SKIN},Vc={hair:[.01,.7,.85],hat:[.74,.45,.45],headphones:[.92,.55,.9],top:[.13,.15,.95],jacket:[.72,.45,.7],jeans:[.6,.5,.7],sneakers:[0,0,.95],broom:[.08,.55,.55],bristles:[.12,.55,.9],skin:[.07,.3,.94]};function p_(i,e=Vc){const t={...Vc,...e},n={hair:i.hairHue,jacket:i.cloakHue,hat:i.hatHue,top:i.topHue,jeans:i.jeansHue,sneakers:i.shoeHue,headphones:i.phonesHue},r={};for(const[s,a]of Object.entries(d_)){const[o,c,l]=t[s];r[a]=we(n[s]??o,c,l)}return r[v.EYE]=[24,18,30],r[v.GLINT]=[255,255,245],r[v.NOSE]=[20,16,24],r[v.MAGIC]=we(i.glowHue??.13,.5,1),r[v.MAGIC2]=we(i.glowHue??.13,.15,1),r[v.BELLY]=[245,245,240],r}const m_={rise:.78,descend:-.66};function Ko({frame:i=0,lean:e=!1,pose:t}={}){const n=t==="rise",r=t==="descend",s=n||r,a=new et({blend:.03}),o=s?0:[0,.025,.045][i%3],c=s?0:[0,.015,-.01][i%3]+(e?.08:0),l=.42+o,h=n?.3:r?-.27:e?.1:0,f=Math.min(.1,Math.max(0,h)),u=s?[.02,.06][i%2]:[0,.03,.05][i%3],d=r?1:n?-.6:0;a.seg([-.5,l-c*2,0],[.62,l+c*3,0],.022,.018,v.BROOM,{group:2}),a.ell([-.62,l-c*2-.01,0],[.17,.07,.08],v.STRAW,{dir:[1,c,0],group:3,paint:_=>_[0]<-.72?v.MAGIC2:_[0]>-.5?v.BROOM:void 0});for(const _ of[-1,1]){const S=[-.04,l+.06,_*.07],b=r?[.16,l-.05,_*.14]:n?[.06,l-.07,_*.14]:[.12+h*.5,l-.02,_*.14],w=r?[.2,l-.26,_*.13]:n?[-.1,l-.23,_*.13]:[.08+h,l-.2,_*.13];a.seg(S,b,.055,.045,v.JEANS,{group:_>0?6:4}),a.seg(b,w,.045,.04,v.JEANS,{group:_>0?6:4}),a.ell(z.add(w,[.05,-.02,0]),[.08,.04,.045],v.SHOES,{group:_>0?6:4,paint:E=>E[1]<w[1]-.04?v.BELLY:void 0})}a.ell([-.04,l+.08,0],[.11,.07,.1],v.JEANS,{group:1});const x=[0+h*.8,l+.26-Math.abs(h)*.3,0];a.ell(x,[.1,.16,.11],v.JACKET,{dir:[h*2.5,1,0],up:[-1,0,0],group:1,paint:_=>_[0]>x[0]+.04&&Math.abs(_[2])<.055?v.TOP:void 0}),s&&a.chain([[...z.add(x,[-.08,-.1,0]),.07],[...z.add(x,[-.2,-.12+d*(.08+u),0]),.05],[...z.add(x,[-.3,-.12+d*(.16+u*1.5),.02]),.025]],v.JACKET,{group:12});const g=z.add(x,[.03+h*.5,.26,0]),m=z.add(g,[r?-.01:-.03,.1,0]);for(const _ of[-1,1]){const S=z.add(x,[.01,.11,_*.11]),b=r&&_>0?z.add(m,[.1,.01,.1]):[.26+h,l+.03,_*.05],w=r&&_>0?z.add(S,[.1,.02,.1]):z.lerp(S,b,.5);a.seg(S,w,.04,.035,v.JACKET,{group:_>0?7:5}),a.seg(w,b,.035,.03,v.JACKET,{group:_>0?7:5}),a.ell(b,[.035,.03,.035],v.SKIN,{group:_>0?7:5})}a.ell(g,[.11,.115,.1],v.SKIN,{group:8,paint:_=>_[0]<g[0]-.01||_[1]>g[1]+.075?v.HAIR:void 0});for(const _ of[-1,1])a.ell(et.surface(g,[.11,.115,.1],z.norm([.85,.05,_*.45])),[.016,.026,.016],v.EYE,{group:8});a.chain([[...z.add(g,[-.06,.02,0]),.06],[...z.add(g,[-.18-f,-.05+u+d*.1,.02]),.045],[...z.add(g,[-.3-f*1.5,-.08+u*1.6+d*.22,.03]),.02]],v.HAIR,{group:9});for(const _ of[-1,1])a.ell(z.add(g,[-.015,0,_*.105]),[.05,.055,.03],v.PHONES,{group:10});a.chain([[...z.add(g,[-.005,.03,-.095]),.015],[...z.add(g,[-.005,.11,-.05]),.015],[...z.add(g,[-.005,.125,0]),.015],[...z.add(g,[-.005,.11,.05]),.015],[...z.add(g,[-.005,.03,.095]),.015]],v.PHONES,{group:10});const p=n?.1:0;if(a.ell(m,[.16,.014,.15],v.HAT,{dir:[1,.25+p*3,0],group:11}),a.chain([[...z.add(m,[0,.01,0]),.085],[...z.add(m,[-.05-f-p*.5,.17-p*.3,0]),.045],[...z.add(m,[-.16-f*1.5-p,.27+u*.5-p*.5,0]),.012]],v.HAT,{group:11,paint:_=>_[1]<m[1]+.045?v.MAGIC:void 0}),s){const _=m_[t],S=Math.cos(_),b=Math.sin(_),w=[0,l,0],E=A=>[w[0]+(A[0]-w[0])*S-(A[1]-w[1])*b,w[1]+(A[0]-w[0])*b+(A[1]-w[1])*S,A[2]],L=A=>[w[0]+(A[0]-w[0])*S+(A[1]-w[1])*b,w[1]-(A[0]-w[0])*b+(A[1]-w[1])*S,A[2]],M=A=>[A[0]*S-A[1]*b,A[0]*b+A[1]*S,A[2]];for(const A of a.parts)if(A.type==="ell"?(A.c=E(A.c),A.axes=A.axes.map(M)):(A.a=E(A.a),A.b=E(A.b)),A.paint){const P=A.paint;A.paint=(F,U)=>P(L(F),U)}for(const A of a.flats)A.c=E(A.c),A.u=M(A.u),A.v=M(A.v);const C=Math.min(...a.parts.map(A=>A.type==="ell"?A.c[1]-Math.max(...A.r):Math.min(A.a[1]-A.r1,A.b[1]-A.r2)));if(C<.08)for(const A of a.parts){const P=.08-C;A.type==="ell"?A.c=[A.c[0],A.c[1]+P,A.c[2]]:(A.a=[A.a[0],A.a[1]+P,A.a[2]],A.b=[A.b[0],A.b[1]+P,A.b[2]])}if(n){const A=E([-.8,l,0]);for(let P=0;P<5;P++){const F=P+i*.5,U=.05-P*.007;a.ell([A[0]-.02+Math.sin(F*2.1)*.06,Math.max(.04,A[1]-.08-F*.09),Math.cos(F*1.7)*.05],[U,U,U],P%2?v.MAGIC:v.MAGIC2,{group:20+P,extra:!0})}}}return a.ell([.02,.005,0],[.2,.005,.12],v.NOSE,{group:0}),a}const nh=(i={})=>Math.round((i.size||8)*Math.sqrt(i.growth||20)*(2/(i.pixel||3))*1.9),$a=new Map,g_=i=>($a.has(i)||$a.set(i,_n(Ko({frame:0}),{height:i}).s),$a.get(i));function x_(i={},{frame:e=0,lean:t=!1,facing:n="towards",pose:r}={}){const s=nh(i),{sp:a}=r?_n(Ko({frame:e,pose:r}),{scale:g_(s),facing:n}):_n(Ko({frame:e,lean:t}),{height:s,facing:n});let o=0;for(let c=0;c<400&&o<6;c++){const l=c*37%a.w,h=c*53%Math.floor(a.h*.8);a.get(l,h)||a.get(l+1,h)||a.get(l-1,h)||a.get(l,h+1)||a.get(l,h-1)||(l*7+h*13+e*5)%11||(a.px(l,h,v.MAGIC2),o++)}return a}const Ks=[{id:"stack",crystal:"cyan",tiers:[["bass",4,[.24,.25,.28]],["mid",2,[.46,.15,.25]],["horn",4,[.21,.22,.23]],["tweet",2,[.21,.08,.17]]]},{id:"wall",crystal:"violet",tiers:[["bass",3,[.31,.3,.3]],["mid",2,[.44,.16,.26]],["horn",2,[.3,.25,.24]],["tweet",1,[.26,.09,.18]]]},{id:"tower",crystal:"amber",tiers:[["bass",2,[.28,.27,.29]],["bass",2,[.25,.24,.27]],["horn",2,[.25,.23,.23]],["tweet",3,[.15,.07,.15]]]}],v_={cyan:[[60,220,255],[210,250,255],[150,205,225]],violet:[[175,95,255],[240,215,255],[180,160,225]],amber:[[255,170,50],[255,238,200],[225,190,140]]};function __(i=0){const[e,t,n]=v_[Ks[i%Ks.length].crystal];return{[v.STONE]:[78,80,94],[v.STONED]:[36,36,48],[v.MOSS]:[72,108,58],[v.CRYSTAL]:n,[v.RUNE]:e,[v.GLOW]:e,[v.MAGIC2]:t,[v.WOOD]:[150,96,52],[v.LINE]:[24,24,34]}}function Wc(i,e,t,n){const r=Ks[i%Ks.length],s=new et({blend:.02}),a=t==="damaged",o=a?0:[0,.5,1][e%3],c=M=>a&&Et(M,e,31)<.5;let l=0,h=1,f=.3,u=0,d=i*7;const x=(M,C,A,P)=>F=>{if(P&&Math.abs(Math.sin(F[0]*37+F[1]*23+Math.sin(F[2]*17)*2))<.07)return v.STONED;if(F[1]>M-.02&&(F[2]>C-.06||Et(Math.floor(F[0]*30),Math.floor(F[2]*30),A)<.2)&&Et(Math.floor(F[0]*40),Math.floor(F[2]*40),A+1)<.6)return v.MOSS},g=(M,C,A,P,F,U)=>{const D=c(U),O=1+o*.08;s.ell([M,C,A],[P*1.18,P*1.18,.06],v.STONED,{group:F,cut:!0}),s.ell([M,C,A-.02],[P*O,P*O,.035+o*.025],v.CRYSTAL,{group:900+U,paint:k=>{const Y=Math.hypot(k[0]-M,k[1]-C)/(P*O);return D?Y<.3?v.GLOW:v.CRYSTAL:Y<.2+o*.15?v.MAGIC2:Y<.5?v.GLOW:Y<.78?v.CRYSTAL:v.GLOW}})},m=(M,C,A,P,F,U,D,O)=>k=>{if(k[0]>M+P-.022){const Y=Math.min(A,F)*1.5,j=(U-F-k[2])/Y+.5,X=(C-k[1])/Y+.5;if(j>=0&&j<=1&&X>=0&&X<=1&&(n?mf(n,j,X,.065):jc(j,X,D,.12)))return a&&Et(D,e,5)<.5?v.STONED:v.RUNE}return O(k)},p=r.tiers,_=p[0][1]*p[0][2][0]+.02,S=.08,b=p[0][2][2];s.box([0,S,f-b],[_,S,b],v.STONE,{group:h,round:.03,rough:.006,paint:x(S*2,f,3,a)}),s.box([0,S*.9,f],[_-.06,S*.45,.12],v.STONED,{group:h,cut:!0,paint:M=>M[2]<f-.07?v.GLOW:void 0});for(let M=1;M<p[0][1];M++)s.box([-_+M*_*2/p[0][1],S*.9,f-.06],[.015,S*.45,.06],v.STONE,{group:h});l=S*2,h++;const w=[];p.forEach(([M,C,[A,P,F]],U)=>{const D=M==="tweet"?.09:0,O=C*A*2+(C-1)*(M==="tweet"?.14:.01),k=f-U*.035,Y=l+D+P;for(let j=0;j<C;j++){const X=-O/2+A+j*(A*2+(M==="tweet"?.14:.01));if(a&&M==="horn"&&j===C-1){w.push([X,A,P,F]);continue}const te=a&&M==="tweet"?[1,.12*(j%2?1:-1),0]:void 0,N=a&&M==="tweet"?Y-.04:Y,re=x(N+P,k-F+F,h,a),oe=j===C-1-(a&&M==="horn"?1:0)&&M!=="tweet";if(s.box([X,N,k-F],[A-.005,P,F],v.STONE,{group:h,round:.035,rough:.004,dir:te,paint:oe?m(X,N,P,A-.005,F,k,d++,re):re}),M==="bass"&&g(X,Y+.02,k,Math.min(A,P)*.72,h,u++),M==="mid"&&(s.ell([X,Y,k],[A*.8,P*.7,F*.9],v.STONED,{group:h,cut:!0,paint:Se=>Se[2]<k-F*.45?c(u)?v.STONED:v.GLOW:void 0}),s.box([X,Y,k-F*.5],[.018,P*.6,F*.45],v.STONE,{group:h}),u++),M==="horn"){const Se=Y+P*.25;s.seg([X,Se,k-F*1.5],[X,Se,k+.03],.03,Math.min(A,P)*.78,v.STONED,{group:h,cut:!0,paint:Ue=>Ue[2]<k-F*.55?c(u)?v.STONED:v.GLOW:void 0}),g(X,Y-P*.6,k,P*.22,h,u++)}if(M==="tweet")for(const Se of[-.5,0,.5])g(X+Se*A*1.15,N,k,P*.55,h,u++);h++}if(M!=="tweet"){const j=a&&M==="horn"?A:0;s.box([-j,l+P*2+.012,k-.015],[O/2+.01-j,.012,.015],v.WOOD,{group:h++,round:.008}),l+=.024}M==="tweet"&&!a&&s.flat([0,l+D/2,k-F],[1,0,0],[0,1,0],O/2,D/2,(j,X)=>Math.abs(X)<.45&&Math.sin(j*23)>-.4?v.GLOW:null,{group:h++,bend:0}),l+=P*2+D});const E=l;if([[-_-.04,.25,.34,-.3],[_+.02,.2,.3,.35],[-_+.15,.4,.22,-.1],[_-.2,.42,.18,.2],[.1,.45,.16,.15],[-_-.1,-.25,.26,-.4],[_+.08,-.2,.24,.45]].forEach(([M,C,A,P],F)=>{if(a&&F%2){s.seg([M,.03,C],[M+.12,.05,C+.04],.04,.02,v.CRYSTAL,{group:700+F});return}const U=[M+P*A,A,C+.05];s.seg([M,0,C],U,.045+A*.05,.006,v.CRYSTAL,{group:700+F,paint:D=>D[1]>A*(.65-o*.1)&&!a?v.GLOW:void 0}),s.seg([M+.04,0,C-.03],[M+.04+P*A*.5,A*.55,C],.03,.005,v.CRYSTAL,{group:720+F})}),!a)for(const[M,C,A,P]of[[-.55,.1,.1,.03],[.6,.16,0,.025],[.15,.24,-.1,.02]])s.ell([M,E+C-.1,A],[P,P*.8,P],v.STONE,{group:800+Math.round(M*100),extra:!0,rough:.004});for(const[M,C,A,P]of w)s.box([M+.45,C*.75,f+.25],[C,A,P],v.STONE,{group:h++,dir:[.6,.8,.2],round:.035,rough:.007,paint:x(1,0,9,!0)});return{m:s,top:E}}function M_(i){const e=new et({blend:.02}),t=(n,r)=>Et(n,r,i*13+7);e.ell([.1,.1,.62],[.14,.12,.1],v.GLOW,{group:1,paint:n=>n[1]>.16?v.MAGIC2:void 0}),e.seg([.1,.1,.6],[.02,.5,.66],.07,.01,v.GLOW,{group:2,paint:n=>n[1]>.35?v.MAGIC2:v.CRYSTAL});for(let n=0;n<16;n++){const r=n*2.4,s=.15+t(n,1)*.75,a=Math.cos(r)*s,o=Math.sin(r)*s*.6,c=.09+t(n,2)*.1,l=Math.max(.05,(.8-s)*.45)+c*.5;e.box([a,l*.7,o],[c*1.3,c,c*1.1],v.STONE,{group:10+n,dir:[Math.cos(r*1.7),.4+t(n,3),Math.sin(r*2.3)],round:.03,rough:.008,paint:h=>Math.abs(Math.sin(h[0]*41+h[1]*29))<.08?v.STONED:h[1]>l*.7+c*.6&&t(n,4)<.25?v.MOSS:void 0})}for(let n=0;n<4;n++){const r=n*1.7+1,s=Math.cos(r)*.4,a=Math.sin(r)*.25;e.ell([s,.05,a],[.09,.08,.03],v.CRYSTAL,{group:50+n,dir:[Math.cos(r),.5,Math.sin(r)],paint:o=>t(n,5)<.3?v.GLOW:void 0})}for(let n=0;n<4;n++){const r=-.7+n*.45;e.seg([r,0,.4-n*.1],[r+.1,.08+t(n,6)*.1,.42-n*.1],.03,.01,v.CRYSTAL,{group:60+n})}return e}function Xc(i,e,t){let n=0;for(let r=0;r<2e3&&n<e;r++){const s=Math.floor(Et(r,t,1)*i.w),a=Math.floor(Et(r,t,2)*i.h*.7);i.get(s,a)||i.get(s+1,a)||i.get(s-1,a)||i.get(s,a+1)||i.get(s,a-1)||i.get(s,a+2)||(i.px(s,a,n%3?v.GLOW:v.MAGIC2),n++)}return i}const S_=i=>nh(i)*3,Za=new Map;function y_(i={},{variant:e=0,frame:t=0,state:n="playing",sigil:r}={}){const s=S_(i),a=e+":"+s;Za.has(a)||Za.set(a,_n(Wc(e,0,"playing").m,{height:s}).s);const o=Za.get(a);if(n==="destroyed")return Xc(_n(M_(e),{scale:o}).sp,3,e*5+1);const{sp:c}=_n(Wc(e,t,n,r).m,{scale:o});return Xc(c,n==="damaged"?4:10+t*2,e*5+t)}const b_=[{k:"ambientHue",g:"Night light",label:"Twilight hue",min:0,max:1,step:.01,v:.68,hue:!0},{k:"ambient",g:"Night light",label:"Twilight brightness",min:.05,max:.6,step:.01,v:.22},{k:"moon",g:"Night light",label:"Moonlight",min:0,max:1,step:.01,v:.3},{k:"moonHue",g:"Night light",label:"Moon hue",min:0,max:1,step:.01,v:.58,hue:!0},{k:"glowHue",g:"Night light",label:"Witch glow hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"glowSat",g:"Night light",label:"Witch glow colour",min:0,max:1,step:.01,v:.35},{k:"glowRadius",g:"Night light",label:"Witch glow reach",min:30,max:200,step:5,v:110},{k:"glowPower",g:"Night light",label:"Witch glow strength",min:.3,max:2.5,step:.05,v:1.4},{k:"bands",g:"Shading",label:"Light steps",min:2,max:7,step:1,v:3},{k:"dither",g:"Shading",label:"Dithering",min:0,max:1,step:.05,v:.35},{k:"round",g:"Shading",label:"Roundness",min:.2,max:1.5,step:.05,v:.9},{k:"outline",g:"Shading",label:"Plant outline",options:["none","dark","tinted"],v:"none"},{k:"cOutline",g:"Shading",label:"Creature outline",options:["dark","tinted","none"],v:"dark"},{k:"shafts",g:"Night light",label:"Moonbeams",min:0,max:1,step:.05,v:.3},{k:"areaContrast",g:"Colour",label:"Difference between areas",min:0,max:1,step:.05,v:.6},{k:"sat",g:"Colour",label:"Saturation",min:.2,max:1.3,step:.01,v:.9},{k:"leafHue",g:"Colour",label:"Leaf hue",min:0,max:1,step:.01,v:.3,hue:!0},{k:"leafVariety",g:"Colour",label:"Leaf colour variety",min:0,max:1,step:.05,v:.3},{k:"trunkHue",g:"Colour",label:"Bark hue",min:0,max:1,step:.01,v:.07,hue:!0},{k:"groundHue",g:"Colour",label:"Ground hue",min:0,max:1,step:.01,v:.27,hue:!0},{k:"groundVal",g:"Colour",label:"Ground brightness",min:.15,max:.7,step:.01,v:.4},{k:"pixel",g:"Shading",label:"Pixel size",min:1,max:5,step:1,v:3},{k:"treeSize",g:"Trees",label:"Tree height",min:.5,max:1.5,step:.05,v:.85},{k:"crownWidth",g:"Trees",label:"Crown width",min:1,max:4,step:.1,v:3},{k:"clearing",g:"Trees",label:"Clearing size",min:0,max:1,step:.05,v:.55},{k:"depth",g:"Map",label:"Border detail (fractal layers)",min:0,max:6,step:1,v:4},{k:"areaScale",g:"Map",label:"Area size (screens)",min:.6,max:2,step:.05,v:1},{k:"areaTypes",g:"Map",label:"Area types",min:4,max:30,step:1,v:30},{k:"density",g:"Trees",label:"Foliage density",min:.2,max:1,step:.05,v:.55},{k:"clump",g:"Trees",label:"Clumpiness",min:0,max:1,step:.05,v:.6},{k:"gnarl",g:"Trees",label:"Gnarliness",min:0,max:1,step:.05,v:.5},{k:"roots",g:"Trees",label:"Roots",min:0,max:1,step:.05,v:.6},{k:"bark",g:"Trees",label:"Bark texture",min:0,max:1,step:.05,v:.6},{k:"trees",g:"Trees",label:"Tree density",min:.2,max:2,step:.05,v:1},{k:"wBroad",g:"Tree mix",label:"Gnarled broadleaf",min:0,max:1,step:.05,v:.8},{k:"wFir",g:"Tree mix",label:"Fir",min:0,max:1,step:.05,v:.6},{k:"wWillow",g:"Tree mix",label:"Willow",min:0,max:1,step:.05,v:.5},{k:"wBirch",g:"Tree mix",label:"Birch",min:0,max:1,step:.05,v:.5},{k:"wPalm",g:"Tree mix",label:"Tree fern",min:0,max:1,step:.05,v:.3},{k:"wFlat",g:"Tree mix",label:"Flat-crowned",min:0,max:1,step:.05,v:.5},{k:"bushes",g:"Undergrowth",label:"Bushes and shrubs",min:0,max:120,step:1,v:55},{k:"bushSize",g:"Undergrowth",label:"Bush size",min:.5,max:1.8,step:.05,v:1},{k:"flowers",g:"Undergrowth",label:"Flowers",min:0,max:1,step:.05,v:.3},{k:"cSat",g:"Creatures",label:"Creature saturation",min:.1,max:1,step:.01,v:.6},{k:"cVal",g:"Creatures",label:"Creature brightness",min:.4,max:1,step:.01,v:.85},{k:"head",g:"Creatures",label:"Baby head size",min:.3,max:.6,step:.01,v:.44},{k:"eye",g:"Creatures",label:"Eye size",min:.5,max:2,step:.05,v:1},{k:"legs",g:"Creatures",label:"Leg length",min:.5,max:1.8,step:.05,v:1},{k:"long",g:"Creatures",label:"Body length",min:.7,max:1.5,step:.05,v:1},{k:"size",g:"Creatures",label:"Baby size (px)",min:5,max:14,step:1,v:8},{k:"growth",g:"Creatures",label:"Legend vs baby height",min:5,max:25,step:1,v:20},{k:"magicHue",g:"Creatures",label:"Magic glow hue",min:0,max:1,step:.01,v:.5,hue:!0},{k:"fur",g:"Creatures",label:"Stripes and spots",min:0,max:1,step:.05,v:.5},{k:"cloakHue",g:"Witch",label:"Jacket hue",min:0,max:1,step:.01,v:.72,hue:!0},{k:"hairHue",g:"Witch",label:"Hair hue",min:0,max:1,step:.01,v:.01,hue:!0},{k:"hatHue",g:"Witch",label:"Hat hue",min:0,max:1,step:.01,v:.74,hue:!0},{k:"topHue",g:"Witch",label:"Top hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"jeansHue",g:"Witch",label:"Jeans hue",min:0,max:1,step:.01,v:.6,hue:!0},{k:"shoeHue",g:"Witch",label:"Sneakers hue",min:0,max:1,step:.01,v:0,hue:!0},{k:"phonesHue",g:"Witch",label:"Headphones hue",min:0,max:1,step:.01,v:.92,hue:!0}];function w_(){const i={};return b_.forEach(e=>i[e.k]=e.v),i}const E_={broad:ou,fir:il,willow:lu,birch:cu,flat:uu};function T_(i,e,t,n,r){const s=E_[e.type],a={...t,leafHue:i.leaf+(e.dark?.05:0),gnarl:e.gnarl??t.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},o=s(n,a,t.treeSize*r*(e.scale||1)*ye(n,.9,1.1)),c=rl(n,a,s);return e.dark&&(c[v.LEAF]=c[v.LEAF3],c[v.LEAF3]=we(i.leaf+.05,.7,.22)),c[v.NOSE]=[20,16,24],c[v.GLINT]=[235,235,240],{parts:xf(o),colours:c}}function A_(i,e,t,n,r){const s=fn[t].id,a=sl.find(d=>d.id===s),o=yf(s,i,{K:n,makeCanvas:r}),c=[],l=d=>c.push(d)-1,h={big:[],small:[],walls:[],set:null},f=(d,x)=>hi(d,x,i,"none",r),u=(d,x)=>{const{parts:g,colours:m}=T_(a,d,i,di(e*13+t*101+x*7+1),n);return{bot:l(f(g.bot,m)),top:l(f(g.top,m))}};a.big.forEach(([d,x],g)=>{if(d!=="tree"){h.big.push({bot:l(o.big[g].sp),top:null});return}const m=Math.max(1,Math.round(du/a.big.length));for(let p=0;p<m;p++)h.big.push(u(x,g*17+p))}),a.small.forEach(([d,x],g)=>h.small.push(d==="tree"?u(x,500+g):{bot:l(o.small[g].sp),top:null}));for(const d of o.walls)h.walls.push(l(d.sp));return o.setPiece&&(h.set=a.set?.[0]==="tree"?u(a.set[1],900):{bot:l(o.setPiece.sp),top:null}),{sprites:c,layout:h,floor:o.floor.sp}}function Yc(i,e,t,n=null){const r=[];for(const s of["towards","away"])for(let a=0;a<4;a++)for(let o=0;o<2;o++)r.push(hi(tf(e,a,o,i,s,n),Qh(e,i,n),i,i.cOutline,t));return r}const C_=(i,e,t=!1)=>(t?8:0)+i*2+e;function $s(i,e,t){return i.getContext("2d").getImageData(0,0,e,t).data}function Ns(i,e=2048){const n=[];let r=0,s=0,a=0,o=1;for(const u of i)r+u.w+1>e&&(r=0,s+=a+1,a=0),n.push({x:r,y:s}),r+=u.w+1,a=Math.max(a,u.h),o=Math.max(o,r);const c=Math.max(1,s+a),l=new Uint8Array(o*c*4),h=new Uint8Array(o*c*4),f=i.map((u,d)=>{const x=n[d],g=$s(u.A,u.w,u.h),m=$s(u.N,u.w,u.h);for(let p=0;p<u.h;p++){const _=p*u.w*4,S=((x.y+p)*o+x.x)*4;l.set(g.subarray(_,_+u.w*4),S),h.set(m.subarray(_,_+u.w*4),S)}return{uv:[x.x/o,x.y/c,(x.x+u.w)/o,(x.y+u.h)/c],w:u.w,h:u.h}});return{albedo:l,normal:h,width:o,height:c,frames:f}}function R_(i,e){if(i.kind==="creature")return{px:Ns(Yc(i.style,i.id,e),2048)};if(i.kind==="party")return{px:Ns(Yc(i.style,i.species,e,{...Jh(i.seed),collar:i.colour}),2048)};const{sprites:t,layout:n,floor:r}=A_(i.style,i.seed,i.id,i.K,e);return{px:Ns(t),layout:n,floor:{albedo:new Uint8Array($s(r.A,r.w,r.h)),normal:new Uint8Array($s(r.N,r.w,r.h)),w:r.w,h:r.h}}}function qc(i,e,t){const n=new ir(i,e,t,ln,on);return n.magFilter=Dt,n.minFilter=Dt,n.generateMipmaps=!1,n.flipY=!1,n.colorSpace=An,n.needsUpdate=!0,n}function ih(i){return{albedo:qc(i.albedo,i.width,i.height),normal:qc(i.normal,i.width,i.height),frames:i.frames}}const ys=(i,e=2048)=>ih(Ns(i,e));class L_{constructor(e,t,n){this.style=e,this.seed=t,this.K=2/n;const r=p_(e),s=c=>hi(x_(e,c),r,e,e.cOutline);this.witch=ys([0,1,2].map(c=>s({frame:c})).concat([0,1,2].map(c=>s({frame:c,facing:"away"})),[s({lean:!0}),s({lean:!0,facing:"away"})]),1024),this.stones=ys([0,1,2,3].map(c=>this.stone(c)));const a=Af(e);this.props=ys([...a.campfire,a.stones.cyan,a.stones.violet,a.stones.green],1024);const o=[];for(let c=0;c<3;c++)for(let l=0;l<3;l++)o.push(hi(y_(e,{variant:c,frame:l,state:"playing"}),__(c),e,e.cOutline));if(this.soundsystems=ys(o,2048),this.useWorkers=typeof Worker<"u"&&typeof OffscreenCanvas<"u",this.useWorkers){const c=Math.max(1,Math.min(3,(navigator.hardwareConcurrency||2)-1));try{for(let l=0;l<c;l++){const h=new Worker(new URL(""+new URL("artWorker-0-2S_dtN.js",import.meta.url).href,import.meta.url),{type:"module"}),f={w:h,busy:!1};h.onmessage=u=>{f.busy=!1,f.job=void 0,this.receive(u.data),this.dispatch()},h.onerror=()=>{this.useWorkers=!1,f.job&&this.queue.unshift(f.job),f.busy=!1,f.job=void 0},this.workers.push(f)}}catch{this.useWorkers=!1}}}style;seed;types=new Map;creatures=new Map;queue=[];inFlight=new Set;workers=[];useWorkers;witch;stones;props;soundsystems;K;version=0;onFloor=()=>{};stone(e){const t=di(this.seed*3+e),n=5+Math.floor(t()*3),r=7+Math.floor(t()*5),s=new nn(n+2,r+1);return s.ellipse((n+2)/2,r/2+1,n/2,r/2+.5,v.BODY,{round:this.style.round}),s.ellipse((n+2)/2-1,r/2,n/3,r/3,v.BODY2,{round:this.style.round,onlyOn:new Set([v.BODY]),density:.5,seed:e}),hi(s,{[v.BODY]:[178,174,162],[v.BODY2]:[140,138,130]},this.style,"dark")}key=e=>e.kind+":"+e.id;ask(e){const t=this.key(e);this.inFlight.has(t)||(this.inFlight.add(t),this.queue.push(e),this.dispatch())}dispatch(){if(this.useWorkers)for(const e of this.workers)e.busy||!this.queue.length||(e.busy=!0,e.job=this.queue.shift(),e.w.postMessage(e.job))}receive(e){if(!e.result){console.warn("art worker failed, drawing on the page:",e.error),this.useWorkers=!1,this.queue.unshift(e.job);return}const t=ih(e.result.px);e.job.kind==="type"?(this.types.set(e.job.id,{atlas:t,layout:e.result.layout}),e.result.floor&&this.onFloor(e.job.id,e.result.floor)):this.creatures.set(e.job.id,{atlas:t,frame:C_}),this.inFlight.delete(this.key(e.job)),this.version++}typeArt(e){const t=this.types.get(e);return t||this.ask({kind:"type",id:e,style:this.style,seed:this.seed,K:this.K}),t}creatureArt(e){const t=this.creatures.get(e);return t||this.ask({kind:"creature",id:e,style:this.style}),t}partyArt(e,t,n){const r=`party-${t}`,s=this.creatures.get(r);return s||this.ask({kind:"party",id:r,species:e,seed:t,colour:n,style:this.style}),s}prefetchType(e){this.types.has(e)||this.typeArt(e)}get pending(){return this.inFlight.size}work(e){if(this.useWorkers)return;const t=performance.now();let n=0;for(;this.queue.length&&(n===0||performance.now()-t<e);){const r=this.queue.shift();this.receive({job:r,result:R_(r,(s,a)=>{const o=document.createElement("canvas");return o.width=s,o.height=a,o})}),n++}}whenIdle(){return new Promise(e=>{const t=()=>{this.work(50),this.pending?setTimeout(t,30):e()};t()})}}const ur=24,at={uAmb:{value:new W},uMoon:{value:new W},uMoonDir:{value:new W(-.45,.75,.5).normalize()},uMoonBeam:{value:new W},uBands:{value:4},uDither:{value:.35},uShafts:{value:.3},uShaftScale:{value:1},uGlowPos:{value:new W},uGlowRgb:{value:new W},uGlowR:{value:8},uGlowPower:{value:1.4},uHazeCentre:{value:new He},uHazeRange:{value:new He(70,200)},uHazeColour:{value:new W},uTime:{value:0},uSmooth:{value:1},uLightPos:{value:Array.from({length:ur},()=>new ot)},uLightCol:{value:Array.from({length:ur},()=>new ot)},uLightCount:{value:0},uDisco:{value:new ot},uDiscoParams:{value:new ot},uDiscoColour:{value:new W(1,1,1)}};function P_(i,e,t,n=1){const r=(s,a)=>new W(s[0]/255*a,s[1]/255*a,s[2]/255*a);at.uAmb.value.copy(r(we(i.ambientHue,.55,1),i.ambient*n)),at.uMoon.value.copy(r(we(i.moonHue,.35,1),i.moon)),at.uMoonBeam.value.copy(r(we(i.moonHue,.35,1),i.shafts*.25)),at.uBands.value=i.bands,at.uDither.value=i.dither*.5,at.uShafts.value=i.shafts,at.uShaftScale.value=t*2,at.uGlowRgb.value.copy(r(we(i.glowHue,i.glowSat,1),1)),at.uGlowR.value=e,at.uGlowPower.value=i.glowPower,at.uHazeColour.value.copy(r(we(i.ambientHue-.08,.55,1),.16*Math.sqrt(n)))}const jn=`
uniform vec3 uAmb, uMoon, uMoonDir, uMoonBeam, uGlowPos, uGlowRgb;
uniform float uBands, uDither, uShafts, uShaftScale, uGlowR, uGlowPower, uTime, uSmooth;
uniform vec2 uHazeCentre, uHazeRange;
uniform vec3 uHazeColour;
uniform vec4 uLightPos[${ur}], uLightCol[${ur}];
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
`,li=2,Xt=32,Ei=8,D_=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`,I_=`
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
`;class U_{constructor(e,t,n,r){this.map=e,this.forest=t;const s=e.extent,a=s.maxX-s.minX,o=s.maxZ-s.minZ,c=Math.ceil(a*li/Xt)*Xt,l=Math.ceil(o*li/Xt)*Xt;this.tilesX=c/Xt,this.tilesZ=l/Xt,this.filled=new Uint8Array(this.tilesX*this.tilesZ);const h=x=>(x.magFilter=x.minFilter=Dt,x.generateMipmaps=!1,x.colorSpace=An,x.needsUpdate=!0,x);this.texture=h(new ir(new Uint8Array(c*l*4),c,l)),h(this.tile),this.floors=h(new ir(new Uint8Array(64*Ei*48*4*4),64*Ei,192));const f=Array.from({length:32},(x,g)=>new W(...fn[g]?.floor??[.25,.45,.4])),u=new Tt({vertexShader:D_,fragmentShader:I_,uniforms:{...at,uAreas:{value:this.texture},uExtent:{value:new ot(s.minX,s.minZ,c/li,l/li)},uPixel:{value:r},uTypeFloor:{value:f},uFloorReady:{value:this.floorReady},uFloors:{value:this.floors},uTile:{value:new He(64,48)},uFloorsSize:{value:new He(64*Ei,192)},uSat:{value:n.sat},uFloor:{value:new W(e.dancefloor.x,e.dancefloor.z,e.dancefloor.radius)},uCanopy:{value:new ot},uCircle:{value:new ot},uSweeps:{value:Array.from({length:4},()=>new ot)},uSweepCount:{value:0},uClearing:{value:new He(e.tuning.clearingSize,e.tuning.clearingFalloff)}}}),d=new dn(a+400,o+400);d.rotateX(-Math.PI/2),this.mesh=new Vt(d,u),this.mesh.position.set((s.minX+s.maxX)/2,0,(s.minZ+s.maxZ)/2)}map;forest;mesh;texture;tile=new ir(new Uint8Array(Xt*Xt*4),Xt,Xt);filled;tilesX;tilesZ;initialised=!1;floorReady=new Array(32).fill(0);floors;pendingFloors=[];setSweeps(e){const t=this.mesh.material.uniforms,n=t.uSweeps.value;e.slice(0,4).forEach((r,s)=>n[s].set(r.x,r.z,r.radius,r.strength)),t.uSweepCount.value=Math.min(4,e.length)}setCircle(e,t,n,r){this.mesh.material.uniforms.uCircle.value.set(e,t,n,r)}setCanopyShadow(e,t,n,r){this.mesh.material.uniforms.uCanopy.value.set(e,t,n,r)}setFloor(e,t){this.pendingFloors.push([e,t])}placeFloors(e){for(const[t,n]of this.pendingFloors){const r=this.mesh.material,s=r.uniforms.uTile.value;if(n.w!==s.x||n.h!==s.y)continue;const a=new ir(n.albedo,n.w,n.h);a.needsUpdate=!0,e.copyTextureToTexture(a,this.floors,null,new He(t%Ei*n.w,Math.floor(t/Ei)*n.h)),a.dispose(),this.floorReady[t]=1}this.pendingFloors=[]}fill(e,t,n,r,s){this.initialised||(e.initTexture(this.texture),e.initTexture(this.floors),this.initialised=!0),this.pendingFloors.length&&this.placeFloors(e);const a=this.map.extent,o=Xt/li,c=Math.max(0,Math.floor((t.minX-a.minX)/o)),l=Math.min(this.tilesX-1,Math.floor((t.maxX-a.minX)/o)),h=Math.max(0,Math.floor((t.minZ-a.minZ)/o)),f=Math.min(this.tilesZ-1,Math.floor((t.maxZ-a.minZ)/o)),u=(n-a.minX)/o,d=(r-a.minZ)/o,x=[];for(let p=h;p<=f;p++)for(let _=c;_<=l;_++)this.filled[p*this.tilesX+_]||x.push([_,p,(_+.5-u)**2+(p+.5-d)**2]);x.sort((p,_)=>p[2]-_[2]);const g=performance.now();let m=0;for(const[p,_]of x){if(m>0&&performance.now()-g>s)break;this.fillTile(e,p,_),m++}return x.length-m}fillTile(e,t,n){const r=this.map.extent,s=this.tile.image.data,a=Xt/li,o=r.minX+t*a,c=r.minZ+n*a,l=this.forest.lightsNear(o+a/2,c+a/2,a/2+6).filter(h=>h.kind==="pond");for(let h=0;h<Xt;h++)for(let f=0;f<Xt;f++){const u=o+(f+.5)/li,d=c+(h+.5)/li,x=this.map.areaAt(u,d),g=(h*Xt+f)*4;let m=0;for(const p of l)Math.hypot(u-p.x,d-p.z)<3*p.size&&(m=255);s[g]=x.type,s[g+1]=Math.round(x.openness*255),s[g+2]=m,s[g+3]=255}this.tile.needsUpdate=!0,e.copyTextureToTexture(this.tile,this.texture,null,new He(t*Xt,n*Xt)),this.filled[n*this.tilesX+t]=1}dispose(){this.texture.dispose(),this.tile.dispose(),this.mesh.geometry.dispose(),this.mesh.material.dispose()}}const N_="varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",F_=`
uniform sampler2D uScene; uniform float uThreshold; varying vec2 vUv;
void main() {
  vec3 c = texture2D(uScene, vUv).rgb;
  float l = max(c.r, max(c.g, c.b));
  gl_FragColor = vec4(c * smoothstep(uThreshold, uThreshold + 0.25, l), 1.0);
}`,O_=`
uniform sampler2D uSrc; uniform vec2 uStep; varying vec2 vUv;
void main() {
  vec4 c = texture2D(uSrc, vUv) * 0.227;
  c += (texture2D(uSrc, vUv + uStep * 1.38) + texture2D(uSrc, vUv - uStep * 1.38)) * 0.316;
  c += (texture2D(uSrc, vUv + uStep * 3.23) + texture2D(uSrc, vUv - uStep * 3.23)) * 0.070;
  gl_FragColor = c;
}`,B_=`
uniform sampler2D uScene, uBloom, uFx; uniform vec2 uLow; uniform float uBloomStrength, uBlack, uGamma, uFxOn; varying vec2 vUv;
void main() {
  vec2 p = (floor(vUv * uLow) + 0.5) / uLow;
  vec3 c = texture2D(uScene, p).rgb;
  if (uFxOn > 0.5) { vec4 f = texture2D(uFx, vUv); c = c * (1.0 - f.a) + f.rgb; }
  // Levels: a black point and a gamma, so the shade goes near-black and the lit stays bright.
  c = pow(clamp((c - uBlack) / (1.0 - uBlack), 0.0, 1.0), vec3(uGamma));
  c += texture2D(uBloom, vUv).rgb * uBloomStrength;
  gl_FragColor = vec4(min(c, vec3(1.0)), 1.0);
}`,z_=`
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
}`;function bi(i,e,t,n=!1){const r=new Mn(Math.max(1,i),Math.max(1,e),{minFilter:t,magFilter:t,depthBuffer:n,generateMipmaps:!1});return r.texture.colorSpace=An,r}class k_{constructor(e,t){this.renderer=e,this.tuning=t,this.scene=bi(1,1,Rt,!0),this.scene.depthTexture=new mr(1,1),this.fx.texture.format=ln;const n=(r,s)=>new Tt({vertexShader:N_,fragmentShader:r,uniforms:s,depthTest:!1,depthWrite:!1});this.mats={bright:n(F_,{uScene:{value:null},uThreshold:{value:.6}}),blur:n(O_,{uSrc:{value:null},uStep:{value:new He}}),composite:n(B_,{uScene:{value:null},uBloom:{value:null},uLow:{value:new He},uBloomStrength:{value:0},uBlack:{value:0},uGamma:{value:1},uFx:{value:null},uFxOn:{value:0}}),tilt:n(z_,{uSrc:{value:null},uTexel:{value:new He},uDir:{value:new He},uStrength:{value:0},uBand:{value:.4},uCentre:{value:.5}})},this.quad=new Vt(new dn(2,2),this.mats.composite),this.quad.frustumCulled=!1}renderer;tuning;scene;bright=bi(1,1,Rt);bloomB=bi(1,1,Rt);a=bi(1,1,Rt);b=bi(1,1,Rt);fx=bi(1,1,Rt);fxB=bi(1,1,Rt);fxScene=null;quad;cam=new vl(-1,1,1,-1,0,1);mats;low=new He(1,1);out=new He(1,1);get fullResolution(){return this.tuning.tiltShift.on&&this.tuning.tiltShift.where==="after"}get lowSize(){return this.low}resize(e,t,n,r){this.low.set(e,t),this.fx.setSize(e,t),this.fxB.setSize(e,t),this.out.set(n,r),this.scene.setSize(e,t);const s=Math.max(1,Math.round(e/2)),a=Math.max(1,Math.round(t/2));this.bright.setSize(s,a),this.bloomB.setSize(s,a);const o=this.fullResolution?n:e,c=this.fullResolution?r:t;this.a.setSize(o,c),this.b.setSize(o,c)}pass(e,t,n){const r=this.mats[e];n(r.uniforms),this.quad.material=r,this.renderer.setRenderTarget(t),this.renderer.render(this.quad,this.cam)}render(e,t){const n=this.renderer,r=this.tuning;n.setRenderTarget(this.scene),n.render(e,t);const s=r.bloom.on&&r.bloom.strength>0;if(s){const u=this.bright.width,d=this.bright.height;this.pass("bright",this.bright,x=>{x.uScene.value=this.scene.texture,x.uThreshold.value=r.bloom.threshold});for(let x=0;x<2;x++)this.pass("blur",this.bloomB,g=>{g.uSrc.value=this.bright.texture,g.uStep.value.set(1/u,0)}),this.pass("blur",this.bright,g=>{g.uSrc.value=this.bloomB.texture,g.uStep.value.set(0,1/d)})}const a=!!this.fxScene;if(this.fxScene){const u=n.getClearColor(new Qe),d=n.getClearAlpha();n.setRenderTarget(this.fx),n.setClearColor(0,0),n.clear(),n.render(this.fxScene,t),n.setClearColor(u,d);const x=this.fx.width,g=this.fx.height;this.pass("blur",this.fxB,m=>{m.uSrc.value=this.fx.texture,m.uStep.value.set(.6/x,0)}),this.pass("blur",this.fx,m=>{m.uSrc.value=this.fxB.texture,m.uStep.value.set(0,.6/g)})}const o=r.tiltShift.on&&r.tiltShift.strength>0;if(this.pass("composite",o?this.a:null,u=>{u.uScene.value=this.scene.texture,u.uBloom.value=this.bright.texture,u.uLow.value.copy(this.low),u.uBloomStrength.value=s?r.bloom.strength:0,u.uBlack.value=r.tone.black,u.uGamma.value=r.tone.gamma,u.uFx.value=this.fx.texture,u.uFxOn.value=a?1:0}),!o)return;const c=this.a.width,l=this.a.height,h=this.fullResolution?this.out.y/this.low.y:1,f=u=>{u.uTexel.value.set(1/c,1/l),u.uStrength.value=r.tiltShift.strength*h,u.uBand.value=r.tiltShift.band,u.uCentre.value=1-r.tiltShift.centre};this.pass("tilt",this.b,u=>{f(u),u.uSrc.value=this.a.texture,u.uDir.value.set(1,0)}),this.pass("tilt",null,u=>{f(u),u.uSrc.value=this.b.texture,u.uDir.value.set(0,1)})}}const G_=`
uniform vec3 uRight, uUp;
uniform float uSize;
varying vec2 vUv;
void main() {
  vUv = uv * 2.0 - 1.0;
  vec3 w = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz + (uRight * position.x + uUp * position.y) * uSize;
  gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
}`,H_=`
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
}`,V_=`
uniform vec3 uTint;
void main() {
  if (mod(floor(gl_FragCoord.y), 3.0) > 0.5) discard; // faint: a dotted thread of light
  gl_FragColor = vec4(uTint, 1.0);
}`,W_=`
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
}`,X_=`
uniform vec3 uTint;
varying float vA;
void main() { if (vA < 0.15) discard; gl_FragColor = vec4(uTint * (0.5 + vA), 1.0); }`;class Y_{constructor(e,t,n,r){this.tuning=t;const s=t.dancefloor,a=e.dancefloor;this.centre=new W(a.x,0,a.z);const o=new W(...we(s.circleHue2,.4,1).map(m=>m/255));this.ballMat=new Tt({vertexShader:G_,fragmentShader:H_,uniforms:{...n,uSize:{value:s.discoSize/2},uTime:at.uTime,uSpin:{value:s.spin/60*Math.PI*2},uPixels:{value:Math.max(6,Math.round(s.discoSize/r))},uTint:{value:o}}}),this.ball=new Vt(new dn(2,2),this.ballMat),this.ball.frustumCulled=!1;const c=60;this.beam=new Vt(new dn(r,c).translate(0,c/2,0),new Tt({fragmentShader:V_,uniforms:{uTint:{value:o.clone().multiplyScalar(.5)}}})),this.beam.frustumCulled=!1;const l=s.motes,h=[],f=[];for(let m=0;m<l.count;m++){const p=b=>{const w=Math.sin(m*12.9898+b*78.233)*43758.5453;return w-Math.floor(w)},_=p(1)*Math.PI*2,S=Math.sqrt(p(2))*a.radius*l.column;h.push(a.x+Math.cos(_)*S,.3,a.z+Math.sin(_)*S),f.push(p(3),l.speed*(.6+p(4)*.8),.4+p(5)*1.2,0)}const u=new Ht;u.setAttribute("position",new Lt(h,3)),u.setAttribute("aMote",new Lt(f,4));const d=we(s.circleHue,.55,1);this.motes=new qs(u,new Tt({vertexShader:W_,fragmentShader:X_,uniforms:{uTime:at.uTime,uRise:{value:l.rise},uTint:{value:new W(d[0]/255,d[1]/255,d[2]/255)}},transparent:!0,depthWrite:!1,blending:dr})),this.motes.frustumCulled=!1;const x=we(s.circleHue,.7,1);this.lightRgb=new W(x[0]/255,x[1]/255,x[2]/255);const g=at;g.uDiscoParams.value.set(s.spin/60*Math.PI*2,s.specks,s.speckBrightness,s.speckReach),g.uDiscoColour.value.copy(o)}tuning;ball;beam;motes;ballMat;lightRgb;centre;update(e,t){const n=this.tuning.dancefloor,r=.75+.25*Math.sin(e*n.pulse*Math.PI*2);t.setCircle(n.circleHue,n.circleHue2,.7+.3*r,e*n.runeSpeed/60*Math.PI*2);const s=n.discoHeight+Math.sin(e*.8)*.3;return this.ball.position.set(this.centre.x,s,this.centre.z),this.beam.position.set(this.centre.x,s+n.discoSize/2,this.centre.z),at.uDisco.value.set(this.centre.x,s,this.centre.z,1),{x:this.centre.x,y:2.5,z:this.centre.z,reach:n.lightReach,rgb:this.lightRgb,strength:n.lightStrength*r}}}const q_=[new W(.25,.85,1),new W(.7,.4,1),new W(1,.65,.2)];class K_{constructor(e,t){this.atlas=e,this.metresPerPixel=t}atlas;metresPerPixel;homeSoundsystem(e){const t=e.map.dancefloor;return{x:t.x+t.radius+5,z:t.z+3,variant:0,at:-1/0,from:null}}update(e,t,n,r){const s=e.tuning.party,a=[],o=[],c=[],l=[],h=[this.homeSoundsystem(e)];for(const[,f]of e.party.areas){if(!f.soundsystem)continue;const u=f.from?e.map.siteOf(f.from[0],f.from[1]):null;h.push({...f.soundsystem,at:f.at,from:u})}for(const f of h){const u=s.transition>0?Math.min(1,(t-f.at)/s.transition):1,d=this.atlas.frames[f.variant*3+Math.floor(t*6)%3],x=d.h*this.metresPerPixel,g=hn((u-.55)/.45);if(u<1&&f.from){const p=(f.from.x+f.x)/2,_=(f.from.z+f.z)/2,S=Math.hypot(f.x-p,f.z-_)*1.6;c.push({x:p,z:_,radius:u*S,strength:1-hn((u-.8)/.2)})}g>0&&n(f.x,f.z,d.w*this.metresPerPixel,x)&&a.push({x:f.x,y:-(1-g)*x,z:f.z,frame:d,flip:!1,fresh:r(f.x,f.z,x)}),u>=1&&l.push({x:f.x,y:x*.85,z:f.z,seed:Math.floor(Math.abs(f.x*7.3+f.z*13.1))%1e5,ready:f.at+s.transition});const m=.85+.15*Math.sin(t*8);g>0&&o.push({x:f.x,y:3,z:f.z,reach:s.lightReach,rgb:q_[f.variant%3],strength:s.lightStrength*m*g*(1+(1-u)*2)})}return{items:a,lights:o,sweeps:c,playing:l}}}function $_(i,e,t){const n=i.tuning.stringLights,r=i.siteOf(t[0],t[1]),s=di(i.seed*53+t[0]*1031+t[1]*7+509),a=u=>{const d=i.areaAt(u.x,u.z).cell;return d[0]===t[0]&&d[1]===t[1]},o=u=>Xe(Math.round(u.x*10),Math.round(u.z*10),i.seed+501),c=e.treesNear(r.x,r.z,i.areaSize*1.3).filter(a).sort((u,d)=>o(u)-o(d)),l=new Set,h=[],f=[];for(const u of c){if(f.length>=n.perArea)break;if(l.has(u)||h.some(p=>Math.hypot(p.x-u.x,p.z-u.z)<n.spread))continue;h.push(u);let d=u,x=0,g=0;const m=1+Math.floor(s()*n.chainMax);l.add(u);for(let p=0;p<m&&f.length<n.perArea;p++){const _=[];for(const w of c){if(l.has(w))continue;const E=w.x-d.x,L=w.z-d.z,M=Math.hypot(E,L);if(!(M<n.spanMin||M>n.spanMax)&&!(p>0&&(E*x+L*g)/M<.5)&&(_.push(w),_.length>24))break}if(!_.length)break;const S=_[Math.floor(s()*_.length)],b=Math.hypot(S.x-d.x,S.z-d.z);f.push({ax:d.x,az:d.z,bx:S.x,bz:S.z,seed:Math.floor(Xe(Math.round(d.x*10),Math.round(S.z*10),i.seed+503)*1e6)}),l.add(S),x=(S.x-d.x)/b,g=(S.z-d.z)/b,d=S}}return f}const Z_=`
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
}`,J_=`
uniform float uTwinkle, uChase;
varying vec3 vColour;
varying vec3 vWorld;
varying float vOn;
varying vec2 vB;
${jn}
void main() {
  if (vOn < 0.5) discard;
  float b = 1.0 - uTwinkle * 0.5 * (1.0 + sin(uTime * (1.3 + vB.x) + vB.x * 40.0));
  if (fract((vB.y - uTime * uChase) / 60.0) < 0.06) b = 1.4;  // a chase running along now and then
  gl_FragColor = vec4(haze(vColour * b * 1.6, vWorld), 1.0); // bright enough to bloom
}`,Q_=`
attribute float aSway;
uniform float uWind, uTime;
varying vec3 vWorld;
void main() {
  vec3 p = position;
  p.x += sin(uTime * uWind + aSway * 6.0) * 0.18 * fract(aSway * 7.0);
  vWorld = p;
  gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
}`,j_=`
varying vec3 vWorld;
${jn}
void main() { gl_FragColor = vec4(haze(vec3(0.03, 0.025, 0.04), vWorld), 1.0); }`,eM=`
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
}`,tM=`
uniform vec3 uMoteColour;
varying float vA;
varying vec3 vWorld;
${jn}
void main() {
  if (vA < 0.3) discard;
  gl_FragColor = vec4(haze(uMoteColour * (0.6 + 0.6 * vA), vWorld), 1.0);
}`;class nM{constructor(e,t){this.scene=e,this.game=t;const n=t.tuning.stringLights;this.palette=n.palette.map(s=>new Qe(s));const r={...at,uWind:{value:t.tuning.canopyShadow.wind*1.5}};this.bulbMat=new Tt({vertexShader:Z_,fragmentShader:J_,uniforms:{...r,uNear:{value:240},uTwinkle:{value:n.twinkle},uChase:{value:n.chaseSpeed}}}),this.wireMat=new Tt({vertexShader:Q_,fragmentShader:j_,uniforms:r}),this.moteMat=new Tt({vertexShader:eM,fragmentShader:tM,uniforms:{...at,uMoteColour:{value:new Qe(1,.85,1)}}})}scene;game;built=new Map;palette;bulbMat;wireMat;moteMat;build(e,t,n,r){const s=this.game.tuning.stringLights,a=s.height,o=[],c=[],l=[],h=[],f=[];e.forEach((S,b)=>{const w=Math.hypot(S.bx-S.ax,S.bz-S.az),E=Math.max(2,Math.round(w/s.bulbSpacing)),L=M=>[S.ax+(S.bx-S.ax)*M,a-s.sag*4*M*(1-M)*(w/8),S.az+(S.bz-S.az)*M];for(let M=0;M<=16;M++){const C=L(M/16),A=L((M+1)/16);M<16&&(h.push(...C,...A),f.push(b+M/16,b+(M+1)/16))}for(let M=1;M<E;M++){const C=M/E,A=L(C),P=this.palette[(S.seed+M)%this.palette.length];o.push(...A),c.push(P.r,P.g,P.b),l.push((S.seed*13+M*7)%100/100,b*40+M,t(A[0],A[2])+M*.03,4*C*(1-C))}});const u=new Fr,d=new Ht;d.setAttribute("position",new Lt(o,3)),d.setAttribute("aColour",new Lt(c,3)),d.setAttribute("aBulb",new Lt(l,4));const x=new Ht;x.setAttribute("position",new Lt(h,3)),x.setAttribute("aSway",new Lt(f,1)),u.add(new Hu(x,this.wireMat),new qs(d,this.bulbMat));const g=[],m=[];for(let S=0;S<48;S++){const b=C=>{const A=Math.sin(r*12.9898+S*78.233+C*37.719)*43758.5453;return A-Math.floor(A)},w=b(1)*Math.PI*2,E=2+b(2)*14,L=n.x+Math.cos(w)*E,M=n.z+Math.sin(w)*E;g.push(L,.3,M),m.push(b(3),.4+b(4)*.6,.3+b(5)*.8,t(L,M))}const p=new Ht;p.setAttribute("position",new Lt(g,3)),p.setAttribute("aMote",new Lt(m,4));const _=new qs(p,this.moteMat);return _.frustumCulled=!1,u.add(_),u.traverse(S=>{S.frustumCulled=!1}),u}update(){const e=this.game;if(!e.tuning.stringLights.on)return;let n=0;for(const[r,s]of e.party.areas){let a=this.built.get(r);if(!a){if(n++>=2)break;const o=$_(e.map,e.forest,s.cell),c=e.map.siteOf(s.cell[0],s.cell[1]),l=s.from?e.map.siteOf(s.from[0],s.from[1]):null,h=l?(l.x+c.x)/2:c.x,f=l?(l.z+c.z)/2:c.z,u=l?Math.hypot(c.x-h,c.z-f)*1.6:1,d=e.tuning.party.transition,x=(m,p)=>s.wave===0?-1:s.at+Math.min(1,Math.hypot(m-h,p-f)/u)*d,g=s.soundsystem??(s.wave===0?e.map.dancefloor:c);a={lines:o,group:this.build(o,x,g,s.cell[0]*131+s.cell[1]*17+e.seed),on:s.wave===0?-1:s.at},this.scene.add(a.group),this.built.set(r,a)}}}clear(){for(const[,e]of this.built)this.scene.remove(e.group);this.built.clear()}}const gn={uRight:{value:new W(1,0,0)},uUp:{value:new W(0,1,0)},uFacing:{value:new W(0,0,1)},uTopFade:{value:0},uCutout:{value:new ot(0,0,0,1)},uDebugCull:{value:0},uRes:{value:new He(1,1)}},iM=`
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
`,rM=`
uniform sampler2D uAlbedo, uNormal;
uniform vec3 uRight, uUp, uFacing;
uniform float uTopFade, uUnlit;
uniform vec4 uCutout;
uniform float uDebugCull;
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
`;class ji{constructor(e,t,n={}){this.atlas=e,this.metresPerPixel=t;const r=new dn(1,1);r.translate(0,.5,0),this.geo=new _l,this.geo.index=r.index,this.geo.setAttribute("position",r.getAttribute("position")),this.geo.setAttribute("uv",r.getAttribute("uv")),this.pos=this.size=this.uvs=this.flags=void 0,this.grow(64);const s=new Tt({vertexShader:iM,fragmentShader:rM,uniforms:{...at,...gn,uAlbedo:{value:e.albedo},uNormal:{value:e.normal},uUnlit:{value:n.unlit?1:0}},depthTest:!n.onTop,depthWrite:!n.onTop});this.mesh=new Vt(this.geo,s),this.mesh.frustumCulled=!1,n.onTop&&(this.mesh.renderOrder=10)}atlas;metresPerPixel;mesh;geo;pos;size;uvs;flags;capacity=0;count=0;grow(e){const t=Math.max(e,this.capacity*2),n=(r,s)=>{const a=new xl(new Float32Array(t*r),r);return a.setUsage(or),s&&a.array.set(s.array),a};this.pos=n(3,this.pos),this.size=n(2,this.size),this.uvs=n(4,this.uvs),this.flags=n(3,this.flags),this.geo.setAttribute("iPos",this.pos),this.geo.setAttribute("iSize",this.size),this.geo.setAttribute("iUv",this.uvs),this.geo.setAttribute("iFlags",this.flags),this.capacity=t}set(e){e.length>this.capacity&&this.grow(e.length);const t=this.pos.array,n=this.size.array,r=this.uvs.array,s=this.flags.array;e.forEach((a,o)=>{t[o*3]=a.x,t[o*3+1]=a.y,t[o*3+2]=a.z,n[o*2]=a.frame.w*this.metresPerPixel,n[o*2+1]=a.frame.h*this.metresPerPixel,r.set(a.frame.uv,o*4),s[o*3]=a.flip?1:0,s[o*3+1]=a.top?1:0,s[o*3+2]=a.fresh?1:0});for(const a of[this.pos,this.size,this.uvs,this.flags])a.needsUpdate=!0;this.count=e.length,this.geo.instanceCount=e.length,this.mesh.visible=e.length>0}dispose(){this.geo.dispose(),this.mesh.material.dispose(),this.atlas.albedo.dispose(),this.atlas.normal.dispose()}}const Ot=32,er=16,sM=`
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
}`,aM=`
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
}`;class Kc{mesh;geo=new _l;cap=0;n=0;pos;size;uv;col;draw;constructor(e){const t=new dn(1,1);this.geo.index=t.index,this.geo.setAttribute("position",t.getAttribute("position")),this.geo.setAttribute("uv",t.getAttribute("uv")),this.grow(256),this.mesh=new Vt(this.geo,e),this.mesh.frustumCulled=!1,this.mesh.renderOrder=3}grow(e){const t=(r,s)=>{const a=new Float32Array(e*s);return r&&a.set(r),a};this.pos=t(this.pos,3),this.size=t(this.size,1),this.uv=t(this.uv,4),this.col=t(this.col,4),this.draw=t(this.draw,1),this.cap=e;const n=(r,s,a)=>this.geo.setAttribute(r,new xl(s,a).setUsage(or));n("iPos",this.pos,3),n("iSize",this.size,1),n("iUv",this.uv,4),n("iCol",this.col,4),n("iDraw",this.draw,1)}begin(){this.n=0}add(e,t,n,r,s,a,o,c,l,h=1){this.n>=this.cap&&this.grow(this.cap*2);const f=this.n++;this.pos.set([e,t,n],f*3),this.size[f]=r,this.uv.set(s,f*4),this.col.set([a,o,c,l],f*4),this.draw[f]=h}end(){this.geo.instanceCount=this.n;for(const e of["iPos","iSize","iUv","iCol","iDraw"])this.geo.getAttribute(e).needsUpdate=!0}}const oM=["🎉","🎈","💃","🎊","🥳","😛","🍉","🍒","🍷","🍸","🍹","🥂","🍺","😁","😆"],lM=[["😴","🫩","🥱","💼"],["😐","😐","🥱"],["😮","🤭","🫢","😛"],["🙂","🍷","🍺","😁"],["🥳","🎉","🎈","😆","🥂","💃"]];class cM{constructor(e,t){this.game=t,this.canvas.width=this.canvas.height=Ot*er;const n=this.canvas.getContext("2d"),r=n.createRadialGradient(Ot/2,Ot/2,0,Ot/2,Ot/2,Ot/2);r.addColorStop(0,"rgba(255,255,255,1)"),r.addColorStop(.35,"rgba(255,255,255,.55)"),r.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=r,n.fillRect(0,0,Ot,Ot),this.tex=new r0(this.canvas),this.tex.magFilter=Dt,this.tex.minFilter=Dt,this.tex.generateMipmaps=!1;const s=a=>new Tt({vertexShader:sM,fragmentShader:aM,uniforms:{...at,uRight:gn.uRight,uUp:gn.uUp,uFlat:{value:a},uGlyphs:{value:this.tex}},transparent:!0,depthWrite:!1,blending:dr});this.standing=new Kc(s(0)),this.flat=new Kc(s(1)),e.add(this.standing.mesh,this.flat.mesh)}game;canvas=document.createElement("canvas");tex;slots=new Map;colours=new Map;standing;flat;fizzles=[];bursts=[];bubbleWitch=document.getElementById("bubble-witch");bubbleCreature=document.getElementById("bubble-creature");v=new W;slotOf(e,t=0){const n=`${e}:${t}`;let r=this.slots.get(n);if(r!==void 0)return r;r=this.slots.size+1,this.slots.set(n,r);const s=this.canvas.getContext("2d"),a=r%er*Ot,o=Math.floor(r/er)*Ot;s.clearRect(a,o,Ot,Ot),df(s,e,{x:a+1,y:o+1,size:Ot-2,level:t,colour:[255,255,255],glow:!1});const c=s.getImageData(a,o,Ot,Ot);for(let h=3;h<c.data.length;h+=4)c.data[h]=c.data[h]>90?255:0;s.putImageData(c,a,o);const l=ea(e);return this.colours.set(e,new Qe(l[0]/255,l[1]/255,l[2]/255)),this.tex.needsUpdate=!0,r}uv(e){const t=Ot*er,n=e%er*Ot,r=Math.floor(e/er)*Ot;return[n/t,1-r/t,(n+Ot)/t,1-(r+Ot)/t]}update(e,t,n,r){const s=this.game,a=s.leash,o=s.tuning,c=s.witch,l=o.bond,h=o.leash,f=this.uv(0);this.standing.begin(),this.flat.begin();for(const g of a.events)g.kind==="fizzled"&&this.fizzles.push({x:g.x,z:g.z,at:e}),g.kind==="invited"&&this.bursts.push({x:g.x,z:g.z,at:e,seed:g.id});this.fizzles=this.fizzles.filter(g=>e-g.at<.7),this.bursts=this.bursts.filter(g=>e-g.at<.9);for(const g of this.bursts){const m=(e-g.at)/.9;for(let p=0;p<28;p++){const _=Xe(g.seed,p,3)*Math.PI*2,S=2+Xe(g.seed,p,5)*3,b=2+Xe(g.seed,p,7)*3,w=[[1,.4,.8],[.3,.95,1],[1,.9,.3],[.6,1,.4],[1,1,1]][p%5];this.standing.add(g.x+Math.cos(_)*S*m,.6+b*m-4*m*m,g.z+Math.sin(_)*S*m,.3,f,w[0],w[1],w[2],1-m)}}if(a.talk){const g=s.creatures[a.talk.id],m=a.talk.refused?0:Math.min(1,a.talk.t/a.talk.total),p=28;for(let _=0;_<p;_++){const S=Math.PI/2-_/p*Math.PI*2,b=_/p<m;this.flat.add(g.x+Math.cos(S)*1.5,0,g.z+Math.sin(S)*1.1,.35,f,1,b?.6:.9,b?.9:1,b?.9:.18)}}const u=fr(c,o)+1.4,d=new Map;for(let g=0;g<a.stack.length;g++){const m=a.stack[g],p=s.creatures[m],_=a.stack.length-1-g,S=Math.sin(e*1.7+_*.9)*.12*(1+_*.5),b=.02*Math.pow(_+1,1.3),w=c.x+S-c.vx*b,E=c.z-c.vz*b,L=u+1.3+_*2.4;d.set(m,new W(w,L,E));const M=(this.slotOf(p.species,p.level),this.colours.get(p.species));this.standing.add(w,L,E,2+p.level*.4,this.uv(this.slotOf(p.species,p.level)),M.r,M.g,M.b,1)}for(const g of a.placed){const m=s.creatures[g.id],p=this.slotOf(m.species,m.level),_=this.colours.get(m.species),S=.8+.2*Math.sin(e*2+g.id);this.flat.add(g.x,0,g.z,3+m.level*.8,this.uv(p),_.r*S,_.g*S,_.b*S,1,Math.min(1,(e-g.at)/.8)),this.flat.add(g.x,0,g.z,5,f,_.r,_.g,_.b,.25)}if(c.mode==="ground"&&a.stack.length&&!a.placed.some(g=>Math.hypot(g.x-c.x,g.z-c.z)<=h.pickRadius)){const g=s.creatures[a.stack[a.stack.length-1]],m=this.colours.get(g.species),p=pu(a,c.x,c.z,o);this.flat.add(c.x,0,c.z,3+g.level*.8,this.uv(this.slotOf(g.species,g.level)),p?1:m.r,p?.1:m.g,p?.1:m.b,.22)}for(const g of this.fizzles){const m=1-(e-g.at)/.7;this.flat.add(g.x,0,g.z,3*(1+(1-m)*.6),f,1,.15,.1,m)}const x=[...a.stack,...a.placed.map(g=>g.id)];for(const g of x){const m=s.creatures[g],p=this.colours.get(m.species);if(!p)continue;const _=$f(a,g,c.x,c.z);l.rim&&this.flat.add(m.x,0,m.z,1.8,f,p.r,p.g,p.b,.35);const S=d.get(g)??new W(_.x,.2,_.z);if(l.sparks){const w=Math.max(.5,l.sparkEvery),E=(e+g*.618%1*w)%w;if(E<.7){const L=E/.7;this.standing.add(S.x+(m.x-S.x)*L,S.y+(.6-S.y)*L+Math.sin(L*Math.PI)*1.2,S.z+(m.z-S.z)*L,.35,f,p.r,p.g,p.b,1)}}const b=Math.hypot(m.x-_.x,m.z-_.z);if(l.thread&&b>h.length*.85){const w=Math.min(1,(b-h.length*.85)/h.length),E=Math.min(60,Math.floor(b/1.2));for(let L=1;L<E;L++){const M=(L+e*2%1)/E;this.standing.add(S.x+(m.x-S.x)*M,S.y+(.5-S.y)*M,S.z+(m.z-S.z)*M,.22,f,p.r,p.g,p.b,.25+.75*w)}}}this.standing.end(),this.flat.end(),this.bubbles(e,t,n,r)}bubbles(e,t,n,r){const s=this.game,a=s.leash.talk,o=this.bubbleWitch,c=this.bubbleCreature;if(!o||!c)return;if(!a){o.classList.remove("on"),c.classList.remove("on");return}const l=s.creatures[a.id],h=s.witch,f=(S,b,w,E)=>{this.v.set(b,w,E).project(t),S.style.left=`${(this.v.x+1)/2*n}px`,S.style.top=`${(1-this.v.y)/2*r}px`};f(o,h.x-1.2,fr(h,s.tuning)+2.2,h.z),f(c,l.x,1.2+l.level*.8,l.z);const u=c.querySelector("span"),d=c.querySelector(".bar");if(a.refused){o.classList.remove("on"),u.textContent=Xe(a.id,1,9)<.5?"😒":"🙄",d.style.display="none",c.classList.toggle("on",a.t<1.6),c.style.opacity="1";return}d.style.display="";const x=Math.floor(a.t/Kf(l,s.tuning)),g=Math.min(1,a.t/a.total),m=(S,b)=>S[Math.floor(Xe(a.id,b,5)*S.length)%S.length],p=[4,2,0][Math.min(2,l.level)],_=Math.round(p+(4-p)*g);o.textContent=m(oM,x-x%2),o.classList.toggle("on",x%2===0),u.textContent=x>=1?m(lM[_],x-(x+1)%2):"…",d.querySelector("i").style.width=`${g*100}%`,c.classList.add("on"),c.style.opacity=x%2===1?"1":"0.6"}}const uM=[1,3,5,7,9],rh=i=>{const e=60/Math.max(1,i.beat.bpm);return{beat:e,bar:e*4}};function hM(i,e,t,n){const r=n.lasers,{beat:s,bar:a}=rh(n),o=a*Math.max(1,r.blockBars),c=Math.floor(i/o),l=i-c*o,h=pi(r.duty*t,0,1),u=Xe(e,c,311)<h?hn(l/Math.max(.001,r.fadeIn))*hn((o-l)/Math.max(.001,r.fadeOut)):0,d=Math.floor(l/a),x=uM.filter(b=>b<=r.maxCount),g=x[Math.floor(Xe(e,c*64+d,313)*x.length)%x.length]??1,m=e%97*.37,p=Math.sin(2*Math.PI*i/(s*r.sweepBeats)+m)*(r.sweep*Math.PI)/180,_=.55+.45*Math.sin(2*Math.PI*i/(a*2)+m*2),S=((e%1e3*.0137+i/(a*8))%1+1)%1;return{on:u,count:g,sweep:p,open:_,hue:S}}const fM=`
attribute vec4 aCol; // rgb, alpha
attribute float aU;  // 0 at the source, 1 at the far end
varying vec4 vCol;
varying float vU;
void main() { vCol = aCol; vU = aU; gl_Position = projectionMatrix * viewMatrix * vec4(position, 1.0); }`,dM=`
varying vec4 vCol;
varying float vU;
void main() { float a = vCol.a * pow(1.0 - vU, 0.6); gl_FragColor = vec4(vCol.rgb * a, 1.0); }`,Ur=[[.3,.95,1],[.35,.55,1],[.7,.4,1],[1,.3,.85],[.45,1,.55]],pM=i=>{const e=(i%1+1)%1*Ur.length,t=Math.floor(e),n=e-t,r=Ur[t%Ur.length],s=Ur[(t+1)%Ur.length];return[r[0]+(s[0]-r[0])*n,r[1]+(s[1]-r[1])*n,r[2]+(s[2]-r[2])*n]};class mM{constructor(e,t){this.game=t,this.mesh=new Hu(this.geo,new Tt({vertexShader:fM,fragmentShader:dM,transparent:!0,depthWrite:!1,blending:dr})),this.mesh.frustumCulled=!1,e.add(this.mesh)}game;geo=new Ht;pos=new Float32Array(0);col=new Float32Array(0);u=new Float32Array(0);mesh;update(e,t,n,r){const s=this.game.tuning,a=s.lasers,{bar:o}=rh(s),c=o*a.blockBars,l=[],h=[],f=[];if(a.on)for(const u of t){const d=1-Math.min(1,Math.max(0,(Math.hypot(u.x-n,u.z-r)-a.fadeNear)/Math.max(1,a.fadeFar-a.fadeNear)));if(d<=0)continue;const x=hM(e,u.seed,1,s),g=e-u.ready,m=g>=0&&g<c?Math.min(1,g/a.fadeIn)*Math.min(1,(c-g)/a.fadeOut):0,p=Math.max(x.on,m),_=m>x.on?a.maxCount:x.count;if(p<=.01)continue;const S=a.spread*Math.PI/180*x.open;for(let b=0;b<_;b++){const w=_===1?0:b/(_-1)-.5,E=w*S+x.sweep,L=Math.sin(E),M=Math.cos(E),C=-.15*Math.cos(E*3+u.seed),A=pM(x.hue+b*.07),P=a.opacity*p*d;l.push(u.x,u.y,u.z,u.x+L*a.length,u.y+M*a.length,u.z+C*a.length),h.push(...A,P,...A,P),f.push(0,1)}}if(l.length>this.pos.length&&(this.pos=new Float32Array(l.length*2),this.col=new Float32Array(h.length*2),this.u=new Float32Array(f.length*2),this.geo.setAttribute("position",new un(this.pos,3).setUsage(or)),this.geo.setAttribute("aCol",new un(this.col,4).setUsage(or)),this.geo.setAttribute("aU",new un(this.u,1).setUsage(or))),!!this.geo.getAttribute("position")){this.pos.set(l),this.col.set(h),this.u.set(f);for(const u of["position","aCol","aU"])this.geo.getAttribute(u).needsUpdate=!0;this.geo.setDrawRange(0,l.length/3)}}}function*gM(i,e,t,n){const r=i.siteOf(e[0],e[1]),s=i.areaSize*1.5,a=Math.max(t*2,8),o=i.bounds,c=(p,_)=>{if(p<o.minX||p>o.maxX||_<o.minZ||_>o.maxZ)return"edge";const S=i.areaAt(p,_).cell;return`${S[0]},${S[1]}`},l=`${e[0]},${e[1]}`,h=Math.ceil(2*s/a),f=r.x-s,u=r.z-s,d=[];for(let p=0;p<=h;p++){for(let _=0;_<=h;_++)d.push(c(f+_*a,u+p*a));yield}const x=new Set,g=Math.max(1,Math.round(a/t)),m=a/g;for(let p=0;p<h;p++,yield)for(let _=0;_<h;_++){const S=[d[p*(h+1)+_],d[p*(h+1)+_+1],d[(p+1)*(h+1)+_],d[(p+1)*(h+1)+_+1]];if(!S.includes(l)||S.every(w=>w===l))continue;const b=[];for(let w=0;w<=g;w++)for(let E=0;E<=g;E++)b.push(c(f+_*a+E*m,u+p*a+w*m));for(let w=0;w<=g;w++)for(let E=0;E<=g;E++){const L=b[w*(g+1)+E],M=f+_*a+E*m,C=u+p*a+w*m;for(const[A,P]of[[1,0],[0,1]]){if(E+A>g||w+P>g)continue;const F=b[(w+P)*(g+1)+E+A];if(L===F||L!==l&&F!==l)continue;const U=M+A*m*.5,D=C+P*m*.5,O=`${Math.round(U*4)},${Math.round(D*4)}`;x.has(O)||(x.add(O),n.push({x:U,z:D,other:L===l?F:L}))}}}}const xM=`
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
}`,vM=`
uniform float uBright;
varying vec3 vColour;
varying vec3 vWorld;
varying float vB;
${jn}
void main() { gl_FragColor = vec4(haze(vColour * vB * uBright, vWorld), 1.0); }`;class _M{constructor(e,t){this.game=t;const n=t.tuning.borders;this.mesh=new qs(this.geo,new Tt({vertexShader:xM,fragmentShader:vM,uniforms:{...at,uWidth:{value:n.width},uSparkle:{value:n.sparkle},uBright:{value:n.brightness}},transparent:!0,depthWrite:!1,blending:dr})),this.mesh.frustumCulled=!1,e.add(this.mesh)}game;areas=new Map;jobs=[];geo=new Ht;stamp="";mesh;update(){const e=this.game,t=e.tuning.borders;if(!t.on){this.mesh.visible=!1;return}for(const[c,l]of e.party.areas){if(this.areas.has(c))continue;const h=e.map.siteOf(l.cell[0],l.cell[1]),f=l.from?e.map.siteOf(l.from[0],l.from[1]):null,u=f?(f.x+h.x)/2:h.x,d=f?(f.z+h.z)/2:h.z,x=e.map.areaSize*1.6,g=e.tuning.party.transition,m=ea(fn[e.map.typeOf(l.cell[0],l.cell[1])].creature),p={points:[],colour:new Qe(m[0]/255,m[1]/255,m[2]/255),on:(_,S)=>l.wave===0?-1:l.at+Math.min(1,Math.hypot(_-u,S-d)/x)*g,done:!1};this.areas.set(c,p),this.jobs.push({key:c,gen:gM(e.map,l.cell,t.step,p.points)})}const n=performance.now()+3;for(;this.jobs.length&&performance.now()<n;){const c=this.jobs[0];c.gen.next().done&&(this.areas.get(c.key).done=!0,this.jobs.shift())}const r=`${e.party.areas.size}|${[...this.areas.values()].filter(c=>c.done).length}`;if(r===this.stamp)return;this.stamp=r;const s=[],a=[],o=[];for(const[,c]of this.areas)if(c.done)for(const l of c.points)l.other!=="edge"&&e.party.areas.has(l.other)||(s.push(l.x,.15,l.z),a.push(c.colour.r,c.colour.g,c.colour.b),o.push(((l.x*12.9898+l.z*78.233)%1+1)%1,c.on(l.x,l.z)));this.geo.setAttribute("position",new Lt(s,3)),this.geo.setAttribute("aColour",new Lt(a,3)),this.geo.setAttribute("aSpark",new Lt(o,2))}}const MM=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,SM=`
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
}`;class yM{constructor(e,t,n,r,s,a,o){this.height=t,this.mat=new Tt({vertexShader:MM,fragmentShader:SM,uniforms:{...at,uStrength:{value:e},uWind:{value:n},uPixel:{value:r},uDepth:{value:a},uLow:{value:o}},depthWrite:!1,depthTest:!s,blending:s?Bn:ar}),this.mesh=new Vt(new dn(700,700).rotateX(-Math.PI/2),this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=2}height;mesh;mat;follow(e,t){this.mesh.position.set(e,this.height,t-150)}}const bM=`
attribute vec4 iShadow; // x, z, width, depth (metres)
varying vec2 vLocal;
varying vec3 vWorld;
void main() {
  vLocal = position.xz * 2.0;
  vec3 w = vec3(iShadow.x + position.x * iShadow.z, 0.03, iShadow.y + position.z * iShadow.w);
  vWorld = w;
  gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
}`,wM=`
uniform float uStrength;
varying vec2 vLocal;
varying vec3 vWorld;
${jn}
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
}`;class EM{mesh;geo=new _l;attr;capacity=0;constructor(e){const t=new dn(1,1).rotateX(-Math.PI/2);this.geo.index=t.index,this.geo.setAttribute("position",t.getAttribute("position")),this.attr=this.grow(1024);const n=new Tt({vertexShader:bM,fragmentShader:wM,uniforms:{...at,uStrength:{value:e}},depthWrite:!1});this.mesh=new Vt(this.geo,n),this.mesh.frustumCulled=!1,this.mesh.renderOrder=1}grow(e){return this.capacity=Math.max(e,this.capacity*2),this.attr=new xl(new Float32Array(this.capacity*4),4),this.attr.setUsage(or),this.geo.setAttribute("iShadow",this.attr),this.attr}set(e){e.length>this.capacity&&this.grow(e.length);const t=this.attr.array;e.forEach((n,r)=>{t[r*4]=n.x,t[r*4+1]=n.z,t[r*4+2]=n.w,t[r*4+3]=n.d}),this.attr.needsUpdate=!0,this.geo.instanceCount=e.length,this.mesh.visible=e.length>0}}class TM{constructor(e,t,n){this.canvas=e,this.game=t,this.style=n;const r=t.tuning;this.renderer=new f_({canvas:e,antialias:!1,powerPreference:"high-performance",preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.info.autoReset=!1,this.renderer.outputColorSpace=Hr,this.mpp=1/(r.artPixelsPerMetre*(2/r.pixelSize)),this.camera=new an(r.camera.fov,1,1,900),this.post=new k_(this.renderer,r),this.scene.background=new Qe(723478),P_(n,r.glowReach,this.mpp,r.tone.ambient),at.uGlowPower.value=r.glowPower,this.assets=new L_(n,t.seed,r.pixelSize),this.ground=new U_(t.map,t.forest,n,this.mpp),this.assets.onFloor=(f,u)=>this.ground.setFloor(f,u);const s=r.canopyShadow;this.ground.setCanopyShadow(s.on?s.strength:0,s.height,s.cover,s.wind),this.shadows=new EM(r.shadows.strength),this.shadows.mesh.visible=r.shadows.on,this.scene.add(this.shadows.mesh);const a=r.fx==="smooth";at.uSmooth.value=a?1:0,r.mist.on&&r.mist.strength>0&&(this.mist=new yM(r.mist.strength,r.mist.height,r.mist.wind,this.mpp,a,this.post.scene.depthTexture,this.post.lowSize),a?(this.post.fxScene=new ac,this.post.fxScene.add(this.mist.mesh)):this.scene.add(this.mist.mesh)),at.uHazeRange.value.set(r.haze.near,r.haze.far),this.scene.add(this.ground.mesh),this.witchBatch=new ji(this.assets.witch,this.mpp,{unlit:!0,onTop:!0}),this.scene.add(this.witchBatch.mesh),this.stoneBatch=new ji(this.assets.stones,this.mpp),this.scene.add(this.stoneBatch.mesh);const o=t.map.dancefloor,c=[],l=t.tuning.dancefloor.stones;for(let f=0;f<l;f++){const u=f/l*Math.PI*2+.3;c.push({x:o.x+Math.cos(u)*o.radius,y:0,z:o.z+Math.sin(u)*o.radius,frame:this.assets.stones.frames[f%4],flip:f%2===0})}this.stoneBatch.set(c),this.propBatch=new ji(this.assets.props,this.mpp),this.scene.add(this.propBatch.mesh),this.partyView=new K_(this.assets.soundsystems,this.mpp),this.strings=new nM(this.scene,t),this.leashView=new cM(this.scene,t),this.lasers=new mM(this.scene,t),this.borders=new _M(this.scene,t),this.soundBatch=new ji(this.assets.soundsystems,this.mpp),this.scene.add(this.soundBatch.mesh),this.dancefloor=new Y_(t.map,r,gn,this.mpp),this.scene.add(this.dancefloor.ball,this.dancefloor.beam,this.dancefloor.motes);const h=new Tt({transparent:!1,depthWrite:!1,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"varying vec2 vUv; void main(){ vec2 p = vUv * 2.0 - 1.0; if (dot(p, p) > 1.0 || mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0) > 0.5) discard; gl_FragColor = vec4(0.02, 0.02, 0.05, 1.0); }"});this.shadow=new Vt(new dn(1.4,.7).rotateX(-Math.PI/2),h),this.shadow.renderOrder=1,this.scene.add(this.shadow)}canvas;game;style;renderer;scene=new ac;camera;ground;assets;typeBatches=new Map;creatureBatches=new Map;witchBatch;stoneBatch;shadow;mpp;lastBuild={x:1/0,y:1/0,z:1/0,version:-1};post;dancefloor;propBatch;partyView;strings;leashView;lasers;borders;soundBatch;sources=[];forestLights=[];shadows;shadowList=[];mist=null;width=1;height=1;debugCull=!1;stats={trees:0,bushes:0,creatures:0,batches:0,drawCalls:0,pendingArt:0,pendingGround:0,lights:0};resize(e,t){const n=this.game.tuning.pixelSize;this.width=Math.max(1,Math.ceil(e/n)),this.height=Math.max(1,Math.ceil(t/n));const r=this.post.fullResolution?n:1;this.renderer.setSize(this.width*r,this.height*r,!1),this.post.resize(this.width,this.height,this.width*r,this.height*r),this.canvas.style.width=this.width*n+"px",this.canvas.style.height=this.height*n+"px",this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix(),gn.uRes.value.set(this.width,this.height)}async prepare(){this.render(0,!1),this.drawCreatures(),this.ground.fill(this.renderer,this.viewRect(this.game.tuning.haze.near,20),this.game.witch.x,this.game.witch.z,1/0),await this.assets.whenIdle(),this.render(0,!1),this.refresh(!0);for(let e=0;e<fn.length;e++)this.assets.prefetchType(e);for(const e of fn)this.assets.creatureArt(e.creature)}batchFor(e,t,n){let r=e.get(t);return r||(r=n(),r&&(e.set(t,r),this.scene.add(r.mesh))),r}frustum=new Ws;frustumTo=new Ws;cullCam=new an;box=new _r;m4=new At;v3=new W;at=new Map;tracks={placed:{now:new Set,before:new Set},moving:{now:new Set,before:new Set}};pops=[];poseCamera(e,t){const n=t.angle*Math.PI/180;e.position.set(t.tx,t.ty+Math.sin(n)*t.distance,t.tz+Math.cos(n)*t.distance),e.up.set(0,1,0),e.lookAt(t.tx,t.ty,t.tz),e.updateMatrixWorld()}updateFrustum(){const e=this.game,t=e.tuning,n=this.camera;n.updateMatrixWorld(),this.m4.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this.frustum.setFromProjectionMatrix(this.m4);const r=Math.max(1,t.camera.zoomSteps),s=e.witch.mode==="rising"||e.witch.mode==="treetop"?1:0,a=Jc({...e.camera,zoom:r>1?e.camera.zoomStep/(r-1):0},s,t),o=this.cullCam;o.fov=n.fov,o.aspect=n.aspect,o.near=n.near,o.far=n.far,o.updateProjectionMatrix(),this.poseCamera(o,{...a,ty:Tn(t.groundHeight,t.treetopHeight,s)}),this.m4.multiplyMatrices(o.projectionMatrix,o.matrixWorldInverse),this.frustumTo.setFromProjectionMatrix(this.m4)}viewRect(e,t){const n=this.game.witch,r=[];for(const o of[this.camera,this.cullCam]){const c=o.position,l=e+Math.hypot(c.x-n.x,c.z-n.z)+t;for(const h of[-1,1])for(const f of[-1,1]){const u=this.v3.set(h,f,1).unproject(o).sub(c).normalize();for(const d of[0,25]){let x=u.y<-.001?(d-c.y)/u.y:1/0;x>0||(x=1/0),x=Math.min(x,l),r.push([c.x+u.x*x,c.z+u.z*x])}}r.push([c.x,c.z])}const s=r.map(o=>o[0]),a=r.map(o=>o[1]);return{minX:Math.min(...s)-t,maxX:Math.max(...s)+t,minZ:Math.min(...a)-t,maxZ:Math.max(...a)+t}}inView(e,t,n,r,s){const a=this.game.witch.x,o=this.game.witch.z,c=this.game.tuning.haze.far+s;return(e-a)**2+(t-o)**2>c*c?!1:(this.box.min.set(e-n/2-s,-s,t-r-s),this.box.max.set(e+n/2+s,r+s,t+s),this.frustum.intersectsBox(this.box)||this.frustumTo.intersectsBox(this.box))}inInnerView(e,t,n){const r=this.game.witch,s=this.game.tuning.haze;if(Math.hypot(e-r.x,t-r.z)>s.near+(s.far-s.near)*.6)return!1;for(const a of[0,n*.5,n]){const o=this.v3.set(e,a,t).project(this.camera);if(Math.abs(o.x)<.9&&Math.abs(o.y)<.9&&o.z<1)return!0}return!1}mark(e,t,n,r,s=""){const a=e==="creature"||e==="prop"?this.tracks.moving:this.tracks.placed,o=e==="creature"?`${e}|${s}`:`${e}|${t.toFixed(1)}|${n.toFixed(1)}|${r.toFixed(1)}|${s}`;return e==="creature"&&this.at.set(o,[t,n,r]),a.now.add(o),!a.before.has(o)}checkPops(e,t=!0){const n=this.tracks[e];if(t&&this.assets.pending===0&&n.before.size>0){const s=(a,o)=>{const c=this.at.get(a),[l,...h]=a.split("|"),[f,u,d]=c??h.map(Number);this.inInnerView(+f,+u,+d)&&this.pops.push(`${o} ${l} ${(+f).toFixed(0)},${(+u).toFixed(0)}`)};for(const a of n.now)n.before.has(a)||s(a,"appeared");for(const a of n.before)n.now.has(a)||s(a,"vanished")}n.before=n.now,n.now=new Set}lastPose={distance:0,angle:0,zoomStep:-1,lift:-1};refresh(e=!1){const t=this.game,n=t.tuning,r=this.camera,s=n.viewMargin,a=Hl(t),o={x:r.position.x,y:r.position.y,z:r.position.z},c=this.lastPose,l=t.witch.mode==="rising"||t.witch.mode==="treetop"?1:0,h=Math.hypot(o.x-this.lastBuild.x,o.y-this.lastBuild.y,o.z-this.lastBuild.z)>=s/3,f=Math.abs(a.distance-c.distance)>2||Math.abs(a.angle-c.angle)>.5||t.camera.zoomStep!==c.zoomStep||l!==c.lift;if(!e&&!h&&!f&&this.assets.version===this.lastBuild.version)return;this.lastBuild={...o,version:this.assets.version},this.lastPose={distance:a.distance,angle:a.angle,zoomStep:t.camera.zoomStep,lift:l};const u=this.viewRect(n.haze.far,s),d=(u.minX+u.maxX)/2,x=(u.minZ+u.maxZ)/2,g=Math.max(u.maxX-u.minX,u.maxZ-u.minZ)/2,m=[],p=at.uMoonDir.value,_=-p.x/Math.max(.2,p.y),S=-p.z/Math.max(.2,p.y),b=new Map,w=(A,P)=>{let F=b.get(A);F||b.set(A,F=[]),F.push(P)},E=this.mpp;let L=0,M=0;for(const A of t.forest.treesNear(d,x,g)){const P=this.assets.typeArt(A.type);if(!P||!P.layout.big.length)continue;const F=P.atlas.frames,U=P.layout.big[A.variant%P.layout.big.length],D=F[U.top??U.bot];if(!this.inView(A.x,A.z,D.w*E,D.h*E,s))continue;const O=this.mark("tree",A.x,A.z,D.h*E);w(A.type,{x:A.x,y:0,z:A.z,frame:F[U.bot],flip:A.flip,fresh:O}),U.top!==null&&w(A.type,{x:A.x,y:0,z:A.z,frame:F[U.top],flip:A.flip,top:!0,fresh:O});const k=D.w*E,Y=D.h*E*(U.top===null?.2:.6);m.push({x:A.x+_*Y,z:A.z+S*Y,w:k*.8,d:k*.45}),L++}const C=(A,P,F)=>{for(const U of P){const D=this.assets.typeArt(U.type);if(!D)continue;const O=F(D.layout);if(!O.length)continue;const k=O[U.variant%O.length],Y=D.atlas.frames,j=Y[k.bot],X=Y[k.top??k.bot];if(!this.inView(U.x,U.z,X.w*E,X.h*E,s))continue;const te=this.mark(A,U.x,U.z,X.h*E);w(U.type,{x:U.x,y:0,z:U.z,frame:j,flip:U.flip,fresh:te}),k.top!==null&&w(U.type,{x:U.x,y:0,z:U.z,frame:Y[k.top],flip:U.flip,top:!0,fresh:te}),m.push({x:U.x,z:U.z,w:j.w*E*.8,d:j.w*E*.3}),M++}};C("small",t.forest.bushesNear(d,x,g),A=>A.small),C("wall",t.forest.wallsNear(d,x,g),A=>A.walls.map(P=>({bot:P,top:null}))),C("setpiece",t.forest.setPiecesNear(d,x,g),A=>A.set===null?[]:[A.set]);for(const[A,P]of this.typeBatches)b.has(A)||P.set([]);for(const[A,P]of b)this.batchFor(this.typeBatches,A,()=>{const U=this.assets.typeArt(A);return U&&new ji(U.atlas,E)})?.set(P);this.checkPops("placed",!e),this.sources=t.forest.lightsNear(t.witch.x,t.witch.z,n.haze.far+s),this.stats.trees=L,this.stats.bushes=M,this.shadowList=m}drawCreatures(e=0){const t=this.game,n=t.tuning.haze.far+20,r=new Map,s=new Map,a=[],o=60/t.tuning.beat.bpm;let c=0;for(const l of t.creatures){if(Math.abs(l.x-t.witch.x)>n||Math.abs(l.z-t.witch.z)>n)continue;const h=l.leashed?this.assets.partyArt(l.species,l.id,ea(l.species)):void 0,f=h??this.assets.creatureArt(l.species),u=h?`party-${l.id}`:l.species;if(!f)continue;s.set(u,f);const d=f.atlas.frames[f.frame(l.level,l.moving?Math.floor(l.walk)%2:0,l.away)];if(!this.inView(l.x,l.z,d.w*this.mpp,d.h*this.mpp,4))continue;const x=this.mark("creature",l.x,l.z,d.h*this.mpp,l.id);let g=r.get(u);g||r.set(u,g=[]);const m=(e/o+l.id%4*.25)*Math.PI,p=l.leashed?Math.abs(Math.sin(m))*(l.moving?.15:.4):0,_=l.leashed&&!l.moving?Math.sin(m*.5)*.12:0;g.push({x:l.x+_,y:p,z:l.z,frame:d,flip:l.facing<0,fresh:x}),a.push({x:l.x,z:l.z,w:d.w*this.mpp*.7,d:d.w*this.mpp*.25}),c++}for(const[l,h]of this.creatureBatches)r.has(l)||h.set([]);for(const[l,h]of r)this.batchFor(this.creatureBatches,l,()=>{const u=s.get(l);return u&&new ji(u.atlas,this.mpp)})?.set(h);this.stats.creatures=c,this.game.tuning.shadows.on&&this.shadows.set(this.shadowList.concat(a))}fire=new W(1,.5,.16);runeCyan=new W(.3,.9,1);runeViolet=new W(.75,.45,1);runeGreen=new W(.45,1,.5);updateSources(e){const t=this.assets.props.frames,n=[],r=[];for(const s of this.sources){if(s.kind==="pond")continue;const a=Xe(Math.round(s.x*10),Math.round(s.z*10),7);if(s.kind==="campfire"){const o=.8+.12*Math.sin(e*11+a*40)+.08*Math.sin(e*23.7+a*13);r.push({x:s.x+Math.sin(e*9+a)*.08,y:1.2,z:s.z,reach:this.game.tuning.lights.campfire.reach*s.size,rgb:this.fire,strength:this.game.tuning.lights.campfire.strength*o});const c=t[Math.floor(e*8+a*10)%3];this.inView(s.x,s.z,c.w*this.mpp,c.h*this.mpp,4)&&n.push({x:s.x,y:0,z:s.z,frame:c,flip:a<.5,fresh:this.mark("prop",s.x,s.z,2)})}else{const o=a<.33?1:a<.66?0:2,c=.7+.3*Math.sin(e*.9+a*20),l=t[3+o];r.push({x:s.x,y:2,z:s.z,reach:this.game.tuning.lights.stone.reach*s.size,rgb:[this.runeCyan,this.runeViolet,this.runeGreen][o],strength:this.game.tuning.lights.stone.strength*c}),this.inView(s.x,s.z,l.w*this.mpp,l.h*this.mpp,4)&&n.push({x:s.x,y:0,z:s.z,frame:l,flip:a<.5,fresh:this.mark("prop",s.x,s.z,2.6)})}}this.propBatch.set(n),this.forestLights=r}setLights(e,t,n){const r=Math.min(ur,this.game.tuning.lightBudget),s=e.map(l=>({l,d:Math.hypot(l.x-t,l.z-n)-l.reach})).sort((l,h)=>l.d-h.d).slice(0,r+1),a=s.length>r?s[r].d:1/0,o=at;let c=0;for(const{l,d:h}of s.slice(0,r)){const f=Math.min(1,Math.max(0,(a-h)/15));o.uLightPos.value[c].set(l.x,l.y,l.z,l.reach),o.uLightCol.value[c].set(l.rgb.x,l.rgb.y,l.rgb.z,l.strength*f),c++}o.uLightCount.value=c,this.stats.lights=c}render(e,t=!0){const n=this.game,r=n.tuning,s=Hl(n),a=s.angle*Math.PI/180,o=2*s.distance*Math.tan(r.camera.fov*Math.PI/360)/this.height,c=new W(0,Math.cos(a),-Math.sin(a)),l=new W(s.tx,s.ty,s.tz),h=l.dot(c),f=l.x;l.addScaledVector(c,Math.round(h/o)*o-h),l.x+=Math.round(f/o)*o-f;const u=new W(0,Math.sin(a),Math.cos(a)).multiplyScalar(s.distance);this.camera.position.copy(l).add(u),this.camera.up.set(0,1,0),this.camera.lookAt(l),this.updateFrustum();const d=r.spriteTilt;gn.uUp.value.set(0,1,0).lerp(c,d).normalize(),gn.uFacing.value.crossVectors(gn.uRight.value,gn.uUp.value).normalize();const x=Gl(n.witch),g=r.canopyCutout;this.camera.updateMatrixWorld();const m=this.v3.set(n.witch.x,fr(n.witch,r)*.5,n.witch.z).project(this.camera);gn.uCutout.value.set((m.x*.5+.5)*this.width,(m.y*.5+.5)*this.height,.5*g.screenFraction*this.width*(1-x),Math.max(1,g.edge*this.width*(1-x))),gn.uTopFade.value=x,gn.uDebugCull.value=this.debugCull?1:0;const p=n.witch,_=fr(p,r);at.uGlowPos.value.set(p.x,_+r.glowHeight,p.z),at.uHazeCentre.value.set(p.x,p.z),this.updateSources(e);const S=this.partyView.update(n,e,(E,L,M,C)=>this.inView(E,L,M,C,4),()=>!1);this.soundBatch.set(S.items),this.ground.setSweeps(S.sweeps),this.lasers.update(e,S.playing,p.x,p.z),this.strings.update(),this.borders.update(),this.setLights([this.dancefloor.update(e,this.ground),...S.lights,...this.forestLights],p.x,p.z),at.uTime.value=e,this.mist?.follow(s.tx,s.tz);const b=Math.sin(e*2.4)*.12,w=p.lean?6+(p.away?1:0):(p.away?3:0)+Math.floor(e*4)%3;this.witchBatch.set([{x:p.x,y:_+b-.4,z:p.z,frame:this.assets.witch.frames[w],flip:p.facing<0}]),this.shadow.position.set(p.x,.03,p.z),this.shadow.scale.setScalar(1-.5*Gl(p)),this.refresh(),this.drawCreatures(e),this.checkPops("moving"),this.leashView.update(e,this.camera,this.canvas.clientWidth||window.innerWidth,this.canvas.clientHeight||window.innerHeight),this.assets.work(6),this.stats.pendingGround=this.ground.fill(this.renderer,this.viewRect(r.haze.far,40),p.x,p.z,4),this.stats.pendingArt=this.assets.pending,t&&(this.renderer.info.reset(),this.post.render(this.scene,this.camera),this.stats.drawCalls=this.renderer.info.render.calls,this.stats.batches=this.typeBatches.size+this.creatureBatches.size)}}const AM="The art style: knobs from the Witch Art Lab. Paste a style saved in the Lab here (its whole saved JSON, or just its style object). Any knob left out follows the Lab's current default, so an empty style means the Lab's default look, and stays up to date as the art changes.",CM="Lab default",RM={},LM={_readme:AM,name:CM,style:RM};function PM(i=LM){const e=i??{},t=e.style&&typeof e.style=="object"?e.style:e,n=w_();for(const[r,s]of Object.entries(t))r in n&&(n[r]=s);return n}function DM(i,e){const t=i.querySelector("#stick"),n=t.querySelector(".knob"),r=56;let s=null,a=0,o=0;const c=()=>i.classList.add("touch"),l=i.querySelector("#stick-zone");l.addEventListener("pointerdown",d=>{if(!(d.pointerType==="mouse"||s!==null)){c(),s=d.pointerId,a=d.clientX,o=d.clientY,t.style.left=a+"px",t.style.top=o+"px",t.classList.add("on");try{l.setPointerCapture(d.pointerId)}catch{}d.preventDefault()}}),l.addEventListener("pointermove",d=>{if(d.pointerId!==s)return;let x=d.clientX-a,g=d.clientY-o;const m=Math.hypot(x,g);m>r&&(x*=r/m,g*=r/m),n.style.transform=`translate(${x}px, ${g}px)`;const p=Math.min(1,m/r),_=.15,S=p<_?0:(p-_)/(1-_)/Math.max(1e-6,p);e.x=x/r*S,e.y=g/r*S});const h=d=>{d.pointerId===s&&(s=null,e.x=0,e.y=0,n.style.transform="",t.classList.remove("on"))};l.addEventListener("pointerup",h),l.addEventListener("pointercancel",h);const f=(d,x)=>{const g=i.querySelector(d);g.addEventListener("pointerdown",m=>{m.preventDefault(),m.stopPropagation(),x(),g.classList.add("down")}),g.addEventListener("pointerup",()=>g.classList.remove("down")),g.addEventListener("pointerleave",()=>g.classList.remove("down"))};f("#rise",()=>e.toggle=!0),f("#zoom-in",()=>e.zoom-=1),f("#zoom-out",()=>e.zoom+=1),f("#sigil",()=>e.sigil=!0);const u=i.querySelector("#talk");u.addEventListener("pointerdown",d=>{d.preventDefault(),d.stopPropagation(),e.talk=!0,u.classList.add("down")});for(const d of["pointerup","pointerleave","pointercancel"])u.addEventListener(d,()=>{e.talk=!1,u.classList.remove("down")});window.addEventListener("touchstart",d=>{c(),d.touches.length===3&&(e.debug=!0)},{passive:!0})}const Ln=new URLSearchParams(location.search);let Ri=Lf(Ln.get("seed"));Ri===null&&(Ri=Math.floor(Math.random()*1e6),Ln.set("seed",String(Ri)),history.replaceState(null,"","?"+Ln.toString()+location.hash));const cn={...zi,bloom:{...zi.bloom},tiltShift:{...zi.tiltShift},shadows:{...zi.shadows},canopyShadow:{...zi.canopyShadow},mist:{...zi.mist}};Ln.get("shadows")==="off"&&(cn.shadows.on=!1);Ln.get("canopy")==="off"&&(cn.canopyShadow.on=!1);Ln.get("mist")==="off"&&(cn.mist.on=!1);const bs=Ln.get("tilt");bs==="off"?cn.tiltShift.on=!1:(bs==="before"||bs==="after")&&(cn.tiltShift.on=!0,cn.tiltShift.where=bs);Ln.get("bloom")==="off"&&(cn.bloom.on=!1);const Ja=Ln.get("fx");(Ja==="pixel"||Ja==="smooth")&&(cn.fx=Ja);const $t=sd(Ri,cn),IM=document.getElementById("game"),Qa=PM(),xr=new TM(IM,$t,{...Qa,pixel:cn.pixelSize,treeSize:Qa.treeSize*cn.treeHeight,crownWidth:Qa.crownWidth*cn.crownWidth/cn.treeHeight});xr.debugCull=Ln.get("debug")==="cull";const yr=new Kp;document.getElementById("next-wave").addEventListener("pointerdown",i=>{i.preventDefault(),yr.touch.nextWave=!0});document.getElementById("pause-waves").addEventListener("pointerdown",i=>{i.preventDefault(),yr.touch.pauseWaves=!0});DM(document.body,yr.touch);document.getElementById("version").textContent="v63 · fc9fcaf";const UM=document.getElementById("seed");UM.innerHTML=`seed <a href="?seed=${Ri}">${Ri}</a>`;const $o=document.getElementById("debug"),Ml=document.getElementById("start"),sh=document.getElementById("debug-buttons"),Sl=document.getElementById("wave"),NM=Sl.querySelector(".fill"),FM=Sl.querySelector(".label");let Ti=Ln.has("debug");$o.classList.toggle("on",Ti);sh.classList.toggle("on",Ti);const ah=()=>xr.resize(window.innerWidth,window.innerHeight);window.addEventListener("resize",ah);ah();let oa=!1;requestAnimationFrame(()=>setTimeout(async()=>{await xr.prepare(),oa=!0,Ml.classList.remove("loading")},0));let $c=null;function oh(){if(!oa||!$t.clock.paused)return!1;try{$c??=new AudioContext,$c.resume()}catch{}return $t.clock.paused=!1,Ml.style.display="none",yr.clearPresses(),!0}yr.onAny=oh;Ml.addEventListener("pointerdown",i=>{i.preventDefault(),oh()});document.addEventListener("visibilitychange",()=>{document.hidden&&(Fs=0)});let Fs=0,Zc=60,ja=0,ws=0;function lh(i){requestAnimationFrame(lh);const e=Fs?(i-Fs)/1e3:0;Fs=i,ja++,ws+=e,ws>=.5&&(Zc=ja/ws,ja=0,ws=0);const t=yr.read();if(t.debug&&(Ti=!Ti,$o.classList.toggle("on",Ti),sh.classList.toggle("on",Ti)),ad($t,t,e),!oa)return;const n=nd($t.party,$t.map,$t.clock.time);if(NM.style.height=`${(1-n.gone)*100}%`,FM.textContent=`wave ${$t.party.wave} · ${$t.party.areas.size} areas · ${Math.ceil(n.left)} s`,Sl.classList.toggle("paused",$t.party.paused),xr.render($t.clock.time),Ti){const r=$t.witch,s=xr.stats;$o.textContent=[`fps    ${Zc.toFixed(0)}`,`seed   ${Ri}`,`area   ${gu($t)}`,`mode   ${r.mode}`,`at     ${r.x.toFixed(0)}, ${r.z.toFixed(0)} m   zoom ${$t.camera.zoomStep}`,`trees  ${s.trees}  bushes ${s.bushes}  creatures ${s.creatures}`,`draws  ${s.drawCalls}  art queued ${s.pendingArt}  ground tiles ${s.pendingGround}`].join(`
`)}}requestAnimationFrame(lh);window.witch={game:$t,view:xr,areaUnderWitch:()=>gu($t),areaTypeId:i=>fn[i].id,get ready(){return oa}};
