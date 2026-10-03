(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();function cr(i){let e=i>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function xt(i,e,t){let n=Math.imul(i|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967296}function So(i,e,t){const n=Math.floor(i),r=Math.floor(e),s=i-n,a=e-r,c=s*s*(3-2*s),l=a*a*(3-2*a),o=xt(n,r,t),u=xt(n+1,r,t),d=xt(n,r+1,t),h=xt(n+1,r+1,t);return o+(u-o)*c+(d-o)*l+(o-u-d+h)*c*l}const tn=(i,e,t)=>i+(e-i)*t,ki=(i,e,t)=>Math.min(t,Math.max(e,i)),qi=i=>{const e=ki(i,0,1);return e*e*(3-2*e)};function Uc(i,e,t,n){const r=Math.max(1,i.camera.zoomSteps),s=ki(Math.round(i.camera.startZoom),0,r-1),a=r>1?s/(r-1):0;return{zoomStep:s,zoom:a,tx:e,ty:t,tz:n}}function Fc(i,e,t,n,r){const s=Math.max(1,r.camera.zoomSteps),a=ki(i.zoomStep+Math.sign(e),0,s-1),c=s>1?a/(s-1):0,l=1-Math.exp(-8*n),o=1-Math.exp(-r.camera.follow*n);return{zoomStep:a,zoom:i.zoom+(c-i.zoom)*l,tx:i.tx+(t.x-i.tx)*o,ty:i.ty+(t.y-i.ty)*o,tz:i.tz+(t.z-i.tz)*o}}function Oc(i,e,t){const n=t.camera.ground,r=t.camera.treetop,s=qi(e),a=tn(tn(n.angleIn,n.angleOut,i.zoom),tn(r.angleIn,r.angleOut,i.zoom),s),c=tn(tn(n.distanceIn,n.distanceOut,i.zoom),tn(r.distanceIn,r.distanceOut,i.zoom),s),l=a*Math.PI/180;return{angle:a,distance:c,x:i.tx,y:i.ty+Math.sin(l)*c,z:i.tz+Math.cos(l)*c,tx:i.tx,ty:i.ty,tz:i.tz}}const zc=.1,kc=()=>({time:0,paused:!0});function Gc(i,e){if(i.paused||!(e>0))return 0;const t=Math.min(zc,e);return i.time+=t,t}const Wc={moor:{treeDensity:.4},"fern-forest":{treeDensity:1},"muddy-forest":{treeDensity:1},"stone-shrine":{treeDensity:.3},"tangly-forest":{treeDensity:1},"wispy-forest":{treeDensity:1},"hazel-forest":{treeDensity:1},garden:{treeDensity:.6},"twiggy-forest":{treeDensity:1},ancient:{treeDensity:.9},norway:{treeDensity:1},"alder-forest":{treeDensity:.9},meadow:{treeDensity:.2},"old-oaks":{treeDensity:.9},"berry-thicket":{treeDensity:1},wetland:{treeDensity:.6},stream:{treeDensity:.7},"rocky-slope":{treeDensity:.6},bog:{treeDensity:.5},deadwood:{treeDensity:.8},"cave-mouth":{treeDensity:.6},grassland:{treeDensity:.2},"beaver-pond":{treeDensity:.8},"log-pile":{treeDensity:.7},heath:{treeDensity:.4},"old-pinewood":{treeDensity:1},ravine:{treeDensity:.6},"bluebell-glade":{treeDensity:.8},"holly-thicket":{treeDensity:1},"honeysuckle-tangle":{treeDensity:1}},Hc={types:Wc};function yl(i,e){if(typeof document<"u"){const t=document.createElement("canvas");return t.width=i,t.height=e,t}return new OffscreenCanvas(i,e)}function Ki(i){let e=i>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}const me=(i,e,t)=>e+(t-e)*i(),wl=(i,e)=>e[Math.floor(i()*e.length)];function kt(i,e,t){let n=Math.imul(i|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967296}function Zn(i,e,t){const n=Math.floor(i),r=Math.floor(e),s=i-n,a=e-r,c=s*s*(3-2*s),l=a*a*(3-2*a),o=kt(n,r,t),u=kt(n+1,r,t),d=kt(n,r+1,t),h=kt(n+1,r+1,t);return o+(u-o)*c+(d-o)*l+(o-u-d+h)*c*l}function we(i,e,t){i=(i%1+1)%1,e=Math.max(0,Math.min(1,e)),t=Math.max(0,Math.min(1,t));const n=Math.floor(i*6),r=i*6-n,s=t*(1-e),a=t*(1-r*e),c=t*(1-(1-r)*e),[l,o,u]=[[t,c,s],[a,t,s],[s,t,c],[s,a,t],[c,s,t],[t,s,a]][n%6];return[Math.round(l*255),Math.round(o*255),Math.round(u*255)]}const x={BODY:1,BELLY:2,ACCENT:3,EYE:4,GLINT:5,TRUNK:6,LEAF:7,LEAF2:8,CLOTH:9,SKIN:10,HAIR:11,BROOM:12,STRAW:13,BODY2:14,BARK2:15,FLOWER:16,PUPIL:17,MAGIC:18,BARKD:19,LINE:20,IRIS:21,MAGIC2:22,NOSE:23,EAR:24,BODY3:25,LEAF3:26,BARKL:27},Vc=new Set([x.GLINT,x.FLOWER,x.MAGIC,x.MAGIC2]);function bo(i,e=!0,t=8){const n=i.length,r=[];if(n<3)return i.slice();const s=c=>e?i[(c+n)%n]:i[Math.max(0,Math.min(n-1,c))],a=e?n:n-1;for(let c=0;c<a;c++){const l=s(c-1),o=s(c),u=s(c+1),d=s(c+2),h=Math.max(2,Math.ceil(Math.hypot(u[0]-o[0],u[1]-o[1])/1.5),t);for(let f=0;f<h;f++){const _=f/h,g=_*_,p=g*_;r.push([0,1].map(m=>.5*(2*o[m]+(-l[m]+u[m])*_+(2*l[m]-5*o[m]+4*u[m]-d[m])*g+(-l[m]+3*o[m]-3*u[m]+d[m])*p)))}}return e||r.push(i[n-1]),r}function na(i,{cap:e=1,capEnd:t=e}={}){const n=[],r=[],s=i.length;for(let l=0;l<s;l++){const o=i[Math.max(0,l-1)],u=i[Math.min(s-1,l+1)];let d=u[0]-o[0],h=u[1]-o[1];const f=Math.hypot(d,h)||1;d/=f,h/=f;const _=i[l][2]/2;n.push([i[l][0]-h*_,i[l][1]+d*_]),r.push([i[l][0]+h*_,i[l][1]-d*_])}const a=(l,o,u,d)=>{let h=l[0]-o[0],f=l[1]-o[1];const _=Math.hypot(h,f)||1;return[l[0]+h/_*u/2*d,l[1]+f/_*u/2*d]};return[...n,a(i[s-1],i[s-2],i[s-1][2],t),...r.reverse(),a(i[0],i[1],i[0][2],e)]}const Eo=([i,e],[t,n],r)=>{const s=Math.cos(r),a=Math.sin(r);return[t+(i-t)*s-(e-n)*a,n+(i-t)*a+(e-n)*s]},R=(i,e)=>[i[0]+e[0],i[1]+e[1]],Ze=(i,e,t)=>[i[0]+(e[0]-i[0])*t,i[1]+(e[1]-i[1])*t];function gt(i,e,t,n,r,s=1){const a=[];for(let c=0;c<i.length;c++){if(a.push(i[c]),c<e||c>=t)continue;const l=i[c],o=i[(c+1)%i.length];let u=o[0]-l[0],d=o[1]-l[1];const h=Math.hypot(u,d)||1,f=d/h*s,_=-u/h*s;for(let g=1;g<=n;g++){const p=(g-.5)/n,m=Ze(l,o,p),v=[m[0]+f*r-u/h*r*.5,m[1]+_*r-d/h*r*.5];a.push(Ze(l,o,p-.45/n),v,Ze(l,o,p+.35/n))}}return a}function yo(i,e,t){const n=new Uint8Array(i*e);let r=1/0,s=-1/0;for(const a of t)r=Math.min(r,a[1]),s=Math.max(s,a[1]);for(let a=Math.max(0,Math.floor(r));a<=Math.min(e-1,Math.ceil(s));a++){const c=a+.5,l=[];for(let o=0,u=t.length-1;o<t.length;u=o++){const[d,h]=t[o],[f,_]=t[u];h>c!=_>c&&l.push(d+(c-h)/(_-h)*(f-d))}l.sort((o,u)=>o-u);for(let o=0;o+1<l.length;o+=2)for(let u=Math.max(0,Math.ceil(l[o]-.5));u<=Math.min(i-1,Math.floor(l[o+1]-.5));u++)n[a*i+u]=1}return n}function Xc(i,e,t){const r=new Float32Array(i*e),s=new Float32Array(i*e);for(let l=0;l<i*e;l++)t[l]&&(r[l]=1e4,s[l]=1e4);const a=l=>r[l]*r[l]+s[l]*s[l],c=(l,o,u,d,h)=>{const f=o+d,_=u+h;let g,p;if(f<0||_<0||f>=i||_>=e)g=d,p=h;else{const m=_*i+f;g=r[m]+d,p=s[m]+h}g*g+p*p<a(l)&&(r[l]=g,s[l]=p)};for(let l=0;l<e;l++){for(let o=0;o<i;o++){const u=l*i+o;t[u]&&(c(u,o,l,-1,0),c(u,o,l,0,-1),c(u,o,l,-1,-1),c(u,o,l,1,-1))}for(let o=i-1;o>=0;o--){const u=l*i+o;t[u]&&c(u,o,l,1,0)}}for(let l=e-1;l>=0;l--){for(let o=i-1;o>=0;o--){const u=l*i+o;t[u]&&(c(u,o,l,1,0),c(u,o,l,0,1),c(u,o,l,1,1),c(u,o,l,-1,1))}for(let o=0;o<i;o++){const u=l*i+o;t[u]&&c(u,o,l,-1,0)}}return{vx:r,vy:s}}class Ut{constructor(e,t,n=1){this.sx=n,this.w=Math.round(e*n),this.h=t|0,this.m=new Uint8Array(this.w*this.h),this.n=new Float32Array(this.w*this.h*3),this.g=new Uint8Array(this.w*this.h)}inb(e,t){return e>=0&&t>=0&&e<this.w&&t<this.h}get(e,t){return e|=0,t|=0,this.inb(e,t)?this.m[t*this.w+e]:0}put(e,t,n,r=0,s=0,a=1){this.px(e*this.sx,t,n,r,s,a)}px(e,t,n,r=0,s=0,a=1){if(e=Math.floor(e),t=Math.floor(t),!this.inb(e,t))return;const c=t*this.w+e;this.m[c]=n,this.n[c*3]=r,this.n[c*3+1]=s,this.n[c*3+2]=a}recolour(e,t,n){e=Math.floor(e),t=Math.floor(t),this.inb(e,t)&&this.m[t*this.w+e]&&(this.m[t*this.w+e]=n)}ellipse(e,t,n,r,s,a={}){const{onlyOn:c,density:l=1,noise:o=0,seed:u=0,round:d=1}=a;e*=this.sx,n*=this.sx;for(let h=Math.max(0,Math.floor(t-r-1));h<Math.min(this.h,t+r+1);h++)for(let f=Math.max(0,Math.floor(e-n-1));f<Math.min(this.w,e+n+1);f++){const _=(f+.5-e)/n,g=(h+.5-t)/r,p=_*_+g*g;if(p>1)continue;const m=h*this.w+f;if(c&&!c.has(this.m[m]))continue;if(l<1){const y=o?Zn(f/3.2,h/3.2,u)*o+(1-o)*.5:.5;if(kt(f,h,u+77)>l*(.4+y*1.2)*(1.15-p*.5))continue}const v=_*d,E=g*d,M=Math.hypot(v,E,Math.sqrt(Math.max(0,1-p))+.15);this.px(f,h,s,v/M,E/M,(Math.sqrt(Math.max(0,1-p))+.15)/M)}}line(e,t,n,r,s,a,c,l=1){e*=this.sx,n*=this.sx;const o=Math.max(1,Math.ceil(Math.hypot(n-e,r-t)));for(let u=0;u<=o;u++){const d=u/o,h=e+(n-e)*d,f=t+(r-t)*d,_=Math.max(.5,(s+(a-s)*d)/2);for(let g=Math.floor(f-_);g<=f+_;g++)for(let p=Math.floor(h-_);p<=h+_;p++){const m=(p+.5-h)/_,v=(g+.5-f)/_;if(m*m+v*v>1)continue;const E=m*l,M=Math.hypot(E,v*.3,1);this.px(p,g,c,E/M,v*.3/M,1/M)}}}tri(e,t){let[[n,r],[s,a],[c,l]]=e;n*=this.sx,s*=this.sx,c*=this.sx;const o=(_,g,p,m,v,E)=>(_-v)*(m-E)-(p-v)*(g-E),u=Math.max(0,Math.floor(Math.min(n,s,c))),d=Math.min(this.w,Math.ceil(Math.max(n,s,c))),h=Math.max(0,Math.floor(Math.min(r,a,l))),f=Math.min(this.h,Math.ceil(Math.max(r,a,l)));for(let _=h;_<f;_++)for(let g=u;g<d;g++){const p=g+.5,m=_+.5,v=o(p,m,n,r,s,a),E=o(p,m,s,a,c,l),M=o(p,m,c,l,n,r);(v<0||E<0||M<0)&&(v>0||E>0||M>0)||this.px(g,_,t,0,-.2,.98)}}shape(e,t,n={}){return this.fillMask(yo(this.w,this.h,bo(e,!0,n.per||6)),t,n)}limb(e,t,n={}){return this.shape(na(e,n),t,n)}fillMask(e,t,{group:n=1,line:r=!1,depth:s=0,round:a=1,onlyOn:c=null,keepNormals:l=!1,tilt:o=[0,0],lineMat:u=x.LINE}={}){const{w:d,h}=this;if(c)for(let p=0;p<d*h;p++)e[p]&&!c.has(this.m[p])&&(e[p]=0);const{vx:f,vy:_}=Xc(d,h,e);let g=s;if(!g){for(let p=0;p<d*h;p++)e[p]&&(g=Math.max(g,Math.hypot(f[p],_[p])));g=Math.max(1.5,Math.min(g*.9,2.5+g*.35))}for(let p=0;p<h;p++)for(let m=0;m<d;m++){const v=p*d+m;if(!e[v])continue;if(l){this.m[v]=t;continue}const E=Math.hypot(f[v],_[v]),M=Math.min(1,Math.max(0,(E-.5)/g)),y=Math.min(2.6,(1-M)/Math.sqrt(Math.max(.02,1-(1-M)*(1-M))))*a;let T=f[v]/(E||1)*y+o[0],C=_[v]/(E||1)*y+o[1];const b=Math.hypot(T,C,1);this.m[v]=t,this.n[v*3]=T/b,this.n[v*3+1]=C/b,this.n[v*3+2]=1/b}if(r&&!l){const p=[];for(let m=0;m<h;m++)for(let v=0;v<d;v++){const E=m*d+v;if(e[E])for(const[M,y]of[[1,0],[-1,0],[0,1],[0,-1]]){const T=v+M,C=m+y;if(T<0||C<0||T>=d||C>=h)continue;const b=C*d+T;if(!e[b]&&this.m[b]&&this.g[b]!==n&&this.m[b]!==u){p.push(E);break}}}for(const m of p)this.m[m]=u}if(!l)for(let p=0;p<d*h;p++)e[p]&&(this.g[p]=n);return e}mark(e,t,n,r={}){return this.fillMask(yo(this.w,this.h,bo(e,!0,6)),t,{...r,onlyOn:new Set(n),keepNormals:!0})}grid(e,t,n=0,r=0,{round:s=1,flipX:a=!1}={}){const c=Math.max(...e.map(u=>u.length)),l=new Uint8Array(this.w*this.h),o=new Map;e.forEach((u,d)=>[...u].forEach((h,f)=>{const _=t[h];if(!_)return;const g=n+(a?c-1-f:f),p=r+d;this.inb(g,p)&&(l[p*this.w+g]=1,o.set(p*this.w+g,_))})),this.fillMask(l,x.BODY,{round:s,depth:2.5});for(const[u,d]of o)this.m[u]=d}}function Gi(i,e,t,n=t.outline,r=yl){const{w:s,h:a}=i,c=()=>r(s,a),l=c(),o=c(),u=c(),d=l.getContext("2d").createImageData(s,a),h=o.getContext("2d").createImageData(s,a),f=u.getContext("2d").createImageData(s,a),_=n==="none"?null:n==="dark"?[22,18,30]:"tint";for(let g=0;g<a;g++)for(let p=0;p<s;p++){const m=g*s+p,v=i.m[m],E=m*4;if(!v){if(!_)continue;const b=[i.get(p+1,g),i.get(p-1,g),i.get(p,g+1),i.get(p,g-1)].find(L=>L);if(!b)continue;const A=_==="tint"?(e[b]||[0,0,0]).map(L=>L*.35|0):_;d.data.set([...A,255],E),h.data.set([128,128,255,255],E),f.data.set([128,128,255,255],E);continue}let M=e[v];v===x.LINE&&!M&&(M=_==="tint"||!_?(e[x.BODY2]||[0,0,0]).map(b=>b*.55|0):_),M=M||[255,0,255],d.data.set([...M,Vc.has(v)?254:255],E);const y=i.n[m*3],T=i.n[m*3+1],C=i.n[m*3+2];h.data.set([y*127+128,T*127+128,C*255,255],E),f.data.set([-y*127+128,T*127+128,C*255,255],E)}return l.getContext("2d").putImageData(d,0,0),o.getContext("2d").putImageData(h,0,0),u.getContext("2d").putImageData(f,0,0),{A:l,N:o,NF:u,w:s,h:a}}const Yc=new Set([x.TRUNK,x.BARK2,x.BARKD,x.BARKL]);function ui(i,e,t,n,r,s,{mat:a=x.LEAF,group:c=30,ragged:l=1}={}){const u=[];for(let m=0;m<9;m++){const v=m/9*Math.PI*2,E=1+(s()-.5)*.35*(r.clump+.3);u.push([e[0]+Math.cos(v)*t*E,e[1]+Math.sin(v)*n*E*(Math.sin(v)>0?.8:1)])}const d=Math.max(1,Math.round(Math.min(t,n)/3.5));i.shape(gt(u,0,9,d,Math.max(1.2,Math.min(t,n)*.14)*l,1),a,{group:c,line:!1,round:r.round}),i.mark([R(e,[-t*1.1,n*.15]),R(e,[t*1.1,n*.1]),R(e,[t*1.1,n*1.2]),R(e,[-t*1.1,n*1.2])],x.LEAF3,[a]),i.mark([R(e,[-t*.75,-n*.55]),R(e,[t*.25,-n*.95]),R(e,[t*.55,-n*.35]),R(e,[-t*.2,-n*.05])],x.LEAF2,[a]);const h=Math.floor(e[0]-t*1.2),f=Math.ceil(e[0]+t*1.2),_=Math.floor(e[1]-n*1.2),g=Math.ceil(e[1]+n*1.2),p=s()*1e4|0;for(let m=_;m<=g;m++)for(let v=h;v<=f;v++){const E=i.get(v,m);if(E!==a&&E!==x.LEAF2&&E!==x.LEAF3)continue;const M=kt(v,m,p),y=Zn(v/2,m/2,p)*.5+M*.5;y<.16*r.density?i.recolour(v,m,E===x.LEAF2?a:x.LEAF2):y>1-.16*r.density&&i.recolour(v,m,E===x.LEAF3?a:x.LEAF3)}}function $n(i,e,t,n,r,s,a,c,{mat:l=x.TRUNK,bend:o=1,group:u=10,line:d=!1}={}){const h=[e],f=4;let _=t,g=e;for(let p=1;p<=f;p++)_+=(c()-.5)*.7*a.gnarl*o,g=R(g,[Math.cos(_)*n/f,Math.sin(_)*n/f]),h.push(g);return i.limb(h.map((p,m)=>[...p,r+(s-r)*m/f]),l,{group:u,line:d,round:a.round,cap:.6,capEnd:1}),{end:g,ang:_,pts:h}}function us(i,e,t,n,r,s,a){if(i.shape([[e-n*1.05,t],[e-n*.62,t-n*.5],[e-n*.45,t-n*1.4],[e+n*.45,t-n*1.4],[e+n*.62,t-n*.5],[e+n*1.05,t]],x.TRUNK,{group:10,round:r.round}),r.roots<=0)return;const c=Math.round(2+r.roots*4);for(let l=0;l<c;l++){const o=l%2?1:-1,u=(8+s()*16)*a*(.4+r.roots),d=(2+s()*3)*a,h=[e+o*n*.2,t-n*.5],f=[e+o*(n*.55+u*.4),t-d],_=[e+o*(n*.5+u),t-.5];i.limb([[...h,n*.55],[...f,n*.28],[..._,1.2]],x.TRUNK,{group:11,round:r.round,cap:.5,capEnd:.6})}}function hs(i,e,t=!0){if(!(e.bark<=0))for(let n=0;n<i.h;n++)for(let r=0;r<i.w;r++){const s=n*i.w+r;if(i.m[s]!==x.TRUNK)continue;const a=t?Zn(r/1.3,n/6,21):Zn(r/6,n/1.3,21);a>1-e.bark*.42||kt(r,n,4)<e.bark*.05?i.m[s]=x.BARKD:a>1-e.bark*.62&&i.n[s*3]<-.1&&(i.m[s]=x.BARKL)}}function Wi(i,e,t){let n=i.w,r=-1,s=i.h;for(let h=0;h<i.h;h++)for(let f=0;f<i.w;f++)i.m[h*i.w+f]&&(n=Math.min(n,f),r=Math.max(r,f),s=Math.min(s,h));if(r<0)return{sp:i,crownY:t};const a=Math.max(e-n,r-e)+2,c=Math.max(0,Math.floor(e-a)),l=Math.min(i.w-c,Math.ceil(a*2)+1),o=Math.max(0,s-1),u=i.h-o,d=new Ut(l,u);for(let h=0;h<u;h++)for(let f=0;f<l;f++){const _=(h+o)*i.w+f+c,g=h*l+f;d.m[g]=i.m[_],d.g[g]=i.g[_],d.n[g*3]=i.n[_*3],d.n[g*3+1]=i.n[_*3+1],d.n[g*3+2]=i.n[_*3+2]}return{sp:d,crownY:t-o}}const _r=i=>(i.crownWidth||3)/3;function Tl(i,e,t){const n=_r(e),r=Math.round(220*t*n+60*t),s=Math.round(140*t),a=new Ut(r,s),c=r/2,l=s,o=e.treeTrunks||1,u=12*t*(e.treeThick||1)*(e.treeThin?.55:1)/Math.sqrt(o),d=(i()-.5)*.5*e.gnarl+(e.treeLean||0),h=[];let f=s;const _=(g,p,m,v,E)=>{const M=$n(a,g,p,m,v,v*.65,e,i,{group:12});if(E===0){h.push(M.end);return}const y=i()<.35?3:2;for(let T=0;T<y;T++){const C=(T-(y-1)/2)*me(i,.5,.85)*(E===3?1.4:1);_(M.end,M.ang+C+(i()-.5)*.25,m*me(i,.6,.78),v*.62,E-1)}E<=2&&h.push(Ze(g,M.end,.7))};for(let g=0;g<o;g++){const p=d+(o>1?(g/(o-1)-.5)*.8:0),m=[c+(g-(o-1)/2)*u*.6,l],v=$n(a,m,-Math.PI/2+p,s*.36*(o>1?me(i,.75,1.15):1),u,u*.72,e,i,{bend:1.4});f=Math.min(f,v.end[1]);for(const E of[-1,1])_(v.end,-Math.PI/2+p*.5+E*me(i,.55,.95)*(.7+.3*n)*(o>1?.6:1),s*.22*(.75+.25*n)*(o>1?.7:1),u*.7,o>2?2:3);if(o===1&&i()<.7&&_(v.end,-Math.PI/2+(i()-.5)*.3,s*.18,u*.55,2),g===0&&e.treeHollow){const E=Ze(m,v.end,.38);a.ellipse(E[0],E[1],u*.28,u*.5,x.NOSE,{round:.3})}}if(us(a,c,l,u*Math.sqrt(o),e,i,t),hs(a,e),e.treeWebs)for(let g=0;g+1<h.length;g+=2){const p=h[g],m=h[g+1],v=Math.hypot(m[0]-p[0],m[1]-p[1]);if(v<40*t)for(let E=0;E<=v;E++){const M=Ze(p,m,E/v);a.px(M[0],M[1]+Math.sin(E/v*Math.PI)*v*.15,x.GLINT,0,0,1)}}if(e.treeBare)return Wi(a,c,f+4*t);h.sort((g,p)=>g[1]-p[1]);for(const g of h)ui(a,R(g,[0,-3*t]),me(i,14,21)*t,me(i,10,14)*t,e,i,{mat:i()<.35?x.LEAF3:x.LEAF});for(const g of h)i()<.75&&ui(a,R(g,[me(i,-9,9)*t,me(i,-12,-3)*t]),me(i,10,15)*t,me(i,7,10)*t,e,i);return Wi(a,c,f+4*t)}function qa(i,e,t){const n=.8+.2*_r(e),r=Math.round(90*t*n),s=Math.round(160*t),a=new Ut(r,s),c=r/2,l=s;a.limb([[c,l,6*t],[c,l-s*.5,4*t],[c,6*t,1.5]],x.TRUNK,{group:10,round:e.round}),us(a,c,l,6*t,e,i,t*.6),hs(a,e);const o=Math.round(me(i,9,12));for(let u=o-1;u>=0;u--){const d=u/(o-1),h=6*t+d*s*.7,f=(5+d*36)*t*n*me(i,.9,1.1),_=(5+d*13)*t,g=[[c,h-4*t],[c+f*.5,h+_*.3],[c+f,h+_],[c+f*.7,h+_*1.15],[c,h+_*.7],[c-f*.7,h+_*1.15],[c-f,h+_],[c-f*.5,h+_*.3]];a.shape(gt(g,1,7,Math.max(2,Math.round(f/(3*t))),2*t,1),x.LEAF,{group:30+u,line:!1,round:e.round}),a.mark([[c-f,h+_*.55],[c+f,h+_*.55],[c+f,h+_*1.4],[c-f,h+_*1.4]],x.LEAF3,[x.LEAF]),a.mark([[c-f*.55,h-2*t],[c+f*.1,h-3*t],[c+f*.1,h+_*.45],[c-f*.7,h+_*.7]],x.LEAF2,[x.LEAF])}return Wi(a,c,s*.82)}function Al(i,e,t){const n=_r(e),r=Math.round(200*t*n+50*t),s=Math.round(130*t),a=new Ut(r,s),c=r/2,l=s,o=13*t,u=$n(a,[c,l],-Math.PI/2+(i()-.5)*.3,s*.3,o,o*.8,e,i,{bend:1.6}),d=[];for(let _=0;_<5;_++){const g=_%2?1:-1,p=-Math.PI/2+g*me(i,.55,1.25)*(.7+.3*n),m=$n(a,u.end,p,s*me(i,.3,.42)*(.8+.2*n),o*.55,o*.3,e,i,{group:12});d.push(m.end)}us(a,c,l,o,e,i,t),hs(a,e);for(const _ of d)ui(a,R(_,[0,-2*t]),me(i,20,28)*t,me(i,9,12)*t,e,i);ui(a,R(u.end,[0,-8*t]),24*t,11*t,e,i);let h=r,f=0;for(const _ of d)h=Math.min(h,_[0]-22*t),f=Math.max(f,_[0]+22*t);for(let _=h;_<f;_+=me(i,1,1.7)){let g=s;for(let E=0;E<s;E++)if(a.get(_,E)===x.LEAF||a.get(_,E)===x.LEAF2||a.get(_,E)===x.LEAF3){g=E;break}if(g>=s)continue;const p=Math.abs(_-c)/(r/2),m=(l-g)*me(i,.5,.9)*(1-p*.3),v=kt(_|0,1,9)<.4?x.LEAF2:x.LEAF;for(let E=g+2;E<Math.min(l-2,g+m);E++){const M=Math.round(Math.sin(E*.12+_)*.7);kt(_|0,E,5)<.2+e.density*.8&&a.px(_+M,E,(E-g)/m>.8?x.LEAF3:v,M*.3,.2,.95)}}return Wi(a,c,u.end[1]+6*t)}function Bl(i,e,t){const n=.7+.3*_r(e),r=Math.round(110*t*n),s=Math.round(155*t),a=new Ut(r,s),c=r/2,l=s,o=(i()-.5)*.25+(e.treeLean||0),u=$n(a,[c,l],-Math.PI/2+o,s*.85,5*t,2*t,e,i,{mat:x.BARK2,bend:.4});for(let h=0;h<u.pts.length-1;h++)for(let f=0;f<1;f+=1/8){const _=Ze(u.pts[h],u.pts[h+1],f+i()*.1);if(i()<.55)for(let g=-3;g<=3;g++)a.get(_[0]+g,_[1])===x.BARK2&&i()<.8&&a.recolour(_[0]+g,_[1],x.BARKD)}const d=[u.end];for(let h=0;h<7;h++){const f=me(i,.35,.9),_=Ze(u.pts[0],u.end,f),g=h%2?1:-1,p=$n(a,_,-Math.PI/2+g*me(i,.5,1),s*me(i,.12,.2)*n,2*t,1,e,i,{mat:x.BARKD,group:12});d.push(p.end)}for(const h of d)ui(a,h,me(i,9,13)*t*n,me(i,7,10)*t,e,i,{mat:x.LEAF2,ragged:1.3});return Wi(a,c,s*.55)}function Rl(i,e,t){const n=_r(e),r=Math.round(220*t*n+50*t),s=Math.round(120*t),a=new Ut(r,s),c=r/2,l=s,o=10*t,u=$n(a,[c,l],-Math.PI/2+(i()-.5)*.4*(e.gnarl+.3),s*.4,o,o*.75,e,i,{bend:1.2}),d=[];for(const _ of[-1,1,-1,1]){const g=$n(a,u.end,-Math.PI/2+_*me(i,.7,1.15)*(.7+.3*n),s*me(i,.3,.42)*(.7+.3*n),o*.55,o*.25,e,i,{group:12});d.push(g.end,Ze(u.end,g.end,.55))}us(a,c,l,o,e,i,t),hs(a,e);const h=Math.round(me(i,2,3)),f=Math.min(...d.map(_=>_[1]));for(let _=0;_<h;_++){const g=f-6*t+_*9*t,p=(95-_*12)*t*(.65+.35*n);for(let m=0;m<5;m++)ui(a,[c+(m-2)*p*.36+me(i,-5,5)*t,g+me(i,-3,3)*t],p*me(i,.2,.26),7*t,e,i,{mat:_===h-1?x.LEAF:x.LEAF3})}return Wi(a,c,u.end[1]+4*t)}function Ka(i,e,t){const n=e.leafHue+(i()-.5)*e.leafVariety*.7+(t===qa?.06:0);return{[x.TRUNK]:we(e.trunkHue,.45*e.sat,.34),[x.BARKD]:we(e.trunkHue+.03,.5*e.sat,.17),[x.BARKL]:we(e.trunkHue-.01,.38*e.sat,.5),[x.BARK2]:[222,220,212],[x.LEAF]:we(n,.62*e.sat,.58),[x.LEAF2]:we(n-.05,.55*e.sat,.8),[x.LEAF3]:we(n+.03,.66*e.sat,.38)}}function qc(i){const{sp:e,crownY:t}=i,n=new Ut(e.w,e.h),r=new Ut(e.w,e.h);for(let s=0;s<e.h;s++)for(let a=0;a<e.w;a++){const c=s*e.w+a,l=e.m[c];if(!l)continue;(Yc.has(l)&&s>=t?r:n).put(a,s,l,e.n[c*3],e.n[c*3+1],e.n[c*3+2])}return{top:n,bot:r}}function Kc(i,e){const t=e.bushSize,n=wl(i,["round","round","fern","grass","shrub"]),r=Math.round(40*t),s=Math.round(28*t),a=new Ut(r,s);if(n==="round"||n==="shrub"){const l=n==="shrub"?5:3;for(let o=0;o<l;o++)ui(a,[r/2+me(i,-9,9)*t,s-8*t+me(i,-4,2)*t],me(i,7,10)*t,me(i,5,8)*t,e,i);if(n==="shrub"||i()<e.flowers)for(let o=0;o<18*e.flowers+3;o++){const u=r/2+me(i,-12,12)*t,d=s-me(i,5,17)*t;a.get(u,d)&&a.recolour(u,d,x.FLOWER)}}else if(n==="fern")for(let l=0;l<7;l++){const o=-Math.PI/2+(l/6-.5)*2.4;let u=r/2,d=s-1;for(let h=0;h<15*t;h++)u+=Math.cos(o)*.9,d+=Math.sin(o)*.9+h*.06,a.put(u,d,l%2?x.LEAF3:x.LEAF,Math.cos(o)*.4,-.2,.9),h%2&&(a.put(u,d-1,x.LEAF2,0,-.5,.85),a.put(u+Math.sign(Math.cos(o)),d+1,x.LEAF,0,.3,.9))}else for(let l=0;l<18*t;l++){const o=r/2+me(i,-13,13)*t,u=me(i,5,15)*t,d=me(i,-3,3);for(let h=0;h<u;h++)a.put(o+d*h/u*(h/u),s-1-h,h>u*.65?x.LEAF2:h<u*.3?x.LEAF3:x.LEAF,d*.1,-.3,.9)}const c=Ka(i,e,null);return c[x.FLOWER]=we(i(),.55,.95),{sp:a,colours:c}}const st=(i,e={})=>["tree",{type:i,...e}],Fe=(i,e={})=>[i,e],Za=[{id:"moor",name:"Moor",creature:"badger",by:"Ed",leaf:.24,floor:["moss",.26,.45,.42],text:{floor:"moss",wall:"puddles, a lake",small:"long grass",big:"moss mounds"},wall:[Fe("water",{w:1.6})],small:[Fe("grass",{h:1.4})],big:[Fe("mound",{moss:!0})]},{id:"fern-forest",name:"Fern forest",creature:"boar",by:"Ed",leaf:.3,floor:["needles",.08,.45,.32],text:{floor:"pine needles",small:"ferns",big:"pine trees"},small:[Fe("fern")],big:[st("fir")]},{id:"muddy-forest",name:"Muddy forest",creature:"snail",by:"Ed",leaf:.22,floor:["mud",.07,.5,.28],text:{floor:"mud and leaves",small:"short trunks with broken branches",big:"trees with many trunks and branches"},small:[Fe("stump",{snag:!0})],big:[st("broad",{trunks:3,gnarl:.9})]},{id:"stone-shrine",name:"Stone shrine",creature:"fox",by:"Ed",leaf:.28,floor:["stony",.25,.3,.45],text:{floor:"grassy, stony",wall:"mossy henges",small:"little stones",big:"big stones",set:"a shrine"},wall:[Fe("henge")],small:[Fe("stones")],big:[Fe("boulder")],set:Fe("shrine")},{id:"tangly-forest",name:"Tangly forest",creature:"ram",by:"Ed",leaf:.27,floor:["nettles",.28,.5,.3],text:{floor:"nettles and earth",small:"tangled branches",big:"fairly short tangly trees"},small:[Fe("bramble",{bare:!0})],big:[st("broad",{scale:.7,gnarl:1})]},{id:"wispy-forest",name:"Wispy forest",creature:"woodlouse",by:"Ed",leaf:.2,floor:["leaves",.09,.55,.45],text:{floor:"dry leaves",small:"tall thin wispy trees",big:"thick trees with several trunks"},small:[st("birch",{scale:.75})],big:[st("broad",{trunks:3,thick:1.4})]},{id:"hazel-forest",name:"Hazel forest",creature:"hedgehog",by:"Ed",leaf:.26,floor:["grass",.24,.45,.45],text:{floor:"short grass",small:"brown lumps",big:"crooked trees with many branches"},small:[Fe("mound",{brown:!0})],big:[st("broad",{gnarl:1,scale:.85})]},{id:"garden",name:"Garden",creature:"squirrel",by:"Ed",leaf:.3,floor:["lawn",.27,.5,.5],text:{floor:"uniform grass",wall:"ornate stone wall",small:"manicured flower beds",big:"willows",set:"a stone pavilion"},wall:[Fe("wall")],small:[Fe("flowerbed")],big:[st("willow")],set:Fe("pavilion")},{id:"twiggy-forest",name:"Twiggy forest",creature:"wolf",by:"Ed",leaf:.29,floor:["plants",.3,.5,.38],text:{floor:"small leafy plants",small:"small trees with many thin trunks",big:"straight but slanted trees with many trunks"},small:[st("broad",{trunks:4,scale:.5,thin:!0})],big:[st("broad",{trunks:3,lean:.3,gnarl:.1})]},{id:"ancient",name:"Ancient",creature:"stag",by:"Ed",leaf:.31,floor:["roots",.1,.25,.35],text:{floor:"mossy roots over rocks",small:"sorrel",big:"giant gnarly slanted trees"},small:[Fe("flowers",{hue:.98,leafy:!0})],big:[st("broad",{scale:1.4,gnarl:1,lean:.35})]},{id:"norway",name:"Norway",creature:"stoat",by:"Ed",leaf:.36,floor:["slate",.6,.15,.35],text:{floor:"pine needles and slate",small:"rocks",big:"straight pines"},small:[Fe("stones",{big:!0})],big:[st("fir",{scale:1.2})]},{id:"alder-forest",name:"Alder forest",creature:"snake",by:"Ed",leaf:.23,floor:["tallgrass",.22,.45,.42],text:{floor:"tall and short grass",small:"tree stumps with tall grass around",big:"tall slanted trees with thin leaves at different heights"},small:[Fe("stump",{grass:!0})],big:[st("birch",{lean:.3,scale:1.2,dark:!0})]},{id:"meadow",name:"Meadow",creature:"hare",by:"draft",leaf:.25,floor:["flowers",.25,.5,.5],text:{floor:"grass and wildflowers",small:"scattered hawthorn",big:"lone oaks"},small:[Fe("shrub",{flower:[250,245,235]})],big:[st("broad",{scale:1.1})]},{id:"old-oaks",name:"Old oaks",creature:"owl",by:"draft",leaf:.22,floor:["leaves",.07,.5,.35],text:{floor:"leaf litter",small:"acorns, fallen branches",big:"ancient gnarled oaks with hollow trunks",set:"a great hollow oak"},small:[Fe("cones",{acorn:!0}),Fe("log",{branch:!0})],big:[st("broad",{gnarl:.9,hollow:!0})],set:st("broad",{scale:1.6,gnarl:1,hollow:!0})},{id:"berry-thicket",name:"Berry thicket",creature:"bear",by:"draft",leaf:.32,floor:["needles",.08,.45,.3],text:{floor:"pine needles",wall:"bramble thickets",small:"berry bushes",big:"tall pines"},wall:[Fe("bramble")],small:[Fe("shrub",{flower:[200,30,60]})],big:[st("fir",{scale:1.3})]},{id:"wetland",name:"Wetland",creature:"toad",by:"draft",leaf:.2,floor:["mud",.15,.45,.3],text:{floor:"wet mud",wall:"puddles, reeds",small:"reeds and rushes",big:"willows"},wall:[Fe("water"),Fe("reeds",{tall:!0})],small:[Fe("reeds")],big:[st("willow")]},{id:"stream",name:"Stream",creature:"otter",by:"draft",leaf:.27,floor:["pebbles",.25,.3,.45],text:{floor:"pebbles and grass",wall:"a stream or pond",small:"alder saplings",big:"alders",set:"a fallen-log bridge"},wall:[Fe("water",{w:2})],small:[st("broad",{scale:.45})],big:[st("broad",{scale:.95,gnarl:.3})],set:Fe("bridge")},{id:"rocky-slope",name:"Rocky slope",creature:"lynx",by:"draft",leaf:.34,floor:["scree",.2,.2,.42],text:{floor:"scree and moss",wall:"boulders",small:"rocks",big:"pines",set:"a rocky outcrop"},wall:[Fe("boulder",{big:!0})],small:[Fe("stones",{big:!0})],big:[st("fir")],set:Fe("outcrop")},{id:"bog",name:"Bog",creature:"elk",by:"draft",leaf:.38,floor:["moss",.18,.55,.4],text:{floor:"sphagnum moss",wall:"bog pools",small:"cotton grass",big:"spruce"},wall:[Fe("water",{bog:!0})],small:[Fe("reeds",{cotton:!0})],big:[st("fir",{dark:!0})]},{id:"deadwood",name:"Deadwood",creature:"raven",by:"draft",leaf:.15,floor:["earth",.07,.35,.3],text:{floor:"bare earth",small:"broken branches",big:"blasted dead trees"},small:[Fe("log",{branch:!0})],big:[st("broad",{bare:!0,gnarl:1})]},{id:"cave-mouth",name:"Cave mouth",creature:"bat",by:"draft",leaf:.2,floor:["stone",.08,.15,.35],text:{floor:"stone and roots",wall:"rock walls",small:"stalagmite stubs",big:"dead trees",set:"a cave mouth"},wall:[Fe("rockwall")],small:[Fe("stalagmite")],big:[st("broad",{bare:!0})],set:Fe("cave")},{id:"grassland",name:"Grassland",creature:"mole",by:"draft",leaf:.25,floor:["grass",.26,.5,.48],text:{floor:"short turf",small:"molehills",big:"lone birches"},small:[Fe("mound",{brown:!0,small:!0})],big:[st("birch")]},{id:"beaver-pond",name:"Beaver pond",creature:"beaver",by:"draft",leaf:.17,floor:["leaves",.13,.6,.5],text:{floor:"birch leaves",wall:"a pond",small:"stumps",big:"birch and aspen",set:"a beaver dam"},wall:[Fe("water",{w:2})],small:[Fe("stump",{gnawed:!0})],big:[st("birch")],set:Fe("dam")},{id:"log-pile",name:"Log pile",creature:"beetle",by:"draft",leaf:.22,floor:["leaves",.06,.5,.3],text:{floor:"rotting leaves",small:"fungi",big:"rotting logs",set:"a fallen giant"},small:[Fe("fungi")],big:[Fe("log",{rot:!0})],set:Fe("log",{rot:!0,giant:!0})},{id:"heath",name:"Heath",creature:"moth",by:"draft",leaf:.27,floor:["heather",.85,.35,.4],text:{floor:"heather",small:"gorse",big:"wind-bent birches"},small:[Fe("shrub",{flower:[250,205,40],spiky:!0})],big:[st("birch",{lean:.45,scale:.75})]},{id:"old-pinewood",name:"Old pinewood",creature:"marten",by:"draft",leaf:.35,floor:["needles",.07,.4,.3],text:{floor:"pine needles",small:"pine cones",big:"tall old pines with knotholes"},small:[Fe("cones")],big:[st("fir",{scale:1.35})]},{id:"ravine",name:"Ravine",creature:"salamander",by:"draft",leaf:.3,floor:["stone",.3,.3,.32],text:{floor:"wet moss and rock",wall:"rock walls",small:"ferns",big:"mossy boulders",set:"a waterfall"},wall:[Fe("rockwall",{moss:!0})],small:[Fe("fern")],big:[Fe("boulder",{moss:!0,big:!0})],set:Fe("waterfall")},{id:"bluebell-glade",name:"Bluebell glade",creature:"glowworm",by:"draft",leaf:.26,floor:["bluebells",.27,.45,.4],text:{floor:"bluebells",small:"ferns",big:"beeches"},small:[Fe("fern")],big:[st("broad",{gnarl:.2,scale:1.1})]},{id:"holly-thicket",name:"Holly thicket",creature:"spider",by:"draft",leaf:.36,floor:["leaves",.08,.35,.28],text:{floor:"dead leaves",wall:"holly hedges",small:"cobwebs",big:"hollies",set:"a web-hung dead tree"},wall:[Fe("hedge",{berries:!0})],small:[Fe("web")],big:[st("broad",{scale:.7,dark:!0})],set:st("broad",{bare:!0,webs:!0})},{id:"honeysuckle-tangle",name:"Honeysuckle tangle",creature:"dormouse",by:"draft",leaf:.25,floor:["clover",.27,.45,.45],text:{floor:"grass and clover",wall:"bramble",small:"honeysuckle",big:"hazel coppice"},wall:[Fe("bramble")],small:[Fe("shrub",{flower:[250,230,170]})],big:[st("broad",{trunks:5,scale:.7,thin:!0})]}],Zc=Object.fromEntries(Za.map(i=>[i.id,i]));function $c(i,e,t=64,n=48){const[r,s,a,c]=i.floor,l=new Ut(t,n),o=i.id.length*131;for(let g=0;g<n;g++)for(let p=0;p<t;p++){const m=(Zn(p/7,g/5,o)*(t-p)*(n-g)+Zn((p-t)/7,g/5,o)*p*(n-g)+Zn(p/7,(g-n)/5,o)*(t-p)*g+Zn((p-t)/7,(g-n)/5,o)*p*g)/(t*n),v=m<.38?x.BODY2:m>.64?x.BELLY:x.BODY;l.px(p,g,v,0,-.42,.91)}const u=Ki(o),d=(g,p,m)=>l.px((g%t+t)%t,(p%n+n)%n,m,0,-.42,.91),h={moss:0,needles:70,mud:25,stony:30,nettles:60,leaves:80,grass:70,lawn:30,plants:60,roots:30,slate:40,tallgrass:90,flowers:70,pebbles:60,scree:70,earth:15,stone:40,heather:90,bluebells:90,clover:60}[r]??40;for(let g=0;g<h;g++){const p=Math.floor(u()*t),m=Math.floor(u()*n);if(r==="needles"){const v=u()<.5?1:-1;for(let E=0;E<3;E++)d(p+E*v,m+(E>>1),u()<.5?x.BODY2:x.ACCENT)}else if(["grass","lawn","tallgrass","plants","nettles","clover","flowers","bluebells","heather"].includes(r)){const v=r==="tallgrass"?4:r==="lawn"?1:2;for(let E=0;E<v;E++)d(p,m-E,E===v-1?x.LEAF2:x.LEAF);(r==="flowers"||r==="bluebells"||r==="heather"||r==="clover")&&u()<.5&&d(p+1,m-v,x.FLOWER)}else if(["stony","pebbles","scree","slate","stone","roots"].includes(r)){if(d(p,m,x.ACCENT),u()<.6&&d(p+1,m,x.ACCENT),u()<.4&&d(p,m+1,x.BODY2),r==="roots"&&u()<.5)for(let v=0;v<5;v++)d(p+v,m+(v>2?1:0),x.TRUNK)}else if(r==="leaves")d(p,m,x.FLOWER),d(p+1,m,x.FLOWER),u()<.5&&d(p,m+1,x.ACCENT);else if(r==="mud"||r==="earth")for(let v=0;v<3;v++)d(p+v,m,x.BODY2)}const f={flowers:we(.13,.6,.95),bluebells:[90,110,230],heather:[180,90,170],clover:[240,235,240],leaves:we(s+.02,.65,.6)}[r]||we(s,.3,.6),_={[x.BODY]:we(s,a*e.sat,c),[x.BODY2]:we(s+.02,a*e.sat*1.1,c*.78),[x.BELLY]:we(s-.02,a*e.sat*.9,Math.min(1,c*1.15)),[x.ACCENT]:r==="needles"?we(.07,.5,.5):we(.1,.08,.62),[x.FLOWER]:f,[x.LEAF]:we(i.leaf,.55*e.sat,.45),[x.LEAF2]:we(i.leaf-.03,.5*e.sat,.62),[x.TRUNK]:we(e.trunkHue,.4,.3)};return{sp:l,colours:_}}const si=i=>({[x.ACCENT]:we(.1,.06,.6),[x.BODY2]:we(.62,.08,.4),[x.BELLY]:we(.1,.05,.78),[x.LEAF]:we(.27,.5,.45),[x.LEAF2]:we(.25,.45,.62),[x.NOSE]:[20,16,24]});function Fi(i,e,t,n,r,s,a){const c=[];for(let l=0;l<8;l++){const o=l/8*Math.PI*2,u=1+(s()-.5)*.3;c.push([e[0]+Math.cos(o)*t*u,e[1]+Math.sin(o)*n*u*(Math.sin(o)>0?.5:1)])}i.shape(c,x.ACCENT,{group:5,line:!0,round:r.round}),i.mark([R(e,[-t,n*.1]),R(e,[t,n*.1]),R(e,[t,n]),R(e,[-t,n])],x.BODY2,[x.ACCENT]),i.mark([R(e,[-t*.6,-n*.8]),R(e,[t*.1,-n*1.1]),R(e,[t*.3,-n*.5]),R(e,[-t*.3,-n*.3])],x.BELLY,[x.ACCENT]),a&&i.mark(gt([R(e,[-t*1.1,-n*.55]),R(e,[0,-n*1.3]),R(e,[t*1.1,-n*.5]),R(e,[t*.6,-n*.2]),R(e,[-t*.6,-n*.2])],0,3,3,n*.15,1),x.LEAF,[x.ACCENT,x.BELLY,x.BODY2])}function $r(i,e,t,n,r,s){const a={[x.LEAF]:we(t.leaf,.6*n.sat,.55),[x.LEAF2]:we(t.leaf-.05,.55*n.sat,.78),[x.LEAF3]:we(t.leaf+.03,.66*n.sat,.36)},c={[x.TRUNK]:we(n.trunkHue,.45*n.sat,.34),[x.BARKD]:we(n.trunkHue+.03,.5*n.sat,.17),[x.BARKL]:we(n.trunkHue-.01,.38*n.sat,.5),[x.BELLY]:we(n.trunkHue+.02,.3,.7)},l={[x.MAGIC]:[60,110,150],[x.MAGIC2]:[150,200,220],[x.BODY2]:[35,70,100]};if(i==="tree"){const g={broad:Tl,fir:qa,willow:Al,birch:Bl,flat:Rl}[e.type],p={...n,leafHue:t.leaf+(e.dark?.05:0),gnarl:e.gnarl??n.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},m=g(r,p,n.treeSize*s*(e.scale||1)*me(r,.9,1.1)),v=Ka(r,p,g);return e.dark&&(v[x.LEAF]=v[x.LEAF3],v[x.LEAF3]=we(t.leaf+.05,.7,.22)),v[x.NOSE]=[20,16,24],v[x.GLINT]=[235,235,240],{sp:m.sp,colours:v}}if(i==="shrub"){const g=Kc(r,{...n,leafHue:t.leaf,bushSize:n.bushSize*s,flowers:1});for(let p=0;p<g.sp.m.length;p++)g.sp.m[p]&&kt(p,1,3)<(e.spiky?.18:.1)&&g.sp.m[p]!==x.TRUNK&&(g.sp.m[p]=x.FLOWER);return g.colours[x.FLOWER]=e.flower,g}const o=Math.round(48*s*(e.w||1)),u=Math.round(32*s),d=new Ut(o,u),h=o/2,f=u;let _={};if(i==="grass"||i==="reeds"||i==="fern"||i==="flowers"||i==="flowerbed"){const g=i==="flowerbed"?40:24,p=(i==="reeds"?e.tall?26:20:i==="fern"?14:10*(e.h||1))*s;i==="flowerbed"&&d.shape([[h-20*s,f-2],[h-18*s,f-6*s],[h+18*s,f-6*s],[h+20*s,f-2],[h+20*s,f],[h-20*s,f]],x.ACCENT,{group:2,line:!0});for(let m=0;m<g;m++){const v=h+me(r,-16,16)*s,E=p*me(r,.5,1),M=i==="fern"?me(r,-6,6)*s:me(r,-2,2)*s,y=f-1-(i==="flowerbed"?5*s:0);for(let T=0;T<E;T++){const C=T/E;d.px(v+M*C*C,y-T,C>.7?x.LEAF2:C<.3?x.LEAF3:x.LEAF,M*.05,-.3,.9),i==="fern"&&T%2&&d.px(v+M*C*C+(M>0?1:-1),y-T+1,x.LEAF2,0,-.3,.9)}if(i==="reeds"&&(e.cotton||r()<.5))for(let T=0;T<(e.cotton?2:3);T++)d.px(v+M,y-E-T,e.cotton?x.GLINT:x.TRUNK,0,-.5,.85);(i==="flowers"||i==="flowerbed")&&r()<.7&&(d.px(v+M,y-E,x.FLOWER,0,-.5,.85),d.px(v+M+1,y-E,x.FLOWER,0,-.5,.85))}if(_={...a,[x.FLOWER]:i==="flowerbed"?wl(r,[[230,80,120],[250,210,60],[150,110,230]]):we(e.hue??.95,.6,.85),[x.TRUNK]:we(.07,.5,.35),[x.GLINT]:[240,240,235],[x.ACCENT]:we(.08,.1,.55)},i==="flowerbed"){for(let m=0;m<d.m.length;m++)d.m[m]===x.FLOWER&&kt(m,2,7)<.5&&(d.m[m]=x.MAGIC2);_[x.MAGIC2]=[250,245,240]}}else if(i==="stones"){for(let g=0;g<(e.big?3:6);g++)Fi(d,[h+me(r,-14,14)*s,f-(e.big?5:2.5)*s],(e.big?6:3)*s*me(r,.7,1.2),(e.big?5:2.5)*s,n,r);_=si()}else if(i==="boulder")Fi(d,[h,f-(e.big?11:8)*s],(e.big?18:13)*s,(e.big?12:9)*s,n,r,e.moss),_={...si(),...a,[x.ACCENT]:we(.1,.06,.6)};else if(i==="henge")d.shape([[h-7*s,f],[h-8*s,f-18*s],[h-4*s,f-28*s],[h+5*s,f-27*s],[h+8*s,f-14*s],[h+7*s,f]],x.ACCENT,{group:5,line:!0,round:n.round}),d.mark([[h-9*s,f-30*s],[h+9*s,f-30*s],[h+9*s,f-22*s],[h-9*s,f-18*s]],x.LEAF,[x.ACCENT]),_={...si(),...a};else if(i==="mound"){const g=(e.small?8:14)*s,p=(e.small?5:8)*s;d.shape(gt([[h-g,f],[h-g*.6,f-p*.8],[h,f-p],[h+g*.6,f-p*.8],[h+g,f]],0,4,e.moss?3:1,(e.moss?1.5:.8)*s,1),e.moss?x.LEAF:x.TRUNK,{group:5,round:n.round}),d.mark([[h-g,f-p*.45],[h+g,f-p*.45],[h+g,f],[h-g,f]],e.moss?x.LEAF3:x.BARKD,[e.moss?x.LEAF:x.TRUNK]),_={...a,...c,[x.TRUNK]:we(.07,.45,e.brown?.35:.3)}}else if(i==="stump"){const g=6*s;if(d.limb([[h,f,g*2.2],[h,f-8*s,g*1.6]],x.TRUNK,{group:5,round:n.round,cap:0,capEnd:0}),d.shape([[h-g*.8,f-8*s],[h,f-10*s-(e.gnawed?4*s:0)],[h+g*.8,f-8*s],[h,f-7*s]],x.BELLY,{group:6,round:n.round}),e.snag&&d.limb([[h+g*.4,f-8*s,2.5*s],[h+g*1.6,f-15*s,1.5*s]],x.TRUNK,{group:7,round:n.round}),e.grass)for(let p=0;p<20;p++){const m=h+me(r,-14,14)*s,v=me(r,6,13)*s;for(let E=0;E<v;E++)d.px(m,f-1-E,E>v*.6?x.LEAF2:x.LEAF,0,-.3,.9)}_={...a,...c}}else if(i==="log"){const g=(e.giant?46:e.branch?18:30)*s,p=(e.giant?14:e.branch?3:8)*s;if(d.limb([[h-g/2,f-p/2,p],[h+g/2,f-p/2-(e.branch?2*s:0),p*.9]],x.TRUNK,{group:5,round:n.round,cap:.3,capEnd:.3}),e.branch||d.shape([[h+g/2-p*.1,f-p],[h+g/2+p*.2,f-p/2],[h+g/2-p*.1,f],[h+g/2-p*.3,f-p/2]],x.BELLY,{group:6,round:n.round}),e.rot)for(let m=0;m<(e.giant?6:3);m++){const v=h+me(r,-g/2,g/3);d.shape([[v-3*s,f-p*.9],[v,f-p-3*s],[v+3*s,f-p*.9]],x.FLOWER,{group:7,line:!0,round:n.round})}e.branch&&d.limb([[h,f-p,p*.7],[h+5*s,f-p-6*s,p*.4]],x.TRUNK,{group:6,round:n.round}),_={...c,[x.FLOWER]:[230,190,120]}}else if(i==="fungi"){for(let g=0;g<5;g++){const p=h+me(r,-12,12)*s,m=me(r,3,7)*s,v=me(r,3,5)*s;d.limb([[p,f,1.6*s],[p,f-m,1.4*s]],x.BELLY,{group:5}),d.shape([[p-v,f-m],[p,f-m-v*.8],[p+v,f-m]],g%2?x.FLOWER:x.MAGIC,{group:6+g%2,line:!0,round:n.round})}_={[x.BELLY]:[225,215,195],[x.FLOWER]:[190,80,50],[x.MAGIC]:[120,230,200]}}else if(i==="cones"){for(let g=0;g<6;g++){const p=h+me(r,-14,14)*s,m=f-2*s;d.ellipse(p,m,(e.acorn?1.6:2)*s,(e.acorn?2:2.8)*s,x.TRUNK,{round:n.round}),e.acorn?d.ellipse(p,m-1.6*s,1.8*s,1*s,x.BARKD,{round:n.round}):d.px(p,m-1,x.BARKL)}_=c}else if(i==="water"){const g=22*s*(e.w||1),p=6*s;d.shape([[h-g,f-p],[h-g*.3,f-p*1.5],[h+g*.6,f-p*1.2],[h+g,f-p*.5],[h+g*.4,f],[h-g*.7,f-p*.2]],x.MAGIC,{group:5,round:.2});for(let m=0;m<6;m++){const v=h+me(r,-g*.6,g*.6),E=f-p*me(r,.4,1.1);for(let M=0;M<3*s;M++)d.recolour(v+M,E,x.MAGIC2)}_=e.bog?{[x.MAGIC]:[60,70,50],[x.MAGIC2]:[120,130,90]}:l;for(let m=0;m<d.m.length;m++)d.m[m]===x.MAGIC?d.m[m]=x.BODY:d.m[m]===x.MAGIC2&&(d.m[m]=x.BELLY);_={[x.BODY]:_[x.MAGIC],[x.BELLY]:_[x.MAGIC2]}}else if(i==="bramble"||i==="hedge"){const g=22*s,p=(i==="hedge"?18:12)*s;for(let m=0;m<(i==="hedge"?6:4);m++){const v=h+me(r,-g*.8,g*.8),E=f-p*me(r,.4,.7);d.ellipse(v,E,me(r,6,9)*s,p*.45,i==="hedge"?x.LEAF3:x.LEAF,{round:n.round,density:e.bare?.5:.95,noise:.5,seed:m})}for(let m=0;m<8;m++){let E=h+me(r,-g,g),M=f;for(let y=0;y<p*1.2;y++)E+=Math.sin(y*.3+m)*.8,M-=.8,d.px(E,M,x.TRUNK,0,-.3,.9)}if(i==="hedge"||e.berries||i==="bramble")for(let m=0;m<d.m.length;m++)d.m[m]&&d.m[m]!==x.TRUNK&&kt(m,5,9)<.05&&(d.m[m]=x.FLOWER);_={...a,...c,[x.FLOWER]:i==="hedge"?[210,30,40]:[70,30,70]}}else if(i==="wall"){const g=22*s,p=12*s;d.shape([[h-g,f],[h-g,f-p],[h+g,f-p],[h+g,f]],x.ACCENT,{group:5,line:!0,depth:2}),d.shape([[h-g-1,f-p],[h-g-1,f-p-2*s],[h+g+1,f-p-2*s],[h+g+1,f-p]],x.BELLY,{group:6,line:!0,depth:2}),d.shape([[h+g-6*s,f-p-2*s],[h+g-6*s,f-p-7*s],[h+g,f-p-7*s],[h+g,f-p-2*s]],x.ACCENT,{group:7,line:!0,depth:2}),d.ellipse(h+g-3*s,f-p-9*s,3*s,2.5*s,x.BELLY,{round:n.round});for(let m=f-p+3*s;m<f;m+=4*s)for(let v=h-g;v<h+g;v++)d.recolour(v,m,x.BODY2);_=si()}else if(i==="rockwall"){for(let g=0;g<5;g++)Fi(d,[h+(g-2)*9*s,f-me(r,8,14)*s],8*s,10*s,n,r,e.moss);_={...si(),...a}}else if(i==="stalagmite"){for(let g=0;g<4;g++){const p=h+me(r,-14,14)*s,m=me(r,5,11)*s;d.shape([[p-3*s,f],[p-1*s,f-m],[p+1*s,f-m],[p+3*s,f]],x.ACCENT,{group:5,line:!0,round:n.round})}_=si()}else if(i==="web"){const g=[h,f-14*s],p=11*s;for(let m=0;m<8;m++){const v=m/8*Math.PI*2;for(let E=0;E<p;E++)d.px(g[0]+Math.cos(v)*E,g[1]+Math.sin(v)*E,x.GLINT,0,0,1)}for(let m=3*s;m<p;m+=3*s)for(let v=0;v<Math.PI*2;v+=.05)d.px(g[0]+Math.cos(v)*m,g[1]+Math.sin(v)*m,x.GLINT,0,0,1);_={[x.GLINT]:[225,230,240]}}return{sp:d,colours:_}}function Jc(i,e,t,n,r,s){if(i==="tree"||i==="log")return $r(i,e,t,n,r,s);const a=Math.round(90*s),c=Math.round(70*s),l=new Ut(a,c),o=a/2,u=c;let d={...si(),[x.LEAF]:we(t.leaf,.55,.5),[x.LEAF2]:we(t.leaf-.04,.5,.7),[x.TRUNK]:we(n.trunkHue,.45,.34),[x.BARKD]:we(n.trunkHue+.03,.5,.17),[x.MAGIC]:we(n.magicHue,.6,1),[x.MAGIC2]:we(n.magicHue,.2,1)};if(i==="shrine")l.shape([[o-16*s,u],[o-14*s,u-6*s],[o+14*s,u-6*s],[o+16*s,u]],x.ACCENT,{group:5,line:!0,depth:2}),l.shape([[o-9*s,u-6*s],[o-9*s,u-26*s],[o+9*s,u-26*s],[o+9*s,u-6*s]],x.ACCENT,{group:6,line:!0,depth:2}),l.shape([[o-5*s,u-10*s],[o-5*s,u-20*s],[o,u-23*s],[o+5*s,u-20*s],[o+5*s,u-10*s]],x.NOSE,{group:7}),l.shape([[o-13*s,u-26*s],[o,u-34*s],[o+13*s,u-26*s]],x.BODY2,{group:8,line:!0,depth:2}),l.ellipse(o,u-13*s,2.5*s,2.5*s,x.MAGIC2,{round:.5}),l.mark([[o-14*s,u-36*s],[o+2*s,u-36*s],[o-4*s,u-24*s],[o-14*s,u-24*s]],x.LEAF,[x.BODY2,x.ACCENT]);else if(i==="pavilion"){l.shape([[o-26*s,u],[o-26*s,u-4*s],[o+26*s,u-4*s],[o+26*s,u]],x.ACCENT,{group:5,line:!0,depth:2});for(const h of[-20,-7,7,20])l.limb([[o+h*s,u-4*s,4*s],[o+h*s,u-34*s,4*s]],h===-7||h===7?x.BODY2:x.BELLY,{group:6+(h>0?1:0),line:!0,cap:0,capEnd:0});l.shape([[o-28*s,u-34*s],[o-28*s,u-38*s],[o+28*s,u-38*s],[o+28*s,u-34*s]],x.ACCENT,{group:8,line:!0,depth:2}),l.shape([[o-24*s,u-38*s],[o-16*s,u-54*s],[o,u-60*s],[o+16*s,u-54*s],[o+24*s,u-38*s]],x.BELLY,{group:9,line:!0})}else if(i==="bridge"){const h=$r("water",{w:1.8},t,n,r,s);for(let f=0;f<h.sp.m.length;f++){const _=f%h.sp.w,g=f/h.sp.w|0,p=Math.round(o-h.sp.w/2+_),m=u-h.sp.h+g;h.sp.m[f]&&l.inb(p,m)&&l.px(p,m,h.sp.m[f]===x.BODY?x.IRIS:x.PUPIL,0,-.42,.91)}l.limb([[o-34*s,u-6*s,9*s],[o+34*s,u-10*s,8*s]],x.TRUNK,{group:6,line:!0,cap:.3,capEnd:.3}),d[x.IRIS]=[60,110,150],d[x.PUPIL]=[150,200,220]}else if(i==="outcrop")for(const[h,f,_,g]of[[-18,14,16,13],[12,12,18,12],[-2,28,15,13],[16,34,9,9]])Fi(l,[o+h*s,u-f*s],_*s,g*s,n,r,!0);else if(i==="cave"){for(const[h,f,_,g]of[[-26,16,16,15],[26,16,16,15],[0,40,30,18],[-12,30,14,12],[12,30,14,12]])Fi(l,[o+h*s,u-f*s],_*s,g*s,n,r,f>30);l.shape([[o-15*s,u],[o-14*s,u-18*s],[o-4*s,u-28*s],[o+6*s,u-27*s],[o+14*s,u-16*s],[o+15*s,u]],x.NOSE,{group:9,line:!0})}else if(i==="dam"){const h=$r("water",{w:1.9},t,n,r,s);for(let f=0;f<h.sp.m.length;f++){const _=f%h.sp.w,g=f/h.sp.w|0,p=Math.round(o-h.sp.w/2+_),m=u-h.sp.h+g-10*s;h.sp.m[f]&&l.inb(p,m)&&l.px(p,m,h.sp.m[f]===x.BODY?x.IRIS:x.PUPIL,0,-.42,.91)}for(let f=0;f<26;f++){const _=o+me(r,-32,32)*s,g=u-me(r,2,14)*s,p=me(r,-.5,.5),m=me(r,8,16)*s;l.limb([[_-Math.cos(p)*m/2,g-Math.sin(p)*m/2,2.6*s],[_+Math.cos(p)*m/2,g+Math.sin(p)*m/2,2*s]],f%3?x.TRUNK:x.BARKD,{group:6+f%2,line:!0})}d[x.IRIS]=[60,110,150],d[x.PUPIL]=[150,200,220]}else if(i==="waterfall"){for(const[h,f,_,g]of[[-22,30,18,30],[22,30,18,30],[0,56,20,12]])Fi(l,[o+h*s,u-f*s],_*s,g*s,n,r,!0);for(let h=o-6*s;h<o+6*s;h++)for(let f=u-50*s;f<u-4*s;f++)l.px(h,f,kt(h|0,f/3|0,4)<.3?x.PUPIL:x.IRIS,0,-.2,.98);l.shape([[o-18*s,u],[o-14*s,u-6*s],[o+14*s,u-6*s],[o+18*s,u]],x.IRIS,{group:10,round:.2}),d[x.IRIS]=[90,150,190],d[x.PUPIL]=[210,235,245]}return{sp:l,colours:d}}function Qc(i,e,{K:t=2/(e.pixel||2),makeCanvas:n=yl}={}){const r=Zc[i];if(!r)throw new Error(`no area type "${i}"`);const s=Ki(i.split("").reduce((u,d)=>u*31+d.charCodeAt(0),7)>>>0),a=(u,d,h)=>({sp:Gi(u.sp,u.colours,e,"none",n),kind:d,text:h}),c=$c(r,e),l=u=>(u||[]).map(([d,h])=>a($r(d,h,r,e,s,t),d,"")),o={def:r,floor:{sp:Gi(c.sp,c.colours,e,"none",n),kind:r.floor[0],text:r.text.floor},walls:l(r.wall),small:l(r.small),big:l(r.big),setPiece:null};return o.walls.forEach(u=>u.text=r.text.wall),o.small.forEach(u=>u.text=r.text.small),o.big.forEach(u=>u.text=r.text.big),r.set&&(o.setPiece=a(Jc(r.set[0],r.set[1],r,e,s,t),r.set[0],r.text.set)),o}function jc(i,e){const t=new Map,n=new Map,r=(l,o,u)=>(l*2097152+(o+1048576))*2097152+(u+1048576),s=(l,o,u)=>{const d=r(l,o,u);let h=t.get(d);if(!h){const f=Math.pow(2,-l);h=[f*(o+xt(o*7+l,u,i)),f*(u+xt(o,u*13+l,i+1))],t.set(d,h)}return h},a=(l,o,u)=>{const d=Math.pow(2,-l),h=Math.floor(o/d),f=Math.floor(u/d);let _=h,g=f,p=1/0;for(let m=-2;m<=2;m++)for(let v=-2;v<=2;v++){const E=s(l,h+m,f+v),M=(E[0]-o)**2+(E[1]-u)**2;M<p&&(p=M,_=h+m,g=f+v)}return[_,g]},c=(l,o,u)=>{const d=r(l,o,u);let h=n.get(d);if(h)return h;if(l===0)h=[o,u];else{const f=s(l,o,u),_=a(l-1,f[0],f[1]);h=c(l-1,_[0],_[1])}return n.set(d,h),h};return{seed:i,depth:e,site:(l,o)=>s(0,l,o),partition(l,o){const u=a(e,l,o);return c(e,u[0],u[1])},centreness(l,o,u){const d=s(0,u[0],u[1]),h=Math.hypot(l-d[0],o-d[1]);let f=1/0;const _=Math.floor(l),g=Math.floor(o);for(let p=-2;p<=2;p++)for(let m=-2;m<=2;m++){const v=_+p,E=g+m;if(v===u[0]&&E===u[1])continue;const M=s(0,v,E);f=Math.min(f,Math.hypot(l-M[0],o-M[1]))}return Math.min(1,2*h/(h+f))},openness(l,o){let u=1/0,d=1/0;const h=Math.floor(l),f=Math.floor(o);for(let _=-2;_<=2;_++)for(let g=-2;g<=2;g++){const p=s(0,h+_,f+g),m=Math.hypot(l-p[0],o-p[1]);m<u?(d=u,u=m):m<d&&(d=m)}return Math.min(1,2*u/(u+d))}}}const eu=Hc.types,Jn=Za.map(i=>({id:i.id,name:i.name,creature:i.creature,text:i.text,setPiece:i.set?i.text.set??"a set piece":"",hasWalls:!!i.wall?.length,floor:[i.floor[1],i.floor[2],i.floor[3]],treeDensity:eu[i.id]?.treeDensity??1})),Ii=(i,e)=>i+","+e;function tu(i){if(i==null||i.trim()==="")return null;const e=i.trim();if(/^\d{1,9}$/.test(e))return Number(e);let t=2166136261;for(let n=0;n<e.length;n++)t=Math.imul(t^e.charCodeAt(n),16777619);return(t>>>0)%1e9}function nu(i,e,t,n){const r=new Map,s=(l,o)=>{if(l[0]===o[0]&&l[1]===o[1])return;const u=Ii(l[0],l[1]),d=Ii(o[0],o[1]);r.has(u)||r.set(u,new Set),r.has(d)||r.set(d,new Set),r.get(u).add(d),r.get(d).add(u)},a=(t-e)*n;let c=[];for(let l=0;l<=a;l++){const o=[];for(let u=0;u<=a;u++){const d=i.partition(e+u/n,e+l/n);o.push(d),u>0&&s(d,o[u-1]),l>0&&s(d,c[u])}c=o}return r}function iu(i,e){const t=e.mapAreas,n=2,r=e.areaSize*e.areaScale,s=Jn.length,a=3,c=Math.max(0,Math.min(1,e.areaSizeVariance))*a*.3,l=(F,D)=>{const O=F/r,Y=D/r;return[O+c*(So(O/a,Y/a,i+91)-.5)*2,Y+c*(So(O/a,Y/a,i+92)-.5)*2]},o=(F,D)=>{let O=F*r,Y=D*r;for(let K=0;K<30;K++){const[ie,G]=l(O,Y);O+=(F-ie)*r,Y+=(D-G)*r}return[O,Y]},u=jc(i,e.borderLayers),d=-n,h=t+n,f=nu(u,d,h,6),_=new Map,g=cr(i*5+1);for(let F=d;F<h;F++)for(let D=d;D<h;D++){const O=new Set;for(let ie=-2;ie<=2;ie++)for(let G=-2;G<=2;G++){const J=_.get(Ii(D+G,F+ie));J!==void 0&&O.add(J)}for(const ie of f.get(Ii(D,F))??[]){const G=_.get(ie);G!==void 0&&O.add(G)}const Y=[...Array(s).keys()].filter(ie=>!O.has(ie)),K=Y.length?Y:[...Array(s).keys()];_.set(Ii(D,F),K[Math.floor(g()*K.length)])}const p=(F,D)=>_.get(Ii(F,D))??Math.floor(xt(F,D,i+17)*s),m=Math.floor(t/2),v=(F,D)=>{const O=u.site(F,D),Y=u.partition(O[0],O[1]);return Y[0]===F&&Y[1]===D};let E=[m,m];for(const[F,D]of[[0,0],[1,0],[0,1],[-1,0],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]])if(v(m+F,m+D)){E=[m+F,m+D];break}const M=(F,D)=>{const O=u.site(F,D),Y=o(O[0],O[1]);return{x:Y[0],z:Y[1]}},y=M(E[0],E[1]),T=(F,D)=>{const[O,Y]=l(F,D),K=u.partition(O,Y);return{cell:K,type:p(K[0],K[1]),openness:u.openness(O,Y)}},C=4.5,b=C*2.2,A=(F,D)=>{if(Math.hypot(F-y.x,D-y.z)<b)return 0;const[O,Y]=l(F,D);return qi((u.openness(O,Y)-e.clearingSize)/Math.max(.01,e.clearingFalloff))*e.treeDensity},L=(F,D)=>{const O=Jn[p(F,D)];return O.setPiece&&xt(F,D,i+61)<e.setPieceChance?O.setPiece:null},N=(F,D)=>Math.min(1,Math.hypot(F-E[0],D-E[1])/(t/2)),z=r*.5;return{seed:i,tuning:e,n:t,margin:n,areaSize:r,partition:u,centreCell:E,dancefloor:{x:y.x,z:y.z,radius:C},start:{x:y.x,z:y.z+2},bounds:{minX:z,maxX:t*r-z,minZ:z,maxZ:t*r-z},extent:{minX:d*r,maxX:h*r,minZ:d*r,maxZ:h*r},typeOf:p,areaAt:T,siteOf:M,treeWeight:A,neighbours:f,setPieceOf:L,remoteness:N}}function ru(i,e,t=.5){const n=i.tuning,r=ki(e,0,1),s=Math.round(tn(n.creaturesNear,n.creaturesFar,Math.pow(r,n.creatureCurve))+(t-.5)*2),a=Math.min(Math.max(0,s),Math.round(n.legendsFar*qi((r-n.legendsFrom)/Math.max(.01,1-n.legendsFrom))+(t-.5)*.8)),c=Math.round(Math.max(0,s-a)*n.youngShareFar*r);return{babies:Math.max(0,s-a-c),young:c,legends:a}}const su=(i,e,t=0)=>(i.tuning.clearingSize+i.tuning.clearingFalloff*.3)*i.areaSize*.5*(e===2?.55:.8)*(1+t);function au(i){const e=[],t=i.tuning;let n=0;const[r,s]=i.centreCell;for(let a=0;a<i.n;a++)for(let c=0;c<i.n;c++){if(c===r&&a===s)continue;const l=cr(i.seed*7919+c*131+a*977+3),o=Jn[i.typeOf(c,a)],u=i.siteOf(c,a),d=i.remoteness(c,a),h=ru(i,d,xt(c,a,i.seed+43)),f=g=>{const p=su(i,g,d),m=l()*Math.PI*2,v=Math.sqrt(l())*p,E=u.x+Math.cos(m)*v,M=u.z+Math.sin(m)*v;return{id:n++,species:o.creature,cell:[c,a],level:g,homeX:u.x,homeZ:u.z,range:p,x:E,z:M,tx:E,tz:M,rest:l()*3,speed:(g===2?t.legendSpeed:t.creatureSpeed)*(.7+l()*.6),facing:l()<.5?1:-1,moving:!1,walk:l(),rand:cr(i.seed*31+n*7+11)}};for(let g=0;g<h.babies;g++)e.push(f(0));for(let g=0;g<h.young;g++)e.push(f(1));const _=c===r+1&&a===s?Math.max(1,h.legends):h.legends;for(let g=0;g<_;g++)e.push(f(2))}return e}function ou(i,e){if(i.rest>0){i.rest-=e,i.moving=!1;return}const t=i.tx-i.x,n=i.tz-i.z,r=Math.hypot(t,n);if(r<.05){const a=i.rand()*Math.PI*2,c=Math.sqrt(i.rand())*i.range;i.tx=i.homeX+Math.cos(a)*c,i.tz=i.homeZ+Math.sin(a)*c,i.rest=.8+i.rand()*3.5,i.moving=!1;return}const s=Math.min(r,i.speed*e);i.x+=t/r*s,i.z+=n/r*s,Math.abs(t)>.02&&(i.facing=t>0?1:-1),i.moving=!0,i.walk+=e*(i.level===2?1.5:4)}function lu(i,e,t,n,r){for(const s of i)Math.abs(s.homeX-e)<n&&Math.abs(s.homeZ-t)<n&&ou(s,r)}const Cl=6,cu=4,Nt=32;function uu(i){const e=i.tuning.camera.treetop.angleIn*Math.PI/180;return i.tuning.crownHeight/Math.sin(e)}function hu(i,e,t){const{treeSpacingX:n,treeSpacingZ:r}=i.tuning,s=i.seed,a=[],c=uu(i),l=i.tuning.crownHalfWidth,o=Math.ceil(t*Nt/r),u=Math.ceil((t+1)*Nt/r);for(let d=o;d<u;d++){const h=d&1?.5:0,f=Math.ceil(e*Nt/n-h),_=Math.ceil((e+1)*Nt/n-h);for(let g=f;g<_;g++){const p=(g+h+(xt(g,d,s+101)-.5)*.7)*n,m=(d+(xt(g,d,s+102)-.5)*.7)*r,v=i.areaAt(p,m);xt(g,d,s+103)>=i.treeWeight(p,m)*Jn[v.type].treeDensity||i.treeWeight(p,m-c)===0||i.treeWeight(p-l,m-c)===0||i.treeWeight(p+l,m-c)===0||a.push({x:p,z:m,type:v.type,variant:Math.floor(xt(g,d,s+104)*Cl),flip:xt(g,d,s+105)<.5})}}return a}function du(i,e,t){const n=i.tuning.bushSpacing,r=i.seed,s=[],a=Math.ceil(t*Nt/n),c=Math.ceil((t+1)*Nt/n),l=Math.ceil(e*Nt/n),o=Math.ceil((e+1)*Nt/n);for(let u=a;u<c;u++)for(let d=l;d<o;d++){const h=(d+(xt(d,u,r+201)-.5)*.9)*n,f=(u+(xt(d,u,r+202)-.5)*.9)*n;xt(d,u,r+203)>(.12+Math.min(1,i.treeWeight(h,f))*.3)*i.tuning.bushDensity||s.push({x:h,z:f,type:i.areaAt(h,f).type,variant:Math.floor(xt(d,u,r+204)*cu),flip:xt(d,u,r+205)<.5})}return s}function fu(i,e,t){const n=i.tuning.wallSpacing,r=i.seed,s=[],a=Math.ceil(t*Nt/n),c=Math.ceil((t+1)*Nt/n),l=Math.ceil(e*Nt/n),o=Math.ceil((e+1)*Nt/n);for(let u=a;u<c;u++)for(let d=l;d<o;d++){if(xt(d,u,r+303)>i.tuning.wallDensity)continue;const h=(d+(xt(d,u,r+301)-.5)*.6)*n,f=(u+(xt(d,u,r+302)-.5)*.6)*n,_=i.areaAt(h,f);_.openness<.82||!Jn[_.type].hasWalls||s.push({x:h,z:f,type:_.type,variant:Math.floor(xt(d,u,r+304)*4),flip:xt(d,u,r+305)<.5})}return s}class pu{constructor(e){this.map=e}map;trees=new Map;bushes=new Map;walls=new Map;chunks(e,t,n){const r=[];for(let s=Math.floor((t-n)/Nt);s<=Math.floor((t+n)/Nt);s++)for(let a=Math.floor((e-n)/Nt);a<=Math.floor((e+n)/Nt);a++)r.push([a,s]);return r}gather(e,t,n,r,s){e.size>600&&e.clear();const a=[];for(const[c,l]of this.chunks(n,r,s)){const o=c+","+l;let u=e.get(o);u||(u=t(c,l),e.set(o,u));for(const d of u)Math.abs(d.x-n)<=s&&Math.abs(d.z-r)<=s&&a.push(d)}return a}treesNear(e,t,n){return this.gather(this.trees,(r,s)=>hu(this.map,r,s),e,t,n)}bushesNear(e,t,n){return this.gather(this.bushes,(r,s)=>du(this.map,r,s),e,t,n)}wallsNear(e,t,n){return this.gather(this.walls,(r,s)=>fu(this.map,r,s),e,t,n)}setPiecesNear(e,t,n){const r=this.map,s=r.areaSize,a=[];for(let c=Math.floor((t-n)/s)-1;c<=Math.floor((t+n)/s)+1;c++)for(let l=Math.floor((e-n)/s)-1;l<=Math.floor((e+n)/s)+1;l++){if(l===r.centreCell[0]&&c===r.centreCell[1]||!r.setPieceOf(l,c))continue;const o=r.siteOf(l,c);Math.abs(o.x-e)<=n&&Math.abs(o.z-4-t)<=n&&a.push({x:o.x,z:o.z-4,type:r.typeOf(l,c),variant:0,flip:xt(l,c,r.seed+71)<.5})}return a}}function mu(i,e){return{x:i,z:e,vx:0,vz:0,lift:0,mode:"ground",facing:1}}const $a=(i,e)=>tn(e.groundHeight,e.treetopHeight,qi(i.lift)),Er=i=>qi(i.lift);function gu(i,e,t,n,r){let{mode:s,lift:a}=i;e.toggleMode&&(s=s==="ground"||s==="descending"?"rising":"descending"),s==="rising"?(a+=t/Math.max(.001,n.riseTime),a>=1&&(a=1,s="treetop")):s==="descending"&&(a-=t/Math.max(.001,n.descendTime),a<=0&&(a=0,s="ground"));let c=e.moveX,l=e.moveZ;const o=Math.hypot(c,l);o>1&&(c/=o,l/=o);const u=tn(n.groundSpeed,n.treetopSpeed,qi(a)),d=1-Math.exp(-n.acceleration*t);let h=i.vx+(c*u-i.vx)*d,f=i.vz+(l*u-i.vz)*d,_=i.x+h*t,g=i.z+f*t;(_<r.minX||_>r.maxX)&&(_=ki(_,r.minX,r.maxX),h=0),(g<r.minZ||g>r.maxZ)&&(g=ki(g,r.minZ,r.maxZ),f=0);const p=h>.3?1:h<-.3?-1:i.facing;return{x:_,z:g,vx:h,vz:f,lift:a,mode:s,facing:p}}function _u(i,e){const t=iu(i,e),n=mu(t.start.x,t.start.z);return{seed:i,tuning:e,map:t,forest:new pu(t),creatures:au(t),clock:kc(),witch:n,camera:Uc(e,n.x,$a(n,e),n.z)}}function xu(i,e,t){const n=Gc(i.clock,t);if(n===0)return;i.witch=gu(i.witch,e,n,i.tuning,i.map.bounds);const r=i.tuning.camera.lookAhead;i.camera=Fc(i.camera,e.zoom,{x:i.witch.x+i.witch.vx*r,y:$a(i.witch,i.tuning),z:i.witch.z+i.witch.vz*r},n,i.tuning),lu(i.creatures,i.witch.x,i.witch.z,i.tuning.creatureSimRadius,n)}const vu=i=>Oc(i.camera,i.witch.lift,i.tuning);function Ll(i){const e=i.map.areaAt(i.witch.x,i.witch.z),t=i.map.setPieceOf(e.cell[0],e.cell[1]);return Jn[e.type].name+(t?` (set piece: ${t})`:"")}const Mu="Witch tuning. Edit the numbers, push, and the playable link rebuilds. Distances are metres, times seconds, angles degrees. Keys starting with _ are notes.",Su="The forest: mapAreas x mapAreas areas cut by the fractal partition. An area is areaSize x areaScale metres across on average (areaScale 1.4 doubles the ground of the first 28 m areas; push it for bigger). areaSizeVariance (0-1) makes areas vary in size, some small, some large. borderLayers sets how wiggly borders are.",bu=20,Eu=28,yu=1.4,wu=.7,Tu=4,Au="treeDensity (0-1): the chance of a tree on each spot outside the clearings; clearingSize (0-1): how far out from an area's centre the ground stays fully open; clearingFalloff (0-1): over how much of the way to the border trees thicken, smoothly, to full density; trees sit on a staggered grid treeSpacingX by treeSpacingZ metres, so no two crowns pile up. A tree is left out where its crown (crownHalfWidth either side, crownHeight up) would hang over a clearing seen from the treetops.",Bu=.9,Ru=.15,Cu=.65,Lu=1,Du=5,Pu=3,Iu=4.5,Nu=5,Uu=3.4,Fu=4,Ou=.6,zu="Speeds per mode, and how long rising and descending take.",ku=14,Gu=32,Wu=10,Hu=.7,Vu=.55,Xu=1.4,Yu=11,qu="Near-isometric on the ground, after Transistor; lower over the treetops, looking toward the horizon to feel the speed. lookAhead: seconds of flight the camera looks ahead of the witch. a narrow field of view (fov, degrees) seen from far off, so there is little perspective. Each mode has its own angle (degrees below horizontal) and distance from the witch, at zoomed-in and zoomed-out. Zoom moves between them in zoomSteps steps.",Ku={fov:20,ground:{angleIn:38,angleOut:46,distanceIn:42,distanceOut:84},treetop:{angleIn:32,angleOut:36,distanceIn:70,distanceOut:120},lookAhead:.6,zoomSteps:4,startZoom:1,follow:6},Zu="drawRadius: metres of forest drawn on the ground, drawRadiusTreetop from the treetops; beyond detailRadius only tree crowns are drawn. haze: the twilight haze fades the forest from near to far metres from the witch. pixelSize: screen pixels per art pixel. glowReach: metres the witch's light reaches. spriteTilt: 1 = sprites face the camera fully, 0 = stand upright.",$u=3,Ju=8,Qu=1,ju=1,eh=16,th=90,nh=220,ih=85,rh={near:70,far:200},sh="bloom: a gentle glow round bright things (strength 0 or on false turns it off; threshold: how bright a pixel must be to glow). tiltShift: blurs the top and bottom of the screen so the forest looks like a miniature. strength: the blur at the screen's edges, in pixels; band: the height of the sharp band (0-1 of the screen); centre: where it sits (0 top, 0.5 middle, 1 bottom); where: 'before' blurs at the low resolution, before the pixels are scaled up, 'after' blurs the scaled-up image. Add ?tilt=before, ?tilt=after or ?tilt=off to the link to compare.",ah="shadows: a flat shadow under every tree (cast away from the moon), bush and creature. canopyShadow: a dappled shadow from the canopy overhead (height in metres), thinner in clearings, drifting with the wind. mist: a low drifting mist (height in metres above the ground). Each has on and strength.",oh={on:!0,strength:.7},lh={on:!0,strength:.45,height:8,cover:.55,wind:.6},ch={on:!0,strength:.35,height:3,wind:.8},uh={on:!0,strength:.7,threshold:.55},hh={on:!0,where:"before",strength:3,band:.4,centre:.55},dh="Creatures grow more numerous and older with an area's distance from home (0 at the dancefloor, 1 at the map's edge): creaturesNear in the areas round home, creaturesFar at the edge (creatureCurve shapes the rise), youngShareFar of them young at the edge, and legendsFar legends from legendsFrom outward. Only creatures within creatureSimRadius metres of the witch move.",fh=2,ph=20,mh=1.3,gh=.5,_h=2,xh=.55,vh=110,Mh=.6,Sh="setPieceChance: the share of areas, among the types that have a set piece, that show theirs. Wall objects (an area type's edges: puddles, henges, hedges) stand where areas meet, one per wallSpacing metres with chance wallDensity; they do not block movement.",bh=.25,Eh=.35,yh={_readme:Mu,_map:Su,mapAreas:bu,areaSize:Eu,areaScale:yu,areaSizeVariance:wu,borderLayers:Tu,_trees:Au,treeDensity:Bu,clearingSize:Ru,clearingFalloff:Cu,bushDensity:Lu,treeSpacingX:Du,treeSpacingZ:Pu,crownHalfWidth:Iu,crownHeight:Nu,bushSpacing:Uu,wallSpacing:Fu,wallDensity:Ou,_witch:zu,groundSpeed:ku,treetopSpeed:Gu,acceleration:Wu,riseTime:Hu,descendTime:Vu,groundHeight:Xu,treetopHeight:Yu,_camera:qu,camera:Ku,_look:Zu,pixelSize:$u,glowReach:Ju,glowHeight:Qu,spriteTilt:ju,artPixelsPerMetre:eh,drawRadius:th,drawRadiusTreetop:nh,detailRadius:ih,haze:rh,_post:sh,_shadows:ah,shadows:oh,canopyShadow:lh,mist:ch,bloom:uh,tiltShift:hh,_creatures:dh,creaturesNear:fh,creaturesFar:ph,creatureCurve:mh,youngShareFar:gh,legendsFar:_h,legendsFrom:xh,creatureSimRadius:vh,creatureSpeed:Mh,_setPieces:Sh,setPieceChance:bh,legendSpeed:Eh},xi=yh;class wh{keys=new Set;pressed=new Set;padPrev=[];touch={x:0,y:0,toggle:!1,zoom:0,debug:!1};onAny=null;constructor(e=window){e.addEventListener("keydown",t=>{if(t.repeat){this.isGameKey(t.code)&&t.preventDefault();return}this.keys.add(t.code),this.isGameKey(t.code)&&t.preventDefault(),this.onAny?.()||this.pressed.add(t.code)}),e.addEventListener("keyup",t=>this.keys.delete(t.code)),e.addEventListener("blur",()=>this.keys.clear())}isGameKey(e){return/^(Arrow|Space$|Key[WASDQE]$|Minus$|Equal$|NumpadAdd$|NumpadSubtract$|Backquote$)/.test(e)}clearPresses(){this.pressed.clear();const e=this.touch;e.toggle=!1,e.zoom=0,e.debug=!1}read(){const e=d=>this.keys.has(d)?1:0,t=d=>this.pressed.has(d);let n=e("KeyD")+e("ArrowRight")-e("KeyA")-e("ArrowLeft"),r=e("KeyS")+e("ArrowDown")-e("KeyW")-e("ArrowUp"),s=t("Space"),a=(t("KeyQ")||t("Minus")||t("NumpadSubtract")?1:0)-(t("KeyE")||t("Equal")||t("NumpadAdd")?1:0),c=t("Backquote");this.pressed.clear();const l=typeof navigator<"u"&&navigator.getGamepads?navigator.getGamepads():[];for(const d of l){if(!d)continue;const h=M=>!!d.buttons[M]?.pressed,_=d.buttons.some((M,y)=>M.pressed&&!this.padPrev[y])&&!!this.onAny?.(),g=M=>!_&&h(M)&&!this.padPrev[M];let p=d.axes[0]??0,m=d.axes[1]??0;const v=Math.hypot(p,m),E=.18;if(v<E)p=0,m=0;else{const M=(Math.min(1,v)-E)/(1-E)/v;p*=M,m*=M}p+=(h(15)?1:0)-(h(14)?1:0),m+=(h(13)?1:0)-(h(12)?1:0),n+=p,r+=m,g(0)&&(s=!0),(g(4)||g(6))&&(a+=1),(g(5)||g(7))&&(a-=1),g(8)&&(c=!0),this.padPrev=d.buttons.map(M=>M.pressed);break}const o=this.touch;n+=o.x,r+=o.y,o.toggle&&(s=!0),a+=o.zoom,o.debug&&(c=!0),o.toggle=!1,o.zoom=0,o.debug=!1;const u=Math.hypot(n,r);return u>1&&(n/=u,r/=u),{moveX:n,moveZ:r,toggleMode:s,zoom:Math.sign(a),debug:c}}}const Ja="186",Th=0,wo=1,Ah=2,Jr=1,Bh=2,sr=3,hi=0,Vt=1,Ln=2,In=0,lr=1,To=2,Ao=3,Bo=4,Rh=5,Di=100,Ch=101,Lh=102,Dh=103,Ph=104,Ih=200,Nh=201,Uh=202,Fh=203,Dl=204,Pl=205,Oh=206,zh=207,kh=208,Gh=209,Wh=210,Hh=211,Vh=212,Xh=213,Yh=214,ia=0,ra=1,sa=2,ur=3,aa=4,oa=5,la=6,ca=7,Il=0,qh=1,Kh=2,vn=0,Nl=1,Ul=2,Fl=3,Ol=4,zl=5,kl=6,Gl=7,Wl=300,di=301,Hi=302,bs=303,Es=304,ds=306,ua=1e3,Dn=1001,ha=1002,At=1003,Zh=1004,yr=1005,bt=1006,ys=1007,oi=1008,$t=1009,Hl=1010,Vl=1011,hr=1012,Qa=1013,Sn=1014,_n=1015,bn=1016,ja=1017,eo=1018,dr=1020,Xl=35902,Yl=35899,ql=1021,Kl=1022,rn=1023,On=1026,li=1027,Zl=1028,to=1029,fi=1030,no=1031,io=1033,Qr=33776,jr=33777,es=33778,ts=33779,da=35840,fa=35841,pa=35842,ma=35843,ga=36196,_a=37492,xa=37496,va=37488,Ma=37489,rs=37490,Sa=37491,ba=37808,Ea=37809,ya=37810,wa=37811,Ta=37812,Aa=37813,Ba=37814,Ra=37815,Ca=37816,La=37817,Da=37818,Pa=37819,Ia=37820,Na=37821,Ua=36492,Fa=36494,Oa=36495,za=36283,ka=36284,ss=36285,Ga=36286,$h=3200,Ro=0,Jh=1,un="",en="srgb",fr="srgb-linear",as="linear",ut="srgb",ws=7680,Qh=519,jh=512,ed=513,td=514,ro=515,nd=516,id=517,so=518,rd=519,sd=35044,$l=35048,Co="300 es",xn=2e3,os=2001;function ad(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function ls(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function od(){const i=ls("canvas");return i.style.display="block",i}const Lo={};function Do(...i){const e="THREE."+i.shift();console.log(e,...i)}function Jl(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function ke(...i){i=Jl(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function rt(...i){i=Jl(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Oi(...i){const e=i.join(" ");e in Lo||(Lo[e]=!0,ke(...i))}function ld(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const cd={[ia]:ra,[sa]:la,[aa]:ca,[ur]:oa,[ra]:ia,[la]:sa,[ca]:aa,[oa]:ur};class mi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const r=n[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Pt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ts=Math.PI/180,Wa=180/Math.PI;function xr(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Pt[i&255]+Pt[i>>8&255]+Pt[i>>16&255]+Pt[i>>24&255]+"-"+Pt[e&255]+Pt[e>>8&255]+"-"+Pt[e>>16&15|64]+Pt[e>>24&255]+"-"+Pt[t&63|128]+Pt[t>>8&255]+"-"+Pt[t>>16&255]+Pt[t>>24&255]+Pt[n&255]+Pt[n>>8&255]+Pt[n>>16&255]+Pt[n>>24&255]).toLowerCase()}function Je(i,e,t){return Math.max(e,Math.min(t,i))}function ud(i,e){return(i%e+e)%e}function As(i,e,t){return(1-t)*i+t*e}function Ji(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Ht(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class We{static{We.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Je(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Zi{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,c){let l=n[r+0],o=n[r+1],u=n[r+2],d=n[r+3],h=s[a+0],f=s[a+1],_=s[a+2],g=s[a+3];if(d!==g||l!==h||o!==f||u!==_){let p=l*h+o*f+u*_+d*g;p<0&&(h=-h,f=-f,_=-_,g=-g,p=-p);let m=1-c;if(p<.9995){const v=Math.acos(p),E=Math.sin(v);m=Math.sin(m*v)/E,c=Math.sin(c*v)/E,l=l*m+h*c,o=o*m+f*c,u=u*m+_*c,d=d*m+g*c}else{l=l*m+h*c,o=o*m+f*c,u=u*m+_*c,d=d*m+g*c;const v=1/Math.sqrt(l*l+o*o+u*u+d*d);l*=v,o*=v,u*=v,d*=v}}e[t]=l,e[t+1]=o,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,r,s,a){const c=n[r],l=n[r+1],o=n[r+2],u=n[r+3],d=s[a],h=s[a+1],f=s[a+2],_=s[a+3];return e[t]=c*_+u*d+l*f-o*h,e[t+1]=l*_+u*h+o*d-c*f,e[t+2]=o*_+u*f+c*h-l*d,e[t+3]=u*_-c*d-l*h-o*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,a=e._order,c=Math.cos,l=Math.sin,o=c(n/2),u=c(r/2),d=c(s/2),h=l(n/2),f=l(r/2),_=l(s/2);switch(a){case"XYZ":this._x=h*u*d+o*f*_,this._y=o*f*d-h*u*_,this._z=o*u*_+h*f*d,this._w=o*u*d-h*f*_;break;case"YXZ":this._x=h*u*d+o*f*_,this._y=o*f*d-h*u*_,this._z=o*u*_-h*f*d,this._w=o*u*d+h*f*_;break;case"ZXY":this._x=h*u*d-o*f*_,this._y=o*f*d+h*u*_,this._z=o*u*_+h*f*d,this._w=o*u*d-h*f*_;break;case"ZYX":this._x=h*u*d-o*f*_,this._y=o*f*d+h*u*_,this._z=o*u*_-h*f*d,this._w=o*u*d+h*f*_;break;case"YZX":this._x=h*u*d+o*f*_,this._y=o*f*d+h*u*_,this._z=o*u*_-h*f*d,this._w=o*u*d-h*f*_;break;case"XZY":this._x=h*u*d-o*f*_,this._y=o*f*d-h*u*_,this._z=o*u*_+h*f*d,this._w=o*u*d+h*f*_;break;default:ke("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],c=t[5],l=t[9],o=t[2],u=t[6],d=t[10],h=n+c+d;if(h>0){const f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-l)*f,this._y=(s-o)*f,this._z=(a-r)*f}else if(n>c&&n>d){const f=2*Math.sqrt(1+n-c-d);this._w=(u-l)/f,this._x=.25*f,this._y=(r+a)/f,this._z=(s+o)/f}else if(c>d){const f=2*Math.sqrt(1+c-n-d);this._w=(s-o)/f,this._x=(r+a)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+d-n-c);this._w=(a-r)/f,this._x=(s+o)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Je(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,a=e._w,c=t._x,l=t._y,o=t._z,u=t._w;return this._x=n*u+a*c+r*o-s*l,this._y=r*u+a*l+s*c-n*o,this._z=s*u+a*o+n*l-r*c,this._w=a*u-n*c-r*l-s*o,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,c=this.dot(e);c<0&&(n=-n,r=-r,s=-s,a=-a,c=-c);let l=1-t;if(c<.9995){const o=Math.acos(c),u=Math.sin(o);l=Math.sin(l*o)/u,t=Math.sin(t*o)/u,this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class H{static{H.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Po.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Po.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,c=e.z,l=e.w,o=2*(a*r-c*n),u=2*(c*t-s*r),d=2*(s*n-a*t);return this.x=t+l*o+a*d-c*u,this.y=n+l*u+c*o-s*d,this.z=r+l*d+s*u-a*o,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this.z=Je(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this.z=Je(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,a=t.x,c=t.y,l=t.z;return this.x=r*l-s*c,this.y=s*a-n*l,this.z=n*c-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Bs.copy(this).projectOnVector(e),this.sub(Bs)}reflect(e){return this.sub(Bs.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Je(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Bs=new H,Po=new Zi;class Ge{static{Ge.prototype.isMatrix3=!0}constructor(e,t,n,r,s,a,c,l,o){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,c,l,o)}set(e,t,n,r,s,a,c,l,o){const u=this.elements;return u[0]=e,u[1]=r,u[2]=c,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=a,u[8]=o,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],c=n[3],l=n[6],o=n[1],u=n[4],d=n[7],h=n[2],f=n[5],_=n[8],g=r[0],p=r[3],m=r[6],v=r[1],E=r[4],M=r[7],y=r[2],T=r[5],C=r[8];return s[0]=a*g+c*v+l*y,s[3]=a*p+c*E+l*T,s[6]=a*m+c*M+l*C,s[1]=o*g+u*v+d*y,s[4]=o*p+u*E+d*T,s[7]=o*m+u*M+d*C,s[2]=h*g+f*v+_*y,s[5]=h*p+f*E+_*T,s[8]=h*m+f*M+_*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],c=e[5],l=e[6],o=e[7],u=e[8];return t*a*u-t*c*o-n*s*u+n*c*l+r*s*o-r*a*l}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],c=e[5],l=e[6],o=e[7],u=e[8],d=u*a-c*o,h=c*l-u*s,f=o*s-a*l,_=t*d+n*h+r*f;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return e[0]=d*g,e[1]=(r*o-u*n)*g,e[2]=(c*n-r*a)*g,e[3]=h*g,e[4]=(u*t-r*l)*g,e[5]=(r*s-c*t)*g,e[6]=f*g,e[7]=(n*l-o*t)*g,e[8]=(a*t-n*s)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,c){const l=Math.cos(s),o=Math.sin(s);return this.set(n*l,n*o,-n*(l*a+o*c)+a+e,-r*o,r*l,-r*(-o*a+l*c)+c+t,0,0,1),this}scale(e,t){return Oi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Rs.makeScale(e,t)),this}rotate(e){return Oi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Rs.makeRotation(-e)),this}translate(e,t){return Oi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Rs.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Rs=new Ge,Io=new Ge().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),No=new Ge().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function hd(){const i={enabled:!0,workingColorSpace:fr,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===ut&&(r.r=Nn(r.r),r.g=Nn(r.g),r.b=Nn(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ut&&(r.r=zi(r.r),r.g=zi(r.g),r.b=zi(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===un?as:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Oi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Oi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[fr]:{primaries:e,whitePoint:n,transfer:as,toXYZ:Io,fromXYZ:No,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:en},outputColorSpaceConfig:{drawingBufferColorSpace:en}},[en]:{primaries:e,whitePoint:n,transfer:ut,toXYZ:Io,fromXYZ:No,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:en}}}),i}const $e=hd();function Nn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function zi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let vi;class dd{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{vi===void 0&&(vi=ls("canvas")),vi.width=e.width,vi.height=e.height;const r=vi.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=vi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ls("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Nn(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Nn(t[n]/255)*255):t[n]=Nn(t[n]);return{data:t,width:e.width,height:e.height}}else return ke("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let fd=0;class ao{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:fd++}),this.uuid=xr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,c=r.length;a<c;a++)r[a].isDataTexture?s.push(Cs(r[a].image)):s.push(Cs(r[a]))}else s=Cs(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function Cs(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?dd.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(ke("Texture: Unable to serialize Texture."),{})}let pd=0;const Ls=new H;class Gt extends mi{constructor(e=Gt.DEFAULT_IMAGE,t=Gt.DEFAULT_MAPPING,n=Dn,r=Dn,s=bt,a=oi,c=rn,l=$t,o=Gt.DEFAULT_ANISOTROPY,u=un){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:pd++}),this.uuid=xr(),this.name="",this.source=new ao(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=o,this.format=c,this.internalFormat=null,this.type=l,this.offset=new We(0,0),this.repeat=new We(1,1),this.center=new We(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ge,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ls).x}get height(){return this.source.getSize(Ls).y}get depth(){return this.source.getSize(Ls).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){ke(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){ke(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Wl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ua:e.x=e.x-Math.floor(e.x);break;case Dn:e.x=e.x<0?0:1;break;case ha:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ua:e.y=e.y-Math.floor(e.y);break;case Dn:e.y=e.y<0?0:1;break;case ha:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Gt.DEFAULT_IMAGE=null;Gt.DEFAULT_MAPPING=Wl;Gt.DEFAULT_ANISOTROPY=1;class vt{static{vt.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const l=e.elements,o=l[0],u=l[4],d=l[8],h=l[1],f=l[5],_=l[9],g=l[2],p=l[6],m=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-g)<.01&&Math.abs(_-p)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+g)<.1&&Math.abs(_+p)<.1&&Math.abs(o+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(o+1)/2,M=(f+1)/2,y=(m+1)/2,T=(u+h)/4,C=(d+g)/4,b=(_+p)/4;return E>M&&E>y?E<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(E),r=T/n,s=C/n):M>y?M<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(M),n=T/r,s=b/r):y<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(y),n=C/s,r=b/s),this.set(n,r,s,t),this}let v=Math.sqrt((p-_)*(p-_)+(d-g)*(d-g)+(h-u)*(h-u));return Math.abs(v)<.001&&(v=1),this.x=(p-_)/v,this.y=(d-g)/v,this.z=(h-u)/v,this.w=Math.acos((o+f+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this.z=Je(this.z,e.z,t.z),this.w=Je(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this.z=Je(this.z,e,t),this.w=Je(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class md extends mi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:bt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new vt(0,0,e,t),this.scissorTest=!1,this.viewport=new vt(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:n.depth},s=new Gt(r),a=n.count;for(let c=0;c<a;c++)this.textures[c]=s.clone(),this.textures[c].isRenderTargetTexture=!0,this.textures[c].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:bt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new ao(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class sn extends md{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Ql extends Gt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=At,this.minFilter=At,this.wrapR=Dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class gd extends Gt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=At,this.minFilter=At,this.wrapR=Dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class Et{static{Et.prototype.isMatrix4=!0}constructor(e,t,n,r,s,a,c,l,o,u,d,h,f,_,g,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,c,l,o,u,d,h,f,_,g,p)}set(e,t,n,r,s,a,c,l,o,u,d,h,f,_,g,p){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=r,m[1]=s,m[5]=a,m[9]=c,m[13]=l,m[2]=o,m[6]=u,m[10]=d,m[14]=h,m[3]=f,m[7]=_,m[11]=g,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Et().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,r=1/Mi.setFromMatrixColumn(e,0).length(),s=1/Mi.setFromMatrixColumn(e,1).length(),a=1/Mi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),c=Math.sin(n),l=Math.cos(r),o=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const h=a*u,f=a*d,_=c*u,g=c*d;t[0]=l*u,t[4]=-l*d,t[8]=o,t[1]=f+_*o,t[5]=h-g*o,t[9]=-c*l,t[2]=g-h*o,t[6]=_+f*o,t[10]=a*l}else if(e.order==="YXZ"){const h=l*u,f=l*d,_=o*u,g=o*d;t[0]=h+g*c,t[4]=_*c-f,t[8]=a*o,t[1]=a*d,t[5]=a*u,t[9]=-c,t[2]=f*c-_,t[6]=g+h*c,t[10]=a*l}else if(e.order==="ZXY"){const h=l*u,f=l*d,_=o*u,g=o*d;t[0]=h-g*c,t[4]=-a*d,t[8]=_+f*c,t[1]=f+_*c,t[5]=a*u,t[9]=g-h*c,t[2]=-a*o,t[6]=c,t[10]=a*l}else if(e.order==="ZYX"){const h=a*u,f=a*d,_=c*u,g=c*d;t[0]=l*u,t[4]=_*o-f,t[8]=h*o+g,t[1]=l*d,t[5]=g*o+h,t[9]=f*o-_,t[2]=-o,t[6]=c*l,t[10]=a*l}else if(e.order==="YZX"){const h=a*l,f=a*o,_=c*l,g=c*o;t[0]=l*u,t[4]=g-h*d,t[8]=_*d+f,t[1]=d,t[5]=a*u,t[9]=-c*u,t[2]=-o*u,t[6]=f*d+_,t[10]=h-g*d}else if(e.order==="XZY"){const h=a*l,f=a*o,_=c*l,g=c*o;t[0]=l*u,t[4]=-d,t[8]=o*u,t[1]=h*d+g,t[5]=a*u,t[9]=f*d-_,t[2]=_*d-f,t[6]=c*u,t[10]=g*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(_d,e,xd)}lookAt(e,t,n){const r=this.elements;return Kt.subVectors(e,t),Kt.lengthSq()===0&&(Kt.z=1),Kt.normalize(),Hn.crossVectors(n,Kt),Hn.lengthSq()===0&&(Math.abs(n.z)===1?Kt.x+=1e-4:Kt.z+=1e-4,Kt.normalize(),Hn.crossVectors(n,Kt)),Hn.normalize(),wr.crossVectors(Kt,Hn),r[0]=Hn.x,r[4]=wr.x,r[8]=Kt.x,r[1]=Hn.y,r[5]=wr.y,r[9]=Kt.y,r[2]=Hn.z,r[6]=wr.z,r[10]=Kt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],c=n[4],l=n[8],o=n[12],u=n[1],d=n[5],h=n[9],f=n[13],_=n[2],g=n[6],p=n[10],m=n[14],v=n[3],E=n[7],M=n[11],y=n[15],T=r[0],C=r[4],b=r[8],A=r[12],L=r[1],N=r[5],z=r[9],F=r[13],D=r[2],O=r[6],Y=r[10],K=r[14],ie=r[3],G=r[7],J=r[11],ee=r[15];return s[0]=a*T+c*L+l*D+o*ie,s[4]=a*C+c*N+l*O+o*G,s[8]=a*b+c*z+l*Y+o*J,s[12]=a*A+c*F+l*K+o*ee,s[1]=u*T+d*L+h*D+f*ie,s[5]=u*C+d*N+h*O+f*G,s[9]=u*b+d*z+h*Y+f*J,s[13]=u*A+d*F+h*K+f*ee,s[2]=_*T+g*L+p*D+m*ie,s[6]=_*C+g*N+p*O+m*G,s[10]=_*b+g*z+p*Y+m*J,s[14]=_*A+g*F+p*K+m*ee,s[3]=v*T+E*L+M*D+y*ie,s[7]=v*C+E*N+M*O+y*G,s[11]=v*b+E*z+M*Y+y*J,s[15]=v*A+E*F+M*K+y*ee,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],c=e[5],l=e[9],o=e[13],u=e[2],d=e[6],h=e[10],f=e[14],_=e[3],g=e[7],p=e[11],m=e[15],v=l*f-o*h,E=c*f-o*d,M=c*h-l*d,y=a*f-o*u,T=a*h-l*u,C=a*d-c*u;return t*(g*v-p*E+m*M)-n*(_*v-p*y+m*T)+r*(_*E-g*y+m*C)-s*(_*M-g*T+p*C)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[1],a=e[5],c=e[9],l=e[2],o=e[6],u=e[10];return t*(a*u-c*o)-n*(s*u-c*l)+r*(s*o-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],c=e[5],l=e[6],o=e[7],u=e[8],d=e[9],h=e[10],f=e[11],_=e[12],g=e[13],p=e[14],m=e[15],v=t*c-n*a,E=t*l-r*a,M=t*o-s*a,y=n*l-r*c,T=n*o-s*c,C=r*o-s*l,b=u*g-d*_,A=u*p-h*_,L=u*m-f*_,N=d*p-h*g,z=d*m-f*g,F=h*m-f*p,D=v*F-E*z+M*N+y*L-T*A+C*b;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const O=1/D;return e[0]=(c*F-l*z+o*N)*O,e[1]=(r*z-n*F-s*N)*O,e[2]=(g*C-p*T+m*y)*O,e[3]=(h*T-d*C-f*y)*O,e[4]=(l*L-a*F-o*A)*O,e[5]=(t*F-r*L+s*A)*O,e[6]=(p*M-_*C-m*E)*O,e[7]=(u*C-h*M+f*E)*O,e[8]=(a*z-c*L+o*b)*O,e[9]=(n*L-t*z-s*b)*O,e[10]=(_*T-g*M+m*v)*O,e[11]=(d*M-u*T-f*v)*O,e[12]=(c*A-a*N-l*b)*O,e[13]=(t*N-n*A+r*b)*O,e[14]=(g*E-_*y-p*v)*O,e[15]=(u*y-d*E+h*v)*O,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,c=e.y,l=e.z,o=s*a,u=s*c;return this.set(o*a+n,o*c-r*l,o*l+r*c,0,o*c+r*l,u*c+n,u*l-r*a,0,o*l-r*c,u*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,a=t._y,c=t._z,l=t._w,o=s+s,u=a+a,d=c+c,h=s*o,f=s*u,_=s*d,g=a*u,p=a*d,m=c*d,v=l*o,E=l*u,M=l*d,y=n.x,T=n.y,C=n.z;return r[0]=(1-(g+m))*y,r[1]=(f+M)*y,r[2]=(_-E)*y,r[3]=0,r[4]=(f-M)*T,r[5]=(1-(h+m))*T,r[6]=(p+v)*T,r[7]=0,r[8]=(_+E)*C,r[9]=(p-v)*C,r[10]=(1-(h+g))*C,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return n.set(1,1,1),t.identity(),this;let a=Mi.set(r[0],r[1],r[2]).length();const c=Mi.set(r[4],r[5],r[6]).length(),l=Mi.set(r[8],r[9],r[10]).length();s<0&&(a=-a),on.copy(this);const o=1/a,u=1/c,d=1/l;return on.elements[0]*=o,on.elements[1]*=o,on.elements[2]*=o,on.elements[4]*=u,on.elements[5]*=u,on.elements[6]*=u,on.elements[8]*=d,on.elements[9]*=d,on.elements[10]*=d,t.setFromRotationMatrix(on),n.x=a,n.y=c,n.z=l,this}makePerspective(e,t,n,r,s,a,c=xn,l=!1){const o=this.elements,u=2*s/(t-e),d=2*s/(n-r),h=(t+e)/(t-e),f=(n+r)/(n-r);let _,g;if(l)_=s/(a-s),g=a*s/(a-s);else if(c===xn)_=-(a+s)/(a-s),g=-2*a*s/(a-s);else if(c===os)_=-a/(a-s),g=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return o[0]=u,o[4]=0,o[8]=h,o[12]=0,o[1]=0,o[5]=d,o[9]=f,o[13]=0,o[2]=0,o[6]=0,o[10]=_,o[14]=g,o[3]=0,o[7]=0,o[11]=-1,o[15]=0,this}makeOrthographic(e,t,n,r,s,a,c=xn,l=!1){const o=this.elements,u=2/(t-e),d=2/(n-r),h=-(t+e)/(t-e),f=-(n+r)/(n-r);let _,g;if(l)_=1/(a-s),g=a/(a-s);else if(c===xn)_=-2/(a-s),g=-(a+s)/(a-s);else if(c===os)_=-1/(a-s),g=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return o[0]=u,o[4]=0,o[8]=0,o[12]=h,o[1]=0,o[5]=d,o[9]=0,o[13]=f,o[2]=0,o[6]=0,o[10]=_,o[14]=g,o[3]=0,o[7]=0,o[11]=0,o[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Mi=new H,on=new Et,_d=new H(0,0,0),xd=new H(1,1,1),Hn=new H,wr=new H,Kt=new H,Uo=new Et,Fo=new Zi;class pi{constructor(e=0,t=0,n=0,r=pi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],a=r[4],c=r[8],l=r[1],o=r[5],u=r[9],d=r[2],h=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin(Je(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,o),this._z=0);break;case"YXZ":this._x=Math.asin(-Je(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(c,f),this._z=Math.atan2(l,o)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Je(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,o)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Je(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,o));break;case"YZX":this._z=Math.asin(Je(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,o),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(c,f));break;case"XZY":this._z=Math.asin(-Je(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,o),this._y=Math.atan2(c,s)):(this._x=Math.atan2(-u,f),this._y=0);break;default:ke("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Uo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Uo,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Fo.setFromEuler(this),this.setFromQuaternion(Fo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}pi.DEFAULT_ORDER="XYZ";class jl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let vd=0;const Oo=new H,Si=new Zi,Tn=new Et,Tr=new H,Qi=new H,Md=new H,Sd=new Zi,zo=new H(1,0,0),ko=new H(0,1,0),Go=new H(0,0,1),Wo={type:"added"},bd={type:"removed"},bi={type:"childadded",child:null},Ds={type:"childremoved",child:null};class Jt extends mi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:vd++}),this.uuid=xr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Jt.DEFAULT_UP.clone();const e=new H,t=new pi,n=new Zi,r=new H(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Et},normalMatrix:{value:new Ge}}),this.matrix=new Et,this.matrixWorld=new Et,this.matrixAutoUpdate=Jt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Jt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new jl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Si.setFromAxisAngle(e,t),this.quaternion.multiply(Si),this}rotateOnWorldAxis(e,t){return Si.setFromAxisAngle(e,t),this.quaternion.premultiply(Si),this}rotateX(e){return this.rotateOnAxis(zo,e)}rotateY(e){return this.rotateOnAxis(ko,e)}rotateZ(e){return this.rotateOnAxis(Go,e)}translateOnAxis(e,t){return Oo.copy(e).applyQuaternion(this.quaternion),this.position.add(Oo.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(zo,e)}translateY(e){return this.translateOnAxis(ko,e)}translateZ(e){return this.translateOnAxis(Go,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Tn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Tr.copy(e):Tr.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Qi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Tn.lookAt(Qi,Tr,this.up):Tn.lookAt(Tr,Qi,this.up),this.quaternion.setFromRotationMatrix(Tn),r&&(Tn.extractRotation(r.matrixWorld),Si.setFromRotationMatrix(Tn),this.quaternion.premultiply(Si.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(rt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Wo),bi.child=e,this.dispatchEvent(bi),bi.child=null):rt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(bd),Ds.child=e,this.dispatchEvent(Ds),Ds.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Tn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Tn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Tn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Wo),bi.child=e,this.dispatchEvent(bi),bi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qi,e,Md),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qi,Sd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*r,s[13]+=n-s[1]*t-s[5]*n-s[9]*r,s[14]+=r-s[2]*t-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const s=this.children;for(let a=0,c=s.length;a<c;a++)s[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(c=>({...c,boundingBox:c.boundingBox?c.boundingBox.toJSON():void 0,boundingSphere:c.boundingSphere?c.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(c=>({...c})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(c,l){return c[l.uuid]===void 0&&(c[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){const l=c.shapes;if(Array.isArray(l))for(let o=0,u=l.length;o<u;o++){const d=l[o];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const c=[];for(let l=0,o=this.material.length;l<o;l++)c.push(s(e.materials,this.material[l]));r.material=c}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let c=0;c<this.children.length;c++)r.children.push(this.children[c].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let c=0;c<this.animations.length;c++){const l=this.animations[c];r.animations.push(s(e.animations,l))}}if(t){const c=a(e.geometries),l=a(e.materials),o=a(e.textures),u=a(e.images),d=a(e.shapes),h=a(e.skeletons),f=a(e.animations),_=a(e.nodes);c.length>0&&(n.geometries=c),l.length>0&&(n.materials=l),o.length>0&&(n.textures=o),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),f.length>0&&(n.animations=f),_.length>0&&(n.nodes=_)}return n.object=r,n;function a(c){const l=[];for(const o in c){const u=c[o];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Jt.DEFAULT_UP=new H(0,1,0);Jt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Jt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Ar extends Jt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ed={type:"move"};class Ps{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ar,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ar,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ar,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null;const c=this._targetRay,l=this._grip,o=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(o&&e.hand){a=!0;for(const g of e.hand.values()){const p=t.getJointPose(g,n),m=this._getHandJoint(o,g);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const u=o.joints["index-finger-tip"],d=o.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,_=.005;o.inputState.pinching&&h>f+_?(o.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!o.inputState.pinching&&h<=f-_&&(o.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));c!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(Ed)))}return c!==null&&(c.visible=r!==null),l!==null&&(l.visible=s!==null),o!==null&&(o.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ar;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const ec={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Vn={h:0,s:0,l:0},Br={h:0,s:0,l:0};function Is(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class at{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=en){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$e.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=$e.workingColorSpace){return this.r=e,this.g=t,this.b=n,$e.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=$e.workingColorSpace){if(e=ud(e,1),t=Je(t,0,1),n=Je(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Is(a,s,e+1/3),this.g=Is(a,s,e),this.b=Is(a,s,e-1/3)}return $e.colorSpaceToWorking(this,r),this}setStyle(e,t=en){function n(s){s!==void 0&&parseFloat(s)<1&&ke("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],c=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:ke("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);ke("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=en){const n=ec[e.toLowerCase()];return n!==void 0?this.setHex(n,t):ke("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Nn(e.r),this.g=Nn(e.g),this.b=Nn(e.b),this}copyLinearToSRGB(e){return this.r=zi(e.r),this.g=zi(e.g),this.b=zi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=en){return $e.workingToColorSpace(It.copy(this),e),Math.round(Je(It.r*255,0,255))*65536+Math.round(Je(It.g*255,0,255))*256+Math.round(Je(It.b*255,0,255))}getHexString(e=en){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=$e.workingColorSpace){$e.workingToColorSpace(It.copy(this),t);const n=It.r,r=It.g,s=It.b,a=Math.max(n,r,s),c=Math.min(n,r,s);let l,o;const u=(c+a)/2;if(c===a)l=0,o=0;else{const d=a-c;switch(o=u<=.5?d/(a+c):d/(2-a-c),a){case n:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-n)/d+2;break;case s:l=(n-r)/d+4;break}l/=6}return e.h=l,e.s=o,e.l=u,e}getRGB(e,t=$e.workingColorSpace){return $e.workingToColorSpace(It.copy(this),t),e.r=It.r,e.g=It.g,e.b=It.b,e}getStyle(e=en){$e.workingToColorSpace(It.copy(this),e);const t=It.r,n=It.g,r=It.b;return e!==en?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(Vn),this.setHSL(Vn.h+e,Vn.s+t,Vn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Vn),e.getHSL(Br);const n=As(Vn.h,Br.h,t),r=As(Vn.s,Br.s,t),s=As(Vn.l,Br.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const It=new at;at.NAMES=ec;class yd extends Jt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new pi,this.environmentIntensity=1,this.environmentRotation=new pi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const ln=new H,An=new H,Ns=new H,Bn=new H,Ei=new H,yi=new H,Ho=new H,Us=new H,Fs=new H,Os=new H,zs=new vt,ks=new vt,Gs=new vt;class hn{constructor(e=new H,t=new H,n=new H){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),ln.subVectors(e,t),r.cross(ln);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){ln.subVectors(r,t),An.subVectors(n,t),Ns.subVectors(e,t);const a=ln.dot(ln),c=ln.dot(An),l=ln.dot(Ns),o=An.dot(An),u=An.dot(Ns),d=a*o-c*c;if(d===0)return s.set(0,0,0),null;const h=1/d,f=(o*l-c*u)*h,_=(a*u-c*l)*h;return s.set(1-f-_,_,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Bn)===null?!1:Bn.x>=0&&Bn.y>=0&&Bn.x+Bn.y<=1}static getInterpolation(e,t,n,r,s,a,c,l){return this.getBarycoord(e,t,n,r,Bn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Bn.x),l.addScaledVector(a,Bn.y),l.addScaledVector(c,Bn.z),l)}static getInterpolatedAttribute(e,t,n,r,s,a){return zs.setScalar(0),ks.setScalar(0),Gs.setScalar(0),zs.fromBufferAttribute(e,t),ks.fromBufferAttribute(e,n),Gs.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(zs,s.x),a.addScaledVector(ks,s.y),a.addScaledVector(Gs,s.z),a}static isFrontFacing(e,t,n,r){return ln.subVectors(n,t),An.subVectors(e,t),ln.cross(An).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ln.subVectors(this.c,this.b),An.subVectors(this.a,this.b),ln.cross(An).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return hn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return hn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return hn.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return hn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return hn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let a,c;Ei.subVectors(r,n),yi.subVectors(s,n),Us.subVectors(e,n);const l=Ei.dot(Us),o=yi.dot(Us);if(l<=0&&o<=0)return t.copy(n);Fs.subVectors(e,r);const u=Ei.dot(Fs),d=yi.dot(Fs);if(u>=0&&d<=u)return t.copy(r);const h=l*d-u*o;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(Ei,a);Os.subVectors(e,s);const f=Ei.dot(Os),_=yi.dot(Os);if(_>=0&&f<=_)return t.copy(s);const g=f*o-l*_;if(g<=0&&o>=0&&_<=0)return c=o/(o-_),t.copy(n).addScaledVector(yi,c);const p=u*_-f*d;if(p<=0&&d-u>=0&&f-_>=0)return Ho.subVectors(s,r),c=(d-u)/(d-u+(f-_)),t.copy(r).addScaledVector(Ho,c);const m=1/(p+g+h);return a=g*m,c=h*m,t.copy(n).addScaledVector(Ei,a).addScaledVector(yi,c)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class vr{constructor(e=new H(1/0,1/0,1/0),t=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(cn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(cn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=cn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,c=s.count;a<c;a++)e.isMesh===!0?e.getVertexPosition(a,cn):cn.fromBufferAttribute(s,a),cn.applyMatrix4(e.matrixWorld),this.expandByPoint(cn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Rr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Rr.copy(n.boundingBox)),Rr.applyMatrix4(e.matrixWorld),this.union(Rr)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,cn),cn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ji),Cr.subVectors(this.max,ji),wi.subVectors(e.a,ji),Ti.subVectors(e.b,ji),Ai.subVectors(e.c,ji),Xn.subVectors(Ti,wi),Yn.subVectors(Ai,Ti),jn.subVectors(wi,Ai);let t=[0,-Xn.z,Xn.y,0,-Yn.z,Yn.y,0,-jn.z,jn.y,Xn.z,0,-Xn.x,Yn.z,0,-Yn.x,jn.z,0,-jn.x,-Xn.y,Xn.x,0,-Yn.y,Yn.x,0,-jn.y,jn.x,0];return!Ws(t,wi,Ti,Ai,Cr)||(t=[1,0,0,0,1,0,0,0,1],!Ws(t,wi,Ti,Ai,Cr))?!1:(Lr.crossVectors(Xn,Yn),t=[Lr.x,Lr.y,Lr.z],Ws(t,wi,Ti,Ai,Cr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,cn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(cn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Rn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Rn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Rn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Rn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Rn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Rn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Rn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Rn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Rn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Rn=[new H,new H,new H,new H,new H,new H,new H,new H],cn=new H,Rr=new vr,wi=new H,Ti=new H,Ai=new H,Xn=new H,Yn=new H,jn=new H,ji=new H,Cr=new H,Lr=new H,ei=new H;function Ws(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){ei.fromArray(i,s);const c=r.x*Math.abs(ei.x)+r.y*Math.abs(ei.y)+r.z*Math.abs(ei.z),l=e.dot(ei),o=t.dot(ei),u=n.dot(ei);if(Math.max(-Math.max(l,o,u),Math.min(l,o,u))>c)return!1}return!0}const wt=new H,Dr=new We;let wd=0;class Mn extends mi{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:wd++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=sd,this.updateRanges=[],this.gpuType=_n,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Dr.fromBufferAttribute(this,t),Dr.applyMatrix3(e),this.setXY(t,Dr.x,Dr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix3(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix4(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.applyNormalMatrix(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.transformDirection(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ji(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ht(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ji(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ht(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ji(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ht(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ji(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ht(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ji(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ht(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ht(t,this.array),n=Ht(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Ht(t,this.array),n=Ht(n,this.array),r=Ht(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=Ht(t,this.array),n=Ht(n,this.array),r=Ht(r,this.array),s=Ht(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class tc extends Mn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class nc extends Mn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Un extends Mn{constructor(e,t,n){super(new Float32Array(e),t,n)}}const Td=new vr,er=new H,Hs=new H;class oo{constructor(e=new H,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Td.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;er.subVectors(e,this.center);const t=er.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(er,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Hs.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(er.copy(e.center).add(Hs)),this.expandByPoint(er.copy(e.center).sub(Hs))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Ad=0;const jt=new Et,Vs=new Jt,Bi=new H,Zt=new vr,tr=new vr,Ct=new H;class En extends mi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ad++}),this.uuid=xr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ad(e)?nc:tc)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ge().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return jt.makeRotationFromQuaternion(e),this.applyMatrix4(jt),this}rotateX(e){return jt.makeRotationX(e),this.applyMatrix4(jt),this}rotateY(e){return jt.makeRotationY(e),this.applyMatrix4(jt),this}rotateZ(e){return jt.makeRotationZ(e),this.applyMatrix4(jt),this}translate(e,t,n){return jt.makeTranslation(e,t,n),this.applyMatrix4(jt),this}scale(e,t,n){return jt.makeScale(e,t,n),this.applyMatrix4(jt),this}lookAt(e){return Vs.lookAt(e),Vs.updateMatrix(),this.applyMatrix4(Vs.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Bi).negate(),this.translate(Bi.x,Bi.y,Bi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Un(n,3))}else{const n=Math.min(e.length,t.count);for(let r=0;r<n;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&ke("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new vr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){rt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];Zt.setFromBufferAttribute(s),this.morphTargetsRelative?(Ct.addVectors(this.boundingBox.min,Zt.min),this.boundingBox.expandByPoint(Ct),Ct.addVectors(this.boundingBox.max,Zt.max),this.boundingBox.expandByPoint(Ct)):(this.boundingBox.expandByPoint(Zt.min),this.boundingBox.expandByPoint(Zt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&rt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new oo);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){rt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new H,1/0);return}if(e){const n=this.boundingSphere.center;if(Zt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const c=t[s];tr.setFromBufferAttribute(c),this.morphTargetsRelative?(Ct.addVectors(Zt.min,tr.min),Zt.expandByPoint(Ct),Ct.addVectors(Zt.max,tr.max),Zt.expandByPoint(Ct)):(Zt.expandByPoint(tr.min),Zt.expandByPoint(tr.max))}Zt.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)Ct.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Ct));if(t)for(let s=0,a=t.length;s<a;s++){const c=t[s],l=this.morphTargetsRelative;for(let o=0,u=c.count;o<u;o++)Ct.fromBufferAttribute(c,o),l&&(Bi.fromBufferAttribute(e,o),Ct.add(Bi)),r=Math.max(r,n.distanceToSquared(Ct))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&rt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){rt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Mn(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const c=[],l=[];for(let b=0;b<n.count;b++)c[b]=new H,l[b]=new H;const o=new H,u=new H,d=new H,h=new We,f=new We,_=new We,g=new H,p=new H;function m(b,A,L){o.fromBufferAttribute(n,b),u.fromBufferAttribute(n,A),d.fromBufferAttribute(n,L),h.fromBufferAttribute(s,b),f.fromBufferAttribute(s,A),_.fromBufferAttribute(s,L),u.sub(o),d.sub(o),f.sub(h),_.sub(h);const N=1/(f.x*_.y-_.x*f.y);isFinite(N)&&(g.copy(u).multiplyScalar(_.y).addScaledVector(d,-f.y).multiplyScalar(N),p.copy(d).multiplyScalar(f.x).addScaledVector(u,-_.x).multiplyScalar(N),c[b].add(g),c[A].add(g),c[L].add(g),l[b].add(p),l[A].add(p),l[L].add(p))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let b=0,A=v.length;b<A;++b){const L=v[b],N=L.start,z=L.count;for(let F=N,D=N+z;F<D;F+=3)m(e.getX(F+0),e.getX(F+1),e.getX(F+2))}const E=new H,M=new H,y=new H,T=new H;function C(b){y.fromBufferAttribute(r,b),T.copy(y);const A=c[b];E.copy(A),E.sub(y.multiplyScalar(y.dot(A))).normalize(),M.crossVectors(T,A);const N=M.dot(l[b])<0?-1:1;a.setXYZW(b,E.x,E.y,E.z,N)}for(let b=0,A=v.length;b<A;++b){const L=v[b],N=L.start,z=L.count;for(let F=N,D=N+z;F<D;F+=3)C(e.getX(F+0)),C(e.getX(F+1)),C(e.getX(F+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Mn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,f=n.count;h<f;h++)n.setXYZ(h,0,0,0);const r=new H,s=new H,a=new H,c=new H,l=new H,o=new H,u=new H,d=new H;if(e)for(let h=0,f=e.count;h<f;h+=3){const _=e.getX(h+0),g=e.getX(h+1),p=e.getX(h+2);r.fromBufferAttribute(t,_),s.fromBufferAttribute(t,g),a.fromBufferAttribute(t,p),u.subVectors(a,s),d.subVectors(r,s),u.cross(d),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),o.fromBufferAttribute(n,p),c.add(u),l.add(u),o.add(u),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(p,o.x,o.y,o.z)}else for(let h=0,f=t.count;h<f;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,s),d.subVectors(r,s),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ct.fromBufferAttribute(e,t),Ct.normalize(),e.setXYZ(t,Ct.x,Ct.y,Ct.z)}toNonIndexed(){function e(c,l){const o=c.array,u=c.itemSize,d=c.normalized,h=new o.constructor(l.length*u);let f=0,_=0;for(let g=0,p=l.length;g<p;g++){c.isInterleavedBufferAttribute?f=l[g]*c.data.stride+c.offset:f=l[g]*u;for(let m=0;m<u;m++)h[_++]=o[f++]}return new Mn(h,u,d)}if(this.index===null)return ke("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new En,n=this.index.array,r=this.attributes;for(const c in r){const l=r[c],o=e(l,n);t.setAttribute(c,o)}const s=this.morphAttributes;for(const c in s){const l=[],o=s[c];for(let u=0,d=o.length;u<d;u++){const h=o[u],f=e(h,n);l.push(f)}t.morphAttributes[c]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let c=0,l=a.length;c<l;c++){const o=a[c];t.addGroup(o.start,o.count,o.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const o in l)l[o]!==void 0&&(e[o]=l[o]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const o=n[l];e.data.attributes[l]=o.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const o=this.morphAttributes[l],u=[];for(let d=0,h=o.length;d<h;d++){const f=o[d];u.push(f.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const c=this.boundingSphere;return c!==null&&(e.data.boundingSphere=c.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const r=e.attributes;for(const o in r){const u=r[o];this.setAttribute(o,u.clone(t))}const s=e.morphAttributes;for(const o in s){const u=[],d=s[o];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(t));this.morphAttributes[o]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let o=0,u=a.length;o<u;o++){const d=a[o];this.addGroup(d.start,d.count,d.materialIndex)}const c=e.boundingBox;c!==null&&(this.boundingBox=c.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Xs=new H,Bd=new H,Rd=new Ge;class Kn{constructor(e=new H(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=Xs.subVectors(n,t).cross(Bd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const r=e.delta(Xs),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Rd.getNormalMatrix(e),r=this.coplanarPoint(Xs).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let Cd=0;class fs extends mi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Cd++}),this.uuid=xr(),this.name="",this.type="Material",this.blending=lr,this.side=hi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Dl,this.blendDst=Pl,this.blendEquation=Di,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new at(0,0,0),this.blendAlpha=0,this.depthFunc=ur,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Qh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ws,this.stencilZFail=ws,this.stencilZPass=ws,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){ke(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){ke(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const c in s){const l=s[c];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new at().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new Kn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new We().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new We().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Cn=new H,Ys=new H,Pr=new H,Ir=new H;class Ld{constructor(e=new H,t=new H(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Cn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Cn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Cn.copy(this.origin).addScaledVector(this.direction,t),Cn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Ys.copy(e).add(t).multiplyScalar(.5),Pr.copy(t).sub(e).normalize(),Ir.copy(this.origin).sub(Ys);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Pr),c=Ir.dot(this.direction),l=-Ir.dot(Pr),o=Ir.lengthSq(),u=Math.abs(1-a*a);let d,h,f,_;if(u>0)if(d=a*l-c,h=a*c-l,_=s*u,d>=0)if(h>=-_)if(h<=_){const g=1/u;d*=g,h*=g,f=d*(d+a*h+2*c)+h*(a*d+h+2*l)+o}else h=s,d=Math.max(0,-(a*h+c)),f=-d*d+h*(h+2*l)+o;else h=-s,d=Math.max(0,-(a*h+c)),f=-d*d+h*(h+2*l)+o;else h<=-_?(d=Math.max(0,-(-a*s+c)),h=d>0?-s:Math.min(Math.max(-s,-l),s),f=-d*d+h*(h+2*l)+o):h<=_?(d=0,h=Math.min(Math.max(-s,-l),s),f=h*(h+2*l)+o):(d=Math.max(0,-(a*s+c)),h=d>0?s:Math.min(Math.max(-s,-l),s),f=-d*d+h*(h+2*l)+o);else h=a>0?-s:s,d=Math.max(0,-(a*h+c)),f=-d*d+h*(h+2*l)+o;return n&&n.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Ys).addScaledVector(Pr,h),f}intersectSphere(e,t){if(e.radius<0)return null;Cn.subVectors(e.center,this.origin);const n=Cn.dot(this.direction),r=Cn.dot(Cn)-n*n,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),c=n-a,l=n+a;return l<0?null:c<0?this.at(l,t):this.at(c,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,c,l;const o=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return o>=0?(n=(e.min.x-h.x)*o,r=(e.max.x-h.x)*o):(n=(e.max.x-h.x)*o,r=(e.min.x-h.x)*o),u>=0?(s=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),d>=0?(c=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(c=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),n>l||c>r)||((c>n||n!==n)&&(n=c),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Cn)!==null}intersectTriangle(e,t,n,r,s){const a=this.origin,c=this.direction,l=c.x,o=c.y,u=c.z,d=e.x-a.x,h=e.y-a.y,f=e.z-a.z,_=t.x-a.x,g=t.y-a.y,p=t.z-a.z,m=n.x-a.x,v=n.y-a.y,E=n.z-a.z,M=Math.abs(l),y=Math.abs(o),T=Math.abs(u);let C,b,A,L,N,z,F,D,O,Y,K,ie;if(M>=y&&M>=T?(A=l,z=d,O=_,ie=m,l>=0?(C=o,b=u,L=h,N=f,F=g,D=p,Y=v,K=E):(C=u,b=o,L=f,N=h,F=p,D=g,Y=E,K=v)):y>=T?(A=o,z=h,O=g,ie=v,o>=0?(C=u,b=l,L=f,N=d,F=p,D=_,Y=E,K=m):(C=l,b=u,L=d,N=f,F=_,D=p,Y=m,K=E)):(A=u,z=f,O=p,ie=E,u>=0?(C=l,b=o,L=d,N=h,F=_,D=g,Y=m,K=v):(C=o,b=l,L=h,N=d,F=g,D=_,Y=v,K=m)),A===0)return null;const G=C/A,J=b/A,ee=1/A,Te=L-G*z,Re=N-J*z,ct=F-G*O,qe=D-J*O,Qe=Y-G*ie,Q=K-J*ie,re=Qe*qe-Q*ct,be=Te*Q-Re*Qe,ze=ct*Re-qe*Te;if(r){if(re<0||be<0||ze<0)return null}else if((re<0||be<0||ze<0)&&(re>0||be>0||ze>0))return null;const Se=re+be+ze;if(Se===0)return null;const Z=ee*(re*z+be*O+ze*ie);return(Se>0?Z<0:Z>0)?null:this.at(Z/Se,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ic extends fs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new at(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new pi,this.combine=Il,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Vo=new Et,ti=new Ld,Nr=new oo,Xo=new H,Ur=new H,Fr=new H,Or=new H,qs=new H,zr=new H,Yo=new H,kr=new H;class Wt extends Jt{constructor(e=new En,t=new ic){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const c=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const c=this.morphTargetInfluences;if(s&&c){zr.set(0,0,0);for(let l=0,o=s.length;l<o;l++){const u=c[l],d=s[l];u!==0&&(qs.fromBufferAttribute(d,e),a?zr.addScaledVector(qs,u):zr.addScaledVector(qs.sub(t),u))}t.add(zr)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Nr.copy(n.boundingSphere),Nr.applyMatrix4(s),ti.copy(e.ray).recast(e.near),!(Nr.containsPoint(ti.origin)===!1&&(ti.intersectSphere(Nr,Xo)===null||ti.origin.distanceToSquared(Xo)>(e.far-e.near)**2))&&(Vo.copy(s).invert(),ti.copy(e.ray).applyMatrix4(Vo),!(n.boundingBox!==null&&ti.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ti)))}_computeIntersections(e,t,n){let r;const s=this.geometry,a=this.material,c=s.index,l=s.attributes.position,o=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,h=s.groups,f=s.drawRange;if(c!==null)if(Array.isArray(a))for(let _=0,g=h.length;_<g;_++){const p=h[_],m=a[p.materialIndex],v=Math.max(p.start,f.start),E=Math.min(c.count,Math.min(p.start+p.count,f.start+f.count));for(let M=v,y=E;M<y;M+=3){const T=c.getX(M),C=c.getX(M+1),b=c.getX(M+2);r=Gr(this,m,e,n,o,u,d,T,C,b),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const _=Math.max(0,f.start),g=Math.min(c.count,f.start+f.count);for(let p=_,m=g;p<m;p+=3){const v=c.getX(p),E=c.getX(p+1),M=c.getX(p+2);r=Gr(this,a,e,n,o,u,d,v,E,M),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,g=h.length;_<g;_++){const p=h[_],m=a[p.materialIndex],v=Math.max(p.start,f.start),E=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let M=v,y=E;M<y;M+=3){const T=M,C=M+1,b=M+2;r=Gr(this,m,e,n,o,u,d,T,C,b),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const _=Math.max(0,f.start),g=Math.min(l.count,f.start+f.count);for(let p=_,m=g;p<m;p+=3){const v=p,E=p+1,M=p+2;r=Gr(this,a,e,n,o,u,d,v,E,M),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}}}function Dd(i,e,t,n,r,s,a,c){let l;if(e.side===Vt?l=n.intersectTriangle(a,s,r,!0,c):l=n.intersectTriangle(r,s,a,e.side===hi,c),l===null)return null;kr.copy(c),kr.applyMatrix4(i.matrixWorld);const o=t.ray.origin.distanceTo(kr);return o<t.near||o>t.far?null:{distance:o,point:kr.clone(),object:i}}function Gr(i,e,t,n,r,s,a,c,l,o){i.getVertexPosition(c,Ur),i.getVertexPosition(l,Fr),i.getVertexPosition(o,Or);const u=Dd(i,e,t,n,Ur,Fr,Or,Yo);if(u){const d=new H;hn.getBarycoord(Yo,Ur,Fr,Or,d),r&&(u.uv=hn.getInterpolatedAttribute(r,c,l,o,d,new We)),s&&(u.uv1=hn.getInterpolatedAttribute(s,c,l,o,d,new We)),a&&(u.normal=hn.getInterpolatedAttribute(a,c,l,o,d,new H),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a:c,b:l,c:o,normal:new H,materialIndex:0};hn.getNormal(Ur,Fr,Or,h.normal),u.face=h,u.barycoord=d}return u}class Ni extends Gt{constructor(e=null,t=1,n=1,r,s,a,c,l,o=At,u=At,d,h){super(null,a,c,l,o,u,r,s,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class rc extends Mn{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ni=new oo,Pd=new We(.5,.5),Wr=new H;class sc{constructor(e=new Kn,t=new Kn,n=new Kn,r=new Kn,s=new Kn,a=new Kn){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){const c=this.planes;return c[0].copy(e),c[1].copy(t),c[2].copy(n),c[3].copy(r),c[4].copy(s),c[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=xn,n=!1){const r=this.planes,s=e.elements,a=s[0],c=s[1],l=s[2],o=s[3],u=s[4],d=s[5],h=s[6],f=s[7],_=s[8],g=s[9],p=s[10],m=s[11],v=s[12],E=s[13],M=s[14],y=s[15];if(r[0].setComponents(o-a,f-u,m-_,y-v).normalize(),r[1].setComponents(o+a,f+u,m+_,y+v).normalize(),r[2].setComponents(o+c,f+d,m+g,y+E).normalize(),r[3].setComponents(o-c,f-d,m-g,y-E).normalize(),n)r[4].setComponents(l,h,p,M).normalize(),r[5].setComponents(o-l,f-h,m-p,y-M).normalize();else if(r[4].setComponents(o-l,f-h,m-p,y-M).normalize(),t===xn)r[5].setComponents(o+l,f+h,m+p,y+M).normalize();else if(t===os)r[5].setComponents(l,h,p,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ni.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ni.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ni)}intersectsSprite(e){ni.center.set(0,0,0);const t=Pd.distanceTo(e.center);return ni.radius=.7071067811865476+t,ni.applyMatrix4(e.matrixWorld),this.intersectsSphere(ni)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(Wr.x=r.normal.x>0?e.max.x:e.min.x,Wr.y=r.normal.y>0?e.max.y:e.min.y,Wr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Wr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ac extends Gt{constructor(e=[],t=di,n,r,s,a,c,l,o,u){super(e,t,n,r,s,a,c,l,o,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class pr extends Gt{constructor(e,t,n=Sn,r,s,a,c=At,l=At,o,u=On,d=1){if(u!==On&&u!==li)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:d};super(h,r,s,a,c,l,u,n,o),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ao(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class Id extends pr{constructor(e,t=Sn,n=di,r,s,a=At,c=At,l,o=On){const u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,r,s,a,c,l,o),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class oc extends Gt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Mr extends En{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const c=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],o=[],u=[],d=[];let h=0,f=0;_("z","y","x",-1,-1,n,t,e,a,s,0),_("z","y","x",1,-1,n,t,-e,a,s,1),_("x","z","y",1,1,e,n,t,r,a,2),_("x","z","y",1,-1,e,n,-t,r,a,3),_("x","y","z",1,-1,e,t,n,r,s,4),_("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new Un(o,3)),this.setAttribute("normal",new Un(u,3)),this.setAttribute("uv",new Un(d,2));function _(g,p,m,v,E,M,y,T,C,b,A){const L=M/C,N=y/b,z=M/2,F=y/2,D=T/2,O=C+1,Y=b+1;let K=0,ie=0;const G=new H;for(let J=0;J<Y;J++){const ee=J*N-F;for(let Te=0;Te<O;Te++){const Re=Te*L-z;G[g]=Re*v,G[p]=ee*E,G[m]=D,o.push(G.x,G.y,G.z),G[g]=0,G[p]=0,G[m]=T>0?1:-1,u.push(G.x,G.y,G.z),d.push(Te/C),d.push(1-J/b),K+=1}}for(let J=0;J<b;J++)for(let ee=0;ee<C;ee++){const Te=h+ee+O*J,Re=h+ee+O*(J+1),ct=h+(ee+1)+O*(J+1),qe=h+(ee+1)+O*J;l.push(Te,Re,qe),l.push(Re,ct,qe),ie+=6}c.addGroup(f,ie,A),f+=ie,h+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class yn extends En{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,a=t/2,c=Math.floor(n),l=Math.floor(r),o=c+1,u=l+1,d=e/c,h=t/l,f=[],_=[],g=[],p=[];for(let m=0;m<u;m++){const v=m*h-a;for(let E=0;E<o;E++){const M=E*d-s;_.push(M,-v,0),g.push(0,0,1),p.push(E/c),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let v=0;v<c;v++){const E=v+o*m,M=v+o*(m+1),y=v+1+o*(m+1),T=v+1+o*m;f.push(E,M,T),f.push(M,y,T)}this.setIndex(f),this.setAttribute("position",new Un(_,3)),this.setAttribute("normal",new Un(g,3)),this.setAttribute("uv",new Un(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yn(e.width,e.height,e.widthSegments,e.heightSegments)}}function Vi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];if(qo(r))r.isRenderTargetTexture?(ke("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone();else if(Array.isArray(r))if(qo(r[0])){const s=[];for(let a=0,c=r.length;a<c;a++)s[a]=r[a].clone();e[t][n]=s}else e[t][n]=r.slice();else e[t][n]=r}}return e}function zt(i){const e={};for(let t=0;t<i.length;t++){const n=Vi(i[t]);for(const r in n)e[r]=n[r]}return e}function qo(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Nd(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function lc(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:$e.workingColorSpace}const Ud={clone:Vi,merge:zt};var Fd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Od=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ft extends fs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Fd,this.fragmentShader=Od,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Vi(e.uniforms),this.uniformsGroups=Nd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case"t":this.uniforms[n].value=t[r.value]||null;break;case"c":this.uniforms[n].value=new at().setHex(r.value);break;case"v2":this.uniforms[n].value=new We().fromArray(r.value);break;case"v3":this.uniforms[n].value=new H().fromArray(r.value);break;case"v4":this.uniforms[n].value=new vt().fromArray(r.value);break;case"m3":this.uniforms[n].value=new Ge().fromArray(r.value);break;case"m4":this.uniforms[n].value=new Et().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class zd extends Ft{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class kd extends fs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=$h,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Gd extends fs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Hr=new H,Vr=new Zi,pn=new H;class cc extends Jt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Et,this.projectionMatrix=new Et,this.projectionMatrixInverse=new Et,this.coordinateSystem=xn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Hr,Vr,pn),pn.x===1&&pn.y===1&&pn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Hr,Vr,pn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Hr,Vr,pn),pn.x===1&&pn.y===1&&pn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Hr,Vr,pn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const qn=new H,Ko=new We,Zo=new We;class nn extends cc{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Wa*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ts*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Wa*2*Math.atan(Math.tan(Ts*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){qn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(qn.x,qn.y).multiplyScalar(-e/qn.z),qn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(qn.x,qn.y).multiplyScalar(-e/qn.z)}getViewSize(e,t){return this.getViewBounds(e,Ko,Zo),t.subVectors(Zo,Ko)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ts*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,o=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*n/o,r*=a.width/l,n*=a.height/o}const c=this.filmOffset;c!==0&&(s+=e*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class lo extends cc{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,a=n+e,c=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const o=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=o*this.view.offsetX,a=s+o*this.view.width,c-=u*this.view.offsetY,l=c-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,c,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class uc extends En{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}const Ri=-90,Ci=1;class Wd extends Jt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new nn(Ri,Ci,e,t);r.layers=this.layers,this.add(r);const s=new nn(Ri,Ci,e,t);s.layers=this.layers,this.add(s);const a=new nn(Ri,Ci,e,t);a.layers=this.layers,this.add(a);const c=new nn(Ri,Ci,e,t);c.layers=this.layers,this.add(c);const l=new nn(Ri,Ci,e,t);l.layers=this.layers,this.add(l);const o=new nn(Ri,Ci,e,t);o.layers=this.layers,this.add(o)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,c,l]=t;for(const o of t)this.remove(o);if(e===xn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===os)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const o of t)this.add(o),o.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,c,l,o,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(n,0,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,3,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),n.texture.generateMipmaps=g,e.setRenderTarget(n,5,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,h,f),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class Hd extends nn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class hc{static{hc.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=r,this}}function $o(i,e,t,n){const r=Vd(n);switch(t){case ql:return i*e;case Zl:return i*e/r.components*r.byteLength;case to:return i*e/r.components*r.byteLength;case fi:return i*e*2/r.components*r.byteLength;case no:return i*e*2/r.components*r.byteLength;case Kl:return i*e*3/r.components*r.byteLength;case rn:return i*e*4/r.components*r.byteLength;case io:return i*e*4/r.components*r.byteLength;case Qr:case jr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case es:case ts:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case fa:case ma:return Math.max(i,16)*Math.max(e,8)/4;case da:case pa:return Math.max(i,8)*Math.max(e,8)/2;case ga:case _a:case va:case Ma:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case xa:case rs:case Sa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ba:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ea:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case ya:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case wa:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Ta:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Aa:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Ba:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Ra:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Ca:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case La:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Da:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Pa:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Ia:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Na:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Ua:case Fa:case Oa:return Math.ceil(i/4)*Math.ceil(e/4)*16;case za:case ka:return Math.ceil(i/4)*Math.ceil(e/4)*8;case ss:case Ga:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Vd(i){switch(i){case $t:case Hl:return{byteLength:1,components:1};case hr:case Vl:case bn:return{byteLength:2,components:1};case ja:case eo:return{byteLength:2,components:4};case Sn:case Qa:case _n:return{byteLength:4,components:1};case Xl:case Yl:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ja}}));typeof window<"u"&&(window.__THREE__?ke("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ja);function dc(){let i=null,e=!1,t=null,n=null;function r(s,a){n=i.requestAnimationFrame(r),t(s,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function Xd(i){const e=new WeakMap;function t(c,l){const o=c.array,u=c.usage,d=o.byteLength,h=i.createBuffer();i.bindBuffer(l,h),i.bufferData(l,o,u),c.onUploadCallback();let f;if(o instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&o instanceof Float16Array)f=i.HALF_FLOAT;else if(o instanceof Uint16Array)c.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(o instanceof Int16Array)f=i.SHORT;else if(o instanceof Uint32Array)f=i.UNSIGNED_INT;else if(o instanceof Int32Array)f=i.INT;else if(o instanceof Int8Array)f=i.BYTE;else if(o instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(o instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+o);return{buffer:h,type:f,bytesPerElement:o.BYTES_PER_ELEMENT,version:c.version,size:d}}function n(c,l,o){const u=l.array,d=l.updateRanges;if(i.bindBuffer(o,c),d.length===0)i.bufferSubData(o,0,u);else{d.sort((f,_)=>f.start-_.start);let h=0;for(let f=1;f<d.length;f++){const _=d[h],g=d[f];g.start<=_.start+_.count+1?_.count=Math.max(_.count,g.start+g.count-_.start):(++h,d[h]=g)}d.length=h+1;for(let f=0,_=d.length;f<_;f++){const g=d[f];i.bufferSubData(o,g.start*u.BYTES_PER_ELEMENT,u,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(c){return c.isInterleavedBufferAttribute&&(c=c.data),e.get(c)}function s(c){c.isInterleavedBufferAttribute&&(c=c.data);const l=e.get(c);l&&(i.deleteBuffer(l.buffer),e.delete(c))}function a(c,l){if(c.isInterleavedBufferAttribute&&(c=c.data),c.isGLBufferAttribute){const u=e.get(c);(!u||u.version<c.version)&&e.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}const o=e.get(c);if(o===void 0)e.set(c,t(c,l));else if(o.version<c.version){if(o.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(o.buffer,c,l),o.version=c.version}}return{get:r,remove:s,update:a}}var Yd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,qd=`#ifdef USE_ALPHAHASH
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
#endif`,Kd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Zd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,$d=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Jd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Qd=`#ifdef USE_AOMAP
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
#endif`,jd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ef=`#ifdef USE_BATCHING
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
#endif`,tf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,nf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,rf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,sf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,af=`#ifdef USE_IRIDESCENCE
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
#endif`,of=`#ifdef USE_BUMPMAP
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
#endif`,lf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,cf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,uf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,hf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,df=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,ff=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,pf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,mf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,gf=`#define PI 3.141592653589793
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
} // validated`,_f=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,xf=`vec3 transformedNormal = objectNormal;
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
#endif`,vf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Mf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Sf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,bf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ef="gl_FragColor = linearToOutputTexel( gl_FragColor );",yf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,wf=`#ifdef USE_ENVMAP
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
#endif`,Tf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Af=`#ifdef USE_ENVMAP
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
#endif`,Bf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Rf=`#ifdef USE_ENVMAP
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
#endif`,Cf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Lf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Df=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Pf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,If=`#ifdef USE_GRADIENTMAP
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
}`,Nf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Uf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ff=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Of=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,zf=`#ifdef USE_ENVMAP
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
#endif`,kf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Gf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Wf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Hf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Vf=`PhysicalMaterial material;
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
#endif`,Xf=`uniform sampler2D dfgLUT;
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
}`,Yf=`
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
#endif`,qf=`#if defined( RE_IndirectDiffuse )
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
#endif`,Kf=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Zf=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,$f=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Jf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Qf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,jf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ep=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,tp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,np=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,ip=`#if defined( USE_POINTS_UV )
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
#endif`,rp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,sp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ap=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,op=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,lp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,cp=`#ifdef USE_MORPHTARGETS
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
#endif`,up=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,hp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,dp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,fp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,gp=`#ifdef USE_NORMALMAP
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
#endif`,_p=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,xp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,vp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Mp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Sp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,bp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Ep=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,yp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,wp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Tp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ap=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Bp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Rp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Cp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Lp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Dp=`float getShadowMask() {
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
}`,Pp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ip=`#ifdef USE_SKINNING
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
#endif`,Np=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Up=`#ifdef USE_SKINNING
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
#endif`,Fp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Op=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,zp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,kp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Gp=`#ifdef USE_TRANSMISSION
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
#endif`,Wp=`#ifdef USE_TRANSMISSION
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
#endif`,Hp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Vp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Xp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Yp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const qp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Kp=`uniform sampler2D t2D;
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
}`,Zp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$p=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Jp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jp=`#include <common>
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
}`,em=`#if DEPTH_PACKING == 3200
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
}`,tm=`#define DISTANCE
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
}`,nm=`#define DISTANCE
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
}`,im=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,rm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sm=`uniform float scale;
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
}`,am=`uniform vec3 diffuse;
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
}`,om=`#include <common>
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
}`,lm=`uniform vec3 diffuse;
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
}`,cm=`#define LAMBERT
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
}`,um=`#define LAMBERT
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
}`,hm=`#define MATCAP
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
}`,dm=`#define MATCAP
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
}`,fm=`#define NORMAL
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
}`,pm=`#define NORMAL
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
}`,mm=`#define PHONG
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
}`,gm=`#define PHONG
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
}`,_m=`#define STANDARD
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
}`,xm=`#define STANDARD
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
}`,vm=`#define TOON
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
}`,Mm=`#define TOON
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
}`,Sm=`uniform float size;
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
}`,bm=`uniform vec3 diffuse;
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
}`,Em=`#include <common>
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
}`,ym=`uniform vec3 color;
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
}`,wm=`uniform float rotation;
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
}`,Tm=`uniform vec3 diffuse;
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
}`,Xe={alphahash_fragment:Yd,alphahash_pars_fragment:qd,alphamap_fragment:Kd,alphamap_pars_fragment:Zd,alphatest_fragment:$d,alphatest_pars_fragment:Jd,aomap_fragment:Qd,aomap_pars_fragment:jd,batching_pars_vertex:ef,batching_vertex:tf,begin_vertex:nf,beginnormal_vertex:rf,bsdfs:sf,iridescence_fragment:af,bumpmap_pars_fragment:of,clipping_planes_fragment:lf,clipping_planes_pars_fragment:cf,clipping_planes_pars_vertex:uf,clipping_planes_vertex:hf,color_fragment:df,color_pars_fragment:ff,color_pars_vertex:pf,color_vertex:mf,common:gf,cube_uv_reflection_fragment:_f,defaultnormal_vertex:xf,displacementmap_pars_vertex:vf,displacementmap_vertex:Mf,emissivemap_fragment:Sf,emissivemap_pars_fragment:bf,colorspace_fragment:Ef,colorspace_pars_fragment:yf,envmap_fragment:wf,envmap_common_pars_fragment:Tf,envmap_pars_fragment:Af,envmap_pars_vertex:Bf,envmap_physical_pars_fragment:zf,envmap_vertex:Rf,fog_vertex:Cf,fog_pars_vertex:Lf,fog_fragment:Df,fog_pars_fragment:Pf,gradientmap_pars_fragment:If,lightmap_pars_fragment:Nf,lights_lambert_fragment:Uf,lights_lambert_pars_fragment:Ff,lights_pars_begin:Of,lights_toon_fragment:kf,lights_toon_pars_fragment:Gf,lights_phong_fragment:Wf,lights_phong_pars_fragment:Hf,lights_physical_fragment:Vf,lights_physical_pars_fragment:Xf,lights_fragment_begin:Yf,lights_fragment_maps:qf,lights_fragment_end:Kf,lightprobes_pars_fragment:Zf,logdepthbuf_fragment:$f,logdepthbuf_pars_fragment:Jf,logdepthbuf_pars_vertex:Qf,logdepthbuf_vertex:jf,map_fragment:ep,map_pars_fragment:tp,map_particle_fragment:np,map_particle_pars_fragment:ip,metalnessmap_fragment:rp,metalnessmap_pars_fragment:sp,morphinstance_vertex:ap,morphcolor_vertex:op,morphnormal_vertex:lp,morphtarget_pars_vertex:cp,morphtarget_vertex:up,normal_fragment_begin:hp,normal_fragment_maps:dp,normal_pars_fragment:fp,normal_pars_vertex:pp,normal_vertex:mp,normalmap_pars_fragment:gp,clearcoat_normal_fragment_begin:_p,clearcoat_normal_fragment_maps:xp,clearcoat_pars_fragment:vp,iridescence_pars_fragment:Mp,opaque_fragment:Sp,packing:bp,premultiplied_alpha_fragment:Ep,project_vertex:yp,dithering_fragment:wp,dithering_pars_fragment:Tp,roughnessmap_fragment:Ap,roughnessmap_pars_fragment:Bp,shadowmap_pars_fragment:Rp,shadowmap_pars_vertex:Cp,shadowmap_vertex:Lp,shadowmask_pars_fragment:Dp,skinbase_vertex:Pp,skinning_pars_vertex:Ip,skinning_vertex:Np,skinnormal_vertex:Up,specularmap_fragment:Fp,specularmap_pars_fragment:Op,tonemapping_fragment:zp,tonemapping_pars_fragment:kp,transmission_fragment:Gp,transmission_pars_fragment:Wp,uv_pars_fragment:Hp,uv_pars_vertex:Vp,uv_vertex:Xp,worldpos_vertex:Yp,background_vert:qp,background_frag:Kp,backgroundCube_vert:Zp,backgroundCube_frag:$p,cube_vert:Jp,cube_frag:Qp,depth_vert:jp,depth_frag:em,distance_vert:tm,distance_frag:nm,equirect_vert:im,equirect_frag:rm,linedashed_vert:sm,linedashed_frag:am,meshbasic_vert:om,meshbasic_frag:lm,meshlambert_vert:cm,meshlambert_frag:um,meshmatcap_vert:hm,meshmatcap_frag:dm,meshnormal_vert:fm,meshnormal_frag:pm,meshphong_vert:mm,meshphong_frag:gm,meshphysical_vert:_m,meshphysical_frag:xm,meshtoon_vert:vm,meshtoon_frag:Mm,points_vert:Sm,points_frag:bm,shadow_vert:Em,shadow_frag:ym,sprite_vert:wm,sprite_frag:Tm},fe={common:{diffuse:{value:new at(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ge}},envmap:{envMap:{value:null},envMapRotation:{value:new Ge},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ge}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ge}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ge},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ge},normalScale:{value:new We(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ge},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ge}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ge}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ge}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new at(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new H},probesMax:{value:new H},probesResolution:{value:new H}},points:{diffuse:{value:new at(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0},uvTransform:{value:new Ge}},sprite:{diffuse:{value:new at(16777215)},opacity:{value:1},center:{value:new We(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}}},gn={basic:{uniforms:zt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:zt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new at(0)},envMapIntensity:{value:1}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:zt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new at(0)},specular:{value:new at(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:zt([fe.common,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.roughnessmap,fe.metalnessmap,fe.fog,fe.lights,{emissive:{value:new at(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:zt([fe.common,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.gradientmap,fe.fog,fe.lights,{emissive:{value:new at(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:zt([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:zt([fe.points,fe.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:zt([fe.common,fe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:zt([fe.common,fe.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:zt([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:zt([fe.sprite,fe.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ge},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ge}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distance:{uniforms:zt([fe.common,fe.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distance_vert,fragmentShader:Xe.distance_frag},shadow:{uniforms:zt([fe.lights,fe.fog,{color:{value:new at(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};gn.physical={uniforms:zt([gn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ge},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ge},clearcoatNormalScale:{value:new We(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ge},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ge},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ge},sheen:{value:0},sheenColor:{value:new at(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ge},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ge},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ge},transmissionSamplerSize:{value:new We},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ge},attenuationDistance:{value:0},attenuationColor:{value:new at(0)},specularColor:{value:new at(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ge},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ge},anisotropyVector:{value:new We},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ge}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};const Xr={r:0,b:0,g:0},Am=new Et,fc=new Ge;fc.set(-1,0,0,0,1,0,0,0,1);function Bm(i,e,t,n,r,s){const a=new at(0);let c=r===!0?0:1,l,o,u=null,d=0,h=null;function f(v){let E=v.isScene===!0?v.background:null;if(E&&E.isTexture){const M=v.backgroundBlurriness>0;E=e.get(E,M)}return E}function _(v){let E=!1;const M=f(v);M===null?p(a,c):M&&M.isColor&&(p(M,1),E=!0);const y=i.xr.getEnvironmentBlendMode();y==="additive"?t.buffers.color.setClear(0,0,0,1,s):y==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(i.autoClear||E)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(v,E){const M=f(E);M&&(M.isCubeTexture||M.mapping===ds)?(o===void 0&&(o=new Wt(new Mr(1,1,1),new Ft({name:"BackgroundCubeMaterial",uniforms:Vi(gn.backgroundCube.uniforms),vertexShader:gn.backgroundCube.vertexShader,fragmentShader:gn.backgroundCube.fragmentShader,side:Vt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),o.geometry.deleteAttribute("normal"),o.geometry.deleteAttribute("uv"),o.onBeforeRender=function(y,T,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(o.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(o)),o.material.uniforms.envMap.value=M,o.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,o.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,o.material.uniforms.backgroundRotation.value.setFromMatrix4(Am.makeRotationFromEuler(E.backgroundRotation)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&o.material.uniforms.backgroundRotation.value.premultiply(fc),o.material.toneMapped=$e.getTransfer(M.colorSpace)!==ut,(u!==M||d!==M.version||h!==i.toneMapping)&&(o.material.needsUpdate=!0,u=M,d=M.version,h=i.toneMapping),o.layers.enableAll(),v.unshift(o,o.geometry,o.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new Wt(new yn(2,2),new Ft({name:"BackgroundMaterial",uniforms:Vi(gn.background.uniforms),vertexShader:gn.background.vertexShader,fragmentShader:gn.background.fragmentShader,side:hi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=$e.getTransfer(M.colorSpace)!==ut,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(u!==M||d!==M.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,u=M,d=M.version,h=i.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function p(v,E){v.getRGB(Xr,lc(i)),t.buffers.color.setClear(Xr.r,Xr.g,Xr.b,E,s)}function m(){o!==void 0&&(o.geometry.dispose(),o.material.dispose(),o=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,E=1){a.set(v),c=E,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(v){c=v,p(a,c)},render:_,addToRenderList:g,dispose:m}}function Rm(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=h(null);let s=r,a=!1;function c(N,z,F,D,O){let Y=!1;const K=d(N,D,F,z);s!==K&&(s=K,o(s.object)),Y=f(N,D,F,O),Y&&_(N,D,F,O),O!==null&&e.update(O,i.ELEMENT_ARRAY_BUFFER),(Y||a)&&(a=!1,M(N,z,F,D),O!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function l(){return i.createVertexArray()}function o(N){return i.bindVertexArray(N)}function u(N){return i.deleteVertexArray(N)}function d(N,z,F,D){const O=D.wireframe===!0;let Y=n[z.id];Y===void 0&&(Y={},n[z.id]=Y);const K=N.isInstancedMesh===!0?N.id:0;let ie=Y[K];ie===void 0&&(ie={},Y[K]=ie);let G=ie[F.id];G===void 0&&(G={},ie[F.id]=G);let J=G[O];return J===void 0&&(J=h(l()),G[O]=J),J}function h(N){const z=[],F=[],D=[];for(let O=0;O<t;O++)z[O]=0,F[O]=0,D[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:F,attributeDivisors:D,object:N,attributes:{},index:null}}function f(N,z,F,D){const O=s.attributes,Y=z.attributes;let K=0;const ie=F.getAttributes();for(const G in ie)if(ie[G].location>=0){const ee=O[G];let Te=Y[G];if(Te===void 0&&(G==="instanceMatrix"&&N.instanceMatrix&&(Te=N.instanceMatrix),G==="instanceColor"&&N.instanceColor&&(Te=N.instanceColor)),ee===void 0||ee.attribute!==Te||Te&&ee.data!==Te.data)return!0;K++}return s.attributesNum!==K||s.index!==D}function _(N,z,F,D){const O={},Y=z.attributes;let K=0;const ie=F.getAttributes();for(const G in ie)if(ie[G].location>=0){let ee=Y[G];ee===void 0&&(G==="instanceMatrix"&&N.instanceMatrix&&(ee=N.instanceMatrix),G==="instanceColor"&&N.instanceColor&&(ee=N.instanceColor));const Te={};Te.attribute=ee,ee&&ee.data&&(Te.data=ee.data),O[G]=Te,K++}s.attributes=O,s.attributesNum=K,s.index=D}function g(){const N=s.newAttributes;for(let z=0,F=N.length;z<F;z++)N[z]=0}function p(N){m(N,0)}function m(N,z){const F=s.newAttributes,D=s.enabledAttributes,O=s.attributeDivisors;F[N]=1,D[N]===0&&(i.enableVertexAttribArray(N),D[N]=1),O[N]!==z&&(i.vertexAttribDivisor(N,z),O[N]=z)}function v(){const N=s.newAttributes,z=s.enabledAttributes;for(let F=0,D=z.length;F<D;F++)z[F]!==N[F]&&(i.disableVertexAttribArray(F),z[F]=0)}function E(N,z,F,D,O,Y,K){K===!0?i.vertexAttribIPointer(N,z,F,O,Y):i.vertexAttribPointer(N,z,F,D,O,Y)}function M(N,z,F,D){g();const O=D.attributes,Y=F.getAttributes(),K=z.defaultAttributeValues;for(const ie in Y){const G=Y[ie];if(G.location>=0){let J=O[ie];if(J===void 0&&(ie==="instanceMatrix"&&N.instanceMatrix&&(J=N.instanceMatrix),ie==="instanceColor"&&N.instanceColor&&(J=N.instanceColor)),J!==void 0){const ee=J.normalized,Te=J.itemSize,Re=e.get(J);if(Re===void 0)continue;const ct=Re.buffer,qe=Re.type,Qe=Re.bytesPerElement,Q=qe===i.INT||qe===i.UNSIGNED_INT||J.gpuType===Qa;if(J.isInterleavedBufferAttribute){const re=J.data,be=re.stride,ze=J.offset;if(re.isInstancedInterleavedBuffer){for(let Se=0;Se<G.locationSize;Se++)m(G.location+Se,re.meshPerAttribute);N.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let Se=0;Se<G.locationSize;Se++)p(G.location+Se);i.bindBuffer(i.ARRAY_BUFFER,ct);for(let Se=0;Se<G.locationSize;Se++)E(G.location+Se,Te/G.locationSize,qe,ee,be*Qe,(ze+Te/G.locationSize*Se)*Qe,Q)}else{if(J.isInstancedBufferAttribute){for(let re=0;re<G.locationSize;re++)m(G.location+re,J.meshPerAttribute);N.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let re=0;re<G.locationSize;re++)p(G.location+re);i.bindBuffer(i.ARRAY_BUFFER,ct);for(let re=0;re<G.locationSize;re++)E(G.location+re,Te/G.locationSize,qe,ee,Te*Qe,Te/G.locationSize*re*Qe,Q)}}else if(K!==void 0){const ee=K[ie];if(ee!==void 0)switch(ee.length){case 2:i.vertexAttrib2fv(G.location,ee);break;case 3:i.vertexAttrib3fv(G.location,ee);break;case 4:i.vertexAttrib4fv(G.location,ee);break;default:i.vertexAttrib1fv(G.location,ee)}}}}v()}function y(){A();for(const N in n){const z=n[N];for(const F in z){const D=z[F];for(const O in D){const Y=D[O];for(const K in Y)u(Y[K].object),delete Y[K];delete D[O]}}delete n[N]}}function T(N){if(n[N.id]===void 0)return;const z=n[N.id];for(const F in z){const D=z[F];for(const O in D){const Y=D[O];for(const K in Y)u(Y[K].object),delete Y[K];delete D[O]}}delete n[N.id]}function C(N){for(const z in n){const F=n[z];for(const D in F){const O=F[D];if(O[N.id]===void 0)continue;const Y=O[N.id];for(const K in Y)u(Y[K].object),delete Y[K];delete O[N.id]}}}function b(N){for(const z in n){const F=n[z],D=N.isInstancedMesh===!0?N.id:0,O=F[D];if(O!==void 0){for(const Y in O){const K=O[Y];for(const ie in K)u(K[ie].object),delete K[ie];delete O[Y]}delete F[D],Object.keys(F).length===0&&delete n[z]}}}function A(){L(),a=!0,s!==r&&(s=r,o(s.object))}function L(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:c,reset:A,resetDefaultState:L,dispose:y,releaseStatesOfGeometry:T,releaseStatesOfObject:b,releaseStatesOfProgram:C,initAttributes:g,enableAttribute:p,disableUnusedAttributes:v}}function Cm(i,e,t){let n;function r(l){n=l}function s(l,o){i.drawArrays(n,l,o),t.update(o,n,1)}function a(l,o,u){u!==0&&(i.drawArraysInstanced(n,l,o,u),t.update(o,n,u))}function c(l,o,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,o,0,u);let h=0;for(let f=0;f<u;f++)h+=o[f];t.update(h,n,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=c}function Lm(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(C){return!(C!==rn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function c(C){const b=C===bn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==$t&&C!==_n&&!b&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let o=t.precision!==void 0?t.precision:"highp";const u=l(o);u!==o&&(ke("WebGLRenderer:",o,"not supported, using",u,"instead."),o=u);const d=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&ke("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),y=i.getParameter(i.MAX_SAMPLES),T=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:c,precision:o,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:f,maxVertexTextures:_,maxTextureSize:g,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:v,maxVaryings:E,maxFragmentUniforms:M,maxSamples:y,samples:T}}function Dm(i){const e=this;let t=null,n=0,r=!1,s=!1;const a=new Kn,c=new Ge,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const f=d.length!==0||h||n!==0||r;return r=h,n=d.length,f},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,f){const _=d.clippingPlanes,g=d.clipIntersection,p=d.clipShadows,m=i.get(d);if(!r||_===null||_.length===0||s&&!p)s?u(null):o();else{const v=s?0:n,E=v*4;let M=m.clippingState||null;l.value=M,M=u(_,h,E,f);for(let y=0;y!==E;++y)M[y]=t[y];m.clippingState=M,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=v}};function o(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,h,f,_){const g=d!==null?d.length:0;let p=null;if(g!==0){if(p=l.value,_!==!0||p===null){const m=f+g*4,v=h.matrixWorldInverse;c.getNormalMatrix(v),(p===null||p.length<m)&&(p=new Float32Array(m));for(let E=0,M=f;E!==g;++E,M+=4)a.copy(d[E]).applyMatrix4(v,c),a.normal.toArray(p,M),p[M+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,p}}const Ui=4,Pm=6,Im=20,Nm=256,nr=new lo,Jo=new at;let Ks=null,Zs=0,$s=0,Js=!1;const Um=new H,ii=new H;class Qo{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){const{size:a=256,position:c=Um}=s;Ks=this._renderer.getRenderTarget(),Zs=this._renderer.getActiveCubeFace(),$s=this._renderer.getActiveMipmapLevel(),Js=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,r,l,c),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=tl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=el(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ks,Zs,$s),this._renderer.xr.enabled=Js,e.scissorTest=!1,Li(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===di||e.mapping===Hi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ks=this._renderer.getRenderTarget(),Zs=this._renderer.getActiveCubeFace(),$s=this._renderer.getActiveMipmapLevel(),Js=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:bt,minFilter:bt,generateMipmaps:!1,type:bn,format:rn,colorSpace:fr,depthBuffer:!1},r=jo(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=jo(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Fm(s)),this._blurMaterial=zm(s,e,t),this._ggxMaterial=Om(s,e,t)}return r}_compileMaterial(e){const t=new Wt(new En,e);this._renderer.compile(t,nr)}_sceneToCubeUV(e,t,n,r,s){const l=new nn(90,1,t,n),o=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,f=d.toneMapping;d.getClearColor(Jo),d.toneMapping=vn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Wt(new Mr,new ic({name:"PMREM.Background",side:Vt,depthWrite:!1,depthTest:!1})));const g=this._backgroundBox,p=g.material;let m=!1;const v=e.background;v?v.isColor&&(p.color.copy(v),e.background=null,m=!0):(p.color.copy(Jo),m=!0);for(let E=0;E<6;E++){const M=E%3;M===0?(l.up.set(0,o[E],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[E],s.y,s.z)):M===1?(l.up.set(0,0,o[E]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[E],s.z)):(l.up.set(0,o[E],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[E]));const y=this._cubeSize;Li(r,M*y,E>2?y:0,y,y),d.setRenderTarget(r),m&&d.render(g,l),d.render(e,l)}d.toneMapping=f,d.autoClear=h,e.background=v}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===di||e.mapping===Hi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=tl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=el());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const c=s.uniforms;c.envMap.value=e;const l=this._cubeSize;Li(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,nr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,c=this._lodMeshes[n];c.material=a;const l=a.uniforms,o=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(o*o-u*u),h=o*1.25,f=d*h,{_lodMax:_}=this,g=this._sizeLods[n],p=3*g*(n>_-Ui?n-_+Ui:0),m=4*(this._cubeSize-g);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=_-t,Li(s,p,m,3*g,2*g),r.setRenderTarget(s),r.render(c,nr),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=_-n,Li(e,p,m,3*g,2*g),r.setRenderTarget(e),r.render(c,nr)}_blur(e,t,n,r){const s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,n,a),this._blurPass(s,e,n,n,a)}_blurPass(e,t,n,r,s){const a=this._renderer,c=this._blurMaterial,l=this._lodMeshes[r];l.material=c;const o=c.uniforms;o.envMap.value=e.texture,o.sigma.value=s,o.mipInt.value=this._lodMax-n;const u=this._sizeLods[r],d=3*u*(r>this._lodMax-Ui?r-this._lodMax+Ui:0),h=4*(this._cubeSize-u);Li(t,d,h,3*u,2*u),a.setRenderTarget(t),a.render(l,nr)}}function Fm(i){const e=[],t=[];let n=i;const r=i-Ui+1+Pm;for(let s=0;s<r;s++){const a=Math.pow(2,n);e.push(a);const c=1/(a-2),l=-c,o=1+c,u=[l,l,o,l,o,o,l,l,o,o,l,o],d=6,h=6,f=3,_=new Float32Array(f*h*d),g=new Float32Array(f*h*d);for(let m=0;m<d;m++){const v=m%3*2/3-1,E=m>2?0:-1,M=[v,E,0,v+2/3,E,0,v+2/3,E+1,0,v,E,0,v+2/3,E+1,0,v,E+1,0];_.set(M,f*h*m);for(let y=0;y<h;y++){const T=u[y*2]*2-1,C=u[y*2+1]*2-1;m===0?ii.set(1,C,T):m===1?ii.set(-T,1,-C):m===2?ii.set(-T,C,1):m===3?ii.set(-1,C,-T):m===4?ii.set(-T,-1,C):ii.set(T,C,-1),ii.toArray(g,(m*h+y)*f)}}const p=new En;p.setAttribute("position",new Mn(_,f)),p.setAttribute("outputDirection",new Mn(g,f)),t.push(new Wt(p,null)),n>Ui&&n--}return{lodMeshes:t,sizeLods:e}}function jo(i,e,t){const n=new sn(i,e,t);return n.texture.mapping=ds,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Li(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function Om(i,e,t){return new Ft({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Nm,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ps(),fragmentShader:`

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
		`,blending:In,depthTest:!1,depthWrite:!1})}function zm(i,e,t){return new Ft({name:"SphericalGaussianBlur",defines:{SAMPLES:Im,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:ps(),fragmentShader:`

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
		`,blending:In,depthTest:!1,depthWrite:!1})}function el(){return new Ft({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ps(),fragmentShader:`

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
		`,blending:In,depthTest:!1,depthWrite:!1})}function tl(){return new Ft({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ps(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:In,depthTest:!1,depthWrite:!1})}function ps(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class pc extends sn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new ac(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Mr(5,5,5),s=new Ft({name:"CubemapFromEquirect",uniforms:Vi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Vt,blending:In});s.uniforms.tEquirect.value=t;const a=new Wt(r,s),c=t.minFilter;return t.minFilter===oi&&(t.minFilter=bt),new Wd(1,10,this).update(e,a),t.minFilter=c,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}}function km(i){let e=new WeakMap,t=new WeakMap,n=null;function r(h,f=!1){return h==null?null:f?a(h):s(h)}function s(h){if(h&&h.isTexture){const f=h.mapping;if(f===bs||f===Es)if(e.has(h)){const _=e.get(h).texture;return c(_,h.mapping)}else{const _=h.image;if(_&&_.height>0){const g=new pc(_.height);return g.fromEquirectangularTexture(i,h),e.set(h,g),h.addEventListener("dispose",o),c(g.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){const f=h.mapping,_=f===bs||f===Es,g=f===di||f===Hi;if(_||g){let p=t.get(h);const m=p!==void 0?p.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==m)return n===null&&(n=new Qo(i)),p=_?n.fromEquirectangular(h,p):n.fromCubemap(h,p),p.texture.pmremVersion=h.pmremVersion,t.set(h,p),p.texture;if(p!==void 0)return p.texture;{const v=h.image;return _&&v&&v.height>0||g&&v&&l(v)?(n===null&&(n=new Qo(i)),p=_?n.fromEquirectangular(h):n.fromCubemap(h),p.texture.pmremVersion=h.pmremVersion,t.set(h,p),h.addEventListener("dispose",u),p.texture):null}}}return h}function c(h,f){return f===bs?h.mapping=di:f===Es&&(h.mapping=Hi),h}function l(h){let f=0;const _=6;for(let g=0;g<_;g++)h[g]!==void 0&&f++;return f===_}function o(h){const f=h.target;f.removeEventListener("dispose",o);const _=e.get(f);_!==void 0&&(e.delete(f),_.dispose())}function u(h){const f=h.target;f.removeEventListener("dispose",u);const _=t.get(f);_!==void 0&&(t.delete(f),_.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:d}}function Gm(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&Oi("WebGLRenderer: "+n+" extension not supported."),r}}}function Wm(i,e,t,n){const r={},s=new WeakMap;function a(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const _ in h.attributes)e.remove(h.attributes[_]);h.removeEventListener("dispose",a),delete r[h.id];const f=s.get(h);f&&(e.remove(f),s.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function c(d,h){return r[h.id]===!0||(h.addEventListener("dispose",a),r[h.id]=!0,t.memory.geometries++),h}function l(d){const h=d.attributes;for(const f in h)e.update(h[f],i.ARRAY_BUFFER)}function o(d){const h=[],f=d.index,_=d.attributes.position;let g=0;if(_===void 0)return;if(f!==null){const v=f.array;g=f.version;for(let E=0,M=v.length;E<M;E+=3){const y=v[E+0],T=v[E+1],C=v[E+2];h.push(y,T,T,C,C,y)}}else{const v=_.array;g=_.version;for(let E=0,M=v.length/3-1;E<M;E+=3){const y=E+0,T=E+1,C=E+2;h.push(y,T,T,C,C,y)}}const p=new(_.count>=65535?nc:tc)(h,1);p.version=g;const m=s.get(d);m&&e.remove(m),s.set(d,p)}function u(d){const h=s.get(d);if(h){const f=d.index;f!==null&&h.version<f.version&&o(d)}else o(d);return s.get(d)}return{get:c,update:l,getWireframeAttribute:u}}function Hm(i,e,t){let n;function r(d){n=d}let s,a;function c(d){s=d.type,a=d.bytesPerElement}function l(d,h){i.drawElements(n,h,s,d*a),t.update(h,n,1)}function o(d,h,f){f!==0&&(i.drawElementsInstanced(n,h,s,d*a,f),t.update(h,n,f))}function u(d,h,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,s,d,0,f);let g=0;for(let p=0;p<f;p++)g+=h[p];t.update(g,n,1)}this.setMode=r,this.setIndex=c,this.render=l,this.renderInstances=o,this.renderMultiDraw=u}function Vm(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,c){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=c*(s/3);break;case i.LINES:t.lines+=c*(s/2);break;case i.LINE_STRIP:t.lines+=c*(s-1);break;case i.LINE_LOOP:t.lines+=c*s;break;case i.POINTS:t.points+=c*s;break;default:rt("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function Xm(i,e,t){const n=new WeakMap,r=new vt;function s(a,c,l){const o=a.morphTargetInfluences,u=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,d=u!==void 0?u.length:0;let h=n.get(c);if(h===void 0||h.count!==d){let A=function(){C.dispose(),n.delete(c),c.removeEventListener("dispose",A)};h!==void 0&&h.texture.dispose();const f=c.morphAttributes.position!==void 0,_=c.morphAttributes.normal!==void 0,g=c.morphAttributes.color!==void 0,p=c.morphAttributes.position||[],m=c.morphAttributes.normal||[],v=c.morphAttributes.color||[];let E=0;f===!0&&(E=1),_===!0&&(E=2),g===!0&&(E=3);let M=c.attributes.position.count*E,y=1;M>e.maxTextureSize&&(y=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const T=new Float32Array(M*y*4*d),C=new Ql(T,M,y,d);C.type=_n,C.needsUpdate=!0;const b=E*4;for(let L=0;L<d;L++){const N=p[L],z=m[L],F=v[L],D=M*y*4*L;for(let O=0;O<N.count;O++){const Y=O*b;f===!0&&(r.fromBufferAttribute(N,O),T[D+Y+0]=r.x,T[D+Y+1]=r.y,T[D+Y+2]=r.z,T[D+Y+3]=0),_===!0&&(r.fromBufferAttribute(z,O),T[D+Y+4]=r.x,T[D+Y+5]=r.y,T[D+Y+6]=r.z,T[D+Y+7]=0),g===!0&&(r.fromBufferAttribute(F,O),T[D+Y+8]=r.x,T[D+Y+9]=r.y,T[D+Y+10]=r.z,T[D+Y+11]=F.itemSize===4?r.w:1)}}h={count:d,texture:C,size:new We(M,y)},n.set(c,h),c.addEventListener("dispose",A)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let f=0;for(let g=0;g<o.length;g++)f+=o[g];const _=c.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",_),l.getUniforms().setValue(i,"morphTargetInfluences",o)}l.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:s}}function Ym(i,e,t,n,r){let s=new WeakMap;function a(o){const u=r.render.frame,d=o.geometry,h=e.get(o,d);if(s.get(h)!==u&&(e.update(h),s.set(h,u)),o.isInstancedMesh&&(o.hasEventListener("dispose",l)===!1&&o.addEventListener("dispose",l),s.get(o)!==u&&(t.update(o.instanceMatrix,i.ARRAY_BUFFER),o.instanceColor!==null&&t.update(o.instanceColor,i.ARRAY_BUFFER),s.set(o,u))),o.isSkinnedMesh){const f=o.skeleton;s.get(f)!==u&&(f.update(),s.set(f,u))}return h}function c(){s=new WeakMap}function l(o){const u=o.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:c}}const qm={[Nl]:"LINEAR_TONE_MAPPING",[Ul]:"REINHARD_TONE_MAPPING",[Fl]:"CINEON_TONE_MAPPING",[Ol]:"ACES_FILMIC_TONE_MAPPING",[kl]:"AGX_TONE_MAPPING",[Gl]:"NEUTRAL_TONE_MAPPING",[zl]:"CUSTOM_TONE_MAPPING"};function Km(i,e,t,n,r,s){const a=new sn(e,t,{type:i,depthBuffer:r,stencilBuffer:s,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let c=null,l=null;const o=new En;o.setAttribute("position",new Un([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new Un([0,2,0,0,2,0],2));const u=new zd({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new Wt(o,u),h=new lo(-1,1,1,-1,0,1);let f=null,_=null,g=!1,p,m=null,v=[],E=!1;this.setSize=function(M,y){a.setSize(M,y),c!==null&&c.setSize(M,y),l!==null&&l.setSize(M,y);for(let T=0;T<v.length;T++){const C=v[T];C.setSize&&C.setSize(M,y)}},this.setEffects=function(M){v=M,E=v.length>0&&v[0].isRenderPass===!0;const y=a.width,T=a.height;v.length>0&&c===null&&(c=new sn(y,T,{type:bn,depthBuffer:!1,stencilBuffer:!1}),l=new sn(y,T,{type:bn,depthBuffer:!1,stencilBuffer:!1}));for(let C=0;C<v.length;C++){const b=v[C];b.setSize&&b.setSize(y,T)}},this.begin=function(M,y){if(g||M.toneMapping===vn&&v.length===0)return!1;if(m=y,y!==null){const T=y.width,C=y.height;(a.width!==T||a.height!==C)&&this.setSize(T,C)}return E===!1&&M.setRenderTarget(a),p=M.toneMapping,M.toneMapping=vn,!0},this.hasRenderPass=function(){return E},this.end=function(M,y){M.toneMapping=p,g=!0;let T=a,C=c;for(let b=0;b<v.length;b++){const A=v[b];A.enabled!==!1&&(A.render(M,C,T,y),A.needsSwap!==!1&&(T=C,C=C===c?l:c))}if(f!==M.outputColorSpace||_!==M.toneMapping){f=M.outputColorSpace,_=M.toneMapping,u.defines={},$e.getTransfer(f)===ut&&(u.defines.SRGB_TRANSFER="");const b=qm[_];b&&(u.defines[b]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=T.texture,M.setRenderTarget(m),M.render(d,h),m=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){a.dispose(),c!==null&&c.dispose(),l!==null&&l.dispose(),o.dispose(),u.dispose()}}const mc=new Gt,Ha=new pr(1,1),gc=new Ql,_c=new gd,xc=new ac,nl=[],il=[],rl=new Float32Array(16),sl=new Float32Array(9),al=new Float32Array(4);function $i(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=nl[r];if(s===void 0&&(s=new Float32Array(r),nl[r]=s),e!==0){n.toArray(s,0);for(let a=1,c=0;a!==e;++a)c+=t,i[a].toArray(s,c)}return s}function Bt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Rt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function ms(i,e){let t=il[e];t===void 0&&(t=new Int32Array(e),il[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Zm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function $m(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;i.uniform2fv(this.addr,e),Rt(t,e)}}function Jm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Bt(t,e))return;i.uniform3fv(this.addr,e),Rt(t,e)}}function Qm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;i.uniform4fv(this.addr,e),Rt(t,e)}}function jm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Bt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Rt(t,e)}else{if(Bt(t,n))return;al.set(n),i.uniformMatrix2fv(this.addr,!1,al),Rt(t,n)}}function e0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Bt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Rt(t,e)}else{if(Bt(t,n))return;sl.set(n),i.uniformMatrix3fv(this.addr,!1,sl),Rt(t,n)}}function t0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Bt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Rt(t,e)}else{if(Bt(t,n))return;rl.set(n),i.uniformMatrix4fv(this.addr,!1,rl),Rt(t,n)}}function n0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function i0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;i.uniform2iv(this.addr,e),Rt(t,e)}}function r0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Bt(t,e))return;i.uniform3iv(this.addr,e),Rt(t,e)}}function s0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;i.uniform4iv(this.addr,e),Rt(t,e)}}function a0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function o0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;i.uniform2uiv(this.addr,e),Rt(t,e)}}function l0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Bt(t,e))return;i.uniform3uiv(this.addr,e),Rt(t,e)}}function c0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;i.uniform4uiv(this.addr,e),Rt(t,e)}}function u0(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(Ha.compareFunction=t.isReversedDepthBuffer()?so:ro,s=Ha):s=mc,t.setTexture2D(e||s,r)}function h0(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||_c,r)}function d0(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||xc,r)}function f0(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||gc,r)}function p0(i){switch(i){case 5126:return Zm;case 35664:return $m;case 35665:return Jm;case 35666:return Qm;case 35674:return jm;case 35675:return e0;case 35676:return t0;case 5124:case 35670:return n0;case 35667:case 35671:return i0;case 35668:case 35672:return r0;case 35669:case 35673:return s0;case 5125:return a0;case 36294:return o0;case 36295:return l0;case 36296:return c0;case 35678:case 36198:case 36298:case 36306:case 35682:return u0;case 35679:case 36299:case 36307:return h0;case 35680:case 36300:case 36308:case 36293:return d0;case 36289:case 36303:case 36311:case 36292:return f0}}function m0(i,e){i.uniform1fv(this.addr,e)}function g0(i,e){const t=$i(e,this.size,2);i.uniform2fv(this.addr,t)}function _0(i,e){const t=$i(e,this.size,3);i.uniform3fv(this.addr,t)}function x0(i,e){const t=$i(e,this.size,4);i.uniform4fv(this.addr,t)}function v0(i,e){const t=$i(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function M0(i,e){const t=$i(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function S0(i,e){const t=$i(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function b0(i,e){i.uniform1iv(this.addr,e)}function E0(i,e){i.uniform2iv(this.addr,e)}function y0(i,e){i.uniform3iv(this.addr,e)}function w0(i,e){i.uniform4iv(this.addr,e)}function T0(i,e){i.uniform1uiv(this.addr,e)}function A0(i,e){i.uniform2uiv(this.addr,e)}function B0(i,e){i.uniform3uiv(this.addr,e)}function R0(i,e){i.uniform4uiv(this.addr,e)}function C0(i,e,t){const n=this.cache,r=e.length,s=ms(t,r);Bt(n,s)||(i.uniform1iv(this.addr,s),Rt(n,s));let a;this.type===i.SAMPLER_2D_SHADOW?a=Ha:a=mc;for(let c=0;c!==r;++c)t.setTexture2D(e[c]||a,s[c])}function L0(i,e,t){const n=this.cache,r=e.length,s=ms(t,r);Bt(n,s)||(i.uniform1iv(this.addr,s),Rt(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||_c,s[a])}function D0(i,e,t){const n=this.cache,r=e.length,s=ms(t,r);Bt(n,s)||(i.uniform1iv(this.addr,s),Rt(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||xc,s[a])}function P0(i,e,t){const n=this.cache,r=e.length,s=ms(t,r);Bt(n,s)||(i.uniform1iv(this.addr,s),Rt(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||gc,s[a])}function I0(i){switch(i){case 5126:return m0;case 35664:return g0;case 35665:return _0;case 35666:return x0;case 35674:return v0;case 35675:return M0;case 35676:return S0;case 5124:case 35670:return b0;case 35667:case 35671:return E0;case 35668:case 35672:return y0;case 35669:case 35673:return w0;case 5125:return T0;case 36294:return A0;case 36295:return B0;case 36296:return R0;case 35678:case 36198:case 36298:case 36306:case 35682:return C0;case 35679:case 36299:case 36307:return L0;case 35680:case 36300:case 36308:case 36293:return D0;case 36289:case 36303:case 36311:case 36292:return P0}}class N0{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=p0(t.type)}}class U0{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=I0(t.type)}}class F0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const c=r[s];c.setValue(e,t[c.id],n)}}}const Qs=/(\w+)(\])?(\[|\.)?/g;function ol(i,e){i.seq.push(e),i.map[e.id]=e}function O0(i,e,t){const n=i.name,r=n.length;for(Qs.lastIndex=0;;){const s=Qs.exec(n),a=Qs.lastIndex;let c=s[1];const l=s[2]==="]",o=s[3];if(l&&(c=c|0),o===void 0||o==="["&&a+2===r){ol(t,o===void 0?new N0(c,i,e):new U0(c,i,e));break}else{let d=t.map[c];d===void 0&&(d=new F0(c),ol(t,d)),t=d}}}class ns{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const c=e.getActiveUniform(t,a),l=e.getUniformLocation(t,c.name);O0(c,l,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){const c=t[s],l=n[c.id];l.needsUpdate!==!1&&c.setValue(e,l.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&n.push(a)}return n}}function ll(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const z0=37297;let k0=0;function G0(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const c=a+1;n.push(`${c===e?">":" "} ${c}: ${t[a]}`)}return n.join(`
`)}const cl=new Ge;function W0(i){$e._getMatrix(cl,$e.workingColorSpace,i);const e=`mat3( ${cl.elements.map(t=>t.toFixed(4))} )`;switch($e.getTransfer(i)){case as:return[e,"LinearTransferOETF"];case ut:return[e,"sRGBTransferOETF"];default:return ke("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function ul(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const c=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+G0(i.getShaderSource(e),c)}else return s}function H0(i,e){const t=W0(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const V0={[Nl]:"Linear",[Ul]:"Reinhard",[Fl]:"Cineon",[Ol]:"ACESFilmic",[kl]:"AgX",[Gl]:"Neutral",[zl]:"Custom"};function X0(i,e){const t=V0[e];return t===void 0?(ke("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Yr=new H;function Y0(){$e.getLuminanceCoefficients(Yr);const i=Yr.x.toFixed(4),e=Yr.y.toFixed(4),t=Yr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function q0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ar).join(`
`)}function K0(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Z0(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),a=s.name;let c=1;s.type===i.FLOAT_MAT2&&(c=2),s.type===i.FLOAT_MAT3&&(c=3),s.type===i.FLOAT_MAT4&&(c=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:c}}return t}function ar(i){return i!==""}function hl(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function dl(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const $0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Va(i){return i.replace($0,Q0)}const J0=new Map;function Q0(i,e){let t=Xe[e];if(t===void 0){const n=J0.get(e);if(n!==void 0)t=Xe[n],ke('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Va(t)}const j0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function fl(i){return i.replace(j0,eg)}function eg(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function pl(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}const tg={[Jr]:"SHADOWMAP_TYPE_PCF",[sr]:"SHADOWMAP_TYPE_VSM"};function ng(i){return tg[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const ig={[di]:"ENVMAP_TYPE_CUBE",[Hi]:"ENVMAP_TYPE_CUBE",[ds]:"ENVMAP_TYPE_CUBE_UV"};function rg(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":ig[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const sg={[Hi]:"ENVMAP_MODE_REFRACTION"};function ag(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":sg[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const og={[Il]:"ENVMAP_BLENDING_MULTIPLY",[qh]:"ENVMAP_BLENDING_MIX",[Kh]:"ENVMAP_BLENDING_ADD"};function lg(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":og[i.combine]||"ENVMAP_BLENDING_NONE"}function cg(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function ug(i,e,t,n){const r=i.getContext(),s=t.defines;let a=t.vertexShader,c=t.fragmentShader;const l=ng(t),o=rg(t),u=ag(t),d=lg(t),h=cg(t),f=q0(t),_=K0(s),g=r.createProgram();let p,m,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(ar).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(ar).join(`
`),m.length>0&&(m+=`
`)):(p=[pl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ar).join(`
`),m=[pl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+o:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==vn?"#define TONE_MAPPING":"",t.toneMapping!==vn?Xe.tonemapping_pars_fragment:"",t.toneMapping!==vn?X0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,H0("linearToOutputTexel",t.outputColorSpace),Y0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ar).join(`
`)),a=Va(a),a=hl(a,t),a=dl(a,t),c=Va(c),c=hl(c,t),c=dl(c,t),a=fl(a),c=fl(c),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",t.glslVersion===Co?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Co?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const E=v+p+a,M=v+m+c,y=ll(r,r.VERTEX_SHADER,E),T=ll(r,r.FRAGMENT_SHADER,M);r.attachShader(g,y),r.attachShader(g,T),t.index0AttributeName!==void 0?r.bindAttribLocation(g,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(g,0,"position"),r.linkProgram(g);function C(N){if(i.debug.checkShaderErrors){const z=r.getProgramInfoLog(g)||"",F=r.getShaderInfoLog(y)||"",D=r.getShaderInfoLog(T)||"",O=z.trim(),Y=F.trim(),K=D.trim();let ie=!0,G=!0;if(r.getProgramParameter(g,r.LINK_STATUS)===!1)if(ie=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,g,y,T);else{const J=ul(r,y,"vertex"),ee=ul(r,T,"fragment");rt("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(g,r.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+O+`
`+J+`
`+ee)}else O!==""?ke("WebGLProgram: Program Info Log:",O):(Y===""||K==="")&&(G=!1);G&&(N.diagnostics={runnable:ie,programLog:O,vertexShader:{log:Y,prefix:p},fragmentShader:{log:K,prefix:m}})}r.deleteShader(y),r.deleteShader(T),b=new ns(r,g),A=Z0(r,g)}let b;this.getUniforms=function(){return b===void 0&&C(this),b};let A;this.getAttributes=function(){return A===void 0&&C(this),A};let L=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=r.getProgramParameter(g,z0)),L},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=k0++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=y,this.fragmentShader=T,this}let hg=0;class dg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new fg(e),t.set(e,n)),n}}class fg{constructor(e){this.id=hg++,this.code=e,this.usedTimes=0}}function pg(i){return i===fi||i===rs||i===ss}function mg(i,e,t,n,r,s){const a=new jl,c=new dg,l=new Set,o=[],u=new Map,d=n.logarithmicDepthBuffer;let h=n.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return l.add(b),b===0?"uv":`uv${b}`}function g(b,A,L,N,z,F){const D=N.fog,O=z.geometry,Y=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?N.environment:null,K=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap,ie=e.get(b.envMap||Y,K),G=ie&&ie.mapping===ds?ie.image.height:null,J=f[b.type];b.precision!==null&&(h=n.getMaxPrecision(b.precision),h!==b.precision&&ke("WebGLProgram.getParameters:",b.precision,"not supported, using",h,"instead."));const ee=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,Te=ee!==void 0?ee.length:0;let Re=0;O.morphAttributes.position!==void 0&&(Re=1),O.morphAttributes.normal!==void 0&&(Re=2),O.morphAttributes.color!==void 0&&(Re=3);let ct,qe,Qe,Q;if(J){const pt=gn[J];ct=pt.vertexShader,qe=pt.fragmentShader}else{ct=b.vertexShader,qe=b.fragmentShader;const pt=c.getVertexShaderStage(b),ot=c.getFragmentShaderStage(b);c.update(b,pt,ot),Qe=pt.id,Q=ot.id}const re=i.getRenderTarget(),be=i.state.buffers.depth.getReversed(),ze=z.isInstancedMesh===!0,Se=z.isBatchedMesh===!0,Z=!!b.map,ve=!!b.matcap,ge=!!ie,Pe=!!b.aoMap,Ce=!!b.lightMap,Me=!!b.bumpMap&&b.wireframe===!1,Ye=!!b.normalMap,je=!!b.displacementMap,dt=!!b.emissiveMap,et=!!b.metalnessMap,tt=!!b.roughnessMap,P=b.anisotropy>0,Mt=b.clearcoat>0,nt=b.dispersion>0,B=b.retroreflectivity>0,S=b.iridescence>0,k=b.sheen>0,W=b.transmission>0,$=P&&!!b.anisotropyMap,ae=Mt&&!!b.clearcoatMap,oe=Mt&&!!b.clearcoatNormalMap,j=Mt&&!!b.clearcoatRoughnessMap,ne=S&&!!b.iridescenceMap,le=S&&!!b.iridescenceThicknessMap,Ie=k&&!!b.sheenColorMap,de=k&&!!b.sheenRoughnessMap,ce=!!b.specularMap,Ne=!!b.specularColorMap,Oe=!!b.specularIntensityMap,He=W&&!!b.transmissionMap,U=W&&!!b.thicknessMap,ue=!!b.gradientMap,te=!!b.alphaMap,he=b.alphaTest>0,xe=!!b.alphaHash,se=!!b.extensions;let Ue=vn;b.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(Ue=i.toneMapping);const Le={shaderID:J,shaderType:b.type,shaderName:b.name,vertexShader:ct,fragmentShader:qe,defines:b.defines,customVertexShaderID:Qe,customFragmentShaderID:Q,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:h,batching:Se,batchingColor:Se&&z._colorsTexture!==null,instancing:ze,instancingColor:ze&&z.instanceColor!==null,instancingMorph:ze&&z.morphTexture!==null,outputColorSpace:re===null?i.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:$e.workingColorSpace,alphaToCoverage:!!b.alphaToCoverage,map:Z,matcap:ve,envMap:ge,envMapMode:ge&&ie.mapping,envMapCubeUVHeight:G,aoMap:Pe,lightMap:Ce,bumpMap:Me,normalMap:Ye,displacementMap:je,emissiveMap:dt,normalMapObjectSpace:Ye&&b.normalMapType===Jh,normalMapTangentSpace:Ye&&b.normalMapType===Ro,packedNormalMap:Ye&&b.normalMapType===Ro&&pg(b.normalMap.format),metalnessMap:et,roughnessMap:tt,anisotropy:P,anisotropyMap:$,clearcoat:Mt,clearcoatMap:ae,clearcoatNormalMap:oe,clearcoatRoughnessMap:j,dispersion:nt,retroreflection:B,iridescence:S,iridescenceMap:ne,iridescenceThicknessMap:le,sheen:k,sheenColorMap:Ie,sheenRoughnessMap:de,specularMap:ce,specularColorMap:Ne,specularIntensityMap:Oe,transmission:W,transmissionMap:He,thicknessMap:U,gradientMap:ue,opaque:b.transparent===!1&&b.blending===lr&&b.alphaToCoverage===!1,alphaMap:te,alphaTest:he,alphaHash:xe,combine:b.combine,mapUv:Z&&_(b.map.channel),aoMapUv:Pe&&_(b.aoMap.channel),lightMapUv:Ce&&_(b.lightMap.channel),bumpMapUv:Me&&_(b.bumpMap.channel),normalMapUv:Ye&&_(b.normalMap.channel),displacementMapUv:je&&_(b.displacementMap.channel),emissiveMapUv:dt&&_(b.emissiveMap.channel),metalnessMapUv:et&&_(b.metalnessMap.channel),roughnessMapUv:tt&&_(b.roughnessMap.channel),anisotropyMapUv:$&&_(b.anisotropyMap.channel),clearcoatMapUv:ae&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:oe&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:j&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:ne&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:le&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:Ie&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:de&&_(b.sheenRoughnessMap.channel),specularMapUv:ce&&_(b.specularMap.channel),specularColorMapUv:Ne&&_(b.specularColorMap.channel),specularIntensityMapUv:Oe&&_(b.specularIntensityMap.channel),transmissionMapUv:He&&_(b.transmissionMap.channel),thicknessMapUv:U&&_(b.thicknessMap.channel),alphaMapUv:te&&_(b.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(Ye||P),vertexNormals:!!O.attributes.normal,vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!O.attributes.uv&&(Z||te),fog:!!D,useFog:b.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:b.wireframe===!1&&(b.flatShading===!0||O.attributes.normal===void 0&&Ye===!1&&(b.isMeshLambertMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isMeshPhysicalMaterial)),sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:be,skinning:z.isSkinnedMesh===!0,hasPositionAttribute:O.attributes.position!==void 0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:Te,morphTextureStride:Re,numSunLights:A.sun.length,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numSunLightShadows:A.sunShadowMap.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:F.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ue,decodeVideoTexture:Z&&b.map.isVideoTexture===!0&&$e.getTransfer(b.map.colorSpace)===ut,decodeVideoTextureEmissive:dt&&b.emissiveMap.isVideoTexture===!0&&$e.getTransfer(b.emissiveMap.colorSpace)===ut,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Ln,flipSided:b.side===Vt,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:se&&b.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(se&&b.extensions.multiDraw===!0||Se)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Le.vertexUv1s=l.has(1),Le.vertexUv2s=l.has(2),Le.vertexUv3s=l.has(3),l.clear(),Le}function p(b){const A=[];if(b.shaderID?A.push(b.shaderID):(A.push(b.customVertexShaderID),A.push(b.customFragmentShaderID)),b.defines!==void 0)for(const L in b.defines)A.push(L),A.push(b.defines[L]);return b.isRawShaderMaterial===!1&&(m(A,b),v(A,b),A.push(i.outputColorSpace)),A.push(b.customProgramCacheKey),A.join()}function m(b,A){b.push(A.precision),b.push(A.outputColorSpace),b.push(A.envMapMode),b.push(A.envMapCubeUVHeight),b.push(A.mapUv),b.push(A.alphaMapUv),b.push(A.lightMapUv),b.push(A.aoMapUv),b.push(A.bumpMapUv),b.push(A.normalMapUv),b.push(A.displacementMapUv),b.push(A.emissiveMapUv),b.push(A.metalnessMapUv),b.push(A.roughnessMapUv),b.push(A.anisotropyMapUv),b.push(A.clearcoatMapUv),b.push(A.clearcoatNormalMapUv),b.push(A.clearcoatRoughnessMapUv),b.push(A.iridescenceMapUv),b.push(A.iridescenceThicknessMapUv),b.push(A.sheenColorMapUv),b.push(A.sheenRoughnessMapUv),b.push(A.specularMapUv),b.push(A.specularColorMapUv),b.push(A.specularIntensityMapUv),b.push(A.transmissionMapUv),b.push(A.thicknessMapUv),b.push(A.combine),b.push(A.fogExp2),b.push(A.sizeAttenuation),b.push(A.morphTargetsCount),b.push(A.morphAttributeCount),b.push(A.numSunLights),b.push(A.numDirLights),b.push(A.numPointLights),b.push(A.numSpotLights),b.push(A.numSpotLightMaps),b.push(A.numHemiLights),b.push(A.numRectAreaLights),b.push(A.numSunLightShadows),b.push(A.numDirLightShadows),b.push(A.numPointLightShadows),b.push(A.numSpotLightShadows),b.push(A.numSpotLightShadowsWithMaps),b.push(A.numLightProbes),b.push(A.shadowMapType),b.push(A.toneMapping),b.push(A.numClippingPlanes),b.push(A.numClipIntersection),b.push(A.depthPacking)}function v(b,A){a.disableAll(),A.instancing&&a.enable(0),A.instancingColor&&a.enable(1),A.instancingMorph&&a.enable(2),A.matcap&&a.enable(3),A.envMap&&a.enable(4),A.normalMapObjectSpace&&a.enable(5),A.normalMapTangentSpace&&a.enable(6),A.clearcoat&&a.enable(7),A.iridescence&&a.enable(8),A.alphaTest&&a.enable(9),A.vertexColors&&a.enable(10),A.vertexAlphas&&a.enable(11),A.vertexUv1s&&a.enable(12),A.vertexUv2s&&a.enable(13),A.vertexUv3s&&a.enable(14),A.vertexTangents&&a.enable(15),A.anisotropy&&a.enable(16),A.alphaHash&&a.enable(17),A.batching&&a.enable(18),A.dispersion&&a.enable(19),A.retroreflection&&a.enable(24),A.batchingColor&&a.enable(20),A.gradientMap&&a.enable(21),A.packedNormalMap&&a.enable(22),A.vertexNormals&&a.enable(23),b.push(a.mask),a.disableAll(),A.fog&&a.enable(0),A.useFog&&a.enable(1),A.flatShading&&a.enable(2),A.logarithmicDepthBuffer&&a.enable(3),A.reversedDepthBuffer&&a.enable(4),A.skinning&&a.enable(5),A.morphTargets&&a.enable(6),A.morphNormals&&a.enable(7),A.morphColors&&a.enable(8),A.premultipliedAlpha&&a.enable(9),A.shadowMapEnabled&&a.enable(10),A.doubleSided&&a.enable(11),A.flipSided&&a.enable(12),A.useDepthPacking&&a.enable(13),A.dithering&&a.enable(14),A.transmission&&a.enable(15),A.sheen&&a.enable(16),A.opaque&&a.enable(17),A.pointsUvs&&a.enable(18),A.decodeVideoTexture&&a.enable(19),A.decodeVideoTextureEmissive&&a.enable(20),A.alphaToCoverage&&a.enable(21),A.numLightProbeGrids>0&&a.enable(22),A.hasPositionAttribute&&a.enable(23),b.push(a.mask)}function E(b){const A=f[b.type];let L;if(A){const N=gn[A];L=Ud.clone(N.uniforms)}else L=b.uniforms;return L}function M(b,A){let L=u.get(A);return L!==void 0?++L.usedTimes:(L=new ug(i,A,b,r),o.push(L),u.set(A,L)),L}function y(b){if(--b.usedTimes===0){const A=o.indexOf(b);o[A]=o[o.length-1],o.pop(),u.delete(b.cacheKey),b.destroy()}}function T(b){c.remove(b)}function C(){c.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:E,acquireProgram:M,releaseProgram:y,releaseShaderCache:T,programs:o,dispose:C}}function gg(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let c=i.get(a);return c===void 0&&(c={},i.set(a,c)),c}function n(a){i.delete(a)}function r(a,c,l){i.get(a)[c]=l}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function _g(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function ml(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function gl(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(h){let f=0;return h.isInstancedMesh&&(f+=2),h.isSkinnedMesh&&(f+=1),f}function c(h,f,_,g,p,m){let v=i[e];return v===void 0?(v={id:h.id,object:h,geometry:f,material:_,materialVariant:a(h),groupOrder:g,renderOrder:h.renderOrder,z:p,group:m},i[e]=v):(v.id=h.id,v.object=h,v.geometry=f,v.material=_,v.materialVariant=a(h),v.groupOrder=g,v.renderOrder=h.renderOrder,v.z=p,v.group=m),e++,v}function l(h,f,_,g,p,m,v){v.reversedDepth===!0&&(p=-p);const E=c(h,f,_,g,p,m);_.transmission>0?n.push(E):_.transparent===!0?r.push(E):t.push(E)}function o(h,f,_,g,p,m){const v=c(h,f,_,g,p,m);_.transmission>0?n.unshift(v):_.transparent===!0?r.unshift(v):t.unshift(v)}function u(h,f){t.length>1&&t.sort(h||_g),n.length>1&&n.sort(f||ml),r.length>1&&r.sort(f||ml)}function d(){for(let h=e,f=i.length;h<f;h++){const _=i[h];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:l,unshift:o,finish:d,sort:u}}function xg(){let i=new WeakMap;function e(n,r){const s=i.get(n);let a;return s===void 0?(a=new gl,i.set(n,[a])):r>=s.length?(a=new gl,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function vg(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new H,color:new at};break;case"SpotLight":t={position:new H,direction:new H,color:new at,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new H,color:new at,distance:0,decay:0};break;case"HemisphereLight":t={direction:new H,skyColor:new at,groundColor:new at};break;case"RectAreaLight":t={color:new at,position:new H,halfWidth:new H,halfHeight:new H};break}return i[e.id]=t,t}}}function Mg(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Sg=0;function bg(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Eg(i){const e=new vg,t=Mg(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let o=0;o<9;o++)n.probe.push(new H);const r=new H,s=new Et,a=new Et;function c(o){let u=0,d=0,h=0;for(let z=0;z<9;z++)n.probe[z].set(0,0,0);let f=0,_=0,g=0,p=0,m=0,v=0,E=0,M=0,y=0,T=0,C=0,b=0,A=0,L=0;o.sort(bg);for(let z=0,F=o.length;z<F;z++){const D=o[z],O=D.color,Y=D.intensity,K=D.distance;let ie=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===fi?ie=D.shadow.map.texture:ie=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)u+=O.r*Y,d+=O.g*Y,h+=O.b*Y;else if(D.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(D.sh.coefficients[G],Y);L++}else if(D.isSunLight){const G=e.get(D);if(G.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const J=D.shadow,ee=t.get(D);ee.shadowIntensity=J.intensity,ee.shadowBias=J.bias,ee.shadowNormalBias=J.normalBias,ee.shadowRadius=J.radius,ee.shadowMapSize.copy(J.mapSize).multiply(J.getFrameExtents()),n.sunShadow[_]=ee,n.sunShadowMap[_]=ie;const Te=J.getViewportCount();for(let Re=0;Re<Te;Re++)n.sunShadowMatrix[g+Re]=J.getMatrix(Re),n.sunShadowCascade[g+Re]=J._cascadeData[Re];g+=Te,_++}n.sun[f]=G,f++}else if(D.isDirectionalLight){const G=e.get(D);if(G.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const J=D.shadow,ee=t.get(D);ee.shadowIntensity=J.intensity,ee.shadowBias=J.bias,ee.shadowNormalBias=J.normalBias,ee.shadowRadius=J.radius,ee.shadowMapSize=J.mapSize,n.directionalShadow[p]=ee,n.directionalShadowMap[p]=ie,n.directionalShadowMatrix[p]=D.shadow.matrix,y++}n.directional[p]=G,p++}else if(D.isSpotLight){const G=e.get(D);G.position.setFromMatrixPosition(D.matrixWorld),G.color.copy(O).multiplyScalar(Y),G.distance=K,G.coneCos=Math.cos(D.angle),G.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),G.decay=D.decay,n.spot[v]=G;const J=D.shadow;if(D.map&&(n.spotLightMap[b]=D.map,b++,J.updateMatrices(D),D.castShadow&&A++),n.spotLightMatrix[v]=J.matrix,D.castShadow){const ee=t.get(D);ee.shadowIntensity=J.intensity,ee.shadowBias=J.bias,ee.shadowNormalBias=J.normalBias,ee.shadowRadius=J.radius,ee.shadowMapSize=J.mapSize,n.spotShadow[v]=ee,n.spotShadowMap[v]=ie,C++}v++}else if(D.isRectAreaLight){const G=e.get(D);G.color.copy(O).multiplyScalar(Y),G.halfWidth.set(D.width*.5,0,0),G.halfHeight.set(0,D.height*.5,0),n.rectArea[E]=G,E++}else if(D.isPointLight){const G=e.get(D);if(G.color.copy(D.color).multiplyScalar(D.intensity),G.distance=D.distance,G.decay=D.decay,D.castShadow){const J=D.shadow,ee=t.get(D);ee.shadowIntensity=J.intensity,ee.shadowBias=J.bias,ee.shadowNormalBias=J.normalBias,ee.shadowRadius=J.radius,ee.shadowMapSize=J.mapSize,ee.shadowCameraNear=J.camera.near,ee.shadowCameraFar=J.camera.far,n.pointShadow[m]=ee,n.pointShadowMap[m]=ie,n.pointShadowMatrix[m]=D.shadow.matrix,T++}n.point[m]=G,m++}else if(D.isHemisphereLight){const G=e.get(D);G.skyColor.copy(D.color).multiplyScalar(Y),G.groundColor.copy(D.groundColor).multiplyScalar(Y),n.hemi[M]=G,M++}}E>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=fe.LTC_FLOAT_1,n.rectAreaLTC2=fe.LTC_FLOAT_2):(n.rectAreaLTC1=fe.LTC_HALF_1,n.rectAreaLTC2=fe.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=h;const N=n.hash;(N.sunLength!==f||N.directionalLength!==p||N.pointLength!==m||N.spotLength!==v||N.rectAreaLength!==E||N.hemiLength!==M||N.numSunShadows!==_||N.numDirectionalShadows!==y||N.numPointShadows!==T||N.numSpotShadows!==C||N.numSpotMaps!==b||N.numLightProbes!==L)&&(n.sun.length=f,n.directional.length=p,n.spot.length=v,n.rectArea.length=E,n.point.length=m,n.hemi.length=M,n.sunShadow.length=_,n.sunShadowMap.length=_,n.sunShadowMatrix.length=g,n.sunShadowCascade.length=g,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.directionalShadowMatrix.length=y,n.pointShadow.length=T,n.pointShadowMap.length=T,n.pointShadowMatrix.length=T,n.spotShadow.length=C,n.spotShadowMap.length=C,n.spotLightMatrix.length=C+b-A,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=L,N.sunLength=f,N.directionalLength=p,N.pointLength=m,N.spotLength=v,N.rectAreaLength=E,N.hemiLength=M,N.numSunShadows=_,N.numDirectionalShadows=y,N.numPointShadows=T,N.numSpotShadows=C,N.numSpotMaps=b,N.numLightProbes=L,n.version=Sg++)}function l(o,u){let d=0,h=0,f=0,_=0,g=0,p=0;const m=u.matrixWorldInverse;for(let v=0,E=o.length;v<E;v++){const M=o[v];if(M.isSunLight){const y=n.sun[d];y.direction.setFromMatrixPosition(M.matrixWorld),y.direction.transformDirection(m),d++}else if(M.isDirectionalLight){const y=n.directional[h];y.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(m),h++}else if(M.isSpotLight){const y=n.spot[_];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(m),_++}else if(M.isRectAreaLight){const y=n.rectArea[g];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),a.identity(),s.copy(M.matrixWorld),s.premultiply(m),a.extractRotation(s),y.halfWidth.set(M.width*.5,0,0),y.halfHeight.set(0,M.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),g++}else if(M.isPointLight){const y=n.point[f];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){const y=n.hemi[p];y.direction.setFromMatrixPosition(M.matrixWorld),y.direction.transformDirection(m),p++}}}return{setup:c,setupView:l,state:n}}function _l(i){const e=new Eg(i),t=[],n=[],r=[];function s(h){d.camera=h,t.length=0,n.length=0,r.length=0}function a(h){t.push(h)}function c(h){n.push(h)}function l(h){r.push(h)}function o(){e.setup(t)}function u(h){e.setupView(t,h)}const d={lightsArray:t,shadowsArray:n,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:d,setupLights:o,setupLightsView:u,pushLight:a,pushShadow:c,pushLightProbeGrid:l}}function yg(i){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let c;return a===void 0?(c=new _l(i),e.set(r,[c])):s>=a.length?(c=new _l(i),a.push(c)):c=a[s],c}function n(){e=new WeakMap}return{get:t,dispose:n}}const wg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Tg=`uniform sampler2D shadow_pass;
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
}`,Ag=[new H(1,0,0),new H(-1,0,0),new H(0,1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1)],Bg=[new H(0,-1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1),new H(0,-1,0),new H(0,-1,0)],xl=new Et,ir=new H,js=new H;function Rg(i,e,t){let n=new sc;const r=new We,s=new We,a=new vt,c=new kd,l=new Gd,o={},u=t.maxTextureSize,d={[hi]:Vt,[Vt]:hi,[Ln]:Ln},h=new Ft({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new We},radius:{value:4}},vertexShader:wg,fragmentShader:Tg}),f=h.clone();f.defines.HORIZONTAL_PASS=1;const _=new En;_.setAttribute("position",new Mn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new Wt(_,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Jr;let m=this.type;this.render=function(T,C,b){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;this.type===Bh&&(ke("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Jr);const A=i.getRenderTarget(),L=i.getActiveCubeFace(),N=i.getActiveMipmapLevel(),z=i.state;z.setBlending(In),z.buffers.depth.getReversed()===!0?z.buffers.color.setClear(0,0,0,0):z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const F=m!==this.type;F&&C.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach(O=>O.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,O=T.length;D<O;D++){const Y=T[D],K=Y.shadow;if(K===void 0){ke("WebGLShadowMap:",Y,"has no shadow.");continue}if(K.autoUpdate===!1&&K.needsUpdate===!1)continue;r.copy(K.mapSize);const ie=K.getFrameExtents();r.multiply(ie),s.copy(K.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/ie.x),r.x=s.x*ie.x,K.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/ie.y),r.y=s.y*ie.y,K.mapSize.y=s.y));const G=i.state.buffers.depth.getReversed();if(K.camera._reversedDepth=G,K.map===null||F===!0){if(K.map!==null&&(K.map.depthTexture!==null&&(K.map.depthTexture.dispose(),K.map.depthTexture=null),K.map.dispose()),this.type===sr){if(Y.isPointLight){ke("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}K.map=new sn(r.x,r.y,{format:fi,type:bn,minFilter:bt,magFilter:bt,generateMipmaps:!1}),K.map.texture.name=Y.name+".shadowMap",K.map.depthTexture=new pr(r.x,r.y,_n),K.map.depthTexture.name=Y.name+".shadowMapDepth",K.map.depthTexture.format=On,K.map.depthTexture.compareFunction=null,K.map.depthTexture.minFilter=At,K.map.depthTexture.magFilter=At}else Y.isPointLight?(K.map=new pc(r.x),K.map.depthTexture=new Id(r.x,Sn)):(K.map=new sn(r.x,r.y),K.map.depthTexture=new pr(r.x,r.y,Sn)),K.map.depthTexture.name=Y.name+".shadowMap",K.map.depthTexture.format=On,this.type===Jr?(K.map.depthTexture.compareFunction=G?so:ro,K.map.depthTexture.minFilter=bt,K.map.depthTexture.magFilter=bt):(K.map.depthTexture.compareFunction=null,K.map.depthTexture.minFilter=At,K.map.depthTexture.magFilter=At);K.camera.updateProjectionMatrix()}K.map.isWebGLCubeRenderTarget!==!0&&(K.map.width!==r.x||K.map.height!==r.y)&&K.map.setSize(r.x,r.y);const J=K.map.isWebGLCubeRenderTarget?6:K.getViewportCount();Y.isPointLight!==!0&&K.updateMatrices(Y,b);for(let ee=0;ee<J;ee++){const Te=K.getCamera(ee);if(Y.isPointLight){const Re=K.camera,ct=K.matrix,qe=Y.distance||Re.far;qe!==Re.far&&(Re.far=qe,Re.updateProjectionMatrix()),ir.setFromMatrixPosition(Y.matrixWorld),Re.position.copy(ir),js.copy(Re.position),js.add(Ag[ee]),Re.up.copy(Bg[ee]),Re.lookAt(js),Re.updateMatrixWorld(),ct.makeTranslation(-ir.x,-ir.y,-ir.z),xl.multiplyMatrices(Re.projectionMatrix,Re.matrixWorldInverse),K._frustum.setFromProjectionMatrix(xl,Re.coordinateSystem,Re.reversedDepth)}if(K.map.isWebGLCubeRenderTarget)i.setRenderTarget(K.map,ee),i.clear();else{ee===0&&(i.setRenderTarget(K.map),i.clear());const Re=K.getViewport(ee);a.set(s.x*Re.x,s.y*Re.y,s.x*Re.z,s.y*Re.w),z.viewport(a)}n=K.getFrustum(ee),M(C,b,Te,Y,this.type)}K.isPointLightShadow!==!0&&this.type===sr&&v(K,b),K.needsUpdate=!1}m=this.type,p.needsUpdate=!1,i.setRenderTarget(A,L,N)};function v(T,C){const b=e.update(g);h.defines.VSM_SAMPLES!==T.blurSamples&&(h.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null?T.mapPass=new sn(r.x,r.y,{format:fi,type:bn}):(T.mapPass.width!==T.map.width||T.mapPass.height!==T.map.height)&&T.mapPass.setSize(T.map.width,T.map.height),h.uniforms.shadow_pass.value=T.map.depthTexture,h.uniforms.resolution.value.set(T.map.width,T.map.height),h.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(C,null,b,h,g,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value.set(T.map.width,T.map.height),f.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(C,null,b,f,g,null)}function E(T,C,b,A){let L=null;const N=b.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(N!==void 0)L=N;else if(L=b.isPointLight===!0?l:c,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const z=L.uuid,F=C.uuid;let D=o[z];D===void 0&&(D={},o[z]=D);let O=D[F];O===void 0&&(O=L.clone(),D[F]=O,C.addEventListener("dispose",y)),L=O}if(L.visible=C.visible,L.wireframe=C.wireframe,A===sr?L.side=C.shadowSide!==null?C.shadowSide:C.side:L.side=C.shadowSide!==null?C.shadowSide:d[C.side],L.alphaMap=C.alphaMap,L.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,L.map=C.map,L.clipShadows=C.clipShadows,L.clippingPlanes=C.clippingPlanes,L.clipIntersection=C.clipIntersection,L.displacementMap=C.displacementMap,L.displacementScale=C.displacementScale,L.displacementBias=C.displacementBias,L.wireframeLinewidth=C.wireframeLinewidth,L.linewidth=C.linewidth,b.isPointLight===!0&&L.isMeshDistanceMaterial===!0){const z=i.properties.get(L);z.light=b}return L}function M(T,C,b,A,L){if(T.visible===!1)return;if(T.layers.test(C.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&L===sr)&&(!T.frustumCulled||T.intersectsFrustum(n))){T.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,T.matrixWorld);const F=e.update(T),D=T.material;if(Array.isArray(D)){const O=F.groups;for(let Y=0,K=O.length;Y<K;Y++){const ie=O[Y],G=D[ie.materialIndex];if(G&&G.visible){const J=E(T,G,A,L);T.onBeforeShadow(i,T,C,b,F,J,ie),i.renderBufferDirect(b,null,F,J,T,ie),T.onAfterShadow(i,T,C,b,F,J,ie)}}}else if(D.visible){const O=E(T,D,A,L);T.onBeforeShadow(i,T,C,b,F,O,null),i.renderBufferDirect(b,null,F,O,T,null),T.onAfterShadow(i,T,C,b,F,O,null)}}const z=T.children;for(let F=0,D=z.length;F<D;F++)M(z[F],C,b,A,L)}function y(T){T.target.removeEventListener("dispose",y);for(const b in o){const A=o[b],L=T.target.uuid;L in A&&(A[L].dispose(),delete A[L])}}}function Cg(i,e){function t(){let U=!1;const ue=new vt;let te=null;const he=new vt(0,0,0,0);return{setMask:function(xe){te!==xe&&!U&&(i.colorMask(xe,xe,xe,xe),te=xe)},setLocked:function(xe){U=xe},setClear:function(xe,se,Ue,Le,pt){pt===!0&&(xe*=Le,se*=Le,Ue*=Le),ue.set(xe,se,Ue,Le),he.equals(ue)===!1&&(i.clearColor(xe,se,Ue,Le),he.copy(ue))},reset:function(){U=!1,te=null,he.set(-1,0,0,0)}}}function n(){let U=!1,ue=!1,te=null,he=null,xe=null;return{setReversed:function(se){if(ue!==se){const Ue=e.get("EXT_clip_control");se?Ue.clipControlEXT(Ue.LOWER_LEFT_EXT,Ue.ZERO_TO_ONE_EXT):Ue.clipControlEXT(Ue.LOWER_LEFT_EXT,Ue.NEGATIVE_ONE_TO_ONE_EXT),ue=se;const Le=xe;xe=null,this.setClear(Le)}},getReversed:function(){return ue},setTest:function(se){se?re(i.DEPTH_TEST):be(i.DEPTH_TEST)},setMask:function(se){te!==se&&!U&&(i.depthMask(se),te=se)},setFunc:function(se){if(ue&&(se=cd[se]),he!==se){switch(se){case ia:i.depthFunc(i.NEVER);break;case ra:i.depthFunc(i.ALWAYS);break;case sa:i.depthFunc(i.LESS);break;case ur:i.depthFunc(i.LEQUAL);break;case aa:i.depthFunc(i.EQUAL);break;case oa:i.depthFunc(i.GEQUAL);break;case la:i.depthFunc(i.GREATER);break;case ca:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}he=se}},setLocked:function(se){U=se},setClear:function(se){xe!==se&&(xe=se,ue&&(se=1-se),i.clearDepth(se))},reset:function(){U=!1,te=null,he=null,xe=null,ue=!1}}}function r(){let U=!1,ue=null,te=null,he=null,xe=null,se=null,Ue=null,Le=null,pt=null;return{setTest:function(ot){U||(ot?re(i.STENCIL_TEST):be(i.STENCIL_TEST))},setMask:function(ot){ue!==ot&&!U&&(i.stencilMask(ot),ue=ot)},setFunc:function(ot,an,dn){(te!==ot||he!==an||xe!==dn)&&(i.stencilFunc(ot,an,dn),te=ot,he=an,xe=dn)},setOp:function(ot,an,dn){(se!==ot||Ue!==an||Le!==dn)&&(i.stencilOp(ot,an,dn),se=ot,Ue=an,Le=dn)},setLocked:function(ot){U=ot},setClear:function(ot){pt!==ot&&(i.clearStencil(ot),pt=ot)},reset:function(){U=!1,ue=null,te=null,he=null,xe=null,se=null,Ue=null,Le=null,pt=null}}}const s=new t,a=new n,c=new r,l=new WeakMap,o=new WeakMap;let u={},d={},h={},f=new WeakMap,_=[],g=null,p=!1,m=null,v=null,E=null,M=null,y=null,T=null,C=null,b=new at(0,0,0),A=0,L=!1,N=null,z=null,F=null,D=null,O=null;const Y=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let K=!1,ie=0;const G=i.getParameter(i.VERSION);G.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(G)[1]),K=ie>=1):G.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),K=ie>=2);let J=null,ee={};const Te=i.getParameter(i.SCISSOR_BOX),Re=i.getParameter(i.VIEWPORT),ct=new vt().fromArray(Te),qe=new vt().fromArray(Re);function Qe(U,ue,te,he){const xe=new Uint8Array(4),se=i.createTexture();i.bindTexture(U,se),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ue=0;Ue<te;Ue++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(ue,0,i.RGBA,1,1,he,0,i.RGBA,i.UNSIGNED_BYTE,xe):i.texImage2D(ue+Ue,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,xe);return se}const Q={};Q[i.TEXTURE_2D]=Qe(i.TEXTURE_2D,i.TEXTURE_2D,1),Q[i.TEXTURE_CUBE_MAP]=Qe(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[i.TEXTURE_2D_ARRAY]=Qe(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Q[i.TEXTURE_3D]=Qe(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),c.setClear(0),re(i.DEPTH_TEST),a.setFunc(ur),Me(!1),Ye(wo),re(i.CULL_FACE),Pe(In);function re(U){u[U]!==!0&&(i.enable(U),u[U]=!0)}function be(U){u[U]!==!1&&(i.disable(U),u[U]=!1)}function ze(U,ue){return h[U]!==ue?(i.bindFramebuffer(U,ue),h[U]=ue,U===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=ue),U===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=ue),!0):!1}function Se(U,ue){let te=_,he=!1;if(U){te=f.get(ue),te===void 0&&(te=[],f.set(ue,te));const xe=U.textures;if(te.length!==xe.length||te[0]!==i.COLOR_ATTACHMENT0){for(let se=0,Ue=xe.length;se<Ue;se++)te[se]=i.COLOR_ATTACHMENT0+se;te.length=xe.length,he=!0}}else te[0]!==i.BACK&&(te[0]=i.BACK,he=!0);he&&i.drawBuffers(te)}function Z(U){return g!==U?(i.useProgram(U),g=U,!0):!1}const ve={[Di]:i.FUNC_ADD,[Ch]:i.FUNC_SUBTRACT,[Lh]:i.FUNC_REVERSE_SUBTRACT};ve[Dh]=i.MIN,ve[Ph]=i.MAX;const ge={[Ih]:i.ZERO,[Nh]:i.ONE,[Uh]:i.SRC_COLOR,[Dl]:i.SRC_ALPHA,[Wh]:i.SRC_ALPHA_SATURATE,[kh]:i.DST_COLOR,[Oh]:i.DST_ALPHA,[Fh]:i.ONE_MINUS_SRC_COLOR,[Pl]:i.ONE_MINUS_SRC_ALPHA,[Gh]:i.ONE_MINUS_DST_COLOR,[zh]:i.ONE_MINUS_DST_ALPHA,[Hh]:i.CONSTANT_COLOR,[Vh]:i.ONE_MINUS_CONSTANT_COLOR,[Xh]:i.CONSTANT_ALPHA,[Yh]:i.ONE_MINUS_CONSTANT_ALPHA};function Pe(U,ue,te,he,xe,se,Ue,Le,pt,ot){if(U===In){p===!0&&(be(i.BLEND),p=!1);return}if(p===!1&&(re(i.BLEND),p=!0),U!==Rh){if(U!==m||ot!==L){if((v!==Di||y!==Di)&&(i.blendEquation(i.FUNC_ADD),v=Di,y=Di),ot)switch(U){case lr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case To:i.blendFunc(i.ONE,i.ONE);break;case Ao:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Bo:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:rt("WebGLState: Invalid blending: ",U);break}else switch(U){case lr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case To:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Ao:rt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Bo:rt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:rt("WebGLState: Invalid blending: ",U);break}E=null,M=null,T=null,C=null,b.set(0,0,0),A=0,m=U,L=ot}return}xe=xe||ue,se=se||te,Ue=Ue||he,(ue!==v||xe!==y)&&(i.blendEquationSeparate(ve[ue],ve[xe]),v=ue,y=xe),(te!==E||he!==M||se!==T||Ue!==C)&&(i.blendFuncSeparate(ge[te],ge[he],ge[se],ge[Ue]),E=te,M=he,T=se,C=Ue),(Le.equals(b)===!1||pt!==A)&&(i.blendColor(Le.r,Le.g,Le.b,pt),b.copy(Le),A=pt),m=U,L=!1}function Ce(U,ue){U.side===Ln?be(i.CULL_FACE):re(i.CULL_FACE);let te=U.side===Vt;ue&&(te=!te),Me(te),U.blending===lr&&U.transparent===!1?Pe(In):Pe(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),s.setMask(U.colorWrite);const he=U.stencilWrite;c.setTest(he),he&&(c.setMask(U.stencilWriteMask),c.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),c.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),dt(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?re(i.SAMPLE_ALPHA_TO_COVERAGE):be(i.SAMPLE_ALPHA_TO_COVERAGE)}function Me(U){N!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),N=U)}function Ye(U){U!==Th?(re(i.CULL_FACE),U!==z&&(U===wo?i.cullFace(i.BACK):U===Ah?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):be(i.CULL_FACE),z=U}function je(U){U!==F&&(K&&i.lineWidth(U),F=U)}function dt(U,ue,te){U?(re(i.POLYGON_OFFSET_FILL),(D!==ue||O!==te)&&(D=ue,O=te,a.getReversed()&&(ue=-ue),i.polygonOffset(ue,te))):be(i.POLYGON_OFFSET_FILL)}function et(U){U?re(i.SCISSOR_TEST):be(i.SCISSOR_TEST)}function tt(U){U===void 0&&(U=i.TEXTURE0+Y-1),J!==U&&(i.activeTexture(U),J=U)}function P(U,ue,te){te===void 0&&(J===null?te=i.TEXTURE0+Y-1:te=J);let he=ee[te];he===void 0&&(he={type:void 0,texture:void 0},ee[te]=he),(he.type!==U||he.texture!==ue)&&(J!==te&&(i.activeTexture(te),J=te),i.bindTexture(U,ue||Q[U]),he.type=U,he.texture=ue)}function Mt(){const U=ee[J];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function nt(){try{i.compressedTexImage2D(...arguments)}catch(U){rt("WebGLState:",U)}}function B(){try{i.compressedTexImage3D(...arguments)}catch(U){rt("WebGLState:",U)}}function S(){try{i.texSubImage2D(...arguments)}catch(U){rt("WebGLState:",U)}}function k(){try{i.texSubImage3D(...arguments)}catch(U){rt("WebGLState:",U)}}function W(){try{i.compressedTexSubImage2D(...arguments)}catch(U){rt("WebGLState:",U)}}function $(){try{i.compressedTexSubImage3D(...arguments)}catch(U){rt("WebGLState:",U)}}function ae(){try{i.texStorage2D(...arguments)}catch(U){rt("WebGLState:",U)}}function oe(){try{i.texStorage3D(...arguments)}catch(U){rt("WebGLState:",U)}}function j(){try{i.texImage2D(...arguments)}catch(U){rt("WebGLState:",U)}}function ne(){try{i.texImage3D(...arguments)}catch(U){rt("WebGLState:",U)}}function le(U){return d[U]!==void 0?d[U]:i.getParameter(U)}function Ie(U,ue){d[U]!==ue&&(i.pixelStorei(U,ue),d[U]=ue)}function de(U){ct.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),ct.copy(U))}function ce(U){qe.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),qe.copy(U))}function Ne(U,ue){let te=o.get(ue);te===void 0&&(te=new WeakMap,o.set(ue,te));let he=te.get(U);he===void 0&&(he=i.getUniformBlockIndex(ue,U.name),te.set(U,he))}function Oe(U,ue){const he=o.get(ue).get(U);l.get(ue)!==he&&(i.uniformBlockBinding(ue,he,U.__bindingPointIndex),l.set(ue,he))}function He(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},d={},J=null,ee={},h={},f=new WeakMap,_=[],g=null,p=!1,m=null,v=null,E=null,M=null,y=null,T=null,C=null,b=new at(0,0,0),A=0,L=!1,N=null,z=null,F=null,D=null,O=null,ct.set(0,0,i.canvas.width,i.canvas.height),qe.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),c.reset()}return{buffers:{color:s,depth:a,stencil:c},enable:re,disable:be,bindFramebuffer:ze,drawBuffers:Se,useProgram:Z,setBlending:Pe,setMaterial:Ce,setFlipSided:Me,setCullFace:Ye,setLineWidth:je,setPolygonOffset:dt,setScissorTest:et,activeTexture:tt,bindTexture:P,unbindTexture:Mt,compressedTexImage2D:nt,compressedTexImage3D:B,texImage2D:j,texImage3D:ne,pixelStorei:Ie,getParameter:le,updateUBOMapping:Ne,uniformBlockBinding:Oe,texStorage2D:ae,texStorage3D:oe,texSubImage2D:S,texSubImage3D:k,compressedTexSubImage2D:W,compressedTexSubImage3D:$,scissor:de,viewport:ce,reset:He}}function Lg(i,e,t,n,r,s,a){const c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),o=new We,u=new WeakMap,d=new Set;let h;const f=new WeakMap;let _=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(B,S){return _?new OffscreenCanvas(B,S):ls("canvas")}function p(B,S,k){let W=1;const $=nt(B);if(($.width>k||$.height>k)&&(W=k/Math.max($.width,$.height)),W<1)if(typeof HTMLImageElement<"u"&&B instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&B instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&B instanceof ImageBitmap||typeof VideoFrame<"u"&&B instanceof VideoFrame){const ae=Math.floor(W*$.width),oe=Math.floor(W*$.height);h===void 0&&(h=g(ae,oe));const j=S?g(ae,oe):h;return j.width=ae,j.height=oe,j.getContext("2d").drawImage(B,0,0,ae,oe),ke("WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+ae+"x"+oe+")."),j}else return"data"in B&&ke("WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),B;return B}function m(B){return B.generateMipmaps}function v(B){i.generateMipmap(B)}function E(B){return B.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:B.isWebGL3DRenderTarget?i.TEXTURE_3D:B.isWebGLArrayRenderTarget||B.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(B,S,k,W,$,ae=!1){if(B!==null){if(i[B]!==void 0)return i[B];ke("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+B+"'")}let oe;W&&(oe=e.get("EXT_texture_norm16"),oe||ke("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let j=S;if(S===i.RED&&(k===i.FLOAT&&(j=i.R32F),k===i.HALF_FLOAT&&(j=i.R16F),k===i.UNSIGNED_BYTE&&(j=i.R8),k===i.UNSIGNED_SHORT&&oe&&(j=oe.R16_EXT),k===i.SHORT&&oe&&(j=oe.R16_SNORM_EXT)),S===i.RED_INTEGER&&(k===i.UNSIGNED_BYTE&&(j=i.R8UI),k===i.UNSIGNED_SHORT&&(j=i.R16UI),k===i.UNSIGNED_INT&&(j=i.R32UI),k===i.BYTE&&(j=i.R8I),k===i.SHORT&&(j=i.R16I),k===i.INT&&(j=i.R32I)),S===i.RG&&(k===i.FLOAT&&(j=i.RG32F),k===i.HALF_FLOAT&&(j=i.RG16F),k===i.UNSIGNED_BYTE&&(j=i.RG8),k===i.UNSIGNED_SHORT&&oe&&(j=oe.RG16_EXT),k===i.SHORT&&oe&&(j=oe.RG16_SNORM_EXT)),S===i.RG_INTEGER&&(k===i.UNSIGNED_BYTE&&(j=i.RG8UI),k===i.UNSIGNED_SHORT&&(j=i.RG16UI),k===i.UNSIGNED_INT&&(j=i.RG32UI),k===i.BYTE&&(j=i.RG8I),k===i.SHORT&&(j=i.RG16I),k===i.INT&&(j=i.RG32I)),S===i.RGB_INTEGER&&(k===i.UNSIGNED_BYTE&&(j=i.RGB8UI),k===i.UNSIGNED_SHORT&&(j=i.RGB16UI),k===i.UNSIGNED_INT&&(j=i.RGB32UI),k===i.BYTE&&(j=i.RGB8I),k===i.SHORT&&(j=i.RGB16I),k===i.INT&&(j=i.RGB32I)),S===i.RGBA_INTEGER&&(k===i.UNSIGNED_BYTE&&(j=i.RGBA8UI),k===i.UNSIGNED_SHORT&&(j=i.RGBA16UI),k===i.UNSIGNED_INT&&(j=i.RGBA32UI),k===i.BYTE&&(j=i.RGBA8I),k===i.SHORT&&(j=i.RGBA16I),k===i.INT&&(j=i.RGBA32I)),S===i.RGB&&(k===i.UNSIGNED_SHORT&&oe&&(j=oe.RGB16_EXT),k===i.SHORT&&oe&&(j=oe.RGB16_SNORM_EXT),k===i.UNSIGNED_INT_5_9_9_9_REV&&(j=i.RGB9_E5),k===i.UNSIGNED_INT_10F_11F_11F_REV&&(j=i.R11F_G11F_B10F)),S===i.RGBA){const ne=ae?as:$e.getTransfer($);k===i.FLOAT&&(j=i.RGBA32F),k===i.HALF_FLOAT&&(j=i.RGBA16F),k===i.UNSIGNED_BYTE&&(j=ne===ut?i.SRGB8_ALPHA8:i.RGBA8),k===i.UNSIGNED_SHORT&&oe&&(j=oe.RGBA16_EXT),k===i.SHORT&&oe&&(j=oe.RGBA16_SNORM_EXT),k===i.UNSIGNED_SHORT_4_4_4_4&&(j=i.RGBA4),k===i.UNSIGNED_SHORT_5_5_5_1&&(j=i.RGB5_A1)}return(j===i.R16F||j===i.R32F||j===i.RG16F||j===i.RG32F||j===i.RGBA16F||j===i.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function y(B,S){let k;return B?S===null||S===Sn||S===dr?k=i.DEPTH24_STENCIL8:S===_n?k=i.DEPTH32F_STENCIL8:S===hr&&(k=i.DEPTH24_STENCIL8,ke("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Sn||S===dr?k=i.DEPTH_COMPONENT24:S===_n?k=i.DEPTH_COMPONENT32F:S===hr&&(k=i.DEPTH_COMPONENT16),k}function T(B,S){return m(B)===!0||B.isFramebufferTexture&&B.minFilter!==At&&B.minFilter!==bt?Math.log2(Math.max(S.width,S.height))+1:B.mipmaps!==void 0&&B.mipmaps.length>0?B.mipmaps.length:B.isCompressedTexture&&Array.isArray(B.image)?S.mipmaps.length:1}function C(B){const S=B.target;S.removeEventListener("dispose",C),A(S),S.isVideoTexture&&u.delete(S),S.isHTMLTexture&&d.delete(S)}function b(B){const S=B.target;S.removeEventListener("dispose",b),N(S)}function A(B){const S=n.get(B);if(S.__webglInit===void 0)return;const k=B.source,W=f.get(k);if(W){const $=W[S.__cacheKey];$.usedTimes--,$.usedTimes===0&&L(B),Object.keys(W).length===0&&f.delete(k)}n.remove(B)}function L(B){const S=n.get(B);i.deleteTexture(S.__webglTexture);const k=B.source,W=f.get(k);delete W[S.__cacheKey],a.memory.textures--}function N(B){const S=n.get(B);if(B.depthTexture&&(B.depthTexture.dispose(),n.remove(B.depthTexture)),B.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(S.__webglFramebuffer[W]))for(let $=0;$<S.__webglFramebuffer[W].length;$++)i.deleteFramebuffer(S.__webglFramebuffer[W][$]);else i.deleteFramebuffer(S.__webglFramebuffer[W]);S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer[W])}else{if(Array.isArray(S.__webglFramebuffer))for(let W=0;W<S.__webglFramebuffer.length;W++)i.deleteFramebuffer(S.__webglFramebuffer[W]);else i.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&i.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let W=0;W<S.__webglColorRenderbuffer.length;W++)S.__webglColorRenderbuffer[W]&&i.deleteRenderbuffer(S.__webglColorRenderbuffer[W]);S.__webglDepthRenderbuffer&&i.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const k=B.textures;for(let W=0,$=k.length;W<$;W++){const ae=n.get(k[W]);ae.__webglTexture&&(i.deleteTexture(ae.__webglTexture),a.memory.textures--),n.remove(k[W])}n.remove(B)}let z=0;function F(){z=0}function D(){return z}function O(B){z=B}function Y(){const B=z;return B>=r.maxTextures&&ke("WebGLTextures: Trying to use "+(B+1)+" texture units while this GPU supports only "+r.maxTextures),z+=1,B}function K(B){const S=[];return S.push(B.wrapS),S.push(B.wrapT),S.push(B.wrapR||0),S.push(B.magFilter),S.push(B.minFilter),S.push(B.anisotropy),S.push(B.internalFormat),S.push(B.format),S.push(B.type),S.push(B.generateMipmaps),S.push(B.premultiplyAlpha),S.push(B.flipY),S.push(B.unpackAlignment),S.push(B.colorSpace),S.join()}function ie(B,S){const k=n.get(B);if(B.isVideoTexture&&P(B),B.isRenderTargetTexture===!1&&B.isExternalTexture!==!0&&B.version>0&&k.__version!==B.version){const W=B.image;if(W===null)ke("WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)ke("WebGLRenderer: Texture marked for update but image is incomplete");else{be(k,B,S);return}}else B.isExternalTexture&&(k.__webglTexture=B.sourceTexture?B.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,k.__webglTexture,i.TEXTURE0+S)}function G(B,S){const k=n.get(B);if(B.isRenderTargetTexture===!1&&B.version>0&&k.__version!==B.version){be(k,B,S);return}else B.isExternalTexture&&(k.__webglTexture=B.sourceTexture?B.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,k.__webglTexture,i.TEXTURE0+S)}function J(B,S){const k=n.get(B);if(B.isRenderTargetTexture===!1&&B.version>0&&k.__version!==B.version){be(k,B,S);return}t.bindTexture(i.TEXTURE_3D,k.__webglTexture,i.TEXTURE0+S)}function ee(B,S){const k=n.get(B);if(B.isCubeDepthTexture!==!0&&B.version>0&&k.__version!==B.version){ze(k,B,S);return}t.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture,i.TEXTURE0+S)}const Te={[ua]:i.REPEAT,[Dn]:i.CLAMP_TO_EDGE,[ha]:i.MIRRORED_REPEAT},Re={[At]:i.NEAREST,[Zh]:i.NEAREST_MIPMAP_NEAREST,[yr]:i.NEAREST_MIPMAP_LINEAR,[bt]:i.LINEAR,[ys]:i.LINEAR_MIPMAP_NEAREST,[oi]:i.LINEAR_MIPMAP_LINEAR},ct={[jh]:i.NEVER,[rd]:i.ALWAYS,[ed]:i.LESS,[ro]:i.LEQUAL,[td]:i.EQUAL,[so]:i.GEQUAL,[nd]:i.GREATER,[id]:i.NOTEQUAL};function qe(B,S){if(S.type===_n&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===bt||S.magFilter===ys||S.magFilter===yr||S.magFilter===oi||S.minFilter===bt||S.minFilter===ys||S.minFilter===yr||S.minFilter===oi)&&ke("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(B,i.TEXTURE_WRAP_S,Te[S.wrapS]),i.texParameteri(B,i.TEXTURE_WRAP_T,Te[S.wrapT]),(B===i.TEXTURE_3D||B===i.TEXTURE_2D_ARRAY)&&i.texParameteri(B,i.TEXTURE_WRAP_R,Te[S.wrapR]),i.texParameteri(B,i.TEXTURE_MAG_FILTER,Re[S.magFilter]),i.texParameteri(B,i.TEXTURE_MIN_FILTER,Re[S.minFilter]),S.compareFunction&&(i.texParameteri(B,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(B,i.TEXTURE_COMPARE_FUNC,ct[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===At||S.minFilter!==yr&&S.minFilter!==oi||S.type===_n&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const k=e.get("EXT_texture_filter_anisotropic");i.texParameterf(B,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,r.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function Qe(B,S){let k=!1;B.__webglInit===void 0&&(B.__webglInit=!0,S.addEventListener("dispose",C));const W=S.source;let $=f.get(W);$===void 0&&($={},f.set(W,$));const ae=K(S);if(ae!==B.__cacheKey){$[ae]===void 0&&($[ae]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,k=!0),$[ae].usedTimes++;const oe=$[B.__cacheKey];oe!==void 0&&($[B.__cacheKey].usedTimes--,oe.usedTimes===0&&L(S)),B.__cacheKey=ae,B.__webglTexture=$[ae].texture}return k}function Q(B,S,k){return Math.floor(Math.floor(B/k)/S)}function re(B,S,k,W){const ae=B.updateRanges;if(ae.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,S.width,S.height,k,W,S.data);else{ae.sort((Ie,de)=>Ie.start-de.start);let oe=0;for(let Ie=1;Ie<ae.length;Ie++){const de=ae[oe],ce=ae[Ie],Ne=de.start+de.count,Oe=Q(ce.start,S.width,4),He=Q(de.start,S.width,4);ce.start<=Ne+1&&Oe===He&&Q(ce.start+ce.count-1,S.width,4)===Oe?de.count=Math.max(de.count,ce.start+ce.count-de.start):(++oe,ae[oe]=ce)}ae.length=oe+1;const j=t.getParameter(i.UNPACK_ROW_LENGTH),ne=t.getParameter(i.UNPACK_SKIP_PIXELS),le=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,S.width);for(let Ie=0,de=ae.length;Ie<de;Ie++){const ce=ae[Ie],Ne=Math.floor(ce.start/4),Oe=Math.ceil(ce.count/4),He=Ne%S.width,U=Math.floor(Ne/S.width),ue=Oe,te=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,He),t.pixelStorei(i.UNPACK_SKIP_ROWS,U),t.texSubImage2D(i.TEXTURE_2D,0,He,U,ue,te,k,W,S.data)}B.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,j),t.pixelStorei(i.UNPACK_SKIP_PIXELS,ne),t.pixelStorei(i.UNPACK_SKIP_ROWS,le)}}function be(B,S,k){let W=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(W=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(W=i.TEXTURE_3D);const $=Qe(B,S),ae=S.source;t.bindTexture(W,B.__webglTexture,i.TEXTURE0+k);const oe=n.get(ae);if(ae.version!==oe.__version||$===!0){if(t.activeTexture(i.TEXTURE0+k),(typeof ImageBitmap<"u"&&S.image instanceof ImageBitmap)===!1){const te=$e.getPrimaries($e.workingColorSpace),he=S.colorSpace===un?null:$e.getPrimaries(S.colorSpace),xe=S.colorSpace===un||te===he?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe)}t.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment);let ne=p(S.image,!1,r.maxTextureSize);ne=Mt(S,ne);const le=s.convert(S.format,S.colorSpace),Ie=s.convert(S.type);let de=M(S.internalFormat,le,Ie,S.normalized,S.colorSpace,S.isVideoTexture);qe(W,S);let ce;const Ne=S.mipmaps,Oe=S.isVideoTexture!==!0,He=oe.__version===void 0||$===!0,U=ae.dataReady,ue=T(S,ne);if(S.isDepthTexture)de=y(S.format===li,S.type),He&&(Oe?t.texStorage2D(i.TEXTURE_2D,1,de,ne.width,ne.height):t.texImage2D(i.TEXTURE_2D,0,de,ne.width,ne.height,0,le,Ie,null));else if(S.isDataTexture)if(Ne.length>0){Oe&&He&&t.texStorage2D(i.TEXTURE_2D,ue,de,Ne[0].width,Ne[0].height);for(let te=0,he=Ne.length;te<he;te++)ce=Ne[te],Oe?U&&t.texSubImage2D(i.TEXTURE_2D,te,0,0,ce.width,ce.height,le,Ie,ce.data):t.texImage2D(i.TEXTURE_2D,te,de,ce.width,ce.height,0,le,Ie,ce.data);S.generateMipmaps=!1}else Oe?(He&&t.texStorage2D(i.TEXTURE_2D,ue,de,ne.width,ne.height),U&&re(S,ne,le,Ie)):t.texImage2D(i.TEXTURE_2D,0,de,ne.width,ne.height,0,le,Ie,ne.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Oe&&He&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ue,de,Ne[0].width,Ne[0].height,ne.depth);for(let te=0,he=Ne.length;te<he;te++)if(ce=Ne[te],S.format!==rn)if(le!==null)if(Oe){if(U)if(S.layerUpdates.size>0){const xe=$o(ce.width,ce.height,S.format,S.type);for(const se of S.layerUpdates){const Ue=ce.data.subarray(se*xe/ce.data.BYTES_PER_ELEMENT,(se+1)*xe/ce.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,te,0,0,se,ce.width,ce.height,1,le,Ue)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,te,0,0,0,ce.width,ce.height,ne.depth,le,ce.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,te,de,ce.width,ce.height,ne.depth,0,ce.data,0,0);else ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Oe?U&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,te,0,0,0,ce.width,ce.height,ne.depth,le,Ie,ce.data):t.texImage3D(i.TEXTURE_2D_ARRAY,te,de,ce.width,ce.height,ne.depth,0,le,Ie,ce.data);S.layerUpdates.size>0&&S.clearLayerUpdates()}else{Oe&&He&&t.texStorage2D(i.TEXTURE_2D,ue,de,Ne[0].width,Ne[0].height);for(let te=0,he=Ne.length;te<he;te++)ce=Ne[te],S.format!==rn?le!==null?Oe?U&&t.compressedTexSubImage2D(i.TEXTURE_2D,te,0,0,ce.width,ce.height,le,ce.data):t.compressedTexImage2D(i.TEXTURE_2D,te,de,ce.width,ce.height,0,ce.data):ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Oe?U&&t.texSubImage2D(i.TEXTURE_2D,te,0,0,ce.width,ce.height,le,Ie,ce.data):t.texImage2D(i.TEXTURE_2D,te,de,ce.width,ce.height,0,le,Ie,ce.data)}else if(S.isDataArrayTexture)if(Oe){if(He&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ue,de,ne.width,ne.height,ne.depth),U)if(S.layerUpdates.size>0){const te=$o(ne.width,ne.height,S.format,S.type);for(const he of S.layerUpdates){const xe=ne.data.subarray(he*te/ne.data.BYTES_PER_ELEMENT,(he+1)*te/ne.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,he,ne.width,ne.height,1,le,Ie,xe)}S.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,le,Ie,ne.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,de,ne.width,ne.height,ne.depth,0,le,Ie,ne.data);else if(S.isData3DTexture)Oe?(He&&t.texStorage3D(i.TEXTURE_3D,ue,de,ne.width,ne.height,ne.depth),U&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,le,Ie,ne.data)):t.texImage3D(i.TEXTURE_3D,0,de,ne.width,ne.height,ne.depth,0,le,Ie,ne.data);else if(S.isFramebufferTexture){if(He)if(Oe)t.texStorage2D(i.TEXTURE_2D,ue,de,ne.width,ne.height);else{let te=ne.width,he=ne.height;for(let xe=0;xe<ue;xe++)t.texImage2D(i.TEXTURE_2D,xe,de,te,he,0,le,Ie,null),te>>=1,he>>=1}}else if(S.isHTMLTexture){if("texElementImage2D"in i){const te=i.canvas;if(te.hasAttribute("layoutsubtree")||te.setAttribute("layoutsubtree","true"),ne.parentNode!==te){te.appendChild(ne),d.add(S),te.onpaint=he=>{const xe=he.changedElements;for(const se of d)xe.includes(se.image)&&(se.needsUpdate=!0)},te.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ne);else{const xe=i.RGBA,se=i.RGBA,Ue=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,xe,se,Ue,ne)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Ne.length>0){if(Oe&&He){const te=nt(Ne[0]);t.texStorage2D(i.TEXTURE_2D,ue,de,te.width,te.height)}for(let te=0,he=Ne.length;te<he;te++)ce=Ne[te],Oe?U&&t.texSubImage2D(i.TEXTURE_2D,te,0,0,le,Ie,ce):t.texImage2D(i.TEXTURE_2D,te,de,le,Ie,ce);S.generateMipmaps=!1}else if(Oe){if(He){const te=nt(ne);t.texStorage2D(i.TEXTURE_2D,ue,de,te.width,te.height)}U&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,le,Ie,ne)}else t.texImage2D(i.TEXTURE_2D,0,de,le,Ie,ne);m(S)&&v(W),oe.__version=ae.version,S.onUpdate&&S.onUpdate(S)}B.__version=S.version}function ze(B,S,k){if(S.image.length!==6)return;const W=Qe(B,S),$=S.source;t.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+k);const ae=n.get($);if($.version!==ae.__version||W===!0){t.activeTexture(i.TEXTURE0+k);const oe=$e.getPrimaries($e.workingColorSpace),j=S.colorSpace===un?null:$e.getPrimaries(S.colorSpace),ne=S.colorSpace===un||oe===j?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ne);const le=S.isCompressedTexture||S.image[0].isCompressedTexture,Ie=S.image[0]&&S.image[0].isDataTexture,de=[];for(let se=0;se<6;se++)!le&&!Ie?de[se]=p(S.image[se],!0,r.maxCubemapSize):de[se]=Ie?S.image[se].image:S.image[se],de[se]=Mt(S,de[se]);const ce=de[0],Ne=s.convert(S.format,S.colorSpace),Oe=s.convert(S.type),He=M(S.internalFormat,Ne,Oe,S.normalized,S.colorSpace),U=S.isVideoTexture!==!0,ue=ae.__version===void 0||W===!0,te=$.dataReady;let he=T(S,ce);qe(i.TEXTURE_CUBE_MAP,S);let xe;if(le){U&&ue&&t.texStorage2D(i.TEXTURE_CUBE_MAP,he,He,ce.width,ce.height);for(let se=0;se<6;se++){xe=de[se].mipmaps;for(let Ue=0;Ue<xe.length;Ue++){const Le=xe[Ue];S.format!==rn?Ne!==null?U?te&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ue,0,0,Le.width,Le.height,Ne,Le.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ue,He,Le.width,Le.height,0,Le.data):ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?te&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ue,0,0,Le.width,Le.height,Ne,Oe,Le.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ue,He,Le.width,Le.height,0,Ne,Oe,Le.data)}}}else{if(xe=S.mipmaps,U&&ue){xe.length>0&&he++;const se=nt(de[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,he,He,se.width,se.height)}for(let se=0;se<6;se++)if(Ie){U?te&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,de[se].width,de[se].height,Ne,Oe,de[se].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,He,de[se].width,de[se].height,0,Ne,Oe,de[se].data);for(let Ue=0;Ue<xe.length;Ue++){const pt=xe[Ue].image[se].image;U?te&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ue+1,0,0,pt.width,pt.height,Ne,Oe,pt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ue+1,He,pt.width,pt.height,0,Ne,Oe,pt.data)}}else{U?te&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,Ne,Oe,de[se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,He,Ne,Oe,de[se]);for(let Ue=0;Ue<xe.length;Ue++){const Le=xe[Ue];U?te&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ue+1,0,0,Ne,Oe,Le.image[se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ue+1,He,Ne,Oe,Le.image[se])}}}m(S)&&v(i.TEXTURE_CUBE_MAP),ae.__version=$.version,S.onUpdate&&S.onUpdate(S)}B.__version=S.version}function Se(B,S,k,W,$,ae){const oe=s.convert(k.format,k.colorSpace),j=s.convert(k.type),ne=M(k.internalFormat,oe,j,k.normalized,k.colorSpace),le=n.get(S),Ie=n.get(k);if(Ie.__renderTarget=S,!le.__hasExternalTextures){const de=Math.max(1,S.width>>ae),ce=Math.max(1,S.height>>ae);$===i.TEXTURE_3D||$===i.TEXTURE_2D_ARRAY?t.texImage3D($,ae,ne,de,ce,S.depth,0,oe,j,null):t.texImage2D($,ae,ne,de,ce,0,oe,j,null)}t.bindFramebuffer(i.FRAMEBUFFER,B),tt(S)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,W,$,Ie.__webglTexture,0,et(S)):($===i.TEXTURE_2D||$>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,W,$,Ie.__webglTexture,ae),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Z(B,S,k){if(i.bindRenderbuffer(i.RENDERBUFFER,B),S.depthBuffer){const W=S.depthTexture,$=W&&W.isDepthTexture?W.type:null,ae=y(S.stencilBuffer,$),oe=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;tt(S)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,et(S),ae,S.width,S.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,et(S),ae,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,ae,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,oe,i.RENDERBUFFER,B)}else{const W=S.textures;for(let $=0;$<W.length;$++){const ae=W[$],oe=s.convert(ae.format,ae.colorSpace),j=s.convert(ae.type),ne=M(ae.internalFormat,oe,j,ae.normalized,ae.colorSpace);tt(S)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,et(S),ne,S.width,S.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,et(S),ne,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,ne,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ve(B,S,k){const W=S.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,B),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const $=n.get(S.depthTexture);if($.__renderTarget=S,(!$.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),W){if($.__webglInit===void 0&&($.__webglInit=!0,S.depthTexture.addEventListener("dispose",C)),$.__webglTexture===void 0){$.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture),qe(i.TEXTURE_CUBE_MAP,S.depthTexture);const le=s.convert(S.depthTexture.format),Ie=s.convert(S.depthTexture.type);let de;S.depthTexture.format===On?de=i.DEPTH_COMPONENT24:S.depthTexture.format===li&&(de=i.DEPTH24_STENCIL8);for(let ce=0;ce<6;ce++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,de,S.width,S.height,0,le,Ie,null)}}else ie(S.depthTexture,0);const ae=$.__webglTexture,oe=et(S),j=W?i.TEXTURE_CUBE_MAP_POSITIVE_X+k:i.TEXTURE_2D,ne=S.depthTexture.format===li?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(S.depthTexture.format===On)tt(S)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ne,j,ae,0,oe):i.framebufferTexture2D(i.FRAMEBUFFER,ne,j,ae,0);else if(S.depthTexture.format===li)tt(S)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ne,j,ae,0,oe):i.framebufferTexture2D(i.FRAMEBUFFER,ne,j,ae,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ge(B){const S=n.get(B),k=B.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==B.depthTexture){const W=B.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),W){const $=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,W.removeEventListener("dispose",$)};W.addEventListener("dispose",$),S.__depthDisposeCallback=$}S.__boundDepthTexture=W}if(B.depthTexture&&!S.__autoAllocateDepthBuffer)if(k)for(let W=0;W<6;W++)ve(S.__webglFramebuffer[W],B,W);else{const W=B.texture.mipmaps;W&&W.length>0?ve(S.__webglFramebuffer[0],B,0):ve(S.__webglFramebuffer,B,0)}else if(k){S.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[W]),S.__webglDepthbuffer[W]===void 0)S.__webglDepthbuffer[W]=i.createRenderbuffer(),Z(S.__webglDepthbuffer[W],B,!1);else{const $=B.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ae=S.__webglDepthbuffer[W];i.bindRenderbuffer(i.RENDERBUFFER,ae),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,ae)}}else{const W=B.texture.mipmaps;if(W&&W.length>0?t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=i.createRenderbuffer(),Z(S.__webglDepthbuffer,B,!1);else{const $=B.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ae=S.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ae),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,ae)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Pe(B,S,k){const W=n.get(B);S!==void 0&&Se(W.__webglFramebuffer,B,B.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),k!==void 0&&ge(B)}function Ce(B){const S=B.texture,k=n.get(B),W=n.get(S);B.addEventListener("dispose",b);const $=B.textures,ae=B.isWebGLCubeRenderTarget===!0,oe=$.length>1;if(oe||(W.__webglTexture===void 0&&(W.__webglTexture=i.createTexture()),W.__version=S.version,a.memory.textures++),ae){k.__webglFramebuffer=[];for(let j=0;j<6;j++)if(S.mipmaps&&S.mipmaps.length>0){k.__webglFramebuffer[j]=[];for(let ne=0;ne<S.mipmaps.length;ne++)k.__webglFramebuffer[j][ne]=i.createFramebuffer()}else k.__webglFramebuffer[j]=i.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){k.__webglFramebuffer=[];for(let j=0;j<S.mipmaps.length;j++)k.__webglFramebuffer[j]=i.createFramebuffer()}else k.__webglFramebuffer=i.createFramebuffer();if(oe)for(let j=0,ne=$.length;j<ne;j++){const le=n.get($[j]);le.__webglTexture===void 0&&(le.__webglTexture=i.createTexture(),a.memory.textures++)}if(B.samples>0&&tt(B)===!1){k.__webglMultisampledFramebuffer=i.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let j=0;j<$.length;j++){const ne=$[j];k.__webglColorRenderbuffer[j]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,k.__webglColorRenderbuffer[j]);const le=s.convert(ne.format,ne.colorSpace),Ie=s.convert(ne.type),de=M(ne.internalFormat,le,Ie,ne.normalized,ne.colorSpace,B.isXRRenderTarget===!0),ce=et(B);i.renderbufferStorageMultisample(i.RENDERBUFFER,ce,de,B.width,B.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+j,i.RENDERBUFFER,k.__webglColorRenderbuffer[j])}i.bindRenderbuffer(i.RENDERBUFFER,null),B.depthBuffer&&(k.__webglDepthRenderbuffer=i.createRenderbuffer(),Z(k.__webglDepthRenderbuffer,B,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ae){t.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture),qe(i.TEXTURE_CUBE_MAP,S);for(let j=0;j<6;j++)if(S.mipmaps&&S.mipmaps.length>0)for(let ne=0;ne<S.mipmaps.length;ne++)Se(k.__webglFramebuffer[j][ne],B,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+j,ne);else Se(k.__webglFramebuffer[j],B,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0);m(S)&&v(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(oe){for(let j=0,ne=$.length;j<ne;j++){const le=$[j],Ie=n.get(le);let de=i.TEXTURE_2D;(B.isWebGL3DRenderTarget||B.isWebGLArrayRenderTarget)&&(de=B.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(de,Ie.__webglTexture),qe(de,le),Se(k.__webglFramebuffer,B,le,i.COLOR_ATTACHMENT0+j,de,0),m(le)&&v(de)}t.unbindTexture()}else{let j=i.TEXTURE_2D;if((B.isWebGL3DRenderTarget||B.isWebGLArrayRenderTarget)&&(j=B.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(j,W.__webglTexture),qe(j,S),S.mipmaps&&S.mipmaps.length>0)for(let ne=0;ne<S.mipmaps.length;ne++)Se(k.__webglFramebuffer[ne],B,S,i.COLOR_ATTACHMENT0,j,ne);else Se(k.__webglFramebuffer,B,S,i.COLOR_ATTACHMENT0,j,0);m(S)&&v(j),t.unbindTexture()}B.depthBuffer&&ge(B)}function Me(B){const S=B.textures;for(let k=0,W=S.length;k<W;k++){const $=S[k];if(m($)){const ae=E(B),oe=n.get($).__webglTexture;t.bindTexture(ae,oe),v(ae),t.unbindTexture()}}}const Ye=[],je=[];function dt(B){if(B.samples>0){if(tt(B)===!1){const S=B.textures,k=B.width,W=B.height;let $=i.COLOR_BUFFER_BIT;const ae=B.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,oe=n.get(B),j=S.length>1;if(j)for(let le=0;le<S.length;le++)t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+le,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+le,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,oe.__webglMultisampledFramebuffer);const ne=B.texture.mipmaps;ne&&ne.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let le=0;le<S.length;le++){if(B.resolveDepthBuffer&&(B.depthBuffer&&($|=i.DEPTH_BUFFER_BIT),B.stencilBuffer&&B.resolveStencilBuffer&&($|=i.STENCIL_BUFFER_BIT)),j){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,oe.__webglColorRenderbuffer[le]);const Ie=n.get(S[le]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ie,0)}i.blitFramebuffer(0,0,k,W,0,0,k,W,$,i.NEAREST),l===!0&&(Ye.length=0,je.length=0,Ye.push(i.COLOR_ATTACHMENT0+le),B.depthBuffer&&B.storeMultisampledDepthBuffer===!1&&(Ye.push(ae),je.push(ae),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,je)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ye))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),j)for(let le=0;le<S.length;le++){t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+le,i.RENDERBUFFER,oe.__webglColorRenderbuffer[le]);const Ie=n.get(S[le]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+le,i.TEXTURE_2D,Ie,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglMultisampledFramebuffer)}else if(B.depthBuffer&&B.storeMultisampledDepthBuffer===!1&&l){const S=B.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[S])}}}function et(B){return Math.min(r.maxSamples,B.samples)}function tt(B){const S=n.get(B);return B.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function P(B){const S=a.render.frame;u.get(B)!==S&&(u.set(B,S),B.update())}function Mt(B,S){const k=B.colorSpace,W=B.format,$=B.type;return B.isCompressedTexture===!0||B.isVideoTexture===!0||k!==fr&&k!==un&&($e.getTransfer(k)===ut?(W!==rn||$!==$t)&&ke("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):rt("WebGLTextures: Unsupported texture color space:",k)),S}function nt(B){return typeof HTMLImageElement<"u"&&B instanceof HTMLImageElement?(o.width=B.naturalWidth||B.width,o.height=B.naturalHeight||B.height):typeof VideoFrame<"u"&&B instanceof VideoFrame?(o.width=B.displayWidth,o.height=B.displayHeight):(o.width=B.width,o.height=B.height),o}this.allocateTextureUnit=Y,this.resetTextureUnits=F,this.getTextureUnits=D,this.setTextureUnits=O,this.setTexture2D=ie,this.setTexture2DArray=G,this.setTexture3D=J,this.setTextureCube=ee,this.rebindTextures=Pe,this.setupRenderTarget=Ce,this.updateRenderTargetMipmap=Me,this.updateMultisampleRenderTarget=dt,this.setupDepthRenderbuffer=ge,this.setupFrameBufferTexture=Se,this.useMultisampledRTT=tt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Dg(i,e){function t(n,r=un){let s;const a=$e.getTransfer(r);if(n===$t)return i.UNSIGNED_BYTE;if(n===ja)return i.UNSIGNED_SHORT_4_4_4_4;if(n===eo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Xl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Yl)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Hl)return i.BYTE;if(n===Vl)return i.SHORT;if(n===hr)return i.UNSIGNED_SHORT;if(n===Qa)return i.INT;if(n===Sn)return i.UNSIGNED_INT;if(n===_n)return i.FLOAT;if(n===bn)return i.HALF_FLOAT;if(n===ql)return i.ALPHA;if(n===Kl)return i.RGB;if(n===rn)return i.RGBA;if(n===On)return i.DEPTH_COMPONENT;if(n===li)return i.DEPTH_STENCIL;if(n===Zl)return i.RED;if(n===to)return i.RED_INTEGER;if(n===fi)return i.RG;if(n===no)return i.RG_INTEGER;if(n===io)return i.RGBA_INTEGER;if(n===Qr||n===jr||n===es||n===ts)if(a===ut)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Qr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===jr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===es)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ts)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Qr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===jr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===es)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ts)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===da||n===fa||n===pa||n===ma)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===da)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===fa)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===pa)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ma)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ga||n===_a||n===xa||n===va||n===Ma||n===rs||n===Sa)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===ga||n===_a)return a===ut?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===xa)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===va)return s.COMPRESSED_R11_EAC;if(n===Ma)return s.COMPRESSED_SIGNED_R11_EAC;if(n===rs)return s.COMPRESSED_RG11_EAC;if(n===Sa)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===ba||n===Ea||n===ya||n===wa||n===Ta||n===Aa||n===Ba||n===Ra||n===Ca||n===La||n===Da||n===Pa||n===Ia||n===Na)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===ba)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ea)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ya)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===wa)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ta)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Aa)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ba)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ra)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ca)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===La)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Da)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Pa)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ia)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Na)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ua||n===Fa||n===Oa)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Ua)return a===ut?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Fa)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Oa)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===za||n===ka||n===ss||n===Ga)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===za)return s.COMPRESSED_RED_RGTC1_EXT;if(n===ka)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ss)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ga)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===dr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const Pg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ig=`
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

}`;class Ng{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new oc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Ft({vertexShader:Pg,fragmentShader:Ig,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Wt(new yn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Ug extends mi{constructor(e,t){super();const n=this;let r=null,s=1,a=null,c="local-floor",l=1,o=null,u=null,d=null,h=null,f=null,_=null;const g=typeof XRWebGLBinding<"u",p=new Ng,m={},v=t.getContextAttributes();let E=null,M=null;const y=[],T=[],C=new We;let b=null,A=null;const L=new nn;L.viewport=new vt;const N=new nn;N.viewport=new vt;const z=[L,N],F=new Hd;let D=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let re=y[Q];return re===void 0&&(re=new Ps,y[Q]=re),re.getTargetRaySpace()},this.getControllerGrip=function(Q){let re=y[Q];return re===void 0&&(re=new Ps,y[Q]=re),re.getGripSpace()},this.getHand=function(Q){let re=y[Q];return re===void 0&&(re=new Ps,y[Q]=re),re.getHandSpace()};function Y(Q){const re=T.indexOf(Q.inputSource);if(re===-1)return;const be=y[re];be!==void 0&&(be.update(Q.inputSource,Q.frame,o||a),be.dispatchEvent({type:Q.type,data:Q.inputSource}))}function K(){r.removeEventListener("select",Y),r.removeEventListener("selectstart",Y),r.removeEventListener("selectend",Y),r.removeEventListener("squeeze",Y),r.removeEventListener("squeezestart",Y),r.removeEventListener("squeezeend",Y),r.removeEventListener("end",K),r.removeEventListener("inputsourceschange",ie);for(let Q=0;Q<y.length;Q++){const re=T[Q];re!==null&&(T[Q]=null,y[Q].disconnect(re))}D=null,O=null,p.reset();for(const Q in m)delete m[Q];if(e.setRenderTarget(E),f=null,h=null,d=null,r=null,M=null,Qe.stop(),n.isPresenting=!1,e.setPixelRatio(b),e.setSize(C.width,C.height,!1),A!==null){const Q=A.camera;Q.fov=A.fov,Q.zoom=A.zoom,Q.updateProjectionMatrix(),A=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){s=Q,n.isPresenting===!0&&ke("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){c=Q,n.isPresenting===!0&&ke("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return o||a},this.setReferenceSpace=function(Q){o=Q},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d===null&&g&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(Q){if(r=Q,r!==null){if(E=e.getRenderTarget(),r.addEventListener("select",Y),r.addEventListener("selectstart",Y),r.addEventListener("selectend",Y),r.addEventListener("squeeze",Y),r.addEventListener("squeezestart",Y),r.addEventListener("squeezeend",Y),r.addEventListener("end",K),r.addEventListener("inputsourceschange",ie),v.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(C),g&&"createProjectionLayer"in XRWebGLBinding.prototype){let be=null,ze=null,Se=null;v.depth&&(Se=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,be=v.stencil?li:On,ze=v.stencil?dr:Sn);const Z={colorFormat:t.RGBA8,depthFormat:Se,scaleFactor:s};d=this.getBinding(),h=d.createProjectionLayer(Z),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),M=new sn(h.textureWidth,h.textureHeight,{format:rn,type:$t,depthTexture:new pr(h.textureWidth,h.textureHeight,ze,void 0,void 0,void 0,void 0,void 0,void 0,be),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{const be={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,t,be),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new sn(f.framebufferWidth,f.framebufferHeight,{format:rn,type:$t,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),o=null,a=await r.requestReferenceSpace(c),Qe.setContext(r),Qe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function ie(Q){for(let re=0;re<Q.removed.length;re++){const be=Q.removed[re],ze=T.indexOf(be);ze>=0&&(T[ze]=null,y[ze].disconnect(be))}for(let re=0;re<Q.added.length;re++){const be=Q.added[re];let ze=T.indexOf(be);if(ze===-1){for(let Z=0;Z<y.length;Z++)if(Z>=T.length){T.push(be),ze=Z;break}else if(T[Z]===null){T[Z]=be,ze=Z;break}if(ze===-1)break}const Se=y[ze];Se&&Se.connect(be)}}const G=new H,J=new H;function ee(Q,re,be){G.setFromMatrixPosition(re.matrixWorld),J.setFromMatrixPosition(be.matrixWorld);const ze=G.distanceTo(J),Se=re.projectionMatrix.elements,Z=be.projectionMatrix.elements,ve=Se[14]/(Se[10]-1),ge=Se[14]/(Se[10]+1),Pe=(Se[9]+1)/Se[5],Ce=(Se[9]-1)/Se[5],Me=(Se[8]-1)/Se[0],Ye=(Z[8]+1)/Z[0],je=ve*Me,dt=ve*Ye,et=ze/(-Me+Ye),tt=et*-Me;if(re.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(tt),Q.translateZ(et),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),Se[10]===-1)Q.projectionMatrix.copy(re.projectionMatrix),Q.projectionMatrixInverse.copy(re.projectionMatrixInverse);else{const P=ve+et,Mt=ge+et,nt=je-tt,B=dt+(ze-tt),S=Pe*ge/Mt*P,k=Ce*ge/Mt*P;Q.projectionMatrix.makePerspective(nt,B,S,k,P,Mt),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function Te(Q,re){re===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(re.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(r===null)return;let re=Q.near,be=Q.far;p.texture!==null&&(p.depthNear>0&&(re=p.depthNear),p.depthFar>0&&(be=p.depthFar)),F.near=N.near=L.near=re,F.far=N.far=L.far=be,(D!==F.near||O!==F.far)&&(r.updateRenderState({depthNear:F.near,depthFar:F.far}),D=F.near,O=F.far),F.layers.mask=Q.layers.mask|6,L.layers.mask=F.layers.mask&-5,N.layers.mask=F.layers.mask&-3;const ze=Q.parent,Se=F.cameras;Te(F,ze);for(let Z=0;Z<Se.length;Z++)Te(Se[Z],ze);Se.length===2?ee(F,L,N):F.projectionMatrix.copy(L.projectionMatrix),A===null&&Q.isPerspectiveCamera&&(A={camera:Q,fov:Q.fov,zoom:Q.zoom}),Re(Q,F,ze)};function Re(Q,re,be){be===null?Q.matrix.copy(re.matrixWorld):(Q.matrix.copy(be.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(re.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(re.projectionMatrix),Q.projectionMatrixInverse.copy(re.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=Wa*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function(Q){l=Q,h!==null&&(h.fixedFoveation=Q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Q)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(F)},this.getCameraTexture=function(Q){return m[Q]};let ct=null;function qe(Q,re){if(u=re.getViewerPose(o||a),_=re,u!==null){const be=u.views;f!==null&&(e.setRenderTargetFramebuffer(M,f.framebuffer),e.setRenderTarget(M));let ze=!1;be.length!==F.cameras.length&&(F.cameras.length=0,ze=!0);for(let ge=0;ge<be.length;ge++){const Pe=be[ge];let Ce=null;if(f!==null)Ce=f.getViewport(Pe);else{const Ye=d.getViewSubImage(h,Pe);Ce=Ye.viewport,ge===0&&(e.setRenderTargetTextures(M,Ye.colorTexture,Ye.depthStencilTexture),e.setRenderTarget(M))}let Me=z[ge];Me===void 0&&(Me=new nn,Me.layers.enable(ge),Me.viewport=new vt,z[ge]=Me),Me.matrix.fromArray(Pe.transform.matrix),Me.matrix.decompose(Me.position,Me.quaternion,Me.scale),Me.projectionMatrix.fromArray(Pe.projectionMatrix),Me.projectionMatrixInverse.copy(Me.projectionMatrix).invert(),Me.viewport.set(Ce.x,Ce.y,Ce.width,Ce.height),ge===0&&(F.matrix.copy(Me.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),ze===!0&&F.cameras.push(Me)}const Se=r.enabledFeatures;if(Se&&Se.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&g){d=n.getBinding();const ge=d.getDepthInformation(be[0]);ge&&ge.isValid&&ge.texture&&p.init(ge,r.renderState)}if(Se&&Se.includes("camera-access")&&g){e.state.unbindTexture(),d=n.getBinding();for(let ge=0;ge<be.length;ge++){const Pe=be[ge].camera;if(Pe){let Ce=m[Pe];Ce||(Ce=new oc,m[Pe]=Ce);const Me=d.getCameraImage(Pe);Ce.sourceTexture=Me}}}}for(let be=0;be<y.length;be++){const ze=T[be],Se=y[be];ze!==null&&Se!==void 0&&Se.update(ze,re,o||a)}ct&&ct(Q,re),re.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:re}),_=null}const Qe=new dc;Qe.setAnimationLoop(qe),this.setAnimationLoop=function(Q){ct=Q},this.dispose=function(){}}}const Fg=new Et,vc=new Ge;vc.set(-1,0,0,0,1,0,0,0,1);function Og(i,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,lc(i)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function r(p,m,v,E,M){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?s(p,m):m.isMeshLambertMaterial?(s(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(s(p,m),d(p,m)):m.isMeshPhongMaterial?(s(p,m),u(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(s(p,m),h(p,m),m.isMeshPhysicalMaterial&&f(p,m,M)):m.isMeshMatcapMaterial?(s(p,m),_(p,m)):m.isMeshDepthMaterial?s(p,m):m.isMeshDistanceMaterial?(s(p,m),g(p,m)):m.isMeshNormalMaterial?s(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&c(p,m)):m.isPointsMaterial?l(p,m,v,E):m.isSpriteMaterial?o(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Vt&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Vt&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const v=e.get(m),E=v.envMap,M=v.envMapRotation;E&&(p.envMap.value=E,p.envMapRotation.value.setFromMatrix4(Fg.makeRotationFromEuler(M)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(vc),p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function c(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,v,E){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*v,p.scale.value=E*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function u(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function d(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function h(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,v){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Vt&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.retroreflectivity>0&&(p.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=v.texture,p.transmissionSamplerSize.value.set(v.width,v.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function _(p,m){m.matcap&&(p.matcap.value=m.matcap)}function g(p,m){const v=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(v.matrixWorld),p.nearDistance.value=v.shadow.camera.near,p.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function zg(i,e,t,n){let r={},s={},a=[];const c=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,y){const T=y.program;n.uniformBlockBinding(M,T)}function o(M,y){let T=r[M.id];T===void 0&&(p(M),T=u(M),r[M.id]=T,M.addEventListener("dispose",v));const C=y.program;n.updateUBOMapping(M,C);const b=e.render.frame;s[M.id]!==b&&(h(M),s[M.id]=b)}function u(M){const y=d();M.__bindingPointIndex=y;const T=i.createBuffer(),C=M.__size,b=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,T),i.bufferData(i.UNIFORM_BUFFER,C,b),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,T),T}function d(){for(let M=0;M<c;M++)if(a.indexOf(M)===-1)return a.push(M),M;return rt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(M){const y=r[M.id],T=M.uniforms,C=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let b=0,A=T.length;b<A;b++){const L=T[b];if(Array.isArray(L))for(let N=0,z=L.length;N<z;N++)f(L[N],b,N,C);else f(L,b,0,C)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(M,y,T,C){if(g(M,y,T,C)===!0){const b=M.__offset,A=M.value;if(Array.isArray(A)){let L=0;for(let N=0;N<A.length;N++){const z=A[N],F=m(z);_(z,M.__data,L),typeof z!="number"&&typeof z!="boolean"&&!z.isMatrix3&&!ArrayBuffer.isView(z)&&(L+=F.storage/Float32Array.BYTES_PER_ELEMENT)}}else _(A,M.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,b,M.__data)}}function _(M,y,T){typeof M=="number"||typeof M=="boolean"?y[0]=M:M.isMatrix3?(y[0]=M.elements[0],y[1]=M.elements[1],y[2]=M.elements[2],y[3]=0,y[4]=M.elements[3],y[5]=M.elements[4],y[6]=M.elements[5],y[7]=0,y[8]=M.elements[6],y[9]=M.elements[7],y[10]=M.elements[8],y[11]=0):ArrayBuffer.isView(M)?y.set(new M.constructor(M.buffer,M.byteOffset,y.length)):M.toArray(y,T)}function g(M,y,T,C){const b=M.value,A=y+"_"+T;if(C[A]===void 0)return typeof b=="number"||typeof b=="boolean"?C[A]=b:ArrayBuffer.isView(b)?C[A]=b.slice():C[A]=b.clone(),!0;{const L=C[A];if(typeof b=="number"||typeof b=="boolean"){if(L!==b)return C[A]=b,!0}else{if(ArrayBuffer.isView(b))return!0;if(L.equals(b)===!1)return L.copy(b),!0}}return!1}function p(M){const y=M.uniforms;let T=0;const C=16;for(let A=0,L=y.length;A<L;A++){const N=Array.isArray(y[A])?y[A]:[y[A]];for(let z=0,F=N.length;z<F;z++){const D=N[z],O=Array.isArray(D.value)?D.value:[D.value];for(let Y=0,K=O.length;Y<K;Y++){const ie=O[Y],G=m(ie),J=T%C,ee=J%G.boundary,Te=J+ee;T+=ee,Te!==0&&C-Te<G.storage&&(T+=C-Te),D.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=T,T+=G.storage}}}const b=T%C;return b>0&&(T+=C-b),M.__size=T,M.__cache={},this}function m(M){const y={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(y.boundary=4,y.storage=4):M.isVector2?(y.boundary=8,y.storage=8):M.isVector3||M.isColor?(y.boundary=16,y.storage=12):M.isVector4?(y.boundary=16,y.storage=16):M.isMatrix3?(y.boundary=48,y.storage=48):M.isMatrix4?(y.boundary=64,y.storage=64):M.isTexture?ke("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(y.boundary=16,y.storage=M.byteLength):ke("WebGLRenderer: Unsupported uniform value type.",M),y}function v(M){const y=M.target;y.removeEventListener("dispose",v);const T=a.indexOf(y.__bindingPointIndex);a.splice(T,1),i.deleteBuffer(r[y.id]),delete r[y.id],delete s[y.id]}function E(){for(const M in r)i.deleteBuffer(r[M]);a=[],r={},s={}}return{bind:l,update:o,dispose:E}}const kg=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let mn=null;function Gg(){return mn===null&&(mn=new Ni(kg,16,16,fi,bn),mn.name="DFG_LUT",mn.minFilter=bt,mn.magFilter=bt,mn.wrapS=Dn,mn.wrapT=Dn,mn.generateMipmaps=!1,mn.needsUpdate=!0),mn}class Wg{constructor(e={}){const{canvas:t=od(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:c=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:o=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1,outputBufferType:f=$t}=e;this.isWebGLRenderer=!0;let _;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=n.getContextAttributes().alpha}else _=a;const g=f,p=new Set([io,no,to]),m=new Set([$t,Sn,hr,dr,ja,eo]),v=new Uint32Array(4),E=new Int32Array(4),M=new H;let y=null,T=null;const C=[],b=[];let A=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=vn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const L=this;let N=!1,z=null,F=null,D=null,O=null;this._outputColorSpace=en;let Y=0,K=0,ie=null,G=-1,J=null;const ee=new vt,Te=new vt;let Re=null;const ct=new at(0);let qe=0,Qe=t.width,Q=t.height,re=1,be=null,ze=null;const Se=new vt(0,0,Qe,Q),Z=new vt(0,0,Qe,Q);let ve=!1;const ge=new sc;let Pe=!1,Ce=!1;const Me=new Et,Ye=new H,je=new vt,dt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let et=!1;function tt(){return ie===null?re:1}let P=n;function Mt(w,I){return t.getContext(w,I)}let nt,B,S,k,W,$,ae,oe,j,ne,le,Ie,de,ce,Ne,Oe,He,U,ue,te,he,xe,se;try{const w={alpha:!0,depth:r,stencil:s,antialias:c,premultipliedAlpha:l,preserveDrawingBuffer:o,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ja}`),t.addEventListener("webglcontextlost",pt,!1),t.addEventListener("webglcontextrestored",ot,!1),t.addEventListener("webglcontextcreationerror",an,!1),P===null){const I="webgl2";if(P=Mt(I,w),P===null)throw Mt(I)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ue()}catch(w){throw t.removeEventListener("webglcontextlost",pt,!1),t.removeEventListener("webglcontextrestored",ot,!1),t.removeEventListener("webglcontextcreationerror",an,!1),rt("WebGLRenderer: "+w.message),w}function Ue(){nt=new Gm(P),nt.init(),he=new Dg(P,nt),B=new Lm(P,nt,e,he),S=new Cg(P,nt),B.reversedDepthBuffer&&h&&S.buffers.depth.setReversed(!0),F=P.createFramebuffer(),D=P.createFramebuffer(),O=P.createFramebuffer(),k=new Vm(P),W=new gg,$=new Lg(P,nt,S,W,B,he,k),ae=new km(L),oe=new Xd(P),xe=new Rm(P,oe),j=new Wm(P,oe,k,xe),ne=new Ym(P,j,oe,xe,k),U=new Xm(P,B,$),Ne=new Dm(W),le=new mg(L,ae,nt,B,xe,Ne),Ie=new Og(L,W),de=new xg,ce=new yg(nt),He=new Bm(L,ae,S,ne,_,l),Oe=new Rg(L,ne,B),se=new zg(P,k,B,S),ue=new Cm(P,nt,k),te=new Hm(P,nt,k),k.programs=le.programs,L.capabilities=B,L.extensions=nt,L.properties=W,L.renderLists=de,L.shadowMap=Oe,L.state=S,L.info=k}g!==$t&&(A=new Km(g,t.width,t.height,c,r,s));const Le=new Ug(L,P);this.xr=Le,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const w=nt.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=nt.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return re},this.setPixelRatio=function(w){w!==void 0&&(re=w,this.setSize(Qe,Q,!1))},this.getSize=function(w){return w.set(Qe,Q)},this.setSize=function(w,I,q=!0){if(Le.isPresenting){ke("WebGLRenderer: Can't change size while VR device is presenting.");return}Qe=w,Q=I,t.width=Math.floor(w*re),t.height=Math.floor(I*re),q===!0&&(t.style.width=w+"px",t.style.height=I+"px"),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,w,I)},this.getDrawingBufferSize=function(w){return w.set(Qe*re,Q*re).floor()},this.setDrawingBufferSize=function(w,I,q){Qe=w,Q=I,re=q,t.width=Math.floor(w*q),t.height=Math.floor(I*q),this.setViewport(0,0,w,I)},this.setEffects=function(w){if(g===$t){rt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let I=0;I<w.length;I++)if(w[I].isOutputPass===!0){ke("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(ee)},this.getViewport=function(w){return w.copy(Se)},this.setViewport=function(w,I,q,V){w.isVector4?Se.set(w.x,w.y,w.z,w.w):Se.set(w,I,q,V),S.viewport(ee.copy(Se).multiplyScalar(re).round())},this.getScissor=function(w){return w.copy(Z)},this.setScissor=function(w,I,q,V){w.isVector4?Z.set(w.x,w.y,w.z,w.w):Z.set(w,I,q,V),S.scissor(Te.copy(Z).multiplyScalar(re).round())},this.getScissorTest=function(){return ve},this.setScissorTest=function(w){S.setScissorTest(ve=w)},this.setOpaqueSort=function(w){be=w},this.setTransparentSort=function(w){ze=w},this.getClearColor=function(w){return w.copy(He.getClearColor())},this.setClearColor=function(){He.setClearColor(...arguments)},this.getClearAlpha=function(){return He.getClearAlpha()},this.setClearAlpha=function(){He.setClearAlpha(...arguments)},this.clear=function(w=!0,I=!0,q=!0){let V=0;if(w){let X=!1;if(ie!==null){const _e=ie.texture.format;X=p.has(_e)}if(X){const _e=ie.texture.type,ye=m.has(_e),pe=He.getClearColor(),Ae=He.getClearAlpha(),De=pe.r,Ve=pe.g,Ke=pe.b;ye?(v[0]=De,v[1]=Ve,v[2]=Ke,v[3]=Ae,P.clearBufferuiv(P.COLOR,0,v)):(E[0]=De,E[1]=Ve,E[2]=Ke,E[3]=Ae,P.clearBufferiv(P.COLOR,0,E))}else V|=P.COLOR_BUFFER_BIT}I&&(V|=P.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),q&&(V|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V!==0&&P.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),z=w},this.dispose=function(){t.removeEventListener("webglcontextlost",pt,!1),t.removeEventListener("webglcontextrestored",ot,!1),t.removeEventListener("webglcontextcreationerror",an,!1),He.dispose(),de.dispose(),ce.dispose(),W.dispose(),ae.dispose(),ne.dispose(),xe.dispose(),se.dispose(),le.dispose(),Le.dispose(),Le.removeEventListener("sessionstart",ho),Le.removeEventListener("sessionend",fo),Qn.stop()};function pt(w){w.preventDefault(),Do("WebGLRenderer: Context Lost."),N=!0}function ot(){Do("WebGLRenderer: Context Restored."),N=!1;const w=k.autoReset,I=Oe.enabled,q=Oe.autoUpdate,V=Oe.needsUpdate,X=Oe.type;Ue(),k.autoReset=w,Oe.enabled=I,Oe.autoUpdate=q,Oe.needsUpdate=V,Oe.type=X}function an(w){rt("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function dn(w){const I=w.target;I.removeEventListener("dispose",dn),Rc(I)}function Rc(w){Cc(w),W.remove(w)}function Cc(w){const I=W.get(w).programs;I!==void 0&&(I.forEach(function(q){le.releaseProgram(q)}),w.isShaderMaterial&&le.releaseShaderCache(w))}this.renderBufferDirect=function(w,I,q,V,X,_e){I===null&&(I=dt);const ye=X.isMesh&&X.matrixWorld.determinantAffine()<0,pe=Pc(w,I,q,V,X);S.setMaterial(V,ye);let Ae=q.index,De=1;if(V.wireframe===!0){if(Ae=j.getWireframeAttribute(q),Ae===void 0)return;De=2}const Ve=q.drawRange,Ke=q.attributes.position;let Be=Ve.start*De,lt=(Ve.start+Ve.count)*De;_e!==null&&(Be=Math.max(Be,_e.start*De),lt=Math.min(lt,(_e.start+_e.count)*De)),Ae!==null?(Be=Math.max(Be,0),lt=Math.min(lt,Ae.count)):Ke!=null&&(Be=Math.max(Be,0),lt=Math.min(lt,Ke.count));const yt=lt-Be;if(yt<0||yt===1/0)return;xe.setup(X,V,pe,q,Ae);let _t,ft=ue;if(Ae!==null&&(_t=oe.get(Ae),ft=te,ft.setIndex(_t)),X.isMesh)V.wireframe===!0?(S.setLineWidth(V.wireframeLinewidth*tt()),ft.setMode(P.LINES)):ft.setMode(P.TRIANGLES);else if(X.isLine){let Dt=V.linewidth;Dt===void 0&&(Dt=1),S.setLineWidth(Dt*tt()),X.isLineSegments?ft.setMode(P.LINES):X.isLineLoop?ft.setMode(P.LINE_LOOP):ft.setMode(P.LINE_STRIP)}else X.isPoints?ft.setMode(P.POINTS):X.isSprite&&ft.setMode(P.TRIANGLES);if(X.isBatchedMesh)if(nt.get("WEBGL_multi_draw"))ft.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{const Dt=X._multiDrawStarts,Ee=X._multiDrawCounts,Ot=X._multiDrawCount,it=Ae?oe.get(Ae).bytesPerElement:1,Qt=W.get(V).currentProgram.getUniforms();for(let fn=0;fn<Ot;fn++)Qt.setValue(P,"_gl_DrawID",fn),ft.render(Dt[fn]/it,Ee[fn])}else if(X.isInstancedMesh)ft.renderInstances(Be,yt,X.count);else if(q.isInstancedBufferGeometry){const Dt=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,Ee=Math.min(q.instanceCount,Dt);ft.renderInstances(Be,yt,Ee)}else ft.render(Be,yt)};function uo(w,I,q,V){z!==null&&w.isNodeMaterial&&z.setObject(V,w),Pe===!0&&Ne.setState(w,q,!1),w.transparent===!0&&w.side===Ln&&w.forceSinglePass===!1?(w.side=Vt,w.needsUpdate=!0,br(w,I,V),w.side=hi,w.needsUpdate=!0,br(w,I,V),w.side=Ln):br(w,I,V)}this.compile=function(w,I,q=null){q===null&&(q=w),z!==null&&z.renderStart(w,I,q),T=ce.get(q),T.init(I),b.push(T),q.traverseVisible(function(X){X.isLight&&X.layers.test(I.layers)&&(T.pushLight(X),X.castShadow&&T.pushShadow(X))}),w!==q&&w.traverseVisible(function(X){X.isLight&&X.layers.test(I.layers)&&(T.pushLight(X),X.castShadow&&T.pushShadow(X))}),T.setupLights(),z!==null&&z.updateLights(T.state.lightsArray),Ce=this.localClippingEnabled,Pe=Ne.init(this.clippingPlanes,Ce),Pe===!0&&Ne.setGlobalState(this.clippingPlanes,I),z!==null&&Oe.render(T.state.shadowsArray,q,I);const V=new Set;return w.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;const _e=X.material;if(_e)if(Array.isArray(_e))for(let ye=0;ye<_e.length;ye++){const pe=_e[ye];uo(pe,q,I,X),V.add(pe)}else uo(_e,q,I,X),V.add(_e)}),T=b.pop(),z!==null&&z.renderEnd(),V},this.compileAsync=function(w,I,q=null){const V=this.compile(w,I,q);return new Promise(X=>{function _e(){if(V.forEach(function(ye){const Ae=W.get(ye).currentProgram;(Ae===void 0||Ae.isReady())&&V.delete(ye)}),V.size===0){X(w);return}setTimeout(_e,10)}nt.get("KHR_parallel_shader_compile")!==null?_e():setTimeout(_e,10)})};let Ms=null;function Lc(w){Ms&&Ms(w)}function ho(){Qn.stop()}function fo(){Qn.start()}const Qn=new dc;Qn.setAnimationLoop(Lc),typeof self<"u"&&Qn.setContext(self),this.setAnimationLoop=function(w){Ms=w,Le.setAnimationLoop(w),w===null?Qn.stop():Qn.start()},Le.addEventListener("sessionstart",ho),Le.addEventListener("sessionend",fo),this.render=function(w,I){if(I!==void 0&&I.isCamera!==!0){rt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;z!==null&&z.renderStart(w,I);const q=Le.enabled===!0&&Le.isPresenting===!0,V=A!==null&&(ie===null||q)&&A.begin(L,ie);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),Le.enabled===!0&&Le.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(Le.cameraAutoUpdate===!0&&Le.updateCamera(I),I=Le.getCamera()),w.isScene===!0&&w.onBeforeRender(L,w,I,ie),T=ce.get(w,b.length),T.init(I),T.state.textureUnits=$.getTextureUnits(),b.push(T),Me.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),ge.setFromProjectionMatrix(Me,xn,I.reversedDepth),Ce=this.localClippingEnabled,Pe=Ne.init(this.clippingPlanes,Ce),y=de.get(w,C.length),y.init(),C.push(y),Le.enabled===!0&&Le.isPresenting===!0){const ye=L.xr.getDepthSensingMesh();ye!==null&&Ss(ye,I,-1/0,L.sortObjects)}Ss(w,I,0,L.sortObjects),y.finish(),z!==null&&z.updateLights(T.state.lightsArray),L.sortObjects===!0&&y.sort(be,ze),et=Le.enabled===!1||Le.isPresenting===!1||Le.hasDepthSensing()===!1,et&&He.addToRenderList(y,w),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Pe===!0&&Ne.beginShadows();const X=T.state.shadowsArray;if(Oe.render(X,w,I),Pe===!0&&Ne.endShadows(),(V&&A.hasRenderPass())===!1){const ye=y.opaque,pe=y.transmissive;if(T.setupLights(),I.isArrayCamera){const Ae=I.cameras;if(pe.length>0)for(let De=0,Ve=Ae.length;De<Ve;De++){const Ke=Ae[De];mo(ye,pe,w,Ke)}et&&He.render(w);for(let De=0,Ve=Ae.length;De<Ve;De++){const Ke=Ae[De];po(y,w,Ke,Ke.viewport)}}else pe.length>0&&mo(ye,pe,w,I),et&&He.render(w),po(y,w,I)}ie!==null&&K===0&&($.updateMultisampleRenderTarget(ie),$.updateRenderTargetMipmap(ie)),V&&A.end(L),w.isScene===!0&&w.onAfterRender(L,w,I),xe.resetDefaultState(),G=-1,J=null,b.pop(),b.length>0?(T=b[b.length-1],$.setTextureUnits(T.state.textureUnits),Pe===!0&&Ne.setGlobalState(L.clippingPlanes,T.state.camera)):T=null,C.pop(),C.length>0?y=C[C.length-1]:y=null,z!==null&&z.renderEnd()};function Ss(w,I,q,V){if(w.visible===!1)return;if(w.layers.test(I.layers)){if(w.isGroup)q=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(I);else if(w.isLightProbeGrid)T.pushLightProbeGrid(w);else if(w.isLight)T.pushLight(w),w.castShadow&&T.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||w.intersectsFrustum(ge)){V&&je.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Me);const ye=ne.update(w),pe=w.material;pe.visible&&y.push(w,ye,pe,q,je.z,null,I)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||w.intersectsFrustum(ge))){const ye=ne.update(w),pe=w.material;if(V&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),je.copy(w.boundingSphere.center)):(ye.boundingSphere===null&&ye.computeBoundingSphere(),je.copy(ye.boundingSphere.center)),je.applyMatrix4(w.matrixWorld).applyMatrix4(Me)),Array.isArray(pe)){const Ae=ye.groups;for(let De=0,Ve=Ae.length;De<Ve;De++){const Ke=Ae[De],Be=pe[Ke.materialIndex];Be&&Be.visible&&y.push(w,ye,Be,q,je.z,Ke,I)}}else pe.visible&&y.push(w,ye,pe,q,je.z,null,I)}}const _e=w.children;for(let ye=0,pe=_e.length;ye<pe;ye++)Ss(_e[ye],I,q,V)}function po(w,I,q,V){const{opaque:X,transmissive:_e,transparent:ye}=w;T.setupLightsView(q),Pe===!0&&Ne.setGlobalState(L.clippingPlanes,q),V&&S.viewport(ee.copy(V)),X.length>0&&Sr(X,I,q),_e.length>0&&Sr(_e,I,q),ye.length>0&&Sr(ye,I,q),S.buffers.depth.setTest(!0),S.buffers.depth.setMask(!0),S.buffers.color.setMask(!0),S.setPolygonOffset(!1)}function mo(w,I,q,V){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[V.id]===void 0){const Be=nt.has("EXT_color_buffer_half_float")||nt.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[V.id]=new sn(1,1,{generateMipmaps:!0,type:Be?bn:$t,minFilter:oi,samples:Math.max(4,B.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:$e.workingColorSpace})}const _e=T.state.transmissionRenderTarget[V.id],ye=V.viewport||ee;_e.setSize(ye.z*L.transmissionResolutionScale,ye.w*L.transmissionResolutionScale);const pe=L.getRenderTarget(),Ae=L.getActiveCubeFace(),De=L.getActiveMipmapLevel();L.setRenderTarget(_e),L.getClearColor(ct),qe=L.getClearAlpha(),qe<1&&L.setClearColor(16777215,.5),L.clear(),et&&He.render(q);const Ve=L.toneMapping;L.toneMapping=vn;const Ke=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),T.setupLightsView(V),Pe===!0&&Ne.setGlobalState(L.clippingPlanes,V),Sr(w,q,V),$.updateMultisampleRenderTarget(_e),$.updateRenderTargetMipmap(_e),nt.has("WEBGL_multisampled_render_to_texture")===!1){let Be=!1;for(let lt=0,yt=I.length;lt<yt;lt++){const _t=I[lt],{object:ft,geometry:Dt,material:Ee,group:Ot}=_t;if(Ee.side===Ln&&ft.layers.test(V.layers)){const it=Ee.side;Ee.side=Vt,Ee.needsUpdate=!0,go(ft,q,V,Dt,Ee,Ot),Ee.side=it,Ee.needsUpdate=!0,Be=!0}}Be===!0&&($.updateMultisampleRenderTarget(_e),$.updateRenderTargetMipmap(_e))}L.setRenderTarget(pe,Ae,De),L.setClearColor(ct,qe),Ke!==void 0&&(V.viewport=Ke),L.toneMapping=Ve}function Sr(w,I,q){const V=I.isScene===!0?I.overrideMaterial:null;for(let X=0,_e=w.length;X<_e;X++){const ye=w[X],{object:pe,geometry:Ae,group:De}=ye;let Ve=ye.material;Ve.allowOverride===!0&&V!==null&&(Ve=V),pe.layers.test(q.layers)&&go(pe,I,q,Ae,Ve,De)}}function go(w,I,q,V,X,_e){z!==null&&X.isNodeMaterial&&z.setObject(w,X),w.onBeforeRender(L,I,q,V,X,_e),w.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),X.onBeforeRender(L,I,q,V,w,_e),X.transparent===!0&&X.side===Ln&&X.forceSinglePass===!1?(X.side=Vt,X.needsUpdate=!0,L.renderBufferDirect(q,I,V,X,w,_e),X.side=hi,X.needsUpdate=!0,L.renderBufferDirect(q,I,V,X,w,_e),X.side=Ln):L.renderBufferDirect(q,I,V,X,w,_e),w.onAfterRender(L,I,q,V,X,_e)}function br(w,I,q){I.isScene!==!0&&(I=dt);const V=W.get(w),X=T.state.lights,_e=T.state.shadowsArray,ye=X.state.version,pe=le.getParameters(w,X.state,_e,I,q,T.state.lightProbeGridArray),Ae=le.getProgramCacheKey(pe);let De=V.programs;V.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?I.environment:null,V.fog=I.fog;const Ve=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;V.envMap=ae.get(w.envMap||V.environment,Ve),V.envMapRotation=V.environment!==null&&w.envMap===null?I.environmentRotation:w.envMapRotation,De===void 0&&(w.addEventListener("dispose",dn),De=new Map,V.programs=De);let Ke=De.get(Ae);if(Ke!==void 0){if(V.currentProgram===Ke&&V.lightsStateVersion===ye)return xo(w,pe),Ke}else pe.uniforms=le.getUniforms(w),z!==null&&w.isNodeMaterial&&z.build(w,q,pe),w.onBeforeCompile(pe,L),Ke=le.acquireProgram(pe,Ae),De.set(Ae,Ke),V.uniforms=pe.uniforms;const Be=V.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Be.clippingPlanes=Ne.uniform),xo(w,pe),V.needsLights=Nc(w),V.lightsStateVersion=ye,V.needsLights&&(Be.ambientLightColor.value=X.state.ambient,Be.lightProbe.value=X.state.probe,Be.sunLights.value=X.state.sun,Be.sunLightShadows.value=X.state.sunShadow,Be.directionalLights.value=X.state.directional,Be.directionalLightShadows.value=X.state.directionalShadow,Be.spotLights.value=X.state.spot,Be.spotLightShadows.value=X.state.spotShadow,Be.rectAreaLights.value=X.state.rectArea,Be.ltc_1.value=X.state.rectAreaLTC1,Be.ltc_2.value=X.state.rectAreaLTC2,Be.pointLights.value=X.state.point,Be.pointLightShadows.value=X.state.pointShadow,Be.hemisphereLights.value=X.state.hemi,Be.sunShadowMatrix.value=X.state.sunShadowMatrix,Be.sunShadowCascade.value=X.state.sunShadowCascade,Be.directionalShadowMatrix.value=X.state.directionalShadowMatrix,Be.spotLightMatrix.value=X.state.spotLightMatrix,Be.spotLightMap.value=X.state.spotLightMap,Be.pointShadowMatrix.value=X.state.pointShadowMatrix),V.lightProbeGrid=T.state.lightProbeGridArray.length>0,V.currentProgram=Ke,V.uniformsList=null,Ke}function _o(w){if(w.uniformsList===null){const I=w.currentProgram.getUniforms();w.uniformsList=ns.seqWithValue(I.seq,w.uniforms)}return w.uniformsList}function xo(w,I){const q=W.get(w);q.outputColorSpace=I.outputColorSpace,q.batching=I.batching,q.batchingColor=I.batchingColor,q.instancing=I.instancing,q.instancingColor=I.instancingColor,q.instancingMorph=I.instancingMorph,q.skinning=I.skinning,q.morphTargets=I.morphTargets,q.morphNormals=I.morphNormals,q.morphColors=I.morphColors,q.morphTargetsCount=I.morphTargetsCount,q.numClippingPlanes=I.numClippingPlanes,q.numIntersection=I.numClipIntersection,q.vertexAlphas=I.vertexAlphas,q.vertexTangents=I.vertexTangents,q.toneMapping=I.toneMapping}function Dc(w,I){if(w.length===0)return null;if(w.length===1)return w[0].texture!==null?w[0]:null;M.setFromMatrixPosition(I.matrixWorld);for(let q=0,V=w.length;q<V;q++){const X=w[q];if(X.texture!==null&&X.boundingBox.containsPoint(M))return X}return null}function Pc(w,I,q,V,X){I.isScene!==!0&&(I=dt),$.resetTextureUnits();const _e=I.fog,ye=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?I.environment:null,pe=ie===null?L.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:$e.workingColorSpace,Ae=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,De=ae.get(V.envMap||ye,Ae),Ve=V.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,Ke=!!q.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Be=!!q.morphAttributes.position,lt=!!q.morphAttributes.normal,yt=!!q.morphAttributes.color;let _t=vn;V.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(_t=L.toneMapping);const ft=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,Dt=ft!==void 0?ft.length:0,Ee=W.get(V),Ot=T.state.lights;if(Pe===!0&&(Ce===!0||w!==J)){const mt=w===J&&V.id===G;Ne.setState(V,w,mt)}let it=!1;V.version===Ee.__version?(Ee.needsLights&&Ee.lightsStateVersion!==Ot.state.version||Ee.outputColorSpace!==pe||X.isBatchedMesh&&Ee.batching===!1||!X.isBatchedMesh&&Ee.batching===!0||X.isBatchedMesh&&Ee.batchingColor===!0&&X._colorsTexture===null||X.isBatchedMesh&&Ee.batchingColor===!1&&X._colorsTexture!==null||X.isInstancedMesh&&Ee.instancing===!1||!X.isInstancedMesh&&Ee.instancing===!0||X.isSkinnedMesh&&Ee.skinning===!1||!X.isSkinnedMesh&&Ee.skinning===!0||X.isInstancedMesh&&Ee.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&Ee.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&Ee.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&Ee.instancingMorph===!1&&X.morphTexture!==null||Ee.envMap!==De||V.fog===!0&&Ee.fog!==_e||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==Ne.numPlanes||Ee.numIntersection!==Ne.numIntersection)||Ee.vertexAlphas!==Ve||Ee.vertexTangents!==Ke||Ee.morphTargets!==Be||Ee.morphNormals!==lt||Ee.morphColors!==yt||Ee.toneMapping!==_t||Ee.morphTargetsCount!==Dt||!!Ee.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(it=!0):(it=!0,Ee.__version=V.version);let Qt=Ee.currentProgram;it===!0&&(Qt=br(V,I,X),z&&V.isNodeMaterial&&z.onUpdateProgram(V,Qt,Ee));let fn=!1,kn=!1,gi=!1;const ht=Qt.getUniforms(),St=Ee.uniforms;if(S.useProgram(Qt.program)&&(fn=!0,kn=!0,gi=!0),V.id!==G&&(G=V.id,kn=!0),Ee.needsLights){const mt=Dc(T.state.lightProbeGridArray,X);Ee.lightProbeGrid!==mt&&(Ee.lightProbeGrid=mt,kn=!0)}if(fn||J!==w){S.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),ht.setValue(P,"projectionMatrix",w.projectionMatrix),ht.setValue(P,"viewMatrix",w.matrixWorldInverse);const Wn=ht.map.cameraPosition;Wn!==void 0&&Wn.setValue(P,Ye.setFromMatrixPosition(w.matrixWorld)),B.logarithmicDepthBuffer&&ht.setValue(P,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&ht.setValue(P,"isOrthographic",w.isOrthographicCamera===!0),J!==w&&(J=w,kn=!0,gi=!0)}if(Ee.needsLights&&(Ot.state.sunShadowMap.length>0&&ht.setValue(P,"sunShadowMap",Ot.state.sunShadowMap,$),Ot.state.directionalShadowMap.length>0&&ht.setValue(P,"directionalShadowMap",Ot.state.directionalShadowMap,$),Ot.state.spotShadowMap.length>0&&ht.setValue(P,"spotShadowMap",Ot.state.spotShadowMap,$),Ot.state.pointShadowMap.length>0&&ht.setValue(P,"pointShadowMap",Ot.state.pointShadowMap,$)),X.isSkinnedMesh){ht.setOptional(P,X,"bindMatrix"),ht.setOptional(P,X,"bindMatrixInverse");const mt=X.skeleton;mt&&(mt.boneTexture===null&&mt.computeBoneTexture(),ht.setValue(P,"boneTexture",mt.boneTexture,$))}X.isBatchedMesh&&(ht.setOptional(P,X,"batchingTexture"),ht.setValue(P,"batchingTexture",X._matricesTexture,$),ht.setOptional(P,X,"batchingIdTexture"),ht.setValue(P,"batchingIdTexture",X._indirectTexture,$),ht.setOptional(P,X,"batchingColorTexture"),X._colorsTexture!==null&&ht.setValue(P,"batchingColorTexture",X._colorsTexture,$));const Gn=q.morphAttributes;if((Gn.position!==void 0||Gn.normal!==void 0||Gn.color!==void 0)&&U.update(X,q,Qt),(kn||Ee.receiveShadow!==X.receiveShadow)&&(Ee.receiveShadow=X.receiveShadow,ht.setValue(P,"receiveShadow",X.receiveShadow)),(V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial)&&V.envMap===null&&I.environment!==null&&(St.envMapIntensity.value=I.environmentIntensity),St.dfgLUT!==void 0&&(St.dfgLUT.value=Gg()),kn){if(ht.setValue(P,"toneMappingExposure",L.toneMappingExposure),Ee.needsLights&&Ic(St,gi),_e&&V.fog===!0&&Ie.refreshFogUniforms(St,_e),Ie.refreshMaterialUniforms(St,V,re,Q,T.state.transmissionRenderTarget[w.id]),Ee.needsLights&&Ee.lightProbeGrid){const mt=Ee.lightProbeGrid;St.probesSH.value=mt.texture,St.probesMin.value.copy(mt.boundingBox.min),St.probesMax.value.copy(mt.boundingBox.max),St.probesResolution.value.copy(mt.resolution)}ns.upload(P,_o(Ee),St,$)}if(V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(ns.upload(P,_o(Ee),St,$),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&ht.setValue(P,"center",X.center),ht.setValue(P,"modelViewMatrix",X.modelViewMatrix),ht.setValue(P,"normalMatrix",X.normalMatrix),ht.setValue(P,"modelMatrix",X.matrixWorld),V.uniformsGroups!==void 0){const mt=V.uniformsGroups;for(let Wn=0,_i=mt.length;Wn<_i;Wn++){const Mo=mt[Wn];se.update(Mo,Qt),se.bind(Mo,Qt)}}return Qt}function Ic(w,I){w.ambientLightColor.needsUpdate=I,w.lightProbe.needsUpdate=I,w.sunLights.needsUpdate=I,w.sunLightShadows.needsUpdate=I,w.directionalLights.needsUpdate=I,w.directionalLightShadows.needsUpdate=I,w.pointLights.needsUpdate=I,w.pointLightShadows.needsUpdate=I,w.spotLights.needsUpdate=I,w.spotLightShadows.needsUpdate=I,w.rectAreaLights.needsUpdate=I,w.hemisphereLights.needsUpdate=I}function Nc(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return Y},this.getActiveMipmapLevel=function(){return K},this.getRenderTarget=function(){return ie},this.setRenderTargetTextures=function(w,I,q){const V=W.get(w);V.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),W.get(w.texture).__webglTexture=I,W.get(w.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:q,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,I){const q=W.get(w);q.__webglFramebuffer=I,q.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(w,I=0,q=0){ie=w,Y=I,K=q;let V=null,X=!1,_e=!1;if(w){const pe=W.get(w);if(pe.__useDefaultFramebuffer!==void 0){S.bindFramebuffer(P.FRAMEBUFFER,pe.__webglFramebuffer),ee.copy(w.viewport),Te.copy(w.scissor),Re=w.scissorTest,S.viewport(ee),S.scissor(Te),S.setScissorTest(Re),G=-1;return}else if(pe.__webglFramebuffer===void 0)$.setupRenderTarget(w);else if(pe.__hasExternalTextures)$.rebindTextures(w,W.get(w.texture).__webglTexture,W.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const Ve=w.depthTexture;if(pe.__boundDepthTexture!==Ve){if(Ve!==null&&W.has(Ve)&&(w.width!==Ve.image.width||w.height!==Ve.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");$.setupDepthRenderbuffer(w)}}const Ae=w.texture;(Ae.isData3DTexture||Ae.isDataArrayTexture||Ae.isCompressedArrayTexture)&&(_e=!0);const De=W.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(De[I])?V=De[I][q]:V=De[I],X=!0):w.samples>0&&$.useMultisampledRTT(w)===!1?V=W.get(w).__webglMultisampledFramebuffer:Array.isArray(De)?V=De[q]:V=De,ee.copy(w.viewport),Te.copy(w.scissor),Re=w.scissorTest}else ee.copy(Se).multiplyScalar(re).floor(),Te.copy(Z).multiplyScalar(re).floor(),Re=ve;if(q!==0&&(V=F),S.bindFramebuffer(P.FRAMEBUFFER,V)&&S.drawBuffers(w,V),S.viewport(ee),S.scissor(Te),S.setScissorTest(Re),X){const pe=W.get(w.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+I,pe.__webglTexture,q)}else if(_e){const pe=I;for(let Ae=0;Ae<w.textures.length;Ae++){const De=W.get(w.textures[Ae]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+Ae,De.__webglTexture,q,pe)}}else if(w!==null&&q!==0){const pe=W.get(w.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,pe.__webglTexture,q)}G=-1};function vo(w){const I=W.get(w);return(I.__readFormat!==w.format||I.__readType!==w.type)&&(I.__readFormat=w.format,I.__readType=w.type,I.__formatReadable=B.textureFormatReadable(w.format),I.__typeReadable=B.textureTypeReadable(w.type)),I}this.readRenderTargetPixels=function(w,I,q,V,X,_e,ye,pe=0){if(!(w&&w.isWebGLRenderTarget)){rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ae=W.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ye!==void 0&&(Ae=Ae[ye]),Ae){S.bindFramebuffer(P.FRAMEBUFFER,Ae);try{const De=w.textures[pe],Ve=De.format,Ke=De.type;w.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+pe);const Be=vo(De);if(Be.__formatReadable===!1){rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Be.__typeReadable===!1){rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=w.width-V&&q>=0&&q<=w.height-X&&P.readPixels(I,q,V,X,he.convert(Ve),he.convert(Ke),_e)}finally{const De=ie!==null?W.get(ie).__webglFramebuffer:null;S.bindFramebuffer(P.FRAMEBUFFER,De)}}},this.readRenderTargetPixelsAsync=async function(w,I,q,V,X,_e,ye,pe=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ae=W.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ye!==void 0&&(Ae=Ae[ye]),Ae)if(I>=0&&I<=w.width-V&&q>=0&&q<=w.height-X){S.bindFramebuffer(P.FRAMEBUFFER,Ae);const De=w.textures[pe],Ve=De.format,Ke=De.type;w.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+pe);const Be=vo(De);if(Be.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Be.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const lt=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,lt),P.bufferData(P.PIXEL_PACK_BUFFER,_e.byteLength,P.STREAM_READ),P.readPixels(I,q,V,X,he.convert(Ve),he.convert(Ke),0),P.bindBuffer(P.PIXEL_PACK_BUFFER,null);const yt=ie!==null?W.get(ie).__webglFramebuffer:null;S.bindFramebuffer(P.FRAMEBUFFER,yt);const _t=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await ld(P,_t,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,lt),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,_e),P.bindBuffer(P.PIXEL_PACK_BUFFER,null),P.deleteBuffer(lt),P.deleteSync(_t),_e}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,I=null,q=0){const V=Math.pow(2,-q),X=Math.floor(w.image.width*V),_e=Math.floor(w.image.height*V),ye=I!==null?I.x:0,pe=I!==null?I.y:0;$.setTexture2D(w,0),P.copyTexSubImage2D(P.TEXTURE_2D,q,0,0,ye,pe,X,_e),S.unbindTexture()},this.copyTextureToTexture=function(w,I,q=null,V=null,X=0,_e=0){let ye,pe,Ae,De,Ve,Ke,Be,lt,yt;const _t=w.isCompressedTexture?w.mipmaps[_e]:w.image;if(q!==null)ye=q.max.x-q.min.x,pe=q.max.y-q.min.y,Ae=q.isBox3?q.max.z-q.min.z:1,De=q.min.x,Ve=q.min.y,Ke=q.isBox3?q.min.z:0;else{const St=Math.pow(2,-X);ye=Math.floor(_t.width*St),pe=Math.floor(_t.height*St),w.isDataArrayTexture?Ae=_t.depth:w.isData3DTexture?Ae=Math.floor(_t.depth*St):Ae=1,De=0,Ve=0,Ke=0}V!==null?(Be=V.x,lt=V.y,yt=V.z):(Be=0,lt=0,yt=0);const ft=he.convert(I.format),Dt=he.convert(I.type);let Ee;I.isData3DTexture?($.setTexture3D(I,0),Ee=P.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?($.setTexture2DArray(I,0),Ee=P.TEXTURE_2D_ARRAY):($.setTexture2D(I,0),Ee=P.TEXTURE_2D),S.activeTexture(P.TEXTURE0),S.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,I.flipY),S.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),S.pixelStorei(P.UNPACK_ALIGNMENT,I.unpackAlignment);const Ot=S.getParameter(P.UNPACK_ROW_LENGTH),it=S.getParameter(P.UNPACK_IMAGE_HEIGHT),Qt=S.getParameter(P.UNPACK_SKIP_PIXELS),fn=S.getParameter(P.UNPACK_SKIP_ROWS),kn=S.getParameter(P.UNPACK_SKIP_IMAGES);S.pixelStorei(P.UNPACK_ROW_LENGTH,_t.width),S.pixelStorei(P.UNPACK_IMAGE_HEIGHT,_t.height),S.pixelStorei(P.UNPACK_SKIP_PIXELS,De),S.pixelStorei(P.UNPACK_SKIP_ROWS,Ve),S.pixelStorei(P.UNPACK_SKIP_IMAGES,Ke);const gi=w.isDataArrayTexture||w.isData3DTexture,ht=I.isDataArrayTexture||I.isData3DTexture;if(w.isDepthTexture){const St=W.get(w),Gn=W.get(I),mt=W.get(St.__renderTarget),Wn=W.get(Gn.__renderTarget);S.bindFramebuffer(P.READ_FRAMEBUFFER,mt.__webglFramebuffer),S.bindFramebuffer(P.DRAW_FRAMEBUFFER,Wn.__webglFramebuffer);for(let _i=0;_i<Ae;_i++)gi&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,W.get(w).__webglTexture,X,Ke+_i),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,W.get(I).__webglTexture,_e,yt+_i)),P.blitFramebuffer(De,Ve,ye,pe,Be,lt,ye,pe,P.DEPTH_BUFFER_BIT,P.NEAREST);S.bindFramebuffer(P.READ_FRAMEBUFFER,null),S.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(X!==0||w.isRenderTargetTexture||W.has(w)){const St=W.get(w),Gn=W.get(I);S.bindFramebuffer(P.READ_FRAMEBUFFER,D),S.bindFramebuffer(P.DRAW_FRAMEBUFFER,O);for(let mt=0;mt<Ae;mt++)gi?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,St.__webglTexture,X,Ke+mt):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,St.__webglTexture,X),ht?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Gn.__webglTexture,_e,yt+mt):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Gn.__webglTexture,_e),X!==0?P.blitFramebuffer(De,Ve,ye,pe,Be,lt,ye,pe,P.COLOR_BUFFER_BIT,P.NEAREST):ht?P.copyTexSubImage3D(Ee,_e,Be,lt,yt+mt,De,Ve,ye,pe):P.copyTexSubImage2D(Ee,_e,Be,lt,De,Ve,ye,pe);S.bindFramebuffer(P.READ_FRAMEBUFFER,null),S.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else ht?w.isDataTexture||w.isData3DTexture?P.texSubImage3D(Ee,_e,Be,lt,yt,ye,pe,Ae,ft,Dt,_t.data):I.isCompressedArrayTexture?P.compressedTexSubImage3D(Ee,_e,Be,lt,yt,ye,pe,Ae,ft,_t.data):P.texSubImage3D(Ee,_e,Be,lt,yt,ye,pe,Ae,ft,Dt,_t):w.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,_e,Be,lt,ye,pe,ft,Dt,_t.data):w.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,_e,Be,lt,_t.width,_t.height,ft,_t.data):P.texSubImage2D(P.TEXTURE_2D,_e,Be,lt,ye,pe,ft,Dt,_t);S.pixelStorei(P.UNPACK_ROW_LENGTH,Ot),S.pixelStorei(P.UNPACK_IMAGE_HEIGHT,it),S.pixelStorei(P.UNPACK_SKIP_PIXELS,Qt),S.pixelStorei(P.UNPACK_SKIP_ROWS,fn),S.pixelStorei(P.UNPACK_SKIP_IMAGES,kn),_e===0&&I.generateMipmaps&&P.generateMipmap(Ee),S.unbindTexture()},this.initRenderTarget=function(w){W.get(w).__webglFramebuffer===void 0&&$.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?$.setTextureCube(w,0):w.isData3DTexture?$.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?$.setTexture2DArray(w,0):$.setTexture2D(w,0),S.unbindTexture()},this.resetState=function(){Y=0,K=0,ie=null,S.reset(),xe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return xn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=$e._getDrawingBufferColorSpace(e),t.unpackColorSpace=$e._getUnpackColorSpace()}}const Mc={wolf:{rows:["...........d..d....","..........dBedBe...","..........BBBBBBB..",".bb......BBBBBBBB..","bBb......BBBBEGBB..","bBb...bbbBBBBEEBWWN",".bBBBBBBBBBBBBWWWW.","..BBBBBBBBBBBBWWW..","..BBBBBBBBBBBWW....","..BBWWWWWWBBBB.....","..BB.b....BB.b.....","..dd.d....dd.d....."],walk:["...BBb...b.BB......","...ddd...d.dd......"]},boar:{rows:["...........bb.....",".....BBBBBBBbB....","...BBWWWWWWBBBB...","..BBBBBBBBBBBBGB..",".bBWWWWWWWWBBBEBBBN","..BBBBBBBBBBBBBBBBN","..BWWWWWWWWBBBBBb..","...BBBBBBBBBBBB....","...BB.b....BB.b....","...dd.d....dd.d...."],walk:["....BBb...b.BB.....","....ddd...d.dd....."]},owl:{rows:[".b......b.",".bBBBBBBb.","BBWWBBWWBB","BWEGWWEGWB","BWEEAAEEWB","BBWWWAWWBB","bBWWWWWWBb","bBWbWWbWBb","bBWWWWWWBb",".bBWbWWBb.","..BBBBBB..","..A....A.."],walk:["...A..A..."]},fox:{rows:["..........d...d...",".........dBe.dBe..",".........BBBBBBB..","WB......BBBBBGBB..","WBB.....BBBBBEBWWN",".BBB.BBBBBBBBBWWW.","..BBBBBBBBBBBWWW..","..BBBBBBBBBBBW....","..BBWWWWWWBBB.....","..dd.d....dd.d....","..dd.d....dd.d...."],walk:["...dd.d..d.dd.....","...dd.d..d.dd....."]},badger:{rows:["..........dd.......","...BBBBBBBWWWW.....",".BBBBBBBBWdGdWW....","BBBBBBBBBWdEddddN..","BBBBBBBBBBWWWWW....",".BBBBBBBBBBBBB.....",".dd.d.....dd.d.....",".dd.d.....dd.d....."],walk:["..dd.d...d.dd......","..dd.d...d.dd......"]},stag:{rows:["...........bb.b...","..........BeBBe...","..........BBBBB...","..........BBBGBB..","..........BBBEBBBN","..W......BBBB.WW..",".WBBBBBBBBBBB.....",".BWBBWBBWBBBB.....","..BBBBBBBBBBW.....","..BBWWWWWWBB......","..B.b.....B.b.....","..B.b.....B.b.....","..B.b.....B.b.....","..N.N.....N.N....."],walk:["...B.b...b.B......","...B.b...b.B......","...N.N...N.N......"]},hare:{rows:["........dd.......","........Be.d.....","........Be.Bd....","........BeBBe....",".......BBBBB.....",".......BBBGBB....","..W...BBBBEBBN...",".WWBBBBBBBBWW....","..BBBBBBBBBW.....",".BBBBBBBBBW......",".BBBWWWWBB.......",".dddd...dd......."],walk:["dddd....d.d......"]},bear:{rows:[".........bb..bb..",".........BeBBBe..","........BBBBBBBB.","..BBBB..BBBBBGBB.",".BBBBBBBBBBBBEBWW","BBBBBBBBBBBBBBWWN","BBBBBBBBBBBBBBB..","BBBBBBBBBBBBBB...",".BBBbBBBBBBbBB...",".BB.bb...BB.bb...",".dd.dd...dd.dd..."],walk:["..BBbb..bBB.b....","..dddd..ddd.d...."]},squirrel:{rows:[".bb.............","bBBb......d..d..","bBBBb....dB.dB..",".bBBb....BBBBB..","..bBB...BBBBGB..","..bBB...BBBBEBBN","...BB..BBBBBWW..","...BBBBBBBBWW...","....BBBBBBBW....","....BBWWWBBB....","....dd...dd....."],walk:[".....dd.d.d....."]},otter:{rows:["............BBB....","..........BBBBBB...",".......BBBBBBBGBB..","....BBBBBBBBBBEBWWN","BBBBBBBBBBBBBBWWWW.",".BBBBBBBBBBBBWWW...","..BBWWWWWWBBBB.....","...dd.....dd......."],walk:["....dd...dd........"]},lynx:{rows:["..........d...d...","..........d...d...",".........BeB.Be...",".........BBBBBBB..",".........BBBBGBBB.",".d.......BBBBEBWWN",".dB......BBBBBWWW.","..BBBBBBBBBBBWW...","..BdBBdBBdBBBB....","..BBBBBBBBBBBW....","..BBWWWWWWBBB.....","..BB.b....BB.b....","..dd.d....dd.d...."],walk:["...BB.b..bBB......","...dd.d..ddd......"]},elk:{rows:["..........b..b....","..........BBBB....","..........BBBGB...","..........BBBEBBB.",".........BBBBBBBBN",".b......BBBB..BB..",".BBBBBBBBBBB......",".BBBBBBBBBBB......","..BBBBBBBBBB......","..BBbbbbbbBB......","..B.b.....B.b.....","..B.b.....B.b.....","..B.b.....B.b.....","..N.N.....N.N....."],walk:["...B.b...b.B......","...B.b...b.B......","...N.N...N.N......"]},beaver:{rows:["..........bb......","........BBBBBB....","......BBBBBBGBB...","....BBBBBBBBEBBB..","...BBBBBBBBBBBBBN.","...BBBBBBBBBBBAA..","...BBBBBBBBBBB.A..","dddBBBBBBBBBB.....","ddd.BBB...BB......","....dd....dd......"],walk:[".....dd..dd......."]},stoat:{rows:["...........BB.....","..........BBBBB...",".........BBBGBB...","dd.BBBBBBBBBEBBN..","dBBBBBBBBBBBWWW...","...BBBBBBBBWWW....","...BWWWWWWBB......","...dd....dd......."],walk:["....dd..dd........"]},hedgehog:{rows:["....bdbdb......","..bdbdbdbdb....",".bdbdbdbdbdbe..","dbdbdbdbdbWWW..","bdbdbdbdbWGWW..","dbdbdbdbWWEWWWN",".WWWWWWWWWWWW..","..dd.....dd...."],walk:["...dd...dd....."]},toad:{rows:["........BBB...","......BBIEB...","..BBBBBBBBBB..",".BBdBBBBdBBBB.","BBBBBBdBBBBBBB","BBdBBBBBBBLLLL","BBBBWWWWWWWWB.",".BBBBWWWWWBB..","BBBB....BB...."],walk:[".BBBB...BB...."]},raven:{rows:[".......BBB.....","......BBBBB....","......BBGBBNN..","......BBEBNNNN.","....BBBBBBNN...","..bbBBBBBBB....","bbbBBbBBBBB....","bb..bBBBBBB....","......BBBB.....","......N.N......","......NNNN....."],walk:["......N..N.....",".....NN.NN....."]},bat:{rows:["...d.....d...","...Bd...dB...","...BBBBBBB...","b..BGBBBGB..b","bb.BEBBBEB.bb","bbbbBBNBBbbbb","bbbbBBBBBbbbb",".bb.BBBBB.bb.","b...BBBBB...b",".....d.d....."],walk:["...BGBBBGB...","...BEBBBEB...",".bbbBBNBBbbb.","bbbbBBBBBbbbb","bbbbBBBBBbbbb","bb..BBBBB..bb","b....d.d....b"]},mole:{rows:["....BBBBB......","..BBBBBBBBB....",".BBBBBBBBBBB...","BBBBBBBBBBEBSS.","BBBBBBBBBBBBSSS","BBBBBBBBBBBB...",".BBBBBBBSSBB...","S.SS...SSSS...."],walk:[".SS.....SSSS..."]},beetle:{rows:["..........A.A.","...bbbbb..AA..",".bBBBBBBbBBA..","bBWBBBBBbBGB..","bBBBBBBBbBB...",".bbbbbbbbb....",".d.d.d.d.d...."],walk:["d.d.d.d.d....."]},snail:{rows:["...bbb....d.d","..bBBBb...S.S",".bBbbBBb..S.S",".bBbBbBb.SSS.",".bBBbbBbSSSS.","..bBBBBSSSS..","SSSSSSSSSS..."],walk:[".SSSSSSSSSS.."]},ram:{rows:["..........AA.....",".........AbbbA...","...W.W...bbGbb...",".WWWWWWW.bbEbbbN.","WWWWWWWWWWbbbbb..","WWWWWWWWWWWbb....","WWWWWWWWWWW......",".WWWWWWWWWW......","..b.b....b.b.....","..b.b....b.b.....","..N.N....N.N....."],walk:["...b.b..b.b......","...N.N..N.N......"]},woodlouse:{rows:["...........d.","...bbbbbbb.d.",".bBdBdBdBBb..","bBBdBdBdBBGb.","bdddddddddd..",".d.d.d.d.d..."],walk:["d.d.d.d.d...."]},snake:{rows:["...........BBB...","..........BBGBN..","..........BBBB.SS","..........BB.....","..BBdBBdBBBB.....",".BWWWWWWWWWB.....","BB..............."],walk:[".BWWWWWWWWWB.....","..B.............."]},moth:{rows:["....b...b....",".....b.b.....","BBB..WWW..BBB","BWBB.WEW.BBWB","BBBBBWWWBBBBB",".bbbbWWWbbbb.","..bbb.W.bbb.."],walk:[".BBBBWEWBBBB.","BWBBBWWWBBBWB","BBBbbWWWbbBBB",".bb...W...bb."]},marten:{rows:["...........d.d...","..........BBBBB..","..........BBGBB..","bb.......BBBEBBN.","bBBBBBBBBBBWWW...",".BBBBBBBBBBWW....","..BBBBBBBBBB.....","..dd.d...dd.d...."],walk:["...dd.d.d.dd....."]},salamander:{rows:["...........BBB..","....BWBBWBBBGBB.","BBBBBBBBBBWBBEBB",".......BBBBBBBB.",".....B.B...B.B.."],walk:["......BB..BB...."]},glowworm:{rows:["....bbbbbbbb...","..IIBbBbBbBbBG.",".IIIbBbBbBbBbBB","..IIdbdbdbdbdb.","....d.d.d.d.d.."],walk:["...d.d.d.d.d..."]},spider:{rows:["...bbb.........",".bBBBBb..d..d..","bBBWBBBbBBBd...","bBWWWBBbBGGBd..","bBBWBBBdBBBB.d.",".bBBBBd.d..d..d","..d.d..d..d..d."],walk:[".d.d..d..d..d.."]},dormouse:{rows:[".BB............","BBBB.....e.e...","BBBB....BBBBB..",".BBB...BBEGBB..","..BBB.BBBEEBBN.","...BBBBBBBWW...","....BBBBBWW....","....BBWWBB.....","....dd..dd....."],walk:[".....dd.d.d...."]}},Sc=[{id:"wolf",name:"Wolf",plan:"quad",hue:.6,sat:.14,val:.74,legend:["wings","mane"],q:{len:.64,chest:.42,tuck:.6,neck:.32,neckAng:.7,neckW:.42,hr:.26,snout:.82,snoutD:.7,ear:"point",earS:.82,tail:"brush",paw:"paw",legW:1.25,saddle:!0,belly:!0},tail:"up"},{id:"fox",name:"Fox",plan:"quad",q:{hgt:.8,len:.62,chest:.4,tuck:.5,neck:.3,neckAng:.7,neckW:.32,hr:.24,snout:1.05,snoutD:.5,snoutTaper:.6,ear:"point",earS:1.35,tail:"bushy",paw:"paw",legW:.9,belly:!0,socks:.3},hue:.06,sat:.8,val:.9,belly:"white",legend:["tails"]},{id:"badger",name:"Badger",plan:"quad",q:{hgt:.62,len:.78,chest:.2,tuck:.22,neck:.18,neckAng:.1,neckW:.5,hr:.26,snout:1,snoutD:.55,snoutTaper:.55,ear:"round",earS:.7,tail:"stub",paw:"paw",legW:1.35,legMat:x.BODY3,face:"badger",shaggy:!0},hue:.65,sat:.08,val:.45,legend:["crystals"]},{id:"boar",name:"Boar",plan:"quad",hue:.07,sat:.62,val:.5,legend:["tusksBig"],q:{len:.72,chest:.34,tuck:.42,neck:.2,neckAng:-.15,neckW:.55,hr:.27,snout:1.25,snoutD:.62,snoutTaper:.55,ear:"small",earS:.8,tail:"thin",paw:"hoof",legW:1.15,ridge:!0,tusks:!0,back:"hump",disc:!0},ridge:!0},{id:"stag",name:"Stag",plan:"quad",q:{hgt:1.3,len:.6,chest:.6,tuck:.7,neck:.55,neckAng:.95,neckW:.32,hr:.2,snout:1.15,snoutD:.6,snoutTaper:.65,ear:"point",earS:1.1,tail:"deer",paw:"hoof",legW:.75,antlers:"branch",rump:!0,spots:"young",belly:!0},hue:.08,sat:.5,val:.7,legend:["antlersGlow"]},{id:"hare",name:"Hare",plan:"quad",q:{hgt:.72,len:.5,chest:.4,tuck:.45,neck:.2,neckAng:.9,neckW:.35,hr:.27,snout:.65,snoutD:.7,ear:"long",earS:2.4,tail:"puff",paw:"paw",legW:.85,haunch:1.35,hindFoot:1.6,back:"arch",belly:!0,whiskers:!0},hue:.08,sat:.4,val:.72,legend:["jackalope"]},{id:"owl",name:"Owl",plan:"owl",hue:.08,sat:.5,val:.55,legend:["eyesRing","wings"]},{id:"bear",name:"Bear",plan:"quad",q:{hgt:1.15,len:.72,chest:.38,tuck:.4,neck:.25,neckAng:.3,neckW:.55,hr:.28,snout:.7,snoutD:.62,snoutTaper:.7,ear:"round",earS:.8,tail:"stub",paw:"paw",legW:1.55,back:"hump",muzzle:!0,shaggy:!0},hue:.07,sat:.55,val:.42,legend:["moss"]},{id:"hedgehog",name:"Hedgehog",plan:"hedgehog",hue:.08,sat:.4,val:.5,legend:["crystals"]},{id:"squirrel",name:"Squirrel",plan:"quad",q:{hgt:.55,len:.45,chest:.35,tuck:.4,neck:.2,neckAng:.9,neckW:.35,hr:.3,snout:.55,snoutD:.65,ear:"tuft",earS:1.1,tail:"squirrel",paw:"paw",legW:.8,haunch:1.3,back:"arch",belly:!0,whiskers:!0},hue:.03,sat:.75,val:.75,belly:"white",legend:["starTail"]},{id:"toad",name:"Toad",plan:"toad",hue:.2,sat:.5,val:.55,legend:["crown"]},{id:"otter",name:"Otter",plan:"quad",q:{hgt:.55,len:1,chest:.25,tuck:.25,neck:.3,neckAng:.35,neckW:.5,hr:.27,snout:.6,snoutD:.7,ear:"round",earS:.5,tail:"otter",paw:"paw",legW:1.1,muzzle:!0,belly:!0,whiskers:!0},hue:.07,sat:.55,val:.45,belly:"white",legend:["ribbons"]},{id:"lynx",name:"Lynx",plan:"quad",q:{hgt:.9,len:.55,chest:.5,tuck:.55,neck:.25,neckAng:.8,neckW:.4,hr:.27,snout:.5,snoutD:.75,snoutTaper:.8,ear:"tuft",earS:1,tail:"bob",paw:"paw",legW:1.2,cheeks:!0,spots:!0,belly:!0,whiskers:!0},hue:.09,sat:.45,val:.75,legend:["mane"]},{id:"elk",name:"Elk",plan:"quad",q:{hgt:1.4,len:.68,chest:.6,tuck:.66,neck:.45,neckAng:.75,neckW:.42,hr:.24,snout:1.6,snoutD:.9,snoutTaper:.85,ear:"point",earS:.9,tail:"stub",paw:"hoof",legW:.9,back:"hump",antlers:"palm",shaggy:!0},hue:.07,sat:.55,val:.38,legend:["antlersGlow","moss"]},{id:"raven",name:"Raven",plan:"raven",hue:.68,sat:.35,val:.3,legend:["wings","eyesRing"]},{id:"bat",name:"Bat",plan:"bat",hue:.78,sat:.25,val:.45,legend:["wingsBig"]},{id:"mole",name:"Mole",plan:"mole",hue:.7,sat:.15,val:.32,legend:["crown"]},{id:"beaver",name:"Beaver",plan:"quad",q:{hgt:.6,len:.65,chest:.2,tuck:.22,neck:.2,neckAng:.4,neckW:.55,hr:.28,snout:.6,snoutD:.75,ear:"round",earS:.45,tail:"flat",paw:"paw",legW:1.2,back:"arch",teeth:!0,whiskers:!0},hue:.06,sat:.6,val:.45,legend:["moss"]},{id:"stoat",name:"Stoat",plan:"quad",q:{hgt:.5,len:1,chest:.3,tuck:.33,neck:.35,neckAng:.6,neckW:.32,hr:.25,snout:.6,snoutD:.6,ear:"round",earS:.6,tail:"stoat",paw:"paw",legW:.8,belly:!0,back:"arch",whiskers:!0},hue:.1,sat:.25,val:.92,legend:["ribbons","mane"]},{id:"snail",name:"Snail",plan:"snail",hue:.08,sat:.45,val:.55,legend:["glowShell"]},{id:"ram",name:"Ram",plan:"quad",q:{hgt:.95,len:.6,chest:.48,tuck:.52,neck:.22,neckAng:.45,neckW:.48,hr:.25,snout:.85,snoutD:.75,snoutTaper:.8,ear:"small",earS:.7,tail:"stub",paw:"hoof",legW:.9,wool:!0,horns:"curl",face:"dark"},hue:.1,sat:.12,val:.88,legend:["hornsGlow"]},{id:"woodlouse",name:"Woodlouse",plan:"woodlouse",hue:.65,sat:.12,val:.45,legend:["crystals"]},{id:"snake",name:"Snake",plan:"snake",hue:.25,sat:.45,val:.45,legend:["wings"]},{id:"moth",name:"Moth",plan:"moth",hue:.1,sat:.3,val:.7,legend:["wingsBig"]},{id:"marten",name:"Pine marten",plan:"quad",q:{hgt:.55,len:.78,chest:.35,tuck:.38,neck:.3,neckAng:.55,neckW:.35,hr:.25,snout:.65,snoutD:.6,ear:"round",earS:.9,tail:"bushy",paw:"paw",legW:.85,belly:!0,back:"arch"},hue:.07,sat:.6,val:.45,legend:["mane"]},{id:"salamander",name:"Salamander",plan:"quad",q:{hgt:.3,len:.9,chest:.14,tuck:.14,neck:.12,neckAng:.05,neckW:.5,hr:.27,snout:.55,snoutD:.55,ear:"none",tail:"otter",paw:"paw",legW:1,spots:!0,spotMat:"belly"},hue:.1,sat:.1,val:.22,belly:"yellow",legend:["flames"]},{id:"glowworm",name:"Glow-worm",plan:"glowworm",hue:.12,sat:.4,val:.35,legend:["lantern"]},{id:"spider",name:"Spider",plan:"spider",hue:.07,sat:.45,val:.4,legend:["eyesRing"]},{id:"dormouse",name:"Dormouse",plan:"quad",q:{hgt:.38,len:.45,chest:.35,tuck:.38,neck:.15,neckAng:.6,neckW:.4,hr:.34,snout:.45,snoutD:.7,ear:"round",earS:.85,tail:"squirrel",paw:"paw",legW:.8,back:"arch",belly:!0,whiskers:!0,eyeK:1.6},hue:.09,sat:.6,val:.75,belly:"white",legend:["starTail"]},{id:"beetle",name:"Stag beetle",plan:"beetle",hue:.78,sat:.5,val:.35,legend:["horn","crystals"]}],bc=Object.fromEntries(Sc.map(i=>[i.id,i]));function Hg(i,e){const t=bc[i],n=e.cVal/.85,r=e.cSat/.6,s=we(t.hue,t.sat*r*e.sat,t.val*n),a=t.belly==="yellow"?[240,196,40]:t.belly==="white"||t.q?.face==="badger"?[236,232,222]:we(t.hue+.03,t.sat*.5*r,Math.min(1,t.val*n*1.3+.08)),c=we(e.magicHue+t.hue*.3,.6,1),l=we(e.magicHue+t.hue*.3,.18,1),o=["boar","stag","elk","ram"].includes(t.id);return{[x.BODY]:s,[x.BODY2]:we(t.hue+.02,Math.min(1,t.sat*r*1.2+.05),t.val*n*.66),[x.BODY3]:we(t.hue+.03,Math.min(1,t.sat*r*1.3+.1),t.val*n*.4),[x.BELLY]:a,[x.ACCENT]:o?[236,226,200]:we(t.hue+.05,t.sat*.6,Math.min(1,t.val*n*.5+.25)),[x.MAGIC]:c,[x.MAGIC2]:l,[x.LEAF]:we(.3,.55,.55),[x.LEAF2]:we(.25,.5,.75),[x.LEAF3]:we(.33,.6,.35),[x.TRUNK]:we(.07,.45,.32),[x.EYE]:[24,18,30],[x.PUPIL]:[70,40,90],[x.GLINT]:[255,255,245],[x.NOSE]:[38,28,36],[x.EAR]:we(t.hue+.97,Math.min(1,t.sat*.6+.2),Math.min(1,t.val*n*.55+.2)),[x.IRIS]:t.plan==="owl"?[255,176,40]:we(.12,.7,.85),[x.SKIN]:[238,158,192]}}const Xt=(i,e)=>Math.round(e.size*Math.pow(Math.sqrt(e.growth),i)*(i?2/(e.pixel||2):1));function Vg(i,e,t,n){const r=bc[i]||Sc[0];if(e===0&&Mc[r.id])return Xg(r.id,t,n);if(r.q)return Kg(r,e,t,n);const s={owl:f_,raven:n_,bat:i_,toad:t_,hedgehog:e_,mole:r_,beetle:s_,snail:a_,woodlouse:o_,snake:l_,moth:c_,glowworm:u_,spider:h_}[r.plan];return s(r,e,t,n)}function Xg(i,e,t){const n=Mc[i],r=e&&n.walk?n.rows.slice(0,n.rows.length-n.walk.length).concat(n.walk):n.rows,s=Math.max(...r.map(l=>l.length))+2,a=r.length+1,c=new Ut(s,a);return c.grid(r,Yg,1,1,{round:t.round}),c}const Yg={B:x.BODY,b:x.BODY2,d:x.BODY3,W:x.BELLY,A:x.ACCENT,E:x.EYE,G:x.GLINT,N:x.NOSE,I:x.IRIS,P:x.PUPIL,e:x.EAR,L:x.LINE,S:x.SKIN};function qg(i){let e=-1;for(let n=i.h-1;n>=0&&e<0;n--)for(let r=0;r<i.w;r++)if(i.m[n*i.w+r]){e=n;break}const t=i.h-1-e;if(!(e<0||t===0))for(let n=i.h-1;n>=0;n--)for(let r=0;r<i.w;r++){const s=n*i.w+r,a=(n-t)*i.w+r,c=n-t>=0;i.m[s]=c?i.m[a]:0,i.g[s]=c?i.g[a]:0;for(let l=0;l<3;l++)i.n[s*3+l]=c?i.n[a*3+l]:0}}class Yt{constructor(){this.ops=[]}shape(e,t,n={}){return this.ops.push({k:"shape",pts:e,mat:t,o:n}),this}limb(e,t,n={}){return this.ops.push({k:"limb",pts:e,mat:t,o:n}),this}mark(e,t,n,r={}){return this.ops.push({k:"mark",pts:e,mat:t,onlyOn:n,o:r}),this}fn(e){return this.ops.push({k:"fn",f:e}),this}draw(e,t,n=1,r=null,s=!0){if(r)for(const v of this.ops)v.pts&&(v.pts=v.pts.map(E=>{const[M,y,T=1]=r(E);return E.length>2?[M,y,E[2]*T]:[M,y]}));const a=[],c=[];for(const v of this.ops)if(v.pts)for(const E of v.pts){const M=v.k==="limb"?(E[2]||0)/2:0;a.push([E[0]-M,E[1]-M],[E[0]+M,E[1]+M]),v.o.extra||c.push([E[0],E[1]-M])}const l=Math.min(...c.map(v=>v[1])),o=e/-l,u=Math.min(...a.map(v=>v[0])),d=Math.max(...a.map(v=>v[0])),h=Math.min(...a.map(v=>v[1])),f=Math.ceil((d-u)*o)+2*n+2,_=Math.ceil(-h*o)+n+1,g=new Ut(f,_),p=v=>[(v[0]-u)*o+n+1,_+v[1]*o],m={sp:g,s:o,T:r?v=>p(r(v)):p,W:f,H:_};for(const v of this.ops){const E={round:t,...v.o};o<40&&!E.extra&&(E.line=!1),v.k==="shape"?g.shape(v.pts.map(p),v.mat,E):v.k==="limb"?g.limb(v.pts.map(M=>[...p(M),M[2]*o]),v.mat,E):v.k==="mark"?g.mark(v.pts.map(p),v.mat,v.onlyOn,E):v.f(m)}return s&&qg(g),g}}function mr(i,e,t,n,{iris:r=!1,glow:s=!1}={}){e=Math.round(e),t=Math.round(t);const a=(o,u,d)=>i.px(e+o,t+u,d,0,0,1);if(n<2){a(0,0,x.EYE);return}if(n<3){a(0,0,x.EYE),a(0,1,x.EYE),a(-1,1,x.EYE),a(0,0,s?x.MAGIC2:x.GLINT);return}const c=Math.round(n*1.25),l=Math.round(n);for(let o=0;o<l;o++)for(let u=0;u<c;u++){const d=(u+.5)/c*2-1,h=(o+.5)/l*2-1,f=d*d+h*h;f>1.15||a(u-c+1,o,(s||r)&&f<.62&&f>.08&&l>=4?s?x.MAGIC:x.IRIS:x.EYE)}a(-Math.floor(c/2)+1,Math.floor((l-1)/2)-(l>=4?1:0),x.GLINT),c>=6&&a(-Math.floor(c/2)+2,Math.floor((l-1)/2)-1,x.GLINT)}function Kg(i,e,t,n){const r={legW:1,earS:1,snoutTaper:.75,haunch:1,hindFoot:1,hgt:1,...i.q},s=e===2,a=Z=>s&&i.legend.includes(Z),c=e===1,l=r.hr*(c?1.22:1)*(n.head/.44)**.5,o=r.len*(c?.9:1.04)*n.long*.84,u=(c?.92:1.04)*n.legs**.5,d=t?-.05:0,h=-1+d,f=-r.chest*(s?1.1:1)/u+d,_=-r.tuck/u+d,g=new Yt,p=r.legW*(s?1.15:1),m=r.legMat||x.BODY,v=[.36,-.36][t]*(r.stride||1),E=[o*.14,-.13],M=r.back==="arch"?.14:0,y=r.back==="hump"?.12:0,T=[-o*.62,h+.28-M*.5],C=[o*.6,h+.42],b=Z=>{const ve=r.hindFoot;return[T,[-o*.42,_+.2],[-o*.74-(ve-1)*.1,-.24/ve],[-o*.7-(ve-1)*.05,-.05],[-o*.6+(ve-1)*.22,0]].map(Pe=>Eo(Pe,T,Z*v))},A=Z=>[C,[o*.64,f+.06],[o*.6,-.2],[o*.63,-.05],[o*.72,0]].map(ve=>Eo(ve,C,-Z*v*.9)),L=(Z,ve)=>{const ge=Math.max(...Z.map(Me=>Me[1])),Pe=(0-Z[0][1])/(ge-Z[0][1]),Ce=Z.map(Me=>[Me[0],Z[0][1]+(Me[1]-Z[0][1])*Pe]);return[[...Ce[0],ve],[...Ce[1],.15*p],[...Ce[2],.095*p],[...Ce[3],.085*p],[...Ce[4],.07*p]]},N=(Z,ve,ge,Pe=1)=>{const Ce=Z[Z.length-1],Me=(r.paw==="hoof"?.1:.13)*Pe,Ye=r.paw==="hoof"?.09:.075;g.shape([[Ce[0]-Me*.55,-Ye],[Ce[0]+Me*.2,-Ye*1.1],[Ce[0]+Me*.6,-Ye*.3],[Ce[0]+Me*.55,0],[Ce[0]-Me*.6,0]],r.paw==="hoof"?x.NOSE:ve,ge)},z=(Z,ve,ge,Pe,Ce,Me=[0,0])=>{const Ye=L(Z,ge).map(je=>[je[0]+Me[0],je[1]+Me[1],je[2]]);g.limb(Ye,ve,{cap:1,capEnd:.4,...Pe}),N(Ye.map(je=>[je[0],je[1]]),ve,Pe,Ce)};if(a("wings")&&Xi(g,[o*.25,h-.05],s,t,-1),a("tails"))for(let Z=0;Z<7;Z++){const ve=Math.PI*(.62+Z*.085)+(t?.03:0),ge=[-o*.95,h+.15],Pe=.95+Z%2*.12,Ce=R(ge,[Math.cos(ve)*Pe,-Math.sin(ve)*Pe]),Me=R(Ze(ge,Ce,.55),[Math.sin(ve)*.08,Math.cos(ve)*.08]);g.limb([[...ge,.12],[...Me,.34],[...Ze(Me,Ce,.6),.28],[...Ce,.12]],Z%2?x.BODY2:x.BODY,{group:70+Z%2,line:!0,extra:!0}),g.shape([R(Ce,[Math.cos(ve)*.07,-Math.sin(ve)*.07]),R(Ze(Me,Ce,.7),[Math.sin(ve)*.13,Math.cos(ve)*.13]),R(Ze(Me,Ce,.7),[-Math.sin(ve)*.13,-Math.cos(ve)*.13])],x.MAGIC2,{group:72,extra:!0})}const F=m===x.BODY?x.BODY2:x.BODY3;z(A(-1),F,.19*p,{group:2},1,E),z(b(-1),F,.3*p*r.haunch,{group:2},r.hindFoot,E);const D=[-o*1,h+.18-M*.3];a("tails")||Zg(g,a("starTail")?"star":r.tail,D,o,h,t);let O=[[-o*1.04,h+.14-M],[-o*.5,h+.02-M*1.3],[o*.1,h+.06-y*.5-M*.6],[o*.55,h-.03-y],[o*.95,h+.22-y*.5],[o*1.06,f-.2],[o*.8,f],[o*.3,f+(_-f)*.2],[-o*.25,_],[-o*.72,_+.02],[-o*1.1,h+.42-M*.5]];r.ridge&&(O=gt(O,0,4,s?10:7,s?.1:.07,1)),r.shaggy&&(O=gt(O,6,9,s?6:4,.04,1)),r.wool&&(O=gt(O,0,O.length-1,s?16:10,.05,1)),g.shape(O,x.BODY,{group:1,tilt:[0,-.3]});const Y=[o*.78,h+.2],K=r.neckAng,ie=R(Y,[Math.cos(K)*r.neck*.85,-Math.sin(K)*r.neck*.85]),G=R(ie,[l*.2,0]);g.limb([[...Y,r.neckW*1.3],[...Ze(Y,ie,.55),r.neckW*1.05],[...ie,r.neckW*.9]],x.BODY,{group:1,cap:0,capEnd:1});const J=l*r.snout*(c?.75:1)*.72,ee=l*r.snoutD*1.1,Te=r.snoutTaper;let Re=[[-l*.85,-l*.1],[-l*.4,-l*.78],[l*.35,-l*.72],[l*.85,-l*.38],[l*.8+J*.6,-ee*.65*(1+Te)/2+l*.02],[l*.85+J,-ee*.5*Te],[l*.9+J,ee*.25*Te],[l*.75+J,ee*.42*Te+l*.1],[l*.35,l*.55],[-l*.3,l*.7],[-l*.85,l*.3]].map(Z=>R(G,Z));r.cheeks&&(Re=gt(Re,8,10,3,l*.22,1));const ct=(Z,ve,ge,Pe)=>$g(g,r,R(G,[Z*l,-l*.55]),l,l*r.earS*ve,ge,Pe,t),qe=(Z,ve,ge)=>Jg(g,r,R(G,[Z*l,-l*.6]),l,e,a,ve,ge);if((r.antlers||a("jackalope"))&&qe(.42,a("antlersGlow")?x.MAGIC:x.ACCENT,{group:11,line:!0,extra:!0}),!r.antlers&&a("jackalope")&&qe(.1,x.ACCENT,{group:12,line:!0,extra:!0}),ct(.42,.85,x.BODY2,{group:4}),g.shape(Re,x.BODY,{group:1,line:!1}),r.face==="dark"&&g.mark(Re,x.BODY2,[x.BODY]),ct(-.3,1,x.BODY,{group:5,line:!0}),r.horns&&d_(g,R(G,[-l*.1,-l*.45]),l,c?.6:a("hornsGlow")?1.5:1,a("hornsGlow")?x.MAGIC:x.ACCENT,{group:13,line:!0,extra:!0}),r.antlers&&qe(-.05,a("antlersGlow")?x.MAGIC2:x.ACCENT,{group:12,line:!0,extra:!0}),z(b(1),m,.36*p*r.haunch,{group:6,line:!0},r.hindFoot),z(A(1),m,.2*p,{group:7,line:!0}),r.saddle&&g.mark([[-o*1.15,h-.05-M],[o*.5,h-.1],[o*.85,h+.1],[o*.3,h+.2],[-o*.5,h+.24],[-o*1.2,h+.3]],x.BODY2,[x.BODY]),r.belly){const Z=x.BELLY;g.mark([[o*.55,f-.3],[o*1.15,f-.32],[o*1,f+.1],[o*.2,f+.05],[-o*.4,_+.05],[-o*.3,_-.08]],Z,[x.BODY]),g.mark([G,R(G,[l*.5+J,l*.2]),R(G,[l*.8+J,ee*.5]),R(G,[-l*.2,l*.9]),R(G,[-l*.7,l*.5])],Z,[x.BODY])}if(r.muzzle&&g.mark([R(G,[l*.55,-l*.2]),R(G,[l*1.2+J,-ee]),R(G,[l*1.2+J,ee*.8]),R(G,[l*.4,l*.6])],x.BELLY,[x.BODY]),r.face==="badger"){g.mark([R(G,[-l*1.1,-l]),R(G,[l*1.3+J,-ee]),R(G,[l*1.3+J,ee]),R(G,[-l*1.1,l])],x.BELLY,[x.BODY]);for(const Z of[-.05,.42])g.mark([R(G,[-l*.9,-l*(.85-Z)]),R(G,[-l*.4,-l*(.95-Z)]),R(G,[l*.9+J*.9,-ee*.35+l*Z*.25]),R(G,[l*.9+J*.9,-ee*.15+l*Z*.3]),R(G,[-l*.3,-l*(.4-Z)]),R(G,[-l*.9,-l*(.35-Z)])],x.BODY3,[x.BELLY])}if(r.rump&&g.mark([[-o*1.2,h+.12],[-o*.95,h+.14],[-o*.92,h+.45],[-o*1.2,h+.45]],x.BELLY,[x.BODY]),r.paw==="paw"&&!r.socks){const Z=L(A(1),0)[4];g.mark([[Z[0]-.08,-.18],[Z[0]+.09,-.18],[Z[0]+.12,0],[Z[0]-.08,0]],x.BELLY,[x.BODY])}g.fn(({sp:Z,T:ve,s:ge})=>{if(r.socks){const Ce=ve([0,-r.socks])[1];for(let Me=Math.floor(Ce);Me<Z.h;Me++)for(let Ye=0;Ye<Z.w;Ye++){const je=Me*Z.w+Ye;[2,6,7].includes(Z.g[je])&&[x.BODY,x.BODY2].includes(Z.m[je])&&(Z.m[je]=x.BODY3)}}if((r.spots==="young"?c:r.spots)&&ge>18){const Ce=Math.max(3,Math.round(ge*.09)),Me=r.spots==="young"||r.spotMat==="belly"?x.BELLY:x.BODY3,Ye=Math.round(ve([0,h+.1])[1]),je=Math.round(ve([0,f+.05])[1]);for(let dt=Ye;dt<je;dt+=Ce)for(let et=0;et<Z.w;et+=Ce*(r.spotMat?2:1)){const tt=et+((dt/Ce|0)%2?Ce>>1:0)+(kt(et,dt,3)*2|0),P=dt*Z.w+tt;Z.m[P]===x.BODY&&Z.g[P]===1&&Z.m[P+1]===x.BODY&&kt(et,dt,5)<(r.spotMat?.1:.25)+n.fur*(r.spotMat?.4:1)&&(Z.m[P]=Me,ge>40&&(Z.m[P+1]=Me),r.spotMat&&ge>30&&(Z.recolour(tt,dt+1,Me),Z.recolour(tt+1,dt+1,Me)))}}});const Qe=G[0]+l*.32,Q=G[1]-l*.24,re=R(G,[l*.88+J,-ee*.45*Te]);if(g.fn(({sp:Z,T:ve,s:ge})=>{const Pe=Math.max(2,Math.round(l*ge*(c?.42:.3)*n.eye*(r.eyeK||1))),[Ce,Me]=ve([Qe,Q]);mr(Z,Ce,Me,Pe,{glow:s&&!r.tusks});const[Ye,je]=ve([G[0]+l*.78,G[1]-l*.46]);mr(Z,Ye,je,Math.max(1,Pe-1),{glow:s&&!r.tusks});const[dt,et]=ve(re),tt=Math.max(1,Math.round(l*ge*(r.disc?.22:.14)));for(let B=0;B<=tt;B++)for(let S=-tt;S<=Math.round(tt*.3);S++)Z.get(dt+S,et+B)&&S*S/(tt*tt)+B*B/((tt+1)*(tt+1))<=1&&Z.recolour(dt+S,et+B,x.NOSE);r.disc&&Z.recolour(dt-1,et+tt,x.BODY3);const P=ve(R(G,[l*.85+J,ee*.2*Te+l*.06])),Mt=ve(R(G,[l*.55+J*.45,ee*.32*Te+l*.12])),nt=Math.ceil(Math.hypot(Mt[0]-P[0],Mt[1]-P[1]));if(ge*l>6)for(let B=0;B<=nt;B++)Z.recolour(P[0]+(Mt[0]-P[0])*B/nt,P[1]+(Mt[1]-P[1])*B/nt,x.LINE);if(r.teeth){const[B,S]=ve(R(G,[l*.8+J,ee*.35*Te+l*.1])),k=Math.max(1,Math.round(l*ge*.14));for(let W=0;W<k*2;W++)for(let $=0;$<k;$++)Z.px(B-$,S+W,x.ACCENT,0,0,1)}if(r.whiskers&&ge*l>8)for(const B of[-1,1]){const[S,k]=ve(R(G,[l*.75+J,ee*.1]));for(let W=1;W<=Math.round(l*ge*.4);W++)Z.get(S+W,k+B*(W>>1))||Z.px(S+W,k+B*(W>>1),x.LINE)}}),r.tusks){const Z=c?.35:a("tusksBig")?1.25:.7,ve=R(G,[l*.45+J*.6,ee*.3]);g.limb([[...ve,.075*Z**.5],[...R(ve,[l*.3*Z,-l*.2*Z]),.07*Z**.5],[...R(ve,[l*.38*Z,-l*.6*Z]),.045*Z**.5],[...R(ve,[l*.15*Z,-l*.95*Z]),.012]],x.ACCENT,{group:8,line:!0,cap:.6,extra:!0})}r.ridge&&g.mark(gt([[-o*1.05,h+.12],[-o*.5,h+.01],[o*.1,h+.05-y*.5],[o*.55,h-.04-y],[o*.9,h+.2],[o*.5,h+.12],[-o*.5,h+.16]],0,4,s?10:7,.07,1),x.BODY3,[x.BODY,x.LINE]);const be=Z=>[-o*.9+Z*o*1.6,h+.02-M*(1-Math.abs(Z-.45)*1.6)-y*Math.max(0,1-Math.abs(Z-.85)*3)];if(a("crystals")&&gs(g,be),a("moss")&&Qg(g,be,o,t),a("ribbons")&&jg(g,o,h,t),a("mane")||a("flames"))for(let Z=0;Z<6;Z++){const ve=Z/5,ge=Ze(R(ie,[-l*.3,-l*.6]),[o*.25,h+.02],ve),Pe=[.42,.3,.5,.26,.36,.22][Z],Ce=.16-ve*.04,Me=t?.04:0;g.limb([[...ge,Ce],[...R(ge,[-.03,-Pe*.45]),Ce*1.05],[...R(ge,[-.14-Me,-Pe*.8]),Ce*.6],[...R(ge,[-.1-Me*2,-Pe*1.05]),Ce*.3],[...R(ge,[.02-Me,-Pe*1.2]),.01]],Z%2?x.MAGIC:x.MAGIC2,{group:60+Z%2,line:!0,extra:!0,cap:1,capEnd:.5})}a("wings")&&Xi(g,[o*.15,h+.02],s,t,1);const ze=([Z,ve])=>{const ge=Math.max(-1.2,Math.min(.75,Z/o)),Pe=1+.1*ge;return[Z,ve*Pe-.08*Math.max(0,-ge),Pe]},Se=g.draw(Xt(e,n)*r.hgt,n.round,1,ze);return s&&qt(Se,i.id),Se}function Zg(i,e,t,n,r,s,a,c){const l=s?.03:-.01,o={group:3,line:!0},u=d=>-n*d;if(e==="brush")i.shape(gt([R(t,[0,-.04]),[u(1.3),r+.26+l],[u(1.46),r+.6],[u(1.36),-.36+l],[u(1.2),-.36],[u(1.16),r+.66],[u(1),r+.4]],1,4,5,.05,1),x.BODY,o),i.mark([[u(1.5),-.5+l],[u(1.1),-.5],[u(1.2),-.3],[u(1.4),-.3]],x.BODY3,[x.BODY]);else if(e==="bushy"){const d=[u(1.05)-.95,r+.5+l];i.shape(gt([R(t,[0,-.05]),[u(1.05)-.3,r+.05+l],[u(1.05)-.7,r+.2+l],[d[0]-.05,d[1]-.08],[d[0]-.02,d[1]+.1],[u(1.05)-.6,r+.6+l],[u(1.05)-.25,r+.52],[u(1),r+.4]],2,6,5,.045,1),x.BODY,o),i.mark([[d[0]-.2,d[1]-.3],[d[0]+.22,d[1]-.3],[d[0]+.22,d[1]+.3],[d[0]-.2,d[1]+.3]],x.BELLY,[x.BODY])}else if(e==="stub")i.shape([R(t,[.04,-.04]),R(t,[-.12,-.1+l]),R(t,[-.16,.02+l]),R(t,[-.04,.12])],x.BODY,o);else if(e==="deer")i.shape([R(t,[.03,-.04]),R(t,[-.07,-.06+l]),R(t,[-.09,.06+l]),R(t,[-.01,.11])],x.BELLY,o),i.mark([R(t,[.04,-.08]),R(t,[-.12,-.08]),R(t,[-.1,-.02]),R(t,[.04,-.02])],x.BODY,[x.BELLY]);else if(e==="bob")i.shape([R(t,[.04,-.06]),R(t,[-.16,-.12+l]),R(t,[-.24,-.02+l]),R(t,[-.04,.12])],x.BODY,o),i.mark([R(t,[-.14,-.2]),R(t,[-.3,-.1]),R(t,[-.3,.05]),R(t,[-.14,.05])],x.BODY3,[x.BODY]);else if(e==="puff")i.shape(gt([R(t,[.04,-.1]),R(t,[-.14,-.16]),R(t,[-.2,.02]),R(t,[-.04,.1])],0,3,2,.03,1),x.BELLY,o);else if(e==="squirrel"||e==="star"){const d=e==="star"?x.MAGIC:x.BODY,h=[[...t,.16],[u(1.3),r-.05+l,.36],[u(1.32),r-.65+l,.46],[u(1),r-1.05+l,.44],[u(.62),r-1.02+l,.3],[u(.45),r-.82+l,.12]];i.shape(gt(na(h),0,6,9,.05,1),d,{...o,extra:!0}),i.mark(na([[u(1.18),r-.1,.12],[u(1.18),r-.62,.2],[u(.98),r-.9,.2],[u(.7),r-.92,.1]]),e==="star"?x.MAGIC2:x.BODY2,[d]),e==="star"&&i.fn(({sp:f,T:_,s:g})=>{const p=Ki(7);for(let m=0;m<9;m++){const[v,E]=_([u(me(p,.7,1.4)),r-me(p,.1,1)]);if((f.get(v,E)===x.MAGIC||f.get(v,E)===x.MAGIC2)&&(f.px(v,E,x.GLINT),g>40))for(const[M,y]of[[1,0],[-1,0],[0,1],[0,-1]])[x.MAGIC,x.MAGIC2].includes(f.get(v+M,E+y))&&f.px(v+M,E+y,x.GLINT)}})}else if(e==="otter")i.limb([[...t,.26],[u(1.3),r+.5+l,.18],[u(1.6),-.12,.1],[u(1.85),-.06+l,.04]],x.BODY,o);else if(e==="stoat")i.limb([[...t,.12],[u(1.25),r+.12+l,.1],[u(1.5),r+.02+l,.09],[u(1.65),r-.05+l,.07]],x.BODY,o),i.mark([[u(1.48),r-.25],[u(1.8),r-.25],[u(1.8),r+.25],[u(1.48),r+.25]],x.BODY3,[x.BODY]);else if(e==="flat"){i.limb([[...t,.14],[u(1.15),r+.6,.1]],x.BODY2,o);const d=[u(1.35),-.12+l*.5];i.shape([R(d,[.22,-.06]),R(d,[0,-.11]),R(d,[-.3,-.07]),R(d,[-.36,.02]),R(d,[-.2,.07]),R(d,[.2,.05])],x.BODY3,o),i.fn(({sp:h,T:f,s:_})=>{if(_<30)return;const[g,p]=f(R(d,[-.32,-.1])),[m,v]=f(R(d,[.2,.06]));for(let E=p;E<=v;E++)for(let M=g;M<=m;M++)(M+E)%4===0&&h.get(M,E)===x.BODY3&&h.recolour(M,E,x.LINE)})}else e==="thin"&&(i.limb([[...t,.07],[u(1.1),r+.3,.05],[u(1.12)+l,r+.55,.035]],x.BODY,{group:3}),i.shape(gt([[u(1.15)+l,r+.5],[u(1.08)+l,r+.55],[u(1.12)+l,r+.72],[u(1.17)+l,r+.7]],1,3,2,.04,1),x.BODY3,{group:3}))}function $g(i,e,t,n,r,s,a,c){const l=e.ear;if(l==="none")return;if(l==="round"){i.shape([R(t,[-n*.32,.02]),R(t,[-n*.3,-r*.32]),R(t,[-n*.05,-r*.45]),R(t,[n*.15,-r*.25]),R(t,[n*.18,.02])],s,a),i.mark([R(t,[-n*.2,-.01]),R(t,[-n*.18,-r*.2]),R(t,[n*.02,-r*.28]),R(t,[n*.08,-.01])],x.EAR,[s]);return}if(l==="long"){const u=R(t,[-r*.32,-r*1.05+(c?.02:0)]);i.shape([R(t,[-n*.25,.02]),R(Ze(t,u,.5),[-n*.2,0]),R(u,[-n*.05,-n*.05]),R(u,[n*.12,n*.1]),R(Ze(t,u,.5),[n*.24,n*.05]),R(t,[n*.25,0])],s,a),i.mark([R(Ze(t,u,.15),[-n*.05,0]),R(Ze(t,u,.8),[0,0]),R(Ze(t,u,.5),[n*.14,n*.03])],x.EAR,[s]),i.mark([R(u,[-n*.3,-n*.3]),R(u,[n*.3,-n*.2]),R(Ze(t,u,.85),[n*.3,n*.1]),R(Ze(t,u,.85),[-n*.3,0])],x.BODY3,[s,x.EAR]);return}const o=l==="small"?[R(t,[-n*.25,.02]),R(t,[-n*.55,-r*.55]),R(t,[-n*.62,-r*.62]),R(t,[n*.2,-n*.08])]:[R(t,[-n*.3,.02]),R(t,[-n*.25,-r*.6]),R(t,[-n*.12,-r*1.02]),R(t,[-n*.05,-r*1.04]),R(t,[n*.22,-r*.45]),R(t,[n*.3,-n*.02])];i.shape(o,s,a),l!=="small"&&i.mark([R(t,[-n*.15,-r*.15]),R(t,[-n*.1,-r*.7]),R(t,[n*.1,-r*.35]),R(t,[n*.12,-r*.1])],x.EAR,[s]),i.mark([R(t,[-n*.3,-r*.72]),R(t,[-n*.1,-r*1.1]),R(t,[n*.1,-r*.9]),R(t,[n*.3,-r*.62])],x.BODY3,[s,x.EAR]),l==="tuft"&&i.limb([[...R(t,[-n*.08,-r*.98]),.045],[...R(t,[-n*.02,-r*1.35]),.02]],x.BODY3,{...a,extra:!0})}function Jg(i,e,t,n,r,s,a,c){const l=!e.antlers,o=l?.45:[0,.5,.9][r]*(s("antlersGlow")?1.15:1);if(!o)return;const u=(p,m,v,E)=>i.limb([[...p,E],[...R(p,[Math.cos(m)*v*.6,-Math.sin(m)*v*.6]),E*.7],[...R(p,[Math.cos(m)*v,-Math.sin(m)*v*1.05]),E*.3]],a,{...c,capEnd:.6}),d=.07*Math.max(.7,o);if(e.antlers==="palm"){const p=R(t,[-.2*o,-.12*o]),m=R(p,[-.32*o,-.18*o]);i.limb([[...t,d*1.3],[...p,d*1.1],[...Ze(p,m,.6),d]],a,c);const v=[R(p,[0,-.02*o]),R(m,[.18*o,-.2*o]),R(m,[-.05*o,-.3*o]),R(m,[-.38*o,-.2*o]),R(m,[-.42*o,.02*o]),R(m,[-.15*o,.12*o])];i.shape(gt(v,1,4,r===2?4:3,.09*o,1),a,c),u(R(p,[.02*o,0]),.5,.22*o,d*.7);return}const h=R(t,[-.22*o,-.28*o]),f=R(t,[-.3*o,-.62*o]),_=R(t,[-.16*o,-.92*o]),g=R(t,[.02*o,-1.02*o]);i.limb([[...t,d*1.25],[...h,d],[...f,d*.85],[..._,d*.65],[...g,d*.3]],a,{...c,capEnd:.6}),u(R(t,[-.06*o,-.08*o]),.45,.3*o,d*.8),(o>.4||l)&&u(h,.7,.32*o,d*.7),o>.7&&(u(f,.85,.3*o,d*.6),u(_,1.1,.2*o,d*.5),u(_,2.3,.16*o,d*.45))}function gs(i,e,t){[.32,.5,.38,.62,.42,.3].forEach((r,s)=>{const a=.12+s*.14,c=R(e(a),[0,.08]),l=(s-2.5)*.08,o=r*.32,u=R(c,[l*r,-r]),d=[R(c,[-o*.5,0]),R(c,[-o*.55+l*r*.7,-r*.72]),u,R(c,[o*.55+l*r*.7,-r*.72]),R(c,[o*.5,0])];i.shape(d,x.MAGIC,{group:80+s%2,line:!0,extra:!0}),i.mark([R(c,[0,0]),R(c,[l*r*.7,-r*.72]),u,R(c,[o*.55+l*r*.7,-r*.72]),R(c,[o*.5,0])],x.MAGIC2,[x.MAGIC])})}function Qg(i,e,t,n){const r=[],s=[];for(let a=0;a<=8;a++){const c=e(.05+a*.11);r.push(R(c,[0,-.08])),s.unshift(R(c,[0,.14]))}i.shape(gt([...r,...s],0,8,2,.05,1),x.LEAF,{group:85,line:!0,extra:!0});for(const[a,c]of[[.22,.55],[.5,.8],[.75,.45]]){const l=R(e(a),[0,-.02]),o=n?.02:0;i.limb([[...l,.07],[...R(l,[o,-c*.6]),.04]],x.TRUNK,{group:86,line:!0,extra:!0});const u=R(l,[o,-c*.75]),d=c*.32;i.shape(gt([R(u,[0,-d]),R(u,[d*.9,-d*.3]),R(u,[d,d*.4]),R(u,[0,d*.6]),R(u,[-d,d*.4]),R(u,[-d*.9,-d*.3])],0,6,2,d*.2,1),x.LEAF2,{group:87,line:!0,extra:!0}),i.mark([R(u,[-d*.2,-d*.1]),R(u,[d*.9,0]),R(u,[d*.8,d*.5]),R(u,[-d*.5,d*.5])],x.LEAF,[x.LEAF2])}for(const a of[.1,.38,.62,.9]){const c=R(e(a),[0,-.06]);i.limb([[...c,.04],[...R(c,[0,-.1]),.035]],x.BELLY,{group:88,extra:!0}),i.shape([R(c,[-.08,-.1]),R(c,[0,-.17]),R(c,[.08,-.1])],x.MAGIC,{group:89,line:!0,extra:!0})}}function jg(i,e,t,n){for(let r=0;r<3;r++){const s=[],a=n*.8+r*1.7;for(let c=0;c<=8;c++){const l=c/8;s.push([e*(.55-l*2.2),t+.05-r*.1-l*(.25+r*.12)+Math.sin(l*6+a)*.1*l,.07*(1-l*.7)])}i.limb(s,r%2?x.MAGIC2:x.MAGIC,{group:90+r,line:!0,extra:!0})}}function Ec(i,{sh:e,wrist:t,tip:n,d0:r,d1:s,l0:a,l1:c,w:l=.13,mat:o=x.MAGIC,light:u=x.MAGIC2,n:d=11,group:h=10}){const f=m=>m<.45?Ze(e,t,m/.45):Ze(t,n,(m-.45)/.55),_=[];for(let m=0;m<=d;m++){const v=m/d,E=Ze(r,s,v),M=Math.hypot(...E),y=a+(c-a)*v*v,T=f(v);_.push({b:T,e:[T[0]+E[0]/M*y,T[1]+E[1]/M*y]})}const g=[];for(let m=d;m>=0;m--)g.push(_[m].e),m&&g.push(Ze(Ze(_[m].e,_[m-1].e,.5),Ze(_[m].b,_[m-1].b,.5),.14));i.shape([R(e,[0,-l*.5]),R(t,[0,-l*.5]),R(n,[0,-l*.4]),...g],o,{group:h,line:!0,extra:!0});for(let m=0;m<d;m+=2)i.mark([_[m].b,_[m+1].b,Ze(_[m+1].b,_[m+1].e,1.02),Ze(_[m].b,_[m].e,1.02)],u,[o]);const p=[];for(let m=d;m>=0;m--)p.push(Ze(_[m].b,_[m].e,.33));i.shape(gt([R(e,[0,-l*.6]),R(t,[0,-l*.6]),R(n,[0,-l*.5]),...p],3,3+d,1,l*.25,1),u,{group:h+1,line:!0,extra:!0})}function Xi(i,e,t,n,r){const s=r<0,a=n?-.06:0,c=R(e,s?[.1,-.06]:[0,0]),l=s?.9:1;Ec(i,{sh:c,wrist:R(c,[-.25*l,-.72*l+a]),tip:R(c,[-1*l,-1*l+a*1.5]),d0:[-.85,.55],d1:[-1,.25],l0:.22*l,l1:.8*l,mat:s?x.BODY2:x.MAGIC,light:s?x.MAGIC:x.MAGIC2,group:s?40:50})}function qt(i,e){const t=Ki(e.length*7919);for(let n=0;n<8;n++){const r=Math.floor(me(t,2,i.w-2)),s=Math.floor(me(t,2,i.h*.6));if(!(i.get(r,s)||i.get(r+1,s)||i.get(r-1,s)||i.get(r,s+1)||i.get(r,s-1))&&(i.px(r,s,x.MAGIC2),n%3===0))for(const[a,c]of[[1,0],[-1,0],[0,1],[0,-1]])i.get(r+a,s+c)||i.px(r+a,s+c,x.MAGIC)}}function yc(i,e,t,n,r){const s=[R(e,[-t/2,0]),R(e,[-t/2,-n*.35]),R(e,[t/2,-n*.35]),R(e,[t/2,0])],a=[s[0],R(e,[-t*.55,-n]),R(e,[-t*.3,-n*.45]),R(e,[-t*.15,-n*1.05]),R(e,[0,-n*.5]),R(e,[t*.15,-n*1.05]),R(e,[t*.3,-n*.45]),R(e,[t*.55,-n]),s[3]];i.shape(a,x.MAGIC,{group:95,line:!0,extra:!0}),i.mark([R(e,[-t*.6,-n*.05]),R(e,[t*.6,-n*.05]),R(e,[t*.6,-n*.3]),R(e,[-t*.6,-n*.3])],x.MAGIC2,[x.MAGIC]),i.fn(({sp:c,T:l})=>{for(const o of[-.3,0,.3]){const[u,d]=l(R(e,[t*o,-n*.17]));c.recolour(u,d,x.GLINT)}})}function e_(i,e,t,n){const r=e===2,s=e===1,a=h=>r&&i.legend.includes(h),c=new Yt,l=t?.02:0;for(const[h,f,_]of[[-.45,x.BODY3,2],[.3,x.BODY3,2]])c.limb([[h+.05,-.25,.14],[h+.08+l,0,.1]],f,{group:_});c.shape([[-.6,-.3],[.45,-.38],[.55,-.15],[.1,-.08],[-.55,-.12]],x.BELLY,{group:1,line:!0});let o=[[-.75,-.15],[-.82,-.5],[-.55,-.9],[-.05,-1],[.35,-.88],[.58,-.58],[.5,-.3],[.15,-.38],[-.3,-.28]];o=gt(o,0,6,s?3:r?6:4,s?.06:.09,1),c.shape(o,x.BODY2,{group:3,line:!0}),c.fn(({sp:h,T:f,s:_})=>{if(_<18)return;const g=Ki(11),[p,m]=f([-.85,-1.05]),[v,E]=f([.6,-.2]),M=Math.round((v-p)*(E-m)/9);for(let y=0;y<M;y++){const T=Math.round(me(g,p,v)),C=Math.round(me(g,m,E)),b=Math.max(2,Math.round(_*.05));if(h.g[C*h.w+T]===3){for(let A=0;A<b;A++){const L=T-A,N=C+(A>>1);h.g[N*h.w+L]===3&&h.m[N*h.w+L]!==x.LINE&&(h.m[N*h.w+L]=x.BODY3)}h.g[C*h.w+T+1]===3&&(h.m[C*h.w+T+1]=x.BELLY)}}});const u=s?.16:.24;c.shape([[.35,-.68],[.58,-.6],[.68+u,-.4],[.7+u,-.3],[.6,-.18],[.32,-.22]],x.BELLY,{group:4,line:!0}),c.shape([[.38,-.7],[.48,-.78],[.55,-.66],[.46,-.6]],x.BODY,{group:5,line:!0}),c.fn(({sp:h,T:f,s:_})=>{const[g,p]=f([.7+u,-.36]),m=Math.max(1,Math.round(_*.035));for(let M=-m;M<=m;M++)for(let y=-m;y<=0;y++)h.recolour(g+y,p+M,x.NOSE);const[v,E]=f([.58,-.5]);mr(h,v,E,Math.max(2,Math.round(_*(s?.1:.07)*n.eye)),{glow:r})}),a("crystals")&&gs(c,h=>[-.7+h*1.2,-.98+Math.pow(h-.45,2)*1.4]);const d=c.draw(Xt(e,n)*.55,n.round,1,wn);return r&&qt(d,i.id),d}function t_(i,e,t,n){const r=e===2,s=e===1,a=h=>r&&i.legend.includes(h),c=new Yt,l=t?-.05:0;c.limb([[-.35,-.35+l,.28],[-.05,-.12,.18],[-.4,-.04,.12],[-.1,0,.08]],x.BODY2,{group:2}),c.limb([[.45,-.35+l,.12],[.62,0,.08]],x.BODY2,{group:2});const o=[[-.7,-.18+l],[-.72,-.5+l],[-.4,-.8+l],[.1,-.86+l],[.5,-.74+l],[.76,-.52+l],[.8,-.36+l],[.62,-.18+l],[.1,-.08+l],[-.4,-.08+l]];c.shape(o,x.BODY,{group:1,line:!0}),c.mark([[-.5,-.3+l],[.3,-.42+l],[.8,-.38+l],[.65,-.1+l],[-.4,-.05+l]],x.BELLY,[x.BODY]),c.shape([[.18,-.78+l],[.28,-.98+l],[.48,-1+l],[.58,-.8+l]],x.BODY,{group:1}),c.limb([[-.3,-.45+l,.34],[.02,-.14,.2],[-.42,-.05,.13],[-.06,0,.09]],x.BODY,{group:6,line:!0});const u=()=>{c.limb([[.46,-.32+l,.16],[.56,-.14,.11],[.64,0,.08]],x.BODY,{group:7,line:!0});for(const h of[-.06,.64])c.shape([[h-.06,-.04],[h+.14,-.05],[h+.16,0],[h-.06,0]],x.BODY,{group:7})};c.fn(({sp:h,T:f,s:_})=>{if(_>18){const y=Ki(5);for(let T=0;T<40;T++){const[C,b]=f([me(y,-.65,.55),me(y,-.8,-.35)+l]);h.m[b*h.w+C]===x.BODY&&h.g[b*h.w+C]===1&&(h.m[b*h.w+C]=x.BODY3,_>50&&h.recolour(C+1,b-1,x.BELLY))}}const[g,p]=f([.79,-.4+l]),[m]=f([.35,0]);for(let y=m;y<=g;y++)h.recolour(y,p+Math.round((g-y)*.08),x.LINE);const[v,E]=f([.42,-.88+l]),M=Math.max(2,Math.round(_*(s?.17:.13)*n.eye));if(Yi(h,v,E,M,r),M>=4)for(let y=-Math.floor(M/2)+1;y<Math.floor(M/2);y++)h.px(v+y,E,x.EYE)}),u(),a("crown")&&yc(c,[.38,-1+l],.5,.32);const d=c.draw(Xt(e,n)*.5,n.round,1,wn);return r&&qt(d,i.id),d}function n_(i,e,t,n){const r=e===2,s=e===1,a=f=>r&&i.legend.includes(f),c=new Yt,l=t?.02:0;a("wings")&&Xi(c,[.05,-.72],r,t,-1);for(const[f,_,g]of[[-.02,2,x.BODY3],[.1,7,x.NOSE]]){const p=t&&_===7?-.04:0;c.limb([[f,-.32,.07],[f+.04,-.02+p,.05]],g,{group:_}),c.shape([[f-.1,-.04+p],[f+.2,-.05+p],[f+.2,0+p],[f-.1,0+p]],g,{group:_})}c.shape(gt([[-.25,-.48+l],[-.95,-.3],[-1,-.2],[-.25,-.3]],1,2,3,.04,1),x.BODY2,{group:3,line:!0}),c.shape([[.38,-.78+l],[.42,-.52],[.18,-.3],[-.25,-.3],[-.48,-.45],[-.2,-.72+l]],x.BODY,{group:1,line:!0});const o=s?.21:.17,u=[.45,-.86+l];c.shape(gt([R(u,[-o*.9,0]),R(u,[-o*.4,-o*.95]),R(u,[o*.5,-o*.85]),R(u,[o*.95,-o*.1]),R(u,[o*.6,o*.9]),R(u,[-o*.2,o*1.6]),R(u,[-o*.8,o*1.2])],4,6,3,.03,1),x.BODY,{group:1});const d=s?.28:.38;c.shape([R(u,[o*.6,-o*.45]),R(u,[o+d*.6,-o*.45]),R(u,[o+d,-o*.05]),R(u,[o+d*.95,o*.15]),R(u,[o+d*.4,o*.2]),R(u,[o*.6,o*.35])],x.NOSE,{group:8,line:!0}),a("wings")||c.shape(gt([[.28,-.72+l],[-.1,-.42],[-.75,-.3],[-.75,-.36],[-.2,-.66+l]],1,3,4,.04,1),x.BODY2,{group:4,line:!0}),c.fn(({sp:f,T:_,s:g})=>{const[p,m]=_(R(u,[o*.35,-o*.2]));mr(f,p,m,Math.max(2,Math.round(g*(s?.1:.07)*n.eye)),{glow:r});const[v,E]=_(R(u,[o*.85,-o*.35]));if(f.px(v,E,r?x.MAGIC2:x.EYE),g>30){const[M,y]=_(R(u,[o*.1,-o*.7]));f.recolour(M,y,x.BELLY),f.recolour(M+1,y,x.BELLY)}}),a("eyesRing")&&c.fn(({sp:f,T:_,s:g})=>{const p=Math.max(3,Math.round(g*.09));for(let m=0;m<5;m++){const v=Math.PI*(1.15+m*.17),[E,M]=_(R(u,[Math.cos(v)*.55-.15,Math.sin(v)*.5+.05]));Yi(f,E,M,p,!0,!0)}}),a("wings")&&Xi(c,[-.02,-.66],r,t,1);const h=c.draw(Xt(e,n)*.6,n.round,1,wn);return r&&qt(h,i.id),h}function i_(i,e,t,n){const r=e===2,s=e===1,a=g=>r&&i.legend.includes(g),c=new Yt,l=a("wingsBig")?1.5:s?.85:1,o=t===0,u=-.25;for(const g of[-1,1]){const p=(C,b)=>[g*C*l,b+u],m=p(.12/l,-.62),v=o?p(.55,-1):p(.6,-.62),E=o?[p(1,-.95),p(1.05,-.62),p(.8,-.32)]:[p(1.05,-.45),p(.9,-.18),p(.6,-.02)],M=p(.12/l,-.38),y=[m,v,E[0]];for(let C=1;C<E.length;C++)y.push(Ze(Ze(E[C-1],E[C],.5),v,.22),E[C]);y.push(Ze(Ze(E[2],M,.5),v,.1),M);const T=a("wingsBig")?x.MAGIC:x.BODY2;c.shape(g<0?y.slice().reverse():y,T,{group:10+(g>0?1:0),line:!0,extra:!0,depth:2});for(const C of E)c.limb([[...v,.05],[...C,.02]],a("wingsBig")?x.MAGIC2:x.BODY3,{group:12,extra:!0});c.limb([[...m,.07],[...v,.05]],a("wingsBig")?x.MAGIC2:x.BODY3,{group:12,extra:!0})}const d=[0,-.5+u];c.shape(gt([R(d,[0,-.25]),R(d,[.17,-.12]),R(d,[.16,.15]),R(d,[0,.28]),R(d,[-.16,.15]),R(d,[-.17,-.12])],2,5,3,.03,1),x.BODY,{group:1,line:!0});const h=[0,-.82+u],f=s?.17:.14;for(const g of[-1,1])c.shape([R(h,[g*f*.3,-f*.6]),R(h,[g*f*1.05,-f*2.3]),R(h,[g*f*1.2,-f*.3])],x.BODY,{group:2,line:!0}),c.mark([R(h,[g*f*.55,-f*.7]),R(h,[g*f*1,-f*1.9]),R(h,[g*f*1,-f*.5])],x.EAR,[x.BODY]);c.shape([R(h,[0,-f]),R(h,[f,-f*.3]),R(h,[f*.7,f*.8]),R(h,[0,f]),R(h,[-f*.7,f*.8]),R(h,[-f,-f*.3])],x.BODY,{group:1}),c.fn(({sp:g,T:p,s:m})=>{for(const M of[-1,1]){const[y,T]=p(R(h,[M*f*.42,-f*.1]));m*f>7?Yi(g,y,T,Math.max(2,Math.round(m*f*.4*n.eye)),r):g.px(y,T,x.EYE)}const[v,E]=p(R(h,[0,f*.45]));g.recolour(v,E,x.NOSE),g.recolour(v-1,E,x.NOSE),m>30&&(g.recolour(v-2,E+2,x.GLINT),g.recolour(v+1,E+2,x.GLINT))});for(const g of[-1,1])c.limb([[g*.08,-.28+u,.05],[g*.1,-.18+u,.04]],x.BODY3,{group:3});const _=c.draw(Xt(e,n)*.45,n.round,1,null,!1);return r&&qt(_,i.id),_}function r_(i,e,t,n){const r=e===2,s=e===1,a=h=>r&&i.legend.includes(h),c=new Yt,l=t?.03:0;c.limb([[-.5,-.25,.14],[-.48,0,.1]],x.SKIN,{group:2}),c.limb([[-.7,-.3,.08],[-.85,-.2,.05]],x.SKIN,{group:2});const o=s?.22:.32;c.shape([[-.75,-.12],[-.82,-.5],[-.45,-.95],[.15,-1],[.55,-.8],[.8,-.55],[.8,-.35],[.55,-.2],[0,-.08]],x.BODY,{group:1,line:!0}),c.shape([[.7,-.58],[.8+o,-.5],[.84+o,-.42],[.8+o,-.36],[.72,-.36]],x.SKIN,{group:4,line:!0}),c.mark([[-.6,-.85],[.3,-.98],[.5,-.8],[-.3,-.72]],x.BODY2,[x.BODY]);const u=(h,f,_)=>{c.limb([[h-.05,-.4,.14],[h+.02,-.16-l,.11]],f,{group:_,line:!0}),c.shape([[h-.06,-.2-l],[h+.12,-.22-l],[h+.2,-.08-l],[h+.06,-.03],[h-.08,-.06]],x.SKIN,{group:_,line:!0});for(let g=0;g<4;g++)c.limb([[h+.08+g*.045,-.08-l*(g%2),.035],[h+.14+g*.05,0,.015]],x.ACCENT,{group:_+1,line:!0,extra:!0})};u(.25,x.BODY2,5),u(.45,x.BODY,7),c.fn(({sp:h,T:f,s:_})=>{const[g,p]=f([.62,-.62]);h.px(g,p,r?x.MAGIC2:x.EYE),_>40&&h.px(g-1,p,r?x.MAGIC:x.EYE);const[m,v]=f([.84+o,-.45]);h.recolour(m,v,x.NOSE),h.recolour(m,v+1,x.NOSE)}),a("crown")&&yc(c,[.25,-.98],.42,.3);const d=c.draw(Xt(e,n)*.45,n.round,1,wn);return r&&qt(d,i.id),d}function s_(i,e,t,n){const r=e===2,s=f=>r&&i.legend.includes(f),a=new Yt,c=(f,_,g,p,m)=>{const v=(g+(_>0?1:0)+t)%2?.06:-.06,E=[f,-.3],M=[f+_*0+v+(g-1)*.1,-.42],y=[f+v*1.5+(g-1)*.22,0];a.limb([[...E,.07],[...M,.06],[...y,.03]],p,{group:m,line:!0})};for(let f=0;f<3;f++)c(-.3+f*.35,-1,f,x.BODY3,2);const l=[.3,.55,.8][e]*(s("horn")?1.3:1),o=s("horn")?x.MAGIC:x.BODY2,u=[.62,-.5],d=(f,_,g)=>{const p=R(u,[.12,f]),m=R(p,[l*.9,-l*.45]),v=R(p,[l*1.05,-l*.2]);a.limb([[...p,.1],[...R(p,[l*.45,-l*.4]),.085],[...m,.06],[...v,.02]],_,{group:g,line:!0,extra:!0,capEnd:.5}),a.limb([[...R(p,[l*.5,-l*.4]),.05],[...R(p,[l*.62,-l*.18]),.015]],_,{group:g,line:!0,extra:!0})};d(-.02,s("horn")?x.MAGIC:x.BODY3,3),a.shape([[-.8,-.25],[-.78,-.6],[-.35,-.85],[.12,-.8],[.3,-.58],[.25,-.28],[-.3,-.18]],x.BODY,{group:1,line:!0}),a.mark([[-.65,-.65],[-.3,-.8],[.05,-.76],[-.2,-.68]],x.BELLY,[x.BODY]),a.shape([[.22,-.68],[.48,-.7],[.58,-.5],[.5,-.3],[.24,-.3]],x.BODY,{group:4,line:!0}),a.shape([[.5,-.62],[.72,-.6],[.78,-.45],[.68,-.36],[.5,-.4]],x.BODY2,{group:5,line:!0}),d(.04,o,6),a.limb([[.7,-.6,.025],[.78,-.75,.02],[.9,-.72,.02]],x.BODY3,{group:9,extra:!0});for(let f=0;f<3;f++)c(-.2+f*.35,1,f,x.BODY2,7);a.fn(({sp:f,T:_,s:g})=>{const[p,m]=_([-.78,-.42]),[v,E]=_([.28,-.5]);if(g>25)for(let T=p+2;T<v-2;T++)f.recolour(T,Math.round(m+(E-m)*(T-p)/(v-p))-Math.round(Math.sin((T-p)/(v-p)*Math.PI)*g*.12),x.LINE);const[M,y]=_([.66,-.52]);f.px(M,y,r?x.MAGIC2:x.GLINT)}),s("crystals")&&gs(a,f=>[-.7+f*.9,-.82+Math.pow(f-.5,2)*.8]);const h=a.draw(Xt(e,n)*.4,n.round,1,wn);return r&&qt(h,i.id),h}const wn=([i,e])=>{const t=Math.max(-1.2,Math.min(.75,i)),n=1+.1*t;return[i,e*n-.08*Math.max(0,-t),n]};function a_(i,e,t,n){const r=e===2,s=e===1,a=f=>r&&i.legend.includes(f),c=new Yt,l=t?.04:0;c.shape([[-.85,-.02],[-.75,-.16],[.3,-.2],[.62+l,-.32],[.82+l,-.32],[.9+l,-.15],[.8+l,0],[-.85,0]],x.SKIN,{group:1,line:!0});for(const[f,_,g]of[[.08,x.BODY2,2],[0,x.SKIN,5]])c.limb([[.72+l+f,-.3,.06],[.8+l+f,-.55,.04],[.84+l+f,-.62,.05]],_,{group:g,line:!0});const o=a("glowShell")?x.MAGIC:x.BODY,u=[-.15,-.55],d=s?.45:.5;c.shape([R(u,[0,-d]),R(u,[d*.95,-d*.2]),R(u,[d*.7,d*.75]),R(u,[-d*.3,d*.9]),R(u,[-d,d*.3]),R(u,[-d*.85,-d*.55])],o,{group:3,line:!0}),c.fn(({sp:f,T:_,s:g})=>{const p=a("glowShell")?x.MAGIC2:x.BODY3;for(let y=0;y<1;y+=.004){const T=y*Math.PI*5.2,C=d*.85*(1-y),[b,A]=_(R(u,[Math.cos(T)*C,Math.sin(T)*C*.95])),L=f.get(b,A);(L===o||L===x.BODY2)&&f.recolour(b,A,p)}const[m,v]=_([.85+l,-.64]);f.px(m,v,r?x.MAGIC2:x.EYE);const[E,M]=_([.93+l,-.62]);f.px(E,M,r?x.MAGIC2:x.EYE)});const h=c.draw(Xt(e,n)*.4,n.round,1,wn);return r&&qt(h,i.id),h}function o_(i,e,t,n){const r=e===2,s=l=>r&&i.legend.includes(l),a=new Yt;for(let l=0;l<7;l++){const o=-.6+l*.2,u=(l+t)%2?.04:-.04;a.limb([[o,-.12,.05],[o+u+.04,0,.03]],x.BODY3,{group:2})}a.limb([[.75,-.3,.03],[.95,-.55,.02],[1.05,-.5,.02]],x.BODY3,{group:2,extra:!0}),a.shape([[-.85,-.1],[-.7,-.6],[-.1,-.85],[.5,-.72],[.82,-.4],[.82,-.12],[-.8,-.06]],x.BODY,{group:1,line:!0}),a.fn(({sp:l,T:o,s:u})=>{for(let f=1;f<8;f++){const _=-.85+f*.21;for(let g=o([0,-.9])[1];g<o([0,-.08])[1];g++){const[p]=o([_+(g-o([0,-.5])[1])*.002,0]);l.get(p,g)===x.BODY&&l.recolour(p,g,u>25?x.LINE:x.BODY2)}}const[d,h]=o([.72,-.38]);l.px(d,h,r?x.MAGIC2:x.EYE)}),a.mark([[-.6,-.62],[0,-.86],[.4,-.72],[0,-.65]],x.BELLY,[x.BODY]),s("crystals")&&gs(a,l=>[-.65+l*1.2,-.82+Math.pow(l-.45,2)*1.2]);const c=a.draw(Xt(e,n)*.3,n.round,1,wn);return r&&qt(c,i.id),c}function l_(i,e,t,n){const r=e===2,s=e===1,a=f=>r&&i.legend.includes(f),c=new Yt;a("wings")&&Xi(c,[-.05,-.55],r,t,-1);const l=t?.6:0,o=[];for(let f=0;f<=14;f++){const _=f/14,g=-1.1+_*1.6,p=-.08-Math.sin(_*Math.PI*2.2+l)*.05*(1-_);o.push([g,p,.16*(.35+.65*Math.sin(Math.min(1,_*1.6)*Math.PI/2))])}o.push([.6,-.25,.15],[.62,-.5,.14],[.7,-.68,.13]),c.limb(o,x.BODY,{group:1,line:!0,cap:.5}),c.fn(({sp:f,T:_,s:g})=>{for(let p=1;p<o.length-1;p++){const[m,v]=_(o[p]),E=Math.max(1,Math.round(g*.025));for(let M=-E;M<=E;M++)for(let y=-E;y<=E;y++)Math.abs(y)+Math.abs(M)<=E&&f.get(m+y,v+M-E)===x.BODY&&f.recolour(m+y,v+M-E,x.BODY3)}}),c.mark([[-1,-.02],[.6,-.02],[.66,-.45],[.62,-.45],[.5,-.06],[-1,-.06]],x.BELLY,[x.BODY]);const u=[.82,-.74],d=s?.15:.12;c.shape([R(u,[-d*1.1,-d*.4]),R(u,[d*.3,-d*.75]),R(u,[d*1.5,-d*.2]),R(u,[d*1.4,d*.3]),R(u,[-d*.3,d*.7]),R(u,[-d,d*.5])],x.BODY,{group:1}),c.fn(({sp:f,T:_,s:g})=>{const p=Math.max(2,Math.round(g*d*.45*n.eye)),[m,v]=_(R(u,[d*.45,-d*.3]));mr(f,m,v,p,{glow:r});const[E,M]=_(R(u,[d*1.05,-d*.38]));if(f.px(E,M,r?x.MAGIC2:x.EYE),t===0){const[y,T]=_(R(u,[d*1.5,d*.15]));for(let C=0;C<Math.max(2,Math.round(g*.06));C++)f.px(y+C,T,x.SKIN);f.px(y+Math.max(2,Math.round(g*.06)),T-1,x.SKIN),f.px(y+Math.max(2,Math.round(g*.06)),T+1,x.SKIN)}}),a("wings")&&Xi(c,[-.1,-.45],r,t,1);const h=c.draw(Xt(e,n)*.45,n.round,1,wn);return r&&qt(h,i.id),h}function c_(i,e,t,n){const r=e===2,s=e===1,a=f=>r&&i.legend.includes(f),c=new Yt,l=a("wingsBig")?1.45:s?.85:1,o=t===0,u=-.25,d=a("wingsBig")?x.MAGIC:x.BODY;for(const f of[-1,1]){const _=(m,v)=>[f*m*l,(o?v:v*.7+.12)+u],g=[_(.08,-.62),_(.55,-1),_(1,-.92),_(.95,-.6),_(.5,-.45),_(.1,-.48)],p=[_(.08,-.45),_(.45,-.42),_(.7,-.22),_(.5,-.05),_(.2,-.1),_(.06,-.3)];c.shape(f<0?p.slice().reverse():p,a("wingsBig")?x.MAGIC2:x.BODY2,{group:10,line:!0,extra:!0}),c.shape(f<0?g.slice().reverse():g,d,{group:11,line:!0,extra:!0}),c.mark([_(.5,-.82),_(.75,-.82),_(.75,-.65),_(.5,-.65)].map((m,v)=>m),x.BELLY,[d]),c.fn(({sp:m,T:v})=>{const[E,M]=v(_(.62,-.74));m.recolour(E,M,x.BODY3),m.recolour(E+1,M,x.BODY3)})}c.shape(gt([[0,-.78+u],[.1,-.6+u],[.08,-.2+u],[0,-.1+u],[-.08,-.2+u],[-.1,-.6+u]],0,6,2,.025,1),x.BELLY,{group:1,line:!0});for(const f of[-1,1])c.limb([[f*.03,-.8+u,.04],[f*.14,-1+u,.07],[f*.2,-1.08+u,.03]],x.BODY2,{group:2,line:!0});c.fn(({sp:f,T:_,s:g})=>{for(const p of[-1,1]){const[m,v]=_([p*.05,-.74+u]);f.px(m,v,r?x.MAGIC2:x.EYE)}});const h=c.draw(Xt(e,n)*.4,n.round,1,null,!1);return r&&qt(h,i.id),h}function u_(i,e,t,n){const r=e===2,s=u=>r&&i.legend.includes(u),a=new Yt,c=t?.05:0,l=[];for(let u=0;u<=8;u++){const d=u/8;l.push([-.9+d*1.6,-.2-Math.sin(d*Math.PI)*(.1+c),.32-d*.08])}a.limb(l,x.BODY,{group:1,line:!0});for(let u=0;u<6;u++){const d=-.3+u*.16;a.limb([[d,-.1,.04],[d+(u%2?.03:-.03)*(t?-1:1),0,.03]],x.BODY3,{group:2})}a.fn(({sp:u,T:d,s:h})=>{for(let E=1;E<8;E++){const[M]=d(l[E]);for(let y=0;y<u.h;y++)u.get(M,y)===x.BODY&&u.recolour(M,y,x.BODY2)}const f=s("lantern")?1.7:1,[_,g]=d([-.8,-.2]),p=Math.round(h*.17*f);for(let E=-p;E<=p;E++)for(let M=-p;M<=p;M++){const y=Math.hypot(M,E)/p;y>1||(u.get(_+M,g+E)||f>1)&&u.px(_+M,g+E,y<.55?x.MAGIC2:x.MAGIC,M/(p+1),E/(p+1),.8)}const[m,v]=d([.66,-.28]);u.px(m,v,r?x.MAGIC2:x.EYE)});const o=a.draw(Xt(e,n)*.3,n.round,1,wn);return r&&qt(o,i.id),o}function h_(i,e,t,n){const r=e===2,s=o=>r&&i.legend.includes(o),a=new Yt,c=(o,u)=>{const d=.1+o*.1,h=o<2?1:-1,f=(o+(u?0:1)+t)%2?.07:-.07,_=u?[0,0]:[.06,-.1],g=[d+h*.25+f,-.75],p=[d+h*.55+f*1.5,0];a.limb([[d,-.42,.07],g,p].map((m,v)=>[m[0]+_[0],m[1]+_[1],v===0?.07:v===1?.06:.03]),u?x.BODY2:x.BODY3,{group:u?7:2,line:u})};for(let o=0;o<4;o++)c(o,!1);a.shape([[-.95,-.5],[-.7,-.95],[-.15,-1],[.12,-.6],[-.1,-.25],[-.6,-.2]],x.BODY,{group:1,line:!0}),a.mark([[-.55,-.88],[-.45,-.88],[-.45,-.3],[-.55,-.3]],x.BELLY,[x.BODY]),a.mark([[-.85,-.62],[-.15,-.66],[-.15,-.56],[-.85,-.52]],x.BELLY,[x.BODY]),a.shape([[.05,-.55],[.3,-.7],[.55,-.6],[.6,-.4],[.3,-.3],[.05,-.38]],x.BODY2,{group:3,line:!0});for(let o=0;o<4;o++)c(o,!0);a.fn(({sp:o,T:u,s:d})=>{const h=s("eyesRing"),f=[[.48,-.6],[.53,-.55],[.43,-.57],[.5,-.5]];for(const _ of f){const[g,p]=u(_);o.px(g,p,h?x.MAGIC2:x.EYE),d>40&&o.px(g+1,p,h?x.MAGIC:x.EYE)}if(!h){const[_,g]=u(f[0]);o.px(_,g,x.GLINT)}}),s("eyesRing")&&a.fn(({sp:o,T:u,s:d})=>{const h=Math.max(3,Math.round(d*.1));for(let f=0;f<5;f++){const _=Math.PI*(1.15+f*.17),[g,p]=u([-.4+Math.cos(_)*.7,-.6+Math.sin(_)*.6]);Yi(o,g,p,h,!0,!0)}});const l=a.draw(Xt(e,n)*.4,n.round,1,wn);return r&&qt(l,i.id),l}function d_(i,e,t,n,r,s){const a=[];for(let c=0;c<=1.001;c+=1/10){const l=-Math.PI/2+.5-c*Math.PI*1.75,o=t*.7*n*(1-.5*c);a.push([e[0]+Math.cos(l)*o-t*.1,e[1]+Math.sin(l)*o*.95,t*.4*n*(1-.65*c)])}i.limb(a,r,{...s,capEnd:.5}),i.fn(({sp:c,T:l,s:o})=>{if(!(o*t<8))for(let u=1;u<a.length-1;u++){const[d,h]=l(a[u]);c.get(d,h)===r&&c.recolour(d,h,x.LINE)}})}function f_(i,e,t,n){const r=e===2,s=e===1,a=p=>r&&i.legend.includes(p),c=new Yt,l=t?-.02:0,o=s?.52:.5,u=s?.4:.34,d=(s?-1.02:-1.1)+l;a("wings")&&vl(c,-1,t);for(const[p,m]of[[-.12,x.ACCENT],[.14,x.ACCENT]]){const v=t&&p>0?-.03:0;c.limb([[p,-.2,.12],[p+.02,-.05+v,.09]],x.BODY2,{group:2}),c.shape([[p-.07,-.06+v],[p+.1,-.07+v],[p+.16,0+v],[p+.1,0+v],[p-.08,0+v]],m,{group:2})}c.shape([[-.3,-.4],[-.48,-.12],[-.4,-.05],[-.18,-.2]],x.BODY2,{group:3,line:!0});const h=[[0,-1+l],[o*.85,-.85+l],[o*1.02,-.5],[o*.8,-.16],[0,-.12],[-o*.85,-.2],[-o*1.02,-.55],[-o*.8,-.88+l]];c.shape(h,x.BODY,{group:1,line:!0}),c.mark([[0,-.9+l],[o*.7,-.75],[o*.75,-.35],[o*.3,-.15],[-o*.2,-.18],[-o*.45,-.5],[-o*.3,-.85]],x.BELLY,[x.BODY]),c.fn(({sp:p,T:m,s:v})=>{if(v<18)return;const[E,M]=m([-o*.3,-.85]),[y,T]=m([o*.7,-.25]),C=Math.max(3,Math.round(v*.09));for(let b=M+C;b<T;b+=C)for(let A=E;A<y;A+=C){const L=(b/C|0)%2?C>>1:0;p.recolour(A+L,b,p.get(A+L,b)===x.BELLY?x.BODY2:p.get(A+L,b)),v>40&&p.recolour(A+L,b+1,p.get(A+L,b+1)===x.BELLY?x.BODY2:p.get(A+L,b+1))}}),a("wings")||c.shape(gt([[-o*.55,-.88+l],[-o*.05,-.78+l],[o*.15,-.45],[-o*.1,-.15],[-o*.45,-.1],[-o*.85,-.35],[-o*.95,-.7]],2,6,s?4:6,.045,1),x.BODY2,{group:4,line:!0}),c.fn(({sp:p,T:m,s:v})=>{if(!(v<18||a("wings")))for(const[E,M]of[[-.35,-.6],[-.15,-.5],[-.5,-.45],[-.3,-.35],[-.6,-.3]]){const[y,T]=m([E*o/.5,M]);p.recolour(y,T,x.BODY3),p.recolour(y+1,T,x.BODY3)}}),c.shape([[0,d-u*.82],[u*.95,d-u*.72],[u*1.2,d-u*.05],[u*.9,d+u*.6],[0,d+u*.78],[-u*.9,d+u*.6],[-u*1.2,d-u*.05],[-u*.95,d-u*.72]],x.BODY,{group:1});for(const p of[-1,1])c.shape(gt([[p*u*.5,d-u*.78],[p*u*1.05,d-u*1.25],[p*u*1.12,d-u*1.32],[p*u*1,d-u*.6]],0,1,2,.05,-p),x.BODY2,{group:5,line:!0});const f=u*.22,_=p=>p<0?.68:1.08;for(const p of[-1,1])c.mark([[f+p*u*.05,d-u*.55],[f+p*u*.7*_(p),d-u*.62],[f+p*u*.98*_(p),d-u*.05],[f+p*u*.68*_(p),d+u*.5],[f+p*u*.05,d+u*.4]],x.BELLY,[x.BODY]);c.fn(({sp:p,T:m,s:v})=>{const E=Math.max(2,Math.round(u*v*(s?.55:.45)*n.eye));for(const b of[-1,1]){const[A,L]=m([f+b*u*.45*_(b),d-u*.18]),N=Math.max(2,Math.round(E*(b<0?.8:1)));Yi(p,A,L,N,r)}const[M,y]=m([f+u*.05,d+u*.05]),T=Math.max(2,Math.round(u*v*.32)),C=Math.max(1,Math.round(T*.4));for(let b=0;b<T;b++)for(let A=-C;A<=C;A++)Math.abs(A)<=C*(1-b/T)+.3&&p.px(M+A,y+b,b===T-1||A===C?x.BODY3:x.ACCENT,A/(C+1)*.5,-.2,.85)}),a("eyesRing")&&c.fn(({sp:p,T:m,s:v})=>{const E=Math.max(3,Math.round(v*.1));for(let M=0;M<7;M++){const y=Math.PI*(1.1+M/6*.8),[T,C]=m([Math.cos(y)*u*2,d-u*.3+Math.sin(y)*u*1.6]);Yi(p,T,C,E,!0,!0)}}),a("wings")&&vl(c,1,t);const g=c.draw(Xt(e,n),n.round);return r&&qt(g,i.id),g}function Yi(i,e,t,n,r,s=!1){const a=n/2;for(let c=-Math.ceil(a);c<=Math.ceil(a);c++)for(let l=-Math.ceil(a);l<=Math.ceil(a);l++){const o=Math.hypot(l,c)/a;if(o>1.05)continue;const u=o>.82,d=s?o<.45?x.EYE:u?x.MAGIC:x.MAGIC2:u&&a>=2?x.NOSE:o<.5?x.EYE:r?x.MAGIC2:x.IRIS;i.px(e+l,t+c,d,l/(a+1)*.4,c/(a+1)*.4,.9)}s||i.px(e+Math.round(a*.35),t-Math.round(a*.35),x.GLINT)}function vl(i,e,t){const n=e,r=t?-.08:0,s=e<0;Ec(i,{sh:[.3*n,-.85],wrist:[1*n,-1.38+r],tip:[1.6*n,-1.55+r*1.5],d0:[.15*n,1],d1:[.9*n,.55],l0:.42,l1:.72,mat:s?x.BODY2:x.MAGIC,light:s?x.MAGIC:x.MAGIC2,group:s?40:50})}const p_=[{k:"ambientHue",g:"Night light",label:"Twilight hue",min:0,max:1,step:.01,v:.68,hue:!0},{k:"ambient",g:"Night light",label:"Twilight brightness",min:.05,max:.6,step:.01,v:.22},{k:"moon",g:"Night light",label:"Moonlight",min:0,max:1,step:.01,v:.3},{k:"moonHue",g:"Night light",label:"Moon hue",min:0,max:1,step:.01,v:.58,hue:!0},{k:"glowHue",g:"Night light",label:"Witch glow hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"glowSat",g:"Night light",label:"Witch glow colour",min:0,max:1,step:.01,v:.35},{k:"glowRadius",g:"Night light",label:"Witch glow reach",min:30,max:200,step:5,v:110},{k:"glowPower",g:"Night light",label:"Witch glow strength",min:.3,max:2.5,step:.05,v:1.4},{k:"bands",g:"Shading",label:"Light steps",min:2,max:7,step:1,v:4},{k:"dither",g:"Shading",label:"Dithering",min:0,max:1,step:.05,v:.35},{k:"round",g:"Shading",label:"Roundness",min:.2,max:1.5,step:.05,v:.9},{k:"outline",g:"Shading",label:"Plant outline",options:["none","dark","tinted"],v:"none"},{k:"cOutline",g:"Shading",label:"Creature outline",options:["dark","tinted","none"],v:"dark"},{k:"shafts",g:"Night light",label:"Moonbeams",min:0,max:1,step:.05,v:.3},{k:"areaContrast",g:"Colour",label:"Difference between areas",min:0,max:1,step:.05,v:.6},{k:"sat",g:"Colour",label:"Saturation",min:.2,max:1.3,step:.01,v:.9},{k:"leafHue",g:"Colour",label:"Leaf hue",min:0,max:1,step:.01,v:.3,hue:!0},{k:"leafVariety",g:"Colour",label:"Leaf colour variety",min:0,max:1,step:.05,v:.3},{k:"trunkHue",g:"Colour",label:"Bark hue",min:0,max:1,step:.01,v:.07,hue:!0},{k:"groundHue",g:"Colour",label:"Ground hue",min:0,max:1,step:.01,v:.27,hue:!0},{k:"groundVal",g:"Colour",label:"Ground brightness",min:.15,max:.7,step:.01,v:.4},{k:"pixel",g:"Shading",label:"Pixel size",min:1,max:5,step:1,v:3},{k:"treeSize",g:"Trees",label:"Tree height",min:.5,max:1.5,step:.05,v:.85},{k:"crownWidth",g:"Trees",label:"Crown width",min:1,max:4,step:.1,v:3},{k:"clearing",g:"Trees",label:"Clearing size",min:0,max:1,step:.05,v:.55},{k:"depth",g:"Map",label:"Border detail (fractal layers)",min:0,max:6,step:1,v:4},{k:"areaScale",g:"Map",label:"Area size (screens)",min:.6,max:2,step:.05,v:1},{k:"areaTypes",g:"Map",label:"Area types",min:4,max:30,step:1,v:30},{k:"density",g:"Trees",label:"Foliage density",min:.2,max:1,step:.05,v:.55},{k:"clump",g:"Trees",label:"Clumpiness",min:0,max:1,step:.05,v:.6},{k:"gnarl",g:"Trees",label:"Gnarliness",min:0,max:1,step:.05,v:.5},{k:"roots",g:"Trees",label:"Roots",min:0,max:1,step:.05,v:.6},{k:"bark",g:"Trees",label:"Bark texture",min:0,max:1,step:.05,v:.6},{k:"trees",g:"Trees",label:"Tree density",min:.2,max:2,step:.05,v:1},{k:"wBroad",g:"Tree mix",label:"Gnarled broadleaf",min:0,max:1,step:.05,v:.8},{k:"wFir",g:"Tree mix",label:"Fir",min:0,max:1,step:.05,v:.6},{k:"wWillow",g:"Tree mix",label:"Willow",min:0,max:1,step:.05,v:.5},{k:"wBirch",g:"Tree mix",label:"Birch",min:0,max:1,step:.05,v:.5},{k:"wPalm",g:"Tree mix",label:"Tree fern",min:0,max:1,step:.05,v:.3},{k:"wFlat",g:"Tree mix",label:"Flat-crowned",min:0,max:1,step:.05,v:.5},{k:"bushes",g:"Undergrowth",label:"Bushes and shrubs",min:0,max:120,step:1,v:55},{k:"bushSize",g:"Undergrowth",label:"Bush size",min:.5,max:1.8,step:.05,v:1},{k:"flowers",g:"Undergrowth",label:"Flowers",min:0,max:1,step:.05,v:.3},{k:"cSat",g:"Creatures",label:"Creature saturation",min:.1,max:1,step:.01,v:.6},{k:"cVal",g:"Creatures",label:"Creature brightness",min:.4,max:1,step:.01,v:.85},{k:"head",g:"Creatures",label:"Baby head size",min:.3,max:.6,step:.01,v:.44},{k:"eye",g:"Creatures",label:"Eye size",min:.5,max:2,step:.05,v:1},{k:"legs",g:"Creatures",label:"Leg length",min:.5,max:1.8,step:.05,v:1},{k:"long",g:"Creatures",label:"Body length",min:.7,max:1.5,step:.05,v:1},{k:"size",g:"Creatures",label:"Baby size (px)",min:5,max:14,step:1,v:8},{k:"growth",g:"Creatures",label:"Legend vs baby height",min:5,max:25,step:1,v:20},{k:"magicHue",g:"Creatures",label:"Magic glow hue",min:0,max:1,step:.01,v:.5,hue:!0},{k:"fur",g:"Creatures",label:"Stripes and spots",min:0,max:1,step:.05,v:.5},{k:"cloakHue",g:"Witch",label:"Cloak hue",min:0,max:1,step:.01,v:.72,hue:!0},{k:"hairHue",g:"Witch",label:"Hair hue",min:0,max:1,step:.01,v:.01,hue:!0}];function m_(){const i={};return p_.forEach(e=>i[e.k]=e.v),i}const ea=[".........HH.........","........HHHH........",".......HHHHHH.......","......HHHHHHHH......","....HHHHHHHHHHHH....","........SSS.........",".......SSESS........",".......hSSSS........","......hCCCC.........",".....hhCCCCC........",".....h.CCCCCC.......",".......CCCCCCC......",".......CCCCCCCC.....","TTTT.BBBBBBBBBBBBBBB","TTTTTBBBBBBBBBBBBBBB","TTTT......CC.CC....."];function g_(){const i=new Ut(ea[0].length,ea.length),e={H:x.CLOTH,S:x.SKIN,E:x.EYE,h:x.HAIR,C:x.CLOTH,B:x.BROOM,T:x.STRAW};return ea.forEach((t,n)=>[...t].forEach((r,s)=>e[r]&&i.put(s,n,e[r]))),i}const __=i=>({[x.CLOTH]:we(i.cloakHue,.55,.6),[x.SKIN]:[240,205,170],[x.EYE]:[20,14,26],[x.HAIR]:we(i.hairHue,.7,.85),[x.BROOM]:we(i.trunkHue+.02,.55,.6),[x.STRAW]:[230,190,100]}),x_={broad:Tl,fir:qa,willow:Al,birch:Bl,flat:Rl};function v_(i,e,t,n,r){const s=x_[e.type],a={...t,leafHue:i.leaf+(e.dark?.05:0),gnarl:e.gnarl??t.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},c=s(n,a,t.treeSize*r*(e.scale||1)*me(n,.9,1.1)),l=Ka(n,a,s);return e.dark&&(l[x.LEAF]=l[x.LEAF3],l[x.LEAF3]=we(i.leaf+.05,.7,.22)),l[x.NOSE]=[20,16,24],l[x.GLINT]=[235,235,240],{parts:qc(c),colours:l}}function M_(i,e,t,n,r){const s=Jn[t].id,a=Za.find(h=>h.id===s),c=Qc(s,i,{K:n,makeCanvas:r}),l=[],o=h=>l.push(h)-1,u={big:[],small:[],walls:[],set:null},d=(h,f)=>Gi(h,f,i,"none",r);a.big.forEach(([h,f],_)=>{if(h!=="tree"){u.big.push({bot:o(c.big[_].sp),top:null});return}const g=Math.max(1,Math.round(Cl/a.big.length));for(let p=0;p<g;p++){const{parts:m,colours:v}=v_(a,f,i,cr(e*13+t*101+_*17+p*7+1),n);u.big.push({bot:o(d(m.bot,v)),top:o(d(m.top,v))})}});for(const h of c.small)u.small.push(o(h.sp));for(const h of c.walls)u.walls.push(o(h.sp));return c.setPiece&&(u.set=o(c.setPiece.sp)),{sprites:l,layout:u,floor:c.floor.sp}}function S_(i,e,t){const n=[];for(let r=0;r<3;r++)for(let s=0;s<2;s++)n.push(Gi(Vg(e,r,s,i),Hg(e,i),i,i.cOutline,t));return n}const b_=(i,e)=>i*2+e;function cs(i,e,t){return i.getContext("2d").getImageData(0,0,e,t).data}function Xa(i,e=2048){const n=[];let r=0,s=0,a=0,c=1;for(const h of i)r+h.w+1>e&&(r=0,s+=a+1,a=0),n.push({x:r,y:s}),r+=h.w+1,a=Math.max(a,h.h),c=Math.max(c,r);const l=Math.max(1,s+a),o=new Uint8Array(c*l*4),u=new Uint8Array(c*l*4),d=i.map((h,f)=>{const _=n[f],g=cs(h.A,h.w,h.h),p=cs(h.N,h.w,h.h);for(let m=0;m<h.h;m++){const v=m*h.w*4,E=((_.y+m)*c+_.x)*4;o.set(g.subarray(v,v+h.w*4),E),u.set(p.subarray(v,v+h.w*4),E)}return{uv:[_.x/c,_.y/l,(_.x+h.w)/c,(_.y+h.h)/l],w:h.w,h:h.h}});return{albedo:o,normal:u,width:c,height:l,frames:d}}function E_(i,e){if(i.kind==="creature")return{px:Xa(S_(i.style,i.id,e),1024)};const{sprites:t,layout:n,floor:r}=M_(i.style,i.seed,i.id,i.K,e);return{px:Xa(t),layout:n,floor:{albedo:new Uint8Array(cs(r.A,r.w,r.h)),normal:new Uint8Array(cs(r.N,r.w,r.h)),w:r.w,h:r.h}}}function Ml(i,e,t){const n=new Ni(i,e,t,rn,$t);return n.magFilter=At,n.minFilter=At,n.generateMipmaps=!1,n.flipY=!1,n.colorSpace=un,n.needsUpdate=!0,n}function wc(i){return{albedo:Ml(i.albedo,i.width,i.height),normal:Ml(i.normal,i.width,i.height),frames:i.frames}}const Sl=(i,e=2048)=>wc(Xa(i,e));class y_{constructor(e,t,n){if(this.style=e,this.seed=t,this.K=2/n,this.witch=Sl([Gi(g_(),__(e),e,"dark")]),this.stones=Sl([0,1,2,3].map(r=>this.stone(r))),this.useWorkers=typeof Worker<"u"&&typeof OffscreenCanvas<"u",this.useWorkers){const r=Math.max(1,Math.min(3,(navigator.hardwareConcurrency||2)-1));try{for(let s=0;s<r;s++){const a=new Worker(new URL(""+new URL("artWorker-DQhHzC9M.js",import.meta.url).href,import.meta.url),{type:"module"}),c={w:a,busy:!1};a.onmessage=l=>{c.busy=!1,c.job=void 0,this.receive(l.data),this.dispatch()},a.onerror=()=>{this.useWorkers=!1,c.job&&this.queue.unshift(c.job),c.busy=!1,c.job=void 0},this.workers.push(c)}}catch{this.useWorkers=!1}}}style;seed;types=new Map;creatures=new Map;queue=[];inFlight=new Set;workers=[];useWorkers;witch;stones;K;version=0;onFloor=()=>{};stone(e){const t=cr(this.seed*3+e),n=5+Math.floor(t()*3),r=7+Math.floor(t()*5),s=new Ut(n+2,r+1);return s.ellipse((n+2)/2,r/2+1,n/2,r/2+.5,x.BODY,{round:this.style.round}),s.ellipse((n+2)/2-1,r/2,n/3,r/3,x.BODY2,{round:this.style.round,onlyOn:new Set([x.BODY]),density:.5,seed:e}),Gi(s,{[x.BODY]:[178,174,162],[x.BODY2]:[140,138,130]},this.style,"dark")}key=e=>e.kind+":"+e.id;ask(e){const t=this.key(e);this.inFlight.has(t)||(this.inFlight.add(t),this.queue.push(e),this.dispatch())}dispatch(){if(this.useWorkers)for(const e of this.workers)e.busy||!this.queue.length||(e.busy=!0,e.job=this.queue.shift(),e.w.postMessage(e.job))}receive(e){if(!e.result){console.warn("art worker failed, drawing on the page:",e.error),this.useWorkers=!1,this.queue.unshift(e.job);return}const t=wc(e.result.px);e.job.kind==="type"?(this.types.set(e.job.id,{atlas:t,layout:e.result.layout}),e.result.floor&&this.onFloor(e.job.id,e.result.floor)):this.creatures.set(e.job.id,{atlas:t,frame:b_}),this.inFlight.delete(this.key(e.job)),this.version++}typeArt(e){const t=this.types.get(e);return t||this.ask({kind:"type",id:e,style:this.style,seed:this.seed,K:this.K}),t}creatureArt(e){const t=this.creatures.get(e);return t||this.ask({kind:"creature",id:e,style:this.style}),t}prefetchType(e){this.types.has(e)||this.typeArt(e)}get pending(){return this.inFlight.size}work(e){if(this.useWorkers)return;const t=performance.now();let n=0;for(;this.queue.length&&(n===0||performance.now()-t<e);){const r=this.queue.shift();this.receive({job:r,result:E_(r,(s,a)=>{const c=document.createElement("canvas");return c.width=s,c.height=a,c})}),n++}}whenIdle(){return new Promise(e=>{const t=()=>{this.work(50),this.pending?setTimeout(t,30):e()};t()})}}const Tt={uAmb:{value:new H},uMoon:{value:new H},uMoonDir:{value:new H(-.45,.75,.5).normalize()},uMoonBeam:{value:new H},uBands:{value:4},uDither:{value:.35},uShafts:{value:.3},uShaftScale:{value:1},uGlowPos:{value:new H},uGlowRgb:{value:new H},uGlowR:{value:8},uGlowPower:{value:1.4},uHazeCentre:{value:new We},uHazeRange:{value:new We(70,200)},uHazeColour:{value:new H},uTime:{value:0}};function w_(i,e,t){const n=(r,s)=>new H(r[0]/255*s,r[1]/255*s,r[2]/255*s);Tt.uAmb.value.copy(n(we(i.ambientHue,.55,1),i.ambient)),Tt.uMoon.value.copy(n(we(i.moonHue,.35,1),i.moon)),Tt.uMoonBeam.value.copy(n(we(i.moonHue,.35,1),i.shafts*.25)),Tt.uBands.value=i.bands,Tt.uDither.value=i.dither*.5,Tt.uShafts.value=i.shafts,Tt.uShaftScale.value=t*2,Tt.uGlowRgb.value.copy(n(we(i.glowHue,i.glowSat,1),1)),Tt.uGlowR.value=e,Tt.uGlowPower.value=i.glowPower,Tt.uHazeColour.value.copy(n(we(i.ambientHue,.45,1),.16))}const _s=`
uniform vec3 uAmb, uMoon, uMoonDir, uMoonBeam, uGlowPos, uGlowRgb;
uniform float uBands, uDither, uShafts, uShaftScale, uGlowR, uGlowPower, uTime;
uniform vec2 uHazeCentre, uHazeRange;
uniform vec3 uHazeColour;

// Fade toward the twilight haze with distance, in a few dithered steps so it stays pixel art.
vec3 haze(vec3 c, vec3 P) {
  float h = smoothstep(uHazeRange.x, uHazeRange.y, length(P.xz - uHazeCentre));
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

// N: world normal; P: world position. Returns the light falling on that pixel.
vec3 nightLight(vec3 N, vec3 P) {
  vec3 l = uAmb + uMoon * lightStep(max(0.0, dot(N, uMoonDir)));
  if (uShafts > 0.0) {
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
`,ri=2,Lt=32,ai=8,T_=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`,A_=`
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
varying vec3 vWorld;
${_s}
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
    vec2 cell = vec2(mod(float(t), ${ai}.0), floor(float(t) / ${ai}.0));
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
  vec3 light = nightLight(vec3(0.0, 1.0, 0.0), vWorld);
  if (uCanopy.x > 0.0) {
    // The canopy's shadow: a dappled layer at canopy height, cast along the moonlight onto the
    // ground, drifting with the wind; thinner where the canopy thins, in the clearings.
    vec2 q = p + uMoonDir.xz / max(0.2, uMoonDir.y) * uCanopy.y + vec2(0.7, 0.3) * uCanopy.w * uTime;
    float leaves = vnoise(q / 2.6) * 0.6 + vnoise(q / 1.1 + 31.0) * 0.4;
    float cover = uCanopy.z * smoothstep(0.25, 0.85, open);
    float edge = mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0) > 0.5 ? 0.03 : -0.03;
    if (leaves + edge < cover) light *= 1.0 - uCanopy.x;
  }
  gl_FragColor = vec4(haze(min(vec3(1.0), c * light * 1.25), vWorld), 1.0);
}
`;class B_{constructor(e,t,n){this.map=e;const r=e.extent,s=r.maxX-r.minX,a=r.maxZ-r.minZ,c=Math.ceil(s*ri/Lt)*Lt,l=Math.ceil(a*ri/Lt)*Lt;this.tilesX=c/Lt,this.tilesZ=l/Lt,this.filled=new Uint8Array(this.tilesX*this.tilesZ);const o=f=>(f.magFilter=f.minFilter=At,f.generateMipmaps=!1,f.colorSpace=un,f.needsUpdate=!0,f);this.texture=o(new Ni(new Uint8Array(c*l*4),c,l)),o(this.tile),this.floors=o(new Ni(new Uint8Array(64*ai*48*4*4),64*ai,192));const u=Array.from({length:32},(f,_)=>new H(...Jn[_]?.floor??[.25,.45,.4])),d=new Ft({vertexShader:T_,fragmentShader:A_,uniforms:{...Tt,uAreas:{value:this.texture},uExtent:{value:new vt(r.minX,r.minZ,c/ri,l/ri)},uPixel:{value:n},uTypeFloor:{value:u},uFloorReady:{value:this.floorReady},uFloors:{value:this.floors},uTile:{value:new We(64,48)},uFloorsSize:{value:new We(64*ai,192)},uSat:{value:t.sat},uFloor:{value:new H(e.dancefloor.x,e.dancefloor.z,e.dancefloor.radius)},uCanopy:{value:new vt}}}),h=new yn(s+400,a+400);h.rotateX(-Math.PI/2),this.mesh=new Wt(h,d),this.mesh.position.set((r.minX+r.maxX)/2,0,(r.minZ+r.maxZ)/2)}map;mesh;texture;tile=new Ni(new Uint8Array(Lt*Lt*4),Lt,Lt);filled;tilesX;tilesZ;initialised=!1;floorReady=new Array(32).fill(0);floors;pendingFloors=[];setCanopyShadow(e,t,n,r){this.mesh.material.uniforms.uCanopy.value.set(e,t,n,r)}setFloor(e,t){this.pendingFloors.push([e,t])}placeFloors(e){for(const[t,n]of this.pendingFloors){const r=this.mesh.material,s=r.uniforms.uTile.value;if(n.w!==s.x||n.h!==s.y)continue;const a=new Ni(n.albedo,n.w,n.h);a.needsUpdate=!0,e.copyTextureToTexture(a,this.floors,null,new We(t%ai*n.w,Math.floor(t/ai)*n.h)),a.dispose(),this.floorReady[t]=1}this.pendingFloors=[]}fill(e,t,n,r,s){this.initialised||(e.initTexture(this.texture),e.initTexture(this.floors),this.initialised=!0),this.pendingFloors.length&&this.placeFloors(e);const a=this.map.extent,c=Lt/ri,l=(t-a.minX)/c,o=(n-a.minZ)/c,u=Math.ceil(r/c),d=[];for(let _=Math.max(0,Math.floor(o)-u);_<=Math.min(this.tilesZ-1,Math.floor(o)+u);_++)for(let g=Math.max(0,Math.floor(l)-u);g<=Math.min(this.tilesX-1,Math.floor(l)+u);g++)this.filled[_*this.tilesX+g]||d.push([g,_,(g+.5-l)**2+(_+.5-o)**2]);d.sort((_,g)=>_[2]-g[2]);const h=performance.now();let f=0;for(const[_,g]of d){if(f>0&&performance.now()-h>s)break;this.fillTile(e,_,g),f++}return d.length-f}fillTile(e,t,n){const r=this.map.extent,s=this.tile.image.data;for(let a=0;a<Lt;a++)for(let c=0;c<Lt;c++){const l=r.minX+(t*Lt+c+.5)/ri,o=r.minZ+(n*Lt+a+.5)/ri,u=this.map.areaAt(l,o),d=(a*Lt+c)*4;s[d]=u.type,s[d+1]=Math.round(u.openness*255),s[d+2]=0,s[d+3]=255}this.tile.needsUpdate=!0,e.copyTextureToTexture(this.tile,this.texture,null,new We(t*Lt,n*Lt)),this.filled[n*this.tilesX+t]=1}dispose(){this.texture.dispose(),this.tile.dispose(),this.mesh.geometry.dispose(),this.mesh.material.dispose()}}const R_="varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",C_=`
uniform sampler2D uScene; uniform float uThreshold; varying vec2 vUv;
void main() {
  vec3 c = texture2D(uScene, vUv).rgb;
  float l = max(c.r, max(c.g, c.b));
  gl_FragColor = vec4(c * smoothstep(uThreshold, uThreshold + 0.25, l), 1.0);
}`,L_=`
uniform sampler2D uSrc; uniform vec2 uStep; varying vec2 vUv;
void main() {
  vec3 c = texture2D(uSrc, vUv).rgb * 0.227;
  c += (texture2D(uSrc, vUv + uStep * 1.38).rgb + texture2D(uSrc, vUv - uStep * 1.38).rgb) * 0.316;
  c += (texture2D(uSrc, vUv + uStep * 3.23).rgb + texture2D(uSrc, vUv - uStep * 3.23).rgb) * 0.070;
  gl_FragColor = vec4(c, 1.0);
}`,D_=`
uniform sampler2D uScene, uBloom; uniform vec2 uLow; uniform float uBloomStrength; varying vec2 vUv;
void main() {
  vec2 p = (floor(vUv * uLow) + 0.5) / uLow;
  vec3 c = texture2D(uScene, p).rgb + texture2D(uBloom, vUv).rgb * uBloomStrength;
  gl_FragColor = vec4(min(c, vec3(1.0)), 1.0);
}`,P_=`
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
}`;function rr(i,e,t,n=!1){const r=new sn(Math.max(1,i),Math.max(1,e),{minFilter:t,magFilter:t,depthBuffer:n,generateMipmaps:!1});return r.texture.colorSpace=un,r}class I_{constructor(e,t){this.renderer=e,this.tuning=t,this.scene=rr(1,1,bt,!0);const n=(r,s)=>new Ft({vertexShader:R_,fragmentShader:r,uniforms:s,depthTest:!1,depthWrite:!1});this.mats={bright:n(C_,{uScene:{value:null},uThreshold:{value:.6}}),blur:n(L_,{uSrc:{value:null},uStep:{value:new We}}),composite:n(D_,{uScene:{value:null},uBloom:{value:null},uLow:{value:new We},uBloomStrength:{value:0}}),tilt:n(P_,{uSrc:{value:null},uTexel:{value:new We},uDir:{value:new We},uStrength:{value:0},uBand:{value:.4},uCentre:{value:.5}})},this.quad=new Wt(new yn(2,2),this.mats.composite),this.quad.frustumCulled=!1}renderer;tuning;scene;bright=rr(1,1,bt);bloomB=rr(1,1,bt);a=rr(1,1,bt);b=rr(1,1,bt);quad;cam=new lo(-1,1,1,-1,0,1);mats;low=new We(1,1);out=new We(1,1);get fullResolution(){return this.tuning.tiltShift.on&&this.tuning.tiltShift.where==="after"}resize(e,t,n,r){this.low.set(e,t),this.out.set(n,r),this.scene.setSize(e,t);const s=Math.max(1,Math.round(e/2)),a=Math.max(1,Math.round(t/2));this.bright.setSize(s,a),this.bloomB.setSize(s,a);const c=this.fullResolution?n:e,l=this.fullResolution?r:t;this.a.setSize(c,l),this.b.setSize(c,l)}pass(e,t,n){const r=this.mats[e];n(r.uniforms),this.quad.material=r,this.renderer.setRenderTarget(t),this.renderer.render(this.quad,this.cam)}render(e,t){const n=this.renderer,r=this.tuning;n.setRenderTarget(this.scene),n.render(e,t);const s=r.bloom.on&&r.bloom.strength>0;if(s){const d=this.bright.width,h=this.bright.height;this.pass("bright",this.bright,f=>{f.uScene.value=this.scene.texture,f.uThreshold.value=r.bloom.threshold});for(let f=0;f<2;f++)this.pass("blur",this.bloomB,_=>{_.uSrc.value=this.bright.texture,_.uStep.value.set(1/d,0)}),this.pass("blur",this.bright,_=>{_.uSrc.value=this.bloomB.texture,_.uStep.value.set(0,1/h)})}const a=r.tiltShift.on&&r.tiltShift.strength>0;if(this.pass("composite",a?this.a:null,d=>{d.uScene.value=this.scene.texture,d.uBloom.value=this.bright.texture,d.uLow.value.copy(this.low),d.uBloomStrength.value=s?r.bloom.strength:0}),!a)return;const c=this.a.width,l=this.a.height,o=this.fullResolution?this.out.y/this.low.y:1,u=d=>{d.uTexel.value.set(1/c,1/l),d.uStrength.value=r.tiltShift.strength*o,d.uBand.value=r.tiltShift.band,d.uCentre.value=1-r.tiltShift.centre};this.pass("tilt",this.b,d=>{u(d),d.uSrc.value=this.a.texture,d.uDir.value.set(1,0)}),this.pass("tilt",null,d=>{u(d),d.uSrc.value=this.b.texture,d.uDir.value.set(0,1)})}}const N_=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,U_=`
uniform float uStrength, uWind, uPixel;
varying vec3 vWorld;
${_s}
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
  float a = uStrength * (smoothstep(0.45, 0.75, n) + far * 0.6);
  // Two steps of density, as ordered dither: pixel art, no smooth alpha.
  float level = a > 0.5 ? 0.5 : a > 0.2 ? 0.25 : 0.0;
  vec2 g = mod(floor(gl_FragCoord.xy), 2.0);
  bool on = level >= 0.5 ? (g.x == g.y) : level > 0.0 ? (g.x == 0.0 && g.y == 0.0) : false;
  if (!on) discard;
  gl_FragColor = vec4(mix(uHazeColour * 2.2, uMoon * 0.9 + uAmb, 0.4), 1.0);
}`;class F_{constructor(e,t,n,r){this.height=t,this.mat=new Ft({vertexShader:N_,fragmentShader:U_,uniforms:{...Tt,uStrength:{value:e},uWind:{value:n},uPixel:{value:r}},depthWrite:!1}),this.mesh=new Wt(new yn(700,700).rotateX(-Math.PI/2),this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=2}height;mesh;mat;follow(e,t){this.mesh.position.set(e,this.height,t-150)}}const O_=`
attribute vec4 iShadow; // x, z, width, depth (metres)
varying vec2 vLocal;
varying vec3 vWorld;
void main() {
  vLocal = position.xz * 2.0;
  vec3 w = vec3(iShadow.x + position.x * iShadow.z, 0.03, iShadow.y + position.z * iShadow.w);
  vWorld = w;
  gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
}`,z_=`
uniform float uStrength;
varying vec2 vLocal;
varying vec3 vWorld;
${_s}
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
}`;class k_{mesh;geo=new uc;attr;capacity=0;constructor(e){const t=new yn(1,1).rotateX(-Math.PI/2);this.geo.index=t.index,this.geo.setAttribute("position",t.getAttribute("position")),this.attr=this.grow(1024);const n=new Ft({vertexShader:O_,fragmentShader:z_,uniforms:{...Tt,uStrength:{value:e}},depthWrite:!1});this.mesh=new Wt(this.geo,n),this.mesh.frustumCulled=!1,this.mesh.renderOrder=1}grow(e){return this.capacity=Math.max(e,this.capacity*2),this.attr=new rc(new Float32Array(this.capacity*4),4),this.attr.setUsage($l),this.geo.setAttribute("iShadow",this.attr),this.attr}set(e){e.length>this.capacity&&this.grow(e.length);const t=this.attr.array;e.forEach((n,r)=>{t[r*4]=n.x,t[r*4+1]=n.z,t[r*4+2]=n.w,t[r*4+3]=n.d}),this.attr.needsUpdate=!0,this.geo.instanceCount=e.length,this.mesh.visible=e.length>0}}const Pi={uRight:{value:new H(1,0,0)},uUp:{value:new H(0,1,0)},uFacing:{value:new H(0,0,1)},uTopFade:{value:0}},G_=`
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
`,W_=`
uniform sampler2D uAlbedo, uNormal;
uniform vec3 uRight, uUp, uFacing;
uniform float uTopFade, uUnlit;
varying vec2 vUv;
varying vec3 vWorld;
varying vec2 vFlags;
${_s}
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
`;class qr{constructor(e,t,n={}){this.atlas=e,this.metresPerPixel=t;const r=new yn(1,1);r.translate(0,.5,0),this.geo=new uc,this.geo.index=r.index,this.geo.setAttribute("position",r.getAttribute("position")),this.geo.setAttribute("uv",r.getAttribute("uv")),this.pos=this.size=this.uvs=this.flags=void 0,this.grow(64);const s=new Ft({vertexShader:G_,fragmentShader:W_,uniforms:{...Tt,...Pi,uAlbedo:{value:e.albedo},uNormal:{value:e.normal},uUnlit:{value:n.unlit?1:0}},depthTest:!n.onTop,depthWrite:!n.onTop});this.mesh=new Wt(this.geo,s),this.mesh.frustumCulled=!1,n.onTop&&(this.mesh.renderOrder=10)}atlas;metresPerPixel;mesh;geo;pos;size;uvs;flags;capacity=0;count=0;grow(e){const t=Math.max(e,this.capacity*2),n=(r,s)=>{const a=new rc(new Float32Array(t*r),r);return a.setUsage($l),s&&a.array.set(s.array),a};this.pos=n(3,this.pos),this.size=n(2,this.size),this.uvs=n(4,this.uvs),this.flags=n(2,this.flags),this.geo.setAttribute("iPos",this.pos),this.geo.setAttribute("iSize",this.size),this.geo.setAttribute("iUv",this.uvs),this.geo.setAttribute("iFlags",this.flags),this.capacity=t}set(e){e.length>this.capacity&&this.grow(e.length);const t=this.pos.array,n=this.size.array,r=this.uvs.array,s=this.flags.array;e.forEach((a,c)=>{t[c*3]=a.x,t[c*3+1]=a.y,t[c*3+2]=a.z,n[c*2]=a.frame.w*this.metresPerPixel,n[c*2+1]=a.frame.h*this.metresPerPixel,r.set(a.frame.uv,c*4),s[c*2]=a.flip?1:0,s[c*2+1]=a.top?1:0});for(const a of[this.pos,this.size,this.uvs,this.flags])a.needsUpdate=!0;this.count=e.length,this.geo.instanceCount=e.length,this.mesh.visible=e.length>0}dispose(){this.geo.dispose(),this.mesh.material.dispose(),this.atlas.albedo.dispose(),this.atlas.normal.dispose()}}class H_{constructor(e,t,n){this.canvas=e,this.game=t,this.style=n;const r=t.tuning;this.renderer=new Wg({canvas:e,antialias:!1,powerPreference:"high-performance",preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.info.autoReset=!1,this.renderer.outputColorSpace=fr,this.mpp=1/(r.artPixelsPerMetre*(2/r.pixelSize)),this.camera=new nn(r.camera.fov,1,1,900),this.post=new I_(this.renderer,r),this.scene.background=new at(723478),w_(n,r.glowReach,this.mpp),this.assets=new y_(n,t.seed,r.pixelSize),this.ground=new B_(t.map,n,this.mpp),this.assets.onFloor=(o,u)=>this.ground.setFloor(o,u);const s=r.canopyShadow;this.ground.setCanopyShadow(s.on?s.strength:0,s.height,s.cover,s.wind),this.shadows=new k_(r.shadows.strength),this.shadows.mesh.visible=r.shadows.on,this.scene.add(this.shadows.mesh),r.mist.on&&r.mist.strength>0&&(this.mist=new F_(r.mist.strength,r.mist.height,r.mist.wind,this.mpp),this.scene.add(this.mist.mesh)),Tt.uHazeRange.value.set(r.haze.near,r.haze.far),this.scene.add(this.ground.mesh),this.witchBatch=new qr(this.assets.witch,this.mpp,{unlit:!0,onTop:!0}),this.scene.add(this.witchBatch.mesh),this.stoneBatch=new qr(this.assets.stones,this.mpp),this.scene.add(this.stoneBatch.mesh);const a=t.map.dancefloor,c=[];for(let o=0;o<9;o++){const u=o/9*Math.PI*2+.3;c.push({x:a.x+Math.cos(u)*a.radius,y:0,z:a.z+Math.sin(u)*a.radius,frame:this.assets.stones.frames[o%4],flip:o%2===0})}this.stoneBatch.set(c);const l=new Ft({transparent:!1,depthWrite:!1,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"varying vec2 vUv; void main(){ vec2 p = vUv * 2.0 - 1.0; if (dot(p, p) > 1.0 || mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0) > 0.5) discard; gl_FragColor = vec4(0.02, 0.02, 0.05, 1.0); }"});this.shadow=new Wt(new yn(1.4,.7).rotateX(-Math.PI/2),l),this.shadow.renderOrder=1,this.scene.add(this.shadow)}canvas;game;style;renderer;scene=new yd;camera;ground;assets;typeBatches=new Map;creatureBatches=new Map;witchBatch;stoneBatch;shadow;mpp;lastBuild={x:1/0,z:1/0,version:-1,up:0};prefetch=!1;post;shadows;shadowList=[];mist=null;width=1;height=1;stats={trees:0,bushes:0,creatures:0,batches:0,drawCalls:0,pendingArt:0,pendingGround:0};resize(e,t){const n=this.game.tuning.pixelSize;this.width=Math.max(1,Math.ceil(e/n)),this.height=Math.max(1,Math.ceil(t/n));const r=this.post.fullResolution?n:1;this.renderer.setSize(this.width*r,this.height*r,!1),this.post.resize(this.width,this.height,this.width*r,this.height*r),this.canvas.style.width=this.width*n+"px",this.canvas.style.height=this.height*n+"px",this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix()}async prepare(){this.refresh(!0),this.drawCreatures(),this.ground.fill(this.renderer,this.game.witch.x,this.game.witch.z,50,1/0),await this.assets.whenIdle(),this.prefetch=!0,this.refresh(!0)}batchFor(e,t,n){let r=e.get(t);return r||(r=n(),r&&(e.set(t,r),this.scene.add(r.mesh))),r}refresh(e=!1){const t=this.game,n=t.camera,r=t.tuning,s=Er(t.witch),a=tn(r.drawRadius,r.drawRadiusTreetop,s),c=r.detailRadius,l=n.tx,o=n.tz-a*tn(.25,.55,s);if(!e&&Math.hypot(l-this.lastBuild.x,o-this.lastBuild.z)<10&&this.assets.version===this.lastBuild.version&&Math.abs(s-this.lastBuild.up)<.25)return;this.lastBuild={x:l,z:o,version:this.assets.version,up:s};const u=L=>Math.abs(L.x-n.tx)<c&&Math.abs(L.z-n.tz)<c,d=[],h=Tt.uMoonDir.value,f=-h.x/Math.max(.2,h.y),_=-h.z/Math.max(.2,h.y),g=new Map,p=(L,N)=>{let z=g.get(L);z||g.set(L,z=[]),z.push(N)},m=t.map.areaSize,v=a+m*1.5;if(this.prefetch)for(let L=Math.floor((o-v)/m);L<=Math.floor((o+v)/m);L++)for(let N=Math.floor((l-v)/m);N<=Math.floor((l+v)/m);N++)this.assets.prefetchType(t.map.typeOf(N,L));const E=t.forest.treesNear(l,o,a),M=t.forest.bushesNear(n.tx,n.tz,c),y=t.forest.wallsNear(n.tx,n.tz,c),T=t.forest.setPiecesNear(n.tx,n.tz,c);let C=0,b=0;for(const L of E){const N=this.assets.typeArt(L.type);if(!N||!N.layout.big.length)continue;const z=N.atlas.frames,F=N.layout.big[L.variant%N.layout.big.length],D=u(L);if((D||F.top===null)&&p(L.type,{x:L.x,y:0,z:L.z,frame:z[F.bot],flip:L.flip}),F.top!==null&&p(L.type,{x:L.x,y:0,z:L.z,frame:z[F.top],flip:L.flip,top:!0}),D){const O=z[F.top??F.bot],Y=O.w*this.mpp,K=O.h*this.mpp*(F.top===null?.2:.6);d.push({x:L.x+f*K,z:L.z+_*K,w:Y*.8,d:Y*.45})}C++}const A=(L,N)=>{for(const z of L){const F=this.assets.typeArt(z.type);if(!F)continue;const D=N(F.layout);if(!D.length)continue;const O=F.atlas.frames[D[z.variant%D.length]];p(z.type,{x:z.x,y:0,z:z.z,frame:O,flip:z.flip}),d.push({x:z.x,z:z.z,w:O.w*this.mpp*.8,d:O.w*this.mpp*.3}),b++}};A(M,L=>L.small),A(y,L=>L.walls),A(T,L=>L.set===null?[]:[L.set]);for(const[L,N]of this.typeBatches)g.has(L)||N.set([]);for(const[L,N]of g)this.batchFor(this.typeBatches,L,()=>{const F=this.assets.typeArt(L);return F&&new qr(F.atlas,this.mpp)})?.set(N);this.stats.trees=C,this.stats.bushes=b,this.shadowList=d}drawCreatures(){const e=this.game,t=e.camera,n=e.tuning.detailRadius,r=new Map,s=[];let a=0;for(const c of e.creatures){if(Math.abs(c.x-t.tx)>n||Math.abs(c.z-t.tz)>n)continue;const l=this.assets.creatureArt(c.species);if(!l)continue;const o=l.atlas.frames[l.frame(c.level,c.moving?Math.floor(c.walk)%2:0)];let u=r.get(c.species);u||r.set(c.species,u=[]),u.push({x:c.x,y:0,z:c.z,frame:o,flip:c.facing<0}),s.push({x:c.x,z:c.z,w:o.w*this.mpp*.7,d:o.w*this.mpp*.25}),a++}for(const[c,l]of this.creatureBatches)r.has(c)||l.set([]);for(const[c,l]of r)this.batchFor(this.creatureBatches,c,()=>{const u=this.assets.creatureArt(c);return u&&new qr(u.atlas,this.mpp)})?.set(l);this.stats.creatures=a,this.game.tuning.shadows.on&&this.shadows.set(this.shadowList.concat(s))}render(e){const t=this.game,n=t.tuning,r=vu(t),s=r.angle*Math.PI/180,a=2*r.distance*Math.tan(n.camera.fov*Math.PI/360)/this.height,c=new H(0,Math.cos(s),-Math.sin(s)),l=new H(r.tx,r.ty,r.tz),o=l.dot(c),u=l.x;l.addScaledVector(c,Math.round(o/a)*a-o),l.x+=Math.round(u/a)*a-u;const d=new H(0,Math.sin(s),Math.cos(s)).multiplyScalar(r.distance);this.camera.position.copy(l).add(d),this.camera.up.set(0,1,0),this.camera.lookAt(l);const h=n.spriteTilt;Pi.uUp.value.set(0,1,0).lerp(c,h).normalize(),Pi.uFacing.value.crossVectors(Pi.uRight.value,Pi.uUp.value).normalize(),Pi.uTopFade.value=Er(t.witch);const f=t.witch,_=$a(f,n);Tt.uGlowPos.value.set(f.x,_+n.glowHeight,f.z),Tt.uHazeCentre.value.set(f.x,f.z),Tt.uTime.value=e,this.mist?.follow(r.tx,r.tz);const g=Math.sin(e*2.4)*.12;this.witchBatch.set([{x:f.x,y:_+g-.4,z:f.z,frame:this.assets.witch.frames[0],flip:f.facing<0}]),this.shadow.position.set(f.x,.03,f.z),this.shadow.scale.setScalar(1-.5*Er(f)),this.refresh(),this.drawCreatures(),this.assets.work(6);const p=tn(n.drawRadius,n.drawRadiusTreetop,Er(f))*.7;this.stats.pendingGround=this.ground.fill(this.renderer,r.tx,r.tz-p*.5,p,3),this.stats.pendingArt=this.assets.pending,this.renderer.info.reset(),this.post.render(this.scene,this.camera),this.stats.drawCalls=this.renderer.info.render.calls,this.stats.batches=this.typeBatches.size+this.creatureBatches.size}}const V_="The art style: knobs from the Witch Art Lab. Paste a style saved in the Lab here (its whole saved JSON, or just its style object). Any knob left out follows the Lab's current default, so an empty style means the Lab's default look, and stays up to date as the art changes.",X_="Lab default",Y_={},q_={_readme:V_,name:X_,style:Y_};function K_(i=q_){const e=i??{},t=e.style&&typeof e.style=="object"?e.style:e,n=m_();for(const[r,s]of Object.entries(t))r in n&&(n[r]=s);return n}function Z_(i,e){const t=i.querySelector("#stick"),n=t.querySelector(".knob"),r=56;let s=null,a=0,c=0;const l=()=>i.classList.add("touch"),o=i.querySelector("#stick-zone");o.addEventListener("pointerdown",h=>{if(!(h.pointerType==="mouse"||s!==null)){l(),s=h.pointerId,a=h.clientX,c=h.clientY,t.style.left=a+"px",t.style.top=c+"px",t.classList.add("on");try{o.setPointerCapture(h.pointerId)}catch{}h.preventDefault()}}),o.addEventListener("pointermove",h=>{if(h.pointerId!==s)return;let f=h.clientX-a,_=h.clientY-c;const g=Math.hypot(f,_);g>r&&(f*=r/g,_*=r/g),n.style.transform=`translate(${f}px, ${_}px)`;const p=Math.min(1,g/r),m=.15,v=p<m?0:(p-m)/(1-m)/Math.max(1e-6,p);e.x=f/r*v,e.y=_/r*v});const u=h=>{h.pointerId===s&&(s=null,e.x=0,e.y=0,n.style.transform="",t.classList.remove("on"))};o.addEventListener("pointerup",u),o.addEventListener("pointercancel",u);const d=(h,f)=>{const _=i.querySelector(h);_.addEventListener("pointerdown",g=>{g.preventDefault(),g.stopPropagation(),f(),_.classList.add("down")}),_.addEventListener("pointerup",()=>_.classList.remove("down")),_.addEventListener("pointerleave",()=>_.classList.remove("down"))};d("#rise",()=>e.toggle=!0),d("#zoom-in",()=>e.zoom-=1),d("#zoom-out",()=>e.zoom+=1),window.addEventListener("touchstart",h=>{l(),h.touches.length===3&&(e.debug=!0)},{passive:!0})}const zn=new URLSearchParams(location.search);let ci=tu(zn.get("seed"));ci===null&&(ci=Math.floor(Math.random()*1e6),zn.set("seed",String(ci)),history.replaceState(null,"","?"+zn.toString()+location.hash));const Fn={...xi,bloom:{...xi.bloom},tiltShift:{...xi.tiltShift},shadows:{...xi.shadows},canopyShadow:{...xi.canopyShadow},mist:{...xi.mist}};zn.get("shadows")==="off"&&(Fn.shadows.on=!1);zn.get("canopy")==="off"&&(Fn.canopyShadow.on=!1);zn.get("mist")==="off"&&(Fn.mist.on=!1);const Kr=zn.get("tilt");Kr==="off"?Fn.tiltShift.on=!1:(Kr==="before"||Kr==="after")&&(Fn.tiltShift.on=!0,Fn.tiltShift.where=Kr);zn.get("bloom")==="off"&&(Fn.bloom.on=!1);const Pn=_u(ci,Fn),$_=document.getElementById("game"),gr=new H_($_,Pn,{...K_(),pixel:Fn.pixelSize}),xs=new wh;Z_(document.body,xs.touch);const J_=document.getElementById("seed");J_.innerHTML=`seed <a href="?seed=${ci}">${ci}</a>`;const Ya=document.getElementById("debug"),co=document.getElementById("start");let or=zn.has("debug");Ya.classList.toggle("on",or);const Tc=()=>gr.resize(window.innerWidth,window.innerHeight);window.addEventListener("resize",Tc);Tc();let vs=!1;requestAnimationFrame(()=>setTimeout(async()=>{await gr.prepare(),vs=!0,co.classList.remove("loading")},0));let bl=null;function Ac(){if(!vs||!Pn.clock.paused)return!1;try{bl??=new AudioContext,bl.resume()}catch{}return Pn.clock.paused=!1,co.style.display="none",xs.clearPresses(),!0}xs.onAny=Ac;co.addEventListener("pointerdown",i=>{i.preventDefault(),Ac()});document.addEventListener("visibilitychange",()=>{document.hidden&&(is=0)});let is=0,El=60,ta=0,Zr=0;function Bc(i){requestAnimationFrame(Bc);const e=is?(i-is)/1e3:0;is=i,ta++,Zr+=e,Zr>=.5&&(El=ta/Zr,ta=0,Zr=0);const t=xs.read();if(t.debug&&(or=!or,Ya.classList.toggle("on",or)),xu(Pn,t,e),!!vs&&(gr.render(i/1e3),or)){const n=Pn.witch,r=gr.stats;Ya.textContent=[`fps    ${El.toFixed(0)}`,`seed   ${ci}`,`area   ${Ll(Pn)}`,`mode   ${n.mode}`,`at     ${n.x.toFixed(0)}, ${n.z.toFixed(0)} m   zoom ${Pn.camera.zoomStep}`,`trees  ${r.trees}  bushes ${r.bushes}  creatures ${r.creatures}`,`draws  ${r.drawCalls}  art queued ${r.pendingArt}  ground tiles ${r.pendingGround}`].join(`
`)}}requestAnimationFrame(Bc);window.witch={game:Pn,view:gr,areaUnderWitch:()=>Ll(Pn),get ready(){return vs}};
