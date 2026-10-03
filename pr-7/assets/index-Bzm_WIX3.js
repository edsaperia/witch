(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function t(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(r){if(r.ep)return;r.ep=!0;const a=t(r);fetch(r.href,a)}})();function br(n){let e=n>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function bt(n,e,t){let i=Math.imul(n|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return i=Math.imul(i^i>>>13,1274126177),((i^i>>>16)>>>0)/4294967296}function ko(n,e,t){const i=Math.floor(n),r=Math.floor(e),a=n-i,s=e-r,o=a*a*(3-2*a),c=s*s*(3-2*s),l=bt(i,r,t),h=bt(i+1,r,t),f=bt(i,r+1,t),u=bt(i+1,r+1,t);return l+(h-l)*o+(f-l)*c+(l-h-f+u)*o*c}const Mn=(n,e,t)=>n+(e-n)*t,Mi=(n,e,t)=>Math.min(t,Math.max(e,n)),nr=n=>{const e=Mi(n,0,1);return e*e*(3-2*e)};function eu(n,e,t,i){const r=Math.max(1,n.camera.zoomSteps),a=Mi(Math.round(n.camera.startZoom),0,r-1),s=r>1?a/(r-1):0;return{zoomStep:a,zoom:s,tx:e,ty:t,tz:i,vx:0,vy:0,vz:0,ax:0,az:0,lift:0}}function Na(n,e,t,i,r){const a=i*r,s=Math.exp(-a),o=n-t,c=e+i*o;return[t+(o+c*r)*s,(e-i*c*r)*s]}function tu(n,e,t,i,r,a,s){const o=s.camera,c=Math.max(1,o.zoomSteps),l=Mi(n.zoomStep+Math.sign(e),0,c-1),h=c>1?l/(c-1):0;let f=i.x*o.lookAhead,u=i.z*o.lookAhead;const d=Math.hypot(f,u);d>o.lookAheadMax&&(f*=o.lookAheadMax/d,u*=o.lookAheadMax/d);const g=1-Math.exp(-o.lookAheadEase*a),_=n.ax+(f-n.ax)*g,m=n.az+(u-n.az)*g,[p,M]=Na(n.tx,n.vx,t.x+_,o.follow,a),[y,b]=Na(n.ty,n.vy,t.y,o.follow,a),[A,w]=Na(n.tz,n.vz,t.z+m,o.follow,a),C=n.zoom+(h-n.zoom)*(1-Math.exp(-o.zoomEase*a)),S=n.lift+(r-n.lift)*(1-Math.exp(-o.liftEase*a));return{zoomStep:l,zoom:C,tx:p,ty:y,tz:A,vx:M,vy:b,vz:w,ax:_,az:m,lift:Mi(S,0,1)}}function nu(n,e,t){const i=t.camera.ground,r=t.camera.treetop,a=nr(e),s=Mn(Mn(i.angleIn,i.angleOut,n.zoom),Mn(r.angleIn,r.angleOut,n.zoom),a),o=Mn(Mn(i.distanceIn,i.distanceOut,n.zoom),Mn(r.distanceIn,r.distanceOut,n.zoom),a),c=s*Math.PI/180;return{angle:s,distance:o,x:n.tx,y:n.ty+Math.sin(c)*o,z:n.tz+Math.cos(c)*o,tx:n.tx,ty:n.ty,tz:n.tz}}const iu=.1,ru=()=>({time:0,paused:!0});function au(n,e){if(n.paused||!(e>0))return 0;const t=Math.min(iu,e);return n.time+=t,t}const su={moor:{treeDensity:.4},"fern-forest":{treeDensity:1},"muddy-forest":{treeDensity:1},"stone-shrine":{treeDensity:.3},"tangly-forest":{treeDensity:1},"wispy-forest":{treeDensity:1},"hazel-forest":{treeDensity:1},garden:{treeDensity:.6},"twiggy-forest":{treeDensity:1},ancient:{treeDensity:.9},norway:{treeDensity:1},"alder-forest":{treeDensity:.9},meadow:{treeDensity:.2},"old-oaks":{treeDensity:.9},"berry-thicket":{treeDensity:1},wetland:{treeDensity:.6},stream:{treeDensity:.7},"rocky-slope":{treeDensity:.6},bog:{treeDensity:.5},deadwood:{treeDensity:.8},"cave-mouth":{treeDensity:.6},grassland:{treeDensity:.2},"beaver-pond":{treeDensity:.8},"log-pile":{treeDensity:.7},heath:{treeDensity:.4},"old-pinewood":{treeDensity:1},ravine:{treeDensity:.6},"bluebell-glade":{treeDensity:.8},"holly-thicket":{treeDensity:1},"honeysuckle-tangle":{treeDensity:1}},ou={types:su};function Xl(n,e){if(typeof document<"u"){const t=document.createElement("canvas");return t.width=n,t.height=e,t}return new OffscreenCanvas(n,e)}function so(n){let e=n>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}const Se=(n,e,t)=>e+(t-e)*n(),Yl=(n,e)=>e[Math.floor(n()*e.length)];function Zt(n,e,t){let i=Math.imul(n|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return i=Math.imul(i^i>>>13,1274126177),((i^i>>>16)>>>0)/4294967296}function ii(n,e,t){const i=Math.floor(n),r=Math.floor(e),a=n-i,s=e-r,o=a*a*(3-2*a),c=s*s*(3-2*s),l=Zt(i,r,t),h=Zt(i+1,r,t),f=Zt(i,r+1,t),u=Zt(i+1,r+1,t);return l+(h-l)*o+(f-l)*c+(l-h-f+u)*o*c}function ye(n,e,t){n=(n%1+1)%1,e=Math.max(0,Math.min(1,e)),t=Math.max(0,Math.min(1,t));const i=Math.floor(n*6),r=n*6-i,a=t*(1-e),s=t*(1-r*e),o=t*(1-(1-r)*e),[c,l,h]=[[t,o,a],[s,t,a],[a,t,o],[a,s,t],[o,a,t],[t,a,s]][i%6];return[Math.round(c*255),Math.round(l*255),Math.round(h*255)]}const x={BODY:1,BELLY:2,ACCENT:3,EYE:4,GLINT:5,TRUNK:6,LEAF:7,LEAF2:8,SKIN:10,HAIR:11,BROOM:12,STRAW:13,BODY2:14,BARK2:15,FLOWER:16,PUPIL:17,MAGIC:18,BARKD:19,LINE:20,IRIS:21,MAGIC2:22,NOSE:23,EAR:24,BODY3:25,LEAF3:26,BARKL:27,HAT:28,PHONES:29,TOP:30,JACKET:31,JEANS:32,SHOES:33,RUNE:39,GLOW:40},lu=new Set([x.GLINT,x.FLOWER,x.MAGIC,x.MAGIC2,x.RUNE,x.GLOW]);function Go(n,e=!0,t=8){const i=n.length,r=[];if(i<3)return n.slice();const a=o=>e?n[(o+i)%i]:n[Math.max(0,Math.min(i-1,o))],s=e?i:i-1;for(let o=0;o<s;o++){const c=a(o-1),l=a(o),h=a(o+1),f=a(o+2),u=Math.max(2,Math.ceil(Math.hypot(h[0]-l[0],h[1]-l[1])/1.5),t);for(let d=0;d<u;d++){const g=d/u,_=g*g,m=_*g;r.push([0,1].map(p=>.5*(2*l[p]+(-c[p]+h[p])*g+(2*c[p]-5*l[p]+4*h[p]-f[p])*_+(-c[p]+3*l[p]-3*h[p]+f[p])*m)))}}return e||r.push(n[i-1]),r}function cu(n,{cap:e=1,capEnd:t=e}={}){const i=[],r=[],a=n.length;for(let c=0;c<a;c++){const l=n[Math.max(0,c-1)],h=n[Math.min(a-1,c+1)];let f=h[0]-l[0],u=h[1]-l[1];const d=Math.hypot(f,u)||1;f/=d,u/=d;const g=n[c][2]/2;i.push([n[c][0]-u*g,n[c][1]+f*g]),r.push([n[c][0]+u*g,n[c][1]-f*g])}const s=(c,l,h,f)=>{let u=c[0]-l[0],d=c[1]-l[1];const g=Math.hypot(u,d)||1;return[c[0]+u/g*h/2*f,c[1]+d/g*h/2*f]};return[...i,s(n[a-1],n[a-2],n[a-1][2],t),...r.reverse(),s(n[0],n[1],n[0][2],e)]}const vt=(n,e)=>[n[0]+e[0],n[1]+e[1]],Gn=(n,e,t)=>[n[0]+(e[0]-n[0])*t,n[1]+(e[1]-n[1])*t];function Sa(n,e,t,i,r,a=1){const s=[];for(let o=0;o<n.length;o++){if(s.push(n[o]),o<e||o>=t)continue;const c=n[o],l=n[(o+1)%n.length];let h=l[0]-c[0],f=l[1]-c[1];const u=Math.hypot(h,f)||1,d=f/u*a,g=-h/u*a;for(let _=1;_<=i;_++){const m=(_-.5)/i,p=Gn(c,l,m),M=[p[0]+d*r-h/u*r*.5,p[1]+g*r-f/u*r*.5];s.push(Gn(c,l,m-.45/i),M,Gn(c,l,m+.35/i))}}return s}function Ho(n,e,t){const i=new Uint8Array(n*e);let r=1/0,a=-1/0;for(const s of t)r=Math.min(r,s[1]),a=Math.max(a,s[1]);for(let s=Math.max(0,Math.floor(r));s<=Math.min(e-1,Math.ceil(a));s++){const o=s+.5,c=[];for(let l=0,h=t.length-1;l<t.length;h=l++){const[f,u]=t[l],[d,g]=t[h];u>o!=g>o&&c.push(f+(o-u)/(g-u)*(d-f))}c.sort((l,h)=>l-h);for(let l=0;l+1<c.length;l+=2)for(let h=Math.max(0,Math.ceil(c[l]-.5));h<=Math.min(n-1,Math.floor(c[l+1]-.5));h++)i[s*n+h]=1}return i}function uu(n,e,t){const r=new Float32Array(n*e),a=new Float32Array(n*e);for(let c=0;c<n*e;c++)t[c]&&(r[c]=1e4,a[c]=1e4);const s=c=>r[c]*r[c]+a[c]*a[c],o=(c,l,h,f,u)=>{const d=l+f,g=h+u;let _,m;if(d<0||g<0||d>=n||g>=e)_=f,m=u;else{const p=g*n+d;_=r[p]+f,m=a[p]+u}_*_+m*m<s(c)&&(r[c]=_,a[c]=m)};for(let c=0;c<e;c++){for(let l=0;l<n;l++){const h=c*n+l;t[h]&&(o(h,l,c,-1,0),o(h,l,c,0,-1),o(h,l,c,-1,-1),o(h,l,c,1,-1))}for(let l=n-1;l>=0;l--){const h=c*n+l;t[h]&&o(h,l,c,1,0)}}for(let c=e-1;c>=0;c--){for(let l=n-1;l>=0;l--){const h=c*n+l;t[h]&&(o(h,l,c,1,0),o(h,l,c,0,1),o(h,l,c,1,1),o(h,l,c,-1,1))}for(let l=0;l<n;l++){const h=c*n+l;t[h]&&o(h,l,c,-1,0)}}return{vx:r,vy:a}}class Jt{constructor(e,t,i=1){this.sx=i,this.w=Math.round(e*i),this.h=t|0,this.m=new Uint8Array(this.w*this.h),this.n=new Float32Array(this.w*this.h*3),this.g=new Uint8Array(this.w*this.h)}inb(e,t){return e>=0&&t>=0&&e<this.w&&t<this.h}get(e,t){return e|=0,t|=0,this.inb(e,t)?this.m[t*this.w+e]:0}put(e,t,i,r=0,a=0,s=1){this.px(e*this.sx,t,i,r,a,s)}px(e,t,i,r=0,a=0,s=1){if(e=Math.floor(e),t=Math.floor(t),!this.inb(e,t))return;const o=t*this.w+e;this.m[o]=i,this.n[o*3]=r,this.n[o*3+1]=a,this.n[o*3+2]=s}recolour(e,t,i){e=Math.floor(e),t=Math.floor(t),this.inb(e,t)&&this.m[t*this.w+e]&&(this.m[t*this.w+e]=i)}ellipse(e,t,i,r,a,s={}){const{onlyOn:o,density:c=1,noise:l=0,seed:h=0,round:f=1}=s;e*=this.sx,i*=this.sx;for(let u=Math.max(0,Math.floor(t-r-1));u<Math.min(this.h,t+r+1);u++)for(let d=Math.max(0,Math.floor(e-i-1));d<Math.min(this.w,e+i+1);d++){const g=(d+.5-e)/i,_=(u+.5-t)/r,m=g*g+_*_;if(m>1)continue;const p=u*this.w+d;if(o&&!o.has(this.m[p]))continue;if(c<1){const A=l?ii(d/3.2,u/3.2,h)*l+(1-l)*.5:.5;if(Zt(d,u,h+77)>c*(.4+A*1.2)*(1.15-m*.5))continue}const M=g*f,y=_*f,b=Math.hypot(M,y,Math.sqrt(Math.max(0,1-m))+.15);this.px(d,u,a,M/b,y/b,(Math.sqrt(Math.max(0,1-m))+.15)/b)}}line(e,t,i,r,a,s,o,c=1){e*=this.sx,i*=this.sx;const l=Math.max(1,Math.ceil(Math.hypot(i-e,r-t)));for(let h=0;h<=l;h++){const f=h/l,u=e+(i-e)*f,d=t+(r-t)*f,g=Math.max(.5,(a+(s-a)*f)/2);for(let _=Math.floor(d-g);_<=d+g;_++)for(let m=Math.floor(u-g);m<=u+g;m++){const p=(m+.5-u)/g,M=(_+.5-d)/g;if(p*p+M*M>1)continue;const y=p*c,b=Math.hypot(y,M*.3,1);this.px(m,_,o,y/b,M*.3/b,1/b)}}}tri(e,t){let[[i,r],[a,s],[o,c]]=e;i*=this.sx,a*=this.sx,o*=this.sx;const l=(g,_,m,p,M,y)=>(g-M)*(p-y)-(m-M)*(_-y),h=Math.max(0,Math.floor(Math.min(i,a,o))),f=Math.min(this.w,Math.ceil(Math.max(i,a,o))),u=Math.max(0,Math.floor(Math.min(r,s,c))),d=Math.min(this.h,Math.ceil(Math.max(r,s,c)));for(let g=u;g<d;g++)for(let _=h;_<f;_++){const m=_+.5,p=g+.5,M=l(m,p,i,r,a,s),y=l(m,p,a,s,o,c),b=l(m,p,o,c,i,r);(M<0||y<0||b<0)&&(M>0||y>0||b>0)||this.px(_,g,t,0,-.2,.98)}}shape(e,t,i={}){return this.fillMask(Ho(this.w,this.h,Go(e,!0,i.per||6)),t,i)}limb(e,t,i={}){return this.shape(cu(e,i),t,i)}fillMask(e,t,{group:i=1,line:r=!1,depth:a=0,round:s=1,onlyOn:o=null,keepNormals:c=!1,tilt:l=[0,0],lineMat:h=x.LINE}={}){const{w:f,h:u}=this;if(o)for(let m=0;m<f*u;m++)e[m]&&!o.has(this.m[m])&&(e[m]=0);const{vx:d,vy:g}=uu(f,u,e);let _=a;if(!_){for(let m=0;m<f*u;m++)e[m]&&(_=Math.max(_,Math.hypot(d[m],g[m])));_=Math.max(1.5,Math.min(_*.9,2.5+_*.35))}for(let m=0;m<u;m++)for(let p=0;p<f;p++){const M=m*f+p;if(!e[M])continue;if(c){this.m[M]=t;continue}const y=Math.hypot(d[M],g[M]),b=Math.min(1,Math.max(0,(y-.5)/_)),A=Math.min(2.6,(1-b)/Math.sqrt(Math.max(.02,1-(1-b)*(1-b))))*s;let w=d[M]/(y||1)*A+l[0],C=g[M]/(y||1)*A+l[1];const S=Math.hypot(w,C,1);this.m[M]=t,this.n[M*3]=w/S,this.n[M*3+1]=C/S,this.n[M*3+2]=1/S}if(r&&!c){const m=[];for(let p=0;p<u;p++)for(let M=0;M<f;M++){const y=p*f+M;if(e[y])for(const[b,A]of[[1,0],[-1,0],[0,1],[0,-1]]){const w=M+b,C=p+A;if(w<0||C<0||w>=f||C>=u)continue;const S=C*f+w;if(!e[S]&&this.m[S]&&this.g[S]!==i&&this.m[S]!==h){m.push(y);break}}}for(const p of m)this.m[p]=h}if(!c)for(let m=0;m<f*u;m++)e[m]&&(this.g[m]=i);return e}mark(e,t,i,r={}){return this.fillMask(Ho(this.w,this.h,Go(e,!0,6)),t,{...r,onlyOn:new Set(i),keepNormals:!0})}grid(e,t,i=0,r=0,{round:a=1,flipX:s=!1}={}){const o=Math.max(...e.map(h=>h.length)),c=new Uint8Array(this.w*this.h),l=new Map;e.forEach((h,f)=>[...h].forEach((u,d)=>{const g=t[u];if(!g)return;const _=i+(s?o-1-d:d),m=r+f;this.inb(_,m)&&(c[m*this.w+_]=1,l.set(m*this.w+_,g))})),this.fillMask(c,x.BODY,{round:a,depth:2.5});for(const[h,f]of l)this.m[h]=f}}function Ji(n,e,t,i=t.outline,r=Xl){const{w:a,h:s}=n,o=()=>r(a,s),c=o(),l=o(),h=o(),f=c.getContext("2d").createImageData(a,s),u=l.getContext("2d").createImageData(a,s),d=h.getContext("2d").createImageData(a,s),g=i==="none"?null:i==="dark"?[22,18,30]:"tint";for(let _=0;_<s;_++)for(let m=0;m<a;m++){const p=_*a+m,M=n.m[p],y=p*4;if(!M){if(!g)continue;const S=[n.get(m+1,_),n.get(m-1,_),n.get(m,_+1),n.get(m,_-1)].find(D=>D);if(!S)continue;const R=g==="tint"?(e[S]||[0,0,0]).map(D=>D*.35|0):g;f.data.set([...R,255],y),u.data.set([128,128,255,255],y),d.data.set([128,128,255,255],y);continue}let b=e[M];M===x.LINE&&!b&&(b=g==="tint"||!g?(e[x.BODY2]||[0,0,0]).map(S=>S*.55|0):g),b=b||[255,0,255],f.data.set([...b,lu.has(M)?254:255],y);const A=n.n[p*3],w=n.n[p*3+1],C=n.n[p*3+2];u.data.set([A*127+128,w*127+128,C*255,255],y),d.data.set([-A*127+128,w*127+128,C*255,255],y)}return c.getContext("2d").putImageData(f,0,0),l.getContext("2d").putImageData(u,0,0),h.getContext("2d").putImageData(d,0,0),{A:c,N:l,NF:h,w:a,h:s}}const ai=n=>{const e=Math.hypot(n[0],n[1],n[2])||1;return[n[0]/e,n[1]/e,n[2]/e]},Mr=(n,e)=>[n[1]*e[2]-n[2]*e[1],n[2]*e[0]-n[0]*e[2],n[0]*e[1]-n[1]*e[0]],Rt=(n,e)=>n[0]*e[0]+n[1]*e[1]+n[2]*e[2],ri=(n,e)=>[n[0]-e[0],n[1]-e[1],n[2]-e[2]],Q={add:(n,e)=>[n[0]+e[0],n[1]+e[1],n[2]+e[2]],sub:ri,mul:(n,e)=>[n[0]*e,n[1]*e,n[2]*e],lerp:(n,e,t)=>[n[0]+(e[0]-n[0])*t,n[1]+(e[1]-n[1])*t,n[2]+(e[2]-n[2])*t],norm:ai,cross:Mr,dot:Rt};function Vo(n,e=[0,1,0]){const t=ai(n);let i=Mr(e,t);Math.hypot(...i)<1e-4&&(i=Mr([0,0,1],t)),i=ai(i);const r=Mr(t,i);return[t,r,i]}function hu(n,e){const t=Rt(n,e.axes[0]),i=Rt(n,e.axes[1]),r=Rt(n,e.axes[2]),[a,s,o]=e.r,c=Math.hypot(t/a,i/s,r/o),l=Math.hypot(t/(a*a),i/(s*s),r/(o*o));return l>1e-9?c*(c-1)/l:-Math.min(a,s,o)}function fu(n,e){const{ba:t,l2:i,rr:r,a2:a,il2:s,r1:o,r2:c}=e,l=Rt(n,t),h=l-i,f=[n[0]*i-t[0]*l,n[1]*i-t[1]*l,n[2]*i-t[2]*l],u=Rt(f,f),d=l*l*i,g=h*h*i,_=Math.sign(r)*r*r*u;return Math.sign(h)*a*g>_?Math.sqrt(u+g)*s-c:Math.sign(l)*a*d<_?Math.sqrt(u+d)*s-o:(Math.sqrt(u*a*s)+l*r)*s-o}function du(n,e){const t=Math.abs(Rt(n,e.axes[0]))-e.h[0]+e.round,i=Math.abs(Rt(n,e.axes[1]))-e.h[1]+e.round,r=Math.abs(Rt(n,e.axes[2]))-e.h[2]+e.round;return Math.hypot(Math.max(t,0),Math.max(i,0),Math.max(r,0))+Math.min(Math.max(t,i,r),0)-e.round}const pu=(n,e)=>e*(Math.sin(n[0]*23+n[1]*7)*Math.sin(n[1]*19-n[2]*11)+.5*Math.sin(n[2]*41+n[0]*29)),Wo=(n,e)=>n.type==="ell"?hu(ri(e,n.cw),n):n.type==="box"?du(ri(e,n.cw),n):fu(ri(e,n.aw),n),sr=(n,e)=>n.rough?Wo(n,e)+pu(e,n.rough):Wo(n,e);class Mt{constructor({blend:e=.07}={}){this.parts=[],this.flats=[],this.blend=e}ell(e,t,i,r={}){const a=r.axes||(r.dir?Vo(r.dir,r.up):[[1,0,0],[0,1,0],[0,0,1]]);return this.parts.push({type:"ell",c:e,r:t,axes:a,mat:i,group:r.group??1,extra:!!r.extra,paint:r.paint,rough:r.rough,cut:!!r.cut}),this}box(e,t,i,r={}){const a=r.axes||(r.dir?Vo(r.dir,r.up):[[1,0,0],[0,1,0],[0,0,1]]);return this.parts.push({type:"box",c:e,h:t,round:Math.min(r.round??.02,...t),axes:a,mat:i,group:r.group??1,extra:!!r.extra,paint:r.paint,rough:r.rough,cut:!!r.cut}),this}seg(e,t,i,r,a,s={}){return this.parts.push({type:"cone",a:e,b:t,r1:i,r2:r,mat:a,group:s.group??1,extra:!!s.extra,paint:s.paint,rough:s.rough,cut:!!s.cut}),this}chain(e,t,i={}){for(let r=0;r+1<e.length;r++)this.seg(e[r].slice(0,3),e[r+1].slice(0,3),e[r][3],e[r+1][3],t,i);return this}flat(e,t,i,r,a,s,o={}){return this.flats.push({c:e,u:ai(t),v:ai(i),su:r,sv:a,mask:s,group:o.group??30,extra:!!o.extra,bend:o.bend??.35}),this}static surface(e,t,i){const r=1/Math.hypot(i[0]/t[0],i[1]/t[1],i[2]/t[2]);return[e[0]+i[0]*r,e[1]+i[1]*r,e[2]+i[2]*r]}}const Xo={towards:.6,away:-.6},mu=.52;function ba(n,{height:e,scale:t,facing:i="towards",yaw:r=Xo[i]??Xo.towards,pitch:a=mu,lineGap:s=.12}={}){const o=Math.cos(r),c=Math.sin(r),l=Math.cos(a),h=Math.sin(a),f=L=>[L[0]*o-L[2]*c,L[1],L[0]*c+L[2]*o],u=L=>[L[0]*o+L[2]*c,L[1],-L[0]*c+L[2]*o],d=[0,-h,-l],g=[0,l,-h],_=[1,0,0],m=[0,h,l],p=n.blend,M=n.parts.map(L=>{if(L.type==="ell"){const Ge=f(L.c),Ue=L.axes.map(f),$e=Math.max(...L.r);return{...L,cw:Ge,axes:Ue,bc:Ge,br:$e+(L.rough||0)*1.5}}if(L.type==="box"){const Ge=f(L.c),Ue=L.axes.map(f);return{...L,cw:Ge,axes:Ue,bc:Ge,br:Math.hypot(...L.h)+(L.rough||0)*1.5}}const X=f(L.a),ae=f(L.b),xe=ri(ae,X),ce=Math.max(1e-9,Rt(xe,xe)),we=L.r1-L.r2;return{...L,aw:X,ba:xe,l2:ce,rr:we,a2:ce-we*we,il2:1/ce,bc:Q.lerp(X,ae,.5),br:Math.sqrt(ce)/2+Math.max(L.r1,L.r2)}}),y=n.flats.map(L=>{const X=f(L.c),ae=f(L.u),xe=f(L.v);return{...L,cw:X,uw:ae,vw:xe,nw:ai(Mr(ae,xe)),bc:X,br:Math.hypot(L.su,L.sv)}}),b=[...M,...y],A=L=>{const X=Rt(L.bc,_),ae=Rt(L.bc,g),xe=L.br+(L.uw?0:p);return[X-xe,X+xe,ae-xe,ae+xe]};for(const L of b)[L.x0,L.x1,L.u0,L.u1]=A(L);const w=b.filter(L=>!L.extra&&!L.cut),C=Math.min(...w.map(L=>L.u0+(L.uw?0:p))),S=Math.max(...w.map(L=>L.u1-(L.uw?0:p))),R=t??e/Math.max(1e-6,S-C),D=Math.min(...b.map(L=>L.x0)),N=Math.max(...b.map(L=>L.x1)),H=Math.min(...b.map(L=>L.u0)),k=Math.max(...b.map(L=>L.u1)),P=Math.ceil((N-D)*R)+4,B=Math.ceil((k-H)*R)+2,V=new Jt(P,B),Z=new Float32Array(P*B).fill(1/0),ie=new Int16Array(P*B).fill(-1),K=8,ee=Math.ceil(P/K),U=Math.ceil(B/K),re=Array.from({length:ee*U},()=>[]);b.forEach((L,X)=>{const ae=Math.max(0,Math.floor((L.x0-D)*R/K)),xe=Math.min(ee-1,Math.floor(((L.x1-D)*R+2)/K)),ce=Math.max(0,Math.floor((k-L.u1)*R/K)),we=Math.min(U-1,Math.floor(((k-L.u0)*R+1)/K));for(let Ge=ce;Ge<=we;Ge++)for(let Ue=ae;Ue<=xe;Ue++)re[Ge*ee+Ue].push(X)});const oe=.25/R,Re=(L,X)=>{const ae=Math.max(p-Math.abs(L-X),0)/p;return Math.min(L,X)-ae*ae*p*.25};for(let L=0;L<B;L++)for(let X=0;X<P;X++){const ae=re[Math.floor(L/K)*ee+Math.floor(X/K)];if(!ae.length)continue;const xe=D+(X+.5-1)/R,ce=k-(L+.5)/R,we=Q.add(Q.add(Q.mul(_,xe),Q.mul(g,ce)),Q.mul(m,50));let Ge=1/0,Ue=-1/0;const $e=[],ct=[];for(const He of ae){const I=b[He],ut=ri(we,I.bc),Be=Rt(ut,d),T=I.br+(I.uw?0:p),v=Rt(ut,ut)-T*T,z=Be*Be-v;if(z<0)continue;if(I.uw){ct.push(I);continue}if(I.cut){$e.push(I);continue}const G=Math.sqrt(z);Ge=Math.min(Ge,-Be-G),Ue=Math.max(Ue,-Be+G),$e.push(I)}let qe=1/0,ft=-1,yt=0,Tt=null;if($e.length){const He=new Map;for(const Be of $e){let T=He.get(Be.group);T||He.set(Be.group,T=[]),T.push(Be)}const I=(Be,T)=>{let v=1/0;for(const z of Be)z.cut||(v=v===1/0?sr(z,T):Re(v,sr(z,T)));for(const z of Be)z.cut&&(v=Math.max(v,-sr(z,T)));return v};let ut=Math.max(0,Ge);for(let Be=0;Be<96&&ut<Ue;Be++){const T=Q.add(we,Q.mul(d,ut));let v=1/0,z=null;for(const[G,J]of He){const le=I(J,T);le<v&&(v=le,z=G)}if(v<oe){const G=He.get(z),J=.5/R;Tt=ai([I(G,[T[0]+J,T[1],T[2]])-I(G,[T[0]-J,T[1],T[2]]),I(G,[T[0],T[1]+J,T[2]])-I(G,[T[0],T[1]-J,T[2]]),I(G,[T[0],T[1],T[2]+J])-I(G,[T[0],T[1],T[2]-J])]);let le=G[0],ue=1/0;for(const j of G){if(j.cut)continue;const te=sr(j,T);te<ue&&(ue=te,le=j)}for(const j of G)if(j.cut&&-sr(j,T)>ue-oe*2){le=j;break}qe=ut,ft=z,yt=le.paint?le.paint(u(T),le)??le.mat:le.mat;break}ut+=Math.max(v*.9,oe*.5)}}for(const He of ct){const I=Rt(d,He.nw);if(Math.abs(I)<1e-4)continue;const ut=Rt(ri(He.cw,we),He.nw)/I;if(ut>=qe)continue;const Be=Q.add(we,Q.mul(d,ut)),T=ri(Be,He.cw),v=Rt(T,He.uw)/He.su,z=Rt(T,He.vw)/He.sv;if(Math.abs(v)>1||Math.abs(z)>1)continue;const G=He.mask(v,z);if(!G)continue;let J=I>0?Q.mul(He.nw,-1):He.nw;J=ai(Q.add(J,Q.add(Q.mul(He.uw,v*He.bend),Q.mul(He.vw,z*He.bend*.5)))),qe=ut,ft=He.group,yt=G,Tt=J}if(!Tt||!yt)continue;const gt=L*P+X;Z[gt]=qe,ie[gt]=ft,V.px(X,L,yt,Rt(Tt,_),-Rt(Tt,g),Rt(Tt,m))}const Fe=[];for(let L=0;L<B;L++)for(let X=0;X<P;X++){const ae=L*P+X;if(V.m[ae])for(const[xe,ce]of[[1,0],[-1,0],[0,1],[0,-1]]){const we=X+xe,Ge=L+ce;if(we<0||Ge<0||we>=P||Ge>=B)continue;const Ue=Ge*P+we;if(V.m[Ue]&&ie[Ue]!==ie[ae]&&Z[Ue]-Z[ae]>s){Fe.push(ae);break}}}for(const L of Fe)[x.EYE,x.GLINT,x.MAGIC,x.MAGIC2,x.NOSE].includes(V.m[L])||(V.m[L]=x.LINE);for(let L=0;L<B;L++)for(let X=0;X<P;X++){const ae=L*P+X;if(V.m[ae]!==x.EYE)continue;const xe=L>0&&V.m[ae-P]===x.EYE,ce=X>0&&V.m[ae-1]===x.EYE,we=X+1<P&&V.m[ae+1]===x.EYE&&L+1<B&&V.m[ae+P]===x.EYE;!xe&&!ce&&we&&(V.m[ae]=x.GLINT)}let ke=-1;for(let L=B-1;L>=0&&ke<0;L--)for(let X=0;X<P;X++)if(V.m[L*P+X]){ke=L;break}if(ke>=0&&ke<B-1){const L=B-1-ke;for(let X=B-1;X>=0;X--)for(let ae=0;ae<P;ae++){const xe=X*P+ae,ce=(X-L)*P+ae,we=X-L>=0;V.m[xe]=we?V.m[ce]:0,V.g[xe]=we?V.g[ce]:0;for(let Ge=0;Ge<3;Ge++)V.n[xe*3+Ge]=we?V.n[ce*3+Ge]:0}}return V.bodyH=Math.round((S-C)*R),{sp:V,s:R}}const Tn=(n,e=9,t=.3)=>Zt(Math.floor(n[0]*e),Math.floor(n[1]*e)+Math.floor(n[2]*e)*97,7)<t,Qi={wing:(n,e)=>(t,i)=>{const r=(t+1)/2,a=1-.35*r*r,s=-1+.55*r+.18*Math.abs(Math.sin(r*Math.PI*6));return i>a||i<s?null:i>a-.35*(1-r*.5)?e:Math.floor(r*9)%2?n:e},ear:(n,e=x.EAR,t=x.BODY3)=>(i,r)=>{const a=(r+1)/2,s=.95*Math.sin(Math.PI*Math.min(1,.15+a*.85))*(1-a*.35);return Math.abs(i)>s?null:a>.82?t:Math.abs(i)<s*.5&&a<.7&&a>.12?e:n},flame:(n,e)=>(t,i)=>{const r=(i+1)/2,a=Math.sin(Math.PI*Math.min(1,r*1.1))*(1-r)*1.4;return Math.abs(t)>a?null:Math.abs(t)<a*.45&&r<.6?e:n},membrane:n=>(e,t)=>{const i=(e+1)/2,r=-1+.35*Math.abs(Math.sin(i*Math.PI*3));return t<r||t>1-.2*i?null:n},spotted:(n,e,t)=>(i,r)=>{if(Math.hypot(i,r*1.2)>1)return null;const s=Math.hypot(i-.35,r-.1);return s<.18?t:s<.3?e:n}},gu=1.3,_u=n=>[1,Math.sqrt(n.growth),Math.sqrt(n.growth)*gu,n.growth],or=(n,e,t=1)=>Math.round(e.size*_u(e)[Math.max(0,Math.min(3,n))]*(2/(e.pixel||2))*1.9*t),oo=(n,e)=>{const t=so(e);for(let i=0;i<9;i++){const r=Math.floor(Se(t,2,n.w-2)),a=Math.floor(Se(t,2,n.h*.6));if(!(n.get(r,a)||n.get(r+1,a)||n.get(r-1,a)||n.get(r,a+1)||n.get(r,a-1))&&(n.px(r,a,x.MAGIC2),i%3===0))for(const[s,o]of[[1,0],[-1,0],[0,1],[0,-1]])n.px(r+s,a+o,x.MAGIC)}};function Ea(n,e,t,i,r,a,s,o){const c=Q.add(e,[-i*.7,i*(.75+r),t*i*.35]),l=Q.norm(Q.sub(c,e)),h=Q.norm(Q.sub([1,0,0],Q.mul(l,Q.dot([1,0,0],l)))),f=Math.hypot(...Q.sub(c,e));n.flat(Q.add(Q.lerp(e,c,.5),Q.mul(h,-i*.14)),l,h,f*.55,i*.34,Qi.wing(a,s),{group:o,extra:!0})}const lo=(n,e,t=1)=>n===0?Math.round(Math.max(12,Math.min(30*Math.max(.75,Math.min(1.1,t)),or(1,e)*t*.72))):n===2?Math.round(Math.max(or(1,e)*t*1.08,Math.min(or(2,e,t),or(1,e)*1.4))):or(n,e)*t;function xu(n,e,t,i,r="towards"){const a={legW:1,earS:1,hgt:1,bw:.3,...n.q},s=e===3,o=e===1,c=e===0,l=U=>s&&n.legend.includes(U),h=new Mt,f=a.hr*(c?1.75:o?1.25:1)*(i.head/.44)**.5,u=a.len*(c?.8:o?.9:1.02)*i.long,d=c?.55:o?.9:1.04,g=t?-.04:0,_=1+g,m=a.chest*(s?1.06:1)/d+g,p=a.tuck/d+g,M=a.bw*(c?1.15:e>=2?1.06:1)*(a.legW>1.2?1.15:1),y=.06*a.legW*(s?1.1:c?1.7:1),b=a.back==="hump"?.1:0,A=a.back==="arch"?.1:0,w=m+.12,C=U=>{if(a.belly&&U[1]<w&&U[0]>-u*.5)return x.BELLY;if(a.saddle&&U[1]>_-.18&&U[0]<u*.55)return x.BODY2;if(a.spots&&U[1]>m+.1&&Tn(U,10,.22))return a.spotMat==="belly"||a.spots==="young"&&o?x.BELLY:a.spots==="young"?void 0:x.BODY3;if(a.ridge&&U[1]>_-.08+b*.5)return x.BODY3};if(h.ell([u*.48,(_+m)/2+b*.5,0],[u*.62,(_-m)/2+b*.5,M],x.BODY,{paint:C}),h.ell([-u*.5,(_+p)/2+A*.6,0],[u*.58,(_-p)/2+A*.6,M*.93],x.BODY,{paint:C}),h.ell([0,(_+(m+p)/2)/2+.02,0],[u*.6,(_-(m+p)/2)/2,M*.9],x.BODY,{paint:C}),a.ridge)for(let U=0;U<(s?16:10);U++){const re=-u*.8+U*u*1.75/(s?15:9),oe=(.07+(s?.04:0))*(1+.5*Math.max(0,re/u));h.ell([re,_+.02+b*Math.max(0,1-Math.abs(re/u-.5)*2)+oe*.5,0],[oe,.03,M*.25],x.BODY3,{dir:[-.3,1,0],up:[1,0,0]})}if(a.wool)for(let U=0;U<14;U++){const re=U/14*Math.PI*2;h.ell([u*Math.cos(re)*.7,(_+m)/2+Math.sin(re)*.2,M*(U%2?.5:-.5)],[.16,.14,.14],x.BODY)}const S=[.32,-.32][t],R=(U,re)=>{const oe=re*M*.62,Re=U?u*.62:-u*.62,Fe=(U?1:-1)*re*S,ke=U?m+.1:p+.15,L=(U?re:-re)*(t?1:-1)>0?.06:0,X=[Re+Math.sin(Fe)*.2+(U?.02:.1),Math.max(.3,ke*.55),oe],ae=[Re+Math.sin(Fe)*.42,.05+L,oe],xe=[Re,ke+.12,oe*.8],ce=re>0?a.legMat||x.BODY:a.legMat?x.BODY3:x.BODY2,we=U?[[...xe,y*1.5],[...X,y*1.05],[...ae,y*.9]]:[[...xe,y*2*(a.haunch||1)],[...Q.add(X,[-.12,.06,0]),y*1.2],[...Q.add(ae,[-.06*(a.hindFoot||1),.12,0]),y*.9],[...ae,y*.9]];h.chain(we,ce,{group:re>0?6+(U?1:0):2,paint:a.socks?Ue=>Ue[1]<a.socks?x.BODY3:void 0:void 0});const Ge=(a.paw==="hoof"?.07:.09)*a.legW**.5*(U?1:a.hindFoot||1);h.ell(Q.add(ae,[Ge*.5,-.01,0]),[Ge,y*.9,y*1.1],a.paw==="hoof"?x.NOSE:ce,{group:re>0?6+(U?1:0):2})};for(const U of[-1,1])R(!0,U),R(!1,U);const D=[u*.82,_-.12,0],N=[D[0]+Math.cos(a.neckAng)*a.neck*.9,D[1]+Math.sin(a.neckAng)*a.neck*.9+(c?.1:0),0];h.seg(D,N,a.neckW*.55,a.neckW*.42,x.BODY,{paint:U=>a.belly&&U[1]<(D[1]+N[1])/2-.05?x.BELLY:a.face==="dark"?x.BODY2:void 0});const H=U=>{if(a.face==="badger")return Math.abs(U[2])<f*.22+(U[0]-N[0])*.1||U[1]<N[1]-f*.1?x.BELLY:x.BODY3;if(a.face==="dark")return x.BODY2;if((a.belly||a.muzzle)&&U[1]<N[1]-f*.35)return x.BELLY};h.ell(N,[f*1.05,f*.92,f*.88],x.BODY,{paint:H});const k=f*a.snout*(c?.55:o?.78:1),P=f*a.snoutD*.55,B=[N[0]+f*.65+k*.5,N[1]-f*.28,0];h.ell(B,[k*.62+f*.2,P,P*.95],x.BODY,{dir:[1,-.25,0],paint:U=>(a.muzzle||a.belly)&&U[1]<B[1]-P*.1?x.BELLY:H(U)});const V=[B[0]+k*.62+f*.1,B[1]-.02,0];h.ell(V,[f*(a.disc?.1:.12),f*(a.disc?.2:.12),f*(a.disc?.2:.15)],x.NOSE,{group:1});for(const U of[-1,1]){const re=Mt.surface(N,[f*1.05,f*.92,f*.88],Q.norm([.75,.32,U*.62]));h.ell(re,[f*.13,f*.16,f*.13].map(oe=>oe*(a.eyeK||1)*(c?1.5:o?1.2:1)),s&&!a.tusks?x.MAGIC2:x.EYE,{group:1})}for(const U of[-1,1]){const re=a.ear,oe=[N[0]-f*.15,N[1]+f*.7,U*f*.5],Re=a.earS*(c?1.2:1)*(a.ear==="long"?.62:1);if(re==="none")continue;if(re==="round"){h.ell(oe,[f*.22,f*.25*Re,f*.1],x.BODY,{group:1,paint:we=>we[0]>oe[0]+f*.02?x.EAR:void 0});continue}const Fe=re==="long",ke=re==="small"?-.6:0,L=f*.55*Re*(re==="big"?1.35:Fe?2.2:1),X=f*.3*(re==="big"?1.2:Fe?1.35:1),ae=Q.norm([ke*.6-(Fe?.3:.12),1,U*.3]),xe=Q.norm([.55,.2,U]),ce=Q.norm(Q.cross(xe,ae));h.flat(Q.add(oe,Q.mul(ae,L)),ce,ae,X,L,Qi.ear(x.BODY,x.EAR,x.BODY3),{group:5+(U>0?0:20),extra:Fe}),re==="tuft"&&h.seg(Q.add(oe,[0,L*1.4,U*.02]),Q.add(oe,[0,L*1.85,U*.04]),f*.05,f*.02,x.BODY3,{group:1})}const Z=[-u*1.05,_-.1+A*.5,0],ie=t?.04:-.02;if(l("tails")||vu(h,l("starTail")?"star":a.tail,Z,u,_,ie),a.horns)for(const U of[-1,1]){const re=o?.6:c?.35:l("hornsGlow")?1.4:1,oe=[];for(let Re=0;Re<=8;Re++){const Fe=.3-Re/8*Math.PI*1.6,ke=f*.65*re*(1-.45*Re/8);oe.push([N[0]-f*.1+Math.cos(Fe)*ke,N[1]+f*.45+Math.sin(Fe)*ke,U*(f*.6+Re*.015)]),oe[Re].push(f*.2*re*(1-.6*Re/8))}h.chain(oe,l("hornsGlow")?x.MAGIC:x.ACCENT,{group:13})}if(a.antlers||l("jackalope"))for(const U of[-1,1])Mu(h,a,[N[0]-f*.05,N[1]+f*.75,U*f*.4],U,e,l);if(a.tusks)for(const U of[-1,1]){const re=o?.4:c?0:l("tusksBig")?1.3:.75;if(!re)continue;const oe=[B[0]+k*.25,B[1]-P*.4,U*P*.8];h.chain([[...oe,.045*re],[...Q.add(oe,[.1*re,.1*re,U*.03]),.04*re],[...Q.add(oe,[.06*re,.24*re,U*.05]),.02*re]],x.ACCENT,{group:8})}a.teeth&&!c&&h.ell([V[0]-f*.1,V[1]-f*.25,0],[f*.08,f*.14,f*.12],x.ACCENT,{group:1});const K=U=>[-u*.9+U*u*1.65,_+b*Math.max(0,1-Math.abs(U-.8)*3)+A*(1-Math.abs(U-.4)*2),0];if(l("wings"))for(const U of[-1,1])Ea(h,[u*.2,_,U*M*.5],U,1.15,t?.1:0,U>0?x.MAGIC2:x.MAGIC,x.MAGIC,40+(U>0?10:0));if(l("mane")||l("flames"))for(let U=0;U<7;U++){const re=U/6,oe=Q.lerp(Q.add(N,[-f*.5,f*.3,0]),K(.55),re),Re=[.4,.3,.45,.28,.38,.25,.3][U],Fe=Q.norm([-.35-(t?.1:0),1,0]);h.flat(Q.add(oe,Q.mul(Fe,Re*.5)),[1,0,0],Fe,Re*.32,Re*.55,Qi.flame(U%2?x.MAGIC:x.MAGIC2,x.MAGIC2),{group:60+U%2,extra:!0})}if(l("tails"))for(let U=0;U<7;U++){const re=Math.PI*(.55+U*.08),oe=(U-3)*.1,Re=Q.add(Z,[Math.cos(re)*.9,Math.sin(re)*.85,oe]);h.chain([[...Z,.1],[...Q.lerp(Z,Re,.5),.17],[...Re,.08]],U%2?x.BODY2:x.BODY,{group:70,extra:!0}),h.ell(Re,[.09,.09,.09],x.MAGIC2,{group:71,extra:!0})}if(l("crystals")&&[.15,.3,.45,.6,.75].forEach((U,re)=>{const oe=K(U),Re=[.3,.5,.4,.6,.35][re];h.ell(Q.add(oe,[0,Re*.45,(re%2-.5)*.1]),[Re*.55,.08,.08],x.MAGIC,{dir:[(re-2)*.12,1,0],group:80+re%2,extra:!0,paint:Fe=>Fe[2]>0?x.MAGIC2:void 0})}),l("moss")){for(let U=0;U<6;U++)h.ell(K(.08+U*.15),[u*.22,.07,M*.85],x.LEAF,{group:85,extra:!0});for(const[U,re]of[[.25,.55],[.5,.8],[.75,.45]]){const oe=K(U);h.seg(oe,Q.add(oe,[0,re*.7,0]),.04,.025,x.TRUNK,{group:86,extra:!0}),h.ell(Q.add(oe,[0,re*.8,0]),[re*.28,re*.26,re*.28],x.LEAF2,{group:87,extra:!0,paint:Re=>Re[1]<oe[1]+re*.72?x.LEAF3:void 0})}for(const U of[.12,.4,.65,.9]){const re=K(U);h.ell(Q.add(re,[0,.12,M*.3]),[.07,.035,.07],x.MAGIC,{group:89,extra:!0})}}if(l("ribbons"))for(let U=0;U<3;U++){const re=[];for(let oe=0;oe<9;oe++){const Re=oe/8;re.push([u*(.5-Re*2.2),_+.05+U*.1+Re*(.25+U*.12)+Math.sin(Re*6+t+U)*.07,(U-1)*.18,.04*(1-Re*.6)])}h.chain(re,U%2?x.MAGIC2:x.MAGIC,{group:90+U,extra:!0})}const{sp:ee}=ba(h,{height:lo(e,i,a.hgt),facing:r});return s&&oo(ee,n.id.length*7919),ee}function vu(n,e,t,i,r,a){const s={group:3},o=c=>-i*c;e==="brush"?n.chain([[...t,.1],[o(1.3),r-.25+a,0,.15],[o(1.4),r-.55,0,.14],[o(1.35),.38+a,0,.09]],x.BODY,{...s,paint:c=>c[1]<.32?x.BODY3:void 0}):e==="bushy"?n.chain([[...t,.1],[o(1.05)-.35,r-.05+a,0,.17],[o(1.05)-.75,r-.2+a,0,.18],[o(1.05)-1,r-.35+a,0,.1]],x.BODY,{...s,paint:c=>c[0]<o(1.05)-.82?x.BELLY:void 0}):e==="stub"||e==="deer"||e==="bob"?n.ell(Q.add(t,[-.06,.02+a,0]),[.1,.08,.07],e==="deer"?x.BELLY:x.BODY,{...s,paint:e==="bob"?c=>c[0]<t[0]-.08?x.BODY3:void 0:void 0}):e==="puff"?n.ell(Q.add(t,[-.04,.02,0]),[.11,.11,.1],x.BELLY,s):e==="squirrel"||e==="star"?n.chain([[...t,.12],[o(1.3),r+.05+a,0,.25],[o(1.3),r+.6+a,0,.3],[o(1),r+.95+a,0,.27],[o(.65),r+.9+a,0,.16]],e==="star"?x.MAGIC:x.BODY,{...s,extra:!0,paint:e==="star"?c=>Tn(c,14,.12)?x.GLINT:void 0:void 0}):e==="otter"?n.chain([[...t,.17],[o(1.3),r-.45+a,0,.12],[o(1.6),.1,0,.07],[o(1.85),.06+a,0,.03]],x.BODY,s):e==="stoat"?n.chain([[...t,.08],[o(1.3),r-.12+a,0,.07],[o(1.6),r-.05+a,0,.06]],x.BODY,{...s,paint:c=>c[0]<o(1.45)?x.BODY3:void 0}):e==="flat"?(n.seg(t,[o(1.15),.3,0],.08,.07,x.BODY2,s),n.ell([o(1.4),.1+a*.5,0],[.28,.03,.14],x.BODY3,s)):e==="thin"&&(n.chain([[...t,.04],[o(1.1),r-.3,0,.03],[o(1.12)+a,r-.55,0,.025]],x.BODY,s),n.ell([o(1.12)+a,r-.62,0],[.04,.07,.04],x.BODY3,s))}function Mu(n,e,t,i,r,a){const s=!e.antlers,o=s?.45:[0,.5,.95,.95][r]*(a("antlersGlow")?1.15:1),c=a("antlersGlow")?i>0?x.MAGIC2:x.MAGIC:x.ACCENT,l={group:11+(i>0?1:0),extra:!0};if(!o)return;const h=.045*Math.max(.8,o),f=i*.35*o;if(e.antlers==="palm"){const m=Q.add(t,[-.06*o,.12*o,f*.3]);n.seg(t,m,h*1.3,h*1.2,c,l);for(let p=0;p<5;p++){const M=.35+p*.3,y=Q.norm([-Math.cos(M),Math.sin(M)*.9,i*.55]),b=(.24+.05*(p%2))*o;n.ell(Q.add(m,Q.mul(y,b*.55)),[b*.6,h*1.5,h*.6],c,{...l,dir:y,up:[0,0,1]})}return}const u=Q.add(t,[-.18*o,.3*o,f*.4]),d=Q.add(t,[-.25*o,.62*o,f*.8]),g=Q.add(t,[-.1*o,.95*o,f]);n.chain([[...t,h*1.2],[...u,h],[...d,h*.85],[...g,h*.4]],c,l);const _=(m,p,M,y)=>n.seg(m,Q.add(m,Q.mul(Q.norm(p),M)),y,y*.35,c,l);_(Q.add(t,[-.04*o,.1*o,f*.1]),[1,.6,0],.28*o,h*.8),(o>.4||s)&&_(u,[1,.9,0],.3*o,h*.7),o>.7&&(_(d,[.8,1,0],.28*o,h*.6),_(g,[.3,1,i*.2],.18*o,h*.5))}function Su(n,e,t,i,r="towards"){const a=e===3,s=e===1,o=e===0,c=g=>a&&n.legend.includes(g),l=new Mt,h=t?.03:0,f=o?.48:s?.42:.36,u=(o?.95:1.08)+h;for(const g of[-1,1]){const _=t&&g>0?.04:0;l.seg([.05,.2,g*.14],[.08,.05+_,g*.15],.07,.06,x.BODY2,{group:2});for(const m of[-.04,0,.04])l.ell([.16,.03+_,g*.15+m],[.06,.025,.02],x.ACCENT,{group:2})}if(l.ell([-.32,.32,0],[.22,.06,.14],x.BODY2,{dir:[-1,-.6,0],group:3}),l.ell([0,.55+h,0],[.36,.52,.36],x.BODY,{paint:g=>g[0]>.12&&g[1]<u-f*.5?Math.floor(g[1]*18)%3===0&&Tn(g,16,.5)?x.BODY2:x.BELLY:void 0}),!c("wings"))for(const g of[-1,1])l.ell([-.06,.58+h,g*.3],[.4,.3,.08],x.BODY2,{dir:[-.3,-1,0],up:[1,0,0],group:g>0?4:2,paint:_=>Tn(_,12,.15)?x.BODY3:void 0});l.ell([0,u,0],[f,f*.9,f],x.BODY);for(const g of[-1,1]){const _=Q.norm([.75,-.05,g*.4+.35]),m=Q.add(Mt.surface([0,u,0],[f,f*.9,f],_),Q.mul(_,-f*.05));l.ell(m,[f*.22,f*.46,f*.4],x.BELLY,{group:1,dir:_});const p=Q.add(m,Q.mul(_,f*.14));l.ell(p,[f*.1,f*.26,f*.24].map(M=>M*(o?1.15:1)),a?x.MAGIC:x.IRIS,{group:1,dir:_}),l.ell(Q.add(p,Q.mul(_,f*.07)),[f*.08,f*.14,f*.13].map(M=>M*(o?1.15:1)),a?x.MAGIC2:x.EYE,{group:1,dir:_}),o||l.ell([f*.05,u+f*.8,g*f*.6],[f*.32,f*.12,f*.08],x.BODY2,{dir:[-.1,1,g*.7],up:[1,0,0],group:1})}if(l.ell(Mt.surface([0,u,0],[f,f*.9,f],Q.norm([.75,-.35,.35])),[f*.2,f*.12,f*.1],x.ACCENT,{dir:[.6,-1,.3],group:1}),c("wings"))for(const g of[-1,1])Ea(l,[-.05,.8+h,g*.3],g,1.3,t?.12:0,g>0?x.MAGIC2:x.MAGIC,x.MAGIC,40+(g>0?10:0));if(c("eyesRing"))for(let g=0;g<7;g++){const _=Math.PI*(.15+g/6*.7);l.ell([Math.cos(_)*.2-.1,u+.1+Math.sin(_)*.6,(g-3)*.15],[.07,.07,.07],x.MAGIC2,{group:95+g,extra:!0}),l.ell([Math.cos(_)*.2-.05,u+.1+Math.sin(_)*.6,(g-3)*.15],[.035,.035,.035],x.EYE,{group:95+g,extra:!0})}const{sp:d}=ba(l,{height:lo(e,i,.95),facing:r});return a&&oo(d,31),d}const oi=(n,e,t,i,r,a)=>{for(const s of i)n.ell(Mt.surface(e,t,Q.norm(s)),[r,r*1.2,r],a,{group:1})},ql=(n,e,t)=>n.ell([e,.005,0],[t,.005,t*.6],x.NOSE,{group:0});function cn(n,e,t,i,r,a){const{sp:s}=ba(n,{height:lo(t,i,r),facing:a});return t===3&&oo(s,e.id.length*131),s}const Kl=(n,e,t)=>{n.ell(e,[t,t*.35,t],x.MAGIC,{group:95,extra:!0,paint:i=>i[1]>e[1]?x.MAGIC2:void 0});for(let i=0;i<5;i++){const r=i/5*Math.PI*2;n.ell(Q.add(e,[Math.cos(r)*t*.8,t*.55,Math.sin(r)*t*.8]),[t*.38,t*.12,t*.12],x.MAGIC,{dir:[0,1,0],up:[1,0,0],group:96,extra:!0})}},co=(n,e)=>e.forEach(([t,i],r)=>n.ell(Q.add(t,[0,i*.45,0]),[i*.55,.07,.07],x.MAGIC,{dir:[(r%3-1)*.25,1,(r%2-.5)*.3],group:80+r%2,extra:!0,paint:a=>a[2]>t[2]?x.MAGIC2:void 0}));function bu(n,e,t,i,r="towards"){const a=e===3,s=new Mt,o=t?.03:0;for(const[f,u]of[[.28,.2],[.28,-.2],[-.28,.2],[-.28,-.2]])s.seg([f,.15,u],[f+(u>0?o:-o),.03,u],.06,.05,x.BODY3,{group:u>0?6:2});const c=[0,.32,0],l=[.5,.32,.38];s.ell(c,l,x.BODY2,{paint:f=>Tn(f,22,.3)?x.BODY3:Tn(f,19,.12)?x.BELLY:void 0});for(let f=0;f<46;f++){const u=f*2.399%(Math.PI*2),d=f/46*.9+.05,g=Q.norm([Math.cos(u)*Math.sin(d*Math.PI*.5)-.25,Math.cos(d*Math.PI*.5)*.9+.1,Math.sin(u)*Math.sin(d*Math.PI*.5)]);g[0]>.55||s.ell(Q.add(Mt.surface(c,l,g),Q.mul(g,.02)),[.1,.025,.025],f%4?x.BODY2:x.BODY3,{dir:Q.add(g,[-.4,0,0]),group:1})}const h=[.48,.22,0];return s.ell(h,[.22,.14,.15],x.BELLY,{dir:[1,-.3,0],group:1}),s.ell([.69,.16,0],[.04,.04,.04],x.NOSE,{group:1}),oi(s,h,[.22,.14,.15],[[.3,.6,.55],[.3,.6,-.55]],.035,a?x.MAGIC2:x.EYE),a&&co(s,[[[-.3,.55,.1],.35],[[-.05,.62,-.1],.5],[[.2,.55,.12],.4],[[-.15,.58,.2],.3]]),cn(s,n,e,i,.6,r)}function Eu(n,e,t,i,r="towards"){const a=e===3,s=new Mt,o=t?.05:0;for(const h of[-1,1])s.ell([-.22,.16,h*.36],[.24,.13,.12],h>0?x.BODY:x.BODY2,{dir:[1,.3,0],group:h>0?6:2,paint:f=>Tn(f,14,.15)?x.BODY3:void 0}),s.ell([.05,.04,h*.4],[.16,.04,.08],h>0?x.BODY:x.BODY2,{group:h>0?6:2}),s.seg([.35,.2+o,h*.24],[.42,.03,h*.3],.05,.04,h>0?x.BODY:x.BODY2,{group:h>0?7:2});const c=[0,.3+o,0],l=[.5,.28,.4];s.ell(c,l,x.BODY,{paint:h=>h[1]<c[1]-.12?x.BELLY:h[0]>.38&&Math.abs(h[1]-(c[1]-.02))<.018?x.LINE:Tn(h,14,.22)?x.BODY3:void 0});for(const h of[-1,1]){const f=[.3,.55+o,h*.17];s.ell(f,[.1,.09,.1],x.BODY,{group:1}),s.ell(Mt.surface(f,[.1,.09,.1],Q.norm([.6,.5,h*.5])),[.05,.05,.05],a?x.MAGIC2:x.IRIS,{group:1}),s.ell(Mt.surface(f,[.11,.1,.11],Q.norm([.65,.45,h*.5])),[.03,.015,.03],x.EYE,{group:1})}return a&&Kl(s,[.15,.66+o,0],.16),cn(s,n,e,i,.55,r)}function yu(n,e,t,i,r="towards"){const a=e===3,s=e===1,o=u=>a&&n.legend.includes(u),c=new Mt,l=t?.02:0;for(const u of[-1,1]){const d=t&&u>0?.04:0;c.seg([0,.3,u*.08],[.03,.03+d,u*.08],.03,.025,x.NOSE,{group:u>0?7:2}),c.ell([.08,.02+d,u*.08],[.08,.015,.04],x.NOSE,{group:2})}if(c.ell([-.55,.42,0],[.32,.035,.12],x.BODY2,{dir:[-1,-.25,0],group:3}),c.ell([0,.52+l,0],[.42,.26,.24],x.BODY,{dir:[1,.45,0]}),!o("wings"))for(const u of[-1,1])c.ell([-.1,.55+l,u*.2],[.45,.17,.05],x.BODY2,{dir:[-1,-.25,0],group:u>0?4:2});const h=[.36,.84+l,0],f=s?.19:.16;if(c.ell(h,[f*1.1,f,f*.95],x.BODY,{paint:u=>u[1]>h[1]+f*.55?x.BELLY:void 0}),c.ell(Q.add(h,[f*1.5,-f*.25,0]),[f*1,f*.38,f*.3],x.NOSE,{dir:[1,-.2,0],group:1}),oi(c,h,[f*1.1,f,f*.95],[[.55,.35,.65],[.55,.35,-.65]],f*.16,a?x.MAGIC2:x.EYE),o("wings"))for(const u of[-1,1])Ea(c,[-.05,.65+l,u*.18],u,1.1,t?.1:0,u>0?x.MAGIC2:x.MAGIC,x.MAGIC,40+(u>0?10:0));if(o("eyesRing"))for(let u=0;u<6;u++){const d=Math.PI*(.2+u/5*.6);c.ell([Math.cos(d)*.25-.1,.95+Math.sin(d)*.45,(u-2.5)*.12],[.06,.06,.06],x.MAGIC2,{group:95+u,extra:!0})}return cn(c,n,e,i,.75,r)}function wu(n,e,t,i,r="towards"){const a=e===3,s=u=>a&&n.legend.includes(u),o=new Mt,c=t===0,l=.55,h=s("wingsBig")?1.5:1;ql(o,0,.3*h);for(const u of[-1,1]){const d=[0,l+.05,u*.1],g=[.05,l+(c?.35:-.05),u*.45*h],_=[[-.05,l+(c?.45:-.15),u*.85*h],[-.25,l+(c?.2:-.25),u*.75*h],[-.3,l+(c?0:-.25),u*.4*h]],m=s("wingsBig")?x.MAGIC:x.BODY2,p=s("wingsBig")?x.MAGIC2:x.BODY3;o.seg(d,g,.03,.025,p,{group:11});for(const w of _)o.seg(g,w,.02,.012,p,{group:11});const M=Q.sub(_[0],d),y=Q.norm(M),b=Q.norm(Q.sub(_[2],g)),A=Q.norm(Q.sub(b,Q.mul(y,Q.dot(b,y))));o.flat(Q.add(Q.lerp(d,_[0],.5),Q.mul(A,.12*h)),y,A,Math.hypot(...M)*.55,.3*h,Qi.membrane(m),{group:10+(u>0?1:0),bend:.2})}o.ell([0,l,0],[.13,.16,.12],x.BODY,{group:1});const f=[.08,l+.2,0];o.ell(f,[.12,.11,.11],x.BODY,{group:1});for(const u of[-1,1])o.ell(Q.add(f,[-.02,.15,u*.07]),[.12,.045,.02],x.BODY,{dir:[.1,1,u*.3],up:[1,0,0],group:1,paint:d=>d[0]>f[0]-.01?x.EAR:void 0});return oi(o,f,[.12,.11,.11],[[.7,.2,.5],[.7,.2,-.5]],.025,a?x.MAGIC2:x.EYE),o.ell(Mt.surface(f,[.12,.11,.11],[1,-.2,0]),[.025,.02,.03],x.NOSE,{group:1}),cn(o,n,e,i,.55,r)}function Tu(n,e,t,i,r="towards"){const a=e===3,s=new Mt,o=t?.03:0;s.seg([-.5,.18,0],[-.62,.12,0],.04,.02,x.SKIN,{group:3});for(const c of[-1,1])s.ell([-.3,.05,c*.2],[.07,.04,.05],x.SKIN,{group:c>0?6:2});s.ell([0,.3,0],[.52,.29,.33],x.BODY,{paint:c=>c[1]>.45?x.BODY2:void 0}),s.ell([.55,.24,0],[.2,.07,.07],x.SKIN,{dir:[1,-.15,0],group:1}),s.ell([.74,.21,0],[.04,.05,.06],x.NOSE,{group:1});for(const c of[-1,1]){const l=[.32,.1-(c>0?o:0),c*.34];s.ell(l,[.13,.035,.12],x.SKIN,{group:c>0?7:2,axes:[[1,0,0],[0,1,0],[0,0,1]]});for(let h=0;h<4;h++)s.ell(Q.add(l,[.14,-.01,c*(h-1.5)*.05]),[.05,.015,.015],x.ACCENT,{group:c>0?7:2})}for(const c of[-1,1])s.ell(Mt.surface([0,.3,0],[.52,.29,.33],Q.norm([.85,.3,c*.35])),[.015,.015,.015],a?x.MAGIC2:x.EYE,{group:1});return a&&Kl(s,[.15,.62,0],.15),cn(s,n,e,i,.55,r)}function Au(n,e,t,i,r="towards"){const a=e===3,s=f=>a&&n.legend.includes(f),o=new Mt;for(const f of[-1,1])for(let u=0;u<3;u++){const d=.25-u*.25,g=(u+(f>0?1:0)+t)%2?.06:-.06,_=[d,.22,f*.2];o.chain([[..._,.03],[d+g+(1-u)*.06,.32,f*.42,.025],[d+g*1.5+(1-u)*.15,.02,f*.55,.015]],f>0?x.BODY2:x.BODY3,{group:f>0?7:2})}o.ell([-.12,.34,0],[.46,.24,.32],x.BODY,{paint:f=>Math.abs(f[2])<.018&&f[1]>.4?x.LINE:f[1]>.5&&f[2]>.05&&f[2]<.17?x.BELLY:void 0}),o.ell([.38,.33,0],[.16,.16,.26],x.BODY,{group:1});const c=[.56,.3,0];o.ell(c,[.1,.1,.17],x.BODY2,{group:1});const l=[.3,.5,.7,.75][e]*(s("horn")?1.3:1),h=s("horn")?x.MAGIC:x.BODY3;for(const f of[-1,1]){const u=Q.add(c,[.08,.02,f*.1]),d=Q.add(u,[l*.7,l*.45,f*l*.15]),g=Q.add(d,[l*.25,-l*.12,-f*l*.12]);o.chain([[...u,.045],[...d,.035],[...g,.015]],h,{group:8+(f>0?1:0)}),o.seg(Q.lerp(u,d,.55),Q.add(Q.lerp(u,d,.55),[0,l*.22,0]),.02,.008,h,{group:8})}for(const f of[-1,1])o.chain([[...Q.add(c,[.05,.06,f*.1]),.012],[c[0]+.1,.5,f*.22,.012],[c[0]+.2,.5,f*.26,.012]],x.BODY3,{group:9,extra:!0});return oi(o,c,[.1,.1,.17],[[.4,.3,.85],[.4,.3,-.85]],.02,a?x.MAGIC2:x.GLINT),s("crystals")&&co(o,[[[-.35,.5,.1],.3],[[-.1,.55,-.08],.45],[[.1,.5,.1],.35]]),cn(o,n,e,i,.5,r)}function Ru(n,e,t,i,r="towards"){const a=e===3,s=new Mt,o=t?.04:0;s.ell([0,.07,0],[.6+o,.07,.17],x.SKIN,{group:1}),s.chain([[.45+o,.08,0,.1],[.6+o,.25,0,.09],[.68+o,.28,0,.08]],x.SKIN,{group:1});for(const h of[-1,1])s.seg([.7+o,.32,h*.04],[.78+o,.55,h*.1],.018,.014,x.SKIN,{group:5}),s.ell([.78+o,.57,h*.1],[.03,.03,.03],a?x.MAGIC2:x.EYE,{group:5});const c=[-.12,.4,0],l=a?x.MAGIC:x.BODY;return s.ell(c,[.32,.32,.22],l,{group:3,paint:h=>{const f=Math.atan2(h[1]-c[1],h[0]-c[0]);return((Math.hypot(h[0]-c[0],h[1]-c[1])/.32-f/(Math.PI*2)*.3)%.3+.3)%.3<.06?a?x.MAGIC2:x.BODY3:void 0}}),cn(s,n,e,i,.45,r)}function Cu(n,e,t,i,r="towards"){const a=e===3,s=new Mt;for(const o of[-1,1])for(let c=0;c<7;c++){const l=-.45+c*.15,h=(c+t)%2?.03:-.03;s.seg([l,.1,o*.22],[l+h,.01,o*.33],.025,.015,x.BODY3,{group:o>0?7:2})}for(const o of[-1,1])s.chain([[.5,.15,o*.08,.02],[.7,.3,o*.2,.015],[.82,.22,o*.26,.012]],x.BODY3,{group:9,extra:!0});return s.ell([0,.18,0],[.58,.2,.3],x.BODY,{paint:o=>(Math.floor((o[0]+.6)*9)%2&&o[1]>.2?x.BODY2:void 0)||(Math.abs((o[0]+.6)*9%1)<.12?x.LINE:void 0)}),oi(s,[0,.18,0],[.58,.2,.3],[[.92,.3,.25],[.92,.3,-.25]],.02,a?x.MAGIC2:x.EYE),a&&co(s,[[[-.3,.32,.05],.3],[[0,.37,-.05],.45],[[.25,.32,.05],.32]]),cn(s,n,e,i,.4,r)}function Pu(n,e,t,i,r="towards"){const a=e===3,s=e===1,o=d=>a&&n.legend.includes(d),c=new Mt,l=t?.7:0,h=[];for(let d=0;d<=12;d++){const g=d/12;h.push([-.9+g*1.2,.07,Math.sin(g*Math.PI*2+l)*.25*(1-g*.5),.03+.045*Math.sin(Math.min(1,g*1.4)*Math.PI/2)])}h.push([.38,.25,h[12][2],.07],[.42,.45,h[12][2]*.8,.065]),c.chain(h,x.BODY,{paint:d=>d[1]<.05&&d[0]<.35?x.BELLY:Tn([d[0]*1.5,d[1],d[2]],14,.3)?x.BODY3:void 0});const f=[.5,.5,h[13][2]*.8],u=s?.11:.09;if(c.ell(f,[u*1.5,u*.75,u],x.BODY,{dir:[1,-.15,0],group:1}),oi(c,f,[u*1.5,u*.75,u],[[.5,.5,.7],[.5,.5,-.7]],u*.22,a?x.MAGIC2:x.EYE),t||c.seg(Q.add(f,[u*1.4,-u*.2,0]),Q.add(f,[u*2.3,-u*.3,0]),.01,.008,x.SKIN,{group:1}),o("wings"))for(const d of[-1,1])Ea(c,[0,.2,d*.05],d,.9,t?.1:0,d>0?x.MAGIC2:x.MAGIC,x.MAGIC,40+(d>0?10:0));return cn(c,n,e,i,.45,r)}function Lu(n,e,t,i,r="towards"){const a=e===3,s=u=>a&&n.legend.includes(u),o=new Mt,c=t===0,l=.55,h=s("wingsBig")?1.45:1,f=s("wingsBig")?x.MAGIC:x.BODY;ql(o,0,.3*h);for(const u of[-1,1]){const d=c?.5:-.1,g=Q.norm([.35,d,u]),_=Q.norm([-.3,d*.6,u]);o.flat(Q.add([0,l,u*.05],Q.mul(g,.38*h)),g,Q.norm(Q.cross(g,[0,1,0])),.4*h,.24*h,Qi.spotted(f,x.BELLY,x.BODY3),{group:10+(u>0?1:0)}),o.flat(Q.add([-.05,l,u*.05],Q.mul(_,.26*h)),_,Q.norm(Q.cross(_,[0,1,0])),.27*h,.17*h,Qi.spotted(s("wingsBig")?x.MAGIC2:x.BODY2,x.BODY2,x.BODY2),{group:12+(u>0?1:0)}),o.chain([[.12,l+.08,u*.03,.015],[.2,l+.25,u*.1,.025],[.24,l+.32,u*.14,.012]],x.BODY2,{group:11})}return o.ell([0,l,0],[.22,.09,.09],x.BELLY,{group:1,paint:u=>Tn(u,30,.25)?x.BODY2:void 0}),o.ell([.17,l+.03,0],[.07,.07,.07],x.BELLY,{group:1}),oi(o,[.17,l+.03,0],[.07,.07,.07],[[.7,.3,.6],[.7,.3,-.6]],.02,a?x.MAGIC2:x.EYE),cn(o,n,e,i,.5,r)}function Du(n,e,t,i,r="towards"){const a=e===3,s=l=>a&&n.legend.includes(l),o=new Mt,c=t?.05:0;for(let l=0;l<9;l++){const h=l/8,f=-.6+h*1.15;o.ell([f,.12+Math.sin(h*Math.PI)*(.06+c),0],[.08,.1-h*.02,.12-h*.03],l<2?x.MAGIC2:l%2?x.BODY2:x.BODY,{group:1})}s("lantern")&&o.ell([-.75,.3,0],[.22,.22,.22],x.MAGIC2,{group:3,paint:l=>l[1]<.2?x.MAGIC:void 0});for(let l=0;l<6;l++)o.seg([-.2+l*.12,.05,.08],[-.2+l*.12+(l%2?.02:-.02)*(t?-1:1),0,.12],.015,.01,x.BODY3,{group:7});return o.ell([.6,.14,0],[.06,.06,.08],x.BODY3,{group:1}),oi(o,[.6,.14,0],[.06,.06,.08],[[.6,.3,.7],[.6,.3,-.7]],.015,a?x.MAGIC2:x.EYE),cn(o,n,e,i,.4,r)}function Iu(n,e,t,i,r="towards"){const a=e===3,s=h=>a&&n.legend.includes(h),o=new Mt,c=[.15,.28,0];for(const h of[-1,1])for(let f=0;f<4;f++){const u=-.6+f*.4,d=(f+(h>0?0:1)+t)%2?.05:-.05,g=Q.add(c,[.05-f*.04,0,h*.1]),_=Q.add(g,[Math.cos(u)*.3*(f<2?1:-.6)+d,.3,h*.3]),m=Q.add(g,[Math.cos(u)*.55*(f<2?1:-.8)+d*1.5,-.28,h*.55]);o.chain([[...g,.03],[..._,.028],[...m,.015]],h>0?x.BODY2:x.BODY3,{group:h>0?7:2})}o.ell([-.28,.38,0],[.34,.28,.3],x.BODY,{paint:h=>(Math.abs(h[2])<.03||Math.abs(h[0]+.28)<.03)&&h[1]>.45?x.BELLY:void 0}),o.ell(c,[.18,.13,.17],x.BODY2,{group:1});const l=s("eyesRing");for(const[h,f]of[[.05,.05],[.05,-.05],[.02,.1],[.02,-.1]])o.ell(Mt.surface(c,[.18,.13,.17],Q.norm([.9,h*6,f*4])),[.025,.025,.025],l?x.MAGIC2:x.EYE,{group:1});if(l)for(let h=0;h<5;h++){const f=Math.PI*(.2+h/4*.6);o.ell([-.3+Math.cos(f)*.2,.75+Math.sin(f)*.35,(h-2)*.12],[.06,.06,.06],x.MAGIC2,{group:95+h,extra:!0})}return cn(o,n,e,i,.5,r)}const Uu=new Map(Object.entries({owl:Su,hedgehog:bu,toad:Eu,raven:yu,bat:wu,mole:Tu,beetle:Au,snail:Ru,woodlouse:Cu,snake:Pu,moth:Lu,glowworm:Du,spider:Iu})),uo=[{id:"wolf",name:"Wolf",plan:"quad",hue:.08,sat:.24,val:.56,legend:["wings","mane"],q:{len:.64,chest:.42,tuck:.6,neck:.32,neckAng:.7,neckW:.42,hr:.26,snout:.82,snoutD:.7,ear:"point",earS:.82,tail:"brush",paw:"paw",legW:1.25,saddle:!0,belly:!0},tail:"up"},{id:"fox",name:"Fox",plan:"quad",q:{hgt:.8,len:.62,chest:.4,tuck:.5,neck:.3,neckAng:.7,neckW:.32,hr:.24,snout:1.05,snoutD:.5,snoutTaper:.6,ear:"point",earS:1.35,tail:"bushy",paw:"paw",legW:.9,belly:!0,socks:.3},hue:.06,sat:.8,val:.9,belly:"white",legend:["tails"]},{id:"badger",name:"Badger",plan:"quad",q:{hgt:.62,len:.78,chest:.2,tuck:.22,neck:.18,neckAng:.1,neckW:.5,hr:.26,snout:1,snoutD:.55,snoutTaper:.55,ear:"round",earS:.7,tail:"stub",paw:"paw",legW:1.35,legMat:x.BODY3,face:"badger",shaggy:!0},hue:.65,sat:.08,val:.45,legend:["crystals"]},{id:"boar",name:"Boar",plan:"quad",hue:.07,sat:.62,val:.5,legend:["tusksBig"],q:{len:.72,chest:.34,tuck:.42,neck:.2,neckAng:-.15,neckW:.55,hr:.27,snout:1.25,snoutD:.62,snoutTaper:.55,ear:"small",earS:.8,tail:"thin",paw:"hoof",legW:1.15,ridge:!0,tusks:!0,back:"hump",disc:!0},ridge:!0},{id:"stag",name:"Stag",plan:"quad",q:{hgt:1.3,len:.6,chest:.6,tuck:.7,neck:.55,neckAng:.95,neckW:.32,hr:.2,snout:1.15,snoutD:.6,snoutTaper:.65,ear:"point",earS:1.1,tail:"deer",paw:"hoof",legW:.75,antlers:"branch",rump:!0,spots:"young",belly:!0},hue:.08,sat:.5,val:.7,legend:["antlersGlow"]},{id:"hare",name:"Hare",plan:"quad",q:{hgt:.72,len:.5,chest:.4,tuck:.45,neck:.2,neckAng:.9,neckW:.35,hr:.27,snout:.65,snoutD:.7,ear:"long",earS:2.4,tail:"puff",paw:"paw",legW:.85,haunch:1.35,hindFoot:1.6,back:"arch",belly:!0,whiskers:!0},hue:.08,sat:.4,val:.72,legend:["jackalope"]},{id:"owl",name:"Owl",plan:"owl",hue:.08,sat:.5,val:.55,legend:["eyesRing","wings"]},{id:"bear",name:"Bear",plan:"quad",q:{hgt:1.15,len:.72,chest:.38,tuck:.4,neck:.25,neckAng:.3,neckW:.55,hr:.28,snout:.7,snoutD:.62,snoutTaper:.7,ear:"round",earS:.8,tail:"stub",paw:"paw",legW:1.55,back:"hump",muzzle:!0,shaggy:!0},hue:.07,sat:.55,val:.42,legend:["moss"]},{id:"hedgehog",name:"Hedgehog",plan:"hedgehog",hue:.08,sat:.4,val:.5,legend:["crystals"]},{id:"squirrel",name:"Squirrel",plan:"quad",q:{hgt:.55,len:.45,chest:.35,tuck:.4,neck:.2,neckAng:.9,neckW:.35,hr:.3,snout:.55,snoutD:.65,ear:"tuft",earS:1.1,tail:"squirrel",paw:"paw",legW:.8,haunch:1.3,back:"arch",belly:!0,whiskers:!0},hue:.03,sat:.75,val:.75,belly:"white",legend:["starTail"]},{id:"toad",name:"Toad",plan:"toad",hue:.2,sat:.5,val:.55,legend:["crown"]},{id:"otter",name:"Otter",plan:"quad",q:{hgt:.55,len:1,chest:.25,tuck:.25,neck:.3,neckAng:.35,neckW:.5,hr:.27,snout:.6,snoutD:.7,ear:"round",earS:.5,tail:"otter",paw:"paw",legW:1.1,muzzle:!0,belly:!0,whiskers:!0},hue:.07,sat:.55,val:.45,belly:"white",legend:["ribbons"]},{id:"lynx",name:"Lynx",plan:"quad",q:{hgt:.9,len:.55,chest:.5,tuck:.55,neck:.25,neckAng:.8,neckW:.4,hr:.27,snout:.5,snoutD:.75,snoutTaper:.8,ear:"tuft",earS:1,tail:"bob",paw:"paw",legW:1.2,cheeks:!0,spots:!0,belly:!0,whiskers:!0},hue:.09,sat:.45,val:.75,legend:["mane"]},{id:"elk",name:"Elk",plan:"quad",q:{hgt:1.4,len:.68,chest:.6,tuck:.66,neck:.45,neckAng:.75,neckW:.42,hr:.24,snout:1.6,snoutD:.9,snoutTaper:.85,ear:"point",earS:.9,tail:"stub",paw:"hoof",legW:.9,back:"hump",antlers:"palm",shaggy:!0},hue:.07,sat:.55,val:.38,legend:["antlersGlow","moss"]},{id:"raven",name:"Raven",plan:"raven",hue:.68,sat:.35,val:.3,legend:["wings","eyesRing"]},{id:"bat",name:"Bat",plan:"bat",hue:.78,sat:.25,val:.45,legend:["wingsBig"]},{id:"mole",name:"Mole",plan:"mole",hue:.7,sat:.15,val:.32,legend:["crown"]},{id:"beaver",name:"Beaver",plan:"quad",q:{hgt:.6,len:.65,chest:.2,tuck:.22,neck:.2,neckAng:.4,neckW:.55,hr:.28,snout:.6,snoutD:.75,ear:"round",earS:.45,tail:"flat",paw:"paw",legW:1.2,back:"arch",teeth:!0,whiskers:!0},hue:.06,sat:.6,val:.45,legend:["moss"]},{id:"stoat",name:"Stoat",plan:"quad",q:{hgt:.5,len:1,chest:.3,tuck:.33,neck:.35,neckAng:.6,neckW:.32,hr:.25,snout:.6,snoutD:.6,ear:"round",earS:.6,tail:"stoat",paw:"paw",legW:.8,belly:!0,back:"arch",whiskers:!0},hue:.1,sat:.25,val:.92,legend:["ribbons","mane"]},{id:"snail",name:"Snail",plan:"snail",hue:.08,sat:.45,val:.55,legend:["glowShell"]},{id:"ram",name:"Ram",plan:"quad",q:{hgt:.95,len:.6,chest:.48,tuck:.52,neck:.22,neckAng:.45,neckW:.48,hr:.25,snout:.85,snoutD:.75,snoutTaper:.8,ear:"small",earS:.7,tail:"stub",paw:"hoof",legW:.9,wool:!0,horns:"curl",face:"dark"},hue:.1,sat:.12,val:.88,legend:["hornsGlow"]},{id:"woodlouse",name:"Woodlouse",plan:"woodlouse",hue:.65,sat:.12,val:.45,legend:["crystals"]},{id:"snake",name:"Snake",plan:"snake",hue:.25,sat:.45,val:.45,legend:["wings"]},{id:"moth",name:"Moth",plan:"moth",hue:.1,sat:.3,val:.7,legend:["wingsBig"]},{id:"marten",name:"Pine marten",plan:"quad",q:{hgt:.55,len:.78,chest:.35,tuck:.38,neck:.3,neckAng:.55,neckW:.35,hr:.25,snout:.65,snoutD:.6,ear:"round",earS:.9,tail:"bushy",paw:"paw",legW:.85,belly:!0,back:"arch"},hue:.07,sat:.6,val:.45,legend:["mane"]},{id:"salamander",name:"Salamander",plan:"quad",q:{hgt:.42,len:.9,chest:.14,tuck:.14,neck:.12,neckAng:.05,neckW:.5,hr:.27,snout:.55,snoutD:.55,ear:"none",tail:"otter",paw:"paw",legW:1,spots:!0,spotMat:"belly"},hue:.1,sat:.1,val:.22,belly:"yellow",legend:["flames"]},{id:"glowworm",name:"Glow-worm",plan:"glowworm",hue:.12,sat:.4,val:.35,legend:["lantern"]},{id:"spider",name:"Spider",plan:"spider",hue:.07,sat:.45,val:.4,legend:["eyesRing"]},{id:"dormouse",name:"Dormouse",plan:"quad",q:{hgt:.38,len:.45,chest:.35,tuck:.38,neck:.15,neckAng:.6,neckW:.4,hr:.34,snout:.45,snoutD:.7,ear:"round",earS:.85,tail:"squirrel",paw:"paw",legW:.8,back:"arch",belly:!0,whiskers:!0,eyeK:1.6},hue:.09,sat:.6,val:.75,belly:"white",legend:["starTail"]},{id:"beetle",name:"Stag beetle",plan:"beetle",hue:.78,sat:.5,val:.35,legend:["horn","crystals"]}],Zl=Object.fromEntries(uo.map(n=>[n.id,n]));function Nu(n,e){const t=Zl[n],i=e.cVal/.85,r=e.cSat/.6,a=ye(t.hue,t.sat*r*e.sat,t.val*i),s=t.belly==="yellow"?[240,196,40]:t.belly==="white"||t.q?.face==="badger"?[236,232,222]:ye(t.hue+.03,t.sat*.5*r,Math.min(1,t.val*i*1.3+.08)),o=ye(e.magicHue+t.hue*.3,.6,1),c=ye(e.magicHue+t.hue*.3,.18,1),l=["boar","stag","elk","ram"].includes(t.id);return{[x.BODY]:a,[x.BODY2]:ye(t.hue+.02,Math.min(1,t.sat*r*1.2+.05),t.val*i*.66),[x.BODY3]:ye(t.hue+.03,Math.min(1,t.sat*r*1.3+.1),t.val*i*.4),[x.BELLY]:s,[x.ACCENT]:l?[236,226,200]:ye(t.hue+.05,t.sat*.6,Math.min(1,t.val*i*.5+.25)),[x.MAGIC]:o,[x.MAGIC2]:c,[x.LEAF]:ye(.3,.55,.55),[x.LEAF2]:ye(.25,.5,.75),[x.LEAF3]:ye(.33,.6,.35),[x.TRUNK]:ye(.07,.45,.32),[x.EYE]:[24,18,30],[x.PUPIL]:[70,40,90],[x.GLINT]:[255,255,245],[x.NOSE]:[38,28,36],[x.EAR]:ye(t.hue+.97,Math.min(1,t.sat*.6+.2),Math.min(1,t.val*i*.55+.2)),[x.IRIS]:t.plan==="owl"?[255,176,40]:ye(.12,.7,.85),[x.SKIN]:[238,158,192]}}const Fu=["size","growth","pixel","head","eye","legs","long","fur"],lr=new Map;function Ou(n,e,t,i,r="towards"){const a=Zl[n]||uo[0],s=[a.id,e,t,r,...Fu.map(c=>i[c])].join("|");let o=lr.get(s);return o||(o=a.q?xu(a,e,t,i,r):Uu.get(a.plan)(a,e,t,i,r),lr.size>600&&lr.delete(lr.keys().next().value),lr.set(s,o)),o}const Ye=(...n)=>({l:n}),pt=(n,e,t,i,r)=>({a:[n,e,t,i,r]}),Bt=(n,e)=>({d:[n,e]}),st=(n,e=.86)=>Ye([.5,e],[.5,n]),ot=pt(.5,.76,.13,25,155),Bu=n=>n.l?{l:n.l.map(([e,t])=>[1-e,t])}:n.a?{a:[1-n.a[0],n.a[1],n.a[2],180-n.a[3],180-n.a[4]]}:{d:[1-n.d[0],n.d[1]]},lt=(...n)=>n.flatMap(e=>[e,Bu(e)]);function Dn(n,e,t){const i=e[0]-n[0],r=e[1]-n[1],a=Math.hypot(i,r),s=t*a,o=(a*a/4+s*s)/(2*Math.abs(s)),c=(n[0]+e[0])/2,l=(n[1]+e[1])/2,h=r/a,f=-i/a,u=(o-Math.abs(s))*Math.sign(s),d=c-h*u,g=l-f*u,_=Math.atan2(n[1]-g,n[0]-d)*180/Math.PI;let p=Math.atan2(e[1]-g,e[0]-d)*180/Math.PI-_;for(;p>180;)p-=360;for(;p<-180;)p+=360;return pt(d,g,o,_,_+p)}const zu=(n,e,t,i,r,a=24)=>Ye(...Array.from({length:a+1},(s,o)=>[n+i*Math.sin(o/a*r*2*Math.PI),e+(t-e)*o/a])),ku=(n,e,t,i,r,a=0,s=40)=>Ye(...Array.from({length:s+1},(o,c)=>{const l=c/s,h=(a+l*r*360)*Math.PI/180,f=t+(i-t)*l;return[n+f*Math.cos(h),e+f*Math.sin(h)]})),Ur=(n,e,t,i,r)=>r.map(a=>{const s=Math.cos(a*Math.PI/180),o=Math.sin(a*Math.PI/180);return Ye([n+t*s,e+t*o],[n+i*s,e+i*o])});st(.3),Ye([.28,.08],[.5,.3],[.72,.08]),pt(.5,.55,.2,-55,55),Bt(.5+.2*Math.cos(-55*Math.PI/180),.55+.2*Math.sin(-55*Math.PI/180)),st(.34),Ye([.36,.06],[.5,.34],[.64,.06]),pt(.67,.66,.17,180,-80),Bt(.67+.17*Math.cos(-80*Math.PI/180),.66+.17*Math.sin(-80*Math.PI/180)),[st(.1),Ye([.24,.3],[.76,.3]),...lt(Ye([.33,.14],[.33,.56])),...lt(Bt(.24,.3))],[st(.16),...lt(pt(.36,.24,.15,45,180)),...Ur(.5,.16,0,.1,[-130,-90,-50])],[st(.42),...lt(Ye([.5,.42],[.34,.26],[.3,.06]),Ye([.335,.25],[.16,.2]),Ye([.32,.15],[.18,.07]))],[st(.44),...lt(Ye([.5,.44],[.4,.34],[.38,.06])),pt(.62,.66,.09,180,540),...lt(Bt(.38,.06))],[st(.44),...lt(pt(.33,.3,.13,0,360),Ye([.24,.18],[.18,.05])),...lt(Bt(.33,.3))],[st(.24),Ye([.24,.3],[.76,.3]),...lt(pt(.3,.3,.09,180,360)),...lt(Ye([.36,.5],[.32,.62]))],[st(.52),pt(.5,.52,.2,180,360),...Ur(.5,.52,.22,.34,[-160,-125,-90,-55,-20])],st(.2),Ye([.5,.2],[.4,.08]),pt(.66,.4,.16,100,-200),Bt(.66+.16*Math.cos(-200*Math.PI/180),.4+.16*Math.sin(-200*Math.PI/180)),[st(.42),Ye([.16,.54],[.24,.42],[.76,.42],[.84,.54]),...lt(pt(.34,.3,.1,0,360)),...lt(Bt(.16,.54))],st(.24),pt(.5,.5,.28,-100,100),Bt(.5+.28*Math.cos(-100*Math.PI/180),.5+.28*Math.sin(-100*Math.PI/180)),Dn([.18,.64],[.36,.64],.3),[st(.32),Ye([.26,.2],[.5,.32],[.74,.2]),...lt(Ye([.26,.2],[.26,.06])),Ye([.5,.68],[.66,.62]),...lt(Bt(.26,.06))],[st(.3),...lt(Ye([.5,.3],[.42,.2]),pt(.3,.16,.12,0,180),Ye([.18,.16],[.14,.06])),Ye([.5,.44],[.6,.52])],[st(.14),Ye([.5,.14],[.3,.22]),Ye([.18,.56],[.5,.38],[.82,.56]),Bt(.58,.17),...lt(Bt(.18,.56))],[st(.3),pt(.5,.16,.14,20,160),...lt(Ye([.5,.38],[.12,.26]),Dn([.12,.26],[.24,.46],-.25),Dn([.24,.46],[.38,.5],-.3),Dn([.38,.5],[.5,.52],-.3))],[st(.44),pt(.5,.3,.16,0,180),...Ur(.5,.3,.19,.3,[-160,-125,-55,-20]),Ye([.5,.14],[.5,.04])],[st(.36),Ye([.32,.2],[.68,.2]),...lt(Ye([.44,.2],[.44,.34])),Ye([.5,.56],[.68,.66],[.5,.76],[.32,.66],[.5,.56])],[st(.18),pt(.5,.44,.24,180,360),Ye([.5,.18],[.6,.08]),...lt(Bt(.26,.44))],st(.52),ku(.5,.33,.03,.2,1.6,90),Ye([.66,.2],[.76,.06]),Bt(.76,.06),[st(.24),...lt(pt(.36,.24,.14,0,-250)),...lt(Bt(.36+.14*Math.cos(-250*Math.PI/180),.24+.14*Math.sin(-250*Math.PI/180)))],[st(.24),pt(.5,.52,.22,205,335),pt(.5,.66,.24,205,335),pt(.5,.38,.2,205,335),...lt(Ye([.5,.24],[.32,.06]))],[st(.16),zu(.5,.82,.2,.2,1.25),Ye([.5,.2],[.5,.11]),...lt(Ye([.5,.11],[.42,.045]))],[st(.2),...lt(Ye([.5,.3],[.16,.18],[.24,.5],[.5,.4]),Ye([.5,.5],[.3,.64],[.5,.66]),pt(.38,.16,.12,0,-110))],[st(.32),Ye([.3,.2],[.5,.32],[.7,.2]),...lt(pt(.3,.14,.07,90,-180)),pt(.28,.56,.22,0,150),Bt(.28+.22*Math.cos(150*Math.PI/180),.56+.22*Math.sin(150*Math.PI/180))],[st(.3),Dn([.5,.3],[.5,.06],.35),Dn([.5,.3],[.5,.06],-.35),...lt(Ye([.5,.42],[.32,.38],[.26,.48]),Ye([.5,.64],[.32,.6],[.26,.7])),...lt(Bt(.38,.52))],[st(.4),pt(.5,.27,.1,90,450),...Ur(.5,.27,.15,.25,[0,60,120,180,240,300])],[Ye([.5,.05],[.5,.3]),st(.5),pt(.5,.4,.11,-90,270),...lt(...[-150,-170,170,150].map(n=>Ye([.5+.12*Math.cos(n*Math.PI/180),.4+.12*Math.sin(n*Math.PI/180)],[.5+.28*Math.cos(n*Math.PI/180),.4+.28*Math.sin(n*Math.PI/180)],[.5+.32*Math.cos(n*Math.PI/180),.4+.28*Math.sin(n*Math.PI/180)+.1]))),Bt(.5,.05)],[st(.12),pt(.5,.46,.24,-60,250),...lt(pt(.34,.16,.08,90,-180)),Dn([.56,.38],[.7,.38],-.4)],[st(.36),...lt(pt(.66,.26,.2,160,250)),Dn([.5,.38],[.5,.82],.25),Dn([.5,.38],[.5,.82],-.25)];uo.map(n=>n.id);const Gu=new Set([x.TRUNK,x.BARK2,x.BARKD,x.BARKL]);function Si(n,e,t,i,r,a,{mat:s=x.LEAF,group:o=30,ragged:c=1}={}){const h=[];for(let p=0;p<9;p++){const M=p/9*Math.PI*2,y=1+(a()-.5)*.35*(r.clump+.3);h.push([e[0]+Math.cos(M)*t*y,e[1]+Math.sin(M)*i*y*(Math.sin(M)>0?.8:1)])}const f=Math.max(1,Math.round(Math.min(t,i)/3.5));n.shape(Sa(h,0,9,f,Math.max(1.2,Math.min(t,i)*.14)*c,1),s,{group:o,line:!1,round:r.round}),n.mark([vt(e,[-t*1.1,i*.15]),vt(e,[t*1.1,i*.1]),vt(e,[t*1.1,i*1.2]),vt(e,[-t*1.1,i*1.2])],x.LEAF3,[s]),n.mark([vt(e,[-t*.75,-i*.55]),vt(e,[t*.25,-i*.95]),vt(e,[t*.55,-i*.35]),vt(e,[-t*.2,-i*.05])],x.LEAF2,[s]);const u=Math.floor(e[0]-t*1.2),d=Math.ceil(e[0]+t*1.2),g=Math.floor(e[1]-i*1.2),_=Math.ceil(e[1]+i*1.2),m=a()*1e4|0;for(let p=g;p<=_;p++)for(let M=u;M<=d;M++){const y=n.get(M,p);if(y!==s&&y!==x.LEAF2&&y!==x.LEAF3)continue;const b=Zt(M,p,m),A=ii(M/2,p/2,m)*.5+b*.5;A<.16*r.density?n.recolour(M,p,y===x.LEAF2?s:x.LEAF2):A>1-.16*r.density&&n.recolour(M,p,y===x.LEAF3?s:x.LEAF3)}}function si(n,e,t,i,r,a,s,o,{mat:c=x.TRUNK,bend:l=1,group:h=10,line:f=!1}={}){const u=[e],d=4;let g=t,_=e;for(let m=1;m<=d;m++)g+=(o()-.5)*.7*s.gnarl*l,_=vt(_,[Math.cos(g)*i/d,Math.sin(g)*i/d]),u.push(_);return n.limb(u.map((m,p)=>[...m,r+(a-r)*p/d]),c,{group:h,line:f,round:s.round,cap:.6,capEnd:1}),{end:_,ang:g,pts:u}}function ya(n,e,t,i,r,a,s){if(n.shape([[e-i*1.05,t],[e-i*.62,t-i*.5],[e-i*.45,t-i*1.4],[e+i*.45,t-i*1.4],[e+i*.62,t-i*.5],[e+i*1.05,t]],x.TRUNK,{group:10,round:r.round}),r.roots<=0)return;const o=Math.round(2+r.roots*4);for(let c=0;c<o;c++){const l=c%2?1:-1,h=(8+a()*16)*s*(.4+r.roots),f=(2+a()*3)*s,u=[e+l*i*.2,t-i*.5],d=[e+l*(i*.55+h*.4),t-f],g=[e+l*(i*.5+h),t-.5];n.limb([[...u,i*.55],[...d,i*.28],[...g,1.2]],x.TRUNK,{group:11,round:r.round,cap:.5,capEnd:.6})}}function wa(n,e,t=!0){if(!(e.bark<=0))for(let i=0;i<n.h;i++)for(let r=0;r<n.w;r++){const a=i*n.w+r;if(n.m[a]!==x.TRUNK)continue;const s=t?ii(r/1.3,i/6,21):ii(r/6,i/1.3,21);s>1-e.bark*.42||Zt(r,i,4)<e.bark*.05?n.m[a]=x.BARKD:s>1-e.bark*.62&&n.n[a*3]<-.1&&(n.m[a]=x.BARKL)}}function ji(n,e,t){let i=n.w,r=-1,a=n.h;for(let u=0;u<n.h;u++)for(let d=0;d<n.w;d++)n.m[u*n.w+d]&&(i=Math.min(i,d),r=Math.max(r,d),a=Math.min(a,u));if(r<0)return{sp:n,crownY:t};const s=Math.max(e-i,r-e)+2,o=Math.max(0,Math.floor(e-s)),c=Math.min(n.w-o,Math.ceil(s*2)+1),l=Math.max(0,a-1),h=n.h-l,f=new Jt(c,h);for(let u=0;u<h;u++)for(let d=0;d<c;d++){const g=(u+l)*n.w+d+o,_=u*c+d;f.m[_]=n.m[g],f.g[_]=n.g[g],f.n[_*3]=n.n[g*3],f.n[_*3+1]=n.n[g*3+1],f.n[_*3+2]=n.n[g*3+2]}return{sp:f,crownY:t-l}}const Cr=n=>(n.crownWidth||3)/3;function $l(n,e,t){const i=Cr(e),r=Math.round(220*t*i+60*t),a=Math.round(140*t),s=new Jt(r,a),o=r/2,c=a,l=e.treeTrunks||1,h=12*t*(e.treeThick||1)*(e.treeThin?.55:1)/Math.sqrt(l),f=(n()-.5)*.5*e.gnarl+(e.treeLean||0),u=[];let d=a;const g=(_,m,p,M,y)=>{const b=si(s,_,m,p,M,M*.65,e,n,{group:12});if(y===0){u.push(b.end);return}const A=n()<.35?3:2;for(let w=0;w<A;w++){const C=(w-(A-1)/2)*Se(n,.5,.85)*(y===3?1.4:1);g(b.end,b.ang+C+(n()-.5)*.25,p*Se(n,.6,.78),M*.62,y-1)}y<=2&&u.push(Gn(_,b.end,.7))};for(let _=0;_<l;_++){const m=f+(l>1?(_/(l-1)-.5)*.8:0),p=[o+(_-(l-1)/2)*h*.6,c],M=si(s,p,-Math.PI/2+m,a*.36*(l>1?Se(n,.75,1.15):1),h,h*.72,e,n,{bend:1.4});d=Math.min(d,M.end[1]);for(const y of[-1,1])g(M.end,-Math.PI/2+m*.5+y*Se(n,.55,.95)*(.7+.3*i)*(l>1?.6:1),a*.22*(.75+.25*i)*(l>1?.7:1),h*.7,l>2?2:3);if(l===1&&n()<.7&&g(M.end,-Math.PI/2+(n()-.5)*.3,a*.18,h*.55,2),_===0&&e.treeHollow){const y=Gn(p,M.end,.38);s.ellipse(y[0],y[1],h*.28,h*.5,x.NOSE,{round:.3})}}if(ya(s,o,c,h*Math.sqrt(l),e,n,t),wa(s,e),e.treeWebs)for(let _=0;_+1<u.length;_+=2){const m=u[_],p=u[_+1],M=Math.hypot(p[0]-m[0],p[1]-m[1]);if(M<40*t)for(let y=0;y<=M;y++){const b=Gn(m,p,y/M);s.px(b[0],b[1]+Math.sin(y/M*Math.PI)*M*.15,x.GLINT,0,0,1)}}if(e.treeBare)return ji(s,o,d+4*t);u.sort((_,m)=>_[1]-m[1]);for(const _ of u)Si(s,vt(_,[0,-3*t]),Se(n,14,21)*t,Se(n,10,14)*t,e,n,{mat:n()<.35?x.LEAF3:x.LEAF});for(const _ of u)n()<.75&&Si(s,vt(_,[Se(n,-9,9)*t,Se(n,-12,-3)*t]),Se(n,10,15)*t,Se(n,7,10)*t,e,n);return ji(s,o,d+4*t)}function ho(n,e,t){const i=.8+.2*Cr(e),r=Math.round(90*t*i),a=Math.round(160*t),s=new Jt(r,a),o=r/2,c=a;s.limb([[o,c,6*t],[o,c-a*.5,4*t],[o,6*t,1.5]],x.TRUNK,{group:10,round:e.round}),ya(s,o,c,6*t,e,n,t*.6),wa(s,e);const l=Math.round(Se(n,9,12));for(let h=l-1;h>=0;h--){const f=h/(l-1),u=6*t+f*a*.7,d=(5+f*36)*t*i*Se(n,.9,1.1),g=(5+f*13)*t,_=[[o,u-4*t],[o+d*.5,u+g*.3],[o+d,u+g],[o+d*.7,u+g*1.15],[o,u+g*.7],[o-d*.7,u+g*1.15],[o-d,u+g],[o-d*.5,u+g*.3]];s.shape(Sa(_,1,7,Math.max(2,Math.round(d/(3*t))),2*t,1),x.LEAF,{group:30+h,line:!1,round:e.round}),s.mark([[o-d,u+g*.55],[o+d,u+g*.55],[o+d,u+g*1.4],[o-d,u+g*1.4]],x.LEAF3,[x.LEAF]),s.mark([[o-d*.55,u-2*t],[o+d*.1,u-3*t],[o+d*.1,u+g*.45],[o-d*.7,u+g*.7]],x.LEAF2,[x.LEAF])}return ji(s,o,a*.82)}function Jl(n,e,t){const i=Cr(e),r=Math.round(200*t*i+50*t),a=Math.round(130*t),s=new Jt(r,a),o=r/2,c=a,l=13*t,h=si(s,[o,c],-Math.PI/2+(n()-.5)*.3,a*.3,l,l*.8,e,n,{bend:1.6}),f=[];for(let g=0;g<5;g++){const _=g%2?1:-1,m=-Math.PI/2+_*Se(n,.55,1.25)*(.7+.3*i),p=si(s,h.end,m,a*Se(n,.3,.42)*(.8+.2*i),l*.55,l*.3,e,n,{group:12});f.push(p.end)}ya(s,o,c,l,e,n,t),wa(s,e);for(const g of f)Si(s,vt(g,[0,-2*t]),Se(n,20,28)*t,Se(n,9,12)*t,e,n);Si(s,vt(h.end,[0,-8*t]),24*t,11*t,e,n);let u=r,d=0;for(const g of f)u=Math.min(u,g[0]-22*t),d=Math.max(d,g[0]+22*t);for(let g=u;g<d;g+=Se(n,1,1.7)){let _=a;for(let y=0;y<a;y++)if(s.get(g,y)===x.LEAF||s.get(g,y)===x.LEAF2||s.get(g,y)===x.LEAF3){_=y;break}if(_>=a)continue;const m=Math.abs(g-o)/(r/2),p=(c-_)*Se(n,.5,.9)*(1-m*.3),M=Zt(g|0,1,9)<.4?x.LEAF2:x.LEAF;for(let y=_+2;y<Math.min(c-2,_+p);y++){const b=Math.round(Math.sin(y*.12+g)*.7);Zt(g|0,y,5)<.2+e.density*.8&&s.px(g+b,y,(y-_)/p>.8?x.LEAF3:M,b*.3,.2,.95)}}return ji(s,o,h.end[1]+6*t)}function Ql(n,e,t){const i=.7+.3*Cr(e),r=Math.round(110*t*i),a=Math.round(155*t),s=new Jt(r,a),o=r/2,c=a,l=(n()-.5)*.25+(e.treeLean||0),h=si(s,[o,c],-Math.PI/2+l,a*.85,5*t,2*t,e,n,{mat:x.BARK2,bend:.4});for(let u=0;u<h.pts.length-1;u++)for(let d=0;d<1;d+=1/8){const g=Gn(h.pts[u],h.pts[u+1],d+n()*.1);if(n()<.55)for(let _=-3;_<=3;_++)s.get(g[0]+_,g[1])===x.BARK2&&n()<.8&&s.recolour(g[0]+_,g[1],x.BARKD)}const f=[h.end];for(let u=0;u<7;u++){const d=Se(n,.35,.9),g=Gn(h.pts[0],h.end,d),_=u%2?1:-1,m=si(s,g,-Math.PI/2+_*Se(n,.5,1),a*Se(n,.12,.2)*i,2*t,1,e,n,{mat:x.BARKD,group:12});f.push(m.end)}for(const u of f)Si(s,u,Se(n,9,13)*t*i,Se(n,7,10)*t,e,n,{mat:x.LEAF2,ragged:1.3});return ji(s,o,a*.55)}function jl(n,e,t){const i=Cr(e),r=Math.round(220*t*i+50*t),a=Math.round(120*t),s=new Jt(r,a),o=r/2,c=a,l=10*t,h=si(s,[o,c],-Math.PI/2+(n()-.5)*.4*(e.gnarl+.3),a*.4,l,l*.75,e,n,{bend:1.2}),f=[];for(const g of[-1,1,-1,1]){const _=si(s,h.end,-Math.PI/2+g*Se(n,.7,1.15)*(.7+.3*i),a*Se(n,.3,.42)*(.7+.3*i),l*.55,l*.25,e,n,{group:12});f.push(_.end,Gn(h.end,_.end,.55))}ya(s,o,c,l,e,n,t),wa(s,e);const u=Math.round(Se(n,2,3)),d=Math.min(...f.map(g=>g[1]));for(let g=0;g<u;g++){const _=d-6*t+g*9*t,m=(95-g*12)*t*(.65+.35*i);for(let p=0;p<5;p++)Si(s,[o+(p-2)*m*.36+Se(n,-5,5)*t,_+Se(n,-3,3)*t],m*Se(n,.2,.26),7*t,e,n,{mat:g===u-1?x.LEAF:x.LEAF3})}return ji(s,o,h.end[1]+4*t)}function fo(n,e,t){const i=e.leafHue+(n()-.5)*e.leafVariety*.7+(t===ho?.06:0);return{[x.TRUNK]:ye(e.trunkHue,.45*e.sat,.34),[x.BARKD]:ye(e.trunkHue+.03,.5*e.sat,.17),[x.BARKL]:ye(e.trunkHue-.01,.38*e.sat,.5),[x.BARK2]:[222,220,212],[x.LEAF]:ye(i,.62*e.sat,.58),[x.LEAF2]:ye(i-.05,.55*e.sat,.8),[x.LEAF3]:ye(i+.03,.66*e.sat,.38)}}function Hu(n){const{sp:e,crownY:t}=n,i=new Jt(e.w,e.h),r=new Jt(e.w,e.h);for(let a=0;a<e.h;a++)for(let s=0;s<e.w;s++){const o=a*e.w+s,c=e.m[o];if(!c)continue;(Gu.has(c)&&a>=t?r:i).put(s,a,c,e.n[o*3],e.n[o*3+1],e.n[o*3+2])}return{top:i,bot:r}}function Vu(n,e){const t=e.bushSize,i=Yl(n,["round","round","fern","grass","shrub"]),r=Math.round(40*t),a=Math.round(28*t),s=new Jt(r,a);if(i==="round"||i==="shrub"){const c=i==="shrub"?5:3;for(let l=0;l<c;l++)Si(s,[r/2+Se(n,-9,9)*t,a-8*t+Se(n,-4,2)*t],Se(n,7,10)*t,Se(n,5,8)*t,e,n);if(i==="shrub"||n()<e.flowers)for(let l=0;l<18*e.flowers+3;l++){const h=r/2+Se(n,-12,12)*t,f=a-Se(n,5,17)*t;s.get(h,f)&&s.recolour(h,f,x.FLOWER)}}else if(i==="fern")for(let c=0;c<7;c++){const l=-Math.PI/2+(c/6-.5)*2.4;let h=r/2,f=a-1;for(let u=0;u<15*t;u++)h+=Math.cos(l)*.9,f+=Math.sin(l)*.9+u*.06,s.put(h,f,c%2?x.LEAF3:x.LEAF,Math.cos(l)*.4,-.2,.9),u%2&&(s.put(h,f-1,x.LEAF2,0,-.5,.85),s.put(h+Math.sign(Math.cos(l)),f+1,x.LEAF,0,.3,.9))}else for(let c=0;c<18*t;c++){const l=r/2+Se(n,-13,13)*t,h=Se(n,5,15)*t,f=Se(n,-3,3);for(let u=0;u<h;u++)s.put(l+f*u/h*(u/h),a-1-u,u>h*.65?x.LEAF2:u<h*.3?x.LEAF3:x.LEAF,f*.1,-.3,.9)}const o=fo(n,e,null);return o[x.FLOWER]=ye(n(),.55,.95),{sp:s,colours:o}}const nt=(n,e={})=>["tree",{type:n,...e}],Ne=(n,e={})=>[n,e],po=[{id:"moor",name:"Moor",creature:"badger",by:"Ed",leaf:.24,floor:["moss",.26,.45,.42],text:{floor:"moss",wall:"puddles, a lake",small:"long grass",big:"moss mounds"},wall:[Ne("water",{w:1.6})],small:[Ne("grass",{h:1.4})],big:[Ne("mound",{moss:!0})]},{id:"fern-forest",name:"Fern forest",creature:"boar",by:"Ed",leaf:.3,floor:["needles",.08,.45,.32],text:{floor:"pine needles",small:"ferns",big:"pine trees"},small:[Ne("fern")],big:[nt("fir")]},{id:"muddy-forest",name:"Muddy forest",creature:"snail",by:"Ed",leaf:.22,floor:["mud",.07,.5,.28],text:{floor:"mud and leaves",small:"short trunks with broken branches",big:"trees with many trunks and branches"},small:[Ne("stump",{snag:!0})],big:[nt("broad",{trunks:3,gnarl:.9})]},{id:"stone-shrine",name:"Stone shrine",creature:"fox",by:"Ed",leaf:.28,floor:["stony",.25,.3,.45],text:{floor:"grassy, stony",wall:"mossy henges",small:"little stones",big:"big stones",set:"a shrine"},wall:[Ne("henge")],small:[Ne("stones")],big:[Ne("boulder")],set:Ne("shrine")},{id:"tangly-forest",name:"Tangly forest",creature:"ram",by:"Ed",leaf:.27,floor:["nettles",.28,.5,.3],text:{floor:"nettles and earth",small:"tangled branches",big:"fairly short tangly trees"},small:[Ne("bramble",{bare:!0})],big:[nt("broad",{scale:.7,gnarl:1})]},{id:"wispy-forest",name:"Wispy forest",creature:"woodlouse",by:"Ed",leaf:.2,floor:["leaves",.09,.55,.45],text:{floor:"dry leaves",small:"tall thin wispy trees",big:"thick trees with several trunks"},small:[nt("birch",{scale:.75})],big:[nt("broad",{trunks:3,thick:1.4})]},{id:"hazel-forest",name:"Hazel forest",creature:"hedgehog",by:"Ed",leaf:.26,floor:["grass",.24,.45,.45],text:{floor:"short grass",small:"brown lumps",big:"crooked trees with many branches"},small:[Ne("mound",{brown:!0})],big:[nt("broad",{gnarl:1,scale:.85})]},{id:"garden",name:"Garden",creature:"squirrel",by:"Ed",leaf:.3,floor:["lawn",.27,.5,.5],text:{floor:"uniform grass",wall:"ornate stone wall",small:"manicured flower beds",big:"willows",set:"a stone pavilion"},wall:[Ne("wall")],small:[Ne("flowerbed")],big:[nt("willow")],set:Ne("pavilion")},{id:"twiggy-forest",name:"Twiggy forest",creature:"wolf",by:"Ed",leaf:.29,floor:["plants",.3,.5,.38],text:{floor:"small leafy plants",small:"small trees with many thin trunks",big:"straight but slanted trees with many trunks"},small:[nt("broad",{trunks:4,scale:.5,thin:!0})],big:[nt("broad",{trunks:3,lean:.3,gnarl:.1})]},{id:"ancient",name:"Ancient",creature:"stag",by:"Ed",leaf:.31,floor:["roots",.1,.25,.35],text:{floor:"mossy roots over rocks",small:"sorrel",big:"giant gnarly slanted trees"},small:[Ne("flowers",{hue:.98,leafy:!0})],big:[nt("broad",{scale:1.4,gnarl:1,lean:.35})]},{id:"norway",name:"Norway",creature:"stoat",by:"Ed",leaf:.36,floor:["slate",.6,.15,.35],text:{floor:"pine needles and slate",small:"rocks",big:"straight pines"},small:[Ne("stones",{big:!0})],big:[nt("fir",{scale:1.2})]},{id:"alder-forest",name:"Alder forest",creature:"snake",by:"Ed",leaf:.23,floor:["tallgrass",.22,.45,.42],text:{floor:"tall and short grass",small:"tree stumps with tall grass around",big:"tall slanted trees with thin leaves at different heights"},small:[Ne("stump",{grass:!0})],big:[nt("birch",{lean:.3,scale:1.2,dark:!0})]},{id:"meadow",name:"Meadow",creature:"hare",by:"draft",leaf:.25,floor:["flowers",.25,.5,.5],text:{floor:"grass and wildflowers",small:"scattered hawthorn",big:"lone oaks"},small:[Ne("shrub",{flower:[250,245,235]})],big:[nt("broad",{scale:1.1})]},{id:"old-oaks",name:"Old oaks",creature:"owl",by:"draft",leaf:.22,floor:["leaves",.07,.5,.35],text:{floor:"leaf litter",small:"acorns, fallen branches",big:"ancient gnarled oaks with hollow trunks",set:"a great hollow oak"},small:[Ne("cones",{acorn:!0}),Ne("log",{branch:!0})],big:[nt("broad",{gnarl:.9,hollow:!0})],set:nt("broad",{scale:1.6,gnarl:1,hollow:!0})},{id:"berry-thicket",name:"Berry thicket",creature:"bear",by:"draft",leaf:.32,floor:["needles",.08,.45,.3],text:{floor:"pine needles",wall:"bramble thickets",small:"berry bushes",big:"tall pines"},wall:[Ne("bramble")],small:[Ne("shrub",{flower:[200,30,60]})],big:[nt("fir",{scale:1.3})]},{id:"wetland",name:"Wetland",creature:"toad",by:"draft",leaf:.2,floor:["mud",.15,.45,.3],text:{floor:"wet mud",wall:"puddles, reeds",small:"reeds and rushes",big:"willows"},wall:[Ne("water"),Ne("reeds",{tall:!0})],small:[Ne("reeds")],big:[nt("willow")]},{id:"stream",name:"Stream",creature:"otter",by:"draft",leaf:.27,floor:["pebbles",.25,.3,.45],text:{floor:"pebbles and grass",wall:"a stream or pond",small:"alder saplings",big:"alders",set:"a fallen-log bridge"},wall:[Ne("water",{w:2})],small:[nt("broad",{scale:.45})],big:[nt("broad",{scale:.95,gnarl:.3})],set:Ne("bridge")},{id:"rocky-slope",name:"Rocky slope",creature:"lynx",by:"draft",leaf:.34,floor:["scree",.2,.2,.42],text:{floor:"scree and moss",wall:"boulders",small:"rocks",big:"pines",set:"a rocky outcrop"},wall:[Ne("boulder",{big:!0})],small:[Ne("stones",{big:!0})],big:[nt("fir")],set:Ne("outcrop")},{id:"bog",name:"Bog",creature:"elk",by:"draft",leaf:.38,floor:["moss",.18,.55,.4],text:{floor:"sphagnum moss",wall:"bog pools",small:"cotton grass",big:"spruce"},wall:[Ne("water",{bog:!0})],small:[Ne("reeds",{cotton:!0})],big:[nt("fir",{dark:!0})]},{id:"deadwood",name:"Deadwood",creature:"raven",by:"draft",leaf:.15,floor:["earth",.07,.35,.3],text:{floor:"bare earth",small:"broken branches",big:"blasted dead trees"},small:[Ne("log",{branch:!0})],big:[nt("broad",{bare:!0,gnarl:1})]},{id:"cave-mouth",name:"Cave mouth",creature:"bat",by:"draft",leaf:.2,floor:["stone",.08,.15,.35],text:{floor:"stone and roots",wall:"rock walls",small:"stalagmite stubs",big:"dead trees",set:"a cave mouth"},wall:[Ne("rockwall")],small:[Ne("stalagmite")],big:[nt("broad",{bare:!0})],set:Ne("cave")},{id:"grassland",name:"Grassland",creature:"mole",by:"draft",leaf:.25,floor:["grass",.26,.5,.48],text:{floor:"short turf",small:"molehills",big:"lone birches"},small:[Ne("mound",{brown:!0,small:!0})],big:[nt("birch")]},{id:"beaver-pond",name:"Beaver pond",creature:"beaver",by:"draft",leaf:.17,floor:["leaves",.13,.6,.5],text:{floor:"birch leaves",wall:"a pond",small:"stumps",big:"birch and aspen",set:"a beaver dam"},wall:[Ne("water",{w:2})],small:[Ne("stump",{gnawed:!0})],big:[nt("birch")],set:Ne("dam")},{id:"log-pile",name:"Log pile",creature:"beetle",by:"draft",leaf:.22,floor:["leaves",.06,.5,.3],text:{floor:"rotting leaves",small:"fungi",big:"rotting logs",set:"a fallen giant"},small:[Ne("fungi")],big:[Ne("log",{rot:!0})],set:Ne("log",{rot:!0,giant:!0})},{id:"heath",name:"Heath",creature:"moth",by:"draft",leaf:.27,floor:["heather",.85,.35,.4],text:{floor:"heather",small:"gorse",big:"wind-bent birches"},small:[Ne("shrub",{flower:[250,205,40],spiky:!0})],big:[nt("birch",{lean:.45,scale:.75})]},{id:"old-pinewood",name:"Old pinewood",creature:"marten",by:"draft",leaf:.35,floor:["needles",.07,.4,.3],text:{floor:"pine needles",small:"pine cones",big:"tall old pines with knotholes"},small:[Ne("cones")],big:[nt("fir",{scale:1.35})]},{id:"ravine",name:"Ravine",creature:"salamander",by:"draft",leaf:.3,floor:["stone",.3,.3,.32],text:{floor:"wet moss and rock",wall:"rock walls",small:"ferns",big:"mossy boulders",set:"a waterfall"},wall:[Ne("rockwall",{moss:!0})],small:[Ne("fern")],big:[Ne("boulder",{moss:!0,big:!0})],set:Ne("waterfall")},{id:"bluebell-glade",name:"Bluebell glade",creature:"glowworm",by:"draft",leaf:.26,floor:["bluebells",.27,.45,.4],text:{floor:"bluebells",small:"ferns",big:"beeches"},small:[Ne("fern")],big:[nt("broad",{gnarl:.2,scale:1.1})]},{id:"holly-thicket",name:"Holly thicket",creature:"spider",by:"draft",leaf:.36,floor:["leaves",.08,.35,.28],text:{floor:"dead leaves",wall:"holly hedges",small:"cobwebs",big:"hollies",set:"a web-hung dead tree"},wall:[Ne("hedge",{berries:!0})],small:[Ne("web")],big:[nt("broad",{scale:.7,dark:!0})],set:nt("broad",{bare:!0,webs:!0})},{id:"honeysuckle-tangle",name:"Honeysuckle tangle",creature:"dormouse",by:"draft",leaf:.25,floor:["clover",.27,.45,.45],text:{floor:"grass and clover",wall:"bramble",small:"honeysuckle",big:"hazel coppice"},wall:[Ne("bramble")],small:[Ne("shrub",{flower:[250,230,170]})],big:[nt("broad",{trunks:5,scale:.7,thin:!0})]}],Wu=Object.fromEntries(po.map(n=>[n.id,n]));function Xu(n,e,t=64,i=48){const[r,a,s,o]=n.floor,c=new Jt(t,i),l=n.id.length*131;for(let _=0;_<i;_++)for(let m=0;m<t;m++){const p=(ii(m/7,_/5,l)*(t-m)*(i-_)+ii((m-t)/7,_/5,l)*m*(i-_)+ii(m/7,(_-i)/5,l)*(t-m)*_+ii((m-t)/7,(_-i)/5,l)*m*_)/(t*i),M=p<.38?x.BODY2:p>.64?x.BELLY:x.BODY;c.px(m,_,M,0,-.42,.91)}const h=so(l),f=(_,m,p)=>c.px((_%t+t)%t,(m%i+i)%i,p,0,-.42,.91),u={moss:0,needles:70,mud:25,stony:30,nettles:60,leaves:80,grass:70,lawn:30,plants:60,roots:30,slate:40,tallgrass:90,flowers:70,pebbles:60,scree:70,earth:15,stone:40,heather:90,bluebells:90,clover:60}[r]??40;for(let _=0;_<u;_++){const m=Math.floor(h()*t),p=Math.floor(h()*i);if(r==="needles"){const M=h()<.5?1:-1;for(let y=0;y<3;y++)f(m+y*M,p+(y>>1),h()<.5?x.BODY2:x.ACCENT)}else if(["grass","lawn","tallgrass","plants","nettles","clover","flowers","bluebells","heather"].includes(r)){const M=r==="tallgrass"?4:r==="lawn"?1:2;for(let y=0;y<M;y++)f(m,p-y,y===M-1?x.LEAF2:x.LEAF);(r==="flowers"||r==="bluebells"||r==="heather"||r==="clover")&&h()<.5&&f(m+1,p-M,x.FLOWER)}else if(["stony","pebbles","scree","slate","stone","roots"].includes(r)){if(f(m,p,x.ACCENT),h()<.6&&f(m+1,p,x.ACCENT),h()<.4&&f(m,p+1,x.BODY2),r==="roots"&&h()<.5)for(let M=0;M<5;M++)f(m+M,p+(M>2?1:0),x.TRUNK)}else if(r==="leaves")f(m,p,x.FLOWER),f(m+1,p,x.FLOWER),h()<.5&&f(m,p+1,x.ACCENT);else if(r==="mud"||r==="earth")for(let M=0;M<3;M++)f(m+M,p,x.BODY2)}const d={flowers:ye(.13,.6,.95),bluebells:[90,110,230],heather:[180,90,170],clover:[240,235,240],leaves:ye(a+.02,.65,.6)}[r]||ye(a,.3,.6),g={[x.BODY]:ye(a,s*e.sat,o),[x.BODY2]:ye(a+.02,s*e.sat*1.1,o*.78),[x.BELLY]:ye(a-.02,s*e.sat*.9,Math.min(1,o*1.15)),[x.ACCENT]:r==="needles"?ye(.07,.5,.5):ye(.1,.08,.62),[x.FLOWER]:d,[x.LEAF]:ye(n.leaf,.55*e.sat,.45),[x.LEAF2]:ye(n.leaf-.03,.5*e.sat,.62),[x.TRUNK]:ye(e.trunkHue,.4,.3)};return{sp:c,colours:g}}const mi=n=>({[x.ACCENT]:ye(.1,.06,.6),[x.BODY2]:ye(.62,.08,.4),[x.BELLY]:ye(.1,.05,.78),[x.LEAF]:ye(.27,.5,.45),[x.LEAF2]:ye(.25,.45,.62),[x.NOSE]:[20,16,24]});function Ki(n,e,t,i,r,a,s){const o=[];for(let c=0;c<8;c++){const l=c/8*Math.PI*2,h=1+(a()-.5)*.3;o.push([e[0]+Math.cos(l)*t*h,e[1]+Math.sin(l)*i*h*(Math.sin(l)>0?.5:1)])}n.shape(o,x.ACCENT,{group:5,line:!0,round:r.round}),n.mark([vt(e,[-t,i*.1]),vt(e,[t,i*.1]),vt(e,[t,i]),vt(e,[-t,i])],x.BODY2,[x.ACCENT]),n.mark([vt(e,[-t*.6,-i*.8]),vt(e,[t*.1,-i*1.1]),vt(e,[t*.3,-i*.5]),vt(e,[-t*.3,-i*.3])],x.BELLY,[x.ACCENT]),s&&n.mark(Sa([vt(e,[-t*1.1,-i*.55]),vt(e,[0,-i*1.3]),vt(e,[t*1.1,-i*.5]),vt(e,[t*.6,-i*.2]),vt(e,[-t*.6,-i*.2])],0,3,3,i*.15,1),x.LEAF,[x.ACCENT,x.BELLY,x.BODY2])}function oa(n,e,t,i,r,a){const s={[x.LEAF]:ye(t.leaf,.6*i.sat,.55),[x.LEAF2]:ye(t.leaf-.05,.55*i.sat,.78),[x.LEAF3]:ye(t.leaf+.03,.66*i.sat,.36)},o={[x.TRUNK]:ye(i.trunkHue,.45*i.sat,.34),[x.BARKD]:ye(i.trunkHue+.03,.5*i.sat,.17),[x.BARKL]:ye(i.trunkHue-.01,.38*i.sat,.5),[x.BELLY]:ye(i.trunkHue+.02,.3,.7)},c={[x.MAGIC]:[60,110,150],[x.MAGIC2]:[150,200,220],[x.BODY2]:[35,70,100]};if(n==="tree"){const _={broad:$l,fir:ho,willow:Jl,birch:Ql,flat:jl}[e.type],m={...i,leafHue:t.leaf+(e.dark?.05:0),gnarl:e.gnarl??i.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},p=_(r,m,i.treeSize*a*(e.scale||1)*Se(r,.9,1.1)),M=fo(r,m,_);return e.dark&&(M[x.LEAF]=M[x.LEAF3],M[x.LEAF3]=ye(t.leaf+.05,.7,.22)),M[x.NOSE]=[20,16,24],M[x.GLINT]=[235,235,240],{sp:p.sp,colours:M}}if(n==="shrub"){const _=Vu(r,{...i,leafHue:t.leaf,bushSize:i.bushSize*a,flowers:1});for(let m=0;m<_.sp.m.length;m++)_.sp.m[m]&&Zt(m,1,3)<(e.spiky?.18:.1)&&_.sp.m[m]!==x.TRUNK&&(_.sp.m[m]=x.FLOWER);return _.colours[x.FLOWER]=e.flower,_}const l=Math.round(48*a*(e.w||1)),h=Math.round(32*a),f=new Jt(l,h),u=l/2,d=h;let g={};if(n==="grass"||n==="reeds"||n==="fern"||n==="flowers"||n==="flowerbed"){const _=n==="flowerbed"?40:24,m=(n==="reeds"?e.tall?26:20:n==="fern"?14:10*(e.h||1))*a;n==="flowerbed"&&f.shape([[u-20*a,d-2],[u-18*a,d-6*a],[u+18*a,d-6*a],[u+20*a,d-2],[u+20*a,d],[u-20*a,d]],x.ACCENT,{group:2,line:!0});for(let p=0;p<_;p++){const M=u+Se(r,-16,16)*a,y=m*Se(r,.5,1),b=n==="fern"?Se(r,-6,6)*a:Se(r,-2,2)*a,A=d-1-(n==="flowerbed"?5*a:0);for(let w=0;w<y;w++){const C=w/y;f.px(M+b*C*C,A-w,C>.7?x.LEAF2:C<.3?x.LEAF3:x.LEAF,b*.05,-.3,.9),n==="fern"&&w%2&&f.px(M+b*C*C+(b>0?1:-1),A-w+1,x.LEAF2,0,-.3,.9)}if(n==="reeds"&&(e.cotton||r()<.5))for(let w=0;w<(e.cotton?2:3);w++)f.px(M+b,A-y-w,e.cotton?x.GLINT:x.TRUNK,0,-.5,.85);(n==="flowers"||n==="flowerbed")&&r()<.7&&(f.px(M+b,A-y,x.FLOWER,0,-.5,.85),f.px(M+b+1,A-y,x.FLOWER,0,-.5,.85))}if(g={...s,[x.FLOWER]:n==="flowerbed"?Yl(r,[[230,80,120],[250,210,60],[150,110,230]]):ye(e.hue??.95,.6,.85),[x.TRUNK]:ye(.07,.5,.35),[x.GLINT]:[240,240,235],[x.ACCENT]:ye(.08,.1,.55)},n==="flowerbed"){for(let p=0;p<f.m.length;p++)f.m[p]===x.FLOWER&&Zt(p,2,7)<.5&&(f.m[p]=x.MAGIC2);g[x.MAGIC2]=[250,245,240]}}else if(n==="stones"){for(let _=0;_<(e.big?3:6);_++)Ki(f,[u+Se(r,-14,14)*a,d-(e.big?5:2.5)*a],(e.big?6:3)*a*Se(r,.7,1.2),(e.big?5:2.5)*a,i,r);g=mi()}else if(n==="boulder")Ki(f,[u,d-(e.big?11:8)*a],(e.big?18:13)*a,(e.big?12:9)*a,i,r,e.moss),g={...mi(),...s,[x.ACCENT]:ye(.1,.06,.6)};else if(n==="henge")f.shape([[u-7*a,d],[u-8*a,d-18*a],[u-4*a,d-28*a],[u+5*a,d-27*a],[u+8*a,d-14*a],[u+7*a,d]],x.ACCENT,{group:5,line:!0,round:i.round}),f.mark([[u-9*a,d-30*a],[u+9*a,d-30*a],[u+9*a,d-22*a],[u-9*a,d-18*a]],x.LEAF,[x.ACCENT]),g={...mi(),...s};else if(n==="mound"){const _=(e.small?8:14)*a,m=(e.small?5:8)*a;f.shape(Sa([[u-_,d],[u-_*.6,d-m*.8],[u,d-m],[u+_*.6,d-m*.8],[u+_,d]],0,4,e.moss?3:1,(e.moss?1.5:.8)*a,1),e.moss?x.LEAF:x.TRUNK,{group:5,round:i.round}),f.mark([[u-_,d-m*.45],[u+_,d-m*.45],[u+_,d],[u-_,d]],e.moss?x.LEAF3:x.BARKD,[e.moss?x.LEAF:x.TRUNK]),g={...s,...o,[x.TRUNK]:ye(.07,.45,e.brown?.35:.3)}}else if(n==="stump"){const _=6*a;if(f.limb([[u,d,_*2.2],[u,d-8*a,_*1.6]],x.TRUNK,{group:5,round:i.round,cap:0,capEnd:0}),f.shape([[u-_*.8,d-8*a],[u,d-10*a-(e.gnawed?4*a:0)],[u+_*.8,d-8*a],[u,d-7*a]],x.BELLY,{group:6,round:i.round}),e.snag&&f.limb([[u+_*.4,d-8*a,2.5*a],[u+_*1.6,d-15*a,1.5*a]],x.TRUNK,{group:7,round:i.round}),e.grass)for(let m=0;m<20;m++){const p=u+Se(r,-14,14)*a,M=Se(r,6,13)*a;for(let y=0;y<M;y++)f.px(p,d-1-y,y>M*.6?x.LEAF2:x.LEAF,0,-.3,.9)}g={...s,...o}}else if(n==="log"){const _=(e.giant?46:e.branch?18:30)*a,m=(e.giant?14:e.branch?3:8)*a;if(f.limb([[u-_/2,d-m/2,m],[u+_/2,d-m/2-(e.branch?2*a:0),m*.9]],x.TRUNK,{group:5,round:i.round,cap:.3,capEnd:.3}),e.branch||f.shape([[u+_/2-m*.1,d-m],[u+_/2+m*.2,d-m/2],[u+_/2-m*.1,d],[u+_/2-m*.3,d-m/2]],x.BELLY,{group:6,round:i.round}),e.rot)for(let p=0;p<(e.giant?6:3);p++){const M=u+Se(r,-_/2,_/3);f.shape([[M-3*a,d-m*.9],[M,d-m-3*a],[M+3*a,d-m*.9]],x.FLOWER,{group:7,line:!0,round:i.round})}e.branch&&f.limb([[u,d-m,m*.7],[u+5*a,d-m-6*a,m*.4]],x.TRUNK,{group:6,round:i.round}),g={...o,[x.FLOWER]:[230,190,120]}}else if(n==="fungi"){for(let _=0;_<5;_++){const m=u+Se(r,-12,12)*a,p=Se(r,3,7)*a,M=Se(r,3,5)*a;f.limb([[m,d,1.6*a],[m,d-p,1.4*a]],x.BELLY,{group:5}),f.shape([[m-M,d-p],[m,d-p-M*.8],[m+M,d-p]],_%2?x.FLOWER:x.MAGIC,{group:6+_%2,line:!0,round:i.round})}g={[x.BELLY]:[225,215,195],[x.FLOWER]:[190,80,50],[x.MAGIC]:[120,230,200]}}else if(n==="cones"){for(let _=0;_<6;_++){const m=u+Se(r,-14,14)*a,p=d-2*a;f.ellipse(m,p,(e.acorn?1.6:2)*a,(e.acorn?2:2.8)*a,x.TRUNK,{round:i.round}),e.acorn?f.ellipse(m,p-1.6*a,1.8*a,1*a,x.BARKD,{round:i.round}):f.px(m,p-1,x.BARKL)}g=o}else if(n==="water"){const _=22*a*(e.w||1),m=6*a;f.shape([[u-_,d-m],[u-_*.3,d-m*1.5],[u+_*.6,d-m*1.2],[u+_,d-m*.5],[u+_*.4,d],[u-_*.7,d-m*.2]],x.MAGIC,{group:5,round:.2});for(let p=0;p<6;p++){const M=u+Se(r,-_*.6,_*.6),y=d-m*Se(r,.4,1.1);for(let b=0;b<3*a;b++)f.recolour(M+b,y,x.MAGIC2)}g=e.bog?{[x.MAGIC]:[60,70,50],[x.MAGIC2]:[120,130,90]}:c;for(let p=0;p<f.m.length;p++)f.m[p]===x.MAGIC?f.m[p]=x.BODY:f.m[p]===x.MAGIC2&&(f.m[p]=x.BELLY);g={[x.BODY]:g[x.MAGIC],[x.BELLY]:g[x.MAGIC2]}}else if(n==="bramble"||n==="hedge"){const _=22*a,m=(n==="hedge"?18:12)*a;for(let p=0;p<(n==="hedge"?6:4);p++){const M=u+Se(r,-_*.8,_*.8),y=d-m*Se(r,.4,.7);f.ellipse(M,y,Se(r,6,9)*a,m*.45,n==="hedge"?x.LEAF3:x.LEAF,{round:i.round,density:e.bare?.5:.95,noise:.5,seed:p})}for(let p=0;p<8;p++){let y=u+Se(r,-_,_),b=d;for(let A=0;A<m*1.2;A++)y+=Math.sin(A*.3+p)*.8,b-=.8,f.px(y,b,x.TRUNK,0,-.3,.9)}if(n==="hedge"||e.berries||n==="bramble")for(let p=0;p<f.m.length;p++)f.m[p]&&f.m[p]!==x.TRUNK&&Zt(p,5,9)<.05&&(f.m[p]=x.FLOWER);g={...s,...o,[x.FLOWER]:n==="hedge"?[210,30,40]:[70,30,70]}}else if(n==="wall"){const _=22*a,m=12*a;f.shape([[u-_,d],[u-_,d-m],[u+_,d-m],[u+_,d]],x.ACCENT,{group:5,line:!0,depth:2}),f.shape([[u-_-1,d-m],[u-_-1,d-m-2*a],[u+_+1,d-m-2*a],[u+_+1,d-m]],x.BELLY,{group:6,line:!0,depth:2}),f.shape([[u+_-6*a,d-m-2*a],[u+_-6*a,d-m-7*a],[u+_,d-m-7*a],[u+_,d-m-2*a]],x.ACCENT,{group:7,line:!0,depth:2}),f.ellipse(u+_-3*a,d-m-9*a,3*a,2.5*a,x.BELLY,{round:i.round});for(let p=d-m+3*a;p<d;p+=4*a)for(let M=u-_;M<u+_;M++)f.recolour(M,p,x.BODY2);g=mi()}else if(n==="rockwall"){for(let _=0;_<5;_++)Ki(f,[u+(_-2)*9*a,d-Se(r,8,14)*a],8*a,10*a,i,r,e.moss);g={...mi(),...s}}else if(n==="stalagmite"){for(let _=0;_<4;_++){const m=u+Se(r,-14,14)*a,p=Se(r,5,11)*a;f.shape([[m-3*a,d],[m-1*a,d-p],[m+1*a,d-p],[m+3*a,d]],x.ACCENT,{group:5,line:!0,round:i.round})}g=mi()}else if(n==="web"){const _=[u,d-14*a],m=11*a;for(let p=0;p<8;p++){const M=p/8*Math.PI*2;for(let y=0;y<m;y++)f.px(_[0]+Math.cos(M)*y,_[1]+Math.sin(M)*y,x.GLINT,0,0,1)}for(let p=3*a;p<m;p+=3*a)for(let M=0;M<Math.PI*2;M+=.05)f.px(_[0]+Math.cos(M)*p,_[1]+Math.sin(M)*p,x.GLINT,0,0,1);g={[x.GLINT]:[225,230,240]}}return{sp:f,colours:g}}function Yu(n,e,t,i,r,a){if(n==="tree"||n==="log")return oa(n,e,t,i,r,a);const s=Math.round(90*a),o=Math.round(70*a),c=new Jt(s,o),l=s/2,h=o;let f={...mi(),[x.LEAF]:ye(t.leaf,.55,.5),[x.LEAF2]:ye(t.leaf-.04,.5,.7),[x.TRUNK]:ye(i.trunkHue,.45,.34),[x.BARKD]:ye(i.trunkHue+.03,.5,.17),[x.MAGIC]:ye(i.magicHue,.6,1),[x.MAGIC2]:ye(i.magicHue,.2,1)};if(n==="shrine")c.shape([[l-16*a,h],[l-14*a,h-6*a],[l+14*a,h-6*a],[l+16*a,h]],x.ACCENT,{group:5,line:!0,depth:2}),c.shape([[l-9*a,h-6*a],[l-9*a,h-26*a],[l+9*a,h-26*a],[l+9*a,h-6*a]],x.ACCENT,{group:6,line:!0,depth:2}),c.shape([[l-5*a,h-10*a],[l-5*a,h-20*a],[l,h-23*a],[l+5*a,h-20*a],[l+5*a,h-10*a]],x.NOSE,{group:7}),c.shape([[l-13*a,h-26*a],[l,h-34*a],[l+13*a,h-26*a]],x.BODY2,{group:8,line:!0,depth:2}),c.ellipse(l,h-13*a,2.5*a,2.5*a,x.MAGIC2,{round:.5}),c.mark([[l-14*a,h-36*a],[l+2*a,h-36*a],[l-4*a,h-24*a],[l-14*a,h-24*a]],x.LEAF,[x.BODY2,x.ACCENT]);else if(n==="pavilion"){c.shape([[l-26*a,h],[l-26*a,h-4*a],[l+26*a,h-4*a],[l+26*a,h]],x.ACCENT,{group:5,line:!0,depth:2});for(const u of[-20,-7,7,20])c.limb([[l+u*a,h-4*a,4*a],[l+u*a,h-34*a,4*a]],u===-7||u===7?x.BODY2:x.BELLY,{group:6+(u>0?1:0),line:!0,cap:0,capEnd:0});c.shape([[l-28*a,h-34*a],[l-28*a,h-38*a],[l+28*a,h-38*a],[l+28*a,h-34*a]],x.ACCENT,{group:8,line:!0,depth:2}),c.shape([[l-24*a,h-38*a],[l-16*a,h-54*a],[l,h-60*a],[l+16*a,h-54*a],[l+24*a,h-38*a]],x.BELLY,{group:9,line:!0})}else if(n==="bridge"){const u=oa("water",{w:1.8},t,i,r,a);for(let d=0;d<u.sp.m.length;d++){const g=d%u.sp.w,_=d/u.sp.w|0,m=Math.round(l-u.sp.w/2+g),p=h-u.sp.h+_;u.sp.m[d]&&c.inb(m,p)&&c.px(m,p,u.sp.m[d]===x.BODY?x.IRIS:x.PUPIL,0,-.42,.91)}c.limb([[l-34*a,h-6*a,9*a],[l+34*a,h-10*a,8*a]],x.TRUNK,{group:6,line:!0,cap:.3,capEnd:.3}),f[x.IRIS]=[60,110,150],f[x.PUPIL]=[150,200,220]}else if(n==="outcrop")for(const[u,d,g,_]of[[-18,14,16,13],[12,12,18,12],[-2,28,15,13],[16,34,9,9]])Ki(c,[l+u*a,h-d*a],g*a,_*a,i,r,!0);else if(n==="cave"){for(const[u,d,g,_]of[[-26,16,16,15],[26,16,16,15],[0,40,30,18],[-12,30,14,12],[12,30,14,12]])Ki(c,[l+u*a,h-d*a],g*a,_*a,i,r,d>30);c.shape([[l-15*a,h],[l-14*a,h-18*a],[l-4*a,h-28*a],[l+6*a,h-27*a],[l+14*a,h-16*a],[l+15*a,h]],x.NOSE,{group:9,line:!0})}else if(n==="dam"){const u=oa("water",{w:1.9},t,i,r,a);for(let d=0;d<u.sp.m.length;d++){const g=d%u.sp.w,_=d/u.sp.w|0,m=Math.round(l-u.sp.w/2+g),p=h-u.sp.h+_-10*a;u.sp.m[d]&&c.inb(m,p)&&c.px(m,p,u.sp.m[d]===x.BODY?x.IRIS:x.PUPIL,0,-.42,.91)}for(let d=0;d<26;d++){const g=l+Se(r,-32,32)*a,_=h-Se(r,2,14)*a,m=Se(r,-.5,.5),p=Se(r,8,16)*a;c.limb([[g-Math.cos(m)*p/2,_-Math.sin(m)*p/2,2.6*a],[g+Math.cos(m)*p/2,_+Math.sin(m)*p/2,2*a]],d%3?x.TRUNK:x.BARKD,{group:6+d%2,line:!0})}f[x.IRIS]=[60,110,150],f[x.PUPIL]=[150,200,220]}else if(n==="waterfall"){for(const[u,d,g,_]of[[-22,30,18,30],[22,30,18,30],[0,56,20,12]])Ki(c,[l+u*a,h-d*a],g*a,_*a,i,r,!0);for(let u=l-6*a;u<l+6*a;u++)for(let d=h-50*a;d<h-4*a;d++)c.px(u,d,Zt(u|0,d/3|0,4)<.3?x.PUPIL:x.IRIS,0,-.2,.98);c.shape([[l-18*a,h],[l-14*a,h-6*a],[l+14*a,h-6*a],[l+18*a,h]],x.IRIS,{group:10,round:.2}),f[x.IRIS]=[90,150,190],f[x.PUPIL]=[210,235,245]}return{sp:c,colours:f}}function qu(n,e,{K:t=2/(e.pixel||2),makeCanvas:i=Xl}={}){const r=Wu[n];if(!r)throw new Error(`no area type "${n}"`);const a=so(n.split("").reduce((h,f)=>h*31+f.charCodeAt(0),7)>>>0),s=(h,f,u)=>({sp:Ji(h.sp,h.colours,e,"none",i),kind:f,text:u}),o=Xu(r,e),c=h=>(h||[]).map(([f,u])=>s(oa(f,u,r,e,a,t),f,"")),l={def:r,floor:{sp:Ji(o.sp,o.colours,e,"none",i),kind:r.floor[0],text:r.text.floor},walls:c(r.wall),small:c(r.small),big:c(r.big),setPiece:null};return l.walls.forEach(h=>h.text=r.text.wall),l.small.forEach(h=>h.text=r.text.small),l.big.forEach(h=>h.text=r.text.big),r.set&&(l.setPiece=s(Yu(r.set[0],r.set[1],r,e,a,t),r.set[0],r.text.set)),l}function Ku(n,e){const t=new Map,i=new Map,r=(c,l,h)=>(c*2097152+(l+1048576))*2097152+(h+1048576),a=(c,l,h)=>{const f=r(c,l,h);let u=t.get(f);if(!u){const d=Math.pow(2,-c);u=[d*(l+bt(l*7+c,h,n)),d*(h+bt(l,h*13+c,n+1))],t.set(f,u)}return u},s=(c,l,h)=>{const f=Math.pow(2,-c),u=Math.floor(l/f),d=Math.floor(h/f);let g=u,_=d,m=1/0;for(let p=-2;p<=2;p++)for(let M=-2;M<=2;M++){const y=a(c,u+p,d+M),b=(y[0]-l)**2+(y[1]-h)**2;b<m&&(m=b,g=u+p,_=d+M)}return[g,_]},o=(c,l,h)=>{const f=r(c,l,h);let u=i.get(f);if(u)return u;if(c===0)u=[l,h];else{const d=a(c,l,h),g=s(c-1,d[0],d[1]);u=o(c-1,g[0],g[1])}return i.set(f,u),u};return{seed:n,depth:e,site:(c,l)=>a(0,c,l),partition(c,l){const h=s(e,c,l);return o(e,h[0],h[1])},centreness(c,l,h){const f=a(0,h[0],h[1]),u=Math.hypot(c-f[0],l-f[1]);let d=1/0;const g=Math.floor(c),_=Math.floor(l);for(let m=-2;m<=2;m++)for(let p=-2;p<=2;p++){const M=g+m,y=_+p;if(M===h[0]&&y===h[1])continue;const b=a(0,M,y);d=Math.min(d,Math.hypot(c-b[0],l-b[1]))}return Math.min(1,2*u/(u+d))},openness(c,l){let h=1/0,f=1/0;const u=Math.floor(c),d=Math.floor(l);for(let g=-2;g<=2;g++)for(let _=-2;_<=2;_++){const m=a(0,u+g,d+_),p=Math.hypot(c-m[0],l-m[1]);p<h?(f=h,h=p):p<f&&(f=p)}return Math.min(1,2*h/(h+f))}}}const Zu=ou.types,An=po.map(n=>({id:n.id,name:n.name,creature:n.creature,text:n.text,setPiece:n.set?n.text.set??"a set piece":"",hasWalls:!!n.wall?.length,floor:[n.floor[1],n.floor[2],n.floor[3]],treeDensity:Zu[n.id]?.treeDensity??1})),Xi=(n,e)=>n+","+e;function $u(n){if(n==null||n.trim()==="")return null;const e=n.trim();if(/^\d{1,9}$/.test(e))return Number(e);let t=2166136261;for(let i=0;i<e.length;i++)t=Math.imul(t^e.charCodeAt(i),16777619);return(t>>>0)%1e9}function Ju(n,e,t,i){const r=new Map,a=(c,l)=>{if(c[0]===l[0]&&c[1]===l[1])return;const h=Xi(c[0],c[1]),f=Xi(l[0],l[1]);r.has(h)||r.set(h,new Set),r.has(f)||r.set(f,new Set),r.get(h).add(f),r.get(f).add(h)},s=(t-e)*i;let o=[];for(let c=0;c<=s;c++){const l=[];for(let h=0;h<=s;h++){const f=n.partition(e+h/i,e+c/i);l.push(f),h>0&&a(f,l[h-1]),c>0&&a(f,o[h])}o=l}return r}function Qu(n,e){const t=e.mapAreas,i=2,r=e.areaSize*e.areaScale,a=An.length,s=3,o=Math.max(0,Math.min(1,e.areaSizeVariance))*s*.3,c=(k,P)=>{const B=k/r,V=P/r;return[B+o*(ko(B/s,V/s,n+91)-.5)*2,V+o*(ko(B/s,V/s,n+92)-.5)*2]},l=(k,P)=>{let B=k*r,V=P*r;for(let Z=0;Z<30;Z++){const[ie,K]=c(B,V);B+=(k-ie)*r,V+=(P-K)*r}return[B,V]},h=Ku(n,e.borderLayers),f=-i,u=t+i,d=Ju(h,f,u,6),g=new Map,_=br(n*5+1);for(let k=f;k<u;k++)for(let P=f;P<u;P++){const B=new Set;for(let ie=-2;ie<=2;ie++)for(let K=-2;K<=2;K++){const ee=g.get(Xi(P+K,k+ie));ee!==void 0&&B.add(ee)}for(const ie of d.get(Xi(P,k))??[]){const K=g.get(ie);K!==void 0&&B.add(K)}const V=[...Array(a).keys()].filter(ie=>!B.has(ie)),Z=V.length?V:[...Array(a).keys()];g.set(Xi(P,k),Z[Math.floor(_()*Z.length)])}const m=(k,P)=>g.get(Xi(k,P))??Math.floor(bt(k,P,n+17)*a),p=Math.floor(t/2),M=(k,P)=>{const B=h.site(k,P),V=h.partition(B[0],B[1]);return V[0]===k&&V[1]===P};let y=[p,p];for(const[k,P]of[[0,0],[1,0],[0,1],[-1,0],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]])if(M(p+k,p+P)){y=[p+k,p+P];break}const b=(k,P)=>{const B=h.site(k,P),V=l(B[0],B[1]);return{x:V[0],z:V[1]}},A=b(y[0],y[1]),w=(k,P)=>{const[B,V]=c(k,P),Z=h.partition(B,V);return{cell:Z,type:m(Z[0],Z[1]),openness:h.openness(B,V)}},C=4.5,S=C*2.2,R=(k,P)=>{if(Math.hypot(k-A.x,P-A.z)<S)return 0;const[B,V]=c(k,P);return nr((h.openness(B,V)-e.clearingSize)/Math.max(.01,e.clearingFalloff))*e.treeDensity},D=(k,P)=>{const B=An[m(k,P)];return B.setPiece&&bt(k,P,n+61)<e.setPieceChance?B.setPiece:null},N=(k,P)=>Math.min(1,Math.hypot(k-y[0],P-y[1])/(t/2)),H=r*.5;return{seed:n,tuning:e,n:t,margin:i,areaSize:r,partition:h,centreCell:y,dancefloor:{x:A.x,z:A.z,radius:C},start:{x:A.x,z:A.z+2},bounds:{minX:H,maxX:t*r-H,minZ:H,maxZ:t*r-H},extent:{minX:f*r,maxX:u*r,minZ:f*r,maxZ:u*r},typeOf:m,areaAt:w,siteOf:b,treeWeight:R,neighbours:d,setPieceOf:D,remoteness:N}}function ju(n,e,t=.5){const i=n.tuning,r=Mi(e,0,1),a=Math.round(Mn(i.creaturesNear,i.creaturesFar,Math.pow(r,i.creatureCurve))+(t-.5)*2),s=Math.min(Math.max(0,a),Math.round(i.legendsFar*nr((r-i.legendsFrom)/Math.max(.01,1-i.legendsFrom))+(t-.5)*.8)),o=Math.round(Math.max(0,a-s)*i.youngShareFar*r);return{babies:Math.max(0,a-s-o),young:o,legends:s}}const eh=(n,e,t=0)=>(n.tuning.clearingSize+n.tuning.clearingFalloff*.3)*n.areaSize*.5*(e===2?.55:.8)*(1+t);function th(n){const e=[],t=n.tuning;let i=0;const[r,a]=n.centreCell;for(let s=0;s<n.n;s++)for(let o=0;o<n.n;o++){if(o===r&&s===a)continue;const c=br(n.seed*7919+o*131+s*977+3),l=An[n.typeOf(o,s)],h=n.siteOf(o,s),f=n.remoteness(o,s),u=ju(n,f,bt(o,s,n.seed+43)),d=_=>{const m=eh(n,_,f),p=c()*Math.PI*2,M=Math.sqrt(c())*m,y=h.x+Math.cos(p)*M,b=h.z+Math.sin(p)*M;return{id:i++,species:l.creature,cell:[o,s],level:_,homeX:h.x,homeZ:h.z,range:m,x:y,z:b,tx:y,tz:b,rest:c()*3,speed:(_===2?t.legendSpeed:t.creatureSpeed)*(.7+c()*.6),facing:c()<.5?1:-1,moving:!1,walk:c(),rand:br(n.seed*31+i*7+11)}};for(let _=0;_<u.babies;_++)e.push(d(0));for(let _=0;_<u.young;_++)e.push(d(1));const g=o===r+1&&s===a?Math.max(1,u.legends):u.legends;for(let _=0;_<g;_++)e.push(d(2))}return e}function nh(n,e){if(n.rest>0){n.rest-=e,n.moving=!1;return}const t=n.tx-n.x,i=n.tz-n.z,r=Math.hypot(t,i);if(r<.05){const s=n.rand()*Math.PI*2,o=Math.sqrt(n.rand())*n.range;n.tx=n.homeX+Math.cos(s)*o,n.tz=n.homeZ+Math.sin(s)*o,n.rest=.8+n.rand()*3.5,n.moving=!1;return}const a=Math.min(r,n.speed*e);n.x+=t/r*a,n.z+=i/r*a,Math.abs(t)>.02&&(n.facing=t>0?1:-1),n.moving=!0,n.walk+=e*(n.level===2?1.5:4)}function ih(n,e,t,i,r){for(const a of n)Math.abs(a.homeX-e)<i&&Math.abs(a.homeZ-t)<i&&nh(a,r)}const ec=6,rh=4,Ht=32;function ah(n){const e=n.tuning.camera.treetop.angleIn*Math.PI/180;return n.tuning.crownHeight/Math.sin(e)}function sh(n,e,t){const{treeSpacingX:i,treeSpacingZ:r}=n.tuning,a=n.seed,s=[],o=ah(n),c=n.tuning.crownHalfWidth,l=Math.ceil(t*Ht/r),h=Math.ceil((t+1)*Ht/r);for(let f=l;f<h;f++){const u=f&1?.5:0,d=Math.ceil(e*Ht/i-u),g=Math.ceil((e+1)*Ht/i-u);for(let _=d;_<g;_++){const m=(_+u+(bt(_,f,a+101)-.5)*.7)*i,p=(f+(bt(_,f,a+102)-.5)*.7)*r,M=n.areaAt(m,p);bt(_,f,a+103)>=n.treeWeight(m,p)*An[M.type].treeDensity||n.treeWeight(m,p-o)===0||n.treeWeight(m-c,p-o)===0||n.treeWeight(m+c,p-o)===0||s.push({x:m,z:p,type:M.type,variant:Math.floor(bt(_,f,a+104)*ec),flip:bt(_,f,a+105)<.5})}}return s}function oh(n,e,t){const i=n.tuning.bushSpacing,r=n.seed,a=[],s=Math.ceil(t*Ht/i),o=Math.ceil((t+1)*Ht/i),c=Math.ceil(e*Ht/i),l=Math.ceil((e+1)*Ht/i);for(let h=s;h<o;h++)for(let f=c;f<l;f++){const u=(f+(bt(f,h,r+201)-.5)*.9)*i,d=(h+(bt(f,h,r+202)-.5)*.9)*i;bt(f,h,r+203)>(.12+Math.min(1,n.treeWeight(u,d))*.3)*n.tuning.bushDensity||a.push({x:u,z:d,type:n.areaAt(u,d).type,variant:Math.floor(bt(f,h,r+204)*rh),flip:bt(f,h,r+205)<.5})}return a}function lh(n,e,t){const i=n.tuning.wallSpacing,r=n.seed,a=[],s=Math.ceil(t*Ht/i),o=Math.ceil((t+1)*Ht/i),c=Math.ceil(e*Ht/i),l=Math.ceil((e+1)*Ht/i);for(let h=s;h<o;h++)for(let f=c;f<l;f++){if(bt(f,h,r+303)>n.tuning.wallDensity)continue;const u=(f+(bt(f,h,r+301)-.5)*.6)*i,d=(h+(bt(f,h,r+302)-.5)*.6)*i,g=n.areaAt(u,d);g.openness<.82||!An[g.type].hasWalls||a.push({x:u,z:d,type:g.type,variant:Math.floor(bt(f,h,r+304)*4),flip:bt(f,h,r+305)<.5})}return a}class ch{constructor(e){this.map=e}map;trees=new Map;bushes=new Map;walls=new Map;chunks(e,t,i){const r=[];for(let a=Math.floor((t-i)/Ht);a<=Math.floor((t+i)/Ht);a++)for(let s=Math.floor((e-i)/Ht);s<=Math.floor((e+i)/Ht);s++)r.push([s,a]);return r}gather(e,t,i,r,a){e.size>600&&e.clear();const s=[];for(const[o,c]of this.chunks(i,r,a)){const l=o+","+c;let h=e.get(l);h||(h=t(o,c),e.set(l,h));for(const f of h)Math.abs(f.x-i)<=a&&Math.abs(f.z-r)<=a&&s.push(f)}return s}treesNear(e,t,i){return this.gather(this.trees,(r,a)=>sh(this.map,r,a),e,t,i)}bushesNear(e,t,i){return this.gather(this.bushes,(r,a)=>oh(this.map,r,a),e,t,i)}wallsNear(e,t,i){return this.gather(this.walls,(r,a)=>lh(this.map,r,a),e,t,i)}setPiecesNear(e,t,i){const r=this.map,a=r.areaSize,s=[];for(let o=Math.floor((t-i)/a)-1;o<=Math.floor((t+i)/a)+1;o++)for(let c=Math.floor((e-i)/a)-1;c<=Math.floor((e+i)/a)+1;c++){if(c===r.centreCell[0]&&o===r.centreCell[1]||!r.setPieceOf(c,o))continue;const l=r.siteOf(c,o);Math.abs(l.x-e)<=i&&Math.abs(l.z-4-t)<=i&&s.push({x:l.x,z:l.z-4,type:r.typeOf(c,o),variant:0,flip:bt(c,o,r.seed+71)<.5})}return s}}function uh(n,e){return{x:n,z:e,vx:0,vz:0,lift:0,mode:"ground",facing:1}}const mo=(n,e)=>Mn(e.groundHeight,e.treetopHeight,nr(n.lift)),Fa=n=>nr(n.lift);function hh(n,e,t,i,r){let{mode:a,lift:s}=n;e.toggleMode&&(a=a==="ground"||a==="descending"?"rising":"descending"),a==="rising"?(s+=t/Math.max(.001,i.riseTime),s>=1&&(s=1,a="treetop")):a==="descending"&&(s-=t/Math.max(.001,i.descendTime),s<=0&&(s=0,a="ground"));let o=e.moveX,c=e.moveZ;const l=Math.hypot(o,c);l>1&&(o/=l,c/=l);const h=Mn(i.groundSpeed,i.treetopSpeed,nr(s)),f=1-Math.exp(-i.acceleration*t);let u=n.vx+(o*h-n.vx)*f,d=n.vz+(c*h-n.vz)*f,g=n.x+u*t,_=n.z+d*t;(g<r.minX||g>r.maxX)&&(g=Mi(g,r.minX,r.maxX),u=0),(_<r.minZ||_>r.maxZ)&&(_=Mi(_,r.minZ,r.maxZ),d=0);const m=u>.3?1:u<-.3?-1:n.facing;return{x:g,z:_,vx:u,vz:d,lift:s,mode:a,facing:m}}function fh(n,e){const t=Qu(n,e),i=uh(t.start.x,t.start.z);return{seed:n,tuning:e,map:t,forest:new ch(t),creatures:th(t),clock:ru(),witch:i,camera:eu(e,i.x,mo(i,e),i.z)}}function dh(n,e,t){const i=au(n.clock,t);i!==0&&(n.witch=hh(n.witch,e,i,n.tuning,n.map.bounds),n.camera=tu(n.camera,e.zoom,{x:n.witch.x,y:mo(n.witch,n.tuning),z:n.witch.z},{x:n.witch.vx,z:n.witch.vz},n.witch.lift,i,n.tuning),ih(n.creatures,n.witch.x,n.witch.z,n.tuning.creatureSimRadius,i))}const ph=n=>nu(n.camera,n.camera.lift,n.tuning);function tc(n){const e=n.map.areaAt(n.witch.x,n.witch.z),t=n.map.setPieceOf(e.cell[0],e.cell[1]);return An[e.type].name+(t?` (set piece: ${t})`:"")}const mh="Witch tuning. Edit the numbers, push, and the playable link rebuilds. Distances are metres, times seconds, angles degrees. Keys starting with _ are notes.",gh="The forest: mapAreas x mapAreas areas cut by the fractal partition. An area is areaSize x areaScale metres across on average (areaScale 1.4 doubles the ground of the first 28 m areas; push it for bigger). areaSizeVariance (0-1) makes areas vary in size, some small, some large. borderLayers sets how wiggly borders are.",_h=20,xh=28,vh=1.4,Mh=.7,Sh=4,bh="treeDensity (0-1): the chance of a tree on each spot outside the clearings; clearingSize (0-1): how far out from an area's centre the ground stays fully open; clearingFalloff (0-1): over how much of the way to the border trees thicken, smoothly, to full density; trees sit on a staggered grid treeSpacingX by treeSpacingZ metres, so no two crowns pile up. A tree is left out where its crown (crownHalfWidth either side, crownHeight up) would hang over a clearing seen from the treetops.",Eh=.9,yh=.1,wh=.5,Th=1,Ah=5,Rh=3,Ch=4.5,Ph=5,Lh=3.4,Dh=4,Ih=.6,Uh="Speeds per mode, and how long rising and descending take.",Nh=14,Fh=32,Oh=10,Bh=.7,zh=.55,kh=1.4,Gh=11,Hh="Near-isometric on the ground, after Transistor; lower over the treetops, looking toward the horizon to feel the speed. The camera follows the witch on a soft spring (follow: its stiffness; higher keeps her closer to the middle) and looks a little ahead of her: lookAhead seconds of flight, at most lookAheadMax metres, eased in at lookAheadEase. zoomEase and liftEase: how softly zoom and rising change the angle and distance. a narrow field of view (fov, degrees) seen from far off, so there is little perspective. Each mode has its own angle (degrees below horizontal) and distance from the witch, at zoomed-in and zoomed-out. Zoom moves between them in zoomSteps steps.",Vh={fov:20,ground:{angleIn:38,angleOut:46,distanceIn:42,distanceOut:84},treetop:{angleIn:32,angleOut:36,distanceIn:70,distanceOut:120},lookAhead:.1,lookAheadMax:3,lookAheadEase:1.5,zoomEase:5,liftEase:8,zoomSteps:4,startZoom:1,follow:8},Wh="Everything the camera can see is drawn, plus viewMargin metres round the view, so nothing appears or vanishes on screen. haze: the twilight haze fades the forest from near to far metres from the witch; nothing is drawn beyond far. pixelSize: screen pixels per art pixel. glowReach: metres the witch's light reaches. spriteTilt: 1 = sprites face the camera fully, 0 = stand upright.",Xh=3,Yh=8,qh=1,Kh=1,Zh=16,$h=12,Jh={near:90,far:220},Qh="bloom: a gentle glow round bright things (strength 0 or on false turns it off; threshold: how bright a pixel must be to glow). tiltShift: blurs the top and bottom of the screen so the forest looks like a miniature. strength: the blur at the screen's edges, in pixels; band: the height of the sharp band (0-1 of the screen); centre: where it sits (0 top, 0.5 middle, 1 bottom); where: 'before' blurs at the low resolution, before the pixels are scaled up, 'after' blurs the scaled-up image. Add ?tilt=before, ?tilt=after or ?tilt=off to the link to compare.",jh="shadows: a flat shadow under every tree (cast away from the moon), bush and creature. canopyShadow: a dappled shadow from the canopy overhead (height in metres), thinner in clearings, drifting with the wind. mist: a low drifting mist (height in metres above the ground). Each has on and strength.",ef={on:!0,strength:.7},tf={on:!0,strength:.45,height:8,cover:.55,wind:.6},nf={on:!0,strength:.12,height:3,wind:.8},rf={on:!0,strength:.7,threshold:.55},af={on:!0,where:"before",strength:3,band:.4,centre:.55},sf="Creatures grow more numerous and older with an area's distance from home (0 at the dancefloor, 1 at the map's edge): creaturesNear in the areas round home, creaturesFar at the edge (creatureCurve shapes the rise), youngShareFar of them young at the edge, and legendsFar legends from legendsFrom outward. Only creatures within creatureSimRadius metres of the witch move.",of=2,lf=20,cf=1.3,uf=.5,hf=2,ff=.55,df=110,pf=.6,mf="setPieceChance: the share of areas, among the types that have a set piece, that show theirs. Wall objects (an area type's edges: puddles, henges, hedges) stand where areas meet, one per wallSpacing metres with chance wallDensity; they do not block movement.",gf=.25,_f=.35,xf={_readme:mh,_map:gh,mapAreas:_h,areaSize:xh,areaScale:vh,areaSizeVariance:Mh,borderLayers:Sh,_trees:bh,treeDensity:Eh,clearingSize:yh,clearingFalloff:wh,bushDensity:Th,treeSpacingX:Ah,treeSpacingZ:Rh,crownHalfWidth:Ch,crownHeight:Ph,bushSpacing:Lh,wallSpacing:Dh,wallDensity:Ih,_witch:Uh,groundSpeed:Nh,treetopSpeed:Fh,acceleration:Oh,riseTime:Bh,descendTime:zh,groundHeight:kh,treetopHeight:Gh,_camera:Hh,camera:Vh,_look:Wh,pixelSize:Xh,glowReach:Yh,glowHeight:qh,spriteTilt:Kh,artPixelsPerMetre:Zh,viewMargin:$h,haze:Jh,_post:Qh,_shadows:jh,shadows:ef,canopyShadow:tf,mist:nf,bloom:rf,tiltShift:af,_creatures:sf,creaturesNear:of,creaturesFar:lf,creatureCurve:cf,youngShareFar:uf,legendsFar:hf,legendsFrom:ff,creatureSimRadius:df,creatureSpeed:pf,_setPieces:mf,setPieceChance:gf,legendSpeed:_f},Ci=xf;class vf{keys=new Set;pressed=new Set;padPrev=[];touch={x:0,y:0,toggle:!1,zoom:0,debug:!1};onAny=null;constructor(e=window){e.addEventListener("keydown",t=>{if(t.repeat){this.isGameKey(t.code)&&t.preventDefault();return}this.keys.add(t.code),this.isGameKey(t.code)&&t.preventDefault(),this.onAny?.()||this.pressed.add(t.code)}),e.addEventListener("keyup",t=>this.keys.delete(t.code)),e.addEventListener("blur",()=>this.keys.clear())}isGameKey(e){return/^(Arrow|Space$|Key[WASDQE]$|Minus$|Equal$|NumpadAdd$|NumpadSubtract$|Backquote$)/.test(e)}clearPresses(){this.pressed.clear();const e=this.touch;e.toggle=!1,e.zoom=0,e.debug=!1}read(){const e=f=>this.keys.has(f)?1:0,t=f=>this.pressed.has(f);let i=e("KeyD")+e("ArrowRight")-e("KeyA")-e("ArrowLeft"),r=e("KeyS")+e("ArrowDown")-e("KeyW")-e("ArrowUp"),a=t("Space"),s=(t("KeyQ")||t("Minus")||t("NumpadSubtract")?1:0)-(t("KeyE")||t("Equal")||t("NumpadAdd")?1:0),o=t("Backquote");this.pressed.clear();const c=typeof navigator<"u"&&navigator.getGamepads?navigator.getGamepads():[];for(const f of c){if(!f)continue;const u=b=>!!f.buttons[b]?.pressed,g=f.buttons.some((b,A)=>b.pressed&&!this.padPrev[A])&&!!this.onAny?.(),_=b=>!g&&u(b)&&!this.padPrev[b];let m=f.axes[0]??0,p=f.axes[1]??0;const M=Math.hypot(m,p),y=.18;if(M<y)m=0,p=0;else{const b=(Math.min(1,M)-y)/(1-y)/M;m*=b,p*=b}m+=(u(15)?1:0)-(u(14)?1:0),p+=(u(13)?1:0)-(u(12)?1:0),i+=m,r+=p,_(0)&&(a=!0),(_(4)||_(6))&&(s+=1),(_(5)||_(7))&&(s-=1),_(8)&&(o=!0),this.padPrev=f.buttons.map(b=>b.pressed);break}const l=this.touch;i+=l.x,r+=l.y,l.toggle&&(a=!0),s+=l.zoom,l.debug&&(o=!0),l.toggle=!1,l.zoom=0,l.debug=!1;const h=Math.hypot(i,r);return h>1&&(i/=h,r/=h),{moveX:i,moveZ:r,toggleMode:a,zoom:Math.sign(s),debug:o}}}const go="186",Mf=0,Yo=1,Sf=2,la=1,bf=2,_r=3,bi=0,$t=1,Bn=2,Hn=0,Sr=1,qo=2,Ko=3,Zo=4,Ef=5,Vi=100,yf=101,wf=102,Tf=103,Af=104,Rf=200,Cf=201,Pf=202,Lf=203,nc=204,ic=205,Df=206,If=207,Uf=208,Nf=209,Ff=210,Of=211,Bf=212,zf=213,kf=214,gs=0,_s=1,xs=2,Er=3,vs=4,Ms=5,Ss=6,bs=7,rc=0,Gf=1,Hf=2,yn=0,ac=1,sc=2,oc=3,lc=4,cc=5,uc=6,hc=7,fc=300,Ei=301,er=302,Oa=303,Ba=304,Ta=306,Es=1e3,zn=1001,ys=1002,It=1003,Vf=1004,Nr=1005,Ct=1006,za=1007,_i=1008,en=1009,dc=1010,pc=1011,yr=1012,_o=1013,Rn=1014,bn=1015,Cn=1016,xo=1017,vo=1018,wr=1020,mc=35902,gc=35899,_c=1021,xc=1022,on=1023,Yn=1026,xi=1027,vc=1028,Mo=1029,yi=1030,So=1031,bo=1033,ca=33776,ua=33777,ha=33778,fa=33779,ws=35840,Ts=35841,As=35842,Rs=35843,Cs=36196,Ps=37492,Ls=37496,Ds=37488,Is=37489,ma=37490,Us=37491,Ns=37808,Fs=37809,Os=37810,Bs=37811,zs=37812,ks=37813,Gs=37814,Hs=37815,Vs=37816,Ws=37817,Xs=37818,Ys=37819,qs=37820,Ks=37821,Zs=36492,$s=36494,Js=36495,Qs=36283,js=36284,ga=36285,eo=36286,Wf=3200,$o=0,Xf=1,pn="",an="srgb",Tr="srgb-linear",_a="linear",ht="srgb",ka=7680,Yf=519,qf=512,Kf=513,Zf=514,Eo=515,$f=516,Jf=517,yo=518,Qf=519,jf=35044,Mc=35048,Jo="300 es",En=2e3,xa=2001;function ed(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function va(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function td(){const n=va("canvas");return n.style.display="block",n}const Qo={};function jo(...n){const e="THREE."+n.shift();console.log(e,...n)}function Sc(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function ze(...n){n=Sc(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function tt(...n){n=Sc(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Zi(...n){const e=n.join(" ");e in Qo||(Qo[e]=!0,ze(...n))}function nd(n,e,t){return new Promise(function(i,r){function a(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(a,t);break;default:i()}}setTimeout(a,t)})}const id={[gs]:_s,[xs]:Ss,[vs]:bs,[Er]:Ms,[_s]:gs,[Ss]:xs,[bs]:vs,[Ms]:Er};class Ti{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const a=r.indexOf(t);a!==-1&&r.splice(a,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let a=0,s=r.length;a<s;a++)r[a].call(this,e);e.target=null}}}const kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ga=Math.PI/180,to=180/Math.PI;function Pr(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(kt[n&255]+kt[n>>8&255]+kt[n>>16&255]+kt[n>>24&255]+"-"+kt[e&255]+kt[e>>8&255]+"-"+kt[e>>16&15|64]+kt[e>>24&255]+"-"+kt[t&63|128]+kt[t>>8&255]+"-"+kt[t>>16&255]+kt[t>>24&255]+kt[i&255]+kt[i>>8&255]+kt[i>>16&255]+kt[i>>24&255]).toLowerCase()}function je(n,e,t){return Math.max(e,Math.min(t,n))}function rd(n,e){return(n%e+e)%e}function Ha(n,e,t){return(1-t)*n+t*e}function cr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Kt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class We{static{We.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(je(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(je(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),a=this.x-e.x,s=this.y-e.y;return this.x=a*i-s*r+e.x,this.y=a*r+s*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ir{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,a,s,o){let c=i[r+0],l=i[r+1],h=i[r+2],f=i[r+3],u=a[s+0],d=a[s+1],g=a[s+2],_=a[s+3];if(f!==_||c!==u||l!==d||h!==g){let m=c*u+l*d+h*g+f*_;m<0&&(u=-u,d=-d,g=-g,_=-_,m=-m);let p=1-o;if(m<.9995){const M=Math.acos(m),y=Math.sin(M);p=Math.sin(p*M)/y,o=Math.sin(o*M)/y,c=c*p+u*o,l=l*p+d*o,h=h*p+g*o,f=f*p+_*o}else{c=c*p+u*o,l=l*p+d*o,h=h*p+g*o,f=f*p+_*o;const M=1/Math.sqrt(c*c+l*l+h*h+f*f);c*=M,l*=M,h*=M,f*=M}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,a,s){const o=i[r],c=i[r+1],l=i[r+2],h=i[r+3],f=a[s],u=a[s+1],d=a[s+2],g=a[s+3];return e[t]=o*g+h*f+c*d-l*u,e[t+1]=c*g+h*u+l*f-o*d,e[t+2]=l*g+h*d+o*u-c*f,e[t+3]=h*g-o*f-c*u-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,a=e._z,s=e._order,o=Math.cos,c=Math.sin,l=o(i/2),h=o(r/2),f=o(a/2),u=c(i/2),d=c(r/2),g=c(a/2);switch(s){case"XYZ":this._x=u*h*f+l*d*g,this._y=l*d*f-u*h*g,this._z=l*h*g+u*d*f,this._w=l*h*f-u*d*g;break;case"YXZ":this._x=u*h*f+l*d*g,this._y=l*d*f-u*h*g,this._z=l*h*g-u*d*f,this._w=l*h*f+u*d*g;break;case"ZXY":this._x=u*h*f-l*d*g,this._y=l*d*f+u*h*g,this._z=l*h*g+u*d*f,this._w=l*h*f-u*d*g;break;case"ZYX":this._x=u*h*f-l*d*g,this._y=l*d*f+u*h*g,this._z=l*h*g-u*d*f,this._w=l*h*f+u*d*g;break;case"YZX":this._x=u*h*f+l*d*g,this._y=l*d*f+u*h*g,this._z=l*h*g-u*d*f,this._w=l*h*f-u*d*g;break;case"XZY":this._x=u*h*f-l*d*g,this._y=l*d*f-u*h*g,this._z=l*h*g+u*d*f,this._w=l*h*f+u*d*g;break;default:ze("Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],a=t[8],s=t[1],o=t[5],c=t[9],l=t[2],h=t[6],f=t[10],u=i+o+f;if(u>0){const d=.5/Math.sqrt(u+1);this._w=.25/d,this._x=(h-c)*d,this._y=(a-l)*d,this._z=(s-r)*d}else if(i>o&&i>f){const d=2*Math.sqrt(1+i-o-f);this._w=(h-c)/d,this._x=.25*d,this._y=(r+s)/d,this._z=(a+l)/d}else if(o>f){const d=2*Math.sqrt(1+o-i-f);this._w=(a-l)/d,this._x=(r+s)/d,this._y=.25*d,this._z=(c+h)/d}else{const d=2*Math.sqrt(1+f-i-o);this._w=(s-r)/d,this._x=(a+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(je(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,a=e._z,s=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=i*h+s*o+r*l-a*c,this._y=r*h+s*c+a*o-i*l,this._z=a*h+s*l+i*c-r*o,this._w=s*h-i*o-r*c-a*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,a=e._z,s=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,a=-a,s=-s,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+a*t,this._w=this._w*c+s*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+a*t,this._w=this._w*c+s*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class W{static{W.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(el.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(el.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[3]*i+a[6]*r,this.y=a[1]*t+a[4]*i+a[7]*r,this.z=a[2]*t+a[5]*i+a[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,a=e.elements,s=1/(a[3]*t+a[7]*i+a[11]*r+a[15]);return this.x=(a[0]*t+a[4]*i+a[8]*r+a[12])*s,this.y=(a[1]*t+a[5]*i+a[9]*r+a[13])*s,this.z=(a[2]*t+a[6]*i+a[10]*r+a[14])*s,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,a=e.x,s=e.y,o=e.z,c=e.w,l=2*(s*r-o*i),h=2*(o*t-a*r),f=2*(a*i-s*t);return this.x=t+c*l+s*f-o*h,this.y=i+c*h+o*l-a*f,this.z=r+c*f+a*h-s*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r,this.y=a[1]*t+a[5]*i+a[9]*r,this.z=a[2]*t+a[6]*i+a[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this.z=je(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this.z=je(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(je(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,a=e.z,s=t.x,o=t.y,c=t.z;return this.x=r*c-a*o,this.y=a*s-i*c,this.z=i*o-r*s,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Va.copy(this).projectOnVector(e),this.sub(Va)}reflect(e){return this.sub(Va.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(je(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Va=new W,el=new ir;class Ve{static{Ve.prototype.isMatrix3=!0}constructor(e,t,i,r,a,s,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,a,s,o,c,l)}set(e,t,i,r,a,s,o,c,l){const h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=t,h[4]=a,h[5]=c,h[6]=i,h[7]=s,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,a=this.elements,s=i[0],o=i[3],c=i[6],l=i[1],h=i[4],f=i[7],u=i[2],d=i[5],g=i[8],_=r[0],m=r[3],p=r[6],M=r[1],y=r[4],b=r[7],A=r[2],w=r[5],C=r[8];return a[0]=s*_+o*M+c*A,a[3]=s*m+o*y+c*w,a[6]=s*p+o*b+c*C,a[1]=l*_+h*M+f*A,a[4]=l*m+h*y+f*w,a[7]=l*p+h*b+f*C,a[2]=u*_+d*M+g*A,a[5]=u*m+d*y+g*w,a[8]=u*p+d*b+g*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],s=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*s*h-t*o*l-i*a*h+i*o*c+r*a*l-r*s*c}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],s=e[4],o=e[5],c=e[6],l=e[7],h=e[8],f=h*s-o*l,u=o*c-h*a,d=l*a-s*c,g=t*f+i*u+r*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=f*_,e[1]=(r*l-h*i)*_,e[2]=(o*i-r*s)*_,e[3]=u*_,e[4]=(h*t-r*c)*_,e[5]=(r*a-o*t)*_,e[6]=d*_,e[7]=(i*c-l*t)*_,e[8]=(s*t-i*a)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,a,s,o){const c=Math.cos(a),l=Math.sin(a);return this.set(i*c,i*l,-i*(c*s+l*o)+s+e,-r*l,r*c,-r*(-l*s+c*o)+o+t,0,0,1),this}scale(e,t){return Zi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Wa.makeScale(e,t)),this}rotate(e){return Zi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Wa.makeRotation(-e)),this}translate(e,t){return Zi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Wa.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Wa=new Ve,tl=new Ve().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),nl=new Ve().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ad(){const n={enabled:!0,workingColorSpace:Tr,spaces:{},convert:function(r,a,s){return this.enabled===!1||a===s||!a||!s||(this.spaces[a].transfer===ht&&(r.r=Vn(r.r),r.g=Vn(r.g),r.b=Vn(r.b)),this.spaces[a].primaries!==this.spaces[s].primaries&&(r.applyMatrix3(this.spaces[a].toXYZ),r.applyMatrix3(this.spaces[s].fromXYZ)),this.spaces[s].transfer===ht&&(r.r=$i(r.r),r.g=$i(r.g),r.b=$i(r.b))),r},workingToColorSpace:function(r,a){return this.convert(r,this.workingColorSpace,a)},colorSpaceToWorking:function(r,a){return this.convert(r,a,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===pn?_a:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,a=this.workingColorSpace){return r.fromArray(this.spaces[a].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,a,s){return r.copy(this.spaces[a].toXYZ).multiply(this.spaces[s].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,a){return Zi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,a)},toWorkingColorSpace:function(r,a){return Zi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,a)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Tr]:{primaries:e,whitePoint:i,transfer:_a,toXYZ:tl,fromXYZ:nl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:an},outputColorSpaceConfig:{drawingBufferColorSpace:an}},[an]:{primaries:e,whitePoint:i,transfer:ht,toXYZ:tl,fromXYZ:nl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:an}}}),n}const Qe=ad();function Vn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function $i(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Pi;class sd{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Pi===void 0&&(Pi=va("canvas")),Pi.width=e.width,Pi.height=e.height;const r=Pi.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Pi}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=va("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),a=r.data;for(let s=0;s<a.length;s++)a[s]=Vn(a[s]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Vn(t[i]/255)*255):t[i]=Vn(t[i]);return{data:t,width:e.width,height:e.height}}else return ze("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let od=0;class wo{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:od++}),this.uuid=Pr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let a;if(Array.isArray(r)){a=[];for(let s=0,o=r.length;s<o;s++)r[s].isDataTexture?a.push(Xa(r[s].image)):a.push(Xa(r[s]))}else a=Xa(r);i.url=a}return t||(e.images[this.uuid]=i),i}}function Xa(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?sd.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(ze("Texture: Unable to serialize Texture."),{})}let ld=0;const Ya=new W;class Yt extends Ti{constructor(e=Yt.DEFAULT_IMAGE,t=Yt.DEFAULT_MAPPING,i=zn,r=zn,a=Ct,s=_i,o=on,c=en,l=Yt.DEFAULT_ANISOTROPY,h=pn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ld++}),this.uuid=Pr(),this.name="",this.source=new wo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=a,this.minFilter=s,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new We(0,0),this.repeat=new We(1,1),this.center=new We(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ya).x}get height(){return this.source.getSize(Ya).y}get depth(){return this.source.getSize(Ya).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){ze(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){ze(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==fc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Es:e.x=e.x-Math.floor(e.x);break;case zn:e.x=e.x<0?0:1;break;case ys:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Es:e.y=e.y-Math.floor(e.y);break;case zn:e.y=e.y<0?0:1;break;case ys:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Yt.DEFAULT_IMAGE=null;Yt.DEFAULT_MAPPING=fc;Yt.DEFAULT_ANISOTROPY=1;class Et{static{Et.prototype.isVector4=!0}constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,a=this.w,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r+s[12]*a,this.y=s[1]*t+s[5]*i+s[9]*r+s[13]*a,this.z=s[2]*t+s[6]*i+s[10]*r+s[14]*a,this.w=s[3]*t+s[7]*i+s[11]*r+s[15]*a,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,a;const c=e.elements,l=c[0],h=c[4],f=c[8],u=c[1],d=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(h-u)<.01&&Math.abs(f-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(f+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(l+1)/2,b=(d+1)/2,A=(p+1)/2,w=(h+u)/4,C=(f+_)/4,S=(g+m)/4;return y>b&&y>A?y<.01?(i=0,r=.707106781,a=.707106781):(i=Math.sqrt(y),r=w/i,a=C/i):b>A?b<.01?(i=.707106781,r=0,a=.707106781):(r=Math.sqrt(b),i=w/r,a=S/r):A<.01?(i=.707106781,r=.707106781,a=0):(a=Math.sqrt(A),i=C/a,r=S/a),this.set(i,r,a,t),this}let M=Math.sqrt((m-g)*(m-g)+(f-_)*(f-_)+(u-h)*(u-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(f-_)/M,this.z=(u-h)/M,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this.z=je(this.z,e.z,t.z),this.w=je(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this.z=je(this.z,e,t),this.w=je(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(je(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class cd extends Ti{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ct,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Et(0,0,e,t),this.scissorTest=!1,this.viewport=new Et(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:i.depth},a=new Yt(r),s=i.count;for(let o=0;o<s;o++)this.textures[o]=a.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Ct,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,a=this.textures.length;r<a;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new wo(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ln extends cd{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class bc extends Yt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=It,this.minFilter=It,this.wrapR=zn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class ud extends Yt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=It,this.minFilter=It,this.wrapR=zn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class wt{static{wt.prototype.isMatrix4=!0}constructor(e,t,i,r,a,s,o,c,l,h,f,u,d,g,_,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,a,s,o,c,l,h,f,u,d,g,_,m)}set(e,t,i,r,a,s,o,c,l,h,f,u,d,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=r,p[1]=a,p[5]=s,p[9]=o,p[13]=c,p[2]=l,p[6]=h,p[10]=f,p[14]=u,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new wt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,r=1/Li.setFromMatrixColumn(e,0).length(),a=1/Li.setFromMatrixColumn(e,1).length(),s=1/Li.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*a,t[5]=i[5]*a,t[6]=i[6]*a,t[7]=0,t[8]=i[8]*s,t[9]=i[9]*s,t[10]=i[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,a=e.z,s=Math.cos(i),o=Math.sin(i),c=Math.cos(r),l=Math.sin(r),h=Math.cos(a),f=Math.sin(a);if(e.order==="XYZ"){const u=s*h,d=s*f,g=o*h,_=o*f;t[0]=c*h,t[4]=-c*f,t[8]=l,t[1]=d+g*l,t[5]=u-_*l,t[9]=-o*c,t[2]=_-u*l,t[6]=g+d*l,t[10]=s*c}else if(e.order==="YXZ"){const u=c*h,d=c*f,g=l*h,_=l*f;t[0]=u+_*o,t[4]=g*o-d,t[8]=s*l,t[1]=s*f,t[5]=s*h,t[9]=-o,t[2]=d*o-g,t[6]=_+u*o,t[10]=s*c}else if(e.order==="ZXY"){const u=c*h,d=c*f,g=l*h,_=l*f;t[0]=u-_*o,t[4]=-s*f,t[8]=g+d*o,t[1]=d+g*o,t[5]=s*h,t[9]=_-u*o,t[2]=-s*l,t[6]=o,t[10]=s*c}else if(e.order==="ZYX"){const u=s*h,d=s*f,g=o*h,_=o*f;t[0]=c*h,t[4]=g*l-d,t[8]=u*l+_,t[1]=c*f,t[5]=_*l+u,t[9]=d*l-g,t[2]=-l,t[6]=o*c,t[10]=s*c}else if(e.order==="YZX"){const u=s*c,d=s*l,g=o*c,_=o*l;t[0]=c*h,t[4]=_-u*f,t[8]=g*f+d,t[1]=f,t[5]=s*h,t[9]=-o*h,t[2]=-l*h,t[6]=d*f+g,t[10]=u-_*f}else if(e.order==="XZY"){const u=s*c,d=s*l,g=o*c,_=o*l;t[0]=c*h,t[4]=-f,t[8]=l*h,t[1]=u*f+_,t[5]=s*h,t[9]=d*f-g,t[2]=g*f-d,t[6]=o*h,t[10]=_*f+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(hd,e,fd)}lookAt(e,t,i){const r=this.elements;return Qt.subVectors(e,t),Qt.lengthSq()===0&&(Qt.z=1),Qt.normalize(),Jn.crossVectors(i,Qt),Jn.lengthSq()===0&&(Math.abs(i.z)===1?Qt.x+=1e-4:Qt.z+=1e-4,Qt.normalize(),Jn.crossVectors(i,Qt)),Jn.normalize(),Fr.crossVectors(Qt,Jn),r[0]=Jn.x,r[4]=Fr.x,r[8]=Qt.x,r[1]=Jn.y,r[5]=Fr.y,r[9]=Qt.y,r[2]=Jn.z,r[6]=Fr.z,r[10]=Qt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,a=this.elements,s=i[0],o=i[4],c=i[8],l=i[12],h=i[1],f=i[5],u=i[9],d=i[13],g=i[2],_=i[6],m=i[10],p=i[14],M=i[3],y=i[7],b=i[11],A=i[15],w=r[0],C=r[4],S=r[8],R=r[12],D=r[1],N=r[5],H=r[9],k=r[13],P=r[2],B=r[6],V=r[10],Z=r[14],ie=r[3],K=r[7],ee=r[11],U=r[15];return a[0]=s*w+o*D+c*P+l*ie,a[4]=s*C+o*N+c*B+l*K,a[8]=s*S+o*H+c*V+l*ee,a[12]=s*R+o*k+c*Z+l*U,a[1]=h*w+f*D+u*P+d*ie,a[5]=h*C+f*N+u*B+d*K,a[9]=h*S+f*H+u*V+d*ee,a[13]=h*R+f*k+u*Z+d*U,a[2]=g*w+_*D+m*P+p*ie,a[6]=g*C+_*N+m*B+p*K,a[10]=g*S+_*H+m*V+p*ee,a[14]=g*R+_*k+m*Z+p*U,a[3]=M*w+y*D+b*P+A*ie,a[7]=M*C+y*N+b*B+A*K,a[11]=M*S+y*H+b*V+A*ee,a[15]=M*R+y*k+b*Z+A*U,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],a=e[12],s=e[1],o=e[5],c=e[9],l=e[13],h=e[2],f=e[6],u=e[10],d=e[14],g=e[3],_=e[7],m=e[11],p=e[15],M=c*d-l*u,y=o*d-l*f,b=o*u-c*f,A=s*d-l*h,w=s*u-c*h,C=s*f-o*h;return t*(_*M-m*y+p*b)-i*(g*M-m*A+p*w)+r*(g*y-_*A+p*C)-a*(g*b-_*w+m*C)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],r=e[8],a=e[1],s=e[5],o=e[9],c=e[2],l=e[6],h=e[10];return t*(s*h-o*l)-i*(a*h-o*c)+r*(a*l-s*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],s=e[4],o=e[5],c=e[6],l=e[7],h=e[8],f=e[9],u=e[10],d=e[11],g=e[12],_=e[13],m=e[14],p=e[15],M=t*o-i*s,y=t*c-r*s,b=t*l-a*s,A=i*c-r*o,w=i*l-a*o,C=r*l-a*c,S=h*_-f*g,R=h*m-u*g,D=h*p-d*g,N=f*m-u*_,H=f*p-d*_,k=u*p-d*m,P=M*k-y*H+b*N+A*D-w*R+C*S;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const B=1/P;return e[0]=(o*k-c*H+l*N)*B,e[1]=(r*H-i*k-a*N)*B,e[2]=(_*C-m*w+p*A)*B,e[3]=(u*w-f*C-d*A)*B,e[4]=(c*D-s*k-l*R)*B,e[5]=(t*k-r*D+a*R)*B,e[6]=(m*b-g*C-p*y)*B,e[7]=(h*C-u*b+d*y)*B,e[8]=(s*H-o*D+l*S)*B,e[9]=(i*D-t*H-a*S)*B,e[10]=(g*w-_*b+p*M)*B,e[11]=(f*b-h*w-d*M)*B,e[12]=(o*R-s*N-c*S)*B,e[13]=(t*N-i*R+r*S)*B,e[14]=(_*y-g*A-m*M)*B,e[15]=(h*A-f*y+u*M)*B,this}scale(e){const t=this.elements,i=e.x,r=e.y,a=e.z;return t[0]*=i,t[4]*=r,t[8]*=a,t[1]*=i,t[5]*=r,t[9]*=a,t[2]*=i,t[6]*=r,t[10]*=a,t[3]*=i,t[7]*=r,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),a=1-i,s=e.x,o=e.y,c=e.z,l=a*s,h=a*o;return this.set(l*s+i,l*o-r*c,l*c+r*o,0,l*o+r*c,h*o+i,h*c-r*s,0,l*c-r*o,h*c+r*s,a*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,a,s){return this.set(1,i,a,0,e,1,s,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,a=t._x,s=t._y,o=t._z,c=t._w,l=a+a,h=s+s,f=o+o,u=a*l,d=a*h,g=a*f,_=s*h,m=s*f,p=o*f,M=c*l,y=c*h,b=c*f,A=i.x,w=i.y,C=i.z;return r[0]=(1-(_+p))*A,r[1]=(d+b)*A,r[2]=(g-y)*A,r[3]=0,r[4]=(d-b)*w,r[5]=(1-(u+p))*w,r[6]=(m+M)*w,r[7]=0,r[8]=(g+y)*C,r[9]=(m-M)*C,r[10]=(1-(u+_))*C,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const a=this.determinantAffine();if(a===0)return i.set(1,1,1),t.identity(),this;let s=Li.set(r[0],r[1],r[2]).length();const o=Li.set(r[4],r[5],r[6]).length(),c=Li.set(r[8],r[9],r[10]).length();a<0&&(s=-s),hn.copy(this);const l=1/s,h=1/o,f=1/c;return hn.elements[0]*=l,hn.elements[1]*=l,hn.elements[2]*=l,hn.elements[4]*=h,hn.elements[5]*=h,hn.elements[6]*=h,hn.elements[8]*=f,hn.elements[9]*=f,hn.elements[10]*=f,t.setFromRotationMatrix(hn),i.x=s,i.y=o,i.z=c,this}makePerspective(e,t,i,r,a,s,o=En,c=!1){const l=this.elements,h=2*a/(t-e),f=2*a/(i-r),u=(t+e)/(t-e),d=(i+r)/(i-r);let g,_;if(c)g=a/(s-a),_=s*a/(s-a);else if(o===En)g=-(s+a)/(s-a),_=-2*s*a/(s-a);else if(o===xa)g=-s/(s-a),_=-s*a/(s-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=f,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,a,s,o=En,c=!1){const l=this.elements,h=2/(t-e),f=2/(i-r),u=-(t+e)/(t-e),d=-(i+r)/(i-r);let g,_;if(c)g=1/(s-a),_=s/(s-a);else if(o===En)g=-2/(s-a),_=-(s+a)/(s-a);else if(o===xa)g=-1/(s-a),_=-a/(s-a);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=f,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Li=new W,hn=new wt,hd=new W(0,0,0),fd=new W(1,1,1),Jn=new W,Fr=new W,Qt=new W,il=new wt,rl=new ir;class wi{constructor(e=0,t=0,i=0,r=wi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,a=r[0],s=r[4],o=r[8],c=r[1],l=r[5],h=r[9],f=r[2],u=r[6],d=r[10];switch(t){case"XYZ":this._y=Math.asin(je(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-s,a)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-je(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,a),this._z=0);break;case"ZXY":this._x=Math.asin(je(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-s,l)):(this._y=0,this._z=Math.atan2(c,a));break;case"ZYX":this._y=Math.asin(-je(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,d),this._z=Math.atan2(c,a)):(this._x=0,this._z=Math.atan2(-s,l));break;case"YZX":this._z=Math.asin(je(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-f,a)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-je(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-h,d),this._y=0);break;default:ze("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return il.makeRotationFromQuaternion(e),this.setFromRotationMatrix(il,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return rl.setFromEuler(this),this.setFromQuaternion(rl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}wi.DEFAULT_ORDER="XYZ";class Ec{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let dd=0;const al=new W,Di=new ir,In=new wt,Or=new W,ur=new W,pd=new W,md=new ir,sl=new W(1,0,0),ol=new W(0,1,0),ll=new W(0,0,1),cl={type:"added"},gd={type:"removed"},Ii={type:"childadded",child:null},qa={type:"childremoved",child:null};class tn extends Ti{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:dd++}),this.uuid=Pr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=tn.DEFAULT_UP.clone();const e=new W,t=new wi,i=new ir,r=new W(1,1,1);function a(){i.setFromEuler(t,!1)}function s(){t.setFromQuaternion(i,void 0,!1)}t._onChange(a),i._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new wt},normalMatrix:{value:new Ve}}),this.matrix=new wt,this.matrixWorld=new wt,this.matrixAutoUpdate=tn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ec,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Di.setFromAxisAngle(e,t),this.quaternion.multiply(Di),this}rotateOnWorldAxis(e,t){return Di.setFromAxisAngle(e,t),this.quaternion.premultiply(Di),this}rotateX(e){return this.rotateOnAxis(sl,e)}rotateY(e){return this.rotateOnAxis(ol,e)}rotateZ(e){return this.rotateOnAxis(ll,e)}translateOnAxis(e,t){return al.copy(e).applyQuaternion(this.quaternion),this.position.add(al.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(sl,e)}translateY(e){return this.translateOnAxis(ol,e)}translateZ(e){return this.translateOnAxis(ll,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(In.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Or.copy(e):Or.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),ur.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?In.lookAt(ur,Or,this.up):In.lookAt(Or,ur,this.up),this.quaternion.setFromRotationMatrix(In),r&&(In.extractRotation(r.matrixWorld),Di.setFromRotationMatrix(In),this.quaternion.premultiply(Di.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(tt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(cl),Ii.child=e,this.dispatchEvent(Ii),Ii.child=null):tt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(gd),qa.child=e,this.dispatchEvent(qa),qa.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),In.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),In.multiply(e.parent.matrixWorld)),e.applyMatrix4(In),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(cl),Ii.child=e,this.dispatchEvent(Ii),Ii.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const s=this.children[i].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let a=0,s=r.length;a<s;a++)r[a].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ur,e,pd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ur,md,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,r=e.z,a=this.matrix.elements;a[12]+=t-a[0]*t-a[4]*i-a[8]*r,a[13]+=i-a[1]*t-a[5]*i-a[9]*r,a[14]+=r-a[2]*t-a[6]*i-a[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const a=this.children;for(let s=0,o=a.length;s<o;s++)a[s].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function a(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=a(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const f=c[l];a(e.shapes,f)}else a(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(a(e.materials,this.material[c]));r.material=o}else r.material=a(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(a(e.animations,c))}}if(t){const o=s(e.geometries),c=s(e.materials),l=s(e.textures),h=s(e.images),f=s(e.shapes),u=s(e.skeletons),d=s(e.animations),g=s(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),f.length>0&&(i.shapes=f),u.length>0&&(i.skeletons=u),d.length>0&&(i.animations=d),g.length>0&&(i.nodes=g)}return i.object=r,i;function s(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}tn.DEFAULT_UP=new W(0,1,0);tn.DEFAULT_MATRIX_AUTO_UPDATE=!0;tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Br extends tn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const _d={type:"move"};class Ka{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Br,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Br,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new W,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new W),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Br,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new W,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new W,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,a=null,s=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){s=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,i),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],u=h.position.distanceTo(f.position),d=.02,g=.005;l.inputState.pinching&&u>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,i),a!==null&&(c.matrix.fromArray(a.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,a.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(a.linearVelocity)):c.hasLinearVelocity=!1,a.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(a.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&a!==null&&(r=a),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(_d)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=a!==null),l!==null&&(l.visible=s!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Br;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const yc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Qn={h:0,s:0,l:0},zr={h:0,s:0,l:0};function Za(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class it{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=an){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Qe.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=Qe.workingColorSpace){return this.r=e,this.g=t,this.b=i,Qe.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=Qe.workingColorSpace){if(e=rd(e,1),t=je(t,0,1),i=je(i,0,1),t===0)this.r=this.g=this.b=i;else{const a=i<=.5?i*(1+t):i+t-i*t,s=2*i-a;this.r=Za(s,a,e+1/3),this.g=Za(s,a,e),this.b=Za(s,a,e-1/3)}return Qe.colorSpaceToWorking(this,r),this}setStyle(e,t=an){function i(a){a!==void 0&&parseFloat(a)<1&&ze("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const s=r[1],o=r[2];switch(s){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:ze("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=r[1],s=a.length;if(s===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(s===6)return this.setHex(parseInt(a,16),t);ze("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=an){const i=yc[e.toLowerCase()];return i!==void 0?this.setHex(i,t):ze("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Vn(e.r),this.g=Vn(e.g),this.b=Vn(e.b),this}copyLinearToSRGB(e){return this.r=$i(e.r),this.g=$i(e.g),this.b=$i(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=an){return Qe.workingToColorSpace(Gt.copy(this),e),Math.round(je(Gt.r*255,0,255))*65536+Math.round(je(Gt.g*255,0,255))*256+Math.round(je(Gt.b*255,0,255))}getHexString(e=an){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Qe.workingColorSpace){Qe.workingToColorSpace(Gt.copy(this),t);const i=Gt.r,r=Gt.g,a=Gt.b,s=Math.max(i,r,a),o=Math.min(i,r,a);let c,l;const h=(o+s)/2;if(o===s)c=0,l=0;else{const f=s-o;switch(l=h<=.5?f/(s+o):f/(2-s-o),s){case i:c=(r-a)/f+(r<a?6:0);break;case r:c=(a-i)/f+2;break;case a:c=(i-r)/f+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Qe.workingColorSpace){return Qe.workingToColorSpace(Gt.copy(this),t),e.r=Gt.r,e.g=Gt.g,e.b=Gt.b,e}getStyle(e=an){Qe.workingToColorSpace(Gt.copy(this),e);const t=Gt.r,i=Gt.g,r=Gt.b;return e!==an?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Qn),this.setHSL(Qn.h+e,Qn.s+t,Qn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Qn),e.getHSL(zr);const i=Ha(Qn.h,zr.h,t),r=Ha(Qn.s,zr.s,t),a=Ha(Qn.l,zr.l,t);return this.setHSL(i,r,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,a=e.elements;return this.r=a[0]*t+a[3]*i+a[6]*r,this.g=a[1]*t+a[4]*i+a[7]*r,this.b=a[2]*t+a[5]*i+a[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Gt=new it;it.NAMES=yc;class xd extends tn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new wi,this.environmentIntensity=1,this.environmentRotation=new wi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const fn=new W,Un=new W,$a=new W,Nn=new W,Ui=new W,Ni=new W,ul=new W,Ja=new W,Qa=new W,ja=new W,es=new Et,ts=new Et,ns=new Et;class mn{constructor(e=new W,t=new W,i=new W){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),fn.subVectors(e,t),r.cross(fn);const a=r.lengthSq();return a>0?r.multiplyScalar(1/Math.sqrt(a)):r.set(0,0,0)}static getBarycoord(e,t,i,r,a){fn.subVectors(r,t),Un.subVectors(i,t),$a.subVectors(e,t);const s=fn.dot(fn),o=fn.dot(Un),c=fn.dot($a),l=Un.dot(Un),h=Un.dot($a),f=s*l-o*o;if(f===0)return a.set(0,0,0),null;const u=1/f,d=(l*c-o*h)*u,g=(s*h-o*c)*u;return a.set(1-d-g,g,d)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Nn)===null?!1:Nn.x>=0&&Nn.y>=0&&Nn.x+Nn.y<=1}static getInterpolation(e,t,i,r,a,s,o,c){return this.getBarycoord(e,t,i,r,Nn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(a,Nn.x),c.addScaledVector(s,Nn.y),c.addScaledVector(o,Nn.z),c)}static getInterpolatedAttribute(e,t,i,r,a,s){return es.setScalar(0),ts.setScalar(0),ns.setScalar(0),es.fromBufferAttribute(e,t),ts.fromBufferAttribute(e,i),ns.fromBufferAttribute(e,r),s.setScalar(0),s.addScaledVector(es,a.x),s.addScaledVector(ts,a.y),s.addScaledVector(ns,a.z),s}static isFrontFacing(e,t,i,r){return fn.subVectors(i,t),Un.subVectors(e,t),fn.cross(Un).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return fn.subVectors(this.c,this.b),Un.subVectors(this.a,this.b),fn.cross(Un).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return mn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return mn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,a){return mn.getInterpolation(e,this.a,this.b,this.c,t,i,r,a)}containsPoint(e){return mn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return mn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,a=this.c;let s,o;Ui.subVectors(r,i),Ni.subVectors(a,i),Ja.subVectors(e,i);const c=Ui.dot(Ja),l=Ni.dot(Ja);if(c<=0&&l<=0)return t.copy(i);Qa.subVectors(e,r);const h=Ui.dot(Qa),f=Ni.dot(Qa);if(h>=0&&f<=h)return t.copy(r);const u=c*f-h*l;if(u<=0&&c>=0&&h<=0)return s=c/(c-h),t.copy(i).addScaledVector(Ui,s);ja.subVectors(e,a);const d=Ui.dot(ja),g=Ni.dot(ja);if(g>=0&&d<=g)return t.copy(a);const _=d*l-c*g;if(_<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(i).addScaledVector(Ni,o);const m=h*g-d*f;if(m<=0&&f-h>=0&&d-g>=0)return ul.subVectors(a,r),o=(f-h)/(f-h+(d-g)),t.copy(r).addScaledVector(ul,o);const p=1/(m+_+u);return s=_*p,o=u*p,t.copy(i).addScaledVector(Ui,s).addScaledVector(Ni,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class rr{constructor(e=new W(1/0,1/0,1/0),t=new W(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(dn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(dn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=dn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const a=i.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let s=0,o=a.count;s<o;s++)e.isMesh===!0?e.getVertexPosition(s,dn):dn.fromBufferAttribute(a,s),dn.applyMatrix4(e.matrixWorld),this.expandByPoint(dn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),kr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),kr.copy(i.boundingBox)),kr.applyMatrix4(e.matrixWorld),this.union(kr)}const r=e.children;for(let a=0,s=r.length;a<s;a++)this.expandByObject(r[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,dn),dn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(hr),Gr.subVectors(this.max,hr),Fi.subVectors(e.a,hr),Oi.subVectors(e.b,hr),Bi.subVectors(e.c,hr),jn.subVectors(Oi,Fi),ei.subVectors(Bi,Oi),ci.subVectors(Fi,Bi);let t=[0,-jn.z,jn.y,0,-ei.z,ei.y,0,-ci.z,ci.y,jn.z,0,-jn.x,ei.z,0,-ei.x,ci.z,0,-ci.x,-jn.y,jn.x,0,-ei.y,ei.x,0,-ci.y,ci.x,0];return!is(t,Fi,Oi,Bi,Gr)||(t=[1,0,0,0,1,0,0,0,1],!is(t,Fi,Oi,Bi,Gr))?!1:(Hr.crossVectors(jn,ei),t=[Hr.x,Hr.y,Hr.z],is(t,Fi,Oi,Bi,Gr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,dn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(dn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Fn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Fn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Fn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Fn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Fn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Fn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Fn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Fn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Fn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Fn=[new W,new W,new W,new W,new W,new W,new W,new W],dn=new W,kr=new rr,Fi=new W,Oi=new W,Bi=new W,jn=new W,ei=new W,ci=new W,hr=new W,Gr=new W,Hr=new W,ui=new W;function is(n,e,t,i,r){for(let a=0,s=n.length-3;a<=s;a+=3){ui.fromArray(n,a);const o=r.x*Math.abs(ui.x)+r.y*Math.abs(ui.y)+r.z*Math.abs(ui.z),c=e.dot(ui),l=t.dot(ui),h=i.dot(ui);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const Lt=new W,Vr=new We;let vd=0;class wn extends Ti{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:vd++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=jf,this.updateRanges=[],this.gpuType=bn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,a=this.itemSize;r<a;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Vr.fromBufferAttribute(this,t),Vr.applyMatrix3(e),this.setXY(t,Vr.x,Vr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix3(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix4(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Lt.fromBufferAttribute(this,t),Lt.applyNormalMatrix(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Lt.fromBufferAttribute(this,t),Lt.transformDirection(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=cr(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Kt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=cr(t,this.array)),t}setX(e,t){return this.normalized&&(t=Kt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=cr(t,this.array)),t}setY(e,t){return this.normalized&&(t=Kt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=cr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Kt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=cr(t,this.array)),t}setW(e,t){return this.normalized&&(t=Kt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Kt(t,this.array),i=Kt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Kt(t,this.array),i=Kt(i,this.array),r=Kt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,a){return e*=this.itemSize,this.normalized&&(t=Kt(t,this.array),i=Kt(i,this.array),r=Kt(r,this.array),a=Kt(a,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class wc extends wn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Tc extends wn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Wn extends wn{constructor(e,t,i){super(new Float32Array(e),t,i)}}const Md=new rr,fr=new W,rs=new W;class To{constructor(e=new W,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Md.setFromPoints(e).getCenter(i);let r=0;for(let a=0,s=e.length;a<s;a++)r=Math.max(r,i.distanceToSquared(e[a]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;fr.subVectors(e,this.center);const t=fr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(fr,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(rs.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(fr.copy(e.center).add(rs)),this.expandByPoint(fr.copy(e.center).sub(rs))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Sd=0;const rn=new wt,as=new tn,zi=new W,jt=new rr,dr=new rr,Ft=new W;class Pn extends Ti{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Sd++}),this.uuid=Pr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ed(e)?Tc:wc)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const a=new Ve().getNormalMatrix(e);i.applyNormalMatrix(a),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return rn.makeRotationFromQuaternion(e),this.applyMatrix4(rn),this}rotateX(e){return rn.makeRotationX(e),this.applyMatrix4(rn),this}rotateY(e){return rn.makeRotationY(e),this.applyMatrix4(rn),this}rotateZ(e){return rn.makeRotationZ(e),this.applyMatrix4(rn),this}translate(e,t,i){return rn.makeTranslation(e,t,i),this.applyMatrix4(rn),this}scale(e,t,i){return rn.makeScale(e,t,i),this.applyMatrix4(rn),this}lookAt(e){return as.lookAt(e),as.updateMatrix(),this.applyMatrix4(as.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(zi).negate(),this.translate(zi.x,zi.y,zi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,a=e.length;r<a;r++){const s=e[r];i.push(s.x,s.y,s.z||0)}this.setAttribute("position",new Wn(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const a=e[r];t.setXYZ(r,a.x,a.y,a.z||0)}e.length>t.count&&ze("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new rr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){tt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new W(-1/0,-1/0,-1/0),new W(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const a=t[i];jt.setFromBufferAttribute(a),this.morphTargetsRelative?(Ft.addVectors(this.boundingBox.min,jt.min),this.boundingBox.expandByPoint(Ft),Ft.addVectors(this.boundingBox.max,jt.max),this.boundingBox.expandByPoint(Ft)):(this.boundingBox.expandByPoint(jt.min),this.boundingBox.expandByPoint(jt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&tt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new To);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){tt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new W,1/0);return}if(e){const i=this.boundingSphere.center;if(jt.setFromBufferAttribute(e),t)for(let a=0,s=t.length;a<s;a++){const o=t[a];dr.setFromBufferAttribute(o),this.morphTargetsRelative?(Ft.addVectors(jt.min,dr.min),jt.expandByPoint(Ft),Ft.addVectors(jt.max,dr.max),jt.expandByPoint(Ft)):(jt.expandByPoint(dr.min),jt.expandByPoint(dr.max))}jt.getCenter(i);let r=0;for(let a=0,s=e.count;a<s;a++)Ft.fromBufferAttribute(e,a),r=Math.max(r,i.distanceToSquared(Ft));if(t)for(let a=0,s=t.length;a<s;a++){const o=t[a],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Ft.fromBufferAttribute(o,l),c&&(zi.fromBufferAttribute(e,l),Ft.add(zi)),r=Math.max(r,i.distanceToSquared(Ft))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&tt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){tt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,a=t.uv;let s=this.getAttribute("tangent");(s===void 0||s.count!==i.count)&&(s=new wn(new Float32Array(4*i.count),4),this.setAttribute("tangent",s));const o=[],c=[];for(let S=0;S<i.count;S++)o[S]=new W,c[S]=new W;const l=new W,h=new W,f=new W,u=new We,d=new We,g=new We,_=new W,m=new W;function p(S,R,D){l.fromBufferAttribute(i,S),h.fromBufferAttribute(i,R),f.fromBufferAttribute(i,D),u.fromBufferAttribute(a,S),d.fromBufferAttribute(a,R),g.fromBufferAttribute(a,D),h.sub(l),f.sub(l),d.sub(u),g.sub(u);const N=1/(d.x*g.y-g.x*d.y);isFinite(N)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(f,-d.y).multiplyScalar(N),m.copy(f).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(N),o[S].add(_),o[R].add(_),o[D].add(_),c[S].add(m),c[R].add(m),c[D].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let S=0,R=M.length;S<R;++S){const D=M[S],N=D.start,H=D.count;for(let k=N,P=N+H;k<P;k+=3)p(e.getX(k+0),e.getX(k+1),e.getX(k+2))}const y=new W,b=new W,A=new W,w=new W;function C(S){A.fromBufferAttribute(r,S),w.copy(A);const R=o[S];y.copy(R),y.sub(A.multiplyScalar(A.dot(R))).normalize(),b.crossVectors(w,R);const N=b.dot(c[S])<0?-1:1;s.setXYZW(S,y.x,y.y,y.z,N)}for(let S=0,R=M.length;S<R;++S){const D=M[S],N=D.start,H=D.count;for(let k=N,P=N+H;k<P;k+=3)C(e.getX(k+0)),C(e.getX(k+1)),C(e.getX(k+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new wn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,d=i.count;u<d;u++)i.setXYZ(u,0,0,0);const r=new W,a=new W,s=new W,o=new W,c=new W,l=new W,h=new W,f=new W;if(e)for(let u=0,d=e.count;u<d;u+=3){const g=e.getX(u+0),_=e.getX(u+1),m=e.getX(u+2);r.fromBufferAttribute(t,g),a.fromBufferAttribute(t,_),s.fromBufferAttribute(t,m),h.subVectors(s,a),f.subVectors(r,a),h.cross(f),o.fromBufferAttribute(i,g),c.fromBufferAttribute(i,_),l.fromBufferAttribute(i,m),o.add(h),c.add(h),l.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(_,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let u=0,d=t.count;u<d;u+=3)r.fromBufferAttribute(t,u+0),a.fromBufferAttribute(t,u+1),s.fromBufferAttribute(t,u+2),h.subVectors(s,a),f.subVectors(r,a),h.cross(f),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Ft.fromBufferAttribute(e,t),Ft.normalize(),e.setXYZ(t,Ft.x,Ft.y,Ft.z)}toNonIndexed(){function e(o,c){const l=o.array,h=o.itemSize,f=o.normalized,u=new l.constructor(c.length*h);let d=0,g=0;for(let _=0,m=c.length;_<m;_++){o.isInterleavedBufferAttribute?d=c[_]*o.data.stride+o.offset:d=c[_]*h;for(let p=0;p<h;p++)u[g++]=l[d++]}return new wn(u,h,f)}if(this.index===null)return ze("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Pn,i=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=e(c,i);t.setAttribute(o,l)}const a=this.morphAttributes;for(const o in a){const c=[],l=a[o];for(let h=0,f=l.length;h<f;h++){const u=l[h],d=e(u,i);c.push(d)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const s=this.groups;for(let o=0,c=s.length;o<c;o++){const l=s[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let a=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let f=0,u=l.length;f<u;f++){const d=l[f];h.push(d.toJSON(e.data))}h.length>0&&(r[c]=h,a=!0)}a&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const l in r){const h=r[l];this.setAttribute(l,h.clone(t))}const a=e.morphAttributes;for(const l in a){const h=[],f=a[l];for(let u=0,d=f.length;u<d;u++)h.push(f[u].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const s=e.groups;for(let l=0,h=s.length;l<h;l++){const f=s[l];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ss=new W,bd=new W,Ed=new Ve;class ni{constructor(e=new W(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=ss.subVectors(i,t).cross(bd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const r=e.delta(ss),a=this.normal.dot(r);if(a===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/a;return i===!0&&(s<0||s>1)?null:t.copy(e.start).addScaledVector(r,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Ed.getNormalMatrix(e),r=this.coplanarPoint(ss).applyMatrix4(e),a=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let yd=0;class Aa extends Ti{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:yd++}),this.uuid=Pr(),this.name="",this.type="Material",this.blending=Sr,this.side=bi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=nc,this.blendDst=ic,this.blendEquation=Vi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new it(0,0,0),this.blendAlpha=0,this.depthFunc=Er,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Yf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ka,this.stencilZFail=ka,this.stencilZPass=ka,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){ze(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){ze(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(a=>a.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(a){const s=[];for(const o in a){const c=a[o];delete c.metadata,s.push(c)}return s}if(t){const a=r(e.textures),s=r(e.images);a.length>0&&(i.textures=a),s.length>0&&(i.images=s)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new it().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new ni().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new We().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new We().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let a=0;a!==r;++a)i[a]=t[a].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const On=new W,os=new W,Wr=new W,Xr=new W;class wd{constructor(e=new W,t=new W(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,On)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=On.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(On.copy(this.origin).addScaledVector(this.direction,t),On.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){os.copy(e).add(t).multiplyScalar(.5),Wr.copy(t).sub(e).normalize(),Xr.copy(this.origin).sub(os);const a=e.distanceTo(t)*.5,s=-this.direction.dot(Wr),o=Xr.dot(this.direction),c=-Xr.dot(Wr),l=Xr.lengthSq(),h=Math.abs(1-s*s);let f,u,d,g;if(h>0)if(f=s*c-o,u=s*o-c,g=a*h,f>=0)if(u>=-g)if(u<=g){const _=1/h;f*=_,u*=_,d=f*(f+s*u+2*o)+u*(s*f+u+2*c)+l}else u=a,f=Math.max(0,-(s*u+o)),d=-f*f+u*(u+2*c)+l;else u=-a,f=Math.max(0,-(s*u+o)),d=-f*f+u*(u+2*c)+l;else u<=-g?(f=Math.max(0,-(-s*a+o)),u=f>0?-a:Math.min(Math.max(-a,-c),a),d=-f*f+u*(u+2*c)+l):u<=g?(f=0,u=Math.min(Math.max(-a,-c),a),d=u*(u+2*c)+l):(f=Math.max(0,-(s*a+o)),u=f>0?a:Math.min(Math.max(-a,-c),a),d=-f*f+u*(u+2*c)+l);else u=s>0?-a:a,f=Math.max(0,-(s*u+o)),d=-f*f+u*(u+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(os).addScaledVector(Wr,u),d}intersectSphere(e,t){if(e.radius<0)return null;On.subVectors(e.center,this.origin);const i=On.dot(this.direction),r=On.dot(On)-i*i,a=e.radius*e.radius;if(r>a)return null;const s=Math.sqrt(a-r),o=i-s,c=i+s;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,a,s,o,c;const l=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return l>=0?(i=(e.min.x-u.x)*l,r=(e.max.x-u.x)*l):(i=(e.max.x-u.x)*l,r=(e.min.x-u.x)*l),h>=0?(a=(e.min.y-u.y)*h,s=(e.max.y-u.y)*h):(a=(e.max.y-u.y)*h,s=(e.min.y-u.y)*h),i>s||a>r||((a>i||isNaN(i))&&(i=a),(s<r||isNaN(r))&&(r=s),f>=0?(o=(e.min.z-u.z)*f,c=(e.max.z-u.z)*f):(o=(e.max.z-u.z)*f,c=(e.min.z-u.z)*f),i>c||o>r)||((o>i||i!==i)&&(i=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,On)!==null}intersectTriangle(e,t,i,r,a){const s=this.origin,o=this.direction,c=o.x,l=o.y,h=o.z,f=e.x-s.x,u=e.y-s.y,d=e.z-s.z,g=t.x-s.x,_=t.y-s.y,m=t.z-s.z,p=i.x-s.x,M=i.y-s.y,y=i.z-s.z,b=Math.abs(c),A=Math.abs(l),w=Math.abs(h);let C,S,R,D,N,H,k,P,B,V,Z,ie;if(b>=A&&b>=w?(R=c,H=f,B=g,ie=p,c>=0?(C=l,S=h,D=u,N=d,k=_,P=m,V=M,Z=y):(C=h,S=l,D=d,N=u,k=m,P=_,V=y,Z=M)):A>=w?(R=l,H=u,B=_,ie=M,l>=0?(C=h,S=c,D=d,N=f,k=m,P=g,V=y,Z=p):(C=c,S=h,D=f,N=d,k=g,P=m,V=p,Z=y)):(R=h,H=d,B=m,ie=y,h>=0?(C=c,S=l,D=f,N=u,k=g,P=_,V=p,Z=M):(C=l,S=c,D=u,N=f,k=_,P=g,V=M,Z=p)),R===0)return null;const K=C/R,ee=S/R,U=1/R,re=D-K*H,oe=N-ee*H,Re=k-K*B,Fe=P-ee*B,ke=V-K*ie,L=Z-ee*ie,X=ke*Fe-L*Re,ae=re*L-oe*ke,xe=Re*oe-Fe*re;if(r){if(X<0||ae<0||xe<0)return null}else if((X<0||ae<0||xe<0)&&(X>0||ae>0||xe>0))return null;const ce=X+ae+xe;if(ce===0)return null;const we=U*(X*H+ae*B+xe*ie);return(ce>0?we<0:we>0)?null:this.at(we/ce,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ac extends Aa{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new it(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wi,this.combine=rc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const hl=new wt,hi=new wd,Yr=new To,fl=new W,qr=new W,Kr=new W,Zr=new W,ls=new W,$r=new W,dl=new W,Jr=new W;class qt extends tn{constructor(e=new Pn,t=new Ac){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,s=r.length;a<s;a++){const o=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,a=i.morphAttributes.position,s=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(a&&o){$r.set(0,0,0);for(let c=0,l=a.length;c<l;c++){const h=o[c],f=a[c];h!==0&&(ls.fromBufferAttribute(f,e),s?$r.addScaledVector(ls,h):$r.addScaledVector(ls.sub(t),h))}t.add($r)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,r=this.material,a=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Yr.copy(i.boundingSphere),Yr.applyMatrix4(a),hi.copy(e.ray).recast(e.near),!(Yr.containsPoint(hi.origin)===!1&&(hi.intersectSphere(Yr,fl)===null||hi.origin.distanceToSquared(fl)>(e.far-e.near)**2))&&(hl.copy(a).invert(),hi.copy(e.ray).applyMatrix4(hl),!(i.boundingBox!==null&&hi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,hi)))}_computeIntersections(e,t,i){let r;const a=this.geometry,s=this.material,o=a.index,c=a.attributes.position,l=a.attributes.uv,h=a.attributes.uv1,f=a.attributes.normal,u=a.groups,d=a.drawRange;if(o!==null)if(Array.isArray(s))for(let g=0,_=u.length;g<_;g++){const m=u[g],p=s[m.materialIndex],M=Math.max(m.start,d.start),y=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let b=M,A=y;b<A;b+=3){const w=o.getX(b),C=o.getX(b+1),S=o.getX(b+2);r=Qr(this,p,e,i,l,h,f,w,C,S),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,d.start),_=Math.min(o.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const M=o.getX(m),y=o.getX(m+1),b=o.getX(m+2);r=Qr(this,s,e,i,l,h,f,M,y,b),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(s))for(let g=0,_=u.length;g<_;g++){const m=u[g],p=s[m.materialIndex],M=Math.max(m.start,d.start),y=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let b=M,A=y;b<A;b+=3){const w=b,C=b+1,S=b+2;r=Qr(this,p,e,i,l,h,f,w,C,S),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,d.start),_=Math.min(c.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const M=m,y=m+1,b=m+2;r=Qr(this,s,e,i,l,h,f,M,y,b),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function Td(n,e,t,i,r,a,s,o){let c;if(e.side===$t?c=i.intersectTriangle(s,a,r,!0,o):c=i.intersectTriangle(r,a,s,e.side===bi,o),c===null)return null;Jr.copy(o),Jr.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Jr);return l<t.near||l>t.far?null:{distance:l,point:Jr.clone(),object:n}}function Qr(n,e,t,i,r,a,s,o,c,l){n.getVertexPosition(o,qr),n.getVertexPosition(c,Kr),n.getVertexPosition(l,Zr);const h=Td(n,e,t,i,qr,Kr,Zr,dl);if(h){const f=new W;mn.getBarycoord(dl,qr,Kr,Zr,f),r&&(h.uv=mn.getInterpolatedAttribute(r,o,c,l,f,new We)),a&&(h.uv1=mn.getInterpolatedAttribute(a,o,c,l,f,new We)),s&&(h.normal=mn.getInterpolatedAttribute(s,o,c,l,f,new W),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:c,c:l,normal:new W,materialIndex:0};mn.getNormal(qr,Kr,Zr,u.normal),h.face=u,h.barycoord=f}return h}class Yi extends Yt{constructor(e=null,t=1,i=1,r,a,s,o,c,l=It,h=It,f,u){super(null,s,o,c,l,h,r,a,f,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Rc extends wn{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const fi=new To,Ad=new We(.5,.5),jr=new W;class Ao{constructor(e=new ni,t=new ni,i=new ni,r=new ni,a=new ni,s=new ni){this.planes=[e,t,i,r,a,s]}set(e,t,i,r,a,s){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(a),o[5].copy(s),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=En,i=!1){const r=this.planes,a=e.elements,s=a[0],o=a[1],c=a[2],l=a[3],h=a[4],f=a[5],u=a[6],d=a[7],g=a[8],_=a[9],m=a[10],p=a[11],M=a[12],y=a[13],b=a[14],A=a[15];if(r[0].setComponents(l-s,d-h,p-g,A-M).normalize(),r[1].setComponents(l+s,d+h,p+g,A+M).normalize(),r[2].setComponents(l+o,d+f,p+_,A+y).normalize(),r[3].setComponents(l-o,d-f,p-_,A-y).normalize(),i)r[4].setComponents(c,u,m,b).normalize(),r[5].setComponents(l-c,d-u,p-m,A-b).normalize();else if(r[4].setComponents(l-c,d-u,p-m,A-b).normalize(),t===En)r[5].setComponents(l+c,d+u,p+m,A+b).normalize();else if(t===xa)r[5].setComponents(c,u,m,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),fi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),fi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(fi)}intersectsSprite(e){fi.center.set(0,0,0);const t=Ad.distanceTo(e.center);return fi.radius=.7071067811865476+t,fi.applyMatrix4(e.matrixWorld),this.intersectsSphere(fi)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(jr.x=r.normal.x>0?e.max.x:e.min.x,jr.y=r.normal.y>0?e.max.y:e.min.y,jr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(jr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Cc extends Yt{constructor(e=[],t=Ei,i,r,a,s,o,c,l,h){super(e,t,i,r,a,s,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Ar extends Yt{constructor(e,t,i=Rn,r,a,s,o=It,c=It,l,h=Yn,f=1){if(h!==Yn&&h!==xi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:f};super(u,r,a,s,o,c,h,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new wo(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class Rd extends Ar{constructor(e,t=Rn,i=Ei,r,a,s=It,o=It,c,l=Yn){const h={width:e,height:e,depth:1},f=[h,h,h,h,h,h];super(e,e,t,i,r,a,s,o,c,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Pc extends Yt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Lr extends Pn{constructor(e=1,t=1,i=1,r=1,a=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:a,depthSegments:s};const o=this;r=Math.floor(r),a=Math.floor(a),s=Math.floor(s);const c=[],l=[],h=[],f=[];let u=0,d=0;g("z","y","x",-1,-1,i,t,e,s,a,0),g("z","y","x",1,-1,i,t,-e,s,a,1),g("x","z","y",1,1,e,i,t,r,s,2),g("x","z","y",1,-1,e,i,-t,r,s,3),g("x","y","z",1,-1,e,t,i,r,a,4),g("x","y","z",-1,-1,e,t,-i,r,a,5),this.setIndex(c),this.setAttribute("position",new Wn(l,3)),this.setAttribute("normal",new Wn(h,3)),this.setAttribute("uv",new Wn(f,2));function g(_,m,p,M,y,b,A,w,C,S,R){const D=b/C,N=A/S,H=b/2,k=A/2,P=w/2,B=C+1,V=S+1;let Z=0,ie=0;const K=new W;for(let ee=0;ee<V;ee++){const U=ee*N-k;for(let re=0;re<B;re++){const oe=re*D-H;K[_]=oe*M,K[m]=U*y,K[p]=P,l.push(K.x,K.y,K.z),K[_]=0,K[m]=0,K[p]=w>0?1:-1,h.push(K.x,K.y,K.z),f.push(re/C),f.push(1-ee/S),Z+=1}}for(let ee=0;ee<S;ee++)for(let U=0;U<C;U++){const re=u+U+B*ee,oe=u+U+B*(ee+1),Re=u+(U+1)+B*(ee+1),Fe=u+(U+1)+B*ee;c.push(re,oe,Fe),c.push(oe,Re,Fe),ie+=6}o.addGroup(d,ie,R),d+=ie,u+=Z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Lr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Ln extends Pn{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const a=e/2,s=t/2,o=Math.floor(i),c=Math.floor(r),l=o+1,h=c+1,f=e/o,u=t/c,d=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const M=p*u-s;for(let y=0;y<l;y++){const b=y*f-a;g.push(b,-M,0),_.push(0,0,1),m.push(y/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let M=0;M<o;M++){const y=M+l*p,b=M+l*(p+1),A=M+1+l*(p+1),w=M+1+l*p;d.push(y,b,w),d.push(b,A,w)}this.setIndex(d),this.setAttribute("position",new Wn(g,3)),this.setAttribute("normal",new Wn(_,3)),this.setAttribute("uv",new Wn(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ln(e.width,e.height,e.widthSegments,e.heightSegments)}}function tr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];if(pl(r))r.isRenderTargetTexture?(ze("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(pl(r[0])){const a=[];for(let s=0,o=r.length;s<o;s++)a[s]=r[s].clone();e[t][i]=a}else e[t][i]=r.slice();else e[t][i]=r}}return e}function Xt(n){const e={};for(let t=0;t<n.length;t++){const i=tr(n[t]);for(const r in i)e[r]=i[r]}return e}function pl(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Cd(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Lc(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Qe.workingColorSpace}const Pd={clone:tr,merge:Xt};var Ld=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Dd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Vt extends Aa{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ld,this.fragmentShader=Dd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=tr(e.uniforms),this.uniformsGroups=Cd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const s=this.uniforms[r].value;s&&s.isTexture?t.uniforms[r]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[r]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[r]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[r]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[r]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[r]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[r]={type:"m4",value:s.toArray()}:t.uniforms[r]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new it().setHex(r.value);break;case"v2":this.uniforms[i].value=new We().fromArray(r.value);break;case"v3":this.uniforms[i].value=new W().fromArray(r.value);break;case"v4":this.uniforms[i].value=new Et().fromArray(r.value);break;case"m3":this.uniforms[i].value=new Ve().fromArray(r.value);break;case"m4":this.uniforms[i].value=new wt().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Id extends Vt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Ud extends Aa{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Wf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Nd extends Aa{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const ea=new W,ta=new ir,xn=new W;class Dc extends tn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new wt,this.projectionMatrix=new wt,this.projectionMatrixInverse=new wt,this.coordinateSystem=En,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ea,ta,xn),xn.x===1&&xn.y===1&&xn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ea,ta,xn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(ea,ta,xn),xn.x===1&&xn.y===1&&xn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ea,ta,xn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ti=new W,ml=new We,gl=new We;class sn extends Dc{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=to*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ga*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return to*2*Math.atan(Math.tan(Ga*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){ti.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ti.x,ti.y).multiplyScalar(-e/ti.z),ti.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ti.x,ti.y).multiplyScalar(-e/ti.z)}getViewSize(e,t){return this.getViewBounds(e,ml,gl),t.subVectors(gl,ml)}setViewOffset(e,t,i,r,a,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ga*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,a=-.5*r;const s=this.view;if(this.view!==null&&this.view.enabled){const c=s.fullWidth,l=s.fullHeight;a+=s.offsetX*r/c,t-=s.offsetY*i/l,r*=s.width/c,i*=s.height/l}const o=this.filmOffset;o!==0&&(a+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Ro extends Dc{constructor(e=-1,t=1,i=1,r=-1,a=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=a,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,a,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let a=i-e,s=i+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=l*this.view.offsetX,s=a+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(a,s,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Ic extends Pn{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}const ki=-90,Gi=1;class Fd extends tn{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new sn(ki,Gi,e,t);r.layers=this.layers,this.add(r);const a=new sn(ki,Gi,e,t);a.layers=this.layers,this.add(a);const s=new sn(ki,Gi,e,t);s.layers=this.layers,this.add(s);const o=new sn(ki,Gi,e,t);o.layers=this.layers,this.add(o);const c=new sn(ki,Gi,e,t);c.layers=this.layers,this.add(c);const l=new sn(ki,Gi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,a,s,o,c]=t;for(const l of t)this.remove(l);if(e===En)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===xa)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,s,o,c,l,h]=this.children,f=e.getRenderTarget(),u=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,1,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,2,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,4,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(f,u,d),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Od extends sn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Uc{static{Uc.prototype.isMatrix2=!0}constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){const a=this.elements;return a[0]=e,a[2]=t,a[1]=i,a[3]=r,this}}function _l(n,e,t,i){const r=Bd(i);switch(t){case _c:return n*e;case vc:return n*e/r.components*r.byteLength;case Mo:return n*e/r.components*r.byteLength;case yi:return n*e*2/r.components*r.byteLength;case So:return n*e*2/r.components*r.byteLength;case xc:return n*e*3/r.components*r.byteLength;case on:return n*e*4/r.components*r.byteLength;case bo:return n*e*4/r.components*r.byteLength;case ca:case ua:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ha:case fa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ts:case Rs:return Math.max(n,16)*Math.max(e,8)/4;case ws:case As:return Math.max(n,8)*Math.max(e,8)/2;case Cs:case Ps:case Ds:case Is:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ls:case ma:case Us:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ns:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Fs:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Os:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Bs:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case zs:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case ks:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Gs:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Hs:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Vs:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Ws:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Xs:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Ys:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case qs:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Ks:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Zs:case $s:case Js:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Qs:case js:return Math.ceil(n/4)*Math.ceil(e/4)*8;case ga:case eo:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Bd(n){switch(n){case en:case dc:return{byteLength:1,components:1};case yr:case pc:case Cn:return{byteLength:2,components:1};case xo:case vo:return{byteLength:2,components:4};case Rn:case _o:case bn:return{byteLength:4,components:1};case mc:case gc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:go}}));typeof window<"u"&&(window.__THREE__?ze("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=go);function Nc(){let n=null,e=!1,t=null,i=null;function r(a,s){i=n.requestAnimationFrame(r),t(a,s)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){n=a}}}function zd(n){const e=new WeakMap;function t(o,c){const l=o.array,h=o.usage,f=l.byteLength,u=n.createBuffer();n.bindBuffer(c,u),n.bufferData(c,l,h),o.onUploadCallback();let d;if(l instanceof Float32Array)d=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=n.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=n.SHORT;else if(l instanceof Uint32Array)d=n.UNSIGNED_INT;else if(l instanceof Int32Array)d=n.INT;else if(l instanceof Int8Array)d=n.BYTE;else if(l instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,c,l){const h=c.array,f=c.updateRanges;if(n.bindBuffer(l,o),f.length===0)n.bufferSubData(l,0,h);else{f.sort((d,g)=>d.start-g.start);let u=0;for(let d=1;d<f.length;d++){const g=f[u],_=f[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++u,f[u]=_)}f.length=u+1;for(let d=0,g=f.length;d<g;d++){const _=f[d];n.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(n.deleteBuffer(c.buffer),e.delete(o))}function s(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:r,remove:a,update:s}}var kd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Gd=`#ifdef USE_ALPHAHASH
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
#endif`,Hd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Vd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Wd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Xd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Yd=`#ifdef USE_AOMAP
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
#endif`,qd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Kd=`#ifdef USE_BATCHING
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
#endif`,Zd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,$d=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Jd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Qd=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,jd=`#ifdef USE_IRIDESCENCE
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
#endif`,ep=`#ifdef USE_BUMPMAP
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
#endif`,tp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,np=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ip=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,rp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ap=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,sp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,op=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,lp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,cp=`#define PI 3.141592653589793
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
} // validated`,up=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,hp=`vec3 transformedNormal = objectNormal;
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
#endif`,fp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,dp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,pp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,mp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,gp="gl_FragColor = linearToOutputTexel( gl_FragColor );",_p=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,xp=`#ifdef USE_ENVMAP
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
#endif`,vp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Mp=`#ifdef USE_ENVMAP
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
#endif`,Sp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,bp=`#ifdef USE_ENVMAP
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
#endif`,Ep=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,yp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,wp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Tp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ap=`#ifdef USE_GRADIENTMAP
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
}`,Rp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Cp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Pp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Lp=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Dp=`#ifdef USE_ENVMAP
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
#endif`,Ip=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Up=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Np=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Fp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Op=`PhysicalMaterial material;
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
#endif`,Bp=`uniform sampler2D dfgLUT;
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
}`,zp=`
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
#endif`,kp=`#if defined( RE_IndirectDiffuse )
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
#endif`,Gp=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Hp=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Vp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Wp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Xp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Yp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,qp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Kp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Zp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,$p=`#if defined( USE_POINTS_UV )
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
#endif`,Jp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Qp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,jp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,em=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,tm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,nm=`#ifdef USE_MORPHTARGETS
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
#endif`,im=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,rm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,am=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,sm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,om=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,cm=`#ifdef USE_NORMALMAP
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
#endif`,um=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,hm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,fm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,dm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,pm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,mm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,gm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,_m=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,xm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,vm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Mm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Sm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,bm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Em=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ym=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,wm=`float getShadowMask() {
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
}`,Tm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Am=`#ifdef USE_SKINNING
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
#endif`,Rm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Cm=`#ifdef USE_SKINNING
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
#endif`,Pm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Lm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Dm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Im=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Um=`#ifdef USE_TRANSMISSION
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
#endif`,Nm=`#ifdef USE_TRANSMISSION
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
#endif`,Fm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Om=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Bm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,zm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const km=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Gm=`uniform sampler2D t2D;
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
}`,Hm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Vm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Wm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Xm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ym=`#include <common>
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
}`,qm=`#if DEPTH_PACKING == 3200
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
}`,Km=`#define DISTANCE
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
}`,Zm=`#define DISTANCE
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
}`,$m=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Jm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qm=`uniform float scale;
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
}`,jm=`uniform vec3 diffuse;
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
}`,e0=`#include <common>
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
}`,t0=`uniform vec3 diffuse;
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
}`,n0=`#define LAMBERT
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
}`,i0=`#define LAMBERT
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
}`,r0=`#define MATCAP
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
}`,a0=`#define MATCAP
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
}`,s0=`#define NORMAL
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
}`,o0=`#define NORMAL
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
}`,l0=`#define PHONG
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
}`,c0=`#define PHONG
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
}`,u0=`#define STANDARD
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
}`,h0=`#define STANDARD
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
}`,f0=`#define TOON
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
}`,d0=`#define TOON
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
}`,p0=`uniform float size;
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
}`,m0=`uniform vec3 diffuse;
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
}`,g0=`#include <common>
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
}`,_0=`uniform vec3 color;
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
}`,x0=`uniform float rotation;
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
}`,v0=`uniform vec3 diffuse;
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
}`,Ze={alphahash_fragment:kd,alphahash_pars_fragment:Gd,alphamap_fragment:Hd,alphamap_pars_fragment:Vd,alphatest_fragment:Wd,alphatest_pars_fragment:Xd,aomap_fragment:Yd,aomap_pars_fragment:qd,batching_pars_vertex:Kd,batching_vertex:Zd,begin_vertex:$d,beginnormal_vertex:Jd,bsdfs:Qd,iridescence_fragment:jd,bumpmap_pars_fragment:ep,clipping_planes_fragment:tp,clipping_planes_pars_fragment:np,clipping_planes_pars_vertex:ip,clipping_planes_vertex:rp,color_fragment:ap,color_pars_fragment:sp,color_pars_vertex:op,color_vertex:lp,common:cp,cube_uv_reflection_fragment:up,defaultnormal_vertex:hp,displacementmap_pars_vertex:fp,displacementmap_vertex:dp,emissivemap_fragment:pp,emissivemap_pars_fragment:mp,colorspace_fragment:gp,colorspace_pars_fragment:_p,envmap_fragment:xp,envmap_common_pars_fragment:vp,envmap_pars_fragment:Mp,envmap_pars_vertex:Sp,envmap_physical_pars_fragment:Dp,envmap_vertex:bp,fog_vertex:Ep,fog_pars_vertex:yp,fog_fragment:wp,fog_pars_fragment:Tp,gradientmap_pars_fragment:Ap,lightmap_pars_fragment:Rp,lights_lambert_fragment:Cp,lights_lambert_pars_fragment:Pp,lights_pars_begin:Lp,lights_toon_fragment:Ip,lights_toon_pars_fragment:Up,lights_phong_fragment:Np,lights_phong_pars_fragment:Fp,lights_physical_fragment:Op,lights_physical_pars_fragment:Bp,lights_fragment_begin:zp,lights_fragment_maps:kp,lights_fragment_end:Gp,lightprobes_pars_fragment:Hp,logdepthbuf_fragment:Vp,logdepthbuf_pars_fragment:Wp,logdepthbuf_pars_vertex:Xp,logdepthbuf_vertex:Yp,map_fragment:qp,map_pars_fragment:Kp,map_particle_fragment:Zp,map_particle_pars_fragment:$p,metalnessmap_fragment:Jp,metalnessmap_pars_fragment:Qp,morphinstance_vertex:jp,morphcolor_vertex:em,morphnormal_vertex:tm,morphtarget_pars_vertex:nm,morphtarget_vertex:im,normal_fragment_begin:rm,normal_fragment_maps:am,normal_pars_fragment:sm,normal_pars_vertex:om,normal_vertex:lm,normalmap_pars_fragment:cm,clearcoat_normal_fragment_begin:um,clearcoat_normal_fragment_maps:hm,clearcoat_pars_fragment:fm,iridescence_pars_fragment:dm,opaque_fragment:pm,packing:mm,premultiplied_alpha_fragment:gm,project_vertex:_m,dithering_fragment:xm,dithering_pars_fragment:vm,roughnessmap_fragment:Mm,roughnessmap_pars_fragment:Sm,shadowmap_pars_fragment:bm,shadowmap_pars_vertex:Em,shadowmap_vertex:ym,shadowmask_pars_fragment:wm,skinbase_vertex:Tm,skinning_pars_vertex:Am,skinning_vertex:Rm,skinnormal_vertex:Cm,specularmap_fragment:Pm,specularmap_pars_fragment:Lm,tonemapping_fragment:Dm,tonemapping_pars_fragment:Im,transmission_fragment:Um,transmission_pars_fragment:Nm,uv_pars_fragment:Fm,uv_pars_vertex:Om,uv_vertex:Bm,worldpos_vertex:zm,background_vert:km,background_frag:Gm,backgroundCube_vert:Hm,backgroundCube_frag:Vm,cube_vert:Wm,cube_frag:Xm,depth_vert:Ym,depth_frag:qm,distance_vert:Km,distance_frag:Zm,equirect_vert:$m,equirect_frag:Jm,linedashed_vert:Qm,linedashed_frag:jm,meshbasic_vert:e0,meshbasic_frag:t0,meshlambert_vert:n0,meshlambert_frag:i0,meshmatcap_vert:r0,meshmatcap_frag:a0,meshnormal_vert:s0,meshnormal_frag:o0,meshphong_vert:l0,meshphong_frag:c0,meshphysical_vert:u0,meshphysical_frag:h0,meshtoon_vert:f0,meshtoon_frag:d0,points_vert:p0,points_frag:m0,shadow_vert:g0,shadow_frag:_0,sprite_vert:x0,sprite_frag:v0},ge={common:{diffuse:{value:new it(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},envMapRotation:{value:new Ve},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new We(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new it(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new W},probesMax:{value:new W},probesResolution:{value:new W}},points:{diffuse:{value:new it(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new it(16777215)},opacity:{value:1},center:{value:new We(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},Sn={basic:{uniforms:Xt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.fog]),vertexShader:Ze.meshbasic_vert,fragmentShader:Ze.meshbasic_frag},lambert:{uniforms:Xt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new it(0)},envMapIntensity:{value:1}}]),vertexShader:Ze.meshlambert_vert,fragmentShader:Ze.meshlambert_frag},phong:{uniforms:Xt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new it(0)},specular:{value:new it(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphong_vert,fragmentShader:Ze.meshphong_frag},standard:{uniforms:Xt([ge.common,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.roughnessmap,ge.metalnessmap,ge.fog,ge.lights,{emissive:{value:new it(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag},toon:{uniforms:Xt([ge.common,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.gradientmap,ge.fog,ge.lights,{emissive:{value:new it(0)}}]),vertexShader:Ze.meshtoon_vert,fragmentShader:Ze.meshtoon_frag},matcap:{uniforms:Xt([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,{matcap:{value:null}}]),vertexShader:Ze.meshmatcap_vert,fragmentShader:Ze.meshmatcap_frag},points:{uniforms:Xt([ge.points,ge.fog]),vertexShader:Ze.points_vert,fragmentShader:Ze.points_frag},dashed:{uniforms:Xt([ge.common,ge.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ze.linedashed_vert,fragmentShader:Ze.linedashed_frag},depth:{uniforms:Xt([ge.common,ge.displacementmap]),vertexShader:Ze.depth_vert,fragmentShader:Ze.depth_frag},normal:{uniforms:Xt([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,{opacity:{value:1}}]),vertexShader:Ze.meshnormal_vert,fragmentShader:Ze.meshnormal_frag},sprite:{uniforms:Xt([ge.sprite,ge.fog]),vertexShader:Ze.sprite_vert,fragmentShader:Ze.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ze.background_vert,fragmentShader:Ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ve}},vertexShader:Ze.backgroundCube_vert,fragmentShader:Ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ze.cube_vert,fragmentShader:Ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ze.equirect_vert,fragmentShader:Ze.equirect_frag},distance:{uniforms:Xt([ge.common,ge.displacementmap,{referencePosition:{value:new W},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ze.distance_vert,fragmentShader:Ze.distance_frag},shadow:{uniforms:Xt([ge.lights,ge.fog,{color:{value:new it(0)},opacity:{value:1}}]),vertexShader:Ze.shadow_vert,fragmentShader:Ze.shadow_frag}};Sn.physical={uniforms:Xt([Sn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new We(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new it(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new We},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new it(0)},specularColor:{value:new it(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new We},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag};const na={r:0,b:0,g:0},M0=new wt,Fc=new Ve;Fc.set(-1,0,0,0,1,0,0,0,1);function S0(n,e,t,i,r,a){const s=new it(0);let o=r===!0?0:1,c,l,h=null,f=0,u=null;function d(M){let y=M.isScene===!0?M.background:null;if(y&&y.isTexture){const b=M.backgroundBlurriness>0;y=e.get(y,b)}return y}function g(M){let y=!1;const b=d(M);b===null?m(s,o):b&&b.isColor&&(m(b,1),y=!0);const A=n.xr.getEnvironmentBlendMode();A==="additive"?t.buffers.color.setClear(0,0,0,1,a):A==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,a),(n.autoClear||y)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function _(M,y){const b=d(y);b&&(b.isCubeTexture||b.mapping===Ta)?(l===void 0&&(l=new qt(new Lr(1,1,1),new Vt({name:"BackgroundCubeMaterial",uniforms:tr(Sn.backgroundCube.uniforms),vertexShader:Sn.backgroundCube.vertexShader,fragmentShader:Sn.backgroundCube.fragmentShader,side:$t,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(A,w,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=b,l.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(M0.makeRotationFromEuler(y.backgroundRotation)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Fc),l.material.toneMapped=Qe.getTransfer(b.colorSpace)!==ht,(h!==b||f!==b.version||u!==n.toneMapping)&&(l.material.needsUpdate=!0,h=b,f=b.version,u=n.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null)):b&&b.isTexture&&(c===void 0&&(c=new qt(new Ln(2,2),new Vt({name:"BackgroundMaterial",uniforms:tr(Sn.background.uniforms),vertexShader:Sn.background.vertexShader,fragmentShader:Sn.background.fragmentShader,side:bi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=b,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=Qe.getTransfer(b.colorSpace)!==ht,b.matrixAutoUpdate===!0&&b.updateMatrix(),c.material.uniforms.uvTransform.value.copy(b.matrix),(h!==b||f!==b.version||u!==n.toneMapping)&&(c.material.needsUpdate=!0,h=b,f=b.version,u=n.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function m(M,y){M.getRGB(na,Lc(n)),t.buffers.color.setClear(na.r,na.g,na.b,y,a)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return s},setClearColor:function(M,y=1){s.set(M),o=y,m(s,o)},getClearAlpha:function(){return o},setClearAlpha:function(M){o=M,m(s,o)},render:g,addToRenderList:_,dispose:p}}function b0(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=u(null);let a=r,s=!1;function o(N,H,k,P,B){let V=!1;const Z=f(N,P,k,H);a!==Z&&(a=Z,l(a.object)),V=d(N,P,k,B),V&&g(N,P,k,B),B!==null&&e.update(B,n.ELEMENT_ARRAY_BUFFER),(V||s)&&(s=!1,b(N,H,k,P),B!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function c(){return n.createVertexArray()}function l(N){return n.bindVertexArray(N)}function h(N){return n.deleteVertexArray(N)}function f(N,H,k,P){const B=P.wireframe===!0;let V=i[H.id];V===void 0&&(V={},i[H.id]=V);const Z=N.isInstancedMesh===!0?N.id:0;let ie=V[Z];ie===void 0&&(ie={},V[Z]=ie);let K=ie[k.id];K===void 0&&(K={},ie[k.id]=K);let ee=K[B];return ee===void 0&&(ee=u(c()),K[B]=ee),ee}function u(N){const H=[],k=[],P=[];for(let B=0;B<t;B++)H[B]=0,k[B]=0,P[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:H,enabledAttributes:k,attributeDivisors:P,object:N,attributes:{},index:null}}function d(N,H,k,P){const B=a.attributes,V=H.attributes;let Z=0;const ie=k.getAttributes();for(const K in ie)if(ie[K].location>=0){const U=B[K];let re=V[K];if(re===void 0&&(K==="instanceMatrix"&&N.instanceMatrix&&(re=N.instanceMatrix),K==="instanceColor"&&N.instanceColor&&(re=N.instanceColor)),U===void 0||U.attribute!==re||re&&U.data!==re.data)return!0;Z++}return a.attributesNum!==Z||a.index!==P}function g(N,H,k,P){const B={},V=H.attributes;let Z=0;const ie=k.getAttributes();for(const K in ie)if(ie[K].location>=0){let U=V[K];U===void 0&&(K==="instanceMatrix"&&N.instanceMatrix&&(U=N.instanceMatrix),K==="instanceColor"&&N.instanceColor&&(U=N.instanceColor));const re={};re.attribute=U,U&&U.data&&(re.data=U.data),B[K]=re,Z++}a.attributes=B,a.attributesNum=Z,a.index=P}function _(){const N=a.newAttributes;for(let H=0,k=N.length;H<k;H++)N[H]=0}function m(N){p(N,0)}function p(N,H){const k=a.newAttributes,P=a.enabledAttributes,B=a.attributeDivisors;k[N]=1,P[N]===0&&(n.enableVertexAttribArray(N),P[N]=1),B[N]!==H&&(n.vertexAttribDivisor(N,H),B[N]=H)}function M(){const N=a.newAttributes,H=a.enabledAttributes;for(let k=0,P=H.length;k<P;k++)H[k]!==N[k]&&(n.disableVertexAttribArray(k),H[k]=0)}function y(N,H,k,P,B,V,Z){Z===!0?n.vertexAttribIPointer(N,H,k,B,V):n.vertexAttribPointer(N,H,k,P,B,V)}function b(N,H,k,P){_();const B=P.attributes,V=k.getAttributes(),Z=H.defaultAttributeValues;for(const ie in V){const K=V[ie];if(K.location>=0){let ee=B[ie];if(ee===void 0&&(ie==="instanceMatrix"&&N.instanceMatrix&&(ee=N.instanceMatrix),ie==="instanceColor"&&N.instanceColor&&(ee=N.instanceColor)),ee!==void 0){const U=ee.normalized,re=ee.itemSize,oe=e.get(ee);if(oe===void 0)continue;const Re=oe.buffer,Fe=oe.type,ke=oe.bytesPerElement,L=Fe===n.INT||Fe===n.UNSIGNED_INT||ee.gpuType===_o;if(ee.isInterleavedBufferAttribute){const X=ee.data,ae=X.stride,xe=ee.offset;if(X.isInstancedInterleavedBuffer){for(let ce=0;ce<K.locationSize;ce++)p(K.location+ce,X.meshPerAttribute);N.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let ce=0;ce<K.locationSize;ce++)m(K.location+ce);n.bindBuffer(n.ARRAY_BUFFER,Re);for(let ce=0;ce<K.locationSize;ce++)y(K.location+ce,re/K.locationSize,Fe,U,ae*ke,(xe+re/K.locationSize*ce)*ke,L)}else{if(ee.isInstancedBufferAttribute){for(let X=0;X<K.locationSize;X++)p(K.location+X,ee.meshPerAttribute);N.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let X=0;X<K.locationSize;X++)m(K.location+X);n.bindBuffer(n.ARRAY_BUFFER,Re);for(let X=0;X<K.locationSize;X++)y(K.location+X,re/K.locationSize,Fe,U,re*ke,re/K.locationSize*X*ke,L)}}else if(Z!==void 0){const U=Z[ie];if(U!==void 0)switch(U.length){case 2:n.vertexAttrib2fv(K.location,U);break;case 3:n.vertexAttrib3fv(K.location,U);break;case 4:n.vertexAttrib4fv(K.location,U);break;default:n.vertexAttrib1fv(K.location,U)}}}}M()}function A(){R();for(const N in i){const H=i[N];for(const k in H){const P=H[k];for(const B in P){const V=P[B];for(const Z in V)h(V[Z].object),delete V[Z];delete P[B]}}delete i[N]}}function w(N){if(i[N.id]===void 0)return;const H=i[N.id];for(const k in H){const P=H[k];for(const B in P){const V=P[B];for(const Z in V)h(V[Z].object),delete V[Z];delete P[B]}}delete i[N.id]}function C(N){for(const H in i){const k=i[H];for(const P in k){const B=k[P];if(B[N.id]===void 0)continue;const V=B[N.id];for(const Z in V)h(V[Z].object),delete V[Z];delete B[N.id]}}}function S(N){for(const H in i){const k=i[H],P=N.isInstancedMesh===!0?N.id:0,B=k[P];if(B!==void 0){for(const V in B){const Z=B[V];for(const ie in Z)h(Z[ie].object),delete Z[ie];delete B[V]}delete k[P],Object.keys(k).length===0&&delete i[H]}}}function R(){D(),s=!0,a!==r&&(a=r,l(a.object))}function D(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:R,resetDefaultState:D,dispose:A,releaseStatesOfGeometry:w,releaseStatesOfObject:S,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:m,disableUnusedAttributes:M}}function E0(n,e,t){let i;function r(c){i=c}function a(c,l){n.drawArrays(i,c,l),t.update(l,i,1)}function s(c,l,h){h!==0&&(n.drawArraysInstanced(i,c,l,h),t.update(l,i,h))}function o(c,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,h);let u=0;for(let d=0;d<h;d++)u+=l[d];t.update(u,i,1)}this.setMode=r,this.render=a,this.renderInstances=s,this.renderMultiDraw=o}function y0(n,e,t,i){let r;function a(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function s(C){return!(C!==on&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const S=C===Cn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==en&&C!==bn&&!S&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function c(C){if(C==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(ze("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const f=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&ze("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),y=n.getParameter(n.MAX_VARYING_VECTORS),b=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),A=n.getParameter(n.MAX_SAMPLES),w=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:s,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:M,maxVaryings:y,maxFragmentUniforms:b,maxSamples:A,samples:w}}function w0(n){const e=this;let t=null,i=0,r=!1,a=!1;const s=new ni,o=new Ve,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){const d=f.length!==0||u||i!==0||r;return r=u,i=f.length,d},this.beginShadows=function(){a=!0,h(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(f,u){t=h(f,u,0)},this.setState=function(f,u,d){const g=f.clippingPlanes,_=f.clipIntersection,m=f.clipShadows,p=n.get(f);if(!r||g===null||g.length===0||a&&!m)a?h(null):l();else{const M=a?0:i,y=M*4;let b=p.clippingState||null;c.value=b,b=h(g,u,y,d);for(let A=0;A!==y;++A)b[A]=t[A];p.clippingState=b,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(f,u,d,g){const _=f!==null?f.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const p=d+_*4,M=u.matrixWorldInverse;o.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,b=d;y!==_;++y,b+=4)s.copy(f[y]).applyMatrix4(M,o),s.normal.toArray(m,b),m[b+3]=s.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}const qi=4,T0=6,A0=20,R0=256,pr=new Ro,xl=new it;let cs=null,us=0,hs=0,fs=!1;const C0=new W,di=new W;class vl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,a={}){const{size:s=256,position:o=C0}=a;cs=this._renderer.getRenderTarget(),us=this._renderer.getActiveCubeFace(),hs=this._renderer.getActiveMipmapLevel(),fs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(s);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,r,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=bl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Sl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(cs,us,hs),this._renderer.xr.enabled=fs,e.scissorTest=!1,Hi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ei||e.mapping===er?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),cs=this._renderer.getRenderTarget(),us=this._renderer.getActiveCubeFace(),hs=this._renderer.getActiveMipmapLevel(),fs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Ct,minFilter:Ct,generateMipmaps:!1,type:Cn,format:on,colorSpace:Tr,depthBuffer:!1},r=Ml(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ml(e,t,i);const{_lodMax:a}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=P0(a)),this._blurMaterial=D0(a,e,t),this._ggxMaterial=L0(a,e,t)}return r}_compileMaterial(e){const t=new qt(new Pn,e);this._renderer.compile(t,pr)}_sceneToCubeUV(e,t,i,r,a){const c=new sn(90,1,t,i),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],f=this._renderer,u=f.autoClear,d=f.toneMapping;f.getClearColor(xl),f.toneMapping=yn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new qt(new Lr,new Ac({name:"PMREM.Background",side:$t,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,m=_.material;let p=!1;const M=e.background;M?M.isColor&&(m.color.copy(M),e.background=null,p=!0):(m.color.copy(xl),p=!0);for(let y=0;y<6;y++){const b=y%3;b===0?(c.up.set(0,l[y],0),c.position.set(a.x,a.y,a.z),c.lookAt(a.x+h[y],a.y,a.z)):b===1?(c.up.set(0,0,l[y]),c.position.set(a.x,a.y,a.z),c.lookAt(a.x,a.y+h[y],a.z)):(c.up.set(0,l[y],0),c.position.set(a.x,a.y,a.z),c.lookAt(a.x,a.y,a.z+h[y]));const A=this._cubeSize;Hi(r,b*A,y>2?A:0,A,A),f.setRenderTarget(r),p&&f.render(_,c),f.render(e,c)}f.toneMapping=d,f.autoClear=u,e.background=M}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===Ei||e.mapping===er;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=bl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Sl());const a=r?this._cubemapMaterial:this._equirectMaterial,s=this._lodMeshes[0];s.material=a;const o=a.uniforms;o.envMap.value=e;const c=this._cubeSize;Hi(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(s,pr)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let a=1;a<r;a++)this._applyGGXFilter(e,a-1,a);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,a=this._pingPongRenderTarget,s=this._ggxMaterial,o=this._lodMeshes[i];o.material=s;const c=s.uniforms,l=i/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),f=Math.sqrt(l*l-h*h),u=l*1.25,d=f*u,{_lodMax:g}=this,_=this._sizeLods[i],m=3*_*(i>g-qi?i-g+qi:0),p=4*(this._cubeSize-_);c.envMap.value=e.texture,c.roughness.value=d,c.mipInt.value=g-t,Hi(a,m,p,3*_,2*_),r.setRenderTarget(a),r.render(o,pr),c.envMap.value=a.texture,c.roughness.value=0,c.mipInt.value=g-i,Hi(e,m,p,3*_,2*_),r.setRenderTarget(e),r.render(o,pr)}_blur(e,t,i,r){const a=this._pingPongRenderTarget,s=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,a,t,i,s),this._blurPass(a,e,i,i,s)}_blurPass(e,t,i,r,a){const s=this._renderer,o=this._blurMaterial,c=this._lodMeshes[r];c.material=o;const l=o.uniforms;l.envMap.value=e.texture,l.sigma.value=a,l.mipInt.value=this._lodMax-i;const h=this._sizeLods[r],f=3*h*(r>this._lodMax-qi?r-this._lodMax+qi:0),u=4*(this._cubeSize-h);Hi(t,f,u,3*h,2*h),s.setRenderTarget(t),s.render(c,pr)}}function P0(n){const e=[],t=[];let i=n;const r=n-qi+1+T0;for(let a=0;a<r;a++){const s=Math.pow(2,i);e.push(s);const o=1/(s-2),c=-o,l=1+o,h=[c,c,l,c,l,l,c,c,l,l,c,l],f=6,u=6,d=3,g=new Float32Array(d*u*f),_=new Float32Array(d*u*f);for(let p=0;p<f;p++){const M=p%3*2/3-1,y=p>2?0:-1,b=[M,y,0,M+2/3,y,0,M+2/3,y+1,0,M,y,0,M+2/3,y+1,0,M,y+1,0];g.set(b,d*u*p);for(let A=0;A<u;A++){const w=h[A*2]*2-1,C=h[A*2+1]*2-1;p===0?di.set(1,C,w):p===1?di.set(-w,1,-C):p===2?di.set(-w,C,1):p===3?di.set(-1,C,-w):p===4?di.set(-w,-1,C):di.set(w,C,-1),di.toArray(_,(p*u+A)*d)}}const m=new Pn;m.setAttribute("position",new wn(g,d)),m.setAttribute("outputDirection",new wn(_,d)),t.push(new qt(m,null)),i>qi&&i--}return{lodMeshes:t,sizeLods:e}}function Ml(n,e,t){const i=new ln(n,e,t);return i.texture.mapping=Ta,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Hi(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function L0(n,e,t){return new Vt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:R0,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ra(),fragmentShader:`

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
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function D0(n,e,t){return new Vt({name:"SphericalGaussianBlur",defines:{SAMPLES:A0,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Ra(),fragmentShader:`

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
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function Sl(){return new Vt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ra(),fragmentShader:`

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
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function bl(){return new Vt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ra(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function Ra(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class Oc extends ln{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Cc(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Lr(5,5,5),a=new Vt({name:"CubemapFromEquirect",uniforms:tr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:$t,blending:Hn});a.uniforms.tEquirect.value=t;const s=new qt(r,a),o=t.minFilter;return t.minFilter===_i&&(t.minFilter=Ct),new Fd(1,10,this).update(e,s),t.minFilter=o,s.geometry.dispose(),s.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const a=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,i,r);e.setRenderTarget(a)}}function I0(n){let e=new WeakMap,t=new WeakMap,i=null;function r(u,d=!1){return u==null?null:d?s(u):a(u)}function a(u){if(u&&u.isTexture){const d=u.mapping;if(d===Oa||d===Ba)if(e.has(u)){const g=e.get(u).texture;return o(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const _=new Oc(g.height);return _.fromEquirectangularTexture(n,u),e.set(u,_),u.addEventListener("dispose",l),o(_.texture,u.mapping)}else return null}}return u}function s(u){if(u&&u.isTexture){const d=u.mapping,g=d===Oa||d===Ba,_=d===Ei||d===er;if(g||_){let m=t.get(u);const p=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return i===null&&(i=new vl(n)),m=g?i.fromEquirectangular(u,m):i.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),m.texture;if(m!==void 0)return m.texture;{const M=u.image;return g&&M&&M.height>0||_&&M&&c(M)?(i===null&&(i=new vl(n)),m=g?i.fromEquirectangular(u):i.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function o(u,d){return d===Oa?u.mapping=Ei:d===Ba&&(u.mapping=er),u}function c(u){let d=0;const g=6;for(let _=0;_<g;_++)u[_]!==void 0&&d++;return d===g}function l(u){const d=u.target;d.removeEventListener("dispose",l);const g=e.get(d);g!==void 0&&(e.delete(d),g.dispose())}function h(u){const d=u.target;d.removeEventListener("dispose",h);const g=t.get(d);g!==void 0&&(t.delete(d),g.dispose())}function f(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:f}}function U0(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&Zi("WebGLRenderer: "+i+" extension not supported."),r}}}function N0(n,e,t,i){const r={},a=new WeakMap;function s(f){const u=f.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",s),delete r[u.id];const d=a.get(u);d&&(e.remove(d),a.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(f,u){return r[u.id]===!0||(u.addEventListener("dispose",s),r[u.id]=!0,t.memory.geometries++),u}function c(f){const u=f.attributes;for(const d in u)e.update(u[d],n.ARRAY_BUFFER)}function l(f){const u=[],d=f.index,g=f.attributes.position;let _=0;if(g===void 0)return;if(d!==null){const M=d.array;_=d.version;for(let y=0,b=M.length;y<b;y+=3){const A=M[y+0],w=M[y+1],C=M[y+2];u.push(A,w,w,C,C,A)}}else{const M=g.array;_=g.version;for(let y=0,b=M.length/3-1;y<b;y+=3){const A=y+0,w=y+1,C=y+2;u.push(A,w,w,C,C,A)}}const m=new(g.count>=65535?Tc:wc)(u,1);m.version=_;const p=a.get(f);p&&e.remove(p),a.set(f,m)}function h(f){const u=a.get(f);if(u){const d=f.index;d!==null&&u.version<d.version&&l(f)}else l(f);return a.get(f)}return{get:o,update:c,getWireframeAttribute:h}}function F0(n,e,t){let i;function r(f){i=f}let a,s;function o(f){a=f.type,s=f.bytesPerElement}function c(f,u){n.drawElements(i,u,a,f*s),t.update(u,i,1)}function l(f,u,d){d!==0&&(n.drawElementsInstanced(i,u,a,f*s,d),t.update(u,i,d))}function h(f,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,a,f,0,d);let _=0;for(let m=0;m<d;m++)_+=u[m];t.update(_,i,1)}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function O0(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,s,o){switch(t.calls++,s){case n.TRIANGLES:t.triangles+=o*(a/3);break;case n.LINES:t.lines+=o*(a/2);break;case n.LINE_STRIP:t.lines+=o*(a-1);break;case n.LINE_LOOP:t.lines+=o*a;break;case n.POINTS:t.points+=o*a;break;default:tt("WebGLInfo: Unknown draw mode:",s);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function B0(n,e,t){const i=new WeakMap,r=new Et;function a(s,o,c){const l=s.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=h!==void 0?h.length:0;let u=i.get(o);if(u===void 0||u.count!==f){let R=function(){C.dispose(),i.delete(o),o.removeEventListener("dispose",R)};u!==void 0&&u.texture.dispose();const d=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let y=0;d===!0&&(y=1),g===!0&&(y=2),_===!0&&(y=3);let b=o.attributes.position.count*y,A=1;b>e.maxTextureSize&&(A=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const w=new Float32Array(b*A*4*f),C=new bc(w,b,A,f);C.type=bn,C.needsUpdate=!0;const S=y*4;for(let D=0;D<f;D++){const N=m[D],H=p[D],k=M[D],P=b*A*4*D;for(let B=0;B<N.count;B++){const V=B*S;d===!0&&(r.fromBufferAttribute(N,B),w[P+V+0]=r.x,w[P+V+1]=r.y,w[P+V+2]=r.z,w[P+V+3]=0),g===!0&&(r.fromBufferAttribute(H,B),w[P+V+4]=r.x,w[P+V+5]=r.y,w[P+V+6]=r.z,w[P+V+7]=0),_===!0&&(r.fromBufferAttribute(k,B),w[P+V+8]=r.x,w[P+V+9]=r.y,w[P+V+10]=r.z,w[P+V+11]=k.itemSize===4?r.w:1)}}u={count:f,texture:C,size:new We(b,A)},i.set(o,u),o.addEventListener("dispose",R)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",s.morphTexture,t);else{let d=0;for(let _=0;_<l.length;_++)d+=l[_];const g=o.morphTargetsRelative?1:1-d;c.getUniforms().setValue(n,"morphTargetBaseInfluence",g),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",u.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:a}}function z0(n,e,t,i,r){let a=new WeakMap;function s(l){const h=r.render.frame,f=l.geometry,u=e.get(l,f);if(a.get(u)!==h&&(e.update(u),a.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),a.get(l)!==h&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),a.set(l,h))),l.isSkinnedMesh){const d=l.skeleton;a.get(d)!==h&&(d.update(),a.set(d,h))}return u}function o(){a=new WeakMap}function c(l){const h=l.target;h.removeEventListener("dispose",c),i.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:s,dispose:o}}const k0={[ac]:"LINEAR_TONE_MAPPING",[sc]:"REINHARD_TONE_MAPPING",[oc]:"CINEON_TONE_MAPPING",[lc]:"ACES_FILMIC_TONE_MAPPING",[uc]:"AGX_TONE_MAPPING",[hc]:"NEUTRAL_TONE_MAPPING",[cc]:"CUSTOM_TONE_MAPPING"};function G0(n,e,t,i,r,a){const s=new ln(e,t,{type:n,depthBuffer:r,stencilBuffer:a,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,c=null;const l=new Pn;l.setAttribute("position",new Wn([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Wn([0,2,0,0,2,0],2));const h=new Id({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new qt(l,h),u=new Ro(-1,1,1,-1,0,1);let d=null,g=null,_=!1,m,p=null,M=[],y=!1;this.setSize=function(b,A){s.setSize(b,A),o!==null&&o.setSize(b,A),c!==null&&c.setSize(b,A);for(let w=0;w<M.length;w++){const C=M[w];C.setSize&&C.setSize(b,A)}},this.setEffects=function(b){M=b,y=M.length>0&&M[0].isRenderPass===!0;const A=s.width,w=s.height;M.length>0&&o===null&&(o=new ln(A,w,{type:Cn,depthBuffer:!1,stencilBuffer:!1}),c=new ln(A,w,{type:Cn,depthBuffer:!1,stencilBuffer:!1}));for(let C=0;C<M.length;C++){const S=M[C];S.setSize&&S.setSize(A,w)}},this.begin=function(b,A){if(_||b.toneMapping===yn&&M.length===0)return!1;if(p=A,A!==null){const w=A.width,C=A.height;(s.width!==w||s.height!==C)&&this.setSize(w,C)}return y===!1&&b.setRenderTarget(s),m=b.toneMapping,b.toneMapping=yn,!0},this.hasRenderPass=function(){return y},this.end=function(b,A){b.toneMapping=m,_=!0;let w=s,C=o;for(let S=0;S<M.length;S++){const R=M[S];R.enabled!==!1&&(R.render(b,C,w,A),R.needsSwap!==!1&&(w=C,C=C===o?c:o))}if(d!==b.outputColorSpace||g!==b.toneMapping){d=b.outputColorSpace,g=b.toneMapping,h.defines={},Qe.getTransfer(d)===ht&&(h.defines.SRGB_TRANSFER="");const S=k0[g];S&&(h.defines[S]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=w.texture,b.setRenderTarget(p),b.render(f,u),p=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){s.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),h.dispose()}}const Bc=new Yt,no=new Ar(1,1),zc=new bc,kc=new ud,Gc=new Cc,El=[],yl=[],wl=new Float32Array(16),Tl=new Float32Array(9),Al=new Float32Array(4);function ar(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let a=El[r];if(a===void 0&&(a=new Float32Array(r),El[r]=a),e!==0){i.toArray(a,0);for(let s=1,o=0;s!==e;++s)o+=t,n[s].toArray(a,o)}return a}function Ut(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Nt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Ca(n,e){let t=yl[e];t===void 0&&(t=new Int32Array(e),yl[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function H0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function V0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;n.uniform2fv(this.addr,e),Nt(t,e)}}function W0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ut(t,e))return;n.uniform3fv(this.addr,e),Nt(t,e)}}function X0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;n.uniform4fv(this.addr,e),Nt(t,e)}}function Y0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ut(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Nt(t,e)}else{if(Ut(t,i))return;Al.set(i),n.uniformMatrix2fv(this.addr,!1,Al),Nt(t,i)}}function q0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ut(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Nt(t,e)}else{if(Ut(t,i))return;Tl.set(i),n.uniformMatrix3fv(this.addr,!1,Tl),Nt(t,i)}}function K0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ut(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Nt(t,e)}else{if(Ut(t,i))return;wl.set(i),n.uniformMatrix4fv(this.addr,!1,wl),Nt(t,i)}}function Z0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function $0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;n.uniform2iv(this.addr,e),Nt(t,e)}}function J0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ut(t,e))return;n.uniform3iv(this.addr,e),Nt(t,e)}}function Q0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;n.uniform4iv(this.addr,e),Nt(t,e)}}function j0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function eg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;n.uniform2uiv(this.addr,e),Nt(t,e)}}function tg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ut(t,e))return;n.uniform3uiv(this.addr,e),Nt(t,e)}}function ng(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;n.uniform4uiv(this.addr,e),Nt(t,e)}}function ig(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let a;this.type===n.SAMPLER_2D_SHADOW?(no.compareFunction=t.isReversedDepthBuffer()?yo:Eo,a=no):a=Bc,t.setTexture2D(e||a,r)}function rg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||kc,r)}function ag(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Gc,r)}function sg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||zc,r)}function og(n){switch(n){case 5126:return H0;case 35664:return V0;case 35665:return W0;case 35666:return X0;case 35674:return Y0;case 35675:return q0;case 35676:return K0;case 5124:case 35670:return Z0;case 35667:case 35671:return $0;case 35668:case 35672:return J0;case 35669:case 35673:return Q0;case 5125:return j0;case 36294:return eg;case 36295:return tg;case 36296:return ng;case 35678:case 36198:case 36298:case 36306:case 35682:return ig;case 35679:case 36299:case 36307:return rg;case 35680:case 36300:case 36308:case 36293:return ag;case 36289:case 36303:case 36311:case 36292:return sg}}function lg(n,e){n.uniform1fv(this.addr,e)}function cg(n,e){const t=ar(e,this.size,2);n.uniform2fv(this.addr,t)}function ug(n,e){const t=ar(e,this.size,3);n.uniform3fv(this.addr,t)}function hg(n,e){const t=ar(e,this.size,4);n.uniform4fv(this.addr,t)}function fg(n,e){const t=ar(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function dg(n,e){const t=ar(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function pg(n,e){const t=ar(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function mg(n,e){n.uniform1iv(this.addr,e)}function gg(n,e){n.uniform2iv(this.addr,e)}function _g(n,e){n.uniform3iv(this.addr,e)}function xg(n,e){n.uniform4iv(this.addr,e)}function vg(n,e){n.uniform1uiv(this.addr,e)}function Mg(n,e){n.uniform2uiv(this.addr,e)}function Sg(n,e){n.uniform3uiv(this.addr,e)}function bg(n,e){n.uniform4uiv(this.addr,e)}function Eg(n,e,t){const i=this.cache,r=e.length,a=Ca(t,r);Ut(i,a)||(n.uniform1iv(this.addr,a),Nt(i,a));let s;this.type===n.SAMPLER_2D_SHADOW?s=no:s=Bc;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||s,a[o])}function yg(n,e,t){const i=this.cache,r=e.length,a=Ca(t,r);Ut(i,a)||(n.uniform1iv(this.addr,a),Nt(i,a));for(let s=0;s!==r;++s)t.setTexture3D(e[s]||kc,a[s])}function wg(n,e,t){const i=this.cache,r=e.length,a=Ca(t,r);Ut(i,a)||(n.uniform1iv(this.addr,a),Nt(i,a));for(let s=0;s!==r;++s)t.setTextureCube(e[s]||Gc,a[s])}function Tg(n,e,t){const i=this.cache,r=e.length,a=Ca(t,r);Ut(i,a)||(n.uniform1iv(this.addr,a),Nt(i,a));for(let s=0;s!==r;++s)t.setTexture2DArray(e[s]||zc,a[s])}function Ag(n){switch(n){case 5126:return lg;case 35664:return cg;case 35665:return ug;case 35666:return hg;case 35674:return fg;case 35675:return dg;case 35676:return pg;case 5124:case 35670:return mg;case 35667:case 35671:return gg;case 35668:case 35672:return _g;case 35669:case 35673:return xg;case 5125:return vg;case 36294:return Mg;case 36295:return Sg;case 36296:return bg;case 35678:case 36198:case 36298:case 36306:case 35682:return Eg;case 35679:case 36299:case 36307:return yg;case 35680:case 36300:case 36308:case 36293:return wg;case 36289:case 36303:case 36311:case 36292:return Tg}}class Rg{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=og(t.type)}}class Cg{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ag(t.type)}}class Pg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let a=0,s=r.length;a!==s;++a){const o=r[a];o.setValue(e,t[o.id],i)}}}const ds=/(\w+)(\])?(\[|\.)?/g;function Rl(n,e){n.seq.push(e),n.map[e.id]=e}function Lg(n,e,t){const i=n.name,r=i.length;for(ds.lastIndex=0;;){const a=ds.exec(i),s=ds.lastIndex;let o=a[1];const c=a[2]==="]",l=a[3];if(c&&(o=o|0),l===void 0||l==="["&&s+2===r){Rl(t,l===void 0?new Rg(o,n,e):new Cg(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new Pg(o),Rl(t,f)),t=f}}}class da{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const o=e.getActiveUniform(t,s),c=e.getUniformLocation(t,o.name);Lg(o,c,this)}const r=[],a=[];for(const s of this.seq)s.type===e.SAMPLER_2D_SHADOW||s.type===e.SAMPLER_CUBE_SHADOW||s.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(s):a.push(s);r.length>0&&(this.seq=r.concat(a))}setValue(e,t,i,r){const a=this.map[t];a!==void 0&&a.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let a=0,s=t.length;a!==s;++a){const o=t[a],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,a=e.length;r!==a;++r){const s=e[r];s.id in t&&i.push(s)}return i}}function Cl(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Dg=37297;let Ig=0;function Ug(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let s=r;s<a;s++){const o=s+1;i.push(`${o===e?">":" "} ${o}: ${t[s]}`)}return i.join(`
`)}const Pl=new Ve;function Ng(n){Qe._getMatrix(Pl,Qe.workingColorSpace,n);const e=`mat3( ${Pl.elements.map(t=>t.toFixed(4))} )`;switch(Qe.getTransfer(n)){case _a:return[e,"LinearTransferOETF"];case ht:return[e,"sRGBTransferOETF"];default:return ze("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Ll(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),a=(n.getShaderInfoLog(e)||"").trim();if(i&&a==="")return"";const s=/ERROR: 0:(\d+)/.exec(a);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+a+`

`+Ug(n.getShaderSource(e),o)}else return a}function Fg(n,e){const t=Ng(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Og={[ac]:"Linear",[sc]:"Reinhard",[oc]:"Cineon",[lc]:"ACESFilmic",[uc]:"AgX",[hc]:"Neutral",[cc]:"Custom"};function Bg(n,e){const t=Og[e];return t===void 0?(ze("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ia=new W;function zg(){Qe.getLuminanceCoefficients(ia);const n=ia.x.toFixed(4),e=ia.y.toFixed(4),t=ia.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function kg(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(xr).join(`
`)}function Gg(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Hg(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const a=n.getActiveAttrib(e,r),s=a.name;let o=1;a.type===n.FLOAT_MAT2&&(o=2),a.type===n.FLOAT_MAT3&&(o=3),a.type===n.FLOAT_MAT4&&(o=4),t[s]={type:a.type,location:n.getAttribLocation(e,s),locationSize:o}}return t}function xr(n){return n!==""}function Dl(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Il(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Vg=/^[ \t]*#include +<([\w\d./]+)>/gm;function io(n){return n.replace(Vg,Xg)}const Wg=new Map;function Xg(n,e){let t=Ze[e];if(t===void 0){const i=Wg.get(e);if(i!==void 0)t=Ze[i],ze('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return io(t)}const Yg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ul(n){return n.replace(Yg,qg)}function qg(n,e,t,i){let r="";for(let a=parseInt(e);a<parseInt(t);a++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return r}function Nl(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const Kg={[la]:"SHADOWMAP_TYPE_PCF",[_r]:"SHADOWMAP_TYPE_VSM"};function Zg(n){return Kg[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const $g={[Ei]:"ENVMAP_TYPE_CUBE",[er]:"ENVMAP_TYPE_CUBE",[Ta]:"ENVMAP_TYPE_CUBE_UV"};function Jg(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":$g[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const Qg={[er]:"ENVMAP_MODE_REFRACTION"};function jg(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":Qg[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const e_={[rc]:"ENVMAP_BLENDING_MULTIPLY",[Gf]:"ENVMAP_BLENDING_MIX",[Hf]:"ENVMAP_BLENDING_ADD"};function t_(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":e_[n.combine]||"ENVMAP_BLENDING_NONE"}function n_(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function i_(n,e,t,i){const r=n.getContext(),a=t.defines;let s=t.vertexShader,o=t.fragmentShader;const c=Zg(t),l=Jg(t),h=jg(t),f=t_(t),u=n_(t),d=kg(t),g=Gg(a),_=r.createProgram();let m,p,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(xr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(xr).join(`
`),p.length>0&&(p+=`
`)):(m=[Nl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(xr).join(`
`),p=[Nl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==yn?"#define TONE_MAPPING":"",t.toneMapping!==yn?Ze.tonemapping_pars_fragment:"",t.toneMapping!==yn?Bg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ze.colorspace_pars_fragment,Fg("linearToOutputTexel",t.outputColorSpace),zg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(xr).join(`
`)),s=io(s),s=Dl(s,t),s=Il(s,t),o=io(o),o=Dl(o,t),o=Il(o,t),s=Ul(s),o=Ul(o),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Jo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Jo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const y=M+m+s,b=M+p+o,A=Cl(r,r.VERTEX_SHADER,y),w=Cl(r,r.FRAGMENT_SHADER,b);r.attachShader(_,A),r.attachShader(_,w),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function C(N){if(n.debug.checkShaderErrors){const H=r.getProgramInfoLog(_)||"",k=r.getShaderInfoLog(A)||"",P=r.getShaderInfoLog(w)||"",B=H.trim(),V=k.trim(),Z=P.trim();let ie=!0,K=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(ie=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,_,A,w);else{const ee=Ll(r,A,"vertex"),U=Ll(r,w,"fragment");tt("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+B+`
`+ee+`
`+U)}else B!==""?ze("WebGLProgram: Program Info Log:",B):(V===""||Z==="")&&(K=!1);K&&(N.diagnostics={runnable:ie,programLog:B,vertexShader:{log:V,prefix:m},fragmentShader:{log:Z,prefix:p}})}r.deleteShader(A),r.deleteShader(w),S=new da(r,_),R=Hg(r,_)}let S;this.getUniforms=function(){return S===void 0&&C(this),S};let R;this.getAttributes=function(){return R===void 0&&C(this),R};let D=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=r.getProgramParameter(_,Dg)),D},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Ig++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=A,this.fragmentShader=w,this}let r_=0;class a_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new s_(e),t.set(e,i)),i}}class s_{constructor(e){this.id=r_++,this.code=e,this.usedTimes=0}}function o_(n){return n===yi||n===ma||n===ga}function l_(n,e,t,i,r,a){const s=new Ec,o=new a_,c=new Set,l=[],h=new Map,f=i.logarithmicDepthBuffer;let u=i.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(S){return c.add(S),S===0?"uv":`uv${S}`}function _(S,R,D,N,H,k){const P=N.fog,B=H.geometry,V=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?N.environment:null,Z=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap,ie=e.get(S.envMap||V,Z),K=ie&&ie.mapping===Ta?ie.image.height:null,ee=d[S.type];S.precision!==null&&(u=i.getMaxPrecision(S.precision),u!==S.precision&&ze("WebGLProgram.getParameters:",S.precision,"not supported, using",u,"instead."));const U=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,re=U!==void 0?U.length:0;let oe=0;B.morphAttributes.position!==void 0&&(oe=1),B.morphAttributes.normal!==void 0&&(oe=2),B.morphAttributes.color!==void 0&&(oe=3);let Re,Fe,ke,L;if(ee){const _t=Sn[ee];Re=_t.vertexShader,Fe=_t.fragmentShader}else{Re=S.vertexShader,Fe=S.fragmentShader;const _t=o.getVertexShaderStage(S),rt=o.getFragmentShaderStage(S);o.update(S,_t,rt),ke=_t.id,L=rt.id}const X=n.getRenderTarget(),ae=n.state.buffers.depth.getReversed(),xe=H.isInstancedMesh===!0,ce=H.isBatchedMesh===!0,we=!!S.map,Ge=!!S.matcap,Ue=!!ie,$e=!!S.aoMap,ct=!!S.lightMap,qe=!!S.bumpMap&&S.wireframe===!1,ft=!!S.normalMap,yt=!!S.displacementMap,Tt=!!S.emissiveMap,gt=!!S.metalnessMap,He=!!S.roughnessMap,I=S.anisotropy>0,ut=S.clearcoat>0,Be=S.dispersion>0,T=S.retroreflectivity>0,v=S.iridescence>0,z=S.sheen>0,G=S.transmission>0,J=I&&!!S.anisotropyMap,le=ut&&!!S.clearcoatMap,ue=ut&&!!S.clearcoatNormalMap,j=ut&&!!S.clearcoatRoughnessMap,te=v&&!!S.iridescenceMap,he=v&&!!S.iridescenceThicknessMap,Le=z&&!!S.sheenColorMap,me=z&&!!S.sheenRoughnessMap,fe=!!S.specularMap,De=!!S.specularColorMap,Oe=!!S.specularIntensityMap,Xe=G&&!!S.transmissionMap,O=G&&!!S.thicknessMap,de=!!S.gradientMap,ne=!!S.alphaMap,pe=S.alphaTest>0,Me=!!S.alphaHash,se=!!S.extensions;let Ie=yn;S.toneMapped&&(X===null||X.isXRRenderTarget===!0)&&(Ie=n.toneMapping);const Ce={shaderID:ee,shaderType:S.type,shaderName:S.name,vertexShader:Re,fragmentShader:Fe,defines:S.defines,customVertexShaderID:ke,customFragmentShaderID:L,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:u,batching:ce,batchingColor:ce&&H._colorsTexture!==null,instancing:xe,instancingColor:xe&&H.instanceColor!==null,instancingMorph:xe&&H.morphTexture!==null,outputColorSpace:X===null?n.outputColorSpace:X.isXRRenderTarget===!0?X.texture.colorSpace:Qe.workingColorSpace,alphaToCoverage:!!S.alphaToCoverage,map:we,matcap:Ge,envMap:Ue,envMapMode:Ue&&ie.mapping,envMapCubeUVHeight:K,aoMap:$e,lightMap:ct,bumpMap:qe,normalMap:ft,displacementMap:yt,emissiveMap:Tt,normalMapObjectSpace:ft&&S.normalMapType===Xf,normalMapTangentSpace:ft&&S.normalMapType===$o,packedNormalMap:ft&&S.normalMapType===$o&&o_(S.normalMap.format),metalnessMap:gt,roughnessMap:He,anisotropy:I,anisotropyMap:J,clearcoat:ut,clearcoatMap:le,clearcoatNormalMap:ue,clearcoatRoughnessMap:j,dispersion:Be,retroreflection:T,iridescence:v,iridescenceMap:te,iridescenceThicknessMap:he,sheen:z,sheenColorMap:Le,sheenRoughnessMap:me,specularMap:fe,specularColorMap:De,specularIntensityMap:Oe,transmission:G,transmissionMap:Xe,thicknessMap:O,gradientMap:de,opaque:S.transparent===!1&&S.blending===Sr&&S.alphaToCoverage===!1,alphaMap:ne,alphaTest:pe,alphaHash:Me,combine:S.combine,mapUv:we&&g(S.map.channel),aoMapUv:$e&&g(S.aoMap.channel),lightMapUv:ct&&g(S.lightMap.channel),bumpMapUv:qe&&g(S.bumpMap.channel),normalMapUv:ft&&g(S.normalMap.channel),displacementMapUv:yt&&g(S.displacementMap.channel),emissiveMapUv:Tt&&g(S.emissiveMap.channel),metalnessMapUv:gt&&g(S.metalnessMap.channel),roughnessMapUv:He&&g(S.roughnessMap.channel),anisotropyMapUv:J&&g(S.anisotropyMap.channel),clearcoatMapUv:le&&g(S.clearcoatMap.channel),clearcoatNormalMapUv:ue&&g(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:j&&g(S.clearcoatRoughnessMap.channel),iridescenceMapUv:te&&g(S.iridescenceMap.channel),iridescenceThicknessMapUv:he&&g(S.iridescenceThicknessMap.channel),sheenColorMapUv:Le&&g(S.sheenColorMap.channel),sheenRoughnessMapUv:me&&g(S.sheenRoughnessMap.channel),specularMapUv:fe&&g(S.specularMap.channel),specularColorMapUv:De&&g(S.specularColorMap.channel),specularIntensityMapUv:Oe&&g(S.specularIntensityMap.channel),transmissionMapUv:Xe&&g(S.transmissionMap.channel),thicknessMapUv:O&&g(S.thicknessMap.channel),alphaMapUv:ne&&g(S.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(ft||I),vertexNormals:!!B.attributes.normal,vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!B.attributes.uv&&(we||ne),fog:!!P,useFog:S.fog===!0,fogExp2:!!P&&P.isFogExp2,flatShading:S.wireframe===!1&&(S.flatShading===!0||B.attributes.normal===void 0&&ft===!1&&(S.isMeshLambertMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isMeshPhysicalMaterial)),sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:ae,skinning:H.isSkinnedMesh===!0,hasPositionAttribute:B.attributes.position!==void 0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:re,morphTextureStride:oe,numSunLights:R.sun.length,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numSunLightShadows:R.sunShadowMap.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numLightProbeGrids:k.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:n.shadowMap.enabled&&D.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ie,decodeVideoTexture:we&&S.map.isVideoTexture===!0&&Qe.getTransfer(S.map.colorSpace)===ht,decodeVideoTextureEmissive:Tt&&S.emissiveMap.isVideoTexture===!0&&Qe.getTransfer(S.emissiveMap.colorSpace)===ht,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Bn,flipSided:S.side===$t,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:se&&S.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(se&&S.extensions.multiDraw===!0||ce)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Ce.vertexUv1s=c.has(1),Ce.vertexUv2s=c.has(2),Ce.vertexUv3s=c.has(3),c.clear(),Ce}function m(S){const R=[];if(S.shaderID?R.push(S.shaderID):(R.push(S.customVertexShaderID),R.push(S.customFragmentShaderID)),S.defines!==void 0)for(const D in S.defines)R.push(D),R.push(S.defines[D]);return S.isRawShaderMaterial===!1&&(p(R,S),M(R,S),R.push(n.outputColorSpace)),R.push(S.customProgramCacheKey),R.join()}function p(S,R){S.push(R.precision),S.push(R.outputColorSpace),S.push(R.envMapMode),S.push(R.envMapCubeUVHeight),S.push(R.mapUv),S.push(R.alphaMapUv),S.push(R.lightMapUv),S.push(R.aoMapUv),S.push(R.bumpMapUv),S.push(R.normalMapUv),S.push(R.displacementMapUv),S.push(R.emissiveMapUv),S.push(R.metalnessMapUv),S.push(R.roughnessMapUv),S.push(R.anisotropyMapUv),S.push(R.clearcoatMapUv),S.push(R.clearcoatNormalMapUv),S.push(R.clearcoatRoughnessMapUv),S.push(R.iridescenceMapUv),S.push(R.iridescenceThicknessMapUv),S.push(R.sheenColorMapUv),S.push(R.sheenRoughnessMapUv),S.push(R.specularMapUv),S.push(R.specularColorMapUv),S.push(R.specularIntensityMapUv),S.push(R.transmissionMapUv),S.push(R.thicknessMapUv),S.push(R.combine),S.push(R.fogExp2),S.push(R.sizeAttenuation),S.push(R.morphTargetsCount),S.push(R.morphAttributeCount),S.push(R.numSunLights),S.push(R.numDirLights),S.push(R.numPointLights),S.push(R.numSpotLights),S.push(R.numSpotLightMaps),S.push(R.numHemiLights),S.push(R.numRectAreaLights),S.push(R.numSunLightShadows),S.push(R.numDirLightShadows),S.push(R.numPointLightShadows),S.push(R.numSpotLightShadows),S.push(R.numSpotLightShadowsWithMaps),S.push(R.numLightProbes),S.push(R.shadowMapType),S.push(R.toneMapping),S.push(R.numClippingPlanes),S.push(R.numClipIntersection),S.push(R.depthPacking)}function M(S,R){s.disableAll(),R.instancing&&s.enable(0),R.instancingColor&&s.enable(1),R.instancingMorph&&s.enable(2),R.matcap&&s.enable(3),R.envMap&&s.enable(4),R.normalMapObjectSpace&&s.enable(5),R.normalMapTangentSpace&&s.enable(6),R.clearcoat&&s.enable(7),R.iridescence&&s.enable(8),R.alphaTest&&s.enable(9),R.vertexColors&&s.enable(10),R.vertexAlphas&&s.enable(11),R.vertexUv1s&&s.enable(12),R.vertexUv2s&&s.enable(13),R.vertexUv3s&&s.enable(14),R.vertexTangents&&s.enable(15),R.anisotropy&&s.enable(16),R.alphaHash&&s.enable(17),R.batching&&s.enable(18),R.dispersion&&s.enable(19),R.retroreflection&&s.enable(24),R.batchingColor&&s.enable(20),R.gradientMap&&s.enable(21),R.packedNormalMap&&s.enable(22),R.vertexNormals&&s.enable(23),S.push(s.mask),s.disableAll(),R.fog&&s.enable(0),R.useFog&&s.enable(1),R.flatShading&&s.enable(2),R.logarithmicDepthBuffer&&s.enable(3),R.reversedDepthBuffer&&s.enable(4),R.skinning&&s.enable(5),R.morphTargets&&s.enable(6),R.morphNormals&&s.enable(7),R.morphColors&&s.enable(8),R.premultipliedAlpha&&s.enable(9),R.shadowMapEnabled&&s.enable(10),R.doubleSided&&s.enable(11),R.flipSided&&s.enable(12),R.useDepthPacking&&s.enable(13),R.dithering&&s.enable(14),R.transmission&&s.enable(15),R.sheen&&s.enable(16),R.opaque&&s.enable(17),R.pointsUvs&&s.enable(18),R.decodeVideoTexture&&s.enable(19),R.decodeVideoTextureEmissive&&s.enable(20),R.alphaToCoverage&&s.enable(21),R.numLightProbeGrids>0&&s.enable(22),R.hasPositionAttribute&&s.enable(23),S.push(s.mask)}function y(S){const R=d[S.type];let D;if(R){const N=Sn[R];D=Pd.clone(N.uniforms)}else D=S.uniforms;return D}function b(S,R){let D=h.get(R);return D!==void 0?++D.usedTimes:(D=new i_(n,R,S,r),l.push(D),h.set(R,D)),D}function A(S){if(--S.usedTimes===0){const R=l.indexOf(S);l[R]=l[l.length-1],l.pop(),h.delete(S.cacheKey),S.destroy()}}function w(S){o.remove(S)}function C(){o.dispose()}return{getParameters:_,getProgramCacheKey:m,getUniforms:y,acquireProgram:b,releaseProgram:A,releaseShaderCache:w,programs:l,dispose:C}}function c_(){let n=new WeakMap;function e(s){return n.has(s)}function t(s){let o=n.get(s);return o===void 0&&(o={},n.set(s,o)),o}function i(s){n.delete(s)}function r(s,o,c){n.get(s)[o]=c}function a(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:a}}function u_(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Fl(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Ol(){const n=[];let e=0;const t=[],i=[],r=[];function a(){e=0,t.length=0,i.length=0,r.length=0}function s(u){let d=0;return u.isInstancedMesh&&(d+=2),u.isSkinnedMesh&&(d+=1),d}function o(u,d,g,_,m,p){let M=n[e];return M===void 0?(M={id:u.id,object:u,geometry:d,material:g,materialVariant:s(u),groupOrder:_,renderOrder:u.renderOrder,z:m,group:p},n[e]=M):(M.id=u.id,M.object=u,M.geometry=d,M.material=g,M.materialVariant=s(u),M.groupOrder=_,M.renderOrder=u.renderOrder,M.z=m,M.group=p),e++,M}function c(u,d,g,_,m,p,M){M.reversedDepth===!0&&(m=-m);const y=o(u,d,g,_,m,p);g.transmission>0?i.push(y):g.transparent===!0?r.push(y):t.push(y)}function l(u,d,g,_,m,p){const M=o(u,d,g,_,m,p);g.transmission>0?i.unshift(M):g.transparent===!0?r.unshift(M):t.unshift(M)}function h(u,d){t.length>1&&t.sort(u||u_),i.length>1&&i.sort(d||Fl),r.length>1&&r.sort(d||Fl)}function f(){for(let u=e,d=n.length;u<d;u++){const g=n[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:r,init:a,push:c,unshift:l,finish:f,sort:h}}function h_(){let n=new WeakMap;function e(i,r){const a=n.get(i);let s;return a===void 0?(s=new Ol,n.set(i,[s])):r>=a.length?(s=new Ol,a.push(s)):s=a[r],s}function t(){n=new WeakMap}return{get:e,dispose:t}}function f_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new W,color:new it};break;case"SpotLight":t={position:new W,direction:new W,color:new it,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new W,color:new it,distance:0,decay:0};break;case"HemisphereLight":t={direction:new W,skyColor:new it,groundColor:new it};break;case"RectAreaLight":t={color:new it,position:new W,halfWidth:new W,halfHeight:new W};break}return n[e.id]=t,t}}}function d_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let p_=0;function m_(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function g_(n){const e=new f_,t=d_(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new W);const r=new W,a=new wt,s=new wt;function o(l){let h=0,f=0,u=0;for(let H=0;H<9;H++)i.probe[H].set(0,0,0);let d=0,g=0,_=0,m=0,p=0,M=0,y=0,b=0,A=0,w=0,C=0,S=0,R=0,D=0;l.sort(m_);for(let H=0,k=l.length;H<k;H++){const P=l[H],B=P.color,V=P.intensity,Z=P.distance;let ie=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===yi?ie=P.shadow.map.texture:ie=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)h+=B.r*V,f+=B.g*V,u+=B.b*V;else if(P.isLightProbe){for(let K=0;K<9;K++)i.probe[K].addScaledVector(P.sh.coefficients[K],V);D++}else if(P.isSunLight){const K=e.get(P);if(K.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const ee=P.shadow,U=t.get(P);U.shadowIntensity=ee.intensity,U.shadowBias=ee.bias,U.shadowNormalBias=ee.normalBias,U.shadowRadius=ee.radius,U.shadowMapSize.copy(ee.mapSize).multiply(ee.getFrameExtents()),i.sunShadow[g]=U,i.sunShadowMap[g]=ie;const re=ee.getViewportCount();for(let oe=0;oe<re;oe++)i.sunShadowMatrix[_+oe]=ee.getMatrix(oe),i.sunShadowCascade[_+oe]=ee._cascadeData[oe];_+=re,g++}i.sun[d]=K,d++}else if(P.isDirectionalLight){const K=e.get(P);if(K.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const ee=P.shadow,U=t.get(P);U.shadowIntensity=ee.intensity,U.shadowBias=ee.bias,U.shadowNormalBias=ee.normalBias,U.shadowRadius=ee.radius,U.shadowMapSize=ee.mapSize,i.directionalShadow[m]=U,i.directionalShadowMap[m]=ie,i.directionalShadowMatrix[m]=P.shadow.matrix,A++}i.directional[m]=K,m++}else if(P.isSpotLight){const K=e.get(P);K.position.setFromMatrixPosition(P.matrixWorld),K.color.copy(B).multiplyScalar(V),K.distance=Z,K.coneCos=Math.cos(P.angle),K.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),K.decay=P.decay,i.spot[M]=K;const ee=P.shadow;if(P.map&&(i.spotLightMap[S]=P.map,S++,ee.updateMatrices(P),P.castShadow&&R++),i.spotLightMatrix[M]=ee.matrix,P.castShadow){const U=t.get(P);U.shadowIntensity=ee.intensity,U.shadowBias=ee.bias,U.shadowNormalBias=ee.normalBias,U.shadowRadius=ee.radius,U.shadowMapSize=ee.mapSize,i.spotShadow[M]=U,i.spotShadowMap[M]=ie,C++}M++}else if(P.isRectAreaLight){const K=e.get(P);K.color.copy(B).multiplyScalar(V),K.halfWidth.set(P.width*.5,0,0),K.halfHeight.set(0,P.height*.5,0),i.rectArea[y]=K,y++}else if(P.isPointLight){const K=e.get(P);if(K.color.copy(P.color).multiplyScalar(P.intensity),K.distance=P.distance,K.decay=P.decay,P.castShadow){const ee=P.shadow,U=t.get(P);U.shadowIntensity=ee.intensity,U.shadowBias=ee.bias,U.shadowNormalBias=ee.normalBias,U.shadowRadius=ee.radius,U.shadowMapSize=ee.mapSize,U.shadowCameraNear=ee.camera.near,U.shadowCameraFar=ee.camera.far,i.pointShadow[p]=U,i.pointShadowMap[p]=ie,i.pointShadowMatrix[p]=P.shadow.matrix,w++}i.point[p]=K,p++}else if(P.isHemisphereLight){const K=e.get(P);K.skyColor.copy(P.color).multiplyScalar(V),K.groundColor.copy(P.groundColor).multiplyScalar(V),i.hemi[b]=K,b++}}y>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ge.LTC_FLOAT_1,i.rectAreaLTC2=ge.LTC_FLOAT_2):(i.rectAreaLTC1=ge.LTC_HALF_1,i.rectAreaLTC2=ge.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=f,i.ambient[2]=u;const N=i.hash;(N.sunLength!==d||N.directionalLength!==m||N.pointLength!==p||N.spotLength!==M||N.rectAreaLength!==y||N.hemiLength!==b||N.numSunShadows!==g||N.numDirectionalShadows!==A||N.numPointShadows!==w||N.numSpotShadows!==C||N.numSpotMaps!==S||N.numLightProbes!==D)&&(i.sun.length=d,i.directional.length=m,i.spot.length=M,i.rectArea.length=y,i.point.length=p,i.hemi.length=b,i.sunShadow.length=g,i.sunShadowMap.length=g,i.sunShadowMatrix.length=_,i.sunShadowCascade.length=_,i.directionalShadow.length=A,i.directionalShadowMap.length=A,i.directionalShadowMatrix.length=A,i.pointShadow.length=w,i.pointShadowMap.length=w,i.pointShadowMatrix.length=w,i.spotShadow.length=C,i.spotShadowMap.length=C,i.spotLightMatrix.length=C+S-R,i.spotLightMap.length=S,i.numSpotLightShadowsWithMaps=R,i.numLightProbes=D,N.sunLength=d,N.directionalLength=m,N.pointLength=p,N.spotLength=M,N.rectAreaLength=y,N.hemiLength=b,N.numSunShadows=g,N.numDirectionalShadows=A,N.numPointShadows=w,N.numSpotShadows=C,N.numSpotMaps=S,N.numLightProbes=D,i.version=p_++)}function c(l,h){let f=0,u=0,d=0,g=0,_=0,m=0;const p=h.matrixWorldInverse;for(let M=0,y=l.length;M<y;M++){const b=l[M];if(b.isSunLight){const A=i.sun[f];A.direction.setFromMatrixPosition(b.matrixWorld),A.direction.transformDirection(p),f++}else if(b.isDirectionalLight){const A=i.directional[u];A.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),A.direction.sub(r),A.direction.transformDirection(p),u++}else if(b.isSpotLight){const A=i.spot[g];A.position.setFromMatrixPosition(b.matrixWorld),A.position.applyMatrix4(p),A.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),A.direction.sub(r),A.direction.transformDirection(p),g++}else if(b.isRectAreaLight){const A=i.rectArea[_];A.position.setFromMatrixPosition(b.matrixWorld),A.position.applyMatrix4(p),s.identity(),a.copy(b.matrixWorld),a.premultiply(p),s.extractRotation(a),A.halfWidth.set(b.width*.5,0,0),A.halfHeight.set(0,b.height*.5,0),A.halfWidth.applyMatrix4(s),A.halfHeight.applyMatrix4(s),_++}else if(b.isPointLight){const A=i.point[d];A.position.setFromMatrixPosition(b.matrixWorld),A.position.applyMatrix4(p),d++}else if(b.isHemisphereLight){const A=i.hemi[m];A.direction.setFromMatrixPosition(b.matrixWorld),A.direction.transformDirection(p),m++}}}return{setup:o,setupView:c,state:i}}function Bl(n){const e=new g_(n),t=[],i=[],r=[];function a(u){f.camera=u,t.length=0,i.length=0,r.length=0}function s(u){t.push(u)}function o(u){i.push(u)}function c(u){r.push(u)}function l(){e.setup(t)}function h(u){e.setupView(t,u)}const f={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:f,setupLights:l,setupLightsView:h,pushLight:s,pushShadow:o,pushLightProbeGrid:c}}function __(n){let e=new WeakMap;function t(r,a=0){const s=e.get(r);let o;return s===void 0?(o=new Bl(n),e.set(r,[o])):a>=s.length?(o=new Bl(n),s.push(o)):o=s[a],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const x_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,v_=`uniform sampler2D shadow_pass;
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
}`,M_=[new W(1,0,0),new W(-1,0,0),new W(0,1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1)],S_=[new W(0,-1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1),new W(0,-1,0),new W(0,-1,0)],zl=new wt,mr=new W,ps=new W;function b_(n,e,t){let i=new Ao;const r=new We,a=new We,s=new Et,o=new Ud,c=new Nd,l={},h=t.maxTextureSize,f={[bi]:$t,[$t]:bi,[Bn]:Bn},u=new Vt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new We},radius:{value:4}},vertexShader:x_,fragmentShader:v_}),d=u.clone();d.defines.HORIZONTAL_PASS=1;const g=new Pn;g.setAttribute("position",new wn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new qt(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=la;let p=this.type;this.render=function(w,C,S){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;this.type===bf&&(ze("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=la);const R=n.getRenderTarget(),D=n.getActiveCubeFace(),N=n.getActiveMipmapLevel(),H=n.state;H.setBlending(Hn),H.buffers.depth.getReversed()===!0?H.buffers.color.setClear(0,0,0,0):H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const k=p!==this.type;k&&C.traverse(function(P){P.material&&(Array.isArray(P.material)?P.material.forEach(B=>B.needsUpdate=!0):P.material.needsUpdate=!0)});for(let P=0,B=w.length;P<B;P++){const V=w[P],Z=V.shadow;if(Z===void 0){ze("WebGLShadowMap:",V,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;r.copy(Z.mapSize);const ie=Z.getFrameExtents();r.multiply(ie),a.copy(Z.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(a.x=Math.floor(h/ie.x),r.x=a.x*ie.x,Z.mapSize.x=a.x),r.y>h&&(a.y=Math.floor(h/ie.y),r.y=a.y*ie.y,Z.mapSize.y=a.y));const K=n.state.buffers.depth.getReversed();if(Z.camera._reversedDepth=K,Z.map===null||k===!0){if(Z.map!==null&&(Z.map.depthTexture!==null&&(Z.map.depthTexture.dispose(),Z.map.depthTexture=null),Z.map.dispose()),this.type===_r){if(V.isPointLight){ze("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Z.map=new ln(r.x,r.y,{format:yi,type:Cn,minFilter:Ct,magFilter:Ct,generateMipmaps:!1}),Z.map.texture.name=V.name+".shadowMap",Z.map.depthTexture=new Ar(r.x,r.y,bn),Z.map.depthTexture.name=V.name+".shadowMapDepth",Z.map.depthTexture.format=Yn,Z.map.depthTexture.compareFunction=null,Z.map.depthTexture.minFilter=It,Z.map.depthTexture.magFilter=It}else V.isPointLight?(Z.map=new Oc(r.x),Z.map.depthTexture=new Rd(r.x,Rn)):(Z.map=new ln(r.x,r.y),Z.map.depthTexture=new Ar(r.x,r.y,Rn)),Z.map.depthTexture.name=V.name+".shadowMap",Z.map.depthTexture.format=Yn,this.type===la?(Z.map.depthTexture.compareFunction=K?yo:Eo,Z.map.depthTexture.minFilter=Ct,Z.map.depthTexture.magFilter=Ct):(Z.map.depthTexture.compareFunction=null,Z.map.depthTexture.minFilter=It,Z.map.depthTexture.magFilter=It);Z.camera.updateProjectionMatrix()}Z.map.isWebGLCubeRenderTarget!==!0&&(Z.map.width!==r.x||Z.map.height!==r.y)&&Z.map.setSize(r.x,r.y);const ee=Z.map.isWebGLCubeRenderTarget?6:Z.getViewportCount();V.isPointLight!==!0&&Z.updateMatrices(V,S);for(let U=0;U<ee;U++){const re=Z.getCamera(U);if(V.isPointLight){const oe=Z.camera,Re=Z.matrix,Fe=V.distance||oe.far;Fe!==oe.far&&(oe.far=Fe,oe.updateProjectionMatrix()),mr.setFromMatrixPosition(V.matrixWorld),oe.position.copy(mr),ps.copy(oe.position),ps.add(M_[U]),oe.up.copy(S_[U]),oe.lookAt(ps),oe.updateMatrixWorld(),Re.makeTranslation(-mr.x,-mr.y,-mr.z),zl.multiplyMatrices(oe.projectionMatrix,oe.matrixWorldInverse),Z._frustum.setFromProjectionMatrix(zl,oe.coordinateSystem,oe.reversedDepth)}if(Z.map.isWebGLCubeRenderTarget)n.setRenderTarget(Z.map,U),n.clear();else{U===0&&(n.setRenderTarget(Z.map),n.clear());const oe=Z.getViewport(U);s.set(a.x*oe.x,a.y*oe.y,a.x*oe.z,a.y*oe.w),H.viewport(s)}i=Z.getFrustum(U),b(C,S,re,V,this.type)}Z.isPointLightShadow!==!0&&this.type===_r&&M(Z,S),Z.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(R,D,N)};function M(w,C){const S=e.update(_);u.defines.VSM_SAMPLES!==w.blurSamples&&(u.defines.VSM_SAMPLES=w.blurSamples,d.defines.VSM_SAMPLES=w.blurSamples,u.needsUpdate=!0,d.needsUpdate=!0),w.mapPass===null?w.mapPass=new ln(r.x,r.y,{format:yi,type:Cn}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),u.uniforms.shadow_pass.value=w.map.depthTexture,u.uniforms.resolution.value.set(w.map.width,w.map.height),u.uniforms.radius.value=w.radius,n.setRenderTarget(w.mapPass),n.clear(),n.renderBufferDirect(C,null,S,u,_,null),d.uniforms.shadow_pass.value=w.mapPass.texture,d.uniforms.resolution.value.set(w.map.width,w.map.height),d.uniforms.radius.value=w.radius,n.setRenderTarget(w.map),n.clear(),n.renderBufferDirect(C,null,S,d,_,null)}function y(w,C,S,R){let D=null;const N=S.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(N!==void 0)D=N;else if(D=S.isPointLight===!0?c:o,n.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const H=D.uuid,k=C.uuid;let P=l[H];P===void 0&&(P={},l[H]=P);let B=P[k];B===void 0&&(B=D.clone(),P[k]=B,C.addEventListener("dispose",A)),D=B}if(D.visible=C.visible,D.wireframe=C.wireframe,R===_r?D.side=C.shadowSide!==null?C.shadowSide:C.side:D.side=C.shadowSide!==null?C.shadowSide:f[C.side],D.alphaMap=C.alphaMap,D.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,D.map=C.map,D.clipShadows=C.clipShadows,D.clippingPlanes=C.clippingPlanes,D.clipIntersection=C.clipIntersection,D.displacementMap=C.displacementMap,D.displacementScale=C.displacementScale,D.displacementBias=C.displacementBias,D.wireframeLinewidth=C.wireframeLinewidth,D.linewidth=C.linewidth,S.isPointLight===!0&&D.isMeshDistanceMaterial===!0){const H=n.properties.get(D);H.light=S}return D}function b(w,C,S,R,D){if(w.visible===!1)return;if(w.layers.test(C.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&D===_r)&&(!w.frustumCulled||w.intersectsFrustum(i))){w.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,w.matrixWorld);const k=e.update(w),P=w.material;if(Array.isArray(P)){const B=k.groups;for(let V=0,Z=B.length;V<Z;V++){const ie=B[V],K=P[ie.materialIndex];if(K&&K.visible){const ee=y(w,K,R,D);w.onBeforeShadow(n,w,C,S,k,ee,ie),n.renderBufferDirect(S,null,k,ee,w,ie),w.onAfterShadow(n,w,C,S,k,ee,ie)}}}else if(P.visible){const B=y(w,P,R,D);w.onBeforeShadow(n,w,C,S,k,B,null),n.renderBufferDirect(S,null,k,B,w,null),w.onAfterShadow(n,w,C,S,k,B,null)}}const H=w.children;for(let k=0,P=H.length;k<P;k++)b(H[k],C,S,R,D)}function A(w){w.target.removeEventListener("dispose",A);for(const S in l){const R=l[S],D=w.target.uuid;D in R&&(R[D].dispose(),delete R[D])}}}function E_(n,e){function t(){let O=!1;const de=new Et;let ne=null;const pe=new Et(0,0,0,0);return{setMask:function(Me){ne!==Me&&!O&&(n.colorMask(Me,Me,Me,Me),ne=Me)},setLocked:function(Me){O=Me},setClear:function(Me,se,Ie,Ce,_t){_t===!0&&(Me*=Ce,se*=Ce,Ie*=Ce),de.set(Me,se,Ie,Ce),pe.equals(de)===!1&&(n.clearColor(Me,se,Ie,Ce),pe.copy(de))},reset:function(){O=!1,ne=null,pe.set(-1,0,0,0)}}}function i(){let O=!1,de=!1,ne=null,pe=null,Me=null;return{setReversed:function(se){if(de!==se){const Ie=e.get("EXT_clip_control");se?Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.ZERO_TO_ONE_EXT):Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.NEGATIVE_ONE_TO_ONE_EXT),de=se;const Ce=Me;Me=null,this.setClear(Ce)}},getReversed:function(){return de},setTest:function(se){se?X(n.DEPTH_TEST):ae(n.DEPTH_TEST)},setMask:function(se){ne!==se&&!O&&(n.depthMask(se),ne=se)},setFunc:function(se){if(de&&(se=id[se]),pe!==se){switch(se){case gs:n.depthFunc(n.NEVER);break;case _s:n.depthFunc(n.ALWAYS);break;case xs:n.depthFunc(n.LESS);break;case Er:n.depthFunc(n.LEQUAL);break;case vs:n.depthFunc(n.EQUAL);break;case Ms:n.depthFunc(n.GEQUAL);break;case Ss:n.depthFunc(n.GREATER);break;case bs:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}pe=se}},setLocked:function(se){O=se},setClear:function(se){Me!==se&&(Me=se,de&&(se=1-se),n.clearDepth(se))},reset:function(){O=!1,ne=null,pe=null,Me=null,de=!1}}}function r(){let O=!1,de=null,ne=null,pe=null,Me=null,se=null,Ie=null,Ce=null,_t=null;return{setTest:function(rt){O||(rt?X(n.STENCIL_TEST):ae(n.STENCIL_TEST))},setMask:function(rt){de!==rt&&!O&&(n.stencilMask(rt),de=rt)},setFunc:function(rt,un,gn){(ne!==rt||pe!==un||Me!==gn)&&(n.stencilFunc(rt,un,gn),ne=rt,pe=un,Me=gn)},setOp:function(rt,un,gn){(se!==rt||Ie!==un||Ce!==gn)&&(n.stencilOp(rt,un,gn),se=rt,Ie=un,Ce=gn)},setLocked:function(rt){O=rt},setClear:function(rt){_t!==rt&&(n.clearStencil(rt),_t=rt)},reset:function(){O=!1,de=null,ne=null,pe=null,Me=null,se=null,Ie=null,Ce=null,_t=null}}}const a=new t,s=new i,o=new r,c=new WeakMap,l=new WeakMap;let h={},f={},u={},d=new WeakMap,g=[],_=null,m=!1,p=null,M=null,y=null,b=null,A=null,w=null,C=null,S=new it(0,0,0),R=0,D=!1,N=null,H=null,k=null,P=null,B=null;const V=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,ie=0;const K=n.getParameter(n.VERSION);K.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(K)[1]),Z=ie>=1):K.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),Z=ie>=2);let ee=null,U={};const re=n.getParameter(n.SCISSOR_BOX),oe=n.getParameter(n.VIEWPORT),Re=new Et().fromArray(re),Fe=new Et().fromArray(oe);function ke(O,de,ne,pe){const Me=new Uint8Array(4),se=n.createTexture();n.bindTexture(O,se),n.texParameteri(O,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(O,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ie=0;Ie<ne;Ie++)O===n.TEXTURE_3D||O===n.TEXTURE_2D_ARRAY?n.texImage3D(de,0,n.RGBA,1,1,pe,0,n.RGBA,n.UNSIGNED_BYTE,Me):n.texImage2D(de+Ie,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Me);return se}const L={};L[n.TEXTURE_2D]=ke(n.TEXTURE_2D,n.TEXTURE_2D,1),L[n.TEXTURE_CUBE_MAP]=ke(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),L[n.TEXTURE_2D_ARRAY]=ke(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),L[n.TEXTURE_3D]=ke(n.TEXTURE_3D,n.TEXTURE_3D,1,1),a.setClear(0,0,0,1),s.setClear(1),o.setClear(0),X(n.DEPTH_TEST),s.setFunc(Er),qe(!1),ft(Yo),X(n.CULL_FACE),$e(Hn);function X(O){h[O]!==!0&&(n.enable(O),h[O]=!0)}function ae(O){h[O]!==!1&&(n.disable(O),h[O]=!1)}function xe(O,de){return u[O]!==de?(n.bindFramebuffer(O,de),u[O]=de,O===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=de),O===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=de),!0):!1}function ce(O,de){let ne=g,pe=!1;if(O){ne=d.get(de),ne===void 0&&(ne=[],d.set(de,ne));const Me=O.textures;if(ne.length!==Me.length||ne[0]!==n.COLOR_ATTACHMENT0){for(let se=0,Ie=Me.length;se<Ie;se++)ne[se]=n.COLOR_ATTACHMENT0+se;ne.length=Me.length,pe=!0}}else ne[0]!==n.BACK&&(ne[0]=n.BACK,pe=!0);pe&&n.drawBuffers(ne)}function we(O){return _!==O?(n.useProgram(O),_=O,!0):!1}const Ge={[Vi]:n.FUNC_ADD,[yf]:n.FUNC_SUBTRACT,[wf]:n.FUNC_REVERSE_SUBTRACT};Ge[Tf]=n.MIN,Ge[Af]=n.MAX;const Ue={[Rf]:n.ZERO,[Cf]:n.ONE,[Pf]:n.SRC_COLOR,[nc]:n.SRC_ALPHA,[Ff]:n.SRC_ALPHA_SATURATE,[Uf]:n.DST_COLOR,[Df]:n.DST_ALPHA,[Lf]:n.ONE_MINUS_SRC_COLOR,[ic]:n.ONE_MINUS_SRC_ALPHA,[Nf]:n.ONE_MINUS_DST_COLOR,[If]:n.ONE_MINUS_DST_ALPHA,[Of]:n.CONSTANT_COLOR,[Bf]:n.ONE_MINUS_CONSTANT_COLOR,[zf]:n.CONSTANT_ALPHA,[kf]:n.ONE_MINUS_CONSTANT_ALPHA};function $e(O,de,ne,pe,Me,se,Ie,Ce,_t,rt){if(O===Hn){m===!0&&(ae(n.BLEND),m=!1);return}if(m===!1&&(X(n.BLEND),m=!0),O!==Ef){if(O!==p||rt!==D){if((M!==Vi||A!==Vi)&&(n.blendEquation(n.FUNC_ADD),M=Vi,A=Vi),rt)switch(O){case Sr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case qo:n.blendFunc(n.ONE,n.ONE);break;case Ko:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Zo:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:tt("WebGLState: Invalid blending: ",O);break}else switch(O){case Sr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case qo:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Ko:tt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Zo:tt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:tt("WebGLState: Invalid blending: ",O);break}y=null,b=null,w=null,C=null,S.set(0,0,0),R=0,p=O,D=rt}return}Me=Me||de,se=se||ne,Ie=Ie||pe,(de!==M||Me!==A)&&(n.blendEquationSeparate(Ge[de],Ge[Me]),M=de,A=Me),(ne!==y||pe!==b||se!==w||Ie!==C)&&(n.blendFuncSeparate(Ue[ne],Ue[pe],Ue[se],Ue[Ie]),y=ne,b=pe,w=se,C=Ie),(Ce.equals(S)===!1||_t!==R)&&(n.blendColor(Ce.r,Ce.g,Ce.b,_t),S.copy(Ce),R=_t),p=O,D=!1}function ct(O,de){O.side===Bn?ae(n.CULL_FACE):X(n.CULL_FACE);let ne=O.side===$t;de&&(ne=!ne),qe(ne),O.blending===Sr&&O.transparent===!1?$e(Hn):$e(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),s.setFunc(O.depthFunc),s.setTest(O.depthTest),s.setMask(O.depthWrite),a.setMask(O.colorWrite);const pe=O.stencilWrite;o.setTest(pe),pe&&(o.setMask(O.stencilWriteMask),o.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),o.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),Tt(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?X(n.SAMPLE_ALPHA_TO_COVERAGE):ae(n.SAMPLE_ALPHA_TO_COVERAGE)}function qe(O){N!==O&&(O?n.frontFace(n.CW):n.frontFace(n.CCW),N=O)}function ft(O){O!==Mf?(X(n.CULL_FACE),O!==H&&(O===Yo?n.cullFace(n.BACK):O===Sf?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ae(n.CULL_FACE),H=O}function yt(O){O!==k&&(Z&&n.lineWidth(O),k=O)}function Tt(O,de,ne){O?(X(n.POLYGON_OFFSET_FILL),(P!==de||B!==ne)&&(P=de,B=ne,s.getReversed()&&(de=-de),n.polygonOffset(de,ne))):ae(n.POLYGON_OFFSET_FILL)}function gt(O){O?X(n.SCISSOR_TEST):ae(n.SCISSOR_TEST)}function He(O){O===void 0&&(O=n.TEXTURE0+V-1),ee!==O&&(n.activeTexture(O),ee=O)}function I(O,de,ne){ne===void 0&&(ee===null?ne=n.TEXTURE0+V-1:ne=ee);let pe=U[ne];pe===void 0&&(pe={type:void 0,texture:void 0},U[ne]=pe),(pe.type!==O||pe.texture!==de)&&(ee!==ne&&(n.activeTexture(ne),ee=ne),n.bindTexture(O,de||L[O]),pe.type=O,pe.texture=de)}function ut(){const O=U[ee];O!==void 0&&O.type!==void 0&&(n.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function Be(){try{n.compressedTexImage2D(...arguments)}catch(O){tt("WebGLState:",O)}}function T(){try{n.compressedTexImage3D(...arguments)}catch(O){tt("WebGLState:",O)}}function v(){try{n.texSubImage2D(...arguments)}catch(O){tt("WebGLState:",O)}}function z(){try{n.texSubImage3D(...arguments)}catch(O){tt("WebGLState:",O)}}function G(){try{n.compressedTexSubImage2D(...arguments)}catch(O){tt("WebGLState:",O)}}function J(){try{n.compressedTexSubImage3D(...arguments)}catch(O){tt("WebGLState:",O)}}function le(){try{n.texStorage2D(...arguments)}catch(O){tt("WebGLState:",O)}}function ue(){try{n.texStorage3D(...arguments)}catch(O){tt("WebGLState:",O)}}function j(){try{n.texImage2D(...arguments)}catch(O){tt("WebGLState:",O)}}function te(){try{n.texImage3D(...arguments)}catch(O){tt("WebGLState:",O)}}function he(O){return f[O]!==void 0?f[O]:n.getParameter(O)}function Le(O,de){f[O]!==de&&(n.pixelStorei(O,de),f[O]=de)}function me(O){Re.equals(O)===!1&&(n.scissor(O.x,O.y,O.z,O.w),Re.copy(O))}function fe(O){Fe.equals(O)===!1&&(n.viewport(O.x,O.y,O.z,O.w),Fe.copy(O))}function De(O,de){let ne=l.get(de);ne===void 0&&(ne=new WeakMap,l.set(de,ne));let pe=ne.get(O);pe===void 0&&(pe=n.getUniformBlockIndex(de,O.name),ne.set(O,pe))}function Oe(O,de){const pe=l.get(de).get(O);c.get(de)!==pe&&(n.uniformBlockBinding(de,pe,O.__bindingPointIndex),c.set(de,pe))}function Xe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),s.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),h={},f={},ee=null,U={},u={},d=new WeakMap,g=[],_=null,m=!1,p=null,M=null,y=null,b=null,A=null,w=null,C=null,S=new it(0,0,0),R=0,D=!1,N=null,H=null,k=null,P=null,B=null,Re.set(0,0,n.canvas.width,n.canvas.height),Fe.set(0,0,n.canvas.width,n.canvas.height),a.reset(),s.reset(),o.reset()}return{buffers:{color:a,depth:s,stencil:o},enable:X,disable:ae,bindFramebuffer:xe,drawBuffers:ce,useProgram:we,setBlending:$e,setMaterial:ct,setFlipSided:qe,setCullFace:ft,setLineWidth:yt,setPolygonOffset:Tt,setScissorTest:gt,activeTexture:He,bindTexture:I,unbindTexture:ut,compressedTexImage2D:Be,compressedTexImage3D:T,texImage2D:j,texImage3D:te,pixelStorei:Le,getParameter:he,updateUBOMapping:De,uniformBlockBinding:Oe,texStorage2D:le,texStorage3D:ue,texSubImage2D:v,texSubImage3D:z,compressedTexSubImage2D:G,compressedTexSubImage3D:J,scissor:me,viewport:fe,reset:Xe}}function y_(n,e,t,i,r,a,s){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new We,h=new WeakMap,f=new Set;let u;const d=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(T,v){return g?new OffscreenCanvas(T,v):va("canvas")}function m(T,v,z){let G=1;const J=Be(T);if((J.width>z||J.height>z)&&(G=z/Math.max(J.width,J.height)),G<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const le=Math.floor(G*J.width),ue=Math.floor(G*J.height);u===void 0&&(u=_(le,ue));const j=v?_(le,ue):u;return j.width=le,j.height=ue,j.getContext("2d").drawImage(T,0,0,le,ue),ze("WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+le+"x"+ue+")."),j}else return"data"in T&&ze("WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),T;return T}function p(T){return T.generateMipmaps}function M(T){n.generateMipmap(T)}function y(T){return T.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?n.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function b(T,v,z,G,J,le=!1){if(T!==null){if(n[T]!==void 0)return n[T];ze("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let ue;G&&(ue=e.get("EXT_texture_norm16"),ue||ze("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let j=v;if(v===n.RED&&(z===n.FLOAT&&(j=n.R32F),z===n.HALF_FLOAT&&(j=n.R16F),z===n.UNSIGNED_BYTE&&(j=n.R8),z===n.UNSIGNED_SHORT&&ue&&(j=ue.R16_EXT),z===n.SHORT&&ue&&(j=ue.R16_SNORM_EXT)),v===n.RED_INTEGER&&(z===n.UNSIGNED_BYTE&&(j=n.R8UI),z===n.UNSIGNED_SHORT&&(j=n.R16UI),z===n.UNSIGNED_INT&&(j=n.R32UI),z===n.BYTE&&(j=n.R8I),z===n.SHORT&&(j=n.R16I),z===n.INT&&(j=n.R32I)),v===n.RG&&(z===n.FLOAT&&(j=n.RG32F),z===n.HALF_FLOAT&&(j=n.RG16F),z===n.UNSIGNED_BYTE&&(j=n.RG8),z===n.UNSIGNED_SHORT&&ue&&(j=ue.RG16_EXT),z===n.SHORT&&ue&&(j=ue.RG16_SNORM_EXT)),v===n.RG_INTEGER&&(z===n.UNSIGNED_BYTE&&(j=n.RG8UI),z===n.UNSIGNED_SHORT&&(j=n.RG16UI),z===n.UNSIGNED_INT&&(j=n.RG32UI),z===n.BYTE&&(j=n.RG8I),z===n.SHORT&&(j=n.RG16I),z===n.INT&&(j=n.RG32I)),v===n.RGB_INTEGER&&(z===n.UNSIGNED_BYTE&&(j=n.RGB8UI),z===n.UNSIGNED_SHORT&&(j=n.RGB16UI),z===n.UNSIGNED_INT&&(j=n.RGB32UI),z===n.BYTE&&(j=n.RGB8I),z===n.SHORT&&(j=n.RGB16I),z===n.INT&&(j=n.RGB32I)),v===n.RGBA_INTEGER&&(z===n.UNSIGNED_BYTE&&(j=n.RGBA8UI),z===n.UNSIGNED_SHORT&&(j=n.RGBA16UI),z===n.UNSIGNED_INT&&(j=n.RGBA32UI),z===n.BYTE&&(j=n.RGBA8I),z===n.SHORT&&(j=n.RGBA16I),z===n.INT&&(j=n.RGBA32I)),v===n.RGB&&(z===n.UNSIGNED_SHORT&&ue&&(j=ue.RGB16_EXT),z===n.SHORT&&ue&&(j=ue.RGB16_SNORM_EXT),z===n.UNSIGNED_INT_5_9_9_9_REV&&(j=n.RGB9_E5),z===n.UNSIGNED_INT_10F_11F_11F_REV&&(j=n.R11F_G11F_B10F)),v===n.RGBA){const te=le?_a:Qe.getTransfer(J);z===n.FLOAT&&(j=n.RGBA32F),z===n.HALF_FLOAT&&(j=n.RGBA16F),z===n.UNSIGNED_BYTE&&(j=te===ht?n.SRGB8_ALPHA8:n.RGBA8),z===n.UNSIGNED_SHORT&&ue&&(j=ue.RGBA16_EXT),z===n.SHORT&&ue&&(j=ue.RGBA16_SNORM_EXT),z===n.UNSIGNED_SHORT_4_4_4_4&&(j=n.RGBA4),z===n.UNSIGNED_SHORT_5_5_5_1&&(j=n.RGB5_A1)}return(j===n.R16F||j===n.R32F||j===n.RG16F||j===n.RG32F||j===n.RGBA16F||j===n.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function A(T,v){let z;return T?v===null||v===Rn||v===wr?z=n.DEPTH24_STENCIL8:v===bn?z=n.DEPTH32F_STENCIL8:v===yr&&(z=n.DEPTH24_STENCIL8,ze("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Rn||v===wr?z=n.DEPTH_COMPONENT24:v===bn?z=n.DEPTH_COMPONENT32F:v===yr&&(z=n.DEPTH_COMPONENT16),z}function w(T,v){return p(T)===!0||T.isFramebufferTexture&&T.minFilter!==It&&T.minFilter!==Ct?Math.log2(Math.max(v.width,v.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?v.mipmaps.length:1}function C(T){const v=T.target;v.removeEventListener("dispose",C),R(v),v.isVideoTexture&&h.delete(v),v.isHTMLTexture&&f.delete(v)}function S(T){const v=T.target;v.removeEventListener("dispose",S),N(v)}function R(T){const v=i.get(T);if(v.__webglInit===void 0)return;const z=T.source,G=d.get(z);if(G){const J=G[v.__cacheKey];J.usedTimes--,J.usedTimes===0&&D(T),Object.keys(G).length===0&&d.delete(z)}i.remove(T)}function D(T){const v=i.get(T);n.deleteTexture(v.__webglTexture);const z=T.source,G=d.get(z);delete G[v.__cacheKey],s.memory.textures--}function N(T){const v=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let G=0;G<6;G++){if(Array.isArray(v.__webglFramebuffer[G]))for(let J=0;J<v.__webglFramebuffer[G].length;J++)n.deleteFramebuffer(v.__webglFramebuffer[G][J]);else n.deleteFramebuffer(v.__webglFramebuffer[G]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[G])}else{if(Array.isArray(v.__webglFramebuffer))for(let G=0;G<v.__webglFramebuffer.length;G++)n.deleteFramebuffer(v.__webglFramebuffer[G]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let G=0;G<v.__webglColorRenderbuffer.length;G++)v.__webglColorRenderbuffer[G]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[G]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const z=T.textures;for(let G=0,J=z.length;G<J;G++){const le=i.get(z[G]);le.__webglTexture&&(n.deleteTexture(le.__webglTexture),s.memory.textures--),i.remove(z[G])}i.remove(T)}let H=0;function k(){H=0}function P(){return H}function B(T){H=T}function V(){const T=H;return T>=r.maxTextures&&ze("WebGLTextures: Trying to use "+(T+1)+" texture units while this GPU supports only "+r.maxTextures),H+=1,T}function Z(T){const v=[];return v.push(T.wrapS),v.push(T.wrapT),v.push(T.wrapR||0),v.push(T.magFilter),v.push(T.minFilter),v.push(T.anisotropy),v.push(T.internalFormat),v.push(T.format),v.push(T.type),v.push(T.generateMipmaps),v.push(T.premultiplyAlpha),v.push(T.flipY),v.push(T.unpackAlignment),v.push(T.colorSpace),v.join()}function ie(T,v){const z=i.get(T);if(T.isVideoTexture&&I(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&z.__version!==T.version){const G=T.image;if(G===null)ze("WebGLRenderer: Texture marked for update but no image data found.");else if(G.complete===!1)ze("WebGLRenderer: Texture marked for update but image is incomplete");else{ae(z,T,v);return}}else T.isExternalTexture&&(z.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,z.__webglTexture,n.TEXTURE0+v)}function K(T,v){const z=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&z.__version!==T.version){ae(z,T,v);return}else T.isExternalTexture&&(z.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,z.__webglTexture,n.TEXTURE0+v)}function ee(T,v){const z=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&z.__version!==T.version){ae(z,T,v);return}t.bindTexture(n.TEXTURE_3D,z.__webglTexture,n.TEXTURE0+v)}function U(T,v){const z=i.get(T);if(T.isCubeDepthTexture!==!0&&T.version>0&&z.__version!==T.version){xe(z,T,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,z.__webglTexture,n.TEXTURE0+v)}const re={[Es]:n.REPEAT,[zn]:n.CLAMP_TO_EDGE,[ys]:n.MIRRORED_REPEAT},oe={[It]:n.NEAREST,[Vf]:n.NEAREST_MIPMAP_NEAREST,[Nr]:n.NEAREST_MIPMAP_LINEAR,[Ct]:n.LINEAR,[za]:n.LINEAR_MIPMAP_NEAREST,[_i]:n.LINEAR_MIPMAP_LINEAR},Re={[qf]:n.NEVER,[Qf]:n.ALWAYS,[Kf]:n.LESS,[Eo]:n.LEQUAL,[Zf]:n.EQUAL,[yo]:n.GEQUAL,[$f]:n.GREATER,[Jf]:n.NOTEQUAL};function Fe(T,v){if(v.type===bn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Ct||v.magFilter===za||v.magFilter===Nr||v.magFilter===_i||v.minFilter===Ct||v.minFilter===za||v.minFilter===Nr||v.minFilter===_i)&&ze("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(T,n.TEXTURE_WRAP_S,re[v.wrapS]),n.texParameteri(T,n.TEXTURE_WRAP_T,re[v.wrapT]),(T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY)&&n.texParameteri(T,n.TEXTURE_WRAP_R,re[v.wrapR]),n.texParameteri(T,n.TEXTURE_MAG_FILTER,oe[v.magFilter]),n.texParameteri(T,n.TEXTURE_MIN_FILTER,oe[v.minFilter]),v.compareFunction&&(n.texParameteri(T,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(T,n.TEXTURE_COMPARE_FUNC,Re[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===It||v.minFilter!==Nr&&v.minFilter!==_i||v.type===bn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const z=e.get("EXT_texture_filter_anisotropic");n.texParameterf(T,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function ke(T,v){let z=!1;T.__webglInit===void 0&&(T.__webglInit=!0,v.addEventListener("dispose",C));const G=v.source;let J=d.get(G);J===void 0&&(J={},d.set(G,J));const le=Z(v);if(le!==T.__cacheKey){J[le]===void 0&&(J[le]={texture:n.createTexture(),usedTimes:0},s.memory.textures++,z=!0),J[le].usedTimes++;const ue=J[T.__cacheKey];ue!==void 0&&(J[T.__cacheKey].usedTimes--,ue.usedTimes===0&&D(v)),T.__cacheKey=le,T.__webglTexture=J[le].texture}return z}function L(T,v,z){return Math.floor(Math.floor(T/z)/v)}function X(T,v,z,G){const le=T.updateRanges;if(le.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,v.width,v.height,z,G,v.data);else{le.sort((Le,me)=>Le.start-me.start);let ue=0;for(let Le=1;Le<le.length;Le++){const me=le[ue],fe=le[Le],De=me.start+me.count,Oe=L(fe.start,v.width,4),Xe=L(me.start,v.width,4);fe.start<=De+1&&Oe===Xe&&L(fe.start+fe.count-1,v.width,4)===Oe?me.count=Math.max(me.count,fe.start+fe.count-me.start):(++ue,le[ue]=fe)}le.length=ue+1;const j=t.getParameter(n.UNPACK_ROW_LENGTH),te=t.getParameter(n.UNPACK_SKIP_PIXELS),he=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,v.width);for(let Le=0,me=le.length;Le<me;Le++){const fe=le[Le],De=Math.floor(fe.start/4),Oe=Math.ceil(fe.count/4),Xe=De%v.width,O=Math.floor(De/v.width),de=Oe,ne=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,Xe),t.pixelStorei(n.UNPACK_SKIP_ROWS,O),t.texSubImage2D(n.TEXTURE_2D,0,Xe,O,de,ne,z,G,v.data)}T.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,j),t.pixelStorei(n.UNPACK_SKIP_PIXELS,te),t.pixelStorei(n.UNPACK_SKIP_ROWS,he)}}function ae(T,v,z){let G=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(G=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(G=n.TEXTURE_3D);const J=ke(T,v),le=v.source;t.bindTexture(G,T.__webglTexture,n.TEXTURE0+z);const ue=i.get(le);if(le.version!==ue.__version||J===!0){if(t.activeTexture(n.TEXTURE0+z),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){const ne=Qe.getPrimaries(Qe.workingColorSpace),pe=v.colorSpace===pn?null:Qe.getPrimaries(v.colorSpace),Me=v.colorSpace===pn||ne===pe?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me)}t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment);let te=m(v.image,!1,r.maxTextureSize);te=ut(v,te);const he=a.convert(v.format,v.colorSpace),Le=a.convert(v.type);let me=b(v.internalFormat,he,Le,v.normalized,v.colorSpace,v.isVideoTexture);Fe(G,v);let fe;const De=v.mipmaps,Oe=v.isVideoTexture!==!0,Xe=ue.__version===void 0||J===!0,O=le.dataReady,de=w(v,te);if(v.isDepthTexture)me=A(v.format===xi,v.type),Xe&&(Oe?t.texStorage2D(n.TEXTURE_2D,1,me,te.width,te.height):t.texImage2D(n.TEXTURE_2D,0,me,te.width,te.height,0,he,Le,null));else if(v.isDataTexture)if(De.length>0){Oe&&Xe&&t.texStorage2D(n.TEXTURE_2D,de,me,De[0].width,De[0].height);for(let ne=0,pe=De.length;ne<pe;ne++)fe=De[ne],Oe?O&&t.texSubImage2D(n.TEXTURE_2D,ne,0,0,fe.width,fe.height,he,Le,fe.data):t.texImage2D(n.TEXTURE_2D,ne,me,fe.width,fe.height,0,he,Le,fe.data);v.generateMipmaps=!1}else Oe?(Xe&&t.texStorage2D(n.TEXTURE_2D,de,me,te.width,te.height),O&&X(v,te,he,Le)):t.texImage2D(n.TEXTURE_2D,0,me,te.width,te.height,0,he,Le,te.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Oe&&Xe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,de,me,De[0].width,De[0].height,te.depth);for(let ne=0,pe=De.length;ne<pe;ne++)if(fe=De[ne],v.format!==on)if(he!==null)if(Oe){if(O)if(v.layerUpdates.size>0){const Me=_l(fe.width,fe.height,v.format,v.type);for(const se of v.layerUpdates){const Ie=fe.data.subarray(se*Me/fe.data.BYTES_PER_ELEMENT,(se+1)*Me/fe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ne,0,0,se,fe.width,fe.height,1,he,Ie)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ne,0,0,0,fe.width,fe.height,te.depth,he,fe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ne,me,fe.width,fe.height,te.depth,0,fe.data,0,0);else ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Oe?O&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ne,0,0,0,fe.width,fe.height,te.depth,he,Le,fe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ne,me,fe.width,fe.height,te.depth,0,he,Le,fe.data);v.layerUpdates.size>0&&v.clearLayerUpdates()}else{Oe&&Xe&&t.texStorage2D(n.TEXTURE_2D,de,me,De[0].width,De[0].height);for(let ne=0,pe=De.length;ne<pe;ne++)fe=De[ne],v.format!==on?he!==null?Oe?O&&t.compressedTexSubImage2D(n.TEXTURE_2D,ne,0,0,fe.width,fe.height,he,fe.data):t.compressedTexImage2D(n.TEXTURE_2D,ne,me,fe.width,fe.height,0,fe.data):ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Oe?O&&t.texSubImage2D(n.TEXTURE_2D,ne,0,0,fe.width,fe.height,he,Le,fe.data):t.texImage2D(n.TEXTURE_2D,ne,me,fe.width,fe.height,0,he,Le,fe.data)}else if(v.isDataArrayTexture)if(Oe){if(Xe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,de,me,te.width,te.height,te.depth),O)if(v.layerUpdates.size>0){const ne=_l(te.width,te.height,v.format,v.type);for(const pe of v.layerUpdates){const Me=te.data.subarray(pe*ne/te.data.BYTES_PER_ELEMENT,(pe+1)*ne/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,pe,te.width,te.height,1,he,Le,Me)}v.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,he,Le,te.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,me,te.width,te.height,te.depth,0,he,Le,te.data);else if(v.isData3DTexture)Oe?(Xe&&t.texStorage3D(n.TEXTURE_3D,de,me,te.width,te.height,te.depth),O&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,he,Le,te.data)):t.texImage3D(n.TEXTURE_3D,0,me,te.width,te.height,te.depth,0,he,Le,te.data);else if(v.isFramebufferTexture){if(Xe)if(Oe)t.texStorage2D(n.TEXTURE_2D,de,me,te.width,te.height);else{let ne=te.width,pe=te.height;for(let Me=0;Me<de;Me++)t.texImage2D(n.TEXTURE_2D,Me,me,ne,pe,0,he,Le,null),ne>>=1,pe>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in n){const ne=n.canvas;if(ne.hasAttribute("layoutsubtree")||ne.setAttribute("layoutsubtree","true"),te.parentNode!==ne){ne.appendChild(te),f.add(v),ne.onpaint=pe=>{const Me=pe.changedElements;for(const se of f)Me.includes(se.image)&&(se.needsUpdate=!0)},ne.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,te);else{const Me=n.RGBA,se=n.RGBA,Ie=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Me,se,Ie,te)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(De.length>0){if(Oe&&Xe){const ne=Be(De[0]);t.texStorage2D(n.TEXTURE_2D,de,me,ne.width,ne.height)}for(let ne=0,pe=De.length;ne<pe;ne++)fe=De[ne],Oe?O&&t.texSubImage2D(n.TEXTURE_2D,ne,0,0,he,Le,fe):t.texImage2D(n.TEXTURE_2D,ne,me,he,Le,fe);v.generateMipmaps=!1}else if(Oe){if(Xe){const ne=Be(te);t.texStorage2D(n.TEXTURE_2D,de,me,ne.width,ne.height)}O&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,he,Le,te)}else t.texImage2D(n.TEXTURE_2D,0,me,he,Le,te);p(v)&&M(G),ue.__version=le.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function xe(T,v,z){if(v.image.length!==6)return;const G=ke(T,v),J=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,T.__webglTexture,n.TEXTURE0+z);const le=i.get(J);if(J.version!==le.__version||G===!0){t.activeTexture(n.TEXTURE0+z);const ue=Qe.getPrimaries(Qe.workingColorSpace),j=v.colorSpace===pn?null:Qe.getPrimaries(v.colorSpace),te=v.colorSpace===pn||ue===j?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,te);const he=v.isCompressedTexture||v.image[0].isCompressedTexture,Le=v.image[0]&&v.image[0].isDataTexture,me=[];for(let se=0;se<6;se++)!he&&!Le?me[se]=m(v.image[se],!0,r.maxCubemapSize):me[se]=Le?v.image[se].image:v.image[se],me[se]=ut(v,me[se]);const fe=me[0],De=a.convert(v.format,v.colorSpace),Oe=a.convert(v.type),Xe=b(v.internalFormat,De,Oe,v.normalized,v.colorSpace),O=v.isVideoTexture!==!0,de=le.__version===void 0||G===!0,ne=J.dataReady;let pe=w(v,fe);Fe(n.TEXTURE_CUBE_MAP,v);let Me;if(he){O&&de&&t.texStorage2D(n.TEXTURE_CUBE_MAP,pe,Xe,fe.width,fe.height);for(let se=0;se<6;se++){Me=me[se].mipmaps;for(let Ie=0;Ie<Me.length;Ie++){const Ce=Me[Ie];v.format!==on?De!==null?O?ne&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ie,0,0,Ce.width,Ce.height,De,Ce.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ie,Xe,Ce.width,Ce.height,0,Ce.data):ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ie,0,0,Ce.width,Ce.height,De,Oe,Ce.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ie,Xe,Ce.width,Ce.height,0,De,Oe,Ce.data)}}}else{if(Me=v.mipmaps,O&&de){Me.length>0&&pe++;const se=Be(me[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,pe,Xe,se.width,se.height)}for(let se=0;se<6;se++)if(Le){O?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,me[se].width,me[se].height,De,Oe,me[se].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,Xe,me[se].width,me[se].height,0,De,Oe,me[se].data);for(let Ie=0;Ie<Me.length;Ie++){const _t=Me[Ie].image[se].image;O?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ie+1,0,0,_t.width,_t.height,De,Oe,_t.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ie+1,Xe,_t.width,_t.height,0,De,Oe,_t.data)}}else{O?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,De,Oe,me[se]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,Xe,De,Oe,me[se]);for(let Ie=0;Ie<Me.length;Ie++){const Ce=Me[Ie];O?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ie+1,0,0,De,Oe,Ce.image[se]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ie+1,Xe,De,Oe,Ce.image[se])}}}p(v)&&M(n.TEXTURE_CUBE_MAP),le.__version=J.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function ce(T,v,z,G,J,le){const ue=a.convert(z.format,z.colorSpace),j=a.convert(z.type),te=b(z.internalFormat,ue,j,z.normalized,z.colorSpace),he=i.get(v),Le=i.get(z);if(Le.__renderTarget=v,!he.__hasExternalTextures){const me=Math.max(1,v.width>>le),fe=Math.max(1,v.height>>le);J===n.TEXTURE_3D||J===n.TEXTURE_2D_ARRAY?t.texImage3D(J,le,te,me,fe,v.depth,0,ue,j,null):t.texImage2D(J,le,te,me,fe,0,ue,j,null)}t.bindFramebuffer(n.FRAMEBUFFER,T),He(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,G,J,Le.__webglTexture,0,gt(v)):(J===n.TEXTURE_2D||J>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,G,J,Le.__webglTexture,le),t.bindFramebuffer(n.FRAMEBUFFER,null)}function we(T,v,z){if(n.bindRenderbuffer(n.RENDERBUFFER,T),v.depthBuffer){const G=v.depthTexture,J=G&&G.isDepthTexture?G.type:null,le=A(v.stencilBuffer,J),ue=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;He(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,gt(v),le,v.width,v.height):z?n.renderbufferStorageMultisample(n.RENDERBUFFER,gt(v),le,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,le,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ue,n.RENDERBUFFER,T)}else{const G=v.textures;for(let J=0;J<G.length;J++){const le=G[J],ue=a.convert(le.format,le.colorSpace),j=a.convert(le.type),te=b(le.internalFormat,ue,j,le.normalized,le.colorSpace);He(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,gt(v),te,v.width,v.height):z?n.renderbufferStorageMultisample(n.RENDERBUFFER,gt(v),te,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,te,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ge(T,v,z){const G=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,T),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const J=i.get(v.depthTexture);if(J.__renderTarget=v,(!J.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),G){if(J.__webglInit===void 0&&(J.__webglInit=!0,v.depthTexture.addEventListener("dispose",C)),J.__webglTexture===void 0){J.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,J.__webglTexture),Fe(n.TEXTURE_CUBE_MAP,v.depthTexture);const he=a.convert(v.depthTexture.format),Le=a.convert(v.depthTexture.type);let me;v.depthTexture.format===Yn?me=n.DEPTH_COMPONENT24:v.depthTexture.format===xi&&(me=n.DEPTH24_STENCIL8);for(let fe=0;fe<6;fe++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,me,v.width,v.height,0,he,Le,null)}}else ie(v.depthTexture,0);const le=J.__webglTexture,ue=gt(v),j=G?n.TEXTURE_CUBE_MAP_POSITIVE_X+z:n.TEXTURE_2D,te=v.depthTexture.format===xi?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(v.depthTexture.format===Yn)He(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,te,j,le,0,ue):n.framebufferTexture2D(n.FRAMEBUFFER,te,j,le,0);else if(v.depthTexture.format===xi)He(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,te,j,le,0,ue):n.framebufferTexture2D(n.FRAMEBUFFER,te,j,le,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ue(T){const v=i.get(T),z=T.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==T.depthTexture){const G=T.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),G){const J=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,G.removeEventListener("dispose",J)};G.addEventListener("dispose",J),v.__depthDisposeCallback=J}v.__boundDepthTexture=G}if(T.depthTexture&&!v.__autoAllocateDepthBuffer)if(z)for(let G=0;G<6;G++)Ge(v.__webglFramebuffer[G],T,G);else{const G=T.texture.mipmaps;G&&G.length>0?Ge(v.__webglFramebuffer[0],T,0):Ge(v.__webglFramebuffer,T,0)}else if(z){v.__webglDepthbuffer=[];for(let G=0;G<6;G++)if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[G]),v.__webglDepthbuffer[G]===void 0)v.__webglDepthbuffer[G]=n.createRenderbuffer(),we(v.__webglDepthbuffer[G],T,!1);else{const J=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,le=v.__webglDepthbuffer[G];n.bindRenderbuffer(n.RENDERBUFFER,le),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,le)}}else{const G=T.texture.mipmaps;if(G&&G.length>0?t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),we(v.__webglDepthbuffer,T,!1);else{const J=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,le=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,le),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,le)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function $e(T,v,z){const G=i.get(T);v!==void 0&&ce(G.__webglFramebuffer,T,T.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),z!==void 0&&Ue(T)}function ct(T){const v=T.texture,z=i.get(T),G=i.get(v);T.addEventListener("dispose",S);const J=T.textures,le=T.isWebGLCubeRenderTarget===!0,ue=J.length>1;if(ue||(G.__webglTexture===void 0&&(G.__webglTexture=n.createTexture()),G.__version=v.version,s.memory.textures++),le){z.__webglFramebuffer=[];for(let j=0;j<6;j++)if(v.mipmaps&&v.mipmaps.length>0){z.__webglFramebuffer[j]=[];for(let te=0;te<v.mipmaps.length;te++)z.__webglFramebuffer[j][te]=n.createFramebuffer()}else z.__webglFramebuffer[j]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){z.__webglFramebuffer=[];for(let j=0;j<v.mipmaps.length;j++)z.__webglFramebuffer[j]=n.createFramebuffer()}else z.__webglFramebuffer=n.createFramebuffer();if(ue)for(let j=0,te=J.length;j<te;j++){const he=i.get(J[j]);he.__webglTexture===void 0&&(he.__webglTexture=n.createTexture(),s.memory.textures++)}if(T.samples>0&&He(T)===!1){z.__webglMultisampledFramebuffer=n.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let j=0;j<J.length;j++){const te=J[j];z.__webglColorRenderbuffer[j]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,z.__webglColorRenderbuffer[j]);const he=a.convert(te.format,te.colorSpace),Le=a.convert(te.type),me=b(te.internalFormat,he,Le,te.normalized,te.colorSpace,T.isXRRenderTarget===!0),fe=gt(T);n.renderbufferStorageMultisample(n.RENDERBUFFER,fe,me,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+j,n.RENDERBUFFER,z.__webglColorRenderbuffer[j])}n.bindRenderbuffer(n.RENDERBUFFER,null),T.depthBuffer&&(z.__webglDepthRenderbuffer=n.createRenderbuffer(),we(z.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(le){t.bindTexture(n.TEXTURE_CUBE_MAP,G.__webglTexture),Fe(n.TEXTURE_CUBE_MAP,v);for(let j=0;j<6;j++)if(v.mipmaps&&v.mipmaps.length>0)for(let te=0;te<v.mipmaps.length;te++)ce(z.__webglFramebuffer[j][te],T,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+j,te);else ce(z.__webglFramebuffer[j],T,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0);p(v)&&M(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ue){for(let j=0,te=J.length;j<te;j++){const he=J[j],Le=i.get(he);let me=n.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(me=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(me,Le.__webglTexture),Fe(me,he),ce(z.__webglFramebuffer,T,he,n.COLOR_ATTACHMENT0+j,me,0),p(he)&&M(me)}t.unbindTexture()}else{let j=n.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(j=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(j,G.__webglTexture),Fe(j,v),v.mipmaps&&v.mipmaps.length>0)for(let te=0;te<v.mipmaps.length;te++)ce(z.__webglFramebuffer[te],T,v,n.COLOR_ATTACHMENT0,j,te);else ce(z.__webglFramebuffer,T,v,n.COLOR_ATTACHMENT0,j,0);p(v)&&M(j),t.unbindTexture()}T.depthBuffer&&Ue(T)}function qe(T){const v=T.textures;for(let z=0,G=v.length;z<G;z++){const J=v[z];if(p(J)){const le=y(T),ue=i.get(J).__webglTexture;t.bindTexture(le,ue),M(le),t.unbindTexture()}}}const ft=[],yt=[];function Tt(T){if(T.samples>0){if(He(T)===!1){const v=T.textures,z=T.width,G=T.height;let J=n.COLOR_BUFFER_BIT;const le=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ue=i.get(T),j=v.length>1;if(j)for(let he=0;he<v.length;he++)t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+he,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+he,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ue.__webglMultisampledFramebuffer);const te=T.texture.mipmaps;te&&te.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ue.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ue.__webglFramebuffer);for(let he=0;he<v.length;he++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(J|=n.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(J|=n.STENCIL_BUFFER_BIT)),j){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ue.__webglColorRenderbuffer[he]);const Le=i.get(v[he]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Le,0)}n.blitFramebuffer(0,0,z,G,0,0,z,G,J,n.NEAREST),c===!0&&(ft.length=0,yt.length=0,ft.push(n.COLOR_ATTACHMENT0+he),T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&(ft.push(le),yt.push(le),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,yt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ft))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),j)for(let he=0;he<v.length;he++){t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+he,n.RENDERBUFFER,ue.__webglColorRenderbuffer[he]);const Le=i.get(v[he]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+he,n.TEXTURE_2D,Le,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ue.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&c){const v=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function gt(T){return Math.min(r.maxSamples,T.samples)}function He(T){const v=i.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function I(T){const v=s.render.frame;h.get(T)!==v&&(h.set(T,v),T.update())}function ut(T,v){const z=T.colorSpace,G=T.format,J=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||z!==Tr&&z!==pn&&(Qe.getTransfer(z)===ht?(G!==on||J!==en)&&ze("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):tt("WebGLTextures: Unsupported texture color space:",z)),v}function Be(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=V,this.resetTextureUnits=k,this.getTextureUnits=P,this.setTextureUnits=B,this.setTexture2D=ie,this.setTexture2DArray=K,this.setTexture3D=ee,this.setTextureCube=U,this.rebindTextures=$e,this.setupRenderTarget=ct,this.updateRenderTargetMipmap=qe,this.updateMultisampleRenderTarget=Tt,this.setupDepthRenderbuffer=Ue,this.setupFrameBufferTexture=ce,this.useMultisampledRTT=He,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function w_(n,e){function t(i,r=pn){let a;const s=Qe.getTransfer(r);if(i===en)return n.UNSIGNED_BYTE;if(i===xo)return n.UNSIGNED_SHORT_4_4_4_4;if(i===vo)return n.UNSIGNED_SHORT_5_5_5_1;if(i===mc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===gc)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===dc)return n.BYTE;if(i===pc)return n.SHORT;if(i===yr)return n.UNSIGNED_SHORT;if(i===_o)return n.INT;if(i===Rn)return n.UNSIGNED_INT;if(i===bn)return n.FLOAT;if(i===Cn)return n.HALF_FLOAT;if(i===_c)return n.ALPHA;if(i===xc)return n.RGB;if(i===on)return n.RGBA;if(i===Yn)return n.DEPTH_COMPONENT;if(i===xi)return n.DEPTH_STENCIL;if(i===vc)return n.RED;if(i===Mo)return n.RED_INTEGER;if(i===yi)return n.RG;if(i===So)return n.RG_INTEGER;if(i===bo)return n.RGBA_INTEGER;if(i===ca||i===ua||i===ha||i===fa)if(s===ht)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===ca)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ua)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ha)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===fa)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===ca)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ua)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ha)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===fa)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ws||i===Ts||i===As||i===Rs)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===ws)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ts)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===As)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Rs)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Cs||i===Ps||i===Ls||i===Ds||i===Is||i===ma||i===Us)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(i===Cs||i===Ps)return s===ht?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===Ls)return s===ht?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC;if(i===Ds)return a.COMPRESSED_R11_EAC;if(i===Is)return a.COMPRESSED_SIGNED_R11_EAC;if(i===ma)return a.COMPRESSED_RG11_EAC;if(i===Us)return a.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Ns||i===Fs||i===Os||i===Bs||i===zs||i===ks||i===Gs||i===Hs||i===Vs||i===Ws||i===Xs||i===Ys||i===qs||i===Ks)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(i===Ns)return s===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Fs)return s===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Os)return s===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Bs)return s===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===zs)return s===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===ks)return s===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Gs)return s===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Hs)return s===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Vs)return s===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ws)return s===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Xs)return s===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Ys)return s===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===qs)return s===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ks)return s===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Zs||i===$s||i===Js)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(i===Zs)return s===ht?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===$s)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Js)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Qs||i===js||i===ga||i===eo)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(i===Qs)return a.COMPRESSED_RED_RGTC1_EXT;if(i===js)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ga)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===eo)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===wr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const T_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,A_=`
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

}`;class R_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Pc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Vt({vertexShader:T_,fragmentShader:A_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new qt(new Ln(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class C_ extends Ti{constructor(e,t){super();const i=this;let r=null,a=1,s=null,o="local-floor",c=1,l=null,h=null,f=null,u=null,d=null,g=null;const _=typeof XRWebGLBinding<"u",m=new R_,p={},M=t.getContextAttributes();let y=null,b=null;const A=[],w=[],C=new We;let S=null,R=null;const D=new sn;D.viewport=new Et;const N=new sn;N.viewport=new Et;const H=[D,N],k=new Od;let P=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(L){let X=A[L];return X===void 0&&(X=new Ka,A[L]=X),X.getTargetRaySpace()},this.getControllerGrip=function(L){let X=A[L];return X===void 0&&(X=new Ka,A[L]=X),X.getGripSpace()},this.getHand=function(L){let X=A[L];return X===void 0&&(X=new Ka,A[L]=X),X.getHandSpace()};function V(L){const X=w.indexOf(L.inputSource);if(X===-1)return;const ae=A[X];ae!==void 0&&(ae.update(L.inputSource,L.frame,l||s),ae.dispatchEvent({type:L.type,data:L.inputSource}))}function Z(){r.removeEventListener("select",V),r.removeEventListener("selectstart",V),r.removeEventListener("selectend",V),r.removeEventListener("squeeze",V),r.removeEventListener("squeezestart",V),r.removeEventListener("squeezeend",V),r.removeEventListener("end",Z),r.removeEventListener("inputsourceschange",ie);for(let L=0;L<A.length;L++){const X=w[L];X!==null&&(w[L]=null,A[L].disconnect(X))}P=null,B=null,m.reset();for(const L in p)delete p[L];if(e.setRenderTarget(y),d=null,u=null,f=null,r=null,b=null,ke.stop(),i.isPresenting=!1,e.setPixelRatio(S),e.setSize(C.width,C.height,!1),R!==null){const L=R.camera;L.fov=R.fov,L.zoom=R.zoom,L.updateProjectionMatrix(),R=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(L){a=L,i.isPresenting===!0&&ze("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(L){o=L,i.isPresenting===!0&&ze("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||s},this.setReferenceSpace=function(L){l=L},this.getBaseLayer=function(){return u!==null?u:d},this.getBinding=function(){return f===null&&_&&(f=new XRWebGLBinding(r,t)),f},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(L){if(r=L,r!==null){if(y=e.getRenderTarget(),r.addEventListener("select",V),r.addEventListener("selectstart",V),r.addEventListener("selectend",V),r.addEventListener("squeeze",V),r.addEventListener("squeezestart",V),r.addEventListener("squeezeend",V),r.addEventListener("end",Z),r.addEventListener("inputsourceschange",ie),M.xrCompatible!==!0&&await t.makeXRCompatible(),S=e.getPixelRatio(),e.getSize(C),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let ae=null,xe=null,ce=null;M.depth&&(ce=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ae=M.stencil?xi:Yn,xe=M.stencil?wr:Rn);const we={colorFormat:t.RGBA8,depthFormat:ce,scaleFactor:a};f=this.getBinding(),u=f.createProjectionLayer(we),r.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),b=new ln(u.textureWidth,u.textureHeight,{format:on,type:en,depthTexture:new Ar(u.textureWidth,u.textureHeight,xe,void 0,void 0,void 0,void 0,void 0,void 0,ae),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{const ae={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:a};d=new XRWebGLLayer(r,t,ae),r.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),b=new ln(d.framebufferWidth,d.framebufferHeight,{format:on,type:en,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(c),l=null,s=await r.requestReferenceSpace(o),ke.setContext(r),ke.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function ie(L){for(let X=0;X<L.removed.length;X++){const ae=L.removed[X],xe=w.indexOf(ae);xe>=0&&(w[xe]=null,A[xe].disconnect(ae))}for(let X=0;X<L.added.length;X++){const ae=L.added[X];let xe=w.indexOf(ae);if(xe===-1){for(let we=0;we<A.length;we++)if(we>=w.length){w.push(ae),xe=we;break}else if(w[we]===null){w[we]=ae,xe=we;break}if(xe===-1)break}const ce=A[xe];ce&&ce.connect(ae)}}const K=new W,ee=new W;function U(L,X,ae){K.setFromMatrixPosition(X.matrixWorld),ee.setFromMatrixPosition(ae.matrixWorld);const xe=K.distanceTo(ee),ce=X.projectionMatrix.elements,we=ae.projectionMatrix.elements,Ge=ce[14]/(ce[10]-1),Ue=ce[14]/(ce[10]+1),$e=(ce[9]+1)/ce[5],ct=(ce[9]-1)/ce[5],qe=(ce[8]-1)/ce[0],ft=(we[8]+1)/we[0],yt=Ge*qe,Tt=Ge*ft,gt=xe/(-qe+ft),He=gt*-qe;if(X.matrixWorld.decompose(L.position,L.quaternion,L.scale),L.translateX(He),L.translateZ(gt),L.matrixWorld.compose(L.position,L.quaternion,L.scale),L.matrixWorldInverse.copy(L.matrixWorld).invert(),ce[10]===-1)L.projectionMatrix.copy(X.projectionMatrix),L.projectionMatrixInverse.copy(X.projectionMatrixInverse);else{const I=Ge+gt,ut=Ue+gt,Be=yt-He,T=Tt+(xe-He),v=$e*Ue/ut*I,z=ct*Ue/ut*I;L.projectionMatrix.makePerspective(Be,T,v,z,I,ut),L.projectionMatrixInverse.copy(L.projectionMatrix).invert()}}function re(L,X){X===null?L.matrixWorld.copy(L.matrix):L.matrixWorld.multiplyMatrices(X.matrixWorld,L.matrix),L.matrixWorldInverse.copy(L.matrixWorld).invert()}this.updateCamera=function(L){if(r===null)return;let X=L.near,ae=L.far;m.texture!==null&&(m.depthNear>0&&(X=m.depthNear),m.depthFar>0&&(ae=m.depthFar)),k.near=N.near=D.near=X,k.far=N.far=D.far=ae,(P!==k.near||B!==k.far)&&(r.updateRenderState({depthNear:k.near,depthFar:k.far}),P=k.near,B=k.far),k.layers.mask=L.layers.mask|6,D.layers.mask=k.layers.mask&-5,N.layers.mask=k.layers.mask&-3;const xe=L.parent,ce=k.cameras;re(k,xe);for(let we=0;we<ce.length;we++)re(ce[we],xe);ce.length===2?U(k,D,N):k.projectionMatrix.copy(D.projectionMatrix),R===null&&L.isPerspectiveCamera&&(R={camera:L,fov:L.fov,zoom:L.zoom}),oe(L,k,xe)};function oe(L,X,ae){ae===null?L.matrix.copy(X.matrixWorld):(L.matrix.copy(ae.matrixWorld),L.matrix.invert(),L.matrix.multiply(X.matrixWorld)),L.matrix.decompose(L.position,L.quaternion,L.scale),L.updateMatrixWorld(!0),L.projectionMatrix.copy(X.projectionMatrix),L.projectionMatrixInverse.copy(X.projectionMatrixInverse),L.isPerspectiveCamera&&(L.fov=to*2*Math.atan(1/L.projectionMatrix.elements[5]),L.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(!(u===null&&d===null))return c},this.setFoveation=function(L){c=L,u!==null&&(u.fixedFoveation=L),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=L)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(k)},this.getCameraTexture=function(L){return p[L]};let Re=null;function Fe(L,X){if(h=X.getViewerPose(l||s),g=X,h!==null){const ae=h.views;d!==null&&(e.setRenderTargetFramebuffer(b,d.framebuffer),e.setRenderTarget(b));let xe=!1;ae.length!==k.cameras.length&&(k.cameras.length=0,xe=!0);for(let Ue=0;Ue<ae.length;Ue++){const $e=ae[Ue];let ct=null;if(d!==null)ct=d.getViewport($e);else{const ft=f.getViewSubImage(u,$e);ct=ft.viewport,Ue===0&&(e.setRenderTargetTextures(b,ft.colorTexture,ft.depthStencilTexture),e.setRenderTarget(b))}let qe=H[Ue];qe===void 0&&(qe=new sn,qe.layers.enable(Ue),qe.viewport=new Et,H[Ue]=qe),qe.matrix.fromArray($e.transform.matrix),qe.matrix.decompose(qe.position,qe.quaternion,qe.scale),qe.projectionMatrix.fromArray($e.projectionMatrix),qe.projectionMatrixInverse.copy(qe.projectionMatrix).invert(),qe.viewport.set(ct.x,ct.y,ct.width,ct.height),Ue===0&&(k.matrix.copy(qe.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),xe===!0&&k.cameras.push(qe)}const ce=r.enabledFeatures;if(ce&&ce.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&_){f=i.getBinding();const Ue=f.getDepthInformation(ae[0]);Ue&&Ue.isValid&&Ue.texture&&m.init(Ue,r.renderState)}if(ce&&ce.includes("camera-access")&&_){e.state.unbindTexture(),f=i.getBinding();for(let Ue=0;Ue<ae.length;Ue++){const $e=ae[Ue].camera;if($e){let ct=p[$e];ct||(ct=new Pc,p[$e]=ct);const qe=f.getCameraImage($e);ct.sourceTexture=qe}}}}for(let ae=0;ae<A.length;ae++){const xe=w[ae],ce=A[ae];xe!==null&&ce!==void 0&&ce.update(xe,X,l||s)}Re&&Re(L,X),X.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:X}),g=null}const ke=new Nc;ke.setAnimationLoop(Fe),this.setAnimationLoop=function(L){Re=L},this.dispose=function(){}}}const P_=new wt,Hc=new Ve;Hc.set(-1,0,0,0,1,0,0,0,1);function L_(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,Lc(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,M,y,b){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?a(m,p):p.isMeshLambertMaterial?(a(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(a(m,p),f(m,p)):p.isMeshPhongMaterial?(a(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(a(m,p),u(m,p),p.isMeshPhysicalMaterial&&d(m,p,b)):p.isMeshMatcapMaterial?(a(m,p),g(m,p)):p.isMeshDepthMaterial?a(m,p):p.isMeshDistanceMaterial?(a(m,p),_(m,p)):p.isMeshNormalMaterial?a(m,p):p.isLineBasicMaterial?(s(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,M,y):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function a(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===$t&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===$t&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const M=e.get(p),y=M.envMap,b=M.envMapRotation;y&&(m.envMap.value=y,m.envMapRotation.value.setFromMatrix4(P_.makeRotationFromEuler(b)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Hc),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function s(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,M,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=y*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function f(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===$t&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.retroreflectivity>0&&(m.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const M=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function D_(n,e,t,i){let r={},a={},s=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(b,A){const w=A.program;i.uniformBlockBinding(b,w)}function l(b,A){let w=r[b.id];w===void 0&&(m(b),w=h(b),r[b.id]=w,b.addEventListener("dispose",M));const C=A.program;i.updateUBOMapping(b,C);const S=e.render.frame;a[b.id]!==S&&(u(b),a[b.id]=S)}function h(b){const A=f();b.__bindingPointIndex=A;const w=n.createBuffer(),C=b.__size,S=b.usage;return n.bindBuffer(n.UNIFORM_BUFFER,w),n.bufferData(n.UNIFORM_BUFFER,C,S),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,A,w),w}function f(){for(let b=0;b<o;b++)if(s.indexOf(b)===-1)return s.push(b),b;return tt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(b){const A=r[b.id],w=b.uniforms,C=b.__cache;n.bindBuffer(n.UNIFORM_BUFFER,A);for(let S=0,R=w.length;S<R;S++){const D=w[S];if(Array.isArray(D))for(let N=0,H=D.length;N<H;N++)d(D[N],S,N,C);else d(D,S,0,C)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(b,A,w,C){if(_(b,A,w,C)===!0){const S=b.__offset,R=b.value;if(Array.isArray(R)){let D=0;for(let N=0;N<R.length;N++){const H=R[N],k=p(H);g(H,b.__data,D),typeof H!="number"&&typeof H!="boolean"&&!H.isMatrix3&&!ArrayBuffer.isView(H)&&(D+=k.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(R,b.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,S,b.__data)}}function g(b,A,w){typeof b=="number"||typeof b=="boolean"?A[0]=b:b.isMatrix3?(A[0]=b.elements[0],A[1]=b.elements[1],A[2]=b.elements[2],A[3]=0,A[4]=b.elements[3],A[5]=b.elements[4],A[6]=b.elements[5],A[7]=0,A[8]=b.elements[6],A[9]=b.elements[7],A[10]=b.elements[8],A[11]=0):ArrayBuffer.isView(b)?A.set(new b.constructor(b.buffer,b.byteOffset,A.length)):b.toArray(A,w)}function _(b,A,w,C){const S=b.value,R=A+"_"+w;if(C[R]===void 0)return typeof S=="number"||typeof S=="boolean"?C[R]=S:ArrayBuffer.isView(S)?C[R]=S.slice():C[R]=S.clone(),!0;{const D=C[R];if(typeof S=="number"||typeof S=="boolean"){if(D!==S)return C[R]=S,!0}else{if(ArrayBuffer.isView(S))return!0;if(D.equals(S)===!1)return D.copy(S),!0}}return!1}function m(b){const A=b.uniforms;let w=0;const C=16;for(let R=0,D=A.length;R<D;R++){const N=Array.isArray(A[R])?A[R]:[A[R]];for(let H=0,k=N.length;H<k;H++){const P=N[H],B=Array.isArray(P.value)?P.value:[P.value];for(let V=0,Z=B.length;V<Z;V++){const ie=B[V],K=p(ie),ee=w%C,U=ee%K.boundary,re=ee+U;w+=U,re!==0&&C-re<K.storage&&(w+=C-re),P.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=w,w+=K.storage}}}const S=w%C;return S>0&&(w+=C-S),b.__size=w,b.__cache={},this}function p(b){const A={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(A.boundary=4,A.storage=4):b.isVector2?(A.boundary=8,A.storage=8):b.isVector3||b.isColor?(A.boundary=16,A.storage=12):b.isVector4?(A.boundary=16,A.storage=16):b.isMatrix3?(A.boundary=48,A.storage=48):b.isMatrix4?(A.boundary=64,A.storage=64):b.isTexture?ze("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(b)?(A.boundary=16,A.storage=b.byteLength):ze("WebGLRenderer: Unsupported uniform value type.",b),A}function M(b){const A=b.target;A.removeEventListener("dispose",M);const w=s.indexOf(A.__bindingPointIndex);s.splice(w,1),n.deleteBuffer(r[A.id]),delete r[A.id],delete a[A.id]}function y(){for(const b in r)n.deleteBuffer(r[b]);s=[],r={},a={}}return{bind:c,update:l,dispose:y}}const I_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let vn=null;function U_(){return vn===null&&(vn=new Yi(I_,16,16,yi,Cn),vn.name="DFG_LUT",vn.minFilter=Ct,vn.magFilter=Ct,vn.wrapS=zn,vn.wrapT=zn,vn.generateMipmaps=!1,vn.needsUpdate=!0),vn}class N_{constructor(e={}){const{canvas:t=td(),context:i=null,depth:r=!0,stencil:a=!1,alpha:s=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:d=en}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=s;const _=d,m=new Set([bo,So,Mo]),p=new Set([en,Rn,yr,wr,xo,vo]),M=new Uint32Array(4),y=new Int32Array(4),b=new W;let A=null,w=null;const C=[],S=[];let R=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=yn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const D=this;let N=!1,H=null,k=null,P=null,B=null;this._outputColorSpace=an;let V=0,Z=0,ie=null,K=-1,ee=null;const U=new Et,re=new Et;let oe=null;const Re=new it(0);let Fe=0,ke=t.width,L=t.height,X=1,ae=null,xe=null;const ce=new Et(0,0,ke,L),we=new Et(0,0,ke,L);let Ge=!1;const Ue=new Ao;let $e=!1,ct=!1;const qe=new wt,ft=new W,yt=new Et,Tt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let gt=!1;function He(){return ie===null?X:1}let I=i;function ut(E,F){return t.getContext(E,F)}let Be,T,v,z,G,J,le,ue,j,te,he,Le,me,fe,De,Oe,Xe,O,de,ne,pe,Me,se;try{const E={alpha:!0,depth:r,stencil:a,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${go}`),t.addEventListener("webglcontextlost",_t,!1),t.addEventListener("webglcontextrestored",rt,!1),t.addEventListener("webglcontextcreationerror",un,!1),I===null){const F="webgl2";if(I=ut(F,E),I===null)throw ut(F)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ie()}catch(E){throw t.removeEventListener("webglcontextlost",_t,!1),t.removeEventListener("webglcontextrestored",rt,!1),t.removeEventListener("webglcontextcreationerror",un,!1),tt("WebGLRenderer: "+E.message),E}function Ie(){Be=new U0(I),Be.init(),pe=new w_(I,Be),T=new y0(I,Be,e,pe),v=new E_(I,Be),T.reversedDepthBuffer&&u&&v.buffers.depth.setReversed(!0),k=I.createFramebuffer(),P=I.createFramebuffer(),B=I.createFramebuffer(),z=new O0(I),G=new c_,J=new y_(I,Be,v,G,T,pe,z),le=new I0(D),ue=new zd(I),Me=new b0(I,ue),j=new N0(I,ue,z,Me),te=new z0(I,j,ue,Me,z),O=new B0(I,T,J),De=new w0(G),he=new l_(D,le,Be,T,Me,De),Le=new L_(D,G),me=new h_,fe=new __(Be),Xe=new S0(D,le,v,te,g,c),Oe=new b_(D,te,T),se=new D_(I,z,T,v),de=new E0(I,Be,z),ne=new F0(I,Be,z),z.programs=he.programs,D.capabilities=T,D.extensions=Be,D.properties=G,D.renderLists=me,D.shadowMap=Oe,D.state=v,D.info=z}_!==en&&(R=new G0(_,t.width,t.height,o,r,a));const Ce=new C_(D,I);this.xr=Ce,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const E=Be.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Be.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(E){E!==void 0&&(X=E,this.setSize(ke,L,!1))},this.getSize=function(E){return E.set(ke,L)},this.setSize=function(E,F,$=!0){if(Ce.isPresenting){ze("WebGLRenderer: Can't change size while VR device is presenting.");return}ke=E,L=F,t.width=Math.floor(E*X),t.height=Math.floor(F*X),$===!0&&(t.style.width=E+"px",t.style.height=F+"px"),R!==null&&R.setSize(t.width,t.height),this.setViewport(0,0,E,F)},this.getDrawingBufferSize=function(E){return E.set(ke*X,L*X).floor()},this.setDrawingBufferSize=function(E,F,$){ke=E,L=F,X=$,t.width=Math.floor(E*$),t.height=Math.floor(F*$),this.setViewport(0,0,E,F)},this.setEffects=function(E){if(_===en){tt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let F=0;F<E.length;F++)if(E[F].isOutputPass===!0){ze("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}R.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(U)},this.getViewport=function(E){return E.copy(ce)},this.setViewport=function(E,F,$,Y){E.isVector4?ce.set(E.x,E.y,E.z,E.w):ce.set(E,F,$,Y),v.viewport(U.copy(ce).multiplyScalar(X).round())},this.getScissor=function(E){return E.copy(we)},this.setScissor=function(E,F,$,Y){E.isVector4?we.set(E.x,E.y,E.z,E.w):we.set(E,F,$,Y),v.scissor(re.copy(we).multiplyScalar(X).round())},this.getScissorTest=function(){return Ge},this.setScissorTest=function(E){v.setScissorTest(Ge=E)},this.setOpaqueSort=function(E){ae=E},this.setTransparentSort=function(E){xe=E},this.getClearColor=function(E){return E.copy(Xe.getClearColor())},this.setClearColor=function(){Xe.setClearColor(...arguments)},this.getClearAlpha=function(){return Xe.getClearAlpha()},this.setClearAlpha=function(){Xe.setClearAlpha(...arguments)},this.clear=function(E=!0,F=!0,$=!0){let Y=0;if(E){let q=!1;if(ie!==null){const ve=ie.texture.format;q=m.has(ve)}if(q){const ve=ie.texture.type,Ee=p.has(ve),_e=Xe.getClearColor(),Te=Xe.getClearAlpha(),Pe=_e.r,Ke=_e.g,Je=_e.b;Ee?(M[0]=Pe,M[1]=Ke,M[2]=Je,M[3]=Te,I.clearBufferuiv(I.COLOR,0,M)):(y[0]=Pe,y[1]=Ke,y[2]=Je,y[3]=Te,I.clearBufferiv(I.COLOR,0,y))}else Y|=I.COLOR_BUFFER_BIT}F&&(Y|=I.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),$&&(Y|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Y!==0&&I.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),H=E},this.dispose=function(){t.removeEventListener("webglcontextlost",_t,!1),t.removeEventListener("webglcontextrestored",rt,!1),t.removeEventListener("webglcontextcreationerror",un,!1),Xe.dispose(),me.dispose(),fe.dispose(),G.dispose(),le.dispose(),te.dispose(),Me.dispose(),se.dispose(),he.dispose(),Ce.dispose(),Ce.removeEventListener("sessionstart",Lo),Ce.removeEventListener("sessionend",Do),li.stop()};function _t(E){E.preventDefault(),jo("WebGLRenderer: Context Lost."),N=!0}function rt(){jo("WebGLRenderer: Context Restored."),N=!1;const E=z.autoReset,F=Oe.enabled,$=Oe.autoUpdate,Y=Oe.needsUpdate,q=Oe.type;Ie(),z.autoReset=E,Oe.enabled=F,Oe.autoUpdate=$,Oe.needsUpdate=Y,Oe.type=q}function un(E){tt("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function gn(E){const F=E.target;F.removeEventListener("dispose",gn),qc(F)}function qc(E){Kc(E),G.remove(E)}function Kc(E){const F=G.get(E).programs;F!==void 0&&(F.forEach(function($){he.releaseProgram($)}),E.isShaderMaterial&&he.releaseShaderCache(E))}this.renderBufferDirect=function(E,F,$,Y,q,ve){F===null&&(F=Tt);const Ee=q.isMesh&&q.matrixWorld.determinantAffine()<0,_e=Jc(E,F,$,Y,q);v.setMaterial(Y,Ee);let Te=$.index,Pe=1;if(Y.wireframe===!0){if(Te=j.getWireframeAttribute($),Te===void 0)return;Pe=2}const Ke=$.drawRange,Je=$.attributes.position;let Ae=Ke.start*Pe,at=(Ke.start+Ke.count)*Pe;ve!==null&&(Ae=Math.max(Ae,ve.start*Pe),at=Math.min(at,(ve.start+ve.count)*Pe)),Te!==null?(Ae=Math.max(Ae,0),at=Math.min(at,Te.count)):Je!=null&&(Ae=Math.max(Ae,0),at=Math.min(at,Je.count));const Pt=at-Ae;if(Pt<0||Pt===1/0)return;Me.setup(q,Y,_e,$,Te);let St,mt=de;if(Te!==null&&(St=ue.get(Te),mt=ne,mt.setIndex(St)),q.isMesh)Y.wireframe===!0?(v.setLineWidth(Y.wireframeLinewidth*He()),mt.setMode(I.LINES)):mt.setMode(I.TRIANGLES);else if(q.isLine){let zt=Y.linewidth;zt===void 0&&(zt=1),v.setLineWidth(zt*He()),q.isLineSegments?mt.setMode(I.LINES):q.isLineLoop?mt.setMode(I.LINE_LOOP):mt.setMode(I.LINE_STRIP)}else q.isPoints?mt.setMode(I.POINTS):q.isSprite&&mt.setMode(I.TRIANGLES);if(q.isBatchedMesh)if(Be.get("WEBGL_multi_draw"))mt.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else{const zt=q._multiDrawStarts,be=q._multiDrawCounts,Wt=q._multiDrawCount,et=Te?ue.get(Te).bytesPerElement:1,nn=G.get(Y).currentProgram.getUniforms();for(let _n=0;_n<Wt;_n++)nn.setValue(I,"_gl_DrawID",_n),mt.render(zt[_n]/et,be[_n])}else if(q.isInstancedMesh)mt.renderInstances(Ae,Pt,q.count);else if($.isInstancedBufferGeometry){const zt=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,be=Math.min($.instanceCount,zt);mt.renderInstances(Ae,Pt,be)}else mt.render(Ae,Pt)};function Po(E,F,$,Y){H!==null&&E.isNodeMaterial&&H.setObject(Y,E),$e===!0&&De.setState(E,$,!1),E.transparent===!0&&E.side===Bn&&E.forceSinglePass===!1?(E.side=$t,E.needsUpdate=!0,Ir(E,F,Y),E.side=bi,E.needsUpdate=!0,Ir(E,F,Y),E.side=Bn):Ir(E,F,Y)}this.compile=function(E,F,$=null){$===null&&($=E),H!==null&&H.renderStart(E,F,$),w=fe.get($),w.init(F),S.push(w),$.traverseVisible(function(q){q.isLight&&q.layers.test(F.layers)&&(w.pushLight(q),q.castShadow&&w.pushShadow(q))}),E!==$&&E.traverseVisible(function(q){q.isLight&&q.layers.test(F.layers)&&(w.pushLight(q),q.castShadow&&w.pushShadow(q))}),w.setupLights(),H!==null&&H.updateLights(w.state.lightsArray),ct=this.localClippingEnabled,$e=De.init(this.clippingPlanes,ct),$e===!0&&De.setGlobalState(this.clippingPlanes,F),H!==null&&Oe.render(w.state.shadowsArray,$,F);const Y=new Set;return E.traverse(function(q){if(!(q.isMesh||q.isPoints||q.isLine||q.isSprite))return;const ve=q.material;if(ve)if(Array.isArray(ve))for(let Ee=0;Ee<ve.length;Ee++){const _e=ve[Ee];Po(_e,$,F,q),Y.add(_e)}else Po(ve,$,F,q),Y.add(ve)}),w=S.pop(),H!==null&&H.renderEnd(),Y},this.compileAsync=function(E,F,$=null){const Y=this.compile(E,F,$);return new Promise(q=>{function ve(){if(Y.forEach(function(Ee){const Te=G.get(Ee).currentProgram;(Te===void 0||Te.isReady())&&Y.delete(Ee)}),Y.size===0){q(E);return}setTimeout(ve,10)}Be.get("KHR_parallel_shader_compile")!==null?ve():setTimeout(ve,10)})};let Ia=null;function Zc(E){Ia&&Ia(E)}function Lo(){li.stop()}function Do(){li.start()}const li=new Nc;li.setAnimationLoop(Zc),typeof self<"u"&&li.setContext(self),this.setAnimationLoop=function(E){Ia=E,Ce.setAnimationLoop(E),E===null?li.stop():li.start()},Ce.addEventListener("sessionstart",Lo),Ce.addEventListener("sessionend",Do),this.render=function(E,F){if(F!==void 0&&F.isCamera!==!0){tt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;H!==null&&H.renderStart(E,F);const $=Ce.enabled===!0&&Ce.isPresenting===!0,Y=R!==null&&(ie===null||$)&&R.begin(D,ie);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),Ce.enabled===!0&&Ce.isPresenting===!0&&(R===null||R.isCompositing()===!1)&&(Ce.cameraAutoUpdate===!0&&Ce.updateCamera(F),F=Ce.getCamera()),E.isScene===!0&&E.onBeforeRender(D,E,F,ie),w=fe.get(E,S.length),w.init(F),w.state.textureUnits=J.getTextureUnits(),S.push(w),qe.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Ue.setFromProjectionMatrix(qe,En,F.reversedDepth),ct=this.localClippingEnabled,$e=De.init(this.clippingPlanes,ct),A=me.get(E,C.length),A.init(),C.push(A),Ce.enabled===!0&&Ce.isPresenting===!0){const Ee=D.xr.getDepthSensingMesh();Ee!==null&&Ua(Ee,F,-1/0,D.sortObjects)}Ua(E,F,0,D.sortObjects),A.finish(),H!==null&&H.updateLights(w.state.lightsArray),D.sortObjects===!0&&A.sort(ae,xe),gt=Ce.enabled===!1||Ce.isPresenting===!1||Ce.hasDepthSensing()===!1,gt&&Xe.addToRenderList(A,E),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),$e===!0&&De.beginShadows();const q=w.state.shadowsArray;if(Oe.render(q,E,F),$e===!0&&De.endShadows(),(Y&&R.hasRenderPass())===!1){const Ee=A.opaque,_e=A.transmissive;if(w.setupLights(),F.isArrayCamera){const Te=F.cameras;if(_e.length>0)for(let Pe=0,Ke=Te.length;Pe<Ke;Pe++){const Je=Te[Pe];Uo(Ee,_e,E,Je)}gt&&Xe.render(E);for(let Pe=0,Ke=Te.length;Pe<Ke;Pe++){const Je=Te[Pe];Io(A,E,Je,Je.viewport)}}else _e.length>0&&Uo(Ee,_e,E,F),gt&&Xe.render(E),Io(A,E,F)}ie!==null&&Z===0&&(J.updateMultisampleRenderTarget(ie),J.updateRenderTargetMipmap(ie)),Y&&R.end(D),E.isScene===!0&&E.onAfterRender(D,E,F),Me.resetDefaultState(),K=-1,ee=null,S.pop(),S.length>0?(w=S[S.length-1],J.setTextureUnits(w.state.textureUnits),$e===!0&&De.setGlobalState(D.clippingPlanes,w.state.camera)):w=null,C.pop(),C.length>0?A=C[C.length-1]:A=null,H!==null&&H.renderEnd()};function Ua(E,F,$,Y){if(E.visible===!1)return;if(E.layers.test(F.layers)){if(E.isGroup)$=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(F);else if(E.isLightProbeGrid)w.pushLightProbeGrid(E);else if(E.isLight)w.pushLight(E),E.castShadow&&w.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||E.intersectsFrustum(Ue)){Y&&yt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(qe);const Ee=te.update(E),_e=E.material;_e.visible&&A.push(E,Ee,_e,$,yt.z,null,F)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||E.intersectsFrustum(Ue))){const Ee=te.update(E),_e=E.material;if(Y&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),yt.copy(E.boundingSphere.center)):(Ee.boundingSphere===null&&Ee.computeBoundingSphere(),yt.copy(Ee.boundingSphere.center)),yt.applyMatrix4(E.matrixWorld).applyMatrix4(qe)),Array.isArray(_e)){const Te=Ee.groups;for(let Pe=0,Ke=Te.length;Pe<Ke;Pe++){const Je=Te[Pe],Ae=_e[Je.materialIndex];Ae&&Ae.visible&&A.push(E,Ee,Ae,$,yt.z,Je,F)}}else _e.visible&&A.push(E,Ee,_e,$,yt.z,null,F)}}const ve=E.children;for(let Ee=0,_e=ve.length;Ee<_e;Ee++)Ua(ve[Ee],F,$,Y)}function Io(E,F,$,Y){const{opaque:q,transmissive:ve,transparent:Ee}=E;w.setupLightsView($),$e===!0&&De.setGlobalState(D.clippingPlanes,$),Y&&v.viewport(U.copy(Y)),q.length>0&&Dr(q,F,$),ve.length>0&&Dr(ve,F,$),Ee.length>0&&Dr(Ee,F,$),v.buffers.depth.setTest(!0),v.buffers.depth.setMask(!0),v.buffers.color.setMask(!0),v.setPolygonOffset(!1)}function Uo(E,F,$,Y){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[Y.id]===void 0){const Ae=Be.has("EXT_color_buffer_half_float")||Be.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[Y.id]=new ln(1,1,{generateMipmaps:!0,type:Ae?Cn:en,minFilter:_i,samples:Math.max(4,T.samples),stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Qe.workingColorSpace})}const ve=w.state.transmissionRenderTarget[Y.id],Ee=Y.viewport||U;ve.setSize(Ee.z*D.transmissionResolutionScale,Ee.w*D.transmissionResolutionScale);const _e=D.getRenderTarget(),Te=D.getActiveCubeFace(),Pe=D.getActiveMipmapLevel();D.setRenderTarget(ve),D.getClearColor(Re),Fe=D.getClearAlpha(),Fe<1&&D.setClearColor(16777215,.5),D.clear(),gt&&Xe.render($);const Ke=D.toneMapping;D.toneMapping=yn;const Je=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),w.setupLightsView(Y),$e===!0&&De.setGlobalState(D.clippingPlanes,Y),Dr(E,$,Y),J.updateMultisampleRenderTarget(ve),J.updateRenderTargetMipmap(ve),Be.has("WEBGL_multisampled_render_to_texture")===!1){let Ae=!1;for(let at=0,Pt=F.length;at<Pt;at++){const St=F[at],{object:mt,geometry:zt,material:be,group:Wt}=St;if(be.side===Bn&&mt.layers.test(Y.layers)){const et=be.side;be.side=$t,be.needsUpdate=!0,No(mt,$,Y,zt,be,Wt),be.side=et,be.needsUpdate=!0,Ae=!0}}Ae===!0&&(J.updateMultisampleRenderTarget(ve),J.updateRenderTargetMipmap(ve))}D.setRenderTarget(_e,Te,Pe),D.setClearColor(Re,Fe),Je!==void 0&&(Y.viewport=Je),D.toneMapping=Ke}function Dr(E,F,$){const Y=F.isScene===!0?F.overrideMaterial:null;for(let q=0,ve=E.length;q<ve;q++){const Ee=E[q],{object:_e,geometry:Te,group:Pe}=Ee;let Ke=Ee.material;Ke.allowOverride===!0&&Y!==null&&(Ke=Y),_e.layers.test($.layers)&&No(_e,F,$,Te,Ke,Pe)}}function No(E,F,$,Y,q,ve){H!==null&&q.isNodeMaterial&&H.setObject(E,q),E.onBeforeRender(D,F,$,Y,q,ve),E.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),q.onBeforeRender(D,F,$,Y,E,ve),q.transparent===!0&&q.side===Bn&&q.forceSinglePass===!1?(q.side=$t,q.needsUpdate=!0,D.renderBufferDirect($,F,Y,q,E,ve),q.side=bi,q.needsUpdate=!0,D.renderBufferDirect($,F,Y,q,E,ve),q.side=Bn):D.renderBufferDirect($,F,Y,q,E,ve),E.onAfterRender(D,F,$,Y,q,ve)}function Ir(E,F,$){F.isScene!==!0&&(F=Tt);const Y=G.get(E),q=w.state.lights,ve=w.state.shadowsArray,Ee=q.state.version,_e=he.getParameters(E,q.state,ve,F,$,w.state.lightProbeGridArray),Te=he.getProgramCacheKey(_e);let Pe=Y.programs;Y.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?F.environment:null,Y.fog=F.fog;const Ke=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;Y.envMap=le.get(E.envMap||Y.environment,Ke),Y.envMapRotation=Y.environment!==null&&E.envMap===null?F.environmentRotation:E.envMapRotation,Pe===void 0&&(E.addEventListener("dispose",gn),Pe=new Map,Y.programs=Pe);let Je=Pe.get(Te);if(Je!==void 0){if(Y.currentProgram===Je&&Y.lightsStateVersion===Ee)return Oo(E,_e),Je}else _e.uniforms=he.getUniforms(E),H!==null&&E.isNodeMaterial&&H.build(E,$,_e),E.onBeforeCompile(_e,D),Je=he.acquireProgram(_e,Te),Pe.set(Te,Je),Y.uniforms=_e.uniforms;const Ae=Y.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Ae.clippingPlanes=De.uniform),Oo(E,_e),Y.needsLights=jc(E),Y.lightsStateVersion=Ee,Y.needsLights&&(Ae.ambientLightColor.value=q.state.ambient,Ae.lightProbe.value=q.state.probe,Ae.sunLights.value=q.state.sun,Ae.sunLightShadows.value=q.state.sunShadow,Ae.directionalLights.value=q.state.directional,Ae.directionalLightShadows.value=q.state.directionalShadow,Ae.spotLights.value=q.state.spot,Ae.spotLightShadows.value=q.state.spotShadow,Ae.rectAreaLights.value=q.state.rectArea,Ae.ltc_1.value=q.state.rectAreaLTC1,Ae.ltc_2.value=q.state.rectAreaLTC2,Ae.pointLights.value=q.state.point,Ae.pointLightShadows.value=q.state.pointShadow,Ae.hemisphereLights.value=q.state.hemi,Ae.sunShadowMatrix.value=q.state.sunShadowMatrix,Ae.sunShadowCascade.value=q.state.sunShadowCascade,Ae.directionalShadowMatrix.value=q.state.directionalShadowMatrix,Ae.spotLightMatrix.value=q.state.spotLightMatrix,Ae.spotLightMap.value=q.state.spotLightMap,Ae.pointShadowMatrix.value=q.state.pointShadowMatrix),Y.lightProbeGrid=w.state.lightProbeGridArray.length>0,Y.currentProgram=Je,Y.uniformsList=null,Je}function Fo(E){if(E.uniformsList===null){const F=E.currentProgram.getUniforms();E.uniformsList=da.seqWithValue(F.seq,E.uniforms)}return E.uniformsList}function Oo(E,F){const $=G.get(E);$.outputColorSpace=F.outputColorSpace,$.batching=F.batching,$.batchingColor=F.batchingColor,$.instancing=F.instancing,$.instancingColor=F.instancingColor,$.instancingMorph=F.instancingMorph,$.skinning=F.skinning,$.morphTargets=F.morphTargets,$.morphNormals=F.morphNormals,$.morphColors=F.morphColors,$.morphTargetsCount=F.morphTargetsCount,$.numClippingPlanes=F.numClippingPlanes,$.numIntersection=F.numClipIntersection,$.vertexAlphas=F.vertexAlphas,$.vertexTangents=F.vertexTangents,$.toneMapping=F.toneMapping}function $c(E,F){if(E.length===0)return null;if(E.length===1)return E[0].texture!==null?E[0]:null;b.setFromMatrixPosition(F.matrixWorld);for(let $=0,Y=E.length;$<Y;$++){const q=E[$];if(q.texture!==null&&q.boundingBox.containsPoint(b))return q}return null}function Jc(E,F,$,Y,q){F.isScene!==!0&&(F=Tt),J.resetTextureUnits();const ve=F.fog,Ee=Y.isMeshStandardMaterial||Y.isMeshLambertMaterial||Y.isMeshPhongMaterial?F.environment:null,_e=ie===null?D.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:Qe.workingColorSpace,Te=Y.isMeshStandardMaterial||Y.isMeshLambertMaterial&&!Y.envMap||Y.isMeshPhongMaterial&&!Y.envMap,Pe=le.get(Y.envMap||Ee,Te),Ke=Y.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,Je=!!$.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),Ae=!!$.morphAttributes.position,at=!!$.morphAttributes.normal,Pt=!!$.morphAttributes.color;let St=yn;Y.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(St=D.toneMapping);const mt=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,zt=mt!==void 0?mt.length:0,be=G.get(Y),Wt=w.state.lights;if($e===!0&&(ct===!0||E!==ee)){const xt=E===ee&&Y.id===K;De.setState(Y,E,xt)}let et=!1;Y.version===be.__version?(be.needsLights&&be.lightsStateVersion!==Wt.state.version||be.outputColorSpace!==_e||q.isBatchedMesh&&be.batching===!1||!q.isBatchedMesh&&be.batching===!0||q.isBatchedMesh&&be.batchingColor===!0&&q._colorsTexture===null||q.isBatchedMesh&&be.batchingColor===!1&&q._colorsTexture!==null||q.isInstancedMesh&&be.instancing===!1||!q.isInstancedMesh&&be.instancing===!0||q.isSkinnedMesh&&be.skinning===!1||!q.isSkinnedMesh&&be.skinning===!0||q.isInstancedMesh&&be.instancingColor===!0&&q.instanceColor===null||q.isInstancedMesh&&be.instancingColor===!1&&q.instanceColor!==null||q.isInstancedMesh&&be.instancingMorph===!0&&q.morphTexture===null||q.isInstancedMesh&&be.instancingMorph===!1&&q.morphTexture!==null||be.envMap!==Pe||Y.fog===!0&&be.fog!==ve||be.numClippingPlanes!==void 0&&(be.numClippingPlanes!==De.numPlanes||be.numIntersection!==De.numIntersection)||be.vertexAlphas!==Ke||be.vertexTangents!==Je||be.morphTargets!==Ae||be.morphNormals!==at||be.morphColors!==Pt||be.toneMapping!==St||be.morphTargetsCount!==zt||!!be.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(et=!0):(et=!0,be.__version=Y.version);let nn=be.currentProgram;et===!0&&(nn=Ir(Y,F,q),H&&Y.isNodeMaterial&&H.onUpdateProgram(Y,nn,be));let _n=!1,Kn=!1,Ai=!1;const dt=nn.getUniforms(),At=be.uniforms;if(v.useProgram(nn.program)&&(_n=!0,Kn=!0,Ai=!0),Y.id!==K&&(K=Y.id,Kn=!0),be.needsLights){const xt=$c(w.state.lightProbeGridArray,q);be.lightProbeGrid!==xt&&(be.lightProbeGrid=xt,Kn=!0)}if(_n||ee!==E){v.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),dt.setValue(I,"projectionMatrix",E.projectionMatrix),dt.setValue(I,"viewMatrix",E.matrixWorldInverse);const $n=dt.map.cameraPosition;$n!==void 0&&$n.setValue(I,ft.setFromMatrixPosition(E.matrixWorld)),T.logarithmicDepthBuffer&&dt.setValue(I,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&dt.setValue(I,"isOrthographic",E.isOrthographicCamera===!0),ee!==E&&(ee=E,Kn=!0,Ai=!0)}if(be.needsLights&&(Wt.state.sunShadowMap.length>0&&dt.setValue(I,"sunShadowMap",Wt.state.sunShadowMap,J),Wt.state.directionalShadowMap.length>0&&dt.setValue(I,"directionalShadowMap",Wt.state.directionalShadowMap,J),Wt.state.spotShadowMap.length>0&&dt.setValue(I,"spotShadowMap",Wt.state.spotShadowMap,J),Wt.state.pointShadowMap.length>0&&dt.setValue(I,"pointShadowMap",Wt.state.pointShadowMap,J)),q.isSkinnedMesh){dt.setOptional(I,q,"bindMatrix"),dt.setOptional(I,q,"bindMatrixInverse");const xt=q.skeleton;xt&&(xt.boneTexture===null&&xt.computeBoneTexture(),dt.setValue(I,"boneTexture",xt.boneTexture,J))}q.isBatchedMesh&&(dt.setOptional(I,q,"batchingTexture"),dt.setValue(I,"batchingTexture",q._matricesTexture,J),dt.setOptional(I,q,"batchingIdTexture"),dt.setValue(I,"batchingIdTexture",q._indirectTexture,J),dt.setOptional(I,q,"batchingColorTexture"),q._colorsTexture!==null&&dt.setValue(I,"batchingColorTexture",q._colorsTexture,J));const Zn=$.morphAttributes;if((Zn.position!==void 0||Zn.normal!==void 0||Zn.color!==void 0)&&O.update(q,$,nn),(Kn||be.receiveShadow!==q.receiveShadow)&&(be.receiveShadow=q.receiveShadow,dt.setValue(I,"receiveShadow",q.receiveShadow)),(Y.isMeshStandardMaterial||Y.isMeshLambertMaterial||Y.isMeshPhongMaterial)&&Y.envMap===null&&F.environment!==null&&(At.envMapIntensity.value=F.environmentIntensity),At.dfgLUT!==void 0&&(At.dfgLUT.value=U_()),Kn){if(dt.setValue(I,"toneMappingExposure",D.toneMappingExposure),be.needsLights&&Qc(At,Ai),ve&&Y.fog===!0&&Le.refreshFogUniforms(At,ve),Le.refreshMaterialUniforms(At,Y,X,L,w.state.transmissionRenderTarget[E.id]),be.needsLights&&be.lightProbeGrid){const xt=be.lightProbeGrid;At.probesSH.value=xt.texture,At.probesMin.value.copy(xt.boundingBox.min),At.probesMax.value.copy(xt.boundingBox.max),At.probesResolution.value.copy(xt.resolution)}da.upload(I,Fo(be),At,J)}if(Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(da.upload(I,Fo(be),At,J),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&dt.setValue(I,"center",q.center),dt.setValue(I,"modelViewMatrix",q.modelViewMatrix),dt.setValue(I,"normalMatrix",q.normalMatrix),dt.setValue(I,"modelMatrix",q.matrixWorld),Y.uniformsGroups!==void 0){const xt=Y.uniformsGroups;for(let $n=0,Ri=xt.length;$n<Ri;$n++){const zo=xt[$n];se.update(zo,nn),se.bind(zo,nn)}}return nn}function Qc(E,F){E.ambientLightColor.needsUpdate=F,E.lightProbe.needsUpdate=F,E.sunLights.needsUpdate=F,E.sunLightShadows.needsUpdate=F,E.directionalLights.needsUpdate=F,E.directionalLightShadows.needsUpdate=F,E.pointLights.needsUpdate=F,E.pointLightShadows.needsUpdate=F,E.spotLights.needsUpdate=F,E.spotLightShadows.needsUpdate=F,E.rectAreaLights.needsUpdate=F,E.hemisphereLights.needsUpdate=F}function jc(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return V},this.getActiveMipmapLevel=function(){return Z},this.getRenderTarget=function(){return ie},this.setRenderTargetTextures=function(E,F,$){const Y=G.get(E);Y.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,Y.__autoAllocateDepthBuffer===!1&&(Y.__useRenderToTexture=!1),G.get(E.texture).__webglTexture=F,G.get(E.depthTexture).__webglTexture=Y.__autoAllocateDepthBuffer?void 0:$,Y.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,F){const $=G.get(E);$.__webglFramebuffer=F,$.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(E,F=0,$=0){ie=E,V=F,Z=$;let Y=null,q=!1,ve=!1;if(E){const _e=G.get(E);if(_e.__useDefaultFramebuffer!==void 0){v.bindFramebuffer(I.FRAMEBUFFER,_e.__webglFramebuffer),U.copy(E.viewport),re.copy(E.scissor),oe=E.scissorTest,v.viewport(U),v.scissor(re),v.setScissorTest(oe),K=-1;return}else if(_e.__webglFramebuffer===void 0)J.setupRenderTarget(E);else if(_e.__hasExternalTextures)J.rebindTextures(E,G.get(E.texture).__webglTexture,G.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Ke=E.depthTexture;if(_e.__boundDepthTexture!==Ke){if(Ke!==null&&G.has(Ke)&&(E.width!==Ke.image.width||E.height!==Ke.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");J.setupDepthRenderbuffer(E)}}const Te=E.texture;(Te.isData3DTexture||Te.isDataArrayTexture||Te.isCompressedArrayTexture)&&(ve=!0);const Pe=G.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Pe[F])?Y=Pe[F][$]:Y=Pe[F],q=!0):E.samples>0&&J.useMultisampledRTT(E)===!1?Y=G.get(E).__webglMultisampledFramebuffer:Array.isArray(Pe)?Y=Pe[$]:Y=Pe,U.copy(E.viewport),re.copy(E.scissor),oe=E.scissorTest}else U.copy(ce).multiplyScalar(X).floor(),re.copy(we).multiplyScalar(X).floor(),oe=Ge;if($!==0&&(Y=k),v.bindFramebuffer(I.FRAMEBUFFER,Y)&&v.drawBuffers(E,Y),v.viewport(U),v.scissor(re),v.setScissorTest(oe),q){const _e=G.get(E.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+F,_e.__webglTexture,$)}else if(ve){const _e=F;for(let Te=0;Te<E.textures.length;Te++){const Pe=G.get(E.textures[Te]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+Te,Pe.__webglTexture,$,_e)}}else if(E!==null&&$!==0){const _e=G.get(E.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,_e.__webglTexture,$)}K=-1};function Bo(E){const F=G.get(E);return(F.__readFormat!==E.format||F.__readType!==E.type)&&(F.__readFormat=E.format,F.__readType=E.type,F.__formatReadable=T.textureFormatReadable(E.format),F.__typeReadable=T.textureTypeReadable(E.type)),F}this.readRenderTargetPixels=function(E,F,$,Y,q,ve,Ee,_e=0){if(!(E&&E.isWebGLRenderTarget)){tt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=G.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ee!==void 0&&(Te=Te[Ee]),Te){v.bindFramebuffer(I.FRAMEBUFFER,Te);try{const Pe=E.textures[_e],Ke=Pe.format,Je=Pe.type;E.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+_e);const Ae=Bo(Pe);if(Ae.__formatReadable===!1){tt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ae.__typeReadable===!1){tt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=E.width-Y&&$>=0&&$<=E.height-q&&I.readPixels(F,$,Y,q,pe.convert(Ke),pe.convert(Je),ve)}finally{const Pe=ie!==null?G.get(ie).__webglFramebuffer:null;v.bindFramebuffer(I.FRAMEBUFFER,Pe)}}},this.readRenderTargetPixelsAsync=async function(E,F,$,Y,q,ve,Ee,_e=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=G.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ee!==void 0&&(Te=Te[Ee]),Te)if(F>=0&&F<=E.width-Y&&$>=0&&$<=E.height-q){v.bindFramebuffer(I.FRAMEBUFFER,Te);const Pe=E.textures[_e],Ke=Pe.format,Je=Pe.type;E.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+_e);const Ae=Bo(Pe);if(Ae.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ae.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const at=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,at),I.bufferData(I.PIXEL_PACK_BUFFER,ve.byteLength,I.STREAM_READ),I.readPixels(F,$,Y,q,pe.convert(Ke),pe.convert(Je),0),I.bindBuffer(I.PIXEL_PACK_BUFFER,null);const Pt=ie!==null?G.get(ie).__webglFramebuffer:null;v.bindFramebuffer(I.FRAMEBUFFER,Pt);const St=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await nd(I,St,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,at),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,ve),I.bindBuffer(I.PIXEL_PACK_BUFFER,null),I.deleteBuffer(at),I.deleteSync(St),ve}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,F=null,$=0){const Y=Math.pow(2,-$),q=Math.floor(E.image.width*Y),ve=Math.floor(E.image.height*Y),Ee=F!==null?F.x:0,_e=F!==null?F.y:0;J.setTexture2D(E,0),I.copyTexSubImage2D(I.TEXTURE_2D,$,0,0,Ee,_e,q,ve),v.unbindTexture()},this.copyTextureToTexture=function(E,F,$=null,Y=null,q=0,ve=0){let Ee,_e,Te,Pe,Ke,Je,Ae,at,Pt;const St=E.isCompressedTexture?E.mipmaps[ve]:E.image;if($!==null)Ee=$.max.x-$.min.x,_e=$.max.y-$.min.y,Te=$.isBox3?$.max.z-$.min.z:1,Pe=$.min.x,Ke=$.min.y,Je=$.isBox3?$.min.z:0;else{const At=Math.pow(2,-q);Ee=Math.floor(St.width*At),_e=Math.floor(St.height*At),E.isDataArrayTexture?Te=St.depth:E.isData3DTexture?Te=Math.floor(St.depth*At):Te=1,Pe=0,Ke=0,Je=0}Y!==null?(Ae=Y.x,at=Y.y,Pt=Y.z):(Ae=0,at=0,Pt=0);const mt=pe.convert(F.format),zt=pe.convert(F.type);let be;F.isData3DTexture?(J.setTexture3D(F,0),be=I.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(J.setTexture2DArray(F,0),be=I.TEXTURE_2D_ARRAY):(J.setTexture2D(F,0),be=I.TEXTURE_2D),v.activeTexture(I.TEXTURE0),v.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,F.flipY),v.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),v.pixelStorei(I.UNPACK_ALIGNMENT,F.unpackAlignment);const Wt=v.getParameter(I.UNPACK_ROW_LENGTH),et=v.getParameter(I.UNPACK_IMAGE_HEIGHT),nn=v.getParameter(I.UNPACK_SKIP_PIXELS),_n=v.getParameter(I.UNPACK_SKIP_ROWS),Kn=v.getParameter(I.UNPACK_SKIP_IMAGES);v.pixelStorei(I.UNPACK_ROW_LENGTH,St.width),v.pixelStorei(I.UNPACK_IMAGE_HEIGHT,St.height),v.pixelStorei(I.UNPACK_SKIP_PIXELS,Pe),v.pixelStorei(I.UNPACK_SKIP_ROWS,Ke),v.pixelStorei(I.UNPACK_SKIP_IMAGES,Je);const Ai=E.isDataArrayTexture||E.isData3DTexture,dt=F.isDataArrayTexture||F.isData3DTexture;if(E.isDepthTexture){const At=G.get(E),Zn=G.get(F),xt=G.get(At.__renderTarget),$n=G.get(Zn.__renderTarget);v.bindFramebuffer(I.READ_FRAMEBUFFER,xt.__webglFramebuffer),v.bindFramebuffer(I.DRAW_FRAMEBUFFER,$n.__webglFramebuffer);for(let Ri=0;Ri<Te;Ri++)Ai&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,G.get(E).__webglTexture,q,Je+Ri),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,G.get(F).__webglTexture,ve,Pt+Ri)),I.blitFramebuffer(Pe,Ke,Ee,_e,Ae,at,Ee,_e,I.DEPTH_BUFFER_BIT,I.NEAREST);v.bindFramebuffer(I.READ_FRAMEBUFFER,null),v.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(q!==0||E.isRenderTargetTexture||G.has(E)){const At=G.get(E),Zn=G.get(F);v.bindFramebuffer(I.READ_FRAMEBUFFER,P),v.bindFramebuffer(I.DRAW_FRAMEBUFFER,B);for(let xt=0;xt<Te;xt++)Ai?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,At.__webglTexture,q,Je+xt):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,At.__webglTexture,q),dt?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Zn.__webglTexture,ve,Pt+xt):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Zn.__webglTexture,ve),q!==0?I.blitFramebuffer(Pe,Ke,Ee,_e,Ae,at,Ee,_e,I.COLOR_BUFFER_BIT,I.NEAREST):dt?I.copyTexSubImage3D(be,ve,Ae,at,Pt+xt,Pe,Ke,Ee,_e):I.copyTexSubImage2D(be,ve,Ae,at,Pe,Ke,Ee,_e);v.bindFramebuffer(I.READ_FRAMEBUFFER,null),v.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else dt?E.isDataTexture||E.isData3DTexture?I.texSubImage3D(be,ve,Ae,at,Pt,Ee,_e,Te,mt,zt,St.data):F.isCompressedArrayTexture?I.compressedTexSubImage3D(be,ve,Ae,at,Pt,Ee,_e,Te,mt,St.data):I.texSubImage3D(be,ve,Ae,at,Pt,Ee,_e,Te,mt,zt,St):E.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,ve,Ae,at,Ee,_e,mt,zt,St.data):E.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,ve,Ae,at,St.width,St.height,mt,St.data):I.texSubImage2D(I.TEXTURE_2D,ve,Ae,at,Ee,_e,mt,zt,St);v.pixelStorei(I.UNPACK_ROW_LENGTH,Wt),v.pixelStorei(I.UNPACK_IMAGE_HEIGHT,et),v.pixelStorei(I.UNPACK_SKIP_PIXELS,nn),v.pixelStorei(I.UNPACK_SKIP_ROWS,_n),v.pixelStorei(I.UNPACK_SKIP_IMAGES,Kn),ve===0&&F.generateMipmaps&&I.generateMipmap(be),v.unbindTexture()},this.initRenderTarget=function(E){G.get(E).__webglFramebuffer===void 0&&J.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?J.setTextureCube(E,0):E.isData3DTexture?J.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?J.setTexture2DArray(E,0):J.setTexture2D(E,0),v.unbindTexture()},this.resetState=function(){V=0,Z=0,ie=null,v.reset(),Me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return En}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=Qe._getUnpackColorSpace()}}const F_={hair:x.HAIR,hat:x.HAT,headphones:x.PHONES,top:x.TOP,jacket:x.JACKET,jeans:x.JEANS,sneakers:x.SHOES,broom:x.BROOM,bristles:x.STRAW,skin:x.SKIN},kl={hair:[.01,.7,.85],hat:[.74,.45,.45],headphones:[.92,.55,.9],top:[.13,.15,.95],jacket:[.72,.45,.7],jeans:[.6,.5,.7],sneakers:[0,0,.95],broom:[.08,.55,.55],bristles:[.12,.55,.9],skin:[.07,.3,.94]};function O_(n,e=kl){const t={...kl,...e},i={hair:n.hairHue,jacket:n.cloakHue,hat:n.hatHue,top:n.topHue,jeans:n.jeansHue,sneakers:n.shoeHue,headphones:n.phonesHue},r={};for(const[a,s]of Object.entries(F_)){const[o,c,l]=t[a];r[s]=ye(i[a]??o,c,l)}return r[x.EYE]=[24,18,30],r[x.GLINT]=[255,255,245],r[x.NOSE]=[20,16,24],r[x.MAGIC]=ye(n.glowHue??.13,.5,1),r[x.MAGIC2]=ye(n.glowHue??.13,.15,1),r[x.BELLY]=[245,245,240],r}function B_({frame:n=0,lean:e=!1}={}){const t=new Mt({blend:.03}),i=[0,.025,.045][n%3],r=[0,.015,-.01][n%3]+(e?.08:0),a=.42+i,s=e?.1:0,o=[0,.03,.05][n%3];t.ell([.02,.005,0],[.2,.005,.12],x.NOSE,{group:0}),t.seg([-.5,a-r*2,0],[.62,a+r*3,0],.022,.018,x.BROOM,{group:2}),t.ell([-.62,a-r*2-.01,0],[.17,.07,.08],x.STRAW,{dir:[1,r,0],group:3,paint:f=>f[0]<-.72?x.MAGIC2:f[0]>-.5?x.BROOM:void 0});for(const f of[-1,1]){const u=[-.04,a+.06,f*.07],d=[.12+s*.5,a-.02,f*.14],g=[.08+s,a-.2,f*.13];t.seg(u,d,.055,.045,x.JEANS,{group:f>0?6:4}),t.seg(d,g,.045,.04,x.JEANS,{group:f>0?6:4}),t.ell(Q.add(g,[.05,-.02,0]),[.08,.04,.045],x.SHOES,{group:f>0?6:4,paint:_=>_[1]<g[1]-.04?x.BELLY:void 0})}t.ell([-.04,a+.08,0],[.11,.07,.1],x.JEANS,{group:1});const c=[0+s*.8,a+.26-s*.3,0];t.ell(c,[.1,.16,.11],x.JACKET,{dir:[s*2.5,1,0],up:[-1,0,0],group:1,paint:f=>f[0]>c[0]+.04&&Math.abs(f[2])<.055?x.TOP:void 0});for(const f of[-1,1]){const u=Q.add(c,[.01,.11,f*.11]),d=[.26+s,a+.03,f*.05];t.seg(u,Q.lerp(u,d,.5),.04,.035,x.JACKET,{group:f>0?7:5}),t.seg(Q.lerp(u,d,.5),d,.035,.03,x.JACKET,{group:f>0?7:5}),t.ell(d,[.035,.03,.035],x.SKIN,{group:f>0?7:5})}const l=Q.add(c,[.03+s*.5,.26,0]);t.ell(l,[.11,.115,.1],x.SKIN,{group:8,paint:f=>f[0]<l[0]-.01||f[1]>l[1]+.075?x.HAIR:void 0});for(const f of[-1,1])t.ell(Mt.surface(l,[.11,.115,.1],Q.norm([.85,.05,f*.45])),[.016,.026,.016],x.EYE,{group:8});t.chain([[...Q.add(l,[-.06,.02,0]),.06],[...Q.add(l,[-.18-s,-.05+o,.02]),.045],[...Q.add(l,[-.3-s*1.5,-.08+o*1.6,.03]),.02]],x.HAIR,{group:9});for(const f of[-1,1])t.ell(Q.add(l,[-.015,0,f*.105]),[.05,.055,.03],x.PHONES,{group:10});t.chain([[...Q.add(l,[-.005,.03,-.095]),.015],[...Q.add(l,[-.005,.11,-.05]),.015],[...Q.add(l,[-.005,.125,0]),.015],[...Q.add(l,[-.005,.11,.05]),.015],[...Q.add(l,[-.005,.03,.095]),.015]],x.PHONES,{group:10});const h=Q.add(l,[-.03,.1,0]);return t.ell(h,[.16,.014,.15],x.HAT,{dir:[1,.25,0],group:11}),t.chain([[...Q.add(h,[0,.01,0]),.085],[...Q.add(h,[-.05-s,.17,0]),.045],[...Q.add(h,[-.16-s*1.5,.27+o*.5,0]),.012]],x.HAT,{group:11,paint:f=>f[1]<h[1]+.045?x.MAGIC:void 0}),t}const z_=(n={})=>Math.round((n.size||8)*Math.sqrt(n.growth||20)*(2/(n.pixel||3))*1.9);function k_(n={},{frame:e=0,lean:t=!1,facing:i="towards"}={}){const r=z_(n),{sp:a}=ba(B_({frame:e,lean:t}),{height:r,facing:i});let s=0;for(let o=0;o<400&&s<6;o++){const c=o*37%a.w,l=o*53%Math.floor(a.h*.8);a.get(c,l)||a.get(c+1,l)||a.get(c-1,l)||a.get(c,l+1)||a.get(c,l-1)||(c*7+l*13+e*5)%11||(a.px(c,l,x.MAGIC2),s++)}return a}const G_=[{k:"ambientHue",g:"Night light",label:"Twilight hue",min:0,max:1,step:.01,v:.68,hue:!0},{k:"ambient",g:"Night light",label:"Twilight brightness",min:.05,max:.6,step:.01,v:.22},{k:"moon",g:"Night light",label:"Moonlight",min:0,max:1,step:.01,v:.3},{k:"moonHue",g:"Night light",label:"Moon hue",min:0,max:1,step:.01,v:.58,hue:!0},{k:"glowHue",g:"Night light",label:"Witch glow hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"glowSat",g:"Night light",label:"Witch glow colour",min:0,max:1,step:.01,v:.35},{k:"glowRadius",g:"Night light",label:"Witch glow reach",min:30,max:200,step:5,v:110},{k:"glowPower",g:"Night light",label:"Witch glow strength",min:.3,max:2.5,step:.05,v:1.4},{k:"bands",g:"Shading",label:"Light steps",min:2,max:7,step:1,v:3},{k:"dither",g:"Shading",label:"Dithering",min:0,max:1,step:.05,v:.35},{k:"round",g:"Shading",label:"Roundness",min:.2,max:1.5,step:.05,v:.9},{k:"outline",g:"Shading",label:"Plant outline",options:["none","dark","tinted"],v:"none"},{k:"cOutline",g:"Shading",label:"Creature outline",options:["dark","tinted","none"],v:"dark"},{k:"shafts",g:"Night light",label:"Moonbeams",min:0,max:1,step:.05,v:.3},{k:"areaContrast",g:"Colour",label:"Difference between areas",min:0,max:1,step:.05,v:.6},{k:"sat",g:"Colour",label:"Saturation",min:.2,max:1.3,step:.01,v:.9},{k:"leafHue",g:"Colour",label:"Leaf hue",min:0,max:1,step:.01,v:.3,hue:!0},{k:"leafVariety",g:"Colour",label:"Leaf colour variety",min:0,max:1,step:.05,v:.3},{k:"trunkHue",g:"Colour",label:"Bark hue",min:0,max:1,step:.01,v:.07,hue:!0},{k:"groundHue",g:"Colour",label:"Ground hue",min:0,max:1,step:.01,v:.27,hue:!0},{k:"groundVal",g:"Colour",label:"Ground brightness",min:.15,max:.7,step:.01,v:.4},{k:"pixel",g:"Shading",label:"Pixel size",min:1,max:5,step:1,v:3},{k:"treeSize",g:"Trees",label:"Tree height",min:.5,max:1.5,step:.05,v:.85},{k:"crownWidth",g:"Trees",label:"Crown width",min:1,max:4,step:.1,v:3},{k:"clearing",g:"Trees",label:"Clearing size",min:0,max:1,step:.05,v:.55},{k:"depth",g:"Map",label:"Border detail (fractal layers)",min:0,max:6,step:1,v:4},{k:"areaScale",g:"Map",label:"Area size (screens)",min:.6,max:2,step:.05,v:1},{k:"areaTypes",g:"Map",label:"Area types",min:4,max:30,step:1,v:30},{k:"density",g:"Trees",label:"Foliage density",min:.2,max:1,step:.05,v:.55},{k:"clump",g:"Trees",label:"Clumpiness",min:0,max:1,step:.05,v:.6},{k:"gnarl",g:"Trees",label:"Gnarliness",min:0,max:1,step:.05,v:.5},{k:"roots",g:"Trees",label:"Roots",min:0,max:1,step:.05,v:.6},{k:"bark",g:"Trees",label:"Bark texture",min:0,max:1,step:.05,v:.6},{k:"trees",g:"Trees",label:"Tree density",min:.2,max:2,step:.05,v:1},{k:"wBroad",g:"Tree mix",label:"Gnarled broadleaf",min:0,max:1,step:.05,v:.8},{k:"wFir",g:"Tree mix",label:"Fir",min:0,max:1,step:.05,v:.6},{k:"wWillow",g:"Tree mix",label:"Willow",min:0,max:1,step:.05,v:.5},{k:"wBirch",g:"Tree mix",label:"Birch",min:0,max:1,step:.05,v:.5},{k:"wPalm",g:"Tree mix",label:"Tree fern",min:0,max:1,step:.05,v:.3},{k:"wFlat",g:"Tree mix",label:"Flat-crowned",min:0,max:1,step:.05,v:.5},{k:"bushes",g:"Undergrowth",label:"Bushes and shrubs",min:0,max:120,step:1,v:55},{k:"bushSize",g:"Undergrowth",label:"Bush size",min:.5,max:1.8,step:.05,v:1},{k:"flowers",g:"Undergrowth",label:"Flowers",min:0,max:1,step:.05,v:.3},{k:"cSat",g:"Creatures",label:"Creature saturation",min:.1,max:1,step:.01,v:.6},{k:"cVal",g:"Creatures",label:"Creature brightness",min:.4,max:1,step:.01,v:.85},{k:"head",g:"Creatures",label:"Baby head size",min:.3,max:.6,step:.01,v:.44},{k:"eye",g:"Creatures",label:"Eye size",min:.5,max:2,step:.05,v:1},{k:"legs",g:"Creatures",label:"Leg length",min:.5,max:1.8,step:.05,v:1},{k:"long",g:"Creatures",label:"Body length",min:.7,max:1.5,step:.05,v:1},{k:"size",g:"Creatures",label:"Baby size (px)",min:5,max:14,step:1,v:8},{k:"growth",g:"Creatures",label:"Legend vs baby height",min:5,max:25,step:1,v:20},{k:"magicHue",g:"Creatures",label:"Magic glow hue",min:0,max:1,step:.01,v:.5,hue:!0},{k:"fur",g:"Creatures",label:"Stripes and spots",min:0,max:1,step:.05,v:.5},{k:"cloakHue",g:"Witch",label:"Jacket hue",min:0,max:1,step:.01,v:.72,hue:!0},{k:"hairHue",g:"Witch",label:"Hair hue",min:0,max:1,step:.01,v:.01,hue:!0},{k:"hatHue",g:"Witch",label:"Hat hue",min:0,max:1,step:.01,v:.74,hue:!0},{k:"topHue",g:"Witch",label:"Top hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"jeansHue",g:"Witch",label:"Jeans hue",min:0,max:1,step:.01,v:.6,hue:!0},{k:"shoeHue",g:"Witch",label:"Sneakers hue",min:0,max:1,step:.01,v:0,hue:!0},{k:"phonesHue",g:"Witch",label:"Headphones hue",min:0,max:1,step:.01,v:.92,hue:!0}];function H_(){const n={};return G_.forEach(e=>n[e.k]=e.v),n}const V_={broad:$l,fir:ho,willow:Jl,birch:Ql,flat:jl};function W_(n,e,t,i,r){const a=V_[e.type],s={...t,leafHue:n.leaf+(e.dark?.05:0),gnarl:e.gnarl??t.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},o=a(i,s,t.treeSize*r*(e.scale||1)*Se(i,.9,1.1)),c=fo(i,s,a);return e.dark&&(c[x.LEAF]=c[x.LEAF3],c[x.LEAF3]=ye(n.leaf+.05,.7,.22)),c[x.NOSE]=[20,16,24],c[x.GLINT]=[235,235,240],{parts:Hu(o),colours:c}}function X_(n,e,t,i,r){const a=An[t].id,s=po.find(d=>d.id===a),o=qu(a,n,{K:i,makeCanvas:r}),c=[],l=d=>c.push(d)-1,h={big:[],small:[],walls:[],set:null},f=(d,g)=>Ji(d,g,n,"none",r),u=(d,g)=>{const{parts:_,colours:m}=W_(s,d,n,br(e*13+t*101+g*7+1),i);return{bot:l(f(_.bot,m)),top:l(f(_.top,m))}};s.big.forEach(([d,g],_)=>{if(d!=="tree"){h.big.push({bot:l(o.big[_].sp),top:null});return}const m=Math.max(1,Math.round(ec/s.big.length));for(let p=0;p<m;p++)h.big.push(u(g,_*17+p))}),s.small.forEach(([d,g],_)=>h.small.push(d==="tree"?u(g,500+_):{bot:l(o.small[_].sp),top:null}));for(const d of o.walls)h.walls.push(l(d.sp));return o.setPiece&&(h.set=s.set?.[0]==="tree"?u(s.set[1],900):{bot:l(o.setPiece.sp),top:null}),{sprites:c,layout:h,floor:o.floor.sp}}function Y_(n,e,t){const i=[];for(let r=0;r<3;r++)for(let a=0;a<2;a++)i.push(Ji(Ou(e,r,a,n),Nu(e,n),n,n.cOutline,t));return i}const q_=(n,e)=>n*2+e;function Ma(n,e,t){return n.getContext("2d").getImageData(0,0,e,t).data}function ro(n,e=2048){const i=[];let r=0,a=0,s=0,o=1;for(const u of n)r+u.w+1>e&&(r=0,a+=s+1,s=0),i.push({x:r,y:a}),r+=u.w+1,s=Math.max(s,u.h),o=Math.max(o,r);const c=Math.max(1,a+s),l=new Uint8Array(o*c*4),h=new Uint8Array(o*c*4),f=n.map((u,d)=>{const g=i[d],_=Ma(u.A,u.w,u.h),m=Ma(u.N,u.w,u.h);for(let p=0;p<u.h;p++){const M=p*u.w*4,y=((g.y+p)*o+g.x)*4;l.set(_.subarray(M,M+u.w*4),y),h.set(m.subarray(M,M+u.w*4),y)}return{uv:[g.x/o,g.y/c,(g.x+u.w)/o,(g.y+u.h)/c],w:u.w,h:u.h}});return{albedo:l,normal:h,width:o,height:c,frames:f}}function K_(n,e){if(n.kind==="creature")return{px:ro(Y_(n.style,n.id,e),1024)};const{sprites:t,layout:i,floor:r}=X_(n.style,n.seed,n.id,n.K,e);return{px:ro(t),layout:i,floor:{albedo:new Uint8Array(Ma(r.A,r.w,r.h)),normal:new Uint8Array(Ma(r.N,r.w,r.h)),w:r.w,h:r.h}}}function Gl(n,e,t){const i=new Yi(n,e,t,on,en);return i.magFilter=It,i.minFilter=It,i.generateMipmaps=!1,i.flipY=!1,i.colorSpace=pn,i.needsUpdate=!0,i}function Vc(n){return{albedo:Gl(n.albedo,n.width,n.height),normal:Gl(n.normal,n.width,n.height),frames:n.frames}}const Hl=(n,e=2048)=>Vc(ro(n,e));class Z_{constructor(e,t,i){if(this.style=e,this.seed=t,this.K=2/i,this.witch=Hl([Ji(k_(),O_(e),e,"dark")]),this.stones=Hl([0,1,2,3].map(r=>this.stone(r))),this.useWorkers=typeof Worker<"u"&&typeof OffscreenCanvas<"u",this.useWorkers){const r=Math.max(1,Math.min(3,(navigator.hardwareConcurrency||2)-1));try{for(let a=0;a<r;a++){const s=new Worker(new URL(""+new URL("artWorker-BoiOCCyb.js",import.meta.url).href,import.meta.url),{type:"module"}),o={w:s,busy:!1};s.onmessage=c=>{o.busy=!1,o.job=void 0,this.receive(c.data),this.dispatch()},s.onerror=()=>{this.useWorkers=!1,o.job&&this.queue.unshift(o.job),o.busy=!1,o.job=void 0},this.workers.push(o)}}catch{this.useWorkers=!1}}}style;seed;types=new Map;creatures=new Map;queue=[];inFlight=new Set;workers=[];useWorkers;witch;stones;K;version=0;onFloor=()=>{};stone(e){const t=br(this.seed*3+e),i=5+Math.floor(t()*3),r=7+Math.floor(t()*5),a=new Jt(i+2,r+1);return a.ellipse((i+2)/2,r/2+1,i/2,r/2+.5,x.BODY,{round:this.style.round}),a.ellipse((i+2)/2-1,r/2,i/3,r/3,x.BODY2,{round:this.style.round,onlyOn:new Set([x.BODY]),density:.5,seed:e}),Ji(a,{[x.BODY]:[178,174,162],[x.BODY2]:[140,138,130]},this.style,"dark")}key=e=>e.kind+":"+e.id;ask(e){const t=this.key(e);this.inFlight.has(t)||(this.inFlight.add(t),this.queue.push(e),this.dispatch())}dispatch(){if(this.useWorkers)for(const e of this.workers)e.busy||!this.queue.length||(e.busy=!0,e.job=this.queue.shift(),e.w.postMessage(e.job))}receive(e){if(!e.result){console.warn("art worker failed, drawing on the page:",e.error),this.useWorkers=!1,this.queue.unshift(e.job);return}const t=Vc(e.result.px);e.job.kind==="type"?(this.types.set(e.job.id,{atlas:t,layout:e.result.layout}),e.result.floor&&this.onFloor(e.job.id,e.result.floor)):this.creatures.set(e.job.id,{atlas:t,frame:q_}),this.inFlight.delete(this.key(e.job)),this.version++}typeArt(e){const t=this.types.get(e);return t||this.ask({kind:"type",id:e,style:this.style,seed:this.seed,K:this.K}),t}creatureArt(e){const t=this.creatures.get(e);return t||this.ask({kind:"creature",id:e,style:this.style}),t}prefetchType(e){this.types.has(e)||this.typeArt(e)}get pending(){return this.inFlight.size}work(e){if(this.useWorkers)return;const t=performance.now();let i=0;for(;this.queue.length&&(i===0||performance.now()-t<e);){const r=this.queue.shift();this.receive({job:r,result:K_(r,(a,s)=>{const o=document.createElement("canvas");return o.width=a,o.height=s,o})}),i++}}whenIdle(){return new Promise(e=>{const t=()=>{this.work(50),this.pending?setTimeout(t,30):e()};t()})}}const Dt={uAmb:{value:new W},uMoon:{value:new W},uMoonDir:{value:new W(-.45,.75,.5).normalize()},uMoonBeam:{value:new W},uBands:{value:4},uDither:{value:.35},uShafts:{value:.3},uShaftScale:{value:1},uGlowPos:{value:new W},uGlowRgb:{value:new W},uGlowR:{value:8},uGlowPower:{value:1.4},uHazeCentre:{value:new We},uHazeRange:{value:new We(70,200)},uHazeColour:{value:new W},uTime:{value:0}};function $_(n,e,t){const i=(r,a)=>new W(r[0]/255*a,r[1]/255*a,r[2]/255*a);Dt.uAmb.value.copy(i(ye(n.ambientHue,.55,1),n.ambient)),Dt.uMoon.value.copy(i(ye(n.moonHue,.35,1),n.moon)),Dt.uMoonBeam.value.copy(i(ye(n.moonHue,.35,1),n.shafts*.25)),Dt.uBands.value=n.bands,Dt.uDither.value=n.dither*.5,Dt.uShafts.value=n.shafts,Dt.uShaftScale.value=t*2,Dt.uGlowRgb.value.copy(i(ye(n.glowHue,n.glowSat,1),1)),Dt.uGlowR.value=e,Dt.uGlowPower.value=n.glowPower,Dt.uHazeColour.value.copy(i(ye(n.ambientHue,.45,1),.16))}const Pa=`
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
`,pi=2,Ot=32,gi=8,J_=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`,Q_=`
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
${Pa}
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
    vec2 cell = vec2(mod(float(t), ${gi}.0), floor(float(t) / ${gi}.0));
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
`;class j_{constructor(e,t,i){this.map=e;const r=e.extent,a=r.maxX-r.minX,s=r.maxZ-r.minZ,o=Math.ceil(a*pi/Ot)*Ot,c=Math.ceil(s*pi/Ot)*Ot;this.tilesX=o/Ot,this.tilesZ=c/Ot,this.filled=new Uint8Array(this.tilesX*this.tilesZ);const l=d=>(d.magFilter=d.minFilter=It,d.generateMipmaps=!1,d.colorSpace=pn,d.needsUpdate=!0,d);this.texture=l(new Yi(new Uint8Array(o*c*4),o,c)),l(this.tile),this.floors=l(new Yi(new Uint8Array(64*gi*48*4*4),64*gi,192));const h=Array.from({length:32},(d,g)=>new W(...An[g]?.floor??[.25,.45,.4])),f=new Vt({vertexShader:J_,fragmentShader:Q_,uniforms:{...Dt,uAreas:{value:this.texture},uExtent:{value:new Et(r.minX,r.minZ,o/pi,c/pi)},uPixel:{value:i},uTypeFloor:{value:h},uFloorReady:{value:this.floorReady},uFloors:{value:this.floors},uTile:{value:new We(64,48)},uFloorsSize:{value:new We(64*gi,192)},uSat:{value:t.sat},uFloor:{value:new W(e.dancefloor.x,e.dancefloor.z,e.dancefloor.radius)},uCanopy:{value:new Et},uClearing:{value:new We(e.tuning.clearingSize,e.tuning.clearingFalloff)}}}),u=new Ln(a+400,s+400);u.rotateX(-Math.PI/2),this.mesh=new qt(u,f),this.mesh.position.set((r.minX+r.maxX)/2,0,(r.minZ+r.maxZ)/2)}map;mesh;texture;tile=new Yi(new Uint8Array(Ot*Ot*4),Ot,Ot);filled;tilesX;tilesZ;initialised=!1;floorReady=new Array(32).fill(0);floors;pendingFloors=[];setCanopyShadow(e,t,i,r){this.mesh.material.uniforms.uCanopy.value.set(e,t,i,r)}setFloor(e,t){this.pendingFloors.push([e,t])}placeFloors(e){for(const[t,i]of this.pendingFloors){const r=this.mesh.material,a=r.uniforms.uTile.value;if(i.w!==a.x||i.h!==a.y)continue;const s=new Yi(i.albedo,i.w,i.h);s.needsUpdate=!0,e.copyTextureToTexture(s,this.floors,null,new We(t%gi*i.w,Math.floor(t/gi)*i.h)),s.dispose(),this.floorReady[t]=1}this.pendingFloors=[]}fill(e,t,i,r,a){this.initialised||(e.initTexture(this.texture),e.initTexture(this.floors),this.initialised=!0),this.pendingFloors.length&&this.placeFloors(e);const s=this.map.extent,o=Ot/pi,c=(t-s.minX)/o,l=(i-s.minZ)/o,h=Math.ceil(r/o),f=[];for(let g=Math.max(0,Math.floor(l)-h);g<=Math.min(this.tilesZ-1,Math.floor(l)+h);g++)for(let _=Math.max(0,Math.floor(c)-h);_<=Math.min(this.tilesX-1,Math.floor(c)+h);_++)this.filled[g*this.tilesX+_]||f.push([_,g,(_+.5-c)**2+(g+.5-l)**2]);f.sort((g,_)=>g[2]-_[2]);const u=performance.now();let d=0;for(const[g,_]of f){if(d>0&&performance.now()-u>a)break;this.fillTile(e,g,_),d++}return f.length-d}fillTile(e,t,i){const r=this.map.extent,a=this.tile.image.data;for(let s=0;s<Ot;s++)for(let o=0;o<Ot;o++){const c=r.minX+(t*Ot+o+.5)/pi,l=r.minZ+(i*Ot+s+.5)/pi,h=this.map.areaAt(c,l),f=(s*Ot+o)*4;a[f]=h.type,a[f+1]=Math.round(h.openness*255),a[f+2]=0,a[f+3]=255}this.tile.needsUpdate=!0,e.copyTextureToTexture(this.tile,this.texture,null,new We(t*Ot,i*Ot)),this.filled[i*this.tilesX+t]=1}dispose(){this.texture.dispose(),this.tile.dispose(),this.mesh.geometry.dispose(),this.mesh.material.dispose()}}const ex="varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",tx=`
uniform sampler2D uScene; uniform float uThreshold; varying vec2 vUv;
void main() {
  vec3 c = texture2D(uScene, vUv).rgb;
  float l = max(c.r, max(c.g, c.b));
  gl_FragColor = vec4(c * smoothstep(uThreshold, uThreshold + 0.25, l), 1.0);
}`,nx=`
uniform sampler2D uSrc; uniform vec2 uStep; varying vec2 vUv;
void main() {
  vec3 c = texture2D(uSrc, vUv).rgb * 0.227;
  c += (texture2D(uSrc, vUv + uStep * 1.38).rgb + texture2D(uSrc, vUv - uStep * 1.38).rgb) * 0.316;
  c += (texture2D(uSrc, vUv + uStep * 3.23).rgb + texture2D(uSrc, vUv - uStep * 3.23).rgb) * 0.070;
  gl_FragColor = vec4(c, 1.0);
}`,ix=`
uniform sampler2D uScene, uBloom; uniform vec2 uLow; uniform float uBloomStrength; varying vec2 vUv;
void main() {
  vec2 p = (floor(vUv * uLow) + 0.5) / uLow;
  vec3 c = texture2D(uScene, p).rgb + texture2D(uBloom, vUv).rgb * uBloomStrength;
  gl_FragColor = vec4(min(c, vec3(1.0)), 1.0);
}`,rx=`
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
}`;function gr(n,e,t,i=!1){const r=new ln(Math.max(1,n),Math.max(1,e),{minFilter:t,magFilter:t,depthBuffer:i,generateMipmaps:!1});return r.texture.colorSpace=pn,r}class ax{constructor(e,t){this.renderer=e,this.tuning=t,this.scene=gr(1,1,Ct,!0);const i=(r,a)=>new Vt({vertexShader:ex,fragmentShader:r,uniforms:a,depthTest:!1,depthWrite:!1});this.mats={bright:i(tx,{uScene:{value:null},uThreshold:{value:.6}}),blur:i(nx,{uSrc:{value:null},uStep:{value:new We}}),composite:i(ix,{uScene:{value:null},uBloom:{value:null},uLow:{value:new We},uBloomStrength:{value:0}}),tilt:i(rx,{uSrc:{value:null},uTexel:{value:new We},uDir:{value:new We},uStrength:{value:0},uBand:{value:.4},uCentre:{value:.5}})},this.quad=new qt(new Ln(2,2),this.mats.composite),this.quad.frustumCulled=!1}renderer;tuning;scene;bright=gr(1,1,Ct);bloomB=gr(1,1,Ct);a=gr(1,1,Ct);b=gr(1,1,Ct);quad;cam=new Ro(-1,1,1,-1,0,1);mats;low=new We(1,1);out=new We(1,1);get fullResolution(){return this.tuning.tiltShift.on&&this.tuning.tiltShift.where==="after"}resize(e,t,i,r){this.low.set(e,t),this.out.set(i,r),this.scene.setSize(e,t);const a=Math.max(1,Math.round(e/2)),s=Math.max(1,Math.round(t/2));this.bright.setSize(a,s),this.bloomB.setSize(a,s);const o=this.fullResolution?i:e,c=this.fullResolution?r:t;this.a.setSize(o,c),this.b.setSize(o,c)}pass(e,t,i){const r=this.mats[e];i(r.uniforms),this.quad.material=r,this.renderer.setRenderTarget(t),this.renderer.render(this.quad,this.cam)}render(e,t){const i=this.renderer,r=this.tuning;i.setRenderTarget(this.scene),i.render(e,t);const a=r.bloom.on&&r.bloom.strength>0;if(a){const f=this.bright.width,u=this.bright.height;this.pass("bright",this.bright,d=>{d.uScene.value=this.scene.texture,d.uThreshold.value=r.bloom.threshold});for(let d=0;d<2;d++)this.pass("blur",this.bloomB,g=>{g.uSrc.value=this.bright.texture,g.uStep.value.set(1/f,0)}),this.pass("blur",this.bright,g=>{g.uSrc.value=this.bloomB.texture,g.uStep.value.set(0,1/u)})}const s=r.tiltShift.on&&r.tiltShift.strength>0;if(this.pass("composite",s?this.a:null,f=>{f.uScene.value=this.scene.texture,f.uBloom.value=this.bright.texture,f.uLow.value.copy(this.low),f.uBloomStrength.value=a?r.bloom.strength:0}),!s)return;const o=this.a.width,c=this.a.height,l=this.fullResolution?this.out.y/this.low.y:1,h=f=>{f.uTexel.value.set(1/o,1/c),f.uStrength.value=r.tiltShift.strength*l,f.uBand.value=r.tiltShift.band,f.uCentre.value=1-r.tiltShift.centre};this.pass("tilt",this.b,f=>{h(f),f.uSrc.value=this.a.texture,f.uDir.value.set(1,0)}),this.pass("tilt",null,f=>{h(f),f.uSrc.value=this.b.texture,f.uDir.value.set(0,1)})}}const sx=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,ox=`
uniform float uStrength, uWind, uPixel;
varying vec3 vWorld;
${Pa}
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
}`;class lx{constructor(e,t,i,r){this.height=t,this.mat=new Vt({vertexShader:sx,fragmentShader:ox,uniforms:{...Dt,uStrength:{value:e},uWind:{value:i},uPixel:{value:r}},depthWrite:!1}),this.mesh=new qt(new Ln(700,700).rotateX(-Math.PI/2),this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=2}height;mesh;mat;follow(e,t){this.mesh.position.set(e,this.height,t-150)}}const cx=`
attribute vec4 iShadow; // x, z, width, depth (metres)
varying vec2 vLocal;
varying vec3 vWorld;
void main() {
  vLocal = position.xz * 2.0;
  vec3 w = vec3(iShadow.x + position.x * iShadow.z, 0.03, iShadow.y + position.z * iShadow.w);
  vWorld = w;
  gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
}`,ux=`
uniform float uStrength;
varying vec2 vLocal;
varying vec3 vWorld;
${Pa}
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
}`;class hx{mesh;geo=new Ic;attr;capacity=0;constructor(e){const t=new Ln(1,1).rotateX(-Math.PI/2);this.geo.index=t.index,this.geo.setAttribute("position",t.getAttribute("position")),this.attr=this.grow(1024);const i=new Vt({vertexShader:cx,fragmentShader:ux,uniforms:{...Dt,uStrength:{value:e}},depthWrite:!1});this.mesh=new qt(this.geo,i),this.mesh.frustumCulled=!1,this.mesh.renderOrder=1}grow(e){return this.capacity=Math.max(e,this.capacity*2),this.attr=new Rc(new Float32Array(this.capacity*4),4),this.attr.setUsage(Mc),this.geo.setAttribute("iShadow",this.attr),this.attr}set(e){e.length>this.capacity&&this.grow(e.length);const t=this.attr.array;e.forEach((i,r)=>{t[r*4]=i.x,t[r*4+1]=i.z,t[r*4+2]=i.w,t[r*4+3]=i.d}),this.attr.needsUpdate=!0,this.geo.instanceCount=e.length,this.mesh.visible=e.length>0}}const Wi={uRight:{value:new W(1,0,0)},uUp:{value:new W(0,1,0)},uFacing:{value:new W(0,0,1)},uTopFade:{value:0}},fx=`
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
`,dx=`
uniform sampler2D uAlbedo, uNormal;
uniform vec3 uRight, uUp, uFacing;
uniform float uTopFade, uUnlit;
varying vec2 vUv;
varying vec3 vWorld;
varying vec2 vFlags;
${Pa}
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
`;class ra{constructor(e,t,i={}){this.atlas=e,this.metresPerPixel=t;const r=new Ln(1,1);r.translate(0,.5,0),this.geo=new Ic,this.geo.index=r.index,this.geo.setAttribute("position",r.getAttribute("position")),this.geo.setAttribute("uv",r.getAttribute("uv")),this.pos=this.size=this.uvs=this.flags=void 0,this.grow(64);const a=new Vt({vertexShader:fx,fragmentShader:dx,uniforms:{...Dt,...Wi,uAlbedo:{value:e.albedo},uNormal:{value:e.normal},uUnlit:{value:i.unlit?1:0}},depthTest:!i.onTop,depthWrite:!i.onTop});this.mesh=new qt(this.geo,a),this.mesh.frustumCulled=!1,i.onTop&&(this.mesh.renderOrder=10)}atlas;metresPerPixel;mesh;geo;pos;size;uvs;flags;capacity=0;count=0;grow(e){const t=Math.max(e,this.capacity*2),i=(r,a)=>{const s=new Rc(new Float32Array(t*r),r);return s.setUsage(Mc),a&&s.array.set(a.array),s};this.pos=i(3,this.pos),this.size=i(2,this.size),this.uvs=i(4,this.uvs),this.flags=i(2,this.flags),this.geo.setAttribute("iPos",this.pos),this.geo.setAttribute("iSize",this.size),this.geo.setAttribute("iUv",this.uvs),this.geo.setAttribute("iFlags",this.flags),this.capacity=t}set(e){e.length>this.capacity&&this.grow(e.length);const t=this.pos.array,i=this.size.array,r=this.uvs.array,a=this.flags.array;e.forEach((s,o)=>{t[o*3]=s.x,t[o*3+1]=s.y,t[o*3+2]=s.z,i[o*2]=s.frame.w*this.metresPerPixel,i[o*2+1]=s.frame.h*this.metresPerPixel,r.set(s.frame.uv,o*4),a[o*2]=s.flip?1:0,a[o*2+1]=s.top?1:0});for(const s of[this.pos,this.size,this.uvs,this.flags])s.needsUpdate=!0;this.count=e.length,this.geo.instanceCount=e.length,this.mesh.visible=e.length>0}dispose(){this.geo.dispose(),this.mesh.material.dispose(),this.atlas.albedo.dispose(),this.atlas.normal.dispose()}}class px{constructor(e,t,i){this.canvas=e,this.game=t,this.style=i;const r=t.tuning;this.renderer=new N_({canvas:e,antialias:!1,powerPreference:"high-performance",preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.info.autoReset=!1,this.renderer.outputColorSpace=Tr,this.mpp=1/(r.artPixelsPerMetre*(2/r.pixelSize)),this.camera=new sn(r.camera.fov,1,1,900),this.post=new ax(this.renderer,r),this.scene.background=new it(723478),$_(i,r.glowReach,this.mpp),this.assets=new Z_(i,t.seed,r.pixelSize),this.ground=new j_(t.map,i,this.mpp),this.assets.onFloor=(l,h)=>this.ground.setFloor(l,h);const a=r.canopyShadow;this.ground.setCanopyShadow(a.on?a.strength:0,a.height,a.cover,a.wind),this.shadows=new hx(r.shadows.strength),this.shadows.mesh.visible=r.shadows.on,this.scene.add(this.shadows.mesh),r.mist.on&&r.mist.strength>0&&(this.mist=new lx(r.mist.strength,r.mist.height,r.mist.wind,this.mpp),this.scene.add(this.mist.mesh)),Dt.uHazeRange.value.set(r.haze.near,r.haze.far),this.scene.add(this.ground.mesh),this.witchBatch=new ra(this.assets.witch,this.mpp,{unlit:!0,onTop:!0}),this.scene.add(this.witchBatch.mesh),this.stoneBatch=new ra(this.assets.stones,this.mpp),this.scene.add(this.stoneBatch.mesh);const s=t.map.dancefloor,o=[];for(let l=0;l<9;l++){const h=l/9*Math.PI*2+.3;o.push({x:s.x+Math.cos(h)*s.radius,y:0,z:s.z+Math.sin(h)*s.radius,frame:this.assets.stones.frames[l%4],flip:l%2===0})}this.stoneBatch.set(o);const c=new Vt({transparent:!1,depthWrite:!1,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"varying vec2 vUv; void main(){ vec2 p = vUv * 2.0 - 1.0; if (dot(p, p) > 1.0 || mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0) > 0.5) discard; gl_FragColor = vec4(0.02, 0.02, 0.05, 1.0); }"});this.shadow=new qt(new Ln(1.4,.7).rotateX(-Math.PI/2),c),this.shadow.renderOrder=1,this.scene.add(this.shadow)}canvas;game;style;renderer;scene=new xd;camera;ground;assets;typeBatches=new Map;creatureBatches=new Map;witchBatch;stoneBatch;shadow;mpp;lastBuild={x:1/0,y:1/0,z:1/0,version:-1};post;shadows;shadowList=[];mist=null;width=1;height=1;stats={trees:0,bushes:0,creatures:0,batches:0,drawCalls:0,pendingArt:0,pendingGround:0};resize(e,t){const i=this.game.tuning.pixelSize;this.width=Math.max(1,Math.ceil(e/i)),this.height=Math.max(1,Math.ceil(t/i));const r=this.post.fullResolution?i:1;this.renderer.setSize(this.width*r,this.height*r,!1),this.post.resize(this.width,this.height,this.width*r,this.height*r),this.canvas.style.width=this.width*i+"px",this.canvas.style.height=this.height*i+"px",this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix()}async prepare(){this.render(0,!1),this.drawCreatures(),this.ground.fill(this.renderer,this.game.witch.x,this.game.witch.z,50,1/0),await this.assets.whenIdle(),this.updateFrustum(),this.refresh(!0);for(let e=0;e<An.length;e++)this.assets.prefetchType(e);for(const e of An)this.assets.creatureArt(e.creature)}batchFor(e,t,i){let r=e.get(t);return r||(r=i(),r&&(e.set(t,r),this.scene.add(r.mesh))),r}frustum=new Ao;box=new rr;m4=new wt;v3=new W;drawn=new Set;pops=[];updateFrustum(){this.camera.updateMatrixWorld(),this.m4.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse),this.frustum.setFromProjectionMatrix(this.m4)}viewRect(e,t){const i=this.camera,r=i.position,a=this.game.witch,s=[];for(const l of[-1,1])for(const h of[-1,1]){const f=this.v3.set(l,h,1).unproject(i).sub(r).normalize();for(const u of[0,25]){let d=f.y<-.001?(u-r.y)/f.y:1/0;d>0||(d=1/0),d=Math.min(d,e+r.distanceTo(new W(a.x,r.y,a.z))+t),s.push([r.x+f.x*d,r.z+f.z*d])}}s.push([r.x,r.z]);const o=s.map(l=>l[0]),c=s.map(l=>l[1]);return{minX:Math.min(...o)-t,maxX:Math.max(...o)+t,minZ:Math.min(...c)-t,maxZ:Math.max(...c)+t}}inView(e,t,i,r,a){const s=this.game.witch.x,o=this.game.witch.z,c=this.game.tuning.haze.far+a;return(e-s)**2+(t-o)**2>c*c?!1:(this.box.min.set(e-i/2-a,-a,t-r-a),this.box.max.set(e+i/2+a,r+a,t+a),this.frustum.intersectsBox(this.box))}inInnerView(e,t,i){const r=this.game.witch;if(Math.hypot(e-r.x,t-r.z)>this.game.tuning.haze.near)return!1;for(const a of[0,i]){const s=this.v3.set(e,a,t).project(this.camera);if(Math.abs(s.x)<.85&&Math.abs(s.y)<.85&&s.z<1)return!0}return!1}refresh(e=!1){const t=this.game,i=t.tuning,r=this.camera,a=i.viewMargin,s={x:r.position.x,y:r.position.y,z:r.position.z};if(!e&&Math.hypot(s.x-this.lastBuild.x,s.y-this.lastBuild.y,s.z-this.lastBuild.z)<a/3&&this.assets.version===this.lastBuild.version)return;this.lastBuild={...s,version:this.assets.version};const o=this.viewRect(i.haze.far,a),c=(o.minX+o.maxX)/2,l=(o.minZ+o.maxZ)/2,h=Math.max(o.maxX-o.minX,o.maxZ-o.minZ)/2,f=[],u=Dt.uMoonDir.value,d=-u.x/Math.max(.2,u.y),g=-u.z/Math.max(.2,u.y),_=new Map,m=new Set,p=(w,C)=>{let S=_.get(w);S||_.set(w,S=[]),S.push(C)},M=this.mpp;let y=0,b=0;for(const w of t.forest.treesNear(c,l,h)){const C=this.assets.typeArt(w.type);if(!C||!C.layout.big.length)continue;const S=C.atlas.frames,R=C.layout.big[w.variant%C.layout.big.length],D=S[R.top??R.bot];if(!this.inView(w.x,w.z,D.w*M,D.h*M,a))continue;p(w.type,{x:w.x,y:0,z:w.z,frame:S[R.bot],flip:w.flip}),R.top!==null&&p(w.type,{x:w.x,y:0,z:w.z,frame:S[R.top],flip:w.flip,top:!0});const N=D.w*M,H=D.h*M*(R.top===null?.2:.6);f.push({x:w.x+d*H,z:w.z+g*H,w:N*.8,d:N*.45}),m.add(`${w.x.toFixed(2)},${w.z.toFixed(2)},${D.h*M}`),y++}const A=(w,C)=>{for(const S of w){const R=this.assets.typeArt(S.type);if(!R)continue;const D=C(R.layout);if(!D.length)continue;const N=D[S.variant%D.length],H=R.atlas.frames,k=H[N.bot],P=H[N.top??N.bot];this.inView(S.x,S.z,P.w*M,P.h*M,a)&&(p(S.type,{x:S.x,y:0,z:S.z,frame:k,flip:S.flip}),N.top!==null&&p(S.type,{x:S.x,y:0,z:S.z,frame:H[N.top],flip:S.flip,top:!0}),f.push({x:S.x,z:S.z,w:k.w*M*.8,d:k.w*M*.3}),b++)}};A(t.forest.bushesNear(c,l,h),w=>w.small),A(t.forest.wallsNear(c,l,h),w=>w.walls.map(C=>({bot:C,top:null}))),A(t.forest.setPiecesNear(c,l,h),w=>w.set===null?[]:[w.set]);for(const[w,C]of this.typeBatches)_.has(w)||C.set([]);for(const[w,C]of _)this.batchFor(this.typeBatches,w,()=>{const R=this.assets.typeArt(w);return R&&new ra(R.atlas,M)})?.set(C);if(!e&&this.assets.pending===0){const w=(C,S)=>{const[R,D,N]=C.split(",").map(Number);this.inInnerView(R,D,N)&&this.pops.push(`${S} ${R.toFixed(0)},${D.toFixed(0)}`)};for(const C of m)this.drawn.has(C)||w(C,"appeared");for(const C of this.drawn)m.has(C)||w(C,"vanished")}this.drawn=m,this.stats.trees=y,this.stats.bushes=b,this.shadowList=f}drawCreatures(){const e=this.game,t=e.camera,i=e.tuning.haze.far,r=new Map,a=[];let s=0;for(const o of e.creatures){if(Math.abs(o.x-t.tx)>i||Math.abs(o.z-t.tz)>i)continue;const c=this.assets.creatureArt(o.species);if(!c)continue;const l=c.atlas.frames[c.frame(o.level,o.moving?Math.floor(o.walk)%2:0)];if(!this.inView(o.x,o.z,l.w*this.mpp,l.h*this.mpp,4))continue;let h=r.get(o.species);h||r.set(o.species,h=[]),h.push({x:o.x,y:0,z:o.z,frame:l,flip:o.facing<0}),a.push({x:o.x,z:o.z,w:l.w*this.mpp*.7,d:l.w*this.mpp*.25}),s++}for(const[o,c]of this.creatureBatches)r.has(o)||c.set([]);for(const[o,c]of r)this.batchFor(this.creatureBatches,o,()=>{const h=this.assets.creatureArt(o);return h&&new ra(h.atlas,this.mpp)})?.set(c);this.stats.creatures=s,this.game.tuning.shadows.on&&this.shadows.set(this.shadowList.concat(a))}render(e,t=!0){const i=this.game,r=i.tuning,a=ph(i),s=a.angle*Math.PI/180,o=2*a.distance*Math.tan(r.camera.fov*Math.PI/360)/this.height,c=new W(0,Math.cos(s),-Math.sin(s)),l=new W(a.tx,a.ty,a.tz),h=l.dot(c),f=l.x;l.addScaledVector(c,Math.round(h/o)*o-h),l.x+=Math.round(f/o)*o-f;const u=new W(0,Math.sin(s),Math.cos(s)).multiplyScalar(a.distance);this.camera.position.copy(l).add(u),this.camera.up.set(0,1,0),this.camera.lookAt(l);const d=r.spriteTilt;Wi.uUp.value.set(0,1,0).lerp(c,d).normalize(),Wi.uFacing.value.crossVectors(Wi.uRight.value,Wi.uUp.value).normalize(),Wi.uTopFade.value=Fa(i.witch);const g=i.witch,_=mo(g,r);Dt.uGlowPos.value.set(g.x,_+r.glowHeight,g.z),Dt.uHazeCentre.value.set(g.x,g.z),Dt.uTime.value=e,this.mist?.follow(a.tx,a.tz);const m=Math.sin(e*2.4)*.12;this.witchBatch.set([{x:g.x,y:_+m-.4,z:g.z,frame:this.assets.witch.frames[0],flip:g.facing<0}]),this.shadow.position.set(g.x,.03,g.z),this.shadow.scale.setScalar(1-.5*Fa(g)),this.updateFrustum(),this.refresh(),this.drawCreatures(),this.assets.work(6);const p=Mn(r.haze.near,r.haze.far,Fa(g))*.8;this.stats.pendingGround=this.ground.fill(this.renderer,a.tx,a.tz-p*.5,p,3),this.stats.pendingArt=this.assets.pending,t&&(this.renderer.info.reset(),this.post.render(this.scene,this.camera),this.stats.drawCalls=this.renderer.info.render.calls,this.stats.batches=this.typeBatches.size+this.creatureBatches.size)}}const mx="The art style: knobs from the Witch Art Lab. Paste a style saved in the Lab here (its whole saved JSON, or just its style object). Any knob left out follows the Lab's current default, so an empty style means the Lab's default look, and stays up to date as the art changes.",gx="Lab default",_x={},xx={_readme:mx,name:gx,style:_x};function vx(n=xx){const e=n??{},t=e.style&&typeof e.style=="object"?e.style:e,i=H_();for(const[r,a]of Object.entries(t))r in i&&(i[r]=a);return i}function Mx(n,e){const t=n.querySelector("#stick"),i=t.querySelector(".knob"),r=56;let a=null,s=0,o=0;const c=()=>n.classList.add("touch"),l=n.querySelector("#stick-zone");l.addEventListener("pointerdown",u=>{if(!(u.pointerType==="mouse"||a!==null)){c(),a=u.pointerId,s=u.clientX,o=u.clientY,t.style.left=s+"px",t.style.top=o+"px",t.classList.add("on");try{l.setPointerCapture(u.pointerId)}catch{}u.preventDefault()}}),l.addEventListener("pointermove",u=>{if(u.pointerId!==a)return;let d=u.clientX-s,g=u.clientY-o;const _=Math.hypot(d,g);_>r&&(d*=r/_,g*=r/_),i.style.transform=`translate(${d}px, ${g}px)`;const m=Math.min(1,_/r),p=.15,M=m<p?0:(m-p)/(1-p)/Math.max(1e-6,m);e.x=d/r*M,e.y=g/r*M});const h=u=>{u.pointerId===a&&(a=null,e.x=0,e.y=0,i.style.transform="",t.classList.remove("on"))};l.addEventListener("pointerup",h),l.addEventListener("pointercancel",h);const f=(u,d)=>{const g=n.querySelector(u);g.addEventListener("pointerdown",_=>{_.preventDefault(),_.stopPropagation(),d(),g.classList.add("down")}),g.addEventListener("pointerup",()=>g.classList.remove("down")),g.addEventListener("pointerleave",()=>g.classList.remove("down"))};f("#rise",()=>e.toggle=!0),f("#zoom-in",()=>e.zoom-=1),f("#zoom-out",()=>e.zoom+=1),window.addEventListener("touchstart",u=>{c(),u.touches.length===3&&(e.debug=!0)},{passive:!0})}const qn=new URLSearchParams(location.search);let vi=$u(qn.get("seed"));vi===null&&(vi=Math.floor(Math.random()*1e6),qn.set("seed",String(vi)),history.replaceState(null,"","?"+qn.toString()+location.hash));const Xn={...Ci,bloom:{...Ci.bloom},tiltShift:{...Ci.tiltShift},shadows:{...Ci.shadows},canopyShadow:{...Ci.canopyShadow},mist:{...Ci.mist}};qn.get("shadows")==="off"&&(Xn.shadows.on=!1);qn.get("canopy")==="off"&&(Xn.canopyShadow.on=!1);qn.get("mist")==="off"&&(Xn.mist.on=!1);const aa=qn.get("tilt");aa==="off"?Xn.tiltShift.on=!1:(aa==="before"||aa==="after")&&(Xn.tiltShift.on=!0,Xn.tiltShift.where=aa);qn.get("bloom")==="off"&&(Xn.bloom.on=!1);const kn=fh(vi,Xn),Sx=document.getElementById("game"),Rr=new px(Sx,kn,{...vx(),pixel:Xn.pixelSize}),La=new vf;Mx(document.body,La.touch);document.getElementById("version").textContent="v43 · 88db1b2";const bx=document.getElementById("seed");bx.innerHTML=`seed <a href="?seed=${vi}">${vi}</a>`;const ao=document.getElementById("debug"),Co=document.getElementById("start");let vr=qn.has("debug");ao.classList.toggle("on",vr);const Wc=()=>Rr.resize(window.innerWidth,window.innerHeight);window.addEventListener("resize",Wc);Wc();let Da=!1;requestAnimationFrame(()=>setTimeout(async()=>{await Rr.prepare(),Da=!0,Co.classList.remove("loading")},0));let Vl=null;function Xc(){if(!Da||!kn.clock.paused)return!1;try{Vl??=new AudioContext,Vl.resume()}catch{}return kn.clock.paused=!1,Co.style.display="none",La.clearPresses(),!0}La.onAny=Xc;Co.addEventListener("pointerdown",n=>{n.preventDefault(),Xc()});document.addEventListener("visibilitychange",()=>{document.hidden&&(pa=0)});let pa=0,Wl=60,ms=0,sa=0;function Yc(n){requestAnimationFrame(Yc);const e=pa?(n-pa)/1e3:0;pa=n,ms++,sa+=e,sa>=.5&&(Wl=ms/sa,ms=0,sa=0);const t=La.read();if(t.debug&&(vr=!vr,ao.classList.toggle("on",vr)),dh(kn,t,e),!!Da&&(Rr.render(n/1e3),vr)){const i=kn.witch,r=Rr.stats;ao.textContent=[`fps    ${Wl.toFixed(0)}`,`seed   ${vi}`,`area   ${tc(kn)}`,`mode   ${i.mode}`,`at     ${i.x.toFixed(0)}, ${i.z.toFixed(0)} m   zoom ${kn.camera.zoomStep}`,`trees  ${r.trees}  bushes ${r.bushes}  creatures ${r.creatures}`,`draws  ${r.drawCalls}  art queued ${r.pendingArt}  ground tiles ${r.pendingGround}`].join(`
`)}}requestAnimationFrame(Yc);window.witch={game:kn,view:Rr,areaUnderWitch:()=>tc(kn),get ready(){return Da}};
