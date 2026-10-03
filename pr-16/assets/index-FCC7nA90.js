(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function t(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(r){if(r.ep)return;r.ep=!0;const a=t(r);fetch(r.href,a)}})();function Br(n){let e=n>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function wt(n,e,t){let i=Math.imul(n|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return i=Math.imul(i^i>>>13,1274126177),((i^i>>>16)>>>0)/4294967296}function cl(n,e,t){const i=Math.floor(n),r=Math.floor(e),a=n-i,s=e-r,o=a*a*(3-2*a),c=s*s*(3-2*s),l=wt(i,r,t),u=wt(i+1,r,t),d=wt(i,r+1,t),h=wt(i+1,r+1,t);return l+(u-l)*o+(d-l)*c+(l-u-d+h)*o*c}const Nn=(n,e,t)=>n+(e-n)*t,Ni=(n,e,t)=>Math.min(t,Math.max(e,n)),xr=n=>{const e=Ni(n,0,1);return e*e*(3-2*e)};function Nu(n,e,t,i){const r=Math.max(1,n.camera.zoomSteps),a=Ni(Math.round(n.camera.startZoom),0,r-1),s=r>1?a/(r-1):0;return{zoomStep:a,zoom:s,tx:e,ty:t,tz:i,vx:0,vy:0,vz:0,ax:0,az:0,lift:0}}function ts(n,e,t,i,r){const a=i*r,s=Math.exp(-a),o=n-t,c=e+i*o;return[t+(o+c*r)*s,(e-i*c*r)*s]}function Uu(n,e,t,i,r,a,s){const o=s.camera,c=Math.max(1,o.zoomSteps),l=Ni(n.zoomStep+Math.sign(e),0,c-1),u=c>1?l/(c-1):0;let d=i.x*o.lookAhead,h=i.z*o.lookAhead;const p=Math.hypot(d,h);p>o.lookAheadMax&&(d*=o.lookAheadMax/p,h*=o.lookAheadMax/p);const _=1-Math.exp(-o.lookAheadEase*a),x=n.ax+(d-n.ax)*_,g=n.az+(h-n.az)*_,[m,M]=ts(n.tx,n.vx,t.x+x,o.follow,a),[E,b]=ts(n.ty,n.vy,t.y,o.follow,a),[R,w]=ts(n.tz,n.vz,t.z+g,o.follow,a),P=n.zoom+(u-n.zoom)*(1-Math.exp(-o.zoomEase*a)),S=n.lift+(r-n.lift)*(1-Math.exp(-o.liftEase*a));return{zoomStep:l,zoom:P,tx:m,ty:E,tz:R,vx:M,vy:b,vz:w,ax:x,az:g,lift:Ni(S,0,1)}}function Fu(n,e,t){const i=t.camera.ground,r=t.camera.treetop,a=xr(e),s=Nn(Nn(i.angleIn,i.angleOut,n.zoom),Nn(r.angleIn,r.angleOut,n.zoom),a),o=Nn(Nn(i.distanceIn,i.distanceOut,n.zoom),Nn(r.distanceIn,r.distanceOut,n.zoom),a),c=s*Math.PI/180;return{angle:s,distance:o,x:n.tx,y:n.ty+Math.sin(c)*o,z:n.tz+Math.cos(c)*o,tx:n.tx,ty:n.ty,tz:n.tz}}const Ou=.1,Bu=()=>({time:0,paused:!0});function zu(n,e){if(n.paused||!(e>0))return 0;const t=Math.min(Ou,e);return n.time+=t,t}const ku={moor:{treeDensity:.4},"fern-forest":{treeDensity:1},"muddy-forest":{treeDensity:1},"stone-shrine":{treeDensity:.3},"tangly-forest":{treeDensity:1},"wispy-forest":{treeDensity:1},"hazel-forest":{treeDensity:1},garden:{treeDensity:.6},"twiggy-forest":{treeDensity:1},ancient:{treeDensity:.9},norway:{treeDensity:1},"alder-forest":{treeDensity:.9},meadow:{treeDensity:.2},"old-oaks":{treeDensity:.9},"berry-thicket":{treeDensity:1},wetland:{treeDensity:.6},stream:{treeDensity:.7},"rocky-slope":{treeDensity:.6},bog:{treeDensity:.5},deadwood:{treeDensity:.8},"cave-mouth":{treeDensity:.6},grassland:{treeDensity:.2},"beaver-pond":{treeDensity:.8},"log-pile":{treeDensity:.7},heath:{treeDensity:.4},"old-pinewood":{treeDensity:1},ravine:{treeDensity:.6},"bluebell-glade":{treeDensity:.8},"holly-thicket":{treeDensity:1},"honeysuckle-tangle":{treeDensity:1}},Gu={types:ku};function _c(n,e){if(typeof document<"u"){const t=document.createElement("canvas");return t.width=n,t.height=e,t}return new OffscreenCanvas(n,e)}function Lo(n){let e=n>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}const be=(n,e,t)=>e+(t-e)*n(),xc=(n,e)=>e[Math.floor(n()*e.length)];function an(n,e,t){let i=Math.imul(n|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return i=Math.imul(i^i>>>13,1274126177),((i^i>>>16)>>>0)/4294967296}function xi(n,e,t){const i=Math.floor(n),r=Math.floor(e),a=n-i,s=e-r,o=a*a*(3-2*a),c=s*s*(3-2*s),l=an(i,r,t),u=an(i+1,r,t),d=an(i,r+1,t),h=an(i+1,r+1,t);return l+(u-l)*o+(d-l)*c+(l-u-d+h)*o*c}function ve(n,e,t){n=(n%1+1)%1,e=Math.max(0,Math.min(1,e)),t=Math.max(0,Math.min(1,t));const i=Math.floor(n*6),r=n*6-i,a=t*(1-e),s=t*(1-r*e),o=t*(1-(1-r)*e),[c,l,u]=[[t,o,a],[s,t,a],[a,t,o],[a,s,t],[o,a,t],[t,a,s]][i%6];return[Math.round(c*255),Math.round(l*255),Math.round(u*255)]}const f={BODY:1,BELLY:2,ACCENT:3,EYE:4,GLINT:5,TRUNK:6,LEAF:7,LEAF2:8,CLOTH:9,SKIN:10,HAIR:11,BROOM:12,STRAW:13,BODY2:14,BARK2:15,FLOWER:16,PUPIL:17,MAGIC:18,BARKD:19,LINE:20,IRIS:21,MAGIC2:22,NOSE:23,EAR:24,BODY3:25,LEAF3:26,BARKL:27,HAT:28,PHONES:29,TOP:30,JACKET:31,JEANS:32,SHOES:33,WATER:34,STONE:35,STONED:36,MOSS:37,RUNE:39,GLOW:40,WOOD:41,COLLAR:42,HAT1:43,HAT2:44,POM:45,SHADES:46,FRAME:47,SHOE:48,SOLE:49,WOKEN:50,WEB:51},Hu=new Set([f.GLINT,f.MAGIC,f.MAGIC2,f.RUNE,f.GLOW,f.COLLAR,f.WOKEN]);function ul(n,e=!0,t=8){const i=n.length,r=[];if(i<3)return n.slice();const a=o=>e?n[(o+i)%i]:n[Math.max(0,Math.min(i-1,o))],s=e?i:i-1;for(let o=0;o<s;o++){const c=a(o-1),l=a(o),u=a(o+1),d=a(o+2),h=Math.max(2,Math.ceil(Math.hypot(u[0]-l[0],u[1]-l[1])/1.5),t);for(let p=0;p<h;p++){const _=p/h,x=_*_,g=x*_;r.push([0,1].map(m=>.5*(2*l[m]+(-c[m]+u[m])*_+(2*c[m]-5*l[m]+4*u[m]-d[m])*x+(-c[m]+3*l[m]-3*u[m]+d[m])*g)))}}return e||r.push(n[i-1]),r}function Vu(n,{cap:e=1,capEnd:t=e}={}){const i=[],r=[],a=n.length;for(let c=0;c<a;c++){const l=n[Math.max(0,c-1)],u=n[Math.min(a-1,c+1)];let d=u[0]-l[0],h=u[1]-l[1];const p=Math.hypot(d,h)||1;d/=p,h/=p;const _=n[c][2]/2;i.push([n[c][0]-h*_,n[c][1]+d*_]),r.push([n[c][0]+h*_,n[c][1]-d*_])}const s=(c,l,u,d)=>{let h=c[0]-l[0],p=c[1]-l[1];const _=Math.hypot(h,p)||1;return[c[0]+h/_*u/2*d,c[1]+p/_*u/2*d]};return[...i,s(n[a-1],n[a-2],n[a-1][2],t),...r.reverse(),s(n[0],n[1],n[0][2],e)]}const Et=(n,e)=>[n[0]+e[0],n[1]+e[1]],ni=(n,e,t)=>[n[0]+(e[0]-n[0])*t,n[1]+(e[1]-n[1])*t];function Ha(n,e,t,i,r,a=1){const s=[];for(let o=0;o<n.length;o++){if(s.push(n[o]),o<e||o>=t)continue;const c=n[o],l=n[(o+1)%n.length];let u=l[0]-c[0],d=l[1]-c[1];const h=Math.hypot(u,d)||1,p=d/h*a,_=-u/h*a;for(let x=1;x<=i;x++){const g=(x-.5)/i,m=ni(c,l,g),M=[m[0]+p*r-u/h*r*.5,m[1]+_*r-d/h*r*.5];s.push(ni(c,l,g-.45/i),M,ni(c,l,g+.35/i))}}return s}function hl(n,e,t){const i=new Uint8Array(n*e);let r=1/0,a=-1/0;for(const s of t)r=Math.min(r,s[1]),a=Math.max(a,s[1]);for(let s=Math.max(0,Math.floor(r));s<=Math.min(e-1,Math.ceil(a));s++){const o=s+.5,c=[];for(let l=0,u=t.length-1;l<t.length;u=l++){const[d,h]=t[l],[p,_]=t[u];h>o!=_>o&&c.push(d+(o-h)/(_-h)*(p-d))}c.sort((l,u)=>l-u);for(let l=0;l+1<c.length;l+=2)for(let u=Math.max(0,Math.ceil(c[l]-.5));u<=Math.min(n-1,Math.floor(c[l+1]-.5));u++)i[s*n+u]=1}return i}function Wu(n,e,t){const r=new Float32Array(n*e),a=new Float32Array(n*e);for(let c=0;c<n*e;c++)t[c]&&(r[c]=1e4,a[c]=1e4);const s=c=>r[c]*r[c]+a[c]*a[c],o=(c,l,u,d,h)=>{const p=l+d,_=u+h;let x,g;if(p<0||_<0||p>=n||_>=e)x=d,g=h;else{const m=_*n+p;x=r[m]+d,g=a[m]+h}x*x+g*g<s(c)&&(r[c]=x,a[c]=g)};for(let c=0;c<e;c++){for(let l=0;l<n;l++){const u=c*n+l;t[u]&&(o(u,l,c,-1,0),o(u,l,c,0,-1),o(u,l,c,-1,-1),o(u,l,c,1,-1))}for(let l=n-1;l>=0;l--){const u=c*n+l;t[u]&&o(u,l,c,1,0)}}for(let c=e-1;c>=0;c--){for(let l=n-1;l>=0;l--){const u=c*n+l;t[u]&&(o(u,l,c,1,0),o(u,l,c,0,1),o(u,l,c,1,1),o(u,l,c,-1,1))}for(let l=0;l<n;l++){const u=c*n+l;t[u]&&o(u,l,c,-1,0)}}return{vx:r,vy:a}}class on{constructor(e,t,i=1){this.sx=i,this.w=Math.round(e*i),this.h=t|0,this.m=new Uint8Array(this.w*this.h),this.n=new Float32Array(this.w*this.h*3),this.g=new Uint8Array(this.w*this.h)}inb(e,t){return e>=0&&t>=0&&e<this.w&&t<this.h}get(e,t){return e|=0,t|=0,this.inb(e,t)?this.m[t*this.w+e]:0}put(e,t,i,r=0,a=0,s=1){this.px(e*this.sx,t,i,r,a,s)}px(e,t,i,r=0,a=0,s=1){if(e=Math.floor(e),t=Math.floor(t),!this.inb(e,t))return;const o=t*this.w+e;this.m[o]=i,this.n[o*3]=r,this.n[o*3+1]=a,this.n[o*3+2]=s}recolour(e,t,i){e=Math.floor(e),t=Math.floor(t),this.inb(e,t)&&this.m[t*this.w+e]&&(this.m[t*this.w+e]=i)}ellipse(e,t,i,r,a,s={}){const{onlyOn:o,density:c=1,noise:l=0,seed:u=0,round:d=1}=s;e*=this.sx,i*=this.sx;for(let h=Math.max(0,Math.floor(t-r-1));h<Math.min(this.h,t+r+1);h++)for(let p=Math.max(0,Math.floor(e-i-1));p<Math.min(this.w,e+i+1);p++){const _=(p+.5-e)/i,x=(h+.5-t)/r,g=_*_+x*x;if(g>1)continue;const m=h*this.w+p;if(o&&!o.has(this.m[m]))continue;if(c<1){const R=l?xi(p/3.2,h/3.2,u)*l+(1-l)*.5:.5;if(an(p,h,u+77)>c*(.4+R*1.2)*(1.15-g*.5))continue}const M=_*d,E=x*d,b=Math.hypot(M,E,Math.sqrt(Math.max(0,1-g))+.15);this.px(p,h,a,M/b,E/b,(Math.sqrt(Math.max(0,1-g))+.15)/b)}}line(e,t,i,r,a,s,o,c=1){e*=this.sx,i*=this.sx;const l=Math.max(1,Math.ceil(Math.hypot(i-e,r-t)));for(let u=0;u<=l;u++){const d=u/l,h=e+(i-e)*d,p=t+(r-t)*d,_=Math.max(.5,(a+(s-a)*d)/2);for(let x=Math.floor(p-_);x<=p+_;x++)for(let g=Math.floor(h-_);g<=h+_;g++){const m=(g+.5-h)/_,M=(x+.5-p)/_;if(m*m+M*M>1)continue;const E=m*c,b=Math.hypot(E,M*.3,1);this.px(g,x,o,E/b,M*.3/b,1/b)}}}tri(e,t){let[[i,r],[a,s],[o,c]]=e;i*=this.sx,a*=this.sx,o*=this.sx;const l=(_,x,g,m,M,E)=>(_-M)*(m-E)-(g-M)*(x-E),u=Math.max(0,Math.floor(Math.min(i,a,o))),d=Math.min(this.w,Math.ceil(Math.max(i,a,o))),h=Math.max(0,Math.floor(Math.min(r,s,c))),p=Math.min(this.h,Math.ceil(Math.max(r,s,c)));for(let _=h;_<p;_++)for(let x=u;x<d;x++){const g=x+.5,m=_+.5,M=l(g,m,i,r,a,s),E=l(g,m,a,s,o,c),b=l(g,m,o,c,i,r);(M<0||E<0||b<0)&&(M>0||E>0||b>0)||this.px(x,_,t,0,-.2,.98)}}shape(e,t,i={}){return this.fillMask(hl(this.w,this.h,ul(e,!0,i.per||6)),t,i)}limb(e,t,i={}){return this.shape(Vu(e,i),t,i)}fillMask(e,t,{group:i=1,line:r=!1,depth:a=0,round:s=1,onlyOn:o=null,keepNormals:c=!1,tilt:l=[0,0],lineMat:u=f.LINE}={}){const{w:d,h}=this;if(o)for(let g=0;g<d*h;g++)e[g]&&!o.has(this.m[g])&&(e[g]=0);const{vx:p,vy:_}=Wu(d,h,e);let x=a;if(!x){for(let g=0;g<d*h;g++)e[g]&&(x=Math.max(x,Math.hypot(p[g],_[g])));x=Math.max(1.5,Math.min(x*.9,2.5+x*.35))}for(let g=0;g<h;g++)for(let m=0;m<d;m++){const M=g*d+m;if(!e[M])continue;if(c){this.m[M]=t;continue}const E=Math.hypot(p[M],_[M]),b=Math.min(1,Math.max(0,(E-.5)/x)),R=Math.min(2.6,(1-b)/Math.sqrt(Math.max(.02,1-(1-b)*(1-b))))*s;let w=p[M]/(E||1)*R+l[0],P=_[M]/(E||1)*R+l[1];const S=Math.hypot(w,P,1);this.m[M]=t,this.n[M*3]=w/S,this.n[M*3+1]=P/S,this.n[M*3+2]=1/S}if(r&&!c){const g=[];for(let m=0;m<h;m++)for(let M=0;M<d;M++){const E=m*d+M;if(e[E])for(const[b,R]of[[1,0],[-1,0],[0,1],[0,-1]]){const w=M+b,P=m+R;if(w<0||P<0||w>=d||P>=h)continue;const S=P*d+w;if(!e[S]&&this.m[S]&&this.g[S]!==i&&this.m[S]!==u){g.push(E);break}}}for(const m of g)this.m[m]=u}if(!c)for(let g=0;g<d*h;g++)e[g]&&(this.g[g]=i);return e}mark(e,t,i,r={}){return this.fillMask(hl(this.w,this.h,ul(e,!0,6)),t,{...r,onlyOn:new Set(i),keepNormals:!0})}grid(e,t,i=0,r=0,{round:a=1,flipX:s=!1}={}){const o=Math.max(...e.map(u=>u.length)),c=new Uint8Array(this.w*this.h),l=new Map;e.forEach((u,d)=>[...u].forEach((h,p)=>{const _=t[h];if(!_)return;const x=i+(s?o-1-p:p),g=r+d;this.inb(x,g)&&(c[g*this.w+x]=1,l.set(g*this.w+x,_))})),this.fillMask(c,f.BODY,{round:a,depth:2.5});for(const[u,d]of l)this.m[u]=d}}function fr(n,e,t,i=t.outline,r=_c){const{w:a,h:s}=n,o=()=>r(a,s),c=o(),l=o(),u=o(),d=c.getContext("2d").createImageData(a,s),h=l.getContext("2d").createImageData(a,s),p=u.getContext("2d").createImageData(a,s),_=i==="none"?null:i==="dark"?[22,18,30]:"tint";for(let x=0;x<s;x++)for(let g=0;g<a;g++){const m=x*a+g,M=n.m[m],E=m*4;if(!M){if(!_)continue;const S=[n.get(g+1,x),n.get(g-1,x),n.get(g,x+1),n.get(g,x-1)].find(I=>I);if(!S)continue;const T=_==="tint"?(e[S]||[0,0,0]).map(I=>I*.35|0):_;d.data.set([...T,255],E),h.data.set([128,128,255,255],E),p.data.set([128,128,255,255],E);continue}let b=e[M];M===f.LINE&&!b&&(b=_==="tint"||!_?(e[f.BODY2]||[0,0,0]).map(S=>S*.55|0):_),b=b||[255,0,255],d.data.set([...b,Hu.has(M)?254:255],E);const R=n.n[m*3],w=n.n[m*3+1],P=n.n[m*3+2];h.data.set([R*127+128,w*127+128,P*255,255],E),p.data.set([-R*127+128,w*127+128,P*255,255],E)}return c.getContext("2d").putImageData(d,0,0),l.getContext("2d").putImageData(h,0,0),u.getContext("2d").putImageData(p,0,0),{A:c,N:l,NF:u,w:a,h:s}}const vi=n=>{const e=Math.hypot(n[0],n[1],n[2])||1;return[n[0]/e,n[1]/e,n[2]/e]},Fr=(n,e)=>[n[1]*e[2]-n[2]*e[1],n[2]*e[0]-n[0]*e[2],n[0]*e[1]-n[1]*e[0]],Ct=(n,e)=>n[0]*e[0]+n[1]*e[1]+n[2]*e[2],_n=(n,e)=>[n[0]-e[0],n[1]-e[1],n[2]-e[2]],A={add:(n,e)=>[n[0]+e[0],n[1]+e[1],n[2]+e[2]],sub:_n,mul:(n,e)=>[n[0]*e,n[1]*e,n[2]*e],lerp:(n,e,t)=>[n[0]+(e[0]-n[0])*t,n[1]+(e[1]-n[1])*t,n[2]+(e[2]-n[2])*t],norm:vi,cross:Fr,dot:Ct};function dl(n,e=[0,1,0]){const t=vi(n);let i=Fr(e,t);Math.hypot(...i)<1e-4&&(i=Fr([0,0,1],t)),i=vi(i);const r=Fr(t,i);return[t,r,i]}function vc(n,e){const t=Ct(n,e.axes[0]),i=Ct(n,e.axes[1]),r=Ct(n,e.axes[2]),[a,s,o]=e.r,c=Math.hypot(t/a,i/s,r/o),l=Math.hypot(t/(a*a),i/(s*s),r/(o*o));return l>1e-9?c*(c-1)/l:-Math.min(a,s,o)}function Mc(n,e){const{ba:t,l2:i,rr:r,a2:a,il2:s,r1:o,r2:c}=e,l=Ct(n,t),u=l-i,d=[n[0]*i-t[0]*l,n[1]*i-t[1]*l,n[2]*i-t[2]*l],h=Ct(d,d),p=l*l*i,_=u*u*i,x=Math.sign(r)*r*r*h;return Math.sign(u)*a*_>x?Math.sqrt(h+_)*s-c:Math.sign(l)*a*p<x?Math.sqrt(h+p)*s-o:(Math.sqrt(h*a*s)+l*r)*s-o}function Sc(n,e){const t=Math.abs(Ct(n,e.axes[0]))-e.h[0]+e.round,i=Math.abs(Ct(n,e.axes[1]))-e.h[1]+e.round,r=Math.abs(Ct(n,e.axes[2]))-e.h[2]+e.round;return Math.hypot(Math.max(t,0),Math.max(i,0),Math.max(r,0))+Math.min(Math.max(t,i,r),0)-e.round}const Xu=(n,e)=>e*(Math.sin(n[0]*23+n[1]*7)*Math.sin(n[1]*19-n[2]*11)+.5*Math.sin(n[2]*41+n[0]*29)),fl=(n,e)=>n.type==="ell"?vc(_n(e,n.cw),n):n.type==="box"?Sc(_n(e,n.cw),n):Mc(_n(e,n.aw),n),br=(n,e)=>n.rough?fl(n,e)+Xu(e,n.rough):fl(n,e);class Qe{constructor({blend:e=.07}={}){this.parts=[],this.flats=[],this.blend=e,this.anchors={feet:[]}}ell(e,t,i,r={}){const a=r.axes||(r.dir?dl(r.dir,r.up):[[1,0,0],[0,1,0],[0,0,1]]);return this.parts.push({type:"ell",c:e,r:t,axes:a,mat:i,group:r.group??1,extra:!!r.extra,paint:r.paint,rough:r.rough,cut:!!r.cut}),this}box(e,t,i,r={}){const a=r.axes||(r.dir?dl(r.dir,r.up):[[1,0,0],[0,1,0],[0,0,1]]);return this.parts.push({type:"box",c:e,h:t,round:Math.min(r.round??.02,...t),axes:a,mat:i,group:r.group??1,extra:!!r.extra,paint:r.paint,rough:r.rough,cut:!!r.cut}),this}seg(e,t,i,r,a,s={}){return this.parts.push({type:"cone",a:e,b:t,r1:i,r2:r,mat:a,group:s.group??1,extra:!!s.extra,paint:s.paint,rough:s.rough,cut:!!s.cut}),this}chain(e,t,i={}){for(let r=0;r+1<e.length;r++)this.seg(e[r].slice(0,3),e[r+1].slice(0,3),e[r][3],e[r+1][3],t,i);return this}flat(e,t,i,r,a,s,o={}){return this.flats.push({c:e,u:vi(t),v:vi(i),su:r,sv:a,mask:s,group:o.group??30,extra:!!o.extra,bend:o.bend??.35}),this}field(e){let t=1/0;for(const i of this.parts){if(i.extra||i.cut)continue;let r;if(i.type==="ell")r=vc(_n(e,i.c),i);else if(i.type==="box")r=Sc(_n(e,i.c),i);else{const a=_n(i.b,i.a),s=Math.max(1e-9,Ct(a,a)),o=i.r1-i.r2;r=Mc(_n(e,i.a),{ba:a,l2:s,rr:o,a2:s-o*o,il2:1/s,r1:i.r1,r2:i.r2})}r<t&&(t=r)}return t}static surface(e,t,i){const r=1/Math.hypot(i[0]/t[0],i[1]/t[1],i[2]/t[2]);return[e[0]+i[0]*r,e[1]+i[1]*r,e[2]+i[2]*r]}}const pl={towards:.6,away:-.6},Yu=.52;function Ui(n,{height:e,scale:t,facing:i="towards",yaw:r=pl[i]??pl.towards,pitch:a=Yu,lineGap:s=.12}={}){const o=Math.cos(r),c=Math.sin(r),l=Math.cos(a),u=Math.sin(a),d=H=>[H[0]*o-H[2]*c,H[1],H[0]*c+H[2]*o],h=H=>[H[0]*o+H[2]*c,H[1],-H[0]*c+H[2]*o],p=[0,-u,-l],_=[0,l,-u],x=[1,0,0],g=[0,u,l],m=n.blend,M=n.parts.map(H=>{if(H.type==="ell"){const Ue=d(H.c),Xe=H.axes.map(d),We=Math.max(...H.r);return{...H,cw:Ue,axes:Xe,bc:Ue,br:We+(H.rough||0)*1.5}}if(H.type==="box"){const Ue=d(H.c),Xe=H.axes.map(d);return{...H,cw:Ue,axes:Xe,bc:Ue,br:Math.hypot(...H.h)+(H.rough||0)*1.5}}const ue=d(H.a),se=d(H.b),ye=_n(se,ue),qe=Math.max(1e-9,Ct(ye,ye)),Ce=H.r1-H.r2;return{...H,aw:ue,ba:ye,l2:qe,rr:Ce,a2:qe-Ce*Ce,il2:1/qe,bc:A.lerp(ue,se,.5),br:Math.sqrt(qe)/2+Math.max(H.r1,H.r2)}}),E=n.flats.map(H=>{const ue=d(H.c),se=d(H.u),ye=d(H.v);return{...H,cw:ue,uw:se,vw:ye,nw:vi(Fr(se,ye)),bc:ue,br:Math.hypot(H.su,H.sv)}}),b=[...M,...E],R=H=>{const ue=Ct(H.bc,x),se=Ct(H.bc,_),ye=H.br+(H.uw?0:m);return[ue-ye,ue+ye,se-ye,se+ye]};for(const H of b)[H.x0,H.x1,H.u0,H.u1]=R(H);const w=b.filter(H=>!H.extra&&!H.cut),P=Math.min(...w.map(H=>H.u0+(H.uw?0:m))),S=Math.max(...w.map(H=>H.u1-(H.uw?0:m))),T=t??e/Math.max(1e-6,S-P),I=Math.min(...b.map(H=>H.x0)),C=Math.max(...b.map(H=>H.x1)),O=Math.min(...b.map(H=>H.u0)),F=Math.max(...b.map(H=>H.u1)),D=Math.ceil((C-I)*T)+4,B=Math.ceil((F-O)*T)+2,W=new on(D,B),$=new Float32Array(D*B).fill(1/0),ae=new Int16Array(D*B).fill(-1),q=8,ee=Math.ceil(D/q),N=Math.ceil(B/q),re=Array.from({length:ee*N},()=>[]);b.forEach((H,ue)=>{const se=Math.max(0,Math.floor((H.x0-I)*T/q)),ye=Math.min(ee-1,Math.floor(((H.x1-I)*T+2)/q)),qe=Math.max(0,Math.floor((F-H.u1)*T/q)),Ce=Math.min(N-1,Math.floor(((F-H.u0)*T+1)/q));for(let Ue=qe;Ue<=Ce;Ue++)for(let Xe=se;Xe<=ye;Xe++)re[Ue*ee+Xe].push(ue)});const ce=.25/T,Re=(H,ue)=>{const se=Math.max(m-Math.abs(H-ue),0)/m;return Math.min(H,ue)-se*se*m*.25};for(let H=0;H<B;H++)for(let ue=0;ue<D;ue++){const se=re[Math.floor(H/q)*ee+Math.floor(ue/q)];if(!se.length)continue;const ye=I+(ue+.5-1)/T,qe=F-(H+.5)/T,Ce=A.add(A.add(A.mul(x,ye),A.mul(_,qe)),A.mul(g,50));let Ue=1/0,Xe=-1/0;const We=[],xt=[];for(const Ze of se){const ze=b[Ze],L=_n(Ce,ze.bc),v=Ct(L,p),U=ze.br+(ze.uw?0:m),V=Ct(L,L)-U*U,Z=v*v-V;if(Z<0)continue;if(ze.uw){xt.push(ze);continue}if(ze.cut){We.push(ze);continue}const le=Math.sqrt(Z);Ue=Math.min(Ue,-v-le),Xe=Math.max(Xe,-v+le),We.push(ze)}let Rt=1/0,kt=-1,mt=0,vt=null;if(We.length){const Ze=new Map;for(const v of We){let U=Ze.get(v.group);U||Ze.set(v.group,U=[]),U.push(v)}const ze=(v,U)=>{let V=1/0;for(const Z of v)Z.cut||(V=V===1/0?br(Z,U):Re(V,br(Z,U)));for(const Z of v)Z.cut&&(V=Math.max(V,-br(Z,U)));return V};let L=Math.max(0,Ue);for(let v=0;v<96&&L<Xe;v++){const U=A.add(Ce,A.mul(p,L));let V=1/0,Z=null;for(const[le,he]of Ze){const Q=ze(he,U);Q<V&&(V=Q,Z=le)}if(V<ce){const le=Ze.get(Z),he=.5/T;vt=vi([ze(le,[U[0]+he,U[1],U[2]])-ze(le,[U[0]-he,U[1],U[2]]),ze(le,[U[0],U[1]+he,U[2]])-ze(le,[U[0],U[1]-he,U[2]]),ze(le,[U[0],U[1],U[2]+he])-ze(le,[U[0],U[1],U[2]-he])]);let Q=le[0],te=1/0;for(const de of le){if(de.cut)continue;const Le=br(de,U);Le<te&&(te=Le,Q=de)}for(const de of le)if(de.cut&&-br(de,U)>te-ce*2){Q=de;break}Rt=L,kt=Z,mt=Q.paint?Q.paint(h(U),Q)??Q.mat:Q.mat;break}L+=Math.max(V*.9,ce*.5)}}for(const Ze of xt){const ze=Ct(p,Ze.nw);if(Math.abs(ze)<1e-4)continue;const L=Ct(_n(Ze.cw,Ce),Ze.nw)/ze;if(L>=Rt)continue;const v=A.add(Ce,A.mul(p,L)),U=_n(v,Ze.cw),V=Ct(U,Ze.uw)/Ze.su,Z=Ct(U,Ze.vw)/Ze.sv;if(Math.abs(V)>1||Math.abs(Z)>1)continue;const le=Ze.mask(V,Z);if(!le)continue;let he=ze>0?A.mul(Ze.nw,-1):Ze.nw;he=vi(A.add(he,A.add(A.mul(Ze.uw,V*Ze.bend),A.mul(Ze.vw,Z*Ze.bend*.5)))),Rt=L,kt=Ze.group,mt=le,vt=he}if(!vt||!mt)continue;const k=H*D+ue;$[k]=Rt,ae[k]=kt,W.px(ue,H,mt,Ct(vt,x),-Ct(vt,_),Ct(vt,g))}const Oe=[];for(let H=0;H<B;H++)for(let ue=0;ue<D;ue++){const se=H*D+ue;if(W.m[se])for(const[ye,qe]of[[1,0],[-1,0],[0,1],[0,-1]]){const Ce=ue+ye,Ue=H+qe;if(Ce<0||Ue<0||Ce>=D||Ue>=B)continue;const Xe=Ue*D+Ce;if(W.m[Xe]&&ae[Xe]!==ae[se]&&$[Xe]-$[se]>s){Oe.push(se);break}}}for(const H of Oe)[f.EYE,f.GLINT,f.MAGIC,f.MAGIC2,f.NOSE,f.COLLAR,f.WOKEN,f.RUNE,f.GLOW].includes(W.m[H])||(W.m[H]=f.LINE);for(let H=0;H<B;H++)for(let ue=0;ue<D;ue++){const se=H*D+ue;if(W.m[se]!==f.EYE)continue;const ye=H>0&&W.m[se-D]===f.EYE,qe=ue>0&&W.m[se-1]===f.EYE,Ce=ue+1<D&&W.m[se+1]===f.EYE&&H+1<B&&W.m[se+D]===f.EYE;!ye&&!qe&&Ce&&(W.m[se]=f.GLINT)}let ke=-1;for(let H=B-1;H>=0&&ke<0;H--)for(let ue=0;ue<D;ue++)if(W.m[H*D+ue]){ke=H;break}const j=ke>=0&&ke<B-1?B-1-ke:0;if(ke>=0&&ke<B-1){const H=B-1-ke;for(let ue=B-1;ue>=0;ue--)for(let se=0;se<D;se++){const ye=ue*D+se,qe=(ue-H)*D+se,Ce=ue-H>=0;W.m[ye]=Ce?W.m[qe]:0,W.g[ye]=Ce?W.g[qe]:0;for(let Ue=0;Ue<3;Ue++)W.n[ye*3+Ue]=Ce?W.n[qe*3+Ue]:0}}return W.bodyH=Math.round((S-P)*T),{sp:W,s:T,project:H=>{const ue=d(H);return[+((ue[0]-I)*T+1).toFixed(1),+((F-Ct(ue,_))*T+j).toFixed(1)]}}}const Tn=(n,e=9,t=.3)=>an(Math.floor(n[0]*e),Math.floor(n[1]*e)+Math.floor(n[2]*e)*97,7)<t,pr={wing:(n,e)=>(t,i)=>{const r=(t+1)/2,a=1-.35*r*r,s=-1+.55*r+.18*Math.abs(Math.sin(r*Math.PI*6));return i>a||i<s?null:i>a-.35*(1-r*.5)?e:Math.floor(r*9)%2?n:e},ear:(n,e=f.EAR,t=f.BODY3)=>(i,r)=>{const a=(r+1)/2,s=.95*Math.sin(Math.PI*Math.min(1,.15+a*.85))*(1-a*.35);return Math.abs(i)>s?null:a>.82?t:Math.abs(i)<s*.5&&a<.7&&a>.12?e:n},flame:(n,e)=>(t,i)=>{const r=(i+1)/2,a=Math.sin(Math.PI*Math.min(1,r*1.1))*(1-r)*1.4;return Math.abs(t)>a?null:Math.abs(t)<a*.45&&r<.6?e:n},membrane:n=>(e,t)=>{const i=(e+1)/2,r=-1+.35*Math.abs(Math.sin(i*Math.PI*3));return t<r||t>1-.2*i?null:n},spotted:(n,e,t)=>(i,r)=>{if(Math.hypot(i,r*1.2)>1)return null;const s=Math.hypot(i-.35,r-.1);return s<.18?t:s<.3?e:n}},Ku={hair:f.HAIR,hat:f.HAT,headphones:f.PHONES,top:f.TOP,jacket:f.JACKET,jeans:f.JEANS,sneakers:f.SHOES,broom:f.BROOM,bristles:f.STRAW,skin:f.SKIN},ml={hair:[.01,.7,.85],hat:[.74,.45,.45],headphones:[.92,.55,.9],top:[.13,.15,.95],jacket:[.72,.45,.7],jeans:[.6,.5,.7],sneakers:[0,0,.95],broom:[.08,.55,.55],bristles:[.12,.55,.9],skin:[.07,.3,.94]};function qu(n,e=ml){const t={...ml,...e},i={hair:n.hairHue,jacket:n.cloakHue,hat:n.hatHue,top:n.topHue,jeans:n.jeansHue,sneakers:n.shoeHue,headphones:n.phonesHue},r={};for(const[a,s]of Object.entries(Ku)){const[o,c,l]=t[a];r[s]=ve(i[a]??o,c,l)}return r[f.EYE]=[24,18,30],r[f.GLINT]=[255,255,245],r[f.NOSE]=[20,16,24],r[f.MAGIC]=ve(n.glowHue??.13,.5,1),r[f.MAGIC2]=ve(n.glowHue??.13,.15,1),r[f.BELLY]=[245,245,240],r}const Zu={rise:.78,descend:-.66,brake:.44};function $u(n){const e=new Qe({blend:.03}),t=n%3,i=.5,r=.05,a=[[0,.02,-.01],[.02,-.01,.02],[-.01,.015,.01]][t],s=_=>i-r*(_/.62);e.seg([-.5,s(-.5),0],[.62,s(.62),0],.022,.018,f.BROOM,{group:2}),e.ell([-.64,s(-.64)+.005,0],[.2,.1,.11],f.STRAW,{dir:[1,r*1.6,0],group:3,paint:_=>_[0]<-.76?f.MAGIC2:_[0]>-.5?f.BROOM:void 0});const o=[-1,1].map(_=>[.5,s(.5)+.03,_*.045]),c=[-1,1].map(_=>[.2,i+.24+a[1],_*.1]);for(const _ of[0,1]){const x=_?1:-1,g=x>0?7:5;e.seg(c[_],o[_],.04,.03,f.JACKET,{group:g}),e.ell(o[_],[.035,.03,.035],f.SKIN,{group:g})}const l=[.3+a[0],i+.27+a[1],0],u=[.07,i+.28+a[1]*.5,0],d=[-.15,i+.35+a[2],0];e.ell(u,[.17,.1,.11],f.JACKET,{dir:[1,-.25,0],group:1,paint:_=>_[1]<u[1]-.04&&Math.abs(_[2])<.055?f.TOP:void 0}),e.ell(d,[.11,.08,.1],f.JEANS,{dir:[1,-.3,0],group:1}),e.chain([[...A.add(d,[-.02,.06,0]),.07],[...A.add(d,[-.18,.08+a[0]*2,0]),.05],[...A.add(d,[-.34,.05+a[1]*3,.02]),.025]],f.JACKET,{group:12}),[[[-.32,i+.5+a[1]*2,-.07],[-.46,i+.38+a[0]*2,-.08]],[[-.34,i+.33+a[2]*2,.08],[-.55,i+.44-a[1]*3,.1]]].forEach(([_,x],g)=>{const m=g?6:4,M=A.add(d,[-.04,0,g?.06:-.06]);e.seg(M,_,.055,.045,f.JEANS,{group:m}),e.seg(_,x,.045,.04,f.JEANS,{group:m}),e.ell(A.add(x,[-.05,0,0]),[.08,.04,.045],f.SHOES,{dir:[-1,.3,0],group:m,paint:E=>E[1]<x[1]-.03?f.BELLY:void 0})}),e.ell(l,[.11,.115,.1],f.SKIN,{group:8,paint:_=>_[0]<l[0]-.01||_[1]>l[1]+.075?f.HAIR:void 0});for(const _ of[-1,1]){const x=Qe.surface(l,[.11,.115,.1],A.norm([.85,.1,_*.45]));e.ell(x,[.026,.036,.026],f.BELLY,{group:8}),e.ell(A.add(x,[.012,0,_*.004]),[.014,.018,.014],f.EYE,{group:8})}e.ell(Qe.surface(l,[.11,.115,.1],A.norm([1,-.45,0])),[.012,.016,.04],f.BELLY,{group:8}),e.chain([[...A.add(l,[-.06,.03,0]),.065],[...A.add(l,[-.22,.05+a[1]*2,.01]),.05],[...A.add(l,[-.4,.06+a[2]*3,.02]),.03],[...A.add(l,[-.55,.07+a[0]*3,.02]),.012]],f.HAIR,{group:9});for(const _ of[-1,1])e.ell(A.add(l,[-.015,0,_*.105]),[.05,.055,.03],f.PHONES,{group:10});e.chain([[...A.add(l,[-.005,.03,-.095]),.015],[...A.add(l,[-.02,.12,0]),.015],[...A.add(l,[-.005,.03,.095]),.015]],f.PHONES,{group:10});const p=A.add(l,[-.1+a[0],.2+a[1]*2,0]);e.ell(p,[.16,.014,.15],f.HAT,{dir:[1,.9,0],group:11}),e.chain([[...A.add(p,[-.02,.02,0]),.08],[...A.add(p,[-.14,.13,0]),.04],[...A.add(p,[-.3,.14+a[2]*2,0]),.012]],f.HAT,{group:11,paint:_=>Math.hypot(_[0]-p[0],_[1]-p[1])<.06?f.MAGIC:void 0}),e.seg(A.add(p,[.08,-.02,.08]),A.add(l,[.04,-.09,.08]),.008,.008,f.HAT,{group:11});for(const[_,x,g,m]of[[-.86,s(-.8)+.05,.03,.22],[-.88,s(-.8)-.04,-.04,.16],[-.7,i+.45,.05,.14],[-.2,i+.5,-.04,.12]]){const M=t*.05%.1;e.seg([_-M,x,g],[_-M-m,x,g],.01,.004,f.MAGIC2,{group:30,extra:!0})}return e.ell([.02,.005,0],[.2,.005,.12],f.NOSE,{group:0}),e}const Ju={stand:{frames:3,fps:3},land:{frames:3,fps:10},takeoff:{frames:3,fps:10},talk:{frames:4,fps:2.5},placeSigil:{frames:3,fps:6},liftSigil:{frames:3,fps:6},sit:{frames:2,fps:1.5}},Os=.34,bc={binding:[-.02,.31,-.2],dir:[.02,1,-.04]},Qu={stand:[0,1,2].map(n=>({breathe:[0,.006,.012][n],sway:[0,.02,.035][n],free:[.04,.5+[0,.006,.012][n],.18],hand:"rest",broom:bc})),land:[{crouch:.2,hop:.01,broom:{astride:!0},sway:.05},{crouch:.1,bend:.1,broom:{binding:[-.28,.26,-.08],dir:[.6,.5,-.06]},legUp:[.18,.24,.12],sway:.03,free:[.2,.58,.2],hand:"rest"},{breathe:.004,broom:{binding:[.06,.31,-.2],dir:[.18,1,-.03]},sway:.015,free:[.06,.52,.19],hand:"rest"}],takeoff:[{crouch:.1,broom:{binding:[-.1,.3,-.17],dir:[.35,.7,-.04]},free:[.16,.58,.2],hand:"rest",sway:.02},{crouch:.15,bend:.1,broom:{binding:[-.3,.28,-.06],dir:[.7,.4,-.04]},legUp:[.1,.26,.13],sway:.04,free:[.24,.55,.17],hand:"rest"},{hop:.1,broom:{astride:!0},toes:!0,sway:.06}],talk:[{free:[.47,.84,.13],hand:"palm",tilt:.35,mouth:!0,sway:.01},{free:[.32,1.18,.12],hand:"point",tilt:-.25,look:.12,sway:.02},{free:[.24,1.16,.3],elbow:[.26,.88,.26],hand:"wave",tilt:.45,mouth:!0,sway:.03},{free:[.15,.76,.1],hand:"chest",tilt:-.35,breathe:.01,sway:.015}],placeSigil:[{free:[.16,1.62,.1],hand:"palm",look:.22,breathe:.01,sway:.02},{free:[.42,1,.12],hand:"palm",look:.08,sway:.03},{crouch:.7,bend:.55,free:[.38,.1,.13],hand:"down",look:-.08,sway:.04}],liftSigil:[{crouch:.7,bend:.55,free:[.36,.08,.13],hand:"down",look:-.08,sway:.02},{crouch:.25,bend:.18,free:[.44,.82,.12],hand:"palm",look:.05,sway:.04},{breathe:.012,free:[.2,1.64,.1],hand:"palm",look:.25,sway:.05,toes:!0}],sit:[0,1].map(n=>({sit:!0,swing:[.06,-.06][n],bend:-.08,look:[.02,.1][n],tilt:[.15,-.2][n],sway:[.01,.03][n],breathe:[0,.008][n],broom:{binding:[-.24,.31,-.3],dir:[.32,1,-.06]},free:[.2,Os+.14,.15],far:[.18,Os+.14,-.13],hand:"rest"}))};function ju(n,e,t){const i=Math.hypot(e[0]-n[0],e[1]-n[1]),r=A.lerp(n,e,.5);if(i>=2*t)return r;const a=Math.sqrt(t*t-i*i/4),s=(e[0]-n[0])/i,o=(e[1]-n[1])/i;return[r[0]-o*a,r[1]+s*a,r[2]]}function eh(n,e){const t=Qu[n],i={crouch:0,bend:0,hop:0,breathe:0,sway:0,tilt:0,look:0,broom:bc,...t[e%t.length]},r=new Qe({blend:.03}),a=i.hop,s=i.sway,o=i.sit?Os+.06:.45-i.crouch*.21+a,c=-i.crouch*.12,l=!!i.broom.astride,u=o-.04,d=l?[1,0,0]:A.norm(i.broom.dir),h=l?[-.36,u,0]:i.broom.binding,p=T=>A.add(h,A.mul(d,T));r.seg(p(0),p(l?.98:1.1),.022,.018,f.BROOM,{group:2}),r.ell(p(-.13),[.17,.07,.08],f.STRAW,{dir:d,group:3,paint:T=>{const I=A.dot(A.sub(T,h),d);return I<-.22?f.MAGIC2:I>-.01?f.BROOM:void 0}});for(const T of[-1,1]){const I=T>0?6:4,C=[c,o,T*.07],O=i.sit?i.swing*T:0,F=i.sit?[.24+O,.09+Math.max(0,O)*.6,T*.1]:T>0&&i.legUp?i.legUp:[(T>0?.05:-.01)+(i.toes?-.03:0),.07+(i.toes?a*.4:a),T*.1],D=i.sit?[.21,o+.01,T*.09]:ju(C,F,.21);r.seg(C,D,.055,.045,f.JEANS,{group:I}),r.seg(D,F,.045,.04,f.JEANS,{group:I});const B=i.toes?[.03,-.045,0]:[.05,-.03,0];r.ell(A.add(F,B),[.08,.04,.045],f.SHOES,{dir:i.toes?[1,-.6,0]:[1,0,0],group:I,paint:W=>W[1]<F[1]+B[1]-.015?f.BELLY:void 0})}const _=[Math.sin(i.bend),Math.cos(i.bend),0],x=[Math.cos(i.bend),-Math.sin(i.bend),0],g=[c,o+.03,0];r.ell(g,[.1,.08,.105],f.JEANS,{group:1});const m=A.add(g,A.add(A.mul(_,.19),[0,i.breathe,0]));r.ell(m,[.1,.15+i.breathe*.5,.115],f.JACKET,{dir:x,group:1,paint:T=>A.dot(A.sub(T,m),x)>.045&&Math.abs(T[2])<.05?f.TOP:void 0}),r.chain([[...A.add(m,A.add(A.mul(x,-.07),A.mul(_,-.08))),.07],[...A.add(m,A.add(A.mul(x,-.11-s),A.mul(_,-.2))),.05],[...A.add(m,A.add(A.mul(x,-.13-s*1.6),A.mul(_,-.29))),.025]],f.JACKET,{group:12});const M=A.add(m,A.add(A.mul(_,.27),[i.look*.03,0,i.tilt*.04])),E=T=>A.add(m,A.add(A.mul(_,.1),[0,0,T*.12])),b=l?[.28,u+.03,-.05]:p(Math.max(.12,(Math.min(.62,o+.2)-h[1])/Math.max(.3,d[1]))),R=l?[.28,u+.03,.05]:i.free;for(const T of[-1,1]){const I=T>0?7:5,C=E(T),O=T>0?R:i.far||b,F=T>0&&i.elbow?i.elbow:A.add(A.lerp(C,O,.5),[-.03,-.02,T*.05]);r.seg(C,F,.04,.035,f.JACKET,{group:I}),r.seg(F,O,.035,.03,f.JACKET,{group:I});const D=T>0&&!l?i.hand:"grip";if(D==="palm")r.ell(O,[.045,.02,.04],f.SKIN,{group:I});else if(D==="down")r.ell(O,[.045,.02,.04],f.SKIN,{dir:[1,.15,0],group:I});else if(D==="wave"){r.ell(O,[.03,.045,.04],f.SKIN,{group:I});for(const B of[-1,0,1])r.seg(A.add(O,[0,.03,B*.02]),A.add(O,[B*.01,.065,B*.03]),.01,.008,f.SKIN,{group:I})}else D==="point"?(r.ell(O,[.035,.03,.035],f.SKIN,{group:I}),r.seg(A.add(O,[0,.02,0]),A.add(O,[.01,.08,0]),.012,.01,f.SKIN,{group:I})):r.ell(O,[.035,.03,.035],f.SKIN,{group:I})}r.ell(M,[.11,.115,.1],f.SKIN,{group:8,paint:T=>T[0]<M[0]-.01||T[1]>M[1]+.075?f.HAIR:void 0});for(const T of[-1,1])r.ell(Qe.surface(M,[.11,.115,.1],A.norm([.85,.05+i.look,T*.45+i.tilt*.1])),[.016,.026,.016],f.EYE,{group:8});i.mouth&&r.ell(Qe.surface(M,[.11,.115,.1],A.norm([1,-.5+i.look,i.tilt*.1])),[.012,.016,.025],f.NOSE,{group:8}),r.chain([[...A.add(M,[-.06,.02,0]),.06],[...A.add(M,[-.12-s,-.12,.02+i.tilt*.03]),.05],[...A.add(M,[-.13-s*1.5,-.25,.03+i.tilt*.04]),.03]],f.HAIR,{group:9});for(const T of[-1,1])r.ell(A.add(M,[-.015,0,T*.105]),[.05,.055,.03],f.PHONES,{group:10});r.chain([[...A.add(M,[-.005,.03,-.095]),.015],[...A.add(M,[-.005,.11,-.05]),.015],[...A.add(M,[-.005,.125,0]),.015],[...A.add(M,[-.005,.11,.05]),.015],[...A.add(M,[-.005,.03,.095]),.015]],f.PHONES,{group:10});const w=A.add(M,[-.03,.1,i.tilt*.02]),P=i.tilt*.05,S=A.add(w,[-.16-s*.5,.27,P*2]);return r.ell(w,[.16,.014,.15],f.HAT,{dir:[1,.25-i.look*.8,i.tilt*.3],group:11}),r.chain([[...A.add(w,[0,.01,0]),.085],[...A.add(w,[-.05,.17,P]),.045],[...S,.012]],f.HAT,{group:11,paint:T=>T[1]<w[1]+.045?f.MAGIC:void 0}),r.ell([.02,.005,0],[.2,.005,.12],f.NOSE,{group:0}),r.anchors.hand=R,r.anchors.hatTip=S,r}function Ec({frame:n=0,lean:e=!1,pose:t}={}){if(t==="fast")return $u(n);if(Ju[t])return eh(t,n);const i=t==="rise",r=t==="descend",a=t==="brake",s=i||r||a,o=new Qe({blend:.03}),c=s?0:[0,.025,.045][n%3],l=s?0:[0,.015,-.01][n%3]+(e?.08:0),u=.42+c,d=i?.3:r?-.27:a?-.12:e?.1:0,h=Math.min(.1,Math.max(0,d)),p=s?[.02,.06][n%2]:[0,.03,.05][n%3],_=r?1:i?-.6:0;o.seg([-.5,u-l*2,0],[.62,u+l*3,0],.022,.018,f.BROOM,{group:2}),a?o.ell([-.56,u-.08,0],[.17,.07,.09],f.STRAW,{dir:[.55,1,0],group:3,paint:E=>E[1]<u-.18?f.MAGIC2:E[1]>u-.01?f.BROOM:void 0}):o.ell([-.62,u-l*2-.01,0],[.17,.07,.08],f.STRAW,{dir:[1,l,0],group:3,paint:E=>E[0]<-.72?f.MAGIC2:E[0]>-.5?f.BROOM:void 0});for(const E of[-1,1]){const b=[-.04,u+.06,E*.07],R=a?[.18,u-.01,E*.14]:r?[.16,u-.05,E*.14]:i?[.06,u-.07,E*.14]:[.12+d*.5,u-.02,E*.14],w=a?E>0?[.44,u-.02+p,E*.13]:[.3,u-.16,E*.13]:r?[.2,u-.26,E*.13]:i?[-.1,u-.23,E*.13]:[.08+d,u-.2,E*.13];o.seg(b,R,.055,.045,f.JEANS,{group:E>0?6:4}),o.seg(R,w,.045,.04,f.JEANS,{group:E>0?6:4}),o.ell(A.add(w,[.05,-.02,0]),[.08,.04,.045],f.SHOES,{group:E>0?6:4,paint:P=>P[1]<w[1]-.04?f.BELLY:void 0})}o.ell([-.04,u+.08,0],[.11,.07,.1],f.JEANS,{group:1});const x=[0+d*.8,u+.26-Math.abs(d)*.3,0];o.ell(x,[.1,.16,.11],f.JACKET,{dir:[d*2.5,1,0],up:[-1,0,0],group:1,paint:E=>E[0]>x[0]+.04&&Math.abs(E[2])<.055?f.TOP:void 0}),a?o.chain([[...A.add(x,[-.08,-.06,0]),.07],[...A.add(x,[-.02,.12+p,.02]),.05],[...A.add(x,[.14,.18+p,.03]),.025]],f.JACKET,{group:12}):s&&o.chain([[...A.add(x,[-.08,-.1,0]),.07],[...A.add(x,[-.2,-.12+_*(.08+p),0]),.05],[...A.add(x,[-.3,-.12+_*(.16+p*1.5),.02]),.025]],f.JACKET,{group:12});const g=A.add(x,[.03+d*.5,.26,0]),m=A.add(g,[a?.05:r?-.01:-.03,a?.06:.1,0]);for(const E of[-1,1]){const b=A.add(x,[.01,.11,E*.11]),R=r&&E>0?A.add(m,[.1,.01,.1]):a?[.3,u+.03,E*.05]:[.26+d,u+.03,E*.05],w=r&&E>0?A.add(b,[.1,.02,.1]):A.lerp(b,R,.5);o.seg(b,w,.04,.035,f.JACKET,{group:E>0?7:5}),o.seg(w,R,.035,.03,f.JACKET,{group:E>0?7:5}),o.ell(R,[.035,.03,.035],f.SKIN,{group:E>0?7:5})}o.ell(g,[.11,.115,.1],f.SKIN,{group:8,paint:E=>E[0]<g[0]-.01||E[1]>g[1]+.075?f.HAIR:void 0});for(const E of[-1,1])o.ell(Qe.surface(g,[.11,.115,.1],A.norm([.85,.05,E*.45])),[.016,.026,.016],f.EYE,{group:8});a?o.chain([[...A.add(g,[-.06,.06,0]),.06],[...A.add(g,[.04,.13+p,.03]),.045],[...A.add(g,[.2,.08+p,.04]),.02]],f.HAIR,{group:9}):o.chain([[...A.add(g,[-.06,.02,0]),.06],[...A.add(g,[-.18-h,-.05+p+_*.1,.02]),.045],[...A.add(g,[-.3-h*1.5,-.08+p*1.6+_*.22,.03]),.02]],f.HAIR,{group:9});for(const E of[-1,1])o.ell(A.add(g,[-.015,0,E*.105]),[.05,.055,.03],f.PHONES,{group:10});o.chain([[...A.add(g,[-.005,.03,-.095]),.015],[...A.add(g,[-.005,.11,-.05]),.015],[...A.add(g,[-.005,.125,0]),.015],[...A.add(g,[-.005,.11,.05]),.015],[...A.add(g,[-.005,.03,.095]),.015]],f.PHONES,{group:10});const M=i?.1:0;if(o.ell(m,[.16,.014,.15],f.HAT,{dir:a?[1,-.55,0]:[1,.25+M*3,0],group:11}),o.chain(a?[[...A.add(m,[0,.01,0]),.085],[...A.add(m,[.06,.16,0]),.045],[...A.add(m,[.2,.22+p*.5,0]),.012]]:[[...A.add(m,[0,.01,0]),.085],[...A.add(m,[-.05-h-M*.5,.17-M*.3,0]),.045],[...A.add(m,[-.16-h*1.5-M,.27+p*.5-M*.5,0]),.012]],f.HAT,{group:11,paint:E=>E[1]<m[1]+.045?f.MAGIC:void 0}),s){const E=Zu[t]+(a?[0,.06][n%2]:0),b=Math.cos(E),R=Math.sin(E),w=[0,u,0],P=C=>[w[0]+(C[0]-w[0])*b-(C[1]-w[1])*R,w[1]+(C[0]-w[0])*R+(C[1]-w[1])*b,C[2]],S=C=>[w[0]+(C[0]-w[0])*b+(C[1]-w[1])*R,w[1]-(C[0]-w[0])*R+(C[1]-w[1])*b,C[2]],T=C=>[C[0]*b-C[1]*R,C[0]*R+C[1]*b,C[2]];for(const C of o.parts)if(C.type==="ell"?(C.c=P(C.c),C.axes=C.axes.map(T)):(C.a=P(C.a),C.b=P(C.b)),C.paint){const O=C.paint;C.paint=(F,D)=>O(S(F),D)}for(const C of o.flats)C.c=P(C.c),C.u=T(C.u),C.v=T(C.v);const I=Math.min(...o.parts.map(C=>C.type==="ell"?C.c[1]-Math.max(...C.r):Math.min(C.a[1]-C.r1,C.b[1]-C.r2)));if(I<.08)for(const C of o.parts){const O=.08-I;C.type==="ell"?C.c=[C.c[0],C.c[1]+O,C.c[2]]:(C.a=[C.a[0],C.a[1]+O,C.a[2]],C.b=[C.b[0],C.b[1]+O,C.b[2]])}if(a){const C=P([-.45,u-.24,0]);for(let O=0;O<5;O++){const F=O+n*.5,D=.055-O*.008;o.ell([C[0]+.1+F*.08,Math.max(.04,C[1]-.02+Math.sin(F*1.9)*.04),Math.cos(F*1.3)*.06],[D,D*.8,D],O<2?f.BELLY:O%2?f.MAGIC:f.MAGIC2,{group:25+O,extra:!0})}}if(i){const C=P([-.8,u,0]);for(let O=0;O<5;O++){const F=O+n*.5,D=.05-O*.007;o.ell([C[0]-.02+Math.sin(F*2.1)*.06,Math.max(.04,C[1]-.08-F*.09),Math.cos(F*1.7)*.05],[D,D,D],O%2?f.MAGIC:f.MAGIC2,{group:20+O,extra:!0})}}}return o.ell([.02,.005,0],[.2,.005,.12],f.NOSE,{group:0}),o}const yc=(n={})=>Math.round((n.size||8)*Math.sqrt(n.growth||20)*(2/(n.pixel||3))*1.9),ns=new Map,wc=n=>(ns.has(n)||ns.set(n,Ui(Ec({frame:0}),{height:n}).s),ns.get(n)),th=(n={})=>wc(yc(n));function nh(n={},{frame:e=0,lean:t=!1,facing:i="towards",pose:r}={}){const a=yc(n),s=Ec({frame:e,lean:t,pose:r}),{sp:o,project:c}=r?Ui(s,{scale:wc(a),facing:i}):Ui(s,{height:a,facing:i});s.anchors.hand&&(o.anchors={hand:c(s.anchors.hand),hatTip:c(s.anchors.hatTip)});let l=0;for(let u=0;u<400&&l<6;u++){const d=u*37%o.w,h=u*53%Math.floor(o.h*.8);o.get(d,h)||o.get(d+1,h)||o.get(d-1,h)||o.get(d,h+1)||o.get(d,h-1)||(d*7+h*13+e*5)%11||(o.px(d,h,f.MAGIC2),l++)}return o}const nt=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},rr=n=>{const e=nt(Math.floor(n[0]*14)+Math.floor(n[2]*14)*13,Math.floor(n[1]*6));return e<.14?f.BARKD:e>.88?f.BARKL:void 0},ih=n=>e=>{const t=nt(Math.floor(e[0]*10),Math.floor(e[1]*10)+Math.floor(e[2]*10)*7);return e[1]<n[1]-.2||t<.2?f.LEAF3:t>.8?f.LEAF2:void 0},Xn=(n,e,t,i,r=!0)=>n.ell(e,t,f.STONE,{group:i,rough:.025,paint:a=>a[1]>e[1]+t[1]*.45&&r?f.MOSS:Math.abs(Math.sin(a[0]*13+a[2]*7))<.06?f.STONED:void 0}),Jr=(n,e,t,i)=>n.ell(e,t,f.LEAF,{group:i,rough:.04,paint:ih(e)}),Vt=(n,e,t)=>n.chain(e,f.TRUNK,{group:t,rough:.012,paint:rr}),Qr=(n,e,t,i,r,a=.3,s=f.LEAF2)=>{for(let o=0;o<e;o++){const c=nt(r,o)*6.283,l=t*Math.sqrt(nt(o,r)),u=Math.cos(c)*l,d=Math.sin(c)*l*.7;n.ell([u,a*.3,d],[.07,a*(.35+nt(o,4)*.3),.07],s,{group:i+o%3,paint:h=>h[1]>a*.45?f.LEAF:void 0})}},jr=(n,e,t,i)=>n.ell(e,[t[0],.015,t[1]],f.WATER,{group:i}),rh={"sleeping-giant"(n){const e=t=>i=>{const r=nt(Math.floor(i[0]*8),Math.floor(i[2]*8)+Math.floor(i[1]*8)*5);return r<.15?f.LEAF3:r>.86?f.LEAF2:void 0};for(const[t,i]of[[[.85,.42,0],[.7,.5,.66]],[[0,.3,0],[.62,.36,.6]],[[-.8,.3,0],[.56,.36,.62]],[[1.85,.5,.02],[.5,.5,.48]],[[-1.55,.72,.3],[.38,.5,.3]],[[-1.55,.72,-.3],[.38,.5,.3]],[[-2.2,.3,.32],[.42,.3,.26]],[[-2.2,.3,-.32],[.42,.3,.26]],[[.6,.2,.78],[.75,.2,.2]],[[.6,.2,-.78],[.75,.2,.2]]])n.ell(t,i,f.MOSS,{group:1,rough:.03,paint:e()});Xn(n,[2.25,.75,.12],[.13,.15,.11],2,!1);for(const t of[-.12,.22])n.ell([2.12,.88,t],[.08,.04,.07],f.STONED,{group:3});Xn(n,[-.2,.16,.95],[.2,.15,.18],4),Xn(n,[-.2,.16,-.95],[.18,.14,.16],5),n.ell([2,.95,.02],[.42,.14,.4],f.LEAF3,{group:6,rough:.03}),Qr(n,26,2.8,10,3,.3)},"fern-grotto"(n){n.ell([0,.16,0],[.78,.2,.72],f.STONE,{group:1,rough:.015,paint:e=>e[1]>.3?f.MOSS:void 0}),jr(n,[0,.345,0],[.55,.5],2);for(let e=0;e<6;e++){const t=e/6*Math.PI*2+.4,i=1.5+nt(e)*.3,r=[Math.cos(t)*i,0,Math.sin(t)*i*.8],a=1.1+nt(e,2)*.7,s=A.add(r,[0,a,0]);n.seg(r,s,.12,.09,f.TRUNK,{group:3+e,rough:.02,paint:rr});for(let o=0;o<7;o++){const c=o/7*Math.PI*2+e,l=[Math.cos(c),0,Math.sin(c)];n.chain([[...s,.05],[...A.add(s,A.add(A.mul(l,.45),[0,.18,0])),.04],[...A.add(s,A.add(A.mul(l,.9),[0,-.15,0])),.015]],o%2?f.LEAF:f.LEAF2,{group:10+e})}}for(let e=0;e<5;e++){const t=e*1.3;Xn(n,[Math.cos(t)*.95,.08,Math.sin(t)*.95],[.16,.12,.14],20+e)}},"sunken-boat"(n){jr(n,[.3,.01,.15],[1.9,1.15],1);const e=[0,.12,0],t=A.norm([1,.28,.12]);n.ell(e,[1.3,.45,.55],f.WOOD,{dir:t,group:2,paint:i=>(A.dot(A.sub(i,e),[0,1,0])*9+9)%1<.14?f.BARKD:i[1]>.35&&nt(Math.floor(i[0]*9))<.4?f.MOSS:void 0}),n.ell(A.add(e,[0,.14,0]),[1.2,.4,.47],f.BARKD,{dir:t,group:2,cut:!0});for(let i=-2;i<=2;i++)n.seg(A.add(e,A.add(A.mul(t,i*.4),[0,.1,-.42])),A.add(e,A.add(A.mul(t,i*.4),[0,.1,.42])),.04,.04,f.WOOD,{group:3});n.seg([-.9,.05,.7],[.3,1,.55],.03,.03,f.WOOD,{group:4}),n.box([-.98,.06,.72],[.2,.02,.07],f.WOOD,{dir:[1.2,-.8,-.15],group:4}),Qr(n,18,2.2,10,5,.45)},"bramble-wagon"(n){const e=A.norm([1,-.12,0]);n.box([0,.62,0],[1.1,.22,.52],f.WOOD,{dir:e,round:.04,group:1,paint:t=>(t[0]+3)*4%1<.08?f.BARKD:void 0}),n.box([0,.72,0],[1,.2,.43],f.BARKD,{dir:e,group:1,cut:!0});for(const[t,i,r,a]of[[-.72,.55,.4,.4],[-.72,-.55,.4,.4],[.72,-.55,.32,.37]])n.ell([t,r,i],[a,a,.06],f.WOOD,{group:2+(t>0?1:0)+(i>0?2:0),paint:s=>{const o=s[0]-t,c=s[1]-r,l=Math.hypot(o,c),u=Math.atan2(c,o);return l>a*.82||l<a*.18?f.BARKD:Math.abs(Math.sin(u*4))<.2?f.WOOD:f.NOSE}});n.ell([.95,.1,.75],[.37,.06,.37],f.WOOD,{group:7,paint:t=>Math.hypot(t[0]-.95,t[2]-.75)>.3?f.BARKD:void 0});for(const t of[-.3,.3])n.seg([1.05,.55,t],[1.9,.05,t*1.4],.04,.035,f.WOOD,{group:8});for(let t=0;t<14;t++){const i=nt(t,1)*6.283,r=Math.cos(i)*1.5,a=Math.sin(i)*.9,s=[[r,0,a,.03]];for(let o=1;o<4;o++)s.push([r*(1-o*.28)+(nt(t,o)-.5)*.5,.25+o*.25+nt(o,t)*.2,a*(1-o*.3)+(nt(o,t*3)-.5)*.4,.025-o*.004]);if(n.chain(s,f.BARKD,{group:10+t%3}),t%2===0){const o=s[3];n.ell([o[0],o[1],o[2]],[.18,.13,.16],f.LEAF,{group:14,rough:.03,paint:c=>nt(Math.floor(c[0]*30),Math.floor(c[1]*30))<.1?f.ACCENT:void 0})}}},"beehive-tree"(n){for(const[t,i,r]of[[-.2,0,-.25],[.15,-.1,.2],[0,.15,.05]])Vt(n,[[t,0,i,.22],[t+r*.8,1.4,i,.16],[t+r*2,2.8,i-.1,.08]],1);for(const[t,i]of[[[-.6,2.9,-.2],[.9,.6,.7]],[[.6,3,-.2],[.85,.6,.7]],[[0,3.4,-.3],[.9,.55,.7]]])Jr(n,t,i,3);Vt(n,[[.2,1.9,-.05,.08],[.75,2.05,.15,.05]],2);const e=[.72,1.6,.2];n.ell(e,[.24,.42,.22],f.STRAW,{group:4,paint:t=>{const i=Math.floor((t[1]-e[1])*14),r=Math.floor(Math.atan2(t[2]-e[2],t[0]-e[0])*3+i%2*.5);return nt(i,r)<.3?f.BARK2:void 0}}),n.seg([.75,2.02,.15],[.72,1.9,.2],.05,.1,f.STRAW,{group:4});for(let t=0;t<6;t++){const i=t*1.9;n.ell([e[0]+Math.cos(i)*.45,e[1]+Math.sin(t*2.3)*.35,e[2]+Math.sin(i)*.35],[.03,.025,.03],f.MAGIC,{group:20+t,extra:!0})}},"fairy-ring"(n){n.ell([0,.005,0],[1.9,.005,1.5],f.LEAF3,{group:0});for(let e=0;e<9;e++){const t=e/9*Math.PI*2,i=[Math.cos(t)*1.6,0,Math.sin(t)*1.25],r=.35+nt(e)*.35;n.box(A.add(i,[0,r/2,0]),[.13,r/2,.1],f.STONE,{dir:[-Math.sin(t),0,Math.cos(t)],round:.05,rough:.015,group:1+e,paint:s=>e===2&&Math.abs(s[1]-r*.55)<r*.22&&Math.abs(s[0]-i[0]-0)<.05?f.RUNE:s[1]>r*.85?f.MOSS:void 0});const a=A.add(i,[Math.cos(t+.35)*.25,0,Math.sin(t+.35)*.2]);n.seg(a,A.add(a,[0,.16,0]),.035,.03,f.CLOTH,{group:12}),n.ell(A.add(a,[0,.18,0]),[.1,.06,.1],f.ACCENT,{group:13,paint:s=>nt(Math.floor(s[0]*60),Math.floor(s[2]*60))<.15?f.BELLY:void 0})}},"charcoal-hut"(n){const e=[0,2,0];for(let i=0;i<20;i++){const r=i/20*Math.PI*2;Math.abs(r-1.2)<.35||n.seg([Math.cos(r)*.95,0,Math.sin(r)*.8],A.add(e,[Math.cos(r)*.08,.1+nt(i)*.25,Math.sin(r)*.08]),.05,.03,i%3?f.TRUNK:f.BARKD,{group:1+i%2})}n.ell([0,.6,0],[.85,.6,.7],f.BARKD,{group:3});const t=[1.7,0,.3];n.ell(t,[.85,.42,.7],f.BARKD,{group:4,rough:.03,paint:i=>nt(Math.floor(i[0]*14),Math.floor(i[2]*14)+Math.floor(i[1]*14))<.07?f.GLOW:i[1]>.3?f.SHADES:void 0});for(let i=0;i<4;i++)n.seg([-1.4,.1+i*.14,-.5+i%2*.05],[-1.4,.1+i*.14,.5],.07,.07,f.TRUNK,{group:5+i%2,paint:r=>Math.abs(r[2])>.46?f.BARKL:void 0})},"root-arch"(n){Vt(n,[[-1.8,0,.1,.4],[-1.4,1.2,0,.34],[-.4,2.3,-.1,.3],[.6,2.4,0,.28],[1.5,1.4,.1,.32],[1.9,0,.15,.38]],1),Vt(n,[[-1.4,0,-.6,.28],[-.6,1.6,-.5,.22],[.5,1.9,-.45,.2],[1.3,.9,-.4,.22],[1.5,0,-.35,.26]],2),Vt(n,[[-1.8,.2,.1,.3],[-2.4,.05,.5,.12]],1),Vt(n,[[1.9,.2,.15,.3],[2.5,.05,.55,.12]],1);for(const[e,t]of[[[-.2,2.6,-.2],[.7,.35,.5]],[[.8,2.5,-.25],[.55,.3,.45]]])Jr(n,e,t,4);for(let e=0;e<4;e++)Xn(n,[-.7+e*.45,.12,(nt(e)-.5)*.5],[.22,.18,.2],6+e);n.box([0,.35,-.2],[.16,.35,.08],f.STONE,{round:.05,rough:.01,group:11,paint:e=>Math.abs(e[1]-.4)<.14&&Math.abs(e[0])<.05?f.MAGIC:e[1]>.62?f.MOSS:void 0})},"turf-hut"(n){n.box([0,.55,0],[1,.55,.7],f.WOOD,{round:.04,group:1,paint:e=>e[1]*7%1<.18?f.BARKD:e[2]>.66&&Math.abs(e[0]+.2)<.2&&e[1]<.85?f.NOSE:e[2]>.66&&Math.abs(e[0]-.5)<.14&&Math.abs(e[1]-.7)<.12?f.SHADES:void 0});for(const e of[-1,1])n.box([0,1.3,e*.4],[1.15,.05,.5],f.MOSS,{dir:[1,0,0],up:[0,1,-e*.75],round:.03,group:2,paint:t=>nt(Math.floor(t[0]*12),Math.floor(t[2]*12))<.25?f.LEAF2:void 0});n.seg([.65,1.2,-.3],[.65,1.9,-.3],.15,.13,f.STONE,{group:3,rough:.015});for(let e=0;e<5;e++)Xn(n,[-1.4+e*.7,.12,.9+nt(e)*.3],[.2,.15,.18],4+e);Qr(n,16,1.8,10,9,.25)},"heron-rookery"(n){Vt(n,[[0,0,0,.25],[.4,1.4,0,.18],[.9,2.8,-.1,.12],[1.3,3.8,-.2,.06]],1);const e=[[[.6,2,-.05],[-.3,2,-.1]],[[1,3,-.1],[1.8,2.9,0]],[[1.25,3.6,-.2],[.6,3.7,-.3]]];e.forEach(([r,a],s)=>{Vt(n,[[...r,.07],[...a,.04]],2),n.ell(A.add(a,[0,.08,0]),[.34,.13,.3],f.BARK2,{group:3+s,rough:.025,paint:o=>Math.abs(Math.sin(o[0]*30+o[2]*20))<.25?f.STRAW:o[1]<a[1]+.02?f.BARKD:void 0})});for(const[r,a]of[[[1.2,4,-.4],[.6,.4,.45]],[[.3,3.1,-.5],[.45,.3,.35]],[[1.9,3.3,-.4],[.4,.3,.35]]])Jr(n,r,a,7);const t=A.add(e[1][1],[0,.42,.05]),i=1.6;n.ell(t,[.18*i,.1*i,.09*i],f.BELLY,{dir:[1,.3,0],group:10,paint:r=>r[1]>t[1]+.06?f.STONE:void 0}),n.chain([[...A.add(t,[.12*i,.06*i,0]),.035*i],[...A.add(t,[.2*i,.22*i,0]),.03*i],[...A.add(t,[.16*i,.32*i,0]),.04*i]],f.BELLY,{group:10}),n.seg(A.add(t,[.18*i,.33*i,0]),A.add(t,[.36*i,.3*i,0]),.015*i,.005*i,f.BODY2,{group:11});for(const r of[-.04,.04])n.seg(A.add(t,[0,-.06*i,r]),A.add(t,[.02,-.42,r]),.012,.012,f.BARKD,{group:12})},sundial(n){n.ell([0,.07,0],[1.05,.09,1],f.STONE,{group:1,rough:.01}),n.ell([0,.2,0],[.72,.09,.68],f.STONE,{group:2,rough:.01,paint:e=>e[1]>.26&&nt(Math.floor(e[0]*8),Math.floor(e[2]*8))<.3?f.MOSS:void 0}),n.seg([0,.28,0],[0,.95,0],.16,.13,f.STONE,{group:3,paint:e=>Math.abs(Math.sin(e[1]*30))<.15?f.STONED:void 0}),n.ell([0,1,0],[.38,.04,.38],f.FRAME,{group:4,paint:e=>{const t=Math.atan2(e[2],e[0]);return Math.abs(Math.sin(t*6))<.12&&Math.hypot(e[0],e[2])>.26?f.BARKD:void 0}}),n.box([0,1.12,0],[.2,.1,.01],f.FRAME,{dir:[1,-.5,0],round:.005,group:5});for(let e=0;e<22;e++){const t=e/22*Math.PI*2,i=1.25+nt(e)*.2,r=[Math.cos(t)*i,0,Math.sin(t)*i*.85];n.seg(r,A.add(r,[0,.18,0]),.015,.012,f.LEAF2,{group:6}),n.ell(A.add(r,[0,.2,0]),[.05,.04,.05],[f.FLOWER,f.BELLY,f.ACCENT][e%3],{group:7})}},"bear-den"(n){const e=[0,.3,-.2];n.ell(e,[1.7,1.15,1.25],f.LEAF,{group:1,rough:.05,paint:t=>{const i=nt(Math.floor(t[0]*16),Math.floor(t[1]*16)+Math.floor(t[2]*16)*3);return i<.06?f.ACCENT:i<.2?f.BARKD:t[1]<.4?f.LEAF3:i>.85?f.LEAF2:void 0}}),n.ell([.35,.35,.95],[.5,.55,.4],f.NOSE,{group:1,cut:!0}),n.seg([2,0,.5],[2,.65,.5],.3,.27,f.TRUNK,{group:3,paint:t=>t[1]>.6?f.BARKL:Math.abs(Math.sin(Math.atan2(t[2]-.5,t[0]-2)*3))<.12&&t[1]>.2?f.BARKD:void 0})},"stilt-hut"(n){jr(n,[0,.01,.1],[2.1,1.3],1);for(const[e,t]of[[-.75,-.55],[.75,-.55],[-.75,.55],[.75,.55]])n.seg([e,0,t],[e,1.05,t],.07,.06,f.WOOD,{group:2,paint:i=>i[1]<.15?f.MOSS:void 0});n.box([0,1.1,0],[1.05,.05,.8],f.WOOD,{round:.02,group:3,paint:e=>(e[0]+3)*6%1<.12?f.BARKD:void 0}),n.box([-.1,1.6,-.1],[.7,.45,.55],f.WOOD,{round:.03,group:4,paint:e=>e[2]>.4&&Math.abs(e[0]-.1)<.18&&e[1]<1.85?f.NOSE:void 0});for(const[e,t]of[[2.1,.92],[2.35,.72],[2.58,.48],[2.76,.24]])n.ell([-.1,e,-.1],[t,.16,t*.85],f.STRAW,{group:5,paint:i=>Math.abs(Math.sin(Math.atan2(i[2]+.1,i[0]+.1)*18))<.25?f.BARK2:void 0});for(const e of[.72,.95])n.seg([.9,1.1,e],[1.15,0,e],.02,.02,f.WOOD,{group:6});for(let e=0;e<4;e++)n.seg([.92+e*.06,1-e*.26,.72],[.92+e*.06,1-e*.26,.95],.02,.02,f.WOOD,{group:6});for(let e=0;e<26;e++){const t=nt(e,7)*6.283,i=1.5+nt(e,8)*.7,r=[Math.cos(t)*i,0,Math.sin(t)*i*.7],a=.5+nt(e,9)*.5;n.seg(r,A.add(r,[0,a,0]),.028,.02,f.LEAF2,{group:10+e%3}),e%3===0&&n.ell(A.add(r,[0,a-.05,0]),[.025,.07,.025],f.BARKD,{group:13})}},"bog-shrine"(n){jr(n,[.6,.01,.4],[1.4,.9],1),n.seg([0,0,0],[0,1.9,0],.2,.17,f.TRUNK,{group:2,rough:.01,paint:e=>{const t=e[1];return e[2]>.12&&(Math.abs(t-1.6)<.05&&Math.abs(Math.abs(e[0])-.08)<.05||Math.abs(t-1.38)<.04&&Math.abs(e[0])<.1)||t*5%1<.07?f.BARKD:e[1]>1.85?f.MOSS:void 0}}),n.ell([0,1.95,0],[.24,.1,.24],f.MOSS,{group:3});for(let e=0;e<6;e++){const t=e/6*Math.PI*2;n.seg([Math.cos(t)*1,0,Math.sin(t)*.8],[Math.cos(t)*1,.35+nt(e)*.25,Math.sin(t)*.8],.05,.04,f.TRUNK,{group:4})}n.ell([-.25,.06,.3],[.14,.07,.13],f.EAR,{group:5}),Xn(n,[.3,.07,.3],[.09,.07,.08],6,!1),Xn(n,[.15,.05,.42],[.06,.05,.06],7,!1);for(const[e,t,i]of[[.9,.9,.5],[1.4,1.2,.1],[.4,1.4,.8]])n.ell([e,t,i],[.06,.07,.06],f.MAGIC,{group:20+e*10,extra:!0,paint:r=>Math.hypot(r[0]-e,r[1]-t)<.03?f.MAGIC2:void 0});Qr(n,20,2,10,11,.3,f.WEB)},"raven-tree"(n){Vt(n,[[0,0,0,.3],[.1,1.3,0,.22],[-.1,2.5,-.1,.16],[.1,3.6,-.15,.07]],1),[[[.1,1.6,0],[1.3,2.3,.1],[1.8,2.2,.1]],[[-.05,2.1,-.05],[-1.2,2.8,-.1],[-1.6,3.2,-.1]],[[0,2.9,-.1],[.8,3.5,-.2]]].forEach((r,a)=>Vt(n,r.map((s,o)=>[...s,.12-o*.04]),2+a)),Vt(n,[[-.1,.5,0,.22],[-1.1,.1,.5,.08]],5),Vt(n,[[.1,.4,0,.2],[.9,.05,-.4,.08]],5);const t=(r,a)=>{n.ell(r,[.12,.07,.06],f.SHADES,{dir:[1,.2,0],group:a}),n.ell(A.add(r,[.11,.07,0]),[.05,.05,.045],f.SHADES,{group:a}),n.seg(A.add(r,[.15,.07,0]),A.add(r,[.22,.05,0]),.015,.004,f.BODY2,{group:a}),n.seg(A.add(r,[-.1,0,0]),A.add(r,[-.22,-.04,0]),.04,.015,f.SHADES,{group:a})};t([1.3,2.42,.1],10),t([-1.2,2.92,-.1],11),t([.8,3.62,-.2],12),t([-.05,3.72,-.15],13);const i=[1.55,1.45,.1];n.seg([1.55,2.25,.1],A.add(i,[0,.3,0]),.01,.01,f.FRAME,{group:14});for(let r=0;r<6;r++){const a=r/6*Math.PI*2;n.seg(A.add(i,[Math.cos(a)*.2,-.25,Math.sin(a)*.2]),A.add(i,[Math.cos(a)*.12,.3,Math.sin(a)*.12]),.012,.012,f.FRAME,{group:14})}n.seg(A.add(i,[0,-.27,0]),A.add(i,[0,-.25,0]),.22,.22,f.FRAME,{group:14})},barrow(n){n.ell([0,0,-.2],[2.3,.95,1.3],f.LEAF2,{group:1,rough:.03,paint:e=>nt(Math.floor(e[0]*10),Math.floor(e[2]*10)+Math.floor(e[1]*10))<.25?f.LEAF:void 0});for(const e of[-.35,.35])n.box([e,.45,.95],[.12,.45,.12],f.STONE,{round:.03,rough:.01,group:2});n.box([0,.95,.95],[.55,.1,.14],f.STONE,{round:.03,rough:.01,group:3,paint:e=>e[1]>1.02?f.MOSS:void 0}),n.box([0,.4,.9],[.23,.4,.3],f.NOSE,{group:1,cut:!0});for(const[e,t,i]of[[-1.6,1,.7],[1.7,.9,.55]])n.box([e,i/2,t],[.12,i/2,.09],f.STONE,{round:.04,rough:.01,group:4})},cairn(n){let e=0;for(let i=0;i<6;i++){const r=.9-i*.14,a=Math.max(3,9-i);for(let s=0;s<a;s++){const o=s/a*Math.PI*2+i;Xn(n,[Math.cos(o)*r*.8,e+.14,Math.sin(o)*r*.7],[.24-i*.02,.15,.2-i*.02],1+(i+s)%4,i<2)}e+=.26}const t=[0,e+.1,0];for(let i=0;i<6;i++){const r=i/6*Math.PI*2;n.seg(A.add(t,[Math.cos(r)*.12,0,Math.sin(r)*.12]),A.add(t,[Math.cos(r)*.3,.35,Math.sin(r)*.3]),.02,.02,f.FRAME,{group:6})}n.seg(A.add(t,[0,-.3,0]),t,.05,.05,f.FRAME,{group:6}),n.ell(A.add(t,[0,.14,0]),[.2,.07,.2],f.SHADES,{group:7})},"stump-throne"(n){n.ell([0,.28,0],[.92,.34,.86],f.TRUNK,{group:1,rough:.015,paint:rr}),n.ell([0,.58,0],[.84,.06,.78],f.BARKL,{group:1,paint:e=>Math.abs(Math.sin(Math.hypot(e[0],e[2])*30))<.3?f.BARK2:void 0}),n.box([-.55,1.15,0],[.18,.62,.62],f.TRUNK,{round:.1,rough:.01,group:2,paint:rr});for(const e of[-.6,.6])n.box([-.1,.72,e],[.45,.14,.12],f.TRUNK,{round:.06,group:3,paint:rr});for(let e=0;e<6;e++){const t=e/6*Math.PI*2+.3;Vt(n,[[Math.cos(t)*.8,.25,Math.sin(t)*.8,.18],[Math.cos(t)*1.4,.02,Math.sin(t)*1.3,.06]],4)}n.seg([1.5,.18,.8],[1.5,.18,.2],.18,.18,f.TRUNK,{group:5,paint:e=>e[2]>.78||e[2]<.22?f.BARKL:rr(e)}),n.seg([1.5,.3,.5],[1.6,.75,.5],.025,.025,f.WOOD,{group:6}),n.box([1.5,.36,.5],[.1,.06,.015],f.FRAME,{group:6});for(let e=0;e<6;e++){const t=e<3?0:1,i=e%3;n.seg([-1.7+i*.3+t*.15,.15+t*.26,-.7],[-1.7+i*.3+t*.15,.15+t*.26,.2],.14,.14,f.TRUNK,{group:7+e%2,paint:r=>r[2]>.16||r[2]<-.66?f.BARKL:void 0})}},"swing-beech"(n){Vt(n,[[0,0,-.3,.45],[0,1.6,-.3,.36],[-.1,2.8,-.4,.26]],1),Vt(n,[[0,2.2,-.3,.2],[1,2.6,-.2,.14],[1.9,2.75,-.1,.08]],2),Vt(n,[[-.05,2.5,-.35,.18],[-1.2,3,-.4,.1]],3);for(let e=0;e<5;e++){const t=e/5*Math.PI*2;Vt(n,[[Math.cos(t)*.35,.3,-.3+Math.sin(t)*.3,.2],[Math.cos(t)*.9,.02,-.3+Math.sin(t)*.8,.07]],4)}for(const[e,t]of[[[0,3.4,-.6],[1.4,.8,1]],[[1.4,3.1,-.4],[.9,.55,.7]],[[-1.3,3.2,-.6],[.9,.6,.7]]])Jr(n,e,t,5);for(const e of[-.12,.12])n.seg([1.3,2.65,e],[1.3,.55,e],.012,.012,f.STRAW,{group:6});n.box([1.3,.53,0],[.08,.025,.18],f.WOOD,{round:.01,group:6});for(let e=0;e<9;e++)n.ell([(nt(e,1)-.5)*3,.05+nt(e,2)*.5,(nt(e,3)-.3)*1.6],[.022,.022,.022],f.MAGIC,{group:20+e,extra:!0})},bower(n){for(const t of[-.9,0,.9])for(const i of[-.6,.6])n.seg([t,0,i],[t,1.2,i],.04,.04,f.WOOD,{group:1});for(const t of[-.9,0,.9])n.chain([[t,1.2,-.6,.04],[t,1.62,-.3,.04],[t,1.72,0,.04],[t,1.62,.3,.04],[t,1.2,.6,.04]],f.WOOD,{group:2});for(const t of[-.6,.6])for(const i of[.5,1])n.seg([-.9,i,t],[.9,i,t],.025,.025,f.WOOD,{group:3});const e=t=>{const i=nt(Math.floor(t[0]*26),Math.floor(t[1]*26)+Math.floor(t[2]*26)*3);return i<.12?f.BELLY:i<.2?f.STRAW:i>.85?f.LEAF2:void 0};for(const[t,i]of[[[-.6,1.6,0],[.6,.3,.75]],[[.5,1.65,0],[.65,.3,.75]],[[-.95,.9,-.55],[.25,.65,.25]],[[.95,.8,-.6],[.25,.55,.25]],[[-.9,.7,.62],[.22,.5,.2]],[[.2,1.3,-.65],[.5,.4,.2]]])n.ell(t,i,f.LEAF,{group:4,rough:.04,paint:e});n.box([0,.4,-.35],[.6,.04,.15],f.WOOD,{round:.02,group:5});for(const t of[-.5,.5])n.seg([t,0,-.35],[t,.38,-.35],.03,.03,f.WOOD,{group:5})}},Ac={moor:["sleeping-giant","the sleeping giant, a moss mound like a figure lying on its back",1],"fern-forest":["fern-grotto","a ring of giant tree ferns round a stone basin",1],"muddy-forest":["sunken-boat","an old rowing boat sunk in the mud",1.15],"tangly-forest":["bramble-wagon","an old wagon wrapped in brambles",1.1],"wispy-forest":["beehive-tree","a many-trunked tree with a great wild honeycomb",1],"hazel-forest":["fairy-ring","a ring of fairy stones and toadstools",1.1],"twiggy-forest":["charcoal-hut","a charcoal burner's hut of sticks, its mound smouldering",1],ancient:["root-arch","a great arch of roots over mossy stones",1.1],norway:["turf-hut","a log cabin with a turf roof",1.15],"alder-forest":["heron-rookery","an alder holding herons' stick nests",1],meadow:["sundial","a moonlit sundial on a stone dais in a ring of flowers",1.2],"berry-thicket":["bear-den","a bear's den in a bramble mound",1.1],wetland:["stilt-hut","a fisher's hut on stilts over a pool",1.1],bog:["bog-shrine","a carved post shrine to the bog, will-o'-wisps over the pool",1.1],deadwood:["raven-tree","a dead tree where the ravens gather",1],grassland:["barrow","a barrow with a stone doorway",1],heath:["cairn","a tall cairn with an old beacon basket",1.4],"old-pinewood":["stump-throne","a woodcutter's stump throne",1.1],"bluebell-glade":["swing-beech","a great beech with a rope swing, glowworms beneath",1],"honeysuckle-tangle":["bower","a honeysuckle bower with a bench",1.2]};function ah(n,e){const t=n.leaf,i=e.trunkHue??.07;return{[f.TRUNK]:ve(i,.45,.36),[f.BARKD]:ve(i+.03,.5,.17),[f.BARKL]:ve(i,.35,.55),[f.BARK2]:ve(i+.02,.45,.26),[f.LEAF]:ve(t,.55,.45),[f.LEAF2]:ve(t-.03,.5,.62),[f.LEAF3]:ve(t+.03,.6,.26),[f.STONE]:[122,120,128],[f.STONED]:[62,60,70],[f.MOSS]:ve(.26,.45,.45),[f.WOOD]:[128,92,58],[f.STRAW]:[190,162,104],[f.CLOTH]:[228,220,200],[f.EAR]:[168,96,66],[f.FRAME]:[150,128,84],[f.SHADES]:[30,28,36],[f.ACCENT]:[196,40,52],[f.BELLY]:[232,228,214],[f.BODY2]:[210,170,60],[f.FLOWER]:[180,140,230],[f.WEB]:[228,228,234],[f.WATER]:[52,78,104],[f.NOSE]:[16,14,20],[f.GLOW]:[255,120,40],[f.MAGIC]:ve(e.magicHue??.45,.6,1),[f.MAGIC2]:ve(e.magicHue??.45,.2,1),[f.RUNE]:[120,230,255],[f.LINE]:[24,22,30]}}function sh(n,e,t,i=16){const r=new Qe({blend:.05});rh[n](r),r.ell([0,.004,0],[.01,.004,.01],f.NOSE,{group:0});const a=(Object.values(Ac).find(([o])=>o===n)||[,,1])[2],{sp:s}=Ui(r,{scale:th(t)*a});return{sp:s,colours:ah(e,t),metres:{width:+(s.w/i).toFixed(1),height:+(s.h/i).toFixed(1)}}}const oh=1.3,lh=n=>[1,Math.sqrt(n.growth),Math.sqrt(n.growth)*oh,n.growth],Er=(n,e,t=1)=>Math.round(e.size*lh(e)[Math.max(0,Math.min(3,n))]*(2/(e.pixel||2))*1.9*t),Po=(n,e)=>{const t=Lo(e);for(let i=0;i<9;i++){const r=Math.floor(be(t,2,n.w-2)),a=Math.floor(be(t,2,n.h*.6));if(!(n.get(r,a)||n.get(r+1,a)||n.get(r-1,a)||n.get(r,a+1)||n.get(r,a-1))&&(n.px(r,a,f.MAGIC2),i%3===0))for(const[s,o]of[[1,0],[-1,0],[0,1],[0,-1]])n.px(r+s,a+o,f.MAGIC)}};function Va(n,e,t,i,r,a,s,o){const c=A.add(e,[-i*.7,i*(.75+r),t*i*.35]),l=A.norm(A.sub(c,e)),u=A.norm(A.sub([1,0,0],A.mul(l,A.dot([1,0,0],l)))),d=Math.hypot(...A.sub(c,e));n.flat(A.add(A.lerp(e,c,.5),A.mul(u,-i*.14)),l,u,d*.55,i*.34,pr.wing(a,s),{group:o,extra:!0})}const Do=(n,e,t=1)=>n===0?Math.round(Math.max(12,Math.min(30*Math.max(.75,Math.min(1.1,t)),Er(1,e)*t*.72))):n===2?Math.round(Math.max(Er(1,e)*t*1.08,Math.min(Er(2,e,t),Er(1,e)*1.4))):Er(n,e)*t;let Ta=null;function ch(n,e){const t=Ta;Ta=n;try{return e()}finally{Ta=t}}const uh=(n,e)=>{const t=Math.atan2(e,n);return Math.hypot(n,e)<.55+.4*Math.pow(Math.abs(Math.cos(t*2.5+Math.PI/2)),3)},hh=(n,e)=>{const t=n*1.2,i=-e*1.2+.25;return Math.pow(t*t+i*i-.6,3)-t*t*i*i*i<0};function Io(n){const e=Ta,t=n.anchors;if(!e)return;const i=t.head,r=i?Math.max(...i.r):.2;if(e.collar&&(t.neck||i)){const a=t.neck||{c:A.add(i.c,[-i.r[0]*.8,-i.r[1]*.4,0]),r:i.r[1]*.75,dir:A.norm([1,.4,0])},s=A.norm(a.dir),o=A.norm(A.cross(s,Math.abs(s[2])<.9?[0,0,1]:[1,0,0])),c=A.cross(s,o),l=[],u=Math.max(.03,a.r*.2);for(let x=0;x<=16;x++){const g=x/16*Math.PI*2,m=A.add(A.mul(o,Math.cos(g)),A.mul(c,Math.sin(g)));let M=0;for(;M<.8&&n.field(A.add(a.c,A.mul(m,M)))<0;)M+=.01;M>=.8&&(M=a.r),l.push([...A.add(a.c,A.mul(m,M+u*.7)),u])}n.chain(l,f.COLLAR,{group:60,extra:!0});const d=l.reduce((x,g)=>g[0]-g[1]*.6+g[2]*.5>x[0]-x[1]*.6+x[2]*.5?g:x),h=u*1.3*(a.tag||1),p=A.norm(A.add(A.norm(A.sub(d.slice(0,3),a.c)),[.3,-.5,.3]));let _=d.slice(0,3);for(let x=0;x<60&&n.field(_)<h*.4;x++)_=A.add(_,A.mul(p,.01));n.ell(_,[h,h,h*.6],f.COLLAR,{group:60,extra:!0})}if(e.hat!=null&&i){const a=Math.max(r,.13),s=i.top||A.add(Qe.surface(i.c,i.r,A.norm([-.15,1,.1])),[0,r*.1,0]),o=A.norm([.3,1,.35]),c=a*1.5,l=A.add(s,A.mul(o,c));n.seg(A.add(s,A.mul(o,-a*.1)),l,a*.48,a*.04,f.HAT1,{group:61,extra:!0,paint:u=>Math.floor(A.dot(A.sub(u,s),o)/(c/5)+10)%2?f.HAT2:void 0}),n.ell(l,[a*.17,a*.17,a*.17],f.POM,{group:61,extra:!0})}if(e.glasses&&t.eyes&&i){const[a,s]=t.eyes.pts,o=l=>A.add(l,A.mul(A.norm(A.sub(l,i.c)),t.eyes.size*.45)),c=Math.max(t.eyes.size*1.05,r*.1);if(e.glasses==="bar")n.seg(o(a),o(s),c,c,f.SHADES,{group:62,extra:!0}),n.ell(A.add(o(s),[c*.3,c*.5,c*.2]),[c*.25,c*.25,c*.25],f.GLINT,{group:62,extra:!0});else for(const l of[a,s]){const u=A.norm(A.sub(l,i.c)),d=A.norm(A.cross([0,1,0],u)),h=A.cross(u,d),p=e.glasses==="heart"?hh:uh,_=c*1.5;n.flat(o(l),d,h,_,_,(x,g)=>p(x,g)?p(x*1.3,g*1.3)?f.SHADES:f.FRAME:null,{group:62,bend:.1,extra:!0}),n.seg(o(a),o(s),c*.18,c*.18,f.FRAME,{group:62,extra:!0})}}if(e.shoes)for(const a of t.feet){const s=e.shoes==="platform",o=a.r,c=A.add(a.c,[o*.25,o*(s?.35:.15),0]);n.ell(c,[o*1.45,o*(s?1.2:.85),o*1.15],f.SHOE,{group:a.group,extra:!0,paint:l=>l[1]<c[1]-o*(s?.45:.4)?f.SOLE:e.shoes==="glitter"&&Tn(l,60,.28)?f.GLINT:void 0})}}function dh(n,e,t,i,r="towards"){const a={legW:1,earS:1,hgt:1,bw:.3,...n.q},s=e===3,o=e===1,c=e===0,l=N=>s&&n.legend.includes(N),u=new Qe,d=a.hr*(c?1.75:o?1.25:1)*(i.head/.44)**.5,h=a.len*(c?.8:o?.9:1.02)*i.long,p=c?.55:o?.9:1.04,_=t?-.04:0,x=1+_,g=a.chest*(s?1.06:1)/p+_,m=a.tuck/p+_,M=a.bw*(c?1.15:e>=2?1.06:1)*(a.legW>1.2?1.15:1),E=.06*a.legW*(s?1.1:c?1.7:1),b=a.back==="hump"?.1:0,R=a.back==="arch"?.1:0,w=g+.12,P=N=>{if(a.belly&&N[1]<w&&N[0]>-h*.5)return f.BELLY;if(a.saddle&&N[1]>x-.18&&N[0]<h*.55)return f.BODY2;if(a.spots&&N[1]>g+.1&&Tn(N,10,.22))return a.spotMat==="belly"||a.spots==="young"&&o?f.BELLY:a.spots==="young"?void 0:f.BODY3;if(a.ridge&&N[1]>x-.08+b*.5)return f.BODY3};if(u.ell([h*.48,(x+g)/2+b*.5,0],[h*.62,(x-g)/2+b*.5,M],f.BODY,{paint:P}),u.ell([-h*.5,(x+m)/2+R*.6,0],[h*.58,(x-m)/2+R*.6,M*.93],f.BODY,{paint:P}),u.ell([0,(x+(g+m)/2)/2+.02,0],[h*.6,(x-(g+m)/2)/2,M*.9],f.BODY,{paint:P}),a.ridge)for(let N=0;N<(s?16:10);N++){const re=-h*.8+N*h*1.75/(s?15:9),ce=(.07+(s?.04:0))*(1+.5*Math.max(0,re/h));u.ell([re,x+.02+b*Math.max(0,1-Math.abs(re/h-.5)*2)+ce*.5,0],[ce,.03,M*.25],f.BODY3,{dir:[-.3,1,0],up:[1,0,0]})}if(a.wool)for(let N=0;N<14;N++){const re=N/14*Math.PI*2;u.ell([h*Math.cos(re)*.7,(x+g)/2+Math.sin(re)*.2,M*(N%2?.5:-.5)],[.16,.14,.14],f.BODY)}const S=[.32,-.32][t],T=(N,re)=>{const ce=re*M*.62,Re=N?h*.62:-h*.62,Oe=(N?1:-1)*re*S,ke=N?g+.1:m+.15,j=(N?re:-re)*(t?1:-1)>0?.06:0,ie=[Re+Math.sin(Oe)*.2+(N?.02:.1),Math.max(.3,ke*.55),ce],H=[Re+Math.sin(Oe)*.42,.05+j,ce],ue=[Re,ke+.12,ce*.8],se=re>0?a.legMat||f.BODY:a.legMat?f.BODY3:f.BODY2,ye=N?[[...ue,E*1.5],[...ie,E*1.05],[...H,E*.9]]:[[...ue,E*2*(a.haunch||1)],[...A.add(ie,[-.12,.06,0]),E*1.2],[...A.add(H,[-.06*(a.hindFoot||1),.12,0]),E*.9],[...H,E*.9]];u.chain(ye,se,{group:re>0?6+(N?1:0):2,paint:a.socks?Ce=>Ce[1]<a.socks?f.BODY3:void 0:void 0});const qe=(a.paw==="hoof"?.07:.09)*a.legW**.5*(N?1:a.hindFoot||1);u.ell(A.add(H,[qe*.5,-.01,0]),[qe,E*.9,E*1.1],a.paw==="hoof"?f.NOSE:se,{group:re>0?6+(N?1:0):2}),u.anchors.feet.push({c:A.add(H,[qe*.5,-.01,0]),r:Math.max(qe,E*1.1),group:re>0?6+(N?1:0):2})};for(const N of[-1,1])T(!0,N),T(!1,N);const I=[h*.82,x-.12,0],C=[I[0]+Math.cos(a.neckAng)*a.neck*.9,I[1]+Math.sin(a.neckAng)*a.neck*.9+(c?.1:0),0];u.seg(I,C,a.neckW*.55,a.neckW*.42,f.BODY,{paint:N=>a.belly&&N[1]<(I[1]+C[1])/2-.05?f.BELLY:a.face==="dark"?f.BODY2:void 0});const O=N=>{if(a.face==="badger")return Math.abs(N[2])<d*.22+(N[0]-C[0])*.1||N[1]<C[1]-d*.1?f.BELLY:f.BODY3;if(a.face==="dark")return f.BODY2;if((a.belly||a.muzzle)&&N[1]<C[1]-d*.35)return f.BELLY};u.ell(C,[d*1.05,d*.92,d*.88],f.BODY,{paint:O});const F=d*a.snout*(c?.55:o?.78:1),D=d*a.snoutD*.55,B=[C[0]+d*.65+F*.5,C[1]-d*.28,0];u.ell(B,[F*.62+d*.2,D,D*.95],f.BODY,{dir:[1,-.25,0],paint:N=>(a.muzzle||a.belly)&&N[1]<B[1]-D*.1?f.BELLY:O(N)});const W=[B[0]+F*.62+d*.1,B[1]-.02,0];u.ell(W,[d*(a.disc?.1:.12),d*(a.disc?.2:.12),d*(a.disc?.2:.15)],f.NOSE,{group:1});for(const N of[-1,1]){const re=Qe.surface(C,[d*1.05,d*.92,d*.88],A.norm([.75,.32,N*.62]));u.ell(re,[d*.13,d*.16,d*.13].map(ce=>ce*(a.eyeK||1)*(c?1.5:o?1.2:1)),s&&!a.tusks?f.MAGIC2:f.EYE,{group:1})}u.anchors.head={c:C,r:[d*1.05,d*.92,d*.88],top:[C[0]-d*.1,C[1]+d*.82,0]},u.anchors.eyes={pts:[-1,1].map(N=>Qe.surface(C,[d*1.05,d*.92,d*.88],A.norm([.75,.32,N*.62]))),size:d*.16*(a.eyeK||1)*(c?1.5:o?1.2:1)},u.anchors.neck={c:A.lerp(I,C,c?.05:o?.25:.42),r:a.neckW*.5*(c?1.3:o?1.12:1),dir:A.norm(A.sub(C,I)),tag:c?1.8:o?1.3:1};for(const N of[-1,1]){const re=a.ear,ce=[C[0]-d*.15,C[1]+d*.7,N*d*.5],Re=a.earS*(c?1.2:1)*(a.ear==="long"?.62:1);if(re==="none")continue;if(re==="round"){u.ell(ce,[d*.22,d*.25*Re,d*.1],f.BODY,{group:1,paint:ye=>ye[0]>ce[0]+d*.02?f.EAR:void 0});continue}const Oe=re==="long",ke=re==="small"?-.6:0,j=d*.55*Re*(re==="big"?1.35:Oe?2.2:1),ie=d*.3*(re==="big"?1.2:Oe?1.35:1),H=A.norm([ke*.6-(Oe?.3:.12),1,N*.3]),ue=A.norm([.55,.2,N]),se=A.norm(A.cross(ue,H));u.flat(A.add(ce,A.mul(H,j)),se,H,ie,j,pr.ear(f.BODY,f.EAR,f.BODY3),{group:5+(N>0?0:20),extra:Oe}),re==="tuft"&&u.seg(A.add(ce,[0,j*1.4,N*.02]),A.add(ce,[0,j*1.85,N*.04]),d*.05,d*.02,f.BODY3,{group:1})}const $=[-h*1.05,x-.1+R*.5,0],ae=t?.04:-.02;if(l("tails")||fh(u,l("starTail")?"star":a.tail,$,h,x,ae),a.horns)for(const N of[-1,1]){const re=o?.6:c?.35:l("hornsGlow")?1.4:1,ce=[];for(let Re=0;Re<=8;Re++){const Oe=.3-Re/8*Math.PI*1.6,ke=d*.65*re*(1-.45*Re/8);ce.push([C[0]-d*.1+Math.cos(Oe)*ke,C[1]+d*.45+Math.sin(Oe)*ke,N*(d*.6+Re*.015)]),ce[Re].push(d*.2*re*(1-.6*Re/8))}u.chain(ce,l("hornsGlow")?f.MAGIC:f.ACCENT,{group:13})}if(a.antlers||l("jackalope"))for(const N of[-1,1])ph(u,a,[C[0]-d*.05,C[1]+d*.75,N*d*.4],N,e,l);if(a.tusks)for(const N of[-1,1]){const re=o?.4:c?0:l("tusksBig")?1.3:.75;if(!re)continue;const ce=[B[0]+F*.25,B[1]-D*.4,N*D*.8];u.chain([[...ce,.045*re],[...A.add(ce,[.1*re,.1*re,N*.03]),.04*re],[...A.add(ce,[.06*re,.24*re,N*.05]),.02*re]],f.ACCENT,{group:8})}a.teeth&&!c&&u.ell([W[0]-d*.1,W[1]-d*.25,0],[d*.08,d*.14,d*.12],f.ACCENT,{group:1});const q=N=>[-h*.9+N*h*1.65,x+b*Math.max(0,1-Math.abs(N-.8)*3)+R*(1-Math.abs(N-.4)*2),0];if(l("wings"))for(const N of[-1,1])Va(u,[h*.2,x,N*M*.5],N,1.15,t?.1:0,N>0?f.MAGIC2:f.MAGIC,f.MAGIC,40+(N>0?10:0));if(l("mane")||l("flames"))for(let N=0;N<7;N++){const re=N/6,ce=A.lerp(A.add(C,[-d*.5,d*.3,0]),q(.55),re),Re=[.4,.3,.45,.28,.38,.25,.3][N],Oe=A.norm([-.35-(t?.1:0),1,0]);u.flat(A.add(ce,A.mul(Oe,Re*.5)),[1,0,0],Oe,Re*.32,Re*.55,pr.flame(N%2?f.MAGIC:f.MAGIC2,f.MAGIC2),{group:60+N%2,extra:!0})}if(l("tails"))for(let N=0;N<7;N++){const re=Math.PI*(.55+N*.08),ce=(N-3)*.1,Re=A.add($,[Math.cos(re)*.9,Math.sin(re)*.85,ce]);u.chain([[...$,.1],[...A.lerp($,Re,.5),.17],[...Re,.08]],N%2?f.BODY2:f.BODY,{group:70,extra:!0}),u.ell(Re,[.09,.09,.09],f.MAGIC2,{group:71,extra:!0})}if(l("crystals")&&[.15,.3,.45,.6,.75].forEach((N,re)=>{const ce=q(N),Re=[.3,.5,.4,.6,.35][re];u.ell(A.add(ce,[0,Re*.45,(re%2-.5)*.1]),[Re*.55,.08,.08],f.MAGIC,{dir:[(re-2)*.12,1,0],group:80+re%2,extra:!0,paint:Oe=>Oe[2]>0?f.MAGIC2:void 0})}),l("moss")){for(let N=0;N<6;N++)u.ell(q(.08+N*.15),[h*.22,.07,M*.85],f.LEAF,{group:85,extra:!0});for(const[N,re]of[[.25,.55],[.5,.8],[.75,.45]]){const ce=q(N);u.seg(ce,A.add(ce,[0,re*.7,0]),.04,.025,f.TRUNK,{group:86,extra:!0}),u.ell(A.add(ce,[0,re*.8,0]),[re*.28,re*.26,re*.28],f.LEAF2,{group:87,extra:!0,paint:Re=>Re[1]<ce[1]+re*.72?f.LEAF3:void 0})}for(const N of[.12,.4,.65,.9]){const re=q(N);u.ell(A.add(re,[0,.12,M*.3]),[.07,.035,.07],f.MAGIC,{group:89,extra:!0})}}if(l("ribbons"))for(let N=0;N<3;N++){const re=[];for(let ce=0;ce<9;ce++){const Re=ce/8;re.push([h*(.5-Re*2.2),x+.05+N*.1+Re*(.25+N*.12)+Math.sin(Re*6+t+N)*.07,(N-1)*.18,.04*(1-Re*.6)])}u.chain(re,N%2?f.MAGIC2:f.MAGIC,{group:90+N,extra:!0})}Io(u);const{sp:ee}=Ui(u,{height:Do(e,i,a.hgt),facing:r});return s&&Po(ee,n.id.length*7919),ee}function fh(n,e,t,i,r,a){const s={group:3},o=c=>-i*c;e==="brush"?n.chain([[...t,.1],[o(1.3),r-.25+a,0,.15],[o(1.4),r-.55,0,.14],[o(1.35),.38+a,0,.09]],f.BODY,{...s,paint:c=>c[1]<.32?f.BODY3:void 0}):e==="bushy"?n.chain([[...t,.1],[o(1.05)-.35,r-.05+a,0,.17],[o(1.05)-.75,r-.2+a,0,.18],[o(1.05)-1,r-.35+a,0,.1]],f.BODY,{...s,paint:c=>c[0]<o(1.05)-.82?f.BELLY:void 0}):e==="stub"||e==="deer"||e==="bob"?n.ell(A.add(t,[-.06,.02+a,0]),[.1,.08,.07],e==="deer"?f.BELLY:f.BODY,{...s,paint:e==="bob"?c=>c[0]<t[0]-.08?f.BODY3:void 0:void 0}):e==="puff"?n.ell(A.add(t,[-.04,.02,0]),[.11,.11,.1],f.BELLY,s):e==="squirrel"||e==="star"?n.chain([[...t,.12],[o(1.3),r+.05+a,0,.25],[o(1.3),r+.6+a,0,.3],[o(1),r+.95+a,0,.27],[o(.65),r+.9+a,0,.16]],e==="star"?f.MAGIC:f.BODY,{...s,extra:!0,paint:e==="star"?c=>Tn(c,14,.12)?f.GLINT:void 0:void 0}):e==="otter"?n.chain([[...t,.17],[o(1.3),r-.45+a,0,.12],[o(1.6),.1,0,.07],[o(1.85),.06+a,0,.03]],f.BODY,s):e==="stoat"?n.chain([[...t,.08],[o(1.3),r-.12+a,0,.07],[o(1.6),r-.05+a,0,.06]],f.BODY,{...s,paint:c=>c[0]<o(1.45)?f.BODY3:void 0}):e==="flat"?(n.seg(t,[o(1.15),.3,0],.08,.07,f.BODY2,s),n.ell([o(1.4),.1+a*.5,0],[.28,.03,.14],f.BODY3,s)):e==="thin"&&(n.chain([[...t,.04],[o(1.1),r-.3,0,.03],[o(1.12)+a,r-.55,0,.025]],f.BODY,s),n.ell([o(1.12)+a,r-.62,0],[.04,.07,.04],f.BODY3,s))}function ph(n,e,t,i,r,a){const s=!e.antlers,o=s?.45:[0,.5,.95,.95][r]*(a("antlersGlow")?1.15:1),c=a("antlersGlow")?i>0?f.MAGIC2:f.MAGIC:f.ACCENT,l={group:11+(i>0?1:0),extra:!0};if(!o)return;const u=.045*Math.max(.8,o),d=i*.35*o;if(e.antlers==="palm"){const g=A.add(t,[-.06*o,.12*o,d*.3]);n.seg(t,g,u*1.3,u*1.2,c,l);for(let m=0;m<5;m++){const M=.35+m*.3,E=A.norm([-Math.cos(M),Math.sin(M)*.9,i*.55]),b=(.24+.05*(m%2))*o;n.ell(A.add(g,A.mul(E,b*.55)),[b*.6,u*1.5,u*.6],c,{...l,dir:E,up:[0,0,1]})}return}const h=A.add(t,[-.18*o,.3*o,d*.4]),p=A.add(t,[-.25*o,.62*o,d*.8]),_=A.add(t,[-.1*o,.95*o,d]);n.chain([[...t,u*1.2],[...h,u],[...p,u*.85],[..._,u*.4]],c,l);const x=(g,m,M,E)=>n.seg(g,A.add(g,A.mul(A.norm(m),M)),E,E*.35,c,l);x(A.add(t,[-.04*o,.1*o,d*.1]),[1,.6,0],.28*o,u*.8),(o>.4||s)&&x(h,[1,.9,0],.3*o,u*.7),o>.7&&(x(p,[.8,1,0],.28*o,u*.6),x(_,[.3,1,i*.2],.18*o,u*.5))}function mh(n,e,t,i,r="towards"){const a=e===3,s=e===1,o=e===0,c=_=>a&&n.legend.includes(_),l=new Qe,u=t?.03:0,d=o?.48:s?.42:.36,h=(o?.95:1.08)+u;for(const _ of[-1,1]){const x=t&&_>0?.04:0;l.seg([.05,.2,_*.14],[.08,.05+x,_*.15],.07,.06,f.BODY2,{group:2});for(const g of[-.04,0,.04])l.ell([.16,.03+x,_*.15+g],[.06,.025,.02],f.ACCENT,{group:2});l.anchors.feet.push({c:[.13,.04+x,_*.15],r:.08,group:_>0?6:2})}if(l.ell([-.32,.32,0],[.22,.06,.14],f.BODY2,{dir:[-1,-.6,0],group:3}),l.ell([0,.55+u,0],[.36,.52,.36],f.BODY,{paint:_=>_[0]>.12&&_[1]<h-d*.5?Math.floor(_[1]*18)%3===0&&Tn(_,16,.5)?f.BODY2:f.BELLY:void 0}),!c("wings"))for(const _ of[-1,1])l.ell([-.06,.58+u,_*.3],[.4,.3,.08],f.BODY2,{dir:[-.3,-1,0],up:[1,0,0],group:_>0?4:2,paint:x=>Tn(x,12,.15)?f.BODY3:void 0});l.ell([0,h,0],[d,d*.9,d],f.BODY);for(const _ of[-1,1]){const x=A.norm([.75,-.05,_*.4+.35]),g=A.add(Qe.surface([0,h,0],[d,d*.9,d],x),A.mul(x,-d*.05));l.ell(g,[d*.22,d*.46,d*.4],f.BELLY,{group:1,dir:x});const m=A.add(g,A.mul(x,d*.14));l.ell(m,[d*.1,d*.26,d*.24].map(M=>M*(o?1.15:1)),a?f.MAGIC:f.IRIS,{group:1,dir:x}),l.ell(A.add(m,A.mul(x,d*.07)),[d*.08,d*.14,d*.13].map(M=>M*(o?1.15:1)),a?f.MAGIC2:f.EYE,{group:1,dir:x}),(l.anchors.eyes||={pts:[],size:d*.22}).pts.push(A.add(m,A.mul(x,d*.07))),o||l.ell([d*.05,h+d*.8,_*d*.6],[d*.32,d*.12,d*.08],f.BODY2,{dir:[-.1,1,_*.7],up:[1,0,0],group:1})}if(l.ell(Qe.surface([0,h,0],[d,d*.9,d],A.norm([.75,-.35,.35])),[d*.2,d*.12,d*.1],f.ACCENT,{dir:[.6,-1,.3],group:1}),c("wings"))for(const _ of[-1,1])Va(l,[-.05,.8+u,_*.3],_,1.3,t?.12:0,_>0?f.MAGIC2:f.MAGIC,f.MAGIC,40+(_>0?10:0));if(c("eyesRing"))for(let _=0;_<7;_++){const x=Math.PI*(.15+_/6*.7);l.ell([Math.cos(x)*.2-.1,h+.1+Math.sin(x)*.6,(_-3)*.15],[.07,.07,.07],f.MAGIC2,{group:95+_,extra:!0}),l.ell([Math.cos(x)*.2-.05,h+.1+Math.sin(x)*.6,(_-3)*.15],[.035,.035,.035],f.EYE,{group:95+_,extra:!0})}l.anchors.head={c:[0,h,0],r:[d,d*.9,d]},l.anchors.neck={c:[0,h-d*.75,0],r:d*.85,dir:[0,1,0]},Io(l);const{sp:p}=Ui(l,{height:Do(e,i,.95),facing:r});return a&&Po(p,31),p}const Si=(n,e,t,i,r,a,s=1)=>{for(const o of i)n.ell(Qe.surface(e,t,A.norm(o)),[r,r*1.2,r],a,{group:s});n.anchors.head||={c:e,r:t},n.anchors.eyes||={pts:i.map(o=>Qe.surface(e,t,A.norm(o))),size:r}},Tc=(n,e,t)=>n.ell([e,.005,0],[t,.005,t*.6],f.NOSE,{group:0});function Mn(n,e,t,i,r,a){Io(n);const{sp:s}=Ui(n,{height:Do(t,i,r),facing:a});return t===3&&Po(s,e.id.length*131),s}const Rc=(n,e,t)=>{n.ell(e,[t,t*.35,t],f.MAGIC,{group:95,extra:!0,paint:i=>i[1]>e[1]?f.MAGIC2:void 0});for(let i=0;i<5;i++){const r=i/5*Math.PI*2;n.ell(A.add(e,[Math.cos(r)*t*.8,t*.55,Math.sin(r)*t*.8]),[t*.38,t*.12,t*.12],f.MAGIC,{dir:[0,1,0],up:[1,0,0],group:96,extra:!0})}},No=(n,e)=>e.forEach(([t,i],r)=>n.ell(A.add(t,[0,i*.45,0]),[i*.55,.07,.07],f.MAGIC,{dir:[(r%3-1)*.25,1,(r%2-.5)*.3],group:80+r%2,extra:!0,paint:a=>a[2]>t[2]?f.MAGIC2:void 0}));function gh(n,e,t,i,r="towards"){const a=e===3,s=new Qe,o=t?.03:0;for(const[d,h]of[[.28,.2],[.28,-.2],[-.28,.2],[-.28,-.2]])s.seg([d,.15,h],[d+(h>0?o:-o),.03,h],.06,.05,f.BODY3,{group:h>0?6:2}),s.anchors.feet.push({c:[d+.03+(h>0?o:-o),.03,h],r:.065,group:h>0?6:2});const c=[0,.32,0],l=[.5,.32,.38];s.ell(c,l,f.BODY2,{paint:d=>Tn(d,22,.3)?f.BODY3:Tn(d,19,.12)?f.BELLY:void 0});for(let d=0;d<46;d++){const h=d*2.399%(Math.PI*2),p=d/46*.9+.05,_=A.norm([Math.cos(h)*Math.sin(p*Math.PI*.5)-.25,Math.cos(p*Math.PI*.5)*.9+.1,Math.sin(h)*Math.sin(p*Math.PI*.5)]);_[0]>.55||s.ell(A.add(Qe.surface(c,l,_),A.mul(_,.02)),[.1,.025,.025],d%4?f.BODY2:f.BODY3,{dir:A.add(_,[-.4,0,0]),group:1})}const u=[.48,.22,0];return s.ell(u,[.22,.14,.15],f.BELLY,{dir:[1,-.3,0],group:1}),s.ell([.69,.16,0],[.04,.04,.04],f.NOSE,{group:1}),Si(s,u,[.22,.14,.15],[[.3,.6,.55],[.3,.6,-.55]],.035,a?f.MAGIC2:f.EYE),a&&No(s,[[[-.3,.55,.1],.35],[[-.05,.62,-.1],.5],[[.2,.55,.12],.4],[[-.15,.58,.2],.3]]),Mn(s,n,e,i,.6,r)}function _h(n,e,t,i,r="towards"){const a=e===3,s=new Qe,o=t?.05:0;for(const u of[-1,1])s.ell([-.22,.16,u*.36],[.24,.13,.12],u>0?f.BODY:f.BODY2,{dir:[1,.3,0],group:u>0?6:2,paint:d=>Tn(d,14,.15)?f.BODY3:void 0}),s.ell([.05,.04,u*.4],[.16,.04,.08],u>0?f.BODY:f.BODY2,{group:u>0?6:2}),s.seg([.35,.2+o,u*.24],[.42,.03,u*.3],.05,.04,u>0?f.BODY:f.BODY2,{group:u>0?7:2}),s.anchors.feet.push({c:[.45,.03,u*.3],r:.06,group:u>0?7:2},{c:[.12,.04,u*.4],r:.08,group:u>0?6:2});const c=[0,.3+o,0],l=[.5,.28,.4];s.ell(c,l,f.BODY,{paint:u=>u[1]<c[1]-.12?f.BELLY:u[0]>.38&&Math.abs(u[1]-(c[1]-.02))<.018?f.LINE:Tn(u,14,.22)?f.BODY3:void 0});for(const u of[-1,1]){const d=[.3,.55+o,u*.17];s.ell(d,[.1,.09,.1],f.BODY,{group:1}),s.ell(Qe.surface(d,[.1,.09,.1],A.norm([.6,.5,u*.5])),[.05,.05,.05],a?f.MAGIC2:f.IRIS,{group:1}),s.ell(Qe.surface(d,[.11,.1,.11],A.norm([.65,.45,u*.5])),[.03,.015,.03],f.EYE,{group:1})}return s.anchors.head={c:[.22,.45+o,0],r:[.3,.2,.3],top:[.18,.62+o,0]},s.anchors.eyes={pts:[-1,1].map(u=>Qe.surface([.3,.55+o,u*.17],[.1,.09,.1],A.norm([.6,.5,u*.5]))),size:.05},s.anchors.neck={c:[.32,.3+o,0],r:.25,dir:[1,.3,0]},a&&Rc(s,[.15,.66+o,0],.16),Mn(s,n,e,i,.55,r)}function xh(n,e,t,i,r="towards"){const a=e===3,s=e===1,o=h=>a&&n.legend.includes(h),c=new Qe,l=t?.02:0;for(const h of[-1,1]){const p=t&&h>0?.04:0;c.seg([0,.3,h*.08],[.03,.03+p,h*.08],.03,.025,f.NOSE,{group:h>0?7:2}),c.ell([.08,.02+p,h*.08],[.08,.015,.04],f.NOSE,{group:2}),c.anchors.feet.push({c:[.07,.03+p,h*.08],r:.06,group:h>0?7:2})}if(c.ell([-.55,.42,0],[.32,.035,.12],f.BODY2,{dir:[-1,-.25,0],group:3}),c.ell([0,.52+l,0],[.42,.26,.24],f.BODY,{dir:[1,.45,0]}),!o("wings"))for(const h of[-1,1])c.ell([-.1,.55+l,h*.2],[.45,.17,.05],f.BODY2,{dir:[-1,-.25,0],group:h>0?4:2});const u=[.36,.84+l,0],d=s?.19:.16;if(c.ell(u,[d*1.1,d,d*.95],f.BODY,{paint:h=>h[1]>u[1]+d*.55?f.BELLY:void 0}),c.ell(A.add(u,[d*1.5,-d*.25,0]),[d*1,d*.38,d*.3],f.NOSE,{dir:[1,-.2,0],group:1}),Si(c,u,[d*1.1,d,d*.95],[[.55,.35,.65],[.55,.35,-.65]],d*.16,a?f.MAGIC2:f.EYE),o("wings"))for(const h of[-1,1])Va(c,[-.05,.65+l,h*.18],h,1.1,t?.1:0,h>0?f.MAGIC2:f.MAGIC,f.MAGIC,40+(h>0?10:0));if(o("eyesRing"))for(let h=0;h<6;h++){const p=Math.PI*(.2+h/5*.6);c.ell([Math.cos(p)*.25-.1,.95+Math.sin(p)*.45,(h-2.5)*.12],[.06,.06,.06],f.MAGIC2,{group:95+h,extra:!0})}return Mn(c,n,e,i,.75,r)}function vh(n,e,t,i,r="towards"){const a=e===3,s=h=>a&&n.legend.includes(h),o=new Qe,c=t===0,l=.55,u=s("wingsBig")?1.5:1;Tc(o,0,.3*u);for(const h of[-1,1]){const p=[0,l+.05,h*.1],_=[.05,l+(c?.35:-.05),h*.45*u],x=[[-.05,l+(c?.45:-.15),h*.85*u],[-.25,l+(c?.2:-.25),h*.75*u],[-.3,l+(c?0:-.25),h*.4*u]],g=s("wingsBig")?f.MAGIC:f.BODY2,m=s("wingsBig")?f.MAGIC2:f.BODY3;o.seg(p,_,.03,.025,m,{group:11});for(const w of x)o.seg(_,w,.02,.012,m,{group:11});const M=A.sub(x[0],p),E=A.norm(M),b=A.norm(A.sub(x[2],_)),R=A.norm(A.sub(b,A.mul(E,A.dot(b,E))));o.flat(A.add(A.lerp(p,x[0],.5),A.mul(R,.12*u)),E,R,Math.hypot(...M)*.55,.3*u,pr.membrane(g),{group:10+(h>0?1:0),bend:.2})}o.ell([0,l,0],[.13,.16,.12],f.BODY,{group:1});const d=[.08,l+.2,0];o.ell(d,[.12,.11,.11],f.BODY,{group:1});for(const h of[-1,1])o.ell(A.add(d,[-.02,.15,h*.07]),[.12,.045,.02],f.BODY,{dir:[.1,1,h*.3],up:[1,0,0],group:1,paint:p=>p[0]>d[0]-.01?f.EAR:void 0});return Si(o,d,[.12,.11,.11],[[.7,.2,.5],[.7,.2,-.5]],.025,a?f.MAGIC2:f.EYE),o.ell(Qe.surface(d,[.12,.11,.11],[1,-.2,0]),[.025,.02,.03],f.NOSE,{group:1}),Mn(o,n,e,i,.55,r)}function Mh(n,e,t,i,r="towards"){const a=e===3,s=new Qe,o=t?.03:0;s.seg([-.5,.18,0],[-.62,.12,0],.04,.02,f.SKIN,{group:3});for(const c of[-1,1])s.ell([-.3,.05,c*.2],[.07,.04,.05],f.SKIN,{group:c>0?6:2}),s.anchors.feet.push({c:[-.3,.05,c*.2],r:.07,group:c>0?6:2});s.ell([0,.3,0],[.52,.29,.33],f.BODY,{paint:c=>c[1]>.45?f.BODY2:void 0}),s.ell([.55,.24,0],[.2,.07,.07],f.SKIN,{dir:[1,-.15,0],group:1}),s.ell([.74,.21,0],[.04,.05,.06],f.NOSE,{group:1});for(const c of[-1,1]){const l=[.32,.1-(c>0?o:0),c*.34];s.ell(l,[.13,.035,.12],f.SKIN,{group:c>0?7:2,axes:[[1,0,0],[0,1,0],[0,0,1]]});for(let u=0;u<4;u++)s.ell(A.add(l,[.14,-.01,c*(u-1.5)*.05]),[.05,.015,.015],f.ACCENT,{group:c>0?7:2})}for(const c of[-1,1])s.ell(Qe.surface([0,.3,0],[.52,.29,.33],A.norm([.85,.3,c*.35])),[.015,.015,.015],a?f.MAGIC2:f.EYE,{group:1});return s.anchors.head={c:[.32,.34,0],r:[.25,.22,.25],top:[.3,.58,0]},s.anchors.eyes={pts:[-1,1].map(c=>Qe.surface([0,.3,0],[.52,.29,.33],A.norm([.85,.3,c*.35]))),size:.03},s.anchors.neck={c:[.36,.3,0],r:.27,dir:[1,.1,0]},a&&Rc(s,[.15,.62,0],.15),Mn(s,n,e,i,.55,r)}function Sh(n,e,t,i,r="towards"){const a=e===3,s=d=>a&&n.legend.includes(d),o=new Qe;for(const d of[-1,1])for(let h=0;h<3;h++){const p=.25-h*.25,_=(h+(d>0?1:0)+t)%2?.06:-.06,x=[p,.22,d*.2];o.chain([[...x,.03],[p+_+(1-h)*.06,.32,d*.42,.025],[p+_*1.5+(1-h)*.15,.02,d*.55,.015]],d>0?f.BODY2:f.BODY3,{group:d>0?7:2})}o.ell([-.12,.34,0],[.46,.24,.32],f.BODY,{paint:d=>Math.abs(d[2])<.018&&d[1]>.4?f.LINE:d[1]>.5&&d[2]>.05&&d[2]<.17?f.BELLY:void 0}),o.ell([.38,.33,0],[.16,.16,.26],f.BODY,{group:1});const c=[.56,.3,0];o.ell(c,[.1,.1,.17],f.BODY2,{group:1});const l=[.3,.5,.7,.75][e]*(s("horn")?1.3:1),u=s("horn")?f.MAGIC:f.BODY3;for(const d of[-1,1]){const h=A.add(c,[.08,.02,d*.1]),p=A.add(h,[l*.7,l*.45,d*l*.15]),_=A.add(p,[l*.25,-l*.12,-d*l*.12]);o.chain([[...h,.045],[...p,.035],[..._,.015]],u,{group:8+(d>0?1:0)}),o.seg(A.lerp(h,p,.55),A.add(A.lerp(h,p,.55),[0,l*.22,0]),.02,.008,u,{group:8})}for(const d of[-1,1])o.chain([[...A.add(c,[.05,.06,d*.1]),.012],[c[0]+.1,.5,d*.22,.012],[c[0]+.2,.5,d*.26,.012]],f.BODY3,{group:9,extra:!0});return Si(o,c,[.1,.1,.17],[[.4,.3,.85],[.4,.3,-.85]],.032,a?f.MAGIC2:f.EYE,9),s("crystals")&&No(o,[[[-.35,.5,.1],.3],[[-.1,.55,-.08],.45],[[.1,.5,.1],.35]]),Mn(o,n,e,i,.5,r)}function bh(n,e,t,i,r="towards"){const a=e===3,s=new Qe,o=t?.04:0;s.ell([0,.07,0],[.6+o,.07,.17],f.SKIN,{group:1}),s.chain([[.45+o,.08,0,.1],[.6+o,.25,0,.09],[.68+o,.28,0,.08]],f.SKIN,{group:1});for(const u of[-1,1])s.seg([.7+o,.32,u*.04],[.78+o,.55,u*.1],.018,.014,f.SKIN,{group:5}),s.ell([.78+o,.57,u*.1],[.03,.03,.03],a?f.MAGIC2:f.EYE,{group:5});s.anchors.head={c:[.68+o,.3,0],r:[.09,.08,.09],top:[.66+o,.38,0]},s.anchors.eyes={pts:[-1,1].map(u=>[.78+o,.57,u*.1]),size:.03},s.anchors.neck={c:[.55+o,.17,0],r:.1,dir:[1,1.2,0]};const c=[-.12,.4,0],l=a?f.MAGIC:f.BODY;return s.ell(c,[.32,.32,.22],l,{group:3,paint:u=>{const d=Math.atan2(u[1]-c[1],u[0]-c[0]);return((Math.hypot(u[0]-c[0],u[1]-c[1])/.32-d/(Math.PI*2)*.3)%.3+.3)%.3<.06?a?f.MAGIC2:f.BODY3:void 0}}),Mn(s,n,e,i,.45,r)}function Eh(n,e,t,i,r="towards"){const a=e===3,s=new Qe;for(const o of[-1,1])for(let c=0;c<7;c++){const l=-.45+c*.15,u=(c+t)%2?.03:-.03;s.seg([l,.1,o*.22],[l+u,.01,o*.33],.025,.015,f.BODY3,{group:o>0?7:2})}for(const o of[-1,1])s.chain([[.5,.15,o*.08,.02],[.7,.3,o*.2,.015],[.82,.22,o*.26,.012]],f.BODY3,{group:9,extra:!0});return s.ell([0,.18,0],[.58,.2,.3],f.BODY,{paint:o=>(Math.floor((o[0]+.6)*9)%2&&o[1]>.2?f.BODY2:void 0)||(Math.abs((o[0]+.6)*9%1)<.12?f.LINE:void 0)}),Si(s,[0,.18,0],[.58,.2,.3],[[.92,.3,.25],[.92,.3,-.25]],.02,a?f.MAGIC2:f.EYE),a&&No(s,[[[-.3,.32,.05],.3],[[0,.37,-.05],.45],[[.25,.32,.05],.32]]),Mn(s,n,e,i,.4,r)}function yh(n,e,t,i,r="towards"){const a=e===3,s=e===1,o=p=>a&&n.legend.includes(p),c=new Qe,l=t?.7:0,u=[];for(let p=0;p<=12;p++){const _=p/12;u.push([-.9+_*1.2,.07,Math.sin(_*Math.PI*2+l)*.25*(1-_*.5),.03+.045*Math.sin(Math.min(1,_*1.4)*Math.PI/2)])}u.push([.38,.25,u[12][2],.07],[.42,.45,u[12][2]*.8,.065]),c.chain(u,f.BODY,{paint:p=>p[1]<.05&&p[0]<.35?f.BELLY:Tn([p[0]*1.5,p[1],p[2]],14,.3)?f.BODY3:void 0});const d=[.5,.5,u[13][2]*.8],h=s?.11:.09;if(c.ell(d,[h*1.5,h*.75,h],f.BODY,{dir:[1,-.15,0],group:1}),Si(c,d,[h*1.5,h*.75,h],[[.5,.5,.7],[.5,.5,-.7]],h*.22,a?f.MAGIC2:f.EYE),t||c.seg(A.add(d,[h*1.4,-h*.2,0]),A.add(d,[h*2.3,-h*.3,0]),.01,.008,f.SKIN,{group:1}),c.anchors.feet.push({c:A.add(u[0].slice(0,3),[-.02,-.01,0]),r:.06,group:3,tail:!0}),c.anchors.neck={c:[.42,.36,u[12][2]*.9],r:.075,dir:[.2,1,0]},o("wings"))for(const p of[-1,1])Va(c,[0,.2,p*.05],p,.9,t?.1:0,p>0?f.MAGIC2:f.MAGIC,f.MAGIC,40+(p>0?10:0));return Mn(c,n,e,i,.45,r)}function wh(n,e,t,i,r="towards"){const a=e===3,s=h=>a&&n.legend.includes(h),o=new Qe,c=t===0,l=.55,u=s("wingsBig")?1.45:1,d=s("wingsBig")?f.MAGIC:f.BODY;Tc(o,0,.3*u);for(const h of[-1,1]){const p=c?.5:-.1,_=A.norm([.35,p,h]),x=A.norm([-.3,p*.6,h]);o.flat(A.add([0,l,h*.05],A.mul(_,.38*u)),_,A.norm(A.cross(_,[0,1,0])),.4*u,.24*u,pr.spotted(d,f.BELLY,f.BODY3),{group:10+(h>0?1:0)}),o.flat(A.add([-.05,l,h*.05],A.mul(x,.26*u)),x,A.norm(A.cross(x,[0,1,0])),.27*u,.17*u,pr.spotted(s("wingsBig")?f.MAGIC2:f.BODY2,f.BODY2,f.BODY2),{group:12+(h>0?1:0)}),o.chain([[.12,l+.08,h*.03,.015],[.2,l+.25,h*.1,.025],[.24,l+.32,h*.14,.012]],f.BODY2,{group:11})}return o.ell([0,l,0],[.22,.09,.09],f.BELLY,{group:1,paint:h=>Tn(h,30,.25)?f.BODY2:void 0}),o.ell([.17,l+.03,0],[.07,.07,.07],f.BELLY,{group:1}),Si(o,[.17,l+.03,0],[.07,.07,.07],[[.7,.3,.6],[.7,.3,-.6]],.02,a?f.MAGIC2:f.EYE),Mn(o,n,e,i,.5,r)}function Ah(n,e,t,i,r="towards"){const a=e===3,s=l=>a&&n.legend.includes(l),o=new Qe,c=t?.05:0;for(let l=0;l<9;l++){const u=l/8,d=-.6+u*1.15;o.ell([d,.12+Math.sin(u*Math.PI)*(.06+c),0],[.08,.1-u*.02,.12-u*.03],l<2?f.MAGIC2:l%2?f.BODY2:f.BODY,{group:1})}s("lantern")&&o.ell([-.75,.3,0],[.22,.22,.22],f.MAGIC2,{group:3,paint:l=>l[1]<.2?f.MAGIC:void 0});for(let l=0;l<6;l++)o.seg([-.2+l*.12,.05,.08],[-.2+l*.12+(l%2?.02:-.02)*(t?-1:1),0,.12],.015,.01,f.BODY3,{group:7});return o.ell([.6,.14,0],[.06,.06,.08],f.BODY3,{group:1}),Si(o,[.6,.14,0],[.06,.06,.08],[[.6,.3,.7],[.6,.3,-.7]],.015,a?f.MAGIC2:f.EYE),Mn(o,n,e,i,.4,r)}function Th(n,e,t,i,r="towards"){const a=e===3,s=u=>a&&n.legend.includes(u),o=new Qe,c=[.15,.28,0];for(const u of[-1,1])for(let d=0;d<4;d++){const h=-.6+d*.4,p=(d+(u>0?0:1)+t)%2?.05:-.05,_=A.add(c,[.05-d*.04,0,u*.1]),x=A.add(_,[Math.cos(h)*.3*(d<2?1:-.6)+p,.3,u*.3]),g=A.add(_,[Math.cos(h)*.55*(d<2?1:-.8)+p*1.5,-.28,u*.55]);o.chain([[..._,.03],[...x,.028],[...g,.015]],u>0?f.BODY2:f.BODY3,{group:u>0?7:2})}o.ell([-.28,.38,0],[.34,.28,.3],f.BODY,{paint:u=>(Math.abs(u[2])<.03||Math.abs(u[0]+.28)<.03)&&u[1]>.45?f.BELLY:void 0}),o.ell(c,[.18,.13,.17],f.BODY2,{group:1}),o.anchors.head={c,r:[.18,.13,.17]},o.anchors.eyes={pts:[[.05,.05],[.05,-.05]].map(([u,d])=>Qe.surface(c,[.18,.13,.17],A.norm([.9,u*6,d*4]))),size:.03},o.anchors.neck={c:[-.02,.32,0],r:.15,dir:[1,0,0]};const l=s("eyesRing");for(const[u,d]of[[.05,.05],[.05,-.05],[.02,.1],[.02,-.1]])o.ell(Qe.surface(c,[.18,.13,.17],A.norm([.9,u*6,d*4])),[.025,.025,.025],l?f.MAGIC2:f.EYE,{group:1});if(l)for(let u=0;u<5;u++){const d=Math.PI*(.2+u/4*.6);o.ell([-.3+Math.cos(d)*.2,.75+Math.sin(d)*.35,(u-2)*.12],[.06,.06,.06],f.MAGIC2,{group:95+u,extra:!0})}return Mn(o,n,e,i,.5,r)}const Rh=new Map(Object.entries({owl:mh,hedgehog:gh,toad:_h,raven:xh,bat:vh,mole:Mh,beetle:Sh,snail:bh,woodlouse:Eh,snake:yh,moth:wh,glowworm:Ah,spider:Th})),Uo=[{id:"wolf",name:"Wolf",plan:"quad",hue:.08,sat:.24,val:.56,legend:["wings","mane"],q:{len:.64,chest:.42,tuck:.6,neck:.32,neckAng:.7,neckW:.42,hr:.26,snout:.82,snoutD:.7,ear:"point",earS:.82,tail:"brush",paw:"paw",legW:1.25,saddle:!0,belly:!0},tail:"up"},{id:"fox",name:"Fox",plan:"quad",q:{hgt:.8,len:.62,chest:.4,tuck:.5,neck:.3,neckAng:.7,neckW:.32,hr:.24,snout:1.05,snoutD:.5,snoutTaper:.6,ear:"point",earS:1.35,tail:"bushy",paw:"paw",legW:.9,belly:!0,socks:.3},hue:.06,sat:.8,val:.9,belly:"white",legend:["tails"]},{id:"badger",name:"Badger",plan:"quad",q:{hgt:.62,len:.78,chest:.2,tuck:.22,neck:.18,neckAng:.1,neckW:.5,hr:.26,snout:1,snoutD:.55,snoutTaper:.55,ear:"round",earS:.7,tail:"stub",paw:"paw",legW:1.35,legMat:f.BODY3,face:"badger",shaggy:!0},hue:.65,sat:.08,val:.45,legend:["crystals"]},{id:"boar",name:"Boar",plan:"quad",hue:.07,sat:.62,val:.5,legend:["tusksBig"],q:{len:.72,chest:.34,tuck:.42,neck:.2,neckAng:-.15,neckW:.55,hr:.27,snout:1.25,snoutD:.62,snoutTaper:.55,ear:"small",earS:.8,tail:"thin",paw:"hoof",legW:1.15,ridge:!0,tusks:!0,back:"hump",disc:!0},ridge:!0},{id:"stag",name:"Stag",plan:"quad",q:{hgt:1.3,len:.6,chest:.6,tuck:.7,neck:.55,neckAng:.95,neckW:.32,hr:.2,snout:1.15,snoutD:.6,snoutTaper:.65,ear:"point",earS:1.1,tail:"deer",paw:"hoof",legW:.75,antlers:"branch",rump:!0,spots:"young",belly:!0},hue:.08,sat:.5,val:.7,legend:["antlersGlow"]},{id:"hare",name:"Hare",plan:"quad",q:{hgt:.72,len:.5,chest:.4,tuck:.45,neck:.2,neckAng:.9,neckW:.35,hr:.27,snout:.65,snoutD:.7,ear:"long",earS:2.4,tail:"puff",paw:"paw",legW:.85,haunch:1.35,hindFoot:1.6,back:"arch",belly:!0,whiskers:!0},hue:.08,sat:.4,val:.72,legend:["jackalope"]},{id:"owl",name:"Owl",plan:"owl",hue:.08,sat:.5,val:.55,legend:["eyesRing","wings"]},{id:"bear",name:"Bear",plan:"quad",q:{hgt:1.15,len:.72,chest:.38,tuck:.4,neck:.25,neckAng:.3,neckW:.55,hr:.28,snout:.7,snoutD:.62,snoutTaper:.7,ear:"round",earS:.8,tail:"stub",paw:"paw",legW:1.55,back:"hump",muzzle:!0,shaggy:!0},hue:.07,sat:.55,val:.42,legend:["moss"]},{id:"hedgehog",name:"Hedgehog",plan:"hedgehog",hue:.08,sat:.4,val:.5,legend:["crystals"]},{id:"squirrel",name:"Squirrel",plan:"quad",q:{hgt:.55,len:.45,chest:.35,tuck:.4,neck:.2,neckAng:.9,neckW:.35,hr:.3,snout:.55,snoutD:.65,ear:"tuft",earS:1.1,tail:"squirrel",paw:"paw",legW:.8,haunch:1.3,back:"arch",belly:!0,whiskers:!0},hue:.03,sat:.75,val:.75,belly:"white",legend:["starTail"]},{id:"toad",name:"Toad",plan:"toad",hue:.2,sat:.5,val:.55,legend:["crown"]},{id:"otter",name:"Otter",plan:"quad",q:{hgt:.55,len:1,chest:.25,tuck:.25,neck:.3,neckAng:.35,neckW:.5,hr:.27,snout:.6,snoutD:.7,ear:"round",earS:.5,tail:"otter",paw:"paw",legW:1.1,muzzle:!0,belly:!0,whiskers:!0},hue:.07,sat:.55,val:.45,belly:"white",legend:["ribbons"]},{id:"lynx",name:"Lynx",plan:"quad",q:{hgt:.9,len:.55,chest:.5,tuck:.55,neck:.25,neckAng:.8,neckW:.4,hr:.27,snout:.5,snoutD:.75,snoutTaper:.8,ear:"tuft",earS:1,tail:"bob",paw:"paw",legW:1.2,cheeks:!0,spots:!0,belly:!0,whiskers:!0},hue:.09,sat:.45,val:.75,legend:["mane"]},{id:"elk",name:"Elk",plan:"quad",q:{hgt:1.4,len:.68,chest:.6,tuck:.66,neck:.45,neckAng:.75,neckW:.42,hr:.24,snout:1.6,snoutD:.9,snoutTaper:.85,ear:"point",earS:.9,tail:"stub",paw:"hoof",legW:.9,back:"hump",antlers:"palm",shaggy:!0},hue:.07,sat:.55,val:.38,legend:["antlersGlow","moss"]},{id:"raven",name:"Raven",plan:"raven",hue:.68,sat:.35,val:.3,legend:["wings","eyesRing"]},{id:"bat",name:"Bat",plan:"bat",hue:.78,sat:.25,val:.45,legend:["wingsBig"]},{id:"mole",name:"Mole",plan:"mole",hue:.7,sat:.15,val:.32,legend:["crown"]},{id:"beaver",name:"Beaver",plan:"quad",q:{hgt:.6,len:.65,chest:.2,tuck:.22,neck:.2,neckAng:.4,neckW:.55,hr:.28,snout:.6,snoutD:.75,ear:"round",earS:.45,tail:"flat",paw:"paw",legW:1.2,back:"arch",teeth:!0,whiskers:!0},hue:.06,sat:.6,val:.45,legend:["moss"]},{id:"stoat",name:"Stoat",plan:"quad",q:{hgt:.5,len:1,chest:.3,tuck:.33,neck:.35,neckAng:.6,neckW:.32,hr:.25,snout:.6,snoutD:.6,ear:"round",earS:.6,tail:"stoat",paw:"paw",legW:.8,belly:!0,back:"arch",whiskers:!0},hue:.1,sat:.25,val:.92,legend:["ribbons","mane"]},{id:"snail",name:"Snail",plan:"snail",hue:.08,sat:.45,val:.55,legend:["glowShell"]},{id:"ram",name:"Ram",plan:"quad",q:{hgt:.95,len:.6,chest:.48,tuck:.52,neck:.22,neckAng:.45,neckW:.48,hr:.25,snout:.85,snoutD:.75,snoutTaper:.8,ear:"small",earS:.7,tail:"stub",paw:"hoof",legW:.9,wool:!0,horns:"curl",face:"dark"},hue:.1,sat:.12,val:.88,legend:["hornsGlow"]},{id:"woodlouse",name:"Woodlouse",plan:"woodlouse",hue:.65,sat:.12,val:.45,legend:["crystals"]},{id:"snake",name:"Snake",plan:"snake",hue:.25,sat:.45,val:.45,legend:["wings"]},{id:"moth",name:"Moth",plan:"moth",hue:.1,sat:.3,val:.7,legend:["wingsBig"]},{id:"marten",name:"Pine marten",plan:"quad",q:{hgt:.55,len:.78,chest:.35,tuck:.38,neck:.3,neckAng:.55,neckW:.35,hr:.25,snout:.65,snoutD:.6,ear:"round",earS:.9,tail:"bushy",paw:"paw",legW:.85,belly:!0,back:"arch"},hue:.07,sat:.6,val:.45,legend:["mane"]},{id:"salamander",name:"Salamander",plan:"quad",q:{hgt:.42,len:.9,chest:.14,tuck:.14,neck:.12,neckAng:.05,neckW:.5,hr:.27,snout:.55,snoutD:.55,ear:"none",tail:"otter",paw:"paw",legW:1,spots:!0,spotMat:"belly"},hue:.1,sat:.1,val:.22,belly:"yellow",legend:["flames"]},{id:"glowworm",name:"Glow-worm",plan:"glowworm",hue:.12,sat:.4,val:.35,legend:["lantern"]},{id:"spider",name:"Spider",plan:"spider",hue:.07,sat:.45,val:.4,legend:["eyesRing"]},{id:"dormouse",name:"Dormouse",plan:"quad",q:{hgt:.38,len:.45,chest:.35,tuck:.38,neck:.15,neckAng:.6,neckW:.4,hr:.34,snout:.45,snoutD:.7,ear:"round",earS:.85,tail:"squirrel",paw:"paw",legW:.8,back:"arch",belly:!0,whiskers:!0,eyeK:1.6},hue:.09,sat:.6,val:.75,belly:"white",legend:["starTail"]},{id:"beetle",name:"Stag beetle",plan:"beetle",hue:.78,sat:.5,val:.35,legend:["horn","crystals"]}],Cc=Object.fromEntries(Uo.map(n=>[n.id,n])),gl=[[[255,70,170],[255,245,250],[255,230,70]],[[40,220,255],[255,236,60],[255,80,180]],[[150,80,255],[175,255,60],[255,255,255]]],_l={sneakers:[[255,70,90],[250,250,245]],glitter:[[215,215,235],[190,190,210]],platform:[[160,60,230],[40,30,52]]};function Ch(n,e,t=null){const i=Lh(n,e);if(!t)return i;if(t.collar&&(i[f.COLLAR]=Array.isArray(t.collar)?t.collar:i[f.MAGIC]),t.hat!=null){const[r,a,s]=gl[t.hat%gl.length];i[f.HAT1]=r,i[f.HAT2]=a,i[f.POM]=s}if(t.glasses&&(i[f.SHADES]=[22,18,32],i[f.FRAME]=t.glasses==="heart"?[255,60,110]:[255,90,210]),t.shoes){const[r,a]=_l[t.shoes]||_l.sneakers;i[f.SHOE]=r,i[f.SOLE]=a}if(t.woken){i[f.WOKEN]=[255,40,36];for(const r of[f.BODY,f.BODY2,f.BODY3,f.BELLY,f.ACCENT,f.EAR])i[r]&&(i[r]=i[r].map((a,s)=>Math.round(a*.72+[30,8,12][s]*.1)))}return i}function Lh(n,e){const t=Cc[n],i=e.cVal/.85,r=e.cSat/.6,a=ve(t.hue,t.sat*r*e.sat,t.val*i),s=t.belly==="yellow"?[240,196,40]:t.belly==="white"||t.q?.face==="badger"?[236,232,222]:ve(t.hue+.03,t.sat*.5*r,Math.min(1,t.val*i*1.3+.08)),o=ve(e.magicHue+t.hue*.3,.6,1),c=ve(e.magicHue+t.hue*.3,.18,1),l=["boar","stag","elk","ram"].includes(t.id);return{[f.BODY]:a,[f.BODY2]:ve(t.hue+.02,Math.min(1,t.sat*r*1.2+.05),t.val*i*.66),[f.BODY3]:ve(t.hue+.03,Math.min(1,t.sat*r*1.3+.1),t.val*i*.4),[f.BELLY]:s,[f.ACCENT]:l?[236,226,200]:ve(t.hue+.05,t.sat*.6,Math.min(1,t.val*i*.5+.25)),[f.MAGIC]:o,[f.MAGIC2]:c,[f.LEAF]:ve(.3,.55,.55),[f.LEAF2]:ve(.25,.5,.75),[f.LEAF3]:ve(.33,.6,.35),[f.TRUNK]:ve(.07,.45,.32),[f.EYE]:[24,18,30],[f.PUPIL]:[70,40,90],[f.GLINT]:[255,255,245],[f.NOSE]:[38,28,36],[f.EAR]:ve(t.hue+.97,Math.min(1,t.sat*.6+.2),Math.min(1,t.val*i*.55+.2)),[f.IRIS]:t.plan==="owl"?[255,176,40]:ve(.12,.7,.85),[f.SKIN]:[238,158,192]}}const Ph=["size","growth","pixel","head","eye","legs","long","fur"],yr=new Map;function Dh(n,e,t,i,r="towards",a=null){const s=Cc[n]||Uo[0],o=a&&(a.collar||a.hat!=null||a.glasses||a.shoes||a.woken)?a:null,c=[s.id,e,t,r,...Ph.map(u=>i[u]),o?[!!o.collar,o.hat??"",o.glasses||"",o.shoes||"",!!o.woken].join(","):""].join("|");let l=yr.get(c);if(!l){if(l=ch(o,()=>s.q?dh(s,e,t,i,r):Rh.get(s.plan)(s,e,t,i,r)),o?.woken)for(let u=0;u<l.m.length;u++)(l.m[u]===f.EYE||l.m[u]===f.IRIS||l.m[u]===f.PUPIL)&&(l.m[u]=f.WOKEN);yr.size>600&&yr.delete(yr.keys().next().value),yr.set(c,l)}return l}const Ke=(...n)=>({l:n}),_t=(n,e,t,i,r)=>({a:[n,e,t,i,r]}),Wt=(n,e)=>({d:[n,e]}),ut=(n,e=.86)=>Ke([.5,e],[.5,n]),ht=_t(.5,.76,.13,25,155),Ih=n=>n.l?{l:n.l.map(([e,t])=>[1-e,t])}:n.a?{a:[1-n.a[0],n.a[1],n.a[2],180-n.a[3],180-n.a[4]]}:{d:[1-n.d[0],n.d[1]]},dt=(...n)=>n.flatMap(e=>[e,Ih(e)]);function Yn(n,e,t){const i=e[0]-n[0],r=e[1]-n[1],a=Math.hypot(i,r),s=t*a,o=(a*a/4+s*s)/(2*Math.abs(s)),c=(n[0]+e[0])/2,l=(n[1]+e[1])/2,u=r/a,d=-i/a,h=(o-Math.abs(s))*Math.sign(s),p=c-u*h,_=l-d*h,x=Math.atan2(n[1]-_,n[0]-p)*180/Math.PI;let m=Math.atan2(e[1]-_,e[0]-p)*180/Math.PI-x;for(;m>180;)m-=360;for(;m<-180;)m+=360;return _t(p,_,o,x,x+m)}const Nh=(n,e,t,i,r,a=24)=>Ke(...Array.from({length:a+1},(s,o)=>[n+i*Math.sin(o/a*r*2*Math.PI),e+(t-e)*o/a])),Uh=(n,e,t,i,r,a=0,s=40)=>Ke(...Array.from({length:s+1},(o,c)=>{const l=c/s,u=(a+l*r*360)*Math.PI/180,d=t+(i-t)*l;return[n+d*Math.cos(u),e+d*Math.sin(u)]})),ea=(n,e,t,i,r)=>r.map(a=>{const s=Math.cos(a*Math.PI/180),o=Math.sin(a*Math.PI/180);return Ke([n+t*s,e+t*o],[n+i*s,e+i*o])});ut(.3),Ke([.28,.08],[.5,.3],[.72,.08]),_t(.5,.55,.2,-55,55),Wt(.5+.2*Math.cos(-55*Math.PI/180),.55+.2*Math.sin(-55*Math.PI/180)),ut(.34),Ke([.36,.06],[.5,.34],[.64,.06]),_t(.67,.66,.17,180,-80),Wt(.67+.17*Math.cos(-80*Math.PI/180),.66+.17*Math.sin(-80*Math.PI/180)),[ut(.1),Ke([.24,.3],[.76,.3]),...dt(Ke([.33,.14],[.33,.56])),...dt(Wt(.24,.3))],[ut(.16),...dt(_t(.36,.24,.15,45,180)),...ea(.5,.16,0,.1,[-130,-90,-50])],[ut(.42),...dt(Ke([.5,.42],[.34,.26],[.3,.06]),Ke([.335,.25],[.16,.2]),Ke([.32,.15],[.18,.07]))],[ut(.44),...dt(Ke([.5,.44],[.4,.34],[.38,.06])),_t(.62,.66,.09,180,540),...dt(Wt(.38,.06))],[ut(.44),...dt(_t(.33,.3,.13,0,360),Ke([.24,.18],[.18,.05])),...dt(Wt(.33,.3))],[ut(.24),Ke([.24,.3],[.76,.3]),...dt(_t(.3,.3,.09,180,360)),...dt(Ke([.36,.5],[.32,.62]))],[ut(.52),_t(.5,.52,.2,180,360),...ea(.5,.52,.22,.34,[-160,-125,-90,-55,-20])],ut(.2),Ke([.5,.2],[.4,.08]),_t(.66,.4,.16,100,-200),Wt(.66+.16*Math.cos(-200*Math.PI/180),.4+.16*Math.sin(-200*Math.PI/180)),[ut(.42),Ke([.16,.54],[.24,.42],[.76,.42],[.84,.54]),...dt(_t(.34,.3,.1,0,360)),...dt(Wt(.16,.54))],ut(.24),_t(.5,.5,.28,-100,100),Wt(.5+.28*Math.cos(-100*Math.PI/180),.5+.28*Math.sin(-100*Math.PI/180)),Yn([.18,.64],[.36,.64],.3),[ut(.32),Ke([.26,.2],[.5,.32],[.74,.2]),...dt(Ke([.26,.2],[.26,.06])),Ke([.5,.68],[.66,.62]),...dt(Wt(.26,.06))],[ut(.3),...dt(Ke([.5,.3],[.42,.2]),_t(.3,.16,.12,0,180),Ke([.18,.16],[.14,.06])),Ke([.5,.44],[.6,.52])],[ut(.14),Ke([.5,.14],[.3,.22]),Ke([.18,.56],[.5,.38],[.82,.56]),Wt(.58,.17),...dt(Wt(.18,.56))],[ut(.3),_t(.5,.16,.14,20,160),...dt(Ke([.5,.38],[.12,.26]),Yn([.12,.26],[.24,.46],-.25),Yn([.24,.46],[.38,.5],-.3),Yn([.38,.5],[.5,.52],-.3))],[ut(.44),_t(.5,.3,.16,0,180),...ea(.5,.3,.19,.3,[-160,-125,-55,-20]),Ke([.5,.14],[.5,.04])],[ut(.36),Ke([.32,.2],[.68,.2]),...dt(Ke([.44,.2],[.44,.34])),Ke([.5,.56],[.68,.66],[.5,.76],[.32,.66],[.5,.56])],[ut(.18),_t(.5,.44,.24,180,360),Ke([.5,.18],[.6,.08]),...dt(Wt(.26,.44))],ut(.52),Uh(.5,.33,.03,.2,1.6,90),Ke([.66,.2],[.76,.06]),Wt(.76,.06),[ut(.24),...dt(_t(.36,.24,.14,0,-250)),...dt(Wt(.36+.14*Math.cos(-250*Math.PI/180),.24+.14*Math.sin(-250*Math.PI/180)))],[ut(.24),_t(.5,.52,.22,205,335),_t(.5,.66,.24,205,335),_t(.5,.38,.2,205,335),...dt(Ke([.5,.24],[.32,.06]))],[ut(.16),Nh(.5,.82,.2,.2,1.25),Ke([.5,.2],[.5,.11]),...dt(Ke([.5,.11],[.42,.045]))],[ut(.2),...dt(Ke([.5,.3],[.16,.18],[.24,.5],[.5,.4]),Ke([.5,.5],[.3,.64],[.5,.66]),_t(.38,.16,.12,0,-110))],[ut(.32),Ke([.3,.2],[.5,.32],[.7,.2]),...dt(_t(.3,.14,.07,90,-180)),_t(.28,.56,.22,0,150),Wt(.28+.22*Math.cos(150*Math.PI/180),.56+.22*Math.sin(150*Math.PI/180))],[ut(.3),Yn([.5,.3],[.5,.06],.35),Yn([.5,.3],[.5,.06],-.35),...dt(Ke([.5,.42],[.32,.38],[.26,.48]),Ke([.5,.64],[.32,.6],[.26,.7])),...dt(Wt(.38,.52))],[ut(.4),_t(.5,.27,.1,90,450),...ea(.5,.27,.15,.25,[0,60,120,180,240,300])],[Ke([.5,.05],[.5,.3]),ut(.5),_t(.5,.4,.11,-90,270),...dt(...[-150,-170,170,150].map(n=>Ke([.5+.12*Math.cos(n*Math.PI/180),.4+.12*Math.sin(n*Math.PI/180)],[.5+.28*Math.cos(n*Math.PI/180),.4+.28*Math.sin(n*Math.PI/180)],[.5+.32*Math.cos(n*Math.PI/180),.4+.28*Math.sin(n*Math.PI/180)+.1]))),Wt(.5,.05)],[ut(.12),_t(.5,.46,.24,-60,250),...dt(_t(.34,.16,.08,90,-180)),Yn([.56,.38],[.7,.38],-.4)],[ut(.36),...dt(_t(.66,.26,.2,160,250)),Yn([.5,.38],[.5,.82],.25),Yn([.5,.38],[.5,.82],-.25)];Uo.map(n=>n.id);const Fh=new Set([f.TRUNK,f.BARK2,f.BARKD,f.BARKL]);function Fi(n,e,t,i,r,a,{mat:s=f.LEAF,group:o=30,ragged:c=1}={}){const u=[];for(let m=0;m<9;m++){const M=m/9*Math.PI*2,E=1+(a()-.5)*.35*(r.clump+.3);u.push([e[0]+Math.cos(M)*t*E,e[1]+Math.sin(M)*i*E*(Math.sin(M)>0?.8:1)])}const d=Math.max(1,Math.round(Math.min(t,i)/3.5));n.shape(Ha(u,0,9,d,Math.max(1.2,Math.min(t,i)*.14)*c,1),s,{group:o,line:!1,round:r.round}),n.mark([Et(e,[-t*1.1,i*.15]),Et(e,[t*1.1,i*.1]),Et(e,[t*1.1,i*1.2]),Et(e,[-t*1.1,i*1.2])],f.LEAF3,[s]),n.mark([Et(e,[-t*.75,-i*.55]),Et(e,[t*.25,-i*.95]),Et(e,[t*.55,-i*.35]),Et(e,[-t*.2,-i*.05])],f.LEAF2,[s]);const h=Math.floor(e[0]-t*1.2),p=Math.ceil(e[0]+t*1.2),_=Math.floor(e[1]-i*1.2),x=Math.ceil(e[1]+i*1.2),g=a()*1e4|0;for(let m=_;m<=x;m++)for(let M=h;M<=p;M++){const E=n.get(M,m);if(E!==s&&E!==f.LEAF2&&E!==f.LEAF3)continue;const b=an(M,m,g),R=xi(M/2,m/2,g)*.5+b*.5;R<.16*r.density?n.recolour(M,m,E===f.LEAF2?s:f.LEAF2):R>1-.16*r.density&&n.recolour(M,m,E===f.LEAF3?s:f.LEAF3)}}function Mi(n,e,t,i,r,a,s,o,{mat:c=f.TRUNK,bend:l=1,group:u=10,line:d=!1}={}){const h=[e],p=4;let _=t,x=e;for(let g=1;g<=p;g++)_+=(o()-.5)*.7*s.gnarl*l,x=Et(x,[Math.cos(_)*i/p,Math.sin(_)*i/p]),h.push(x);return n.limb(h.map((g,m)=>[...g,r+(a-r)*m/p]),c,{group:u,line:d,round:s.round,cap:.6,capEnd:1}),{end:x,ang:_,pts:h}}function Wa(n,e,t,i,r,a,s){if(n.shape([[e-i*1.05,t],[e-i*.62,t-i*.5],[e-i*.45,t-i*1.4],[e+i*.45,t-i*1.4],[e+i*.62,t-i*.5],[e+i*1.05,t]],f.TRUNK,{group:10,round:r.round}),r.roots<=0)return;const o=Math.round(2+r.roots*4);for(let c=0;c<o;c++){const l=c%2?1:-1,u=(8+a()*16)*s*(.4+r.roots),d=(2+a()*3)*s,h=[e+l*i*.2,t-i*.5],p=[e+l*(i*.55+u*.4),t-d],_=[e+l*(i*.5+u),t-.5];n.limb([[...h,i*.55],[...p,i*.28],[..._,1.2]],f.TRUNK,{group:11,round:r.round,cap:.5,capEnd:.6})}}function Xa(n,e,t=!0){if(!(e.bark<=0))for(let i=0;i<n.h;i++)for(let r=0;r<n.w;r++){const a=i*n.w+r;if(n.m[a]!==f.TRUNK)continue;const s=t?xi(r/1.3,i/6,21):xi(r/6,i/1.3,21);s>1-e.bark*.42||an(r,i,4)<e.bark*.05?n.m[a]=f.BARKD:s>1-e.bark*.62&&n.n[a*3]<-.1&&(n.m[a]=f.BARKL)}}function mr(n,e,t){let i=n.w,r=-1,a=n.h;for(let h=0;h<n.h;h++)for(let p=0;p<n.w;p++)n.m[h*n.w+p]&&(i=Math.min(i,p),r=Math.max(r,p),a=Math.min(a,h));if(r<0)return{sp:n,crownY:t};const s=Math.max(e-i,r-e)+2,o=Math.max(0,Math.floor(e-s)),c=Math.min(n.w-o,Math.ceil(s*2)+1),l=Math.max(0,a-1),u=n.h-l,d=new on(c,u);for(let h=0;h<u;h++)for(let p=0;p<c;p++){const _=(h+l)*n.w+p+o,x=h*c+p;d.m[x]=n.m[_],d.g[x]=n.g[_],d.n[x*3]=n.n[_*3],d.n[x*3+1]=n.n[_*3+1],d.n[x*3+2]=n.n[_*3+2]}return{sp:d,crownY:t-l}}const Xr=n=>(n.crownWidth||3)/3;function Lc(n,e,t){const i=Xr(e),r=Math.round(220*t*i+60*t),a=Math.round(140*t),s=new on(r,a),o=r/2,c=a,l=e.treeTrunks||1,u=12*t*(e.treeThick||1)*(e.treeThin?.55:1)/Math.sqrt(l),d=(n()-.5)*.5*e.gnarl+(e.treeLean||0),h=[];let p=a;const _=(x,g,m,M,E)=>{const b=Mi(s,x,g,m,M,M*.65,e,n,{group:12});if(E===0){h.push(b.end);return}const R=n()<.35?3:2;for(let w=0;w<R;w++){const P=(w-(R-1)/2)*be(n,.5,.85)*(E===3?1.4:1);_(b.end,b.ang+P+(n()-.5)*.25,m*be(n,.6,.78),M*.62,E-1)}E<=2&&h.push(ni(x,b.end,.7))};for(let x=0;x<l;x++){const g=d+(l>1?(x/(l-1)-.5)*.8:0),m=[o+(x-(l-1)/2)*u*.6,c],M=Mi(s,m,-Math.PI/2+g,a*.36*(l>1?be(n,.75,1.15):1),u,u*.72,e,n,{bend:1.4});p=Math.min(p,M.end[1]);for(const E of[-1,1])_(M.end,-Math.PI/2+g*.5+E*be(n,.55,.95)*(.7+.3*i)*(l>1?.6:1),a*.22*(.75+.25*i)*(l>1?.7:1),u*.7,l>2?2:3);if(l===1&&n()<.7&&_(M.end,-Math.PI/2+(n()-.5)*.3,a*.18,u*.55,2),x===0&&e.treeHollow){const E=ni(m,M.end,.38);s.ellipse(E[0],E[1],u*.28,u*.5,f.NOSE,{round:.3})}}if(Wa(s,o,c,u*Math.sqrt(l),e,n,t),Xa(s,e),e.treeWebs)for(let x=0;x+1<h.length;x+=2){const g=h[x],m=h[x+1],M=Math.hypot(m[0]-g[0],m[1]-g[1]);if(M<40*t)for(let E=0;E<=M;E++){const b=ni(g,m,E/M);s.px(b[0],b[1]+Math.sin(E/M*Math.PI)*M*.15,f.WEB,0,0,1)}}if(e.treeBare)return mr(s,o,p+4*t);h.sort((x,g)=>x[1]-g[1]);for(const x of h)Fi(s,Et(x,[0,-3*t]),be(n,14,21)*t,be(n,10,14)*t,e,n,{mat:n()<.35?f.LEAF3:f.LEAF});for(const x of h)n()<.75&&Fi(s,Et(x,[be(n,-9,9)*t,be(n,-12,-3)*t]),be(n,10,15)*t,be(n,7,10)*t,e,n);return mr(s,o,p+4*t)}function Fo(n,e,t){const i=.8+.2*Xr(e),r=Math.round(90*t*i),a=Math.round(160*t),s=new on(r,a),o=r/2,c=a;s.limb([[o,c,6*t],[o,c-a*.5,4*t],[o,6*t,1.5]],f.TRUNK,{group:10,round:e.round}),Wa(s,o,c,6*t,e,n,t*.6),Xa(s,e);const l=Math.round(be(n,9,12));for(let u=l-1;u>=0;u--){const d=u/(l-1),h=6*t+d*a*.7,p=(5+d*36)*t*i*be(n,.9,1.1),_=(5+d*13)*t,x=[[o,h-4*t],[o+p*.5,h+_*.3],[o+p,h+_],[o+p*.7,h+_*1.15],[o,h+_*.7],[o-p*.7,h+_*1.15],[o-p,h+_],[o-p*.5,h+_*.3]];s.shape(Ha(x,1,7,Math.max(2,Math.round(p/(3*t))),2*t,1),f.LEAF,{group:30+u,line:!1,round:e.round}),s.mark([[o-p,h+_*.55],[o+p,h+_*.55],[o+p,h+_*1.4],[o-p,h+_*1.4]],f.LEAF3,[f.LEAF]),s.mark([[o-p*.55,h-2*t],[o+p*.1,h-3*t],[o+p*.1,h+_*.45],[o-p*.7,h+_*.7]],f.LEAF2,[f.LEAF])}return mr(s,o,a*.82)}function Pc(n,e,t){const i=Xr(e),r=Math.round(200*t*i+50*t),a=Math.round(130*t),s=new on(r,a),o=r/2,c=a,l=13*t,u=Mi(s,[o,c],-Math.PI/2+(n()-.5)*.3,a*.3,l,l*.8,e,n,{bend:1.6}),d=[];for(let _=0;_<5;_++){const x=_%2?1:-1,g=-Math.PI/2+x*be(n,.55,1.25)*(.7+.3*i),m=Mi(s,u.end,g,a*be(n,.3,.42)*(.8+.2*i),l*.55,l*.3,e,n,{group:12});d.push(m.end)}Wa(s,o,c,l,e,n,t),Xa(s,e);for(const _ of d)Fi(s,Et(_,[0,-2*t]),be(n,20,28)*t,be(n,9,12)*t,e,n);Fi(s,Et(u.end,[0,-8*t]),24*t,11*t,e,n);let h=r,p=0;for(const _ of d)h=Math.min(h,_[0]-22*t),p=Math.max(p,_[0]+22*t);for(let _=h;_<p;_+=be(n,1,1.7)){let x=a;for(let E=0;E<a;E++)if(s.get(_,E)===f.LEAF||s.get(_,E)===f.LEAF2||s.get(_,E)===f.LEAF3){x=E;break}if(x>=a)continue;const g=Math.abs(_-o)/(r/2),m=(c-x)*be(n,.5,.9)*(1-g*.3),M=an(_|0,1,9)<.4?f.LEAF2:f.LEAF;for(let E=x+2;E<Math.min(c-2,x+m);E++){const b=Math.round(Math.sin(E*.12+_)*.7);an(_|0,E,5)<.2+e.density*.8&&s.px(_+b,E,(E-x)/m>.8?f.LEAF3:M,b*.3,.2,.95)}}return mr(s,o,u.end[1]+6*t)}function Dc(n,e,t){const i=.7+.3*Xr(e),r=Math.round(110*t*i),a=Math.round(155*t),s=new on(r,a),o=r/2,c=a,l=(n()-.5)*.25+(e.treeLean||0),u=Mi(s,[o,c],-Math.PI/2+l,a*.85,5*t,2*t,e,n,{mat:f.BARK2,bend:.4});for(let h=0;h<u.pts.length-1;h++)for(let p=0;p<1;p+=1/8){const _=ni(u.pts[h],u.pts[h+1],p+n()*.1);if(n()<.55)for(let x=-3;x<=3;x++)s.get(_[0]+x,_[1])===f.BARK2&&n()<.8&&s.recolour(_[0]+x,_[1],f.BARKD)}const d=[u.end];for(let h=0;h<7;h++){const p=be(n,.35,.9),_=ni(u.pts[0],u.end,p),x=h%2?1:-1,g=Mi(s,_,-Math.PI/2+x*be(n,.5,1),a*be(n,.12,.2)*i,2*t,1,e,n,{mat:f.BARKD,group:12});d.push(g.end)}for(const h of d)Fi(s,h,be(n,9,13)*t*i,be(n,7,10)*t,e,n,{mat:f.LEAF2,ragged:1.3});return mr(s,o,a*.55)}function Ic(n,e,t){const i=Xr(e),r=Math.round(220*t*i+50*t),a=Math.round(120*t),s=new on(r,a),o=r/2,c=a,l=10*t,u=Mi(s,[o,c],-Math.PI/2+(n()-.5)*.4*(e.gnarl+.3),a*.4,l,l*.75,e,n,{bend:1.2}),d=[];for(const _ of[-1,1,-1,1]){const x=Mi(s,u.end,-Math.PI/2+_*be(n,.7,1.15)*(.7+.3*i),a*be(n,.3,.42)*(.7+.3*i),l*.55,l*.25,e,n,{group:12});d.push(x.end,ni(u.end,x.end,.55))}Wa(s,o,c,l,e,n,t),Xa(s,e);const h=Math.round(be(n,2,3)),p=Math.min(...d.map(_=>_[1]));for(let _=0;_<h;_++){const x=p-6*t+_*9*t,g=(95-_*12)*t*(.65+.35*i);for(let m=0;m<5;m++)Fi(s,[o+(m-2)*g*.36+be(n,-5,5)*t,x+be(n,-3,3)*t],g*be(n,.2,.26),7*t,e,n,{mat:_===h-1?f.LEAF:f.LEAF3})}return mr(s,o,u.end[1]+4*t)}function Oo(n,e,t){const i=e.leafHue+(n()-.5)*e.leafVariety*.7+(t===Fo?.06:0);return{[f.TRUNK]:ve(e.trunkHue,.45*e.sat,.34),[f.BARKD]:ve(e.trunkHue+.03,.5*e.sat,.17),[f.BARKL]:ve(e.trunkHue-.01,.38*e.sat,.5),[f.BARK2]:[222,220,212],[f.LEAF]:ve(i,.62*e.sat,.58),[f.LEAF2]:ve(i-.05,.55*e.sat,.8),[f.LEAF3]:ve(i+.03,.66*e.sat,.38),[f.WEB]:[225,225,232]}}function Oh(n){const{sp:e,crownY:t}=n,i=new on(e.w,e.h),r=new on(e.w,e.h);for(let a=0;a<e.h;a++)for(let s=0;s<e.w;s++){const o=a*e.w+s,c=e.m[o];if(!c)continue;(Fh.has(c)&&a>=t?r:i).put(s,a,c,e.n[o*3],e.n[o*3+1],e.n[o*3+2])}return{top:i,bot:r}}function Bh(n,e){const t=e.bushSize,i=xc(n,["round","round","fern","grass","shrub"]),r=Math.round(40*t),a=Math.round(28*t),s=new on(r,a);if(i==="round"||i==="shrub"){const c=i==="shrub"?5:3;for(let l=0;l<c;l++)Fi(s,[r/2+be(n,-9,9)*t,a-8*t+be(n,-4,2)*t],be(n,7,10)*t,be(n,5,8)*t,e,n);if(i==="shrub"||n()<e.flowers)for(let l=0;l<18*e.flowers+3;l++){const u=r/2+be(n,-12,12)*t,d=a-be(n,5,17)*t;s.get(u,d)&&s.recolour(u,d,f.FLOWER)}}else if(i==="fern")for(let c=0;c<7;c++){const l=-Math.PI/2+(c/6-.5)*2.4;let u=r/2,d=a-1;for(let h=0;h<15*t;h++)u+=Math.cos(l)*.9,d+=Math.sin(l)*.9+h*.06,s.put(u,d,c%2?f.LEAF3:f.LEAF,Math.cos(l)*.4,-.2,.9),h%2&&(s.put(u,d-1,f.LEAF2,0,-.5,.85),s.put(u+Math.sign(Math.cos(l)),d+1,f.LEAF,0,.3,.9))}else for(let c=0;c<18*t;c++){const l=r/2+be(n,-13,13)*t,u=be(n,5,15)*t,d=be(n,-3,3);for(let h=0;h<u;h++)s.put(l+d*h/u*(h/u),a-1-h,h>u*.65?f.LEAF2:h<u*.3?f.LEAF3:f.LEAF,d*.1,-.3,.9)}const o=Oo(n,e,null);return o[f.FLOWER]=ve(n(),.55,.95),{sp:s,colours:o}}const at=(n,e={})=>["tree",{type:n,...e}],Fe=(n,e={})=>[n,e],Yr=[{id:"moor",name:"Moor",creature:"badger",by:"Ed",leaf:.24,floor:["moss",.26,.45,.42],text:{floor:"moss",wall:"puddles, a lake",small:"long grass",big:"moss mounds"},wall:[Fe("water",{w:1.6})],small:[Fe("grass",{h:1.4})],big:[Fe("mound",{moss:!0})]},{id:"fern-forest",name:"Fern forest",creature:"boar",by:"Ed",leaf:.3,floor:["needles",.08,.45,.32],text:{floor:"pine needles",small:"ferns",big:"pine trees"},small:[Fe("fern")],big:[at("fir")]},{id:"muddy-forest",name:"Muddy forest",creature:"snail",by:"Ed",leaf:.22,floor:["mud",.07,.5,.28],text:{floor:"mud and leaves",small:"short trunks with broken branches",big:"trees with many trunks and branches"},small:[Fe("stump",{snag:!0})],big:[at("broad",{trunks:3,gnarl:.9})]},{id:"stone-shrine",name:"Stone shrine",creature:"fox",by:"Ed",leaf:.28,floor:["stony",.25,.3,.45],text:{floor:"grassy, stony",wall:"mossy henges",small:"little stones",big:"big stones",set:"a shrine"},wall:[Fe("henge")],small:[Fe("stones")],big:[Fe("boulder")],set:Fe("shrine")},{id:"tangly-forest",name:"Tangly forest",creature:"ram",by:"Ed",leaf:.27,floor:["nettles",.28,.5,.3],text:{floor:"nettles and earth",small:"tangled branches",big:"fairly short tangly trees"},small:[Fe("bramble",{bare:!0})],big:[at("broad",{scale:.7,gnarl:1})]},{id:"wispy-forest",name:"Wispy forest",creature:"woodlouse",by:"Ed",leaf:.2,floor:["leaves",.09,.55,.45],text:{floor:"dry leaves",small:"tall thin wispy trees",big:"thick trees with several trunks"},small:[at("birch",{scale:.75})],big:[at("broad",{trunks:3,thick:1.4})]},{id:"hazel-forest",name:"Hazel forest",creature:"hedgehog",by:"Ed",leaf:.26,floor:["grass",.24,.45,.45],text:{floor:"short grass",small:"brown lumps",big:"crooked trees with many branches"},small:[Fe("mound",{brown:!0})],big:[at("broad",{gnarl:1,scale:.85})]},{id:"garden",name:"Garden",creature:"squirrel",by:"Ed",leaf:.3,floor:["lawn",.27,.5,.5],text:{floor:"uniform grass",wall:"ornate stone wall",small:"manicured flower beds",big:"willows",set:"a stone pavilion"},wall:[Fe("wall")],small:[Fe("flowerbed")],big:[at("willow")],set:Fe("pavilion")},{id:"twiggy-forest",name:"Twiggy forest",creature:"wolf",by:"Ed",leaf:.29,floor:["plants",.3,.5,.38],text:{floor:"small leafy plants",small:"small trees with many thin trunks",big:"straight but slanted trees with many trunks"},small:[at("broad",{trunks:4,scale:.5,thin:!0})],big:[at("broad",{trunks:3,lean:.3,gnarl:.1})]},{id:"ancient",name:"Ancient",creature:"stag",by:"Ed",leaf:.31,floor:["roots",.1,.25,.35],text:{floor:"mossy roots over rocks",small:"sorrel",big:"giant gnarly slanted trees"},small:[Fe("flowers",{hue:.98,leafy:!0})],big:[at("broad",{scale:1.4,gnarl:1,lean:.35})]},{id:"norway",name:"Norway",creature:"stoat",by:"Ed",leaf:.36,floor:["slate",.6,.15,.35],text:{floor:"pine needles and slate",small:"rocks",big:"straight pines"},small:[Fe("stones",{big:!0})],big:[at("fir",{scale:1.2})]},{id:"alder-forest",name:"Alder forest",creature:"snake",by:"Ed",leaf:.23,floor:["tallgrass",.22,.45,.42],text:{floor:"tall and short grass",small:"tree stumps with tall grass around",big:"tall slanted trees with thin leaves at different heights"},small:[Fe("stump",{grass:!0})],big:[at("birch",{lean:.3,scale:1.2,dark:!0})]},{id:"meadow",name:"Meadow",creature:"hare",by:"draft",leaf:.25,floor:["flowers",.25,.5,.5],text:{floor:"grass and wildflowers",small:"scattered hawthorn",big:"lone oaks"},small:[Fe("shrub",{flower:[250,245,235]})],big:[at("broad",{scale:1.1})]},{id:"old-oaks",name:"Old oaks",creature:"owl",by:"draft",leaf:.22,floor:["leaves",.07,.5,.35],text:{floor:"leaf litter",small:"acorns, fallen branches",big:"ancient gnarled oaks with hollow trunks",set:"a great hollow oak"},small:[Fe("cones",{acorn:!0}),Fe("log",{branch:!0})],big:[at("broad",{gnarl:.9,hollow:!0})],set:at("broad",{scale:1.6,gnarl:1,hollow:!0})},{id:"berry-thicket",name:"Berry thicket",creature:"bear",by:"draft",leaf:.32,floor:["needles",.08,.45,.3],text:{floor:"pine needles",wall:"bramble thickets",small:"berry bushes",big:"tall pines"},wall:[Fe("bramble")],small:[Fe("shrub",{flower:[200,30,60]})],big:[at("fir",{scale:1.3})]},{id:"wetland",name:"Wetland",creature:"toad",by:"draft",leaf:.2,floor:["mud",.15,.45,.3],text:{floor:"wet mud",wall:"puddles, reeds",small:"reeds and rushes",big:"willows"},wall:[Fe("water"),Fe("reeds",{tall:!0})],small:[Fe("reeds")],big:[at("willow")]},{id:"stream",name:"Stream",creature:"otter",by:"draft",leaf:.27,floor:["pebbles",.25,.3,.45],text:{floor:"pebbles and grass",wall:"a stream or pond",small:"alder saplings",big:"alders",set:"a fallen-log bridge"},wall:[Fe("water",{w:2})],small:[at("broad",{scale:.45})],big:[at("broad",{scale:.95,gnarl:.3})],set:Fe("bridge")},{id:"rocky-slope",name:"Rocky slope",creature:"lynx",by:"draft",leaf:.34,floor:["scree",.2,.2,.42],text:{floor:"scree and moss",wall:"boulders",small:"rocks",big:"pines",set:"a rocky outcrop"},wall:[Fe("boulder",{big:!0})],small:[Fe("stones",{big:!0})],big:[at("fir")],set:Fe("outcrop")},{id:"bog",name:"Bog",creature:"elk",by:"draft",leaf:.38,floor:["moss",.18,.55,.4],text:{floor:"sphagnum moss",wall:"bog pools",small:"cotton grass",big:"spruce"},wall:[Fe("water",{bog:!0})],small:[Fe("reeds",{cotton:!0})],big:[at("fir",{dark:!0})]},{id:"deadwood",name:"Deadwood",creature:"raven",by:"draft",leaf:.15,floor:["earth",.07,.35,.3],text:{floor:"bare earth",small:"broken branches",big:"blasted dead trees"},small:[Fe("log",{branch:!0})],big:[at("broad",{bare:!0,gnarl:1})]},{id:"cave-mouth",name:"Cave mouth",creature:"bat",by:"draft",leaf:.2,floor:["stone",.08,.15,.35],text:{floor:"stone and roots",wall:"rock walls",small:"stalagmite stubs",big:"dead trees",set:"a cave mouth"},wall:[Fe("rockwall")],small:[Fe("stalagmite")],big:[at("broad",{bare:!0})],set:Fe("cave")},{id:"grassland",name:"Grassland",creature:"mole",by:"draft",leaf:.25,floor:["grass",.26,.5,.48],text:{floor:"short turf",small:"molehills",big:"lone birches"},small:[Fe("mound",{brown:!0,small:!0})],big:[at("birch")]},{id:"beaver-pond",name:"Beaver pond",creature:"beaver",by:"draft",leaf:.17,floor:["leaves",.13,.6,.5],text:{floor:"birch leaves",wall:"a pond",small:"stumps",big:"birch and aspen",set:"a beaver dam"},wall:[Fe("water",{w:2})],small:[Fe("stump",{gnawed:!0})],big:[at("birch")],set:Fe("dam")},{id:"log-pile",name:"Log pile",creature:"beetle",by:"draft",leaf:.22,floor:["leaves",.06,.5,.3],text:{floor:"rotting leaves",small:"fungi",big:"rotting logs",set:"a fallen giant"},small:[Fe("fungi")],big:[Fe("log",{rot:!0})],set:Fe("log",{rot:!0,giant:!0})},{id:"heath",name:"Heath",creature:"moth",by:"draft",leaf:.27,floor:["heather",.85,.35,.4],text:{floor:"heather",small:"gorse",big:"wind-bent birches"},small:[Fe("shrub",{flower:[250,205,40],spiky:!0})],big:[at("birch",{lean:.45,scale:.75})]},{id:"old-pinewood",name:"Old pinewood",creature:"marten",by:"draft",leaf:.35,floor:["needles",.07,.4,.3],text:{floor:"pine needles",small:"pine cones",big:"tall old pines with knotholes"},small:[Fe("cones")],big:[at("fir",{scale:1.35})]},{id:"ravine",name:"Ravine",creature:"salamander",by:"draft",leaf:.3,floor:["stone",.3,.3,.32],text:{floor:"wet moss and rock",wall:"rock walls",small:"ferns",big:"mossy boulders",set:"a waterfall"},wall:[Fe("rockwall",{moss:!0})],small:[Fe("fern")],big:[Fe("boulder",{moss:!0,big:!0})],set:Fe("waterfall")},{id:"bluebell-glade",name:"Bluebell glade",creature:"glowworm",by:"draft",leaf:.26,floor:["bluebells",.27,.45,.4],text:{floor:"bluebells",small:"ferns",big:"beeches"},small:[Fe("fern")],big:[at("broad",{gnarl:.2,scale:1.1})]},{id:"holly-thicket",name:"Holly thicket",creature:"spider",by:"draft",leaf:.36,floor:["leaves",.08,.35,.28],text:{floor:"dead leaves",wall:"holly hedges",small:"cobwebs",big:"hollies",set:"a web-hung dead tree"},wall:[Fe("hedge",{berries:!0})],small:[Fe("web")],big:[at("broad",{scale:.7,dark:!0})],set:at("broad",{bare:!0,webs:!0})},{id:"honeysuckle-tangle",name:"Honeysuckle tangle",creature:"dormouse",by:"draft",leaf:.25,floor:["clover",.27,.45,.45],text:{floor:"grass and clover",wall:"bramble",small:"honeysuckle",big:"hazel coppice"},wall:[Fe("bramble")],small:[Fe("shrub",{flower:[250,230,170]})],big:[at("broad",{trunks:5,scale:.7,thin:!0})]}];for(const[n,[e,t]]of Object.entries(Ac)){const i=Yr.find(r=>r.id===n);i&&!i.set&&(i.set=Fe(e,{three:!0}),i.text={...i.text,set:t})}const zh=Object.fromEntries(Yr.map(n=>[n.id,n])),kh=["ruins","rocks","freak","lake","modern"],ft=(n,e,t,i,r,a,s,o,c,l,u={})=>({pattern:n,...u,density:e,clump:t,glades:{count:i[0],size:i[1]||[0,0]},heightMix:r&&{sapling:r[0],mature:r[1],tall:r[2],giant:r[3]},undergrowth:a,lean:{dir:s[0],amount:s[1]},terrain:o,decor:{rate:c[0],...Object.fromEntries(kh.map((d,h)=>[d,c[1][h]]))},feel:l}),At=[0,0],Gh={moor:ft("scatter",.2,.6,[2,[14,24]],null,.7,[30,.2],["pools","mounds","hollows"],[.5,[.3,.4,0,.3,0]],"Open rolling moss, low mounds and dark pools, long grass combed one way by the wind; you can see a long way."),"fern-forest":ft("groves",.65,.6,[2,[8,12]],[.2,.5,.25,.05],.9,At,["hollows","paths"],[.25,[.4,.3,.3,0,0]],"Pine groves standing waist-deep in ferns, with green sunken hollows between them."),"muddy-forest":ft("scatter",.7,.3,[1,[6,9]],[.25,.55,.17,.03],.4,At,["pools","paths"],[.3,[.3,.1,.2,.1,.3]],"Squelching mud between many-trunked trees, puddled ruts winding through, broken stumps everywhere."),"stone-shrine":ft("rings",.35,.8,[1,[10,14]],null,.3,At,["rocky","mounds"],[.5,[.6,.4,0,0,0]],"Big stones stand in rings round the shrine on stony grass; it feels deliberate and old."),"tangly-forest":ft("thicket",.9,.2,[1,[5,8]],[.35,.55,.1,0],.9,At,["hollows"],[.2,[.2,0,.6,0,.2]],"Short tangled trees packed close over nettles, low and claustrophobic, with one small clearing."),"wispy-forest":ft("stands",.55,.7,[2,[6,10]],[.15,.45,.3,.1],.5,At,["ridges"],[.3,[.4,.2,.3,0,.1]],"Stands of thick many-trunked trees, thin wispy saplings drifting between them over dry leaves."),"hazel-forest":ft("rings",.6,.6,[2,[6,9]],[.3,.55,.12,.03],.5,At,["mounds","paths"],[.3,[.4,.3,.3,0,0]],"Crooked hazels grown in loose fairy rings on short grass, lumpy little mounds in the middle of each."),garden:ft("rows",.45,0,[3,[6,10]],[.1,.7,.2,0],.6,At,["paths","pools"],[.4,[.7,0,0,.2,.1]],"A lost formal garden: willows in avenues along straight paths, lawns and flower beds, a pavilion at the heart.",{along:"paths"}),"twiggy-forest":ft("scatter",.75,.3,[1,[6,10]],[.25,.5,.2,.05],.6,[60,.5],["paths"],[.25,[.3,.2,.3,0,.2]],"Straight many-trunked trees all slanting the same way, like a wood frozen in a gale."),ancient:ft("lone",.4,.2,[1,[12,18]],[.05,.35,.4,.2],.4,[150,.25],["rocky","mounds","hollows"],[.45,[.5,.2,.3,0,0]],"Giant gnarled trees far apart, roots heaving over mossy rocks; every tree is a landmark."),norway:ft("stands",.8,.5,[1,[8,12]],[.15,.45,.35,.05],.2,At,["rocky","ridges"],[.3,[.2,.6,0,.2,0]],"Dense stands of straight pines on slate ridges, bare rock between; dark, vertical and cold."),"alder-forest":ft("scatter",.55,.4,[2,[6,10]],[.2,.4,.35,.05],.6,[120,.35],["stream","hollows"],[.3,[.3,.1,.2,.3,.1]],"Tall slanted alders at every height over long grass and stumps, a little stream wandering through."),meadow:ft("lone",.12,.1,[0],[.2,.5,.25,.05],.3,At,["mounds","paths"],[.35,[.3,.3,0,.2,.2]],"Wide-open wildflower grass with a lone oak here and there and scattered hawthorn; the sky does the work."),"old-oaks":ft("groves",.5,.5,[2,[10,16]],[.1,.35,.4,.15],.5,At,["mounds","hollows"],[.4,[.5,.1,.4,0,0]],"Groves of huge hollow oaks with broad clearings of leaf litter between; slow and grand."),"berry-thicket":ft("thicket",.85,.5,[2,[4,7]],[.2,.4,.35,.05],1,At,["paths"],[.15,[.3,0,.4,0,.3]],"Tall pines over solid berry bushes and brambles, only narrow animal paths and a couple of pockets of space."),wetland:ft("edgeOnly",.5,.5,[1,[16,24]],[.25,.55,.15,.05],.8,At,["pools","stream"],[.35,[.2,0,0,.6,.2]],"Open reedy water and mud in the middle, willows crowding the rim; wet and echoing."),stream:ft("rows",.5,.2,[1,[6,10]],[.3,.45,.2,.05],.5,At,["stream","pools"],[.3,[.3,.3,0,.3,.1]],"Alders lining both banks of a pebbly stream, saplings at the water's edge, open grass away from it.",{along:"stream"}),"rocky-slope":ft("scatter",.35,.6,[1,[8,12]],[.3,.5,.18,.02],.2,[90,.15],["rocky","ridges"],[.5,[.3,.7,0,0,0]],"Scree and boulders with pines clinging in clumps, everything leaning slightly uphill."),bog:ft("stands",.25,.85,[3,[10,20]],[.4,.5,.1,0],.6,At,["pools","mounds"],[.35,[.2,0,0,.5,.3]],"Sphagnum and bog pools, stunted spruce in tight dark stands, cotton grass pale between them."),deadwood:ft("scatter",.25,.2,[2,[8,14]],[.05,.3,.45,.2],.15,At,["ridges","hollows"],[.45,[.3,.1,.3,0,.3]],"Sparse tall blasted snags on bare ridges; bleak, quiet, with long sightlines."),"cave-mouth":ft("edgeOnly",.4,.5,[1,[10,14]],[.2,.5,.3,0],.2,At,["rocky","ridges"],[.4,[.3,.6,0,0,.1]],"Rock walls and dead trees ring an open stone floor that leads to the cave's dark mouth."),grassland:ft("lone",.1,.5,[0],[.3,.5,.2,0],.2,At,["mounds"],[.35,[.3,.2,0,.1,.4]],"Short turf to the horizon, molehills, birches alone or in twos and threes."),"beaver-pond":ft("edgeOnly",.55,.4,[1,[14,20]],[.4,.45,.15,0],.4,At,["pools","stream"],[.4,[.1,0,0,.7,.2]],"A pond in the middle, young birch and aspen round it, gnawed stumps where the big ones were felled."),"log-pile":ft("groves",.5,.7,[2,[6,10]],null,.7,At,["hollows","mounds"],[.3,[.3,0,.4,0,.3]],"Rotting logs heaped in piles, fungi everywhere, damp hollows between the heaps."),heath:ft("scatter",.2,.3,[1,[12,18]],[.5,.45,.05,0],.8,[30,.6],["ridges","paths"],[.4,[.4,.4,0,0,.2]],"Purple heather and gorse, small birches bent hard by the wind, all the same way."),"old-pinewood":ft("scatter",.5,.3,[2,[8,14]],[.1,.35,.4,.15],.15,At,["mounds","paths"],[.35,[.4,.3,.3,0,0]],"Cathedral-tall old pines on a clear floor of needles; you can see between the trunks a long way."),ravine:ft("edgeOnly",.55,.6,[1,[6,9]],null,.8,At,["stream","ridges","rocky"],[.4,[.3,.5,0,.2,0]],"A deep wet cleft: rock walls and mossy boulders either side, ferns, a stream down the middle."),"bluebell-glade":ft("groves",.45,.5,[3,[8,14]],[.1,.5,.35,.05],.3,At,["hollows"],[.35,[.4,0,.3,.3,0]],"Beech groves round open glades carpeted in bluebells; soft, bright and airy."),"holly-thicket":ft("thicket",.9,.3,[1,[6,9]],[.3,.6,.1,0],.7,At,["hollows"],[.25,[.3,0,.5,0,.2]],"Dark hollies packed close, cobwebs strung between, one clearing round the web-hung tree."),"honeysuckle-tangle":ft("stands",.6,.7,[2,[5,8]],[.45,.5,.05,0],.8,At,["paths","mounds"],[.3,[.3,0,.3,0,.4]],"Hazel coppice stools in clumps, honeysuckle and bramble between, clover paths winding through.")};for(const n of Yr)n.layout=Gh[n.id];function Hh(n,e,t=64,i=48){const[r,a,s,o]=n.floor,c=new on(t,i),l=n.id.length*131;for(let x=0;x<i;x++)for(let g=0;g<t;g++){const m=(xi(g/7,x/5,l)*(t-g)*(i-x)+xi((g-t)/7,x/5,l)*g*(i-x)+xi(g/7,(x-i)/5,l)*(t-g)*x+xi((g-t)/7,(x-i)/5,l)*g*x)/(t*i),M=m<.38?f.BODY2:m>.64?f.BELLY:f.BODY;c.px(g,x,M,0,-.42,.91)}const u=Lo(l),d=(x,g,m)=>c.px((x%t+t)%t,(g%i+i)%i,m,0,-.42,.91),h={moss:0,needles:70,mud:25,stony:30,nettles:60,leaves:80,grass:70,lawn:30,plants:60,roots:30,slate:40,tallgrass:90,flowers:70,pebbles:60,scree:70,earth:15,stone:40,heather:90,bluebells:90,clover:60}[r]??40;for(let x=0;x<h;x++){const g=Math.floor(u()*t),m=Math.floor(u()*i);if(r==="needles"){const M=u()<.5?1:-1;for(let E=0;E<3;E++)d(g+E*M,m+(E>>1),u()<.5?f.BODY2:f.ACCENT)}else if(["grass","lawn","tallgrass","plants","nettles","clover","flowers","bluebells","heather"].includes(r)){const M=r==="tallgrass"?4:r==="lawn"?1:2;for(let E=0;E<M;E++)d(g,m-E,E===M-1?f.LEAF2:f.LEAF);(r==="flowers"||r==="bluebells"||r==="heather"||r==="clover")&&u()<.5&&d(g+1,m-M,f.FLOWER)}else if(["stony","pebbles","scree","slate","stone","roots"].includes(r)){if(d(g,m,f.ACCENT),u()<.6&&d(g+1,m,f.ACCENT),u()<.4&&d(g,m+1,f.BODY2),r==="roots"&&u()<.5)for(let M=0;M<5;M++)d(g+M,m+(M>2?1:0),f.TRUNK)}else if(r==="leaves")d(g,m,f.FLOWER),d(g+1,m,f.FLOWER),u()<.5&&d(g,m+1,f.ACCENT);else if(r==="mud"||r==="earth")for(let M=0;M<3;M++)d(g+M,m,f.BODY2)}const p={flowers:ve(.13,.6,.95),bluebells:[90,110,230],heather:[180,90,170],clover:[240,235,240],leaves:ve(a+.02,.65,.6)}[r]||ve(a,.3,.6),_={[f.BODY]:ve(a,s*e.sat,o),[f.BODY2]:ve(a+.02,s*e.sat*1.1,o*.78),[f.BELLY]:ve(a-.02,s*e.sat*.9,Math.min(1,o*1.15)),[f.ACCENT]:r==="needles"?ve(.07,.5,.5):ve(.1,.08,.62),[f.FLOWER]:p,[f.LEAF]:ve(n.leaf,.55*e.sat,.45),[f.LEAF2]:ve(n.leaf-.03,.5*e.sat,.62),[f.TRUNK]:ve(e.trunkHue,.4,.3)};return{sp:c,colours:_}}const Ci=n=>({[f.ACCENT]:ve(.1,.06,.6),[f.BODY2]:ve(.62,.08,.4),[f.BELLY]:ve(.1,.05,.78),[f.LEAF]:ve(.27,.5,.45),[f.LEAF2]:ve(.25,.45,.62),[f.NOSE]:[20,16,24]});function ur(n,e,t,i,r,a,s){const o=[];for(let c=0;c<8;c++){const l=c/8*Math.PI*2,u=1+(a()-.5)*.3;o.push([e[0]+Math.cos(l)*t*u,e[1]+Math.sin(l)*i*u*(Math.sin(l)>0?.5:1)])}n.shape(o,f.ACCENT,{group:5,line:!0,round:r.round}),n.mark([Et(e,[-t,i*.1]),Et(e,[t,i*.1]),Et(e,[t,i]),Et(e,[-t,i])],f.BODY2,[f.ACCENT]),n.mark([Et(e,[-t*.6,-i*.8]),Et(e,[t*.1,-i*1.1]),Et(e,[t*.3,-i*.5]),Et(e,[-t*.3,-i*.3])],f.BELLY,[f.ACCENT]),s&&n.mark(Ha([Et(e,[-t*1.1,-i*.55]),Et(e,[0,-i*1.3]),Et(e,[t*1.1,-i*.5]),Et(e,[t*.6,-i*.2]),Et(e,[-t*.6,-i*.2])],0,3,3,i*.15,1),f.LEAF,[f.ACCENT,f.BELLY,f.BODY2])}function Ra(n,e,t,i,r,a){const s={[f.LEAF]:ve(t.leaf,.6*i.sat,.55),[f.LEAF2]:ve(t.leaf-.05,.55*i.sat,.78),[f.LEAF3]:ve(t.leaf+.03,.66*i.sat,.36)},o={[f.TRUNK]:ve(i.trunkHue,.45*i.sat,.34),[f.BARKD]:ve(i.trunkHue+.03,.5*i.sat,.17),[f.BARKL]:ve(i.trunkHue-.01,.38*i.sat,.5),[f.BELLY]:ve(i.trunkHue+.02,.3,.7)},c={[f.MAGIC]:[60,110,150],[f.MAGIC2]:[150,200,220],[f.BODY2]:[35,70,100]};if(n==="tree"){const x={broad:Lc,fir:Fo,willow:Pc,birch:Dc,flat:Ic}[e.type],g={...i,leafHue:t.leaf+(e.dark?.05:0),gnarl:e.gnarl??i.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},m=x(r,g,i.treeSize*a*(e.scale||1)*be(r,.9,1.1)),M=Oo(r,g,x);return e.dark&&(M[f.LEAF]=M[f.LEAF3],M[f.LEAF3]=ve(t.leaf+.05,.7,.22)),M[f.NOSE]=[20,16,24],M[f.WEB]=[225,225,232],{sp:m.sp,colours:M}}if(n==="shrub"){const x=Bh(r,{...i,leafHue:t.leaf,bushSize:i.bushSize*a,flowers:1});for(let g=0;g<x.sp.m.length;g++)x.sp.m[g]&&an(g,1,3)<(e.spiky?.18:.1)&&x.sp.m[g]!==f.TRUNK&&(x.sp.m[g]=f.FLOWER);return x.colours[f.FLOWER]=e.flower,x}const l=Math.round(48*a*(e.w||1)),u=Math.round(32*a),d=new on(l,u),h=l/2,p=u;let _={};if(n==="grass"||n==="reeds"||n==="fern"||n==="flowers"||n==="flowerbed"){const x=n==="flowerbed"?40:24,g=(n==="reeds"?e.tall?26:20:n==="fern"?14:10*(e.h||1))*a;n==="flowerbed"&&d.shape([[h-20*a,p-2],[h-18*a,p-6*a],[h+18*a,p-6*a],[h+20*a,p-2],[h+20*a,p],[h-20*a,p]],f.ACCENT,{group:2,line:!0});for(let m=0;m<x;m++){const M=h+be(r,-16,16)*a,E=g*be(r,.5,1),b=n==="fern"?be(r,-6,6)*a:be(r,-2,2)*a,R=p-1-(n==="flowerbed"?5*a:0);for(let w=0;w<E;w++){const P=w/E;d.px(M+b*P*P,R-w,P>.7?f.LEAF2:P<.3?f.LEAF3:f.LEAF,b*.05,-.3,.9),n==="fern"&&w%2&&d.px(M+b*P*P+(b>0?1:-1),R-w+1,f.LEAF2,0,-.3,.9)}if(n==="reeds"&&(e.cotton||r()<.5))for(let w=0;w<(e.cotton?2:3);w++)d.px(M+b,R-E-w,e.cotton?f.WEB:f.TRUNK,0,-.5,.85);(n==="flowers"||n==="flowerbed")&&r()<.7&&(d.px(M+b,R-E,f.FLOWER,0,-.5,.85),d.px(M+b+1,R-E,f.FLOWER,0,-.5,.85))}if(_={...s,[f.FLOWER]:n==="flowerbed"?xc(r,[[230,80,120],[250,210,60],[150,110,230]]):ve(e.hue??.95,.6,.85),[f.TRUNK]:ve(.07,.5,.35),[f.WEB]:[240,240,235],[f.ACCENT]:ve(.08,.1,.55)},n==="flowerbed"){for(let m=0;m<d.m.length;m++)d.m[m]===f.FLOWER&&an(m,2,7)<.5&&(d.m[m]=f.BELLY);_[f.BELLY]=[250,245,240]}}else if(n==="stones"){for(let x=0;x<(e.big?3:6);x++)ur(d,[h+be(r,-14,14)*a,p-(e.big?5:2.5)*a],(e.big?6:3)*a*be(r,.7,1.2),(e.big?5:2.5)*a,i,r);_=Ci()}else if(n==="boulder")ur(d,[h,p-(e.big?11:8)*a],(e.big?18:13)*a,(e.big?12:9)*a,i,r,e.moss),_={...Ci(),...s,[f.ACCENT]:ve(.1,.06,.6)};else if(n==="henge")d.shape([[h-7*a,p],[h-8*a,p-18*a],[h-4*a,p-28*a],[h+5*a,p-27*a],[h+8*a,p-14*a],[h+7*a,p]],f.ACCENT,{group:5,line:!0,round:i.round}),d.mark([[h-9*a,p-30*a],[h+9*a,p-30*a],[h+9*a,p-22*a],[h-9*a,p-18*a]],f.LEAF,[f.ACCENT]),_={...Ci(),...s};else if(n==="mound"){const x=(e.small?8:14)*a,g=(e.small?5:8)*a;d.shape(Ha([[h-x,p],[h-x*.6,p-g*.8],[h,p-g],[h+x*.6,p-g*.8],[h+x,p]],0,4,e.moss?3:1,(e.moss?1.5:.8)*a,1),e.moss?f.LEAF:f.TRUNK,{group:5,round:i.round}),d.mark([[h-x,p-g*.45],[h+x,p-g*.45],[h+x,p],[h-x,p]],e.moss?f.LEAF3:f.BARKD,[e.moss?f.LEAF:f.TRUNK]),_={...s,...o,[f.TRUNK]:ve(.07,.45,e.brown?.35:.3)}}else if(n==="stump"){const x=6*a;if(d.limb([[h,p,x*2.2],[h,p-8*a,x*1.6]],f.TRUNK,{group:5,round:i.round,cap:0,capEnd:0}),d.shape([[h-x*.8,p-8*a],[h,p-10*a-(e.gnawed?4*a:0)],[h+x*.8,p-8*a],[h,p-7*a]],f.BELLY,{group:6,round:i.round}),e.snag&&d.limb([[h+x*.4,p-8*a,2.5*a],[h+x*1.6,p-15*a,1.5*a]],f.TRUNK,{group:7,round:i.round}),e.grass)for(let g=0;g<20;g++){const m=h+be(r,-14,14)*a,M=be(r,6,13)*a;for(let E=0;E<M;E++)d.px(m,p-1-E,E>M*.6?f.LEAF2:f.LEAF,0,-.3,.9)}_={...s,...o}}else if(n==="log"){const x=(e.giant?46:e.branch?18:30)*a,g=(e.giant?14:e.branch?3:8)*a;if(d.limb([[h-x/2,p-g/2,g],[h+x/2,p-g/2-(e.branch?2*a:0),g*.9]],f.TRUNK,{group:5,round:i.round,cap:.3,capEnd:.3}),e.branch||d.shape([[h+x/2-g*.1,p-g],[h+x/2+g*.2,p-g/2],[h+x/2-g*.1,p],[h+x/2-g*.3,p-g/2]],f.BELLY,{group:6,round:i.round}),e.rot)for(let m=0;m<(e.giant?6:3);m++){const M=h+be(r,-x/2,x/3);d.shape([[M-3*a,p-g*.9],[M,p-g-3*a],[M+3*a,p-g*.9]],f.FLOWER,{group:7,line:!0,round:i.round})}e.branch&&d.limb([[h,p-g,g*.7],[h+5*a,p-g-6*a,g*.4]],f.TRUNK,{group:6,round:i.round}),_={...o,[f.FLOWER]:[230,190,120]}}else if(n==="fungi"){for(let x=0;x<5;x++){const g=h+be(r,-12,12)*a,m=be(r,3,7)*a,M=be(r,3,5)*a;d.limb([[g,p,1.6*a],[g,p-m,1.4*a]],f.BELLY,{group:5}),d.shape([[g-M,p-m],[g,p-m-M*.8],[g+M,p-m]],x%2?f.FLOWER:f.MAGIC,{group:6+x%2,line:!0,round:i.round})}_={[f.BELLY]:[225,215,195],[f.FLOWER]:[190,80,50],[f.MAGIC]:[120,230,200]}}else if(n==="cones"){for(let x=0;x<6;x++){const g=h+be(r,-14,14)*a,m=p-2*a;d.ellipse(g,m,(e.acorn?1.6:2)*a,(e.acorn?2:2.8)*a,f.TRUNK,{round:i.round}),e.acorn?d.ellipse(g,m-1.6*a,1.8*a,1*a,f.BARKD,{round:i.round}):d.px(g,m-1,f.BARKL)}_=o}else if(n==="water"){const x=22*a*(e.w||1),g=6*a;d.shape([[h-x,p-g],[h-x*.3,p-g*1.5],[h+x*.6,p-g*1.2],[h+x,p-g*.5],[h+x*.4,p],[h-x*.7,p-g*.2]],f.MAGIC,{group:5,round:.2});for(let m=0;m<6;m++){const M=h+be(r,-x*.6,x*.6),E=p-g*be(r,.4,1.1);for(let b=0;b<3*a;b++)d.recolour(M+b,E,f.MAGIC2)}_=e.bog?{[f.MAGIC]:[60,70,50],[f.MAGIC2]:[120,130,90]}:c;for(let m=0;m<d.m.length;m++)d.m[m]===f.MAGIC?d.m[m]=f.BODY:d.m[m]===f.MAGIC2&&(d.m[m]=f.BELLY);_={[f.BODY]:_[f.MAGIC],[f.BELLY]:_[f.MAGIC2]}}else if(n==="bramble"||n==="hedge"){const x=22*a,g=(n==="hedge"?18:12)*a;for(let m=0;m<(n==="hedge"?6:4);m++){const M=h+be(r,-x*.8,x*.8),E=p-g*be(r,.4,.7);d.ellipse(M,E,be(r,6,9)*a,g*.45,n==="hedge"?f.LEAF3:f.LEAF,{round:i.round,density:e.bare?.5:.95,noise:.5,seed:m})}for(let m=0;m<8;m++){let E=h+be(r,-x,x),b=p;for(let R=0;R<g*1.2;R++)E+=Math.sin(R*.3+m)*.8,b-=.8,d.px(E,b,f.TRUNK,0,-.3,.9)}if(n==="hedge"||e.berries||n==="bramble")for(let m=0;m<d.m.length;m++)d.m[m]&&d.m[m]!==f.TRUNK&&an(m,5,9)<.05&&(d.m[m]=f.FLOWER);_={...s,...o,[f.FLOWER]:n==="hedge"?[210,30,40]:[70,30,70]}}else if(n==="wall"){const x=22*a,g=12*a;d.shape([[h-x,p],[h-x,p-g],[h+x,p-g],[h+x,p]],f.ACCENT,{group:5,line:!0,depth:2}),d.shape([[h-x-1,p-g],[h-x-1,p-g-2*a],[h+x+1,p-g-2*a],[h+x+1,p-g]],f.BELLY,{group:6,line:!0,depth:2}),d.shape([[h+x-6*a,p-g-2*a],[h+x-6*a,p-g-7*a],[h+x,p-g-7*a],[h+x,p-g-2*a]],f.ACCENT,{group:7,line:!0,depth:2}),d.ellipse(h+x-3*a,p-g-9*a,3*a,2.5*a,f.BELLY,{round:i.round});for(let m=p-g+3*a;m<p;m+=4*a)for(let M=h-x;M<h+x;M++)d.recolour(M,m,f.BODY2);_=Ci()}else if(n==="rockwall"){for(let x=0;x<5;x++)ur(d,[h+(x-2)*9*a,p-be(r,8,14)*a],8*a,10*a,i,r,e.moss);_={...Ci(),...s}}else if(n==="stalagmite"){for(let x=0;x<4;x++){const g=h+be(r,-14,14)*a,m=be(r,5,11)*a;d.shape([[g-3*a,p],[g-1*a,p-m],[g+1*a,p-m],[g+3*a,p]],f.ACCENT,{group:5,line:!0,round:i.round})}_=Ci()}else if(n==="web"){const x=[h,p-14*a],g=11*a;for(let m=0;m<8;m++){const M=m/8*Math.PI*2;for(let E=0;E<g;E++)d.px(x[0]+Math.cos(M)*E,x[1]+Math.sin(M)*E,f.WEB,0,0,1)}for(let m=3*a;m<g;m+=3*a)for(let M=0;M<Math.PI*2;M+=.05)d.px(x[0]+Math.cos(M)*m,x[1]+Math.sin(M)*m,f.WEB,0,0,1);_={[f.WEB]:[225,230,240]}}return{sp:d,colours:_}}function Vh(n,e,t,i,r,a){if(e.three)return sh(n,t,i);if(n==="tree"||n==="log")return Ra(n,e,t,i,r,a);const s=Math.round(90*a),o=Math.round(70*a),c=new on(s,o),l=s/2,u=o;let d={...Ci(),[f.LEAF]:ve(t.leaf,.55,.5),[f.LEAF2]:ve(t.leaf-.04,.5,.7),[f.TRUNK]:ve(i.trunkHue,.45,.34),[f.BARKD]:ve(i.trunkHue+.03,.5,.17),[f.MAGIC]:ve(i.magicHue,.6,1),[f.MAGIC2]:ve(i.magicHue,.2,1)};if(n==="shrine")c.shape([[l-16*a,u],[l-14*a,u-6*a],[l+14*a,u-6*a],[l+16*a,u]],f.ACCENT,{group:5,line:!0,depth:2}),c.shape([[l-9*a,u-6*a],[l-9*a,u-26*a],[l+9*a,u-26*a],[l+9*a,u-6*a]],f.ACCENT,{group:6,line:!0,depth:2}),c.shape([[l-5*a,u-10*a],[l-5*a,u-20*a],[l,u-23*a],[l+5*a,u-20*a],[l+5*a,u-10*a]],f.NOSE,{group:7}),c.shape([[l-13*a,u-26*a],[l,u-34*a],[l+13*a,u-26*a]],f.BODY2,{group:8,line:!0,depth:2}),c.ellipse(l,u-13*a,2.5*a,2.5*a,f.MAGIC2,{round:.5}),c.mark([[l-14*a,u-36*a],[l+2*a,u-36*a],[l-4*a,u-24*a],[l-14*a,u-24*a]],f.LEAF,[f.BODY2,f.ACCENT]);else if(n==="pavilion"){c.shape([[l-26*a,u],[l-26*a,u-4*a],[l+26*a,u-4*a],[l+26*a,u]],f.ACCENT,{group:5,line:!0,depth:2});for(const h of[-20,-7,7,20])c.limb([[l+h*a,u-4*a,4*a],[l+h*a,u-34*a,4*a]],h===-7||h===7?f.BODY2:f.BELLY,{group:6+(h>0?1:0),line:!0,cap:0,capEnd:0});c.shape([[l-28*a,u-34*a],[l-28*a,u-38*a],[l+28*a,u-38*a],[l+28*a,u-34*a]],f.ACCENT,{group:8,line:!0,depth:2}),c.shape([[l-24*a,u-38*a],[l-16*a,u-54*a],[l,u-60*a],[l+16*a,u-54*a],[l+24*a,u-38*a]],f.BELLY,{group:9,line:!0})}else if(n==="bridge"){const h=Ra("water",{w:1.8},t,i,r,a);for(let p=0;p<h.sp.m.length;p++){const _=p%h.sp.w,x=p/h.sp.w|0,g=Math.round(l-h.sp.w/2+_),m=u-h.sp.h+x;h.sp.m[p]&&c.inb(g,m)&&c.px(g,m,h.sp.m[p]===f.BODY?f.IRIS:f.PUPIL,0,-.42,.91)}c.limb([[l-34*a,u-6*a,9*a],[l+34*a,u-10*a,8*a]],f.TRUNK,{group:6,line:!0,cap:.3,capEnd:.3}),d[f.IRIS]=[60,110,150],d[f.PUPIL]=[150,200,220]}else if(n==="outcrop")for(const[h,p,_,x]of[[-18,14,16,13],[12,12,18,12],[-2,28,15,13],[16,34,9,9]])ur(c,[l+h*a,u-p*a],_*a,x*a,i,r,!0);else if(n==="cave"){for(const[h,p,_,x]of[[-26,16,16,15],[26,16,16,15],[0,40,30,18],[-12,30,14,12],[12,30,14,12]])ur(c,[l+h*a,u-p*a],_*a,x*a,i,r,p>30);c.shape([[l-15*a,u],[l-14*a,u-18*a],[l-4*a,u-28*a],[l+6*a,u-27*a],[l+14*a,u-16*a],[l+15*a,u]],f.NOSE,{group:9,line:!0})}else if(n==="dam"){const h=Ra("water",{w:1.9},t,i,r,a);for(let p=0;p<h.sp.m.length;p++){const _=p%h.sp.w,x=p/h.sp.w|0,g=Math.round(l-h.sp.w/2+_),m=u-h.sp.h+x-10*a;h.sp.m[p]&&c.inb(g,m)&&c.px(g,m,h.sp.m[p]===f.BODY?f.IRIS:f.PUPIL,0,-.42,.91)}for(let p=0;p<26;p++){const _=l+be(r,-32,32)*a,x=u-be(r,2,14)*a,g=be(r,-.5,.5),m=be(r,8,16)*a;c.limb([[_-Math.cos(g)*m/2,x-Math.sin(g)*m/2,2.6*a],[_+Math.cos(g)*m/2,x+Math.sin(g)*m/2,2*a]],p%3?f.TRUNK:f.BARKD,{group:6+p%2,line:!0})}d[f.IRIS]=[60,110,150],d[f.PUPIL]=[150,200,220]}else if(n==="waterfall"){for(const[h,p,_,x]of[[-22,30,18,30],[22,30,18,30],[0,56,20,12]])ur(c,[l+h*a,u-p*a],_*a,x*a,i,r,!0);for(let h=l-6*a;h<l+6*a;h++)for(let p=u-50*a;p<u-4*a;p++)c.px(h,p,an(h|0,p/3|0,4)<.3?f.PUPIL:f.IRIS,0,-.2,.98);c.shape([[l-18*a,u],[l-14*a,u-6*a],[l+14*a,u-6*a],[l+18*a,u]],f.IRIS,{group:10,round:.2}),d[f.IRIS]=[90,150,190],d[f.PUPIL]=[210,235,245]}return{sp:c,colours:d}}function Wh(n,e,{K:t=2/(e.pixel||2),makeCanvas:i=_c}={}){const r=zh[n];if(!r)throw new Error(`no area type "${n}"`);const a=Lo(n.split("").reduce((u,d)=>u*31+d.charCodeAt(0),7)>>>0),s=(u,d,h)=>({sp:fr(u.sp,u.colours,e,"none",i),kind:d,text:h}),o=Hh(r,e),c=u=>(u||[]).map(([d,h])=>s(Ra(d,h,r,e,a,t),d,"")),l={def:r,floor:{sp:fr(o.sp,o.colours,e,"none",i),kind:r.floor[0],text:r.text.floor},walls:c(r.wall),small:c(r.small),big:c(r.big),setPiece:null};if(l.walls.forEach(u=>u.text=r.text.wall),l.small.forEach(u=>u.text=r.text.small),l.big.forEach(u=>u.text=r.text.big),r.set){const u=Vh(r.set[0],r.set[1],r,e,a,t);l.setPiece={...s(u,r.set[0],r.text.set),metres:u.metres}}return l}function Xh(n,e){const t=new Map,i=new Map,r=(c,l,u)=>(c*2097152+(l+1048576))*2097152+(u+1048576),a=(c,l,u)=>{const d=r(c,l,u);let h=t.get(d);if(!h){const p=Math.pow(2,-c);h=[p*(l+wt(l*7+c,u,n)),p*(u+wt(l,u*13+c,n+1))],t.set(d,h)}return h},s=(c,l,u)=>{const d=Math.pow(2,-c),h=Math.floor(l/d),p=Math.floor(u/d);let _=h,x=p,g=1/0;for(let m=-2;m<=2;m++)for(let M=-2;M<=2;M++){const E=a(c,h+m,p+M),b=(E[0]-l)**2+(E[1]-u)**2;b<g&&(g=b,_=h+m,x=p+M)}return[_,x]},o=(c,l,u)=>{const d=r(c,l,u);let h=i.get(d);if(h)return h;if(c===0)h=[l,u];else{const p=a(c,l,u),_=s(c-1,p[0],p[1]);h=o(c-1,_[0],_[1])}return i.set(d,h),h};return{seed:n,depth:e,site:(c,l)=>a(0,c,l),partition(c,l){const u=s(e,c,l);return o(e,u[0],u[1])},centreness(c,l,u){const d=a(0,u[0],u[1]),h=Math.hypot(c-d[0],l-d[1]);let p=1/0;const _=Math.floor(c),x=Math.floor(l);for(let g=-2;g<=2;g++)for(let m=-2;m<=2;m++){const M=_+g,E=x+m;if(M===u[0]&&E===u[1])continue;const b=a(0,M,E);p=Math.min(p,Math.hypot(c-b[0],l-b[1]))}return Math.min(1,2*h/(h+p))},openness(c,l){let u=1/0,d=1/0;const h=Math.floor(c),p=Math.floor(l);for(let _=-2;_<=2;_++)for(let x=-2;x<=2;x++){const g=a(0,h+_,p+x),m=Math.hypot(c-g[0],l-g[1]);m<u?(d=u,u=m):m<d&&(d=m)}return Math.min(1,2*u/(u+d))}}}const Yh=Gu.types,kn=Yr.map(n=>({id:n.id,name:n.name,creature:n.creature,text:n.text,setPiece:n.set?n.text.set??"a set piece":"",hasWalls:!!n.wall?.length,floor:[n.floor[1],n.floor[2],n.floor[3]],treeDensity:Yh[n.id]?.treeDensity??1})),or=(n,e)=>n+","+e;function Kh(n){if(n==null||n.trim()==="")return null;const e=n.trim();if(/^\d{1,9}$/.test(e))return Number(e);let t=2166136261;for(let i=0;i<e.length;i++)t=Math.imul(t^e.charCodeAt(i),16777619);return(t>>>0)%1e9}function qh(n,e,t,i){const r=new Map,a=(c,l)=>{if(c[0]===l[0]&&c[1]===l[1])return;const u=or(c[0],c[1]),d=or(l[0],l[1]);r.has(u)||r.set(u,new Set),r.has(d)||r.set(d,new Set),r.get(u).add(d),r.get(d).add(u)},s=(t-e)*i;let o=[];for(let c=0;c<=s;c++){const l=[];for(let u=0;u<=s;u++){const d=n.partition(e+u/i,e+c/i);l.push(d),u>0&&a(d,l[u-1]),c>0&&a(d,o[u])}o=l}return r}function Zh(n,e){const t=e.mapAreas,i=2,r=e.areaSize*e.areaScale,a=kn.length,s=3,o=Math.max(0,Math.min(1,e.areaSizeVariance))*s*.3,c=(F,D)=>{const B=F/r,W=D/r;return[B+o*(cl(B/s,W/s,n+91)-.5)*2,W+o*(cl(B/s,W/s,n+92)-.5)*2]},l=(F,D)=>{let B=F*r,W=D*r;for(let $=0;$<30;$++){const[ae,q]=c(B,W);B+=(F-ae)*r,W+=(D-q)*r}return[B,W]},u=Xh(n,e.borderLayers),d=-i,h=t+i,p=qh(u,d,h,6),_=new Map,x=Br(n*5+1);for(let F=d;F<h;F++)for(let D=d;D<h;D++){const B=new Set;for(let ae=-2;ae<=2;ae++)for(let q=-2;q<=2;q++){const ee=_.get(or(D+q,F+ae));ee!==void 0&&B.add(ee)}for(const ae of p.get(or(D,F))??[]){const q=_.get(ae);q!==void 0&&B.add(q)}const W=[...Array(a).keys()].filter(ae=>!B.has(ae)),$=W.length?W:[...Array(a).keys()];_.set(or(D,F),$[Math.floor(x()*$.length)])}const g=(F,D)=>_.get(or(F,D))??Math.floor(wt(F,D,n+17)*a),m=Math.floor(t/2),M=(F,D)=>{const B=u.site(F,D),W=u.partition(B[0],B[1]);return W[0]===F&&W[1]===D};let E=[m,m];for(const[F,D]of[[0,0],[1,0],[0,1],[-1,0],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]])if(M(m+F,m+D)){E=[m+F,m+D];break}const b=(F,D)=>{const B=u.site(F,D),W=l(B[0],B[1]);return{x:W[0],z:W[1]}},R=b(E[0],E[1]),w=(F,D)=>{const[B,W]=c(F,D),$=u.partition(B,W);return{cell:$,type:g($[0],$[1]),openness:u.openness(B,W)}},P=4.5,S=P*2.2,T=(F,D)=>{if(Math.hypot(F-R.x,D-R.z)<S)return 0;const[B,W]=c(F,D);return xr((u.openness(B,W)-e.clearingSize)/Math.max(.01,e.clearingFalloff))*e.treeDensity},I=(F,D)=>{const B=kn[g(F,D)];return B.setPiece&&wt(F,D,n+61)<e.setPieceChance?B.setPiece:null},C=(F,D)=>Math.min(1,Math.hypot(F-E[0],D-E[1])/(t/2)),O=r*.5;return{seed:n,tuning:e,n:t,margin:i,areaSize:r,partition:u,centreCell:E,dancefloor:{x:R.x,z:R.z,radius:P},start:{x:R.x,z:R.z+2},bounds:{minX:O,maxX:t*r-O,minZ:O,maxZ:t*r-O},extent:{minX:d*r,maxX:h*r,minZ:d*r,maxZ:h*r},typeOf:g,areaAt:w,siteOf:b,treeWeight:T,neighbours:p,setPieceOf:I,remoteness:C}}function $h(n,e,t=.5){const i=n.tuning,r=Ni(e,0,1),a=Math.round(Nn(i.creaturesNear,i.creaturesFar,Math.pow(r,i.creatureCurve))+(t-.5)*2),s=Math.min(Math.max(0,a),Math.round(i.legendsFar*xr((r-i.legendsFrom)/Math.max(.01,1-i.legendsFrom))+(t-.5)*.8)),o=Math.round(Math.max(0,a-s)*i.youngShareFar*r);return{babies:Math.max(0,a-s-o),young:o,legends:s}}const Jh=(n,e,t=0)=>(n.tuning.clearingSize+n.tuning.clearingFalloff*.3)*n.areaSize*.5*(e===2?.55:.8)*(1+t);function Qh(n){const e=[],t=n.tuning;let i=0;const[r,a]=n.centreCell;for(let s=0;s<n.n;s++)for(let o=0;o<n.n;o++){if(o===r&&s===a)continue;const c=Br(n.seed*7919+o*131+s*977+3),l=kn[n.typeOf(o,s)],u=n.siteOf(o,s),d=n.remoteness(o,s),h=$h(n,d,wt(o,s,n.seed+43)),p=x=>{const g=Jh(n,x,d),m=c()*Math.PI*2,M=Math.sqrt(c())*g,E=u.x+Math.cos(m)*M,b=u.z+Math.sin(m)*M;return{id:i++,species:l.creature,cell:[o,s],level:x,homeX:u.x,homeZ:u.z,range:g,x:E,z:b,tx:E,tz:b,rest:c()*3,speed:(x===2?t.legendSpeed:t.creatureSpeed)*(.7+c()*.6),facing:c()<.5?1:-1,moving:!1,walk:c(),rand:Br(n.seed*31+i*7+11)}};for(let x=0;x<h.babies;x++)e.push(p(0));for(let x=0;x<h.young;x++)e.push(p(1));const _=o===r+1&&s===a?Math.max(1,h.legends):h.legends;for(let x=0;x<_;x++)e.push(p(2))}return e}function jh(n,e){if(n.rest>0){n.rest-=e,n.moving=!1;return}const t=n.tx-n.x,i=n.tz-n.z,r=Math.hypot(t,i);if(r<.05){const s=n.rand()*Math.PI*2,o=Math.sqrt(n.rand())*n.range;n.tx=n.homeX+Math.cos(s)*o,n.tz=n.homeZ+Math.sin(s)*o,n.rest=.8+n.rand()*3.5,n.moving=!1;return}const a=Math.min(r,n.speed*e);n.x+=t/r*a,n.z+=i/r*a,Math.abs(t)>.02&&(n.facing=t>0?1:-1),n.moving=!0,n.walk+=e*(n.level===2?1.5:4)}function ed(n,e,t,i,r){for(const a of n)Math.abs(a.homeX-e)<i&&Math.abs(a.homeZ-t)<i&&jh(a,r)}const Nc=6,td=4,Zt=32;function nd(n){const e=n.tuning.camera.treetop.angleIn*Math.PI/180;return n.tuning.crownHeight/Math.sin(e)}function id(n,e,t){const{treeSpacingX:i,treeSpacingZ:r}=n.tuning,a=n.seed,s=[],o=nd(n),c=n.tuning.crownHalfWidth,l=Math.ceil(t*Zt/r),u=Math.ceil((t+1)*Zt/r);for(let d=l;d<u;d++){const h=d&1?.5:0,p=Math.ceil(e*Zt/i-h),_=Math.ceil((e+1)*Zt/i-h);for(let x=p;x<_;x++){const g=(x+h+(wt(x,d,a+101)-.5)*.7)*i,m=(d+(wt(x,d,a+102)-.5)*.7)*r,M=n.areaAt(g,m);wt(x,d,a+103)>=n.treeWeight(g,m)*kn[M.type].treeDensity||n.treeWeight(g,m-o)===0||n.treeWeight(g-c,m-o)===0||n.treeWeight(g+c,m-o)===0||s.push({x:g,z:m,type:M.type,variant:Math.floor(wt(x,d,a+104)*Nc),flip:wt(x,d,a+105)<.5})}}return s}function rd(n,e,t){const i=n.tuning.bushSpacing,r=n.seed,a=[],s=Math.ceil(t*Zt/i),o=Math.ceil((t+1)*Zt/i),c=Math.ceil(e*Zt/i),l=Math.ceil((e+1)*Zt/i);for(let u=s;u<o;u++)for(let d=c;d<l;d++){const h=(d+(wt(d,u,r+201)-.5)*.9)*i,p=(u+(wt(d,u,r+202)-.5)*.9)*i;wt(d,u,r+203)>(.12+Math.min(1,n.treeWeight(h,p))*.3)*n.tuning.bushDensity||a.push({x:h,z:p,type:n.areaAt(h,p).type,variant:Math.floor(wt(d,u,r+204)*td),flip:wt(d,u,r+205)<.5})}return a}function ad(n,e,t){const i=n.tuning.wallSpacing,r=n.seed,a=[],s=Math.ceil(t*Zt/i),o=Math.ceil((t+1)*Zt/i),c=Math.ceil(e*Zt/i),l=Math.ceil((e+1)*Zt/i);for(let u=s;u<o;u++)for(let d=c;d<l;d++){if(wt(d,u,r+303)>n.tuning.wallDensity)continue;const h=(d+(wt(d,u,r+301)-.5)*.6)*i,p=(u+(wt(d,u,r+302)-.5)*.6)*i,_=n.areaAt(h,p);_.openness<.82||!kn[_.type].hasWalls||a.push({x:h,z:p,type:_.type,variant:Math.floor(wt(d,u,r+304)*4),flip:wt(d,u,r+305)<.5})}return a}class sd{constructor(e){this.map=e}map;trees=new Map;bushes=new Map;walls=new Map;chunks(e,t,i){const r=[];for(let a=Math.floor((t-i)/Zt);a<=Math.floor((t+i)/Zt);a++)for(let s=Math.floor((e-i)/Zt);s<=Math.floor((e+i)/Zt);s++)r.push([s,a]);return r}gather(e,t,i,r,a){e.size>600&&e.clear();const s=[];for(const[o,c]of this.chunks(i,r,a)){const l=o+","+c;let u=e.get(l);u||(u=t(o,c),e.set(l,u));for(const d of u)Math.abs(d.x-i)<=a&&Math.abs(d.z-r)<=a&&s.push(d)}return s}treesNear(e,t,i){return this.gather(this.trees,(r,a)=>id(this.map,r,a),e,t,i)}bushesNear(e,t,i){return this.gather(this.bushes,(r,a)=>rd(this.map,r,a),e,t,i)}wallsNear(e,t,i){return this.gather(this.walls,(r,a)=>ad(this.map,r,a),e,t,i)}setPiecesNear(e,t,i){const r=this.map,a=r.areaSize,s=[];for(let o=Math.floor((t-i)/a)-1;o<=Math.floor((t+i)/a)+1;o++)for(let c=Math.floor((e-i)/a)-1;c<=Math.floor((e+i)/a)+1;c++){if(c===r.centreCell[0]&&o===r.centreCell[1]||!r.setPieceOf(c,o))continue;const l=r.siteOf(c,o);Math.abs(l.x-e)<=i&&Math.abs(l.z-4-t)<=i&&s.push({x:l.x,z:l.z-4,type:r.typeOf(c,o),variant:0,flip:wt(c,o,r.seed+71)<.5})}return s}}function od(n,e){return{x:n,z:e,vx:0,vz:0,lift:0,mode:"ground",facing:1}}const Bo=(n,e)=>Nn(e.groundHeight,e.treetopHeight,xr(n.lift)),is=n=>xr(n.lift);function ld(n,e,t,i,r){let{mode:a,lift:s}=n;e.toggleMode&&(a=a==="ground"||a==="descending"?"rising":"descending"),a==="rising"?(s+=t/Math.max(.001,i.riseTime),s>=1&&(s=1,a="treetop")):a==="descending"&&(s-=t/Math.max(.001,i.descendTime),s<=0&&(s=0,a="ground"));let o=e.moveX,c=e.moveZ;const l=Math.hypot(o,c);l>1&&(o/=l,c/=l);const u=Nn(i.groundSpeed,i.treetopSpeed,xr(s)),d=1-Math.exp(-i.acceleration*t);let h=n.vx+(o*u-n.vx)*d,p=n.vz+(c*u-n.vz)*d,_=n.x+h*t,x=n.z+p*t;(_<r.minX||_>r.maxX)&&(_=Ni(_,r.minX,r.maxX),h=0),(x<r.minZ||x>r.maxZ)&&(x=Ni(x,r.minZ,r.maxZ),p=0);const g=h>.3?1:h<-.3?-1:n.facing;return{x:_,z:x,vx:h,vz:p,lift:s,mode:a,facing:g}}function cd(n,e){const t=Zh(n,e),i=od(t.start.x,t.start.z);return{seed:n,tuning:e,map:t,forest:new sd(t),creatures:Qh(t),clock:Bu(),witch:i,camera:Nu(e,i.x,Bo(i,e),i.z)}}function ud(n,e,t){const i=zu(n.clock,t);i!==0&&(n.witch=ld(n.witch,e,i,n.tuning,n.map.bounds),n.camera=Uu(n.camera,e.zoom,{x:n.witch.x,y:Bo(n.witch,n.tuning),z:n.witch.z},{x:n.witch.vx,z:n.witch.vz},n.witch.lift,i,n.tuning),ed(n.creatures,n.witch.x,n.witch.z,n.tuning.creatureSimRadius,i))}const hd=n=>Fu(n.camera,n.camera.lift,n.tuning);function Uc(n){const e=n.map.areaAt(n.witch.x,n.witch.z),t=n.map.setPieceOf(e.cell[0],e.cell[1]);return kn[e.type].name+(t?` (set piece: ${t})`:"")}const dd="Witch tuning. Edit the numbers, push, and the playable link rebuilds. Distances are metres, times seconds, angles degrees. Keys starting with _ are notes.",fd="The forest: mapAreas x mapAreas areas cut by the fractal partition. An area is areaSize x areaScale metres across on average (areaScale 1.4 doubles the ground of the first 28 m areas; push it for bigger). areaSizeVariance (0-1) makes areas vary in size, some small, some large. borderLayers sets how wiggly borders are.",pd=20,md=28,gd=1.4,_d=.7,xd=4,vd="treeDensity (0-1): the chance of a tree on each spot outside the clearings; clearingSize (0-1): how far out from an area's centre the ground stays fully open; clearingFalloff (0-1): over how much of the way to the border trees thicken, smoothly, to full density; trees sit on a staggered grid treeSpacingX by treeSpacingZ metres, so no two crowns pile up. A tree is left out where its crown (crownHalfWidth either side, crownHeight up) would hang over a clearing seen from the treetops.",Md=.9,Sd=.1,bd=.5,Ed=1,yd=5,wd=3,Ad=4.5,Td=5,Rd=3.4,Cd=4,Ld=.6,Pd="Speeds per mode, and how long rising and descending take.",Dd=14,Id=32,Nd=10,Ud=.7,Fd=.55,Od=1.4,Bd=11,zd="Near-isometric on the ground, after Transistor; lower over the treetops, looking toward the horizon to feel the speed. The camera follows the witch on a soft spring (follow: its stiffness; higher keeps her closer to the middle) and looks a little ahead of her: lookAhead seconds of flight, at most lookAheadMax metres, eased in at lookAheadEase. zoomEase and liftEase: how softly zoom and rising change the angle and distance. a narrow field of view (fov, degrees) seen from far off, so there is little perspective. Each mode has its own angle (degrees below horizontal) and distance from the witch, at zoomed-in and zoomed-out. Zoom moves between them in zoomSteps steps.",kd={fov:20,ground:{angleIn:38,angleOut:46,distanceIn:42,distanceOut:84},treetop:{angleIn:32,angleOut:36,distanceIn:70,distanceOut:120},lookAhead:.1,lookAheadMax:3,lookAheadEase:1.5,zoomEase:5,liftEase:8,zoomSteps:4,startZoom:1,follow:8},Gd="Everything the camera can see is drawn, plus viewMargin metres round the view, so nothing appears or vanishes on screen. haze: the twilight haze fades the forest from near to far metres from the witch; nothing is drawn beyond far. pixelSize: screen pixels per art pixel. glowReach: metres the witch's light reaches. spriteTilt: 1 = sprites face the camera fully, 0 = stand upright.",Hd=3,Vd=8,Wd=1,Xd=1,Yd=16,Kd=12,qd={near:90,far:220},Zd="bloom: a gentle glow round bright things (strength 0 or on false turns it off; threshold: how bright a pixel must be to glow). tiltShift: blurs the top and bottom of the screen so the forest looks like a miniature. strength: the blur at the screen's edges, in pixels; band: the height of the sharp band (0-1 of the screen); centre: where it sits (0 top, 0.5 middle, 1 bottom); where: 'before' blurs at the low resolution, before the pixels are scaled up, 'after' blurs the scaled-up image. Add ?tilt=before, ?tilt=after or ?tilt=off to the link to compare.",$d="shadows: a flat shadow under every tree (cast away from the moon), bush and creature. canopyShadow: a dappled shadow from the canopy overhead (height in metres), thinner in clearings, drifting with the wind. mist: a low drifting mist (height in metres above the ground). Each has on and strength.",Jd={on:!0,strength:.7},Qd={on:!0,strength:.45,height:8,cover:.55,wind:.6},jd={on:!0,strength:.12,height:3,wind:.8},ef={on:!0,strength:.7,threshold:.55},tf={on:!0,where:"before",strength:3,band:.4,centre:.55},nf="Creatures grow more numerous and older with an area's distance from home (0 at the dancefloor, 1 at the map's edge): creaturesNear in the areas round home, creaturesFar at the edge (creatureCurve shapes the rise), youngShareFar of them young at the edge, and legendsFar legends from legendsFrom outward. Only creatures within creatureSimRadius metres of the witch move.",rf=2,af=20,sf=1.3,of=.5,lf=2,cf=.55,uf=110,hf=.6,df="setPieceChance: the share of areas, among the types that have a set piece, that show theirs. Wall objects (an area type's edges: puddles, henges, hedges) stand where areas meet, one per wallSpacing metres with chance wallDensity; they do not block movement.",ff=.25,pf=.35,mf={_readme:dd,_map:fd,mapAreas:pd,areaSize:md,areaScale:gd,areaSizeVariance:_d,borderLayers:xd,_trees:vd,treeDensity:Md,clearingSize:Sd,clearingFalloff:bd,bushDensity:Ed,treeSpacingX:yd,treeSpacingZ:wd,crownHalfWidth:Ad,crownHeight:Td,bushSpacing:Rd,wallSpacing:Cd,wallDensity:Ld,_witch:Pd,groundSpeed:Dd,treetopSpeed:Id,acceleration:Nd,riseTime:Ud,descendTime:Fd,groundHeight:Od,treetopHeight:Bd,_camera:zd,camera:kd,_look:Gd,pixelSize:Hd,glowReach:Vd,glowHeight:Wd,spriteTilt:Xd,artPixelsPerMetre:Yd,viewMargin:Kd,haze:qd,_post:Zd,_shadows:$d,shadows:Jd,canopyShadow:Qd,mist:jd,bloom:ef,tiltShift:tf,_creatures:nf,creaturesNear:rf,creaturesFar:af,creatureCurve:sf,youngShareFar:of,legendsFar:lf,legendsFrom:cf,creatureSimRadius:uf,creatureSpeed:hf,_setPieces:df,setPieceChance:ff,legendSpeed:pf},Wi=mf;class gf{keys=new Set;pressed=new Set;padPrev=[];touch={x:0,y:0,toggle:!1,zoom:0,debug:!1};onAny=null;constructor(e=window){e.addEventListener("keydown",t=>{if(t.repeat){this.isGameKey(t.code)&&t.preventDefault();return}this.keys.add(t.code),this.isGameKey(t.code)&&t.preventDefault(),this.onAny?.()||this.pressed.add(t.code)}),e.addEventListener("keyup",t=>this.keys.delete(t.code)),e.addEventListener("blur",()=>this.keys.clear())}isGameKey(e){return/^(Arrow|Space$|Key[WASDQE]$|Minus$|Equal$|NumpadAdd$|NumpadSubtract$|Backquote$)/.test(e)}clearPresses(){this.pressed.clear();const e=this.touch;e.toggle=!1,e.zoom=0,e.debug=!1}read(){const e=d=>this.keys.has(d)?1:0,t=d=>this.pressed.has(d);let i=e("KeyD")+e("ArrowRight")-e("KeyA")-e("ArrowLeft"),r=e("KeyS")+e("ArrowDown")-e("KeyW")-e("ArrowUp"),a=t("Space"),s=(t("KeyQ")||t("Minus")||t("NumpadSubtract")?1:0)-(t("KeyE")||t("Equal")||t("NumpadAdd")?1:0),o=t("Backquote");this.pressed.clear();const c=typeof navigator<"u"&&navigator.getGamepads?navigator.getGamepads():[];for(const d of c){if(!d)continue;const h=b=>!!d.buttons[b]?.pressed,_=d.buttons.some((b,R)=>b.pressed&&!this.padPrev[R])&&!!this.onAny?.(),x=b=>!_&&h(b)&&!this.padPrev[b];let g=d.axes[0]??0,m=d.axes[1]??0;const M=Math.hypot(g,m),E=.18;if(M<E)g=0,m=0;else{const b=(Math.min(1,M)-E)/(1-E)/M;g*=b,m*=b}g+=(h(15)?1:0)-(h(14)?1:0),m+=(h(13)?1:0)-(h(12)?1:0),i+=g,r+=m,x(0)&&(a=!0),(x(4)||x(6))&&(s+=1),(x(5)||x(7))&&(s-=1),x(8)&&(o=!0),this.padPrev=d.buttons.map(b=>b.pressed);break}const l=this.touch;i+=l.x,r+=l.y,l.toggle&&(a=!0),s+=l.zoom,l.debug&&(o=!0),l.toggle=!1,l.zoom=0,l.debug=!1;const u=Math.hypot(i,r);return u>1&&(i/=u,r/=u),{moveX:i,moveZ:r,toggleMode:a,zoom:Math.sign(s),debug:o}}}const zo="186",_f=0,xl=1,xf=2,Ca=1,vf=2,Ir=3,Oi=0,sn=1,jn=2,ii=0,Or=1,vl=2,Ml=3,Sl=4,Mf=5,ar=100,Sf=101,bf=102,Ef=103,yf=104,wf=200,Af=201,Tf=202,Rf=203,Fc=204,Oc=205,Cf=206,Lf=207,Pf=208,Df=209,If=210,Nf=211,Uf=212,Ff=213,Of=214,Bs=0,zs=1,ks=2,zr=3,Gs=4,Hs=5,Vs=6,Ws=7,Bc=0,Bf=1,zf=2,Bn=0,zc=1,kc=2,Gc=3,Hc=4,Vc=5,Wc=6,Xc=7,Yc=300,Bi=301,gr=302,rs=303,as=304,Ya=306,Xs=1e3,ei=1001,Ys=1002,Ot=1003,kf=1004,ta=1005,It=1006,ss=1007,Pi=1008,hn=1009,Kc=1010,qc=1011,kr=1012,ko=1013,Gn=1014,Fn=1015,Hn=1016,Go=1017,Ho=1018,Gr=1020,Zc=35902,$c=35899,Jc=1021,Qc=1022,xn=1023,oi=1026,Di=1027,jc=1028,Vo=1029,zi=1030,Wo=1031,Xo=1033,La=33776,Pa=33777,Da=33778,Ia=33779,Ks=35840,qs=35841,Zs=35842,$s=35843,Js=36196,Qs=37492,js=37496,eo=37488,to=37489,Fa=37490,no=37491,io=37808,ro=37809,ao=37810,so=37811,oo=37812,lo=37813,co=37814,uo=37815,ho=37816,fo=37817,po=37818,mo=37819,go=37820,_o=37821,xo=36492,vo=36494,Mo=36495,So=36283,bo=36284,Oa=36285,Eo=36286,Gf=3200,bl=0,Hf=1,wn="",mn="srgb",Hr="srgb-linear",Ba="linear",pt="srgb",os=7680,Vf=519,Wf=512,Xf=513,Yf=514,Yo=515,Kf=516,qf=517,Ko=518,Zf=519,$f=35044,eu=35048,El="300 es",On=2e3,za=2001;function Jf(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function ka(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Qf(){const n=ka("canvas");return n.style.display="block",n}const yl={};function wl(...n){const e="THREE."+n.shift();console.log(e,...n)}function tu(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ge(...n){n=tu(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function rt(...n){n=tu(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function hr(...n){const e=n.join(" ");e in yl||(yl[e]=!0,Ge(...n))}function jf(n,e,t){return new Promise(function(i,r){function a(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(a,t);break;default:i()}}setTimeout(a,t)})}const ep={[Bs]:zs,[ks]:Vs,[Gs]:Ws,[zr]:Hs,[zs]:Bs,[Vs]:ks,[Ws]:Gs,[Hs]:zr};class Gi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const a=r.indexOf(t);a!==-1&&r.splice(a,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let a=0,s=r.length;a<s;a++)r[a].call(this,e);e.target=null}}}const Yt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ls=Math.PI/180,yo=180/Math.PI;function Kr(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Yt[n&255]+Yt[n>>8&255]+Yt[n>>16&255]+Yt[n>>24&255]+"-"+Yt[e&255]+Yt[e>>8&255]+"-"+Yt[e>>16&15|64]+Yt[e>>24&255]+"-"+Yt[t&63|128]+Yt[t>>8&255]+"-"+Yt[t>>16&255]+Yt[t>>24&255]+Yt[i&255]+Yt[i>>8&255]+Yt[i>>16&255]+Yt[i>>24&255]).toLowerCase()}function tt(n,e,t){return Math.max(e,Math.min(t,n))}function tp(n,e){return(n%e+e)%e}function cs(n,e,t){return(1-t)*n+t*e}function wr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function tn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class Ve{static{Ve.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=tt(this.x,e.x,t.x),this.y=tt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=tt(this.x,e,t),this.y=tt(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(tt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(tt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),a=this.x-e.x,s=this.y-e.y;return this.x=a*i-s*r+e.x,this.y=a*r+s*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class vr{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,a,s,o){let c=i[r+0],l=i[r+1],u=i[r+2],d=i[r+3],h=a[s+0],p=a[s+1],_=a[s+2],x=a[s+3];if(d!==x||c!==h||l!==p||u!==_){let g=c*h+l*p+u*_+d*x;g<0&&(h=-h,p=-p,_=-_,x=-x,g=-g);let m=1-o;if(g<.9995){const M=Math.acos(g),E=Math.sin(M);m=Math.sin(m*M)/E,o=Math.sin(o*M)/E,c=c*m+h*o,l=l*m+p*o,u=u*m+_*o,d=d*m+x*o}else{c=c*m+h*o,l=l*m+p*o,u=u*m+_*o,d=d*m+x*o;const M=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=M,l*=M,u*=M,d*=M}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,r,a,s){const o=i[r],c=i[r+1],l=i[r+2],u=i[r+3],d=a[s],h=a[s+1],p=a[s+2],_=a[s+3];return e[t]=o*_+u*d+c*p-l*h,e[t+1]=c*_+u*h+l*d-o*p,e[t+2]=l*_+u*p+o*h-c*d,e[t+3]=u*_-o*d-c*h-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,a=e._z,s=e._order,o=Math.cos,c=Math.sin,l=o(i/2),u=o(r/2),d=o(a/2),h=c(i/2),p=c(r/2),_=c(a/2);switch(s){case"XYZ":this._x=h*u*d+l*p*_,this._y=l*p*d-h*u*_,this._z=l*u*_+h*p*d,this._w=l*u*d-h*p*_;break;case"YXZ":this._x=h*u*d+l*p*_,this._y=l*p*d-h*u*_,this._z=l*u*_-h*p*d,this._w=l*u*d+h*p*_;break;case"ZXY":this._x=h*u*d-l*p*_,this._y=l*p*d+h*u*_,this._z=l*u*_+h*p*d,this._w=l*u*d-h*p*_;break;case"ZYX":this._x=h*u*d-l*p*_,this._y=l*p*d+h*u*_,this._z=l*u*_-h*p*d,this._w=l*u*d+h*p*_;break;case"YZX":this._x=h*u*d+l*p*_,this._y=l*p*d+h*u*_,this._z=l*u*_-h*p*d,this._w=l*u*d-h*p*_;break;case"XZY":this._x=h*u*d-l*p*_,this._y=l*p*d-h*u*_,this._z=l*u*_+h*p*d,this._w=l*u*d+h*p*_;break;default:Ge("Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],a=t[8],s=t[1],o=t[5],c=t[9],l=t[2],u=t[6],d=t[10],h=i+o+d;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-c)*p,this._y=(a-l)*p,this._z=(s-r)*p}else if(i>o&&i>d){const p=2*Math.sqrt(1+i-o-d);this._w=(u-c)/p,this._x=.25*p,this._y=(r+s)/p,this._z=(a+l)/p}else if(o>d){const p=2*Math.sqrt(1+o-i-d);this._w=(a-l)/p,this._x=(r+s)/p,this._y=.25*p,this._z=(c+u)/p}else{const p=2*Math.sqrt(1+d-i-o);this._w=(s-r)/p,this._x=(a+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(tt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,a=e._z,s=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=i*u+s*o+r*l-a*c,this._y=r*u+s*c+a*o-i*l,this._z=a*u+s*l+i*c-r*o,this._w=s*u-i*o-r*c-a*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,a=e._z,s=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,a=-a,s=-s,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+a*t,this._w=this._w*c+s*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+a*t,this._w=this._w*c+s*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class X{static{X.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Al.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Al.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[3]*i+a[6]*r,this.y=a[1]*t+a[4]*i+a[7]*r,this.z=a[2]*t+a[5]*i+a[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,a=e.elements,s=1/(a[3]*t+a[7]*i+a[11]*r+a[15]);return this.x=(a[0]*t+a[4]*i+a[8]*r+a[12])*s,this.y=(a[1]*t+a[5]*i+a[9]*r+a[13])*s,this.z=(a[2]*t+a[6]*i+a[10]*r+a[14])*s,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,a=e.x,s=e.y,o=e.z,c=e.w,l=2*(s*r-o*i),u=2*(o*t-a*r),d=2*(a*i-s*t);return this.x=t+c*l+s*d-o*u,this.y=i+c*u+o*l-a*d,this.z=r+c*d+a*u-s*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r,this.y=a[1]*t+a[5]*i+a[9]*r,this.z=a[2]*t+a[6]*i+a[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=tt(this.x,e.x,t.x),this.y=tt(this.y,e.y,t.y),this.z=tt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=tt(this.x,e,t),this.y=tt(this.y,e,t),this.z=tt(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(tt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,a=e.z,s=t.x,o=t.y,c=t.z;return this.x=r*c-a*o,this.y=a*s-i*c,this.z=i*o-r*s,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return us.copy(this).projectOnVector(e),this.sub(us)}reflect(e){return this.sub(us.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(tt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const us=new X,Al=new vr;class He{static{He.prototype.isMatrix3=!0}constructor(e,t,i,r,a,s,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,a,s,o,c,l)}set(e,t,i,r,a,s,o,c,l){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=a,u[5]=c,u[6]=i,u[7]=s,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,a=this.elements,s=i[0],o=i[3],c=i[6],l=i[1],u=i[4],d=i[7],h=i[2],p=i[5],_=i[8],x=r[0],g=r[3],m=r[6],M=r[1],E=r[4],b=r[7],R=r[2],w=r[5],P=r[8];return a[0]=s*x+o*M+c*R,a[3]=s*g+o*E+c*w,a[6]=s*m+o*b+c*P,a[1]=l*x+u*M+d*R,a[4]=l*g+u*E+d*w,a[7]=l*m+u*b+d*P,a[2]=h*x+p*M+_*R,a[5]=h*g+p*E+_*w,a[8]=h*m+p*b+_*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],s=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*s*u-t*o*l-i*a*u+i*o*c+r*a*l-r*s*c}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],s=e[4],o=e[5],c=e[6],l=e[7],u=e[8],d=u*s-o*l,h=o*c-u*a,p=l*a-s*c,_=t*d+i*h+r*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/_;return e[0]=d*x,e[1]=(r*l-u*i)*x,e[2]=(o*i-r*s)*x,e[3]=h*x,e[4]=(u*t-r*c)*x,e[5]=(r*a-o*t)*x,e[6]=p*x,e[7]=(i*c-l*t)*x,e[8]=(s*t-i*a)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,a,s,o){const c=Math.cos(a),l=Math.sin(a);return this.set(i*c,i*l,-i*(c*s+l*o)+s+e,-r*l,r*c,-r*(-l*s+c*o)+o+t,0,0,1),this}scale(e,t){return hr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(hs.makeScale(e,t)),this}rotate(e){return hr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(hs.makeRotation(-e)),this}translate(e,t){return hr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(hs.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const hs=new He,Tl=new He().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Rl=new He().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function np(){const n={enabled:!0,workingColorSpace:Hr,spaces:{},convert:function(r,a,s){return this.enabled===!1||a===s||!a||!s||(this.spaces[a].transfer===pt&&(r.r=ri(r.r),r.g=ri(r.g),r.b=ri(r.b)),this.spaces[a].primaries!==this.spaces[s].primaries&&(r.applyMatrix3(this.spaces[a].toXYZ),r.applyMatrix3(this.spaces[s].fromXYZ)),this.spaces[s].transfer===pt&&(r.r=dr(r.r),r.g=dr(r.g),r.b=dr(r.b))),r},workingToColorSpace:function(r,a){return this.convert(r,this.workingColorSpace,a)},colorSpaceToWorking:function(r,a){return this.convert(r,a,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===wn?Ba:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,a=this.workingColorSpace){return r.fromArray(this.spaces[a].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,a,s){return r.copy(this.spaces[a].toXYZ).multiply(this.spaces[s].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,a){return hr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,a)},toWorkingColorSpace:function(r,a){return hr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,a)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Hr]:{primaries:e,whitePoint:i,transfer:Ba,toXYZ:Tl,fromXYZ:Rl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:mn},outputColorSpaceConfig:{drawingBufferColorSpace:mn}},[mn]:{primaries:e,whitePoint:i,transfer:pt,toXYZ:Tl,fromXYZ:Rl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:mn}}}),n}const et=np();function ri(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function dr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Xi;class ip{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Xi===void 0&&(Xi=ka("canvas")),Xi.width=e.width,Xi.height=e.height;const r=Xi.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Xi}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ka("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),a=r.data;for(let s=0;s<a.length;s++)a[s]=ri(a[s]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(ri(t[i]/255)*255):t[i]=ri(t[i]);return{data:t,width:e.width,height:e.height}}else return Ge("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let rp=0;class qo{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:rp++}),this.uuid=Kr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let a;if(Array.isArray(r)){a=[];for(let s=0,o=r.length;s<o;s++)r[s].isDataTexture?a.push(ds(r[s].image)):a.push(ds(r[s]))}else a=ds(r);i.url=a}return t||(e.images[this.uuid]=i),i}}function ds(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?ip.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ge("Texture: Unable to serialize Texture."),{})}let ap=0;const fs=new X;class jt extends Gi{constructor(e=jt.DEFAULT_IMAGE,t=jt.DEFAULT_MAPPING,i=ei,r=ei,a=It,s=Pi,o=xn,c=hn,l=jt.DEFAULT_ANISOTROPY,u=wn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ap++}),this.uuid=Kr(),this.name="",this.source=new qo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=a,this.minFilter=s,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Ve(0,0),this.repeat=new Ve(1,1),this.center=new Ve(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new He,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(fs).x}get height(){return this.source.getSize(fs).y}get depth(){return this.source.getSize(fs).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Ge(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ge(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Yc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Xs:e.x=e.x-Math.floor(e.x);break;case ei:e.x=e.x<0?0:1;break;case Ys:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Xs:e.y=e.y-Math.floor(e.y);break;case ei:e.y=e.y<0?0:1;break;case Ys:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}jt.DEFAULT_IMAGE=null;jt.DEFAULT_MAPPING=Yc;jt.DEFAULT_ANISOTROPY=1;class Tt{static{Tt.prototype.isVector4=!0}constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,a=this.w,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r+s[12]*a,this.y=s[1]*t+s[5]*i+s[9]*r+s[13]*a,this.z=s[2]*t+s[6]*i+s[10]*r+s[14]*a,this.w=s[3]*t+s[7]*i+s[11]*r+s[15]*a,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,a;const c=e.elements,l=c[0],u=c[4],d=c[8],h=c[1],p=c[5],_=c[9],x=c[2],g=c[6],m=c[10];if(Math.abs(u-h)<.01&&Math.abs(d-x)<.01&&Math.abs(_-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+x)<.1&&Math.abs(_+g)<.1&&Math.abs(l+p+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(l+1)/2,b=(p+1)/2,R=(m+1)/2,w=(u+h)/4,P=(d+x)/4,S=(_+g)/4;return E>b&&E>R?E<.01?(i=0,r=.707106781,a=.707106781):(i=Math.sqrt(E),r=w/i,a=P/i):b>R?b<.01?(i=.707106781,r=0,a=.707106781):(r=Math.sqrt(b),i=w/r,a=S/r):R<.01?(i=.707106781,r=.707106781,a=0):(a=Math.sqrt(R),i=P/a,r=S/a),this.set(i,r,a,t),this}let M=Math.sqrt((g-_)*(g-_)+(d-x)*(d-x)+(h-u)*(h-u));return Math.abs(M)<.001&&(M=1),this.x=(g-_)/M,this.y=(d-x)/M,this.z=(h-u)/M,this.w=Math.acos((l+p+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=tt(this.x,e.x,t.x),this.y=tt(this.y,e.y,t.y),this.z=tt(this.z,e.z,t.z),this.w=tt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=tt(this.x,e,t),this.y=tt(this.y,e,t),this.z=tt(this.z,e,t),this.w=tt(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(tt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class sp extends Gi{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:It,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Tt(0,0,e,t),this.scissorTest=!1,this.viewport=new Tt(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:i.depth},a=new jt(r),s=i.count;for(let o=0;o<s;o++)this.textures[o]=a.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:It,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,a=this.textures.length;r<a;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new qo(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class vn extends sp{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class nu extends jt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Ot,this.minFilter=Ot,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class op extends jt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Ot,this.minFilter=Ot,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class Pt{static{Pt.prototype.isMatrix4=!0}constructor(e,t,i,r,a,s,o,c,l,u,d,h,p,_,x,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,a,s,o,c,l,u,d,h,p,_,x,g)}set(e,t,i,r,a,s,o,c,l,u,d,h,p,_,x,g){const m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=r,m[1]=a,m[5]=s,m[9]=o,m[13]=c,m[2]=l,m[6]=u,m[10]=d,m[14]=h,m[3]=p,m[7]=_,m[11]=x,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Pt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,r=1/Yi.setFromMatrixColumn(e,0).length(),a=1/Yi.setFromMatrixColumn(e,1).length(),s=1/Yi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*a,t[5]=i[5]*a,t[6]=i[6]*a,t[7]=0,t[8]=i[8]*s,t[9]=i[9]*s,t[10]=i[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,a=e.z,s=Math.cos(i),o=Math.sin(i),c=Math.cos(r),l=Math.sin(r),u=Math.cos(a),d=Math.sin(a);if(e.order==="XYZ"){const h=s*u,p=s*d,_=o*u,x=o*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=p+_*l,t[5]=h-x*l,t[9]=-o*c,t[2]=x-h*l,t[6]=_+p*l,t[10]=s*c}else if(e.order==="YXZ"){const h=c*u,p=c*d,_=l*u,x=l*d;t[0]=h+x*o,t[4]=_*o-p,t[8]=s*l,t[1]=s*d,t[5]=s*u,t[9]=-o,t[2]=p*o-_,t[6]=x+h*o,t[10]=s*c}else if(e.order==="ZXY"){const h=c*u,p=c*d,_=l*u,x=l*d;t[0]=h-x*o,t[4]=-s*d,t[8]=_+p*o,t[1]=p+_*o,t[5]=s*u,t[9]=x-h*o,t[2]=-s*l,t[6]=o,t[10]=s*c}else if(e.order==="ZYX"){const h=s*u,p=s*d,_=o*u,x=o*d;t[0]=c*u,t[4]=_*l-p,t[8]=h*l+x,t[1]=c*d,t[5]=x*l+h,t[9]=p*l-_,t[2]=-l,t[6]=o*c,t[10]=s*c}else if(e.order==="YZX"){const h=s*c,p=s*l,_=o*c,x=o*l;t[0]=c*u,t[4]=x-h*d,t[8]=_*d+p,t[1]=d,t[5]=s*u,t[9]=-o*u,t[2]=-l*u,t[6]=p*d+_,t[10]=h-x*d}else if(e.order==="XZY"){const h=s*c,p=s*l,_=o*c,x=o*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=h*d+x,t[5]=s*u,t[9]=p*d-_,t[2]=_*d-p,t[6]=o*u,t[10]=x*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(lp,e,cp)}lookAt(e,t,i){const r=this.elements;return ln.subVectors(e,t),ln.lengthSq()===0&&(ln.z=1),ln.normalize(),di.crossVectors(i,ln),di.lengthSq()===0&&(Math.abs(i.z)===1?ln.x+=1e-4:ln.z+=1e-4,ln.normalize(),di.crossVectors(i,ln)),di.normalize(),na.crossVectors(ln,di),r[0]=di.x,r[4]=na.x,r[8]=ln.x,r[1]=di.y,r[5]=na.y,r[9]=ln.y,r[2]=di.z,r[6]=na.z,r[10]=ln.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,a=this.elements,s=i[0],o=i[4],c=i[8],l=i[12],u=i[1],d=i[5],h=i[9],p=i[13],_=i[2],x=i[6],g=i[10],m=i[14],M=i[3],E=i[7],b=i[11],R=i[15],w=r[0],P=r[4],S=r[8],T=r[12],I=r[1],C=r[5],O=r[9],F=r[13],D=r[2],B=r[6],W=r[10],$=r[14],ae=r[3],q=r[7],ee=r[11],N=r[15];return a[0]=s*w+o*I+c*D+l*ae,a[4]=s*P+o*C+c*B+l*q,a[8]=s*S+o*O+c*W+l*ee,a[12]=s*T+o*F+c*$+l*N,a[1]=u*w+d*I+h*D+p*ae,a[5]=u*P+d*C+h*B+p*q,a[9]=u*S+d*O+h*W+p*ee,a[13]=u*T+d*F+h*$+p*N,a[2]=_*w+x*I+g*D+m*ae,a[6]=_*P+x*C+g*B+m*q,a[10]=_*S+x*O+g*W+m*ee,a[14]=_*T+x*F+g*$+m*N,a[3]=M*w+E*I+b*D+R*ae,a[7]=M*P+E*C+b*B+R*q,a[11]=M*S+E*O+b*W+R*ee,a[15]=M*T+E*F+b*$+R*N,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],a=e[12],s=e[1],o=e[5],c=e[9],l=e[13],u=e[2],d=e[6],h=e[10],p=e[14],_=e[3],x=e[7],g=e[11],m=e[15],M=c*p-l*h,E=o*p-l*d,b=o*h-c*d,R=s*p-l*u,w=s*h-c*u,P=s*d-o*u;return t*(x*M-g*E+m*b)-i*(_*M-g*R+m*w)+r*(_*E-x*R+m*P)-a*(_*b-x*w+g*P)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],r=e[8],a=e[1],s=e[5],o=e[9],c=e[2],l=e[6],u=e[10];return t*(s*u-o*l)-i*(a*u-o*c)+r*(a*l-s*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],s=e[4],o=e[5],c=e[6],l=e[7],u=e[8],d=e[9],h=e[10],p=e[11],_=e[12],x=e[13],g=e[14],m=e[15],M=t*o-i*s,E=t*c-r*s,b=t*l-a*s,R=i*c-r*o,w=i*l-a*o,P=r*l-a*c,S=u*x-d*_,T=u*g-h*_,I=u*m-p*_,C=d*g-h*x,O=d*m-p*x,F=h*m-p*g,D=M*F-E*O+b*C+R*I-w*T+P*S;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const B=1/D;return e[0]=(o*F-c*O+l*C)*B,e[1]=(r*O-i*F-a*C)*B,e[2]=(x*P-g*w+m*R)*B,e[3]=(h*w-d*P-p*R)*B,e[4]=(c*I-s*F-l*T)*B,e[5]=(t*F-r*I+a*T)*B,e[6]=(g*b-_*P-m*E)*B,e[7]=(u*P-h*b+p*E)*B,e[8]=(s*O-o*I+l*S)*B,e[9]=(i*I-t*O-a*S)*B,e[10]=(_*w-x*b+m*M)*B,e[11]=(d*b-u*w-p*M)*B,e[12]=(o*T-s*C-c*S)*B,e[13]=(t*C-i*T+r*S)*B,e[14]=(x*E-_*R-g*M)*B,e[15]=(u*R-d*E+h*M)*B,this}scale(e){const t=this.elements,i=e.x,r=e.y,a=e.z;return t[0]*=i,t[4]*=r,t[8]*=a,t[1]*=i,t[5]*=r,t[9]*=a,t[2]*=i,t[6]*=r,t[10]*=a,t[3]*=i,t[7]*=r,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),a=1-i,s=e.x,o=e.y,c=e.z,l=a*s,u=a*o;return this.set(l*s+i,l*o-r*c,l*c+r*o,0,l*o+r*c,u*o+i,u*c-r*s,0,l*c-r*o,u*c+r*s,a*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,a,s){return this.set(1,i,a,0,e,1,s,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,a=t._x,s=t._y,o=t._z,c=t._w,l=a+a,u=s+s,d=o+o,h=a*l,p=a*u,_=a*d,x=s*u,g=s*d,m=o*d,M=c*l,E=c*u,b=c*d,R=i.x,w=i.y,P=i.z;return r[0]=(1-(x+m))*R,r[1]=(p+b)*R,r[2]=(_-E)*R,r[3]=0,r[4]=(p-b)*w,r[5]=(1-(h+m))*w,r[6]=(g+M)*w,r[7]=0,r[8]=(_+E)*P,r[9]=(g-M)*P,r[10]=(1-(h+x))*P,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const a=this.determinantAffine();if(a===0)return i.set(1,1,1),t.identity(),this;let s=Yi.set(r[0],r[1],r[2]).length();const o=Yi.set(r[4],r[5],r[6]).length(),c=Yi.set(r[8],r[9],r[10]).length();a<0&&(s=-s),bn.copy(this);const l=1/s,u=1/o,d=1/c;return bn.elements[0]*=l,bn.elements[1]*=l,bn.elements[2]*=l,bn.elements[4]*=u,bn.elements[5]*=u,bn.elements[6]*=u,bn.elements[8]*=d,bn.elements[9]*=d,bn.elements[10]*=d,t.setFromRotationMatrix(bn),i.x=s,i.y=o,i.z=c,this}makePerspective(e,t,i,r,a,s,o=On,c=!1){const l=this.elements,u=2*a/(t-e),d=2*a/(i-r),h=(t+e)/(t-e),p=(i+r)/(i-r);let _,x;if(c)_=a/(s-a),x=s*a/(s-a);else if(o===On)_=-(s+a)/(s-a),x=-2*s*a/(s-a);else if(o===za)_=-s/(s-a),x=-s*a/(s-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=d,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=_,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,a,s,o=On,c=!1){const l=this.elements,u=2/(t-e),d=2/(i-r),h=-(t+e)/(t-e),p=-(i+r)/(i-r);let _,x;if(c)_=1/(s-a),x=s/(s-a);else if(o===On)_=-2/(s-a),x=-(s+a)/(s-a);else if(o===za)_=-1/(s-a),x=-a/(s-a);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=d,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=_,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Yi=new X,bn=new Pt,lp=new X(0,0,0),cp=new X(1,1,1),di=new X,na=new X,ln=new X,Cl=new Pt,Ll=new vr;class ki{constructor(e=0,t=0,i=0,r=ki.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,a=r[0],s=r[4],o=r[8],c=r[1],l=r[5],u=r[9],d=r[2],h=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(tt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-s,a)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-tt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,a),this._z=0);break;case"ZXY":this._x=Math.asin(tt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-s,l)):(this._y=0,this._z=Math.atan2(c,a));break;case"ZYX":this._y=Math.asin(-tt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(c,a)):(this._x=0,this._z=Math.atan2(-s,l));break;case"YZX":this._z=Math.asin(tt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,a)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-tt(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-u,p),this._y=0);break;default:Ge("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Cl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Cl,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ll.setFromEuler(this),this.setFromQuaternion(Ll,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ki.DEFAULT_ORDER="XYZ";class iu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let up=0;const Pl=new X,Ki=new vr,Kn=new Pt,ia=new X,Ar=new X,hp=new X,dp=new vr,Dl=new X(1,0,0),Il=new X(0,1,0),Nl=new X(0,0,1),Ul={type:"added"},fp={type:"removed"},qi={type:"childadded",child:null},ps={type:"childremoved",child:null};class dn extends Gi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:up++}),this.uuid=Kr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=dn.DEFAULT_UP.clone();const e=new X,t=new ki,i=new vr,r=new X(1,1,1);function a(){i.setFromEuler(t,!1)}function s(){t.setFromQuaternion(i,void 0,!1)}t._onChange(a),i._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Pt},normalMatrix:{value:new He}}),this.matrix=new Pt,this.matrixWorld=new Pt,this.matrixAutoUpdate=dn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=dn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new iu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ki.setFromAxisAngle(e,t),this.quaternion.multiply(Ki),this}rotateOnWorldAxis(e,t){return Ki.setFromAxisAngle(e,t),this.quaternion.premultiply(Ki),this}rotateX(e){return this.rotateOnAxis(Dl,e)}rotateY(e){return this.rotateOnAxis(Il,e)}rotateZ(e){return this.rotateOnAxis(Nl,e)}translateOnAxis(e,t){return Pl.copy(e).applyQuaternion(this.quaternion),this.position.add(Pl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Dl,e)}translateY(e){return this.translateOnAxis(Il,e)}translateZ(e){return this.translateOnAxis(Nl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Kn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?ia.copy(e):ia.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Ar.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Kn.lookAt(Ar,ia,this.up):Kn.lookAt(ia,Ar,this.up),this.quaternion.setFromRotationMatrix(Kn),r&&(Kn.extractRotation(r.matrixWorld),Ki.setFromRotationMatrix(Kn),this.quaternion.premultiply(Ki.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(rt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ul),qi.child=e,this.dispatchEvent(qi),qi.child=null):rt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(fp),ps.child=e,this.dispatchEvent(ps),ps.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Kn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Kn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Kn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ul),qi.child=e,this.dispatchEvent(qi),qi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const s=this.children[i].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let a=0,s=r.length;a<s;a++)r[a].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ar,e,hp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ar,dp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,r=e.z,a=this.matrix.elements;a[12]+=t-a[0]*t-a[4]*i-a[8]*r,a[13]+=i-a[1]*t-a[5]*i-a[9]*r,a[14]+=r-a[2]*t-a[6]*i-a[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const a=this.children;for(let s=0,o=a.length;s<o;s++)a[s].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function a(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=a(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const d=c[l];a(e.shapes,d)}else a(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(a(e.materials,this.material[c]));r.material=o}else r.material=a(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(a(e.animations,c))}}if(t){const o=s(e.geometries),c=s(e.materials),l=s(e.textures),u=s(e.images),d=s(e.shapes),h=s(e.skeletons),p=s(e.animations),_=s(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),_.length>0&&(i.nodes=_)}return i.object=r,i;function s(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}dn.DEFAULT_UP=new X(0,1,0);dn.DEFAULT_MATRIX_AUTO_UPDATE=!0;dn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class ra extends dn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const pp={type:"move"};class ms{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ra,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ra,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new X,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new X),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ra,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new X,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new X,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,a=null,s=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){s=!0;for(const x of e.hand.values()){const g=t.getJointPose(x,i),m=this._getHandJoint(l,x);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],h=u.position.distanceTo(d.position),p=.02,_=.005;l.inputState.pinching&&h>p+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=p-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,i),a!==null&&(c.matrix.fromArray(a.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,a.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(a.linearVelocity)):c.hasLinearVelocity=!1,a.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(a.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&a!==null&&(r=a),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(pp)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=a!==null),l!==null&&(l.visible=s!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new ra;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const ru={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},fi={h:0,s:0,l:0},aa={h:0,s:0,l:0};function gs(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class ot{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=mn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,et.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=et.workingColorSpace){return this.r=e,this.g=t,this.b=i,et.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=et.workingColorSpace){if(e=tp(e,1),t=tt(t,0,1),i=tt(i,0,1),t===0)this.r=this.g=this.b=i;else{const a=i<=.5?i*(1+t):i+t-i*t,s=2*i-a;this.r=gs(s,a,e+1/3),this.g=gs(s,a,e),this.b=gs(s,a,e-1/3)}return et.colorSpaceToWorking(this,r),this}setStyle(e,t=mn){function i(a){a!==void 0&&parseFloat(a)<1&&Ge("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const s=r[1],o=r[2];switch(s){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:Ge("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=r[1],s=a.length;if(s===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(s===6)return this.setHex(parseInt(a,16),t);Ge("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=mn){const i=ru[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ge("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ri(e.r),this.g=ri(e.g),this.b=ri(e.b),this}copyLinearToSRGB(e){return this.r=dr(e.r),this.g=dr(e.g),this.b=dr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=mn){return et.workingToColorSpace(Kt.copy(this),e),Math.round(tt(Kt.r*255,0,255))*65536+Math.round(tt(Kt.g*255,0,255))*256+Math.round(tt(Kt.b*255,0,255))}getHexString(e=mn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=et.workingColorSpace){et.workingToColorSpace(Kt.copy(this),t);const i=Kt.r,r=Kt.g,a=Kt.b,s=Math.max(i,r,a),o=Math.min(i,r,a);let c,l;const u=(o+s)/2;if(o===s)c=0,l=0;else{const d=s-o;switch(l=u<=.5?d/(s+o):d/(2-s-o),s){case i:c=(r-a)/d+(r<a?6:0);break;case r:c=(a-i)/d+2;break;case a:c=(i-r)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=et.workingColorSpace){return et.workingToColorSpace(Kt.copy(this),t),e.r=Kt.r,e.g=Kt.g,e.b=Kt.b,e}getStyle(e=mn){et.workingToColorSpace(Kt.copy(this),e);const t=Kt.r,i=Kt.g,r=Kt.b;return e!==mn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(fi),this.setHSL(fi.h+e,fi.s+t,fi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(fi),e.getHSL(aa);const i=cs(fi.h,aa.h,t),r=cs(fi.s,aa.s,t),a=cs(fi.l,aa.l,t);return this.setHSL(i,r,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,a=e.elements;return this.r=a[0]*t+a[3]*i+a[6]*r,this.g=a[1]*t+a[4]*i+a[7]*r,this.b=a[2]*t+a[5]*i+a[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Kt=new ot;ot.NAMES=ru;class mp extends dn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ki,this.environmentIntensity=1,this.environmentRotation=new ki,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const En=new X,qn=new X,_s=new X,Zn=new X,Zi=new X,$i=new X,Fl=new X,xs=new X,vs=new X,Ms=new X,Ss=new Tt,bs=new Tt,Es=new Tt;class An{constructor(e=new X,t=new X,i=new X){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),En.subVectors(e,t),r.cross(En);const a=r.lengthSq();return a>0?r.multiplyScalar(1/Math.sqrt(a)):r.set(0,0,0)}static getBarycoord(e,t,i,r,a){En.subVectors(r,t),qn.subVectors(i,t),_s.subVectors(e,t);const s=En.dot(En),o=En.dot(qn),c=En.dot(_s),l=qn.dot(qn),u=qn.dot(_s),d=s*l-o*o;if(d===0)return a.set(0,0,0),null;const h=1/d,p=(l*c-o*u)*h,_=(s*u-o*c)*h;return a.set(1-p-_,_,p)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Zn)===null?!1:Zn.x>=0&&Zn.y>=0&&Zn.x+Zn.y<=1}static getInterpolation(e,t,i,r,a,s,o,c){return this.getBarycoord(e,t,i,r,Zn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(a,Zn.x),c.addScaledVector(s,Zn.y),c.addScaledVector(o,Zn.z),c)}static getInterpolatedAttribute(e,t,i,r,a,s){return Ss.setScalar(0),bs.setScalar(0),Es.setScalar(0),Ss.fromBufferAttribute(e,t),bs.fromBufferAttribute(e,i),Es.fromBufferAttribute(e,r),s.setScalar(0),s.addScaledVector(Ss,a.x),s.addScaledVector(bs,a.y),s.addScaledVector(Es,a.z),s}static isFrontFacing(e,t,i,r){return En.subVectors(i,t),qn.subVectors(e,t),En.cross(qn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return En.subVectors(this.c,this.b),qn.subVectors(this.a,this.b),En.cross(qn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return An.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return An.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,a){return An.getInterpolation(e,this.a,this.b,this.c,t,i,r,a)}containsPoint(e){return An.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return An.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,a=this.c;let s,o;Zi.subVectors(r,i),$i.subVectors(a,i),xs.subVectors(e,i);const c=Zi.dot(xs),l=$i.dot(xs);if(c<=0&&l<=0)return t.copy(i);vs.subVectors(e,r);const u=Zi.dot(vs),d=$i.dot(vs);if(u>=0&&d<=u)return t.copy(r);const h=c*d-u*l;if(h<=0&&c>=0&&u<=0)return s=c/(c-u),t.copy(i).addScaledVector(Zi,s);Ms.subVectors(e,a);const p=Zi.dot(Ms),_=$i.dot(Ms);if(_>=0&&p<=_)return t.copy(a);const x=p*l-c*_;if(x<=0&&l>=0&&_<=0)return o=l/(l-_),t.copy(i).addScaledVector($i,o);const g=u*_-p*d;if(g<=0&&d-u>=0&&p-_>=0)return Fl.subVectors(a,r),o=(d-u)/(d-u+(p-_)),t.copy(r).addScaledVector(Fl,o);const m=1/(g+x+h);return s=x*m,o=h*m,t.copy(i).addScaledVector(Zi,s).addScaledVector($i,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Mr{constructor(e=new X(1/0,1/0,1/0),t=new X(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(yn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(yn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=yn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const a=i.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let s=0,o=a.count;s<o;s++)e.isMesh===!0?e.getVertexPosition(s,yn):yn.fromBufferAttribute(a,s),yn.applyMatrix4(e.matrixWorld),this.expandByPoint(yn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),sa.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),sa.copy(i.boundingBox)),sa.applyMatrix4(e.matrixWorld),this.union(sa)}const r=e.children;for(let a=0,s=r.length;a<s;a++)this.expandByObject(r[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,yn),yn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Tr),oa.subVectors(this.max,Tr),Ji.subVectors(e.a,Tr),Qi.subVectors(e.b,Tr),ji.subVectors(e.c,Tr),pi.subVectors(Qi,Ji),mi.subVectors(ji,Qi),Ei.subVectors(Ji,ji);let t=[0,-pi.z,pi.y,0,-mi.z,mi.y,0,-Ei.z,Ei.y,pi.z,0,-pi.x,mi.z,0,-mi.x,Ei.z,0,-Ei.x,-pi.y,pi.x,0,-mi.y,mi.x,0,-Ei.y,Ei.x,0];return!ys(t,Ji,Qi,ji,oa)||(t=[1,0,0,0,1,0,0,0,1],!ys(t,Ji,Qi,ji,oa))?!1:(la.crossVectors(pi,mi),t=[la.x,la.y,la.z],ys(t,Ji,Qi,ji,oa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,yn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(yn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:($n[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),$n[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),$n[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),$n[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),$n[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),$n[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),$n[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),$n[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints($n),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const $n=[new X,new X,new X,new X,new X,new X,new X,new X],yn=new X,sa=new Mr,Ji=new X,Qi=new X,ji=new X,pi=new X,mi=new X,Ei=new X,Tr=new X,oa=new X,la=new X,yi=new X;function ys(n,e,t,i,r){for(let a=0,s=n.length-3;a<=s;a+=3){yi.fromArray(n,a);const o=r.x*Math.abs(yi.x)+r.y*Math.abs(yi.y)+r.z*Math.abs(yi.z),c=e.dot(yi),l=t.dot(yi),u=i.dot(yi);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const Ut=new X,ca=new Ve;let gp=0;class zn extends Gi{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:gp++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=$f,this.updateRanges=[],this.gpuType=Fn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,a=this.itemSize;r<a;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ca.fromBufferAttribute(this,t),ca.applyMatrix3(e),this.setXY(t,ca.x,ca.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Ut.fromBufferAttribute(this,t),Ut.applyMatrix3(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Ut.fromBufferAttribute(this,t),Ut.applyMatrix4(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Ut.fromBufferAttribute(this,t),Ut.applyNormalMatrix(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Ut.fromBufferAttribute(this,t),Ut.transformDirection(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=wr(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=tn(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=wr(t,this.array)),t}setX(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=wr(t,this.array)),t}setY(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=wr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=wr(t,this.array)),t}setW(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=tn(t,this.array),i=tn(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=tn(t,this.array),i=tn(i,this.array),r=tn(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,a){return e*=this.itemSize,this.normalized&&(t=tn(t,this.array),i=tn(i,this.array),r=tn(r,this.array),a=tn(a,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class au extends zn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class su extends zn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class ai extends zn{constructor(e,t,i){super(new Float32Array(e),t,i)}}const _p=new Mr,Rr=new X,ws=new X;class Zo{constructor(e=new X,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):_p.setFromPoints(e).getCenter(i);let r=0;for(let a=0,s=e.length;a<s;a++)r=Math.max(r,i.distanceToSquared(e[a]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Rr.subVectors(e,this.center);const t=Rr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Rr,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ws.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Rr.copy(e.center).add(ws)),this.expandByPoint(Rr.copy(e.center).sub(ws))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let xp=0;const pn=new Pt,As=new dn,er=new X,cn=new Mr,Cr=new Mr,Gt=new X;class Vn extends Gi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:xp++}),this.uuid=Kr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Jf(e)?su:au)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const a=new He().getNormalMatrix(e);i.applyNormalMatrix(a),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return pn.makeRotationFromQuaternion(e),this.applyMatrix4(pn),this}rotateX(e){return pn.makeRotationX(e),this.applyMatrix4(pn),this}rotateY(e){return pn.makeRotationY(e),this.applyMatrix4(pn),this}rotateZ(e){return pn.makeRotationZ(e),this.applyMatrix4(pn),this}translate(e,t,i){return pn.makeTranslation(e,t,i),this.applyMatrix4(pn),this}scale(e,t,i){return pn.makeScale(e,t,i),this.applyMatrix4(pn),this}lookAt(e){return As.lookAt(e),As.updateMatrix(),this.applyMatrix4(As.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(er).negate(),this.translate(er.x,er.y,er.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,a=e.length;r<a;r++){const s=e[r];i.push(s.x,s.y,s.z||0)}this.setAttribute("position",new ai(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const a=e[r];t.setXYZ(r,a.x,a.y,a.z||0)}e.length>t.count&&Ge("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Mr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){rt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new X(-1/0,-1/0,-1/0),new X(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const a=t[i];cn.setFromBufferAttribute(a),this.morphTargetsRelative?(Gt.addVectors(this.boundingBox.min,cn.min),this.boundingBox.expandByPoint(Gt),Gt.addVectors(this.boundingBox.max,cn.max),this.boundingBox.expandByPoint(Gt)):(this.boundingBox.expandByPoint(cn.min),this.boundingBox.expandByPoint(cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&rt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Zo);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){rt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new X,1/0);return}if(e){const i=this.boundingSphere.center;if(cn.setFromBufferAttribute(e),t)for(let a=0,s=t.length;a<s;a++){const o=t[a];Cr.setFromBufferAttribute(o),this.morphTargetsRelative?(Gt.addVectors(cn.min,Cr.min),cn.expandByPoint(Gt),Gt.addVectors(cn.max,Cr.max),cn.expandByPoint(Gt)):(cn.expandByPoint(Cr.min),cn.expandByPoint(Cr.max))}cn.getCenter(i);let r=0;for(let a=0,s=e.count;a<s;a++)Gt.fromBufferAttribute(e,a),r=Math.max(r,i.distanceToSquared(Gt));if(t)for(let a=0,s=t.length;a<s;a++){const o=t[a],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)Gt.fromBufferAttribute(o,l),c&&(er.fromBufferAttribute(e,l),Gt.add(er)),r=Math.max(r,i.distanceToSquared(Gt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&rt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){rt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,a=t.uv;let s=this.getAttribute("tangent");(s===void 0||s.count!==i.count)&&(s=new zn(new Float32Array(4*i.count),4),this.setAttribute("tangent",s));const o=[],c=[];for(let S=0;S<i.count;S++)o[S]=new X,c[S]=new X;const l=new X,u=new X,d=new X,h=new Ve,p=new Ve,_=new Ve,x=new X,g=new X;function m(S,T,I){l.fromBufferAttribute(i,S),u.fromBufferAttribute(i,T),d.fromBufferAttribute(i,I),h.fromBufferAttribute(a,S),p.fromBufferAttribute(a,T),_.fromBufferAttribute(a,I),u.sub(l),d.sub(l),p.sub(h),_.sub(h);const C=1/(p.x*_.y-_.x*p.y);isFinite(C)&&(x.copy(u).multiplyScalar(_.y).addScaledVector(d,-p.y).multiplyScalar(C),g.copy(d).multiplyScalar(p.x).addScaledVector(u,-_.x).multiplyScalar(C),o[S].add(x),o[T].add(x),o[I].add(x),c[S].add(g),c[T].add(g),c[I].add(g))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let S=0,T=M.length;S<T;++S){const I=M[S],C=I.start,O=I.count;for(let F=C,D=C+O;F<D;F+=3)m(e.getX(F+0),e.getX(F+1),e.getX(F+2))}const E=new X,b=new X,R=new X,w=new X;function P(S){R.fromBufferAttribute(r,S),w.copy(R);const T=o[S];E.copy(T),E.sub(R.multiplyScalar(R.dot(T))).normalize(),b.crossVectors(w,T);const C=b.dot(c[S])<0?-1:1;s.setXYZW(S,E.x,E.y,E.z,C)}for(let S=0,T=M.length;S<T;++S){const I=M[S],C=I.start,O=I.count;for(let F=C,D=C+O;F<D;F+=3)P(e.getX(F+0)),P(e.getX(F+1)),P(e.getX(F+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new zn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);const r=new X,a=new X,s=new X,o=new X,c=new X,l=new X,u=new X,d=new X;if(e)for(let h=0,p=e.count;h<p;h+=3){const _=e.getX(h+0),x=e.getX(h+1),g=e.getX(h+2);r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,x),s.fromBufferAttribute(t,g),u.subVectors(s,a),d.subVectors(r,a),u.cross(d),o.fromBufferAttribute(i,_),c.fromBufferAttribute(i,x),l.fromBufferAttribute(i,g),o.add(u),c.add(u),l.add(u),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(x,c.x,c.y,c.z),i.setXYZ(g,l.x,l.y,l.z)}else for(let h=0,p=t.count;h<p;h+=3)r.fromBufferAttribute(t,h+0),a.fromBufferAttribute(t,h+1),s.fromBufferAttribute(t,h+2),u.subVectors(s,a),d.subVectors(r,a),u.cross(d),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Gt.fromBufferAttribute(e,t),Gt.normalize(),e.setXYZ(t,Gt.x,Gt.y,Gt.z)}toNonIndexed(){function e(o,c){const l=o.array,u=o.itemSize,d=o.normalized,h=new l.constructor(c.length*u);let p=0,_=0;for(let x=0,g=c.length;x<g;x++){o.isInterleavedBufferAttribute?p=c[x]*o.data.stride+o.offset:p=c[x]*u;for(let m=0;m<u;m++)h[_++]=l[p++]}return new zn(h,u,d)}if(this.index===null)return Ge("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Vn,i=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=e(c,i);t.setAttribute(o,l)}const a=this.morphAttributes;for(const o in a){const c=[],l=a[o];for(let u=0,d=l.length;u<d;u++){const h=l[u],p=e(h,i);c.push(p)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const s=this.groups;for(let o=0,c=s.length;o<c;o++){const l=s[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let a=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let d=0,h=l.length;d<h;d++){const p=l[d];u.push(p.toJSON(e.data))}u.length>0&&(r[c]=u,a=!0)}a&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const l in r){const u=r[l];this.setAttribute(l,u.clone(t))}const a=e.morphAttributes;for(const l in a){const u=[],d=a[l];for(let h=0,p=d.length;h<p;h++)u.push(d[h].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const s=e.groups;for(let l=0,u=s.length;l<u;l++){const d=s[l];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ts=new X,vp=new X,Mp=new He;class _i{constructor(e=new X(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=Ts.subVectors(i,t).cross(vp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const r=e.delta(Ts),a=this.normal.dot(r);if(a===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/a;return i===!0&&(s<0||s>1)?null:t.copy(e.start).addScaledVector(r,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Mp.getNormalMatrix(e),r=this.coplanarPoint(Ts).applyMatrix4(e),a=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let Sp=0;class Ka extends Gi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Sp++}),this.uuid=Kr(),this.name="",this.type="Material",this.blending=Or,this.side=Oi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Fc,this.blendDst=Oc,this.blendEquation=ar,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ot(0,0,0),this.blendAlpha=0,this.depthFunc=zr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Vf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=os,this.stencilZFail=os,this.stencilZPass=os,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Ge(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ge(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(a=>a.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(a){const s=[];for(const o in a){const c=a[o];delete c.metadata,s.push(c)}return s}if(t){const a=r(e.textures),s=r(e.images);a.length>0&&(i.textures=a),s.length>0&&(i.images=s)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new ot().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new _i().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Ve().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ve().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let a=0;a!==r;++a)i[a]=t[a].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Jn=new X,Rs=new X,ua=new X,ha=new X;class bp{constructor(e=new X,t=new X(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Jn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Jn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Jn.copy(this.origin).addScaledVector(this.direction,t),Jn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Rs.copy(e).add(t).multiplyScalar(.5),ua.copy(t).sub(e).normalize(),ha.copy(this.origin).sub(Rs);const a=e.distanceTo(t)*.5,s=-this.direction.dot(ua),o=ha.dot(this.direction),c=-ha.dot(ua),l=ha.lengthSq(),u=Math.abs(1-s*s);let d,h,p,_;if(u>0)if(d=s*c-o,h=s*o-c,_=a*u,d>=0)if(h>=-_)if(h<=_){const x=1/u;d*=x,h*=x,p=d*(d+s*h+2*o)+h*(s*d+h+2*c)+l}else h=a,d=Math.max(0,-(s*h+o)),p=-d*d+h*(h+2*c)+l;else h=-a,d=Math.max(0,-(s*h+o)),p=-d*d+h*(h+2*c)+l;else h<=-_?(d=Math.max(0,-(-s*a+o)),h=d>0?-a:Math.min(Math.max(-a,-c),a),p=-d*d+h*(h+2*c)+l):h<=_?(d=0,h=Math.min(Math.max(-a,-c),a),p=h*(h+2*c)+l):(d=Math.max(0,-(s*a+o)),h=d>0?a:Math.min(Math.max(-a,-c),a),p=-d*d+h*(h+2*c)+l);else h=s>0?-a:a,d=Math.max(0,-(s*h+o)),p=-d*d+h*(h+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Rs).addScaledVector(ua,h),p}intersectSphere(e,t){if(e.radius<0)return null;Jn.subVectors(e.center,this.origin);const i=Jn.dot(this.direction),r=Jn.dot(Jn)-i*i,a=e.radius*e.radius;if(r>a)return null;const s=Math.sqrt(a-r),o=i-s,c=i+s;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,a,s,o,c;const l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return l>=0?(i=(e.min.x-h.x)*l,r=(e.max.x-h.x)*l):(i=(e.max.x-h.x)*l,r=(e.min.x-h.x)*l),u>=0?(a=(e.min.y-h.y)*u,s=(e.max.y-h.y)*u):(a=(e.max.y-h.y)*u,s=(e.min.y-h.y)*u),i>s||a>r||((a>i||isNaN(i))&&(i=a),(s<r||isNaN(r))&&(r=s),d>=0?(o=(e.min.z-h.z)*d,c=(e.max.z-h.z)*d):(o=(e.max.z-h.z)*d,c=(e.min.z-h.z)*d),i>c||o>r)||((o>i||i!==i)&&(i=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Jn)!==null}intersectTriangle(e,t,i,r,a){const s=this.origin,o=this.direction,c=o.x,l=o.y,u=o.z,d=e.x-s.x,h=e.y-s.y,p=e.z-s.z,_=t.x-s.x,x=t.y-s.y,g=t.z-s.z,m=i.x-s.x,M=i.y-s.y,E=i.z-s.z,b=Math.abs(c),R=Math.abs(l),w=Math.abs(u);let P,S,T,I,C,O,F,D,B,W,$,ae;if(b>=R&&b>=w?(T=c,O=d,B=_,ae=m,c>=0?(P=l,S=u,I=h,C=p,F=x,D=g,W=M,$=E):(P=u,S=l,I=p,C=h,F=g,D=x,W=E,$=M)):R>=w?(T=l,O=h,B=x,ae=M,l>=0?(P=u,S=c,I=p,C=d,F=g,D=_,W=E,$=m):(P=c,S=u,I=d,C=p,F=_,D=g,W=m,$=E)):(T=u,O=p,B=g,ae=E,u>=0?(P=c,S=l,I=d,C=h,F=_,D=x,W=m,$=M):(P=l,S=c,I=h,C=d,F=x,D=_,W=M,$=m)),T===0)return null;const q=P/T,ee=S/T,N=1/T,re=I-q*O,ce=C-ee*O,Re=F-q*B,Oe=D-ee*B,ke=W-q*ae,j=$-ee*ae,ie=ke*Oe-j*Re,H=re*j-ce*ke,ue=Re*ce-Oe*re;if(r){if(ie<0||H<0||ue<0)return null}else if((ie<0||H<0||ue<0)&&(ie>0||H>0||ue>0))return null;const se=ie+H+ue;if(se===0)return null;const ye=N*(ie*O+H*B+ue*ae);return(se>0?ye<0:ye>0)?null:this.at(ye/se,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ou extends Ka{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ki,this.combine=Bc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Ol=new Pt,wi=new bp,da=new Zo,Bl=new X,fa=new X,pa=new X,ma=new X,Cs=new X,ga=new X,zl=new X,_a=new X;class en extends dn{constructor(e=new Vn,t=new ou){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,s=r.length;a<s;a++){const o=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,a=i.morphAttributes.position,s=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(a&&o){ga.set(0,0,0);for(let c=0,l=a.length;c<l;c++){const u=o[c],d=a[c];u!==0&&(Cs.fromBufferAttribute(d,e),s?ga.addScaledVector(Cs,u):ga.addScaledVector(Cs.sub(t),u))}t.add(ga)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,r=this.material,a=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),da.copy(i.boundingSphere),da.applyMatrix4(a),wi.copy(e.ray).recast(e.near),!(da.containsPoint(wi.origin)===!1&&(wi.intersectSphere(da,Bl)===null||wi.origin.distanceToSquared(Bl)>(e.far-e.near)**2))&&(Ol.copy(a).invert(),wi.copy(e.ray).applyMatrix4(Ol),!(i.boundingBox!==null&&wi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,wi)))}_computeIntersections(e,t,i){let r;const a=this.geometry,s=this.material,o=a.index,c=a.attributes.position,l=a.attributes.uv,u=a.attributes.uv1,d=a.attributes.normal,h=a.groups,p=a.drawRange;if(o!==null)if(Array.isArray(s))for(let _=0,x=h.length;_<x;_++){const g=h[_],m=s[g.materialIndex],M=Math.max(g.start,p.start),E=Math.min(o.count,Math.min(g.start+g.count,p.start+p.count));for(let b=M,R=E;b<R;b+=3){const w=o.getX(b),P=o.getX(b+1),S=o.getX(b+2);r=xa(this,m,e,i,l,u,d,w,P,S),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{const _=Math.max(0,p.start),x=Math.min(o.count,p.start+p.count);for(let g=_,m=x;g<m;g+=3){const M=o.getX(g),E=o.getX(g+1),b=o.getX(g+2);r=xa(this,s,e,i,l,u,d,M,E,b),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(s))for(let _=0,x=h.length;_<x;_++){const g=h[_],m=s[g.materialIndex],M=Math.max(g.start,p.start),E=Math.min(c.count,Math.min(g.start+g.count,p.start+p.count));for(let b=M,R=E;b<R;b+=3){const w=b,P=b+1,S=b+2;r=xa(this,m,e,i,l,u,d,w,P,S),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{const _=Math.max(0,p.start),x=Math.min(c.count,p.start+p.count);for(let g=_,m=x;g<m;g+=3){const M=g,E=g+1,b=g+2;r=xa(this,s,e,i,l,u,d,M,E,b),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}}}function Ep(n,e,t,i,r,a,s,o){let c;if(e.side===sn?c=i.intersectTriangle(s,a,r,!0,o):c=i.intersectTriangle(r,a,s,e.side===Oi,o),c===null)return null;_a.copy(o),_a.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(_a);return l<t.near||l>t.far?null:{distance:l,point:_a.clone(),object:n}}function xa(n,e,t,i,r,a,s,o,c,l){n.getVertexPosition(o,fa),n.getVertexPosition(c,pa),n.getVertexPosition(l,ma);const u=Ep(n,e,t,i,fa,pa,ma,zl);if(u){const d=new X;An.getBarycoord(zl,fa,pa,ma,d),r&&(u.uv=An.getInterpolatedAttribute(r,o,c,l,d,new Ve)),a&&(u.uv1=An.getInterpolatedAttribute(a,o,c,l,d,new Ve)),s&&(u.normal=An.getInterpolatedAttribute(s,o,c,l,d,new X),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:c,c:l,normal:new X,materialIndex:0};An.getNormal(fa,pa,ma,h.normal),u.face=h,u.barycoord=d}return u}class lr extends jt{constructor(e=null,t=1,i=1,r,a,s,o,c,l=Ot,u=Ot,d,h){super(null,s,o,c,l,u,r,a,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class lu extends zn{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ai=new Zo,yp=new Ve(.5,.5),va=new X;class $o{constructor(e=new _i,t=new _i,i=new _i,r=new _i,a=new _i,s=new _i){this.planes=[e,t,i,r,a,s]}set(e,t,i,r,a,s){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(a),o[5].copy(s),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=On,i=!1){const r=this.planes,a=e.elements,s=a[0],o=a[1],c=a[2],l=a[3],u=a[4],d=a[5],h=a[6],p=a[7],_=a[8],x=a[9],g=a[10],m=a[11],M=a[12],E=a[13],b=a[14],R=a[15];if(r[0].setComponents(l-s,p-u,m-_,R-M).normalize(),r[1].setComponents(l+s,p+u,m+_,R+M).normalize(),r[2].setComponents(l+o,p+d,m+x,R+E).normalize(),r[3].setComponents(l-o,p-d,m-x,R-E).normalize(),i)r[4].setComponents(c,h,g,b).normalize(),r[5].setComponents(l-c,p-h,m-g,R-b).normalize();else if(r[4].setComponents(l-c,p-h,m-g,R-b).normalize(),t===On)r[5].setComponents(l+c,p+h,m+g,R+b).normalize();else if(t===za)r[5].setComponents(c,h,g,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ai.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ai.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ai)}intersectsSprite(e){Ai.center.set(0,0,0);const t=yp.distanceTo(e.center);return Ai.radius=.7071067811865476+t,Ai.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ai)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(va.x=r.normal.x>0?e.max.x:e.min.x,va.y=r.normal.y>0?e.max.y:e.min.y,va.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(va)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class cu extends jt{constructor(e=[],t=Bi,i,r,a,s,o,c,l,u){super(e,t,i,r,a,s,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Vr extends jt{constructor(e,t,i=Gn,r,a,s,o=Ot,c=Ot,l,u=oi,d=1){if(u!==oi&&u!==Di)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:d};super(h,r,a,s,o,c,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new qo(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class wp extends Vr{constructor(e,t=Gn,i=Bi,r,a,s=Ot,o=Ot,c,l=oi){const u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,i,r,a,s,o,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class uu extends jt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class qr extends Vn{constructor(e=1,t=1,i=1,r=1,a=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:a,depthSegments:s};const o=this;r=Math.floor(r),a=Math.floor(a),s=Math.floor(s);const c=[],l=[],u=[],d=[];let h=0,p=0;_("z","y","x",-1,-1,i,t,e,s,a,0),_("z","y","x",1,-1,i,t,-e,s,a,1),_("x","z","y",1,1,e,i,t,r,s,2),_("x","z","y",1,-1,e,i,-t,r,s,3),_("x","y","z",1,-1,e,t,i,r,a,4),_("x","y","z",-1,-1,e,t,-i,r,a,5),this.setIndex(c),this.setAttribute("position",new ai(l,3)),this.setAttribute("normal",new ai(u,3)),this.setAttribute("uv",new ai(d,2));function _(x,g,m,M,E,b,R,w,P,S,T){const I=b/P,C=R/S,O=b/2,F=R/2,D=w/2,B=P+1,W=S+1;let $=0,ae=0;const q=new X;for(let ee=0;ee<W;ee++){const N=ee*C-F;for(let re=0;re<B;re++){const ce=re*I-O;q[x]=ce*M,q[g]=N*E,q[m]=D,l.push(q.x,q.y,q.z),q[x]=0,q[g]=0,q[m]=w>0?1:-1,u.push(q.x,q.y,q.z),d.push(re/P),d.push(1-ee/S),$+=1}}for(let ee=0;ee<S;ee++)for(let N=0;N<P;N++){const re=h+N+B*ee,ce=h+N+B*(ee+1),Re=h+(N+1)+B*(ee+1),Oe=h+(N+1)+B*ee;c.push(re,ce,Oe),c.push(ce,Re,Oe),ae+=6}o.addGroup(p,ae,T),p+=ae,h+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Wn extends Vn{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const a=e/2,s=t/2,o=Math.floor(i),c=Math.floor(r),l=o+1,u=c+1,d=e/o,h=t/c,p=[],_=[],x=[],g=[];for(let m=0;m<u;m++){const M=m*h-s;for(let E=0;E<l;E++){const b=E*d-a;_.push(b,-M,0),x.push(0,0,1),g.push(E/o),g.push(1-m/c)}}for(let m=0;m<c;m++)for(let M=0;M<o;M++){const E=M+l*m,b=M+l*(m+1),R=M+1+l*(m+1),w=M+1+l*m;p.push(E,b,w),p.push(b,R,w)}this.setIndex(p),this.setAttribute("position",new ai(_,3)),this.setAttribute("normal",new ai(x,3)),this.setAttribute("uv",new ai(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wn(e.width,e.height,e.widthSegments,e.heightSegments)}}function _r(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];if(kl(r))r.isRenderTargetTexture?(Ge("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(kl(r[0])){const a=[];for(let s=0,o=r.length;s<o;s++)a[s]=r[s].clone();e[t][i]=a}else e[t][i]=r.slice();else e[t][i]=r}}return e}function Qt(n){const e={};for(let t=0;t<n.length;t++){const i=_r(n[t]);for(const r in i)e[r]=i[r]}return e}function kl(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Ap(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function hu(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:et.workingColorSpace}const Tp={clone:_r,merge:Qt};var Rp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Cp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class $t extends Ka{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Rp,this.fragmentShader=Cp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=_r(e.uniforms),this.uniformsGroups=Ap(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const s=this.uniforms[r].value;s&&s.isTexture?t.uniforms[r]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[r]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[r]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[r]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[r]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[r]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[r]={type:"m4",value:s.toArray()}:t.uniforms[r]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new ot().setHex(r.value);break;case"v2":this.uniforms[i].value=new Ve().fromArray(r.value);break;case"v3":this.uniforms[i].value=new X().fromArray(r.value);break;case"v4":this.uniforms[i].value=new Tt().fromArray(r.value);break;case"m3":this.uniforms[i].value=new He().fromArray(r.value);break;case"m4":this.uniforms[i].value=new Pt().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Lp extends $t{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Pp extends Ka{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Gf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Dp extends Ka{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Ma=new X,Sa=new vr,Pn=new X;class du extends dn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Pt,this.projectionMatrix=new Pt,this.projectionMatrixInverse=new Pt,this.coordinateSystem=On,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ma,Sa,Pn),Pn.x===1&&Pn.y===1&&Pn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ma,Sa,Pn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Ma,Sa,Pn),Pn.x===1&&Pn.y===1&&Pn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ma,Sa,Pn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const gi=new X,Gl=new Ve,Hl=new Ve;class gn extends du{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=yo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ls*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return yo*2*Math.atan(Math.tan(ls*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){gi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(gi.x,gi.y).multiplyScalar(-e/gi.z),gi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(gi.x,gi.y).multiplyScalar(-e/gi.z)}getViewSize(e,t){return this.getViewBounds(e,Gl,Hl),t.subVectors(Hl,Gl)}setViewOffset(e,t,i,r,a,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ls*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,a=-.5*r;const s=this.view;if(this.view!==null&&this.view.enabled){const c=s.fullWidth,l=s.fullHeight;a+=s.offsetX*r/c,t-=s.offsetY*i/l,r*=s.width/c,i*=s.height/l}const o=this.filmOffset;o!==0&&(a+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Jo extends du{constructor(e=-1,t=1,i=1,r=-1,a=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=a,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,a,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let a=i-e,s=i+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=l*this.view.offsetX,s=a+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(a,s,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class fu extends Vn{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}const tr=-90,nr=1;class Ip extends dn{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new gn(tr,nr,e,t);r.layers=this.layers,this.add(r);const a=new gn(tr,nr,e,t);a.layers=this.layers,this.add(a);const s=new gn(tr,nr,e,t);s.layers=this.layers,this.add(s);const o=new gn(tr,nr,e,t);o.layers=this.layers,this.add(o);const c=new gn(tr,nr,e,t);c.layers=this.layers,this.add(c);const l=new gn(tr,nr,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,a,s,o,c]=t;for(const l of t)this.remove(l);if(e===On)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===za)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,s,o,c,l,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,1,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,2,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,4,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,h,p),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class Np extends gn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class pu{static{pu.prototype.isMatrix2=!0}constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){const a=this.elements;return a[0]=e,a[2]=t,a[1]=i,a[3]=r,this}}function Vl(n,e,t,i){const r=Up(i);switch(t){case Jc:return n*e;case jc:return n*e/r.components*r.byteLength;case Vo:return n*e/r.components*r.byteLength;case zi:return n*e*2/r.components*r.byteLength;case Wo:return n*e*2/r.components*r.byteLength;case Qc:return n*e*3/r.components*r.byteLength;case xn:return n*e*4/r.components*r.byteLength;case Xo:return n*e*4/r.components*r.byteLength;case La:case Pa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Da:case Ia:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case qs:case $s:return Math.max(n,16)*Math.max(e,8)/4;case Ks:case Zs:return Math.max(n,8)*Math.max(e,8)/2;case Js:case Qs:case eo:case to:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case js:case Fa:case no:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case io:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ro:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case ao:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case so:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case oo:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case lo:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case co:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case uo:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case ho:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case fo:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case po:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case mo:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case go:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case _o:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case xo:case vo:case Mo:return Math.ceil(n/4)*Math.ceil(e/4)*16;case So:case bo:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Oa:case Eo:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Up(n){switch(n){case hn:case Kc:return{byteLength:1,components:1};case kr:case qc:case Hn:return{byteLength:2,components:1};case Go:case Ho:return{byteLength:2,components:4};case Gn:case ko:case Fn:return{byteLength:4,components:1};case Zc:case $c:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:zo}}));typeof window<"u"&&(window.__THREE__?Ge("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=zo);function mu(){let n=null,e=!1,t=null,i=null;function r(a,s){i=n.requestAnimationFrame(r),t(a,s)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){n=a}}}function Fp(n){const e=new WeakMap;function t(o,c){const l=o.array,u=o.usage,d=l.byteLength,h=n.createBuffer();n.bindBuffer(c,h),n.bufferData(c,l,u),o.onUploadCallback();let p;if(l instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=n.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=n.SHORT;else if(l instanceof Uint32Array)p=n.UNSIGNED_INT;else if(l instanceof Int32Array)p=n.INT;else if(l instanceof Int8Array)p=n.BYTE;else if(l instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,c,l){const u=c.array,d=c.updateRanges;if(n.bindBuffer(l,o),d.length===0)n.bufferSubData(l,0,u);else{d.sort((p,_)=>p.start-_.start);let h=0;for(let p=1;p<d.length;p++){const _=d[h],x=d[p];x.start<=_.start+_.count+1?_.count=Math.max(_.count,x.start+x.count-_.start):(++h,d[h]=x)}d.length=h+1;for(let p=0,_=d.length;p<_;p++){const x=d[p];n.bufferSubData(l,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(n.deleteBuffer(c.buffer),e.delete(o))}function s(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:r,remove:a,update:s}}var Op=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Bp=`#ifdef USE_ALPHAHASH
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
#endif`,zp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,kp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Gp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Hp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Vp=`#ifdef USE_AOMAP
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
#endif`,Wp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Xp=`#ifdef USE_BATCHING
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
#endif`,Yp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Kp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,qp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Zp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,$p=`#ifdef USE_IRIDESCENCE
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
#endif`,Jp=`#ifdef USE_BUMPMAP
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
#endif`,Qp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,jp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,e0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,t0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,n0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,i0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,r0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,a0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,s0=`#define PI 3.141592653589793
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
} // validated`,o0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,l0=`vec3 transformedNormal = objectNormal;
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
#endif`,c0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,u0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,h0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,d0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,f0="gl_FragColor = linearToOutputTexel( gl_FragColor );",p0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,m0=`#ifdef USE_ENVMAP
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
#endif`,g0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,_0=`#ifdef USE_ENVMAP
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
#endif`,x0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,v0=`#ifdef USE_ENVMAP
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
#endif`,M0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,S0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,b0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,E0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,y0=`#ifdef USE_GRADIENTMAP
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
}`,w0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,A0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,T0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,R0=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,C0=`#ifdef USE_ENVMAP
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
#endif`,L0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,P0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,D0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,I0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,N0=`PhysicalMaterial material;
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
#endif`,U0=`uniform sampler2D dfgLUT;
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
}`,F0=`
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
#endif`,O0=`#if defined( RE_IndirectDiffuse )
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
#endif`,B0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,z0=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,k0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,G0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,H0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,V0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,W0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,X0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Y0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,K0=`#if defined( USE_POINTS_UV )
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
#endif`,q0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Z0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,$0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,J0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Q0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,j0=`#ifdef USE_MORPHTARGETS
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
#endif`,em=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,tm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,nm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,im=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,am=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,sm=`#ifdef USE_NORMALMAP
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
#endif`,om=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,lm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,cm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,um=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,hm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,dm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,fm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,pm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,mm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,gm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,_m=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,xm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,vm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Mm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Sm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,bm=`float getShadowMask() {
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
}`,Em=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ym=`#ifdef USE_SKINNING
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
#endif`,wm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Am=`#ifdef USE_SKINNING
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
#endif`,Tm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Rm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Cm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Lm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Pm=`#ifdef USE_TRANSMISSION
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
#endif`,Dm=`#ifdef USE_TRANSMISSION
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
#endif`,Im=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Nm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Um=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Fm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Om=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Bm=`uniform sampler2D t2D;
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
}`,zm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,km=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Gm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Hm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vm=`#include <common>
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
}`,Wm=`#if DEPTH_PACKING == 3200
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
}`,Xm=`#define DISTANCE
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
}`,Ym=`#define DISTANCE
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
}`,Km=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,qm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zm=`uniform float scale;
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
}`,$m=`uniform vec3 diffuse;
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
}`,Jm=`#include <common>
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
}`,Qm=`uniform vec3 diffuse;
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
}`,jm=`#define LAMBERT
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
}`,eg=`#define LAMBERT
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
}`,tg=`#define MATCAP
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
}`,ng=`#define MATCAP
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
}`,ig=`#define NORMAL
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
}`,rg=`#define NORMAL
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
}`,ag=`#define PHONG
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
}`,sg=`#define PHONG
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
}`,og=`#define STANDARD
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
}`,lg=`#define STANDARD
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
}`,cg=`#define TOON
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
}`,ug=`#define TOON
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
}`,hg=`uniform float size;
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
}`,dg=`uniform vec3 diffuse;
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
}`,fg=`#include <common>
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
}`,pg=`uniform vec3 color;
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
}`,mg=`uniform float rotation;
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
}`,gg=`uniform vec3 diffuse;
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
}`,Je={alphahash_fragment:Op,alphahash_pars_fragment:Bp,alphamap_fragment:zp,alphamap_pars_fragment:kp,alphatest_fragment:Gp,alphatest_pars_fragment:Hp,aomap_fragment:Vp,aomap_pars_fragment:Wp,batching_pars_vertex:Xp,batching_vertex:Yp,begin_vertex:Kp,beginnormal_vertex:qp,bsdfs:Zp,iridescence_fragment:$p,bumpmap_pars_fragment:Jp,clipping_planes_fragment:Qp,clipping_planes_pars_fragment:jp,clipping_planes_pars_vertex:e0,clipping_planes_vertex:t0,color_fragment:n0,color_pars_fragment:i0,color_pars_vertex:r0,color_vertex:a0,common:s0,cube_uv_reflection_fragment:o0,defaultnormal_vertex:l0,displacementmap_pars_vertex:c0,displacementmap_vertex:u0,emissivemap_fragment:h0,emissivemap_pars_fragment:d0,colorspace_fragment:f0,colorspace_pars_fragment:p0,envmap_fragment:m0,envmap_common_pars_fragment:g0,envmap_pars_fragment:_0,envmap_pars_vertex:x0,envmap_physical_pars_fragment:C0,envmap_vertex:v0,fog_vertex:M0,fog_pars_vertex:S0,fog_fragment:b0,fog_pars_fragment:E0,gradientmap_pars_fragment:y0,lightmap_pars_fragment:w0,lights_lambert_fragment:A0,lights_lambert_pars_fragment:T0,lights_pars_begin:R0,lights_toon_fragment:L0,lights_toon_pars_fragment:P0,lights_phong_fragment:D0,lights_phong_pars_fragment:I0,lights_physical_fragment:N0,lights_physical_pars_fragment:U0,lights_fragment_begin:F0,lights_fragment_maps:O0,lights_fragment_end:B0,lightprobes_pars_fragment:z0,logdepthbuf_fragment:k0,logdepthbuf_pars_fragment:G0,logdepthbuf_pars_vertex:H0,logdepthbuf_vertex:V0,map_fragment:W0,map_pars_fragment:X0,map_particle_fragment:Y0,map_particle_pars_fragment:K0,metalnessmap_fragment:q0,metalnessmap_pars_fragment:Z0,morphinstance_vertex:$0,morphcolor_vertex:J0,morphnormal_vertex:Q0,morphtarget_pars_vertex:j0,morphtarget_vertex:em,normal_fragment_begin:tm,normal_fragment_maps:nm,normal_pars_fragment:im,normal_pars_vertex:rm,normal_vertex:am,normalmap_pars_fragment:sm,clearcoat_normal_fragment_begin:om,clearcoat_normal_fragment_maps:lm,clearcoat_pars_fragment:cm,iridescence_pars_fragment:um,opaque_fragment:hm,packing:dm,premultiplied_alpha_fragment:fm,project_vertex:pm,dithering_fragment:mm,dithering_pars_fragment:gm,roughnessmap_fragment:_m,roughnessmap_pars_fragment:xm,shadowmap_pars_fragment:vm,shadowmap_pars_vertex:Mm,shadowmap_vertex:Sm,shadowmask_pars_fragment:bm,skinbase_vertex:Em,skinning_pars_vertex:ym,skinning_vertex:wm,skinnormal_vertex:Am,specularmap_fragment:Tm,specularmap_pars_fragment:Rm,tonemapping_fragment:Cm,tonemapping_pars_fragment:Lm,transmission_fragment:Pm,transmission_pars_fragment:Dm,uv_pars_fragment:Im,uv_pars_vertex:Nm,uv_vertex:Um,worldpos_vertex:Fm,background_vert:Om,background_frag:Bm,backgroundCube_vert:zm,backgroundCube_frag:km,cube_vert:Gm,cube_frag:Hm,depth_vert:Vm,depth_frag:Wm,distance_vert:Xm,distance_frag:Ym,equirect_vert:Km,equirect_frag:qm,linedashed_vert:Zm,linedashed_frag:$m,meshbasic_vert:Jm,meshbasic_frag:Qm,meshlambert_vert:jm,meshlambert_frag:eg,meshmatcap_vert:tg,meshmatcap_frag:ng,meshnormal_vert:ig,meshnormal_frag:rg,meshphong_vert:ag,meshphong_frag:sg,meshphysical_vert:og,meshphysical_frag:lg,meshtoon_vert:cg,meshtoon_frag:ug,points_vert:hg,points_frag:dg,shadow_vert:fg,shadow_frag:pg,sprite_vert:mg,sprite_frag:gg},_e={common:{diffuse:{value:new ot(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},envMapRotation:{value:new He},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new Ve(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ot(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new X},probesMax:{value:new X},probesResolution:{value:new X}},points:{diffuse:{value:new ot(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new ot(16777215)},opacity:{value:1},center:{value:new Ve(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},Un={basic:{uniforms:Qt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.fog]),vertexShader:Je.meshbasic_vert,fragmentShader:Je.meshbasic_frag},lambert:{uniforms:Qt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new ot(0)},envMapIntensity:{value:1}}]),vertexShader:Je.meshlambert_vert,fragmentShader:Je.meshlambert_frag},phong:{uniforms:Qt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new ot(0)},specular:{value:new ot(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Je.meshphong_vert,fragmentShader:Je.meshphong_frag},standard:{uniforms:Qt([_e.common,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.roughnessmap,_e.metalnessmap,_e.fog,_e.lights,{emissive:{value:new ot(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Je.meshphysical_vert,fragmentShader:Je.meshphysical_frag},toon:{uniforms:Qt([_e.common,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.gradientmap,_e.fog,_e.lights,{emissive:{value:new ot(0)}}]),vertexShader:Je.meshtoon_vert,fragmentShader:Je.meshtoon_frag},matcap:{uniforms:Qt([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,{matcap:{value:null}}]),vertexShader:Je.meshmatcap_vert,fragmentShader:Je.meshmatcap_frag},points:{uniforms:Qt([_e.points,_e.fog]),vertexShader:Je.points_vert,fragmentShader:Je.points_frag},dashed:{uniforms:Qt([_e.common,_e.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Je.linedashed_vert,fragmentShader:Je.linedashed_frag},depth:{uniforms:Qt([_e.common,_e.displacementmap]),vertexShader:Je.depth_vert,fragmentShader:Je.depth_frag},normal:{uniforms:Qt([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,{opacity:{value:1}}]),vertexShader:Je.meshnormal_vert,fragmentShader:Je.meshnormal_frag},sprite:{uniforms:Qt([_e.sprite,_e.fog]),vertexShader:Je.sprite_vert,fragmentShader:Je.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Je.background_vert,fragmentShader:Je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new He}},vertexShader:Je.backgroundCube_vert,fragmentShader:Je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Je.cube_vert,fragmentShader:Je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Je.equirect_vert,fragmentShader:Je.equirect_frag},distance:{uniforms:Qt([_e.common,_e.displacementmap,{referencePosition:{value:new X},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Je.distance_vert,fragmentShader:Je.distance_frag},shadow:{uniforms:Qt([_e.lights,_e.fog,{color:{value:new ot(0)},opacity:{value:1}}]),vertexShader:Je.shadow_vert,fragmentShader:Je.shadow_frag}};Un.physical={uniforms:Qt([Un.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new Ve(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new ot(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new Ve},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new ot(0)},specularColor:{value:new ot(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new Ve},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:Je.meshphysical_vert,fragmentShader:Je.meshphysical_frag};const ba={r:0,b:0,g:0},_g=new Pt,gu=new He;gu.set(-1,0,0,0,1,0,0,0,1);function xg(n,e,t,i,r,a){const s=new ot(0);let o=r===!0?0:1,c,l,u=null,d=0,h=null;function p(M){let E=M.isScene===!0?M.background:null;if(E&&E.isTexture){const b=M.backgroundBlurriness>0;E=e.get(E,b)}return E}function _(M){let E=!1;const b=p(M);b===null?g(s,o):b&&b.isColor&&(g(b,1),E=!0);const R=n.xr.getEnvironmentBlendMode();R==="additive"?t.buffers.color.setClear(0,0,0,1,a):R==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,a),(n.autoClear||E)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function x(M,E){const b=p(E);b&&(b.isCubeTexture||b.mapping===Ya)?(l===void 0&&(l=new en(new qr(1,1,1),new $t({name:"BackgroundCubeMaterial",uniforms:_r(Un.backgroundCube.uniforms),vertexShader:Un.backgroundCube.vertexShader,fragmentShader:Un.backgroundCube.fragmentShader,side:sn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(R,w,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=b,l.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(_g.makeRotationFromEuler(E.backgroundRotation)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(gu),l.material.toneMapped=et.getTransfer(b.colorSpace)!==pt,(u!==b||d!==b.version||h!==n.toneMapping)&&(l.material.needsUpdate=!0,u=b,d=b.version,h=n.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null)):b&&b.isTexture&&(c===void 0&&(c=new en(new Wn(2,2),new $t({name:"BackgroundMaterial",uniforms:_r(Un.background.uniforms),vertexShader:Un.background.vertexShader,fragmentShader:Un.background.fragmentShader,side:Oi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=b,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.toneMapped=et.getTransfer(b.colorSpace)!==pt,b.matrixAutoUpdate===!0&&b.updateMatrix(),c.material.uniforms.uvTransform.value.copy(b.matrix),(u!==b||d!==b.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,u=b,d=b.version,h=n.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function g(M,E){M.getRGB(ba,hu(n)),t.buffers.color.setClear(ba.r,ba.g,ba.b,E,a)}function m(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return s},setClearColor:function(M,E=1){s.set(M),o=E,g(s,o)},getClearAlpha:function(){return o},setClearAlpha:function(M){o=M,g(s,o)},render:_,addToRenderList:x,dispose:m}}function vg(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=h(null);let a=r,s=!1;function o(C,O,F,D,B){let W=!1;const $=d(C,D,F,O);a!==$&&(a=$,l(a.object)),W=p(C,D,F,B),W&&_(C,D,F,B),B!==null&&e.update(B,n.ELEMENT_ARRAY_BUFFER),(W||s)&&(s=!1,b(C,O,F,D),B!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function c(){return n.createVertexArray()}function l(C){return n.bindVertexArray(C)}function u(C){return n.deleteVertexArray(C)}function d(C,O,F,D){const B=D.wireframe===!0;let W=i[O.id];W===void 0&&(W={},i[O.id]=W);const $=C.isInstancedMesh===!0?C.id:0;let ae=W[$];ae===void 0&&(ae={},W[$]=ae);let q=ae[F.id];q===void 0&&(q={},ae[F.id]=q);let ee=q[B];return ee===void 0&&(ee=h(c()),q[B]=ee),ee}function h(C){const O=[],F=[],D=[];for(let B=0;B<t;B++)O[B]=0,F[B]=0,D[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:F,attributeDivisors:D,object:C,attributes:{},index:null}}function p(C,O,F,D){const B=a.attributes,W=O.attributes;let $=0;const ae=F.getAttributes();for(const q in ae)if(ae[q].location>=0){const N=B[q];let re=W[q];if(re===void 0&&(q==="instanceMatrix"&&C.instanceMatrix&&(re=C.instanceMatrix),q==="instanceColor"&&C.instanceColor&&(re=C.instanceColor)),N===void 0||N.attribute!==re||re&&N.data!==re.data)return!0;$++}return a.attributesNum!==$||a.index!==D}function _(C,O,F,D){const B={},W=O.attributes;let $=0;const ae=F.getAttributes();for(const q in ae)if(ae[q].location>=0){let N=W[q];N===void 0&&(q==="instanceMatrix"&&C.instanceMatrix&&(N=C.instanceMatrix),q==="instanceColor"&&C.instanceColor&&(N=C.instanceColor));const re={};re.attribute=N,N&&N.data&&(re.data=N.data),B[q]=re,$++}a.attributes=B,a.attributesNum=$,a.index=D}function x(){const C=a.newAttributes;for(let O=0,F=C.length;O<F;O++)C[O]=0}function g(C){m(C,0)}function m(C,O){const F=a.newAttributes,D=a.enabledAttributes,B=a.attributeDivisors;F[C]=1,D[C]===0&&(n.enableVertexAttribArray(C),D[C]=1),B[C]!==O&&(n.vertexAttribDivisor(C,O),B[C]=O)}function M(){const C=a.newAttributes,O=a.enabledAttributes;for(let F=0,D=O.length;F<D;F++)O[F]!==C[F]&&(n.disableVertexAttribArray(F),O[F]=0)}function E(C,O,F,D,B,W,$){$===!0?n.vertexAttribIPointer(C,O,F,B,W):n.vertexAttribPointer(C,O,F,D,B,W)}function b(C,O,F,D){x();const B=D.attributes,W=F.getAttributes(),$=O.defaultAttributeValues;for(const ae in W){const q=W[ae];if(q.location>=0){let ee=B[ae];if(ee===void 0&&(ae==="instanceMatrix"&&C.instanceMatrix&&(ee=C.instanceMatrix),ae==="instanceColor"&&C.instanceColor&&(ee=C.instanceColor)),ee!==void 0){const N=ee.normalized,re=ee.itemSize,ce=e.get(ee);if(ce===void 0)continue;const Re=ce.buffer,Oe=ce.type,ke=ce.bytesPerElement,j=Oe===n.INT||Oe===n.UNSIGNED_INT||ee.gpuType===ko;if(ee.isInterleavedBufferAttribute){const ie=ee.data,H=ie.stride,ue=ee.offset;if(ie.isInstancedInterleavedBuffer){for(let se=0;se<q.locationSize;se++)m(q.location+se,ie.meshPerAttribute);C.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let se=0;se<q.locationSize;se++)g(q.location+se);n.bindBuffer(n.ARRAY_BUFFER,Re);for(let se=0;se<q.locationSize;se++)E(q.location+se,re/q.locationSize,Oe,N,H*ke,(ue+re/q.locationSize*se)*ke,j)}else{if(ee.isInstancedBufferAttribute){for(let ie=0;ie<q.locationSize;ie++)m(q.location+ie,ee.meshPerAttribute);C.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let ie=0;ie<q.locationSize;ie++)g(q.location+ie);n.bindBuffer(n.ARRAY_BUFFER,Re);for(let ie=0;ie<q.locationSize;ie++)E(q.location+ie,re/q.locationSize,Oe,N,re*ke,re/q.locationSize*ie*ke,j)}}else if($!==void 0){const N=$[ae];if(N!==void 0)switch(N.length){case 2:n.vertexAttrib2fv(q.location,N);break;case 3:n.vertexAttrib3fv(q.location,N);break;case 4:n.vertexAttrib4fv(q.location,N);break;default:n.vertexAttrib1fv(q.location,N)}}}}M()}function R(){T();for(const C in i){const O=i[C];for(const F in O){const D=O[F];for(const B in D){const W=D[B];for(const $ in W)u(W[$].object),delete W[$];delete D[B]}}delete i[C]}}function w(C){if(i[C.id]===void 0)return;const O=i[C.id];for(const F in O){const D=O[F];for(const B in D){const W=D[B];for(const $ in W)u(W[$].object),delete W[$];delete D[B]}}delete i[C.id]}function P(C){for(const O in i){const F=i[O];for(const D in F){const B=F[D];if(B[C.id]===void 0)continue;const W=B[C.id];for(const $ in W)u(W[$].object),delete W[$];delete B[C.id]}}}function S(C){for(const O in i){const F=i[O],D=C.isInstancedMesh===!0?C.id:0,B=F[D];if(B!==void 0){for(const W in B){const $=B[W];for(const ae in $)u($[ae].object),delete $[ae];delete B[W]}delete F[D],Object.keys(F).length===0&&delete i[O]}}}function T(){I(),s=!0,a!==r&&(a=r,l(a.object))}function I(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:T,resetDefaultState:I,dispose:R,releaseStatesOfGeometry:w,releaseStatesOfObject:S,releaseStatesOfProgram:P,initAttributes:x,enableAttribute:g,disableUnusedAttributes:M}}function Mg(n,e,t){let i;function r(c){i=c}function a(c,l){n.drawArrays(i,c,l),t.update(l,i,1)}function s(c,l,u){u!==0&&(n.drawArraysInstanced(i,c,l,u),t.update(l,i,u))}function o(c,l,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,u);let h=0;for(let p=0;p<u;p++)h+=l[p];t.update(h,i,1)}this.setMode=r,this.render=a,this.renderInstances=s,this.renderMultiDraw=o}function Sg(n,e,t,i){let r;function a(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function s(P){return!(P!==xn&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){const S=P===Hn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==hn&&P!==Fn&&!S&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function c(P){if(P==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(Ge("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const d=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&Ge("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),E=n.getParameter(n.MAX_VARYING_VECTORS),b=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),R=n.getParameter(n.MAX_SAMPLES),w=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:s,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:p,maxVertexTextures:_,maxTextureSize:x,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:M,maxVaryings:E,maxFragmentUniforms:b,maxSamples:R,samples:w}}function bg(n){const e=this;let t=null,i=0,r=!1,a=!1;const s=new _i,o=new He,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const p=d.length!==0||h||i!==0||r;return r=h,i=d.length,p},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,p){const _=d.clippingPlanes,x=d.clipIntersection,g=d.clipShadows,m=n.get(d);if(!r||_===null||_.length===0||a&&!g)a?u(null):l();else{const M=a?0:i,E=M*4;let b=m.clippingState||null;c.value=b,b=u(_,h,E,p);for(let R=0;R!==E;++R)b[R]=t[R];m.clippingState=b,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,h,p,_){const x=d!==null?d.length:0;let g=null;if(x!==0){if(g=c.value,_!==!0||g===null){const m=p+x*4,M=h.matrixWorldInverse;o.getNormalMatrix(M),(g===null||g.length<m)&&(g=new Float32Array(m));for(let E=0,b=p;E!==x;++E,b+=4)s.copy(d[E]).applyMatrix4(M,o),s.normal.toArray(g,b),g[b+3]=s.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,g}}const cr=4,Eg=6,yg=20,wg=256,Lr=new Jo,Wl=new ot;let Ls=null,Ps=0,Ds=0,Is=!1;const Ag=new X,Ti=new X;class Xl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,a={}){const{size:s=256,position:o=Ag}=a;Ls=this._renderer.getRenderTarget(),Ps=this._renderer.getActiveCubeFace(),Ds=this._renderer.getActiveMipmapLevel(),Is=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(s);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,r,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ql(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Kl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ls,Ps,Ds),this._renderer.xr.enabled=Is,e.scissorTest=!1,ir(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Bi||e.mapping===gr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ls=this._renderer.getRenderTarget(),Ps=this._renderer.getActiveCubeFace(),Ds=this._renderer.getActiveMipmapLevel(),Is=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:It,minFilter:It,generateMipmaps:!1,type:Hn,format:xn,colorSpace:Hr,depthBuffer:!1},r=Yl(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Yl(e,t,i);const{_lodMax:a}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Tg(a)),this._blurMaterial=Cg(a,e,t),this._ggxMaterial=Rg(a,e,t)}return r}_compileMaterial(e){const t=new en(new Vn,e);this._renderer.compile(t,Lr)}_sceneToCubeUV(e,t,i,r,a){const c=new gn(90,1,t,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,p=d.toneMapping;d.getClearColor(Wl),d.toneMapping=Bn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new en(new qr,new ou({name:"PMREM.Background",side:sn,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,g=x.material;let m=!1;const M=e.background;M?M.isColor&&(g.color.copy(M),e.background=null,m=!0):(g.color.copy(Wl),m=!0);for(let E=0;E<6;E++){const b=E%3;b===0?(c.up.set(0,l[E],0),c.position.set(a.x,a.y,a.z),c.lookAt(a.x+u[E],a.y,a.z)):b===1?(c.up.set(0,0,l[E]),c.position.set(a.x,a.y,a.z),c.lookAt(a.x,a.y+u[E],a.z)):(c.up.set(0,l[E],0),c.position.set(a.x,a.y,a.z),c.lookAt(a.x,a.y,a.z+u[E]));const R=this._cubeSize;ir(r,b*R,E>2?R:0,R,R),d.setRenderTarget(r),m&&d.render(x,c),d.render(e,c)}d.toneMapping=p,d.autoClear=h,e.background=M}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===Bi||e.mapping===gr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=ql()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Kl());const a=r?this._cubemapMaterial:this._equirectMaterial,s=this._lodMeshes[0];s.material=a;const o=a.uniforms;o.envMap.value=e;const c=this._cubeSize;ir(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(s,Lr)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let a=1;a<r;a++)this._applyGGXFilter(e,a-1,a);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,a=this._pingPongRenderTarget,s=this._ggxMaterial,o=this._lodMeshes[i];o.material=s;const c=s.uniforms,l=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(l*l-u*u),h=l*1.25,p=d*h,{_lodMax:_}=this,x=this._sizeLods[i],g=3*x*(i>_-cr?i-_+cr:0),m=4*(this._cubeSize-x);c.envMap.value=e.texture,c.roughness.value=p,c.mipInt.value=_-t,ir(a,g,m,3*x,2*x),r.setRenderTarget(a),r.render(o,Lr),c.envMap.value=a.texture,c.roughness.value=0,c.mipInt.value=_-i,ir(e,g,m,3*x,2*x),r.setRenderTarget(e),r.render(o,Lr)}_blur(e,t,i,r){const a=this._pingPongRenderTarget,s=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,a,t,i,s),this._blurPass(a,e,i,i,s)}_blurPass(e,t,i,r,a){const s=this._renderer,o=this._blurMaterial,c=this._lodMeshes[r];c.material=o;const l=o.uniforms;l.envMap.value=e.texture,l.sigma.value=a,l.mipInt.value=this._lodMax-i;const u=this._sizeLods[r],d=3*u*(r>this._lodMax-cr?r-this._lodMax+cr:0),h=4*(this._cubeSize-u);ir(t,d,h,3*u,2*u),s.setRenderTarget(t),s.render(c,Lr)}}function Tg(n){const e=[],t=[];let i=n;const r=n-cr+1+Eg;for(let a=0;a<r;a++){const s=Math.pow(2,i);e.push(s);const o=1/(s-2),c=-o,l=1+o,u=[c,c,l,c,l,l,c,c,l,l,c,l],d=6,h=6,p=3,_=new Float32Array(p*h*d),x=new Float32Array(p*h*d);for(let m=0;m<d;m++){const M=m%3*2/3-1,E=m>2?0:-1,b=[M,E,0,M+2/3,E,0,M+2/3,E+1,0,M,E,0,M+2/3,E+1,0,M,E+1,0];_.set(b,p*h*m);for(let R=0;R<h;R++){const w=u[R*2]*2-1,P=u[R*2+1]*2-1;m===0?Ti.set(1,P,w):m===1?Ti.set(-w,1,-P):m===2?Ti.set(-w,P,1):m===3?Ti.set(-1,P,-w):m===4?Ti.set(-w,-1,P):Ti.set(w,P,-1),Ti.toArray(x,(m*h+R)*p)}}const g=new Vn;g.setAttribute("position",new zn(_,p)),g.setAttribute("outputDirection",new zn(x,p)),t.push(new en(g,null)),i>cr&&i--}return{lodMeshes:t,sizeLods:e}}function Yl(n,e,t){const i=new vn(n,e,t);return i.texture.mapping=Ya,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ir(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Rg(n,e,t){return new $t({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:wg,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:qa(),fragmentShader:`

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
		`,blending:ii,depthTest:!1,depthWrite:!1})}function Cg(n,e,t){return new $t({name:"SphericalGaussianBlur",defines:{SAMPLES:yg,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:qa(),fragmentShader:`

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
		`,blending:ii,depthTest:!1,depthWrite:!1})}function Kl(){return new $t({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:qa(),fragmentShader:`

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
		`,blending:ii,depthTest:!1,depthWrite:!1})}function ql(){return new $t({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:qa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ii,depthTest:!1,depthWrite:!1})}function qa(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class _u extends vn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new cu(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new qr(5,5,5),a=new $t({name:"CubemapFromEquirect",uniforms:_r(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:sn,blending:ii});a.uniforms.tEquirect.value=t;const s=new en(r,a),o=t.minFilter;return t.minFilter===Pi&&(t.minFilter=It),new Ip(1,10,this).update(e,s),t.minFilter=o,s.geometry.dispose(),s.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const a=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,i,r);e.setRenderTarget(a)}}function Lg(n){let e=new WeakMap,t=new WeakMap,i=null;function r(h,p=!1){return h==null?null:p?s(h):a(h)}function a(h){if(h&&h.isTexture){const p=h.mapping;if(p===rs||p===as)if(e.has(h)){const _=e.get(h).texture;return o(_,h.mapping)}else{const _=h.image;if(_&&_.height>0){const x=new _u(_.height);return x.fromEquirectangularTexture(n,h),e.set(h,x),h.addEventListener("dispose",l),o(x.texture,h.mapping)}else return null}}return h}function s(h){if(h&&h.isTexture){const p=h.mapping,_=p===rs||p===as,x=p===Bi||p===gr;if(_||x){let g=t.get(h);const m=g!==void 0?g.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==m)return i===null&&(i=new Xl(n)),g=_?i.fromEquirectangular(h,g):i.fromCubemap(h,g),g.texture.pmremVersion=h.pmremVersion,t.set(h,g),g.texture;if(g!==void 0)return g.texture;{const M=h.image;return _&&M&&M.height>0||x&&M&&c(M)?(i===null&&(i=new Xl(n)),g=_?i.fromEquirectangular(h):i.fromCubemap(h),g.texture.pmremVersion=h.pmremVersion,t.set(h,g),h.addEventListener("dispose",u),g.texture):null}}}return h}function o(h,p){return p===rs?h.mapping=Bi:p===as&&(h.mapping=gr),h}function c(h){let p=0;const _=6;for(let x=0;x<_;x++)h[x]!==void 0&&p++;return p===_}function l(h){const p=h.target;p.removeEventListener("dispose",l);const _=e.get(p);_!==void 0&&(e.delete(p),_.dispose())}function u(h){const p=h.target;p.removeEventListener("dispose",u);const _=t.get(p);_!==void 0&&(t.delete(p),_.dispose())}function d(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:d}}function Pg(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&hr("WebGLRenderer: "+i+" extension not supported."),r}}}function Dg(n,e,t,i){const r={},a=new WeakMap;function s(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const _ in h.attributes)e.remove(h.attributes[_]);h.removeEventListener("dispose",s),delete r[h.id];const p=a.get(h);p&&(e.remove(p),a.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(d,h){return r[h.id]===!0||(h.addEventListener("dispose",s),r[h.id]=!0,t.memory.geometries++),h}function c(d){const h=d.attributes;for(const p in h)e.update(h[p],n.ARRAY_BUFFER)}function l(d){const h=[],p=d.index,_=d.attributes.position;let x=0;if(_===void 0)return;if(p!==null){const M=p.array;x=p.version;for(let E=0,b=M.length;E<b;E+=3){const R=M[E+0],w=M[E+1],P=M[E+2];h.push(R,w,w,P,P,R)}}else{const M=_.array;x=_.version;for(let E=0,b=M.length/3-1;E<b;E+=3){const R=E+0,w=E+1,P=E+2;h.push(R,w,w,P,P,R)}}const g=new(_.count>=65535?su:au)(h,1);g.version=x;const m=a.get(d);m&&e.remove(m),a.set(d,g)}function u(d){const h=a.get(d);if(h){const p=d.index;p!==null&&h.version<p.version&&l(d)}else l(d);return a.get(d)}return{get:o,update:c,getWireframeAttribute:u}}function Ig(n,e,t){let i;function r(d){i=d}let a,s;function o(d){a=d.type,s=d.bytesPerElement}function c(d,h){n.drawElements(i,h,a,d*s),t.update(h,i,1)}function l(d,h,p){p!==0&&(n.drawElementsInstanced(i,h,a,d*s,p),t.update(h,i,p))}function u(d,h,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,a,d,0,p);let x=0;for(let g=0;g<p;g++)x+=h[g];t.update(x,i,1)}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Ng(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,s,o){switch(t.calls++,s){case n.TRIANGLES:t.triangles+=o*(a/3);break;case n.LINES:t.lines+=o*(a/2);break;case n.LINE_STRIP:t.lines+=o*(a-1);break;case n.LINE_LOOP:t.lines+=o*a;break;case n.POINTS:t.points+=o*a;break;default:rt("WebGLInfo: Unknown draw mode:",s);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function Ug(n,e,t){const i=new WeakMap,r=new Tt;function a(s,o,c){const l=s.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let h=i.get(o);if(h===void 0||h.count!==d){let T=function(){P.dispose(),i.delete(o),o.removeEventListener("dispose",T)};h!==void 0&&h.texture.dispose();const p=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let E=0;p===!0&&(E=1),_===!0&&(E=2),x===!0&&(E=3);let b=o.attributes.position.count*E,R=1;b>e.maxTextureSize&&(R=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const w=new Float32Array(b*R*4*d),P=new nu(w,b,R,d);P.type=Fn,P.needsUpdate=!0;const S=E*4;for(let I=0;I<d;I++){const C=g[I],O=m[I],F=M[I],D=b*R*4*I;for(let B=0;B<C.count;B++){const W=B*S;p===!0&&(r.fromBufferAttribute(C,B),w[D+W+0]=r.x,w[D+W+1]=r.y,w[D+W+2]=r.z,w[D+W+3]=0),_===!0&&(r.fromBufferAttribute(O,B),w[D+W+4]=r.x,w[D+W+5]=r.y,w[D+W+6]=r.z,w[D+W+7]=0),x===!0&&(r.fromBufferAttribute(F,B),w[D+W+8]=r.x,w[D+W+9]=r.y,w[D+W+10]=r.z,w[D+W+11]=F.itemSize===4?r.w:1)}}h={count:d,texture:P,size:new Ve(b,R)},i.set(o,h),o.addEventListener("dispose",T)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",s.morphTexture,t);else{let p=0;for(let x=0;x<l.length;x++)p+=l[x];const _=o.morphTargetsRelative?1:1-p;c.getUniforms().setValue(n,"morphTargetBaseInfluence",_),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:a}}function Fg(n,e,t,i,r){let a=new WeakMap;function s(l){const u=r.render.frame,d=l.geometry,h=e.get(l,d);if(a.get(h)!==u&&(e.update(h),a.set(h,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),a.get(l)!==u&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),a.set(l,u))),l.isSkinnedMesh){const p=l.skeleton;a.get(p)!==u&&(p.update(),a.set(p,u))}return h}function o(){a=new WeakMap}function c(l){const u=l.target;u.removeEventListener("dispose",c),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:s,dispose:o}}const Og={[zc]:"LINEAR_TONE_MAPPING",[kc]:"REINHARD_TONE_MAPPING",[Gc]:"CINEON_TONE_MAPPING",[Hc]:"ACES_FILMIC_TONE_MAPPING",[Wc]:"AGX_TONE_MAPPING",[Xc]:"NEUTRAL_TONE_MAPPING",[Vc]:"CUSTOM_TONE_MAPPING"};function Bg(n,e,t,i,r,a){const s=new vn(e,t,{type:n,depthBuffer:r,stencilBuffer:a,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,c=null;const l=new Vn;l.setAttribute("position",new ai([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new ai([0,2,0,0,2,0],2));const u=new Lp({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new en(l,u),h=new Jo(-1,1,1,-1,0,1);let p=null,_=null,x=!1,g,m=null,M=[],E=!1;this.setSize=function(b,R){s.setSize(b,R),o!==null&&o.setSize(b,R),c!==null&&c.setSize(b,R);for(let w=0;w<M.length;w++){const P=M[w];P.setSize&&P.setSize(b,R)}},this.setEffects=function(b){M=b,E=M.length>0&&M[0].isRenderPass===!0;const R=s.width,w=s.height;M.length>0&&o===null&&(o=new vn(R,w,{type:Hn,depthBuffer:!1,stencilBuffer:!1}),c=new vn(R,w,{type:Hn,depthBuffer:!1,stencilBuffer:!1}));for(let P=0;P<M.length;P++){const S=M[P];S.setSize&&S.setSize(R,w)}},this.begin=function(b,R){if(x||b.toneMapping===Bn&&M.length===0)return!1;if(m=R,R!==null){const w=R.width,P=R.height;(s.width!==w||s.height!==P)&&this.setSize(w,P)}return E===!1&&b.setRenderTarget(s),g=b.toneMapping,b.toneMapping=Bn,!0},this.hasRenderPass=function(){return E},this.end=function(b,R){b.toneMapping=g,x=!0;let w=s,P=o;for(let S=0;S<M.length;S++){const T=M[S];T.enabled!==!1&&(T.render(b,P,w,R),T.needsSwap!==!1&&(w=P,P=P===o?c:o))}if(p!==b.outputColorSpace||_!==b.toneMapping){p=b.outputColorSpace,_=b.toneMapping,u.defines={},et.getTransfer(p)===pt&&(u.defines.SRGB_TRANSFER="");const S=Og[_];S&&(u.defines[S]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=w.texture,b.setRenderTarget(m),b.render(d,h),m=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){s.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}const xu=new jt,wo=new Vr(1,1),vu=new nu,Mu=new op,Su=new cu,Zl=[],$l=[],Jl=new Float32Array(16),Ql=new Float32Array(9),jl=new Float32Array(4);function Sr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let a=Zl[r];if(a===void 0&&(a=new Float32Array(r),Zl[r]=a),e!==0){i.toArray(a,0);for(let s=1,o=0;s!==e;++s)o+=t,n[s].toArray(a,o)}return a}function Bt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function zt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Za(n,e){let t=$l[e];t===void 0&&(t=new Int32Array(e),$l[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function zg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function kg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;n.uniform2fv(this.addr,e),zt(t,e)}}function Gg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Bt(t,e))return;n.uniform3fv(this.addr,e),zt(t,e)}}function Hg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;n.uniform4fv(this.addr,e),zt(t,e)}}function Vg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Bt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),zt(t,e)}else{if(Bt(t,i))return;jl.set(i),n.uniformMatrix2fv(this.addr,!1,jl),zt(t,i)}}function Wg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Bt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),zt(t,e)}else{if(Bt(t,i))return;Ql.set(i),n.uniformMatrix3fv(this.addr,!1,Ql),zt(t,i)}}function Xg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Bt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),zt(t,e)}else{if(Bt(t,i))return;Jl.set(i),n.uniformMatrix4fv(this.addr,!1,Jl),zt(t,i)}}function Yg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Kg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;n.uniform2iv(this.addr,e),zt(t,e)}}function qg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Bt(t,e))return;n.uniform3iv(this.addr,e),zt(t,e)}}function Zg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;n.uniform4iv(this.addr,e),zt(t,e)}}function $g(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Jg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;n.uniform2uiv(this.addr,e),zt(t,e)}}function Qg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Bt(t,e))return;n.uniform3uiv(this.addr,e),zt(t,e)}}function jg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;n.uniform4uiv(this.addr,e),zt(t,e)}}function e1(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let a;this.type===n.SAMPLER_2D_SHADOW?(wo.compareFunction=t.isReversedDepthBuffer()?Ko:Yo,a=wo):a=xu,t.setTexture2D(e||a,r)}function t1(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Mu,r)}function n1(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Su,r)}function i1(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||vu,r)}function r1(n){switch(n){case 5126:return zg;case 35664:return kg;case 35665:return Gg;case 35666:return Hg;case 35674:return Vg;case 35675:return Wg;case 35676:return Xg;case 5124:case 35670:return Yg;case 35667:case 35671:return Kg;case 35668:case 35672:return qg;case 35669:case 35673:return Zg;case 5125:return $g;case 36294:return Jg;case 36295:return Qg;case 36296:return jg;case 35678:case 36198:case 36298:case 36306:case 35682:return e1;case 35679:case 36299:case 36307:return t1;case 35680:case 36300:case 36308:case 36293:return n1;case 36289:case 36303:case 36311:case 36292:return i1}}function a1(n,e){n.uniform1fv(this.addr,e)}function s1(n,e){const t=Sr(e,this.size,2);n.uniform2fv(this.addr,t)}function o1(n,e){const t=Sr(e,this.size,3);n.uniform3fv(this.addr,t)}function l1(n,e){const t=Sr(e,this.size,4);n.uniform4fv(this.addr,t)}function c1(n,e){const t=Sr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function u1(n,e){const t=Sr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function h1(n,e){const t=Sr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function d1(n,e){n.uniform1iv(this.addr,e)}function f1(n,e){n.uniform2iv(this.addr,e)}function p1(n,e){n.uniform3iv(this.addr,e)}function m1(n,e){n.uniform4iv(this.addr,e)}function g1(n,e){n.uniform1uiv(this.addr,e)}function _1(n,e){n.uniform2uiv(this.addr,e)}function x1(n,e){n.uniform3uiv(this.addr,e)}function v1(n,e){n.uniform4uiv(this.addr,e)}function M1(n,e,t){const i=this.cache,r=e.length,a=Za(t,r);Bt(i,a)||(n.uniform1iv(this.addr,a),zt(i,a));let s;this.type===n.SAMPLER_2D_SHADOW?s=wo:s=xu;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||s,a[o])}function S1(n,e,t){const i=this.cache,r=e.length,a=Za(t,r);Bt(i,a)||(n.uniform1iv(this.addr,a),zt(i,a));for(let s=0;s!==r;++s)t.setTexture3D(e[s]||Mu,a[s])}function b1(n,e,t){const i=this.cache,r=e.length,a=Za(t,r);Bt(i,a)||(n.uniform1iv(this.addr,a),zt(i,a));for(let s=0;s!==r;++s)t.setTextureCube(e[s]||Su,a[s])}function E1(n,e,t){const i=this.cache,r=e.length,a=Za(t,r);Bt(i,a)||(n.uniform1iv(this.addr,a),zt(i,a));for(let s=0;s!==r;++s)t.setTexture2DArray(e[s]||vu,a[s])}function y1(n){switch(n){case 5126:return a1;case 35664:return s1;case 35665:return o1;case 35666:return l1;case 35674:return c1;case 35675:return u1;case 35676:return h1;case 5124:case 35670:return d1;case 35667:case 35671:return f1;case 35668:case 35672:return p1;case 35669:case 35673:return m1;case 5125:return g1;case 36294:return _1;case 36295:return x1;case 36296:return v1;case 35678:case 36198:case 36298:case 36306:case 35682:return M1;case 35679:case 36299:case 36307:return S1;case 35680:case 36300:case 36308:case 36293:return b1;case 36289:case 36303:case 36311:case 36292:return E1}}class w1{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=r1(t.type)}}class A1{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=y1(t.type)}}class T1{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let a=0,s=r.length;a!==s;++a){const o=r[a];o.setValue(e,t[o.id],i)}}}const Ns=/(\w+)(\])?(\[|\.)?/g;function ec(n,e){n.seq.push(e),n.map[e.id]=e}function R1(n,e,t){const i=n.name,r=i.length;for(Ns.lastIndex=0;;){const a=Ns.exec(i),s=Ns.lastIndex;let o=a[1];const c=a[2]==="]",l=a[3];if(c&&(o=o|0),l===void 0||l==="["&&s+2===r){ec(t,l===void 0?new w1(o,n,e):new A1(o,n,e));break}else{let d=t.map[o];d===void 0&&(d=new T1(o),ec(t,d)),t=d}}}class Na{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const o=e.getActiveUniform(t,s),c=e.getUniformLocation(t,o.name);R1(o,c,this)}const r=[],a=[];for(const s of this.seq)s.type===e.SAMPLER_2D_SHADOW||s.type===e.SAMPLER_CUBE_SHADOW||s.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(s):a.push(s);r.length>0&&(this.seq=r.concat(a))}setValue(e,t,i,r){const a=this.map[t];a!==void 0&&a.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let a=0,s=t.length;a!==s;++a){const o=t[a],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,a=e.length;r!==a;++r){const s=e[r];s.id in t&&i.push(s)}return i}}function tc(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const C1=37297;let L1=0;function P1(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let s=r;s<a;s++){const o=s+1;i.push(`${o===e?">":" "} ${o}: ${t[s]}`)}return i.join(`
`)}const nc=new He;function D1(n){et._getMatrix(nc,et.workingColorSpace,n);const e=`mat3( ${nc.elements.map(t=>t.toFixed(4))} )`;switch(et.getTransfer(n)){case Ba:return[e,"LinearTransferOETF"];case pt:return[e,"sRGBTransferOETF"];default:return Ge("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function ic(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),a=(n.getShaderInfoLog(e)||"").trim();if(i&&a==="")return"";const s=/ERROR: 0:(\d+)/.exec(a);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+a+`

`+P1(n.getShaderSource(e),o)}else return a}function I1(n,e){const t=D1(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const N1={[zc]:"Linear",[kc]:"Reinhard",[Gc]:"Cineon",[Hc]:"ACESFilmic",[Wc]:"AgX",[Xc]:"Neutral",[Vc]:"Custom"};function U1(n,e){const t=N1[e];return t===void 0?(Ge("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ea=new X;function F1(){et.getLuminanceCoefficients(Ea);const n=Ea.x.toFixed(4),e=Ea.y.toFixed(4),t=Ea.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function O1(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Nr).join(`
`)}function B1(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function z1(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const a=n.getActiveAttrib(e,r),s=a.name;let o=1;a.type===n.FLOAT_MAT2&&(o=2),a.type===n.FLOAT_MAT3&&(o=3),a.type===n.FLOAT_MAT4&&(o=4),t[s]={type:a.type,location:n.getAttribLocation(e,s),locationSize:o}}return t}function Nr(n){return n!==""}function rc(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ac(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const k1=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ao(n){return n.replace(k1,H1)}const G1=new Map;function H1(n,e){let t=Je[e];if(t===void 0){const i=G1.get(e);if(i!==void 0)t=Je[i],Ge('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Ao(t)}const V1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function sc(n){return n.replace(V1,W1)}function W1(n,e,t,i){let r="";for(let a=parseInt(e);a<parseInt(t);a++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return r}function oc(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const X1={[Ca]:"SHADOWMAP_TYPE_PCF",[Ir]:"SHADOWMAP_TYPE_VSM"};function Y1(n){return X1[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const K1={[Bi]:"ENVMAP_TYPE_CUBE",[gr]:"ENVMAP_TYPE_CUBE",[Ya]:"ENVMAP_TYPE_CUBE_UV"};function q1(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":K1[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const Z1={[gr]:"ENVMAP_MODE_REFRACTION"};function $1(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":Z1[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const J1={[Bc]:"ENVMAP_BLENDING_MULTIPLY",[Bf]:"ENVMAP_BLENDING_MIX",[zf]:"ENVMAP_BLENDING_ADD"};function Q1(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":J1[n.combine]||"ENVMAP_BLENDING_NONE"}function j1(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function e_(n,e,t,i){const r=n.getContext(),a=t.defines;let s=t.vertexShader,o=t.fragmentShader;const c=Y1(t),l=q1(t),u=$1(t),d=Q1(t),h=j1(t),p=O1(t),_=B1(a),x=r.createProgram();let g,m,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Nr).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Nr).join(`
`),m.length>0&&(m+=`
`)):(g=[oc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Nr).join(`
`),m=[oc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Bn?"#define TONE_MAPPING":"",t.toneMapping!==Bn?Je.tonemapping_pars_fragment:"",t.toneMapping!==Bn?U1("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Je.colorspace_pars_fragment,I1("linearToOutputTexel",t.outputColorSpace),F1(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Nr).join(`
`)),s=Ao(s),s=rc(s,t),s=ac(s,t),o=Ao(o),o=rc(o,t),o=ac(o,t),s=sc(s),o=sc(o),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===El?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===El?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const E=M+g+s,b=M+m+o,R=tc(r,r.VERTEX_SHADER,E),w=tc(r,r.FRAGMENT_SHADER,b);r.attachShader(x,R),r.attachShader(x,w),t.index0AttributeName!==void 0?r.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function P(C){if(n.debug.checkShaderErrors){const O=r.getProgramInfoLog(x)||"",F=r.getShaderInfoLog(R)||"",D=r.getShaderInfoLog(w)||"",B=O.trim(),W=F.trim(),$=D.trim();let ae=!0,q=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(ae=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,x,R,w);else{const ee=ic(r,R,"vertex"),N=ic(r,w,"fragment");rt("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+B+`
`+ee+`
`+N)}else B!==""?Ge("WebGLProgram: Program Info Log:",B):(W===""||$==="")&&(q=!1);q&&(C.diagnostics={runnable:ae,programLog:B,vertexShader:{log:W,prefix:g},fragmentShader:{log:$,prefix:m}})}r.deleteShader(R),r.deleteShader(w),S=new Na(r,x),T=z1(r,x)}let S;this.getUniforms=function(){return S===void 0&&P(this),S};let T;this.getAttributes=function(){return T===void 0&&P(this),T};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=r.getProgramParameter(x,C1)),I},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=L1++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=R,this.fragmentShader=w,this}let t_=0;class n_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new i_(e),t.set(e,i)),i}}class i_{constructor(e){this.id=t_++,this.code=e,this.usedTimes=0}}function r_(n){return n===zi||n===Fa||n===Oa}function a_(n,e,t,i,r,a){const s=new iu,o=new n_,c=new Set,l=[],u=new Map,d=i.logarithmicDepthBuffer;let h=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return c.add(S),S===0?"uv":`uv${S}`}function x(S,T,I,C,O,F){const D=C.fog,B=O.geometry,W=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?C.environment:null,$=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap,ae=e.get(S.envMap||W,$),q=ae&&ae.mapping===Ya?ae.image.height:null,ee=p[S.type];S.precision!==null&&(h=i.getMaxPrecision(S.precision),h!==S.precision&&Ge("WebGLProgram.getParameters:",S.precision,"not supported, using",h,"instead."));const N=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,re=N!==void 0?N.length:0;let ce=0;B.morphAttributes.position!==void 0&&(ce=1),B.morphAttributes.normal!==void 0&&(ce=2),B.morphAttributes.color!==void 0&&(ce=3);let Re,Oe,ke,j;if(ee){const St=Un[ee];Re=St.vertexShader,Oe=St.fragmentShader}else{Re=S.vertexShader,Oe=S.fragmentShader;const St=o.getVertexShaderStage(S),lt=o.getFragmentShaderStage(S);o.update(S,St,lt),ke=St.id,j=lt.id}const ie=n.getRenderTarget(),H=n.state.buffers.depth.getReversed(),ue=O.isInstancedMesh===!0,se=O.isBatchedMesh===!0,ye=!!S.map,qe=!!S.matcap,Ce=!!ae,Ue=!!S.aoMap,Xe=!!S.lightMap,We=!!S.bumpMap&&S.wireframe===!1,xt=!!S.normalMap,Rt=!!S.displacementMap,kt=!!S.emissiveMap,mt=!!S.metalnessMap,vt=!!S.roughnessMap,k=S.anisotropy>0,Ze=S.clearcoat>0,ze=S.dispersion>0,L=S.retroreflectivity>0,v=S.iridescence>0,U=S.sheen>0,V=S.transmission>0,Z=k&&!!S.anisotropyMap,le=Ze&&!!S.clearcoatMap,he=Ze&&!!S.clearcoatNormalMap,Q=Ze&&!!S.clearcoatRoughnessMap,te=v&&!!S.iridescenceMap,de=v&&!!S.iridescenceThicknessMap,Le=U&&!!S.sheenColorMap,ge=U&&!!S.sheenRoughnessMap,fe=!!S.specularMap,Ie=!!S.specularColorMap,Be=!!S.specularIntensityMap,Ye=V&&!!S.transmissionMap,G=V&&!!S.thicknessMap,pe=!!S.gradientMap,ne=!!S.alphaMap,me=S.alphaTest>0,Se=!!S.alphaHash,oe=!!S.extensions;let Ne=Bn;S.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(Ne=n.toneMapping);const Pe={shaderID:ee,shaderType:S.type,shaderName:S.name,vertexShader:Re,fragmentShader:Oe,defines:S.defines,customVertexShaderID:ke,customFragmentShaderID:j,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:h,batching:se,batchingColor:se&&O._colorsTexture!==null,instancing:ue,instancingColor:ue&&O.instanceColor!==null,instancingMorph:ue&&O.morphTexture!==null,outputColorSpace:ie===null?n.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:et.workingColorSpace,alphaToCoverage:!!S.alphaToCoverage,map:ye,matcap:qe,envMap:Ce,envMapMode:Ce&&ae.mapping,envMapCubeUVHeight:q,aoMap:Ue,lightMap:Xe,bumpMap:We,normalMap:xt,displacementMap:Rt,emissiveMap:kt,normalMapObjectSpace:xt&&S.normalMapType===Hf,normalMapTangentSpace:xt&&S.normalMapType===bl,packedNormalMap:xt&&S.normalMapType===bl&&r_(S.normalMap.format),metalnessMap:mt,roughnessMap:vt,anisotropy:k,anisotropyMap:Z,clearcoat:Ze,clearcoatMap:le,clearcoatNormalMap:he,clearcoatRoughnessMap:Q,dispersion:ze,retroreflection:L,iridescence:v,iridescenceMap:te,iridescenceThicknessMap:de,sheen:U,sheenColorMap:Le,sheenRoughnessMap:ge,specularMap:fe,specularColorMap:Ie,specularIntensityMap:Be,transmission:V,transmissionMap:Ye,thicknessMap:G,gradientMap:pe,opaque:S.transparent===!1&&S.blending===Or&&S.alphaToCoverage===!1,alphaMap:ne,alphaTest:me,alphaHash:Se,combine:S.combine,mapUv:ye&&_(S.map.channel),aoMapUv:Ue&&_(S.aoMap.channel),lightMapUv:Xe&&_(S.lightMap.channel),bumpMapUv:We&&_(S.bumpMap.channel),normalMapUv:xt&&_(S.normalMap.channel),displacementMapUv:Rt&&_(S.displacementMap.channel),emissiveMapUv:kt&&_(S.emissiveMap.channel),metalnessMapUv:mt&&_(S.metalnessMap.channel),roughnessMapUv:vt&&_(S.roughnessMap.channel),anisotropyMapUv:Z&&_(S.anisotropyMap.channel),clearcoatMapUv:le&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:he&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:te&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:de&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:Le&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:ge&&_(S.sheenRoughnessMap.channel),specularMapUv:fe&&_(S.specularMap.channel),specularColorMapUv:Ie&&_(S.specularColorMap.channel),specularIntensityMapUv:Be&&_(S.specularIntensityMap.channel),transmissionMapUv:Ye&&_(S.transmissionMap.channel),thicknessMapUv:G&&_(S.thicknessMap.channel),alphaMapUv:ne&&_(S.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(xt||k),vertexNormals:!!B.attributes.normal,vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!B.attributes.uv&&(ye||ne),fog:!!D,useFog:S.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:S.wireframe===!1&&(S.flatShading===!0||B.attributes.normal===void 0&&xt===!1&&(S.isMeshLambertMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isMeshPhysicalMaterial)),sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:H,skinning:O.isSkinnedMesh===!0,hasPositionAttribute:B.attributes.position!==void 0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:re,morphTextureStride:ce,numSunLights:T.sun.length,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numSunLightShadows:T.sunShadowMap.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:F.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:n.shadowMap.enabled&&I.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ne,decodeVideoTexture:ye&&S.map.isVideoTexture===!0&&et.getTransfer(S.map.colorSpace)===pt,decodeVideoTextureEmissive:kt&&S.emissiveMap.isVideoTexture===!0&&et.getTransfer(S.emissiveMap.colorSpace)===pt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===jn,flipSided:S.side===sn,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:oe&&S.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(oe&&S.extensions.multiDraw===!0||se)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Pe.vertexUv1s=c.has(1),Pe.vertexUv2s=c.has(2),Pe.vertexUv3s=c.has(3),c.clear(),Pe}function g(S){const T=[];if(S.shaderID?T.push(S.shaderID):(T.push(S.customVertexShaderID),T.push(S.customFragmentShaderID)),S.defines!==void 0)for(const I in S.defines)T.push(I),T.push(S.defines[I]);return S.isRawShaderMaterial===!1&&(m(T,S),M(T,S),T.push(n.outputColorSpace)),T.push(S.customProgramCacheKey),T.join()}function m(S,T){S.push(T.precision),S.push(T.outputColorSpace),S.push(T.envMapMode),S.push(T.envMapCubeUVHeight),S.push(T.mapUv),S.push(T.alphaMapUv),S.push(T.lightMapUv),S.push(T.aoMapUv),S.push(T.bumpMapUv),S.push(T.normalMapUv),S.push(T.displacementMapUv),S.push(T.emissiveMapUv),S.push(T.metalnessMapUv),S.push(T.roughnessMapUv),S.push(T.anisotropyMapUv),S.push(T.clearcoatMapUv),S.push(T.clearcoatNormalMapUv),S.push(T.clearcoatRoughnessMapUv),S.push(T.iridescenceMapUv),S.push(T.iridescenceThicknessMapUv),S.push(T.sheenColorMapUv),S.push(T.sheenRoughnessMapUv),S.push(T.specularMapUv),S.push(T.specularColorMapUv),S.push(T.specularIntensityMapUv),S.push(T.transmissionMapUv),S.push(T.thicknessMapUv),S.push(T.combine),S.push(T.fogExp2),S.push(T.sizeAttenuation),S.push(T.morphTargetsCount),S.push(T.morphAttributeCount),S.push(T.numSunLights),S.push(T.numDirLights),S.push(T.numPointLights),S.push(T.numSpotLights),S.push(T.numSpotLightMaps),S.push(T.numHemiLights),S.push(T.numRectAreaLights),S.push(T.numSunLightShadows),S.push(T.numDirLightShadows),S.push(T.numPointLightShadows),S.push(T.numSpotLightShadows),S.push(T.numSpotLightShadowsWithMaps),S.push(T.numLightProbes),S.push(T.shadowMapType),S.push(T.toneMapping),S.push(T.numClippingPlanes),S.push(T.numClipIntersection),S.push(T.depthPacking)}function M(S,T){s.disableAll(),T.instancing&&s.enable(0),T.instancingColor&&s.enable(1),T.instancingMorph&&s.enable(2),T.matcap&&s.enable(3),T.envMap&&s.enable(4),T.normalMapObjectSpace&&s.enable(5),T.normalMapTangentSpace&&s.enable(6),T.clearcoat&&s.enable(7),T.iridescence&&s.enable(8),T.alphaTest&&s.enable(9),T.vertexColors&&s.enable(10),T.vertexAlphas&&s.enable(11),T.vertexUv1s&&s.enable(12),T.vertexUv2s&&s.enable(13),T.vertexUv3s&&s.enable(14),T.vertexTangents&&s.enable(15),T.anisotropy&&s.enable(16),T.alphaHash&&s.enable(17),T.batching&&s.enable(18),T.dispersion&&s.enable(19),T.retroreflection&&s.enable(24),T.batchingColor&&s.enable(20),T.gradientMap&&s.enable(21),T.packedNormalMap&&s.enable(22),T.vertexNormals&&s.enable(23),S.push(s.mask),s.disableAll(),T.fog&&s.enable(0),T.useFog&&s.enable(1),T.flatShading&&s.enable(2),T.logarithmicDepthBuffer&&s.enable(3),T.reversedDepthBuffer&&s.enable(4),T.skinning&&s.enable(5),T.morphTargets&&s.enable(6),T.morphNormals&&s.enable(7),T.morphColors&&s.enable(8),T.premultipliedAlpha&&s.enable(9),T.shadowMapEnabled&&s.enable(10),T.doubleSided&&s.enable(11),T.flipSided&&s.enable(12),T.useDepthPacking&&s.enable(13),T.dithering&&s.enable(14),T.transmission&&s.enable(15),T.sheen&&s.enable(16),T.opaque&&s.enable(17),T.pointsUvs&&s.enable(18),T.decodeVideoTexture&&s.enable(19),T.decodeVideoTextureEmissive&&s.enable(20),T.alphaToCoverage&&s.enable(21),T.numLightProbeGrids>0&&s.enable(22),T.hasPositionAttribute&&s.enable(23),S.push(s.mask)}function E(S){const T=p[S.type];let I;if(T){const C=Un[T];I=Tp.clone(C.uniforms)}else I=S.uniforms;return I}function b(S,T){let I=u.get(T);return I!==void 0?++I.usedTimes:(I=new e_(n,T,S,r),l.push(I),u.set(T,I)),I}function R(S){if(--S.usedTimes===0){const T=l.indexOf(S);l[T]=l[l.length-1],l.pop(),u.delete(S.cacheKey),S.destroy()}}function w(S){o.remove(S)}function P(){o.dispose()}return{getParameters:x,getProgramCacheKey:g,getUniforms:E,acquireProgram:b,releaseProgram:R,releaseShaderCache:w,programs:l,dispose:P}}function s_(){let n=new WeakMap;function e(s){return n.has(s)}function t(s){let o=n.get(s);return o===void 0&&(o={},n.set(s,o)),o}function i(s){n.delete(s)}function r(s,o,c){n.get(s)[o]=c}function a(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:a}}function o_(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function lc(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function cc(){const n=[];let e=0;const t=[],i=[],r=[];function a(){e=0,t.length=0,i.length=0,r.length=0}function s(h){let p=0;return h.isInstancedMesh&&(p+=2),h.isSkinnedMesh&&(p+=1),p}function o(h,p,_,x,g,m){let M=n[e];return M===void 0?(M={id:h.id,object:h,geometry:p,material:_,materialVariant:s(h),groupOrder:x,renderOrder:h.renderOrder,z:g,group:m},n[e]=M):(M.id=h.id,M.object=h,M.geometry=p,M.material=_,M.materialVariant=s(h),M.groupOrder=x,M.renderOrder=h.renderOrder,M.z=g,M.group=m),e++,M}function c(h,p,_,x,g,m,M){M.reversedDepth===!0&&(g=-g);const E=o(h,p,_,x,g,m);_.transmission>0?i.push(E):_.transparent===!0?r.push(E):t.push(E)}function l(h,p,_,x,g,m){const M=o(h,p,_,x,g,m);_.transmission>0?i.unshift(M):_.transparent===!0?r.unshift(M):t.unshift(M)}function u(h,p){t.length>1&&t.sort(h||o_),i.length>1&&i.sort(p||lc),r.length>1&&r.sort(p||lc)}function d(){for(let h=e,p=n.length;h<p;h++){const _=n[h];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:t,transmissive:i,transparent:r,init:a,push:c,unshift:l,finish:d,sort:u}}function l_(){let n=new WeakMap;function e(i,r){const a=n.get(i);let s;return a===void 0?(s=new cc,n.set(i,[s])):r>=a.length?(s=new cc,a.push(s)):s=a[r],s}function t(){n=new WeakMap}return{get:e,dispose:t}}function c_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new X,color:new ot};break;case"SpotLight":t={position:new X,direction:new X,color:new ot,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new X,color:new ot,distance:0,decay:0};break;case"HemisphereLight":t={direction:new X,skyColor:new ot,groundColor:new ot};break;case"RectAreaLight":t={color:new ot,position:new X,halfWidth:new X,halfHeight:new X};break}return n[e.id]=t,t}}}function u_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ve};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ve};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ve,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let h_=0;function d_(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function f_(n){const e=new c_,t=u_(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new X);const r=new X,a=new Pt,s=new Pt;function o(l){let u=0,d=0,h=0;for(let O=0;O<9;O++)i.probe[O].set(0,0,0);let p=0,_=0,x=0,g=0,m=0,M=0,E=0,b=0,R=0,w=0,P=0,S=0,T=0,I=0;l.sort(d_);for(let O=0,F=l.length;O<F;O++){const D=l[O],B=D.color,W=D.intensity,$=D.distance;let ae=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===zi?ae=D.shadow.map.texture:ae=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)u+=B.r*W,d+=B.g*W,h+=B.b*W;else if(D.isLightProbe){for(let q=0;q<9;q++)i.probe[q].addScaledVector(D.sh.coefficients[q],W);I++}else if(D.isSunLight){const q=e.get(D);if(q.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const ee=D.shadow,N=t.get(D);N.shadowIntensity=ee.intensity,N.shadowBias=ee.bias,N.shadowNormalBias=ee.normalBias,N.shadowRadius=ee.radius,N.shadowMapSize.copy(ee.mapSize).multiply(ee.getFrameExtents()),i.sunShadow[_]=N,i.sunShadowMap[_]=ae;const re=ee.getViewportCount();for(let ce=0;ce<re;ce++)i.sunShadowMatrix[x+ce]=ee.getMatrix(ce),i.sunShadowCascade[x+ce]=ee._cascadeData[ce];x+=re,_++}i.sun[p]=q,p++}else if(D.isDirectionalLight){const q=e.get(D);if(q.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const ee=D.shadow,N=t.get(D);N.shadowIntensity=ee.intensity,N.shadowBias=ee.bias,N.shadowNormalBias=ee.normalBias,N.shadowRadius=ee.radius,N.shadowMapSize=ee.mapSize,i.directionalShadow[g]=N,i.directionalShadowMap[g]=ae,i.directionalShadowMatrix[g]=D.shadow.matrix,R++}i.directional[g]=q,g++}else if(D.isSpotLight){const q=e.get(D);q.position.setFromMatrixPosition(D.matrixWorld),q.color.copy(B).multiplyScalar(W),q.distance=$,q.coneCos=Math.cos(D.angle),q.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),q.decay=D.decay,i.spot[M]=q;const ee=D.shadow;if(D.map&&(i.spotLightMap[S]=D.map,S++,ee.updateMatrices(D),D.castShadow&&T++),i.spotLightMatrix[M]=ee.matrix,D.castShadow){const N=t.get(D);N.shadowIntensity=ee.intensity,N.shadowBias=ee.bias,N.shadowNormalBias=ee.normalBias,N.shadowRadius=ee.radius,N.shadowMapSize=ee.mapSize,i.spotShadow[M]=N,i.spotShadowMap[M]=ae,P++}M++}else if(D.isRectAreaLight){const q=e.get(D);q.color.copy(B).multiplyScalar(W),q.halfWidth.set(D.width*.5,0,0),q.halfHeight.set(0,D.height*.5,0),i.rectArea[E]=q,E++}else if(D.isPointLight){const q=e.get(D);if(q.color.copy(D.color).multiplyScalar(D.intensity),q.distance=D.distance,q.decay=D.decay,D.castShadow){const ee=D.shadow,N=t.get(D);N.shadowIntensity=ee.intensity,N.shadowBias=ee.bias,N.shadowNormalBias=ee.normalBias,N.shadowRadius=ee.radius,N.shadowMapSize=ee.mapSize,N.shadowCameraNear=ee.camera.near,N.shadowCameraFar=ee.camera.far,i.pointShadow[m]=N,i.pointShadowMap[m]=ae,i.pointShadowMatrix[m]=D.shadow.matrix,w++}i.point[m]=q,m++}else if(D.isHemisphereLight){const q=e.get(D);q.skyColor.copy(D.color).multiplyScalar(W),q.groundColor.copy(D.groundColor).multiplyScalar(W),i.hemi[b]=q,b++}}E>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=_e.LTC_FLOAT_1,i.rectAreaLTC2=_e.LTC_FLOAT_2):(i.rectAreaLTC1=_e.LTC_HALF_1,i.rectAreaLTC2=_e.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=h;const C=i.hash;(C.sunLength!==p||C.directionalLength!==g||C.pointLength!==m||C.spotLength!==M||C.rectAreaLength!==E||C.hemiLength!==b||C.numSunShadows!==_||C.numDirectionalShadows!==R||C.numPointShadows!==w||C.numSpotShadows!==P||C.numSpotMaps!==S||C.numLightProbes!==I)&&(i.sun.length=p,i.directional.length=g,i.spot.length=M,i.rectArea.length=E,i.point.length=m,i.hemi.length=b,i.sunShadow.length=_,i.sunShadowMap.length=_,i.sunShadowMatrix.length=x,i.sunShadowCascade.length=x,i.directionalShadow.length=R,i.directionalShadowMap.length=R,i.directionalShadowMatrix.length=R,i.pointShadow.length=w,i.pointShadowMap.length=w,i.pointShadowMatrix.length=w,i.spotShadow.length=P,i.spotShadowMap.length=P,i.spotLightMatrix.length=P+S-T,i.spotLightMap.length=S,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=I,C.sunLength=p,C.directionalLength=g,C.pointLength=m,C.spotLength=M,C.rectAreaLength=E,C.hemiLength=b,C.numSunShadows=_,C.numDirectionalShadows=R,C.numPointShadows=w,C.numSpotShadows=P,C.numSpotMaps=S,C.numLightProbes=I,i.version=h_++)}function c(l,u){let d=0,h=0,p=0,_=0,x=0,g=0;const m=u.matrixWorldInverse;for(let M=0,E=l.length;M<E;M++){const b=l[M];if(b.isSunLight){const R=i.sun[d];R.direction.setFromMatrixPosition(b.matrixWorld),R.direction.transformDirection(m),d++}else if(b.isDirectionalLight){const R=i.directional[h];R.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(m),h++}else if(b.isSpotLight){const R=i.spot[_];R.position.setFromMatrixPosition(b.matrixWorld),R.position.applyMatrix4(m),R.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(m),_++}else if(b.isRectAreaLight){const R=i.rectArea[x];R.position.setFromMatrixPosition(b.matrixWorld),R.position.applyMatrix4(m),s.identity(),a.copy(b.matrixWorld),a.premultiply(m),s.extractRotation(a),R.halfWidth.set(b.width*.5,0,0),R.halfHeight.set(0,b.height*.5,0),R.halfWidth.applyMatrix4(s),R.halfHeight.applyMatrix4(s),x++}else if(b.isPointLight){const R=i.point[p];R.position.setFromMatrixPosition(b.matrixWorld),R.position.applyMatrix4(m),p++}else if(b.isHemisphereLight){const R=i.hemi[g];R.direction.setFromMatrixPosition(b.matrixWorld),R.direction.transformDirection(m),g++}}}return{setup:o,setupView:c,state:i}}function uc(n){const e=new f_(n),t=[],i=[],r=[];function a(h){d.camera=h,t.length=0,i.length=0,r.length=0}function s(h){t.push(h)}function o(h){i.push(h)}function c(h){r.push(h)}function l(){e.setup(t)}function u(h){e.setupView(t,h)}const d={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:s,pushShadow:o,pushLightProbeGrid:c}}function p_(n){let e=new WeakMap;function t(r,a=0){const s=e.get(r);let o;return s===void 0?(o=new uc(n),e.set(r,[o])):a>=s.length?(o=new uc(n),s.push(o)):o=s[a],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const m_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,g_=`uniform sampler2D shadow_pass;
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
}`,__=[new X(1,0,0),new X(-1,0,0),new X(0,1,0),new X(0,-1,0),new X(0,0,1),new X(0,0,-1)],x_=[new X(0,-1,0),new X(0,-1,0),new X(0,0,1),new X(0,0,-1),new X(0,-1,0),new X(0,-1,0)],hc=new Pt,Pr=new X,Us=new X;function v_(n,e,t){let i=new $o;const r=new Ve,a=new Ve,s=new Tt,o=new Pp,c=new Dp,l={},u=t.maxTextureSize,d={[Oi]:sn,[sn]:Oi,[jn]:jn},h=new $t({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ve},radius:{value:4}},vertexShader:m_,fragmentShader:g_}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const _=new Vn;_.setAttribute("position",new zn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new en(_,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ca;let m=this.type;this.render=function(w,P,S){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||w.length===0)return;this.type===vf&&(Ge("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ca);const T=n.getRenderTarget(),I=n.getActiveCubeFace(),C=n.getActiveMipmapLevel(),O=n.state;O.setBlending(ii),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const F=m!==this.type;F&&P.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach(B=>B.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,B=w.length;D<B;D++){const W=w[D],$=W.shadow;if($===void 0){Ge("WebGLShadowMap:",W,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;r.copy($.mapSize);const ae=$.getFrameExtents();r.multiply(ae),a.copy($.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(a.x=Math.floor(u/ae.x),r.x=a.x*ae.x,$.mapSize.x=a.x),r.y>u&&(a.y=Math.floor(u/ae.y),r.y=a.y*ae.y,$.mapSize.y=a.y));const q=n.state.buffers.depth.getReversed();if($.camera._reversedDepth=q,$.map===null||F===!0){if($.map!==null&&($.map.depthTexture!==null&&($.map.depthTexture.dispose(),$.map.depthTexture=null),$.map.dispose()),this.type===Ir){if(W.isPointLight){Ge("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}$.map=new vn(r.x,r.y,{format:zi,type:Hn,minFilter:It,magFilter:It,generateMipmaps:!1}),$.map.texture.name=W.name+".shadowMap",$.map.depthTexture=new Vr(r.x,r.y,Fn),$.map.depthTexture.name=W.name+".shadowMapDepth",$.map.depthTexture.format=oi,$.map.depthTexture.compareFunction=null,$.map.depthTexture.minFilter=Ot,$.map.depthTexture.magFilter=Ot}else W.isPointLight?($.map=new _u(r.x),$.map.depthTexture=new wp(r.x,Gn)):($.map=new vn(r.x,r.y),$.map.depthTexture=new Vr(r.x,r.y,Gn)),$.map.depthTexture.name=W.name+".shadowMap",$.map.depthTexture.format=oi,this.type===Ca?($.map.depthTexture.compareFunction=q?Ko:Yo,$.map.depthTexture.minFilter=It,$.map.depthTexture.magFilter=It):($.map.depthTexture.compareFunction=null,$.map.depthTexture.minFilter=Ot,$.map.depthTexture.magFilter=Ot);$.camera.updateProjectionMatrix()}$.map.isWebGLCubeRenderTarget!==!0&&($.map.width!==r.x||$.map.height!==r.y)&&$.map.setSize(r.x,r.y);const ee=$.map.isWebGLCubeRenderTarget?6:$.getViewportCount();W.isPointLight!==!0&&$.updateMatrices(W,S);for(let N=0;N<ee;N++){const re=$.getCamera(N);if(W.isPointLight){const ce=$.camera,Re=$.matrix,Oe=W.distance||ce.far;Oe!==ce.far&&(ce.far=Oe,ce.updateProjectionMatrix()),Pr.setFromMatrixPosition(W.matrixWorld),ce.position.copy(Pr),Us.copy(ce.position),Us.add(__[N]),ce.up.copy(x_[N]),ce.lookAt(Us),ce.updateMatrixWorld(),Re.makeTranslation(-Pr.x,-Pr.y,-Pr.z),hc.multiplyMatrices(ce.projectionMatrix,ce.matrixWorldInverse),$._frustum.setFromProjectionMatrix(hc,ce.coordinateSystem,ce.reversedDepth)}if($.map.isWebGLCubeRenderTarget)n.setRenderTarget($.map,N),n.clear();else{N===0&&(n.setRenderTarget($.map),n.clear());const ce=$.getViewport(N);s.set(a.x*ce.x,a.y*ce.y,a.x*ce.z,a.y*ce.w),O.viewport(s)}i=$.getFrustum(N),b(P,S,re,W,this.type)}$.isPointLightShadow!==!0&&this.type===Ir&&M($,S),$.needsUpdate=!1}m=this.type,g.needsUpdate=!1,n.setRenderTarget(T,I,C)};function M(w,P){const S=e.update(x);h.defines.VSM_SAMPLES!==w.blurSamples&&(h.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null?w.mapPass=new vn(r.x,r.y,{format:zi,type:Hn}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),h.uniforms.shadow_pass.value=w.map.depthTexture,h.uniforms.resolution.value.set(w.map.width,w.map.height),h.uniforms.radius.value=w.radius,n.setRenderTarget(w.mapPass),n.clear(),n.renderBufferDirect(P,null,S,h,x,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value.set(w.map.width,w.map.height),p.uniforms.radius.value=w.radius,n.setRenderTarget(w.map),n.clear(),n.renderBufferDirect(P,null,S,p,x,null)}function E(w,P,S,T){let I=null;const C=S.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(C!==void 0)I=C;else if(I=S.isPointLight===!0?c:o,n.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const O=I.uuid,F=P.uuid;let D=l[O];D===void 0&&(D={},l[O]=D);let B=D[F];B===void 0&&(B=I.clone(),D[F]=B,P.addEventListener("dispose",R)),I=B}if(I.visible=P.visible,I.wireframe=P.wireframe,T===Ir?I.side=P.shadowSide!==null?P.shadowSide:P.side:I.side=P.shadowSide!==null?P.shadowSide:d[P.side],I.alphaMap=P.alphaMap,I.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,I.map=P.map,I.clipShadows=P.clipShadows,I.clippingPlanes=P.clippingPlanes,I.clipIntersection=P.clipIntersection,I.displacementMap=P.displacementMap,I.displacementScale=P.displacementScale,I.displacementBias=P.displacementBias,I.wireframeLinewidth=P.wireframeLinewidth,I.linewidth=P.linewidth,S.isPointLight===!0&&I.isMeshDistanceMaterial===!0){const O=n.properties.get(I);O.light=S}return I}function b(w,P,S,T,I){if(w.visible===!1)return;if(w.layers.test(P.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&I===Ir)&&(!w.frustumCulled||w.intersectsFrustum(i))){w.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,w.matrixWorld);const F=e.update(w),D=w.material;if(Array.isArray(D)){const B=F.groups;for(let W=0,$=B.length;W<$;W++){const ae=B[W],q=D[ae.materialIndex];if(q&&q.visible){const ee=E(w,q,T,I);w.onBeforeShadow(n,w,P,S,F,ee,ae),n.renderBufferDirect(S,null,F,ee,w,ae),w.onAfterShadow(n,w,P,S,F,ee,ae)}}}else if(D.visible){const B=E(w,D,T,I);w.onBeforeShadow(n,w,P,S,F,B,null),n.renderBufferDirect(S,null,F,B,w,null),w.onAfterShadow(n,w,P,S,F,B,null)}}const O=w.children;for(let F=0,D=O.length;F<D;F++)b(O[F],P,S,T,I)}function R(w){w.target.removeEventListener("dispose",R);for(const S in l){const T=l[S],I=w.target.uuid;I in T&&(T[I].dispose(),delete T[I])}}}function M_(n,e){function t(){let G=!1;const pe=new Tt;let ne=null;const me=new Tt(0,0,0,0);return{setMask:function(Se){ne!==Se&&!G&&(n.colorMask(Se,Se,Se,Se),ne=Se)},setLocked:function(Se){G=Se},setClear:function(Se,oe,Ne,Pe,St){St===!0&&(Se*=Pe,oe*=Pe,Ne*=Pe),pe.set(Se,oe,Ne,Pe),me.equals(pe)===!1&&(n.clearColor(Se,oe,Ne,Pe),me.copy(pe))},reset:function(){G=!1,ne=null,me.set(-1,0,0,0)}}}function i(){let G=!1,pe=!1,ne=null,me=null,Se=null;return{setReversed:function(oe){if(pe!==oe){const Ne=e.get("EXT_clip_control");oe?Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.ZERO_TO_ONE_EXT):Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.NEGATIVE_ONE_TO_ONE_EXT),pe=oe;const Pe=Se;Se=null,this.setClear(Pe)}},getReversed:function(){return pe},setTest:function(oe){oe?ie(n.DEPTH_TEST):H(n.DEPTH_TEST)},setMask:function(oe){ne!==oe&&!G&&(n.depthMask(oe),ne=oe)},setFunc:function(oe){if(pe&&(oe=ep[oe]),me!==oe){switch(oe){case Bs:n.depthFunc(n.NEVER);break;case zs:n.depthFunc(n.ALWAYS);break;case ks:n.depthFunc(n.LESS);break;case zr:n.depthFunc(n.LEQUAL);break;case Gs:n.depthFunc(n.EQUAL);break;case Hs:n.depthFunc(n.GEQUAL);break;case Vs:n.depthFunc(n.GREATER);break;case Ws:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}me=oe}},setLocked:function(oe){G=oe},setClear:function(oe){Se!==oe&&(Se=oe,pe&&(oe=1-oe),n.clearDepth(oe))},reset:function(){G=!1,ne=null,me=null,Se=null,pe=!1}}}function r(){let G=!1,pe=null,ne=null,me=null,Se=null,oe=null,Ne=null,Pe=null,St=null;return{setTest:function(lt){G||(lt?ie(n.STENCIL_TEST):H(n.STENCIL_TEST))},setMask:function(lt){pe!==lt&&!G&&(n.stencilMask(lt),pe=lt)},setFunc:function(lt,Sn,Cn){(ne!==lt||me!==Sn||Se!==Cn)&&(n.stencilFunc(lt,Sn,Cn),ne=lt,me=Sn,Se=Cn)},setOp:function(lt,Sn,Cn){(oe!==lt||Ne!==Sn||Pe!==Cn)&&(n.stencilOp(lt,Sn,Cn),oe=lt,Ne=Sn,Pe=Cn)},setLocked:function(lt){G=lt},setClear:function(lt){St!==lt&&(n.clearStencil(lt),St=lt)},reset:function(){G=!1,pe=null,ne=null,me=null,Se=null,oe=null,Ne=null,Pe=null,St=null}}}const a=new t,s=new i,o=new r,c=new WeakMap,l=new WeakMap;let u={},d={},h={},p=new WeakMap,_=[],x=null,g=!1,m=null,M=null,E=null,b=null,R=null,w=null,P=null,S=new ot(0,0,0),T=0,I=!1,C=null,O=null,F=null,D=null,B=null;const W=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let $=!1,ae=0;const q=n.getParameter(n.VERSION);q.indexOf("WebGL")!==-1?(ae=parseFloat(/^WebGL (\d)/.exec(q)[1]),$=ae>=1):q.indexOf("OpenGL ES")!==-1&&(ae=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),$=ae>=2);let ee=null,N={};const re=n.getParameter(n.SCISSOR_BOX),ce=n.getParameter(n.VIEWPORT),Re=new Tt().fromArray(re),Oe=new Tt().fromArray(ce);function ke(G,pe,ne,me){const Se=new Uint8Array(4),oe=n.createTexture();n.bindTexture(G,oe),n.texParameteri(G,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(G,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ne=0;Ne<ne;Ne++)G===n.TEXTURE_3D||G===n.TEXTURE_2D_ARRAY?n.texImage3D(pe,0,n.RGBA,1,1,me,0,n.RGBA,n.UNSIGNED_BYTE,Se):n.texImage2D(pe+Ne,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Se);return oe}const j={};j[n.TEXTURE_2D]=ke(n.TEXTURE_2D,n.TEXTURE_2D,1),j[n.TEXTURE_CUBE_MAP]=ke(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[n.TEXTURE_2D_ARRAY]=ke(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),j[n.TEXTURE_3D]=ke(n.TEXTURE_3D,n.TEXTURE_3D,1,1),a.setClear(0,0,0,1),s.setClear(1),o.setClear(0),ie(n.DEPTH_TEST),s.setFunc(zr),We(!1),xt(xl),ie(n.CULL_FACE),Ue(ii);function ie(G){u[G]!==!0&&(n.enable(G),u[G]=!0)}function H(G){u[G]!==!1&&(n.disable(G),u[G]=!1)}function ue(G,pe){return h[G]!==pe?(n.bindFramebuffer(G,pe),h[G]=pe,G===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=pe),G===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=pe),!0):!1}function se(G,pe){let ne=_,me=!1;if(G){ne=p.get(pe),ne===void 0&&(ne=[],p.set(pe,ne));const Se=G.textures;if(ne.length!==Se.length||ne[0]!==n.COLOR_ATTACHMENT0){for(let oe=0,Ne=Se.length;oe<Ne;oe++)ne[oe]=n.COLOR_ATTACHMENT0+oe;ne.length=Se.length,me=!0}}else ne[0]!==n.BACK&&(ne[0]=n.BACK,me=!0);me&&n.drawBuffers(ne)}function ye(G){return x!==G?(n.useProgram(G),x=G,!0):!1}const qe={[ar]:n.FUNC_ADD,[Sf]:n.FUNC_SUBTRACT,[bf]:n.FUNC_REVERSE_SUBTRACT};qe[Ef]=n.MIN,qe[yf]=n.MAX;const Ce={[wf]:n.ZERO,[Af]:n.ONE,[Tf]:n.SRC_COLOR,[Fc]:n.SRC_ALPHA,[If]:n.SRC_ALPHA_SATURATE,[Pf]:n.DST_COLOR,[Cf]:n.DST_ALPHA,[Rf]:n.ONE_MINUS_SRC_COLOR,[Oc]:n.ONE_MINUS_SRC_ALPHA,[Df]:n.ONE_MINUS_DST_COLOR,[Lf]:n.ONE_MINUS_DST_ALPHA,[Nf]:n.CONSTANT_COLOR,[Uf]:n.ONE_MINUS_CONSTANT_COLOR,[Ff]:n.CONSTANT_ALPHA,[Of]:n.ONE_MINUS_CONSTANT_ALPHA};function Ue(G,pe,ne,me,Se,oe,Ne,Pe,St,lt){if(G===ii){g===!0&&(H(n.BLEND),g=!1);return}if(g===!1&&(ie(n.BLEND),g=!0),G!==Mf){if(G!==m||lt!==I){if((M!==ar||R!==ar)&&(n.blendEquation(n.FUNC_ADD),M=ar,R=ar),lt)switch(G){case Or:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case vl:n.blendFunc(n.ONE,n.ONE);break;case Ml:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Sl:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:rt("WebGLState: Invalid blending: ",G);break}else switch(G){case Or:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case vl:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Ml:rt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Sl:rt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:rt("WebGLState: Invalid blending: ",G);break}E=null,b=null,w=null,P=null,S.set(0,0,0),T=0,m=G,I=lt}return}Se=Se||pe,oe=oe||ne,Ne=Ne||me,(pe!==M||Se!==R)&&(n.blendEquationSeparate(qe[pe],qe[Se]),M=pe,R=Se),(ne!==E||me!==b||oe!==w||Ne!==P)&&(n.blendFuncSeparate(Ce[ne],Ce[me],Ce[oe],Ce[Ne]),E=ne,b=me,w=oe,P=Ne),(Pe.equals(S)===!1||St!==T)&&(n.blendColor(Pe.r,Pe.g,Pe.b,St),S.copy(Pe),T=St),m=G,I=!1}function Xe(G,pe){G.side===jn?H(n.CULL_FACE):ie(n.CULL_FACE);let ne=G.side===sn;pe&&(ne=!ne),We(ne),G.blending===Or&&G.transparent===!1?Ue(ii):Ue(G.blending,G.blendEquation,G.blendSrc,G.blendDst,G.blendEquationAlpha,G.blendSrcAlpha,G.blendDstAlpha,G.blendColor,G.blendAlpha,G.premultipliedAlpha),s.setFunc(G.depthFunc),s.setTest(G.depthTest),s.setMask(G.depthWrite),a.setMask(G.colorWrite);const me=G.stencilWrite;o.setTest(me),me&&(o.setMask(G.stencilWriteMask),o.setFunc(G.stencilFunc,G.stencilRef,G.stencilFuncMask),o.setOp(G.stencilFail,G.stencilZFail,G.stencilZPass)),kt(G.polygonOffset,G.polygonOffsetFactor,G.polygonOffsetUnits),G.alphaToCoverage===!0?ie(n.SAMPLE_ALPHA_TO_COVERAGE):H(n.SAMPLE_ALPHA_TO_COVERAGE)}function We(G){C!==G&&(G?n.frontFace(n.CW):n.frontFace(n.CCW),C=G)}function xt(G){G!==_f?(ie(n.CULL_FACE),G!==O&&(G===xl?n.cullFace(n.BACK):G===xf?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):H(n.CULL_FACE),O=G}function Rt(G){G!==F&&($&&n.lineWidth(G),F=G)}function kt(G,pe,ne){G?(ie(n.POLYGON_OFFSET_FILL),(D!==pe||B!==ne)&&(D=pe,B=ne,s.getReversed()&&(pe=-pe),n.polygonOffset(pe,ne))):H(n.POLYGON_OFFSET_FILL)}function mt(G){G?ie(n.SCISSOR_TEST):H(n.SCISSOR_TEST)}function vt(G){G===void 0&&(G=n.TEXTURE0+W-1),ee!==G&&(n.activeTexture(G),ee=G)}function k(G,pe,ne){ne===void 0&&(ee===null?ne=n.TEXTURE0+W-1:ne=ee);let me=N[ne];me===void 0&&(me={type:void 0,texture:void 0},N[ne]=me),(me.type!==G||me.texture!==pe)&&(ee!==ne&&(n.activeTexture(ne),ee=ne),n.bindTexture(G,pe||j[G]),me.type=G,me.texture=pe)}function Ze(){const G=N[ee];G!==void 0&&G.type!==void 0&&(n.bindTexture(G.type,null),G.type=void 0,G.texture=void 0)}function ze(){try{n.compressedTexImage2D(...arguments)}catch(G){rt("WebGLState:",G)}}function L(){try{n.compressedTexImage3D(...arguments)}catch(G){rt("WebGLState:",G)}}function v(){try{n.texSubImage2D(...arguments)}catch(G){rt("WebGLState:",G)}}function U(){try{n.texSubImage3D(...arguments)}catch(G){rt("WebGLState:",G)}}function V(){try{n.compressedTexSubImage2D(...arguments)}catch(G){rt("WebGLState:",G)}}function Z(){try{n.compressedTexSubImage3D(...arguments)}catch(G){rt("WebGLState:",G)}}function le(){try{n.texStorage2D(...arguments)}catch(G){rt("WebGLState:",G)}}function he(){try{n.texStorage3D(...arguments)}catch(G){rt("WebGLState:",G)}}function Q(){try{n.texImage2D(...arguments)}catch(G){rt("WebGLState:",G)}}function te(){try{n.texImage3D(...arguments)}catch(G){rt("WebGLState:",G)}}function de(G){return d[G]!==void 0?d[G]:n.getParameter(G)}function Le(G,pe){d[G]!==pe&&(n.pixelStorei(G,pe),d[G]=pe)}function ge(G){Re.equals(G)===!1&&(n.scissor(G.x,G.y,G.z,G.w),Re.copy(G))}function fe(G){Oe.equals(G)===!1&&(n.viewport(G.x,G.y,G.z,G.w),Oe.copy(G))}function Ie(G,pe){let ne=l.get(pe);ne===void 0&&(ne=new WeakMap,l.set(pe,ne));let me=ne.get(G);me===void 0&&(me=n.getUniformBlockIndex(pe,G.name),ne.set(G,me))}function Be(G,pe){const me=l.get(pe).get(G);c.get(pe)!==me&&(n.uniformBlockBinding(pe,me,G.__bindingPointIndex),c.set(pe,me))}function Ye(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),s.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},d={},ee=null,N={},h={},p=new WeakMap,_=[],x=null,g=!1,m=null,M=null,E=null,b=null,R=null,w=null,P=null,S=new ot(0,0,0),T=0,I=!1,C=null,O=null,F=null,D=null,B=null,Re.set(0,0,n.canvas.width,n.canvas.height),Oe.set(0,0,n.canvas.width,n.canvas.height),a.reset(),s.reset(),o.reset()}return{buffers:{color:a,depth:s,stencil:o},enable:ie,disable:H,bindFramebuffer:ue,drawBuffers:se,useProgram:ye,setBlending:Ue,setMaterial:Xe,setFlipSided:We,setCullFace:xt,setLineWidth:Rt,setPolygonOffset:kt,setScissorTest:mt,activeTexture:vt,bindTexture:k,unbindTexture:Ze,compressedTexImage2D:ze,compressedTexImage3D:L,texImage2D:Q,texImage3D:te,pixelStorei:Le,getParameter:de,updateUBOMapping:Ie,uniformBlockBinding:Be,texStorage2D:le,texStorage3D:he,texSubImage2D:v,texSubImage3D:U,compressedTexSubImage2D:V,compressedTexSubImage3D:Z,scissor:ge,viewport:fe,reset:Ye}}function S_(n,e,t,i,r,a,s){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ve,u=new WeakMap,d=new Set;let h;const p=new WeakMap;let _=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(L,v){return _?new OffscreenCanvas(L,v):ka("canvas")}function g(L,v,U){let V=1;const Z=ze(L);if((Z.width>U||Z.height>U)&&(V=U/Math.max(Z.width,Z.height)),V<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){const le=Math.floor(V*Z.width),he=Math.floor(V*Z.height);h===void 0&&(h=x(le,he));const Q=v?x(le,he):h;return Q.width=le,Q.height=he,Q.getContext("2d").drawImage(L,0,0,le,he),Ge("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+le+"x"+he+")."),Q}else return"data"in L&&Ge("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),L;return L}function m(L){return L.generateMipmaps}function M(L){n.generateMipmap(L)}function E(L){return L.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?n.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function b(L,v,U,V,Z,le=!1){if(L!==null){if(n[L]!==void 0)return n[L];Ge("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let he;V&&(he=e.get("EXT_texture_norm16"),he||Ge("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=v;if(v===n.RED&&(U===n.FLOAT&&(Q=n.R32F),U===n.HALF_FLOAT&&(Q=n.R16F),U===n.UNSIGNED_BYTE&&(Q=n.R8),U===n.UNSIGNED_SHORT&&he&&(Q=he.R16_EXT),U===n.SHORT&&he&&(Q=he.R16_SNORM_EXT)),v===n.RED_INTEGER&&(U===n.UNSIGNED_BYTE&&(Q=n.R8UI),U===n.UNSIGNED_SHORT&&(Q=n.R16UI),U===n.UNSIGNED_INT&&(Q=n.R32UI),U===n.BYTE&&(Q=n.R8I),U===n.SHORT&&(Q=n.R16I),U===n.INT&&(Q=n.R32I)),v===n.RG&&(U===n.FLOAT&&(Q=n.RG32F),U===n.HALF_FLOAT&&(Q=n.RG16F),U===n.UNSIGNED_BYTE&&(Q=n.RG8),U===n.UNSIGNED_SHORT&&he&&(Q=he.RG16_EXT),U===n.SHORT&&he&&(Q=he.RG16_SNORM_EXT)),v===n.RG_INTEGER&&(U===n.UNSIGNED_BYTE&&(Q=n.RG8UI),U===n.UNSIGNED_SHORT&&(Q=n.RG16UI),U===n.UNSIGNED_INT&&(Q=n.RG32UI),U===n.BYTE&&(Q=n.RG8I),U===n.SHORT&&(Q=n.RG16I),U===n.INT&&(Q=n.RG32I)),v===n.RGB_INTEGER&&(U===n.UNSIGNED_BYTE&&(Q=n.RGB8UI),U===n.UNSIGNED_SHORT&&(Q=n.RGB16UI),U===n.UNSIGNED_INT&&(Q=n.RGB32UI),U===n.BYTE&&(Q=n.RGB8I),U===n.SHORT&&(Q=n.RGB16I),U===n.INT&&(Q=n.RGB32I)),v===n.RGBA_INTEGER&&(U===n.UNSIGNED_BYTE&&(Q=n.RGBA8UI),U===n.UNSIGNED_SHORT&&(Q=n.RGBA16UI),U===n.UNSIGNED_INT&&(Q=n.RGBA32UI),U===n.BYTE&&(Q=n.RGBA8I),U===n.SHORT&&(Q=n.RGBA16I),U===n.INT&&(Q=n.RGBA32I)),v===n.RGB&&(U===n.UNSIGNED_SHORT&&he&&(Q=he.RGB16_EXT),U===n.SHORT&&he&&(Q=he.RGB16_SNORM_EXT),U===n.UNSIGNED_INT_5_9_9_9_REV&&(Q=n.RGB9_E5),U===n.UNSIGNED_INT_10F_11F_11F_REV&&(Q=n.R11F_G11F_B10F)),v===n.RGBA){const te=le?Ba:et.getTransfer(Z);U===n.FLOAT&&(Q=n.RGBA32F),U===n.HALF_FLOAT&&(Q=n.RGBA16F),U===n.UNSIGNED_BYTE&&(Q=te===pt?n.SRGB8_ALPHA8:n.RGBA8),U===n.UNSIGNED_SHORT&&he&&(Q=he.RGBA16_EXT),U===n.SHORT&&he&&(Q=he.RGBA16_SNORM_EXT),U===n.UNSIGNED_SHORT_4_4_4_4&&(Q=n.RGBA4),U===n.UNSIGNED_SHORT_5_5_5_1&&(Q=n.RGB5_A1)}return(Q===n.R16F||Q===n.R32F||Q===n.RG16F||Q===n.RG32F||Q===n.RGBA16F||Q===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function R(L,v){let U;return L?v===null||v===Gn||v===Gr?U=n.DEPTH24_STENCIL8:v===Fn?U=n.DEPTH32F_STENCIL8:v===kr&&(U=n.DEPTH24_STENCIL8,Ge("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Gn||v===Gr?U=n.DEPTH_COMPONENT24:v===Fn?U=n.DEPTH_COMPONENT32F:v===kr&&(U=n.DEPTH_COMPONENT16),U}function w(L,v){return m(L)===!0||L.isFramebufferTexture&&L.minFilter!==Ot&&L.minFilter!==It?Math.log2(Math.max(v.width,v.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?v.mipmaps.length:1}function P(L){const v=L.target;v.removeEventListener("dispose",P),T(v),v.isVideoTexture&&u.delete(v),v.isHTMLTexture&&d.delete(v)}function S(L){const v=L.target;v.removeEventListener("dispose",S),C(v)}function T(L){const v=i.get(L);if(v.__webglInit===void 0)return;const U=L.source,V=p.get(U);if(V){const Z=V[v.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&I(L),Object.keys(V).length===0&&p.delete(U)}i.remove(L)}function I(L){const v=i.get(L);n.deleteTexture(v.__webglTexture);const U=L.source,V=p.get(U);delete V[v.__cacheKey],s.memory.textures--}function C(L){const v=i.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),i.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(v.__webglFramebuffer[V]))for(let Z=0;Z<v.__webglFramebuffer[V].length;Z++)n.deleteFramebuffer(v.__webglFramebuffer[V][Z]);else n.deleteFramebuffer(v.__webglFramebuffer[V]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[V])}else{if(Array.isArray(v.__webglFramebuffer))for(let V=0;V<v.__webglFramebuffer.length;V++)n.deleteFramebuffer(v.__webglFramebuffer[V]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let V=0;V<v.__webglColorRenderbuffer.length;V++)v.__webglColorRenderbuffer[V]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[V]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const U=L.textures;for(let V=0,Z=U.length;V<Z;V++){const le=i.get(U[V]);le.__webglTexture&&(n.deleteTexture(le.__webglTexture),s.memory.textures--),i.remove(U[V])}i.remove(L)}let O=0;function F(){O=0}function D(){return O}function B(L){O=L}function W(){const L=O;return L>=r.maxTextures&&Ge("WebGLTextures: Trying to use "+(L+1)+" texture units while this GPU supports only "+r.maxTextures),O+=1,L}function $(L){const v=[];return v.push(L.wrapS),v.push(L.wrapT),v.push(L.wrapR||0),v.push(L.magFilter),v.push(L.minFilter),v.push(L.anisotropy),v.push(L.internalFormat),v.push(L.format),v.push(L.type),v.push(L.generateMipmaps),v.push(L.premultiplyAlpha),v.push(L.flipY),v.push(L.unpackAlignment),v.push(L.colorSpace),v.join()}function ae(L,v){const U=i.get(L);if(L.isVideoTexture&&k(L),L.isRenderTargetTexture===!1&&L.isExternalTexture!==!0&&L.version>0&&U.__version!==L.version){const V=L.image;if(V===null)Ge("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)Ge("WebGLRenderer: Texture marked for update but image is incomplete");else{H(U,L,v);return}}else L.isExternalTexture&&(U.__webglTexture=L.sourceTexture?L.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,U.__webglTexture,n.TEXTURE0+v)}function q(L,v){const U=i.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&U.__version!==L.version){H(U,L,v);return}else L.isExternalTexture&&(U.__webglTexture=L.sourceTexture?L.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,U.__webglTexture,n.TEXTURE0+v)}function ee(L,v){const U=i.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&U.__version!==L.version){H(U,L,v);return}t.bindTexture(n.TEXTURE_3D,U.__webglTexture,n.TEXTURE0+v)}function N(L,v){const U=i.get(L);if(L.isCubeDepthTexture!==!0&&L.version>0&&U.__version!==L.version){ue(U,L,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,U.__webglTexture,n.TEXTURE0+v)}const re={[Xs]:n.REPEAT,[ei]:n.CLAMP_TO_EDGE,[Ys]:n.MIRRORED_REPEAT},ce={[Ot]:n.NEAREST,[kf]:n.NEAREST_MIPMAP_NEAREST,[ta]:n.NEAREST_MIPMAP_LINEAR,[It]:n.LINEAR,[ss]:n.LINEAR_MIPMAP_NEAREST,[Pi]:n.LINEAR_MIPMAP_LINEAR},Re={[Wf]:n.NEVER,[Zf]:n.ALWAYS,[Xf]:n.LESS,[Yo]:n.LEQUAL,[Yf]:n.EQUAL,[Ko]:n.GEQUAL,[Kf]:n.GREATER,[qf]:n.NOTEQUAL};function Oe(L,v){if(v.type===Fn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===It||v.magFilter===ss||v.magFilter===ta||v.magFilter===Pi||v.minFilter===It||v.minFilter===ss||v.minFilter===ta||v.minFilter===Pi)&&Ge("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(L,n.TEXTURE_WRAP_S,re[v.wrapS]),n.texParameteri(L,n.TEXTURE_WRAP_T,re[v.wrapT]),(L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY)&&n.texParameteri(L,n.TEXTURE_WRAP_R,re[v.wrapR]),n.texParameteri(L,n.TEXTURE_MAG_FILTER,ce[v.magFilter]),n.texParameteri(L,n.TEXTURE_MIN_FILTER,ce[v.minFilter]),v.compareFunction&&(n.texParameteri(L,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(L,n.TEXTURE_COMPARE_FUNC,Re[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Ot||v.minFilter!==ta&&v.minFilter!==Pi||v.type===Fn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const U=e.get("EXT_texture_filter_anisotropic");n.texParameterf(L,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function ke(L,v){let U=!1;L.__webglInit===void 0&&(L.__webglInit=!0,v.addEventListener("dispose",P));const V=v.source;let Z=p.get(V);Z===void 0&&(Z={},p.set(V,Z));const le=$(v);if(le!==L.__cacheKey){Z[le]===void 0&&(Z[le]={texture:n.createTexture(),usedTimes:0},s.memory.textures++,U=!0),Z[le].usedTimes++;const he=Z[L.__cacheKey];he!==void 0&&(Z[L.__cacheKey].usedTimes--,he.usedTimes===0&&I(v)),L.__cacheKey=le,L.__webglTexture=Z[le].texture}return U}function j(L,v,U){return Math.floor(Math.floor(L/U)/v)}function ie(L,v,U,V){const le=L.updateRanges;if(le.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,v.width,v.height,U,V,v.data);else{le.sort((Le,ge)=>Le.start-ge.start);let he=0;for(let Le=1;Le<le.length;Le++){const ge=le[he],fe=le[Le],Ie=ge.start+ge.count,Be=j(fe.start,v.width,4),Ye=j(ge.start,v.width,4);fe.start<=Ie+1&&Be===Ye&&j(fe.start+fe.count-1,v.width,4)===Be?ge.count=Math.max(ge.count,fe.start+fe.count-ge.start):(++he,le[he]=fe)}le.length=he+1;const Q=t.getParameter(n.UNPACK_ROW_LENGTH),te=t.getParameter(n.UNPACK_SKIP_PIXELS),de=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,v.width);for(let Le=0,ge=le.length;Le<ge;Le++){const fe=le[Le],Ie=Math.floor(fe.start/4),Be=Math.ceil(fe.count/4),Ye=Ie%v.width,G=Math.floor(Ie/v.width),pe=Be,ne=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,Ye),t.pixelStorei(n.UNPACK_SKIP_ROWS,G),t.texSubImage2D(n.TEXTURE_2D,0,Ye,G,pe,ne,U,V,v.data)}L.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,Q),t.pixelStorei(n.UNPACK_SKIP_PIXELS,te),t.pixelStorei(n.UNPACK_SKIP_ROWS,de)}}function H(L,v,U){let V=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(V=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(V=n.TEXTURE_3D);const Z=ke(L,v),le=v.source;t.bindTexture(V,L.__webglTexture,n.TEXTURE0+U);const he=i.get(le);if(le.version!==he.__version||Z===!0){if(t.activeTexture(n.TEXTURE0+U),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){const ne=et.getPrimaries(et.workingColorSpace),me=v.colorSpace===wn?null:et.getPrimaries(v.colorSpace),Se=v.colorSpace===wn||ne===me?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se)}t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment);let te=g(v.image,!1,r.maxTextureSize);te=Ze(v,te);const de=a.convert(v.format,v.colorSpace),Le=a.convert(v.type);let ge=b(v.internalFormat,de,Le,v.normalized,v.colorSpace,v.isVideoTexture);Oe(V,v);let fe;const Ie=v.mipmaps,Be=v.isVideoTexture!==!0,Ye=he.__version===void 0||Z===!0,G=le.dataReady,pe=w(v,te);if(v.isDepthTexture)ge=R(v.format===Di,v.type),Ye&&(Be?t.texStorage2D(n.TEXTURE_2D,1,ge,te.width,te.height):t.texImage2D(n.TEXTURE_2D,0,ge,te.width,te.height,0,de,Le,null));else if(v.isDataTexture)if(Ie.length>0){Be&&Ye&&t.texStorage2D(n.TEXTURE_2D,pe,ge,Ie[0].width,Ie[0].height);for(let ne=0,me=Ie.length;ne<me;ne++)fe=Ie[ne],Be?G&&t.texSubImage2D(n.TEXTURE_2D,ne,0,0,fe.width,fe.height,de,Le,fe.data):t.texImage2D(n.TEXTURE_2D,ne,ge,fe.width,fe.height,0,de,Le,fe.data);v.generateMipmaps=!1}else Be?(Ye&&t.texStorage2D(n.TEXTURE_2D,pe,ge,te.width,te.height),G&&ie(v,te,de,Le)):t.texImage2D(n.TEXTURE_2D,0,ge,te.width,te.height,0,de,Le,te.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Be&&Ye&&t.texStorage3D(n.TEXTURE_2D_ARRAY,pe,ge,Ie[0].width,Ie[0].height,te.depth);for(let ne=0,me=Ie.length;ne<me;ne++)if(fe=Ie[ne],v.format!==xn)if(de!==null)if(Be){if(G)if(v.layerUpdates.size>0){const Se=Vl(fe.width,fe.height,v.format,v.type);for(const oe of v.layerUpdates){const Ne=fe.data.subarray(oe*Se/fe.data.BYTES_PER_ELEMENT,(oe+1)*Se/fe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ne,0,0,oe,fe.width,fe.height,1,de,Ne)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ne,0,0,0,fe.width,fe.height,te.depth,de,fe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ne,ge,fe.width,fe.height,te.depth,0,fe.data,0,0);else Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Be?G&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ne,0,0,0,fe.width,fe.height,te.depth,de,Le,fe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ne,ge,fe.width,fe.height,te.depth,0,de,Le,fe.data);v.layerUpdates.size>0&&v.clearLayerUpdates()}else{Be&&Ye&&t.texStorage2D(n.TEXTURE_2D,pe,ge,Ie[0].width,Ie[0].height);for(let ne=0,me=Ie.length;ne<me;ne++)fe=Ie[ne],v.format!==xn?de!==null?Be?G&&t.compressedTexSubImage2D(n.TEXTURE_2D,ne,0,0,fe.width,fe.height,de,fe.data):t.compressedTexImage2D(n.TEXTURE_2D,ne,ge,fe.width,fe.height,0,fe.data):Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Be?G&&t.texSubImage2D(n.TEXTURE_2D,ne,0,0,fe.width,fe.height,de,Le,fe.data):t.texImage2D(n.TEXTURE_2D,ne,ge,fe.width,fe.height,0,de,Le,fe.data)}else if(v.isDataArrayTexture)if(Be){if(Ye&&t.texStorage3D(n.TEXTURE_2D_ARRAY,pe,ge,te.width,te.height,te.depth),G)if(v.layerUpdates.size>0){const ne=Vl(te.width,te.height,v.format,v.type);for(const me of v.layerUpdates){const Se=te.data.subarray(me*ne/te.data.BYTES_PER_ELEMENT,(me+1)*ne/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,me,te.width,te.height,1,de,Le,Se)}v.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,de,Le,te.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,ge,te.width,te.height,te.depth,0,de,Le,te.data);else if(v.isData3DTexture)Be?(Ye&&t.texStorage3D(n.TEXTURE_3D,pe,ge,te.width,te.height,te.depth),G&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,de,Le,te.data)):t.texImage3D(n.TEXTURE_3D,0,ge,te.width,te.height,te.depth,0,de,Le,te.data);else if(v.isFramebufferTexture){if(Ye)if(Be)t.texStorage2D(n.TEXTURE_2D,pe,ge,te.width,te.height);else{let ne=te.width,me=te.height;for(let Se=0;Se<pe;Se++)t.texImage2D(n.TEXTURE_2D,Se,ge,ne,me,0,de,Le,null),ne>>=1,me>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in n){const ne=n.canvas;if(ne.hasAttribute("layoutsubtree")||ne.setAttribute("layoutsubtree","true"),te.parentNode!==ne){ne.appendChild(te),d.add(v),ne.onpaint=me=>{const Se=me.changedElements;for(const oe of d)Se.includes(oe.image)&&(oe.needsUpdate=!0)},ne.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,te);else{const Se=n.RGBA,oe=n.RGBA,Ne=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Se,oe,Ne,te)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Ie.length>0){if(Be&&Ye){const ne=ze(Ie[0]);t.texStorage2D(n.TEXTURE_2D,pe,ge,ne.width,ne.height)}for(let ne=0,me=Ie.length;ne<me;ne++)fe=Ie[ne],Be?G&&t.texSubImage2D(n.TEXTURE_2D,ne,0,0,de,Le,fe):t.texImage2D(n.TEXTURE_2D,ne,ge,de,Le,fe);v.generateMipmaps=!1}else if(Be){if(Ye){const ne=ze(te);t.texStorage2D(n.TEXTURE_2D,pe,ge,ne.width,ne.height)}G&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,de,Le,te)}else t.texImage2D(n.TEXTURE_2D,0,ge,de,Le,te);m(v)&&M(V),he.__version=le.version,v.onUpdate&&v.onUpdate(v)}L.__version=v.version}function ue(L,v,U){if(v.image.length!==6)return;const V=ke(L,v),Z=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,L.__webglTexture,n.TEXTURE0+U);const le=i.get(Z);if(Z.version!==le.__version||V===!0){t.activeTexture(n.TEXTURE0+U);const he=et.getPrimaries(et.workingColorSpace),Q=v.colorSpace===wn?null:et.getPrimaries(v.colorSpace),te=v.colorSpace===wn||he===Q?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,te);const de=v.isCompressedTexture||v.image[0].isCompressedTexture,Le=v.image[0]&&v.image[0].isDataTexture,ge=[];for(let oe=0;oe<6;oe++)!de&&!Le?ge[oe]=g(v.image[oe],!0,r.maxCubemapSize):ge[oe]=Le?v.image[oe].image:v.image[oe],ge[oe]=Ze(v,ge[oe]);const fe=ge[0],Ie=a.convert(v.format,v.colorSpace),Be=a.convert(v.type),Ye=b(v.internalFormat,Ie,Be,v.normalized,v.colorSpace),G=v.isVideoTexture!==!0,pe=le.__version===void 0||V===!0,ne=Z.dataReady;let me=w(v,fe);Oe(n.TEXTURE_CUBE_MAP,v);let Se;if(de){G&&pe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,me,Ye,fe.width,fe.height);for(let oe=0;oe<6;oe++){Se=ge[oe].mipmaps;for(let Ne=0;Ne<Se.length;Ne++){const Pe=Se[Ne];v.format!==xn?Ie!==null?G?ne&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne,0,0,Pe.width,Pe.height,Ie,Pe.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne,Ye,Pe.width,Pe.height,0,Pe.data):Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):G?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne,0,0,Pe.width,Pe.height,Ie,Be,Pe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne,Ye,Pe.width,Pe.height,0,Ie,Be,Pe.data)}}}else{if(Se=v.mipmaps,G&&pe){Se.length>0&&me++;const oe=ze(ge[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,me,Ye,oe.width,oe.height)}for(let oe=0;oe<6;oe++)if(Le){G?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,ge[oe].width,ge[oe].height,Ie,Be,ge[oe].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,Ye,ge[oe].width,ge[oe].height,0,Ie,Be,ge[oe].data);for(let Ne=0;Ne<Se.length;Ne++){const St=Se[Ne].image[oe].image;G?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne+1,0,0,St.width,St.height,Ie,Be,St.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne+1,Ye,St.width,St.height,0,Ie,Be,St.data)}}else{G?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,Ie,Be,ge[oe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,Ye,Ie,Be,ge[oe]);for(let Ne=0;Ne<Se.length;Ne++){const Pe=Se[Ne];G?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne+1,0,0,Ie,Be,Pe.image[oe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne+1,Ye,Ie,Be,Pe.image[oe])}}}m(v)&&M(n.TEXTURE_CUBE_MAP),le.__version=Z.version,v.onUpdate&&v.onUpdate(v)}L.__version=v.version}function se(L,v,U,V,Z,le){const he=a.convert(U.format,U.colorSpace),Q=a.convert(U.type),te=b(U.internalFormat,he,Q,U.normalized,U.colorSpace),de=i.get(v),Le=i.get(U);if(Le.__renderTarget=v,!de.__hasExternalTextures){const ge=Math.max(1,v.width>>le),fe=Math.max(1,v.height>>le);Z===n.TEXTURE_3D||Z===n.TEXTURE_2D_ARRAY?t.texImage3D(Z,le,te,ge,fe,v.depth,0,he,Q,null):t.texImage2D(Z,le,te,ge,fe,0,he,Q,null)}t.bindFramebuffer(n.FRAMEBUFFER,L),vt(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,V,Z,Le.__webglTexture,0,mt(v)):(Z===n.TEXTURE_2D||Z>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,V,Z,Le.__webglTexture,le),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ye(L,v,U){if(n.bindRenderbuffer(n.RENDERBUFFER,L),v.depthBuffer){const V=v.depthTexture,Z=V&&V.isDepthTexture?V.type:null,le=R(v.stencilBuffer,Z),he=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;vt(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,mt(v),le,v.width,v.height):U?n.renderbufferStorageMultisample(n.RENDERBUFFER,mt(v),le,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,le,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,he,n.RENDERBUFFER,L)}else{const V=v.textures;for(let Z=0;Z<V.length;Z++){const le=V[Z],he=a.convert(le.format,le.colorSpace),Q=a.convert(le.type),te=b(le.internalFormat,he,Q,le.normalized,le.colorSpace);vt(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,mt(v),te,v.width,v.height):U?n.renderbufferStorageMultisample(n.RENDERBUFFER,mt(v),te,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,te,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function qe(L,v,U){const V=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,L),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Z=i.get(v.depthTexture);if(Z.__renderTarget=v,(!Z.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),V){if(Z.__webglInit===void 0&&(Z.__webglInit=!0,v.depthTexture.addEventListener("dispose",P)),Z.__webglTexture===void 0){Z.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,Z.__webglTexture),Oe(n.TEXTURE_CUBE_MAP,v.depthTexture);const de=a.convert(v.depthTexture.format),Le=a.convert(v.depthTexture.type);let ge;v.depthTexture.format===oi?ge=n.DEPTH_COMPONENT24:v.depthTexture.format===Di&&(ge=n.DEPTH24_STENCIL8);for(let fe=0;fe<6;fe++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,ge,v.width,v.height,0,de,Le,null)}}else ae(v.depthTexture,0);const le=Z.__webglTexture,he=mt(v),Q=V?n.TEXTURE_CUBE_MAP_POSITIVE_X+U:n.TEXTURE_2D,te=v.depthTexture.format===Di?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(v.depthTexture.format===oi)vt(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,te,Q,le,0,he):n.framebufferTexture2D(n.FRAMEBUFFER,te,Q,le,0);else if(v.depthTexture.format===Di)vt(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,te,Q,le,0,he):n.framebufferTexture2D(n.FRAMEBUFFER,te,Q,le,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ce(L){const v=i.get(L),U=L.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==L.depthTexture){const V=L.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),V){const Z=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,V.removeEventListener("dispose",Z)};V.addEventListener("dispose",Z),v.__depthDisposeCallback=Z}v.__boundDepthTexture=V}if(L.depthTexture&&!v.__autoAllocateDepthBuffer)if(U)for(let V=0;V<6;V++)qe(v.__webglFramebuffer[V],L,V);else{const V=L.texture.mipmaps;V&&V.length>0?qe(v.__webglFramebuffer[0],L,0):qe(v.__webglFramebuffer,L,0)}else if(U){v.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[V]),v.__webglDepthbuffer[V]===void 0)v.__webglDepthbuffer[V]=n.createRenderbuffer(),ye(v.__webglDepthbuffer[V],L,!1);else{const Z=L.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,le=v.__webglDepthbuffer[V];n.bindRenderbuffer(n.RENDERBUFFER,le),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,le)}}else{const V=L.texture.mipmaps;if(V&&V.length>0?t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),ye(v.__webglDepthbuffer,L,!1);else{const Z=L.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,le=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,le),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,le)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ue(L,v,U){const V=i.get(L);v!==void 0&&se(V.__webglFramebuffer,L,L.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),U!==void 0&&Ce(L)}function Xe(L){const v=L.texture,U=i.get(L),V=i.get(v);L.addEventListener("dispose",S);const Z=L.textures,le=L.isWebGLCubeRenderTarget===!0,he=Z.length>1;if(he||(V.__webglTexture===void 0&&(V.__webglTexture=n.createTexture()),V.__version=v.version,s.memory.textures++),le){U.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(v.mipmaps&&v.mipmaps.length>0){U.__webglFramebuffer[Q]=[];for(let te=0;te<v.mipmaps.length;te++)U.__webglFramebuffer[Q][te]=n.createFramebuffer()}else U.__webglFramebuffer[Q]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){U.__webglFramebuffer=[];for(let Q=0;Q<v.mipmaps.length;Q++)U.__webglFramebuffer[Q]=n.createFramebuffer()}else U.__webglFramebuffer=n.createFramebuffer();if(he)for(let Q=0,te=Z.length;Q<te;Q++){const de=i.get(Z[Q]);de.__webglTexture===void 0&&(de.__webglTexture=n.createTexture(),s.memory.textures++)}if(L.samples>0&&vt(L)===!1){U.__webglMultisampledFramebuffer=n.createFramebuffer(),U.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let Q=0;Q<Z.length;Q++){const te=Z[Q];U.__webglColorRenderbuffer[Q]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,U.__webglColorRenderbuffer[Q]);const de=a.convert(te.format,te.colorSpace),Le=a.convert(te.type),ge=b(te.internalFormat,de,Le,te.normalized,te.colorSpace,L.isXRRenderTarget===!0),fe=mt(L);n.renderbufferStorageMultisample(n.RENDERBUFFER,fe,ge,L.width,L.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Q,n.RENDERBUFFER,U.__webglColorRenderbuffer[Q])}n.bindRenderbuffer(n.RENDERBUFFER,null),L.depthBuffer&&(U.__webglDepthRenderbuffer=n.createRenderbuffer(),ye(U.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(le){t.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture),Oe(n.TEXTURE_CUBE_MAP,v);for(let Q=0;Q<6;Q++)if(v.mipmaps&&v.mipmaps.length>0)for(let te=0;te<v.mipmaps.length;te++)se(U.__webglFramebuffer[Q][te],L,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,te);else se(U.__webglFramebuffer[Q],L,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);m(v)&&M(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(he){for(let Q=0,te=Z.length;Q<te;Q++){const de=Z[Q],Le=i.get(de);let ge=n.TEXTURE_2D;(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(ge=L.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ge,Le.__webglTexture),Oe(ge,de),se(U.__webglFramebuffer,L,de,n.COLOR_ATTACHMENT0+Q,ge,0),m(de)&&M(ge)}t.unbindTexture()}else{let Q=n.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(Q=L.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Q,V.__webglTexture),Oe(Q,v),v.mipmaps&&v.mipmaps.length>0)for(let te=0;te<v.mipmaps.length;te++)se(U.__webglFramebuffer[te],L,v,n.COLOR_ATTACHMENT0,Q,te);else se(U.__webglFramebuffer,L,v,n.COLOR_ATTACHMENT0,Q,0);m(v)&&M(Q),t.unbindTexture()}L.depthBuffer&&Ce(L)}function We(L){const v=L.textures;for(let U=0,V=v.length;U<V;U++){const Z=v[U];if(m(Z)){const le=E(L),he=i.get(Z).__webglTexture;t.bindTexture(le,he),M(le),t.unbindTexture()}}}const xt=[],Rt=[];function kt(L){if(L.samples>0){if(vt(L)===!1){const v=L.textures,U=L.width,V=L.height;let Z=n.COLOR_BUFFER_BIT;const le=L.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,he=i.get(L),Q=v.length>1;if(Q)for(let de=0;de<v.length;de++)t.bindFramebuffer(n.FRAMEBUFFER,he.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,he.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,he.__webglMultisampledFramebuffer);const te=L.texture.mipmaps;te&&te.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,he.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,he.__webglFramebuffer);for(let de=0;de<v.length;de++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(Z|=n.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(Z|=n.STENCIL_BUFFER_BIT)),Q){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,he.__webglColorRenderbuffer[de]);const Le=i.get(v[de]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Le,0)}n.blitFramebuffer(0,0,U,V,0,0,U,V,Z,n.NEAREST),c===!0&&(xt.length=0,Rt.length=0,xt.push(n.COLOR_ATTACHMENT0+de),L.depthBuffer&&L.storeMultisampledDepthBuffer===!1&&(xt.push(le),Rt.push(le),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Rt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,xt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Q)for(let de=0;de<v.length;de++){t.bindFramebuffer(n.FRAMEBUFFER,he.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.RENDERBUFFER,he.__webglColorRenderbuffer[de]);const Le=i.get(v[de]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,he.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.TEXTURE_2D,Le,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,he.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.storeMultisampledDepthBuffer===!1&&c){const v=L.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function mt(L){return Math.min(r.maxSamples,L.samples)}function vt(L){const v=i.get(L);return L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function k(L){const v=s.render.frame;u.get(L)!==v&&(u.set(L,v),L.update())}function Ze(L,v){const U=L.colorSpace,V=L.format,Z=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||U!==Hr&&U!==wn&&(et.getTransfer(U)===pt?(V!==xn||Z!==hn)&&Ge("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):rt("WebGLTextures: Unsupported texture color space:",U)),v}function ze(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(l.width=L.naturalWidth||L.width,l.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(l.width=L.displayWidth,l.height=L.displayHeight):(l.width=L.width,l.height=L.height),l}this.allocateTextureUnit=W,this.resetTextureUnits=F,this.getTextureUnits=D,this.setTextureUnits=B,this.setTexture2D=ae,this.setTexture2DArray=q,this.setTexture3D=ee,this.setTextureCube=N,this.rebindTextures=Ue,this.setupRenderTarget=Xe,this.updateRenderTargetMipmap=We,this.updateMultisampleRenderTarget=kt,this.setupDepthRenderbuffer=Ce,this.setupFrameBufferTexture=se,this.useMultisampledRTT=vt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function b_(n,e){function t(i,r=wn){let a;const s=et.getTransfer(r);if(i===hn)return n.UNSIGNED_BYTE;if(i===Go)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Ho)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Zc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===$c)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Kc)return n.BYTE;if(i===qc)return n.SHORT;if(i===kr)return n.UNSIGNED_SHORT;if(i===ko)return n.INT;if(i===Gn)return n.UNSIGNED_INT;if(i===Fn)return n.FLOAT;if(i===Hn)return n.HALF_FLOAT;if(i===Jc)return n.ALPHA;if(i===Qc)return n.RGB;if(i===xn)return n.RGBA;if(i===oi)return n.DEPTH_COMPONENT;if(i===Di)return n.DEPTH_STENCIL;if(i===jc)return n.RED;if(i===Vo)return n.RED_INTEGER;if(i===zi)return n.RG;if(i===Wo)return n.RG_INTEGER;if(i===Xo)return n.RGBA_INTEGER;if(i===La||i===Pa||i===Da||i===Ia)if(s===pt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===La)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Pa)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Da)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ia)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===La)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Pa)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Da)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ia)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ks||i===qs||i===Zs||i===$s)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===Ks)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===qs)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Zs)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===$s)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Js||i===Qs||i===js||i===eo||i===to||i===Fa||i===no)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(i===Js||i===Qs)return s===pt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===js)return s===pt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC;if(i===eo)return a.COMPRESSED_R11_EAC;if(i===to)return a.COMPRESSED_SIGNED_R11_EAC;if(i===Fa)return a.COMPRESSED_RG11_EAC;if(i===no)return a.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===io||i===ro||i===ao||i===so||i===oo||i===lo||i===co||i===uo||i===ho||i===fo||i===po||i===mo||i===go||i===_o)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(i===io)return s===pt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===ro)return s===pt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===ao)return s===pt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===so)return s===pt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===oo)return s===pt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===lo)return s===pt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===co)return s===pt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===uo)return s===pt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===ho)return s===pt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===fo)return s===pt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===po)return s===pt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===mo)return s===pt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===go)return s===pt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===_o)return s===pt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===xo||i===vo||i===Mo)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(i===xo)return s===pt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===vo)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Mo)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===So||i===bo||i===Oa||i===Eo)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(i===So)return a.COMPRESSED_RED_RGTC1_EXT;if(i===bo)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Oa)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Eo)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Gr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const E_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,y_=`
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

}`;class w_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new uu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new $t({vertexShader:E_,fragmentShader:y_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new en(new Wn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class A_ extends Gi{constructor(e,t){super();const i=this;let r=null,a=1,s=null,o="local-floor",c=1,l=null,u=null,d=null,h=null,p=null,_=null;const x=typeof XRWebGLBinding<"u",g=new w_,m={},M=t.getContextAttributes();let E=null,b=null;const R=[],w=[],P=new Ve;let S=null,T=null;const I=new gn;I.viewport=new Tt;const C=new gn;C.viewport=new Tt;const O=[I,C],F=new Np;let D=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let ie=R[j];return ie===void 0&&(ie=new ms,R[j]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(j){let ie=R[j];return ie===void 0&&(ie=new ms,R[j]=ie),ie.getGripSpace()},this.getHand=function(j){let ie=R[j];return ie===void 0&&(ie=new ms,R[j]=ie),ie.getHandSpace()};function W(j){const ie=w.indexOf(j.inputSource);if(ie===-1)return;const H=R[ie];H!==void 0&&(H.update(j.inputSource,j.frame,l||s),H.dispatchEvent({type:j.type,data:j.inputSource}))}function $(){r.removeEventListener("select",W),r.removeEventListener("selectstart",W),r.removeEventListener("selectend",W),r.removeEventListener("squeeze",W),r.removeEventListener("squeezestart",W),r.removeEventListener("squeezeend",W),r.removeEventListener("end",$),r.removeEventListener("inputsourceschange",ae);for(let j=0;j<R.length;j++){const ie=w[j];ie!==null&&(w[j]=null,R[j].disconnect(ie))}D=null,B=null,g.reset();for(const j in m)delete m[j];if(e.setRenderTarget(E),p=null,h=null,d=null,r=null,b=null,ke.stop(),i.isPresenting=!1,e.setPixelRatio(S),e.setSize(P.width,P.height,!1),T!==null){const j=T.camera;j.fov=T.fov,j.zoom=T.zoom,j.updateProjectionMatrix(),T=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){a=j,i.isPresenting===!0&&Ge("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){o=j,i.isPresenting===!0&&Ge("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||s},this.setReferenceSpace=function(j){l=j},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(j){if(r=j,r!==null){if(E=e.getRenderTarget(),r.addEventListener("select",W),r.addEventListener("selectstart",W),r.addEventListener("selectend",W),r.addEventListener("squeeze",W),r.addEventListener("squeezestart",W),r.addEventListener("squeezeend",W),r.addEventListener("end",$),r.addEventListener("inputsourceschange",ae),M.xrCompatible!==!0&&await t.makeXRCompatible(),S=e.getPixelRatio(),e.getSize(P),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let H=null,ue=null,se=null;M.depth&&(se=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,H=M.stencil?Di:oi,ue=M.stencil?Gr:Gn);const ye={colorFormat:t.RGBA8,depthFormat:se,scaleFactor:a};d=this.getBinding(),h=d.createProjectionLayer(ye),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),b=new vn(h.textureWidth,h.textureHeight,{format:xn,type:hn,depthTexture:new Vr(h.textureWidth,h.textureHeight,ue,void 0,void 0,void 0,void 0,void 0,void 0,H),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{const H={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:a};p=new XRWebGLLayer(r,t,H),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),b=new vn(p.framebufferWidth,p.framebufferHeight,{format:xn,type:hn,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(c),l=null,s=await r.requestReferenceSpace(o),ke.setContext(r),ke.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function ae(j){for(let ie=0;ie<j.removed.length;ie++){const H=j.removed[ie],ue=w.indexOf(H);ue>=0&&(w[ue]=null,R[ue].disconnect(H))}for(let ie=0;ie<j.added.length;ie++){const H=j.added[ie];let ue=w.indexOf(H);if(ue===-1){for(let ye=0;ye<R.length;ye++)if(ye>=w.length){w.push(H),ue=ye;break}else if(w[ye]===null){w[ye]=H,ue=ye;break}if(ue===-1)break}const se=R[ue];se&&se.connect(H)}}const q=new X,ee=new X;function N(j,ie,H){q.setFromMatrixPosition(ie.matrixWorld),ee.setFromMatrixPosition(H.matrixWorld);const ue=q.distanceTo(ee),se=ie.projectionMatrix.elements,ye=H.projectionMatrix.elements,qe=se[14]/(se[10]-1),Ce=se[14]/(se[10]+1),Ue=(se[9]+1)/se[5],Xe=(se[9]-1)/se[5],We=(se[8]-1)/se[0],xt=(ye[8]+1)/ye[0],Rt=qe*We,kt=qe*xt,mt=ue/(-We+xt),vt=mt*-We;if(ie.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(vt),j.translateZ(mt),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),se[10]===-1)j.projectionMatrix.copy(ie.projectionMatrix),j.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{const k=qe+mt,Ze=Ce+mt,ze=Rt-vt,L=kt+(ue-vt),v=Ue*Ce/Ze*k,U=Xe*Ce/Ze*k;j.projectionMatrix.makePerspective(ze,L,v,U,k,Ze),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function re(j,ie){ie===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(ie.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(r===null)return;let ie=j.near,H=j.far;g.texture!==null&&(g.depthNear>0&&(ie=g.depthNear),g.depthFar>0&&(H=g.depthFar)),F.near=C.near=I.near=ie,F.far=C.far=I.far=H,(D!==F.near||B!==F.far)&&(r.updateRenderState({depthNear:F.near,depthFar:F.far}),D=F.near,B=F.far),F.layers.mask=j.layers.mask|6,I.layers.mask=F.layers.mask&-5,C.layers.mask=F.layers.mask&-3;const ue=j.parent,se=F.cameras;re(F,ue);for(let ye=0;ye<se.length;ye++)re(se[ye],ue);se.length===2?N(F,I,C):F.projectionMatrix.copy(I.projectionMatrix),T===null&&j.isPerspectiveCamera&&(T={camera:j,fov:j.fov,zoom:j.zoom}),ce(j,F,ue)};function ce(j,ie,H){H===null?j.matrix.copy(ie.matrixWorld):(j.matrix.copy(H.matrixWorld),j.matrix.invert(),j.matrix.multiply(ie.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(ie.projectionMatrix),j.projectionMatrixInverse.copy(ie.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=yo*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(h===null&&p===null))return c},this.setFoveation=function(j){c=j,h!==null&&(h.fixedFoveation=j),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=j)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(F)},this.getCameraTexture=function(j){return m[j]};let Re=null;function Oe(j,ie){if(u=ie.getViewerPose(l||s),_=ie,u!==null){const H=u.views;p!==null&&(e.setRenderTargetFramebuffer(b,p.framebuffer),e.setRenderTarget(b));let ue=!1;H.length!==F.cameras.length&&(F.cameras.length=0,ue=!0);for(let Ce=0;Ce<H.length;Ce++){const Ue=H[Ce];let Xe=null;if(p!==null)Xe=p.getViewport(Ue);else{const xt=d.getViewSubImage(h,Ue);Xe=xt.viewport,Ce===0&&(e.setRenderTargetTextures(b,xt.colorTexture,xt.depthStencilTexture),e.setRenderTarget(b))}let We=O[Ce];We===void 0&&(We=new gn,We.layers.enable(Ce),We.viewport=new Tt,O[Ce]=We),We.matrix.fromArray(Ue.transform.matrix),We.matrix.decompose(We.position,We.quaternion,We.scale),We.projectionMatrix.fromArray(Ue.projectionMatrix),We.projectionMatrixInverse.copy(We.projectionMatrix).invert(),We.viewport.set(Xe.x,Xe.y,Xe.width,Xe.height),Ce===0&&(F.matrix.copy(We.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),ue===!0&&F.cameras.push(We)}const se=r.enabledFeatures;if(se&&se.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&x){d=i.getBinding();const Ce=d.getDepthInformation(H[0]);Ce&&Ce.isValid&&Ce.texture&&g.init(Ce,r.renderState)}if(se&&se.includes("camera-access")&&x){e.state.unbindTexture(),d=i.getBinding();for(let Ce=0;Ce<H.length;Ce++){const Ue=H[Ce].camera;if(Ue){let Xe=m[Ue];Xe||(Xe=new uu,m[Ue]=Xe);const We=d.getCameraImage(Ue);Xe.sourceTexture=We}}}}for(let H=0;H<R.length;H++){const ue=w[H],se=R[H];ue!==null&&se!==void 0&&se.update(ue,ie,l||s)}Re&&Re(j,ie),ie.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ie}),_=null}const ke=new mu;ke.setAnimationLoop(Oe),this.setAnimationLoop=function(j){Re=j},this.dispose=function(){}}}const T_=new Pt,bu=new He;bu.set(-1,0,0,0,1,0,0,0,1);function R_(n,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function i(g,m){m.color.getRGB(g.fogColor.value,hu(n)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function r(g,m,M,E,b){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?a(g,m):m.isMeshLambertMaterial?(a(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(a(g,m),d(g,m)):m.isMeshPhongMaterial?(a(g,m),u(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(a(g,m),h(g,m),m.isMeshPhysicalMaterial&&p(g,m,b)):m.isMeshMatcapMaterial?(a(g,m),_(g,m)):m.isMeshDepthMaterial?a(g,m):m.isMeshDistanceMaterial?(a(g,m),x(g,m)):m.isMeshNormalMaterial?a(g,m):m.isLineBasicMaterial?(s(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?c(g,m,M,E):m.isSpriteMaterial?l(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function a(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===sn&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===sn&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const M=e.get(m),E=M.envMap,b=M.envMapRotation;E&&(g.envMap.value=E,g.envMapRotation.value.setFromMatrix4(T_.makeRotationFromEuler(b)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(bu),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function s(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function c(g,m,M,E){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*M,g.scale.value=E*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function l(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function u(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function d(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function h(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function p(g,m,M){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===sn&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.retroreflectivity>0&&(g.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=M.texture,g.transmissionSamplerSize.value.set(M.width,M.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function _(g,m){m.matcap&&(g.matcap.value=m.matcap)}function x(g,m){const M=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(M.matrixWorld),g.nearDistance.value=M.shadow.camera.near,g.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function C_(n,e,t,i){let r={},a={},s=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(b,R){const w=R.program;i.uniformBlockBinding(b,w)}function l(b,R){let w=r[b.id];w===void 0&&(g(b),w=u(b),r[b.id]=w,b.addEventListener("dispose",M));const P=R.program;i.updateUBOMapping(b,P);const S=e.render.frame;a[b.id]!==S&&(h(b),a[b.id]=S)}function u(b){const R=d();b.__bindingPointIndex=R;const w=n.createBuffer(),P=b.__size,S=b.usage;return n.bindBuffer(n.UNIFORM_BUFFER,w),n.bufferData(n.UNIFORM_BUFFER,P,S),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,R,w),w}function d(){for(let b=0;b<o;b++)if(s.indexOf(b)===-1)return s.push(b),b;return rt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(b){const R=r[b.id],w=b.uniforms,P=b.__cache;n.bindBuffer(n.UNIFORM_BUFFER,R);for(let S=0,T=w.length;S<T;S++){const I=w[S];if(Array.isArray(I))for(let C=0,O=I.length;C<O;C++)p(I[C],S,C,P);else p(I,S,0,P)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(b,R,w,P){if(x(b,R,w,P)===!0){const S=b.__offset,T=b.value;if(Array.isArray(T)){let I=0;for(let C=0;C<T.length;C++){const O=T[C],F=m(O);_(O,b.__data,I),typeof O!="number"&&typeof O!="boolean"&&!O.isMatrix3&&!ArrayBuffer.isView(O)&&(I+=F.storage/Float32Array.BYTES_PER_ELEMENT)}}else _(T,b.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,S,b.__data)}}function _(b,R,w){typeof b=="number"||typeof b=="boolean"?R[0]=b:b.isMatrix3?(R[0]=b.elements[0],R[1]=b.elements[1],R[2]=b.elements[2],R[3]=0,R[4]=b.elements[3],R[5]=b.elements[4],R[6]=b.elements[5],R[7]=0,R[8]=b.elements[6],R[9]=b.elements[7],R[10]=b.elements[8],R[11]=0):ArrayBuffer.isView(b)?R.set(new b.constructor(b.buffer,b.byteOffset,R.length)):b.toArray(R,w)}function x(b,R,w,P){const S=b.value,T=R+"_"+w;if(P[T]===void 0)return typeof S=="number"||typeof S=="boolean"?P[T]=S:ArrayBuffer.isView(S)?P[T]=S.slice():P[T]=S.clone(),!0;{const I=P[T];if(typeof S=="number"||typeof S=="boolean"){if(I!==S)return P[T]=S,!0}else{if(ArrayBuffer.isView(S))return!0;if(I.equals(S)===!1)return I.copy(S),!0}}return!1}function g(b){const R=b.uniforms;let w=0;const P=16;for(let T=0,I=R.length;T<I;T++){const C=Array.isArray(R[T])?R[T]:[R[T]];for(let O=0,F=C.length;O<F;O++){const D=C[O],B=Array.isArray(D.value)?D.value:[D.value];for(let W=0,$=B.length;W<$;W++){const ae=B[W],q=m(ae),ee=w%P,N=ee%q.boundary,re=ee+N;w+=N,re!==0&&P-re<q.storage&&(w+=P-re),D.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=w,w+=q.storage}}}const S=w%P;return S>0&&(w+=P-S),b.__size=w,b.__cache={},this}function m(b){const R={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(R.boundary=4,R.storage=4):b.isVector2?(R.boundary=8,R.storage=8):b.isVector3||b.isColor?(R.boundary=16,R.storage=12):b.isVector4?(R.boundary=16,R.storage=16):b.isMatrix3?(R.boundary=48,R.storage=48):b.isMatrix4?(R.boundary=64,R.storage=64):b.isTexture?Ge("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(b)?(R.boundary=16,R.storage=b.byteLength):Ge("WebGLRenderer: Unsupported uniform value type.",b),R}function M(b){const R=b.target;R.removeEventListener("dispose",M);const w=s.indexOf(R.__bindingPointIndex);s.splice(w,1),n.deleteBuffer(r[R.id]),delete r[R.id],delete a[R.id]}function E(){for(const b in r)n.deleteBuffer(r[b]);s=[],r={},a={}}return{bind:c,update:l,dispose:E}}const L_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Dn=null;function P_(){return Dn===null&&(Dn=new lr(L_,16,16,zi,Hn),Dn.name="DFG_LUT",Dn.minFilter=It,Dn.magFilter=It,Dn.wrapS=ei,Dn.wrapT=ei,Dn.generateMipmaps=!1,Dn.needsUpdate=!0),Dn}class D_{constructor(e={}){const{canvas:t=Qf(),context:i=null,depth:r=!0,stencil:a=!1,alpha:s=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1,outputBufferType:p=hn}=e;this.isWebGLRenderer=!0;let _;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=i.getContextAttributes().alpha}else _=s;const x=p,g=new Set([Xo,Wo,Vo]),m=new Set([hn,Gn,kr,Gr,Go,Ho]),M=new Uint32Array(4),E=new Int32Array(4),b=new X;let R=null,w=null;const P=[],S=[];let T=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Bn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const I=this;let C=!1,O=null,F=null,D=null,B=null;this._outputColorSpace=mn;let W=0,$=0,ae=null,q=-1,ee=null;const N=new Tt,re=new Tt;let ce=null;const Re=new ot(0);let Oe=0,ke=t.width,j=t.height,ie=1,H=null,ue=null;const se=new Tt(0,0,ke,j),ye=new Tt(0,0,ke,j);let qe=!1;const Ce=new $o;let Ue=!1,Xe=!1;const We=new Pt,xt=new X,Rt=new Tt,kt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let mt=!1;function vt(){return ae===null?ie:1}let k=i;function Ze(y,z){return t.getContext(y,z)}let ze,L,v,U,V,Z,le,he,Q,te,de,Le,ge,fe,Ie,Be,Ye,G,pe,ne,me,Se,oe;try{const y={alpha:!0,depth:r,stencil:a,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${zo}`),t.addEventListener("webglcontextlost",St,!1),t.addEventListener("webglcontextrestored",lt,!1),t.addEventListener("webglcontextcreationerror",Sn,!1),k===null){const z="webgl2";if(k=Ze(z,y),k===null)throw Ze(z)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ne()}catch(y){throw t.removeEventListener("webglcontextlost",St,!1),t.removeEventListener("webglcontextrestored",lt,!1),t.removeEventListener("webglcontextcreationerror",Sn,!1),rt("WebGLRenderer: "+y.message),y}function Ne(){ze=new Pg(k),ze.init(),me=new b_(k,ze),L=new Sg(k,ze,e,me),v=new M_(k,ze),L.reversedDepthBuffer&&h&&v.buffers.depth.setReversed(!0),F=k.createFramebuffer(),D=k.createFramebuffer(),B=k.createFramebuffer(),U=new Ng(k),V=new s_,Z=new S_(k,ze,v,V,L,me,U),le=new Lg(I),he=new Fp(k),Se=new vg(k,he),Q=new Dg(k,he,U,Se),te=new Fg(k,Q,he,Se,U),G=new Ug(k,L,Z),Ie=new bg(V),de=new a_(I,le,ze,L,Se,Ie),Le=new R_(I,V),ge=new l_,fe=new p_(ze),Ye=new xg(I,le,v,te,_,c),Be=new v_(I,te,L),oe=new C_(k,U,L,v),pe=new Mg(k,ze,U),ne=new Ig(k,ze,U),U.programs=de.programs,I.capabilities=L,I.extensions=ze,I.properties=V,I.renderLists=ge,I.shadowMap=Be,I.state=v,I.info=U}x!==hn&&(T=new Bg(x,t.width,t.height,o,r,a));const Pe=new A_(I,k);this.xr=Pe,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){const y=ze.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=ze.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return ie},this.setPixelRatio=function(y){y!==void 0&&(ie=y,this.setSize(ke,j,!1))},this.getSize=function(y){return y.set(ke,j)},this.setSize=function(y,z,J=!0){if(Pe.isPresenting){Ge("WebGLRenderer: Can't change size while VR device is presenting.");return}ke=y,j=z,t.width=Math.floor(y*ie),t.height=Math.floor(z*ie),J===!0&&(t.style.width=y+"px",t.style.height=z+"px"),T!==null&&T.setSize(t.width,t.height),this.setViewport(0,0,y,z)},this.getDrawingBufferSize=function(y){return y.set(ke*ie,j*ie).floor()},this.setDrawingBufferSize=function(y,z,J){ke=y,j=z,ie=J,t.width=Math.floor(y*J),t.height=Math.floor(z*J),this.setViewport(0,0,y,z)},this.setEffects=function(y){if(x===hn){rt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(y){for(let z=0;z<y.length;z++)if(y[z].isOutputPass===!0){Ge("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(y||[])},this.getCurrentViewport=function(y){return y.copy(N)},this.getViewport=function(y){return y.copy(se)},this.setViewport=function(y,z,J,Y){y.isVector4?se.set(y.x,y.y,y.z,y.w):se.set(y,z,J,Y),v.viewport(N.copy(se).multiplyScalar(ie).round())},this.getScissor=function(y){return y.copy(ye)},this.setScissor=function(y,z,J,Y){y.isVector4?ye.set(y.x,y.y,y.z,y.w):ye.set(y,z,J,Y),v.scissor(re.copy(ye).multiplyScalar(ie).round())},this.getScissorTest=function(){return qe},this.setScissorTest=function(y){v.setScissorTest(qe=y)},this.setOpaqueSort=function(y){H=y},this.setTransparentSort=function(y){ue=y},this.getClearColor=function(y){return y.copy(Ye.getClearColor())},this.setClearColor=function(){Ye.setClearColor(...arguments)},this.getClearAlpha=function(){return Ye.getClearAlpha()},this.setClearAlpha=function(){Ye.setClearAlpha(...arguments)},this.clear=function(y=!0,z=!0,J=!0){let Y=0;if(y){let K=!1;if(ae!==null){const Me=ae.texture.format;K=g.has(Me)}if(K){const Me=ae.texture.type,we=m.has(Me),xe=Ye.getClearColor(),Ae=Ye.getClearAlpha(),De=xe.r,$e=xe.g,je=xe.b;we?(M[0]=De,M[1]=$e,M[2]=je,M[3]=Ae,k.clearBufferuiv(k.COLOR,0,M)):(E[0]=De,E[1]=$e,E[2]=je,E[3]=Ae,k.clearBufferiv(k.COLOR,0,E))}else Y|=k.COLOR_BUFFER_BIT}z&&(Y|=k.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),J&&(Y|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Y!==0&&k.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(y){y.setRenderer(this),O=y},this.dispose=function(){t.removeEventListener("webglcontextlost",St,!1),t.removeEventListener("webglcontextrestored",lt,!1),t.removeEventListener("webglcontextcreationerror",Sn,!1),Ye.dispose(),ge.dispose(),fe.dispose(),V.dispose(),le.dispose(),te.dispose(),Se.dispose(),oe.dispose(),de.dispose(),Pe.dispose(),Pe.removeEventListener("sessionstart",el),Pe.removeEventListener("sessionend",tl),bi.stop()};function St(y){y.preventDefault(),wl("WebGLRenderer: Context Lost."),C=!0}function lt(){wl("WebGLRenderer: Context Restored."),C=!1;const y=U.autoReset,z=Be.enabled,J=Be.autoUpdate,Y=Be.needsUpdate,K=Be.type;Ne(),U.autoReset=y,Be.enabled=z,Be.autoUpdate=J,Be.needsUpdate=Y,Be.type=K}function Sn(y){rt("WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function Cn(y){const z=y.target;z.removeEventListener("dispose",Cn),Tu(z)}function Tu(y){Ru(y),V.remove(y)}function Ru(y){const z=V.get(y).programs;z!==void 0&&(z.forEach(function(J){de.releaseProgram(J)}),y.isShaderMaterial&&de.releaseShaderCache(y))}this.renderBufferDirect=function(y,z,J,Y,K,Me){z===null&&(z=kt);const we=K.isMesh&&K.matrixWorld.determinantAffine()<0,xe=Pu(y,z,J,Y,K);v.setMaterial(Y,we);let Ae=J.index,De=1;if(Y.wireframe===!0){if(Ae=Q.getWireframeAttribute(J),Ae===void 0)return;De=2}const $e=J.drawRange,je=J.attributes.position;let Te=$e.start*De,ct=($e.start+$e.count)*De;Me!==null&&(Te=Math.max(Te,Me.start*De),ct=Math.min(ct,(Me.start+Me.count)*De)),Ae!==null?(Te=Math.max(Te,0),ct=Math.min(ct,Ae.count)):je!=null&&(Te=Math.max(Te,0),ct=Math.min(ct,je.count));const Nt=ct-Te;if(Nt<0||Nt===1/0)return;Se.setup(K,Y,xe,J,Ae);let yt,Mt=pe;if(Ae!==null&&(yt=he.get(Ae),Mt=ne,Mt.setIndex(yt)),K.isMesh)Y.wireframe===!0?(v.setLineWidth(Y.wireframeLinewidth*vt()),Mt.setMode(k.LINES)):Mt.setMode(k.TRIANGLES);else if(K.isLine){let Xt=Y.linewidth;Xt===void 0&&(Xt=1),v.setLineWidth(Xt*vt()),K.isLineSegments?Mt.setMode(k.LINES):K.isLineLoop?Mt.setMode(k.LINE_LOOP):Mt.setMode(k.LINE_STRIP)}else K.isPoints?Mt.setMode(k.POINTS):K.isSprite&&Mt.setMode(k.TRIANGLES);if(K.isBatchedMesh)if(ze.get("WEBGL_multi_draw"))Mt.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{const Xt=K._multiDrawStarts,Ee=K._multiDrawCounts,Jt=K._multiDrawCount,it=Ae?he.get(Ae).bytesPerElement:1,fn=V.get(Y).currentProgram.getUniforms();for(let Ln=0;Ln<Jt;Ln++)fn.setValue(k,"_gl_DrawID",Ln),Mt.render(Xt[Ln]/it,Ee[Ln])}else if(K.isInstancedMesh)Mt.renderInstances(Te,Nt,K.count);else if(J.isInstancedBufferGeometry){const Xt=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,Ee=Math.min(J.instanceCount,Xt);Mt.renderInstances(Te,Nt,Ee)}else Mt.render(Te,Nt)};function jo(y,z,J,Y){O!==null&&y.isNodeMaterial&&O.setObject(Y,y),Ue===!0&&Ie.setState(y,J,!1),y.transparent===!0&&y.side===jn&&y.forceSinglePass===!1?(y.side=sn,y.needsUpdate=!0,$r(y,z,Y),y.side=Oi,y.needsUpdate=!0,$r(y,z,Y),y.side=jn):$r(y,z,Y)}this.compile=function(y,z,J=null){J===null&&(J=y),O!==null&&O.renderStart(y,z,J),w=fe.get(J),w.init(z),S.push(w),J.traverseVisible(function(K){K.isLight&&K.layers.test(z.layers)&&(w.pushLight(K),K.castShadow&&w.pushShadow(K))}),y!==J&&y.traverseVisible(function(K){K.isLight&&K.layers.test(z.layers)&&(w.pushLight(K),K.castShadow&&w.pushShadow(K))}),w.setupLights(),O!==null&&O.updateLights(w.state.lightsArray),Xe=this.localClippingEnabled,Ue=Ie.init(this.clippingPlanes,Xe),Ue===!0&&Ie.setGlobalState(this.clippingPlanes,z),O!==null&&Be.render(w.state.shadowsArray,J,z);const Y=new Set;return y.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;const Me=K.material;if(Me)if(Array.isArray(Me))for(let we=0;we<Me.length;we++){const xe=Me[we];jo(xe,J,z,K),Y.add(xe)}else jo(Me,J,z,K),Y.add(Me)}),w=S.pop(),O!==null&&O.renderEnd(),Y},this.compileAsync=function(y,z,J=null){const Y=this.compile(y,z,J);return new Promise(K=>{function Me(){if(Y.forEach(function(we){const Ae=V.get(we).currentProgram;(Ae===void 0||Ae.isReady())&&Y.delete(we)}),Y.size===0){K(y);return}setTimeout(Me,10)}ze.get("KHR_parallel_shader_compile")!==null?Me():setTimeout(Me,10)})};let ja=null;function Cu(y){ja&&ja(y)}function el(){bi.stop()}function tl(){bi.start()}const bi=new mu;bi.setAnimationLoop(Cu),typeof self<"u"&&bi.setContext(self),this.setAnimationLoop=function(y){ja=y,Pe.setAnimationLoop(y),y===null?bi.stop():bi.start()},Pe.addEventListener("sessionstart",el),Pe.addEventListener("sessionend",tl),this.render=function(y,z){if(z!==void 0&&z.isCamera!==!0){rt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;O!==null&&O.renderStart(y,z);const J=Pe.enabled===!0&&Pe.isPresenting===!0,Y=T!==null&&(ae===null||J)&&T.begin(I,ae);if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),Pe.enabled===!0&&Pe.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(Pe.cameraAutoUpdate===!0&&Pe.updateCamera(z),z=Pe.getCamera()),y.isScene===!0&&y.onBeforeRender(I,y,z,ae),w=fe.get(y,S.length),w.init(z),w.state.textureUnits=Z.getTextureUnits(),S.push(w),We.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),Ce.setFromProjectionMatrix(We,On,z.reversedDepth),Xe=this.localClippingEnabled,Ue=Ie.init(this.clippingPlanes,Xe),R=ge.get(y,P.length),R.init(),P.push(R),Pe.enabled===!0&&Pe.isPresenting===!0){const we=I.xr.getDepthSensingMesh();we!==null&&es(we,z,-1/0,I.sortObjects)}es(y,z,0,I.sortObjects),R.finish(),O!==null&&O.updateLights(w.state.lightsArray),I.sortObjects===!0&&R.sort(H,ue),mt=Pe.enabled===!1||Pe.isPresenting===!1||Pe.hasDepthSensing()===!1,mt&&Ye.addToRenderList(R,y),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ue===!0&&Ie.beginShadows();const K=w.state.shadowsArray;if(Be.render(K,y,z),Ue===!0&&Ie.endShadows(),(Y&&T.hasRenderPass())===!1){const we=R.opaque,xe=R.transmissive;if(w.setupLights(),z.isArrayCamera){const Ae=z.cameras;if(xe.length>0)for(let De=0,$e=Ae.length;De<$e;De++){const je=Ae[De];il(we,xe,y,je)}mt&&Ye.render(y);for(let De=0,$e=Ae.length;De<$e;De++){const je=Ae[De];nl(R,y,je,je.viewport)}}else xe.length>0&&il(we,xe,y,z),mt&&Ye.render(y),nl(R,y,z)}ae!==null&&$===0&&(Z.updateMultisampleRenderTarget(ae),Z.updateRenderTargetMipmap(ae)),Y&&T.end(I),y.isScene===!0&&y.onAfterRender(I,y,z),Se.resetDefaultState(),q=-1,ee=null,S.pop(),S.length>0?(w=S[S.length-1],Z.setTextureUnits(w.state.textureUnits),Ue===!0&&Ie.setGlobalState(I.clippingPlanes,w.state.camera)):w=null,P.pop(),P.length>0?R=P[P.length-1]:R=null,O!==null&&O.renderEnd()};function es(y,z,J,Y){if(y.visible===!1)return;if(y.layers.test(z.layers)){if(y.isGroup)J=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(z);else if(y.isLightProbeGrid)w.pushLightProbeGrid(y);else if(y.isLight)w.pushLight(y),y.castShadow&&w.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||y.intersectsFrustum(Ce)){Y&&Rt.setFromMatrixPosition(y.matrixWorld).applyMatrix4(We);const we=te.update(y),xe=y.material;xe.visible&&R.push(y,we,xe,J,Rt.z,null,z)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||y.intersectsFrustum(Ce))){const we=te.update(y),xe=y.material;if(Y&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),Rt.copy(y.boundingSphere.center)):(we.boundingSphere===null&&we.computeBoundingSphere(),Rt.copy(we.boundingSphere.center)),Rt.applyMatrix4(y.matrixWorld).applyMatrix4(We)),Array.isArray(xe)){const Ae=we.groups;for(let De=0,$e=Ae.length;De<$e;De++){const je=Ae[De],Te=xe[je.materialIndex];Te&&Te.visible&&R.push(y,we,Te,J,Rt.z,je,z)}}else xe.visible&&R.push(y,we,xe,J,Rt.z,null,z)}}const Me=y.children;for(let we=0,xe=Me.length;we<xe;we++)es(Me[we],z,J,Y)}function nl(y,z,J,Y){const{opaque:K,transmissive:Me,transparent:we}=y;w.setupLightsView(J),Ue===!0&&Ie.setGlobalState(I.clippingPlanes,J),Y&&v.viewport(N.copy(Y)),K.length>0&&Zr(K,z,J),Me.length>0&&Zr(Me,z,J),we.length>0&&Zr(we,z,J),v.buffers.depth.setTest(!0),v.buffers.depth.setMask(!0),v.buffers.color.setMask(!0),v.setPolygonOffset(!1)}function il(y,z,J,Y){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[Y.id]===void 0){const Te=ze.has("EXT_color_buffer_half_float")||ze.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[Y.id]=new vn(1,1,{generateMipmaps:!0,type:Te?Hn:hn,minFilter:Pi,samples:Math.max(4,L.samples),stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:et.workingColorSpace})}const Me=w.state.transmissionRenderTarget[Y.id],we=Y.viewport||N;Me.setSize(we.z*I.transmissionResolutionScale,we.w*I.transmissionResolutionScale);const xe=I.getRenderTarget(),Ae=I.getActiveCubeFace(),De=I.getActiveMipmapLevel();I.setRenderTarget(Me),I.getClearColor(Re),Oe=I.getClearAlpha(),Oe<1&&I.setClearColor(16777215,.5),I.clear(),mt&&Ye.render(J);const $e=I.toneMapping;I.toneMapping=Bn;const je=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),w.setupLightsView(Y),Ue===!0&&Ie.setGlobalState(I.clippingPlanes,Y),Zr(y,J,Y),Z.updateMultisampleRenderTarget(Me),Z.updateRenderTargetMipmap(Me),ze.has("WEBGL_multisampled_render_to_texture")===!1){let Te=!1;for(let ct=0,Nt=z.length;ct<Nt;ct++){const yt=z[ct],{object:Mt,geometry:Xt,material:Ee,group:Jt}=yt;if(Ee.side===jn&&Mt.layers.test(Y.layers)){const it=Ee.side;Ee.side=sn,Ee.needsUpdate=!0,rl(Mt,J,Y,Xt,Ee,Jt),Ee.side=it,Ee.needsUpdate=!0,Te=!0}}Te===!0&&(Z.updateMultisampleRenderTarget(Me),Z.updateRenderTargetMipmap(Me))}I.setRenderTarget(xe,Ae,De),I.setClearColor(Re,Oe),je!==void 0&&(Y.viewport=je),I.toneMapping=$e}function Zr(y,z,J){const Y=z.isScene===!0?z.overrideMaterial:null;for(let K=0,Me=y.length;K<Me;K++){const we=y[K],{object:xe,geometry:Ae,group:De}=we;let $e=we.material;$e.allowOverride===!0&&Y!==null&&($e=Y),xe.layers.test(J.layers)&&rl(xe,z,J,Ae,$e,De)}}function rl(y,z,J,Y,K,Me){O!==null&&K.isNodeMaterial&&O.setObject(y,K),y.onBeforeRender(I,z,J,Y,K,Me),y.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),K.onBeforeRender(I,z,J,Y,y,Me),K.transparent===!0&&K.side===jn&&K.forceSinglePass===!1?(K.side=sn,K.needsUpdate=!0,I.renderBufferDirect(J,z,Y,K,y,Me),K.side=Oi,K.needsUpdate=!0,I.renderBufferDirect(J,z,Y,K,y,Me),K.side=jn):I.renderBufferDirect(J,z,Y,K,y,Me),y.onAfterRender(I,z,J,Y,K,Me)}function $r(y,z,J){z.isScene!==!0&&(z=kt);const Y=V.get(y),K=w.state.lights,Me=w.state.shadowsArray,we=K.state.version,xe=de.getParameters(y,K.state,Me,z,J,w.state.lightProbeGridArray),Ae=de.getProgramCacheKey(xe);let De=Y.programs;Y.environment=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?z.environment:null,Y.fog=z.fog;const $e=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap;Y.envMap=le.get(y.envMap||Y.environment,$e),Y.envMapRotation=Y.environment!==null&&y.envMap===null?z.environmentRotation:y.envMapRotation,De===void 0&&(y.addEventListener("dispose",Cn),De=new Map,Y.programs=De);let je=De.get(Ae);if(je!==void 0){if(Y.currentProgram===je&&Y.lightsStateVersion===we)return sl(y,xe),je}else xe.uniforms=de.getUniforms(y),O!==null&&y.isNodeMaterial&&O.build(y,J,xe),y.onBeforeCompile(xe,I),je=de.acquireProgram(xe,Ae),De.set(Ae,je),Y.uniforms=xe.uniforms;const Te=Y.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Te.clippingPlanes=Ie.uniform),sl(y,xe),Y.needsLights=Iu(y),Y.lightsStateVersion=we,Y.needsLights&&(Te.ambientLightColor.value=K.state.ambient,Te.lightProbe.value=K.state.probe,Te.sunLights.value=K.state.sun,Te.sunLightShadows.value=K.state.sunShadow,Te.directionalLights.value=K.state.directional,Te.directionalLightShadows.value=K.state.directionalShadow,Te.spotLights.value=K.state.spot,Te.spotLightShadows.value=K.state.spotShadow,Te.rectAreaLights.value=K.state.rectArea,Te.ltc_1.value=K.state.rectAreaLTC1,Te.ltc_2.value=K.state.rectAreaLTC2,Te.pointLights.value=K.state.point,Te.pointLightShadows.value=K.state.pointShadow,Te.hemisphereLights.value=K.state.hemi,Te.sunShadowMatrix.value=K.state.sunShadowMatrix,Te.sunShadowCascade.value=K.state.sunShadowCascade,Te.directionalShadowMatrix.value=K.state.directionalShadowMatrix,Te.spotLightMatrix.value=K.state.spotLightMatrix,Te.spotLightMap.value=K.state.spotLightMap,Te.pointShadowMatrix.value=K.state.pointShadowMatrix),Y.lightProbeGrid=w.state.lightProbeGridArray.length>0,Y.currentProgram=je,Y.uniformsList=null,je}function al(y){if(y.uniformsList===null){const z=y.currentProgram.getUniforms();y.uniformsList=Na.seqWithValue(z.seq,y.uniforms)}return y.uniformsList}function sl(y,z){const J=V.get(y);J.outputColorSpace=z.outputColorSpace,J.batching=z.batching,J.batchingColor=z.batchingColor,J.instancing=z.instancing,J.instancingColor=z.instancingColor,J.instancingMorph=z.instancingMorph,J.skinning=z.skinning,J.morphTargets=z.morphTargets,J.morphNormals=z.morphNormals,J.morphColors=z.morphColors,J.morphTargetsCount=z.morphTargetsCount,J.numClippingPlanes=z.numClippingPlanes,J.numIntersection=z.numClipIntersection,J.vertexAlphas=z.vertexAlphas,J.vertexTangents=z.vertexTangents,J.toneMapping=z.toneMapping}function Lu(y,z){if(y.length===0)return null;if(y.length===1)return y[0].texture!==null?y[0]:null;b.setFromMatrixPosition(z.matrixWorld);for(let J=0,Y=y.length;J<Y;J++){const K=y[J];if(K.texture!==null&&K.boundingBox.containsPoint(b))return K}return null}function Pu(y,z,J,Y,K){z.isScene!==!0&&(z=kt),Z.resetTextureUnits();const Me=z.fog,we=Y.isMeshStandardMaterial||Y.isMeshLambertMaterial||Y.isMeshPhongMaterial?z.environment:null,xe=ae===null?I.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:et.workingColorSpace,Ae=Y.isMeshStandardMaterial||Y.isMeshLambertMaterial&&!Y.envMap||Y.isMeshPhongMaterial&&!Y.envMap,De=le.get(Y.envMap||we,Ae),$e=Y.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,je=!!J.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),Te=!!J.morphAttributes.position,ct=!!J.morphAttributes.normal,Nt=!!J.morphAttributes.color;let yt=Bn;Y.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(yt=I.toneMapping);const Mt=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,Xt=Mt!==void 0?Mt.length:0,Ee=V.get(Y),Jt=w.state.lights;if(Ue===!0&&(Xe===!0||y!==ee)){const bt=y===ee&&Y.id===q;Ie.setState(Y,y,bt)}let it=!1;Y.version===Ee.__version?(Ee.needsLights&&Ee.lightsStateVersion!==Jt.state.version||Ee.outputColorSpace!==xe||K.isBatchedMesh&&Ee.batching===!1||!K.isBatchedMesh&&Ee.batching===!0||K.isBatchedMesh&&Ee.batchingColor===!0&&K._colorsTexture===null||K.isBatchedMesh&&Ee.batchingColor===!1&&K._colorsTexture!==null||K.isInstancedMesh&&Ee.instancing===!1||!K.isInstancedMesh&&Ee.instancing===!0||K.isSkinnedMesh&&Ee.skinning===!1||!K.isSkinnedMesh&&Ee.skinning===!0||K.isInstancedMesh&&Ee.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&Ee.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&Ee.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&Ee.instancingMorph===!1&&K.morphTexture!==null||Ee.envMap!==De||Y.fog===!0&&Ee.fog!==Me||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==Ie.numPlanes||Ee.numIntersection!==Ie.numIntersection)||Ee.vertexAlphas!==$e||Ee.vertexTangents!==je||Ee.morphTargets!==Te||Ee.morphNormals!==ct||Ee.morphColors!==Nt||Ee.toneMapping!==yt||Ee.morphTargetsCount!==Xt||!!Ee.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(it=!0):(it=!0,Ee.__version=Y.version);let fn=Ee.currentProgram;it===!0&&(fn=$r(Y,z,K),O&&Y.isNodeMaterial&&O.onUpdateProgram(Y,fn,Ee));let Ln=!1,ci=!1,Hi=!1;const gt=fn.getUniforms(),Dt=Ee.uniforms;if(v.useProgram(fn.program)&&(Ln=!0,ci=!0,Hi=!0),Y.id!==q&&(q=Y.id,ci=!0),Ee.needsLights){const bt=Lu(w.state.lightProbeGridArray,K);Ee.lightProbeGrid!==bt&&(Ee.lightProbeGrid=bt,ci=!0)}if(Ln||ee!==y){v.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),gt.setValue(k,"projectionMatrix",y.projectionMatrix),gt.setValue(k,"viewMatrix",y.matrixWorldInverse);const hi=gt.map.cameraPosition;hi!==void 0&&hi.setValue(k,xt.setFromMatrixPosition(y.matrixWorld)),L.logarithmicDepthBuffer&&gt.setValue(k,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&gt.setValue(k,"isOrthographic",y.isOrthographicCamera===!0),ee!==y&&(ee=y,ci=!0,Hi=!0)}if(Ee.needsLights&&(Jt.state.sunShadowMap.length>0&&gt.setValue(k,"sunShadowMap",Jt.state.sunShadowMap,Z),Jt.state.directionalShadowMap.length>0&&gt.setValue(k,"directionalShadowMap",Jt.state.directionalShadowMap,Z),Jt.state.spotShadowMap.length>0&&gt.setValue(k,"spotShadowMap",Jt.state.spotShadowMap,Z),Jt.state.pointShadowMap.length>0&&gt.setValue(k,"pointShadowMap",Jt.state.pointShadowMap,Z)),K.isSkinnedMesh){gt.setOptional(k,K,"bindMatrix"),gt.setOptional(k,K,"bindMatrixInverse");const bt=K.skeleton;bt&&(bt.boneTexture===null&&bt.computeBoneTexture(),gt.setValue(k,"boneTexture",bt.boneTexture,Z))}K.isBatchedMesh&&(gt.setOptional(k,K,"batchingTexture"),gt.setValue(k,"batchingTexture",K._matricesTexture,Z),gt.setOptional(k,K,"batchingIdTexture"),gt.setValue(k,"batchingIdTexture",K._indirectTexture,Z),gt.setOptional(k,K,"batchingColorTexture"),K._colorsTexture!==null&&gt.setValue(k,"batchingColorTexture",K._colorsTexture,Z));const ui=J.morphAttributes;if((ui.position!==void 0||ui.normal!==void 0||ui.color!==void 0)&&G.update(K,J,fn),(ci||Ee.receiveShadow!==K.receiveShadow)&&(Ee.receiveShadow=K.receiveShadow,gt.setValue(k,"receiveShadow",K.receiveShadow)),(Y.isMeshStandardMaterial||Y.isMeshLambertMaterial||Y.isMeshPhongMaterial)&&Y.envMap===null&&z.environment!==null&&(Dt.envMapIntensity.value=z.environmentIntensity),Dt.dfgLUT!==void 0&&(Dt.dfgLUT.value=P_()),ci){if(gt.setValue(k,"toneMappingExposure",I.toneMappingExposure),Ee.needsLights&&Du(Dt,Hi),Me&&Y.fog===!0&&Le.refreshFogUniforms(Dt,Me),Le.refreshMaterialUniforms(Dt,Y,ie,j,w.state.transmissionRenderTarget[y.id]),Ee.needsLights&&Ee.lightProbeGrid){const bt=Ee.lightProbeGrid;Dt.probesSH.value=bt.texture,Dt.probesMin.value.copy(bt.boundingBox.min),Dt.probesMax.value.copy(bt.boundingBox.max),Dt.probesResolution.value.copy(bt.resolution)}Na.upload(k,al(Ee),Dt,Z)}if(Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(Na.upload(k,al(Ee),Dt,Z),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&gt.setValue(k,"center",K.center),gt.setValue(k,"modelViewMatrix",K.modelViewMatrix),gt.setValue(k,"normalMatrix",K.normalMatrix),gt.setValue(k,"modelMatrix",K.matrixWorld),Y.uniformsGroups!==void 0){const bt=Y.uniformsGroups;for(let hi=0,Vi=bt.length;hi<Vi;hi++){const ll=bt[hi];oe.update(ll,fn),oe.bind(ll,fn)}}return fn}function Du(y,z){y.ambientLightColor.needsUpdate=z,y.lightProbe.needsUpdate=z,y.sunLights.needsUpdate=z,y.sunLightShadows.needsUpdate=z,y.directionalLights.needsUpdate=z,y.directionalLightShadows.needsUpdate=z,y.pointLights.needsUpdate=z,y.pointLightShadows.needsUpdate=z,y.spotLights.needsUpdate=z,y.spotLightShadows.needsUpdate=z,y.rectAreaLights.needsUpdate=z,y.hemisphereLights.needsUpdate=z}function Iu(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return W},this.getActiveMipmapLevel=function(){return $},this.getRenderTarget=function(){return ae},this.setRenderTargetTextures=function(y,z,J){const Y=V.get(y);Y.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,Y.__autoAllocateDepthBuffer===!1&&(Y.__useRenderToTexture=!1),V.get(y.texture).__webglTexture=z,V.get(y.depthTexture).__webglTexture=Y.__autoAllocateDepthBuffer?void 0:J,Y.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,z){const J=V.get(y);J.__webglFramebuffer=z,J.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(y,z=0,J=0){ae=y,W=z,$=J;let Y=null,K=!1,Me=!1;if(y){const xe=V.get(y);if(xe.__useDefaultFramebuffer!==void 0){v.bindFramebuffer(k.FRAMEBUFFER,xe.__webglFramebuffer),N.copy(y.viewport),re.copy(y.scissor),ce=y.scissorTest,v.viewport(N),v.scissor(re),v.setScissorTest(ce),q=-1;return}else if(xe.__webglFramebuffer===void 0)Z.setupRenderTarget(y);else if(xe.__hasExternalTextures)Z.rebindTextures(y,V.get(y.texture).__webglTexture,V.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const $e=y.depthTexture;if(xe.__boundDepthTexture!==$e){if($e!==null&&V.has($e)&&(y.width!==$e.image.width||y.height!==$e.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Z.setupDepthRenderbuffer(y)}}const Ae=y.texture;(Ae.isData3DTexture||Ae.isDataArrayTexture||Ae.isCompressedArrayTexture)&&(Me=!0);const De=V.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(De[z])?Y=De[z][J]:Y=De[z],K=!0):y.samples>0&&Z.useMultisampledRTT(y)===!1?Y=V.get(y).__webglMultisampledFramebuffer:Array.isArray(De)?Y=De[J]:Y=De,N.copy(y.viewport),re.copy(y.scissor),ce=y.scissorTest}else N.copy(se).multiplyScalar(ie).floor(),re.copy(ye).multiplyScalar(ie).floor(),ce=qe;if(J!==0&&(Y=F),v.bindFramebuffer(k.FRAMEBUFFER,Y)&&v.drawBuffers(y,Y),v.viewport(N),v.scissor(re),v.setScissorTest(ce),K){const xe=V.get(y.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+z,xe.__webglTexture,J)}else if(Me){const xe=z;for(let Ae=0;Ae<y.textures.length;Ae++){const De=V.get(y.textures[Ae]);k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0+Ae,De.__webglTexture,J,xe)}}else if(y!==null&&J!==0){const xe=V.get(y.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,xe.__webglTexture,J)}q=-1};function ol(y){const z=V.get(y);return(z.__readFormat!==y.format||z.__readType!==y.type)&&(z.__readFormat=y.format,z.__readType=y.type,z.__formatReadable=L.textureFormatReadable(y.format),z.__typeReadable=L.textureTypeReadable(y.type)),z}this.readRenderTargetPixels=function(y,z,J,Y,K,Me,we,xe=0){if(!(y&&y.isWebGLRenderTarget)){rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ae=V.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&we!==void 0&&(Ae=Ae[we]),Ae){v.bindFramebuffer(k.FRAMEBUFFER,Ae);try{const De=y.textures[xe],$e=De.format,je=De.type;y.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+xe);const Te=ol(De);if(Te.__formatReadable===!1){rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Te.__typeReadable===!1){rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=y.width-Y&&J>=0&&J<=y.height-K&&k.readPixels(z,J,Y,K,me.convert($e),me.convert(je),Me)}finally{const De=ae!==null?V.get(ae).__webglFramebuffer:null;v.bindFramebuffer(k.FRAMEBUFFER,De)}}},this.readRenderTargetPixelsAsync=async function(y,z,J,Y,K,Me,we,xe=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ae=V.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&we!==void 0&&(Ae=Ae[we]),Ae)if(z>=0&&z<=y.width-Y&&J>=0&&J<=y.height-K){v.bindFramebuffer(k.FRAMEBUFFER,Ae);const De=y.textures[xe],$e=De.format,je=De.type;y.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+xe);const Te=ol(De);if(Te.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Te.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ct=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,ct),k.bufferData(k.PIXEL_PACK_BUFFER,Me.byteLength,k.STREAM_READ),k.readPixels(z,J,Y,K,me.convert($e),me.convert(je),0),k.bindBuffer(k.PIXEL_PACK_BUFFER,null);const Nt=ae!==null?V.get(ae).__webglFramebuffer:null;v.bindFramebuffer(k.FRAMEBUFFER,Nt);const yt=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await jf(k,yt,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,ct),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,Me),k.bindBuffer(k.PIXEL_PACK_BUFFER,null),k.deleteBuffer(ct),k.deleteSync(yt),Me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,z=null,J=0){const Y=Math.pow(2,-J),K=Math.floor(y.image.width*Y),Me=Math.floor(y.image.height*Y),we=z!==null?z.x:0,xe=z!==null?z.y:0;Z.setTexture2D(y,0),k.copyTexSubImage2D(k.TEXTURE_2D,J,0,0,we,xe,K,Me),v.unbindTexture()},this.copyTextureToTexture=function(y,z,J=null,Y=null,K=0,Me=0){let we,xe,Ae,De,$e,je,Te,ct,Nt;const yt=y.isCompressedTexture?y.mipmaps[Me]:y.image;if(J!==null)we=J.max.x-J.min.x,xe=J.max.y-J.min.y,Ae=J.isBox3?J.max.z-J.min.z:1,De=J.min.x,$e=J.min.y,je=J.isBox3?J.min.z:0;else{const Dt=Math.pow(2,-K);we=Math.floor(yt.width*Dt),xe=Math.floor(yt.height*Dt),y.isDataArrayTexture?Ae=yt.depth:y.isData3DTexture?Ae=Math.floor(yt.depth*Dt):Ae=1,De=0,$e=0,je=0}Y!==null?(Te=Y.x,ct=Y.y,Nt=Y.z):(Te=0,ct=0,Nt=0);const Mt=me.convert(z.format),Xt=me.convert(z.type);let Ee;z.isData3DTexture?(Z.setTexture3D(z,0),Ee=k.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(Z.setTexture2DArray(z,0),Ee=k.TEXTURE_2D_ARRAY):(Z.setTexture2D(z,0),Ee=k.TEXTURE_2D),v.activeTexture(k.TEXTURE0),v.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,z.flipY),v.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),v.pixelStorei(k.UNPACK_ALIGNMENT,z.unpackAlignment);const Jt=v.getParameter(k.UNPACK_ROW_LENGTH),it=v.getParameter(k.UNPACK_IMAGE_HEIGHT),fn=v.getParameter(k.UNPACK_SKIP_PIXELS),Ln=v.getParameter(k.UNPACK_SKIP_ROWS),ci=v.getParameter(k.UNPACK_SKIP_IMAGES);v.pixelStorei(k.UNPACK_ROW_LENGTH,yt.width),v.pixelStorei(k.UNPACK_IMAGE_HEIGHT,yt.height),v.pixelStorei(k.UNPACK_SKIP_PIXELS,De),v.pixelStorei(k.UNPACK_SKIP_ROWS,$e),v.pixelStorei(k.UNPACK_SKIP_IMAGES,je);const Hi=y.isDataArrayTexture||y.isData3DTexture,gt=z.isDataArrayTexture||z.isData3DTexture;if(y.isDepthTexture){const Dt=V.get(y),ui=V.get(z),bt=V.get(Dt.__renderTarget),hi=V.get(ui.__renderTarget);v.bindFramebuffer(k.READ_FRAMEBUFFER,bt.__webglFramebuffer),v.bindFramebuffer(k.DRAW_FRAMEBUFFER,hi.__webglFramebuffer);for(let Vi=0;Vi<Ae;Vi++)Hi&&(k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,V.get(y).__webglTexture,K,je+Vi),k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,V.get(z).__webglTexture,Me,Nt+Vi)),k.blitFramebuffer(De,$e,we,xe,Te,ct,we,xe,k.DEPTH_BUFFER_BIT,k.NEAREST);v.bindFramebuffer(k.READ_FRAMEBUFFER,null),v.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else if(K!==0||y.isRenderTargetTexture||V.has(y)){const Dt=V.get(y),ui=V.get(z);v.bindFramebuffer(k.READ_FRAMEBUFFER,D),v.bindFramebuffer(k.DRAW_FRAMEBUFFER,B);for(let bt=0;bt<Ae;bt++)Hi?k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Dt.__webglTexture,K,je+bt):k.framebufferTexture2D(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,Dt.__webglTexture,K),gt?k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,ui.__webglTexture,Me,Nt+bt):k.framebufferTexture2D(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,ui.__webglTexture,Me),K!==0?k.blitFramebuffer(De,$e,we,xe,Te,ct,we,xe,k.COLOR_BUFFER_BIT,k.NEAREST):gt?k.copyTexSubImage3D(Ee,Me,Te,ct,Nt+bt,De,$e,we,xe):k.copyTexSubImage2D(Ee,Me,Te,ct,De,$e,we,xe);v.bindFramebuffer(k.READ_FRAMEBUFFER,null),v.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else gt?y.isDataTexture||y.isData3DTexture?k.texSubImage3D(Ee,Me,Te,ct,Nt,we,xe,Ae,Mt,Xt,yt.data):z.isCompressedArrayTexture?k.compressedTexSubImage3D(Ee,Me,Te,ct,Nt,we,xe,Ae,Mt,yt.data):k.texSubImage3D(Ee,Me,Te,ct,Nt,we,xe,Ae,Mt,Xt,yt):y.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,Me,Te,ct,we,xe,Mt,Xt,yt.data):y.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,Me,Te,ct,yt.width,yt.height,Mt,yt.data):k.texSubImage2D(k.TEXTURE_2D,Me,Te,ct,we,xe,Mt,Xt,yt);v.pixelStorei(k.UNPACK_ROW_LENGTH,Jt),v.pixelStorei(k.UNPACK_IMAGE_HEIGHT,it),v.pixelStorei(k.UNPACK_SKIP_PIXELS,fn),v.pixelStorei(k.UNPACK_SKIP_ROWS,Ln),v.pixelStorei(k.UNPACK_SKIP_IMAGES,ci),Me===0&&z.generateMipmaps&&k.generateMipmap(Ee),v.unbindTexture()},this.initRenderTarget=function(y){V.get(y).__webglFramebuffer===void 0&&Z.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?Z.setTextureCube(y,0):y.isData3DTexture?Z.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?Z.setTexture2DArray(y,0):Z.setTexture2D(y,0),v.unbindTexture()},this.resetState=function(){W=0,$=0,ae=null,v.reset(),Se.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return On}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=et._getDrawingBufferColorSpace(e),t.unpackColorSpace=et._getUnpackColorSpace()}}const Lt=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},Rn=(n,e,t=0)=>Lt(Math.floor(n[0]*e)+Math.floor(n[2]*e)*57+t,Math.floor(n[1]*e)),To=n=>{const e=Rn(n,12);return e<.14?f.BARKD:e>.88?f.BARKL:void 0},I_=n=>e=>{const t=Rn(e,10,3);return e[1]<n[1]-.2||t<.2?f.LEAF3:t>.8?f.LEAF2:void 0},qt=(n,e=0)=>t=>{const i=Rn(t,9,7);return t[1]>.05&&i<(n?.34:.12)&&Rn(t,3,1)<(n?.75:.45)?f.MOSS:e&&(t[1]*e%1<.1||((t[0]+t[2])*e*.7+Math.floor(t[1]*e)*.5)%1<.07)||i>.93?f.STONED:void 0},st=(n,e,t,i,r,a={})=>n.box(e,t,f.STONE,{round:.03,rough:.012,group:i,paint:qt(r,a.courses??5),...a}),nn=(n,e,t,i,r)=>{const a=[];for(let s=0;s<=4;s++){const o=s/4;a.push([...A.add(A.lerp(e,t,o),[(Lt(r,s)-.5)*.15,0,.02]),.03])}n.chain(a,f.LEAF,{group:i,rough:.02,paint:s=>Rn(s,30)<.3?f.LEAF2:void 0})},Qn=(n,e,t,i,r)=>{for(let a=0;a<e;a++){const s=Lt(r,a)*6.283,o=t*Math.sqrt(Lt(a,r)),c=Math.cos(s)*o,l=Math.sin(s)*o*.7;n.ell([c,.08,l],[.07,.1+Lt(a,4)*.08,.07],f.LEAF2,{group:i+a%3,paint:u=>u[1]>.14?f.LEAF:void 0})}},In=(n,e,t,i)=>n.ell(e,t,f.LEAF,{group:i,rough:.04,paint:I_(e)}),un=(n,e,t)=>n.chain(e,f.TRUNK,{group:t,rough:.012,paint:To}),rn=(n,e,t,i,r={})=>n.ell(e,t,f.STONE,{group:i,rough:.03,dir:r.dir,paint:a=>a[1]>e[1]+t[1]*(r.moss??.62)&&Rn(a,5,i)<.7?f.MOSS:Rn(a,14)>.9?f.STONED:void 0}),dc=(n,e,t,i,r=f.MAGIC)=>n.ell(e,[t,t,t],r,{group:i,extra:!0}),N_={"broken-arch":{desc:"a broken arch, one side fallen, a rune on its keystone",glow:!0,split:null,build(n,e){for(const t of[-1,1])st(n,[t,t<0?1:.7,0],[.22,t<0?1:.7,.25],1+(t>0?1:0),e);for(let t=0;t<=6;t++){const i=Math.PI*(1-t/9),r=[Math.cos(i)*1,2+Math.sin(i)*.7,0];st(n,r,[.17,.14,.25],3+t%2,e,{dir:[-Math.sin(i),Math.cos(i),0],courses:0,paint:t===4?(a=>Math.abs(a[0]-r[0])<.05&&Math.abs(a[1]-r[1])<.08?f.RUNE:qt(e)(a)):qt(e)})}for(let t=0;t<4;t++)st(n,[1.3+t*.3,.14,.4+Lt(t)*.5],[.17,.13,.22],6+t,e,{dir:[1,.3*(Lt(t,2)-.5),Lt(t,3)-.5],courses:0});e&&(nn(n,[-1.15,.1,.26],[-.9,1.9,.26],12,1),Qn(n,14,1.8,14,2))}},"tower-stump":{desc:"a fallen tower's stump, a spiral stair climbing round its inside",split:2,build(n,e){for(let t=0;t<14;t++){const i=t/14*Math.PI*2,r=1+(Math.sin(i*2+1)*.5+.5)*1.6*(i>3.6&&i<5.4?1:.55);i>.9&&i<2||st(n,[Math.cos(i)*1.05,r/2,Math.sin(i)*.95],[.25,r/2,.14],1+t%3,e,{dir:[-Math.sin(i),0,Math.cos(i)]})}for(let t=0;t<9;t++){const i=3.2+t*.42,r=.15+t*.26;st(n,[Math.cos(i)*.7,r,Math.sin(i)*.6],[.24,.06,.12],5,e,{dir:[Math.cos(i),0,Math.sin(i)],courses:0})}for(let t=0;t<3;t++)st(n,[.6+t*.35,.14,1.1],[.22,.13,.2],7,e,{dir:[1,0,.4*t],courses:0});e&&(nn(n,[-1.05,.1,-.4],[-1,2.3,-.5],10,3),nn(n,[.9,.1,-.6],[.95,1.7,-.55],11,4),n.ell([0,.2,0],[.55,.2,.5],f.LEAF,{group:12,rough:.04}))}},colonnade:{desc:"a colonnade, two columns standing and the rest toppled",split:null,build(n,e){st(n,[0,.08,0],[2.2,.08,.55],1,e,{courses:0});for(const[t,i]of[[-1.7,1.9],[-.6,1.4]])n.seg([t,.16,0],[t,i,0],.18,.17,f.STONE,{group:2,rough:.01,paint:r=>Math.abs(Math.sin(Math.atan2(r[2],r[0]-t)*8))<.15?f.STONED:qt(e,0)(r)}),st(n,[t,i+.07,0],[.26,.07,.26],3,e,{courses:0});for(const[t,i,r]of[[.6,.55,.3],[1.6,.4,-.4]])n.seg([t-Math.cos(r)*.7,.2,i-Math.sin(r)*.7],[t+Math.cos(r)*.7,.2,i+Math.sin(r)*.7],.18,.18,f.STONE,{group:4,paint:qt(e,0)});st(n,[-1.15,2,0],[.75,.1,.28],5,e,{courses:0}),e&&(nn(n,[-1.7,.2,.18],[-1.65,1.8,.18],8,5),Qn(n,16,2.2,10,6))}},"stone-ring":{desc:"a ring of standing-stone stubs",split:null,build(n,e){for(let t=0;t<9;t++){const i=t/9*Math.PI*2,r=.3+Lt(t,9)*(t%3===0?1.2:.45);st(n,[Math.cos(i)*1.7,r/2,Math.sin(i)*1.35],[.2,r/2,.14],1+t%4,e,{dir:[-Math.sin(i),.1*(Lt(t)-.5),Math.cos(i)],courses:0,round:.07})}st(n,[0,.1,0],[.55,.1,.35],6,e,{courses:0,round:.05}),e&&Qn(n,20,2,10,7)}},"chapel-wall":{desc:"a ruined chapel wall with an empty pointed window, moonlight caught in it",glow:!0,split:2.4,build(n,e){st(n,[0,1.4,0],[1.4,1.4,.18],1,e,{paint:t=>{const i=t[0],r=t[1];return Math.abs(i)<.38&&r>1.1&&r<2.3-Math.abs(i)*.5?void 0:qt(e,5)(t)}}),n.box([0,1.6,0],[.33,.55,.3],f.NOSE,{group:1,cut:!0}),n.ell([0,1.5,-.05],[.3,.5,.02],f.MAGIC2,{group:2,extra:!0,paint:t=>Rn(t,18)<.5?f.MAGIC:void 0});for(const[t,i]of[[-1.55,2.6],[1.5,1.6]])st(n,[t,i/2,0],[.22,i/2,.26],3,e);for(let t=0;t<5;t++)st(n,[-1.2+t*.6,.12,.55+Lt(t)*.3],[.18,.12,.16],4,e,{courses:0,dir:[1,0,Lt(t,5)-.5]});e&&(nn(n,[-1.2,.1,.2],[-.6,2.6,.2],6,8),nn(n,[1,.1,.2],[1.2,2,.2],7,9))}},well:{desc:"an old well with a broken winch, fireflies over the water",glow:!0,split:null,build(n,e){for(let t=0;t<12;t++){const i=t/12*Math.PI*2;st(n,[Math.cos(i)*.55,.32,Math.sin(i)*.5],[.15,.32,.1],1+t%2,e,{dir:[-Math.sin(i),0,Math.cos(i)],courses:3})}n.ell([0,.55,0],[.42,.02,.38],f.WATER,{group:3});for(const t of[-.6,.6])n.box([t,1,0],[.06,.5,.06],f.WOOD,{group:4,round:.02});n.seg([-.6,1.4,0],[.1,1.25,.05],.04,.04,f.WOOD,{group:5}),n.seg([.1,1.25,.05],[0,.85,.1],.01,.01,f.STRAW,{group:5});for(let t=0;t<4;t++)dc(n,[(Lt(t)-.5)*.8,.8+Lt(t,2)*.7,(Lt(t,3)-.5)*.6],.03,10+t,t%2?f.MAGIC:f.MAGIC2);e&&(nn(n,[-.55,.05,.5],[-.4,.62,.5],15,10),Qn(n,10,1,16,11))}},watchtower:{desc:"a crumbled watchtower, tall enough to see from the treetops",split:2.6,build(n,e){st(n,[0,1.2,0],[.7,1.2,.7],1,e,{paint:t=>Math.abs(t[1]-1.9)<.16&&Math.abs(t[0])<.07&&t[2]>.6?f.NOSE:qt(e,5)(t)});for(const[t,i,r]of[[-.5,-.5,1.3],[0,-.5,1],[.5,-.5,.7],[-.5,0,.9],[-.5,.5,.5],[.5,0,.3]])st(n,[t,2.4+r/2,i],[.2,r/2,.2],1,e);n.box([0,.55,.7],[.25,.45,.1],f.NOSE,{group:1,cut:!0});for(let t=0;t<6;t++)st(n,[.5+Lt(t)*1.2,.13,-.3+Lt(t,4)*1.2],[.17,.12,.15],2+t%2,e,{courses:0,dir:[1,0,Lt(t,5)-.5]});e&&(nn(n,[-.7,.1,.3],[-.7,2.4,.2],4,12),nn(n,[.3,.1,.72],[.5,1.8,.72],5,13),In(n,[.1,2.6,-.2],[.45,.3,.4],6))}},"sunken-stair":{desc:"a stairway going down into the ground, a dark doorway at its foot",split:null,build(n,e){for(const t of[-.6,.6])st(n,[0,.2,t],[1.1,.2,.12],1,e,{courses:2});for(let t=0;t<5;t++)st(n,[.8-t*.32,.3-t*.07,0],[.16,.04,.5],2,e,{courses:0});n.box([-.55,.08,0],[.28,.1,.48],f.NOSE,{group:3}),st(n,[-1.1,.55,0],[.15,.55,.62],4,e),st(n,[-1.05,1.15,0],[.2,.1,.7],5,e,{courses:0}),e&&(Qn(n,12,1.6,10,14),nn(n,[-1,1.2,.5],[-.9,.3,.62],13,15))}},"statue-head":{desc:"a toppled giant statue head, its eyes still faintly lit",glow:!0,split:null,build(n,e){const t=[0,.8,0],i=.62,r=(a,s)=>[t[0]+s,t[1]+a,t[2]+i];n.ell(t,[.8,1,.7],f.STONE,{group:1,rough:.012,dir:[1,.25,0],paint:qt(e,0)}),n.ell(r(.3,0),[.62,.14,.16],f.STONE,{group:2,paint:qt(e,0)});for(const a of[-.26,.26])n.ell(r(.12,a),[.15,.09,.1],f.STONED,{group:1,cut:!0}),dc(n,r(.12,a),.05,3+(a>0?1:0),f.MAGIC);n.ell(r(-.08,0),[.11,.24,.14],f.STONE,{group:5,paint:qt(e,0)}),n.ell(r(-.42,0),[.3,.07,.08],f.STONE,{group:6,paint:a=>Math.abs(a[1]-(t[1]-.42))<.015?f.STONED:qt(e,0)(a)});for(const[a,s]of[[-.55,.75],[0,.95],[.5,.8],[-.7,.3],[.75,.3]])n.ell([t[0]+a,t[1]+s,t[2]-.2],[.3,.25,.45],f.STONE,{group:7,rough:.02,paint:qt(e,0)});n.ell([t[0],.05,t[2]+.2],[1,.1,.8],f.STONE,{group:8,paint:qt(e,0)}),e&&(Qn(n,14,1.8,10,16),In(n,A.add(t,[-.2,.95,-.2]),[.5,.25,.45],6))}},hearth:{desc:"a collapsed cottage: its hearth and chimney still standing",split:2.6,build(n,e){st(n,[0,1.6,-.2],[.45,1.6,.35],1,e),n.box([0,.45,.1],[.3,.3,.3],f.NOSE,{group:1,cut:!0});for(const[t,i,r,a,s]of[[-1.1,.4,.9,.5,0],[1,.5,.7,.35,0],[-1.9,-.2,.12,.35,1]])st(n,[t,a/2,i],s?[.12,a/2,.7]:[r,a/2,.12],2,e);for(let t=0;t<4;t++)n.seg([-.5+t*.4,.08,.9],[.2+t*.5,.3,.3+t*.1],.05,.05,f.BARKD,{group:3});e&&(nn(n,[-.4,.1,.16],[-.3,2.8,.16],5,17),Qn(n,14,1.8,10,18))}},"bridge-span":{desc:"an old bridge span going nowhere, one arch over nothing",split:null,build(n,e){st(n,[-.9,.7,0],[.35,.7,.5],1,e),st(n,[.95,.55,0],[.3,.55,.5],2,e);for(let t=0;t<=8;t++){const i=t/8,r=Math.PI*(1-i),a=[Math.cos(r)*.85,.9+Math.sin(r)*.55,0];st(n,a,[.14,.12,.5],3+t%2,e,{dir:[-Math.sin(r),Math.cos(r),0],courses:0})}st(n,[-.1,1.62,0],[1.25,.1,.55],5,e,{courses:0,dir:[1,-.08,0]});for(const t of[-.5,.5])st(n,[-.2,1.85,t],[1,.14,.06],6,e,{courses:0});e&&(nn(n,[-1.2,.1,.5],[-1,1.6,.55],8,19),Qn(n,10,1.6,10,20))}},gateway:{desc:"an overgrown gateway, two posts and a rusted gate, a rune glowing on one post",glow:!0,split:null,build(n,e){for(const t of[-.9,.9])st(n,[t,.9,0],[.22,.9,.22],1+(t>0?1:0),e,{paint:t<0?(i=>i[2]>.2&&Math.abs(i[1]-1.1)<.14&&Math.abs(i[0]-t)<.06?f.RUNE:qt(e,5)(i)):qt(e,5)}),n.ell([t,1.9,0],[.18,.14,.18],f.STONE,{group:3,paint:qt(e,0)});for(let t=0;t<6;t++)n.seg([-.65+t*.12,.1,.1+t*.06],[-.65+t*.12,1.2,.1+t*.06],.015,.015,f.SHADES,{group:4});for(const t of[.25,1.1])n.seg([-.65,t,.1],[-.05,t,.4],.018,.018,f.SHADES,{group:4});for(const t of[-1,1])for(let i=0;i<3;i++)st(n,[t*(1.3+i*.35),.3-i*.08,0],[.17,.3-i*.08,.14],5,e);e&&(nn(n,[.75,.05,.22],[.85,1.9,.22],7,21),nn(n,[-.9,1.8,.22],[-.3,1,.3],8,22),Qn(n,12,1.6,10,23))}}},U_={pebbles:{desc:"a cluster of fist-sized stones",build(n){for(let e=0;e<7;e++)rn(n,[(Lt(e)-.5)*.6,.04,(Lt(e,2)-.5)*.4],[.07+Lt(e,3)*.05,.05,.07],1+e,{moss:.8})}},pair:{desc:"two small rocks",build(n){rn(n,[-.15,.12,0],[.22,.15,.2],1),rn(n,[.2,.08,.12],[.14,.1,.13],2)}},rock:{desc:"a knee-high rock",build(n){rn(n,[0,.22,0],[.45,.3,.38],1,{dir:[1,.15,.2]})}},split:{desc:"a rock split in two, a seedling in the crack",build(n){rn(n,[-.28,.35,0],[.3,.45,.45],1,{dir:[1,.3,0]}),rn(n,[.3,.33,0],[.3,.42,.45],2,{dir:[1,-.3,0]}),n.seg([.02,.2,.1],[0,.6,.1],.015,.01,f.TRUNK,{group:3}),In(n,[0,.62,.1],[.1,.07,.1],4)}},boulder:{desc:"a big boulder",build(n){rn(n,[0,.55,0],[.85,.75,.7],1,{dir:[1,.1,.3]}),rn(n,[.7,.15,.5],[.22,.15,.2],2)}},"great-boulder":{desc:"a great mossy boulder, a landmark",build(n){rn(n,[0,.9,0],[1.4,1.15,1.1],1,{dir:[1,.2,.1],moss:.2}),rn(n,[-1.1,.3,.6],[.4,.35,.35],2),rn(n,[1.2,.2,.5],[.3,.22,.28],3)}},slab:{desc:"a flat slab of rock",build(n){n.box([0,.12,0],[1,.12,.7],f.STONE,{round:.08,rough:.02,group:1,dir:[1,.04,.2],paint:e=>e[1]>.2&&Rn(e,6)<.3?f.MOSS:Rn(e,14)>.9?f.STONED:void 0})}},"standing-rock":{desc:"a tall natural standing rock",build(n){rn(n,[0,.8,0],[.35,.85,.3],1,{moss:.8}),rn(n,[.35,.1,.25],[.15,.1,.14],2)}}},F_={"spiral-tree":{desc:"a tree whose trunk twists in a spiral",split:2.4,build(n){const e=[];for(let t=0;t<=10;t++){const i=t/10,r=i*Math.PI*4;e.push([Math.cos(r)*.35*(1-i*.4),i*3,Math.sin(r)*.3,.2-i*.12])}un(n,e,1),In(n,[0,3.2,0],[.9,.6,.8],2)}},"loop-tree":{desc:"a tree grown into a loop",split:2.4,build(n){const e=[[0,0,0,.22],[.1,.9,0,.18]];for(let t=0;t<=10;t++){const i=-Math.PI/2+t/10*Math.PI*2;e.push([.1+Math.cos(i)*.55+t*.02,1.45+Math.sin(i)*.55,0,.15])}e.push([.3,2.6,0,.1]),un(n,e,1),In(n,[.3,2.9,0],[.75,.5,.65],2)}},"split-tree":{desc:"a tree split by lightning, both halves still leafing",split:2,build(n){un(n,[[0,0,0,.3],[0,.9,0,.26]],1),un(n,[[-.05,.9,0,.18],[-.6,1.9,0,.13],[-1,2.6,0,.07]],2),un(n,[[.05,.9,0,.18],[.55,1.8,.05,.13],[.9,2.4,.05,.07]],3),n.ell([0,1,.05],[.08,.25,.2],f.BARKD,{group:1,cut:!0}),In(n,[-1,2.7,0],[.6,.45,.5],4),In(n,[.95,2.5,.05],[.55,.4,.5],5)}},"door-tree":{desc:"a fat old tree with a little round door in it, a lit window above",glow:!0,split:2.3,build(n){n.ell([0,1,0],[.8,1.1,.75],f.TRUNK,{group:1,rough:.02,paint:e=>e[2]>.5&&Math.hypot(e[0],e[1]-.45)<.3&&e[1]>.2?Math.hypot(e[0],e[1]-.45)<.25?Math.abs(e[0]%.1)<.015?f.BARKD:f.ACCENT:f.BARKD:e[2]>.45&&Math.hypot(e[0]-.3,e[1]-1.3)<.13?Math.abs(e[0]-.3)<.015||Math.abs(e[1]-1.3)<.015?f.BARKD:f.GLOW:To(e)}),n.ell([.12,.45,.72],[.03,.03,.03],f.FRAME,{group:2}),In(n,[0,2.4,-.1],[1.1,.7,.9],3);for(let e=0;e<5;e++){const t=e/5*Math.PI*2;un(n,[[Math.cos(t)*.6,.2,Math.sin(t)*.55,.15],[Math.cos(t)*1.1,.02,Math.sin(t)*1,.05]],4)}}},"mushroom-tree":{desc:"an enormous mushroom, tall as a tree",split:2.2,build(n){n.seg([0,0,0],[.1,2.4,0],.3,.22,f.CLOTH,{group:1,paint:e=>e[1]>2&&e[1]<2.15?f.BELLY:void 0}),n.ell([.1,2.55,0],[1.3,.45,1.15],f.ACCENT,{group:2,rough:.01,paint:e=>e[1]<2.35?f.BODY2:Rn(e,8)<.18?f.BELLY:void 0}),n.ell([.1,2.35,0],[1.2,.08,1.05],f.BODY2,{group:3,paint:e=>Math.abs(Math.sin(Math.atan2(e[2],e[0]-.1)*20))<.3?f.STRAW:void 0})}},"root-tree":{desc:"an upside-down-looking tree, its roots raised high like a crown",split:2,build(n){un(n,[[0,0,0,.35],[0,1.6,0,.25]],1);for(let e=0;e<7;e++){const t=e/7*Math.PI*2;un(n,[[0,1.6,0,.16],[Math.cos(t)*.7,2.2+Lt(e)*.3,Math.sin(t)*.6,.1],[Math.cos(t)*1.2,2.5+Lt(e,2)*.4,Math.sin(t)*1,.04]],2+e%2)}for(let e=0;e<4;e++){const t=e/4*Math.PI*2+.4;un(n,[[Math.cos(t)*.25,.3,Math.sin(t)*.25,.14],[Math.cos(t)*.6,.02,Math.sin(t)*.55,.05]],4)}}},"stone-lifter":{desc:"a tree that has lifted great stones up in its roots",split:2.4,build(n){un(n,[[0,.6,0,.3],[0,2,0,.22],[.1,2.8,0,.12]],1);for(let e=0;e<6;e++){const t=e/6*Math.PI*2;un(n,[[Math.cos(t)*.2,.6,Math.sin(t)*.2,.15],[Math.cos(t)*.6,.45,Math.sin(t)*.55,.12],[Math.cos(t)*.9,0,Math.sin(t)*.8,.07]],2)}for(const[e,t,i]of[[.5,.45,.9],[-.5,.4,1.1],[.15,-.5,.8]])rn(n,[e,i,t],[.3,.24,.26],3);In(n,[.1,3,0],[1,.6,.85],4)}},"ring-tree":{desc:"a hollow ring of a tree you could fly through",split:null,build(n){for(let e=0;e<=16;e++){const t=e/16*Math.PI*2,i=[Math.cos(t)*1.2,1.35+Math.sin(t)*1.2,0];n.ell(i,[.3,.3,.3],f.TRUNK,{group:1,rough:.02,paint:To})}un(n,[[-.6,0,.2,.3],[-.5,.3,.1,.3]],2),un(n,[[.6,0,.2,.3],[.5,.3,.1,.3]],2);for(const[e,t]of[[-.9,2.3],[.3,2.65],[1.1,2]])In(n,[e,t,-.1],[.45,.3,.35],3)}}},O_=[...Object.entries(N_).map(([n,e])=>({id:n,family:"ruins",size:1.15,variants:2,...e})),...Object.entries(U_).map(([n,e])=>({id:n,family:"rocks",size:1,variants:1,split:null,...e})),...Object.entries(F_).map(([n,e])=>({id:n,family:"freak",size:1.2,variants:1,...e}))];Object.fromEntries(O_.map(n=>[n.id,n]));const B_=[{k:"ambientHue",g:"Night light",label:"Twilight hue",min:0,max:1,step:.01,v:.68,hue:!0},{k:"ambient",g:"Night light",label:"Twilight brightness",min:.05,max:.6,step:.01,v:.22},{k:"moon",g:"Night light",label:"Moonlight",min:0,max:1,step:.01,v:.3},{k:"moonHue",g:"Night light",label:"Moon hue",min:0,max:1,step:.01,v:.58,hue:!0},{k:"glowHue",g:"Night light",label:"Witch glow hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"glowSat",g:"Night light",label:"Witch glow colour",min:0,max:1,step:.01,v:.35},{k:"glowRadius",g:"Night light",label:"Witch glow reach",min:30,max:200,step:5,v:110},{k:"glowPower",g:"Night light",label:"Witch glow strength",min:.3,max:2.5,step:.05,v:1.4},{k:"bands",g:"Shading",label:"Light steps",min:2,max:7,step:1,v:3},{k:"dither",g:"Shading",label:"Dithering",min:0,max:1,step:.05,v:.35},{k:"round",g:"Shading",label:"Roundness",min:.2,max:1.5,step:.05,v:.9},{k:"outline",g:"Shading",label:"Plant outline",options:["none","dark","tinted"],v:"none"},{k:"cOutline",g:"Shading",label:"Creature outline",options:["dark","tinted","none"],v:"dark"},{k:"shafts",g:"Night light",label:"Moonbeams",min:0,max:1,step:.05,v:.3},{k:"areaContrast",g:"Colour",label:"Difference between areas",min:0,max:1,step:.05,v:.6},{k:"sat",g:"Colour",label:"Saturation",min:.2,max:1.3,step:.01,v:.9},{k:"leafHue",g:"Colour",label:"Leaf hue",min:0,max:1,step:.01,v:.3,hue:!0},{k:"leafVariety",g:"Colour",label:"Leaf colour variety",min:0,max:1,step:.05,v:.3},{k:"trunkHue",g:"Colour",label:"Bark hue",min:0,max:1,step:.01,v:.07,hue:!0},{k:"groundHue",g:"Colour",label:"Ground hue",min:0,max:1,step:.01,v:.27,hue:!0},{k:"groundVal",g:"Colour",label:"Ground brightness",min:.15,max:.7,step:.01,v:.4},{k:"pixel",g:"Shading",label:"Pixel size",min:1,max:5,step:1,v:3},{k:"treeSize",g:"Trees",label:"Tree height",min:.5,max:1.5,step:.05,v:.85},{k:"crownWidth",g:"Trees",label:"Crown width",min:1,max:4,step:.1,v:3},{k:"clearing",g:"Trees",label:"Clearing size",min:0,max:1,step:.05,v:.55},{k:"depth",g:"Map",label:"Border detail (fractal layers)",min:0,max:6,step:1,v:4},{k:"areaScale",g:"Map",label:"Area size (screens)",min:.6,max:2,step:.05,v:1},{k:"areaTypes",g:"Map",label:"Area types",min:4,max:30,step:1,v:30},{k:"density",g:"Trees",label:"Foliage density",min:.2,max:1,step:.05,v:.55},{k:"clump",g:"Trees",label:"Clumpiness",min:0,max:1,step:.05,v:.6},{k:"gnarl",g:"Trees",label:"Gnarliness",min:0,max:1,step:.05,v:.5},{k:"roots",g:"Trees",label:"Roots",min:0,max:1,step:.05,v:.6},{k:"bark",g:"Trees",label:"Bark texture",min:0,max:1,step:.05,v:.6},{k:"trees",g:"Trees",label:"Tree density",min:.2,max:2,step:.05,v:1},{k:"wBroad",g:"Tree mix",label:"Gnarled broadleaf",min:0,max:1,step:.05,v:.8},{k:"wFir",g:"Tree mix",label:"Fir",min:0,max:1,step:.05,v:.6},{k:"wWillow",g:"Tree mix",label:"Willow",min:0,max:1,step:.05,v:.5},{k:"wBirch",g:"Tree mix",label:"Birch",min:0,max:1,step:.05,v:.5},{k:"wPalm",g:"Tree mix",label:"Tree fern",min:0,max:1,step:.05,v:.3},{k:"wFlat",g:"Tree mix",label:"Flat-crowned",min:0,max:1,step:.05,v:.5},{k:"bushes",g:"Undergrowth",label:"Bushes and shrubs",min:0,max:120,step:1,v:55},{k:"bushSize",g:"Undergrowth",label:"Bush size",min:.5,max:1.8,step:.05,v:1},{k:"flowers",g:"Undergrowth",label:"Flowers",min:0,max:1,step:.05,v:.3},{k:"cSat",g:"Creatures",label:"Creature saturation",min:.1,max:1,step:.01,v:.6},{k:"cVal",g:"Creatures",label:"Creature brightness",min:.4,max:1,step:.01,v:.85},{k:"head",g:"Creatures",label:"Baby head size",min:.3,max:.6,step:.01,v:.44},{k:"eye",g:"Creatures",label:"Eye size",min:.5,max:2,step:.05,v:1},{k:"legs",g:"Creatures",label:"Leg length",min:.5,max:1.8,step:.05,v:1},{k:"long",g:"Creatures",label:"Body length",min:.7,max:1.5,step:.05,v:1},{k:"size",g:"Creatures",label:"Baby size (px)",min:5,max:14,step:1,v:8},{k:"growth",g:"Creatures",label:"Legend vs baby height",min:5,max:25,step:1,v:20},{k:"magicHue",g:"Creatures",label:"Magic glow hue",min:0,max:1,step:.01,v:.5,hue:!0},{k:"fur",g:"Creatures",label:"Stripes and spots",min:0,max:1,step:.05,v:.5},{k:"cloakHue",g:"Witch",label:"Jacket hue",min:0,max:1,step:.01,v:.72,hue:!0},{k:"hairHue",g:"Witch",label:"Hair hue",min:0,max:1,step:.01,v:.01,hue:!0},{k:"hatHue",g:"Witch",label:"Hat hue",min:0,max:1,step:.01,v:.74,hue:!0},{k:"topHue",g:"Witch",label:"Top hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"jeansHue",g:"Witch",label:"Jeans hue",min:0,max:1,step:.01,v:.6,hue:!0},{k:"shoeHue",g:"Witch",label:"Sneakers hue",min:0,max:1,step:.01,v:0,hue:!0},{k:"phonesHue",g:"Witch",label:"Headphones hue",min:0,max:1,step:.01,v:.92,hue:!0}];function z_(){const n={};return B_.forEach(e=>n[e.k]=e.v),n}const k_={broad:Lc,fir:Fo,willow:Pc,birch:Dc,flat:Ic};function G_(n,e,t,i,r){const a=k_[e.type],s={...t,leafHue:n.leaf+(e.dark?.05:0),gnarl:e.gnarl??t.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},o=a(i,s,t.treeSize*r*(e.scale||1)*be(i,.9,1.1)),c=Oo(i,s,a);return e.dark&&(c[f.LEAF]=c[f.LEAF3],c[f.LEAF3]=ve(n.leaf+.05,.7,.22)),c[f.NOSE]=[20,16,24],c[f.GLINT]=[235,235,240],{parts:Oh(o),colours:c}}function H_(n,e,t,i,r){const a=kn[t].id,s=Yr.find(p=>p.id===a),o=Wh(a,n,{K:i,makeCanvas:r}),c=[],l=p=>c.push(p)-1,u={big:[],small:[],walls:[],set:null},d=(p,_)=>fr(p,_,n,"none",r),h=(p,_)=>{const{parts:x,colours:g}=G_(s,p,n,Br(e*13+t*101+_*7+1),i);return{bot:l(d(x.bot,g)),top:l(d(x.top,g))}};s.big.forEach(([p,_],x)=>{if(p!=="tree"){u.big.push({bot:l(o.big[x].sp),top:null});return}const g=Math.max(1,Math.round(Nc/s.big.length));for(let m=0;m<g;m++)u.big.push(h(_,x*17+m))}),s.small.forEach(([p,_],x)=>u.small.push(p==="tree"?h(_,500+x):{bot:l(o.small[x].sp),top:null}));for(const p of o.walls)u.walls.push(l(p.sp));return o.setPiece&&(u.set=s.set?.[0]==="tree"?h(s.set[1],900):{bot:l(o.setPiece.sp),top:null}),{sprites:c,layout:u,floor:o.floor.sp}}function V_(n,e,t){const i=[];for(let r=0;r<3;r++)for(let a=0;a<2;a++)i.push(fr(Dh(e,r,a,n),Ch(e,n),n,n.cOutline,t));return i}const W_=(n,e)=>n*2+e;function Ga(n,e,t){return n.getContext("2d").getImageData(0,0,e,t).data}function Ro(n,e=2048){const i=[];let r=0,a=0,s=0,o=1;for(const h of n)r+h.w+1>e&&(r=0,a+=s+1,s=0),i.push({x:r,y:a}),r+=h.w+1,s=Math.max(s,h.h),o=Math.max(o,r);const c=Math.max(1,a+s),l=new Uint8Array(o*c*4),u=new Uint8Array(o*c*4),d=n.map((h,p)=>{const _=i[p],x=Ga(h.A,h.w,h.h),g=Ga(h.N,h.w,h.h);for(let m=0;m<h.h;m++){const M=m*h.w*4,E=((_.y+m)*o+_.x)*4;l.set(x.subarray(M,M+h.w*4),E),u.set(g.subarray(M,M+h.w*4),E)}return{uv:[_.x/o,_.y/c,(_.x+h.w)/o,(_.y+h.h)/c],w:h.w,h:h.h}});return{albedo:l,normal:u,width:o,height:c,frames:d}}function X_(n,e){if(n.kind==="creature")return{px:Ro(V_(n.style,n.id,e),1024)};const{sprites:t,layout:i,floor:r}=H_(n.style,n.seed,n.id,n.K,e);return{px:Ro(t),layout:i,floor:{albedo:new Uint8Array(Ga(r.A,r.w,r.h)),normal:new Uint8Array(Ga(r.N,r.w,r.h)),w:r.w,h:r.h}}}function fc(n,e,t){const i=new lr(n,e,t,xn,hn);return i.magFilter=Ot,i.minFilter=Ot,i.generateMipmaps=!1,i.flipY=!1,i.colorSpace=wn,i.needsUpdate=!0,i}function Eu(n){return{albedo:fc(n.albedo,n.width,n.height),normal:fc(n.normal,n.width,n.height),frames:n.frames}}const pc=(n,e=2048)=>Eu(Ro(n,e));class Y_{constructor(e,t,i){if(this.style=e,this.seed=t,this.K=2/i,this.witch=pc([fr(nh(),qu(e),e,"dark")]),this.stones=pc([0,1,2,3].map(r=>this.stone(r))),this.useWorkers=typeof Worker<"u"&&typeof OffscreenCanvas<"u",this.useWorkers){const r=Math.max(1,Math.min(3,(navigator.hardwareConcurrency||2)-1));try{for(let a=0;a<r;a++){const s=new Worker(new URL(""+new URL("artWorker-DhYVEnyw.js",import.meta.url).href,import.meta.url),{type:"module"}),o={w:s,busy:!1};s.onmessage=c=>{o.busy=!1,o.job=void 0,this.receive(c.data),this.dispatch()},s.onerror=()=>{this.useWorkers=!1,o.job&&this.queue.unshift(o.job),o.busy=!1,o.job=void 0},this.workers.push(o)}}catch{this.useWorkers=!1}}}style;seed;types=new Map;creatures=new Map;queue=[];inFlight=new Set;workers=[];useWorkers;witch;stones;K;version=0;onFloor=()=>{};stone(e){const t=Br(this.seed*3+e),i=5+Math.floor(t()*3),r=7+Math.floor(t()*5),a=new on(i+2,r+1);return a.ellipse((i+2)/2,r/2+1,i/2,r/2+.5,f.BODY,{round:this.style.round}),a.ellipse((i+2)/2-1,r/2,i/3,r/3,f.BODY2,{round:this.style.round,onlyOn:new Set([f.BODY]),density:.5,seed:e}),fr(a,{[f.BODY]:[178,174,162],[f.BODY2]:[140,138,130]},this.style,"dark")}key=e=>e.kind+":"+e.id;ask(e){const t=this.key(e);this.inFlight.has(t)||(this.inFlight.add(t),this.queue.push(e),this.dispatch())}dispatch(){if(this.useWorkers)for(const e of this.workers)e.busy||!this.queue.length||(e.busy=!0,e.job=this.queue.shift(),e.w.postMessage(e.job))}receive(e){if(!e.result){console.warn("art worker failed, drawing on the page:",e.error),this.useWorkers=!1,this.queue.unshift(e.job);return}const t=Eu(e.result.px);e.job.kind==="type"?(this.types.set(e.job.id,{atlas:t,layout:e.result.layout}),e.result.floor&&this.onFloor(e.job.id,e.result.floor)):this.creatures.set(e.job.id,{atlas:t,frame:W_}),this.inFlight.delete(this.key(e.job)),this.version++}typeArt(e){const t=this.types.get(e);return t||this.ask({kind:"type",id:e,style:this.style,seed:this.seed,K:this.K}),t}creatureArt(e){const t=this.creatures.get(e);return t||this.ask({kind:"creature",id:e,style:this.style}),t}prefetchType(e){this.types.has(e)||this.typeArt(e)}get pending(){return this.inFlight.size}work(e){if(this.useWorkers)return;const t=performance.now();let i=0;for(;this.queue.length&&(i===0||performance.now()-t<e);){const r=this.queue.shift();this.receive({job:r,result:X_(r,(a,s)=>{const o=document.createElement("canvas");return o.width=a,o.height=s,o})}),i++}}whenIdle(){return new Promise(e=>{const t=()=>{this.work(50),this.pending?setTimeout(t,30):e()};t()})}}const Ft={uAmb:{value:new X},uMoon:{value:new X},uMoonDir:{value:new X(-.45,.75,.5).normalize()},uMoonBeam:{value:new X},uBands:{value:4},uDither:{value:.35},uShafts:{value:.3},uShaftScale:{value:1},uGlowPos:{value:new X},uGlowRgb:{value:new X},uGlowR:{value:8},uGlowPower:{value:1.4},uHazeCentre:{value:new Ve},uHazeRange:{value:new Ve(70,200)},uHazeColour:{value:new X},uTime:{value:0}};function K_(n,e,t){const i=(r,a)=>new X(r[0]/255*a,r[1]/255*a,r[2]/255*a);Ft.uAmb.value.copy(i(ve(n.ambientHue,.55,1),n.ambient)),Ft.uMoon.value.copy(i(ve(n.moonHue,.35,1),n.moon)),Ft.uMoonBeam.value.copy(i(ve(n.moonHue,.35,1),n.shafts*.25)),Ft.uBands.value=n.bands,Ft.uDither.value=n.dither*.5,Ft.uShafts.value=n.shafts,Ft.uShaftScale.value=t*2,Ft.uGlowRgb.value.copy(i(ve(n.glowHue,n.glowSat,1),1)),Ft.uGlowR.value=e,Ft.uGlowPower.value=n.glowPower,Ft.uHazeColour.value.copy(i(ve(n.ambientHue,.45,1),.16))}const $a=`
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
`,Ri=2,Ht=32,Li=8,q_=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`,Z_=`
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
${$a}
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
`;class $_{constructor(e,t,i){this.map=e;const r=e.extent,a=r.maxX-r.minX,s=r.maxZ-r.minZ,o=Math.ceil(a*Ri/Ht)*Ht,c=Math.ceil(s*Ri/Ht)*Ht;this.tilesX=o/Ht,this.tilesZ=c/Ht,this.filled=new Uint8Array(this.tilesX*this.tilesZ);const l=p=>(p.magFilter=p.minFilter=Ot,p.generateMipmaps=!1,p.colorSpace=wn,p.needsUpdate=!0,p);this.texture=l(new lr(new Uint8Array(o*c*4),o,c)),l(this.tile),this.floors=l(new lr(new Uint8Array(64*Li*48*4*4),64*Li,192));const u=Array.from({length:32},(p,_)=>new X(...kn[_]?.floor??[.25,.45,.4])),d=new $t({vertexShader:q_,fragmentShader:Z_,uniforms:{...Ft,uAreas:{value:this.texture},uExtent:{value:new Tt(r.minX,r.minZ,o/Ri,c/Ri)},uPixel:{value:i},uTypeFloor:{value:u},uFloorReady:{value:this.floorReady},uFloors:{value:this.floors},uTile:{value:new Ve(64,48)},uFloorsSize:{value:new Ve(64*Li,192)},uSat:{value:t.sat},uFloor:{value:new X(e.dancefloor.x,e.dancefloor.z,e.dancefloor.radius)},uCanopy:{value:new Tt},uClearing:{value:new Ve(e.tuning.clearingSize,e.tuning.clearingFalloff)}}}),h=new Wn(a+400,s+400);h.rotateX(-Math.PI/2),this.mesh=new en(h,d),this.mesh.position.set((r.minX+r.maxX)/2,0,(r.minZ+r.maxZ)/2)}map;mesh;texture;tile=new lr(new Uint8Array(Ht*Ht*4),Ht,Ht);filled;tilesX;tilesZ;initialised=!1;floorReady=new Array(32).fill(0);floors;pendingFloors=[];setCanopyShadow(e,t,i,r){this.mesh.material.uniforms.uCanopy.value.set(e,t,i,r)}setFloor(e,t){this.pendingFloors.push([e,t])}placeFloors(e){for(const[t,i]of this.pendingFloors){const r=this.mesh.material,a=r.uniforms.uTile.value;if(i.w!==a.x||i.h!==a.y)continue;const s=new lr(i.albedo,i.w,i.h);s.needsUpdate=!0,e.copyTextureToTexture(s,this.floors,null,new Ve(t%Li*i.w,Math.floor(t/Li)*i.h)),s.dispose(),this.floorReady[t]=1}this.pendingFloors=[]}fill(e,t,i,r,a){this.initialised||(e.initTexture(this.texture),e.initTexture(this.floors),this.initialised=!0),this.pendingFloors.length&&this.placeFloors(e);const s=this.map.extent,o=Ht/Ri,c=(t-s.minX)/o,l=(i-s.minZ)/o,u=Math.ceil(r/o),d=[];for(let _=Math.max(0,Math.floor(l)-u);_<=Math.min(this.tilesZ-1,Math.floor(l)+u);_++)for(let x=Math.max(0,Math.floor(c)-u);x<=Math.min(this.tilesX-1,Math.floor(c)+u);x++)this.filled[_*this.tilesX+x]||d.push([x,_,(x+.5-c)**2+(_+.5-l)**2]);d.sort((_,x)=>_[2]-x[2]);const h=performance.now();let p=0;for(const[_,x]of d){if(p>0&&performance.now()-h>a)break;this.fillTile(e,_,x),p++}return d.length-p}fillTile(e,t,i){const r=this.map.extent,a=this.tile.image.data;for(let s=0;s<Ht;s++)for(let o=0;o<Ht;o++){const c=r.minX+(t*Ht+o+.5)/Ri,l=r.minZ+(i*Ht+s+.5)/Ri,u=this.map.areaAt(c,l),d=(s*Ht+o)*4;a[d]=u.type,a[d+1]=Math.round(u.openness*255),a[d+2]=0,a[d+3]=255}this.tile.needsUpdate=!0,e.copyTextureToTexture(this.tile,this.texture,null,new Ve(t*Ht,i*Ht)),this.filled[i*this.tilesX+t]=1}dispose(){this.texture.dispose(),this.tile.dispose(),this.mesh.geometry.dispose(),this.mesh.material.dispose()}}const J_="varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",Q_=`
uniform sampler2D uScene; uniform float uThreshold; varying vec2 vUv;
void main() {
  vec3 c = texture2D(uScene, vUv).rgb;
  float l = max(c.r, max(c.g, c.b));
  gl_FragColor = vec4(c * smoothstep(uThreshold, uThreshold + 0.25, l), 1.0);
}`,j_=`
uniform sampler2D uSrc; uniform vec2 uStep; varying vec2 vUv;
void main() {
  vec3 c = texture2D(uSrc, vUv).rgb * 0.227;
  c += (texture2D(uSrc, vUv + uStep * 1.38).rgb + texture2D(uSrc, vUv - uStep * 1.38).rgb) * 0.316;
  c += (texture2D(uSrc, vUv + uStep * 3.23).rgb + texture2D(uSrc, vUv - uStep * 3.23).rgb) * 0.070;
  gl_FragColor = vec4(c, 1.0);
}`,ex=`
uniform sampler2D uScene, uBloom; uniform vec2 uLow; uniform float uBloomStrength; varying vec2 vUv;
void main() {
  vec2 p = (floor(vUv * uLow) + 0.5) / uLow;
  vec3 c = texture2D(uScene, p).rgb + texture2D(uBloom, vUv).rgb * uBloomStrength;
  gl_FragColor = vec4(min(c, vec3(1.0)), 1.0);
}`,tx=`
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
}`;function Dr(n,e,t,i=!1){const r=new vn(Math.max(1,n),Math.max(1,e),{minFilter:t,magFilter:t,depthBuffer:i,generateMipmaps:!1});return r.texture.colorSpace=wn,r}class nx{constructor(e,t){this.renderer=e,this.tuning=t,this.scene=Dr(1,1,It,!0);const i=(r,a)=>new $t({vertexShader:J_,fragmentShader:r,uniforms:a,depthTest:!1,depthWrite:!1});this.mats={bright:i(Q_,{uScene:{value:null},uThreshold:{value:.6}}),blur:i(j_,{uSrc:{value:null},uStep:{value:new Ve}}),composite:i(ex,{uScene:{value:null},uBloom:{value:null},uLow:{value:new Ve},uBloomStrength:{value:0}}),tilt:i(tx,{uSrc:{value:null},uTexel:{value:new Ve},uDir:{value:new Ve},uStrength:{value:0},uBand:{value:.4},uCentre:{value:.5}})},this.quad=new en(new Wn(2,2),this.mats.composite),this.quad.frustumCulled=!1}renderer;tuning;scene;bright=Dr(1,1,It);bloomB=Dr(1,1,It);a=Dr(1,1,It);b=Dr(1,1,It);quad;cam=new Jo(-1,1,1,-1,0,1);mats;low=new Ve(1,1);out=new Ve(1,1);get fullResolution(){return this.tuning.tiltShift.on&&this.tuning.tiltShift.where==="after"}resize(e,t,i,r){this.low.set(e,t),this.out.set(i,r),this.scene.setSize(e,t);const a=Math.max(1,Math.round(e/2)),s=Math.max(1,Math.round(t/2));this.bright.setSize(a,s),this.bloomB.setSize(a,s);const o=this.fullResolution?i:e,c=this.fullResolution?r:t;this.a.setSize(o,c),this.b.setSize(o,c)}pass(e,t,i){const r=this.mats[e];i(r.uniforms),this.quad.material=r,this.renderer.setRenderTarget(t),this.renderer.render(this.quad,this.cam)}render(e,t){const i=this.renderer,r=this.tuning;i.setRenderTarget(this.scene),i.render(e,t);const a=r.bloom.on&&r.bloom.strength>0;if(a){const d=this.bright.width,h=this.bright.height;this.pass("bright",this.bright,p=>{p.uScene.value=this.scene.texture,p.uThreshold.value=r.bloom.threshold});for(let p=0;p<2;p++)this.pass("blur",this.bloomB,_=>{_.uSrc.value=this.bright.texture,_.uStep.value.set(1/d,0)}),this.pass("blur",this.bright,_=>{_.uSrc.value=this.bloomB.texture,_.uStep.value.set(0,1/h)})}const s=r.tiltShift.on&&r.tiltShift.strength>0;if(this.pass("composite",s?this.a:null,d=>{d.uScene.value=this.scene.texture,d.uBloom.value=this.bright.texture,d.uLow.value.copy(this.low),d.uBloomStrength.value=a?r.bloom.strength:0}),!s)return;const o=this.a.width,c=this.a.height,l=this.fullResolution?this.out.y/this.low.y:1,u=d=>{d.uTexel.value.set(1/o,1/c),d.uStrength.value=r.tiltShift.strength*l,d.uBand.value=r.tiltShift.band,d.uCentre.value=1-r.tiltShift.centre};this.pass("tilt",this.b,d=>{u(d),d.uSrc.value=this.a.texture,d.uDir.value.set(1,0)}),this.pass("tilt",null,d=>{u(d),d.uSrc.value=this.b.texture,d.uDir.value.set(0,1)})}}const ix=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,rx=`
uniform float uStrength, uWind, uPixel;
varying vec3 vWorld;
${$a}
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
}`;class ax{constructor(e,t,i,r){this.height=t,this.mat=new $t({vertexShader:ix,fragmentShader:rx,uniforms:{...Ft,uStrength:{value:e},uWind:{value:i},uPixel:{value:r}},depthWrite:!1}),this.mesh=new en(new Wn(700,700).rotateX(-Math.PI/2),this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=2}height;mesh;mat;follow(e,t){this.mesh.position.set(e,this.height,t-150)}}const sx=`
attribute vec4 iShadow; // x, z, width, depth (metres)
varying vec2 vLocal;
varying vec3 vWorld;
void main() {
  vLocal = position.xz * 2.0;
  vec3 w = vec3(iShadow.x + position.x * iShadow.z, 0.03, iShadow.y + position.z * iShadow.w);
  vWorld = w;
  gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
}`,ox=`
uniform float uStrength;
varying vec2 vLocal;
varying vec3 vWorld;
${$a}
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
}`;class lx{mesh;geo=new fu;attr;capacity=0;constructor(e){const t=new Wn(1,1).rotateX(-Math.PI/2);this.geo.index=t.index,this.geo.setAttribute("position",t.getAttribute("position")),this.attr=this.grow(1024);const i=new $t({vertexShader:sx,fragmentShader:ox,uniforms:{...Ft,uStrength:{value:e}},depthWrite:!1});this.mesh=new en(this.geo,i),this.mesh.frustumCulled=!1,this.mesh.renderOrder=1}grow(e){return this.capacity=Math.max(e,this.capacity*2),this.attr=new lu(new Float32Array(this.capacity*4),4),this.attr.setUsage(eu),this.geo.setAttribute("iShadow",this.attr),this.attr}set(e){e.length>this.capacity&&this.grow(e.length);const t=this.attr.array;e.forEach((i,r)=>{t[r*4]=i.x,t[r*4+1]=i.z,t[r*4+2]=i.w,t[r*4+3]=i.d}),this.attr.needsUpdate=!0,this.geo.instanceCount=e.length,this.mesh.visible=e.length>0}}const sr={uRight:{value:new X(1,0,0)},uUp:{value:new X(0,1,0)},uFacing:{value:new X(0,0,1)},uTopFade:{value:0}},cx=`
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
`,ux=`
uniform sampler2D uAlbedo, uNormal;
uniform vec3 uRight, uUp, uFacing;
uniform float uTopFade, uUnlit;
varying vec2 vUv;
varying vec3 vWorld;
varying vec2 vFlags;
${$a}
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
`;class ya{constructor(e,t,i={}){this.atlas=e,this.metresPerPixel=t;const r=new Wn(1,1);r.translate(0,.5,0),this.geo=new fu,this.geo.index=r.index,this.geo.setAttribute("position",r.getAttribute("position")),this.geo.setAttribute("uv",r.getAttribute("uv")),this.pos=this.size=this.uvs=this.flags=void 0,this.grow(64);const a=new $t({vertexShader:cx,fragmentShader:ux,uniforms:{...Ft,...sr,uAlbedo:{value:e.albedo},uNormal:{value:e.normal},uUnlit:{value:i.unlit?1:0}},depthTest:!i.onTop,depthWrite:!i.onTop});this.mesh=new en(this.geo,a),this.mesh.frustumCulled=!1,i.onTop&&(this.mesh.renderOrder=10)}atlas;metresPerPixel;mesh;geo;pos;size;uvs;flags;capacity=0;count=0;grow(e){const t=Math.max(e,this.capacity*2),i=(r,a)=>{const s=new lu(new Float32Array(t*r),r);return s.setUsage(eu),a&&s.array.set(a.array),s};this.pos=i(3,this.pos),this.size=i(2,this.size),this.uvs=i(4,this.uvs),this.flags=i(2,this.flags),this.geo.setAttribute("iPos",this.pos),this.geo.setAttribute("iSize",this.size),this.geo.setAttribute("iUv",this.uvs),this.geo.setAttribute("iFlags",this.flags),this.capacity=t}set(e){e.length>this.capacity&&this.grow(e.length);const t=this.pos.array,i=this.size.array,r=this.uvs.array,a=this.flags.array;e.forEach((s,o)=>{t[o*3]=s.x,t[o*3+1]=s.y,t[o*3+2]=s.z,i[o*2]=s.frame.w*this.metresPerPixel,i[o*2+1]=s.frame.h*this.metresPerPixel,r.set(s.frame.uv,o*4),a[o*2]=s.flip?1:0,a[o*2+1]=s.top?1:0});for(const s of[this.pos,this.size,this.uvs,this.flags])s.needsUpdate=!0;this.count=e.length,this.geo.instanceCount=e.length,this.mesh.visible=e.length>0}dispose(){this.geo.dispose(),this.mesh.material.dispose(),this.atlas.albedo.dispose(),this.atlas.normal.dispose()}}class hx{constructor(e,t,i){this.canvas=e,this.game=t,this.style=i;const r=t.tuning;this.renderer=new D_({canvas:e,antialias:!1,powerPreference:"high-performance",preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.info.autoReset=!1,this.renderer.outputColorSpace=Hr,this.mpp=1/(r.artPixelsPerMetre*(2/r.pixelSize)),this.camera=new gn(r.camera.fov,1,1,900),this.post=new nx(this.renderer,r),this.scene.background=new ot(723478),K_(i,r.glowReach,this.mpp),this.assets=new Y_(i,t.seed,r.pixelSize),this.ground=new $_(t.map,i,this.mpp),this.assets.onFloor=(l,u)=>this.ground.setFloor(l,u);const a=r.canopyShadow;this.ground.setCanopyShadow(a.on?a.strength:0,a.height,a.cover,a.wind),this.shadows=new lx(r.shadows.strength),this.shadows.mesh.visible=r.shadows.on,this.scene.add(this.shadows.mesh),r.mist.on&&r.mist.strength>0&&(this.mist=new ax(r.mist.strength,r.mist.height,r.mist.wind,this.mpp),this.scene.add(this.mist.mesh)),Ft.uHazeRange.value.set(r.haze.near,r.haze.far),this.scene.add(this.ground.mesh),this.witchBatch=new ya(this.assets.witch,this.mpp,{unlit:!0,onTop:!0}),this.scene.add(this.witchBatch.mesh),this.stoneBatch=new ya(this.assets.stones,this.mpp),this.scene.add(this.stoneBatch.mesh);const s=t.map.dancefloor,o=[];for(let l=0;l<9;l++){const u=l/9*Math.PI*2+.3;o.push({x:s.x+Math.cos(u)*s.radius,y:0,z:s.z+Math.sin(u)*s.radius,frame:this.assets.stones.frames[l%4],flip:l%2===0})}this.stoneBatch.set(o);const c=new $t({transparent:!1,depthWrite:!1,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"varying vec2 vUv; void main(){ vec2 p = vUv * 2.0 - 1.0; if (dot(p, p) > 1.0 || mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0) > 0.5) discard; gl_FragColor = vec4(0.02, 0.02, 0.05, 1.0); }"});this.shadow=new en(new Wn(1.4,.7).rotateX(-Math.PI/2),c),this.shadow.renderOrder=1,this.scene.add(this.shadow)}canvas;game;style;renderer;scene=new mp;camera;ground;assets;typeBatches=new Map;creatureBatches=new Map;witchBatch;stoneBatch;shadow;mpp;lastBuild={x:1/0,y:1/0,z:1/0,version:-1};post;shadows;shadowList=[];mist=null;width=1;height=1;stats={trees:0,bushes:0,creatures:0,batches:0,drawCalls:0,pendingArt:0,pendingGround:0};resize(e,t){const i=this.game.tuning.pixelSize;this.width=Math.max(1,Math.ceil(e/i)),this.height=Math.max(1,Math.ceil(t/i));const r=this.post.fullResolution?i:1;this.renderer.setSize(this.width*r,this.height*r,!1),this.post.resize(this.width,this.height,this.width*r,this.height*r),this.canvas.style.width=this.width*i+"px",this.canvas.style.height=this.height*i+"px",this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix()}async prepare(){this.render(0,!1),this.drawCreatures(),this.ground.fill(this.renderer,this.game.witch.x,this.game.witch.z,50,1/0),await this.assets.whenIdle(),this.updateFrustum(),this.refresh(!0);for(let e=0;e<kn.length;e++)this.assets.prefetchType(e);for(const e of kn)this.assets.creatureArt(e.creature)}batchFor(e,t,i){let r=e.get(t);return r||(r=i(),r&&(e.set(t,r),this.scene.add(r.mesh))),r}frustum=new $o;box=new Mr;m4=new Pt;v3=new X;drawn=new Set;pops=[];updateFrustum(){this.camera.updateMatrixWorld(),this.m4.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse),this.frustum.setFromProjectionMatrix(this.m4)}viewRect(e,t){const i=this.camera,r=i.position,a=this.game.witch,s=[];for(const l of[-1,1])for(const u of[-1,1]){const d=this.v3.set(l,u,1).unproject(i).sub(r).normalize();for(const h of[0,25]){let p=d.y<-.001?(h-r.y)/d.y:1/0;p>0||(p=1/0),p=Math.min(p,e+r.distanceTo(new X(a.x,r.y,a.z))+t),s.push([r.x+d.x*p,r.z+d.z*p])}}s.push([r.x,r.z]);const o=s.map(l=>l[0]),c=s.map(l=>l[1]);return{minX:Math.min(...o)-t,maxX:Math.max(...o)+t,minZ:Math.min(...c)-t,maxZ:Math.max(...c)+t}}inView(e,t,i,r,a){const s=this.game.witch.x,o=this.game.witch.z,c=this.game.tuning.haze.far+a;return(e-s)**2+(t-o)**2>c*c?!1:(this.box.min.set(e-i/2-a,-a,t-r-a),this.box.max.set(e+i/2+a,r+a,t+a),this.frustum.intersectsBox(this.box))}inInnerView(e,t,i){const r=this.game.witch;if(Math.hypot(e-r.x,t-r.z)>this.game.tuning.haze.near)return!1;for(const a of[0,i]){const s=this.v3.set(e,a,t).project(this.camera);if(Math.abs(s.x)<.85&&Math.abs(s.y)<.85&&s.z<1)return!0}return!1}refresh(e=!1){const t=this.game,i=t.tuning,r=this.camera,a=i.viewMargin,s={x:r.position.x,y:r.position.y,z:r.position.z};if(!e&&Math.hypot(s.x-this.lastBuild.x,s.y-this.lastBuild.y,s.z-this.lastBuild.z)<a/3&&this.assets.version===this.lastBuild.version)return;this.lastBuild={...s,version:this.assets.version};const o=this.viewRect(i.haze.far,a),c=(o.minX+o.maxX)/2,l=(o.minZ+o.maxZ)/2,u=Math.max(o.maxX-o.minX,o.maxZ-o.minZ)/2,d=[],h=Ft.uMoonDir.value,p=-h.x/Math.max(.2,h.y),_=-h.z/Math.max(.2,h.y),x=new Map,g=new Set,m=(w,P)=>{let S=x.get(w);S||x.set(w,S=[]),S.push(P)},M=this.mpp;let E=0,b=0;for(const w of t.forest.treesNear(c,l,u)){const P=this.assets.typeArt(w.type);if(!P||!P.layout.big.length)continue;const S=P.atlas.frames,T=P.layout.big[w.variant%P.layout.big.length],I=S[T.top??T.bot];if(!this.inView(w.x,w.z,I.w*M,I.h*M,a))continue;m(w.type,{x:w.x,y:0,z:w.z,frame:S[T.bot],flip:w.flip}),T.top!==null&&m(w.type,{x:w.x,y:0,z:w.z,frame:S[T.top],flip:w.flip,top:!0});const C=I.w*M,O=I.h*M*(T.top===null?.2:.6);d.push({x:w.x+p*O,z:w.z+_*O,w:C*.8,d:C*.45}),g.add(`${w.x.toFixed(2)},${w.z.toFixed(2)},${I.h*M}`),E++}const R=(w,P)=>{for(const S of w){const T=this.assets.typeArt(S.type);if(!T)continue;const I=P(T.layout);if(!I.length)continue;const C=I[S.variant%I.length],O=T.atlas.frames,F=O[C.bot],D=O[C.top??C.bot];this.inView(S.x,S.z,D.w*M,D.h*M,a)&&(m(S.type,{x:S.x,y:0,z:S.z,frame:F,flip:S.flip}),C.top!==null&&m(S.type,{x:S.x,y:0,z:S.z,frame:O[C.top],flip:S.flip,top:!0}),d.push({x:S.x,z:S.z,w:F.w*M*.8,d:F.w*M*.3}),b++)}};R(t.forest.bushesNear(c,l,u),w=>w.small),R(t.forest.wallsNear(c,l,u),w=>w.walls.map(P=>({bot:P,top:null}))),R(t.forest.setPiecesNear(c,l,u),w=>w.set===null?[]:[w.set]);for(const[w,P]of this.typeBatches)x.has(w)||P.set([]);for(const[w,P]of x)this.batchFor(this.typeBatches,w,()=>{const T=this.assets.typeArt(w);return T&&new ya(T.atlas,M)})?.set(P);if(!e&&this.assets.pending===0){const w=(P,S)=>{const[T,I,C]=P.split(",").map(Number);this.inInnerView(T,I,C)&&this.pops.push(`${S} ${T.toFixed(0)},${I.toFixed(0)}`)};for(const P of g)this.drawn.has(P)||w(P,"appeared");for(const P of this.drawn)g.has(P)||w(P,"vanished")}this.drawn=g,this.stats.trees=E,this.stats.bushes=b,this.shadowList=d}drawCreatures(){const e=this.game,t=e.camera,i=e.tuning.haze.far,r=new Map,a=[];let s=0;for(const o of e.creatures){if(Math.abs(o.x-t.tx)>i||Math.abs(o.z-t.tz)>i)continue;const c=this.assets.creatureArt(o.species);if(!c)continue;const l=c.atlas.frames[c.frame(o.level,o.moving?Math.floor(o.walk)%2:0)];if(!this.inView(o.x,o.z,l.w*this.mpp,l.h*this.mpp,4))continue;let u=r.get(o.species);u||r.set(o.species,u=[]),u.push({x:o.x,y:0,z:o.z,frame:l,flip:o.facing<0}),a.push({x:o.x,z:o.z,w:l.w*this.mpp*.7,d:l.w*this.mpp*.25}),s++}for(const[o,c]of this.creatureBatches)r.has(o)||c.set([]);for(const[o,c]of r)this.batchFor(this.creatureBatches,o,()=>{const u=this.assets.creatureArt(o);return u&&new ya(u.atlas,this.mpp)})?.set(c);this.stats.creatures=s,this.game.tuning.shadows.on&&this.shadows.set(this.shadowList.concat(a))}render(e,t=!0){const i=this.game,r=i.tuning,a=hd(i),s=a.angle*Math.PI/180,o=2*a.distance*Math.tan(r.camera.fov*Math.PI/360)/this.height,c=new X(0,Math.cos(s),-Math.sin(s)),l=new X(a.tx,a.ty,a.tz),u=l.dot(c),d=l.x;l.addScaledVector(c,Math.round(u/o)*o-u),l.x+=Math.round(d/o)*o-d;const h=new X(0,Math.sin(s),Math.cos(s)).multiplyScalar(a.distance);this.camera.position.copy(l).add(h),this.camera.up.set(0,1,0),this.camera.lookAt(l);const p=r.spriteTilt;sr.uUp.value.set(0,1,0).lerp(c,p).normalize(),sr.uFacing.value.crossVectors(sr.uRight.value,sr.uUp.value).normalize(),sr.uTopFade.value=is(i.witch);const _=i.witch,x=Bo(_,r);Ft.uGlowPos.value.set(_.x,x+r.glowHeight,_.z),Ft.uHazeCentre.value.set(_.x,_.z),Ft.uTime.value=e,this.mist?.follow(a.tx,a.tz);const g=Math.sin(e*2.4)*.12;this.witchBatch.set([{x:_.x,y:x+g-.4,z:_.z,frame:this.assets.witch.frames[0],flip:_.facing<0}]),this.shadow.position.set(_.x,.03,_.z),this.shadow.scale.setScalar(1-.5*is(_)),this.updateFrustum(),this.refresh(),this.drawCreatures(),this.assets.work(6);const m=Nn(r.haze.near,r.haze.far,is(_))*.8;this.stats.pendingGround=this.ground.fill(this.renderer,a.tx,a.tz-m*.5,m,3),this.stats.pendingArt=this.assets.pending,t&&(this.renderer.info.reset(),this.post.render(this.scene,this.camera),this.stats.drawCalls=this.renderer.info.render.calls,this.stats.batches=this.typeBatches.size+this.creatureBatches.size)}}const dx="The art style: knobs from the Witch Art Lab. Paste a style saved in the Lab here (its whole saved JSON, or just its style object). Any knob left out follows the Lab's current default, so an empty style means the Lab's default look, and stays up to date as the art changes.",fx="Lab default",px={},mx={_readme:dx,name:fx,style:px};function gx(n=mx){const e=n??{},t=e.style&&typeof e.style=="object"?e.style:e,i=z_();for(const[r,a]of Object.entries(t))r in i&&(i[r]=a);return i}function _x(n,e){const t=n.querySelector("#stick"),i=t.querySelector(".knob"),r=56;let a=null,s=0,o=0;const c=()=>n.classList.add("touch"),l=n.querySelector("#stick-zone");l.addEventListener("pointerdown",h=>{if(!(h.pointerType==="mouse"||a!==null)){c(),a=h.pointerId,s=h.clientX,o=h.clientY,t.style.left=s+"px",t.style.top=o+"px",t.classList.add("on");try{l.setPointerCapture(h.pointerId)}catch{}h.preventDefault()}}),l.addEventListener("pointermove",h=>{if(h.pointerId!==a)return;let p=h.clientX-s,_=h.clientY-o;const x=Math.hypot(p,_);x>r&&(p*=r/x,_*=r/x),i.style.transform=`translate(${p}px, ${_}px)`;const g=Math.min(1,x/r),m=.15,M=g<m?0:(g-m)/(1-m)/Math.max(1e-6,g);e.x=p/r*M,e.y=_/r*M});const u=h=>{h.pointerId===a&&(a=null,e.x=0,e.y=0,i.style.transform="",t.classList.remove("on"))};l.addEventListener("pointerup",u),l.addEventListener("pointercancel",u);const d=(h,p)=>{const _=n.querySelector(h);_.addEventListener("pointerdown",x=>{x.preventDefault(),x.stopPropagation(),p(),_.classList.add("down")}),_.addEventListener("pointerup",()=>_.classList.remove("down")),_.addEventListener("pointerleave",()=>_.classList.remove("down"))};d("#rise",()=>e.toggle=!0),d("#zoom-in",()=>e.zoom-=1),d("#zoom-out",()=>e.zoom+=1),window.addEventListener("touchstart",h=>{c(),h.touches.length===3&&(e.debug=!0)},{passive:!0})}const li=new URLSearchParams(location.search);let Ii=Kh(li.get("seed"));Ii===null&&(Ii=Math.floor(Math.random()*1e6),li.set("seed",String(Ii)),history.replaceState(null,"","?"+li.toString()+location.hash));const si={...Wi,bloom:{...Wi.bloom},tiltShift:{...Wi.tiltShift},shadows:{...Wi.shadows},canopyShadow:{...Wi.canopyShadow},mist:{...Wi.mist}};li.get("shadows")==="off"&&(si.shadows.on=!1);li.get("canopy")==="off"&&(si.canopyShadow.on=!1);li.get("mist")==="off"&&(si.mist.on=!1);const wa=li.get("tilt");wa==="off"?si.tiltShift.on=!1:(wa==="before"||wa==="after")&&(si.tiltShift.on=!0,si.tiltShift.where=wa);li.get("bloom")==="off"&&(si.bloom.on=!1);const ti=cd(Ii,si),xx=document.getElementById("game"),Wr=new hx(xx,ti,{...gx(),pixel:si.pixelSize}),Ja=new gf;_x(document.body,Ja.touch);document.getElementById("version").textContent="v94 · a392e1b";const vx=document.getElementById("seed");vx.innerHTML=`seed <a href="?seed=${Ii}">${Ii}</a>`;const Co=document.getElementById("debug"),Qo=document.getElementById("start");let Ur=li.has("debug");Co.classList.toggle("on",Ur);const yu=()=>Wr.resize(window.innerWidth,window.innerHeight);window.addEventListener("resize",yu);yu();let Qa=!1;requestAnimationFrame(()=>setTimeout(async()=>{await Wr.prepare(),Qa=!0,Qo.classList.remove("loading")},0));let mc=null;function wu(){if(!Qa||!ti.clock.paused)return!1;try{mc??=new AudioContext,mc.resume()}catch{}return ti.clock.paused=!1,Qo.style.display="none",Ja.clearPresses(),!0}Ja.onAny=wu;Qo.addEventListener("pointerdown",n=>{n.preventDefault(),wu()});document.addEventListener("visibilitychange",()=>{document.hidden&&(Ua=0)});let Ua=0,gc=60,Fs=0,Aa=0;function Au(n){requestAnimationFrame(Au);const e=Ua?(n-Ua)/1e3:0;Ua=n,Fs++,Aa+=e,Aa>=.5&&(gc=Fs/Aa,Fs=0,Aa=0);const t=Ja.read();if(t.debug&&(Ur=!Ur,Co.classList.toggle("on",Ur)),ud(ti,t,e),!!Qa&&(Wr.render(n/1e3),Ur)){const i=ti.witch,r=Wr.stats;Co.textContent=[`fps    ${gc.toFixed(0)}`,`seed   ${Ii}`,`area   ${Uc(ti)}`,`mode   ${i.mode}`,`at     ${i.x.toFixed(0)}, ${i.z.toFixed(0)} m   zoom ${ti.camera.zoomStep}`,`trees  ${r.trees}  bushes ${r.bushes}  creatures ${r.creatures}`,`draws  ${r.drawCalls}  art queued ${r.pendingArt}  ground tiles ${r.pendingGround}`].join(`
`)}}requestAnimationFrame(Au);window.witch={game:ti,view:Wr,areaUnderWitch:()=>Uc(ti),get ready(){return Qa}};
