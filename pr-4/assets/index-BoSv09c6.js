(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();function or(i){let e=i>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function St(i,e,t){let n=Math.imul(i|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967296}const Rn=(i,e,t)=>i+(e-i)*t,Oi=(i,e,t)=>Math.min(t,Math.max(e,i)),mr=i=>{const e=Oi(i,0,1);return e*e*(3-2*e)};function Dc(i,e,t,n){const r=Math.max(1,i.camera.zoomSteps),s=Oi(Math.round(i.camera.startZoom),0,r-1),a=r>1?s/(r-1):0;return{zoomStep:s,zoom:a,tx:e,ty:t,tz:n}}function Pc(i,e,t,n,r){const s=Math.max(1,r.camera.zoomSteps),a=Oi(i.zoomStep+Math.sign(e),0,s-1),c=s>1?a/(s-1):0,l=1-Math.exp(-8*n),o=1-Math.exp(-r.camera.follow*n);return{zoomStep:a,zoom:i.zoom+(c-i.zoom)*l,tx:i.tx+(t.x-i.tx)*o,ty:i.ty+(t.y-i.ty)*o,tz:i.tz+(t.z-i.tz)*o}}function Ic(i,e,t){const n=t.camera.ground,r=t.camera.treetop,s=mr(e),a=Rn(Rn(n.angleIn,n.angleOut,i.zoom),Rn(r.angleIn,r.angleOut,i.zoom),s),c=Rn(Rn(n.distanceIn,n.distanceOut,i.zoom),Rn(r.distanceIn,r.distanceOut,i.zoom),s),l=a*Math.PI/180;return{angle:a,distance:c,x:i.tx,y:i.ty+Math.sin(l)*c,z:i.tz+Math.cos(l)*c,tx:i.tx,ty:i.ty,tz:i.tz}}const Nc=.1,Uc=()=>({time:0,paused:!0});function Fc(i,e){if(i.paused||!(e>0))return 0;const t=Math.min(Nc,e);return i.time+=t,t}const Oc={moor:{treeDensity:.4},"fern-forest":{treeDensity:1},"muddy-forest":{treeDensity:1},"stone-shrine":{treeDensity:.3},"tangly-forest":{treeDensity:1},"wispy-forest":{treeDensity:1},"hazel-forest":{treeDensity:1},garden:{treeDensity:.6},"twiggy-forest":{treeDensity:1},ancient:{treeDensity:.9},norway:{treeDensity:1},"alder-forest":{treeDensity:.9},meadow:{treeDensity:.2},"old-oaks":{treeDensity:.9},"berry-thicket":{treeDensity:1},wetland:{treeDensity:.6},stream:{treeDensity:.7},"rocky-slope":{treeDensity:.6},bog:{treeDensity:.5},deadwood:{treeDensity:.8},"cave-mouth":{treeDensity:.6},grassland:{treeDensity:.2},"beaver-pond":{treeDensity:.8},"log-pile":{treeDensity:.7},heath:{treeDensity:.4},"old-pinewood":{treeDensity:1},ravine:{treeDensity:.6},"bluebell-glade":{treeDensity:.8},"holly-thicket":{treeDensity:1},"honeysuckle-tangle":{treeDensity:1}},kc={types:Oc};function bl(i,e){if(typeof document<"u"){const t=document.createElement("canvas");return t.width=i,t.height=e,t}return new OffscreenCanvas(i,e)}function Yi(i){let e=i>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}const me=(i,e,t)=>e+(t-e)*i(),El=(i,e)=>e[Math.floor(i()*e.length)];function Ot(i,e,t){let n=Math.imul(i|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967296}function Yn(i,e,t){const n=Math.floor(i),r=Math.floor(e),s=i-n,a=e-r,c=s*s*(3-2*s),l=a*a*(3-2*a),o=Ot(n,r,t),h=Ot(n+1,r,t),d=Ot(n,r+1,t),u=Ot(n+1,r+1,t);return o+(h-o)*c+(d-o)*l+(o-h-d+u)*c*l}function we(i,e,t){i=(i%1+1)%1,e=Math.max(0,Math.min(1,e)),t=Math.max(0,Math.min(1,t));const n=Math.floor(i*6),r=i*6-n,s=t*(1-e),a=t*(1-r*e),c=t*(1-(1-r)*e),[l,o,h]=[[t,c,s],[a,t,s],[s,t,c],[s,a,t],[c,s,t],[t,s,a]][n%6];return[Math.round(l*255),Math.round(o*255),Math.round(h*255)]}const x={BODY:1,BELLY:2,ACCENT:3,EYE:4,GLINT:5,TRUNK:6,LEAF:7,LEAF2:8,CLOTH:9,SKIN:10,HAIR:11,BROOM:12,STRAW:13,BODY2:14,BARK2:15,FLOWER:16,PUPIL:17,MAGIC:18,BARKD:19,LINE:20,IRIS:21,MAGIC2:22,NOSE:23,EAR:24,BODY3:25,LEAF3:26,BARKL:27},zc=new Set([x.GLINT,x.FLOWER,x.MAGIC,x.MAGIC2]);function vo(i,e=!0,t=8){const n=i.length,r=[];if(n<3)return i.slice();const s=c=>e?i[(c+n)%n]:i[Math.max(0,Math.min(n-1,c))],a=e?n:n-1;for(let c=0;c<a;c++){const l=s(c-1),o=s(c),h=s(c+1),d=s(c+2),u=Math.max(2,Math.ceil(Math.hypot(h[0]-o[0],h[1]-o[1])/1.5),t);for(let f=0;f<u;f++){const g=f/u,_=g*g,p=_*g;r.push([0,1].map(m=>.5*(2*o[m]+(-l[m]+h[m])*g+(2*l[m]-5*o[m]+4*h[m]-d[m])*_+(-l[m]+3*o[m]-3*h[m]+d[m])*p)))}}return e||r.push(i[n-1]),r}function ea(i,{cap:e=1,capEnd:t=e}={}){const n=[],r=[],s=i.length;for(let l=0;l<s;l++){const o=i[Math.max(0,l-1)],h=i[Math.min(s-1,l+1)];let d=h[0]-o[0],u=h[1]-o[1];const f=Math.hypot(d,u)||1;d/=f,u/=f;const g=i[l][2]/2;n.push([i[l][0]-u*g,i[l][1]+d*g]),r.push([i[l][0]+u*g,i[l][1]-d*g])}const a=(l,o,h,d)=>{let u=l[0]-o[0],f=l[1]-o[1];const g=Math.hypot(u,f)||1;return[l[0]+u/g*h/2*d,l[1]+f/g*h/2*d]};return[...n,a(i[s-1],i[s-2],i[s-1][2],t),...r.reverse(),a(i[0],i[1],i[0][2],e)]}const Mo=([i,e],[t,n],r)=>{const s=Math.cos(r),a=Math.sin(r);return[t+(i-t)*s-(e-n)*a,n+(i-t)*a+(e-n)*s]},R=(i,e)=>[i[0]+e[0],i[1]+e[1]],Ze=(i,e,t)=>[i[0]+(e[0]-i[0])*t,i[1]+(e[1]-i[1])*t];function gt(i,e,t,n,r,s=1){const a=[];for(let c=0;c<i.length;c++){if(a.push(i[c]),c<e||c>=t)continue;const l=i[c],o=i[(c+1)%i.length];let h=o[0]-l[0],d=o[1]-l[1];const u=Math.hypot(h,d)||1,f=d/u*s,g=-h/u*s;for(let _=1;_<=n;_++){const p=(_-.5)/n,m=Ze(l,o,p),v=[m[0]+f*r-h/u*r*.5,m[1]+g*r-d/u*r*.5];a.push(Ze(l,o,p-.45/n),v,Ze(l,o,p+.35/n))}}return a}function So(i,e,t){const n=new Uint8Array(i*e);let r=1/0,s=-1/0;for(const a of t)r=Math.min(r,a[1]),s=Math.max(s,a[1]);for(let a=Math.max(0,Math.floor(r));a<=Math.min(e-1,Math.ceil(s));a++){const c=a+.5,l=[];for(let o=0,h=t.length-1;o<t.length;h=o++){const[d,u]=t[o],[f,g]=t[h];u>c!=g>c&&l.push(d+(c-u)/(g-u)*(f-d))}l.sort((o,h)=>o-h);for(let o=0;o+1<l.length;o+=2)for(let h=Math.max(0,Math.ceil(l[o]-.5));h<=Math.min(i-1,Math.floor(l[o+1]-.5));h++)n[a*i+h]=1}return n}function Gc(i,e,t){const r=new Float32Array(i*e),s=new Float32Array(i*e);for(let l=0;l<i*e;l++)t[l]&&(r[l]=1e4,s[l]=1e4);const a=l=>r[l]*r[l]+s[l]*s[l],c=(l,o,h,d,u)=>{const f=o+d,g=h+u;let _,p;if(f<0||g<0||f>=i||g>=e)_=d,p=u;else{const m=g*i+f;_=r[m]+d,p=s[m]+u}_*_+p*p<a(l)&&(r[l]=_,s[l]=p)};for(let l=0;l<e;l++){for(let o=0;o<i;o++){const h=l*i+o;t[h]&&(c(h,o,l,-1,0),c(h,o,l,0,-1),c(h,o,l,-1,-1),c(h,o,l,1,-1))}for(let o=i-1;o>=0;o--){const h=l*i+o;t[h]&&c(h,o,l,1,0)}}for(let l=e-1;l>=0;l--){for(let o=i-1;o>=0;o--){const h=l*i+o;t[h]&&(c(h,o,l,1,0),c(h,o,l,0,1),c(h,o,l,1,1),c(h,o,l,-1,1))}for(let o=0;o<i;o++){const h=l*i+o;t[h]&&c(h,o,l,-1,0)}}return{vx:r,vy:s}}class Nt{constructor(e,t,n=1){this.sx=n,this.w=Math.round(e*n),this.h=t|0,this.m=new Uint8Array(this.w*this.h),this.n=new Float32Array(this.w*this.h*3),this.g=new Uint8Array(this.w*this.h)}inb(e,t){return e>=0&&t>=0&&e<this.w&&t<this.h}get(e,t){return e|=0,t|=0,this.inb(e,t)?this.m[t*this.w+e]:0}put(e,t,n,r=0,s=0,a=1){this.px(e*this.sx,t,n,r,s,a)}px(e,t,n,r=0,s=0,a=1){if(e=Math.floor(e),t=Math.floor(t),!this.inb(e,t))return;const c=t*this.w+e;this.m[c]=n,this.n[c*3]=r,this.n[c*3+1]=s,this.n[c*3+2]=a}recolour(e,t,n){e=Math.floor(e),t=Math.floor(t),this.inb(e,t)&&this.m[t*this.w+e]&&(this.m[t*this.w+e]=n)}ellipse(e,t,n,r,s,a={}){const{onlyOn:c,density:l=1,noise:o=0,seed:h=0,round:d=1}=a;e*=this.sx,n*=this.sx;for(let u=Math.max(0,Math.floor(t-r-1));u<Math.min(this.h,t+r+1);u++)for(let f=Math.max(0,Math.floor(e-n-1));f<Math.min(this.w,e+n+1);f++){const g=(f+.5-e)/n,_=(u+.5-t)/r,p=g*g+_*_;if(p>1)continue;const m=u*this.w+f;if(c&&!c.has(this.m[m]))continue;if(l<1){const y=o?Yn(f/3.2,u/3.2,h)*o+(1-o)*.5:.5;if(Ot(f,u,h+77)>l*(.4+y*1.2)*(1.15-p*.5))continue}const v=g*d,b=_*d,M=Math.hypot(v,b,Math.sqrt(Math.max(0,1-p))+.15);this.px(f,u,s,v/M,b/M,(Math.sqrt(Math.max(0,1-p))+.15)/M)}}line(e,t,n,r,s,a,c,l=1){e*=this.sx,n*=this.sx;const o=Math.max(1,Math.ceil(Math.hypot(n-e,r-t)));for(let h=0;h<=o;h++){const d=h/o,u=e+(n-e)*d,f=t+(r-t)*d,g=Math.max(.5,(s+(a-s)*d)/2);for(let _=Math.floor(f-g);_<=f+g;_++)for(let p=Math.floor(u-g);p<=u+g;p++){const m=(p+.5-u)/g,v=(_+.5-f)/g;if(m*m+v*v>1)continue;const b=m*l,M=Math.hypot(b,v*.3,1);this.px(p,_,c,b/M,v*.3/M,1/M)}}}tri(e,t){let[[n,r],[s,a],[c,l]]=e;n*=this.sx,s*=this.sx,c*=this.sx;const o=(g,_,p,m,v,b)=>(g-v)*(m-b)-(p-v)*(_-b),h=Math.max(0,Math.floor(Math.min(n,s,c))),d=Math.min(this.w,Math.ceil(Math.max(n,s,c))),u=Math.max(0,Math.floor(Math.min(r,a,l))),f=Math.min(this.h,Math.ceil(Math.max(r,a,l)));for(let g=u;g<f;g++)for(let _=h;_<d;_++){const p=_+.5,m=g+.5,v=o(p,m,n,r,s,a),b=o(p,m,s,a,c,l),M=o(p,m,c,l,n,r);(v<0||b<0||M<0)&&(v>0||b>0||M>0)||this.px(_,g,t,0,-.2,.98)}}shape(e,t,n={}){return this.fillMask(So(this.w,this.h,vo(e,!0,n.per||6)),t,n)}limb(e,t,n={}){return this.shape(ea(e,n),t,n)}fillMask(e,t,{group:n=1,line:r=!1,depth:s=0,round:a=1,onlyOn:c=null,keepNormals:l=!1,tilt:o=[0,0],lineMat:h=x.LINE}={}){const{w:d,h:u}=this;if(c)for(let p=0;p<d*u;p++)e[p]&&!c.has(this.m[p])&&(e[p]=0);const{vx:f,vy:g}=Gc(d,u,e);let _=s;if(!_){for(let p=0;p<d*u;p++)e[p]&&(_=Math.max(_,Math.hypot(f[p],g[p])));_=Math.max(1.5,Math.min(_*.9,2.5+_*.35))}for(let p=0;p<u;p++)for(let m=0;m<d;m++){const v=p*d+m;if(!e[v])continue;if(l){this.m[v]=t;continue}const b=Math.hypot(f[v],g[v]),M=Math.min(1,Math.max(0,(b-.5)/_)),y=Math.min(2.6,(1-M)/Math.sqrt(Math.max(.02,1-(1-M)*(1-M))))*a;let T=f[v]/(b||1)*y+o[0],C=g[v]/(b||1)*y+o[1];const E=Math.hypot(T,C,1);this.m[v]=t,this.n[v*3]=T/E,this.n[v*3+1]=C/E,this.n[v*3+2]=1/E}if(r&&!l){const p=[];for(let m=0;m<u;m++)for(let v=0;v<d;v++){const b=m*d+v;if(e[b])for(const[M,y]of[[1,0],[-1,0],[0,1],[0,-1]]){const T=v+M,C=m+y;if(T<0||C<0||T>=d||C>=u)continue;const E=C*d+T;if(!e[E]&&this.m[E]&&this.g[E]!==n&&this.m[E]!==h){p.push(b);break}}}for(const m of p)this.m[m]=h}if(!l)for(let p=0;p<d*u;p++)e[p]&&(this.g[p]=n);return e}mark(e,t,n,r={}){return this.fillMask(So(this.w,this.h,vo(e,!0,6)),t,{...r,onlyOn:new Set(n),keepNormals:!0})}grid(e,t,n=0,r=0,{round:s=1,flipX:a=!1}={}){const c=Math.max(...e.map(h=>h.length)),l=new Uint8Array(this.w*this.h),o=new Map;e.forEach((h,d)=>[...h].forEach((u,f)=>{const g=t[u];if(!g)return;const _=n+(a?c-1-f:f),p=r+d;this.inb(_,p)&&(l[p*this.w+_]=1,o.set(p*this.w+_,g))})),this.fillMask(l,x.BODY,{round:s,depth:2.5});for(const[h,d]of o)this.m[h]=d}}function ki(i,e,t,n=t.outline,r=bl){const{w:s,h:a}=i,c=()=>r(s,a),l=c(),o=c(),h=c(),d=l.getContext("2d").createImageData(s,a),u=o.getContext("2d").createImageData(s,a),f=h.getContext("2d").createImageData(s,a),g=n==="none"?null:n==="dark"?[22,18,30]:"tint";for(let _=0;_<a;_++)for(let p=0;p<s;p++){const m=_*s+p,v=i.m[m],b=m*4;if(!v){if(!g)continue;const E=[i.get(p+1,_),i.get(p-1,_),i.get(p,_+1),i.get(p,_-1)].find(L=>L);if(!E)continue;const B=g==="tint"?(e[E]||[0,0,0]).map(L=>L*.35|0):g;d.data.set([...B,255],b),u.data.set([128,128,255,255],b),f.data.set([128,128,255,255],b);continue}let M=e[v];v===x.LINE&&!M&&(M=g==="tint"||!g?(e[x.BODY2]||[0,0,0]).map(E=>E*.55|0):g),M=M||[255,0,255],d.data.set([...M,zc.has(v)?254:255],b);const y=i.n[m*3],T=i.n[m*3+1],C=i.n[m*3+2];u.data.set([y*127+128,T*127+128,C*255,255],b),f.data.set([-y*127+128,T*127+128,C*255,255],b)}return l.getContext("2d").putImageData(d,0,0),o.getContext("2d").putImageData(u,0,0),h.getContext("2d").putImageData(f,0,0),{A:l,N:o,NF:h,w:s,h:a}}const Wc=new Set([x.TRUNK,x.BARK2,x.BARKD,x.BARKL]);function li(i,e,t,n,r,s,{mat:a=x.LEAF,group:c=30,ragged:l=1}={}){const h=[];for(let m=0;m<9;m++){const v=m/9*Math.PI*2,b=1+(s()-.5)*.35*(r.clump+.3);h.push([e[0]+Math.cos(v)*t*b,e[1]+Math.sin(v)*n*b*(Math.sin(v)>0?.8:1)])}const d=Math.max(1,Math.round(Math.min(t,n)/3.5));i.shape(gt(h,0,9,d,Math.max(1.2,Math.min(t,n)*.14)*l,1),a,{group:c,line:!1,round:r.round}),i.mark([R(e,[-t*1.1,n*.15]),R(e,[t*1.1,n*.1]),R(e,[t*1.1,n*1.2]),R(e,[-t*1.1,n*1.2])],x.LEAF3,[a]),i.mark([R(e,[-t*.75,-n*.55]),R(e,[t*.25,-n*.95]),R(e,[t*.55,-n*.35]),R(e,[-t*.2,-n*.05])],x.LEAF2,[a]);const u=Math.floor(e[0]-t*1.2),f=Math.ceil(e[0]+t*1.2),g=Math.floor(e[1]-n*1.2),_=Math.ceil(e[1]+n*1.2),p=s()*1e4|0;for(let m=g;m<=_;m++)for(let v=u;v<=f;v++){const b=i.get(v,m);if(b!==a&&b!==x.LEAF2&&b!==x.LEAF3)continue;const M=Ot(v,m,p),y=Yn(v/2,m/2,p)*.5+M*.5;y<.16*r.density?i.recolour(v,m,b===x.LEAF2?a:x.LEAF2):y>1-.16*r.density&&i.recolour(v,m,b===x.LEAF3?a:x.LEAF3)}}function qn(i,e,t,n,r,s,a,c,{mat:l=x.TRUNK,bend:o=1,group:h=10,line:d=!1}={}){const u=[e],f=4;let g=t,_=e;for(let p=1;p<=f;p++)g+=(c()-.5)*.7*a.gnarl*o,_=R(_,[Math.cos(g)*n/f,Math.sin(g)*n/f]),u.push(_);return i.limb(u.map((p,m)=>[...p,r+(s-r)*m/f]),l,{group:h,line:d,round:a.round,cap:.6,capEnd:1}),{end:_,ang:g,pts:u}}function ls(i,e,t,n,r,s,a){if(i.shape([[e-n*1.05,t],[e-n*.62,t-n*.5],[e-n*.45,t-n*1.4],[e+n*.45,t-n*1.4],[e+n*.62,t-n*.5],[e+n*1.05,t]],x.TRUNK,{group:10,round:r.round}),r.roots<=0)return;const c=Math.round(2+r.roots*4);for(let l=0;l<c;l++){const o=l%2?1:-1,h=(8+s()*16)*a*(.4+r.roots),d=(2+s()*3)*a,u=[e+o*n*.2,t-n*.5],f=[e+o*(n*.55+h*.4),t-d],g=[e+o*(n*.5+h),t-.5];i.limb([[...u,n*.55],[...f,n*.28],[...g,1.2]],x.TRUNK,{group:11,round:r.round,cap:.5,capEnd:.6})}}function cs(i,e,t=!0){if(!(e.bark<=0))for(let n=0;n<i.h;n++)for(let r=0;r<i.w;r++){const s=n*i.w+r;if(i.m[s]!==x.TRUNK)continue;const a=t?Yn(r/1.3,n/6,21):Yn(r/6,n/1.3,21);a>1-e.bark*.42||Ot(r,n,4)<e.bark*.05?i.m[s]=x.BARKD:a>1-e.bark*.62&&i.n[s*3]<-.1&&(i.m[s]=x.BARKL)}}function zi(i,e,t){let n=i.w,r=-1,s=i.h;for(let u=0;u<i.h;u++)for(let f=0;f<i.w;f++)i.m[u*i.w+f]&&(n=Math.min(n,f),r=Math.max(r,f),s=Math.min(s,u));if(r<0)return{sp:i,crownY:t};const a=Math.max(e-n,r-e)+2,c=Math.max(0,Math.floor(e-a)),l=Math.min(i.w-c,Math.ceil(a*2)+1),o=Math.max(0,s-1),h=i.h-o,d=new Nt(l,h);for(let u=0;u<h;u++)for(let f=0;f<l;f++){const g=(u+o)*i.w+f+c,_=u*l+f;d.m[_]=i.m[g],d.g[_]=i.g[g],d.n[_*3]=i.n[g*3],d.n[_*3+1]=i.n[g*3+1],d.n[_*3+2]=i.n[g*3+2]}return{sp:d,crownY:t-o}}const gr=i=>(i.crownWidth||3)/3;function yl(i,e,t){const n=gr(e),r=Math.round(220*t*n+60*t),s=Math.round(140*t),a=new Nt(r,s),c=r/2,l=s,o=e.treeTrunks||1,h=12*t*(e.treeThick||1)*(e.treeThin?.55:1)/Math.sqrt(o),d=(i()-.5)*.5*e.gnarl+(e.treeLean||0),u=[];let f=s;const g=(_,p,m,v,b)=>{const M=qn(a,_,p,m,v,v*.65,e,i,{group:12});if(b===0){u.push(M.end);return}const y=i()<.35?3:2;for(let T=0;T<y;T++){const C=(T-(y-1)/2)*me(i,.5,.85)*(b===3?1.4:1);g(M.end,M.ang+C+(i()-.5)*.25,m*me(i,.6,.78),v*.62,b-1)}b<=2&&u.push(Ze(_,M.end,.7))};for(let _=0;_<o;_++){const p=d+(o>1?(_/(o-1)-.5)*.8:0),m=[c+(_-(o-1)/2)*h*.6,l],v=qn(a,m,-Math.PI/2+p,s*.36*(o>1?me(i,.75,1.15):1),h,h*.72,e,i,{bend:1.4});f=Math.min(f,v.end[1]);for(const b of[-1,1])g(v.end,-Math.PI/2+p*.5+b*me(i,.55,.95)*(.7+.3*n)*(o>1?.6:1),s*.22*(.75+.25*n)*(o>1?.7:1),h*.7,o>2?2:3);if(o===1&&i()<.7&&g(v.end,-Math.PI/2+(i()-.5)*.3,s*.18,h*.55,2),_===0&&e.treeHollow){const b=Ze(m,v.end,.38);a.ellipse(b[0],b[1],h*.28,h*.5,x.NOSE,{round:.3})}}if(ls(a,c,l,h*Math.sqrt(o),e,i,t),cs(a,e),e.treeWebs)for(let _=0;_+1<u.length;_+=2){const p=u[_],m=u[_+1],v=Math.hypot(m[0]-p[0],m[1]-p[1]);if(v<40*t)for(let b=0;b<=v;b++){const M=Ze(p,m,b/v);a.px(M[0],M[1]+Math.sin(b/v*Math.PI)*v*.15,x.GLINT,0,0,1)}}if(e.treeBare)return zi(a,c,f+4*t);u.sort((_,p)=>_[1]-p[1]);for(const _ of u)li(a,R(_,[0,-3*t]),me(i,14,21)*t,me(i,10,14)*t,e,i,{mat:i()<.35?x.LEAF3:x.LEAF});for(const _ of u)i()<.75&&li(a,R(_,[me(i,-9,9)*t,me(i,-12,-3)*t]),me(i,10,15)*t,me(i,7,10)*t,e,i);return zi(a,c,f+4*t)}function Xa(i,e,t){const n=.8+.2*gr(e),r=Math.round(90*t*n),s=Math.round(160*t),a=new Nt(r,s),c=r/2,l=s;a.limb([[c,l,6*t],[c,l-s*.5,4*t],[c,6*t,1.5]],x.TRUNK,{group:10,round:e.round}),ls(a,c,l,6*t,e,i,t*.6),cs(a,e);const o=Math.round(me(i,9,12));for(let h=o-1;h>=0;h--){const d=h/(o-1),u=6*t+d*s*.7,f=(5+d*36)*t*n*me(i,.9,1.1),g=(5+d*13)*t,_=[[c,u-4*t],[c+f*.5,u+g*.3],[c+f,u+g],[c+f*.7,u+g*1.15],[c,u+g*.7],[c-f*.7,u+g*1.15],[c-f,u+g],[c-f*.5,u+g*.3]];a.shape(gt(_,1,7,Math.max(2,Math.round(f/(3*t))),2*t,1),x.LEAF,{group:30+h,line:!1,round:e.round}),a.mark([[c-f,u+g*.55],[c+f,u+g*.55],[c+f,u+g*1.4],[c-f,u+g*1.4]],x.LEAF3,[x.LEAF]),a.mark([[c-f*.55,u-2*t],[c+f*.1,u-3*t],[c+f*.1,u+g*.45],[c-f*.7,u+g*.7]],x.LEAF2,[x.LEAF])}return zi(a,c,s*.82)}function wl(i,e,t){const n=gr(e),r=Math.round(200*t*n+50*t),s=Math.round(130*t),a=new Nt(r,s),c=r/2,l=s,o=13*t,h=qn(a,[c,l],-Math.PI/2+(i()-.5)*.3,s*.3,o,o*.8,e,i,{bend:1.6}),d=[];for(let g=0;g<5;g++){const _=g%2?1:-1,p=-Math.PI/2+_*me(i,.55,1.25)*(.7+.3*n),m=qn(a,h.end,p,s*me(i,.3,.42)*(.8+.2*n),o*.55,o*.3,e,i,{group:12});d.push(m.end)}ls(a,c,l,o,e,i,t),cs(a,e);for(const g of d)li(a,R(g,[0,-2*t]),me(i,20,28)*t,me(i,9,12)*t,e,i);li(a,R(h.end,[0,-8*t]),24*t,11*t,e,i);let u=r,f=0;for(const g of d)u=Math.min(u,g[0]-22*t),f=Math.max(f,g[0]+22*t);for(let g=u;g<f;g+=me(i,1,1.7)){let _=s;for(let b=0;b<s;b++)if(a.get(g,b)===x.LEAF||a.get(g,b)===x.LEAF2||a.get(g,b)===x.LEAF3){_=b;break}if(_>=s)continue;const p=Math.abs(g-c)/(r/2),m=(l-_)*me(i,.5,.9)*(1-p*.3),v=Ot(g|0,1,9)<.4?x.LEAF2:x.LEAF;for(let b=_+2;b<Math.min(l-2,_+m);b++){const M=Math.round(Math.sin(b*.12+g)*.7);Ot(g|0,b,5)<.2+e.density*.8&&a.px(g+M,b,(b-_)/m>.8?x.LEAF3:v,M*.3,.2,.95)}}return zi(a,c,h.end[1]+6*t)}function Tl(i,e,t){const n=.7+.3*gr(e),r=Math.round(110*t*n),s=Math.round(155*t),a=new Nt(r,s),c=r/2,l=s,o=(i()-.5)*.25+(e.treeLean||0),h=qn(a,[c,l],-Math.PI/2+o,s*.85,5*t,2*t,e,i,{mat:x.BARK2,bend:.4});for(let u=0;u<h.pts.length-1;u++)for(let f=0;f<1;f+=1/8){const g=Ze(h.pts[u],h.pts[u+1],f+i()*.1);if(i()<.55)for(let _=-3;_<=3;_++)a.get(g[0]+_,g[1])===x.BARK2&&i()<.8&&a.recolour(g[0]+_,g[1],x.BARKD)}const d=[h.end];for(let u=0;u<7;u++){const f=me(i,.35,.9),g=Ze(h.pts[0],h.end,f),_=u%2?1:-1,p=qn(a,g,-Math.PI/2+_*me(i,.5,1),s*me(i,.12,.2)*n,2*t,1,e,i,{mat:x.BARKD,group:12});d.push(p.end)}for(const u of d)li(a,u,me(i,9,13)*t*n,me(i,7,10)*t,e,i,{mat:x.LEAF2,ragged:1.3});return zi(a,c,s*.55)}function Al(i,e,t){const n=gr(e),r=Math.round(220*t*n+50*t),s=Math.round(120*t),a=new Nt(r,s),c=r/2,l=s,o=10*t,h=qn(a,[c,l],-Math.PI/2+(i()-.5)*.4*(e.gnarl+.3),s*.4,o,o*.75,e,i,{bend:1.2}),d=[];for(const g of[-1,1,-1,1]){const _=qn(a,h.end,-Math.PI/2+g*me(i,.7,1.15)*(.7+.3*n),s*me(i,.3,.42)*(.7+.3*n),o*.55,o*.25,e,i,{group:12});d.push(_.end,Ze(h.end,_.end,.55))}ls(a,c,l,o,e,i,t),cs(a,e);const u=Math.round(me(i,2,3)),f=Math.min(...d.map(g=>g[1]));for(let g=0;g<u;g++){const _=f-6*t+g*9*t,p=(95-g*12)*t*(.65+.35*n);for(let m=0;m<5;m++)li(a,[c+(m-2)*p*.36+me(i,-5,5)*t,_+me(i,-3,3)*t],p*me(i,.2,.26),7*t,e,i,{mat:g===u-1?x.LEAF:x.LEAF3})}return zi(a,c,h.end[1]+4*t)}function Ya(i,e,t){const n=e.leafHue+(i()-.5)*e.leafVariety*.7+(t===Xa?.06:0);return{[x.TRUNK]:we(e.trunkHue,.45*e.sat,.34),[x.BARKD]:we(e.trunkHue+.03,.5*e.sat,.17),[x.BARKL]:we(e.trunkHue-.01,.38*e.sat,.5),[x.BARK2]:[222,220,212],[x.LEAF]:we(n,.62*e.sat,.58),[x.LEAF2]:we(n-.05,.55*e.sat,.8),[x.LEAF3]:we(n+.03,.66*e.sat,.38)}}function Hc(i){const{sp:e,crownY:t}=i,n=new Nt(e.w,e.h),r=new Nt(e.w,e.h);for(let s=0;s<e.h;s++)for(let a=0;a<e.w;a++){const c=s*e.w+a,l=e.m[c];if(!l)continue;(Wc.has(l)&&s>=t?r:n).put(a,s,l,e.n[c*3],e.n[c*3+1],e.n[c*3+2])}return{top:n,bot:r}}function Vc(i,e){const t=e.bushSize,n=El(i,["round","round","fern","grass","shrub"]),r=Math.round(40*t),s=Math.round(28*t),a=new Nt(r,s);if(n==="round"||n==="shrub"){const l=n==="shrub"?5:3;for(let o=0;o<l;o++)li(a,[r/2+me(i,-9,9)*t,s-8*t+me(i,-4,2)*t],me(i,7,10)*t,me(i,5,8)*t,e,i);if(n==="shrub"||i()<e.flowers)for(let o=0;o<18*e.flowers+3;o++){const h=r/2+me(i,-12,12)*t,d=s-me(i,5,17)*t;a.get(h,d)&&a.recolour(h,d,x.FLOWER)}}else if(n==="fern")for(let l=0;l<7;l++){const o=-Math.PI/2+(l/6-.5)*2.4;let h=r/2,d=s-1;for(let u=0;u<15*t;u++)h+=Math.cos(o)*.9,d+=Math.sin(o)*.9+u*.06,a.put(h,d,l%2?x.LEAF3:x.LEAF,Math.cos(o)*.4,-.2,.9),u%2&&(a.put(h,d-1,x.LEAF2,0,-.5,.85),a.put(h+Math.sign(Math.cos(o)),d+1,x.LEAF,0,.3,.9))}else for(let l=0;l<18*t;l++){const o=r/2+me(i,-13,13)*t,h=me(i,5,15)*t,d=me(i,-3,3);for(let u=0;u<h;u++)a.put(o+d*u/h*(u/h),s-1-u,u>h*.65?x.LEAF2:u<h*.3?x.LEAF3:x.LEAF,d*.1,-.3,.9)}const c=Ya(i,e,null);return c[x.FLOWER]=we(i(),.55,.95),{sp:a,colours:c}}const st=(i,e={})=>["tree",{type:i,...e}],Fe=(i,e={})=>[i,e],qa=[{id:"moor",name:"Moor",creature:"badger",by:"Ed",leaf:.24,floor:["moss",.26,.45,.42],text:{floor:"moss",wall:"puddles, a lake",small:"long grass",big:"moss mounds"},wall:[Fe("water",{w:1.6})],small:[Fe("grass",{h:1.4})],big:[Fe("mound",{moss:!0})]},{id:"fern-forest",name:"Fern forest",creature:"boar",by:"Ed",leaf:.3,floor:["needles",.08,.45,.32],text:{floor:"pine needles",small:"ferns",big:"pine trees"},small:[Fe("fern")],big:[st("fir")]},{id:"muddy-forest",name:"Muddy forest",creature:"snail",by:"Ed",leaf:.22,floor:["mud",.07,.5,.28],text:{floor:"mud and leaves",small:"short trunks with broken branches",big:"trees with many trunks and branches"},small:[Fe("stump",{snag:!0})],big:[st("broad",{trunks:3,gnarl:.9})]},{id:"stone-shrine",name:"Stone shrine",creature:"fox",by:"Ed",leaf:.28,floor:["stony",.25,.3,.45],text:{floor:"grassy, stony",wall:"mossy henges",small:"little stones",big:"big stones",set:"a shrine"},wall:[Fe("henge")],small:[Fe("stones")],big:[Fe("boulder")],set:Fe("shrine")},{id:"tangly-forest",name:"Tangly forest",creature:"ram",by:"Ed",leaf:.27,floor:["nettles",.28,.5,.3],text:{floor:"nettles and earth",small:"tangled branches",big:"fairly short tangly trees"},small:[Fe("bramble",{bare:!0})],big:[st("broad",{scale:.7,gnarl:1})]},{id:"wispy-forest",name:"Wispy forest",creature:"woodlouse",by:"Ed",leaf:.2,floor:["leaves",.09,.55,.45],text:{floor:"dry leaves",small:"tall thin wispy trees",big:"thick trees with several trunks"},small:[st("birch",{scale:.75})],big:[st("broad",{trunks:3,thick:1.4})]},{id:"hazel-forest",name:"Hazel forest",creature:"hedgehog",by:"Ed",leaf:.26,floor:["grass",.24,.45,.45],text:{floor:"short grass",small:"brown lumps",big:"crooked trees with many branches"},small:[Fe("mound",{brown:!0})],big:[st("broad",{gnarl:1,scale:.85})]},{id:"garden",name:"Garden",creature:"squirrel",by:"Ed",leaf:.3,floor:["lawn",.27,.5,.5],text:{floor:"uniform grass",wall:"ornate stone wall",small:"manicured flower beds",big:"willows",set:"a stone pavilion"},wall:[Fe("wall")],small:[Fe("flowerbed")],big:[st("willow")],set:Fe("pavilion")},{id:"twiggy-forest",name:"Twiggy forest",creature:"wolf",by:"Ed",leaf:.29,floor:["plants",.3,.5,.38],text:{floor:"small leafy plants",small:"small trees with many thin trunks",big:"straight but slanted trees with many trunks"},small:[st("broad",{trunks:4,scale:.5,thin:!0})],big:[st("broad",{trunks:3,lean:.3,gnarl:.1})]},{id:"ancient",name:"Ancient",creature:"stag",by:"Ed",leaf:.31,floor:["roots",.1,.25,.35],text:{floor:"mossy roots over rocks",small:"sorrel",big:"giant gnarly slanted trees"},small:[Fe("flowers",{hue:.98,leafy:!0})],big:[st("broad",{scale:1.4,gnarl:1,lean:.35})]},{id:"norway",name:"Norway",creature:"stoat",by:"Ed",leaf:.36,floor:["slate",.6,.15,.35],text:{floor:"pine needles and slate",small:"rocks",big:"straight pines"},small:[Fe("stones",{big:!0})],big:[st("fir",{scale:1.2})]},{id:"alder-forest",name:"Alder forest",creature:"snake",by:"Ed",leaf:.23,floor:["tallgrass",.22,.45,.42],text:{floor:"tall and short grass",small:"tree stumps with tall grass around",big:"tall slanted trees with thin leaves at different heights"},small:[Fe("stump",{grass:!0})],big:[st("birch",{lean:.3,scale:1.2,dark:!0})]},{id:"meadow",name:"Meadow",creature:"hare",by:"draft",leaf:.25,floor:["flowers",.25,.5,.5],text:{floor:"grass and wildflowers",small:"scattered hawthorn",big:"lone oaks"},small:[Fe("shrub",{flower:[250,245,235]})],big:[st("broad",{scale:1.1})]},{id:"old-oaks",name:"Old oaks",creature:"owl",by:"draft",leaf:.22,floor:["leaves",.07,.5,.35],text:{floor:"leaf litter",small:"acorns, fallen branches",big:"ancient gnarled oaks with hollow trunks",set:"a great hollow oak"},small:[Fe("cones",{acorn:!0}),Fe("log",{branch:!0})],big:[st("broad",{gnarl:.9,hollow:!0})],set:st("broad",{scale:1.6,gnarl:1,hollow:!0})},{id:"berry-thicket",name:"Berry thicket",creature:"bear",by:"draft",leaf:.32,floor:["needles",.08,.45,.3],text:{floor:"pine needles",wall:"bramble thickets",small:"berry bushes",big:"tall pines"},wall:[Fe("bramble")],small:[Fe("shrub",{flower:[200,30,60]})],big:[st("fir",{scale:1.3})]},{id:"wetland",name:"Wetland",creature:"toad",by:"draft",leaf:.2,floor:["mud",.15,.45,.3],text:{floor:"wet mud",wall:"puddles, reeds",small:"reeds and rushes",big:"willows"},wall:[Fe("water"),Fe("reeds",{tall:!0})],small:[Fe("reeds")],big:[st("willow")]},{id:"stream",name:"Stream",creature:"otter",by:"draft",leaf:.27,floor:["pebbles",.25,.3,.45],text:{floor:"pebbles and grass",wall:"a stream or pond",small:"alder saplings",big:"alders",set:"a fallen-log bridge"},wall:[Fe("water",{w:2})],small:[st("broad",{scale:.45})],big:[st("broad",{scale:.95,gnarl:.3})],set:Fe("bridge")},{id:"rocky-slope",name:"Rocky slope",creature:"lynx",by:"draft",leaf:.34,floor:["scree",.2,.2,.42],text:{floor:"scree and moss",wall:"boulders",small:"rocks",big:"pines",set:"a rocky outcrop"},wall:[Fe("boulder",{big:!0})],small:[Fe("stones",{big:!0})],big:[st("fir")],set:Fe("outcrop")},{id:"bog",name:"Bog",creature:"elk",by:"draft",leaf:.38,floor:["moss",.18,.55,.4],text:{floor:"sphagnum moss",wall:"bog pools",small:"cotton grass",big:"spruce"},wall:[Fe("water",{bog:!0})],small:[Fe("reeds",{cotton:!0})],big:[st("fir",{dark:!0})]},{id:"deadwood",name:"Deadwood",creature:"raven",by:"draft",leaf:.15,floor:["earth",.07,.35,.3],text:{floor:"bare earth",small:"broken branches",big:"blasted dead trees"},small:[Fe("log",{branch:!0})],big:[st("broad",{bare:!0,gnarl:1})]},{id:"cave-mouth",name:"Cave mouth",creature:"bat",by:"draft",leaf:.2,floor:["stone",.08,.15,.35],text:{floor:"stone and roots",wall:"rock walls",small:"stalagmite stubs",big:"dead trees",set:"a cave mouth"},wall:[Fe("rockwall")],small:[Fe("stalagmite")],big:[st("broad",{bare:!0})],set:Fe("cave")},{id:"grassland",name:"Grassland",creature:"mole",by:"draft",leaf:.25,floor:["grass",.26,.5,.48],text:{floor:"short turf",small:"molehills",big:"lone birches"},small:[Fe("mound",{brown:!0,small:!0})],big:[st("birch")]},{id:"beaver-pond",name:"Beaver pond",creature:"beaver",by:"draft",leaf:.17,floor:["leaves",.13,.6,.5],text:{floor:"birch leaves",wall:"a pond",small:"stumps",big:"birch and aspen",set:"a beaver dam"},wall:[Fe("water",{w:2})],small:[Fe("stump",{gnawed:!0})],big:[st("birch")],set:Fe("dam")},{id:"log-pile",name:"Log pile",creature:"beetle",by:"draft",leaf:.22,floor:["leaves",.06,.5,.3],text:{floor:"rotting leaves",small:"fungi",big:"rotting logs",set:"a fallen giant"},small:[Fe("fungi")],big:[Fe("log",{rot:!0})],set:Fe("log",{rot:!0,giant:!0})},{id:"heath",name:"Heath",creature:"moth",by:"draft",leaf:.27,floor:["heather",.85,.35,.4],text:{floor:"heather",small:"gorse",big:"wind-bent birches"},small:[Fe("shrub",{flower:[250,205,40],spiky:!0})],big:[st("birch",{lean:.45,scale:.75})]},{id:"old-pinewood",name:"Old pinewood",creature:"marten",by:"draft",leaf:.35,floor:["needles",.07,.4,.3],text:{floor:"pine needles",small:"pine cones",big:"tall old pines with knotholes"},small:[Fe("cones")],big:[st("fir",{scale:1.35})]},{id:"ravine",name:"Ravine",creature:"salamander",by:"draft",leaf:.3,floor:["stone",.3,.3,.32],text:{floor:"wet moss and rock",wall:"rock walls",small:"ferns",big:"mossy boulders",set:"a waterfall"},wall:[Fe("rockwall",{moss:!0})],small:[Fe("fern")],big:[Fe("boulder",{moss:!0,big:!0})],set:Fe("waterfall")},{id:"bluebell-glade",name:"Bluebell glade",creature:"glowworm",by:"draft",leaf:.26,floor:["bluebells",.27,.45,.4],text:{floor:"bluebells",small:"ferns",big:"beeches"},small:[Fe("fern")],big:[st("broad",{gnarl:.2,scale:1.1})]},{id:"holly-thicket",name:"Holly thicket",creature:"spider",by:"draft",leaf:.36,floor:["leaves",.08,.35,.28],text:{floor:"dead leaves",wall:"holly hedges",small:"cobwebs",big:"hollies",set:"a web-hung dead tree"},wall:[Fe("hedge",{berries:!0})],small:[Fe("web")],big:[st("broad",{scale:.7,dark:!0})],set:st("broad",{bare:!0,webs:!0})},{id:"honeysuckle-tangle",name:"Honeysuckle tangle",creature:"dormouse",by:"draft",leaf:.25,floor:["clover",.27,.45,.45],text:{floor:"grass and clover",wall:"bramble",small:"honeysuckle",big:"hazel coppice"},wall:[Fe("bramble")],small:[Fe("shrub",{flower:[250,230,170]})],big:[st("broad",{trunks:5,scale:.7,thin:!0})]}],Xc=Object.fromEntries(qa.map(i=>[i.id,i]));function Yc(i,e,t=64,n=48){const[r,s,a,c]=i.floor,l=new Nt(t,n),o=i.id.length*131;for(let _=0;_<n;_++)for(let p=0;p<t;p++){const m=(Yn(p/7,_/5,o)*(t-p)*(n-_)+Yn((p-t)/7,_/5,o)*p*(n-_)+Yn(p/7,(_-n)/5,o)*(t-p)*_+Yn((p-t)/7,(_-n)/5,o)*p*_)/(t*n),v=m<.38?x.BODY2:m>.64?x.BELLY:x.BODY;l.px(p,_,v,0,-.42,.91)}const h=Yi(o),d=(_,p,m)=>l.px((_%t+t)%t,(p%n+n)%n,m,0,-.42,.91),u={moss:0,needles:70,mud:25,stony:30,nettles:60,leaves:80,grass:70,lawn:30,plants:60,roots:30,slate:40,tallgrass:90,flowers:70,pebbles:60,scree:70,earth:15,stone:40,heather:90,bluebells:90,clover:60}[r]??40;for(let _=0;_<u;_++){const p=Math.floor(h()*t),m=Math.floor(h()*n);if(r==="needles"){const v=h()<.5?1:-1;for(let b=0;b<3;b++)d(p+b*v,m+(b>>1),h()<.5?x.BODY2:x.ACCENT)}else if(["grass","lawn","tallgrass","plants","nettles","clover","flowers","bluebells","heather"].includes(r)){const v=r==="tallgrass"?4:r==="lawn"?1:2;for(let b=0;b<v;b++)d(p,m-b,b===v-1?x.LEAF2:x.LEAF);(r==="flowers"||r==="bluebells"||r==="heather"||r==="clover")&&h()<.5&&d(p+1,m-v,x.FLOWER)}else if(["stony","pebbles","scree","slate","stone","roots"].includes(r)){if(d(p,m,x.ACCENT),h()<.6&&d(p+1,m,x.ACCENT),h()<.4&&d(p,m+1,x.BODY2),r==="roots"&&h()<.5)for(let v=0;v<5;v++)d(p+v,m+(v>2?1:0),x.TRUNK)}else if(r==="leaves")d(p,m,x.FLOWER),d(p+1,m,x.FLOWER),h()<.5&&d(p,m+1,x.ACCENT);else if(r==="mud"||r==="earth")for(let v=0;v<3;v++)d(p+v,m,x.BODY2)}const f={flowers:we(.13,.6,.95),bluebells:[90,110,230],heather:[180,90,170],clover:[240,235,240],leaves:we(s+.02,.65,.6)}[r]||we(s,.3,.6),g={[x.BODY]:we(s,a*e.sat,c),[x.BODY2]:we(s+.02,a*e.sat*1.1,c*.78),[x.BELLY]:we(s-.02,a*e.sat*.9,Math.min(1,c*1.15)),[x.ACCENT]:r==="needles"?we(.07,.5,.5):we(.1,.08,.62),[x.FLOWER]:f,[x.LEAF]:we(i.leaf,.55*e.sat,.45),[x.LEAF2]:we(i.leaf-.03,.5*e.sat,.62),[x.TRUNK]:we(e.trunkHue,.4,.3)};return{sp:l,colours:g}}const ii=i=>({[x.ACCENT]:we(.1,.06,.6),[x.BODY2]:we(.62,.08,.4),[x.BELLY]:we(.1,.05,.78),[x.LEAF]:we(.27,.5,.45),[x.LEAF2]:we(.25,.45,.62),[x.NOSE]:[20,16,24]});function Ii(i,e,t,n,r,s,a){const c=[];for(let l=0;l<8;l++){const o=l/8*Math.PI*2,h=1+(s()-.5)*.3;c.push([e[0]+Math.cos(o)*t*h,e[1]+Math.sin(o)*n*h*(Math.sin(o)>0?.5:1)])}i.shape(c,x.ACCENT,{group:5,line:!0,round:r.round}),i.mark([R(e,[-t,n*.1]),R(e,[t,n*.1]),R(e,[t,n]),R(e,[-t,n])],x.BODY2,[x.ACCENT]),i.mark([R(e,[-t*.6,-n*.8]),R(e,[t*.1,-n*1.1]),R(e,[t*.3,-n*.5]),R(e,[-t*.3,-n*.3])],x.BELLY,[x.ACCENT]),a&&i.mark(gt([R(e,[-t*1.1,-n*.55]),R(e,[0,-n*1.3]),R(e,[t*1.1,-n*.5]),R(e,[t*.6,-n*.2]),R(e,[-t*.6,-n*.2])],0,3,3,n*.15,1),x.LEAF,[x.ACCENT,x.BELLY,x.BODY2])}function Kr(i,e,t,n,r,s){const a={[x.LEAF]:we(t.leaf,.6*n.sat,.55),[x.LEAF2]:we(t.leaf-.05,.55*n.sat,.78),[x.LEAF3]:we(t.leaf+.03,.66*n.sat,.36)},c={[x.TRUNK]:we(n.trunkHue,.45*n.sat,.34),[x.BARKD]:we(n.trunkHue+.03,.5*n.sat,.17),[x.BARKL]:we(n.trunkHue-.01,.38*n.sat,.5),[x.BELLY]:we(n.trunkHue+.02,.3,.7)},l={[x.MAGIC]:[60,110,150],[x.MAGIC2]:[150,200,220],[x.BODY2]:[35,70,100]};if(i==="tree"){const _={broad:yl,fir:Xa,willow:wl,birch:Tl,flat:Al}[e.type],p={...n,leafHue:t.leaf+(e.dark?.05:0),gnarl:e.gnarl??n.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},m=_(r,p,n.treeSize*s*(e.scale||1)*me(r,.9,1.1)),v=Ya(r,p,_);return e.dark&&(v[x.LEAF]=v[x.LEAF3],v[x.LEAF3]=we(t.leaf+.05,.7,.22)),v[x.NOSE]=[20,16,24],v[x.GLINT]=[235,235,240],{sp:m.sp,colours:v}}if(i==="shrub"){const _=Vc(r,{...n,leafHue:t.leaf,bushSize:n.bushSize*s,flowers:1});for(let p=0;p<_.sp.m.length;p++)_.sp.m[p]&&Ot(p,1,3)<(e.spiky?.18:.1)&&_.sp.m[p]!==x.TRUNK&&(_.sp.m[p]=x.FLOWER);return _.colours[x.FLOWER]=e.flower,_}const o=Math.round(48*s*(e.w||1)),h=Math.round(32*s),d=new Nt(o,h),u=o/2,f=h;let g={};if(i==="grass"||i==="reeds"||i==="fern"||i==="flowers"||i==="flowerbed"){const _=i==="flowerbed"?40:24,p=(i==="reeds"?e.tall?26:20:i==="fern"?14:10*(e.h||1))*s;i==="flowerbed"&&d.shape([[u-20*s,f-2],[u-18*s,f-6*s],[u+18*s,f-6*s],[u+20*s,f-2],[u+20*s,f],[u-20*s,f]],x.ACCENT,{group:2,line:!0});for(let m=0;m<_;m++){const v=u+me(r,-16,16)*s,b=p*me(r,.5,1),M=i==="fern"?me(r,-6,6)*s:me(r,-2,2)*s,y=f-1-(i==="flowerbed"?5*s:0);for(let T=0;T<b;T++){const C=T/b;d.px(v+M*C*C,y-T,C>.7?x.LEAF2:C<.3?x.LEAF3:x.LEAF,M*.05,-.3,.9),i==="fern"&&T%2&&d.px(v+M*C*C+(M>0?1:-1),y-T+1,x.LEAF2,0,-.3,.9)}if(i==="reeds"&&(e.cotton||r()<.5))for(let T=0;T<(e.cotton?2:3);T++)d.px(v+M,y-b-T,e.cotton?x.GLINT:x.TRUNK,0,-.5,.85);(i==="flowers"||i==="flowerbed")&&r()<.7&&(d.px(v+M,y-b,x.FLOWER,0,-.5,.85),d.px(v+M+1,y-b,x.FLOWER,0,-.5,.85))}if(g={...a,[x.FLOWER]:i==="flowerbed"?El(r,[[230,80,120],[250,210,60],[150,110,230]]):we(e.hue??.95,.6,.85),[x.TRUNK]:we(.07,.5,.35),[x.GLINT]:[240,240,235],[x.ACCENT]:we(.08,.1,.55)},i==="flowerbed"){for(let m=0;m<d.m.length;m++)d.m[m]===x.FLOWER&&Ot(m,2,7)<.5&&(d.m[m]=x.MAGIC2);g[x.MAGIC2]=[250,245,240]}}else if(i==="stones"){for(let _=0;_<(e.big?3:6);_++)Ii(d,[u+me(r,-14,14)*s,f-(e.big?5:2.5)*s],(e.big?6:3)*s*me(r,.7,1.2),(e.big?5:2.5)*s,n,r);g=ii()}else if(i==="boulder")Ii(d,[u,f-(e.big?11:8)*s],(e.big?18:13)*s,(e.big?12:9)*s,n,r,e.moss),g={...ii(),...a,[x.ACCENT]:we(.1,.06,.6)};else if(i==="henge")d.shape([[u-7*s,f],[u-8*s,f-18*s],[u-4*s,f-28*s],[u+5*s,f-27*s],[u+8*s,f-14*s],[u+7*s,f]],x.ACCENT,{group:5,line:!0,round:n.round}),d.mark([[u-9*s,f-30*s],[u+9*s,f-30*s],[u+9*s,f-22*s],[u-9*s,f-18*s]],x.LEAF,[x.ACCENT]),g={...ii(),...a};else if(i==="mound"){const _=(e.small?8:14)*s,p=(e.small?5:8)*s;d.shape(gt([[u-_,f],[u-_*.6,f-p*.8],[u,f-p],[u+_*.6,f-p*.8],[u+_,f]],0,4,e.moss?3:1,(e.moss?1.5:.8)*s,1),e.moss?x.LEAF:x.TRUNK,{group:5,round:n.round}),d.mark([[u-_,f-p*.45],[u+_,f-p*.45],[u+_,f],[u-_,f]],e.moss?x.LEAF3:x.BARKD,[e.moss?x.LEAF:x.TRUNK]),g={...a,...c,[x.TRUNK]:we(.07,.45,e.brown?.35:.3)}}else if(i==="stump"){const _=6*s;if(d.limb([[u,f,_*2.2],[u,f-8*s,_*1.6]],x.TRUNK,{group:5,round:n.round,cap:0,capEnd:0}),d.shape([[u-_*.8,f-8*s],[u,f-10*s-(e.gnawed?4*s:0)],[u+_*.8,f-8*s],[u,f-7*s]],x.BELLY,{group:6,round:n.round}),e.snag&&d.limb([[u+_*.4,f-8*s,2.5*s],[u+_*1.6,f-15*s,1.5*s]],x.TRUNK,{group:7,round:n.round}),e.grass)for(let p=0;p<20;p++){const m=u+me(r,-14,14)*s,v=me(r,6,13)*s;for(let b=0;b<v;b++)d.px(m,f-1-b,b>v*.6?x.LEAF2:x.LEAF,0,-.3,.9)}g={...a,...c}}else if(i==="log"){const _=(e.giant?46:e.branch?18:30)*s,p=(e.giant?14:e.branch?3:8)*s;if(d.limb([[u-_/2,f-p/2,p],[u+_/2,f-p/2-(e.branch?2*s:0),p*.9]],x.TRUNK,{group:5,round:n.round,cap:.3,capEnd:.3}),e.branch||d.shape([[u+_/2-p*.1,f-p],[u+_/2+p*.2,f-p/2],[u+_/2-p*.1,f],[u+_/2-p*.3,f-p/2]],x.BELLY,{group:6,round:n.round}),e.rot)for(let m=0;m<(e.giant?6:3);m++){const v=u+me(r,-_/2,_/3);d.shape([[v-3*s,f-p*.9],[v,f-p-3*s],[v+3*s,f-p*.9]],x.FLOWER,{group:7,line:!0,round:n.round})}e.branch&&d.limb([[u,f-p,p*.7],[u+5*s,f-p-6*s,p*.4]],x.TRUNK,{group:6,round:n.round}),g={...c,[x.FLOWER]:[230,190,120]}}else if(i==="fungi"){for(let _=0;_<5;_++){const p=u+me(r,-12,12)*s,m=me(r,3,7)*s,v=me(r,3,5)*s;d.limb([[p,f,1.6*s],[p,f-m,1.4*s]],x.BELLY,{group:5}),d.shape([[p-v,f-m],[p,f-m-v*.8],[p+v,f-m]],_%2?x.FLOWER:x.MAGIC,{group:6+_%2,line:!0,round:n.round})}g={[x.BELLY]:[225,215,195],[x.FLOWER]:[190,80,50],[x.MAGIC]:[120,230,200]}}else if(i==="cones"){for(let _=0;_<6;_++){const p=u+me(r,-14,14)*s,m=f-2*s;d.ellipse(p,m,(e.acorn?1.6:2)*s,(e.acorn?2:2.8)*s,x.TRUNK,{round:n.round}),e.acorn?d.ellipse(p,m-1.6*s,1.8*s,1*s,x.BARKD,{round:n.round}):d.px(p,m-1,x.BARKL)}g=c}else if(i==="water"){const _=22*s*(e.w||1),p=6*s;d.shape([[u-_,f-p],[u-_*.3,f-p*1.5],[u+_*.6,f-p*1.2],[u+_,f-p*.5],[u+_*.4,f],[u-_*.7,f-p*.2]],x.MAGIC,{group:5,round:.2});for(let m=0;m<6;m++){const v=u+me(r,-_*.6,_*.6),b=f-p*me(r,.4,1.1);for(let M=0;M<3*s;M++)d.recolour(v+M,b,x.MAGIC2)}g=e.bog?{[x.MAGIC]:[60,70,50],[x.MAGIC2]:[120,130,90]}:l;for(let m=0;m<d.m.length;m++)d.m[m]===x.MAGIC?d.m[m]=x.BODY:d.m[m]===x.MAGIC2&&(d.m[m]=x.BELLY);g={[x.BODY]:g[x.MAGIC],[x.BELLY]:g[x.MAGIC2]}}else if(i==="bramble"||i==="hedge"){const _=22*s,p=(i==="hedge"?18:12)*s;for(let m=0;m<(i==="hedge"?6:4);m++){const v=u+me(r,-_*.8,_*.8),b=f-p*me(r,.4,.7);d.ellipse(v,b,me(r,6,9)*s,p*.45,i==="hedge"?x.LEAF3:x.LEAF,{round:n.round,density:e.bare?.5:.95,noise:.5,seed:m})}for(let m=0;m<8;m++){let b=u+me(r,-_,_),M=f;for(let y=0;y<p*1.2;y++)b+=Math.sin(y*.3+m)*.8,M-=.8,d.px(b,M,x.TRUNK,0,-.3,.9)}if(i==="hedge"||e.berries||i==="bramble")for(let m=0;m<d.m.length;m++)d.m[m]&&d.m[m]!==x.TRUNK&&Ot(m,5,9)<.05&&(d.m[m]=x.FLOWER);g={...a,...c,[x.FLOWER]:i==="hedge"?[210,30,40]:[70,30,70]}}else if(i==="wall"){const _=22*s,p=12*s;d.shape([[u-_,f],[u-_,f-p],[u+_,f-p],[u+_,f]],x.ACCENT,{group:5,line:!0,depth:2}),d.shape([[u-_-1,f-p],[u-_-1,f-p-2*s],[u+_+1,f-p-2*s],[u+_+1,f-p]],x.BELLY,{group:6,line:!0,depth:2}),d.shape([[u+_-6*s,f-p-2*s],[u+_-6*s,f-p-7*s],[u+_,f-p-7*s],[u+_,f-p-2*s]],x.ACCENT,{group:7,line:!0,depth:2}),d.ellipse(u+_-3*s,f-p-9*s,3*s,2.5*s,x.BELLY,{round:n.round});for(let m=f-p+3*s;m<f;m+=4*s)for(let v=u-_;v<u+_;v++)d.recolour(v,m,x.BODY2);g=ii()}else if(i==="rockwall"){for(let _=0;_<5;_++)Ii(d,[u+(_-2)*9*s,f-me(r,8,14)*s],8*s,10*s,n,r,e.moss);g={...ii(),...a}}else if(i==="stalagmite"){for(let _=0;_<4;_++){const p=u+me(r,-14,14)*s,m=me(r,5,11)*s;d.shape([[p-3*s,f],[p-1*s,f-m],[p+1*s,f-m],[p+3*s,f]],x.ACCENT,{group:5,line:!0,round:n.round})}g=ii()}else if(i==="web"){const _=[u,f-14*s],p=11*s;for(let m=0;m<8;m++){const v=m/8*Math.PI*2;for(let b=0;b<p;b++)d.px(_[0]+Math.cos(v)*b,_[1]+Math.sin(v)*b,x.GLINT,0,0,1)}for(let m=3*s;m<p;m+=3*s)for(let v=0;v<Math.PI*2;v+=.05)d.px(_[0]+Math.cos(v)*m,_[1]+Math.sin(v)*m,x.GLINT,0,0,1);g={[x.GLINT]:[225,230,240]}}return{sp:d,colours:g}}function qc(i,e,t,n,r,s){if(i==="tree"||i==="log")return Kr(i,e,t,n,r,s);const a=Math.round(90*s),c=Math.round(70*s),l=new Nt(a,c),o=a/2,h=c;let d={...ii(),[x.LEAF]:we(t.leaf,.55,.5),[x.LEAF2]:we(t.leaf-.04,.5,.7),[x.TRUNK]:we(n.trunkHue,.45,.34),[x.BARKD]:we(n.trunkHue+.03,.5,.17),[x.MAGIC]:we(n.magicHue,.6,1),[x.MAGIC2]:we(n.magicHue,.2,1)};if(i==="shrine")l.shape([[o-16*s,h],[o-14*s,h-6*s],[o+14*s,h-6*s],[o+16*s,h]],x.ACCENT,{group:5,line:!0,depth:2}),l.shape([[o-9*s,h-6*s],[o-9*s,h-26*s],[o+9*s,h-26*s],[o+9*s,h-6*s]],x.ACCENT,{group:6,line:!0,depth:2}),l.shape([[o-5*s,h-10*s],[o-5*s,h-20*s],[o,h-23*s],[o+5*s,h-20*s],[o+5*s,h-10*s]],x.NOSE,{group:7}),l.shape([[o-13*s,h-26*s],[o,h-34*s],[o+13*s,h-26*s]],x.BODY2,{group:8,line:!0,depth:2}),l.ellipse(o,h-13*s,2.5*s,2.5*s,x.MAGIC2,{round:.5}),l.mark([[o-14*s,h-36*s],[o+2*s,h-36*s],[o-4*s,h-24*s],[o-14*s,h-24*s]],x.LEAF,[x.BODY2,x.ACCENT]);else if(i==="pavilion"){l.shape([[o-26*s,h],[o-26*s,h-4*s],[o+26*s,h-4*s],[o+26*s,h]],x.ACCENT,{group:5,line:!0,depth:2});for(const u of[-20,-7,7,20])l.limb([[o+u*s,h-4*s,4*s],[o+u*s,h-34*s,4*s]],u===-7||u===7?x.BODY2:x.BELLY,{group:6+(u>0?1:0),line:!0,cap:0,capEnd:0});l.shape([[o-28*s,h-34*s],[o-28*s,h-38*s],[o+28*s,h-38*s],[o+28*s,h-34*s]],x.ACCENT,{group:8,line:!0,depth:2}),l.shape([[o-24*s,h-38*s],[o-16*s,h-54*s],[o,h-60*s],[o+16*s,h-54*s],[o+24*s,h-38*s]],x.BELLY,{group:9,line:!0})}else if(i==="bridge"){const u=Kr("water",{w:1.8},t,n,r,s);for(let f=0;f<u.sp.m.length;f++){const g=f%u.sp.w,_=f/u.sp.w|0,p=Math.round(o-u.sp.w/2+g),m=h-u.sp.h+_;u.sp.m[f]&&l.inb(p,m)&&l.px(p,m,u.sp.m[f]===x.BODY?x.IRIS:x.PUPIL,0,-.42,.91)}l.limb([[o-34*s,h-6*s,9*s],[o+34*s,h-10*s,8*s]],x.TRUNK,{group:6,line:!0,cap:.3,capEnd:.3}),d[x.IRIS]=[60,110,150],d[x.PUPIL]=[150,200,220]}else if(i==="outcrop")for(const[u,f,g,_]of[[-18,14,16,13],[12,12,18,12],[-2,28,15,13],[16,34,9,9]])Ii(l,[o+u*s,h-f*s],g*s,_*s,n,r,!0);else if(i==="cave"){for(const[u,f,g,_]of[[-26,16,16,15],[26,16,16,15],[0,40,30,18],[-12,30,14,12],[12,30,14,12]])Ii(l,[o+u*s,h-f*s],g*s,_*s,n,r,f>30);l.shape([[o-15*s,h],[o-14*s,h-18*s],[o-4*s,h-28*s],[o+6*s,h-27*s],[o+14*s,h-16*s],[o+15*s,h]],x.NOSE,{group:9,line:!0})}else if(i==="dam"){const u=Kr("water",{w:1.9},t,n,r,s);for(let f=0;f<u.sp.m.length;f++){const g=f%u.sp.w,_=f/u.sp.w|0,p=Math.round(o-u.sp.w/2+g),m=h-u.sp.h+_-10*s;u.sp.m[f]&&l.inb(p,m)&&l.px(p,m,u.sp.m[f]===x.BODY?x.IRIS:x.PUPIL,0,-.42,.91)}for(let f=0;f<26;f++){const g=o+me(r,-32,32)*s,_=h-me(r,2,14)*s,p=me(r,-.5,.5),m=me(r,8,16)*s;l.limb([[g-Math.cos(p)*m/2,_-Math.sin(p)*m/2,2.6*s],[g+Math.cos(p)*m/2,_+Math.sin(p)*m/2,2*s]],f%3?x.TRUNK:x.BARKD,{group:6+f%2,line:!0})}d[x.IRIS]=[60,110,150],d[x.PUPIL]=[150,200,220]}else if(i==="waterfall"){for(const[u,f,g,_]of[[-22,30,18,30],[22,30,18,30],[0,56,20,12]])Ii(l,[o+u*s,h-f*s],g*s,_*s,n,r,!0);for(let u=o-6*s;u<o+6*s;u++)for(let f=h-50*s;f<h-4*s;f++)l.px(u,f,Ot(u|0,f/3|0,4)<.3?x.PUPIL:x.IRIS,0,-.2,.98);l.shape([[o-18*s,h],[o-14*s,h-6*s],[o+14*s,h-6*s],[o+18*s,h]],x.IRIS,{group:10,round:.2}),d[x.IRIS]=[90,150,190],d[x.PUPIL]=[210,235,245]}return{sp:l,colours:d}}function Kc(i,e,{K:t=2/(e.pixel||2),makeCanvas:n=bl}={}){const r=Xc[i];if(!r)throw new Error(`no area type "${i}"`);const s=Yi(i.split("").reduce((h,d)=>h*31+d.charCodeAt(0),7)>>>0),a=(h,d,u)=>({sp:ki(h.sp,h.colours,e,"none",n),kind:d,text:u}),c=Yc(r,e),l=h=>(h||[]).map(([d,u])=>a(Kr(d,u,r,e,s,t),d,"")),o={def:r,floor:{sp:ki(c.sp,c.colours,e,"none",n),kind:r.floor[0],text:r.text.floor},walls:l(r.wall),small:l(r.small),big:l(r.big),setPiece:null};return o.walls.forEach(h=>h.text=r.text.wall),o.small.forEach(h=>h.text=r.text.small),o.big.forEach(h=>h.text=r.text.big),r.set&&(o.setPiece=a(qc(r.set[0],r.set[1],r,e,s,t),r.set[0],r.text.set)),o}function Zc(i,e){const t=new Map,n=new Map,r=(l,o,h)=>(l*2097152+(o+1048576))*2097152+(h+1048576),s=(l,o,h)=>{const d=r(l,o,h);let u=t.get(d);if(!u){const f=Math.pow(2,-l);u=[f*(o+St(o*7+l,h,i)),f*(h+St(o,h*13+l,i+1))],t.set(d,u)}return u},a=(l,o,h)=>{const d=Math.pow(2,-l),u=Math.floor(o/d),f=Math.floor(h/d);let g=u,_=f,p=1/0;for(let m=-2;m<=2;m++)for(let v=-2;v<=2;v++){const b=s(l,u+m,f+v),M=(b[0]-o)**2+(b[1]-h)**2;M<p&&(p=M,g=u+m,_=f+v)}return[g,_]},c=(l,o,h)=>{const d=r(l,o,h);let u=n.get(d);if(u)return u;if(l===0)u=[o,h];else{const f=s(l,o,h),g=a(l-1,f[0],f[1]);u=c(l-1,g[0],g[1])}return n.set(d,u),u};return{seed:i,depth:e,site:(l,o)=>s(0,l,o),partition(l,o){const h=a(e,l,o);return c(e,h[0],h[1])},centreness(l,o,h){const d=s(0,h[0],h[1]),u=Math.hypot(l-d[0],o-d[1]);let f=1/0;const g=Math.floor(l),_=Math.floor(o);for(let p=-2;p<=2;p++)for(let m=-2;m<=2;m++){const v=g+p,b=_+m;if(v===h[0]&&b===h[1])continue;const M=s(0,v,b);f=Math.min(f,Math.hypot(l-M[0],o-M[1]))}return Math.min(1,2*u/(u+f))},openness(l,o){let h=1/0,d=1/0;const u=Math.floor(l),f=Math.floor(o);for(let g=-2;g<=2;g++)for(let _=-2;_<=2;_++){const p=s(0,u+g,f+_),m=Math.hypot(l-p[0],o-p[1]);m<h?(d=h,h=m):m<d&&(d=m)}return Math.min(1,2*h/(h+d))}}}const $c=kc.types,Kn=qa.map(i=>({id:i.id,name:i.name,creature:i.creature,text:i.text,setPiece:i.set?i.text.set??"a set piece":"",hasWalls:!!i.wall?.length,floor:[i.floor[1],i.floor[2],i.floor[3]],treeDensity:$c[i.id]?.treeDensity??1})),Li=(i,e)=>i+","+e;function Jc(i){if(i==null||i.trim()==="")return null;const e=i.trim();if(/^\d{1,9}$/.test(e))return Number(e);let t=2166136261;for(let n=0;n<e.length;n++)t=Math.imul(t^e.charCodeAt(n),16777619);return(t>>>0)%1e9}function Qc(i,e,t,n){const r=new Map,s=(l,o)=>{if(l[0]===o[0]&&l[1]===o[1])return;const h=Li(l[0],l[1]),d=Li(o[0],o[1]);r.has(h)||r.set(h,new Set),r.has(d)||r.set(d,new Set),r.get(h).add(d),r.get(d).add(h)},a=(t-e)*n;let c=[];for(let l=0;l<=a;l++){const o=[];for(let h=0;h<=a;h++){const d=i.partition(e+h/n,e+l/n);o.push(d),h>0&&s(d,o[h-1]),l>0&&s(d,c[h])}c=o}return r}function jc(i,e){const t=e.mapAreas,n=2,r=e.areaSize,s=Kn.length,a=Zc(i,e.borderLayers),c=-n,l=t+n,o=Qc(a,c,l,6),h=new Map,d=or(i*5+1);for(let L=c;L<l;L++)for(let D=c;D<l;D++){const O=new Set;for(let z=-2;z<=2;z++)for(let $=-2;$<=2;$++){const Z=h.get(Li(D+$,L+z));Z!==void 0&&O.add(Z)}for(const z of o.get(Li(D,L))??[]){const $=h.get(z);$!==void 0&&O.add($)}const X=[...Array(s).keys()].filter(z=>!O.has(z)),U=X.length?X:[...Array(s).keys()];h.set(Li(D,L),U[Math.floor(d()*U.length)])}const u=(L,D)=>h.get(Li(L,D))??Math.floor(St(L,D,i+17)*s),f=Math.floor(t/2),g=(L,D)=>{const O=a.site(L,D),X=a.partition(O[0],O[1]);return X[0]===L&&X[1]===D};let _=[f,f];for(const[L,D]of[[0,0],[1,0],[0,1],[-1,0],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]])if(g(f+L,f+D)){_=[f+L,f+D];break}const p=(L,D)=>{const O=a.site(L,D);return{x:O[0]*r,z:O[1]*r}},m=p(_[0],_[1]),v=e.clearingSize*.75,b=(L,D)=>{const O=L/r,X=D/r,U=a.partition(O,X);return{cell:U,type:u(U[0],U[1]),openness:a.openness(O,X)}},M=4.5,y=M*2.2,T=(L,D)=>{if(Math.hypot(L-m.x,D-m.z)<y)return 0;const O=a.openness(L/r,D/r);return Math.min(1,Math.pow(Math.max(0,(O-v)/Math.max(.01,e.clearingEdge)),1.6))*e.treeDensity},C=(L,D)=>{const O=Kn[u(L,D)];return O.setPiece&&St(L,D,i+61)<e.setPieceChance?O.setPiece:null},E=(L,D)=>Math.min(1,Math.hypot(L-_[0],D-_[1])/(t/2)),B=r*.5;return{seed:i,tuning:e,n:t,margin:n,areaSize:r,partition:a,centreCell:_,dancefloor:{x:m.x,z:m.z,radius:M},start:{x:m.x,z:m.z+2},bounds:{minX:B,maxX:t*r-B,minZ:B,maxZ:t*r-B},extent:{minX:c*r,maxX:l*r,minZ:c*r,maxZ:l*r},typeOf:u,areaAt:b,siteOf:p,treeWeight:T,neighbours:o,setPieceOf:C,remoteness:E}}function eu(i,e,t=.5){const n=i.tuning,r=Oi(e,0,1),s=Math.round(Rn(n.creaturesNear,n.creaturesFar,Math.pow(r,n.creatureCurve))+(t-.5)*2),a=Math.min(Math.max(0,s),Math.round(n.legendsFar*mr((r-n.legendsFrom)/Math.max(.01,1-n.legendsFrom))+(t-.5)*.8)),c=Math.round(Math.max(0,s-a)*n.youngShareFar*r);return{babies:Math.max(0,s-a-c),young:c,legends:a}}const tu=(i,e,t=0)=>i.tuning.clearingSize*.75*i.areaSize*.5*(e===2?.55:.8)*(1+t);function nu(i){const e=[],t=i.tuning;let n=0;for(let r=0;r<i.n;r++)for(let s=0;s<i.n;s++){const a=or(i.seed*7919+s*131+r*977+3),c=Kn[i.typeOf(s,r)],l=i.siteOf(s,r),o=i.remoteness(s,r),h=eu(i,o,St(s,r,i.seed+43)),d=u=>{const f=tu(i,u,o),g=a()*Math.PI*2,_=Math.sqrt(a())*f,p=l.x+Math.cos(g)*_,m=l.z+Math.sin(g)*_;return{id:n++,species:c.creature,cell:[s,r],level:u,homeX:l.x,homeZ:l.z,range:f,x:p,z:m,tx:p,tz:m,rest:a()*3,speed:(u===2?t.legendSpeed:t.creatureSpeed)*(.7+a()*.6),facing:a()<.5?1:-1,moving:!1,walk:a(),rand:or(i.seed*31+n*7+11)}};for(let u=0;u<h.babies;u++)e.push(d(0));for(let u=0;u<h.young;u++)e.push(d(1));for(let u=0;u<h.legends;u++)e.push(d(2))}return e}function iu(i,e){if(i.rest>0){i.rest-=e,i.moving=!1;return}const t=i.tx-i.x,n=i.tz-i.z,r=Math.hypot(t,n);if(r<.05){const a=i.rand()*Math.PI*2,c=Math.sqrt(i.rand())*i.range;i.tx=i.homeX+Math.cos(a)*c,i.tz=i.homeZ+Math.sin(a)*c,i.rest=.8+i.rand()*3.5,i.moving=!1;return}const s=Math.min(r,i.speed*e);i.x+=t/r*s,i.z+=n/r*s,Math.abs(t)>.02&&(i.facing=t>0?1:-1),i.moving=!0,i.walk+=e*(i.level===2?1.5:4)}function ru(i,e,t,n,r){for(const s of i)Math.abs(s.homeX-e)<n&&Math.abs(s.homeZ-t)<n&&iu(s,r)}const Bl=6,su=4,It=32;function au(i){const e=i.tuning.camera.treetop.angleIn*Math.PI/180;return i.tuning.crownHeight/Math.sin(e)}function ou(i,e,t){const{treeSpacingX:n,treeSpacingZ:r}=i.tuning,s=i.seed,a=[],c=au(i),l=i.tuning.crownHalfWidth,o=Math.ceil(t*It/r),h=Math.ceil((t+1)*It/r);for(let d=o;d<h;d++){const u=d&1?.5:0,f=Math.ceil(e*It/n-u),g=Math.ceil((e+1)*It/n-u);for(let _=f;_<g;_++){const p=(_+u+(St(_,d,s+101)-.5)*.7)*n,m=(d+(St(_,d,s+102)-.5)*.7)*r,v=i.areaAt(p,m);St(_,d,s+103)>=i.treeWeight(p,m)*Kn[v.type].treeDensity||i.treeWeight(p,m-c)===0||i.treeWeight(p-l,m-c)===0||i.treeWeight(p+l,m-c)===0||a.push({x:p,z:m,type:v.type,variant:Math.floor(St(_,d,s+104)*Bl),flip:St(_,d,s+105)<.5})}}return a}function lu(i,e,t){const n=i.tuning.bushSpacing,r=i.seed,s=[],a=Math.ceil(t*It/n),c=Math.ceil((t+1)*It/n),l=Math.ceil(e*It/n),o=Math.ceil((e+1)*It/n);for(let h=a;h<c;h++)for(let d=l;d<o;d++){const u=(d+(St(d,h,r+201)-.5)*.9)*n,f=(h+(St(d,h,r+202)-.5)*.9)*n;St(d,h,r+203)>(.12+Math.min(1,i.treeWeight(u,f))*.3)*i.tuning.bushDensity||s.push({x:u,z:f,type:i.areaAt(u,f).type,variant:Math.floor(St(d,h,r+204)*su),flip:St(d,h,r+205)<.5})}return s}function cu(i,e,t){const n=i.tuning.wallSpacing,r=i.seed,s=[],a=Math.ceil(t*It/n),c=Math.ceil((t+1)*It/n),l=Math.ceil(e*It/n),o=Math.ceil((e+1)*It/n);for(let h=a;h<c;h++)for(let d=l;d<o;d++){if(St(d,h,r+303)>i.tuning.wallDensity)continue;const u=(d+(St(d,h,r+301)-.5)*.6)*n,f=(h+(St(d,h,r+302)-.5)*.6)*n,g=i.areaAt(u,f);g.openness<.82||!Kn[g.type].hasWalls||s.push({x:u,z:f,type:g.type,variant:Math.floor(St(d,h,r+304)*4),flip:St(d,h,r+305)<.5})}return s}class uu{constructor(e){this.map=e}map;trees=new Map;bushes=new Map;walls=new Map;chunks(e,t,n){const r=[];for(let s=Math.floor((t-n)/It);s<=Math.floor((t+n)/It);s++)for(let a=Math.floor((e-n)/It);a<=Math.floor((e+n)/It);a++)r.push([a,s]);return r}gather(e,t,n,r,s){e.size>600&&e.clear();const a=[];for(const[c,l]of this.chunks(n,r,s)){const o=c+","+l;let h=e.get(o);h||(h=t(c,l),e.set(o,h));for(const d of h)Math.abs(d.x-n)<=s&&Math.abs(d.z-r)<=s&&a.push(d)}return a}treesNear(e,t,n){return this.gather(this.trees,(r,s)=>ou(this.map,r,s),e,t,n)}bushesNear(e,t,n){return this.gather(this.bushes,(r,s)=>lu(this.map,r,s),e,t,n)}wallsNear(e,t,n){return this.gather(this.walls,(r,s)=>cu(this.map,r,s),e,t,n)}setPiecesNear(e,t,n){const r=this.map,s=r.areaSize,a=[];for(let c=Math.floor((t-n)/s)-1;c<=Math.floor((t+n)/s)+1;c++)for(let l=Math.floor((e-n)/s)-1;l<=Math.floor((e+n)/s)+1;l++){if(l===r.centreCell[0]&&c===r.centreCell[1]||!r.setPieceOf(l,c))continue;const o=r.siteOf(l,c);Math.abs(o.x-e)<=n&&Math.abs(o.z-4-t)<=n&&a.push({x:o.x,z:o.z-4,type:r.typeOf(l,c),variant:0,flip:St(l,c,r.seed+71)<.5})}return a}}function hu(i,e){return{x:i,z:e,vx:0,vz:0,lift:0,mode:"ground",facing:1}}const Ka=(i,e)=>Rn(e.groundHeight,e.treetopHeight,mr(i.lift)),bo=i=>mr(i.lift);function du(i,e,t,n,r){let{mode:s,lift:a}=i;e.toggleMode&&(s=s==="ground"||s==="descending"?"rising":"descending"),s==="rising"?(a+=t/Math.max(.001,n.riseTime),a>=1&&(a=1,s="treetop")):s==="descending"&&(a-=t/Math.max(.001,n.descendTime),a<=0&&(a=0,s="ground"));let c=e.moveX,l=e.moveZ;const o=Math.hypot(c,l);o>1&&(c/=o,l/=o);const h=Rn(n.groundSpeed,n.treetopSpeed,mr(a)),d=1-Math.exp(-n.acceleration*t);let u=i.vx+(c*h-i.vx)*d,f=i.vz+(l*h-i.vz)*d,g=i.x+u*t,_=i.z+f*t;(g<r.minX||g>r.maxX)&&(g=Oi(g,r.minX,r.maxX),u=0),(_<r.minZ||_>r.maxZ)&&(_=Oi(_,r.minZ,r.maxZ),f=0);const p=u>.3?1:u<-.3?-1:i.facing;return{x:g,z:_,vx:u,vz:f,lift:a,mode:s,facing:p}}function fu(i,e){const t=jc(i,e),n=hu(t.start.x,t.start.z);return{seed:i,tuning:e,map:t,forest:new uu(t),creatures:nu(t),clock:Uc(),witch:n,camera:Dc(e,n.x,Ka(n,e),n.z)}}function pu(i,e,t){const n=Fc(i.clock,t);n!==0&&(i.witch=du(i.witch,e,n,i.tuning,i.map.bounds),i.camera=Pc(i.camera,e.zoom,{x:i.witch.x,y:Ka(i.witch,i.tuning),z:i.witch.z},n,i.tuning),ru(i.creatures,i.witch.x,i.witch.z,i.tuning.creatureSimRadius,n))}const mu=i=>Ic(i.camera,i.witch.lift,i.tuning);function Rl(i){const e=i.map.areaAt(i.witch.x,i.witch.z),t=i.map.setPieceOf(e.cell[0],e.cell[1]);return Kn[e.type].name+(t?` (set piece: ${t})`:"")}const gu="Witch tuning. Edit the numbers, push, and the playable link rebuilds. Distances are metres, times seconds, angles degrees. Keys starting with _ are notes.",_u="The forest: 20 x 20 areas cut by the fractal partition; borderLayers sets how wiggly borders are.",xu=20,vu=28,Mu=4,Su="treeDensity (0-1): the chance of a tree on each spot outside the clearings; clearingSize (0-1): how large the open middle of each area is; clearingEdge: how gradually trees thin toward it (small is a sharp edge); trees sit on a staggered grid treeSpacingX by treeSpacingZ metres, so no two crowns pile up. A tree is left out where its crown (crownHalfWidth either side, crownHeight up) would hang over a clearing seen from the treetops.",bu=.9,Eu=.55,yu=.3,wu=1,Tu=5,Au=3,Bu=4.5,Ru=5,Cu=3.4,Lu=4,Du=.6,Pu="Speeds per mode, and how long rising and descending take.",Iu=6,Nu=14,Uu=10,Fu=.7,Ou=.55,ku=1.4,zu=11,Gu="Near-isometric, after Transistor: a narrow field of view (fov, degrees) seen from far off, so there is little perspective. Each mode has its own angle (degrees below horizontal) and distance from the witch, at zoomed-in and zoomed-out. Zoom moves between them in zoomSteps steps.",Wu={fov:20,ground:{angleIn:38,angleOut:46,distanceIn:42,distanceOut:84},treetop:{angleIn:45,angleOut:55,distanceIn:64,distanceOut:128},zoomSteps:4,startZoom:1,follow:6},Hu="pixelSize: screen pixels per art pixel. glowReach: metres the witch's light reaches. spriteTilt: 1 = sprites face the camera fully, 0 = stand upright.",Vu=3,Xu=8,Yu=1,qu=1,Ku=16,Zu=90,$u="bloom: a gentle glow round bright things (strength 0 or on false turns it off; threshold: how bright a pixel must be to glow). tiltShift: blurs the top and bottom of the screen so the forest looks like a miniature. strength: the blur at the screen's edges, in pixels; band: the height of the sharp band (0-1 of the screen); centre: where it sits (0 top, 0.5 middle, 1 bottom); where: 'before' blurs at the low resolution, before the pixels are scaled up, 'after' blurs the scaled-up image. Add ?tilt=before, ?tilt=after or ?tilt=off to the link to compare.",Ju={on:!0,strength:.7,threshold:.55},Qu={on:!0,where:"before",strength:3,band:.35,centre:.5},ju="Creatures grow more numerous and older with an area's distance from home (0 at the dancefloor, 1 at the map's edge): creaturesNear in the areas round home, creaturesFar at the edge (creatureCurve shapes the rise), youngShareFar of them young at the edge, and legendsFar legends from legendsFrom outward. Only creatures within creatureSimRadius metres of the witch move.",eh=2,th=20,nh=1.3,ih=.5,rh=2,sh=.55,ah=110,oh=.6,lh="setPieceChance: the share of areas, among the types that have a set piece, that show theirs. Wall objects (an area type's edges: puddles, henges, hedges) stand where areas meet, one per wallSpacing metres with chance wallDensity; they do not block movement.",ch=.25,uh=.35,hh={_readme:gu,_map:_u,mapAreas:xu,areaSize:vu,borderLayers:Mu,_trees:Su,treeDensity:bu,clearingSize:Eu,clearingEdge:yu,bushDensity:wu,treeSpacingX:Tu,treeSpacingZ:Au,crownHalfWidth:Bu,crownHeight:Ru,bushSpacing:Cu,wallSpacing:Lu,wallDensity:Du,_witch:Pu,groundSpeed:Iu,treetopSpeed:Nu,acceleration:Uu,riseTime:Fu,descendTime:Ou,groundHeight:ku,treetopHeight:zu,_camera:Gu,camera:Wu,_look:Hu,pixelSize:Vu,glowReach:Xu,glowHeight:Yu,spriteTilt:qu,artPixelsPerMetre:Ku,drawRadius:Zu,_post:$u,bloom:Ju,tiltShift:Qu,_creatures:ju,creaturesNear:eh,creaturesFar:th,creatureCurve:nh,youngShareFar:ih,legendsFar:rh,legendsFrom:sh,creatureSimRadius:ah,creatureSpeed:oh,_setPieces:lh,setPieceChance:ch,legendSpeed:uh},vs=hh;class dh{keys=new Set;pressed=new Set;padPrev=[];touch={x:0,y:0,toggle:!1,zoom:0,debug:!1};onAny=null;constructor(e=window){e.addEventListener("keydown",t=>{if(t.repeat){this.isGameKey(t.code)&&t.preventDefault();return}this.keys.add(t.code),this.isGameKey(t.code)&&t.preventDefault(),this.onAny?.()||this.pressed.add(t.code)}),e.addEventListener("keyup",t=>this.keys.delete(t.code)),e.addEventListener("blur",()=>this.keys.clear())}isGameKey(e){return/^(Arrow|Space$|Key[WASDQE]$|Minus$|Equal$|NumpadAdd$|NumpadSubtract$|Backquote$)/.test(e)}clearPresses(){this.pressed.clear();const e=this.touch;e.toggle=!1,e.zoom=0,e.debug=!1}read(){const e=d=>this.keys.has(d)?1:0,t=d=>this.pressed.has(d);let n=e("KeyD")+e("ArrowRight")-e("KeyA")-e("ArrowLeft"),r=e("KeyS")+e("ArrowDown")-e("KeyW")-e("ArrowUp"),s=t("Space"),a=(t("KeyQ")||t("Minus")||t("NumpadSubtract")?1:0)-(t("KeyE")||t("Equal")||t("NumpadAdd")?1:0),c=t("Backquote");this.pressed.clear();const l=typeof navigator<"u"&&navigator.getGamepads?navigator.getGamepads():[];for(const d of l){if(!d)continue;const u=M=>!!d.buttons[M]?.pressed,g=d.buttons.some((M,y)=>M.pressed&&!this.padPrev[y])&&!!this.onAny?.(),_=M=>!g&&u(M)&&!this.padPrev[M];let p=d.axes[0]??0,m=d.axes[1]??0;const v=Math.hypot(p,m),b=.18;if(v<b)p=0,m=0;else{const M=(Math.min(1,v)-b)/(1-b)/v;p*=M,m*=M}p+=(u(15)?1:0)-(u(14)?1:0),m+=(u(13)?1:0)-(u(12)?1:0),n+=p,r+=m,_(0)&&(s=!0),(_(4)||_(6))&&(a+=1),(_(5)||_(7))&&(a-=1),_(8)&&(c=!0),this.padPrev=d.buttons.map(M=>M.pressed);break}const o=this.touch;n+=o.x,r+=o.y,o.toggle&&(s=!0),a+=o.zoom,o.debug&&(c=!0),o.toggle=!1,o.zoom=0,o.debug=!1;const h=Math.hypot(n,r);return h>1&&(n/=h,r/=h),{moveX:n,moveZ:r,toggleMode:s,zoom:Math.sign(a),debug:c}}}const Za="186",fh=0,Eo=1,ph=2,Zr=1,mh=2,ir=3,ci=0,Gt=1,Cn=2,Pn=0,ar=1,yo=2,wo=3,To=4,gh=5,Ri=100,_h=101,xh=102,vh=103,Mh=104,Sh=200,bh=201,Eh=202,yh=203,Cl=204,Ll=205,wh=206,Th=207,Ah=208,Bh=209,Rh=210,Ch=211,Lh=212,Dh=213,Ph=214,ta=0,na=1,ia=2,lr=3,ra=4,sa=5,aa=6,oa=7,Dl=0,Ih=1,Nh=2,xn=0,Pl=1,Il=2,Nl=3,Ul=4,Fl=5,Ol=6,kl=7,zl=300,ui=301,Gi=302,Ms=303,Ss=304,us=306,la=1e3,Ln=1001,ca=1002,Tt=1003,Uh=1004,br=1005,bt=1006,bs=1007,si=1008,Zt=1009,Gl=1010,Wl=1011,cr=1012,$a=1013,Mn=1014,gn=1015,Sn=1016,Ja=1017,Qa=1018,ur=1020,Hl=35902,Vl=35899,Xl=1021,Yl=1022,nn=1023,Un=1026,ai=1027,ql=1028,ja=1029,hi=1030,eo=1031,to=1033,$r=33776,Jr=33777,Qr=33778,jr=33779,ua=35840,ha=35841,da=35842,fa=35843,pa=36196,ma=37492,ga=37496,_a=37488,xa=37489,ns=37490,va=37491,Ma=37808,Sa=37809,ba=37810,Ea=37811,ya=37812,wa=37813,Ta=37814,Aa=37815,Ba=37816,Ra=37817,Ca=37818,La=37819,Da=37820,Pa=37821,Ia=36492,Na=36494,Ua=36495,Fa=36283,Oa=36284,is=36285,ka=36286,Fh=3200,Ao=0,Oh=1,cn="",en="srgb",hr="srgb-linear",rs="linear",ut="srgb",Es=7680,kh=519,zh=512,Gh=513,Wh=514,no=515,Hh=516,Vh=517,io=518,Xh=519,Yh=35044,qh=35048,Bo="300 es",_n=2e3,ss=2001;function Kh(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function as(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Zh(){const i=as("canvas");return i.style.display="block",i}const Ro={};function Co(...i){const e="THREE."+i.shift();console.log(e,...i)}function Kl(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function ze(...i){i=Kl(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function rt(...i){i=Kl(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Ni(...i){const e=i.join(" ");e in Ro||(Ro[e]=!0,ze(...i))}function $h(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const Jh={[ta]:na,[ia]:aa,[ra]:oa,[lr]:sa,[na]:ta,[aa]:ia,[oa]:ra,[sa]:lr};class fi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const r=n[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Dt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ys=Math.PI/180,za=180/Math.PI;function _r(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Dt[i&255]+Dt[i>>8&255]+Dt[i>>16&255]+Dt[i>>24&255]+"-"+Dt[e&255]+Dt[e>>8&255]+"-"+Dt[e>>16&15|64]+Dt[e>>24&255]+"-"+Dt[t&63|128]+Dt[t>>8&255]+"-"+Dt[t>>16&255]+Dt[t>>24&255]+Dt[n&255]+Dt[n>>8&255]+Dt[n>>16&255]+Dt[n>>24&255]).toLowerCase()}function Je(i,e,t){return Math.max(e,Math.min(t,i))}function Qh(i,e){return(i%e+e)%e}function ws(i,e,t){return(1-t)*i+t*e}function Zi(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function zt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class He{static{He.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Je(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class qi{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,c){let l=n[r+0],o=n[r+1],h=n[r+2],d=n[r+3],u=s[a+0],f=s[a+1],g=s[a+2],_=s[a+3];if(d!==_||l!==u||o!==f||h!==g){let p=l*u+o*f+h*g+d*_;p<0&&(u=-u,f=-f,g=-g,_=-_,p=-p);let m=1-c;if(p<.9995){const v=Math.acos(p),b=Math.sin(v);m=Math.sin(m*v)/b,c=Math.sin(c*v)/b,l=l*m+u*c,o=o*m+f*c,h=h*m+g*c,d=d*m+_*c}else{l=l*m+u*c,o=o*m+f*c,h=h*m+g*c,d=d*m+_*c;const v=1/Math.sqrt(l*l+o*o+h*h+d*d);l*=v,o*=v,h*=v,d*=v}}e[t]=l,e[t+1]=o,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,r,s,a){const c=n[r],l=n[r+1],o=n[r+2],h=n[r+3],d=s[a],u=s[a+1],f=s[a+2],g=s[a+3];return e[t]=c*g+h*d+l*f-o*u,e[t+1]=l*g+h*u+o*d-c*f,e[t+2]=o*g+h*f+c*u-l*d,e[t+3]=h*g-c*d-l*u-o*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,a=e._order,c=Math.cos,l=Math.sin,o=c(n/2),h=c(r/2),d=c(s/2),u=l(n/2),f=l(r/2),g=l(s/2);switch(a){case"XYZ":this._x=u*h*d+o*f*g,this._y=o*f*d-u*h*g,this._z=o*h*g+u*f*d,this._w=o*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+o*f*g,this._y=o*f*d-u*h*g,this._z=o*h*g-u*f*d,this._w=o*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-o*f*g,this._y=o*f*d+u*h*g,this._z=o*h*g+u*f*d,this._w=o*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-o*f*g,this._y=o*f*d+u*h*g,this._z=o*h*g-u*f*d,this._w=o*h*d+u*f*g;break;case"YZX":this._x=u*h*d+o*f*g,this._y=o*f*d+u*h*g,this._z=o*h*g-u*f*d,this._w=o*h*d-u*f*g;break;case"XZY":this._x=u*h*d-o*f*g,this._y=o*f*d-u*h*g,this._z=o*h*g+u*f*d,this._w=o*h*d+u*f*g;break;default:ze("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],c=t[5],l=t[9],o=t[2],h=t[6],d=t[10],u=n+c+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(s-o)*f,this._z=(a-r)*f}else if(n>c&&n>d){const f=2*Math.sqrt(1+n-c-d);this._w=(h-l)/f,this._x=.25*f,this._y=(r+a)/f,this._z=(s+o)/f}else if(c>d){const f=2*Math.sqrt(1+c-n-d);this._w=(s-o)/f,this._x=(r+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+d-n-c);this._w=(a-r)/f,this._x=(s+o)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Je(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,a=e._w,c=t._x,l=t._y,o=t._z,h=t._w;return this._x=n*h+a*c+r*o-s*l,this._y=r*h+a*l+s*c-n*o,this._z=s*h+a*o+n*l-r*c,this._w=a*h-n*c-r*l-s*o,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,c=this.dot(e);c<0&&(n=-n,r=-r,s=-s,a=-a,c=-c);let l=1-t;if(c<.9995){const o=Math.acos(c),h=Math.sin(o);l=Math.sin(l*o)/h,t=Math.sin(t*o)/h,this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class W{static{W.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Lo.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Lo.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,c=e.z,l=e.w,o=2*(a*r-c*n),h=2*(c*t-s*r),d=2*(s*n-a*t);return this.x=t+l*o+a*d-c*h,this.y=n+l*h+c*o-s*d,this.z=r+l*d+s*h-a*o,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this.z=Je(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this.z=Je(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,a=t.x,c=t.y,l=t.z;return this.x=r*l-s*c,this.y=s*a-n*l,this.z=n*c-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ts.copy(this).projectOnVector(e),this.sub(Ts)}reflect(e){return this.sub(Ts.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Je(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ts=new W,Lo=new qi;class Ge{static{Ge.prototype.isMatrix3=!0}constructor(e,t,n,r,s,a,c,l,o){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,c,l,o)}set(e,t,n,r,s,a,c,l,o){const h=this.elements;return h[0]=e,h[1]=r,h[2]=c,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=a,h[8]=o,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],c=n[3],l=n[6],o=n[1],h=n[4],d=n[7],u=n[2],f=n[5],g=n[8],_=r[0],p=r[3],m=r[6],v=r[1],b=r[4],M=r[7],y=r[2],T=r[5],C=r[8];return s[0]=a*_+c*v+l*y,s[3]=a*p+c*b+l*T,s[6]=a*m+c*M+l*C,s[1]=o*_+h*v+d*y,s[4]=o*p+h*b+d*T,s[7]=o*m+h*M+d*C,s[2]=u*_+f*v+g*y,s[5]=u*p+f*b+g*T,s[8]=u*m+f*M+g*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],c=e[5],l=e[6],o=e[7],h=e[8];return t*a*h-t*c*o-n*s*h+n*c*l+r*s*o-r*a*l}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],c=e[5],l=e[6],o=e[7],h=e[8],d=h*a-c*o,u=c*l-h*s,f=o*s-a*l,g=t*d+n*u+r*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=d*_,e[1]=(r*o-h*n)*_,e[2]=(c*n-r*a)*_,e[3]=u*_,e[4]=(h*t-r*l)*_,e[5]=(r*s-c*t)*_,e[6]=f*_,e[7]=(n*l-o*t)*_,e[8]=(a*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,c){const l=Math.cos(s),o=Math.sin(s);return this.set(n*l,n*o,-n*(l*a+o*c)+a+e,-r*o,r*l,-r*(-o*a+l*c)+c+t,0,0,1),this}scale(e,t){return Ni("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(As.makeScale(e,t)),this}rotate(e){return Ni("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(As.makeRotation(-e)),this}translate(e,t){return Ni("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(As.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const As=new Ge,Do=new Ge().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Po=new Ge().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function jh(){const i={enabled:!0,workingColorSpace:hr,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===ut&&(r.r=In(r.r),r.g=In(r.g),r.b=In(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ut&&(r.r=Ui(r.r),r.g=Ui(r.g),r.b=Ui(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===cn?rs:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Ni("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Ni("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[hr]:{primaries:e,whitePoint:n,transfer:rs,toXYZ:Do,fromXYZ:Po,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:en},outputColorSpaceConfig:{drawingBufferColorSpace:en}},[en]:{primaries:e,whitePoint:n,transfer:ut,toXYZ:Do,fromXYZ:Po,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:en}}}),i}const $e=jh();function In(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ui(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let gi;class ed{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{gi===void 0&&(gi=as("canvas")),gi.width=e.width,gi.height=e.height;const r=gi.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=gi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=as("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=In(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(In(t[n]/255)*255):t[n]=In(t[n]);return{data:t,width:e.width,height:e.height}}else return ze("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let td=0;class ro{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:td++}),this.uuid=_r(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,c=r.length;a<c;a++)r[a].isDataTexture?s.push(Bs(r[a].image)):s.push(Bs(r[a]))}else s=Bs(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function Bs(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ed.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(ze("Texture: Unable to serialize Texture."),{})}let nd=0;const Rs=new W;class kt extends fi{constructor(e=kt.DEFAULT_IMAGE,t=kt.DEFAULT_MAPPING,n=Ln,r=Ln,s=bt,a=si,c=nn,l=Zt,o=kt.DEFAULT_ANISOTROPY,h=cn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:nd++}),this.uuid=_r(),this.name="",this.source=new ro(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=o,this.format=c,this.internalFormat=null,this.type=l,this.offset=new He(0,0),this.repeat=new He(1,1),this.center=new He(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ge,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Rs).x}get height(){return this.source.getSize(Rs).y}get depth(){return this.source.getSize(Rs).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){ze(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){ze(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==zl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case la:e.x=e.x-Math.floor(e.x);break;case Ln:e.x=e.x<0?0:1;break;case ca:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case la:e.y=e.y-Math.floor(e.y);break;case Ln:e.y=e.y<0?0:1;break;case ca:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}kt.DEFAULT_IMAGE=null;kt.DEFAULT_MAPPING=zl;kt.DEFAULT_ANISOTROPY=1;class xt{static{xt.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const l=e.elements,o=l[0],h=l[4],d=l[8],u=l[1],f=l[5],g=l[9],_=l[2],p=l[6],m=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+_)<.1&&Math.abs(g+p)<.1&&Math.abs(o+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(o+1)/2,M=(f+1)/2,y=(m+1)/2,T=(h+u)/4,C=(d+_)/4,E=(g+p)/4;return b>M&&b>y?b<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(b),r=T/n,s=C/n):M>y?M<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(M),n=T/r,s=E/r):y<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(y),n=C/s,r=E/s),this.set(n,r,s,t),this}let v=Math.sqrt((p-g)*(p-g)+(d-_)*(d-_)+(u-h)*(u-h));return Math.abs(v)<.001&&(v=1),this.x=(p-g)/v,this.y=(d-_)/v,this.z=(u-h)/v,this.w=Math.acos((o+f+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this.z=Je(this.z,e.z,t.z),this.w=Je(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this.z=Je(this.z,e,t),this.w=Je(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class id extends fi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:bt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new xt(0,0,e,t),this.scissorTest=!1,this.viewport=new xt(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:n.depth},s=new kt(r),a=n.count;for(let c=0;c<a;c++)this.textures[c]=s.clone(),this.textures[c].isRenderTargetTexture=!0,this.textures[c].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:bt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new ro(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class rn extends id{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Zl extends kt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Tt,this.minFilter=Tt,this.wrapR=Ln,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class rd extends kt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Tt,this.minFilter=Tt,this.wrapR=Ln,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class Et{static{Et.prototype.isMatrix4=!0}constructor(e,t,n,r,s,a,c,l,o,h,d,u,f,g,_,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,c,l,o,h,d,u,f,g,_,p)}set(e,t,n,r,s,a,c,l,o,h,d,u,f,g,_,p){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=r,m[1]=s,m[5]=a,m[9]=c,m[13]=l,m[2]=o,m[6]=h,m[10]=d,m[14]=u,m[3]=f,m[7]=g,m[11]=_,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Et().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,r=1/_i.setFromMatrixColumn(e,0).length(),s=1/_i.setFromMatrixColumn(e,1).length(),a=1/_i.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),c=Math.sin(n),l=Math.cos(r),o=Math.sin(r),h=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const u=a*h,f=a*d,g=c*h,_=c*d;t[0]=l*h,t[4]=-l*d,t[8]=o,t[1]=f+g*o,t[5]=u-_*o,t[9]=-c*l,t[2]=_-u*o,t[6]=g+f*o,t[10]=a*l}else if(e.order==="YXZ"){const u=l*h,f=l*d,g=o*h,_=o*d;t[0]=u+_*c,t[4]=g*c-f,t[8]=a*o,t[1]=a*d,t[5]=a*h,t[9]=-c,t[2]=f*c-g,t[6]=_+u*c,t[10]=a*l}else if(e.order==="ZXY"){const u=l*h,f=l*d,g=o*h,_=o*d;t[0]=u-_*c,t[4]=-a*d,t[8]=g+f*c,t[1]=f+g*c,t[5]=a*h,t[9]=_-u*c,t[2]=-a*o,t[6]=c,t[10]=a*l}else if(e.order==="ZYX"){const u=a*h,f=a*d,g=c*h,_=c*d;t[0]=l*h,t[4]=g*o-f,t[8]=u*o+_,t[1]=l*d,t[5]=_*o+u,t[9]=f*o-g,t[2]=-o,t[6]=c*l,t[10]=a*l}else if(e.order==="YZX"){const u=a*l,f=a*o,g=c*l,_=c*o;t[0]=l*h,t[4]=_-u*d,t[8]=g*d+f,t[1]=d,t[5]=a*h,t[9]=-c*h,t[2]=-o*h,t[6]=f*d+g,t[10]=u-_*d}else if(e.order==="XZY"){const u=a*l,f=a*o,g=c*l,_=c*o;t[0]=l*h,t[4]=-d,t[8]=o*h,t[1]=u*d+_,t[5]=a*h,t[9]=f*d-g,t[2]=g*d-f,t[6]=c*h,t[10]=_*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(sd,e,ad)}lookAt(e,t,n){const r=this.elements;return Yt.subVectors(e,t),Yt.lengthSq()===0&&(Yt.z=1),Yt.normalize(),zn.crossVectors(n,Yt),zn.lengthSq()===0&&(Math.abs(n.z)===1?Yt.x+=1e-4:Yt.z+=1e-4,Yt.normalize(),zn.crossVectors(n,Yt)),zn.normalize(),Er.crossVectors(Yt,zn),r[0]=zn.x,r[4]=Er.x,r[8]=Yt.x,r[1]=zn.y,r[5]=Er.y,r[9]=Yt.y,r[2]=zn.z,r[6]=Er.z,r[10]=Yt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],c=n[4],l=n[8],o=n[12],h=n[1],d=n[5],u=n[9],f=n[13],g=n[2],_=n[6],p=n[10],m=n[14],v=n[3],b=n[7],M=n[11],y=n[15],T=r[0],C=r[4],E=r[8],B=r[12],L=r[1],D=r[5],O=r[9],X=r[13],U=r[2],z=r[6],$=r[10],Z=r[14],se=r[3],G=r[7],J=r[11],ee=r[15];return s[0]=a*T+c*L+l*U+o*se,s[4]=a*C+c*D+l*z+o*G,s[8]=a*E+c*O+l*$+o*J,s[12]=a*B+c*X+l*Z+o*ee,s[1]=h*T+d*L+u*U+f*se,s[5]=h*C+d*D+u*z+f*G,s[9]=h*E+d*O+u*$+f*J,s[13]=h*B+d*X+u*Z+f*ee,s[2]=g*T+_*L+p*U+m*se,s[6]=g*C+_*D+p*z+m*G,s[10]=g*E+_*O+p*$+m*J,s[14]=g*B+_*X+p*Z+m*ee,s[3]=v*T+b*L+M*U+y*se,s[7]=v*C+b*D+M*z+y*G,s[11]=v*E+b*O+M*$+y*J,s[15]=v*B+b*X+M*Z+y*ee,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],c=e[5],l=e[9],o=e[13],h=e[2],d=e[6],u=e[10],f=e[14],g=e[3],_=e[7],p=e[11],m=e[15],v=l*f-o*u,b=c*f-o*d,M=c*u-l*d,y=a*f-o*h,T=a*u-l*h,C=a*d-c*h;return t*(_*v-p*b+m*M)-n*(g*v-p*y+m*T)+r*(g*b-_*y+m*C)-s*(g*M-_*T+p*C)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[1],a=e[5],c=e[9],l=e[2],o=e[6],h=e[10];return t*(a*h-c*o)-n*(s*h-c*l)+r*(s*o-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],c=e[5],l=e[6],o=e[7],h=e[8],d=e[9],u=e[10],f=e[11],g=e[12],_=e[13],p=e[14],m=e[15],v=t*c-n*a,b=t*l-r*a,M=t*o-s*a,y=n*l-r*c,T=n*o-s*c,C=r*o-s*l,E=h*_-d*g,B=h*p-u*g,L=h*m-f*g,D=d*p-u*_,O=d*m-f*_,X=u*m-f*p,U=v*X-b*O+M*D+y*L-T*B+C*E;if(U===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const z=1/U;return e[0]=(c*X-l*O+o*D)*z,e[1]=(r*O-n*X-s*D)*z,e[2]=(_*C-p*T+m*y)*z,e[3]=(u*T-d*C-f*y)*z,e[4]=(l*L-a*X-o*B)*z,e[5]=(t*X-r*L+s*B)*z,e[6]=(p*M-g*C-m*b)*z,e[7]=(h*C-u*M+f*b)*z,e[8]=(a*O-c*L+o*E)*z,e[9]=(n*L-t*O-s*E)*z,e[10]=(g*T-_*M+m*v)*z,e[11]=(d*M-h*T-f*v)*z,e[12]=(c*B-a*D-l*E)*z,e[13]=(t*D-n*B+r*E)*z,e[14]=(_*b-g*y-p*v)*z,e[15]=(h*y-d*b+u*v)*z,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,c=e.y,l=e.z,o=s*a,h=s*c;return this.set(o*a+n,o*c-r*l,o*l+r*c,0,o*c+r*l,h*c+n,h*l-r*a,0,o*l-r*c,h*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,a=t._y,c=t._z,l=t._w,o=s+s,h=a+a,d=c+c,u=s*o,f=s*h,g=s*d,_=a*h,p=a*d,m=c*d,v=l*o,b=l*h,M=l*d,y=n.x,T=n.y,C=n.z;return r[0]=(1-(_+m))*y,r[1]=(f+M)*y,r[2]=(g-b)*y,r[3]=0,r[4]=(f-M)*T,r[5]=(1-(u+m))*T,r[6]=(p+v)*T,r[7]=0,r[8]=(g+b)*C,r[9]=(p-v)*C,r[10]=(1-(u+_))*C,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return n.set(1,1,1),t.identity(),this;let a=_i.set(r[0],r[1],r[2]).length();const c=_i.set(r[4],r[5],r[6]).length(),l=_i.set(r[8],r[9],r[10]).length();s<0&&(a=-a),an.copy(this);const o=1/a,h=1/c,d=1/l;return an.elements[0]*=o,an.elements[1]*=o,an.elements[2]*=o,an.elements[4]*=h,an.elements[5]*=h,an.elements[6]*=h,an.elements[8]*=d,an.elements[9]*=d,an.elements[10]*=d,t.setFromRotationMatrix(an),n.x=a,n.y=c,n.z=l,this}makePerspective(e,t,n,r,s,a,c=_n,l=!1){const o=this.elements,h=2*s/(t-e),d=2*s/(n-r),u=(t+e)/(t-e),f=(n+r)/(n-r);let g,_;if(l)g=s/(a-s),_=a*s/(a-s);else if(c===_n)g=-(a+s)/(a-s),_=-2*a*s/(a-s);else if(c===ss)g=-a/(a-s),_=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return o[0]=h,o[4]=0,o[8]=u,o[12]=0,o[1]=0,o[5]=d,o[9]=f,o[13]=0,o[2]=0,o[6]=0,o[10]=g,o[14]=_,o[3]=0,o[7]=0,o[11]=-1,o[15]=0,this}makeOrthographic(e,t,n,r,s,a,c=_n,l=!1){const o=this.elements,h=2/(t-e),d=2/(n-r),u=-(t+e)/(t-e),f=-(n+r)/(n-r);let g,_;if(l)g=1/(a-s),_=a/(a-s);else if(c===_n)g=-2/(a-s),_=-(a+s)/(a-s);else if(c===ss)g=-1/(a-s),_=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return o[0]=h,o[4]=0,o[8]=0,o[12]=u,o[1]=0,o[5]=d,o[9]=0,o[13]=f,o[2]=0,o[6]=0,o[10]=g,o[14]=_,o[3]=0,o[7]=0,o[11]=0,o[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const _i=new W,an=new Et,sd=new W(0,0,0),ad=new W(1,1,1),zn=new W,Er=new W,Yt=new W,Io=new Et,No=new qi;class di{constructor(e=0,t=0,n=0,r=di.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],a=r[4],c=r[8],l=r[1],o=r[5],h=r[9],d=r[2],u=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin(Je(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(u,o),this._z=0);break;case"YXZ":this._x=Math.asin(-Je(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(c,f),this._z=Math.atan2(l,o)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Je(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,o)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Je(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,o));break;case"YZX":this._z=Math.asin(Je(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,o),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(c,f));break;case"XZY":this._z=Math.asin(-Je(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,o),this._y=Math.atan2(c,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:ze("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Io.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Io,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return No.setFromEuler(this),this.setFromQuaternion(No,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}di.DEFAULT_ORDER="XYZ";class $l{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let od=0;const Uo=new W,xi=new qi,yn=new Et,yr=new W,$i=new W,ld=new W,cd=new qi,Fo=new W(1,0,0),Oo=new W(0,1,0),ko=new W(0,0,1),zo={type:"added"},ud={type:"removed"},vi={type:"childadded",child:null},Cs={type:"childremoved",child:null};class $t extends fi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:od++}),this.uuid=_r(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=$t.DEFAULT_UP.clone();const e=new W,t=new di,n=new qi,r=new W(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Et},normalMatrix:{value:new Ge}}),this.matrix=new Et,this.matrixWorld=new Et,this.matrixAutoUpdate=$t.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=$t.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new $l,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return xi.setFromAxisAngle(e,t),this.quaternion.multiply(xi),this}rotateOnWorldAxis(e,t){return xi.setFromAxisAngle(e,t),this.quaternion.premultiply(xi),this}rotateX(e){return this.rotateOnAxis(Fo,e)}rotateY(e){return this.rotateOnAxis(Oo,e)}rotateZ(e){return this.rotateOnAxis(ko,e)}translateOnAxis(e,t){return Uo.copy(e).applyQuaternion(this.quaternion),this.position.add(Uo.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Fo,e)}translateY(e){return this.translateOnAxis(Oo,e)}translateZ(e){return this.translateOnAxis(ko,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(yn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?yr.copy(e):yr.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),$i.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?yn.lookAt($i,yr,this.up):yn.lookAt(yr,$i,this.up),this.quaternion.setFromRotationMatrix(yn),r&&(yn.extractRotation(r.matrixWorld),xi.setFromRotationMatrix(yn),this.quaternion.premultiply(xi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(rt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(zo),vi.child=e,this.dispatchEvent(vi),vi.child=null):rt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ud),Cs.child=e,this.dispatchEvent(Cs),Cs.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),yn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),yn.multiply(e.parent.matrixWorld)),e.applyMatrix4(yn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(zo),vi.child=e,this.dispatchEvent(vi),vi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($i,e,ld),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($i,cd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*r,s[13]+=n-s[1]*t-s[5]*n-s[9]*r,s[14]+=r-s[2]*t-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const s=this.children;for(let a=0,c=s.length;a<c;a++)s[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(c=>({...c,boundingBox:c.boundingBox?c.boundingBox.toJSON():void 0,boundingSphere:c.boundingSphere?c.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(c=>({...c})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(c,l){return c[l.uuid]===void 0&&(c[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){const l=c.shapes;if(Array.isArray(l))for(let o=0,h=l.length;o<h;o++){const d=l[o];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const c=[];for(let l=0,o=this.material.length;l<o;l++)c.push(s(e.materials,this.material[l]));r.material=c}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let c=0;c<this.children.length;c++)r.children.push(this.children[c].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let c=0;c<this.animations.length;c++){const l=this.animations[c];r.animations.push(s(e.animations,l))}}if(t){const c=a(e.geometries),l=a(e.materials),o=a(e.textures),h=a(e.images),d=a(e.shapes),u=a(e.skeletons),f=a(e.animations),g=a(e.nodes);c.length>0&&(n.geometries=c),l.length>0&&(n.materials=l),o.length>0&&(n.textures=o),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=r,n;function a(c){const l=[];for(const o in c){const h=c[o];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}$t.DEFAULT_UP=new W(0,1,0);$t.DEFAULT_MATRIX_AUTO_UPDATE=!0;$t.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class wr extends $t{constructor(){super(),this.isGroup=!0,this.type="Group"}}const hd={type:"move"};class Ls{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new wr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new wr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new W,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new W),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new wr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new W,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new W,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null;const c=this._targetRay,l=this._grip,o=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(o&&e.hand){a=!0;for(const _ of e.hand.values()){const p=t.getJointPose(_,n),m=this._getHandJoint(o,_);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const h=o.joints["index-finger-tip"],d=o.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;o.inputState.pinching&&u>f+g?(o.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!o.inputState.pinching&&u<=f-g&&(o.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));c!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(hd)))}return c!==null&&(c.visible=r!==null),l!==null&&(l.visible=s!==null),o!==null&&(o.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new wr;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Jl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Gn={h:0,s:0,l:0},Tr={h:0,s:0,l:0};function Ds(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class at{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=en){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$e.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=$e.workingColorSpace){return this.r=e,this.g=t,this.b=n,$e.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=$e.workingColorSpace){if(e=Qh(e,1),t=Je(t,0,1),n=Je(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Ds(a,s,e+1/3),this.g=Ds(a,s,e),this.b=Ds(a,s,e-1/3)}return $e.colorSpaceToWorking(this,r),this}setStyle(e,t=en){function n(s){s!==void 0&&parseFloat(s)<1&&ze("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],c=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:ze("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);ze("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=en){const n=Jl[e.toLowerCase()];return n!==void 0?this.setHex(n,t):ze("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=In(e.r),this.g=In(e.g),this.b=In(e.b),this}copyLinearToSRGB(e){return this.r=Ui(e.r),this.g=Ui(e.g),this.b=Ui(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=en){return $e.workingToColorSpace(Pt.copy(this),e),Math.round(Je(Pt.r*255,0,255))*65536+Math.round(Je(Pt.g*255,0,255))*256+Math.round(Je(Pt.b*255,0,255))}getHexString(e=en){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=$e.workingColorSpace){$e.workingToColorSpace(Pt.copy(this),t);const n=Pt.r,r=Pt.g,s=Pt.b,a=Math.max(n,r,s),c=Math.min(n,r,s);let l,o;const h=(c+a)/2;if(c===a)l=0,o=0;else{const d=a-c;switch(o=h<=.5?d/(a+c):d/(2-a-c),a){case n:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-n)/d+2;break;case s:l=(n-r)/d+4;break}l/=6}return e.h=l,e.s=o,e.l=h,e}getRGB(e,t=$e.workingColorSpace){return $e.workingToColorSpace(Pt.copy(this),t),e.r=Pt.r,e.g=Pt.g,e.b=Pt.b,e}getStyle(e=en){$e.workingToColorSpace(Pt.copy(this),e);const t=Pt.r,n=Pt.g,r=Pt.b;return e!==en?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(Gn),this.setHSL(Gn.h+e,Gn.s+t,Gn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Gn),e.getHSL(Tr);const n=ws(Gn.h,Tr.h,t),r=ws(Gn.s,Tr.s,t),s=ws(Gn.l,Tr.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Pt=new at;at.NAMES=Jl;class dd extends $t{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new di,this.environmentIntensity=1,this.environmentRotation=new di,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const on=new W,wn=new W,Ps=new W,Tn=new W,Mi=new W,Si=new W,Go=new W,Is=new W,Ns=new W,Us=new W,Fs=new xt,Os=new xt,ks=new xt;class un{constructor(e=new W,t=new W,n=new W){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),on.subVectors(e,t),r.cross(on);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){on.subVectors(r,t),wn.subVectors(n,t),Ps.subVectors(e,t);const a=on.dot(on),c=on.dot(wn),l=on.dot(Ps),o=wn.dot(wn),h=wn.dot(Ps),d=a*o-c*c;if(d===0)return s.set(0,0,0),null;const u=1/d,f=(o*l-c*h)*u,g=(a*h-c*l)*u;return s.set(1-f-g,g,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Tn)===null?!1:Tn.x>=0&&Tn.y>=0&&Tn.x+Tn.y<=1}static getInterpolation(e,t,n,r,s,a,c,l){return this.getBarycoord(e,t,n,r,Tn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Tn.x),l.addScaledVector(a,Tn.y),l.addScaledVector(c,Tn.z),l)}static getInterpolatedAttribute(e,t,n,r,s,a){return Fs.setScalar(0),Os.setScalar(0),ks.setScalar(0),Fs.fromBufferAttribute(e,t),Os.fromBufferAttribute(e,n),ks.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Fs,s.x),a.addScaledVector(Os,s.y),a.addScaledVector(ks,s.z),a}static isFrontFacing(e,t,n,r){return on.subVectors(n,t),wn.subVectors(e,t),on.cross(wn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return on.subVectors(this.c,this.b),wn.subVectors(this.a,this.b),on.cross(wn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return un.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return un.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return un.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return un.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return un.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let a,c;Mi.subVectors(r,n),Si.subVectors(s,n),Is.subVectors(e,n);const l=Mi.dot(Is),o=Si.dot(Is);if(l<=0&&o<=0)return t.copy(n);Ns.subVectors(e,r);const h=Mi.dot(Ns),d=Si.dot(Ns);if(h>=0&&d<=h)return t.copy(r);const u=l*d-h*o;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(Mi,a);Us.subVectors(e,s);const f=Mi.dot(Us),g=Si.dot(Us);if(g>=0&&f<=g)return t.copy(s);const _=f*o-l*g;if(_<=0&&o>=0&&g<=0)return c=o/(o-g),t.copy(n).addScaledVector(Si,c);const p=h*g-f*d;if(p<=0&&d-h>=0&&f-g>=0)return Go.subVectors(s,r),c=(d-h)/(d-h+(f-g)),t.copy(r).addScaledVector(Go,c);const m=1/(p+_+u);return a=_*m,c=u*m,t.copy(n).addScaledVector(Mi,a).addScaledVector(Si,c)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class xr{constructor(e=new W(1/0,1/0,1/0),t=new W(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(ln.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(ln.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=ln.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,c=s.count;a<c;a++)e.isMesh===!0?e.getVertexPosition(a,ln):ln.fromBufferAttribute(s,a),ln.applyMatrix4(e.matrixWorld),this.expandByPoint(ln);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ar.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ar.copy(n.boundingBox)),Ar.applyMatrix4(e.matrixWorld),this.union(Ar)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ln),ln.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ji),Br.subVectors(this.max,Ji),bi.subVectors(e.a,Ji),Ei.subVectors(e.b,Ji),yi.subVectors(e.c,Ji),Wn.subVectors(Ei,bi),Hn.subVectors(yi,Ei),Jn.subVectors(bi,yi);let t=[0,-Wn.z,Wn.y,0,-Hn.z,Hn.y,0,-Jn.z,Jn.y,Wn.z,0,-Wn.x,Hn.z,0,-Hn.x,Jn.z,0,-Jn.x,-Wn.y,Wn.x,0,-Hn.y,Hn.x,0,-Jn.y,Jn.x,0];return!zs(t,bi,Ei,yi,Br)||(t=[1,0,0,0,1,0,0,0,1],!zs(t,bi,Ei,yi,Br))?!1:(Rr.crossVectors(Wn,Hn),t=[Rr.x,Rr.y,Rr.z],zs(t,bi,Ei,yi,Br))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ln).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ln).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(An[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),An[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),An[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),An[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),An[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),An[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),An[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),An[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(An),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const An=[new W,new W,new W,new W,new W,new W,new W,new W],ln=new W,Ar=new xr,bi=new W,Ei=new W,yi=new W,Wn=new W,Hn=new W,Jn=new W,Ji=new W,Br=new W,Rr=new W,Qn=new W;function zs(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){Qn.fromArray(i,s);const c=r.x*Math.abs(Qn.x)+r.y*Math.abs(Qn.y)+r.z*Math.abs(Qn.z),l=e.dot(Qn),o=t.dot(Qn),h=n.dot(Qn);if(Math.max(-Math.max(l,o,h),Math.min(l,o,h))>c)return!1}return!0}const wt=new W,Cr=new He;let fd=0;class vn extends fi{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:fd++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Yh,this.updateRanges=[],this.gpuType=gn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Cr.fromBufferAttribute(this,t),Cr.applyMatrix3(e),this.setXY(t,Cr.x,Cr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix3(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix4(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.applyNormalMatrix(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.transformDirection(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Zi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=zt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Zi(t,this.array)),t}setX(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Zi(t,this.array)),t}setY(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Zi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Zi(t,this.array)),t}setW(e,t){return this.normalized&&(t=zt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array),r=zt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=zt(t,this.array),n=zt(n,this.array),r=zt(r,this.array),s=zt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class Ql extends vn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class jl extends vn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Nn extends vn{constructor(e,t,n){super(new Float32Array(e),t,n)}}const pd=new xr,Qi=new W,Gs=new W;class so{constructor(e=new W,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):pd.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Qi.subVectors(e,this.center);const t=Qi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Qi,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Gs.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Qi.copy(e.center).add(Gs)),this.expandByPoint(Qi.copy(e.center).sub(Gs))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let md=0;const jt=new Et,Ws=new $t,wi=new W,qt=new xr,ji=new xr,Rt=new W;class bn extends fi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:md++}),this.uuid=_r(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Kh(e)?jl:Ql)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ge().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return jt.makeRotationFromQuaternion(e),this.applyMatrix4(jt),this}rotateX(e){return jt.makeRotationX(e),this.applyMatrix4(jt),this}rotateY(e){return jt.makeRotationY(e),this.applyMatrix4(jt),this}rotateZ(e){return jt.makeRotationZ(e),this.applyMatrix4(jt),this}translate(e,t,n){return jt.makeTranslation(e,t,n),this.applyMatrix4(jt),this}scale(e,t,n){return jt.makeScale(e,t,n),this.applyMatrix4(jt),this}lookAt(e){return Ws.lookAt(e),Ws.updateMatrix(),this.applyMatrix4(Ws.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(wi).negate(),this.translate(wi.x,wi.y,wi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Nn(n,3))}else{const n=Math.min(e.length,t.count);for(let r=0;r<n;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&ze("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new xr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){rt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new W(-1/0,-1/0,-1/0),new W(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];qt.setFromBufferAttribute(s),this.morphTargetsRelative?(Rt.addVectors(this.boundingBox.min,qt.min),this.boundingBox.expandByPoint(Rt),Rt.addVectors(this.boundingBox.max,qt.max),this.boundingBox.expandByPoint(Rt)):(this.boundingBox.expandByPoint(qt.min),this.boundingBox.expandByPoint(qt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&rt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new so);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){rt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new W,1/0);return}if(e){const n=this.boundingSphere.center;if(qt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const c=t[s];ji.setFromBufferAttribute(c),this.morphTargetsRelative?(Rt.addVectors(qt.min,ji.min),qt.expandByPoint(Rt),Rt.addVectors(qt.max,ji.max),qt.expandByPoint(Rt)):(qt.expandByPoint(ji.min),qt.expandByPoint(ji.max))}qt.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)Rt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Rt));if(t)for(let s=0,a=t.length;s<a;s++){const c=t[s],l=this.morphTargetsRelative;for(let o=0,h=c.count;o<h;o++)Rt.fromBufferAttribute(c,o),l&&(wi.fromBufferAttribute(e,o),Rt.add(wi)),r=Math.max(r,n.distanceToSquared(Rt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&rt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){rt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new vn(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const c=[],l=[];for(let E=0;E<n.count;E++)c[E]=new W,l[E]=new W;const o=new W,h=new W,d=new W,u=new He,f=new He,g=new He,_=new W,p=new W;function m(E,B,L){o.fromBufferAttribute(n,E),h.fromBufferAttribute(n,B),d.fromBufferAttribute(n,L),u.fromBufferAttribute(s,E),f.fromBufferAttribute(s,B),g.fromBufferAttribute(s,L),h.sub(o),d.sub(o),f.sub(u),g.sub(u);const D=1/(f.x*g.y-g.x*f.y);isFinite(D)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(D),p.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(D),c[E].add(_),c[B].add(_),c[L].add(_),l[E].add(p),l[B].add(p),l[L].add(p))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let E=0,B=v.length;E<B;++E){const L=v[E],D=L.start,O=L.count;for(let X=D,U=D+O;X<U;X+=3)m(e.getX(X+0),e.getX(X+1),e.getX(X+2))}const b=new W,M=new W,y=new W,T=new W;function C(E){y.fromBufferAttribute(r,E),T.copy(y);const B=c[E];b.copy(B),b.sub(y.multiplyScalar(y.dot(B))).normalize(),M.crossVectors(T,B);const D=M.dot(l[E])<0?-1:1;a.setXYZW(E,b.x,b.y,b.z,D)}for(let E=0,B=v.length;E<B;++E){const L=v[E],D=L.start,O=L.count;for(let X=D,U=D+O;X<U;X+=3)C(e.getX(X+0)),C(e.getX(X+1)),C(e.getX(X+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new vn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const r=new W,s=new W,a=new W,c=new W,l=new W,o=new W,h=new W,d=new W;if(e)for(let u=0,f=e.count;u<f;u+=3){const g=e.getX(u+0),_=e.getX(u+1),p=e.getX(u+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),a.fromBufferAttribute(t,p),h.subVectors(a,s),d.subVectors(r,s),h.cross(d),c.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),o.fromBufferAttribute(n,p),c.add(h),l.add(h),o.add(h),n.setXYZ(g,c.x,c.y,c.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(p,o.x,o.y,o.z)}else for(let u=0,f=t.count;u<f;u+=3)r.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,s),d.subVectors(r,s),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Rt.fromBufferAttribute(e,t),Rt.normalize(),e.setXYZ(t,Rt.x,Rt.y,Rt.z)}toNonIndexed(){function e(c,l){const o=c.array,h=c.itemSize,d=c.normalized,u=new o.constructor(l.length*h);let f=0,g=0;for(let _=0,p=l.length;_<p;_++){c.isInterleavedBufferAttribute?f=l[_]*c.data.stride+c.offset:f=l[_]*h;for(let m=0;m<h;m++)u[g++]=o[f++]}return new vn(u,h,d)}if(this.index===null)return ze("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new bn,n=this.index.array,r=this.attributes;for(const c in r){const l=r[c],o=e(l,n);t.setAttribute(c,o)}const s=this.morphAttributes;for(const c in s){const l=[],o=s[c];for(let h=0,d=o.length;h<d;h++){const u=o[h],f=e(u,n);l.push(f)}t.morphAttributes[c]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let c=0,l=a.length;c<l;c++){const o=a[c];t.addGroup(o.start,o.count,o.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const o in l)l[o]!==void 0&&(e[o]=l[o]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const o=n[l];e.data.attributes[l]=o.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const o=this.morphAttributes[l],h=[];for(let d=0,u=o.length;d<u;d++){const f=o[d];h.push(f.toJSON(e.data))}h.length>0&&(r[l]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const c=this.boundingSphere;return c!==null&&(e.data.boundingSphere=c.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const r=e.attributes;for(const o in r){const h=r[o];this.setAttribute(o,h.clone(t))}const s=e.morphAttributes;for(const o in s){const h=[],d=s[o];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[o]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let o=0,h=a.length;o<h;o++){const d=a[o];this.addGroup(d.start,d.count,d.materialIndex)}const c=e.boundingBox;c!==null&&(this.boundingBox=c.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Hs=new W,gd=new W,_d=new Ge;class Xn{constructor(e=new W(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=Hs.subVectors(n,t).cross(gd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const r=e.delta(Hs),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||_d.getNormalMatrix(e),r=this.coplanarPoint(Hs).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let xd=0;class hs extends fi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:xd++}),this.uuid=_r(),this.name="",this.type="Material",this.blending=ar,this.side=ci,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Cl,this.blendDst=Ll,this.blendEquation=Ri,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new at(0,0,0),this.blendAlpha=0,this.depthFunc=lr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=kh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Es,this.stencilZFail=Es,this.stencilZPass=Es,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){ze(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){ze(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const c in s){const l=s[c];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new at().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new Xn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new He().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new He().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Bn=new W,Vs=new W,Lr=new W,Dr=new W;class vd{constructor(e=new W,t=new W(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Bn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Bn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Bn.copy(this.origin).addScaledVector(this.direction,t),Bn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Vs.copy(e).add(t).multiplyScalar(.5),Lr.copy(t).sub(e).normalize(),Dr.copy(this.origin).sub(Vs);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Lr),c=Dr.dot(this.direction),l=-Dr.dot(Lr),o=Dr.lengthSq(),h=Math.abs(1-a*a);let d,u,f,g;if(h>0)if(d=a*l-c,u=a*c-l,g=s*h,d>=0)if(u>=-g)if(u<=g){const _=1/h;d*=_,u*=_,f=d*(d+a*u+2*c)+u*(a*d+u+2*l)+o}else u=s,d=Math.max(0,-(a*u+c)),f=-d*d+u*(u+2*l)+o;else u=-s,d=Math.max(0,-(a*u+c)),f=-d*d+u*(u+2*l)+o;else u<=-g?(d=Math.max(0,-(-a*s+c)),u=d>0?-s:Math.min(Math.max(-s,-l),s),f=-d*d+u*(u+2*l)+o):u<=g?(d=0,u=Math.min(Math.max(-s,-l),s),f=u*(u+2*l)+o):(d=Math.max(0,-(a*s+c)),u=d>0?s:Math.min(Math.max(-s,-l),s),f=-d*d+u*(u+2*l)+o);else u=a>0?-s:s,d=Math.max(0,-(a*u+c)),f=-d*d+u*(u+2*l)+o;return n&&n.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Vs).addScaledVector(Lr,u),f}intersectSphere(e,t){if(e.radius<0)return null;Bn.subVectors(e.center,this.origin);const n=Bn.dot(this.direction),r=Bn.dot(Bn)-n*n,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),c=n-a,l=n+a;return l<0?null:c<0?this.at(l,t):this.at(c,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,c,l;const o=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return o>=0?(n=(e.min.x-u.x)*o,r=(e.max.x-u.x)*o):(n=(e.max.x-u.x)*o,r=(e.min.x-u.x)*o),h>=0?(s=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(s=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),d>=0?(c=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(c=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),n>l||c>r)||((c>n||n!==n)&&(n=c),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Bn)!==null}intersectTriangle(e,t,n,r,s){const a=this.origin,c=this.direction,l=c.x,o=c.y,h=c.z,d=e.x-a.x,u=e.y-a.y,f=e.z-a.z,g=t.x-a.x,_=t.y-a.y,p=t.z-a.z,m=n.x-a.x,v=n.y-a.y,b=n.z-a.z,M=Math.abs(l),y=Math.abs(o),T=Math.abs(h);let C,E,B,L,D,O,X,U,z,$,Z,se;if(M>=y&&M>=T?(B=l,O=d,z=g,se=m,l>=0?(C=o,E=h,L=u,D=f,X=_,U=p,$=v,Z=b):(C=h,E=o,L=f,D=u,X=p,U=_,$=b,Z=v)):y>=T?(B=o,O=u,z=_,se=v,o>=0?(C=h,E=l,L=f,D=d,X=p,U=g,$=b,Z=m):(C=l,E=h,L=d,D=f,X=g,U=p,$=m,Z=b)):(B=h,O=f,z=p,se=b,h>=0?(C=l,E=o,L=d,D=u,X=g,U=_,$=m,Z=v):(C=o,E=l,L=u,D=d,X=_,U=g,$=v,Z=m)),B===0)return null;const G=C/B,J=E/B,ee=1/B,Te=L-G*O,Re=D-J*O,ct=X-G*z,qe=U-J*z,Qe=$-G*se,Q=Z-J*se,ie=Qe*qe-Q*ct,be=Te*Q-Re*Qe,ke=ct*Re-qe*Te;if(r){if(ie<0||be<0||ke<0)return null}else if((ie<0||be<0||ke<0)&&(ie>0||be>0||ke>0))return null;const Se=ie+be+ke;if(Se===0)return null;const q=ee*(ie*O+be*z+ke*se);return(Se>0?q<0:q>0)?null:this.at(q/Se,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ec extends hs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new at(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new di,this.combine=Dl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Wo=new Et,jn=new vd,Pr=new so,Ho=new W,Ir=new W,Nr=new W,Ur=new W,Xs=new W,Fr=new W,Vo=new W,Or=new W;class Jt extends $t{constructor(e=new bn,t=new ec){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const c=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const c=this.morphTargetInfluences;if(s&&c){Fr.set(0,0,0);for(let l=0,o=s.length;l<o;l++){const h=c[l],d=s[l];h!==0&&(Xs.fromBufferAttribute(d,e),a?Fr.addScaledVector(Xs,h):Fr.addScaledVector(Xs.sub(t),h))}t.add(Fr)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Pr.copy(n.boundingSphere),Pr.applyMatrix4(s),jn.copy(e.ray).recast(e.near),!(Pr.containsPoint(jn.origin)===!1&&(jn.intersectSphere(Pr,Ho)===null||jn.origin.distanceToSquared(Ho)>(e.far-e.near)**2))&&(Wo.copy(s).invert(),jn.copy(e.ray).applyMatrix4(Wo),!(n.boundingBox!==null&&jn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,jn)))}_computeIntersections(e,t,n){let r;const s=this.geometry,a=this.material,c=s.index,l=s.attributes.position,o=s.attributes.uv,h=s.attributes.uv1,d=s.attributes.normal,u=s.groups,f=s.drawRange;if(c!==null)if(Array.isArray(a))for(let g=0,_=u.length;g<_;g++){const p=u[g],m=a[p.materialIndex],v=Math.max(p.start,f.start),b=Math.min(c.count,Math.min(p.start+p.count,f.start+f.count));for(let M=v,y=b;M<y;M+=3){const T=c.getX(M),C=c.getX(M+1),E=c.getX(M+2);r=kr(this,m,e,n,o,h,d,T,C,E),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const g=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let p=g,m=_;p<m;p+=3){const v=c.getX(p),b=c.getX(p+1),M=c.getX(p+2);r=kr(this,a,e,n,o,h,d,v,b,M),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=u.length;g<_;g++){const p=u[g],m=a[p.materialIndex],v=Math.max(p.start,f.start),b=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let M=v,y=b;M<y;M+=3){const T=M,C=M+1,E=M+2;r=kr(this,m,e,n,o,h,d,T,C,E),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let p=g,m=_;p<m;p+=3){const v=p,b=p+1,M=p+2;r=kr(this,a,e,n,o,h,d,v,b,M),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}}}function Md(i,e,t,n,r,s,a,c){let l;if(e.side===Gt?l=n.intersectTriangle(a,s,r,!0,c):l=n.intersectTriangle(r,s,a,e.side===ci,c),l===null)return null;Or.copy(c),Or.applyMatrix4(i.matrixWorld);const o=t.ray.origin.distanceTo(Or);return o<t.near||o>t.far?null:{distance:o,point:Or.clone(),object:i}}function kr(i,e,t,n,r,s,a,c,l,o){i.getVertexPosition(c,Ir),i.getVertexPosition(l,Nr),i.getVertexPosition(o,Ur);const h=Md(i,e,t,n,Ir,Nr,Ur,Vo);if(h){const d=new W;un.getBarycoord(Vo,Ir,Nr,Ur,d),r&&(h.uv=un.getInterpolatedAttribute(r,c,l,o,d,new He)),s&&(h.uv1=un.getInterpolatedAttribute(s,c,l,o,d,new He)),a&&(h.normal=un.getInterpolatedAttribute(a,c,l,o,d,new W),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:c,b:l,c:o,normal:new W,materialIndex:0};un.getNormal(Ir,Nr,Ur,u.normal),h.face=u,h.barycoord=d}return h}class Di extends kt{constructor(e=null,t=1,n=1,r,s,a,c,l,o=Tt,h=Tt,d,u){super(null,a,c,l,o,h,r,s,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Sd extends vn{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ei=new so,bd=new He(.5,.5),zr=new W;class tc{constructor(e=new Xn,t=new Xn,n=new Xn,r=new Xn,s=new Xn,a=new Xn){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){const c=this.planes;return c[0].copy(e),c[1].copy(t),c[2].copy(n),c[3].copy(r),c[4].copy(s),c[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=_n,n=!1){const r=this.planes,s=e.elements,a=s[0],c=s[1],l=s[2],o=s[3],h=s[4],d=s[5],u=s[6],f=s[7],g=s[8],_=s[9],p=s[10],m=s[11],v=s[12],b=s[13],M=s[14],y=s[15];if(r[0].setComponents(o-a,f-h,m-g,y-v).normalize(),r[1].setComponents(o+a,f+h,m+g,y+v).normalize(),r[2].setComponents(o+c,f+d,m+_,y+b).normalize(),r[3].setComponents(o-c,f-d,m-_,y-b).normalize(),n)r[4].setComponents(l,u,p,M).normalize(),r[5].setComponents(o-l,f-u,m-p,y-M).normalize();else if(r[4].setComponents(o-l,f-u,m-p,y-M).normalize(),t===_n)r[5].setComponents(o+l,f+u,m+p,y+M).normalize();else if(t===ss)r[5].setComponents(l,u,p,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ei.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ei.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ei)}intersectsSprite(e){ei.center.set(0,0,0);const t=bd.distanceTo(e.center);return ei.radius=.7071067811865476+t,ei.applyMatrix4(e.matrixWorld),this.intersectsSphere(ei)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(zr.x=r.normal.x>0?e.max.x:e.min.x,zr.y=r.normal.y>0?e.max.y:e.min.y,zr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(zr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class nc extends kt{constructor(e=[],t=ui,n,r,s,a,c,l,o,h){super(e,t,n,r,s,a,c,l,o,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class dr extends kt{constructor(e,t,n=Mn,r,s,a,c=Tt,l=Tt,o,h=Un,d=1){if(h!==Un&&h!==ai)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:d};super(u,r,s,a,c,l,h,n,o),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ro(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class Ed extends dr{constructor(e,t=Mn,n=ui,r,s,a=Tt,c=Tt,l,o=Un){const h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,t,n,r,s,a,c,l,o),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class ic extends kt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class vr extends bn{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const c=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],o=[],h=[],d=[];let u=0,f=0;g("z","y","x",-1,-1,n,t,e,a,s,0),g("z","y","x",1,-1,n,t,-e,a,s,1),g("x","z","y",1,1,e,n,t,r,a,2),g("x","z","y",1,-1,e,n,-t,r,a,3),g("x","y","z",1,-1,e,t,n,r,s,4),g("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new Nn(o,3)),this.setAttribute("normal",new Nn(h,3)),this.setAttribute("uv",new Nn(d,2));function g(_,p,m,v,b,M,y,T,C,E,B){const L=M/C,D=y/E,O=M/2,X=y/2,U=T/2,z=C+1,$=E+1;let Z=0,se=0;const G=new W;for(let J=0;J<$;J++){const ee=J*D-X;for(let Te=0;Te<z;Te++){const Re=Te*L-O;G[_]=Re*v,G[p]=ee*b,G[m]=U,o.push(G.x,G.y,G.z),G[_]=0,G[p]=0,G[m]=T>0?1:-1,h.push(G.x,G.y,G.z),d.push(Te/C),d.push(1-J/E),Z+=1}}for(let J=0;J<E;J++)for(let ee=0;ee<C;ee++){const Te=u+ee+z*J,Re=u+ee+z*(J+1),ct=u+(ee+1)+z*(J+1),qe=u+(ee+1)+z*J;l.push(Te,Re,qe),l.push(Re,ct,qe),se+=6}c.addGroup(f,se,B),f+=se,u+=Z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Zn extends bn{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,a=t/2,c=Math.floor(n),l=Math.floor(r),o=c+1,h=l+1,d=e/c,u=t/l,f=[],g=[],_=[],p=[];for(let m=0;m<h;m++){const v=m*u-a;for(let b=0;b<o;b++){const M=b*d-s;g.push(M,-v,0),_.push(0,0,1),p.push(b/c),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let v=0;v<c;v++){const b=v+o*m,M=v+o*(m+1),y=v+1+o*(m+1),T=v+1+o*m;f.push(b,M,T),f.push(M,y,T)}this.setIndex(f),this.setAttribute("position",new Nn(g,3)),this.setAttribute("normal",new Nn(_,3)),this.setAttribute("uv",new Nn(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zn(e.width,e.height,e.widthSegments,e.heightSegments)}}function Wi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];if(Xo(r))r.isRenderTargetTexture?(ze("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone();else if(Array.isArray(r))if(Xo(r[0])){const s=[];for(let a=0,c=r.length;a<c;a++)s[a]=r[a].clone();e[t][n]=s}else e[t][n]=r.slice();else e[t][n]=r}}return e}function Ft(i){const e={};for(let t=0;t<i.length;t++){const n=Wi(i[t]);for(const r in n)e[r]=n[r]}return e}function Xo(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function yd(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function rc(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:$e.workingColorSpace}const wd={clone:Wi,merge:Ft};var Td=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ad=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Wt extends hs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Td,this.fragmentShader=Ad,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Wi(e.uniforms),this.uniformsGroups=yd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case"t":this.uniforms[n].value=t[r.value]||null;break;case"c":this.uniforms[n].value=new at().setHex(r.value);break;case"v2":this.uniforms[n].value=new He().fromArray(r.value);break;case"v3":this.uniforms[n].value=new W().fromArray(r.value);break;case"v4":this.uniforms[n].value=new xt().fromArray(r.value);break;case"m3":this.uniforms[n].value=new Ge().fromArray(r.value);break;case"m4":this.uniforms[n].value=new Et().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Bd extends Wt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Rd extends hs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Fh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Cd extends hs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Gr=new W,Wr=new qi,fn=new W;class sc extends $t{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Et,this.projectionMatrix=new Et,this.projectionMatrixInverse=new Et,this.coordinateSystem=_n,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Gr,Wr,fn),fn.x===1&&fn.y===1&&fn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Gr,Wr,fn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Gr,Wr,fn),fn.x===1&&fn.y===1&&fn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Gr,Wr,fn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Vn=new W,Yo=new He,qo=new He;class tn extends sc{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=za*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ys*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return za*2*Math.atan(Math.tan(ys*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Vn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Vn.x,Vn.y).multiplyScalar(-e/Vn.z),Vn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Vn.x,Vn.y).multiplyScalar(-e/Vn.z)}getViewSize(e,t){return this.getViewBounds(e,Yo,qo),t.subVectors(qo,Yo)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ys*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,o=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*n/o,r*=a.width/l,n*=a.height/o}const c=this.filmOffset;c!==0&&(s+=e*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class ao extends sc{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,a=n+e,c=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const o=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=o*this.view.offsetX,a=s+o*this.view.width,c-=h*this.view.offsetY,l=c-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,c,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Ld extends bn{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}const Ti=-90,Ai=1;class Dd extends $t{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new tn(Ti,Ai,e,t);r.layers=this.layers,this.add(r);const s=new tn(Ti,Ai,e,t);s.layers=this.layers,this.add(s);const a=new tn(Ti,Ai,e,t);a.layers=this.layers,this.add(a);const c=new tn(Ti,Ai,e,t);c.layers=this.layers,this.add(c);const l=new tn(Ti,Ai,e,t);l.layers=this.layers,this.add(l);const o=new tn(Ti,Ai,e,t);o.layers=this.layers,this.add(o)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,c,l]=t;for(const o of t)this.remove(o);if(e===_n)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ss)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const o of t)this.add(o),o.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,c,l,o,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(n,0,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,3,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Pd extends tn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class ac{static{ac.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=r,this}}function Ko(i,e,t,n){const r=Id(n);switch(t){case Xl:return i*e;case ql:return i*e/r.components*r.byteLength;case ja:return i*e/r.components*r.byteLength;case hi:return i*e*2/r.components*r.byteLength;case eo:return i*e*2/r.components*r.byteLength;case Yl:return i*e*3/r.components*r.byteLength;case nn:return i*e*4/r.components*r.byteLength;case to:return i*e*4/r.components*r.byteLength;case $r:case Jr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Qr:case jr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ha:case fa:return Math.max(i,16)*Math.max(e,8)/4;case ua:case da:return Math.max(i,8)*Math.max(e,8)/2;case pa:case ma:case _a:case xa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ga:case ns:case va:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ma:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Sa:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case ba:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Ea:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case ya:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case wa:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Ta:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Aa:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Ba:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Ra:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Ca:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case La:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Da:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Pa:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Ia:case Na:case Ua:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Fa:case Oa:return Math.ceil(i/4)*Math.ceil(e/4)*8;case is:case ka:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Id(i){switch(i){case Zt:case Gl:return{byteLength:1,components:1};case cr:case Wl:case Sn:return{byteLength:2,components:1};case Ja:case Qa:return{byteLength:2,components:4};case Mn:case $a:case gn:return{byteLength:4,components:1};case Hl:case Vl:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Za}}));typeof window<"u"&&(window.__THREE__?ze("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Za);function oc(){let i=null,e=!1,t=null,n=null;function r(s,a){n=i.requestAnimationFrame(r),t(s,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function Nd(i){const e=new WeakMap;function t(c,l){const o=c.array,h=c.usage,d=o.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,o,h),c.onUploadCallback();let f;if(o instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&o instanceof Float16Array)f=i.HALF_FLOAT;else if(o instanceof Uint16Array)c.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(o instanceof Int16Array)f=i.SHORT;else if(o instanceof Uint32Array)f=i.UNSIGNED_INT;else if(o instanceof Int32Array)f=i.INT;else if(o instanceof Int8Array)f=i.BYTE;else if(o instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(o instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+o);return{buffer:u,type:f,bytesPerElement:o.BYTES_PER_ELEMENT,version:c.version,size:d}}function n(c,l,o){const h=l.array,d=l.updateRanges;if(i.bindBuffer(o,c),d.length===0)i.bufferSubData(o,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){const g=d[u],_=d[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++u,d[u]=_)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){const _=d[f];i.bufferSubData(o,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(c){return c.isInterleavedBufferAttribute&&(c=c.data),e.get(c)}function s(c){c.isInterleavedBufferAttribute&&(c=c.data);const l=e.get(c);l&&(i.deleteBuffer(l.buffer),e.delete(c))}function a(c,l){if(c.isInterleavedBufferAttribute&&(c=c.data),c.isGLBufferAttribute){const h=e.get(c);(!h||h.version<c.version)&&e.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}const o=e.get(c);if(o===void 0)e.set(c,t(c,l));else if(o.version<c.version){if(o.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(o.buffer,c,l),o.version=c.version}}return{get:r,remove:s,update:a}}var Ud=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Fd=`#ifdef USE_ALPHAHASH
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
#endif`,Od=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,kd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,zd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Gd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Wd=`#ifdef USE_AOMAP
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
#endif`,Hd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Vd=`#ifdef USE_BATCHING
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
#endif`,Xd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Yd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,qd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Kd=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Zd=`#ifdef USE_IRIDESCENCE
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
#endif`,$d=`#ifdef USE_BUMPMAP
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
#endif`,Jd=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Qd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,jd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ef=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,tf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,nf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,rf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,sf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,af=`#define PI 3.141592653589793
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
} // validated`,of=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,lf=`vec3 transformedNormal = objectNormal;
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
#endif`,cf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,uf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,hf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,df=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ff="gl_FragColor = linearToOutputTexel( gl_FragColor );",pf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,mf=`#ifdef USE_ENVMAP
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
#endif`,gf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,_f=`#ifdef USE_ENVMAP
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
#endif`,xf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,vf=`#ifdef USE_ENVMAP
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
#endif`,Mf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Sf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,bf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ef=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,yf=`#ifdef USE_GRADIENTMAP
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
}`,wf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Tf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Af=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Bf=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Rf=`#ifdef USE_ENVMAP
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
#endif`,Cf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Lf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Df=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Pf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,If=`PhysicalMaterial material;
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
#endif`,Nf=`uniform sampler2D dfgLUT;
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
}`,Uf=`
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
#endif`,Ff=`#if defined( RE_IndirectDiffuse )
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
#endif`,Of=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,kf=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,zf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Gf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Wf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Hf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Vf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Xf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Yf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,qf=`#if defined( USE_POINTS_UV )
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
#endif`,Kf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Zf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,$f=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Jf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Qf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,jf=`#ifdef USE_MORPHTARGETS
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
#endif`,ep=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,tp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,np=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,ip=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,ap=`#ifdef USE_NORMALMAP
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
#endif`,op=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,lp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,cp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,up=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,hp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,dp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,fp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,pp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,mp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,gp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,_p=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,xp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,vp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Mp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Sp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,bp=`float getShadowMask() {
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
}`,Ep=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,yp=`#ifdef USE_SKINNING
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
#endif`,wp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Tp=`#ifdef USE_SKINNING
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
#endif`,Ap=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Bp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Rp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Cp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Lp=`#ifdef USE_TRANSMISSION
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
#endif`,Dp=`#ifdef USE_TRANSMISSION
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
#endif`,Pp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ip=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Np=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Up=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Fp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Op=`uniform sampler2D t2D;
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
}`,kp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zp=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Gp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Wp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hp=`#include <common>
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
}`,Vp=`#if DEPTH_PACKING == 3200
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
}`,Xp=`#define DISTANCE
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
}`,Yp=`#define DISTANCE
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
}`,qp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Kp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zp=`uniform float scale;
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
}`,$p=`uniform vec3 diffuse;
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
}`,Jp=`#include <common>
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
}`,Qp=`uniform vec3 diffuse;
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
}`,jp=`#define LAMBERT
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
}`,em=`#define LAMBERT
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
}`,tm=`#define MATCAP
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
}`,nm=`#define MATCAP
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
}`,im=`#define NORMAL
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
}`,rm=`#define NORMAL
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
}`,sm=`#define PHONG
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
}`,am=`#define PHONG
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
}`,om=`#define STANDARD
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
}`,lm=`#define STANDARD
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
}`,cm=`#define TOON
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
}`,um=`#define TOON
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
}`,hm=`uniform float size;
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
}`,dm=`uniform vec3 diffuse;
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
}`,fm=`#include <common>
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
}`,pm=`uniform vec3 color;
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
}`,mm=`uniform float rotation;
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
}`,gm=`uniform vec3 diffuse;
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
}`,Xe={alphahash_fragment:Ud,alphahash_pars_fragment:Fd,alphamap_fragment:Od,alphamap_pars_fragment:kd,alphatest_fragment:zd,alphatest_pars_fragment:Gd,aomap_fragment:Wd,aomap_pars_fragment:Hd,batching_pars_vertex:Vd,batching_vertex:Xd,begin_vertex:Yd,beginnormal_vertex:qd,bsdfs:Kd,iridescence_fragment:Zd,bumpmap_pars_fragment:$d,clipping_planes_fragment:Jd,clipping_planes_pars_fragment:Qd,clipping_planes_pars_vertex:jd,clipping_planes_vertex:ef,color_fragment:tf,color_pars_fragment:nf,color_pars_vertex:rf,color_vertex:sf,common:af,cube_uv_reflection_fragment:of,defaultnormal_vertex:lf,displacementmap_pars_vertex:cf,displacementmap_vertex:uf,emissivemap_fragment:hf,emissivemap_pars_fragment:df,colorspace_fragment:ff,colorspace_pars_fragment:pf,envmap_fragment:mf,envmap_common_pars_fragment:gf,envmap_pars_fragment:_f,envmap_pars_vertex:xf,envmap_physical_pars_fragment:Rf,envmap_vertex:vf,fog_vertex:Mf,fog_pars_vertex:Sf,fog_fragment:bf,fog_pars_fragment:Ef,gradientmap_pars_fragment:yf,lightmap_pars_fragment:wf,lights_lambert_fragment:Tf,lights_lambert_pars_fragment:Af,lights_pars_begin:Bf,lights_toon_fragment:Cf,lights_toon_pars_fragment:Lf,lights_phong_fragment:Df,lights_phong_pars_fragment:Pf,lights_physical_fragment:If,lights_physical_pars_fragment:Nf,lights_fragment_begin:Uf,lights_fragment_maps:Ff,lights_fragment_end:Of,lightprobes_pars_fragment:kf,logdepthbuf_fragment:zf,logdepthbuf_pars_fragment:Gf,logdepthbuf_pars_vertex:Wf,logdepthbuf_vertex:Hf,map_fragment:Vf,map_pars_fragment:Xf,map_particle_fragment:Yf,map_particle_pars_fragment:qf,metalnessmap_fragment:Kf,metalnessmap_pars_fragment:Zf,morphinstance_vertex:$f,morphcolor_vertex:Jf,morphnormal_vertex:Qf,morphtarget_pars_vertex:jf,morphtarget_vertex:ep,normal_fragment_begin:tp,normal_fragment_maps:np,normal_pars_fragment:ip,normal_pars_vertex:rp,normal_vertex:sp,normalmap_pars_fragment:ap,clearcoat_normal_fragment_begin:op,clearcoat_normal_fragment_maps:lp,clearcoat_pars_fragment:cp,iridescence_pars_fragment:up,opaque_fragment:hp,packing:dp,premultiplied_alpha_fragment:fp,project_vertex:pp,dithering_fragment:mp,dithering_pars_fragment:gp,roughnessmap_fragment:_p,roughnessmap_pars_fragment:xp,shadowmap_pars_fragment:vp,shadowmap_pars_vertex:Mp,shadowmap_vertex:Sp,shadowmask_pars_fragment:bp,skinbase_vertex:Ep,skinning_pars_vertex:yp,skinning_vertex:wp,skinnormal_vertex:Tp,specularmap_fragment:Ap,specularmap_pars_fragment:Bp,tonemapping_fragment:Rp,tonemapping_pars_fragment:Cp,transmission_fragment:Lp,transmission_pars_fragment:Dp,uv_pars_fragment:Pp,uv_pars_vertex:Ip,uv_vertex:Np,worldpos_vertex:Up,background_vert:Fp,background_frag:Op,backgroundCube_vert:kp,backgroundCube_frag:zp,cube_vert:Gp,cube_frag:Wp,depth_vert:Hp,depth_frag:Vp,distance_vert:Xp,distance_frag:Yp,equirect_vert:qp,equirect_frag:Kp,linedashed_vert:Zp,linedashed_frag:$p,meshbasic_vert:Jp,meshbasic_frag:Qp,meshlambert_vert:jp,meshlambert_frag:em,meshmatcap_vert:tm,meshmatcap_frag:nm,meshnormal_vert:im,meshnormal_frag:rm,meshphong_vert:sm,meshphong_frag:am,meshphysical_vert:om,meshphysical_frag:lm,meshtoon_vert:cm,meshtoon_frag:um,points_vert:hm,points_frag:dm,shadow_vert:fm,shadow_frag:pm,sprite_vert:mm,sprite_frag:gm},fe={common:{diffuse:{value:new at(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ge}},envmap:{envMap:{value:null},envMapRotation:{value:new Ge},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ge}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ge}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ge},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ge},normalScale:{value:new He(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ge},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ge}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ge}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ge}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new at(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new W},probesMax:{value:new W},probesResolution:{value:new W}},points:{diffuse:{value:new at(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0},uvTransform:{value:new Ge}},sprite:{diffuse:{value:new at(16777215)},opacity:{value:1},center:{value:new He(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}}},mn={basic:{uniforms:Ft([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:Ft([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new at(0)},envMapIntensity:{value:1}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:Ft([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new at(0)},specular:{value:new at(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:Ft([fe.common,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.roughnessmap,fe.metalnessmap,fe.fog,fe.lights,{emissive:{value:new at(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:Ft([fe.common,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.gradientmap,fe.fog,fe.lights,{emissive:{value:new at(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:Ft([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:Ft([fe.points,fe.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:Ft([fe.common,fe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:Ft([fe.common,fe.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:Ft([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:Ft([fe.sprite,fe.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ge},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ge}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distance:{uniforms:Ft([fe.common,fe.displacementmap,{referencePosition:{value:new W},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distance_vert,fragmentShader:Xe.distance_frag},shadow:{uniforms:Ft([fe.lights,fe.fog,{color:{value:new at(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};mn.physical={uniforms:Ft([mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ge},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ge},clearcoatNormalScale:{value:new He(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ge},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ge},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ge},sheen:{value:0},sheenColor:{value:new at(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ge},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ge},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ge},transmissionSamplerSize:{value:new He},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ge},attenuationDistance:{value:0},attenuationColor:{value:new at(0)},specularColor:{value:new at(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ge},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ge},anisotropyVector:{value:new He},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ge}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};const Hr={r:0,b:0,g:0},_m=new Et,lc=new Ge;lc.set(-1,0,0,0,1,0,0,0,1);function xm(i,e,t,n,r,s){const a=new at(0);let c=r===!0?0:1,l,o,h=null,d=0,u=null;function f(v){let b=v.isScene===!0?v.background:null;if(b&&b.isTexture){const M=v.backgroundBlurriness>0;b=e.get(b,M)}return b}function g(v){let b=!1;const M=f(v);M===null?p(a,c):M&&M.isColor&&(p(M,1),b=!0);const y=i.xr.getEnvironmentBlendMode();y==="additive"?t.buffers.color.setClear(0,0,0,1,s):y==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(i.autoClear||b)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function _(v,b){const M=f(b);M&&(M.isCubeTexture||M.mapping===us)?(o===void 0&&(o=new Jt(new vr(1,1,1),new Wt({name:"BackgroundCubeMaterial",uniforms:Wi(mn.backgroundCube.uniforms),vertexShader:mn.backgroundCube.vertexShader,fragmentShader:mn.backgroundCube.fragmentShader,side:Gt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),o.geometry.deleteAttribute("normal"),o.geometry.deleteAttribute("uv"),o.onBeforeRender=function(y,T,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(o.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(o)),o.material.uniforms.envMap.value=M,o.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,o.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,o.material.uniforms.backgroundRotation.value.setFromMatrix4(_m.makeRotationFromEuler(b.backgroundRotation)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&o.material.uniforms.backgroundRotation.value.premultiply(lc),o.material.toneMapped=$e.getTransfer(M.colorSpace)!==ut,(h!==M||d!==M.version||u!==i.toneMapping)&&(o.material.needsUpdate=!0,h=M,d=M.version,u=i.toneMapping),o.layers.enableAll(),v.unshift(o,o.geometry,o.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new Jt(new Zn(2,2),new Wt({name:"BackgroundMaterial",uniforms:Wi(mn.background.uniforms),vertexShader:mn.background.vertexShader,fragmentShader:mn.background.fragmentShader,side:ci,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.toneMapped=$e.getTransfer(M.colorSpace)!==ut,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||d!==M.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=M,d=M.version,u=i.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function p(v,b){v.getRGB(Hr,rc(i)),t.buffers.color.setClear(Hr.r,Hr.g,Hr.b,b,s)}function m(){o!==void 0&&(o.geometry.dispose(),o.material.dispose(),o=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,b=1){a.set(v),c=b,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(v){c=v,p(a,c)},render:g,addToRenderList:_,dispose:m}}function vm(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=u(null);let s=r,a=!1;function c(D,O,X,U,z){let $=!1;const Z=d(D,U,X,O);s!==Z&&(s=Z,o(s.object)),$=f(D,U,X,z),$&&g(D,U,X,z),z!==null&&e.update(z,i.ELEMENT_ARRAY_BUFFER),($||a)&&(a=!1,M(D,O,X,U),z!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(z).buffer))}function l(){return i.createVertexArray()}function o(D){return i.bindVertexArray(D)}function h(D){return i.deleteVertexArray(D)}function d(D,O,X,U){const z=U.wireframe===!0;let $=n[O.id];$===void 0&&($={},n[O.id]=$);const Z=D.isInstancedMesh===!0?D.id:0;let se=$[Z];se===void 0&&(se={},$[Z]=se);let G=se[X.id];G===void 0&&(G={},se[X.id]=G);let J=G[z];return J===void 0&&(J=u(l()),G[z]=J),J}function u(D){const O=[],X=[],U=[];for(let z=0;z<t;z++)O[z]=0,X[z]=0,U[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:X,attributeDivisors:U,object:D,attributes:{},index:null}}function f(D,O,X,U){const z=s.attributes,$=O.attributes;let Z=0;const se=X.getAttributes();for(const G in se)if(se[G].location>=0){const ee=z[G];let Te=$[G];if(Te===void 0&&(G==="instanceMatrix"&&D.instanceMatrix&&(Te=D.instanceMatrix),G==="instanceColor"&&D.instanceColor&&(Te=D.instanceColor)),ee===void 0||ee.attribute!==Te||Te&&ee.data!==Te.data)return!0;Z++}return s.attributesNum!==Z||s.index!==U}function g(D,O,X,U){const z={},$=O.attributes;let Z=0;const se=X.getAttributes();for(const G in se)if(se[G].location>=0){let ee=$[G];ee===void 0&&(G==="instanceMatrix"&&D.instanceMatrix&&(ee=D.instanceMatrix),G==="instanceColor"&&D.instanceColor&&(ee=D.instanceColor));const Te={};Te.attribute=ee,ee&&ee.data&&(Te.data=ee.data),z[G]=Te,Z++}s.attributes=z,s.attributesNum=Z,s.index=U}function _(){const D=s.newAttributes;for(let O=0,X=D.length;O<X;O++)D[O]=0}function p(D){m(D,0)}function m(D,O){const X=s.newAttributes,U=s.enabledAttributes,z=s.attributeDivisors;X[D]=1,U[D]===0&&(i.enableVertexAttribArray(D),U[D]=1),z[D]!==O&&(i.vertexAttribDivisor(D,O),z[D]=O)}function v(){const D=s.newAttributes,O=s.enabledAttributes;for(let X=0,U=O.length;X<U;X++)O[X]!==D[X]&&(i.disableVertexAttribArray(X),O[X]=0)}function b(D,O,X,U,z,$,Z){Z===!0?i.vertexAttribIPointer(D,O,X,z,$):i.vertexAttribPointer(D,O,X,U,z,$)}function M(D,O,X,U){_();const z=U.attributes,$=X.getAttributes(),Z=O.defaultAttributeValues;for(const se in $){const G=$[se];if(G.location>=0){let J=z[se];if(J===void 0&&(se==="instanceMatrix"&&D.instanceMatrix&&(J=D.instanceMatrix),se==="instanceColor"&&D.instanceColor&&(J=D.instanceColor)),J!==void 0){const ee=J.normalized,Te=J.itemSize,Re=e.get(J);if(Re===void 0)continue;const ct=Re.buffer,qe=Re.type,Qe=Re.bytesPerElement,Q=qe===i.INT||qe===i.UNSIGNED_INT||J.gpuType===$a;if(J.isInterleavedBufferAttribute){const ie=J.data,be=ie.stride,ke=J.offset;if(ie.isInstancedInterleavedBuffer){for(let Se=0;Se<G.locationSize;Se++)m(G.location+Se,ie.meshPerAttribute);D.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let Se=0;Se<G.locationSize;Se++)p(G.location+Se);i.bindBuffer(i.ARRAY_BUFFER,ct);for(let Se=0;Se<G.locationSize;Se++)b(G.location+Se,Te/G.locationSize,qe,ee,be*Qe,(ke+Te/G.locationSize*Se)*Qe,Q)}else{if(J.isInstancedBufferAttribute){for(let ie=0;ie<G.locationSize;ie++)m(G.location+ie,J.meshPerAttribute);D.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let ie=0;ie<G.locationSize;ie++)p(G.location+ie);i.bindBuffer(i.ARRAY_BUFFER,ct);for(let ie=0;ie<G.locationSize;ie++)b(G.location+ie,Te/G.locationSize,qe,ee,Te*Qe,Te/G.locationSize*ie*Qe,Q)}}else if(Z!==void 0){const ee=Z[se];if(ee!==void 0)switch(ee.length){case 2:i.vertexAttrib2fv(G.location,ee);break;case 3:i.vertexAttrib3fv(G.location,ee);break;case 4:i.vertexAttrib4fv(G.location,ee);break;default:i.vertexAttrib1fv(G.location,ee)}}}}v()}function y(){B();for(const D in n){const O=n[D];for(const X in O){const U=O[X];for(const z in U){const $=U[z];for(const Z in $)h($[Z].object),delete $[Z];delete U[z]}}delete n[D]}}function T(D){if(n[D.id]===void 0)return;const O=n[D.id];for(const X in O){const U=O[X];for(const z in U){const $=U[z];for(const Z in $)h($[Z].object),delete $[Z];delete U[z]}}delete n[D.id]}function C(D){for(const O in n){const X=n[O];for(const U in X){const z=X[U];if(z[D.id]===void 0)continue;const $=z[D.id];for(const Z in $)h($[Z].object),delete $[Z];delete z[D.id]}}}function E(D){for(const O in n){const X=n[O],U=D.isInstancedMesh===!0?D.id:0,z=X[U];if(z!==void 0){for(const $ in z){const Z=z[$];for(const se in Z)h(Z[se].object),delete Z[se];delete z[$]}delete X[U],Object.keys(X).length===0&&delete n[O]}}}function B(){L(),a=!0,s!==r&&(s=r,o(s.object))}function L(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:c,reset:B,resetDefaultState:L,dispose:y,releaseStatesOfGeometry:T,releaseStatesOfObject:E,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:p,disableUnusedAttributes:v}}function Mm(i,e,t){let n;function r(l){n=l}function s(l,o){i.drawArrays(n,l,o),t.update(o,n,1)}function a(l,o,h){h!==0&&(i.drawArraysInstanced(n,l,o,h),t.update(o,n,h))}function c(l,o,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,o,0,h);let u=0;for(let f=0;f<h;f++)u+=o[f];t.update(u,n,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=c}function Sm(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(C){return!(C!==nn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function c(C){const E=C===Sn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==Zt&&C!==gn&&!E&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let o=t.precision!==void 0?t.precision:"highp";const h=l(o);h!==o&&(ze("WebGLRenderer:",o,"not supported, using",h,"instead."),o=h);const d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&ze("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),y=i.getParameter(i.MAX_SAMPLES),T=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:c,precision:o,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:v,maxVaryings:b,maxFragmentUniforms:M,maxSamples:y,samples:T}}function bm(i){const e=this;let t=null,n=0,r=!1,s=!1;const a=new Xn,c=new Ge,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||n!==0||r;return r=u,n=d.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){const g=d.clippingPlanes,_=d.clipIntersection,p=d.clipShadows,m=i.get(d);if(!r||g===null||g.length===0||s&&!p)s?h(null):o();else{const v=s?0:n,b=v*4;let M=m.clippingState||null;l.value=M,M=h(g,u,b,f);for(let y=0;y!==b;++y)M[y]=t[y];m.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function o(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,u,f,g){const _=d!==null?d.length:0;let p=null;if(_!==0){if(p=l.value,g!==!0||p===null){const m=f+_*4,v=u.matrixWorldInverse;c.getNormalMatrix(v),(p===null||p.length<m)&&(p=new Float32Array(m));for(let b=0,M=f;b!==_;++b,M+=4)a.copy(d[b]).applyMatrix4(v,c),a.normal.toArray(p,M),p[M+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,p}}const Pi=4,Em=6,ym=20,wm=256,er=new ao,Zo=new at;let Ys=null,qs=0,Ks=0,Zs=!1;const Tm=new W,ti=new W;class $o{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){const{size:a=256,position:c=Tm}=s;Ys=this._renderer.getRenderTarget(),qs=this._renderer.getActiveCubeFace(),Ks=this._renderer.getActiveMipmapLevel(),Zs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,r,l,c),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=jo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Qo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ys,qs,Ks),this._renderer.xr.enabled=Zs,e.scissorTest=!1,Bi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ui||e.mapping===Gi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ys=this._renderer.getRenderTarget(),qs=this._renderer.getActiveCubeFace(),Ks=this._renderer.getActiveMipmapLevel(),Zs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:bt,minFilter:bt,generateMipmaps:!1,type:Sn,format:nn,colorSpace:hr,depthBuffer:!1},r=Jo(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Jo(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Am(s)),this._blurMaterial=Rm(s,e,t),this._ggxMaterial=Bm(s,e,t)}return r}_compileMaterial(e){const t=new Jt(new bn,e);this._renderer.compile(t,er)}_sceneToCubeUV(e,t,n,r,s){const l=new tn(90,1,t,n),o=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(Zo),d.toneMapping=xn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Jt(new vr,new ec({name:"PMREM.Background",side:Gt,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,p=_.material;let m=!1;const v=e.background;v?v.isColor&&(p.color.copy(v),e.background=null,m=!0):(p.color.copy(Zo),m=!0);for(let b=0;b<6;b++){const M=b%3;M===0?(l.up.set(0,o[b],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+h[b],s.y,s.z)):M===1?(l.up.set(0,0,o[b]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+h[b],s.z)):(l.up.set(0,o[b],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+h[b]));const y=this._cubeSize;Bi(r,M*y,b>2?y:0,y,y),d.setRenderTarget(r),m&&d.render(_,l),d.render(e,l)}d.toneMapping=f,d.autoClear=u,e.background=v}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===ui||e.mapping===Gi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=jo()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Qo());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const c=s.uniforms;c.envMap.value=e;const l=this._cubeSize;Bi(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,er)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,c=this._lodMeshes[n];c.material=a;const l=a.uniforms,o=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),d=Math.sqrt(o*o-h*h),u=o*1.25,f=d*u,{_lodMax:g}=this,_=this._sizeLods[n],p=3*_*(n>g-Pi?n-g+Pi:0),m=4*(this._cubeSize-_);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=g-t,Bi(s,p,m,3*_,2*_),r.setRenderTarget(s),r.render(c,er),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=g-n,Bi(e,p,m,3*_,2*_),r.setRenderTarget(e),r.render(c,er)}_blur(e,t,n,r){const s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,n,a),this._blurPass(s,e,n,n,a)}_blurPass(e,t,n,r,s){const a=this._renderer,c=this._blurMaterial,l=this._lodMeshes[r];l.material=c;const o=c.uniforms;o.envMap.value=e.texture,o.sigma.value=s,o.mipInt.value=this._lodMax-n;const h=this._sizeLods[r],d=3*h*(r>this._lodMax-Pi?r-this._lodMax+Pi:0),u=4*(this._cubeSize-h);Bi(t,d,u,3*h,2*h),a.setRenderTarget(t),a.render(l,er)}}function Am(i){const e=[],t=[];let n=i;const r=i-Pi+1+Em;for(let s=0;s<r;s++){const a=Math.pow(2,n);e.push(a);const c=1/(a-2),l=-c,o=1+c,h=[l,l,o,l,o,o,l,l,o,o,l,o],d=6,u=6,f=3,g=new Float32Array(f*u*d),_=new Float32Array(f*u*d);for(let m=0;m<d;m++){const v=m%3*2/3-1,b=m>2?0:-1,M=[v,b,0,v+2/3,b,0,v+2/3,b+1,0,v,b,0,v+2/3,b+1,0,v,b+1,0];g.set(M,f*u*m);for(let y=0;y<u;y++){const T=h[y*2]*2-1,C=h[y*2+1]*2-1;m===0?ti.set(1,C,T):m===1?ti.set(-T,1,-C):m===2?ti.set(-T,C,1):m===3?ti.set(-1,C,-T):m===4?ti.set(-T,-1,C):ti.set(T,C,-1),ti.toArray(_,(m*u+y)*f)}}const p=new bn;p.setAttribute("position",new vn(g,f)),p.setAttribute("outputDirection",new vn(_,f)),t.push(new Jt(p,null)),n>Pi&&n--}return{lodMeshes:t,sizeLods:e}}function Jo(i,e,t){const n=new rn(i,e,t);return n.texture.mapping=us,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Bi(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function Bm(i,e,t){return new Wt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:wm,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ds(),fragmentShader:`

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
		`,blending:Pn,depthTest:!1,depthWrite:!1})}function Rm(i,e,t){return new Wt({name:"SphericalGaussianBlur",defines:{SAMPLES:ym,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:ds(),fragmentShader:`

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
		`,blending:Pn,depthTest:!1,depthWrite:!1})}function Qo(){return new Wt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ds(),fragmentShader:`

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
		`,blending:Pn,depthTest:!1,depthWrite:!1})}function jo(){return new Wt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ds(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Pn,depthTest:!1,depthWrite:!1})}function ds(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class cc extends rn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new nc(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new vr(5,5,5),s=new Wt({name:"CubemapFromEquirect",uniforms:Wi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Gt,blending:Pn});s.uniforms.tEquirect.value=t;const a=new Jt(r,s),c=t.minFilter;return t.minFilter===si&&(t.minFilter=bt),new Dd(1,10,this).update(e,a),t.minFilter=c,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}}function Cm(i){let e=new WeakMap,t=new WeakMap,n=null;function r(u,f=!1){return u==null?null:f?a(u):s(u)}function s(u){if(u&&u.isTexture){const f=u.mapping;if(f===Ms||f===Ss)if(e.has(u)){const g=e.get(u).texture;return c(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const _=new cc(g.height);return _.fromEquirectangularTexture(i,u),e.set(u,_),u.addEventListener("dispose",o),c(_.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const f=u.mapping,g=f===Ms||f===Ss,_=f===ui||f===Gi;if(g||_){let p=t.get(u);const m=p!==void 0?p.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==m)return n===null&&(n=new $o(i)),p=g?n.fromEquirectangular(u,p):n.fromCubemap(u,p),p.texture.pmremVersion=u.pmremVersion,t.set(u,p),p.texture;if(p!==void 0)return p.texture;{const v=u.image;return g&&v&&v.height>0||_&&v&&l(v)?(n===null&&(n=new $o(i)),p=g?n.fromEquirectangular(u):n.fromCubemap(u),p.texture.pmremVersion=u.pmremVersion,t.set(u,p),u.addEventListener("dispose",h),p.texture):null}}}return u}function c(u,f){return f===Ms?u.mapping=ui:f===Ss&&(u.mapping=Gi),u}function l(u){let f=0;const g=6;for(let _=0;_<g;_++)u[_]!==void 0&&f++;return f===g}function o(u){const f=u.target;f.removeEventListener("dispose",o);const g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function h(u){const f=u.target;f.removeEventListener("dispose",h);const g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:d}}function Lm(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&Ni("WebGLRenderer: "+n+" extension not supported."),r}}}function Dm(i,e,t,n){const r={},s=new WeakMap;function a(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete r[u.id];const f=s.get(u);f&&(e.remove(f),s.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function c(d,u){return r[u.id]===!0||(u.addEventListener("dispose",a),r[u.id]=!0,t.memory.geometries++),u}function l(d){const u=d.attributes;for(const f in u)e.update(u[f],i.ARRAY_BUFFER)}function o(d){const u=[],f=d.index,g=d.attributes.position;let _=0;if(g===void 0)return;if(f!==null){const v=f.array;_=f.version;for(let b=0,M=v.length;b<M;b+=3){const y=v[b+0],T=v[b+1],C=v[b+2];u.push(y,T,T,C,C,y)}}else{const v=g.array;_=g.version;for(let b=0,M=v.length/3-1;b<M;b+=3){const y=b+0,T=b+1,C=b+2;u.push(y,T,T,C,C,y)}}const p=new(g.count>=65535?jl:Ql)(u,1);p.version=_;const m=s.get(d);m&&e.remove(m),s.set(d,p)}function h(d){const u=s.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&o(d)}else o(d);return s.get(d)}return{get:c,update:l,getWireframeAttribute:h}}function Pm(i,e,t){let n;function r(d){n=d}let s,a;function c(d){s=d.type,a=d.bytesPerElement}function l(d,u){i.drawElements(n,u,s,d*a),t.update(u,n,1)}function o(d,u,f){f!==0&&(i.drawElementsInstanced(n,u,s,d*a,f),t.update(u,n,f))}function h(d,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,s,d,0,f);let _=0;for(let p=0;p<f;p++)_+=u[p];t.update(_,n,1)}this.setMode=r,this.setIndex=c,this.render=l,this.renderInstances=o,this.renderMultiDraw=h}function Im(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,c){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=c*(s/3);break;case i.LINES:t.lines+=c*(s/2);break;case i.LINE_STRIP:t.lines+=c*(s-1);break;case i.LINE_LOOP:t.lines+=c*s;break;case i.POINTS:t.points+=c*s;break;default:rt("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function Nm(i,e,t){const n=new WeakMap,r=new xt;function s(a,c,l){const o=a.morphTargetInfluences,h=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(c);if(u===void 0||u.count!==d){let B=function(){C.dispose(),n.delete(c),c.removeEventListener("dispose",B)};u!==void 0&&u.texture.dispose();const f=c.morphAttributes.position!==void 0,g=c.morphAttributes.normal!==void 0,_=c.morphAttributes.color!==void 0,p=c.morphAttributes.position||[],m=c.morphAttributes.normal||[],v=c.morphAttributes.color||[];let b=0;f===!0&&(b=1),g===!0&&(b=2),_===!0&&(b=3);let M=c.attributes.position.count*b,y=1;M>e.maxTextureSize&&(y=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const T=new Float32Array(M*y*4*d),C=new Zl(T,M,y,d);C.type=gn,C.needsUpdate=!0;const E=b*4;for(let L=0;L<d;L++){const D=p[L],O=m[L],X=v[L],U=M*y*4*L;for(let z=0;z<D.count;z++){const $=z*E;f===!0&&(r.fromBufferAttribute(D,z),T[U+$+0]=r.x,T[U+$+1]=r.y,T[U+$+2]=r.z,T[U+$+3]=0),g===!0&&(r.fromBufferAttribute(O,z),T[U+$+4]=r.x,T[U+$+5]=r.y,T[U+$+6]=r.z,T[U+$+7]=0),_===!0&&(r.fromBufferAttribute(X,z),T[U+$+8]=r.x,T[U+$+9]=r.y,T[U+$+10]=r.z,T[U+$+11]=X.itemSize===4?r.w:1)}}u={count:d,texture:C,size:new He(M,y)},n.set(c,u),c.addEventListener("dispose",B)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let f=0;for(let _=0;_<o.length;_++)f+=o[_];const g=c.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",o)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:s}}function Um(i,e,t,n,r){let s=new WeakMap;function a(o){const h=r.render.frame,d=o.geometry,u=e.get(o,d);if(s.get(u)!==h&&(e.update(u),s.set(u,h)),o.isInstancedMesh&&(o.hasEventListener("dispose",l)===!1&&o.addEventListener("dispose",l),s.get(o)!==h&&(t.update(o.instanceMatrix,i.ARRAY_BUFFER),o.instanceColor!==null&&t.update(o.instanceColor,i.ARRAY_BUFFER),s.set(o,h))),o.isSkinnedMesh){const f=o.skeleton;s.get(f)!==h&&(f.update(),s.set(f,h))}return u}function c(){s=new WeakMap}function l(o){const h=o.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:c}}const Fm={[Pl]:"LINEAR_TONE_MAPPING",[Il]:"REINHARD_TONE_MAPPING",[Nl]:"CINEON_TONE_MAPPING",[Ul]:"ACES_FILMIC_TONE_MAPPING",[Ol]:"AGX_TONE_MAPPING",[kl]:"NEUTRAL_TONE_MAPPING",[Fl]:"CUSTOM_TONE_MAPPING"};function Om(i,e,t,n,r,s){const a=new rn(e,t,{type:i,depthBuffer:r,stencilBuffer:s,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let c=null,l=null;const o=new bn;o.setAttribute("position",new Nn([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new Nn([0,2,0,0,2,0],2));const h=new Bd({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new Jt(o,h),u=new ao(-1,1,1,-1,0,1);let f=null,g=null,_=!1,p,m=null,v=[],b=!1;this.setSize=function(M,y){a.setSize(M,y),c!==null&&c.setSize(M,y),l!==null&&l.setSize(M,y);for(let T=0;T<v.length;T++){const C=v[T];C.setSize&&C.setSize(M,y)}},this.setEffects=function(M){v=M,b=v.length>0&&v[0].isRenderPass===!0;const y=a.width,T=a.height;v.length>0&&c===null&&(c=new rn(y,T,{type:Sn,depthBuffer:!1,stencilBuffer:!1}),l=new rn(y,T,{type:Sn,depthBuffer:!1,stencilBuffer:!1}));for(let C=0;C<v.length;C++){const E=v[C];E.setSize&&E.setSize(y,T)}},this.begin=function(M,y){if(_||M.toneMapping===xn&&v.length===0)return!1;if(m=y,y!==null){const T=y.width,C=y.height;(a.width!==T||a.height!==C)&&this.setSize(T,C)}return b===!1&&M.setRenderTarget(a),p=M.toneMapping,M.toneMapping=xn,!0},this.hasRenderPass=function(){return b},this.end=function(M,y){M.toneMapping=p,_=!0;let T=a,C=c;for(let E=0;E<v.length;E++){const B=v[E];B.enabled!==!1&&(B.render(M,C,T,y),B.needsSwap!==!1&&(T=C,C=C===c?l:c))}if(f!==M.outputColorSpace||g!==M.toneMapping){f=M.outputColorSpace,g=M.toneMapping,h.defines={},$e.getTransfer(f)===ut&&(h.defines.SRGB_TRANSFER="");const E=Fm[g];E&&(h.defines[E]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=T.texture,M.setRenderTarget(m),M.render(d,u),m=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){a.dispose(),c!==null&&c.dispose(),l!==null&&l.dispose(),o.dispose(),h.dispose()}}const uc=new kt,Ga=new dr(1,1),hc=new Zl,dc=new rd,fc=new nc,el=[],tl=[],nl=new Float32Array(16),il=new Float32Array(9),rl=new Float32Array(4);function Ki(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=el[r];if(s===void 0&&(s=new Float32Array(r),el[r]=s),e!==0){n.toArray(s,0);for(let a=1,c=0;a!==e;++a)c+=t,i[a].toArray(s,c)}return s}function At(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Bt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function fs(i,e){let t=tl[e];t===void 0&&(t=new Int32Array(e),tl[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function km(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function zm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(At(t,e))return;i.uniform2fv(this.addr,e),Bt(t,e)}}function Gm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(At(t,e))return;i.uniform3fv(this.addr,e),Bt(t,e)}}function Wm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(At(t,e))return;i.uniform4fv(this.addr,e),Bt(t,e)}}function Hm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(At(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Bt(t,e)}else{if(At(t,n))return;rl.set(n),i.uniformMatrix2fv(this.addr,!1,rl),Bt(t,n)}}function Vm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(At(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Bt(t,e)}else{if(At(t,n))return;il.set(n),i.uniformMatrix3fv(this.addr,!1,il),Bt(t,n)}}function Xm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(At(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Bt(t,e)}else{if(At(t,n))return;nl.set(n),i.uniformMatrix4fv(this.addr,!1,nl),Bt(t,n)}}function Ym(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function qm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(At(t,e))return;i.uniform2iv(this.addr,e),Bt(t,e)}}function Km(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(At(t,e))return;i.uniform3iv(this.addr,e),Bt(t,e)}}function Zm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(At(t,e))return;i.uniform4iv(this.addr,e),Bt(t,e)}}function $m(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Jm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(At(t,e))return;i.uniform2uiv(this.addr,e),Bt(t,e)}}function Qm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(At(t,e))return;i.uniform3uiv(this.addr,e),Bt(t,e)}}function jm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(At(t,e))return;i.uniform4uiv(this.addr,e),Bt(t,e)}}function e0(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(Ga.compareFunction=t.isReversedDepthBuffer()?io:no,s=Ga):s=uc,t.setTexture2D(e||s,r)}function t0(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||dc,r)}function n0(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||fc,r)}function i0(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||hc,r)}function r0(i){switch(i){case 5126:return km;case 35664:return zm;case 35665:return Gm;case 35666:return Wm;case 35674:return Hm;case 35675:return Vm;case 35676:return Xm;case 5124:case 35670:return Ym;case 35667:case 35671:return qm;case 35668:case 35672:return Km;case 35669:case 35673:return Zm;case 5125:return $m;case 36294:return Jm;case 36295:return Qm;case 36296:return jm;case 35678:case 36198:case 36298:case 36306:case 35682:return e0;case 35679:case 36299:case 36307:return t0;case 35680:case 36300:case 36308:case 36293:return n0;case 36289:case 36303:case 36311:case 36292:return i0}}function s0(i,e){i.uniform1fv(this.addr,e)}function a0(i,e){const t=Ki(e,this.size,2);i.uniform2fv(this.addr,t)}function o0(i,e){const t=Ki(e,this.size,3);i.uniform3fv(this.addr,t)}function l0(i,e){const t=Ki(e,this.size,4);i.uniform4fv(this.addr,t)}function c0(i,e){const t=Ki(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function u0(i,e){const t=Ki(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function h0(i,e){const t=Ki(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function d0(i,e){i.uniform1iv(this.addr,e)}function f0(i,e){i.uniform2iv(this.addr,e)}function p0(i,e){i.uniform3iv(this.addr,e)}function m0(i,e){i.uniform4iv(this.addr,e)}function g0(i,e){i.uniform1uiv(this.addr,e)}function _0(i,e){i.uniform2uiv(this.addr,e)}function x0(i,e){i.uniform3uiv(this.addr,e)}function v0(i,e){i.uniform4uiv(this.addr,e)}function M0(i,e,t){const n=this.cache,r=e.length,s=fs(t,r);At(n,s)||(i.uniform1iv(this.addr,s),Bt(n,s));let a;this.type===i.SAMPLER_2D_SHADOW?a=Ga:a=uc;for(let c=0;c!==r;++c)t.setTexture2D(e[c]||a,s[c])}function S0(i,e,t){const n=this.cache,r=e.length,s=fs(t,r);At(n,s)||(i.uniform1iv(this.addr,s),Bt(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||dc,s[a])}function b0(i,e,t){const n=this.cache,r=e.length,s=fs(t,r);At(n,s)||(i.uniform1iv(this.addr,s),Bt(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||fc,s[a])}function E0(i,e,t){const n=this.cache,r=e.length,s=fs(t,r);At(n,s)||(i.uniform1iv(this.addr,s),Bt(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||hc,s[a])}function y0(i){switch(i){case 5126:return s0;case 35664:return a0;case 35665:return o0;case 35666:return l0;case 35674:return c0;case 35675:return u0;case 35676:return h0;case 5124:case 35670:return d0;case 35667:case 35671:return f0;case 35668:case 35672:return p0;case 35669:case 35673:return m0;case 5125:return g0;case 36294:return _0;case 36295:return x0;case 36296:return v0;case 35678:case 36198:case 36298:case 36306:case 35682:return M0;case 35679:case 36299:case 36307:return S0;case 35680:case 36300:case 36308:case 36293:return b0;case 36289:case 36303:case 36311:case 36292:return E0}}class w0{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=r0(t.type)}}class T0{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=y0(t.type)}}class A0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const c=r[s];c.setValue(e,t[c.id],n)}}}const $s=/(\w+)(\])?(\[|\.)?/g;function sl(i,e){i.seq.push(e),i.map[e.id]=e}function B0(i,e,t){const n=i.name,r=n.length;for($s.lastIndex=0;;){const s=$s.exec(n),a=$s.lastIndex;let c=s[1];const l=s[2]==="]",o=s[3];if(l&&(c=c|0),o===void 0||o==="["&&a+2===r){sl(t,o===void 0?new w0(c,i,e):new T0(c,i,e));break}else{let d=t.map[c];d===void 0&&(d=new A0(c),sl(t,d)),t=d}}}class es{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const c=e.getActiveUniform(t,a),l=e.getUniformLocation(t,c.name);B0(c,l,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){const c=t[s],l=n[c.id];l.needsUpdate!==!1&&c.setValue(e,l.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&n.push(a)}return n}}function al(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const R0=37297;let C0=0;function L0(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const c=a+1;n.push(`${c===e?">":" "} ${c}: ${t[a]}`)}return n.join(`
`)}const ol=new Ge;function D0(i){$e._getMatrix(ol,$e.workingColorSpace,i);const e=`mat3( ${ol.elements.map(t=>t.toFixed(4))} )`;switch($e.getTransfer(i)){case rs:return[e,"LinearTransferOETF"];case ut:return[e,"sRGBTransferOETF"];default:return ze("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function ll(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const c=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+L0(i.getShaderSource(e),c)}else return s}function P0(i,e){const t=D0(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const I0={[Pl]:"Linear",[Il]:"Reinhard",[Nl]:"Cineon",[Ul]:"ACESFilmic",[Ol]:"AgX",[kl]:"Neutral",[Fl]:"Custom"};function N0(i,e){const t=I0[e];return t===void 0?(ze("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Vr=new W;function U0(){$e.getLuminanceCoefficients(Vr);const i=Vr.x.toFixed(4),e=Vr.y.toFixed(4),t=Vr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function F0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(rr).join(`
`)}function O0(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function k0(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),a=s.name;let c=1;s.type===i.FLOAT_MAT2&&(c=2),s.type===i.FLOAT_MAT3&&(c=3),s.type===i.FLOAT_MAT4&&(c=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:c}}return t}function rr(i){return i!==""}function cl(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ul(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const z0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Wa(i){return i.replace(z0,W0)}const G0=new Map;function W0(i,e){let t=Xe[e];if(t===void 0){const n=G0.get(e);if(n!==void 0)t=Xe[n],ze('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Wa(t)}const H0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function hl(i){return i.replace(H0,V0)}function V0(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function dl(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}const X0={[Zr]:"SHADOWMAP_TYPE_PCF",[ir]:"SHADOWMAP_TYPE_VSM"};function Y0(i){return X0[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const q0={[ui]:"ENVMAP_TYPE_CUBE",[Gi]:"ENVMAP_TYPE_CUBE",[us]:"ENVMAP_TYPE_CUBE_UV"};function K0(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":q0[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const Z0={[Gi]:"ENVMAP_MODE_REFRACTION"};function $0(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Z0[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const J0={[Dl]:"ENVMAP_BLENDING_MULTIPLY",[Ih]:"ENVMAP_BLENDING_MIX",[Nh]:"ENVMAP_BLENDING_ADD"};function Q0(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":J0[i.combine]||"ENVMAP_BLENDING_NONE"}function j0(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function eg(i,e,t,n){const r=i.getContext(),s=t.defines;let a=t.vertexShader,c=t.fragmentShader;const l=Y0(t),o=K0(t),h=$0(t),d=Q0(t),u=j0(t),f=F0(t),g=O0(s),_=r.createProgram();let p,m,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(rr).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(rr).join(`
`),m.length>0&&(m+=`
`)):(p=[dl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(rr).join(`
`),m=[dl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+o:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==xn?"#define TONE_MAPPING":"",t.toneMapping!==xn?Xe.tonemapping_pars_fragment:"",t.toneMapping!==xn?N0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,P0("linearToOutputTexel",t.outputColorSpace),U0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(rr).join(`
`)),a=Wa(a),a=cl(a,t),a=ul(a,t),c=Wa(c),c=cl(c,t),c=ul(c,t),a=hl(a),c=hl(c),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",t.glslVersion===Bo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Bo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const b=v+p+a,M=v+m+c,y=al(r,r.VERTEX_SHADER,b),T=al(r,r.FRAGMENT_SHADER,M);r.attachShader(_,y),r.attachShader(_,T),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function C(D){if(i.debug.checkShaderErrors){const O=r.getProgramInfoLog(_)||"",X=r.getShaderInfoLog(y)||"",U=r.getShaderInfoLog(T)||"",z=O.trim(),$=X.trim(),Z=U.trim();let se=!0,G=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(se=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,_,y,T);else{const J=ll(r,y,"vertex"),ee=ll(r,T,"fragment");rt("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+z+`
`+J+`
`+ee)}else z!==""?ze("WebGLProgram: Program Info Log:",z):($===""||Z==="")&&(G=!1);G&&(D.diagnostics={runnable:se,programLog:z,vertexShader:{log:$,prefix:p},fragmentShader:{log:Z,prefix:m}})}r.deleteShader(y),r.deleteShader(T),E=new es(r,_),B=k0(r,_)}let E;this.getUniforms=function(){return E===void 0&&C(this),E};let B;this.getAttributes=function(){return B===void 0&&C(this),B};let L=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=r.getProgramParameter(_,R0)),L},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=C0++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=y,this.fragmentShader=T,this}let tg=0;class ng{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new ig(e),t.set(e,n)),n}}class ig{constructor(e){this.id=tg++,this.code=e,this.usedTimes=0}}function rg(i){return i===hi||i===ns||i===is}function sg(i,e,t,n,r,s){const a=new $l,c=new ng,l=new Set,o=[],h=new Map,d=n.logarithmicDepthBuffer;let u=n.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(E){return l.add(E),E===0?"uv":`uv${E}`}function _(E,B,L,D,O,X){const U=D.fog,z=O.geometry,$=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?D.environment:null,Z=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap,se=e.get(E.envMap||$,Z),G=se&&se.mapping===us?se.image.height:null,J=f[E.type];E.precision!==null&&(u=n.getMaxPrecision(E.precision),u!==E.precision&&ze("WebGLProgram.getParameters:",E.precision,"not supported, using",u,"instead."));const ee=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,Te=ee!==void 0?ee.length:0;let Re=0;z.morphAttributes.position!==void 0&&(Re=1),z.morphAttributes.normal!==void 0&&(Re=2),z.morphAttributes.color!==void 0&&(Re=3);let ct,qe,Qe,Q;if(J){const pt=mn[J];ct=pt.vertexShader,qe=pt.fragmentShader}else{ct=E.vertexShader,qe=E.fragmentShader;const pt=c.getVertexShaderStage(E),ot=c.getFragmentShaderStage(E);c.update(E,pt,ot),Qe=pt.id,Q=ot.id}const ie=i.getRenderTarget(),be=i.state.buffers.depth.getReversed(),ke=O.isInstancedMesh===!0,Se=O.isBatchedMesh===!0,q=!!E.map,ve=!!E.matcap,ge=!!se,Pe=!!E.aoMap,Ce=!!E.lightMap,Me=!!E.bumpMap&&E.wireframe===!1,Ye=!!E.normalMap,je=!!E.displacementMap,dt=!!E.emissiveMap,et=!!E.metalnessMap,tt=!!E.roughnessMap,P=E.anisotropy>0,vt=E.clearcoat>0,nt=E.dispersion>0,A=E.retroreflectivity>0,S=E.iridescence>0,F=E.sheen>0,k=E.transmission>0,K=P&&!!E.anisotropyMap,ae=vt&&!!E.clearcoatMap,oe=vt&&!!E.clearcoatNormalMap,j=vt&&!!E.clearcoatRoughnessMap,ne=S&&!!E.iridescenceMap,le=S&&!!E.iridescenceThicknessMap,Ie=F&&!!E.sheenColorMap,de=F&&!!E.sheenRoughnessMap,ce=!!E.specularMap,Ne=!!E.specularColorMap,Oe=!!E.specularIntensityMap,We=k&&!!E.transmissionMap,N=k&&!!E.thicknessMap,ue=!!E.gradientMap,te=!!E.alphaMap,he=E.alphaTest>0,xe=!!E.alphaHash,re=!!E.extensions;let Ue=xn;E.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(Ue=i.toneMapping);const Le={shaderID:J,shaderType:E.type,shaderName:E.name,vertexShader:ct,fragmentShader:qe,defines:E.defines,customVertexShaderID:Qe,customFragmentShaderID:Q,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:u,batching:Se,batchingColor:Se&&O._colorsTexture!==null,instancing:ke,instancingColor:ke&&O.instanceColor!==null,instancingMorph:ke&&O.morphTexture!==null,outputColorSpace:ie===null?i.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:$e.workingColorSpace,alphaToCoverage:!!E.alphaToCoverage,map:q,matcap:ve,envMap:ge,envMapMode:ge&&se.mapping,envMapCubeUVHeight:G,aoMap:Pe,lightMap:Ce,bumpMap:Me,normalMap:Ye,displacementMap:je,emissiveMap:dt,normalMapObjectSpace:Ye&&E.normalMapType===Oh,normalMapTangentSpace:Ye&&E.normalMapType===Ao,packedNormalMap:Ye&&E.normalMapType===Ao&&rg(E.normalMap.format),metalnessMap:et,roughnessMap:tt,anisotropy:P,anisotropyMap:K,clearcoat:vt,clearcoatMap:ae,clearcoatNormalMap:oe,clearcoatRoughnessMap:j,dispersion:nt,retroreflection:A,iridescence:S,iridescenceMap:ne,iridescenceThicknessMap:le,sheen:F,sheenColorMap:Ie,sheenRoughnessMap:de,specularMap:ce,specularColorMap:Ne,specularIntensityMap:Oe,transmission:k,transmissionMap:We,thicknessMap:N,gradientMap:ue,opaque:E.transparent===!1&&E.blending===ar&&E.alphaToCoverage===!1,alphaMap:te,alphaTest:he,alphaHash:xe,combine:E.combine,mapUv:q&&g(E.map.channel),aoMapUv:Pe&&g(E.aoMap.channel),lightMapUv:Ce&&g(E.lightMap.channel),bumpMapUv:Me&&g(E.bumpMap.channel),normalMapUv:Ye&&g(E.normalMap.channel),displacementMapUv:je&&g(E.displacementMap.channel),emissiveMapUv:dt&&g(E.emissiveMap.channel),metalnessMapUv:et&&g(E.metalnessMap.channel),roughnessMapUv:tt&&g(E.roughnessMap.channel),anisotropyMapUv:K&&g(E.anisotropyMap.channel),clearcoatMapUv:ae&&g(E.clearcoatMap.channel),clearcoatNormalMapUv:oe&&g(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:j&&g(E.clearcoatRoughnessMap.channel),iridescenceMapUv:ne&&g(E.iridescenceMap.channel),iridescenceThicknessMapUv:le&&g(E.iridescenceThicknessMap.channel),sheenColorMapUv:Ie&&g(E.sheenColorMap.channel),sheenRoughnessMapUv:de&&g(E.sheenRoughnessMap.channel),specularMapUv:ce&&g(E.specularMap.channel),specularColorMapUv:Ne&&g(E.specularColorMap.channel),specularIntensityMapUv:Oe&&g(E.specularIntensityMap.channel),transmissionMapUv:We&&g(E.transmissionMap.channel),thicknessMapUv:N&&g(E.thicknessMap.channel),alphaMapUv:te&&g(E.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(Ye||P),vertexNormals:!!z.attributes.normal,vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!z.attributes.uv&&(q||te),fog:!!U,useFog:E.fog===!0,fogExp2:!!U&&U.isFogExp2,flatShading:E.wireframe===!1&&(E.flatShading===!0||z.attributes.normal===void 0&&Ye===!1&&(E.isMeshLambertMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isMeshPhysicalMaterial)),sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:be,skinning:O.isSkinnedMesh===!0,hasPositionAttribute:z.attributes.position!==void 0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:Te,morphTextureStride:Re,numSunLights:B.sun.length,numDirLights:B.directional.length,numPointLights:B.point.length,numSpotLights:B.spot.length,numSpotLightMaps:B.spotLightMap.length,numRectAreaLights:B.rectArea.length,numHemiLights:B.hemi.length,numSunLightShadows:B.sunShadowMap.length,numDirLightShadows:B.directionalShadowMap.length,numPointLightShadows:B.pointShadowMap.length,numSpotLightShadows:B.spotShadowMap.length,numSpotLightShadowsWithMaps:B.numSpotLightShadowsWithMaps,numLightProbes:B.numLightProbes,numLightProbeGrids:X.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ue,decodeVideoTexture:q&&E.map.isVideoTexture===!0&&$e.getTransfer(E.map.colorSpace)===ut,decodeVideoTextureEmissive:dt&&E.emissiveMap.isVideoTexture===!0&&$e.getTransfer(E.emissiveMap.colorSpace)===ut,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===Cn,flipSided:E.side===Gt,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:re&&E.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(re&&E.extensions.multiDraw===!0||Se)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return Le.vertexUv1s=l.has(1),Le.vertexUv2s=l.has(2),Le.vertexUv3s=l.has(3),l.clear(),Le}function p(E){const B=[];if(E.shaderID?B.push(E.shaderID):(B.push(E.customVertexShaderID),B.push(E.customFragmentShaderID)),E.defines!==void 0)for(const L in E.defines)B.push(L),B.push(E.defines[L]);return E.isRawShaderMaterial===!1&&(m(B,E),v(B,E),B.push(i.outputColorSpace)),B.push(E.customProgramCacheKey),B.join()}function m(E,B){E.push(B.precision),E.push(B.outputColorSpace),E.push(B.envMapMode),E.push(B.envMapCubeUVHeight),E.push(B.mapUv),E.push(B.alphaMapUv),E.push(B.lightMapUv),E.push(B.aoMapUv),E.push(B.bumpMapUv),E.push(B.normalMapUv),E.push(B.displacementMapUv),E.push(B.emissiveMapUv),E.push(B.metalnessMapUv),E.push(B.roughnessMapUv),E.push(B.anisotropyMapUv),E.push(B.clearcoatMapUv),E.push(B.clearcoatNormalMapUv),E.push(B.clearcoatRoughnessMapUv),E.push(B.iridescenceMapUv),E.push(B.iridescenceThicknessMapUv),E.push(B.sheenColorMapUv),E.push(B.sheenRoughnessMapUv),E.push(B.specularMapUv),E.push(B.specularColorMapUv),E.push(B.specularIntensityMapUv),E.push(B.transmissionMapUv),E.push(B.thicknessMapUv),E.push(B.combine),E.push(B.fogExp2),E.push(B.sizeAttenuation),E.push(B.morphTargetsCount),E.push(B.morphAttributeCount),E.push(B.numSunLights),E.push(B.numDirLights),E.push(B.numPointLights),E.push(B.numSpotLights),E.push(B.numSpotLightMaps),E.push(B.numHemiLights),E.push(B.numRectAreaLights),E.push(B.numSunLightShadows),E.push(B.numDirLightShadows),E.push(B.numPointLightShadows),E.push(B.numSpotLightShadows),E.push(B.numSpotLightShadowsWithMaps),E.push(B.numLightProbes),E.push(B.shadowMapType),E.push(B.toneMapping),E.push(B.numClippingPlanes),E.push(B.numClipIntersection),E.push(B.depthPacking)}function v(E,B){a.disableAll(),B.instancing&&a.enable(0),B.instancingColor&&a.enable(1),B.instancingMorph&&a.enable(2),B.matcap&&a.enable(3),B.envMap&&a.enable(4),B.normalMapObjectSpace&&a.enable(5),B.normalMapTangentSpace&&a.enable(6),B.clearcoat&&a.enable(7),B.iridescence&&a.enable(8),B.alphaTest&&a.enable(9),B.vertexColors&&a.enable(10),B.vertexAlphas&&a.enable(11),B.vertexUv1s&&a.enable(12),B.vertexUv2s&&a.enable(13),B.vertexUv3s&&a.enable(14),B.vertexTangents&&a.enable(15),B.anisotropy&&a.enable(16),B.alphaHash&&a.enable(17),B.batching&&a.enable(18),B.dispersion&&a.enable(19),B.retroreflection&&a.enable(24),B.batchingColor&&a.enable(20),B.gradientMap&&a.enable(21),B.packedNormalMap&&a.enable(22),B.vertexNormals&&a.enable(23),E.push(a.mask),a.disableAll(),B.fog&&a.enable(0),B.useFog&&a.enable(1),B.flatShading&&a.enable(2),B.logarithmicDepthBuffer&&a.enable(3),B.reversedDepthBuffer&&a.enable(4),B.skinning&&a.enable(5),B.morphTargets&&a.enable(6),B.morphNormals&&a.enable(7),B.morphColors&&a.enable(8),B.premultipliedAlpha&&a.enable(9),B.shadowMapEnabled&&a.enable(10),B.doubleSided&&a.enable(11),B.flipSided&&a.enable(12),B.useDepthPacking&&a.enable(13),B.dithering&&a.enable(14),B.transmission&&a.enable(15),B.sheen&&a.enable(16),B.opaque&&a.enable(17),B.pointsUvs&&a.enable(18),B.decodeVideoTexture&&a.enable(19),B.decodeVideoTextureEmissive&&a.enable(20),B.alphaToCoverage&&a.enable(21),B.numLightProbeGrids>0&&a.enable(22),B.hasPositionAttribute&&a.enable(23),E.push(a.mask)}function b(E){const B=f[E.type];let L;if(B){const D=mn[B];L=wd.clone(D.uniforms)}else L=E.uniforms;return L}function M(E,B){let L=h.get(B);return L!==void 0?++L.usedTimes:(L=new eg(i,B,E,r),o.push(L),h.set(B,L)),L}function y(E){if(--E.usedTimes===0){const B=o.indexOf(E);o[B]=o[o.length-1],o.pop(),h.delete(E.cacheKey),E.destroy()}}function T(E){c.remove(E)}function C(){c.dispose()}return{getParameters:_,getProgramCacheKey:p,getUniforms:b,acquireProgram:M,releaseProgram:y,releaseShaderCache:T,programs:o,dispose:C}}function ag(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let c=i.get(a);return c===void 0&&(c={},i.set(a,c)),c}function n(a){i.delete(a)}function r(a,c,l){i.get(a)[c]=l}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function og(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function fl(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function pl(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function c(u,f,g,_,p,m){let v=i[e];return v===void 0?(v={id:u.id,object:u,geometry:f,material:g,materialVariant:a(u),groupOrder:_,renderOrder:u.renderOrder,z:p,group:m},i[e]=v):(v.id=u.id,v.object=u,v.geometry=f,v.material=g,v.materialVariant=a(u),v.groupOrder=_,v.renderOrder=u.renderOrder,v.z=p,v.group=m),e++,v}function l(u,f,g,_,p,m,v){v.reversedDepth===!0&&(p=-p);const b=c(u,f,g,_,p,m);g.transmission>0?n.push(b):g.transparent===!0?r.push(b):t.push(b)}function o(u,f,g,_,p,m){const v=c(u,f,g,_,p,m);g.transmission>0?n.unshift(v):g.transparent===!0?r.unshift(v):t.unshift(v)}function h(u,f){t.length>1&&t.sort(u||og),n.length>1&&n.sort(f||fl),r.length>1&&r.sort(f||fl)}function d(){for(let u=e,f=i.length;u<f;u++){const g=i[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:l,unshift:o,finish:d,sort:h}}function lg(){let i=new WeakMap;function e(n,r){const s=i.get(n);let a;return s===void 0?(a=new pl,i.set(n,[a])):r>=s.length?(a=new pl,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function cg(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new W,color:new at};break;case"SpotLight":t={position:new W,direction:new W,color:new at,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new W,color:new at,distance:0,decay:0};break;case"HemisphereLight":t={direction:new W,skyColor:new at,groundColor:new at};break;case"RectAreaLight":t={color:new at,position:new W,halfWidth:new W,halfHeight:new W};break}return i[e.id]=t,t}}}function ug(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let hg=0;function dg(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function fg(i){const e=new cg,t=ug(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let o=0;o<9;o++)n.probe.push(new W);const r=new W,s=new Et,a=new Et;function c(o){let h=0,d=0,u=0;for(let O=0;O<9;O++)n.probe[O].set(0,0,0);let f=0,g=0,_=0,p=0,m=0,v=0,b=0,M=0,y=0,T=0,C=0,E=0,B=0,L=0;o.sort(dg);for(let O=0,X=o.length;O<X;O++){const U=o[O],z=U.color,$=U.intensity,Z=U.distance;let se=null;if(U.shadow&&U.shadow.map&&(U.shadow.map.texture.format===hi?se=U.shadow.map.texture:se=U.shadow.map.depthTexture||U.shadow.map.texture),U.isAmbientLight)h+=z.r*$,d+=z.g*$,u+=z.b*$;else if(U.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(U.sh.coefficients[G],$);L++}else if(U.isSunLight){const G=e.get(U);if(G.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const J=U.shadow,ee=t.get(U);ee.shadowIntensity=J.intensity,ee.shadowBias=J.bias,ee.shadowNormalBias=J.normalBias,ee.shadowRadius=J.radius,ee.shadowMapSize.copy(J.mapSize).multiply(J.getFrameExtents()),n.sunShadow[g]=ee,n.sunShadowMap[g]=se;const Te=J.getViewportCount();for(let Re=0;Re<Te;Re++)n.sunShadowMatrix[_+Re]=J.getMatrix(Re),n.sunShadowCascade[_+Re]=J._cascadeData[Re];_+=Te,g++}n.sun[f]=G,f++}else if(U.isDirectionalLight){const G=e.get(U);if(G.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const J=U.shadow,ee=t.get(U);ee.shadowIntensity=J.intensity,ee.shadowBias=J.bias,ee.shadowNormalBias=J.normalBias,ee.shadowRadius=J.radius,ee.shadowMapSize=J.mapSize,n.directionalShadow[p]=ee,n.directionalShadowMap[p]=se,n.directionalShadowMatrix[p]=U.shadow.matrix,y++}n.directional[p]=G,p++}else if(U.isSpotLight){const G=e.get(U);G.position.setFromMatrixPosition(U.matrixWorld),G.color.copy(z).multiplyScalar($),G.distance=Z,G.coneCos=Math.cos(U.angle),G.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),G.decay=U.decay,n.spot[v]=G;const J=U.shadow;if(U.map&&(n.spotLightMap[E]=U.map,E++,J.updateMatrices(U),U.castShadow&&B++),n.spotLightMatrix[v]=J.matrix,U.castShadow){const ee=t.get(U);ee.shadowIntensity=J.intensity,ee.shadowBias=J.bias,ee.shadowNormalBias=J.normalBias,ee.shadowRadius=J.radius,ee.shadowMapSize=J.mapSize,n.spotShadow[v]=ee,n.spotShadowMap[v]=se,C++}v++}else if(U.isRectAreaLight){const G=e.get(U);G.color.copy(z).multiplyScalar($),G.halfWidth.set(U.width*.5,0,0),G.halfHeight.set(0,U.height*.5,0),n.rectArea[b]=G,b++}else if(U.isPointLight){const G=e.get(U);if(G.color.copy(U.color).multiplyScalar(U.intensity),G.distance=U.distance,G.decay=U.decay,U.castShadow){const J=U.shadow,ee=t.get(U);ee.shadowIntensity=J.intensity,ee.shadowBias=J.bias,ee.shadowNormalBias=J.normalBias,ee.shadowRadius=J.radius,ee.shadowMapSize=J.mapSize,ee.shadowCameraNear=J.camera.near,ee.shadowCameraFar=J.camera.far,n.pointShadow[m]=ee,n.pointShadowMap[m]=se,n.pointShadowMatrix[m]=U.shadow.matrix,T++}n.point[m]=G,m++}else if(U.isHemisphereLight){const G=e.get(U);G.skyColor.copy(U.color).multiplyScalar($),G.groundColor.copy(U.groundColor).multiplyScalar($),n.hemi[M]=G,M++}}b>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=fe.LTC_FLOAT_1,n.rectAreaLTC2=fe.LTC_FLOAT_2):(n.rectAreaLTC1=fe.LTC_HALF_1,n.rectAreaLTC2=fe.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const D=n.hash;(D.sunLength!==f||D.directionalLength!==p||D.pointLength!==m||D.spotLength!==v||D.rectAreaLength!==b||D.hemiLength!==M||D.numSunShadows!==g||D.numDirectionalShadows!==y||D.numPointShadows!==T||D.numSpotShadows!==C||D.numSpotMaps!==E||D.numLightProbes!==L)&&(n.sun.length=f,n.directional.length=p,n.spot.length=v,n.rectArea.length=b,n.point.length=m,n.hemi.length=M,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=_,n.sunShadowCascade.length=_,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.directionalShadowMatrix.length=y,n.pointShadow.length=T,n.pointShadowMap.length=T,n.pointShadowMatrix.length=T,n.spotShadow.length=C,n.spotShadowMap.length=C,n.spotLightMatrix.length=C+E-B,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=B,n.numLightProbes=L,D.sunLength=f,D.directionalLength=p,D.pointLength=m,D.spotLength=v,D.rectAreaLength=b,D.hemiLength=M,D.numSunShadows=g,D.numDirectionalShadows=y,D.numPointShadows=T,D.numSpotShadows=C,D.numSpotMaps=E,D.numLightProbes=L,n.version=hg++)}function l(o,h){let d=0,u=0,f=0,g=0,_=0,p=0;const m=h.matrixWorldInverse;for(let v=0,b=o.length;v<b;v++){const M=o[v];if(M.isSunLight){const y=n.sun[d];y.direction.setFromMatrixPosition(M.matrixWorld),y.direction.transformDirection(m),d++}else if(M.isDirectionalLight){const y=n.directional[u];y.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(m),u++}else if(M.isSpotLight){const y=n.spot[g];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(m),g++}else if(M.isRectAreaLight){const y=n.rectArea[_];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),a.identity(),s.copy(M.matrixWorld),s.premultiply(m),a.extractRotation(s),y.halfWidth.set(M.width*.5,0,0),y.halfHeight.set(0,M.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),_++}else if(M.isPointLight){const y=n.point[f];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){const y=n.hemi[p];y.direction.setFromMatrixPosition(M.matrixWorld),y.direction.transformDirection(m),p++}}}return{setup:c,setupView:l,state:n}}function ml(i){const e=new fg(i),t=[],n=[],r=[];function s(u){d.camera=u,t.length=0,n.length=0,r.length=0}function a(u){t.push(u)}function c(u){n.push(u)}function l(u){r.push(u)}function o(){e.setup(t)}function h(u){e.setupView(t,u)}const d={lightsArray:t,shadowsArray:n,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:d,setupLights:o,setupLightsView:h,pushLight:a,pushShadow:c,pushLightProbeGrid:l}}function pg(i){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let c;return a===void 0?(c=new ml(i),e.set(r,[c])):s>=a.length?(c=new ml(i),a.push(c)):c=a[s],c}function n(){e=new WeakMap}return{get:t,dispose:n}}const mg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,gg=`uniform sampler2D shadow_pass;
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
}`,_g=[new W(1,0,0),new W(-1,0,0),new W(0,1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1)],xg=[new W(0,-1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1),new W(0,-1,0),new W(0,-1,0)],gl=new Et,tr=new W,Js=new W;function vg(i,e,t){let n=new tc;const r=new He,s=new He,a=new xt,c=new Rd,l=new Cd,o={},h=t.maxTextureSize,d={[ci]:Gt,[Gt]:ci,[Cn]:Cn},u=new Wt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new He},radius:{value:4}},vertexShader:mg,fragmentShader:gg}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const g=new bn;g.setAttribute("position",new vn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Jt(g,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Zr;let m=this.type;this.render=function(T,C,E){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;this.type===mh&&(ze("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Zr);const B=i.getRenderTarget(),L=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),O=i.state;O.setBlending(Pn),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const X=m!==this.type;X&&C.traverse(function(U){U.material&&(Array.isArray(U.material)?U.material.forEach(z=>z.needsUpdate=!0):U.material.needsUpdate=!0)});for(let U=0,z=T.length;U<z;U++){const $=T[U],Z=$.shadow;if(Z===void 0){ze("WebGLShadowMap:",$,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;r.copy(Z.mapSize);const se=Z.getFrameExtents();r.multiply(se),s.copy(Z.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/se.x),r.x=s.x*se.x,Z.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/se.y),r.y=s.y*se.y,Z.mapSize.y=s.y));const G=i.state.buffers.depth.getReversed();if(Z.camera._reversedDepth=G,Z.map===null||X===!0){if(Z.map!==null&&(Z.map.depthTexture!==null&&(Z.map.depthTexture.dispose(),Z.map.depthTexture=null),Z.map.dispose()),this.type===ir){if($.isPointLight){ze("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Z.map=new rn(r.x,r.y,{format:hi,type:Sn,minFilter:bt,magFilter:bt,generateMipmaps:!1}),Z.map.texture.name=$.name+".shadowMap",Z.map.depthTexture=new dr(r.x,r.y,gn),Z.map.depthTexture.name=$.name+".shadowMapDepth",Z.map.depthTexture.format=Un,Z.map.depthTexture.compareFunction=null,Z.map.depthTexture.minFilter=Tt,Z.map.depthTexture.magFilter=Tt}else $.isPointLight?(Z.map=new cc(r.x),Z.map.depthTexture=new Ed(r.x,Mn)):(Z.map=new rn(r.x,r.y),Z.map.depthTexture=new dr(r.x,r.y,Mn)),Z.map.depthTexture.name=$.name+".shadowMap",Z.map.depthTexture.format=Un,this.type===Zr?(Z.map.depthTexture.compareFunction=G?io:no,Z.map.depthTexture.minFilter=bt,Z.map.depthTexture.magFilter=bt):(Z.map.depthTexture.compareFunction=null,Z.map.depthTexture.minFilter=Tt,Z.map.depthTexture.magFilter=Tt);Z.camera.updateProjectionMatrix()}Z.map.isWebGLCubeRenderTarget!==!0&&(Z.map.width!==r.x||Z.map.height!==r.y)&&Z.map.setSize(r.x,r.y);const J=Z.map.isWebGLCubeRenderTarget?6:Z.getViewportCount();$.isPointLight!==!0&&Z.updateMatrices($,E);for(let ee=0;ee<J;ee++){const Te=Z.getCamera(ee);if($.isPointLight){const Re=Z.camera,ct=Z.matrix,qe=$.distance||Re.far;qe!==Re.far&&(Re.far=qe,Re.updateProjectionMatrix()),tr.setFromMatrixPosition($.matrixWorld),Re.position.copy(tr),Js.copy(Re.position),Js.add(_g[ee]),Re.up.copy(xg[ee]),Re.lookAt(Js),Re.updateMatrixWorld(),ct.makeTranslation(-tr.x,-tr.y,-tr.z),gl.multiplyMatrices(Re.projectionMatrix,Re.matrixWorldInverse),Z._frustum.setFromProjectionMatrix(gl,Re.coordinateSystem,Re.reversedDepth)}if(Z.map.isWebGLCubeRenderTarget)i.setRenderTarget(Z.map,ee),i.clear();else{ee===0&&(i.setRenderTarget(Z.map),i.clear());const Re=Z.getViewport(ee);a.set(s.x*Re.x,s.y*Re.y,s.x*Re.z,s.y*Re.w),O.viewport(a)}n=Z.getFrustum(ee),M(C,E,Te,$,this.type)}Z.isPointLightShadow!==!0&&this.type===ir&&v(Z,E),Z.needsUpdate=!1}m=this.type,p.needsUpdate=!1,i.setRenderTarget(B,L,D)};function v(T,C){const E=e.update(_);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null?T.mapPass=new rn(r.x,r.y,{format:hi,type:Sn}):(T.mapPass.width!==T.map.width||T.mapPass.height!==T.map.height)&&T.mapPass.setSize(T.map.width,T.map.height),u.uniforms.shadow_pass.value=T.map.depthTexture,u.uniforms.resolution.value.set(T.map.width,T.map.height),u.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(C,null,E,u,_,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value.set(T.map.width,T.map.height),f.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(C,null,E,f,_,null)}function b(T,C,E,B){let L=null;const D=E.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(D!==void 0)L=D;else if(L=E.isPointLight===!0?l:c,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const O=L.uuid,X=C.uuid;let U=o[O];U===void 0&&(U={},o[O]=U);let z=U[X];z===void 0&&(z=L.clone(),U[X]=z,C.addEventListener("dispose",y)),L=z}if(L.visible=C.visible,L.wireframe=C.wireframe,B===ir?L.side=C.shadowSide!==null?C.shadowSide:C.side:L.side=C.shadowSide!==null?C.shadowSide:d[C.side],L.alphaMap=C.alphaMap,L.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,L.map=C.map,L.clipShadows=C.clipShadows,L.clippingPlanes=C.clippingPlanes,L.clipIntersection=C.clipIntersection,L.displacementMap=C.displacementMap,L.displacementScale=C.displacementScale,L.displacementBias=C.displacementBias,L.wireframeLinewidth=C.wireframeLinewidth,L.linewidth=C.linewidth,E.isPointLight===!0&&L.isMeshDistanceMaterial===!0){const O=i.properties.get(L);O.light=E}return L}function M(T,C,E,B,L){if(T.visible===!1)return;if(T.layers.test(C.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&L===ir)&&(!T.frustumCulled||T.intersectsFrustum(n))){T.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,T.matrixWorld);const X=e.update(T),U=T.material;if(Array.isArray(U)){const z=X.groups;for(let $=0,Z=z.length;$<Z;$++){const se=z[$],G=U[se.materialIndex];if(G&&G.visible){const J=b(T,G,B,L);T.onBeforeShadow(i,T,C,E,X,J,se),i.renderBufferDirect(E,null,X,J,T,se),T.onAfterShadow(i,T,C,E,X,J,se)}}}else if(U.visible){const z=b(T,U,B,L);T.onBeforeShadow(i,T,C,E,X,z,null),i.renderBufferDirect(E,null,X,z,T,null),T.onAfterShadow(i,T,C,E,X,z,null)}}const O=T.children;for(let X=0,U=O.length;X<U;X++)M(O[X],C,E,B,L)}function y(T){T.target.removeEventListener("dispose",y);for(const E in o){const B=o[E],L=T.target.uuid;L in B&&(B[L].dispose(),delete B[L])}}}function Mg(i,e){function t(){let N=!1;const ue=new xt;let te=null;const he=new xt(0,0,0,0);return{setMask:function(xe){te!==xe&&!N&&(i.colorMask(xe,xe,xe,xe),te=xe)},setLocked:function(xe){N=xe},setClear:function(xe,re,Ue,Le,pt){pt===!0&&(xe*=Le,re*=Le,Ue*=Le),ue.set(xe,re,Ue,Le),he.equals(ue)===!1&&(i.clearColor(xe,re,Ue,Le),he.copy(ue))},reset:function(){N=!1,te=null,he.set(-1,0,0,0)}}}function n(){let N=!1,ue=!1,te=null,he=null,xe=null;return{setReversed:function(re){if(ue!==re){const Ue=e.get("EXT_clip_control");re?Ue.clipControlEXT(Ue.LOWER_LEFT_EXT,Ue.ZERO_TO_ONE_EXT):Ue.clipControlEXT(Ue.LOWER_LEFT_EXT,Ue.NEGATIVE_ONE_TO_ONE_EXT),ue=re;const Le=xe;xe=null,this.setClear(Le)}},getReversed:function(){return ue},setTest:function(re){re?ie(i.DEPTH_TEST):be(i.DEPTH_TEST)},setMask:function(re){te!==re&&!N&&(i.depthMask(re),te=re)},setFunc:function(re){if(ue&&(re=Jh[re]),he!==re){switch(re){case ta:i.depthFunc(i.NEVER);break;case na:i.depthFunc(i.ALWAYS);break;case ia:i.depthFunc(i.LESS);break;case lr:i.depthFunc(i.LEQUAL);break;case ra:i.depthFunc(i.EQUAL);break;case sa:i.depthFunc(i.GEQUAL);break;case aa:i.depthFunc(i.GREATER);break;case oa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}he=re}},setLocked:function(re){N=re},setClear:function(re){xe!==re&&(xe=re,ue&&(re=1-re),i.clearDepth(re))},reset:function(){N=!1,te=null,he=null,xe=null,ue=!1}}}function r(){let N=!1,ue=null,te=null,he=null,xe=null,re=null,Ue=null,Le=null,pt=null;return{setTest:function(ot){N||(ot?ie(i.STENCIL_TEST):be(i.STENCIL_TEST))},setMask:function(ot){ue!==ot&&!N&&(i.stencilMask(ot),ue=ot)},setFunc:function(ot,sn,hn){(te!==ot||he!==sn||xe!==hn)&&(i.stencilFunc(ot,sn,hn),te=ot,he=sn,xe=hn)},setOp:function(ot,sn,hn){(re!==ot||Ue!==sn||Le!==hn)&&(i.stencilOp(ot,sn,hn),re=ot,Ue=sn,Le=hn)},setLocked:function(ot){N=ot},setClear:function(ot){pt!==ot&&(i.clearStencil(ot),pt=ot)},reset:function(){N=!1,ue=null,te=null,he=null,xe=null,re=null,Ue=null,Le=null,pt=null}}}const s=new t,a=new n,c=new r,l=new WeakMap,o=new WeakMap;let h={},d={},u={},f=new WeakMap,g=[],_=null,p=!1,m=null,v=null,b=null,M=null,y=null,T=null,C=null,E=new at(0,0,0),B=0,L=!1,D=null,O=null,X=null,U=null,z=null;const $=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,se=0;const G=i.getParameter(i.VERSION);G.indexOf("WebGL")!==-1?(se=parseFloat(/^WebGL (\d)/.exec(G)[1]),Z=se>=1):G.indexOf("OpenGL ES")!==-1&&(se=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),Z=se>=2);let J=null,ee={};const Te=i.getParameter(i.SCISSOR_BOX),Re=i.getParameter(i.VIEWPORT),ct=new xt().fromArray(Te),qe=new xt().fromArray(Re);function Qe(N,ue,te,he){const xe=new Uint8Array(4),re=i.createTexture();i.bindTexture(N,re),i.texParameteri(N,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(N,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ue=0;Ue<te;Ue++)N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY?i.texImage3D(ue,0,i.RGBA,1,1,he,0,i.RGBA,i.UNSIGNED_BYTE,xe):i.texImage2D(ue+Ue,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,xe);return re}const Q={};Q[i.TEXTURE_2D]=Qe(i.TEXTURE_2D,i.TEXTURE_2D,1),Q[i.TEXTURE_CUBE_MAP]=Qe(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[i.TEXTURE_2D_ARRAY]=Qe(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Q[i.TEXTURE_3D]=Qe(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),c.setClear(0),ie(i.DEPTH_TEST),a.setFunc(lr),Me(!1),Ye(Eo),ie(i.CULL_FACE),Pe(Pn);function ie(N){h[N]!==!0&&(i.enable(N),h[N]=!0)}function be(N){h[N]!==!1&&(i.disable(N),h[N]=!1)}function ke(N,ue){return u[N]!==ue?(i.bindFramebuffer(N,ue),u[N]=ue,N===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ue),N===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ue),!0):!1}function Se(N,ue){let te=g,he=!1;if(N){te=f.get(ue),te===void 0&&(te=[],f.set(ue,te));const xe=N.textures;if(te.length!==xe.length||te[0]!==i.COLOR_ATTACHMENT0){for(let re=0,Ue=xe.length;re<Ue;re++)te[re]=i.COLOR_ATTACHMENT0+re;te.length=xe.length,he=!0}}else te[0]!==i.BACK&&(te[0]=i.BACK,he=!0);he&&i.drawBuffers(te)}function q(N){return _!==N?(i.useProgram(N),_=N,!0):!1}const ve={[Ri]:i.FUNC_ADD,[_h]:i.FUNC_SUBTRACT,[xh]:i.FUNC_REVERSE_SUBTRACT};ve[vh]=i.MIN,ve[Mh]=i.MAX;const ge={[Sh]:i.ZERO,[bh]:i.ONE,[Eh]:i.SRC_COLOR,[Cl]:i.SRC_ALPHA,[Rh]:i.SRC_ALPHA_SATURATE,[Ah]:i.DST_COLOR,[wh]:i.DST_ALPHA,[yh]:i.ONE_MINUS_SRC_COLOR,[Ll]:i.ONE_MINUS_SRC_ALPHA,[Bh]:i.ONE_MINUS_DST_COLOR,[Th]:i.ONE_MINUS_DST_ALPHA,[Ch]:i.CONSTANT_COLOR,[Lh]:i.ONE_MINUS_CONSTANT_COLOR,[Dh]:i.CONSTANT_ALPHA,[Ph]:i.ONE_MINUS_CONSTANT_ALPHA};function Pe(N,ue,te,he,xe,re,Ue,Le,pt,ot){if(N===Pn){p===!0&&(be(i.BLEND),p=!1);return}if(p===!1&&(ie(i.BLEND),p=!0),N!==gh){if(N!==m||ot!==L){if((v!==Ri||y!==Ri)&&(i.blendEquation(i.FUNC_ADD),v=Ri,y=Ri),ot)switch(N){case ar:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case yo:i.blendFunc(i.ONE,i.ONE);break;case wo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case To:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:rt("WebGLState: Invalid blending: ",N);break}else switch(N){case ar:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case yo:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case wo:rt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case To:rt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:rt("WebGLState: Invalid blending: ",N);break}b=null,M=null,T=null,C=null,E.set(0,0,0),B=0,m=N,L=ot}return}xe=xe||ue,re=re||te,Ue=Ue||he,(ue!==v||xe!==y)&&(i.blendEquationSeparate(ve[ue],ve[xe]),v=ue,y=xe),(te!==b||he!==M||re!==T||Ue!==C)&&(i.blendFuncSeparate(ge[te],ge[he],ge[re],ge[Ue]),b=te,M=he,T=re,C=Ue),(Le.equals(E)===!1||pt!==B)&&(i.blendColor(Le.r,Le.g,Le.b,pt),E.copy(Le),B=pt),m=N,L=!1}function Ce(N,ue){N.side===Cn?be(i.CULL_FACE):ie(i.CULL_FACE);let te=N.side===Gt;ue&&(te=!te),Me(te),N.blending===ar&&N.transparent===!1?Pe(Pn):Pe(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),a.setFunc(N.depthFunc),a.setTest(N.depthTest),a.setMask(N.depthWrite),s.setMask(N.colorWrite);const he=N.stencilWrite;c.setTest(he),he&&(c.setMask(N.stencilWriteMask),c.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),c.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),dt(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?ie(i.SAMPLE_ALPHA_TO_COVERAGE):be(i.SAMPLE_ALPHA_TO_COVERAGE)}function Me(N){D!==N&&(N?i.frontFace(i.CW):i.frontFace(i.CCW),D=N)}function Ye(N){N!==fh?(ie(i.CULL_FACE),N!==O&&(N===Eo?i.cullFace(i.BACK):N===ph?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):be(i.CULL_FACE),O=N}function je(N){N!==X&&(Z&&i.lineWidth(N),X=N)}function dt(N,ue,te){N?(ie(i.POLYGON_OFFSET_FILL),(U!==ue||z!==te)&&(U=ue,z=te,a.getReversed()&&(ue=-ue),i.polygonOffset(ue,te))):be(i.POLYGON_OFFSET_FILL)}function et(N){N?ie(i.SCISSOR_TEST):be(i.SCISSOR_TEST)}function tt(N){N===void 0&&(N=i.TEXTURE0+$-1),J!==N&&(i.activeTexture(N),J=N)}function P(N,ue,te){te===void 0&&(J===null?te=i.TEXTURE0+$-1:te=J);let he=ee[te];he===void 0&&(he={type:void 0,texture:void 0},ee[te]=he),(he.type!==N||he.texture!==ue)&&(J!==te&&(i.activeTexture(te),J=te),i.bindTexture(N,ue||Q[N]),he.type=N,he.texture=ue)}function vt(){const N=ee[J];N!==void 0&&N.type!==void 0&&(i.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function nt(){try{i.compressedTexImage2D(...arguments)}catch(N){rt("WebGLState:",N)}}function A(){try{i.compressedTexImage3D(...arguments)}catch(N){rt("WebGLState:",N)}}function S(){try{i.texSubImage2D(...arguments)}catch(N){rt("WebGLState:",N)}}function F(){try{i.texSubImage3D(...arguments)}catch(N){rt("WebGLState:",N)}}function k(){try{i.compressedTexSubImage2D(...arguments)}catch(N){rt("WebGLState:",N)}}function K(){try{i.compressedTexSubImage3D(...arguments)}catch(N){rt("WebGLState:",N)}}function ae(){try{i.texStorage2D(...arguments)}catch(N){rt("WebGLState:",N)}}function oe(){try{i.texStorage3D(...arguments)}catch(N){rt("WebGLState:",N)}}function j(){try{i.texImage2D(...arguments)}catch(N){rt("WebGLState:",N)}}function ne(){try{i.texImage3D(...arguments)}catch(N){rt("WebGLState:",N)}}function le(N){return d[N]!==void 0?d[N]:i.getParameter(N)}function Ie(N,ue){d[N]!==ue&&(i.pixelStorei(N,ue),d[N]=ue)}function de(N){ct.equals(N)===!1&&(i.scissor(N.x,N.y,N.z,N.w),ct.copy(N))}function ce(N){qe.equals(N)===!1&&(i.viewport(N.x,N.y,N.z,N.w),qe.copy(N))}function Ne(N,ue){let te=o.get(ue);te===void 0&&(te=new WeakMap,o.set(ue,te));let he=te.get(N);he===void 0&&(he=i.getUniformBlockIndex(ue,N.name),te.set(N,he))}function Oe(N,ue){const he=o.get(ue).get(N);l.get(ue)!==he&&(i.uniformBlockBinding(ue,he,N.__bindingPointIndex),l.set(ue,he))}function We(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},d={},J=null,ee={},u={},f=new WeakMap,g=[],_=null,p=!1,m=null,v=null,b=null,M=null,y=null,T=null,C=null,E=new at(0,0,0),B=0,L=!1,D=null,O=null,X=null,U=null,z=null,ct.set(0,0,i.canvas.width,i.canvas.height),qe.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),c.reset()}return{buffers:{color:s,depth:a,stencil:c},enable:ie,disable:be,bindFramebuffer:ke,drawBuffers:Se,useProgram:q,setBlending:Pe,setMaterial:Ce,setFlipSided:Me,setCullFace:Ye,setLineWidth:je,setPolygonOffset:dt,setScissorTest:et,activeTexture:tt,bindTexture:P,unbindTexture:vt,compressedTexImage2D:nt,compressedTexImage3D:A,texImage2D:j,texImage3D:ne,pixelStorei:Ie,getParameter:le,updateUBOMapping:Ne,uniformBlockBinding:Oe,texStorage2D:ae,texStorage3D:oe,texSubImage2D:S,texSubImage3D:F,compressedTexSubImage2D:k,compressedTexSubImage3D:K,scissor:de,viewport:ce,reset:We}}function Sg(i,e,t,n,r,s,a){const c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),o=new He,h=new WeakMap,d=new Set;let u;const f=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(A,S){return g?new OffscreenCanvas(A,S):as("canvas")}function p(A,S,F){let k=1;const K=nt(A);if((K.width>F||K.height>F)&&(k=F/Math.max(K.width,K.height)),k<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const ae=Math.floor(k*K.width),oe=Math.floor(k*K.height);u===void 0&&(u=_(ae,oe));const j=S?_(ae,oe):u;return j.width=ae,j.height=oe,j.getContext("2d").drawImage(A,0,0,ae,oe),ze("WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+ae+"x"+oe+")."),j}else return"data"in A&&ze("WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),A;return A}function m(A){return A.generateMipmaps}function v(A){i.generateMipmap(A)}function b(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(A,S,F,k,K,ae=!1){if(A!==null){if(i[A]!==void 0)return i[A];ze("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let oe;k&&(oe=e.get("EXT_texture_norm16"),oe||ze("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let j=S;if(S===i.RED&&(F===i.FLOAT&&(j=i.R32F),F===i.HALF_FLOAT&&(j=i.R16F),F===i.UNSIGNED_BYTE&&(j=i.R8),F===i.UNSIGNED_SHORT&&oe&&(j=oe.R16_EXT),F===i.SHORT&&oe&&(j=oe.R16_SNORM_EXT)),S===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&(j=i.R8UI),F===i.UNSIGNED_SHORT&&(j=i.R16UI),F===i.UNSIGNED_INT&&(j=i.R32UI),F===i.BYTE&&(j=i.R8I),F===i.SHORT&&(j=i.R16I),F===i.INT&&(j=i.R32I)),S===i.RG&&(F===i.FLOAT&&(j=i.RG32F),F===i.HALF_FLOAT&&(j=i.RG16F),F===i.UNSIGNED_BYTE&&(j=i.RG8),F===i.UNSIGNED_SHORT&&oe&&(j=oe.RG16_EXT),F===i.SHORT&&oe&&(j=oe.RG16_SNORM_EXT)),S===i.RG_INTEGER&&(F===i.UNSIGNED_BYTE&&(j=i.RG8UI),F===i.UNSIGNED_SHORT&&(j=i.RG16UI),F===i.UNSIGNED_INT&&(j=i.RG32UI),F===i.BYTE&&(j=i.RG8I),F===i.SHORT&&(j=i.RG16I),F===i.INT&&(j=i.RG32I)),S===i.RGB_INTEGER&&(F===i.UNSIGNED_BYTE&&(j=i.RGB8UI),F===i.UNSIGNED_SHORT&&(j=i.RGB16UI),F===i.UNSIGNED_INT&&(j=i.RGB32UI),F===i.BYTE&&(j=i.RGB8I),F===i.SHORT&&(j=i.RGB16I),F===i.INT&&(j=i.RGB32I)),S===i.RGBA_INTEGER&&(F===i.UNSIGNED_BYTE&&(j=i.RGBA8UI),F===i.UNSIGNED_SHORT&&(j=i.RGBA16UI),F===i.UNSIGNED_INT&&(j=i.RGBA32UI),F===i.BYTE&&(j=i.RGBA8I),F===i.SHORT&&(j=i.RGBA16I),F===i.INT&&(j=i.RGBA32I)),S===i.RGB&&(F===i.UNSIGNED_SHORT&&oe&&(j=oe.RGB16_EXT),F===i.SHORT&&oe&&(j=oe.RGB16_SNORM_EXT),F===i.UNSIGNED_INT_5_9_9_9_REV&&(j=i.RGB9_E5),F===i.UNSIGNED_INT_10F_11F_11F_REV&&(j=i.R11F_G11F_B10F)),S===i.RGBA){const ne=ae?rs:$e.getTransfer(K);F===i.FLOAT&&(j=i.RGBA32F),F===i.HALF_FLOAT&&(j=i.RGBA16F),F===i.UNSIGNED_BYTE&&(j=ne===ut?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT&&oe&&(j=oe.RGBA16_EXT),F===i.SHORT&&oe&&(j=oe.RGBA16_SNORM_EXT),F===i.UNSIGNED_SHORT_4_4_4_4&&(j=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&(j=i.RGB5_A1)}return(j===i.R16F||j===i.R32F||j===i.RG16F||j===i.RG32F||j===i.RGBA16F||j===i.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function y(A,S){let F;return A?S===null||S===Mn||S===ur?F=i.DEPTH24_STENCIL8:S===gn?F=i.DEPTH32F_STENCIL8:S===cr&&(F=i.DEPTH24_STENCIL8,ze("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Mn||S===ur?F=i.DEPTH_COMPONENT24:S===gn?F=i.DEPTH_COMPONENT32F:S===cr&&(F=i.DEPTH_COMPONENT16),F}function T(A,S){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==Tt&&A.minFilter!==bt?Math.log2(Math.max(S.width,S.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?S.mipmaps.length:1}function C(A){const S=A.target;S.removeEventListener("dispose",C),B(S),S.isVideoTexture&&h.delete(S),S.isHTMLTexture&&d.delete(S)}function E(A){const S=A.target;S.removeEventListener("dispose",E),D(S)}function B(A){const S=n.get(A);if(S.__webglInit===void 0)return;const F=A.source,k=f.get(F);if(k){const K=k[S.__cacheKey];K.usedTimes--,K.usedTimes===0&&L(A),Object.keys(k).length===0&&f.delete(F)}n.remove(A)}function L(A){const S=n.get(A);i.deleteTexture(S.__webglTexture);const F=A.source,k=f.get(F);delete k[S.__cacheKey],a.memory.textures--}function D(A){const S=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let k=0;k<6;k++){if(Array.isArray(S.__webglFramebuffer[k]))for(let K=0;K<S.__webglFramebuffer[k].length;K++)i.deleteFramebuffer(S.__webglFramebuffer[k][K]);else i.deleteFramebuffer(S.__webglFramebuffer[k]);S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer[k])}else{if(Array.isArray(S.__webglFramebuffer))for(let k=0;k<S.__webglFramebuffer.length;k++)i.deleteFramebuffer(S.__webglFramebuffer[k]);else i.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&i.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let k=0;k<S.__webglColorRenderbuffer.length;k++)S.__webglColorRenderbuffer[k]&&i.deleteRenderbuffer(S.__webglColorRenderbuffer[k]);S.__webglDepthRenderbuffer&&i.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const F=A.textures;for(let k=0,K=F.length;k<K;k++){const ae=n.get(F[k]);ae.__webglTexture&&(i.deleteTexture(ae.__webglTexture),a.memory.textures--),n.remove(F[k])}n.remove(A)}let O=0;function X(){O=0}function U(){return O}function z(A){O=A}function $(){const A=O;return A>=r.maxTextures&&ze("WebGLTextures: Trying to use "+(A+1)+" texture units while this GPU supports only "+r.maxTextures),O+=1,A}function Z(A){const S=[];return S.push(A.wrapS),S.push(A.wrapT),S.push(A.wrapR||0),S.push(A.magFilter),S.push(A.minFilter),S.push(A.anisotropy),S.push(A.internalFormat),S.push(A.format),S.push(A.type),S.push(A.generateMipmaps),S.push(A.premultiplyAlpha),S.push(A.flipY),S.push(A.unpackAlignment),S.push(A.colorSpace),S.join()}function se(A,S){const F=n.get(A);if(A.isVideoTexture&&P(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&F.__version!==A.version){const k=A.image;if(k===null)ze("WebGLRenderer: Texture marked for update but no image data found.");else if(k.complete===!1)ze("WebGLRenderer: Texture marked for update but image is incomplete");else{be(F,A,S);return}}else A.isExternalTexture&&(F.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+S)}function G(A,S){const F=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&F.__version!==A.version){be(F,A,S);return}else A.isExternalTexture&&(F.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+S)}function J(A,S){const F=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&F.__version!==A.version){be(F,A,S);return}t.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+S)}function ee(A,S){const F=n.get(A);if(A.isCubeDepthTexture!==!0&&A.version>0&&F.__version!==A.version){ke(F,A,S);return}t.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+S)}const Te={[la]:i.REPEAT,[Ln]:i.CLAMP_TO_EDGE,[ca]:i.MIRRORED_REPEAT},Re={[Tt]:i.NEAREST,[Uh]:i.NEAREST_MIPMAP_NEAREST,[br]:i.NEAREST_MIPMAP_LINEAR,[bt]:i.LINEAR,[bs]:i.LINEAR_MIPMAP_NEAREST,[si]:i.LINEAR_MIPMAP_LINEAR},ct={[zh]:i.NEVER,[Xh]:i.ALWAYS,[Gh]:i.LESS,[no]:i.LEQUAL,[Wh]:i.EQUAL,[io]:i.GEQUAL,[Hh]:i.GREATER,[Vh]:i.NOTEQUAL};function qe(A,S){if(S.type===gn&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===bt||S.magFilter===bs||S.magFilter===br||S.magFilter===si||S.minFilter===bt||S.minFilter===bs||S.minFilter===br||S.minFilter===si)&&ze("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,Te[S.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,Te[S.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,Te[S.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,Re[S.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,Re[S.minFilter]),S.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,ct[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Tt||S.minFilter!==br&&S.minFilter!==si||S.type===gn&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const F=e.get("EXT_texture_filter_anisotropic");i.texParameterf(A,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,r.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function Qe(A,S){let F=!1;A.__webglInit===void 0&&(A.__webglInit=!0,S.addEventListener("dispose",C));const k=S.source;let K=f.get(k);K===void 0&&(K={},f.set(k,K));const ae=Z(S);if(ae!==A.__cacheKey){K[ae]===void 0&&(K[ae]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,F=!0),K[ae].usedTimes++;const oe=K[A.__cacheKey];oe!==void 0&&(K[A.__cacheKey].usedTimes--,oe.usedTimes===0&&L(S)),A.__cacheKey=ae,A.__webglTexture=K[ae].texture}return F}function Q(A,S,F){return Math.floor(Math.floor(A/F)/S)}function ie(A,S,F,k){const ae=A.updateRanges;if(ae.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,S.width,S.height,F,k,S.data);else{ae.sort((Ie,de)=>Ie.start-de.start);let oe=0;for(let Ie=1;Ie<ae.length;Ie++){const de=ae[oe],ce=ae[Ie],Ne=de.start+de.count,Oe=Q(ce.start,S.width,4),We=Q(de.start,S.width,4);ce.start<=Ne+1&&Oe===We&&Q(ce.start+ce.count-1,S.width,4)===Oe?de.count=Math.max(de.count,ce.start+ce.count-de.start):(++oe,ae[oe]=ce)}ae.length=oe+1;const j=t.getParameter(i.UNPACK_ROW_LENGTH),ne=t.getParameter(i.UNPACK_SKIP_PIXELS),le=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,S.width);for(let Ie=0,de=ae.length;Ie<de;Ie++){const ce=ae[Ie],Ne=Math.floor(ce.start/4),Oe=Math.ceil(ce.count/4),We=Ne%S.width,N=Math.floor(Ne/S.width),ue=Oe,te=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,We),t.pixelStorei(i.UNPACK_SKIP_ROWS,N),t.texSubImage2D(i.TEXTURE_2D,0,We,N,ue,te,F,k,S.data)}A.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,j),t.pixelStorei(i.UNPACK_SKIP_PIXELS,ne),t.pixelStorei(i.UNPACK_SKIP_ROWS,le)}}function be(A,S,F){let k=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(k=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(k=i.TEXTURE_3D);const K=Qe(A,S),ae=S.source;t.bindTexture(k,A.__webglTexture,i.TEXTURE0+F);const oe=n.get(ae);if(ae.version!==oe.__version||K===!0){if(t.activeTexture(i.TEXTURE0+F),(typeof ImageBitmap<"u"&&S.image instanceof ImageBitmap)===!1){const te=$e.getPrimaries($e.workingColorSpace),he=S.colorSpace===cn?null:$e.getPrimaries(S.colorSpace),xe=S.colorSpace===cn||te===he?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe)}t.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment);let ne=p(S.image,!1,r.maxTextureSize);ne=vt(S,ne);const le=s.convert(S.format,S.colorSpace),Ie=s.convert(S.type);let de=M(S.internalFormat,le,Ie,S.normalized,S.colorSpace,S.isVideoTexture);qe(k,S);let ce;const Ne=S.mipmaps,Oe=S.isVideoTexture!==!0,We=oe.__version===void 0||K===!0,N=ae.dataReady,ue=T(S,ne);if(S.isDepthTexture)de=y(S.format===ai,S.type),We&&(Oe?t.texStorage2D(i.TEXTURE_2D,1,de,ne.width,ne.height):t.texImage2D(i.TEXTURE_2D,0,de,ne.width,ne.height,0,le,Ie,null));else if(S.isDataTexture)if(Ne.length>0){Oe&&We&&t.texStorage2D(i.TEXTURE_2D,ue,de,Ne[0].width,Ne[0].height);for(let te=0,he=Ne.length;te<he;te++)ce=Ne[te],Oe?N&&t.texSubImage2D(i.TEXTURE_2D,te,0,0,ce.width,ce.height,le,Ie,ce.data):t.texImage2D(i.TEXTURE_2D,te,de,ce.width,ce.height,0,le,Ie,ce.data);S.generateMipmaps=!1}else Oe?(We&&t.texStorage2D(i.TEXTURE_2D,ue,de,ne.width,ne.height),N&&ie(S,ne,le,Ie)):t.texImage2D(i.TEXTURE_2D,0,de,ne.width,ne.height,0,le,Ie,ne.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Oe&&We&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ue,de,Ne[0].width,Ne[0].height,ne.depth);for(let te=0,he=Ne.length;te<he;te++)if(ce=Ne[te],S.format!==nn)if(le!==null)if(Oe){if(N)if(S.layerUpdates.size>0){const xe=Ko(ce.width,ce.height,S.format,S.type);for(const re of S.layerUpdates){const Ue=ce.data.subarray(re*xe/ce.data.BYTES_PER_ELEMENT,(re+1)*xe/ce.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,te,0,0,re,ce.width,ce.height,1,le,Ue)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,te,0,0,0,ce.width,ce.height,ne.depth,le,ce.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,te,de,ce.width,ce.height,ne.depth,0,ce.data,0,0);else ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Oe?N&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,te,0,0,0,ce.width,ce.height,ne.depth,le,Ie,ce.data):t.texImage3D(i.TEXTURE_2D_ARRAY,te,de,ce.width,ce.height,ne.depth,0,le,Ie,ce.data);S.layerUpdates.size>0&&S.clearLayerUpdates()}else{Oe&&We&&t.texStorage2D(i.TEXTURE_2D,ue,de,Ne[0].width,Ne[0].height);for(let te=0,he=Ne.length;te<he;te++)ce=Ne[te],S.format!==nn?le!==null?Oe?N&&t.compressedTexSubImage2D(i.TEXTURE_2D,te,0,0,ce.width,ce.height,le,ce.data):t.compressedTexImage2D(i.TEXTURE_2D,te,de,ce.width,ce.height,0,ce.data):ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Oe?N&&t.texSubImage2D(i.TEXTURE_2D,te,0,0,ce.width,ce.height,le,Ie,ce.data):t.texImage2D(i.TEXTURE_2D,te,de,ce.width,ce.height,0,le,Ie,ce.data)}else if(S.isDataArrayTexture)if(Oe){if(We&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ue,de,ne.width,ne.height,ne.depth),N)if(S.layerUpdates.size>0){const te=Ko(ne.width,ne.height,S.format,S.type);for(const he of S.layerUpdates){const xe=ne.data.subarray(he*te/ne.data.BYTES_PER_ELEMENT,(he+1)*te/ne.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,he,ne.width,ne.height,1,le,Ie,xe)}S.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,le,Ie,ne.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,de,ne.width,ne.height,ne.depth,0,le,Ie,ne.data);else if(S.isData3DTexture)Oe?(We&&t.texStorage3D(i.TEXTURE_3D,ue,de,ne.width,ne.height,ne.depth),N&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,le,Ie,ne.data)):t.texImage3D(i.TEXTURE_3D,0,de,ne.width,ne.height,ne.depth,0,le,Ie,ne.data);else if(S.isFramebufferTexture){if(We)if(Oe)t.texStorage2D(i.TEXTURE_2D,ue,de,ne.width,ne.height);else{let te=ne.width,he=ne.height;for(let xe=0;xe<ue;xe++)t.texImage2D(i.TEXTURE_2D,xe,de,te,he,0,le,Ie,null),te>>=1,he>>=1}}else if(S.isHTMLTexture){if("texElementImage2D"in i){const te=i.canvas;if(te.hasAttribute("layoutsubtree")||te.setAttribute("layoutsubtree","true"),ne.parentNode!==te){te.appendChild(ne),d.add(S),te.onpaint=he=>{const xe=he.changedElements;for(const re of d)xe.includes(re.image)&&(re.needsUpdate=!0)},te.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ne);else{const xe=i.RGBA,re=i.RGBA,Ue=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,xe,re,Ue,ne)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Ne.length>0){if(Oe&&We){const te=nt(Ne[0]);t.texStorage2D(i.TEXTURE_2D,ue,de,te.width,te.height)}for(let te=0,he=Ne.length;te<he;te++)ce=Ne[te],Oe?N&&t.texSubImage2D(i.TEXTURE_2D,te,0,0,le,Ie,ce):t.texImage2D(i.TEXTURE_2D,te,de,le,Ie,ce);S.generateMipmaps=!1}else if(Oe){if(We){const te=nt(ne);t.texStorage2D(i.TEXTURE_2D,ue,de,te.width,te.height)}N&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,le,Ie,ne)}else t.texImage2D(i.TEXTURE_2D,0,de,le,Ie,ne);m(S)&&v(k),oe.__version=ae.version,S.onUpdate&&S.onUpdate(S)}A.__version=S.version}function ke(A,S,F){if(S.image.length!==6)return;const k=Qe(A,S),K=S.source;t.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+F);const ae=n.get(K);if(K.version!==ae.__version||k===!0){t.activeTexture(i.TEXTURE0+F);const oe=$e.getPrimaries($e.workingColorSpace),j=S.colorSpace===cn?null:$e.getPrimaries(S.colorSpace),ne=S.colorSpace===cn||oe===j?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ne);const le=S.isCompressedTexture||S.image[0].isCompressedTexture,Ie=S.image[0]&&S.image[0].isDataTexture,de=[];for(let re=0;re<6;re++)!le&&!Ie?de[re]=p(S.image[re],!0,r.maxCubemapSize):de[re]=Ie?S.image[re].image:S.image[re],de[re]=vt(S,de[re]);const ce=de[0],Ne=s.convert(S.format,S.colorSpace),Oe=s.convert(S.type),We=M(S.internalFormat,Ne,Oe,S.normalized,S.colorSpace),N=S.isVideoTexture!==!0,ue=ae.__version===void 0||k===!0,te=K.dataReady;let he=T(S,ce);qe(i.TEXTURE_CUBE_MAP,S);let xe;if(le){N&&ue&&t.texStorage2D(i.TEXTURE_CUBE_MAP,he,We,ce.width,ce.height);for(let re=0;re<6;re++){xe=de[re].mipmaps;for(let Ue=0;Ue<xe.length;Ue++){const Le=xe[Ue];S.format!==nn?Ne!==null?N?te&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ue,0,0,Le.width,Le.height,Ne,Le.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ue,We,Le.width,Le.height,0,Le.data):ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?te&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ue,0,0,Le.width,Le.height,Ne,Oe,Le.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ue,We,Le.width,Le.height,0,Ne,Oe,Le.data)}}}else{if(xe=S.mipmaps,N&&ue){xe.length>0&&he++;const re=nt(de[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,he,We,re.width,re.height)}for(let re=0;re<6;re++)if(Ie){N?te&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,de[re].width,de[re].height,Ne,Oe,de[re].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,We,de[re].width,de[re].height,0,Ne,Oe,de[re].data);for(let Ue=0;Ue<xe.length;Ue++){const pt=xe[Ue].image[re].image;N?te&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ue+1,0,0,pt.width,pt.height,Ne,Oe,pt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ue+1,We,pt.width,pt.height,0,Ne,Oe,pt.data)}}else{N?te&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,Ne,Oe,de[re]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,We,Ne,Oe,de[re]);for(let Ue=0;Ue<xe.length;Ue++){const Le=xe[Ue];N?te&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ue+1,0,0,Ne,Oe,Le.image[re]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ue+1,We,Ne,Oe,Le.image[re])}}}m(S)&&v(i.TEXTURE_CUBE_MAP),ae.__version=K.version,S.onUpdate&&S.onUpdate(S)}A.__version=S.version}function Se(A,S,F,k,K,ae){const oe=s.convert(F.format,F.colorSpace),j=s.convert(F.type),ne=M(F.internalFormat,oe,j,F.normalized,F.colorSpace),le=n.get(S),Ie=n.get(F);if(Ie.__renderTarget=S,!le.__hasExternalTextures){const de=Math.max(1,S.width>>ae),ce=Math.max(1,S.height>>ae);K===i.TEXTURE_3D||K===i.TEXTURE_2D_ARRAY?t.texImage3D(K,ae,ne,de,ce,S.depth,0,oe,j,null):t.texImage2D(K,ae,ne,de,ce,0,oe,j,null)}t.bindFramebuffer(i.FRAMEBUFFER,A),tt(S)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,k,K,Ie.__webglTexture,0,et(S)):(K===i.TEXTURE_2D||K>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,k,K,Ie.__webglTexture,ae),t.bindFramebuffer(i.FRAMEBUFFER,null)}function q(A,S,F){if(i.bindRenderbuffer(i.RENDERBUFFER,A),S.depthBuffer){const k=S.depthTexture,K=k&&k.isDepthTexture?k.type:null,ae=y(S.stencilBuffer,K),oe=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;tt(S)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,et(S),ae,S.width,S.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,et(S),ae,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,ae,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,oe,i.RENDERBUFFER,A)}else{const k=S.textures;for(let K=0;K<k.length;K++){const ae=k[K],oe=s.convert(ae.format,ae.colorSpace),j=s.convert(ae.type),ne=M(ae.internalFormat,oe,j,ae.normalized,ae.colorSpace);tt(S)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,et(S),ne,S.width,S.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,et(S),ne,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,ne,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ve(A,S,F){const k=S.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,A),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const K=n.get(S.depthTexture);if(K.__renderTarget=S,(!K.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),k){if(K.__webglInit===void 0&&(K.__webglInit=!0,S.depthTexture.addEventListener("dispose",C)),K.__webglTexture===void 0){K.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),qe(i.TEXTURE_CUBE_MAP,S.depthTexture);const le=s.convert(S.depthTexture.format),Ie=s.convert(S.depthTexture.type);let de;S.depthTexture.format===Un?de=i.DEPTH_COMPONENT24:S.depthTexture.format===ai&&(de=i.DEPTH24_STENCIL8);for(let ce=0;ce<6;ce++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,de,S.width,S.height,0,le,Ie,null)}}else se(S.depthTexture,0);const ae=K.__webglTexture,oe=et(S),j=k?i.TEXTURE_CUBE_MAP_POSITIVE_X+F:i.TEXTURE_2D,ne=S.depthTexture.format===ai?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(S.depthTexture.format===Un)tt(S)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ne,j,ae,0,oe):i.framebufferTexture2D(i.FRAMEBUFFER,ne,j,ae,0);else if(S.depthTexture.format===ai)tt(S)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ne,j,ae,0,oe):i.framebufferTexture2D(i.FRAMEBUFFER,ne,j,ae,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ge(A){const S=n.get(A),F=A.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==A.depthTexture){const k=A.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),k){const K=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,k.removeEventListener("dispose",K)};k.addEventListener("dispose",K),S.__depthDisposeCallback=K}S.__boundDepthTexture=k}if(A.depthTexture&&!S.__autoAllocateDepthBuffer)if(F)for(let k=0;k<6;k++)ve(S.__webglFramebuffer[k],A,k);else{const k=A.texture.mipmaps;k&&k.length>0?ve(S.__webglFramebuffer[0],A,0):ve(S.__webglFramebuffer,A,0)}else if(F){S.__webglDepthbuffer=[];for(let k=0;k<6;k++)if(t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[k]),S.__webglDepthbuffer[k]===void 0)S.__webglDepthbuffer[k]=i.createRenderbuffer(),q(S.__webglDepthbuffer[k],A,!1);else{const K=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ae=S.__webglDepthbuffer[k];i.bindRenderbuffer(i.RENDERBUFFER,ae),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,ae)}}else{const k=A.texture.mipmaps;if(k&&k.length>0?t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=i.createRenderbuffer(),q(S.__webglDepthbuffer,A,!1);else{const K=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ae=S.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ae),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,ae)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Pe(A,S,F){const k=n.get(A);S!==void 0&&Se(k.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&ge(A)}function Ce(A){const S=A.texture,F=n.get(A),k=n.get(S);A.addEventListener("dispose",E);const K=A.textures,ae=A.isWebGLCubeRenderTarget===!0,oe=K.length>1;if(oe||(k.__webglTexture===void 0&&(k.__webglTexture=i.createTexture()),k.__version=S.version,a.memory.textures++),ae){F.__webglFramebuffer=[];for(let j=0;j<6;j++)if(S.mipmaps&&S.mipmaps.length>0){F.__webglFramebuffer[j]=[];for(let ne=0;ne<S.mipmaps.length;ne++)F.__webglFramebuffer[j][ne]=i.createFramebuffer()}else F.__webglFramebuffer[j]=i.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){F.__webglFramebuffer=[];for(let j=0;j<S.mipmaps.length;j++)F.__webglFramebuffer[j]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(oe)for(let j=0,ne=K.length;j<ne;j++){const le=n.get(K[j]);le.__webglTexture===void 0&&(le.__webglTexture=i.createTexture(),a.memory.textures++)}if(A.samples>0&&tt(A)===!1){F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let j=0;j<K.length;j++){const ne=K[j];F.__webglColorRenderbuffer[j]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[j]);const le=s.convert(ne.format,ne.colorSpace),Ie=s.convert(ne.type),de=M(ne.internalFormat,le,Ie,ne.normalized,ne.colorSpace,A.isXRRenderTarget===!0),ce=et(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,ce,de,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+j,i.RENDERBUFFER,F.__webglColorRenderbuffer[j])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),q(F.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ae){t.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture),qe(i.TEXTURE_CUBE_MAP,S);for(let j=0;j<6;j++)if(S.mipmaps&&S.mipmaps.length>0)for(let ne=0;ne<S.mipmaps.length;ne++)Se(F.__webglFramebuffer[j][ne],A,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+j,ne);else Se(F.__webglFramebuffer[j],A,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0);m(S)&&v(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(oe){for(let j=0,ne=K.length;j<ne;j++){const le=K[j],Ie=n.get(le);let de=i.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(de=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(de,Ie.__webglTexture),qe(de,le),Se(F.__webglFramebuffer,A,le,i.COLOR_ATTACHMENT0+j,de,0),m(le)&&v(de)}t.unbindTexture()}else{let j=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(j=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(j,k.__webglTexture),qe(j,S),S.mipmaps&&S.mipmaps.length>0)for(let ne=0;ne<S.mipmaps.length;ne++)Se(F.__webglFramebuffer[ne],A,S,i.COLOR_ATTACHMENT0,j,ne);else Se(F.__webglFramebuffer,A,S,i.COLOR_ATTACHMENT0,j,0);m(S)&&v(j),t.unbindTexture()}A.depthBuffer&&ge(A)}function Me(A){const S=A.textures;for(let F=0,k=S.length;F<k;F++){const K=S[F];if(m(K)){const ae=b(A),oe=n.get(K).__webglTexture;t.bindTexture(ae,oe),v(ae),t.unbindTexture()}}}const Ye=[],je=[];function dt(A){if(A.samples>0){if(tt(A)===!1){const S=A.textures,F=A.width,k=A.height;let K=i.COLOR_BUFFER_BIT;const ae=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,oe=n.get(A),j=S.length>1;if(j)for(let le=0;le<S.length;le++)t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+le,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+le,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,oe.__webglMultisampledFramebuffer);const ne=A.texture.mipmaps;ne&&ne.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let le=0;le<S.length;le++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(K|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(K|=i.STENCIL_BUFFER_BIT)),j){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,oe.__webglColorRenderbuffer[le]);const Ie=n.get(S[le]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ie,0)}i.blitFramebuffer(0,0,F,k,0,0,F,k,K,i.NEAREST),l===!0&&(Ye.length=0,je.length=0,Ye.push(i.COLOR_ATTACHMENT0+le),A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&(Ye.push(ae),je.push(ae),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,je)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ye))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),j)for(let le=0;le<S.length;le++){t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+le,i.RENDERBUFFER,oe.__webglColorRenderbuffer[le]);const Ie=n.get(S[le]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+le,i.TEXTURE_2D,Ie,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&l){const S=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[S])}}}function et(A){return Math.min(r.maxSamples,A.samples)}function tt(A){const S=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function P(A){const S=a.render.frame;h.get(A)!==S&&(h.set(A,S),A.update())}function vt(A,S){const F=A.colorSpace,k=A.format,K=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||F!==hr&&F!==cn&&($e.getTransfer(F)===ut?(k!==nn||K!==Zt)&&ze("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):rt("WebGLTextures: Unsupported texture color space:",F)),S}function nt(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(o.width=A.naturalWidth||A.width,o.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(o.width=A.displayWidth,o.height=A.displayHeight):(o.width=A.width,o.height=A.height),o}this.allocateTextureUnit=$,this.resetTextureUnits=X,this.getTextureUnits=U,this.setTextureUnits=z,this.setTexture2D=se,this.setTexture2DArray=G,this.setTexture3D=J,this.setTextureCube=ee,this.rebindTextures=Pe,this.setupRenderTarget=Ce,this.updateRenderTargetMipmap=Me,this.updateMultisampleRenderTarget=dt,this.setupDepthRenderbuffer=ge,this.setupFrameBufferTexture=Se,this.useMultisampledRTT=tt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function bg(i,e){function t(n,r=cn){let s;const a=$e.getTransfer(r);if(n===Zt)return i.UNSIGNED_BYTE;if(n===Ja)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Qa)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Hl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Vl)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Gl)return i.BYTE;if(n===Wl)return i.SHORT;if(n===cr)return i.UNSIGNED_SHORT;if(n===$a)return i.INT;if(n===Mn)return i.UNSIGNED_INT;if(n===gn)return i.FLOAT;if(n===Sn)return i.HALF_FLOAT;if(n===Xl)return i.ALPHA;if(n===Yl)return i.RGB;if(n===nn)return i.RGBA;if(n===Un)return i.DEPTH_COMPONENT;if(n===ai)return i.DEPTH_STENCIL;if(n===ql)return i.RED;if(n===ja)return i.RED_INTEGER;if(n===hi)return i.RG;if(n===eo)return i.RG_INTEGER;if(n===to)return i.RGBA_INTEGER;if(n===$r||n===Jr||n===Qr||n===jr)if(a===ut)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===$r)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Jr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Qr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===jr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===$r)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Jr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Qr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===jr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ua||n===ha||n===da||n===fa)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===ua)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ha)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===da)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===fa)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===pa||n===ma||n===ga||n===_a||n===xa||n===ns||n===va)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===pa||n===ma)return a===ut?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===ga)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===_a)return s.COMPRESSED_R11_EAC;if(n===xa)return s.COMPRESSED_SIGNED_R11_EAC;if(n===ns)return s.COMPRESSED_RG11_EAC;if(n===va)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Ma||n===Sa||n===ba||n===Ea||n===ya||n===wa||n===Ta||n===Aa||n===Ba||n===Ra||n===Ca||n===La||n===Da||n===Pa)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Ma)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Sa)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ba)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ea)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ya)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===wa)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ta)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Aa)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ba)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ra)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ca)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===La)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Da)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Pa)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ia||n===Na||n===Ua)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Ia)return a===ut?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Na)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ua)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Fa||n===Oa||n===is||n===ka)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Fa)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Oa)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===is)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ka)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ur?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const Eg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,yg=`
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

}`;class wg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new ic(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Wt({vertexShader:Eg,fragmentShader:yg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Jt(new Zn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Tg extends fi{constructor(e,t){super();const n=this;let r=null,s=1,a=null,c="local-floor",l=1,o=null,h=null,d=null,u=null,f=null,g=null;const _=typeof XRWebGLBinding<"u",p=new wg,m={},v=t.getContextAttributes();let b=null,M=null;const y=[],T=[],C=new He;let E=null,B=null;const L=new tn;L.viewport=new xt;const D=new tn;D.viewport=new xt;const O=[L,D],X=new Pd;let U=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let ie=y[Q];return ie===void 0&&(ie=new Ls,y[Q]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(Q){let ie=y[Q];return ie===void 0&&(ie=new Ls,y[Q]=ie),ie.getGripSpace()},this.getHand=function(Q){let ie=y[Q];return ie===void 0&&(ie=new Ls,y[Q]=ie),ie.getHandSpace()};function $(Q){const ie=T.indexOf(Q.inputSource);if(ie===-1)return;const be=y[ie];be!==void 0&&(be.update(Q.inputSource,Q.frame,o||a),be.dispatchEvent({type:Q.type,data:Q.inputSource}))}function Z(){r.removeEventListener("select",$),r.removeEventListener("selectstart",$),r.removeEventListener("selectend",$),r.removeEventListener("squeeze",$),r.removeEventListener("squeezestart",$),r.removeEventListener("squeezeend",$),r.removeEventListener("end",Z),r.removeEventListener("inputsourceschange",se);for(let Q=0;Q<y.length;Q++){const ie=T[Q];ie!==null&&(T[Q]=null,y[Q].disconnect(ie))}U=null,z=null,p.reset();for(const Q in m)delete m[Q];if(e.setRenderTarget(b),f=null,u=null,d=null,r=null,M=null,Qe.stop(),n.isPresenting=!1,e.setPixelRatio(E),e.setSize(C.width,C.height,!1),B!==null){const Q=B.camera;Q.fov=B.fov,Q.zoom=B.zoom,Q.updateProjectionMatrix(),B=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){s=Q,n.isPresenting===!0&&ze("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){c=Q,n.isPresenting===!0&&ze("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return o||a},this.setReferenceSpace=function(Q){o=Q},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(Q){if(r=Q,r!==null){if(b=e.getRenderTarget(),r.addEventListener("select",$),r.addEventListener("selectstart",$),r.addEventListener("selectend",$),r.addEventListener("squeeze",$),r.addEventListener("squeezestart",$),r.addEventListener("squeezeend",$),r.addEventListener("end",Z),r.addEventListener("inputsourceschange",se),v.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(C),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let be=null,ke=null,Se=null;v.depth&&(Se=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,be=v.stencil?ai:Un,ke=v.stencil?ur:Mn);const q={colorFormat:t.RGBA8,depthFormat:Se,scaleFactor:s};d=this.getBinding(),u=d.createProjectionLayer(q),r.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),M=new rn(u.textureWidth,u.textureHeight,{format:nn,type:Zt,depthTexture:new dr(u.textureWidth,u.textureHeight,ke,void 0,void 0,void 0,void 0,void 0,void 0,be),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{const be={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,t,be),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new rn(f.framebufferWidth,f.framebufferHeight,{format:nn,type:Zt,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),o=null,a=await r.requestReferenceSpace(c),Qe.setContext(r),Qe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function se(Q){for(let ie=0;ie<Q.removed.length;ie++){const be=Q.removed[ie],ke=T.indexOf(be);ke>=0&&(T[ke]=null,y[ke].disconnect(be))}for(let ie=0;ie<Q.added.length;ie++){const be=Q.added[ie];let ke=T.indexOf(be);if(ke===-1){for(let q=0;q<y.length;q++)if(q>=T.length){T.push(be),ke=q;break}else if(T[q]===null){T[q]=be,ke=q;break}if(ke===-1)break}const Se=y[ke];Se&&Se.connect(be)}}const G=new W,J=new W;function ee(Q,ie,be){G.setFromMatrixPosition(ie.matrixWorld),J.setFromMatrixPosition(be.matrixWorld);const ke=G.distanceTo(J),Se=ie.projectionMatrix.elements,q=be.projectionMatrix.elements,ve=Se[14]/(Se[10]-1),ge=Se[14]/(Se[10]+1),Pe=(Se[9]+1)/Se[5],Ce=(Se[9]-1)/Se[5],Me=(Se[8]-1)/Se[0],Ye=(q[8]+1)/q[0],je=ve*Me,dt=ve*Ye,et=ke/(-Me+Ye),tt=et*-Me;if(ie.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(tt),Q.translateZ(et),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),Se[10]===-1)Q.projectionMatrix.copy(ie.projectionMatrix),Q.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{const P=ve+et,vt=ge+et,nt=je-tt,A=dt+(ke-tt),S=Pe*ge/vt*P,F=Ce*ge/vt*P;Q.projectionMatrix.makePerspective(nt,A,S,F,P,vt),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function Te(Q,ie){ie===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(ie.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(r===null)return;let ie=Q.near,be=Q.far;p.texture!==null&&(p.depthNear>0&&(ie=p.depthNear),p.depthFar>0&&(be=p.depthFar)),X.near=D.near=L.near=ie,X.far=D.far=L.far=be,(U!==X.near||z!==X.far)&&(r.updateRenderState({depthNear:X.near,depthFar:X.far}),U=X.near,z=X.far),X.layers.mask=Q.layers.mask|6,L.layers.mask=X.layers.mask&-5,D.layers.mask=X.layers.mask&-3;const ke=Q.parent,Se=X.cameras;Te(X,ke);for(let q=0;q<Se.length;q++)Te(Se[q],ke);Se.length===2?ee(X,L,D):X.projectionMatrix.copy(L.projectionMatrix),B===null&&Q.isPerspectiveCamera&&(B={camera:Q,fov:Q.fov,zoom:Q.zoom}),Re(Q,X,ke)};function Re(Q,ie,be){be===null?Q.matrix.copy(ie.matrixWorld):(Q.matrix.copy(be.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(ie.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(ie.projectionMatrix),Q.projectionMatrixInverse.copy(ie.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=za*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return X},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(Q){l=Q,u!==null&&(u.fixedFoveation=Q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Q)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(X)},this.getCameraTexture=function(Q){return m[Q]};let ct=null;function qe(Q,ie){if(h=ie.getViewerPose(o||a),g=ie,h!==null){const be=h.views;f!==null&&(e.setRenderTargetFramebuffer(M,f.framebuffer),e.setRenderTarget(M));let ke=!1;be.length!==X.cameras.length&&(X.cameras.length=0,ke=!0);for(let ge=0;ge<be.length;ge++){const Pe=be[ge];let Ce=null;if(f!==null)Ce=f.getViewport(Pe);else{const Ye=d.getViewSubImage(u,Pe);Ce=Ye.viewport,ge===0&&(e.setRenderTargetTextures(M,Ye.colorTexture,Ye.depthStencilTexture),e.setRenderTarget(M))}let Me=O[ge];Me===void 0&&(Me=new tn,Me.layers.enable(ge),Me.viewport=new xt,O[ge]=Me),Me.matrix.fromArray(Pe.transform.matrix),Me.matrix.decompose(Me.position,Me.quaternion,Me.scale),Me.projectionMatrix.fromArray(Pe.projectionMatrix),Me.projectionMatrixInverse.copy(Me.projectionMatrix).invert(),Me.viewport.set(Ce.x,Ce.y,Ce.width,Ce.height),ge===0&&(X.matrix.copy(Me.matrix),X.matrix.decompose(X.position,X.quaternion,X.scale)),ke===!0&&X.cameras.push(Me)}const Se=r.enabledFeatures;if(Se&&Se.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&_){d=n.getBinding();const ge=d.getDepthInformation(be[0]);ge&&ge.isValid&&ge.texture&&p.init(ge,r.renderState)}if(Se&&Se.includes("camera-access")&&_){e.state.unbindTexture(),d=n.getBinding();for(let ge=0;ge<be.length;ge++){const Pe=be[ge].camera;if(Pe){let Ce=m[Pe];Ce||(Ce=new ic,m[Pe]=Ce);const Me=d.getCameraImage(Pe);Ce.sourceTexture=Me}}}}for(let be=0;be<y.length;be++){const ke=T[be],Se=y[be];ke!==null&&Se!==void 0&&Se.update(ke,ie,o||a)}ct&&ct(Q,ie),ie.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ie}),g=null}const Qe=new oc;Qe.setAnimationLoop(qe),this.setAnimationLoop=function(Q){ct=Q},this.dispose=function(){}}}const Ag=new Et,pc=new Ge;pc.set(-1,0,0,0,1,0,0,0,1);function Bg(i,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,rc(i)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function r(p,m,v,b,M){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?s(p,m):m.isMeshLambertMaterial?(s(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(s(p,m),d(p,m)):m.isMeshPhongMaterial?(s(p,m),h(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(s(p,m),u(p,m),m.isMeshPhysicalMaterial&&f(p,m,M)):m.isMeshMatcapMaterial?(s(p,m),g(p,m)):m.isMeshDepthMaterial?s(p,m):m.isMeshDistanceMaterial?(s(p,m),_(p,m)):m.isMeshNormalMaterial?s(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&c(p,m)):m.isPointsMaterial?l(p,m,v,b):m.isSpriteMaterial?o(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Gt&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Gt&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const v=e.get(m),b=v.envMap,M=v.envMapRotation;b&&(p.envMap.value=b,p.envMapRotation.value.setFromMatrix4(Ag.makeRotationFromEuler(M)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(pc),p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function c(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,v,b){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*v,p.scale.value=b*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function d(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function u(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,v){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Gt&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.retroreflectivity>0&&(p.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=v.texture,p.transmissionSamplerSize.value.set(v.width,v.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function _(p,m){const v=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(v.matrixWorld),p.nearDistance.value=v.shadow.camera.near,p.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function Rg(i,e,t,n){let r={},s={},a=[];const c=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,y){const T=y.program;n.uniformBlockBinding(M,T)}function o(M,y){let T=r[M.id];T===void 0&&(p(M),T=h(M),r[M.id]=T,M.addEventListener("dispose",v));const C=y.program;n.updateUBOMapping(M,C);const E=e.render.frame;s[M.id]!==E&&(u(M),s[M.id]=E)}function h(M){const y=d();M.__bindingPointIndex=y;const T=i.createBuffer(),C=M.__size,E=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,T),i.bufferData(i.UNIFORM_BUFFER,C,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,T),T}function d(){for(let M=0;M<c;M++)if(a.indexOf(M)===-1)return a.push(M),M;return rt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(M){const y=r[M.id],T=M.uniforms,C=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let E=0,B=T.length;E<B;E++){const L=T[E];if(Array.isArray(L))for(let D=0,O=L.length;D<O;D++)f(L[D],E,D,C);else f(L,E,0,C)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(M,y,T,C){if(_(M,y,T,C)===!0){const E=M.__offset,B=M.value;if(Array.isArray(B)){let L=0;for(let D=0;D<B.length;D++){const O=B[D],X=m(O);g(O,M.__data,L),typeof O!="number"&&typeof O!="boolean"&&!O.isMatrix3&&!ArrayBuffer.isView(O)&&(L+=X.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(B,M.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,E,M.__data)}}function g(M,y,T){typeof M=="number"||typeof M=="boolean"?y[0]=M:M.isMatrix3?(y[0]=M.elements[0],y[1]=M.elements[1],y[2]=M.elements[2],y[3]=0,y[4]=M.elements[3],y[5]=M.elements[4],y[6]=M.elements[5],y[7]=0,y[8]=M.elements[6],y[9]=M.elements[7],y[10]=M.elements[8],y[11]=0):ArrayBuffer.isView(M)?y.set(new M.constructor(M.buffer,M.byteOffset,y.length)):M.toArray(y,T)}function _(M,y,T,C){const E=M.value,B=y+"_"+T;if(C[B]===void 0)return typeof E=="number"||typeof E=="boolean"?C[B]=E:ArrayBuffer.isView(E)?C[B]=E.slice():C[B]=E.clone(),!0;{const L=C[B];if(typeof E=="number"||typeof E=="boolean"){if(L!==E)return C[B]=E,!0}else{if(ArrayBuffer.isView(E))return!0;if(L.equals(E)===!1)return L.copy(E),!0}}return!1}function p(M){const y=M.uniforms;let T=0;const C=16;for(let B=0,L=y.length;B<L;B++){const D=Array.isArray(y[B])?y[B]:[y[B]];for(let O=0,X=D.length;O<X;O++){const U=D[O],z=Array.isArray(U.value)?U.value:[U.value];for(let $=0,Z=z.length;$<Z;$++){const se=z[$],G=m(se),J=T%C,ee=J%G.boundary,Te=J+ee;T+=ee,Te!==0&&C-Te<G.storage&&(T+=C-Te),U.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=T,T+=G.storage}}}const E=T%C;return E>0&&(T+=C-E),M.__size=T,M.__cache={},this}function m(M){const y={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(y.boundary=4,y.storage=4):M.isVector2?(y.boundary=8,y.storage=8):M.isVector3||M.isColor?(y.boundary=16,y.storage=12):M.isVector4?(y.boundary=16,y.storage=16):M.isMatrix3?(y.boundary=48,y.storage=48):M.isMatrix4?(y.boundary=64,y.storage=64):M.isTexture?ze("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(y.boundary=16,y.storage=M.byteLength):ze("WebGLRenderer: Unsupported uniform value type.",M),y}function v(M){const y=M.target;y.removeEventListener("dispose",v);const T=a.indexOf(y.__bindingPointIndex);a.splice(T,1),i.deleteBuffer(r[y.id]),delete r[y.id],delete s[y.id]}function b(){for(const M in r)i.deleteBuffer(r[M]);a=[],r={},s={}}return{bind:l,update:o,dispose:b}}const Cg=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let pn=null;function Lg(){return pn===null&&(pn=new Di(Cg,16,16,hi,Sn),pn.name="DFG_LUT",pn.minFilter=bt,pn.magFilter=bt,pn.wrapS=Ln,pn.wrapT=Ln,pn.generateMipmaps=!1,pn.needsUpdate=!0),pn}class Dg{constructor(e={}){const{canvas:t=Zh(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:c=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:o=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=Zt}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const _=f,p=new Set([to,eo,ja]),m=new Set([Zt,Mn,cr,ur,Ja,Qa]),v=new Uint32Array(4),b=new Int32Array(4),M=new W;let y=null,T=null;const C=[],E=[];let B=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=xn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const L=this;let D=!1,O=null,X=null,U=null,z=null;this._outputColorSpace=en;let $=0,Z=0,se=null,G=-1,J=null;const ee=new xt,Te=new xt;let Re=null;const ct=new at(0);let qe=0,Qe=t.width,Q=t.height,ie=1,be=null,ke=null;const Se=new xt(0,0,Qe,Q),q=new xt(0,0,Qe,Q);let ve=!1;const ge=new tc;let Pe=!1,Ce=!1;const Me=new Et,Ye=new W,je=new xt,dt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let et=!1;function tt(){return se===null?ie:1}let P=n;function vt(w,I){return t.getContext(w,I)}let nt,A,S,F,k,K,ae,oe,j,ne,le,Ie,de,ce,Ne,Oe,We,N,ue,te,he,xe,re;try{const w={alpha:!0,depth:r,stencil:s,antialias:c,premultipliedAlpha:l,preserveDrawingBuffer:o,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Za}`),t.addEventListener("webglcontextlost",pt,!1),t.addEventListener("webglcontextrestored",ot,!1),t.addEventListener("webglcontextcreationerror",sn,!1),P===null){const I="webgl2";if(P=vt(I,w),P===null)throw vt(I)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ue()}catch(w){throw t.removeEventListener("webglcontextlost",pt,!1),t.removeEventListener("webglcontextrestored",ot,!1),t.removeEventListener("webglcontextcreationerror",sn,!1),rt("WebGLRenderer: "+w.message),w}function Ue(){nt=new Lm(P),nt.init(),he=new bg(P,nt),A=new Sm(P,nt,e,he),S=new Mg(P,nt),A.reversedDepthBuffer&&u&&S.buffers.depth.setReversed(!0),X=P.createFramebuffer(),U=P.createFramebuffer(),z=P.createFramebuffer(),F=new Im(P),k=new ag,K=new Sg(P,nt,S,k,A,he,F),ae=new Cm(L),oe=new Nd(P),xe=new vm(P,oe),j=new Dm(P,oe,F,xe),ne=new Um(P,j,oe,xe,F),N=new Nm(P,A,K),Ne=new bm(k),le=new sg(L,ae,nt,A,xe,Ne),Ie=new Bg(L,k),de=new lg,ce=new pg(nt),We=new xm(L,ae,S,ne,g,l),Oe=new vg(L,ne,A),re=new Rg(P,F,A,S),ue=new Mm(P,nt,F),te=new Pm(P,nt,F),F.programs=le.programs,L.capabilities=A,L.extensions=nt,L.properties=k,L.renderLists=de,L.shadowMap=Oe,L.state=S,L.info=F}_!==Zt&&(B=new Om(_,t.width,t.height,c,r,s));const Le=new Tg(L,P);this.xr=Le,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const w=nt.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=nt.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return ie},this.setPixelRatio=function(w){w!==void 0&&(ie=w,this.setSize(Qe,Q,!1))},this.getSize=function(w){return w.set(Qe,Q)},this.setSize=function(w,I,Y=!0){if(Le.isPresenting){ze("WebGLRenderer: Can't change size while VR device is presenting.");return}Qe=w,Q=I,t.width=Math.floor(w*ie),t.height=Math.floor(I*ie),Y===!0&&(t.style.width=w+"px",t.style.height=I+"px"),B!==null&&B.setSize(t.width,t.height),this.setViewport(0,0,w,I)},this.getDrawingBufferSize=function(w){return w.set(Qe*ie,Q*ie).floor()},this.setDrawingBufferSize=function(w,I,Y){Qe=w,Q=I,ie=Y,t.width=Math.floor(w*Y),t.height=Math.floor(I*Y),this.setViewport(0,0,w,I)},this.setEffects=function(w){if(_===Zt){rt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let I=0;I<w.length;I++)if(w[I].isOutputPass===!0){ze("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}B.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(ee)},this.getViewport=function(w){return w.copy(Se)},this.setViewport=function(w,I,Y,H){w.isVector4?Se.set(w.x,w.y,w.z,w.w):Se.set(w,I,Y,H),S.viewport(ee.copy(Se).multiplyScalar(ie).round())},this.getScissor=function(w){return w.copy(q)},this.setScissor=function(w,I,Y,H){w.isVector4?q.set(w.x,w.y,w.z,w.w):q.set(w,I,Y,H),S.scissor(Te.copy(q).multiplyScalar(ie).round())},this.getScissorTest=function(){return ve},this.setScissorTest=function(w){S.setScissorTest(ve=w)},this.setOpaqueSort=function(w){be=w},this.setTransparentSort=function(w){ke=w},this.getClearColor=function(w){return w.copy(We.getClearColor())},this.setClearColor=function(){We.setClearColor(...arguments)},this.getClearAlpha=function(){return We.getClearAlpha()},this.setClearAlpha=function(){We.setClearAlpha(...arguments)},this.clear=function(w=!0,I=!0,Y=!0){let H=0;if(w){let V=!1;if(se!==null){const _e=se.texture.format;V=p.has(_e)}if(V){const _e=se.texture.type,ye=m.has(_e),pe=We.getClearColor(),Ae=We.getClearAlpha(),De=pe.r,Ve=pe.g,Ke=pe.b;ye?(v[0]=De,v[1]=Ve,v[2]=Ke,v[3]=Ae,P.clearBufferuiv(P.COLOR,0,v)):(b[0]=De,b[1]=Ve,b[2]=Ke,b[3]=Ae,P.clearBufferiv(P.COLOR,0,b))}else H|=P.COLOR_BUFFER_BIT}I&&(H|=P.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Y&&(H|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&P.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),O=w},this.dispose=function(){t.removeEventListener("webglcontextlost",pt,!1),t.removeEventListener("webglcontextrestored",ot,!1),t.removeEventListener("webglcontextcreationerror",sn,!1),We.dispose(),de.dispose(),ce.dispose(),k.dispose(),ae.dispose(),ne.dispose(),xe.dispose(),re.dispose(),le.dispose(),Le.dispose(),Le.removeEventListener("sessionstart",co),Le.removeEventListener("sessionend",uo),$n.stop()};function pt(w){w.preventDefault(),Co("WebGLRenderer: Context Lost."),D=!0}function ot(){Co("WebGLRenderer: Context Restored."),D=!1;const w=F.autoReset,I=Oe.enabled,Y=Oe.autoUpdate,H=Oe.needsUpdate,V=Oe.type;Ue(),F.autoReset=w,Oe.enabled=I,Oe.autoUpdate=Y,Oe.needsUpdate=H,Oe.type=V}function sn(w){rt("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function hn(w){const I=w.target;I.removeEventListener("dispose",hn),wc(I)}function wc(w){Tc(w),k.remove(w)}function Tc(w){const I=k.get(w).programs;I!==void 0&&(I.forEach(function(Y){le.releaseProgram(Y)}),w.isShaderMaterial&&le.releaseShaderCache(w))}this.renderBufferDirect=function(w,I,Y,H,V,_e){I===null&&(I=dt);const ye=V.isMesh&&V.matrixWorld.determinantAffine()<0,pe=Rc(w,I,Y,H,V);S.setMaterial(H,ye);let Ae=Y.index,De=1;if(H.wireframe===!0){if(Ae=j.getWireframeAttribute(Y),Ae===void 0)return;De=2}const Ve=Y.drawRange,Ke=Y.attributes.position;let Be=Ve.start*De,lt=(Ve.start+Ve.count)*De;_e!==null&&(Be=Math.max(Be,_e.start*De),lt=Math.min(lt,(_e.start+_e.count)*De)),Ae!==null?(Be=Math.max(Be,0),lt=Math.min(lt,Ae.count)):Ke!=null&&(Be=Math.max(Be,0),lt=Math.min(lt,Ke.count));const yt=lt-Be;if(yt<0||yt===1/0)return;xe.setup(V,H,pe,Y,Ae);let _t,ft=ue;if(Ae!==null&&(_t=oe.get(Ae),ft=te,ft.setIndex(_t)),V.isMesh)H.wireframe===!0?(S.setLineWidth(H.wireframeLinewidth*tt()),ft.setMode(P.LINES)):ft.setMode(P.TRIANGLES);else if(V.isLine){let Lt=H.linewidth;Lt===void 0&&(Lt=1),S.setLineWidth(Lt*tt()),V.isLineSegments?ft.setMode(P.LINES):V.isLineLoop?ft.setMode(P.LINE_LOOP):ft.setMode(P.LINE_STRIP)}else V.isPoints?ft.setMode(P.POINTS):V.isSprite&&ft.setMode(P.TRIANGLES);if(V.isBatchedMesh)if(nt.get("WEBGL_multi_draw"))ft.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{const Lt=V._multiDrawStarts,Ee=V._multiDrawCounts,Ut=V._multiDrawCount,it=Ae?oe.get(Ae).bytesPerElement:1,Qt=k.get(H).currentProgram.getUniforms();for(let dn=0;dn<Ut;dn++)Qt.setValue(P,"_gl_DrawID",dn),ft.render(Lt[dn]/it,Ee[dn])}else if(V.isInstancedMesh)ft.renderInstances(Be,yt,V.count);else if(Y.isInstancedBufferGeometry){const Lt=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,Ee=Math.min(Y.instanceCount,Lt);ft.renderInstances(Be,yt,Ee)}else ft.render(Be,yt)};function lo(w,I,Y,H){O!==null&&w.isNodeMaterial&&O.setObject(H,w),Pe===!0&&Ne.setState(w,Y,!1),w.transparent===!0&&w.side===Cn&&w.forceSinglePass===!1?(w.side=Gt,w.needsUpdate=!0,Sr(w,I,H),w.side=ci,w.needsUpdate=!0,Sr(w,I,H),w.side=Cn):Sr(w,I,H)}this.compile=function(w,I,Y=null){Y===null&&(Y=w),O!==null&&O.renderStart(w,I,Y),T=ce.get(Y),T.init(I),E.push(T),Y.traverseVisible(function(V){V.isLight&&V.layers.test(I.layers)&&(T.pushLight(V),V.castShadow&&T.pushShadow(V))}),w!==Y&&w.traverseVisible(function(V){V.isLight&&V.layers.test(I.layers)&&(T.pushLight(V),V.castShadow&&T.pushShadow(V))}),T.setupLights(),O!==null&&O.updateLights(T.state.lightsArray),Ce=this.localClippingEnabled,Pe=Ne.init(this.clippingPlanes,Ce),Pe===!0&&Ne.setGlobalState(this.clippingPlanes,I),O!==null&&Oe.render(T.state.shadowsArray,Y,I);const H=new Set;return w.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;const _e=V.material;if(_e)if(Array.isArray(_e))for(let ye=0;ye<_e.length;ye++){const pe=_e[ye];lo(pe,Y,I,V),H.add(pe)}else lo(_e,Y,I,V),H.add(_e)}),T=E.pop(),O!==null&&O.renderEnd(),H},this.compileAsync=function(w,I,Y=null){const H=this.compile(w,I,Y);return new Promise(V=>{function _e(){if(H.forEach(function(ye){const Ae=k.get(ye).currentProgram;(Ae===void 0||Ae.isReady())&&H.delete(ye)}),H.size===0){V(w);return}setTimeout(_e,10)}nt.get("KHR_parallel_shader_compile")!==null?_e():setTimeout(_e,10)})};let _s=null;function Ac(w){_s&&_s(w)}function co(){$n.stop()}function uo(){$n.start()}const $n=new oc;$n.setAnimationLoop(Ac),typeof self<"u"&&$n.setContext(self),this.setAnimationLoop=function(w){_s=w,Le.setAnimationLoop(w),w===null?$n.stop():$n.start()},Le.addEventListener("sessionstart",co),Le.addEventListener("sessionend",uo),this.render=function(w,I){if(I!==void 0&&I.isCamera!==!0){rt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;O!==null&&O.renderStart(w,I);const Y=Le.enabled===!0&&Le.isPresenting===!0,H=B!==null&&(se===null||Y)&&B.begin(L,se);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),Le.enabled===!0&&Le.isPresenting===!0&&(B===null||B.isCompositing()===!1)&&(Le.cameraAutoUpdate===!0&&Le.updateCamera(I),I=Le.getCamera()),w.isScene===!0&&w.onBeforeRender(L,w,I,se),T=ce.get(w,E.length),T.init(I),T.state.textureUnits=K.getTextureUnits(),E.push(T),Me.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),ge.setFromProjectionMatrix(Me,_n,I.reversedDepth),Ce=this.localClippingEnabled,Pe=Ne.init(this.clippingPlanes,Ce),y=de.get(w,C.length),y.init(),C.push(y),Le.enabled===!0&&Le.isPresenting===!0){const ye=L.xr.getDepthSensingMesh();ye!==null&&xs(ye,I,-1/0,L.sortObjects)}xs(w,I,0,L.sortObjects),y.finish(),O!==null&&O.updateLights(T.state.lightsArray),L.sortObjects===!0&&y.sort(be,ke),et=Le.enabled===!1||Le.isPresenting===!1||Le.hasDepthSensing()===!1,et&&We.addToRenderList(y,w),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Pe===!0&&Ne.beginShadows();const V=T.state.shadowsArray;if(Oe.render(V,w,I),Pe===!0&&Ne.endShadows(),(H&&B.hasRenderPass())===!1){const ye=y.opaque,pe=y.transmissive;if(T.setupLights(),I.isArrayCamera){const Ae=I.cameras;if(pe.length>0)for(let De=0,Ve=Ae.length;De<Ve;De++){const Ke=Ae[De];fo(ye,pe,w,Ke)}et&&We.render(w);for(let De=0,Ve=Ae.length;De<Ve;De++){const Ke=Ae[De];ho(y,w,Ke,Ke.viewport)}}else pe.length>0&&fo(ye,pe,w,I),et&&We.render(w),ho(y,w,I)}se!==null&&Z===0&&(K.updateMultisampleRenderTarget(se),K.updateRenderTargetMipmap(se)),H&&B.end(L),w.isScene===!0&&w.onAfterRender(L,w,I),xe.resetDefaultState(),G=-1,J=null,E.pop(),E.length>0?(T=E[E.length-1],K.setTextureUnits(T.state.textureUnits),Pe===!0&&Ne.setGlobalState(L.clippingPlanes,T.state.camera)):T=null,C.pop(),C.length>0?y=C[C.length-1]:y=null,O!==null&&O.renderEnd()};function xs(w,I,Y,H){if(w.visible===!1)return;if(w.layers.test(I.layers)){if(w.isGroup)Y=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(I);else if(w.isLightProbeGrid)T.pushLightProbeGrid(w);else if(w.isLight)T.pushLight(w),w.castShadow&&T.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||w.intersectsFrustum(ge)){H&&je.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Me);const ye=ne.update(w),pe=w.material;pe.visible&&y.push(w,ye,pe,Y,je.z,null,I)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||w.intersectsFrustum(ge))){const ye=ne.update(w),pe=w.material;if(H&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),je.copy(w.boundingSphere.center)):(ye.boundingSphere===null&&ye.computeBoundingSphere(),je.copy(ye.boundingSphere.center)),je.applyMatrix4(w.matrixWorld).applyMatrix4(Me)),Array.isArray(pe)){const Ae=ye.groups;for(let De=0,Ve=Ae.length;De<Ve;De++){const Ke=Ae[De],Be=pe[Ke.materialIndex];Be&&Be.visible&&y.push(w,ye,Be,Y,je.z,Ke,I)}}else pe.visible&&y.push(w,ye,pe,Y,je.z,null,I)}}const _e=w.children;for(let ye=0,pe=_e.length;ye<pe;ye++)xs(_e[ye],I,Y,H)}function ho(w,I,Y,H){const{opaque:V,transmissive:_e,transparent:ye}=w;T.setupLightsView(Y),Pe===!0&&Ne.setGlobalState(L.clippingPlanes,Y),H&&S.viewport(ee.copy(H)),V.length>0&&Mr(V,I,Y),_e.length>0&&Mr(_e,I,Y),ye.length>0&&Mr(ye,I,Y),S.buffers.depth.setTest(!0),S.buffers.depth.setMask(!0),S.buffers.color.setMask(!0),S.setPolygonOffset(!1)}function fo(w,I,Y,H){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[H.id]===void 0){const Be=nt.has("EXT_color_buffer_half_float")||nt.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[H.id]=new rn(1,1,{generateMipmaps:!0,type:Be?Sn:Zt,minFilter:si,samples:Math.max(4,A.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:$e.workingColorSpace})}const _e=T.state.transmissionRenderTarget[H.id],ye=H.viewport||ee;_e.setSize(ye.z*L.transmissionResolutionScale,ye.w*L.transmissionResolutionScale);const pe=L.getRenderTarget(),Ae=L.getActiveCubeFace(),De=L.getActiveMipmapLevel();L.setRenderTarget(_e),L.getClearColor(ct),qe=L.getClearAlpha(),qe<1&&L.setClearColor(16777215,.5),L.clear(),et&&We.render(Y);const Ve=L.toneMapping;L.toneMapping=xn;const Ke=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),T.setupLightsView(H),Pe===!0&&Ne.setGlobalState(L.clippingPlanes,H),Mr(w,Y,H),K.updateMultisampleRenderTarget(_e),K.updateRenderTargetMipmap(_e),nt.has("WEBGL_multisampled_render_to_texture")===!1){let Be=!1;for(let lt=0,yt=I.length;lt<yt;lt++){const _t=I[lt],{object:ft,geometry:Lt,material:Ee,group:Ut}=_t;if(Ee.side===Cn&&ft.layers.test(H.layers)){const it=Ee.side;Ee.side=Gt,Ee.needsUpdate=!0,po(ft,Y,H,Lt,Ee,Ut),Ee.side=it,Ee.needsUpdate=!0,Be=!0}}Be===!0&&(K.updateMultisampleRenderTarget(_e),K.updateRenderTargetMipmap(_e))}L.setRenderTarget(pe,Ae,De),L.setClearColor(ct,qe),Ke!==void 0&&(H.viewport=Ke),L.toneMapping=Ve}function Mr(w,I,Y){const H=I.isScene===!0?I.overrideMaterial:null;for(let V=0,_e=w.length;V<_e;V++){const ye=w[V],{object:pe,geometry:Ae,group:De}=ye;let Ve=ye.material;Ve.allowOverride===!0&&H!==null&&(Ve=H),pe.layers.test(Y.layers)&&po(pe,I,Y,Ae,Ve,De)}}function po(w,I,Y,H,V,_e){O!==null&&V.isNodeMaterial&&O.setObject(w,V),w.onBeforeRender(L,I,Y,H,V,_e),w.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),V.onBeforeRender(L,I,Y,H,w,_e),V.transparent===!0&&V.side===Cn&&V.forceSinglePass===!1?(V.side=Gt,V.needsUpdate=!0,L.renderBufferDirect(Y,I,H,V,w,_e),V.side=ci,V.needsUpdate=!0,L.renderBufferDirect(Y,I,H,V,w,_e),V.side=Cn):L.renderBufferDirect(Y,I,H,V,w,_e),w.onAfterRender(L,I,Y,H,V,_e)}function Sr(w,I,Y){I.isScene!==!0&&(I=dt);const H=k.get(w),V=T.state.lights,_e=T.state.shadowsArray,ye=V.state.version,pe=le.getParameters(w,V.state,_e,I,Y,T.state.lightProbeGridArray),Ae=le.getProgramCacheKey(pe);let De=H.programs;H.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?I.environment:null,H.fog=I.fog;const Ve=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;H.envMap=ae.get(w.envMap||H.environment,Ve),H.envMapRotation=H.environment!==null&&w.envMap===null?I.environmentRotation:w.envMapRotation,De===void 0&&(w.addEventListener("dispose",hn),De=new Map,H.programs=De);let Ke=De.get(Ae);if(Ke!==void 0){if(H.currentProgram===Ke&&H.lightsStateVersion===ye)return go(w,pe),Ke}else pe.uniforms=le.getUniforms(w),O!==null&&w.isNodeMaterial&&O.build(w,Y,pe),w.onBeforeCompile(pe,L),Ke=le.acquireProgram(pe,Ae),De.set(Ae,Ke),H.uniforms=pe.uniforms;const Be=H.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Be.clippingPlanes=Ne.uniform),go(w,pe),H.needsLights=Lc(w),H.lightsStateVersion=ye,H.needsLights&&(Be.ambientLightColor.value=V.state.ambient,Be.lightProbe.value=V.state.probe,Be.sunLights.value=V.state.sun,Be.sunLightShadows.value=V.state.sunShadow,Be.directionalLights.value=V.state.directional,Be.directionalLightShadows.value=V.state.directionalShadow,Be.spotLights.value=V.state.spot,Be.spotLightShadows.value=V.state.spotShadow,Be.rectAreaLights.value=V.state.rectArea,Be.ltc_1.value=V.state.rectAreaLTC1,Be.ltc_2.value=V.state.rectAreaLTC2,Be.pointLights.value=V.state.point,Be.pointLightShadows.value=V.state.pointShadow,Be.hemisphereLights.value=V.state.hemi,Be.sunShadowMatrix.value=V.state.sunShadowMatrix,Be.sunShadowCascade.value=V.state.sunShadowCascade,Be.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Be.spotLightMatrix.value=V.state.spotLightMatrix,Be.spotLightMap.value=V.state.spotLightMap,Be.pointShadowMatrix.value=V.state.pointShadowMatrix),H.lightProbeGrid=T.state.lightProbeGridArray.length>0,H.currentProgram=Ke,H.uniformsList=null,Ke}function mo(w){if(w.uniformsList===null){const I=w.currentProgram.getUniforms();w.uniformsList=es.seqWithValue(I.seq,w.uniforms)}return w.uniformsList}function go(w,I){const Y=k.get(w);Y.outputColorSpace=I.outputColorSpace,Y.batching=I.batching,Y.batchingColor=I.batchingColor,Y.instancing=I.instancing,Y.instancingColor=I.instancingColor,Y.instancingMorph=I.instancingMorph,Y.skinning=I.skinning,Y.morphTargets=I.morphTargets,Y.morphNormals=I.morphNormals,Y.morphColors=I.morphColors,Y.morphTargetsCount=I.morphTargetsCount,Y.numClippingPlanes=I.numClippingPlanes,Y.numIntersection=I.numClipIntersection,Y.vertexAlphas=I.vertexAlphas,Y.vertexTangents=I.vertexTangents,Y.toneMapping=I.toneMapping}function Bc(w,I){if(w.length===0)return null;if(w.length===1)return w[0].texture!==null?w[0]:null;M.setFromMatrixPosition(I.matrixWorld);for(let Y=0,H=w.length;Y<H;Y++){const V=w[Y];if(V.texture!==null&&V.boundingBox.containsPoint(M))return V}return null}function Rc(w,I,Y,H,V){I.isScene!==!0&&(I=dt),K.resetTextureUnits();const _e=I.fog,ye=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?I.environment:null,pe=se===null?L.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:$e.workingColorSpace,Ae=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,De=ae.get(H.envMap||ye,Ae),Ve=H.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,Ke=!!Y.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Be=!!Y.morphAttributes.position,lt=!!Y.morphAttributes.normal,yt=!!Y.morphAttributes.color;let _t=xn;H.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(_t=L.toneMapping);const ft=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,Lt=ft!==void 0?ft.length:0,Ee=k.get(H),Ut=T.state.lights;if(Pe===!0&&(Ce===!0||w!==J)){const mt=w===J&&H.id===G;Ne.setState(H,w,mt)}let it=!1;H.version===Ee.__version?(Ee.needsLights&&Ee.lightsStateVersion!==Ut.state.version||Ee.outputColorSpace!==pe||V.isBatchedMesh&&Ee.batching===!1||!V.isBatchedMesh&&Ee.batching===!0||V.isBatchedMesh&&Ee.batchingColor===!0&&V._colorsTexture===null||V.isBatchedMesh&&Ee.batchingColor===!1&&V._colorsTexture!==null||V.isInstancedMesh&&Ee.instancing===!1||!V.isInstancedMesh&&Ee.instancing===!0||V.isSkinnedMesh&&Ee.skinning===!1||!V.isSkinnedMesh&&Ee.skinning===!0||V.isInstancedMesh&&Ee.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&Ee.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&Ee.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&Ee.instancingMorph===!1&&V.morphTexture!==null||Ee.envMap!==De||H.fog===!0&&Ee.fog!==_e||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==Ne.numPlanes||Ee.numIntersection!==Ne.numIntersection)||Ee.vertexAlphas!==Ve||Ee.vertexTangents!==Ke||Ee.morphTargets!==Be||Ee.morphNormals!==lt||Ee.morphColors!==yt||Ee.toneMapping!==_t||Ee.morphTargetsCount!==Lt||!!Ee.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(it=!0):(it=!0,Ee.__version=H.version);let Qt=Ee.currentProgram;it===!0&&(Qt=Sr(H,I,V),O&&H.isNodeMaterial&&O.onUpdateProgram(H,Qt,Ee));let dn=!1,Fn=!1,pi=!1;const ht=Qt.getUniforms(),Mt=Ee.uniforms;if(S.useProgram(Qt.program)&&(dn=!0,Fn=!0,pi=!0),H.id!==G&&(G=H.id,Fn=!0),Ee.needsLights){const mt=Bc(T.state.lightProbeGridArray,V);Ee.lightProbeGrid!==mt&&(Ee.lightProbeGrid=mt,Fn=!0)}if(dn||J!==w){S.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),ht.setValue(P,"projectionMatrix",w.projectionMatrix),ht.setValue(P,"viewMatrix",w.matrixWorldInverse);const kn=ht.map.cameraPosition;kn!==void 0&&kn.setValue(P,Ye.setFromMatrixPosition(w.matrixWorld)),A.logarithmicDepthBuffer&&ht.setValue(P,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&ht.setValue(P,"isOrthographic",w.isOrthographicCamera===!0),J!==w&&(J=w,Fn=!0,pi=!0)}if(Ee.needsLights&&(Ut.state.sunShadowMap.length>0&&ht.setValue(P,"sunShadowMap",Ut.state.sunShadowMap,K),Ut.state.directionalShadowMap.length>0&&ht.setValue(P,"directionalShadowMap",Ut.state.directionalShadowMap,K),Ut.state.spotShadowMap.length>0&&ht.setValue(P,"spotShadowMap",Ut.state.spotShadowMap,K),Ut.state.pointShadowMap.length>0&&ht.setValue(P,"pointShadowMap",Ut.state.pointShadowMap,K)),V.isSkinnedMesh){ht.setOptional(P,V,"bindMatrix"),ht.setOptional(P,V,"bindMatrixInverse");const mt=V.skeleton;mt&&(mt.boneTexture===null&&mt.computeBoneTexture(),ht.setValue(P,"boneTexture",mt.boneTexture,K))}V.isBatchedMesh&&(ht.setOptional(P,V,"batchingTexture"),ht.setValue(P,"batchingTexture",V._matricesTexture,K),ht.setOptional(P,V,"batchingIdTexture"),ht.setValue(P,"batchingIdTexture",V._indirectTexture,K),ht.setOptional(P,V,"batchingColorTexture"),V._colorsTexture!==null&&ht.setValue(P,"batchingColorTexture",V._colorsTexture,K));const On=Y.morphAttributes;if((On.position!==void 0||On.normal!==void 0||On.color!==void 0)&&N.update(V,Y,Qt),(Fn||Ee.receiveShadow!==V.receiveShadow)&&(Ee.receiveShadow=V.receiveShadow,ht.setValue(P,"receiveShadow",V.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&I.environment!==null&&(Mt.envMapIntensity.value=I.environmentIntensity),Mt.dfgLUT!==void 0&&(Mt.dfgLUT.value=Lg()),Fn){if(ht.setValue(P,"toneMappingExposure",L.toneMappingExposure),Ee.needsLights&&Cc(Mt,pi),_e&&H.fog===!0&&Ie.refreshFogUniforms(Mt,_e),Ie.refreshMaterialUniforms(Mt,H,ie,Q,T.state.transmissionRenderTarget[w.id]),Ee.needsLights&&Ee.lightProbeGrid){const mt=Ee.lightProbeGrid;Mt.probesSH.value=mt.texture,Mt.probesMin.value.copy(mt.boundingBox.min),Mt.probesMax.value.copy(mt.boundingBox.max),Mt.probesResolution.value.copy(mt.resolution)}es.upload(P,mo(Ee),Mt,K)}if(H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(es.upload(P,mo(Ee),Mt,K),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&ht.setValue(P,"center",V.center),ht.setValue(P,"modelViewMatrix",V.modelViewMatrix),ht.setValue(P,"normalMatrix",V.normalMatrix),ht.setValue(P,"modelMatrix",V.matrixWorld),H.uniformsGroups!==void 0){const mt=H.uniformsGroups;for(let kn=0,mi=mt.length;kn<mi;kn++){const xo=mt[kn];re.update(xo,Qt),re.bind(xo,Qt)}}return Qt}function Cc(w,I){w.ambientLightColor.needsUpdate=I,w.lightProbe.needsUpdate=I,w.sunLights.needsUpdate=I,w.sunLightShadows.needsUpdate=I,w.directionalLights.needsUpdate=I,w.directionalLightShadows.needsUpdate=I,w.pointLights.needsUpdate=I,w.pointLightShadows.needsUpdate=I,w.spotLights.needsUpdate=I,w.spotLightShadows.needsUpdate=I,w.rectAreaLights.needsUpdate=I,w.hemisphereLights.needsUpdate=I}function Lc(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return $},this.getActiveMipmapLevel=function(){return Z},this.getRenderTarget=function(){return se},this.setRenderTargetTextures=function(w,I,Y){const H=k.get(w);H.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),k.get(w.texture).__webglTexture=I,k.get(w.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:Y,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,I){const Y=k.get(w);Y.__webglFramebuffer=I,Y.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(w,I=0,Y=0){se=w,$=I,Z=Y;let H=null,V=!1,_e=!1;if(w){const pe=k.get(w);if(pe.__useDefaultFramebuffer!==void 0){S.bindFramebuffer(P.FRAMEBUFFER,pe.__webglFramebuffer),ee.copy(w.viewport),Te.copy(w.scissor),Re=w.scissorTest,S.viewport(ee),S.scissor(Te),S.setScissorTest(Re),G=-1;return}else if(pe.__webglFramebuffer===void 0)K.setupRenderTarget(w);else if(pe.__hasExternalTextures)K.rebindTextures(w,k.get(w.texture).__webglTexture,k.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const Ve=w.depthTexture;if(pe.__boundDepthTexture!==Ve){if(Ve!==null&&k.has(Ve)&&(w.width!==Ve.image.width||w.height!==Ve.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");K.setupDepthRenderbuffer(w)}}const Ae=w.texture;(Ae.isData3DTexture||Ae.isDataArrayTexture||Ae.isCompressedArrayTexture)&&(_e=!0);const De=k.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(De[I])?H=De[I][Y]:H=De[I],V=!0):w.samples>0&&K.useMultisampledRTT(w)===!1?H=k.get(w).__webglMultisampledFramebuffer:Array.isArray(De)?H=De[Y]:H=De,ee.copy(w.viewport),Te.copy(w.scissor),Re=w.scissorTest}else ee.copy(Se).multiplyScalar(ie).floor(),Te.copy(q).multiplyScalar(ie).floor(),Re=ve;if(Y!==0&&(H=X),S.bindFramebuffer(P.FRAMEBUFFER,H)&&S.drawBuffers(w,H),S.viewport(ee),S.scissor(Te),S.setScissorTest(Re),V){const pe=k.get(w.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+I,pe.__webglTexture,Y)}else if(_e){const pe=I;for(let Ae=0;Ae<w.textures.length;Ae++){const De=k.get(w.textures[Ae]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+Ae,De.__webglTexture,Y,pe)}}else if(w!==null&&Y!==0){const pe=k.get(w.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,pe.__webglTexture,Y)}G=-1};function _o(w){const I=k.get(w);return(I.__readFormat!==w.format||I.__readType!==w.type)&&(I.__readFormat=w.format,I.__readType=w.type,I.__formatReadable=A.textureFormatReadable(w.format),I.__typeReadable=A.textureTypeReadable(w.type)),I}this.readRenderTargetPixels=function(w,I,Y,H,V,_e,ye,pe=0){if(!(w&&w.isWebGLRenderTarget)){rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ae=k.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ye!==void 0&&(Ae=Ae[ye]),Ae){S.bindFramebuffer(P.FRAMEBUFFER,Ae);try{const De=w.textures[pe],Ve=De.format,Ke=De.type;w.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+pe);const Be=_o(De);if(Be.__formatReadable===!1){rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Be.__typeReadable===!1){rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=w.width-H&&Y>=0&&Y<=w.height-V&&P.readPixels(I,Y,H,V,he.convert(Ve),he.convert(Ke),_e)}finally{const De=se!==null?k.get(se).__webglFramebuffer:null;S.bindFramebuffer(P.FRAMEBUFFER,De)}}},this.readRenderTargetPixelsAsync=async function(w,I,Y,H,V,_e,ye,pe=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ae=k.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ye!==void 0&&(Ae=Ae[ye]),Ae)if(I>=0&&I<=w.width-H&&Y>=0&&Y<=w.height-V){S.bindFramebuffer(P.FRAMEBUFFER,Ae);const De=w.textures[pe],Ve=De.format,Ke=De.type;w.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+pe);const Be=_o(De);if(Be.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Be.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const lt=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,lt),P.bufferData(P.PIXEL_PACK_BUFFER,_e.byteLength,P.STREAM_READ),P.readPixels(I,Y,H,V,he.convert(Ve),he.convert(Ke),0),P.bindBuffer(P.PIXEL_PACK_BUFFER,null);const yt=se!==null?k.get(se).__webglFramebuffer:null;S.bindFramebuffer(P.FRAMEBUFFER,yt);const _t=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await $h(P,_t,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,lt),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,_e),P.bindBuffer(P.PIXEL_PACK_BUFFER,null),P.deleteBuffer(lt),P.deleteSync(_t),_e}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,I=null,Y=0){const H=Math.pow(2,-Y),V=Math.floor(w.image.width*H),_e=Math.floor(w.image.height*H),ye=I!==null?I.x:0,pe=I!==null?I.y:0;K.setTexture2D(w,0),P.copyTexSubImage2D(P.TEXTURE_2D,Y,0,0,ye,pe,V,_e),S.unbindTexture()},this.copyTextureToTexture=function(w,I,Y=null,H=null,V=0,_e=0){let ye,pe,Ae,De,Ve,Ke,Be,lt,yt;const _t=w.isCompressedTexture?w.mipmaps[_e]:w.image;if(Y!==null)ye=Y.max.x-Y.min.x,pe=Y.max.y-Y.min.y,Ae=Y.isBox3?Y.max.z-Y.min.z:1,De=Y.min.x,Ve=Y.min.y,Ke=Y.isBox3?Y.min.z:0;else{const Mt=Math.pow(2,-V);ye=Math.floor(_t.width*Mt),pe=Math.floor(_t.height*Mt),w.isDataArrayTexture?Ae=_t.depth:w.isData3DTexture?Ae=Math.floor(_t.depth*Mt):Ae=1,De=0,Ve=0,Ke=0}H!==null?(Be=H.x,lt=H.y,yt=H.z):(Be=0,lt=0,yt=0);const ft=he.convert(I.format),Lt=he.convert(I.type);let Ee;I.isData3DTexture?(K.setTexture3D(I,0),Ee=P.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(K.setTexture2DArray(I,0),Ee=P.TEXTURE_2D_ARRAY):(K.setTexture2D(I,0),Ee=P.TEXTURE_2D),S.activeTexture(P.TEXTURE0),S.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,I.flipY),S.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),S.pixelStorei(P.UNPACK_ALIGNMENT,I.unpackAlignment);const Ut=S.getParameter(P.UNPACK_ROW_LENGTH),it=S.getParameter(P.UNPACK_IMAGE_HEIGHT),Qt=S.getParameter(P.UNPACK_SKIP_PIXELS),dn=S.getParameter(P.UNPACK_SKIP_ROWS),Fn=S.getParameter(P.UNPACK_SKIP_IMAGES);S.pixelStorei(P.UNPACK_ROW_LENGTH,_t.width),S.pixelStorei(P.UNPACK_IMAGE_HEIGHT,_t.height),S.pixelStorei(P.UNPACK_SKIP_PIXELS,De),S.pixelStorei(P.UNPACK_SKIP_ROWS,Ve),S.pixelStorei(P.UNPACK_SKIP_IMAGES,Ke);const pi=w.isDataArrayTexture||w.isData3DTexture,ht=I.isDataArrayTexture||I.isData3DTexture;if(w.isDepthTexture){const Mt=k.get(w),On=k.get(I),mt=k.get(Mt.__renderTarget),kn=k.get(On.__renderTarget);S.bindFramebuffer(P.READ_FRAMEBUFFER,mt.__webglFramebuffer),S.bindFramebuffer(P.DRAW_FRAMEBUFFER,kn.__webglFramebuffer);for(let mi=0;mi<Ae;mi++)pi&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,k.get(w).__webglTexture,V,Ke+mi),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,k.get(I).__webglTexture,_e,yt+mi)),P.blitFramebuffer(De,Ve,ye,pe,Be,lt,ye,pe,P.DEPTH_BUFFER_BIT,P.NEAREST);S.bindFramebuffer(P.READ_FRAMEBUFFER,null),S.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(V!==0||w.isRenderTargetTexture||k.has(w)){const Mt=k.get(w),On=k.get(I);S.bindFramebuffer(P.READ_FRAMEBUFFER,U),S.bindFramebuffer(P.DRAW_FRAMEBUFFER,z);for(let mt=0;mt<Ae;mt++)pi?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Mt.__webglTexture,V,Ke+mt):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Mt.__webglTexture,V),ht?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,On.__webglTexture,_e,yt+mt):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,On.__webglTexture,_e),V!==0?P.blitFramebuffer(De,Ve,ye,pe,Be,lt,ye,pe,P.COLOR_BUFFER_BIT,P.NEAREST):ht?P.copyTexSubImage3D(Ee,_e,Be,lt,yt+mt,De,Ve,ye,pe):P.copyTexSubImage2D(Ee,_e,Be,lt,De,Ve,ye,pe);S.bindFramebuffer(P.READ_FRAMEBUFFER,null),S.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else ht?w.isDataTexture||w.isData3DTexture?P.texSubImage3D(Ee,_e,Be,lt,yt,ye,pe,Ae,ft,Lt,_t.data):I.isCompressedArrayTexture?P.compressedTexSubImage3D(Ee,_e,Be,lt,yt,ye,pe,Ae,ft,_t.data):P.texSubImage3D(Ee,_e,Be,lt,yt,ye,pe,Ae,ft,Lt,_t):w.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,_e,Be,lt,ye,pe,ft,Lt,_t.data):w.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,_e,Be,lt,_t.width,_t.height,ft,_t.data):P.texSubImage2D(P.TEXTURE_2D,_e,Be,lt,ye,pe,ft,Lt,_t);S.pixelStorei(P.UNPACK_ROW_LENGTH,Ut),S.pixelStorei(P.UNPACK_IMAGE_HEIGHT,it),S.pixelStorei(P.UNPACK_SKIP_PIXELS,Qt),S.pixelStorei(P.UNPACK_SKIP_ROWS,dn),S.pixelStorei(P.UNPACK_SKIP_IMAGES,Fn),_e===0&&I.generateMipmaps&&P.generateMipmap(Ee),S.unbindTexture()},this.initRenderTarget=function(w){k.get(w).__webglFramebuffer===void 0&&K.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?K.setTextureCube(w,0):w.isData3DTexture?K.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?K.setTexture2DArray(w,0):K.setTexture2D(w,0),S.unbindTexture()},this.resetState=function(){$=0,Z=0,se=null,S.reset(),xe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return _n}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=$e._getDrawingBufferColorSpace(e),t.unpackColorSpace=$e._getUnpackColorSpace()}}const mc={wolf:{rows:["...........d..d....","..........dBedBe...","..........BBBBBBB..",".bb......BBBBBBBB..","bBb......BBBBEGBB..","bBb...bbbBBBBEEBWWN",".bBBBBBBBBBBBBWWWW.","..BBBBBBBBBBBBWWW..","..BBBBBBBBBBBWW....","..BBWWWWWWBBBB.....","..BB.b....BB.b.....","..dd.d....dd.d....."],walk:["...BBb...b.BB......","...ddd...d.dd......"]},boar:{rows:["...........bb.....",".....BBBBBBBbB....","...BBWWWWWWBBBB...","..BBBBBBBBBBBBGB..",".bBWWWWWWWWBBBEBBBN","..BBBBBBBBBBBBBBBBN","..BWWWWWWWWBBBBBb..","...BBBBBBBBBBBB....","...BB.b....BB.b....","...dd.d....dd.d...."],walk:["....BBb...b.BB.....","....ddd...d.dd....."]},owl:{rows:[".b......b.",".bBBBBBBb.","BBWWBBWWBB","BWEGWWEGWB","BWEEAAEEWB","BBWWWAWWBB","bBWWWWWWBb","bBWbWWbWBb","bBWWWWWWBb",".bBWbWWBb.","..BBBBBB..","..A....A.."],walk:["...A..A..."]},fox:{rows:["..........d...d...",".........dBe.dBe..",".........BBBBBBB..","WB......BBBBBGBB..","WBB.....BBBBBEBWWN",".BBB.BBBBBBBBBWWW.","..BBBBBBBBBBBWWW..","..BBBBBBBBBBBW....","..BBWWWWWWBBB.....","..dd.d....dd.d....","..dd.d....dd.d...."],walk:["...dd.d..d.dd.....","...dd.d..d.dd....."]},badger:{rows:["..........dd.......","...BBBBBBBWWWW.....",".BBBBBBBBWdGdWW....","BBBBBBBBBWdEddddN..","BBBBBBBBBBWWWWW....",".BBBBBBBBBBBBB.....",".dd.d.....dd.d.....",".dd.d.....dd.d....."],walk:["..dd.d...d.dd......","..dd.d...d.dd......"]},stag:{rows:["...........bb.b...","..........BeBBe...","..........BBBBB...","..........BBBGBB..","..........BBBEBBBN","..W......BBBB.WW..",".WBBBBBBBBBBB.....",".BWBBWBBWBBBB.....","..BBBBBBBBBBW.....","..BBWWWWWWBB......","..B.b.....B.b.....","..B.b.....B.b.....","..B.b.....B.b.....","..N.N.....N.N....."],walk:["...B.b...b.B......","...B.b...b.B......","...N.N...N.N......"]},hare:{rows:["........dd.......","........Be.d.....","........Be.Bd....","........BeBBe....",".......BBBBB.....",".......BBBGBB....","..W...BBBBEBBN...",".WWBBBBBBBBWW....","..BBBBBBBBBW.....",".BBBBBBBBBW......",".BBBWWWWBB.......",".dddd...dd......."],walk:["dddd....d.d......"]},bear:{rows:[".........bb..bb..",".........BeBBBe..","........BBBBBBBB.","..BBBB..BBBBBGBB.",".BBBBBBBBBBBBEBWW","BBBBBBBBBBBBBBWWN","BBBBBBBBBBBBBBB..","BBBBBBBBBBBBBB...",".BBBbBBBBBBbBB...",".BB.bb...BB.bb...",".dd.dd...dd.dd..."],walk:["..BBbb..bBB.b....","..dddd..ddd.d...."]},squirrel:{rows:[".bb.............","bBBb......d..d..","bBBBb....dB.dB..",".bBBb....BBBBB..","..bBB...BBBBGB..","..bBB...BBBBEBBN","...BB..BBBBBWW..","...BBBBBBBBWW...","....BBBBBBBW....","....BBWWWBBB....","....dd...dd....."],walk:[".....dd.d.d....."]},otter:{rows:["............BBB....","..........BBBBBB...",".......BBBBBBBGBB..","....BBBBBBBBBBEBWWN","BBBBBBBBBBBBBBWWWW.",".BBBBBBBBBBBBWWW...","..BBWWWWWWBBBB.....","...dd.....dd......."],walk:["....dd...dd........"]},lynx:{rows:["..........d...d...","..........d...d...",".........BeB.Be...",".........BBBBBBB..",".........BBBBGBBB.",".d.......BBBBEBWWN",".dB......BBBBBWWW.","..BBBBBBBBBBBWW...","..BdBBdBBdBBBB....","..BBBBBBBBBBBW....","..BBWWWWWWBBB.....","..BB.b....BB.b....","..dd.d....dd.d...."],walk:["...BB.b..bBB......","...dd.d..ddd......"]},elk:{rows:["..........b..b....","..........BBBB....","..........BBBGB...","..........BBBEBBB.",".........BBBBBBBBN",".b......BBBB..BB..",".BBBBBBBBBBB......",".BBBBBBBBBBB......","..BBBBBBBBBB......","..BBbbbbbbBB......","..B.b.....B.b.....","..B.b.....B.b.....","..B.b.....B.b.....","..N.N.....N.N....."],walk:["...B.b...b.B......","...B.b...b.B......","...N.N...N.N......"]},beaver:{rows:["..........bb......","........BBBBBB....","......BBBBBBGBB...","....BBBBBBBBEBBB..","...BBBBBBBBBBBBBN.","...BBBBBBBBBBBAA..","...BBBBBBBBBBB.A..","dddBBBBBBBBBB.....","ddd.BBB...BB......","....dd....dd......"],walk:[".....dd..dd......."]},stoat:{rows:["...........BB.....","..........BBBBB...",".........BBBGBB...","dd.BBBBBBBBBEBBN..","dBBBBBBBBBBBWWW...","...BBBBBBBBWWW....","...BWWWWWWBB......","...dd....dd......."],walk:["....dd..dd........"]},hedgehog:{rows:["....bdbdb......","..bdbdbdbdb....",".bdbdbdbdbdbe..","dbdbdbdbdbWWW..","bdbdbdbdbWGWW..","dbdbdbdbWWEWWWN",".WWWWWWWWWWWW..","..dd.....dd...."],walk:["...dd...dd....."]},toad:{rows:["........BBB...","......BBIEB...","..BBBBBBBBBB..",".BBdBBBBdBBBB.","BBBBBBdBBBBBBB","BBdBBBBBBBLLLL","BBBBWWWWWWWWB.",".BBBBWWWWWBB..","BBBB....BB...."],walk:[".BBBB...BB...."]},raven:{rows:[".......BBB.....","......BBBBB....","......BBGBBNN..","......BBEBNNNN.","....BBBBBBNN...","..bbBBBBBBB....","bbbBBbBBBBB....","bb..bBBBBBB....","......BBBB.....","......N.N......","......NNNN....."],walk:["......N..N.....",".....NN.NN....."]},bat:{rows:["...d.....d...","...Bd...dB...","...BBBBBBB...","b..BGBBBGB..b","bb.BEBBBEB.bb","bbbbBBNBBbbbb","bbbbBBBBBbbbb",".bb.BBBBB.bb.","b...BBBBB...b",".....d.d....."],walk:["...BGBBBGB...","...BEBBBEB...",".bbbBBNBBbbb.","bbbbBBBBBbbbb","bbbbBBBBBbbbb","bb..BBBBB..bb","b....d.d....b"]},mole:{rows:["....BBBBB......","..BBBBBBBBB....",".BBBBBBBBBBB...","BBBBBBBBBBEBSS.","BBBBBBBBBBBBSSS","BBBBBBBBBBBB...",".BBBBBBBSSBB...","S.SS...SSSS...."],walk:[".SS.....SSSS..."]},beetle:{rows:["..........A.A.","...bbbbb..AA..",".bBBBBBBbBBA..","bBWBBBBBbBGB..","bBBBBBBBbBB...",".bbbbbbbbb....",".d.d.d.d.d...."],walk:["d.d.d.d.d....."]},snail:{rows:["...bbb....d.d","..bBBBb...S.S",".bBbbBBb..S.S",".bBbBbBb.SSS.",".bBBbbBbSSSS.","..bBBBBSSSS..","SSSSSSSSSS..."],walk:[".SSSSSSSSSS.."]},ram:{rows:["..........AA.....",".........AbbbA...","...W.W...bbGbb...",".WWWWWWW.bbEbbbN.","WWWWWWWWWWbbbbb..","WWWWWWWWWWWbb....","WWWWWWWWWWW......",".WWWWWWWWWW......","..b.b....b.b.....","..b.b....b.b.....","..N.N....N.N....."],walk:["...b.b..b.b......","...N.N..N.N......"]},woodlouse:{rows:["...........d.","...bbbbbbb.d.",".bBdBdBdBBb..","bBBdBdBdBBGb.","bdddddddddd..",".d.d.d.d.d..."],walk:["d.d.d.d.d...."]},snake:{rows:["...........BBB...","..........BBGBN..","..........BBBB.SS","..........BB.....","..BBdBBdBBBB.....",".BWWWWWWWWWB.....","BB..............."],walk:[".BWWWWWWWWWB.....","..B.............."]},moth:{rows:["....b...b....",".....b.b.....","BBB..WWW..BBB","BWBB.WEW.BBWB","BBBBBWWWBBBBB",".bbbbWWWbbbb.","..bbb.W.bbb.."],walk:[".BBBBWEWBBBB.","BWBBBWWWBBBWB","BBBbbWWWbbBBB",".bb...W...bb."]},marten:{rows:["...........d.d...","..........BBBBB..","..........BBGBB..","bb.......BBBEBBN.","bBBBBBBBBBBWWW...",".BBBBBBBBBBWW....","..BBBBBBBBBB.....","..dd.d...dd.d...."],walk:["...dd.d.d.dd....."]},salamander:{rows:["...........BBB..","....BWBBWBBBGBB.","BBBBBBBBBBWBBEBB",".......BBBBBBBB.",".....B.B...B.B.."],walk:["......BB..BB...."]},glowworm:{rows:["....bbbbbbbb...","..IIBbBbBbBbBG.",".IIIbBbBbBbBbBB","..IIdbdbdbdbdb.","....d.d.d.d.d.."],walk:["...d.d.d.d.d..."]},spider:{rows:["...bbb.........",".bBBBBb..d..d..","bBBWBBBbBBBd...","bBWWWBBbBGGBd..","bBBWBBBdBBBB.d.",".bBBBBd.d..d..d","..d.d..d..d..d."],walk:[".d.d..d..d..d.."]},dormouse:{rows:[".BB............","BBBB.....e.e...","BBBB....BBBBB..",".BBB...BBEGBB..","..BBB.BBBEEBBN.","...BBBBBBBWW...","....BBBBBWW....","....BBWWBB.....","....dd..dd....."],walk:[".....dd.d.d...."]}},gc=[{id:"wolf",name:"Wolf",plan:"quad",hue:.6,sat:.14,val:.74,legend:["wings","mane"],q:{len:.64,chest:.42,tuck:.6,neck:.32,neckAng:.7,neckW:.42,hr:.26,snout:.82,snoutD:.7,ear:"point",earS:.82,tail:"brush",paw:"paw",legW:1.25,saddle:!0,belly:!0},tail:"up"},{id:"fox",name:"Fox",plan:"quad",q:{hgt:.8,len:.62,chest:.4,tuck:.5,neck:.3,neckAng:.7,neckW:.32,hr:.24,snout:1.05,snoutD:.5,snoutTaper:.6,ear:"point",earS:1.35,tail:"bushy",paw:"paw",legW:.9,belly:!0,socks:.3},hue:.06,sat:.8,val:.9,belly:"white",legend:["tails"]},{id:"badger",name:"Badger",plan:"quad",q:{hgt:.62,len:.78,chest:.2,tuck:.22,neck:.18,neckAng:.1,neckW:.5,hr:.26,snout:1,snoutD:.55,snoutTaper:.55,ear:"round",earS:.7,tail:"stub",paw:"paw",legW:1.35,legMat:x.BODY3,face:"badger",shaggy:!0},hue:.65,sat:.08,val:.45,legend:["crystals"]},{id:"boar",name:"Boar",plan:"quad",hue:.07,sat:.62,val:.5,legend:["tusksBig"],q:{len:.72,chest:.34,tuck:.42,neck:.2,neckAng:-.15,neckW:.55,hr:.27,snout:1.25,snoutD:.62,snoutTaper:.55,ear:"small",earS:.8,tail:"thin",paw:"hoof",legW:1.15,ridge:!0,tusks:!0,back:"hump",disc:!0},ridge:!0},{id:"stag",name:"Stag",plan:"quad",q:{hgt:1.3,len:.6,chest:.6,tuck:.7,neck:.55,neckAng:.95,neckW:.32,hr:.2,snout:1.15,snoutD:.6,snoutTaper:.65,ear:"point",earS:1.1,tail:"deer",paw:"hoof",legW:.75,antlers:"branch",rump:!0,spots:"young",belly:!0},hue:.08,sat:.5,val:.7,legend:["antlersGlow"]},{id:"hare",name:"Hare",plan:"quad",q:{hgt:.72,len:.5,chest:.4,tuck:.45,neck:.2,neckAng:.9,neckW:.35,hr:.27,snout:.65,snoutD:.7,ear:"long",earS:2.4,tail:"puff",paw:"paw",legW:.85,haunch:1.35,hindFoot:1.6,back:"arch",belly:!0,whiskers:!0},hue:.08,sat:.4,val:.72,legend:["jackalope"]},{id:"owl",name:"Owl",plan:"owl",hue:.08,sat:.5,val:.55,legend:["eyesRing","wings"]},{id:"bear",name:"Bear",plan:"quad",q:{hgt:1.15,len:.72,chest:.38,tuck:.4,neck:.25,neckAng:.3,neckW:.55,hr:.28,snout:.7,snoutD:.62,snoutTaper:.7,ear:"round",earS:.8,tail:"stub",paw:"paw",legW:1.55,back:"hump",muzzle:!0,shaggy:!0},hue:.07,sat:.55,val:.42,legend:["moss"]},{id:"hedgehog",name:"Hedgehog",plan:"hedgehog",hue:.08,sat:.4,val:.5,legend:["crystals"]},{id:"squirrel",name:"Squirrel",plan:"quad",q:{hgt:.55,len:.45,chest:.35,tuck:.4,neck:.2,neckAng:.9,neckW:.35,hr:.3,snout:.55,snoutD:.65,ear:"tuft",earS:1.1,tail:"squirrel",paw:"paw",legW:.8,haunch:1.3,back:"arch",belly:!0,whiskers:!0},hue:.03,sat:.75,val:.75,belly:"white",legend:["starTail"]},{id:"toad",name:"Toad",plan:"toad",hue:.2,sat:.5,val:.55,legend:["crown"]},{id:"otter",name:"Otter",plan:"quad",q:{hgt:.55,len:1,chest:.25,tuck:.25,neck:.3,neckAng:.35,neckW:.5,hr:.27,snout:.6,snoutD:.7,ear:"round",earS:.5,tail:"otter",paw:"paw",legW:1.1,muzzle:!0,belly:!0,whiskers:!0},hue:.07,sat:.55,val:.45,belly:"white",legend:["ribbons"]},{id:"lynx",name:"Lynx",plan:"quad",q:{hgt:.9,len:.55,chest:.5,tuck:.55,neck:.25,neckAng:.8,neckW:.4,hr:.27,snout:.5,snoutD:.75,snoutTaper:.8,ear:"tuft",earS:1,tail:"bob",paw:"paw",legW:1.2,cheeks:!0,spots:!0,belly:!0,whiskers:!0},hue:.09,sat:.45,val:.75,legend:["mane"]},{id:"elk",name:"Elk",plan:"quad",q:{hgt:1.4,len:.68,chest:.6,tuck:.66,neck:.45,neckAng:.75,neckW:.42,hr:.24,snout:1.6,snoutD:.9,snoutTaper:.85,ear:"point",earS:.9,tail:"stub",paw:"hoof",legW:.9,back:"hump",antlers:"palm",shaggy:!0},hue:.07,sat:.55,val:.38,legend:["antlersGlow","moss"]},{id:"raven",name:"Raven",plan:"raven",hue:.68,sat:.35,val:.3,legend:["wings","eyesRing"]},{id:"bat",name:"Bat",plan:"bat",hue:.78,sat:.25,val:.45,legend:["wingsBig"]},{id:"mole",name:"Mole",plan:"mole",hue:.7,sat:.15,val:.32,legend:["crown"]},{id:"beaver",name:"Beaver",plan:"quad",q:{hgt:.6,len:.65,chest:.2,tuck:.22,neck:.2,neckAng:.4,neckW:.55,hr:.28,snout:.6,snoutD:.75,ear:"round",earS:.45,tail:"flat",paw:"paw",legW:1.2,back:"arch",teeth:!0,whiskers:!0},hue:.06,sat:.6,val:.45,legend:["moss"]},{id:"stoat",name:"Stoat",plan:"quad",q:{hgt:.5,len:1,chest:.3,tuck:.33,neck:.35,neckAng:.6,neckW:.32,hr:.25,snout:.6,snoutD:.6,ear:"round",earS:.6,tail:"stoat",paw:"paw",legW:.8,belly:!0,back:"arch",whiskers:!0},hue:.1,sat:.25,val:.92,legend:["ribbons","mane"]},{id:"snail",name:"Snail",plan:"snail",hue:.08,sat:.45,val:.55,legend:["glowShell"]},{id:"ram",name:"Ram",plan:"quad",q:{hgt:.95,len:.6,chest:.48,tuck:.52,neck:.22,neckAng:.45,neckW:.48,hr:.25,snout:.85,snoutD:.75,snoutTaper:.8,ear:"small",earS:.7,tail:"stub",paw:"hoof",legW:.9,wool:!0,horns:"curl",face:"dark"},hue:.1,sat:.12,val:.88,legend:["hornsGlow"]},{id:"woodlouse",name:"Woodlouse",plan:"woodlouse",hue:.65,sat:.12,val:.45,legend:["crystals"]},{id:"snake",name:"Snake",plan:"snake",hue:.25,sat:.45,val:.45,legend:["wings"]},{id:"moth",name:"Moth",plan:"moth",hue:.1,sat:.3,val:.7,legend:["wingsBig"]},{id:"marten",name:"Pine marten",plan:"quad",q:{hgt:.55,len:.78,chest:.35,tuck:.38,neck:.3,neckAng:.55,neckW:.35,hr:.25,snout:.65,snoutD:.6,ear:"round",earS:.9,tail:"bushy",paw:"paw",legW:.85,belly:!0,back:"arch"},hue:.07,sat:.6,val:.45,legend:["mane"]},{id:"salamander",name:"Salamander",plan:"quad",q:{hgt:.3,len:.9,chest:.14,tuck:.14,neck:.12,neckAng:.05,neckW:.5,hr:.27,snout:.55,snoutD:.55,ear:"none",tail:"otter",paw:"paw",legW:1,spots:!0,spotMat:"belly"},hue:.1,sat:.1,val:.22,belly:"yellow",legend:["flames"]},{id:"glowworm",name:"Glow-worm",plan:"glowworm",hue:.12,sat:.4,val:.35,legend:["lantern"]},{id:"spider",name:"Spider",plan:"spider",hue:.07,sat:.45,val:.4,legend:["eyesRing"]},{id:"dormouse",name:"Dormouse",plan:"quad",q:{hgt:.38,len:.45,chest:.35,tuck:.38,neck:.15,neckAng:.6,neckW:.4,hr:.34,snout:.45,snoutD:.7,ear:"round",earS:.85,tail:"squirrel",paw:"paw",legW:.8,back:"arch",belly:!0,whiskers:!0,eyeK:1.6},hue:.09,sat:.6,val:.75,belly:"white",legend:["starTail"]},{id:"beetle",name:"Stag beetle",plan:"beetle",hue:.78,sat:.5,val:.35,legend:["horn","crystals"]}],_c=Object.fromEntries(gc.map(i=>[i.id,i]));function Pg(i,e){const t=_c[i],n=e.cVal/.85,r=e.cSat/.6,s=we(t.hue,t.sat*r*e.sat,t.val*n),a=t.belly==="yellow"?[240,196,40]:t.belly==="white"||t.q?.face==="badger"?[236,232,222]:we(t.hue+.03,t.sat*.5*r,Math.min(1,t.val*n*1.3+.08)),c=we(e.magicHue+t.hue*.3,.6,1),l=we(e.magicHue+t.hue*.3,.18,1),o=["boar","stag","elk","ram"].includes(t.id);return{[x.BODY]:s,[x.BODY2]:we(t.hue+.02,Math.min(1,t.sat*r*1.2+.05),t.val*n*.66),[x.BODY3]:we(t.hue+.03,Math.min(1,t.sat*r*1.3+.1),t.val*n*.4),[x.BELLY]:a,[x.ACCENT]:o?[236,226,200]:we(t.hue+.05,t.sat*.6,Math.min(1,t.val*n*.5+.25)),[x.MAGIC]:c,[x.MAGIC2]:l,[x.LEAF]:we(.3,.55,.55),[x.LEAF2]:we(.25,.5,.75),[x.LEAF3]:we(.33,.6,.35),[x.TRUNK]:we(.07,.45,.32),[x.EYE]:[24,18,30],[x.PUPIL]:[70,40,90],[x.GLINT]:[255,255,245],[x.NOSE]:[38,28,36],[x.EAR]:we(t.hue+.97,Math.min(1,t.sat*.6+.2),Math.min(1,t.val*n*.55+.2)),[x.IRIS]:t.plan==="owl"?[255,176,40]:we(.12,.7,.85),[x.SKIN]:[238,158,192]}}const Ht=(i,e)=>Math.round(e.size*Math.pow(Math.sqrt(e.growth),i)*(i?2/(e.pixel||2):1));function Ig(i,e,t,n){const r=_c[i]||gc[0];if(e===0&&mc[r.id])return Ng(r.id,t,n);if(r.q)return Og(r,e,t,n);const s={owl:i_,raven:Yg,bat:qg,toad:Xg,hedgehog:Vg,mole:Kg,beetle:Zg,snail:$g,woodlouse:Jg,snake:Qg,moth:jg,glowworm:e_,spider:t_}[r.plan];return s(r,e,t,n)}function Ng(i,e,t){const n=mc[i],r=e&&n.walk?n.rows.slice(0,n.rows.length-n.walk.length).concat(n.walk):n.rows,s=Math.max(...r.map(l=>l.length))+2,a=r.length+1,c=new Nt(s,a);return c.grid(r,Ug,1,1,{round:t.round}),c}const Ug={B:x.BODY,b:x.BODY2,d:x.BODY3,W:x.BELLY,A:x.ACCENT,E:x.EYE,G:x.GLINT,N:x.NOSE,I:x.IRIS,P:x.PUPIL,e:x.EAR,L:x.LINE,S:x.SKIN};function Fg(i){let e=-1;for(let n=i.h-1;n>=0&&e<0;n--)for(let r=0;r<i.w;r++)if(i.m[n*i.w+r]){e=n;break}const t=i.h-1-e;if(!(e<0||t===0))for(let n=i.h-1;n>=0;n--)for(let r=0;r<i.w;r++){const s=n*i.w+r,a=(n-t)*i.w+r,c=n-t>=0;i.m[s]=c?i.m[a]:0,i.g[s]=c?i.g[a]:0;for(let l=0;l<3;l++)i.n[s*3+l]=c?i.n[a*3+l]:0}}class Vt{constructor(){this.ops=[]}shape(e,t,n={}){return this.ops.push({k:"shape",pts:e,mat:t,o:n}),this}limb(e,t,n={}){return this.ops.push({k:"limb",pts:e,mat:t,o:n}),this}mark(e,t,n,r={}){return this.ops.push({k:"mark",pts:e,mat:t,onlyOn:n,o:r}),this}fn(e){return this.ops.push({k:"fn",f:e}),this}draw(e,t,n=1,r=null,s=!0){if(r)for(const v of this.ops)v.pts&&(v.pts=v.pts.map(b=>{const[M,y,T=1]=r(b);return b.length>2?[M,y,b[2]*T]:[M,y]}));const a=[],c=[];for(const v of this.ops)if(v.pts)for(const b of v.pts){const M=v.k==="limb"?(b[2]||0)/2:0;a.push([b[0]-M,b[1]-M],[b[0]+M,b[1]+M]),v.o.extra||c.push([b[0],b[1]-M])}const l=Math.min(...c.map(v=>v[1])),o=e/-l,h=Math.min(...a.map(v=>v[0])),d=Math.max(...a.map(v=>v[0])),u=Math.min(...a.map(v=>v[1])),f=Math.ceil((d-h)*o)+2*n+2,g=Math.ceil(-u*o)+n+1,_=new Nt(f,g),p=v=>[(v[0]-h)*o+n+1,g+v[1]*o],m={sp:_,s:o,T:r?v=>p(r(v)):p,W:f,H:g};for(const v of this.ops){const b={round:t,...v.o};o<40&&!b.extra&&(b.line=!1),v.k==="shape"?_.shape(v.pts.map(p),v.mat,b):v.k==="limb"?_.limb(v.pts.map(M=>[...p(M),M[2]*o]),v.mat,b):v.k==="mark"?_.mark(v.pts.map(p),v.mat,v.onlyOn,b):v.f(m)}return s&&Fg(_),_}}function fr(i,e,t,n,{iris:r=!1,glow:s=!1}={}){e=Math.round(e),t=Math.round(t);const a=(o,h,d)=>i.px(e+o,t+h,d,0,0,1);if(n<2){a(0,0,x.EYE);return}if(n<3){a(0,0,x.EYE),a(0,1,x.EYE),a(-1,1,x.EYE),a(0,0,s?x.MAGIC2:x.GLINT);return}const c=Math.round(n*1.25),l=Math.round(n);for(let o=0;o<l;o++)for(let h=0;h<c;h++){const d=(h+.5)/c*2-1,u=(o+.5)/l*2-1,f=d*d+u*u;f>1.15||a(h-c+1,o,(s||r)&&f<.62&&f>.08&&l>=4?s?x.MAGIC:x.IRIS:x.EYE)}a(-Math.floor(c/2)+1,Math.floor((l-1)/2)-(l>=4?1:0),x.GLINT),c>=6&&a(-Math.floor(c/2)+2,Math.floor((l-1)/2)-1,x.GLINT)}function Og(i,e,t,n){const r={legW:1,earS:1,snoutTaper:.75,haunch:1,hindFoot:1,hgt:1,...i.q},s=e===2,a=q=>s&&i.legend.includes(q),c=e===1,l=r.hr*(c?1.22:1)*(n.head/.44)**.5,o=r.len*(c?.9:1.04)*n.long*.84,h=(c?.92:1.04)*n.legs**.5,d=t?-.05:0,u=-1+d,f=-r.chest*(s?1.1:1)/h+d,g=-r.tuck/h+d,_=new Vt,p=r.legW*(s?1.15:1),m=r.legMat||x.BODY,v=[.36,-.36][t]*(r.stride||1),b=[o*.14,-.13],M=r.back==="arch"?.14:0,y=r.back==="hump"?.12:0,T=[-o*.62,u+.28-M*.5],C=[o*.6,u+.42],E=q=>{const ve=r.hindFoot;return[T,[-o*.42,g+.2],[-o*.74-(ve-1)*.1,-.24/ve],[-o*.7-(ve-1)*.05,-.05],[-o*.6+(ve-1)*.22,0]].map(Pe=>Mo(Pe,T,q*v))},B=q=>[C,[o*.64,f+.06],[o*.6,-.2],[o*.63,-.05],[o*.72,0]].map(ve=>Mo(ve,C,-q*v*.9)),L=(q,ve)=>{const ge=Math.max(...q.map(Me=>Me[1])),Pe=(0-q[0][1])/(ge-q[0][1]),Ce=q.map(Me=>[Me[0],q[0][1]+(Me[1]-q[0][1])*Pe]);return[[...Ce[0],ve],[...Ce[1],.15*p],[...Ce[2],.095*p],[...Ce[3],.085*p],[...Ce[4],.07*p]]},D=(q,ve,ge,Pe=1)=>{const Ce=q[q.length-1],Me=(r.paw==="hoof"?.1:.13)*Pe,Ye=r.paw==="hoof"?.09:.075;_.shape([[Ce[0]-Me*.55,-Ye],[Ce[0]+Me*.2,-Ye*1.1],[Ce[0]+Me*.6,-Ye*.3],[Ce[0]+Me*.55,0],[Ce[0]-Me*.6,0]],r.paw==="hoof"?x.NOSE:ve,ge)},O=(q,ve,ge,Pe,Ce,Me=[0,0])=>{const Ye=L(q,ge).map(je=>[je[0]+Me[0],je[1]+Me[1],je[2]]);_.limb(Ye,ve,{cap:1,capEnd:.4,...Pe}),D(Ye.map(je=>[je[0],je[1]]),ve,Pe,Ce)};if(a("wings")&&Hi(_,[o*.25,u-.05],s,t,-1),a("tails"))for(let q=0;q<7;q++){const ve=Math.PI*(.62+q*.085)+(t?.03:0),ge=[-o*.95,u+.15],Pe=.95+q%2*.12,Ce=R(ge,[Math.cos(ve)*Pe,-Math.sin(ve)*Pe]),Me=R(Ze(ge,Ce,.55),[Math.sin(ve)*.08,Math.cos(ve)*.08]);_.limb([[...ge,.12],[...Me,.34],[...Ze(Me,Ce,.6),.28],[...Ce,.12]],q%2?x.BODY2:x.BODY,{group:70+q%2,line:!0,extra:!0}),_.shape([R(Ce,[Math.cos(ve)*.07,-Math.sin(ve)*.07]),R(Ze(Me,Ce,.7),[Math.sin(ve)*.13,Math.cos(ve)*.13]),R(Ze(Me,Ce,.7),[-Math.sin(ve)*.13,-Math.cos(ve)*.13])],x.MAGIC2,{group:72,extra:!0})}const X=m===x.BODY?x.BODY2:x.BODY3;O(B(-1),X,.19*p,{group:2},1,b),O(E(-1),X,.3*p*r.haunch,{group:2},r.hindFoot,b);const U=[-o*1,u+.18-M*.3];a("tails")||kg(_,a("starTail")?"star":r.tail,U,o,u,t);let z=[[-o*1.04,u+.14-M],[-o*.5,u+.02-M*1.3],[o*.1,u+.06-y*.5-M*.6],[o*.55,u-.03-y],[o*.95,u+.22-y*.5],[o*1.06,f-.2],[o*.8,f],[o*.3,f+(g-f)*.2],[-o*.25,g],[-o*.72,g+.02],[-o*1.1,u+.42-M*.5]];r.ridge&&(z=gt(z,0,4,s?10:7,s?.1:.07,1)),r.shaggy&&(z=gt(z,6,9,s?6:4,.04,1)),r.wool&&(z=gt(z,0,z.length-1,s?16:10,.05,1)),_.shape(z,x.BODY,{group:1,tilt:[0,-.3]});const $=[o*.78,u+.2],Z=r.neckAng,se=R($,[Math.cos(Z)*r.neck*.85,-Math.sin(Z)*r.neck*.85]),G=R(se,[l*.2,0]);_.limb([[...$,r.neckW*1.3],[...Ze($,se,.55),r.neckW*1.05],[...se,r.neckW*.9]],x.BODY,{group:1,cap:0,capEnd:1});const J=l*r.snout*(c?.75:1)*.72,ee=l*r.snoutD*1.1,Te=r.snoutTaper;let Re=[[-l*.85,-l*.1],[-l*.4,-l*.78],[l*.35,-l*.72],[l*.85,-l*.38],[l*.8+J*.6,-ee*.65*(1+Te)/2+l*.02],[l*.85+J,-ee*.5*Te],[l*.9+J,ee*.25*Te],[l*.75+J,ee*.42*Te+l*.1],[l*.35,l*.55],[-l*.3,l*.7],[-l*.85,l*.3]].map(q=>R(G,q));r.cheeks&&(Re=gt(Re,8,10,3,l*.22,1));const ct=(q,ve,ge,Pe)=>zg(_,r,R(G,[q*l,-l*.55]),l,l*r.earS*ve,ge,Pe,t),qe=(q,ve,ge)=>Gg(_,r,R(G,[q*l,-l*.6]),l,e,a,ve,ge);if((r.antlers||a("jackalope"))&&qe(.42,a("antlersGlow")?x.MAGIC:x.ACCENT,{group:11,line:!0,extra:!0}),!r.antlers&&a("jackalope")&&qe(.1,x.ACCENT,{group:12,line:!0,extra:!0}),ct(.42,.85,x.BODY2,{group:4}),_.shape(Re,x.BODY,{group:1,line:!1}),r.face==="dark"&&_.mark(Re,x.BODY2,[x.BODY]),ct(-.3,1,x.BODY,{group:5,line:!0}),r.horns&&n_(_,R(G,[-l*.1,-l*.45]),l,c?.6:a("hornsGlow")?1.5:1,a("hornsGlow")?x.MAGIC:x.ACCENT,{group:13,line:!0,extra:!0}),r.antlers&&qe(-.05,a("antlersGlow")?x.MAGIC2:x.ACCENT,{group:12,line:!0,extra:!0}),O(E(1),m,.36*p*r.haunch,{group:6,line:!0},r.hindFoot),O(B(1),m,.2*p,{group:7,line:!0}),r.saddle&&_.mark([[-o*1.15,u-.05-M],[o*.5,u-.1],[o*.85,u+.1],[o*.3,u+.2],[-o*.5,u+.24],[-o*1.2,u+.3]],x.BODY2,[x.BODY]),r.belly){const q=x.BELLY;_.mark([[o*.55,f-.3],[o*1.15,f-.32],[o*1,f+.1],[o*.2,f+.05],[-o*.4,g+.05],[-o*.3,g-.08]],q,[x.BODY]),_.mark([G,R(G,[l*.5+J,l*.2]),R(G,[l*.8+J,ee*.5]),R(G,[-l*.2,l*.9]),R(G,[-l*.7,l*.5])],q,[x.BODY])}if(r.muzzle&&_.mark([R(G,[l*.55,-l*.2]),R(G,[l*1.2+J,-ee]),R(G,[l*1.2+J,ee*.8]),R(G,[l*.4,l*.6])],x.BELLY,[x.BODY]),r.face==="badger"){_.mark([R(G,[-l*1.1,-l]),R(G,[l*1.3+J,-ee]),R(G,[l*1.3+J,ee]),R(G,[-l*1.1,l])],x.BELLY,[x.BODY]);for(const q of[-.05,.42])_.mark([R(G,[-l*.9,-l*(.85-q)]),R(G,[-l*.4,-l*(.95-q)]),R(G,[l*.9+J*.9,-ee*.35+l*q*.25]),R(G,[l*.9+J*.9,-ee*.15+l*q*.3]),R(G,[-l*.3,-l*(.4-q)]),R(G,[-l*.9,-l*(.35-q)])],x.BODY3,[x.BELLY])}if(r.rump&&_.mark([[-o*1.2,u+.12],[-o*.95,u+.14],[-o*.92,u+.45],[-o*1.2,u+.45]],x.BELLY,[x.BODY]),r.paw==="paw"&&!r.socks){const q=L(B(1),0)[4];_.mark([[q[0]-.08,-.18],[q[0]+.09,-.18],[q[0]+.12,0],[q[0]-.08,0]],x.BELLY,[x.BODY])}_.fn(({sp:q,T:ve,s:ge})=>{if(r.socks){const Ce=ve([0,-r.socks])[1];for(let Me=Math.floor(Ce);Me<q.h;Me++)for(let Ye=0;Ye<q.w;Ye++){const je=Me*q.w+Ye;[2,6,7].includes(q.g[je])&&[x.BODY,x.BODY2].includes(q.m[je])&&(q.m[je]=x.BODY3)}}if((r.spots==="young"?c:r.spots)&&ge>18){const Ce=Math.max(3,Math.round(ge*.09)),Me=r.spots==="young"||r.spotMat==="belly"?x.BELLY:x.BODY3,Ye=Math.round(ve([0,u+.1])[1]),je=Math.round(ve([0,f+.05])[1]);for(let dt=Ye;dt<je;dt+=Ce)for(let et=0;et<q.w;et+=Ce*(r.spotMat?2:1)){const tt=et+((dt/Ce|0)%2?Ce>>1:0)+(Ot(et,dt,3)*2|0),P=dt*q.w+tt;q.m[P]===x.BODY&&q.g[P]===1&&q.m[P+1]===x.BODY&&Ot(et,dt,5)<(r.spotMat?.1:.25)+n.fur*(r.spotMat?.4:1)&&(q.m[P]=Me,ge>40&&(q.m[P+1]=Me),r.spotMat&&ge>30&&(q.recolour(tt,dt+1,Me),q.recolour(tt+1,dt+1,Me)))}}});const Qe=G[0]+l*.32,Q=G[1]-l*.24,ie=R(G,[l*.88+J,-ee*.45*Te]);if(_.fn(({sp:q,T:ve,s:ge})=>{const Pe=Math.max(2,Math.round(l*ge*(c?.42:.3)*n.eye*(r.eyeK||1))),[Ce,Me]=ve([Qe,Q]);fr(q,Ce,Me,Pe,{glow:s&&!r.tusks});const[Ye,je]=ve([G[0]+l*.78,G[1]-l*.46]);fr(q,Ye,je,Math.max(1,Pe-1),{glow:s&&!r.tusks});const[dt,et]=ve(ie),tt=Math.max(1,Math.round(l*ge*(r.disc?.22:.14)));for(let A=0;A<=tt;A++)for(let S=-tt;S<=Math.round(tt*.3);S++)q.get(dt+S,et+A)&&S*S/(tt*tt)+A*A/((tt+1)*(tt+1))<=1&&q.recolour(dt+S,et+A,x.NOSE);r.disc&&q.recolour(dt-1,et+tt,x.BODY3);const P=ve(R(G,[l*.85+J,ee*.2*Te+l*.06])),vt=ve(R(G,[l*.55+J*.45,ee*.32*Te+l*.12])),nt=Math.ceil(Math.hypot(vt[0]-P[0],vt[1]-P[1]));if(ge*l>6)for(let A=0;A<=nt;A++)q.recolour(P[0]+(vt[0]-P[0])*A/nt,P[1]+(vt[1]-P[1])*A/nt,x.LINE);if(r.teeth){const[A,S]=ve(R(G,[l*.8+J,ee*.35*Te+l*.1])),F=Math.max(1,Math.round(l*ge*.14));for(let k=0;k<F*2;k++)for(let K=0;K<F;K++)q.px(A-K,S+k,x.ACCENT,0,0,1)}if(r.whiskers&&ge*l>8)for(const A of[-1,1]){const[S,F]=ve(R(G,[l*.75+J,ee*.1]));for(let k=1;k<=Math.round(l*ge*.4);k++)q.get(S+k,F+A*(k>>1))||q.px(S+k,F+A*(k>>1),x.LINE)}}),r.tusks){const q=c?.35:a("tusksBig")?1.25:.7,ve=R(G,[l*.45+J*.6,ee*.3]);_.limb([[...ve,.075*q**.5],[...R(ve,[l*.3*q,-l*.2*q]),.07*q**.5],[...R(ve,[l*.38*q,-l*.6*q]),.045*q**.5],[...R(ve,[l*.15*q,-l*.95*q]),.012]],x.ACCENT,{group:8,line:!0,cap:.6,extra:!0})}r.ridge&&_.mark(gt([[-o*1.05,u+.12],[-o*.5,u+.01],[o*.1,u+.05-y*.5],[o*.55,u-.04-y],[o*.9,u+.2],[o*.5,u+.12],[-o*.5,u+.16]],0,4,s?10:7,.07,1),x.BODY3,[x.BODY,x.LINE]);const be=q=>[-o*.9+q*o*1.6,u+.02-M*(1-Math.abs(q-.45)*1.6)-y*Math.max(0,1-Math.abs(q-.85)*3)];if(a("crystals")&&ps(_,be),a("moss")&&Wg(_,be,o,t),a("ribbons")&&Hg(_,o,u,t),a("mane")||a("flames"))for(let q=0;q<6;q++){const ve=q/5,ge=Ze(R(se,[-l*.3,-l*.6]),[o*.25,u+.02],ve),Pe=[.42,.3,.5,.26,.36,.22][q],Ce=.16-ve*.04,Me=t?.04:0;_.limb([[...ge,Ce],[...R(ge,[-.03,-Pe*.45]),Ce*1.05],[...R(ge,[-.14-Me,-Pe*.8]),Ce*.6],[...R(ge,[-.1-Me*2,-Pe*1.05]),Ce*.3],[...R(ge,[.02-Me,-Pe*1.2]),.01]],q%2?x.MAGIC:x.MAGIC2,{group:60+q%2,line:!0,extra:!0,cap:1,capEnd:.5})}a("wings")&&Hi(_,[o*.15,u+.02],s,t,1);const ke=([q,ve])=>{const ge=Math.max(-1.2,Math.min(.75,q/o)),Pe=1+.1*ge;return[q,ve*Pe-.08*Math.max(0,-ge),Pe]},Se=_.draw(Ht(e,n)*r.hgt,n.round,1,ke);return s&&Xt(Se,i.id),Se}function kg(i,e,t,n,r,s,a,c){const l=s?.03:-.01,o={group:3,line:!0},h=d=>-n*d;if(e==="brush")i.shape(gt([R(t,[0,-.04]),[h(1.3),r+.26+l],[h(1.46),r+.6],[h(1.36),-.36+l],[h(1.2),-.36],[h(1.16),r+.66],[h(1),r+.4]],1,4,5,.05,1),x.BODY,o),i.mark([[h(1.5),-.5+l],[h(1.1),-.5],[h(1.2),-.3],[h(1.4),-.3]],x.BODY3,[x.BODY]);else if(e==="bushy"){const d=[h(1.05)-.95,r+.5+l];i.shape(gt([R(t,[0,-.05]),[h(1.05)-.3,r+.05+l],[h(1.05)-.7,r+.2+l],[d[0]-.05,d[1]-.08],[d[0]-.02,d[1]+.1],[h(1.05)-.6,r+.6+l],[h(1.05)-.25,r+.52],[h(1),r+.4]],2,6,5,.045,1),x.BODY,o),i.mark([[d[0]-.2,d[1]-.3],[d[0]+.22,d[1]-.3],[d[0]+.22,d[1]+.3],[d[0]-.2,d[1]+.3]],x.BELLY,[x.BODY])}else if(e==="stub")i.shape([R(t,[.04,-.04]),R(t,[-.12,-.1+l]),R(t,[-.16,.02+l]),R(t,[-.04,.12])],x.BODY,o);else if(e==="deer")i.shape([R(t,[.03,-.04]),R(t,[-.07,-.06+l]),R(t,[-.09,.06+l]),R(t,[-.01,.11])],x.BELLY,o),i.mark([R(t,[.04,-.08]),R(t,[-.12,-.08]),R(t,[-.1,-.02]),R(t,[.04,-.02])],x.BODY,[x.BELLY]);else if(e==="bob")i.shape([R(t,[.04,-.06]),R(t,[-.16,-.12+l]),R(t,[-.24,-.02+l]),R(t,[-.04,.12])],x.BODY,o),i.mark([R(t,[-.14,-.2]),R(t,[-.3,-.1]),R(t,[-.3,.05]),R(t,[-.14,.05])],x.BODY3,[x.BODY]);else if(e==="puff")i.shape(gt([R(t,[.04,-.1]),R(t,[-.14,-.16]),R(t,[-.2,.02]),R(t,[-.04,.1])],0,3,2,.03,1),x.BELLY,o);else if(e==="squirrel"||e==="star"){const d=e==="star"?x.MAGIC:x.BODY,u=[[...t,.16],[h(1.3),r-.05+l,.36],[h(1.32),r-.65+l,.46],[h(1),r-1.05+l,.44],[h(.62),r-1.02+l,.3],[h(.45),r-.82+l,.12]];i.shape(gt(ea(u),0,6,9,.05,1),d,{...o,extra:!0}),i.mark(ea([[h(1.18),r-.1,.12],[h(1.18),r-.62,.2],[h(.98),r-.9,.2],[h(.7),r-.92,.1]]),e==="star"?x.MAGIC2:x.BODY2,[d]),e==="star"&&i.fn(({sp:f,T:g,s:_})=>{const p=Yi(7);for(let m=0;m<9;m++){const[v,b]=g([h(me(p,.7,1.4)),r-me(p,.1,1)]);if((f.get(v,b)===x.MAGIC||f.get(v,b)===x.MAGIC2)&&(f.px(v,b,x.GLINT),_>40))for(const[M,y]of[[1,0],[-1,0],[0,1],[0,-1]])[x.MAGIC,x.MAGIC2].includes(f.get(v+M,b+y))&&f.px(v+M,b+y,x.GLINT)}})}else if(e==="otter")i.limb([[...t,.26],[h(1.3),r+.5+l,.18],[h(1.6),-.12,.1],[h(1.85),-.06+l,.04]],x.BODY,o);else if(e==="stoat")i.limb([[...t,.12],[h(1.25),r+.12+l,.1],[h(1.5),r+.02+l,.09],[h(1.65),r-.05+l,.07]],x.BODY,o),i.mark([[h(1.48),r-.25],[h(1.8),r-.25],[h(1.8),r+.25],[h(1.48),r+.25]],x.BODY3,[x.BODY]);else if(e==="flat"){i.limb([[...t,.14],[h(1.15),r+.6,.1]],x.BODY2,o);const d=[h(1.35),-.12+l*.5];i.shape([R(d,[.22,-.06]),R(d,[0,-.11]),R(d,[-.3,-.07]),R(d,[-.36,.02]),R(d,[-.2,.07]),R(d,[.2,.05])],x.BODY3,o),i.fn(({sp:u,T:f,s:g})=>{if(g<30)return;const[_,p]=f(R(d,[-.32,-.1])),[m,v]=f(R(d,[.2,.06]));for(let b=p;b<=v;b++)for(let M=_;M<=m;M++)(M+b)%4===0&&u.get(M,b)===x.BODY3&&u.recolour(M,b,x.LINE)})}else e==="thin"&&(i.limb([[...t,.07],[h(1.1),r+.3,.05],[h(1.12)+l,r+.55,.035]],x.BODY,{group:3}),i.shape(gt([[h(1.15)+l,r+.5],[h(1.08)+l,r+.55],[h(1.12)+l,r+.72],[h(1.17)+l,r+.7]],1,3,2,.04,1),x.BODY3,{group:3}))}function zg(i,e,t,n,r,s,a,c){const l=e.ear;if(l==="none")return;if(l==="round"){i.shape([R(t,[-n*.32,.02]),R(t,[-n*.3,-r*.32]),R(t,[-n*.05,-r*.45]),R(t,[n*.15,-r*.25]),R(t,[n*.18,.02])],s,a),i.mark([R(t,[-n*.2,-.01]),R(t,[-n*.18,-r*.2]),R(t,[n*.02,-r*.28]),R(t,[n*.08,-.01])],x.EAR,[s]);return}if(l==="long"){const h=R(t,[-r*.32,-r*1.05+(c?.02:0)]);i.shape([R(t,[-n*.25,.02]),R(Ze(t,h,.5),[-n*.2,0]),R(h,[-n*.05,-n*.05]),R(h,[n*.12,n*.1]),R(Ze(t,h,.5),[n*.24,n*.05]),R(t,[n*.25,0])],s,a),i.mark([R(Ze(t,h,.15),[-n*.05,0]),R(Ze(t,h,.8),[0,0]),R(Ze(t,h,.5),[n*.14,n*.03])],x.EAR,[s]),i.mark([R(h,[-n*.3,-n*.3]),R(h,[n*.3,-n*.2]),R(Ze(t,h,.85),[n*.3,n*.1]),R(Ze(t,h,.85),[-n*.3,0])],x.BODY3,[s,x.EAR]);return}const o=l==="small"?[R(t,[-n*.25,.02]),R(t,[-n*.55,-r*.55]),R(t,[-n*.62,-r*.62]),R(t,[n*.2,-n*.08])]:[R(t,[-n*.3,.02]),R(t,[-n*.25,-r*.6]),R(t,[-n*.12,-r*1.02]),R(t,[-n*.05,-r*1.04]),R(t,[n*.22,-r*.45]),R(t,[n*.3,-n*.02])];i.shape(o,s,a),l!=="small"&&i.mark([R(t,[-n*.15,-r*.15]),R(t,[-n*.1,-r*.7]),R(t,[n*.1,-r*.35]),R(t,[n*.12,-r*.1])],x.EAR,[s]),i.mark([R(t,[-n*.3,-r*.72]),R(t,[-n*.1,-r*1.1]),R(t,[n*.1,-r*.9]),R(t,[n*.3,-r*.62])],x.BODY3,[s,x.EAR]),l==="tuft"&&i.limb([[...R(t,[-n*.08,-r*.98]),.045],[...R(t,[-n*.02,-r*1.35]),.02]],x.BODY3,{...a,extra:!0})}function Gg(i,e,t,n,r,s,a,c){const l=!e.antlers,o=l?.45:[0,.5,.9][r]*(s("antlersGlow")?1.15:1);if(!o)return;const h=(p,m,v,b)=>i.limb([[...p,b],[...R(p,[Math.cos(m)*v*.6,-Math.sin(m)*v*.6]),b*.7],[...R(p,[Math.cos(m)*v,-Math.sin(m)*v*1.05]),b*.3]],a,{...c,capEnd:.6}),d=.07*Math.max(.7,o);if(e.antlers==="palm"){const p=R(t,[-.2*o,-.12*o]),m=R(p,[-.32*o,-.18*o]);i.limb([[...t,d*1.3],[...p,d*1.1],[...Ze(p,m,.6),d]],a,c);const v=[R(p,[0,-.02*o]),R(m,[.18*o,-.2*o]),R(m,[-.05*o,-.3*o]),R(m,[-.38*o,-.2*o]),R(m,[-.42*o,.02*o]),R(m,[-.15*o,.12*o])];i.shape(gt(v,1,4,r===2?4:3,.09*o,1),a,c),h(R(p,[.02*o,0]),.5,.22*o,d*.7);return}const u=R(t,[-.22*o,-.28*o]),f=R(t,[-.3*o,-.62*o]),g=R(t,[-.16*o,-.92*o]),_=R(t,[.02*o,-1.02*o]);i.limb([[...t,d*1.25],[...u,d],[...f,d*.85],[...g,d*.65],[..._,d*.3]],a,{...c,capEnd:.6}),h(R(t,[-.06*o,-.08*o]),.45,.3*o,d*.8),(o>.4||l)&&h(u,.7,.32*o,d*.7),o>.7&&(h(f,.85,.3*o,d*.6),h(g,1.1,.2*o,d*.5),h(g,2.3,.16*o,d*.45))}function ps(i,e,t){[.32,.5,.38,.62,.42,.3].forEach((r,s)=>{const a=.12+s*.14,c=R(e(a),[0,.08]),l=(s-2.5)*.08,o=r*.32,h=R(c,[l*r,-r]),d=[R(c,[-o*.5,0]),R(c,[-o*.55+l*r*.7,-r*.72]),h,R(c,[o*.55+l*r*.7,-r*.72]),R(c,[o*.5,0])];i.shape(d,x.MAGIC,{group:80+s%2,line:!0,extra:!0}),i.mark([R(c,[0,0]),R(c,[l*r*.7,-r*.72]),h,R(c,[o*.55+l*r*.7,-r*.72]),R(c,[o*.5,0])],x.MAGIC2,[x.MAGIC])})}function Wg(i,e,t,n){const r=[],s=[];for(let a=0;a<=8;a++){const c=e(.05+a*.11);r.push(R(c,[0,-.08])),s.unshift(R(c,[0,.14]))}i.shape(gt([...r,...s],0,8,2,.05,1),x.LEAF,{group:85,line:!0,extra:!0});for(const[a,c]of[[.22,.55],[.5,.8],[.75,.45]]){const l=R(e(a),[0,-.02]),o=n?.02:0;i.limb([[...l,.07],[...R(l,[o,-c*.6]),.04]],x.TRUNK,{group:86,line:!0,extra:!0});const h=R(l,[o,-c*.75]),d=c*.32;i.shape(gt([R(h,[0,-d]),R(h,[d*.9,-d*.3]),R(h,[d,d*.4]),R(h,[0,d*.6]),R(h,[-d,d*.4]),R(h,[-d*.9,-d*.3])],0,6,2,d*.2,1),x.LEAF2,{group:87,line:!0,extra:!0}),i.mark([R(h,[-d*.2,-d*.1]),R(h,[d*.9,0]),R(h,[d*.8,d*.5]),R(h,[-d*.5,d*.5])],x.LEAF,[x.LEAF2])}for(const a of[.1,.38,.62,.9]){const c=R(e(a),[0,-.06]);i.limb([[...c,.04],[...R(c,[0,-.1]),.035]],x.BELLY,{group:88,extra:!0}),i.shape([R(c,[-.08,-.1]),R(c,[0,-.17]),R(c,[.08,-.1])],x.MAGIC,{group:89,line:!0,extra:!0})}}function Hg(i,e,t,n){for(let r=0;r<3;r++){const s=[],a=n*.8+r*1.7;for(let c=0;c<=8;c++){const l=c/8;s.push([e*(.55-l*2.2),t+.05-r*.1-l*(.25+r*.12)+Math.sin(l*6+a)*.1*l,.07*(1-l*.7)])}i.limb(s,r%2?x.MAGIC2:x.MAGIC,{group:90+r,line:!0,extra:!0})}}function xc(i,{sh:e,wrist:t,tip:n,d0:r,d1:s,l0:a,l1:c,w:l=.13,mat:o=x.MAGIC,light:h=x.MAGIC2,n:d=11,group:u=10}){const f=m=>m<.45?Ze(e,t,m/.45):Ze(t,n,(m-.45)/.55),g=[];for(let m=0;m<=d;m++){const v=m/d,b=Ze(r,s,v),M=Math.hypot(...b),y=a+(c-a)*v*v,T=f(v);g.push({b:T,e:[T[0]+b[0]/M*y,T[1]+b[1]/M*y]})}const _=[];for(let m=d;m>=0;m--)_.push(g[m].e),m&&_.push(Ze(Ze(g[m].e,g[m-1].e,.5),Ze(g[m].b,g[m-1].b,.5),.14));i.shape([R(e,[0,-l*.5]),R(t,[0,-l*.5]),R(n,[0,-l*.4]),..._],o,{group:u,line:!0,extra:!0});for(let m=0;m<d;m+=2)i.mark([g[m].b,g[m+1].b,Ze(g[m+1].b,g[m+1].e,1.02),Ze(g[m].b,g[m].e,1.02)],h,[o]);const p=[];for(let m=d;m>=0;m--)p.push(Ze(g[m].b,g[m].e,.33));i.shape(gt([R(e,[0,-l*.6]),R(t,[0,-l*.6]),R(n,[0,-l*.5]),...p],3,3+d,1,l*.25,1),h,{group:u+1,line:!0,extra:!0})}function Hi(i,e,t,n,r){const s=r<0,a=n?-.06:0,c=R(e,s?[.1,-.06]:[0,0]),l=s?.9:1;xc(i,{sh:c,wrist:R(c,[-.25*l,-.72*l+a]),tip:R(c,[-1*l,-1*l+a*1.5]),d0:[-.85,.55],d1:[-1,.25],l0:.22*l,l1:.8*l,mat:s?x.BODY2:x.MAGIC,light:s?x.MAGIC:x.MAGIC2,group:s?40:50})}function Xt(i,e){const t=Yi(e.length*7919);for(let n=0;n<8;n++){const r=Math.floor(me(t,2,i.w-2)),s=Math.floor(me(t,2,i.h*.6));if(!(i.get(r,s)||i.get(r+1,s)||i.get(r-1,s)||i.get(r,s+1)||i.get(r,s-1))&&(i.px(r,s,x.MAGIC2),n%3===0))for(const[a,c]of[[1,0],[-1,0],[0,1],[0,-1]])i.get(r+a,s+c)||i.px(r+a,s+c,x.MAGIC)}}function vc(i,e,t,n,r){const s=[R(e,[-t/2,0]),R(e,[-t/2,-n*.35]),R(e,[t/2,-n*.35]),R(e,[t/2,0])],a=[s[0],R(e,[-t*.55,-n]),R(e,[-t*.3,-n*.45]),R(e,[-t*.15,-n*1.05]),R(e,[0,-n*.5]),R(e,[t*.15,-n*1.05]),R(e,[t*.3,-n*.45]),R(e,[t*.55,-n]),s[3]];i.shape(a,x.MAGIC,{group:95,line:!0,extra:!0}),i.mark([R(e,[-t*.6,-n*.05]),R(e,[t*.6,-n*.05]),R(e,[t*.6,-n*.3]),R(e,[-t*.6,-n*.3])],x.MAGIC2,[x.MAGIC]),i.fn(({sp:c,T:l})=>{for(const o of[-.3,0,.3]){const[h,d]=l(R(e,[t*o,-n*.17]));c.recolour(h,d,x.GLINT)}})}function Vg(i,e,t,n){const r=e===2,s=e===1,a=u=>r&&i.legend.includes(u),c=new Vt,l=t?.02:0;for(const[u,f,g]of[[-.45,x.BODY3,2],[.3,x.BODY3,2]])c.limb([[u+.05,-.25,.14],[u+.08+l,0,.1]],f,{group:g});c.shape([[-.6,-.3],[.45,-.38],[.55,-.15],[.1,-.08],[-.55,-.12]],x.BELLY,{group:1,line:!0});let o=[[-.75,-.15],[-.82,-.5],[-.55,-.9],[-.05,-1],[.35,-.88],[.58,-.58],[.5,-.3],[.15,-.38],[-.3,-.28]];o=gt(o,0,6,s?3:r?6:4,s?.06:.09,1),c.shape(o,x.BODY2,{group:3,line:!0}),c.fn(({sp:u,T:f,s:g})=>{if(g<18)return;const _=Yi(11),[p,m]=f([-.85,-1.05]),[v,b]=f([.6,-.2]),M=Math.round((v-p)*(b-m)/9);for(let y=0;y<M;y++){const T=Math.round(me(_,p,v)),C=Math.round(me(_,m,b)),E=Math.max(2,Math.round(g*.05));if(u.g[C*u.w+T]===3){for(let B=0;B<E;B++){const L=T-B,D=C+(B>>1);u.g[D*u.w+L]===3&&u.m[D*u.w+L]!==x.LINE&&(u.m[D*u.w+L]=x.BODY3)}u.g[C*u.w+T+1]===3&&(u.m[C*u.w+T+1]=x.BELLY)}}});const h=s?.16:.24;c.shape([[.35,-.68],[.58,-.6],[.68+h,-.4],[.7+h,-.3],[.6,-.18],[.32,-.22]],x.BELLY,{group:4,line:!0}),c.shape([[.38,-.7],[.48,-.78],[.55,-.66],[.46,-.6]],x.BODY,{group:5,line:!0}),c.fn(({sp:u,T:f,s:g})=>{const[_,p]=f([.7+h,-.36]),m=Math.max(1,Math.round(g*.035));for(let M=-m;M<=m;M++)for(let y=-m;y<=0;y++)u.recolour(_+y,p+M,x.NOSE);const[v,b]=f([.58,-.5]);fr(u,v,b,Math.max(2,Math.round(g*(s?.1:.07)*n.eye)),{glow:r})}),a("crystals")&&ps(c,u=>[-.7+u*1.2,-.98+Math.pow(u-.45,2)*1.4]);const d=c.draw(Ht(e,n)*.55,n.round,1,En);return r&&Xt(d,i.id),d}function Xg(i,e,t,n){const r=e===2,s=e===1,a=u=>r&&i.legend.includes(u),c=new Vt,l=t?-.05:0;c.limb([[-.35,-.35+l,.28],[-.05,-.12,.18],[-.4,-.04,.12],[-.1,0,.08]],x.BODY2,{group:2}),c.limb([[.45,-.35+l,.12],[.62,0,.08]],x.BODY2,{group:2});const o=[[-.7,-.18+l],[-.72,-.5+l],[-.4,-.8+l],[.1,-.86+l],[.5,-.74+l],[.76,-.52+l],[.8,-.36+l],[.62,-.18+l],[.1,-.08+l],[-.4,-.08+l]];c.shape(o,x.BODY,{group:1,line:!0}),c.mark([[-.5,-.3+l],[.3,-.42+l],[.8,-.38+l],[.65,-.1+l],[-.4,-.05+l]],x.BELLY,[x.BODY]),c.shape([[.18,-.78+l],[.28,-.98+l],[.48,-1+l],[.58,-.8+l]],x.BODY,{group:1}),c.limb([[-.3,-.45+l,.34],[.02,-.14,.2],[-.42,-.05,.13],[-.06,0,.09]],x.BODY,{group:6,line:!0});const h=()=>{c.limb([[.46,-.32+l,.16],[.56,-.14,.11],[.64,0,.08]],x.BODY,{group:7,line:!0});for(const u of[-.06,.64])c.shape([[u-.06,-.04],[u+.14,-.05],[u+.16,0],[u-.06,0]],x.BODY,{group:7})};c.fn(({sp:u,T:f,s:g})=>{if(g>18){const y=Yi(5);for(let T=0;T<40;T++){const[C,E]=f([me(y,-.65,.55),me(y,-.8,-.35)+l]);u.m[E*u.w+C]===x.BODY&&u.g[E*u.w+C]===1&&(u.m[E*u.w+C]=x.BODY3,g>50&&u.recolour(C+1,E-1,x.BELLY))}}const[_,p]=f([.79,-.4+l]),[m]=f([.35,0]);for(let y=m;y<=_;y++)u.recolour(y,p+Math.round((_-y)*.08),x.LINE);const[v,b]=f([.42,-.88+l]),M=Math.max(2,Math.round(g*(s?.17:.13)*n.eye));if(Vi(u,v,b,M,r),M>=4)for(let y=-Math.floor(M/2)+1;y<Math.floor(M/2);y++)u.px(v+y,b,x.EYE)}),h(),a("crown")&&vc(c,[.38,-1+l],.5,.32);const d=c.draw(Ht(e,n)*.5,n.round,1,En);return r&&Xt(d,i.id),d}function Yg(i,e,t,n){const r=e===2,s=e===1,a=f=>r&&i.legend.includes(f),c=new Vt,l=t?.02:0;a("wings")&&Hi(c,[.05,-.72],r,t,-1);for(const[f,g,_]of[[-.02,2,x.BODY3],[.1,7,x.NOSE]]){const p=t&&g===7?-.04:0;c.limb([[f,-.32,.07],[f+.04,-.02+p,.05]],_,{group:g}),c.shape([[f-.1,-.04+p],[f+.2,-.05+p],[f+.2,0+p],[f-.1,0+p]],_,{group:g})}c.shape(gt([[-.25,-.48+l],[-.95,-.3],[-1,-.2],[-.25,-.3]],1,2,3,.04,1),x.BODY2,{group:3,line:!0}),c.shape([[.38,-.78+l],[.42,-.52],[.18,-.3],[-.25,-.3],[-.48,-.45],[-.2,-.72+l]],x.BODY,{group:1,line:!0});const o=s?.21:.17,h=[.45,-.86+l];c.shape(gt([R(h,[-o*.9,0]),R(h,[-o*.4,-o*.95]),R(h,[o*.5,-o*.85]),R(h,[o*.95,-o*.1]),R(h,[o*.6,o*.9]),R(h,[-o*.2,o*1.6]),R(h,[-o*.8,o*1.2])],4,6,3,.03,1),x.BODY,{group:1});const d=s?.28:.38;c.shape([R(h,[o*.6,-o*.45]),R(h,[o+d*.6,-o*.45]),R(h,[o+d,-o*.05]),R(h,[o+d*.95,o*.15]),R(h,[o+d*.4,o*.2]),R(h,[o*.6,o*.35])],x.NOSE,{group:8,line:!0}),a("wings")||c.shape(gt([[.28,-.72+l],[-.1,-.42],[-.75,-.3],[-.75,-.36],[-.2,-.66+l]],1,3,4,.04,1),x.BODY2,{group:4,line:!0}),c.fn(({sp:f,T:g,s:_})=>{const[p,m]=g(R(h,[o*.35,-o*.2]));fr(f,p,m,Math.max(2,Math.round(_*(s?.1:.07)*n.eye)),{glow:r});const[v,b]=g(R(h,[o*.85,-o*.35]));if(f.px(v,b,r?x.MAGIC2:x.EYE),_>30){const[M,y]=g(R(h,[o*.1,-o*.7]));f.recolour(M,y,x.BELLY),f.recolour(M+1,y,x.BELLY)}}),a("eyesRing")&&c.fn(({sp:f,T:g,s:_})=>{const p=Math.max(3,Math.round(_*.09));for(let m=0;m<5;m++){const v=Math.PI*(1.15+m*.17),[b,M]=g(R(h,[Math.cos(v)*.55-.15,Math.sin(v)*.5+.05]));Vi(f,b,M,p,!0,!0)}}),a("wings")&&Hi(c,[-.02,-.66],r,t,1);const u=c.draw(Ht(e,n)*.6,n.round,1,En);return r&&Xt(u,i.id),u}function qg(i,e,t,n){const r=e===2,s=e===1,a=_=>r&&i.legend.includes(_),c=new Vt,l=a("wingsBig")?1.5:s?.85:1,o=t===0,h=-.25;for(const _ of[-1,1]){const p=(C,E)=>[_*C*l,E+h],m=p(.12/l,-.62),v=o?p(.55,-1):p(.6,-.62),b=o?[p(1,-.95),p(1.05,-.62),p(.8,-.32)]:[p(1.05,-.45),p(.9,-.18),p(.6,-.02)],M=p(.12/l,-.38),y=[m,v,b[0]];for(let C=1;C<b.length;C++)y.push(Ze(Ze(b[C-1],b[C],.5),v,.22),b[C]);y.push(Ze(Ze(b[2],M,.5),v,.1),M);const T=a("wingsBig")?x.MAGIC:x.BODY2;c.shape(_<0?y.slice().reverse():y,T,{group:10+(_>0?1:0),line:!0,extra:!0,depth:2});for(const C of b)c.limb([[...v,.05],[...C,.02]],a("wingsBig")?x.MAGIC2:x.BODY3,{group:12,extra:!0});c.limb([[...m,.07],[...v,.05]],a("wingsBig")?x.MAGIC2:x.BODY3,{group:12,extra:!0})}const d=[0,-.5+h];c.shape(gt([R(d,[0,-.25]),R(d,[.17,-.12]),R(d,[.16,.15]),R(d,[0,.28]),R(d,[-.16,.15]),R(d,[-.17,-.12])],2,5,3,.03,1),x.BODY,{group:1,line:!0});const u=[0,-.82+h],f=s?.17:.14;for(const _ of[-1,1])c.shape([R(u,[_*f*.3,-f*.6]),R(u,[_*f*1.05,-f*2.3]),R(u,[_*f*1.2,-f*.3])],x.BODY,{group:2,line:!0}),c.mark([R(u,[_*f*.55,-f*.7]),R(u,[_*f*1,-f*1.9]),R(u,[_*f*1,-f*.5])],x.EAR,[x.BODY]);c.shape([R(u,[0,-f]),R(u,[f,-f*.3]),R(u,[f*.7,f*.8]),R(u,[0,f]),R(u,[-f*.7,f*.8]),R(u,[-f,-f*.3])],x.BODY,{group:1}),c.fn(({sp:_,T:p,s:m})=>{for(const M of[-1,1]){const[y,T]=p(R(u,[M*f*.42,-f*.1]));m*f>7?Vi(_,y,T,Math.max(2,Math.round(m*f*.4*n.eye)),r):_.px(y,T,x.EYE)}const[v,b]=p(R(u,[0,f*.45]));_.recolour(v,b,x.NOSE),_.recolour(v-1,b,x.NOSE),m>30&&(_.recolour(v-2,b+2,x.GLINT),_.recolour(v+1,b+2,x.GLINT))});for(const _ of[-1,1])c.limb([[_*.08,-.28+h,.05],[_*.1,-.18+h,.04]],x.BODY3,{group:3});const g=c.draw(Ht(e,n)*.45,n.round,1,null,!1);return r&&Xt(g,i.id),g}function Kg(i,e,t,n){const r=e===2,s=e===1,a=u=>r&&i.legend.includes(u),c=new Vt,l=t?.03:0;c.limb([[-.5,-.25,.14],[-.48,0,.1]],x.SKIN,{group:2}),c.limb([[-.7,-.3,.08],[-.85,-.2,.05]],x.SKIN,{group:2});const o=s?.22:.32;c.shape([[-.75,-.12],[-.82,-.5],[-.45,-.95],[.15,-1],[.55,-.8],[.8,-.55],[.8,-.35],[.55,-.2],[0,-.08]],x.BODY,{group:1,line:!0}),c.shape([[.7,-.58],[.8+o,-.5],[.84+o,-.42],[.8+o,-.36],[.72,-.36]],x.SKIN,{group:4,line:!0}),c.mark([[-.6,-.85],[.3,-.98],[.5,-.8],[-.3,-.72]],x.BODY2,[x.BODY]);const h=(u,f,g)=>{c.limb([[u-.05,-.4,.14],[u+.02,-.16-l,.11]],f,{group:g,line:!0}),c.shape([[u-.06,-.2-l],[u+.12,-.22-l],[u+.2,-.08-l],[u+.06,-.03],[u-.08,-.06]],x.SKIN,{group:g,line:!0});for(let _=0;_<4;_++)c.limb([[u+.08+_*.045,-.08-l*(_%2),.035],[u+.14+_*.05,0,.015]],x.ACCENT,{group:g+1,line:!0,extra:!0})};h(.25,x.BODY2,5),h(.45,x.BODY,7),c.fn(({sp:u,T:f,s:g})=>{const[_,p]=f([.62,-.62]);u.px(_,p,r?x.MAGIC2:x.EYE),g>40&&u.px(_-1,p,r?x.MAGIC:x.EYE);const[m,v]=f([.84+o,-.45]);u.recolour(m,v,x.NOSE),u.recolour(m,v+1,x.NOSE)}),a("crown")&&vc(c,[.25,-.98],.42,.3);const d=c.draw(Ht(e,n)*.45,n.round,1,En);return r&&Xt(d,i.id),d}function Zg(i,e,t,n){const r=e===2,s=f=>r&&i.legend.includes(f),a=new Vt,c=(f,g,_,p,m)=>{const v=(_+(g>0?1:0)+t)%2?.06:-.06,b=[f,-.3],M=[f+g*0+v+(_-1)*.1,-.42],y=[f+v*1.5+(_-1)*.22,0];a.limb([[...b,.07],[...M,.06],[...y,.03]],p,{group:m,line:!0})};for(let f=0;f<3;f++)c(-.3+f*.35,-1,f,x.BODY3,2);const l=[.3,.55,.8][e]*(s("horn")?1.3:1),o=s("horn")?x.MAGIC:x.BODY2,h=[.62,-.5],d=(f,g,_)=>{const p=R(h,[.12,f]),m=R(p,[l*.9,-l*.45]),v=R(p,[l*1.05,-l*.2]);a.limb([[...p,.1],[...R(p,[l*.45,-l*.4]),.085],[...m,.06],[...v,.02]],g,{group:_,line:!0,extra:!0,capEnd:.5}),a.limb([[...R(p,[l*.5,-l*.4]),.05],[...R(p,[l*.62,-l*.18]),.015]],g,{group:_,line:!0,extra:!0})};d(-.02,s("horn")?x.MAGIC:x.BODY3,3),a.shape([[-.8,-.25],[-.78,-.6],[-.35,-.85],[.12,-.8],[.3,-.58],[.25,-.28],[-.3,-.18]],x.BODY,{group:1,line:!0}),a.mark([[-.65,-.65],[-.3,-.8],[.05,-.76],[-.2,-.68]],x.BELLY,[x.BODY]),a.shape([[.22,-.68],[.48,-.7],[.58,-.5],[.5,-.3],[.24,-.3]],x.BODY,{group:4,line:!0}),a.shape([[.5,-.62],[.72,-.6],[.78,-.45],[.68,-.36],[.5,-.4]],x.BODY2,{group:5,line:!0}),d(.04,o,6),a.limb([[.7,-.6,.025],[.78,-.75,.02],[.9,-.72,.02]],x.BODY3,{group:9,extra:!0});for(let f=0;f<3;f++)c(-.2+f*.35,1,f,x.BODY2,7);a.fn(({sp:f,T:g,s:_})=>{const[p,m]=g([-.78,-.42]),[v,b]=g([.28,-.5]);if(_>25)for(let T=p+2;T<v-2;T++)f.recolour(T,Math.round(m+(b-m)*(T-p)/(v-p))-Math.round(Math.sin((T-p)/(v-p)*Math.PI)*_*.12),x.LINE);const[M,y]=g([.66,-.52]);f.px(M,y,r?x.MAGIC2:x.GLINT)}),s("crystals")&&ps(a,f=>[-.7+f*.9,-.82+Math.pow(f-.5,2)*.8]);const u=a.draw(Ht(e,n)*.4,n.round,1,En);return r&&Xt(u,i.id),u}const En=([i,e])=>{const t=Math.max(-1.2,Math.min(.75,i)),n=1+.1*t;return[i,e*n-.08*Math.max(0,-t),n]};function $g(i,e,t,n){const r=e===2,s=e===1,a=f=>r&&i.legend.includes(f),c=new Vt,l=t?.04:0;c.shape([[-.85,-.02],[-.75,-.16],[.3,-.2],[.62+l,-.32],[.82+l,-.32],[.9+l,-.15],[.8+l,0],[-.85,0]],x.SKIN,{group:1,line:!0});for(const[f,g,_]of[[.08,x.BODY2,2],[0,x.SKIN,5]])c.limb([[.72+l+f,-.3,.06],[.8+l+f,-.55,.04],[.84+l+f,-.62,.05]],g,{group:_,line:!0});const o=a("glowShell")?x.MAGIC:x.BODY,h=[-.15,-.55],d=s?.45:.5;c.shape([R(h,[0,-d]),R(h,[d*.95,-d*.2]),R(h,[d*.7,d*.75]),R(h,[-d*.3,d*.9]),R(h,[-d,d*.3]),R(h,[-d*.85,-d*.55])],o,{group:3,line:!0}),c.fn(({sp:f,T:g,s:_})=>{const p=a("glowShell")?x.MAGIC2:x.BODY3;for(let y=0;y<1;y+=.004){const T=y*Math.PI*5.2,C=d*.85*(1-y),[E,B]=g(R(h,[Math.cos(T)*C,Math.sin(T)*C*.95])),L=f.get(E,B);(L===o||L===x.BODY2)&&f.recolour(E,B,p)}const[m,v]=g([.85+l,-.64]);f.px(m,v,r?x.MAGIC2:x.EYE);const[b,M]=g([.93+l,-.62]);f.px(b,M,r?x.MAGIC2:x.EYE)});const u=c.draw(Ht(e,n)*.4,n.round,1,En);return r&&Xt(u,i.id),u}function Jg(i,e,t,n){const r=e===2,s=l=>r&&i.legend.includes(l),a=new Vt;for(let l=0;l<7;l++){const o=-.6+l*.2,h=(l+t)%2?.04:-.04;a.limb([[o,-.12,.05],[o+h+.04,0,.03]],x.BODY3,{group:2})}a.limb([[.75,-.3,.03],[.95,-.55,.02],[1.05,-.5,.02]],x.BODY3,{group:2,extra:!0}),a.shape([[-.85,-.1],[-.7,-.6],[-.1,-.85],[.5,-.72],[.82,-.4],[.82,-.12],[-.8,-.06]],x.BODY,{group:1,line:!0}),a.fn(({sp:l,T:o,s:h})=>{for(let f=1;f<8;f++){const g=-.85+f*.21;for(let _=o([0,-.9])[1];_<o([0,-.08])[1];_++){const[p]=o([g+(_-o([0,-.5])[1])*.002,0]);l.get(p,_)===x.BODY&&l.recolour(p,_,h>25?x.LINE:x.BODY2)}}const[d,u]=o([.72,-.38]);l.px(d,u,r?x.MAGIC2:x.EYE)}),a.mark([[-.6,-.62],[0,-.86],[.4,-.72],[0,-.65]],x.BELLY,[x.BODY]),s("crystals")&&ps(a,l=>[-.65+l*1.2,-.82+Math.pow(l-.45,2)*1.2]);const c=a.draw(Ht(e,n)*.3,n.round,1,En);return r&&Xt(c,i.id),c}function Qg(i,e,t,n){const r=e===2,s=e===1,a=f=>r&&i.legend.includes(f),c=new Vt;a("wings")&&Hi(c,[-.05,-.55],r,t,-1);const l=t?.6:0,o=[];for(let f=0;f<=14;f++){const g=f/14,_=-1.1+g*1.6,p=-.08-Math.sin(g*Math.PI*2.2+l)*.05*(1-g);o.push([_,p,.16*(.35+.65*Math.sin(Math.min(1,g*1.6)*Math.PI/2))])}o.push([.6,-.25,.15],[.62,-.5,.14],[.7,-.68,.13]),c.limb(o,x.BODY,{group:1,line:!0,cap:.5}),c.fn(({sp:f,T:g,s:_})=>{for(let p=1;p<o.length-1;p++){const[m,v]=g(o[p]),b=Math.max(1,Math.round(_*.025));for(let M=-b;M<=b;M++)for(let y=-b;y<=b;y++)Math.abs(y)+Math.abs(M)<=b&&f.get(m+y,v+M-b)===x.BODY&&f.recolour(m+y,v+M-b,x.BODY3)}}),c.mark([[-1,-.02],[.6,-.02],[.66,-.45],[.62,-.45],[.5,-.06],[-1,-.06]],x.BELLY,[x.BODY]);const h=[.82,-.74],d=s?.15:.12;c.shape([R(h,[-d*1.1,-d*.4]),R(h,[d*.3,-d*.75]),R(h,[d*1.5,-d*.2]),R(h,[d*1.4,d*.3]),R(h,[-d*.3,d*.7]),R(h,[-d,d*.5])],x.BODY,{group:1}),c.fn(({sp:f,T:g,s:_})=>{const p=Math.max(2,Math.round(_*d*.45*n.eye)),[m,v]=g(R(h,[d*.45,-d*.3]));fr(f,m,v,p,{glow:r});const[b,M]=g(R(h,[d*1.05,-d*.38]));if(f.px(b,M,r?x.MAGIC2:x.EYE),t===0){const[y,T]=g(R(h,[d*1.5,d*.15]));for(let C=0;C<Math.max(2,Math.round(_*.06));C++)f.px(y+C,T,x.SKIN);f.px(y+Math.max(2,Math.round(_*.06)),T-1,x.SKIN),f.px(y+Math.max(2,Math.round(_*.06)),T+1,x.SKIN)}}),a("wings")&&Hi(c,[-.1,-.45],r,t,1);const u=c.draw(Ht(e,n)*.45,n.round,1,En);return r&&Xt(u,i.id),u}function jg(i,e,t,n){const r=e===2,s=e===1,a=f=>r&&i.legend.includes(f),c=new Vt,l=a("wingsBig")?1.45:s?.85:1,o=t===0,h=-.25,d=a("wingsBig")?x.MAGIC:x.BODY;for(const f of[-1,1]){const g=(m,v)=>[f*m*l,(o?v:v*.7+.12)+h],_=[g(.08,-.62),g(.55,-1),g(1,-.92),g(.95,-.6),g(.5,-.45),g(.1,-.48)],p=[g(.08,-.45),g(.45,-.42),g(.7,-.22),g(.5,-.05),g(.2,-.1),g(.06,-.3)];c.shape(f<0?p.slice().reverse():p,a("wingsBig")?x.MAGIC2:x.BODY2,{group:10,line:!0,extra:!0}),c.shape(f<0?_.slice().reverse():_,d,{group:11,line:!0,extra:!0}),c.mark([g(.5,-.82),g(.75,-.82),g(.75,-.65),g(.5,-.65)].map((m,v)=>m),x.BELLY,[d]),c.fn(({sp:m,T:v})=>{const[b,M]=v(g(.62,-.74));m.recolour(b,M,x.BODY3),m.recolour(b+1,M,x.BODY3)})}c.shape(gt([[0,-.78+h],[.1,-.6+h],[.08,-.2+h],[0,-.1+h],[-.08,-.2+h],[-.1,-.6+h]],0,6,2,.025,1),x.BELLY,{group:1,line:!0});for(const f of[-1,1])c.limb([[f*.03,-.8+h,.04],[f*.14,-1+h,.07],[f*.2,-1.08+h,.03]],x.BODY2,{group:2,line:!0});c.fn(({sp:f,T:g,s:_})=>{for(const p of[-1,1]){const[m,v]=g([p*.05,-.74+h]);f.px(m,v,r?x.MAGIC2:x.EYE)}});const u=c.draw(Ht(e,n)*.4,n.round,1,null,!1);return r&&Xt(u,i.id),u}function e_(i,e,t,n){const r=e===2,s=h=>r&&i.legend.includes(h),a=new Vt,c=t?.05:0,l=[];for(let h=0;h<=8;h++){const d=h/8;l.push([-.9+d*1.6,-.2-Math.sin(d*Math.PI)*(.1+c),.32-d*.08])}a.limb(l,x.BODY,{group:1,line:!0});for(let h=0;h<6;h++){const d=-.3+h*.16;a.limb([[d,-.1,.04],[d+(h%2?.03:-.03)*(t?-1:1),0,.03]],x.BODY3,{group:2})}a.fn(({sp:h,T:d,s:u})=>{for(let b=1;b<8;b++){const[M]=d(l[b]);for(let y=0;y<h.h;y++)h.get(M,y)===x.BODY&&h.recolour(M,y,x.BODY2)}const f=s("lantern")?1.7:1,[g,_]=d([-.8,-.2]),p=Math.round(u*.17*f);for(let b=-p;b<=p;b++)for(let M=-p;M<=p;M++){const y=Math.hypot(M,b)/p;y>1||(h.get(g+M,_+b)||f>1)&&h.px(g+M,_+b,y<.55?x.MAGIC2:x.MAGIC,M/(p+1),b/(p+1),.8)}const[m,v]=d([.66,-.28]);h.px(m,v,r?x.MAGIC2:x.EYE)});const o=a.draw(Ht(e,n)*.3,n.round,1,En);return r&&Xt(o,i.id),o}function t_(i,e,t,n){const r=e===2,s=o=>r&&i.legend.includes(o),a=new Vt,c=(o,h)=>{const d=.1+o*.1,u=o<2?1:-1,f=(o+(h?0:1)+t)%2?.07:-.07,g=h?[0,0]:[.06,-.1],_=[d+u*.25+f,-.75],p=[d+u*.55+f*1.5,0];a.limb([[d,-.42,.07],_,p].map((m,v)=>[m[0]+g[0],m[1]+g[1],v===0?.07:v===1?.06:.03]),h?x.BODY2:x.BODY3,{group:h?7:2,line:h})};for(let o=0;o<4;o++)c(o,!1);a.shape([[-.95,-.5],[-.7,-.95],[-.15,-1],[.12,-.6],[-.1,-.25],[-.6,-.2]],x.BODY,{group:1,line:!0}),a.mark([[-.55,-.88],[-.45,-.88],[-.45,-.3],[-.55,-.3]],x.BELLY,[x.BODY]),a.mark([[-.85,-.62],[-.15,-.66],[-.15,-.56],[-.85,-.52]],x.BELLY,[x.BODY]),a.shape([[.05,-.55],[.3,-.7],[.55,-.6],[.6,-.4],[.3,-.3],[.05,-.38]],x.BODY2,{group:3,line:!0});for(let o=0;o<4;o++)c(o,!0);a.fn(({sp:o,T:h,s:d})=>{const u=s("eyesRing"),f=[[.48,-.6],[.53,-.55],[.43,-.57],[.5,-.5]];for(const g of f){const[_,p]=h(g);o.px(_,p,u?x.MAGIC2:x.EYE),d>40&&o.px(_+1,p,u?x.MAGIC:x.EYE)}if(!u){const[g,_]=h(f[0]);o.px(g,_,x.GLINT)}}),s("eyesRing")&&a.fn(({sp:o,T:h,s:d})=>{const u=Math.max(3,Math.round(d*.1));for(let f=0;f<5;f++){const g=Math.PI*(1.15+f*.17),[_,p]=h([-.4+Math.cos(g)*.7,-.6+Math.sin(g)*.6]);Vi(o,_,p,u,!0,!0)}});const l=a.draw(Ht(e,n)*.4,n.round,1,En);return r&&Xt(l,i.id),l}function n_(i,e,t,n,r,s){const a=[];for(let c=0;c<=1.001;c+=1/10){const l=-Math.PI/2+.5-c*Math.PI*1.75,o=t*.7*n*(1-.5*c);a.push([e[0]+Math.cos(l)*o-t*.1,e[1]+Math.sin(l)*o*.95,t*.4*n*(1-.65*c)])}i.limb(a,r,{...s,capEnd:.5}),i.fn(({sp:c,T:l,s:o})=>{if(!(o*t<8))for(let h=1;h<a.length-1;h++){const[d,u]=l(a[h]);c.get(d,u)===r&&c.recolour(d,u,x.LINE)}})}function i_(i,e,t,n){const r=e===2,s=e===1,a=p=>r&&i.legend.includes(p),c=new Vt,l=t?-.02:0,o=s?.52:.5,h=s?.4:.34,d=(s?-1.02:-1.1)+l;a("wings")&&_l(c,-1,t);for(const[p,m]of[[-.12,x.ACCENT],[.14,x.ACCENT]]){const v=t&&p>0?-.03:0;c.limb([[p,-.2,.12],[p+.02,-.05+v,.09]],x.BODY2,{group:2}),c.shape([[p-.07,-.06+v],[p+.1,-.07+v],[p+.16,0+v],[p+.1,0+v],[p-.08,0+v]],m,{group:2})}c.shape([[-.3,-.4],[-.48,-.12],[-.4,-.05],[-.18,-.2]],x.BODY2,{group:3,line:!0});const u=[[0,-1+l],[o*.85,-.85+l],[o*1.02,-.5],[o*.8,-.16],[0,-.12],[-o*.85,-.2],[-o*1.02,-.55],[-o*.8,-.88+l]];c.shape(u,x.BODY,{group:1,line:!0}),c.mark([[0,-.9+l],[o*.7,-.75],[o*.75,-.35],[o*.3,-.15],[-o*.2,-.18],[-o*.45,-.5],[-o*.3,-.85]],x.BELLY,[x.BODY]),c.fn(({sp:p,T:m,s:v})=>{if(v<18)return;const[b,M]=m([-o*.3,-.85]),[y,T]=m([o*.7,-.25]),C=Math.max(3,Math.round(v*.09));for(let E=M+C;E<T;E+=C)for(let B=b;B<y;B+=C){const L=(E/C|0)%2?C>>1:0;p.recolour(B+L,E,p.get(B+L,E)===x.BELLY?x.BODY2:p.get(B+L,E)),v>40&&p.recolour(B+L,E+1,p.get(B+L,E+1)===x.BELLY?x.BODY2:p.get(B+L,E+1))}}),a("wings")||c.shape(gt([[-o*.55,-.88+l],[-o*.05,-.78+l],[o*.15,-.45],[-o*.1,-.15],[-o*.45,-.1],[-o*.85,-.35],[-o*.95,-.7]],2,6,s?4:6,.045,1),x.BODY2,{group:4,line:!0}),c.fn(({sp:p,T:m,s:v})=>{if(!(v<18||a("wings")))for(const[b,M]of[[-.35,-.6],[-.15,-.5],[-.5,-.45],[-.3,-.35],[-.6,-.3]]){const[y,T]=m([b*o/.5,M]);p.recolour(y,T,x.BODY3),p.recolour(y+1,T,x.BODY3)}}),c.shape([[0,d-h*.82],[h*.95,d-h*.72],[h*1.2,d-h*.05],[h*.9,d+h*.6],[0,d+h*.78],[-h*.9,d+h*.6],[-h*1.2,d-h*.05],[-h*.95,d-h*.72]],x.BODY,{group:1});for(const p of[-1,1])c.shape(gt([[p*h*.5,d-h*.78],[p*h*1.05,d-h*1.25],[p*h*1.12,d-h*1.32],[p*h*1,d-h*.6]],0,1,2,.05,-p),x.BODY2,{group:5,line:!0});const f=h*.22,g=p=>p<0?.68:1.08;for(const p of[-1,1])c.mark([[f+p*h*.05,d-h*.55],[f+p*h*.7*g(p),d-h*.62],[f+p*h*.98*g(p),d-h*.05],[f+p*h*.68*g(p),d+h*.5],[f+p*h*.05,d+h*.4]],x.BELLY,[x.BODY]);c.fn(({sp:p,T:m,s:v})=>{const b=Math.max(2,Math.round(h*v*(s?.55:.45)*n.eye));for(const E of[-1,1]){const[B,L]=m([f+E*h*.45*g(E),d-h*.18]),D=Math.max(2,Math.round(b*(E<0?.8:1)));Vi(p,B,L,D,r)}const[M,y]=m([f+h*.05,d+h*.05]),T=Math.max(2,Math.round(h*v*.32)),C=Math.max(1,Math.round(T*.4));for(let E=0;E<T;E++)for(let B=-C;B<=C;B++)Math.abs(B)<=C*(1-E/T)+.3&&p.px(M+B,y+E,E===T-1||B===C?x.BODY3:x.ACCENT,B/(C+1)*.5,-.2,.85)}),a("eyesRing")&&c.fn(({sp:p,T:m,s:v})=>{const b=Math.max(3,Math.round(v*.1));for(let M=0;M<7;M++){const y=Math.PI*(1.1+M/6*.8),[T,C]=m([Math.cos(y)*h*2,d-h*.3+Math.sin(y)*h*1.6]);Vi(p,T,C,b,!0,!0)}}),a("wings")&&_l(c,1,t);const _=c.draw(Ht(e,n),n.round);return r&&Xt(_,i.id),_}function Vi(i,e,t,n,r,s=!1){const a=n/2;for(let c=-Math.ceil(a);c<=Math.ceil(a);c++)for(let l=-Math.ceil(a);l<=Math.ceil(a);l++){const o=Math.hypot(l,c)/a;if(o>1.05)continue;const h=o>.82,d=s?o<.45?x.EYE:h?x.MAGIC:x.MAGIC2:h&&a>=2?x.NOSE:o<.5?x.EYE:r?x.MAGIC2:x.IRIS;i.px(e+l,t+c,d,l/(a+1)*.4,c/(a+1)*.4,.9)}s||i.px(e+Math.round(a*.35),t-Math.round(a*.35),x.GLINT)}function _l(i,e,t){const n=e,r=t?-.08:0,s=e<0;xc(i,{sh:[.3*n,-.85],wrist:[1*n,-1.38+r],tip:[1.6*n,-1.55+r*1.5],d0:[.15*n,1],d1:[.9*n,.55],l0:.42,l1:.72,mat:s?x.BODY2:x.MAGIC,light:s?x.MAGIC:x.MAGIC2,group:s?40:50})}const r_=[{k:"ambientHue",g:"Night light",label:"Twilight hue",min:0,max:1,step:.01,v:.68,hue:!0},{k:"ambient",g:"Night light",label:"Twilight brightness",min:.05,max:.6,step:.01,v:.22},{k:"moon",g:"Night light",label:"Moonlight",min:0,max:1,step:.01,v:.3},{k:"moonHue",g:"Night light",label:"Moon hue",min:0,max:1,step:.01,v:.58,hue:!0},{k:"glowHue",g:"Night light",label:"Witch glow hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"glowSat",g:"Night light",label:"Witch glow colour",min:0,max:1,step:.01,v:.35},{k:"glowRadius",g:"Night light",label:"Witch glow reach",min:30,max:200,step:5,v:110},{k:"glowPower",g:"Night light",label:"Witch glow strength",min:.3,max:2.5,step:.05,v:1.4},{k:"bands",g:"Shading",label:"Light steps",min:2,max:7,step:1,v:4},{k:"dither",g:"Shading",label:"Dithering",min:0,max:1,step:.05,v:.35},{k:"round",g:"Shading",label:"Roundness",min:.2,max:1.5,step:.05,v:.9},{k:"outline",g:"Shading",label:"Plant outline",options:["none","dark","tinted"],v:"none"},{k:"cOutline",g:"Shading",label:"Creature outline",options:["dark","tinted","none"],v:"dark"},{k:"shafts",g:"Night light",label:"Moonbeams",min:0,max:1,step:.05,v:.3},{k:"areaContrast",g:"Colour",label:"Difference between areas",min:0,max:1,step:.05,v:.6},{k:"sat",g:"Colour",label:"Saturation",min:.2,max:1.3,step:.01,v:.9},{k:"leafHue",g:"Colour",label:"Leaf hue",min:0,max:1,step:.01,v:.3,hue:!0},{k:"leafVariety",g:"Colour",label:"Leaf colour variety",min:0,max:1,step:.05,v:.3},{k:"trunkHue",g:"Colour",label:"Bark hue",min:0,max:1,step:.01,v:.07,hue:!0},{k:"groundHue",g:"Colour",label:"Ground hue",min:0,max:1,step:.01,v:.27,hue:!0},{k:"groundVal",g:"Colour",label:"Ground brightness",min:.15,max:.7,step:.01,v:.4},{k:"pixel",g:"Shading",label:"Pixel size",min:1,max:5,step:1,v:3},{k:"treeSize",g:"Trees",label:"Tree height",min:.5,max:1.5,step:.05,v:.85},{k:"crownWidth",g:"Trees",label:"Crown width",min:1,max:4,step:.1,v:3},{k:"clearing",g:"Trees",label:"Clearing size",min:0,max:1,step:.05,v:.55},{k:"depth",g:"Map",label:"Border detail (fractal layers)",min:0,max:6,step:1,v:4},{k:"areaScale",g:"Map",label:"Area size (screens)",min:.6,max:2,step:.05,v:1},{k:"areaTypes",g:"Map",label:"Area types",min:4,max:30,step:1,v:30},{k:"density",g:"Trees",label:"Foliage density",min:.2,max:1,step:.05,v:.55},{k:"clump",g:"Trees",label:"Clumpiness",min:0,max:1,step:.05,v:.6},{k:"gnarl",g:"Trees",label:"Gnarliness",min:0,max:1,step:.05,v:.5},{k:"roots",g:"Trees",label:"Roots",min:0,max:1,step:.05,v:.6},{k:"bark",g:"Trees",label:"Bark texture",min:0,max:1,step:.05,v:.6},{k:"trees",g:"Trees",label:"Tree density",min:.2,max:2,step:.05,v:1},{k:"wBroad",g:"Tree mix",label:"Gnarled broadleaf",min:0,max:1,step:.05,v:.8},{k:"wFir",g:"Tree mix",label:"Fir",min:0,max:1,step:.05,v:.6},{k:"wWillow",g:"Tree mix",label:"Willow",min:0,max:1,step:.05,v:.5},{k:"wBirch",g:"Tree mix",label:"Birch",min:0,max:1,step:.05,v:.5},{k:"wPalm",g:"Tree mix",label:"Tree fern",min:0,max:1,step:.05,v:.3},{k:"wFlat",g:"Tree mix",label:"Flat-crowned",min:0,max:1,step:.05,v:.5},{k:"bushes",g:"Undergrowth",label:"Bushes and shrubs",min:0,max:120,step:1,v:55},{k:"bushSize",g:"Undergrowth",label:"Bush size",min:.5,max:1.8,step:.05,v:1},{k:"flowers",g:"Undergrowth",label:"Flowers",min:0,max:1,step:.05,v:.3},{k:"cSat",g:"Creatures",label:"Creature saturation",min:.1,max:1,step:.01,v:.6},{k:"cVal",g:"Creatures",label:"Creature brightness",min:.4,max:1,step:.01,v:.85},{k:"head",g:"Creatures",label:"Baby head size",min:.3,max:.6,step:.01,v:.44},{k:"eye",g:"Creatures",label:"Eye size",min:.5,max:2,step:.05,v:1},{k:"legs",g:"Creatures",label:"Leg length",min:.5,max:1.8,step:.05,v:1},{k:"long",g:"Creatures",label:"Body length",min:.7,max:1.5,step:.05,v:1},{k:"size",g:"Creatures",label:"Baby size (px)",min:5,max:14,step:1,v:8},{k:"growth",g:"Creatures",label:"Legend vs baby height",min:5,max:25,step:1,v:20},{k:"magicHue",g:"Creatures",label:"Magic glow hue",min:0,max:1,step:.01,v:.5,hue:!0},{k:"fur",g:"Creatures",label:"Stripes and spots",min:0,max:1,step:.05,v:.5},{k:"cloakHue",g:"Witch",label:"Cloak hue",min:0,max:1,step:.01,v:.72,hue:!0},{k:"hairHue",g:"Witch",label:"Hair hue",min:0,max:1,step:.01,v:.01,hue:!0}];function s_(){const i={};return r_.forEach(e=>i[e.k]=e.v),i}const Qs=[".........HH.........","........HHHH........",".......HHHHHH.......","......HHHHHHHH......","....HHHHHHHHHHHH....","........SSS.........",".......SSESS........",".......hSSSS........","......hCCCC.........",".....hhCCCCC........",".....h.CCCCCC.......",".......CCCCCCC......",".......CCCCCCCC.....","TTTT.BBBBBBBBBBBBBBB","TTTTTBBBBBBBBBBBBBBB","TTTT......CC.CC....."];function a_(){const i=new Nt(Qs[0].length,Qs.length),e={H:x.CLOTH,S:x.SKIN,E:x.EYE,h:x.HAIR,C:x.CLOTH,B:x.BROOM,T:x.STRAW};return Qs.forEach((t,n)=>[...t].forEach((r,s)=>e[r]&&i.put(s,n,e[r]))),i}const o_=i=>({[x.CLOTH]:we(i.cloakHue,.55,.6),[x.SKIN]:[240,205,170],[x.EYE]:[20,14,26],[x.HAIR]:we(i.hairHue,.7,.85),[x.BROOM]:we(i.trunkHue+.02,.55,.6),[x.STRAW]:[230,190,100]}),l_={broad:yl,fir:Xa,willow:wl,birch:Tl,flat:Al};function c_(i,e,t,n,r){const s=l_[e.type],a={...t,leafHue:i.leaf+(e.dark?.05:0),gnarl:e.gnarl??t.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},c=s(n,a,t.treeSize*r*(e.scale||1)*me(n,.9,1.1)),l=Ya(n,a,s);return e.dark&&(l[x.LEAF]=l[x.LEAF3],l[x.LEAF3]=we(i.leaf+.05,.7,.22)),l[x.NOSE]=[20,16,24],l[x.GLINT]=[235,235,240],{parts:Hc(c),colours:l}}function u_(i,e,t,n,r){const s=Kn[t].id,a=qa.find(u=>u.id===s),c=Kc(s,i,{K:n,makeCanvas:r}),l=[],o=u=>l.push(u)-1,h={big:[],small:[],walls:[],set:null},d=(u,f)=>ki(u,f,i,"none",r);a.big.forEach(([u,f],g)=>{if(u!=="tree"){h.big.push({bot:o(c.big[g].sp),top:null});return}const _=Math.max(1,Math.round(Bl/a.big.length));for(let p=0;p<_;p++){const{parts:m,colours:v}=c_(a,f,i,or(e*13+t*101+g*17+p*7+1),n);h.big.push({bot:o(d(m.bot,v)),top:o(d(m.top,v))})}});for(const u of c.small)h.small.push(o(u.sp));for(const u of c.walls)h.walls.push(o(u.sp));return c.setPiece&&(h.set=o(c.setPiece.sp)),{sprites:l,layout:h,floor:c.floor.sp}}function h_(i,e,t){const n=[];for(let r=0;r<3;r++)for(let s=0;s<2;s++)n.push(ki(Ig(e,r,s,i),Pg(e,i),i,i.cOutline,t));return n}const d_=(i,e)=>i*2+e;function os(i,e,t){return i.getContext("2d").getImageData(0,0,e,t).data}function Ha(i,e=2048){const n=[];let r=0,s=0,a=0,c=1;for(const u of i)r+u.w+1>e&&(r=0,s+=a+1,a=0),n.push({x:r,y:s}),r+=u.w+1,a=Math.max(a,u.h),c=Math.max(c,r);const l=Math.max(1,s+a),o=new Uint8Array(c*l*4),h=new Uint8Array(c*l*4),d=i.map((u,f)=>{const g=n[f],_=os(u.A,u.w,u.h),p=os(u.N,u.w,u.h);for(let m=0;m<u.h;m++){const v=m*u.w*4,b=((g.y+m)*c+g.x)*4;o.set(_.subarray(v,v+u.w*4),b),h.set(p.subarray(v,v+u.w*4),b)}return{uv:[g.x/c,g.y/l,(g.x+u.w)/c,(g.y+u.h)/l],w:u.w,h:u.h}});return{albedo:o,normal:h,width:c,height:l,frames:d}}function f_(i,e){if(i.kind==="creature")return{px:Ha(h_(i.style,i.id,e),1024)};const{sprites:t,layout:n,floor:r}=u_(i.style,i.seed,i.id,i.K,e);return{px:Ha(t),layout:n,floor:{albedo:new Uint8Array(os(r.A,r.w,r.h)),normal:new Uint8Array(os(r.N,r.w,r.h)),w:r.w,h:r.h}}}function xl(i,e,t){const n=new Di(i,e,t,nn,Zt);return n.magFilter=Tt,n.minFilter=Tt,n.generateMipmaps=!1,n.flipY=!1,n.colorSpace=cn,n.needsUpdate=!0,n}function Mc(i){return{albedo:xl(i.albedo,i.width,i.height),normal:xl(i.normal,i.width,i.height),frames:i.frames}}const vl=(i,e=2048)=>Mc(Ha(i,e));class p_{constructor(e,t,n){if(this.style=e,this.seed=t,this.K=2/n,this.witch=vl([ki(a_(),o_(e),e,"dark")]),this.stones=vl([0,1,2,3].map(r=>this.stone(r))),this.useWorkers=typeof Worker<"u"&&typeof OffscreenCanvas<"u",this.useWorkers){const r=Math.max(1,Math.min(3,(navigator.hardwareConcurrency||2)-1));try{for(let s=0;s<r;s++){const a=new Worker(new URL(""+new URL("artWorker-DQhHzC9M.js",import.meta.url).href,import.meta.url),{type:"module"}),c={w:a,busy:!1};a.onmessage=l=>{c.busy=!1,c.job=void 0,this.receive(l.data),this.dispatch()},a.onerror=()=>{this.useWorkers=!1,c.job&&this.queue.unshift(c.job),c.busy=!1,c.job=void 0},this.workers.push(c)}}catch{this.useWorkers=!1}}}style;seed;types=new Map;creatures=new Map;queue=[];inFlight=new Set;workers=[];useWorkers;witch;stones;K;version=0;onFloor=()=>{};stone(e){const t=or(this.seed*3+e),n=5+Math.floor(t()*3),r=7+Math.floor(t()*5),s=new Nt(n+2,r+1);return s.ellipse((n+2)/2,r/2+1,n/2,r/2+.5,x.BODY,{round:this.style.round}),s.ellipse((n+2)/2-1,r/2,n/3,r/3,x.BODY2,{round:this.style.round,onlyOn:new Set([x.BODY]),density:.5,seed:e}),ki(s,{[x.BODY]:[178,174,162],[x.BODY2]:[140,138,130]},this.style,"dark")}key=e=>e.kind+":"+e.id;ask(e){const t=this.key(e);this.inFlight.has(t)||(this.inFlight.add(t),this.queue.push(e),this.dispatch())}dispatch(){if(this.useWorkers)for(const e of this.workers)e.busy||!this.queue.length||(e.busy=!0,e.job=this.queue.shift(),e.w.postMessage(e.job))}receive(e){if(!e.result){console.warn("art worker failed, drawing on the page:",e.error),this.useWorkers=!1,this.queue.unshift(e.job);return}const t=Mc(e.result.px);e.job.kind==="type"?(this.types.set(e.job.id,{atlas:t,layout:e.result.layout}),e.result.floor&&this.onFloor(e.job.id,e.result.floor)):this.creatures.set(e.job.id,{atlas:t,frame:d_}),this.inFlight.delete(this.key(e.job)),this.version++}typeArt(e){const t=this.types.get(e);return t||this.ask({kind:"type",id:e,style:this.style,seed:this.seed,K:this.K}),t}creatureArt(e){const t=this.creatures.get(e);return t||this.ask({kind:"creature",id:e,style:this.style}),t}prefetchType(e){this.types.has(e)||this.typeArt(e)}get pending(){return this.inFlight.size}work(e){if(this.useWorkers)return;const t=performance.now();let n=0;for(;this.queue.length&&(n===0||performance.now()-t<e);){const r=this.queue.shift();this.receive({job:r,result:f_(r,(s,a)=>{const c=document.createElement("canvas");return c.width=s,c.height=a,c})}),n++}}whenIdle(){return new Promise(e=>{const t=()=>{this.work(50),this.pending?setTimeout(t,30):e()};t()})}}const Kt={uAmb:{value:new W},uMoon:{value:new W},uMoonDir:{value:new W(-.45,.75,.5).normalize()},uMoonBeam:{value:new W},uBands:{value:4},uDither:{value:.35},uShafts:{value:.3},uShaftScale:{value:1},uGlowPos:{value:new W},uGlowRgb:{value:new W},uGlowR:{value:8},uGlowPower:{value:1.4}};function m_(i,e,t){const n=(r,s)=>new W(r[0]/255*s,r[1]/255*s,r[2]/255*s);Kt.uAmb.value.copy(n(we(i.ambientHue,.55,1),i.ambient)),Kt.uMoon.value.copy(n(we(i.moonHue,.35,1),i.moon)),Kt.uMoonBeam.value.copy(n(we(i.moonHue,.35,1),i.shafts*.25)),Kt.uBands.value=i.bands,Kt.uDither.value=i.dither*.5,Kt.uShafts.value=i.shafts,Kt.uShaftScale.value=t*2,Kt.uGlowRgb.value.copy(n(we(i.glowHue,i.glowSat,1),1)),Kt.uGlowR.value=e,Kt.uGlowPower.value=i.glowPower}const Sc=`
uniform vec3 uAmb, uMoon, uMoonDir, uMoonBeam, uGlowPos, uGlowRgb;
uniform float uBands, uDither, uShafts, uShaftScale, uGlowR, uGlowPower;

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
`,ni=2,Ct=32,ri=8,g_=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`,__=`
uniform sampler2D uAreas;
uniform vec4 uExtent; // minX, minZ, width, depth (metres)
uniform float uPixel; // metres per art pixel
uniform vec3 uTypeFloor[32];      // each type's floor colour (hsv), until its tile is drawn
uniform float uFloorReady[32];
uniform sampler2D uFloors;        // every type's floor tile, FLOOR_COLS to a row
uniform vec2 uTile, uFloorsSize;  // one tile's size and the atlas's, in art pixels
uniform float uSat;
uniform vec3 uFloor; // dancefloor x, z, radius
varying vec3 vWorld;
${Sc}
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
    vec2 cell = vec2(mod(float(t), ${ri}.0), floor(float(t) / ${ri}.0));
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
  gl_FragColor = vec4(min(vec3(1.0), c * nightLight(vec3(0.0, 1.0, 0.0), vWorld) * 1.25), 1.0);
}
`;class x_{constructor(e,t,n){this.map=e;const r=e.extent,s=r.maxX-r.minX,a=r.maxZ-r.minZ,c=Math.ceil(s*ni/Ct)*Ct,l=Math.ceil(a*ni/Ct)*Ct;this.tilesX=c/Ct,this.tilesZ=l/Ct,this.filled=new Uint8Array(this.tilesX*this.tilesZ);const o=f=>(f.magFilter=f.minFilter=Tt,f.generateMipmaps=!1,f.colorSpace=cn,f.needsUpdate=!0,f);this.texture=o(new Di(new Uint8Array(c*l*4),c,l)),o(this.tile),this.floors=o(new Di(new Uint8Array(64*ri*48*4*4),64*ri,192));const h=Array.from({length:32},(f,g)=>new W(...Kn[g]?.floor??[.25,.45,.4])),d=new Wt({vertexShader:g_,fragmentShader:__,uniforms:{...Kt,uAreas:{value:this.texture},uExtent:{value:new xt(r.minX,r.minZ,c/ni,l/ni)},uPixel:{value:n},uTypeFloor:{value:h},uFloorReady:{value:this.floorReady},uFloors:{value:this.floors},uTile:{value:new He(64,48)},uFloorsSize:{value:new He(64*ri,192)},uSat:{value:t.sat},uFloor:{value:new W(e.dancefloor.x,e.dancefloor.z,e.dancefloor.radius)}}}),u=new Zn(s+400,a+400);u.rotateX(-Math.PI/2),this.mesh=new Jt(u,d),this.mesh.position.set((r.minX+r.maxX)/2,0,(r.minZ+r.maxZ)/2)}map;mesh;texture;tile=new Di(new Uint8Array(Ct*Ct*4),Ct,Ct);filled;tilesX;tilesZ;initialised=!1;floorReady=new Array(32).fill(0);floors;pendingFloors=[];setFloor(e,t){this.pendingFloors.push([e,t])}placeFloors(e){for(const[t,n]of this.pendingFloors){const r=this.mesh.material,s=r.uniforms.uTile.value;if(n.w!==s.x||n.h!==s.y)continue;const a=new Di(n.albedo,n.w,n.h);a.needsUpdate=!0,e.copyTextureToTexture(a,this.floors,null,new He(t%ri*n.w,Math.floor(t/ri)*n.h)),a.dispose(),this.floorReady[t]=1}this.pendingFloors=[]}fill(e,t,n,r,s){this.initialised||(e.initTexture(this.texture),e.initTexture(this.floors),this.initialised=!0),this.pendingFloors.length&&this.placeFloors(e);const a=this.map.extent,c=Ct/ni,l=(t-a.minX)/c,o=(n-a.minZ)/c,h=Math.ceil(r/c),d=[];for(let g=Math.max(0,Math.floor(o)-h);g<=Math.min(this.tilesZ-1,Math.floor(o)+h);g++)for(let _=Math.max(0,Math.floor(l)-h);_<=Math.min(this.tilesX-1,Math.floor(l)+h);_++)this.filled[g*this.tilesX+_]||d.push([_,g,(_+.5-l)**2+(g+.5-o)**2]);d.sort((g,_)=>g[2]-_[2]);const u=performance.now();let f=0;for(const[g,_]of d){if(f>0&&performance.now()-u>s)break;this.fillTile(e,g,_),f++}return d.length-f}fillTile(e,t,n){const r=this.map.extent,s=this.tile.image.data;for(let a=0;a<Ct;a++)for(let c=0;c<Ct;c++){const l=r.minX+(t*Ct+c+.5)/ni,o=r.minZ+(n*Ct+a+.5)/ni,h=this.map.areaAt(l,o),d=(a*Ct+c)*4;s[d]=h.type,s[d+1]=Math.round(h.openness*255),s[d+2]=0,s[d+3]=255}this.tile.needsUpdate=!0,e.copyTextureToTexture(this.tile,this.texture,null,new He(t*Ct,n*Ct)),this.filled[n*this.tilesX+t]=1}dispose(){this.texture.dispose(),this.tile.dispose(),this.mesh.geometry.dispose(),this.mesh.material.dispose()}}const v_="varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",M_=`
uniform sampler2D uScene; uniform float uThreshold; varying vec2 vUv;
void main() {
  vec3 c = texture2D(uScene, vUv).rgb;
  float l = max(c.r, max(c.g, c.b));
  gl_FragColor = vec4(c * smoothstep(uThreshold, uThreshold + 0.25, l), 1.0);
}`,S_=`
uniform sampler2D uSrc; uniform vec2 uStep; varying vec2 vUv;
void main() {
  vec3 c = texture2D(uSrc, vUv).rgb * 0.227;
  c += (texture2D(uSrc, vUv + uStep * 1.38).rgb + texture2D(uSrc, vUv - uStep * 1.38).rgb) * 0.316;
  c += (texture2D(uSrc, vUv + uStep * 3.23).rgb + texture2D(uSrc, vUv - uStep * 3.23).rgb) * 0.070;
  gl_FragColor = vec4(c, 1.0);
}`,b_=`
uniform sampler2D uScene, uBloom; uniform vec2 uLow; uniform float uBloomStrength; varying vec2 vUv;
void main() {
  vec2 p = (floor(vUv * uLow) + 0.5) / uLow;
  vec3 c = texture2D(uScene, p).rgb + texture2D(uBloom, vUv).rgb * uBloomStrength;
  gl_FragColor = vec4(min(c, vec3(1.0)), 1.0);
}`,E_=`
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
}`;function nr(i,e,t,n=!1){const r=new rn(Math.max(1,i),Math.max(1,e),{minFilter:t,magFilter:t,depthBuffer:n,generateMipmaps:!1});return r.texture.colorSpace=cn,r}class y_{constructor(e,t){this.renderer=e,this.tuning=t,this.scene=nr(1,1,bt,!0);const n=(r,s)=>new Wt({vertexShader:v_,fragmentShader:r,uniforms:s,depthTest:!1,depthWrite:!1});this.mats={bright:n(M_,{uScene:{value:null},uThreshold:{value:.6}}),blur:n(S_,{uSrc:{value:null},uStep:{value:new He}}),composite:n(b_,{uScene:{value:null},uBloom:{value:null},uLow:{value:new He},uBloomStrength:{value:0}}),tilt:n(E_,{uSrc:{value:null},uTexel:{value:new He},uDir:{value:new He},uStrength:{value:0},uBand:{value:.4},uCentre:{value:.5}})},this.quad=new Jt(new Zn(2,2),this.mats.composite),this.quad.frustumCulled=!1}renderer;tuning;scene;bright=nr(1,1,bt);bloomB=nr(1,1,bt);a=nr(1,1,bt);b=nr(1,1,bt);quad;cam=new ao(-1,1,1,-1,0,1);mats;low=new He(1,1);out=new He(1,1);get fullResolution(){return this.tuning.tiltShift.on&&this.tuning.tiltShift.where==="after"}resize(e,t,n,r){this.low.set(e,t),this.out.set(n,r),this.scene.setSize(e,t);const s=Math.max(1,Math.round(e/2)),a=Math.max(1,Math.round(t/2));this.bright.setSize(s,a),this.bloomB.setSize(s,a);const c=this.fullResolution?n:e,l=this.fullResolution?r:t;this.a.setSize(c,l),this.b.setSize(c,l)}pass(e,t,n){const r=this.mats[e];n(r.uniforms),this.quad.material=r,this.renderer.setRenderTarget(t),this.renderer.render(this.quad,this.cam)}render(e,t){const n=this.renderer,r=this.tuning;n.setRenderTarget(this.scene),n.render(e,t);const s=r.bloom.on&&r.bloom.strength>0;if(s){const d=this.bright.width,u=this.bright.height;this.pass("bright",this.bright,f=>{f.uScene.value=this.scene.texture,f.uThreshold.value=r.bloom.threshold});for(let f=0;f<2;f++)this.pass("blur",this.bloomB,g=>{g.uSrc.value=this.bright.texture,g.uStep.value.set(1/d,0)}),this.pass("blur",this.bright,g=>{g.uSrc.value=this.bloomB.texture,g.uStep.value.set(0,1/u)})}const a=r.tiltShift.on&&r.tiltShift.strength>0;if(this.pass("composite",a?this.a:null,d=>{d.uScene.value=this.scene.texture,d.uBloom.value=this.bright.texture,d.uLow.value.copy(this.low),d.uBloomStrength.value=s?r.bloom.strength:0}),!a)return;const c=this.a.width,l=this.a.height,o=this.fullResolution?this.out.y/this.low.y:1,h=d=>{d.uTexel.value.set(1/c,1/l),d.uStrength.value=r.tiltShift.strength*o,d.uBand.value=r.tiltShift.band,d.uCentre.value=1-r.tiltShift.centre};this.pass("tilt",this.b,d=>{h(d),d.uSrc.value=this.a.texture,d.uDir.value.set(1,0)}),this.pass("tilt",null,d=>{h(d),d.uSrc.value=this.b.texture,d.uDir.value.set(0,1)})}}const Ci={uRight:{value:new W(1,0,0)},uUp:{value:new W(0,1,0)},uFacing:{value:new W(0,0,1)},uTopFade:{value:0}},w_=`
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
`,T_=`
uniform sampler2D uAlbedo, uNormal;
uniform vec3 uRight, uUp, uFacing;
uniform float uTopFade, uUnlit;
varying vec2 vUv;
varying vec3 vWorld;
varying vec2 vFlags;
${Sc}
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
  if (uUnlit > 0.5 || a.a < 0.999) { gl_FragColor = vec4(a.rgb, 1.0); return; }
  vec4 n = texture2D(uNormal, vUv);
  float nx = (n.r * 255.0 - 128.0) / 127.0, ny = (n.g * 255.0 - 128.0) / 127.0, nz = n.b;
  if (vFlags.x > 0.5) nx = -nx;
  vec3 N = normalize(uRight * nx - uUp * ny + uFacing * nz);
  gl_FragColor = vec4(min(vec3(1.0), a.rgb * nightLight(N, vWorld) * 1.25), 1.0);
}
`;class Xr{constructor(e,t,n={}){this.atlas=e,this.metresPerPixel=t;const r=new Zn(1,1);r.translate(0,.5,0),this.geo=new Ld,this.geo.index=r.index,this.geo.setAttribute("position",r.getAttribute("position")),this.geo.setAttribute("uv",r.getAttribute("uv")),this.pos=this.size=this.uvs=this.flags=void 0,this.grow(64);const s=new Wt({vertexShader:w_,fragmentShader:T_,uniforms:{...Kt,...Ci,uAlbedo:{value:e.albedo},uNormal:{value:e.normal},uUnlit:{value:n.unlit?1:0}},depthTest:!n.onTop,depthWrite:!n.onTop});this.mesh=new Jt(this.geo,s),this.mesh.frustumCulled=!1,n.onTop&&(this.mesh.renderOrder=10)}atlas;metresPerPixel;mesh;geo;pos;size;uvs;flags;capacity=0;count=0;grow(e){const t=Math.max(e,this.capacity*2),n=(r,s)=>{const a=new Sd(new Float32Array(t*r),r);return a.setUsage(qh),s&&a.array.set(s.array),a};this.pos=n(3,this.pos),this.size=n(2,this.size),this.uvs=n(4,this.uvs),this.flags=n(2,this.flags),this.geo.setAttribute("iPos",this.pos),this.geo.setAttribute("iSize",this.size),this.geo.setAttribute("iUv",this.uvs),this.geo.setAttribute("iFlags",this.flags),this.capacity=t}set(e){e.length>this.capacity&&this.grow(e.length);const t=this.pos.array,n=this.size.array,r=this.uvs.array,s=this.flags.array;e.forEach((a,c)=>{t[c*3]=a.x,t[c*3+1]=a.y,t[c*3+2]=a.z,n[c*2]=a.frame.w*this.metresPerPixel,n[c*2+1]=a.frame.h*this.metresPerPixel,r.set(a.frame.uv,c*4),s[c*2]=a.flip?1:0,s[c*2+1]=a.top?1:0});for(const a of[this.pos,this.size,this.uvs,this.flags])a.needsUpdate=!0;this.count=e.length,this.geo.instanceCount=e.length,this.mesh.visible=e.length>0}dispose(){this.geo.dispose(),this.mesh.material.dispose(),this.atlas.albedo.dispose(),this.atlas.normal.dispose()}}class A_{constructor(e,t,n){this.canvas=e,this.game=t,this.style=n;const r=t.tuning;this.renderer=new Dg({canvas:e,antialias:!1,powerPreference:"high-performance",preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.info.autoReset=!1,this.renderer.outputColorSpace=hr,this.mpp=1/(r.artPixelsPerMetre*(2/r.pixelSize)),this.camera=new tn(r.camera.fov,1,1,900),this.post=new y_(this.renderer,r),this.scene.background=new at(723478),m_(n,r.glowReach,this.mpp),this.assets=new p_(n,t.seed,r.pixelSize),this.ground=new x_(t.map,n,this.mpp),this.assets.onFloor=(l,o)=>this.ground.setFloor(l,o),this.scene.add(this.ground.mesh),this.witchBatch=new Xr(this.assets.witch,this.mpp,{unlit:!0,onTop:!0}),this.scene.add(this.witchBatch.mesh),this.stoneBatch=new Xr(this.assets.stones,this.mpp),this.scene.add(this.stoneBatch.mesh);const s=t.map.dancefloor,a=[];for(let l=0;l<9;l++){const o=l/9*Math.PI*2+.3;a.push({x:s.x+Math.cos(o)*s.radius,y:0,z:s.z+Math.sin(o)*s.radius,frame:this.assets.stones.frames[l%4],flip:l%2===0})}this.stoneBatch.set(a);const c=new Wt({transparent:!1,depthWrite:!1,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"varying vec2 vUv; void main(){ vec2 p = vUv * 2.0 - 1.0; if (dot(p, p) > 1.0 || mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0) > 0.5) discard; gl_FragColor = vec4(0.02, 0.02, 0.05, 1.0); }"});this.shadow=new Jt(new Zn(1.4,.7).rotateX(-Math.PI/2),c),this.shadow.renderOrder=1,this.scene.add(this.shadow)}canvas;game;style;renderer;scene=new dd;camera;ground;assets;typeBatches=new Map;creatureBatches=new Map;witchBatch;stoneBatch;shadow;mpp;lastBuild={x:1/0,z:1/0,version:-1};prefetch=!1;post;width=1;height=1;stats={trees:0,bushes:0,creatures:0,batches:0,drawCalls:0,pendingArt:0,pendingGround:0};resize(e,t){const n=this.game.tuning.pixelSize;this.width=Math.max(1,Math.ceil(e/n)),this.height=Math.max(1,Math.ceil(t/n));const r=this.post.fullResolution?n:1;this.renderer.setSize(this.width*r,this.height*r,!1),this.post.resize(this.width,this.height,this.width*r,this.height*r),this.canvas.style.width=this.width*n+"px",this.canvas.style.height=this.height*n+"px",this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix()}async prepare(){this.refresh(!0),this.drawCreatures(),this.ground.fill(this.renderer,this.game.witch.x,this.game.witch.z,50,1/0),await this.assets.whenIdle(),this.prefetch=!0,this.refresh(!0)}batchFor(e,t,n){let r=e.get(t);return r||(r=n(),r&&(e.set(t,r),this.scene.add(r.mesh))),r}refresh(e=!1){const t=this.game,n=t.camera,r=t.tuning.drawRadius,s=n.tx,a=n.tz-r*.25;if(!e&&Math.hypot(s-this.lastBuild.x,a-this.lastBuild.z)<6&&this.assets.version===this.lastBuild.version)return;this.lastBuild={x:s,z:a,version:this.assets.version};const c=new Map,l=(v,b)=>{let M=c.get(v);M||c.set(v,M=[]),M.push(b)},o=t.map.areaSize,h=r+o*1.5;if(this.prefetch)for(let v=Math.floor((a-h)/o);v<=Math.floor((a+h)/o);v++)for(let b=Math.floor((s-h)/o);b<=Math.floor((s+h)/o);b++)this.assets.prefetchType(t.map.typeOf(b,v));const d=t.forest.treesNear(s,a,r),u=t.forest.bushesNear(s,a,r*.8),f=t.forest.wallsNear(s,a,r*.8),g=t.forest.setPiecesNear(s,a,r);let _=0,p=0;for(const v of d){const b=this.assets.typeArt(v.type);if(!b||!b.layout.big.length)continue;const M=b.atlas.frames,y=b.layout.big[v.variant%b.layout.big.length];l(v.type,{x:v.x,y:0,z:v.z,frame:M[y.bot],flip:v.flip}),y.top!==null&&l(v.type,{x:v.x,y:0,z:v.z,frame:M[y.top],flip:v.flip,top:!0}),_++}const m=(v,b)=>{for(const M of v){const y=this.assets.typeArt(M.type);if(!y)continue;const T=b(y.layout);T.length&&(l(M.type,{x:M.x,y:0,z:M.z,frame:y.atlas.frames[T[M.variant%T.length]],flip:M.flip}),p++)}};m(u,v=>v.small),m(f,v=>v.walls),m(g,v=>v.set===null?[]:[v.set]);for(const[v,b]of this.typeBatches)c.has(v)||b.set([]);for(const[v,b]of c)this.batchFor(this.typeBatches,v,()=>{const y=this.assets.typeArt(v);return y&&new Xr(y.atlas,this.mpp)})?.set(b);this.stats.trees=_,this.stats.bushes=p}drawCreatures(){const e=this.game,t=e.camera,n=e.tuning.drawRadius,r=new Map;let s=0;for(const a of e.creatures){if(Math.abs(a.x-t.tx)>n||Math.abs(a.z-t.tz)>n)continue;const c=this.assets.creatureArt(a.species);if(!c)continue;const l=c.atlas.frames[c.frame(a.level,a.moving?Math.floor(a.walk)%2:0)];let o=r.get(a.species);o||r.set(a.species,o=[]),o.push({x:a.x,y:0,z:a.z,frame:l,flip:a.facing<0}),s++}for(const[a,c]of this.creatureBatches)r.has(a)||c.set([]);for(const[a,c]of r)this.batchFor(this.creatureBatches,a,()=>{const o=this.assets.creatureArt(a);return o&&new Xr(o.atlas,this.mpp)})?.set(c);this.stats.creatures=s}render(e){const t=this.game,n=t.tuning,r=mu(t),s=r.angle*Math.PI/180,a=2*r.distance*Math.tan(n.camera.fov*Math.PI/360)/this.height,c=new W(0,Math.cos(s),-Math.sin(s)),l=new W(r.tx,r.ty,r.tz),o=l.dot(c),h=l.x;l.addScaledVector(c,Math.round(o/a)*a-o),l.x+=Math.round(h/a)*a-h;const d=new W(0,Math.sin(s),Math.cos(s)).multiplyScalar(r.distance);this.camera.position.copy(l).add(d),this.camera.up.set(0,1,0),this.camera.lookAt(l);const u=n.spriteTilt;Ci.uUp.value.set(0,1,0).lerp(c,u).normalize(),Ci.uFacing.value.crossVectors(Ci.uRight.value,Ci.uUp.value).normalize(),Ci.uTopFade.value=bo(t.witch);const f=t.witch,g=Ka(f,n);Kt.uGlowPos.value.set(f.x,g+n.glowHeight,f.z);const _=Math.sin(e*2.4)*.12;this.witchBatch.set([{x:f.x,y:g+_-.4,z:f.z,frame:this.assets.witch.frames[0],flip:f.facing<0}]),this.shadow.position.set(f.x,.03,f.z),this.shadow.scale.setScalar(1-.5*bo(f)),this.refresh(),this.drawCreatures(),this.assets.work(6),this.stats.pendingGround=this.ground.fill(this.renderer,r.tx,r.tz-10,n.drawRadius+20,3),this.stats.pendingArt=this.assets.pending,this.renderer.info.reset(),this.post.render(this.scene,this.camera),this.stats.drawCalls=this.renderer.info.render.calls,this.stats.batches=this.typeBatches.size+this.creatureBatches.size}}const B_="The art style: knobs from the Witch Art Lab. Paste a style saved in the Lab here (its whole saved JSON, or just its style object). Any knob left out follows the Lab's current default, so an empty style means the Lab's default look, and stays up to date as the art changes.",R_="Lab default",C_={},L_={_readme:B_,name:R_,style:C_};function D_(i=L_){const e=i??{},t=e.style&&typeof e.style=="object"?e.style:e,n=s_();for(const[r,s]of Object.entries(t))r in n&&(n[r]=s);return n}function P_(i,e){const t=i.querySelector("#stick"),n=t.querySelector(".knob"),r=56;let s=null,a=0,c=0;const l=()=>i.classList.add("touch"),o=i.querySelector("#stick-zone");o.addEventListener("pointerdown",u=>{if(!(u.pointerType==="mouse"||s!==null)){l(),s=u.pointerId,a=u.clientX,c=u.clientY,t.style.left=a+"px",t.style.top=c+"px",t.classList.add("on");try{o.setPointerCapture(u.pointerId)}catch{}u.preventDefault()}}),o.addEventListener("pointermove",u=>{if(u.pointerId!==s)return;let f=u.clientX-a,g=u.clientY-c;const _=Math.hypot(f,g);_>r&&(f*=r/_,g*=r/_),n.style.transform=`translate(${f}px, ${g}px)`;const p=Math.min(1,_/r),m=.15,v=p<m?0:(p-m)/(1-m)/Math.max(1e-6,p);e.x=f/r*v,e.y=g/r*v});const h=u=>{u.pointerId===s&&(s=null,e.x=0,e.y=0,n.style.transform="",t.classList.remove("on"))};o.addEventListener("pointerup",h),o.addEventListener("pointercancel",h);const d=(u,f)=>{const g=i.querySelector(u);g.addEventListener("pointerdown",_=>{_.preventDefault(),_.stopPropagation(),f(),g.classList.add("down")}),g.addEventListener("pointerup",()=>g.classList.remove("down")),g.addEventListener("pointerleave",()=>g.classList.remove("down"))};d("#rise",()=>e.toggle=!0),d("#zoom-in",()=>e.zoom-=1),d("#zoom-out",()=>e.zoom+=1),window.addEventListener("touchstart",u=>{l(),u.touches.length===3&&(e.debug=!0)},{passive:!0})}const Xi=new URLSearchParams(location.search);let oi=Jc(Xi.get("seed"));oi===null&&(oi=Math.floor(Math.random()*1e6),Xi.set("seed",String(oi)),history.replaceState(null,"","?"+Xi.toString()+location.hash));const Fi={...vs,bloom:{...vs.bloom},tiltShift:{...vs.tiltShift}},Yr=Xi.get("tilt");Yr==="off"?Fi.tiltShift.on=!1:(Yr==="before"||Yr==="after")&&(Fi.tiltShift.on=!0,Fi.tiltShift.where=Yr);Xi.get("bloom")==="off"&&(Fi.bloom.on=!1);const Dn=fu(oi,Fi),I_=document.getElementById("game"),pr=new A_(I_,Dn,{...D_(),pixel:Fi.pixelSize}),ms=new dh;P_(document.body,ms.touch);const N_=document.getElementById("seed");N_.innerHTML=`seed <a href="?seed=${oi}">${oi}</a>`;const Va=document.getElementById("debug"),oo=document.getElementById("start");let sr=Xi.has("debug");Va.classList.toggle("on",sr);const bc=()=>pr.resize(window.innerWidth,window.innerHeight);window.addEventListener("resize",bc);bc();let gs=!1;requestAnimationFrame(()=>setTimeout(async()=>{await pr.prepare(),gs=!0,oo.classList.remove("loading")},0));let Ml=null;function Ec(){if(!gs||!Dn.clock.paused)return!1;try{Ml??=new AudioContext,Ml.resume()}catch{}return Dn.clock.paused=!1,oo.style.display="none",ms.clearPresses(),!0}ms.onAny=Ec;oo.addEventListener("pointerdown",i=>{i.preventDefault(),Ec()});document.addEventListener("visibilitychange",()=>{document.hidden&&(ts=0)});let ts=0,Sl=60,js=0,qr=0;function yc(i){requestAnimationFrame(yc);const e=ts?(i-ts)/1e3:0;ts=i,js++,qr+=e,qr>=.5&&(Sl=js/qr,js=0,qr=0);const t=ms.read();if(t.debug&&(sr=!sr,Va.classList.toggle("on",sr)),pu(Dn,t,e),!!gs&&(pr.render(i/1e3),sr)){const n=Dn.witch,r=pr.stats;Va.textContent=[`fps    ${Sl.toFixed(0)}`,`seed   ${oi}`,`area   ${Rl(Dn)}`,`mode   ${n.mode}`,`at     ${n.x.toFixed(0)}, ${n.z.toFixed(0)} m   zoom ${Dn.camera.zoomStep}`,`trees  ${r.trees}  bushes ${r.bushes}  creatures ${r.creatures}`,`draws  ${r.drawCalls}  art queued ${r.pendingArt}  ground tiles ${r.pendingGround}`].join(`
`)}}requestAnimationFrame(yc);window.witch={game:Dn,view:pr,areaUnderWitch:()=>Rl(Dn),get ready(){return gs}};
