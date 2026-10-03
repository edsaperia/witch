(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function t(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(r){if(r.ep)return;r.ep=!0;const a=t(r);fetch(r.href,a)}})();function Cr(i){let e=i>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function yt(i,e,t){let n=Math.imul(i|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967296}function jo(i,e,t){const n=Math.floor(i),r=Math.floor(e),a=i-n,s=e-r,o=a*a*(3-2*a),c=s*s*(3-2*s),l=yt(n,r,t),u=yt(n+1,r,t),d=yt(n,r+1,t),h=yt(n+1,r+1,t);return l+(u-l)*o+(d-l)*c+(l-u-d+h)*o*c}const An=(i,e,t)=>i+(e-i)*t,wi=(i,e,t)=>Math.min(t,Math.max(e,i)),cr=i=>{const e=wi(i,0,1);return e*e*(3-2*e)};function Eu(i,e,t,n){const r=Math.max(1,i.camera.zoomSteps),a=wi(Math.round(i.camera.startZoom),0,r-1),s=r>1?a/(r-1):0;return{zoomStep:a,zoom:s,tx:e,ty:t,tz:n,vx:0,vy:0,vz:0,ax:0,az:0,lift:0}}function Ya(i,e,t,n,r){const a=n*r,s=Math.exp(-a),o=i-t,c=e+n*o;return[t+(o+c*r)*s,(e-n*c*r)*s]}function yu(i,e,t,n,r,a,s){const o=s.camera,c=Math.max(1,o.zoomSteps),l=wi(i.zoomStep+Math.sign(e),0,c-1),u=c>1?l/(c-1):0;let d=n.x*o.lookAhead,h=n.z*o.lookAhead;const p=Math.hypot(d,h);p>o.lookAheadMax&&(d*=o.lookAheadMax/p,h*=o.lookAheadMax/p);const _=1-Math.exp(-o.lookAheadEase*a),x=i.ax+(d-i.ax)*_,g=i.az+(h-i.az)*_,[m,M]=Ya(i.tx,i.vx,t.x+x,o.follow,a),[E,b]=Ya(i.ty,i.vy,t.y,o.follow,a),[R,w]=Ya(i.tz,i.vz,t.z+g,o.follow,a),P=i.zoom+(u-i.zoom)*(1-Math.exp(-o.zoomEase*a)),S=i.lift+(r-i.lift)*(1-Math.exp(-o.liftEase*a));return{zoomStep:l,zoom:P,tx:m,ty:E,tz:R,vx:M,vy:b,vz:w,ax:x,az:g,lift:wi(S,0,1)}}function wu(i,e,t){const n=t.camera.ground,r=t.camera.treetop,a=cr(e),s=An(An(n.angleIn,n.angleOut,i.zoom),An(r.angleIn,r.angleOut,i.zoom),a),o=An(An(n.distanceIn,n.distanceOut,i.zoom),An(r.distanceIn,r.distanceOut,i.zoom),a),c=s*Math.PI/180;return{angle:s,distance:o,x:i.tx,y:i.ty+Math.sin(c)*o,z:i.tz+Math.cos(c)*o,tx:i.tx,ty:i.ty,tz:i.tz}}const Au=.1,Tu=()=>({time:0,paused:!0});function Ru(i,e){if(i.paused||!(e>0))return 0;const t=Math.min(Au,e);return i.time+=t,t}const Cu={moor:{treeDensity:.4},"fern-forest":{treeDensity:1},"muddy-forest":{treeDensity:1},"stone-shrine":{treeDensity:.3},"tangly-forest":{treeDensity:1},"wispy-forest":{treeDensity:1},"hazel-forest":{treeDensity:1},garden:{treeDensity:.6},"twiggy-forest":{treeDensity:1},ancient:{treeDensity:.9},norway:{treeDensity:1},"alder-forest":{treeDensity:.9},meadow:{treeDensity:.2},"old-oaks":{treeDensity:.9},"berry-thicket":{treeDensity:1},wetland:{treeDensity:.6},stream:{treeDensity:.7},"rocky-slope":{treeDensity:.6},bog:{treeDensity:.5},deadwood:{treeDensity:.8},"cave-mouth":{treeDensity:.6},grassland:{treeDensity:.2},"beaver-pond":{treeDensity:.8},"log-pile":{treeDensity:.7},heath:{treeDensity:.4},"old-pinewood":{treeDensity:1},ravine:{treeDensity:.6},"bluebell-glade":{treeDensity:.8},"holly-thicket":{treeDensity:1},"honeysuckle-tangle":{treeDensity:1}},Lu={types:Cu};function sc(i,e){if(typeof document<"u"){const t=document.createElement("canvas");return t.width=i,t.height=e,t}return new OffscreenCanvas(i,e)}function Mo(i){let e=i>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}const be=(i,e,t)=>e+(t-e)*i(),oc=(i,e)=>e[Math.floor(i()*e.length)];function jt(i,e,t){let n=Math.imul(i|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967296}function ci(i,e,t){const n=Math.floor(i),r=Math.floor(e),a=i-n,s=e-r,o=a*a*(3-2*a),c=s*s*(3-2*s),l=jt(n,r,t),u=jt(n+1,r,t),d=jt(n,r+1,t),h=jt(n+1,r+1,t);return l+(u-l)*o+(d-l)*c+(l-u-d+h)*o*c}function ve(i,e,t){i=(i%1+1)%1,e=Math.max(0,Math.min(1,e)),t=Math.max(0,Math.min(1,t));const n=Math.floor(i*6),r=i*6-n,a=t*(1-e),s=t*(1-r*e),o=t*(1-(1-r)*e),[c,l,u]=[[t,o,a],[s,t,a],[a,t,o],[a,s,t],[o,a,t],[t,a,s]][n%6];return[Math.round(c*255),Math.round(l*255),Math.round(u*255)]}const f={BODY:1,BELLY:2,ACCENT:3,EYE:4,GLINT:5,TRUNK:6,LEAF:7,LEAF2:8,CLOTH:9,SKIN:10,HAIR:11,BROOM:12,STRAW:13,BODY2:14,BARK2:15,FLOWER:16,PUPIL:17,MAGIC:18,BARKD:19,LINE:20,IRIS:21,MAGIC2:22,NOSE:23,EAR:24,BODY3:25,LEAF3:26,BARKL:27,HAT:28,PHONES:29,TOP:30,JACKET:31,JEANS:32,SHOES:33,WATER:34,STONE:35,STONED:36,MOSS:37,RUNE:39,GLOW:40,WOOD:41,COLLAR:42,HAT1:43,HAT2:44,POM:45,SHADES:46,FRAME:47,SHOE:48,SOLE:49,WOKEN:50,WEB:51},Pu=new Set([f.GLINT,f.MAGIC,f.MAGIC2,f.RUNE,f.GLOW,f.COLLAR,f.WOKEN]);function el(i,e=!0,t=8){const n=i.length,r=[];if(n<3)return i.slice();const a=o=>e?i[(o+n)%n]:i[Math.max(0,Math.min(n-1,o))],s=e?n:n-1;for(let o=0;o<s;o++){const c=a(o-1),l=a(o),u=a(o+1),d=a(o+2),h=Math.max(2,Math.ceil(Math.hypot(u[0]-l[0],u[1]-l[1])/1.5),t);for(let p=0;p<h;p++){const _=p/h,x=_*_,g=x*_;r.push([0,1].map(m=>.5*(2*l[m]+(-c[m]+u[m])*_+(2*c[m]-5*l[m]+4*u[m]-d[m])*x+(-c[m]+3*l[m]-3*u[m]+d[m])*g)))}}return e||r.push(i[n-1]),r}function Du(i,{cap:e=1,capEnd:t=e}={}){const n=[],r=[],a=i.length;for(let c=0;c<a;c++){const l=i[Math.max(0,c-1)],u=i[Math.min(a-1,c+1)];let d=u[0]-l[0],h=u[1]-l[1];const p=Math.hypot(d,h)||1;d/=p,h/=p;const _=i[c][2]/2;n.push([i[c][0]-h*_,i[c][1]+d*_]),r.push([i[c][0]+h*_,i[c][1]-d*_])}const s=(c,l,u,d)=>{let h=c[0]-l[0],p=c[1]-l[1];const _=Math.hypot(h,p)||1;return[c[0]+h/_*u/2*d,c[1]+p/_*u/2*d]};return[...n,s(i[a-1],i[a-2],i[a-1][2],t),...r.reverse(),s(i[0],i[1],i[0][2],e)]}const bt=(i,e)=>[i[0]+e[0],i[1]+e[1]],Kn=(i,e,t)=>[i[0]+(e[0]-i[0])*t,i[1]+(e[1]-i[1])*t];function Ia(i,e,t,n,r,a=1){const s=[];for(let o=0;o<i.length;o++){if(s.push(i[o]),o<e||o>=t)continue;const c=i[o],l=i[(o+1)%i.length];let u=l[0]-c[0],d=l[1]-c[1];const h=Math.hypot(u,d)||1,p=d/h*a,_=-u/h*a;for(let x=1;x<=n;x++){const g=(x-.5)/n,m=Kn(c,l,g),M=[m[0]+p*r-u/h*r*.5,m[1]+_*r-d/h*r*.5];s.push(Kn(c,l,g-.45/n),M,Kn(c,l,g+.35/n))}}return s}function tl(i,e,t){const n=new Uint8Array(i*e);let r=1/0,a=-1/0;for(const s of t)r=Math.min(r,s[1]),a=Math.max(a,s[1]);for(let s=Math.max(0,Math.floor(r));s<=Math.min(e-1,Math.ceil(a));s++){const o=s+.5,c=[];for(let l=0,u=t.length-1;l<t.length;u=l++){const[d,h]=t[l],[p,_]=t[u];h>o!=_>o&&c.push(d+(o-h)/(_-h)*(p-d))}c.sort((l,u)=>l-u);for(let l=0;l+1<c.length;l+=2)for(let u=Math.max(0,Math.ceil(c[l]-.5));u<=Math.min(i-1,Math.floor(c[l+1]-.5));u++)n[s*i+u]=1}return n}function Iu(i,e,t){const r=new Float32Array(i*e),a=new Float32Array(i*e);for(let c=0;c<i*e;c++)t[c]&&(r[c]=1e4,a[c]=1e4);const s=c=>r[c]*r[c]+a[c]*a[c],o=(c,l,u,d,h)=>{const p=l+d,_=u+h;let x,g;if(p<0||_<0||p>=i||_>=e)x=d,g=h;else{const m=_*i+p;x=r[m]+d,g=a[m]+h}x*x+g*g<s(c)&&(r[c]=x,a[c]=g)};for(let c=0;c<e;c++){for(let l=0;l<i;l++){const u=c*i+l;t[u]&&(o(u,l,c,-1,0),o(u,l,c,0,-1),o(u,l,c,-1,-1),o(u,l,c,1,-1))}for(let l=i-1;l>=0;l--){const u=c*i+l;t[u]&&o(u,l,c,1,0)}}for(let c=e-1;c>=0;c--){for(let l=i-1;l>=0;l--){const u=c*i+l;t[u]&&(o(u,l,c,1,0),o(u,l,c,0,1),o(u,l,c,1,1),o(u,l,c,-1,1))}for(let l=0;l<i;l++){const u=c*i+l;t[u]&&o(u,l,c,-1,0)}}return{vx:r,vy:a}}class tn{constructor(e,t,n=1){this.sx=n,this.w=Math.round(e*n),this.h=t|0,this.m=new Uint8Array(this.w*this.h),this.n=new Float32Array(this.w*this.h*3),this.g=new Uint8Array(this.w*this.h)}inb(e,t){return e>=0&&t>=0&&e<this.w&&t<this.h}get(e,t){return e|=0,t|=0,this.inb(e,t)?this.m[t*this.w+e]:0}put(e,t,n,r=0,a=0,s=1){this.px(e*this.sx,t,n,r,a,s)}px(e,t,n,r=0,a=0,s=1){if(e=Math.floor(e),t=Math.floor(t),!this.inb(e,t))return;const o=t*this.w+e;this.m[o]=n,this.n[o*3]=r,this.n[o*3+1]=a,this.n[o*3+2]=s}recolour(e,t,n){e=Math.floor(e),t=Math.floor(t),this.inb(e,t)&&this.m[t*this.w+e]&&(this.m[t*this.w+e]=n)}ellipse(e,t,n,r,a,s={}){const{onlyOn:o,density:c=1,noise:l=0,seed:u=0,round:d=1}=s;e*=this.sx,n*=this.sx;for(let h=Math.max(0,Math.floor(t-r-1));h<Math.min(this.h,t+r+1);h++)for(let p=Math.max(0,Math.floor(e-n-1));p<Math.min(this.w,e+n+1);p++){const _=(p+.5-e)/n,x=(h+.5-t)/r,g=_*_+x*x;if(g>1)continue;const m=h*this.w+p;if(o&&!o.has(this.m[m]))continue;if(c<1){const R=l?ci(p/3.2,h/3.2,u)*l+(1-l)*.5:.5;if(jt(p,h,u+77)>c*(.4+R*1.2)*(1.15-g*.5))continue}const M=_*d,E=x*d,b=Math.hypot(M,E,Math.sqrt(Math.max(0,1-g))+.15);this.px(p,h,a,M/b,E/b,(Math.sqrt(Math.max(0,1-g))+.15)/b)}}line(e,t,n,r,a,s,o,c=1){e*=this.sx,n*=this.sx;const l=Math.max(1,Math.ceil(Math.hypot(n-e,r-t)));for(let u=0;u<=l;u++){const d=u/l,h=e+(n-e)*d,p=t+(r-t)*d,_=Math.max(.5,(a+(s-a)*d)/2);for(let x=Math.floor(p-_);x<=p+_;x++)for(let g=Math.floor(h-_);g<=h+_;g++){const m=(g+.5-h)/_,M=(x+.5-p)/_;if(m*m+M*M>1)continue;const E=m*c,b=Math.hypot(E,M*.3,1);this.px(g,x,o,E/b,M*.3/b,1/b)}}}tri(e,t){let[[n,r],[a,s],[o,c]]=e;n*=this.sx,a*=this.sx,o*=this.sx;const l=(_,x,g,m,M,E)=>(_-M)*(m-E)-(g-M)*(x-E),u=Math.max(0,Math.floor(Math.min(n,a,o))),d=Math.min(this.w,Math.ceil(Math.max(n,a,o))),h=Math.max(0,Math.floor(Math.min(r,s,c))),p=Math.min(this.h,Math.ceil(Math.max(r,s,c)));for(let _=h;_<p;_++)for(let x=u;x<d;x++){const g=x+.5,m=_+.5,M=l(g,m,n,r,a,s),E=l(g,m,a,s,o,c),b=l(g,m,o,c,n,r);(M<0||E<0||b<0)&&(M>0||E>0||b>0)||this.px(x,_,t,0,-.2,.98)}}shape(e,t,n={}){return this.fillMask(tl(this.w,this.h,el(e,!0,n.per||6)),t,n)}limb(e,t,n={}){return this.shape(Du(e,n),t,n)}fillMask(e,t,{group:n=1,line:r=!1,depth:a=0,round:s=1,onlyOn:o=null,keepNormals:c=!1,tilt:l=[0,0],lineMat:u=f.LINE}={}){const{w:d,h}=this;if(o)for(let g=0;g<d*h;g++)e[g]&&!o.has(this.m[g])&&(e[g]=0);const{vx:p,vy:_}=Iu(d,h,e);let x=a;if(!x){for(let g=0;g<d*h;g++)e[g]&&(x=Math.max(x,Math.hypot(p[g],_[g])));x=Math.max(1.5,Math.min(x*.9,2.5+x*.35))}for(let g=0;g<h;g++)for(let m=0;m<d;m++){const M=g*d+m;if(!e[M])continue;if(c){this.m[M]=t;continue}const E=Math.hypot(p[M],_[M]),b=Math.min(1,Math.max(0,(E-.5)/x)),R=Math.min(2.6,(1-b)/Math.sqrt(Math.max(.02,1-(1-b)*(1-b))))*s;let w=p[M]/(E||1)*R+l[0],P=_[M]/(E||1)*R+l[1];const S=Math.hypot(w,P,1);this.m[M]=t,this.n[M*3]=w/S,this.n[M*3+1]=P/S,this.n[M*3+2]=1/S}if(r&&!c){const g=[];for(let m=0;m<h;m++)for(let M=0;M<d;M++){const E=m*d+M;if(e[E])for(const[b,R]of[[1,0],[-1,0],[0,1],[0,-1]]){const w=M+b,P=m+R;if(w<0||P<0||w>=d||P>=h)continue;const S=P*d+w;if(!e[S]&&this.m[S]&&this.g[S]!==n&&this.m[S]!==u){g.push(E);break}}}for(const m of g)this.m[m]=u}if(!c)for(let g=0;g<d*h;g++)e[g]&&(this.g[g]=n);return e}mark(e,t,n,r={}){return this.fillMask(tl(this.w,this.h,el(e,!0,6)),t,{...r,onlyOn:new Set(n),keepNormals:!0})}grid(e,t,n=0,r=0,{round:a=1,flipX:s=!1}={}){const o=Math.max(...e.map(u=>u.length)),c=new Uint8Array(this.w*this.h),l=new Map;e.forEach((u,d)=>[...u].forEach((h,p)=>{const _=t[h];if(!_)return;const x=n+(s?o-1-p:p),g=r+d;this.inb(x,g)&&(c[g*this.w+x]=1,l.set(g*this.w+x,_))})),this.fillMask(c,f.BODY,{round:a,depth:2.5});for(const[u,d]of l)this.m[u]=d}}function rr(i,e,t,n=t.outline,r=sc){const{w:a,h:s}=i,o=()=>r(a,s),c=o(),l=o(),u=o(),d=c.getContext("2d").createImageData(a,s),h=l.getContext("2d").createImageData(a,s),p=u.getContext("2d").createImageData(a,s),_=n==="none"?null:n==="dark"?[22,18,30]:"tint";for(let x=0;x<s;x++)for(let g=0;g<a;g++){const m=x*a+g,M=i.m[m],E=m*4;if(!M){if(!_)continue;const S=[i.get(g+1,x),i.get(g-1,x),i.get(g,x+1),i.get(g,x-1)].find(I=>I);if(!S)continue;const T=_==="tint"?(e[S]||[0,0,0]).map(I=>I*.35|0):_;d.data.set([...T,255],E),h.data.set([128,128,255,255],E),p.data.set([128,128,255,255],E);continue}let b=e[M];M===f.LINE&&!b&&(b=_==="tint"||!_?(e[f.BODY2]||[0,0,0]).map(S=>S*.55|0):_),b=b||[255,0,255],d.data.set([...b,Pu.has(M)?254:255],E);const R=i.n[m*3],w=i.n[m*3+1],P=i.n[m*3+2];h.data.set([R*127+128,w*127+128,P*255,255],E),p.data.set([-R*127+128,w*127+128,P*255,255],E)}return c.getContext("2d").putImageData(d,0,0),l.getContext("2d").putImageData(h,0,0),u.getContext("2d").putImageData(p,0,0),{A:c,N:l,NF:u,w:a,h:s}}const ui=i=>{const e=Math.hypot(i[0],i[1],i[2])||1;return[i[0]/e,i[1]/e,i[2]/e]},Tr=(i,e)=>[i[1]*e[2]-i[2]*e[1],i[2]*e[0]-i[0]*e[2],i[0]*e[1]-i[1]*e[0]],Rt=(i,e)=>i[0]*e[0]+i[1]*e[1]+i[2]*e[2],hn=(i,e)=>[i[0]-e[0],i[1]-e[1],i[2]-e[2]],A={add:(i,e)=>[i[0]+e[0],i[1]+e[1],i[2]+e[2]],sub:hn,mul:(i,e)=>[i[0]*e,i[1]*e,i[2]*e],lerp:(i,e,t)=>[i[0]+(e[0]-i[0])*t,i[1]+(e[1]-i[1])*t,i[2]+(e[2]-i[2])*t],norm:ui,cross:Tr,dot:Rt};function nl(i,e=[0,1,0]){const t=ui(i);let n=Tr(e,t);Math.hypot(...n)<1e-4&&(n=Tr([0,0,1],t)),n=ui(n);const r=Tr(t,n);return[t,r,n]}function lc(i,e){const t=Rt(i,e.axes[0]),n=Rt(i,e.axes[1]),r=Rt(i,e.axes[2]),[a,s,o]=e.r,c=Math.hypot(t/a,n/s,r/o),l=Math.hypot(t/(a*a),n/(s*s),r/(o*o));return l>1e-9?c*(c-1)/l:-Math.min(a,s,o)}function cc(i,e){const{ba:t,l2:n,rr:r,a2:a,il2:s,r1:o,r2:c}=e,l=Rt(i,t),u=l-n,d=[i[0]*n-t[0]*l,i[1]*n-t[1]*l,i[2]*n-t[2]*l],h=Rt(d,d),p=l*l*n,_=u*u*n,x=Math.sign(r)*r*r*h;return Math.sign(u)*a*_>x?Math.sqrt(h+_)*s-c:Math.sign(l)*a*p<x?Math.sqrt(h+p)*s-o:(Math.sqrt(h*a*s)+l*r)*s-o}function uc(i,e){const t=Math.abs(Rt(i,e.axes[0]))-e.h[0]+e.round,n=Math.abs(Rt(i,e.axes[1]))-e.h[1]+e.round,r=Math.abs(Rt(i,e.axes[2]))-e.h[2]+e.round;return Math.hypot(Math.max(t,0),Math.max(n,0),Math.max(r,0))+Math.min(Math.max(t,n,r),0)-e.round}const Nu=(i,e)=>e*(Math.sin(i[0]*23+i[1]*7)*Math.sin(i[1]*19-i[2]*11)+.5*Math.sin(i[2]*41+i[0]*29)),il=(i,e)=>i.type==="ell"?lc(hn(e,i.cw),i):i.type==="box"?uc(hn(e,i.cw),i):cc(hn(e,i.aw),i),fr=(i,e)=>i.rough?il(i,e)+Nu(e,i.rough):il(i,e);class Qe{constructor({blend:e=.07}={}){this.parts=[],this.flats=[],this.blend=e,this.anchors={feet:[]}}ell(e,t,n,r={}){const a=r.axes||(r.dir?nl(r.dir,r.up):[[1,0,0],[0,1,0],[0,0,1]]);return this.parts.push({type:"ell",c:e,r:t,axes:a,mat:n,group:r.group??1,extra:!!r.extra,paint:r.paint,rough:r.rough,cut:!!r.cut}),this}box(e,t,n,r={}){const a=r.axes||(r.dir?nl(r.dir,r.up):[[1,0,0],[0,1,0],[0,0,1]]);return this.parts.push({type:"box",c:e,h:t,round:Math.min(r.round??.02,...t),axes:a,mat:n,group:r.group??1,extra:!!r.extra,paint:r.paint,rough:r.rough,cut:!!r.cut}),this}seg(e,t,n,r,a,s={}){return this.parts.push({type:"cone",a:e,b:t,r1:n,r2:r,mat:a,group:s.group??1,extra:!!s.extra,paint:s.paint,rough:s.rough,cut:!!s.cut}),this}chain(e,t,n={}){for(let r=0;r+1<e.length;r++)this.seg(e[r].slice(0,3),e[r+1].slice(0,3),e[r][3],e[r+1][3],t,n);return this}flat(e,t,n,r,a,s,o={}){return this.flats.push({c:e,u:ui(t),v:ui(n),su:r,sv:a,mask:s,group:o.group??30,extra:!!o.extra,bend:o.bend??.35}),this}field(e){let t=1/0;for(const n of this.parts){if(n.extra||n.cut)continue;let r;if(n.type==="ell")r=lc(hn(e,n.c),n);else if(n.type==="box")r=uc(hn(e,n.c),n);else{const a=hn(n.b,n.a),s=Math.max(1e-9,Rt(a,a)),o=n.r1-n.r2;r=cc(hn(e,n.a),{ba:a,l2:s,rr:o,a2:s-o*o,il2:1/s,r1:n.r1,r2:n.r2})}r<t&&(t=r)}return t}static surface(e,t,n){const r=1/Math.hypot(n[0]/t[0],n[1]/t[1],n[2]/t[2]);return[e[0]+n[0]*r,e[1]+n[1]*r,e[2]+n[2]*r]}}const rl={towards:.6,away:-.6},Uu=.52;function Ai(i,{height:e,scale:t,facing:n="towards",yaw:r=rl[n]??rl.towards,pitch:a=Uu,lineGap:s=.12}={}){const o=Math.cos(r),c=Math.sin(r),l=Math.cos(a),u=Math.sin(a),d=H=>[H[0]*o-H[2]*c,H[1],H[0]*c+H[2]*o],h=H=>[H[0]*o+H[2]*c,H[1],-H[0]*c+H[2]*o],p=[0,-u,-l],_=[0,l,-u],x=[1,0,0],g=[0,u,l],m=i.blend,M=i.parts.map(H=>{if(H.type==="ell"){const Ue=d(H.c),Xe=H.axes.map(d),We=Math.max(...H.r);return{...H,cw:Ue,axes:Xe,bc:Ue,br:We+(H.rough||0)*1.5}}if(H.type==="box"){const Ue=d(H.c),Xe=H.axes.map(d);return{...H,cw:Ue,axes:Xe,bc:Ue,br:Math.hypot(...H.h)+(H.rough||0)*1.5}}const ue=d(H.a),se=d(H.b),ye=hn(se,ue),qe=Math.max(1e-9,Rt(ye,ye)),Ce=H.r1-H.r2;return{...H,aw:ue,ba:ye,l2:qe,rr:Ce,a2:qe-Ce*Ce,il2:1/qe,bc:A.lerp(ue,se,.5),br:Math.sqrt(qe)/2+Math.max(H.r1,H.r2)}}),E=i.flats.map(H=>{const ue=d(H.c),se=d(H.u),ye=d(H.v);return{...H,cw:ue,uw:se,vw:ye,nw:ui(Tr(se,ye)),bc:ue,br:Math.hypot(H.su,H.sv)}}),b=[...M,...E],R=H=>{const ue=Rt(H.bc,x),se=Rt(H.bc,_),ye=H.br+(H.uw?0:m);return[ue-ye,ue+ye,se-ye,se+ye]};for(const H of b)[H.x0,H.x1,H.u0,H.u1]=R(H);const w=b.filter(H=>!H.extra&&!H.cut),P=Math.min(...w.map(H=>H.u0+(H.uw?0:m))),S=Math.max(...w.map(H=>H.u1-(H.uw?0:m))),T=t??e/Math.max(1e-6,S-P),I=Math.min(...b.map(H=>H.x0)),C=Math.max(...b.map(H=>H.x1)),O=Math.min(...b.map(H=>H.u0)),F=Math.max(...b.map(H=>H.u1)),D=Math.ceil((C-I)*T)+4,B=Math.ceil((F-O)*T)+2,W=new tn(D,B),$=new Float32Array(D*B).fill(1/0),ae=new Int16Array(D*B).fill(-1),q=8,ee=Math.ceil(D/q),N=Math.ceil(B/q),re=Array.from({length:ee*N},()=>[]);b.forEach((H,ue)=>{const se=Math.max(0,Math.floor((H.x0-I)*T/q)),ye=Math.min(ee-1,Math.floor(((H.x1-I)*T+2)/q)),qe=Math.max(0,Math.floor((F-H.u1)*T/q)),Ce=Math.min(N-1,Math.floor(((F-H.u0)*T+1)/q));for(let Ue=qe;Ue<=Ce;Ue++)for(let Xe=se;Xe<=ye;Xe++)re[Ue*ee+Xe].push(ue)});const ce=.25/T,Re=(H,ue)=>{const se=Math.max(m-Math.abs(H-ue),0)/m;return Math.min(H,ue)-se*se*m*.25};for(let H=0;H<B;H++)for(let ue=0;ue<D;ue++){const se=re[Math.floor(H/q)*ee+Math.floor(ue/q)];if(!se.length)continue;const ye=I+(ue+.5-1)/T,qe=F-(H+.5)/T,Ce=A.add(A.add(A.mul(x,ye),A.mul(_,qe)),A.mul(g,50));let Ue=1/0,Xe=-1/0;const We=[],_t=[];for(const Ze of se){const ze=b[Ze],L=hn(Ce,ze.bc),v=Rt(L,p),U=ze.br+(ze.uw?0:m),V=Rt(L,L)-U*U,Z=v*v-V;if(Z<0)continue;if(ze.uw){_t.push(ze);continue}if(ze.cut){We.push(ze);continue}const le=Math.sqrt(Z);Ue=Math.min(Ue,-v-le),Xe=Math.max(Xe,-v+le),We.push(ze)}let Tt=1/0,Bt=-1,pt=0,xt=null;if(We.length){const Ze=new Map;for(const v of We){let U=Ze.get(v.group);U||Ze.set(v.group,U=[]),U.push(v)}const ze=(v,U)=>{let V=1/0;for(const Z of v)Z.cut||(V=V===1/0?fr(Z,U):Re(V,fr(Z,U)));for(const Z of v)Z.cut&&(V=Math.max(V,-fr(Z,U)));return V};let L=Math.max(0,Ue);for(let v=0;v<96&&L<Xe;v++){const U=A.add(Ce,A.mul(p,L));let V=1/0,Z=null;for(const[le,he]of Ze){const Q=ze(he,U);Q<V&&(V=Q,Z=le)}if(V<ce){const le=Ze.get(Z),he=.5/T;xt=ui([ze(le,[U[0]+he,U[1],U[2]])-ze(le,[U[0]-he,U[1],U[2]]),ze(le,[U[0],U[1]+he,U[2]])-ze(le,[U[0],U[1]-he,U[2]]),ze(le,[U[0],U[1],U[2]+he])-ze(le,[U[0],U[1],U[2]-he])]);let Q=le[0],te=1/0;for(const de of le){if(de.cut)continue;const Le=fr(de,U);Le<te&&(te=Le,Q=de)}for(const de of le)if(de.cut&&-fr(de,U)>te-ce*2){Q=de;break}Tt=L,Bt=Z,pt=Q.paint?Q.paint(h(U),Q)??Q.mat:Q.mat;break}L+=Math.max(V*.9,ce*.5)}}for(const Ze of _t){const ze=Rt(p,Ze.nw);if(Math.abs(ze)<1e-4)continue;const L=Rt(hn(Ze.cw,Ce),Ze.nw)/ze;if(L>=Tt)continue;const v=A.add(Ce,A.mul(p,L)),U=hn(v,Ze.cw),V=Rt(U,Ze.uw)/Ze.su,Z=Rt(U,Ze.vw)/Ze.sv;if(Math.abs(V)>1||Math.abs(Z)>1)continue;const le=Ze.mask(V,Z);if(!le)continue;let he=ze>0?A.mul(Ze.nw,-1):Ze.nw;he=ui(A.add(he,A.add(A.mul(Ze.uw,V*Ze.bend),A.mul(Ze.vw,Z*Ze.bend*.5)))),Tt=L,Bt=Ze.group,pt=le,xt=he}if(!xt||!pt)continue;const k=H*D+ue;$[k]=Tt,ae[k]=Bt,W.px(ue,H,pt,Rt(xt,x),-Rt(xt,_),Rt(xt,g))}const Oe=[];for(let H=0;H<B;H++)for(let ue=0;ue<D;ue++){const se=H*D+ue;if(W.m[se])for(const[ye,qe]of[[1,0],[-1,0],[0,1],[0,-1]]){const Ce=ue+ye,Ue=H+qe;if(Ce<0||Ue<0||Ce>=D||Ue>=B)continue;const Xe=Ue*D+Ce;if(W.m[Xe]&&ae[Xe]!==ae[se]&&$[Xe]-$[se]>s){Oe.push(se);break}}}for(const H of Oe)[f.EYE,f.GLINT,f.MAGIC,f.MAGIC2,f.NOSE,f.COLLAR,f.WOKEN,f.RUNE,f.GLOW].includes(W.m[H])||(W.m[H]=f.LINE);for(let H=0;H<B;H++)for(let ue=0;ue<D;ue++){const se=H*D+ue;if(W.m[se]!==f.EYE)continue;const ye=H>0&&W.m[se-D]===f.EYE,qe=ue>0&&W.m[se-1]===f.EYE,Ce=ue+1<D&&W.m[se+1]===f.EYE&&H+1<B&&W.m[se+D]===f.EYE;!ye&&!qe&&Ce&&(W.m[se]=f.GLINT)}let ke=-1;for(let H=B-1;H>=0&&ke<0;H--)for(let ue=0;ue<D;ue++)if(W.m[H*D+ue]){ke=H;break}const j=ke>=0&&ke<B-1?B-1-ke:0;if(ke>=0&&ke<B-1){const H=B-1-ke;for(let ue=B-1;ue>=0;ue--)for(let se=0;se<D;se++){const ye=ue*D+se,qe=(ue-H)*D+se,Ce=ue-H>=0;W.m[ye]=Ce?W.m[qe]:0,W.g[ye]=Ce?W.g[qe]:0;for(let Ue=0;Ue<3;Ue++)W.n[ye*3+Ue]=Ce?W.n[qe*3+Ue]:0}}return W.bodyH=Math.round((S-P)*T),{sp:W,s:T,project:H=>{const ue=d(H);return[+((ue[0]-I)*T+1).toFixed(1),+((F-Rt(ue,_))*T+j).toFixed(1)]}}}const Sn=(i,e=9,t=.3)=>jt(Math.floor(i[0]*e),Math.floor(i[1]*e)+Math.floor(i[2]*e)*97,7)<t,ar={wing:(i,e)=>(t,n)=>{const r=(t+1)/2,a=1-.35*r*r,s=-1+.55*r+.18*Math.abs(Math.sin(r*Math.PI*6));return n>a||n<s?null:n>a-.35*(1-r*.5)?e:Math.floor(r*9)%2?i:e},ear:(i,e=f.EAR,t=f.BODY3)=>(n,r)=>{const a=(r+1)/2,s=.95*Math.sin(Math.PI*Math.min(1,.15+a*.85))*(1-a*.35);return Math.abs(n)>s?null:a>.82?t:Math.abs(n)<s*.5&&a<.7&&a>.12?e:i},flame:(i,e)=>(t,n)=>{const r=(n+1)/2,a=Math.sin(Math.PI*Math.min(1,r*1.1))*(1-r)*1.4;return Math.abs(t)>a?null:Math.abs(t)<a*.45&&r<.6?e:i},membrane:i=>(e,t)=>{const n=(e+1)/2,r=-1+.35*Math.abs(Math.sin(n*Math.PI*3));return t<r||t>1-.2*n?null:i},spotted:(i,e,t)=>(n,r)=>{if(Math.hypot(n,r*1.2)>1)return null;const s=Math.hypot(n-.35,r-.1);return s<.18?t:s<.3?e:i}},Fu={hair:f.HAIR,hat:f.HAT,headphones:f.PHONES,top:f.TOP,jacket:f.JACKET,jeans:f.JEANS,sneakers:f.SHOES,broom:f.BROOM,bristles:f.STRAW,skin:f.SKIN},al={hair:[.01,.7,.85],hat:[.74,.45,.45],headphones:[.92,.55,.9],top:[.13,.15,.95],jacket:[.72,.45,.7],jeans:[.6,.5,.7],sneakers:[0,0,.95],broom:[.08,.55,.55],bristles:[.12,.55,.9],skin:[.07,.3,.94]};function Ou(i,e=al){const t={...al,...e},n={hair:i.hairHue,jacket:i.cloakHue,hat:i.hatHue,top:i.topHue,jeans:i.jeansHue,sneakers:i.shoeHue,headphones:i.phonesHue},r={};for(const[a,s]of Object.entries(Fu)){const[o,c,l]=t[a];r[s]=ve(n[a]??o,c,l)}return r[f.EYE]=[24,18,30],r[f.GLINT]=[255,255,245],r[f.NOSE]=[20,16,24],r[f.MAGIC]=ve(i.glowHue??.13,.5,1),r[f.MAGIC2]=ve(i.glowHue??.13,.15,1),r[f.BELLY]=[245,245,240],r}const Bu={rise:.78,descend:-.66,brake:.44};function zu(i){const e=new Qe({blend:.03}),t=i%3,n=.5,r=.05,a=[[0,.02,-.01],[.02,-.01,.02],[-.01,.015,.01]][t],s=_=>n-r*(_/.62);e.seg([-.5,s(-.5),0],[.62,s(.62),0],.022,.018,f.BROOM,{group:2}),e.ell([-.64,s(-.64)+.005,0],[.2,.1,.11],f.STRAW,{dir:[1,r*1.6,0],group:3,paint:_=>_[0]<-.76?f.MAGIC2:_[0]>-.5?f.BROOM:void 0});const o=[-1,1].map(_=>[.5,s(.5)+.03,_*.045]),c=[-1,1].map(_=>[.2,n+.24+a[1],_*.1]);for(const _ of[0,1]){const x=_?1:-1,g=x>0?7:5;e.seg(c[_],o[_],.04,.03,f.JACKET,{group:g}),e.ell(o[_],[.035,.03,.035],f.SKIN,{group:g})}const l=[.3+a[0],n+.27+a[1],0],u=[.07,n+.28+a[1]*.5,0],d=[-.15,n+.35+a[2],0];e.ell(u,[.17,.1,.11],f.JACKET,{dir:[1,-.25,0],group:1,paint:_=>_[1]<u[1]-.04&&Math.abs(_[2])<.055?f.TOP:void 0}),e.ell(d,[.11,.08,.1],f.JEANS,{dir:[1,-.3,0],group:1}),e.chain([[...A.add(d,[-.02,.06,0]),.07],[...A.add(d,[-.18,.08+a[0]*2,0]),.05],[...A.add(d,[-.34,.05+a[1]*3,.02]),.025]],f.JACKET,{group:12}),[[[-.32,n+.5+a[1]*2,-.07],[-.46,n+.38+a[0]*2,-.08]],[[-.34,n+.33+a[2]*2,.08],[-.55,n+.44-a[1]*3,.1]]].forEach(([_,x],g)=>{const m=g?6:4,M=A.add(d,[-.04,0,g?.06:-.06]);e.seg(M,_,.055,.045,f.JEANS,{group:m}),e.seg(_,x,.045,.04,f.JEANS,{group:m}),e.ell(A.add(x,[-.05,0,0]),[.08,.04,.045],f.SHOES,{dir:[-1,.3,0],group:m,paint:E=>E[1]<x[1]-.03?f.BELLY:void 0})}),e.ell(l,[.11,.115,.1],f.SKIN,{group:8,paint:_=>_[0]<l[0]-.01||_[1]>l[1]+.075?f.HAIR:void 0});for(const _ of[-1,1]){const x=Qe.surface(l,[.11,.115,.1],A.norm([.85,.1,_*.45]));e.ell(x,[.026,.036,.026],f.BELLY,{group:8}),e.ell(A.add(x,[.012,0,_*.004]),[.014,.018,.014],f.EYE,{group:8})}e.ell(Qe.surface(l,[.11,.115,.1],A.norm([1,-.45,0])),[.012,.016,.04],f.BELLY,{group:8}),e.chain([[...A.add(l,[-.06,.03,0]),.065],[...A.add(l,[-.22,.05+a[1]*2,.01]),.05],[...A.add(l,[-.4,.06+a[2]*3,.02]),.03],[...A.add(l,[-.55,.07+a[0]*3,.02]),.012]],f.HAIR,{group:9});for(const _ of[-1,1])e.ell(A.add(l,[-.015,0,_*.105]),[.05,.055,.03],f.PHONES,{group:10});e.chain([[...A.add(l,[-.005,.03,-.095]),.015],[...A.add(l,[-.02,.12,0]),.015],[...A.add(l,[-.005,.03,.095]),.015]],f.PHONES,{group:10});const p=A.add(l,[-.1+a[0],.2+a[1]*2,0]);e.ell(p,[.16,.014,.15],f.HAT,{dir:[1,.9,0],group:11}),e.chain([[...A.add(p,[-.02,.02,0]),.08],[...A.add(p,[-.14,.13,0]),.04],[...A.add(p,[-.3,.14+a[2]*2,0]),.012]],f.HAT,{group:11,paint:_=>Math.hypot(_[0]-p[0],_[1]-p[1])<.06?f.MAGIC:void 0}),e.seg(A.add(p,[.08,-.02,.08]),A.add(l,[.04,-.09,.08]),.008,.008,f.HAT,{group:11});for(const[_,x,g,m]of[[-.86,s(-.8)+.05,.03,.22],[-.88,s(-.8)-.04,-.04,.16],[-.7,n+.45,.05,.14],[-.2,n+.5,-.04,.12]]){const M=t*.05%.1;e.seg([_-M,x,g],[_-M-m,x,g],.01,.004,f.MAGIC2,{group:30,extra:!0})}return e.ell([.02,.005,0],[.2,.005,.12],f.NOSE,{group:0}),e}const ku={stand:{frames:3,fps:3},land:{frames:3,fps:10},takeoff:{frames:3,fps:10},talk:{frames:4,fps:2.5},placeSigil:{frames:3,fps:6},liftSigil:{frames:3,fps:6},sit:{frames:2,fps:1.5}},Rs=.34,hc={binding:[-.02,.31,-.2],dir:[.02,1,-.04]},Gu={stand:[0,1,2].map(i=>({breathe:[0,.006,.012][i],sway:[0,.02,.035][i],free:[.04,.5+[0,.006,.012][i],.18],hand:"rest",broom:hc})),land:[{crouch:.2,hop:.01,broom:{astride:!0},sway:.05},{crouch:.1,bend:.1,broom:{binding:[-.28,.26,-.08],dir:[.6,.5,-.06]},legUp:[.18,.24,.12],sway:.03,free:[.2,.58,.2],hand:"rest"},{breathe:.004,broom:{binding:[.06,.31,-.2],dir:[.18,1,-.03]},sway:.015,free:[.06,.52,.19],hand:"rest"}],takeoff:[{crouch:.1,broom:{binding:[-.1,.3,-.17],dir:[.35,.7,-.04]},free:[.16,.58,.2],hand:"rest",sway:.02},{crouch:.15,bend:.1,broom:{binding:[-.3,.28,-.06],dir:[.7,.4,-.04]},legUp:[.1,.26,.13],sway:.04,free:[.24,.55,.17],hand:"rest"},{hop:.1,broom:{astride:!0},toes:!0,sway:.06}],talk:[{free:[.47,.84,.13],hand:"palm",tilt:.35,mouth:!0,sway:.01},{free:[.32,1.18,.12],hand:"point",tilt:-.25,look:.12,sway:.02},{free:[.24,1.16,.3],elbow:[.26,.88,.26],hand:"wave",tilt:.45,mouth:!0,sway:.03},{free:[.15,.76,.1],hand:"chest",tilt:-.35,breathe:.01,sway:.015}],placeSigil:[{free:[.16,1.62,.1],hand:"palm",look:.22,breathe:.01,sway:.02},{free:[.42,1,.12],hand:"palm",look:.08,sway:.03},{crouch:.7,bend:.55,free:[.38,.1,.13],hand:"down",look:-.08,sway:.04}],liftSigil:[{crouch:.7,bend:.55,free:[.36,.08,.13],hand:"down",look:-.08,sway:.02},{crouch:.25,bend:.18,free:[.44,.82,.12],hand:"palm",look:.05,sway:.04},{breathe:.012,free:[.2,1.64,.1],hand:"palm",look:.25,sway:.05,toes:!0}],sit:[0,1].map(i=>({sit:!0,swing:[.06,-.06][i],bend:-.08,look:[.02,.1][i],tilt:[.15,-.2][i],sway:[.01,.03][i],breathe:[0,.008][i],broom:{binding:[-.24,.31,-.3],dir:[.32,1,-.06]},free:[.2,Rs+.14,.15],far:[.18,Rs+.14,-.13],hand:"rest"}))};function Hu(i,e,t){const n=Math.hypot(e[0]-i[0],e[1]-i[1]),r=A.lerp(i,e,.5);if(n>=2*t)return r;const a=Math.sqrt(t*t-n*n/4),s=(e[0]-i[0])/n,o=(e[1]-i[1])/n;return[r[0]-o*a,r[1]+s*a,r[2]]}function Vu(i,e){const t=Gu[i],n={crouch:0,bend:0,hop:0,breathe:0,sway:0,tilt:0,look:0,broom:hc,...t[e%t.length]},r=new Qe({blend:.03}),a=n.hop,s=n.sway,o=n.sit?Rs+.06:.45-n.crouch*.21+a,c=-n.crouch*.12,l=!!n.broom.astride,u=o-.04,d=l?[1,0,0]:A.norm(n.broom.dir),h=l?[-.36,u,0]:n.broom.binding,p=T=>A.add(h,A.mul(d,T));r.seg(p(0),p(l?.98:1.1),.022,.018,f.BROOM,{group:2}),r.ell(p(-.13),[.17,.07,.08],f.STRAW,{dir:d,group:3,paint:T=>{const I=A.dot(A.sub(T,h),d);return I<-.22?f.MAGIC2:I>-.01?f.BROOM:void 0}});for(const T of[-1,1]){const I=T>0?6:4,C=[c,o,T*.07],O=n.sit?n.swing*T:0,F=n.sit?[.24+O,.09+Math.max(0,O)*.6,T*.1]:T>0&&n.legUp?n.legUp:[(T>0?.05:-.01)+(n.toes?-.03:0),.07+(n.toes?a*.4:a),T*.1],D=n.sit?[.21,o+.01,T*.09]:Hu(C,F,.21);r.seg(C,D,.055,.045,f.JEANS,{group:I}),r.seg(D,F,.045,.04,f.JEANS,{group:I});const B=n.toes?[.03,-.045,0]:[.05,-.03,0];r.ell(A.add(F,B),[.08,.04,.045],f.SHOES,{dir:n.toes?[1,-.6,0]:[1,0,0],group:I,paint:W=>W[1]<F[1]+B[1]-.015?f.BELLY:void 0})}const _=[Math.sin(n.bend),Math.cos(n.bend),0],x=[Math.cos(n.bend),-Math.sin(n.bend),0],g=[c,o+.03,0];r.ell(g,[.1,.08,.105],f.JEANS,{group:1});const m=A.add(g,A.add(A.mul(_,.19),[0,n.breathe,0]));r.ell(m,[.1,.15+n.breathe*.5,.115],f.JACKET,{dir:x,group:1,paint:T=>A.dot(A.sub(T,m),x)>.045&&Math.abs(T[2])<.05?f.TOP:void 0}),r.chain([[...A.add(m,A.add(A.mul(x,-.07),A.mul(_,-.08))),.07],[...A.add(m,A.add(A.mul(x,-.11-s),A.mul(_,-.2))),.05],[...A.add(m,A.add(A.mul(x,-.13-s*1.6),A.mul(_,-.29))),.025]],f.JACKET,{group:12});const M=A.add(m,A.add(A.mul(_,.27),[n.look*.03,0,n.tilt*.04])),E=T=>A.add(m,A.add(A.mul(_,.1),[0,0,T*.12])),b=l?[.28,u+.03,-.05]:p(Math.max(.12,(Math.min(.62,o+.2)-h[1])/Math.max(.3,d[1]))),R=l?[.28,u+.03,.05]:n.free;for(const T of[-1,1]){const I=T>0?7:5,C=E(T),O=T>0?R:n.far||b,F=T>0&&n.elbow?n.elbow:A.add(A.lerp(C,O,.5),[-.03,-.02,T*.05]);r.seg(C,F,.04,.035,f.JACKET,{group:I}),r.seg(F,O,.035,.03,f.JACKET,{group:I});const D=T>0&&!l?n.hand:"grip";if(D==="palm")r.ell(O,[.045,.02,.04],f.SKIN,{group:I});else if(D==="down")r.ell(O,[.045,.02,.04],f.SKIN,{dir:[1,.15,0],group:I});else if(D==="wave"){r.ell(O,[.03,.045,.04],f.SKIN,{group:I});for(const B of[-1,0,1])r.seg(A.add(O,[0,.03,B*.02]),A.add(O,[B*.01,.065,B*.03]),.01,.008,f.SKIN,{group:I})}else D==="point"?(r.ell(O,[.035,.03,.035],f.SKIN,{group:I}),r.seg(A.add(O,[0,.02,0]),A.add(O,[.01,.08,0]),.012,.01,f.SKIN,{group:I})):r.ell(O,[.035,.03,.035],f.SKIN,{group:I})}r.ell(M,[.11,.115,.1],f.SKIN,{group:8,paint:T=>T[0]<M[0]-.01||T[1]>M[1]+.075?f.HAIR:void 0});for(const T of[-1,1])r.ell(Qe.surface(M,[.11,.115,.1],A.norm([.85,.05+n.look,T*.45+n.tilt*.1])),[.016,.026,.016],f.EYE,{group:8});n.mouth&&r.ell(Qe.surface(M,[.11,.115,.1],A.norm([1,-.5+n.look,n.tilt*.1])),[.012,.016,.025],f.NOSE,{group:8}),r.chain([[...A.add(M,[-.06,.02,0]),.06],[...A.add(M,[-.12-s,-.12,.02+n.tilt*.03]),.05],[...A.add(M,[-.13-s*1.5,-.25,.03+n.tilt*.04]),.03]],f.HAIR,{group:9});for(const T of[-1,1])r.ell(A.add(M,[-.015,0,T*.105]),[.05,.055,.03],f.PHONES,{group:10});r.chain([[...A.add(M,[-.005,.03,-.095]),.015],[...A.add(M,[-.005,.11,-.05]),.015],[...A.add(M,[-.005,.125,0]),.015],[...A.add(M,[-.005,.11,.05]),.015],[...A.add(M,[-.005,.03,.095]),.015]],f.PHONES,{group:10});const w=A.add(M,[-.03,.1,n.tilt*.02]),P=n.tilt*.05,S=A.add(w,[-.16-s*.5,.27,P*2]);return r.ell(w,[.16,.014,.15],f.HAT,{dir:[1,.25-n.look*.8,n.tilt*.3],group:11}),r.chain([[...A.add(w,[0,.01,0]),.085],[...A.add(w,[-.05,.17,P]),.045],[...S,.012]],f.HAT,{group:11,paint:T=>T[1]<w[1]+.045?f.MAGIC:void 0}),r.ell([.02,.005,0],[.2,.005,.12],f.NOSE,{group:0}),r.anchors.hand=R,r.anchors.hatTip=S,r}function dc({frame:i=0,lean:e=!1,pose:t}={}){if(t==="fast")return zu(i);if(ku[t])return Vu(t,i);const n=t==="rise",r=t==="descend",a=t==="brake",s=n||r||a,o=new Qe({blend:.03}),c=s?0:[0,.025,.045][i%3],l=s?0:[0,.015,-.01][i%3]+(e?.08:0),u=.42+c,d=n?.3:r?-.27:a?-.12:e?.1:0,h=Math.min(.1,Math.max(0,d)),p=s?[.02,.06][i%2]:[0,.03,.05][i%3],_=r?1:n?-.6:0;o.seg([-.5,u-l*2,0],[.62,u+l*3,0],.022,.018,f.BROOM,{group:2}),a?o.ell([-.56,u-.08,0],[.17,.07,.09],f.STRAW,{dir:[.55,1,0],group:3,paint:E=>E[1]<u-.18?f.MAGIC2:E[1]>u-.01?f.BROOM:void 0}):o.ell([-.62,u-l*2-.01,0],[.17,.07,.08],f.STRAW,{dir:[1,l,0],group:3,paint:E=>E[0]<-.72?f.MAGIC2:E[0]>-.5?f.BROOM:void 0});for(const E of[-1,1]){const b=[-.04,u+.06,E*.07],R=a?[.18,u-.01,E*.14]:r?[.16,u-.05,E*.14]:n?[.06,u-.07,E*.14]:[.12+d*.5,u-.02,E*.14],w=a?E>0?[.44,u-.02+p,E*.13]:[.3,u-.16,E*.13]:r?[.2,u-.26,E*.13]:n?[-.1,u-.23,E*.13]:[.08+d,u-.2,E*.13];o.seg(b,R,.055,.045,f.JEANS,{group:E>0?6:4}),o.seg(R,w,.045,.04,f.JEANS,{group:E>0?6:4}),o.ell(A.add(w,[.05,-.02,0]),[.08,.04,.045],f.SHOES,{group:E>0?6:4,paint:P=>P[1]<w[1]-.04?f.BELLY:void 0})}o.ell([-.04,u+.08,0],[.11,.07,.1],f.JEANS,{group:1});const x=[0+d*.8,u+.26-Math.abs(d)*.3,0];o.ell(x,[.1,.16,.11],f.JACKET,{dir:[d*2.5,1,0],up:[-1,0,0],group:1,paint:E=>E[0]>x[0]+.04&&Math.abs(E[2])<.055?f.TOP:void 0}),a?o.chain([[...A.add(x,[-.08,-.06,0]),.07],[...A.add(x,[-.02,.12+p,.02]),.05],[...A.add(x,[.14,.18+p,.03]),.025]],f.JACKET,{group:12}):s&&o.chain([[...A.add(x,[-.08,-.1,0]),.07],[...A.add(x,[-.2,-.12+_*(.08+p),0]),.05],[...A.add(x,[-.3,-.12+_*(.16+p*1.5),.02]),.025]],f.JACKET,{group:12});const g=A.add(x,[.03+d*.5,.26,0]),m=A.add(g,[a?.05:r?-.01:-.03,a?.06:.1,0]);for(const E of[-1,1]){const b=A.add(x,[.01,.11,E*.11]),R=r&&E>0?A.add(m,[.1,.01,.1]):a?[.3,u+.03,E*.05]:[.26+d,u+.03,E*.05],w=r&&E>0?A.add(b,[.1,.02,.1]):A.lerp(b,R,.5);o.seg(b,w,.04,.035,f.JACKET,{group:E>0?7:5}),o.seg(w,R,.035,.03,f.JACKET,{group:E>0?7:5}),o.ell(R,[.035,.03,.035],f.SKIN,{group:E>0?7:5})}o.ell(g,[.11,.115,.1],f.SKIN,{group:8,paint:E=>E[0]<g[0]-.01||E[1]>g[1]+.075?f.HAIR:void 0});for(const E of[-1,1])o.ell(Qe.surface(g,[.11,.115,.1],A.norm([.85,.05,E*.45])),[.016,.026,.016],f.EYE,{group:8});a?o.chain([[...A.add(g,[-.06,.06,0]),.06],[...A.add(g,[.04,.13+p,.03]),.045],[...A.add(g,[.2,.08+p,.04]),.02]],f.HAIR,{group:9}):o.chain([[...A.add(g,[-.06,.02,0]),.06],[...A.add(g,[-.18-h,-.05+p+_*.1,.02]),.045],[...A.add(g,[-.3-h*1.5,-.08+p*1.6+_*.22,.03]),.02]],f.HAIR,{group:9});for(const E of[-1,1])o.ell(A.add(g,[-.015,0,E*.105]),[.05,.055,.03],f.PHONES,{group:10});o.chain([[...A.add(g,[-.005,.03,-.095]),.015],[...A.add(g,[-.005,.11,-.05]),.015],[...A.add(g,[-.005,.125,0]),.015],[...A.add(g,[-.005,.11,.05]),.015],[...A.add(g,[-.005,.03,.095]),.015]],f.PHONES,{group:10});const M=n?.1:0;if(o.ell(m,[.16,.014,.15],f.HAT,{dir:a?[1,-.55,0]:[1,.25+M*3,0],group:11}),o.chain(a?[[...A.add(m,[0,.01,0]),.085],[...A.add(m,[.06,.16,0]),.045],[...A.add(m,[.2,.22+p*.5,0]),.012]]:[[...A.add(m,[0,.01,0]),.085],[...A.add(m,[-.05-h-M*.5,.17-M*.3,0]),.045],[...A.add(m,[-.16-h*1.5-M,.27+p*.5-M*.5,0]),.012]],f.HAT,{group:11,paint:E=>E[1]<m[1]+.045?f.MAGIC:void 0}),s){const E=Bu[t]+(a?[0,.06][i%2]:0),b=Math.cos(E),R=Math.sin(E),w=[0,u,0],P=C=>[w[0]+(C[0]-w[0])*b-(C[1]-w[1])*R,w[1]+(C[0]-w[0])*R+(C[1]-w[1])*b,C[2]],S=C=>[w[0]+(C[0]-w[0])*b+(C[1]-w[1])*R,w[1]-(C[0]-w[0])*R+(C[1]-w[1])*b,C[2]],T=C=>[C[0]*b-C[1]*R,C[0]*R+C[1]*b,C[2]];for(const C of o.parts)if(C.type==="ell"?(C.c=P(C.c),C.axes=C.axes.map(T)):(C.a=P(C.a),C.b=P(C.b)),C.paint){const O=C.paint;C.paint=(F,D)=>O(S(F),D)}for(const C of o.flats)C.c=P(C.c),C.u=T(C.u),C.v=T(C.v);const I=Math.min(...o.parts.map(C=>C.type==="ell"?C.c[1]-Math.max(...C.r):Math.min(C.a[1]-C.r1,C.b[1]-C.r2)));if(I<.08)for(const C of o.parts){const O=.08-I;C.type==="ell"?C.c=[C.c[0],C.c[1]+O,C.c[2]]:(C.a=[C.a[0],C.a[1]+O,C.a[2]],C.b=[C.b[0],C.b[1]+O,C.b[2]])}if(a){const C=P([-.45,u-.24,0]);for(let O=0;O<5;O++){const F=O+i*.5,D=.055-O*.008;o.ell([C[0]+.1+F*.08,Math.max(.04,C[1]-.02+Math.sin(F*1.9)*.04),Math.cos(F*1.3)*.06],[D,D*.8,D],O<2?f.BELLY:O%2?f.MAGIC:f.MAGIC2,{group:25+O,extra:!0})}}if(n){const C=P([-.8,u,0]);for(let O=0;O<5;O++){const F=O+i*.5,D=.05-O*.007;o.ell([C[0]-.02+Math.sin(F*2.1)*.06,Math.max(.04,C[1]-.08-F*.09),Math.cos(F*1.7)*.05],[D,D,D],O%2?f.MAGIC:f.MAGIC2,{group:20+O,extra:!0})}}}return o.ell([.02,.005,0],[.2,.005,.12],f.NOSE,{group:0}),o}const fc=(i={})=>Math.round((i.size||8)*Math.sqrt(i.growth||20)*(2/(i.pixel||3))*1.9),Ka=new Map,pc=i=>(Ka.has(i)||Ka.set(i,Ai(dc({frame:0}),{height:i}).s),Ka.get(i)),Wu=(i={})=>pc(fc(i));function Xu(i={},{frame:e=0,lean:t=!1,facing:n="towards",pose:r}={}){const a=fc(i),s=dc({frame:e,lean:t,pose:r}),{sp:o,project:c}=r?Ai(s,{scale:pc(a),facing:n}):Ai(s,{height:a,facing:n});s.anchors.hand&&(o.anchors={hand:c(s.anchors.hand),hatTip:c(s.anchors.hatTip)});let l=0;for(let u=0;u<400&&l<6;u++){const d=u*37%o.w,h=u*53%Math.floor(o.h*.8);o.get(d,h)||o.get(d+1,h)||o.get(d-1,h)||o.get(d,h+1)||o.get(d,h-1)||(d*7+h*13+e*5)%11||(o.px(d,h,f.MAGIC2),l++)}return o}const nt=(i,e=0)=>{const t=Math.sin(i*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},Zi=i=>{const e=nt(Math.floor(i[0]*14)+Math.floor(i[2]*14)*13,Math.floor(i[1]*6));return e<.14?f.BARKD:e>.88?f.BARKL:void 0},Yu=i=>e=>{const t=nt(Math.floor(e[0]*10),Math.floor(e[1]*10)+Math.floor(e[2]*10)*7);return e[1]<i[1]-.2||t<.2?f.LEAF3:t>.8?f.LEAF2:void 0},On=(i,e,t,n,r=!0)=>i.ell(e,t,f.STONE,{group:n,rough:.025,paint:a=>a[1]>e[1]+t[1]*.45&&r?f.MOSS:Math.abs(Math.sin(a[0]*13+a[2]*7))<.06?f.STONED:void 0}),Hr=(i,e,t,n)=>i.ell(e,t,f.LEAF,{group:n,rough:.04,paint:Yu(e)}),Gt=(i,e,t)=>i.chain(e,f.TRUNK,{group:t,rough:.012,paint:Zi}),Vr=(i,e,t,n,r,a=.3,s=f.LEAF2)=>{for(let o=0;o<e;o++){const c=nt(r,o)*6.283,l=t*Math.sqrt(nt(o,r)),u=Math.cos(c)*l,d=Math.sin(c)*l*.7;i.ell([u,a*.3,d],[.07,a*(.35+nt(o,4)*.3),.07],s,{group:n+o%3,paint:h=>h[1]>a*.45?f.LEAF:void 0})}},Wr=(i,e,t,n)=>i.ell(e,[t[0],.015,t[1]],f.WATER,{group:n}),Ku={"sleeping-giant"(i){const e=t=>n=>{const r=nt(Math.floor(n[0]*8),Math.floor(n[2]*8)+Math.floor(n[1]*8)*5);return r<.15?f.LEAF3:r>.86?f.LEAF2:void 0};for(const[t,n]of[[[.85,.42,0],[.7,.5,.66]],[[0,.3,0],[.62,.36,.6]],[[-.8,.3,0],[.56,.36,.62]],[[1.85,.5,.02],[.5,.5,.48]],[[-1.55,.72,.3],[.38,.5,.3]],[[-1.55,.72,-.3],[.38,.5,.3]],[[-2.2,.3,.32],[.42,.3,.26]],[[-2.2,.3,-.32],[.42,.3,.26]],[[.6,.2,.78],[.75,.2,.2]],[[.6,.2,-.78],[.75,.2,.2]]])i.ell(t,n,f.MOSS,{group:1,rough:.03,paint:e()});On(i,[2.25,.75,.12],[.13,.15,.11],2,!1);for(const t of[-.12,.22])i.ell([2.12,.88,t],[.08,.04,.07],f.STONED,{group:3});On(i,[-.2,.16,.95],[.2,.15,.18],4),On(i,[-.2,.16,-.95],[.18,.14,.16],5),i.ell([2,.95,.02],[.42,.14,.4],f.LEAF3,{group:6,rough:.03}),Vr(i,26,2.8,10,3,.3)},"fern-grotto"(i){i.ell([0,.16,0],[.78,.2,.72],f.STONE,{group:1,rough:.015,paint:e=>e[1]>.3?f.MOSS:void 0}),Wr(i,[0,.345,0],[.55,.5],2);for(let e=0;e<6;e++){const t=e/6*Math.PI*2+.4,n=1.5+nt(e)*.3,r=[Math.cos(t)*n,0,Math.sin(t)*n*.8],a=1.1+nt(e,2)*.7,s=A.add(r,[0,a,0]);i.seg(r,s,.12,.09,f.TRUNK,{group:3+e,rough:.02,paint:Zi});for(let o=0;o<7;o++){const c=o/7*Math.PI*2+e,l=[Math.cos(c),0,Math.sin(c)];i.chain([[...s,.05],[...A.add(s,A.add(A.mul(l,.45),[0,.18,0])),.04],[...A.add(s,A.add(A.mul(l,.9),[0,-.15,0])),.015]],o%2?f.LEAF:f.LEAF2,{group:10+e})}}for(let e=0;e<5;e++){const t=e*1.3;On(i,[Math.cos(t)*.95,.08,Math.sin(t)*.95],[.16,.12,.14],20+e)}},"sunken-boat"(i){Wr(i,[.3,.01,.15],[1.9,1.15],1);const e=[0,.12,0],t=A.norm([1,.28,.12]);i.ell(e,[1.3,.45,.55],f.WOOD,{dir:t,group:2,paint:n=>(A.dot(A.sub(n,e),[0,1,0])*9+9)%1<.14?f.BARKD:n[1]>.35&&nt(Math.floor(n[0]*9))<.4?f.MOSS:void 0}),i.ell(A.add(e,[0,.14,0]),[1.2,.4,.47],f.BARKD,{dir:t,group:2,cut:!0});for(let n=-2;n<=2;n++)i.seg(A.add(e,A.add(A.mul(t,n*.4),[0,.1,-.42])),A.add(e,A.add(A.mul(t,n*.4),[0,.1,.42])),.04,.04,f.WOOD,{group:3});i.seg([-.9,.05,.7],[.3,1,.55],.03,.03,f.WOOD,{group:4}),i.box([-.98,.06,.72],[.2,.02,.07],f.WOOD,{dir:[1.2,-.8,-.15],group:4}),Vr(i,18,2.2,10,5,.45)},"bramble-wagon"(i){const e=A.norm([1,-.12,0]);i.box([0,.62,0],[1.1,.22,.52],f.WOOD,{dir:e,round:.04,group:1,paint:t=>(t[0]+3)*4%1<.08?f.BARKD:void 0}),i.box([0,.72,0],[1,.2,.43],f.BARKD,{dir:e,group:1,cut:!0});for(const[t,n,r,a]of[[-.72,.55,.4,.4],[-.72,-.55,.4,.4],[.72,-.55,.32,.37]])i.ell([t,r,n],[a,a,.06],f.WOOD,{group:2+(t>0?1:0)+(n>0?2:0),paint:s=>{const o=s[0]-t,c=s[1]-r,l=Math.hypot(o,c),u=Math.atan2(c,o);return l>a*.82||l<a*.18?f.BARKD:Math.abs(Math.sin(u*4))<.2?f.WOOD:f.NOSE}});i.ell([.95,.1,.75],[.37,.06,.37],f.WOOD,{group:7,paint:t=>Math.hypot(t[0]-.95,t[2]-.75)>.3?f.BARKD:void 0});for(const t of[-.3,.3])i.seg([1.05,.55,t],[1.9,.05,t*1.4],.04,.035,f.WOOD,{group:8});for(let t=0;t<14;t++){const n=nt(t,1)*6.283,r=Math.cos(n)*1.5,a=Math.sin(n)*.9,s=[[r,0,a,.03]];for(let o=1;o<4;o++)s.push([r*(1-o*.28)+(nt(t,o)-.5)*.5,.25+o*.25+nt(o,t)*.2,a*(1-o*.3)+(nt(o,t*3)-.5)*.4,.025-o*.004]);if(i.chain(s,f.BARKD,{group:10+t%3}),t%2===0){const o=s[3];i.ell([o[0],o[1],o[2]],[.18,.13,.16],f.LEAF,{group:14,rough:.03,paint:c=>nt(Math.floor(c[0]*30),Math.floor(c[1]*30))<.1?f.ACCENT:void 0})}}},"beehive-tree"(i){for(const[t,n,r]of[[-.2,0,-.25],[.15,-.1,.2],[0,.15,.05]])Gt(i,[[t,0,n,.22],[t+r*.8,1.4,n,.16],[t+r*2,2.8,n-.1,.08]],1);for(const[t,n]of[[[-.6,2.9,-.2],[.9,.6,.7]],[[.6,3,-.2],[.85,.6,.7]],[[0,3.4,-.3],[.9,.55,.7]]])Hr(i,t,n,3);Gt(i,[[.2,1.9,-.05,.08],[.75,2.05,.15,.05]],2);const e=[.72,1.6,.2];i.ell(e,[.24,.42,.22],f.STRAW,{group:4,paint:t=>{const n=Math.floor((t[1]-e[1])*14),r=Math.floor(Math.atan2(t[2]-e[2],t[0]-e[0])*3+n%2*.5);return nt(n,r)<.3?f.BARK2:void 0}}),i.seg([.75,2.02,.15],[.72,1.9,.2],.05,.1,f.STRAW,{group:4});for(let t=0;t<6;t++){const n=t*1.9;i.ell([e[0]+Math.cos(n)*.45,e[1]+Math.sin(t*2.3)*.35,e[2]+Math.sin(n)*.35],[.03,.025,.03],f.MAGIC,{group:20+t,extra:!0})}},"fairy-ring"(i){i.ell([0,.005,0],[1.9,.005,1.5],f.LEAF3,{group:0});for(let e=0;e<9;e++){const t=e/9*Math.PI*2,n=[Math.cos(t)*1.6,0,Math.sin(t)*1.25],r=.35+nt(e)*.35;i.box(A.add(n,[0,r/2,0]),[.13,r/2,.1],f.STONE,{dir:[-Math.sin(t),0,Math.cos(t)],round:.05,rough:.015,group:1+e,paint:s=>e===2&&Math.abs(s[1]-r*.55)<r*.22&&Math.abs(s[0]-n[0]-0)<.05?f.RUNE:s[1]>r*.85?f.MOSS:void 0});const a=A.add(n,[Math.cos(t+.35)*.25,0,Math.sin(t+.35)*.2]);i.seg(a,A.add(a,[0,.16,0]),.035,.03,f.CLOTH,{group:12}),i.ell(A.add(a,[0,.18,0]),[.1,.06,.1],f.ACCENT,{group:13,paint:s=>nt(Math.floor(s[0]*60),Math.floor(s[2]*60))<.15?f.BELLY:void 0})}},"charcoal-hut"(i){const e=[0,2,0];for(let n=0;n<20;n++){const r=n/20*Math.PI*2;Math.abs(r-1.2)<.35||i.seg([Math.cos(r)*.95,0,Math.sin(r)*.8],A.add(e,[Math.cos(r)*.08,.1+nt(n)*.25,Math.sin(r)*.08]),.05,.03,n%3?f.TRUNK:f.BARKD,{group:1+n%2})}i.ell([0,.6,0],[.85,.6,.7],f.BARKD,{group:3});const t=[1.7,0,.3];i.ell(t,[.85,.42,.7],f.BARKD,{group:4,rough:.03,paint:n=>nt(Math.floor(n[0]*14),Math.floor(n[2]*14)+Math.floor(n[1]*14))<.07?f.GLOW:n[1]>.3?f.SHADES:void 0});for(let n=0;n<4;n++)i.seg([-1.4,.1+n*.14,-.5+n%2*.05],[-1.4,.1+n*.14,.5],.07,.07,f.TRUNK,{group:5+n%2,paint:r=>Math.abs(r[2])>.46?f.BARKL:void 0})},"root-arch"(i){Gt(i,[[-1.8,0,.1,.4],[-1.4,1.2,0,.34],[-.4,2.3,-.1,.3],[.6,2.4,0,.28],[1.5,1.4,.1,.32],[1.9,0,.15,.38]],1),Gt(i,[[-1.4,0,-.6,.28],[-.6,1.6,-.5,.22],[.5,1.9,-.45,.2],[1.3,.9,-.4,.22],[1.5,0,-.35,.26]],2),Gt(i,[[-1.8,.2,.1,.3],[-2.4,.05,.5,.12]],1),Gt(i,[[1.9,.2,.15,.3],[2.5,.05,.55,.12]],1);for(const[e,t]of[[[-.2,2.6,-.2],[.7,.35,.5]],[[.8,2.5,-.25],[.55,.3,.45]]])Hr(i,e,t,4);for(let e=0;e<4;e++)On(i,[-.7+e*.45,.12,(nt(e)-.5)*.5],[.22,.18,.2],6+e);i.box([0,.35,-.2],[.16,.35,.08],f.STONE,{round:.05,rough:.01,group:11,paint:e=>Math.abs(e[1]-.4)<.14&&Math.abs(e[0])<.05?f.MAGIC:e[1]>.62?f.MOSS:void 0})},"turf-hut"(i){i.box([0,.55,0],[1,.55,.7],f.WOOD,{round:.04,group:1,paint:e=>e[1]*7%1<.18?f.BARKD:e[2]>.66&&Math.abs(e[0]+.2)<.2&&e[1]<.85?f.NOSE:e[2]>.66&&Math.abs(e[0]-.5)<.14&&Math.abs(e[1]-.7)<.12?f.SHADES:void 0});for(const e of[-1,1])i.box([0,1.3,e*.4],[1.15,.05,.5],f.MOSS,{dir:[1,0,0],up:[0,1,-e*.75],round:.03,group:2,paint:t=>nt(Math.floor(t[0]*12),Math.floor(t[2]*12))<.25?f.LEAF2:void 0});i.seg([.65,1.2,-.3],[.65,1.9,-.3],.15,.13,f.STONE,{group:3,rough:.015});for(let e=0;e<5;e++)On(i,[-1.4+e*.7,.12,.9+nt(e)*.3],[.2,.15,.18],4+e);Vr(i,16,1.8,10,9,.25)},"heron-rookery"(i){Gt(i,[[0,0,0,.25],[.4,1.4,0,.18],[.9,2.8,-.1,.12],[1.3,3.8,-.2,.06]],1);const e=[[[.6,2,-.05],[-.3,2,-.1]],[[1,3,-.1],[1.8,2.9,0]],[[1.25,3.6,-.2],[.6,3.7,-.3]]];e.forEach(([r,a],s)=>{Gt(i,[[...r,.07],[...a,.04]],2),i.ell(A.add(a,[0,.08,0]),[.34,.13,.3],f.BARK2,{group:3+s,rough:.025,paint:o=>Math.abs(Math.sin(o[0]*30+o[2]*20))<.25?f.STRAW:o[1]<a[1]+.02?f.BARKD:void 0})});for(const[r,a]of[[[1.2,4,-.4],[.6,.4,.45]],[[.3,3.1,-.5],[.45,.3,.35]],[[1.9,3.3,-.4],[.4,.3,.35]]])Hr(i,r,a,7);const t=A.add(e[1][1],[0,.42,.05]),n=1.6;i.ell(t,[.18*n,.1*n,.09*n],f.BELLY,{dir:[1,.3,0],group:10,paint:r=>r[1]>t[1]+.06?f.STONE:void 0}),i.chain([[...A.add(t,[.12*n,.06*n,0]),.035*n],[...A.add(t,[.2*n,.22*n,0]),.03*n],[...A.add(t,[.16*n,.32*n,0]),.04*n]],f.BELLY,{group:10}),i.seg(A.add(t,[.18*n,.33*n,0]),A.add(t,[.36*n,.3*n,0]),.015*n,.005*n,f.BODY2,{group:11});for(const r of[-.04,.04])i.seg(A.add(t,[0,-.06*n,r]),A.add(t,[.02,-.42,r]),.012,.012,f.BARKD,{group:12})},sundial(i){i.ell([0,.07,0],[1.05,.09,1],f.STONE,{group:1,rough:.01}),i.ell([0,.2,0],[.72,.09,.68],f.STONE,{group:2,rough:.01,paint:e=>e[1]>.26&&nt(Math.floor(e[0]*8),Math.floor(e[2]*8))<.3?f.MOSS:void 0}),i.seg([0,.28,0],[0,.95,0],.16,.13,f.STONE,{group:3,paint:e=>Math.abs(Math.sin(e[1]*30))<.15?f.STONED:void 0}),i.ell([0,1,0],[.38,.04,.38],f.FRAME,{group:4,paint:e=>{const t=Math.atan2(e[2],e[0]);return Math.abs(Math.sin(t*6))<.12&&Math.hypot(e[0],e[2])>.26?f.BARKD:void 0}}),i.box([0,1.12,0],[.2,.1,.01],f.FRAME,{dir:[1,-.5,0],round:.005,group:5});for(let e=0;e<22;e++){const t=e/22*Math.PI*2,n=1.25+nt(e)*.2,r=[Math.cos(t)*n,0,Math.sin(t)*n*.85];i.seg(r,A.add(r,[0,.18,0]),.015,.012,f.LEAF2,{group:6}),i.ell(A.add(r,[0,.2,0]),[.05,.04,.05],[f.FLOWER,f.BELLY,f.ACCENT][e%3],{group:7})}},"bear-den"(i){const e=[0,.3,-.2];i.ell(e,[1.7,1.15,1.25],f.LEAF,{group:1,rough:.05,paint:t=>{const n=nt(Math.floor(t[0]*16),Math.floor(t[1]*16)+Math.floor(t[2]*16)*3);return n<.06?f.ACCENT:n<.2?f.BARKD:t[1]<.4?f.LEAF3:n>.85?f.LEAF2:void 0}}),i.ell([.35,.35,.95],[.5,.55,.4],f.NOSE,{group:1,cut:!0}),i.seg([2,0,.5],[2,.65,.5],.3,.27,f.TRUNK,{group:3,paint:t=>t[1]>.6?f.BARKL:Math.abs(Math.sin(Math.atan2(t[2]-.5,t[0]-2)*3))<.12&&t[1]>.2?f.BARKD:void 0})},"stilt-hut"(i){Wr(i,[0,.01,.1],[2.1,1.3],1);for(const[e,t]of[[-.75,-.55],[.75,-.55],[-.75,.55],[.75,.55]])i.seg([e,0,t],[e,1.05,t],.07,.06,f.WOOD,{group:2,paint:n=>n[1]<.15?f.MOSS:void 0});i.box([0,1.1,0],[1.05,.05,.8],f.WOOD,{round:.02,group:3,paint:e=>(e[0]+3)*6%1<.12?f.BARKD:void 0}),i.box([-.1,1.6,-.1],[.7,.45,.55],f.WOOD,{round:.03,group:4,paint:e=>e[2]>.4&&Math.abs(e[0]-.1)<.18&&e[1]<1.85?f.NOSE:void 0});for(const[e,t]of[[2.1,.92],[2.35,.72],[2.58,.48],[2.76,.24]])i.ell([-.1,e,-.1],[t,.16,t*.85],f.STRAW,{group:5,paint:n=>Math.abs(Math.sin(Math.atan2(n[2]+.1,n[0]+.1)*18))<.25?f.BARK2:void 0});for(const e of[.72,.95])i.seg([.9,1.1,e],[1.15,0,e],.02,.02,f.WOOD,{group:6});for(let e=0;e<4;e++)i.seg([.92+e*.06,1-e*.26,.72],[.92+e*.06,1-e*.26,.95],.02,.02,f.WOOD,{group:6});for(let e=0;e<26;e++){const t=nt(e,7)*6.283,n=1.5+nt(e,8)*.7,r=[Math.cos(t)*n,0,Math.sin(t)*n*.7],a=.5+nt(e,9)*.5;i.seg(r,A.add(r,[0,a,0]),.028,.02,f.LEAF2,{group:10+e%3}),e%3===0&&i.ell(A.add(r,[0,a-.05,0]),[.025,.07,.025],f.BARKD,{group:13})}},"bog-shrine"(i){Wr(i,[.6,.01,.4],[1.4,.9],1),i.seg([0,0,0],[0,1.9,0],.2,.17,f.TRUNK,{group:2,rough:.01,paint:e=>{const t=e[1];return e[2]>.12&&(Math.abs(t-1.6)<.05&&Math.abs(Math.abs(e[0])-.08)<.05||Math.abs(t-1.38)<.04&&Math.abs(e[0])<.1)||t*5%1<.07?f.BARKD:e[1]>1.85?f.MOSS:void 0}}),i.ell([0,1.95,0],[.24,.1,.24],f.MOSS,{group:3});for(let e=0;e<6;e++){const t=e/6*Math.PI*2;i.seg([Math.cos(t)*1,0,Math.sin(t)*.8],[Math.cos(t)*1,.35+nt(e)*.25,Math.sin(t)*.8],.05,.04,f.TRUNK,{group:4})}i.ell([-.25,.06,.3],[.14,.07,.13],f.EAR,{group:5}),On(i,[.3,.07,.3],[.09,.07,.08],6,!1),On(i,[.15,.05,.42],[.06,.05,.06],7,!1);for(const[e,t,n]of[[.9,.9,.5],[1.4,1.2,.1],[.4,1.4,.8]])i.ell([e,t,n],[.06,.07,.06],f.MAGIC,{group:20+e*10,extra:!0,paint:r=>Math.hypot(r[0]-e,r[1]-t)<.03?f.MAGIC2:void 0});Vr(i,20,2,10,11,.3,f.WEB)},"raven-tree"(i){Gt(i,[[0,0,0,.3],[.1,1.3,0,.22],[-.1,2.5,-.1,.16],[.1,3.6,-.15,.07]],1),[[[.1,1.6,0],[1.3,2.3,.1],[1.8,2.2,.1]],[[-.05,2.1,-.05],[-1.2,2.8,-.1],[-1.6,3.2,-.1]],[[0,2.9,-.1],[.8,3.5,-.2]]].forEach((r,a)=>Gt(i,r.map((s,o)=>[...s,.12-o*.04]),2+a)),Gt(i,[[-.1,.5,0,.22],[-1.1,.1,.5,.08]],5),Gt(i,[[.1,.4,0,.2],[.9,.05,-.4,.08]],5);const t=(r,a)=>{i.ell(r,[.12,.07,.06],f.SHADES,{dir:[1,.2,0],group:a}),i.ell(A.add(r,[.11,.07,0]),[.05,.05,.045],f.SHADES,{group:a}),i.seg(A.add(r,[.15,.07,0]),A.add(r,[.22,.05,0]),.015,.004,f.BODY2,{group:a}),i.seg(A.add(r,[-.1,0,0]),A.add(r,[-.22,-.04,0]),.04,.015,f.SHADES,{group:a})};t([1.3,2.42,.1],10),t([-1.2,2.92,-.1],11),t([.8,3.62,-.2],12),t([-.05,3.72,-.15],13);const n=[1.55,1.45,.1];i.seg([1.55,2.25,.1],A.add(n,[0,.3,0]),.01,.01,f.FRAME,{group:14});for(let r=0;r<6;r++){const a=r/6*Math.PI*2;i.seg(A.add(n,[Math.cos(a)*.2,-.25,Math.sin(a)*.2]),A.add(n,[Math.cos(a)*.12,.3,Math.sin(a)*.12]),.012,.012,f.FRAME,{group:14})}i.seg(A.add(n,[0,-.27,0]),A.add(n,[0,-.25,0]),.22,.22,f.FRAME,{group:14})},barrow(i){i.ell([0,0,-.2],[2.3,.95,1.3],f.LEAF2,{group:1,rough:.03,paint:e=>nt(Math.floor(e[0]*10),Math.floor(e[2]*10)+Math.floor(e[1]*10))<.25?f.LEAF:void 0});for(const e of[-.35,.35])i.box([e,.45,.95],[.12,.45,.12],f.STONE,{round:.03,rough:.01,group:2});i.box([0,.95,.95],[.55,.1,.14],f.STONE,{round:.03,rough:.01,group:3,paint:e=>e[1]>1.02?f.MOSS:void 0}),i.box([0,.4,.9],[.23,.4,.3],f.NOSE,{group:1,cut:!0});for(const[e,t,n]of[[-1.6,1,.7],[1.7,.9,.55]])i.box([e,n/2,t],[.12,n/2,.09],f.STONE,{round:.04,rough:.01,group:4})},cairn(i){let e=0;for(let n=0;n<6;n++){const r=.9-n*.14,a=Math.max(3,9-n);for(let s=0;s<a;s++){const o=s/a*Math.PI*2+n;On(i,[Math.cos(o)*r*.8,e+.14,Math.sin(o)*r*.7],[.24-n*.02,.15,.2-n*.02],1+(n+s)%4,n<2)}e+=.26}const t=[0,e+.1,0];for(let n=0;n<6;n++){const r=n/6*Math.PI*2;i.seg(A.add(t,[Math.cos(r)*.12,0,Math.sin(r)*.12]),A.add(t,[Math.cos(r)*.3,.35,Math.sin(r)*.3]),.02,.02,f.FRAME,{group:6})}i.seg(A.add(t,[0,-.3,0]),t,.05,.05,f.FRAME,{group:6}),i.ell(A.add(t,[0,.14,0]),[.2,.07,.2],f.SHADES,{group:7})},"stump-throne"(i){i.ell([0,.28,0],[.92,.34,.86],f.TRUNK,{group:1,rough:.015,paint:Zi}),i.ell([0,.58,0],[.84,.06,.78],f.BARKL,{group:1,paint:e=>Math.abs(Math.sin(Math.hypot(e[0],e[2])*30))<.3?f.BARK2:void 0}),i.box([-.55,1.15,0],[.18,.62,.62],f.TRUNK,{round:.1,rough:.01,group:2,paint:Zi});for(const e of[-.6,.6])i.box([-.1,.72,e],[.45,.14,.12],f.TRUNK,{round:.06,group:3,paint:Zi});for(let e=0;e<6;e++){const t=e/6*Math.PI*2+.3;Gt(i,[[Math.cos(t)*.8,.25,Math.sin(t)*.8,.18],[Math.cos(t)*1.4,.02,Math.sin(t)*1.3,.06]],4)}i.seg([1.5,.18,.8],[1.5,.18,.2],.18,.18,f.TRUNK,{group:5,paint:e=>e[2]>.78||e[2]<.22?f.BARKL:Zi(e)}),i.seg([1.5,.3,.5],[1.6,.75,.5],.025,.025,f.WOOD,{group:6}),i.box([1.5,.36,.5],[.1,.06,.015],f.FRAME,{group:6});for(let e=0;e<6;e++){const t=e<3?0:1,n=e%3;i.seg([-1.7+n*.3+t*.15,.15+t*.26,-.7],[-1.7+n*.3+t*.15,.15+t*.26,.2],.14,.14,f.TRUNK,{group:7+e%2,paint:r=>r[2]>.16||r[2]<-.66?f.BARKL:void 0})}},"swing-beech"(i){Gt(i,[[0,0,-.3,.45],[0,1.6,-.3,.36],[-.1,2.8,-.4,.26]],1),Gt(i,[[0,2.2,-.3,.2],[1,2.6,-.2,.14],[1.9,2.75,-.1,.08]],2),Gt(i,[[-.05,2.5,-.35,.18],[-1.2,3,-.4,.1]],3);for(let e=0;e<5;e++){const t=e/5*Math.PI*2;Gt(i,[[Math.cos(t)*.35,.3,-.3+Math.sin(t)*.3,.2],[Math.cos(t)*.9,.02,-.3+Math.sin(t)*.8,.07]],4)}for(const[e,t]of[[[0,3.4,-.6],[1.4,.8,1]],[[1.4,3.1,-.4],[.9,.55,.7]],[[-1.3,3.2,-.6],[.9,.6,.7]]])Hr(i,e,t,5);for(const e of[-.12,.12])i.seg([1.3,2.65,e],[1.3,.55,e],.012,.012,f.STRAW,{group:6});i.box([1.3,.53,0],[.08,.025,.18],f.WOOD,{round:.01,group:6});for(let e=0;e<9;e++)i.ell([(nt(e,1)-.5)*3,.05+nt(e,2)*.5,(nt(e,3)-.3)*1.6],[.022,.022,.022],f.MAGIC,{group:20+e,extra:!0})},bower(i){for(const t of[-.9,0,.9])for(const n of[-.6,.6])i.seg([t,0,n],[t,1.2,n],.04,.04,f.WOOD,{group:1});for(const t of[-.9,0,.9])i.chain([[t,1.2,-.6,.04],[t,1.62,-.3,.04],[t,1.72,0,.04],[t,1.62,.3,.04],[t,1.2,.6,.04]],f.WOOD,{group:2});for(const t of[-.6,.6])for(const n of[.5,1])i.seg([-.9,n,t],[.9,n,t],.025,.025,f.WOOD,{group:3});const e=t=>{const n=nt(Math.floor(t[0]*26),Math.floor(t[1]*26)+Math.floor(t[2]*26)*3);return n<.12?f.BELLY:n<.2?f.STRAW:n>.85?f.LEAF2:void 0};for(const[t,n]of[[[-.6,1.6,0],[.6,.3,.75]],[[.5,1.65,0],[.65,.3,.75]],[[-.95,.9,-.55],[.25,.65,.25]],[[.95,.8,-.6],[.25,.55,.25]],[[-.9,.7,.62],[.22,.5,.2]],[[.2,1.3,-.65],[.5,.4,.2]]])i.ell(t,n,f.LEAF,{group:4,rough:.04,paint:e});i.box([0,.4,-.35],[.6,.04,.15],f.WOOD,{round:.02,group:5});for(const t of[-.5,.5])i.seg([t,0,-.35],[t,.38,-.35],.03,.03,f.WOOD,{group:5})}},mc={moor:["sleeping-giant","the sleeping giant, a moss mound like a figure lying on its back",1],"fern-forest":["fern-grotto","a ring of giant tree ferns round a stone basin",1],"muddy-forest":["sunken-boat","an old rowing boat sunk in the mud",1.15],"tangly-forest":["bramble-wagon","an old wagon wrapped in brambles",1.1],"wispy-forest":["beehive-tree","a many-trunked tree with a great wild honeycomb",1],"hazel-forest":["fairy-ring","a ring of fairy stones and toadstools",1.1],"twiggy-forest":["charcoal-hut","a charcoal burner's hut of sticks, its mound smouldering",1],ancient:["root-arch","a great arch of roots over mossy stones",1.1],norway:["turf-hut","a log cabin with a turf roof",1.15],"alder-forest":["heron-rookery","an alder holding herons' stick nests",1],meadow:["sundial","a moonlit sundial on a stone dais in a ring of flowers",1.2],"berry-thicket":["bear-den","a bear's den in a bramble mound",1.1],wetland:["stilt-hut","a fisher's hut on stilts over a pool",1.1],bog:["bog-shrine","a carved post shrine to the bog, will-o'-wisps over the pool",1.1],deadwood:["raven-tree","a dead tree where the ravens gather",1],grassland:["barrow","a barrow with a stone doorway",1],heath:["cairn","a tall cairn with an old beacon basket",1.4],"old-pinewood":["stump-throne","a woodcutter's stump throne",1.1],"bluebell-glade":["swing-beech","a great beech with a rope swing, glowworms beneath",1],"honeysuckle-tangle":["bower","a honeysuckle bower with a bench",1.2]};function qu(i,e){const t=i.leaf,n=e.trunkHue??.07;return{[f.TRUNK]:ve(n,.45,.36),[f.BARKD]:ve(n+.03,.5,.17),[f.BARKL]:ve(n,.35,.55),[f.BARK2]:ve(n+.02,.45,.26),[f.LEAF]:ve(t,.55,.45),[f.LEAF2]:ve(t-.03,.5,.62),[f.LEAF3]:ve(t+.03,.6,.26),[f.STONE]:[122,120,128],[f.STONED]:[62,60,70],[f.MOSS]:ve(.26,.45,.45),[f.WOOD]:[128,92,58],[f.STRAW]:[190,162,104],[f.CLOTH]:[228,220,200],[f.EAR]:[168,96,66],[f.FRAME]:[150,128,84],[f.SHADES]:[30,28,36],[f.ACCENT]:[196,40,52],[f.BELLY]:[232,228,214],[f.BODY2]:[210,170,60],[f.FLOWER]:[180,140,230],[f.WEB]:[228,228,234],[f.WATER]:[52,78,104],[f.NOSE]:[16,14,20],[f.GLOW]:[255,120,40],[f.MAGIC]:ve(e.magicHue??.45,.6,1),[f.MAGIC2]:ve(e.magicHue??.45,.2,1),[f.RUNE]:[120,230,255],[f.LINE]:[24,22,30]}}function Zu(i,e,t,n=16){const r=new Qe({blend:.05});Ku[i](r),r.ell([0,.004,0],[.01,.004,.01],f.NOSE,{group:0});const a=(Object.values(mc).find(([o])=>o===i)||[,,1])[2],{sp:s}=Ai(r,{scale:Wu(t)*a});return{sp:s,colours:qu(e,t),metres:{width:+(s.w/n).toFixed(1),height:+(s.h/n).toFixed(1)}}}const $u=1.3,Ju=i=>[1,Math.sqrt(i.growth),Math.sqrt(i.growth)*$u,i.growth],pr=(i,e,t=1)=>Math.round(e.size*Ju(e)[Math.max(0,Math.min(3,i))]*(2/(e.pixel||2))*1.9*t),So=(i,e)=>{const t=Mo(e);for(let n=0;n<9;n++){const r=Math.floor(be(t,2,i.w-2)),a=Math.floor(be(t,2,i.h*.6));if(!(i.get(r,a)||i.get(r+1,a)||i.get(r-1,a)||i.get(r,a+1)||i.get(r,a-1))&&(i.px(r,a,f.MAGIC2),n%3===0))for(const[s,o]of[[1,0],[-1,0],[0,1],[0,-1]])i.px(r+s,a+o,f.MAGIC)}};function Na(i,e,t,n,r,a,s,o){const c=A.add(e,[-n*.7,n*(.75+r),t*n*.35]),l=A.norm(A.sub(c,e)),u=A.norm(A.sub([1,0,0],A.mul(l,A.dot([1,0,0],l)))),d=Math.hypot(...A.sub(c,e));i.flat(A.add(A.lerp(e,c,.5),A.mul(u,-n*.14)),l,u,d*.55,n*.34,ar.wing(a,s),{group:o,extra:!0})}const bo=(i,e,t=1)=>i===0?Math.round(Math.max(12,Math.min(30*Math.max(.75,Math.min(1.1,t)),pr(1,e)*t*.72))):i===2?Math.round(Math.max(pr(1,e)*t*1.08,Math.min(pr(2,e,t),pr(1,e)*1.4))):pr(i,e)*t;let xa=null;function Qu(i,e){const t=xa;xa=i;try{return e()}finally{xa=t}}const ju=(i,e)=>{const t=Math.atan2(e,i);return Math.hypot(i,e)<.55+.4*Math.pow(Math.abs(Math.cos(t*2.5+Math.PI/2)),3)},eh=(i,e)=>{const t=i*1.2,n=-e*1.2+.25;return Math.pow(t*t+n*n-.6,3)-t*t*n*n*n<0};function Eo(i){const e=xa,t=i.anchors;if(!e)return;const n=t.head,r=n?Math.max(...n.r):.2;if(e.collar&&(t.neck||n)){const a=t.neck||{c:A.add(n.c,[-n.r[0]*.8,-n.r[1]*.4,0]),r:n.r[1]*.75,dir:A.norm([1,.4,0])},s=A.norm(a.dir),o=A.norm(A.cross(s,Math.abs(s[2])<.9?[0,0,1]:[1,0,0])),c=A.cross(s,o),l=[],u=Math.max(.03,a.r*.2);for(let x=0;x<=16;x++){const g=x/16*Math.PI*2,m=A.add(A.mul(o,Math.cos(g)),A.mul(c,Math.sin(g)));let M=0;for(;M<.8&&i.field(A.add(a.c,A.mul(m,M)))<0;)M+=.01;M>=.8&&(M=a.r),l.push([...A.add(a.c,A.mul(m,M+u*.7)),u])}i.chain(l,f.COLLAR,{group:60,extra:!0});const d=l.reduce((x,g)=>g[0]-g[1]*.6+g[2]*.5>x[0]-x[1]*.6+x[2]*.5?g:x),h=u*1.3*(a.tag||1),p=A.norm(A.add(A.norm(A.sub(d.slice(0,3),a.c)),[.3,-.5,.3]));let _=d.slice(0,3);for(let x=0;x<60&&i.field(_)<h*.4;x++)_=A.add(_,A.mul(p,.01));i.ell(_,[h,h,h*.6],f.COLLAR,{group:60,extra:!0})}if(e.hat!=null&&n){const a=Math.max(r,.13),s=n.top||A.add(Qe.surface(n.c,n.r,A.norm([-.15,1,.1])),[0,r*.1,0]),o=A.norm([.3,1,.35]),c=a*1.5,l=A.add(s,A.mul(o,c));i.seg(A.add(s,A.mul(o,-a*.1)),l,a*.48,a*.04,f.HAT1,{group:61,extra:!0,paint:u=>Math.floor(A.dot(A.sub(u,s),o)/(c/5)+10)%2?f.HAT2:void 0}),i.ell(l,[a*.17,a*.17,a*.17],f.POM,{group:61,extra:!0})}if(e.glasses&&t.eyes&&n){const[a,s]=t.eyes.pts,o=l=>A.add(l,A.mul(A.norm(A.sub(l,n.c)),t.eyes.size*.45)),c=Math.max(t.eyes.size*1.05,r*.1);if(e.glasses==="bar")i.seg(o(a),o(s),c,c,f.SHADES,{group:62,extra:!0}),i.ell(A.add(o(s),[c*.3,c*.5,c*.2]),[c*.25,c*.25,c*.25],f.GLINT,{group:62,extra:!0});else for(const l of[a,s]){const u=A.norm(A.sub(l,n.c)),d=A.norm(A.cross([0,1,0],u)),h=A.cross(u,d),p=e.glasses==="heart"?eh:ju,_=c*1.5;i.flat(o(l),d,h,_,_,(x,g)=>p(x,g)?p(x*1.3,g*1.3)?f.SHADES:f.FRAME:null,{group:62,bend:.1,extra:!0}),i.seg(o(a),o(s),c*.18,c*.18,f.FRAME,{group:62,extra:!0})}}if(e.shoes)for(const a of t.feet){const s=e.shoes==="platform",o=a.r,c=A.add(a.c,[o*.25,o*(s?.35:.15),0]);i.ell(c,[o*1.45,o*(s?1.2:.85),o*1.15],f.SHOE,{group:a.group,extra:!0,paint:l=>l[1]<c[1]-o*(s?.45:.4)?f.SOLE:e.shoes==="glitter"&&Sn(l,60,.28)?f.GLINT:void 0})}}function th(i,e,t,n,r="towards"){const a={legW:1,earS:1,hgt:1,bw:.3,...i.q},s=e===3,o=e===1,c=e===0,l=N=>s&&i.legend.includes(N),u=new Qe,d=a.hr*(c?1.75:o?1.25:1)*(n.head/.44)**.5,h=a.len*(c?.8:o?.9:1.02)*n.long,p=c?.55:o?.9:1.04,_=t?-.04:0,x=1+_,g=a.chest*(s?1.06:1)/p+_,m=a.tuck/p+_,M=a.bw*(c?1.15:e>=2?1.06:1)*(a.legW>1.2?1.15:1),E=.06*a.legW*(s?1.1:c?1.7:1),b=a.back==="hump"?.1:0,R=a.back==="arch"?.1:0,w=g+.12,P=N=>{if(a.belly&&N[1]<w&&N[0]>-h*.5)return f.BELLY;if(a.saddle&&N[1]>x-.18&&N[0]<h*.55)return f.BODY2;if(a.spots&&N[1]>g+.1&&Sn(N,10,.22))return a.spotMat==="belly"||a.spots==="young"&&o?f.BELLY:a.spots==="young"?void 0:f.BODY3;if(a.ridge&&N[1]>x-.08+b*.5)return f.BODY3};if(u.ell([h*.48,(x+g)/2+b*.5,0],[h*.62,(x-g)/2+b*.5,M],f.BODY,{paint:P}),u.ell([-h*.5,(x+m)/2+R*.6,0],[h*.58,(x-m)/2+R*.6,M*.93],f.BODY,{paint:P}),u.ell([0,(x+(g+m)/2)/2+.02,0],[h*.6,(x-(g+m)/2)/2,M*.9],f.BODY,{paint:P}),a.ridge)for(let N=0;N<(s?16:10);N++){const re=-h*.8+N*h*1.75/(s?15:9),ce=(.07+(s?.04:0))*(1+.5*Math.max(0,re/h));u.ell([re,x+.02+b*Math.max(0,1-Math.abs(re/h-.5)*2)+ce*.5,0],[ce,.03,M*.25],f.BODY3,{dir:[-.3,1,0],up:[1,0,0]})}if(a.wool)for(let N=0;N<14;N++){const re=N/14*Math.PI*2;u.ell([h*Math.cos(re)*.7,(x+g)/2+Math.sin(re)*.2,M*(N%2?.5:-.5)],[.16,.14,.14],f.BODY)}const S=[.32,-.32][t],T=(N,re)=>{const ce=re*M*.62,Re=N?h*.62:-h*.62,Oe=(N?1:-1)*re*S,ke=N?g+.1:m+.15,j=(N?re:-re)*(t?1:-1)>0?.06:0,ie=[Re+Math.sin(Oe)*.2+(N?.02:.1),Math.max(.3,ke*.55),ce],H=[Re+Math.sin(Oe)*.42,.05+j,ce],ue=[Re,ke+.12,ce*.8],se=re>0?a.legMat||f.BODY:a.legMat?f.BODY3:f.BODY2,ye=N?[[...ue,E*1.5],[...ie,E*1.05],[...H,E*.9]]:[[...ue,E*2*(a.haunch||1)],[...A.add(ie,[-.12,.06,0]),E*1.2],[...A.add(H,[-.06*(a.hindFoot||1),.12,0]),E*.9],[...H,E*.9]];u.chain(ye,se,{group:re>0?6+(N?1:0):2,paint:a.socks?Ce=>Ce[1]<a.socks?f.BODY3:void 0:void 0});const qe=(a.paw==="hoof"?.07:.09)*a.legW**.5*(N?1:a.hindFoot||1);u.ell(A.add(H,[qe*.5,-.01,0]),[qe,E*.9,E*1.1],a.paw==="hoof"?f.NOSE:se,{group:re>0?6+(N?1:0):2}),u.anchors.feet.push({c:A.add(H,[qe*.5,-.01,0]),r:Math.max(qe,E*1.1),group:re>0?6+(N?1:0):2})};for(const N of[-1,1])T(!0,N),T(!1,N);const I=[h*.82,x-.12,0],C=[I[0]+Math.cos(a.neckAng)*a.neck*.9,I[1]+Math.sin(a.neckAng)*a.neck*.9+(c?.1:0),0];u.seg(I,C,a.neckW*.55,a.neckW*.42,f.BODY,{paint:N=>a.belly&&N[1]<(I[1]+C[1])/2-.05?f.BELLY:a.face==="dark"?f.BODY2:void 0});const O=N=>{if(a.face==="badger")return Math.abs(N[2])<d*.22+(N[0]-C[0])*.1||N[1]<C[1]-d*.1?f.BELLY:f.BODY3;if(a.face==="dark")return f.BODY2;if((a.belly||a.muzzle)&&N[1]<C[1]-d*.35)return f.BELLY};u.ell(C,[d*1.05,d*.92,d*.88],f.BODY,{paint:O});const F=d*a.snout*(c?.55:o?.78:1),D=d*a.snoutD*.55,B=[C[0]+d*.65+F*.5,C[1]-d*.28,0];u.ell(B,[F*.62+d*.2,D,D*.95],f.BODY,{dir:[1,-.25,0],paint:N=>(a.muzzle||a.belly)&&N[1]<B[1]-D*.1?f.BELLY:O(N)});const W=[B[0]+F*.62+d*.1,B[1]-.02,0];u.ell(W,[d*(a.disc?.1:.12),d*(a.disc?.2:.12),d*(a.disc?.2:.15)],f.NOSE,{group:1});for(const N of[-1,1]){const re=Qe.surface(C,[d*1.05,d*.92,d*.88],A.norm([.75,.32,N*.62]));u.ell(re,[d*.13,d*.16,d*.13].map(ce=>ce*(a.eyeK||1)*(c?1.5:o?1.2:1)),s&&!a.tusks?f.MAGIC2:f.EYE,{group:1})}u.anchors.head={c:C,r:[d*1.05,d*.92,d*.88],top:[C[0]-d*.1,C[1]+d*.82,0]},u.anchors.eyes={pts:[-1,1].map(N=>Qe.surface(C,[d*1.05,d*.92,d*.88],A.norm([.75,.32,N*.62]))),size:d*.16*(a.eyeK||1)*(c?1.5:o?1.2:1)},u.anchors.neck={c:A.lerp(I,C,c?.05:o?.25:.42),r:a.neckW*.5*(c?1.3:o?1.12:1),dir:A.norm(A.sub(C,I)),tag:c?1.8:o?1.3:1};for(const N of[-1,1]){const re=a.ear,ce=[C[0]-d*.15,C[1]+d*.7,N*d*.5],Re=a.earS*(c?1.2:1)*(a.ear==="long"?.62:1);if(re==="none")continue;if(re==="round"){u.ell(ce,[d*.22,d*.25*Re,d*.1],f.BODY,{group:1,paint:ye=>ye[0]>ce[0]+d*.02?f.EAR:void 0});continue}const Oe=re==="long",ke=re==="small"?-.6:0,j=d*.55*Re*(re==="big"?1.35:Oe?2.2:1),ie=d*.3*(re==="big"?1.2:Oe?1.35:1),H=A.norm([ke*.6-(Oe?.3:.12),1,N*.3]),ue=A.norm([.55,.2,N]),se=A.norm(A.cross(ue,H));u.flat(A.add(ce,A.mul(H,j)),se,H,ie,j,ar.ear(f.BODY,f.EAR,f.BODY3),{group:5+(N>0?0:20),extra:Oe}),re==="tuft"&&u.seg(A.add(ce,[0,j*1.4,N*.02]),A.add(ce,[0,j*1.85,N*.04]),d*.05,d*.02,f.BODY3,{group:1})}const $=[-h*1.05,x-.1+R*.5,0],ae=t?.04:-.02;if(l("tails")||nh(u,l("starTail")?"star":a.tail,$,h,x,ae),a.horns)for(const N of[-1,1]){const re=o?.6:c?.35:l("hornsGlow")?1.4:1,ce=[];for(let Re=0;Re<=8;Re++){const Oe=.3-Re/8*Math.PI*1.6,ke=d*.65*re*(1-.45*Re/8);ce.push([C[0]-d*.1+Math.cos(Oe)*ke,C[1]+d*.45+Math.sin(Oe)*ke,N*(d*.6+Re*.015)]),ce[Re].push(d*.2*re*(1-.6*Re/8))}u.chain(ce,l("hornsGlow")?f.MAGIC:f.ACCENT,{group:13})}if(a.antlers||l("jackalope"))for(const N of[-1,1])ih(u,a,[C[0]-d*.05,C[1]+d*.75,N*d*.4],N,e,l);if(a.tusks)for(const N of[-1,1]){const re=o?.4:c?0:l("tusksBig")?1.3:.75;if(!re)continue;const ce=[B[0]+F*.25,B[1]-D*.4,N*D*.8];u.chain([[...ce,.045*re],[...A.add(ce,[.1*re,.1*re,N*.03]),.04*re],[...A.add(ce,[.06*re,.24*re,N*.05]),.02*re]],f.ACCENT,{group:8})}a.teeth&&!c&&u.ell([W[0]-d*.1,W[1]-d*.25,0],[d*.08,d*.14,d*.12],f.ACCENT,{group:1});const q=N=>[-h*.9+N*h*1.65,x+b*Math.max(0,1-Math.abs(N-.8)*3)+R*(1-Math.abs(N-.4)*2),0];if(l("wings"))for(const N of[-1,1])Na(u,[h*.2,x,N*M*.5],N,1.15,t?.1:0,N>0?f.MAGIC2:f.MAGIC,f.MAGIC,40+(N>0?10:0));if(l("mane")||l("flames"))for(let N=0;N<7;N++){const re=N/6,ce=A.lerp(A.add(C,[-d*.5,d*.3,0]),q(.55),re),Re=[.4,.3,.45,.28,.38,.25,.3][N],Oe=A.norm([-.35-(t?.1:0),1,0]);u.flat(A.add(ce,A.mul(Oe,Re*.5)),[1,0,0],Oe,Re*.32,Re*.55,ar.flame(N%2?f.MAGIC:f.MAGIC2,f.MAGIC2),{group:60+N%2,extra:!0})}if(l("tails"))for(let N=0;N<7;N++){const re=Math.PI*(.55+N*.08),ce=(N-3)*.1,Re=A.add($,[Math.cos(re)*.9,Math.sin(re)*.85,ce]);u.chain([[...$,.1],[...A.lerp($,Re,.5),.17],[...Re,.08]],N%2?f.BODY2:f.BODY,{group:70,extra:!0}),u.ell(Re,[.09,.09,.09],f.MAGIC2,{group:71,extra:!0})}if(l("crystals")&&[.15,.3,.45,.6,.75].forEach((N,re)=>{const ce=q(N),Re=[.3,.5,.4,.6,.35][re];u.ell(A.add(ce,[0,Re*.45,(re%2-.5)*.1]),[Re*.55,.08,.08],f.MAGIC,{dir:[(re-2)*.12,1,0],group:80+re%2,extra:!0,paint:Oe=>Oe[2]>0?f.MAGIC2:void 0})}),l("moss")){for(let N=0;N<6;N++)u.ell(q(.08+N*.15),[h*.22,.07,M*.85],f.LEAF,{group:85,extra:!0});for(const[N,re]of[[.25,.55],[.5,.8],[.75,.45]]){const ce=q(N);u.seg(ce,A.add(ce,[0,re*.7,0]),.04,.025,f.TRUNK,{group:86,extra:!0}),u.ell(A.add(ce,[0,re*.8,0]),[re*.28,re*.26,re*.28],f.LEAF2,{group:87,extra:!0,paint:Re=>Re[1]<ce[1]+re*.72?f.LEAF3:void 0})}for(const N of[.12,.4,.65,.9]){const re=q(N);u.ell(A.add(re,[0,.12,M*.3]),[.07,.035,.07],f.MAGIC,{group:89,extra:!0})}}if(l("ribbons"))for(let N=0;N<3;N++){const re=[];for(let ce=0;ce<9;ce++){const Re=ce/8;re.push([h*(.5-Re*2.2),x+.05+N*.1+Re*(.25+N*.12)+Math.sin(Re*6+t+N)*.07,(N-1)*.18,.04*(1-Re*.6)])}u.chain(re,N%2?f.MAGIC2:f.MAGIC,{group:90+N,extra:!0})}Eo(u);const{sp:ee}=Ai(u,{height:bo(e,n,a.hgt),facing:r});return s&&So(ee,i.id.length*7919),ee}function nh(i,e,t,n,r,a){const s={group:3},o=c=>-n*c;e==="brush"?i.chain([[...t,.1],[o(1.3),r-.25+a,0,.15],[o(1.4),r-.55,0,.14],[o(1.35),.38+a,0,.09]],f.BODY,{...s,paint:c=>c[1]<.32?f.BODY3:void 0}):e==="bushy"?i.chain([[...t,.1],[o(1.05)-.35,r-.05+a,0,.17],[o(1.05)-.75,r-.2+a,0,.18],[o(1.05)-1,r-.35+a,0,.1]],f.BODY,{...s,paint:c=>c[0]<o(1.05)-.82?f.BELLY:void 0}):e==="stub"||e==="deer"||e==="bob"?i.ell(A.add(t,[-.06,.02+a,0]),[.1,.08,.07],e==="deer"?f.BELLY:f.BODY,{...s,paint:e==="bob"?c=>c[0]<t[0]-.08?f.BODY3:void 0:void 0}):e==="puff"?i.ell(A.add(t,[-.04,.02,0]),[.11,.11,.1],f.BELLY,s):e==="squirrel"||e==="star"?i.chain([[...t,.12],[o(1.3),r+.05+a,0,.25],[o(1.3),r+.6+a,0,.3],[o(1),r+.95+a,0,.27],[o(.65),r+.9+a,0,.16]],e==="star"?f.MAGIC:f.BODY,{...s,extra:!0,paint:e==="star"?c=>Sn(c,14,.12)?f.GLINT:void 0:void 0}):e==="otter"?i.chain([[...t,.17],[o(1.3),r-.45+a,0,.12],[o(1.6),.1,0,.07],[o(1.85),.06+a,0,.03]],f.BODY,s):e==="stoat"?i.chain([[...t,.08],[o(1.3),r-.12+a,0,.07],[o(1.6),r-.05+a,0,.06]],f.BODY,{...s,paint:c=>c[0]<o(1.45)?f.BODY3:void 0}):e==="flat"?(i.seg(t,[o(1.15),.3,0],.08,.07,f.BODY2,s),i.ell([o(1.4),.1+a*.5,0],[.28,.03,.14],f.BODY3,s)):e==="thin"&&(i.chain([[...t,.04],[o(1.1),r-.3,0,.03],[o(1.12)+a,r-.55,0,.025]],f.BODY,s),i.ell([o(1.12)+a,r-.62,0],[.04,.07,.04],f.BODY3,s))}function ih(i,e,t,n,r,a){const s=!e.antlers,o=s?.45:[0,.5,.95,.95][r]*(a("antlersGlow")?1.15:1),c=a("antlersGlow")?n>0?f.MAGIC2:f.MAGIC:f.ACCENT,l={group:11+(n>0?1:0),extra:!0};if(!o)return;const u=.045*Math.max(.8,o),d=n*.35*o;if(e.antlers==="palm"){const g=A.add(t,[-.06*o,.12*o,d*.3]);i.seg(t,g,u*1.3,u*1.2,c,l);for(let m=0;m<5;m++){const M=.35+m*.3,E=A.norm([-Math.cos(M),Math.sin(M)*.9,n*.55]),b=(.24+.05*(m%2))*o;i.ell(A.add(g,A.mul(E,b*.55)),[b*.6,u*1.5,u*.6],c,{...l,dir:E,up:[0,0,1]})}return}const h=A.add(t,[-.18*o,.3*o,d*.4]),p=A.add(t,[-.25*o,.62*o,d*.8]),_=A.add(t,[-.1*o,.95*o,d]);i.chain([[...t,u*1.2],[...h,u],[...p,u*.85],[..._,u*.4]],c,l);const x=(g,m,M,E)=>i.seg(g,A.add(g,A.mul(A.norm(m),M)),E,E*.35,c,l);x(A.add(t,[-.04*o,.1*o,d*.1]),[1,.6,0],.28*o,u*.8),(o>.4||s)&&x(h,[1,.9,0],.3*o,u*.7),o>.7&&(x(p,[.8,1,0],.28*o,u*.6),x(_,[.3,1,n*.2],.18*o,u*.5))}function rh(i,e,t,n,r="towards"){const a=e===3,s=e===1,o=e===0,c=_=>a&&i.legend.includes(_),l=new Qe,u=t?.03:0,d=o?.48:s?.42:.36,h=(o?.95:1.08)+u;for(const _ of[-1,1]){const x=t&&_>0?.04:0;l.seg([.05,.2,_*.14],[.08,.05+x,_*.15],.07,.06,f.BODY2,{group:2});for(const g of[-.04,0,.04])l.ell([.16,.03+x,_*.15+g],[.06,.025,.02],f.ACCENT,{group:2});l.anchors.feet.push({c:[.13,.04+x,_*.15],r:.08,group:_>0?6:2})}if(l.ell([-.32,.32,0],[.22,.06,.14],f.BODY2,{dir:[-1,-.6,0],group:3}),l.ell([0,.55+u,0],[.36,.52,.36],f.BODY,{paint:_=>_[0]>.12&&_[1]<h-d*.5?Math.floor(_[1]*18)%3===0&&Sn(_,16,.5)?f.BODY2:f.BELLY:void 0}),!c("wings"))for(const _ of[-1,1])l.ell([-.06,.58+u,_*.3],[.4,.3,.08],f.BODY2,{dir:[-.3,-1,0],up:[1,0,0],group:_>0?4:2,paint:x=>Sn(x,12,.15)?f.BODY3:void 0});l.ell([0,h,0],[d,d*.9,d],f.BODY);for(const _ of[-1,1]){const x=A.norm([.75,-.05,_*.4+.35]),g=A.add(Qe.surface([0,h,0],[d,d*.9,d],x),A.mul(x,-d*.05));l.ell(g,[d*.22,d*.46,d*.4],f.BELLY,{group:1,dir:x});const m=A.add(g,A.mul(x,d*.14));l.ell(m,[d*.1,d*.26,d*.24].map(M=>M*(o?1.15:1)),a?f.MAGIC:f.IRIS,{group:1,dir:x}),l.ell(A.add(m,A.mul(x,d*.07)),[d*.08,d*.14,d*.13].map(M=>M*(o?1.15:1)),a?f.MAGIC2:f.EYE,{group:1,dir:x}),(l.anchors.eyes||={pts:[],size:d*.22}).pts.push(A.add(m,A.mul(x,d*.07))),o||l.ell([d*.05,h+d*.8,_*d*.6],[d*.32,d*.12,d*.08],f.BODY2,{dir:[-.1,1,_*.7],up:[1,0,0],group:1})}if(l.ell(Qe.surface([0,h,0],[d,d*.9,d],A.norm([.75,-.35,.35])),[d*.2,d*.12,d*.1],f.ACCENT,{dir:[.6,-1,.3],group:1}),c("wings"))for(const _ of[-1,1])Na(l,[-.05,.8+u,_*.3],_,1.3,t?.12:0,_>0?f.MAGIC2:f.MAGIC,f.MAGIC,40+(_>0?10:0));if(c("eyesRing"))for(let _=0;_<7;_++){const x=Math.PI*(.15+_/6*.7);l.ell([Math.cos(x)*.2-.1,h+.1+Math.sin(x)*.6,(_-3)*.15],[.07,.07,.07],f.MAGIC2,{group:95+_,extra:!0}),l.ell([Math.cos(x)*.2-.05,h+.1+Math.sin(x)*.6,(_-3)*.15],[.035,.035,.035],f.EYE,{group:95+_,extra:!0})}l.anchors.head={c:[0,h,0],r:[d,d*.9,d]},l.anchors.neck={c:[0,h-d*.75,0],r:d*.85,dir:[0,1,0]},Eo(l);const{sp:p}=Ai(l,{height:bo(e,n,.95),facing:r});return a&&So(p,31),p}const di=(i,e,t,n,r,a,s=1)=>{for(const o of n)i.ell(Qe.surface(e,t,A.norm(o)),[r,r*1.2,r],a,{group:s});i.anchors.head||={c:e,r:t},i.anchors.eyes||={pts:n.map(o=>Qe.surface(e,t,A.norm(o))),size:r}},gc=(i,e,t)=>i.ell([e,.005,0],[t,.005,t*.6],f.NOSE,{group:0});function pn(i,e,t,n,r,a){Eo(i);const{sp:s}=Ai(i,{height:bo(t,n,r),facing:a});return t===3&&So(s,e.id.length*131),s}const _c=(i,e,t)=>{i.ell(e,[t,t*.35,t],f.MAGIC,{group:95,extra:!0,paint:n=>n[1]>e[1]?f.MAGIC2:void 0});for(let n=0;n<5;n++){const r=n/5*Math.PI*2;i.ell(A.add(e,[Math.cos(r)*t*.8,t*.55,Math.sin(r)*t*.8]),[t*.38,t*.12,t*.12],f.MAGIC,{dir:[0,1,0],up:[1,0,0],group:96,extra:!0})}},yo=(i,e)=>e.forEach(([t,n],r)=>i.ell(A.add(t,[0,n*.45,0]),[n*.55,.07,.07],f.MAGIC,{dir:[(r%3-1)*.25,1,(r%2-.5)*.3],group:80+r%2,extra:!0,paint:a=>a[2]>t[2]?f.MAGIC2:void 0}));function ah(i,e,t,n,r="towards"){const a=e===3,s=new Qe,o=t?.03:0;for(const[d,h]of[[.28,.2],[.28,-.2],[-.28,.2],[-.28,-.2]])s.seg([d,.15,h],[d+(h>0?o:-o),.03,h],.06,.05,f.BODY3,{group:h>0?6:2}),s.anchors.feet.push({c:[d+.03+(h>0?o:-o),.03,h],r:.065,group:h>0?6:2});const c=[0,.32,0],l=[.5,.32,.38];s.ell(c,l,f.BODY2,{paint:d=>Sn(d,22,.3)?f.BODY3:Sn(d,19,.12)?f.BELLY:void 0});for(let d=0;d<46;d++){const h=d*2.399%(Math.PI*2),p=d/46*.9+.05,_=A.norm([Math.cos(h)*Math.sin(p*Math.PI*.5)-.25,Math.cos(p*Math.PI*.5)*.9+.1,Math.sin(h)*Math.sin(p*Math.PI*.5)]);_[0]>.55||s.ell(A.add(Qe.surface(c,l,_),A.mul(_,.02)),[.1,.025,.025],d%4?f.BODY2:f.BODY3,{dir:A.add(_,[-.4,0,0]),group:1})}const u=[.48,.22,0];return s.ell(u,[.22,.14,.15],f.BELLY,{dir:[1,-.3,0],group:1}),s.ell([.69,.16,0],[.04,.04,.04],f.NOSE,{group:1}),di(s,u,[.22,.14,.15],[[.3,.6,.55],[.3,.6,-.55]],.035,a?f.MAGIC2:f.EYE),a&&yo(s,[[[-.3,.55,.1],.35],[[-.05,.62,-.1],.5],[[.2,.55,.12],.4],[[-.15,.58,.2],.3]]),pn(s,i,e,n,.6,r)}function sh(i,e,t,n,r="towards"){const a=e===3,s=new Qe,o=t?.05:0;for(const u of[-1,1])s.ell([-.22,.16,u*.36],[.24,.13,.12],u>0?f.BODY:f.BODY2,{dir:[1,.3,0],group:u>0?6:2,paint:d=>Sn(d,14,.15)?f.BODY3:void 0}),s.ell([.05,.04,u*.4],[.16,.04,.08],u>0?f.BODY:f.BODY2,{group:u>0?6:2}),s.seg([.35,.2+o,u*.24],[.42,.03,u*.3],.05,.04,u>0?f.BODY:f.BODY2,{group:u>0?7:2}),s.anchors.feet.push({c:[.45,.03,u*.3],r:.06,group:u>0?7:2},{c:[.12,.04,u*.4],r:.08,group:u>0?6:2});const c=[0,.3+o,0],l=[.5,.28,.4];s.ell(c,l,f.BODY,{paint:u=>u[1]<c[1]-.12?f.BELLY:u[0]>.38&&Math.abs(u[1]-(c[1]-.02))<.018?f.LINE:Sn(u,14,.22)?f.BODY3:void 0});for(const u of[-1,1]){const d=[.3,.55+o,u*.17];s.ell(d,[.1,.09,.1],f.BODY,{group:1}),s.ell(Qe.surface(d,[.1,.09,.1],A.norm([.6,.5,u*.5])),[.05,.05,.05],a?f.MAGIC2:f.IRIS,{group:1}),s.ell(Qe.surface(d,[.11,.1,.11],A.norm([.65,.45,u*.5])),[.03,.015,.03],f.EYE,{group:1})}return s.anchors.head={c:[.22,.45+o,0],r:[.3,.2,.3],top:[.18,.62+o,0]},s.anchors.eyes={pts:[-1,1].map(u=>Qe.surface([.3,.55+o,u*.17],[.1,.09,.1],A.norm([.6,.5,u*.5]))),size:.05},s.anchors.neck={c:[.32,.3+o,0],r:.25,dir:[1,.3,0]},a&&_c(s,[.15,.66+o,0],.16),pn(s,i,e,n,.55,r)}function oh(i,e,t,n,r="towards"){const a=e===3,s=e===1,o=h=>a&&i.legend.includes(h),c=new Qe,l=t?.02:0;for(const h of[-1,1]){const p=t&&h>0?.04:0;c.seg([0,.3,h*.08],[.03,.03+p,h*.08],.03,.025,f.NOSE,{group:h>0?7:2}),c.ell([.08,.02+p,h*.08],[.08,.015,.04],f.NOSE,{group:2}),c.anchors.feet.push({c:[.07,.03+p,h*.08],r:.06,group:h>0?7:2})}if(c.ell([-.55,.42,0],[.32,.035,.12],f.BODY2,{dir:[-1,-.25,0],group:3}),c.ell([0,.52+l,0],[.42,.26,.24],f.BODY,{dir:[1,.45,0]}),!o("wings"))for(const h of[-1,1])c.ell([-.1,.55+l,h*.2],[.45,.17,.05],f.BODY2,{dir:[-1,-.25,0],group:h>0?4:2});const u=[.36,.84+l,0],d=s?.19:.16;if(c.ell(u,[d*1.1,d,d*.95],f.BODY,{paint:h=>h[1]>u[1]+d*.55?f.BELLY:void 0}),c.ell(A.add(u,[d*1.5,-d*.25,0]),[d*1,d*.38,d*.3],f.NOSE,{dir:[1,-.2,0],group:1}),di(c,u,[d*1.1,d,d*.95],[[.55,.35,.65],[.55,.35,-.65]],d*.16,a?f.MAGIC2:f.EYE),o("wings"))for(const h of[-1,1])Na(c,[-.05,.65+l,h*.18],h,1.1,t?.1:0,h>0?f.MAGIC2:f.MAGIC,f.MAGIC,40+(h>0?10:0));if(o("eyesRing"))for(let h=0;h<6;h++){const p=Math.PI*(.2+h/5*.6);c.ell([Math.cos(p)*.25-.1,.95+Math.sin(p)*.45,(h-2.5)*.12],[.06,.06,.06],f.MAGIC2,{group:95+h,extra:!0})}return pn(c,i,e,n,.75,r)}function lh(i,e,t,n,r="towards"){const a=e===3,s=h=>a&&i.legend.includes(h),o=new Qe,c=t===0,l=.55,u=s("wingsBig")?1.5:1;gc(o,0,.3*u);for(const h of[-1,1]){const p=[0,l+.05,h*.1],_=[.05,l+(c?.35:-.05),h*.45*u],x=[[-.05,l+(c?.45:-.15),h*.85*u],[-.25,l+(c?.2:-.25),h*.75*u],[-.3,l+(c?0:-.25),h*.4*u]],g=s("wingsBig")?f.MAGIC:f.BODY2,m=s("wingsBig")?f.MAGIC2:f.BODY3;o.seg(p,_,.03,.025,m,{group:11});for(const w of x)o.seg(_,w,.02,.012,m,{group:11});const M=A.sub(x[0],p),E=A.norm(M),b=A.norm(A.sub(x[2],_)),R=A.norm(A.sub(b,A.mul(E,A.dot(b,E))));o.flat(A.add(A.lerp(p,x[0],.5),A.mul(R,.12*u)),E,R,Math.hypot(...M)*.55,.3*u,ar.membrane(g),{group:10+(h>0?1:0),bend:.2})}o.ell([0,l,0],[.13,.16,.12],f.BODY,{group:1});const d=[.08,l+.2,0];o.ell(d,[.12,.11,.11],f.BODY,{group:1});for(const h of[-1,1])o.ell(A.add(d,[-.02,.15,h*.07]),[.12,.045,.02],f.BODY,{dir:[.1,1,h*.3],up:[1,0,0],group:1,paint:p=>p[0]>d[0]-.01?f.EAR:void 0});return di(o,d,[.12,.11,.11],[[.7,.2,.5],[.7,.2,-.5]],.025,a?f.MAGIC2:f.EYE),o.ell(Qe.surface(d,[.12,.11,.11],[1,-.2,0]),[.025,.02,.03],f.NOSE,{group:1}),pn(o,i,e,n,.55,r)}function ch(i,e,t,n,r="towards"){const a=e===3,s=new Qe,o=t?.03:0;s.seg([-.5,.18,0],[-.62,.12,0],.04,.02,f.SKIN,{group:3});for(const c of[-1,1])s.ell([-.3,.05,c*.2],[.07,.04,.05],f.SKIN,{group:c>0?6:2}),s.anchors.feet.push({c:[-.3,.05,c*.2],r:.07,group:c>0?6:2});s.ell([0,.3,0],[.52,.29,.33],f.BODY,{paint:c=>c[1]>.45?f.BODY2:void 0}),s.ell([.55,.24,0],[.2,.07,.07],f.SKIN,{dir:[1,-.15,0],group:1}),s.ell([.74,.21,0],[.04,.05,.06],f.NOSE,{group:1});for(const c of[-1,1]){const l=[.32,.1-(c>0?o:0),c*.34];s.ell(l,[.13,.035,.12],f.SKIN,{group:c>0?7:2,axes:[[1,0,0],[0,1,0],[0,0,1]]});for(let u=0;u<4;u++)s.ell(A.add(l,[.14,-.01,c*(u-1.5)*.05]),[.05,.015,.015],f.ACCENT,{group:c>0?7:2})}for(const c of[-1,1])s.ell(Qe.surface([0,.3,0],[.52,.29,.33],A.norm([.85,.3,c*.35])),[.015,.015,.015],a?f.MAGIC2:f.EYE,{group:1});return s.anchors.head={c:[.32,.34,0],r:[.25,.22,.25],top:[.3,.58,0]},s.anchors.eyes={pts:[-1,1].map(c=>Qe.surface([0,.3,0],[.52,.29,.33],A.norm([.85,.3,c*.35]))),size:.03},s.anchors.neck={c:[.36,.3,0],r:.27,dir:[1,.1,0]},a&&_c(s,[.15,.62,0],.15),pn(s,i,e,n,.55,r)}function uh(i,e,t,n,r="towards"){const a=e===3,s=d=>a&&i.legend.includes(d),o=new Qe;for(const d of[-1,1])for(let h=0;h<3;h++){const p=.25-h*.25,_=(h+(d>0?1:0)+t)%2?.06:-.06,x=[p,.22,d*.2];o.chain([[...x,.03],[p+_+(1-h)*.06,.32,d*.42,.025],[p+_*1.5+(1-h)*.15,.02,d*.55,.015]],d>0?f.BODY2:f.BODY3,{group:d>0?7:2})}o.ell([-.12,.34,0],[.46,.24,.32],f.BODY,{paint:d=>Math.abs(d[2])<.018&&d[1]>.4?f.LINE:d[1]>.5&&d[2]>.05&&d[2]<.17?f.BELLY:void 0}),o.ell([.38,.33,0],[.16,.16,.26],f.BODY,{group:1});const c=[.56,.3,0];o.ell(c,[.1,.1,.17],f.BODY2,{group:1});const l=[.3,.5,.7,.75][e]*(s("horn")?1.3:1),u=s("horn")?f.MAGIC:f.BODY3;for(const d of[-1,1]){const h=A.add(c,[.08,.02,d*.1]),p=A.add(h,[l*.7,l*.45,d*l*.15]),_=A.add(p,[l*.25,-l*.12,-d*l*.12]);o.chain([[...h,.045],[...p,.035],[..._,.015]],u,{group:8+(d>0?1:0)}),o.seg(A.lerp(h,p,.55),A.add(A.lerp(h,p,.55),[0,l*.22,0]),.02,.008,u,{group:8})}for(const d of[-1,1])o.chain([[...A.add(c,[.05,.06,d*.1]),.012],[c[0]+.1,.5,d*.22,.012],[c[0]+.2,.5,d*.26,.012]],f.BODY3,{group:9,extra:!0});return di(o,c,[.1,.1,.17],[[.4,.3,.85],[.4,.3,-.85]],.032,a?f.MAGIC2:f.EYE,9),s("crystals")&&yo(o,[[[-.35,.5,.1],.3],[[-.1,.55,-.08],.45],[[.1,.5,.1],.35]]),pn(o,i,e,n,.5,r)}function hh(i,e,t,n,r="towards"){const a=e===3,s=new Qe,o=t?.04:0;s.ell([0,.07,0],[.6+o,.07,.17],f.SKIN,{group:1}),s.chain([[.45+o,.08,0,.1],[.6+o,.25,0,.09],[.68+o,.28,0,.08]],f.SKIN,{group:1});for(const u of[-1,1])s.seg([.7+o,.32,u*.04],[.78+o,.55,u*.1],.018,.014,f.SKIN,{group:5}),s.ell([.78+o,.57,u*.1],[.03,.03,.03],a?f.MAGIC2:f.EYE,{group:5});s.anchors.head={c:[.68+o,.3,0],r:[.09,.08,.09],top:[.66+o,.38,0]},s.anchors.eyes={pts:[-1,1].map(u=>[.78+o,.57,u*.1]),size:.03},s.anchors.neck={c:[.55+o,.17,0],r:.1,dir:[1,1.2,0]};const c=[-.12,.4,0],l=a?f.MAGIC:f.BODY;return s.ell(c,[.32,.32,.22],l,{group:3,paint:u=>{const d=Math.atan2(u[1]-c[1],u[0]-c[0]);return((Math.hypot(u[0]-c[0],u[1]-c[1])/.32-d/(Math.PI*2)*.3)%.3+.3)%.3<.06?a?f.MAGIC2:f.BODY3:void 0}}),pn(s,i,e,n,.45,r)}function dh(i,e,t,n,r="towards"){const a=e===3,s=new Qe;for(const o of[-1,1])for(let c=0;c<7;c++){const l=-.45+c*.15,u=(c+t)%2?.03:-.03;s.seg([l,.1,o*.22],[l+u,.01,o*.33],.025,.015,f.BODY3,{group:o>0?7:2})}for(const o of[-1,1])s.chain([[.5,.15,o*.08,.02],[.7,.3,o*.2,.015],[.82,.22,o*.26,.012]],f.BODY3,{group:9,extra:!0});return s.ell([0,.18,0],[.58,.2,.3],f.BODY,{paint:o=>(Math.floor((o[0]+.6)*9)%2&&o[1]>.2?f.BODY2:void 0)||(Math.abs((o[0]+.6)*9%1)<.12?f.LINE:void 0)}),di(s,[0,.18,0],[.58,.2,.3],[[.92,.3,.25],[.92,.3,-.25]],.02,a?f.MAGIC2:f.EYE),a&&yo(s,[[[-.3,.32,.05],.3],[[0,.37,-.05],.45],[[.25,.32,.05],.32]]),pn(s,i,e,n,.4,r)}function fh(i,e,t,n,r="towards"){const a=e===3,s=e===1,o=p=>a&&i.legend.includes(p),c=new Qe,l=t?.7:0,u=[];for(let p=0;p<=12;p++){const _=p/12;u.push([-.9+_*1.2,.07,Math.sin(_*Math.PI*2+l)*.25*(1-_*.5),.03+.045*Math.sin(Math.min(1,_*1.4)*Math.PI/2)])}u.push([.38,.25,u[12][2],.07],[.42,.45,u[12][2]*.8,.065]),c.chain(u,f.BODY,{paint:p=>p[1]<.05&&p[0]<.35?f.BELLY:Sn([p[0]*1.5,p[1],p[2]],14,.3)?f.BODY3:void 0});const d=[.5,.5,u[13][2]*.8],h=s?.11:.09;if(c.ell(d,[h*1.5,h*.75,h],f.BODY,{dir:[1,-.15,0],group:1}),di(c,d,[h*1.5,h*.75,h],[[.5,.5,.7],[.5,.5,-.7]],h*.22,a?f.MAGIC2:f.EYE),t||c.seg(A.add(d,[h*1.4,-h*.2,0]),A.add(d,[h*2.3,-h*.3,0]),.01,.008,f.SKIN,{group:1}),c.anchors.feet.push({c:A.add(u[0].slice(0,3),[-.02,-.01,0]),r:.06,group:3,tail:!0}),c.anchors.neck={c:[.42,.36,u[12][2]*.9],r:.075,dir:[.2,1,0]},o("wings"))for(const p of[-1,1])Na(c,[0,.2,p*.05],p,.9,t?.1:0,p>0?f.MAGIC2:f.MAGIC,f.MAGIC,40+(p>0?10:0));return pn(c,i,e,n,.45,r)}function ph(i,e,t,n,r="towards"){const a=e===3,s=h=>a&&i.legend.includes(h),o=new Qe,c=t===0,l=.55,u=s("wingsBig")?1.45:1,d=s("wingsBig")?f.MAGIC:f.BODY;gc(o,0,.3*u);for(const h of[-1,1]){const p=c?.5:-.1,_=A.norm([.35,p,h]),x=A.norm([-.3,p*.6,h]);o.flat(A.add([0,l,h*.05],A.mul(_,.38*u)),_,A.norm(A.cross(_,[0,1,0])),.4*u,.24*u,ar.spotted(d,f.BELLY,f.BODY3),{group:10+(h>0?1:0)}),o.flat(A.add([-.05,l,h*.05],A.mul(x,.26*u)),x,A.norm(A.cross(x,[0,1,0])),.27*u,.17*u,ar.spotted(s("wingsBig")?f.MAGIC2:f.BODY2,f.BODY2,f.BODY2),{group:12+(h>0?1:0)}),o.chain([[.12,l+.08,h*.03,.015],[.2,l+.25,h*.1,.025],[.24,l+.32,h*.14,.012]],f.BODY2,{group:11})}return o.ell([0,l,0],[.22,.09,.09],f.BELLY,{group:1,paint:h=>Sn(h,30,.25)?f.BODY2:void 0}),o.ell([.17,l+.03,0],[.07,.07,.07],f.BELLY,{group:1}),di(o,[.17,l+.03,0],[.07,.07,.07],[[.7,.3,.6],[.7,.3,-.6]],.02,a?f.MAGIC2:f.EYE),pn(o,i,e,n,.5,r)}function mh(i,e,t,n,r="towards"){const a=e===3,s=l=>a&&i.legend.includes(l),o=new Qe,c=t?.05:0;for(let l=0;l<9;l++){const u=l/8,d=-.6+u*1.15;o.ell([d,.12+Math.sin(u*Math.PI)*(.06+c),0],[.08,.1-u*.02,.12-u*.03],l<2?f.MAGIC2:l%2?f.BODY2:f.BODY,{group:1})}s("lantern")&&o.ell([-.75,.3,0],[.22,.22,.22],f.MAGIC2,{group:3,paint:l=>l[1]<.2?f.MAGIC:void 0});for(let l=0;l<6;l++)o.seg([-.2+l*.12,.05,.08],[-.2+l*.12+(l%2?.02:-.02)*(t?-1:1),0,.12],.015,.01,f.BODY3,{group:7});return o.ell([.6,.14,0],[.06,.06,.08],f.BODY3,{group:1}),di(o,[.6,.14,0],[.06,.06,.08],[[.6,.3,.7],[.6,.3,-.7]],.015,a?f.MAGIC2:f.EYE),pn(o,i,e,n,.4,r)}function gh(i,e,t,n,r="towards"){const a=e===3,s=u=>a&&i.legend.includes(u),o=new Qe,c=[.15,.28,0];for(const u of[-1,1])for(let d=0;d<4;d++){const h=-.6+d*.4,p=(d+(u>0?0:1)+t)%2?.05:-.05,_=A.add(c,[.05-d*.04,0,u*.1]),x=A.add(_,[Math.cos(h)*.3*(d<2?1:-.6)+p,.3,u*.3]),g=A.add(_,[Math.cos(h)*.55*(d<2?1:-.8)+p*1.5,-.28,u*.55]);o.chain([[..._,.03],[...x,.028],[...g,.015]],u>0?f.BODY2:f.BODY3,{group:u>0?7:2})}o.ell([-.28,.38,0],[.34,.28,.3],f.BODY,{paint:u=>(Math.abs(u[2])<.03||Math.abs(u[0]+.28)<.03)&&u[1]>.45?f.BELLY:void 0}),o.ell(c,[.18,.13,.17],f.BODY2,{group:1}),o.anchors.head={c,r:[.18,.13,.17]},o.anchors.eyes={pts:[[.05,.05],[.05,-.05]].map(([u,d])=>Qe.surface(c,[.18,.13,.17],A.norm([.9,u*6,d*4]))),size:.03},o.anchors.neck={c:[-.02,.32,0],r:.15,dir:[1,0,0]};const l=s("eyesRing");for(const[u,d]of[[.05,.05],[.05,-.05],[.02,.1],[.02,-.1]])o.ell(Qe.surface(c,[.18,.13,.17],A.norm([.9,u*6,d*4])),[.025,.025,.025],l?f.MAGIC2:f.EYE,{group:1});if(l)for(let u=0;u<5;u++){const d=Math.PI*(.2+u/4*.6);o.ell([-.3+Math.cos(d)*.2,.75+Math.sin(d)*.35,(u-2)*.12],[.06,.06,.06],f.MAGIC2,{group:95+u,extra:!0})}return pn(o,i,e,n,.5,r)}const _h=new Map(Object.entries({owl:rh,hedgehog:ah,toad:sh,raven:oh,bat:lh,mole:ch,beetle:uh,snail:hh,woodlouse:dh,snake:fh,moth:ph,glowworm:mh,spider:gh})),wo=[{id:"wolf",name:"Wolf",plan:"quad",hue:.08,sat:.24,val:.56,legend:["wings","mane"],q:{len:.64,chest:.42,tuck:.6,neck:.32,neckAng:.7,neckW:.42,hr:.26,snout:.82,snoutD:.7,ear:"point",earS:.82,tail:"brush",paw:"paw",legW:1.25,saddle:!0,belly:!0},tail:"up"},{id:"fox",name:"Fox",plan:"quad",q:{hgt:.8,len:.62,chest:.4,tuck:.5,neck:.3,neckAng:.7,neckW:.32,hr:.24,snout:1.05,snoutD:.5,snoutTaper:.6,ear:"point",earS:1.35,tail:"bushy",paw:"paw",legW:.9,belly:!0,socks:.3},hue:.06,sat:.8,val:.9,belly:"white",legend:["tails"]},{id:"badger",name:"Badger",plan:"quad",q:{hgt:.62,len:.78,chest:.2,tuck:.22,neck:.18,neckAng:.1,neckW:.5,hr:.26,snout:1,snoutD:.55,snoutTaper:.55,ear:"round",earS:.7,tail:"stub",paw:"paw",legW:1.35,legMat:f.BODY3,face:"badger",shaggy:!0},hue:.65,sat:.08,val:.45,legend:["crystals"]},{id:"boar",name:"Boar",plan:"quad",hue:.07,sat:.62,val:.5,legend:["tusksBig"],q:{len:.72,chest:.34,tuck:.42,neck:.2,neckAng:-.15,neckW:.55,hr:.27,snout:1.25,snoutD:.62,snoutTaper:.55,ear:"small",earS:.8,tail:"thin",paw:"hoof",legW:1.15,ridge:!0,tusks:!0,back:"hump",disc:!0},ridge:!0},{id:"stag",name:"Stag",plan:"quad",q:{hgt:1.3,len:.6,chest:.6,tuck:.7,neck:.55,neckAng:.95,neckW:.32,hr:.2,snout:1.15,snoutD:.6,snoutTaper:.65,ear:"point",earS:1.1,tail:"deer",paw:"hoof",legW:.75,antlers:"branch",rump:!0,spots:"young",belly:!0},hue:.08,sat:.5,val:.7,legend:["antlersGlow"]},{id:"hare",name:"Hare",plan:"quad",q:{hgt:.72,len:.5,chest:.4,tuck:.45,neck:.2,neckAng:.9,neckW:.35,hr:.27,snout:.65,snoutD:.7,ear:"long",earS:2.4,tail:"puff",paw:"paw",legW:.85,haunch:1.35,hindFoot:1.6,back:"arch",belly:!0,whiskers:!0},hue:.08,sat:.4,val:.72,legend:["jackalope"]},{id:"owl",name:"Owl",plan:"owl",hue:.08,sat:.5,val:.55,legend:["eyesRing","wings"]},{id:"bear",name:"Bear",plan:"quad",q:{hgt:1.15,len:.72,chest:.38,tuck:.4,neck:.25,neckAng:.3,neckW:.55,hr:.28,snout:.7,snoutD:.62,snoutTaper:.7,ear:"round",earS:.8,tail:"stub",paw:"paw",legW:1.55,back:"hump",muzzle:!0,shaggy:!0},hue:.07,sat:.55,val:.42,legend:["moss"]},{id:"hedgehog",name:"Hedgehog",plan:"hedgehog",hue:.08,sat:.4,val:.5,legend:["crystals"]},{id:"squirrel",name:"Squirrel",plan:"quad",q:{hgt:.55,len:.45,chest:.35,tuck:.4,neck:.2,neckAng:.9,neckW:.35,hr:.3,snout:.55,snoutD:.65,ear:"tuft",earS:1.1,tail:"squirrel",paw:"paw",legW:.8,haunch:1.3,back:"arch",belly:!0,whiskers:!0},hue:.03,sat:.75,val:.75,belly:"white",legend:["starTail"]},{id:"toad",name:"Toad",plan:"toad",hue:.2,sat:.5,val:.55,legend:["crown"]},{id:"otter",name:"Otter",plan:"quad",q:{hgt:.55,len:1,chest:.25,tuck:.25,neck:.3,neckAng:.35,neckW:.5,hr:.27,snout:.6,snoutD:.7,ear:"round",earS:.5,tail:"otter",paw:"paw",legW:1.1,muzzle:!0,belly:!0,whiskers:!0},hue:.07,sat:.55,val:.45,belly:"white",legend:["ribbons"]},{id:"lynx",name:"Lynx",plan:"quad",q:{hgt:.9,len:.55,chest:.5,tuck:.55,neck:.25,neckAng:.8,neckW:.4,hr:.27,snout:.5,snoutD:.75,snoutTaper:.8,ear:"tuft",earS:1,tail:"bob",paw:"paw",legW:1.2,cheeks:!0,spots:!0,belly:!0,whiskers:!0},hue:.09,sat:.45,val:.75,legend:["mane"]},{id:"elk",name:"Elk",plan:"quad",q:{hgt:1.4,len:.68,chest:.6,tuck:.66,neck:.45,neckAng:.75,neckW:.42,hr:.24,snout:1.6,snoutD:.9,snoutTaper:.85,ear:"point",earS:.9,tail:"stub",paw:"hoof",legW:.9,back:"hump",antlers:"palm",shaggy:!0},hue:.07,sat:.55,val:.38,legend:["antlersGlow","moss"]},{id:"raven",name:"Raven",plan:"raven",hue:.68,sat:.35,val:.3,legend:["wings","eyesRing"]},{id:"bat",name:"Bat",plan:"bat",hue:.78,sat:.25,val:.45,legend:["wingsBig"]},{id:"mole",name:"Mole",plan:"mole",hue:.7,sat:.15,val:.32,legend:["crown"]},{id:"beaver",name:"Beaver",plan:"quad",q:{hgt:.6,len:.65,chest:.2,tuck:.22,neck:.2,neckAng:.4,neckW:.55,hr:.28,snout:.6,snoutD:.75,ear:"round",earS:.45,tail:"flat",paw:"paw",legW:1.2,back:"arch",teeth:!0,whiskers:!0},hue:.06,sat:.6,val:.45,legend:["moss"]},{id:"stoat",name:"Stoat",plan:"quad",q:{hgt:.5,len:1,chest:.3,tuck:.33,neck:.35,neckAng:.6,neckW:.32,hr:.25,snout:.6,snoutD:.6,ear:"round",earS:.6,tail:"stoat",paw:"paw",legW:.8,belly:!0,back:"arch",whiskers:!0},hue:.1,sat:.25,val:.92,legend:["ribbons","mane"]},{id:"snail",name:"Snail",plan:"snail",hue:.08,sat:.45,val:.55,legend:["glowShell"]},{id:"ram",name:"Ram",plan:"quad",q:{hgt:.95,len:.6,chest:.48,tuck:.52,neck:.22,neckAng:.45,neckW:.48,hr:.25,snout:.85,snoutD:.75,snoutTaper:.8,ear:"small",earS:.7,tail:"stub",paw:"hoof",legW:.9,wool:!0,horns:"curl",face:"dark"},hue:.1,sat:.12,val:.88,legend:["hornsGlow"]},{id:"woodlouse",name:"Woodlouse",plan:"woodlouse",hue:.65,sat:.12,val:.45,legend:["crystals"]},{id:"snake",name:"Snake",plan:"snake",hue:.25,sat:.45,val:.45,legend:["wings"]},{id:"moth",name:"Moth",plan:"moth",hue:.1,sat:.3,val:.7,legend:["wingsBig"]},{id:"marten",name:"Pine marten",plan:"quad",q:{hgt:.55,len:.78,chest:.35,tuck:.38,neck:.3,neckAng:.55,neckW:.35,hr:.25,snout:.65,snoutD:.6,ear:"round",earS:.9,tail:"bushy",paw:"paw",legW:.85,belly:!0,back:"arch"},hue:.07,sat:.6,val:.45,legend:["mane"]},{id:"salamander",name:"Salamander",plan:"quad",q:{hgt:.42,len:.9,chest:.14,tuck:.14,neck:.12,neckAng:.05,neckW:.5,hr:.27,snout:.55,snoutD:.55,ear:"none",tail:"otter",paw:"paw",legW:1,spots:!0,spotMat:"belly"},hue:.1,sat:.1,val:.22,belly:"yellow",legend:["flames"]},{id:"glowworm",name:"Glow-worm",plan:"glowworm",hue:.12,sat:.4,val:.35,legend:["lantern"]},{id:"spider",name:"Spider",plan:"spider",hue:.07,sat:.45,val:.4,legend:["eyesRing"]},{id:"dormouse",name:"Dormouse",plan:"quad",q:{hgt:.38,len:.45,chest:.35,tuck:.38,neck:.15,neckAng:.6,neckW:.4,hr:.34,snout:.45,snoutD:.7,ear:"round",earS:.85,tail:"squirrel",paw:"paw",legW:.8,back:"arch",belly:!0,whiskers:!0,eyeK:1.6},hue:.09,sat:.6,val:.75,belly:"white",legend:["starTail"]},{id:"beetle",name:"Stag beetle",plan:"beetle",hue:.78,sat:.5,val:.35,legend:["horn","crystals"]}],xc=Object.fromEntries(wo.map(i=>[i.id,i])),sl=[[[255,70,170],[255,245,250],[255,230,70]],[[40,220,255],[255,236,60],[255,80,180]],[[150,80,255],[175,255,60],[255,255,255]]],ol={sneakers:[[255,70,90],[250,250,245]],glitter:[[215,215,235],[190,190,210]],platform:[[160,60,230],[40,30,52]]};function xh(i,e,t=null){const n=vh(i,e);if(!t)return n;if(t.collar&&(n[f.COLLAR]=Array.isArray(t.collar)?t.collar:n[f.MAGIC]),t.hat!=null){const[r,a,s]=sl[t.hat%sl.length];n[f.HAT1]=r,n[f.HAT2]=a,n[f.POM]=s}if(t.glasses&&(n[f.SHADES]=[22,18,32],n[f.FRAME]=t.glasses==="heart"?[255,60,110]:[255,90,210]),t.shoes){const[r,a]=ol[t.shoes]||ol.sneakers;n[f.SHOE]=r,n[f.SOLE]=a}if(t.woken){n[f.WOKEN]=[255,40,36];for(const r of[f.BODY,f.BODY2,f.BODY3,f.BELLY,f.ACCENT,f.EAR])n[r]&&(n[r]=n[r].map((a,s)=>Math.round(a*.72+[30,8,12][s]*.1)))}return n}function vh(i,e){const t=xc[i],n=e.cVal/.85,r=e.cSat/.6,a=ve(t.hue,t.sat*r*e.sat,t.val*n),s=t.belly==="yellow"?[240,196,40]:t.belly==="white"||t.q?.face==="badger"?[236,232,222]:ve(t.hue+.03,t.sat*.5*r,Math.min(1,t.val*n*1.3+.08)),o=ve(e.magicHue+t.hue*.3,.6,1),c=ve(e.magicHue+t.hue*.3,.18,1),l=["boar","stag","elk","ram"].includes(t.id);return{[f.BODY]:a,[f.BODY2]:ve(t.hue+.02,Math.min(1,t.sat*r*1.2+.05),t.val*n*.66),[f.BODY3]:ve(t.hue+.03,Math.min(1,t.sat*r*1.3+.1),t.val*n*.4),[f.BELLY]:s,[f.ACCENT]:l?[236,226,200]:ve(t.hue+.05,t.sat*.6,Math.min(1,t.val*n*.5+.25)),[f.MAGIC]:o,[f.MAGIC2]:c,[f.LEAF]:ve(.3,.55,.55),[f.LEAF2]:ve(.25,.5,.75),[f.LEAF3]:ve(.33,.6,.35),[f.TRUNK]:ve(.07,.45,.32),[f.EYE]:[24,18,30],[f.PUPIL]:[70,40,90],[f.GLINT]:[255,255,245],[f.NOSE]:[38,28,36],[f.EAR]:ve(t.hue+.97,Math.min(1,t.sat*.6+.2),Math.min(1,t.val*n*.55+.2)),[f.IRIS]:t.plan==="owl"?[255,176,40]:ve(.12,.7,.85),[f.SKIN]:[238,158,192]}}const Mh=["size","growth","pixel","head","eye","legs","long","fur"],mr=new Map;function Sh(i,e,t,n,r="towards",a=null){const s=xc[i]||wo[0],o=a&&(a.collar||a.hat!=null||a.glasses||a.shoes||a.woken)?a:null,c=[s.id,e,t,r,...Mh.map(u=>n[u]),o?[!!o.collar,o.hat??"",o.glasses||"",o.shoes||"",!!o.woken].join(","):""].join("|");let l=mr.get(c);if(!l){if(l=Qu(o,()=>s.q?th(s,e,t,n,r):_h.get(s.plan)(s,e,t,n,r)),o?.woken)for(let u=0;u<l.m.length;u++)(l.m[u]===f.EYE||l.m[u]===f.IRIS||l.m[u]===f.PUPIL)&&(l.m[u]=f.WOKEN);mr.size>600&&mr.delete(mr.keys().next().value),mr.set(c,l)}return l}const Ke=(...i)=>({l:i}),gt=(i,e,t,n,r)=>({a:[i,e,t,n,r]}),Ht=(i,e)=>({d:[i,e]}),ct=(i,e=.86)=>Ke([.5,e],[.5,i]),ut=gt(.5,.76,.13,25,155),bh=i=>i.l?{l:i.l.map(([e,t])=>[1-e,t])}:i.a?{a:[1-i.a[0],i.a[1],i.a[2],180-i.a[3],180-i.a[4]]}:{d:[1-i.d[0],i.d[1]]},ht=(...i)=>i.flatMap(e=>[e,bh(e)]);function Bn(i,e,t){const n=e[0]-i[0],r=e[1]-i[1],a=Math.hypot(n,r),s=t*a,o=(a*a/4+s*s)/(2*Math.abs(s)),c=(i[0]+e[0])/2,l=(i[1]+e[1])/2,u=r/a,d=-n/a,h=(o-Math.abs(s))*Math.sign(s),p=c-u*h,_=l-d*h,x=Math.atan2(i[1]-_,i[0]-p)*180/Math.PI;let m=Math.atan2(e[1]-_,e[0]-p)*180/Math.PI-x;for(;m>180;)m-=360;for(;m<-180;)m+=360;return gt(p,_,o,x,x+m)}const Eh=(i,e,t,n,r,a=24)=>Ke(...Array.from({length:a+1},(s,o)=>[i+n*Math.sin(o/a*r*2*Math.PI),e+(t-e)*o/a])),yh=(i,e,t,n,r,a=0,s=40)=>Ke(...Array.from({length:s+1},(o,c)=>{const l=c/s,u=(a+l*r*360)*Math.PI/180,d=t+(n-t)*l;return[i+d*Math.cos(u),e+d*Math.sin(u)]})),Xr=(i,e,t,n,r)=>r.map(a=>{const s=Math.cos(a*Math.PI/180),o=Math.sin(a*Math.PI/180);return Ke([i+t*s,e+t*o],[i+n*s,e+n*o])});ct(.3),Ke([.28,.08],[.5,.3],[.72,.08]),gt(.5,.55,.2,-55,55),Ht(.5+.2*Math.cos(-55*Math.PI/180),.55+.2*Math.sin(-55*Math.PI/180)),ct(.34),Ke([.36,.06],[.5,.34],[.64,.06]),gt(.67,.66,.17,180,-80),Ht(.67+.17*Math.cos(-80*Math.PI/180),.66+.17*Math.sin(-80*Math.PI/180)),[ct(.1),Ke([.24,.3],[.76,.3]),...ht(Ke([.33,.14],[.33,.56])),...ht(Ht(.24,.3))],[ct(.16),...ht(gt(.36,.24,.15,45,180)),...Xr(.5,.16,0,.1,[-130,-90,-50])],[ct(.42),...ht(Ke([.5,.42],[.34,.26],[.3,.06]),Ke([.335,.25],[.16,.2]),Ke([.32,.15],[.18,.07]))],[ct(.44),...ht(Ke([.5,.44],[.4,.34],[.38,.06])),gt(.62,.66,.09,180,540),...ht(Ht(.38,.06))],[ct(.44),...ht(gt(.33,.3,.13,0,360),Ke([.24,.18],[.18,.05])),...ht(Ht(.33,.3))],[ct(.24),Ke([.24,.3],[.76,.3]),...ht(gt(.3,.3,.09,180,360)),...ht(Ke([.36,.5],[.32,.62]))],[ct(.52),gt(.5,.52,.2,180,360),...Xr(.5,.52,.22,.34,[-160,-125,-90,-55,-20])],ct(.2),Ke([.5,.2],[.4,.08]),gt(.66,.4,.16,100,-200),Ht(.66+.16*Math.cos(-200*Math.PI/180),.4+.16*Math.sin(-200*Math.PI/180)),[ct(.42),Ke([.16,.54],[.24,.42],[.76,.42],[.84,.54]),...ht(gt(.34,.3,.1,0,360)),...ht(Ht(.16,.54))],ct(.24),gt(.5,.5,.28,-100,100),Ht(.5+.28*Math.cos(-100*Math.PI/180),.5+.28*Math.sin(-100*Math.PI/180)),Bn([.18,.64],[.36,.64],.3),[ct(.32),Ke([.26,.2],[.5,.32],[.74,.2]),...ht(Ke([.26,.2],[.26,.06])),Ke([.5,.68],[.66,.62]),...ht(Ht(.26,.06))],[ct(.3),...ht(Ke([.5,.3],[.42,.2]),gt(.3,.16,.12,0,180),Ke([.18,.16],[.14,.06])),Ke([.5,.44],[.6,.52])],[ct(.14),Ke([.5,.14],[.3,.22]),Ke([.18,.56],[.5,.38],[.82,.56]),Ht(.58,.17),...ht(Ht(.18,.56))],[ct(.3),gt(.5,.16,.14,20,160),...ht(Ke([.5,.38],[.12,.26]),Bn([.12,.26],[.24,.46],-.25),Bn([.24,.46],[.38,.5],-.3),Bn([.38,.5],[.5,.52],-.3))],[ct(.44),gt(.5,.3,.16,0,180),...Xr(.5,.3,.19,.3,[-160,-125,-55,-20]),Ke([.5,.14],[.5,.04])],[ct(.36),Ke([.32,.2],[.68,.2]),...ht(Ke([.44,.2],[.44,.34])),Ke([.5,.56],[.68,.66],[.5,.76],[.32,.66],[.5,.56])],[ct(.18),gt(.5,.44,.24,180,360),Ke([.5,.18],[.6,.08]),...ht(Ht(.26,.44))],ct(.52),yh(.5,.33,.03,.2,1.6,90),Ke([.66,.2],[.76,.06]),Ht(.76,.06),[ct(.24),...ht(gt(.36,.24,.14,0,-250)),...ht(Ht(.36+.14*Math.cos(-250*Math.PI/180),.24+.14*Math.sin(-250*Math.PI/180)))],[ct(.24),gt(.5,.52,.22,205,335),gt(.5,.66,.24,205,335),gt(.5,.38,.2,205,335),...ht(Ke([.5,.24],[.32,.06]))],[ct(.16),Eh(.5,.82,.2,.2,1.25),Ke([.5,.2],[.5,.11]),...ht(Ke([.5,.11],[.42,.045]))],[ct(.2),...ht(Ke([.5,.3],[.16,.18],[.24,.5],[.5,.4]),Ke([.5,.5],[.3,.64],[.5,.66]),gt(.38,.16,.12,0,-110))],[ct(.32),Ke([.3,.2],[.5,.32],[.7,.2]),...ht(gt(.3,.14,.07,90,-180)),gt(.28,.56,.22,0,150),Ht(.28+.22*Math.cos(150*Math.PI/180),.56+.22*Math.sin(150*Math.PI/180))],[ct(.3),Bn([.5,.3],[.5,.06],.35),Bn([.5,.3],[.5,.06],-.35),...ht(Ke([.5,.42],[.32,.38],[.26,.48]),Ke([.5,.64],[.32,.6],[.26,.7])),...ht(Ht(.38,.52))],[ct(.4),gt(.5,.27,.1,90,450),...Xr(.5,.27,.15,.25,[0,60,120,180,240,300])],[Ke([.5,.05],[.5,.3]),ct(.5),gt(.5,.4,.11,-90,270),...ht(...[-150,-170,170,150].map(i=>Ke([.5+.12*Math.cos(i*Math.PI/180),.4+.12*Math.sin(i*Math.PI/180)],[.5+.28*Math.cos(i*Math.PI/180),.4+.28*Math.sin(i*Math.PI/180)],[.5+.32*Math.cos(i*Math.PI/180),.4+.28*Math.sin(i*Math.PI/180)+.1]))),Ht(.5,.05)],[ct(.12),gt(.5,.46,.24,-60,250),...ht(gt(.34,.16,.08,90,-180)),Bn([.56,.38],[.7,.38],-.4)],[ct(.36),...ht(gt(.66,.26,.2,160,250)),Bn([.5,.38],[.5,.82],.25),Bn([.5,.38],[.5,.82],-.25)];wo.map(i=>i.id);const wh=new Set([f.TRUNK,f.BARK2,f.BARKD,f.BARKL]);function Ti(i,e,t,n,r,a,{mat:s=f.LEAF,group:o=30,ragged:c=1}={}){const u=[];for(let m=0;m<9;m++){const M=m/9*Math.PI*2,E=1+(a()-.5)*.35*(r.clump+.3);u.push([e[0]+Math.cos(M)*t*E,e[1]+Math.sin(M)*n*E*(Math.sin(M)>0?.8:1)])}const d=Math.max(1,Math.round(Math.min(t,n)/3.5));i.shape(Ia(u,0,9,d,Math.max(1.2,Math.min(t,n)*.14)*c,1),s,{group:o,line:!1,round:r.round}),i.mark([bt(e,[-t*1.1,n*.15]),bt(e,[t*1.1,n*.1]),bt(e,[t*1.1,n*1.2]),bt(e,[-t*1.1,n*1.2])],f.LEAF3,[s]),i.mark([bt(e,[-t*.75,-n*.55]),bt(e,[t*.25,-n*.95]),bt(e,[t*.55,-n*.35]),bt(e,[-t*.2,-n*.05])],f.LEAF2,[s]);const h=Math.floor(e[0]-t*1.2),p=Math.ceil(e[0]+t*1.2),_=Math.floor(e[1]-n*1.2),x=Math.ceil(e[1]+n*1.2),g=a()*1e4|0;for(let m=_;m<=x;m++)for(let M=h;M<=p;M++){const E=i.get(M,m);if(E!==s&&E!==f.LEAF2&&E!==f.LEAF3)continue;const b=jt(M,m,g),R=ci(M/2,m/2,g)*.5+b*.5;R<.16*r.density?i.recolour(M,m,E===f.LEAF2?s:f.LEAF2):R>1-.16*r.density&&i.recolour(M,m,E===f.LEAF3?s:f.LEAF3)}}function hi(i,e,t,n,r,a,s,o,{mat:c=f.TRUNK,bend:l=1,group:u=10,line:d=!1}={}){const h=[e],p=4;let _=t,x=e;for(let g=1;g<=p;g++)_+=(o()-.5)*.7*s.gnarl*l,x=bt(x,[Math.cos(_)*n/p,Math.sin(_)*n/p]),h.push(x);return i.limb(h.map((g,m)=>[...g,r+(a-r)*m/p]),c,{group:u,line:d,round:s.round,cap:.6,capEnd:1}),{end:x,ang:_,pts:h}}function Ua(i,e,t,n,r,a,s){if(i.shape([[e-n*1.05,t],[e-n*.62,t-n*.5],[e-n*.45,t-n*1.4],[e+n*.45,t-n*1.4],[e+n*.62,t-n*.5],[e+n*1.05,t]],f.TRUNK,{group:10,round:r.round}),r.roots<=0)return;const o=Math.round(2+r.roots*4);for(let c=0;c<o;c++){const l=c%2?1:-1,u=(8+a()*16)*s*(.4+r.roots),d=(2+a()*3)*s,h=[e+l*n*.2,t-n*.5],p=[e+l*(n*.55+u*.4),t-d],_=[e+l*(n*.5+u),t-.5];i.limb([[...h,n*.55],[...p,n*.28],[..._,1.2]],f.TRUNK,{group:11,round:r.round,cap:.5,capEnd:.6})}}function Fa(i,e,t=!0){if(!(e.bark<=0))for(let n=0;n<i.h;n++)for(let r=0;r<i.w;r++){const a=n*i.w+r;if(i.m[a]!==f.TRUNK)continue;const s=t?ci(r/1.3,n/6,21):ci(r/6,n/1.3,21);s>1-e.bark*.42||jt(r,n,4)<e.bark*.05?i.m[a]=f.BARKD:s>1-e.bark*.62&&i.n[a*3]<-.1&&(i.m[a]=f.BARKL)}}function sr(i,e,t){let n=i.w,r=-1,a=i.h;for(let h=0;h<i.h;h++)for(let p=0;p<i.w;p++)i.m[h*i.w+p]&&(n=Math.min(n,p),r=Math.max(r,p),a=Math.min(a,h));if(r<0)return{sp:i,crownY:t};const s=Math.max(e-n,r-e)+2,o=Math.max(0,Math.floor(e-s)),c=Math.min(i.w-o,Math.ceil(s*2)+1),l=Math.max(0,a-1),u=i.h-l,d=new tn(c,u);for(let h=0;h<u;h++)for(let p=0;p<c;p++){const _=(h+l)*i.w+p+o,x=h*c+p;d.m[x]=i.m[_],d.g[x]=i.g[_],d.n[x*3]=i.n[_*3],d.n[x*3+1]=i.n[_*3+1],d.n[x*3+2]=i.n[_*3+2]}return{sp:d,crownY:t-l}}const Fr=i=>(i.crownWidth||3)/3;function vc(i,e,t){const n=Fr(e),r=Math.round(220*t*n+60*t),a=Math.round(140*t),s=new tn(r,a),o=r/2,c=a,l=e.treeTrunks||1,u=12*t*(e.treeThick||1)*(e.treeThin?.55:1)/Math.sqrt(l),d=(i()-.5)*.5*e.gnarl+(e.treeLean||0),h=[];let p=a;const _=(x,g,m,M,E)=>{const b=hi(s,x,g,m,M,M*.65,e,i,{group:12});if(E===0){h.push(b.end);return}const R=i()<.35?3:2;for(let w=0;w<R;w++){const P=(w-(R-1)/2)*be(i,.5,.85)*(E===3?1.4:1);_(b.end,b.ang+P+(i()-.5)*.25,m*be(i,.6,.78),M*.62,E-1)}E<=2&&h.push(Kn(x,b.end,.7))};for(let x=0;x<l;x++){const g=d+(l>1?(x/(l-1)-.5)*.8:0),m=[o+(x-(l-1)/2)*u*.6,c],M=hi(s,m,-Math.PI/2+g,a*.36*(l>1?be(i,.75,1.15):1),u,u*.72,e,i,{bend:1.4});p=Math.min(p,M.end[1]);for(const E of[-1,1])_(M.end,-Math.PI/2+g*.5+E*be(i,.55,.95)*(.7+.3*n)*(l>1?.6:1),a*.22*(.75+.25*n)*(l>1?.7:1),u*.7,l>2?2:3);if(l===1&&i()<.7&&_(M.end,-Math.PI/2+(i()-.5)*.3,a*.18,u*.55,2),x===0&&e.treeHollow){const E=Kn(m,M.end,.38);s.ellipse(E[0],E[1],u*.28,u*.5,f.NOSE,{round:.3})}}if(Ua(s,o,c,u*Math.sqrt(l),e,i,t),Fa(s,e),e.treeWebs)for(let x=0;x+1<h.length;x+=2){const g=h[x],m=h[x+1],M=Math.hypot(m[0]-g[0],m[1]-g[1]);if(M<40*t)for(let E=0;E<=M;E++){const b=Kn(g,m,E/M);s.px(b[0],b[1]+Math.sin(E/M*Math.PI)*M*.15,f.WEB,0,0,1)}}if(e.treeBare)return sr(s,o,p+4*t);h.sort((x,g)=>x[1]-g[1]);for(const x of h)Ti(s,bt(x,[0,-3*t]),be(i,14,21)*t,be(i,10,14)*t,e,i,{mat:i()<.35?f.LEAF3:f.LEAF});for(const x of h)i()<.75&&Ti(s,bt(x,[be(i,-9,9)*t,be(i,-12,-3)*t]),be(i,10,15)*t,be(i,7,10)*t,e,i);return sr(s,o,p+4*t)}function Ao(i,e,t){const n=.8+.2*Fr(e),r=Math.round(90*t*n),a=Math.round(160*t),s=new tn(r,a),o=r/2,c=a;s.limb([[o,c,6*t],[o,c-a*.5,4*t],[o,6*t,1.5]],f.TRUNK,{group:10,round:e.round}),Ua(s,o,c,6*t,e,i,t*.6),Fa(s,e);const l=Math.round(be(i,9,12));for(let u=l-1;u>=0;u--){const d=u/(l-1),h=6*t+d*a*.7,p=(5+d*36)*t*n*be(i,.9,1.1),_=(5+d*13)*t,x=[[o,h-4*t],[o+p*.5,h+_*.3],[o+p,h+_],[o+p*.7,h+_*1.15],[o,h+_*.7],[o-p*.7,h+_*1.15],[o-p,h+_],[o-p*.5,h+_*.3]];s.shape(Ia(x,1,7,Math.max(2,Math.round(p/(3*t))),2*t,1),f.LEAF,{group:30+u,line:!1,round:e.round}),s.mark([[o-p,h+_*.55],[o+p,h+_*.55],[o+p,h+_*1.4],[o-p,h+_*1.4]],f.LEAF3,[f.LEAF]),s.mark([[o-p*.55,h-2*t],[o+p*.1,h-3*t],[o+p*.1,h+_*.45],[o-p*.7,h+_*.7]],f.LEAF2,[f.LEAF])}return sr(s,o,a*.82)}function Mc(i,e,t){const n=Fr(e),r=Math.round(200*t*n+50*t),a=Math.round(130*t),s=new tn(r,a),o=r/2,c=a,l=13*t,u=hi(s,[o,c],-Math.PI/2+(i()-.5)*.3,a*.3,l,l*.8,e,i,{bend:1.6}),d=[];for(let _=0;_<5;_++){const x=_%2?1:-1,g=-Math.PI/2+x*be(i,.55,1.25)*(.7+.3*n),m=hi(s,u.end,g,a*be(i,.3,.42)*(.8+.2*n),l*.55,l*.3,e,i,{group:12});d.push(m.end)}Ua(s,o,c,l,e,i,t),Fa(s,e);for(const _ of d)Ti(s,bt(_,[0,-2*t]),be(i,20,28)*t,be(i,9,12)*t,e,i);Ti(s,bt(u.end,[0,-8*t]),24*t,11*t,e,i);let h=r,p=0;for(const _ of d)h=Math.min(h,_[0]-22*t),p=Math.max(p,_[0]+22*t);for(let _=h;_<p;_+=be(i,1,1.7)){let x=a;for(let E=0;E<a;E++)if(s.get(_,E)===f.LEAF||s.get(_,E)===f.LEAF2||s.get(_,E)===f.LEAF3){x=E;break}if(x>=a)continue;const g=Math.abs(_-o)/(r/2),m=(c-x)*be(i,.5,.9)*(1-g*.3),M=jt(_|0,1,9)<.4?f.LEAF2:f.LEAF;for(let E=x+2;E<Math.min(c-2,x+m);E++){const b=Math.round(Math.sin(E*.12+_)*.7);jt(_|0,E,5)<.2+e.density*.8&&s.px(_+b,E,(E-x)/m>.8?f.LEAF3:M,b*.3,.2,.95)}}return sr(s,o,u.end[1]+6*t)}function Sc(i,e,t){const n=.7+.3*Fr(e),r=Math.round(110*t*n),a=Math.round(155*t),s=new tn(r,a),o=r/2,c=a,l=(i()-.5)*.25+(e.treeLean||0),u=hi(s,[o,c],-Math.PI/2+l,a*.85,5*t,2*t,e,i,{mat:f.BARK2,bend:.4});for(let h=0;h<u.pts.length-1;h++)for(let p=0;p<1;p+=1/8){const _=Kn(u.pts[h],u.pts[h+1],p+i()*.1);if(i()<.55)for(let x=-3;x<=3;x++)s.get(_[0]+x,_[1])===f.BARK2&&i()<.8&&s.recolour(_[0]+x,_[1],f.BARKD)}const d=[u.end];for(let h=0;h<7;h++){const p=be(i,.35,.9),_=Kn(u.pts[0],u.end,p),x=h%2?1:-1,g=hi(s,_,-Math.PI/2+x*be(i,.5,1),a*be(i,.12,.2)*n,2*t,1,e,i,{mat:f.BARKD,group:12});d.push(g.end)}for(const h of d)Ti(s,h,be(i,9,13)*t*n,be(i,7,10)*t,e,i,{mat:f.LEAF2,ragged:1.3});return sr(s,o,a*.55)}function bc(i,e,t){const n=Fr(e),r=Math.round(220*t*n+50*t),a=Math.round(120*t),s=new tn(r,a),o=r/2,c=a,l=10*t,u=hi(s,[o,c],-Math.PI/2+(i()-.5)*.4*(e.gnarl+.3),a*.4,l,l*.75,e,i,{bend:1.2}),d=[];for(const _ of[-1,1,-1,1]){const x=hi(s,u.end,-Math.PI/2+_*be(i,.7,1.15)*(.7+.3*n),a*be(i,.3,.42)*(.7+.3*n),l*.55,l*.25,e,i,{group:12});d.push(x.end,Kn(u.end,x.end,.55))}Ua(s,o,c,l,e,i,t),Fa(s,e);const h=Math.round(be(i,2,3)),p=Math.min(...d.map(_=>_[1]));for(let _=0;_<h;_++){const x=p-6*t+_*9*t,g=(95-_*12)*t*(.65+.35*n);for(let m=0;m<5;m++)Ti(s,[o+(m-2)*g*.36+be(i,-5,5)*t,x+be(i,-3,3)*t],g*be(i,.2,.26),7*t,e,i,{mat:_===h-1?f.LEAF:f.LEAF3})}return sr(s,o,u.end[1]+4*t)}function To(i,e,t){const n=e.leafHue+(i()-.5)*e.leafVariety*.7+(t===Ao?.06:0);return{[f.TRUNK]:ve(e.trunkHue,.45*e.sat,.34),[f.BARKD]:ve(e.trunkHue+.03,.5*e.sat,.17),[f.BARKL]:ve(e.trunkHue-.01,.38*e.sat,.5),[f.BARK2]:[222,220,212],[f.LEAF]:ve(n,.62*e.sat,.58),[f.LEAF2]:ve(n-.05,.55*e.sat,.8),[f.LEAF3]:ve(n+.03,.66*e.sat,.38),[f.WEB]:[225,225,232]}}function Ah(i){const{sp:e,crownY:t}=i,n=new tn(e.w,e.h),r=new tn(e.w,e.h);for(let a=0;a<e.h;a++)for(let s=0;s<e.w;s++){const o=a*e.w+s,c=e.m[o];if(!c)continue;(wh.has(c)&&a>=t?r:n).put(s,a,c,e.n[o*3],e.n[o*3+1],e.n[o*3+2])}return{top:n,bot:r}}function Th(i,e){const t=e.bushSize,n=oc(i,["round","round","fern","grass","shrub"]),r=Math.round(40*t),a=Math.round(28*t),s=new tn(r,a);if(n==="round"||n==="shrub"){const c=n==="shrub"?5:3;for(let l=0;l<c;l++)Ti(s,[r/2+be(i,-9,9)*t,a-8*t+be(i,-4,2)*t],be(i,7,10)*t,be(i,5,8)*t,e,i);if(n==="shrub"||i()<e.flowers)for(let l=0;l<18*e.flowers+3;l++){const u=r/2+be(i,-12,12)*t,d=a-be(i,5,17)*t;s.get(u,d)&&s.recolour(u,d,f.FLOWER)}}else if(n==="fern")for(let c=0;c<7;c++){const l=-Math.PI/2+(c/6-.5)*2.4;let u=r/2,d=a-1;for(let h=0;h<15*t;h++)u+=Math.cos(l)*.9,d+=Math.sin(l)*.9+h*.06,s.put(u,d,c%2?f.LEAF3:f.LEAF,Math.cos(l)*.4,-.2,.9),h%2&&(s.put(u,d-1,f.LEAF2,0,-.5,.85),s.put(u+Math.sign(Math.cos(l)),d+1,f.LEAF,0,.3,.9))}else for(let c=0;c<18*t;c++){const l=r/2+be(i,-13,13)*t,u=be(i,5,15)*t,d=be(i,-3,3);for(let h=0;h<u;h++)s.put(l+d*h/u*(h/u),a-1-h,h>u*.65?f.LEAF2:h<u*.3?f.LEAF3:f.LEAF,d*.1,-.3,.9)}const o=To(i,e,null);return o[f.FLOWER]=ve(i(),.55,.95),{sp:s,colours:o}}const at=(i,e={})=>["tree",{type:i,...e}],Fe=(i,e={})=>[i,e],Or=[{id:"moor",name:"Moor",creature:"badger",by:"Ed",leaf:.24,floor:["moss",.26,.45,.42],text:{floor:"moss",wall:"puddles, a lake",small:"long grass",big:"moss mounds"},wall:[Fe("water",{w:1.6})],small:[Fe("grass",{h:1.4})],big:[Fe("mound",{moss:!0})]},{id:"fern-forest",name:"Fern forest",creature:"boar",by:"Ed",leaf:.3,floor:["needles",.08,.45,.32],text:{floor:"pine needles",small:"ferns",big:"pine trees"},small:[Fe("fern")],big:[at("fir")]},{id:"muddy-forest",name:"Muddy forest",creature:"snail",by:"Ed",leaf:.22,floor:["mud",.07,.5,.28],text:{floor:"mud and leaves",small:"short trunks with broken branches",big:"trees with many trunks and branches"},small:[Fe("stump",{snag:!0})],big:[at("broad",{trunks:3,gnarl:.9})]},{id:"stone-shrine",name:"Stone shrine",creature:"fox",by:"Ed",leaf:.28,floor:["stony",.25,.3,.45],text:{floor:"grassy, stony",wall:"mossy henges",small:"little stones",big:"big stones",set:"a shrine"},wall:[Fe("henge")],small:[Fe("stones")],big:[Fe("boulder")],set:Fe("shrine")},{id:"tangly-forest",name:"Tangly forest",creature:"ram",by:"Ed",leaf:.27,floor:["nettles",.28,.5,.3],text:{floor:"nettles and earth",small:"tangled branches",big:"fairly short tangly trees"},small:[Fe("bramble",{bare:!0})],big:[at("broad",{scale:.7,gnarl:1})]},{id:"wispy-forest",name:"Wispy forest",creature:"woodlouse",by:"Ed",leaf:.2,floor:["leaves",.09,.55,.45],text:{floor:"dry leaves",small:"tall thin wispy trees",big:"thick trees with several trunks"},small:[at("birch",{scale:.75})],big:[at("broad",{trunks:3,thick:1.4})]},{id:"hazel-forest",name:"Hazel forest",creature:"hedgehog",by:"Ed",leaf:.26,floor:["grass",.24,.45,.45],text:{floor:"short grass",small:"brown lumps",big:"crooked trees with many branches"},small:[Fe("mound",{brown:!0})],big:[at("broad",{gnarl:1,scale:.85})]},{id:"garden",name:"Garden",creature:"squirrel",by:"Ed",leaf:.3,floor:["lawn",.27,.5,.5],text:{floor:"uniform grass",wall:"ornate stone wall",small:"manicured flower beds",big:"willows",set:"a stone pavilion"},wall:[Fe("wall")],small:[Fe("flowerbed")],big:[at("willow")],set:Fe("pavilion")},{id:"twiggy-forest",name:"Twiggy forest",creature:"wolf",by:"Ed",leaf:.29,floor:["plants",.3,.5,.38],text:{floor:"small leafy plants",small:"small trees with many thin trunks",big:"straight but slanted trees with many trunks"},small:[at("broad",{trunks:4,scale:.5,thin:!0})],big:[at("broad",{trunks:3,lean:.3,gnarl:.1})]},{id:"ancient",name:"Ancient",creature:"stag",by:"Ed",leaf:.31,floor:["roots",.1,.25,.35],text:{floor:"mossy roots over rocks",small:"sorrel",big:"giant gnarly slanted trees"},small:[Fe("flowers",{hue:.98,leafy:!0})],big:[at("broad",{scale:1.4,gnarl:1,lean:.35})]},{id:"norway",name:"Norway",creature:"stoat",by:"Ed",leaf:.36,floor:["slate",.6,.15,.35],text:{floor:"pine needles and slate",small:"rocks",big:"straight pines"},small:[Fe("stones",{big:!0})],big:[at("fir",{scale:1.2})]},{id:"alder-forest",name:"Alder forest",creature:"snake",by:"Ed",leaf:.23,floor:["tallgrass",.22,.45,.42],text:{floor:"tall and short grass",small:"tree stumps with tall grass around",big:"tall slanted trees with thin leaves at different heights"},small:[Fe("stump",{grass:!0})],big:[at("birch",{lean:.3,scale:1.2,dark:!0})]},{id:"meadow",name:"Meadow",creature:"hare",by:"draft",leaf:.25,floor:["flowers",.25,.5,.5],text:{floor:"grass and wildflowers",small:"scattered hawthorn",big:"lone oaks"},small:[Fe("shrub",{flower:[250,245,235]})],big:[at("broad",{scale:1.1})]},{id:"old-oaks",name:"Old oaks",creature:"owl",by:"draft",leaf:.22,floor:["leaves",.07,.5,.35],text:{floor:"leaf litter",small:"acorns, fallen branches",big:"ancient gnarled oaks with hollow trunks",set:"a great hollow oak"},small:[Fe("cones",{acorn:!0}),Fe("log",{branch:!0})],big:[at("broad",{gnarl:.9,hollow:!0})],set:at("broad",{scale:1.6,gnarl:1,hollow:!0})},{id:"berry-thicket",name:"Berry thicket",creature:"bear",by:"draft",leaf:.32,floor:["needles",.08,.45,.3],text:{floor:"pine needles",wall:"bramble thickets",small:"berry bushes",big:"tall pines"},wall:[Fe("bramble")],small:[Fe("shrub",{flower:[200,30,60]})],big:[at("fir",{scale:1.3})]},{id:"wetland",name:"Wetland",creature:"toad",by:"draft",leaf:.2,floor:["mud",.15,.45,.3],text:{floor:"wet mud",wall:"puddles, reeds",small:"reeds and rushes",big:"willows"},wall:[Fe("water"),Fe("reeds",{tall:!0})],small:[Fe("reeds")],big:[at("willow")]},{id:"stream",name:"Stream",creature:"otter",by:"draft",leaf:.27,floor:["pebbles",.25,.3,.45],text:{floor:"pebbles and grass",wall:"a stream or pond",small:"alder saplings",big:"alders",set:"a fallen-log bridge"},wall:[Fe("water",{w:2})],small:[at("broad",{scale:.45})],big:[at("broad",{scale:.95,gnarl:.3})],set:Fe("bridge")},{id:"rocky-slope",name:"Rocky slope",creature:"lynx",by:"draft",leaf:.34,floor:["scree",.2,.2,.42],text:{floor:"scree and moss",wall:"boulders",small:"rocks",big:"pines",set:"a rocky outcrop"},wall:[Fe("boulder",{big:!0})],small:[Fe("stones",{big:!0})],big:[at("fir")],set:Fe("outcrop")},{id:"bog",name:"Bog",creature:"elk",by:"draft",leaf:.38,floor:["moss",.18,.55,.4],text:{floor:"sphagnum moss",wall:"bog pools",small:"cotton grass",big:"spruce"},wall:[Fe("water",{bog:!0})],small:[Fe("reeds",{cotton:!0})],big:[at("fir",{dark:!0})]},{id:"deadwood",name:"Deadwood",creature:"raven",by:"draft",leaf:.15,floor:["earth",.07,.35,.3],text:{floor:"bare earth",small:"broken branches",big:"blasted dead trees"},small:[Fe("log",{branch:!0})],big:[at("broad",{bare:!0,gnarl:1})]},{id:"cave-mouth",name:"Cave mouth",creature:"bat",by:"draft",leaf:.2,floor:["stone",.08,.15,.35],text:{floor:"stone and roots",wall:"rock walls",small:"stalagmite stubs",big:"dead trees",set:"a cave mouth"},wall:[Fe("rockwall")],small:[Fe("stalagmite")],big:[at("broad",{bare:!0})],set:Fe("cave")},{id:"grassland",name:"Grassland",creature:"mole",by:"draft",leaf:.25,floor:["grass",.26,.5,.48],text:{floor:"short turf",small:"molehills",big:"lone birches"},small:[Fe("mound",{brown:!0,small:!0})],big:[at("birch")]},{id:"beaver-pond",name:"Beaver pond",creature:"beaver",by:"draft",leaf:.17,floor:["leaves",.13,.6,.5],text:{floor:"birch leaves",wall:"a pond",small:"stumps",big:"birch and aspen",set:"a beaver dam"},wall:[Fe("water",{w:2})],small:[Fe("stump",{gnawed:!0})],big:[at("birch")],set:Fe("dam")},{id:"log-pile",name:"Log pile",creature:"beetle",by:"draft",leaf:.22,floor:["leaves",.06,.5,.3],text:{floor:"rotting leaves",small:"fungi",big:"rotting logs",set:"a fallen giant"},small:[Fe("fungi")],big:[Fe("log",{rot:!0})],set:Fe("log",{rot:!0,giant:!0})},{id:"heath",name:"Heath",creature:"moth",by:"draft",leaf:.27,floor:["heather",.85,.35,.4],text:{floor:"heather",small:"gorse",big:"wind-bent birches"},small:[Fe("shrub",{flower:[250,205,40],spiky:!0})],big:[at("birch",{lean:.45,scale:.75})]},{id:"old-pinewood",name:"Old pinewood",creature:"marten",by:"draft",leaf:.35,floor:["needles",.07,.4,.3],text:{floor:"pine needles",small:"pine cones",big:"tall old pines with knotholes"},small:[Fe("cones")],big:[at("fir",{scale:1.35})]},{id:"ravine",name:"Ravine",creature:"salamander",by:"draft",leaf:.3,floor:["stone",.3,.3,.32],text:{floor:"wet moss and rock",wall:"rock walls",small:"ferns",big:"mossy boulders",set:"a waterfall"},wall:[Fe("rockwall",{moss:!0})],small:[Fe("fern")],big:[Fe("boulder",{moss:!0,big:!0})],set:Fe("waterfall")},{id:"bluebell-glade",name:"Bluebell glade",creature:"glowworm",by:"draft",leaf:.26,floor:["bluebells",.27,.45,.4],text:{floor:"bluebells",small:"ferns",big:"beeches"},small:[Fe("fern")],big:[at("broad",{gnarl:.2,scale:1.1})]},{id:"holly-thicket",name:"Holly thicket",creature:"spider",by:"draft",leaf:.36,floor:["leaves",.08,.35,.28],text:{floor:"dead leaves",wall:"holly hedges",small:"cobwebs",big:"hollies",set:"a web-hung dead tree"},wall:[Fe("hedge",{berries:!0})],small:[Fe("web")],big:[at("broad",{scale:.7,dark:!0})],set:at("broad",{bare:!0,webs:!0})},{id:"honeysuckle-tangle",name:"Honeysuckle tangle",creature:"dormouse",by:"draft",leaf:.25,floor:["clover",.27,.45,.45],text:{floor:"grass and clover",wall:"bramble",small:"honeysuckle",big:"hazel coppice"},wall:[Fe("bramble")],small:[Fe("shrub",{flower:[250,230,170]})],big:[at("broad",{trunks:5,scale:.7,thin:!0})]}];for(const[i,[e,t]]of Object.entries(mc)){const n=Or.find(r=>r.id===i);n&&!n.set&&(n.set=Fe(e,{three:!0}),n.text={...n.text,set:t})}const Rh=Object.fromEntries(Or.map(i=>[i.id,i])),Ch=["ruins","rocks","freak","lake","modern"],dt=(i,e,t,n,r,a,s,o,c,l,u={})=>({pattern:i,...u,density:e,clump:t,glades:{count:n[0],size:n[1]||[0,0]},heightMix:r&&{sapling:r[0],mature:r[1],tall:r[2],giant:r[3]},undergrowth:a,lean:{dir:s[0],amount:s[1]},terrain:o,decor:{rate:c[0],...Object.fromEntries(Ch.map((d,h)=>[d,c[1][h]]))},feel:l}),wt=[0,0],Lh={moor:dt("scatter",.2,.6,[2,[14,24]],null,.7,[30,.2],["pools","mounds","hollows"],[.5,[.3,.4,0,.3,0]],"Open rolling moss, low mounds and dark pools, long grass combed one way by the wind; you can see a long way."),"fern-forest":dt("groves",.65,.6,[2,[8,12]],[.2,.5,.25,.05],.9,wt,["hollows","paths"],[.25,[.4,.3,.3,0,0]],"Pine groves standing waist-deep in ferns, with green sunken hollows between them."),"muddy-forest":dt("scatter",.7,.3,[1,[6,9]],[.25,.55,.17,.03],.4,wt,["pools","paths"],[.3,[.3,.1,.2,.1,.3]],"Squelching mud between many-trunked trees, puddled ruts winding through, broken stumps everywhere."),"stone-shrine":dt("rings",.35,.8,[1,[10,14]],null,.3,wt,["rocky","mounds"],[.5,[.6,.4,0,0,0]],"Big stones stand in rings round the shrine on stony grass; it feels deliberate and old."),"tangly-forest":dt("thicket",.9,.2,[1,[5,8]],[.35,.55,.1,0],.9,wt,["hollows"],[.2,[.2,0,.6,0,.2]],"Short tangled trees packed close over nettles, low and claustrophobic, with one small clearing."),"wispy-forest":dt("stands",.55,.7,[2,[6,10]],[.15,.45,.3,.1],.5,wt,["ridges"],[.3,[.4,.2,.3,0,.1]],"Stands of thick many-trunked trees, thin wispy saplings drifting between them over dry leaves."),"hazel-forest":dt("rings",.6,.6,[2,[6,9]],[.3,.55,.12,.03],.5,wt,["mounds","paths"],[.3,[.4,.3,.3,0,0]],"Crooked hazels grown in loose fairy rings on short grass, lumpy little mounds in the middle of each."),garden:dt("rows",.45,0,[3,[6,10]],[.1,.7,.2,0],.6,wt,["paths","pools"],[.4,[.7,0,0,.2,.1]],"A lost formal garden: willows in avenues along straight paths, lawns and flower beds, a pavilion at the heart.",{along:"paths"}),"twiggy-forest":dt("scatter",.75,.3,[1,[6,10]],[.25,.5,.2,.05],.6,[60,.5],["paths"],[.25,[.3,.2,.3,0,.2]],"Straight many-trunked trees all slanting the same way, like a wood frozen in a gale."),ancient:dt("lone",.4,.2,[1,[12,18]],[.05,.35,.4,.2],.4,[150,.25],["rocky","mounds","hollows"],[.45,[.5,.2,.3,0,0]],"Giant gnarled trees far apart, roots heaving over mossy rocks; every tree is a landmark."),norway:dt("stands",.8,.5,[1,[8,12]],[.15,.45,.35,.05],.2,wt,["rocky","ridges"],[.3,[.2,.6,0,.2,0]],"Dense stands of straight pines on slate ridges, bare rock between; dark, vertical and cold."),"alder-forest":dt("scatter",.55,.4,[2,[6,10]],[.2,.4,.35,.05],.6,[120,.35],["stream","hollows"],[.3,[.3,.1,.2,.3,.1]],"Tall slanted alders at every height over long grass and stumps, a little stream wandering through."),meadow:dt("lone",.12,.1,[0],[.2,.5,.25,.05],.3,wt,["mounds","paths"],[.35,[.3,.3,0,.2,.2]],"Wide-open wildflower grass with a lone oak here and there and scattered hawthorn; the sky does the work."),"old-oaks":dt("groves",.5,.5,[2,[10,16]],[.1,.35,.4,.15],.5,wt,["mounds","hollows"],[.4,[.5,.1,.4,0,0]],"Groves of huge hollow oaks with broad clearings of leaf litter between; slow and grand."),"berry-thicket":dt("thicket",.85,.5,[2,[4,7]],[.2,.4,.35,.05],1,wt,["paths"],[.15,[.3,0,.4,0,.3]],"Tall pines over solid berry bushes and brambles, only narrow animal paths and a couple of pockets of space."),wetland:dt("edgeOnly",.5,.5,[1,[16,24]],[.25,.55,.15,.05],.8,wt,["pools","stream"],[.35,[.2,0,0,.6,.2]],"Open reedy water and mud in the middle, willows crowding the rim; wet and echoing."),stream:dt("rows",.5,.2,[1,[6,10]],[.3,.45,.2,.05],.5,wt,["stream","pools"],[.3,[.3,.3,0,.3,.1]],"Alders lining both banks of a pebbly stream, saplings at the water's edge, open grass away from it.",{along:"stream"}),"rocky-slope":dt("scatter",.35,.6,[1,[8,12]],[.3,.5,.18,.02],.2,[90,.15],["rocky","ridges"],[.5,[.3,.7,0,0,0]],"Scree and boulders with pines clinging in clumps, everything leaning slightly uphill."),bog:dt("stands",.25,.85,[3,[10,20]],[.4,.5,.1,0],.6,wt,["pools","mounds"],[.35,[.2,0,0,.5,.3]],"Sphagnum and bog pools, stunted spruce in tight dark stands, cotton grass pale between them."),deadwood:dt("scatter",.25,.2,[2,[8,14]],[.05,.3,.45,.2],.15,wt,["ridges","hollows"],[.45,[.3,.1,.3,0,.3]],"Sparse tall blasted snags on bare ridges; bleak, quiet, with long sightlines."),"cave-mouth":dt("edgeOnly",.4,.5,[1,[10,14]],[.2,.5,.3,0],.2,wt,["rocky","ridges"],[.4,[.3,.6,0,0,.1]],"Rock walls and dead trees ring an open stone floor that leads to the cave's dark mouth."),grassland:dt("lone",.1,.5,[0],[.3,.5,.2,0],.2,wt,["mounds"],[.35,[.3,.2,0,.1,.4]],"Short turf to the horizon, molehills, birches alone or in twos and threes."),"beaver-pond":dt("edgeOnly",.55,.4,[1,[14,20]],[.4,.45,.15,0],.4,wt,["pools","stream"],[.4,[.1,0,0,.7,.2]],"A pond in the middle, young birch and aspen round it, gnawed stumps where the big ones were felled."),"log-pile":dt("groves",.5,.7,[2,[6,10]],null,.7,wt,["hollows","mounds"],[.3,[.3,0,.4,0,.3]],"Rotting logs heaped in piles, fungi everywhere, damp hollows between the heaps."),heath:dt("scatter",.2,.3,[1,[12,18]],[.5,.45,.05,0],.8,[30,.6],["ridges","paths"],[.4,[.4,.4,0,0,.2]],"Purple heather and gorse, small birches bent hard by the wind, all the same way."),"old-pinewood":dt("scatter",.5,.3,[2,[8,14]],[.1,.35,.4,.15],.15,wt,["mounds","paths"],[.35,[.4,.3,.3,0,0]],"Cathedral-tall old pines on a clear floor of needles; you can see between the trunks a long way."),ravine:dt("edgeOnly",.55,.6,[1,[6,9]],null,.8,wt,["stream","ridges","rocky"],[.4,[.3,.5,0,.2,0]],"A deep wet cleft: rock walls and mossy boulders either side, ferns, a stream down the middle."),"bluebell-glade":dt("groves",.45,.5,[3,[8,14]],[.1,.5,.35,.05],.3,wt,["hollows"],[.35,[.4,0,.3,.3,0]],"Beech groves round open glades carpeted in bluebells; soft, bright and airy."),"holly-thicket":dt("thicket",.9,.3,[1,[6,9]],[.3,.6,.1,0],.7,wt,["hollows"],[.25,[.3,0,.5,0,.2]],"Dark hollies packed close, cobwebs strung between, one clearing round the web-hung tree."),"honeysuckle-tangle":dt("stands",.6,.7,[2,[5,8]],[.45,.5,.05,0],.8,wt,["paths","mounds"],[.3,[.3,0,.3,0,.4]],"Hazel coppice stools in clumps, honeysuckle and bramble between, clover paths winding through.")};for(const i of Or)i.layout=Lh[i.id];function Ph(i,e,t=64,n=48){const[r,a,s,o]=i.floor,c=new tn(t,n),l=i.id.length*131;for(let x=0;x<n;x++)for(let g=0;g<t;g++){const m=(ci(g/7,x/5,l)*(t-g)*(n-x)+ci((g-t)/7,x/5,l)*g*(n-x)+ci(g/7,(x-n)/5,l)*(t-g)*x+ci((g-t)/7,(x-n)/5,l)*g*x)/(t*n),M=m<.38?f.BODY2:m>.64?f.BELLY:f.BODY;c.px(g,x,M,0,-.42,.91)}const u=Mo(l),d=(x,g,m)=>c.px((x%t+t)%t,(g%n+n)%n,m,0,-.42,.91),h={moss:0,needles:70,mud:25,stony:30,nettles:60,leaves:80,grass:70,lawn:30,plants:60,roots:30,slate:40,tallgrass:90,flowers:70,pebbles:60,scree:70,earth:15,stone:40,heather:90,bluebells:90,clover:60}[r]??40;for(let x=0;x<h;x++){const g=Math.floor(u()*t),m=Math.floor(u()*n);if(r==="needles"){const M=u()<.5?1:-1;for(let E=0;E<3;E++)d(g+E*M,m+(E>>1),u()<.5?f.BODY2:f.ACCENT)}else if(["grass","lawn","tallgrass","plants","nettles","clover","flowers","bluebells","heather"].includes(r)){const M=r==="tallgrass"?4:r==="lawn"?1:2;for(let E=0;E<M;E++)d(g,m-E,E===M-1?f.LEAF2:f.LEAF);(r==="flowers"||r==="bluebells"||r==="heather"||r==="clover")&&u()<.5&&d(g+1,m-M,f.FLOWER)}else if(["stony","pebbles","scree","slate","stone","roots"].includes(r)){if(d(g,m,f.ACCENT),u()<.6&&d(g+1,m,f.ACCENT),u()<.4&&d(g,m+1,f.BODY2),r==="roots"&&u()<.5)for(let M=0;M<5;M++)d(g+M,m+(M>2?1:0),f.TRUNK)}else if(r==="leaves")d(g,m,f.FLOWER),d(g+1,m,f.FLOWER),u()<.5&&d(g,m+1,f.ACCENT);else if(r==="mud"||r==="earth")for(let M=0;M<3;M++)d(g+M,m,f.BODY2)}const p={flowers:ve(.13,.6,.95),bluebells:[90,110,230],heather:[180,90,170],clover:[240,235,240],leaves:ve(a+.02,.65,.6)}[r]||ve(a,.3,.6),_={[f.BODY]:ve(a,s*e.sat,o),[f.BODY2]:ve(a+.02,s*e.sat*1.1,o*.78),[f.BELLY]:ve(a-.02,s*e.sat*.9,Math.min(1,o*1.15)),[f.ACCENT]:r==="needles"?ve(.07,.5,.5):ve(.1,.08,.62),[f.FLOWER]:p,[f.LEAF]:ve(i.leaf,.55*e.sat,.45),[f.LEAF2]:ve(i.leaf-.03,.5*e.sat,.62),[f.TRUNK]:ve(e.trunkHue,.4,.3)};return{sp:c,colours:_}}const Mi=i=>({[f.ACCENT]:ve(.1,.06,.6),[f.BODY2]:ve(.62,.08,.4),[f.BELLY]:ve(.1,.05,.78),[f.LEAF]:ve(.27,.5,.45),[f.LEAF2]:ve(.25,.45,.62),[f.NOSE]:[20,16,24]});function tr(i,e,t,n,r,a,s){const o=[];for(let c=0;c<8;c++){const l=c/8*Math.PI*2,u=1+(a()-.5)*.3;o.push([e[0]+Math.cos(l)*t*u,e[1]+Math.sin(l)*n*u*(Math.sin(l)>0?.5:1)])}i.shape(o,f.ACCENT,{group:5,line:!0,round:r.round}),i.mark([bt(e,[-t,n*.1]),bt(e,[t,n*.1]),bt(e,[t,n]),bt(e,[-t,n])],f.BODY2,[f.ACCENT]),i.mark([bt(e,[-t*.6,-n*.8]),bt(e,[t*.1,-n*1.1]),bt(e,[t*.3,-n*.5]),bt(e,[-t*.3,-n*.3])],f.BELLY,[f.ACCENT]),s&&i.mark(Ia([bt(e,[-t*1.1,-n*.55]),bt(e,[0,-n*1.3]),bt(e,[t*1.1,-n*.5]),bt(e,[t*.6,-n*.2]),bt(e,[-t*.6,-n*.2])],0,3,3,n*.15,1),f.LEAF,[f.ACCENT,f.BELLY,f.BODY2])}function va(i,e,t,n,r,a){const s={[f.LEAF]:ve(t.leaf,.6*n.sat,.55),[f.LEAF2]:ve(t.leaf-.05,.55*n.sat,.78),[f.LEAF3]:ve(t.leaf+.03,.66*n.sat,.36)},o={[f.TRUNK]:ve(n.trunkHue,.45*n.sat,.34),[f.BARKD]:ve(n.trunkHue+.03,.5*n.sat,.17),[f.BARKL]:ve(n.trunkHue-.01,.38*n.sat,.5),[f.BELLY]:ve(n.trunkHue+.02,.3,.7)},c={[f.MAGIC]:[60,110,150],[f.MAGIC2]:[150,200,220],[f.BODY2]:[35,70,100]};if(i==="tree"){const x={broad:vc,fir:Ao,willow:Mc,birch:Sc,flat:bc}[e.type],g={...n,leafHue:t.leaf+(e.dark?.05:0),gnarl:e.gnarl??n.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},m=x(r,g,n.treeSize*a*(e.scale||1)*be(r,.9,1.1)),M=To(r,g,x);return e.dark&&(M[f.LEAF]=M[f.LEAF3],M[f.LEAF3]=ve(t.leaf+.05,.7,.22)),M[f.NOSE]=[20,16,24],M[f.WEB]=[225,225,232],{sp:m.sp,colours:M}}if(i==="shrub"){const x=Th(r,{...n,leafHue:t.leaf,bushSize:n.bushSize*a,flowers:1});for(let g=0;g<x.sp.m.length;g++)x.sp.m[g]&&jt(g,1,3)<(e.spiky?.18:.1)&&x.sp.m[g]!==f.TRUNK&&(x.sp.m[g]=f.FLOWER);return x.colours[f.FLOWER]=e.flower,x}const l=Math.round(48*a*(e.w||1)),u=Math.round(32*a),d=new tn(l,u),h=l/2,p=u;let _={};if(i==="grass"||i==="reeds"||i==="fern"||i==="flowers"||i==="flowerbed"){const x=i==="flowerbed"?40:24,g=(i==="reeds"?e.tall?26:20:i==="fern"?14:10*(e.h||1))*a;i==="flowerbed"&&d.shape([[h-20*a,p-2],[h-18*a,p-6*a],[h+18*a,p-6*a],[h+20*a,p-2],[h+20*a,p],[h-20*a,p]],f.ACCENT,{group:2,line:!0});for(let m=0;m<x;m++){const M=h+be(r,-16,16)*a,E=g*be(r,.5,1),b=i==="fern"?be(r,-6,6)*a:be(r,-2,2)*a,R=p-1-(i==="flowerbed"?5*a:0);for(let w=0;w<E;w++){const P=w/E;d.px(M+b*P*P,R-w,P>.7?f.LEAF2:P<.3?f.LEAF3:f.LEAF,b*.05,-.3,.9),i==="fern"&&w%2&&d.px(M+b*P*P+(b>0?1:-1),R-w+1,f.LEAF2,0,-.3,.9)}if(i==="reeds"&&(e.cotton||r()<.5))for(let w=0;w<(e.cotton?2:3);w++)d.px(M+b,R-E-w,e.cotton?f.WEB:f.TRUNK,0,-.5,.85);(i==="flowers"||i==="flowerbed")&&r()<.7&&(d.px(M+b,R-E,f.FLOWER,0,-.5,.85),d.px(M+b+1,R-E,f.FLOWER,0,-.5,.85))}if(_={...s,[f.FLOWER]:i==="flowerbed"?oc(r,[[230,80,120],[250,210,60],[150,110,230]]):ve(e.hue??.95,.6,.85),[f.TRUNK]:ve(.07,.5,.35),[f.WEB]:[240,240,235],[f.ACCENT]:ve(.08,.1,.55)},i==="flowerbed"){for(let m=0;m<d.m.length;m++)d.m[m]===f.FLOWER&&jt(m,2,7)<.5&&(d.m[m]=f.BELLY);_[f.BELLY]=[250,245,240]}}else if(i==="stones"){for(let x=0;x<(e.big?3:6);x++)tr(d,[h+be(r,-14,14)*a,p-(e.big?5:2.5)*a],(e.big?6:3)*a*be(r,.7,1.2),(e.big?5:2.5)*a,n,r);_=Mi()}else if(i==="boulder")tr(d,[h,p-(e.big?11:8)*a],(e.big?18:13)*a,(e.big?12:9)*a,n,r,e.moss),_={...Mi(),...s,[f.ACCENT]:ve(.1,.06,.6)};else if(i==="henge")d.shape([[h-7*a,p],[h-8*a,p-18*a],[h-4*a,p-28*a],[h+5*a,p-27*a],[h+8*a,p-14*a],[h+7*a,p]],f.ACCENT,{group:5,line:!0,round:n.round}),d.mark([[h-9*a,p-30*a],[h+9*a,p-30*a],[h+9*a,p-22*a],[h-9*a,p-18*a]],f.LEAF,[f.ACCENT]),_={...Mi(),...s};else if(i==="mound"){const x=(e.small?8:14)*a,g=(e.small?5:8)*a;d.shape(Ia([[h-x,p],[h-x*.6,p-g*.8],[h,p-g],[h+x*.6,p-g*.8],[h+x,p]],0,4,e.moss?3:1,(e.moss?1.5:.8)*a,1),e.moss?f.LEAF:f.TRUNK,{group:5,round:n.round}),d.mark([[h-x,p-g*.45],[h+x,p-g*.45],[h+x,p],[h-x,p]],e.moss?f.LEAF3:f.BARKD,[e.moss?f.LEAF:f.TRUNK]),_={...s,...o,[f.TRUNK]:ve(.07,.45,e.brown?.35:.3)}}else if(i==="stump"){const x=6*a;if(d.limb([[h,p,x*2.2],[h,p-8*a,x*1.6]],f.TRUNK,{group:5,round:n.round,cap:0,capEnd:0}),d.shape([[h-x*.8,p-8*a],[h,p-10*a-(e.gnawed?4*a:0)],[h+x*.8,p-8*a],[h,p-7*a]],f.BELLY,{group:6,round:n.round}),e.snag&&d.limb([[h+x*.4,p-8*a,2.5*a],[h+x*1.6,p-15*a,1.5*a]],f.TRUNK,{group:7,round:n.round}),e.grass)for(let g=0;g<20;g++){const m=h+be(r,-14,14)*a,M=be(r,6,13)*a;for(let E=0;E<M;E++)d.px(m,p-1-E,E>M*.6?f.LEAF2:f.LEAF,0,-.3,.9)}_={...s,...o}}else if(i==="log"){const x=(e.giant?46:e.branch?18:30)*a,g=(e.giant?14:e.branch?3:8)*a;if(d.limb([[h-x/2,p-g/2,g],[h+x/2,p-g/2-(e.branch?2*a:0),g*.9]],f.TRUNK,{group:5,round:n.round,cap:.3,capEnd:.3}),e.branch||d.shape([[h+x/2-g*.1,p-g],[h+x/2+g*.2,p-g/2],[h+x/2-g*.1,p],[h+x/2-g*.3,p-g/2]],f.BELLY,{group:6,round:n.round}),e.rot)for(let m=0;m<(e.giant?6:3);m++){const M=h+be(r,-x/2,x/3);d.shape([[M-3*a,p-g*.9],[M,p-g-3*a],[M+3*a,p-g*.9]],f.FLOWER,{group:7,line:!0,round:n.round})}e.branch&&d.limb([[h,p-g,g*.7],[h+5*a,p-g-6*a,g*.4]],f.TRUNK,{group:6,round:n.round}),_={...o,[f.FLOWER]:[230,190,120]}}else if(i==="fungi"){for(let x=0;x<5;x++){const g=h+be(r,-12,12)*a,m=be(r,3,7)*a,M=be(r,3,5)*a;d.limb([[g,p,1.6*a],[g,p-m,1.4*a]],f.BELLY,{group:5}),d.shape([[g-M,p-m],[g,p-m-M*.8],[g+M,p-m]],x%2?f.FLOWER:f.MAGIC,{group:6+x%2,line:!0,round:n.round})}_={[f.BELLY]:[225,215,195],[f.FLOWER]:[190,80,50],[f.MAGIC]:[120,230,200]}}else if(i==="cones"){for(let x=0;x<6;x++){const g=h+be(r,-14,14)*a,m=p-2*a;d.ellipse(g,m,(e.acorn?1.6:2)*a,(e.acorn?2:2.8)*a,f.TRUNK,{round:n.round}),e.acorn?d.ellipse(g,m-1.6*a,1.8*a,1*a,f.BARKD,{round:n.round}):d.px(g,m-1,f.BARKL)}_=o}else if(i==="water"){const x=22*a*(e.w||1),g=6*a;d.shape([[h-x,p-g],[h-x*.3,p-g*1.5],[h+x*.6,p-g*1.2],[h+x,p-g*.5],[h+x*.4,p],[h-x*.7,p-g*.2]],f.MAGIC,{group:5,round:.2});for(let m=0;m<6;m++){const M=h+be(r,-x*.6,x*.6),E=p-g*be(r,.4,1.1);for(let b=0;b<3*a;b++)d.recolour(M+b,E,f.MAGIC2)}_=e.bog?{[f.MAGIC]:[60,70,50],[f.MAGIC2]:[120,130,90]}:c;for(let m=0;m<d.m.length;m++)d.m[m]===f.MAGIC?d.m[m]=f.BODY:d.m[m]===f.MAGIC2&&(d.m[m]=f.BELLY);_={[f.BODY]:_[f.MAGIC],[f.BELLY]:_[f.MAGIC2]}}else if(i==="bramble"||i==="hedge"){const x=22*a,g=(i==="hedge"?18:12)*a;for(let m=0;m<(i==="hedge"?6:4);m++){const M=h+be(r,-x*.8,x*.8),E=p-g*be(r,.4,.7);d.ellipse(M,E,be(r,6,9)*a,g*.45,i==="hedge"?f.LEAF3:f.LEAF,{round:n.round,density:e.bare?.5:.95,noise:.5,seed:m})}for(let m=0;m<8;m++){let E=h+be(r,-x,x),b=p;for(let R=0;R<g*1.2;R++)E+=Math.sin(R*.3+m)*.8,b-=.8,d.px(E,b,f.TRUNK,0,-.3,.9)}if(i==="hedge"||e.berries||i==="bramble")for(let m=0;m<d.m.length;m++)d.m[m]&&d.m[m]!==f.TRUNK&&jt(m,5,9)<.05&&(d.m[m]=f.FLOWER);_={...s,...o,[f.FLOWER]:i==="hedge"?[210,30,40]:[70,30,70]}}else if(i==="wall"){const x=22*a,g=12*a;d.shape([[h-x,p],[h-x,p-g],[h+x,p-g],[h+x,p]],f.ACCENT,{group:5,line:!0,depth:2}),d.shape([[h-x-1,p-g],[h-x-1,p-g-2*a],[h+x+1,p-g-2*a],[h+x+1,p-g]],f.BELLY,{group:6,line:!0,depth:2}),d.shape([[h+x-6*a,p-g-2*a],[h+x-6*a,p-g-7*a],[h+x,p-g-7*a],[h+x,p-g-2*a]],f.ACCENT,{group:7,line:!0,depth:2}),d.ellipse(h+x-3*a,p-g-9*a,3*a,2.5*a,f.BELLY,{round:n.round});for(let m=p-g+3*a;m<p;m+=4*a)for(let M=h-x;M<h+x;M++)d.recolour(M,m,f.BODY2);_=Mi()}else if(i==="rockwall"){for(let x=0;x<5;x++)tr(d,[h+(x-2)*9*a,p-be(r,8,14)*a],8*a,10*a,n,r,e.moss);_={...Mi(),...s}}else if(i==="stalagmite"){for(let x=0;x<4;x++){const g=h+be(r,-14,14)*a,m=be(r,5,11)*a;d.shape([[g-3*a,p],[g-1*a,p-m],[g+1*a,p-m],[g+3*a,p]],f.ACCENT,{group:5,line:!0,round:n.round})}_=Mi()}else if(i==="web"){const x=[h,p-14*a],g=11*a;for(let m=0;m<8;m++){const M=m/8*Math.PI*2;for(let E=0;E<g;E++)d.px(x[0]+Math.cos(M)*E,x[1]+Math.sin(M)*E,f.WEB,0,0,1)}for(let m=3*a;m<g;m+=3*a)for(let M=0;M<Math.PI*2;M+=.05)d.px(x[0]+Math.cos(M)*m,x[1]+Math.sin(M)*m,f.WEB,0,0,1);_={[f.WEB]:[225,230,240]}}return{sp:d,colours:_}}function Dh(i,e,t,n,r,a){if(e.three)return Zu(i,t,n);if(i==="tree"||i==="log")return va(i,e,t,n,r,a);const s=Math.round(90*a),o=Math.round(70*a),c=new tn(s,o),l=s/2,u=o;let d={...Mi(),[f.LEAF]:ve(t.leaf,.55,.5),[f.LEAF2]:ve(t.leaf-.04,.5,.7),[f.TRUNK]:ve(n.trunkHue,.45,.34),[f.BARKD]:ve(n.trunkHue+.03,.5,.17),[f.MAGIC]:ve(n.magicHue,.6,1),[f.MAGIC2]:ve(n.magicHue,.2,1)};if(i==="shrine")c.shape([[l-16*a,u],[l-14*a,u-6*a],[l+14*a,u-6*a],[l+16*a,u]],f.ACCENT,{group:5,line:!0,depth:2}),c.shape([[l-9*a,u-6*a],[l-9*a,u-26*a],[l+9*a,u-26*a],[l+9*a,u-6*a]],f.ACCENT,{group:6,line:!0,depth:2}),c.shape([[l-5*a,u-10*a],[l-5*a,u-20*a],[l,u-23*a],[l+5*a,u-20*a],[l+5*a,u-10*a]],f.NOSE,{group:7}),c.shape([[l-13*a,u-26*a],[l,u-34*a],[l+13*a,u-26*a]],f.BODY2,{group:8,line:!0,depth:2}),c.ellipse(l,u-13*a,2.5*a,2.5*a,f.MAGIC2,{round:.5}),c.mark([[l-14*a,u-36*a],[l+2*a,u-36*a],[l-4*a,u-24*a],[l-14*a,u-24*a]],f.LEAF,[f.BODY2,f.ACCENT]);else if(i==="pavilion"){c.shape([[l-26*a,u],[l-26*a,u-4*a],[l+26*a,u-4*a],[l+26*a,u]],f.ACCENT,{group:5,line:!0,depth:2});for(const h of[-20,-7,7,20])c.limb([[l+h*a,u-4*a,4*a],[l+h*a,u-34*a,4*a]],h===-7||h===7?f.BODY2:f.BELLY,{group:6+(h>0?1:0),line:!0,cap:0,capEnd:0});c.shape([[l-28*a,u-34*a],[l-28*a,u-38*a],[l+28*a,u-38*a],[l+28*a,u-34*a]],f.ACCENT,{group:8,line:!0,depth:2}),c.shape([[l-24*a,u-38*a],[l-16*a,u-54*a],[l,u-60*a],[l+16*a,u-54*a],[l+24*a,u-38*a]],f.BELLY,{group:9,line:!0})}else if(i==="bridge"){const h=va("water",{w:1.8},t,n,r,a);for(let p=0;p<h.sp.m.length;p++){const _=p%h.sp.w,x=p/h.sp.w|0,g=Math.round(l-h.sp.w/2+_),m=u-h.sp.h+x;h.sp.m[p]&&c.inb(g,m)&&c.px(g,m,h.sp.m[p]===f.BODY?f.IRIS:f.PUPIL,0,-.42,.91)}c.limb([[l-34*a,u-6*a,9*a],[l+34*a,u-10*a,8*a]],f.TRUNK,{group:6,line:!0,cap:.3,capEnd:.3}),d[f.IRIS]=[60,110,150],d[f.PUPIL]=[150,200,220]}else if(i==="outcrop")for(const[h,p,_,x]of[[-18,14,16,13],[12,12,18,12],[-2,28,15,13],[16,34,9,9]])tr(c,[l+h*a,u-p*a],_*a,x*a,n,r,!0);else if(i==="cave"){for(const[h,p,_,x]of[[-26,16,16,15],[26,16,16,15],[0,40,30,18],[-12,30,14,12],[12,30,14,12]])tr(c,[l+h*a,u-p*a],_*a,x*a,n,r,p>30);c.shape([[l-15*a,u],[l-14*a,u-18*a],[l-4*a,u-28*a],[l+6*a,u-27*a],[l+14*a,u-16*a],[l+15*a,u]],f.NOSE,{group:9,line:!0})}else if(i==="dam"){const h=va("water",{w:1.9},t,n,r,a);for(let p=0;p<h.sp.m.length;p++){const _=p%h.sp.w,x=p/h.sp.w|0,g=Math.round(l-h.sp.w/2+_),m=u-h.sp.h+x-10*a;h.sp.m[p]&&c.inb(g,m)&&c.px(g,m,h.sp.m[p]===f.BODY?f.IRIS:f.PUPIL,0,-.42,.91)}for(let p=0;p<26;p++){const _=l+be(r,-32,32)*a,x=u-be(r,2,14)*a,g=be(r,-.5,.5),m=be(r,8,16)*a;c.limb([[_-Math.cos(g)*m/2,x-Math.sin(g)*m/2,2.6*a],[_+Math.cos(g)*m/2,x+Math.sin(g)*m/2,2*a]],p%3?f.TRUNK:f.BARKD,{group:6+p%2,line:!0})}d[f.IRIS]=[60,110,150],d[f.PUPIL]=[150,200,220]}else if(i==="waterfall"){for(const[h,p,_,x]of[[-22,30,18,30],[22,30,18,30],[0,56,20,12]])tr(c,[l+h*a,u-p*a],_*a,x*a,n,r,!0);for(let h=l-6*a;h<l+6*a;h++)for(let p=u-50*a;p<u-4*a;p++)c.px(h,p,jt(h|0,p/3|0,4)<.3?f.PUPIL:f.IRIS,0,-.2,.98);c.shape([[l-18*a,u],[l-14*a,u-6*a],[l+14*a,u-6*a],[l+18*a,u]],f.IRIS,{group:10,round:.2}),d[f.IRIS]=[90,150,190],d[f.PUPIL]=[210,235,245]}return{sp:c,colours:d}}function Ih(i,e,{K:t=2/(e.pixel||2),makeCanvas:n=sc}={}){const r=Rh[i];if(!r)throw new Error(`no area type "${i}"`);const a=Mo(i.split("").reduce((u,d)=>u*31+d.charCodeAt(0),7)>>>0),s=(u,d,h)=>({sp:rr(u.sp,u.colours,e,"none",n),kind:d,text:h}),o=Ph(r,e),c=u=>(u||[]).map(([d,h])=>s(va(d,h,r,e,a,t),d,"")),l={def:r,floor:{sp:rr(o.sp,o.colours,e,"none",n),kind:r.floor[0],text:r.text.floor},walls:c(r.wall),small:c(r.small),big:c(r.big),setPiece:null};if(l.walls.forEach(u=>u.text=r.text.wall),l.small.forEach(u=>u.text=r.text.small),l.big.forEach(u=>u.text=r.text.big),r.set){const u=Dh(r.set[0],r.set[1],r,e,a,t);l.setPiece={...s(u,r.set[0],r.text.set),metres:u.metres}}return l}function Nh(i,e){const t=new Map,n=new Map,r=(c,l,u)=>(c*2097152+(l+1048576))*2097152+(u+1048576),a=(c,l,u)=>{const d=r(c,l,u);let h=t.get(d);if(!h){const p=Math.pow(2,-c);h=[p*(l+yt(l*7+c,u,i)),p*(u+yt(l,u*13+c,i+1))],t.set(d,h)}return h},s=(c,l,u)=>{const d=Math.pow(2,-c),h=Math.floor(l/d),p=Math.floor(u/d);let _=h,x=p,g=1/0;for(let m=-2;m<=2;m++)for(let M=-2;M<=2;M++){const E=a(c,h+m,p+M),b=(E[0]-l)**2+(E[1]-u)**2;b<g&&(g=b,_=h+m,x=p+M)}return[_,x]},o=(c,l,u)=>{const d=r(c,l,u);let h=n.get(d);if(h)return h;if(c===0)h=[l,u];else{const p=a(c,l,u),_=s(c-1,p[0],p[1]);h=o(c-1,_[0],_[1])}return n.set(d,h),h};return{seed:i,depth:e,site:(c,l)=>a(0,c,l),partition(c,l){const u=s(e,c,l);return o(e,u[0],u[1])},centreness(c,l,u){const d=a(0,u[0],u[1]),h=Math.hypot(c-d[0],l-d[1]);let p=1/0;const _=Math.floor(c),x=Math.floor(l);for(let g=-2;g<=2;g++)for(let m=-2;m<=2;m++){const M=_+g,E=x+m;if(M===u[0]&&E===u[1])continue;const b=a(0,M,E);p=Math.min(p,Math.hypot(c-b[0],l-b[1]))}return Math.min(1,2*h/(h+p))},openness(c,l){let u=1/0,d=1/0;const h=Math.floor(c),p=Math.floor(l);for(let _=-2;_<=2;_++)for(let x=-2;x<=2;x++){const g=a(0,h+_,p+x),m=Math.hypot(c-g[0],l-g[1]);m<u?(d=u,u=m):m<d&&(d=m)}return Math.min(1,2*u/(u+d))}}}const Uh=Lu.types,Dn=Or.map(i=>({id:i.id,name:i.name,creature:i.creature,text:i.text,setPiece:i.set?i.text.set??"a set piece":"",hasWalls:!!i.wall?.length,floor:[i.floor[1],i.floor[2],i.floor[3]],treeDensity:Uh[i.id]?.treeDensity??1})),Qi=(i,e)=>i+","+e;function Fh(i){if(i==null||i.trim()==="")return null;const e=i.trim();if(/^\d{1,9}$/.test(e))return Number(e);let t=2166136261;for(let n=0;n<e.length;n++)t=Math.imul(t^e.charCodeAt(n),16777619);return(t>>>0)%1e9}function Oh(i,e,t,n){const r=new Map,a=(c,l)=>{if(c[0]===l[0]&&c[1]===l[1])return;const u=Qi(c[0],c[1]),d=Qi(l[0],l[1]);r.has(u)||r.set(u,new Set),r.has(d)||r.set(d,new Set),r.get(u).add(d),r.get(d).add(u)},s=(t-e)*n;let o=[];for(let c=0;c<=s;c++){const l=[];for(let u=0;u<=s;u++){const d=i.partition(e+u/n,e+c/n);l.push(d),u>0&&a(d,l[u-1]),c>0&&a(d,o[u])}o=l}return r}function Bh(i,e){const t=e.mapAreas,n=2,r=e.areaSize*e.areaScale,a=Dn.length,s=3,o=Math.max(0,Math.min(1,e.areaSizeVariance))*s*.3,c=(F,D)=>{const B=F/r,W=D/r;return[B+o*(jo(B/s,W/s,i+91)-.5)*2,W+o*(jo(B/s,W/s,i+92)-.5)*2]},l=(F,D)=>{let B=F*r,W=D*r;for(let $=0;$<30;$++){const[ae,q]=c(B,W);B+=(F-ae)*r,W+=(D-q)*r}return[B,W]},u=Nh(i,e.borderLayers),d=-n,h=t+n,p=Oh(u,d,h,6),_=new Map,x=Cr(i*5+1);for(let F=d;F<h;F++)for(let D=d;D<h;D++){const B=new Set;for(let ae=-2;ae<=2;ae++)for(let q=-2;q<=2;q++){const ee=_.get(Qi(D+q,F+ae));ee!==void 0&&B.add(ee)}for(const ae of p.get(Qi(D,F))??[]){const q=_.get(ae);q!==void 0&&B.add(q)}const W=[...Array(a).keys()].filter(ae=>!B.has(ae)),$=W.length?W:[...Array(a).keys()];_.set(Qi(D,F),$[Math.floor(x()*$.length)])}const g=(F,D)=>_.get(Qi(F,D))??Math.floor(yt(F,D,i+17)*a),m=Math.floor(t/2),M=(F,D)=>{const B=u.site(F,D),W=u.partition(B[0],B[1]);return W[0]===F&&W[1]===D};let E=[m,m];for(const[F,D]of[[0,0],[1,0],[0,1],[-1,0],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]])if(M(m+F,m+D)){E=[m+F,m+D];break}const b=(F,D)=>{const B=u.site(F,D),W=l(B[0],B[1]);return{x:W[0],z:W[1]}},R=b(E[0],E[1]),w=(F,D)=>{const[B,W]=c(F,D),$=u.partition(B,W);return{cell:$,type:g($[0],$[1]),openness:u.openness(B,W)}},P=4.5,S=P*2.2,T=(F,D)=>{if(Math.hypot(F-R.x,D-R.z)<S)return 0;const[B,W]=c(F,D);return cr((u.openness(B,W)-e.clearingSize)/Math.max(.01,e.clearingFalloff))*e.treeDensity},I=(F,D)=>{const B=Dn[g(F,D)];return B.setPiece&&yt(F,D,i+61)<e.setPieceChance?B.setPiece:null},C=(F,D)=>Math.min(1,Math.hypot(F-E[0],D-E[1])/(t/2)),O=r*.5;return{seed:i,tuning:e,n:t,margin:n,areaSize:r,partition:u,centreCell:E,dancefloor:{x:R.x,z:R.z,radius:P},start:{x:R.x,z:R.z+2},bounds:{minX:O,maxX:t*r-O,minZ:O,maxZ:t*r-O},extent:{minX:d*r,maxX:h*r,minZ:d*r,maxZ:h*r},typeOf:g,areaAt:w,siteOf:b,treeWeight:T,neighbours:p,setPieceOf:I,remoteness:C}}function zh(i,e,t=.5){const n=i.tuning,r=wi(e,0,1),a=Math.round(An(n.creaturesNear,n.creaturesFar,Math.pow(r,n.creatureCurve))+(t-.5)*2),s=Math.min(Math.max(0,a),Math.round(n.legendsFar*cr((r-n.legendsFrom)/Math.max(.01,1-n.legendsFrom))+(t-.5)*.8)),o=Math.round(Math.max(0,a-s)*n.youngShareFar*r);return{babies:Math.max(0,a-s-o),young:o,legends:s}}const kh=(i,e,t=0)=>(i.tuning.clearingSize+i.tuning.clearingFalloff*.3)*i.areaSize*.5*(e===2?.55:.8)*(1+t);function Gh(i){const e=[],t=i.tuning;let n=0;const[r,a]=i.centreCell;for(let s=0;s<i.n;s++)for(let o=0;o<i.n;o++){if(o===r&&s===a)continue;const c=Cr(i.seed*7919+o*131+s*977+3),l=Dn[i.typeOf(o,s)],u=i.siteOf(o,s),d=i.remoteness(o,s),h=zh(i,d,yt(o,s,i.seed+43)),p=x=>{const g=kh(i,x,d),m=c()*Math.PI*2,M=Math.sqrt(c())*g,E=u.x+Math.cos(m)*M,b=u.z+Math.sin(m)*M;return{id:n++,species:l.creature,cell:[o,s],level:x,homeX:u.x,homeZ:u.z,range:g,x:E,z:b,tx:E,tz:b,rest:c()*3,speed:(x===2?t.legendSpeed:t.creatureSpeed)*(.7+c()*.6),facing:c()<.5?1:-1,moving:!1,walk:c(),rand:Cr(i.seed*31+n*7+11)}};for(let x=0;x<h.babies;x++)e.push(p(0));for(let x=0;x<h.young;x++)e.push(p(1));const _=o===r+1&&s===a?Math.max(1,h.legends):h.legends;for(let x=0;x<_;x++)e.push(p(2))}return e}function Hh(i,e){if(i.rest>0){i.rest-=e,i.moving=!1;return}const t=i.tx-i.x,n=i.tz-i.z,r=Math.hypot(t,n);if(r<.05){const s=i.rand()*Math.PI*2,o=Math.sqrt(i.rand())*i.range;i.tx=i.homeX+Math.cos(s)*o,i.tz=i.homeZ+Math.sin(s)*o,i.rest=.8+i.rand()*3.5,i.moving=!1;return}const a=Math.min(r,i.speed*e);i.x+=t/r*a,i.z+=n/r*a,Math.abs(t)>.02&&(i.facing=t>0?1:-1),i.moving=!0,i.walk+=e*(i.level===2?1.5:4)}function Vh(i,e,t,n,r){for(const a of i)Math.abs(a.homeX-e)<n&&Math.abs(a.homeZ-t)<n&&Hh(a,r)}const Ec=6,Wh=4,Yt=32;function Xh(i){const e=i.tuning.camera.treetop.angleIn*Math.PI/180;return i.tuning.crownHeight/Math.sin(e)}function Yh(i,e,t){const{treeSpacingX:n,treeSpacingZ:r}=i.tuning,a=i.seed,s=[],o=Xh(i),c=i.tuning.crownHalfWidth,l=Math.ceil(t*Yt/r),u=Math.ceil((t+1)*Yt/r);for(let d=l;d<u;d++){const h=d&1?.5:0,p=Math.ceil(e*Yt/n-h),_=Math.ceil((e+1)*Yt/n-h);for(let x=p;x<_;x++){const g=(x+h+(yt(x,d,a+101)-.5)*.7)*n,m=(d+(yt(x,d,a+102)-.5)*.7)*r,M=i.areaAt(g,m);yt(x,d,a+103)>=i.treeWeight(g,m)*Dn[M.type].treeDensity||i.treeWeight(g,m-o)===0||i.treeWeight(g-c,m-o)===0||i.treeWeight(g+c,m-o)===0||s.push({x:g,z:m,type:M.type,variant:Math.floor(yt(x,d,a+104)*Ec),flip:yt(x,d,a+105)<.5})}}return s}function Kh(i,e,t){const n=i.tuning.bushSpacing,r=i.seed,a=[],s=Math.ceil(t*Yt/n),o=Math.ceil((t+1)*Yt/n),c=Math.ceil(e*Yt/n),l=Math.ceil((e+1)*Yt/n);for(let u=s;u<o;u++)for(let d=c;d<l;d++){const h=(d+(yt(d,u,r+201)-.5)*.9)*n,p=(u+(yt(d,u,r+202)-.5)*.9)*n;yt(d,u,r+203)>(.12+Math.min(1,i.treeWeight(h,p))*.3)*i.tuning.bushDensity||a.push({x:h,z:p,type:i.areaAt(h,p).type,variant:Math.floor(yt(d,u,r+204)*Wh),flip:yt(d,u,r+205)<.5})}return a}function qh(i,e,t){const n=i.tuning.wallSpacing,r=i.seed,a=[],s=Math.ceil(t*Yt/n),o=Math.ceil((t+1)*Yt/n),c=Math.ceil(e*Yt/n),l=Math.ceil((e+1)*Yt/n);for(let u=s;u<o;u++)for(let d=c;d<l;d++){if(yt(d,u,r+303)>i.tuning.wallDensity)continue;const h=(d+(yt(d,u,r+301)-.5)*.6)*n,p=(u+(yt(d,u,r+302)-.5)*.6)*n,_=i.areaAt(h,p);_.openness<.82||!Dn[_.type].hasWalls||a.push({x:h,z:p,type:_.type,variant:Math.floor(yt(d,u,r+304)*4),flip:yt(d,u,r+305)<.5})}return a}class Zh{constructor(e){this.map=e}map;trees=new Map;bushes=new Map;walls=new Map;chunks(e,t,n){const r=[];for(let a=Math.floor((t-n)/Yt);a<=Math.floor((t+n)/Yt);a++)for(let s=Math.floor((e-n)/Yt);s<=Math.floor((e+n)/Yt);s++)r.push([s,a]);return r}gather(e,t,n,r,a){e.size>600&&e.clear();const s=[];for(const[o,c]of this.chunks(n,r,a)){const l=o+","+c;let u=e.get(l);u||(u=t(o,c),e.set(l,u));for(const d of u)Math.abs(d.x-n)<=a&&Math.abs(d.z-r)<=a&&s.push(d)}return s}treesNear(e,t,n){return this.gather(this.trees,(r,a)=>Yh(this.map,r,a),e,t,n)}bushesNear(e,t,n){return this.gather(this.bushes,(r,a)=>Kh(this.map,r,a),e,t,n)}wallsNear(e,t,n){return this.gather(this.walls,(r,a)=>qh(this.map,r,a),e,t,n)}setPiecesNear(e,t,n){const r=this.map,a=r.areaSize,s=[];for(let o=Math.floor((t-n)/a)-1;o<=Math.floor((t+n)/a)+1;o++)for(let c=Math.floor((e-n)/a)-1;c<=Math.floor((e+n)/a)+1;c++){if(c===r.centreCell[0]&&o===r.centreCell[1]||!r.setPieceOf(c,o))continue;const l=r.siteOf(c,o);Math.abs(l.x-e)<=n&&Math.abs(l.z-4-t)<=n&&s.push({x:l.x,z:l.z-4,type:r.typeOf(c,o),variant:0,flip:yt(c,o,r.seed+71)<.5})}return s}}function $h(i,e){return{x:i,z:e,vx:0,vz:0,lift:0,mode:"ground",facing:1}}const Ro=(i,e)=>An(e.groundHeight,e.treetopHeight,cr(i.lift)),qa=i=>cr(i.lift);function Jh(i,e,t,n,r){let{mode:a,lift:s}=i;e.toggleMode&&(a=a==="ground"||a==="descending"?"rising":"descending"),a==="rising"?(s+=t/Math.max(.001,n.riseTime),s>=1&&(s=1,a="treetop")):a==="descending"&&(s-=t/Math.max(.001,n.descendTime),s<=0&&(s=0,a="ground"));let o=e.moveX,c=e.moveZ;const l=Math.hypot(o,c);l>1&&(o/=l,c/=l);const u=An(n.groundSpeed,n.treetopSpeed,cr(s)),d=1-Math.exp(-n.acceleration*t);let h=i.vx+(o*u-i.vx)*d,p=i.vz+(c*u-i.vz)*d,_=i.x+h*t,x=i.z+p*t;(_<r.minX||_>r.maxX)&&(_=wi(_,r.minX,r.maxX),h=0),(x<r.minZ||x>r.maxZ)&&(x=wi(x,r.minZ,r.maxZ),p=0);const g=h>.3?1:h<-.3?-1:i.facing;return{x:_,z:x,vx:h,vz:p,lift:s,mode:a,facing:g}}function Qh(i,e){const t=Bh(i,e),n=$h(t.start.x,t.start.z);return{seed:i,tuning:e,map:t,forest:new Zh(t),creatures:Gh(t),clock:Tu(),witch:n,camera:Eu(e,n.x,Ro(n,e),n.z)}}function jh(i,e,t){const n=Ru(i.clock,t);n!==0&&(i.witch=Jh(i.witch,e,n,i.tuning,i.map.bounds),i.camera=yu(i.camera,e.zoom,{x:i.witch.x,y:Ro(i.witch,i.tuning),z:i.witch.z},{x:i.witch.vx,z:i.witch.vz},i.witch.lift,n,i.tuning),Vh(i.creatures,i.witch.x,i.witch.z,i.tuning.creatureSimRadius,n))}const ed=i=>wu(i.camera,i.camera.lift,i.tuning);function yc(i){const e=i.map.areaAt(i.witch.x,i.witch.z),t=i.map.setPieceOf(e.cell[0],e.cell[1]);return Dn[e.type].name+(t?` (set piece: ${t})`:"")}const td="Witch tuning. Edit the numbers, push, and the playable link rebuilds. Distances are metres, times seconds, angles degrees. Keys starting with _ are notes.",nd="The forest: mapAreas x mapAreas areas cut by the fractal partition. An area is areaSize x areaScale metres across on average (areaScale 1.4 doubles the ground of the first 28 m areas; push it for bigger). areaSizeVariance (0-1) makes areas vary in size, some small, some large. borderLayers sets how wiggly borders are.",id=20,rd=28,ad=1.4,sd=.7,od=4,ld="treeDensity (0-1): the chance of a tree on each spot outside the clearings; clearingSize (0-1): how far out from an area's centre the ground stays fully open; clearingFalloff (0-1): over how much of the way to the border trees thicken, smoothly, to full density; trees sit on a staggered grid treeSpacingX by treeSpacingZ metres, so no two crowns pile up. A tree is left out where its crown (crownHalfWidth either side, crownHeight up) would hang over a clearing seen from the treetops.",cd=.9,ud=.1,hd=.5,dd=1,fd=5,pd=3,md=4.5,gd=5,_d=3.4,xd=4,vd=.6,Md="Speeds per mode, and how long rising and descending take.",Sd=14,bd=32,Ed=10,yd=.7,wd=.55,Ad=1.4,Td=11,Rd="Near-isometric on the ground, after Transistor; lower over the treetops, looking toward the horizon to feel the speed. The camera follows the witch on a soft spring (follow: its stiffness; higher keeps her closer to the middle) and looks a little ahead of her: lookAhead seconds of flight, at most lookAheadMax metres, eased in at lookAheadEase. zoomEase and liftEase: how softly zoom and rising change the angle and distance. a narrow field of view (fov, degrees) seen from far off, so there is little perspective. Each mode has its own angle (degrees below horizontal) and distance from the witch, at zoomed-in and zoomed-out. Zoom moves between them in zoomSteps steps.",Cd={fov:20,ground:{angleIn:38,angleOut:46,distanceIn:42,distanceOut:84},treetop:{angleIn:32,angleOut:36,distanceIn:70,distanceOut:120},lookAhead:.1,lookAheadMax:3,lookAheadEase:1.5,zoomEase:5,liftEase:8,zoomSteps:4,startZoom:1,follow:8},Ld="Everything the camera can see is drawn, plus viewMargin metres round the view, so nothing appears or vanishes on screen. haze: the twilight haze fades the forest from near to far metres from the witch; nothing is drawn beyond far. pixelSize: screen pixels per art pixel. glowReach: metres the witch's light reaches. spriteTilt: 1 = sprites face the camera fully, 0 = stand upright.",Pd=3,Dd=8,Id=1,Nd=1,Ud=16,Fd=12,Od={near:90,far:220},Bd="bloom: a gentle glow round bright things (strength 0 or on false turns it off; threshold: how bright a pixel must be to glow). tiltShift: blurs the top and bottom of the screen so the forest looks like a miniature. strength: the blur at the screen's edges, in pixels; band: the height of the sharp band (0-1 of the screen); centre: where it sits (0 top, 0.5 middle, 1 bottom); where: 'before' blurs at the low resolution, before the pixels are scaled up, 'after' blurs the scaled-up image. Add ?tilt=before, ?tilt=after or ?tilt=off to the link to compare.",zd="shadows: a flat shadow under every tree (cast away from the moon), bush and creature. canopyShadow: a dappled shadow from the canopy overhead (height in metres), thinner in clearings, drifting with the wind. mist: a low drifting mist (height in metres above the ground). Each has on and strength.",kd={on:!0,strength:.7},Gd={on:!0,strength:.45,height:8,cover:.55,wind:.6},Hd={on:!0,strength:.12,height:3,wind:.8},Vd={on:!0,strength:.7,threshold:.55},Wd={on:!0,where:"before",strength:3,band:.4,centre:.55},Xd="Creatures grow more numerous and older with an area's distance from home (0 at the dancefloor, 1 at the map's edge): creaturesNear in the areas round home, creaturesFar at the edge (creatureCurve shapes the rise), youngShareFar of them young at the edge, and legendsFar legends from legendsFrom outward. Only creatures within creatureSimRadius metres of the witch move.",Yd=2,Kd=20,qd=1.3,Zd=.5,$d=2,Jd=.55,Qd=110,jd=.6,ef="setPieceChance: the share of areas, among the types that have a set piece, that show theirs. Wall objects (an area type's edges: puddles, henges, hedges) stand where areas meet, one per wallSpacing metres with chance wallDensity; they do not block movement.",tf=.25,nf=.35,rf={_readme:td,_map:nd,mapAreas:id,areaSize:rd,areaScale:ad,areaSizeVariance:sd,borderLayers:od,_trees:ld,treeDensity:cd,clearingSize:ud,clearingFalloff:hd,bushDensity:dd,treeSpacingX:fd,treeSpacingZ:pd,crownHalfWidth:md,crownHeight:gd,bushSpacing:_d,wallSpacing:xd,wallDensity:vd,_witch:Md,groundSpeed:Sd,treetopSpeed:bd,acceleration:Ed,riseTime:yd,descendTime:wd,groundHeight:Ad,treetopHeight:Td,_camera:Rd,camera:Cd,_look:Ld,pixelSize:Pd,glowReach:Dd,glowHeight:Id,spriteTilt:Nd,artPixelsPerMetre:Ud,viewMargin:Fd,haze:Od,_post:Bd,_shadows:zd,shadows:kd,canopyShadow:Gd,mist:Hd,bloom:Vd,tiltShift:Wd,_creatures:Xd,creaturesNear:Yd,creaturesFar:Kd,creatureCurve:qd,youngShareFar:Zd,legendsFar:$d,legendsFrom:Jd,creatureSimRadius:Qd,creatureSpeed:jd,_setPieces:ef,setPieceChance:tf,legendSpeed:nf},Ui=rf;class af{keys=new Set;pressed=new Set;padPrev=[];touch={x:0,y:0,toggle:!1,zoom:0,debug:!1};onAny=null;constructor(e=window){e.addEventListener("keydown",t=>{if(t.repeat){this.isGameKey(t.code)&&t.preventDefault();return}this.keys.add(t.code),this.isGameKey(t.code)&&t.preventDefault(),this.onAny?.()||this.pressed.add(t.code)}),e.addEventListener("keyup",t=>this.keys.delete(t.code)),e.addEventListener("blur",()=>this.keys.clear())}isGameKey(e){return/^(Arrow|Space$|Key[WASDQE]$|Minus$|Equal$|NumpadAdd$|NumpadSubtract$|Backquote$)/.test(e)}clearPresses(){this.pressed.clear();const e=this.touch;e.toggle=!1,e.zoom=0,e.debug=!1}read(){const e=d=>this.keys.has(d)?1:0,t=d=>this.pressed.has(d);let n=e("KeyD")+e("ArrowRight")-e("KeyA")-e("ArrowLeft"),r=e("KeyS")+e("ArrowDown")-e("KeyW")-e("ArrowUp"),a=t("Space"),s=(t("KeyQ")||t("Minus")||t("NumpadSubtract")?1:0)-(t("KeyE")||t("Equal")||t("NumpadAdd")?1:0),o=t("Backquote");this.pressed.clear();const c=typeof navigator<"u"&&navigator.getGamepads?navigator.getGamepads():[];for(const d of c){if(!d)continue;const h=b=>!!d.buttons[b]?.pressed,_=d.buttons.some((b,R)=>b.pressed&&!this.padPrev[R])&&!!this.onAny?.(),x=b=>!_&&h(b)&&!this.padPrev[b];let g=d.axes[0]??0,m=d.axes[1]??0;const M=Math.hypot(g,m),E=.18;if(M<E)g=0,m=0;else{const b=(Math.min(1,M)-E)/(1-E)/M;g*=b,m*=b}g+=(h(15)?1:0)-(h(14)?1:0),m+=(h(13)?1:0)-(h(12)?1:0),n+=g,r+=m,x(0)&&(a=!0),(x(4)||x(6))&&(s+=1),(x(5)||x(7))&&(s-=1),x(8)&&(o=!0),this.padPrev=d.buttons.map(b=>b.pressed);break}const l=this.touch;n+=l.x,r+=l.y,l.toggle&&(a=!0),s+=l.zoom,l.debug&&(o=!0),l.toggle=!1,l.zoom=0,l.debug=!1;const u=Math.hypot(n,r);return u>1&&(n/=u,r/=u),{moveX:n,moveZ:r,toggleMode:a,zoom:Math.sign(s),debug:o}}}const Co="186",sf=0,ll=1,of=2,Ma=1,lf=2,yr=3,Ri=0,en=1,Wn=2,qn=0,Rr=1,cl=2,ul=3,hl=4,cf=5,$i=100,uf=101,hf=102,df=103,ff=104,pf=200,mf=201,gf=202,_f=203,wc=204,Ac=205,xf=206,vf=207,Mf=208,Sf=209,bf=210,Ef=211,yf=212,wf=213,Af=214,Cs=0,Ls=1,Ps=2,Lr=3,Ds=4,Is=5,Ns=6,Us=7,Tc=0,Tf=1,Rf=2,Ln=0,Rc=1,Cc=2,Lc=3,Pc=4,Dc=5,Ic=6,Nc=7,Uc=300,Ci=301,or=302,Za=303,$a=304,Oa=306,Fs=1e3,Xn=1001,Os=1002,Ut=1003,Cf=1004,Yr=1005,Pt=1006,Ja=1007,bi=1008,an=1009,Fc=1010,Oc=1011,Pr=1012,Lo=1013,In=1014,Rn=1015,Nn=1016,Po=1017,Do=1018,Dr=1020,Bc=35902,zc=35899,kc=1021,Gc=1022,dn=1023,Qn=1026,Ei=1027,Hc=1028,Io=1029,Li=1030,No=1031,Uo=1033,Sa=33776,ba=33777,Ea=33778,ya=33779,Bs=35840,zs=35841,ks=35842,Gs=35843,Hs=36196,Vs=37492,Ws=37496,Xs=37488,Ys=37489,Ta=37490,Ks=37491,qs=37808,Zs=37809,$s=37810,Js=37811,Qs=37812,js=37813,eo=37814,to=37815,no=37816,io=37817,ro=37818,ao=37819,so=37820,oo=37821,lo=36492,co=36494,uo=36495,ho=36283,fo=36284,Ra=36285,po=36286,Lf=3200,dl=0,Pf=1,vn="",cn="srgb",Ir="srgb-linear",Ca="linear",ft="srgb",Qa=7680,Df=519,If=512,Nf=513,Uf=514,Fo=515,Ff=516,Of=517,Oo=518,Bf=519,zf=35044,Vc=35048,fl="300 es",Cn=2e3,La=2001;function kf(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Pa(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Gf(){const i=Pa("canvas");return i.style.display="block",i}const pl={};function ml(...i){const e="THREE."+i.shift();console.log(e,...i)}function Wc(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ge(...i){i=Wc(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function rt(...i){i=Wc(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function nr(...i){const e=i.join(" ");e in pl||(pl[e]=!0,Ge(...i))}function Hf(i,e,t){return new Promise(function(n,r){function a(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(a,t);break;default:n()}}setTimeout(a,t)})}const Vf={[Cs]:Ls,[Ps]:Ns,[Ds]:Us,[Lr]:Is,[Ls]:Cs,[Ns]:Ps,[Us]:Ds,[Is]:Lr};class Di{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const r=n[e];if(r!==void 0){const a=r.indexOf(t);a!==-1&&r.splice(a,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let a=0,s=r.length;a<s;a++)r[a].call(this,e);e.target=null}}}const Wt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ja=Math.PI/180,mo=180/Math.PI;function Br(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Wt[i&255]+Wt[i>>8&255]+Wt[i>>16&255]+Wt[i>>24&255]+"-"+Wt[e&255]+Wt[e>>8&255]+"-"+Wt[e>>16&15|64]+Wt[e>>24&255]+"-"+Wt[t&63|128]+Wt[t>>8&255]+"-"+Wt[t>>16&255]+Wt[t>>24&255]+Wt[n&255]+Wt[n>>8&255]+Wt[n>>16&255]+Wt[n>>24&255]).toLowerCase()}function tt(i,e,t){return Math.max(e,Math.min(t,i))}function Wf(i,e){return(i%e+e)%e}function es(i,e,t){return(1-t)*i+t*e}function gr(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Qt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class Ve{static{Ve.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=tt(this.x,e.x,t.x),this.y=tt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=tt(this.x,e,t),this.y=tt(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(tt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(tt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),a=this.x-e.x,s=this.y-e.y;return this.x=a*n-s*r+e.x,this.y=a*r+s*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ur{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,a,s,o){let c=n[r+0],l=n[r+1],u=n[r+2],d=n[r+3],h=a[s+0],p=a[s+1],_=a[s+2],x=a[s+3];if(d!==x||c!==h||l!==p||u!==_){let g=c*h+l*p+u*_+d*x;g<0&&(h=-h,p=-p,_=-_,x=-x,g=-g);let m=1-o;if(g<.9995){const M=Math.acos(g),E=Math.sin(M);m=Math.sin(m*M)/E,o=Math.sin(o*M)/E,c=c*m+h*o,l=l*m+p*o,u=u*m+_*o,d=d*m+x*o}else{c=c*m+h*o,l=l*m+p*o,u=u*m+_*o,d=d*m+x*o;const M=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=M,l*=M,u*=M,d*=M}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,r,a,s){const o=n[r],c=n[r+1],l=n[r+2],u=n[r+3],d=a[s],h=a[s+1],p=a[s+2],_=a[s+3];return e[t]=o*_+u*d+c*p-l*h,e[t+1]=c*_+u*h+l*d-o*p,e[t+2]=l*_+u*p+o*h-c*d,e[t+3]=u*_-o*d-c*h-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,a=e._z,s=e._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(r/2),d=o(a/2),h=c(n/2),p=c(r/2),_=c(a/2);switch(s){case"XYZ":this._x=h*u*d+l*p*_,this._y=l*p*d-h*u*_,this._z=l*u*_+h*p*d,this._w=l*u*d-h*p*_;break;case"YXZ":this._x=h*u*d+l*p*_,this._y=l*p*d-h*u*_,this._z=l*u*_-h*p*d,this._w=l*u*d+h*p*_;break;case"ZXY":this._x=h*u*d-l*p*_,this._y=l*p*d+h*u*_,this._z=l*u*_+h*p*d,this._w=l*u*d-h*p*_;break;case"ZYX":this._x=h*u*d-l*p*_,this._y=l*p*d+h*u*_,this._z=l*u*_-h*p*d,this._w=l*u*d+h*p*_;break;case"YZX":this._x=h*u*d+l*p*_,this._y=l*p*d+h*u*_,this._z=l*u*_-h*p*d,this._w=l*u*d-h*p*_;break;case"XZY":this._x=h*u*d-l*p*_,this._y=l*p*d-h*u*_,this._z=l*u*_+h*p*d,this._w=l*u*d+h*p*_;break;default:Ge("Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],a=t[8],s=t[1],o=t[5],c=t[9],l=t[2],u=t[6],d=t[10],h=n+o+d;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-c)*p,this._y=(a-l)*p,this._z=(s-r)*p}else if(n>o&&n>d){const p=2*Math.sqrt(1+n-o-d);this._w=(u-c)/p,this._x=.25*p,this._y=(r+s)/p,this._z=(a+l)/p}else if(o>d){const p=2*Math.sqrt(1+o-n-d);this._w=(a-l)/p,this._x=(r+s)/p,this._y=.25*p,this._z=(c+u)/p}else{const p=2*Math.sqrt(1+d-n-o);this._w=(s-r)/p,this._x=(a+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(tt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,a=e._z,s=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+s*o+r*l-a*c,this._y=r*u+s*c+a*o-n*l,this._z=a*u+s*l+n*c-r*o,this._w=s*u-n*o-r*c-a*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,a=e._z,s=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,a=-a,s=-s,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+n*t,this._y=this._y*c+r*t,this._z=this._z*c+a*t,this._w=this._w*c+s*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+r*t,this._z=this._z*c+a*t,this._w=this._w*c+s*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),a=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class X{static{X.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(gl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(gl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[3]*n+a[6]*r,this.y=a[1]*t+a[4]*n+a[7]*r,this.z=a[2]*t+a[5]*n+a[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,a=e.elements,s=1/(a[3]*t+a[7]*n+a[11]*r+a[15]);return this.x=(a[0]*t+a[4]*n+a[8]*r+a[12])*s,this.y=(a[1]*t+a[5]*n+a[9]*r+a[13])*s,this.z=(a[2]*t+a[6]*n+a[10]*r+a[14])*s,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,a=e.x,s=e.y,o=e.z,c=e.w,l=2*(s*r-o*n),u=2*(o*t-a*r),d=2*(a*n-s*t);return this.x=t+c*l+s*d-o*u,this.y=n+c*u+o*l-a*d,this.z=r+c*d+a*u-s*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r,this.y=a[1]*t+a[5]*n+a[9]*r,this.z=a[2]*t+a[6]*n+a[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=tt(this.x,e.x,t.x),this.y=tt(this.y,e.y,t.y),this.z=tt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=tt(this.x,e,t),this.y=tt(this.y,e,t),this.z=tt(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(tt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,a=e.z,s=t.x,o=t.y,c=t.z;return this.x=r*c-a*o,this.y=a*s-n*c,this.z=n*o-r*s,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ts.copy(this).projectOnVector(e),this.sub(ts)}reflect(e){return this.sub(ts.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(tt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ts=new X,gl=new ur;class He{static{He.prototype.isMatrix3=!0}constructor(e,t,n,r,a,s,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,a,s,o,c,l)}set(e,t,n,r,a,s,o,c,l){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=a,u[5]=c,u[6]=n,u[7]=s,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,a=this.elements,s=n[0],o=n[3],c=n[6],l=n[1],u=n[4],d=n[7],h=n[2],p=n[5],_=n[8],x=r[0],g=r[3],m=r[6],M=r[1],E=r[4],b=r[7],R=r[2],w=r[5],P=r[8];return a[0]=s*x+o*M+c*R,a[3]=s*g+o*E+c*w,a[6]=s*m+o*b+c*P,a[1]=l*x+u*M+d*R,a[4]=l*g+u*E+d*w,a[7]=l*m+u*b+d*P,a[2]=h*x+p*M+_*R,a[5]=h*g+p*E+_*w,a[8]=h*m+p*b+_*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],a=e[3],s=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*s*u-t*o*l-n*a*u+n*o*c+r*a*l-r*s*c}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],a=e[3],s=e[4],o=e[5],c=e[6],l=e[7],u=e[8],d=u*s-o*l,h=o*c-u*a,p=l*a-s*c,_=t*d+n*h+r*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/_;return e[0]=d*x,e[1]=(r*l-u*n)*x,e[2]=(o*n-r*s)*x,e[3]=h*x,e[4]=(u*t-r*c)*x,e[5]=(r*a-o*t)*x,e[6]=p*x,e[7]=(n*c-l*t)*x,e[8]=(s*t-n*a)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,a,s,o){const c=Math.cos(a),l=Math.sin(a);return this.set(n*c,n*l,-n*(c*s+l*o)+s+e,-r*l,r*c,-r*(-l*s+c*o)+o+t,0,0,1),this}scale(e,t){return nr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(ns.makeScale(e,t)),this}rotate(e){return nr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(ns.makeRotation(-e)),this}translate(e,t){return nr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(ns.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ns=new He,_l=new He().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),xl=new He().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Xf(){const i={enabled:!0,workingColorSpace:Ir,spaces:{},convert:function(r,a,s){return this.enabled===!1||a===s||!a||!s||(this.spaces[a].transfer===ft&&(r.r=Zn(r.r),r.g=Zn(r.g),r.b=Zn(r.b)),this.spaces[a].primaries!==this.spaces[s].primaries&&(r.applyMatrix3(this.spaces[a].toXYZ),r.applyMatrix3(this.spaces[s].fromXYZ)),this.spaces[s].transfer===ft&&(r.r=ir(r.r),r.g=ir(r.g),r.b=ir(r.b))),r},workingToColorSpace:function(r,a){return this.convert(r,this.workingColorSpace,a)},colorSpaceToWorking:function(r,a){return this.convert(r,a,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===vn?Ca:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,a=this.workingColorSpace){return r.fromArray(this.spaces[a].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,a,s){return r.copy(this.spaces[a].toXYZ).multiply(this.spaces[s].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,a){return nr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,a)},toWorkingColorSpace:function(r,a){return nr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,a)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ir]:{primaries:e,whitePoint:n,transfer:Ca,toXYZ:_l,fromXYZ:xl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:cn},outputColorSpaceConfig:{drawingBufferColorSpace:cn}},[cn]:{primaries:e,whitePoint:n,transfer:ft,toXYZ:_l,fromXYZ:xl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:cn}}}),i}const et=Xf();function Zn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ir(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Fi;class Yf{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Fi===void 0&&(Fi=Pa("canvas")),Fi.width=e.width,Fi.height=e.height;const r=Fi.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=Fi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Pa("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),a=r.data;for(let s=0;s<a.length;s++)a[s]=Zn(a[s]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Zn(t[n]/255)*255):t[n]=Zn(t[n]);return{data:t,width:e.width,height:e.height}}else return Ge("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Kf=0;class Bo{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Kf++}),this.uuid=Br(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let a;if(Array.isArray(r)){a=[];for(let s=0,o=r.length;s<o;s++)r[s].isDataTexture?a.push(is(r[s].image)):a.push(is(r[s]))}else a=is(r);n.url=a}return t||(e.images[this.uuid]=n),n}}function is(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Yf.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ge("Texture: Unable to serialize Texture."),{})}let qf=0;const rs=new X;class $t extends Di{constructor(e=$t.DEFAULT_IMAGE,t=$t.DEFAULT_MAPPING,n=Xn,r=Xn,a=Pt,s=bi,o=dn,c=an,l=$t.DEFAULT_ANISOTROPY,u=vn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:qf++}),this.uuid=Br(),this.name="",this.source=new Bo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=a,this.minFilter=s,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Ve(0,0),this.repeat=new Ve(1,1),this.center=new Ve(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new He,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(rs).x}get height(){return this.source.getSize(rs).y}get depth(){return this.source.getSize(rs).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Ge(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ge(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Uc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Fs:e.x=e.x-Math.floor(e.x);break;case Xn:e.x=e.x<0?0:1;break;case Os:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Fs:e.y=e.y-Math.floor(e.y);break;case Xn:e.y=e.y<0?0:1;break;case Os:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}$t.DEFAULT_IMAGE=null;$t.DEFAULT_MAPPING=Uc;$t.DEFAULT_ANISOTROPY=1;class At{static{At.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,a=this.w,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r+s[12]*a,this.y=s[1]*t+s[5]*n+s[9]*r+s[13]*a,this.z=s[2]*t+s[6]*n+s[10]*r+s[14]*a,this.w=s[3]*t+s[7]*n+s[11]*r+s[15]*a,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,a;const c=e.elements,l=c[0],u=c[4],d=c[8],h=c[1],p=c[5],_=c[9],x=c[2],g=c[6],m=c[10];if(Math.abs(u-h)<.01&&Math.abs(d-x)<.01&&Math.abs(_-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+x)<.1&&Math.abs(_+g)<.1&&Math.abs(l+p+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(l+1)/2,b=(p+1)/2,R=(m+1)/2,w=(u+h)/4,P=(d+x)/4,S=(_+g)/4;return E>b&&E>R?E<.01?(n=0,r=.707106781,a=.707106781):(n=Math.sqrt(E),r=w/n,a=P/n):b>R?b<.01?(n=.707106781,r=0,a=.707106781):(r=Math.sqrt(b),n=w/r,a=S/r):R<.01?(n=.707106781,r=.707106781,a=0):(a=Math.sqrt(R),n=P/a,r=S/a),this.set(n,r,a,t),this}let M=Math.sqrt((g-_)*(g-_)+(d-x)*(d-x)+(h-u)*(h-u));return Math.abs(M)<.001&&(M=1),this.x=(g-_)/M,this.y=(d-x)/M,this.z=(h-u)/M,this.w=Math.acos((l+p+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=tt(this.x,e.x,t.x),this.y=tt(this.y,e.y,t.y),this.z=tt(this.z,e.z,t.z),this.w=tt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=tt(this.x,e,t),this.y=tt(this.y,e,t),this.z=tt(this.z,e,t),this.w=tt(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(tt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Zf extends Di{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Pt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new At(0,0,e,t),this.scissorTest=!1,this.viewport=new At(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:n.depth},a=new $t(r),s=n.count;for(let o=0;o<s;o++)this.textures[o]=a.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Pt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,a=this.textures.length;r<a;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Bo(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class fn extends Zf{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Xc extends $t{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Ut,this.minFilter=Ut,this.wrapR=Xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class $f extends $t{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Ut,this.minFilter=Ut,this.wrapR=Xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class Ct{static{Ct.prototype.isMatrix4=!0}constructor(e,t,n,r,a,s,o,c,l,u,d,h,p,_,x,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,a,s,o,c,l,u,d,h,p,_,x,g)}set(e,t,n,r,a,s,o,c,l,u,d,h,p,_,x,g){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=r,m[1]=a,m[5]=s,m[9]=o,m[13]=c,m[2]=l,m[6]=u,m[10]=d,m[14]=h,m[3]=p,m[7]=_,m[11]=x,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ct().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,r=1/Oi.setFromMatrixColumn(e,0).length(),a=1/Oi.setFromMatrixColumn(e,1).length(),s=1/Oi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*a,t[5]=n[5]*a,t[6]=n[6]*a,t[7]=0,t[8]=n[8]*s,t[9]=n[9]*s,t[10]=n[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,a=e.z,s=Math.cos(n),o=Math.sin(n),c=Math.cos(r),l=Math.sin(r),u=Math.cos(a),d=Math.sin(a);if(e.order==="XYZ"){const h=s*u,p=s*d,_=o*u,x=o*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=p+_*l,t[5]=h-x*l,t[9]=-o*c,t[2]=x-h*l,t[6]=_+p*l,t[10]=s*c}else if(e.order==="YXZ"){const h=c*u,p=c*d,_=l*u,x=l*d;t[0]=h+x*o,t[4]=_*o-p,t[8]=s*l,t[1]=s*d,t[5]=s*u,t[9]=-o,t[2]=p*o-_,t[6]=x+h*o,t[10]=s*c}else if(e.order==="ZXY"){const h=c*u,p=c*d,_=l*u,x=l*d;t[0]=h-x*o,t[4]=-s*d,t[8]=_+p*o,t[1]=p+_*o,t[5]=s*u,t[9]=x-h*o,t[2]=-s*l,t[6]=o,t[10]=s*c}else if(e.order==="ZYX"){const h=s*u,p=s*d,_=o*u,x=o*d;t[0]=c*u,t[4]=_*l-p,t[8]=h*l+x,t[1]=c*d,t[5]=x*l+h,t[9]=p*l-_,t[2]=-l,t[6]=o*c,t[10]=s*c}else if(e.order==="YZX"){const h=s*c,p=s*l,_=o*c,x=o*l;t[0]=c*u,t[4]=x-h*d,t[8]=_*d+p,t[1]=d,t[5]=s*u,t[9]=-o*u,t[2]=-l*u,t[6]=p*d+_,t[10]=h-x*d}else if(e.order==="XZY"){const h=s*c,p=s*l,_=o*c,x=o*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=h*d+x,t[5]=s*u,t[9]=p*d-_,t[2]=_*d-p,t[6]=o*u,t[10]=x*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Jf,e,Qf)}lookAt(e,t,n){const r=this.elements;return nn.subVectors(e,t),nn.lengthSq()===0&&(nn.z=1),nn.normalize(),ii.crossVectors(n,nn),ii.lengthSq()===0&&(Math.abs(n.z)===1?nn.x+=1e-4:nn.z+=1e-4,nn.normalize(),ii.crossVectors(n,nn)),ii.normalize(),Kr.crossVectors(nn,ii),r[0]=ii.x,r[4]=Kr.x,r[8]=nn.x,r[1]=ii.y,r[5]=Kr.y,r[9]=nn.y,r[2]=ii.z,r[6]=Kr.z,r[10]=nn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,a=this.elements,s=n[0],o=n[4],c=n[8],l=n[12],u=n[1],d=n[5],h=n[9],p=n[13],_=n[2],x=n[6],g=n[10],m=n[14],M=n[3],E=n[7],b=n[11],R=n[15],w=r[0],P=r[4],S=r[8],T=r[12],I=r[1],C=r[5],O=r[9],F=r[13],D=r[2],B=r[6],W=r[10],$=r[14],ae=r[3],q=r[7],ee=r[11],N=r[15];return a[0]=s*w+o*I+c*D+l*ae,a[4]=s*P+o*C+c*B+l*q,a[8]=s*S+o*O+c*W+l*ee,a[12]=s*T+o*F+c*$+l*N,a[1]=u*w+d*I+h*D+p*ae,a[5]=u*P+d*C+h*B+p*q,a[9]=u*S+d*O+h*W+p*ee,a[13]=u*T+d*F+h*$+p*N,a[2]=_*w+x*I+g*D+m*ae,a[6]=_*P+x*C+g*B+m*q,a[10]=_*S+x*O+g*W+m*ee,a[14]=_*T+x*F+g*$+m*N,a[3]=M*w+E*I+b*D+R*ae,a[7]=M*P+E*C+b*B+R*q,a[11]=M*S+E*O+b*W+R*ee,a[15]=M*T+E*F+b*$+R*N,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],a=e[12],s=e[1],o=e[5],c=e[9],l=e[13],u=e[2],d=e[6],h=e[10],p=e[14],_=e[3],x=e[7],g=e[11],m=e[15],M=c*p-l*h,E=o*p-l*d,b=o*h-c*d,R=s*p-l*u,w=s*h-c*u,P=s*d-o*u;return t*(x*M-g*E+m*b)-n*(_*M-g*R+m*w)+r*(_*E-x*R+m*P)-a*(_*b-x*w+g*P)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],r=e[8],a=e[1],s=e[5],o=e[9],c=e[2],l=e[6],u=e[10];return t*(s*u-o*l)-n*(a*u-o*c)+r*(a*l-s*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],a=e[3],s=e[4],o=e[5],c=e[6],l=e[7],u=e[8],d=e[9],h=e[10],p=e[11],_=e[12],x=e[13],g=e[14],m=e[15],M=t*o-n*s,E=t*c-r*s,b=t*l-a*s,R=n*c-r*o,w=n*l-a*o,P=r*l-a*c,S=u*x-d*_,T=u*g-h*_,I=u*m-p*_,C=d*g-h*x,O=d*m-p*x,F=h*m-p*g,D=M*F-E*O+b*C+R*I-w*T+P*S;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const B=1/D;return e[0]=(o*F-c*O+l*C)*B,e[1]=(r*O-n*F-a*C)*B,e[2]=(x*P-g*w+m*R)*B,e[3]=(h*w-d*P-p*R)*B,e[4]=(c*I-s*F-l*T)*B,e[5]=(t*F-r*I+a*T)*B,e[6]=(g*b-_*P-m*E)*B,e[7]=(u*P-h*b+p*E)*B,e[8]=(s*O-o*I+l*S)*B,e[9]=(n*I-t*O-a*S)*B,e[10]=(_*w-x*b+m*M)*B,e[11]=(d*b-u*w-p*M)*B,e[12]=(o*T-s*C-c*S)*B,e[13]=(t*C-n*T+r*S)*B,e[14]=(x*E-_*R-g*M)*B,e[15]=(u*R-d*E+h*M)*B,this}scale(e){const t=this.elements,n=e.x,r=e.y,a=e.z;return t[0]*=n,t[4]*=r,t[8]*=a,t[1]*=n,t[5]*=r,t[9]*=a,t[2]*=n,t[6]*=r,t[10]*=a,t[3]*=n,t[7]*=r,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),a=1-n,s=e.x,o=e.y,c=e.z,l=a*s,u=a*o;return this.set(l*s+n,l*o-r*c,l*c+r*o,0,l*o+r*c,u*o+n,u*c-r*s,0,l*c-r*o,u*c+r*s,a*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,a,s){return this.set(1,n,a,0,e,1,s,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,a=t._x,s=t._y,o=t._z,c=t._w,l=a+a,u=s+s,d=o+o,h=a*l,p=a*u,_=a*d,x=s*u,g=s*d,m=o*d,M=c*l,E=c*u,b=c*d,R=n.x,w=n.y,P=n.z;return r[0]=(1-(x+m))*R,r[1]=(p+b)*R,r[2]=(_-E)*R,r[3]=0,r[4]=(p-b)*w,r[5]=(1-(h+m))*w,r[6]=(g+M)*w,r[7]=0,r[8]=(_+E)*P,r[9]=(g-M)*P,r[10]=(1-(h+x))*P,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const a=this.determinantAffine();if(a===0)return n.set(1,1,1),t.identity(),this;let s=Oi.set(r[0],r[1],r[2]).length();const o=Oi.set(r[4],r[5],r[6]).length(),c=Oi.set(r[8],r[9],r[10]).length();a<0&&(s=-s),gn.copy(this);const l=1/s,u=1/o,d=1/c;return gn.elements[0]*=l,gn.elements[1]*=l,gn.elements[2]*=l,gn.elements[4]*=u,gn.elements[5]*=u,gn.elements[6]*=u,gn.elements[8]*=d,gn.elements[9]*=d,gn.elements[10]*=d,t.setFromRotationMatrix(gn),n.x=s,n.y=o,n.z=c,this}makePerspective(e,t,n,r,a,s,o=Cn,c=!1){const l=this.elements,u=2*a/(t-e),d=2*a/(n-r),h=(t+e)/(t-e),p=(n+r)/(n-r);let _,x;if(c)_=a/(s-a),x=s*a/(s-a);else if(o===Cn)_=-(s+a)/(s-a),x=-2*s*a/(s-a);else if(o===La)_=-s/(s-a),x=-s*a/(s-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=d,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=_,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,a,s,o=Cn,c=!1){const l=this.elements,u=2/(t-e),d=2/(n-r),h=-(t+e)/(t-e),p=-(n+r)/(n-r);let _,x;if(c)_=1/(s-a),x=s/(s-a);else if(o===Cn)_=-2/(s-a),x=-(s+a)/(s-a);else if(o===La)_=-1/(s-a),x=-a/(s-a);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=d,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=_,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Oi=new X,gn=new Ct,Jf=new X(0,0,0),Qf=new X(1,1,1),ii=new X,Kr=new X,nn=new X,vl=new Ct,Ml=new ur;class Pi{constructor(e=0,t=0,n=0,r=Pi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,a=r[0],s=r[4],o=r[8],c=r[1],l=r[5],u=r[9],d=r[2],h=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(tt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-s,a)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-tt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,a),this._z=0);break;case"ZXY":this._x=Math.asin(tt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-s,l)):(this._y=0,this._z=Math.atan2(c,a));break;case"ZYX":this._y=Math.asin(-tt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(c,a)):(this._x=0,this._z=Math.atan2(-s,l));break;case"YZX":this._z=Math.asin(tt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,a)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-tt(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-u,p),this._y=0);break;default:Ge("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return vl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(vl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ml.setFromEuler(this),this.setFromQuaternion(Ml,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Pi.DEFAULT_ORDER="XYZ";class Yc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let jf=0;const Sl=new X,Bi=new ur,zn=new Ct,qr=new X,_r=new X,ep=new X,tp=new ur,bl=new X(1,0,0),El=new X(0,1,0),yl=new X(0,0,1),wl={type:"added"},np={type:"removed"},zi={type:"childadded",child:null},as={type:"childremoved",child:null};class sn extends Di{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:jf++}),this.uuid=Br(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=sn.DEFAULT_UP.clone();const e=new X,t=new Pi,n=new ur,r=new X(1,1,1);function a(){n.setFromEuler(t,!1)}function s(){t.setFromQuaternion(n,void 0,!1)}t._onChange(a),n._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Ct},normalMatrix:{value:new He}}),this.matrix=new Ct,this.matrixWorld=new Ct,this.matrixAutoUpdate=sn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=sn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Yc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Bi.setFromAxisAngle(e,t),this.quaternion.multiply(Bi),this}rotateOnWorldAxis(e,t){return Bi.setFromAxisAngle(e,t),this.quaternion.premultiply(Bi),this}rotateX(e){return this.rotateOnAxis(bl,e)}rotateY(e){return this.rotateOnAxis(El,e)}rotateZ(e){return this.rotateOnAxis(yl,e)}translateOnAxis(e,t){return Sl.copy(e).applyQuaternion(this.quaternion),this.position.add(Sl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(bl,e)}translateY(e){return this.translateOnAxis(El,e)}translateZ(e){return this.translateOnAxis(yl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(zn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?qr.copy(e):qr.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),_r.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?zn.lookAt(_r,qr,this.up):zn.lookAt(qr,_r,this.up),this.quaternion.setFromRotationMatrix(zn),r&&(zn.extractRotation(r.matrixWorld),Bi.setFromRotationMatrix(zn),this.quaternion.premultiply(Bi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(rt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(wl),zi.child=e,this.dispatchEvent(zi),zi.child=null):rt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(np),as.child=e,this.dispatchEvent(as),as.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),zn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),zn.multiply(e.parent.matrixWorld)),e.applyMatrix4(zn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(wl),zi.child=e,this.dispatchEvent(zi),zi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let a=0,s=r.length;a<s;a++)r[a].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_r,e,ep),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_r,tp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,r=e.z,a=this.matrix.elements;a[12]+=t-a[0]*t-a[4]*n-a[8]*r,a[13]+=n-a[1]*t-a[5]*n-a[9]*r,a[14]+=r-a[2]*t-a[6]*n-a[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const a=this.children;for(let s=0,o=a.length;s<o;s++)a[s].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function a(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=a(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const d=c[l];a(e.shapes,d)}else a(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(a(e.materials,this.material[c]));r.material=o}else r.material=a(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(a(e.animations,c))}}if(t){const o=s(e.geometries),c=s(e.materials),l=s(e.textures),u=s(e.images),d=s(e.shapes),h=s(e.skeletons),p=s(e.animations),_=s(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),p.length>0&&(n.animations=p),_.length>0&&(n.nodes=_)}return n.object=r,n;function s(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}sn.DEFAULT_UP=new X(0,1,0);sn.DEFAULT_MATRIX_AUTO_UPDATE=!0;sn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Zr extends sn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ip={type:"move"};class ss{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Zr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Zr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new X,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new X),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Zr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new X,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new X,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,a=null,s=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){s=!0;for(const x of e.hand.values()){const g=t.getJointPose(x,n),m=this._getHandJoint(l,x);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],h=u.position.distanceTo(d.position),p=.02,_=.005;l.inputState.pinching&&h>p+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=p-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,n),a!==null&&(c.matrix.fromArray(a.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,a.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(a.linearVelocity)):c.hasLinearVelocity=!1,a.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(a.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&a!==null&&(r=a),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ip)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=a!==null),l!==null&&(l.visible=s!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Zr;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Kc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ri={h:0,s:0,l:0},$r={h:0,s:0,l:0};function os(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class st{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=cn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,et.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=et.workingColorSpace){return this.r=e,this.g=t,this.b=n,et.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=et.workingColorSpace){if(e=Wf(e,1),t=tt(t,0,1),n=tt(n,0,1),t===0)this.r=this.g=this.b=n;else{const a=n<=.5?n*(1+t):n+t-n*t,s=2*n-a;this.r=os(s,a,e+1/3),this.g=os(s,a,e),this.b=os(s,a,e-1/3)}return et.colorSpaceToWorking(this,r),this}setStyle(e,t=cn){function n(a){a!==void 0&&parseFloat(a)<1&&Ge("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const s=r[1],o=r[2];switch(s){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:Ge("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=r[1],s=a.length;if(s===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(s===6)return this.setHex(parseInt(a,16),t);Ge("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=cn){const n=Kc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ge("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Zn(e.r),this.g=Zn(e.g),this.b=Zn(e.b),this}copyLinearToSRGB(e){return this.r=ir(e.r),this.g=ir(e.g),this.b=ir(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=cn){return et.workingToColorSpace(Xt.copy(this),e),Math.round(tt(Xt.r*255,0,255))*65536+Math.round(tt(Xt.g*255,0,255))*256+Math.round(tt(Xt.b*255,0,255))}getHexString(e=cn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=et.workingColorSpace){et.workingToColorSpace(Xt.copy(this),t);const n=Xt.r,r=Xt.g,a=Xt.b,s=Math.max(n,r,a),o=Math.min(n,r,a);let c,l;const u=(o+s)/2;if(o===s)c=0,l=0;else{const d=s-o;switch(l=u<=.5?d/(s+o):d/(2-s-o),s){case n:c=(r-a)/d+(r<a?6:0);break;case r:c=(a-n)/d+2;break;case a:c=(n-r)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=et.workingColorSpace){return et.workingToColorSpace(Xt.copy(this),t),e.r=Xt.r,e.g=Xt.g,e.b=Xt.b,e}getStyle(e=cn){et.workingToColorSpace(Xt.copy(this),e);const t=Xt.r,n=Xt.g,r=Xt.b;return e!==cn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(ri),this.setHSL(ri.h+e,ri.s+t,ri.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ri),e.getHSL($r);const n=es(ri.h,$r.h,t),r=es(ri.s,$r.s,t),a=es(ri.l,$r.l,t);return this.setHSL(n,r,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,a=e.elements;return this.r=a[0]*t+a[3]*n+a[6]*r,this.g=a[1]*t+a[4]*n+a[7]*r,this.b=a[2]*t+a[5]*n+a[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Xt=new st;st.NAMES=Kc;class rp extends sn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Pi,this.environmentIntensity=1,this.environmentRotation=new Pi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const _n=new X,kn=new X,ls=new X,Gn=new X,ki=new X,Gi=new X,Al=new X,cs=new X,us=new X,hs=new X,ds=new At,fs=new At,ps=new At;class Mn{constructor(e=new X,t=new X,n=new X){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),_n.subVectors(e,t),r.cross(_n);const a=r.lengthSq();return a>0?r.multiplyScalar(1/Math.sqrt(a)):r.set(0,0,0)}static getBarycoord(e,t,n,r,a){_n.subVectors(r,t),kn.subVectors(n,t),ls.subVectors(e,t);const s=_n.dot(_n),o=_n.dot(kn),c=_n.dot(ls),l=kn.dot(kn),u=kn.dot(ls),d=s*l-o*o;if(d===0)return a.set(0,0,0),null;const h=1/d,p=(l*c-o*u)*h,_=(s*u-o*c)*h;return a.set(1-p-_,_,p)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Gn)===null?!1:Gn.x>=0&&Gn.y>=0&&Gn.x+Gn.y<=1}static getInterpolation(e,t,n,r,a,s,o,c){return this.getBarycoord(e,t,n,r,Gn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(a,Gn.x),c.addScaledVector(s,Gn.y),c.addScaledVector(o,Gn.z),c)}static getInterpolatedAttribute(e,t,n,r,a,s){return ds.setScalar(0),fs.setScalar(0),ps.setScalar(0),ds.fromBufferAttribute(e,t),fs.fromBufferAttribute(e,n),ps.fromBufferAttribute(e,r),s.setScalar(0),s.addScaledVector(ds,a.x),s.addScaledVector(fs,a.y),s.addScaledVector(ps,a.z),s}static isFrontFacing(e,t,n,r){return _n.subVectors(n,t),kn.subVectors(e,t),_n.cross(kn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return _n.subVectors(this.c,this.b),kn.subVectors(this.a,this.b),_n.cross(kn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Mn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Mn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,a){return Mn.getInterpolation(e,this.a,this.b,this.c,t,n,r,a)}containsPoint(e){return Mn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Mn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,a=this.c;let s,o;ki.subVectors(r,n),Gi.subVectors(a,n),cs.subVectors(e,n);const c=ki.dot(cs),l=Gi.dot(cs);if(c<=0&&l<=0)return t.copy(n);us.subVectors(e,r);const u=ki.dot(us),d=Gi.dot(us);if(u>=0&&d<=u)return t.copy(r);const h=c*d-u*l;if(h<=0&&c>=0&&u<=0)return s=c/(c-u),t.copy(n).addScaledVector(ki,s);hs.subVectors(e,a);const p=ki.dot(hs),_=Gi.dot(hs);if(_>=0&&p<=_)return t.copy(a);const x=p*l-c*_;if(x<=0&&l>=0&&_<=0)return o=l/(l-_),t.copy(n).addScaledVector(Gi,o);const g=u*_-p*d;if(g<=0&&d-u>=0&&p-_>=0)return Al.subVectors(a,r),o=(d-u)/(d-u+(p-_)),t.copy(r).addScaledVector(Al,o);const m=1/(g+x+h);return s=x*m,o=h*m,t.copy(n).addScaledVector(ki,s).addScaledVector(Gi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class hr{constructor(e=new X(1/0,1/0,1/0),t=new X(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(xn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(xn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=xn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const a=n.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let s=0,o=a.count;s<o;s++)e.isMesh===!0?e.getVertexPosition(s,xn):xn.fromBufferAttribute(a,s),xn.applyMatrix4(e.matrixWorld),this.expandByPoint(xn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Jr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Jr.copy(n.boundingBox)),Jr.applyMatrix4(e.matrixWorld),this.union(Jr)}const r=e.children;for(let a=0,s=r.length;a<s;a++)this.expandByObject(r[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,xn),xn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(xr),Qr.subVectors(this.max,xr),Hi.subVectors(e.a,xr),Vi.subVectors(e.b,xr),Wi.subVectors(e.c,xr),ai.subVectors(Vi,Hi),si.subVectors(Wi,Vi),pi.subVectors(Hi,Wi);let t=[0,-ai.z,ai.y,0,-si.z,si.y,0,-pi.z,pi.y,ai.z,0,-ai.x,si.z,0,-si.x,pi.z,0,-pi.x,-ai.y,ai.x,0,-si.y,si.x,0,-pi.y,pi.x,0];return!ms(t,Hi,Vi,Wi,Qr)||(t=[1,0,0,0,1,0,0,0,1],!ms(t,Hi,Vi,Wi,Qr))?!1:(jr.crossVectors(ai,si),t=[jr.x,jr.y,jr.z],ms(t,Hi,Vi,Wi,Qr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,xn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(xn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Hn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Hn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Hn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Hn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Hn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Hn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Hn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Hn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Hn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Hn=[new X,new X,new X,new X,new X,new X,new X,new X],xn=new X,Jr=new hr,Hi=new X,Vi=new X,Wi=new X,ai=new X,si=new X,pi=new X,xr=new X,Qr=new X,jr=new X,mi=new X;function ms(i,e,t,n,r){for(let a=0,s=i.length-3;a<=s;a+=3){mi.fromArray(i,a);const o=r.x*Math.abs(mi.x)+r.y*Math.abs(mi.y)+r.z*Math.abs(mi.z),c=e.dot(mi),l=t.dot(mi),u=n.dot(mi);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const It=new X,ea=new Ve;let ap=0;class Pn extends Di{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ap++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=zf,this.updateRanges=[],this.gpuType=Rn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,a=this.itemSize;r<a;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ea.fromBufferAttribute(this,t),ea.applyMatrix3(e),this.setXY(t,ea.x,ea.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.applyMatrix3(e),this.setXYZ(t,It.x,It.y,It.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.applyMatrix4(e),this.setXYZ(t,It.x,It.y,It.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.applyNormalMatrix(e),this.setXYZ(t,It.x,It.y,It.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)It.fromBufferAttribute(this,t),It.transformDirection(e),this.setXYZ(t,It.x,It.y,It.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=gr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Qt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=gr(t,this.array)),t}setX(e,t){return this.normalized&&(t=Qt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=gr(t,this.array)),t}setY(e,t){return this.normalized&&(t=Qt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=gr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Qt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=gr(t,this.array)),t}setW(e,t){return this.normalized&&(t=Qt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Qt(t,this.array),n=Qt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Qt(t,this.array),n=Qt(n,this.array),r=Qt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,a){return e*=this.itemSize,this.normalized&&(t=Qt(t,this.array),n=Qt(n,this.array),r=Qt(r,this.array),a=Qt(a,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class qc extends Pn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Zc extends Pn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class $n extends Pn{constructor(e,t,n){super(new Float32Array(e),t,n)}}const sp=new hr,vr=new X,gs=new X;class zo{constructor(e=new X,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):sp.setFromPoints(e).getCenter(n);let r=0;for(let a=0,s=e.length;a<s;a++)r=Math.max(r,n.distanceToSquared(e[a]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;vr.subVectors(e,this.center);const t=vr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(vr,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(gs.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(vr.copy(e.center).add(gs)),this.expandByPoint(vr.copy(e.center).sub(gs))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let op=0;const ln=new Ct,_s=new sn,Xi=new X,rn=new hr,Mr=new hr,zt=new X;class Un extends Di{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:op++}),this.uuid=Br(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(kf(e)?Zc:qc)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const a=new He().getNormalMatrix(e);n.applyNormalMatrix(a),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return ln.makeRotationFromQuaternion(e),this.applyMatrix4(ln),this}rotateX(e){return ln.makeRotationX(e),this.applyMatrix4(ln),this}rotateY(e){return ln.makeRotationY(e),this.applyMatrix4(ln),this}rotateZ(e){return ln.makeRotationZ(e),this.applyMatrix4(ln),this}translate(e,t,n){return ln.makeTranslation(e,t,n),this.applyMatrix4(ln),this}scale(e,t,n){return ln.makeScale(e,t,n),this.applyMatrix4(ln),this}lookAt(e){return _s.lookAt(e),_s.updateMatrix(),this.applyMatrix4(_s.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Xi).negate(),this.translate(Xi.x,Xi.y,Xi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,a=e.length;r<a;r++){const s=e[r];n.push(s.x,s.y,s.z||0)}this.setAttribute("position",new $n(n,3))}else{const n=Math.min(e.length,t.count);for(let r=0;r<n;r++){const a=e[r];t.setXYZ(r,a.x,a.y,a.z||0)}e.length>t.count&&Ge("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new hr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){rt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new X(-1/0,-1/0,-1/0),new X(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const a=t[n];rn.setFromBufferAttribute(a),this.morphTargetsRelative?(zt.addVectors(this.boundingBox.min,rn.min),this.boundingBox.expandByPoint(zt),zt.addVectors(this.boundingBox.max,rn.max),this.boundingBox.expandByPoint(zt)):(this.boundingBox.expandByPoint(rn.min),this.boundingBox.expandByPoint(rn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&rt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new zo);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){rt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new X,1/0);return}if(e){const n=this.boundingSphere.center;if(rn.setFromBufferAttribute(e),t)for(let a=0,s=t.length;a<s;a++){const o=t[a];Mr.setFromBufferAttribute(o),this.morphTargetsRelative?(zt.addVectors(rn.min,Mr.min),rn.expandByPoint(zt),zt.addVectors(rn.max,Mr.max),rn.expandByPoint(zt)):(rn.expandByPoint(Mr.min),rn.expandByPoint(Mr.max))}rn.getCenter(n);let r=0;for(let a=0,s=e.count;a<s;a++)zt.fromBufferAttribute(e,a),r=Math.max(r,n.distanceToSquared(zt));if(t)for(let a=0,s=t.length;a<s;a++){const o=t[a],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)zt.fromBufferAttribute(o,l),c&&(Xi.fromBufferAttribute(e,l),zt.add(Xi)),r=Math.max(r,n.distanceToSquared(zt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&rt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){rt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,a=t.uv;let s=this.getAttribute("tangent");(s===void 0||s.count!==n.count)&&(s=new Pn(new Float32Array(4*n.count),4),this.setAttribute("tangent",s));const o=[],c=[];for(let S=0;S<n.count;S++)o[S]=new X,c[S]=new X;const l=new X,u=new X,d=new X,h=new Ve,p=new Ve,_=new Ve,x=new X,g=new X;function m(S,T,I){l.fromBufferAttribute(n,S),u.fromBufferAttribute(n,T),d.fromBufferAttribute(n,I),h.fromBufferAttribute(a,S),p.fromBufferAttribute(a,T),_.fromBufferAttribute(a,I),u.sub(l),d.sub(l),p.sub(h),_.sub(h);const C=1/(p.x*_.y-_.x*p.y);isFinite(C)&&(x.copy(u).multiplyScalar(_.y).addScaledVector(d,-p.y).multiplyScalar(C),g.copy(d).multiplyScalar(p.x).addScaledVector(u,-_.x).multiplyScalar(C),o[S].add(x),o[T].add(x),o[I].add(x),c[S].add(g),c[T].add(g),c[I].add(g))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let S=0,T=M.length;S<T;++S){const I=M[S],C=I.start,O=I.count;for(let F=C,D=C+O;F<D;F+=3)m(e.getX(F+0),e.getX(F+1),e.getX(F+2))}const E=new X,b=new X,R=new X,w=new X;function P(S){R.fromBufferAttribute(r,S),w.copy(R);const T=o[S];E.copy(T),E.sub(R.multiplyScalar(R.dot(T))).normalize(),b.crossVectors(w,T);const C=b.dot(c[S])<0?-1:1;s.setXYZW(S,E.x,E.y,E.z,C)}for(let S=0,T=M.length;S<T;++S){const I=M[S],C=I.start,O=I.count;for(let F=C,D=C+O;F<D;F+=3)P(e.getX(F+0)),P(e.getX(F+1)),P(e.getX(F+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Pn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,p=n.count;h<p;h++)n.setXYZ(h,0,0,0);const r=new X,a=new X,s=new X,o=new X,c=new X,l=new X,u=new X,d=new X;if(e)for(let h=0,p=e.count;h<p;h+=3){const _=e.getX(h+0),x=e.getX(h+1),g=e.getX(h+2);r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,x),s.fromBufferAttribute(t,g),u.subVectors(s,a),d.subVectors(r,a),u.cross(d),o.fromBufferAttribute(n,_),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,g),o.add(u),c.add(u),l.add(u),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let h=0,p=t.count;h<p;h+=3)r.fromBufferAttribute(t,h+0),a.fromBufferAttribute(t,h+1),s.fromBufferAttribute(t,h+2),u.subVectors(s,a),d.subVectors(r,a),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)zt.fromBufferAttribute(e,t),zt.normalize(),e.setXYZ(t,zt.x,zt.y,zt.z)}toNonIndexed(){function e(o,c){const l=o.array,u=o.itemSize,d=o.normalized,h=new l.constructor(c.length*u);let p=0,_=0;for(let x=0,g=c.length;x<g;x++){o.isInterleavedBufferAttribute?p=c[x]*o.data.stride+o.offset:p=c[x]*u;for(let m=0;m<u;m++)h[_++]=l[p++]}return new Pn(h,u,d)}if(this.index===null)return Ge("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Un,n=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=e(c,n);t.setAttribute(o,l)}const a=this.morphAttributes;for(const o in a){const c=[],l=a[o];for(let u=0,d=l.length;u<d;u++){const h=l[u],p=e(h,n);c.push(p)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const s=this.groups;for(let o=0,c=s.length;o<c;o++){const l=s[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let a=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let d=0,h=l.length;d<h;d++){const p=l[d];u.push(p.toJSON(e.data))}u.length>0&&(r[c]=u,a=!0)}a&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const r=e.attributes;for(const l in r){const u=r[l];this.setAttribute(l,u.clone(t))}const a=e.morphAttributes;for(const l in a){const u=[],d=a[l];for(let h=0,p=d.length;h<p;h++)u.push(d[h].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const s=e.groups;for(let l=0,u=s.length;l<u;l++){const d=s[l];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const xs=new X,lp=new X,cp=new He;class li{constructor(e=new X(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=xs.subVectors(n,t).cross(lp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const r=e.delta(xs),a=this.normal.dot(r);if(a===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/a;return n===!0&&(s<0||s>1)?null:t.copy(e.start).addScaledVector(r,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||cp.getNormalMatrix(e),r=this.coplanarPoint(xs).applyMatrix4(e),a=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let up=0;class Ba extends Di{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:up++}),this.uuid=Br(),this.name="",this.type="Material",this.blending=Rr,this.side=Ri,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=wc,this.blendDst=Ac,this.blendEquation=$i,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new st(0,0,0),this.blendAlpha=0,this.depthFunc=Lr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Df,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Qa,this.stencilZFail=Qa,this.stencilZPass=Qa,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Ge(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ge(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(a=>a.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(a){const s=[];for(const o in a){const c=a[o];delete c.metadata,s.push(c)}return s}if(t){const a=r(e.textures),s=r(e.images);a.length>0&&(n.textures=a),s.length>0&&(n.images=s)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new st().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new li().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Ve().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ve().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let a=0;a!==r;++a)n[a]=t[a].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Vn=new X,vs=new X,ta=new X,na=new X;class hp{constructor(e=new X,t=new X(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Vn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Vn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Vn.copy(this.origin).addScaledVector(this.direction,t),Vn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){vs.copy(e).add(t).multiplyScalar(.5),ta.copy(t).sub(e).normalize(),na.copy(this.origin).sub(vs);const a=e.distanceTo(t)*.5,s=-this.direction.dot(ta),o=na.dot(this.direction),c=-na.dot(ta),l=na.lengthSq(),u=Math.abs(1-s*s);let d,h,p,_;if(u>0)if(d=s*c-o,h=s*o-c,_=a*u,d>=0)if(h>=-_)if(h<=_){const x=1/u;d*=x,h*=x,p=d*(d+s*h+2*o)+h*(s*d+h+2*c)+l}else h=a,d=Math.max(0,-(s*h+o)),p=-d*d+h*(h+2*c)+l;else h=-a,d=Math.max(0,-(s*h+o)),p=-d*d+h*(h+2*c)+l;else h<=-_?(d=Math.max(0,-(-s*a+o)),h=d>0?-a:Math.min(Math.max(-a,-c),a),p=-d*d+h*(h+2*c)+l):h<=_?(d=0,h=Math.min(Math.max(-a,-c),a),p=h*(h+2*c)+l):(d=Math.max(0,-(s*a+o)),h=d>0?a:Math.min(Math.max(-a,-c),a),p=-d*d+h*(h+2*c)+l);else h=s>0?-a:a,d=Math.max(0,-(s*h+o)),p=-d*d+h*(h+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(vs).addScaledVector(ta,h),p}intersectSphere(e,t){if(e.radius<0)return null;Vn.subVectors(e.center,this.origin);const n=Vn.dot(this.direction),r=Vn.dot(Vn)-n*n,a=e.radius*e.radius;if(r>a)return null;const s=Math.sqrt(a-r),o=n-s,c=n+s;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,a,s,o,c;const l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return l>=0?(n=(e.min.x-h.x)*l,r=(e.max.x-h.x)*l):(n=(e.max.x-h.x)*l,r=(e.min.x-h.x)*l),u>=0?(a=(e.min.y-h.y)*u,s=(e.max.y-h.y)*u):(a=(e.max.y-h.y)*u,s=(e.min.y-h.y)*u),n>s||a>r||((a>n||isNaN(n))&&(n=a),(s<r||isNaN(r))&&(r=s),d>=0?(o=(e.min.z-h.z)*d,c=(e.max.z-h.z)*d):(o=(e.max.z-h.z)*d,c=(e.min.z-h.z)*d),n>c||o>r)||((o>n||n!==n)&&(n=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Vn)!==null}intersectTriangle(e,t,n,r,a){const s=this.origin,o=this.direction,c=o.x,l=o.y,u=o.z,d=e.x-s.x,h=e.y-s.y,p=e.z-s.z,_=t.x-s.x,x=t.y-s.y,g=t.z-s.z,m=n.x-s.x,M=n.y-s.y,E=n.z-s.z,b=Math.abs(c),R=Math.abs(l),w=Math.abs(u);let P,S,T,I,C,O,F,D,B,W,$,ae;if(b>=R&&b>=w?(T=c,O=d,B=_,ae=m,c>=0?(P=l,S=u,I=h,C=p,F=x,D=g,W=M,$=E):(P=u,S=l,I=p,C=h,F=g,D=x,W=E,$=M)):R>=w?(T=l,O=h,B=x,ae=M,l>=0?(P=u,S=c,I=p,C=d,F=g,D=_,W=E,$=m):(P=c,S=u,I=d,C=p,F=_,D=g,W=m,$=E)):(T=u,O=p,B=g,ae=E,u>=0?(P=c,S=l,I=d,C=h,F=_,D=x,W=m,$=M):(P=l,S=c,I=h,C=d,F=x,D=_,W=M,$=m)),T===0)return null;const q=P/T,ee=S/T,N=1/T,re=I-q*O,ce=C-ee*O,Re=F-q*B,Oe=D-ee*B,ke=W-q*ae,j=$-ee*ae,ie=ke*Oe-j*Re,H=re*j-ce*ke,ue=Re*ce-Oe*re;if(r){if(ie<0||H<0||ue<0)return null}else if((ie<0||H<0||ue<0)&&(ie>0||H>0||ue>0))return null;const se=ie+H+ue;if(se===0)return null;const ye=N*(ie*O+H*B+ue*ae);return(se>0?ye<0:ye>0)?null:this.at(ye/se,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class $c extends Ba{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new st(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Pi,this.combine=Tc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Tl=new Ct,gi=new hp,ia=new zo,Rl=new X,ra=new X,aa=new X,sa=new X,Ms=new X,oa=new X,Cl=new X,la=new X;class Jt extends sn{constructor(e=new Un,t=new $c){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,s=r.length;a<s;a++){const o=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,a=n.morphAttributes.position,s=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(a&&o){oa.set(0,0,0);for(let c=0,l=a.length;c<l;c++){const u=o[c],d=a[c];u!==0&&(Ms.fromBufferAttribute(d,e),s?oa.addScaledVector(Ms,u):oa.addScaledVector(Ms.sub(t),u))}t.add(oa)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,r=this.material,a=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ia.copy(n.boundingSphere),ia.applyMatrix4(a),gi.copy(e.ray).recast(e.near),!(ia.containsPoint(gi.origin)===!1&&(gi.intersectSphere(ia,Rl)===null||gi.origin.distanceToSquared(Rl)>(e.far-e.near)**2))&&(Tl.copy(a).invert(),gi.copy(e.ray).applyMatrix4(Tl),!(n.boundingBox!==null&&gi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,gi)))}_computeIntersections(e,t,n){let r;const a=this.geometry,s=this.material,o=a.index,c=a.attributes.position,l=a.attributes.uv,u=a.attributes.uv1,d=a.attributes.normal,h=a.groups,p=a.drawRange;if(o!==null)if(Array.isArray(s))for(let _=0,x=h.length;_<x;_++){const g=h[_],m=s[g.materialIndex],M=Math.max(g.start,p.start),E=Math.min(o.count,Math.min(g.start+g.count,p.start+p.count));for(let b=M,R=E;b<R;b+=3){const w=o.getX(b),P=o.getX(b+1),S=o.getX(b+2);r=ca(this,m,e,n,l,u,d,w,P,S),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{const _=Math.max(0,p.start),x=Math.min(o.count,p.start+p.count);for(let g=_,m=x;g<m;g+=3){const M=o.getX(g),E=o.getX(g+1),b=o.getX(g+2);r=ca(this,s,e,n,l,u,d,M,E,b),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(s))for(let _=0,x=h.length;_<x;_++){const g=h[_],m=s[g.materialIndex],M=Math.max(g.start,p.start),E=Math.min(c.count,Math.min(g.start+g.count,p.start+p.count));for(let b=M,R=E;b<R;b+=3){const w=b,P=b+1,S=b+2;r=ca(this,m,e,n,l,u,d,w,P,S),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{const _=Math.max(0,p.start),x=Math.min(c.count,p.start+p.count);for(let g=_,m=x;g<m;g+=3){const M=g,E=g+1,b=g+2;r=ca(this,s,e,n,l,u,d,M,E,b),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}}}function dp(i,e,t,n,r,a,s,o){let c;if(e.side===en?c=n.intersectTriangle(s,a,r,!0,o):c=n.intersectTriangle(r,a,s,e.side===Ri,o),c===null)return null;la.copy(o),la.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(la);return l<t.near||l>t.far?null:{distance:l,point:la.clone(),object:i}}function ca(i,e,t,n,r,a,s,o,c,l){i.getVertexPosition(o,ra),i.getVertexPosition(c,aa),i.getVertexPosition(l,sa);const u=dp(i,e,t,n,ra,aa,sa,Cl);if(u){const d=new X;Mn.getBarycoord(Cl,ra,aa,sa,d),r&&(u.uv=Mn.getInterpolatedAttribute(r,o,c,l,d,new Ve)),a&&(u.uv1=Mn.getInterpolatedAttribute(a,o,c,l,d,new Ve)),s&&(u.normal=Mn.getInterpolatedAttribute(s,o,c,l,d,new X),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:c,c:l,normal:new X,materialIndex:0};Mn.getNormal(ra,aa,sa,h.normal),u.face=h,u.barycoord=d}return u}class ji extends $t{constructor(e=null,t=1,n=1,r,a,s,o,c,l=Ut,u=Ut,d,h){super(null,s,o,c,l,u,r,a,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Jc extends Pn{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const _i=new zo,fp=new Ve(.5,.5),ua=new X;class ko{constructor(e=new li,t=new li,n=new li,r=new li,a=new li,s=new li){this.planes=[e,t,n,r,a,s]}set(e,t,n,r,a,s){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(a),o[5].copy(s),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Cn,n=!1){const r=this.planes,a=e.elements,s=a[0],o=a[1],c=a[2],l=a[3],u=a[4],d=a[5],h=a[6],p=a[7],_=a[8],x=a[9],g=a[10],m=a[11],M=a[12],E=a[13],b=a[14],R=a[15];if(r[0].setComponents(l-s,p-u,m-_,R-M).normalize(),r[1].setComponents(l+s,p+u,m+_,R+M).normalize(),r[2].setComponents(l+o,p+d,m+x,R+E).normalize(),r[3].setComponents(l-o,p-d,m-x,R-E).normalize(),n)r[4].setComponents(c,h,g,b).normalize(),r[5].setComponents(l-c,p-h,m-g,R-b).normalize();else if(r[4].setComponents(l-c,p-h,m-g,R-b).normalize(),t===Cn)r[5].setComponents(l+c,p+h,m+g,R+b).normalize();else if(t===La)r[5].setComponents(c,h,g,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),_i.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),_i.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(_i)}intersectsSprite(e){_i.center.set(0,0,0);const t=fp.distanceTo(e.center);return _i.radius=.7071067811865476+t,_i.applyMatrix4(e.matrixWorld),this.intersectsSphere(_i)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(ua.x=r.normal.x>0?e.max.x:e.min.x,ua.y=r.normal.y>0?e.max.y:e.min.y,ua.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ua)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Qc extends $t{constructor(e=[],t=Ci,n,r,a,s,o,c,l,u){super(e,t,n,r,a,s,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Nr extends $t{constructor(e,t,n=In,r,a,s,o=Ut,c=Ut,l,u=Qn,d=1){if(u!==Qn&&u!==Ei)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:d};super(h,r,a,s,o,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Bo(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class pp extends Nr{constructor(e,t=In,n=Ci,r,a,s=Ut,o=Ut,c,l=Qn){const u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,r,a,s,o,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class jc extends $t{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class zr extends Un{constructor(e=1,t=1,n=1,r=1,a=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:a,depthSegments:s};const o=this;r=Math.floor(r),a=Math.floor(a),s=Math.floor(s);const c=[],l=[],u=[],d=[];let h=0,p=0;_("z","y","x",-1,-1,n,t,e,s,a,0),_("z","y","x",1,-1,n,t,-e,s,a,1),_("x","z","y",1,1,e,n,t,r,s,2),_("x","z","y",1,-1,e,n,-t,r,s,3),_("x","y","z",1,-1,e,t,n,r,a,4),_("x","y","z",-1,-1,e,t,-n,r,a,5),this.setIndex(c),this.setAttribute("position",new $n(l,3)),this.setAttribute("normal",new $n(u,3)),this.setAttribute("uv",new $n(d,2));function _(x,g,m,M,E,b,R,w,P,S,T){const I=b/P,C=R/S,O=b/2,F=R/2,D=w/2,B=P+1,W=S+1;let $=0,ae=0;const q=new X;for(let ee=0;ee<W;ee++){const N=ee*C-F;for(let re=0;re<B;re++){const ce=re*I-O;q[x]=ce*M,q[g]=N*E,q[m]=D,l.push(q.x,q.y,q.z),q[x]=0,q[g]=0,q[m]=w>0?1:-1,u.push(q.x,q.y,q.z),d.push(re/P),d.push(1-ee/S),$+=1}}for(let ee=0;ee<S;ee++)for(let N=0;N<P;N++){const re=h+N+B*ee,ce=h+N+B*(ee+1),Re=h+(N+1)+B*(ee+1),Oe=h+(N+1)+B*ee;c.push(re,ce,Oe),c.push(ce,Re,Oe),ae+=6}o.addGroup(p,ae,T),p+=ae,h+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Fn extends Un{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const a=e/2,s=t/2,o=Math.floor(n),c=Math.floor(r),l=o+1,u=c+1,d=e/o,h=t/c,p=[],_=[],x=[],g=[];for(let m=0;m<u;m++){const M=m*h-s;for(let E=0;E<l;E++){const b=E*d-a;_.push(b,-M,0),x.push(0,0,1),g.push(E/o),g.push(1-m/c)}}for(let m=0;m<c;m++)for(let M=0;M<o;M++){const E=M+l*m,b=M+l*(m+1),R=M+1+l*(m+1),w=M+1+l*m;p.push(E,b,w),p.push(b,R,w)}this.setIndex(p),this.setAttribute("position",new $n(_,3)),this.setAttribute("normal",new $n(x,3)),this.setAttribute("uv",new $n(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Fn(e.width,e.height,e.widthSegments,e.heightSegments)}}function lr(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];if(Ll(r))r.isRenderTargetTexture?(Ge("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone();else if(Array.isArray(r))if(Ll(r[0])){const a=[];for(let s=0,o=r.length;s<o;s++)a[s]=r[s].clone();e[t][n]=a}else e[t][n]=r.slice();else e[t][n]=r}}return e}function Zt(i){const e={};for(let t=0;t<i.length;t++){const n=lr(i[t]);for(const r in n)e[r]=n[r]}return e}function Ll(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function mp(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function eu(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:et.workingColorSpace}const gp={clone:lr,merge:Zt};var _p=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,xp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Kt extends Ba{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=_p,this.fragmentShader=xp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=lr(e.uniforms),this.uniformsGroups=mp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const s=this.uniforms[r].value;s&&s.isTexture?t.uniforms[r]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[r]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[r]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[r]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[r]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[r]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[r]={type:"m4",value:s.toArray()}:t.uniforms[r]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case"t":this.uniforms[n].value=t[r.value]||null;break;case"c":this.uniforms[n].value=new st().setHex(r.value);break;case"v2":this.uniforms[n].value=new Ve().fromArray(r.value);break;case"v3":this.uniforms[n].value=new X().fromArray(r.value);break;case"v4":this.uniforms[n].value=new At().fromArray(r.value);break;case"m3":this.uniforms[n].value=new He().fromArray(r.value);break;case"m4":this.uniforms[n].value=new Ct().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class vp extends Kt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Mp extends Ba{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Lf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Sp extends Ba{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const ha=new X,da=new ur,yn=new X;class tu extends sn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ct,this.projectionMatrix=new Ct,this.projectionMatrixInverse=new Ct,this.coordinateSystem=Cn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ha,da,yn),yn.x===1&&yn.y===1&&yn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ha,da,yn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(ha,da,yn),yn.x===1&&yn.y===1&&yn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ha,da,yn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const oi=new X,Pl=new Ve,Dl=new Ve;class un extends tu{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=mo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ja*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return mo*2*Math.atan(Math.tan(ja*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){oi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(oi.x,oi.y).multiplyScalar(-e/oi.z),oi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(oi.x,oi.y).multiplyScalar(-e/oi.z)}getViewSize(e,t){return this.getViewBounds(e,Pl,Dl),t.subVectors(Dl,Pl)}setViewOffset(e,t,n,r,a,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ja*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,a=-.5*r;const s=this.view;if(this.view!==null&&this.view.enabled){const c=s.fullWidth,l=s.fullHeight;a+=s.offsetX*r/c,t-=s.offsetY*n/l,r*=s.width/c,n*=s.height/l}const o=this.filmOffset;o!==0&&(a+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Go extends tu{constructor(e=-1,t=1,n=1,r=-1,a=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=a,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,a,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let a=n-e,s=n+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=l*this.view.offsetX,s=a+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(a,s,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class nu extends Un{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}const Yi=-90,Ki=1;class bp extends sn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new un(Yi,Ki,e,t);r.layers=this.layers,this.add(r);const a=new un(Yi,Ki,e,t);a.layers=this.layers,this.add(a);const s=new un(Yi,Ki,e,t);s.layers=this.layers,this.add(s);const o=new un(Yi,Ki,e,t);o.layers=this.layers,this.add(o);const c=new un(Yi,Ki,e,t);c.layers=this.layers,this.add(c);const l=new un(Yi,Ki,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,a,s,o,c]=t;for(const l of t)this.remove(l);if(e===Cn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===La)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,s,o,c,l,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,1,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,2,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,h,p),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class Ep extends un{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class iu{static{iu.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){const a=this.elements;return a[0]=e,a[2]=t,a[1]=n,a[3]=r,this}}function Il(i,e,t,n){const r=yp(n);switch(t){case kc:return i*e;case Hc:return i*e/r.components*r.byteLength;case Io:return i*e/r.components*r.byteLength;case Li:return i*e*2/r.components*r.byteLength;case No:return i*e*2/r.components*r.byteLength;case Gc:return i*e*3/r.components*r.byteLength;case dn:return i*e*4/r.components*r.byteLength;case Uo:return i*e*4/r.components*r.byteLength;case Sa:case ba:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ea:case ya:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case zs:case Gs:return Math.max(i,16)*Math.max(e,8)/4;case Bs:case ks:return Math.max(i,8)*Math.max(e,8)/2;case Hs:case Vs:case Xs:case Ys:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ws:case Ta:case Ks:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case qs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Zs:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case $s:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Js:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Qs:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case js:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case eo:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case to:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case no:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case io:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case ro:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case ao:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case so:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case oo:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case lo:case co:case uo:return Math.ceil(i/4)*Math.ceil(e/4)*16;case ho:case fo:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Ra:case po:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function yp(i){switch(i){case an:case Fc:return{byteLength:1,components:1};case Pr:case Oc:case Nn:return{byteLength:2,components:1};case Po:case Do:return{byteLength:2,components:4};case In:case Lo:case Rn:return{byteLength:4,components:1};case Bc:case zc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Co}}));typeof window<"u"&&(window.__THREE__?Ge("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Co);function ru(){let i=null,e=!1,t=null,n=null;function r(a,s){n=i.requestAnimationFrame(r),t(a,s)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){i=a}}}function wp(i){const e=new WeakMap;function t(o,c){const l=o.array,u=o.usage,d=l.byteLength,h=i.createBuffer();i.bindBuffer(c,h),i.bufferData(c,l,u),o.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,c,l){const u=c.array,d=c.updateRanges;if(i.bindBuffer(l,o),d.length===0)i.bufferSubData(l,0,u);else{d.sort((p,_)=>p.start-_.start);let h=0;for(let p=1;p<d.length;p++){const _=d[h],x=d[p];x.start<=_.start+_.count+1?_.count=Math.max(_.count,x.start+x.count-_.start):(++h,d[h]=x)}d.length=h+1;for(let p=0,_=d.length;p<_;p++){const x=d[p];i.bufferSubData(l,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function s(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:r,remove:a,update:s}}var Ap=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Tp=`#ifdef USE_ALPHAHASH
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
#endif`,Rp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Cp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Lp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Pp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Dp=`#ifdef USE_AOMAP
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
#endif`,Ip=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Np=`#ifdef USE_BATCHING
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
#endif`,Up=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Fp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Op=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Bp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,zp=`#ifdef USE_IRIDESCENCE
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
#endif`,kp=`#ifdef USE_BUMPMAP
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
#endif`,Gp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Hp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Vp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Wp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Xp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Yp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Kp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,qp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Zp=`#define PI 3.141592653589793
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
} // validated`,$p=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Jp=`vec3 transformedNormal = objectNormal;
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
#endif`,Qp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,jp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,e0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,t0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,n0="gl_FragColor = linearToOutputTexel( gl_FragColor );",i0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,r0=`#ifdef USE_ENVMAP
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
#endif`,a0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,s0=`#ifdef USE_ENVMAP
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
#endif`,o0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,l0=`#ifdef USE_ENVMAP
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
#endif`,c0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,u0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,h0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,d0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,f0=`#ifdef USE_GRADIENTMAP
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
}`,p0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,m0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,g0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,_0=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,x0=`#ifdef USE_ENVMAP
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
#endif`,v0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,M0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,S0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,b0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,E0=`PhysicalMaterial material;
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
#endif`,y0=`uniform sampler2D dfgLUT;
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
}`,w0=`
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
#endif`,A0=`#if defined( RE_IndirectDiffuse )
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
#endif`,T0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,R0=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,C0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,L0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,P0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,D0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,I0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,N0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,U0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,F0=`#if defined( USE_POINTS_UV )
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
#endif`,O0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,B0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,z0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,k0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,G0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,H0=`#ifdef USE_MORPHTARGETS
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
#endif`,V0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,W0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,X0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Y0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,K0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,q0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Z0=`#ifdef USE_NORMALMAP
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
#endif`,$0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,J0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Q0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,j0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,em=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,tm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,nm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,im=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,rm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,am=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,sm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,om=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,lm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,cm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,um=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,hm=`float getShadowMask() {
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
}`,dm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,fm=`#ifdef USE_SKINNING
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
#endif`,pm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,mm=`#ifdef USE_SKINNING
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
#endif`,gm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,_m=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,xm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,vm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Mm=`#ifdef USE_TRANSMISSION
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
#endif`,Sm=`#ifdef USE_TRANSMISSION
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
#endif`,bm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Em=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ym=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,wm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Am=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Tm=`uniform sampler2D t2D;
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
}`,Rm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Cm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Lm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Pm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dm=`#include <common>
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
}`,Im=`#if DEPTH_PACKING == 3200
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
}`,Nm=`#define DISTANCE
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
}`,Um=`#define DISTANCE
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
}`,Fm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Om=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bm=`uniform float scale;
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
}`,zm=`uniform vec3 diffuse;
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
}`,km=`#include <common>
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
}`,Gm=`uniform vec3 diffuse;
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
}`,Hm=`#define LAMBERT
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
}`,Vm=`#define LAMBERT
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
}`,Wm=`#define MATCAP
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
}`,Xm=`#define MATCAP
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
}`,Ym=`#define NORMAL
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
}`,Km=`#define NORMAL
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
}`,qm=`#define PHONG
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
}`,Zm=`#define PHONG
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
}`,$m=`#define STANDARD
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
}`,Jm=`#define STANDARD
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
}`,Qm=`#define TOON
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
}`,jm=`#define TOON
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
}`,eg=`uniform float size;
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
}`,tg=`uniform vec3 diffuse;
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
}`,ng=`#include <common>
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
}`,ig=`uniform vec3 color;
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
}`,rg=`uniform float rotation;
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
}`,ag=`uniform vec3 diffuse;
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
}`,Je={alphahash_fragment:Ap,alphahash_pars_fragment:Tp,alphamap_fragment:Rp,alphamap_pars_fragment:Cp,alphatest_fragment:Lp,alphatest_pars_fragment:Pp,aomap_fragment:Dp,aomap_pars_fragment:Ip,batching_pars_vertex:Np,batching_vertex:Up,begin_vertex:Fp,beginnormal_vertex:Op,bsdfs:Bp,iridescence_fragment:zp,bumpmap_pars_fragment:kp,clipping_planes_fragment:Gp,clipping_planes_pars_fragment:Hp,clipping_planes_pars_vertex:Vp,clipping_planes_vertex:Wp,color_fragment:Xp,color_pars_fragment:Yp,color_pars_vertex:Kp,color_vertex:qp,common:Zp,cube_uv_reflection_fragment:$p,defaultnormal_vertex:Jp,displacementmap_pars_vertex:Qp,displacementmap_vertex:jp,emissivemap_fragment:e0,emissivemap_pars_fragment:t0,colorspace_fragment:n0,colorspace_pars_fragment:i0,envmap_fragment:r0,envmap_common_pars_fragment:a0,envmap_pars_fragment:s0,envmap_pars_vertex:o0,envmap_physical_pars_fragment:x0,envmap_vertex:l0,fog_vertex:c0,fog_pars_vertex:u0,fog_fragment:h0,fog_pars_fragment:d0,gradientmap_pars_fragment:f0,lightmap_pars_fragment:p0,lights_lambert_fragment:m0,lights_lambert_pars_fragment:g0,lights_pars_begin:_0,lights_toon_fragment:v0,lights_toon_pars_fragment:M0,lights_phong_fragment:S0,lights_phong_pars_fragment:b0,lights_physical_fragment:E0,lights_physical_pars_fragment:y0,lights_fragment_begin:w0,lights_fragment_maps:A0,lights_fragment_end:T0,lightprobes_pars_fragment:R0,logdepthbuf_fragment:C0,logdepthbuf_pars_fragment:L0,logdepthbuf_pars_vertex:P0,logdepthbuf_vertex:D0,map_fragment:I0,map_pars_fragment:N0,map_particle_fragment:U0,map_particle_pars_fragment:F0,metalnessmap_fragment:O0,metalnessmap_pars_fragment:B0,morphinstance_vertex:z0,morphcolor_vertex:k0,morphnormal_vertex:G0,morphtarget_pars_vertex:H0,morphtarget_vertex:V0,normal_fragment_begin:W0,normal_fragment_maps:X0,normal_pars_fragment:Y0,normal_pars_vertex:K0,normal_vertex:q0,normalmap_pars_fragment:Z0,clearcoat_normal_fragment_begin:$0,clearcoat_normal_fragment_maps:J0,clearcoat_pars_fragment:Q0,iridescence_pars_fragment:j0,opaque_fragment:em,packing:tm,premultiplied_alpha_fragment:nm,project_vertex:im,dithering_fragment:rm,dithering_pars_fragment:am,roughnessmap_fragment:sm,roughnessmap_pars_fragment:om,shadowmap_pars_fragment:lm,shadowmap_pars_vertex:cm,shadowmap_vertex:um,shadowmask_pars_fragment:hm,skinbase_vertex:dm,skinning_pars_vertex:fm,skinning_vertex:pm,skinnormal_vertex:mm,specularmap_fragment:gm,specularmap_pars_fragment:_m,tonemapping_fragment:xm,tonemapping_pars_fragment:vm,transmission_fragment:Mm,transmission_pars_fragment:Sm,uv_pars_fragment:bm,uv_pars_vertex:Em,uv_vertex:ym,worldpos_vertex:wm,background_vert:Am,background_frag:Tm,backgroundCube_vert:Rm,backgroundCube_frag:Cm,cube_vert:Lm,cube_frag:Pm,depth_vert:Dm,depth_frag:Im,distance_vert:Nm,distance_frag:Um,equirect_vert:Fm,equirect_frag:Om,linedashed_vert:Bm,linedashed_frag:zm,meshbasic_vert:km,meshbasic_frag:Gm,meshlambert_vert:Hm,meshlambert_frag:Vm,meshmatcap_vert:Wm,meshmatcap_frag:Xm,meshnormal_vert:Ym,meshnormal_frag:Km,meshphong_vert:qm,meshphong_frag:Zm,meshphysical_vert:$m,meshphysical_frag:Jm,meshtoon_vert:Qm,meshtoon_frag:jm,points_vert:eg,points_frag:tg,shadow_vert:ng,shadow_frag:ig,sprite_vert:rg,sprite_frag:ag},_e={common:{diffuse:{value:new st(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},envMapRotation:{value:new He},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new Ve(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new st(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new X},probesMax:{value:new X},probesResolution:{value:new X}},points:{diffuse:{value:new st(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new st(16777215)},opacity:{value:1},center:{value:new Ve(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},Tn={basic:{uniforms:Zt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.fog]),vertexShader:Je.meshbasic_vert,fragmentShader:Je.meshbasic_frag},lambert:{uniforms:Zt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new st(0)},envMapIntensity:{value:1}}]),vertexShader:Je.meshlambert_vert,fragmentShader:Je.meshlambert_frag},phong:{uniforms:Zt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new st(0)},specular:{value:new st(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Je.meshphong_vert,fragmentShader:Je.meshphong_frag},standard:{uniforms:Zt([_e.common,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.roughnessmap,_e.metalnessmap,_e.fog,_e.lights,{emissive:{value:new st(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Je.meshphysical_vert,fragmentShader:Je.meshphysical_frag},toon:{uniforms:Zt([_e.common,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.gradientmap,_e.fog,_e.lights,{emissive:{value:new st(0)}}]),vertexShader:Je.meshtoon_vert,fragmentShader:Je.meshtoon_frag},matcap:{uniforms:Zt([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,{matcap:{value:null}}]),vertexShader:Je.meshmatcap_vert,fragmentShader:Je.meshmatcap_frag},points:{uniforms:Zt([_e.points,_e.fog]),vertexShader:Je.points_vert,fragmentShader:Je.points_frag},dashed:{uniforms:Zt([_e.common,_e.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Je.linedashed_vert,fragmentShader:Je.linedashed_frag},depth:{uniforms:Zt([_e.common,_e.displacementmap]),vertexShader:Je.depth_vert,fragmentShader:Je.depth_frag},normal:{uniforms:Zt([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,{opacity:{value:1}}]),vertexShader:Je.meshnormal_vert,fragmentShader:Je.meshnormal_frag},sprite:{uniforms:Zt([_e.sprite,_e.fog]),vertexShader:Je.sprite_vert,fragmentShader:Je.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Je.background_vert,fragmentShader:Je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new He}},vertexShader:Je.backgroundCube_vert,fragmentShader:Je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Je.cube_vert,fragmentShader:Je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Je.equirect_vert,fragmentShader:Je.equirect_frag},distance:{uniforms:Zt([_e.common,_e.displacementmap,{referencePosition:{value:new X},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Je.distance_vert,fragmentShader:Je.distance_frag},shadow:{uniforms:Zt([_e.lights,_e.fog,{color:{value:new st(0)},opacity:{value:1}}]),vertexShader:Je.shadow_vert,fragmentShader:Je.shadow_frag}};Tn.physical={uniforms:Zt([Tn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new Ve(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new st(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new Ve},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new st(0)},specularColor:{value:new st(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new Ve},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:Je.meshphysical_vert,fragmentShader:Je.meshphysical_frag};const fa={r:0,b:0,g:0},sg=new Ct,au=new He;au.set(-1,0,0,0,1,0,0,0,1);function og(i,e,t,n,r,a){const s=new st(0);let o=r===!0?0:1,c,l,u=null,d=0,h=null;function p(M){let E=M.isScene===!0?M.background:null;if(E&&E.isTexture){const b=M.backgroundBlurriness>0;E=e.get(E,b)}return E}function _(M){let E=!1;const b=p(M);b===null?g(s,o):b&&b.isColor&&(g(b,1),E=!0);const R=i.xr.getEnvironmentBlendMode();R==="additive"?t.buffers.color.setClear(0,0,0,1,a):R==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,a),(i.autoClear||E)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function x(M,E){const b=p(E);b&&(b.isCubeTexture||b.mapping===Oa)?(l===void 0&&(l=new Jt(new zr(1,1,1),new Kt({name:"BackgroundCubeMaterial",uniforms:lr(Tn.backgroundCube.uniforms),vertexShader:Tn.backgroundCube.vertexShader,fragmentShader:Tn.backgroundCube.fragmentShader,side:en,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(R,w,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=b,l.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(sg.makeRotationFromEuler(E.backgroundRotation)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(au),l.material.toneMapped=et.getTransfer(b.colorSpace)!==ft,(u!==b||d!==b.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,u=b,d=b.version,h=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null)):b&&b.isTexture&&(c===void 0&&(c=new Jt(new Fn(2,2),new Kt({name:"BackgroundMaterial",uniforms:lr(Tn.background.uniforms),vertexShader:Tn.background.vertexShader,fragmentShader:Tn.background.fragmentShader,side:Ri,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=b,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.toneMapped=et.getTransfer(b.colorSpace)!==ft,b.matrixAutoUpdate===!0&&b.updateMatrix(),c.material.uniforms.uvTransform.value.copy(b.matrix),(u!==b||d!==b.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,u=b,d=b.version,h=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function g(M,E){M.getRGB(fa,eu(i)),t.buffers.color.setClear(fa.r,fa.g,fa.b,E,a)}function m(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return s},setClearColor:function(M,E=1){s.set(M),o=E,g(s,o)},getClearAlpha:function(){return o},setClearAlpha:function(M){o=M,g(s,o)},render:_,addToRenderList:x,dispose:m}}function lg(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=h(null);let a=r,s=!1;function o(C,O,F,D,B){let W=!1;const $=d(C,D,F,O);a!==$&&(a=$,l(a.object)),W=p(C,D,F,B),W&&_(C,D,F,B),B!==null&&e.update(B,i.ELEMENT_ARRAY_BUFFER),(W||s)&&(s=!1,b(C,O,F,D),B!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function c(){return i.createVertexArray()}function l(C){return i.bindVertexArray(C)}function u(C){return i.deleteVertexArray(C)}function d(C,O,F,D){const B=D.wireframe===!0;let W=n[O.id];W===void 0&&(W={},n[O.id]=W);const $=C.isInstancedMesh===!0?C.id:0;let ae=W[$];ae===void 0&&(ae={},W[$]=ae);let q=ae[F.id];q===void 0&&(q={},ae[F.id]=q);let ee=q[B];return ee===void 0&&(ee=h(c()),q[B]=ee),ee}function h(C){const O=[],F=[],D=[];for(let B=0;B<t;B++)O[B]=0,F[B]=0,D[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:F,attributeDivisors:D,object:C,attributes:{},index:null}}function p(C,O,F,D){const B=a.attributes,W=O.attributes;let $=0;const ae=F.getAttributes();for(const q in ae)if(ae[q].location>=0){const N=B[q];let re=W[q];if(re===void 0&&(q==="instanceMatrix"&&C.instanceMatrix&&(re=C.instanceMatrix),q==="instanceColor"&&C.instanceColor&&(re=C.instanceColor)),N===void 0||N.attribute!==re||re&&N.data!==re.data)return!0;$++}return a.attributesNum!==$||a.index!==D}function _(C,O,F,D){const B={},W=O.attributes;let $=0;const ae=F.getAttributes();for(const q in ae)if(ae[q].location>=0){let N=W[q];N===void 0&&(q==="instanceMatrix"&&C.instanceMatrix&&(N=C.instanceMatrix),q==="instanceColor"&&C.instanceColor&&(N=C.instanceColor));const re={};re.attribute=N,N&&N.data&&(re.data=N.data),B[q]=re,$++}a.attributes=B,a.attributesNum=$,a.index=D}function x(){const C=a.newAttributes;for(let O=0,F=C.length;O<F;O++)C[O]=0}function g(C){m(C,0)}function m(C,O){const F=a.newAttributes,D=a.enabledAttributes,B=a.attributeDivisors;F[C]=1,D[C]===0&&(i.enableVertexAttribArray(C),D[C]=1),B[C]!==O&&(i.vertexAttribDivisor(C,O),B[C]=O)}function M(){const C=a.newAttributes,O=a.enabledAttributes;for(let F=0,D=O.length;F<D;F++)O[F]!==C[F]&&(i.disableVertexAttribArray(F),O[F]=0)}function E(C,O,F,D,B,W,$){$===!0?i.vertexAttribIPointer(C,O,F,B,W):i.vertexAttribPointer(C,O,F,D,B,W)}function b(C,O,F,D){x();const B=D.attributes,W=F.getAttributes(),$=O.defaultAttributeValues;for(const ae in W){const q=W[ae];if(q.location>=0){let ee=B[ae];if(ee===void 0&&(ae==="instanceMatrix"&&C.instanceMatrix&&(ee=C.instanceMatrix),ae==="instanceColor"&&C.instanceColor&&(ee=C.instanceColor)),ee!==void 0){const N=ee.normalized,re=ee.itemSize,ce=e.get(ee);if(ce===void 0)continue;const Re=ce.buffer,Oe=ce.type,ke=ce.bytesPerElement,j=Oe===i.INT||Oe===i.UNSIGNED_INT||ee.gpuType===Lo;if(ee.isInterleavedBufferAttribute){const ie=ee.data,H=ie.stride,ue=ee.offset;if(ie.isInstancedInterleavedBuffer){for(let se=0;se<q.locationSize;se++)m(q.location+se,ie.meshPerAttribute);C.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let se=0;se<q.locationSize;se++)g(q.location+se);i.bindBuffer(i.ARRAY_BUFFER,Re);for(let se=0;se<q.locationSize;se++)E(q.location+se,re/q.locationSize,Oe,N,H*ke,(ue+re/q.locationSize*se)*ke,j)}else{if(ee.isInstancedBufferAttribute){for(let ie=0;ie<q.locationSize;ie++)m(q.location+ie,ee.meshPerAttribute);C.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let ie=0;ie<q.locationSize;ie++)g(q.location+ie);i.bindBuffer(i.ARRAY_BUFFER,Re);for(let ie=0;ie<q.locationSize;ie++)E(q.location+ie,re/q.locationSize,Oe,N,re*ke,re/q.locationSize*ie*ke,j)}}else if($!==void 0){const N=$[ae];if(N!==void 0)switch(N.length){case 2:i.vertexAttrib2fv(q.location,N);break;case 3:i.vertexAttrib3fv(q.location,N);break;case 4:i.vertexAttrib4fv(q.location,N);break;default:i.vertexAttrib1fv(q.location,N)}}}}M()}function R(){T();for(const C in n){const O=n[C];for(const F in O){const D=O[F];for(const B in D){const W=D[B];for(const $ in W)u(W[$].object),delete W[$];delete D[B]}}delete n[C]}}function w(C){if(n[C.id]===void 0)return;const O=n[C.id];for(const F in O){const D=O[F];for(const B in D){const W=D[B];for(const $ in W)u(W[$].object),delete W[$];delete D[B]}}delete n[C.id]}function P(C){for(const O in n){const F=n[O];for(const D in F){const B=F[D];if(B[C.id]===void 0)continue;const W=B[C.id];for(const $ in W)u(W[$].object),delete W[$];delete B[C.id]}}}function S(C){for(const O in n){const F=n[O],D=C.isInstancedMesh===!0?C.id:0,B=F[D];if(B!==void 0){for(const W in B){const $=B[W];for(const ae in $)u($[ae].object),delete $[ae];delete B[W]}delete F[D],Object.keys(F).length===0&&delete n[O]}}}function T(){I(),s=!0,a!==r&&(a=r,l(a.object))}function I(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:T,resetDefaultState:I,dispose:R,releaseStatesOfGeometry:w,releaseStatesOfObject:S,releaseStatesOfProgram:P,initAttributes:x,enableAttribute:g,disableUnusedAttributes:M}}function cg(i,e,t){let n;function r(c){n=c}function a(c,l){i.drawArrays(n,c,l),t.update(l,n,1)}function s(c,l,u){u!==0&&(i.drawArraysInstanced(n,c,l,u),t.update(l,n,u))}function o(c,l,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,u);let h=0;for(let p=0;p<u;p++)h+=l[p];t.update(h,n,1)}this.setMode=r,this.render=a,this.renderInstances=s,this.renderMultiDraw=o}function ug(i,e,t,n){let r;function a(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function s(P){return!(P!==dn&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){const S=P===Nn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==an&&P!==Rn&&!S&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(P){if(P==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(Ge("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const d=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&Ge("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),b=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),R=i.getParameter(i.MAX_SAMPLES),w=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:s,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:p,maxVertexTextures:_,maxTextureSize:x,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:M,maxVaryings:E,maxFragmentUniforms:b,maxSamples:R,samples:w}}function hg(i){const e=this;let t=null,n=0,r=!1,a=!1;const s=new li,o=new He,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const p=d.length!==0||h||n!==0||r;return r=h,n=d.length,p},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,p){const _=d.clippingPlanes,x=d.clipIntersection,g=d.clipShadows,m=i.get(d);if(!r||_===null||_.length===0||a&&!g)a?u(null):l();else{const M=a?0:n,E=M*4;let b=m.clippingState||null;c.value=b,b=u(_,h,E,p);for(let R=0;R!==E;++R)b[R]=t[R];m.clippingState=b,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,h,p,_){const x=d!==null?d.length:0;let g=null;if(x!==0){if(g=c.value,_!==!0||g===null){const m=p+x*4,M=h.matrixWorldInverse;o.getNormalMatrix(M),(g===null||g.length<m)&&(g=new Float32Array(m));for(let E=0,b=p;E!==x;++E,b+=4)s.copy(d[E]).applyMatrix4(M,o),s.normal.toArray(g,b),g[b+3]=s.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,g}}const er=4,dg=6,fg=20,pg=256,Sr=new Go,Nl=new st;let Ss=null,bs=0,Es=0,ys=!1;const mg=new X,xi=new X;class Ul{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,a={}){const{size:s=256,position:o=mg}=a;Ss=this._renderer.getRenderTarget(),bs=this._renderer.getActiveCubeFace(),Es=this._renderer.getActiveMipmapLevel(),ys=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(s);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,r,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Bl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ol(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ss,bs,Es),this._renderer.xr.enabled=ys,e.scissorTest=!1,qi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ci||e.mapping===or?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ss=this._renderer.getRenderTarget(),bs=this._renderer.getActiveCubeFace(),Es=this._renderer.getActiveMipmapLevel(),ys=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Pt,minFilter:Pt,generateMipmaps:!1,type:Nn,format:dn,colorSpace:Ir,depthBuffer:!1},r=Fl(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Fl(e,t,n);const{_lodMax:a}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=gg(a)),this._blurMaterial=xg(a,e,t),this._ggxMaterial=_g(a,e,t)}return r}_compileMaterial(e){const t=new Jt(new Un,e);this._renderer.compile(t,Sr)}_sceneToCubeUV(e,t,n,r,a){const c=new un(90,1,t,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,p=d.toneMapping;d.getClearColor(Nl),d.toneMapping=Ln,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Jt(new zr,new $c({name:"PMREM.Background",side:en,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,g=x.material;let m=!1;const M=e.background;M?M.isColor&&(g.color.copy(M),e.background=null,m=!0):(g.color.copy(Nl),m=!0);for(let E=0;E<6;E++){const b=E%3;b===0?(c.up.set(0,l[E],0),c.position.set(a.x,a.y,a.z),c.lookAt(a.x+u[E],a.y,a.z)):b===1?(c.up.set(0,0,l[E]),c.position.set(a.x,a.y,a.z),c.lookAt(a.x,a.y+u[E],a.z)):(c.up.set(0,l[E],0),c.position.set(a.x,a.y,a.z),c.lookAt(a.x,a.y,a.z+u[E]));const R=this._cubeSize;qi(r,b*R,E>2?R:0,R,R),d.setRenderTarget(r),m&&d.render(x,c),d.render(e,c)}d.toneMapping=p,d.autoClear=h,e.background=M}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===Ci||e.mapping===or;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Bl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ol());const a=r?this._cubemapMaterial:this._equirectMaterial,s=this._lodMeshes[0];s.material=a;const o=a.uniforms;o.envMap.value=e;const c=this._cubeSize;qi(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(s,Sr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let a=1;a<r;a++)this._applyGGXFilter(e,a-1,a);t.autoClear=n}_applyGGXFilter(e,t,n){const r=this._renderer,a=this._pingPongRenderTarget,s=this._ggxMaterial,o=this._lodMeshes[n];o.material=s;const c=s.uniforms,l=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(l*l-u*u),h=l*1.25,p=d*h,{_lodMax:_}=this,x=this._sizeLods[n],g=3*x*(n>_-er?n-_+er:0),m=4*(this._cubeSize-x);c.envMap.value=e.texture,c.roughness.value=p,c.mipInt.value=_-t,qi(a,g,m,3*x,2*x),r.setRenderTarget(a),r.render(o,Sr),c.envMap.value=a.texture,c.roughness.value=0,c.mipInt.value=_-n,qi(e,g,m,3*x,2*x),r.setRenderTarget(e),r.render(o,Sr)}_blur(e,t,n,r){const a=this._pingPongRenderTarget,s=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,a,t,n,s),this._blurPass(a,e,n,n,s)}_blurPass(e,t,n,r,a){const s=this._renderer,o=this._blurMaterial,c=this._lodMeshes[r];c.material=o;const l=o.uniforms;l.envMap.value=e.texture,l.sigma.value=a,l.mipInt.value=this._lodMax-n;const u=this._sizeLods[r],d=3*u*(r>this._lodMax-er?r-this._lodMax+er:0),h=4*(this._cubeSize-u);qi(t,d,h,3*u,2*u),s.setRenderTarget(t),s.render(c,Sr)}}function gg(i){const e=[],t=[];let n=i;const r=i-er+1+dg;for(let a=0;a<r;a++){const s=Math.pow(2,n);e.push(s);const o=1/(s-2),c=-o,l=1+o,u=[c,c,l,c,l,l,c,c,l,l,c,l],d=6,h=6,p=3,_=new Float32Array(p*h*d),x=new Float32Array(p*h*d);for(let m=0;m<d;m++){const M=m%3*2/3-1,E=m>2?0:-1,b=[M,E,0,M+2/3,E,0,M+2/3,E+1,0,M,E,0,M+2/3,E+1,0,M,E+1,0];_.set(b,p*h*m);for(let R=0;R<h;R++){const w=u[R*2]*2-1,P=u[R*2+1]*2-1;m===0?xi.set(1,P,w):m===1?xi.set(-w,1,-P):m===2?xi.set(-w,P,1):m===3?xi.set(-1,P,-w):m===4?xi.set(-w,-1,P):xi.set(w,P,-1),xi.toArray(x,(m*h+R)*p)}}const g=new Un;g.setAttribute("position",new Pn(_,p)),g.setAttribute("outputDirection",new Pn(x,p)),t.push(new Jt(g,null)),n>er&&n--}return{lodMeshes:t,sizeLods:e}}function Fl(i,e,t){const n=new fn(i,e,t);return n.texture.mapping=Oa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function qi(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function _g(i,e,t){return new Kt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:pg,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:za(),fragmentShader:`

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
		`,blending:qn,depthTest:!1,depthWrite:!1})}function xg(i,e,t){return new Kt({name:"SphericalGaussianBlur",defines:{SAMPLES:fg,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:za(),fragmentShader:`

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
		`,blending:qn,depthTest:!1,depthWrite:!1})}function Ol(){return new Kt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:za(),fragmentShader:`

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
		`,blending:qn,depthTest:!1,depthWrite:!1})}function Bl(){return new Kt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:za(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:qn,depthTest:!1,depthWrite:!1})}function za(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class su extends fn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Qc(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new zr(5,5,5),a=new Kt({name:"CubemapFromEquirect",uniforms:lr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:en,blending:qn});a.uniforms.tEquirect.value=t;const s=new Jt(r,a),o=t.minFilter;return t.minFilter===bi&&(t.minFilter=Pt),new bp(1,10,this).update(e,s),t.minFilter=o,s.geometry.dispose(),s.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){const a=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,n,r);e.setRenderTarget(a)}}function vg(i){let e=new WeakMap,t=new WeakMap,n=null;function r(h,p=!1){return h==null?null:p?s(h):a(h)}function a(h){if(h&&h.isTexture){const p=h.mapping;if(p===Za||p===$a)if(e.has(h)){const _=e.get(h).texture;return o(_,h.mapping)}else{const _=h.image;if(_&&_.height>0){const x=new su(_.height);return x.fromEquirectangularTexture(i,h),e.set(h,x),h.addEventListener("dispose",l),o(x.texture,h.mapping)}else return null}}return h}function s(h){if(h&&h.isTexture){const p=h.mapping,_=p===Za||p===$a,x=p===Ci||p===or;if(_||x){let g=t.get(h);const m=g!==void 0?g.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==m)return n===null&&(n=new Ul(i)),g=_?n.fromEquirectangular(h,g):n.fromCubemap(h,g),g.texture.pmremVersion=h.pmremVersion,t.set(h,g),g.texture;if(g!==void 0)return g.texture;{const M=h.image;return _&&M&&M.height>0||x&&M&&c(M)?(n===null&&(n=new Ul(i)),g=_?n.fromEquirectangular(h):n.fromCubemap(h),g.texture.pmremVersion=h.pmremVersion,t.set(h,g),h.addEventListener("dispose",u),g.texture):null}}}return h}function o(h,p){return p===Za?h.mapping=Ci:p===$a&&(h.mapping=or),h}function c(h){let p=0;const _=6;for(let x=0;x<_;x++)h[x]!==void 0&&p++;return p===_}function l(h){const p=h.target;p.removeEventListener("dispose",l);const _=e.get(p);_!==void 0&&(e.delete(p),_.dispose())}function u(h){const p=h.target;p.removeEventListener("dispose",u);const _=t.get(p);_!==void 0&&(t.delete(p),_.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:d}}function Mg(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&nr("WebGLRenderer: "+n+" extension not supported."),r}}}function Sg(i,e,t,n){const r={},a=new WeakMap;function s(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const _ in h.attributes)e.remove(h.attributes[_]);h.removeEventListener("dispose",s),delete r[h.id];const p=a.get(h);p&&(e.remove(p),a.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(d,h){return r[h.id]===!0||(h.addEventListener("dispose",s),r[h.id]=!0,t.memory.geometries++),h}function c(d){const h=d.attributes;for(const p in h)e.update(h[p],i.ARRAY_BUFFER)}function l(d){const h=[],p=d.index,_=d.attributes.position;let x=0;if(_===void 0)return;if(p!==null){const M=p.array;x=p.version;for(let E=0,b=M.length;E<b;E+=3){const R=M[E+0],w=M[E+1],P=M[E+2];h.push(R,w,w,P,P,R)}}else{const M=_.array;x=_.version;for(let E=0,b=M.length/3-1;E<b;E+=3){const R=E+0,w=E+1,P=E+2;h.push(R,w,w,P,P,R)}}const g=new(_.count>=65535?Zc:qc)(h,1);g.version=x;const m=a.get(d);m&&e.remove(m),a.set(d,g)}function u(d){const h=a.get(d);if(h){const p=d.index;p!==null&&h.version<p.version&&l(d)}else l(d);return a.get(d)}return{get:o,update:c,getWireframeAttribute:u}}function bg(i,e,t){let n;function r(d){n=d}let a,s;function o(d){a=d.type,s=d.bytesPerElement}function c(d,h){i.drawElements(n,h,a,d*s),t.update(h,n,1)}function l(d,h,p){p!==0&&(i.drawElementsInstanced(n,h,a,d*s,p),t.update(h,n,p))}function u(d,h,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,a,d,0,p);let x=0;for(let g=0;g<p;g++)x+=h[g];t.update(x,n,1)}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Eg(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(a,s,o){switch(t.calls++,s){case i.TRIANGLES:t.triangles+=o*(a/3);break;case i.LINES:t.lines+=o*(a/2);break;case i.LINE_STRIP:t.lines+=o*(a-1);break;case i.LINE_LOOP:t.lines+=o*a;break;case i.POINTS:t.points+=o*a;break;default:rt("WebGLInfo: Unknown draw mode:",s);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function yg(i,e,t){const n=new WeakMap,r=new At;function a(s,o,c){const l=s.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let h=n.get(o);if(h===void 0||h.count!==d){let T=function(){P.dispose(),n.delete(o),o.removeEventListener("dispose",T)};h!==void 0&&h.texture.dispose();const p=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let E=0;p===!0&&(E=1),_===!0&&(E=2),x===!0&&(E=3);let b=o.attributes.position.count*E,R=1;b>e.maxTextureSize&&(R=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const w=new Float32Array(b*R*4*d),P=new Xc(w,b,R,d);P.type=Rn,P.needsUpdate=!0;const S=E*4;for(let I=0;I<d;I++){const C=g[I],O=m[I],F=M[I],D=b*R*4*I;for(let B=0;B<C.count;B++){const W=B*S;p===!0&&(r.fromBufferAttribute(C,B),w[D+W+0]=r.x,w[D+W+1]=r.y,w[D+W+2]=r.z,w[D+W+3]=0),_===!0&&(r.fromBufferAttribute(O,B),w[D+W+4]=r.x,w[D+W+5]=r.y,w[D+W+6]=r.z,w[D+W+7]=0),x===!0&&(r.fromBufferAttribute(F,B),w[D+W+8]=r.x,w[D+W+9]=r.y,w[D+W+10]=r.z,w[D+W+11]=F.itemSize===4?r.w:1)}}h={count:d,texture:P,size:new Ve(b,R)},n.set(o,h),o.addEventListener("dispose",T)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",s.morphTexture,t);else{let p=0;for(let x=0;x<l.length;x++)p+=l[x];const _=o.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:a}}function wg(i,e,t,n,r){let a=new WeakMap;function s(l){const u=r.render.frame,d=l.geometry,h=e.get(l,d);if(a.get(h)!==u&&(e.update(h),a.set(h,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),a.get(l)!==u&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),a.set(l,u))),l.isSkinnedMesh){const p=l.skeleton;a.get(p)!==u&&(p.update(),a.set(p,u))}return h}function o(){a=new WeakMap}function c(l){const u=l.target;u.removeEventListener("dispose",c),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:s,dispose:o}}const Ag={[Rc]:"LINEAR_TONE_MAPPING",[Cc]:"REINHARD_TONE_MAPPING",[Lc]:"CINEON_TONE_MAPPING",[Pc]:"ACES_FILMIC_TONE_MAPPING",[Ic]:"AGX_TONE_MAPPING",[Nc]:"NEUTRAL_TONE_MAPPING",[Dc]:"CUSTOM_TONE_MAPPING"};function Tg(i,e,t,n,r,a){const s=new fn(e,t,{type:i,depthBuffer:r,stencilBuffer:a,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,c=null;const l=new Un;l.setAttribute("position",new $n([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new $n([0,2,0,0,2,0],2));const u=new vp({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new Jt(l,u),h=new Go(-1,1,1,-1,0,1);let p=null,_=null,x=!1,g,m=null,M=[],E=!1;this.setSize=function(b,R){s.setSize(b,R),o!==null&&o.setSize(b,R),c!==null&&c.setSize(b,R);for(let w=0;w<M.length;w++){const P=M[w];P.setSize&&P.setSize(b,R)}},this.setEffects=function(b){M=b,E=M.length>0&&M[0].isRenderPass===!0;const R=s.width,w=s.height;M.length>0&&o===null&&(o=new fn(R,w,{type:Nn,depthBuffer:!1,stencilBuffer:!1}),c=new fn(R,w,{type:Nn,depthBuffer:!1,stencilBuffer:!1}));for(let P=0;P<M.length;P++){const S=M[P];S.setSize&&S.setSize(R,w)}},this.begin=function(b,R){if(x||b.toneMapping===Ln&&M.length===0)return!1;if(m=R,R!==null){const w=R.width,P=R.height;(s.width!==w||s.height!==P)&&this.setSize(w,P)}return E===!1&&b.setRenderTarget(s),g=b.toneMapping,b.toneMapping=Ln,!0},this.hasRenderPass=function(){return E},this.end=function(b,R){b.toneMapping=g,x=!0;let w=s,P=o;for(let S=0;S<M.length;S++){const T=M[S];T.enabled!==!1&&(T.render(b,P,w,R),T.needsSwap!==!1&&(w=P,P=P===o?c:o))}if(p!==b.outputColorSpace||_!==b.toneMapping){p=b.outputColorSpace,_=b.toneMapping,u.defines={},et.getTransfer(p)===ft&&(u.defines.SRGB_TRANSFER="");const S=Ag[_];S&&(u.defines[S]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=w.texture,b.setRenderTarget(m),b.render(d,h),m=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){s.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}const ou=new $t,go=new Nr(1,1),lu=new Xc,cu=new $f,uu=new Qc,zl=[],kl=[],Gl=new Float32Array(16),Hl=new Float32Array(9),Vl=new Float32Array(4);function dr(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let a=zl[r];if(a===void 0&&(a=new Float32Array(r),zl[r]=a),e!==0){n.toArray(a,0);for(let s=1,o=0;s!==e;++s)o+=t,i[s].toArray(a,o)}return a}function Ft(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Ot(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function ka(i,e){let t=kl[e];t===void 0&&(t=new Int32Array(e),kl[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Rg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Cg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;i.uniform2fv(this.addr,e),Ot(t,e)}}function Lg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ft(t,e))return;i.uniform3fv(this.addr,e),Ot(t,e)}}function Pg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;i.uniform4fv(this.addr,e),Ot(t,e)}}function Dg(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ft(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Ot(t,e)}else{if(Ft(t,n))return;Vl.set(n),i.uniformMatrix2fv(this.addr,!1,Vl),Ot(t,n)}}function Ig(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ft(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Ot(t,e)}else{if(Ft(t,n))return;Hl.set(n),i.uniformMatrix3fv(this.addr,!1,Hl),Ot(t,n)}}function Ng(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ft(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Ot(t,e)}else{if(Ft(t,n))return;Gl.set(n),i.uniformMatrix4fv(this.addr,!1,Gl),Ot(t,n)}}function Ug(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Fg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;i.uniform2iv(this.addr,e),Ot(t,e)}}function Og(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ft(t,e))return;i.uniform3iv(this.addr,e),Ot(t,e)}}function Bg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;i.uniform4iv(this.addr,e),Ot(t,e)}}function zg(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function kg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;i.uniform2uiv(this.addr,e),Ot(t,e)}}function Gg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ft(t,e))return;i.uniform3uiv(this.addr,e),Ot(t,e)}}function Hg(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;i.uniform4uiv(this.addr,e),Ot(t,e)}}function Vg(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let a;this.type===i.SAMPLER_2D_SHADOW?(go.compareFunction=t.isReversedDepthBuffer()?Oo:Fo,a=go):a=ou,t.setTexture2D(e||a,r)}function Wg(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||cu,r)}function Xg(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||uu,r)}function Yg(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||lu,r)}function Kg(i){switch(i){case 5126:return Rg;case 35664:return Cg;case 35665:return Lg;case 35666:return Pg;case 35674:return Dg;case 35675:return Ig;case 35676:return Ng;case 5124:case 35670:return Ug;case 35667:case 35671:return Fg;case 35668:case 35672:return Og;case 35669:case 35673:return Bg;case 5125:return zg;case 36294:return kg;case 36295:return Gg;case 36296:return Hg;case 35678:case 36198:case 36298:case 36306:case 35682:return Vg;case 35679:case 36299:case 36307:return Wg;case 35680:case 36300:case 36308:case 36293:return Xg;case 36289:case 36303:case 36311:case 36292:return Yg}}function qg(i,e){i.uniform1fv(this.addr,e)}function Zg(i,e){const t=dr(e,this.size,2);i.uniform2fv(this.addr,t)}function $g(i,e){const t=dr(e,this.size,3);i.uniform3fv(this.addr,t)}function Jg(i,e){const t=dr(e,this.size,4);i.uniform4fv(this.addr,t)}function Qg(i,e){const t=dr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function jg(i,e){const t=dr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function e1(i,e){const t=dr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function t1(i,e){i.uniform1iv(this.addr,e)}function n1(i,e){i.uniform2iv(this.addr,e)}function i1(i,e){i.uniform3iv(this.addr,e)}function r1(i,e){i.uniform4iv(this.addr,e)}function a1(i,e){i.uniform1uiv(this.addr,e)}function s1(i,e){i.uniform2uiv(this.addr,e)}function o1(i,e){i.uniform3uiv(this.addr,e)}function l1(i,e){i.uniform4uiv(this.addr,e)}function c1(i,e,t){const n=this.cache,r=e.length,a=ka(t,r);Ft(n,a)||(i.uniform1iv(this.addr,a),Ot(n,a));let s;this.type===i.SAMPLER_2D_SHADOW?s=go:s=ou;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||s,a[o])}function u1(i,e,t){const n=this.cache,r=e.length,a=ka(t,r);Ft(n,a)||(i.uniform1iv(this.addr,a),Ot(n,a));for(let s=0;s!==r;++s)t.setTexture3D(e[s]||cu,a[s])}function h1(i,e,t){const n=this.cache,r=e.length,a=ka(t,r);Ft(n,a)||(i.uniform1iv(this.addr,a),Ot(n,a));for(let s=0;s!==r;++s)t.setTextureCube(e[s]||uu,a[s])}function d1(i,e,t){const n=this.cache,r=e.length,a=ka(t,r);Ft(n,a)||(i.uniform1iv(this.addr,a),Ot(n,a));for(let s=0;s!==r;++s)t.setTexture2DArray(e[s]||lu,a[s])}function f1(i){switch(i){case 5126:return qg;case 35664:return Zg;case 35665:return $g;case 35666:return Jg;case 35674:return Qg;case 35675:return jg;case 35676:return e1;case 5124:case 35670:return t1;case 35667:case 35671:return n1;case 35668:case 35672:return i1;case 35669:case 35673:return r1;case 5125:return a1;case 36294:return s1;case 36295:return o1;case 36296:return l1;case 35678:case 36198:case 36298:case 36306:case 35682:return c1;case 35679:case 36299:case 36307:return u1;case 35680:case 36300:case 36308:case 36293:return h1;case 36289:case 36303:case 36311:case 36292:return d1}}class p1{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Kg(t.type)}}class m1{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=f1(t.type)}}class g1{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let a=0,s=r.length;a!==s;++a){const o=r[a];o.setValue(e,t[o.id],n)}}}const ws=/(\w+)(\])?(\[|\.)?/g;function Wl(i,e){i.seq.push(e),i.map[e.id]=e}function _1(i,e,t){const n=i.name,r=n.length;for(ws.lastIndex=0;;){const a=ws.exec(n),s=ws.lastIndex;let o=a[1];const c=a[2]==="]",l=a[3];if(c&&(o=o|0),l===void 0||l==="["&&s+2===r){Wl(t,l===void 0?new p1(o,i,e):new m1(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new g1(o),Wl(t,d)),t=d}}}class wa{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const o=e.getActiveUniform(t,s),c=e.getUniformLocation(t,o.name);_1(o,c,this)}const r=[],a=[];for(const s of this.seq)s.type===e.SAMPLER_2D_SHADOW||s.type===e.SAMPLER_CUBE_SHADOW||s.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(s):a.push(s);r.length>0&&(this.seq=r.concat(a))}setValue(e,t,n,r){const a=this.map[t];a!==void 0&&a.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let a=0,s=t.length;a!==s;++a){const o=t[a],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,a=e.length;r!==a;++r){const s=e[r];s.id in t&&n.push(s)}return n}}function Xl(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const x1=37297;let v1=0;function M1(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let s=r;s<a;s++){const o=s+1;n.push(`${o===e?">":" "} ${o}: ${t[s]}`)}return n.join(`
`)}const Yl=new He;function S1(i){et._getMatrix(Yl,et.workingColorSpace,i);const e=`mat3( ${Yl.elements.map(t=>t.toFixed(4))} )`;switch(et.getTransfer(i)){case Ca:return[e,"LinearTransferOETF"];case ft:return[e,"sRGBTransferOETF"];default:return Ge("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Kl(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),a=(i.getShaderInfoLog(e)||"").trim();if(n&&a==="")return"";const s=/ERROR: 0:(\d+)/.exec(a);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+a+`

`+M1(i.getShaderSource(e),o)}else return a}function b1(i,e){const t=S1(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const E1={[Rc]:"Linear",[Cc]:"Reinhard",[Lc]:"Cineon",[Pc]:"ACESFilmic",[Ic]:"AgX",[Nc]:"Neutral",[Dc]:"Custom"};function y1(i,e){const t=E1[e];return t===void 0?(Ge("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const pa=new X;function w1(){et.getLuminanceCoefficients(pa);const i=pa.x.toFixed(4),e=pa.y.toFixed(4),t=pa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function A1(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(wr).join(`
`)}function T1(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function R1(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const a=i.getActiveAttrib(e,r),s=a.name;let o=1;a.type===i.FLOAT_MAT2&&(o=2),a.type===i.FLOAT_MAT3&&(o=3),a.type===i.FLOAT_MAT4&&(o=4),t[s]={type:a.type,location:i.getAttribLocation(e,s),locationSize:o}}return t}function wr(i){return i!==""}function ql(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Zl(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const C1=/^[ \t]*#include +<([\w\d./]+)>/gm;function _o(i){return i.replace(C1,P1)}const L1=new Map;function P1(i,e){let t=Je[e];if(t===void 0){const n=L1.get(e);if(n!==void 0)t=Je[n],Ge('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return _o(t)}const D1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function $l(i){return i.replace(D1,I1)}function I1(i,e,t,n){let r="";for(let a=parseInt(e);a<parseInt(t);a++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return r}function Jl(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}const N1={[Ma]:"SHADOWMAP_TYPE_PCF",[yr]:"SHADOWMAP_TYPE_VSM"};function U1(i){return N1[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const F1={[Ci]:"ENVMAP_TYPE_CUBE",[or]:"ENVMAP_TYPE_CUBE",[Oa]:"ENVMAP_TYPE_CUBE_UV"};function O1(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":F1[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const B1={[or]:"ENVMAP_MODE_REFRACTION"};function z1(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":B1[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const k1={[Tc]:"ENVMAP_BLENDING_MULTIPLY",[Tf]:"ENVMAP_BLENDING_MIX",[Rf]:"ENVMAP_BLENDING_ADD"};function G1(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":k1[i.combine]||"ENVMAP_BLENDING_NONE"}function H1(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function V1(i,e,t,n){const r=i.getContext(),a=t.defines;let s=t.vertexShader,o=t.fragmentShader;const c=U1(t),l=O1(t),u=z1(t),d=G1(t),h=H1(t),p=A1(t),_=T1(a),x=r.createProgram();let g,m,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(wr).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(wr).join(`
`),m.length>0&&(m+=`
`)):(g=[Jl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(wr).join(`
`),m=[Jl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ln?"#define TONE_MAPPING":"",t.toneMapping!==Ln?Je.tonemapping_pars_fragment:"",t.toneMapping!==Ln?y1("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Je.colorspace_pars_fragment,b1("linearToOutputTexel",t.outputColorSpace),w1(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(wr).join(`
`)),s=_o(s),s=ql(s,t),s=Zl(s,t),o=_o(o),o=ql(o,t),o=Zl(o,t),s=$l(s),o=$l(o),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===fl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===fl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const E=M+g+s,b=M+m+o,R=Xl(r,r.VERTEX_SHADER,E),w=Xl(r,r.FRAGMENT_SHADER,b);r.attachShader(x,R),r.attachShader(x,w),t.index0AttributeName!==void 0?r.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function P(C){if(i.debug.checkShaderErrors){const O=r.getProgramInfoLog(x)||"",F=r.getShaderInfoLog(R)||"",D=r.getShaderInfoLog(w)||"",B=O.trim(),W=F.trim(),$=D.trim();let ae=!0,q=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(ae=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,x,R,w);else{const ee=Kl(r,R,"vertex"),N=Kl(r,w,"fragment");rt("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+B+`
`+ee+`
`+N)}else B!==""?Ge("WebGLProgram: Program Info Log:",B):(W===""||$==="")&&(q=!1);q&&(C.diagnostics={runnable:ae,programLog:B,vertexShader:{log:W,prefix:g},fragmentShader:{log:$,prefix:m}})}r.deleteShader(R),r.deleteShader(w),S=new wa(r,x),T=R1(r,x)}let S;this.getUniforms=function(){return S===void 0&&P(this),S};let T;this.getAttributes=function(){return T===void 0&&P(this),T};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=r.getProgramParameter(x,x1)),I},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=v1++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=R,this.fragmentShader=w,this}let W1=0;class X1{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Y1(e),t.set(e,n)),n}}class Y1{constructor(e){this.id=W1++,this.code=e,this.usedTimes=0}}function K1(i){return i===Li||i===Ta||i===Ra}function q1(i,e,t,n,r,a){const s=new Yc,o=new X1,c=new Set,l=[],u=new Map,d=n.logarithmicDepthBuffer;let h=n.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return c.add(S),S===0?"uv":`uv${S}`}function x(S,T,I,C,O,F){const D=C.fog,B=O.geometry,W=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?C.environment:null,$=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap,ae=e.get(S.envMap||W,$),q=ae&&ae.mapping===Oa?ae.image.height:null,ee=p[S.type];S.precision!==null&&(h=n.getMaxPrecision(S.precision),h!==S.precision&&Ge("WebGLProgram.getParameters:",S.precision,"not supported, using",h,"instead."));const N=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,re=N!==void 0?N.length:0;let ce=0;B.morphAttributes.position!==void 0&&(ce=1),B.morphAttributes.normal!==void 0&&(ce=2),B.morphAttributes.color!==void 0&&(ce=3);let Re,Oe,ke,j;if(ee){const Mt=Tn[ee];Re=Mt.vertexShader,Oe=Mt.fragmentShader}else{Re=S.vertexShader,Oe=S.fragmentShader;const Mt=o.getVertexShaderStage(S),ot=o.getFragmentShaderStage(S);o.update(S,Mt,ot),ke=Mt.id,j=ot.id}const ie=i.getRenderTarget(),H=i.state.buffers.depth.getReversed(),ue=O.isInstancedMesh===!0,se=O.isBatchedMesh===!0,ye=!!S.map,qe=!!S.matcap,Ce=!!ae,Ue=!!S.aoMap,Xe=!!S.lightMap,We=!!S.bumpMap&&S.wireframe===!1,_t=!!S.normalMap,Tt=!!S.displacementMap,Bt=!!S.emissiveMap,pt=!!S.metalnessMap,xt=!!S.roughnessMap,k=S.anisotropy>0,Ze=S.clearcoat>0,ze=S.dispersion>0,L=S.retroreflectivity>0,v=S.iridescence>0,U=S.sheen>0,V=S.transmission>0,Z=k&&!!S.anisotropyMap,le=Ze&&!!S.clearcoatMap,he=Ze&&!!S.clearcoatNormalMap,Q=Ze&&!!S.clearcoatRoughnessMap,te=v&&!!S.iridescenceMap,de=v&&!!S.iridescenceThicknessMap,Le=U&&!!S.sheenColorMap,ge=U&&!!S.sheenRoughnessMap,fe=!!S.specularMap,Ie=!!S.specularColorMap,Be=!!S.specularIntensityMap,Ye=V&&!!S.transmissionMap,G=V&&!!S.thicknessMap,pe=!!S.gradientMap,ne=!!S.alphaMap,me=S.alphaTest>0,Se=!!S.alphaHash,oe=!!S.extensions;let Ne=Ln;S.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(Ne=i.toneMapping);const Pe={shaderID:ee,shaderType:S.type,shaderName:S.name,vertexShader:Re,fragmentShader:Oe,defines:S.defines,customVertexShaderID:ke,customFragmentShaderID:j,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:h,batching:se,batchingColor:se&&O._colorsTexture!==null,instancing:ue,instancingColor:ue&&O.instanceColor!==null,instancingMorph:ue&&O.morphTexture!==null,outputColorSpace:ie===null?i.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:et.workingColorSpace,alphaToCoverage:!!S.alphaToCoverage,map:ye,matcap:qe,envMap:Ce,envMapMode:Ce&&ae.mapping,envMapCubeUVHeight:q,aoMap:Ue,lightMap:Xe,bumpMap:We,normalMap:_t,displacementMap:Tt,emissiveMap:Bt,normalMapObjectSpace:_t&&S.normalMapType===Pf,normalMapTangentSpace:_t&&S.normalMapType===dl,packedNormalMap:_t&&S.normalMapType===dl&&K1(S.normalMap.format),metalnessMap:pt,roughnessMap:xt,anisotropy:k,anisotropyMap:Z,clearcoat:Ze,clearcoatMap:le,clearcoatNormalMap:he,clearcoatRoughnessMap:Q,dispersion:ze,retroreflection:L,iridescence:v,iridescenceMap:te,iridescenceThicknessMap:de,sheen:U,sheenColorMap:Le,sheenRoughnessMap:ge,specularMap:fe,specularColorMap:Ie,specularIntensityMap:Be,transmission:V,transmissionMap:Ye,thicknessMap:G,gradientMap:pe,opaque:S.transparent===!1&&S.blending===Rr&&S.alphaToCoverage===!1,alphaMap:ne,alphaTest:me,alphaHash:Se,combine:S.combine,mapUv:ye&&_(S.map.channel),aoMapUv:Ue&&_(S.aoMap.channel),lightMapUv:Xe&&_(S.lightMap.channel),bumpMapUv:We&&_(S.bumpMap.channel),normalMapUv:_t&&_(S.normalMap.channel),displacementMapUv:Tt&&_(S.displacementMap.channel),emissiveMapUv:Bt&&_(S.emissiveMap.channel),metalnessMapUv:pt&&_(S.metalnessMap.channel),roughnessMapUv:xt&&_(S.roughnessMap.channel),anisotropyMapUv:Z&&_(S.anisotropyMap.channel),clearcoatMapUv:le&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:he&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:te&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:de&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:Le&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:ge&&_(S.sheenRoughnessMap.channel),specularMapUv:fe&&_(S.specularMap.channel),specularColorMapUv:Ie&&_(S.specularColorMap.channel),specularIntensityMapUv:Be&&_(S.specularIntensityMap.channel),transmissionMapUv:Ye&&_(S.transmissionMap.channel),thicknessMapUv:G&&_(S.thicknessMap.channel),alphaMapUv:ne&&_(S.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(_t||k),vertexNormals:!!B.attributes.normal,vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!B.attributes.uv&&(ye||ne),fog:!!D,useFog:S.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:S.wireframe===!1&&(S.flatShading===!0||B.attributes.normal===void 0&&_t===!1&&(S.isMeshLambertMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isMeshPhysicalMaterial)),sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:H,skinning:O.isSkinnedMesh===!0,hasPositionAttribute:B.attributes.position!==void 0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:re,morphTextureStride:ce,numSunLights:T.sun.length,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numSunLightShadows:T.sunShadowMap.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:F.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ne,decodeVideoTexture:ye&&S.map.isVideoTexture===!0&&et.getTransfer(S.map.colorSpace)===ft,decodeVideoTextureEmissive:Bt&&S.emissiveMap.isVideoTexture===!0&&et.getTransfer(S.emissiveMap.colorSpace)===ft,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Wn,flipSided:S.side===en,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:oe&&S.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(oe&&S.extensions.multiDraw===!0||se)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Pe.vertexUv1s=c.has(1),Pe.vertexUv2s=c.has(2),Pe.vertexUv3s=c.has(3),c.clear(),Pe}function g(S){const T=[];if(S.shaderID?T.push(S.shaderID):(T.push(S.customVertexShaderID),T.push(S.customFragmentShaderID)),S.defines!==void 0)for(const I in S.defines)T.push(I),T.push(S.defines[I]);return S.isRawShaderMaterial===!1&&(m(T,S),M(T,S),T.push(i.outputColorSpace)),T.push(S.customProgramCacheKey),T.join()}function m(S,T){S.push(T.precision),S.push(T.outputColorSpace),S.push(T.envMapMode),S.push(T.envMapCubeUVHeight),S.push(T.mapUv),S.push(T.alphaMapUv),S.push(T.lightMapUv),S.push(T.aoMapUv),S.push(T.bumpMapUv),S.push(T.normalMapUv),S.push(T.displacementMapUv),S.push(T.emissiveMapUv),S.push(T.metalnessMapUv),S.push(T.roughnessMapUv),S.push(T.anisotropyMapUv),S.push(T.clearcoatMapUv),S.push(T.clearcoatNormalMapUv),S.push(T.clearcoatRoughnessMapUv),S.push(T.iridescenceMapUv),S.push(T.iridescenceThicknessMapUv),S.push(T.sheenColorMapUv),S.push(T.sheenRoughnessMapUv),S.push(T.specularMapUv),S.push(T.specularColorMapUv),S.push(T.specularIntensityMapUv),S.push(T.transmissionMapUv),S.push(T.thicknessMapUv),S.push(T.combine),S.push(T.fogExp2),S.push(T.sizeAttenuation),S.push(T.morphTargetsCount),S.push(T.morphAttributeCount),S.push(T.numSunLights),S.push(T.numDirLights),S.push(T.numPointLights),S.push(T.numSpotLights),S.push(T.numSpotLightMaps),S.push(T.numHemiLights),S.push(T.numRectAreaLights),S.push(T.numSunLightShadows),S.push(T.numDirLightShadows),S.push(T.numPointLightShadows),S.push(T.numSpotLightShadows),S.push(T.numSpotLightShadowsWithMaps),S.push(T.numLightProbes),S.push(T.shadowMapType),S.push(T.toneMapping),S.push(T.numClippingPlanes),S.push(T.numClipIntersection),S.push(T.depthPacking)}function M(S,T){s.disableAll(),T.instancing&&s.enable(0),T.instancingColor&&s.enable(1),T.instancingMorph&&s.enable(2),T.matcap&&s.enable(3),T.envMap&&s.enable(4),T.normalMapObjectSpace&&s.enable(5),T.normalMapTangentSpace&&s.enable(6),T.clearcoat&&s.enable(7),T.iridescence&&s.enable(8),T.alphaTest&&s.enable(9),T.vertexColors&&s.enable(10),T.vertexAlphas&&s.enable(11),T.vertexUv1s&&s.enable(12),T.vertexUv2s&&s.enable(13),T.vertexUv3s&&s.enable(14),T.vertexTangents&&s.enable(15),T.anisotropy&&s.enable(16),T.alphaHash&&s.enable(17),T.batching&&s.enable(18),T.dispersion&&s.enable(19),T.retroreflection&&s.enable(24),T.batchingColor&&s.enable(20),T.gradientMap&&s.enable(21),T.packedNormalMap&&s.enable(22),T.vertexNormals&&s.enable(23),S.push(s.mask),s.disableAll(),T.fog&&s.enable(0),T.useFog&&s.enable(1),T.flatShading&&s.enable(2),T.logarithmicDepthBuffer&&s.enable(3),T.reversedDepthBuffer&&s.enable(4),T.skinning&&s.enable(5),T.morphTargets&&s.enable(6),T.morphNormals&&s.enable(7),T.morphColors&&s.enable(8),T.premultipliedAlpha&&s.enable(9),T.shadowMapEnabled&&s.enable(10),T.doubleSided&&s.enable(11),T.flipSided&&s.enable(12),T.useDepthPacking&&s.enable(13),T.dithering&&s.enable(14),T.transmission&&s.enable(15),T.sheen&&s.enable(16),T.opaque&&s.enable(17),T.pointsUvs&&s.enable(18),T.decodeVideoTexture&&s.enable(19),T.decodeVideoTextureEmissive&&s.enable(20),T.alphaToCoverage&&s.enable(21),T.numLightProbeGrids>0&&s.enable(22),T.hasPositionAttribute&&s.enable(23),S.push(s.mask)}function E(S){const T=p[S.type];let I;if(T){const C=Tn[T];I=gp.clone(C.uniforms)}else I=S.uniforms;return I}function b(S,T){let I=u.get(T);return I!==void 0?++I.usedTimes:(I=new V1(i,T,S,r),l.push(I),u.set(T,I)),I}function R(S){if(--S.usedTimes===0){const T=l.indexOf(S);l[T]=l[l.length-1],l.pop(),u.delete(S.cacheKey),S.destroy()}}function w(S){o.remove(S)}function P(){o.dispose()}return{getParameters:x,getProgramCacheKey:g,getUniforms:E,acquireProgram:b,releaseProgram:R,releaseShaderCache:w,programs:l,dispose:P}}function Z1(){let i=new WeakMap;function e(s){return i.has(s)}function t(s){let o=i.get(s);return o===void 0&&(o={},i.set(s,o)),o}function n(s){i.delete(s)}function r(s,o,c){i.get(s)[o]=c}function a(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:a}}function $1(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Ql(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function jl(){const i=[];let e=0;const t=[],n=[],r=[];function a(){e=0,t.length=0,n.length=0,r.length=0}function s(h){let p=0;return h.isInstancedMesh&&(p+=2),h.isSkinnedMesh&&(p+=1),p}function o(h,p,_,x,g,m){let M=i[e];return M===void 0?(M={id:h.id,object:h,geometry:p,material:_,materialVariant:s(h),groupOrder:x,renderOrder:h.renderOrder,z:g,group:m},i[e]=M):(M.id=h.id,M.object=h,M.geometry=p,M.material=_,M.materialVariant=s(h),M.groupOrder=x,M.renderOrder=h.renderOrder,M.z=g,M.group=m),e++,M}function c(h,p,_,x,g,m,M){M.reversedDepth===!0&&(g=-g);const E=o(h,p,_,x,g,m);_.transmission>0?n.push(E):_.transparent===!0?r.push(E):t.push(E)}function l(h,p,_,x,g,m){const M=o(h,p,_,x,g,m);_.transmission>0?n.unshift(M):_.transparent===!0?r.unshift(M):t.unshift(M)}function u(h,p){t.length>1&&t.sort(h||$1),n.length>1&&n.sort(p||Ql),r.length>1&&r.sort(p||Ql)}function d(){for(let h=e,p=i.length;h<p;h++){const _=i[h];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:t,transmissive:n,transparent:r,init:a,push:c,unshift:l,finish:d,sort:u}}function J1(){let i=new WeakMap;function e(n,r){const a=i.get(n);let s;return a===void 0?(s=new jl,i.set(n,[s])):r>=a.length?(s=new jl,a.push(s)):s=a[r],s}function t(){i=new WeakMap}return{get:e,dispose:t}}function Q1(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new X,color:new st};break;case"SpotLight":t={position:new X,direction:new X,color:new st,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new X,color:new st,distance:0,decay:0};break;case"HemisphereLight":t={direction:new X,skyColor:new st,groundColor:new st};break;case"RectAreaLight":t={color:new st,position:new X,halfWidth:new X,halfHeight:new X};break}return i[e.id]=t,t}}}function j1(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ve};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ve};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ve,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let e_=0;function t_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function n_(i){const e=new Q1,t=j1(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new X);const r=new X,a=new Ct,s=new Ct;function o(l){let u=0,d=0,h=0;for(let O=0;O<9;O++)n.probe[O].set(0,0,0);let p=0,_=0,x=0,g=0,m=0,M=0,E=0,b=0,R=0,w=0,P=0,S=0,T=0,I=0;l.sort(t_);for(let O=0,F=l.length;O<F;O++){const D=l[O],B=D.color,W=D.intensity,$=D.distance;let ae=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===Li?ae=D.shadow.map.texture:ae=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)u+=B.r*W,d+=B.g*W,h+=B.b*W;else if(D.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(D.sh.coefficients[q],W);I++}else if(D.isSunLight){const q=e.get(D);if(q.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const ee=D.shadow,N=t.get(D);N.shadowIntensity=ee.intensity,N.shadowBias=ee.bias,N.shadowNormalBias=ee.normalBias,N.shadowRadius=ee.radius,N.shadowMapSize.copy(ee.mapSize).multiply(ee.getFrameExtents()),n.sunShadow[_]=N,n.sunShadowMap[_]=ae;const re=ee.getViewportCount();for(let ce=0;ce<re;ce++)n.sunShadowMatrix[x+ce]=ee.getMatrix(ce),n.sunShadowCascade[x+ce]=ee._cascadeData[ce];x+=re,_++}n.sun[p]=q,p++}else if(D.isDirectionalLight){const q=e.get(D);if(q.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const ee=D.shadow,N=t.get(D);N.shadowIntensity=ee.intensity,N.shadowBias=ee.bias,N.shadowNormalBias=ee.normalBias,N.shadowRadius=ee.radius,N.shadowMapSize=ee.mapSize,n.directionalShadow[g]=N,n.directionalShadowMap[g]=ae,n.directionalShadowMatrix[g]=D.shadow.matrix,R++}n.directional[g]=q,g++}else if(D.isSpotLight){const q=e.get(D);q.position.setFromMatrixPosition(D.matrixWorld),q.color.copy(B).multiplyScalar(W),q.distance=$,q.coneCos=Math.cos(D.angle),q.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),q.decay=D.decay,n.spot[M]=q;const ee=D.shadow;if(D.map&&(n.spotLightMap[S]=D.map,S++,ee.updateMatrices(D),D.castShadow&&T++),n.spotLightMatrix[M]=ee.matrix,D.castShadow){const N=t.get(D);N.shadowIntensity=ee.intensity,N.shadowBias=ee.bias,N.shadowNormalBias=ee.normalBias,N.shadowRadius=ee.radius,N.shadowMapSize=ee.mapSize,n.spotShadow[M]=N,n.spotShadowMap[M]=ae,P++}M++}else if(D.isRectAreaLight){const q=e.get(D);q.color.copy(B).multiplyScalar(W),q.halfWidth.set(D.width*.5,0,0),q.halfHeight.set(0,D.height*.5,0),n.rectArea[E]=q,E++}else if(D.isPointLight){const q=e.get(D);if(q.color.copy(D.color).multiplyScalar(D.intensity),q.distance=D.distance,q.decay=D.decay,D.castShadow){const ee=D.shadow,N=t.get(D);N.shadowIntensity=ee.intensity,N.shadowBias=ee.bias,N.shadowNormalBias=ee.normalBias,N.shadowRadius=ee.radius,N.shadowMapSize=ee.mapSize,N.shadowCameraNear=ee.camera.near,N.shadowCameraFar=ee.camera.far,n.pointShadow[m]=N,n.pointShadowMap[m]=ae,n.pointShadowMatrix[m]=D.shadow.matrix,w++}n.point[m]=q,m++}else if(D.isHemisphereLight){const q=e.get(D);q.skyColor.copy(D.color).multiplyScalar(W),q.groundColor.copy(D.groundColor).multiplyScalar(W),n.hemi[b]=q,b++}}E>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=_e.LTC_FLOAT_1,n.rectAreaLTC2=_e.LTC_FLOAT_2):(n.rectAreaLTC1=_e.LTC_HALF_1,n.rectAreaLTC2=_e.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=h;const C=n.hash;(C.sunLength!==p||C.directionalLength!==g||C.pointLength!==m||C.spotLength!==M||C.rectAreaLength!==E||C.hemiLength!==b||C.numSunShadows!==_||C.numDirectionalShadows!==R||C.numPointShadows!==w||C.numSpotShadows!==P||C.numSpotMaps!==S||C.numLightProbes!==I)&&(n.sun.length=p,n.directional.length=g,n.spot.length=M,n.rectArea.length=E,n.point.length=m,n.hemi.length=b,n.sunShadow.length=_,n.sunShadowMap.length=_,n.sunShadowMatrix.length=x,n.sunShadowCascade.length=x,n.directionalShadow.length=R,n.directionalShadowMap.length=R,n.directionalShadowMatrix.length=R,n.pointShadow.length=w,n.pointShadowMap.length=w,n.pointShadowMatrix.length=w,n.spotShadow.length=P,n.spotShadowMap.length=P,n.spotLightMatrix.length=P+S-T,n.spotLightMap.length=S,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=I,C.sunLength=p,C.directionalLength=g,C.pointLength=m,C.spotLength=M,C.rectAreaLength=E,C.hemiLength=b,C.numSunShadows=_,C.numDirectionalShadows=R,C.numPointShadows=w,C.numSpotShadows=P,C.numSpotMaps=S,C.numLightProbes=I,n.version=e_++)}function c(l,u){let d=0,h=0,p=0,_=0,x=0,g=0;const m=u.matrixWorldInverse;for(let M=0,E=l.length;M<E;M++){const b=l[M];if(b.isSunLight){const R=n.sun[d];R.direction.setFromMatrixPosition(b.matrixWorld),R.direction.transformDirection(m),d++}else if(b.isDirectionalLight){const R=n.directional[h];R.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(m),h++}else if(b.isSpotLight){const R=n.spot[_];R.position.setFromMatrixPosition(b.matrixWorld),R.position.applyMatrix4(m),R.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(m),_++}else if(b.isRectAreaLight){const R=n.rectArea[x];R.position.setFromMatrixPosition(b.matrixWorld),R.position.applyMatrix4(m),s.identity(),a.copy(b.matrixWorld),a.premultiply(m),s.extractRotation(a),R.halfWidth.set(b.width*.5,0,0),R.halfHeight.set(0,b.height*.5,0),R.halfWidth.applyMatrix4(s),R.halfHeight.applyMatrix4(s),x++}else if(b.isPointLight){const R=n.point[p];R.position.setFromMatrixPosition(b.matrixWorld),R.position.applyMatrix4(m),p++}else if(b.isHemisphereLight){const R=n.hemi[g];R.direction.setFromMatrixPosition(b.matrixWorld),R.direction.transformDirection(m),g++}}}return{setup:o,setupView:c,state:n}}function ec(i){const e=new n_(i),t=[],n=[],r=[];function a(h){d.camera=h,t.length=0,n.length=0,r.length=0}function s(h){t.push(h)}function o(h){n.push(h)}function c(h){r.push(h)}function l(){e.setup(t)}function u(h){e.setupView(t,h)}const d={lightsArray:t,shadowsArray:n,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:s,pushShadow:o,pushLightProbeGrid:c}}function i_(i){let e=new WeakMap;function t(r,a=0){const s=e.get(r);let o;return s===void 0?(o=new ec(i),e.set(r,[o])):a>=s.length?(o=new ec(i),s.push(o)):o=s[a],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const r_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,a_=`uniform sampler2D shadow_pass;
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
}`,s_=[new X(1,0,0),new X(-1,0,0),new X(0,1,0),new X(0,-1,0),new X(0,0,1),new X(0,0,-1)],o_=[new X(0,-1,0),new X(0,-1,0),new X(0,0,1),new X(0,0,-1),new X(0,-1,0),new X(0,-1,0)],tc=new Ct,br=new X,As=new X;function l_(i,e,t){let n=new ko;const r=new Ve,a=new Ve,s=new At,o=new Mp,c=new Sp,l={},u=t.maxTextureSize,d={[Ri]:en,[en]:Ri,[Wn]:Wn},h=new Kt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ve},radius:{value:4}},vertexShader:r_,fragmentShader:a_}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const _=new Un;_.setAttribute("position",new Pn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Jt(_,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ma;let m=this.type;this.render=function(w,P,S){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||w.length===0)return;this.type===lf&&(Ge("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ma);const T=i.getRenderTarget(),I=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),O=i.state;O.setBlending(qn),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const F=m!==this.type;F&&P.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach(B=>B.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,B=w.length;D<B;D++){const W=w[D],$=W.shadow;if($===void 0){Ge("WebGLShadowMap:",W,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;r.copy($.mapSize);const ae=$.getFrameExtents();r.multiply(ae),a.copy($.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(a.x=Math.floor(u/ae.x),r.x=a.x*ae.x,$.mapSize.x=a.x),r.y>u&&(a.y=Math.floor(u/ae.y),r.y=a.y*ae.y,$.mapSize.y=a.y));const q=i.state.buffers.depth.getReversed();if($.camera._reversedDepth=q,$.map===null||F===!0){if($.map!==null&&($.map.depthTexture!==null&&($.map.depthTexture.dispose(),$.map.depthTexture=null),$.map.dispose()),this.type===yr){if(W.isPointLight){Ge("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}$.map=new fn(r.x,r.y,{format:Li,type:Nn,minFilter:Pt,magFilter:Pt,generateMipmaps:!1}),$.map.texture.name=W.name+".shadowMap",$.map.depthTexture=new Nr(r.x,r.y,Rn),$.map.depthTexture.name=W.name+".shadowMapDepth",$.map.depthTexture.format=Qn,$.map.depthTexture.compareFunction=null,$.map.depthTexture.minFilter=Ut,$.map.depthTexture.magFilter=Ut}else W.isPointLight?($.map=new su(r.x),$.map.depthTexture=new pp(r.x,In)):($.map=new fn(r.x,r.y),$.map.depthTexture=new Nr(r.x,r.y,In)),$.map.depthTexture.name=W.name+".shadowMap",$.map.depthTexture.format=Qn,this.type===Ma?($.map.depthTexture.compareFunction=q?Oo:Fo,$.map.depthTexture.minFilter=Pt,$.map.depthTexture.magFilter=Pt):($.map.depthTexture.compareFunction=null,$.map.depthTexture.minFilter=Ut,$.map.depthTexture.magFilter=Ut);$.camera.updateProjectionMatrix()}$.map.isWebGLCubeRenderTarget!==!0&&($.map.width!==r.x||$.map.height!==r.y)&&$.map.setSize(r.x,r.y);const ee=$.map.isWebGLCubeRenderTarget?6:$.getViewportCount();W.isPointLight!==!0&&$.updateMatrices(W,S);for(let N=0;N<ee;N++){const re=$.getCamera(N);if(W.isPointLight){const ce=$.camera,Re=$.matrix,Oe=W.distance||ce.far;Oe!==ce.far&&(ce.far=Oe,ce.updateProjectionMatrix()),br.setFromMatrixPosition(W.matrixWorld),ce.position.copy(br),As.copy(ce.position),As.add(s_[N]),ce.up.copy(o_[N]),ce.lookAt(As),ce.updateMatrixWorld(),Re.makeTranslation(-br.x,-br.y,-br.z),tc.multiplyMatrices(ce.projectionMatrix,ce.matrixWorldInverse),$._frustum.setFromProjectionMatrix(tc,ce.coordinateSystem,ce.reversedDepth)}if($.map.isWebGLCubeRenderTarget)i.setRenderTarget($.map,N),i.clear();else{N===0&&(i.setRenderTarget($.map),i.clear());const ce=$.getViewport(N);s.set(a.x*ce.x,a.y*ce.y,a.x*ce.z,a.y*ce.w),O.viewport(s)}n=$.getFrustum(N),b(P,S,re,W,this.type)}$.isPointLightShadow!==!0&&this.type===yr&&M($,S),$.needsUpdate=!1}m=this.type,g.needsUpdate=!1,i.setRenderTarget(T,I,C)};function M(w,P){const S=e.update(x);h.defines.VSM_SAMPLES!==w.blurSamples&&(h.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null?w.mapPass=new fn(r.x,r.y,{format:Li,type:Nn}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),h.uniforms.shadow_pass.value=w.map.depthTexture,h.uniforms.resolution.value.set(w.map.width,w.map.height),h.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(P,null,S,h,x,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value.set(w.map.width,w.map.height),p.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(P,null,S,p,x,null)}function E(w,P,S,T){let I=null;const C=S.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(C!==void 0)I=C;else if(I=S.isPointLight===!0?c:o,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const O=I.uuid,F=P.uuid;let D=l[O];D===void 0&&(D={},l[O]=D);let B=D[F];B===void 0&&(B=I.clone(),D[F]=B,P.addEventListener("dispose",R)),I=B}if(I.visible=P.visible,I.wireframe=P.wireframe,T===yr?I.side=P.shadowSide!==null?P.shadowSide:P.side:I.side=P.shadowSide!==null?P.shadowSide:d[P.side],I.alphaMap=P.alphaMap,I.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,I.map=P.map,I.clipShadows=P.clipShadows,I.clippingPlanes=P.clippingPlanes,I.clipIntersection=P.clipIntersection,I.displacementMap=P.displacementMap,I.displacementScale=P.displacementScale,I.displacementBias=P.displacementBias,I.wireframeLinewidth=P.wireframeLinewidth,I.linewidth=P.linewidth,S.isPointLight===!0&&I.isMeshDistanceMaterial===!0){const O=i.properties.get(I);O.light=S}return I}function b(w,P,S,T,I){if(w.visible===!1)return;if(w.layers.test(P.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&I===yr)&&(!w.frustumCulled||w.intersectsFrustum(n))){w.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,w.matrixWorld);const F=e.update(w),D=w.material;if(Array.isArray(D)){const B=F.groups;for(let W=0,$=B.length;W<$;W++){const ae=B[W],q=D[ae.materialIndex];if(q&&q.visible){const ee=E(w,q,T,I);w.onBeforeShadow(i,w,P,S,F,ee,ae),i.renderBufferDirect(S,null,F,ee,w,ae),w.onAfterShadow(i,w,P,S,F,ee,ae)}}}else if(D.visible){const B=E(w,D,T,I);w.onBeforeShadow(i,w,P,S,F,B,null),i.renderBufferDirect(S,null,F,B,w,null),w.onAfterShadow(i,w,P,S,F,B,null)}}const O=w.children;for(let F=0,D=O.length;F<D;F++)b(O[F],P,S,T,I)}function R(w){w.target.removeEventListener("dispose",R);for(const S in l){const T=l[S],I=w.target.uuid;I in T&&(T[I].dispose(),delete T[I])}}}function c_(i,e){function t(){let G=!1;const pe=new At;let ne=null;const me=new At(0,0,0,0);return{setMask:function(Se){ne!==Se&&!G&&(i.colorMask(Se,Se,Se,Se),ne=Se)},setLocked:function(Se){G=Se},setClear:function(Se,oe,Ne,Pe,Mt){Mt===!0&&(Se*=Pe,oe*=Pe,Ne*=Pe),pe.set(Se,oe,Ne,Pe),me.equals(pe)===!1&&(i.clearColor(Se,oe,Ne,Pe),me.copy(pe))},reset:function(){G=!1,ne=null,me.set(-1,0,0,0)}}}function n(){let G=!1,pe=!1,ne=null,me=null,Se=null;return{setReversed:function(oe){if(pe!==oe){const Ne=e.get("EXT_clip_control");oe?Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.ZERO_TO_ONE_EXT):Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.NEGATIVE_ONE_TO_ONE_EXT),pe=oe;const Pe=Se;Se=null,this.setClear(Pe)}},getReversed:function(){return pe},setTest:function(oe){oe?ie(i.DEPTH_TEST):H(i.DEPTH_TEST)},setMask:function(oe){ne!==oe&&!G&&(i.depthMask(oe),ne=oe)},setFunc:function(oe){if(pe&&(oe=Vf[oe]),me!==oe){switch(oe){case Cs:i.depthFunc(i.NEVER);break;case Ls:i.depthFunc(i.ALWAYS);break;case Ps:i.depthFunc(i.LESS);break;case Lr:i.depthFunc(i.LEQUAL);break;case Ds:i.depthFunc(i.EQUAL);break;case Is:i.depthFunc(i.GEQUAL);break;case Ns:i.depthFunc(i.GREATER);break;case Us:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}me=oe}},setLocked:function(oe){G=oe},setClear:function(oe){Se!==oe&&(Se=oe,pe&&(oe=1-oe),i.clearDepth(oe))},reset:function(){G=!1,ne=null,me=null,Se=null,pe=!1}}}function r(){let G=!1,pe=null,ne=null,me=null,Se=null,oe=null,Ne=null,Pe=null,Mt=null;return{setTest:function(ot){G||(ot?ie(i.STENCIL_TEST):H(i.STENCIL_TEST))},setMask:function(ot){pe!==ot&&!G&&(i.stencilMask(ot),pe=ot)},setFunc:function(ot,mn,bn){(ne!==ot||me!==mn||Se!==bn)&&(i.stencilFunc(ot,mn,bn),ne=ot,me=mn,Se=bn)},setOp:function(ot,mn,bn){(oe!==ot||Ne!==mn||Pe!==bn)&&(i.stencilOp(ot,mn,bn),oe=ot,Ne=mn,Pe=bn)},setLocked:function(ot){G=ot},setClear:function(ot){Mt!==ot&&(i.clearStencil(ot),Mt=ot)},reset:function(){G=!1,pe=null,ne=null,me=null,Se=null,oe=null,Ne=null,Pe=null,Mt=null}}}const a=new t,s=new n,o=new r,c=new WeakMap,l=new WeakMap;let u={},d={},h={},p=new WeakMap,_=[],x=null,g=!1,m=null,M=null,E=null,b=null,R=null,w=null,P=null,S=new st(0,0,0),T=0,I=!1,C=null,O=null,F=null,D=null,B=null;const W=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let $=!1,ae=0;const q=i.getParameter(i.VERSION);q.indexOf("WebGL")!==-1?(ae=parseFloat(/^WebGL (\d)/.exec(q)[1]),$=ae>=1):q.indexOf("OpenGL ES")!==-1&&(ae=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),$=ae>=2);let ee=null,N={};const re=i.getParameter(i.SCISSOR_BOX),ce=i.getParameter(i.VIEWPORT),Re=new At().fromArray(re),Oe=new At().fromArray(ce);function ke(G,pe,ne,me){const Se=new Uint8Array(4),oe=i.createTexture();i.bindTexture(G,oe),i.texParameteri(G,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(G,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ne=0;Ne<ne;Ne++)G===i.TEXTURE_3D||G===i.TEXTURE_2D_ARRAY?i.texImage3D(pe,0,i.RGBA,1,1,me,0,i.RGBA,i.UNSIGNED_BYTE,Se):i.texImage2D(pe+Ne,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Se);return oe}const j={};j[i.TEXTURE_2D]=ke(i.TEXTURE_2D,i.TEXTURE_2D,1),j[i.TEXTURE_CUBE_MAP]=ke(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[i.TEXTURE_2D_ARRAY]=ke(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),j[i.TEXTURE_3D]=ke(i.TEXTURE_3D,i.TEXTURE_3D,1,1),a.setClear(0,0,0,1),s.setClear(1),o.setClear(0),ie(i.DEPTH_TEST),s.setFunc(Lr),We(!1),_t(ll),ie(i.CULL_FACE),Ue(qn);function ie(G){u[G]!==!0&&(i.enable(G),u[G]=!0)}function H(G){u[G]!==!1&&(i.disable(G),u[G]=!1)}function ue(G,pe){return h[G]!==pe?(i.bindFramebuffer(G,pe),h[G]=pe,G===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=pe),G===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=pe),!0):!1}function se(G,pe){let ne=_,me=!1;if(G){ne=p.get(pe),ne===void 0&&(ne=[],p.set(pe,ne));const Se=G.textures;if(ne.length!==Se.length||ne[0]!==i.COLOR_ATTACHMENT0){for(let oe=0,Ne=Se.length;oe<Ne;oe++)ne[oe]=i.COLOR_ATTACHMENT0+oe;ne.length=Se.length,me=!0}}else ne[0]!==i.BACK&&(ne[0]=i.BACK,me=!0);me&&i.drawBuffers(ne)}function ye(G){return x!==G?(i.useProgram(G),x=G,!0):!1}const qe={[$i]:i.FUNC_ADD,[uf]:i.FUNC_SUBTRACT,[hf]:i.FUNC_REVERSE_SUBTRACT};qe[df]=i.MIN,qe[ff]=i.MAX;const Ce={[pf]:i.ZERO,[mf]:i.ONE,[gf]:i.SRC_COLOR,[wc]:i.SRC_ALPHA,[bf]:i.SRC_ALPHA_SATURATE,[Mf]:i.DST_COLOR,[xf]:i.DST_ALPHA,[_f]:i.ONE_MINUS_SRC_COLOR,[Ac]:i.ONE_MINUS_SRC_ALPHA,[Sf]:i.ONE_MINUS_DST_COLOR,[vf]:i.ONE_MINUS_DST_ALPHA,[Ef]:i.CONSTANT_COLOR,[yf]:i.ONE_MINUS_CONSTANT_COLOR,[wf]:i.CONSTANT_ALPHA,[Af]:i.ONE_MINUS_CONSTANT_ALPHA};function Ue(G,pe,ne,me,Se,oe,Ne,Pe,Mt,ot){if(G===qn){g===!0&&(H(i.BLEND),g=!1);return}if(g===!1&&(ie(i.BLEND),g=!0),G!==cf){if(G!==m||ot!==I){if((M!==$i||R!==$i)&&(i.blendEquation(i.FUNC_ADD),M=$i,R=$i),ot)switch(G){case Rr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case cl:i.blendFunc(i.ONE,i.ONE);break;case ul:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case hl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:rt("WebGLState: Invalid blending: ",G);break}else switch(G){case Rr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case cl:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case ul:rt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case hl:rt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:rt("WebGLState: Invalid blending: ",G);break}E=null,b=null,w=null,P=null,S.set(0,0,0),T=0,m=G,I=ot}return}Se=Se||pe,oe=oe||ne,Ne=Ne||me,(pe!==M||Se!==R)&&(i.blendEquationSeparate(qe[pe],qe[Se]),M=pe,R=Se),(ne!==E||me!==b||oe!==w||Ne!==P)&&(i.blendFuncSeparate(Ce[ne],Ce[me],Ce[oe],Ce[Ne]),E=ne,b=me,w=oe,P=Ne),(Pe.equals(S)===!1||Mt!==T)&&(i.blendColor(Pe.r,Pe.g,Pe.b,Mt),S.copy(Pe),T=Mt),m=G,I=!1}function Xe(G,pe){G.side===Wn?H(i.CULL_FACE):ie(i.CULL_FACE);let ne=G.side===en;pe&&(ne=!ne),We(ne),G.blending===Rr&&G.transparent===!1?Ue(qn):Ue(G.blending,G.blendEquation,G.blendSrc,G.blendDst,G.blendEquationAlpha,G.blendSrcAlpha,G.blendDstAlpha,G.blendColor,G.blendAlpha,G.premultipliedAlpha),s.setFunc(G.depthFunc),s.setTest(G.depthTest),s.setMask(G.depthWrite),a.setMask(G.colorWrite);const me=G.stencilWrite;o.setTest(me),me&&(o.setMask(G.stencilWriteMask),o.setFunc(G.stencilFunc,G.stencilRef,G.stencilFuncMask),o.setOp(G.stencilFail,G.stencilZFail,G.stencilZPass)),Bt(G.polygonOffset,G.polygonOffsetFactor,G.polygonOffsetUnits),G.alphaToCoverage===!0?ie(i.SAMPLE_ALPHA_TO_COVERAGE):H(i.SAMPLE_ALPHA_TO_COVERAGE)}function We(G){C!==G&&(G?i.frontFace(i.CW):i.frontFace(i.CCW),C=G)}function _t(G){G!==sf?(ie(i.CULL_FACE),G!==O&&(G===ll?i.cullFace(i.BACK):G===of?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):H(i.CULL_FACE),O=G}function Tt(G){G!==F&&($&&i.lineWidth(G),F=G)}function Bt(G,pe,ne){G?(ie(i.POLYGON_OFFSET_FILL),(D!==pe||B!==ne)&&(D=pe,B=ne,s.getReversed()&&(pe=-pe),i.polygonOffset(pe,ne))):H(i.POLYGON_OFFSET_FILL)}function pt(G){G?ie(i.SCISSOR_TEST):H(i.SCISSOR_TEST)}function xt(G){G===void 0&&(G=i.TEXTURE0+W-1),ee!==G&&(i.activeTexture(G),ee=G)}function k(G,pe,ne){ne===void 0&&(ee===null?ne=i.TEXTURE0+W-1:ne=ee);let me=N[ne];me===void 0&&(me={type:void 0,texture:void 0},N[ne]=me),(me.type!==G||me.texture!==pe)&&(ee!==ne&&(i.activeTexture(ne),ee=ne),i.bindTexture(G,pe||j[G]),me.type=G,me.texture=pe)}function Ze(){const G=N[ee];G!==void 0&&G.type!==void 0&&(i.bindTexture(G.type,null),G.type=void 0,G.texture=void 0)}function ze(){try{i.compressedTexImage2D(...arguments)}catch(G){rt("WebGLState:",G)}}function L(){try{i.compressedTexImage3D(...arguments)}catch(G){rt("WebGLState:",G)}}function v(){try{i.texSubImage2D(...arguments)}catch(G){rt("WebGLState:",G)}}function U(){try{i.texSubImage3D(...arguments)}catch(G){rt("WebGLState:",G)}}function V(){try{i.compressedTexSubImage2D(...arguments)}catch(G){rt("WebGLState:",G)}}function Z(){try{i.compressedTexSubImage3D(...arguments)}catch(G){rt("WebGLState:",G)}}function le(){try{i.texStorage2D(...arguments)}catch(G){rt("WebGLState:",G)}}function he(){try{i.texStorage3D(...arguments)}catch(G){rt("WebGLState:",G)}}function Q(){try{i.texImage2D(...arguments)}catch(G){rt("WebGLState:",G)}}function te(){try{i.texImage3D(...arguments)}catch(G){rt("WebGLState:",G)}}function de(G){return d[G]!==void 0?d[G]:i.getParameter(G)}function Le(G,pe){d[G]!==pe&&(i.pixelStorei(G,pe),d[G]=pe)}function ge(G){Re.equals(G)===!1&&(i.scissor(G.x,G.y,G.z,G.w),Re.copy(G))}function fe(G){Oe.equals(G)===!1&&(i.viewport(G.x,G.y,G.z,G.w),Oe.copy(G))}function Ie(G,pe){let ne=l.get(pe);ne===void 0&&(ne=new WeakMap,l.set(pe,ne));let me=ne.get(G);me===void 0&&(me=i.getUniformBlockIndex(pe,G.name),ne.set(G,me))}function Be(G,pe){const me=l.get(pe).get(G);c.get(pe)!==me&&(i.uniformBlockBinding(pe,me,G.__bindingPointIndex),c.set(pe,me))}function Ye(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),s.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},d={},ee=null,N={},h={},p=new WeakMap,_=[],x=null,g=!1,m=null,M=null,E=null,b=null,R=null,w=null,P=null,S=new st(0,0,0),T=0,I=!1,C=null,O=null,F=null,D=null,B=null,Re.set(0,0,i.canvas.width,i.canvas.height),Oe.set(0,0,i.canvas.width,i.canvas.height),a.reset(),s.reset(),o.reset()}return{buffers:{color:a,depth:s,stencil:o},enable:ie,disable:H,bindFramebuffer:ue,drawBuffers:se,useProgram:ye,setBlending:Ue,setMaterial:Xe,setFlipSided:We,setCullFace:_t,setLineWidth:Tt,setPolygonOffset:Bt,setScissorTest:pt,activeTexture:xt,bindTexture:k,unbindTexture:Ze,compressedTexImage2D:ze,compressedTexImage3D:L,texImage2D:Q,texImage3D:te,pixelStorei:Le,getParameter:de,updateUBOMapping:Ie,uniformBlockBinding:Be,texStorage2D:le,texStorage3D:he,texSubImage2D:v,texSubImage3D:U,compressedTexSubImage2D:V,compressedTexSubImage3D:Z,scissor:ge,viewport:fe,reset:Ye}}function u_(i,e,t,n,r,a,s){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ve,u=new WeakMap,d=new Set;let h;const p=new WeakMap;let _=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(L,v){return _?new OffscreenCanvas(L,v):Pa("canvas")}function g(L,v,U){let V=1;const Z=ze(L);if((Z.width>U||Z.height>U)&&(V=U/Math.max(Z.width,Z.height)),V<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){const le=Math.floor(V*Z.width),he=Math.floor(V*Z.height);h===void 0&&(h=x(le,he));const Q=v?x(le,he):h;return Q.width=le,Q.height=he,Q.getContext("2d").drawImage(L,0,0,le,he),Ge("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+le+"x"+he+")."),Q}else return"data"in L&&Ge("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),L;return L}function m(L){return L.generateMipmaps}function M(L){i.generateMipmap(L)}function E(L){return L.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?i.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(L,v,U,V,Z,le=!1){if(L!==null){if(i[L]!==void 0)return i[L];Ge("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let he;V&&(he=e.get("EXT_texture_norm16"),he||Ge("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=v;if(v===i.RED&&(U===i.FLOAT&&(Q=i.R32F),U===i.HALF_FLOAT&&(Q=i.R16F),U===i.UNSIGNED_BYTE&&(Q=i.R8),U===i.UNSIGNED_SHORT&&he&&(Q=he.R16_EXT),U===i.SHORT&&he&&(Q=he.R16_SNORM_EXT)),v===i.RED_INTEGER&&(U===i.UNSIGNED_BYTE&&(Q=i.R8UI),U===i.UNSIGNED_SHORT&&(Q=i.R16UI),U===i.UNSIGNED_INT&&(Q=i.R32UI),U===i.BYTE&&(Q=i.R8I),U===i.SHORT&&(Q=i.R16I),U===i.INT&&(Q=i.R32I)),v===i.RG&&(U===i.FLOAT&&(Q=i.RG32F),U===i.HALF_FLOAT&&(Q=i.RG16F),U===i.UNSIGNED_BYTE&&(Q=i.RG8),U===i.UNSIGNED_SHORT&&he&&(Q=he.RG16_EXT),U===i.SHORT&&he&&(Q=he.RG16_SNORM_EXT)),v===i.RG_INTEGER&&(U===i.UNSIGNED_BYTE&&(Q=i.RG8UI),U===i.UNSIGNED_SHORT&&(Q=i.RG16UI),U===i.UNSIGNED_INT&&(Q=i.RG32UI),U===i.BYTE&&(Q=i.RG8I),U===i.SHORT&&(Q=i.RG16I),U===i.INT&&(Q=i.RG32I)),v===i.RGB_INTEGER&&(U===i.UNSIGNED_BYTE&&(Q=i.RGB8UI),U===i.UNSIGNED_SHORT&&(Q=i.RGB16UI),U===i.UNSIGNED_INT&&(Q=i.RGB32UI),U===i.BYTE&&(Q=i.RGB8I),U===i.SHORT&&(Q=i.RGB16I),U===i.INT&&(Q=i.RGB32I)),v===i.RGBA_INTEGER&&(U===i.UNSIGNED_BYTE&&(Q=i.RGBA8UI),U===i.UNSIGNED_SHORT&&(Q=i.RGBA16UI),U===i.UNSIGNED_INT&&(Q=i.RGBA32UI),U===i.BYTE&&(Q=i.RGBA8I),U===i.SHORT&&(Q=i.RGBA16I),U===i.INT&&(Q=i.RGBA32I)),v===i.RGB&&(U===i.UNSIGNED_SHORT&&he&&(Q=he.RGB16_EXT),U===i.SHORT&&he&&(Q=he.RGB16_SNORM_EXT),U===i.UNSIGNED_INT_5_9_9_9_REV&&(Q=i.RGB9_E5),U===i.UNSIGNED_INT_10F_11F_11F_REV&&(Q=i.R11F_G11F_B10F)),v===i.RGBA){const te=le?Ca:et.getTransfer(Z);U===i.FLOAT&&(Q=i.RGBA32F),U===i.HALF_FLOAT&&(Q=i.RGBA16F),U===i.UNSIGNED_BYTE&&(Q=te===ft?i.SRGB8_ALPHA8:i.RGBA8),U===i.UNSIGNED_SHORT&&he&&(Q=he.RGBA16_EXT),U===i.SHORT&&he&&(Q=he.RGBA16_SNORM_EXT),U===i.UNSIGNED_SHORT_4_4_4_4&&(Q=i.RGBA4),U===i.UNSIGNED_SHORT_5_5_5_1&&(Q=i.RGB5_A1)}return(Q===i.R16F||Q===i.R32F||Q===i.RG16F||Q===i.RG32F||Q===i.RGBA16F||Q===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function R(L,v){let U;return L?v===null||v===In||v===Dr?U=i.DEPTH24_STENCIL8:v===Rn?U=i.DEPTH32F_STENCIL8:v===Pr&&(U=i.DEPTH24_STENCIL8,Ge("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===In||v===Dr?U=i.DEPTH_COMPONENT24:v===Rn?U=i.DEPTH_COMPONENT32F:v===Pr&&(U=i.DEPTH_COMPONENT16),U}function w(L,v){return m(L)===!0||L.isFramebufferTexture&&L.minFilter!==Ut&&L.minFilter!==Pt?Math.log2(Math.max(v.width,v.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?v.mipmaps.length:1}function P(L){const v=L.target;v.removeEventListener("dispose",P),T(v),v.isVideoTexture&&u.delete(v),v.isHTMLTexture&&d.delete(v)}function S(L){const v=L.target;v.removeEventListener("dispose",S),C(v)}function T(L){const v=n.get(L);if(v.__webglInit===void 0)return;const U=L.source,V=p.get(U);if(V){const Z=V[v.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&I(L),Object.keys(V).length===0&&p.delete(U)}n.remove(L)}function I(L){const v=n.get(L);i.deleteTexture(v.__webglTexture);const U=L.source,V=p.get(U);delete V[v.__cacheKey],s.memory.textures--}function C(L){const v=n.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),n.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(v.__webglFramebuffer[V]))for(let Z=0;Z<v.__webglFramebuffer[V].length;Z++)i.deleteFramebuffer(v.__webglFramebuffer[V][Z]);else i.deleteFramebuffer(v.__webglFramebuffer[V]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[V])}else{if(Array.isArray(v.__webglFramebuffer))for(let V=0;V<v.__webglFramebuffer.length;V++)i.deleteFramebuffer(v.__webglFramebuffer[V]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let V=0;V<v.__webglColorRenderbuffer.length;V++)v.__webglColorRenderbuffer[V]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[V]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const U=L.textures;for(let V=0,Z=U.length;V<Z;V++){const le=n.get(U[V]);le.__webglTexture&&(i.deleteTexture(le.__webglTexture),s.memory.textures--),n.remove(U[V])}n.remove(L)}let O=0;function F(){O=0}function D(){return O}function B(L){O=L}function W(){const L=O;return L>=r.maxTextures&&Ge("WebGLTextures: Trying to use "+(L+1)+" texture units while this GPU supports only "+r.maxTextures),O+=1,L}function $(L){const v=[];return v.push(L.wrapS),v.push(L.wrapT),v.push(L.wrapR||0),v.push(L.magFilter),v.push(L.minFilter),v.push(L.anisotropy),v.push(L.internalFormat),v.push(L.format),v.push(L.type),v.push(L.generateMipmaps),v.push(L.premultiplyAlpha),v.push(L.flipY),v.push(L.unpackAlignment),v.push(L.colorSpace),v.join()}function ae(L,v){const U=n.get(L);if(L.isVideoTexture&&k(L),L.isRenderTargetTexture===!1&&L.isExternalTexture!==!0&&L.version>0&&U.__version!==L.version){const V=L.image;if(V===null)Ge("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)Ge("WebGLRenderer: Texture marked for update but image is incomplete");else{H(U,L,v);return}}else L.isExternalTexture&&(U.__webglTexture=L.sourceTexture?L.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,U.__webglTexture,i.TEXTURE0+v)}function q(L,v){const U=n.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&U.__version!==L.version){H(U,L,v);return}else L.isExternalTexture&&(U.__webglTexture=L.sourceTexture?L.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,U.__webglTexture,i.TEXTURE0+v)}function ee(L,v){const U=n.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&U.__version!==L.version){H(U,L,v);return}t.bindTexture(i.TEXTURE_3D,U.__webglTexture,i.TEXTURE0+v)}function N(L,v){const U=n.get(L);if(L.isCubeDepthTexture!==!0&&L.version>0&&U.__version!==L.version){ue(U,L,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,U.__webglTexture,i.TEXTURE0+v)}const re={[Fs]:i.REPEAT,[Xn]:i.CLAMP_TO_EDGE,[Os]:i.MIRRORED_REPEAT},ce={[Ut]:i.NEAREST,[Cf]:i.NEAREST_MIPMAP_NEAREST,[Yr]:i.NEAREST_MIPMAP_LINEAR,[Pt]:i.LINEAR,[Ja]:i.LINEAR_MIPMAP_NEAREST,[bi]:i.LINEAR_MIPMAP_LINEAR},Re={[If]:i.NEVER,[Bf]:i.ALWAYS,[Nf]:i.LESS,[Fo]:i.LEQUAL,[Uf]:i.EQUAL,[Oo]:i.GEQUAL,[Ff]:i.GREATER,[Of]:i.NOTEQUAL};function Oe(L,v){if(v.type===Rn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Pt||v.magFilter===Ja||v.magFilter===Yr||v.magFilter===bi||v.minFilter===Pt||v.minFilter===Ja||v.minFilter===Yr||v.minFilter===bi)&&Ge("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(L,i.TEXTURE_WRAP_S,re[v.wrapS]),i.texParameteri(L,i.TEXTURE_WRAP_T,re[v.wrapT]),(L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY)&&i.texParameteri(L,i.TEXTURE_WRAP_R,re[v.wrapR]),i.texParameteri(L,i.TEXTURE_MAG_FILTER,ce[v.magFilter]),i.texParameteri(L,i.TEXTURE_MIN_FILTER,ce[v.minFilter]),v.compareFunction&&(i.texParameteri(L,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(L,i.TEXTURE_COMPARE_FUNC,Re[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Ut||v.minFilter!==Yr&&v.minFilter!==bi||v.type===Rn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const U=e.get("EXT_texture_filter_anisotropic");i.texParameterf(L,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function ke(L,v){let U=!1;L.__webglInit===void 0&&(L.__webglInit=!0,v.addEventListener("dispose",P));const V=v.source;let Z=p.get(V);Z===void 0&&(Z={},p.set(V,Z));const le=$(v);if(le!==L.__cacheKey){Z[le]===void 0&&(Z[le]={texture:i.createTexture(),usedTimes:0},s.memory.textures++,U=!0),Z[le].usedTimes++;const he=Z[L.__cacheKey];he!==void 0&&(Z[L.__cacheKey].usedTimes--,he.usedTimes===0&&I(v)),L.__cacheKey=le,L.__webglTexture=Z[le].texture}return U}function j(L,v,U){return Math.floor(Math.floor(L/U)/v)}function ie(L,v,U,V){const le=L.updateRanges;if(le.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,U,V,v.data);else{le.sort((Le,ge)=>Le.start-ge.start);let he=0;for(let Le=1;Le<le.length;Le++){const ge=le[he],fe=le[Le],Ie=ge.start+ge.count,Be=j(fe.start,v.width,4),Ye=j(ge.start,v.width,4);fe.start<=Ie+1&&Be===Ye&&j(fe.start+fe.count-1,v.width,4)===Be?ge.count=Math.max(ge.count,fe.start+fe.count-ge.start):(++he,le[he]=fe)}le.length=he+1;const Q=t.getParameter(i.UNPACK_ROW_LENGTH),te=t.getParameter(i.UNPACK_SKIP_PIXELS),de=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let Le=0,ge=le.length;Le<ge;Le++){const fe=le[Le],Ie=Math.floor(fe.start/4),Be=Math.ceil(fe.count/4),Ye=Ie%v.width,G=Math.floor(Ie/v.width),pe=Be,ne=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Ye),t.pixelStorei(i.UNPACK_SKIP_ROWS,G),t.texSubImage2D(i.TEXTURE_2D,0,Ye,G,pe,ne,U,V,v.data)}L.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,Q),t.pixelStorei(i.UNPACK_SKIP_PIXELS,te),t.pixelStorei(i.UNPACK_SKIP_ROWS,de)}}function H(L,v,U){let V=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(V=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(V=i.TEXTURE_3D);const Z=ke(L,v),le=v.source;t.bindTexture(V,L.__webglTexture,i.TEXTURE0+U);const he=n.get(le);if(le.version!==he.__version||Z===!0){if(t.activeTexture(i.TEXTURE0+U),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){const ne=et.getPrimaries(et.workingColorSpace),me=v.colorSpace===vn?null:et.getPrimaries(v.colorSpace),Se=v.colorSpace===vn||ne===me?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se)}t.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment);let te=g(v.image,!1,r.maxTextureSize);te=Ze(v,te);const de=a.convert(v.format,v.colorSpace),Le=a.convert(v.type);let ge=b(v.internalFormat,de,Le,v.normalized,v.colorSpace,v.isVideoTexture);Oe(V,v);let fe;const Ie=v.mipmaps,Be=v.isVideoTexture!==!0,Ye=he.__version===void 0||Z===!0,G=le.dataReady,pe=w(v,te);if(v.isDepthTexture)ge=R(v.format===Ei,v.type),Ye&&(Be?t.texStorage2D(i.TEXTURE_2D,1,ge,te.width,te.height):t.texImage2D(i.TEXTURE_2D,0,ge,te.width,te.height,0,de,Le,null));else if(v.isDataTexture)if(Ie.length>0){Be&&Ye&&t.texStorage2D(i.TEXTURE_2D,pe,ge,Ie[0].width,Ie[0].height);for(let ne=0,me=Ie.length;ne<me;ne++)fe=Ie[ne],Be?G&&t.texSubImage2D(i.TEXTURE_2D,ne,0,0,fe.width,fe.height,de,Le,fe.data):t.texImage2D(i.TEXTURE_2D,ne,ge,fe.width,fe.height,0,de,Le,fe.data);v.generateMipmaps=!1}else Be?(Ye&&t.texStorage2D(i.TEXTURE_2D,pe,ge,te.width,te.height),G&&ie(v,te,de,Le)):t.texImage2D(i.TEXTURE_2D,0,ge,te.width,te.height,0,de,Le,te.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Be&&Ye&&t.texStorage3D(i.TEXTURE_2D_ARRAY,pe,ge,Ie[0].width,Ie[0].height,te.depth);for(let ne=0,me=Ie.length;ne<me;ne++)if(fe=Ie[ne],v.format!==dn)if(de!==null)if(Be){if(G)if(v.layerUpdates.size>0){const Se=Il(fe.width,fe.height,v.format,v.type);for(const oe of v.layerUpdates){const Ne=fe.data.subarray(oe*Se/fe.data.BYTES_PER_ELEMENT,(oe+1)*Se/fe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ne,0,0,oe,fe.width,fe.height,1,de,Ne)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ne,0,0,0,fe.width,fe.height,te.depth,de,fe.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ne,ge,fe.width,fe.height,te.depth,0,fe.data,0,0);else Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Be?G&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ne,0,0,0,fe.width,fe.height,te.depth,de,Le,fe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ne,ge,fe.width,fe.height,te.depth,0,de,Le,fe.data);v.layerUpdates.size>0&&v.clearLayerUpdates()}else{Be&&Ye&&t.texStorage2D(i.TEXTURE_2D,pe,ge,Ie[0].width,Ie[0].height);for(let ne=0,me=Ie.length;ne<me;ne++)fe=Ie[ne],v.format!==dn?de!==null?Be?G&&t.compressedTexSubImage2D(i.TEXTURE_2D,ne,0,0,fe.width,fe.height,de,fe.data):t.compressedTexImage2D(i.TEXTURE_2D,ne,ge,fe.width,fe.height,0,fe.data):Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Be?G&&t.texSubImage2D(i.TEXTURE_2D,ne,0,0,fe.width,fe.height,de,Le,fe.data):t.texImage2D(i.TEXTURE_2D,ne,ge,fe.width,fe.height,0,de,Le,fe.data)}else if(v.isDataArrayTexture)if(Be){if(Ye&&t.texStorage3D(i.TEXTURE_2D_ARRAY,pe,ge,te.width,te.height,te.depth),G)if(v.layerUpdates.size>0){const ne=Il(te.width,te.height,v.format,v.type);for(const me of v.layerUpdates){const Se=te.data.subarray(me*ne/te.data.BYTES_PER_ELEMENT,(me+1)*ne/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,me,te.width,te.height,1,de,Le,Se)}v.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,de,Le,te.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ge,te.width,te.height,te.depth,0,de,Le,te.data);else if(v.isData3DTexture)Be?(Ye&&t.texStorage3D(i.TEXTURE_3D,pe,ge,te.width,te.height,te.depth),G&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,de,Le,te.data)):t.texImage3D(i.TEXTURE_3D,0,ge,te.width,te.height,te.depth,0,de,Le,te.data);else if(v.isFramebufferTexture){if(Ye)if(Be)t.texStorage2D(i.TEXTURE_2D,pe,ge,te.width,te.height);else{let ne=te.width,me=te.height;for(let Se=0;Se<pe;Se++)t.texImage2D(i.TEXTURE_2D,Se,ge,ne,me,0,de,Le,null),ne>>=1,me>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in i){const ne=i.canvas;if(ne.hasAttribute("layoutsubtree")||ne.setAttribute("layoutsubtree","true"),te.parentNode!==ne){ne.appendChild(te),d.add(v),ne.onpaint=me=>{const Se=me.changedElements;for(const oe of d)Se.includes(oe.image)&&(oe.needsUpdate=!0)},ne.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,te);else{const Se=i.RGBA,oe=i.RGBA,Ne=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Se,oe,Ne,te)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Ie.length>0){if(Be&&Ye){const ne=ze(Ie[0]);t.texStorage2D(i.TEXTURE_2D,pe,ge,ne.width,ne.height)}for(let ne=0,me=Ie.length;ne<me;ne++)fe=Ie[ne],Be?G&&t.texSubImage2D(i.TEXTURE_2D,ne,0,0,de,Le,fe):t.texImage2D(i.TEXTURE_2D,ne,ge,de,Le,fe);v.generateMipmaps=!1}else if(Be){if(Ye){const ne=ze(te);t.texStorage2D(i.TEXTURE_2D,pe,ge,ne.width,ne.height)}G&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,de,Le,te)}else t.texImage2D(i.TEXTURE_2D,0,ge,de,Le,te);m(v)&&M(V),he.__version=le.version,v.onUpdate&&v.onUpdate(v)}L.__version=v.version}function ue(L,v,U){if(v.image.length!==6)return;const V=ke(L,v),Z=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,L.__webglTexture,i.TEXTURE0+U);const le=n.get(Z);if(Z.version!==le.__version||V===!0){t.activeTexture(i.TEXTURE0+U);const he=et.getPrimaries(et.workingColorSpace),Q=v.colorSpace===vn?null:et.getPrimaries(v.colorSpace),te=v.colorSpace===vn||he===Q?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,te);const de=v.isCompressedTexture||v.image[0].isCompressedTexture,Le=v.image[0]&&v.image[0].isDataTexture,ge=[];for(let oe=0;oe<6;oe++)!de&&!Le?ge[oe]=g(v.image[oe],!0,r.maxCubemapSize):ge[oe]=Le?v.image[oe].image:v.image[oe],ge[oe]=Ze(v,ge[oe]);const fe=ge[0],Ie=a.convert(v.format,v.colorSpace),Be=a.convert(v.type),Ye=b(v.internalFormat,Ie,Be,v.normalized,v.colorSpace),G=v.isVideoTexture!==!0,pe=le.__version===void 0||V===!0,ne=Z.dataReady;let me=w(v,fe);Oe(i.TEXTURE_CUBE_MAP,v);let Se;if(de){G&&pe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,me,Ye,fe.width,fe.height);for(let oe=0;oe<6;oe++){Se=ge[oe].mipmaps;for(let Ne=0;Ne<Se.length;Ne++){const Pe=Se[Ne];v.format!==dn?Ie!==null?G?ne&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne,0,0,Pe.width,Pe.height,Ie,Pe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne,Ye,Pe.width,Pe.height,0,Pe.data):Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):G?ne&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne,0,0,Pe.width,Pe.height,Ie,Be,Pe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne,Ye,Pe.width,Pe.height,0,Ie,Be,Pe.data)}}}else{if(Se=v.mipmaps,G&&pe){Se.length>0&&me++;const oe=ze(ge[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,me,Ye,oe.width,oe.height)}for(let oe=0;oe<6;oe++)if(Le){G?ne&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,ge[oe].width,ge[oe].height,Ie,Be,ge[oe].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,Ye,ge[oe].width,ge[oe].height,0,Ie,Be,ge[oe].data);for(let Ne=0;Ne<Se.length;Ne++){const Mt=Se[Ne].image[oe].image;G?ne&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne+1,0,0,Mt.width,Mt.height,Ie,Be,Mt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne+1,Ye,Mt.width,Mt.height,0,Ie,Be,Mt.data)}}else{G?ne&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,Ie,Be,ge[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,Ye,Ie,Be,ge[oe]);for(let Ne=0;Ne<Se.length;Ne++){const Pe=Se[Ne];G?ne&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne+1,0,0,Ie,Be,Pe.image[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne+1,Ye,Ie,Be,Pe.image[oe])}}}m(v)&&M(i.TEXTURE_CUBE_MAP),le.__version=Z.version,v.onUpdate&&v.onUpdate(v)}L.__version=v.version}function se(L,v,U,V,Z,le){const he=a.convert(U.format,U.colorSpace),Q=a.convert(U.type),te=b(U.internalFormat,he,Q,U.normalized,U.colorSpace),de=n.get(v),Le=n.get(U);if(Le.__renderTarget=v,!de.__hasExternalTextures){const ge=Math.max(1,v.width>>le),fe=Math.max(1,v.height>>le);Z===i.TEXTURE_3D||Z===i.TEXTURE_2D_ARRAY?t.texImage3D(Z,le,te,ge,fe,v.depth,0,he,Q,null):t.texImage2D(Z,le,te,ge,fe,0,he,Q,null)}t.bindFramebuffer(i.FRAMEBUFFER,L),xt(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,V,Z,Le.__webglTexture,0,pt(v)):(Z===i.TEXTURE_2D||Z>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,V,Z,Le.__webglTexture,le),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ye(L,v,U){if(i.bindRenderbuffer(i.RENDERBUFFER,L),v.depthBuffer){const V=v.depthTexture,Z=V&&V.isDepthTexture?V.type:null,le=R(v.stencilBuffer,Z),he=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;xt(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,pt(v),le,v.width,v.height):U?i.renderbufferStorageMultisample(i.RENDERBUFFER,pt(v),le,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,le,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,he,i.RENDERBUFFER,L)}else{const V=v.textures;for(let Z=0;Z<V.length;Z++){const le=V[Z],he=a.convert(le.format,le.colorSpace),Q=a.convert(le.type),te=b(le.internalFormat,he,Q,le.normalized,le.colorSpace);xt(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,pt(v),te,v.width,v.height):U?i.renderbufferStorageMultisample(i.RENDERBUFFER,pt(v),te,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,te,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function qe(L,v,U){const V=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,L),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Z=n.get(v.depthTexture);if(Z.__renderTarget=v,(!Z.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),V){if(Z.__webglInit===void 0&&(Z.__webglInit=!0,v.depthTexture.addEventListener("dispose",P)),Z.__webglTexture===void 0){Z.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),Oe(i.TEXTURE_CUBE_MAP,v.depthTexture);const de=a.convert(v.depthTexture.format),Le=a.convert(v.depthTexture.type);let ge;v.depthTexture.format===Qn?ge=i.DEPTH_COMPONENT24:v.depthTexture.format===Ei&&(ge=i.DEPTH24_STENCIL8);for(let fe=0;fe<6;fe++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,ge,v.width,v.height,0,de,Le,null)}}else ae(v.depthTexture,0);const le=Z.__webglTexture,he=pt(v),Q=V?i.TEXTURE_CUBE_MAP_POSITIVE_X+U:i.TEXTURE_2D,te=v.depthTexture.format===Ei?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(v.depthTexture.format===Qn)xt(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,te,Q,le,0,he):i.framebufferTexture2D(i.FRAMEBUFFER,te,Q,le,0);else if(v.depthTexture.format===Ei)xt(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,te,Q,le,0,he):i.framebufferTexture2D(i.FRAMEBUFFER,te,Q,le,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ce(L){const v=n.get(L),U=L.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==L.depthTexture){const V=L.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),V){const Z=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,V.removeEventListener("dispose",Z)};V.addEventListener("dispose",Z),v.__depthDisposeCallback=Z}v.__boundDepthTexture=V}if(L.depthTexture&&!v.__autoAllocateDepthBuffer)if(U)for(let V=0;V<6;V++)qe(v.__webglFramebuffer[V],L,V);else{const V=L.texture.mipmaps;V&&V.length>0?qe(v.__webglFramebuffer[0],L,0):qe(v.__webglFramebuffer,L,0)}else if(U){v.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[V]),v.__webglDepthbuffer[V]===void 0)v.__webglDepthbuffer[V]=i.createRenderbuffer(),ye(v.__webglDepthbuffer[V],L,!1);else{const Z=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,le=v.__webglDepthbuffer[V];i.bindRenderbuffer(i.RENDERBUFFER,le),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,le)}}else{const V=L.texture.mipmaps;if(V&&V.length>0?t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),ye(v.__webglDepthbuffer,L,!1);else{const Z=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,le=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,le),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,le)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ue(L,v,U){const V=n.get(L);v!==void 0&&se(V.__webglFramebuffer,L,L.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),U!==void 0&&Ce(L)}function Xe(L){const v=L.texture,U=n.get(L),V=n.get(v);L.addEventListener("dispose",S);const Z=L.textures,le=L.isWebGLCubeRenderTarget===!0,he=Z.length>1;if(he||(V.__webglTexture===void 0&&(V.__webglTexture=i.createTexture()),V.__version=v.version,s.memory.textures++),le){U.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(v.mipmaps&&v.mipmaps.length>0){U.__webglFramebuffer[Q]=[];for(let te=0;te<v.mipmaps.length;te++)U.__webglFramebuffer[Q][te]=i.createFramebuffer()}else U.__webglFramebuffer[Q]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){U.__webglFramebuffer=[];for(let Q=0;Q<v.mipmaps.length;Q++)U.__webglFramebuffer[Q]=i.createFramebuffer()}else U.__webglFramebuffer=i.createFramebuffer();if(he)for(let Q=0,te=Z.length;Q<te;Q++){const de=n.get(Z[Q]);de.__webglTexture===void 0&&(de.__webglTexture=i.createTexture(),s.memory.textures++)}if(L.samples>0&&xt(L)===!1){U.__webglMultisampledFramebuffer=i.createFramebuffer(),U.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let Q=0;Q<Z.length;Q++){const te=Z[Q];U.__webglColorRenderbuffer[Q]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,U.__webglColorRenderbuffer[Q]);const de=a.convert(te.format,te.colorSpace),Le=a.convert(te.type),ge=b(te.internalFormat,de,Le,te.normalized,te.colorSpace,L.isXRRenderTarget===!0),fe=pt(L);i.renderbufferStorageMultisample(i.RENDERBUFFER,fe,ge,L.width,L.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Q,i.RENDERBUFFER,U.__webglColorRenderbuffer[Q])}i.bindRenderbuffer(i.RENDERBUFFER,null),L.depthBuffer&&(U.__webglDepthRenderbuffer=i.createRenderbuffer(),ye(U.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(le){t.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture),Oe(i.TEXTURE_CUBE_MAP,v);for(let Q=0;Q<6;Q++)if(v.mipmaps&&v.mipmaps.length>0)for(let te=0;te<v.mipmaps.length;te++)se(U.__webglFramebuffer[Q][te],L,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,te);else se(U.__webglFramebuffer[Q],L,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);m(v)&&M(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(he){for(let Q=0,te=Z.length;Q<te;Q++){const de=Z[Q],Le=n.get(de);let ge=i.TEXTURE_2D;(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(ge=L.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ge,Le.__webglTexture),Oe(ge,de),se(U.__webglFramebuffer,L,de,i.COLOR_ATTACHMENT0+Q,ge,0),m(de)&&M(ge)}t.unbindTexture()}else{let Q=i.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(Q=L.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Q,V.__webglTexture),Oe(Q,v),v.mipmaps&&v.mipmaps.length>0)for(let te=0;te<v.mipmaps.length;te++)se(U.__webglFramebuffer[te],L,v,i.COLOR_ATTACHMENT0,Q,te);else se(U.__webglFramebuffer,L,v,i.COLOR_ATTACHMENT0,Q,0);m(v)&&M(Q),t.unbindTexture()}L.depthBuffer&&Ce(L)}function We(L){const v=L.textures;for(let U=0,V=v.length;U<V;U++){const Z=v[U];if(m(Z)){const le=E(L),he=n.get(Z).__webglTexture;t.bindTexture(le,he),M(le),t.unbindTexture()}}}const _t=[],Tt=[];function Bt(L){if(L.samples>0){if(xt(L)===!1){const v=L.textures,U=L.width,V=L.height;let Z=i.COLOR_BUFFER_BIT;const le=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,he=n.get(L),Q=v.length>1;if(Q)for(let de=0;de<v.length;de++)t.bindFramebuffer(i.FRAMEBUFFER,he.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,he.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,he.__webglMultisampledFramebuffer);const te=L.texture.mipmaps;te&&te.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,he.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,he.__webglFramebuffer);for(let de=0;de<v.length;de++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(Z|=i.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(Z|=i.STENCIL_BUFFER_BIT)),Q){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,he.__webglColorRenderbuffer[de]);const Le=n.get(v[de]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Le,0)}i.blitFramebuffer(0,0,U,V,0,0,U,V,Z,i.NEAREST),c===!0&&(_t.length=0,Tt.length=0,_t.push(i.COLOR_ATTACHMENT0+de),L.depthBuffer&&L.storeMultisampledDepthBuffer===!1&&(_t.push(le),Tt.push(le),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Tt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,_t))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Q)for(let de=0;de<v.length;de++){t.bindFramebuffer(i.FRAMEBUFFER,he.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.RENDERBUFFER,he.__webglColorRenderbuffer[de]);const Le=n.get(v[de]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,he.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.TEXTURE_2D,Le,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,he.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.storeMultisampledDepthBuffer===!1&&c){const v=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function pt(L){return Math.min(r.maxSamples,L.samples)}function xt(L){const v=n.get(L);return L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function k(L){const v=s.render.frame;u.get(L)!==v&&(u.set(L,v),L.update())}function Ze(L,v){const U=L.colorSpace,V=L.format,Z=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||U!==Ir&&U!==vn&&(et.getTransfer(U)===ft?(V!==dn||Z!==an)&&Ge("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):rt("WebGLTextures: Unsupported texture color space:",U)),v}function ze(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(l.width=L.naturalWidth||L.width,l.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(l.width=L.displayWidth,l.height=L.displayHeight):(l.width=L.width,l.height=L.height),l}this.allocateTextureUnit=W,this.resetTextureUnits=F,this.getTextureUnits=D,this.setTextureUnits=B,this.setTexture2D=ae,this.setTexture2DArray=q,this.setTexture3D=ee,this.setTextureCube=N,this.rebindTextures=Ue,this.setupRenderTarget=Xe,this.updateRenderTargetMipmap=We,this.updateMultisampleRenderTarget=Bt,this.setupDepthRenderbuffer=Ce,this.setupFrameBufferTexture=se,this.useMultisampledRTT=xt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function h_(i,e){function t(n,r=vn){let a;const s=et.getTransfer(r);if(n===an)return i.UNSIGNED_BYTE;if(n===Po)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Do)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Bc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===zc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Fc)return i.BYTE;if(n===Oc)return i.SHORT;if(n===Pr)return i.UNSIGNED_SHORT;if(n===Lo)return i.INT;if(n===In)return i.UNSIGNED_INT;if(n===Rn)return i.FLOAT;if(n===Nn)return i.HALF_FLOAT;if(n===kc)return i.ALPHA;if(n===Gc)return i.RGB;if(n===dn)return i.RGBA;if(n===Qn)return i.DEPTH_COMPONENT;if(n===Ei)return i.DEPTH_STENCIL;if(n===Hc)return i.RED;if(n===Io)return i.RED_INTEGER;if(n===Li)return i.RG;if(n===No)return i.RG_INTEGER;if(n===Uo)return i.RGBA_INTEGER;if(n===Sa||n===ba||n===Ea||n===ya)if(s===ft)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(n===Sa)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ba)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ea)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ya)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(n===Sa)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ba)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ea)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ya)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Bs||n===zs||n===ks||n===Gs)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(n===Bs)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===zs)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ks)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Gs)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Hs||n===Vs||n===Ws||n===Xs||n===Ys||n===Ta||n===Ks)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(n===Hs||n===Vs)return s===ft?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(n===Ws)return s===ft?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC;if(n===Xs)return a.COMPRESSED_R11_EAC;if(n===Ys)return a.COMPRESSED_SIGNED_R11_EAC;if(n===Ta)return a.COMPRESSED_RG11_EAC;if(n===Ks)return a.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===qs||n===Zs||n===$s||n===Js||n===Qs||n===js||n===eo||n===to||n===no||n===io||n===ro||n===ao||n===so||n===oo)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(n===qs)return s===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Zs)return s===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===$s)return s===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Js)return s===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Qs)return s===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===js)return s===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===eo)return s===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===to)return s===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===no)return s===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===io)return s===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ro)return s===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ao)return s===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===so)return s===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===oo)return s===ft?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===lo||n===co||n===uo)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(n===lo)return s===ft?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===co)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===uo)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ho||n===fo||n===Ra||n===po)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(n===ho)return a.COMPRESSED_RED_RGTC1_EXT;if(n===fo)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ra)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===po)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Dr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const d_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,f_=`
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

}`;class p_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new jc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Kt({vertexShader:d_,fragmentShader:f_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Jt(new Fn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class m_ extends Di{constructor(e,t){super();const n=this;let r=null,a=1,s=null,o="local-floor",c=1,l=null,u=null,d=null,h=null,p=null,_=null;const x=typeof XRWebGLBinding<"u",g=new p_,m={},M=t.getContextAttributes();let E=null,b=null;const R=[],w=[],P=new Ve;let S=null,T=null;const I=new un;I.viewport=new At;const C=new un;C.viewport=new At;const O=[I,C],F=new Ep;let D=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let ie=R[j];return ie===void 0&&(ie=new ss,R[j]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(j){let ie=R[j];return ie===void 0&&(ie=new ss,R[j]=ie),ie.getGripSpace()},this.getHand=function(j){let ie=R[j];return ie===void 0&&(ie=new ss,R[j]=ie),ie.getHandSpace()};function W(j){const ie=w.indexOf(j.inputSource);if(ie===-1)return;const H=R[ie];H!==void 0&&(H.update(j.inputSource,j.frame,l||s),H.dispatchEvent({type:j.type,data:j.inputSource}))}function $(){r.removeEventListener("select",W),r.removeEventListener("selectstart",W),r.removeEventListener("selectend",W),r.removeEventListener("squeeze",W),r.removeEventListener("squeezestart",W),r.removeEventListener("squeezeend",W),r.removeEventListener("end",$),r.removeEventListener("inputsourceschange",ae);for(let j=0;j<R.length;j++){const ie=w[j];ie!==null&&(w[j]=null,R[j].disconnect(ie))}D=null,B=null,g.reset();for(const j in m)delete m[j];if(e.setRenderTarget(E),p=null,h=null,d=null,r=null,b=null,ke.stop(),n.isPresenting=!1,e.setPixelRatio(S),e.setSize(P.width,P.height,!1),T!==null){const j=T.camera;j.fov=T.fov,j.zoom=T.zoom,j.updateProjectionMatrix(),T=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){a=j,n.isPresenting===!0&&Ge("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){o=j,n.isPresenting===!0&&Ge("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||s},this.setReferenceSpace=function(j){l=j},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(j){if(r=j,r!==null){if(E=e.getRenderTarget(),r.addEventListener("select",W),r.addEventListener("selectstart",W),r.addEventListener("selectend",W),r.addEventListener("squeeze",W),r.addEventListener("squeezestart",W),r.addEventListener("squeezeend",W),r.addEventListener("end",$),r.addEventListener("inputsourceschange",ae),M.xrCompatible!==!0&&await t.makeXRCompatible(),S=e.getPixelRatio(),e.getSize(P),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let H=null,ue=null,se=null;M.depth&&(se=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,H=M.stencil?Ei:Qn,ue=M.stencil?Dr:In);const ye={colorFormat:t.RGBA8,depthFormat:se,scaleFactor:a};d=this.getBinding(),h=d.createProjectionLayer(ye),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),b=new fn(h.textureWidth,h.textureHeight,{format:dn,type:an,depthTexture:new Nr(h.textureWidth,h.textureHeight,ue,void 0,void 0,void 0,void 0,void 0,void 0,H),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{const H={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:a};p=new XRWebGLLayer(r,t,H),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),b=new fn(p.framebufferWidth,p.framebufferHeight,{format:dn,type:an,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(c),l=null,s=await r.requestReferenceSpace(o),ke.setContext(r),ke.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function ae(j){for(let ie=0;ie<j.removed.length;ie++){const H=j.removed[ie],ue=w.indexOf(H);ue>=0&&(w[ue]=null,R[ue].disconnect(H))}for(let ie=0;ie<j.added.length;ie++){const H=j.added[ie];let ue=w.indexOf(H);if(ue===-1){for(let ye=0;ye<R.length;ye++)if(ye>=w.length){w.push(H),ue=ye;break}else if(w[ye]===null){w[ye]=H,ue=ye;break}if(ue===-1)break}const se=R[ue];se&&se.connect(H)}}const q=new X,ee=new X;function N(j,ie,H){q.setFromMatrixPosition(ie.matrixWorld),ee.setFromMatrixPosition(H.matrixWorld);const ue=q.distanceTo(ee),se=ie.projectionMatrix.elements,ye=H.projectionMatrix.elements,qe=se[14]/(se[10]-1),Ce=se[14]/(se[10]+1),Ue=(se[9]+1)/se[5],Xe=(se[9]-1)/se[5],We=(se[8]-1)/se[0],_t=(ye[8]+1)/ye[0],Tt=qe*We,Bt=qe*_t,pt=ue/(-We+_t),xt=pt*-We;if(ie.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(xt),j.translateZ(pt),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),se[10]===-1)j.projectionMatrix.copy(ie.projectionMatrix),j.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{const k=qe+pt,Ze=Ce+pt,ze=Tt-xt,L=Bt+(ue-xt),v=Ue*Ce/Ze*k,U=Xe*Ce/Ze*k;j.projectionMatrix.makePerspective(ze,L,v,U,k,Ze),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function re(j,ie){ie===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(ie.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(r===null)return;let ie=j.near,H=j.far;g.texture!==null&&(g.depthNear>0&&(ie=g.depthNear),g.depthFar>0&&(H=g.depthFar)),F.near=C.near=I.near=ie,F.far=C.far=I.far=H,(D!==F.near||B!==F.far)&&(r.updateRenderState({depthNear:F.near,depthFar:F.far}),D=F.near,B=F.far),F.layers.mask=j.layers.mask|6,I.layers.mask=F.layers.mask&-5,C.layers.mask=F.layers.mask&-3;const ue=j.parent,se=F.cameras;re(F,ue);for(let ye=0;ye<se.length;ye++)re(se[ye],ue);se.length===2?N(F,I,C):F.projectionMatrix.copy(I.projectionMatrix),T===null&&j.isPerspectiveCamera&&(T={camera:j,fov:j.fov,zoom:j.zoom}),ce(j,F,ue)};function ce(j,ie,H){H===null?j.matrix.copy(ie.matrixWorld):(j.matrix.copy(H.matrixWorld),j.matrix.invert(),j.matrix.multiply(ie.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(ie.projectionMatrix),j.projectionMatrixInverse.copy(ie.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=mo*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(h===null&&p===null))return c},this.setFoveation=function(j){c=j,h!==null&&(h.fixedFoveation=j),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=j)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(F)},this.getCameraTexture=function(j){return m[j]};let Re=null;function Oe(j,ie){if(u=ie.getViewerPose(l||s),_=ie,u!==null){const H=u.views;p!==null&&(e.setRenderTargetFramebuffer(b,p.framebuffer),e.setRenderTarget(b));let ue=!1;H.length!==F.cameras.length&&(F.cameras.length=0,ue=!0);for(let Ce=0;Ce<H.length;Ce++){const Ue=H[Ce];let Xe=null;if(p!==null)Xe=p.getViewport(Ue);else{const _t=d.getViewSubImage(h,Ue);Xe=_t.viewport,Ce===0&&(e.setRenderTargetTextures(b,_t.colorTexture,_t.depthStencilTexture),e.setRenderTarget(b))}let We=O[Ce];We===void 0&&(We=new un,We.layers.enable(Ce),We.viewport=new At,O[Ce]=We),We.matrix.fromArray(Ue.transform.matrix),We.matrix.decompose(We.position,We.quaternion,We.scale),We.projectionMatrix.fromArray(Ue.projectionMatrix),We.projectionMatrixInverse.copy(We.projectionMatrix).invert(),We.viewport.set(Xe.x,Xe.y,Xe.width,Xe.height),Ce===0&&(F.matrix.copy(We.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),ue===!0&&F.cameras.push(We)}const se=r.enabledFeatures;if(se&&se.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&x){d=n.getBinding();const Ce=d.getDepthInformation(H[0]);Ce&&Ce.isValid&&Ce.texture&&g.init(Ce,r.renderState)}if(se&&se.includes("camera-access")&&x){e.state.unbindTexture(),d=n.getBinding();for(let Ce=0;Ce<H.length;Ce++){const Ue=H[Ce].camera;if(Ue){let Xe=m[Ue];Xe||(Xe=new jc,m[Ue]=Xe);const We=d.getCameraImage(Ue);Xe.sourceTexture=We}}}}for(let H=0;H<R.length;H++){const ue=w[H],se=R[H];ue!==null&&se!==void 0&&se.update(ue,ie,l||s)}Re&&Re(j,ie),ie.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ie}),_=null}const ke=new ru;ke.setAnimationLoop(Oe),this.setAnimationLoop=function(j){Re=j},this.dispose=function(){}}}const g_=new Ct,hu=new He;hu.set(-1,0,0,0,1,0,0,0,1);function __(i,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,eu(i)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function r(g,m,M,E,b){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?a(g,m):m.isMeshLambertMaterial?(a(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(a(g,m),d(g,m)):m.isMeshPhongMaterial?(a(g,m),u(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(a(g,m),h(g,m),m.isMeshPhysicalMaterial&&p(g,m,b)):m.isMeshMatcapMaterial?(a(g,m),_(g,m)):m.isMeshDepthMaterial?a(g,m):m.isMeshDistanceMaterial?(a(g,m),x(g,m)):m.isMeshNormalMaterial?a(g,m):m.isLineBasicMaterial?(s(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?c(g,m,M,E):m.isSpriteMaterial?l(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function a(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===en&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===en&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const M=e.get(m),E=M.envMap,b=M.envMapRotation;E&&(g.envMap.value=E,g.envMapRotation.value.setFromMatrix4(g_.makeRotationFromEuler(b)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(hu),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function s(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function c(g,m,M,E){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*M,g.scale.value=E*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function l(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function u(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function d(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function h(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function p(g,m,M){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===en&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.retroreflectivity>0&&(g.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=M.texture,g.transmissionSamplerSize.value.set(M.width,M.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function _(g,m){m.matcap&&(g.matcap.value=m.matcap)}function x(g,m){const M=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(M.matrixWorld),g.nearDistance.value=M.shadow.camera.near,g.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function x_(i,e,t,n){let r={},a={},s=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(b,R){const w=R.program;n.uniformBlockBinding(b,w)}function l(b,R){let w=r[b.id];w===void 0&&(g(b),w=u(b),r[b.id]=w,b.addEventListener("dispose",M));const P=R.program;n.updateUBOMapping(b,P);const S=e.render.frame;a[b.id]!==S&&(h(b),a[b.id]=S)}function u(b){const R=d();b.__bindingPointIndex=R;const w=i.createBuffer(),P=b.__size,S=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,w),i.bufferData(i.UNIFORM_BUFFER,P,S),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,R,w),w}function d(){for(let b=0;b<o;b++)if(s.indexOf(b)===-1)return s.push(b),b;return rt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(b){const R=r[b.id],w=b.uniforms,P=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,R);for(let S=0,T=w.length;S<T;S++){const I=w[S];if(Array.isArray(I))for(let C=0,O=I.length;C<O;C++)p(I[C],S,C,P);else p(I,S,0,P)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(b,R,w,P){if(x(b,R,w,P)===!0){const S=b.__offset,T=b.value;if(Array.isArray(T)){let I=0;for(let C=0;C<T.length;C++){const O=T[C],F=m(O);_(O,b.__data,I),typeof O!="number"&&typeof O!="boolean"&&!O.isMatrix3&&!ArrayBuffer.isView(O)&&(I+=F.storage/Float32Array.BYTES_PER_ELEMENT)}}else _(T,b.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,S,b.__data)}}function _(b,R,w){typeof b=="number"||typeof b=="boolean"?R[0]=b:b.isMatrix3?(R[0]=b.elements[0],R[1]=b.elements[1],R[2]=b.elements[2],R[3]=0,R[4]=b.elements[3],R[5]=b.elements[4],R[6]=b.elements[5],R[7]=0,R[8]=b.elements[6],R[9]=b.elements[7],R[10]=b.elements[8],R[11]=0):ArrayBuffer.isView(b)?R.set(new b.constructor(b.buffer,b.byteOffset,R.length)):b.toArray(R,w)}function x(b,R,w,P){const S=b.value,T=R+"_"+w;if(P[T]===void 0)return typeof S=="number"||typeof S=="boolean"?P[T]=S:ArrayBuffer.isView(S)?P[T]=S.slice():P[T]=S.clone(),!0;{const I=P[T];if(typeof S=="number"||typeof S=="boolean"){if(I!==S)return P[T]=S,!0}else{if(ArrayBuffer.isView(S))return!0;if(I.equals(S)===!1)return I.copy(S),!0}}return!1}function g(b){const R=b.uniforms;let w=0;const P=16;for(let T=0,I=R.length;T<I;T++){const C=Array.isArray(R[T])?R[T]:[R[T]];for(let O=0,F=C.length;O<F;O++){const D=C[O],B=Array.isArray(D.value)?D.value:[D.value];for(let W=0,$=B.length;W<$;W++){const ae=B[W],q=m(ae),ee=w%P,N=ee%q.boundary,re=ee+N;w+=N,re!==0&&P-re<q.storage&&(w+=P-re),D.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=w,w+=q.storage}}}const S=w%P;return S>0&&(w+=P-S),b.__size=w,b.__cache={},this}function m(b){const R={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(R.boundary=4,R.storage=4):b.isVector2?(R.boundary=8,R.storage=8):b.isVector3||b.isColor?(R.boundary=16,R.storage=12):b.isVector4?(R.boundary=16,R.storage=16):b.isMatrix3?(R.boundary=48,R.storage=48):b.isMatrix4?(R.boundary=64,R.storage=64):b.isTexture?Ge("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(b)?(R.boundary=16,R.storage=b.byteLength):Ge("WebGLRenderer: Unsupported uniform value type.",b),R}function M(b){const R=b.target;R.removeEventListener("dispose",M);const w=s.indexOf(R.__bindingPointIndex);s.splice(w,1),i.deleteBuffer(r[R.id]),delete r[R.id],delete a[R.id]}function E(){for(const b in r)i.deleteBuffer(r[b]);s=[],r={},a={}}return{bind:c,update:l,dispose:E}}const v_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let wn=null;function M_(){return wn===null&&(wn=new ji(v_,16,16,Li,Nn),wn.name="DFG_LUT",wn.minFilter=Pt,wn.magFilter=Pt,wn.wrapS=Xn,wn.wrapT=Xn,wn.generateMipmaps=!1,wn.needsUpdate=!0),wn}class S_{constructor(e={}){const{canvas:t=Gf(),context:n=null,depth:r=!0,stencil:a=!1,alpha:s=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1,outputBufferType:p=an}=e;this.isWebGLRenderer=!0;let _;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=n.getContextAttributes().alpha}else _=s;const x=p,g=new Set([Uo,No,Io]),m=new Set([an,In,Pr,Dr,Po,Do]),M=new Uint32Array(4),E=new Int32Array(4),b=new X;let R=null,w=null;const P=[],S=[];let T=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ln,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const I=this;let C=!1,O=null,F=null,D=null,B=null;this._outputColorSpace=cn;let W=0,$=0,ae=null,q=-1,ee=null;const N=new At,re=new At;let ce=null;const Re=new st(0);let Oe=0,ke=t.width,j=t.height,ie=1,H=null,ue=null;const se=new At(0,0,ke,j),ye=new At(0,0,ke,j);let qe=!1;const Ce=new ko;let Ue=!1,Xe=!1;const We=new Ct,_t=new X,Tt=new At,Bt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let pt=!1;function xt(){return ae===null?ie:1}let k=n;function Ze(y,z){return t.getContext(y,z)}let ze,L,v,U,V,Z,le,he,Q,te,de,Le,ge,fe,Ie,Be,Ye,G,pe,ne,me,Se,oe;try{const y={alpha:!0,depth:r,stencil:a,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Co}`),t.addEventListener("webglcontextlost",Mt,!1),t.addEventListener("webglcontextrestored",ot,!1),t.addEventListener("webglcontextcreationerror",mn,!1),k===null){const z="webgl2";if(k=Ze(z,y),k===null)throw Ze(z)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ne()}catch(y){throw t.removeEventListener("webglcontextlost",Mt,!1),t.removeEventListener("webglcontextrestored",ot,!1),t.removeEventListener("webglcontextcreationerror",mn,!1),rt("WebGLRenderer: "+y.message),y}function Ne(){ze=new Mg(k),ze.init(),me=new h_(k,ze),L=new ug(k,ze,e,me),v=new c_(k,ze),L.reversedDepthBuffer&&h&&v.buffers.depth.setReversed(!0),F=k.createFramebuffer(),D=k.createFramebuffer(),B=k.createFramebuffer(),U=new Eg(k),V=new Z1,Z=new u_(k,ze,v,V,L,me,U),le=new vg(I),he=new wp(k),Se=new lg(k,he),Q=new Sg(k,he,U,Se),te=new wg(k,Q,he,Se,U),G=new yg(k,L,Z),Ie=new hg(V),de=new q1(I,le,ze,L,Se,Ie),Le=new __(I,V),ge=new J1,fe=new i_(ze),Ye=new og(I,le,v,te,_,c),Be=new l_(I,te,L),oe=new x_(k,U,L,v),pe=new cg(k,ze,U),ne=new bg(k,ze,U),U.programs=de.programs,I.capabilities=L,I.extensions=ze,I.properties=V,I.renderLists=ge,I.shadowMap=Be,I.state=v,I.info=U}x!==an&&(T=new Tg(x,t.width,t.height,o,r,a));const Pe=new m_(I,k);this.xr=Pe,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){const y=ze.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=ze.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return ie},this.setPixelRatio=function(y){y!==void 0&&(ie=y,this.setSize(ke,j,!1))},this.getSize=function(y){return y.set(ke,j)},this.setSize=function(y,z,J=!0){if(Pe.isPresenting){Ge("WebGLRenderer: Can't change size while VR device is presenting.");return}ke=y,j=z,t.width=Math.floor(y*ie),t.height=Math.floor(z*ie),J===!0&&(t.style.width=y+"px",t.style.height=z+"px"),T!==null&&T.setSize(t.width,t.height),this.setViewport(0,0,y,z)},this.getDrawingBufferSize=function(y){return y.set(ke*ie,j*ie).floor()},this.setDrawingBufferSize=function(y,z,J){ke=y,j=z,ie=J,t.width=Math.floor(y*J),t.height=Math.floor(z*J),this.setViewport(0,0,y,z)},this.setEffects=function(y){if(x===an){rt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(y){for(let z=0;z<y.length;z++)if(y[z].isOutputPass===!0){Ge("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(y||[])},this.getCurrentViewport=function(y){return y.copy(N)},this.getViewport=function(y){return y.copy(se)},this.setViewport=function(y,z,J,Y){y.isVector4?se.set(y.x,y.y,y.z,y.w):se.set(y,z,J,Y),v.viewport(N.copy(se).multiplyScalar(ie).round())},this.getScissor=function(y){return y.copy(ye)},this.setScissor=function(y,z,J,Y){y.isVector4?ye.set(y.x,y.y,y.z,y.w):ye.set(y,z,J,Y),v.scissor(re.copy(ye).multiplyScalar(ie).round())},this.getScissorTest=function(){return qe},this.setScissorTest=function(y){v.setScissorTest(qe=y)},this.setOpaqueSort=function(y){H=y},this.setTransparentSort=function(y){ue=y},this.getClearColor=function(y){return y.copy(Ye.getClearColor())},this.setClearColor=function(){Ye.setClearColor(...arguments)},this.getClearAlpha=function(){return Ye.getClearAlpha()},this.setClearAlpha=function(){Ye.setClearAlpha(...arguments)},this.clear=function(y=!0,z=!0,J=!0){let Y=0;if(y){let K=!1;if(ae!==null){const Me=ae.texture.format;K=g.has(Me)}if(K){const Me=ae.texture.type,we=m.has(Me),xe=Ye.getClearColor(),Ae=Ye.getClearAlpha(),De=xe.r,$e=xe.g,je=xe.b;we?(M[0]=De,M[1]=$e,M[2]=je,M[3]=Ae,k.clearBufferuiv(k.COLOR,0,M)):(E[0]=De,E[1]=$e,E[2]=je,E[3]=Ae,k.clearBufferiv(k.COLOR,0,E))}else Y|=k.COLOR_BUFFER_BIT}z&&(Y|=k.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),J&&(Y|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Y!==0&&k.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(y){y.setRenderer(this),O=y},this.dispose=function(){t.removeEventListener("webglcontextlost",Mt,!1),t.removeEventListener("webglcontextrestored",ot,!1),t.removeEventListener("webglcontextcreationerror",mn,!1),Ye.dispose(),ge.dispose(),fe.dispose(),V.dispose(),le.dispose(),te.dispose(),Se.dispose(),oe.dispose(),de.dispose(),Pe.dispose(),Pe.removeEventListener("sessionstart",Wo),Pe.removeEventListener("sessionend",Xo),fi.stop()};function Mt(y){y.preventDefault(),ml("WebGLRenderer: Context Lost."),C=!0}function ot(){ml("WebGLRenderer: Context Restored."),C=!1;const y=U.autoReset,z=Be.enabled,J=Be.autoUpdate,Y=Be.needsUpdate,K=Be.type;Ne(),U.autoReset=y,Be.enabled=z,Be.autoUpdate=J,Be.needsUpdate=Y,Be.type=K}function mn(y){rt("WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function bn(y){const z=y.target;z.removeEventListener("dispose",bn),gu(z)}function gu(y){_u(y),V.remove(y)}function _u(y){const z=V.get(y).programs;z!==void 0&&(z.forEach(function(J){de.releaseProgram(J)}),y.isShaderMaterial&&de.releaseShaderCache(y))}this.renderBufferDirect=function(y,z,J,Y,K,Me){z===null&&(z=Bt);const we=K.isMesh&&K.matrixWorld.determinantAffine()<0,xe=Mu(y,z,J,Y,K);v.setMaterial(Y,we);let Ae=J.index,De=1;if(Y.wireframe===!0){if(Ae=Q.getWireframeAttribute(J),Ae===void 0)return;De=2}const $e=J.drawRange,je=J.attributes.position;let Te=$e.start*De,lt=($e.start+$e.count)*De;Me!==null&&(Te=Math.max(Te,Me.start*De),lt=Math.min(lt,(Me.start+Me.count)*De)),Ae!==null?(Te=Math.max(Te,0),lt=Math.min(lt,Ae.count)):je!=null&&(Te=Math.max(Te,0),lt=Math.min(lt,je.count));const Dt=lt-Te;if(Dt<0||Dt===1/0)return;Se.setup(K,Y,xe,J,Ae);let Et,vt=pe;if(Ae!==null&&(Et=he.get(Ae),vt=ne,vt.setIndex(Et)),K.isMesh)Y.wireframe===!0?(v.setLineWidth(Y.wireframeLinewidth*xt()),vt.setMode(k.LINES)):vt.setMode(k.TRIANGLES);else if(K.isLine){let Vt=Y.linewidth;Vt===void 0&&(Vt=1),v.setLineWidth(Vt*xt()),K.isLineSegments?vt.setMode(k.LINES):K.isLineLoop?vt.setMode(k.LINE_LOOP):vt.setMode(k.LINE_STRIP)}else K.isPoints?vt.setMode(k.POINTS):K.isSprite&&vt.setMode(k.TRIANGLES);if(K.isBatchedMesh)if(ze.get("WEBGL_multi_draw"))vt.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{const Vt=K._multiDrawStarts,Ee=K._multiDrawCounts,qt=K._multiDrawCount,it=Ae?he.get(Ae).bytesPerElement:1,on=V.get(Y).currentProgram.getUniforms();for(let En=0;En<qt;En++)on.setValue(k,"_gl_DrawID",En),vt.render(Vt[En]/it,Ee[En])}else if(K.isInstancedMesh)vt.renderInstances(Te,Dt,K.count);else if(J.isInstancedBufferGeometry){const Vt=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,Ee=Math.min(J.instanceCount,Vt);vt.renderInstances(Te,Dt,Ee)}else vt.render(Te,Dt)};function Vo(y,z,J,Y){O!==null&&y.isNodeMaterial&&O.setObject(Y,y),Ue===!0&&Ie.setState(y,J,!1),y.transparent===!0&&y.side===Wn&&y.forceSinglePass===!1?(y.side=en,y.needsUpdate=!0,Gr(y,z,Y),y.side=Ri,y.needsUpdate=!0,Gr(y,z,Y),y.side=Wn):Gr(y,z,Y)}this.compile=function(y,z,J=null){J===null&&(J=y),O!==null&&O.renderStart(y,z,J),w=fe.get(J),w.init(z),S.push(w),J.traverseVisible(function(K){K.isLight&&K.layers.test(z.layers)&&(w.pushLight(K),K.castShadow&&w.pushShadow(K))}),y!==J&&y.traverseVisible(function(K){K.isLight&&K.layers.test(z.layers)&&(w.pushLight(K),K.castShadow&&w.pushShadow(K))}),w.setupLights(),O!==null&&O.updateLights(w.state.lightsArray),Xe=this.localClippingEnabled,Ue=Ie.init(this.clippingPlanes,Xe),Ue===!0&&Ie.setGlobalState(this.clippingPlanes,z),O!==null&&Be.render(w.state.shadowsArray,J,z);const Y=new Set;return y.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;const Me=K.material;if(Me)if(Array.isArray(Me))for(let we=0;we<Me.length;we++){const xe=Me[we];Vo(xe,J,z,K),Y.add(xe)}else Vo(Me,J,z,K),Y.add(Me)}),w=S.pop(),O!==null&&O.renderEnd(),Y},this.compileAsync=function(y,z,J=null){const Y=this.compile(y,z,J);return new Promise(K=>{function Me(){if(Y.forEach(function(we){const Ae=V.get(we).currentProgram;(Ae===void 0||Ae.isReady())&&Y.delete(we)}),Y.size===0){K(y);return}setTimeout(Me,10)}ze.get("KHR_parallel_shader_compile")!==null?Me():setTimeout(Me,10)})};let Wa=null;function xu(y){Wa&&Wa(y)}function Wo(){fi.stop()}function Xo(){fi.start()}const fi=new ru;fi.setAnimationLoop(xu),typeof self<"u"&&fi.setContext(self),this.setAnimationLoop=function(y){Wa=y,Pe.setAnimationLoop(y),y===null?fi.stop():fi.start()},Pe.addEventListener("sessionstart",Wo),Pe.addEventListener("sessionend",Xo),this.render=function(y,z){if(z!==void 0&&z.isCamera!==!0){rt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;O!==null&&O.renderStart(y,z);const J=Pe.enabled===!0&&Pe.isPresenting===!0,Y=T!==null&&(ae===null||J)&&T.begin(I,ae);if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),Pe.enabled===!0&&Pe.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(Pe.cameraAutoUpdate===!0&&Pe.updateCamera(z),z=Pe.getCamera()),y.isScene===!0&&y.onBeforeRender(I,y,z,ae),w=fe.get(y,S.length),w.init(z),w.state.textureUnits=Z.getTextureUnits(),S.push(w),We.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),Ce.setFromProjectionMatrix(We,Cn,z.reversedDepth),Xe=this.localClippingEnabled,Ue=Ie.init(this.clippingPlanes,Xe),R=ge.get(y,P.length),R.init(),P.push(R),Pe.enabled===!0&&Pe.isPresenting===!0){const we=I.xr.getDepthSensingMesh();we!==null&&Xa(we,z,-1/0,I.sortObjects)}Xa(y,z,0,I.sortObjects),R.finish(),O!==null&&O.updateLights(w.state.lightsArray),I.sortObjects===!0&&R.sort(H,ue),pt=Pe.enabled===!1||Pe.isPresenting===!1||Pe.hasDepthSensing()===!1,pt&&Ye.addToRenderList(R,y),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ue===!0&&Ie.beginShadows();const K=w.state.shadowsArray;if(Be.render(K,y,z),Ue===!0&&Ie.endShadows(),(Y&&T.hasRenderPass())===!1){const we=R.opaque,xe=R.transmissive;if(w.setupLights(),z.isArrayCamera){const Ae=z.cameras;if(xe.length>0)for(let De=0,$e=Ae.length;De<$e;De++){const je=Ae[De];Ko(we,xe,y,je)}pt&&Ye.render(y);for(let De=0,$e=Ae.length;De<$e;De++){const je=Ae[De];Yo(R,y,je,je.viewport)}}else xe.length>0&&Ko(we,xe,y,z),pt&&Ye.render(y),Yo(R,y,z)}ae!==null&&$===0&&(Z.updateMultisampleRenderTarget(ae),Z.updateRenderTargetMipmap(ae)),Y&&T.end(I),y.isScene===!0&&y.onAfterRender(I,y,z),Se.resetDefaultState(),q=-1,ee=null,S.pop(),S.length>0?(w=S[S.length-1],Z.setTextureUnits(w.state.textureUnits),Ue===!0&&Ie.setGlobalState(I.clippingPlanes,w.state.camera)):w=null,P.pop(),P.length>0?R=P[P.length-1]:R=null,O!==null&&O.renderEnd()};function Xa(y,z,J,Y){if(y.visible===!1)return;if(y.layers.test(z.layers)){if(y.isGroup)J=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(z);else if(y.isLightProbeGrid)w.pushLightProbeGrid(y);else if(y.isLight)w.pushLight(y),y.castShadow&&w.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||y.intersectsFrustum(Ce)){Y&&Tt.setFromMatrixPosition(y.matrixWorld).applyMatrix4(We);const we=te.update(y),xe=y.material;xe.visible&&R.push(y,we,xe,J,Tt.z,null,z)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||y.intersectsFrustum(Ce))){const we=te.update(y),xe=y.material;if(Y&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),Tt.copy(y.boundingSphere.center)):(we.boundingSphere===null&&we.computeBoundingSphere(),Tt.copy(we.boundingSphere.center)),Tt.applyMatrix4(y.matrixWorld).applyMatrix4(We)),Array.isArray(xe)){const Ae=we.groups;for(let De=0,$e=Ae.length;De<$e;De++){const je=Ae[De],Te=xe[je.materialIndex];Te&&Te.visible&&R.push(y,we,Te,J,Tt.z,je,z)}}else xe.visible&&R.push(y,we,xe,J,Tt.z,null,z)}}const Me=y.children;for(let we=0,xe=Me.length;we<xe;we++)Xa(Me[we],z,J,Y)}function Yo(y,z,J,Y){const{opaque:K,transmissive:Me,transparent:we}=y;w.setupLightsView(J),Ue===!0&&Ie.setGlobalState(I.clippingPlanes,J),Y&&v.viewport(N.copy(Y)),K.length>0&&kr(K,z,J),Me.length>0&&kr(Me,z,J),we.length>0&&kr(we,z,J),v.buffers.depth.setTest(!0),v.buffers.depth.setMask(!0),v.buffers.color.setMask(!0),v.setPolygonOffset(!1)}function Ko(y,z,J,Y){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[Y.id]===void 0){const Te=ze.has("EXT_color_buffer_half_float")||ze.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[Y.id]=new fn(1,1,{generateMipmaps:!0,type:Te?Nn:an,minFilter:bi,samples:Math.max(4,L.samples),stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:et.workingColorSpace})}const Me=w.state.transmissionRenderTarget[Y.id],we=Y.viewport||N;Me.setSize(we.z*I.transmissionResolutionScale,we.w*I.transmissionResolutionScale);const xe=I.getRenderTarget(),Ae=I.getActiveCubeFace(),De=I.getActiveMipmapLevel();I.setRenderTarget(Me),I.getClearColor(Re),Oe=I.getClearAlpha(),Oe<1&&I.setClearColor(16777215,.5),I.clear(),pt&&Ye.render(J);const $e=I.toneMapping;I.toneMapping=Ln;const je=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),w.setupLightsView(Y),Ue===!0&&Ie.setGlobalState(I.clippingPlanes,Y),kr(y,J,Y),Z.updateMultisampleRenderTarget(Me),Z.updateRenderTargetMipmap(Me),ze.has("WEBGL_multisampled_render_to_texture")===!1){let Te=!1;for(let lt=0,Dt=z.length;lt<Dt;lt++){const Et=z[lt],{object:vt,geometry:Vt,material:Ee,group:qt}=Et;if(Ee.side===Wn&&vt.layers.test(Y.layers)){const it=Ee.side;Ee.side=en,Ee.needsUpdate=!0,qo(vt,J,Y,Vt,Ee,qt),Ee.side=it,Ee.needsUpdate=!0,Te=!0}}Te===!0&&(Z.updateMultisampleRenderTarget(Me),Z.updateRenderTargetMipmap(Me))}I.setRenderTarget(xe,Ae,De),I.setClearColor(Re,Oe),je!==void 0&&(Y.viewport=je),I.toneMapping=$e}function kr(y,z,J){const Y=z.isScene===!0?z.overrideMaterial:null;for(let K=0,Me=y.length;K<Me;K++){const we=y[K],{object:xe,geometry:Ae,group:De}=we;let $e=we.material;$e.allowOverride===!0&&Y!==null&&($e=Y),xe.layers.test(J.layers)&&qo(xe,z,J,Ae,$e,De)}}function qo(y,z,J,Y,K,Me){O!==null&&K.isNodeMaterial&&O.setObject(y,K),y.onBeforeRender(I,z,J,Y,K,Me),y.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),K.onBeforeRender(I,z,J,Y,y,Me),K.transparent===!0&&K.side===Wn&&K.forceSinglePass===!1?(K.side=en,K.needsUpdate=!0,I.renderBufferDirect(J,z,Y,K,y,Me),K.side=Ri,K.needsUpdate=!0,I.renderBufferDirect(J,z,Y,K,y,Me),K.side=Wn):I.renderBufferDirect(J,z,Y,K,y,Me),y.onAfterRender(I,z,J,Y,K,Me)}function Gr(y,z,J){z.isScene!==!0&&(z=Bt);const Y=V.get(y),K=w.state.lights,Me=w.state.shadowsArray,we=K.state.version,xe=de.getParameters(y,K.state,Me,z,J,w.state.lightProbeGridArray),Ae=de.getProgramCacheKey(xe);let De=Y.programs;Y.environment=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?z.environment:null,Y.fog=z.fog;const $e=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap;Y.envMap=le.get(y.envMap||Y.environment,$e),Y.envMapRotation=Y.environment!==null&&y.envMap===null?z.environmentRotation:y.envMapRotation,De===void 0&&(y.addEventListener("dispose",bn),De=new Map,Y.programs=De);let je=De.get(Ae);if(je!==void 0){if(Y.currentProgram===je&&Y.lightsStateVersion===we)return $o(y,xe),je}else xe.uniforms=de.getUniforms(y),O!==null&&y.isNodeMaterial&&O.build(y,J,xe),y.onBeforeCompile(xe,I),je=de.acquireProgram(xe,Ae),De.set(Ae,je),Y.uniforms=xe.uniforms;const Te=Y.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Te.clippingPlanes=Ie.uniform),$o(y,xe),Y.needsLights=bu(y),Y.lightsStateVersion=we,Y.needsLights&&(Te.ambientLightColor.value=K.state.ambient,Te.lightProbe.value=K.state.probe,Te.sunLights.value=K.state.sun,Te.sunLightShadows.value=K.state.sunShadow,Te.directionalLights.value=K.state.directional,Te.directionalLightShadows.value=K.state.directionalShadow,Te.spotLights.value=K.state.spot,Te.spotLightShadows.value=K.state.spotShadow,Te.rectAreaLights.value=K.state.rectArea,Te.ltc_1.value=K.state.rectAreaLTC1,Te.ltc_2.value=K.state.rectAreaLTC2,Te.pointLights.value=K.state.point,Te.pointLightShadows.value=K.state.pointShadow,Te.hemisphereLights.value=K.state.hemi,Te.sunShadowMatrix.value=K.state.sunShadowMatrix,Te.sunShadowCascade.value=K.state.sunShadowCascade,Te.directionalShadowMatrix.value=K.state.directionalShadowMatrix,Te.spotLightMatrix.value=K.state.spotLightMatrix,Te.spotLightMap.value=K.state.spotLightMap,Te.pointShadowMatrix.value=K.state.pointShadowMatrix),Y.lightProbeGrid=w.state.lightProbeGridArray.length>0,Y.currentProgram=je,Y.uniformsList=null,je}function Zo(y){if(y.uniformsList===null){const z=y.currentProgram.getUniforms();y.uniformsList=wa.seqWithValue(z.seq,y.uniforms)}return y.uniformsList}function $o(y,z){const J=V.get(y);J.outputColorSpace=z.outputColorSpace,J.batching=z.batching,J.batchingColor=z.batchingColor,J.instancing=z.instancing,J.instancingColor=z.instancingColor,J.instancingMorph=z.instancingMorph,J.skinning=z.skinning,J.morphTargets=z.morphTargets,J.morphNormals=z.morphNormals,J.morphColors=z.morphColors,J.morphTargetsCount=z.morphTargetsCount,J.numClippingPlanes=z.numClippingPlanes,J.numIntersection=z.numClipIntersection,J.vertexAlphas=z.vertexAlphas,J.vertexTangents=z.vertexTangents,J.toneMapping=z.toneMapping}function vu(y,z){if(y.length===0)return null;if(y.length===1)return y[0].texture!==null?y[0]:null;b.setFromMatrixPosition(z.matrixWorld);for(let J=0,Y=y.length;J<Y;J++){const K=y[J];if(K.texture!==null&&K.boundingBox.containsPoint(b))return K}return null}function Mu(y,z,J,Y,K){z.isScene!==!0&&(z=Bt),Z.resetTextureUnits();const Me=z.fog,we=Y.isMeshStandardMaterial||Y.isMeshLambertMaterial||Y.isMeshPhongMaterial?z.environment:null,xe=ae===null?I.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:et.workingColorSpace,Ae=Y.isMeshStandardMaterial||Y.isMeshLambertMaterial&&!Y.envMap||Y.isMeshPhongMaterial&&!Y.envMap,De=le.get(Y.envMap||we,Ae),$e=Y.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,je=!!J.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),Te=!!J.morphAttributes.position,lt=!!J.morphAttributes.normal,Dt=!!J.morphAttributes.color;let Et=Ln;Y.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(Et=I.toneMapping);const vt=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,Vt=vt!==void 0?vt.length:0,Ee=V.get(Y),qt=w.state.lights;if(Ue===!0&&(Xe===!0||y!==ee)){const St=y===ee&&Y.id===q;Ie.setState(Y,y,St)}let it=!1;Y.version===Ee.__version?(Ee.needsLights&&Ee.lightsStateVersion!==qt.state.version||Ee.outputColorSpace!==xe||K.isBatchedMesh&&Ee.batching===!1||!K.isBatchedMesh&&Ee.batching===!0||K.isBatchedMesh&&Ee.batchingColor===!0&&K._colorsTexture===null||K.isBatchedMesh&&Ee.batchingColor===!1&&K._colorsTexture!==null||K.isInstancedMesh&&Ee.instancing===!1||!K.isInstancedMesh&&Ee.instancing===!0||K.isSkinnedMesh&&Ee.skinning===!1||!K.isSkinnedMesh&&Ee.skinning===!0||K.isInstancedMesh&&Ee.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&Ee.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&Ee.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&Ee.instancingMorph===!1&&K.morphTexture!==null||Ee.envMap!==De||Y.fog===!0&&Ee.fog!==Me||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==Ie.numPlanes||Ee.numIntersection!==Ie.numIntersection)||Ee.vertexAlphas!==$e||Ee.vertexTangents!==je||Ee.morphTargets!==Te||Ee.morphNormals!==lt||Ee.morphColors!==Dt||Ee.toneMapping!==Et||Ee.morphTargetsCount!==Vt||!!Ee.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(it=!0):(it=!0,Ee.__version=Y.version);let on=Ee.currentProgram;it===!0&&(on=Gr(Y,z,K),O&&Y.isNodeMaterial&&O.onUpdateProgram(Y,on,Ee));let En=!1,ei=!1,Ii=!1;const mt=on.getUniforms(),Lt=Ee.uniforms;if(v.useProgram(on.program)&&(En=!0,ei=!0,Ii=!0),Y.id!==q&&(q=Y.id,ei=!0),Ee.needsLights){const St=vu(w.state.lightProbeGridArray,K);Ee.lightProbeGrid!==St&&(Ee.lightProbeGrid=St,ei=!0)}if(En||ee!==y){v.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),mt.setValue(k,"projectionMatrix",y.projectionMatrix),mt.setValue(k,"viewMatrix",y.matrixWorldInverse);const ni=mt.map.cameraPosition;ni!==void 0&&ni.setValue(k,_t.setFromMatrixPosition(y.matrixWorld)),L.logarithmicDepthBuffer&&mt.setValue(k,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&mt.setValue(k,"isOrthographic",y.isOrthographicCamera===!0),ee!==y&&(ee=y,ei=!0,Ii=!0)}if(Ee.needsLights&&(qt.state.sunShadowMap.length>0&&mt.setValue(k,"sunShadowMap",qt.state.sunShadowMap,Z),qt.state.directionalShadowMap.length>0&&mt.setValue(k,"directionalShadowMap",qt.state.directionalShadowMap,Z),qt.state.spotShadowMap.length>0&&mt.setValue(k,"spotShadowMap",qt.state.spotShadowMap,Z),qt.state.pointShadowMap.length>0&&mt.setValue(k,"pointShadowMap",qt.state.pointShadowMap,Z)),K.isSkinnedMesh){mt.setOptional(k,K,"bindMatrix"),mt.setOptional(k,K,"bindMatrixInverse");const St=K.skeleton;St&&(St.boneTexture===null&&St.computeBoneTexture(),mt.setValue(k,"boneTexture",St.boneTexture,Z))}K.isBatchedMesh&&(mt.setOptional(k,K,"batchingTexture"),mt.setValue(k,"batchingTexture",K._matricesTexture,Z),mt.setOptional(k,K,"batchingIdTexture"),mt.setValue(k,"batchingIdTexture",K._indirectTexture,Z),mt.setOptional(k,K,"batchingColorTexture"),K._colorsTexture!==null&&mt.setValue(k,"batchingColorTexture",K._colorsTexture,Z));const ti=J.morphAttributes;if((ti.position!==void 0||ti.normal!==void 0||ti.color!==void 0)&&G.update(K,J,on),(ei||Ee.receiveShadow!==K.receiveShadow)&&(Ee.receiveShadow=K.receiveShadow,mt.setValue(k,"receiveShadow",K.receiveShadow)),(Y.isMeshStandardMaterial||Y.isMeshLambertMaterial||Y.isMeshPhongMaterial)&&Y.envMap===null&&z.environment!==null&&(Lt.envMapIntensity.value=z.environmentIntensity),Lt.dfgLUT!==void 0&&(Lt.dfgLUT.value=M_()),ei){if(mt.setValue(k,"toneMappingExposure",I.toneMappingExposure),Ee.needsLights&&Su(Lt,Ii),Me&&Y.fog===!0&&Le.refreshFogUniforms(Lt,Me),Le.refreshMaterialUniforms(Lt,Y,ie,j,w.state.transmissionRenderTarget[y.id]),Ee.needsLights&&Ee.lightProbeGrid){const St=Ee.lightProbeGrid;Lt.probesSH.value=St.texture,Lt.probesMin.value.copy(St.boundingBox.min),Lt.probesMax.value.copy(St.boundingBox.max),Lt.probesResolution.value.copy(St.resolution)}wa.upload(k,Zo(Ee),Lt,Z)}if(Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(wa.upload(k,Zo(Ee),Lt,Z),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&mt.setValue(k,"center",K.center),mt.setValue(k,"modelViewMatrix",K.modelViewMatrix),mt.setValue(k,"normalMatrix",K.normalMatrix),mt.setValue(k,"modelMatrix",K.matrixWorld),Y.uniformsGroups!==void 0){const St=Y.uniformsGroups;for(let ni=0,Ni=St.length;ni<Ni;ni++){const Qo=St[ni];oe.update(Qo,on),oe.bind(Qo,on)}}return on}function Su(y,z){y.ambientLightColor.needsUpdate=z,y.lightProbe.needsUpdate=z,y.sunLights.needsUpdate=z,y.sunLightShadows.needsUpdate=z,y.directionalLights.needsUpdate=z,y.directionalLightShadows.needsUpdate=z,y.pointLights.needsUpdate=z,y.pointLightShadows.needsUpdate=z,y.spotLights.needsUpdate=z,y.spotLightShadows.needsUpdate=z,y.rectAreaLights.needsUpdate=z,y.hemisphereLights.needsUpdate=z}function bu(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return W},this.getActiveMipmapLevel=function(){return $},this.getRenderTarget=function(){return ae},this.setRenderTargetTextures=function(y,z,J){const Y=V.get(y);Y.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,Y.__autoAllocateDepthBuffer===!1&&(Y.__useRenderToTexture=!1),V.get(y.texture).__webglTexture=z,V.get(y.depthTexture).__webglTexture=Y.__autoAllocateDepthBuffer?void 0:J,Y.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,z){const J=V.get(y);J.__webglFramebuffer=z,J.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(y,z=0,J=0){ae=y,W=z,$=J;let Y=null,K=!1,Me=!1;if(y){const xe=V.get(y);if(xe.__useDefaultFramebuffer!==void 0){v.bindFramebuffer(k.FRAMEBUFFER,xe.__webglFramebuffer),N.copy(y.viewport),re.copy(y.scissor),ce=y.scissorTest,v.viewport(N),v.scissor(re),v.setScissorTest(ce),q=-1;return}else if(xe.__webglFramebuffer===void 0)Z.setupRenderTarget(y);else if(xe.__hasExternalTextures)Z.rebindTextures(y,V.get(y.texture).__webglTexture,V.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const $e=y.depthTexture;if(xe.__boundDepthTexture!==$e){if($e!==null&&V.has($e)&&(y.width!==$e.image.width||y.height!==$e.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Z.setupDepthRenderbuffer(y)}}const Ae=y.texture;(Ae.isData3DTexture||Ae.isDataArrayTexture||Ae.isCompressedArrayTexture)&&(Me=!0);const De=V.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(De[z])?Y=De[z][J]:Y=De[z],K=!0):y.samples>0&&Z.useMultisampledRTT(y)===!1?Y=V.get(y).__webglMultisampledFramebuffer:Array.isArray(De)?Y=De[J]:Y=De,N.copy(y.viewport),re.copy(y.scissor),ce=y.scissorTest}else N.copy(se).multiplyScalar(ie).floor(),re.copy(ye).multiplyScalar(ie).floor(),ce=qe;if(J!==0&&(Y=F),v.bindFramebuffer(k.FRAMEBUFFER,Y)&&v.drawBuffers(y,Y),v.viewport(N),v.scissor(re),v.setScissorTest(ce),K){const xe=V.get(y.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+z,xe.__webglTexture,J)}else if(Me){const xe=z;for(let Ae=0;Ae<y.textures.length;Ae++){const De=V.get(y.textures[Ae]);k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0+Ae,De.__webglTexture,J,xe)}}else if(y!==null&&J!==0){const xe=V.get(y.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,xe.__webglTexture,J)}q=-1};function Jo(y){const z=V.get(y);return(z.__readFormat!==y.format||z.__readType!==y.type)&&(z.__readFormat=y.format,z.__readType=y.type,z.__formatReadable=L.textureFormatReadable(y.format),z.__typeReadable=L.textureTypeReadable(y.type)),z}this.readRenderTargetPixels=function(y,z,J,Y,K,Me,we,xe=0){if(!(y&&y.isWebGLRenderTarget)){rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ae=V.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&we!==void 0&&(Ae=Ae[we]),Ae){v.bindFramebuffer(k.FRAMEBUFFER,Ae);try{const De=y.textures[xe],$e=De.format,je=De.type;y.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+xe);const Te=Jo(De);if(Te.__formatReadable===!1){rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Te.__typeReadable===!1){rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=y.width-Y&&J>=0&&J<=y.height-K&&k.readPixels(z,J,Y,K,me.convert($e),me.convert(je),Me)}finally{const De=ae!==null?V.get(ae).__webglFramebuffer:null;v.bindFramebuffer(k.FRAMEBUFFER,De)}}},this.readRenderTargetPixelsAsync=async function(y,z,J,Y,K,Me,we,xe=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ae=V.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&we!==void 0&&(Ae=Ae[we]),Ae)if(z>=0&&z<=y.width-Y&&J>=0&&J<=y.height-K){v.bindFramebuffer(k.FRAMEBUFFER,Ae);const De=y.textures[xe],$e=De.format,je=De.type;y.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+xe);const Te=Jo(De);if(Te.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Te.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const lt=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,lt),k.bufferData(k.PIXEL_PACK_BUFFER,Me.byteLength,k.STREAM_READ),k.readPixels(z,J,Y,K,me.convert($e),me.convert(je),0),k.bindBuffer(k.PIXEL_PACK_BUFFER,null);const Dt=ae!==null?V.get(ae).__webglFramebuffer:null;v.bindFramebuffer(k.FRAMEBUFFER,Dt);const Et=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await Hf(k,Et,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,lt),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,Me),k.bindBuffer(k.PIXEL_PACK_BUFFER,null),k.deleteBuffer(lt),k.deleteSync(Et),Me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,z=null,J=0){const Y=Math.pow(2,-J),K=Math.floor(y.image.width*Y),Me=Math.floor(y.image.height*Y),we=z!==null?z.x:0,xe=z!==null?z.y:0;Z.setTexture2D(y,0),k.copyTexSubImage2D(k.TEXTURE_2D,J,0,0,we,xe,K,Me),v.unbindTexture()},this.copyTextureToTexture=function(y,z,J=null,Y=null,K=0,Me=0){let we,xe,Ae,De,$e,je,Te,lt,Dt;const Et=y.isCompressedTexture?y.mipmaps[Me]:y.image;if(J!==null)we=J.max.x-J.min.x,xe=J.max.y-J.min.y,Ae=J.isBox3?J.max.z-J.min.z:1,De=J.min.x,$e=J.min.y,je=J.isBox3?J.min.z:0;else{const Lt=Math.pow(2,-K);we=Math.floor(Et.width*Lt),xe=Math.floor(Et.height*Lt),y.isDataArrayTexture?Ae=Et.depth:y.isData3DTexture?Ae=Math.floor(Et.depth*Lt):Ae=1,De=0,$e=0,je=0}Y!==null?(Te=Y.x,lt=Y.y,Dt=Y.z):(Te=0,lt=0,Dt=0);const vt=me.convert(z.format),Vt=me.convert(z.type);let Ee;z.isData3DTexture?(Z.setTexture3D(z,0),Ee=k.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(Z.setTexture2DArray(z,0),Ee=k.TEXTURE_2D_ARRAY):(Z.setTexture2D(z,0),Ee=k.TEXTURE_2D),v.activeTexture(k.TEXTURE0),v.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,z.flipY),v.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),v.pixelStorei(k.UNPACK_ALIGNMENT,z.unpackAlignment);const qt=v.getParameter(k.UNPACK_ROW_LENGTH),it=v.getParameter(k.UNPACK_IMAGE_HEIGHT),on=v.getParameter(k.UNPACK_SKIP_PIXELS),En=v.getParameter(k.UNPACK_SKIP_ROWS),ei=v.getParameter(k.UNPACK_SKIP_IMAGES);v.pixelStorei(k.UNPACK_ROW_LENGTH,Et.width),v.pixelStorei(k.UNPACK_IMAGE_HEIGHT,Et.height),v.pixelStorei(k.UNPACK_SKIP_PIXELS,De),v.pixelStorei(k.UNPACK_SKIP_ROWS,$e),v.pixelStorei(k.UNPACK_SKIP_IMAGES,je);const Ii=y.isDataArrayTexture||y.isData3DTexture,mt=z.isDataArrayTexture||z.isData3DTexture;if(y.isDepthTexture){const Lt=V.get(y),ti=V.get(z),St=V.get(Lt.__renderTarget),ni=V.get(ti.__renderTarget);v.bindFramebuffer(k.READ_FRAMEBUFFER,St.__webglFramebuffer),v.bindFramebuffer(k.DRAW_FRAMEBUFFER,ni.__webglFramebuffer);for(let Ni=0;Ni<Ae;Ni++)Ii&&(k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,V.get(y).__webglTexture,K,je+Ni),k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,V.get(z).__webglTexture,Me,Dt+Ni)),k.blitFramebuffer(De,$e,we,xe,Te,lt,we,xe,k.DEPTH_BUFFER_BIT,k.NEAREST);v.bindFramebuffer(k.READ_FRAMEBUFFER,null),v.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else if(K!==0||y.isRenderTargetTexture||V.has(y)){const Lt=V.get(y),ti=V.get(z);v.bindFramebuffer(k.READ_FRAMEBUFFER,D),v.bindFramebuffer(k.DRAW_FRAMEBUFFER,B);for(let St=0;St<Ae;St++)Ii?k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Lt.__webglTexture,K,je+St):k.framebufferTexture2D(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,Lt.__webglTexture,K),mt?k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,ti.__webglTexture,Me,Dt+St):k.framebufferTexture2D(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,ti.__webglTexture,Me),K!==0?k.blitFramebuffer(De,$e,we,xe,Te,lt,we,xe,k.COLOR_BUFFER_BIT,k.NEAREST):mt?k.copyTexSubImage3D(Ee,Me,Te,lt,Dt+St,De,$e,we,xe):k.copyTexSubImage2D(Ee,Me,Te,lt,De,$e,we,xe);v.bindFramebuffer(k.READ_FRAMEBUFFER,null),v.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else mt?y.isDataTexture||y.isData3DTexture?k.texSubImage3D(Ee,Me,Te,lt,Dt,we,xe,Ae,vt,Vt,Et.data):z.isCompressedArrayTexture?k.compressedTexSubImage3D(Ee,Me,Te,lt,Dt,we,xe,Ae,vt,Et.data):k.texSubImage3D(Ee,Me,Te,lt,Dt,we,xe,Ae,vt,Vt,Et):y.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,Me,Te,lt,we,xe,vt,Vt,Et.data):y.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,Me,Te,lt,Et.width,Et.height,vt,Et.data):k.texSubImage2D(k.TEXTURE_2D,Me,Te,lt,we,xe,vt,Vt,Et);v.pixelStorei(k.UNPACK_ROW_LENGTH,qt),v.pixelStorei(k.UNPACK_IMAGE_HEIGHT,it),v.pixelStorei(k.UNPACK_SKIP_PIXELS,on),v.pixelStorei(k.UNPACK_SKIP_ROWS,En),v.pixelStorei(k.UNPACK_SKIP_IMAGES,ei),Me===0&&z.generateMipmaps&&k.generateMipmap(Ee),v.unbindTexture()},this.initRenderTarget=function(y){V.get(y).__webglFramebuffer===void 0&&Z.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?Z.setTextureCube(y,0):y.isData3DTexture?Z.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?Z.setTexture2DArray(y,0):Z.setTexture2D(y,0),v.unbindTexture()},this.resetState=function(){W=0,$=0,ae=null,v.reset(),Se.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Cn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=et._getDrawingBufferColorSpace(e),t.unpackColorSpace=et._getUnpackColorSpace()}}const b_=[{k:"ambientHue",g:"Night light",label:"Twilight hue",min:0,max:1,step:.01,v:.68,hue:!0},{k:"ambient",g:"Night light",label:"Twilight brightness",min:.05,max:.6,step:.01,v:.22},{k:"moon",g:"Night light",label:"Moonlight",min:0,max:1,step:.01,v:.3},{k:"moonHue",g:"Night light",label:"Moon hue",min:0,max:1,step:.01,v:.58,hue:!0},{k:"glowHue",g:"Night light",label:"Witch glow hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"glowSat",g:"Night light",label:"Witch glow colour",min:0,max:1,step:.01,v:.35},{k:"glowRadius",g:"Night light",label:"Witch glow reach",min:30,max:200,step:5,v:110},{k:"glowPower",g:"Night light",label:"Witch glow strength",min:.3,max:2.5,step:.05,v:1.4},{k:"bands",g:"Shading",label:"Light steps",min:2,max:7,step:1,v:3},{k:"dither",g:"Shading",label:"Dithering",min:0,max:1,step:.05,v:.35},{k:"round",g:"Shading",label:"Roundness",min:.2,max:1.5,step:.05,v:.9},{k:"outline",g:"Shading",label:"Plant outline",options:["none","dark","tinted"],v:"none"},{k:"cOutline",g:"Shading",label:"Creature outline",options:["dark","tinted","none"],v:"dark"},{k:"shafts",g:"Night light",label:"Moonbeams",min:0,max:1,step:.05,v:.3},{k:"areaContrast",g:"Colour",label:"Difference between areas",min:0,max:1,step:.05,v:.6},{k:"sat",g:"Colour",label:"Saturation",min:.2,max:1.3,step:.01,v:.9},{k:"leafHue",g:"Colour",label:"Leaf hue",min:0,max:1,step:.01,v:.3,hue:!0},{k:"leafVariety",g:"Colour",label:"Leaf colour variety",min:0,max:1,step:.05,v:.3},{k:"trunkHue",g:"Colour",label:"Bark hue",min:0,max:1,step:.01,v:.07,hue:!0},{k:"groundHue",g:"Colour",label:"Ground hue",min:0,max:1,step:.01,v:.27,hue:!0},{k:"groundVal",g:"Colour",label:"Ground brightness",min:.15,max:.7,step:.01,v:.4},{k:"pixel",g:"Shading",label:"Pixel size",min:1,max:5,step:1,v:3},{k:"treeSize",g:"Trees",label:"Tree height",min:.5,max:1.5,step:.05,v:.85},{k:"crownWidth",g:"Trees",label:"Crown width",min:1,max:4,step:.1,v:3},{k:"clearing",g:"Trees",label:"Clearing size",min:0,max:1,step:.05,v:.55},{k:"depth",g:"Map",label:"Border detail (fractal layers)",min:0,max:6,step:1,v:4},{k:"areaScale",g:"Map",label:"Area size (screens)",min:.6,max:2,step:.05,v:1},{k:"areaTypes",g:"Map",label:"Area types",min:4,max:30,step:1,v:30},{k:"density",g:"Trees",label:"Foliage density",min:.2,max:1,step:.05,v:.55},{k:"clump",g:"Trees",label:"Clumpiness",min:0,max:1,step:.05,v:.6},{k:"gnarl",g:"Trees",label:"Gnarliness",min:0,max:1,step:.05,v:.5},{k:"roots",g:"Trees",label:"Roots",min:0,max:1,step:.05,v:.6},{k:"bark",g:"Trees",label:"Bark texture",min:0,max:1,step:.05,v:.6},{k:"trees",g:"Trees",label:"Tree density",min:.2,max:2,step:.05,v:1},{k:"wBroad",g:"Tree mix",label:"Gnarled broadleaf",min:0,max:1,step:.05,v:.8},{k:"wFir",g:"Tree mix",label:"Fir",min:0,max:1,step:.05,v:.6},{k:"wWillow",g:"Tree mix",label:"Willow",min:0,max:1,step:.05,v:.5},{k:"wBirch",g:"Tree mix",label:"Birch",min:0,max:1,step:.05,v:.5},{k:"wPalm",g:"Tree mix",label:"Tree fern",min:0,max:1,step:.05,v:.3},{k:"wFlat",g:"Tree mix",label:"Flat-crowned",min:0,max:1,step:.05,v:.5},{k:"bushes",g:"Undergrowth",label:"Bushes and shrubs",min:0,max:120,step:1,v:55},{k:"bushSize",g:"Undergrowth",label:"Bush size",min:.5,max:1.8,step:.05,v:1},{k:"flowers",g:"Undergrowth",label:"Flowers",min:0,max:1,step:.05,v:.3},{k:"cSat",g:"Creatures",label:"Creature saturation",min:.1,max:1,step:.01,v:.6},{k:"cVal",g:"Creatures",label:"Creature brightness",min:.4,max:1,step:.01,v:.85},{k:"head",g:"Creatures",label:"Baby head size",min:.3,max:.6,step:.01,v:.44},{k:"eye",g:"Creatures",label:"Eye size",min:.5,max:2,step:.05,v:1},{k:"legs",g:"Creatures",label:"Leg length",min:.5,max:1.8,step:.05,v:1},{k:"long",g:"Creatures",label:"Body length",min:.7,max:1.5,step:.05,v:1},{k:"size",g:"Creatures",label:"Baby size (px)",min:5,max:14,step:1,v:8},{k:"growth",g:"Creatures",label:"Legend vs baby height",min:5,max:25,step:1,v:20},{k:"magicHue",g:"Creatures",label:"Magic glow hue",min:0,max:1,step:.01,v:.5,hue:!0},{k:"fur",g:"Creatures",label:"Stripes and spots",min:0,max:1,step:.05,v:.5},{k:"cloakHue",g:"Witch",label:"Jacket hue",min:0,max:1,step:.01,v:.72,hue:!0},{k:"hairHue",g:"Witch",label:"Hair hue",min:0,max:1,step:.01,v:.01,hue:!0},{k:"hatHue",g:"Witch",label:"Hat hue",min:0,max:1,step:.01,v:.74,hue:!0},{k:"topHue",g:"Witch",label:"Top hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"jeansHue",g:"Witch",label:"Jeans hue",min:0,max:1,step:.01,v:.6,hue:!0},{k:"shoeHue",g:"Witch",label:"Sneakers hue",min:0,max:1,step:.01,v:0,hue:!0},{k:"phonesHue",g:"Witch",label:"Headphones hue",min:0,max:1,step:.01,v:.92,hue:!0}];function E_(){const i={};return b_.forEach(e=>i[e.k]=e.v),i}const y_={broad:vc,fir:Ao,willow:Mc,birch:Sc,flat:bc};function w_(i,e,t,n,r){const a=y_[e.type],s={...t,leafHue:i.leaf+(e.dark?.05:0),gnarl:e.gnarl??t.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},o=a(n,s,t.treeSize*r*(e.scale||1)*be(n,.9,1.1)),c=To(n,s,a);return e.dark&&(c[f.LEAF]=c[f.LEAF3],c[f.LEAF3]=ve(i.leaf+.05,.7,.22)),c[f.NOSE]=[20,16,24],c[f.GLINT]=[235,235,240],{parts:Ah(o),colours:c}}function A_(i,e,t,n,r){const a=Dn[t].id,s=Or.find(p=>p.id===a),o=Ih(a,i,{K:n,makeCanvas:r}),c=[],l=p=>c.push(p)-1,u={big:[],small:[],walls:[],set:null},d=(p,_)=>rr(p,_,i,"none",r),h=(p,_)=>{const{parts:x,colours:g}=w_(s,p,i,Cr(e*13+t*101+_*7+1),n);return{bot:l(d(x.bot,g)),top:l(d(x.top,g))}};s.big.forEach(([p,_],x)=>{if(p!=="tree"){u.big.push({bot:l(o.big[x].sp),top:null});return}const g=Math.max(1,Math.round(Ec/s.big.length));for(let m=0;m<g;m++)u.big.push(h(_,x*17+m))}),s.small.forEach(([p,_],x)=>u.small.push(p==="tree"?h(_,500+x):{bot:l(o.small[x].sp),top:null}));for(const p of o.walls)u.walls.push(l(p.sp));return o.setPiece&&(u.set=s.set?.[0]==="tree"?h(s.set[1],900):{bot:l(o.setPiece.sp),top:null}),{sprites:c,layout:u,floor:o.floor.sp}}function T_(i,e,t){const n=[];for(let r=0;r<3;r++)for(let a=0;a<2;a++)n.push(rr(Sh(e,r,a,i),xh(e,i),i,i.cOutline,t));return n}const R_=(i,e)=>i*2+e;function Da(i,e,t){return i.getContext("2d").getImageData(0,0,e,t).data}function xo(i,e=2048){const n=[];let r=0,a=0,s=0,o=1;for(const h of i)r+h.w+1>e&&(r=0,a+=s+1,s=0),n.push({x:r,y:a}),r+=h.w+1,s=Math.max(s,h.h),o=Math.max(o,r);const c=Math.max(1,a+s),l=new Uint8Array(o*c*4),u=new Uint8Array(o*c*4),d=i.map((h,p)=>{const _=n[p],x=Da(h.A,h.w,h.h),g=Da(h.N,h.w,h.h);for(let m=0;m<h.h;m++){const M=m*h.w*4,E=((_.y+m)*o+_.x)*4;l.set(x.subarray(M,M+h.w*4),E),u.set(g.subarray(M,M+h.w*4),E)}return{uv:[_.x/o,_.y/c,(_.x+h.w)/o,(_.y+h.h)/c],w:h.w,h:h.h}});return{albedo:l,normal:u,width:o,height:c,frames:d}}function C_(i,e){if(i.kind==="creature")return{px:xo(T_(i.style,i.id,e),1024)};const{sprites:t,layout:n,floor:r}=A_(i.style,i.seed,i.id,i.K,e);return{px:xo(t),layout:n,floor:{albedo:new Uint8Array(Da(r.A,r.w,r.h)),normal:new Uint8Array(Da(r.N,r.w,r.h)),w:r.w,h:r.h}}}function nc(i,e,t){const n=new ji(i,e,t,dn,an);return n.magFilter=Ut,n.minFilter=Ut,n.generateMipmaps=!1,n.flipY=!1,n.colorSpace=vn,n.needsUpdate=!0,n}function du(i){return{albedo:nc(i.albedo,i.width,i.height),normal:nc(i.normal,i.width,i.height),frames:i.frames}}const ic=(i,e=2048)=>du(xo(i,e));class L_{constructor(e,t,n){if(this.style=e,this.seed=t,this.K=2/n,this.witch=ic([rr(Xu(),Ou(e),e,"dark")]),this.stones=ic([0,1,2,3].map(r=>this.stone(r))),this.useWorkers=typeof Worker<"u"&&typeof OffscreenCanvas<"u",this.useWorkers){const r=Math.max(1,Math.min(3,(navigator.hardwareConcurrency||2)-1));try{for(let a=0;a<r;a++){const s=new Worker(new URL(""+new URL("artWorker-ComAQMPr.js",import.meta.url).href,import.meta.url),{type:"module"}),o={w:s,busy:!1};s.onmessage=c=>{o.busy=!1,o.job=void 0,this.receive(c.data),this.dispatch()},s.onerror=()=>{this.useWorkers=!1,o.job&&this.queue.unshift(o.job),o.busy=!1,o.job=void 0},this.workers.push(o)}}catch{this.useWorkers=!1}}}style;seed;types=new Map;creatures=new Map;queue=[];inFlight=new Set;workers=[];useWorkers;witch;stones;K;version=0;onFloor=()=>{};stone(e){const t=Cr(this.seed*3+e),n=5+Math.floor(t()*3),r=7+Math.floor(t()*5),a=new tn(n+2,r+1);return a.ellipse((n+2)/2,r/2+1,n/2,r/2+.5,f.BODY,{round:this.style.round}),a.ellipse((n+2)/2-1,r/2,n/3,r/3,f.BODY2,{round:this.style.round,onlyOn:new Set([f.BODY]),density:.5,seed:e}),rr(a,{[f.BODY]:[178,174,162],[f.BODY2]:[140,138,130]},this.style,"dark")}key=e=>e.kind+":"+e.id;ask(e){const t=this.key(e);this.inFlight.has(t)||(this.inFlight.add(t),this.queue.push(e),this.dispatch())}dispatch(){if(this.useWorkers)for(const e of this.workers)e.busy||!this.queue.length||(e.busy=!0,e.job=this.queue.shift(),e.w.postMessage(e.job))}receive(e){if(!e.result){console.warn("art worker failed, drawing on the page:",e.error),this.useWorkers=!1,this.queue.unshift(e.job);return}const t=du(e.result.px);e.job.kind==="type"?(this.types.set(e.job.id,{atlas:t,layout:e.result.layout}),e.result.floor&&this.onFloor(e.job.id,e.result.floor)):this.creatures.set(e.job.id,{atlas:t,frame:R_}),this.inFlight.delete(this.key(e.job)),this.version++}typeArt(e){const t=this.types.get(e);return t||this.ask({kind:"type",id:e,style:this.style,seed:this.seed,K:this.K}),t}creatureArt(e){const t=this.creatures.get(e);return t||this.ask({kind:"creature",id:e,style:this.style}),t}prefetchType(e){this.types.has(e)||this.typeArt(e)}get pending(){return this.inFlight.size}work(e){if(this.useWorkers)return;const t=performance.now();let n=0;for(;this.queue.length&&(n===0||performance.now()-t<e);){const r=this.queue.shift();this.receive({job:r,result:C_(r,(a,s)=>{const o=document.createElement("canvas");return o.width=a,o.height=s,o})}),n++}}whenIdle(){return new Promise(e=>{const t=()=>{this.work(50),this.pending?setTimeout(t,30):e()};t()})}}const Nt={uAmb:{value:new X},uMoon:{value:new X},uMoonDir:{value:new X(-.45,.75,.5).normalize()},uMoonBeam:{value:new X},uBands:{value:4},uDither:{value:.35},uShafts:{value:.3},uShaftScale:{value:1},uGlowPos:{value:new X},uGlowRgb:{value:new X},uGlowR:{value:8},uGlowPower:{value:1.4},uHazeCentre:{value:new Ve},uHazeRange:{value:new Ve(70,200)},uHazeColour:{value:new X},uTime:{value:0}};function P_(i,e,t){const n=(r,a)=>new X(r[0]/255*a,r[1]/255*a,r[2]/255*a);Nt.uAmb.value.copy(n(ve(i.ambientHue,.55,1),i.ambient)),Nt.uMoon.value.copy(n(ve(i.moonHue,.35,1),i.moon)),Nt.uMoonBeam.value.copy(n(ve(i.moonHue,.35,1),i.shafts*.25)),Nt.uBands.value=i.bands,Nt.uDither.value=i.dither*.5,Nt.uShafts.value=i.shafts,Nt.uShaftScale.value=t*2,Nt.uGlowRgb.value.copy(n(ve(i.glowHue,i.glowSat,1),1)),Nt.uGlowR.value=e,Nt.uGlowPower.value=i.glowPower,Nt.uHazeColour.value.copy(n(ve(i.ambientHue,.45,1),.16))}const Ga=`
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
`,vi=2,kt=32,Si=8,D_=`
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
uniform vec4 uCanopy; // canopy shadow: strength (0 off), height, cover, wind speed
uniform vec2 uClearing; // clearingSize, clearingFalloff: where trees, and so canopy, begin
varying vec3 vWorld;
${Ga}
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
    vec2 cell = vec2(mod(float(t), ${Si}.0), floor(float(t) / ${Si}.0));
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
`;class N_{constructor(e,t,n){this.map=e;const r=e.extent,a=r.maxX-r.minX,s=r.maxZ-r.minZ,o=Math.ceil(a*vi/kt)*kt,c=Math.ceil(s*vi/kt)*kt;this.tilesX=o/kt,this.tilesZ=c/kt,this.filled=new Uint8Array(this.tilesX*this.tilesZ);const l=p=>(p.magFilter=p.minFilter=Ut,p.generateMipmaps=!1,p.colorSpace=vn,p.needsUpdate=!0,p);this.texture=l(new ji(new Uint8Array(o*c*4),o,c)),l(this.tile),this.floors=l(new ji(new Uint8Array(64*Si*48*4*4),64*Si,192));const u=Array.from({length:32},(p,_)=>new X(...Dn[_]?.floor??[.25,.45,.4])),d=new Kt({vertexShader:D_,fragmentShader:I_,uniforms:{...Nt,uAreas:{value:this.texture},uExtent:{value:new At(r.minX,r.minZ,o/vi,c/vi)},uPixel:{value:n},uTypeFloor:{value:u},uFloorReady:{value:this.floorReady},uFloors:{value:this.floors},uTile:{value:new Ve(64,48)},uFloorsSize:{value:new Ve(64*Si,192)},uSat:{value:t.sat},uFloor:{value:new X(e.dancefloor.x,e.dancefloor.z,e.dancefloor.radius)},uCanopy:{value:new At},uClearing:{value:new Ve(e.tuning.clearingSize,e.tuning.clearingFalloff)}}}),h=new Fn(a+400,s+400);h.rotateX(-Math.PI/2),this.mesh=new Jt(h,d),this.mesh.position.set((r.minX+r.maxX)/2,0,(r.minZ+r.maxZ)/2)}map;mesh;texture;tile=new ji(new Uint8Array(kt*kt*4),kt,kt);filled;tilesX;tilesZ;initialised=!1;floorReady=new Array(32).fill(0);floors;pendingFloors=[];setCanopyShadow(e,t,n,r){this.mesh.material.uniforms.uCanopy.value.set(e,t,n,r)}setFloor(e,t){this.pendingFloors.push([e,t])}placeFloors(e){for(const[t,n]of this.pendingFloors){const r=this.mesh.material,a=r.uniforms.uTile.value;if(n.w!==a.x||n.h!==a.y)continue;const s=new ji(n.albedo,n.w,n.h);s.needsUpdate=!0,e.copyTextureToTexture(s,this.floors,null,new Ve(t%Si*n.w,Math.floor(t/Si)*n.h)),s.dispose(),this.floorReady[t]=1}this.pendingFloors=[]}fill(e,t,n,r,a){this.initialised||(e.initTexture(this.texture),e.initTexture(this.floors),this.initialised=!0),this.pendingFloors.length&&this.placeFloors(e);const s=this.map.extent,o=kt/vi,c=(t-s.minX)/o,l=(n-s.minZ)/o,u=Math.ceil(r/o),d=[];for(let _=Math.max(0,Math.floor(l)-u);_<=Math.min(this.tilesZ-1,Math.floor(l)+u);_++)for(let x=Math.max(0,Math.floor(c)-u);x<=Math.min(this.tilesX-1,Math.floor(c)+u);x++)this.filled[_*this.tilesX+x]||d.push([x,_,(x+.5-c)**2+(_+.5-l)**2]);d.sort((_,x)=>_[2]-x[2]);const h=performance.now();let p=0;for(const[_,x]of d){if(p>0&&performance.now()-h>a)break;this.fillTile(e,_,x),p++}return d.length-p}fillTile(e,t,n){const r=this.map.extent,a=this.tile.image.data;for(let s=0;s<kt;s++)for(let o=0;o<kt;o++){const c=r.minX+(t*kt+o+.5)/vi,l=r.minZ+(n*kt+s+.5)/vi,u=this.map.areaAt(c,l),d=(s*kt+o)*4;a[d]=u.type,a[d+1]=Math.round(u.openness*255),a[d+2]=0,a[d+3]=255}this.tile.needsUpdate=!0,e.copyTextureToTexture(this.tile,this.texture,null,new Ve(t*kt,n*kt)),this.filled[n*this.tilesX+t]=1}dispose(){this.texture.dispose(),this.tile.dispose(),this.mesh.geometry.dispose(),this.mesh.material.dispose()}}const U_="varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",F_=`
uniform sampler2D uScene; uniform float uThreshold; varying vec2 vUv;
void main() {
  vec3 c = texture2D(uScene, vUv).rgb;
  float l = max(c.r, max(c.g, c.b));
  gl_FragColor = vec4(c * smoothstep(uThreshold, uThreshold + 0.25, l), 1.0);
}`,O_=`
uniform sampler2D uSrc; uniform vec2 uStep; varying vec2 vUv;
void main() {
  vec3 c = texture2D(uSrc, vUv).rgb * 0.227;
  c += (texture2D(uSrc, vUv + uStep * 1.38).rgb + texture2D(uSrc, vUv - uStep * 1.38).rgb) * 0.316;
  c += (texture2D(uSrc, vUv + uStep * 3.23).rgb + texture2D(uSrc, vUv - uStep * 3.23).rgb) * 0.070;
  gl_FragColor = vec4(c, 1.0);
}`,B_=`
uniform sampler2D uScene, uBloom; uniform vec2 uLow; uniform float uBloomStrength; varying vec2 vUv;
void main() {
  vec2 p = (floor(vUv * uLow) + 0.5) / uLow;
  vec3 c = texture2D(uScene, p).rgb + texture2D(uBloom, vUv).rgb * uBloomStrength;
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
}`;function Er(i,e,t,n=!1){const r=new fn(Math.max(1,i),Math.max(1,e),{minFilter:t,magFilter:t,depthBuffer:n,generateMipmaps:!1});return r.texture.colorSpace=vn,r}class k_{constructor(e,t){this.renderer=e,this.tuning=t,this.scene=Er(1,1,Pt,!0);const n=(r,a)=>new Kt({vertexShader:U_,fragmentShader:r,uniforms:a,depthTest:!1,depthWrite:!1});this.mats={bright:n(F_,{uScene:{value:null},uThreshold:{value:.6}}),blur:n(O_,{uSrc:{value:null},uStep:{value:new Ve}}),composite:n(B_,{uScene:{value:null},uBloom:{value:null},uLow:{value:new Ve},uBloomStrength:{value:0}}),tilt:n(z_,{uSrc:{value:null},uTexel:{value:new Ve},uDir:{value:new Ve},uStrength:{value:0},uBand:{value:.4},uCentre:{value:.5}})},this.quad=new Jt(new Fn(2,2),this.mats.composite),this.quad.frustumCulled=!1}renderer;tuning;scene;bright=Er(1,1,Pt);bloomB=Er(1,1,Pt);a=Er(1,1,Pt);b=Er(1,1,Pt);quad;cam=new Go(-1,1,1,-1,0,1);mats;low=new Ve(1,1);out=new Ve(1,1);get fullResolution(){return this.tuning.tiltShift.on&&this.tuning.tiltShift.where==="after"}resize(e,t,n,r){this.low.set(e,t),this.out.set(n,r),this.scene.setSize(e,t);const a=Math.max(1,Math.round(e/2)),s=Math.max(1,Math.round(t/2));this.bright.setSize(a,s),this.bloomB.setSize(a,s);const o=this.fullResolution?n:e,c=this.fullResolution?r:t;this.a.setSize(o,c),this.b.setSize(o,c)}pass(e,t,n){const r=this.mats[e];n(r.uniforms),this.quad.material=r,this.renderer.setRenderTarget(t),this.renderer.render(this.quad,this.cam)}render(e,t){const n=this.renderer,r=this.tuning;n.setRenderTarget(this.scene),n.render(e,t);const a=r.bloom.on&&r.bloom.strength>0;if(a){const d=this.bright.width,h=this.bright.height;this.pass("bright",this.bright,p=>{p.uScene.value=this.scene.texture,p.uThreshold.value=r.bloom.threshold});for(let p=0;p<2;p++)this.pass("blur",this.bloomB,_=>{_.uSrc.value=this.bright.texture,_.uStep.value.set(1/d,0)}),this.pass("blur",this.bright,_=>{_.uSrc.value=this.bloomB.texture,_.uStep.value.set(0,1/h)})}const s=r.tiltShift.on&&r.tiltShift.strength>0;if(this.pass("composite",s?this.a:null,d=>{d.uScene.value=this.scene.texture,d.uBloom.value=this.bright.texture,d.uLow.value.copy(this.low),d.uBloomStrength.value=a?r.bloom.strength:0}),!s)return;const o=this.a.width,c=this.a.height,l=this.fullResolution?this.out.y/this.low.y:1,u=d=>{d.uTexel.value.set(1/o,1/c),d.uStrength.value=r.tiltShift.strength*l,d.uBand.value=r.tiltShift.band,d.uCentre.value=1-r.tiltShift.centre};this.pass("tilt",this.b,d=>{u(d),d.uSrc.value=this.a.texture,d.uDir.value.set(1,0)}),this.pass("tilt",null,d=>{u(d),d.uSrc.value=this.b.texture,d.uDir.value.set(0,1)})}}const G_=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,H_=`
uniform float uStrength, uWind, uPixel;
varying vec3 vWorld;
${Ga}
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
}`;class V_{constructor(e,t,n,r){this.height=t,this.mat=new Kt({vertexShader:G_,fragmentShader:H_,uniforms:{...Nt,uStrength:{value:e},uWind:{value:n},uPixel:{value:r}},depthWrite:!1}),this.mesh=new Jt(new Fn(700,700).rotateX(-Math.PI/2),this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=2}height;mesh;mat;follow(e,t){this.mesh.position.set(e,this.height,t-150)}}const W_=`
attribute vec4 iShadow; // x, z, width, depth (metres)
varying vec2 vLocal;
varying vec3 vWorld;
void main() {
  vLocal = position.xz * 2.0;
  vec3 w = vec3(iShadow.x + position.x * iShadow.z, 0.03, iShadow.y + position.z * iShadow.w);
  vWorld = w;
  gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
}`,X_=`
uniform float uStrength;
varying vec2 vLocal;
varying vec3 vWorld;
${Ga}
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
}`;class Y_{mesh;geo=new nu;attr;capacity=0;constructor(e){const t=new Fn(1,1).rotateX(-Math.PI/2);this.geo.index=t.index,this.geo.setAttribute("position",t.getAttribute("position")),this.attr=this.grow(1024);const n=new Kt({vertexShader:W_,fragmentShader:X_,uniforms:{...Nt,uStrength:{value:e}},depthWrite:!1});this.mesh=new Jt(this.geo,n),this.mesh.frustumCulled=!1,this.mesh.renderOrder=1}grow(e){return this.capacity=Math.max(e,this.capacity*2),this.attr=new Jc(new Float32Array(this.capacity*4),4),this.attr.setUsage(Vc),this.geo.setAttribute("iShadow",this.attr),this.attr}set(e){e.length>this.capacity&&this.grow(e.length);const t=this.attr.array;e.forEach((n,r)=>{t[r*4]=n.x,t[r*4+1]=n.z,t[r*4+2]=n.w,t[r*4+3]=n.d}),this.attr.needsUpdate=!0,this.geo.instanceCount=e.length,this.mesh.visible=e.length>0}}const Ji={uRight:{value:new X(1,0,0)},uUp:{value:new X(0,1,0)},uFacing:{value:new X(0,0,1)},uTopFade:{value:0}},K_=`
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
`,q_=`
uniform sampler2D uAlbedo, uNormal;
uniform vec3 uRight, uUp, uFacing;
uniform float uTopFade, uUnlit;
varying vec2 vUv;
varying vec3 vWorld;
varying vec2 vFlags;
${Ga}
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
`;class ma{constructor(e,t,n={}){this.atlas=e,this.metresPerPixel=t;const r=new Fn(1,1);r.translate(0,.5,0),this.geo=new nu,this.geo.index=r.index,this.geo.setAttribute("position",r.getAttribute("position")),this.geo.setAttribute("uv",r.getAttribute("uv")),this.pos=this.size=this.uvs=this.flags=void 0,this.grow(64);const a=new Kt({vertexShader:K_,fragmentShader:q_,uniforms:{...Nt,...Ji,uAlbedo:{value:e.albedo},uNormal:{value:e.normal},uUnlit:{value:n.unlit?1:0}},depthTest:!n.onTop,depthWrite:!n.onTop});this.mesh=new Jt(this.geo,a),this.mesh.frustumCulled=!1,n.onTop&&(this.mesh.renderOrder=10)}atlas;metresPerPixel;mesh;geo;pos;size;uvs;flags;capacity=0;count=0;grow(e){const t=Math.max(e,this.capacity*2),n=(r,a)=>{const s=new Jc(new Float32Array(t*r),r);return s.setUsage(Vc),a&&s.array.set(a.array),s};this.pos=n(3,this.pos),this.size=n(2,this.size),this.uvs=n(4,this.uvs),this.flags=n(2,this.flags),this.geo.setAttribute("iPos",this.pos),this.geo.setAttribute("iSize",this.size),this.geo.setAttribute("iUv",this.uvs),this.geo.setAttribute("iFlags",this.flags),this.capacity=t}set(e){e.length>this.capacity&&this.grow(e.length);const t=this.pos.array,n=this.size.array,r=this.uvs.array,a=this.flags.array;e.forEach((s,o)=>{t[o*3]=s.x,t[o*3+1]=s.y,t[o*3+2]=s.z,n[o*2]=s.frame.w*this.metresPerPixel,n[o*2+1]=s.frame.h*this.metresPerPixel,r.set(s.frame.uv,o*4),a[o*2]=s.flip?1:0,a[o*2+1]=s.top?1:0});for(const s of[this.pos,this.size,this.uvs,this.flags])s.needsUpdate=!0;this.count=e.length,this.geo.instanceCount=e.length,this.mesh.visible=e.length>0}dispose(){this.geo.dispose(),this.mesh.material.dispose(),this.atlas.albedo.dispose(),this.atlas.normal.dispose()}}class Z_{constructor(e,t,n){this.canvas=e,this.game=t,this.style=n;const r=t.tuning;this.renderer=new S_({canvas:e,antialias:!1,powerPreference:"high-performance",preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.info.autoReset=!1,this.renderer.outputColorSpace=Ir,this.mpp=1/(r.artPixelsPerMetre*(2/r.pixelSize)),this.camera=new un(r.camera.fov,1,1,900),this.post=new k_(this.renderer,r),this.scene.background=new st(723478),P_(n,r.glowReach,this.mpp),this.assets=new L_(n,t.seed,r.pixelSize),this.ground=new N_(t.map,n,this.mpp),this.assets.onFloor=(l,u)=>this.ground.setFloor(l,u);const a=r.canopyShadow;this.ground.setCanopyShadow(a.on?a.strength:0,a.height,a.cover,a.wind),this.shadows=new Y_(r.shadows.strength),this.shadows.mesh.visible=r.shadows.on,this.scene.add(this.shadows.mesh),r.mist.on&&r.mist.strength>0&&(this.mist=new V_(r.mist.strength,r.mist.height,r.mist.wind,this.mpp),this.scene.add(this.mist.mesh)),Nt.uHazeRange.value.set(r.haze.near,r.haze.far),this.scene.add(this.ground.mesh),this.witchBatch=new ma(this.assets.witch,this.mpp,{unlit:!0,onTop:!0}),this.scene.add(this.witchBatch.mesh),this.stoneBatch=new ma(this.assets.stones,this.mpp),this.scene.add(this.stoneBatch.mesh);const s=t.map.dancefloor,o=[];for(let l=0;l<9;l++){const u=l/9*Math.PI*2+.3;o.push({x:s.x+Math.cos(u)*s.radius,y:0,z:s.z+Math.sin(u)*s.radius,frame:this.assets.stones.frames[l%4],flip:l%2===0})}this.stoneBatch.set(o);const c=new Kt({transparent:!1,depthWrite:!1,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"varying vec2 vUv; void main(){ vec2 p = vUv * 2.0 - 1.0; if (dot(p, p) > 1.0 || mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0) > 0.5) discard; gl_FragColor = vec4(0.02, 0.02, 0.05, 1.0); }"});this.shadow=new Jt(new Fn(1.4,.7).rotateX(-Math.PI/2),c),this.shadow.renderOrder=1,this.scene.add(this.shadow)}canvas;game;style;renderer;scene=new rp;camera;ground;assets;typeBatches=new Map;creatureBatches=new Map;witchBatch;stoneBatch;shadow;mpp;lastBuild={x:1/0,y:1/0,z:1/0,version:-1};post;shadows;shadowList=[];mist=null;width=1;height=1;stats={trees:0,bushes:0,creatures:0,batches:0,drawCalls:0,pendingArt:0,pendingGround:0};resize(e,t){const n=this.game.tuning.pixelSize;this.width=Math.max(1,Math.ceil(e/n)),this.height=Math.max(1,Math.ceil(t/n));const r=this.post.fullResolution?n:1;this.renderer.setSize(this.width*r,this.height*r,!1),this.post.resize(this.width,this.height,this.width*r,this.height*r),this.canvas.style.width=this.width*n+"px",this.canvas.style.height=this.height*n+"px",this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix()}async prepare(){this.render(0,!1),this.drawCreatures(),this.ground.fill(this.renderer,this.game.witch.x,this.game.witch.z,50,1/0),await this.assets.whenIdle(),this.updateFrustum(),this.refresh(!0);for(let e=0;e<Dn.length;e++)this.assets.prefetchType(e);for(const e of Dn)this.assets.creatureArt(e.creature)}batchFor(e,t,n){let r=e.get(t);return r||(r=n(),r&&(e.set(t,r),this.scene.add(r.mesh))),r}frustum=new ko;box=new hr;m4=new Ct;v3=new X;drawn=new Set;pops=[];updateFrustum(){this.camera.updateMatrixWorld(),this.m4.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse),this.frustum.setFromProjectionMatrix(this.m4)}viewRect(e,t){const n=this.camera,r=n.position,a=this.game.witch,s=[];for(const l of[-1,1])for(const u of[-1,1]){const d=this.v3.set(l,u,1).unproject(n).sub(r).normalize();for(const h of[0,25]){let p=d.y<-.001?(h-r.y)/d.y:1/0;p>0||(p=1/0),p=Math.min(p,e+r.distanceTo(new X(a.x,r.y,a.z))+t),s.push([r.x+d.x*p,r.z+d.z*p])}}s.push([r.x,r.z]);const o=s.map(l=>l[0]),c=s.map(l=>l[1]);return{minX:Math.min(...o)-t,maxX:Math.max(...o)+t,minZ:Math.min(...c)-t,maxZ:Math.max(...c)+t}}inView(e,t,n,r,a){const s=this.game.witch.x,o=this.game.witch.z,c=this.game.tuning.haze.far+a;return(e-s)**2+(t-o)**2>c*c?!1:(this.box.min.set(e-n/2-a,-a,t-r-a),this.box.max.set(e+n/2+a,r+a,t+a),this.frustum.intersectsBox(this.box))}inInnerView(e,t,n){const r=this.game.witch;if(Math.hypot(e-r.x,t-r.z)>this.game.tuning.haze.near)return!1;for(const a of[0,n]){const s=this.v3.set(e,a,t).project(this.camera);if(Math.abs(s.x)<.85&&Math.abs(s.y)<.85&&s.z<1)return!0}return!1}refresh(e=!1){const t=this.game,n=t.tuning,r=this.camera,a=n.viewMargin,s={x:r.position.x,y:r.position.y,z:r.position.z};if(!e&&Math.hypot(s.x-this.lastBuild.x,s.y-this.lastBuild.y,s.z-this.lastBuild.z)<a/3&&this.assets.version===this.lastBuild.version)return;this.lastBuild={...s,version:this.assets.version};const o=this.viewRect(n.haze.far,a),c=(o.minX+o.maxX)/2,l=(o.minZ+o.maxZ)/2,u=Math.max(o.maxX-o.minX,o.maxZ-o.minZ)/2,d=[],h=Nt.uMoonDir.value,p=-h.x/Math.max(.2,h.y),_=-h.z/Math.max(.2,h.y),x=new Map,g=new Set,m=(w,P)=>{let S=x.get(w);S||x.set(w,S=[]),S.push(P)},M=this.mpp;let E=0,b=0;for(const w of t.forest.treesNear(c,l,u)){const P=this.assets.typeArt(w.type);if(!P||!P.layout.big.length)continue;const S=P.atlas.frames,T=P.layout.big[w.variant%P.layout.big.length],I=S[T.top??T.bot];if(!this.inView(w.x,w.z,I.w*M,I.h*M,a))continue;m(w.type,{x:w.x,y:0,z:w.z,frame:S[T.bot],flip:w.flip}),T.top!==null&&m(w.type,{x:w.x,y:0,z:w.z,frame:S[T.top],flip:w.flip,top:!0});const C=I.w*M,O=I.h*M*(T.top===null?.2:.6);d.push({x:w.x+p*O,z:w.z+_*O,w:C*.8,d:C*.45}),g.add(`${w.x.toFixed(2)},${w.z.toFixed(2)},${I.h*M}`),E++}const R=(w,P)=>{for(const S of w){const T=this.assets.typeArt(S.type);if(!T)continue;const I=P(T.layout);if(!I.length)continue;const C=I[S.variant%I.length],O=T.atlas.frames,F=O[C.bot],D=O[C.top??C.bot];this.inView(S.x,S.z,D.w*M,D.h*M,a)&&(m(S.type,{x:S.x,y:0,z:S.z,frame:F,flip:S.flip}),C.top!==null&&m(S.type,{x:S.x,y:0,z:S.z,frame:O[C.top],flip:S.flip,top:!0}),d.push({x:S.x,z:S.z,w:F.w*M*.8,d:F.w*M*.3}),b++)}};R(t.forest.bushesNear(c,l,u),w=>w.small),R(t.forest.wallsNear(c,l,u),w=>w.walls.map(P=>({bot:P,top:null}))),R(t.forest.setPiecesNear(c,l,u),w=>w.set===null?[]:[w.set]);for(const[w,P]of this.typeBatches)x.has(w)||P.set([]);for(const[w,P]of x)this.batchFor(this.typeBatches,w,()=>{const T=this.assets.typeArt(w);return T&&new ma(T.atlas,M)})?.set(P);if(!e&&this.assets.pending===0){const w=(P,S)=>{const[T,I,C]=P.split(",").map(Number);this.inInnerView(T,I,C)&&this.pops.push(`${S} ${T.toFixed(0)},${I.toFixed(0)}`)};for(const P of g)this.drawn.has(P)||w(P,"appeared");for(const P of this.drawn)g.has(P)||w(P,"vanished")}this.drawn=g,this.stats.trees=E,this.stats.bushes=b,this.shadowList=d}drawCreatures(){const e=this.game,t=e.camera,n=e.tuning.haze.far,r=new Map,a=[];let s=0;for(const o of e.creatures){if(Math.abs(o.x-t.tx)>n||Math.abs(o.z-t.tz)>n)continue;const c=this.assets.creatureArt(o.species);if(!c)continue;const l=c.atlas.frames[c.frame(o.level,o.moving?Math.floor(o.walk)%2:0)];if(!this.inView(o.x,o.z,l.w*this.mpp,l.h*this.mpp,4))continue;let u=r.get(o.species);u||r.set(o.species,u=[]),u.push({x:o.x,y:0,z:o.z,frame:l,flip:o.facing<0}),a.push({x:o.x,z:o.z,w:l.w*this.mpp*.7,d:l.w*this.mpp*.25}),s++}for(const[o,c]of this.creatureBatches)r.has(o)||c.set([]);for(const[o,c]of r)this.batchFor(this.creatureBatches,o,()=>{const u=this.assets.creatureArt(o);return u&&new ma(u.atlas,this.mpp)})?.set(c);this.stats.creatures=s,this.game.tuning.shadows.on&&this.shadows.set(this.shadowList.concat(a))}render(e,t=!0){const n=this.game,r=n.tuning,a=ed(n),s=a.angle*Math.PI/180,o=2*a.distance*Math.tan(r.camera.fov*Math.PI/360)/this.height,c=new X(0,Math.cos(s),-Math.sin(s)),l=new X(a.tx,a.ty,a.tz),u=l.dot(c),d=l.x;l.addScaledVector(c,Math.round(u/o)*o-u),l.x+=Math.round(d/o)*o-d;const h=new X(0,Math.sin(s),Math.cos(s)).multiplyScalar(a.distance);this.camera.position.copy(l).add(h),this.camera.up.set(0,1,0),this.camera.lookAt(l);const p=r.spriteTilt;Ji.uUp.value.set(0,1,0).lerp(c,p).normalize(),Ji.uFacing.value.crossVectors(Ji.uRight.value,Ji.uUp.value).normalize(),Ji.uTopFade.value=qa(n.witch);const _=n.witch,x=Ro(_,r);Nt.uGlowPos.value.set(_.x,x+r.glowHeight,_.z),Nt.uHazeCentre.value.set(_.x,_.z),Nt.uTime.value=e,this.mist?.follow(a.tx,a.tz);const g=Math.sin(e*2.4)*.12;this.witchBatch.set([{x:_.x,y:x+g-.4,z:_.z,frame:this.assets.witch.frames[0],flip:_.facing<0}]),this.shadow.position.set(_.x,.03,_.z),this.shadow.scale.setScalar(1-.5*qa(_)),this.updateFrustum(),this.refresh(),this.drawCreatures(),this.assets.work(6);const m=An(r.haze.near,r.haze.far,qa(_))*.8;this.stats.pendingGround=this.ground.fill(this.renderer,a.tx,a.tz-m*.5,m,3),this.stats.pendingArt=this.assets.pending,t&&(this.renderer.info.reset(),this.post.render(this.scene,this.camera),this.stats.drawCalls=this.renderer.info.render.calls,this.stats.batches=this.typeBatches.size+this.creatureBatches.size)}}const $_="The art style: knobs from the Witch Art Lab. Paste a style saved in the Lab here (its whole saved JSON, or just its style object). Any knob left out follows the Lab's current default, so an empty style means the Lab's default look, and stays up to date as the art changes.",J_="Lab default",Q_={},j_={_readme:$_,name:J_,style:Q_};function ex(i=j_){const e=i??{},t=e.style&&typeof e.style=="object"?e.style:e,n=E_();for(const[r,a]of Object.entries(t))r in n&&(n[r]=a);return n}function tx(i,e){const t=i.querySelector("#stick"),n=t.querySelector(".knob"),r=56;let a=null,s=0,o=0;const c=()=>i.classList.add("touch"),l=i.querySelector("#stick-zone");l.addEventListener("pointerdown",h=>{if(!(h.pointerType==="mouse"||a!==null)){c(),a=h.pointerId,s=h.clientX,o=h.clientY,t.style.left=s+"px",t.style.top=o+"px",t.classList.add("on");try{l.setPointerCapture(h.pointerId)}catch{}h.preventDefault()}}),l.addEventListener("pointermove",h=>{if(h.pointerId!==a)return;let p=h.clientX-s,_=h.clientY-o;const x=Math.hypot(p,_);x>r&&(p*=r/x,_*=r/x),n.style.transform=`translate(${p}px, ${_}px)`;const g=Math.min(1,x/r),m=.15,M=g<m?0:(g-m)/(1-m)/Math.max(1e-6,g);e.x=p/r*M,e.y=_/r*M});const u=h=>{h.pointerId===a&&(a=null,e.x=0,e.y=0,n.style.transform="",t.classList.remove("on"))};l.addEventListener("pointerup",u),l.addEventListener("pointercancel",u);const d=(h,p)=>{const _=i.querySelector(h);_.addEventListener("pointerdown",x=>{x.preventDefault(),x.stopPropagation(),p(),_.classList.add("down")}),_.addEventListener("pointerup",()=>_.classList.remove("down")),_.addEventListener("pointerleave",()=>_.classList.remove("down"))};d("#rise",()=>e.toggle=!0),d("#zoom-in",()=>e.zoom-=1),d("#zoom-out",()=>e.zoom+=1),window.addEventListener("touchstart",h=>{c(),h.touches.length===3&&(e.debug=!0)},{passive:!0})}const jn=new URLSearchParams(location.search);let yi=Fh(jn.get("seed"));yi===null&&(yi=Math.floor(Math.random()*1e6),jn.set("seed",String(yi)),history.replaceState(null,"","?"+jn.toString()+location.hash));const Jn={...Ui,bloom:{...Ui.bloom},tiltShift:{...Ui.tiltShift},shadows:{...Ui.shadows},canopyShadow:{...Ui.canopyShadow},mist:{...Ui.mist}};jn.get("shadows")==="off"&&(Jn.shadows.on=!1);jn.get("canopy")==="off"&&(Jn.canopyShadow.on=!1);jn.get("mist")==="off"&&(Jn.mist.on=!1);const ga=jn.get("tilt");ga==="off"?Jn.tiltShift.on=!1:(ga==="before"||ga==="after")&&(Jn.tiltShift.on=!0,Jn.tiltShift.where=ga);jn.get("bloom")==="off"&&(Jn.bloom.on=!1);const Yn=Qh(yi,Jn),nx=document.getElementById("game"),Ur=new Z_(nx,Yn,{...ex(),pixel:Jn.pixelSize}),Ha=new af;tx(document.body,Ha.touch);document.getElementById("version").textContent="v89 · d3ea714";const ix=document.getElementById("seed");ix.innerHTML=`seed <a href="?seed=${yi}">${yi}</a>`;const vo=document.getElementById("debug"),Ho=document.getElementById("start");let Ar=jn.has("debug");vo.classList.toggle("on",Ar);const fu=()=>Ur.resize(window.innerWidth,window.innerHeight);window.addEventListener("resize",fu);fu();let Va=!1;requestAnimationFrame(()=>setTimeout(async()=>{await Ur.prepare(),Va=!0,Ho.classList.remove("loading")},0));let rc=null;function pu(){if(!Va||!Yn.clock.paused)return!1;try{rc??=new AudioContext,rc.resume()}catch{}return Yn.clock.paused=!1,Ho.style.display="none",Ha.clearPresses(),!0}Ha.onAny=pu;Ho.addEventListener("pointerdown",i=>{i.preventDefault(),pu()});document.addEventListener("visibilitychange",()=>{document.hidden&&(Aa=0)});let Aa=0,ac=60,Ts=0,_a=0;function mu(i){requestAnimationFrame(mu);const e=Aa?(i-Aa)/1e3:0;Aa=i,Ts++,_a+=e,_a>=.5&&(ac=Ts/_a,Ts=0,_a=0);const t=Ha.read();if(t.debug&&(Ar=!Ar,vo.classList.toggle("on",Ar)),jh(Yn,t,e),!!Va&&(Ur.render(i/1e3),Ar)){const n=Yn.witch,r=Ur.stats;vo.textContent=[`fps    ${ac.toFixed(0)}`,`seed   ${yi}`,`area   ${yc(Yn)}`,`mode   ${n.mode}`,`at     ${n.x.toFixed(0)}, ${n.z.toFixed(0)} m   zoom ${Yn.camera.zoomStep}`,`trees  ${r.trees}  bushes ${r.bushes}  creatures ${r.creatures}`,`draws  ${r.drawCalls}  art queued ${r.pendingArt}  ground tiles ${r.pendingGround}`].join(`
`)}}requestAnimationFrame(mu);window.witch={game:Yn,view:Ur,areaUnderWitch:()=>yc(Yn),get ready(){return Va}};
