(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();function Ai(n){let e=n>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function He(n,e,t){let i=Math.imul(n|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return i=Math.imul(i^i>>>13,1274126177),((i^i>>>16)>>>0)/4294967296}function _r(n,e,t){const i=Math.floor(n),r=Math.floor(e),s=n-i,a=e-r,o=s*s*(3-2*s),c=a*a*(3-2*a),l=He(i,r,t),h=He(i+1,r,t),d=He(i,r+1,t),u=He(i+1,r+1,t);return l+(h-l)*o+(d-l)*c+(l-h-d+u)*o*c}const Fn=(n,e,t)=>n+(e-n)*t,Ti=(n,e,t)=>Math.min(t,Math.max(e,n)),fn=n=>{const e=Ti(n,0,1);return e*e*(3-2*e)};function Ju(n,e,t,i){const r=Math.max(1,n.camera.zoomSteps),s=Ti(Math.round(n.camera.startZoom),0,r-1),a=r>1?s/(r-1):0;return{zoomStep:s,zoom:a,tx:e,ty:t,tz:i,vx:0,vy:0,vz:0,ax:0,az:0,lift:0}}function Na(n,e,t,i,r){const s=i*r,a=Math.exp(-s),o=n-t,c=e+i*o;return[t+(o+c*r)*a,(e-i*c*r)*a]}function Qu(n,e,t,i,r,s,a){const o=a.camera,c=Math.max(1,o.zoomSteps),l=Ti(n.zoomStep+Math.sign(e),0,c-1),h=c>1?l/(c-1):0;let d=i.x*o.lookAhead,u=i.z*o.lookAhead;const p=Math.hypot(d,u);p>o.lookAheadMax&&(d*=o.lookAheadMax/p,u*=o.lookAheadMax/p);const g=1-Math.exp(-o.lookAheadEase*s),v=n.ax+(d-n.ax)*g,x=n.az+(u-n.az)*g,[m,_]=Na(n.tx,n.vx,t.x+v,o.follow,s),[M,S]=Na(n.ty,n.vy,t.y,o.follow,s),[w,E]=Na(n.tz,n.vz,t.z+x,o.follow,s),L=n.zoom+(h-n.zoom)*(1-Math.exp(-o.zoomEase*s)),b=n.lift+(r-n.lift)*(1-Math.exp(-o.liftEase*s));return{zoomStep:l,zoom:L,tx:m,ty:M,tz:w,vx:_,vy:S,vz:E,ax:v,az:x,lift:Ti(b,0,1)}}function Th(n,e,t){const i=t.camera.ground,r=t.camera.treetop,s=fn(e),a=Fn(Fn(i.angleIn,i.angleOut,n.zoom),Fn(r.angleIn,r.angleOut,n.zoom),s),o=Fn(Fn(i.distanceIn,i.distanceOut,n.zoom),Fn(r.distanceIn,r.distanceOut,n.zoom),s),c=a*Math.PI/180;return{angle:a,distance:o,x:n.tx,y:n.ty+Math.sin(c)*o,z:n.tz+Math.cos(c)*o,tx:n.tx,ty:n.ty,tz:n.tz}}const ju=.1,ed=()=>({time:0,paused:!0});function td(n,e){if(n.paused||!(e>0))return 0;const t=Math.min(ju,e);return n.time+=t,t}const nd={moor:{treeDensity:.65},"fern-forest":{treeDensity:1},"muddy-forest":{treeDensity:1},"stone-shrine":{treeDensity:.6},"tangly-forest":{treeDensity:1},"wispy-forest":{treeDensity:1},"hazel-forest":{treeDensity:1},garden:{treeDensity:.75},"twiggy-forest":{treeDensity:1},ancient:{treeDensity:.9},norway:{treeDensity:1},"alder-forest":{treeDensity:.9},meadow:{treeDensity:.55},"old-oaks":{treeDensity:.9},"berry-thicket":{treeDensity:1},wetland:{treeDensity:.75},stream:{treeDensity:.8},"rocky-slope":{treeDensity:.75},bog:{treeDensity:.7},deadwood:{treeDensity:.8},"cave-mouth":{treeDensity:.75},grassland:{treeDensity:.55},"beaver-pond":{treeDensity:.8},"log-pile":{treeDensity:.7},heath:{treeDensity:.65},"old-pinewood":{treeDensity:1},ravine:{treeDensity:.75},"bluebell-glade":{treeDensity:.8},"holly-thicket":{treeDensity:1},"honeysuckle-tangle":{treeDensity:1}},id={types:nd};function _l(n,e){if(typeof document<"u"){const t=document.createElement("canvas");return t.width=n,t.height=e,t}return new OffscreenCanvas(n,e)}function Ma(n){let e=n>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}const ye=(n,e,t)=>e+(t-e)*n(),Rh=(n,e)=>e[Math.floor(n()*e.length)];function Lt(n,e,t){let i=Math.imul(n|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return i=Math.imul(i^i>>>13,1274126177),((i^i>>>16)>>>0)/4294967296}function yi(n,e,t){const i=Math.floor(n),r=Math.floor(e),s=n-i,a=e-r,o=s*s*(3-2*s),c=a*a*(3-2*a),l=Lt(i,r,t),h=Lt(i+1,r,t),d=Lt(i,r+1,t),u=Lt(i+1,r+1,t);return l+(h-l)*o+(d-l)*c+(l-h-d+u)*o*c}function ge(n,e,t){n=(n%1+1)%1,e=Math.max(0,Math.min(1,e)),t=Math.max(0,Math.min(1,t));const i=Math.floor(n*6),r=n*6-i,s=t*(1-e),a=t*(1-r*e),o=t*(1-(1-r)*e),[c,l,h]=[[t,o,s],[a,t,s],[s,t,o],[s,a,t],[o,s,t],[t,s,a]][i%6];return[Math.round(c*255),Math.round(l*255),Math.round(h*255)]}const f={BODY:1,BELLY:2,ACCENT:3,EYE:4,GLINT:5,TRUNK:6,LEAF:7,LEAF2:8,CLOTH:9,SKIN:10,HAIR:11,BROOM:12,STRAW:13,BODY2:14,BARK2:15,FLOWER:16,PUPIL:17,MAGIC:18,BARKD:19,LINE:20,IRIS:21,MAGIC2:22,NOSE:23,EAR:24,BODY3:25,LEAF3:26,BARKL:27,HAT:28,PHONES:29,TOP:30,JACKET:31,JEANS:32,SHOES:33,WATER:34,STONE:35,STONED:36,MOSS:37,CRYSTAL:38,RUNE:39,GLOW:40,WOOD:41,COLLAR:42,HAT1:43,HAT2:44,POM:45,SHADES:46,FRAME:47,SHOE:48,SOLE:49,WOKEN:50,WEB:51},Ua=4;function Ch(n,e,t,i=.12){const r=(s,a,o,c)=>{const l=o-s,h=c-a,d=Math.max(0,Math.min(1,((n-s)*l+(e-a)*h)/(l*l+h*h)));return Math.hypot(n-s-l*d,e-a-h*d)<i};switch((t%Ua+Ua)%Ua){case 0:return r(.5,.08,.5,.92)||r(.5,.1,.18,.4)||r(.5,.1,.82,.4);case 1:return r(.5,.08,.5,.92)||r(.5,.5,.18,.18)||r(.5,.5,.82,.18);case 2:return r(.2,.1,.8,.9)||r(.8,.1,.2,.9)||r(.5,.08,.5,.92);default:return r(.3,.08,.3,.92)||r(.3,.12,.75,.35)||r(.75,.35,.3,.55)||r(.3,.55,.78,.92)}}const rd=new Set([f.GLINT,f.MAGIC,f.MAGIC2,f.RUNE,f.GLOW,f.COLLAR,f.WOKEN]);function ac(n,e=!0,t=8){const i=n.length,r=[];if(i<3)return n.slice();const s=o=>e?n[(o+i)%i]:n[Math.max(0,Math.min(i-1,o))],a=e?i:i-1;for(let o=0;o<a;o++){const c=s(o-1),l=s(o),h=s(o+1),d=s(o+2),u=Math.max(2,Math.ceil(Math.hypot(h[0]-l[0],h[1]-l[1])/1.5),t);for(let p=0;p<u;p++){const g=p/u,v=g*g,x=v*g;r.push([0,1].map(m=>.5*(2*l[m]+(-c[m]+h[m])*g+(2*c[m]-5*l[m]+4*h[m]-d[m])*v+(-c[m]+3*l[m]-3*h[m]+d[m])*x)))}}return e||r.push(n[i-1]),r}function sd(n,{cap:e=1,capEnd:t=e}={}){const i=[],r=[],s=n.length;for(let c=0;c<s;c++){const l=n[Math.max(0,c-1)],h=n[Math.min(s-1,c+1)];let d=h[0]-l[0],u=h[1]-l[1];const p=Math.hypot(d,u)||1;d/=p,u/=p;const g=n[c][2]/2;i.push([n[c][0]-u*g,n[c][1]+d*g]),r.push([n[c][0]+u*g,n[c][1]-d*g])}const a=(c,l,h,d)=>{let u=c[0]-l[0],p=c[1]-l[1];const g=Math.hypot(u,p)||1;return[c[0]+u/g*h/2*d,c[1]+p/g*h/2*d]};return[...i,a(n[s-1],n[s-2],n[s-1][2],t),...r.reverse(),a(n[0],n[1],n[0][2],e)]}const Tt=(n,e)=>[n[0]+e[0],n[1]+e[1]],ci=(n,e,t)=>[n[0]+(e[0]-n[0])*t,n[1]+(e[1]-n[1])*t];function Sa(n,e,t,i,r,s=1){const a=[];for(let o=0;o<n.length;o++){if(a.push(n[o]),o<e||o>=t)continue;const c=n[o],l=n[(o+1)%n.length];let h=l[0]-c[0],d=l[1]-c[1];const u=Math.hypot(h,d)||1,p=d/u*s,g=-h/u*s;for(let v=1;v<=i;v++){const x=(v-.5)/i,m=ci(c,l,x),_=[m[0]+p*r-h/u*r*.5,m[1]+g*r-d/u*r*.5];a.push(ci(c,l,x-.45/i),_,ci(c,l,x+.35/i))}}return a}function oc(n,e,t){const i=new Uint8Array(n*e);let r=1/0,s=-1/0;for(const a of t)r=Math.min(r,a[1]),s=Math.max(s,a[1]);for(let a=Math.max(0,Math.floor(r));a<=Math.min(e-1,Math.ceil(s));a++){const o=a+.5,c=[];for(let l=0,h=t.length-1;l<t.length;h=l++){const[d,u]=t[l],[p,g]=t[h];u>o!=g>o&&c.push(d+(o-u)/(g-u)*(p-d))}c.sort((l,h)=>l-h);for(let l=0;l+1<c.length;l+=2)for(let h=Math.max(0,Math.ceil(c[l]-.5));h<=Math.min(n-1,Math.floor(c[l+1]-.5));h++)i[a*n+h]=1}return i}function ad(n,e,t){const r=new Float32Array(n*e),s=new Float32Array(n*e);for(let c=0;c<n*e;c++)t[c]&&(r[c]=1e4,s[c]=1e4);const a=c=>r[c]*r[c]+s[c]*s[c],o=(c,l,h,d,u)=>{const p=l+d,g=h+u;let v,x;if(p<0||g<0||p>=n||g>=e)v=d,x=u;else{const m=g*n+p;v=r[m]+d,x=s[m]+u}v*v+x*x<a(c)&&(r[c]=v,s[c]=x)};for(let c=0;c<e;c++){for(let l=0;l<n;l++){const h=c*n+l;t[h]&&(o(h,l,c,-1,0),o(h,l,c,0,-1),o(h,l,c,-1,-1),o(h,l,c,1,-1))}for(let l=n-1;l>=0;l--){const h=c*n+l;t[h]&&o(h,l,c,1,0)}}for(let c=e-1;c>=0;c--){for(let l=n-1;l>=0;l--){const h=c*n+l;t[h]&&(o(h,l,c,1,0),o(h,l,c,0,1),o(h,l,c,1,1),o(h,l,c,-1,1))}for(let l=0;l<n;l++){const h=c*n+l;t[h]&&o(h,l,c,-1,0)}}return{vx:r,vy:s}}class pn{constructor(e,t,i=1){this.sx=i,this.w=Math.round(e*i),this.h=t|0,this.m=new Uint8Array(this.w*this.h),this.n=new Float32Array(this.w*this.h*3),this.g=new Uint8Array(this.w*this.h)}inb(e,t){return e>=0&&t>=0&&e<this.w&&t<this.h}get(e,t){return e|=0,t|=0,this.inb(e,t)?this.m[t*this.w+e]:0}put(e,t,i,r=0,s=0,a=1){this.px(e*this.sx,t,i,r,s,a)}px(e,t,i,r=0,s=0,a=1){if(e=Math.floor(e),t=Math.floor(t),!this.inb(e,t))return;const o=t*this.w+e;this.m[o]=i,this.n[o*3]=r,this.n[o*3+1]=s,this.n[o*3+2]=a}recolour(e,t,i){e=Math.floor(e),t=Math.floor(t),this.inb(e,t)&&this.m[t*this.w+e]&&(this.m[t*this.w+e]=i)}ellipse(e,t,i,r,s,a={}){const{onlyOn:o,density:c=1,noise:l=0,seed:h=0,round:d=1}=a;e*=this.sx,i*=this.sx;for(let u=Math.max(0,Math.floor(t-r-1));u<Math.min(this.h,t+r+1);u++)for(let p=Math.max(0,Math.floor(e-i-1));p<Math.min(this.w,e+i+1);p++){const g=(p+.5-e)/i,v=(u+.5-t)/r,x=g*g+v*v;if(x>1)continue;const m=u*this.w+p;if(o&&!o.has(this.m[m]))continue;if(c<1){const w=l?yi(p/3.2,u/3.2,h)*l+(1-l)*.5:.5;if(Lt(p,u,h+77)>c*(.4+w*1.2)*(1.15-x*.5))continue}const _=g*d,M=v*d,S=Math.hypot(_,M,Math.sqrt(Math.max(0,1-x))+.15);this.px(p,u,s,_/S,M/S,(Math.sqrt(Math.max(0,1-x))+.15)/S)}}line(e,t,i,r,s,a,o,c=1){e*=this.sx,i*=this.sx;const l=Math.max(1,Math.ceil(Math.hypot(i-e,r-t)));for(let h=0;h<=l;h++){const d=h/l,u=e+(i-e)*d,p=t+(r-t)*d,g=Math.max(.5,(s+(a-s)*d)/2);for(let v=Math.floor(p-g);v<=p+g;v++)for(let x=Math.floor(u-g);x<=u+g;x++){const m=(x+.5-u)/g,_=(v+.5-p)/g;if(m*m+_*_>1)continue;const M=m*c,S=Math.hypot(M,_*.3,1);this.px(x,v,o,M/S,_*.3/S,1/S)}}}tri(e,t){let[[i,r],[s,a],[o,c]]=e;i*=this.sx,s*=this.sx,o*=this.sx;const l=(g,v,x,m,_,M)=>(g-_)*(m-M)-(x-_)*(v-M),h=Math.max(0,Math.floor(Math.min(i,s,o))),d=Math.min(this.w,Math.ceil(Math.max(i,s,o))),u=Math.max(0,Math.floor(Math.min(r,a,c))),p=Math.min(this.h,Math.ceil(Math.max(r,a,c)));for(let g=u;g<p;g++)for(let v=h;v<d;v++){const x=v+.5,m=g+.5,_=l(x,m,i,r,s,a),M=l(x,m,s,a,o,c),S=l(x,m,o,c,i,r);(_<0||M<0||S<0)&&(_>0||M>0||S>0)||this.px(v,g,t,0,-.2,.98)}}shape(e,t,i={}){return this.fillMask(oc(this.w,this.h,ac(e,!0,i.per||6)),t,i)}limb(e,t,i={}){return this.shape(sd(e,i),t,i)}fillMask(e,t,{group:i=1,line:r=!1,depth:s=0,round:a=1,onlyOn:o=null,keepNormals:c=!1,tilt:l=[0,0],lineMat:h=f.LINE}={}){const{w:d,h:u}=this;if(o)for(let x=0;x<d*u;x++)e[x]&&!o.has(this.m[x])&&(e[x]=0);const{vx:p,vy:g}=ad(d,u,e);let v=s;if(!v){for(let x=0;x<d*u;x++)e[x]&&(v=Math.max(v,Math.hypot(p[x],g[x])));v=Math.max(1.5,Math.min(v*.9,2.5+v*.35))}for(let x=0;x<u;x++)for(let m=0;m<d;m++){const _=x*d+m;if(!e[_])continue;if(c){this.m[_]=t;continue}const M=Math.hypot(p[_],g[_]),S=Math.min(1,Math.max(0,(M-.5)/v)),w=Math.min(2.6,(1-S)/Math.sqrt(Math.max(.02,1-(1-S)*(1-S))))*a;let E=p[_]/(M||1)*w+l[0],L=g[_]/(M||1)*w+l[1];const b=Math.hypot(E,L,1);this.m[_]=t,this.n[_*3]=E/b,this.n[_*3+1]=L/b,this.n[_*3+2]=1/b}if(r&&!c){const x=[];for(let m=0;m<u;m++)for(let _=0;_<d;_++){const M=m*d+_;if(e[M])for(const[S,w]of[[1,0],[-1,0],[0,1],[0,-1]]){const E=_+S,L=m+w;if(E<0||L<0||E>=d||L>=u)continue;const b=L*d+E;if(!e[b]&&this.m[b]&&this.g[b]!==i&&this.m[b]!==h){x.push(M);break}}}for(const m of x)this.m[m]=h}if(!c)for(let x=0;x<d*u;x++)e[x]&&(this.g[x]=i);return e}mark(e,t,i,r={}){return this.fillMask(oc(this.w,this.h,ac(e,!0,6)),t,{...r,onlyOn:new Set(i),keepNormals:!0})}grid(e,t,i=0,r=0,{round:s=1,flipX:a=!1}={}){const o=Math.max(...e.map(h=>h.length)),c=new Uint8Array(this.w*this.h),l=new Map;e.forEach((h,d)=>[...h].forEach((u,p)=>{const g=t[u];if(!g)return;const v=i+(a?o-1-p:p),x=r+d;this.inb(v,x)&&(c[x*this.w+v]=1,l.set(x*this.w+v,g))})),this.fillMask(c,f.BODY,{round:s,depth:2.5});for(const[h,d]of l)this.m[h]=d}}function wi(n,e,t,i=t.outline,r=_l){const{w:s,h:a}=n,o=()=>r(s,a),c=o(),l=o(),h=o(),d=c.getContext("2d").createImageData(s,a),u=l.getContext("2d").createImageData(s,a),p=h.getContext("2d").createImageData(s,a),g=i==="none"?null:i==="dark"?[22,18,30]:"tint";for(let v=0;v<a;v++)for(let x=0;x<s;x++){const m=v*s+x,_=n.m[m],M=m*4;if(!_){if(!g)continue;const b=[n.get(x+1,v),n.get(x-1,v),n.get(x,v+1),n.get(x,v-1)].find(P=>P);if(!b)continue;const A=g==="tint"?(e[b]||[0,0,0]).map(P=>P*.35|0):g;d.data.set([...A,255],M),u.data.set([128,128,255,255],M),p.data.set([128,128,255,255],M);continue}let S=e[_];_===f.LINE&&!S&&(S=g==="tint"||!g?(e[f.BODY2]||[0,0,0]).map(b=>b*.55|0):g),S=S||[255,0,255],d.data.set([...S,rd.has(_)?254:255],M);const w=n.n[m*3],E=n.n[m*3+1],L=n.n[m*3+2];u.data.set([w*127+128,E*127+128,L*255,255],M),p.data.set([-w*127+128,E*127+128,L*255,255],M)}return c.getContext("2d").putImageData(d,0,0),l.getContext("2d").putImageData(u,0,0),h.getContext("2d").putImageData(p,0,0),{A:c,N:l,NF:h,w:s,h:a}}const Ei=n=>{const e=Math.hypot(n[0],n[1],n[2])||1;return[n[0]/e,n[1]/e,n[2]/e]},ts=(n,e)=>[n[1]*e[2]-n[2]*e[1],n[2]*e[0]-n[0]*e[2],n[0]*e[1]-n[1]*e[0]],Ft=(n,e)=>n[0]*e[0]+n[1]*e[1]+n[2]*e[2],Rn=(n,e)=>[n[0]-e[0],n[1]-e[1],n[2]-e[2]],R={add:(n,e)=>[n[0]+e[0],n[1]+e[1],n[2]+e[2]],sub:Rn,mul:(n,e)=>[n[0]*e,n[1]*e,n[2]*e],lerp:(n,e,t)=>[n[0]+(e[0]-n[0])*t,n[1]+(e[1]-n[1])*t,n[2]+(e[2]-n[2])*t],norm:Ei,cross:ts,dot:Ft};function lc(n,e=[0,1,0]){const t=Ei(n);let i=ts(e,t);Math.hypot(...i)<1e-4&&(i=ts([0,0,1],t)),i=Ei(i);const r=ts(t,i);return[t,r,i]}function Lh(n,e){const t=Ft(n,e.axes[0]),i=Ft(n,e.axes[1]),r=Ft(n,e.axes[2]),[s,a,o]=e.r,c=Math.hypot(t/s,i/a,r/o),l=Math.hypot(t/(s*s),i/(a*a),r/(o*o));return l>1e-9?c*(c-1)/l:-Math.min(s,a,o)}function Ph(n,e){const{ba:t,l2:i,rr:r,a2:s,il2:a,r1:o,r2:c}=e,l=Ft(n,t),h=l-i,d=[n[0]*i-t[0]*l,n[1]*i-t[1]*l,n[2]*i-t[2]*l],u=Ft(d,d),p=l*l*i,g=h*h*i,v=Math.sign(r)*r*r*u;return Math.sign(h)*s*g>v?Math.sqrt(u+g)*a-c:Math.sign(l)*s*p<v?Math.sqrt(u+p)*a-o:(Math.sqrt(u*s*a)+l*r)*a-o}function Dh(n,e){const t=Math.abs(Ft(n,e.axes[0]))-e.h[0]+e.round,i=Math.abs(Ft(n,e.axes[1]))-e.h[1]+e.round,r=Math.abs(Ft(n,e.axes[2]))-e.h[2]+e.round;return Math.hypot(Math.max(t,0),Math.max(i,0),Math.max(r,0))+Math.min(Math.max(t,i,r),0)-e.round}const od=(n,e)=>e*(Math.sin(n[0]*23+n[1]*7)*Math.sin(n[1]*19-n[2]*11)+.5*Math.sin(n[2]*41+n[0]*29)),cc=(n,e)=>n.type==="ell"?Lh(Rn(e,n.cw),n):n.type==="box"?Dh(Rn(e,n.cw),n):Ph(Rn(e,n.aw),n),zr=(n,e)=>n.rough?cc(n,e)+od(e,n.rough):cc(n,e);class Xe{constructor({blend:e=.07}={}){this.parts=[],this.flats=[],this.blend=e,this.anchors={feet:[]}}ell(e,t,i,r={}){const s=r.axes||(r.dir?lc(r.dir,r.up):[[1,0,0],[0,1,0],[0,0,1]]);return this.parts.push({type:"ell",c:e,r:t,axes:s,mat:i,group:r.group??1,extra:!!r.extra,paint:r.paint,rough:r.rough,cut:!!r.cut}),this}box(e,t,i,r={}){const s=r.axes||(r.dir?lc(r.dir,r.up):[[1,0,0],[0,1,0],[0,0,1]]);return this.parts.push({type:"box",c:e,h:t,round:Math.min(r.round??.02,...t),axes:s,mat:i,group:r.group??1,extra:!!r.extra,paint:r.paint,rough:r.rough,cut:!!r.cut}),this}seg(e,t,i,r,s,a={}){return this.parts.push({type:"cone",a:e,b:t,r1:i,r2:r,mat:s,group:a.group??1,extra:!!a.extra,paint:a.paint,rough:a.rough,cut:!!a.cut}),this}chain(e,t,i={}){for(let r=0;r+1<e.length;r++)this.seg(e[r].slice(0,3),e[r+1].slice(0,3),e[r][3],e[r+1][3],t,i);return this}flat(e,t,i,r,s,a,o={}){return this.flats.push({c:e,u:Ei(t),v:Ei(i),su:r,sv:s,mask:a,group:o.group??30,extra:!!o.extra,bend:o.bend??.35}),this}field(e){let t=1/0;for(const i of this.parts){if(i.extra||i.cut)continue;let r;if(i.type==="ell")r=Lh(Rn(e,i.c),i);else if(i.type==="box")r=Dh(Rn(e,i.c),i);else{const s=Rn(i.b,i.a),a=Math.max(1e-9,Ft(s,s)),o=i.r1-i.r2;r=Ph(Rn(e,i.a),{ba:s,l2:a,rr:o,a2:a-o*o,il2:1/a,r1:i.r1,r2:i.r2})}r<t&&(t=r)}return t}static surface(e,t,i){const r=1/Math.hypot(i[0]/t[0],i[1]/t[1],i[2]/t[2]);return[e[0]+i[0]*r,e[1]+i[1]*r,e[2]+i[2]*r]}}const hc={towards:.6,away:-.6},ld=.52;function Sn(n,{height:e,scale:t,facing:i="towards",yaw:r=hc[i]??hc.towards,pitch:s=ld,lineGap:a=.12}={}){const o=Math.cos(r),c=Math.sin(r),l=Math.cos(s),h=Math.sin(s),d=V=>[V[0]*o-V[2]*c,V[1],V[0]*c+V[2]*o],u=V=>[V[0]*o+V[2]*c,V[1],-V[0]*c+V[2]*o],p=[0,-h,-l],g=[0,l,-h],v=[1,0,0],x=[0,h,l],m=n.blend,_=n.parts.map(V=>{if(V.type==="ell"){const Fe=d(V.c),Ke=V.axes.map(d),Ye=Math.max(...V.r);return{...V,cw:Fe,axes:Ke,bc:Fe,br:Ye+(V.rough||0)*1.5}}if(V.type==="box"){const Fe=d(V.c),Ke=V.axes.map(d);return{...V,cw:Fe,axes:Ke,bc:Fe,br:Math.hypot(...V.h)+(V.rough||0)*1.5}}const he=d(V.a),ae=d(V.b),Ee=Rn(ae,he),Je=Math.max(1e-9,Ft(Ee,Ee)),Ce=V.r1-V.r2;return{...V,aw:he,ba:Ee,l2:Je,rr:Ce,a2:Je-Ce*Ce,il2:1/Je,bc:R.lerp(he,ae,.5),br:Math.sqrt(Je)/2+Math.max(V.r1,V.r2)}}),M=n.flats.map(V=>{const he=d(V.c),ae=d(V.u),Ee=d(V.v);return{...V,cw:he,uw:ae,vw:Ee,nw:Ei(ts(ae,Ee)),bc:he,br:Math.hypot(V.su,V.sv)}}),S=[..._,...M],w=V=>{const he=Ft(V.bc,v),ae=Ft(V.bc,g),Ee=V.br+(V.uw?0:m);return[he-Ee,he+Ee,ae-Ee,ae+Ee]};for(const V of S)[V.x0,V.x1,V.u0,V.u1]=w(V);const E=S.filter(V=>!V.extra&&!V.cut),L=Math.min(...E.map(V=>V.u0+(V.uw?0:m))),b=Math.max(...E.map(V=>V.u1-(V.uw?0:m))),A=t??e/Math.max(1e-6,b-L),P=Math.min(...S.map(V=>V.x0)),C=Math.max(...S.map(V=>V.x1)),N=Math.min(...S.map(V=>V.u0)),U=Math.max(...S.map(V=>V.u1)),D=Math.ceil((C-P)*A)+4,F=Math.ceil((U-N)*A)+2,z=new pn(D,F),X=new Float32Array(D*F).fill(1/0),Q=new Int16Array(D*F).fill(-1),Y=8,te=Math.ceil(D/Y),O=Math.ceil(F/Y),ne=Array.from({length:te*O},()=>[]);S.forEach((V,he)=>{const ae=Math.max(0,Math.floor((V.x0-P)*A/Y)),Ee=Math.min(te-1,Math.floor(((V.x1-P)*A+2)/Y)),Je=Math.max(0,Math.floor((U-V.u1)*A/Y)),Ce=Math.min(O-1,Math.floor(((U-V.u0)*A+1)/Y));for(let Fe=Je;Fe<=Ce;Fe++)for(let Ke=ae;Ke<=Ee;Ke++)ne[Fe*te+Ke].push(he)});const ce=.25/A,be=(V,he)=>{const ae=Math.max(m-Math.abs(V-he),0)/m;return Math.min(V,he)-ae*ae*m*.25};for(let V=0;V<F;V++)for(let he=0;he<D;he++){const ae=ne[Math.floor(V/Y)*te+Math.floor(he/Y)];if(!ae.length)continue;const Ee=P+(he+.5-1)/A,Je=U-(V+.5)/A,Ce=R.add(R.add(R.mul(v,Ee),R.mul(g,Je)),R.mul(x,50));let Fe=1/0,Ke=-1/0;const Ye=[],bt=[];for(const Qe of ae){const ze=S[Qe],I=Rn(Ce,ze.bc),y=Ft(I,p),B=ze.br+(ze.uw?0:m),K=Ft(I,I)-B*B,Z=y*y-K;if(Z<0)continue;if(ze.uw){bt.push(ze);continue}if(ze.cut){Ye.push(ze);continue}const le=Math.sqrt(Z);Fe=Math.min(Fe,-y-le),Ke=Math.max(Ke,-y+le),Ye.push(ze)}let Ut=1/0,$t=-1,_t=0,yt=null;if(Ye.length){const Qe=new Map;for(const y of Ye){let B=Qe.get(y.group);B||Qe.set(y.group,B=[]),B.push(y)}const ze=(y,B)=>{let K=1/0;for(const Z of y)Z.cut||(K=K===1/0?zr(Z,B):be(K,zr(Z,B)));for(const Z of y)Z.cut&&(K=Math.max(K,-zr(Z,B)));return K};let I=Math.max(0,Fe);for(let y=0;y<96&&I<Ke;y++){const B=R.add(Ce,R.mul(p,I));let K=1/0,Z=null;for(const[le,ue]of Qe){const j=ze(ue,B);j<K&&(K=j,Z=le)}if(K<ce){const le=Qe.get(Z),ue=.5/A;yt=Ei([ze(le,[B[0]+ue,B[1],B[2]])-ze(le,[B[0]-ue,B[1],B[2]]),ze(le,[B[0],B[1]+ue,B[2]])-ze(le,[B[0],B[1]-ue,B[2]]),ze(le,[B[0],B[1],B[2]+ue])-ze(le,[B[0],B[1],B[2]-ue])]);let j=le[0],ie=1/0;for(const de of le){if(de.cut)continue;const Le=zr(de,B);Le<ie&&(ie=Le,j=de)}for(const de of le)if(de.cut&&-zr(de,B)>ie-ce*2){j=de;break}Ut=I,$t=Z,_t=j.paint?j.paint(u(B),j)??j.mat:j.mat;break}I+=Math.max(K*.9,ce*.5)}}for(const Qe of bt){const ze=Ft(p,Qe.nw);if(Math.abs(ze)<1e-4)continue;const I=Ft(Rn(Qe.cw,Ce),Qe.nw)/ze;if(I>=Ut)continue;const y=R.add(Ce,R.mul(p,I)),B=Rn(y,Qe.cw),K=Ft(B,Qe.uw)/Qe.su,Z=Ft(B,Qe.vw)/Qe.sv;if(Math.abs(K)>1||Math.abs(Z)>1)continue;const le=Qe.mask(K,Z);if(!le)continue;let ue=ze>0?R.mul(Qe.nw,-1):Qe.nw;ue=Ei(R.add(ue,R.add(R.mul(Qe.uw,K*Qe.bend),R.mul(Qe.vw,Z*Qe.bend*.5)))),Ut=I,$t=Qe.group,_t=le,yt=ue}if(!yt||!_t)continue;const G=V*D+he;X[G]=Ut,Q[G]=$t,z.px(he,V,_t,Ft(yt,v),-Ft(yt,g),Ft(yt,x))}const Ue=[];for(let V=0;V<F;V++)for(let he=0;he<D;he++){const ae=V*D+he;if(z.m[ae])for(const[Ee,Je]of[[1,0],[-1,0],[0,1],[0,-1]]){const Ce=he+Ee,Fe=V+Je;if(Ce<0||Fe<0||Ce>=D||Fe>=F)continue;const Ke=Fe*D+Ce;if(z.m[Ke]&&Q[Ke]!==Q[ae]&&X[Ke]-X[ae]>a){Ue.push(ae);break}}}for(const V of Ue)[f.EYE,f.GLINT,f.MAGIC,f.MAGIC2,f.NOSE,f.COLLAR,f.WOKEN,f.RUNE,f.GLOW].includes(z.m[V])||(z.m[V]=f.LINE);for(let V=0;V<F;V++)for(let he=0;he<D;he++){const ae=V*D+he;if(z.m[ae]!==f.EYE)continue;const Ee=V>0&&z.m[ae-D]===f.EYE,Je=he>0&&z.m[ae-1]===f.EYE,Ce=he+1<D&&z.m[ae+1]===f.EYE&&V+1<F&&z.m[ae+D]===f.EYE;!Ee&&!Je&&Ce&&(z.m[ae]=f.GLINT)}let ke=-1;for(let V=F-1;V>=0&&ke<0;V--)for(let he=0;he<D;he++)if(z.m[V*D+he]){ke=V;break}const ee=ke>=0&&ke<F-1?F-1-ke:0;if(ke>=0&&ke<F-1){const V=F-1-ke;for(let he=F-1;he>=0;he--)for(let ae=0;ae<D;ae++){const Ee=he*D+ae,Je=(he-V)*D+ae,Ce=he-V>=0;z.m[Ee]=Ce?z.m[Je]:0,z.g[Ee]=Ce?z.g[Je]:0;for(let Fe=0;Fe<3;Fe++)z.n[Ee*3+Fe]=Ce?z.n[Je*3+Fe]:0}}return z.bodyH=Math.round((b-L)*A),{sp:z,s:A,project:V=>{const he=d(V);return[+((he[0]-P)*A+1).toFixed(1),+((U-Ft(he,g))*A+ee).toFixed(1)]}}}const kn=(n,e=9,t=.3)=>Lt(Math.floor(n[0]*e),Math.floor(n[1]*e)+Math.floor(n[2]*e)*97,7)<t,Wi={wing:(n,e)=>(t,i)=>{const r=(t+1)/2,s=1-.35*r*r,a=-1+.55*r+.18*Math.abs(Math.sin(r*Math.PI*6));return i>s||i<a?null:i>s-.35*(1-r*.5)?e:Math.floor(r*9)%2?n:e},ear:(n,e=f.EAR,t=f.BODY3)=>(i,r)=>{const s=(r+1)/2,a=.95*Math.sin(Math.PI*Math.min(1,.15+s*.85))*(1-s*.35);return Math.abs(i)>a?null:s>.82?t:Math.abs(i)<a*.5&&s<.7&&s>.12?e:n},flame:(n,e)=>(t,i)=>{const r=(i+1)/2,s=Math.sin(Math.PI*Math.min(1,r*1.1))*(1-r)*1.4;return Math.abs(t)>s?null:Math.abs(t)<s*.45&&r<.6?e:n},membrane:n=>(e,t)=>{const i=(e+1)/2,r=-1+.35*Math.abs(Math.sin(i*Math.PI*3));return t<r||t>1-.2*i?null:n},spotted:(n,e,t)=>(i,r)=>{if(Math.hypot(i,r*1.2)>1)return null;const a=Math.hypot(i-.35,r-.1);return a<.18?t:a<.3?e:n}},cd={hair:f.HAIR,hat:f.HAT,headphones:f.PHONES,top:f.TOP,jacket:f.JACKET,jeans:f.JEANS,sneakers:f.SHOES,broom:f.BROOM,bristles:f.STRAW,skin:f.SKIN},uc={hair:[.01,.7,.85],hat:[.74,.45,.45],headphones:[.92,.55,.9],top:[.13,.15,.95],jacket:[.72,.45,.7],jeans:[.6,.5,.7],sneakers:[0,0,.95],broom:[.08,.55,.55],bristles:[.12,.55,.9],skin:[.07,.3,.94]};function hd(n,e=uc){const t={...uc,...e},i={hair:n.hairHue,jacket:n.cloakHue,hat:n.hatHue,top:n.topHue,jeans:n.jeansHue,sneakers:n.shoeHue,headphones:n.phonesHue},r={};for(const[s,a]of Object.entries(cd)){const[o,c,l]=t[s];r[a]=ge(i[s]??o,c,l)}return r[f.EYE]=[24,18,30],r[f.GLINT]=[255,255,245],r[f.NOSE]=[20,16,24],r[f.MAGIC]=ge(n.glowHue??.13,.5,1),r[f.MAGIC2]=ge(n.glowHue??.13,.15,1),r[f.BELLY]=[245,245,240],r}const ud={rise:.78,descend:-.66,brake:.44};function dd(n){const e=new Xe({blend:.03}),t=n%3,i=.5,r=.05,s=[[0,.02,-.01],[.02,-.01,.02],[-.01,.015,.01]][t],a=g=>i-r*(g/.62);e.seg([-.5,a(-.5),0],[.62,a(.62),0],.022,.018,f.BROOM,{group:2}),e.ell([-.64,a(-.64)+.005,0],[.2,.1,.11],f.STRAW,{dir:[1,r*1.6,0],group:3,paint:g=>g[0]<-.76?f.MAGIC2:g[0]>-.5?f.BROOM:void 0});const o=[-1,1].map(g=>[.5,a(.5)+.03,g*.045]),c=[-1,1].map(g=>[.2,i+.24+s[1],g*.1]);for(const g of[0,1]){const v=g?1:-1,x=v>0?7:5;e.seg(c[g],o[g],.04,.03,f.JACKET,{group:x}),e.ell(o[g],[.035,.03,.035],f.SKIN,{group:x})}const l=[.3+s[0],i+.27+s[1],0],h=[.07,i+.28+s[1]*.5,0],d=[-.15,i+.35+s[2],0];e.ell(h,[.17,.1,.11],f.JACKET,{dir:[1,-.25,0],group:1,paint:g=>g[1]<h[1]-.04&&Math.abs(g[2])<.055?f.TOP:void 0}),e.ell(d,[.11,.08,.1],f.JEANS,{dir:[1,-.3,0],group:1}),e.chain([[...R.add(d,[-.02,.06,0]),.07],[...R.add(d,[-.18,.08+s[0]*2,0]),.05],[...R.add(d,[-.34,.05+s[1]*3,.02]),.025]],f.JACKET,{group:12}),[[[-.32,i+.5+s[1]*2,-.07],[-.46,i+.38+s[0]*2,-.08]],[[-.34,i+.33+s[2]*2,.08],[-.55,i+.44-s[1]*3,.1]]].forEach(([g,v],x)=>{const m=x?6:4,_=R.add(d,[-.04,0,x?.06:-.06]);e.seg(_,g,.055,.045,f.JEANS,{group:m}),e.seg(g,v,.045,.04,f.JEANS,{group:m}),e.ell(R.add(v,[-.05,0,0]),[.08,.04,.045],f.SHOES,{dir:[-1,.3,0],group:m,paint:M=>M[1]<v[1]-.03?f.BELLY:void 0})}),e.ell(l,[.11,.115,.1],f.SKIN,{group:8,paint:g=>g[0]<l[0]-.01||g[1]>l[1]+.075?f.HAIR:void 0});for(const g of[-1,1]){const v=Xe.surface(l,[.11,.115,.1],R.norm([.85,.1,g*.45]));e.ell(v,[.026,.036,.026],f.BELLY,{group:8}),e.ell(R.add(v,[.012,0,g*.004]),[.014,.018,.014],f.EYE,{group:8})}e.ell(Xe.surface(l,[.11,.115,.1],R.norm([1,-.45,0])),[.012,.016,.04],f.BELLY,{group:8}),e.chain([[...R.add(l,[-.06,.03,0]),.065],[...R.add(l,[-.22,.05+s[1]*2,.01]),.05],[...R.add(l,[-.4,.06+s[2]*3,.02]),.03],[...R.add(l,[-.55,.07+s[0]*3,.02]),.012]],f.HAIR,{group:9});for(const g of[-1,1])e.ell(R.add(l,[-.015,0,g*.105]),[.05,.055,.03],f.PHONES,{group:10});e.chain([[...R.add(l,[-.005,.03,-.095]),.015],[...R.add(l,[-.02,.12,0]),.015],[...R.add(l,[-.005,.03,.095]),.015]],f.PHONES,{group:10});const p=R.add(l,[-.1+s[0],.2+s[1]*2,0]);e.ell(p,[.16,.014,.15],f.HAT,{dir:[1,.9,0],group:11}),e.chain([[...R.add(p,[-.02,.02,0]),.08],[...R.add(p,[-.14,.13,0]),.04],[...R.add(p,[-.3,.14+s[2]*2,0]),.012]],f.HAT,{group:11,paint:g=>Math.hypot(g[0]-p[0],g[1]-p[1])<.06?f.MAGIC:void 0}),e.seg(R.add(p,[.08,-.02,.08]),R.add(l,[.04,-.09,.08]),.008,.008,f.HAT,{group:11});for(const[g,v,x,m]of[[-.86,a(-.8)+.05,.03,.22],[-.88,a(-.8)-.04,-.04,.16],[-.7,i+.45,.05,.14],[-.2,i+.5,-.04,.12]]){const _=t*.05%.1;e.seg([g-_,v,x],[g-_-m,v,x],.01,.004,f.MAGIC2,{group:30,extra:!0})}return e.ell([.02,.005,0],[.2,.005,.12],f.NOSE,{group:0}),e}const fd={stand:{frames:3,fps:3},land:{frames:3,fps:10},takeoff:{frames:3,fps:10},talk:{frames:4,fps:2.5},placeSigil:{frames:3,fps:6},liftSigil:{frames:3,fps:6},sit:{frames:2,fps:1.5}},wo=.34,Ih={binding:[-.02,.31,-.2],dir:[.02,1,-.04]},pd={stand:[0,1,2].map(n=>({breathe:[0,.006,.012][n],sway:[0,.02,.035][n],free:[.04,.5+[0,.006,.012][n],.18],hand:"rest",broom:Ih})),land:[{crouch:.2,hop:.01,broom:{astride:!0},sway:.05},{crouch:.1,bend:.1,broom:{binding:[-.28,.26,-.08],dir:[.6,.5,-.06]},legUp:[.18,.24,.12],sway:.03,free:[.2,.58,.2],hand:"rest"},{breathe:.004,broom:{binding:[.06,.31,-.2],dir:[.18,1,-.03]},sway:.015,free:[.06,.52,.19],hand:"rest"}],takeoff:[{crouch:.1,broom:{binding:[-.1,.3,-.17],dir:[.35,.7,-.04]},free:[.16,.58,.2],hand:"rest",sway:.02},{crouch:.15,bend:.1,broom:{binding:[-.3,.28,-.06],dir:[.7,.4,-.04]},legUp:[.1,.26,.13],sway:.04,free:[.24,.55,.17],hand:"rest"},{hop:.1,broom:{astride:!0},toes:!0,sway:.06}],talk:[{free:[.47,.84,.13],hand:"palm",tilt:.35,mouth:!0,sway:.01},{free:[.32,1.18,.12],hand:"point",tilt:-.25,look:.12,sway:.02},{free:[.24,1.16,.3],elbow:[.26,.88,.26],hand:"wave",tilt:.45,mouth:!0,sway:.03},{free:[.15,.76,.1],hand:"chest",tilt:-.35,breathe:.01,sway:.015}],placeSigil:[{free:[.16,1.62,.1],hand:"palm",look:.22,breathe:.01,sway:.02},{free:[.42,1,.12],hand:"palm",look:.08,sway:.03},{crouch:.7,bend:.55,free:[.38,.1,.13],hand:"down",look:-.08,sway:.04}],liftSigil:[{crouch:.7,bend:.55,free:[.36,.08,.13],hand:"down",look:-.08,sway:.02},{crouch:.25,bend:.18,free:[.44,.82,.12],hand:"palm",look:.05,sway:.04},{breathe:.012,free:[.2,1.64,.1],hand:"palm",look:.25,sway:.05,toes:!0}],sit:[0,1].map(n=>({sit:!0,swing:[.06,-.06][n],bend:-.08,look:[.02,.1][n],tilt:[.15,-.2][n],sway:[.01,.03][n],breathe:[0,.008][n],broom:{binding:[-.24,.31,-.3],dir:[.32,1,-.06]},free:[.2,wo+.14,.15],far:[.18,wo+.14,-.13],hand:"rest"}))};function md(n,e,t){const i=Math.hypot(e[0]-n[0],e[1]-n[1]),r=R.lerp(n,e,.5);if(i>=2*t)return r;const s=Math.sqrt(t*t-i*i/4),a=(e[0]-n[0])/i,o=(e[1]-n[1])/i;return[r[0]-o*s,r[1]+a*s,r[2]]}function gd(n,e){const t=pd[n],i={crouch:0,bend:0,hop:0,breathe:0,sway:0,tilt:0,look:0,broom:Ih,...t[e%t.length]},r=new Xe({blend:.03}),s=i.hop,a=i.sway,o=i.sit?wo+.06:.45-i.crouch*.21+s,c=-i.crouch*.12,l=!!i.broom.astride,h=o-.04,d=l?[1,0,0]:R.norm(i.broom.dir),u=l?[-.36,h,0]:i.broom.binding,p=A=>R.add(u,R.mul(d,A));r.seg(p(0),p(l?.98:1.1),.022,.018,f.BROOM,{group:2}),r.ell(p(-.13),[.17,.07,.08],f.STRAW,{dir:d,group:3,paint:A=>{const P=R.dot(R.sub(A,u),d);return P<-.22?f.MAGIC2:P>-.01?f.BROOM:void 0}});for(const A of[-1,1]){const P=A>0?6:4,C=[c,o,A*.07],N=i.sit?i.swing*A:0,U=i.sit?[.24+N,.09+Math.max(0,N)*.6,A*.1]:A>0&&i.legUp?i.legUp:[(A>0?.05:-.01)+(i.toes?-.03:0),.07+(i.toes?s*.4:s),A*.1],D=i.sit?[.21,o+.01,A*.09]:md(C,U,.21);r.seg(C,D,.055,.045,f.JEANS,{group:P}),r.seg(D,U,.045,.04,f.JEANS,{group:P});const F=i.toes?[.03,-.045,0]:[.05,-.03,0];r.ell(R.add(U,F),[.08,.04,.045],f.SHOES,{dir:i.toes?[1,-.6,0]:[1,0,0],group:P,paint:z=>z[1]<U[1]+F[1]-.015?f.BELLY:void 0})}const g=[Math.sin(i.bend),Math.cos(i.bend),0],v=[Math.cos(i.bend),-Math.sin(i.bend),0],x=[c,o+.03,0];r.ell(x,[.1,.08,.105],f.JEANS,{group:1});const m=R.add(x,R.add(R.mul(g,.19),[0,i.breathe,0]));r.ell(m,[.1,.15+i.breathe*.5,.115],f.JACKET,{dir:v,group:1,paint:A=>R.dot(R.sub(A,m),v)>.045&&Math.abs(A[2])<.05?f.TOP:void 0}),r.chain([[...R.add(m,R.add(R.mul(v,-.07),R.mul(g,-.08))),.07],[...R.add(m,R.add(R.mul(v,-.11-a),R.mul(g,-.2))),.05],[...R.add(m,R.add(R.mul(v,-.13-a*1.6),R.mul(g,-.29))),.025]],f.JACKET,{group:12});const _=R.add(m,R.add(R.mul(g,.27),[i.look*.03,0,i.tilt*.04])),M=A=>R.add(m,R.add(R.mul(g,.1),[0,0,A*.12])),S=l?[.28,h+.03,-.05]:p(Math.max(.12,(Math.min(.62,o+.2)-u[1])/Math.max(.3,d[1]))),w=l?[.28,h+.03,.05]:i.free;for(const A of[-1,1]){const P=A>0?7:5,C=M(A),N=A>0?w:i.far||S,U=A>0&&i.elbow?i.elbow:R.add(R.lerp(C,N,.5),[-.03,-.02,A*.05]);r.seg(C,U,.04,.035,f.JACKET,{group:P}),r.seg(U,N,.035,.03,f.JACKET,{group:P});const D=A>0&&!l?i.hand:"grip";if(D==="palm")r.ell(N,[.045,.02,.04],f.SKIN,{group:P});else if(D==="down")r.ell(N,[.045,.02,.04],f.SKIN,{dir:[1,.15,0],group:P});else if(D==="wave"){r.ell(N,[.03,.045,.04],f.SKIN,{group:P});for(const F of[-1,0,1])r.seg(R.add(N,[0,.03,F*.02]),R.add(N,[F*.01,.065,F*.03]),.01,.008,f.SKIN,{group:P})}else D==="point"?(r.ell(N,[.035,.03,.035],f.SKIN,{group:P}),r.seg(R.add(N,[0,.02,0]),R.add(N,[.01,.08,0]),.012,.01,f.SKIN,{group:P})):r.ell(N,[.035,.03,.035],f.SKIN,{group:P})}r.ell(_,[.11,.115,.1],f.SKIN,{group:8,paint:A=>A[0]<_[0]-.01||A[1]>_[1]+.075?f.HAIR:void 0});for(const A of[-1,1])r.ell(Xe.surface(_,[.11,.115,.1],R.norm([.85,.05+i.look,A*.45+i.tilt*.1])),[.016,.026,.016],f.EYE,{group:8});i.mouth&&r.ell(Xe.surface(_,[.11,.115,.1],R.norm([1,-.5+i.look,i.tilt*.1])),[.012,.016,.025],f.NOSE,{group:8}),r.chain([[...R.add(_,[-.06,.02,0]),.06],[...R.add(_,[-.12-a,-.12,.02+i.tilt*.03]),.05],[...R.add(_,[-.13-a*1.5,-.25,.03+i.tilt*.04]),.03]],f.HAIR,{group:9});for(const A of[-1,1])r.ell(R.add(_,[-.015,0,A*.105]),[.05,.055,.03],f.PHONES,{group:10});r.chain([[...R.add(_,[-.005,.03,-.095]),.015],[...R.add(_,[-.005,.11,-.05]),.015],[...R.add(_,[-.005,.125,0]),.015],[...R.add(_,[-.005,.11,.05]),.015],[...R.add(_,[-.005,.03,.095]),.015]],f.PHONES,{group:10});const E=R.add(_,[-.03,.1,i.tilt*.02]),L=i.tilt*.05,b=R.add(E,[-.16-a*.5,.27,L*2]);return r.ell(E,[.16,.014,.15],f.HAT,{dir:[1,.25-i.look*.8,i.tilt*.3],group:11}),r.chain([[...R.add(E,[0,.01,0]),.085],[...R.add(E,[-.05,.17,L]),.045],[...b,.012]],f.HAT,{group:11,paint:A=>A[1]<E[1]+.045?f.MAGIC:void 0}),r.ell([.02,.005,0],[.2,.005,.12],f.NOSE,{group:0}),r.anchors.hand=w,r.anchors.hatTip=b,r}function Nh({frame:n=0,lean:e=!1,pose:t}={}){if(t==="fast")return dd(n);if(fd[t])return gd(t,n);const i=t==="rise",r=t==="descend",s=t==="brake",a=i||r||s,o=new Xe({blend:.03}),c=a?0:[0,.025,.045][n%3],l=a?0:[0,.015,-.01][n%3]+(e?.08:0),h=.42+c,d=i?.3:r?-.27:s?-.12:e?.1:0,u=Math.min(.1,Math.max(0,d)),p=a?[.02,.06][n%2]:[0,.03,.05][n%3],g=r?1:i?-.6:0;o.seg([-.5,h-l*2,0],[.62,h+l*3,0],.022,.018,f.BROOM,{group:2}),s?o.ell([-.56,h-.08,0],[.17,.07,.09],f.STRAW,{dir:[.55,1,0],group:3,paint:M=>M[1]<h-.18?f.MAGIC2:M[1]>h-.01?f.BROOM:void 0}):o.ell([-.62,h-l*2-.01,0],[.17,.07,.08],f.STRAW,{dir:[1,l,0],group:3,paint:M=>M[0]<-.72?f.MAGIC2:M[0]>-.5?f.BROOM:void 0});for(const M of[-1,1]){const S=[-.04,h+.06,M*.07],w=s?[.18,h-.01,M*.14]:r?[.16,h-.05,M*.14]:i?[.06,h-.07,M*.14]:[.12+d*.5,h-.02,M*.14],E=s?M>0?[.44,h-.02+p,M*.13]:[.3,h-.16,M*.13]:r?[.2,h-.26,M*.13]:i?[-.1,h-.23,M*.13]:[.08+d,h-.2,M*.13];o.seg(S,w,.055,.045,f.JEANS,{group:M>0?6:4}),o.seg(w,E,.045,.04,f.JEANS,{group:M>0?6:4}),o.ell(R.add(E,[.05,-.02,0]),[.08,.04,.045],f.SHOES,{group:M>0?6:4,paint:L=>L[1]<E[1]-.04?f.BELLY:void 0})}o.ell([-.04,h+.08,0],[.11,.07,.1],f.JEANS,{group:1});const v=[0+d*.8,h+.26-Math.abs(d)*.3,0];o.ell(v,[.1,.16,.11],f.JACKET,{dir:[d*2.5,1,0],up:[-1,0,0],group:1,paint:M=>M[0]>v[0]+.04&&Math.abs(M[2])<.055?f.TOP:void 0}),s?o.chain([[...R.add(v,[-.08,-.06,0]),.07],[...R.add(v,[-.02,.12+p,.02]),.05],[...R.add(v,[.14,.18+p,.03]),.025]],f.JACKET,{group:12}):a&&o.chain([[...R.add(v,[-.08,-.1,0]),.07],[...R.add(v,[-.2,-.12+g*(.08+p),0]),.05],[...R.add(v,[-.3,-.12+g*(.16+p*1.5),.02]),.025]],f.JACKET,{group:12});const x=R.add(v,[.03+d*.5,.26,0]),m=R.add(x,[s?.05:r?-.01:-.03,s?.06:.1,0]);for(const M of[-1,1]){const S=R.add(v,[.01,.11,M*.11]),w=r&&M>0?R.add(m,[.1,.01,.1]):s?[.3,h+.03,M*.05]:[.26+d,h+.03,M*.05],E=r&&M>0?R.add(S,[.1,.02,.1]):R.lerp(S,w,.5);o.seg(S,E,.04,.035,f.JACKET,{group:M>0?7:5}),o.seg(E,w,.035,.03,f.JACKET,{group:M>0?7:5}),o.ell(w,[.035,.03,.035],f.SKIN,{group:M>0?7:5})}o.ell(x,[.11,.115,.1],f.SKIN,{group:8,paint:M=>M[0]<x[0]-.01||M[1]>x[1]+.075?f.HAIR:void 0});for(const M of[-1,1])o.ell(Xe.surface(x,[.11,.115,.1],R.norm([.85,.05,M*.45])),[.016,.026,.016],f.EYE,{group:8});s?o.chain([[...R.add(x,[-.06,.06,0]),.06],[...R.add(x,[.04,.13+p,.03]),.045],[...R.add(x,[.2,.08+p,.04]),.02]],f.HAIR,{group:9}):o.chain([[...R.add(x,[-.06,.02,0]),.06],[...R.add(x,[-.18-u,-.05+p+g*.1,.02]),.045],[...R.add(x,[-.3-u*1.5,-.08+p*1.6+g*.22,.03]),.02]],f.HAIR,{group:9});for(const M of[-1,1])o.ell(R.add(x,[-.015,0,M*.105]),[.05,.055,.03],f.PHONES,{group:10});o.chain([[...R.add(x,[-.005,.03,-.095]),.015],[...R.add(x,[-.005,.11,-.05]),.015],[...R.add(x,[-.005,.125,0]),.015],[...R.add(x,[-.005,.11,.05]),.015],[...R.add(x,[-.005,.03,.095]),.015]],f.PHONES,{group:10});const _=i?.1:0;if(o.ell(m,[.16,.014,.15],f.HAT,{dir:s?[1,-.55,0]:[1,.25+_*3,0],group:11}),o.chain(s?[[...R.add(m,[0,.01,0]),.085],[...R.add(m,[.06,.16,0]),.045],[...R.add(m,[.2,.22+p*.5,0]),.012]]:[[...R.add(m,[0,.01,0]),.085],[...R.add(m,[-.05-u-_*.5,.17-_*.3,0]),.045],[...R.add(m,[-.16-u*1.5-_,.27+p*.5-_*.5,0]),.012]],f.HAT,{group:11,paint:M=>M[1]<m[1]+.045?f.MAGIC:void 0}),a){const M=ud[t]+(s?[0,.06][n%2]:0),S=Math.cos(M),w=Math.sin(M),E=[0,h,0],L=C=>[E[0]+(C[0]-E[0])*S-(C[1]-E[1])*w,E[1]+(C[0]-E[0])*w+(C[1]-E[1])*S,C[2]],b=C=>[E[0]+(C[0]-E[0])*S+(C[1]-E[1])*w,E[1]-(C[0]-E[0])*w+(C[1]-E[1])*S,C[2]],A=C=>[C[0]*S-C[1]*w,C[0]*w+C[1]*S,C[2]];for(const C of o.parts)if(C.type==="ell"?(C.c=L(C.c),C.axes=C.axes.map(A)):(C.a=L(C.a),C.b=L(C.b)),C.paint){const N=C.paint;C.paint=(U,D)=>N(b(U),D)}for(const C of o.flats)C.c=L(C.c),C.u=A(C.u),C.v=A(C.v);const P=Math.min(...o.parts.map(C=>C.type==="ell"?C.c[1]-Math.max(...C.r):Math.min(C.a[1]-C.r1,C.b[1]-C.r2)));if(P<.08)for(const C of o.parts){const N=.08-P;C.type==="ell"?C.c=[C.c[0],C.c[1]+N,C.c[2]]:(C.a=[C.a[0],C.a[1]+N,C.a[2]],C.b=[C.b[0],C.b[1]+N,C.b[2]])}if(s){const C=L([-.45,h-.24,0]);for(let N=0;N<5;N++){const U=N+n*.5,D=.055-N*.008;o.ell([C[0]+.1+U*.08,Math.max(.04,C[1]-.02+Math.sin(U*1.9)*.04),Math.cos(U*1.3)*.06],[D,D*.8,D],N<2?f.BELLY:N%2?f.MAGIC:f.MAGIC2,{group:25+N,extra:!0})}}if(i){const C=L([-.8,h,0]);for(let N=0;N<5;N++){const U=N+n*.5,D=.05-N*.007;o.ell([C[0]-.02+Math.sin(U*2.1)*.06,Math.max(.04,C[1]-.08-U*.09),Math.cos(U*1.7)*.05],[D,D,D],N%2?f.MAGIC:f.MAGIC2,{group:20+N,extra:!0})}}}return o.ell([.02,.005,0],[.2,.005,.12],f.NOSE,{group:0}),o}const Ml=(n={})=>Math.round((n.size||8)*Math.sqrt(n.growth||20)*(2/(n.pixel||3))*1.9),Fa=new Map,Uh=n=>(Fa.has(n)||Fa.set(n,Sn(Nh({frame:0}),{height:n}).s),Fa.get(n)),xd=(n={})=>Uh(Ml(n));function vd(n={},{frame:e=0,lean:t=!1,facing:i="towards",pose:r}={}){const s=Ml(n),a=Nh({frame:e,lean:t,pose:r}),{sp:o,project:c}=r?Sn(a,{scale:Uh(s),facing:i}):Sn(a,{height:s,facing:i});a.anchors.hand&&(o.anchors={hand:c(a.anchors.hand),hatTip:c(a.anchors.hatTip)});let l=0;for(let h=0;h<400&&l<6;h++){const d=h*37%o.w,u=h*53%Math.floor(o.h*.8);o.get(d,u)||o.get(d+1,u)||o.get(d-1,u)||o.get(d,u+1)||o.get(d,u-1)||(d*7+u*13+e*5)%11||(o.px(d,u,f.MAGIC2),l++)}return o}const st=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},pr=n=>{const e=st(Math.floor(n[0]*14)+Math.floor(n[2]*14)*13,Math.floor(n[1]*6));return e<.14?f.BARKD:e>.88?f.BARKL:void 0},_d=n=>e=>{const t=st(Math.floor(e[0]*10),Math.floor(e[1]*10)+Math.floor(e[2]*10)*7);return e[1]<n[1]-.2||t<.2?f.LEAF3:t>.8?f.LEAF2:void 0},ei=(n,e,t,i,r=!0)=>n.ell(e,t,f.STONE,{group:i,rough:.025,paint:s=>s[1]>e[1]+t[1]*.45&&r?f.MOSS:Math.abs(Math.sin(s[0]*13+s[2]*7))<.06?f.STONED:void 0}),ps=(n,e,t,i)=>n.ell(e,t,f.LEAF,{group:i,rough:.04,paint:_d(e)}),Qt=(n,e,t)=>n.chain(e,f.TRUNK,{group:t,rough:.012,paint:pr}),ms=(n,e,t,i,r,s=.3,a=f.LEAF2)=>{for(let o=0;o<e;o++){const c=st(r,o)*6.283,l=t*Math.sqrt(st(o,r)),h=Math.cos(c)*l,d=Math.sin(c)*l*.7;n.ell([h,s*.3,d],[.07,s*(.35+st(o,4)*.3),.07],a,{group:i+o%3,paint:u=>u[1]>s*.45?f.LEAF:void 0})}},gs=(n,e,t,i)=>n.ell(e,[t[0],.015,t[1]],f.WATER,{group:i}),Md={"sleeping-giant"(n){const e=t=>i=>{const r=st(Math.floor(i[0]*8),Math.floor(i[2]*8)+Math.floor(i[1]*8)*5);return r<.15?f.LEAF3:r>.86?f.LEAF2:void 0};for(const[t,i]of[[[.85,.42,0],[.7,.5,.66]],[[0,.3,0],[.62,.36,.6]],[[-.8,.3,0],[.56,.36,.62]],[[1.85,.5,.02],[.5,.5,.48]],[[-1.55,.72,.3],[.38,.5,.3]],[[-1.55,.72,-.3],[.38,.5,.3]],[[-2.2,.3,.32],[.42,.3,.26]],[[-2.2,.3,-.32],[.42,.3,.26]],[[.6,.2,.78],[.75,.2,.2]],[[.6,.2,-.78],[.75,.2,.2]]])n.ell(t,i,f.MOSS,{group:1,rough:.03,paint:e()});ei(n,[2.25,.75,.12],[.13,.15,.11],2,!1);for(const t of[-.12,.22])n.ell([2.12,.88,t],[.08,.04,.07],f.STONED,{group:3});ei(n,[-.2,.16,.95],[.2,.15,.18],4),ei(n,[-.2,.16,-.95],[.18,.14,.16],5),n.ell([2,.95,.02],[.42,.14,.4],f.LEAF3,{group:6,rough:.03}),ms(n,26,2.8,10,3,.3)},"fern-grotto"(n){n.ell([0,.16,0],[.78,.2,.72],f.STONE,{group:1,rough:.015,paint:e=>e[1]>.3?f.MOSS:void 0}),gs(n,[0,.345,0],[.55,.5],2);for(let e=0;e<6;e++){const t=e/6*Math.PI*2+.4,i=1.5+st(e)*.3,r=[Math.cos(t)*i,0,Math.sin(t)*i*.8],s=1.1+st(e,2)*.7,a=R.add(r,[0,s,0]);n.seg(r,a,.12,.09,f.TRUNK,{group:3+e,rough:.02,paint:pr});for(let o=0;o<7;o++){const c=o/7*Math.PI*2+e,l=[Math.cos(c),0,Math.sin(c)];n.chain([[...a,.05],[...R.add(a,R.add(R.mul(l,.45),[0,.18,0])),.04],[...R.add(a,R.add(R.mul(l,.9),[0,-.15,0])),.015]],o%2?f.LEAF:f.LEAF2,{group:10+e})}}for(let e=0;e<5;e++){const t=e*1.3;ei(n,[Math.cos(t)*.95,.08,Math.sin(t)*.95],[.16,.12,.14],20+e)}},"sunken-boat"(n){gs(n,[.3,.01,.15],[1.9,1.15],1);const e=[0,.12,0],t=R.norm([1,.28,.12]);n.ell(e,[1.3,.45,.55],f.WOOD,{dir:t,group:2,paint:i=>(R.dot(R.sub(i,e),[0,1,0])*9+9)%1<.14?f.BARKD:i[1]>.35&&st(Math.floor(i[0]*9))<.4?f.MOSS:void 0}),n.ell(R.add(e,[0,.14,0]),[1.2,.4,.47],f.BARKD,{dir:t,group:2,cut:!0});for(let i=-2;i<=2;i++)n.seg(R.add(e,R.add(R.mul(t,i*.4),[0,.1,-.42])),R.add(e,R.add(R.mul(t,i*.4),[0,.1,.42])),.04,.04,f.WOOD,{group:3});n.seg([-.9,.05,.7],[.3,1,.55],.03,.03,f.WOOD,{group:4}),n.box([-.98,.06,.72],[.2,.02,.07],f.WOOD,{dir:[1.2,-.8,-.15],group:4}),ms(n,18,2.2,10,5,.45)},"bramble-wagon"(n){const e=R.norm([1,-.12,0]);n.box([0,.62,0],[1.1,.22,.52],f.WOOD,{dir:e,round:.04,group:1,paint:t=>(t[0]+3)*4%1<.08?f.BARKD:void 0}),n.box([0,.72,0],[1,.2,.43],f.BARKD,{dir:e,group:1,cut:!0});for(const[t,i,r,s]of[[-.72,.55,.4,.4],[-.72,-.55,.4,.4],[.72,-.55,.32,.37]])n.ell([t,r,i],[s,s,.06],f.WOOD,{group:2+(t>0?1:0)+(i>0?2:0),paint:a=>{const o=a[0]-t,c=a[1]-r,l=Math.hypot(o,c),h=Math.atan2(c,o);return l>s*.82||l<s*.18?f.BARKD:Math.abs(Math.sin(h*4))<.2?f.WOOD:f.NOSE}});n.ell([.95,.1,.75],[.37,.06,.37],f.WOOD,{group:7,paint:t=>Math.hypot(t[0]-.95,t[2]-.75)>.3?f.BARKD:void 0});for(const t of[-.3,.3])n.seg([1.05,.55,t],[1.9,.05,t*1.4],.04,.035,f.WOOD,{group:8});for(let t=0;t<14;t++){const i=st(t,1)*6.283,r=Math.cos(i)*1.5,s=Math.sin(i)*.9,a=[[r,0,s,.03]];for(let o=1;o<4;o++)a.push([r*(1-o*.28)+(st(t,o)-.5)*.5,.25+o*.25+st(o,t)*.2,s*(1-o*.3)+(st(o,t*3)-.5)*.4,.025-o*.004]);if(n.chain(a,f.BARKD,{group:10+t%3}),t%2===0){const o=a[3];n.ell([o[0],o[1],o[2]],[.18,.13,.16],f.LEAF,{group:14,rough:.03,paint:c=>st(Math.floor(c[0]*30),Math.floor(c[1]*30))<.1?f.ACCENT:void 0})}}},"beehive-tree"(n){for(const[t,i,r]of[[-.2,0,-.25],[.15,-.1,.2],[0,.15,.05]])Qt(n,[[t,0,i,.22],[t+r*.8,1.4,i,.16],[t+r*2,2.8,i-.1,.08]],1);for(const[t,i]of[[[-.6,2.9,-.2],[.9,.6,.7]],[[.6,3,-.2],[.85,.6,.7]],[[0,3.4,-.3],[.9,.55,.7]]])ps(n,t,i,3);Qt(n,[[.2,1.9,-.05,.08],[.75,2.05,.15,.05]],2);const e=[.72,1.6,.2];n.ell(e,[.24,.42,.22],f.STRAW,{group:4,paint:t=>{const i=Math.floor((t[1]-e[1])*14),r=Math.floor(Math.atan2(t[2]-e[2],t[0]-e[0])*3+i%2*.5);return st(i,r)<.3?f.BARK2:void 0}}),n.seg([.75,2.02,.15],[.72,1.9,.2],.05,.1,f.STRAW,{group:4});for(let t=0;t<6;t++){const i=t*1.9;n.ell([e[0]+Math.cos(i)*.45,e[1]+Math.sin(t*2.3)*.35,e[2]+Math.sin(i)*.35],[.03,.025,.03],f.MAGIC,{group:20+t,extra:!0})}},"fairy-ring"(n){n.ell([0,.005,0],[1.9,.005,1.5],f.LEAF3,{group:0});for(let e=0;e<9;e++){const t=e/9*Math.PI*2,i=[Math.cos(t)*1.6,0,Math.sin(t)*1.25],r=.35+st(e)*.35;n.box(R.add(i,[0,r/2,0]),[.13,r/2,.1],f.STONE,{dir:[-Math.sin(t),0,Math.cos(t)],round:.05,rough:.015,group:1+e,paint:a=>e===2&&Math.abs(a[1]-r*.55)<r*.22&&Math.abs(a[0]-i[0]-0)<.05?f.RUNE:a[1]>r*.85?f.MOSS:void 0});const s=R.add(i,[Math.cos(t+.35)*.25,0,Math.sin(t+.35)*.2]);n.seg(s,R.add(s,[0,.16,0]),.035,.03,f.CLOTH,{group:12}),n.ell(R.add(s,[0,.18,0]),[.1,.06,.1],f.ACCENT,{group:13,paint:a=>st(Math.floor(a[0]*60),Math.floor(a[2]*60))<.15?f.BELLY:void 0})}},"charcoal-hut"(n){const e=[0,2,0];for(let i=0;i<20;i++){const r=i/20*Math.PI*2;Math.abs(r-1.2)<.35||n.seg([Math.cos(r)*.95,0,Math.sin(r)*.8],R.add(e,[Math.cos(r)*.08,.1+st(i)*.25,Math.sin(r)*.08]),.05,.03,i%3?f.TRUNK:f.BARKD,{group:1+i%2})}n.ell([0,.6,0],[.85,.6,.7],f.BARKD,{group:3});const t=[1.7,0,.3];n.ell(t,[.85,.42,.7],f.BARKD,{group:4,rough:.03,paint:i=>st(Math.floor(i[0]*14),Math.floor(i[2]*14)+Math.floor(i[1]*14))<.07?f.GLOW:i[1]>.3?f.SHADES:void 0});for(let i=0;i<4;i++)n.seg([-1.4,.1+i*.14,-.5+i%2*.05],[-1.4,.1+i*.14,.5],.07,.07,f.TRUNK,{group:5+i%2,paint:r=>Math.abs(r[2])>.46?f.BARKL:void 0})},"root-arch"(n){Qt(n,[[-1.8,0,.1,.4],[-1.4,1.2,0,.34],[-.4,2.3,-.1,.3],[.6,2.4,0,.28],[1.5,1.4,.1,.32],[1.9,0,.15,.38]],1),Qt(n,[[-1.4,0,-.6,.28],[-.6,1.6,-.5,.22],[.5,1.9,-.45,.2],[1.3,.9,-.4,.22],[1.5,0,-.35,.26]],2),Qt(n,[[-1.8,.2,.1,.3],[-2.4,.05,.5,.12]],1),Qt(n,[[1.9,.2,.15,.3],[2.5,.05,.55,.12]],1);for(const[e,t]of[[[-.2,2.6,-.2],[.7,.35,.5]],[[.8,2.5,-.25],[.55,.3,.45]]])ps(n,e,t,4);for(let e=0;e<4;e++)ei(n,[-.7+e*.45,.12,(st(e)-.5)*.5],[.22,.18,.2],6+e);n.box([0,.35,-.2],[.16,.35,.08],f.STONE,{round:.05,rough:.01,group:11,paint:e=>Math.abs(e[1]-.4)<.14&&Math.abs(e[0])<.05?f.MAGIC:e[1]>.62?f.MOSS:void 0})},"turf-hut"(n){n.box([0,.55,0],[1,.55,.7],f.WOOD,{round:.04,group:1,paint:e=>e[1]*7%1<.18?f.BARKD:e[2]>.66&&Math.abs(e[0]+.2)<.2&&e[1]<.85?f.NOSE:e[2]>.66&&Math.abs(e[0]-.5)<.14&&Math.abs(e[1]-.7)<.12?f.SHADES:void 0});for(const e of[-1,1])n.box([0,1.3,e*.4],[1.15,.05,.5],f.MOSS,{dir:[1,0,0],up:[0,1,-e*.75],round:.03,group:2,paint:t=>st(Math.floor(t[0]*12),Math.floor(t[2]*12))<.25?f.LEAF2:void 0});n.seg([.65,1.2,-.3],[.65,1.9,-.3],.15,.13,f.STONE,{group:3,rough:.015});for(let e=0;e<5;e++)ei(n,[-1.4+e*.7,.12,.9+st(e)*.3],[.2,.15,.18],4+e);ms(n,16,1.8,10,9,.25)},"heron-rookery"(n){Qt(n,[[0,0,0,.25],[.4,1.4,0,.18],[.9,2.8,-.1,.12],[1.3,3.8,-.2,.06]],1);const e=[[[.6,2,-.05],[-.3,2,-.1]],[[1,3,-.1],[1.8,2.9,0]],[[1.25,3.6,-.2],[.6,3.7,-.3]]];e.forEach(([r,s],a)=>{Qt(n,[[...r,.07],[...s,.04]],2),n.ell(R.add(s,[0,.08,0]),[.34,.13,.3],f.BARK2,{group:3+a,rough:.025,paint:o=>Math.abs(Math.sin(o[0]*30+o[2]*20))<.25?f.STRAW:o[1]<s[1]+.02?f.BARKD:void 0})});for(const[r,s]of[[[1.2,4,-.4],[.6,.4,.45]],[[.3,3.1,-.5],[.45,.3,.35]],[[1.9,3.3,-.4],[.4,.3,.35]]])ps(n,r,s,7);const t=R.add(e[1][1],[0,.42,.05]),i=1.6;n.ell(t,[.18*i,.1*i,.09*i],f.BELLY,{dir:[1,.3,0],group:10,paint:r=>r[1]>t[1]+.06?f.STONE:void 0}),n.chain([[...R.add(t,[.12*i,.06*i,0]),.035*i],[...R.add(t,[.2*i,.22*i,0]),.03*i],[...R.add(t,[.16*i,.32*i,0]),.04*i]],f.BELLY,{group:10}),n.seg(R.add(t,[.18*i,.33*i,0]),R.add(t,[.36*i,.3*i,0]),.015*i,.005*i,f.BODY2,{group:11});for(const r of[-.04,.04])n.seg(R.add(t,[0,-.06*i,r]),R.add(t,[.02,-.42,r]),.012,.012,f.BARKD,{group:12})},sundial(n){n.ell([0,.07,0],[1.05,.09,1],f.STONE,{group:1,rough:.01}),n.ell([0,.2,0],[.72,.09,.68],f.STONE,{group:2,rough:.01,paint:e=>e[1]>.26&&st(Math.floor(e[0]*8),Math.floor(e[2]*8))<.3?f.MOSS:void 0}),n.seg([0,.28,0],[0,.95,0],.16,.13,f.STONE,{group:3,paint:e=>Math.abs(Math.sin(e[1]*30))<.15?f.STONED:void 0}),n.ell([0,1,0],[.38,.04,.38],f.FRAME,{group:4,paint:e=>{const t=Math.atan2(e[2],e[0]);return Math.abs(Math.sin(t*6))<.12&&Math.hypot(e[0],e[2])>.26?f.BARKD:void 0}}),n.box([0,1.12,0],[.2,.1,.01],f.FRAME,{dir:[1,-.5,0],round:.005,group:5});for(let e=0;e<22;e++){const t=e/22*Math.PI*2,i=1.25+st(e)*.2,r=[Math.cos(t)*i,0,Math.sin(t)*i*.85];n.seg(r,R.add(r,[0,.18,0]),.015,.012,f.LEAF2,{group:6}),n.ell(R.add(r,[0,.2,0]),[.05,.04,.05],[f.FLOWER,f.BELLY,f.ACCENT][e%3],{group:7})}},"bear-den"(n){const e=[0,.3,-.2];n.ell(e,[1.7,1.15,1.25],f.LEAF,{group:1,rough:.05,paint:t=>{const i=st(Math.floor(t[0]*16),Math.floor(t[1]*16)+Math.floor(t[2]*16)*3);return i<.06?f.ACCENT:i<.2?f.BARKD:t[1]<.4?f.LEAF3:i>.85?f.LEAF2:void 0}}),n.ell([.35,.35,.95],[.5,.55,.4],f.NOSE,{group:1,cut:!0}),n.seg([2,0,.5],[2,.65,.5],.3,.27,f.TRUNK,{group:3,paint:t=>t[1]>.6?f.BARKL:Math.abs(Math.sin(Math.atan2(t[2]-.5,t[0]-2)*3))<.12&&t[1]>.2?f.BARKD:void 0})},"stilt-hut"(n){gs(n,[0,.01,.1],[2.1,1.3],1);for(const[e,t]of[[-.75,-.55],[.75,-.55],[-.75,.55],[.75,.55]])n.seg([e,0,t],[e,1.05,t],.07,.06,f.WOOD,{group:2,paint:i=>i[1]<.15?f.MOSS:void 0});n.box([0,1.1,0],[1.05,.05,.8],f.WOOD,{round:.02,group:3,paint:e=>(e[0]+3)*6%1<.12?f.BARKD:void 0}),n.box([-.1,1.6,-.1],[.7,.45,.55],f.WOOD,{round:.03,group:4,paint:e=>e[2]>.4&&Math.abs(e[0]-.1)<.18&&e[1]<1.85?f.NOSE:void 0});for(const[e,t]of[[2.1,.92],[2.35,.72],[2.58,.48],[2.76,.24]])n.ell([-.1,e,-.1],[t,.16,t*.85],f.STRAW,{group:5,paint:i=>Math.abs(Math.sin(Math.atan2(i[2]+.1,i[0]+.1)*18))<.25?f.BARK2:void 0});for(const e of[.72,.95])n.seg([.9,1.1,e],[1.15,0,e],.02,.02,f.WOOD,{group:6});for(let e=0;e<4;e++)n.seg([.92+e*.06,1-e*.26,.72],[.92+e*.06,1-e*.26,.95],.02,.02,f.WOOD,{group:6});for(let e=0;e<26;e++){const t=st(e,7)*6.283,i=1.5+st(e,8)*.7,r=[Math.cos(t)*i,0,Math.sin(t)*i*.7],s=.5+st(e,9)*.5;n.seg(r,R.add(r,[0,s,0]),.028,.02,f.LEAF2,{group:10+e%3}),e%3===0&&n.ell(R.add(r,[0,s-.05,0]),[.025,.07,.025],f.BARKD,{group:13})}},"bog-shrine"(n){gs(n,[.6,.01,.4],[1.4,.9],1),n.seg([0,0,0],[0,1.9,0],.2,.17,f.TRUNK,{group:2,rough:.01,paint:e=>{const t=e[1];return e[2]>.12&&(Math.abs(t-1.6)<.05&&Math.abs(Math.abs(e[0])-.08)<.05||Math.abs(t-1.38)<.04&&Math.abs(e[0])<.1)||t*5%1<.07?f.BARKD:e[1]>1.85?f.MOSS:void 0}}),n.ell([0,1.95,0],[.24,.1,.24],f.MOSS,{group:3});for(let e=0;e<6;e++){const t=e/6*Math.PI*2;n.seg([Math.cos(t)*1,0,Math.sin(t)*.8],[Math.cos(t)*1,.35+st(e)*.25,Math.sin(t)*.8],.05,.04,f.TRUNK,{group:4})}n.ell([-.25,.06,.3],[.14,.07,.13],f.EAR,{group:5}),ei(n,[.3,.07,.3],[.09,.07,.08],6,!1),ei(n,[.15,.05,.42],[.06,.05,.06],7,!1);for(const[e,t,i]of[[.9,.9,.5],[1.4,1.2,.1],[.4,1.4,.8]])n.ell([e,t,i],[.06,.07,.06],f.MAGIC,{group:20+e*10,extra:!0,paint:r=>Math.hypot(r[0]-e,r[1]-t)<.03?f.MAGIC2:void 0});ms(n,20,2,10,11,.3,f.WEB)},"raven-tree"(n){Qt(n,[[0,0,0,.3],[.1,1.3,0,.22],[-.1,2.5,-.1,.16],[.1,3.6,-.15,.07]],1),[[[.1,1.6,0],[1.3,2.3,.1],[1.8,2.2,.1]],[[-.05,2.1,-.05],[-1.2,2.8,-.1],[-1.6,3.2,-.1]],[[0,2.9,-.1],[.8,3.5,-.2]]].forEach((r,s)=>Qt(n,r.map((a,o)=>[...a,.12-o*.04]),2+s)),Qt(n,[[-.1,.5,0,.22],[-1.1,.1,.5,.08]],5),Qt(n,[[.1,.4,0,.2],[.9,.05,-.4,.08]],5);const t=(r,s)=>{n.ell(r,[.12,.07,.06],f.SHADES,{dir:[1,.2,0],group:s}),n.ell(R.add(r,[.11,.07,0]),[.05,.05,.045],f.SHADES,{group:s}),n.seg(R.add(r,[.15,.07,0]),R.add(r,[.22,.05,0]),.015,.004,f.BODY2,{group:s}),n.seg(R.add(r,[-.1,0,0]),R.add(r,[-.22,-.04,0]),.04,.015,f.SHADES,{group:s})};t([1.3,2.42,.1],10),t([-1.2,2.92,-.1],11),t([.8,3.62,-.2],12),t([-.05,3.72,-.15],13);const i=[1.55,1.45,.1];n.seg([1.55,2.25,.1],R.add(i,[0,.3,0]),.01,.01,f.FRAME,{group:14});for(let r=0;r<6;r++){const s=r/6*Math.PI*2;n.seg(R.add(i,[Math.cos(s)*.2,-.25,Math.sin(s)*.2]),R.add(i,[Math.cos(s)*.12,.3,Math.sin(s)*.12]),.012,.012,f.FRAME,{group:14})}n.seg(R.add(i,[0,-.27,0]),R.add(i,[0,-.25,0]),.22,.22,f.FRAME,{group:14})},barrow(n){n.ell([0,0,-.2],[2.3,.95,1.3],f.LEAF2,{group:1,rough:.03,paint:e=>st(Math.floor(e[0]*10),Math.floor(e[2]*10)+Math.floor(e[1]*10))<.25?f.LEAF:void 0});for(const e of[-.35,.35])n.box([e,.45,.95],[.12,.45,.12],f.STONE,{round:.03,rough:.01,group:2});n.box([0,.95,.95],[.55,.1,.14],f.STONE,{round:.03,rough:.01,group:3,paint:e=>e[1]>1.02?f.MOSS:void 0}),n.box([0,.4,.9],[.23,.4,.3],f.NOSE,{group:1,cut:!0});for(const[e,t,i]of[[-1.6,1,.7],[1.7,.9,.55]])n.box([e,i/2,t],[.12,i/2,.09],f.STONE,{round:.04,rough:.01,group:4})},cairn(n){let e=0;for(let i=0;i<6;i++){const r=.9-i*.14,s=Math.max(3,9-i);for(let a=0;a<s;a++){const o=a/s*Math.PI*2+i;ei(n,[Math.cos(o)*r*.8,e+.14,Math.sin(o)*r*.7],[.24-i*.02,.15,.2-i*.02],1+(i+a)%4,i<2)}e+=.26}const t=[0,e+.1,0];for(let i=0;i<6;i++){const r=i/6*Math.PI*2;n.seg(R.add(t,[Math.cos(r)*.12,0,Math.sin(r)*.12]),R.add(t,[Math.cos(r)*.3,.35,Math.sin(r)*.3]),.02,.02,f.FRAME,{group:6})}n.seg(R.add(t,[0,-.3,0]),t,.05,.05,f.FRAME,{group:6}),n.ell(R.add(t,[0,.14,0]),[.2,.07,.2],f.SHADES,{group:7})},"stump-throne"(n){n.ell([0,.28,0],[.92,.34,.86],f.TRUNK,{group:1,rough:.015,paint:pr}),n.ell([0,.58,0],[.84,.06,.78],f.BARKL,{group:1,paint:e=>Math.abs(Math.sin(Math.hypot(e[0],e[2])*30))<.3?f.BARK2:void 0}),n.box([-.55,1.15,0],[.18,.62,.62],f.TRUNK,{round:.1,rough:.01,group:2,paint:pr});for(const e of[-.6,.6])n.box([-.1,.72,e],[.45,.14,.12],f.TRUNK,{round:.06,group:3,paint:pr});for(let e=0;e<6;e++){const t=e/6*Math.PI*2+.3;Qt(n,[[Math.cos(t)*.8,.25,Math.sin(t)*.8,.18],[Math.cos(t)*1.4,.02,Math.sin(t)*1.3,.06]],4)}n.seg([1.5,.18,.8],[1.5,.18,.2],.18,.18,f.TRUNK,{group:5,paint:e=>e[2]>.78||e[2]<.22?f.BARKL:pr(e)}),n.seg([1.5,.3,.5],[1.6,.75,.5],.025,.025,f.WOOD,{group:6}),n.box([1.5,.36,.5],[.1,.06,.015],f.FRAME,{group:6});for(let e=0;e<6;e++){const t=e<3?0:1,i=e%3;n.seg([-1.7+i*.3+t*.15,.15+t*.26,-.7],[-1.7+i*.3+t*.15,.15+t*.26,.2],.14,.14,f.TRUNK,{group:7+e%2,paint:r=>r[2]>.16||r[2]<-.66?f.BARKL:void 0})}},"swing-beech"(n){Qt(n,[[0,0,-.3,.45],[0,1.6,-.3,.36],[-.1,2.8,-.4,.26]],1),Qt(n,[[0,2.2,-.3,.2],[1,2.6,-.2,.14],[1.9,2.75,-.1,.08]],2),Qt(n,[[-.05,2.5,-.35,.18],[-1.2,3,-.4,.1]],3);for(let e=0;e<5;e++){const t=e/5*Math.PI*2;Qt(n,[[Math.cos(t)*.35,.3,-.3+Math.sin(t)*.3,.2],[Math.cos(t)*.9,.02,-.3+Math.sin(t)*.8,.07]],4)}for(const[e,t]of[[[0,3.4,-.6],[1.4,.8,1]],[[1.4,3.1,-.4],[.9,.55,.7]],[[-1.3,3.2,-.6],[.9,.6,.7]]])ps(n,e,t,5);for(const e of[-.12,.12])n.seg([1.3,2.65,e],[1.3,.55,e],.012,.012,f.STRAW,{group:6});n.box([1.3,.53,0],[.08,.025,.18],f.WOOD,{round:.01,group:6});for(let e=0;e<9;e++)n.ell([(st(e,1)-.5)*3,.05+st(e,2)*.5,(st(e,3)-.3)*1.6],[.022,.022,.022],f.MAGIC,{group:20+e,extra:!0})},bower(n){for(const t of[-.9,0,.9])for(const i of[-.6,.6])n.seg([t,0,i],[t,1.2,i],.04,.04,f.WOOD,{group:1});for(const t of[-.9,0,.9])n.chain([[t,1.2,-.6,.04],[t,1.62,-.3,.04],[t,1.72,0,.04],[t,1.62,.3,.04],[t,1.2,.6,.04]],f.WOOD,{group:2});for(const t of[-.6,.6])for(const i of[.5,1])n.seg([-.9,i,t],[.9,i,t],.025,.025,f.WOOD,{group:3});const e=t=>{const i=st(Math.floor(t[0]*26),Math.floor(t[1]*26)+Math.floor(t[2]*26)*3);return i<.12?f.BELLY:i<.2?f.STRAW:i>.85?f.LEAF2:void 0};for(const[t,i]of[[[-.6,1.6,0],[.6,.3,.75]],[[.5,1.65,0],[.65,.3,.75]],[[-.95,.9,-.55],[.25,.65,.25]],[[.95,.8,-.6],[.25,.55,.25]],[[-.9,.7,.62],[.22,.5,.2]],[[.2,1.3,-.65],[.5,.4,.2]]])n.ell(t,i,f.LEAF,{group:4,rough:.04,paint:e});n.box([0,.4,-.35],[.6,.04,.15],f.WOOD,{round:.02,group:5});for(const t of[-.5,.5])n.seg([t,0,-.35],[t,.38,-.35],.03,.03,f.WOOD,{group:5})}},Fh={moor:["sleeping-giant","the sleeping giant, a moss mound like a figure lying on its back",1],"fern-forest":["fern-grotto","a ring of giant tree ferns round a stone basin",1],"muddy-forest":["sunken-boat","an old rowing boat sunk in the mud",1.15],"tangly-forest":["bramble-wagon","an old wagon wrapped in brambles",1.1],"wispy-forest":["beehive-tree","a many-trunked tree with a great wild honeycomb",1],"hazel-forest":["fairy-ring","a ring of fairy stones and toadstools",1.1],"twiggy-forest":["charcoal-hut","a charcoal burner's hut of sticks, its mound smouldering",1],ancient:["root-arch","a great arch of roots over mossy stones",1.1],norway:["turf-hut","a log cabin with a turf roof",1.15],"alder-forest":["heron-rookery","an alder holding herons' stick nests",1],meadow:["sundial","a moonlit sundial on a stone dais in a ring of flowers",1.2],"berry-thicket":["bear-den","a bear's den in a bramble mound",1.1],wetland:["stilt-hut","a fisher's hut on stilts over a pool",1.1],bog:["bog-shrine","a carved post shrine to the bog, will-o'-wisps over the pool",1.1],deadwood:["raven-tree","a dead tree where the ravens gather",1],grassland:["barrow","a barrow with a stone doorway",1],heath:["cairn","a tall cairn with an old beacon basket",1.4],"old-pinewood":["stump-throne","a woodcutter's stump throne",1.1],"bluebell-glade":["swing-beech","a great beech with a rope swing, glowworms beneath",1],"honeysuckle-tangle":["bower","a honeysuckle bower with a bench",1.2]};function Sd(n,e){const t=n.leaf,i=e.trunkHue??.07;return{[f.TRUNK]:ge(i,.45,.36),[f.BARKD]:ge(i+.03,.5,.17),[f.BARKL]:ge(i,.35,.55),[f.BARK2]:ge(i+.02,.45,.26),[f.LEAF]:ge(t,.55,.45),[f.LEAF2]:ge(t-.03,.5,.62),[f.LEAF3]:ge(t+.03,.6,.26),[f.STONE]:[122,120,128],[f.STONED]:[62,60,70],[f.MOSS]:ge(.26,.45,.45),[f.WOOD]:[128,92,58],[f.STRAW]:[190,162,104],[f.CLOTH]:[228,220,200],[f.EAR]:[168,96,66],[f.FRAME]:[150,128,84],[f.SHADES]:[30,28,36],[f.ACCENT]:[196,40,52],[f.BELLY]:[232,228,214],[f.BODY2]:[210,170,60],[f.FLOWER]:[180,140,230],[f.WEB]:[228,228,234],[f.WATER]:[52,78,104],[f.NOSE]:[16,14,20],[f.GLOW]:[255,120,40],[f.MAGIC]:ge(e.magicHue??.45,.6,1),[f.MAGIC2]:ge(e.magicHue??.45,.2,1),[f.RUNE]:[120,230,255],[f.LINE]:[24,22,30]}}function bd(n,e,t,i=16){const r=new Xe({blend:.05});Md[n](r),r.ell([0,.004,0],[.01,.004,.01],f.NOSE,{group:0});const s=(Object.values(Fh).find(([o])=>o===n)||[,,1])[2],{sp:a}=Sn(r,{scale:xd(t)*s});return{sp:a,colours:Sd(e,t),metres:{width:+(a.w/i).toFixed(1),height:+(a.h/i).toFixed(1)}}}const yd=1.3,wd=n=>[1,Math.sqrt(n.growth),Math.sqrt(n.growth)*yd,n.growth],kr=(n,e,t=1)=>Math.round(e.size*wd(e)[Math.max(0,Math.min(3,n))]*(2/(e.pixel||2))*1.9*t),Sl=(n,e)=>{const t=Ma(e);for(let i=0;i<9;i++){const r=Math.floor(ye(t,2,n.w-2)),s=Math.floor(ye(t,2,n.h*.6));if(!(n.get(r,s)||n.get(r+1,s)||n.get(r-1,s)||n.get(r,s+1)||n.get(r,s-1))&&(n.px(r,s,f.MAGIC2),i%3===0))for(const[a,o]of[[1,0],[-1,0],[0,1],[0,-1]])n.px(r+a,s+o,f.MAGIC)}};function ba(n,e,t,i,r,s,a,o){const c=R.add(e,[-i*.7,i*(.75+r),t*i*.35]),l=R.norm(R.sub(c,e)),h=R.norm(R.sub([1,0,0],R.mul(l,R.dot([1,0,0],l)))),d=Math.hypot(...R.sub(c,e));n.flat(R.add(R.lerp(e,c,.5),R.mul(h,-i*.14)),l,h,d*.55,i*.34,Wi.wing(s,a),{group:o,extra:!0})}const bl=(n,e,t=1)=>n===0?Math.round(Math.max(12,Math.min(30*Math.max(.75,Math.min(1.1,t)),kr(1,e)*t*.72))):n===2?Math.round(Math.max(kr(1,e)*t*1.08,Math.min(kr(2,e,t),kr(1,e)*1.4))):kr(n,e)*t;let qs=null;function Ed(n,e){const t=qs;qs=n;try{return e()}finally{qs=t}}const Ad=(n,e)=>{const t=Math.atan2(e,n);return Math.hypot(n,e)<.55+.4*Math.pow(Math.abs(Math.cos(t*2.5+Math.PI/2)),3)},Td=(n,e)=>{const t=n*1.2,i=-e*1.2+.25;return Math.pow(t*t+i*i-.6,3)-t*t*i*i*i<0};function yl(n){const e=qs,t=n.anchors;if(!e)return;const i=t.head,r=i?Math.max(...i.r):.2;if(e.collar&&(t.neck||i)){const s=t.neck||{c:R.add(i.c,[-i.r[0]*.8,-i.r[1]*.4,0]),r:i.r[1]*.75,dir:R.norm([1,.4,0])},a=R.norm(s.dir),o=R.norm(R.cross(a,Math.abs(a[2])<.9?[0,0,1]:[1,0,0])),c=R.cross(a,o),l=[],h=Math.max(.03,s.r*.2);for(let v=0;v<=16;v++){const x=v/16*Math.PI*2,m=R.add(R.mul(o,Math.cos(x)),R.mul(c,Math.sin(x)));let _=0;for(;_<.8&&n.field(R.add(s.c,R.mul(m,_)))<0;)_+=.01;_>=.8&&(_=s.r),l.push([...R.add(s.c,R.mul(m,_+h*.7)),h])}n.chain(l,f.COLLAR,{group:60,extra:!0});const d=l.reduce((v,x)=>x[0]-x[1]*.6+x[2]*.5>v[0]-v[1]*.6+v[2]*.5?x:v),u=h*1.3*(s.tag||1),p=R.norm(R.add(R.norm(R.sub(d.slice(0,3),s.c)),[.3,-.5,.3]));let g=d.slice(0,3);for(let v=0;v<60&&n.field(g)<u*.4;v++)g=R.add(g,R.mul(p,.01));n.ell(g,[u,u,u*.6],f.COLLAR,{group:60,extra:!0})}if(e.hat!=null&&i){const s=Math.max(r,.13),a=i.top||R.add(Xe.surface(i.c,i.r,R.norm([-.15,1,.1])),[0,r*.1,0]),o=R.norm([.3,1,.35]),c=s*1.5,l=R.add(a,R.mul(o,c));n.seg(R.add(a,R.mul(o,-s*.1)),l,s*.48,s*.04,f.HAT1,{group:61,extra:!0,paint:h=>Math.floor(R.dot(R.sub(h,a),o)/(c/5)+10)%2?f.HAT2:void 0}),n.ell(l,[s*.17,s*.17,s*.17],f.POM,{group:61,extra:!0})}if(e.glasses&&t.eyes&&i){const[s,a]=t.eyes.pts,o=l=>R.add(l,R.mul(R.norm(R.sub(l,i.c)),t.eyes.size*.45)),c=Math.max(t.eyes.size*1.05,r*.1);if(e.glasses==="bar")n.seg(o(s),o(a),c,c,f.SHADES,{group:62,extra:!0}),n.ell(R.add(o(a),[c*.3,c*.5,c*.2]),[c*.25,c*.25,c*.25],f.GLINT,{group:62,extra:!0});else for(const l of[s,a]){const h=R.norm(R.sub(l,i.c)),d=R.norm(R.cross([0,1,0],h)),u=R.cross(h,d),p=e.glasses==="heart"?Td:Ad,g=c*1.5;n.flat(o(l),d,u,g,g,(v,x)=>p(v,x)?p(v*1.3,x*1.3)?f.SHADES:f.FRAME:null,{group:62,bend:.1,extra:!0}),n.seg(o(s),o(a),c*.18,c*.18,f.FRAME,{group:62,extra:!0})}}if(e.shoes)for(const s of t.feet){const a=e.shoes==="platform",o=s.r,c=R.add(s.c,[o*.25,o*(a?.35:.15),0]);n.ell(c,[o*1.45,o*(a?1.2:.85),o*1.15],f.SHOE,{group:s.group,extra:!0,paint:l=>l[1]<c[1]-o*(a?.45:.4)?f.SOLE:e.shoes==="glitter"&&kn(l,60,.28)?f.GLINT:void 0})}}function Rd(n,e,t,i,r="towards"){const s={legW:1,earS:1,hgt:1,bw:.3,...n.q},a=e===3,o=e===1,c=e===0,l=O=>a&&n.legend.includes(O),h=new Xe,d=s.hr*(c?1.75:o?1.25:1)*(i.head/.44)**.5,u=s.len*(c?.8:o?.9:1.02)*i.long,p=c?.55:o?.9:1.04,g=t?-.04:0,v=1+g,x=s.chest*(a?1.06:1)/p+g,m=s.tuck/p+g,_=s.bw*(c?1.15:e>=2?1.06:1)*(s.legW>1.2?1.15:1),M=.06*s.legW*(a?1.1:c?1.7:1),S=s.back==="hump"?.1:0,w=s.back==="arch"?.1:0,E=x+.12,L=O=>{if(s.belly&&O[1]<E&&O[0]>-u*.5)return f.BELLY;if(s.saddle&&O[1]>v-.18&&O[0]<u*.55)return f.BODY2;if(s.spots&&O[1]>x+.1&&kn(O,10,.22))return s.spotMat==="belly"||s.spots==="young"&&o?f.BELLY:s.spots==="young"?void 0:f.BODY3;if(s.ridge&&O[1]>v-.08+S*.5)return f.BODY3};if(h.ell([u*.48,(v+x)/2+S*.5,0],[u*.62,(v-x)/2+S*.5,_],f.BODY,{paint:L}),h.ell([-u*.5,(v+m)/2+w*.6,0],[u*.58,(v-m)/2+w*.6,_*.93],f.BODY,{paint:L}),h.ell([0,(v+(x+m)/2)/2+.02,0],[u*.6,(v-(x+m)/2)/2,_*.9],f.BODY,{paint:L}),s.ridge)for(let O=0;O<(a?16:10);O++){const ne=-u*.8+O*u*1.75/(a?15:9),ce=(.07+(a?.04:0))*(1+.5*Math.max(0,ne/u));h.ell([ne,v+.02+S*Math.max(0,1-Math.abs(ne/u-.5)*2)+ce*.5,0],[ce,.03,_*.25],f.BODY3,{dir:[-.3,1,0],up:[1,0,0]})}if(s.wool)for(let O=0;O<14;O++){const ne=O/14*Math.PI*2;h.ell([u*Math.cos(ne)*.7,(v+x)/2+Math.sin(ne)*.2,_*(O%2?.5:-.5)],[.16,.14,.14],f.BODY)}const b=[.32,-.32][t],A=(O,ne)=>{const ce=ne*_*.62,be=O?u*.62:-u*.62,Ue=(O?1:-1)*ne*b,ke=O?x+.1:m+.15,ee=(O?ne:-ne)*(t?1:-1)>0?.06:0,se=[be+Math.sin(Ue)*.2+(O?.02:.1),Math.max(.3,ke*.55),ce],V=[be+Math.sin(Ue)*.42,.05+ee,ce],he=[be,ke+.12,ce*.8],ae=ne>0?s.legMat||f.BODY:s.legMat?f.BODY3:f.BODY2,Ee=O?[[...he,M*1.5],[...se,M*1.05],[...V,M*.9]]:[[...he,M*2*(s.haunch||1)],[...R.add(se,[-.12,.06,0]),M*1.2],[...R.add(V,[-.06*(s.hindFoot||1),.12,0]),M*.9],[...V,M*.9]];h.chain(Ee,ae,{group:ne>0?6+(O?1:0):2,paint:s.socks?Ce=>Ce[1]<s.socks?f.BODY3:void 0:void 0});const Je=(s.paw==="hoof"?.07:.09)*s.legW**.5*(O?1:s.hindFoot||1);h.ell(R.add(V,[Je*.5,-.01,0]),[Je,M*.9,M*1.1],s.paw==="hoof"?f.NOSE:ae,{group:ne>0?6+(O?1:0):2}),h.anchors.feet.push({c:R.add(V,[Je*.5,-.01,0]),r:Math.max(Je,M*1.1),group:ne>0?6+(O?1:0):2})};for(const O of[-1,1])A(!0,O),A(!1,O);const P=[u*.82,v-.12,0],C=[P[0]+Math.cos(s.neckAng)*s.neck*.9,P[1]+Math.sin(s.neckAng)*s.neck*.9+(c?.1:0),0];h.seg(P,C,s.neckW*.55,s.neckW*.42,f.BODY,{paint:O=>s.belly&&O[1]<(P[1]+C[1])/2-.05?f.BELLY:s.face==="dark"?f.BODY2:void 0});const N=O=>{if(s.face==="badger")return Math.abs(O[2])<d*.22+(O[0]-C[0])*.1||O[1]<C[1]-d*.1?f.BELLY:f.BODY3;if(s.face==="dark")return f.BODY2;if((s.belly||s.muzzle)&&O[1]<C[1]-d*.35)return f.BELLY};h.ell(C,[d*1.05,d*.92,d*.88],f.BODY,{paint:N});const U=d*s.snout*(c?.55:o?.78:1),D=d*s.snoutD*.55,F=[C[0]+d*.65+U*.5,C[1]-d*.28,0];h.ell(F,[U*.62+d*.2,D,D*.95],f.BODY,{dir:[1,-.25,0],paint:O=>(s.muzzle||s.belly)&&O[1]<F[1]-D*.1?f.BELLY:N(O)});const z=[F[0]+U*.62+d*.1,F[1]-.02,0];h.ell(z,[d*(s.disc?.1:.12),d*(s.disc?.2:.12),d*(s.disc?.2:.15)],f.NOSE,{group:1});for(const O of[-1,1]){const ne=Xe.surface(C,[d*1.05,d*.92,d*.88],R.norm([.75,.32,O*.62]));h.ell(ne,[d*.13,d*.16,d*.13].map(ce=>ce*(s.eyeK||1)*(c?1.5:o?1.2:1)),a&&!s.tusks?f.MAGIC2:f.EYE,{group:1})}h.anchors.head={c:C,r:[d*1.05,d*.92,d*.88],top:[C[0]-d*.1,C[1]+d*.82,0]},h.anchors.eyes={pts:[-1,1].map(O=>Xe.surface(C,[d*1.05,d*.92,d*.88],R.norm([.75,.32,O*.62]))),size:d*.16*(s.eyeK||1)*(c?1.5:o?1.2:1)},h.anchors.neck={c:R.lerp(P,C,c?.05:o?.25:.42),r:s.neckW*.5*(c?1.3:o?1.12:1),dir:R.norm(R.sub(C,P)),tag:c?1.8:o?1.3:1};for(const O of[-1,1]){const ne=s.ear,ce=[C[0]-d*.15,C[1]+d*.7,O*d*.5],be=s.earS*(c?1.2:1)*(s.ear==="long"?.62:1);if(ne==="none")continue;if(ne==="round"){h.ell(ce,[d*.22,d*.25*be,d*.1],f.BODY,{group:1,paint:Ee=>Ee[0]>ce[0]+d*.02?f.EAR:void 0});continue}const Ue=ne==="long",ke=ne==="small"?-.6:0,ee=d*.55*be*(ne==="big"?1.35:Ue?2.2:1),se=d*.3*(ne==="big"?1.2:Ue?1.35:1),V=R.norm([ke*.6-(Ue?.3:.12),1,O*.3]),he=R.norm([.55,.2,O]),ae=R.norm(R.cross(he,V));h.flat(R.add(ce,R.mul(V,ee)),ae,V,se,ee,Wi.ear(f.BODY,f.EAR,f.BODY3),{group:5+(O>0?0:20),extra:Ue}),ne==="tuft"&&h.seg(R.add(ce,[0,ee*1.4,O*.02]),R.add(ce,[0,ee*1.85,O*.04]),d*.05,d*.02,f.BODY3,{group:1})}const X=[-u*1.05,v-.1+w*.5,0],Q=t?.04:-.02;if(l("tails")||Cd(h,l("starTail")?"star":s.tail,X,u,v,Q),s.horns)for(const O of[-1,1]){const ne=o?.6:c?.35:l("hornsGlow")?1.4:1,ce=[];for(let be=0;be<=8;be++){const Ue=.3-be/8*Math.PI*1.6,ke=d*.65*ne*(1-.45*be/8);ce.push([C[0]-d*.1+Math.cos(Ue)*ke,C[1]+d*.45+Math.sin(Ue)*ke,O*(d*.6+be*.015)]),ce[be].push(d*.2*ne*(1-.6*be/8))}h.chain(ce,l("hornsGlow")?f.MAGIC:f.ACCENT,{group:13})}if(s.antlers||l("jackalope"))for(const O of[-1,1])Ld(h,s,[C[0]-d*.05,C[1]+d*.75,O*d*.4],O,e,l);if(s.tusks)for(const O of[-1,1]){const ne=o?.4:c?0:l("tusksBig")?1.3:.75;if(!ne)continue;const ce=[F[0]+U*.25,F[1]-D*.4,O*D*.8];h.chain([[...ce,.045*ne],[...R.add(ce,[.1*ne,.1*ne,O*.03]),.04*ne],[...R.add(ce,[.06*ne,.24*ne,O*.05]),.02*ne]],f.ACCENT,{group:8})}s.teeth&&!c&&h.ell([z[0]-d*.1,z[1]-d*.25,0],[d*.08,d*.14,d*.12],f.ACCENT,{group:1});const Y=O=>[-u*.9+O*u*1.65,v+S*Math.max(0,1-Math.abs(O-.8)*3)+w*(1-Math.abs(O-.4)*2),0];if(l("wings"))for(const O of[-1,1])ba(h,[u*.2,v,O*_*.5],O,1.15,t?.1:0,O>0?f.MAGIC2:f.MAGIC,f.MAGIC,40+(O>0?10:0));if(l("mane")||l("flames"))for(let O=0;O<7;O++){const ne=O/6,ce=R.lerp(R.add(C,[-d*.5,d*.3,0]),Y(.55),ne),be=[.4,.3,.45,.28,.38,.25,.3][O],Ue=R.norm([-.35-(t?.1:0),1,0]);h.flat(R.add(ce,R.mul(Ue,be*.5)),[1,0,0],Ue,be*.32,be*.55,Wi.flame(O%2?f.MAGIC:f.MAGIC2,f.MAGIC2),{group:60+O%2,extra:!0})}if(l("tails"))for(let O=0;O<7;O++){const ne=Math.PI*(.55+O*.08),ce=(O-3)*.1,be=R.add(X,[Math.cos(ne)*.9,Math.sin(ne)*.85,ce]);h.chain([[...X,.1],[...R.lerp(X,be,.5),.17],[...be,.08]],O%2?f.BODY2:f.BODY,{group:70,extra:!0}),h.ell(be,[.09,.09,.09],f.MAGIC2,{group:71,extra:!0})}if(l("crystals")&&[.15,.3,.45,.6,.75].forEach((O,ne)=>{const ce=Y(O),be=[.3,.5,.4,.6,.35][ne];h.ell(R.add(ce,[0,be*.45,(ne%2-.5)*.1]),[be*.55,.08,.08],f.MAGIC,{dir:[(ne-2)*.12,1,0],group:80+ne%2,extra:!0,paint:Ue=>Ue[2]>0?f.MAGIC2:void 0})}),l("moss")){for(let O=0;O<6;O++)h.ell(Y(.08+O*.15),[u*.22,.07,_*.85],f.LEAF,{group:85,extra:!0});for(const[O,ne]of[[.25,.55],[.5,.8],[.75,.45]]){const ce=Y(O);h.seg(ce,R.add(ce,[0,ne*.7,0]),.04,.025,f.TRUNK,{group:86,extra:!0}),h.ell(R.add(ce,[0,ne*.8,0]),[ne*.28,ne*.26,ne*.28],f.LEAF2,{group:87,extra:!0,paint:be=>be[1]<ce[1]+ne*.72?f.LEAF3:void 0})}for(const O of[.12,.4,.65,.9]){const ne=Y(O);h.ell(R.add(ne,[0,.12,_*.3]),[.07,.035,.07],f.MAGIC,{group:89,extra:!0})}}if(l("ribbons"))for(let O=0;O<3;O++){const ne=[];for(let ce=0;ce<9;ce++){const be=ce/8;ne.push([u*(.5-be*2.2),v+.05+O*.1+be*(.25+O*.12)+Math.sin(be*6+t+O)*.07,(O-1)*.18,.04*(1-be*.6)])}h.chain(ne,O%2?f.MAGIC2:f.MAGIC,{group:90+O,extra:!0})}yl(h);const{sp:te}=Sn(h,{height:bl(e,i,s.hgt),facing:r});return a&&Sl(te,n.id.length*7919),te}function Cd(n,e,t,i,r,s){const a={group:3},o=c=>-i*c;e==="brush"?n.chain([[...t,.1],[o(1.3),r-.25+s,0,.15],[o(1.4),r-.55,0,.14],[o(1.35),.38+s,0,.09]],f.BODY,{...a,paint:c=>c[1]<.32?f.BODY3:void 0}):e==="bushy"?n.chain([[...t,.1],[o(1.05)-.35,r-.05+s,0,.17],[o(1.05)-.75,r-.2+s,0,.18],[o(1.05)-1,r-.35+s,0,.1]],f.BODY,{...a,paint:c=>c[0]<o(1.05)-.82?f.BELLY:void 0}):e==="stub"||e==="deer"||e==="bob"?n.ell(R.add(t,[-.06,.02+s,0]),[.1,.08,.07],e==="deer"?f.BELLY:f.BODY,{...a,paint:e==="bob"?c=>c[0]<t[0]-.08?f.BODY3:void 0:void 0}):e==="puff"?n.ell(R.add(t,[-.04,.02,0]),[.11,.11,.1],f.BELLY,a):e==="squirrel"||e==="star"?n.chain([[...t,.12],[o(1.3),r+.05+s,0,.25],[o(1.3),r+.6+s,0,.3],[o(1),r+.95+s,0,.27],[o(.65),r+.9+s,0,.16]],e==="star"?f.MAGIC:f.BODY,{...a,extra:!0,paint:e==="star"?c=>kn(c,14,.12)?f.GLINT:void 0:void 0}):e==="otter"?n.chain([[...t,.17],[o(1.3),r-.45+s,0,.12],[o(1.6),.1,0,.07],[o(1.85),.06+s,0,.03]],f.BODY,a):e==="stoat"?n.chain([[...t,.08],[o(1.3),r-.12+s,0,.07],[o(1.6),r-.05+s,0,.06]],f.BODY,{...a,paint:c=>c[0]<o(1.45)?f.BODY3:void 0}):e==="flat"?(n.seg(t,[o(1.15),.3,0],.08,.07,f.BODY2,a),n.ell([o(1.4),.1+s*.5,0],[.28,.03,.14],f.BODY3,a)):e==="thin"&&(n.chain([[...t,.04],[o(1.1),r-.3,0,.03],[o(1.12)+s,r-.55,0,.025]],f.BODY,a),n.ell([o(1.12)+s,r-.62,0],[.04,.07,.04],f.BODY3,a))}function Ld(n,e,t,i,r,s){const a=!e.antlers,o=a?.45:[0,.5,.95,.95][r]*(s("antlersGlow")?1.15:1),c=s("antlersGlow")?i>0?f.MAGIC2:f.MAGIC:f.ACCENT,l={group:11+(i>0?1:0),extra:!0};if(!o)return;const h=.045*Math.max(.8,o),d=i*.35*o;if(e.antlers==="palm"){const x=R.add(t,[-.06*o,.12*o,d*.3]);n.seg(t,x,h*1.3,h*1.2,c,l);for(let m=0;m<5;m++){const _=.35+m*.3,M=R.norm([-Math.cos(_),Math.sin(_)*.9,i*.55]),S=(.24+.05*(m%2))*o;n.ell(R.add(x,R.mul(M,S*.55)),[S*.6,h*1.5,h*.6],c,{...l,dir:M,up:[0,0,1]})}return}const u=R.add(t,[-.18*o,.3*o,d*.4]),p=R.add(t,[-.25*o,.62*o,d*.8]),g=R.add(t,[-.1*o,.95*o,d]);n.chain([[...t,h*1.2],[...u,h],[...p,h*.85],[...g,h*.4]],c,l);const v=(x,m,_,M)=>n.seg(x,R.add(x,R.mul(R.norm(m),_)),M,M*.35,c,l);v(R.add(t,[-.04*o,.1*o,d*.1]),[1,.6,0],.28*o,h*.8),(o>.4||a)&&v(u,[1,.9,0],.3*o,h*.7),o>.7&&(v(p,[.8,1,0],.28*o,h*.6),v(g,[.3,1,i*.2],.18*o,h*.5))}function Pd(n,e,t,i,r="towards"){const s=e===3,a=e===1,o=e===0,c=g=>s&&n.legend.includes(g),l=new Xe,h=t?.03:0,d=o?.48:a?.42:.36,u=(o?.95:1.08)+h;for(const g of[-1,1]){const v=t&&g>0?.04:0;l.seg([.05,.2,g*.14],[.08,.05+v,g*.15],.07,.06,f.BODY2,{group:2});for(const x of[-.04,0,.04])l.ell([.16,.03+v,g*.15+x],[.06,.025,.02],f.ACCENT,{group:2});l.anchors.feet.push({c:[.13,.04+v,g*.15],r:.08,group:g>0?6:2})}if(l.ell([-.32,.32,0],[.22,.06,.14],f.BODY2,{dir:[-1,-.6,0],group:3}),l.ell([0,.55+h,0],[.36,.52,.36],f.BODY,{paint:g=>g[0]>.12&&g[1]<u-d*.5?Math.floor(g[1]*18)%3===0&&kn(g,16,.5)?f.BODY2:f.BELLY:void 0}),!c("wings"))for(const g of[-1,1])l.ell([-.06,.58+h,g*.3],[.4,.3,.08],f.BODY2,{dir:[-.3,-1,0],up:[1,0,0],group:g>0?4:2,paint:v=>kn(v,12,.15)?f.BODY3:void 0});l.ell([0,u,0],[d,d*.9,d],f.BODY);for(const g of[-1,1]){const v=R.norm([.75,-.05,g*.4+.35]),x=R.add(Xe.surface([0,u,0],[d,d*.9,d],v),R.mul(v,-d*.05));l.ell(x,[d*.22,d*.46,d*.4],f.BELLY,{group:1,dir:v});const m=R.add(x,R.mul(v,d*.14));l.ell(m,[d*.1,d*.26,d*.24].map(_=>_*(o?1.15:1)),s?f.MAGIC:f.IRIS,{group:1,dir:v}),l.ell(R.add(m,R.mul(v,d*.07)),[d*.08,d*.14,d*.13].map(_=>_*(o?1.15:1)),s?f.MAGIC2:f.EYE,{group:1,dir:v}),(l.anchors.eyes||={pts:[],size:d*.22}).pts.push(R.add(m,R.mul(v,d*.07))),o||l.ell([d*.05,u+d*.8,g*d*.6],[d*.32,d*.12,d*.08],f.BODY2,{dir:[-.1,1,g*.7],up:[1,0,0],group:1})}if(l.ell(Xe.surface([0,u,0],[d,d*.9,d],R.norm([.75,-.35,.35])),[d*.2,d*.12,d*.1],f.ACCENT,{dir:[.6,-1,.3],group:1}),c("wings"))for(const g of[-1,1])ba(l,[-.05,.8+h,g*.3],g,1.3,t?.12:0,g>0?f.MAGIC2:f.MAGIC,f.MAGIC,40+(g>0?10:0));if(c("eyesRing"))for(let g=0;g<7;g++){const v=Math.PI*(.15+g/6*.7);l.ell([Math.cos(v)*.2-.1,u+.1+Math.sin(v)*.6,(g-3)*.15],[.07,.07,.07],f.MAGIC2,{group:95+g,extra:!0}),l.ell([Math.cos(v)*.2-.05,u+.1+Math.sin(v)*.6,(g-3)*.15],[.035,.035,.035],f.EYE,{group:95+g,extra:!0})}l.anchors.head={c:[0,u,0],r:[d,d*.9,d]},l.anchors.neck={c:[0,u-d*.75,0],r:d*.85,dir:[0,1,0]},yl(l);const{sp:p}=Sn(l,{height:bl(e,i,.95),facing:r});return s&&Sl(p,31),p}const Ci=(n,e,t,i,r,s,a=1)=>{for(const o of i)n.ell(Xe.surface(e,t,R.norm(o)),[r,r*1.2,r],s,{group:a});n.anchors.head||={c:e,r:t},n.anchors.eyes||={pts:i.map(o=>Xe.surface(e,t,R.norm(o))),size:r}},Oh=(n,e,t)=>n.ell([e,.005,0],[t,.005,t*.6],f.NOSE,{group:0});function Ln(n,e,t,i,r,s){yl(n);const{sp:a}=Sn(n,{height:bl(t,i,r),facing:s});return t===3&&Sl(a,e.id.length*131),a}const Bh=(n,e,t)=>{n.ell(e,[t,t*.35,t],f.MAGIC,{group:95,extra:!0,paint:i=>i[1]>e[1]?f.MAGIC2:void 0});for(let i=0;i<5;i++){const r=i/5*Math.PI*2;n.ell(R.add(e,[Math.cos(r)*t*.8,t*.55,Math.sin(r)*t*.8]),[t*.38,t*.12,t*.12],f.MAGIC,{dir:[0,1,0],up:[1,0,0],group:96,extra:!0})}},wl=(n,e)=>e.forEach(([t,i],r)=>n.ell(R.add(t,[0,i*.45,0]),[i*.55,.07,.07],f.MAGIC,{dir:[(r%3-1)*.25,1,(r%2-.5)*.3],group:80+r%2,extra:!0,paint:s=>s[2]>t[2]?f.MAGIC2:void 0}));function Dd(n,e,t,i,r="towards"){const s=e===3,a=new Xe,o=t?.03:0;for(const[d,u]of[[.28,.2],[.28,-.2],[-.28,.2],[-.28,-.2]])a.seg([d,.15,u],[d+(u>0?o:-o),.03,u],.06,.05,f.BODY3,{group:u>0?6:2}),a.anchors.feet.push({c:[d+.03+(u>0?o:-o),.03,u],r:.065,group:u>0?6:2});const c=[0,.32,0],l=[.5,.32,.38];a.ell(c,l,f.BODY2,{paint:d=>kn(d,22,.3)?f.BODY3:kn(d,19,.12)?f.BELLY:void 0});for(let d=0;d<46;d++){const u=d*2.399%(Math.PI*2),p=d/46*.9+.05,g=R.norm([Math.cos(u)*Math.sin(p*Math.PI*.5)-.25,Math.cos(p*Math.PI*.5)*.9+.1,Math.sin(u)*Math.sin(p*Math.PI*.5)]);g[0]>.55||a.ell(R.add(Xe.surface(c,l,g),R.mul(g,.02)),[.1,.025,.025],d%4?f.BODY2:f.BODY3,{dir:R.add(g,[-.4,0,0]),group:1})}const h=[.48,.22,0];return a.ell(h,[.22,.14,.15],f.BELLY,{dir:[1,-.3,0],group:1}),a.ell([.69,.16,0],[.04,.04,.04],f.NOSE,{group:1}),Ci(a,h,[.22,.14,.15],[[.3,.6,.55],[.3,.6,-.55]],.035,s?f.MAGIC2:f.EYE),s&&wl(a,[[[-.3,.55,.1],.35],[[-.05,.62,-.1],.5],[[.2,.55,.12],.4],[[-.15,.58,.2],.3]]),Ln(a,n,e,i,.6,r)}function Id(n,e,t,i,r="towards"){const s=e===3,a=new Xe,o=t?.05:0;for(const h of[-1,1])a.ell([-.22,.16,h*.36],[.24,.13,.12],h>0?f.BODY:f.BODY2,{dir:[1,.3,0],group:h>0?6:2,paint:d=>kn(d,14,.15)?f.BODY3:void 0}),a.ell([.05,.04,h*.4],[.16,.04,.08],h>0?f.BODY:f.BODY2,{group:h>0?6:2}),a.seg([.35,.2+o,h*.24],[.42,.03,h*.3],.05,.04,h>0?f.BODY:f.BODY2,{group:h>0?7:2}),a.anchors.feet.push({c:[.45,.03,h*.3],r:.06,group:h>0?7:2},{c:[.12,.04,h*.4],r:.08,group:h>0?6:2});const c=[0,.3+o,0],l=[.5,.28,.4];a.ell(c,l,f.BODY,{paint:h=>h[1]<c[1]-.12?f.BELLY:h[0]>.38&&Math.abs(h[1]-(c[1]-.02))<.018?f.LINE:kn(h,14,.22)?f.BODY3:void 0});for(const h of[-1,1]){const d=[.3,.55+o,h*.17];a.ell(d,[.1,.09,.1],f.BODY,{group:1}),a.ell(Xe.surface(d,[.1,.09,.1],R.norm([.6,.5,h*.5])),[.05,.05,.05],s?f.MAGIC2:f.IRIS,{group:1}),a.ell(Xe.surface(d,[.11,.1,.11],R.norm([.65,.45,h*.5])),[.03,.015,.03],f.EYE,{group:1})}return a.anchors.head={c:[.22,.45+o,0],r:[.3,.2,.3],top:[.18,.62+o,0]},a.anchors.eyes={pts:[-1,1].map(h=>Xe.surface([.3,.55+o,h*.17],[.1,.09,.1],R.norm([.6,.5,h*.5]))),size:.05},a.anchors.neck={c:[.32,.3+o,0],r:.25,dir:[1,.3,0]},s&&Bh(a,[.15,.66+o,0],.16),Ln(a,n,e,i,.55,r)}function Nd(n,e,t,i,r="towards"){const s=e===3,a=e===1,o=u=>s&&n.legend.includes(u),c=new Xe,l=t?.02:0;for(const u of[-1,1]){const p=t&&u>0?.04:0;c.seg([0,.3,u*.08],[.03,.03+p,u*.08],.03,.025,f.NOSE,{group:u>0?7:2}),c.ell([.08,.02+p,u*.08],[.08,.015,.04],f.NOSE,{group:2}),c.anchors.feet.push({c:[.07,.03+p,u*.08],r:.06,group:u>0?7:2})}if(c.ell([-.55,.42,0],[.32,.035,.12],f.BODY2,{dir:[-1,-.25,0],group:3}),c.ell([0,.52+l,0],[.42,.26,.24],f.BODY,{dir:[1,.45,0]}),!o("wings"))for(const u of[-1,1])c.ell([-.1,.55+l,u*.2],[.45,.17,.05],f.BODY2,{dir:[-1,-.25,0],group:u>0?4:2});const h=[.36,.84+l,0],d=a?.19:.16;if(c.ell(h,[d*1.1,d,d*.95],f.BODY,{paint:u=>u[1]>h[1]+d*.55?f.BELLY:void 0}),c.ell(R.add(h,[d*1.5,-d*.25,0]),[d*1,d*.38,d*.3],f.NOSE,{dir:[1,-.2,0],group:1}),Ci(c,h,[d*1.1,d,d*.95],[[.55,.35,.65],[.55,.35,-.65]],d*.16,s?f.MAGIC2:f.EYE),o("wings"))for(const u of[-1,1])ba(c,[-.05,.65+l,u*.18],u,1.1,t?.1:0,u>0?f.MAGIC2:f.MAGIC,f.MAGIC,40+(u>0?10:0));if(o("eyesRing"))for(let u=0;u<6;u++){const p=Math.PI*(.2+u/5*.6);c.ell([Math.cos(p)*.25-.1,.95+Math.sin(p)*.45,(u-2.5)*.12],[.06,.06,.06],f.MAGIC2,{group:95+u,extra:!0})}return Ln(c,n,e,i,.75,r)}function Ud(n,e,t,i,r="towards"){const s=e===3,a=u=>s&&n.legend.includes(u),o=new Xe,c=t===0,l=.55,h=a("wingsBig")?1.5:1;Oh(o,0,.3*h);for(const u of[-1,1]){const p=[0,l+.05,u*.1],g=[.05,l+(c?.35:-.05),u*.45*h],v=[[-.05,l+(c?.45:-.15),u*.85*h],[-.25,l+(c?.2:-.25),u*.75*h],[-.3,l+(c?0:-.25),u*.4*h]],x=a("wingsBig")?f.MAGIC:f.BODY2,m=a("wingsBig")?f.MAGIC2:f.BODY3;o.seg(p,g,.03,.025,m,{group:11});for(const E of v)o.seg(g,E,.02,.012,m,{group:11});const _=R.sub(v[0],p),M=R.norm(_),S=R.norm(R.sub(v[2],g)),w=R.norm(R.sub(S,R.mul(M,R.dot(S,M))));o.flat(R.add(R.lerp(p,v[0],.5),R.mul(w,.12*h)),M,w,Math.hypot(..._)*.55,.3*h,Wi.membrane(x),{group:10+(u>0?1:0),bend:.2})}o.ell([0,l,0],[.13,.16,.12],f.BODY,{group:1});const d=[.08,l+.2,0];o.ell(d,[.12,.11,.11],f.BODY,{group:1});for(const u of[-1,1])o.ell(R.add(d,[-.02,.15,u*.07]),[.12,.045,.02],f.BODY,{dir:[.1,1,u*.3],up:[1,0,0],group:1,paint:p=>p[0]>d[0]-.01?f.EAR:void 0});return Ci(o,d,[.12,.11,.11],[[.7,.2,.5],[.7,.2,-.5]],.025,s?f.MAGIC2:f.EYE),o.ell(Xe.surface(d,[.12,.11,.11],[1,-.2,0]),[.025,.02,.03],f.NOSE,{group:1}),Ln(o,n,e,i,.55,r)}function Fd(n,e,t,i,r="towards"){const s=e===3,a=new Xe,o=t?.03:0;a.seg([-.5,.18,0],[-.62,.12,0],.04,.02,f.SKIN,{group:3});for(const c of[-1,1])a.ell([-.3,.05,c*.2],[.07,.04,.05],f.SKIN,{group:c>0?6:2}),a.anchors.feet.push({c:[-.3,.05,c*.2],r:.07,group:c>0?6:2});a.ell([0,.3,0],[.52,.29,.33],f.BODY,{paint:c=>c[1]>.45?f.BODY2:void 0}),a.ell([.55,.24,0],[.2,.07,.07],f.SKIN,{dir:[1,-.15,0],group:1}),a.ell([.74,.21,0],[.04,.05,.06],f.NOSE,{group:1});for(const c of[-1,1]){const l=[.32,.1-(c>0?o:0),c*.34];a.ell(l,[.13,.035,.12],f.SKIN,{group:c>0?7:2,axes:[[1,0,0],[0,1,0],[0,0,1]]});for(let h=0;h<4;h++)a.ell(R.add(l,[.14,-.01,c*(h-1.5)*.05]),[.05,.015,.015],f.ACCENT,{group:c>0?7:2})}for(const c of[-1,1])a.ell(Xe.surface([0,.3,0],[.52,.29,.33],R.norm([.85,.3,c*.35])),[.015,.015,.015],s?f.MAGIC2:f.EYE,{group:1});return a.anchors.head={c:[.32,.34,0],r:[.25,.22,.25],top:[.3,.58,0]},a.anchors.eyes={pts:[-1,1].map(c=>Xe.surface([0,.3,0],[.52,.29,.33],R.norm([.85,.3,c*.35]))),size:.03},a.anchors.neck={c:[.36,.3,0],r:.27,dir:[1,.1,0]},s&&Bh(a,[.15,.62,0],.15),Ln(a,n,e,i,.55,r)}function Od(n,e,t,i,r="towards"){const s=e===3,a=d=>s&&n.legend.includes(d),o=new Xe;for(const d of[-1,1])for(let u=0;u<3;u++){const p=.25-u*.25,g=(u+(d>0?1:0)+t)%2?.06:-.06,v=[p,.22,d*.2];o.chain([[...v,.03],[p+g+(1-u)*.06,.32,d*.42,.025],[p+g*1.5+(1-u)*.15,.02,d*.55,.015]],d>0?f.BODY2:f.BODY3,{group:d>0?7:2})}o.ell([-.12,.34,0],[.46,.24,.32],f.BODY,{paint:d=>Math.abs(d[2])<.018&&d[1]>.4?f.LINE:d[1]>.5&&d[2]>.05&&d[2]<.17?f.BELLY:void 0}),o.ell([.38,.33,0],[.16,.16,.26],f.BODY,{group:1});const c=[.56,.3,0];o.ell(c,[.1,.1,.17],f.BODY2,{group:1});const l=[.3,.5,.7,.75][e]*(a("horn")?1.3:1),h=a("horn")?f.MAGIC:f.BODY3;for(const d of[-1,1]){const u=R.add(c,[.08,.02,d*.1]),p=R.add(u,[l*.7,l*.45,d*l*.15]),g=R.add(p,[l*.25,-l*.12,-d*l*.12]);o.chain([[...u,.045],[...p,.035],[...g,.015]],h,{group:8+(d>0?1:0)}),o.seg(R.lerp(u,p,.55),R.add(R.lerp(u,p,.55),[0,l*.22,0]),.02,.008,h,{group:8})}for(const d of[-1,1])o.chain([[...R.add(c,[.05,.06,d*.1]),.012],[c[0]+.1,.5,d*.22,.012],[c[0]+.2,.5,d*.26,.012]],f.BODY3,{group:9,extra:!0});return Ci(o,c,[.1,.1,.17],[[.4,.3,.85],[.4,.3,-.85]],.032,s?f.MAGIC2:f.EYE,9),a("crystals")&&wl(o,[[[-.35,.5,.1],.3],[[-.1,.55,-.08],.45],[[.1,.5,.1],.35]]),Ln(o,n,e,i,.5,r)}function Bd(n,e,t,i,r="towards"){const s=e===3,a=new Xe,o=t?.04:0;a.ell([0,.07,0],[.6+o,.07,.17],f.SKIN,{group:1}),a.chain([[.45+o,.08,0,.1],[.6+o,.25,0,.09],[.68+o,.28,0,.08]],f.SKIN,{group:1});for(const h of[-1,1])a.seg([.7+o,.32,h*.04],[.78+o,.55,h*.1],.018,.014,f.SKIN,{group:5}),a.ell([.78+o,.57,h*.1],[.03,.03,.03],s?f.MAGIC2:f.EYE,{group:5});a.anchors.head={c:[.68+o,.3,0],r:[.09,.08,.09],top:[.66+o,.38,0]},a.anchors.eyes={pts:[-1,1].map(h=>[.78+o,.57,h*.1]),size:.03},a.anchors.neck={c:[.55+o,.17,0],r:.1,dir:[1,1.2,0]};const c=[-.12,.4,0],l=s?f.MAGIC:f.BODY;return a.ell(c,[.32,.32,.22],l,{group:3,paint:h=>{const d=Math.atan2(h[1]-c[1],h[0]-c[0]);return((Math.hypot(h[0]-c[0],h[1]-c[1])/.32-d/(Math.PI*2)*.3)%.3+.3)%.3<.06?s?f.MAGIC2:f.BODY3:void 0}}),Ln(a,n,e,i,.45,r)}function zd(n,e,t,i,r="towards"){const s=e===3,a=new Xe;for(const o of[-1,1])for(let c=0;c<7;c++){const l=-.45+c*.15,h=(c+t)%2?.03:-.03;a.seg([l,.1,o*.22],[l+h,.01,o*.33],.025,.015,f.BODY3,{group:o>0?7:2})}for(const o of[-1,1])a.chain([[.5,.15,o*.08,.02],[.7,.3,o*.2,.015],[.82,.22,o*.26,.012]],f.BODY3,{group:9,extra:!0});return a.ell([0,.18,0],[.58,.2,.3],f.BODY,{paint:o=>(Math.floor((o[0]+.6)*9)%2&&o[1]>.2?f.BODY2:void 0)||(Math.abs((o[0]+.6)*9%1)<.12?f.LINE:void 0)}),Ci(a,[0,.18,0],[.58,.2,.3],[[.92,.3,.25],[.92,.3,-.25]],.02,s?f.MAGIC2:f.EYE),s&&wl(a,[[[-.3,.32,.05],.3],[[0,.37,-.05],.45],[[.25,.32,.05],.32]]),Ln(a,n,e,i,.4,r)}function kd(n,e,t,i,r="towards"){const s=e===3,a=e===1,o=p=>s&&n.legend.includes(p),c=new Xe,l=t?.7:0,h=[];for(let p=0;p<=12;p++){const g=p/12;h.push([-.9+g*1.2,.07,Math.sin(g*Math.PI*2+l)*.25*(1-g*.5),.03+.045*Math.sin(Math.min(1,g*1.4)*Math.PI/2)])}h.push([.38,.25,h[12][2],.07],[.42,.45,h[12][2]*.8,.065]),c.chain(h,f.BODY,{paint:p=>p[1]<.05&&p[0]<.35?f.BELLY:kn([p[0]*1.5,p[1],p[2]],14,.3)?f.BODY3:void 0});const d=[.5,.5,h[13][2]*.8],u=a?.11:.09;if(c.ell(d,[u*1.5,u*.75,u],f.BODY,{dir:[1,-.15,0],group:1}),Ci(c,d,[u*1.5,u*.75,u],[[.5,.5,.7],[.5,.5,-.7]],u*.22,s?f.MAGIC2:f.EYE),t||c.seg(R.add(d,[u*1.4,-u*.2,0]),R.add(d,[u*2.3,-u*.3,0]),.01,.008,f.SKIN,{group:1}),c.anchors.feet.push({c:R.add(h[0].slice(0,3),[-.02,-.01,0]),r:.06,group:3,tail:!0}),c.anchors.neck={c:[.42,.36,h[12][2]*.9],r:.075,dir:[.2,1,0]},o("wings"))for(const p of[-1,1])ba(c,[0,.2,p*.05],p,.9,t?.1:0,p>0?f.MAGIC2:f.MAGIC,f.MAGIC,40+(p>0?10:0));return Ln(c,n,e,i,.45,r)}function Gd(n,e,t,i,r="towards"){const s=e===3,a=u=>s&&n.legend.includes(u),o=new Xe,c=t===0,l=.55,h=a("wingsBig")?1.45:1,d=a("wingsBig")?f.MAGIC:f.BODY;Oh(o,0,.3*h);for(const u of[-1,1]){const p=c?.5:-.1,g=R.norm([.35,p,u]),v=R.norm([-.3,p*.6,u]);o.flat(R.add([0,l,u*.05],R.mul(g,.38*h)),g,R.norm(R.cross(g,[0,1,0])),.4*h,.24*h,Wi.spotted(d,f.BELLY,f.BODY3),{group:10+(u>0?1:0)}),o.flat(R.add([-.05,l,u*.05],R.mul(v,.26*h)),v,R.norm(R.cross(v,[0,1,0])),.27*h,.17*h,Wi.spotted(a("wingsBig")?f.MAGIC2:f.BODY2,f.BODY2,f.BODY2),{group:12+(u>0?1:0)}),o.chain([[.12,l+.08,u*.03,.015],[.2,l+.25,u*.1,.025],[.24,l+.32,u*.14,.012]],f.BODY2,{group:11})}return o.ell([0,l,0],[.22,.09,.09],f.BELLY,{group:1,paint:u=>kn(u,30,.25)?f.BODY2:void 0}),o.ell([.17,l+.03,0],[.07,.07,.07],f.BELLY,{group:1}),Ci(o,[.17,l+.03,0],[.07,.07,.07],[[.7,.3,.6],[.7,.3,-.6]],.02,s?f.MAGIC2:f.EYE),Ln(o,n,e,i,.5,r)}function Hd(n,e,t,i,r="towards"){const s=e===3,a=l=>s&&n.legend.includes(l),o=new Xe,c=t?.05:0;for(let l=0;l<9;l++){const h=l/8,d=-.6+h*1.15;o.ell([d,.12+Math.sin(h*Math.PI)*(.06+c),0],[.08,.1-h*.02,.12-h*.03],l<2?f.MAGIC2:l%2?f.BODY2:f.BODY,{group:1})}a("lantern")&&o.ell([-.75,.3,0],[.22,.22,.22],f.MAGIC2,{group:3,paint:l=>l[1]<.2?f.MAGIC:void 0});for(let l=0;l<6;l++)o.seg([-.2+l*.12,.05,.08],[-.2+l*.12+(l%2?.02:-.02)*(t?-1:1),0,.12],.015,.01,f.BODY3,{group:7});return o.ell([.6,.14,0],[.06,.06,.08],f.BODY3,{group:1}),Ci(o,[.6,.14,0],[.06,.06,.08],[[.6,.3,.7],[.6,.3,-.7]],.015,s?f.MAGIC2:f.EYE),Ln(o,n,e,i,.4,r)}function Wd(n,e,t,i,r="towards"){const s=e===3,a=h=>s&&n.legend.includes(h),o=new Xe,c=[.15,.28,0];for(const h of[-1,1])for(let d=0;d<4;d++){const u=-.6+d*.4,p=(d+(h>0?0:1)+t)%2?.05:-.05,g=R.add(c,[.05-d*.04,0,h*.1]),v=R.add(g,[Math.cos(u)*.3*(d<2?1:-.6)+p,.3,h*.3]),x=R.add(g,[Math.cos(u)*.55*(d<2?1:-.8)+p*1.5,-.28,h*.55]);o.chain([[...g,.03],[...v,.028],[...x,.015]],h>0?f.BODY2:f.BODY3,{group:h>0?7:2})}o.ell([-.28,.38,0],[.34,.28,.3],f.BODY,{paint:h=>(Math.abs(h[2])<.03||Math.abs(h[0]+.28)<.03)&&h[1]>.45?f.BELLY:void 0}),o.ell(c,[.18,.13,.17],f.BODY2,{group:1}),o.anchors.head={c,r:[.18,.13,.17]},o.anchors.eyes={pts:[[.05,.05],[.05,-.05]].map(([h,d])=>Xe.surface(c,[.18,.13,.17],R.norm([.9,h*6,d*4]))),size:.03},o.anchors.neck={c:[-.02,.32,0],r:.15,dir:[1,0,0]};const l=a("eyesRing");for(const[h,d]of[[.05,.05],[.05,-.05],[.02,.1],[.02,-.1]])o.ell(Xe.surface(c,[.18,.13,.17],R.norm([.9,h*6,d*4])),[.025,.025,.025],l?f.MAGIC2:f.EYE,{group:1});if(l)for(let h=0;h<5;h++){const d=Math.PI*(.2+h/4*.6);o.ell([-.3+Math.cos(d)*.2,.75+Math.sin(d)*.35,(h-2)*.12],[.06,.06,.06],f.MAGIC2,{group:95+h,extra:!0})}return Ln(o,n,e,i,.5,r)}const Vd=new Map(Object.entries({owl:Pd,hedgehog:Dd,toad:Id,raven:Nd,bat:Ud,mole:Fd,beetle:Od,snail:Bd,woodlouse:zd,snake:kd,moth:Gd,glowworm:Hd,spider:Wd})),El=[{id:"wolf",name:"Wolf",plan:"quad",hue:.08,sat:.24,val:.56,legend:["wings","mane"],q:{len:.64,chest:.42,tuck:.6,neck:.32,neckAng:.7,neckW:.42,hr:.26,snout:.82,snoutD:.7,ear:"point",earS:.82,tail:"brush",paw:"paw",legW:1.25,saddle:!0,belly:!0},tail:"up"},{id:"fox",name:"Fox",plan:"quad",q:{hgt:.8,len:.62,chest:.4,tuck:.5,neck:.3,neckAng:.7,neckW:.32,hr:.24,snout:1.05,snoutD:.5,snoutTaper:.6,ear:"point",earS:1.35,tail:"bushy",paw:"paw",legW:.9,belly:!0,socks:.3},hue:.06,sat:.8,val:.9,belly:"white",legend:["tails"]},{id:"badger",name:"Badger",plan:"quad",q:{hgt:.62,len:.78,chest:.2,tuck:.22,neck:.18,neckAng:.1,neckW:.5,hr:.26,snout:1,snoutD:.55,snoutTaper:.55,ear:"round",earS:.7,tail:"stub",paw:"paw",legW:1.35,legMat:f.BODY3,face:"badger",shaggy:!0},hue:.65,sat:.08,val:.45,legend:["crystals"]},{id:"boar",name:"Boar",plan:"quad",hue:.07,sat:.62,val:.5,legend:["tusksBig"],q:{len:.72,chest:.34,tuck:.42,neck:.2,neckAng:-.15,neckW:.55,hr:.27,snout:1.25,snoutD:.62,snoutTaper:.55,ear:"small",earS:.8,tail:"thin",paw:"hoof",legW:1.15,ridge:!0,tusks:!0,back:"hump",disc:!0},ridge:!0},{id:"stag",name:"Stag",plan:"quad",q:{hgt:1.3,len:.6,chest:.6,tuck:.7,neck:.55,neckAng:.95,neckW:.32,hr:.2,snout:1.15,snoutD:.6,snoutTaper:.65,ear:"point",earS:1.1,tail:"deer",paw:"hoof",legW:.75,antlers:"branch",rump:!0,spots:"young",belly:!0},hue:.08,sat:.5,val:.7,legend:["antlersGlow"]},{id:"hare",name:"Hare",plan:"quad",q:{hgt:.72,len:.5,chest:.4,tuck:.45,neck:.2,neckAng:.9,neckW:.35,hr:.27,snout:.65,snoutD:.7,ear:"long",earS:2.4,tail:"puff",paw:"paw",legW:.85,haunch:1.35,hindFoot:1.6,back:"arch",belly:!0,whiskers:!0},hue:.08,sat:.4,val:.72,legend:["jackalope"]},{id:"owl",name:"Owl",plan:"owl",hue:.08,sat:.5,val:.55,legend:["eyesRing","wings"]},{id:"bear",name:"Bear",plan:"quad",q:{hgt:1.15,len:.72,chest:.38,tuck:.4,neck:.25,neckAng:.3,neckW:.55,hr:.28,snout:.7,snoutD:.62,snoutTaper:.7,ear:"round",earS:.8,tail:"stub",paw:"paw",legW:1.55,back:"hump",muzzle:!0,shaggy:!0},hue:.07,sat:.55,val:.42,legend:["moss"]},{id:"hedgehog",name:"Hedgehog",plan:"hedgehog",hue:.08,sat:.4,val:.5,legend:["crystals"]},{id:"squirrel",name:"Squirrel",plan:"quad",q:{hgt:.55,len:.45,chest:.35,tuck:.4,neck:.2,neckAng:.9,neckW:.35,hr:.3,snout:.55,snoutD:.65,ear:"tuft",earS:1.1,tail:"squirrel",paw:"paw",legW:.8,haunch:1.3,back:"arch",belly:!0,whiskers:!0},hue:.03,sat:.75,val:.75,belly:"white",legend:["starTail"]},{id:"toad",name:"Toad",plan:"toad",hue:.2,sat:.5,val:.55,legend:["crown"]},{id:"otter",name:"Otter",plan:"quad",q:{hgt:.55,len:1,chest:.25,tuck:.25,neck:.3,neckAng:.35,neckW:.5,hr:.27,snout:.6,snoutD:.7,ear:"round",earS:.5,tail:"otter",paw:"paw",legW:1.1,muzzle:!0,belly:!0,whiskers:!0},hue:.07,sat:.55,val:.45,belly:"white",legend:["ribbons"]},{id:"lynx",name:"Lynx",plan:"quad",q:{hgt:.9,len:.55,chest:.5,tuck:.55,neck:.25,neckAng:.8,neckW:.4,hr:.27,snout:.5,snoutD:.75,snoutTaper:.8,ear:"tuft",earS:1,tail:"bob",paw:"paw",legW:1.2,cheeks:!0,spots:!0,belly:!0,whiskers:!0},hue:.09,sat:.45,val:.75,legend:["mane"]},{id:"elk",name:"Elk",plan:"quad",q:{hgt:1.4,len:.68,chest:.6,tuck:.66,neck:.45,neckAng:.75,neckW:.42,hr:.24,snout:1.6,snoutD:.9,snoutTaper:.85,ear:"point",earS:.9,tail:"stub",paw:"hoof",legW:.9,back:"hump",antlers:"palm",shaggy:!0},hue:.07,sat:.55,val:.38,legend:["antlersGlow","moss"]},{id:"raven",name:"Raven",plan:"raven",hue:.68,sat:.35,val:.3,legend:["wings","eyesRing"]},{id:"bat",name:"Bat",plan:"bat",hue:.78,sat:.25,val:.45,legend:["wingsBig"]},{id:"mole",name:"Mole",plan:"mole",hue:.7,sat:.15,val:.32,legend:["crown"]},{id:"beaver",name:"Beaver",plan:"quad",q:{hgt:.6,len:.65,chest:.2,tuck:.22,neck:.2,neckAng:.4,neckW:.55,hr:.28,snout:.6,snoutD:.75,ear:"round",earS:.45,tail:"flat",paw:"paw",legW:1.2,back:"arch",teeth:!0,whiskers:!0},hue:.06,sat:.6,val:.45,legend:["moss"]},{id:"stoat",name:"Stoat",plan:"quad",q:{hgt:.5,len:1,chest:.3,tuck:.33,neck:.35,neckAng:.6,neckW:.32,hr:.25,snout:.6,snoutD:.6,ear:"round",earS:.6,tail:"stoat",paw:"paw",legW:.8,belly:!0,back:"arch",whiskers:!0},hue:.1,sat:.25,val:.92,legend:["ribbons","mane"]},{id:"snail",name:"Snail",plan:"snail",hue:.08,sat:.45,val:.55,legend:["glowShell"]},{id:"ram",name:"Ram",plan:"quad",q:{hgt:.95,len:.6,chest:.48,tuck:.52,neck:.22,neckAng:.45,neckW:.48,hr:.25,snout:.85,snoutD:.75,snoutTaper:.8,ear:"small",earS:.7,tail:"stub",paw:"hoof",legW:.9,wool:!0,horns:"curl",face:"dark"},hue:.1,sat:.12,val:.88,legend:["hornsGlow"]},{id:"woodlouse",name:"Woodlouse",plan:"woodlouse",hue:.65,sat:.12,val:.45,legend:["crystals"]},{id:"snake",name:"Snake",plan:"snake",hue:.25,sat:.45,val:.45,legend:["wings"]},{id:"moth",name:"Moth",plan:"moth",hue:.1,sat:.3,val:.7,legend:["wingsBig"]},{id:"marten",name:"Pine marten",plan:"quad",q:{hgt:.55,len:.78,chest:.35,tuck:.38,neck:.3,neckAng:.55,neckW:.35,hr:.25,snout:.65,snoutD:.6,ear:"round",earS:.9,tail:"bushy",paw:"paw",legW:.85,belly:!0,back:"arch"},hue:.07,sat:.6,val:.45,legend:["mane"]},{id:"salamander",name:"Salamander",plan:"quad",q:{hgt:.42,len:.9,chest:.14,tuck:.14,neck:.12,neckAng:.05,neckW:.5,hr:.27,snout:.55,snoutD:.55,ear:"none",tail:"otter",paw:"paw",legW:1,spots:!0,spotMat:"belly"},hue:.1,sat:.1,val:.22,belly:"yellow",legend:["flames"]},{id:"glowworm",name:"Glow-worm",plan:"glowworm",hue:.12,sat:.4,val:.35,legend:["lantern"]},{id:"spider",name:"Spider",plan:"spider",hue:.07,sat:.45,val:.4,legend:["eyesRing"]},{id:"dormouse",name:"Dormouse",plan:"quad",q:{hgt:.38,len:.45,chest:.35,tuck:.38,neck:.15,neckAng:.6,neckW:.4,hr:.34,snout:.45,snoutD:.7,ear:"round",earS:.85,tail:"squirrel",paw:"paw",legW:.8,back:"arch",belly:!0,whiskers:!0,eyeK:1.6},hue:.09,sat:.6,val:.75,belly:"white",legend:["starTail"]},{id:"beetle",name:"Stag beetle",plan:"beetle",hue:.78,sat:.5,val:.35,legend:["horn","crystals"]}],zh=Object.fromEntries(El.map(n=>[n.id,n])),Eo=[[[255,70,170],[255,245,250],[255,230,70]],[[40,220,255],[255,236,60],[255,80,180]],[[150,80,255],[175,255,60],[255,255,255]]],Ao={sneakers:[[255,70,90],[250,250,245]],glitter:[[215,215,235],[190,190,210]],platform:[[160,60,230],[40,30,52]]},Xd=["bar","star","heart"];function Yd(n,e=!0){const t=Ma((n|0)*7919+17),i=t()<.12;return{collar:e,hat:i||t()<.45?Math.floor(t()*Eo.length):null,glasses:i||t()<.4?Xd[t()<.6?0:t()<.5?1:2]:null,shoes:i||t()<.4?Object.keys(Ao)[Math.floor(t()*3)]:null}}function Kd(n,e,t=null){const i=qd(n,e);if(!t)return i;if(t.collar&&(i[f.COLLAR]=Array.isArray(t.collar)?t.collar:i[f.MAGIC]),t.hat!=null){const[r,s,a]=Eo[t.hat%Eo.length];i[f.HAT1]=r,i[f.HAT2]=s,i[f.POM]=a}if(t.glasses&&(i[f.SHADES]=[22,18,32],i[f.FRAME]=t.glasses==="heart"?[255,60,110]:[255,90,210]),t.shoes){const[r,s]=Ao[t.shoes]||Ao.sneakers;i[f.SHOE]=r,i[f.SOLE]=s}if(t.woken){i[f.WOKEN]=[255,40,36];for(const r of[f.BODY,f.BODY2,f.BODY3,f.BELLY,f.ACCENT,f.EAR])i[r]&&(i[r]=i[r].map((s,a)=>Math.round(s*.72+[30,8,12][a]*.1)))}return i}function qd(n,e){const t=zh[n],i=e.cVal/.85,r=e.cSat/.6,s=ge(t.hue,t.sat*r*e.sat,t.val*i),a=t.belly==="yellow"?[240,196,40]:t.belly==="white"||t.q?.face==="badger"?[236,232,222]:ge(t.hue+.03,t.sat*.5*r,Math.min(1,t.val*i*1.3+.08)),o=ge(e.magicHue+t.hue*.3,.6,1),c=ge(e.magicHue+t.hue*.3,.18,1),l=["boar","stag","elk","ram"].includes(t.id);return{[f.BODY]:s,[f.BODY2]:ge(t.hue+.02,Math.min(1,t.sat*r*1.2+.05),t.val*i*.66),[f.BODY3]:ge(t.hue+.03,Math.min(1,t.sat*r*1.3+.1),t.val*i*.4),[f.BELLY]:a,[f.ACCENT]:l?[236,226,200]:ge(t.hue+.05,t.sat*.6,Math.min(1,t.val*i*.5+.25)),[f.MAGIC]:o,[f.MAGIC2]:c,[f.LEAF]:ge(.3,.55,.55),[f.LEAF2]:ge(.25,.5,.75),[f.LEAF3]:ge(.33,.6,.35),[f.TRUNK]:ge(.07,.45,.32),[f.EYE]:[24,18,30],[f.PUPIL]:[70,40,90],[f.GLINT]:[255,255,245],[f.NOSE]:[38,28,36],[f.EAR]:ge(t.hue+.97,Math.min(1,t.sat*.6+.2),Math.min(1,t.val*i*.55+.2)),[f.IRIS]:t.plan==="owl"?[255,176,40]:ge(.12,.7,.85),[f.SKIN]:[238,158,192]}}const $d=["size","growth","pixel","head","eye","legs","long","fur"],Gr=new Map;function Zd(n,e,t,i,r="towards",s=null){const a=zh[n]||El[0],o=s&&(s.collar||s.hat!=null||s.glasses||s.shoes||s.woken)?s:null,c=[a.id,e,t,r,...$d.map(h=>i[h]),o?[!!o.collar,o.hat??"",o.glasses||"",o.shoes||"",!!o.woken].join(","):""].join("|");let l=Gr.get(c);if(!l){if(l=Ed(o,()=>a.q?Rd(a,e,t,i,r):Vd.get(a.plan)(a,e,t,i,r)),o?.woken)for(let h=0;h<l.m.length;h++)(l.m[h]===f.EYE||l.m[h]===f.IRIS||l.m[h]===f.PUPIL)&&(l.m[h]=f.WOKEN);Gr.size>600&&Gr.delete(Gr.keys().next().value),Gr.set(c,l)}return l}const ya=.07,Al=.048,$e=(...n)=>({l:n}),St=(n,e,t,i,r)=>({a:[n,e,t,i,r]}),jt=(n,e)=>({d:[n,e]}),ft=(n,e=.86)=>$e([.5,e],[.5,n]),pt=St(.5,.76,.13,25,155),Jd=n=>n.l?{l:n.l.map(([e,t])=>[1-e,t])}:n.a?{a:[1-n.a[0],n.a[1],n.a[2],180-n.a[3],180-n.a[4]]}:{d:[1-n.d[0],n.d[1]]},mt=(...n)=>n.flatMap(e=>[e,Jd(e)]);function ti(n,e,t){const i=e[0]-n[0],r=e[1]-n[1],s=Math.hypot(i,r),a=t*s,o=(s*s/4+a*a)/(2*Math.abs(a)),c=(n[0]+e[0])/2,l=(n[1]+e[1])/2,h=r/s,d=-i/s,u=(o-Math.abs(a))*Math.sign(a),p=c-h*u,g=l-d*u,v=Math.atan2(n[1]-g,n[0]-p)*180/Math.PI;let m=Math.atan2(e[1]-g,e[0]-p)*180/Math.PI-v;for(;m>180;)m-=360;for(;m<-180;)m+=360;return St(p,g,o,v,v+m)}const Qd=(n,e,t,i,r,s=24)=>$e(...Array.from({length:s+1},(a,o)=>[n+i*Math.sin(o/s*r*2*Math.PI),e+(t-e)*o/s])),jd=(n,e,t,i,r,s=0,a=40)=>$e(...Array.from({length:a+1},(o,c)=>{const l=c/a,h=(s+l*r*360)*Math.PI/180,d=t+(i-t)*l;return[n+d*Math.cos(h),e+d*Math.sin(h)]})),xs=(n,e,t,i,r)=>r.map(s=>{const a=Math.cos(s*Math.PI/180),o=Math.sin(s*Math.PI/180);return $e([n+t*a,e+t*o],[n+i*a,e+i*o])}),ef={wolf:[ft(.3),$e([.28,.08],[.5,.3],[.72,.08]),St(.5,.55,.2,-55,55),pt,jt(.5+.2*Math.cos(-55*Math.PI/180),.55+.2*Math.sin(-55*Math.PI/180))],fox:[ft(.34),$e([.36,.06],[.5,.34],[.64,.06]),St(.67,.66,.17,180,-80),jt(.67+.17*Math.cos(-80*Math.PI/180),.66+.17*Math.sin(-80*Math.PI/180)),pt],badger:[ft(.1),$e([.24,.3],[.76,.3]),...mt($e([.33,.14],[.33,.56])),pt,...mt(jt(.24,.3))],boar:[ft(.16),...mt(St(.36,.24,.15,45,180)),...xs(.5,.16,0,.1,[-130,-90,-50]),pt],stag:[ft(.42),...mt($e([.5,.42],[.34,.26],[.3,.06]),$e([.335,.25],[.16,.2]),$e([.32,.15],[.18,.07])),pt],hare:[ft(.44),...mt($e([.5,.44],[.4,.34],[.38,.06])),St(.62,.66,.09,180,540),pt,...mt(jt(.38,.06))],owl:[ft(.44),...mt(St(.33,.3,.13,0,360),$e([.24,.18],[.18,.05])),pt,...mt(jt(.33,.3))],bear:[ft(.24),$e([.24,.3],[.76,.3]),...mt(St(.3,.3,.09,180,360)),...mt($e([.36,.5],[.32,.62])),pt],hedgehog:[ft(.52),St(.5,.52,.2,180,360),...xs(.5,.52,.22,.34,[-160,-125,-90,-55,-20]),pt],squirrel:[ft(.2),$e([.5,.2],[.4,.08]),St(.66,.4,.16,100,-200),jt(.66+.16*Math.cos(-200*Math.PI/180),.4+.16*Math.sin(-200*Math.PI/180)),pt],toad:[ft(.42),$e([.16,.54],[.24,.42],[.76,.42],[.84,.54]),...mt(St(.34,.3,.1,0,360)),pt,...mt(jt(.16,.54))],otter:[ft(.24),St(.5,.5,.28,-100,100),jt(.5+.28*Math.cos(-100*Math.PI/180),.5+.28*Math.sin(-100*Math.PI/180)),ti([.18,.64],[.36,.64],.3),pt],lynx:[ft(.32),$e([.26,.2],[.5,.32],[.74,.2]),...mt($e([.26,.2],[.26,.06])),$e([.5,.68],[.66,.62]),pt,...mt(jt(.26,.06))],elk:[ft(.3),...mt($e([.5,.3],[.42,.2]),St(.3,.16,.12,0,180),$e([.18,.16],[.14,.06])),$e([.5,.44],[.6,.52]),pt],raven:[ft(.14),$e([.5,.14],[.3,.22]),$e([.18,.56],[.5,.38],[.82,.56]),pt,jt(.58,.17),...mt(jt(.18,.56))],bat:[ft(.3),St(.5,.16,.14,20,160),...mt($e([.5,.38],[.12,.26]),ti([.12,.26],[.24,.46],-.25),ti([.24,.46],[.38,.5],-.3),ti([.38,.5],[.5,.52],-.3)),pt],mole:[ft(.44),St(.5,.3,.16,0,180),...xs(.5,.3,.19,.3,[-160,-125,-55,-20]),$e([.5,.14],[.5,.04]),pt],beaver:[ft(.36),$e([.32,.2],[.68,.2]),...mt($e([.44,.2],[.44,.34])),$e([.5,.56],[.68,.66],[.5,.76],[.32,.66],[.5,.56]),pt],stoat:[ft(.18),St(.5,.44,.24,180,360),$e([.5,.18],[.6,.08]),pt,...mt(jt(.26,.44))],snail:[ft(.52),jd(.5,.33,.03,.2,1.6,90),$e([.66,.2],[.76,.06]),pt,jt(.76,.06)],ram:[ft(.24),...mt(St(.36,.24,.14,0,-250)),pt,...mt(jt(.36+.14*Math.cos(-250*Math.PI/180),.24+.14*Math.sin(-250*Math.PI/180)))],woodlouse:[ft(.24),St(.5,.52,.22,205,335),St(.5,.66,.24,205,335),St(.5,.38,.2,205,335),...mt($e([.5,.24],[.32,.06])),pt],snake:[ft(.16),Qd(.5,.82,.2,.2,1.25),$e([.5,.2],[.5,.11]),...mt($e([.5,.11],[.42,.045])),pt],moth:[ft(.2),...mt($e([.5,.3],[.16,.18],[.24,.5],[.5,.4]),$e([.5,.5],[.3,.64],[.5,.66]),St(.38,.16,.12,0,-110)),pt],marten:[ft(.32),$e([.3,.2],[.5,.32],[.7,.2]),...mt(St(.3,.14,.07,90,-180)),St(.28,.56,.22,0,150),jt(.28+.22*Math.cos(150*Math.PI/180),.56+.22*Math.sin(150*Math.PI/180)),pt],salamander:[ft(.3),ti([.5,.3],[.5,.06],.35),ti([.5,.3],[.5,.06],-.35),...mt($e([.5,.42],[.32,.38],[.26,.48]),$e([.5,.64],[.32,.6],[.26,.7])),pt,...mt(jt(.38,.52))],glowworm:[ft(.4),St(.5,.27,.1,90,450),...xs(.5,.27,.15,.25,[0,60,120,180,240,300]),pt],spider:[$e([.5,.05],[.5,.3]),ft(.5),St(.5,.4,.11,-90,270),...mt(...[-150,-170,170,150].map(n=>$e([.5+.12*Math.cos(n*Math.PI/180),.4+.12*Math.sin(n*Math.PI/180)],[.5+.28*Math.cos(n*Math.PI/180),.4+.28*Math.sin(n*Math.PI/180)],[.5+.32*Math.cos(n*Math.PI/180),.4+.28*Math.sin(n*Math.PI/180)+.1]))),pt,jt(.5,.05)],dormouse:[ft(.12),St(.5,.46,.24,-60,250),...mt(St(.34,.16,.08,90,-180)),ti([.56,.38],[.7,.38],-.4),pt],beetle:[ft(.36),...mt(St(.66,.26,.2,160,250)),ti([.5,.38],[.5,.82],.25),ti([.5,.38],[.5,.82],-.25),pt]},dc={pink:[255,64,200],cyan:[50,235,255],acid:[175,255,45],violet:[165,95,255],orange:[255,135,35],lemon:[255,238,70],red:[255,55,95],mint:[70,255,175],blue:[70,145,255],magenta:[235,70,255]},tf={badger:"pink",boar:"cyan",snail:"acid",fox:"violet",ram:"orange",woodlouse:"lemon",hedgehog:"red",squirrel:"mint",wolf:"blue",stag:"magenta",stoat:"pink",snake:"cyan",hare:"acid",owl:"violet",bear:"orange",toad:"lemon",otter:"red",lynx:"mint",elk:"blue",raven:"magenta",bat:"pink",mole:"cyan",beaver:"acid",beetle:"violet",moth:"orange",marten:"lemon",salamander:"red",glowworm:"mint",spider:"blue",dormouse:"magenta"},wa=n=>dc[tf[n]]||dc.cyan,nf=[255,255,250],rf=(n,e,t)=>n.map((i,r)=>Math.round(i+(e[r]-i)*t)),fc=n=>`rgb(${n.join(",")})`;function sf(n=0){const e=Math.max(0,n);return{level:e,metres:2+e+Math.max(0,e-2)*.5,core:1+.2*e,halo:Math.min(1,.45+.19*e),rings:e>=4?3:e>=3?2:e>=2?1:0,dots:e>=1&&e<2?12:0,band:e>=3,rays:e>=4?8:e>=3?4:0,shimmer:e>=3}}function $s(n){if(n.d)return{dot:!0,pts:[n.d],len:Al*2};let e=n.l;if(n.a){const[i,r,s,a,o]=n.a,c=Math.max(6,Math.ceil(Math.abs(o-a)/8));e=Array.from({length:c+1},(l,h)=>{const d=(a+(o-a)*h/c)*Math.PI/180;return[i+s*Math.cos(d),r+s*Math.sin(d)]})}let t=0;for(let i=1;i<e.length;i++)t+=Math.hypot(e[i][0]-e[i-1][0],e[i][1]-e[i-1][1]);return{dot:!1,pts:e,len:t}}const To=(n,e=0,t=1)=>{const i=n.reduce((s,a)=>s+a.len,0)||1;let r=0;for(const s of n)s.start=e+(t-e)*r/i,r+=s.len,s.end=e+(t-e)*r/i;return n},Oa=new Map;function kh(n){return Oa.has(n)||Oa.set(n,To((ef[n]||[]).map(e=>({...$s(e),w:ya,part:"sigil"})))),Oa.get(n)}const Ba=new Map;function af(n,e=0){const t=n+":"+e;if(Ba.has(t))return Ba.get(t);const i=e===null?null:sf(e),r=i?i.rings>=2?.6:i.rings||i.dots?.66:.8:1,s=(1-r)/2,a=i?i.core:1,o=ya*.55*((i?.level??0)<3?1:Math.min(1.6,.8+.25*i.level)),c=[];if(i){const p=g=>$s({a:[.5,.5,g,90,450]});for(let g=0;g<i.rings;g++)c.push({...p(.44-g*.06),w:o,part:"ring"});for(let g=0;g<i.dots;g++){const v=(90+g*360/i.dots)*Math.PI/180;c.push({dot:!0,pts:[[.5+.44*Math.cos(v),.5+.44*Math.sin(v)]],len:.05,r:.042,w:o,part:"ring"})}if(i.band&&i.rings>=2)for(let g=0;g<16;g++){const v=(90+g*22.5)*Math.PI/180,x=.44-.06+.014,m=.44-.014;c.push({...$s({l:[[.5+x*Math.cos(v),.5+x*Math.sin(v)],[.5+m*Math.cos(v),.5+m*Math.sin(v)]]}),w:o*.8,part:"band"})}for(let g=0;g<i.rays;g++){const v=(90+g*360/i.rays)*Math.PI/180,x=.44+.02,m=.5-o/2;c.push({...$s({l:[[.5+x*Math.cos(v),.5+x*Math.sin(v)],[.5+m*Math.cos(v),.5+m*Math.sin(v)]]}),w:o*1.3,part:"ray"})}}const l=Math.min(1.25,a),h=kh(n).map(u=>({dot:u.dot,len:u.len*r,pts:u.pts.map(([p,g])=>[s+p*r,s+g*r]),w:u.w*r*l,r:Al*r*l,part:"sigil"})),d={level:e,frame:i,k:r,strokes:[...To(c,0,c.length?.15:0),...To(h,c.length?.15:0,1)]};return Ba.set(t,d),d}function of(n,e){if(e>=n.end)return n.pts;if(e<=n.start)return null;if(n.dot)return n.pts;let t=(e-n.start)/(n.end-n.start)*n.len;const i=[n.pts[0]];for(let r=1;r<n.pts.length;r++){const s=n.pts[r-1],a=n.pts[r],o=Math.hypot(a[0]-s[0],a[1]-s[1]);if(t<=o){i.push([s[0]+(a[0]-s[0])*t/o,s[1]+(a[1]-s[1])*t/o]);break}i.push(a),t-=o}return i}function lf(n,e,{x:t=0,y:i=0,size:r=64,level:s=null,colour:a=wa(e),progress:o=1,glow:c=!0}={}){const l=af(e,s),h=l.frame?l.frame.halo:.7;n.save(),n.translate(t,i),n.scale(r,r),n.lineCap="round",n.lineJoin="round";const d=(u,p,g,v)=>{n.globalAlpha=g,n.strokeStyle=n.fillStyle=fc(u),n.shadowColor=fc(a),n.shadowBlur=v;for(const x of l.strokes){const m=of(x,o);if(m){if(n.beginPath(),x.dot){n.arc(m[0][0],m[0][1],x.r*(p>1?1.5:1),0,Math.PI*2),n.fill();continue}n.lineWidth=x.w*p,m.forEach((_,M)=>M?n.lineTo(_[0],_[1]):n.moveTo(_[0],_[1])),n.stroke()}}};c?(d(a,2.4,Math.min(h,.7)*.55,r/12),d(rf(a,nf,.72),.62,1,r/30)):d(a,1,1,0),n.restore()}function cf(n,e,t,i){let r=1/0;for(const s of n){if(s.start>=r)break;if(s.dot){Math.hypot(e-s.pts[0][0],t-s.pts[0][1])<Al+i-ya/2&&(r=s.start);continue}let a=0;for(let o=1;o<s.pts.length;o++){const c=s.pts[o-1],l=s.pts[o],h=l[0]-c[0],d=l[1]-c[1],u=h*h+d*d,p=Math.sqrt(u),g=u?Math.max(0,Math.min(1,((e-c[0])*h+(t-c[1])*d)/u)):0;if(Math.hypot(e-c[0]-h*g,t-c[1]-d*g)<i){const v=s.start+(a+g*p)/s.len*(s.end-s.start);v<r&&(r=v)}a+=p}}return r}function hf(n,e,t,i=ya/2){return cf(kh(n),e,t,i)<1/0}El.map(n=>n.id);const uf=new Set([f.TRUNK,f.BARK2,f.BARKD,f.BARKL]);function Vi(n,e,t,i,r,s,{mat:a=f.LEAF,group:o=30,ragged:c=1}={}){const h=[];for(let m=0;m<9;m++){const _=m/9*Math.PI*2,M=1+(s()-.5)*.35*(r.clump+.3);h.push([e[0]+Math.cos(_)*t*M,e[1]+Math.sin(_)*i*M*(Math.sin(_)>0?.8:1)])}const d=Math.max(1,Math.round(Math.min(t,i)/3.5));n.shape(Sa(h,0,9,d,Math.max(1.2,Math.min(t,i)*.14)*c,1),a,{group:o,line:!1,round:r.round}),n.mark([Tt(e,[-t*1.1,i*.15]),Tt(e,[t*1.1,i*.1]),Tt(e,[t*1.1,i*1.2]),Tt(e,[-t*1.1,i*1.2])],f.LEAF3,[a]),n.mark([Tt(e,[-t*.75,-i*.55]),Tt(e,[t*.25,-i*.95]),Tt(e,[t*.55,-i*.35]),Tt(e,[-t*.2,-i*.05])],f.LEAF2,[a]);const u=Math.floor(e[0]-t*1.2),p=Math.ceil(e[0]+t*1.2),g=Math.floor(e[1]-i*1.2),v=Math.ceil(e[1]+i*1.2),x=s()*1e4|0;for(let m=g;m<=v;m++)for(let _=u;_<=p;_++){const M=n.get(_,m);if(M!==a&&M!==f.LEAF2&&M!==f.LEAF3)continue;const S=Lt(_,m,x),w=yi(_/2,m/2,x)*.5+S*.5;w<.16*r.density?n.recolour(_,m,M===f.LEAF2?a:f.LEAF2):w>1-.16*r.density&&n.recolour(_,m,M===f.LEAF3?a:f.LEAF3)}}function Ri(n,e,t,i,r,s,a,o,{mat:c=f.TRUNK,bend:l=1,group:h=10,line:d=!1}={}){const u=[e],p=4;let g=t,v=e;for(let x=1;x<=p;x++)g+=(o()-.5)*.7*a.gnarl*l,v=Tt(v,[Math.cos(g)*i/p,Math.sin(g)*i/p]),u.push(v);return n.limb(u.map((x,m)=>[...x,r+(s-r)*m/p]),c,{group:h,line:d,round:a.round,cap:.6,capEnd:1}),{end:v,ang:g,pts:u}}function Ea(n,e,t,i,r,s,a){if(n.shape([[e-i*1.05,t],[e-i*.62,t-i*.5],[e-i*.45,t-i*1.4],[e+i*.45,t-i*1.4],[e+i*.62,t-i*.5],[e+i*1.05,t]],f.TRUNK,{group:10,round:r.round}),r.roots<=0)return;const o=Math.round(2+r.roots*4);for(let c=0;c<o;c++){const l=c%2?1:-1,h=(8+s()*16)*a*(.4+r.roots),d=(2+s()*3)*a,u=[e+l*i*.2,t-i*.5],p=[e+l*(i*.55+h*.4),t-d],g=[e+l*(i*.5+h),t-.5];n.limb([[...u,i*.55],[...p,i*.28],[...g,1.2]],f.TRUNK,{group:11,round:r.round,cap:.5,capEnd:.6})}}function Aa(n,e,t=!0){if(!(e.bark<=0))for(let i=0;i<n.h;i++)for(let r=0;r<n.w;r++){const s=i*n.w+r;if(n.m[s]!==f.TRUNK)continue;const a=t?yi(r/1.3,i/6,21):yi(r/6,i/1.3,21);a>1-e.bark*.42||Lt(r,i,4)<e.bark*.05?n.m[s]=f.BARKD:a>1-e.bark*.62&&n.n[s*3]<-.1&&(n.m[s]=f.BARKL)}}function Ar(n,e,t){let i=n.w,r=-1,s=n.h;for(let u=0;u<n.h;u++)for(let p=0;p<n.w;p++)n.m[u*n.w+p]&&(i=Math.min(i,p),r=Math.max(r,p),s=Math.min(s,u));if(r<0)return{sp:n,crownY:t};const a=Math.max(e-i,r-e)+2,o=Math.max(0,Math.floor(e-a)),c=Math.min(n.w-o,Math.ceil(a*2)+1),l=Math.max(0,s-1),h=n.h-l,d=new pn(c,h);for(let u=0;u<h;u++)for(let p=0;p<c;p++){const g=(u+l)*n.w+p+o,v=u*c+p;d.m[v]=n.m[g],d.g[v]=n.g[g],d.n[v*3]=n.n[g*3],d.n[v*3+1]=n.n[g*3+1],d.n[v*3+2]=n.n[g*3+2]}return{sp:d,crownY:t-l}}const os=n=>(n.crownWidth||3)/3;function Gh(n,e,t){const i=os(e),r=Math.round(220*t*i+60*t),s=Math.round(140*t),a=new pn(r,s),o=r/2,c=s,l=e.treeTrunks||1,h=12*t*(e.treeThick||1)*(e.treeThin?.55:1)/Math.sqrt(l),d=(n()-.5)*.5*e.gnarl+(e.treeLean||0),u=[];let p=s;const g=(v,x,m,_,M)=>{const S=Ri(a,v,x,m,_,_*.65,e,n,{group:12});if(M===0){u.push(S.end);return}const w=n()<.35?3:2;for(let E=0;E<w;E++){const L=(E-(w-1)/2)*ye(n,.5,.85)*(M===3?1.4:1);g(S.end,S.ang+L+(n()-.5)*.25,m*ye(n,.6,.78),_*.62,M-1)}M<=2&&u.push(ci(v,S.end,.7))};for(let v=0;v<l;v++){const x=d+(l>1?(v/(l-1)-.5)*.8:0),m=[o+(v-(l-1)/2)*h*.6,c],_=Ri(a,m,-Math.PI/2+x,s*.36*(l>1?ye(n,.75,1.15):1),h,h*.72,e,n,{bend:1.4});p=Math.min(p,_.end[1]);for(const M of[-1,1])g(_.end,-Math.PI/2+x*.5+M*ye(n,.55,.95)*(.7+.3*i)*(l>1?.6:1),s*.22*(.75+.25*i)*(l>1?.7:1),h*.7,l>2?2:3);if(l===1&&n()<.7&&g(_.end,-Math.PI/2+(n()-.5)*.3,s*.18,h*.55,2),v===0&&e.treeHollow){const M=ci(m,_.end,.38);a.ellipse(M[0],M[1],h*.28,h*.5,f.NOSE,{round:.3})}}if(Ea(a,o,c,h*Math.sqrt(l),e,n,t),Aa(a,e),e.treeWebs)for(let v=0;v+1<u.length;v+=2){const x=u[v],m=u[v+1],_=Math.hypot(m[0]-x[0],m[1]-x[1]);if(_<40*t)for(let M=0;M<=_;M++){const S=ci(x,m,M/_);a.px(S[0],S[1]+Math.sin(M/_*Math.PI)*_*.15,f.WEB,0,0,1)}}if(e.treeBare)return Ar(a,o,p+4*t);u.sort((v,x)=>v[1]-x[1]);for(const v of u)Vi(a,Tt(v,[0,-3*t]),ye(n,14,21)*t,ye(n,10,14)*t,e,n,{mat:n()<.35?f.LEAF3:f.LEAF});for(const v of u)n()<.75&&Vi(a,Tt(v,[ye(n,-9,9)*t,ye(n,-12,-3)*t]),ye(n,10,15)*t,ye(n,7,10)*t,e,n);return Ar(a,o,p+4*t)}function Tl(n,e,t){const i=.8+.2*os(e),r=Math.round(90*t*i),s=Math.round(160*t),a=new pn(r,s),o=r/2,c=s;a.limb([[o,c,6*t],[o,c-s*.5,4*t],[o,6*t,1.5]],f.TRUNK,{group:10,round:e.round}),Ea(a,o,c,6*t,e,n,t*.6),Aa(a,e);const l=Math.round(ye(n,9,12));for(let h=l-1;h>=0;h--){const d=h/(l-1),u=6*t+d*s*.7,p=(5+d*36)*t*i*ye(n,.9,1.1),g=(5+d*13)*t,v=[[o,u-4*t],[o+p*.5,u+g*.3],[o+p,u+g],[o+p*.7,u+g*1.15],[o,u+g*.7],[o-p*.7,u+g*1.15],[o-p,u+g],[o-p*.5,u+g*.3]];a.shape(Sa(v,1,7,Math.max(2,Math.round(p/(3*t))),2*t,1),f.LEAF,{group:30+h,line:!1,round:e.round}),a.mark([[o-p,u+g*.55],[o+p,u+g*.55],[o+p,u+g*1.4],[o-p,u+g*1.4]],f.LEAF3,[f.LEAF]),a.mark([[o-p*.55,u-2*t],[o+p*.1,u-3*t],[o+p*.1,u+g*.45],[o-p*.7,u+g*.7]],f.LEAF2,[f.LEAF])}return Ar(a,o,s*.82)}function Hh(n,e,t){const i=os(e),r=Math.round(200*t*i+50*t),s=Math.round(130*t),a=new pn(r,s),o=r/2,c=s,l=13*t,h=Ri(a,[o,c],-Math.PI/2+(n()-.5)*.3,s*.3,l,l*.8,e,n,{bend:1.6}),d=[];for(let g=0;g<5;g++){const v=g%2?1:-1,x=-Math.PI/2+v*ye(n,.55,1.25)*(.7+.3*i),m=Ri(a,h.end,x,s*ye(n,.3,.42)*(.8+.2*i),l*.55,l*.3,e,n,{group:12});d.push(m.end)}Ea(a,o,c,l,e,n,t),Aa(a,e);for(const g of d)Vi(a,Tt(g,[0,-2*t]),ye(n,20,28)*t,ye(n,9,12)*t,e,n);Vi(a,Tt(h.end,[0,-8*t]),24*t,11*t,e,n);let u=r,p=0;for(const g of d)u=Math.min(u,g[0]-22*t),p=Math.max(p,g[0]+22*t);for(let g=u;g<p;g+=ye(n,1,1.7)){let v=s;for(let M=0;M<s;M++)if(a.get(g,M)===f.LEAF||a.get(g,M)===f.LEAF2||a.get(g,M)===f.LEAF3){v=M;break}if(v>=s)continue;const x=Math.abs(g-o)/(r/2),m=(c-v)*ye(n,.5,.9)*(1-x*.3),_=Lt(g|0,1,9)<.4?f.LEAF2:f.LEAF;for(let M=v+2;M<Math.min(c-2,v+m);M++){const S=Math.round(Math.sin(M*.12+g)*.7);Lt(g|0,M,5)<.2+e.density*.8&&a.px(g+S,M,(M-v)/m>.8?f.LEAF3:_,S*.3,.2,.95)}}return Ar(a,o,h.end[1]+6*t)}function Wh(n,e,t){const i=.7+.3*os(e),r=Math.round(110*t*i),s=Math.round(155*t),a=new pn(r,s),o=r/2,c=s,l=(n()-.5)*.25+(e.treeLean||0),h=Ri(a,[o,c],-Math.PI/2+l,s*.85,5*t,2*t,e,n,{mat:f.BARK2,bend:.4});for(let u=0;u<h.pts.length-1;u++)for(let p=0;p<1;p+=1/8){const g=ci(h.pts[u],h.pts[u+1],p+n()*.1);if(n()<.55)for(let v=-3;v<=3;v++)a.get(g[0]+v,g[1])===f.BARK2&&n()<.8&&a.recolour(g[0]+v,g[1],f.BARKD)}const d=[h.end];for(let u=0;u<7;u++){const p=ye(n,.35,.9),g=ci(h.pts[0],h.end,p),v=u%2?1:-1,x=Ri(a,g,-Math.PI/2+v*ye(n,.5,1),s*ye(n,.12,.2)*i,2*t,1,e,n,{mat:f.BARKD,group:12});d.push(x.end)}for(const u of d)Vi(a,u,ye(n,9,13)*t*i,ye(n,7,10)*t,e,n,{mat:f.LEAF2,ragged:1.3});return Ar(a,o,s*.55)}function Vh(n,e,t){const i=os(e),r=Math.round(220*t*i+50*t),s=Math.round(120*t),a=new pn(r,s),o=r/2,c=s,l=10*t,h=Ri(a,[o,c],-Math.PI/2+(n()-.5)*.4*(e.gnarl+.3),s*.4,l,l*.75,e,n,{bend:1.2}),d=[];for(const g of[-1,1,-1,1]){const v=Ri(a,h.end,-Math.PI/2+g*ye(n,.7,1.15)*(.7+.3*i),s*ye(n,.3,.42)*(.7+.3*i),l*.55,l*.25,e,n,{group:12});d.push(v.end,ci(h.end,v.end,.55))}Ea(a,o,c,l,e,n,t),Aa(a,e);const u=Math.round(ye(n,2,3)),p=Math.min(...d.map(g=>g[1]));for(let g=0;g<u;g++){const v=p-6*t+g*9*t,x=(95-g*12)*t*(.65+.35*i);for(let m=0;m<5;m++)Vi(a,[o+(m-2)*x*.36+ye(n,-5,5)*t,v+ye(n,-3,3)*t],x*ye(n,.2,.26),7*t,e,n,{mat:g===u-1?f.LEAF:f.LEAF3})}return Ar(a,o,h.end[1]+4*t)}function Rl(n,e,t){const i=e.leafHue+(n()-.5)*e.leafVariety*.7+(t===Tl?.06:0);return{[f.TRUNK]:ge(e.trunkHue,.45*e.sat,.34),[f.BARKD]:ge(e.trunkHue+.03,.5*e.sat,.17),[f.BARKL]:ge(e.trunkHue-.01,.38*e.sat,.5),[f.BARK2]:[222,220,212],[f.LEAF]:ge(i,.62*e.sat,.58),[f.LEAF2]:ge(i-.05,.55*e.sat,.8),[f.LEAF3]:ge(i+.03,.66*e.sat,.38),[f.WEB]:[225,225,232]}}function df(n){const{sp:e,crownY:t}=n,i=new pn(e.w,e.h),r=new pn(e.w,e.h);for(let s=0;s<e.h;s++)for(let a=0;a<e.w;a++){const o=s*e.w+a,c=e.m[o];if(!c)continue;(uf.has(c)&&s>=t?r:i).put(a,s,c,e.n[o*3],e.n[o*3+1],e.n[o*3+2])}return{top:i,bot:r}}function ff(n,e){const t=e.bushSize,i=Rh(n,["round","round","fern","grass","shrub"]),r=Math.round(40*t),s=Math.round(28*t),a=new pn(r,s);if(i==="round"||i==="shrub"){const c=i==="shrub"?5:3;for(let l=0;l<c;l++)Vi(a,[r/2+ye(n,-9,9)*t,s-8*t+ye(n,-4,2)*t],ye(n,7,10)*t,ye(n,5,8)*t,e,n);if(i==="shrub"||n()<e.flowers)for(let l=0;l<18*e.flowers+3;l++){const h=r/2+ye(n,-12,12)*t,d=s-ye(n,5,17)*t;a.get(h,d)&&a.recolour(h,d,f.FLOWER)}}else if(i==="fern")for(let c=0;c<7;c++){const l=-Math.PI/2+(c/6-.5)*2.4;let h=r/2,d=s-1;for(let u=0;u<15*t;u++)h+=Math.cos(l)*.9,d+=Math.sin(l)*.9+u*.06,a.put(h,d,c%2?f.LEAF3:f.LEAF,Math.cos(l)*.4,-.2,.9),u%2&&(a.put(h,d-1,f.LEAF2,0,-.5,.85),a.put(h+Math.sign(Math.cos(l)),d+1,f.LEAF,0,.3,.9))}else for(let c=0;c<18*t;c++){const l=r/2+ye(n,-13,13)*t,h=ye(n,5,15)*t,d=ye(n,-3,3);for(let u=0;u<h;u++)a.put(l+d*u/h*(u/h),s-1-u,u>h*.65?f.LEAF2:u<h*.3?f.LEAF3:f.LEAF,d*.1,-.3,.9)}const o=Rl(n,e,null);return o[f.FLOWER]=ge(n(),.55,.95),{sp:a,colours:o}}const lt=(n,e={})=>["tree",{type:n,...e}],Oe=(n,e={})=>[n,e],ls=[{id:"moor",name:"Moor",creature:"badger",by:"Ed",leaf:.24,floor:["moss",.26,.45,.42],text:{floor:"moss",wall:"puddles, a lake",small:"long grass",big:"moss mounds"},wall:[Oe("water",{w:1.6})],small:[Oe("grass",{h:1.4})],big:[Oe("mound",{moss:!0})]},{id:"fern-forest",name:"Fern forest",creature:"boar",by:"Ed",leaf:.3,floor:["needles",.08,.45,.32],text:{floor:"pine needles",small:"ferns",big:"pine trees"},small:[Oe("fern")],big:[lt("fir")]},{id:"muddy-forest",name:"Muddy forest",creature:"snail",by:"Ed",leaf:.22,floor:["mud",.07,.5,.28],text:{floor:"mud and leaves",small:"short trunks with broken branches",big:"trees with many trunks and branches"},small:[Oe("stump",{snag:!0})],big:[lt("broad",{trunks:3,gnarl:.9})]},{id:"stone-shrine",name:"Stone shrine",creature:"fox",by:"Ed",leaf:.28,floor:["stony",.25,.3,.45],text:{floor:"grassy, stony",wall:"mossy henges",small:"little stones",big:"big stones",set:"a shrine"},wall:[Oe("henge")],small:[Oe("stones")],big:[Oe("boulder")],set:Oe("shrine")},{id:"tangly-forest",name:"Tangly forest",creature:"ram",by:"Ed",leaf:.27,floor:["nettles",.28,.5,.3],text:{floor:"nettles and earth",small:"tangled branches",big:"fairly short tangly trees"},small:[Oe("bramble",{bare:!0})],big:[lt("broad",{scale:.7,gnarl:1})]},{id:"wispy-forest",name:"Wispy forest",creature:"woodlouse",by:"Ed",leaf:.2,floor:["leaves",.09,.55,.45],text:{floor:"dry leaves",small:"tall thin wispy trees",big:"thick trees with several trunks"},small:[lt("birch",{scale:.75})],big:[lt("broad",{trunks:3,thick:1.4})]},{id:"hazel-forest",name:"Hazel forest",creature:"hedgehog",by:"Ed",leaf:.26,floor:["grass",.24,.45,.45],text:{floor:"short grass",small:"brown lumps",big:"crooked trees with many branches"},small:[Oe("mound",{brown:!0})],big:[lt("broad",{gnarl:1,scale:.85})]},{id:"garden",name:"Garden",creature:"squirrel",by:"Ed",leaf:.3,floor:["lawn",.27,.5,.5],text:{floor:"uniform grass",wall:"ornate stone wall",small:"manicured flower beds",big:"willows",set:"a stone pavilion"},wall:[Oe("wall")],small:[Oe("flowerbed")],big:[lt("willow")],set:Oe("pavilion")},{id:"twiggy-forest",name:"Twiggy forest",creature:"wolf",by:"Ed",leaf:.29,floor:["plants",.3,.5,.38],text:{floor:"small leafy plants",small:"small trees with many thin trunks",big:"straight but slanted trees with many trunks"},small:[lt("broad",{trunks:4,scale:.5,thin:!0})],big:[lt("broad",{trunks:3,lean:.3,gnarl:.1})]},{id:"ancient",name:"Ancient",creature:"stag",by:"Ed",leaf:.31,floor:["roots",.1,.25,.35],text:{floor:"mossy roots over rocks",small:"sorrel",big:"giant gnarly slanted trees"},small:[Oe("flowers",{hue:.98,leafy:!0})],big:[lt("broad",{scale:1.4,gnarl:1,lean:.35})]},{id:"norway",name:"Norway",creature:"stoat",by:"Ed",leaf:.36,floor:["slate",.6,.15,.35],text:{floor:"pine needles and slate",small:"rocks",big:"straight pines"},small:[Oe("stones",{big:!0})],big:[lt("fir",{scale:1.2})]},{id:"alder-forest",name:"Alder forest",creature:"snake",by:"Ed",leaf:.23,floor:["tallgrass",.22,.45,.42],text:{floor:"tall and short grass",small:"tree stumps with tall grass around",big:"tall slanted trees with thin leaves at different heights"},small:[Oe("stump",{grass:!0})],big:[lt("birch",{lean:.3,scale:1.2,dark:!0})]},{id:"meadow",name:"Meadow",creature:"hare",by:"draft",leaf:.25,floor:["flowers",.25,.5,.5],text:{floor:"grass and wildflowers",small:"scattered hawthorn",big:"lone oaks"},small:[Oe("shrub",{flower:[250,245,235]})],big:[lt("broad",{scale:1.1})]},{id:"old-oaks",name:"Old oaks",creature:"owl",by:"draft",leaf:.22,floor:["leaves",.07,.5,.35],text:{floor:"leaf litter",small:"acorns, fallen branches",big:"ancient gnarled oaks with hollow trunks",set:"a great hollow oak"},small:[Oe("cones",{acorn:!0}),Oe("log",{branch:!0})],big:[lt("broad",{gnarl:.9,hollow:!0})],set:lt("broad",{scale:1.6,gnarl:1,hollow:!0})},{id:"berry-thicket",name:"Berry thicket",creature:"bear",by:"draft",leaf:.32,floor:["needles",.08,.45,.3],text:{floor:"pine needles",wall:"bramble thickets",small:"berry bushes",big:"tall pines"},wall:[Oe("bramble")],small:[Oe("shrub",{flower:[200,30,60]})],big:[lt("fir",{scale:1.3})]},{id:"wetland",name:"Wetland",creature:"toad",by:"draft",leaf:.2,floor:["mud",.15,.45,.3],text:{floor:"wet mud",wall:"puddles, reeds",small:"reeds and rushes",big:"willows"},wall:[Oe("water"),Oe("reeds",{tall:!0})],small:[Oe("reeds")],big:[lt("willow")]},{id:"stream",name:"Stream",creature:"otter",by:"draft",leaf:.27,floor:["pebbles",.25,.3,.45],text:{floor:"pebbles and grass",wall:"a stream or pond",small:"alder saplings",big:"alders",set:"a fallen-log bridge"},wall:[Oe("water",{w:2})],small:[lt("broad",{scale:.45})],big:[lt("broad",{scale:.95,gnarl:.3})],set:Oe("bridge")},{id:"rocky-slope",name:"Rocky slope",creature:"lynx",by:"draft",leaf:.34,floor:["scree",.2,.2,.42],text:{floor:"scree and moss",wall:"boulders",small:"rocks",big:"pines",set:"a rocky outcrop"},wall:[Oe("boulder",{big:!0})],small:[Oe("stones",{big:!0})],big:[lt("fir")],set:Oe("outcrop")},{id:"bog",name:"Bog",creature:"elk",by:"draft",leaf:.38,floor:["moss",.18,.55,.4],text:{floor:"sphagnum moss",wall:"bog pools",small:"cotton grass",big:"spruce"},wall:[Oe("water",{bog:!0})],small:[Oe("reeds",{cotton:!0})],big:[lt("fir",{dark:!0})]},{id:"deadwood",name:"Deadwood",creature:"raven",by:"draft",leaf:.15,floor:["earth",.07,.35,.3],text:{floor:"bare earth",small:"broken branches",big:"blasted dead trees"},small:[Oe("log",{branch:!0})],big:[lt("broad",{bare:!0,gnarl:1})]},{id:"cave-mouth",name:"Cave mouth",creature:"bat",by:"draft",leaf:.2,floor:["stone",.08,.15,.35],text:{floor:"stone and roots",wall:"rock walls",small:"stalagmite stubs",big:"dead trees",set:"a cave mouth"},wall:[Oe("rockwall")],small:[Oe("stalagmite")],big:[lt("broad",{bare:!0})],set:Oe("cave")},{id:"grassland",name:"Grassland",creature:"mole",by:"draft",leaf:.25,floor:["grass",.26,.5,.48],text:{floor:"short turf",small:"molehills",big:"lone birches"},small:[Oe("mound",{brown:!0,small:!0})],big:[lt("birch")]},{id:"beaver-pond",name:"Beaver pond",creature:"beaver",by:"draft",leaf:.17,floor:["leaves",.13,.6,.5],text:{floor:"birch leaves",wall:"a pond",small:"stumps",big:"birch and aspen",set:"a beaver dam"},wall:[Oe("water",{w:2})],small:[Oe("stump",{gnawed:!0})],big:[lt("birch")],set:Oe("dam")},{id:"log-pile",name:"Log pile",creature:"beetle",by:"draft",leaf:.22,floor:["leaves",.06,.5,.3],text:{floor:"rotting leaves",small:"fungi",big:"rotting logs",set:"a fallen giant"},small:[Oe("fungi")],big:[Oe("log",{rot:!0})],set:Oe("log",{rot:!0,giant:!0})},{id:"heath",name:"Heath",creature:"moth",by:"draft",leaf:.27,floor:["heather",.85,.35,.4],text:{floor:"heather",small:"gorse",big:"wind-bent birches"},small:[Oe("shrub",{flower:[250,205,40],spiky:!0})],big:[lt("birch",{lean:.45,scale:.75})]},{id:"old-pinewood",name:"Old pinewood",creature:"marten",by:"draft",leaf:.35,floor:["needles",.07,.4,.3],text:{floor:"pine needles",small:"pine cones",big:"tall old pines with knotholes"},small:[Oe("cones")],big:[lt("fir",{scale:1.35})]},{id:"ravine",name:"Ravine",creature:"salamander",by:"draft",leaf:.3,floor:["stone",.3,.3,.32],text:{floor:"wet moss and rock",wall:"rock walls",small:"ferns",big:"mossy boulders",set:"a waterfall"},wall:[Oe("rockwall",{moss:!0})],small:[Oe("fern")],big:[Oe("boulder",{moss:!0,big:!0})],set:Oe("waterfall")},{id:"bluebell-glade",name:"Bluebell glade",creature:"glowworm",by:"draft",leaf:.26,floor:["bluebells",.27,.45,.4],text:{floor:"bluebells",small:"ferns",big:"beeches"},small:[Oe("fern")],big:[lt("broad",{gnarl:.2,scale:1.1})]},{id:"holly-thicket",name:"Holly thicket",creature:"spider",by:"draft",leaf:.36,floor:["leaves",.08,.35,.28],text:{floor:"dead leaves",wall:"holly hedges",small:"cobwebs",big:"hollies",set:"a web-hung dead tree"},wall:[Oe("hedge",{berries:!0})],small:[Oe("web")],big:[lt("broad",{scale:.7,dark:!0})],set:lt("broad",{bare:!0,webs:!0})},{id:"honeysuckle-tangle",name:"Honeysuckle tangle",creature:"dormouse",by:"draft",leaf:.25,floor:["clover",.27,.45,.45],text:{floor:"grass and clover",wall:"bramble",small:"honeysuckle",big:"hazel coppice"},wall:[Oe("bramble")],small:[Oe("shrub",{flower:[250,230,170]})],big:[lt("broad",{trunks:5,scale:.7,thin:!0})]}];for(const[n,[e,t]]of Object.entries(Fh)){const i=ls.find(r=>r.id===n);i&&!i.set&&(i.set=Oe(e,{three:!0}),i.text={...i.text,set:t})}const pf=Object.fromEntries(ls.map(n=>[n.id,n])),mf=["ruins","rocks","freak","lake","modern"],gt=(n,e,t,i,r,s,a,o,c,l,h={})=>({pattern:n,...h,density:e,clump:t,glades:{count:i[0],size:i[1]||[0,0]},heightMix:r&&{sapling:r[0],mature:r[1],tall:r[2],giant:r[3]},undergrowth:s,lean:{dir:a[0],amount:a[1]},terrain:o,decor:{rate:c[0],...Object.fromEntries(mf.map((d,u)=>[d,c[1][u]]))},feel:l}),Pt=[0,0],gf={moor:gt("scatter",.2,.6,[2,[14,24]],null,.7,[30,.2],["pools","mounds","hollows"],[.5,[.3,.4,0,.3,0]],"Open rolling moss, low mounds and dark pools, long grass combed one way by the wind; you can see a long way."),"fern-forest":gt("groves",.65,.6,[2,[8,12]],[.2,.5,.25,.05],.9,Pt,["hollows","paths"],[.25,[.4,.3,.3,0,0]],"Pine groves standing waist-deep in ferns, with green sunken hollows between them."),"muddy-forest":gt("scatter",.7,.3,[1,[6,9]],[.25,.55,.17,.03],.4,Pt,["pools","paths"],[.3,[.3,.1,.2,.1,.3]],"Squelching mud between many-trunked trees, puddled ruts winding through, broken stumps everywhere."),"stone-shrine":gt("rings",.35,.8,[1,[10,14]],null,.3,Pt,["rocky","mounds"],[.5,[.6,.4,0,0,0]],"Big stones stand in rings round the shrine on stony grass; it feels deliberate and old."),"tangly-forest":gt("thicket",.9,.2,[1,[5,8]],[.35,.55,.1,0],.9,Pt,["hollows"],[.2,[.2,0,.6,0,.2]],"Short tangled trees packed close over nettles, low and claustrophobic, with one small clearing."),"wispy-forest":gt("stands",.55,.7,[2,[6,10]],[.15,.45,.3,.1],.5,Pt,["ridges"],[.3,[.4,.2,.3,0,.1]],"Stands of thick many-trunked trees, thin wispy saplings drifting between them over dry leaves."),"hazel-forest":gt("rings",.6,.6,[2,[6,9]],[.3,.55,.12,.03],.5,Pt,["mounds","paths"],[.3,[.4,.3,.3,0,0]],"Crooked hazels grown in loose fairy rings on short grass, lumpy little mounds in the middle of each."),garden:gt("rows",.45,0,[3,[6,10]],[.1,.7,.2,0],.6,Pt,["paths","pools"],[.4,[.7,0,0,.2,.1]],"A lost formal garden: willows in avenues along straight paths, lawns and flower beds, a pavilion at the heart.",{along:"paths"}),"twiggy-forest":gt("scatter",.75,.3,[1,[6,10]],[.25,.5,.2,.05],.6,[60,.5],["paths"],[.25,[.3,.2,.3,0,.2]],"Straight many-trunked trees all slanting the same way, like a wood frozen in a gale."),ancient:gt("lone",.4,.2,[1,[12,18]],[.05,.35,.4,.2],.4,[150,.25],["rocky","mounds","hollows"],[.45,[.5,.2,.3,0,0]],"Giant gnarled trees far apart, roots heaving over mossy rocks; every tree is a landmark."),norway:gt("stands",.8,.5,[1,[8,12]],[.15,.45,.35,.05],.2,Pt,["rocky","ridges"],[.3,[.2,.6,0,.2,0]],"Dense stands of straight pines on slate ridges, bare rock between; dark, vertical and cold."),"alder-forest":gt("scatter",.55,.4,[2,[6,10]],[.2,.4,.35,.05],.6,[120,.35],["stream","hollows"],[.3,[.3,.1,.2,.3,.1]],"Tall slanted alders at every height over long grass and stumps, a little stream wandering through."),meadow:gt("lone",.12,.1,[0],[.2,.5,.25,.05],.3,Pt,["mounds","paths"],[.35,[.3,.3,0,.2,.2]],"Wide-open wildflower grass with a lone oak here and there and scattered hawthorn; the sky does the work."),"old-oaks":gt("groves",.5,.5,[2,[10,16]],[.1,.35,.4,.15],.5,Pt,["mounds","hollows"],[.4,[.5,.1,.4,0,0]],"Groves of huge hollow oaks with broad clearings of leaf litter between; slow and grand."),"berry-thicket":gt("thicket",.85,.5,[2,[4,7]],[.2,.4,.35,.05],1,Pt,["paths"],[.15,[.3,0,.4,0,.3]],"Tall pines over solid berry bushes and brambles, only narrow animal paths and a couple of pockets of space."),wetland:gt("edgeOnly",.5,.5,[1,[16,24]],[.25,.55,.15,.05],.8,Pt,["pools","stream"],[.35,[.2,0,0,.6,.2]],"Open reedy water and mud in the middle, willows crowding the rim; wet and echoing."),stream:gt("rows",.5,.2,[1,[6,10]],[.3,.45,.2,.05],.5,Pt,["stream","pools"],[.3,[.3,.3,0,.3,.1]],"Alders lining both banks of a pebbly stream, saplings at the water's edge, open grass away from it.",{along:"stream"}),"rocky-slope":gt("scatter",.35,.6,[1,[8,12]],[.3,.5,.18,.02],.2,[90,.15],["rocky","ridges"],[.5,[.3,.7,0,0,0]],"Scree and boulders with pines clinging in clumps, everything leaning slightly uphill."),bog:gt("stands",.25,.85,[3,[10,20]],[.4,.5,.1,0],.6,Pt,["pools","mounds"],[.35,[.2,0,0,.5,.3]],"Sphagnum and bog pools, stunted spruce in tight dark stands, cotton grass pale between them."),deadwood:gt("scatter",.25,.2,[2,[8,14]],[.05,.3,.45,.2],.15,Pt,["ridges","hollows"],[.45,[.3,.1,.3,0,.3]],"Sparse tall blasted snags on bare ridges; bleak, quiet, with long sightlines."),"cave-mouth":gt("edgeOnly",.4,.5,[1,[10,14]],[.2,.5,.3,0],.2,Pt,["rocky","ridges"],[.4,[.3,.6,0,0,.1]],"Rock walls and dead trees ring an open stone floor that leads to the cave's dark mouth."),grassland:gt("lone",.1,.5,[0],[.3,.5,.2,0],.2,Pt,["mounds"],[.35,[.3,.2,0,.1,.4]],"Short turf to the horizon, molehills, birches alone or in twos and threes."),"beaver-pond":gt("edgeOnly",.55,.4,[1,[14,20]],[.4,.45,.15,0],.4,Pt,["pools","stream"],[.4,[.1,0,0,.7,.2]],"A pond in the middle, young birch and aspen round it, gnawed stumps where the big ones were felled."),"log-pile":gt("groves",.5,.7,[2,[6,10]],null,.7,Pt,["hollows","mounds"],[.3,[.3,0,.4,0,.3]],"Rotting logs heaped in piles, fungi everywhere, damp hollows between the heaps."),heath:gt("scatter",.2,.3,[1,[12,18]],[.5,.45,.05,0],.8,[30,.6],["ridges","paths"],[.4,[.4,.4,0,0,.2]],"Purple heather and gorse, small birches bent hard by the wind, all the same way."),"old-pinewood":gt("scatter",.5,.3,[2,[8,14]],[.1,.35,.4,.15],.15,Pt,["mounds","paths"],[.35,[.4,.3,.3,0,0]],"Cathedral-tall old pines on a clear floor of needles; you can see between the trunks a long way."),ravine:gt("edgeOnly",.55,.6,[1,[6,9]],null,.8,Pt,["stream","ridges","rocky"],[.4,[.3,.5,0,.2,0]],"A deep wet cleft: rock walls and mossy boulders either side, ferns, a stream down the middle."),"bluebell-glade":gt("groves",.45,.5,[3,[8,14]],[.1,.5,.35,.05],.3,Pt,["hollows"],[.35,[.4,0,.3,.3,0]],"Beech groves round open glades carpeted in bluebells; soft, bright and airy."),"holly-thicket":gt("thicket",.9,.3,[1,[6,9]],[.3,.6,.1,0],.7,Pt,["hollows"],[.25,[.3,0,.5,0,.2]],"Dark hollies packed close, cobwebs strung between, one clearing round the web-hung tree."),"honeysuckle-tangle":gt("stands",.6,.7,[2,[5,8]],[.45,.5,.05,0],.8,Pt,["paths","mounds"],[.3,[.3,0,.3,0,.4]],"Hazel coppice stools in clumps, honeysuckle and bramble between, clover paths winding through.")};for(const n of ls)n.layout=gf[n.id];function xf(n,e,t=64,i=48){const[r,s,a,o]=n.floor,c=new pn(t,i),l=n.id.length*131;for(let v=0;v<i;v++)for(let x=0;x<t;x++){const m=(yi(x/7,v/5,l)*(t-x)*(i-v)+yi((x-t)/7,v/5,l)*x*(i-v)+yi(x/7,(v-i)/5,l)*(t-x)*v+yi((x-t)/7,(v-i)/5,l)*x*v)/(t*i),_=m<.38?f.BODY2:m>.64?f.BELLY:f.BODY;c.px(x,v,_,0,-.42,.91)}const h=Ma(l),d=(v,x,m)=>c.px((v%t+t)%t,(x%i+i)%i,m,0,-.42,.91),u={moss:0,needles:70,mud:25,stony:30,nettles:60,leaves:80,grass:70,lawn:30,plants:60,roots:30,slate:40,tallgrass:90,flowers:70,pebbles:60,scree:70,earth:15,stone:40,heather:90,bluebells:90,clover:60}[r]??40;for(let v=0;v<u;v++){const x=Math.floor(h()*t),m=Math.floor(h()*i);if(r==="needles"){const _=h()<.5?1:-1;for(let M=0;M<3;M++)d(x+M*_,m+(M>>1),h()<.5?f.BODY2:f.ACCENT)}else if(["grass","lawn","tallgrass","plants","nettles","clover","flowers","bluebells","heather"].includes(r)){const _=r==="tallgrass"?4:r==="lawn"?1:2;for(let M=0;M<_;M++)d(x,m-M,M===_-1?f.LEAF2:f.LEAF);(r==="flowers"||r==="bluebells"||r==="heather"||r==="clover")&&h()<.5&&d(x+1,m-_,f.FLOWER)}else if(["stony","pebbles","scree","slate","stone","roots"].includes(r)){if(d(x,m,f.ACCENT),h()<.6&&d(x+1,m,f.ACCENT),h()<.4&&d(x,m+1,f.BODY2),r==="roots"&&h()<.5)for(let _=0;_<5;_++)d(x+_,m+(_>2?1:0),f.TRUNK)}else if(r==="leaves")d(x,m,f.FLOWER),d(x+1,m,f.FLOWER),h()<.5&&d(x,m+1,f.ACCENT);else if(r==="mud"||r==="earth")for(let _=0;_<3;_++)d(x+_,m,f.BODY2)}const p={flowers:ge(.13,.6,.95),bluebells:[90,110,230],heather:[180,90,170],clover:[240,235,240],leaves:ge(s+.02,.65,.6)}[r]||ge(s,.3,.6),g={[f.BODY]:ge(s,a*e.sat,o),[f.BODY2]:ge(s+.02,a*e.sat*1.1,o*.78),[f.BELLY]:ge(s-.02,a*e.sat*.9,Math.min(1,o*1.15)),[f.ACCENT]:r==="needles"?ge(.07,.5,.5):ge(.1,.08,.62),[f.FLOWER]:p,[f.LEAF]:ge(n.leaf,.55*e.sat,.45),[f.LEAF2]:ge(n.leaf-.03,.5*e.sat,.62),[f.TRUNK]:ge(e.trunkHue,.4,.3)};return{sp:c,colours:g}}const Oi=n=>({[f.ACCENT]:ge(.1,.06,.6),[f.BODY2]:ge(.62,.08,.4),[f.BELLY]:ge(.1,.05,.78),[f.LEAF]:ge(.27,.5,.45),[f.LEAF2]:ge(.25,.45,.62),[f.NOSE]:[20,16,24]});function Mr(n,e,t,i,r,s,a){const o=[];for(let c=0;c<8;c++){const l=c/8*Math.PI*2,h=1+(s()-.5)*.3;o.push([e[0]+Math.cos(l)*t*h,e[1]+Math.sin(l)*i*h*(Math.sin(l)>0?.5:1)])}n.shape(o,f.ACCENT,{group:5,line:!0,round:r.round}),n.mark([Tt(e,[-t,i*.1]),Tt(e,[t,i*.1]),Tt(e,[t,i]),Tt(e,[-t,i])],f.BODY2,[f.ACCENT]),n.mark([Tt(e,[-t*.6,-i*.8]),Tt(e,[t*.1,-i*1.1]),Tt(e,[t*.3,-i*.5]),Tt(e,[-t*.3,-i*.3])],f.BELLY,[f.ACCENT]),a&&n.mark(Sa([Tt(e,[-t*1.1,-i*.55]),Tt(e,[0,-i*1.3]),Tt(e,[t*1.1,-i*.5]),Tt(e,[t*.6,-i*.2]),Tt(e,[-t*.6,-i*.2])],0,3,3,i*.15,1),f.LEAF,[f.ACCENT,f.BELLY,f.BODY2])}function Zs(n,e,t,i,r,s){const a={[f.LEAF]:ge(t.leaf,.6*i.sat,.55),[f.LEAF2]:ge(t.leaf-.05,.55*i.sat,.78),[f.LEAF3]:ge(t.leaf+.03,.66*i.sat,.36)},o={[f.TRUNK]:ge(i.trunkHue,.45*i.sat,.34),[f.BARKD]:ge(i.trunkHue+.03,.5*i.sat,.17),[f.BARKL]:ge(i.trunkHue-.01,.38*i.sat,.5),[f.BELLY]:ge(i.trunkHue+.02,.3,.7)},c={[f.MAGIC]:[60,110,150],[f.MAGIC2]:[150,200,220],[f.BODY2]:[35,70,100]};if(n==="tree"){const v={broad:Gh,fir:Tl,willow:Hh,birch:Wh,flat:Vh}[e.type],x={...i,leafHue:t.leaf+(e.dark?.05:0),gnarl:e.gnarl??i.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},m=v(r,x,i.treeSize*s*(e.scale||1)*ye(r,.9,1.1)),_=Rl(r,x,v);return e.dark&&(_[f.LEAF]=_[f.LEAF3],_[f.LEAF3]=ge(t.leaf+.05,.7,.22)),_[f.NOSE]=[20,16,24],_[f.WEB]=[225,225,232],{sp:m.sp,colours:_}}if(n==="shrub"){const v=ff(r,{...i,leafHue:t.leaf,bushSize:i.bushSize*s,flowers:1});for(let x=0;x<v.sp.m.length;x++)v.sp.m[x]&&Lt(x,1,3)<(e.spiky?.18:.1)&&v.sp.m[x]!==f.TRUNK&&(v.sp.m[x]=f.FLOWER);return v.colours[f.FLOWER]=e.flower,v}const l=Math.round(48*s*(e.w||1)),h=Math.round(32*s),d=new pn(l,h),u=l/2,p=h;let g={};if(n==="grass"||n==="reeds"||n==="fern"||n==="flowers"||n==="flowerbed"){const v=n==="flowerbed"?40:24,x=(n==="reeds"?e.tall?26:20:n==="fern"?14:10*(e.h||1))*s;n==="flowerbed"&&d.shape([[u-20*s,p-2],[u-18*s,p-6*s],[u+18*s,p-6*s],[u+20*s,p-2],[u+20*s,p],[u-20*s,p]],f.ACCENT,{group:2,line:!0});for(let m=0;m<v;m++){const _=u+ye(r,-16,16)*s,M=x*ye(r,.5,1),S=n==="fern"?ye(r,-6,6)*s:ye(r,-2,2)*s,w=p-1-(n==="flowerbed"?5*s:0);for(let E=0;E<M;E++){const L=E/M;d.px(_+S*L*L,w-E,L>.7?f.LEAF2:L<.3?f.LEAF3:f.LEAF,S*.05,-.3,.9),n==="fern"&&E%2&&d.px(_+S*L*L+(S>0?1:-1),w-E+1,f.LEAF2,0,-.3,.9)}if(n==="reeds"&&(e.cotton||r()<.5))for(let E=0;E<(e.cotton?2:3);E++)d.px(_+S,w-M-E,e.cotton?f.WEB:f.TRUNK,0,-.5,.85);(n==="flowers"||n==="flowerbed")&&r()<.7&&(d.px(_+S,w-M,f.FLOWER,0,-.5,.85),d.px(_+S+1,w-M,f.FLOWER,0,-.5,.85))}if(g={...a,[f.FLOWER]:n==="flowerbed"?Rh(r,[[230,80,120],[250,210,60],[150,110,230]]):ge(e.hue??.95,.6,.85),[f.TRUNK]:ge(.07,.5,.35),[f.WEB]:[240,240,235],[f.ACCENT]:ge(.08,.1,.55)},n==="flowerbed"){for(let m=0;m<d.m.length;m++)d.m[m]===f.FLOWER&&Lt(m,2,7)<.5&&(d.m[m]=f.BELLY);g[f.BELLY]=[250,245,240]}}else if(n==="stones"){for(let v=0;v<(e.big?3:6);v++)Mr(d,[u+ye(r,-14,14)*s,p-(e.big?5:2.5)*s],(e.big?6:3)*s*ye(r,.7,1.2),(e.big?5:2.5)*s,i,r);g=Oi()}else if(n==="boulder")Mr(d,[u,p-(e.big?11:8)*s],(e.big?18:13)*s,(e.big?12:9)*s,i,r,e.moss),g={...Oi(),...a,[f.ACCENT]:ge(.1,.06,.6)};else if(n==="henge")d.shape([[u-7*s,p],[u-8*s,p-18*s],[u-4*s,p-28*s],[u+5*s,p-27*s],[u+8*s,p-14*s],[u+7*s,p]],f.ACCENT,{group:5,line:!0,round:i.round}),d.mark([[u-9*s,p-30*s],[u+9*s,p-30*s],[u+9*s,p-22*s],[u-9*s,p-18*s]],f.LEAF,[f.ACCENT]),g={...Oi(),...a};else if(n==="mound"){const v=(e.small?8:14)*s,x=(e.small?5:8)*s;d.shape(Sa([[u-v,p],[u-v*.6,p-x*.8],[u,p-x],[u+v*.6,p-x*.8],[u+v,p]],0,4,e.moss?3:1,(e.moss?1.5:.8)*s,1),e.moss?f.LEAF:f.TRUNK,{group:5,round:i.round}),d.mark([[u-v,p-x*.45],[u+v,p-x*.45],[u+v,p],[u-v,p]],e.moss?f.LEAF3:f.BARKD,[e.moss?f.LEAF:f.TRUNK]),g={...a,...o,[f.TRUNK]:ge(.07,.45,e.brown?.35:.3)}}else if(n==="stump"){const v=6*s;if(d.limb([[u,p,v*2.2],[u,p-8*s,v*1.6]],f.TRUNK,{group:5,round:i.round,cap:0,capEnd:0}),d.shape([[u-v*.8,p-8*s],[u,p-10*s-(e.gnawed?4*s:0)],[u+v*.8,p-8*s],[u,p-7*s]],f.BELLY,{group:6,round:i.round}),e.snag&&d.limb([[u+v*.4,p-8*s,2.5*s],[u+v*1.6,p-15*s,1.5*s]],f.TRUNK,{group:7,round:i.round}),e.grass)for(let x=0;x<20;x++){const m=u+ye(r,-14,14)*s,_=ye(r,6,13)*s;for(let M=0;M<_;M++)d.px(m,p-1-M,M>_*.6?f.LEAF2:f.LEAF,0,-.3,.9)}g={...a,...o}}else if(n==="log"){const v=(e.giant?46:e.branch?18:30)*s,x=(e.giant?14:e.branch?3:8)*s;if(d.limb([[u-v/2,p-x/2,x],[u+v/2,p-x/2-(e.branch?2*s:0),x*.9]],f.TRUNK,{group:5,round:i.round,cap:.3,capEnd:.3}),e.branch||d.shape([[u+v/2-x*.1,p-x],[u+v/2+x*.2,p-x/2],[u+v/2-x*.1,p],[u+v/2-x*.3,p-x/2]],f.BELLY,{group:6,round:i.round}),e.rot)for(let m=0;m<(e.giant?6:3);m++){const _=u+ye(r,-v/2,v/3);d.shape([[_-3*s,p-x*.9],[_,p-x-3*s],[_+3*s,p-x*.9]],f.FLOWER,{group:7,line:!0,round:i.round})}e.branch&&d.limb([[u,p-x,x*.7],[u+5*s,p-x-6*s,x*.4]],f.TRUNK,{group:6,round:i.round}),g={...o,[f.FLOWER]:[230,190,120]}}else if(n==="fungi"){for(let v=0;v<5;v++){const x=u+ye(r,-12,12)*s,m=ye(r,3,7)*s,_=ye(r,3,5)*s;d.limb([[x,p,1.6*s],[x,p-m,1.4*s]],f.BELLY,{group:5}),d.shape([[x-_,p-m],[x,p-m-_*.8],[x+_,p-m]],v%2?f.FLOWER:f.MAGIC,{group:6+v%2,line:!0,round:i.round})}g={[f.BELLY]:[225,215,195],[f.FLOWER]:[190,80,50],[f.MAGIC]:[120,230,200]}}else if(n==="cones"){for(let v=0;v<6;v++){const x=u+ye(r,-14,14)*s,m=p-2*s;d.ellipse(x,m,(e.acorn?1.6:2)*s,(e.acorn?2:2.8)*s,f.TRUNK,{round:i.round}),e.acorn?d.ellipse(x,m-1.6*s,1.8*s,1*s,f.BARKD,{round:i.round}):d.px(x,m-1,f.BARKL)}g=o}else if(n==="water"){const v=22*s*(e.w||1),x=6*s;d.shape([[u-v,p-x],[u-v*.3,p-x*1.5],[u+v*.6,p-x*1.2],[u+v,p-x*.5],[u+v*.4,p],[u-v*.7,p-x*.2]],f.MAGIC,{group:5,round:.2});for(let m=0;m<6;m++){const _=u+ye(r,-v*.6,v*.6),M=p-x*ye(r,.4,1.1);for(let S=0;S<3*s;S++)d.recolour(_+S,M,f.MAGIC2)}g=e.bog?{[f.MAGIC]:[60,70,50],[f.MAGIC2]:[120,130,90]}:c;for(let m=0;m<d.m.length;m++)d.m[m]===f.MAGIC?d.m[m]=f.BODY:d.m[m]===f.MAGIC2&&(d.m[m]=f.BELLY);g={[f.BODY]:g[f.MAGIC],[f.BELLY]:g[f.MAGIC2]}}else if(n==="bramble"||n==="hedge"){const v=22*s,x=(n==="hedge"?18:12)*s;for(let m=0;m<(n==="hedge"?6:4);m++){const _=u+ye(r,-v*.8,v*.8),M=p-x*ye(r,.4,.7);d.ellipse(_,M,ye(r,6,9)*s,x*.45,n==="hedge"?f.LEAF3:f.LEAF,{round:i.round,density:e.bare?.5:.95,noise:.5,seed:m})}for(let m=0;m<8;m++){let M=u+ye(r,-v,v),S=p;for(let w=0;w<x*1.2;w++)M+=Math.sin(w*.3+m)*.8,S-=.8,d.px(M,S,f.TRUNK,0,-.3,.9)}if(n==="hedge"||e.berries||n==="bramble")for(let m=0;m<d.m.length;m++)d.m[m]&&d.m[m]!==f.TRUNK&&Lt(m,5,9)<.05&&(d.m[m]=f.FLOWER);g={...a,...o,[f.FLOWER]:n==="hedge"?[210,30,40]:[70,30,70]}}else if(n==="wall"){const v=22*s,x=12*s;d.shape([[u-v,p],[u-v,p-x],[u+v,p-x],[u+v,p]],f.ACCENT,{group:5,line:!0,depth:2}),d.shape([[u-v-1,p-x],[u-v-1,p-x-2*s],[u+v+1,p-x-2*s],[u+v+1,p-x]],f.BELLY,{group:6,line:!0,depth:2}),d.shape([[u+v-6*s,p-x-2*s],[u+v-6*s,p-x-7*s],[u+v,p-x-7*s],[u+v,p-x-2*s]],f.ACCENT,{group:7,line:!0,depth:2}),d.ellipse(u+v-3*s,p-x-9*s,3*s,2.5*s,f.BELLY,{round:i.round});for(let m=p-x+3*s;m<p;m+=4*s)for(let _=u-v;_<u+v;_++)d.recolour(_,m,f.BODY2);g=Oi()}else if(n==="rockwall"){for(let v=0;v<5;v++)Mr(d,[u+(v-2)*9*s,p-ye(r,8,14)*s],8*s,10*s,i,r,e.moss);g={...Oi(),...a}}else if(n==="stalagmite"){for(let v=0;v<4;v++){const x=u+ye(r,-14,14)*s,m=ye(r,5,11)*s;d.shape([[x-3*s,p],[x-1*s,p-m],[x+1*s,p-m],[x+3*s,p]],f.ACCENT,{group:5,line:!0,round:i.round})}g=Oi()}else if(n==="web"){const v=[u,p-14*s],x=11*s;for(let m=0;m<8;m++){const _=m/8*Math.PI*2;for(let M=0;M<x;M++)d.px(v[0]+Math.cos(_)*M,v[1]+Math.sin(_)*M,f.WEB,0,0,1)}for(let m=3*s;m<x;m+=3*s)for(let _=0;_<Math.PI*2;_+=.05)d.px(v[0]+Math.cos(_)*m,v[1]+Math.sin(_)*m,f.WEB,0,0,1);g={[f.WEB]:[225,230,240]}}return{sp:d,colours:g}}function vf(n,e,t,i,r,s){if(e.three)return bd(n,t,i);if(n==="tree"||n==="log")return Zs(n,e,t,i,r,s);const a=Math.round(90*s),o=Math.round(70*s),c=new pn(a,o),l=a/2,h=o;let d={...Oi(),[f.LEAF]:ge(t.leaf,.55,.5),[f.LEAF2]:ge(t.leaf-.04,.5,.7),[f.TRUNK]:ge(i.trunkHue,.45,.34),[f.BARKD]:ge(i.trunkHue+.03,.5,.17),[f.MAGIC]:ge(i.magicHue,.6,1),[f.MAGIC2]:ge(i.magicHue,.2,1)};if(n==="shrine")c.shape([[l-16*s,h],[l-14*s,h-6*s],[l+14*s,h-6*s],[l+16*s,h]],f.ACCENT,{group:5,line:!0,depth:2}),c.shape([[l-9*s,h-6*s],[l-9*s,h-26*s],[l+9*s,h-26*s],[l+9*s,h-6*s]],f.ACCENT,{group:6,line:!0,depth:2}),c.shape([[l-5*s,h-10*s],[l-5*s,h-20*s],[l,h-23*s],[l+5*s,h-20*s],[l+5*s,h-10*s]],f.NOSE,{group:7}),c.shape([[l-13*s,h-26*s],[l,h-34*s],[l+13*s,h-26*s]],f.BODY2,{group:8,line:!0,depth:2}),c.ellipse(l,h-13*s,2.5*s,2.5*s,f.MAGIC2,{round:.5}),c.mark([[l-14*s,h-36*s],[l+2*s,h-36*s],[l-4*s,h-24*s],[l-14*s,h-24*s]],f.LEAF,[f.BODY2,f.ACCENT]);else if(n==="pavilion"){c.shape([[l-26*s,h],[l-26*s,h-4*s],[l+26*s,h-4*s],[l+26*s,h]],f.ACCENT,{group:5,line:!0,depth:2});for(const u of[-20,-7,7,20])c.limb([[l+u*s,h-4*s,4*s],[l+u*s,h-34*s,4*s]],u===-7||u===7?f.BODY2:f.BELLY,{group:6+(u>0?1:0),line:!0,cap:0,capEnd:0});c.shape([[l-28*s,h-34*s],[l-28*s,h-38*s],[l+28*s,h-38*s],[l+28*s,h-34*s]],f.ACCENT,{group:8,line:!0,depth:2}),c.shape([[l-24*s,h-38*s],[l-16*s,h-54*s],[l,h-60*s],[l+16*s,h-54*s],[l+24*s,h-38*s]],f.BELLY,{group:9,line:!0})}else if(n==="bridge"){const u=Zs("water",{w:1.8},t,i,r,s);for(let p=0;p<u.sp.m.length;p++){const g=p%u.sp.w,v=p/u.sp.w|0,x=Math.round(l-u.sp.w/2+g),m=h-u.sp.h+v;u.sp.m[p]&&c.inb(x,m)&&c.px(x,m,u.sp.m[p]===f.BODY?f.IRIS:f.PUPIL,0,-.42,.91)}c.limb([[l-34*s,h-6*s,9*s],[l+34*s,h-10*s,8*s]],f.TRUNK,{group:6,line:!0,cap:.3,capEnd:.3}),d[f.IRIS]=[60,110,150],d[f.PUPIL]=[150,200,220]}else if(n==="outcrop")for(const[u,p,g,v]of[[-18,14,16,13],[12,12,18,12],[-2,28,15,13],[16,34,9,9]])Mr(c,[l+u*s,h-p*s],g*s,v*s,i,r,!0);else if(n==="cave"){for(const[u,p,g,v]of[[-26,16,16,15],[26,16,16,15],[0,40,30,18],[-12,30,14,12],[12,30,14,12]])Mr(c,[l+u*s,h-p*s],g*s,v*s,i,r,p>30);c.shape([[l-15*s,h],[l-14*s,h-18*s],[l-4*s,h-28*s],[l+6*s,h-27*s],[l+14*s,h-16*s],[l+15*s,h]],f.NOSE,{group:9,line:!0})}else if(n==="dam"){const u=Zs("water",{w:1.9},t,i,r,s);for(let p=0;p<u.sp.m.length;p++){const g=p%u.sp.w,v=p/u.sp.w|0,x=Math.round(l-u.sp.w/2+g),m=h-u.sp.h+v-10*s;u.sp.m[p]&&c.inb(x,m)&&c.px(x,m,u.sp.m[p]===f.BODY?f.IRIS:f.PUPIL,0,-.42,.91)}for(let p=0;p<26;p++){const g=l+ye(r,-32,32)*s,v=h-ye(r,2,14)*s,x=ye(r,-.5,.5),m=ye(r,8,16)*s;c.limb([[g-Math.cos(x)*m/2,v-Math.sin(x)*m/2,2.6*s],[g+Math.cos(x)*m/2,v+Math.sin(x)*m/2,2*s]],p%3?f.TRUNK:f.BARKD,{group:6+p%2,line:!0})}d[f.IRIS]=[60,110,150],d[f.PUPIL]=[150,200,220]}else if(n==="waterfall"){for(const[u,p,g,v]of[[-22,30,18,30],[22,30,18,30],[0,56,20,12]])Mr(c,[l+u*s,h-p*s],g*s,v*s,i,r,!0);for(let u=l-6*s;u<l+6*s;u++)for(let p=h-50*s;p<h-4*s;p++)c.px(u,p,Lt(u|0,p/3|0,4)<.3?f.PUPIL:f.IRIS,0,-.2,.98);c.shape([[l-18*s,h],[l-14*s,h-6*s],[l+14*s,h-6*s],[l+18*s,h]],f.IRIS,{group:10,round:.2}),d[f.IRIS]=[90,150,190],d[f.PUPIL]=[210,235,245]}return{sp:c,colours:d}}function _f(n,e,{K:t=2/(e.pixel||2),makeCanvas:i=_l}={}){const r=pf[n];if(!r)throw new Error(`no area type "${n}"`);const s=Ma(n.split("").reduce((h,d)=>h*31+d.charCodeAt(0),7)>>>0),a=(h,d,u)=>({sp:wi(h.sp,h.colours,e,"none",i),kind:d,text:u}),o=xf(r,e),c=h=>(h||[]).map(([d,u])=>a(Zs(d,u,r,e,s,t),d,"")),l={def:r,floor:{sp:wi(o.sp,o.colours,e,"none",i),kind:r.floor[0],text:r.text.floor},walls:c(r.wall),small:c(r.small),big:c(r.big),setPiece:null};if(l.walls.forEach(h=>h.text=r.text.wall),l.small.forEach(h=>h.text=r.text.small),l.big.forEach(h=>h.text=r.text.big),r.set){const h=vf(r.set[0],r.set[1],r,e,s,t);l.setPiece={...a(h,r.set[0],r.text.set),metres:h.metres}}return l}const Mf={[f.ACCENT]:[150,145,140],[f.BODY2]:[95,92,100],[f.TRUNK]:[110,70,40],[f.BARKD]:[60,38,24],[f.MAGIC]:[255,130,40],[f.MAGIC2]:[255,228,120],[f.NOSE]:[30,24,26]};function Sf(n){const e=new Xe({blend:.02});for(let r=0;r<9;r++){const s=r/9*Math.PI*2;e.ell([Math.cos(s)*.32,.05,Math.sin(s)*.32],[.09,.06,.08],r%3?f.ACCENT:f.BODY2,{dir:[-Math.sin(s),0,Math.cos(s)],group:1+r})}e.seg([-.22,.06,-.12],[.22,.1,.12],.05,.045,f.TRUNK,{group:20,paint:r=>r[0]>.12?f.BARKD:void 0}),e.seg([-.2,.1,.14],[.2,.06,-.14],.05,.045,f.TRUNK,{group:21,paint:r=>r[0]<-.12?f.BARKD:void 0});const t=[[.42,.3,.34],[.36,.4,.28],[.46,.32,.38]][n%3];[[-.05,0,t[0]],[.08,.06,t[1]],[-.02,-.08,t[2]]].forEach(([r,s,a],o)=>e.flat([r,.1+a*.5,s],[1,0,.3],[((n+o)%3-1)*.1,1,0],a*.38,a*.5,Wi.flame(f.MAGIC,f.MAGIC2),{group:30+o,bend:.1}));const i=Sn(e,{height:34}).sp;for(let r=0;r<4;r++){const s=Math.floor(i.w/2+Math.sin(r*2.3+n)*i.w*.25),a=Math.floor(i.h*(.12+r*.08));i.get(s,a)||i.px(s,a,f.MAGIC2)}return i}const Js={cyan:[[70,230,255],[200,250,255]],violet:[[190,100,255],[235,210,255]],green:[[90,255,140],[215,255,220]]};function bf(n,e){const t=new Xe({blend:.04}),i=Object.keys(Js).indexOf(n),r=.08,s=.4,a=[Math.cos(s),0,-Math.sin(s)],o=R.norm([Math.sin(s),.22,Math.cos(s)]),c=R.norm(R.cross(o,a)),l=[0,.46,0],h=[[[.2-i*.05,.92],[.14,.8],[.19,.7],[.12,.58]],[[-.22+i*.03,.05],[-.17,.16],[-.21,.25]]],d=(x,m)=>h.some(_=>_.some((M,S)=>{const w=_[S+1];if(!w)return!1;const E=w[0]-M[0],L=w[1]-M[1],b=Math.max(0,Math.min(1,((x-M[0])*E+(m-M[1])*L)/(E*E+L*L)));return Math.hypot(x-M[0]-E*b,m-M[1]-L*b)<.014})),u=x=>{const m=R.sub(x,l),_=[R.dot(m,a),R.dot(m,c)+.46,R.dot(m,o)];if(_[2]>r-.02){const M=(_[0]+.17)/.34,S=(.8-_[1])/.5;if(M>=0&&M<=1&&S>=0&&S<=1&&Ch(M,S,i+1,.1))return f.RUNE}if(d(_[0],_[1]))return f.STONED;if(_[1]>.86&&Lt(Math.floor(_[0]*30),Math.floor(_[2]*30),3)<.3||_[1]<.12&&Lt(Math.floor(_[0]*35),Math.floor(_[1]*35)+Math.floor(_[2]*35)*7,5)<.55)return f.MOSS};t.box(l,[.28,.46,r],f.STONE,{group:1,axes:[a,c,o],round:.06,paint:u}),t.box(R.add(R.add(l,R.mul(c,.53)),R.mul(a,.2)),[.3,.12,.2],f.STONE,{group:1,dir:R.add(a,R.mul(c,.35)),up:c,cut:!0,paint:u});for(const[x,m,_]of[[-.24,.14,.08],[.2,.02,.07],[0,.12,.07]])t.ell([x,.015,m],[_,_*.4,_],f.MOSS,{group:2});for(let x=0;x<9;x++){const m=-.3+x*.07,_=.12+x%3*.025-x*.02,M=.07+x*37%5/60;t.seg([m,0,_],[m+(x%3-1)*.02,M,_+.01],.012,.004,x%3?f.LEAF:f.LEAF2,{group:10+x})}const p={[f.STONE]:[132,134,142],[f.STONED]:[70,70,80],[f.MOSS]:[86,120,62],[f.LEAF]:[80,125,60],[f.LEAF2]:[130,160,80],[f.RUNE]:Js[n][0],[f.MAGIC2]:Js[n][1],[f.LINE]:[40,40,50]},g=Sn(t,{height:44}).sp;let v=0;for(let x=0;x<600&&v<5;x++){const m=Math.floor(Lt(x,i,9)*g.w),_=Math.floor(Lt(x,i,10)*g.h*.8);g.get(m,_)||g.get(m+1,_)||g.get(m-1,_)||g.get(m,_+1)||g.get(m,_-1)||(g.px(m,_,v%2?f.RUNE:f.MAGIC2),v++)}return{sp:g,colours:p}}function yf(){const n=new Xe({blend:.03});n.ell([0,0,0],[.62,.025,.38],f.WATER,{group:1,paint:t=>Math.hypot(t[0]/.62,t[2]/.38)>.88?f.BODY2:void 0});for(let t=0;t<16;t++){const i=Math.PI*(.85+t/15*.9),r=Math.cos(i)*.6,s=Math.sin(i)*.36,a=.18+t*37%10/40;n.seg([r,0,s],[r+(t%3-1)*.02,a,s],.012,.006,t%4?f.LEAF:f.LEAF2,{group:10+t})}for(const[t,i,r]of[[.5,.2,.07],[.45,-.25,.05],[-.2,.35,.06]])n.ell([t,.02,i],[r,r*.5,r],f.ACCENT,{group:30});return{sp:Sn(n,{height:22}).sp,colours:{[f.WATER]:[40,70,95],[f.BODY2]:[70,60,45],[f.LEAF]:[80,125,60],[f.LEAF2]:[130,160,80],[f.ACCENT]:[130,128,125]}}}function wf(n,{makeCanvas:e=_l}={}){const t=(l,h)=>wi(l,h,n,"none",e),i={campfire:[0,1,2].map(l=>t(Sf(l),Mf)),stones:{},pond:null};for(const l of Object.keys(Js)){const h=bf(l);i.stones[l]=t(h.sp,h.colours)}const r=yf(),s=t(r.sp,r.colours),a=e(r.sp.w,r.sp.h),o=a.getContext("2d"),c=o.createImageData(r.sp.w,r.sp.h);for(let l=0;l<r.sp.m.length;l++)r.sp.m[l]===f.WATER&&c.data.set([255,255,255,255],l*4);return o.putImageData(c,0,0),s.mask=a,i.pond=s,i}function Ef(n,e){const t=new Map,i=new Map,r=(c,l,h)=>(c*2097152+(l+1048576))*2097152+(h+1048576),s=(c,l,h)=>{const d=r(c,l,h);let u=t.get(d);if(!u){const p=Math.pow(2,-c);u=[p*(l+He(l*7+c,h,n)),p*(h+He(l,h*13+c,n+1))],t.set(d,u)}return u},a=(c,l,h)=>{const d=Math.pow(2,-c),u=Math.floor(l/d),p=Math.floor(h/d);let g=u,v=p,x=1/0;for(let m=-2;m<=2;m++)for(let _=-2;_<=2;_++){const M=s(c,u+m,p+_),S=(M[0]-l)**2+(M[1]-h)**2;S<x&&(x=S,g=u+m,v=p+_)}return[g,v]},o=(c,l,h)=>{const d=r(c,l,h);let u=i.get(d);if(u)return u;if(c===0)u=[l,h];else{const p=s(c,l,h),g=a(c-1,p[0],p[1]);u=o(c-1,g[0],g[1])}return i.set(d,u),u};return{seed:n,depth:e,site:(c,l)=>s(0,c,l),partition(c,l){const h=a(e,c,l);return o(e,h[0],h[1])},centreness(c,l,h){const d=s(0,h[0],h[1]),u=Math.hypot(c-d[0],l-d[1]);let p=1/0;const g=Math.floor(c),v=Math.floor(l);for(let x=-2;x<=2;x++)for(let m=-2;m<=2;m++){const _=g+x,M=v+m;if(_===h[0]&&M===h[1])continue;const S=s(0,_,M);p=Math.min(p,Math.hypot(c-S[0],l-S[1]))}return Math.min(1,2*u/(u+p))},openness(c,l){let h=1/0,d=1/0;const u=Math.floor(c),p=Math.floor(l);for(let g=-2;g<=2;g++)for(let v=-2;v<=2;v++){const x=s(0,u+g,p+v),m=Math.hypot(c-x[0],l-x[1]);m<h?(d=h,h=m):m<d&&(d=m)}return Math.min(1,2*h/(h+d))}}}const Af=id.types,yn=ls.map(n=>({id:n.id,name:n.name,creature:n.creature,text:n.text,setPiece:n.set?n.text.set??"a set piece":"",hasWalls:!!n.wall?.length,floor:[n.floor[1],n.floor[2],n.floor[3]],treeDensity:Af[n.id]?.treeDensity??1})),gr=(n,e)=>n+","+e;function Tf(n){if(n==null||n.trim()==="")return null;const e=n.trim();if(/^\d{1,9}$/.test(e))return Number(e);let t=2166136261;for(let i=0;i<e.length;i++)t=Math.imul(t^e.charCodeAt(i),16777619);return(t>>>0)%1e9}function Rf(n,e,t,i){const r=new Map,s=(c,l)=>{if(c[0]===l[0]&&c[1]===l[1])return;const h=gr(c[0],c[1]),d=gr(l[0],l[1]);r.has(h)||r.set(h,new Set),r.has(d)||r.set(d,new Set),r.get(h).add(d),r.get(d).add(h)},a=(t-e)*i;let o=[];for(let c=0;c<=a;c++){const l=[];for(let h=0;h<=a;h++){const d=n.partition(e+h/i,e+c/i);l.push(d),h>0&&s(d,l[h-1]),c>0&&s(d,o[h])}o=l}return r}function Cf(n,e){const t=e.mapAreas,i=2,r=e.areaSize*e.areaScale,s=yn.length,a=3,o=Math.max(0,Math.min(1,e.areaSizeVariance))*a*.3,c=(U,D)=>{const F=U/r,z=D/r;return[F+o*(_r(F/a,z/a,n+91)-.5)*2,z+o*(_r(F/a,z/a,n+92)-.5)*2]},l=(U,D)=>{let F=U*r,z=D*r;for(let X=0;X<30;X++){const[Q,Y]=c(F,z);F+=(U-Q)*r,z+=(D-Y)*r}return[F,z]},h=Ef(n,e.borderLayers),d=-i,u=t+i,p=Rf(h,d,u,6),g=new Map,v=Ai(n*5+1);for(let U=d;U<u;U++)for(let D=d;D<u;D++){const F=new Set;for(let Q=-2;Q<=2;Q++)for(let Y=-2;Y<=2;Y++){const te=g.get(gr(D+Y,U+Q));te!==void 0&&F.add(te)}for(const Q of p.get(gr(D,U))??[]){const Y=g.get(Q);Y!==void 0&&F.add(Y)}const z=[...Array(s).keys()].filter(Q=>!F.has(Q)),X=z.length?z:[...Array(s).keys()];g.set(gr(D,U),X[Math.floor(v()*X.length)])}const x=(U,D)=>g.get(gr(U,D))??Math.floor(He(U,D,n+17)*s),m=Math.floor(t/2),_=(U,D)=>{const F=h.site(U,D),z=h.partition(F[0],F[1]);return z[0]===U&&z[1]===D};let M=[m,m];for(const[U,D]of[[0,0],[1,0],[0,1],[-1,0],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]])if(_(m+U,m+D)){M=[m+U,m+D];break}const S=(U,D)=>{const F=h.site(U,D),z=l(F[0],F[1]);return{x:z[0],z:z[1]}},w=S(M[0],M[1]),E=(U,D)=>{const[F,z]=c(U,D),X=h.partition(F,z);return{cell:X,type:x(X[0],X[1]),openness:h.openness(F,z)}},L=(U,D)=>{const F=yn[x(U,D)];return F.setPiece&&He(U,D,n+61)<e.setPieceChance?F.setPiece:null},b=e.dancefloor.radius,A=b+e.dancefloor.clearing,P=(U,D)=>{if(Math.hypot(U-w.x,D-w.z)<A)return 0;const[F,z]=c(U,D),X=h.partition(F,z);if(L(X[0],X[1])){const Y=S(X[0],X[1]);if(Math.hypot(U-Y.x,D-(Y.z-4))<e.setPieceClear*e.setPieceScale)return 0}const Q=1-fn((_r(U/e.gladeScale,D/e.gladeScale,n+61)-(1-e.gladeAmount))/.03);return fn((h.openness(F,z)-e.clearingSize)/Math.max(.01,e.clearingFalloff))*e.treeDensity*Q},C=(U,D)=>Math.min(1,Math.hypot(U-M[0],D-M[1])/(t/2)),N=r*.5;return{seed:n,tuning:e,n:t,margin:i,areaSize:r,partition:h,centreCell:M,dancefloor:{x:w.x,z:w.z,radius:b},start:{x:w.x,z:w.z+2},bounds:{minX:N,maxX:t*r-N,minZ:N,maxZ:t*r-N},extent:{minX:d*r,maxX:u*r,minZ:d*r,maxZ:u*r},typeOf:x,areaAt:E,siteOf:S,treeWeight:P,neighbours:p,setPieceOf:L,remoteness:C}}function Cl(n,e,t,i,r){return Math.hypot(n,e)<i||e>=0?!1:Math.atan2(Math.abs(n),-e)*180/Math.PI<(t?r.facing.awayLeave:r.facing.awayEnter)}function Lf(n,e){return{x:n,z:e,vx:0,vz:0,lift:0,mode:"ground",facing:1,away:!1,lean:!1}}const Tr=(n,e)=>Fn(e.groundHeight,e.treetopHeight,fn(n.lift)),pc=n=>fn(n.lift);function Pf(n,e,t,i,r){let{mode:s,lift:a}=n;e.toggleMode&&(s=s==="ground"||s==="descending"?"rising":"descending"),s==="rising"?(a+=t/Math.max(.001,i.riseTime),a>=1&&(a=1,s="treetop")):s==="descending"&&(a-=t/Math.max(.001,i.descendTime),a<=0&&(a=0,s="ground"));let o=e.moveX,c=e.moveZ;const l=Math.hypot(o,c);l>1&&(o/=l,c/=l);const h=Fn(i.groundSpeed,i.treetopSpeed,fn(a)),d=1-Math.exp(-Fn(i.groundAcceleration,i.acceleration,fn(a))*t);let u=n.vx+(o*h-n.vx)*d,p=n.vz+(c*h-n.vz)*d,g=n.x+u*t,v=n.z+p*t;(g<r.minX||g>r.maxX)&&(g=Ti(g,r.minX,r.maxX),u=0),(v<r.minZ||v>r.maxZ)&&(v=Ti(v,r.minZ,r.maxZ),p=0);const x=u>.3?1:u<-.3?-1:n.facing,m=Math.hypot(u,p),_=Cl(u,p,n.away,Math.max(1,h*.15),i);return{x:g,z:v,vx:u,vz:p,lift:a,mode:s,facing:x,away:_,lean:m>h*i.leanAt}}const Ta=3;function Df(n,e,t=.5,i=1){const r=n.tuning,s=Ti(e,0,1),a=Math.max(0,Math.round(Fn(r.creaturesNear,r.creaturesFar,Math.pow(s,r.creatureCurve))+(t-.5)*2)),o=a>0&&i<If(n,s)?1:0,c=Math.max(0,a-o),l=Math.round(c*r.adultShareFar*fn((s-r.adultsFrom)/Math.max(.01,1-r.adultsFrom))),h=Math.round((c-l)*r.youngShareFar*s);return{babies:Math.max(0,c-l-h),young:h,adults:l,legends:o}}const If=(n,e)=>n.tuning.legendChanceFar*fn((e-n.tuning.legendsFrom)/Math.max(.01,1-n.tuning.legendsFrom)),Xh=n=>n.areaSize*.75,aa=(n,e,t,i)=>{const r=n.areaAt(e,t).cell;return r[0]===i[0]&&r[1]===i[1]};function Yh(n,e,t,i,r){if(aa(n,t,i,e))return[t,i];for(let s=2;s<r*1.5;s+=2)for(let a=0;a<16;a++){const o=a/16*Math.PI*2,c=t+Math.cos(o)*s,l=i+Math.sin(o)*s;if(aa(n,c,l,e))return[c,l]}return[t,i]}function oa(n,e,t){for(let i=0;i<12;i++){const r=t()*Math.PI*2,s=Math.sqrt(t())*e.range,a=e.homeX+Math.cos(r)*s,o=e.homeZ+Math.sin(r)*s;if(aa(n,a,o,e.cell))return[a,o]}return[e.anchorX,e.anchorZ]}function Nf(n){const e=[],t=n.tuning;let i=0;const[r,s]=n.centreCell;for(let a=0;a<n.n;a++)for(let o=0;o<n.n;o++){if(o===r&&a===s)continue;const c=Ai(n.seed*7919+o*131+a*977+3),l=yn[n.typeOf(o,a)],h=n.siteOf(o,a),d=n.remoteness(o,a),u=Df(n,d,He(o,a,n.seed+43),He(o,a,n.seed+47)),p=v=>{const x=[o,a],m=Xh(n),[_,M]=Yh(n,x,h.x,h.z,m),S={cell:x,homeX:h.x,homeZ:h.z,range:m,anchorX:_,anchorZ:M},[w,E]=oa(n,S,c);return{id:i++,species:l.creature,level:v,...S,x:w,z:E,tx:w,tz:E,rest:c()*3,speed:(v===Ta?t.legendSpeed:t.creatureSpeed)*(.7+c()*.6),facing:c()<.5?1:-1,away:!1,moving:!1,walk:c(),seen:0,leashed:!1,rand:Ai(n.seed*31+i*7+11)}};for(let v=0;v<u.babies;v++)e.push(p(0));for(let v=0;v<u.young;v++)e.push(p(1));for(let v=0;v<u.adults;v++)e.push(p(2));const g=t.legendNextToHome&&o===r+1&&a===s;(u.legends||g)&&e.push(p(3))}return e}function Uf(n,e,t){if(n.rest>0){n.rest-=e,n.moving=!1,n.away=!1;return}const i=n.tx-n.x,r=n.tz-n.z,s=Math.hypot(i,r);if(s<.05){[n.tx,n.tz]=oa(t,n,n.rand),n.rest=.8+n.rand()*3.5,n.moving=!1;return}const a=Math.min(s,n.speed*e),o=n.x+i/s*a,c=n.z+r/s*a;if(!aa(t,o,c,n.cell)){n.tx=n.x,n.tz=n.z,n.moving=!1;return}n.x=o,n.z=c,Math.abs(i)>.02&&(n.facing=i>0?1:-1),n.away=Cl(i,r,n.away,0,t.tuning),n.moving=!0,n.walk+=e*(n.level===Ta?1.5:4)}function Ff(n,e,t,i,r,s,a){for(const o of n)if(!o.leashed&&!(Math.abs(o.homeX-e)>i||Math.abs(o.homeZ-t)>i)){if(s-o.seen>3){const c=Ai(o.id*7919+Math.floor(s/20)*131+5);[o.x,o.z]=oa(a,o,c),[o.tx,o.tz]=oa(a,o,c),o.rest=c()*2}o.seen=s,Uf(o,r,a)}}const Kh=6,Of=4,Xt=32;function Bf(n){const e=n.tuning.camera.treetop.angleIn*Math.PI/180;return n.tuning.crownHeight/Math.sin(e)}function qh(n,e,t,i,r,s){const a=n.tuning.areaEdgeBlend,o=n.seed;if(a.width<=0)return n.areaAt(e,t).type;const c=(_r(e/a.scale,t/a.scale,o+81)-.5)*2*a.width+(He(i,r,s+1)-.5)*a.width*a.stray,l=(_r(e/a.scale,t/a.scale,o+82)-.5)*2*a.width+(He(i,r,s+2)-.5)*a.width*a.stray;return n.areaAt(e+c,t+l).type}function zf(n,e,t){const{treeSpacingX:i,treeSpacingZ:r}=n.tuning,s=n.seed,a=[],o=Bf(n),c=n.tuning.crownHalfWidth,l=Math.ceil(t*Xt/r),h=Math.ceil((t+1)*Xt/r);for(let d=l;d<h;d++){const u=d&1?.5:0,p=Math.ceil(e*Xt/i-u),g=Math.ceil((e+1)*Xt/i-u);for(let v=p;v<g;v++){const x=(v+u+(He(v,d,s+101)-.5)*.7)*i,m=(d+(He(v,d,s+102)-.5)*.7)*r,_=qh(n,x,m,v,d,s+106);He(v,d,s+103)>=n.treeWeight(x,m)*yn[_].treeDensity||n.treeWeight(x,m-o)===0||n.treeWeight(x-c,m-o)===0||n.treeWeight(x+c,m-o)===0||a.push({x,z:m,type:_,variant:Math.floor(He(v,d,s+104)*Kh),flip:He(v,d,s+105)<.5})}}return a}function kf(n,e,t){const i=n.tuning.bushSpacing,r=n.seed,s=[],a=Math.ceil(t*Xt/i),o=Math.ceil((t+1)*Xt/i),c=Math.ceil(e*Xt/i),l=Math.ceil((e+1)*Xt/i);for(let h=a;h<o;h++)for(let d=c;d<l;d++){const u=(d+He(d,h,r+201)-.5)*i,p=(h+He(d,h,r+202)-.5)*i,g=1+n.tuning.bushClump*(2*fn((_r(u/13,p/13,r+207)-.35)/.3)-1);He(d,h,r+203)>(.12+Math.min(1,n.treeWeight(u,p))*.3)*n.tuning.bushDensity*g||Math.hypot(u-n.dancefloor.x,p-n.dancefloor.z)<n.dancefloor.radius+2||s.push({x:u,z:p,type:qh(n,u,p,d,h,r+206),variant:Math.floor(He(d,h,r+204)*Of),flip:He(d,h,r+205)<.5})}return s}function Gf(n,e,t){const i=n.tuning.wallSpacing,r=n.seed,s=[],a=Math.ceil(t*Xt/i),o=Math.ceil((t+1)*Xt/i),c=Math.ceil(e*Xt/i),l=Math.ceil((e+1)*Xt/i);for(let h=a;h<o;h++)for(let d=c;d<l;d++){if(He(d,h,r+303)>n.tuning.wallDensity)continue;const u=(d+(He(d,h,r+301)-.5)*.6)*i,p=(h+(He(d,h,r+302)-.5)*.6)*i,g=n.areaAt(u,p);g.openness<.82||!yn[g.type].hasWalls||Math.hypot(u-n.dancefloor.x,p-n.dancefloor.z)<n.dancefloor.radius+4||s.push({x:u,z:p,type:g.type,variant:Math.floor(He(d,h,r+304)*4),flip:He(d,h,r+305)<.5})}return s}const Hf=new Set(["wetland","stream","bog","beaver-pond","moor"]);function Wf(n,e,t){const i=n.tuning.lightSources,r=i.spacing,s=n.seed,a=[],o=Math.ceil(t*Xt/r),c=Math.ceil((t+1)*Xt/r),l=Math.ceil(e*Xt/r),h=Math.ceil((e+1)*Xt/r);for(let d=o;d<c;d++)for(let u=l;u<h;u++){const p=(u+(He(u,d,s+401)-.5)*.7)*r,g=(d+(He(u,d,s+402)-.5)*.7)*r;if(Math.hypot(p-n.dancefloor.x,g-n.dancefloor.z)<n.dancefloor.radius+n.tuning.dancefloor.clearing+4)continue;const v=n.areaAt(p,g),x=v.openness<.35||v.openness>.8?1:.25,m=He(u,d,s+403),M=(Hf.has(yn[v.type].id)?i.wetPond:i.pond)*x,S=i.campfire*x,w=i.magicStone*x,E=m<M?"pond":m<M+S?"campfire":m<M+S+w?"stone":null;E&&a.push({x:p,z:g,kind:E,size:.75+He(u,d,s+404)*.5})}return a}class Vf{constructor(e){this.map=e}map;trees=new Map;bushes=new Map;walls=new Map;lights=new Map;chunks(e,t,i){const r=[];for(let s=Math.floor((t-i)/Xt);s<=Math.floor((t+i)/Xt);s++)for(let a=Math.floor((e-i)/Xt);a<=Math.floor((e+i)/Xt);a++)r.push([a,s]);return r}gather(e,t,i,r,s){e.size>600&&e.clear();const a=[];for(const[o,c]of this.chunks(i,r,s)){const l=o+","+c;let h=e.get(l);h||(h=t(o,c),e.set(l,h));for(const d of h)Math.abs(d.x-i)<=s&&Math.abs(d.z-r)<=s&&a.push(d)}return a}treesNear(e,t,i){return this.gather(this.trees,(r,s)=>zf(this.map,r,s),e,t,i)}bushesNear(e,t,i){return this.gather(this.bushes,(r,s)=>kf(this.map,r,s),e,t,i)}lightsNear(e,t,i){return this.gather(this.lights,(r,s)=>Wf(this.map,r,s),e,t,i)}wallsNear(e,t,i){return this.gather(this.walls,(r,s)=>Gf(this.map,r,s),e,t,i)}setPiecesNear(e,t,i){const r=this.map,s=r.areaSize,a=[];for(let o=Math.floor((t-i)/s)-1;o<=Math.floor((t+i)/s)+1;o++)for(let c=Math.floor((e-i)/s)-1;c<=Math.floor((e+i)/s)+1;c++){if(c===r.centreCell[0]&&o===r.centreCell[1]||!r.setPieceOf(c,o))continue;const l=r.siteOf(c,o);Math.abs(l.x-e)<=i&&Math.abs(l.z-4-t)<=i&&a.push({x:l.x,z:l.z-4,type:r.typeOf(c,o),variant:0,flip:He(c,o,r.seed+71)<.5})}return a}}const Xf=()=>({stack:[],placed:[],talk:null,events:[],held:!1,heldInAir:!1}),Yf=(n,e)=>e.invite.talkTime[Math.min(n.level,e.invite.talkTime.length-1)],Kf=(n,e)=>e.invite.turn[Math.min(n.level,e.invite.turn.length-1)],Ro=n=>!n.leashed&&n.level!==Ta;function qf(n,e,t,i){if(n.stack.includes(e))return{x:t,z:i};const r=n.placed.find(s=>s.id===e);return r?{x:r.x,z:r.z}:null}function $f(n,e,t,i){return ns(n,e,t,i.invite.talkRange)??ns(n,e,t,i.invite.talkRange,!0)}function ns(n,e,t,i,r=!1){let s=null,a=i;for(const o of n){if(o.leashed||!r&&!Ro(o))continue;const c=Math.hypot(o.x-e,o.z-t);c<=a&&(a=c,s=o)}return s}function mc(n,e,t,i,r){e.leashed=!0,e.rest=0,n.stack.push(e.id),n.events.push({kind:"invited",id:e.id,x:t,z:i,at:r})}function Zf(n,e,t,i,r,s,a,o){n.events=[],n.held=t.talk,n.heldInAir=t.talk&&!r;const c=o.invite,l=o.leash,h=d=>e[d];if(t.talk&&r){const d=n.talk?h(n.talk.id):null;if(d&&!d.leashed&&Math.hypot(d.x-i.x,d.z-i.z)<=c.cancelDistance)n.talk.t+=a,d.rest=Math.max(d.rest,.2),d.moving=!1,d.facing=i.x>=d.x?1:-1,d.away=i.z<d.z-1,!n.talk.refused&&n.talk.t>=n.talk.total&&(mc(n,d,d.x,d.z,s),n.talk=null);else{n.talk&&n.events.push({kind:"cancelled",id:n.talk.id,x:i.x,z:i.z,at:s});const u=ns(e,i.x,i.z,c.talkRange)??ns(e,i.x,i.z,c.talkRange,!0);n.talk=u?{id:u.id,refused:!Ro(u),t:0,total:Ro(u)?Yf(u,o):1/0}:null}}else n.talk&&(n.events.push({kind:"cancelled",id:n.talk.id,x:i.x,z:i.z,at:s}),n.talk=null);if(t.inviteNearest){const d=ns(e,i.x,i.z,1/0);d&&mc(n,d,d.x,d.z,s)}if(t.sigil&&r){let d=-1,u=l.pickRadius;if(n.placed.forEach((p,g)=>{const v=Math.hypot(p.x-i.x,p.z-i.z);v<=u&&(u=v,d=g)}),d>=0){const[p]=n.placed.splice(d,1);n.stack.push(p.id),n.events.push({kind:"picked",id:p.id,x:p.x,z:p.z,at:s})}else if(n.stack.length){const p=n.stack[n.stack.length-1];$h(n,i.x,i.z,o)?n.events.push({kind:"fizzled",id:p,x:i.x,z:i.z,at:s}):(n.stack.pop(),n.placed.push({id:p,x:i.x,z:i.z,at:s}),n.events.push({kind:"placed",id:p,x:i.x,z:i.z,at:s}))}}for(const d of n.stack)gc(h(d),i.x,i.z,a,o);for(const d of n.placed)gc(h(d.id),d.x,d.z,a,o)}const $h=(n,e,t,i)=>n.placed.some(r=>Math.hypot(r.x-e,r.z-t)<i.leash.spacing);function gc(n,e,t,i,r){const s=r.leash,a=s.length,o=Math.hypot(n.x-e,n.z-t)>a;if(o){const p=Math.hypot(n.x-e,n.z-t),g=a*.5/p;n.tx=e+(n.x-e)*g,n.tz=t+(n.z-t)*g,n.rest=0}else if(n.rest>0){n.rest-=i,n.moving=!1,n.away=!1;return}else if(Math.hypot(n.tx-e,n.tz-t)>a*.85||Math.hypot(n.tx-n.x,n.tz-n.z)<.05){Math.hypot(n.tx-n.x,n.tz-n.z)<.05&&(n.rest=.5+n.rand()*2);const p=n.rand()*Math.PI*2,g=Math.sqrt(n.rand())*a*.8;if(n.tx=e+Math.cos(p)*g,n.tz=t+Math.sin(p)*g,n.rest>0){n.moving=!1,n.away=!1;return}}const c=n.tx-n.x,l=n.tz-n.z,h=Math.hypot(c,l);if(h<1e-4){n.moving=!1;return}const d=o?Math.max(n.speed,s.runSpeed*(n.level===Ta?.6:1)):n.speed*1.5,u=Math.min(h,d*i);n.x+=c/h*u,n.z+=l/h*u,Math.abs(c)>.02&&(n.facing=c>0?1:-1),n.away=Cl(c,l,n.away,0,r),n.moving=!0,n.walk+=i*(o?7:4)}const Jf=n=>`${n[0]},${n[1]}`;function Qf(n){const e={cell:n.centreCell,wave:0,at:0,from:null,soundsystem:null};return{areas:new Map([[Jf(n.centreCell),e]]),wave:0,nextAt:n.tuning.party.startDelay+n.tuning.party.interval,paused:!1}}function jf(n,e){const t=n.siteOf(e[0],e[1]),i=Ai(n.seed*17+e[0]*53+e[1]*911),[r,s]=Yh(n,[e[0],e[1]],t.x,t.z,n.areaSize*.75),a=Math.floor(He(e[0],e[1],n.seed+77)*3)%3;for(let o=0;o<24;o++){const c=i()*Math.PI*2,l=3+i()*4,h=r+Math.cos(c)*l,d=s+Math.sin(c)*l+3,u=n.areaAt(h,d).cell;if(u[0]===e[0]&&u[1]===e[1])return{x:h,z:d,variant:a}}return{x:r,z:s,variant:a}}const ep=(n,e)=>e[0]>=0&&e[1]>=0&&e[0]<n.n&&e[1]<n.n;function Zh(n,e,t){const i=n.wave+1,r=[],s=new Map,a=new Map;for(const[l,h]of n.areas)for(const d of e.neighbours.get(l)??[]){if(n.areas.has(d)||s.has(d))continue;const u=d.split(",").map(Number);ep(e,u)&&(s.set(d,u),a.set(d,h.cell))}const o=[...s.entries()].sort((l,h)=>He(l[1][0],l[1][1],e.seed+i)-He(h[1][0],h[1][1],e.seed+i)),c=e.tuning.party.maxPerWave>0?e.tuning.party.maxPerWave:1/0;for(const[l,h]of o.slice(0,c)){const d={cell:h,wave:i,at:t,from:a.get(l)??null,soundsystem:jf(e,h)};n.areas.set(l,d),r.push(d)}return n.wave=i,r}function tp(n,e,t,i){return n.paused?(n.nextAt+=i,[]):t<n.nextAt?[]:(n.nextAt+=e.tuning.party.interval,Zh(n,e,t))}function np(n,e,t){const i=Math.max(0,n.nextAt-t),r=e.tuning.party.interval;return{left:i,gone:1-Math.min(1,i/r)}}function ip(n,e){const t=Cf(n,e),i=Lf(t.start.x,t.start.z);return{seed:n,tuning:e,map:t,forest:new Vf(t),creatures:Nf(t),clock:ed(),witch:i,camera:Ju(e,i.x,Tr(i,e),i.z),party:Qf(t),leash:Xf()}}function rp(n,e,t){const i=td(n.clock,t);i!==0&&(n.witch=Pf(n.witch,e,i,n.tuning,n.map.bounds),n.camera=Qu(n.camera,e.zoom,{x:n.witch.x,y:Tr(n.witch,n.tuning),z:n.witch.z},{x:n.witch.vx,z:n.witch.vz},n.witch.lift,i,n.tuning),e.pauseWaves&&(n.party.paused=!n.party.paused),e.nextWave&&(Zh(n.party,n.map,n.clock.time),n.party.nextAt=n.clock.time+n.tuning.party.interval),tp(n.party,n.map,n.clock.time,i),Ff(n.creatures,n.witch.x,n.witch.z,sp(n),i,n.clock.time,n.map),Zf(n.leash,n.creatures,{talk:!!e.talk,sigil:!!e.sigil,inviteNearest:e.inviteNearest},n.witch,n.witch.mode==="ground",n.clock.time,i,n.tuning))}const sp=n=>Math.max(n.tuning.creatureSimRadius,n.tuning.haze.far+20+Xh(n.map)*2.5),xc=n=>Th(n.camera,n.camera.lift,n.tuning);function Jh(n){const e=n.map.areaAt(n.witch.x,n.witch.z),t=n.map.setPieceOf(e.cell[0],e.cell[1]);return yn[e.type].name+(t?` (set piece: ${t})`:"")}const ap="Witch tuning. Edit the numbers, push, and the playable link rebuilds. Distances are metres, times seconds, angles degrees. Keys starting with _ are notes.",op="The forest: mapAreas x mapAreas areas cut by the fractal partition. An area is areaSize x areaScale metres across on average (areaScale 4 makes them four times as wide as the first 28 m areas; push it for bigger). areaSizeVariance (0-1) makes areas vary in size, some small, some large. borderLayers sets how wiggly borders are.",lp=20,cp=28,hp=4,up=.7,dp=4,fp="treeHeight and crownWidth scale the art's trees (1 is the Art Lab's size; crowns widen with treeHeight too, crownWidth is the total). treeDensity (0-1): the chance of a tree on each spot outside the clearings; clearingSize (0-1): how far out from an area's centre the ground stays fully open; clearingFalloff (0-1): over how much of the way to the border trees thicken to full density (small: crisp clearing edges); gladeAmount (0-1) of the woods is open in random glades about gladeScale metres across; trees sit on a staggered grid treeSpacingX by treeSpacingZ metres, so no two crowns pile up. A tree is left out where its crown (crownHalfWidth either side, crownHeight up) would hang over a clearing seen from the treetops.",pp=.8,mp=.2,gp=.12,xp=.25,vp=38,_p="Ragged area edges: each tree and bush takes its look (its area type) from a point up to width metres away, by a smooth noise scale metres across plus a per-plant stray (stray, share of width), so neighbouring areas' plants mix in a band along the border. Only the look: creatures, partifying and the party border keep the exact borders.",Mp={width:8,scale:24,stray:.5},Sp=.45,bp=.8,yp=2.25,wp=1.7,Ep=4.6,Ap=2.8,Tp=10.5,Rp=11.25,Cp=3.4,Lp=4,Pp=.6,Dp="Speeds per mode, and how long rising and descending take. acceleration: how quickly she reaches her speed or stops in the treetops (per second; higher is snappier); groundAcceleration: the same on the ground. leanAt: the share of the top speed above which she leans into her flight. facing: she (and every creature) faces the viewer unless clearly heading up the screen, within awayEnter degrees of straight up (and stays turned away until past awayLeave); sideways, down or stopped faces the viewer.",Ip=17.5,Np=32,Up=10,Fp=28,Op=.7,Bp={awayEnter:55,awayLeave:65},zp=.7,kp=.55,Gp=1.4,Hp=24,Wp="Near-isometric on the ground, after Transistor; lower over the treetops, looking toward the horizon to feel the speed. The camera follows the witch on a soft spring (follow: its stiffness; higher keeps her closer to the middle) and looks a little ahead of her: lookAhead seconds of flight, at most lookAheadMax metres, eased in at lookAheadEase. zoomEase and liftEase: how softly zoom and rising change the angle and distance. a narrow field of view (fov, degrees) seen from far off, so there is little perspective. Each mode has its own angle (degrees below horizontal) and distance from the witch, at zoomed-in and zoomed-out. Zoom moves between them in zoomSteps steps, starting at startZoom: with 4 steps and startZoom 1 the start is a third of the way out, so the defaults are ground 32 degrees at 100 m and treetop 36 degrees at 170 m, with one step in and two out from each.",Vp={fov:20,ground:{angleIn:30,angleOut:36,distanceIn:80,distanceOut:140},treetop:{angleIn:34,angleOut:40,distanceIn:150,distanceOut:210},lookAhead:.1,lookAheadMax:3,lookAheadEase:1.5,zoomEase:5,liftEase:8,zoomSteps:4,startZoom:1,follow:8},Xp="Everything the camera can see is drawn, plus viewMargin metres round the view, so nothing appears or vanishes on screen. haze: the twilight haze fades the forest from near to far metres from the witch; nothing is drawn beyond far. lightBudget: how many of the nearest point lights (campfires, magic stones, the dancefloor) light the scene at once. pixelSize: screen pixels per art pixel. glowReach: metres the witch's light reaches. spriteTilt: 1 = sprites face the camera fully, 0 = stand upright.",Yp=3,Kp=12,qp=1,$p=1,Zp=16,Jp=12,Qp=20,jp="Light sources placed by seed, on a grid of spacing metres, mostly in clearings and at area edges: the chance per spot of a campfire, a magic stone, or a pond mirroring the moon (wetPond in wet areas: wetland, stream, bog, beaver pond, moor).",e0="How far (reach, metres) and how strongly each kind of light lights its surroundings. glowPower: the witch's own glow (glowReach is its reach). Light falls off smoothly to nothing at its reach: no rings or bands.",t0={campfire:{reach:22,strength:2.6},stone:{reach:16,strength:1.8}},n0=2.2,i0="The music's clock (beats per minute): the lasers sweep to it and party animals dance to it. Later the music itself drives it.",r0={bpm:120},s0="The sigil stack above the witch's hat: scale (of the sigils' size), offset (the gap between her hat tip and the bottom sigil, in sigil heights), gap (between sigils, in sigil heights). It sways as a chain of springs: stiffness and damping, trail (how far it leans back per m/s of her speed), idleSway (metres of gentle sway when she's still).",a0={offset:.5,scale:.65,gap:.15,stiffness:60,damping:9,trail:.03,idleSway:.1},o0="Each playing soundsystem's laser show: bursts of blockBars bars, on about duty of the time (seeded per soundsystem), up to maxCount beams stepping on the bars, fanned over spread degrees (no beam tilting more than maxTilt from straight up), swinging sweep degrees once every sweepBeats beats (slow, like searchlights), opening and closing the fan every openBars bars, length metres tall, opacity 0-1, fading in over fadeIn and out over fadeOut seconds, and fading with distance from fadeNear to fadeFar metres. Glow only: no light, nothing from the light budget.",l0={on:!0,maxCount:9,length:420,spread:100,maxTilt:55,sweep:22,sweepBeats:12,openBars:6,opacity:.6,duty:.35,blockBars:4,fadeIn:.12,fadeOut:.4,fadeNear:140,fadeFar:480},c0="A sparkling line round the partified region's outside edge, in each area's sigil colour: width (px), brightness, sparkle (0-1, how much it twinkles and runs), step (metres between its sparks).",h0={on:!0,width:2,brightness:1.2,sparkle:.6,step:1.6},u0={spacing:10,campfire:.035,magicStone:.025,pond:.02,wetPond:.12},d0={near:150,far:360},f0="bloom: a gentle glow round bright things (strength 0 or on false turns it off; threshold: how bright a pixel must be to glow). tiltShift: blurs the top and bottom of the screen so the forest looks like a miniature. strength: the blur at the screen's edges, in pixels; band: the height of the sharp band (0-1 of the screen); centre: where it sits (0 top, 0.5 middle, 1 bottom); where: 'before' blurs at the low resolution, before the pixels are scaled up, 'after' blurs the scaled-up image. Add ?tilt=before, ?tilt=after or ?tilt=off to the link to compare.",p0="shadows: a small contact shadow under the witch, each bush, creature and prop; trees: a crown-sized shadow under every tree too, cast away from the moon (off: Ed, 2026-10-03). canopyShadow: a dappled shadow from the canopy overhead (height in metres), thinner in clearings, drifting with the wind. mist: a low drifting mist (height in metres above the ground). Each has on and strength.",m0={on:!0,strength:.7,trees:!1},g0={on:!0,strength:.45,height:18,cover:.55,wind:.6},x0={on:!0,strength:.12,height:3,wind:.8},v0="fx: how the mist, the far haze and the canopy dapple are drawn. smooth: soft gradients (the mist in its own buffer, blurred a little and scaled up smoothly); pixel: dithered steps on the art's pixel grid. In smooth, the moonlight's bands, moonbeams and the soft contact shadows under the witch, creatures, bushes and props are smooth too (no dither anywhere); pixel brings all the dithers back. ?fx=pixel or ?fx=smooth in the URL.",_0="smooth",M0="Inviting (DESIGN.md, the leash): on the ground, hold Talk within talkRange metres of a creature; you chat in emoji for talkTime seconds (babies, young, adults), taking turns every turn seconds (babies, young, adults), then it is invited and leashed to you. Letting go, rising or moving further than cancelDistance cancels it. Legends can't be invited: they give one unimpressed look. leash.length: how far a leashed creature roams from its leash point (you, or its sigil on the ground); runSpeed: how fast it hurries back when out of range (m/s); pickRadius: how near a placed sigil you must be to pick it up; spacing: how close two sigils may be put down (keep it above pickRadius, or a blocked spot picks up instead of fizzling). bond: how a creature shows its tie to its sigil (rim: a glow at its feet in the sigil's colour; sparks: one spark every sparkEvery seconds from sigil to creature, staggered; thread: a dotted line only under strain).",S0={talkRange:12,cancelDistance:18,talkTime:[3,6,12],turn:[.7,.9,1.3]},b0={length:8,runSpeed:4,pickRadius:2,spacing:4},y0={rim:!0,sparks:!0,thread:!0,sparkEvery:4},w0="The party spreads: a wave every interval seconds (the first after startDelay more), partifying every area touching a partified one; maxPerWave caps a wave (0: no cap). transition: seconds an area takes to partify, 0 to skip the show. partyLight: the coloured light at each soundsystem (reach in metres, strength).",E0={interval:30,startDelay:0,maxPerWave:0,transition:2.5,lightReach:30,lightStrength:1.6},A0="Colourful string lights in every partified area, as long garlands: runsPerArea runs (a range), each spansPerRun spans (a range) from tree to tree, every next tree inside a forward cone of coneAngle degrees either side, so a run sweeps across rather than zig-zagging; runs start at least spread metres apart. Each span is spanMin to spanMax metres. No span crosses another and each tree holds at most two ends, except junction trees (junctionChance per tree on a run) where a branch leaves, so three meet. At height metres, sagging sag metres per 8 m of span, a bulb every bulbSpacing metres in the palette's colours, twinkling (twinkle 0-1), a chase running along now and then at chaseSpeed bulbs per second. The bulbs only glow (bloom); they cast no light.",T0={on:!0,runsPerArea:[3,6],spansPerRun:[4,10],coneAngle:35,junctionChance:.15,spanMin:6,spanMax:20,spread:24,height:6.5,sag:.9,bulbSpacing:.8,palette:["#fff1d6","#ff6fcf","#5fe8ff","#ffe25c","#b48cff","#7dff8a"],twinkle:.35,chaseSpeed:8},R0="The dancefloor: motes: magic particles drifting up off the circle (count, how high they rise in metres, speed in m/s, column: the share of the circle they rise from); a ring of standing stones (radius in metres, how many stones), a clear space of clearing metres round it, a glowing magic circle (two hues 0-1, pulse per second, runeSpeed in turns per minute) lighting the ground round it (lightReach metres, lightStrength), and a magic disco ball floating discoHeight metres up (discoSize metres across, spin turns per minute) throwing specks of light: specks is the share of the sphere that throws one, speckBrightness how bright, speckReach how far.",C0={motes:{count:220,rise:110,speed:3.2,column:.8},radius:13.5,stones:27,clearing:9,circleHue:.86,circleHue2:.52,pulse:.35,runeSpeed:1,lightReach:36,lightStrength:2,discoHeight:7.5,discoSize:1.8,spin:4,specks:.22,speckBrightness:.9,speckReach:32},L0="In ground mode the canopy stays drawn at the screen's edges, so she flies under the forest roof; a dithered hole round her is cut out, screenFraction of the screen's width across, with a soft edge (a fraction of the width). Rising closes the hole.",P0={screenFraction:.8,edge:.1},D0="Contrast: ambient scales the twilight fill (lower is darker shade under the canopy); black is the black point and gamma the curve applied to the whole picture, so dark goes near-black and lit stays bright.",I0={black:.03,gamma:1.35,ambient:.35},N0={on:!0,strength:.7,threshold:.55},U0={on:!0,where:"before",strength:3,band:.4,centre:.55},F0="Creatures grow more numerous and older with an area's distance from home (0 at the dancefloor, 1 at the map's edge): creaturesNear in the areas round home, creaturesFar at the edge (creatureCurve shapes the rise), youngShareFar of them young at the edge; adults from adultsFrom outward, adultShareFar of them at the edge. Legends are rare: at most one in any area, by a chance rising from 0 at legendsFrom to legendChanceFar at the edge; legendNextToHome puts one next to home, to look at early. Idle creatures roam their whole area. Only creatures whose home is within creatureSimRadius metres of the witch move (never less than the haze far edge plus 2.5 areas, so a creature resuming its roam always does so out of sight).",O0=2,B0=20,z0=1.3,k0=.5,G0=.35,H0=.35,W0=.25,V0=!0,X0=.55,Y0=600,K0=.6,q0="setPieceChance: the share of areas, among the types that have a set piece, that show theirs. Wall objects (an area type's edges: puddles, henges, hedges) stand where areas meet, one per wallSpacing metres with chance wallDensity; they do not block movement.",$0=.25,Z0=1.8,J0=9,Q0=.35,j0={_readme:ap,_map:op,mapAreas:lp,areaSize:cp,areaScale:hp,areaSizeVariance:up,borderLayers:dp,_trees:fp,treeDensity:pp,clearingSize:mp,clearingFalloff:gp,gladeAmount:xp,gladeScale:vp,_areaEdgeBlend:_p,areaEdgeBlend:Mp,bushDensity:Sp,bushClump:bp,treeHeight:yp,crownWidth:wp,treeSpacingX:Ep,treeSpacingZ:Ap,crownHalfWidth:Tp,crownHeight:Rp,bushSpacing:Cp,wallSpacing:Lp,wallDensity:Pp,_witch:Dp,groundSpeed:Ip,treetopSpeed:Np,acceleration:Up,groundAcceleration:Fp,leanAt:Op,facing:Bp,riseTime:zp,descendTime:kp,groundHeight:Gp,treetopHeight:Hp,_camera:Wp,camera:Vp,_look:Xp,pixelSize:Yp,glowReach:Kp,glowHeight:qp,spriteTilt:$p,artPixelsPerMetre:Zp,viewMargin:Jp,lightBudget:Qp,_lightSources:jp,_lights:e0,lights:t0,glowPower:n0,_beat:i0,beat:r0,_stack:s0,stack:a0,_lasers:o0,lasers:l0,_borders:c0,borders:h0,lightSources:u0,haze:d0,_post:f0,_shadows:p0,shadows:m0,canopyShadow:g0,mist:x0,_fx:v0,fx:_0,_invite:M0,invite:S0,leash:b0,bond:y0,_party:w0,party:E0,_stringLights:A0,stringLights:T0,_dancefloor:R0,dancefloor:C0,_canopyCutout:L0,canopyCutout:P0,_tone:D0,tone:I0,bloom:N0,tiltShift:U0,_creatures:F0,creaturesNear:O0,creaturesFar:B0,creatureCurve:z0,youngShareFar:k0,adultsFrom:G0,adultShareFar:H0,legendChanceFar:W0,legendNextToHome:V0,legendsFrom:X0,creatureSimRadius:Y0,creatureSpeed:K0,_setPieces:q0,setPieceChance:$0,setPieceScale:Z0,setPieceClear:J0,legendSpeed:Q0},Qi=j0;class em{keys=new Set;pressed=new Set;padPrev=[];touch={x:0,y:0,toggle:!1,zoom:0,debug:!1};onAny=null;constructor(e=window){e.addEventListener("keydown",t=>{if(t.repeat){this.isGameKey(t.code)&&t.preventDefault();return}this.keys.add(t.code),this.isGameKey(t.code)&&t.preventDefault(),this.onAny?.()||this.pressed.add(t.code)}),e.addEventListener("keyup",t=>this.keys.delete(t.code)),e.addEventListener("blur",()=>this.keys.clear())}isGameKey(e){return/^(Arrow|Space$|Key[WASDZXENPTIFR]$|Shift|Minus$|Equal$|NumpadAdd$|NumpadSubtract$|Backquote$)/.test(e)}clearPresses(){this.pressed.clear();const e=this.touch;e.toggle=!1,e.zoom=0,e.debug=!1}read(){const e=this.pressed.has("KeyN")||this.touch.nextWave,t=this.pressed.has("KeyP")||this.touch.pauseWaves;this.touch.nextWave=!1,this.touch.pauseWaves=!1;const i=x=>this.keys.has(x)?1:0,r=x=>this.pressed.has(x);let s=i("KeyD")+i("ArrowRight")-i("KeyA")-i("ArrowLeft"),a=i("KeyS")+i("ArrowDown")-i("KeyW")-i("ArrowUp"),o=r("Space"),c=(r("KeyX")||r("Minus")||r("NumpadSubtract")?1:0)-(r("KeyZ")||r("Equal")||r("NumpadAdd")?1:0),l=r("Backquote"),h=i("KeyT")+i("KeyF")+i("ShiftLeft")+i("ShiftRight")>0,d=r("KeyE")||r("KeyR");const u=r("KeyI");this.pressed.clear();const p=typeof navigator<"u"&&navigator.getGamepads?navigator.getGamepads():[];for(const x of p){if(!x)continue;const m=A=>!!x.buttons[A]?.pressed,M=x.buttons.some((A,P)=>A.pressed&&!this.padPrev[P])&&!!this.onAny?.(),S=A=>!M&&m(A)&&!this.padPrev[A];let w=x.axes[0]??0,E=x.axes[1]??0;const L=Math.hypot(w,E),b=.18;if(L<b)w=0,E=0;else{const A=(Math.min(1,L)-b)/(1-b)/L;w*=A,E*=A}w+=(m(15)?1:0)-(m(14)?1:0),E+=(m(13)?1:0)-(m(12)?1:0),s+=w,a+=E,S(3)&&(o=!0),(S(4)||S(6))&&(c+=1),(S(5)||S(7))&&(c-=1),S(8)&&(l=!0),m(0)&&(h=!0),S(2)&&(d=!0),this.padPrev=x.buttons.map(A=>A.pressed);break}const g=this.touch;s+=g.x,a+=g.y,g.toggle&&(o=!0),c+=g.zoom,g.debug&&(l=!0),g.talk&&(h=!0),g.sigil&&(d=!0),g.toggle=!1,g.zoom=0,g.debug=!1,g.sigil=!1;const v=Math.hypot(s,a);return v>1&&(s/=v,a/=v),{moveX:s,moveZ:a,toggleMode:o,zoom:Math.sign(c),debug:l,nextWave:e,pauseWaves:t,talk:h,sigil:d,inviteNearest:u}}}const Ll="186",tm=0,vc=1,nm=2,Qs=1,im=2,Qr=3,Xi=0,dn=1,oi=2,Zn=0,Sr=1,Rr=2,_c=3,Mc=4,Pl=5,mr=100,rm=101,sm=102,am=103,om=104,Dl=200,lm=201,Il=202,cm=203,Qh=204,jh=205,hm=206,um=207,dm=208,fm=209,pm=210,mm=211,gm=212,xm=213,vm=214,Co=0,Lo=1,Po=2,is=3,Do=4,Io=5,No=6,Uo=7,eu=0,_m=1,Mm=2,Jn=0,tu=1,nu=2,iu=3,ru=4,su=5,au=6,ou=7,lu=300,Yi=301,Cr=302,za=303,ka=304,Ra=306,Fo=1e3,li=1001,Oo=1002,kt=1003,Sm=1004,vs=1005,Bt=1006,Ga=1007,ki=1008,vn=1009,cu=1010,hu=1011,rs=1012,Nl=1013,Qn=1014,qn=1015,jn=1016,Ul=1017,Fl=1018,ss=1020,uu=35902,du=35899,fu=1021,pu=1022,_n=1023,ui=1026,Gi=1027,mu=1028,Ol=1029,Ki=1030,Bl=1031,zl=1033,js=33776,ea=33777,ta=33778,na=33779,Bo=35840,zo=35841,ko=35842,Go=35843,Ho=36196,Wo=37492,Vo=37496,Xo=37488,Yo=37489,la=37490,Ko=37491,qo=37808,$o=37809,Zo=37810,Jo=37811,Qo=37812,jo=37813,el=37814,tl=37815,nl=37816,il=37817,rl=37818,sl=37819,al=37820,ol=37821,ll=36492,cl=36494,hl=36495,ul=36283,dl=36284,ca=36285,fl=36286,bm=3200,Sc=0,ym=1,On="",Tn="srgb",as="srgb-linear",ha="linear",xt="srgb",Ha=7680,wm=519,Em=512,Am=513,Tm=514,kl=515,Rm=516,Cm=517,Gl=518,Lm=519,Pm=35044,br=35048,bc="300 es",$n=2e3,ua=2001;function Dm(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function da(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Im(){const n=da("canvas");return n.style.display="block",n}const yc={};function wc(...n){const e="THREE."+n.shift();console.log(e,...n)}function gu(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ge(...n){n=gu(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function ot(...n){n=gu(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function yr(...n){const e=n.join(" ");e in yc||(yc[e]=!0,Ge(...n))}function Nm(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const Um={[Co]:Lo,[Po]:No,[Do]:Uo,[is]:Io,[Lo]:Co,[No]:Po,[Uo]:Do,[Io]:is};class $i{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const nn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Wa=Math.PI/180,pl=180/Math.PI;function cs(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(nn[n&255]+nn[n>>8&255]+nn[n>>16&255]+nn[n>>24&255]+"-"+nn[e&255]+nn[e>>8&255]+"-"+nn[e>>16&15|64]+nn[e>>24&255]+"-"+nn[t&63|128]+nn[t>>8&255]+"-"+nn[t>>16&255]+nn[t>>24&255]+nn[i&255]+nn[i>>8&255]+nn[i>>16&255]+nn[i>>24&255]).toLowerCase()}function rt(n,e,t){return Math.max(e,Math.min(t,n))}function Fm(n,e){return(n%e+e)%e}function Va(n,e,t){return(1-t)*n+t*e}function Hr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function un(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class We{static{We.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(rt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(rt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Nr{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let c=i[r+0],l=i[r+1],h=i[r+2],d=i[r+3],u=s[a+0],p=s[a+1],g=s[a+2],v=s[a+3];if(d!==v||c!==u||l!==p||h!==g){let x=c*u+l*p+h*g+d*v;x<0&&(u=-u,p=-p,g=-g,v=-v,x=-x);let m=1-o;if(x<.9995){const _=Math.acos(x),M=Math.sin(_);m=Math.sin(m*_)/M,o=Math.sin(o*_)/M,c=c*m+u*o,l=l*m+p*o,h=h*m+g*o,d=d*m+v*o}else{c=c*m+u*o,l=l*m+p*o,h=h*m+g*o,d=d*m+v*o;const _=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=_,l*=_,h*=_,d*=_}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],c=i[r+1],l=i[r+2],h=i[r+3],d=s[a],u=s[a+1],p=s[a+2],g=s[a+3];return e[t]=o*g+h*d+c*p-l*u,e[t+1]=c*g+h*u+l*d-o*p,e[t+2]=l*g+h*p+o*u-c*d,e[t+3]=h*g-o*d-c*u-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(i/2),h=o(r/2),d=o(s/2),u=c(i/2),p=c(r/2),g=c(s/2);switch(a){case"XYZ":this._x=u*h*d+l*p*g,this._y=l*p*d-u*h*g,this._z=l*h*g+u*p*d,this._w=l*h*d-u*p*g;break;case"YXZ":this._x=u*h*d+l*p*g,this._y=l*p*d-u*h*g,this._z=l*h*g-u*p*d,this._w=l*h*d+u*p*g;break;case"ZXY":this._x=u*h*d-l*p*g,this._y=l*p*d+u*h*g,this._z=l*h*g+u*p*d,this._w=l*h*d-u*p*g;break;case"ZYX":this._x=u*h*d-l*p*g,this._y=l*p*d+u*h*g,this._z=l*h*g-u*p*d,this._w=l*h*d+u*p*g;break;case"YZX":this._x=u*h*d+l*p*g,this._y=l*p*d+u*h*g,this._z=l*h*g-u*p*d,this._w=l*h*d-u*p*g;break;case"XZY":this._x=u*h*d-l*p*g,this._y=l*p*d-u*h*g,this._z=l*h*g+u*p*d,this._w=l*h*d+u*p*g;break;default:Ge("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],d=t[10],u=i+o+d;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-c)*p,this._y=(s-l)*p,this._z=(a-r)*p}else if(i>o&&i>d){const p=2*Math.sqrt(1+i-o-d);this._w=(h-c)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+l)/p}else if(o>d){const p=2*Math.sqrt(1+o-i-d);this._w=(s-l)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(c+h)/p}else{const p=2*Math.sqrt(1+d-i-o);this._w=(a-r)/p,this._x=(s+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(rt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=i*h+a*o+r*l-s*c,this._y=r*h+a*c+s*o-i*l,this._z=s*h+a*l+i*c-r*o,this._w=a*h-i*o-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class W{static{W.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ec.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ec.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*r-o*i),h=2*(o*t-s*r),d=2*(s*i-a*t);return this.x=t+c*l+a*d-o*h,this.y=i+c*h+o*l-s*d,this.z=r+c*d+s*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this.z=rt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this.z=rt(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(rt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=r*c-s*o,this.y=s*a-i*c,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Xa.copy(this).projectOnVector(e),this.sub(Xa)}reflect(e){return this.sub(Xa.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(rt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Xa=new W,Ec=new Nr;class Ve{static{Ve.prototype.isMatrix3=!0}constructor(e,t,i,r,s,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,c,l)}set(e,t,i,r,s,a,o,c,l){const h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=t,h[4]=s,h[5]=c,h[6]=i,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],h=i[4],d=i[7],u=i[2],p=i[5],g=i[8],v=r[0],x=r[3],m=r[6],_=r[1],M=r[4],S=r[7],w=r[2],E=r[5],L=r[8];return s[0]=a*v+o*_+c*w,s[3]=a*x+o*M+c*E,s[6]=a*m+o*S+c*L,s[1]=l*v+h*_+d*w,s[4]=l*x+h*M+d*E,s[7]=l*m+h*S+d*L,s[2]=u*v+p*_+g*w,s[5]=u*x+p*M+g*E,s[8]=u*m+p*S+g*L,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-i*s*h+i*o*c+r*s*l-r*a*c}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],d=h*a-o*l,u=o*c-h*s,p=l*s-a*c,g=t*d+i*u+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=d*v,e[1]=(r*l-h*i)*v,e[2]=(o*i-r*a)*v,e[3]=u*v,e[4]=(h*t-r*c)*v,e[5]=(r*s-o*t)*v,e[6]=p*v,e[7]=(i*c-l*t)*v,e[8]=(a*t-i*s)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*a+l*o)+a+e,-r*l,r*c,-r*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return yr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ya.makeScale(e,t)),this}rotate(e){return yr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ya.makeRotation(-e)),this}translate(e,t){return yr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ya.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ya=new Ve,Ac=new Ve().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Tc=new Ve().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Om(){const n={enabled:!0,workingColorSpace:as,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===xt&&(r.r=hi(r.r),r.g=hi(r.g),r.b=hi(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===xt&&(r.r=wr(r.r),r.g=wr(r.g),r.b=wr(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===On?ha:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return yr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return yr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[as]:{primaries:e,whitePoint:i,transfer:ha,toXYZ:Ac,fromXYZ:Tc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Tn},outputColorSpaceConfig:{drawingBufferColorSpace:Tn}},[Tn]:{primaries:e,whitePoint:i,transfer:xt,toXYZ:Ac,fromXYZ:Tc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Tn}}}),n}const it=Om();function hi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function wr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ji;class Bm{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{ji===void 0&&(ji=da("canvas")),ji.width=e.width,ji.height=e.height;const r=ji.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=ji}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=da("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=hi(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(hi(t[i]/255)*255):t[i]=hi(t[i]);return{data:t,width:e.width,height:e.height}}else return Ge("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let zm=0;class Hl{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:zm++}),this.uuid=cs(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Ka(r[a].image)):s.push(Ka(r[a]))}else s=Ka(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function Ka(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Bm.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ge("Texture: Unable to serialize Texture."),{})}let km=0;const qa=new W;class an extends $i{constructor(e=an.DEFAULT_IMAGE,t=an.DEFAULT_MAPPING,i=li,r=li,s=Bt,a=ki,o=_n,c=vn,l=an.DEFAULT_ANISOTROPY,h=On){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:km++}),this.uuid=cs(),this.name="",this.source=new Hl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new We(0,0),this.repeat=new We(1,1),this.center=new We(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(qa).x}get height(){return this.source.getSize(qa).y}get depth(){return this.source.getSize(qa).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Ge(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ge(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==lu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Fo:e.x=e.x-Math.floor(e.x);break;case li:e.x=e.x<0?0:1;break;case Oo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Fo:e.y=e.y-Math.floor(e.y);break;case li:e.y=e.y<0?0:1;break;case Oo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}an.DEFAULT_IMAGE=null;an.DEFAULT_MAPPING=lu;an.DEFAULT_ANISOTROPY=1;class ht{static{ht.prototype.isVector4=!0}constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const c=e.elements,l=c[0],h=c[4],d=c[8],u=c[1],p=c[5],g=c[9],v=c[2],x=c[6],m=c[10];if(Math.abs(h-u)<.01&&Math.abs(d-v)<.01&&Math.abs(g-x)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+v)<.1&&Math.abs(g+x)<.1&&Math.abs(l+p+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(l+1)/2,S=(p+1)/2,w=(m+1)/2,E=(h+u)/4,L=(d+v)/4,b=(g+x)/4;return M>S&&M>w?M<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(M),r=E/i,s=L/i):S>w?S<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),i=E/r,s=b/r):w<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),i=L/s,r=b/s),this.set(i,r,s,t),this}let _=Math.sqrt((x-g)*(x-g)+(d-v)*(d-v)+(u-h)*(u-h));return Math.abs(_)<.001&&(_=1),this.x=(x-g)/_,this.y=(d-v)/_,this.z=(u-h)/_,this.w=Math.acos((l+p+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this.z=rt(this.z,e.z,t.z),this.w=rt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this.z=rt(this.z,e,t),this.w=rt(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(rt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Gm extends $i{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Bt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new ht(0,0,e,t),this.scissorTest=!1,this.viewport=new ht(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:i.depth},s=new an(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Bt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Hl(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Cn extends Gm{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class xu extends an{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=kt,this.minFilter=kt,this.wrapR=li,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Hm extends an{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=kt,this.minFilter=kt,this.wrapR=li,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class Nt{static{Nt.prototype.isMatrix4=!0}constructor(e,t,i,r,s,a,o,c,l,h,d,u,p,g,v,x){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,c,l,h,d,u,p,g,v,x)}set(e,t,i,r,s,a,o,c,l,h,d,u,p,g,v,x){const m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=r,m[1]=s,m[5]=a,m[9]=o,m[13]=c,m[2]=l,m[6]=h,m[10]=d,m[14]=u,m[3]=p,m[7]=g,m[11]=v,m[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Nt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,r=1/er.setFromMatrixColumn(e,0).length(),s=1/er.setFromMatrixColumn(e,1).length(),a=1/er.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(r),l=Math.sin(r),h=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const u=a*h,p=a*d,g=o*h,v=o*d;t[0]=c*h,t[4]=-c*d,t[8]=l,t[1]=p+g*l,t[5]=u-v*l,t[9]=-o*c,t[2]=v-u*l,t[6]=g+p*l,t[10]=a*c}else if(e.order==="YXZ"){const u=c*h,p=c*d,g=l*h,v=l*d;t[0]=u+v*o,t[4]=g*o-p,t[8]=a*l,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=p*o-g,t[6]=v+u*o,t[10]=a*c}else if(e.order==="ZXY"){const u=c*h,p=c*d,g=l*h,v=l*d;t[0]=u-v*o,t[4]=-a*d,t[8]=g+p*o,t[1]=p+g*o,t[5]=a*h,t[9]=v-u*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const u=a*h,p=a*d,g=o*h,v=o*d;t[0]=c*h,t[4]=g*l-p,t[8]=u*l+v,t[1]=c*d,t[5]=v*l+u,t[9]=p*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const u=a*c,p=a*l,g=o*c,v=o*l;t[0]=c*h,t[4]=v-u*d,t[8]=g*d+p,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=p*d+g,t[10]=u-v*d}else if(e.order==="XZY"){const u=a*c,p=a*l,g=o*c,v=o*l;t[0]=c*h,t[4]=-d,t[8]=l*h,t[1]=u*d+v,t[5]=a*h,t[9]=p*d-g,t[2]=g*d-p,t[6]=o*h,t[10]=v*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Wm,e,Vm)}lookAt(e,t,i){const r=this.elements;return mn.subVectors(e,t),mn.lengthSq()===0&&(mn.z=1),mn.normalize(),gi.crossVectors(i,mn),gi.lengthSq()===0&&(Math.abs(i.z)===1?mn.x+=1e-4:mn.z+=1e-4,mn.normalize(),gi.crossVectors(i,mn)),gi.normalize(),_s.crossVectors(mn,gi),r[0]=gi.x,r[4]=_s.x,r[8]=mn.x,r[1]=gi.y,r[5]=_s.y,r[9]=mn.y,r[2]=gi.z,r[6]=_s.z,r[10]=mn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],h=i[1],d=i[5],u=i[9],p=i[13],g=i[2],v=i[6],x=i[10],m=i[14],_=i[3],M=i[7],S=i[11],w=i[15],E=r[0],L=r[4],b=r[8],A=r[12],P=r[1],C=r[5],N=r[9],U=r[13],D=r[2],F=r[6],z=r[10],X=r[14],Q=r[3],Y=r[7],te=r[11],O=r[15];return s[0]=a*E+o*P+c*D+l*Q,s[4]=a*L+o*C+c*F+l*Y,s[8]=a*b+o*N+c*z+l*te,s[12]=a*A+o*U+c*X+l*O,s[1]=h*E+d*P+u*D+p*Q,s[5]=h*L+d*C+u*F+p*Y,s[9]=h*b+d*N+u*z+p*te,s[13]=h*A+d*U+u*X+p*O,s[2]=g*E+v*P+x*D+m*Q,s[6]=g*L+v*C+x*F+m*Y,s[10]=g*b+v*N+x*z+m*te,s[14]=g*A+v*U+x*X+m*O,s[3]=_*E+M*P+S*D+w*Q,s[7]=_*L+M*C+S*F+w*Y,s[11]=_*b+M*N+S*z+w*te,s[15]=_*A+M*U+S*X+w*O,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],d=e[6],u=e[10],p=e[14],g=e[3],v=e[7],x=e[11],m=e[15],_=c*p-l*u,M=o*p-l*d,S=o*u-c*d,w=a*p-l*h,E=a*u-c*h,L=a*d-o*h;return t*(v*_-x*M+m*S)-i*(g*_-x*w+m*E)+r*(g*M-v*w+m*L)-s*(g*S-v*E+x*L)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[1],a=e[5],o=e[9],c=e[2],l=e[6],h=e[10];return t*(a*h-o*l)-i*(s*h-o*c)+r*(s*l-a*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],d=e[9],u=e[10],p=e[11],g=e[12],v=e[13],x=e[14],m=e[15],_=t*o-i*a,M=t*c-r*a,S=t*l-s*a,w=i*c-r*o,E=i*l-s*o,L=r*l-s*c,b=h*v-d*g,A=h*x-u*g,P=h*m-p*g,C=d*x-u*v,N=d*m-p*v,U=u*m-p*x,D=_*U-M*N+S*C+w*P-E*A+L*b;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const F=1/D;return e[0]=(o*U-c*N+l*C)*F,e[1]=(r*N-i*U-s*C)*F,e[2]=(v*L-x*E+m*w)*F,e[3]=(u*E-d*L-p*w)*F,e[4]=(c*P-a*U-l*A)*F,e[5]=(t*U-r*P+s*A)*F,e[6]=(x*S-g*L-m*M)*F,e[7]=(h*L-u*S+p*M)*F,e[8]=(a*N-o*P+l*b)*F,e[9]=(i*P-t*N-s*b)*F,e[10]=(g*E-v*S+m*_)*F,e[11]=(d*S-h*E-p*_)*F,e[12]=(o*A-a*C-c*b)*F,e[13]=(t*C-i*A+r*b)*F,e[14]=(v*M-g*w-x*_)*F,e[15]=(h*w-d*M+u*_)*F,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,c=e.z,l=s*a,h=s*o;return this.set(l*a+i,l*o-r*c,l*c+r*o,0,l*o+r*c,h*o+i,h*c-r*a,0,l*c-r*o,h*c+r*a,s*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,h=a+a,d=o+o,u=s*l,p=s*h,g=s*d,v=a*h,x=a*d,m=o*d,_=c*l,M=c*h,S=c*d,w=i.x,E=i.y,L=i.z;return r[0]=(1-(v+m))*w,r[1]=(p+S)*w,r[2]=(g-M)*w,r[3]=0,r[4]=(p-S)*E,r[5]=(1-(u+m))*E,r[6]=(x+_)*E,r[7]=0,r[8]=(g+M)*L,r[9]=(x-_)*L,r[10]=(1-(u+v))*L,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),t.identity(),this;let a=er.set(r[0],r[1],r[2]).length();const o=er.set(r[4],r[5],r[6]).length(),c=er.set(r[8],r[9],r[10]).length();s<0&&(a=-a),Dn.copy(this);const l=1/a,h=1/o,d=1/c;return Dn.elements[0]*=l,Dn.elements[1]*=l,Dn.elements[2]*=l,Dn.elements[4]*=h,Dn.elements[5]*=h,Dn.elements[6]*=h,Dn.elements[8]*=d,Dn.elements[9]*=d,Dn.elements[10]*=d,t.setFromRotationMatrix(Dn),i.x=a,i.y=o,i.z=c,this}makePerspective(e,t,i,r,s,a,o=$n,c=!1){const l=this.elements,h=2*s/(t-e),d=2*s/(i-r),u=(t+e)/(t-e),p=(i+r)/(i-r);let g,v;if(c)g=s/(a-s),v=a*s/(a-s);else if(o===$n)g=-(a+s)/(a-s),v=-2*a*s/(a-s);else if(o===ua)g=-a/(a-s),v=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=d,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=$n,c=!1){const l=this.elements,h=2/(t-e),d=2/(i-r),u=-(t+e)/(t-e),p=-(i+r)/(i-r);let g,v;if(c)g=1/(a-s),v=a/(a-s);else if(o===$n)g=-2/(a-s),v=-(a+s)/(a-s);else if(o===ua)g=-1/(a-s),v=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=d,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const er=new W,Dn=new Nt,Wm=new W(0,0,0),Vm=new W(1,1,1),gi=new W,_s=new W,mn=new W,Rc=new Nt,Cc=new Nr;class qi{constructor(e=0,t=0,i=0,r=qi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],h=r[9],d=r[2],u=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(rt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-rt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(rt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-rt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(rt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-rt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,p),this._y=0);break;default:Ge("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Rc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Rc,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Cc.setFromEuler(this),this.setFromQuaternion(Cc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}qi.DEFAULT_ORDER="XYZ";class vu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Xm=0;const Lc=new W,tr=new Nr,ni=new Nt,Ms=new W,Wr=new W,Ym=new W,Km=new Nr,Pc=new W(1,0,0),Dc=new W(0,1,0),Ic=new W(0,0,1),Nc={type:"added"},qm={type:"removed"},nr={type:"childadded",child:null},$a={type:"childremoved",child:null};class hn extends $i{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Xm++}),this.uuid=cs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=hn.DEFAULT_UP.clone();const e=new W,t=new qi,i=new Nr,r=new W(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Nt},normalMatrix:{value:new Ve}}),this.matrix=new Nt,this.matrixWorld=new Nt,this.matrixAutoUpdate=hn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=hn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new vu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return tr.setFromAxisAngle(e,t),this.quaternion.multiply(tr),this}rotateOnWorldAxis(e,t){return tr.setFromAxisAngle(e,t),this.quaternion.premultiply(tr),this}rotateX(e){return this.rotateOnAxis(Pc,e)}rotateY(e){return this.rotateOnAxis(Dc,e)}rotateZ(e){return this.rotateOnAxis(Ic,e)}translateOnAxis(e,t){return Lc.copy(e).applyQuaternion(this.quaternion),this.position.add(Lc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Pc,e)}translateY(e){return this.translateOnAxis(Dc,e)}translateZ(e){return this.translateOnAxis(Ic,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ni.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Ms.copy(e):Ms.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Wr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ni.lookAt(Wr,Ms,this.up):ni.lookAt(Ms,Wr,this.up),this.quaternion.setFromRotationMatrix(ni),r&&(ni.extractRotation(r.matrixWorld),tr.setFromRotationMatrix(ni),this.quaternion.premultiply(tr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(ot("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Nc),nr.child=e,this.dispatchEvent(nr),nr.child=null):ot("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(qm),$a.child=e,this.dispatchEvent($a),$a.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ni.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ni.multiply(e.parent.matrixWorld)),e.applyMatrix4(ni),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Nc),nr.child=e,this.dispatchEvent(nr),nr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Wr,e,Ym),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Wr,Km,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const d=c[l];s(e.shapes,d)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),d=a(e.shapes),u=a(e.skeletons),p=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=r,i;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}hn.DEFAULT_UP=new W(0,1,0);hn.DEFAULT_MATRIX_AUTO_UPDATE=!0;hn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class jr extends hn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const $m={type:"move"};class Za{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new jr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new jr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new W,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new W),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new jr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new W,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new W,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const v of e.hand.values()){const x=t.getJointPose(v,i),m=this._getHandJoint(l,v);x!==null&&(m.matrix.fromArray(x.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=x.radius),m.visible=x!==null}const h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=h.position.distanceTo(d.position),p=.02,g=.005;l.inputState.pinching&&u>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent($m)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new jr;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const _u={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},xi={h:0,s:0,l:0},Ss={h:0,s:0,l:0};function Ja(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class tt{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Tn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,it.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=it.workingColorSpace){return this.r=e,this.g=t,this.b=i,it.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=it.workingColorSpace){if(e=Fm(e,1),t=rt(t,0,1),i=rt(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=Ja(a,s,e+1/3),this.g=Ja(a,s,e),this.b=Ja(a,s,e-1/3)}return it.colorSpaceToWorking(this,r),this}setStyle(e,t=Tn){function i(s){s!==void 0&&parseFloat(s)<1&&Ge("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ge("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Ge("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Tn){const i=_u[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ge("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=hi(e.r),this.g=hi(e.g),this.b=hi(e.b),this}copyLinearToSRGB(e){return this.r=wr(e.r),this.g=wr(e.g),this.b=wr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Tn){return it.workingToColorSpace(rn.copy(this),e),Math.round(rt(rn.r*255,0,255))*65536+Math.round(rt(rn.g*255,0,255))*256+Math.round(rt(rn.b*255,0,255))}getHexString(e=Tn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=it.workingColorSpace){it.workingToColorSpace(rn.copy(this),t);const i=rn.r,r=rn.g,s=rn.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const d=a-o;switch(l=h<=.5?d/(a+o):d/(2-a-o),a){case i:c=(r-s)/d+(r<s?6:0);break;case r:c=(s-i)/d+2;break;case s:c=(i-r)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=it.workingColorSpace){return it.workingToColorSpace(rn.copy(this),t),e.r=rn.r,e.g=rn.g,e.b=rn.b,e}getStyle(e=Tn){it.workingToColorSpace(rn.copy(this),e);const t=rn.r,i=rn.g,r=rn.b;return e!==Tn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(xi),this.setHSL(xi.h+e,xi.s+t,xi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(xi),e.getHSL(Ss);const i=Va(xi.h,Ss.h,t),r=Va(xi.s,Ss.s,t),s=Va(xi.l,Ss.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const rn=new tt;tt.NAMES=_u;class Uc extends hn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new qi,this.environmentIntensity=1,this.environmentRotation=new qi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const In=new W,ii=new W,Qa=new W,ri=new W,ir=new W,rr=new W,Fc=new W,ja=new W,eo=new W,to=new W,no=new ht,io=new ht,ro=new ht;class Bn{constructor(e=new W,t=new W,i=new W){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),In.subVectors(e,t),r.cross(In);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){In.subVectors(r,t),ii.subVectors(i,t),Qa.subVectors(e,t);const a=In.dot(In),o=In.dot(ii),c=In.dot(Qa),l=ii.dot(ii),h=ii.dot(Qa),d=a*l-o*o;if(d===0)return s.set(0,0,0),null;const u=1/d,p=(l*c-o*h)*u,g=(a*h-o*c)*u;return s.set(1-p-g,g,p)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,ri)===null?!1:ri.x>=0&&ri.y>=0&&ri.x+ri.y<=1}static getInterpolation(e,t,i,r,s,a,o,c){return this.getBarycoord(e,t,i,r,ri)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,ri.x),c.addScaledVector(a,ri.y),c.addScaledVector(o,ri.z),c)}static getInterpolatedAttribute(e,t,i,r,s,a){return no.setScalar(0),io.setScalar(0),ro.setScalar(0),no.fromBufferAttribute(e,t),io.fromBufferAttribute(e,i),ro.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(no,s.x),a.addScaledVector(io,s.y),a.addScaledVector(ro,s.z),a}static isFrontFacing(e,t,i,r){return In.subVectors(i,t),ii.subVectors(e,t),In.cross(ii).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return In.subVectors(this.c,this.b),ii.subVectors(this.a,this.b),In.cross(ii).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Bn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Bn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return Bn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return Bn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Bn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;ir.subVectors(r,i),rr.subVectors(s,i),ja.subVectors(e,i);const c=ir.dot(ja),l=rr.dot(ja);if(c<=0&&l<=0)return t.copy(i);eo.subVectors(e,r);const h=ir.dot(eo),d=rr.dot(eo);if(h>=0&&d<=h)return t.copy(r);const u=c*d-h*l;if(u<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(i).addScaledVector(ir,a);to.subVectors(e,s);const p=ir.dot(to),g=rr.dot(to);if(g>=0&&p<=g)return t.copy(s);const v=p*l-c*g;if(v<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(i).addScaledVector(rr,o);const x=h*g-p*d;if(x<=0&&d-h>=0&&p-g>=0)return Fc.subVectors(s,r),o=(d-h)/(d-h+(p-g)),t.copy(r).addScaledVector(Fc,o);const m=1/(x+v+u);return a=v*m,o=u*m,t.copy(i).addScaledVector(ir,a).addScaledVector(rr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Ur{constructor(e=new W(1/0,1/0,1/0),t=new W(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Nn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Nn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Nn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Nn):Nn.fromBufferAttribute(s,a),Nn.applyMatrix4(e.matrixWorld),this.expandByPoint(Nn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),bs.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),bs.copy(i.boundingBox)),bs.applyMatrix4(e.matrixWorld),this.union(bs)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Nn),Nn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Vr),ys.subVectors(this.max,Vr),sr.subVectors(e.a,Vr),ar.subVectors(e.b,Vr),or.subVectors(e.c,Vr),vi.subVectors(ar,sr),_i.subVectors(or,ar),Pi.subVectors(sr,or);let t=[0,-vi.z,vi.y,0,-_i.z,_i.y,0,-Pi.z,Pi.y,vi.z,0,-vi.x,_i.z,0,-_i.x,Pi.z,0,-Pi.x,-vi.y,vi.x,0,-_i.y,_i.x,0,-Pi.y,Pi.x,0];return!so(t,sr,ar,or,ys)||(t=[1,0,0,0,1,0,0,0,1],!so(t,sr,ar,or,ys))?!1:(ws.crossVectors(vi,_i),t=[ws.x,ws.y,ws.z],so(t,sr,ar,or,ys))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Nn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Nn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(si[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),si[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),si[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),si[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),si[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),si[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),si[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),si[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(si),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const si=[new W,new W,new W,new W,new W,new W,new W,new W],Nn=new W,bs=new Ur,sr=new W,ar=new W,or=new W,vi=new W,_i=new W,Pi=new W,Vr=new W,ys=new W,ws=new W,Di=new W;function so(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){Di.fromArray(n,s);const o=r.x*Math.abs(Di.x)+r.y*Math.abs(Di.y)+r.z*Math.abs(Di.z),c=e.dot(Di),l=t.dot(Di),h=i.dot(Di);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const Wt=new W,Es=new We;let Zm=0;class bn extends $i{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Zm++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Pm,this.updateRanges=[],this.gpuType=qn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Es.fromBufferAttribute(this,t),Es.applyMatrix3(e),this.setXY(t,Es.x,Es.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Wt.fromBufferAttribute(this,t),Wt.applyMatrix3(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Wt.fromBufferAttribute(this,t),Wt.applyMatrix4(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Wt.fromBufferAttribute(this,t),Wt.applyNormalMatrix(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Wt.fromBufferAttribute(this,t),Wt.transformDirection(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Hr(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=un(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Hr(t,this.array)),t}setX(e,t){return this.normalized&&(t=un(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Hr(t,this.array)),t}setY(e,t){return this.normalized&&(t=un(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Hr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=un(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Hr(t,this.array)),t}setW(e,t){return this.normalized&&(t=un(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=un(t,this.array),i=un(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=un(t,this.array),i=un(i,this.array),r=un(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=un(t,this.array),i=un(i,this.array),r=un(r,this.array),s=un(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class Mu extends bn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Su extends bn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class It extends bn{constructor(e,t,i){super(new Float32Array(e),t,i)}}const Jm=new Ur,Xr=new W,ao=new W;class hs{constructor(e=new W,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Jm.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Xr.subVectors(e,this.center);const t=Xr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Xr,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ao.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Xr.copy(e.center).add(ao)),this.expandByPoint(Xr.copy(e.center).sub(ao))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Qm=0;const An=new Nt,oo=new hn,lr=new W,gn=new Ur,Yr=new Ur,Zt=new W;class Yt extends $i{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Qm++}),this.uuid=cs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Dm(e)?Su:Mu)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ve().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return An.makeRotationFromQuaternion(e),this.applyMatrix4(An),this}rotateX(e){return An.makeRotationX(e),this.applyMatrix4(An),this}rotateY(e){return An.makeRotationY(e),this.applyMatrix4(An),this}rotateZ(e){return An.makeRotationZ(e),this.applyMatrix4(An),this}translate(e,t,i){return An.makeTranslation(e,t,i),this.applyMatrix4(An),this}scale(e,t,i){return An.makeScale(e,t,i),this.applyMatrix4(An),this}lookAt(e){return oo.lookAt(e),oo.updateMatrix(),this.applyMatrix4(oo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(lr).negate(),this.translate(lr.x,lr.y,lr.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new It(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Ge("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ur);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ot("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new W(-1/0,-1/0,-1/0),new W(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];gn.setFromBufferAttribute(s),this.morphTargetsRelative?(Zt.addVectors(this.boundingBox.min,gn.min),this.boundingBox.expandByPoint(Zt),Zt.addVectors(this.boundingBox.max,gn.max),this.boundingBox.expandByPoint(Zt)):(this.boundingBox.expandByPoint(gn.min),this.boundingBox.expandByPoint(gn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ot('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new hs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ot("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new W,1/0);return}if(e){const i=this.boundingSphere.center;if(gn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Yr.setFromBufferAttribute(o),this.morphTargetsRelative?(Zt.addVectors(gn.min,Yr.min),gn.expandByPoint(Zt),Zt.addVectors(gn.max,Yr.max),gn.expandByPoint(Zt)):(gn.expandByPoint(Yr.min),gn.expandByPoint(Yr.max))}gn.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Zt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Zt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Zt.fromBufferAttribute(o,l),c&&(lr.fromBufferAttribute(e,l),Zt.add(lr)),r=Math.max(r,i.distanceToSquared(Zt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&ot('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){ot("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new bn(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],c=[];for(let b=0;b<i.count;b++)o[b]=new W,c[b]=new W;const l=new W,h=new W,d=new W,u=new We,p=new We,g=new We,v=new W,x=new W;function m(b,A,P){l.fromBufferAttribute(i,b),h.fromBufferAttribute(i,A),d.fromBufferAttribute(i,P),u.fromBufferAttribute(s,b),p.fromBufferAttribute(s,A),g.fromBufferAttribute(s,P),h.sub(l),d.sub(l),p.sub(u),g.sub(u);const C=1/(p.x*g.y-g.x*p.y);isFinite(C)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(C),x.copy(d).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(C),o[b].add(v),o[A].add(v),o[P].add(v),c[b].add(x),c[A].add(x),c[P].add(x))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let b=0,A=_.length;b<A;++b){const P=_[b],C=P.start,N=P.count;for(let U=C,D=C+N;U<D;U+=3)m(e.getX(U+0),e.getX(U+1),e.getX(U+2))}const M=new W,S=new W,w=new W,E=new W;function L(b){w.fromBufferAttribute(r,b),E.copy(w);const A=o[b];M.copy(A),M.sub(w.multiplyScalar(w.dot(A))).normalize(),S.crossVectors(E,A);const C=S.dot(c[b])<0?-1:1;a.setXYZW(b,M.x,M.y,M.z,C)}for(let b=0,A=_.length;b<A;++b){const P=_[b],C=P.start,N=P.count;for(let U=C,D=C+N;U<D;U+=3)L(e.getX(U+0)),L(e.getX(U+1)),L(e.getX(U+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new bn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,p=i.count;u<p;u++)i.setXYZ(u,0,0,0);const r=new W,s=new W,a=new W,o=new W,c=new W,l=new W,h=new W,d=new W;if(e)for(let u=0,p=e.count;u<p;u+=3){const g=e.getX(u+0),v=e.getX(u+1),x=e.getX(u+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,x),h.subVectors(a,s),d.subVectors(r,s),h.cross(d),o.fromBufferAttribute(i,g),c.fromBufferAttribute(i,v),l.fromBufferAttribute(i,x),o.add(h),c.add(h),l.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(v,c.x,c.y,c.z),i.setXYZ(x,l.x,l.y,l.z)}else for(let u=0,p=t.count;u<p;u+=3)r.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,s),d.subVectors(r,s),h.cross(d),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Zt.fromBufferAttribute(e,t),Zt.normalize(),e.setXYZ(t,Zt.x,Zt.y,Zt.z)}toNonIndexed(){function e(o,c){const l=o.array,h=o.itemSize,d=o.normalized,u=new l.constructor(c.length*h);let p=0,g=0;for(let v=0,x=c.length;v<x;v++){o.isInterleavedBufferAttribute?p=c[v]*o.data.stride+o.offset:p=c[v]*h;for(let m=0;m<h;m++)u[g++]=l[p++]}return new bn(u,h,d)}if(this.index===null)return Ge("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Yt,i=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=e(c,i);t.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let h=0,d=l.length;h<d;h++){const u=l[h],p=e(u,i);c.push(p)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let d=0,u=l.length;d<u;d++){const p=l[d];h.push(p.toJSON(e.data))}h.length>0&&(r[c]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const l in r){const h=r[l];this.setAttribute(l,h.clone(t))}const s=e.morphAttributes;for(const l in s){const h=[],d=s[l];for(let u=0,p=d.length;u<p;u++)h.push(d[u].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,h=a.length;l<h;l++){const d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const lo=new W,jm=new W,eg=new Ve;class bi{constructor(e=new W(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=lo.subVectors(i,t).cross(jm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const r=e.delta(lo),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||eg.getNormalMatrix(e),r=this.coplanarPoint(lo).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let tg=0;class Fr extends $i{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:tg++}),this.uuid=cs(),this.name="",this.type="Material",this.blending=Sr,this.side=Xi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Qh,this.blendDst=jh,this.blendEquation=mr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new tt(0,0,0),this.blendAlpha=0,this.depthFunc=is,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=wm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ha,this.stencilZFail=Ha,this.stencilZPass=Ha,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Ge(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ge(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new tt().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new bi().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new We().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new We().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const ai=new W,co=new W,As=new W,Ts=new W;class Wl{constructor(e=new W,t=new W(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ai)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ai.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ai.copy(this.origin).addScaledVector(this.direction,t),ai.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){co.copy(e).add(t).multiplyScalar(.5),As.copy(t).sub(e).normalize(),Ts.copy(this.origin).sub(co);const s=e.distanceTo(t)*.5,a=-this.direction.dot(As),o=Ts.dot(this.direction),c=-Ts.dot(As),l=Ts.lengthSq(),h=Math.abs(1-a*a);let d,u,p,g;if(h>0)if(d=a*c-o,u=a*o-c,g=s*h,d>=0)if(u>=-g)if(u<=g){const v=1/h;d*=v,u*=v,p=d*(d+a*u+2*o)+u*(a*d+u+2*c)+l}else u=s,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*c)+l;else u=-s,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*c)+l;else u<=-g?(d=Math.max(0,-(-a*s+o)),u=d>0?-s:Math.min(Math.max(-s,-c),s),p=-d*d+u*(u+2*c)+l):u<=g?(d=0,u=Math.min(Math.max(-s,-c),s),p=u*(u+2*c)+l):(d=Math.max(0,-(a*s+o)),u=d>0?s:Math.min(Math.max(-s,-c),s),p=-d*d+u*(u+2*c)+l);else u=a>0?-s:s,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(co).addScaledVector(As,u),p}intersectSphere(e,t){if(e.radius<0)return null;ai.subVectors(e.center,this.origin);const i=ai.dot(this.direction),r=ai.dot(ai)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(i=(e.min.x-u.x)*l,r=(e.max.x-u.x)*l):(i=(e.max.x-u.x)*l,r=(e.min.x-u.x)*l),h>=0?(s=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(s=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),d>=0?(o=(e.min.z-u.z)*d,c=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,c=(e.min.z-u.z)*d),i>c||o>r)||((o>i||i!==i)&&(i=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,ai)!==null}intersectTriangle(e,t,i,r,s){const a=this.origin,o=this.direction,c=o.x,l=o.y,h=o.z,d=e.x-a.x,u=e.y-a.y,p=e.z-a.z,g=t.x-a.x,v=t.y-a.y,x=t.z-a.z,m=i.x-a.x,_=i.y-a.y,M=i.z-a.z,S=Math.abs(c),w=Math.abs(l),E=Math.abs(h);let L,b,A,P,C,N,U,D,F,z,X,Q;if(S>=w&&S>=E?(A=c,N=d,F=g,Q=m,c>=0?(L=l,b=h,P=u,C=p,U=v,D=x,z=_,X=M):(L=h,b=l,P=p,C=u,U=x,D=v,z=M,X=_)):w>=E?(A=l,N=u,F=v,Q=_,l>=0?(L=h,b=c,P=p,C=d,U=x,D=g,z=M,X=m):(L=c,b=h,P=d,C=p,U=g,D=x,z=m,X=M)):(A=h,N=p,F=x,Q=M,h>=0?(L=c,b=l,P=d,C=u,U=g,D=v,z=m,X=_):(L=l,b=c,P=u,C=d,U=v,D=g,z=_,X=m)),A===0)return null;const Y=L/A,te=b/A,O=1/A,ne=P-Y*N,ce=C-te*N,be=U-Y*F,Ue=D-te*F,ke=z-Y*Q,ee=X-te*Q,se=ke*Ue-ee*be,V=ne*ee-ce*ke,he=be*ce-Ue*ne;if(r){if(se<0||V<0||he<0)return null}else if((se<0||V<0||he<0)&&(se>0||V>0||he>0))return null;const ae=se+V+he;if(ae===0)return null;const Ee=O*(se*N+V*F+he*Q);return(ae>0?Ee<0:Ee>0)?null:this.at(Ee/ae,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class bu extends Fr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new tt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qi,this.combine=eu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Oc=new Nt,Ii=new Wl,Rs=new hs,Bc=new W,Cs=new W,Ls=new W,Ps=new W,ho=new W,Ds=new W,zc=new W,Is=new W;class Jt extends hn{constructor(e=new Yt,t=new bu){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Ds.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const h=o[c],d=s[c];h!==0&&(ho.fromBufferAttribute(d,e),a?Ds.addScaledVector(ho,h):Ds.addScaledVector(ho.sub(t),h))}t.add(Ds)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Rs.copy(i.boundingSphere),Rs.applyMatrix4(s),Ii.copy(e.ray).recast(e.near),!(Rs.containsPoint(Ii.origin)===!1&&(Ii.intersectSphere(Rs,Bc)===null||Ii.origin.distanceToSquared(Bc)>(e.far-e.near)**2))&&(Oc.copy(s).invert(),Ii.copy(e.ray).applyMatrix4(Oc),!(i.boundingBox!==null&&Ii.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Ii)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,d=s.attributes.normal,u=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=u.length;g<v;g++){const x=u[g],m=a[x.materialIndex],_=Math.max(x.start,p.start),M=Math.min(o.count,Math.min(x.start+x.count,p.start+p.count));for(let S=_,w=M;S<w;S+=3){const E=o.getX(S),L=o.getX(S+1),b=o.getX(S+2);r=Ns(this,m,e,i,l,h,d,E,L,b),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=x.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),v=Math.min(o.count,p.start+p.count);for(let x=g,m=v;x<m;x+=3){const _=o.getX(x),M=o.getX(x+1),S=o.getX(x+2);r=Ns(this,a,e,i,l,h,d,_,M,S),r&&(r.faceIndex=Math.floor(x/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,v=u.length;g<v;g++){const x=u[g],m=a[x.materialIndex],_=Math.max(x.start,p.start),M=Math.min(c.count,Math.min(x.start+x.count,p.start+p.count));for(let S=_,w=M;S<w;S+=3){const E=S,L=S+1,b=S+2;r=Ns(this,m,e,i,l,h,d,E,L,b),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=x.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),v=Math.min(c.count,p.start+p.count);for(let x=g,m=v;x<m;x+=3){const _=x,M=x+1,S=x+2;r=Ns(this,a,e,i,l,h,d,_,M,S),r&&(r.faceIndex=Math.floor(x/3),t.push(r))}}}}function ng(n,e,t,i,r,s,a,o){let c;if(e.side===dn?c=i.intersectTriangle(a,s,r,!0,o):c=i.intersectTriangle(r,s,a,e.side===Xi,o),c===null)return null;Is.copy(o),Is.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Is);return l<t.near||l>t.far?null:{distance:l,point:Is.clone(),object:n}}function Ns(n,e,t,i,r,s,a,o,c,l){n.getVertexPosition(o,Cs),n.getVertexPosition(c,Ls),n.getVertexPosition(l,Ps);const h=ng(n,e,t,i,Cs,Ls,Ps,zc);if(h){const d=new W;Bn.getBarycoord(zc,Cs,Ls,Ps,d),r&&(h.uv=Bn.getInterpolatedAttribute(r,o,c,l,d,new We)),s&&(h.uv1=Bn.getInterpolatedAttribute(s,o,c,l,d,new We)),a&&(h.normal=Bn.getInterpolatedAttribute(a,o,c,l,d,new W),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:c,c:l,normal:new W,materialIndex:0};Bn.getNormal(Cs,Ls,Ps,u.normal),h.face=u,h.barycoord=d}return h}class xr extends an{constructor(e=null,t=1,i=1,r,s,a,o,c,l=kt,h=kt,d,u){super(null,a,o,c,l,h,r,s,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Vl extends bn{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ni=new hs,ig=new We(.5,.5),Us=new W;class fa{constructor(e=new bi,t=new bi,i=new bi,r=new bi,s=new bi,a=new bi){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=$n,i=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],h=s[4],d=s[5],u=s[6],p=s[7],g=s[8],v=s[9],x=s[10],m=s[11],_=s[12],M=s[13],S=s[14],w=s[15];if(r[0].setComponents(l-a,p-h,m-g,w-_).normalize(),r[1].setComponents(l+a,p+h,m+g,w+_).normalize(),r[2].setComponents(l+o,p+d,m+v,w+M).normalize(),r[3].setComponents(l-o,p-d,m-v,w-M).normalize(),i)r[4].setComponents(c,u,x,S).normalize(),r[5].setComponents(l-c,p-u,m-x,w-S).normalize();else if(r[4].setComponents(l-c,p-u,m-x,w-S).normalize(),t===$n)r[5].setComponents(l+c,p+u,m+x,w+S).normalize();else if(t===ua)r[5].setComponents(c,u,x,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ni.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ni.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ni)}intersectsSprite(e){Ni.center.set(0,0,0);const t=ig.distanceTo(e.center);return Ni.radius=.7071067811865476+t,Ni.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ni)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Us.x=r.normal.x>0?e.max.x:e.min.x,Us.y=r.normal.y>0?e.max.y:e.min.y,Us.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Us)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class yu extends Fr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new tt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const pa=new W,ma=new W,kc=new Nt,Kr=new Wl,Fs=new hs,uo=new W,Gc=new W;class rg extends hn{constructor(e=new Yt,t=new yu){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)pa.fromBufferAttribute(t,r-1),ma.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=pa.distanceTo(ma);e.setAttribute("lineDistance",new It(i,1))}else Ge("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Fs.copy(i.boundingSphere),Fs.applyMatrix4(r),Fs.radius+=s,e.ray.intersectsSphere(Fs)===!1)return;kc.copy(r).invert(),Kr.copy(e.ray).applyMatrix4(kc);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=i.index,u=i.attributes.position;if(h!==null){const p=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let v=p,x=g-1;v<x;v+=l){const m=h.getX(v),_=h.getX(v+1),M=Os(this,e,Kr,c,m,_,v);M&&t.push(M)}if(this.isLineLoop){const v=h.getX(g-1),x=h.getX(p),m=Os(this,e,Kr,c,v,x,g-1);m&&t.push(m)}}else{const p=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let v=p,x=g-1;v<x;v+=l){const m=Os(this,e,Kr,c,v,v+1,v);m&&t.push(m)}if(this.isLineLoop){const v=Os(this,e,Kr,c,g-1,p,g-1);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Os(n,e,t,i,r,s,a){const o=n.geometry.attributes.position;if(pa.fromBufferAttribute(o,r),ma.fromBufferAttribute(o,s),t.distanceSqToSegment(pa,ma,uo,Gc)>i)return;uo.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(uo);if(!(l<e.near||l>e.far))return{distance:l,point:Gc.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}const Hc=new W,Wc=new W;class Xl extends rg{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let r=0,s=t.count;r<s;r+=2)Hc.fromBufferAttribute(t,r),Wc.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Hc.distanceTo(Wc);e.setAttribute("lineDistance",new It(i,1))}else Ge("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class sg extends Fr{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new tt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Vc=new Nt,ml=new Wl,Bs=new hs,zs=new W;class ga extends hn{constructor(e=new Yt,t=new sg){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Bs.copy(i.boundingSphere),Bs.applyMatrix4(r),Bs.radius+=s,e.ray.intersectsSphere(Bs)===!1)return;Vc.copy(r).invert(),ml.copy(e.ray).applyMatrix4(Vc);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=i.index,d=i.attributes.position;if(l!==null){const u=Math.max(0,a.start),p=Math.min(l.count,a.start+a.count);for(let g=u,v=p;g<v;g++){const x=l.getX(g);zs.fromBufferAttribute(d,x),Xc(zs,x,c,r,e,t,this)}}else{const u=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let g=u,v=p;g<v;g++)zs.fromBufferAttribute(d,g),Xc(zs,g,c,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Xc(n,e,t,i,r,s,a){const o=ml.distanceSqToPoint(n);if(o<t){const c=new W;ml.closestPointToPoint(n,c),c.applyMatrix4(i);const l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class wu extends an{constructor(e=[],t=Yi,i,r,s,a,o,c,l,h){super(e,t,i,r,s,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ag extends an{constructor(e,t,i,r,s,a,o,c,l){super(e,t,i,r,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Lr extends an{constructor(e,t,i=Qn,r,s,a,o=kt,c=kt,l,h=ui,d=1){if(h!==ui&&h!==Gi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:d};super(u,r,s,a,o,c,h,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Hl(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class og extends Lr{constructor(e,t=Qn,i=Yi,r,s,a=kt,o=kt,c,l=ui){const h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,t,i,r,s,a,o,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Eu extends an{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class us extends Yt{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],h=[],d=[];let u=0,p=0;g("z","y","x",-1,-1,i,t,e,a,s,0),g("z","y","x",1,-1,i,t,-e,a,s,1),g("x","z","y",1,1,e,i,t,r,a,2),g("x","z","y",1,-1,e,i,-t,r,a,3),g("x","y","z",1,-1,e,t,i,r,s,4),g("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new It(l,3)),this.setAttribute("normal",new It(h,3)),this.setAttribute("uv",new It(d,2));function g(v,x,m,_,M,S,w,E,L,b,A){const P=S/L,C=w/b,N=S/2,U=w/2,D=E/2,F=L+1,z=b+1;let X=0,Q=0;const Y=new W;for(let te=0;te<z;te++){const O=te*C-U;for(let ne=0;ne<F;ne++){const ce=ne*P-N;Y[v]=ce*_,Y[x]=O*M,Y[m]=D,l.push(Y.x,Y.y,Y.z),Y[v]=0,Y[x]=0,Y[m]=E>0?1:-1,h.push(Y.x,Y.y,Y.z),d.push(ne/L),d.push(1-te/b),X+=1}}for(let te=0;te<b;te++)for(let O=0;O<L;O++){const ne=u+O+F*te,ce=u+O+F*(te+1),be=u+(O+1)+F*(te+1),Ue=u+(O+1)+F*te;c.push(ne,ce,Ue),c.push(ce,be,Ue),Q+=6}o.addGroup(p,Q,A),p+=Q,u+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new us(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class wn extends Yt{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),c=Math.floor(r),l=o+1,h=c+1,d=e/o,u=t/c,p=[],g=[],v=[],x=[];for(let m=0;m<h;m++){const _=m*u-a;for(let M=0;M<l;M++){const S=M*d-s;g.push(S,-_,0),v.push(0,0,1),x.push(M/o),x.push(1-m/c)}}for(let m=0;m<c;m++)for(let _=0;_<o;_++){const M=_+l*m,S=_+l*(m+1),w=_+1+l*(m+1),E=_+1+l*m;p.push(M,S,E),p.push(S,w,E)}this.setIndex(p),this.setAttribute("position",new It(g,3)),this.setAttribute("normal",new It(v,3)),this.setAttribute("uv",new It(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wn(e.width,e.height,e.widthSegments,e.heightSegments)}}function Pr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];if(Yc(r))r.isRenderTargetTexture?(Ge("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(Yc(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function ln(n){const e={};for(let t=0;t<n.length;t++){const i=Pr(n[t]);for(const r in i)e[r]=i[r]}return e}function Yc(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function lg(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Au(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:it.workingColorSpace}const cg={clone:Pr,merge:ln};var hg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ug=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Rt extends Fr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=hg,this.fragmentShader=ug,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Pr(e.uniforms),this.uniformsGroups=lg(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new tt().setHex(r.value);break;case"v2":this.uniforms[i].value=new We().fromArray(r.value);break;case"v3":this.uniforms[i].value=new W().fromArray(r.value);break;case"v4":this.uniforms[i].value=new ht().fromArray(r.value);break;case"m3":this.uniforms[i].value=new Ve().fromArray(r.value);break;case"m4":this.uniforms[i].value=new Nt().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class dg extends Rt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class fg extends Fr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=bm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class pg extends Fr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const ks=new W,Gs=new Nr,Vn=new W;class Tu extends hn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Nt,this.projectionMatrix=new Nt,this.projectionMatrixInverse=new Nt,this.coordinateSystem=$n,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ks,Gs,Vn),Vn.x===1&&Vn.y===1&&Vn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ks,Gs,Vn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(ks,Gs,Vn),Vn.x===1&&Vn.y===1&&Vn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ks,Gs,Vn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Mi=new W,Kc=new We,qc=new We;class xn extends Tu{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=pl*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Wa*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return pl*2*Math.atan(Math.tan(Wa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Mi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Mi.x,Mi.y).multiplyScalar(-e/Mi.z),Mi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Mi.x,Mi.y).multiplyScalar(-e/Mi.z)}getViewSize(e,t){return this.getViewBounds(e,Kc,qc),t.subVectors(qc,Kc)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Wa*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,t-=a.offsetY*i/l,r*=a.width/c,i*=a.height/l}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Yl extends Tu{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Kl extends Yt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}const cr=-90,hr=1;class mg extends hn{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new xn(cr,hr,e,t);r.layers=this.layers,this.add(r);const s=new xn(cr,hr,e,t);s.layers=this.layers,this.add(s);const a=new xn(cr,hr,e,t);a.layers=this.layers,this.add(a);const o=new xn(cr,hr,e,t);o.layers=this.layers,this.add(o);const c=new xn(cr,hr,e,t);c.layers=this.layers,this.add(c);const l=new xn(cr,hr,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,c]=t;for(const l of t)this.remove(l);if(e===$n)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===ua)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let x=!1;e.isWebGLRenderer===!0?x=e.state.buffers.depth.getReversed():x=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,r),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,r),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,4,r),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,r),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(d,u,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class gg extends xn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Ru{static{Ru.prototype.isMatrix2=!0}constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}}function $c(n,e,t,i){const r=xg(i);switch(t){case fu:return n*e;case mu:return n*e/r.components*r.byteLength;case Ol:return n*e/r.components*r.byteLength;case Ki:return n*e*2/r.components*r.byteLength;case Bl:return n*e*2/r.components*r.byteLength;case pu:return n*e*3/r.components*r.byteLength;case _n:return n*e*4/r.components*r.byteLength;case zl:return n*e*4/r.components*r.byteLength;case js:case ea:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ta:case na:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case zo:case Go:return Math.max(n,16)*Math.max(e,8)/4;case Bo:case ko:return Math.max(n,8)*Math.max(e,8)/2;case Ho:case Wo:case Xo:case Yo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Vo:case la:case Ko:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case qo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case $o:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Zo:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Jo:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Qo:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case jo:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case el:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case tl:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case nl:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case il:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case rl:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case sl:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case al:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case ol:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case ll:case cl:case hl:return Math.ceil(n/4)*Math.ceil(e/4)*16;case ul:case dl:return Math.ceil(n/4)*Math.ceil(e/4)*8;case ca:case fl:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function xg(n){switch(n){case vn:case cu:return{byteLength:1,components:1};case rs:case hu:case jn:return{byteLength:2,components:1};case Ul:case Fl:return{byteLength:2,components:4};case Qn:case Nl:case qn:return{byteLength:4,components:1};case uu:case du:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ll}}));typeof window<"u"&&(window.__THREE__?Ge("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ll);function Cu(){let n=null,e=!1,t=null,i=null;function r(s,a){i=n.requestAnimationFrame(r),t(s,a)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function vg(n){const e=new WeakMap;function t(o,c){const l=o.array,h=o.usage,d=l.byteLength,u=n.createBuffer();n.bindBuffer(c,u),n.bufferData(c,l,h),o.onUploadCallback();let p;if(l instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=n.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=n.SHORT;else if(l instanceof Uint32Array)p=n.UNSIGNED_INT;else if(l instanceof Int32Array)p=n.INT;else if(l instanceof Int8Array)p=n.BYTE;else if(l instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,c,l){const h=c.array,d=c.updateRanges;if(n.bindBuffer(l,o),d.length===0)n.bufferSubData(l,0,h);else{d.sort((p,g)=>p.start-g.start);let u=0;for(let p=1;p<d.length;p++){const g=d[u],v=d[p];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++u,d[u]=v)}d.length=u+1;for(let p=0,g=d.length;p<g;p++){const v=d[p];n.bufferSubData(l,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(n.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:r,remove:s,update:a}}var _g=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Mg=`#ifdef USE_ALPHAHASH
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
#endif`,Sg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,bg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,yg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,wg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Eg=`#ifdef USE_AOMAP
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
#endif`,Ag=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Tg=`#ifdef USE_BATCHING
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
#endif`,Rg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Cg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Lg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Pg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Dg=`#ifdef USE_IRIDESCENCE
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
#endif`,Ig=`#ifdef USE_BUMPMAP
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
#endif`,Ng=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Ug=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Fg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Og=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Bg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,zg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,kg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Gg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Hg=`#define PI 3.141592653589793
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
} // validated`,Wg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Vg=`vec3 transformedNormal = objectNormal;
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
#endif`,Xg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Yg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Kg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,qg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,$g="gl_FragColor = linearToOutputTexel( gl_FragColor );",Zg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Jg=`#ifdef USE_ENVMAP
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
#endif`,Qg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,jg=`#ifdef USE_ENVMAP
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
#endif`,e1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,t1=`#ifdef USE_ENVMAP
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
#endif`,n1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,i1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,r1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,s1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,a1=`#ifdef USE_GRADIENTMAP
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
}`,o1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,l1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,c1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,h1=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,u1=`#ifdef USE_ENVMAP
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
#endif`,d1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,f1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,p1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,m1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,g1=`PhysicalMaterial material;
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
#endif`,x1=`uniform sampler2D dfgLUT;
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
}`,v1=`
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
#endif`,_1=`#if defined( RE_IndirectDiffuse )
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
#endif`,M1=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,S1=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,b1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,y1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,w1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,E1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,A1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,T1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,R1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,C1=`#if defined( USE_POINTS_UV )
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
#endif`,L1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,P1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,D1=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,I1=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,N1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,U1=`#ifdef USE_MORPHTARGETS
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
#endif`,F1=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,O1=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,B1=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,z1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,k1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,G1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,H1=`#ifdef USE_NORMALMAP
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
#endif`,W1=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,V1=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,X1=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Y1=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,K1=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,q1=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,$1=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Z1=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,J1=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Q1=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,j1=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ex=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,tx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,nx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ix=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,rx=`float getShadowMask() {
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
}`,sx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ax=`#ifdef USE_SKINNING
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
#endif`,ox=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,lx=`#ifdef USE_SKINNING
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
#endif`,cx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,hx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ux=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,dx=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,fx=`#ifdef USE_TRANSMISSION
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
#endif`,px=`#ifdef USE_TRANSMISSION
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
#endif`,mx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,gx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const _x=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Mx=`uniform sampler2D t2D;
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
}`,Sx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bx=`#ifdef ENVMAP_TYPE_CUBE
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
}`,yx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ex=`#include <common>
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
}`,Ax=`#if DEPTH_PACKING == 3200
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
}`,Tx=`#define DISTANCE
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
}`,Rx=`#define DISTANCE
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
}`,Cx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Lx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Px=`uniform float scale;
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
}`,Dx=`uniform vec3 diffuse;
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
}`,Ix=`#include <common>
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
}`,Nx=`uniform vec3 diffuse;
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
}`,Ux=`#define LAMBERT
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
}`,Fx=`#define LAMBERT
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
}`,Ox=`#define MATCAP
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
}`,Bx=`#define MATCAP
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
}`,zx=`#define NORMAL
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
}`,kx=`#define NORMAL
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
}`,Gx=`#define PHONG
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
}`,Hx=`#define PHONG
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
}`,Wx=`#define STANDARD
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
}`,Vx=`#define STANDARD
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
}`,Xx=`#define TOON
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
}`,Yx=`#define TOON
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
}`,Kx=`uniform float size;
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
}`,qx=`uniform vec3 diffuse;
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
}`,$x=`#include <common>
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
}`,Zx=`uniform vec3 color;
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
}`,Jx=`uniform float rotation;
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
}`,Qx=`uniform vec3 diffuse;
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
}`,et={alphahash_fragment:_g,alphahash_pars_fragment:Mg,alphamap_fragment:Sg,alphamap_pars_fragment:bg,alphatest_fragment:yg,alphatest_pars_fragment:wg,aomap_fragment:Eg,aomap_pars_fragment:Ag,batching_pars_vertex:Tg,batching_vertex:Rg,begin_vertex:Cg,beginnormal_vertex:Lg,bsdfs:Pg,iridescence_fragment:Dg,bumpmap_pars_fragment:Ig,clipping_planes_fragment:Ng,clipping_planes_pars_fragment:Ug,clipping_planes_pars_vertex:Fg,clipping_planes_vertex:Og,color_fragment:Bg,color_pars_fragment:zg,color_pars_vertex:kg,color_vertex:Gg,common:Hg,cube_uv_reflection_fragment:Wg,defaultnormal_vertex:Vg,displacementmap_pars_vertex:Xg,displacementmap_vertex:Yg,emissivemap_fragment:Kg,emissivemap_pars_fragment:qg,colorspace_fragment:$g,colorspace_pars_fragment:Zg,envmap_fragment:Jg,envmap_common_pars_fragment:Qg,envmap_pars_fragment:jg,envmap_pars_vertex:e1,envmap_physical_pars_fragment:u1,envmap_vertex:t1,fog_vertex:n1,fog_pars_vertex:i1,fog_fragment:r1,fog_pars_fragment:s1,gradientmap_pars_fragment:a1,lightmap_pars_fragment:o1,lights_lambert_fragment:l1,lights_lambert_pars_fragment:c1,lights_pars_begin:h1,lights_toon_fragment:d1,lights_toon_pars_fragment:f1,lights_phong_fragment:p1,lights_phong_pars_fragment:m1,lights_physical_fragment:g1,lights_physical_pars_fragment:x1,lights_fragment_begin:v1,lights_fragment_maps:_1,lights_fragment_end:M1,lightprobes_pars_fragment:S1,logdepthbuf_fragment:b1,logdepthbuf_pars_fragment:y1,logdepthbuf_pars_vertex:w1,logdepthbuf_vertex:E1,map_fragment:A1,map_pars_fragment:T1,map_particle_fragment:R1,map_particle_pars_fragment:C1,metalnessmap_fragment:L1,metalnessmap_pars_fragment:P1,morphinstance_vertex:D1,morphcolor_vertex:I1,morphnormal_vertex:N1,morphtarget_pars_vertex:U1,morphtarget_vertex:F1,normal_fragment_begin:O1,normal_fragment_maps:B1,normal_pars_fragment:z1,normal_pars_vertex:k1,normal_vertex:G1,normalmap_pars_fragment:H1,clearcoat_normal_fragment_begin:W1,clearcoat_normal_fragment_maps:V1,clearcoat_pars_fragment:X1,iridescence_pars_fragment:Y1,opaque_fragment:K1,packing:q1,premultiplied_alpha_fragment:$1,project_vertex:Z1,dithering_fragment:J1,dithering_pars_fragment:Q1,roughnessmap_fragment:j1,roughnessmap_pars_fragment:ex,shadowmap_pars_fragment:tx,shadowmap_pars_vertex:nx,shadowmap_vertex:ix,shadowmask_pars_fragment:rx,skinbase_vertex:sx,skinning_pars_vertex:ax,skinning_vertex:ox,skinnormal_vertex:lx,specularmap_fragment:cx,specularmap_pars_fragment:hx,tonemapping_fragment:ux,tonemapping_pars_fragment:dx,transmission_fragment:fx,transmission_pars_fragment:px,uv_pars_fragment:mx,uv_pars_vertex:gx,uv_vertex:xx,worldpos_vertex:vx,background_vert:_x,background_frag:Mx,backgroundCube_vert:Sx,backgroundCube_frag:bx,cube_vert:yx,cube_frag:wx,depth_vert:Ex,depth_frag:Ax,distance_vert:Tx,distance_frag:Rx,equirect_vert:Cx,equirect_frag:Lx,linedashed_vert:Px,linedashed_frag:Dx,meshbasic_vert:Ix,meshbasic_frag:Nx,meshlambert_vert:Ux,meshlambert_frag:Fx,meshmatcap_vert:Ox,meshmatcap_frag:Bx,meshnormal_vert:zx,meshnormal_frag:kx,meshphong_vert:Gx,meshphong_frag:Hx,meshphysical_vert:Wx,meshphysical_frag:Vx,meshtoon_vert:Xx,meshtoon_frag:Yx,points_vert:Kx,points_frag:qx,shadow_vert:$x,shadow_frag:Zx,sprite_vert:Jx,sprite_frag:Qx},ve={common:{diffuse:{value:new tt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},envMapRotation:{value:new Ve},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new We(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new tt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new W},probesMax:{value:new W},probesResolution:{value:new W}},points:{diffuse:{value:new tt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new tt(16777215)},opacity:{value:1},center:{value:new We(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},Yn={basic:{uniforms:ln([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.fog]),vertexShader:et.meshbasic_vert,fragmentShader:et.meshbasic_frag},lambert:{uniforms:ln([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new tt(0)},envMapIntensity:{value:1}}]),vertexShader:et.meshlambert_vert,fragmentShader:et.meshlambert_frag},phong:{uniforms:ln([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new tt(0)},specular:{value:new tt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:et.meshphong_vert,fragmentShader:et.meshphong_frag},standard:{uniforms:ln([ve.common,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.roughnessmap,ve.metalnessmap,ve.fog,ve.lights,{emissive:{value:new tt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag},toon:{uniforms:ln([ve.common,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.gradientmap,ve.fog,ve.lights,{emissive:{value:new tt(0)}}]),vertexShader:et.meshtoon_vert,fragmentShader:et.meshtoon_frag},matcap:{uniforms:ln([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,{matcap:{value:null}}]),vertexShader:et.meshmatcap_vert,fragmentShader:et.meshmatcap_frag},points:{uniforms:ln([ve.points,ve.fog]),vertexShader:et.points_vert,fragmentShader:et.points_frag},dashed:{uniforms:ln([ve.common,ve.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:et.linedashed_vert,fragmentShader:et.linedashed_frag},depth:{uniforms:ln([ve.common,ve.displacementmap]),vertexShader:et.depth_vert,fragmentShader:et.depth_frag},normal:{uniforms:ln([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,{opacity:{value:1}}]),vertexShader:et.meshnormal_vert,fragmentShader:et.meshnormal_frag},sprite:{uniforms:ln([ve.sprite,ve.fog]),vertexShader:et.sprite_vert,fragmentShader:et.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:et.background_vert,fragmentShader:et.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ve}},vertexShader:et.backgroundCube_vert,fragmentShader:et.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:et.cube_vert,fragmentShader:et.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:et.equirect_vert,fragmentShader:et.equirect_frag},distance:{uniforms:ln([ve.common,ve.displacementmap,{referencePosition:{value:new W},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:et.distance_vert,fragmentShader:et.distance_frag},shadow:{uniforms:ln([ve.lights,ve.fog,{color:{value:new tt(0)},opacity:{value:1}}]),vertexShader:et.shadow_vert,fragmentShader:et.shadow_frag}};Yn.physical={uniforms:ln([Yn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new We(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new tt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new We},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new tt(0)},specularColor:{value:new tt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new We},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag};const Hs={r:0,b:0,g:0},jx=new Nt,Lu=new Ve;Lu.set(-1,0,0,0,1,0,0,0,1);function ev(n,e,t,i,r,s){const a=new tt(0);let o=r===!0?0:1,c,l,h=null,d=0,u=null;function p(_){let M=_.isScene===!0?_.background:null;if(M&&M.isTexture){const S=_.backgroundBlurriness>0;M=e.get(M,S)}return M}function g(_){let M=!1;const S=p(_);S===null?x(a,o):S&&S.isColor&&(x(S,1),M=!0);const w=n.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,s):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||M)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function v(_,M){const S=p(M);S&&(S.isCubeTexture||S.mapping===Ra)?(l===void 0&&(l=new Jt(new us(1,1,1),new Rt({name:"BackgroundCubeMaterial",uniforms:Pr(Yn.backgroundCube.uniforms),vertexShader:Yn.backgroundCube.vertexShader,fragmentShader:Yn.backgroundCube.fragmentShader,side:dn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(w,E,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=S,l.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(jx.makeRotationFromEuler(M.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Lu),l.material.toneMapped=it.getTransfer(S.colorSpace)!==xt,(h!==S||d!==S.version||u!==n.toneMapping)&&(l.material.needsUpdate=!0,h=S,d=S.version,u=n.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new Jt(new wn(2,2),new Rt({name:"BackgroundMaterial",uniforms:Pr(Yn.background.uniforms),vertexShader:Yn.background.vertexShader,fragmentShader:Yn.background.fragmentShader,side:Xi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=it.getTransfer(S.colorSpace)!==xt,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(h!==S||d!==S.version||u!==n.toneMapping)&&(c.material.needsUpdate=!0,h=S,d=S.version,u=n.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null))}function x(_,M){_.getRGB(Hs,Au(n)),t.buffers.color.setClear(Hs.r,Hs.g,Hs.b,M,s)}function m(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(_,M=1){a.set(_),o=M,x(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(_){o=_,x(a,o)},render:g,addToRenderList:v,dispose:m}}function tv(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=u(null);let s=r,a=!1;function o(C,N,U,D,F){let z=!1;const X=d(C,D,U,N);s!==X&&(s=X,l(s.object)),z=p(C,D,U,F),z&&g(C,D,U,F),F!==null&&e.update(F,n.ELEMENT_ARRAY_BUFFER),(z||a)&&(a=!1,S(C,N,U,D),F!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(F).buffer))}function c(){return n.createVertexArray()}function l(C){return n.bindVertexArray(C)}function h(C){return n.deleteVertexArray(C)}function d(C,N,U,D){const F=D.wireframe===!0;let z=i[N.id];z===void 0&&(z={},i[N.id]=z);const X=C.isInstancedMesh===!0?C.id:0;let Q=z[X];Q===void 0&&(Q={},z[X]=Q);let Y=Q[U.id];Y===void 0&&(Y={},Q[U.id]=Y);let te=Y[F];return te===void 0&&(te=u(c()),Y[F]=te),te}function u(C){const N=[],U=[],D=[];for(let F=0;F<t;F++)N[F]=0,U[F]=0,D[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:U,attributeDivisors:D,object:C,attributes:{},index:null}}function p(C,N,U,D){const F=s.attributes,z=N.attributes;let X=0;const Q=U.getAttributes();for(const Y in Q)if(Q[Y].location>=0){const O=F[Y];let ne=z[Y];if(ne===void 0&&(Y==="instanceMatrix"&&C.instanceMatrix&&(ne=C.instanceMatrix),Y==="instanceColor"&&C.instanceColor&&(ne=C.instanceColor)),O===void 0||O.attribute!==ne||ne&&O.data!==ne.data)return!0;X++}return s.attributesNum!==X||s.index!==D}function g(C,N,U,D){const F={},z=N.attributes;let X=0;const Q=U.getAttributes();for(const Y in Q)if(Q[Y].location>=0){let O=z[Y];O===void 0&&(Y==="instanceMatrix"&&C.instanceMatrix&&(O=C.instanceMatrix),Y==="instanceColor"&&C.instanceColor&&(O=C.instanceColor));const ne={};ne.attribute=O,O&&O.data&&(ne.data=O.data),F[Y]=ne,X++}s.attributes=F,s.attributesNum=X,s.index=D}function v(){const C=s.newAttributes;for(let N=0,U=C.length;N<U;N++)C[N]=0}function x(C){m(C,0)}function m(C,N){const U=s.newAttributes,D=s.enabledAttributes,F=s.attributeDivisors;U[C]=1,D[C]===0&&(n.enableVertexAttribArray(C),D[C]=1),F[C]!==N&&(n.vertexAttribDivisor(C,N),F[C]=N)}function _(){const C=s.newAttributes,N=s.enabledAttributes;for(let U=0,D=N.length;U<D;U++)N[U]!==C[U]&&(n.disableVertexAttribArray(U),N[U]=0)}function M(C,N,U,D,F,z,X){X===!0?n.vertexAttribIPointer(C,N,U,F,z):n.vertexAttribPointer(C,N,U,D,F,z)}function S(C,N,U,D){v();const F=D.attributes,z=U.getAttributes(),X=N.defaultAttributeValues;for(const Q in z){const Y=z[Q];if(Y.location>=0){let te=F[Q];if(te===void 0&&(Q==="instanceMatrix"&&C.instanceMatrix&&(te=C.instanceMatrix),Q==="instanceColor"&&C.instanceColor&&(te=C.instanceColor)),te!==void 0){const O=te.normalized,ne=te.itemSize,ce=e.get(te);if(ce===void 0)continue;const be=ce.buffer,Ue=ce.type,ke=ce.bytesPerElement,ee=Ue===n.INT||Ue===n.UNSIGNED_INT||te.gpuType===Nl;if(te.isInterleavedBufferAttribute){const se=te.data,V=se.stride,he=te.offset;if(se.isInstancedInterleavedBuffer){for(let ae=0;ae<Y.locationSize;ae++)m(Y.location+ae,se.meshPerAttribute);C.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let ae=0;ae<Y.locationSize;ae++)x(Y.location+ae);n.bindBuffer(n.ARRAY_BUFFER,be);for(let ae=0;ae<Y.locationSize;ae++)M(Y.location+ae,ne/Y.locationSize,Ue,O,V*ke,(he+ne/Y.locationSize*ae)*ke,ee)}else{if(te.isInstancedBufferAttribute){for(let se=0;se<Y.locationSize;se++)m(Y.location+se,te.meshPerAttribute);C.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let se=0;se<Y.locationSize;se++)x(Y.location+se);n.bindBuffer(n.ARRAY_BUFFER,be);for(let se=0;se<Y.locationSize;se++)M(Y.location+se,ne/Y.locationSize,Ue,O,ne*ke,ne/Y.locationSize*se*ke,ee)}}else if(X!==void 0){const O=X[Q];if(O!==void 0)switch(O.length){case 2:n.vertexAttrib2fv(Y.location,O);break;case 3:n.vertexAttrib3fv(Y.location,O);break;case 4:n.vertexAttrib4fv(Y.location,O);break;default:n.vertexAttrib1fv(Y.location,O)}}}}_()}function w(){A();for(const C in i){const N=i[C];for(const U in N){const D=N[U];for(const F in D){const z=D[F];for(const X in z)h(z[X].object),delete z[X];delete D[F]}}delete i[C]}}function E(C){if(i[C.id]===void 0)return;const N=i[C.id];for(const U in N){const D=N[U];for(const F in D){const z=D[F];for(const X in z)h(z[X].object),delete z[X];delete D[F]}}delete i[C.id]}function L(C){for(const N in i){const U=i[N];for(const D in U){const F=U[D];if(F[C.id]===void 0)continue;const z=F[C.id];for(const X in z)h(z[X].object),delete z[X];delete F[C.id]}}}function b(C){for(const N in i){const U=i[N],D=C.isInstancedMesh===!0?C.id:0,F=U[D];if(F!==void 0){for(const z in F){const X=F[z];for(const Q in X)h(X[Q].object),delete X[Q];delete F[z]}delete U[D],Object.keys(U).length===0&&delete i[N]}}}function A(){P(),a=!0,s!==r&&(s=r,l(s.object))}function P(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:A,resetDefaultState:P,dispose:w,releaseStatesOfGeometry:E,releaseStatesOfObject:b,releaseStatesOfProgram:L,initAttributes:v,enableAttribute:x,disableUnusedAttributes:_}}function nv(n,e,t){let i;function r(c){i=c}function s(c,l){n.drawArrays(i,c,l),t.update(l,i,1)}function a(c,l,h){h!==0&&(n.drawArraysInstanced(i,c,l,h),t.update(l,i,h))}function o(c,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,h);let u=0;for(let p=0;p<h;p++)u+=l[p];t.update(u,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function iv(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const L=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(L){return!(L!==_n&&i.convert(L)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(L){const b=L===jn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(L!==vn&&L!==qn&&!b&&i.convert(L)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function c(L){if(L==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(Ge("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Ge("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),x=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),_=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),M=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),w=n.getParameter(n.MAX_SAMPLES),E=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:x,maxAttributes:m,maxVertexUniforms:_,maxVaryings:M,maxFragmentUniforms:S,maxSamples:w,samples:E}}function rv(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new bi,o=new Ve,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const p=d.length!==0||u||i!==0||r;return r=u,i=d.length,p},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,p){const g=d.clippingPlanes,v=d.clipIntersection,x=d.clipShadows,m=n.get(d);if(!r||g===null||g.length===0||s&&!x)s?h(null):l();else{const _=s?0:i,M=_*4;let S=m.clippingState||null;c.value=S,S=h(g,u,M,p);for(let w=0;w!==M;++w)S[w]=t[w];m.clippingState=S,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=_}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(d,u,p,g){const v=d!==null?d.length:0;let x=null;if(v!==0){if(x=c.value,g!==!0||x===null){const m=p+v*4,_=u.matrixWorldInverse;o.getNormalMatrix(_),(x===null||x.length<m)&&(x=new Float32Array(m));for(let M=0,S=p;M!==v;++M,S+=4)a.copy(d[M]).applyMatrix4(_,o),a.normal.toArray(x,S),x[S+3]=a.constant}c.value=x,c.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,x}}const vr=4,sv=6,av=20,ov=256,qr=new Yl,Zc=new tt;let fo=null,po=0,mo=0,go=!1;const lv=new W,Ui=new W;class Jc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){const{size:a=256,position:o=lv}=s;fo=this._renderer.getRenderTarget(),po=this._renderer.getActiveCubeFace(),mo=this._renderer.getActiveMipmapLevel(),go=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,r,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=eh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=jc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(fo,po,mo),this._renderer.xr.enabled=go,e.scissorTest=!1,ur(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Yi||e.mapping===Cr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),fo=this._renderer.getRenderTarget(),po=this._renderer.getActiveCubeFace(),mo=this._renderer.getActiveMipmapLevel(),go=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Bt,minFilter:Bt,generateMipmaps:!1,type:jn,format:_n,colorSpace:as,depthBuffer:!1},r=Qc(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Qc(e,t,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=cv(s)),this._blurMaterial=uv(s,e,t),this._ggxMaterial=hv(s,e,t)}return r}_compileMaterial(e){const t=new Jt(new Yt,e);this._renderer.compile(t,qr)}_sceneToCubeUV(e,t,i,r,s){const c=new xn(90,1,t,i),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,p=d.toneMapping;d.getClearColor(Zc),d.toneMapping=Jn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Jt(new us,new bu({name:"PMREM.Background",side:dn,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,x=v.material;let m=!1;const _=e.background;_?_.isColor&&(x.color.copy(_),e.background=null,m=!0):(x.color.copy(Zc),m=!0);for(let M=0;M<6;M++){const S=M%3;S===0?(c.up.set(0,l[M],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+h[M],s.y,s.z)):S===1?(c.up.set(0,0,l[M]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+h[M],s.z)):(c.up.set(0,l[M],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+h[M]));const w=this._cubeSize;ur(r,S*w,M>2?w:0,w,w),d.setRenderTarget(r),m&&d.render(v,c),d.render(e,c)}d.toneMapping=p,d.autoClear=u,e.background=_}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===Yi||e.mapping===Cr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=eh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=jc());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const c=this._cubeSize;ur(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(a,qr)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const c=a.uniforms,l=i/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),d=Math.sqrt(l*l-h*h),u=l*1.25,p=d*u,{_lodMax:g}=this,v=this._sizeLods[i],x=3*v*(i>g-vr?i-g+vr:0),m=4*(this._cubeSize-v);c.envMap.value=e.texture,c.roughness.value=p,c.mipInt.value=g-t,ur(s,x,m,3*v,2*v),r.setRenderTarget(s),r.render(o,qr),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=g-i,ur(e,x,m,3*v,2*v),r.setRenderTarget(e),r.render(o,qr)}_blur(e,t,i,r){const s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,i,a),this._blurPass(s,e,i,i,a)}_blurPass(e,t,i,r,s){const a=this._renderer,o=this._blurMaterial,c=this._lodMeshes[r];c.material=o;const l=o.uniforms;l.envMap.value=e.texture,l.sigma.value=s,l.mipInt.value=this._lodMax-i;const h=this._sizeLods[r],d=3*h*(r>this._lodMax-vr?r-this._lodMax+vr:0),u=4*(this._cubeSize-h);ur(t,d,u,3*h,2*h),a.setRenderTarget(t),a.render(c,qr)}}function cv(n){const e=[],t=[];let i=n;const r=n-vr+1+sv;for(let s=0;s<r;s++){const a=Math.pow(2,i);e.push(a);const o=1/(a-2),c=-o,l=1+o,h=[c,c,l,c,l,l,c,c,l,l,c,l],d=6,u=6,p=3,g=new Float32Array(p*u*d),v=new Float32Array(p*u*d);for(let m=0;m<d;m++){const _=m%3*2/3-1,M=m>2?0:-1,S=[_,M,0,_+2/3,M,0,_+2/3,M+1,0,_,M,0,_+2/3,M+1,0,_,M+1,0];g.set(S,p*u*m);for(let w=0;w<u;w++){const E=h[w*2]*2-1,L=h[w*2+1]*2-1;m===0?Ui.set(1,L,E):m===1?Ui.set(-E,1,-L):m===2?Ui.set(-E,L,1):m===3?Ui.set(-1,L,-E):m===4?Ui.set(-E,-1,L):Ui.set(E,L,-1),Ui.toArray(v,(m*u+w)*p)}}const x=new Yt;x.setAttribute("position",new bn(g,p)),x.setAttribute("outputDirection",new bn(v,p)),t.push(new Jt(x,null)),i>vr&&i--}return{lodMeshes:t,sizeLods:e}}function Qc(n,e,t){const i=new Cn(n,e,t);return i.texture.mapping=Ra,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ur(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function hv(n,e,t){return new Rt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:ov,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ca(),fragmentShader:`

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
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function uv(n,e,t){return new Rt({name:"SphericalGaussianBlur",defines:{SAMPLES:av,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Ca(),fragmentShader:`

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
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function jc(){return new Rt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ca(),fragmentShader:`

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
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function eh(){return new Rt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ca(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function Ca(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class Pu extends Cn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new wu(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new us(5,5,5),s=new Rt({name:"CubemapFromEquirect",uniforms:Pr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:dn,blending:Zn});s.uniforms.tEquirect.value=t;const a=new Jt(r,s),o=t.minFilter;return t.minFilter===ki&&(t.minFilter=Bt),new mg(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}function dv(n){let e=new WeakMap,t=new WeakMap,i=null;function r(u,p=!1){return u==null?null:p?a(u):s(u)}function s(u){if(u&&u.isTexture){const p=u.mapping;if(p===za||p===ka)if(e.has(u)){const g=e.get(u).texture;return o(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const v=new Pu(g.height);return v.fromEquirectangularTexture(n,u),e.set(u,v),u.addEventListener("dispose",l),o(v.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const p=u.mapping,g=p===za||p===ka,v=p===Yi||p===Cr;if(g||v){let x=t.get(u);const m=x!==void 0?x.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==m)return i===null&&(i=new Jc(n)),x=g?i.fromEquirectangular(u,x):i.fromCubemap(u,x),x.texture.pmremVersion=u.pmremVersion,t.set(u,x),x.texture;if(x!==void 0)return x.texture;{const _=u.image;return g&&_&&_.height>0||v&&_&&c(_)?(i===null&&(i=new Jc(n)),x=g?i.fromEquirectangular(u):i.fromCubemap(u),x.texture.pmremVersion=u.pmremVersion,t.set(u,x),u.addEventListener("dispose",h),x.texture):null}}}return u}function o(u,p){return p===za?u.mapping=Yi:p===ka&&(u.mapping=Cr),u}function c(u){let p=0;const g=6;for(let v=0;v<g;v++)u[v]!==void 0&&p++;return p===g}function l(u){const p=u.target;p.removeEventListener("dispose",l);const g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function h(u){const p=u.target;p.removeEventListener("dispose",h);const g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function d(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:d}}function fv(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&yr("WebGLRenderer: "+i+" extension not supported."),r}}}function pv(n,e,t,i){const r={},s=new WeakMap;function a(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete r[u.id];const p=s.get(u);p&&(e.remove(p),s.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(d,u){return r[u.id]===!0||(u.addEventListener("dispose",a),r[u.id]=!0,t.memory.geometries++),u}function c(d){const u=d.attributes;for(const p in u)e.update(u[p],n.ARRAY_BUFFER)}function l(d){const u=[],p=d.index,g=d.attributes.position;let v=0;if(g===void 0)return;if(p!==null){const _=p.array;v=p.version;for(let M=0,S=_.length;M<S;M+=3){const w=_[M+0],E=_[M+1],L=_[M+2];u.push(w,E,E,L,L,w)}}else{const _=g.array;v=g.version;for(let M=0,S=_.length/3-1;M<S;M+=3){const w=M+0,E=M+1,L=M+2;u.push(w,E,E,L,L,w)}}const x=new(g.count>=65535?Su:Mu)(u,1);x.version=v;const m=s.get(d);m&&e.remove(m),s.set(d,x)}function h(d){const u=s.get(d);if(u){const p=d.index;p!==null&&u.version<p.version&&l(d)}else l(d);return s.get(d)}return{get:o,update:c,getWireframeAttribute:h}}function mv(n,e,t){let i;function r(d){i=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function c(d,u){n.drawElements(i,u,s,d*a),t.update(u,i,1)}function l(d,u,p){p!==0&&(n.drawElementsInstanced(i,u,s,d*a,p),t.update(u,i,p))}function h(d,u,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,s,d,0,p);let v=0;for(let x=0;x<p;x++)v+=u[x];t.update(v,i,1)}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function gv(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:ot("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function xv(n,e,t){const i=new WeakMap,r=new ht;function s(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let u=i.get(o);if(u===void 0||u.count!==d){let A=function(){L.dispose(),i.delete(o),o.removeEventListener("dispose",A)};u!==void 0&&u.texture.dispose();const p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,x=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],_=o.morphAttributes.color||[];let M=0;p===!0&&(M=1),g===!0&&(M=2),v===!0&&(M=3);let S=o.attributes.position.count*M,w=1;S>e.maxTextureSize&&(w=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const E=new Float32Array(S*w*4*d),L=new xu(E,S,w,d);L.type=qn,L.needsUpdate=!0;const b=M*4;for(let P=0;P<d;P++){const C=x[P],N=m[P],U=_[P],D=S*w*4*P;for(let F=0;F<C.count;F++){const z=F*b;p===!0&&(r.fromBufferAttribute(C,F),E[D+z+0]=r.x,E[D+z+1]=r.y,E[D+z+2]=r.z,E[D+z+3]=0),g===!0&&(r.fromBufferAttribute(N,F),E[D+z+4]=r.x,E[D+z+5]=r.y,E[D+z+6]=r.z,E[D+z+7]=0),v===!0&&(r.fromBufferAttribute(U,F),E[D+z+8]=r.x,E[D+z+9]=r.y,E[D+z+10]=r.z,E[D+z+11]=U.itemSize===4?r.w:1)}}u={count:d,texture:L,size:new We(S,w)},i.set(o,u),o.addEventListener("dispose",A)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let p=0;for(let v=0;v<l.length;v++)p+=l[v];const g=o.morphTargetsRelative?1:1-p;c.getUniforms().setValue(n,"morphTargetBaseInfluence",g),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",u.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:s}}function vv(n,e,t,i,r){let s=new WeakMap;function a(l){const h=r.render.frame,d=l.geometry,u=e.get(l,d);if(s.get(u)!==h&&(e.update(u),s.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),s.get(l)!==h&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,h))),l.isSkinnedMesh){const p=l.skeleton;s.get(p)!==h&&(p.update(),s.set(p,h))}return u}function o(){s=new WeakMap}function c(l){const h=l.target;h.removeEventListener("dispose",c),i.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}const _v={[tu]:"LINEAR_TONE_MAPPING",[nu]:"REINHARD_TONE_MAPPING",[iu]:"CINEON_TONE_MAPPING",[ru]:"ACES_FILMIC_TONE_MAPPING",[au]:"AGX_TONE_MAPPING",[ou]:"NEUTRAL_TONE_MAPPING",[su]:"CUSTOM_TONE_MAPPING"};function Mv(n,e,t,i,r,s){const a=new Cn(e,t,{type:n,depthBuffer:r,stencilBuffer:s,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,c=null;const l=new Yt;l.setAttribute("position",new It([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new It([0,2,0,0,2,0],2));const h=new dg({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new Jt(l,h),u=new Yl(-1,1,1,-1,0,1);let p=null,g=null,v=!1,x,m=null,_=[],M=!1;this.setSize=function(S,w){a.setSize(S,w),o!==null&&o.setSize(S,w),c!==null&&c.setSize(S,w);for(let E=0;E<_.length;E++){const L=_[E];L.setSize&&L.setSize(S,w)}},this.setEffects=function(S){_=S,M=_.length>0&&_[0].isRenderPass===!0;const w=a.width,E=a.height;_.length>0&&o===null&&(o=new Cn(w,E,{type:jn,depthBuffer:!1,stencilBuffer:!1}),c=new Cn(w,E,{type:jn,depthBuffer:!1,stencilBuffer:!1}));for(let L=0;L<_.length;L++){const b=_[L];b.setSize&&b.setSize(w,E)}},this.begin=function(S,w){if(v||S.toneMapping===Jn&&_.length===0)return!1;if(m=w,w!==null){const E=w.width,L=w.height;(a.width!==E||a.height!==L)&&this.setSize(E,L)}return M===!1&&S.setRenderTarget(a),x=S.toneMapping,S.toneMapping=Jn,!0},this.hasRenderPass=function(){return M},this.end=function(S,w){S.toneMapping=x,v=!0;let E=a,L=o;for(let b=0;b<_.length;b++){const A=_[b];A.enabled!==!1&&(A.render(S,L,E,w),A.needsSwap!==!1&&(E=L,L=L===o?c:o))}if(p!==S.outputColorSpace||g!==S.toneMapping){p=S.outputColorSpace,g=S.toneMapping,h.defines={},it.getTransfer(p)===xt&&(h.defines.SRGB_TRANSFER="");const b=_v[g];b&&(h.defines[b]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=E.texture,S.setRenderTarget(m),S.render(d,u),m=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),h.dispose()}}const Du=new an,gl=new Lr(1,1),Iu=new xu,Nu=new Hm,Uu=new wu,th=[],nh=[],ih=new Float32Array(16),rh=new Float32Array(9),sh=new Float32Array(4);function Or(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=th[r];if(s===void 0&&(s=new Float32Array(r),th[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function Kt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function qt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function La(n,e){let t=nh[e];t===void 0&&(t=new Int32Array(e),nh[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Sv(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function bv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Kt(t,e))return;n.uniform2fv(this.addr,e),qt(t,e)}}function yv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Kt(t,e))return;n.uniform3fv(this.addr,e),qt(t,e)}}function wv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Kt(t,e))return;n.uniform4fv(this.addr,e),qt(t,e)}}function Ev(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Kt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),qt(t,e)}else{if(Kt(t,i))return;sh.set(i),n.uniformMatrix2fv(this.addr,!1,sh),qt(t,i)}}function Av(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Kt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),qt(t,e)}else{if(Kt(t,i))return;rh.set(i),n.uniformMatrix3fv(this.addr,!1,rh),qt(t,i)}}function Tv(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Kt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),qt(t,e)}else{if(Kt(t,i))return;ih.set(i),n.uniformMatrix4fv(this.addr,!1,ih),qt(t,i)}}function Rv(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Cv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Kt(t,e))return;n.uniform2iv(this.addr,e),qt(t,e)}}function Lv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Kt(t,e))return;n.uniform3iv(this.addr,e),qt(t,e)}}function Pv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Kt(t,e))return;n.uniform4iv(this.addr,e),qt(t,e)}}function Dv(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Iv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Kt(t,e))return;n.uniform2uiv(this.addr,e),qt(t,e)}}function Nv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Kt(t,e))return;n.uniform3uiv(this.addr,e),qt(t,e)}}function Uv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Kt(t,e))return;n.uniform4uiv(this.addr,e),qt(t,e)}}function Fv(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(gl.compareFunction=t.isReversedDepthBuffer()?Gl:kl,s=gl):s=Du,t.setTexture2D(e||s,r)}function Ov(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Nu,r)}function Bv(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Uu,r)}function zv(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Iu,r)}function kv(n){switch(n){case 5126:return Sv;case 35664:return bv;case 35665:return yv;case 35666:return wv;case 35674:return Ev;case 35675:return Av;case 35676:return Tv;case 5124:case 35670:return Rv;case 35667:case 35671:return Cv;case 35668:case 35672:return Lv;case 35669:case 35673:return Pv;case 5125:return Dv;case 36294:return Iv;case 36295:return Nv;case 36296:return Uv;case 35678:case 36198:case 36298:case 36306:case 35682:return Fv;case 35679:case 36299:case 36307:return Ov;case 35680:case 36300:case 36308:case 36293:return Bv;case 36289:case 36303:case 36311:case 36292:return zv}}function Gv(n,e){n.uniform1fv(this.addr,e)}function Hv(n,e){const t=Or(e,this.size,2);n.uniform2fv(this.addr,t)}function Wv(n,e){const t=Or(e,this.size,3);n.uniform3fv(this.addr,t)}function Vv(n,e){const t=Or(e,this.size,4);n.uniform4fv(this.addr,t)}function Xv(n,e){const t=Or(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Yv(n,e){const t=Or(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Kv(n,e){const t=Or(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function qv(n,e){n.uniform1iv(this.addr,e)}function $v(n,e){n.uniform2iv(this.addr,e)}function Zv(n,e){n.uniform3iv(this.addr,e)}function Jv(n,e){n.uniform4iv(this.addr,e)}function Qv(n,e){n.uniform1uiv(this.addr,e)}function jv(n,e){n.uniform2uiv(this.addr,e)}function e2(n,e){n.uniform3uiv(this.addr,e)}function t2(n,e){n.uniform4uiv(this.addr,e)}function n2(n,e,t){const i=this.cache,r=e.length,s=La(t,r);Kt(i,s)||(n.uniform1iv(this.addr,s),qt(i,s));let a;this.type===n.SAMPLER_2D_SHADOW?a=gl:a=Du;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function i2(n,e,t){const i=this.cache,r=e.length,s=La(t,r);Kt(i,s)||(n.uniform1iv(this.addr,s),qt(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Nu,s[a])}function r2(n,e,t){const i=this.cache,r=e.length,s=La(t,r);Kt(i,s)||(n.uniform1iv(this.addr,s),qt(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Uu,s[a])}function s2(n,e,t){const i=this.cache,r=e.length,s=La(t,r);Kt(i,s)||(n.uniform1iv(this.addr,s),qt(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Iu,s[a])}function a2(n){switch(n){case 5126:return Gv;case 35664:return Hv;case 35665:return Wv;case 35666:return Vv;case 35674:return Xv;case 35675:return Yv;case 35676:return Kv;case 5124:case 35670:return qv;case 35667:case 35671:return $v;case 35668:case 35672:return Zv;case 35669:case 35673:return Jv;case 5125:return Qv;case 36294:return jv;case 36295:return e2;case 36296:return t2;case 35678:case 36198:case 36298:case 36306:case 35682:return n2;case 35679:case 36299:case 36307:return i2;case 35680:case 36300:case 36308:case 36293:return r2;case 36289:case 36303:case 36311:case 36292:return s2}}class o2{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=kv(t.type)}}class l2{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=a2(t.type)}}class c2{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const xo=/(\w+)(\])?(\[|\.)?/g;function ah(n,e){n.seq.push(e),n.map[e.id]=e}function h2(n,e,t){const i=n.name,r=i.length;for(xo.lastIndex=0;;){const s=xo.exec(i),a=xo.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===r){ah(t,l===void 0?new o2(o,n,e):new l2(o,n,e));break}else{let d=t.map[o];d===void 0&&(d=new c2(o),ah(t,d)),t=d}}}class ia{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);h2(o,c,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function oh(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const u2=37297;let d2=0;function f2(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const lh=new Ve;function p2(n){it._getMatrix(lh,it.workingColorSpace,n);const e=`mat3( ${lh.elements.map(t=>t.toFixed(4))} )`;switch(it.getTransfer(n)){case ha:return[e,"LinearTransferOETF"];case xt:return[e,"sRGBTransferOETF"];default:return Ge("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function ch(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+f2(n.getShaderSource(e),o)}else return s}function m2(n,e){const t=p2(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const g2={[tu]:"Linear",[nu]:"Reinhard",[iu]:"Cineon",[ru]:"ACESFilmic",[au]:"AgX",[ou]:"Neutral",[su]:"Custom"};function x2(n,e){const t=g2[e];return t===void 0?(Ge("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ws=new W;function v2(){it.getLuminanceCoefficients(Ws);const n=Ws.x.toFixed(4),e=Ws.y.toFixed(4),t=Ws.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function _2(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(es).join(`
`)}function M2(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function S2(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function es(n){return n!==""}function hh(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function uh(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const b2=/^[ \t]*#include +<([\w\d./]+)>/gm;function xl(n){return n.replace(b2,w2)}const y2=new Map;function w2(n,e){let t=et[e];if(t===void 0){const i=y2.get(e);if(i!==void 0)t=et[i],Ge('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return xl(t)}const E2=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function dh(n){return n.replace(E2,A2)}function A2(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function fh(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const T2={[Qs]:"SHADOWMAP_TYPE_PCF",[Qr]:"SHADOWMAP_TYPE_VSM"};function R2(n){return T2[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const C2={[Yi]:"ENVMAP_TYPE_CUBE",[Cr]:"ENVMAP_TYPE_CUBE",[Ra]:"ENVMAP_TYPE_CUBE_UV"};function L2(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":C2[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const P2={[Cr]:"ENVMAP_MODE_REFRACTION"};function D2(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":P2[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const I2={[eu]:"ENVMAP_BLENDING_MULTIPLY",[_m]:"ENVMAP_BLENDING_MIX",[Mm]:"ENVMAP_BLENDING_ADD"};function N2(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":I2[n.combine]||"ENVMAP_BLENDING_NONE"}function U2(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function F2(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=R2(t),l=L2(t),h=D2(t),d=N2(t),u=U2(t),p=_2(t),g=M2(s),v=r.createProgram();let x,m,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(x=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(es).join(`
`),x.length>0&&(x+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(es).join(`
`),m.length>0&&(m+=`
`)):(x=[fh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(es).join(`
`),m=[fh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Jn?"#define TONE_MAPPING":"",t.toneMapping!==Jn?et.tonemapping_pars_fragment:"",t.toneMapping!==Jn?x2("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",et.colorspace_pars_fragment,m2("linearToOutputTexel",t.outputColorSpace),v2(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(es).join(`
`)),a=xl(a),a=hh(a,t),a=uh(a,t),o=xl(o),o=hh(o,t),o=uh(o,t),a=dh(a),o=dh(o),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,x=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,m=["#define varying in",t.glslVersion===bc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===bc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const M=_+x+a,S=_+m+o,w=oh(r,r.VERTEX_SHADER,M),E=oh(r,r.FRAGMENT_SHADER,S);r.attachShader(v,w),r.attachShader(v,E),t.index0AttributeName!==void 0?r.bindAttribLocation(v,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function L(C){if(n.debug.checkShaderErrors){const N=r.getProgramInfoLog(v)||"",U=r.getShaderInfoLog(w)||"",D=r.getShaderInfoLog(E)||"",F=N.trim(),z=U.trim(),X=D.trim();let Q=!0,Y=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(Q=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,v,w,E);else{const te=ch(r,w,"vertex"),O=ch(r,E,"fragment");ot("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+F+`
`+te+`
`+O)}else F!==""?Ge("WebGLProgram: Program Info Log:",F):(z===""||X==="")&&(Y=!1);Y&&(C.diagnostics={runnable:Q,programLog:F,vertexShader:{log:z,prefix:x},fragmentShader:{log:X,prefix:m}})}r.deleteShader(w),r.deleteShader(E),b=new ia(r,v),A=S2(r,v)}let b;this.getUniforms=function(){return b===void 0&&L(this),b};let A;this.getAttributes=function(){return A===void 0&&L(this),A};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=r.getProgramParameter(v,u2)),P},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=d2++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=w,this.fragmentShader=E,this}let O2=0;class B2{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new z2(e),t.set(e,i)),i}}class z2{constructor(e){this.id=O2++,this.code=e,this.usedTimes=0}}function k2(n){return n===Ki||n===la||n===ca}function G2(n,e,t,i,r,s){const a=new vu,o=new B2,c=new Set,l=[],h=new Map,d=i.logarithmicDepthBuffer;let u=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(b){return c.add(b),b===0?"uv":`uv${b}`}function v(b,A,P,C,N,U){const D=C.fog,F=N.geometry,z=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?C.environment:null,X=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap,Q=e.get(b.envMap||z,X),Y=Q&&Q.mapping===Ra?Q.image.height:null,te=p[b.type];b.precision!==null&&(u=i.getMaxPrecision(b.precision),u!==b.precision&&Ge("WebGLProgram.getParameters:",b.precision,"not supported, using",u,"instead."));const O=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,ne=O!==void 0?O.length:0;let ce=0;F.morphAttributes.position!==void 0&&(ce=1),F.morphAttributes.normal!==void 0&&(ce=2),F.morphAttributes.color!==void 0&&(ce=3);let be,Ue,ke,ee;if(te){const Et=Yn[te];be=Et.vertexShader,Ue=Et.fragmentShader}else{be=b.vertexShader,Ue=b.fragmentShader;const Et=o.getVertexShaderStage(b),ut=o.getFragmentShaderStage(b);o.update(b,Et,ut),ke=Et.id,ee=ut.id}const se=n.getRenderTarget(),V=n.state.buffers.depth.getReversed(),he=N.isInstancedMesh===!0,ae=N.isBatchedMesh===!0,Ee=!!b.map,Je=!!b.matcap,Ce=!!Q,Fe=!!b.aoMap,Ke=!!b.lightMap,Ye=!!b.bumpMap&&b.wireframe===!1,bt=!!b.normalMap,Ut=!!b.displacementMap,$t=!!b.emissiveMap,_t=!!b.metalnessMap,yt=!!b.roughnessMap,G=b.anisotropy>0,Qe=b.clearcoat>0,ze=b.dispersion>0,I=b.retroreflectivity>0,y=b.iridescence>0,B=b.sheen>0,K=b.transmission>0,Z=G&&!!b.anisotropyMap,le=Qe&&!!b.clearcoatMap,ue=Qe&&!!b.clearcoatNormalMap,j=Qe&&!!b.clearcoatRoughnessMap,ie=y&&!!b.iridescenceMap,de=y&&!!b.iridescenceThicknessMap,Le=B&&!!b.sheenColorMap,xe=B&&!!b.sheenRoughnessMap,fe=!!b.specularMap,Ie=!!b.specularColorMap,Be=!!b.specularIntensityMap,qe=K&&!!b.transmissionMap,H=K&&!!b.thicknessMap,pe=!!b.gradientMap,re=!!b.alphaMap,me=b.alphaTest>0,Se=!!b.alphaHash,oe=!!b.extensions;let Ne=Jn;b.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(Ne=n.toneMapping);const Pe={shaderID:te,shaderType:b.type,shaderName:b.name,vertexShader:be,fragmentShader:Ue,defines:b.defines,customVertexShaderID:ke,customFragmentShaderID:ee,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:u,batching:ae,batchingColor:ae&&N._colorsTexture!==null,instancing:he,instancingColor:he&&N.instanceColor!==null,instancingMorph:he&&N.morphTexture!==null,outputColorSpace:se===null?n.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:it.workingColorSpace,alphaToCoverage:!!b.alphaToCoverage,map:Ee,matcap:Je,envMap:Ce,envMapMode:Ce&&Q.mapping,envMapCubeUVHeight:Y,aoMap:Fe,lightMap:Ke,bumpMap:Ye,normalMap:bt,displacementMap:Ut,emissiveMap:$t,normalMapObjectSpace:bt&&b.normalMapType===ym,normalMapTangentSpace:bt&&b.normalMapType===Sc,packedNormalMap:bt&&b.normalMapType===Sc&&k2(b.normalMap.format),metalnessMap:_t,roughnessMap:yt,anisotropy:G,anisotropyMap:Z,clearcoat:Qe,clearcoatMap:le,clearcoatNormalMap:ue,clearcoatRoughnessMap:j,dispersion:ze,retroreflection:I,iridescence:y,iridescenceMap:ie,iridescenceThicknessMap:de,sheen:B,sheenColorMap:Le,sheenRoughnessMap:xe,specularMap:fe,specularColorMap:Ie,specularIntensityMap:Be,transmission:K,transmissionMap:qe,thicknessMap:H,gradientMap:pe,opaque:b.transparent===!1&&b.blending===Sr&&b.alphaToCoverage===!1,alphaMap:re,alphaTest:me,alphaHash:Se,combine:b.combine,mapUv:Ee&&g(b.map.channel),aoMapUv:Fe&&g(b.aoMap.channel),lightMapUv:Ke&&g(b.lightMap.channel),bumpMapUv:Ye&&g(b.bumpMap.channel),normalMapUv:bt&&g(b.normalMap.channel),displacementMapUv:Ut&&g(b.displacementMap.channel),emissiveMapUv:$t&&g(b.emissiveMap.channel),metalnessMapUv:_t&&g(b.metalnessMap.channel),roughnessMapUv:yt&&g(b.roughnessMap.channel),anisotropyMapUv:Z&&g(b.anisotropyMap.channel),clearcoatMapUv:le&&g(b.clearcoatMap.channel),clearcoatNormalMapUv:ue&&g(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:j&&g(b.clearcoatRoughnessMap.channel),iridescenceMapUv:ie&&g(b.iridescenceMap.channel),iridescenceThicknessMapUv:de&&g(b.iridescenceThicknessMap.channel),sheenColorMapUv:Le&&g(b.sheenColorMap.channel),sheenRoughnessMapUv:xe&&g(b.sheenRoughnessMap.channel),specularMapUv:fe&&g(b.specularMap.channel),specularColorMapUv:Ie&&g(b.specularColorMap.channel),specularIntensityMapUv:Be&&g(b.specularIntensityMap.channel),transmissionMapUv:qe&&g(b.transmissionMap.channel),thicknessMapUv:H&&g(b.thicknessMap.channel),alphaMapUv:re&&g(b.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(bt||G),vertexNormals:!!F.attributes.normal,vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!F.attributes.uv&&(Ee||re),fog:!!D,useFog:b.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:b.wireframe===!1&&(b.flatShading===!0||F.attributes.normal===void 0&&bt===!1&&(b.isMeshLambertMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isMeshPhysicalMaterial)),sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:V,skinning:N.isSkinnedMesh===!0,hasPositionAttribute:F.attributes.position!==void 0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:ne,morphTextureStride:ce,numSunLights:A.sun.length,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numSunLightShadows:A.sunShadowMap.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:U.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:b.dithering,shadowMapEnabled:n.shadowMap.enabled&&P.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ne,decodeVideoTexture:Ee&&b.map.isVideoTexture===!0&&it.getTransfer(b.map.colorSpace)===xt,decodeVideoTextureEmissive:$t&&b.emissiveMap.isVideoTexture===!0&&it.getTransfer(b.emissiveMap.colorSpace)===xt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===oi,flipSided:b.side===dn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:oe&&b.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(oe&&b.extensions.multiDraw===!0||ae)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Pe.vertexUv1s=c.has(1),Pe.vertexUv2s=c.has(2),Pe.vertexUv3s=c.has(3),c.clear(),Pe}function x(b){const A=[];if(b.shaderID?A.push(b.shaderID):(A.push(b.customVertexShaderID),A.push(b.customFragmentShaderID)),b.defines!==void 0)for(const P in b.defines)A.push(P),A.push(b.defines[P]);return b.isRawShaderMaterial===!1&&(m(A,b),_(A,b),A.push(n.outputColorSpace)),A.push(b.customProgramCacheKey),A.join()}function m(b,A){b.push(A.precision),b.push(A.outputColorSpace),b.push(A.envMapMode),b.push(A.envMapCubeUVHeight),b.push(A.mapUv),b.push(A.alphaMapUv),b.push(A.lightMapUv),b.push(A.aoMapUv),b.push(A.bumpMapUv),b.push(A.normalMapUv),b.push(A.displacementMapUv),b.push(A.emissiveMapUv),b.push(A.metalnessMapUv),b.push(A.roughnessMapUv),b.push(A.anisotropyMapUv),b.push(A.clearcoatMapUv),b.push(A.clearcoatNormalMapUv),b.push(A.clearcoatRoughnessMapUv),b.push(A.iridescenceMapUv),b.push(A.iridescenceThicknessMapUv),b.push(A.sheenColorMapUv),b.push(A.sheenRoughnessMapUv),b.push(A.specularMapUv),b.push(A.specularColorMapUv),b.push(A.specularIntensityMapUv),b.push(A.transmissionMapUv),b.push(A.thicknessMapUv),b.push(A.combine),b.push(A.fogExp2),b.push(A.sizeAttenuation),b.push(A.morphTargetsCount),b.push(A.morphAttributeCount),b.push(A.numSunLights),b.push(A.numDirLights),b.push(A.numPointLights),b.push(A.numSpotLights),b.push(A.numSpotLightMaps),b.push(A.numHemiLights),b.push(A.numRectAreaLights),b.push(A.numSunLightShadows),b.push(A.numDirLightShadows),b.push(A.numPointLightShadows),b.push(A.numSpotLightShadows),b.push(A.numSpotLightShadowsWithMaps),b.push(A.numLightProbes),b.push(A.shadowMapType),b.push(A.toneMapping),b.push(A.numClippingPlanes),b.push(A.numClipIntersection),b.push(A.depthPacking)}function _(b,A){a.disableAll(),A.instancing&&a.enable(0),A.instancingColor&&a.enable(1),A.instancingMorph&&a.enable(2),A.matcap&&a.enable(3),A.envMap&&a.enable(4),A.normalMapObjectSpace&&a.enable(5),A.normalMapTangentSpace&&a.enable(6),A.clearcoat&&a.enable(7),A.iridescence&&a.enable(8),A.alphaTest&&a.enable(9),A.vertexColors&&a.enable(10),A.vertexAlphas&&a.enable(11),A.vertexUv1s&&a.enable(12),A.vertexUv2s&&a.enable(13),A.vertexUv3s&&a.enable(14),A.vertexTangents&&a.enable(15),A.anisotropy&&a.enable(16),A.alphaHash&&a.enable(17),A.batching&&a.enable(18),A.dispersion&&a.enable(19),A.retroreflection&&a.enable(24),A.batchingColor&&a.enable(20),A.gradientMap&&a.enable(21),A.packedNormalMap&&a.enable(22),A.vertexNormals&&a.enable(23),b.push(a.mask),a.disableAll(),A.fog&&a.enable(0),A.useFog&&a.enable(1),A.flatShading&&a.enable(2),A.logarithmicDepthBuffer&&a.enable(3),A.reversedDepthBuffer&&a.enable(4),A.skinning&&a.enable(5),A.morphTargets&&a.enable(6),A.morphNormals&&a.enable(7),A.morphColors&&a.enable(8),A.premultipliedAlpha&&a.enable(9),A.shadowMapEnabled&&a.enable(10),A.doubleSided&&a.enable(11),A.flipSided&&a.enable(12),A.useDepthPacking&&a.enable(13),A.dithering&&a.enable(14),A.transmission&&a.enable(15),A.sheen&&a.enable(16),A.opaque&&a.enable(17),A.pointsUvs&&a.enable(18),A.decodeVideoTexture&&a.enable(19),A.decodeVideoTextureEmissive&&a.enable(20),A.alphaToCoverage&&a.enable(21),A.numLightProbeGrids>0&&a.enable(22),A.hasPositionAttribute&&a.enable(23),b.push(a.mask)}function M(b){const A=p[b.type];let P;if(A){const C=Yn[A];P=cg.clone(C.uniforms)}else P=b.uniforms;return P}function S(b,A){let P=h.get(A);return P!==void 0?++P.usedTimes:(P=new F2(n,A,b,r),l.push(P),h.set(A,P)),P}function w(b){if(--b.usedTimes===0){const A=l.indexOf(b);l[A]=l[l.length-1],l.pop(),h.delete(b.cacheKey),b.destroy()}}function E(b){o.remove(b)}function L(){o.dispose()}return{getParameters:v,getProgramCacheKey:x,getUniforms:M,acquireProgram:S,releaseProgram:w,releaseShaderCache:E,programs:l,dispose:L}}function H2(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,c){n.get(a)[o]=c}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function W2(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function ph(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function mh(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(u){let p=0;return u.isInstancedMesh&&(p+=2),u.isSkinnedMesh&&(p+=1),p}function o(u,p,g,v,x,m){let _=n[e];return _===void 0?(_={id:u.id,object:u,geometry:p,material:g,materialVariant:a(u),groupOrder:v,renderOrder:u.renderOrder,z:x,group:m},n[e]=_):(_.id=u.id,_.object=u,_.geometry=p,_.material=g,_.materialVariant=a(u),_.groupOrder=v,_.renderOrder=u.renderOrder,_.z=x,_.group=m),e++,_}function c(u,p,g,v,x,m,_){_.reversedDepth===!0&&(x=-x);const M=o(u,p,g,v,x,m);g.transmission>0?i.push(M):g.transparent===!0?r.push(M):t.push(M)}function l(u,p,g,v,x,m){const _=o(u,p,g,v,x,m);g.transmission>0?i.unshift(_):g.transparent===!0?r.unshift(_):t.unshift(_)}function h(u,p){t.length>1&&t.sort(u||W2),i.length>1&&i.sort(p||ph),r.length>1&&r.sort(p||ph)}function d(){for(let u=e,p=n.length;u<p;u++){const g=n[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:c,unshift:l,finish:d,sort:h}}function V2(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new mh,n.set(i,[a])):r>=s.length?(a=new mh,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function X2(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new W,color:new tt};break;case"SpotLight":t={position:new W,direction:new W,color:new tt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new W,color:new tt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new W,skyColor:new tt,groundColor:new tt};break;case"RectAreaLight":t={color:new tt,position:new W,halfWidth:new W,halfHeight:new W};break}return n[e.id]=t,t}}}function Y2(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let K2=0;function q2(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function $2(n){const e=new X2,t=Y2(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new W);const r=new W,s=new Nt,a=new Nt;function o(l){let h=0,d=0,u=0;for(let N=0;N<9;N++)i.probe[N].set(0,0,0);let p=0,g=0,v=0,x=0,m=0,_=0,M=0,S=0,w=0,E=0,L=0,b=0,A=0,P=0;l.sort(q2);for(let N=0,U=l.length;N<U;N++){const D=l[N],F=D.color,z=D.intensity,X=D.distance;let Q=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===Ki?Q=D.shadow.map.texture:Q=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)h+=F.r*z,d+=F.g*z,u+=F.b*z;else if(D.isLightProbe){for(let Y=0;Y<9;Y++)i.probe[Y].addScaledVector(D.sh.coefficients[Y],z);P++}else if(D.isSunLight){const Y=e.get(D);if(Y.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const te=D.shadow,O=t.get(D);O.shadowIntensity=te.intensity,O.shadowBias=te.bias,O.shadowNormalBias=te.normalBias,O.shadowRadius=te.radius,O.shadowMapSize.copy(te.mapSize).multiply(te.getFrameExtents()),i.sunShadow[g]=O,i.sunShadowMap[g]=Q;const ne=te.getViewportCount();for(let ce=0;ce<ne;ce++)i.sunShadowMatrix[v+ce]=te.getMatrix(ce),i.sunShadowCascade[v+ce]=te._cascadeData[ce];v+=ne,g++}i.sun[p]=Y,p++}else if(D.isDirectionalLight){const Y=e.get(D);if(Y.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const te=D.shadow,O=t.get(D);O.shadowIntensity=te.intensity,O.shadowBias=te.bias,O.shadowNormalBias=te.normalBias,O.shadowRadius=te.radius,O.shadowMapSize=te.mapSize,i.directionalShadow[x]=O,i.directionalShadowMap[x]=Q,i.directionalShadowMatrix[x]=D.shadow.matrix,w++}i.directional[x]=Y,x++}else if(D.isSpotLight){const Y=e.get(D);Y.position.setFromMatrixPosition(D.matrixWorld),Y.color.copy(F).multiplyScalar(z),Y.distance=X,Y.coneCos=Math.cos(D.angle),Y.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),Y.decay=D.decay,i.spot[_]=Y;const te=D.shadow;if(D.map&&(i.spotLightMap[b]=D.map,b++,te.updateMatrices(D),D.castShadow&&A++),i.spotLightMatrix[_]=te.matrix,D.castShadow){const O=t.get(D);O.shadowIntensity=te.intensity,O.shadowBias=te.bias,O.shadowNormalBias=te.normalBias,O.shadowRadius=te.radius,O.shadowMapSize=te.mapSize,i.spotShadow[_]=O,i.spotShadowMap[_]=Q,L++}_++}else if(D.isRectAreaLight){const Y=e.get(D);Y.color.copy(F).multiplyScalar(z),Y.halfWidth.set(D.width*.5,0,0),Y.halfHeight.set(0,D.height*.5,0),i.rectArea[M]=Y,M++}else if(D.isPointLight){const Y=e.get(D);if(Y.color.copy(D.color).multiplyScalar(D.intensity),Y.distance=D.distance,Y.decay=D.decay,D.castShadow){const te=D.shadow,O=t.get(D);O.shadowIntensity=te.intensity,O.shadowBias=te.bias,O.shadowNormalBias=te.normalBias,O.shadowRadius=te.radius,O.shadowMapSize=te.mapSize,O.shadowCameraNear=te.camera.near,O.shadowCameraFar=te.camera.far,i.pointShadow[m]=O,i.pointShadowMap[m]=Q,i.pointShadowMatrix[m]=D.shadow.matrix,E++}i.point[m]=Y,m++}else if(D.isHemisphereLight){const Y=e.get(D);Y.skyColor.copy(D.color).multiplyScalar(z),Y.groundColor.copy(D.groundColor).multiplyScalar(z),i.hemi[S]=Y,S++}}M>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ve.LTC_FLOAT_1,i.rectAreaLTC2=ve.LTC_FLOAT_2):(i.rectAreaLTC1=ve.LTC_HALF_1,i.rectAreaLTC2=ve.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=u;const C=i.hash;(C.sunLength!==p||C.directionalLength!==x||C.pointLength!==m||C.spotLength!==_||C.rectAreaLength!==M||C.hemiLength!==S||C.numSunShadows!==g||C.numDirectionalShadows!==w||C.numPointShadows!==E||C.numSpotShadows!==L||C.numSpotMaps!==b||C.numLightProbes!==P)&&(i.sun.length=p,i.directional.length=x,i.spot.length=_,i.rectArea.length=M,i.point.length=m,i.hemi.length=S,i.sunShadow.length=g,i.sunShadowMap.length=g,i.sunShadowMatrix.length=v,i.sunShadowCascade.length=v,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.directionalShadowMatrix.length=w,i.pointShadow.length=E,i.pointShadowMap.length=E,i.pointShadowMatrix.length=E,i.spotShadow.length=L,i.spotShadowMap.length=L,i.spotLightMatrix.length=L+b-A,i.spotLightMap.length=b,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=P,C.sunLength=p,C.directionalLength=x,C.pointLength=m,C.spotLength=_,C.rectAreaLength=M,C.hemiLength=S,C.numSunShadows=g,C.numDirectionalShadows=w,C.numPointShadows=E,C.numSpotShadows=L,C.numSpotMaps=b,C.numLightProbes=P,i.version=K2++)}function c(l,h){let d=0,u=0,p=0,g=0,v=0,x=0;const m=h.matrixWorldInverse;for(let _=0,M=l.length;_<M;_++){const S=l[_];if(S.isSunLight){const w=i.sun[d];w.direction.setFromMatrixPosition(S.matrixWorld),w.direction.transformDirection(m),d++}else if(S.isDirectionalLight){const w=i.directional[u];w.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(m),u++}else if(S.isSpotLight){const w=i.spot[g];w.position.setFromMatrixPosition(S.matrixWorld),w.position.applyMatrix4(m),w.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(m),g++}else if(S.isRectAreaLight){const w=i.rectArea[v];w.position.setFromMatrixPosition(S.matrixWorld),w.position.applyMatrix4(m),a.identity(),s.copy(S.matrixWorld),s.premultiply(m),a.extractRotation(s),w.halfWidth.set(S.width*.5,0,0),w.halfHeight.set(0,S.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),v++}else if(S.isPointLight){const w=i.point[p];w.position.setFromMatrixPosition(S.matrixWorld),w.position.applyMatrix4(m),p++}else if(S.isHemisphereLight){const w=i.hemi[x];w.direction.setFromMatrixPosition(S.matrixWorld),w.direction.transformDirection(m),x++}}}return{setup:o,setupView:c,state:i}}function gh(n){const e=new $2(n),t=[],i=[],r=[];function s(u){d.camera=u,t.length=0,i.length=0,r.length=0}function a(u){t.push(u)}function o(u){i.push(u)}function c(u){r.push(u)}function l(){e.setup(t)}function h(u){e.setupView(t,u)}const d={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:d,setupLights:l,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function Z2(n){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new gh(n),e.set(r,[o])):s>=a.length?(o=new gh(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const J2=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Q2=`uniform sampler2D shadow_pass;
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
}`,j2=[new W(1,0,0),new W(-1,0,0),new W(0,1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1)],e_=[new W(0,-1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1),new W(0,-1,0),new W(0,-1,0)],xh=new Nt,$r=new W,vo=new W;function t_(n,e,t){let i=new fa;const r=new We,s=new We,a=new ht,o=new fg,c=new pg,l={},h=t.maxTextureSize,d={[Xi]:dn,[dn]:Xi,[oi]:oi},u=new Rt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new We},radius:{value:4}},vertexShader:J2,fragmentShader:Q2}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const g=new Yt;g.setAttribute("position",new bn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Jt(g,u),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Qs;let m=this.type;this.render=function(E,L,b){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||E.length===0)return;this.type===im&&(Ge("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Qs);const A=n.getRenderTarget(),P=n.getActiveCubeFace(),C=n.getActiveMipmapLevel(),N=n.state;N.setBlending(Zn),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const U=m!==this.type;U&&L.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach(F=>F.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,F=E.length;D<F;D++){const z=E[D],X=z.shadow;if(X===void 0){Ge("WebGLShadowMap:",z,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;r.copy(X.mapSize);const Q=X.getFrameExtents();r.multiply(Q),s.copy(X.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/Q.x),r.x=s.x*Q.x,X.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/Q.y),r.y=s.y*Q.y,X.mapSize.y=s.y));const Y=n.state.buffers.depth.getReversed();if(X.camera._reversedDepth=Y,X.map===null||U===!0){if(X.map!==null&&(X.map.depthTexture!==null&&(X.map.depthTexture.dispose(),X.map.depthTexture=null),X.map.dispose()),this.type===Qr){if(z.isPointLight){Ge("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}X.map=new Cn(r.x,r.y,{format:Ki,type:jn,minFilter:Bt,magFilter:Bt,generateMipmaps:!1}),X.map.texture.name=z.name+".shadowMap",X.map.depthTexture=new Lr(r.x,r.y,qn),X.map.depthTexture.name=z.name+".shadowMapDepth",X.map.depthTexture.format=ui,X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=kt,X.map.depthTexture.magFilter=kt}else z.isPointLight?(X.map=new Pu(r.x),X.map.depthTexture=new og(r.x,Qn)):(X.map=new Cn(r.x,r.y),X.map.depthTexture=new Lr(r.x,r.y,Qn)),X.map.depthTexture.name=z.name+".shadowMap",X.map.depthTexture.format=ui,this.type===Qs?(X.map.depthTexture.compareFunction=Y?Gl:kl,X.map.depthTexture.minFilter=Bt,X.map.depthTexture.magFilter=Bt):(X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=kt,X.map.depthTexture.magFilter=kt);X.camera.updateProjectionMatrix()}X.map.isWebGLCubeRenderTarget!==!0&&(X.map.width!==r.x||X.map.height!==r.y)&&X.map.setSize(r.x,r.y);const te=X.map.isWebGLCubeRenderTarget?6:X.getViewportCount();z.isPointLight!==!0&&X.updateMatrices(z,b);for(let O=0;O<te;O++){const ne=X.getCamera(O);if(z.isPointLight){const ce=X.camera,be=X.matrix,Ue=z.distance||ce.far;Ue!==ce.far&&(ce.far=Ue,ce.updateProjectionMatrix()),$r.setFromMatrixPosition(z.matrixWorld),ce.position.copy($r),vo.copy(ce.position),vo.add(j2[O]),ce.up.copy(e_[O]),ce.lookAt(vo),ce.updateMatrixWorld(),be.makeTranslation(-$r.x,-$r.y,-$r.z),xh.multiplyMatrices(ce.projectionMatrix,ce.matrixWorldInverse),X._frustum.setFromProjectionMatrix(xh,ce.coordinateSystem,ce.reversedDepth)}if(X.map.isWebGLCubeRenderTarget)n.setRenderTarget(X.map,O),n.clear();else{O===0&&(n.setRenderTarget(X.map),n.clear());const ce=X.getViewport(O);a.set(s.x*ce.x,s.y*ce.y,s.x*ce.z,s.y*ce.w),N.viewport(a)}i=X.getFrustum(O),S(L,b,ne,z,this.type)}X.isPointLightShadow!==!0&&this.type===Qr&&_(X,b),X.needsUpdate=!1}m=this.type,x.needsUpdate=!1,n.setRenderTarget(A,P,C)};function _(E,L){const b=e.update(v);u.defines.VSM_SAMPLES!==E.blurSamples&&(u.defines.VSM_SAMPLES=E.blurSamples,p.defines.VSM_SAMPLES=E.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),E.mapPass===null?E.mapPass=new Cn(r.x,r.y,{format:Ki,type:jn}):(E.mapPass.width!==E.map.width||E.mapPass.height!==E.map.height)&&E.mapPass.setSize(E.map.width,E.map.height),u.uniforms.shadow_pass.value=E.map.depthTexture,u.uniforms.resolution.value.set(E.map.width,E.map.height),u.uniforms.radius.value=E.radius,n.setRenderTarget(E.mapPass),n.clear(),n.renderBufferDirect(L,null,b,u,v,null),p.uniforms.shadow_pass.value=E.mapPass.texture,p.uniforms.resolution.value.set(E.map.width,E.map.height),p.uniforms.radius.value=E.radius,n.setRenderTarget(E.map),n.clear(),n.renderBufferDirect(L,null,b,p,v,null)}function M(E,L,b,A){let P=null;const C=b.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(C!==void 0)P=C;else if(P=b.isPointLight===!0?c:o,n.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){const N=P.uuid,U=L.uuid;let D=l[N];D===void 0&&(D={},l[N]=D);let F=D[U];F===void 0&&(F=P.clone(),D[U]=F,L.addEventListener("dispose",w)),P=F}if(P.visible=L.visible,P.wireframe=L.wireframe,A===Qr?P.side=L.shadowSide!==null?L.shadowSide:L.side:P.side=L.shadowSide!==null?L.shadowSide:d[L.side],P.alphaMap=L.alphaMap,P.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,P.map=L.map,P.clipShadows=L.clipShadows,P.clippingPlanes=L.clippingPlanes,P.clipIntersection=L.clipIntersection,P.displacementMap=L.displacementMap,P.displacementScale=L.displacementScale,P.displacementBias=L.displacementBias,P.wireframeLinewidth=L.wireframeLinewidth,P.linewidth=L.linewidth,b.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const N=n.properties.get(P);N.light=b}return P}function S(E,L,b,A,P){if(E.visible===!1)return;if(E.layers.test(L.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&P===Qr)&&(!E.frustumCulled||E.intersectsFrustum(i))){E.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,E.matrixWorld);const U=e.update(E),D=E.material;if(Array.isArray(D)){const F=U.groups;for(let z=0,X=F.length;z<X;z++){const Q=F[z],Y=D[Q.materialIndex];if(Y&&Y.visible){const te=M(E,Y,A,P);E.onBeforeShadow(n,E,L,b,U,te,Q),n.renderBufferDirect(b,null,U,te,E,Q),E.onAfterShadow(n,E,L,b,U,te,Q)}}}else if(D.visible){const F=M(E,D,A,P);E.onBeforeShadow(n,E,L,b,U,F,null),n.renderBufferDirect(b,null,U,F,E,null),E.onAfterShadow(n,E,L,b,U,F,null)}}const N=E.children;for(let U=0,D=N.length;U<D;U++)S(N[U],L,b,A,P)}function w(E){E.target.removeEventListener("dispose",w);for(const b in l){const A=l[b],P=E.target.uuid;P in A&&(A[P].dispose(),delete A[P])}}}function n_(n,e){function t(){let H=!1;const pe=new ht;let re=null;const me=new ht(0,0,0,0);return{setMask:function(Se){re!==Se&&!H&&(n.colorMask(Se,Se,Se,Se),re=Se)},setLocked:function(Se){H=Se},setClear:function(Se,oe,Ne,Pe,Et){Et===!0&&(Se*=Pe,oe*=Pe,Ne*=Pe),pe.set(Se,oe,Ne,Pe),me.equals(pe)===!1&&(n.clearColor(Se,oe,Ne,Pe),me.copy(pe))},reset:function(){H=!1,re=null,me.set(-1,0,0,0)}}}function i(){let H=!1,pe=!1,re=null,me=null,Se=null;return{setReversed:function(oe){if(pe!==oe){const Ne=e.get("EXT_clip_control");oe?Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.ZERO_TO_ONE_EXT):Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.NEGATIVE_ONE_TO_ONE_EXT),pe=oe;const Pe=Se;Se=null,this.setClear(Pe)}},getReversed:function(){return pe},setTest:function(oe){oe?se(n.DEPTH_TEST):V(n.DEPTH_TEST)},setMask:function(oe){re!==oe&&!H&&(n.depthMask(oe),re=oe)},setFunc:function(oe){if(pe&&(oe=Um[oe]),me!==oe){switch(oe){case Co:n.depthFunc(n.NEVER);break;case Lo:n.depthFunc(n.ALWAYS);break;case Po:n.depthFunc(n.LESS);break;case is:n.depthFunc(n.LEQUAL);break;case Do:n.depthFunc(n.EQUAL);break;case Io:n.depthFunc(n.GEQUAL);break;case No:n.depthFunc(n.GREATER);break;case Uo:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}me=oe}},setLocked:function(oe){H=oe},setClear:function(oe){Se!==oe&&(Se=oe,pe&&(oe=1-oe),n.clearDepth(oe))},reset:function(){H=!1,re=null,me=null,Se=null,pe=!1}}}function r(){let H=!1,pe=null,re=null,me=null,Se=null,oe=null,Ne=null,Pe=null,Et=null;return{setTest:function(ut){H||(ut?se(n.STENCIL_TEST):V(n.STENCIL_TEST))},setMask:function(ut){pe!==ut&&!H&&(n.stencilMask(ut),pe=ut)},setFunc:function(ut,Pn,Hn){(re!==ut||me!==Pn||Se!==Hn)&&(n.stencilFunc(ut,Pn,Hn),re=ut,me=Pn,Se=Hn)},setOp:function(ut,Pn,Hn){(oe!==ut||Ne!==Pn||Pe!==Hn)&&(n.stencilOp(ut,Pn,Hn),oe=ut,Ne=Pn,Pe=Hn)},setLocked:function(ut){H=ut},setClear:function(ut){Et!==ut&&(n.clearStencil(ut),Et=ut)},reset:function(){H=!1,pe=null,re=null,me=null,Se=null,oe=null,Ne=null,Pe=null,Et=null}}}const s=new t,a=new i,o=new r,c=new WeakMap,l=new WeakMap;let h={},d={},u={},p=new WeakMap,g=[],v=null,x=!1,m=null,_=null,M=null,S=null,w=null,E=null,L=null,b=new tt(0,0,0),A=0,P=!1,C=null,N=null,U=null,D=null,F=null;const z=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,Q=0;const Y=n.getParameter(n.VERSION);Y.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(Y)[1]),X=Q>=1):Y.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),X=Q>=2);let te=null,O={};const ne=n.getParameter(n.SCISSOR_BOX),ce=n.getParameter(n.VIEWPORT),be=new ht().fromArray(ne),Ue=new ht().fromArray(ce);function ke(H,pe,re,me){const Se=new Uint8Array(4),oe=n.createTexture();n.bindTexture(H,oe),n.texParameteri(H,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(H,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ne=0;Ne<re;Ne++)H===n.TEXTURE_3D||H===n.TEXTURE_2D_ARRAY?n.texImage3D(pe,0,n.RGBA,1,1,me,0,n.RGBA,n.UNSIGNED_BYTE,Se):n.texImage2D(pe+Ne,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Se);return oe}const ee={};ee[n.TEXTURE_2D]=ke(n.TEXTURE_2D,n.TEXTURE_2D,1),ee[n.TEXTURE_CUBE_MAP]=ke(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ee[n.TEXTURE_2D_ARRAY]=ke(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ee[n.TEXTURE_3D]=ke(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),se(n.DEPTH_TEST),a.setFunc(is),Ye(!1),bt(vc),se(n.CULL_FACE),Fe(Zn);function se(H){h[H]!==!0&&(n.enable(H),h[H]=!0)}function V(H){h[H]!==!1&&(n.disable(H),h[H]=!1)}function he(H,pe){return u[H]!==pe?(n.bindFramebuffer(H,pe),u[H]=pe,H===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=pe),H===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=pe),!0):!1}function ae(H,pe){let re=g,me=!1;if(H){re=p.get(pe),re===void 0&&(re=[],p.set(pe,re));const Se=H.textures;if(re.length!==Se.length||re[0]!==n.COLOR_ATTACHMENT0){for(let oe=0,Ne=Se.length;oe<Ne;oe++)re[oe]=n.COLOR_ATTACHMENT0+oe;re.length=Se.length,me=!0}}else re[0]!==n.BACK&&(re[0]=n.BACK,me=!0);me&&n.drawBuffers(re)}function Ee(H){return v!==H?(n.useProgram(H),v=H,!0):!1}const Je={[mr]:n.FUNC_ADD,[rm]:n.FUNC_SUBTRACT,[sm]:n.FUNC_REVERSE_SUBTRACT};Je[am]=n.MIN,Je[om]=n.MAX;const Ce={[Dl]:n.ZERO,[lm]:n.ONE,[Il]:n.SRC_COLOR,[Qh]:n.SRC_ALPHA,[pm]:n.SRC_ALPHA_SATURATE,[dm]:n.DST_COLOR,[hm]:n.DST_ALPHA,[cm]:n.ONE_MINUS_SRC_COLOR,[jh]:n.ONE_MINUS_SRC_ALPHA,[fm]:n.ONE_MINUS_DST_COLOR,[um]:n.ONE_MINUS_DST_ALPHA,[mm]:n.CONSTANT_COLOR,[gm]:n.ONE_MINUS_CONSTANT_COLOR,[xm]:n.CONSTANT_ALPHA,[vm]:n.ONE_MINUS_CONSTANT_ALPHA};function Fe(H,pe,re,me,Se,oe,Ne,Pe,Et,ut){if(H===Zn){x===!0&&(V(n.BLEND),x=!1);return}if(x===!1&&(se(n.BLEND),x=!0),H!==Pl){if(H!==m||ut!==P){if((_!==mr||w!==mr)&&(n.blendEquation(n.FUNC_ADD),_=mr,w=mr),ut)switch(H){case Sr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Rr:n.blendFunc(n.ONE,n.ONE);break;case _c:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Mc:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:ot("WebGLState: Invalid blending: ",H);break}else switch(H){case Sr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Rr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case _c:ot("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Mc:ot("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:ot("WebGLState: Invalid blending: ",H);break}M=null,S=null,E=null,L=null,b.set(0,0,0),A=0,m=H,P=ut}return}Se=Se||pe,oe=oe||re,Ne=Ne||me,(pe!==_||Se!==w)&&(n.blendEquationSeparate(Je[pe],Je[Se]),_=pe,w=Se),(re!==M||me!==S||oe!==E||Ne!==L)&&(n.blendFuncSeparate(Ce[re],Ce[me],Ce[oe],Ce[Ne]),M=re,S=me,E=oe,L=Ne),(Pe.equals(b)===!1||Et!==A)&&(n.blendColor(Pe.r,Pe.g,Pe.b,Et),b.copy(Pe),A=Et),m=H,P=!1}function Ke(H,pe){H.side===oi?V(n.CULL_FACE):se(n.CULL_FACE);let re=H.side===dn;pe&&(re=!re),Ye(re),H.blending===Sr&&H.transparent===!1?Fe(Zn):Fe(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),a.setFunc(H.depthFunc),a.setTest(H.depthTest),a.setMask(H.depthWrite),s.setMask(H.colorWrite);const me=H.stencilWrite;o.setTest(me),me&&(o.setMask(H.stencilWriteMask),o.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),o.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),$t(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?se(n.SAMPLE_ALPHA_TO_COVERAGE):V(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ye(H){C!==H&&(H?n.frontFace(n.CW):n.frontFace(n.CCW),C=H)}function bt(H){H!==tm?(se(n.CULL_FACE),H!==N&&(H===vc?n.cullFace(n.BACK):H===nm?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):V(n.CULL_FACE),N=H}function Ut(H){H!==U&&(X&&n.lineWidth(H),U=H)}function $t(H,pe,re){H?(se(n.POLYGON_OFFSET_FILL),(D!==pe||F!==re)&&(D=pe,F=re,a.getReversed()&&(pe=-pe),n.polygonOffset(pe,re))):V(n.POLYGON_OFFSET_FILL)}function _t(H){H?se(n.SCISSOR_TEST):V(n.SCISSOR_TEST)}function yt(H){H===void 0&&(H=n.TEXTURE0+z-1),te!==H&&(n.activeTexture(H),te=H)}function G(H,pe,re){re===void 0&&(te===null?re=n.TEXTURE0+z-1:re=te);let me=O[re];me===void 0&&(me={type:void 0,texture:void 0},O[re]=me),(me.type!==H||me.texture!==pe)&&(te!==re&&(n.activeTexture(re),te=re),n.bindTexture(H,pe||ee[H]),me.type=H,me.texture=pe)}function Qe(){const H=O[te];H!==void 0&&H.type!==void 0&&(n.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function ze(){try{n.compressedTexImage2D(...arguments)}catch(H){ot("WebGLState:",H)}}function I(){try{n.compressedTexImage3D(...arguments)}catch(H){ot("WebGLState:",H)}}function y(){try{n.texSubImage2D(...arguments)}catch(H){ot("WebGLState:",H)}}function B(){try{n.texSubImage3D(...arguments)}catch(H){ot("WebGLState:",H)}}function K(){try{n.compressedTexSubImage2D(...arguments)}catch(H){ot("WebGLState:",H)}}function Z(){try{n.compressedTexSubImage3D(...arguments)}catch(H){ot("WebGLState:",H)}}function le(){try{n.texStorage2D(...arguments)}catch(H){ot("WebGLState:",H)}}function ue(){try{n.texStorage3D(...arguments)}catch(H){ot("WebGLState:",H)}}function j(){try{n.texImage2D(...arguments)}catch(H){ot("WebGLState:",H)}}function ie(){try{n.texImage3D(...arguments)}catch(H){ot("WebGLState:",H)}}function de(H){return d[H]!==void 0?d[H]:n.getParameter(H)}function Le(H,pe){d[H]!==pe&&(n.pixelStorei(H,pe),d[H]=pe)}function xe(H){be.equals(H)===!1&&(n.scissor(H.x,H.y,H.z,H.w),be.copy(H))}function fe(H){Ue.equals(H)===!1&&(n.viewport(H.x,H.y,H.z,H.w),Ue.copy(H))}function Ie(H,pe){let re=l.get(pe);re===void 0&&(re=new WeakMap,l.set(pe,re));let me=re.get(H);me===void 0&&(me=n.getUniformBlockIndex(pe,H.name),re.set(H,me))}function Be(H,pe){const me=l.get(pe).get(H);c.get(pe)!==me&&(n.uniformBlockBinding(pe,me,H.__bindingPointIndex),c.set(pe,me))}function qe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),h={},d={},te=null,O={},u={},p=new WeakMap,g=[],v=null,x=!1,m=null,_=null,M=null,S=null,w=null,E=null,L=null,b=new tt(0,0,0),A=0,P=!1,C=null,N=null,U=null,D=null,F=null,be.set(0,0,n.canvas.width,n.canvas.height),Ue.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:se,disable:V,bindFramebuffer:he,drawBuffers:ae,useProgram:Ee,setBlending:Fe,setMaterial:Ke,setFlipSided:Ye,setCullFace:bt,setLineWidth:Ut,setPolygonOffset:$t,setScissorTest:_t,activeTexture:yt,bindTexture:G,unbindTexture:Qe,compressedTexImage2D:ze,compressedTexImage3D:I,texImage2D:j,texImage3D:ie,pixelStorei:Le,getParameter:de,updateUBOMapping:Ie,uniformBlockBinding:Be,texStorage2D:le,texStorage3D:ue,texSubImage2D:y,texSubImage3D:B,compressedTexSubImage2D:K,compressedTexSubImage3D:Z,scissor:xe,viewport:fe,reset:qe}}function i_(n,e,t,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new We,h=new WeakMap,d=new Set;let u;const p=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(I,y){return g?new OffscreenCanvas(I,y):da("canvas")}function x(I,y,B){let K=1;const Z=ze(I);if((Z.width>B||Z.height>B)&&(K=B/Math.max(Z.width,Z.height)),K<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const le=Math.floor(K*Z.width),ue=Math.floor(K*Z.height);u===void 0&&(u=v(le,ue));const j=y?v(le,ue):u;return j.width=le,j.height=ue,j.getContext("2d").drawImage(I,0,0,le,ue),Ge("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+le+"x"+ue+")."),j}else return"data"in I&&Ge("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),I;return I}function m(I){return I.generateMipmaps}function _(I){n.generateMipmap(I)}function M(I){return I.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?n.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function S(I,y,B,K,Z,le=!1){if(I!==null){if(n[I]!==void 0)return n[I];Ge("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let ue;K&&(ue=e.get("EXT_texture_norm16"),ue||Ge("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let j=y;if(y===n.RED&&(B===n.FLOAT&&(j=n.R32F),B===n.HALF_FLOAT&&(j=n.R16F),B===n.UNSIGNED_BYTE&&(j=n.R8),B===n.UNSIGNED_SHORT&&ue&&(j=ue.R16_EXT),B===n.SHORT&&ue&&(j=ue.R16_SNORM_EXT)),y===n.RED_INTEGER&&(B===n.UNSIGNED_BYTE&&(j=n.R8UI),B===n.UNSIGNED_SHORT&&(j=n.R16UI),B===n.UNSIGNED_INT&&(j=n.R32UI),B===n.BYTE&&(j=n.R8I),B===n.SHORT&&(j=n.R16I),B===n.INT&&(j=n.R32I)),y===n.RG&&(B===n.FLOAT&&(j=n.RG32F),B===n.HALF_FLOAT&&(j=n.RG16F),B===n.UNSIGNED_BYTE&&(j=n.RG8),B===n.UNSIGNED_SHORT&&ue&&(j=ue.RG16_EXT),B===n.SHORT&&ue&&(j=ue.RG16_SNORM_EXT)),y===n.RG_INTEGER&&(B===n.UNSIGNED_BYTE&&(j=n.RG8UI),B===n.UNSIGNED_SHORT&&(j=n.RG16UI),B===n.UNSIGNED_INT&&(j=n.RG32UI),B===n.BYTE&&(j=n.RG8I),B===n.SHORT&&(j=n.RG16I),B===n.INT&&(j=n.RG32I)),y===n.RGB_INTEGER&&(B===n.UNSIGNED_BYTE&&(j=n.RGB8UI),B===n.UNSIGNED_SHORT&&(j=n.RGB16UI),B===n.UNSIGNED_INT&&(j=n.RGB32UI),B===n.BYTE&&(j=n.RGB8I),B===n.SHORT&&(j=n.RGB16I),B===n.INT&&(j=n.RGB32I)),y===n.RGBA_INTEGER&&(B===n.UNSIGNED_BYTE&&(j=n.RGBA8UI),B===n.UNSIGNED_SHORT&&(j=n.RGBA16UI),B===n.UNSIGNED_INT&&(j=n.RGBA32UI),B===n.BYTE&&(j=n.RGBA8I),B===n.SHORT&&(j=n.RGBA16I),B===n.INT&&(j=n.RGBA32I)),y===n.RGB&&(B===n.UNSIGNED_SHORT&&ue&&(j=ue.RGB16_EXT),B===n.SHORT&&ue&&(j=ue.RGB16_SNORM_EXT),B===n.UNSIGNED_INT_5_9_9_9_REV&&(j=n.RGB9_E5),B===n.UNSIGNED_INT_10F_11F_11F_REV&&(j=n.R11F_G11F_B10F)),y===n.RGBA){const ie=le?ha:it.getTransfer(Z);B===n.FLOAT&&(j=n.RGBA32F),B===n.HALF_FLOAT&&(j=n.RGBA16F),B===n.UNSIGNED_BYTE&&(j=ie===xt?n.SRGB8_ALPHA8:n.RGBA8),B===n.UNSIGNED_SHORT&&ue&&(j=ue.RGBA16_EXT),B===n.SHORT&&ue&&(j=ue.RGBA16_SNORM_EXT),B===n.UNSIGNED_SHORT_4_4_4_4&&(j=n.RGBA4),B===n.UNSIGNED_SHORT_5_5_5_1&&(j=n.RGB5_A1)}return(j===n.R16F||j===n.R32F||j===n.RG16F||j===n.RG32F||j===n.RGBA16F||j===n.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function w(I,y){let B;return I?y===null||y===Qn||y===ss?B=n.DEPTH24_STENCIL8:y===qn?B=n.DEPTH32F_STENCIL8:y===rs&&(B=n.DEPTH24_STENCIL8,Ge("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===Qn||y===ss?B=n.DEPTH_COMPONENT24:y===qn?B=n.DEPTH_COMPONENT32F:y===rs&&(B=n.DEPTH_COMPONENT16),B}function E(I,y){return m(I)===!0||I.isFramebufferTexture&&I.minFilter!==kt&&I.minFilter!==Bt?Math.log2(Math.max(y.width,y.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?y.mipmaps.length:1}function L(I){const y=I.target;y.removeEventListener("dispose",L),A(y),y.isVideoTexture&&h.delete(y),y.isHTMLTexture&&d.delete(y)}function b(I){const y=I.target;y.removeEventListener("dispose",b),C(y)}function A(I){const y=i.get(I);if(y.__webglInit===void 0)return;const B=I.source,K=p.get(B);if(K){const Z=K[y.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&P(I),Object.keys(K).length===0&&p.delete(B)}i.remove(I)}function P(I){const y=i.get(I);n.deleteTexture(y.__webglTexture);const B=I.source,K=p.get(B);delete K[y.__cacheKey],a.memory.textures--}function C(I){const y=i.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),i.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(y.__webglFramebuffer[K]))for(let Z=0;Z<y.__webglFramebuffer[K].length;Z++)n.deleteFramebuffer(y.__webglFramebuffer[K][Z]);else n.deleteFramebuffer(y.__webglFramebuffer[K]);y.__webglDepthbuffer&&n.deleteRenderbuffer(y.__webglDepthbuffer[K])}else{if(Array.isArray(y.__webglFramebuffer))for(let K=0;K<y.__webglFramebuffer.length;K++)n.deleteFramebuffer(y.__webglFramebuffer[K]);else n.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&n.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&n.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let K=0;K<y.__webglColorRenderbuffer.length;K++)y.__webglColorRenderbuffer[K]&&n.deleteRenderbuffer(y.__webglColorRenderbuffer[K]);y.__webglDepthRenderbuffer&&n.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const B=I.textures;for(let K=0,Z=B.length;K<Z;K++){const le=i.get(B[K]);le.__webglTexture&&(n.deleteTexture(le.__webglTexture),a.memory.textures--),i.remove(B[K])}i.remove(I)}let N=0;function U(){N=0}function D(){return N}function F(I){N=I}function z(){const I=N;return I>=r.maxTextures&&Ge("WebGLTextures: Trying to use "+(I+1)+" texture units while this GPU supports only "+r.maxTextures),N+=1,I}function X(I){const y=[];return y.push(I.wrapS),y.push(I.wrapT),y.push(I.wrapR||0),y.push(I.magFilter),y.push(I.minFilter),y.push(I.anisotropy),y.push(I.internalFormat),y.push(I.format),y.push(I.type),y.push(I.generateMipmaps),y.push(I.premultiplyAlpha),y.push(I.flipY),y.push(I.unpackAlignment),y.push(I.colorSpace),y.join()}function Q(I,y){const B=i.get(I);if(I.isVideoTexture&&G(I),I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&B.__version!==I.version){const K=I.image;if(K===null)Ge("WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)Ge("WebGLRenderer: Texture marked for update but image is incomplete");else{V(B,I,y);return}}else I.isExternalTexture&&(B.__webglTexture=I.sourceTexture?I.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,B.__webglTexture,n.TEXTURE0+y)}function Y(I,y){const B=i.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&B.__version!==I.version){V(B,I,y);return}else I.isExternalTexture&&(B.__webglTexture=I.sourceTexture?I.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,B.__webglTexture,n.TEXTURE0+y)}function te(I,y){const B=i.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&B.__version!==I.version){V(B,I,y);return}t.bindTexture(n.TEXTURE_3D,B.__webglTexture,n.TEXTURE0+y)}function O(I,y){const B=i.get(I);if(I.isCubeDepthTexture!==!0&&I.version>0&&B.__version!==I.version){he(B,I,y);return}t.bindTexture(n.TEXTURE_CUBE_MAP,B.__webglTexture,n.TEXTURE0+y)}const ne={[Fo]:n.REPEAT,[li]:n.CLAMP_TO_EDGE,[Oo]:n.MIRRORED_REPEAT},ce={[kt]:n.NEAREST,[Sm]:n.NEAREST_MIPMAP_NEAREST,[vs]:n.NEAREST_MIPMAP_LINEAR,[Bt]:n.LINEAR,[Ga]:n.LINEAR_MIPMAP_NEAREST,[ki]:n.LINEAR_MIPMAP_LINEAR},be={[Em]:n.NEVER,[Lm]:n.ALWAYS,[Am]:n.LESS,[kl]:n.LEQUAL,[Tm]:n.EQUAL,[Gl]:n.GEQUAL,[Rm]:n.GREATER,[Cm]:n.NOTEQUAL};function Ue(I,y){if(y.type===qn&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===Bt||y.magFilter===Ga||y.magFilter===vs||y.magFilter===ki||y.minFilter===Bt||y.minFilter===Ga||y.minFilter===vs||y.minFilter===ki)&&Ge("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(I,n.TEXTURE_WRAP_S,ne[y.wrapS]),n.texParameteri(I,n.TEXTURE_WRAP_T,ne[y.wrapT]),(I===n.TEXTURE_3D||I===n.TEXTURE_2D_ARRAY)&&n.texParameteri(I,n.TEXTURE_WRAP_R,ne[y.wrapR]),n.texParameteri(I,n.TEXTURE_MAG_FILTER,ce[y.magFilter]),n.texParameteri(I,n.TEXTURE_MIN_FILTER,ce[y.minFilter]),y.compareFunction&&(n.texParameteri(I,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(I,n.TEXTURE_COMPARE_FUNC,be[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===kt||y.minFilter!==vs&&y.minFilter!==ki||y.type===qn&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||i.get(y).__currentAnisotropy){const B=e.get("EXT_texture_filter_anisotropic");n.texParameterf(I,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,r.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy}}}function ke(I,y){let B=!1;I.__webglInit===void 0&&(I.__webglInit=!0,y.addEventListener("dispose",L));const K=y.source;let Z=p.get(K);Z===void 0&&(Z={},p.set(K,Z));const le=X(y);if(le!==I.__cacheKey){Z[le]===void 0&&(Z[le]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,B=!0),Z[le].usedTimes++;const ue=Z[I.__cacheKey];ue!==void 0&&(Z[I.__cacheKey].usedTimes--,ue.usedTimes===0&&P(y)),I.__cacheKey=le,I.__webglTexture=Z[le].texture}return B}function ee(I,y,B){return Math.floor(Math.floor(I/B)/y)}function se(I,y,B,K){const le=I.updateRanges;if(le.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,y.width,y.height,B,K,y.data);else{le.sort((Le,xe)=>Le.start-xe.start);let ue=0;for(let Le=1;Le<le.length;Le++){const xe=le[ue],fe=le[Le],Ie=xe.start+xe.count,Be=ee(fe.start,y.width,4),qe=ee(xe.start,y.width,4);fe.start<=Ie+1&&Be===qe&&ee(fe.start+fe.count-1,y.width,4)===Be?xe.count=Math.max(xe.count,fe.start+fe.count-xe.start):(++ue,le[ue]=fe)}le.length=ue+1;const j=t.getParameter(n.UNPACK_ROW_LENGTH),ie=t.getParameter(n.UNPACK_SKIP_PIXELS),de=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,y.width);for(let Le=0,xe=le.length;Le<xe;Le++){const fe=le[Le],Ie=Math.floor(fe.start/4),Be=Math.ceil(fe.count/4),qe=Ie%y.width,H=Math.floor(Ie/y.width),pe=Be,re=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,qe),t.pixelStorei(n.UNPACK_SKIP_ROWS,H),t.texSubImage2D(n.TEXTURE_2D,0,qe,H,pe,re,B,K,y.data)}I.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,j),t.pixelStorei(n.UNPACK_SKIP_PIXELS,ie),t.pixelStorei(n.UNPACK_SKIP_ROWS,de)}}function V(I,y,B){let K=n.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(K=n.TEXTURE_2D_ARRAY),y.isData3DTexture&&(K=n.TEXTURE_3D);const Z=ke(I,y),le=y.source;t.bindTexture(K,I.__webglTexture,n.TEXTURE0+B);const ue=i.get(le);if(le.version!==ue.__version||Z===!0){if(t.activeTexture(n.TEXTURE0+B),(typeof ImageBitmap<"u"&&y.image instanceof ImageBitmap)===!1){const re=it.getPrimaries(it.workingColorSpace),me=y.colorSpace===On?null:it.getPrimaries(y.colorSpace),Se=y.colorSpace===On||re===me?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se)}t.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment);let ie=x(y.image,!1,r.maxTextureSize);ie=Qe(y,ie);const de=s.convert(y.format,y.colorSpace),Le=s.convert(y.type);let xe=S(y.internalFormat,de,Le,y.normalized,y.colorSpace,y.isVideoTexture);Ue(K,y);let fe;const Ie=y.mipmaps,Be=y.isVideoTexture!==!0,qe=ue.__version===void 0||Z===!0,H=le.dataReady,pe=E(y,ie);if(y.isDepthTexture)xe=w(y.format===Gi,y.type),qe&&(Be?t.texStorage2D(n.TEXTURE_2D,1,xe,ie.width,ie.height):t.texImage2D(n.TEXTURE_2D,0,xe,ie.width,ie.height,0,de,Le,null));else if(y.isDataTexture)if(Ie.length>0){Be&&qe&&t.texStorage2D(n.TEXTURE_2D,pe,xe,Ie[0].width,Ie[0].height);for(let re=0,me=Ie.length;re<me;re++)fe=Ie[re],Be?H&&t.texSubImage2D(n.TEXTURE_2D,re,0,0,fe.width,fe.height,de,Le,fe.data):t.texImage2D(n.TEXTURE_2D,re,xe,fe.width,fe.height,0,de,Le,fe.data);y.generateMipmaps=!1}else Be?(qe&&t.texStorage2D(n.TEXTURE_2D,pe,xe,ie.width,ie.height),H&&se(y,ie,de,Le)):t.texImage2D(n.TEXTURE_2D,0,xe,ie.width,ie.height,0,de,Le,ie.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Be&&qe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,pe,xe,Ie[0].width,Ie[0].height,ie.depth);for(let re=0,me=Ie.length;re<me;re++)if(fe=Ie[re],y.format!==_n)if(de!==null)if(Be){if(H)if(y.layerUpdates.size>0){const Se=$c(fe.width,fe.height,y.format,y.type);for(const oe of y.layerUpdates){const Ne=fe.data.subarray(oe*Se/fe.data.BYTES_PER_ELEMENT,(oe+1)*Se/fe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,oe,fe.width,fe.height,1,de,Ne)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,0,fe.width,fe.height,ie.depth,de,fe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,re,xe,fe.width,fe.height,ie.depth,0,fe.data,0,0);else Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Be?H&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,0,fe.width,fe.height,ie.depth,de,Le,fe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,re,xe,fe.width,fe.height,ie.depth,0,de,Le,fe.data);y.layerUpdates.size>0&&y.clearLayerUpdates()}else{Be&&qe&&t.texStorage2D(n.TEXTURE_2D,pe,xe,Ie[0].width,Ie[0].height);for(let re=0,me=Ie.length;re<me;re++)fe=Ie[re],y.format!==_n?de!==null?Be?H&&t.compressedTexSubImage2D(n.TEXTURE_2D,re,0,0,fe.width,fe.height,de,fe.data):t.compressedTexImage2D(n.TEXTURE_2D,re,xe,fe.width,fe.height,0,fe.data):Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Be?H&&t.texSubImage2D(n.TEXTURE_2D,re,0,0,fe.width,fe.height,de,Le,fe.data):t.texImage2D(n.TEXTURE_2D,re,xe,fe.width,fe.height,0,de,Le,fe.data)}else if(y.isDataArrayTexture)if(Be){if(qe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,pe,xe,ie.width,ie.height,ie.depth),H)if(y.layerUpdates.size>0){const re=$c(ie.width,ie.height,y.format,y.type);for(const me of y.layerUpdates){const Se=ie.data.subarray(me*re/ie.data.BYTES_PER_ELEMENT,(me+1)*re/ie.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,me,ie.width,ie.height,1,de,Le,Se)}y.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,de,Le,ie.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,xe,ie.width,ie.height,ie.depth,0,de,Le,ie.data);else if(y.isData3DTexture)Be?(qe&&t.texStorage3D(n.TEXTURE_3D,pe,xe,ie.width,ie.height,ie.depth),H&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,de,Le,ie.data)):t.texImage3D(n.TEXTURE_3D,0,xe,ie.width,ie.height,ie.depth,0,de,Le,ie.data);else if(y.isFramebufferTexture){if(qe)if(Be)t.texStorage2D(n.TEXTURE_2D,pe,xe,ie.width,ie.height);else{let re=ie.width,me=ie.height;for(let Se=0;Se<pe;Se++)t.texImage2D(n.TEXTURE_2D,Se,xe,re,me,0,de,Le,null),re>>=1,me>>=1}}else if(y.isHTMLTexture){if("texElementImage2D"in n){const re=n.canvas;if(re.hasAttribute("layoutsubtree")||re.setAttribute("layoutsubtree","true"),ie.parentNode!==re){re.appendChild(ie),d.add(y),re.onpaint=me=>{const Se=me.changedElements;for(const oe of d)Se.includes(oe.image)&&(oe.needsUpdate=!0)},re.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,ie);else{const Se=n.RGBA,oe=n.RGBA,Ne=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Se,oe,Ne,ie)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Ie.length>0){if(Be&&qe){const re=ze(Ie[0]);t.texStorage2D(n.TEXTURE_2D,pe,xe,re.width,re.height)}for(let re=0,me=Ie.length;re<me;re++)fe=Ie[re],Be?H&&t.texSubImage2D(n.TEXTURE_2D,re,0,0,de,Le,fe):t.texImage2D(n.TEXTURE_2D,re,xe,de,Le,fe);y.generateMipmaps=!1}else if(Be){if(qe){const re=ze(ie);t.texStorage2D(n.TEXTURE_2D,pe,xe,re.width,re.height)}H&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,de,Le,ie)}else t.texImage2D(n.TEXTURE_2D,0,xe,de,Le,ie);m(y)&&_(K),ue.__version=le.version,y.onUpdate&&y.onUpdate(y)}I.__version=y.version}function he(I,y,B){if(y.image.length!==6)return;const K=ke(I,y),Z=y.source;t.bindTexture(n.TEXTURE_CUBE_MAP,I.__webglTexture,n.TEXTURE0+B);const le=i.get(Z);if(Z.version!==le.__version||K===!0){t.activeTexture(n.TEXTURE0+B);const ue=it.getPrimaries(it.workingColorSpace),j=y.colorSpace===On?null:it.getPrimaries(y.colorSpace),ie=y.colorSpace===On||ue===j?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ie);const de=y.isCompressedTexture||y.image[0].isCompressedTexture,Le=y.image[0]&&y.image[0].isDataTexture,xe=[];for(let oe=0;oe<6;oe++)!de&&!Le?xe[oe]=x(y.image[oe],!0,r.maxCubemapSize):xe[oe]=Le?y.image[oe].image:y.image[oe],xe[oe]=Qe(y,xe[oe]);const fe=xe[0],Ie=s.convert(y.format,y.colorSpace),Be=s.convert(y.type),qe=S(y.internalFormat,Ie,Be,y.normalized,y.colorSpace),H=y.isVideoTexture!==!0,pe=le.__version===void 0||K===!0,re=Z.dataReady;let me=E(y,fe);Ue(n.TEXTURE_CUBE_MAP,y);let Se;if(de){H&&pe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,me,qe,fe.width,fe.height);for(let oe=0;oe<6;oe++){Se=xe[oe].mipmaps;for(let Ne=0;Ne<Se.length;Ne++){const Pe=Se[Ne];y.format!==_n?Ie!==null?H?re&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne,0,0,Pe.width,Pe.height,Ie,Pe.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne,qe,Pe.width,Pe.height,0,Pe.data):Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):H?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne,0,0,Pe.width,Pe.height,Ie,Be,Pe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne,qe,Pe.width,Pe.height,0,Ie,Be,Pe.data)}}}else{if(Se=y.mipmaps,H&&pe){Se.length>0&&me++;const oe=ze(xe[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,me,qe,oe.width,oe.height)}for(let oe=0;oe<6;oe++)if(Le){H?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,xe[oe].width,xe[oe].height,Ie,Be,xe[oe].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,qe,xe[oe].width,xe[oe].height,0,Ie,Be,xe[oe].data);for(let Ne=0;Ne<Se.length;Ne++){const Et=Se[Ne].image[oe].image;H?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne+1,0,0,Et.width,Et.height,Ie,Be,Et.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne+1,qe,Et.width,Et.height,0,Ie,Be,Et.data)}}else{H?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,Ie,Be,xe[oe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,qe,Ie,Be,xe[oe]);for(let Ne=0;Ne<Se.length;Ne++){const Pe=Se[Ne];H?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne+1,0,0,Ie,Be,Pe.image[oe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne+1,qe,Ie,Be,Pe.image[oe])}}}m(y)&&_(n.TEXTURE_CUBE_MAP),le.__version=Z.version,y.onUpdate&&y.onUpdate(y)}I.__version=y.version}function ae(I,y,B,K,Z,le){const ue=s.convert(B.format,B.colorSpace),j=s.convert(B.type),ie=S(B.internalFormat,ue,j,B.normalized,B.colorSpace),de=i.get(y),Le=i.get(B);if(Le.__renderTarget=y,!de.__hasExternalTextures){const xe=Math.max(1,y.width>>le),fe=Math.max(1,y.height>>le);Z===n.TEXTURE_3D||Z===n.TEXTURE_2D_ARRAY?t.texImage3D(Z,le,ie,xe,fe,y.depth,0,ue,j,null):t.texImage2D(Z,le,ie,xe,fe,0,ue,j,null)}t.bindFramebuffer(n.FRAMEBUFFER,I),yt(y)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,K,Z,Le.__webglTexture,0,_t(y)):(Z===n.TEXTURE_2D||Z>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,K,Z,Le.__webglTexture,le),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ee(I,y,B){if(n.bindRenderbuffer(n.RENDERBUFFER,I),y.depthBuffer){const K=y.depthTexture,Z=K&&K.isDepthTexture?K.type:null,le=w(y.stencilBuffer,Z),ue=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;yt(y)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,_t(y),le,y.width,y.height):B?n.renderbufferStorageMultisample(n.RENDERBUFFER,_t(y),le,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,le,y.width,y.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ue,n.RENDERBUFFER,I)}else{const K=y.textures;for(let Z=0;Z<K.length;Z++){const le=K[Z],ue=s.convert(le.format,le.colorSpace),j=s.convert(le.type),ie=S(le.internalFormat,ue,j,le.normalized,le.colorSpace);yt(y)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,_t(y),ie,y.width,y.height):B?n.renderbufferStorageMultisample(n.RENDERBUFFER,_t(y),ie,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,ie,y.width,y.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Je(I,y,B){const K=y.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,I),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Z=i.get(y.depthTexture);if(Z.__renderTarget=y,(!Z.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),K){if(Z.__webglInit===void 0&&(Z.__webglInit=!0,y.depthTexture.addEventListener("dispose",L)),Z.__webglTexture===void 0){Z.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,Z.__webglTexture),Ue(n.TEXTURE_CUBE_MAP,y.depthTexture);const de=s.convert(y.depthTexture.format),Le=s.convert(y.depthTexture.type);let xe;y.depthTexture.format===ui?xe=n.DEPTH_COMPONENT24:y.depthTexture.format===Gi&&(xe=n.DEPTH24_STENCIL8);for(let fe=0;fe<6;fe++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,xe,y.width,y.height,0,de,Le,null)}}else Q(y.depthTexture,0);const le=Z.__webglTexture,ue=_t(y),j=K?n.TEXTURE_CUBE_MAP_POSITIVE_X+B:n.TEXTURE_2D,ie=y.depthTexture.format===Gi?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(y.depthTexture.format===ui)yt(y)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ie,j,le,0,ue):n.framebufferTexture2D(n.FRAMEBUFFER,ie,j,le,0);else if(y.depthTexture.format===Gi)yt(y)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ie,j,le,0,ue):n.framebufferTexture2D(n.FRAMEBUFFER,ie,j,le,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ce(I){const y=i.get(I),B=I.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==I.depthTexture){const K=I.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),K){const Z=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,K.removeEventListener("dispose",Z)};K.addEventListener("dispose",Z),y.__depthDisposeCallback=Z}y.__boundDepthTexture=K}if(I.depthTexture&&!y.__autoAllocateDepthBuffer)if(B)for(let K=0;K<6;K++)Je(y.__webglFramebuffer[K],I,K);else{const K=I.texture.mipmaps;K&&K.length>0?Je(y.__webglFramebuffer[0],I,0):Je(y.__webglFramebuffer,I,0)}else if(B){y.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(t.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer[K]),y.__webglDepthbuffer[K]===void 0)y.__webglDepthbuffer[K]=n.createRenderbuffer(),Ee(y.__webglDepthbuffer[K],I,!1);else{const Z=I.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,le=y.__webglDepthbuffer[K];n.bindRenderbuffer(n.RENDERBUFFER,le),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,le)}}else{const K=I.texture.mipmaps;if(K&&K.length>0?t.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=n.createRenderbuffer(),Ee(y.__webglDepthbuffer,I,!1);else{const Z=I.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,le=y.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,le),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,le)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Fe(I,y,B){const K=i.get(I);y!==void 0&&ae(K.__webglFramebuffer,I,I.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),B!==void 0&&Ce(I)}function Ke(I){const y=I.texture,B=i.get(I),K=i.get(y);I.addEventListener("dispose",b);const Z=I.textures,le=I.isWebGLCubeRenderTarget===!0,ue=Z.length>1;if(ue||(K.__webglTexture===void 0&&(K.__webglTexture=n.createTexture()),K.__version=y.version,a.memory.textures++),le){B.__webglFramebuffer=[];for(let j=0;j<6;j++)if(y.mipmaps&&y.mipmaps.length>0){B.__webglFramebuffer[j]=[];for(let ie=0;ie<y.mipmaps.length;ie++)B.__webglFramebuffer[j][ie]=n.createFramebuffer()}else B.__webglFramebuffer[j]=n.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){B.__webglFramebuffer=[];for(let j=0;j<y.mipmaps.length;j++)B.__webglFramebuffer[j]=n.createFramebuffer()}else B.__webglFramebuffer=n.createFramebuffer();if(ue)for(let j=0,ie=Z.length;j<ie;j++){const de=i.get(Z[j]);de.__webglTexture===void 0&&(de.__webglTexture=n.createTexture(),a.memory.textures++)}if(I.samples>0&&yt(I)===!1){B.__webglMultisampledFramebuffer=n.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let j=0;j<Z.length;j++){const ie=Z[j];B.__webglColorRenderbuffer[j]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,B.__webglColorRenderbuffer[j]);const de=s.convert(ie.format,ie.colorSpace),Le=s.convert(ie.type),xe=S(ie.internalFormat,de,Le,ie.normalized,ie.colorSpace,I.isXRRenderTarget===!0),fe=_t(I);n.renderbufferStorageMultisample(n.RENDERBUFFER,fe,xe,I.width,I.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+j,n.RENDERBUFFER,B.__webglColorRenderbuffer[j])}n.bindRenderbuffer(n.RENDERBUFFER,null),I.depthBuffer&&(B.__webglDepthRenderbuffer=n.createRenderbuffer(),Ee(B.__webglDepthRenderbuffer,I,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(le){t.bindTexture(n.TEXTURE_CUBE_MAP,K.__webglTexture),Ue(n.TEXTURE_CUBE_MAP,y);for(let j=0;j<6;j++)if(y.mipmaps&&y.mipmaps.length>0)for(let ie=0;ie<y.mipmaps.length;ie++)ae(B.__webglFramebuffer[j][ie],I,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ie);else ae(B.__webglFramebuffer[j],I,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0);m(y)&&_(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ue){for(let j=0,ie=Z.length;j<ie;j++){const de=Z[j],Le=i.get(de);let xe=n.TEXTURE_2D;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(xe=I.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(xe,Le.__webglTexture),Ue(xe,de),ae(B.__webglFramebuffer,I,de,n.COLOR_ATTACHMENT0+j,xe,0),m(de)&&_(xe)}t.unbindTexture()}else{let j=n.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(j=I.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(j,K.__webglTexture),Ue(j,y),y.mipmaps&&y.mipmaps.length>0)for(let ie=0;ie<y.mipmaps.length;ie++)ae(B.__webglFramebuffer[ie],I,y,n.COLOR_ATTACHMENT0,j,ie);else ae(B.__webglFramebuffer,I,y,n.COLOR_ATTACHMENT0,j,0);m(y)&&_(j),t.unbindTexture()}I.depthBuffer&&Ce(I)}function Ye(I){const y=I.textures;for(let B=0,K=y.length;B<K;B++){const Z=y[B];if(m(Z)){const le=M(I),ue=i.get(Z).__webglTexture;t.bindTexture(le,ue),_(le),t.unbindTexture()}}}const bt=[],Ut=[];function $t(I){if(I.samples>0){if(yt(I)===!1){const y=I.textures,B=I.width,K=I.height;let Z=n.COLOR_BUFFER_BIT;const le=I.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ue=i.get(I),j=y.length>1;if(j)for(let de=0;de<y.length;de++)t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ue.__webglMultisampledFramebuffer);const ie=I.texture.mipmaps;ie&&ie.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ue.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ue.__webglFramebuffer);for(let de=0;de<y.length;de++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(Z|=n.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(Z|=n.STENCIL_BUFFER_BIT)),j){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ue.__webglColorRenderbuffer[de]);const Le=i.get(y[de]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Le,0)}n.blitFramebuffer(0,0,B,K,0,0,B,K,Z,n.NEAREST),c===!0&&(bt.length=0,Ut.length=0,bt.push(n.COLOR_ATTACHMENT0+de),I.depthBuffer&&I.storeMultisampledDepthBuffer===!1&&(bt.push(le),Ut.push(le),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Ut)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,bt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),j)for(let de=0;de<y.length;de++){t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.RENDERBUFFER,ue.__webglColorRenderbuffer[de]);const Le=i.get(y[de]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.TEXTURE_2D,Le,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ue.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.storeMultisampledDepthBuffer===!1&&c){const y=I.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[y])}}}function _t(I){return Math.min(r.maxSamples,I.samples)}function yt(I){const y=i.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function G(I){const y=a.render.frame;h.get(I)!==y&&(h.set(I,y),I.update())}function Qe(I,y){const B=I.colorSpace,K=I.format,Z=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||B!==as&&B!==On&&(it.getTransfer(B)===xt?(K!==_n||Z!==vn)&&Ge("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):ot("WebGLTextures: Unsupported texture color space:",B)),y}function ze(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(l.width=I.naturalWidth||I.width,l.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(l.width=I.displayWidth,l.height=I.displayHeight):(l.width=I.width,l.height=I.height),l}this.allocateTextureUnit=z,this.resetTextureUnits=U,this.getTextureUnits=D,this.setTextureUnits=F,this.setTexture2D=Q,this.setTexture2DArray=Y,this.setTexture3D=te,this.setTextureCube=O,this.rebindTextures=Fe,this.setupRenderTarget=Ke,this.updateRenderTargetMipmap=Ye,this.updateMultisampleRenderTarget=$t,this.setupDepthRenderbuffer=Ce,this.setupFrameBufferTexture=ae,this.useMultisampledRTT=yt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function r_(n,e){function t(i,r=On){let s;const a=it.getTransfer(r);if(i===vn)return n.UNSIGNED_BYTE;if(i===Ul)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Fl)return n.UNSIGNED_SHORT_5_5_5_1;if(i===uu)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===du)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===cu)return n.BYTE;if(i===hu)return n.SHORT;if(i===rs)return n.UNSIGNED_SHORT;if(i===Nl)return n.INT;if(i===Qn)return n.UNSIGNED_INT;if(i===qn)return n.FLOAT;if(i===jn)return n.HALF_FLOAT;if(i===fu)return n.ALPHA;if(i===pu)return n.RGB;if(i===_n)return n.RGBA;if(i===ui)return n.DEPTH_COMPONENT;if(i===Gi)return n.DEPTH_STENCIL;if(i===mu)return n.RED;if(i===Ol)return n.RED_INTEGER;if(i===Ki)return n.RG;if(i===Bl)return n.RG_INTEGER;if(i===zl)return n.RGBA_INTEGER;if(i===js||i===ea||i===ta||i===na)if(a===xt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===js)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ea)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ta)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===na)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===js)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ea)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ta)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===na)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Bo||i===zo||i===ko||i===Go)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Bo)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===zo)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ko)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Go)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ho||i===Wo||i===Vo||i===Xo||i===Yo||i===la||i===Ko)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Ho||i===Wo)return a===xt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Vo)return a===xt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===Xo)return s.COMPRESSED_R11_EAC;if(i===Yo)return s.COMPRESSED_SIGNED_R11_EAC;if(i===la)return s.COMPRESSED_RG11_EAC;if(i===Ko)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===qo||i===$o||i===Zo||i===Jo||i===Qo||i===jo||i===el||i===tl||i===nl||i===il||i===rl||i===sl||i===al||i===ol)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===qo)return a===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===$o)return a===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Zo)return a===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Jo)return a===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Qo)return a===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===jo)return a===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===el)return a===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===tl)return a===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===nl)return a===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===il)return a===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===rl)return a===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===sl)return a===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===al)return a===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ol)return a===xt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ll||i===cl||i===hl)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===ll)return a===xt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===cl)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===hl)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===ul||i===dl||i===ca||i===fl)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===ul)return s.COMPRESSED_RED_RGTC1_EXT;if(i===dl)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ca)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===fl)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ss?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const s_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,a_=`
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

}`;class o_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Eu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Rt({vertexShader:s_,fragmentShader:a_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Jt(new wn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class l_ extends $i{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",c=1,l=null,h=null,d=null,u=null,p=null,g=null;const v=typeof XRWebGLBinding<"u",x=new o_,m={},_=t.getContextAttributes();let M=null,S=null;const w=[],E=[],L=new We;let b=null,A=null;const P=new xn;P.viewport=new ht;const C=new xn;C.viewport=new ht;const N=[P,C],U=new gg;let D=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ee){let se=w[ee];return se===void 0&&(se=new Za,w[ee]=se),se.getTargetRaySpace()},this.getControllerGrip=function(ee){let se=w[ee];return se===void 0&&(se=new Za,w[ee]=se),se.getGripSpace()},this.getHand=function(ee){let se=w[ee];return se===void 0&&(se=new Za,w[ee]=se),se.getHandSpace()};function z(ee){const se=E.indexOf(ee.inputSource);if(se===-1)return;const V=w[se];V!==void 0&&(V.update(ee.inputSource,ee.frame,l||a),V.dispatchEvent({type:ee.type,data:ee.inputSource}))}function X(){r.removeEventListener("select",z),r.removeEventListener("selectstart",z),r.removeEventListener("selectend",z),r.removeEventListener("squeeze",z),r.removeEventListener("squeezestart",z),r.removeEventListener("squeezeend",z),r.removeEventListener("end",X),r.removeEventListener("inputsourceschange",Q);for(let ee=0;ee<w.length;ee++){const se=E[ee];se!==null&&(E[ee]=null,w[ee].disconnect(se))}D=null,F=null,x.reset();for(const ee in m)delete m[ee];if(e.setRenderTarget(M),p=null,u=null,d=null,r=null,S=null,ke.stop(),i.isPresenting=!1,e.setPixelRatio(b),e.setSize(L.width,L.height,!1),A!==null){const ee=A.camera;ee.fov=A.fov,ee.zoom=A.zoom,ee.updateProjectionMatrix(),A=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ee){s=ee,i.isPresenting===!0&&Ge("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ee){o=ee,i.isPresenting===!0&&Ge("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(ee){l=ee},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return d===null&&v&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(ee){if(r=ee,r!==null){if(M=e.getRenderTarget(),r.addEventListener("select",z),r.addEventListener("selectstart",z),r.addEventListener("selectend",z),r.addEventListener("squeeze",z),r.addEventListener("squeezestart",z),r.addEventListener("squeezeend",z),r.addEventListener("end",X),r.addEventListener("inputsourceschange",Q),_.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(L),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let V=null,he=null,ae=null;_.depth&&(ae=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,V=_.stencil?Gi:ui,he=_.stencil?ss:Qn);const Ee={colorFormat:t.RGBA8,depthFormat:ae,scaleFactor:s};d=this.getBinding(),u=d.createProjectionLayer(Ee),r.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),S=new Cn(u.textureWidth,u.textureHeight,{format:_n,type:vn,depthTexture:new Lr(u.textureWidth,u.textureHeight,he,void 0,void 0,void 0,void 0,void 0,void 0,V),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{const V={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,V),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new Cn(p.framebufferWidth,p.framebufferHeight,{format:_n,type:vn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),ke.setContext(r),ke.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function Q(ee){for(let se=0;se<ee.removed.length;se++){const V=ee.removed[se],he=E.indexOf(V);he>=0&&(E[he]=null,w[he].disconnect(V))}for(let se=0;se<ee.added.length;se++){const V=ee.added[se];let he=E.indexOf(V);if(he===-1){for(let Ee=0;Ee<w.length;Ee++)if(Ee>=E.length){E.push(V),he=Ee;break}else if(E[Ee]===null){E[Ee]=V,he=Ee;break}if(he===-1)break}const ae=w[he];ae&&ae.connect(V)}}const Y=new W,te=new W;function O(ee,se,V){Y.setFromMatrixPosition(se.matrixWorld),te.setFromMatrixPosition(V.matrixWorld);const he=Y.distanceTo(te),ae=se.projectionMatrix.elements,Ee=V.projectionMatrix.elements,Je=ae[14]/(ae[10]-1),Ce=ae[14]/(ae[10]+1),Fe=(ae[9]+1)/ae[5],Ke=(ae[9]-1)/ae[5],Ye=(ae[8]-1)/ae[0],bt=(Ee[8]+1)/Ee[0],Ut=Je*Ye,$t=Je*bt,_t=he/(-Ye+bt),yt=_t*-Ye;if(se.matrixWorld.decompose(ee.position,ee.quaternion,ee.scale),ee.translateX(yt),ee.translateZ(_t),ee.matrixWorld.compose(ee.position,ee.quaternion,ee.scale),ee.matrixWorldInverse.copy(ee.matrixWorld).invert(),ae[10]===-1)ee.projectionMatrix.copy(se.projectionMatrix),ee.projectionMatrixInverse.copy(se.projectionMatrixInverse);else{const G=Je+_t,Qe=Ce+_t,ze=Ut-yt,I=$t+(he-yt),y=Fe*Ce/Qe*G,B=Ke*Ce/Qe*G;ee.projectionMatrix.makePerspective(ze,I,y,B,G,Qe),ee.projectionMatrixInverse.copy(ee.projectionMatrix).invert()}}function ne(ee,se){se===null?ee.matrixWorld.copy(ee.matrix):ee.matrixWorld.multiplyMatrices(se.matrixWorld,ee.matrix),ee.matrixWorldInverse.copy(ee.matrixWorld).invert()}this.updateCamera=function(ee){if(r===null)return;let se=ee.near,V=ee.far;x.texture!==null&&(x.depthNear>0&&(se=x.depthNear),x.depthFar>0&&(V=x.depthFar)),U.near=C.near=P.near=se,U.far=C.far=P.far=V,(D!==U.near||F!==U.far)&&(r.updateRenderState({depthNear:U.near,depthFar:U.far}),D=U.near,F=U.far),U.layers.mask=ee.layers.mask|6,P.layers.mask=U.layers.mask&-5,C.layers.mask=U.layers.mask&-3;const he=ee.parent,ae=U.cameras;ne(U,he);for(let Ee=0;Ee<ae.length;Ee++)ne(ae[Ee],he);ae.length===2?O(U,P,C):U.projectionMatrix.copy(P.projectionMatrix),A===null&&ee.isPerspectiveCamera&&(A={camera:ee,fov:ee.fov,zoom:ee.zoom}),ce(ee,U,he)};function ce(ee,se,V){V===null?ee.matrix.copy(se.matrixWorld):(ee.matrix.copy(V.matrixWorld),ee.matrix.invert(),ee.matrix.multiply(se.matrixWorld)),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.updateMatrixWorld(!0),ee.projectionMatrix.copy(se.projectionMatrix),ee.projectionMatrixInverse.copy(se.projectionMatrixInverse),ee.isPerspectiveCamera&&(ee.fov=pl*2*Math.atan(1/ee.projectionMatrix.elements[5]),ee.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(u===null&&p===null))return c},this.setFoveation=function(ee){c=ee,u!==null&&(u.fixedFoveation=ee),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=ee)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(U)},this.getCameraTexture=function(ee){return m[ee]};let be=null;function Ue(ee,se){if(h=se.getViewerPose(l||a),g=se,h!==null){const V=h.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let he=!1;V.length!==U.cameras.length&&(U.cameras.length=0,he=!0);for(let Ce=0;Ce<V.length;Ce++){const Fe=V[Ce];let Ke=null;if(p!==null)Ke=p.getViewport(Fe);else{const bt=d.getViewSubImage(u,Fe);Ke=bt.viewport,Ce===0&&(e.setRenderTargetTextures(S,bt.colorTexture,bt.depthStencilTexture),e.setRenderTarget(S))}let Ye=N[Ce];Ye===void 0&&(Ye=new xn,Ye.layers.enable(Ce),Ye.viewport=new ht,N[Ce]=Ye),Ye.matrix.fromArray(Fe.transform.matrix),Ye.matrix.decompose(Ye.position,Ye.quaternion,Ye.scale),Ye.projectionMatrix.fromArray(Fe.projectionMatrix),Ye.projectionMatrixInverse.copy(Ye.projectionMatrix).invert(),Ye.viewport.set(Ke.x,Ke.y,Ke.width,Ke.height),Ce===0&&(U.matrix.copy(Ye.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),he===!0&&U.cameras.push(Ye)}const ae=r.enabledFeatures;if(ae&&ae.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&v){d=i.getBinding();const Ce=d.getDepthInformation(V[0]);Ce&&Ce.isValid&&Ce.texture&&x.init(Ce,r.renderState)}if(ae&&ae.includes("camera-access")&&v){e.state.unbindTexture(),d=i.getBinding();for(let Ce=0;Ce<V.length;Ce++){const Fe=V[Ce].camera;if(Fe){let Ke=m[Fe];Ke||(Ke=new Eu,m[Fe]=Ke);const Ye=d.getCameraImage(Fe);Ke.sourceTexture=Ye}}}}for(let V=0;V<w.length;V++){const he=E[V],ae=w[V];he!==null&&ae!==void 0&&ae.update(he,se,l||a)}be&&be(ee,se),se.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:se}),g=null}const ke=new Cu;ke.setAnimationLoop(Ue),this.setAnimationLoop=function(ee){be=ee},this.dispose=function(){}}}const c_=new Nt,Fu=new Ve;Fu.set(-1,0,0,0,1,0,0,0,1);function h_(n,e){function t(x,m){x.matrixAutoUpdate===!0&&x.updateMatrix(),m.value.copy(x.matrix)}function i(x,m){m.color.getRGB(x.fogColor.value,Au(n)),m.isFog?(x.fogNear.value=m.near,x.fogFar.value=m.far):m.isFogExp2&&(x.fogDensity.value=m.density)}function r(x,m,_,M,S){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?s(x,m):m.isMeshLambertMaterial?(s(x,m),m.envMap&&(x.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(s(x,m),d(x,m)):m.isMeshPhongMaterial?(s(x,m),h(x,m),m.envMap&&(x.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(s(x,m),u(x,m),m.isMeshPhysicalMaterial&&p(x,m,S)):m.isMeshMatcapMaterial?(s(x,m),g(x,m)):m.isMeshDepthMaterial?s(x,m):m.isMeshDistanceMaterial?(s(x,m),v(x,m)):m.isMeshNormalMaterial?s(x,m):m.isLineBasicMaterial?(a(x,m),m.isLineDashedMaterial&&o(x,m)):m.isPointsMaterial?c(x,m,_,M):m.isSpriteMaterial?l(x,m):m.isShadowMaterial?(x.color.value.copy(m.color),x.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(x,m){x.opacity.value=m.opacity,m.color&&x.diffuse.value.copy(m.color),m.emissive&&x.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(x.map.value=m.map,t(m.map,x.mapTransform)),m.alphaMap&&(x.alphaMap.value=m.alphaMap,t(m.alphaMap,x.alphaMapTransform)),m.bumpMap&&(x.bumpMap.value=m.bumpMap,t(m.bumpMap,x.bumpMapTransform),x.bumpScale.value=m.bumpScale,m.side===dn&&(x.bumpScale.value*=-1)),m.normalMap&&(x.normalMap.value=m.normalMap,t(m.normalMap,x.normalMapTransform),x.normalScale.value.copy(m.normalScale),m.side===dn&&x.normalScale.value.negate()),m.displacementMap&&(x.displacementMap.value=m.displacementMap,t(m.displacementMap,x.displacementMapTransform),x.displacementScale.value=m.displacementScale,x.displacementBias.value=m.displacementBias),m.emissiveMap&&(x.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,x.emissiveMapTransform)),m.specularMap&&(x.specularMap.value=m.specularMap,t(m.specularMap,x.specularMapTransform)),m.alphaTest>0&&(x.alphaTest.value=m.alphaTest);const _=e.get(m),M=_.envMap,S=_.envMapRotation;M&&(x.envMap.value=M,x.envMapRotation.value.setFromMatrix4(c_.makeRotationFromEuler(S)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&x.envMapRotation.value.premultiply(Fu),x.reflectivity.value=m.reflectivity,x.ior.value=m.ior,x.refractionRatio.value=m.refractionRatio),m.lightMap&&(x.lightMap.value=m.lightMap,x.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,x.lightMapTransform)),m.aoMap&&(x.aoMap.value=m.aoMap,x.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,x.aoMapTransform))}function a(x,m){x.diffuse.value.copy(m.color),x.opacity.value=m.opacity,m.map&&(x.map.value=m.map,t(m.map,x.mapTransform))}function o(x,m){x.dashSize.value=m.dashSize,x.totalSize.value=m.dashSize+m.gapSize,x.scale.value=m.scale}function c(x,m,_,M){x.diffuse.value.copy(m.color),x.opacity.value=m.opacity,x.size.value=m.size*_,x.scale.value=M*.5,m.map&&(x.map.value=m.map,t(m.map,x.uvTransform)),m.alphaMap&&(x.alphaMap.value=m.alphaMap,t(m.alphaMap,x.alphaMapTransform)),m.alphaTest>0&&(x.alphaTest.value=m.alphaTest)}function l(x,m){x.diffuse.value.copy(m.color),x.opacity.value=m.opacity,x.rotation.value=m.rotation,m.map&&(x.map.value=m.map,t(m.map,x.mapTransform)),m.alphaMap&&(x.alphaMap.value=m.alphaMap,t(m.alphaMap,x.alphaMapTransform)),m.alphaTest>0&&(x.alphaTest.value=m.alphaTest)}function h(x,m){x.specular.value.copy(m.specular),x.shininess.value=Math.max(m.shininess,1e-4)}function d(x,m){m.gradientMap&&(x.gradientMap.value=m.gradientMap)}function u(x,m){x.metalness.value=m.metalness,m.metalnessMap&&(x.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,x.metalnessMapTransform)),x.roughness.value=m.roughness,m.roughnessMap&&(x.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,x.roughnessMapTransform)),m.envMap&&(x.envMapIntensity.value=m.envMapIntensity)}function p(x,m,_){x.ior.value=m.ior,m.sheen>0&&(x.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),x.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(x.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,x.sheenColorMapTransform)),m.sheenRoughnessMap&&(x.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,x.sheenRoughnessMapTransform))),m.clearcoat>0&&(x.clearcoat.value=m.clearcoat,x.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(x.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,x.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(x.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===dn&&x.clearcoatNormalScale.value.negate())),m.dispersion>0&&(x.dispersion.value=m.dispersion),m.retroreflectivity>0&&(x.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(x.iridescence.value=m.iridescence,x.iridescenceIOR.value=m.iridescenceIOR,x.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(x.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,x.iridescenceMapTransform)),m.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),m.transmission>0&&(x.transmission.value=m.transmission,x.transmissionSamplerMap.value=_.texture,x.transmissionSamplerSize.value.set(_.width,_.height),m.transmissionMap&&(x.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,x.transmissionMapTransform)),x.thickness.value=m.thickness,m.thicknessMap&&(x.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=m.attenuationDistance,x.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(x.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(x.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=m.specularIntensity,x.specularColor.value.copy(m.specularColor),m.specularColorMap&&(x.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,x.specularColorMapTransform)),m.specularIntensityMap&&(x.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,x.specularIntensityMapTransform))}function g(x,m){m.matcap&&(x.matcap.value=m.matcap)}function v(x,m){const _=e.get(m).light;x.referencePosition.value.setFromMatrixPosition(_.matrixWorld),x.nearDistance.value=_.shadow.camera.near,x.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function u_(n,e,t,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(S,w){const E=w.program;i.uniformBlockBinding(S,E)}function l(S,w){let E=r[S.id];E===void 0&&(x(S),E=h(S),r[S.id]=E,S.addEventListener("dispose",_));const L=w.program;i.updateUBOMapping(S,L);const b=e.render.frame;s[S.id]!==b&&(u(S),s[S.id]=b)}function h(S){const w=d();S.__bindingPointIndex=w;const E=n.createBuffer(),L=S.__size,b=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,L,b),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,E),E}function d(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return ot("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(S){const w=r[S.id],E=S.uniforms,L=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let b=0,A=E.length;b<A;b++){const P=E[b];if(Array.isArray(P))for(let C=0,N=P.length;C<N;C++)p(P[C],b,C,L);else p(P,b,0,L)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(S,w,E,L){if(v(S,w,E,L)===!0){const b=S.__offset,A=S.value;if(Array.isArray(A)){let P=0;for(let C=0;C<A.length;C++){const N=A[C],U=m(N);g(N,S.__data,P),typeof N!="number"&&typeof N!="boolean"&&!N.isMatrix3&&!ArrayBuffer.isView(N)&&(P+=U.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(A,S.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,b,S.__data)}}function g(S,w,E){typeof S=="number"||typeof S=="boolean"?w[0]=S:S.isMatrix3?(w[0]=S.elements[0],w[1]=S.elements[1],w[2]=S.elements[2],w[3]=0,w[4]=S.elements[3],w[5]=S.elements[4],w[6]=S.elements[5],w[7]=0,w[8]=S.elements[6],w[9]=S.elements[7],w[10]=S.elements[8],w[11]=0):ArrayBuffer.isView(S)?w.set(new S.constructor(S.buffer,S.byteOffset,w.length)):S.toArray(w,E)}function v(S,w,E,L){const b=S.value,A=w+"_"+E;if(L[A]===void 0)return typeof b=="number"||typeof b=="boolean"?L[A]=b:ArrayBuffer.isView(b)?L[A]=b.slice():L[A]=b.clone(),!0;{const P=L[A];if(typeof b=="number"||typeof b=="boolean"){if(P!==b)return L[A]=b,!0}else{if(ArrayBuffer.isView(b))return!0;if(P.equals(b)===!1)return P.copy(b),!0}}return!1}function x(S){const w=S.uniforms;let E=0;const L=16;for(let A=0,P=w.length;A<P;A++){const C=Array.isArray(w[A])?w[A]:[w[A]];for(let N=0,U=C.length;N<U;N++){const D=C[N],F=Array.isArray(D.value)?D.value:[D.value];for(let z=0,X=F.length;z<X;z++){const Q=F[z],Y=m(Q),te=E%L,O=te%Y.boundary,ne=te+O;E+=O,ne!==0&&L-ne<Y.storage&&(E+=L-ne),D.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=E,E+=Y.storage}}}const b=E%L;return b>0&&(E+=L-b),S.__size=E,S.__cache={},this}function m(S){const w={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(w.boundary=4,w.storage=4):S.isVector2?(w.boundary=8,w.storage=8):S.isVector3||S.isColor?(w.boundary=16,w.storage=12):S.isVector4?(w.boundary=16,w.storage=16):S.isMatrix3?(w.boundary=48,w.storage=48):S.isMatrix4?(w.boundary=64,w.storage=64):S.isTexture?Ge("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(w.boundary=16,w.storage=S.byteLength):Ge("WebGLRenderer: Unsupported uniform value type.",S),w}function _(S){const w=S.target;w.removeEventListener("dispose",_);const E=a.indexOf(w.__bindingPointIndex);a.splice(E,1),n.deleteBuffer(r[w.id]),delete r[w.id],delete s[w.id]}function M(){for(const S in r)n.deleteBuffer(r[S]);a=[],r={},s={}}return{bind:c,update:l,dispose:M}}const d_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Xn=null;function f_(){return Xn===null&&(Xn=new xr(d_,16,16,Ki,jn),Xn.name="DFG_LUT",Xn.minFilter=Bt,Xn.magFilter=Bt,Xn.wrapS=li,Xn.wrapT=li,Xn.generateMipmaps=!1,Xn.needsUpdate=!0),Xn}class p_{constructor(e={}){const{canvas:t=Im(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:p=vn}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;const v=p,x=new Set([zl,Bl,Ol]),m=new Set([vn,Qn,rs,ss,Ul,Fl]),_=new Uint32Array(4),M=new Int32Array(4),S=new W;let w=null,E=null;const L=[],b=[];let A=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Jn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let C=!1,N=null,U=null,D=null,F=null;this._outputColorSpace=Tn;let z=0,X=0,Q=null,Y=-1,te=null;const O=new ht,ne=new ht;let ce=null;const be=new tt(0);let Ue=0,ke=t.width,ee=t.height,se=1,V=null,he=null;const ae=new ht(0,0,ke,ee),Ee=new ht(0,0,ke,ee);let Je=!1;const Ce=new fa;let Fe=!1,Ke=!1;const Ye=new Nt,bt=new W,Ut=new ht,$t={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let _t=!1;function yt(){return Q===null?se:1}let G=i;function Qe(T,k){return t.getContext(T,k)}let ze,I,y,B,K,Z,le,ue,j,ie,de,Le,xe,fe,Ie,Be,qe,H,pe,re,me,Se,oe;try{const T={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ll}`),t.addEventListener("webglcontextlost",Et,!1),t.addEventListener("webglcontextrestored",ut,!1),t.addEventListener("webglcontextcreationerror",Pn,!1),G===null){const k="webgl2";if(G=Qe(k,T),G===null)throw Qe(k)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ne()}catch(T){throw t.removeEventListener("webglcontextlost",Et,!1),t.removeEventListener("webglcontextrestored",ut,!1),t.removeEventListener("webglcontextcreationerror",Pn,!1),ot("WebGLRenderer: "+T.message),T}function Ne(){ze=new fv(G),ze.init(),me=new r_(G,ze),I=new iv(G,ze,e,me),y=new n_(G,ze),I.reversedDepthBuffer&&u&&y.buffers.depth.setReversed(!0),U=G.createFramebuffer(),D=G.createFramebuffer(),F=G.createFramebuffer(),B=new gv(G),K=new H2,Z=new i_(G,ze,y,K,I,me,B),le=new dv(P),ue=new vg(G),Se=new tv(G,ue),j=new pv(G,ue,B,Se),ie=new vv(G,j,ue,Se,B),H=new xv(G,I,Z),Ie=new rv(K),de=new G2(P,le,ze,I,Se,Ie),Le=new h_(P,K),xe=new V2,fe=new Z2(ze),qe=new ev(P,le,y,ie,g,c),Be=new t_(P,ie,I),oe=new u_(G,B,I,y),pe=new nv(G,ze,B),re=new mv(G,ze,B),B.programs=de.programs,P.capabilities=I,P.extensions=ze,P.properties=K,P.renderLists=xe,P.shadowMap=Be,P.state=y,P.info=B}v!==vn&&(A=new Mv(v,t.width,t.height,o,r,s));const Pe=new l_(P,G);this.xr=Pe,this.getContext=function(){return G},this.getContextAttributes=function(){return G.getContextAttributes()},this.forceContextLoss=function(){const T=ze.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=ze.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return se},this.setPixelRatio=function(T){T!==void 0&&(se=T,this.setSize(ke,ee,!1))},this.getSize=function(T){return T.set(ke,ee)},this.setSize=function(T,k,J=!0){if(Pe.isPresenting){Ge("WebGLRenderer: Can't change size while VR device is presenting.");return}ke=T,ee=k,t.width=Math.floor(T*se),t.height=Math.floor(k*se),J===!0&&(t.style.width=T+"px",t.style.height=k+"px"),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,T,k)},this.getDrawingBufferSize=function(T){return T.set(ke*se,ee*se).floor()},this.setDrawingBufferSize=function(T,k,J){ke=T,ee=k,se=J,t.width=Math.floor(T*J),t.height=Math.floor(k*J),this.setViewport(0,0,T,k)},this.setEffects=function(T){if(v===vn){ot("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let k=0;k<T.length;k++)if(T[k].isOutputPass===!0){Ge("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(O)},this.getViewport=function(T){return T.copy(ae)},this.setViewport=function(T,k,J,q){T.isVector4?ae.set(T.x,T.y,T.z,T.w):ae.set(T,k,J,q),y.viewport(O.copy(ae).multiplyScalar(se).round())},this.getScissor=function(T){return T.copy(Ee)},this.setScissor=function(T,k,J,q){T.isVector4?Ee.set(T.x,T.y,T.z,T.w):Ee.set(T,k,J,q),y.scissor(ne.copy(Ee).multiplyScalar(se).round())},this.getScissorTest=function(){return Je},this.setScissorTest=function(T){y.setScissorTest(Je=T)},this.setOpaqueSort=function(T){V=T},this.setTransparentSort=function(T){he=T},this.getClearColor=function(T){return T.copy(qe.getClearColor())},this.setClearColor=function(){qe.setClearColor(...arguments)},this.getClearAlpha=function(){return qe.getClearAlpha()},this.setClearAlpha=function(){qe.setClearAlpha(...arguments)},this.clear=function(T=!0,k=!0,J=!0){let q=0;if(T){let $=!1;if(Q!==null){const Me=Q.texture.format;$=x.has(Me)}if($){const Me=Q.texture.type,Ae=m.has(Me),_e=qe.getClearColor(),Te=qe.getClearAlpha(),De=_e.r,je=_e.g,nt=_e.b;Ae?(_[0]=De,_[1]=je,_[2]=nt,_[3]=Te,G.clearBufferuiv(G.COLOR,0,_)):(M[0]=De,M[1]=je,M[2]=nt,M[3]=Te,G.clearBufferiv(G.COLOR,0,M))}else q|=G.COLOR_BUFFER_BIT}k&&(q|=G.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),J&&(q|=G.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),q!==0&&G.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),N=T},this.dispose=function(){t.removeEventListener("webglcontextlost",Et,!1),t.removeEventListener("webglcontextrestored",ut,!1),t.removeEventListener("webglcontextcreationerror",Pn,!1),qe.dispose(),xe.dispose(),fe.dispose(),K.dispose(),le.dispose(),ie.dispose(),Se.dispose(),oe.dispose(),de.dispose(),Pe.dispose(),Pe.removeEventListener("sessionstart",Jl),Pe.removeEventListener("sessionend",Ql),Li.stop()};function Et(T){T.preventDefault(),wc("WebGLRenderer: Context Lost."),C=!0}function ut(){wc("WebGLRenderer: Context Restored."),C=!1;const T=B.autoReset,k=Be.enabled,J=Be.autoUpdate,q=Be.needsUpdate,$=Be.type;Ne(),B.autoReset=T,Be.enabled=k,Be.autoUpdate=J,Be.needsUpdate=q,Be.type=$}function Pn(T){ot("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Hn(T){const k=T.target;k.removeEventListener("dispose",Hn),Vu(k)}function Vu(T){Xu(T),K.remove(T)}function Xu(T){const k=K.get(T).programs;k!==void 0&&(k.forEach(function(J){de.releaseProgram(J)}),T.isShaderMaterial&&de.releaseShaderCache(T))}this.renderBufferDirect=function(T,k,J,q,$,Me){k===null&&(k=$t);const Ae=$.isMesh&&$.matrixWorld.determinantAffine()<0,_e=qu(T,k,J,q,$);y.setMaterial(q,Ae);let Te=J.index,De=1;if(q.wireframe===!0){if(Te=j.getWireframeAttribute(J),Te===void 0)return;De=2}const je=J.drawRange,nt=J.attributes.position;let Re=je.start*De,dt=(je.start+je.count)*De;Me!==null&&(Re=Math.max(Re,Me.start*De),dt=Math.min(dt,(Me.start+Me.count)*De)),Te!==null?(Re=Math.max(Re,0),dt=Math.min(dt,Te.count)):nt!=null&&(Re=Math.max(Re,0),dt=Math.min(dt,nt.count));const Ht=dt-Re;if(Ht<0||Ht===1/0)return;Se.setup($,q,_e,J,Te);let Ct,wt=pe;if(Te!==null&&(Ct=ue.get(Te),wt=re,wt.setIndex(Ct)),$.isMesh)q.wireframe===!0?(y.setLineWidth(q.wireframeLinewidth*yt()),wt.setMode(G.LINES)):wt.setMode(G.TRIANGLES);else if($.isLine){let tn=q.linewidth;tn===void 0&&(tn=1),y.setLineWidth(tn*yt()),$.isLineSegments?wt.setMode(G.LINES):$.isLineLoop?wt.setMode(G.LINE_LOOP):wt.setMode(G.LINE_STRIP)}else $.isPoints?wt.setMode(G.POINTS):$.isSprite&&wt.setMode(G.TRIANGLES);if($.isBatchedMesh)if(ze.get("WEBGL_multi_draw"))wt.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{const tn=$._multiDrawStarts,we=$._multiDrawCounts,on=$._multiDrawCount,at=Te?ue.get(Te).bytesPerElement:1,En=K.get(q).currentProgram.getUniforms();for(let Wn=0;Wn<on;Wn++)En.setValue(G,"_gl_DrawID",Wn),wt.render(tn[Wn]/at,we[Wn])}else if($.isInstancedMesh)wt.renderInstances(Re,Ht,$.count);else if(J.isInstancedBufferGeometry){const tn=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,we=Math.min(J.instanceCount,tn);wt.renderInstances(Re,Ht,we)}else wt.render(Re,Ht)};function Zl(T,k,J,q){N!==null&&T.isNodeMaterial&&N.setObject(q,T),Fe===!0&&Ie.setState(T,J,!1),T.transparent===!0&&T.side===oi&&T.forceSinglePass===!1?(T.side=dn,T.needsUpdate=!0,fs(T,k,q),T.side=Xi,T.needsUpdate=!0,fs(T,k,q),T.side=oi):fs(T,k,q)}this.compile=function(T,k,J=null){J===null&&(J=T),N!==null&&N.renderStart(T,k,J),E=fe.get(J),E.init(k),b.push(E),J.traverseVisible(function($){$.isLight&&$.layers.test(k.layers)&&(E.pushLight($),$.castShadow&&E.pushShadow($))}),T!==J&&T.traverseVisible(function($){$.isLight&&$.layers.test(k.layers)&&(E.pushLight($),$.castShadow&&E.pushShadow($))}),E.setupLights(),N!==null&&N.updateLights(E.state.lightsArray),Ke=this.localClippingEnabled,Fe=Ie.init(this.clippingPlanes,Ke),Fe===!0&&Ie.setGlobalState(this.clippingPlanes,k),N!==null&&Be.render(E.state.shadowsArray,J,k);const q=new Set;return T.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;const Me=$.material;if(Me)if(Array.isArray(Me))for(let Ae=0;Ae<Me.length;Ae++){const _e=Me[Ae];Zl(_e,J,k,$),q.add(_e)}else Zl(Me,J,k,$),q.add(Me)}),E=b.pop(),N!==null&&N.renderEnd(),q},this.compileAsync=function(T,k,J=null){const q=this.compile(T,k,J);return new Promise($=>{function Me(){if(q.forEach(function(Ae){const Te=K.get(Ae).currentProgram;(Te===void 0||Te.isReady())&&q.delete(Ae)}),q.size===0){$(T);return}setTimeout(Me,10)}ze.get("KHR_parallel_shader_compile")!==null?Me():setTimeout(Me,10)})};let Da=null;function Yu(T){Da&&Da(T)}function Jl(){Li.stop()}function Ql(){Li.start()}const Li=new Cu;Li.setAnimationLoop(Yu),typeof self<"u"&&Li.setContext(self),this.setAnimationLoop=function(T){Da=T,Pe.setAnimationLoop(T),T===null?Li.stop():Li.start()},Pe.addEventListener("sessionstart",Jl),Pe.addEventListener("sessionend",Ql),this.render=function(T,k){if(k!==void 0&&k.isCamera!==!0){ot("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;N!==null&&N.renderStart(T,k);const J=Pe.enabled===!0&&Pe.isPresenting===!0,q=A!==null&&(Q===null||J)&&A.begin(P,Q);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),Pe.enabled===!0&&Pe.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(Pe.cameraAutoUpdate===!0&&Pe.updateCamera(k),k=Pe.getCamera()),T.isScene===!0&&T.onBeforeRender(P,T,k,Q),E=fe.get(T,b.length),E.init(k),E.state.textureUnits=Z.getTextureUnits(),b.push(E),Ye.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),Ce.setFromProjectionMatrix(Ye,$n,k.reversedDepth),Ke=this.localClippingEnabled,Fe=Ie.init(this.clippingPlanes,Ke),w=xe.get(T,L.length),w.init(),L.push(w),Pe.enabled===!0&&Pe.isPresenting===!0){const Ae=P.xr.getDepthSensingMesh();Ae!==null&&Ia(Ae,k,-1/0,P.sortObjects)}Ia(T,k,0,P.sortObjects),w.finish(),N!==null&&N.updateLights(E.state.lightsArray),P.sortObjects===!0&&w.sort(V,he),_t=Pe.enabled===!1||Pe.isPresenting===!1||Pe.hasDepthSensing()===!1,_t&&qe.addToRenderList(w,T),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Fe===!0&&Ie.beginShadows();const $=E.state.shadowsArray;if(Be.render($,T,k),Fe===!0&&Ie.endShadows(),(q&&A.hasRenderPass())===!1){const Ae=w.opaque,_e=w.transmissive;if(E.setupLights(),k.isArrayCamera){const Te=k.cameras;if(_e.length>0)for(let De=0,je=Te.length;De<je;De++){const nt=Te[De];ec(Ae,_e,T,nt)}_t&&qe.render(T);for(let De=0,je=Te.length;De<je;De++){const nt=Te[De];jl(w,T,nt,nt.viewport)}}else _e.length>0&&ec(Ae,_e,T,k),_t&&qe.render(T),jl(w,T,k)}Q!==null&&X===0&&(Z.updateMultisampleRenderTarget(Q),Z.updateRenderTargetMipmap(Q)),q&&A.end(P),T.isScene===!0&&T.onAfterRender(P,T,k),Se.resetDefaultState(),Y=-1,te=null,b.pop(),b.length>0?(E=b[b.length-1],Z.setTextureUnits(E.state.textureUnits),Fe===!0&&Ie.setGlobalState(P.clippingPlanes,E.state.camera)):E=null,L.pop(),L.length>0?w=L[L.length-1]:w=null,N!==null&&N.renderEnd()};function Ia(T,k,J,q){if(T.visible===!1)return;if(T.layers.test(k.layers)){if(T.isGroup)J=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(k);else if(T.isLightProbeGrid)E.pushLightProbeGrid(T);else if(T.isLight)E.pushLight(T),T.castShadow&&E.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||T.intersectsFrustum(Ce)){q&&Ut.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Ye);const Ae=ie.update(T),_e=T.material;_e.visible&&w.push(T,Ae,_e,J,Ut.z,null,k)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||T.intersectsFrustum(Ce))){const Ae=ie.update(T),_e=T.material;if(q&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Ut.copy(T.boundingSphere.center)):(Ae.boundingSphere===null&&Ae.computeBoundingSphere(),Ut.copy(Ae.boundingSphere.center)),Ut.applyMatrix4(T.matrixWorld).applyMatrix4(Ye)),Array.isArray(_e)){const Te=Ae.groups;for(let De=0,je=Te.length;De<je;De++){const nt=Te[De],Re=_e[nt.materialIndex];Re&&Re.visible&&w.push(T,Ae,Re,J,Ut.z,nt,k)}}else _e.visible&&w.push(T,Ae,_e,J,Ut.z,null,k)}}const Me=T.children;for(let Ae=0,_e=Me.length;Ae<_e;Ae++)Ia(Me[Ae],k,J,q)}function jl(T,k,J,q){const{opaque:$,transmissive:Me,transparent:Ae}=T;E.setupLightsView(J),Fe===!0&&Ie.setGlobalState(P.clippingPlanes,J),q&&y.viewport(O.copy(q)),$.length>0&&ds($,k,J),Me.length>0&&ds(Me,k,J),Ae.length>0&&ds(Ae,k,J),y.buffers.depth.setTest(!0),y.buffers.depth.setMask(!0),y.buffers.color.setMask(!0),y.setPolygonOffset(!1)}function ec(T,k,J,q){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[q.id]===void 0){const Re=ze.has("EXT_color_buffer_half_float")||ze.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[q.id]=new Cn(1,1,{generateMipmaps:!0,type:Re?jn:vn,minFilter:ki,samples:Math.max(4,I.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:it.workingColorSpace})}const Me=E.state.transmissionRenderTarget[q.id],Ae=q.viewport||O;Me.setSize(Ae.z*P.transmissionResolutionScale,Ae.w*P.transmissionResolutionScale);const _e=P.getRenderTarget(),Te=P.getActiveCubeFace(),De=P.getActiveMipmapLevel();P.setRenderTarget(Me),P.getClearColor(be),Ue=P.getClearAlpha(),Ue<1&&P.setClearColor(16777215,.5),P.clear(),_t&&qe.render(J);const je=P.toneMapping;P.toneMapping=Jn;const nt=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),E.setupLightsView(q),Fe===!0&&Ie.setGlobalState(P.clippingPlanes,q),ds(T,J,q),Z.updateMultisampleRenderTarget(Me),Z.updateRenderTargetMipmap(Me),ze.has("WEBGL_multisampled_render_to_texture")===!1){let Re=!1;for(let dt=0,Ht=k.length;dt<Ht;dt++){const Ct=k[dt],{object:wt,geometry:tn,material:we,group:on}=Ct;if(we.side===oi&&wt.layers.test(q.layers)){const at=we.side;we.side=dn,we.needsUpdate=!0,tc(wt,J,q,tn,we,on),we.side=at,we.needsUpdate=!0,Re=!0}}Re===!0&&(Z.updateMultisampleRenderTarget(Me),Z.updateRenderTargetMipmap(Me))}P.setRenderTarget(_e,Te,De),P.setClearColor(be,Ue),nt!==void 0&&(q.viewport=nt),P.toneMapping=je}function ds(T,k,J){const q=k.isScene===!0?k.overrideMaterial:null;for(let $=0,Me=T.length;$<Me;$++){const Ae=T[$],{object:_e,geometry:Te,group:De}=Ae;let je=Ae.material;je.allowOverride===!0&&q!==null&&(je=q),_e.layers.test(J.layers)&&tc(_e,k,J,Te,je,De)}}function tc(T,k,J,q,$,Me){N!==null&&$.isNodeMaterial&&N.setObject(T,$),T.onBeforeRender(P,k,J,q,$,Me),T.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),$.onBeforeRender(P,k,J,q,T,Me),$.transparent===!0&&$.side===oi&&$.forceSinglePass===!1?($.side=dn,$.needsUpdate=!0,P.renderBufferDirect(J,k,q,$,T,Me),$.side=Xi,$.needsUpdate=!0,P.renderBufferDirect(J,k,q,$,T,Me),$.side=oi):P.renderBufferDirect(J,k,q,$,T,Me),T.onAfterRender(P,k,J,q,$,Me)}function fs(T,k,J){k.isScene!==!0&&(k=$t);const q=K.get(T),$=E.state.lights,Me=E.state.shadowsArray,Ae=$.state.version,_e=de.getParameters(T,$.state,Me,k,J,E.state.lightProbeGridArray),Te=de.getProgramCacheKey(_e);let De=q.programs;q.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?k.environment:null,q.fog=k.fog;const je=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;q.envMap=le.get(T.envMap||q.environment,je),q.envMapRotation=q.environment!==null&&T.envMap===null?k.environmentRotation:T.envMapRotation,De===void 0&&(T.addEventListener("dispose",Hn),De=new Map,q.programs=De);let nt=De.get(Te);if(nt!==void 0){if(q.currentProgram===nt&&q.lightsStateVersion===Ae)return ic(T,_e),nt}else _e.uniforms=de.getUniforms(T),N!==null&&T.isNodeMaterial&&N.build(T,J,_e),T.onBeforeCompile(_e,P),nt=de.acquireProgram(_e,Te),De.set(Te,nt),q.uniforms=_e.uniforms;const Re=q.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Re.clippingPlanes=Ie.uniform),ic(T,_e),q.needsLights=Zu(T),q.lightsStateVersion=Ae,q.needsLights&&(Re.ambientLightColor.value=$.state.ambient,Re.lightProbe.value=$.state.probe,Re.sunLights.value=$.state.sun,Re.sunLightShadows.value=$.state.sunShadow,Re.directionalLights.value=$.state.directional,Re.directionalLightShadows.value=$.state.directionalShadow,Re.spotLights.value=$.state.spot,Re.spotLightShadows.value=$.state.spotShadow,Re.rectAreaLights.value=$.state.rectArea,Re.ltc_1.value=$.state.rectAreaLTC1,Re.ltc_2.value=$.state.rectAreaLTC2,Re.pointLights.value=$.state.point,Re.pointLightShadows.value=$.state.pointShadow,Re.hemisphereLights.value=$.state.hemi,Re.sunShadowMatrix.value=$.state.sunShadowMatrix,Re.sunShadowCascade.value=$.state.sunShadowCascade,Re.directionalShadowMatrix.value=$.state.directionalShadowMatrix,Re.spotLightMatrix.value=$.state.spotLightMatrix,Re.spotLightMap.value=$.state.spotLightMap,Re.pointShadowMatrix.value=$.state.pointShadowMatrix),q.lightProbeGrid=E.state.lightProbeGridArray.length>0,q.currentProgram=nt,q.uniformsList=null,nt}function nc(T){if(T.uniformsList===null){const k=T.currentProgram.getUniforms();T.uniformsList=ia.seqWithValue(k.seq,T.uniforms)}return T.uniformsList}function ic(T,k){const J=K.get(T);J.outputColorSpace=k.outputColorSpace,J.batching=k.batching,J.batchingColor=k.batchingColor,J.instancing=k.instancing,J.instancingColor=k.instancingColor,J.instancingMorph=k.instancingMorph,J.skinning=k.skinning,J.morphTargets=k.morphTargets,J.morphNormals=k.morphNormals,J.morphColors=k.morphColors,J.morphTargetsCount=k.morphTargetsCount,J.numClippingPlanes=k.numClippingPlanes,J.numIntersection=k.numClipIntersection,J.vertexAlphas=k.vertexAlphas,J.vertexTangents=k.vertexTangents,J.toneMapping=k.toneMapping}function Ku(T,k){if(T.length===0)return null;if(T.length===1)return T[0].texture!==null?T[0]:null;S.setFromMatrixPosition(k.matrixWorld);for(let J=0,q=T.length;J<q;J++){const $=T[J];if($.texture!==null&&$.boundingBox.containsPoint(S))return $}return null}function qu(T,k,J,q,$){k.isScene!==!0&&(k=$t),Z.resetTextureUnits();const Me=k.fog,Ae=q.isMeshStandardMaterial||q.isMeshLambertMaterial||q.isMeshPhongMaterial?k.environment:null,_e=Q===null?P.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:it.workingColorSpace,Te=q.isMeshStandardMaterial||q.isMeshLambertMaterial&&!q.envMap||q.isMeshPhongMaterial&&!q.envMap,De=le.get(q.envMap||Ae,Te),je=q.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,nt=!!J.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Re=!!J.morphAttributes.position,dt=!!J.morphAttributes.normal,Ht=!!J.morphAttributes.color;let Ct=Jn;q.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(Ct=P.toneMapping);const wt=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,tn=wt!==void 0?wt.length:0,we=K.get(q),on=E.state.lights;if(Fe===!0&&(Ke===!0||T!==te)){const At=T===te&&q.id===Y;Ie.setState(q,T,At)}let at=!1;q.version===we.__version?(we.needsLights&&we.lightsStateVersion!==on.state.version||we.outputColorSpace!==_e||$.isBatchedMesh&&we.batching===!1||!$.isBatchedMesh&&we.batching===!0||$.isBatchedMesh&&we.batchingColor===!0&&$._colorsTexture===null||$.isBatchedMesh&&we.batchingColor===!1&&$._colorsTexture!==null||$.isInstancedMesh&&we.instancing===!1||!$.isInstancedMesh&&we.instancing===!0||$.isSkinnedMesh&&we.skinning===!1||!$.isSkinnedMesh&&we.skinning===!0||$.isInstancedMesh&&we.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&we.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&we.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&we.instancingMorph===!1&&$.morphTexture!==null||we.envMap!==De||q.fog===!0&&we.fog!==Me||we.numClippingPlanes!==void 0&&(we.numClippingPlanes!==Ie.numPlanes||we.numIntersection!==Ie.numIntersection)||we.vertexAlphas!==je||we.vertexTangents!==nt||we.morphTargets!==Re||we.morphNormals!==dt||we.morphColors!==Ht||we.toneMapping!==Ct||we.morphTargetsCount!==tn||!!we.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(at=!0):(at=!0,we.__version=q.version);let En=we.currentProgram;at===!0&&(En=fs(q,k,$),N&&q.isNodeMaterial&&N.onUpdateProgram(q,En,we));let Wn=!1,fi=!1,Zi=!1;const Mt=En.getUniforms(),Gt=we.uniforms;if(y.useProgram(En.program)&&(Wn=!0,fi=!0,Zi=!0),q.id!==Y&&(Y=q.id,fi=!0),we.needsLights){const At=Ku(E.state.lightProbeGridArray,$);we.lightProbeGrid!==At&&(we.lightProbeGrid=At,fi=!0)}if(Wn||te!==T){y.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),Mt.setValue(G,"projectionMatrix",T.projectionMatrix),Mt.setValue(G,"viewMatrix",T.matrixWorldInverse);const mi=Mt.map.cameraPosition;mi!==void 0&&mi.setValue(G,bt.setFromMatrixPosition(T.matrixWorld)),I.logarithmicDepthBuffer&&Mt.setValue(G,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&Mt.setValue(G,"isOrthographic",T.isOrthographicCamera===!0),te!==T&&(te=T,fi=!0,Zi=!0)}if(we.needsLights&&(on.state.sunShadowMap.length>0&&Mt.setValue(G,"sunShadowMap",on.state.sunShadowMap,Z),on.state.directionalShadowMap.length>0&&Mt.setValue(G,"directionalShadowMap",on.state.directionalShadowMap,Z),on.state.spotShadowMap.length>0&&Mt.setValue(G,"spotShadowMap",on.state.spotShadowMap,Z),on.state.pointShadowMap.length>0&&Mt.setValue(G,"pointShadowMap",on.state.pointShadowMap,Z)),$.isSkinnedMesh){Mt.setOptional(G,$,"bindMatrix"),Mt.setOptional(G,$,"bindMatrixInverse");const At=$.skeleton;At&&(At.boneTexture===null&&At.computeBoneTexture(),Mt.setValue(G,"boneTexture",At.boneTexture,Z))}$.isBatchedMesh&&(Mt.setOptional(G,$,"batchingTexture"),Mt.setValue(G,"batchingTexture",$._matricesTexture,Z),Mt.setOptional(G,$,"batchingIdTexture"),Mt.setValue(G,"batchingIdTexture",$._indirectTexture,Z),Mt.setOptional(G,$,"batchingColorTexture"),$._colorsTexture!==null&&Mt.setValue(G,"batchingColorTexture",$._colorsTexture,Z));const pi=J.morphAttributes;if((pi.position!==void 0||pi.normal!==void 0||pi.color!==void 0)&&H.update($,J,En),(fi||we.receiveShadow!==$.receiveShadow)&&(we.receiveShadow=$.receiveShadow,Mt.setValue(G,"receiveShadow",$.receiveShadow)),(q.isMeshStandardMaterial||q.isMeshLambertMaterial||q.isMeshPhongMaterial)&&q.envMap===null&&k.environment!==null&&(Gt.envMapIntensity.value=k.environmentIntensity),Gt.dfgLUT!==void 0&&(Gt.dfgLUT.value=f_()),fi){if(Mt.setValue(G,"toneMappingExposure",P.toneMappingExposure),we.needsLights&&$u(Gt,Zi),Me&&q.fog===!0&&Le.refreshFogUniforms(Gt,Me),Le.refreshMaterialUniforms(Gt,q,se,ee,E.state.transmissionRenderTarget[T.id]),we.needsLights&&we.lightProbeGrid){const At=we.lightProbeGrid;Gt.probesSH.value=At.texture,Gt.probesMin.value.copy(At.boundingBox.min),Gt.probesMax.value.copy(At.boundingBox.max),Gt.probesResolution.value.copy(At.resolution)}ia.upload(G,nc(we),Gt,Z)}if(q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(ia.upload(G,nc(we),Gt,Z),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&Mt.setValue(G,"center",$.center),Mt.setValue(G,"modelViewMatrix",$.modelViewMatrix),Mt.setValue(G,"normalMatrix",$.normalMatrix),Mt.setValue(G,"modelMatrix",$.matrixWorld),q.uniformsGroups!==void 0){const At=q.uniformsGroups;for(let mi=0,Ji=At.length;mi<Ji;mi++){const sc=At[mi];oe.update(sc,En),oe.bind(sc,En)}}return En}function $u(T,k){T.ambientLightColor.needsUpdate=k,T.lightProbe.needsUpdate=k,T.sunLights.needsUpdate=k,T.sunLightShadows.needsUpdate=k,T.directionalLights.needsUpdate=k,T.directionalLightShadows.needsUpdate=k,T.pointLights.needsUpdate=k,T.pointLightShadows.needsUpdate=k,T.spotLights.needsUpdate=k,T.spotLightShadows.needsUpdate=k,T.rectAreaLights.needsUpdate=k,T.hemisphereLights.needsUpdate=k}function Zu(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return X},this.getRenderTarget=function(){return Q},this.setRenderTargetTextures=function(T,k,J){const q=K.get(T);q.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,q.__autoAllocateDepthBuffer===!1&&(q.__useRenderToTexture=!1),K.get(T.texture).__webglTexture=k,K.get(T.depthTexture).__webglTexture=q.__autoAllocateDepthBuffer?void 0:J,q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,k){const J=K.get(T);J.__webglFramebuffer=k,J.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(T,k=0,J=0){Q=T,z=k,X=J;let q=null,$=!1,Me=!1;if(T){const _e=K.get(T);if(_e.__useDefaultFramebuffer!==void 0){y.bindFramebuffer(G.FRAMEBUFFER,_e.__webglFramebuffer),O.copy(T.viewport),ne.copy(T.scissor),ce=T.scissorTest,y.viewport(O),y.scissor(ne),y.setScissorTest(ce),Y=-1;return}else if(_e.__webglFramebuffer===void 0)Z.setupRenderTarget(T);else if(_e.__hasExternalTextures)Z.rebindTextures(T,K.get(T.texture).__webglTexture,K.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const je=T.depthTexture;if(_e.__boundDepthTexture!==je){if(je!==null&&K.has(je)&&(T.width!==je.image.width||T.height!==je.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Z.setupDepthRenderbuffer(T)}}const Te=T.texture;(Te.isData3DTexture||Te.isDataArrayTexture||Te.isCompressedArrayTexture)&&(Me=!0);const De=K.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(De[k])?q=De[k][J]:q=De[k],$=!0):T.samples>0&&Z.useMultisampledRTT(T)===!1?q=K.get(T).__webglMultisampledFramebuffer:Array.isArray(De)?q=De[J]:q=De,O.copy(T.viewport),ne.copy(T.scissor),ce=T.scissorTest}else O.copy(ae).multiplyScalar(se).floor(),ne.copy(Ee).multiplyScalar(se).floor(),ce=Je;if(J!==0&&(q=U),y.bindFramebuffer(G.FRAMEBUFFER,q)&&y.drawBuffers(T,q),y.viewport(O),y.scissor(ne),y.setScissorTest(ce),$){const _e=K.get(T.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_CUBE_MAP_POSITIVE_X+k,_e.__webglTexture,J)}else if(Me){const _e=k;for(let Te=0;Te<T.textures.length;Te++){const De=K.get(T.textures[Te]);G.framebufferTextureLayer(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0+Te,De.__webglTexture,J,_e)}}else if(T!==null&&J!==0){const _e=K.get(T.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,_e.__webglTexture,J)}Y=-1};function rc(T){const k=K.get(T);return(k.__readFormat!==T.format||k.__readType!==T.type)&&(k.__readFormat=T.format,k.__readType=T.type,k.__formatReadable=I.textureFormatReadable(T.format),k.__typeReadable=I.textureTypeReadable(T.type)),k}this.readRenderTargetPixels=function(T,k,J,q,$,Me,Ae,_e=0){if(!(T&&T.isWebGLRenderTarget)){ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=K.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Ae!==void 0&&(Te=Te[Ae]),Te){y.bindFramebuffer(G.FRAMEBUFFER,Te);try{const De=T.textures[_e],je=De.format,nt=De.type;T.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+_e);const Re=rc(De);if(Re.__formatReadable===!1){ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Re.__typeReadable===!1){ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=T.width-q&&J>=0&&J<=T.height-$&&G.readPixels(k,J,q,$,me.convert(je),me.convert(nt),Me)}finally{const De=Q!==null?K.get(Q).__webglFramebuffer:null;y.bindFramebuffer(G.FRAMEBUFFER,De)}}},this.readRenderTargetPixelsAsync=async function(T,k,J,q,$,Me,Ae,_e=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=K.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Ae!==void 0&&(Te=Te[Ae]),Te)if(k>=0&&k<=T.width-q&&J>=0&&J<=T.height-$){y.bindFramebuffer(G.FRAMEBUFFER,Te);const De=T.textures[_e],je=De.format,nt=De.type;T.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+_e);const Re=rc(De);if(Re.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Re.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const dt=G.createBuffer();G.bindBuffer(G.PIXEL_PACK_BUFFER,dt),G.bufferData(G.PIXEL_PACK_BUFFER,Me.byteLength,G.STREAM_READ),G.readPixels(k,J,q,$,me.convert(je),me.convert(nt),0),G.bindBuffer(G.PIXEL_PACK_BUFFER,null);const Ht=Q!==null?K.get(Q).__webglFramebuffer:null;y.bindFramebuffer(G.FRAMEBUFFER,Ht);const Ct=G.fenceSync(G.SYNC_GPU_COMMANDS_COMPLETE,0);return G.flush(),await Nm(G,Ct,4),G.bindBuffer(G.PIXEL_PACK_BUFFER,dt),G.getBufferSubData(G.PIXEL_PACK_BUFFER,0,Me),G.bindBuffer(G.PIXEL_PACK_BUFFER,null),G.deleteBuffer(dt),G.deleteSync(Ct),Me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,k=null,J=0){const q=Math.pow(2,-J),$=Math.floor(T.image.width*q),Me=Math.floor(T.image.height*q),Ae=k!==null?k.x:0,_e=k!==null?k.y:0;Z.setTexture2D(T,0),G.copyTexSubImage2D(G.TEXTURE_2D,J,0,0,Ae,_e,$,Me),y.unbindTexture()},this.copyTextureToTexture=function(T,k,J=null,q=null,$=0,Me=0){let Ae,_e,Te,De,je,nt,Re,dt,Ht;const Ct=T.isCompressedTexture?T.mipmaps[Me]:T.image;if(J!==null)Ae=J.max.x-J.min.x,_e=J.max.y-J.min.y,Te=J.isBox3?J.max.z-J.min.z:1,De=J.min.x,je=J.min.y,nt=J.isBox3?J.min.z:0;else{const Gt=Math.pow(2,-$);Ae=Math.floor(Ct.width*Gt),_e=Math.floor(Ct.height*Gt),T.isDataArrayTexture?Te=Ct.depth:T.isData3DTexture?Te=Math.floor(Ct.depth*Gt):Te=1,De=0,je=0,nt=0}q!==null?(Re=q.x,dt=q.y,Ht=q.z):(Re=0,dt=0,Ht=0);const wt=me.convert(k.format),tn=me.convert(k.type);let we;k.isData3DTexture?(Z.setTexture3D(k,0),we=G.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(Z.setTexture2DArray(k,0),we=G.TEXTURE_2D_ARRAY):(Z.setTexture2D(k,0),we=G.TEXTURE_2D),y.activeTexture(G.TEXTURE0),y.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,k.flipY),y.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),y.pixelStorei(G.UNPACK_ALIGNMENT,k.unpackAlignment);const on=y.getParameter(G.UNPACK_ROW_LENGTH),at=y.getParameter(G.UNPACK_IMAGE_HEIGHT),En=y.getParameter(G.UNPACK_SKIP_PIXELS),Wn=y.getParameter(G.UNPACK_SKIP_ROWS),fi=y.getParameter(G.UNPACK_SKIP_IMAGES);y.pixelStorei(G.UNPACK_ROW_LENGTH,Ct.width),y.pixelStorei(G.UNPACK_IMAGE_HEIGHT,Ct.height),y.pixelStorei(G.UNPACK_SKIP_PIXELS,De),y.pixelStorei(G.UNPACK_SKIP_ROWS,je),y.pixelStorei(G.UNPACK_SKIP_IMAGES,nt);const Zi=T.isDataArrayTexture||T.isData3DTexture,Mt=k.isDataArrayTexture||k.isData3DTexture;if(T.isDepthTexture){const Gt=K.get(T),pi=K.get(k),At=K.get(Gt.__renderTarget),mi=K.get(pi.__renderTarget);y.bindFramebuffer(G.READ_FRAMEBUFFER,At.__webglFramebuffer),y.bindFramebuffer(G.DRAW_FRAMEBUFFER,mi.__webglFramebuffer);for(let Ji=0;Ji<Te;Ji++)Zi&&(G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,K.get(T).__webglTexture,$,nt+Ji),G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,K.get(k).__webglTexture,Me,Ht+Ji)),G.blitFramebuffer(De,je,Ae,_e,Re,dt,Ae,_e,G.DEPTH_BUFFER_BIT,G.NEAREST);y.bindFramebuffer(G.READ_FRAMEBUFFER,null),y.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else if($!==0||T.isRenderTargetTexture||K.has(T)){const Gt=K.get(T),pi=K.get(k);y.bindFramebuffer(G.READ_FRAMEBUFFER,D),y.bindFramebuffer(G.DRAW_FRAMEBUFFER,F);for(let At=0;At<Te;At++)Zi?G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,Gt.__webglTexture,$,nt+At):G.framebufferTexture2D(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,Gt.__webglTexture,$),Mt?G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,pi.__webglTexture,Me,Ht+At):G.framebufferTexture2D(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,pi.__webglTexture,Me),$!==0?G.blitFramebuffer(De,je,Ae,_e,Re,dt,Ae,_e,G.COLOR_BUFFER_BIT,G.NEAREST):Mt?G.copyTexSubImage3D(we,Me,Re,dt,Ht+At,De,je,Ae,_e):G.copyTexSubImage2D(we,Me,Re,dt,De,je,Ae,_e);y.bindFramebuffer(G.READ_FRAMEBUFFER,null),y.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else Mt?T.isDataTexture||T.isData3DTexture?G.texSubImage3D(we,Me,Re,dt,Ht,Ae,_e,Te,wt,tn,Ct.data):k.isCompressedArrayTexture?G.compressedTexSubImage3D(we,Me,Re,dt,Ht,Ae,_e,Te,wt,Ct.data):G.texSubImage3D(we,Me,Re,dt,Ht,Ae,_e,Te,wt,tn,Ct):T.isDataTexture?G.texSubImage2D(G.TEXTURE_2D,Me,Re,dt,Ae,_e,wt,tn,Ct.data):T.isCompressedTexture?G.compressedTexSubImage2D(G.TEXTURE_2D,Me,Re,dt,Ct.width,Ct.height,wt,Ct.data):G.texSubImage2D(G.TEXTURE_2D,Me,Re,dt,Ae,_e,wt,tn,Ct);y.pixelStorei(G.UNPACK_ROW_LENGTH,on),y.pixelStorei(G.UNPACK_IMAGE_HEIGHT,at),y.pixelStorei(G.UNPACK_SKIP_PIXELS,En),y.pixelStorei(G.UNPACK_SKIP_ROWS,Wn),y.pixelStorei(G.UNPACK_SKIP_IMAGES,fi),Me===0&&k.generateMipmaps&&G.generateMipmap(we),y.unbindTexture()},this.initRenderTarget=function(T){K.get(T).__webglFramebuffer===void 0&&Z.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?Z.setTextureCube(T,0):T.isData3DTexture?Z.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?Z.setTexture2DArray(T,0):Z.setTexture2D(T,0),y.unbindTexture()},this.resetState=function(){z=0,X=0,Q=null,y.reset(),Se.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return $n}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=it._getDrawingBufferColorSpace(e),t.unpackColorSpace=it._getUnpackColorSpace()}}const zt=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},vt=(n,e,t=0)=>zt(Math.floor(n[0]*e)+Math.floor(n[2]*e)*57+t,Math.floor(n[1]*e)),Dt=(n=.2,e=.15)=>t=>{const i=vt(t,16,3);return vt(t,6,5)<e&&t[1]>.1?f.MOSS:i>1-n*.7?f.BODY2:void 0},Ot=(n,e,t,i,r,s=0,a=0)=>{for(let o=0;o<e;o++){const c=zt(r,o)*6.283,l=t*Math.sqrt(zt(o,r));n.ell([s+Math.cos(c)*l,.07,a+Math.sin(c)*l*.7],[.07,.1+zt(o,4)*.08,.07],f.LEAF2,{group:i+o%3,paint:h=>h[1]>.13?f.LEAF:void 0})}},Vs=(n,e,t,i=1)=>{for(let r=0;r<6;r++){const s=r/6*6.283+e[0],a=[Math.cos(s),0,Math.sin(s)];n.chain([[...e,.03*i],[...R.add(e,R.add(R.mul(a,.25*i),[0,.2*i,0])),.025*i],[...R.add(e,R.add(R.mul(a,.5*i),[0,.05*i,0])),.01*i]],r%2?f.LEAF:f.LEAF2,{group:t})}},zn=(n,e,t,i,r)=>{const s=[];for(let a=0;a<=4;a++)s.push([...R.add(R.lerp(e,t,a/4),[(zt(r,a)-.5)*.12,0,.02]),.03]);n.chain(s,f.LEAF,{group:i,paint:a=>vt(a,30)<.3?f.LEAF2:void 0})},xa=(n,e,t,i)=>n.ell(e,t,f.LEAF,{group:i,rough:.04,paint:r=>{const s=vt(r,10,2);return r[1]<e[1]-.15||s<.2?f.LEAF3:s>.8?f.LEAF2:void 0}}),Ze=(n,e,t,i,r=.025,s=f.FRAME)=>n.seg(e,t,r,r,s,{group:i,paint:Dt(.35,.05)}),Dr=(n,e,t,i,r=f.MAGIC)=>n.ell(e,[t,t,t],r,{group:i,extra:!0});function Kn(n,e,{yaw:t=0,pitch:i=0,roll:r=0,at:s=[0,0,0]}={}){const a=(d,u,p,g)=>{const v=Math.cos(u),x=Math.sin(u),m=[...d];return m[p]=d[p]*v-d[g]*x,m[g]=d[p]*x+d[g]*v,m},o=d=>a(a(a(d,r,1,2),i,0,1),-t,0,2),c=d=>a(a(a(d,t,0,2),-i,0,1),-r,1,2),l=d=>R.add(o(d),s),h=d=>c(R.sub(d,s));for(const d of n.parts.slice(e))if(d.type==="cone"?(d.a=l(d.a),d.b=l(d.b)):(d.c=l(d.c),d.axes=d.axes.map(o)),d.paint){const u=d.paint;d.paint=(p,g)=>u(h(p),g)}}function _o(n,e,{len:t=1.5,van:i=!1,glow:r=!1,flat:s=!1}={}){const a=i?.62:.3,o=i?.8:.5;n.box([0,o,0],[t,a,.66],f.BODY,{round:.14,group:e,paint:c=>{const l=Dt(.3,.12)(c);return l||(c[0]>t-.06&&Math.abs(c[1]-(o+a*.2))<.07&&Math.abs(Math.abs(c[2])-.45)<.1?r?f.MAGIC2:f.FRAME:i&&c[1]>o+.1&&Math.abs(c[2])>.6&&Math.abs(c[0]+.2)<.9&&(c[0]+3)*3%1>.15||c[1]<o-a+.1?f.SHADES:void 0)}}),i||n.box([-.2,o+a+.22,0],[t*.6,.24,.6],f.BODY,{round:.14,group:e,paint:c=>Math.abs(c[2])>.52||c[0]>t*.6-.25-.2?vt(c,9)<.25?f.STONED:f.SHADES:Dt(.3,.25)(c)});for(const c of[-t*.65,t*.65])for(const l of[-.66,.66])n.ell([c,.3,l],[.3,s?.22:.3,.1],f.BODY3,{group:e+1,paint:h=>Math.hypot(h[0]-c,h[1]-.3)<.12?f.FRAME:void 0});if(r)for(const c of[-.45,.45])Dr(n,[t+.05,o+a*.2,c],.07,e+2,f.MAGIC2)}const m_={"car-nose-down":{desc:"a hatchback nose-down in the earth, ferns round it",build(n){const e=n.parts.length;_o(n,1),Kn(n,e,{pitch:-.5,at:[0,.2,0]}),n.ell([1.3,.1,0],[.9,.35,1],f.BARK2,{group:4,rough:.04,paint:t=>t[1]>.25?f.MOSS:void 0}),Vs(n,[.9,.2,.8],5),Vs(n,[-.9,.05,.9],6,.8),n.ell([-.6,1.25,0],[.5,.06,.4],f.MOSS,{group:7})}},"van-tree":{desc:"a camper van with a tree grown up through its roof, its headlights glowing with fairy light",glow:!0,build(n){_o(n,1,{van:!0,len:1.6,flat:!0,glow:!0}),n.chain([[.2,0,0,.22],[.2,1.5,0,.2],[.3,2.6,-.1,.14],[.35,3.3,-.1,.08]],f.TRUNK,{group:4,rough:.015}),xa(n,[.3,3.4,-.1],[1.1,.7,.9],5),zn(n,[-1.6,.1,.66],[-1,1.3,.7],6,1),Ot(n,14,2.2,7,2)}},"car-on-side":{desc:"a car on its side among ferns",build(n){const e=n.parts.length;_o(n,1),Kn(n,e,{roll:Math.PI/2,at:[0,.2,.1]});for(const[t,i]of[[-1.2,.9],[.3,1.1],[1.4,.6],[-.4,-1]])Vs(n,[t,.05,i],5+(t>0?1:0),1.1)}},"trolley-tipped":{desc:"a shopping trolley tipped over, a plant growing in its basket",build(n){const e=n.parts.length;vh(n,1),xa(n,[.05,.65,0],[.32,.28,.26],3),Kn(n,e,{roll:1.35,at:[0,.32,0]}),Ot(n,8,.9,6,3)}},"trolley-nest":{desc:"a shopping trolley standing upright, a bird's nest in its basket",build(n){vh(n,1),n.ell([0,.78,0],[.2,.08,.17],f.STRAW,{group:3,paint:e=>Math.abs(Math.sin(e[0]*40+e[2]*30))<.3?f.BARK2:void 0});for(const e of[-.05,.05])n.ell([e,.84,.02],[.04,.03,.035],f.BELLY,{group:4});Ot(n,8,.9,6,4)}},cone:{desc:"a single traffic cone, faded",build(n){Zr(n,[0,0,0],1)}},cones:{desc:"a little cluster of traffic cones, one fallen",build(n){Zr(n,[0,0,0],1),Zr(n,[.5,0,.2],4);const e=n.parts.length;Zr(n,[0,0,0],7),Kn(n,e,{roll:1.5,yaw:.6,at:[-.4,.2,.4]}),Ot(n,6,.8,10,5)}},"cone-lantern":{desc:"a traffic cone lit from within like a lantern, a ring of mushrooms round it",glow:!0,build(n){Zr(n,[0,0,0],1,!0);for(let e=0;e<9;e++){const t=e/9*6.283,i=[Math.cos(t)*.55,0,Math.sin(t)*.45];n.seg(i,R.add(i,[0,.08,0]),.02,.02,f.CLOTH,{group:5}),n.ell(R.add(i,[0,.1,0]),[.06,.035,.06],f.BODY2,{group:6})}}},"highway-slab":{desc:"a slab of tarmac tilted up out of the ground, faded lane markings, a crash-barrier stub",build(n){const e=n.parts.length;n.box([0,0,0],[2.2,.14,1.3],f.STONE,{round:.03,group:1,rough:.01,paint:t=>vt(t,5,1)<.06||Math.abs(Math.sin(t[0]*3+t[2]*5)*.3+t[2]*.6-.2)<.02?f.STONED:t[1]>.1&&Math.abs(t[2])<.05&&(t[0]+9)*.8%1<.55?vt(t,12)<.3?f.STONE:f.CLOTH:t[1]>.1&&Math.abs(t[2]-1.1)<.04?f.BELLY:t[1]>.1&&vt(t,6,4)<.12?f.MOSS:void 0});for(const t of[-1.6,-.4])Ze(n,[t,.1,1.25],[t,.75,1.25],2,.04);n.box([-1,.62,1.3],[.9,.1,.03],f.FRAME,{group:3,paint:t=>Math.abs(t[1]-.62)<.02?f.STONED:Dt(.5,.1)(t)}),Kn(n,e,{pitch:.38,roll:.08,at:[0,.7,0]}),n.ell([-1.8,.1,0],[.6,.2,1.3],f.BARK2,{group:5,rough:.04,paint:t=>t[1]>.2?f.MOSS:void 0}),Ot(n,16,2.4,6,6)}},"highway-line":{desc:"a section of cracked road, its white line broken, grass in the cracks",build(n){n.box([0,.02,0],[2,.03,1],f.STONE,{round:.02,group:1,paint:e=>vt(e,4,9)<.08||Math.abs(Math.sin(e[0]*2.3)*.4-e[2])<.025?vt(e,20)<.4?f.LEAF2:f.STONED:Math.abs(e[2]+.05)<.05&&(e[0]+9)*.7%1<.6?f.CLOTH:vt(e,6)<.08?f.MOSS:void 0});for(const[e,t]of[[-1.2,.3],[.4,-.2],[1.3,.5]])Ot(n,4,.2,3,e*10+7,e,t)}},"road-sign":{desc:"a fallen road sign, blank but for an abstract arrow",build(n){Ze(n,[-.9,.05,.2],[.6,.1,-.1],1,.03),n.box([.9,.12,-.15],[.62,.05,.46],f.HAT1,{group:2,dir:[1,.25,-.2],round:.02,paint:e=>{const t=e[0]-.9,i=e[2]+.15;return Math.abs(i)<.08&&t>-.36&&t<.2||t>.08&&Math.abs(i)<.28-(t-.08)*.9&&t<.38?f.BELLY:Math.hypot(Math.abs(t)-.56,Math.abs(i)-.4)<.04?f.FRAME:Dt(.2,.1)(e)}}),Ot(n,8,1.2,4,7)}},"phone-box":{desc:"an overgrown phone box, its panes long gone",build(n){n.box([0,1,0],[.42,1,.42],f.ACCENT,{round:.04,group:1,paint:e=>Math.max(Math.abs(e[0]),Math.abs(e[2]))>.38&&e[1]>.5&&e[1]<1.75&&e[1]*5%1>.12&&(Math.abs(e[0])+Math.abs(e[2]))*5%1>.12?f.SHADES:Dt(.3,.15)(e)}),n.box([0,2.08,0],[.46,.09,.46],f.ACCENT,{round:.06,group:2,paint:Dt(.3,.3)}),zn(n,[.43,0,.3],[.4,1.9,.43],3,8),zn(n,[-.3,0,.43],[-.1,1.4,.43],4,9),Ot(n,10,.9,5,8)}},lamppost:{desc:"a lamppost bent over, its lamp hanging near the ground",build(n){n.chain([[0,0,0,.06],[0,1.4,0,.05],[.2,2.1,0,.045],[.8,2.2,0,.04],[1.2,1.7,0,.035]],f.FRAME,{group:1,paint:Dt(.4,.05)}),n.box([1.25,1.55,0],[.16,.1,.12],f.FRAME,{round:.04,group:2}),n.ell([1.25,1.45,0],[.12,.06,.1],f.SHADES,{group:2}),zn(n,[0,0,.06],[.05,1.5,.06],3,10),Ot(n,6,.7,4,9)}},sofa:{desc:"a sofa left in a clearing, moss on its cushions",build(n){const e=t=>vt(t,6,5)<.25&&t[1]>.4?f.MOSS:vt(t,14)>.9?f.STONED:void 0;n.box([0,.3,0],[.9,.2,.4],f.CLOTH,{round:.1,group:1,paint:e}),n.box([-.02,.7,-.32],[.9,.3,.12],f.CLOTH,{round:.1,group:2,paint:e});for(const t of[-.85,.85])n.box([t,.55,0],[.12,.22,.42],f.CLOTH,{round:.1,group:3,paint:e});for(const t of[-.4,.4])n.box([t,.53,.05],[.42,.08,.34],f.CLOTH,{round:.08,group:4,paint:e});Ot(n,14,1.6,5,10)}},"washing-machine":{desc:"a washing machine in the undergrowth, a fern in its drum",build(n){n.box([0,.42,0],[.32,.42,.32],f.BELLY,{round:.05,group:1,paint:e=>e[2]>.28&&Math.hypot(e[0],e[1]-.4)<.2?Math.hypot(e[0],e[1]-.4)<.15?f.SHADES:f.FRAME:Dt(.25,.15)(e)}),Vs(n,[0,.4,.4],2,.55),Ot(n,8,.8,3,11)}},"bike-roots":{desc:"a bicycle tangled in tree roots",build(n){for(const e of[-.45,.45])for(let t=0;t<12;t++){const i=t/12*6.283,r=(t+1)/12*6.283;Ze(n,[e+Math.cos(i)*.3,.32+Math.sin(i)*.3,0],[e+Math.cos(r)*.3,.32+Math.sin(r)*.3,0],1+(e>0?1:0),.018)}for(const[e,t]of[[[-.45,.32,0],[0,.35,0]],[[0,.35,0],[.3,.7,0]],[[-.45,.32,0],[-.15,.72,0]],[[-.15,.72,0],[.3,.7,0]],[[.3,.7,0],[.45,.32,0]],[[0,.35,0],[-.15,.72,0]],[[.3,.7,0],[.35,.85,0]]])Ze(n,e,t,3,.022);n.box([-.17,.76,0],[.1,.03,.04],f.SHADES,{group:4}),Ze(n,[.25,.85,-.15],[.42,.87,.15],4,.018);for(let e=0;e<4;e++)n.chain([[-1+e*.2,0,-.4,.09],[-.3+e*.3,.35+e%2*.2,-.05+e*.05,.07],[.4+e*.2,.1,.3,.05]],f.TRUNK,{group:5+e%2,rough:.01})}},"dish-birdbath":{desc:"a satellite dish fallen face-up, full of rainwater, a bird drinking",build(n){n.ell([0,.2,0],[.6,.22,.6],f.BELLY,{group:1,paint:Dt(.25,.2)}),n.ell([0,.34,0],[.52,.12,.52],f.BELLY,{group:1,cut:!0}),n.ell([0,.28,0],[.48,.02,.48],f.WATER,{group:2}),Ze(n,[0,.25,-.5],[.1,.8,-.6],3,.03);const e=[.5,.45,.3];n.ell(e,[.12,.07,.06],f.BODY3,{group:4,dir:[1,.3,0]}),n.ell(R.add(e,[.1,.07,0]),[.05,.05,.045],f.BODY3,{group:4}),n.seg(R.add(e,[.14,.07,0]),R.add(e,[.2,.04,0]),.012,.004,f.ACCENT,{group:4}),Ot(n,8,1,5,12)}},"fridge-fireflies":{desc:"a fridge standing in the woods, its door ajar, fireflies inside",glow:!0,build(n){n.box([0,.85,0],[.36,.85,.32],f.BELLY,{round:.05,group:1,paint:e=>e[2]>.28&&Math.abs(e[0])<.3&&e[1]<1.55&&e[1]>.1?f.SHADES:Dt(.25,.2)(e)}),n.box([.5,.85,.4],[.03,.78,.3],f.BELLY,{dir:[.5,0,1],round:.03,group:2,paint:Dt(.25,.15)});for(let e=0;e<7;e++)Dr(n,[(zt(e)-.5)*.4,.4+zt(e,2)*1,.2+zt(e,3)*.3],.03,10+e,e%2?f.MAGIC:f.MAGIC2);zn(n,[-.36,0,.3],[-.3,1.6,.33],3,13)}}};function vh(n,e){const t=[[-.35,.45,-.25],[.35,.45,-.25],[.35,.45,.25],[-.35,.45,.25],[-.3,.9,-.28],[.4,.9,-.28],[.4,.9,.28],[-.3,.9,.28]];for(const[i,r]of[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]])Ze(n,t[i],t[r],e,.015);for(let i=1;i<6;i++){const r=i/6;Ze(n,R.lerp(t[0],t[1],r),R.lerp(t[4],t[5],r),e,.008),Ze(n,R.lerp(t[3],t[2],r),R.lerp(t[7],t[6],r),e,.008)}Ze(n,t[4],[-.45,.95,-.28],e,.015),Ze(n,t[7],[-.45,.95,.28],e,.015),Ze(n,[-.45,.95,-.28],[-.45,.95,.28],e,.025,f.ACCENT);for(const[i,r]of[[-.3,-.22],[.3,-.22],[-.3,.22],[.3,.22]])Ze(n,[i,.45,r],[i,.08,r],e,.012),n.ell([i,.06,r],[.05,.05,.02],f.BODY3,{group:e+1})}function Zr(n,e,t,i=!1){n.box(R.add(e,[0,.03,0]),[.24,.03,.24],f.ACCENT,{round:.02,group:t,paint:Dt(.15,.2)}),n.seg(R.add(e,[0,.05,0]),R.add(e,[0,.72,0]),.2,.03,f.ACCENT,{group:t+1,paint:r=>Math.abs(r[1]-e[1]-.42)<.07?i?f.MAGIC2:f.CLOTH:i&&vt(r,18)<.2?f.GLOW:Dt(.15,.1)(r)}),i&&Dr(n,R.add(e,[0,.78,0]),.05,t+2,f.MAGIC2)}const g_={swings:{desc:"a rusty swing set, one swing hanging, one chain broken; the hanging one sways on its own with a faint sparkle",glow:!0,split:1.6,build(n){for(const e of[-1.1,1.1])for(const t of[-.5,.5])Ze(n,[e,0,t],[e*.95,2.1,0],1,.045);Ze(n,[-1.1,2.1,0],[1.1,2.1,0],2,.05);for(const e of[-.12,.12])Ze(n,[-.5,2.08,e],[-.42,.55,e*1.2],3,.012);n.box([-.42,.52,0],[.2,.025,.14],f.BODY3,{round:.02,group:3,dir:[1,-.15,0]});for(let e=0;e<5;e++)Dr(n,[-.42+(zt(e)-.5)*.5,.6+zt(e,2)*.7,(zt(e,3)-.5)*.3],.025,10+e);Ze(n,[.5,2.08,-.12],[.5,1.3,-.12],4,.012),Ze(n,[.5,2.08,.12],[.58,.9,.2],4,.012),n.box([.7,.04,.3],[.2,.025,.14],f.BODY3,{round:.02,group:5,dir:[1,0,.5]}),zn(n,[1.1,0,.5],[1.05,1.6,.25],6,14),Ot(n,14,1.8,7,15)}},slide:{desc:"a slide half-swallowed by brambles, a sapling at its foot",split:1.6,build(n){for(const e of[-.95,-.55])for(const t of[-.3,.3])Ze(n,[e,0,t],[e,1.5,t],1,.035);for(let e=1;e<6;e++)Ze(n,[-.95,e*.27,-.3],[-.95,e*.27,.3],1,.02);n.box([-.75,1.5,0],[.25,.04,.32],f.FRAME,{group:2,paint:Dt(.4,.1)}),n.box([.35,.78,0],[.95,.03,.26],f.HAT1,{dir:[1,-.75,0],round:.02,group:3,paint:e=>Math.abs(e[2])>.22?f.FRAME:Dt(.35,.15)(e)});for(let e=0;e<10;e++){const t=zt(e,3)*6.283;n.chain([[.4+Math.cos(t)*.9,0,Math.sin(t)*.6,.03],[.3+Math.cos(t)*.4,.5+zt(e)*.5,Math.sin(t)*.3,.025],[.1+zt(e,4)*.6,.7+zt(e,5)*.4,(zt(e,6)-.5)*.4,.015]],f.BARKD,{group:5+e%2}),e%3===0&&n.ell([.3+zt(e,7)*.6,.5+zt(e,8)*.4,(zt(e,9)-.5)*.5],[.2,.14,.16],f.LEAF,{group:7,rough:.03,paint:i=>vt(i,30)<.1?f.ACCENT:void 0})}n.seg([1.45,0,.2],[1.45,1.2,.2],.03,.02,f.TRUNK,{group:8}),xa(n,[1.45,1.3,.2],[.25,.2,.22],9)}},roundabout:{desc:"a roundabout tilted in the moss",build(n){const e=n.parts.length;n.ell([0,.2,0],[.9,.05,.9],f.HAT2,{group:1,paint:t=>Math.abs(Math.sin(Math.atan2(t[2],t[0])*3))<.08?f.FRAME:Dt(.35,.2)(t)});for(let t=0;t<3;t++){const i=t/3*6.283;Ze(n,[Math.cos(i)*.7,.25,Math.sin(i)*.7],[Math.cos(i)*.7,.6,Math.sin(i)*.7],2,.025),Ze(n,[Math.cos(i)*.7,.6,Math.sin(i)*.7],[Math.cos(i)*.1,.6,Math.sin(i)*.1],2,.02)}Kn(n,e,{pitch:.18,roll:.1,at:[0,.05,0]}),n.ell([0,.05,0],[1.1,.08,1],f.MOSS,{group:4}),Ot(n,10,1.3,5,16)}},seesaw:{desc:"a seesaw stuck at an angle",build(n){n.box([0,.2,0],[.08,.2,.14],f.FRAME,{round:.02,group:1,paint:Dt(.4,.1)});const e=n.parts.length;n.box([0,0,0],[1.3,.035,.12],f.WOOD,{round:.02,group:2,paint:t=>vt(t,8)<.2?f.MOSS:void 0});for(const t of[-1.05,1.05])Ze(n,[t,.03,-.12],[t,.03,.12],3,.02);Kn(n,e,{pitch:.32,at:[0,.42,0]}),Ot(n,10,1.4,5,17)}},"climbing-frame":{desc:"a climbing frame, a dome of bars wound with ivy",split:1.4,build(n){const t=(i,r)=>{const s=i/8*6.283,a=r/4*Math.PI/2;return[Math.cos(s)*Math.cos(a)*1,Math.sin(a)*1*1.5,Math.sin(s)*Math.cos(a)*1]};for(let i=0;i<8;i++)for(let r=0;r<4;r++)Ze(n,t(i,r),t(i,r+1),1,.025),Ze(n,t(i,r),t(i+1,r),1,.025);for(let i=0;i<3;i++)zn(n,t(i*3,0),t(i*3+1,3),3+i,18+i);Ot(n,12,1.4,6,18)}},"spring-rider":{desc:"a spring rider animal, its paint faded (a generic animal, no characters)",build(n){for(let e=0;e<6;e++)n.seg([Math.cos(e*2)*.06,e*.07,Math.sin(e*2)*.06],[Math.cos(e*2+2)*.06,(e+1)*.07,Math.sin(e*2+2)*.06],.022,.022,f.FRAME,{group:1});n.ell([0,.55,0],[.35,.16,.14],f.BODY,{group:2,paint:Dt(.4,.2)}),n.ell([.32,.72,0],[.12,.11,.1],f.BODY,{group:2,paint:Dt(.4,.2)});for(const e of[-.05,.05])n.ell([.28,.85,e],[.03,.06,.02],f.BODY,{group:3});n.ell([.43,.74,.06],[.015,.015,.015],f.SHADES,{group:3}),Ze(n,[.25,.68,-.12],[.25,.68,.12],4,.015),n.box([0,.02,0],[.25,.02,.25],f.STONE,{group:5}),Ot(n,8,.8,6,19)}}};function x_(n,e,t,i,r,s=1){n.box([0,.015,0],[e,.015,t],i,{round:.01,group:s,paint:a=>vt(a,3,4)<.05||Math.abs(Math.sin(a[0]*1.3+1)*.5+Math.sin(a[0]*4.1)*.08-a[2]*.3)<.012?vt(a,18)<.5?f.LEAF2:f.STONED:r(a[0],a[2])?vt(a,10,2)<.25?i:f.CLOTH:vt(a,5,7)<.07?f.MOSS:void 0})}const Un=(n,e,t=.045)=>Math.abs(n-e)<t,v_={"tennis-court":{desc:"a cracked tennis court, faded lines, grass through the cracks",decal:!0,build(n){x_(n,4.4+.5,2+.5,f.HAT2,(i,r)=>Math.abs(i)<=4.4+.05&&Math.abs(r)<=2+.05&&(Un(Math.abs(i),4.4)||Un(Math.abs(r),2)||Un(Math.abs(r),2*.75)||Math.abs(i)<4.4*.54&&(Un(r,0)||Un(Math.abs(i),4.4*.54))))}},"tennis-net":{desc:"a sagging tennis net between its posts",build(n){for(const e of[-2.2,2.2])Ze(n,[0,0,e],[0,.55,e],1,.035);n.box([0,.38,0],[.01,.17,2.15],f.CLOTH,{group:2,paint:e=>e[1]>.5?f.CLOTH:e[1]*25%1<.25||(e[2]+5)*25%1<.25?f.SHADES:void 0}),n.box([0,.25,0],[.012,.15,1],f.SHADES,{group:2,cut:!0})}},"umpire-chair":{desc:"a tennis umpire's chair leaning over",split:1.4,build(n){const e=n.parts.length;for(const t of[-.25,.25])for(const i of[-.2,.2])Ze(n,[t*1.4,0,i*1.4],[t,1.5,i],1,.03);for(let t=1;t<5;t++)Ze(n,[-.3,t*.3,-.22],[-.3,t*.3,.22],1,.02);n.box([0,1.55,0],[.28,.04,.25],f.WOOD,{group:2}),n.box([-.26,1.8,0],[.03,.25,.25],f.WOOD,{group:2}),Kn(n,e,{roll:.25,pitch:-.1}),Ot(n,8,1,4,20)}},"court-fence":{desc:"a chain-link fence section, ivy through it, a gap torn in it",build(n){for(const e of[-1.5,0,1.5])Ze(n,[e,0,0],[e,1.7,0],1,.03);Ze(n,[-1.5,1.7,0],[1.5,1.7,0],1,.025),n.box([0,.85,0],[1.5,.85,.008],f.FRAME,{group:2,paint:e=>(e[0]+e[1]+9)*9%1<.2||(e[0]-e[1]+9)*9%1<.2?vt(e,5)<.15?f.BODY2:f.FRAME:f.SHADES}),n.ell([.7,.5,0],[.4,.5,.05],f.SHADES,{group:2,cut:!0,rough:.08});for(let e=0;e<3;e++)zn(n,[-1.3+e*.6,0,.03],[-1.1+e*.5,1.5,.03],3+e,21+e)}},"tennis-balls":{desc:"a few old tennis balls glowing faintly in the grass",glow:!0,build(n){for(let e=0;e<4;e++)Dr(n,[(zt(e)-.5)*1.2,.06,(zt(e,2)-.5)*.8],.06,1+e,e%2?f.MAGIC:f.MAGIC2);n.ell([0,.004,0],[.8,.004,.5],f.LEAF3,{group:9}),Ot(n,8,.8,5,22)}},"baseball-diamond":{desc:"a baseball diamond: the worn dirt infield, grown-over bases, a pitcher's mound",decal:!0,build(n){n.box([0,.015,0],[2.2*1.6,.015,2.2*1.2],f.LEAF2,{group:1,round:.01,paint:t=>{const i=Math.abs(t[0])/2.2+Math.abs(t[2])/1.6500000000000001;return i<1.08&&i>.78?vt(t,8)<.2?f.LEAF2:f.BARK2:i<=.78?vt(t,6)<.15?f.MOSS:void 0:vt(t,6,3)<.3?f.LEAF:void 0}});for(const[t,i]of[[2.2,0],[0,2.2*.75],[-2.2,0],[0,-2.2*.75]])n.box([t*.93,.04,i*.93],[.12,.02,.1],f.BELLY,{group:2,round:.02,paint:r=>vt(r,20)<.3?f.LEAF2:void 0});n.ell([0,.02,0],[.35,.08,.28],f.BARK2,{group:3})}},backstop:{desc:"a baseball backstop fence, a dugout bench beside it",build(n){for(let e=0;e<=4;e++){const t=-.8+e*.4;Ze(n,[-Math.cos(t)*.8,0,Math.sin(t)*1.4],[-Math.cos(t)*.8,1.8,Math.sin(t)*1.4],1,.03)}for(let e=0;e<4;e++){const t=-.8+e*.4,i=t+.4,r=[-Math.cos(t)*.8,.9,Math.sin(t)*1.4],s=[-Math.cos(i)*.8,.9,Math.sin(i)*1.4],a=R.lerp(r,s,.5);n.box(a,[Math.hypot(s[0]-r[0],s[2]-r[2])/2,.9,.008],f.FRAME,{dir:R.sub(s,r),group:2,paint:o=>(o[1]+o[0]*2+9)*9%1<.2?vt(o,5)<.2?f.BODY2:f.FRAME:f.SHADES})}n.box([-.6,.3,2],[.15,.04,.7],f.WOOD,{group:3});for(const e of[1.4,2.6])n.box([-.6,.14,e],[.12,.14,.04],f.WOOD,{group:3});zn(n,[-.75,0,-.5],[-.7,1.6,-.4],4,25)}},scoreboard:{desc:"a scoreboard frame, panels missing (no text)",split:1.8,build(n){for(const e of[-1,1])Ze(n,[e,0,0],[e,2.6,0],1,.05);for(let e=0;e<3;e++)for(let t=0;t<5;t++)zt(e,t)>.3&&n.box([-.8+t*.4,1.6+e*.32,0],[.18,.14,.03],f.HAT1,{group:2+e,round:.01,paint:Dt(.3,.1)});n.box([0,2.62,0],[1.1,.05,.06],f.FRAME,{group:5}),zn(n,[-1,0,.06],[-.95,2.3,.06],6,26)}},"football-pitch":{desc:"a football pitch: faded lines, a centre circle, mown stripes long grown out",decal:!0,build(n){n.box([0,.015,0],[5.2+.5,.015,3.3+.5],f.LEAF2,{group:1,round:.01,paint:i=>{const r=i[0],s=i[2];return Math.abs(r)<=5.2+.05&&Math.abs(s)<=3.3+.05&&(Un(Math.abs(r),5.2,.06)||Un(Math.abs(s),3.3,.06)||Un(r,0,.06)||Un(Math.hypot(r,s*1),1,.06)||Math.abs(r)>5.2-1&&Math.abs(s)<1.6&&(Un(Math.abs(r),5.2-1,.06)||Un(Math.abs(s),1.6,.06)))?vt(i,8,2)<.3?f.LEAF2:f.CLOTH:Math.floor((r+20)*.8)%2?vt(i,6)<.25?f.LEAF2:f.LEAF:vt(i,5,9)<.1?f.LEAF3:void 0}})}},goal:{desc:"a football goal, its net torn, a sapling grown through it",split:1.1,build(n){_h(n,1),n.seg([.3,0,.2],[.3,1.5,.2],.035,.025,f.TRUNK,{group:5}),xa(n,[.3,1.6,.2],[.35,.25,.3],6),Ot(n,8,1.2,7,27)}},"goal-tipped":{desc:"a football goal tipped on its back",build(n){const e=n.parts.length;_h(n,1),Kn(n,e,{pitch:-Math.PI/2+.12,at:[-.5,.06,0]}),Ot(n,8,1.2,7,28)}},"corner-flag":{desc:"a corner flag, its flag a faded rag",build(n){Ze(n,[0,0,0],[0,.9,0],1,.015),n.box([.12,.8,0],[.12,.08,.006],f.ACCENT,{group:2,dir:[1,-.3,.1],paint:Dt(.2,0)}),Ot(n,5,.4,3,29)}},floodlight:{desc:"a floodlight pylon, one lamp still flickering with fairy light",glow:!0,split:2.4,build(n){for(const[t,i]of[[-.25,-.25],[.25,-.25],[.25,.25],[-.25,.25]])Ze(n,[t*1.6,0,i*1.6],[t*.5,4,i*.5],1,.035);for(let t=1;t<8;t++){const i=t*4/8,r=1.6-1.1*i/4;Ze(n,[-.25*r,i,-.25*r],[.25*r,i+4/8,.25*r],2,.015),Ze(n,[.25*r,i,-.25*r],[-.25*r,i+4/8,.25*r],2,.015)}for(let t=0;t<2;t++)for(let i=0;i<3;i++)n.box([-.3+i*.3,4+.2+t*.25,.1],[.12,.1,.06],f.FRAME,{group:3,round:.02,paint:r=>r[2]>.14?t===1&&i===1?f.MAGIC2:f.SHADES:Dt(.4,.1)(r)});Dr(n,[0,4+.45,.22],.06,4,f.MAGIC2),zn(n,[-.4,0,.4],[-.2,2.4,.2],5,30)}},"basketball-hoop":{desc:"a basketball hoop on a leaning post, its net gone",split:1.8,build(n){const e=n.parts.length;Ze(n,[0,0,0],[0,2.4,0],1,.05),n.box([.15,2.5,0],[.03,.3,.45],f.BELLY,{group:2,paint:t=>Math.abs(t[1]-2.4)<.1&&Math.abs(t[2])<.14&&Math.abs(Math.abs(t[2])-.12)<.02?f.ACCENT:Dt(.25,.1)(t)});for(let t=0;t<8;t++){const i=t/8*6.283,r=(t+1)/8*6.283;Ze(n,[.36+Math.cos(i)*.17,2.32,Math.sin(i)*.17],[.36+Math.cos(r)*.17,2.32,Math.sin(r)*.17],3,.012,f.ACCENT)}Kn(n,e,{pitch:-.2}),Ot(n,8,1,5,31)}}};function _h(n,e){for(const t of[-1.4,1.4])Ze(n,[0,0,t],[0,1,t],e,.035,f.BELLY);Ze(n,[0,1,-1.4],[0,1,1.4],e,.035,f.BELLY);for(const t of[-1.4,1.4])Ze(n,[0,1,t],[-.6,0,t],e+1,.02,f.BELLY);n.box([-.3,.5,0],[.012,.55,1.38],f.CLOTH,{dir:[.6,1,0],group:e+2,paint:t=>t[1]*12%1<.3||(t[2]+5)*12%1<.3?f.CLOTH:f.SHADES}),n.ell([-.3,.4,.5],[.2,.3,.4],f.CLOTH,{group:e+2,cut:!0})}const __=[...Object.entries(m_).map(([n,e])=>({id:n,family:"modern",size:1,split:null,...e})),...Object.entries(g_).map(([n,e])=>({id:n,family:"playground",size:1.1,split:null,...e})),...Object.entries(v_).map(([n,e])=>({id:n,family:"sports",size:1.1,split:null,...e}))];Object.fromEntries(__.map(n=>[n.id,n]));const va=[{id:"stack",crystal:"cyan",tiers:[["bass",4,[.24,.25,.28]],["mid",2,[.46,.15,.25]],["horn",4,[.21,.22,.23]],["tweet",2,[.21,.08,.17]]]},{id:"wall",crystal:"violet",tiers:[["bass",3,[.31,.3,.3]],["mid",2,[.44,.16,.26]],["horn",2,[.3,.25,.24]],["tweet",1,[.26,.09,.18]]]},{id:"tower",crystal:"amber",tiers:[["bass",2,[.28,.27,.29]],["bass",2,[.25,.24,.27]],["horn",2,[.25,.23,.23]],["tweet",3,[.15,.07,.15]]]}],M_={cyan:[[60,220,255],[210,250,255],[150,205,225]],violet:[[175,95,255],[240,215,255],[180,160,225]],amber:[[255,170,50],[255,238,200],[225,190,140]]};function S_(n=0){const[e,t,i]=M_[va[n%va.length].crystal];return{[f.STONE]:[78,80,94],[f.STONED]:[36,36,48],[f.MOSS]:[72,108,58],[f.CRYSTAL]:i,[f.RUNE]:e,[f.GLOW]:e,[f.MAGIC2]:t,[f.WOOD]:[150,96,52],[f.LINE]:[24,24,34]}}function Mh(n,e,t,i){const r=va[n%va.length],s=new Xe({blend:.02}),a=t==="damaged",o=a?0:[0,.5,1][e%3],c=b=>a&&Lt(b,e,31)<.5;let l=0,h=1,d=.3,u=0,p=n*7;const g=(b,A,P,C)=>N=>{if(C&&Math.abs(Math.sin(N[0]*37+N[1]*23+Math.sin(N[2]*17)*2))<.07)return f.STONED;if(N[1]>b-.02&&(N[2]>A-.06||Lt(Math.floor(N[0]*30),Math.floor(N[2]*30),P)<.2)&&Lt(Math.floor(N[0]*40),Math.floor(N[2]*40),P+1)<.6)return f.MOSS},v=(b,A,P,C,N,U)=>{const D=c(U),F=1+o*.08;s.ell([b,A,P],[C*1.18,C*1.18,.06],f.STONED,{group:N,cut:!0}),s.ell([b,A,P-.02],[C*F,C*F,.035+o*.025],f.CRYSTAL,{group:900+U,paint:z=>{const X=Math.hypot(z[0]-b,z[1]-A)/(C*F);return D?X<.3?f.GLOW:f.CRYSTAL:X<.2+o*.15?f.MAGIC2:X<.5?f.GLOW:X<.78?f.CRYSTAL:f.GLOW}})},x=(b,A,P,C,N,U,D,F)=>z=>{if(z[0]>b+C-.022){const X=Math.min(P,N)*1.5,Q=(U-N-z[2])/X+.5,Y=(A-z[1])/X+.5;if(Q>=0&&Q<=1&&Y>=0&&Y<=1&&(i?hf(i,Q,Y,.065):Ch(Q,Y,D,.12)))return a&&Lt(D,e,5)<.5?f.STONED:f.RUNE}return F(z)},m=r.tiers,_=m[0][1]*m[0][2][0]+.02,M=.08,S=m[0][2][2];s.box([0,M,d-S],[_,M,S],f.STONE,{group:h,round:.03,rough:.006,paint:g(M*2,d,3,a)}),s.box([0,M*.9,d],[_-.06,M*.45,.12],f.STONED,{group:h,cut:!0,paint:b=>b[2]<d-.07?f.GLOW:void 0});for(let b=1;b<m[0][1];b++)s.box([-_+b*_*2/m[0][1],M*.9,d-.06],[.015,M*.45,.06],f.STONE,{group:h});l=M*2,h++;const w=[];m.forEach(([b,A,[P,C,N]],U)=>{const D=b==="tweet"?.09:0,F=A*P*2+(A-1)*(b==="tweet"?.14:.01),z=d-U*.035,X=l+D+C;for(let Q=0;Q<A;Q++){const Y=-F/2+P+Q*(P*2+(b==="tweet"?.14:.01));if(a&&b==="horn"&&Q===A-1){w.push([Y,P,C,N]);continue}const te=a&&b==="tweet"?[1,.12*(Q%2?1:-1),0]:void 0,O=a&&b==="tweet"?X-.04:X,ne=g(O+C,z-N+N,h,a),ce=Q===A-1-(a&&b==="horn"?1:0)&&b!=="tweet";if(s.box([Y,O,z-N],[P-.005,C,N],f.STONE,{group:h,round:.035,rough:.004,dir:te,paint:ce?x(Y,O,C,P-.005,N,z,p++,ne):ne}),b==="bass"&&v(Y,X+.02,z,Math.min(P,C)*.72,h,u++),b==="mid"&&(s.ell([Y,X,z],[P*.8,C*.7,N*.9],f.STONED,{group:h,cut:!0,paint:be=>be[2]<z-N*.45?c(u)?f.STONED:f.GLOW:void 0}),s.box([Y,X,z-N*.5],[.018,C*.6,N*.45],f.STONE,{group:h}),u++),b==="horn"){const be=X+C*.25;s.seg([Y,be,z-N*1.5],[Y,be,z+.03],.03,Math.min(P,C)*.78,f.STONED,{group:h,cut:!0,paint:Ue=>Ue[2]<z-N*.55?c(u)?f.STONED:f.GLOW:void 0}),v(Y,X-C*.6,z,C*.22,h,u++)}if(b==="tweet")for(const be of[-.5,0,.5])v(Y+be*P*1.15,O,z,C*.55,h,u++);h++}if(b!=="tweet"){const Q=a&&b==="horn"?P:0;s.box([-Q,l+C*2+.012,z-.015],[F/2+.01-Q,.012,.015],f.WOOD,{group:h++,round:.008}),l+=.024}b==="tweet"&&!a&&s.flat([0,l+D/2,z-N],[1,0,0],[0,1,0],F/2,D/2,(Q,Y)=>Math.abs(Y)<.45&&Math.sin(Q*23)>-.4?f.GLOW:null,{group:h++,bend:0}),l+=C*2+D});const E=l;if([[-_-.04,.25,.34,-.3],[_+.02,.2,.3,.35],[-_+.15,.4,.22,-.1],[_-.2,.42,.18,.2],[.1,.45,.16,.15],[-_-.1,-.25,.26,-.4],[_+.08,-.2,.24,.45]].forEach(([b,A,P,C],N)=>{if(a&&N%2){s.seg([b,.03,A],[b+.12,.05,A+.04],.04,.02,f.CRYSTAL,{group:700+N});return}const U=[b+C*P,P,A+.05];s.seg([b,0,A],U,.045+P*.05,.006,f.CRYSTAL,{group:700+N,paint:D=>D[1]>P*(.65-o*.1)&&!a?f.GLOW:void 0}),s.seg([b+.04,0,A-.03],[b+.04+C*P*.5,P*.55,A],.03,.005,f.CRYSTAL,{group:720+N})}),!a)for(const[b,A,P,C]of[[-.55,.1,.1,.03],[.6,.16,0,.025],[.15,.24,-.1,.02]])s.ell([b,E+A-.1,P],[C,C*.8,C],f.STONE,{group:800+Math.round(b*100),extra:!0,rough:.004});for(const[b,A,P,C]of w)s.box([b+.45,A*.75,d+.25],[A,P,C],f.STONE,{group:h++,dir:[.6,.8,.2],round:.035,rough:.007,paint:g(1,0,9,!0)});return{m:s,top:E}}function b_(n){const e=new Xe({blend:.02}),t=(i,r)=>Lt(i,r,n*13+7);e.ell([.1,.1,.62],[.14,.12,.1],f.GLOW,{group:1,paint:i=>i[1]>.16?f.MAGIC2:void 0}),e.seg([.1,.1,.6],[.02,.5,.66],.07,.01,f.GLOW,{group:2,paint:i=>i[1]>.35?f.MAGIC2:f.CRYSTAL});for(let i=0;i<16;i++){const r=i*2.4,s=.15+t(i,1)*.75,a=Math.cos(r)*s,o=Math.sin(r)*s*.6,c=.09+t(i,2)*.1,l=Math.max(.05,(.8-s)*.45)+c*.5;e.box([a,l*.7,o],[c*1.3,c,c*1.1],f.STONE,{group:10+i,dir:[Math.cos(r*1.7),.4+t(i,3),Math.sin(r*2.3)],round:.03,rough:.008,paint:h=>Math.abs(Math.sin(h[0]*41+h[1]*29))<.08?f.STONED:h[1]>l*.7+c*.6&&t(i,4)<.25?f.MOSS:void 0})}for(let i=0;i<4;i++){const r=i*1.7+1,s=Math.cos(r)*.4,a=Math.sin(r)*.25;e.ell([s,.05,a],[.09,.08,.03],f.CRYSTAL,{group:50+i,dir:[Math.cos(r),.5,Math.sin(r)],paint:o=>t(i,5)<.3?f.GLOW:void 0})}for(let i=0;i<4;i++){const r=-.7+i*.45;e.seg([r,0,.4-i*.1],[r+.1,.08+t(i,6)*.1,.42-i*.1],.03,.01,f.CRYSTAL,{group:60+i})}return e}function Sh(n,e,t){let i=0;for(let r=0;r<2e3&&i<e;r++){const s=Math.floor(Lt(r,t,1)*n.w),a=Math.floor(Lt(r,t,2)*n.h*.7);n.get(s,a)||n.get(s+1,a)||n.get(s-1,a)||n.get(s,a+1)||n.get(s,a-1)||n.get(s,a+2)||(n.px(s,a,i%3?f.GLOW:f.MAGIC2),i++)}return n}const y_=n=>Ml(n)*3,Mo=new Map;function w_(n={},{variant:e=0,frame:t=0,state:i="playing",sigil:r}={}){const s=y_(n),a=e+":"+s;Mo.has(a)||Mo.set(a,Sn(Mh(e,0,"playing").m,{height:s}).s);const o=Mo.get(a);if(i==="destroyed")return Sh(Sn(b_(e),{scale:o}).sp,3,e*5+1);const{sp:c}=Sn(Mh(e,t,i,r).m,{scale:o});return Sh(c,i==="damaged"?4:10+t*2,e*5+t)}const E_=[{k:"ambientHue",g:"Night light",label:"Twilight hue",min:0,max:1,step:.01,v:.68,hue:!0},{k:"ambient",g:"Night light",label:"Twilight brightness",min:.05,max:.6,step:.01,v:.22},{k:"moon",g:"Night light",label:"Moonlight",min:0,max:1,step:.01,v:.3},{k:"moonHue",g:"Night light",label:"Moon hue",min:0,max:1,step:.01,v:.58,hue:!0},{k:"glowHue",g:"Night light",label:"Witch glow hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"glowSat",g:"Night light",label:"Witch glow colour",min:0,max:1,step:.01,v:.35},{k:"glowRadius",g:"Night light",label:"Witch glow reach",min:30,max:200,step:5,v:110},{k:"glowPower",g:"Night light",label:"Witch glow strength",min:.3,max:2.5,step:.05,v:1.4},{k:"bands",g:"Shading",label:"Light steps",min:2,max:7,step:1,v:3},{k:"dither",g:"Shading",label:"Dithering",min:0,max:1,step:.05,v:.35},{k:"round",g:"Shading",label:"Roundness",min:.2,max:1.5,step:.05,v:.9},{k:"outline",g:"Shading",label:"Plant outline",options:["none","dark","tinted"],v:"none"},{k:"cOutline",g:"Shading",label:"Creature outline",options:["dark","tinted","none"],v:"dark"},{k:"shafts",g:"Night light",label:"Moonbeams",min:0,max:1,step:.05,v:.3},{k:"areaContrast",g:"Colour",label:"Difference between areas",min:0,max:1,step:.05,v:.6},{k:"sat",g:"Colour",label:"Saturation",min:.2,max:1.3,step:.01,v:.9},{k:"leafHue",g:"Colour",label:"Leaf hue",min:0,max:1,step:.01,v:.3,hue:!0},{k:"leafVariety",g:"Colour",label:"Leaf colour variety",min:0,max:1,step:.05,v:.3},{k:"trunkHue",g:"Colour",label:"Bark hue",min:0,max:1,step:.01,v:.07,hue:!0},{k:"groundHue",g:"Colour",label:"Ground hue",min:0,max:1,step:.01,v:.27,hue:!0},{k:"groundVal",g:"Colour",label:"Ground brightness",min:.15,max:.7,step:.01,v:.4},{k:"pixel",g:"Shading",label:"Pixel size",min:1,max:5,step:1,v:3},{k:"treeSize",g:"Trees",label:"Tree height",min:.5,max:1.5,step:.05,v:.85},{k:"crownWidth",g:"Trees",label:"Crown width",min:1,max:4,step:.1,v:3},{k:"clearing",g:"Trees",label:"Clearing size",min:0,max:1,step:.05,v:.55},{k:"depth",g:"Map",label:"Border detail (fractal layers)",min:0,max:6,step:1,v:4},{k:"areaScale",g:"Map",label:"Area size (screens)",min:.6,max:2,step:.05,v:1},{k:"areaTypes",g:"Map",label:"Area types",min:4,max:30,step:1,v:30},{k:"density",g:"Trees",label:"Foliage density",min:.2,max:1,step:.05,v:.55},{k:"clump",g:"Trees",label:"Clumpiness",min:0,max:1,step:.05,v:.6},{k:"gnarl",g:"Trees",label:"Gnarliness",min:0,max:1,step:.05,v:.5},{k:"roots",g:"Trees",label:"Roots",min:0,max:1,step:.05,v:.6},{k:"bark",g:"Trees",label:"Bark texture",min:0,max:1,step:.05,v:.6},{k:"trees",g:"Trees",label:"Tree density",min:.2,max:2,step:.05,v:1},{k:"wBroad",g:"Tree mix",label:"Gnarled broadleaf",min:0,max:1,step:.05,v:.8},{k:"wFir",g:"Tree mix",label:"Fir",min:0,max:1,step:.05,v:.6},{k:"wWillow",g:"Tree mix",label:"Willow",min:0,max:1,step:.05,v:.5},{k:"wBirch",g:"Tree mix",label:"Birch",min:0,max:1,step:.05,v:.5},{k:"wPalm",g:"Tree mix",label:"Tree fern",min:0,max:1,step:.05,v:.3},{k:"wFlat",g:"Tree mix",label:"Flat-crowned",min:0,max:1,step:.05,v:.5},{k:"bushes",g:"Undergrowth",label:"Bushes and shrubs",min:0,max:120,step:1,v:55},{k:"bushSize",g:"Undergrowth",label:"Bush size",min:.5,max:1.8,step:.05,v:1},{k:"flowers",g:"Undergrowth",label:"Flowers",min:0,max:1,step:.05,v:.3},{k:"cSat",g:"Creatures",label:"Creature saturation",min:.1,max:1,step:.01,v:.6},{k:"cVal",g:"Creatures",label:"Creature brightness",min:.4,max:1,step:.01,v:.85},{k:"head",g:"Creatures",label:"Baby head size",min:.3,max:.6,step:.01,v:.44},{k:"eye",g:"Creatures",label:"Eye size",min:.5,max:2,step:.05,v:1},{k:"legs",g:"Creatures",label:"Leg length",min:.5,max:1.8,step:.05,v:1},{k:"long",g:"Creatures",label:"Body length",min:.7,max:1.5,step:.05,v:1},{k:"size",g:"Creatures",label:"Baby size (px)",min:5,max:14,step:1,v:8},{k:"growth",g:"Creatures",label:"Legend vs baby height",min:5,max:25,step:1,v:20},{k:"magicHue",g:"Creatures",label:"Magic glow hue",min:0,max:1,step:.01,v:.5,hue:!0},{k:"fur",g:"Creatures",label:"Stripes and spots",min:0,max:1,step:.05,v:.5},{k:"cloakHue",g:"Witch",label:"Jacket hue",min:0,max:1,step:.01,v:.72,hue:!0},{k:"hairHue",g:"Witch",label:"Hair hue",min:0,max:1,step:.01,v:.01,hue:!0},{k:"hatHue",g:"Witch",label:"Hat hue",min:0,max:1,step:.01,v:.74,hue:!0},{k:"topHue",g:"Witch",label:"Top hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"jeansHue",g:"Witch",label:"Jeans hue",min:0,max:1,step:.01,v:.6,hue:!0},{k:"shoeHue",g:"Witch",label:"Sneakers hue",min:0,max:1,step:.01,v:0,hue:!0},{k:"phonesHue",g:"Witch",label:"Headphones hue",min:0,max:1,step:.01,v:.92,hue:!0}];function A_(){const n={};return E_.forEach(e=>n[e.k]=e.v),n}const T_={broad:Gh,fir:Tl,willow:Hh,birch:Wh,flat:Vh};function R_(n,e,t,i,r){const s=T_[e.type],a={...t,leafHue:n.leaf+(e.dark?.05:0),gnarl:e.gnarl??t.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},o=s(i,a,t.treeSize*r*(e.scale||1)*ye(i,.9,1.1)),c=Rl(i,a,s);return e.dark&&(c[f.LEAF]=c[f.LEAF3],c[f.LEAF3]=ge(n.leaf+.05,.7,.22)),c[f.NOSE]=[20,16,24],c[f.GLINT]=[235,235,240],{parts:df(o),colours:c}}function C_(n,e,t,i,r){const s=yn[t].id,a=ls.find(p=>p.id===s),o=_f(s,n,{K:i,makeCanvas:r}),c=[],l=p=>c.push(p)-1,h={big:[],small:[],walls:[],set:null},d=(p,g)=>wi(p,g,n,"none",r),u=(p,g)=>{const{parts:v,colours:x}=R_(a,p,n,Ai(e*13+t*101+g*7+1),i);return{bot:l(d(v.bot,x)),top:l(d(v.top,x))}};a.big.forEach(([p,g],v)=>{if(p!=="tree"){h.big.push({bot:l(o.big[v].sp),top:null});return}const x=Math.max(1,Math.round(Kh/a.big.length));for(let m=0;m<x;m++)h.big.push(u(g,v*17+m))}),a.small.forEach(([p,g],v)=>h.small.push(p==="tree"?u(g,500+v):{bot:l(o.small[v].sp),top:null}));for(const p of o.walls)h.walls.push(l(p.sp));return o.setPiece&&(h.set=a.set?.[0]==="tree"?u(a.set[1],900):{bot:l(o.setPiece.sp),top:null}),{sprites:c,layout:h,floor:o.floor.sp}}function bh(n,e,t,i=null){const r=[];for(const s of["towards","away"])for(let a=0;a<4;a++)for(let o=0;o<2;o++)r.push(wi(Zd(e,a,o,n,s,i),Kd(e,n,i),n,n.cOutline,t));return r}const L_=(n,e,t=!1)=>(t?8:0)+n*2+e;function _a(n,e,t){return n.getContext("2d").getImageData(0,0,e,t).data}function ra(n,e=2048){const i=[];let r=0,s=0,a=0,o=1;for(const u of n)r+u.w+1>e&&(r=0,s+=a+1,a=0),i.push({x:r,y:s}),r+=u.w+1,a=Math.max(a,u.h),o=Math.max(o,r);const c=Math.max(1,s+a),l=new Uint8Array(o*c*4),h=new Uint8Array(o*c*4),d=n.map((u,p)=>{const g=i[p],v=_a(u.A,u.w,u.h),x=_a(u.N,u.w,u.h);for(let m=0;m<u.h;m++){const _=m*u.w*4,M=((g.y+m)*o+g.x)*4;l.set(v.subarray(_,_+u.w*4),M),h.set(x.subarray(_,_+u.w*4),M)}return{uv:[g.x/o,g.y/c,(g.x+u.w)/o,(g.y+u.h)/c],w:u.w,h:u.h}});return{albedo:l,normal:h,width:o,height:c,frames:d}}function P_(n,e){if(n.kind==="creature")return{px:ra(bh(n.style,n.id,e),2048)};if(n.kind==="party")return{px:ra(bh(n.style,n.species,e,{...Yd(n.seed),collar:n.colour}),2048)};const{sprites:t,layout:i,floor:r}=C_(n.style,n.seed,n.id,n.K,e);return{px:ra(t),layout:i,floor:{albedo:new Uint8Array(_a(r.A,r.w,r.h)),normal:new Uint8Array(_a(r.N,r.w,r.h)),w:r.w,h:r.h}}}function yh(n,e,t){const i=new xr(n,e,t,_n,vn);return i.magFilter=kt,i.minFilter=kt,i.generateMipmaps=!1,i.flipY=!1,i.colorSpace=On,i.needsUpdate=!0,i}function Ou(n){return{albedo:yh(n.albedo,n.width,n.height),normal:yh(n.normal,n.width,n.height),frames:n.frames}}const Xs=(n,e=2048)=>Ou(ra(n,e));class D_{constructor(e,t,i){this.style=e,this.seed=t,this.K=2/i;const r=hd(e),s=c=>wi(vd(e,c),r,e,e.cOutline);this.witch=Xs([0,1,2].map(c=>s({frame:c})).concat([0,1,2].map(c=>s({frame:c,facing:"away"})),[s({lean:!0}),s({lean:!0,facing:"away"})],...["rise","descend"].flatMap(c=>["towards","away"].flatMap(l=>[0,1].map(h=>s({pose:c,frame:h,facing:l}))))),1024),this.stones=Xs([0,1,2,3].map(c=>this.stone(c)));const a=wf(e);this.props=Xs([...a.campfire,a.stones.cyan,a.stones.violet,a.stones.green],1024);const o=[];for(let c=0;c<3;c++)for(let l=0;l<3;l++)o.push(wi(w_(e,{variant:c,frame:l,state:"playing"}),S_(c),e,e.cOutline));if(this.soundsystems=Xs(o,2048),this.useWorkers=typeof Worker<"u"&&typeof OffscreenCanvas<"u",this.useWorkers){const c=Math.max(1,Math.min(3,(navigator.hardwareConcurrency||2)-1));try{for(let l=0;l<c;l++){const h=new Worker(new URL(""+new URL("artWorker-DAaBuVJ5.js",import.meta.url).href,import.meta.url),{type:"module"}),d={w:h,busy:!1};h.onmessage=u=>{d.busy=!1,d.job=void 0,this.receive(u.data),this.dispatch()},h.onerror=()=>{this.useWorkers=!1,d.job&&this.queue.unshift(d.job),d.busy=!1,d.job=void 0},this.workers.push(d)}}catch{this.useWorkers=!1}}}style;seed;types=new Map;creatures=new Map;queue=[];inFlight=new Set;workers=[];useWorkers;witch;stones;props;soundsystems;K;version=0;onFloor=()=>{};stone(e){const t=Ai(this.seed*3+e),i=5+Math.floor(t()*3),r=7+Math.floor(t()*5),s=new pn(i+2,r+1);return s.ellipse((i+2)/2,r/2+1,i/2,r/2+.5,f.BODY,{round:this.style.round}),s.ellipse((i+2)/2-1,r/2,i/3,r/3,f.BODY2,{round:this.style.round,onlyOn:new Set([f.BODY]),density:.5,seed:e}),wi(s,{[f.BODY]:[178,174,162],[f.BODY2]:[140,138,130]},this.style,"dark")}key=e=>e.kind+":"+e.id;ask(e){const t=this.key(e);this.inFlight.has(t)||(this.inFlight.add(t),this.queue.push(e),this.dispatch())}dispatch(){if(this.useWorkers)for(const e of this.workers)e.busy||!this.queue.length||(e.busy=!0,e.job=this.queue.shift(),e.w.postMessage(e.job))}receive(e){if(!e.result){console.warn("art worker failed, drawing on the page:",e.error),this.useWorkers=!1,this.queue.unshift(e.job);return}const t=Ou(e.result.px);e.job.kind==="type"?(this.types.set(e.job.id,{atlas:t,layout:e.result.layout}),e.result.floor&&this.onFloor(e.job.id,e.result.floor)):this.creatures.set(e.job.id,{atlas:t,frame:L_}),this.inFlight.delete(this.key(e.job)),this.version++}typeArt(e){const t=this.types.get(e);return t||this.ask({kind:"type",id:e,style:this.style,seed:this.seed,K:this.K}),t}creatureArt(e){const t=this.creatures.get(e);return t||this.ask({kind:"creature",id:e,style:this.style}),t}partyArt(e,t,i){const r=`party-${t}`,s=this.creatures.get(r);return s||this.ask({kind:"party",id:r,species:e,seed:t,colour:i,style:this.style}),s}prefetchType(e){this.types.has(e)||this.typeArt(e)}get pending(){return this.inFlight.size}work(e){if(this.useWorkers)return;const t=performance.now();let i=0;for(;this.queue.length&&(i===0||performance.now()-t<e);){const r=this.queue.shift();this.receive({job:r,result:P_(r,(s,a)=>{const o=document.createElement("canvas");return o.width=s,o.height=a,o})}),i++}}whenIdle(){return new Promise(e=>{const t=()=>{this.work(50),this.pending?setTimeout(t,30):e()};t()})}}const Er=24,ct={uAmb:{value:new W},uMoon:{value:new W},uMoonDir:{value:new W(-.45,.75,.5).normalize()},uMoonBeam:{value:new W},uBands:{value:4},uDither:{value:.35},uShafts:{value:.3},uShaftScale:{value:1},uGlowPos:{value:new W},uGlowRgb:{value:new W},uGlowR:{value:8},uGlowPower:{value:1.4},uHazeCentre:{value:new We},uHazeRange:{value:new We(70,200)},uHazeColour:{value:new W},uTime:{value:0},uSmooth:{value:1},uLightPos:{value:Array.from({length:Er},()=>new ht)},uLightCol:{value:Array.from({length:Er},()=>new ht)},uLightCount:{value:0},uDisco:{value:new ht},uDiscoParams:{value:new ht},uDiscoColour:{value:new W(1,1,1)}};function I_(n,e,t,i=1){const r=(s,a)=>new W(s[0]/255*a,s[1]/255*a,s[2]/255*a);ct.uAmb.value.copy(r(ge(n.ambientHue,.55,1),n.ambient*i)),ct.uMoon.value.copy(r(ge(n.moonHue,.35,1),n.moon)),ct.uMoonBeam.value.copy(r(ge(n.moonHue,.35,1),n.shafts*.25)),ct.uBands.value=n.bands,ct.uDither.value=n.dither*.5,ct.uShafts.value=n.shafts,ct.uShaftScale.value=t*2,ct.uGlowRgb.value.copy(r(ge(n.glowHue,n.glowSat,1),1)),ct.uGlowR.value=e,ct.uGlowPower.value=n.glowPower,ct.uHazeColour.value.copy(r(ge(n.ambientHue-.08,.55,1),.16*Math.sqrt(i)))}const di=`
uniform vec3 uAmb, uMoon, uMoonDir, uMoonBeam, uGlowPos, uGlowRgb;
uniform float uBands, uDither, uShafts, uShaftScale, uGlowR, uGlowPower, uTime, uSmooth;
uniform vec2 uHazeCentre, uHazeRange;
uniform vec3 uHazeColour;
uniform vec4 uLightPos[${Er}], uLightCol[${Er}];
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
  for (int i = 0; i < ${Er}; i++) {
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
`,Si=2,en=32,Bi=8,N_=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`,U_=`
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
${di}
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
    vec2 cell = vec2(mod(float(t), ${Bi}.0), floor(float(t) / ${Bi}.0));
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
`;class F_{constructor(e,t,i,r){this.map=e,this.forest=t;const s=e.extent,a=s.maxX-s.minX,o=s.maxZ-s.minZ,c=Math.ceil(a*Si/en)*en,l=Math.ceil(o*Si/en)*en;this.tilesX=c/en,this.tilesZ=l/en,this.filled=new Uint8Array(this.tilesX*this.tilesZ);const h=g=>(g.magFilter=g.minFilter=kt,g.generateMipmaps=!1,g.colorSpace=On,g.needsUpdate=!0,g);this.texture=h(new xr(new Uint8Array(c*l*4),c,l)),h(this.tile),this.floors=h(new xr(new Uint8Array(64*Bi*48*4*4),64*Bi,192));const d=Array.from({length:32},(g,v)=>new W(...yn[v]?.floor??[.25,.45,.4])),u=new Rt({vertexShader:N_,fragmentShader:U_,uniforms:{...ct,uAreas:{value:this.texture},uExtent:{value:new ht(s.minX,s.minZ,c/Si,l/Si)},uPixel:{value:r},uTypeFloor:{value:d},uFloorReady:{value:this.floorReady},uFloors:{value:this.floors},uTile:{value:new We(64,48)},uFloorsSize:{value:new We(64*Bi,192)},uSat:{value:i.sat},uFloor:{value:new W(e.dancefloor.x,e.dancefloor.z,e.dancefloor.radius)},uCanopy:{value:new ht},uCircle:{value:new ht},uSweeps:{value:Array.from({length:4},()=>new ht)},uSweepCount:{value:0},uClearing:{value:new We(e.tuning.clearingSize,e.tuning.clearingFalloff)}}}),p=new wn(a+400,o+400);p.rotateX(-Math.PI/2),this.mesh=new Jt(p,u),this.mesh.position.set((s.minX+s.maxX)/2,0,(s.minZ+s.maxZ)/2)}map;forest;mesh;texture;tile=new xr(new Uint8Array(en*en*4),en,en);filled;tilesX;tilesZ;initialised=!1;floorReady=new Array(32).fill(0);floors;pendingFloors=[];setSweeps(e){const t=this.mesh.material.uniforms,i=t.uSweeps.value;e.slice(0,4).forEach((r,s)=>i[s].set(r.x,r.z,r.radius,r.strength)),t.uSweepCount.value=Math.min(4,e.length)}setCircle(e,t,i,r){this.mesh.material.uniforms.uCircle.value.set(e,t,i,r)}setCanopyShadow(e,t,i,r){this.mesh.material.uniforms.uCanopy.value.set(e,t,i,r)}setFloor(e,t){this.pendingFloors.push([e,t])}placeFloors(e){for(const[t,i]of this.pendingFloors){const r=this.mesh.material,s=r.uniforms.uTile.value;if(i.w!==s.x||i.h!==s.y)continue;const a=new xr(i.albedo,i.w,i.h);a.needsUpdate=!0,e.copyTextureToTexture(a,this.floors,null,new We(t%Bi*i.w,Math.floor(t/Bi)*i.h)),a.dispose(),this.floorReady[t]=1}this.pendingFloors=[]}fill(e,t,i,r,s){this.initialised||(e.initTexture(this.texture),e.initTexture(this.floors),this.initialised=!0),this.pendingFloors.length&&this.placeFloors(e);const a=this.map.extent,o=en/Si,c=Math.max(0,Math.floor((t.minX-a.minX)/o)),l=Math.min(this.tilesX-1,Math.floor((t.maxX-a.minX)/o)),h=Math.max(0,Math.floor((t.minZ-a.minZ)/o)),d=Math.min(this.tilesZ-1,Math.floor((t.maxZ-a.minZ)/o)),u=(i-a.minX)/o,p=(r-a.minZ)/o,g=[];for(let m=h;m<=d;m++)for(let _=c;_<=l;_++)this.filled[m*this.tilesX+_]||g.push([_,m,(_+.5-u)**2+(m+.5-p)**2]);g.sort((m,_)=>m[2]-_[2]);const v=performance.now();let x=0;for(const[m,_]of g){if(x>0&&performance.now()-v>s)break;this.fillTile(e,m,_),x++}return g.length-x}fillTile(e,t,i){const r=this.map.extent,s=this.tile.image.data,a=en/Si,o=r.minX+t*a,c=r.minZ+i*a,l=this.forest.lightsNear(o+a/2,c+a/2,a/2+6).filter(h=>h.kind==="pond");for(let h=0;h<en;h++)for(let d=0;d<en;d++){const u=o+(d+.5)/Si,p=c+(h+.5)/Si,g=this.map.areaAt(u,p),v=(h*en+d)*4;let x=0;for(const m of l)Math.hypot(u-m.x,p-m.z)<3*m.size&&(x=255);s[v]=g.type,s[v+1]=Math.round(g.openness*255),s[v+2]=x,s[v+3]=255}this.tile.needsUpdate=!0,e.copyTextureToTexture(this.tile,this.texture,null,new We(t*en,i*en)),this.filled[i*this.tilesX+t]=1}dispose(){this.texture.dispose(),this.tile.dispose(),this.mesh.geometry.dispose(),this.mesh.material.dispose()}}const O_="varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",B_=`
uniform sampler2D uScene; uniform float uThreshold; varying vec2 vUv;
void main() {
  vec3 c = texture2D(uScene, vUv).rgb;
  float l = max(c.r, max(c.g, c.b));
  gl_FragColor = vec4(c * smoothstep(uThreshold, uThreshold + 0.25, l), 1.0);
}`,z_=`
uniform sampler2D uSrc; uniform vec2 uStep; varying vec2 vUv;
void main() {
  vec4 c = texture2D(uSrc, vUv) * 0.227;
  c += (texture2D(uSrc, vUv + uStep * 1.38) + texture2D(uSrc, vUv - uStep * 1.38)) * 0.316;
  c += (texture2D(uSrc, vUv + uStep * 3.23) + texture2D(uSrc, vUv - uStep * 3.23)) * 0.070;
  gl_FragColor = c;
}`,k_=`
uniform sampler2D uScene, uBloom, uFx; uniform vec2 uLow; uniform float uBloomStrength, uBlack, uGamma, uFxOn; varying vec2 vUv;
void main() {
  vec2 p = (floor(vUv * uLow) + 0.5) / uLow;
  vec3 c = texture2D(uScene, p).rgb;
  if (uFxOn > 0.5) { vec4 f = texture2D(uFx, vUv); c = c * (1.0 - f.a) + f.rgb; }
  // Levels: a black point and a gamma, so the shade goes near-black and the lit stays bright.
  c = pow(clamp((c - uBlack) / (1.0 - uBlack), 0.0, 1.0), vec3(uGamma));
  c += texture2D(uBloom, vUv).rgb * uBloomStrength;
  gl_FragColor = vec4(min(c, vec3(1.0)), 1.0);
}`,G_=`
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
}`;function Fi(n,e,t,i=!1){const r=new Cn(Math.max(1,n),Math.max(1,e),{minFilter:t,magFilter:t,depthBuffer:i,generateMipmaps:!1});return r.texture.colorSpace=On,r}class H_{constructor(e,t){this.renderer=e,this.tuning=t,this.scene=Fi(1,1,Bt,!0),this.scene.depthTexture=new Lr(1,1),this.fx.texture.format=_n;const i=(r,s)=>new Rt({vertexShader:O_,fragmentShader:r,uniforms:s,depthTest:!1,depthWrite:!1});this.mats={bright:i(B_,{uScene:{value:null},uThreshold:{value:.6}}),blur:i(z_,{uSrc:{value:null},uStep:{value:new We}}),composite:i(k_,{uScene:{value:null},uBloom:{value:null},uLow:{value:new We},uBloomStrength:{value:0},uBlack:{value:0},uGamma:{value:1},uFx:{value:null},uFxOn:{value:0}}),tilt:i(G_,{uSrc:{value:null},uTexel:{value:new We},uDir:{value:new We},uStrength:{value:0},uBand:{value:.4},uCentre:{value:.5}})},this.quad=new Jt(new wn(2,2),this.mats.composite),this.quad.frustumCulled=!1}renderer;tuning;scene;bright=Fi(1,1,Bt);bloomB=Fi(1,1,Bt);a=Fi(1,1,Bt);b=Fi(1,1,Bt);fx=Fi(1,1,Bt);fxB=Fi(1,1,Bt);fxScene=null;quad;cam=new Yl(-1,1,1,-1,0,1);mats;low=new We(1,1);out=new We(1,1);get fullResolution(){return this.tuning.tiltShift.on&&this.tuning.tiltShift.where==="after"}get lowSize(){return this.low}resize(e,t,i,r){this.low.set(e,t),this.fx.setSize(e,t),this.fxB.setSize(e,t),this.out.set(i,r),this.scene.setSize(e,t);const s=Math.max(1,Math.round(e/2)),a=Math.max(1,Math.round(t/2));this.bright.setSize(s,a),this.bloomB.setSize(s,a);const o=this.fullResolution?i:e,c=this.fullResolution?r:t;this.a.setSize(o,c),this.b.setSize(o,c)}pass(e,t,i){const r=this.mats[e];i(r.uniforms),this.quad.material=r,this.renderer.setRenderTarget(t),this.renderer.render(this.quad,this.cam)}render(e,t){const i=this.renderer,r=this.tuning;i.setRenderTarget(this.scene),i.render(e,t);const s=r.bloom.on&&r.bloom.strength>0;if(s){const u=this.bright.width,p=this.bright.height;this.pass("bright",this.bright,g=>{g.uScene.value=this.scene.texture,g.uThreshold.value=r.bloom.threshold});for(let g=0;g<2;g++)this.pass("blur",this.bloomB,v=>{v.uSrc.value=this.bright.texture,v.uStep.value.set(1/u,0)}),this.pass("blur",this.bright,v=>{v.uSrc.value=this.bloomB.texture,v.uStep.value.set(0,1/p)})}const a=!!this.fxScene;if(this.fxScene){const u=i.getClearColor(new tt),p=i.getClearAlpha();i.setRenderTarget(this.fx),i.setClearColor(0,0),i.clear(),i.render(this.fxScene,t),i.setClearColor(u,p);const g=this.fx.width,v=this.fx.height;this.pass("blur",this.fxB,x=>{x.uSrc.value=this.fx.texture,x.uStep.value.set(.6/g,0)}),this.pass("blur",this.fx,x=>{x.uSrc.value=this.fxB.texture,x.uStep.value.set(0,.6/v)})}const o=r.tiltShift.on&&r.tiltShift.strength>0;if(this.pass("composite",o?this.a:null,u=>{u.uScene.value=this.scene.texture,u.uBloom.value=this.bright.texture,u.uLow.value.copy(this.low),u.uBloomStrength.value=s?r.bloom.strength:0,u.uBlack.value=r.tone.black,u.uGamma.value=r.tone.gamma,u.uFx.value=this.fx.texture,u.uFxOn.value=a?1:0}),!o)return;const c=this.a.width,l=this.a.height,h=this.fullResolution?this.out.y/this.low.y:1,d=u=>{u.uTexel.value.set(1/c,1/l),u.uStrength.value=r.tiltShift.strength*h,u.uBand.value=r.tiltShift.band,u.uCentre.value=1-r.tiltShift.centre};this.pass("tilt",this.b,u=>{d(u),u.uSrc.value=this.a.texture,u.uDir.value.set(1,0)}),this.pass("tilt",null,u=>{d(u),u.uSrc.value=this.b.texture,u.uDir.value.set(0,1)})}}const W_=`
uniform vec3 uRight, uUp;
uniform float uSize;
varying vec2 vUv;
void main() {
  vUv = uv * 2.0 - 1.0;
  vec3 w = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz + (uRight * position.x + uUp * position.y) * uSize;
  gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
}`,V_=`
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
}`,X_=`
uniform vec3 uTint;
void main() {
  if (mod(floor(gl_FragCoord.y), 3.0) > 0.5) discard; // faint: a dotted thread of light
  gl_FragColor = vec4(uTint, 1.0);
}`,Y_=`
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
}`,K_=`
uniform vec3 uTint;
varying float vA;
void main() { if (vA < 0.15) discard; gl_FragColor = vec4(uTint * (0.5 + vA), 1.0); }`;class q_{constructor(e,t,i,r){this.tuning=t;const s=t.dancefloor,a=e.dancefloor;this.centre=new W(a.x,0,a.z);const o=new W(...ge(s.circleHue2,.4,1).map(x=>x/255));this.ballMat=new Rt({vertexShader:W_,fragmentShader:V_,uniforms:{...i,uSize:{value:s.discoSize/2},uTime:ct.uTime,uSpin:{value:s.spin/60*Math.PI*2},uPixels:{value:Math.max(6,Math.round(s.discoSize/r))},uTint:{value:o}}}),this.ball=new Jt(new wn(2,2),this.ballMat),this.ball.frustumCulled=!1;const c=60;this.beam=new Jt(new wn(r,c).translate(0,c/2,0),new Rt({fragmentShader:X_,uniforms:{uTint:{value:o.clone().multiplyScalar(.5)}}})),this.beam.frustumCulled=!1;const l=s.motes,h=[],d=[];for(let x=0;x<l.count;x++){const m=S=>{const w=Math.sin(x*12.9898+S*78.233)*43758.5453;return w-Math.floor(w)},_=m(1)*Math.PI*2,M=Math.sqrt(m(2))*a.radius*l.column;h.push(a.x+Math.cos(_)*M,.3,a.z+Math.sin(_)*M),d.push(m(3),l.speed*(.6+m(4)*.8),.4+m(5)*1.2,0)}const u=new Yt;u.setAttribute("position",new It(h,3)),u.setAttribute("aMote",new It(d,4));const p=ge(s.circleHue,.55,1);this.motes=new ga(u,new Rt({vertexShader:Y_,fragmentShader:K_,uniforms:{uTime:ct.uTime,uRise:{value:l.rise},uTint:{value:new W(p[0]/255,p[1]/255,p[2]/255)}},transparent:!0,depthWrite:!1,blending:Rr})),this.motes.frustumCulled=!1;const g=ge(s.circleHue,.7,1);this.lightRgb=new W(g[0]/255,g[1]/255,g[2]/255);const v=ct;v.uDiscoParams.value.set(s.spin/60*Math.PI*2,s.specks,s.speckBrightness,s.speckReach),v.uDiscoColour.value.copy(o)}tuning;ball;beam;motes;ballMat;lightRgb;centre;update(e,t){const i=this.tuning.dancefloor,r=.75+.25*Math.sin(e*i.pulse*Math.PI*2);t.setCircle(i.circleHue,i.circleHue2,.7+.3*r,e*i.runeSpeed/60*Math.PI*2);const s=i.discoHeight+Math.sin(e*.8)*.3;return this.ball.position.set(this.centre.x,s,this.centre.z),this.beam.position.set(this.centre.x,s+i.discoSize/2,this.centre.z),ct.uDisco.value.set(this.centre.x,s,this.centre.z,1),{x:this.centre.x,y:2.5,z:this.centre.z,reach:i.lightReach,rgb:this.lightRgb,strength:i.lightStrength*r}}}const $_=[new W(.25,.85,1),new W(.7,.4,1),new W(1,.65,.2)];class Z_{constructor(e,t){this.atlas=e,this.metresPerPixel=t}atlas;metresPerPixel;homeSoundsystem(e){const t=e.map.dancefloor;return{x:t.x+t.radius+5,z:t.z+3,variant:0,at:-1/0,from:null}}update(e,t,i,r){const s=e.tuning.party,a=[],o=[],c=[],l=[],h=[this.homeSoundsystem(e)];for(const[,d]of e.party.areas){if(!d.soundsystem)continue;const u=d.from?e.map.siteOf(d.from[0],d.from[1]):null;h.push({...d.soundsystem,at:d.at,from:u})}for(const d of h){const u=s.transition>0?Math.min(1,(t-d.at)/s.transition):1,p=this.atlas.frames[d.variant*3+Math.floor(t*6)%3],g=p.h*this.metresPerPixel,v=fn((u-.55)/.45);if(u<1&&d.from){const m=(d.from.x+d.x)/2,_=(d.from.z+d.z)/2,M=Math.hypot(d.x-m,d.z-_)*1.6;c.push({x:m,z:_,radius:u*M,strength:1-fn((u-.8)/.2)})}if(v>0&&i(d.x,d.z,p.w*this.metresPerPixel,g)){const m=He(Math.round(d.x*10),Math.round(d.z*10),911)<.5;a.push({x:d.x,y:-(1-v)*g,z:d.z,frame:p,flip:m,fresh:r(d.x,d.z,g)})}u>=1&&l.push({x:d.x,y:g*.85,z:d.z,seed:Math.floor(Math.abs(d.x*7.3+d.z*13.1))%1e5,ready:d.at+s.transition});const x=.85+.15*Math.sin(t*8);v>0&&o.push({x:d.x,y:3,z:d.z,reach:s.lightReach,rgb:$_[d.variant%3],strength:s.lightStrength*x*v*(1+(1-u)*2)})}return{items:a,lights:o,sweeps:c,playing:l}}}function J_(n,e,t,i){const r=(a,o)=>Math.abs(a[0]-o[0])<1e-6&&Math.abs(a[1]-o[1])<1e-6;if(r(n,t)||r(n,i)||r(e,t)||r(e,i))return!1;const s=(a,o,c)=>Math.sign((o[0]-a[0])*(c[1]-a[1])-(o[1]-a[1])*(c[0]-a[0]));return s(n,e,t)*s(n,e,i)<0&&s(t,i,n)*s(t,i,e)<0}function Q_(n,e,t){const i=n.tuning.stringLights,r=n.siteOf(t[0],t[1]),s=Ai(n.seed*53+t[0]*1031+t[1]*7+509),a=S=>{const w=n.areaAt(S.x,S.z).cell;return w[0]===t[0]&&w[1]===t[1]},o=S=>He(Math.round(S.x*10),Math.round(S.z*10),n.seed+501),c=e.treesNear(r.x,r.z,n.areaSize*1.3).filter(a).sort((S,w)=>o(S)-o(w)),l=new Map,h=new Set,d=[],u=[],p=Math.cos(i.coneAngle*Math.PI/180),g=(S,w=0)=>(l.get(S)??0)+1<=(h.has(S)?3:2)-w,v=(S,w)=>d.some(E=>J_([S.x,S.z],[w.x,w.z],[E.ax,E.az],[E.bx,E.bz])),x=(S,w)=>{d.push({ax:S.x,az:S.z,bx:w.x,bz:w.z,seed:Math.floor(He(Math.round(S.x*10),Math.round(w.z*10),n.seed+503)*1e6)}),l.set(S,(l.get(S)??0)+1),l.set(w,(l.get(w)??0)+1)},m=(S,w,E)=>{let L=S,b=w;const A=[S];for(let P=0;P<E;P++){const C=[];for(const D of c){if(D===L||!g(D))continue;const F=D.x-L.x,z=D.z-L.z,X=Math.hypot(F,z);if(!(X<i.spanMin||X>i.spanMax)&&!(b&&(F*b[0]+z*b[1])/X<p)&&!v(L,D)&&(C.push({b:D,d:X}),C.length>=16))break}if(!C.length)break;C.sort((D,F)=>F.d-D.d);const{b:N,d:U}=C[Math.floor(s()*Math.min(4,C.length))];x(L,N),b=[(N.x-L.x)/U,(N.z-L.z)/U],A.push(N),L=N}return A},_=i.runsPerArea[0]+Math.floor(s()*(i.runsPerArea[1]-i.runsPerArea[0]+1)),M=[];for(const S of c){if(u.length>=_)break;if(l.has(S)||u.some(L=>Math.hypot(L.x-S.x,L.z-S.z)<i.spread))continue;u.push(S);const w=i.spansPerRun[0]+Math.floor(s()*(i.spansPerRun[1]-i.spansPerRun[0]+1)),E=m(S,null,w);for(let L=1;L<E.length-1;L++){if(s()>=i.junctionChance)continue;const b=E[L],A=E[L+1],P=A.x-b.x,C=A.z-b.z,N=Math.hypot(P,C),U=s()<.5?1:-1;h.add(b),M.push({from:b,heading:[-C/N*U,P/N*U]})}}for(const S of M)m(S.from,S.heading,i.spansPerRun[0]+Math.floor(s()*3));return d}const cn={uRight:{value:new W(1,0,0)},uUp:{value:new W(0,1,0)},uFacing:{value:new W(0,0,1)},uTopFade:{value:0},uCutout:{value:new ht(0,0,0,1)},uDebugCull:{value:0},uRes:{value:new We(1,1)}},j_=`
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
`,eM=`
uniform sampler2D uAlbedo, uNormal;
uniform vec3 uRight, uUp, uFacing;
uniform float uTopFade, uUnlit;
uniform vec4 uCutout;
uniform float uDebugCull;
varying vec2 vUv;
varying vec3 vWorld;
varying vec3 vFlags;
${di}
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
`;class dr{constructor(e,t,i={}){this.atlas=e,this.metresPerPixel=t;const r=new wn(1,1);r.translate(0,.5,0),this.geo=new Kl,this.geo.index=r.index,this.geo.setAttribute("position",r.getAttribute("position")),this.geo.setAttribute("uv",r.getAttribute("uv")),this.pos=this.size=this.uvs=this.flags=void 0,this.grow(64);const s=new Rt({vertexShader:j_,fragmentShader:eM,uniforms:{...ct,...cn,uAlbedo:{value:e.albedo},uNormal:{value:e.normal},uUnlit:{value:i.unlit?1:0}},depthTest:!i.onTop,depthWrite:!i.onTop});this.mesh=new Jt(this.geo,s),this.mesh.frustumCulled=!1,i.onTop&&(this.mesh.renderOrder=10)}atlas;metresPerPixel;mesh;geo;pos;size;uvs;flags;capacity=0;count=0;grow(e){const t=Math.max(e,this.capacity*2);this.geo.dispose();const i=(r,s)=>{const a=new Vl(new Float32Array(t*r),r);return a.setUsage(br),s&&a.array.set(s.array),a};this.pos=i(3,this.pos),this.size=i(2,this.size),this.uvs=i(4,this.uvs),this.flags=i(3,this.flags),this.geo.setAttribute("iPos",this.pos),this.geo.setAttribute("iSize",this.size),this.geo.setAttribute("iUv",this.uvs),this.geo.setAttribute("iFlags",this.flags),this.capacity=t}set(e){e.length>this.capacity&&this.grow(e.length);const t=this.pos.array,i=this.size.array,r=this.uvs.array,s=this.flags.array;e.forEach((a,o)=>{t[o*3]=a.x,t[o*3+1]=a.y,t[o*3+2]=a.z;const c=a.scale??1;i[o*2]=a.frame.w*this.metresPerPixel*c,i[o*2+1]=a.frame.h*this.metresPerPixel*c,r.set(a.frame.uv,o*4),s[o*3]=a.flip?1:0,s[o*3+1]=a.top?1:0,s[o*3+2]=a.fresh?1:0});for(const a of[this.pos,this.size,this.uvs,this.flags])a.needsUpdate=!0;this.count=e.length,this.geo.instanceCount=e.length,this.mesh.visible=e.length>0}get dropped(){const e=this.geo._maxInstanceCount;return e===void 0||!this.mesh.visible?0:Math.max(0,this.count-e)}dispose(){this.geo.dispose(),this.mesh.material.dispose(),this.atlas.albedo.dispose(),this.atlas.normal.dispose()}}const tM=`
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
}`,nM=`
uniform float uTwinkle, uChase;
varying vec3 vColour;
varying vec3 vWorld;
varying float vOn;
varying vec2 vB;
${di}
void main() {
  if (vOn < 0.5) discard;
  float b = 1.0 - uTwinkle * 0.5 * (1.0 + sin(uTime * (1.3 + vB.x) + vB.x * 40.0));
  if (fract((vB.y - uTime * uChase) / 60.0) < 0.06) b = 1.4;  // a chase running along now and then
  gl_FragColor = vec4(haze(vColour * b * 1.6, vWorld), 1.0); // bright enough to bloom
}`,iM=`
attribute float aSway;
uniform float uWind, uTime;
varying vec3 vWorld;
void main() {
  vec3 p = position;
  p.x += sin(uTime * uWind + aSway * 6.0) * 0.18 * fract(aSway * 7.0);
  vWorld = p;
  gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
}`,rM=`
varying vec3 vWorld;
${di}
void main() { gl_FragColor = vec4(haze(vec3(0.03, 0.025, 0.04), vWorld), 1.0); }`,sM=`
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
}`,aM=`
uniform vec3 uMoteColour;
varying float vA;
varying vec3 vWorld;
${di}
void main() {
  if (vA < 0.3) discard;
  gl_FragColor = vec4(haze(uMoteColour * (0.6 + 0.6 * vA), vWorld), 1.0);
}`;class oM{constructor(e,t){this.scene=e,this.game=t;const i=t.tuning.stringLights;this.palette=i.palette.map(s=>new tt(s));const r={...ct,uWind:{value:t.tuning.canopyShadow.wind*1.5}};this.bulbMat=new Rt({vertexShader:tM,fragmentShader:nM,uniforms:{...r,uRes:cn.uRes,uNear:{value:240},uTwinkle:{value:i.twinkle},uChase:{value:i.chaseSpeed}}}),this.wireMat=new Rt({vertexShader:iM,fragmentShader:rM,uniforms:r}),this.moteMat=new Rt({vertexShader:sM,fragmentShader:aM,uniforms:{...ct,uMoteColour:{value:new tt(1,.85,1)}}})}scene;game;built=new Map;palette;bulbMat;wireMat;moteMat;build(e,t,i,r){const s=this.game.tuning.stringLights,a=s.height,o=[],c=[],l=[],h=[],d=[];e.forEach((M,S)=>{const w=Math.hypot(M.bx-M.ax,M.bz-M.az),E=Math.max(2,Math.round(w/s.bulbSpacing)),L=b=>[M.ax+(M.bx-M.ax)*b,a-s.sag*4*b*(1-b)*(w/8),M.az+(M.bz-M.az)*b];for(let b=0;b<=16;b++){const A=L(b/16),P=L((b+1)/16);b<16&&(h.push(...A,...P),d.push(S+b/16,S+(b+1)/16))}for(let b=1;b<E;b++){const A=b/E,P=L(A),C=this.palette[(M.seed+b)%this.palette.length];o.push(...P),c.push(C.r,C.g,C.b),l.push((M.seed*13+b*7)%100/100,S*40+b,t(P[0],P[2])+b*.03,4*A*(1-A))}});const u=new jr,p=new Yt;p.setAttribute("position",new It(o,3)),p.setAttribute("aColour",new It(c,3)),p.setAttribute("aBulb",new It(l,4));const g=new Yt;g.setAttribute("position",new It(h,3)),g.setAttribute("aSway",new It(d,1)),u.add(new Xl(g,this.wireMat),new ga(p,this.bulbMat));const v=[],x=[];for(let M=0;M<48;M++){const S=A=>{const P=Math.sin(r*12.9898+M*78.233+A*37.719)*43758.5453;return P-Math.floor(P)},w=S(1)*Math.PI*2,E=2+S(2)*14,L=i.x+Math.cos(w)*E,b=i.z+Math.sin(w)*E;v.push(L,.3,b),x.push(S(3),.4+S(4)*.6,.3+S(5)*.8,t(L,b))}const m=new Yt;m.setAttribute("position",new It(v,3)),m.setAttribute("aMote",new It(x,4));const _=new ga(m,this.moteMat);return _.frustumCulled=!1,u.add(_),u.traverse(M=>{M.frustumCulled=!1}),u}update(){const e=this.game;if(!e.tuning.stringLights.on)return;this.bulbMat.depthTest=e.witch.lift<.5;let i=0;for(const[r,s]of e.party.areas){let a=this.built.get(r);if(!a){if(i++>=2)break;const o=Q_(e.map,e.forest,s.cell),c=e.map.siteOf(s.cell[0],s.cell[1]),l=s.from?e.map.siteOf(s.from[0],s.from[1]):null,h=l?(l.x+c.x)/2:c.x,d=l?(l.z+c.z)/2:c.z,u=l?Math.hypot(c.x-h,c.z-d)*1.6:1,p=e.tuning.party.transition,g=(x,m)=>s.wave===0?-1:s.at+Math.min(1,Math.hypot(x-h,m-d)/u)*p,v=s.soundsystem??(s.wave===0?e.map.dancefloor:c);a={lines:o,group:this.build(o,g,v,s.cell[0]*131+s.cell[1]*17+e.seed),on:s.wave===0?-1:s.at},this.scene.add(a.group),this.built.set(r,a)}}}clear(){for(const[,e]of this.built)this.scene.remove(e.group);this.built.clear()}}const Vt=32,fr=16,lM=`
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
}`,cM=`
uniform sampler2D uGlyphs;
varying vec2 vUv, vP;
varying vec4 vCol;
varying float vDraw;
varying vec3 vWorld;
${di}
void main() {
  float a = texture2D(uGlyphs, vUv).a * vCol.a;
  // Written on: revealed clockwise from the top as vDraw goes 0 to 1.
  float ang = fract(atan(vP.x, vP.y) / 6.2831853 + 1.0);
  if (ang > vDraw || a < 0.02) discard;
  gl_FragColor = vec4(haze(vCol.rgb * a, vWorld), 1.0);
}`;class wh{mesh;geo=new Kl;cap=0;n=0;pos;size;uv;col;draw;constructor(e){const t=new wn(1,1);this.geo.index=t.index,this.geo.setAttribute("position",t.getAttribute("position")),this.geo.setAttribute("uv",t.getAttribute("uv")),this.grow(256),this.mesh=new Jt(this.geo,e),this.mesh.frustumCulled=!1,this.mesh.renderOrder=3}grow(e){const t=(r,s)=>{const a=new Float32Array(e*s);return r&&a.set(r),a};this.pos=t(this.pos,3),this.size=t(this.size,1),this.uv=t(this.uv,4),this.col=t(this.col,4),this.draw=t(this.draw,1),this.cap=e,this.geo.dispose();const i=(r,s,a)=>this.geo.setAttribute(r,new Vl(s,a).setUsage(br));i("iPos",this.pos,3),i("iSize",this.size,1),i("iUv",this.uv,4),i("iCol",this.col,4),i("iDraw",this.draw,1)}begin(){this.n=0}add(e,t,i,r,s,a,o,c,l,h=1){this.n>=this.cap&&this.grow(this.cap*2);const d=this.n++;this.pos.set([e,t,i],d*3),this.size[d]=r,this.uv.set(s,d*4),this.col.set([a,o,c,l],d*4),this.draw[d]=h}end(){this.geo.instanceCount=this.n;for(const e of["iPos","iSize","iUv","iCol","iDraw"])this.geo.getAttribute(e).needsUpdate=!0}}const hM=["🎉","🎈","💃","🎊","🥳","😛","🍉","🍒","🍷","🍸","🍹","🥂","🍺","😁","😆"],uM=[["😴","🫩","🥱","💼"],["😐","😐","🥱"],["😮","🤭","🫢","😛"],["🙂","🍷","🍺","😁"],["🥳","🎉","🎈","😆","🥂","💃"]];class dM{constructor(e,t){this.game=t,this.canvas.width=this.canvas.height=Vt*fr;const i=this.canvas.getContext("2d"),r=i.createRadialGradient(Vt/2,Vt/2,0,Vt/2,Vt/2,Vt/2);r.addColorStop(0,"rgba(255,255,255,1)"),r.addColorStop(.35,"rgba(255,255,255,.55)"),r.addColorStop(1,"rgba(255,255,255,0)"),i.fillStyle=r,i.fillRect(0,0,Vt,Vt),this.tex=new ag(this.canvas),this.tex.magFilter=kt,this.tex.minFilter=kt,this.tex.generateMipmaps=!1;const s=a=>new Rt({vertexShader:lM,fragmentShader:cM,uniforms:{...ct,uRight:cn.uRight,uUp:cn.uUp,uFlat:{value:a},uGlyphs:{value:this.tex}},transparent:!0,depthWrite:!1,blending:Rr});this.standing=new wh(s(0)),this.flat=new wh(s(1)),e.add(this.standing.mesh,this.flat.mesh)}game;canvas=document.createElement("canvas");tex;slots=new Map;colours=new Map;standing;flat;fizzles=[];bursts=[];chain=[];lastTime=0;bubbleWitch=document.getElementById("bubble-witch");bubbleCreature=document.getElementById("bubble-creature");v=new W;slotOf(e,t=0){const i=`${e}:${t}`;let r=this.slots.get(i);if(r!==void 0)return r;r=this.slots.size+1,this.slots.set(i,r);const s=this.canvas.getContext("2d"),a=r%fr*Vt,o=Math.floor(r/fr)*Vt;s.clearRect(a,o,Vt,Vt),lf(s,e,{x:a+1,y:o+1,size:Vt-2,level:t,colour:[255,255,255],glow:!1});const c=s.getImageData(a,o,Vt,Vt);for(let h=3;h<c.data.length;h+=4)c.data[h]=c.data[h]>90?255:0;s.putImageData(c,a,o);const l=wa(e);return this.colours.set(e,new tt(l[0]/255,l[1]/255,l[2]/255)),this.tex.needsUpdate=!0,r}uv(e){const t=Vt*fr,i=e%fr*Vt,r=Math.floor(e/fr)*Vt;return[i/t,1-r/t,(i+Vt)/t,1-(r+Vt)/t]}update(e,t,i,r,s){const a=this.game,o=a.leash,c=a.tuning,l=a.witch,h=c.bond,d=c.leash,u=this.uv(0);this.standing.begin(),this.flat.begin();for(const M of o.events)M.kind==="fizzled"&&this.fizzles.push({x:M.x,z:M.z,at:e}),M.kind==="invited"&&this.bursts.push({x:M.x,z:M.z,at:e,seed:M.id});this.fizzles=this.fizzles.filter(M=>e-M.at<.7),this.bursts=this.bursts.filter(M=>e-M.at<.9);for(const M of this.bursts){const S=(e-M.at)/.9;for(let w=0;w<28;w++){const E=He(M.seed,w,3)*Math.PI*2,L=2+He(M.seed,w,5)*3,b=2+He(M.seed,w,7)*3,A=[[1,.4,.8],[.3,.95,1],[1,.9,.3],[.6,1,.4],[1,1,1]][w%5];this.standing.add(M.x+Math.cos(E)*L*S,.6+b*S-4*S*S,M.z+Math.sin(E)*L*S,.3,u,A[0],A[1],A[2],1-S)}}if(o.talk){const M=a.creatures[o.talk.id],S=o.talk.refused?0:Math.min(1,o.talk.t/o.talk.total),w=28;for(let E=0;E<w;E++){const L=Math.PI/2-E/w*Math.PI*2,b=E/w<S;this.flat.add(M.x+Math.cos(L)*1.5,0,M.z+Math.sin(L)*1.1,.35,u,1,b?.6:.9,b?.9:1,b?.9:.18)}}const p=c.stack,g=Math.min(.1,Math.max(0,e-this.lastTime)),v=new Map;for(this.lastTime=e;this.chain.length<o.stack.length;)this.chain.push({x:0,z:0,vx:0,vz:0});let x={x:0,z:0},m=s;for(let M=o.stack.length-1;M>=0;M--){const S=o.stack[M],w=a.creatures[S],E=o.stack.length-1-M,L=this.chain[E],b=(2+w.level*.4)*p.scale,A=Math.sin(e*1.7+E*.9)*p.idleSway*(1+E*.5),P=x.x-l.vx*p.trail+A,C=x.z-l.vz*p.trail;L.vx+=((P-L.x)*p.stiffness-L.vx*p.damping)*g,L.vz+=((C-L.z)*p.stiffness-L.vz*p.damping)*g,L.x+=L.vx*g,L.z+=L.vz*g,x=L,m+=(E===0?p.offset*b:p.gap*b)+b/2;const N=new W(l.x+L.x,m,l.z+L.z);m+=b/2,v.set(S,N);const U=(this.slotOf(w.species,w.level),this.colours.get(w.species));this.standing.add(N.x,N.y,N.z,b,this.uv(this.slotOf(w.species,w.level)),U.r,U.g,U.b,1)}for(const M of o.placed){const S=a.creatures[M.id],w=this.slotOf(S.species,S.level),E=this.colours.get(S.species),L=.8+.2*Math.sin(e*2+M.id);this.flat.add(M.x,0,M.z,3+S.level*.8,this.uv(w),E.r*L,E.g*L,E.b*L,1,Math.min(1,(e-M.at)/.8)),this.flat.add(M.x,0,M.z,5,u,E.r,E.g,E.b,.25)}if(l.mode==="ground"&&o.stack.length&&!o.placed.some(M=>Math.hypot(M.x-l.x,M.z-l.z)<=d.pickRadius)){const M=a.creatures[o.stack[o.stack.length-1]],S=this.colours.get(M.species),w=$h(o,l.x,l.z,c);this.flat.add(l.x,0,l.z,3+M.level*.8,this.uv(this.slotOf(M.species,M.level)),w?1:S.r,w?.1:S.g,w?.1:S.b,.22)}for(const M of this.fizzles){const S=1-(e-M.at)/.7;this.flat.add(M.x,0,M.z,3*(1+(1-S)*.6),u,1,.15,.1,S)}const _=[...o.stack,...o.placed.map(M=>M.id)];for(const M of _){const S=a.creatures[M],w=this.colours.get(S.species);if(!w)continue;const E=qf(o,M,l.x,l.z);h.rim&&this.flat.add(S.x,0,S.z,1.8,u,w.r,w.g,w.b,.35);const L=v.get(M)??new W(E.x,.2,E.z);if(h.sparks){const A=Math.max(.5,h.sparkEvery),P=(e+M*.618%1*A)%A;if(P<.7){const C=P/.7;this.standing.add(L.x+(S.x-L.x)*C,L.y+(.6-L.y)*C+Math.sin(C*Math.PI)*1.2,L.z+(S.z-L.z)*C,.35,u,w.r,w.g,w.b,1)}}const b=Math.hypot(S.x-E.x,S.z-E.z);if(h.thread&&b>d.length*.85){const A=Math.min(1,(b-d.length*.85)/d.length),P=Math.min(60,Math.floor(b/1.2));for(let C=1;C<P;C++){const N=(C+e*2%1)/P;this.standing.add(L.x+(S.x-L.x)*N,L.y+(.5-L.y)*N,L.z+(S.z-L.z)*N,.22,u,w.r,w.g,w.b,.25+.75*A)}}}this.standing.end(),this.flat.end(),this.bubbles(e,t,i,r)}bubbles(e,t,i,r){const s=this.game,a=s.leash.talk,o=this.bubbleWitch,c=this.bubbleCreature;if(!o||!c)return;const l=s.witch,h=(M,S,w,E)=>{this.v.set(S,w,E).project(t),M.style.left=`${(this.v.x+1)/2*i}px`,M.style.top=`${(1-this.v.y)/2*r}px`},d=c.querySelector("span"),u=c.querySelector(".bar");if(!a){c.style.opacity="0.85",u.style.display="none",o.classList.toggle("on",s.leash.held),s.leash.held&&(o.textContent=s.leash.heldInAir?"land to talk":"…",h(o,l.x-1.2,Tr(l,s.tuning)+2.2,l.z));const M=l.mode==="ground"?$f(s.creatures,l.x,l.z,s.tuning):null;c.classList.toggle("on",!!M),M&&(d.textContent=M.level===3?"😒":"💬 T",h(c,M.x,1.2+M.level*.8,M.z));return}const p=s.creatures[a.id];if(h(o,l.x-1.2,Tr(l,s.tuning)+2.2,l.z),h(c,p.x,1.2+p.level*.8,p.z),a.refused){o.classList.remove("on"),d.textContent=He(a.id,1,9)<.5?"😒":"🙄",u.style.display="none",c.classList.toggle("on",a.t<1.6),c.style.opacity="1";return}u.style.display="";const g=Math.floor(a.t/Kf(p,s.tuning)),v=Math.min(1,a.t/a.total),x=(M,S)=>M[Math.floor(He(a.id,S,5)*M.length)%M.length],m=[4,2,0][Math.min(2,p.level)],_=Math.round(m+(4-m)*v);o.textContent=x(hM,g-g%2),o.classList.toggle("on",g%2===0),d.textContent=g>=1?x(uM[_],g-(g+1)%2):"…",u.querySelector("i").style.width=`${v*100}%`,c.classList.add("on"),c.style.opacity=g%2===1?"1":"0.6"}}const fM=[1,3,5,7,9],Bu=n=>{const e=60/Math.max(1,n.beat.bpm);return{beat:e,bar:e*4}};function pM(n,e,t,i){const r=i.lasers,{beat:s,bar:a}=Bu(i),o=a*Math.max(1,r.blockBars),c=Math.floor(n/o),l=n-c*o,h=Ti(r.duty*t,0,1),u=He(e,c,311)<h?fn(l/Math.max(.001,r.fadeIn))*fn((o-l)/Math.max(.001,r.fadeOut)):0,p=Math.floor(l/a),g=fM.filter(S=>S<=r.maxCount),v=g[Math.floor(He(e,c*64+p,313)*g.length)%g.length]??1,x=e%97*.37,m=Math.sin(2*Math.PI*n/(s*r.sweepBeats)+x)*(r.sweep*Math.PI)/180,_=.55+.45*Math.sin(2*Math.PI*n/(a*r.openBars)+x*2),M=((e%1e3*.0137+n/(a*8))%1+1)%1;return{on:u,count:v,sweep:m,open:_,hue:M}}const mM=`
attribute vec4 aCol; // rgb, alpha
attribute float aU;  // 0 at the source, 1 at the far end
varying vec4 vCol;
varying float vU;
void main() { vCol = aCol; vU = aU; gl_Position = projectionMatrix * viewMatrix * vec4(position, 1.0); }`,gM=`
varying vec4 vCol;
varying float vU;
void main() { float a = vCol.a * pow(1.0 - vU, 0.6); gl_FragColor = vec4(vCol.rgb * a, 1.0); }`,Jr=[[.3,.95,1],[.35,.55,1],[.7,.4,1],[1,.3,.85],[.45,1,.55]],xM=n=>{const e=(n%1+1)%1*Jr.length,t=Math.floor(e),i=e-t,r=Jr[t%Jr.length],s=Jr[(t+1)%Jr.length];return[r[0]+(s[0]-r[0])*i,r[1]+(s[1]-r[1])*i,r[2]+(s[2]-r[2])*i]};class vM{constructor(e,t){this.game=t,this.mesh=new Xl(this.geo,new Rt({vertexShader:mM,fragmentShader:gM,transparent:!0,depthWrite:!1,blending:Rr})),this.mesh.frustumCulled=!1,e.add(this.mesh)}game;geo=new Yt;pos=new Float32Array(0);col=new Float32Array(0);u=new Float32Array(0);mesh;update(e,t,i,r){const s=this.game.tuning,a=s.lasers,{bar:o}=Bu(s),c=o*a.blockBars,l=[],h=[],d=[];if(a.on)for(const u of t){const p=1-Math.min(1,Math.max(0,(Math.hypot(u.x-i,u.z-r)-a.fadeNear)/Math.max(1,a.fadeFar-a.fadeNear)));if(p<=0)continue;const g=pM(e,u.seed,1,s),v=e-u.ready,x=v>=0&&v<c?Math.min(1,v/a.fadeIn)*Math.min(1,(c-v)/a.fadeOut):0,m=Math.max(g.on,x),_=x>g.on?a.maxCount:g.count;if(m<=.01)continue;const M=a.spread*Math.PI/180*g.open;for(let S=0;S<_;S++){const w=_===1?0:S/(_-1)-.5,E=a.maxTilt*Math.PI/180,L=Math.max(-E,Math.min(E,w*M+g.sweep)),b=Math.sin(L),A=Math.cos(L),P=-.15*Math.cos(L*3+u.seed),C=xM(g.hue+S*.07),N=a.opacity*m*p;l.push(u.x,u.y,u.z,u.x+b*a.length,u.y+A*a.length,u.z+P*a.length),h.push(...C,N,...C,N),d.push(0,1)}}if(l.length>this.pos.length&&(this.pos=new Float32Array(l.length*2),this.col=new Float32Array(h.length*2),this.u=new Float32Array(d.length*2),this.geo.setAttribute("position",new bn(this.pos,3).setUsage(br)),this.geo.setAttribute("aCol",new bn(this.col,4).setUsage(br)),this.geo.setAttribute("aU",new bn(this.u,1).setUsage(br))),!!this.geo.getAttribute("position")){this.pos.set(l),this.col.set(h),this.u.set(d);for(const u of["position","aCol","aU"])this.geo.getAttribute(u).needsUpdate=!0;this.geo.setDrawRange(0,l.length/3)}}}function*_M(n,e,t,i){const r=n.siteOf(e[0],e[1]),s=n.areaSize*1.5,a=Math.max(t*2,8),o=n.bounds,c=(m,_)=>{if(m<o.minX||m>o.maxX||_<o.minZ||_>o.maxZ)return"edge";const M=n.areaAt(m,_).cell;return`${M[0]},${M[1]}`},l=`${e[0]},${e[1]}`,h=Math.ceil(2*s/a),d=r.x-s,u=r.z-s,p=[];for(let m=0;m<=h;m++){for(let _=0;_<=h;_++)p.push(c(d+_*a,u+m*a));yield}const g=new Set,v=Math.max(1,Math.round(a/t)),x=a/v;for(let m=0;m<h;m++,yield)for(let _=0;_<h;_++){const M=[p[m*(h+1)+_],p[m*(h+1)+_+1],p[(m+1)*(h+1)+_],p[(m+1)*(h+1)+_+1]];if(!M.includes(l)||M.every(w=>w===l))continue;const S=[];for(let w=0;w<=v;w++)for(let E=0;E<=v;E++)S.push(c(d+_*a+E*x,u+m*a+w*x));for(let w=0;w<=v;w++)for(let E=0;E<=v;E++){const L=S[w*(v+1)+E],b=d+_*a+E*x,A=u+m*a+w*x;for(const[P,C]of[[1,0],[0,1]]){if(E+P>v||w+C>v)continue;const N=S[(w+C)*(v+1)+E+P];if(L===N||L!==l&&N!==l)continue;const U=b+P*x*.5,D=A+C*x*.5,F=`${Math.round(U*4)},${Math.round(D*4)}`;g.has(F)||(g.add(F),i.push({x:U,z:D,other:L===l?N:L}))}}}}const MM=`
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
}`,SM=`
uniform float uBright;
varying vec3 vColour;
varying vec3 vWorld;
varying float vB;
${di}
void main() { gl_FragColor = vec4(haze(vColour * vB * uBright, vWorld), 1.0); }`;class bM{constructor(e,t){this.game=t;const i=t.tuning.borders;this.mesh=new ga(this.geo,new Rt({vertexShader:MM,fragmentShader:SM,uniforms:{...ct,uWidth:{value:i.width},uSparkle:{value:i.sparkle},uBright:{value:i.brightness}},transparent:!0,depthWrite:!1,blending:Rr})),this.mesh.frustumCulled=!1,e.add(this.mesh)}game;areas=new Map;jobs=[];geo=new Yt;stamp="";mesh;update(){const e=this.game,t=e.tuning.borders;if(!t.on){this.mesh.visible=!1;return}for(const[c,l]of e.party.areas){if(this.areas.has(c))continue;const h=e.map.siteOf(l.cell[0],l.cell[1]),d=l.from?e.map.siteOf(l.from[0],l.from[1]):null,u=d?(d.x+h.x)/2:h.x,p=d?(d.z+h.z)/2:h.z,g=e.map.areaSize*1.6,v=e.tuning.party.transition,x=wa(yn[e.map.typeOf(l.cell[0],l.cell[1])].creature),m={points:[],colour:new tt(x[0]/255,x[1]/255,x[2]/255),on:(_,M)=>l.wave===0?-1:l.at+Math.min(1,Math.hypot(_-u,M-p)/g)*v,done:!1};this.areas.set(c,m),this.jobs.push({key:c,gen:_M(e.map,l.cell,t.step,m.points)})}const i=performance.now()+3;for(;this.jobs.length&&performance.now()<i;){const c=this.jobs[0];c.gen.next().done&&(this.areas.get(c.key).done=!0,this.jobs.shift())}const r=`${e.party.areas.size}|${[...this.areas.values()].filter(c=>c.done).length}`;if(r===this.stamp)return;this.stamp=r;const s=[],a=[],o=[];for(const[,c]of this.areas)if(c.done)for(const l of c.points)l.other!=="edge"&&e.party.areas.has(l.other)||(s.push(l.x,.15,l.z),a.push(c.colour.r,c.colour.g,c.colour.b),o.push(((l.x*12.9898+l.z*78.233)%1+1)%1,c.on(l.x,l.z)));this.geo.setAttribute("position",new It(s,3)),this.geo.setAttribute("aColour",new It(a,3)),this.geo.setAttribute("aSpark",new It(o,2))}}const yM=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,wM=`
uniform float uStrength, uWind, uPixel;
uniform sampler2D uDepth; uniform vec2 uLow;
varying vec3 vWorld;
${di}
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
}`;class EM{constructor(e,t,i,r,s,a,o){this.height=t,this.mat=new Rt({vertexShader:yM,fragmentShader:wM,uniforms:{...ct,uStrength:{value:e},uWind:{value:i},uPixel:{value:r},uDepth:{value:a},uLow:{value:o}},depthWrite:!1,depthTest:!s,blending:s?Zn:Sr}),this.mesh=new Jt(new wn(700,700).rotateX(-Math.PI/2),this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=2}height;mesh;mat;follow(e,t){this.mesh.position.set(e,this.height,t-150)}}const AM=`
attribute vec4 iShadow; // x, z, width, depth (metres)
varying vec2 vLocal;
varying vec3 vWorld;
void main() {
  vLocal = position.xz * 2.0;
  vec3 w = vec3(iShadow.x + position.x * iShadow.z, 0.03, iShadow.y + position.z * iShadow.w);
  vWorld = w;
  gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
}`,TM=`
uniform float uStrength;
varying vec2 vLocal;
varying vec3 vWorld;
${di}
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
}`;class RM{mesh;geo=new Kl;attr;capacity=0;constructor(e,t=!0){const i=new wn(1,1).rotateX(-Math.PI/2);this.geo.index=i.index,this.geo.setAttribute("position",i.getAttribute("position")),this.attr=this.grow(1024);const r=new Rt({vertexShader:AM,fragmentShader:TM,uniforms:{...ct,uStrength:{value:e}},depthWrite:!1,...t?{transparent:!0,blending:Pl,blendSrc:Dl,blendDst:Il}:{}});this.mesh=new Jt(this.geo,r),this.mesh.frustumCulled=!1,this.mesh.renderOrder=1}grow(e){return this.capacity=Math.max(e,this.capacity*2),this.geo.dispose(),this.attr=new Vl(new Float32Array(this.capacity*4),4),this.attr.setUsage(br),this.geo.setAttribute("iShadow",this.attr),this.attr}set(e){e.length>this.capacity&&this.grow(e.length);const t=this.attr.array;e.forEach((i,r)=>{t[r*4]=i.x,t[r*4+1]=i.z,t[r*4+2]=i.w,t[r*4+3]=i.d}),this.attr.needsUpdate=!0,this.geo.instanceCount=e.length,this.mesh.visible=e.length>0}}class CM{constructor(e,t,i){this.canvas=e,this.game=t,this.style=i;const r=t.tuning;this.renderer=new p_({canvas:e,antialias:!1,powerPreference:"high-performance",preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.info.autoReset=!1,this.renderer.outputColorSpace=as,this.mpp=1/(r.artPixelsPerMetre*(2/r.pixelSize)),this.camera=new xn(r.camera.fov,1,1,900),this.post=new H_(this.renderer,r),this.scene.background=new tt(723478),I_(i,r.glowReach,this.mpp,r.tone.ambient),ct.uGlowPower.value=r.glowPower,this.assets=new D_(i,t.seed,r.pixelSize),this.ground=new F_(t.map,t.forest,i,this.mpp),this.assets.onFloor=(d,u)=>this.ground.setFloor(d,u);const s=r.canopyShadow;this.ground.setCanopyShadow(s.on?s.strength:0,s.height,s.cover,s.wind),this.shadows=new RM(r.shadows.strength,r.fx==="smooth"),this.shadows.mesh.visible=r.shadows.on,this.scene.add(this.shadows.mesh);const a=r.fx==="smooth";ct.uSmooth.value=a?1:0,r.mist.on&&r.mist.strength>0&&(this.mist=new EM(r.mist.strength,r.mist.height,r.mist.wind,this.mpp,a,this.post.scene.depthTexture,this.post.lowSize),a?(this.post.fxScene=new Uc,this.post.fxScene.add(this.mist.mesh)):this.scene.add(this.mist.mesh)),ct.uHazeRange.value.set(r.haze.near,r.haze.far),this.scene.add(this.ground.mesh),this.witchBatch=new dr(this.assets.witch,this.mpp,{unlit:!0,onTop:!0}),this.scene.add(this.witchBatch.mesh),this.stoneBatch=new dr(this.assets.stones,this.mpp),this.scene.add(this.stoneBatch.mesh);const o=t.map.dancefloor,c=[],l=t.tuning.dancefloor.stones;for(let d=0;d<l;d++){const u=d/l*Math.PI*2+.3;c.push({x:o.x+Math.cos(u)*o.radius,y:0,z:o.z+Math.sin(u)*o.radius,frame:this.assets.stones.frames[d%4],flip:d%2===0})}this.stoneBatch.set(c),this.propBatch=new dr(this.assets.props,this.mpp),this.scene.add(this.propBatch.mesh),this.partyView=new Z_(this.assets.soundsystems,this.mpp),this.strings=new oM(this.scene,t),this.leashView=new dM(this.scene,t),this.lasers=new vM(this.scene,t),this.borders=new bM(this.scene,t),this.soundBatch=new dr(this.assets.soundsystems,this.mpp),this.scene.add(this.soundBatch.mesh),this.dancefloor=new q_(t.map,r,cn,this.mpp),this.scene.add(this.dancefloor.ball,this.dancefloor.beam,this.dancefloor.motes);const h=r.fx==="smooth"?new Rt({transparent:!0,depthWrite:!1,blending:Pl,blendSrc:Dl,blendDst:Il,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"varying vec2 vUv; void main(){ vec2 p = vUv * 2.0 - 1.0; float r = dot(p, p); if (r > 1.0) discard; gl_FragColor = vec4(vec3(1.0 - 0.75 * (1.0 - r) * (1.0 - r)), 1.0); }"}):new Rt({transparent:!1,depthWrite:!1,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"varying vec2 vUv; void main(){ vec2 p = vUv * 2.0 - 1.0; if (dot(p, p) > 1.0 || mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0) > 0.5) discard; gl_FragColor = vec4(0.02, 0.02, 0.05, 1.0); }"});this.shadow=new Jt(new wn(1.4,.7).rotateX(-Math.PI/2),h),this.shadow.renderOrder=1,this.scene.add(this.shadow)}canvas;game;style;renderer;scene=new Uc;camera;ground;assets;typeBatches=new Map;creatureBatches=new Map;witchBatch;stoneBatch;shadow;mpp;lastBuild={x:1/0,y:1/0,z:1/0,version:-1};post;dancefloor;propBatch;partyView;strings;leashView;lasers;borders;soundBatch;sources=[];forestLights=[];shadows;shadowList=[];mist=null;width=1;height=1;debugCull=!1;ghosts=[];ghostLines=null;now=0;stats={dropped:0,trees:0,bushes:0,creatures:0,batches:0,drawCalls:0,pendingArt:0,pendingGround:0,lights:0};resize(e,t){const i=this.game.tuning.pixelSize;this.width=Math.max(1,Math.ceil(e/i)),this.height=Math.max(1,Math.ceil(t/i));const r=this.post.fullResolution?i:1;this.renderer.setSize(this.width*r,this.height*r,!1),this.post.resize(this.width,this.height,this.width*r,this.height*r),this.canvas.style.width=this.width*i+"px",this.canvas.style.height=this.height*i+"px",this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix(),cn.uRes.value.set(this.width,this.height)}async prepare(){this.render(0,!1),this.drawCreatures(),this.ground.fill(this.renderer,this.viewRect(this.game.tuning.haze.near,20),this.game.witch.x,this.game.witch.z,1/0),await this.assets.whenIdle(),this.render(0,!1),this.refresh(!0);for(let e=0;e<yn.length;e++)this.assets.prefetchType(e);for(const e of yn)this.assets.creatureArt(e.creature)}batchFor(e,t,i){let r=e.get(t);return r||(r=i(),r&&(e.set(t,r),this.scene.add(r.mesh))),r}frustum=new fa;frustumTo=new fa;cullCam=new xn;box=new Ur;m4=new Nt;v3=new W;at=new Map;tracks={placed:{now:new Set,before:new Set},moving:{now:new Set,before:new Set}};pops=[];poseCamera(e,t){const i=t.angle*Math.PI/180;e.position.set(t.tx,t.ty+Math.sin(i)*t.distance,t.tz+Math.cos(i)*t.distance),e.up.set(0,1,0),e.lookAt(t.tx,t.ty,t.tz),e.updateMatrixWorld()}updateFrustum(){const e=this.game,t=e.tuning,i=this.camera;i.updateMatrixWorld(),this.m4.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this.frustum.setFromProjectionMatrix(this.m4);const r=Math.max(1,t.camera.zoomSteps),s=e.witch.mode==="rising"||e.witch.mode==="treetop"?1:0,a=Th({...e.camera,zoom:r>1?e.camera.zoomStep/(r-1):0},s,t),o=this.cullCam;o.fov=i.fov,o.aspect=i.aspect,o.near=i.near,o.far=i.far,o.updateProjectionMatrix(),this.poseCamera(o,{...a,ty:Fn(t.groundHeight,t.treetopHeight,s)}),this.m4.multiplyMatrices(o.projectionMatrix,o.matrixWorldInverse),this.frustumTo.setFromProjectionMatrix(this.m4)}viewRect(e,t){const i=this.game.witch,r=[];for(const o of[this.camera,this.cullCam]){const c=o.position,l=e+Math.hypot(c.x-i.x,c.z-i.z)+t;for(const h of[-1,1])for(const d of[-1,1]){const u=this.v3.set(h,d,1).unproject(o).sub(c).normalize();for(const p of[0,25]){let g=u.y<-.001?(p-c.y)/u.y:1/0;g>0||(g=1/0),g=Math.min(g,l),r.push([c.x+u.x*g,c.z+u.z*g])}}r.push([c.x,c.z])}const s=r.map(o=>o[0]),a=r.map(o=>o[1]);return{minX:Math.min(...s)-t,maxX:Math.max(...s)+t,minZ:Math.min(...a)-t,maxZ:Math.max(...a)+t}}inView(e,t,i,r,s){const a=this.game.witch.x,o=this.game.witch.z,c=this.game.tuning.haze.far+s;return(e-a)**2+(t-o)**2>c*c?!1:(this.box.min.set(e-i/2-s,-s,t-r-s),this.box.max.set(e+i/2+s,r+s,t+s),this.frustum.intersectsBox(this.box)||this.frustumTo.intersectsBox(this.box))}inInnerView(e,t,i){const r=this.game.witch,s=this.game.tuning.haze;if(Math.hypot(e-r.x,t-r.z)>s.near+(s.far-s.near)*.6)return!1;for(const a of[0,i*.5,i]){const o=this.v3.set(e,a,t).project(this.camera);if(Math.abs(o.x)<1&&Math.abs(o.y)<1&&o.z<1)return!0}return!1}mark(e,t,i,r,s=""){const a=e==="creature"||e==="prop"?this.tracks.moving:this.tracks.placed,o=e==="creature"?`${e}|${s}`:`${e}|${t.toFixed(1)}|${i.toFixed(1)}|${r.toFixed(1)}|${s}`;return e==="creature"&&this.at.set(o,[t,i,r]),a.now.add(o),!a.before.has(o)}checkPops(e,t=!0){const i=this.tracks[e],r=t&&this.assets.pending===0&&i.before.size>0;if(this.debugCull){for(const s of i.before)if(!i.now.has(s)){const a=this.at.get(s),[,...o]=s.split("|"),[c,l,h]=a??o.map(Number);this.ghosts.push({x:+c,z:+l,h:Math.max(1,+h),until:this.now+1})}}if(r){const s=(a,o)=>{const c=this.at.get(a),[l,...h]=a.split("|"),[d,u,p]=c??h.map(Number);this.inInnerView(+d,+u,+p)&&this.pops.push(`${o} ${l} ${(+d).toFixed(0)},${(+u).toFixed(0)}`)};for(const a of i.now)i.before.has(a)||s(a,"appeared");for(const a of i.before)i.now.has(a)||s(a,"vanished")}i.before=i.now,i.now=new Set}lastPose={distance:0,angle:0,zoomStep:-1,lift:-1};refresh(e=!1){const t=this.game,i=t.tuning,r=this.camera,s=i.viewMargin,a=xc(t),o={x:r.position.x,y:r.position.y,z:r.position.z},c=this.lastPose,l=t.witch.mode==="rising"||t.witch.mode==="treetop"?1:0,h=Math.hypot(o.x-this.lastBuild.x,o.y-this.lastBuild.y,o.z-this.lastBuild.z)>=s/3,d=Math.abs(a.distance-c.distance)>2||Math.abs(a.angle-c.angle)>.5||t.camera.zoomStep!==c.zoomStep||l!==c.lift;if(!e&&!h&&!d&&this.assets.version===this.lastBuild.version)return;this.lastBuild={...o,version:this.assets.version},this.lastPose={distance:a.distance,angle:a.angle,zoomStep:t.camera.zoomStep,lift:l};const u=this.viewRect(i.haze.far,s),p=(u.minX+u.maxX)/2,g=(u.minZ+u.maxZ)/2,v=Math.max(u.maxX-u.minX,u.maxZ-u.minZ)/2,x=[],m=ct.uMoonDir.value,_=-m.x/Math.max(.2,m.y),M=-m.z/Math.max(.2,m.y),S=new Map,w=(P,C)=>{let N=S.get(P);N||S.set(P,N=[]),N.push(C)},E=this.mpp;let L=0,b=0;for(const P of t.forest.treesNear(p,g,v)){const C=this.assets.typeArt(P.type);if(!C||!C.layout.big.length)continue;const N=C.atlas.frames,U=C.layout.big[P.variant%C.layout.big.length],D=N[U.top??U.bot];if(!this.inView(P.x,P.z,D.w*E,D.h*E,s))continue;const F=this.mark("tree",P.x,P.z,D.h*E);w(P.type,{x:P.x,y:0,z:P.z,frame:N[U.bot],flip:P.flip,fresh:F}),U.top!==null&&w(P.type,{x:P.x,y:0,z:P.z,frame:N[U.top],flip:P.flip,top:!0,fresh:F});const z=D.w*E,X=D.h*E*(U.top===null?.2:.6);i.shadows.trees&&x.push({x:P.x+_*X,z:P.z+M*X,w:z*.8,d:z*.45}),L++}const A=(P,C,N)=>{for(const U of C){const D=this.assets.typeArt(U.type);if(!D)continue;const F=N(D.layout);if(!F.length)continue;const z=F[U.variant%F.length],X=D.atlas.frames,Q=X[z.bot],Y=X[z.top??z.bot],te=P==="setpiece"?i.setPieceScale:1,O=E*te;if(!this.inView(U.x,U.z,Y.w*O,Y.h*O,s))continue;const ne=this.mark(P,U.x,U.z,Y.h*O);w(U.type,{x:U.x,y:0,z:U.z,frame:Q,flip:U.flip,fresh:ne,scale:te}),z.top!==null&&w(U.type,{x:U.x,y:0,z:U.z,frame:X[z.top],flip:U.flip,top:!0,fresh:ne,scale:te}),x.push({x:U.x,z:U.z,w:Q.w*O*.8,d:Q.w*O*.3}),b++}};A("small",t.forest.bushesNear(p,g,v),P=>P.small),A("wall",t.forest.wallsNear(p,g,v),P=>P.walls.map(C=>({bot:C,top:null}))),A("setpiece",t.forest.setPiecesNear(p,g,v),P=>P.set===null?[]:[P.set]);for(const[P,C]of this.typeBatches)S.has(P)||C.set([]);for(const[P,C]of S)this.batchFor(this.typeBatches,P,()=>{const U=this.assets.typeArt(P);return U&&new dr(U.atlas,E)})?.set(C);this.checkPops("placed",!e),this.sources=t.forest.lightsNear(t.witch.x,t.witch.z,i.haze.far+s),this.stats.trees=L,this.stats.bushes=b,this.shadowList=x}drawCreatures(e=0){const t=this.game,i=t.tuning.haze.far+20,r=new Map,s=new Map,a=[],o=60/t.tuning.beat.bpm;let c=0;for(const l of t.creatures){if(Math.abs(l.x-t.witch.x)>i||Math.abs(l.z-t.witch.z)>i)continue;const h=l.leashed?this.assets.partyArt(l.species,l.id,wa(l.species)):void 0,d=h??this.assets.creatureArt(l.species),u=h?`party-${l.id}`:l.species;if(!d)continue;s.set(u,d);const p=d.atlas.frames[d.frame(l.level,l.moving?Math.floor(l.walk)%2:0,l.away)];if(!this.inView(l.x,l.z,p.w*this.mpp,p.h*this.mpp,4))continue;const g=this.mark("creature",l.x,l.z,p.h*this.mpp,l.id);let v=r.get(u);v||r.set(u,v=[]);const x=(e/o+l.id%4*.25)*Math.PI,m=l.leashed?Math.abs(Math.sin(x))*(l.moving?.15:.4):0,_=l.leashed&&!l.moving?Math.sin(x*.5)*.12:0;v.push({x:l.x+_,y:m,z:l.z,frame:p,flip:l.facing<0,fresh:g}),a.push({x:l.x,z:l.z,w:p.w*this.mpp*.7,d:p.w*this.mpp*.25}),c++}for(const[l,h]of this.creatureBatches)r.has(l)||h.set([]);for(const[l,h]of r)this.batchFor(this.creatureBatches,l,()=>{const u=s.get(l);return u&&new dr(u.atlas,this.mpp)})?.set(h);this.stats.creatures=c,this.game.tuning.shadows.on&&this.shadows.set(this.shadowList.concat(a))}fire=new W(1,.5,.16);runeCyan=new W(.3,.9,1);runeViolet=new W(.75,.45,1);runeGreen=new W(.45,1,.5);updateSources(e){const t=this.assets.props.frames,i=[],r=[];for(const s of this.sources){if(s.kind==="pond")continue;const a=He(Math.round(s.x*10),Math.round(s.z*10),7);if(s.kind==="campfire"){const o=.8+.12*Math.sin(e*11+a*40)+.08*Math.sin(e*23.7+a*13);r.push({x:s.x+Math.sin(e*9+a)*.08,y:1.2,z:s.z,reach:this.game.tuning.lights.campfire.reach*s.size,rgb:this.fire,strength:this.game.tuning.lights.campfire.strength*o});const c=t[Math.floor(e*8+a*10)%3];this.inView(s.x,s.z,c.w*this.mpp,c.h*this.mpp,4)&&i.push({x:s.x,y:0,z:s.z,frame:c,flip:a<.5,fresh:this.mark("prop",s.x,s.z,2)})}else{const o=a<.33?1:a<.66?0:2,c=.7+.3*Math.sin(e*.9+a*20),l=t[3+o];r.push({x:s.x,y:2,z:s.z,reach:this.game.tuning.lights.stone.reach*s.size,rgb:[this.runeCyan,this.runeViolet,this.runeGreen][o],strength:this.game.tuning.lights.stone.strength*c}),this.inView(s.x,s.z,l.w*this.mpp,l.h*this.mpp,4)&&i.push({x:s.x,y:0,z:s.z,frame:l,flip:a<.5,fresh:this.mark("prop",s.x,s.z,2.6)})}}this.propBatch.set(i),this.forestLights=r}setLights(e,t,i){const r=Math.min(Er,this.game.tuning.lightBudget),s=e.map(l=>({l,d:Math.hypot(l.x-t,l.z-i)-l.reach})).sort((l,h)=>l.d-h.d).slice(0,r+1),a=s.length>r?s[r].d:1/0,o=ct;let c=0;for(const{l,d:h}of s.slice(0,r)){const d=Math.min(1,Math.max(0,(a-h)/15));o.uLightPos.value[c].set(l.x,l.y,l.z,l.reach),o.uLightCol.value[c].set(l.rgb.x,l.rgb.y,l.rgb.z,l.strength*d),c++}o.uLightCount.value=c,this.stats.lights=c}drawGhosts(e){this.now=e,this.ghosts=this.ghosts.filter(a=>a.until>e),this.ghostLines||(this.ghostLines=new Xl(new Yt,new yu({color:16719904,depthTest:!1})),this.ghostLines.frustumCulled=!1,this.ghostLines.renderOrder=20,this.scene.add(this.ghostLines));const t=cn.uRight.value,i=cn.uUp.value,r=[];for(const a of this.ghosts){const o=a.h*.4,c=(p,g)=>[a.x+t.x*p*o+i.x*g*a.h,t.y*p*o+i.y*g*a.h,a.z+t.z*p*o+i.z*g*a.h],l=c(-1,0),h=c(1,0),d=c(1,1),u=c(-1,1);r.push(...l,...h,...h,...d,...d,...u,...u,...l,...l,...d)}const s=this.ghostLines.geometry;s.dispose(),s.setAttribute("position",new It(r,3)),s.setDrawRange(0,r.length/3),this.ghostLines.visible=r.length>0}render(e,t=!0){const i=this.game,r=i.tuning,s=xc(i),a=s.angle*Math.PI/180,o=2*s.distance*Math.tan(r.camera.fov*Math.PI/360)/this.height,c=new W(0,Math.cos(a),-Math.sin(a)),l=new W(s.tx,s.ty,s.tz),h=l.dot(c),d=l.x;l.addScaledVector(c,Math.round(h/o)*o-h),l.x+=Math.round(d/o)*o-d;const u=new W(0,Math.sin(a),Math.cos(a)).multiplyScalar(s.distance);this.camera.position.copy(l).add(u),this.camera.up.set(0,1,0),this.camera.lookAt(l),this.updateFrustum();const p=r.spriteTilt;cn.uUp.value.set(0,1,0).lerp(c,p).normalize(),cn.uFacing.value.crossVectors(cn.uRight.value,cn.uUp.value).normalize();const g=pc(i.witch),v=r.canopyCutout;this.camera.updateMatrixWorld();const x=this.v3.set(i.witch.x,Tr(i.witch,r)*.5,i.witch.z).project(this.camera);cn.uCutout.value.set((x.x*.5+.5)*this.width,(x.y*.5+.5)*this.height,.5*v.screenFraction*this.width*(1-g),Math.max(1,v.edge*this.width*(1-g))),cn.uTopFade.value=g,cn.uDebugCull.value=this.debugCull?1:0;const m=i.witch,_=Tr(m,r);ct.uGlowPos.value.set(m.x,_+r.glowHeight,m.z),ct.uHazeCentre.value.set(m.x,m.z),this.updateSources(e);const M=this.partyView.update(i,e,(C,N,U,D)=>this.inView(C,N,U,D,4),()=>!1);this.soundBatch.set(M.items),this.ground.setSweeps(M.sweeps),this.lasers.update(e,M.playing,m.x,m.z),this.strings.update(),this.borders.update(),this.setLights([this.dancefloor.update(e,this.ground),...M.lights,...this.forestLights],m.x,m.z),ct.uTime.value=e,this.mist?.follow(s.tx,s.tz);const S=Math.sin(e*2.4)*.12,w=m.mode==="rising"&&m.lift<.9,E=m.mode==="descending"&&m.lift>.1,L=w||E?(w?8:12)+(m.away?2:0)+Math.floor(e*7)%2:m.lean?6+(m.away?1:0):(m.away?3:0)+Math.floor(e*4)%3,b=this.assets.witch.frames[L],A=_+S-.4+b.h*this.mpp;if(this.witchBatch.set([{x:m.x,y:_+S-.4,z:m.z,frame:b,flip:m.facing<0}]),this.shadow.position.set(m.x,.03,m.z),this.shadow.scale.setScalar(1-.5*pc(m)),this.refresh(),this.drawCreatures(e),this.checkPops("moving"),this.leashView.update(e,this.camera,this.canvas.clientWidth||window.innerWidth,this.canvas.clientHeight||window.innerHeight,A),this.assets.work(6),this.stats.pendingGround=this.ground.fill(this.renderer,this.viewRect(r.haze.far,40),m.x,m.z,4),this.stats.pendingArt=this.assets.pending,this.debugCull&&this.drawGhosts(e),!t)return;this.renderer.info.reset(),this.post.render(this.scene,this.camera);let P=0;for(const C of[...this.typeBatches.values(),...this.creatureBatches.values(),this.propBatch,this.soundBatch])P+=C.dropped;P&&!this.stats.dropped&&console.warn(`view: ${P} sprite instances set but not drawn`),this.stats.dropped=P,this.stats.drawCalls=this.renderer.info.render.calls,this.stats.batches=this.typeBatches.size+this.creatureBatches.size}}const LM="The art style: knobs from the Witch Art Lab. Paste a style saved in the Lab here (its whole saved JSON, or just its style object). Any knob left out follows the Lab's current default, so an empty style means the Lab's default look, and stays up to date as the art changes.",PM="Lab default",DM={},IM={_readme:LM,name:PM,style:DM};function NM(n=IM){const e=n??{},t=e.style&&typeof e.style=="object"?e.style:e,i=A_();for(const[r,s]of Object.entries(t))r in i&&(i[r]=s);return i}function UM(n,e){const t=n.querySelector("#stick"),i=t.querySelector(".knob"),r=56;let s=null,a=0,o=0;const c=()=>n.classList.add("touch"),l=n.querySelector("#stick-zone");l.addEventListener("pointerdown",p=>{if(!(p.pointerType==="mouse"||s!==null)){c(),s=p.pointerId,a=p.clientX,o=p.clientY,t.style.left=a+"px",t.style.top=o+"px",t.classList.add("on");try{l.setPointerCapture(p.pointerId)}catch{}p.preventDefault()}}),l.addEventListener("pointermove",p=>{if(p.pointerId!==s)return;let g=p.clientX-a,v=p.clientY-o;const x=Math.hypot(g,v);x>r&&(g*=r/x,v*=r/x),i.style.transform=`translate(${g}px, ${v}px)`;const m=Math.min(1,x/r),_=.15,M=m<_?0:(m-_)/(1-_)/Math.max(1e-6,m);e.x=g/r*M,e.y=v/r*M});const h=p=>{p.pointerId===s&&(s=null,e.x=0,e.y=0,i.style.transform="",t.classList.remove("on"))};l.addEventListener("pointerup",h),l.addEventListener("pointercancel",h);const d=(p,g)=>{const v=n.querySelector(p);v.addEventListener("pointerdown",x=>{x.preventDefault(),x.stopPropagation(),g(),v.classList.add("down")}),v.addEventListener("pointerup",()=>v.classList.remove("down")),v.addEventListener("pointerleave",()=>v.classList.remove("down"))};d("#rise",()=>e.toggle=!0),d("#zoom-in",()=>e.zoom-=1),d("#zoom-out",()=>e.zoom+=1),d("#sigil",()=>e.sigil=!0);const u=n.querySelector("#talk");u.addEventListener("pointerdown",p=>{p.preventDefault(),p.stopPropagation(),e.talk=!0,u.classList.add("down")});for(const p of["pointerup","pointerleave","pointercancel"])u.addEventListener(p,()=>{e.talk=!1,u.classList.remove("down")});window.addEventListener("touchstart",p=>{c(),p.touches.length===3&&(e.debug=!0)},{passive:!0})}const Gn=new URLSearchParams(location.search);let Hi=Tf(Gn.get("seed"));Hi===null&&(Hi=Math.floor(Math.random()*1e6),Gn.set("seed",String(Hi)),history.replaceState(null,"","?"+Gn.toString()+location.hash));const Mn={...Qi,bloom:{...Qi.bloom},tiltShift:{...Qi.tiltShift},shadows:{...Qi.shadows},canopyShadow:{...Qi.canopyShadow},mist:{...Qi.mist}};Gn.get("shadows")==="off"&&(Mn.shadows.on=!1);Gn.get("canopy")==="off"&&(Mn.canopyShadow.on=!1);Gn.get("mist")==="off"&&(Mn.mist.on=!1);const Ys=Gn.get("tilt");Ys==="off"?Mn.tiltShift.on=!1:(Ys==="before"||Ys==="after")&&(Mn.tiltShift.on=!0,Mn.tiltShift.where=Ys);Gn.get("bloom")==="off"&&(Mn.bloom.on=!1);const So=Gn.get("fx");(So==="pixel"||So==="smooth")&&(Mn.fx=So);const sn=ip(Hi,Mn),FM=document.getElementById("game"),bo=NM(),Ir=new CM(FM,sn,{...bo,pixel:Mn.pixelSize,treeSize:bo.treeSize*Mn.treeHeight,crownWidth:bo.crownWidth*Mn.crownWidth/Mn.treeHeight});Ir.debugCull=Gn.get("debug")==="cull";const Br=new em;document.getElementById("next-wave").addEventListener("pointerdown",n=>{n.preventDefault(),Br.touch.nextWave=!0});document.getElementById("pause-waves").addEventListener("pointerdown",n=>{n.preventDefault(),Br.touch.pauseWaves=!0});UM(document.body,Br.touch);const zu=document.getElementById("help");try{localStorage.getItem("witch.help")==="off"&&zu.classList.add("off")}catch{}window.addEventListener("keydown",n=>{if(n.code!=="KeyH"||n.repeat)return;const e=zu.classList.toggle("off");try{localStorage.setItem("witch.help",e?"off":"on")}catch{}});document.getElementById("version").textContent="v99 · cdf6428";const OM=document.getElementById("seed");OM.innerHTML=`seed <a href="?seed=${Hi}">${Hi}</a>`;const vl=document.getElementById("debug"),ql=document.getElementById("start"),ku=document.getElementById("debug-buttons"),$l=document.getElementById("wave"),BM=$l.querySelector(".fill"),zM=$l.querySelector(".label");let zi=Gn.has("debug");vl.classList.toggle("on",zi);ku.classList.toggle("on",zi);const Gu=()=>Ir.resize(window.innerWidth,window.innerHeight);window.addEventListener("resize",Gu);Gu();let Pa=!1;requestAnimationFrame(()=>setTimeout(async()=>{await Ir.prepare(),Pa=!0,ql.classList.remove("loading")},0));let Eh=null;function Hu(){if(!Pa||!sn.clock.paused)return!1;try{Eh??=new AudioContext,Eh.resume()}catch{}return sn.clock.paused=!1,ql.style.display="none",Br.clearPresses(),!0}Br.onAny=Hu;ql.addEventListener("pointerdown",n=>{n.preventDefault(),Hu()});document.addEventListener("visibilitychange",()=>{document.hidden&&(sa=0)});let sa=0,Ah=60,yo=0,Ks=0;function Wu(n){requestAnimationFrame(Wu);const e=sa?(n-sa)/1e3:0;sa=n,yo++,Ks+=e,Ks>=.5&&(Ah=yo/Ks,yo=0,Ks=0);const t=Br.read();if(t.debug&&(zi=!zi,vl.classList.toggle("on",zi),ku.classList.toggle("on",zi)),rp(sn,t,e),!Pa)return;const i=np(sn.party,sn.map,sn.clock.time);if(BM.style.height=`${(1-i.gone)*100}%`,zM.textContent=`wave ${sn.party.wave} · ${sn.party.areas.size} areas · ${Math.ceil(i.left)} s`,$l.classList.toggle("paused",sn.party.paused),Ir.render(sn.clock.time),zi){const r=sn.witch,s=Ir.stats;vl.textContent=[`fps    ${Ah.toFixed(0)}`,`seed   ${Hi}`,`area   ${Jh(sn)}`,`mode   ${r.mode}`,`at     ${r.x.toFixed(0)}, ${r.z.toFixed(0)} m   zoom ${sn.camera.zoomStep}`,`trees  ${s.trees}  bushes ${s.bushes}  creatures ${s.creatures}`,`draws  ${s.drawCalls}  art queued ${s.pendingArt}  ground tiles ${s.pendingGround}`].join(`
`)}}requestAnimationFrame(Wu);window.witch={game:sn,view:Ir,areaUnderWitch:()=>Jh(sn),areaTypeId:n=>yn[n].id,get ready(){return Pa}};
